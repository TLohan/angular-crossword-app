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

    get profile() {
        return this.authService.userProfile;
    }

    constructor(private boardService: BoardService, private toastr: ToastrService, private authService: Auth2Service) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            if (this.authService.userProfile) {
                this.boardService.getBoards().subscribe(data => {
                    this.boards = data;
                });

                this.boardService.getBoardStatsForUser(this.authService.userProfile.name).subscribe(data => {
                    this.boardStats = data;
                });
            }
        }, 1000);
    }

    delete(board: Board) {
        this.boardService.deleteBoard(board).subscribe((response) => {
            this.boardService.getBoards().subscribe(data => {
                this.boards = data;
            });
        });
    }

}
