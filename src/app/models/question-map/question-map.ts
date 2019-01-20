import { Question } from '../question/question';

export class QuestionMap {
   nodes: Node[] = [];

   addNode(cell: HTMLElement, question: Question) {
      const match = this.nodes.find(element => element.cell === cell);
      if (match === undefined) {
          this.nodes.push(new Node(cell, question));
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
}

export class Node {
    cell: HTMLElement;
    questions: Question[] = [];

    constructor(cell: HTMLElement, question: Question) {
        this.cell = cell;
        this.questions.push(question);
    }
}
