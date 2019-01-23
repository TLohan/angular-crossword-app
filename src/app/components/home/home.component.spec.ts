import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board/board';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[routerLink]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {'(click)': 'onClick()' }
})
class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigatedTo = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}


describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let mockBoardService: jasmine.SpyObj<BoardService>;
    let BOARDS: Board[];

    beforeEach(() => {
        mockBoardService = jasmine.createSpyObj(['getBoards']);
        BOARDS = [
            (<Board>{id: 1, numCols: 15, numRows: 15, questions: []}),
            (<Board>{id: 2, numCols: 15, numRows: 15, questions: []}),
            (<Board>{id: 3, numCols: 15, numRows: 15, questions: []}),
        ];

        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                RouterLinkStubDirective
            ],
            providers: [
                { provide: BoardService, useValue: mockBoardService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HomeComponent);
    });

    it('should create a link for each board', () => {
        // arrange
        mockBoardService.getBoards.and.returnValue(of(BOARDS));

        // act
        fixture.detectChanges();
        const linkElements = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));

        // assert
        expect(linkElements.length).toBe(BOARDS.length);
    });

    it('should have the correct link for the first board', () => {
        // arrange
        mockBoardService.getBoards.and.returnValue(of(BOARDS));
        fixture.detectChanges();
        const url = ['/play', BOARDS[0].id];
        const boardList = fixture.debugElement.query(By.css('#boardList'));
        const firstCard = boardList.query(By.css('.card'));
        const routerLink = boardList.query(By.directive(RouterLinkStubDirective)).injector.get(RouterLinkStubDirective);

        // act
        firstCard.triggerEventHandler('click', null);

        // assert
        expect(routerLink.navigatedTo).toEqual(url);
    });

});
