import { Question } from '../question/question';
import { Orientation } from 'src/app/components/play/orientation.enum';

export class Board {
    id: number;
    numRows: number;
    numCols: number;
    questions: Question[] = [];
    boardMap: number[][] = [];

    constructor(numRows = 15, numCols = 15) {
        console.log('hit');
        this.numRows = numRows;
        this.numCols = numCols;
        this.populateBoardMap();
    }

    fromJSON(data: Object) {
        if (data) {
            this.id = data['id'];
            this.numRows = data['numRows'];
            this.numCols = data['numCols'];
            this.questions = [];
            data['questions'].forEach((q: Question) => {
                this.questions.push(new Question(q.location, q.clue, q.answer, q.orientation, q.identifier));
            });
            this.populateBoardMap();
        }
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
        const questions = this.questions.filter(q => q.orientation === Orientation.DOWN);
        return questions.sort(sortQuestions);
    }

    get questionsAcross(): Question[] {
        const questions = this.questions.filter(q => q.orientation === Orientation.ACROSS);
        return questions.sort(sortQuestions);
    }

}

function sortQuestions(q1: Question, q2: Question) {
    if (q1.order && q2.order) {
        if (q1.order < q2.order) {
            return -1;
        }
        if (q1.order >= q2.order) {
            return 1;
        }
    }
}
