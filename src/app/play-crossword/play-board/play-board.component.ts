// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, AfterViewChecked, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { Question } from 'src/app/models/question/question';
import { QuestionMap } from 'src/app/models/question-map/question-map';
import { CellMap } from 'src/app/models/cell-map/cell-map';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Orientation } from '../orientation.enum';
import { PlayService } from 'src/app/services/play.service';
import { PlayMode } from '../play-mode.interface';
import { BoardStat } from 'src/app/models/board/board-stat';
import { BoardService } from 'src/app/services/board.service';

@Component({
    selector: 'app-play-board',
    templateUrl: './play-board.component.html',
    styleUrls: ['./play-board.component.sass']
})
export class PlayBoardComponent implements OnInit, AfterViewChecked, OnDestroy {

    private _board: Board;

    @Input()
    set board(board: Board) {
        if (board) {
            this._board = board;
            this.questionsAcross = [];
            this.questionsDown = [];
            this.questionMap = new QuestionMap();
            this.cellMap = new CellMap();
            this._selectedQuestion = null;
            this._playBoard(board);
        }
    }

    @Input() mode: PlayMode;

    get board(): Board {
        return this._board;
    }

    @Output() cellMapPopulated = new EventEmitter<CellMap>();

    selectedOrientation = Orientation.ACROSS;

    questionsDown: Question[] = [];
    questionsAcross: Question[] = [];
    clickableCells: number[][] = [];
    questionMap: QuestionMap;
    cellMap: CellMap;
    fakeInputFormGroup: FormGroup;
    count = 0;
    flag: boolean;
    oldVal = '';

    totalCells = 0;
    correctCells = 0;
    _progress = 0;

    timer = 0;
    private _timer: any;
    timerStarted = false;
    validAttempt = true;


    set progress(value: number) {
        this.playService.changeProgress(value);
    }

    private _selectedCell: HTMLElement;
    private _selectedQuestion: Question = null;

    listener: EventListenerOrEventListenerObject;
    inputListener: EventListenerOrEventListenerObject;
    resizeListener: EventListenerOrEventListenerObject;

    constructor(private playService: PlayService, private boardService: BoardService) {
        this.playService.questionChanged$.subscribe(question => {
            this._selectedQuestion = question;
        });

        this.playService.orientationChanged$.subscribe(orientation => {
            this.selectedOrientation = orientation;
        });

        this.playService.revealsRemainingChanged$.subscribe(value => {
            if (value !== 3) {
                this._revealSingleQuestion(this.selectedQuestion);
                this.progress = this.questionMap.checkProgress();
            }
        });

        this.playService.checkBoardTriggered$.subscribe(_ => {
            this.check();
        });

        this.playService.headCellFlagTriggered$.subscribe(_ => {
            this.selectHeadCell(this.selectedQuestion);
        });

        this.playService.selectNextQuestionTriggered.subscribe(_ => {
            this.selectNextQuestion();
        });

        this.playService.selectPreviousQuestionTriggered.subscribe(_ => {
            this.selectPrevQuestion();
        });

        this.playService.revealAllConfirmed$.subscribe(_ => {
            this._revealAll();
            if (this.mode === PlayMode.SOLO_MODE) {
                this.progress = this.questionMap.checkProgress();
            }
        });
    }

    @ViewChild('fakeInput') _fakeInput: ElementRef;
    get fakeInput(): AbstractControl {
        return this.fakeInputFormGroup.get('fakeInput');
    }

    get cell_width(): number {
        return this.board ? 90 / this.board.numRows : 0;
    }

    get cell_height(): number {
        return this.board ? 90 / this.board.numCols : 0;
    }

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

    get selectedQuestion(): Question {
        return this._selectedQuestion;
    }

    set selectedQuestion(question: Question) {
        this.playService.changeQuestion(question);
        this.selectHeadCell(this._selectedQuestion);
        this.count = 0;
    }

    @HostListener('window:resize', ['$event'])
    sizeChange() {
        const cells = document.querySelectorAll<HTMLElement>('.cell');
        cells.forEach((cell: HTMLElement) => {
            cell.style.height = `${cell.offsetWidth}px`;
        });
    }



    ngOnInit() {
        this.resizeListener = this.sizeChange;
        window.addEventListener('resize', this.resizeListener);
        const cells = document.querySelectorAll<HTMLElement>('.cell');
        cells.forEach((cell: HTMLElement) => {
            cell.style.height = `${cell.offsetWidth}px`;
        });

        this.fakeInputFormGroup = new FormGroup({
            fakeInput: new FormControl()
        });

        this.fakeInput.markAsTouched();

        this.questionMap = new QuestionMap();
        this.cellMap = new CellMap();
    }

    ngAfterViewChecked(): void {
        const cells = document.querySelectorAll<HTMLElement>('.cell');
        cells.forEach((cell: HTMLElement) => {
            cell.style.height = `${cell.offsetWidth}px`;
        });
    }

    ngOnDestroy(): void {
        document.removeEventListener('keydown', this.listener);
        document.removeEventListener('resize', this.resizeListener);
        clearInterval(this._timer);
    }

    startTimer() {
        console.log('timer started');
        this.timerStarted = true;
        this._timer = setInterval(() => {
            this.playService.timerChanged(this.timer++);
        }, 1000);
    }

    private _playBoard(data: Board): void {
        this._board = new Board(15, 15);
        this.board.fromJSON(data);
        this.questionsDown = this.board.questionsDown.sort(sortQuestions);
        this.questionsAcross = this.board.questionsAcross.sort(sortQuestions);
        this.board.questions.forEach((question: Question) => {
            const loc = question.location.split('-');
            const row = +loc[0];
            const col = +loc[1];
            for (let i = 0; i < question.answer.length; i++) {
                if (question.orientation === Orientation.DOWN) {
                    this.clickableCells.push([row, col + i]);
                } else {
                    this.clickableCells.push([row + i, col]);
                }
            }
        });
        setTimeout(() => {
            this.populateBoard();
        }, 1000);
    }

    populateBoard(): void {
        this.questionMap = new QuestionMap();
        this.cellMap = new CellMap();
        this.board.questions.forEach(question => {
            const loc = question.location.split('-');
            let row = +loc[0];
            let col = +loc[1];
            const answer = question.answer.split('');
            this.totalCells += answer.length;
            answer.forEach((letter, index) => {
                const element = this.getElement(row, col);
                this.questionMap.addNode(element, question, letter);
                this.cellMap.addCell(question, element);
                element.classList.add('occupiedCell', 'clickable');
                element.classList.remove('emptyCell');
                // show identifier
                if (index === 0) {
                    const identifierNode = <HTMLElement>element.querySelector('.identifier');
                    const id = question.identifier.split('');
                    id.pop();
                    identifierNode.innerHTML = id.join('');
                }
                if (question.orientation === Orientation.DOWN) {
                    col++;
                } else {
                    row++;
                }
            });
        });
        this.playService.cellMapPopulated(this.cellMap);
    }

    private getElement(row: number, col: number): HTMLElement {
        return document.getElementById(`cell-${row}_${col}`);
    }

    populateSelectedCell(letter: string) {
        if (!this.timerStarted && this.mode === PlayMode.SOLO_MODE) {
            this.startTimer();
        }
        if (this.selectedCell) {
            this.selectedCell.classList.add('guessed');
            this.selectedCell.classList.remove('wrong');
            const letterP = <HTMLElement>this.selectedCell.querySelector('.letter');
            letterP.innerText = letter;
            this.progress = this.questionMap.checkProgress();
        }
    }

    emptySelectedCell() {
        if (this.selectedCell.classList.contains('guessed')) {
            this.selectedCell.classList.remove('guessed');
            const letterP = <HTMLElement>this.selectedCell.querySelector('.letter');
            letterP.innerText = '';
            this.progress = this.questionMap.checkProgress();
        }
    }

    focusOnNextCell(count: number) {
        if (this.selectedQuestion && count >= 0 && (count <= this.selectedQuestion.answer.length - 1)) {
            if (this.selectedQuestion.orientation === Orientation.DOWN) {
                this.selectedCell = this.getElement(this.selectedQuestion.row, this.selectedQuestion.col + count);
            } else {
                this.selectedCell = this.getElement(this.selectedQuestion.row + count, this.selectedQuestion.col);
            }
        }
    }

    changeQuestion(value: string) {
        if (value === 'next') {
            this.selectNextQuestion();
        } else if (value === 'prev') {
            this.selectPrevQuestion();
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
    }

    selectPrevQuestion() {
        const sortedQuestions = this.board.questions.sort(sortQuestions);
        const currentIndex = sortedQuestions.findIndex(q => q.identifier === this.selectedQuestion.identifier);
        const prevIndex = currentIndex - 1;
        let prevQuestion: Question;
        if (prevIndex >= 0) {
            prevQuestion = sortedQuestions[prevIndex];
        } else {
            prevQuestion = sortedQuestions[sortedQuestions.length - 1];
        }
        this.selectQuestion(prevQuestion);
    }


    triggerKeyboard() {
        // show mobile keyboard
        this._fakeInput.nativeElement.focus();
        if (!this.listener) { this.listen(); }
    }

    selectQuestion(question: Question) {
        this.selectedQuestion = new Question(question.location, question.clue, question.answer, question.orientation, question.identifier);
        this.selectedQuestion.id = question.id;
        this.selectedOrientation = question.orientation;
        this.selectHeadCell(this.selectedQuestion);
        this.count = 0;
    }

    selectHeadCell(question: Question) {
        this.count = 0;
        const element = this.getElement(question.row, question.col);
        this.selectedCell = element;
        this.fakeInput.setValue('');
    }


    listen() {
        this.listener = (e: KeyboardEvent) => {
            const keyCode = e.keyCode;
            this.flag = true;
            if (keyCode === 9) {
                // tab pressed
                // pick next question
                e.preventDefault();
                this.count = 0;
                this.selectNextQuestion();
            } else if (keyCode === 8) {
                // 'backspace'
                // empty this cell listen for previous
                e.preventDefault();
                this.emptySelectedCell();
                if (this.count > 0) { --this.count; }
                this.focusOnNextCell(this.count);
            } else if (keyCode > 64 && keyCode < 91) {
                // if keycode matches [a-Z]
                // populate that cell with that key
                // listen for next cell
                this.populateSelectedCell(e.key);
                // this.updateProgress(e.key);
                if (this.selectedQuestion && this.count < this.selectedQuestion.answer.length) {
                    this.count += 1;
                }
                this.focusOnNextCell(this.count);
                this.checkIfComplete();
            } else if (keyCode >= 37 && keyCode <= 40) {
                // direction keys
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
            } else if (keyCode === 229) {
                // keyboard event doesnt work on mozilla for android
                // keyboard event manually triggered on key up
                this.flag = false;
                this.oldVal = this.fakeInput.value || '';
            }
        };
        document.addEventListener('keydown', this.listener);
    }

    stopTimer() {
        clearInterval(this._timer);
    }

    checkIfComplete() {
        if (this.isComplete()) {
            if (this.mode === PlayMode.SOLO_MODE) {
                this.stopTimer();
                if (this.validAttempt) {
                   this._saveStat();
                }
            }
            this.playService.matchFinished();
            document.removeEventListener('keydown', this.listener);
            this.listener = null;
        }
    }

    isComplete(): boolean {
        // return this.questionMap.nodes.every(node => {
        //     const letter = node.cell.querySelector('.letter').innerHTML;
        //     if (letter.toLowerCase() === node.answer.toLowerCase()) {
        //         return true;
        //     }
        // });
        return true;
    }

    isClickable(row: number, col: number): boolean {
        const ans = this.clickableCells.findIndex(arr => {
            return (arr[0] === row && arr[1] === col);
        });
        return (ans !== -1);
    }

    check() {
        this.questionMap.nodes.forEach(node => {
            const guess = node.cell.querySelector('.letter').innerHTML;

            if (guess !== '' && guess.toLowerCase() !== node.answer.toLowerCase()) {
                node.cell.classList.add('wrong');
            } else {
                node.cell.classList.remove('wrong');
                this.correctCells += 1;
            }
        });
    }


    checkInput(flag: boolean) {
        // if flag is false then keyboard event didnt work.
        // trigger one manually
        if (!flag) {
            let options = {};
            const newVal: string = this.fakeInput.value;
            if (newVal && newVal.length >= this.oldVal.length) {
                const letter = newVal.split('').pop().toUpperCase();
                options = { key: letter };
                options['keyCode'] = letter.charCodeAt(0);
            } else {
                options = { keyCode: 8 }; // backspace
            }
            const event = new KeyboardEvent('keydown', options);
            document.dispatchEvent(event);
            this.fakeInput.setValue('');
        }
    }

    selectCell(row: number, col: number) {
        const element = this.getElement(row, col);
        let q: Question;
        if (!this.questionMap.isCrossroads(element)) {
            q = this.questionMap.getQuestion(element);
        } else {
            q = this.questionMap.getQuestionByDirection(element, this.selectedOrientation);
        }
        this.selectedQuestion = new Question(q.location, q.clue, q.answer, q.orientation, q.identifier);
        this.selectedCell = element;
        this.selectedQuestion.id = q.id;
        this.selectedOrientation = this.selectedQuestion.orientation;
        let listenFrom: number;
        if (this.selectedOrientation === Orientation.DOWN) {
            listenFrom = col - this.selectedQuestion.col;
        } else {
            listenFrom = row - this.selectedQuestion.row;
        }
        this.count = listenFrom;
    }

    private _revealSingleQuestion(question: Question) {
        const cells = this.cellMap.getCells(question);
        const questionElement = document.getElementById(`question-${question.identifier}`);
        if (questionElement) {
            questionElement.classList.add('answered');
            questionElement.classList.remove('unanswered');
        }
        if (cells) {
            cells.forEach((cell, index) => {
                const letterP = cell.querySelector('.letter');
                cell.classList.add('guessed');
                const answer = question.answer[index];
                letterP.textContent = answer;
            });
        }
    }

    private _revealAll() {
        console.log('cell map', this.cellMap );
        console.log('no qs: ', this.board.questions.length);
        this.board.questions.forEach(question => {
            this._revealSingleQuestion(question);
        });
        this.checkIfComplete();
    }

    private _saveStat() {
        const boardStat = new BoardStat();
        boardStat.boardId = this.board.id;
        boardStat.seconds = this.timer;
        boardStat.played = true;
        // boardStat.userId = this._authService.userProfile.name;
        boardStat.date = new Date(Date.now());
        this.boardService.addBoardStat(boardStat).subscribe();
    }

}



function sortQuestions(q1: Question, q2: Question) {
    if (q1.orientation === Orientation.ACROSS && q2.orientation === Orientation.DOWN) {
        return -1;
    } else if (q1.orientation === Orientation.DOWN && q2.orientation === Orientation.ACROSS) {
        return 1;
    } else {
        const id1 = q1.identifier.split('');
        id1.pop();
        const ID1 = id1.join('');
        const id2 = q2.identifier.split('');
        id2.pop();
        const ID2 = id2.join('');
        if (+ID1 < +ID2) {
            return -1;
        }
        return 1;
    }
}
