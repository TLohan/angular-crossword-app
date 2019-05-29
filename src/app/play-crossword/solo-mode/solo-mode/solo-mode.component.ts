import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { BoardStat } from 'src/app/models/board/board-stat';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../states/app.state';
import * as fromBoard from '../../../states/board.reducer';
import * as fromAuth from '../../../states/auth.reducer';
import * as authActions from '../../../states/auth.actions';
import * as boardActions from 'src/app/states/board.actions';
import { takeWhile, map, exhaustMap } from 'rxjs/operators';

@Component({
    selector: 'app-solo-mode',
    templateUrl: './solo-mode.component.html',
    styleUrls: ['./solo-mode.component.sass']
})
export class SoloModeComponent extends PlaySuperComponent implements OnInit, OnDestroy {

    readonly PLAY_MODE: PlayMode = PlayMode.SOLO_MODE;
    timer: number;
    cellMap: CellMap = new CellMap();
    componentActive: boolean;


    // tslint:disable-next-line:max-line-length
    constructor(private boardService: BoardService, private route: ActivatedRoute, protected playService: PlayService, private modalService: NgbModal, private store: Store<fromRoot.State>) {
        super(playService);
    }

    ngOnInit() {
        console.log('hello tom');
        this.componentActive = true;
        const id = this.route.snapshot.paramMap.get('id');
        console.log('id:', id);

        this.store.pipe(select(fromAuth.selectIsLoggedIn), takeWhile(() => this.componentActive)).subscribe(val => {
            if (val) {
                this.store.dispatch(new boardActions.LoadBoards());
                if (id === 'random') {
                    this.store.dispatch(new boardActions.RandomiseCurrentBoard());
                } else {
                    this.store.dispatch(new boardActions.SetCurrentBoardId(+id));
                }
    
                this.store.pipe(select(fromBoard.getCurrentBoard, takeWhile(() => this.componentActive))).subscribe((board: Board) => {
                    this.board = new Board();
                    this.board.fromJSON(board);
                });
            }

        });

        this.playService.matchFinishedTriggered.subscribe(_ => {
            // trigger match finished
            if (this.modalService.hasOpenModals) {
                this.modalService.dismissAll();
            }
            const modalRef = this.modalService.open(SoloMatchFinishedModalComponent, { centered: true, backdrop: 'static' });
            modalRef.componentInstance.timer = this.timer;
            const stat = new BoardStat();
            stat.boardId = this.board.id;
            stat.date = new Date(Date.now());
            stat.seconds = this.timer;
            stat.played = true;
            this.boardService.addBoardStat(stat);
        });

        this.playService.soloReplayTriggered$.subscribe(_ => {
            this.store.dispatch(new boardActions.RandomiseCurrentBoard());
        });

        this.playService.timerChanged$.subscribe(val => {
            this.timer = val;
        });

        this.playService.revealAllTriggered$.subscribe(_ => {
            this.displayRevealAllModal();
        });
    }

    setCellMap(cellMap: CellMap): void {
        this.cellMap.nodes = cellMap.nodes;
    }

    displayRevealAllModal() {
        if (this.modalService.hasOpenModals) {
            this.modalService.dismissAll();
        }
        const modalRef = this.modalService.open(RevealAllModalComponent, { centered: true, backdrop: 'static' });
    }

    ngOnDestroy() {
        this.componentActive = false;
    }

}
