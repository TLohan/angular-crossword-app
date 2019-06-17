import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardService } from 'src/app/services/board.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpecifyDifficultyModalComponent } from '../specify-difficulty-modal/specify-difficulty-modal.component';
import { Difficulty } from 'src/app/models/board/difficulty.enum';
import { CreateCrosswordService } from 'src/app/services/create-crossword.service';

@Component({
    selector: 'app-create-crossword',
    templateUrl: './create-crossword.component.html',
    styleUrls: ['./create-crossword.component.sass']
})
export class CreateCrosswordComponent implements OnInit {

    board: Board;
    pickSizeMode = true;
    specifyDifficultyModal: NgbModalRef;

    constructor(private boardService: BoardService, private router: Router,
         private modalService: NgbModal, private createCrosswordService: CreateCrosswordService) {
        this.board = new Board(15, 15);
    }

    ngOnInit() {
        this.createCrosswordService.saveCrosswordTriggered$.subscribe(board => {
            this.board = board;
            this.save();
        });
    }

    nextStep(value: boolean) {
        console.log(value);
        this.pickSizeMode = !value;
    }

    triggerSpecifyDifficultyModal() {
        if (this.modalService.hasOpenModals) {
            this.modalService.dismissAll();
        }
        this.specifyDifficultyModal = this.modalService.open(SpecifyDifficultyModalComponent, { centered: true });
        this.specifyDifficultyModal.componentInstance.board = this.board;
        this.specifyDifficultyModal.componentInstance.difficulty = Difficulty.MEDIUM;
    }

    save() {
        this.boardService.saveBoard(this.board).subscribe((res: HttpResponse<any>) => {
            if (res.status === 201) {
                this.router.navigate(['/']);
            }
        },
            (err: HttpErrorResponse) => {
                console.log(err.error);
                console.log(err.status);
            }
        );
    }
}
