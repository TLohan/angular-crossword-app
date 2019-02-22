import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board/board';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth.service';
import { Auth2Service } from '../core/auth2.service';
import { BoardStat } from '../models/board/board-stat';

@Injectable()
export class BoardService {

    baseServerUrl = environment.baseServerUrl;

    constructor(private http: HttpClient, private authService: Auth2Service) {
    }

    getBoards(): Observable<any> {
        const url = `${this.baseServerUrl}/xwords`;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`);
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

    getBoardStatsForUser(userEmail: string): Observable<any> {
        const url = `${this.baseServerUrl}/boardstats/user/${userEmail}`;
        return this.http.get(url);
    }

    getBoardStatsForBoard(boardId: number): Observable<any> {
        const url = `${this.baseServerUrl}/boardStats/board/${boardId}`;
        return this.http.get(url);
    }

    addBoardStat(boardStat: BoardStat) {
        const url = `${this.baseServerUrl}/boardStats`;
        const body = boardStat;
        return this.http.post(url, body, { observe: 'response' });
    }

    teapot(): Observable<any> {
        const url = `${this.baseServerUrl}/xwords/teapot`;
        return this.http.get(url);
    }
}
