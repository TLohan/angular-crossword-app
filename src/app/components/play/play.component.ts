import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board/board';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question/question';
import { QuestionMap } from 'src/app/models/question-map/question-map';

@Component({
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.sass']
})
export class PlayComponent implements OnInit {

    board: Board;
    questionsDown: Question[] = [];
    questionsAcross: Question[] = [];
    cycler = 0;
    private _selectedCell: HTMLElement;
    count = 0;
    listener: EventListenerOrEventListenerObject;

    get selectedCell(): HTMLElement {
        return this._selectedCell;
    }

    set selectedCell(cell: HTMLElement) {
        if (this._selectedCell) {
            this._selectedCell.classList.remove('selectedCell');
        }
        this._selectedCell = cell;
        if (cell) {
            this._selectedCell.classList.add('selectedCell');
        }
    }

    questionMap: QuestionMap;

    private _selectedQuestion: Question = null;

    get selectedQuestion(): Question {
        return this._selectedQuestion;
    }

    set selectedQuestion(question: Question) {
        // add styling for selectedQuestionElement
        if (this._selectedQuestion) {
            const prevQuestion = document.getElementById(`question-${this._selectedQuestion.identifier}`);
            prevQuestion.classList.remove('selectedQuestion');
            prevQuestion.blur();
        } else {
            this.listen();
        }
        this._selectedQuestion = question;
        const newQuestion = document.getElementById(`question-${this._selectedQuestion.identifier}`);
        newQuestion.focus();
        newQuestion.classList.add('selectedQuestion');
    }

    selectedOrientation: string = null;
    clickableCells: number[][] = [];

    constructor(private boardService: BoardService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getBoard();
    }

    populateSelectedCell(letter: string) {
        const letterP = <HTMLElement>this.selectedCell.querySelector('.letter');
        letterP.innerText = letter;
    }

    emptySelectedCell() {
        const letterP = <HTMLElement>this.selectedCell.querySelector('.letter');
        letterP.innerText = '';
    }

    focusOnNextCell(count: number) {
        if (count >= 0 && (count <= this.selectedQuestion.answer.length - 1)) {
            if (this.selectedQuestion.orientation === 'down') {
                this.selectedCell = this.getElement(this.selectedQuestion.row, this.selectedQuestion.col + count);
            } else {
                this.selectedCell = this.getElement(this.selectedQuestion.row + count, this.selectedQuestion.col);
            }
        }
    }

    selectNextQuestion() {
        const sortedQuestions = this.board.questions.sort(sortQuestions);
        const currentIndex = sortedQuestions.findIndex(q => q.identifier === this.selectedQuestion.identifier);
        const nextIndex = currentIndex + 1;
        let nextQuestion: Question;
        if (nextIndex < sortedQuestions.length) {
            nextQuestion = sortedQuestions[nextIndex];
        } else {
            nextQuestion = sortedQuestions[0];
        }
        this.selectQuestion(nextQuestion);
        this.cycler++;
    }

    selectQuestion(question: Question) {
        this.selectedQuestion = new Question(question.location, question.clue, question.answer, question.orientation, question.identifier);
        this.selectedOrientation = question.orientation;
        this.selectHeadCell(this.selectedQuestion);
        this.count = 0;
    }

    selectHeadCell(question: Question) {
        const element = this.getElement(question.row, question.col);
        this.selectedCell = element;
    }

    getBoard() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.questionMap = new QuestionMap();
        this.boardService.getBoard(id).subscribe((data: Board) => {
            this.board = new Board(15, 15);
            this.board.fromJSON(data);
            this.questionsDown = this.board.questionsDown;
            this.questionsAcross = this.board.questionsAcross;
            this.board.questions.forEach((question: Question) => {
                const loc = question.location.split('-');
                const row = +loc[0];
                const col = +loc[1];
                for (let i = 0; i < question.answer.length; i++) {
                    if (question.orientation === 'down') {
                        this.clickableCells.push([row, col + i]);
                    } else {
                        this.clickableCells.push([row + i, col]);
                    }
                }
            });
            setTimeout(() => this.populateBoard());
        }, err => {
            console.error(err);
        }, () => {

            }
        );
    }


    private getElement(row: number, col: number): HTMLElement {
        return document.getElementById(`cell-${row}_${col}`);
    }

    populateBoard(): void {
        this.board.questions.forEach(question => {
            const loc = question.location.split('-');
            let row = +loc[0];
            let col = +loc[1];
            const answer = question.answer.split('');
            answer.forEach((letter, index) => {
                const element = this.getElement(row, col);
                this.questionMap.addNode(element, question);
                element.classList.add('occupiedCell', 'clickable');
                element.classList.remove('emptyCell');
                // show identifier
                if (index === 0) {
                    const identifierNode = <HTMLElement>element.querySelector('.identifier');
                    identifierNode.innerHTML = question.identifier.split('')[0];
                }
                if (question.orientation === 'down') {
                    col++;
                } else {
                    row++;
                }
            });
        });
    }


    listen() {
        this.listener = (e: KeyboardEvent) => {
            const keyCode = e.keyCode;
            console.log(e.key);
            if (keyCode === 9) {
                // tab pressed
                // pick next question
                e.preventDefault();
                this.count = 0;
                this.selectNextQuestion();
            } else if (keyCode === 8) {
                // 'backspace'
                // empty this cell listen for previous
                this.emptySelectedCell();
                if (this.count > 0) { --this.count; }
                this.focusOnNextCell(this.count);
            } else if (keyCode > 64  && keyCode < 91) {
                // if keycode matches [a-Z]
                // populate that cell with that key
                // listen for next cell
                this.populateSelectedCell(e.key);
                if (this.count < this.selectedQuestion.answer.length) {
                    this.count += 1;
                }
                this.focusOnNextCell(this.count);
            } else if (keyCode >= 37 && keyCode <= 40) {
                const [r, c] = this.selectedCell.id.split('-')[1].split('_');
                let [row, col] = [+r, +c];
                switch (keyCode) {
                    case 37: {
                        // left
                        row--;
                        break;
                    }
                    case 38: {
                        // up
                        col--;
                        break;
                    }
                    case 39: {
                        // right
                        row++;
                        break;
                    }
                    case 40: {
                        // down
                        col++;
                        break;
                    }
                }
                if (this.isClickable(row, col)) {
                    this.selectCell(row, col);
                }
            }
        };

        document.addEventListener('keydown', this.listener);
    }



    selectCell(row: number, col: number) {
        const element = this.getElement(row, col);
        this.selectedCell = element;
        let q: Question;
        if (!this.questionMap.isCrossroads(element)) {
            q = this.questionMap.getQuestion(element);
        } else {
            q = this.questionMap.getQuestionByDirection(element, this.selectedOrientation);
        }
        this.selectedQuestion = new Question(q.location, q.clue, q.answer, q.orientation, q.identifier);
        this.selectedOrientation = this.selectedQuestion.orientation;
        let listenFrom: number;
        if (this.selectedOrientation === 'down') {
            listenFrom = col - this.selectedQuestion.col;
        } else {
            listenFrom = row - this.selectedQuestion.row;
        }
        console.log(listenFrom);
        this.count = listenFrom;
    }

    isClickable(row: number, col: number): boolean {
        const ans = this.clickableCells.findIndex(arr => {
            return (arr[0] === row && arr[1] === col);
        });
        return (ans !== -1);
    }
}

function sortQuestions(q1: Question, q2: Question) {
    if (q1.orientation === 'across' && q2.orientation === 'down') {
        return -1;
    } else {
        return 1;
    }
}
