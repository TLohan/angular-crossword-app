import { Question } from './question';

describe('Question', () => {

    it('should return the correct value for row', () => {
        // arrange
        const question = new Question('4-6', 'Test question', 'TestAnswer', 'down', '5D');

        // act
        const result = question.row;

        // assert
        expect(result).toBe(4);
    });

    it ('should return the correct value for col', () => {
        // arrange
        const question = new Question('4-6', 'Test question', 'TestAnswer', 'down', '5D');

        // act
        const result = question.col;

        // assert
        expect(result).toBe(6);
    });

});
