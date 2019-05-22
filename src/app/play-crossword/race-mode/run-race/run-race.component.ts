import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayMode } from '../../play-mode.interface';
import { Board } from 'src/app/models/board/board';
import { NamespaceSocket, RaceModeService } from 'src/app/services/race-mode.service';
import { PlayService } from 'src/app/services/play.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-run-race',
    templateUrl: './run-race.component.html',
    styleUrls: ['./run-race.component.sass'],
})
export class RunRaceComponent implements OnInit, OnDestroy {

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

    constructor(private raceModeService: RaceModeService) {

        console.log('socket: ', this.raceModeService.socket);
        console.log('socket id', this.raceModeService.socket.ioSocket['id']);

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
        this.raceModeService.socket.emit('checkIfConnected');
    }

    ngOnDestroy() {
        if (this.raceModeService.matchSocket) {
            this.raceModeService.matchSocket.socket.disconnect();
        }
        this.raceModeService.removeFromQueue();
        console.log('destroyed');
    }

    newGame() {
        this.replayPending = false;
        this.opponentDisconnected = false;
        this.raceModeService.rejoinQueue();
    }


}
