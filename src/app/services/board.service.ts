import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board/board';
import { environment } from 'src/environments/environment';
import { Auth2Service } from '../core/auth2.service';
import { BoardStat } from '../models/board/board-stat';
import * as fromRoot from '../states/app.state';
import { Store, select } from '@ngrx/store';

@Injectable()
export class BoardService {

    baseServerUrl = environment.baseServerUrl;
    _accessToken: string;
    _profile: any;

    get accessToken(): string {
        return this.authService.accessToken;
    }

    get profile(): any {
        return this.authService.userProfile;
    }

    constructor(private http: HttpClient, private authService: Auth2Service, private store: Store<fromRoot.State>) {}

    getBoards(): Observable<any> {
        const url = `${this.baseServerUrl}/xwords`;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
        return this.http.get(url, {headers: headers});
    }

    getBoard(id: number) {
        const url = `${this.baseServerUrl}/xwords/${id}`;
        return this.http.get(url);
    }

    saveBoard(board: Board): Observable<any> {
        const url = `${this.baseServerUrl}/xwords/new`;
        const body = board;
        return this.http.post(url, body, {observe: 'response'});
    }

    deleteBoard(board: Board): Observable<any> {
        const url = `${this.baseServerUrl}/xwords/${board.id}`;
        return this.http.delete(url);
    }

    getRandom() {
        const url = `${this.baseServerUrl}/xwords/play/random`;
        return this.http.get(url);
    }

    getBoardStatsForUser(): Observable<any> {
        const userEmail = this.profile.name;
        const url = `${this.baseServerUrl}/boardstats/user/${userEmail}`;
        return this.http.get(url);
    }

    getBoardStatsForBoard(boardId: number): Observable<any> {
        const url = `${this.baseServerUrl}/boardStats/board/${boardId}`;
        return this.http.get(url);
    }

    addBoardStat(boardStat: BoardStat) {
        const url = `${this.baseServerUrl}/boardStats`;
        boardStat.userId = this.profile.name;
        const body = boardStat;
        return this.http.post(url, body, { observe: 'response' });
    }

    getRecordStats(): Observable<any> {
        const url = `${this.baseServerUrl}/boardStats/bestTimes`;
        return this.http.get(url);
    }

    teapot(): Observable<any> {
        const url = `${this.baseServerUrl}/xwords/teapot`;
        return this.http.get(url);
    }
}
