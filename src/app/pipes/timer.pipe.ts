import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timer',
    pure: false
})
export class TimerPipe implements PipeTransform {

    transform(secs: number): string {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        let minuteStr, secondStr;
        if (minutes <= 9) {
            minuteStr = `0${minutes}`;
        } else {
            minuteStr = `${minutes}`;
        }

        if (seconds <= 9) {
            secondStr = `0${seconds}`;
        } else {
            secondStr = `${seconds}`;
        }

        return `${minuteStr}:${secondStr}`;
    }
}