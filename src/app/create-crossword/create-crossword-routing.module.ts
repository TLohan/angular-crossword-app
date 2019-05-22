import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCrosswordComponent } from './create-crossword/create-crossword.component';
import { ScopeGuardService } from '../guards/scope-guard.service';

const routes: Routes = [
    {  path: 'create', component: CreateCrosswordComponent, canActivate: [ScopeGuardService],
    data: { expectedScopes: ['create:board'] } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateCrosswordRoutingModule { }
