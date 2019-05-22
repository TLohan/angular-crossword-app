import { Injectable, OnDestroy } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';
import { Board } from '../models/board/board';
import { environment } from 'src/environments/environment';

@Injectable()
export class RaceModeService implements OnDestroy {
    static instance_counter = 0;
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
    otherPlayerQuitSource = this.socket.fromEvent<boolean>('otherPlayerQuit');

    matchId: string;
    matchSocket: NamespaceSocket;
    namespaceSource = new Subject<boolean>();
    namespaceSet$ = this.namespaceSource.asObservable();
    connected = false;

    matchReady = false;

    constructor(public socket: WrappedSocket) {
        console.log('raceModeServiceCreated');
        console.log('raceModeService instances created: ', ++RaceModeService.instance_counter);
        console.log('socket', socket);
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

    playerQuit(progress: number) {
        console.log('called playerQuit');
        this.matchSocket.socket.emit('playerQuit', progress);
    }

    reconnect() {
        this.socket.emit('reconnect');
    }

    removeFromQueue() {
        this.socket.emit('removeFromQueue');
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
    socketUrl = environment.socketUrl.url;

    socket: WrappedSocket;
    namespaceId: string;
    matchReadySource: Observable<boolean>;
    boardSource: Observable<Board>;

    constructor(namespaceId: string = '') {
        this.namespaceId = namespaceId;
    }

    init() {
        console.log('connecting to socket: ', this.namespaceId);
        this.socket = new WrappedSocket({ url: `${this.socketUrl}${this.namespaceId}`, options: {} });
        console.log('socket: ', this.socket);
        this.matchReadySource = this.socket.fromEvent<boolean>('matchReady');
        this.boardSource = this.socket.fromEvent<Board>('setBoard');
    }

}
