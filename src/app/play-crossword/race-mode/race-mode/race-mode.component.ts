import { Component, OnInit, Input } from '@angular/core';
import { PlaySuperComponent } from '../../play-super/play-super.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayService } from 'src/app/services/play.service';
import { RaceModeService } from 'src/app/services/race-mode.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Board } from 'src/app/models/board/board';
import { Question } from 'src/app/models/question/question';
import { PlayMode } from '../../play-mode.interface';
import { CellMap } from 'src/app/models/cell-map/cell-map';
import { RevealAllModalComponent } from '../../modals/reveal-all-modal/reveal-all-modal.component';
import { RaceEndedModalComponent } from '../../modals/race-ended-modal/race-ended-modal.component';

@Component({
  selector: 'app-race-mode',
  templateUrl: './race-mode.component.html',
  styleUrls: ['./race-mode.component.sass']
})
export class RaceModeComponent extends PlaySuperComponent implements OnInit {

    readonly PLAY_MODE: PlayMode = PlayMode.RACE_MODE;

    _selectedQuestion: Question;
    cellMap: CellMap = new CellMap();
    fakeInputFormGroup: FormGroup;
    playerRevealedAll = false;
    opponentRevealedAll = false;
    _ownProgress = 0;

    public get ownProgress(): number {
        return this._ownProgress;
    }

    public set ownProgress(value: number) {
        this._ownProgress = value;
    }

    private _opponentProgress = 0;
    public get opponentProgress() {
        return this._opponentProgress;
    }
    public set opponentProgress(value) {
        this._opponentProgress = value;
    }


    get selectedQuestion(): Question {
        return this._selectedQuestion;
    }

    set selectedQuestion(question: Question) {
        this._selectedQuestion = question;
    }

    @Input()
    set board(board: Board) {
        this._board = board;
    }

    get board(): Board {
        return this._board;
    }


    constructor(playService: PlayService, private raceModeService: RaceModeService, private modalService: NgbModal) {
        super(playService);
        this.raceModeService.raceFinishedSource.subscribe((result: number[]) => {
            this.ownProgress = result[0];
            this.opponentProgress = result[1];
            // trigger modal
            this.triggerRaceFinishedModal();
        });

        this.playService.revealsRemainingChanged$.subscribe(value => {
            this.raceModeService.updateRemainingReveals(value);
        });

        this.playService.matchFinishedTriggered.subscribe(_ => {
            if (!this.playerRevealedAll) {
                this.raceModeService.raceFinished();
            } else {
                this.raceModeService.playerQuit(this.ownProgress);
            }
        });

        this.playService.revealAllTriggered$.subscribe(_ => {
            this.displayRevealAllModal();
        });

        this.playService.revealAllConfirmed$.subscribe(val => {
            this.playerRevealedAll = val;
            this.playerRevealedAll = true;
            this.triggerRaceFinishedModal();
        });

        this.raceModeService.otherPlayerQuitSource.subscribe(value => {
            this.opponentRevealedAll = true;
            console.log('other player quit: ', true);
            this.triggerRaceFinishedModal();
        });

        this.playService.progressChanged$.subscribe(ownProgress => {
            this.ownProgress = ownProgress;
        });

        this.raceModeService.opponentProgressSource.subscribe(oppProgress => {
            this.opponentProgress = oppProgress;
        });
    }

    ngOnInit() {
        this.ownProgress = 0;
        this.opponentProgress = 0;
        this.playService.changeProgress(this.ownProgress);
        this.fakeInputFormGroup = new FormGroup({
            fakeInput: new FormControl()
        });
    }

    setCellMap(cellMap: CellMap): void {
        this.cellMap.nodes = cellMap.nodes;
    }

    triggerRaceFinishedModal() {
        if (this.modalService.hasOpenModals) {
            this.modalService.dismissAll();
        }
        const modalRef = this.modalService.open(RaceEndedModalComponent, { centered: true, backdrop: 'static' });
        modalRef.componentInstance.ownProgress = this.ownProgress;
        modalRef.componentInstance.opponentProgress = this.opponentProgress;
        modalRef.componentInstance.opponentQuit = this.opponentRevealedAll;
        modalRef.componentInstance.playerQuit = this.playerRevealedAll;
    }

    displayRevealAllModal() {
        if (this.modalService.hasOpenModals) {
            this.modalService.dismissAll();
        }
        const modalRef = this.modalService.open(RevealAllModalComponent, {centered: true, backdrop: 'static'});
    }

}
