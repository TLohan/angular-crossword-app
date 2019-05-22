import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerPipe } from '../pipes/timer.pipe';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        TimerPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TimerPipe,
    ]
})
export class SharedModule { }
