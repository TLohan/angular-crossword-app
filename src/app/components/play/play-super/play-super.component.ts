import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { FormGroup, AbstractControl } from '@angular/forms';
import { PlayBoardComponent } from '../play-board/play-board.component';
import { PlayService } from 'src/app/services/play.service';

@Component({
    selector: 'app-play-super',
    templateUrl: './play-super.component.html',
    styleUrls: ['./play-super.component.sass']
})
export class PlaySuperComponent implements OnInit {

    public _board: Board;
    public get board(): Board {
        return this._board;
    }
    public set board(board: Board) {
        this._board = board;
    }

    @ViewChild(PlayBoardComponent)
    playBoardComponent: PlayBoardComponent;

    listener: EventListenerOrEventListenerObject;
    inputListener: EventListenerOrEventListenerObject;

    constructor(protected playService: PlayService) {
    }

    ngOnInit() {
    }

    listen() {
        console.log('hit listen in play-super');
        this.playBoardComponent.listen();
    }

    checkInput(flag: boolean) {
        this.playBoardComponent.checkInput(flag);
    }

    triggerKeyboard(): void {
        this.playBoardComponent.triggerKeyboard();
    }

}
