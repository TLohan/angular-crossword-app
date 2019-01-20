import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board/board';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
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

    selectedCell: HTMLElement;


    questionMap: QuestionMap;

    selectedQuestion: Question;

    selectedOrientation: string = null;
    clickableCells: number[][] = [];

    constructor(private boardService: BoardService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.getBoard();
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
        }, () => console.log('Done loading stuff')
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
                if (index === 0) {
                    const identifierNode = document.getElementById(`identifier-${row}_${col}`);
                    identifierNode.innerHTML = question.identifier;
                }
                if (question.orientation === 'down') {
                    col++;
                } else {
                    row++;
                }
            });
        });
    }

    lastCellForQuestion(row: number, col: number): boolean {
        const length = this.selectedQuestion.answer.length - 1;
        const [qrow, qcol] = this.selectedQuestion.location.split('-');
        if (this.selectedOrientation === 'down') {
            return col === (+qcol + length);
        } else {
            return row === (+qrow + length);
        }
    }


    selectNextCell(thisElement: HTMLElement, row: number, col: number) {
        if (!this.questionMap.isCrossroads(thisElement)) {
            const question = this.questionMap.getQuestion(thisElement);
            this.selectedOrientation = question.orientation;
        } else {
            this.questionMap.getQuestionByDirection(thisElement, this.selectedOrientation);
            console.log('xroads');
        }
        try {
            if (this.selectedOrientation === 'down') {
                if (this.lastCellForQuestion(row, col)) {
                    this.nextQuestion();
                } else {
                    console.log('next cell down');
                    this.selectCell(row, col + 1);
                }
            } else {
                if (this.lastCellForQuestion(row, col)) {
                    this.nextQuestion();
                } else {
                    console.log('next cell across', row, col);
                    this.selectCell(row + 1, col);
                }
            }
        } catch (TypeError) {
            console.log('next q');
            this.nextQuestion();
        }
    }

    nextQuestion() {
        console.log('teser');
        this.selectedCell.style.backgroundColor = 'yellow';
        try {
            if (this.selectedQuestion.orientation === 'down') {
                const index = this.board.questionsDown.indexOf(this.selectedQuestion);
                const nextIndex = index + 1;
                if (nextIndex < this.board.questionsDown.length) {
                    this.selectedQuestion = this.board.questionsDown[nextIndex];
                } else {
                    console.log('down error', nextIndex);
                    throw(TypeError);
                }
            } else {
                const index = this.board.questionsAcross.indexOf(this.selectedQuestion);
                const nextIndex = index + 1;
                if (nextIndex < this.board.questionsAcross.length) {
                    this.selectedQuestion = this.board.questionsAcross[nextIndex];
                } else {
                    console.log('across error');
                    throw(TypeError);
                }
            }
            const q_loc = this.selectedQuestion.location.split('-');
            console.log(q_loc);

            this.selectCell(+q_loc[0], +q_loc[1]);
        } catch (TypeError) {
            console.log('error');
            if (this.selectedOrientation === 'down') {
                this.selectedQuestion = this.board.questionsAcross[0];
                this.selectedOrientation = 'across';
            } else {
                this.selectedQuestion = this.board.questionsDown[0];
                this.selectedOrientation = 'down';
            }
            const q_loc = this.selectedQuestion.location.split('-');
            this.selectCell(+q_loc[0], +q_loc[1]);
        }
    }

    selectCell(row: number, col: number): void {
        if (this.selectedCell) { this.selectedCell.classList.remove('selectedCell'); }
        const element = this.getElement(row, col);
        this.selectedCell = element;
        this.selectedCell.classList.add('selectedCell');
        if (this.selectedQuestion === undefined) {
            this.selectedQuestion = this.questionMap.getQuestion(element);
        } else if (!this.questionMap.isCrossroads(element)) {
            this.selectedQuestion = this.questionMap.getQuestion(element);
        } else {
            this.selectedQuestion = this.questionMap.getQuestionByDirection(element, this.selectedOrientation);
        }
        this.selectedOrientation = this.selectedQuestion.orientation;
        const letterNode = document.getElementById(`letter-${row}_${col}`);
        const inputNode = <HTMLInputElement>document.getElementById(`guess-${row}_${col}`);
        inputNode.addEventListener('keyup', () => {
                const val = inputNode.value;
                letterNode.innerHTML = val;
                this.selectNextCell(element, row, col);
            }
        );
        inputNode.focus();
    }

    isClickable(row: number, col: number): boolean {
        const ans = this.clickableCells.findIndex(arr => {
            return (arr[0] === row && arr[1] === col);
        });
        return (ans !== -1);
    }
}
