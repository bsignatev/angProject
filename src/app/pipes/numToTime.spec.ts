import { NumToTime } from './numToTime';

describe('Pipe - numToTime', () => {
    let numberToTimePipe: NumToTime;

    beforeEach(() => {
        numberToTimePipe = new NumToTime();
    });

    it('transform 0 as 0h 0m', () => {
        let result = numberToTimePipe.transform(0);
        expect(result).toBe('0h 0m');
    });

    it('transform 25 as 0h 25m', () => {
        let result = numberToTimePipe.transform(25);
        expect(result).toBe('0h 25m');
    });

    it('transform 61 as 1h 1m', () => {
        let result = numberToTimePipe.transform(61);
        expect(result).toBe('1h 1m');
    });

    it('transform 82 as 1h 22m', () => {
        let result = numberToTimePipe.transform(82);
        expect(result).toBe('1h 22m');
    });
});