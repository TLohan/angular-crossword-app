import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class RaceModeService implements OnDestroy {

    numUsersOnline = this.socket.fromEvent<number>('usersOnline');
    onlineQueue = this.socket.fromEvent<string[]>('onlineQueue');

    _namespace: string;

    set namespace(value: Observable<string>) {
        value.subscribe(data => {
            this._namespace = data;
            this.socket.of(this._namespace);
            console.log('connected to: ', this._namespace);
        });
    }

    activeUserId: string;

    constructor(private socket: Socket) {
        this.namespace = this.socket.fromEvent<string>('setNamespace');
    }

    getUsersOnline() {
        this.socket.emit('getOnlineUsers');
    }

    addUserToQueue(id: string): void {
        this.activeUserId = this.generateId();
        this.socket.emit('addUserToQueue', this.activeUserId);
    }

    ngOnDestroy(): void {
        this.socket.emit('removeUserFromQueue', this.activeUserId);
        this.socket.disconnect();
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
