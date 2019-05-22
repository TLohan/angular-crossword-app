import { Component, OnInit } from '@angular/core';
import { PlaySuperComponent } from '../../play-super/play-super.component';
import { RevealAllModalComponent } from '../../modals/reveal-all-modal/reveal-all-modal.component';
import { Board } from 'src/app/models/board/board';
import { CellMap } from 'src/app/models/cell-map/cell-map';
import { SoloMatchFinishedModalComponent } from '../../modals/solo-match-finished-modal/solo-match-finished-modal.component';
import { BoardService } from 'src/app/services/board.service';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from 'src/app/services/play.service';
import { PlayMode } from '../../play-mode.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-solo-mode',
    templateUrl: './solo-mode.component.html',
    styleUrls: ['./solo-mode.component.sass']
})
export class SoloModeComponent extends PlaySuperComponent implements OnInit {

    readonly PLAY_MODE: PlayMode = PlayMode.SOLO_MODE;
    timer: number;
    cellMap: CellMap = new CellMap();


    // tslint:disable-next-line:max-line-length
    constructor(private boardService: BoardService, private route: ActivatedRoute, protected playService: PlayService, private modalService: NgbModal) {
        super(playService);
        const id = this.route.snapshot.paramMap.get('id');
        console.log('id', id);
        console.log(id);
        if (!isNaN(+id)) {
            this.boardService.getBoard(+id).subscribe((data: Board) => {
                console.log(data);
                this.board = new Board();
                this.board.fromJSON(data);
            });
        } else {
            this.getRandomBoard();
        }

        this.playService.matchFinishedTriggered.subscribe(_ => {
            // trigger match finished
            if (this.modalService.hasOpenModals) {
                this.modalService.dismissAll();
            }
            const modalRef = this.modalService.open(SoloMatchFinishedModalComponent, { centered: true, backdrop: 'static' });
            modalRef.componentInstance.timer = this.timer;
        });

        this.playService.soloReplayTriggered$.subscribe(_ => {
            this.getRandomBoard();
        });

        this.playService.timerChanged$.subscribe(val => {
            this.timer = val;
        });

        this.playService.revealAllTriggered$.subscribe(_ => {
            this.displayRevealAllModal();
        });
    }

    ngOnInit() {
    }

    setCellMap(cellMap: CellMap): void {
        this.cellMap.nodes = cellMap.nodes;
    }

    getRandomBoard() {
        this.boardService.getRandom().subscribe((data: Board) => {
            this.board = data;
        });
    }

    displayRevealAllModal() {
        if (this.modalService.hasOpenModals) {
            this.modalService.dismissAll();
        }
        const modalRef = this.modalService.open(RevealAllModalComponent, { centered: true, backdrop: 'static' });
    }

}
