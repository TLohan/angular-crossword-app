import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board/board';

@Injectable()
export class BoardService {

    constructor(private http: HttpClient) {

    }

    getBoards(): Observable<any> {
        const url = 'http://localhost:60844/api/xwords';
        return this.http.get(url);
    }

    getBoard(id: number) {
        const url = `http://localhost:60844/api/xwords/${id}`;
        return this.http.get(url);
    }

    saveBoard(board: Board): void {
        const url = `http://localhost:60844/api/xwords/new`;
        const body = board;
        this.http.post(url, body).subscribe();
    }
}
