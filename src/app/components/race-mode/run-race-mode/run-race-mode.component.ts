import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceModeService, NamespaceSocket } from 'src/app/services/race-mode.service';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board/board';
import { Socket } from 'ngx-socket-io';
import { PlayMode } from '../../play/play-mode.interface';
import { PlayService } from 'src/app/services/play.service';

@Component({
    selector: 'app-run-race-mode',
    templateUrl: './run-race-mode.component.html',
    styleUrls: ['./run-race-mode.component.sass'],
})
export class RunRaceModeComponent implements OnInit, OnDestroy {

    mode = PlayMode.RACE_MODE;
    numberUsersOnline: number;
    board: Board;
    opponentProgress: number;
    opponentReveals: number;
    matchReady: boolean;

    opponentDisconnected = false;


    replayPendingSource: Observable<boolean>;
    replayPending = false;

    get matchSoc(): NamespaceSocket {
        return this.raceModeService.matchSocket;
    }



    constructor(private raceModeService: RaceModeService, private playService: PlayService) {

        if (!this.raceModeService.connected) {
            console.log('unconnected');
            this.raceModeService.socket.connect();
        } else {
            this.raceModeService.socket.connect();
            console.log('connected');
        }

        this.raceModeService.replayPendingSource.subscribe(value => {
            this.replayPending = value;
            console.log('waiting for opponent');
        });

        this.raceModeService.numUsersOnlineSource.subscribe(numUsers => {
            console.log('users online:', numUsers);
            this.numberUsersOnline = numUsers;
        });

        this.raceModeService.matchReadySource.subscribe(value => {
            console.log('Match Ready:', value);
            this.matchReady = value;
        });

        this.raceModeService.namespaceSource.subscribe(value => {
            if (value) {
                this.raceModeService.matchSocket.matchReadySource.subscribe(bool => {
                    console.log('Match Ready:', bool);
                    this.matchReady = bool;
                });

                this.raceModeService.matchSocket.boardSource.subscribe(board => {
                    this.board = board;
                });
            }
        });

        this.raceModeService.otherPlayerDisconnectedSource.subscribe(_ => {
            console.log('other player disconnected!');
            this.replayPending = false;
            this.opponentDisconnected = true;
        });

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.raceModeService.matchSocket) {
            this.raceModeService.matchSocket.socket.disconnect();
        }
        this.raceModeService.socket.disconnect();
        console.log('destroyed');
    }

    newGame() {
        this.replayPending = false;
        this.opponentDisconnected = false;
        this.raceModeService.rejoinQueue();
    }


}
