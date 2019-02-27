import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board/board';
import { ToastrService } from 'ngx-toastr';
import { Auth2Service } from 'src/app/core/auth2.service';
import { BoardStat } from 'src/app/models/board/board-stat';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    boards: Board[];
    boardStats: BoardStat[];
    private _filterBy = 'all';
    filteredBoards: Board[];

    get profile() {
        return this.authService.userProfile;
    }

    constructor(private boardService: BoardService, private toastr: ToastrService, private authService: Auth2Service) {
    }

    ngOnInit(): void {
        const x = setInterval(() => {
            if (this.authService.userProfile) {
                this.getData();
                clearInterval(x);
            }
        }, 50);
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
        this.boardService.getBoards().subscribe(data => {
            this.boards = data;
            this.filteredBoards = data;
        });

        this.boardService.getBoardStatsForUser(this.authService.userProfile.name).subscribe(data => {
            this.boardStats = data;
        });
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
    }

}
