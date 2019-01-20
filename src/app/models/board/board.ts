import { Question } from '../question/question';

export class Board {
    id: number;
    numRows: number;
    numCols: number;
    questions: Question[] = [];
    boardMap: number[][] = [];


    constructor(numRows = 15, numCols = 15) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.populateBoardMap();
    }

    fromJSON(data: Object) {
        this.id = data['id'];
        this.numRows = data['numRows'];
        this.numCols = data['numCols'];
        this.questions = data['questions'];
        this.populateBoardMap();
    }

     populateBoardMap(): void {
         this.boardMap = [];
        for (let i = 0; i < this.numRows; i++) {
            this.boardMap.push([]);
            for (let j = 0; j < this.numCols; j++) {
                this.boardMap[i].push(j);
            }
        }
    }

    addQuestion(question: Question): void {
        this.questions.push(question);
    }

    get questionsDown(): Question[] {
        const questions = this.questions.filter(q => q.orientation === 'down');
        return questions.sort(sortQuestions);
    }

    get questionsAcross(): Question[] {
        const questions = this.questions.filter(q => q.orientation !== 'down');
        return questions.sort(sortQuestions);
    }

}

function sortQuestions(q1: Question, q2: Question) {
    if (q1.identifier && q2.identifier) {
        const q1Order = +q1.identifier.split('')[0];
        const q2Order = +q2.identifier.split('')[0];
        if (q1Order < q2Order) {
            return -1;
        }
        if (q1Order > q2Order) {
            return 1;
        }
    }
}
