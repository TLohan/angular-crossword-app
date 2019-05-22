import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCrosswordComponent } from './create-crossword/create-crossword.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { CreatedQuestionsListComponent } from './created-questions-list/created-questions-list.component';
import { ConfigureBoardComponent } from './configure-board/configure-board.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { CreateCrosswordRoutingModule } from './create-crossword-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board/board.component';

@NgModule({
    declarations: [
        CreateCrosswordComponent,
        QuestionFormComponent,
        CreatedQuestionsListComponent,
        ConfigureBoardComponent,
        AddQuestionsComponent,
        BoardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreateCrosswordRoutingModule
    ]
})
export class CreateCrosswordModule { }
