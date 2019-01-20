import { Node, QuestionMap } from './question-map';
import { Question } from '../question/question';

describe('QuestionMap', () => {

    let QUESTIONS: Question[];

    beforeEach(() => {
        QUESTIONS = [
            new Question('0-0', 'Capital of Ireland', 'Dublin', 'down', '1D'),
            new Question('2-3', 'Capital of France', 'Paris', 'across', '1A'),
            new Question('5-7', 'Capital of Germany', 'Berlin', 'down', '2D'),
            new Question('8-0', 'Capital of Spain', 'Madrid', 'across', '2A'),
            new Question('5-2', 'Capital of Portugal', 'Lisbon', 'down', '3D'),
            new Question('10-11', 'Capital of Italy', 'Rome', 'across', '3A'),
        ];
    });

    it('should create individual Nodes for individual HTMLElements', () => {
        // arrange
        const qmap = new QuestionMap();
        const htmlElement1 = (<HTMLElement>{accessKey: 'abc'});
        const htmlElement2 = (<HTMLElement>{accessKey: 'def'});

        // act
        qmap.addNode(htmlElement1, QUESTIONS[0]);
        qmap.addNode(htmlElement2, QUESTIONS[1]);

        // assert
        expect(qmap.nodes.length).toBe(2);
    });

    it('should not create Nodes with duplicate HTMLElements', () => {
        // arrange
        const qmap = new QuestionMap();
        const htmlElement = (<HTMLElement>{});

        // act
        qmap.addNode(htmlElement, QUESTIONS[0]);
        qmap.addNode(htmlElement, QUESTIONS[1]);

        // assert
        expect(qmap.nodes.length).toBe(1);
    });

    it('should get the correct question based on direction specified', () => {
        // arrange
        const qmap = new QuestionMap();
        const htmlElement = (<HTMLElement>{});

        // act
        qmap.addNode(htmlElement, QUESTIONS[0]);
        qmap.addNode(htmlElement, QUESTIONS[1]);
        const question = qmap.getQuestionByDirection(htmlElement, 'across');

        // assert
        expect(question).toEqual(QUESTIONS[1]);
    });
});
