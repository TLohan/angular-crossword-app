import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board/board';
import { environment } from 'src/environments/environment';

@Injectable()
export class BoardService {

    baseServerUrl = environment.baseServerUrl;

    constructor(private http: HttpClient) {
    }

    getBoards(): Observable<any> {
        const url = `${this.baseServerUrl}/xwords`;
        return this.http.get(url);
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

    teapot(): Observable<any> {
        const url = `${this.baseServerUrl}/xwords/teapot`;
        return this.http.get(url);
    }
}
