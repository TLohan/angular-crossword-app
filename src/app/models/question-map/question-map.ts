import { Question } from '../question/question';
import { Orientation } from 'src/app/components/play/orientation.enum';

export class QuestionMap {
    nodes: Node[] = [];

    constructor() {
        this.nodes = [];
    }

    addNode(cell: HTMLElement, question: Question, answer: string) {
        const match = this.nodes.find(element => element.cell === cell);
        if (match === undefined) {
            this.nodes.push(new Node(cell, question, answer));
        } else {
            match.questions.push(question);
        }
    }

    getQuestion(cell: HTMLElement): Question {
        const node = this.nodes.find(element => element.cell === cell);
        return node.questions[0];
    }

    getQuestionByDirection(cell: HTMLElement, orientation: Orientation): Question {
        const node = this.nodes.find(element => element.cell === cell);
        return node.questions.find(question => question.orientation === orientation);
    }

    isCrossroads(cell: HTMLElement): boolean {
        const node = this.nodes.find(element => element.cell === cell);
        return node.questions.length > 1;
    }

    getCells(question: Question): HTMLElement[] {
        const cells: HTMLElement[] = [];
        this.nodes.forEach(node => {
            node.questions.forEach(q => {
                if (q.identifier === question.identifier) {
                    cells.push(node.cell);
                }
            });
        });
        return cells;
    }

    getAnswer(cell: HTMLElement): string {
        const node = this.nodes.find((n: Node) => {
            return n.cell === cell;
        });
        return node.answer;
    }

    checkProgress(): number {
        let correctCells = 0;
        const totalCells = this.nodes.length;
        this.nodes.forEach(node => {
            const element = <HTMLElement>node.cell.querySelector('.letter');
            if (node.answer.toLowerCase() === element.innerText.toLowerCase()) {
                correctCells++;
            }
        });
        return Math.round((correctCells / totalCells) * 100);
    }

    checkAnswer(cell: HTMLElement, guess: string): boolean {
        const node = this.nodes.find((n: Node) => {
            return n.cell === cell;
        });
        return node.answer === guess.toUpperCase();
    }
}

export class Node {
    cell: HTMLElement;
    questions: Question[] = [];
    answer: string;

    constructor(cell: HTMLElement, question: Question, answer: string) {
        this.cell = cell;
        this.questions.push(question);
        this.answer = answer;
    }
}
