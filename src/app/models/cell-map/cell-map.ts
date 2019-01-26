import { Question } from '../question/question';

export class CellMap {

    nodes: Node[];

    constructor() {
        this.nodes = [];
    }

    addCell(question: Question, cell: HTMLElement) {
        let node = this.nodes.find((e: Node) => {
            return e.question.clue === question.clue;
        });
        if (node === undefined) {
            node = new Node(question);
            this.nodes.push(node);
        }
        node.cells.push(cell);
    }

    getCells(question: Question): HTMLElement[] {
        const node = this.nodes.find((e: Node) => e.question.identifier === question.identifier);
        if (node) {
            return node.cells;
        }
    }

    checkIfAnswered(question: Question) {
        if (this.nodes.length > 0) {
            const cells = this.getCells(question);
            return cells.every(cell => cell.classList.contains('guessed'));
        }
        return false;
    }

}

class Node {
    question: Question;
    cells: HTMLElement[];

    constructor(question: Question) {
        this.question = question;
        this.cells = [];
    }
}
