import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardService } from 'src/app/services/board.service';
import { ActivatedRoute } from '@angular/router';
import { Auth2Service } from 'src/app/core/auth2.service';
import { PlayMode } from '../play-mode.interface';
import { Question } from 'src/app/models/question/question';
import { PlaySuperComponent } from '../play-super/play-super.component';
import { PlayService } from 'src/app/services/play.service';
import { CellMap } from 'src/app/models/cell-map/cell-map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SoloMatchFinishedModalComponent } from '../../solo-mode/solo-match-finished-modal/solo-match-finished-modal.component';

@Component({
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
}

