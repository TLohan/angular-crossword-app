import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';
import { Board } from '../models/board/board';

@Injectable()
export class RaceModeService implements OnDestroy {

    connectedSource = this.socket.fromEvent<boolean>('connected');

    numUsersOnlineSource = this.socket.fromEvent<number>('usersOnline');
    namespaceIdSource = this.socket.fromEvent<string>('setMatchId');
    matchReadySource = this.socket.fromEvent<boolean>('matchReady');

    onlineQueue = this.socket.fromEvent<string[]>('onlineQueue'); // DUD ?

    replayPendingSource = this.socket.fromEvent<boolean>('waitingForOpponent');
    opponentRemainingRevealsSource = this.socket.fromEvent<number>('updateOpponentRevealsRemaining');
    raceFinishedSource = this.socket.fromEvent<number[]>('finishedRace');
    opponentProgressSource = this.socket.fromEvent<number>('updateOpponentProgress');

    otherPlayerDisconnectedSource = this.socket.fromEvent<boolean>('otherPlayerDisconnected');

    matchId: string;
    matchSocket: NamespaceSocket;
    namespaceSource = new Subject<boolean>();
    namespaceSet$ = this.namespaceSource.asObservable();
    connected = false;

    matchReady = false;

    constructor(public socket: Socket) {
        console.log('raceModeServiceCreated');
        this.namespaceIdSource.subscribe(value => {
            console.log('set namespace: ', value);
            this.matchId = value;
            this.matchSocket = new NamespaceSocket(this.matchId);
            this.matchSocket.init();
            this.namespaceSource.next(true);
        });

        this.connectedSource.subscribe(value => {
            this.connected = value;
        });
    }


    getUsersOnline() {
        this.socket.emit('getOnlineUsers');
    }

    updateProgress(progress: number) {
        this.matchSocket.socket.emit('updateProgress', progress);
    }

    updateRemainingReveals(remainingReveals: number) {
        this.matchSocket.socket.emit('updateRevealsRemaining', remainingReveals);
    }

    raceFinished() {
        this.matchSocket.socket.emit('finishedRace');
    }

    requestReplay() {
        this.matchSocket.socket.emit('requestReplay');
    }

    declineReplay() {
        this.matchSocket.socket.emit('declineReplay');
    }

    ngOnDestroy(): void {
        // this.socket.emit('removeUserFromQueue', this.activeUserId);
        console.log('raceModeService destroyed');
    }

    rejoinQueue() {
        this.socket.emit('rejoinQueue');
    }

    reconnect() {
        this.socket.emit('disconnect');
    }

    generateId(length: number = 8): string {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

        let id = '';
        for (let i = 0; i < length; i++) {
            id += chars[Math.floor(Math.random() * chars.length)];
        }
        console.log(id);
        return id;
    }
}



export class NamespaceSocket {
    public static count = 0;

    socket: WrappedSocket;
    namespaceId: string;
    matchReadySource: Observable<boolean>;
    boardSource: Observable<Board>;

    constructor(namespaceId: string = '') {
        this.namespaceId = namespaceId;
    }

    init() {
        console.log('connecting to socket: ', this.namespaceId);
        this.socket = new WrappedSocket({ url: `https://race-mode-server.herokuapp.com${this.namespaceId}`, options: {} });
        console.log('socket: ', this.socket);
        this.matchReadySource = this.socket.fromEvent<boolean>('matchReady');
        this.boardSource = this.socket.fromEvent<Board>('setBoard');
    }

}
