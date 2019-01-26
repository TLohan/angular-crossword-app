import { Question } from '../question/question';

export class QuestionMap {
   nodes: Node[] = [];

   addNode(cell: HTMLElement, question: Question, answer: string) {
      const match = this.nodes.find(element => element.cell === cell);
      if (match === undefined) {
          this.nodes.push(new Node(cell, question, answer));
        } else {
            match.questions.push(question);
        }
   }

   getQuestion(cell: HTMLElement): Question {
       const node =  this.nodes.find(element => element.cell === cell);
       return node.questions[0];
   }

   getQuestionByDirection(cell: HTMLElement, orientation: string): Question {
       const node = this.nodes.find(element => element.cell === cell);
       return node.questions.find(question => question.orientation === orientation);
   }

   isCrossroads(cell: HTMLElement): boolean {
        const node =  this.nodes.find(element => element.cell === cell);
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
