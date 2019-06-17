import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Difficulty } from 'src/app/models/board/difficulty.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Board } from 'src/app/models/board/board';
import { CreateCrosswordService } from 'src/app/services/create-crossword.service';

@Component({
    selector: 'app-specify-difficulty-modal',
    templateUrl: './specify-difficulty-modal.component.html',
    styleUrls: ['./specify-difficulty-modal.component.sass']
})
export class SpecifyDifficultyModalComponent implements OnInit {

    @Input() difficulty: Difficulty;
    @Input() board: Board;
    levels = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];

    constructor(private activeModal: NgbActiveModal, private createCrosswordService: CreateCrosswordService) { }

    ngOnInit() {
        this.difficulty = Difficulty.MEDIUM;
    }

    save() {
        const element = <HTMLSelectElement>document.getElementById('selectLevel');
        const index = element.selectedIndex;
        this.difficulty = this.levels[index];
        this.board.difficulty = this.difficulty;
        this.createCrosswordService.saveCrossword(this.board);
        console.log('level:', this.difficulty);
        this.activeModal.close();
     }

    close() {
        this.activeModal.dismiss();
    }

}
