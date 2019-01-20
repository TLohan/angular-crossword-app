import { Question } from '../question/question';
import { Board } from './board';

describe('Board', () => {

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

    it('should return the correct questionsAcross', () => {
        // arrange
        const board = new Board(10, 10);
        board.questions = QUESTIONS;

        // act
        const questionsAcross = board.questionsAcross;

        // assert
        expect(questionsAcross).toEqual([QUESTIONS[1], QUESTIONS[3], QUESTIONS[5]]);
    });

    it('should return the correct questionsDown', () => {
        // arrange
        const board = new Board(10, 10);
        board.questions = QUESTIONS;

        // act
        const questionsDown = board.questionsDown;

        // assert
        expect(questionsDown).toEqual([QUESTIONS[0], QUESTIONS[2], QUESTIONS[4]]);
    });

    it('should sort the questions correctly', () => {
        // arrange
        const board = new Board(15, 15);
        board.addQuestion(QUESTIONS[4]);
        board.addQuestion(QUESTIONS[0]);
        board.addQuestion(QUESTIONS[5]);
        board.addQuestion(QUESTIONS[3]);
        board.addQuestion(QUESTIONS[1]);
        board.addQuestion(QUESTIONS[2]);

        // act
        const questionsAcross = board.questionsAcross;

        // assert
        expect(questionsAcross).toEqual([QUESTIONS[1], QUESTIONS[3], QUESTIONS[5]]);

    });


});
