import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardStat } from 'src/app/models/board/board-stat';
import { BoardService } from 'src/app/services/board.service';
import { ToastrService } from 'ngx-toastr';
import { Auth2Service } from 'src/app/core/auth2.service';
import { Store, select } from '@ngrx/store';
import * as fromBoard from '../../states/board.reducer';
import * as fromBoardStats from '../../states/boardStat.reducer';
import * as fromRoot from '../../states/app.state';
import * as boardActions from 'src/app/states/board.actions';
import * as boardStatActions from 'src/app/states/board-stat.actions';
import { takeWhile } from 'rxjs/operators';
import * as fromAuth from '../../states/auth.reducer';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
    pageSize = 5;
    boards: Board[];
    boardStats: BoardStat[];
    recordTimes: BoardStat[] = [];

    private _filterBy = 'all';
    filteredBoards: Board[] = [];
    pagedArray: Board[] = [];
    _page = 1;
    componentActive: boolean;
    errorMessage$;
    _profile: any;

    get page() {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
        const start = this.pageSize * (this._page - 1);
        const finish = start + this.pageSize;
        this.pagedArray = this.filteredBoards.slice(start, finish);
    }

    get profile() {
        return this._profile;
    }

    // tslint:disable-next-line:max-line-length
    constructor(private boardService: BoardService,
        private toastr: ToastrService,
        private authService: Auth2Service,
        private store: Store<fromRoot.State>) { }

    ngOnInit(): void {
        this.componentActive = true;

        this.store.select(fromAuth.selectIsLoggedIn).subscribe(val => {
            if (val) {
                this.getData();
            }
        });

        this.errorMessage$ = this.store.pipe(select(fromBoard.getError)).subscribe(msg => {
            if (msg && msg.length) {
                this.toastr.error(msg);
            }
        });
    }

    delete(board: Board) {
        this.boardService.deleteBoard(board).subscribe((response) => {
            this.boardService.getBoards().subscribe(data => {
                this.boards = data;
                this.filterCrosswords(this._filterBy);
            });
        });
    }

    private findBoardStat(board: Board): BoardStat {
        return this.boardStats.find(bs => bs.boardId === board.id);
    }

    getData() {
        this.store.dispatch(new boardActions.LoadBoards());
        this.store.dispatch(new boardStatActions.LoadUserStats());
        this.store.dispatch(new boardStatActions.LoadRecordTimes());

        this.store.pipe(select(fromBoard.getBoards),
            takeWhile(_ => this.componentActive))
            .subscribe((boards: Board[]) => {
                this.boards = boards;
                this.filteredBoards = boards;
                this.page = 1;
            });

        this.store.pipe(select(fromBoardStats.getBoardStats),
            takeWhile(_ => this.componentActive))
            .subscribe((boardStats: BoardStat[]) => {
                this.boardStats = boardStats;
            });

        this.store.pipe(select(fromBoardStats.getRecordStats),
            takeWhile(_ => this.componentActive))
            .subscribe((recordTimes: BoardStat[]) => {
                this.recordTimes = recordTimes;
            });
    }

    getRecordStat(board: Board): BoardStat {
        const record: BoardStat = this.recordTimes.find(bs => bs.boardId === board.id);
        return record;
    }

    filterCrosswords(value: string) {
        this._filterBy = value;
        switch (value) {
            case 'all':
                this.filteredBoards = this.boards;
                break;
            case 'played':
                this.filteredBoards = this.boards.filter(b => {
                    const stat = this.findBoardStat(b);
                    if (stat) {
                        return stat.played;
                    }
                    return false;
                });
                break;
            case 'unplayed':
                this.filteredBoards = this.boards.filter(b => {
                    const stat = this.findBoardStat(b);
                    if (stat) {
                        return !stat.played;
                    }
                    return true;
                });
                break;
            default:
                break;
        }
        this.page = 1;
    }

    ngOnDestroy() {
        this.componentActive = false;
    }
}
