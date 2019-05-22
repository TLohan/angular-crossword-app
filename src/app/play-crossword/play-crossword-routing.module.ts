import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoloModeComponent } from './solo-mode/solo-mode/solo-mode.component';
import { RunRaceComponent } from './race-mode/run-race/run-race.component';

const ROUTES: Routes = [
    { path: 'play/:id', component: SoloModeComponent },
    { path: 'raceMode', component: RunRaceComponent },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class PlayCrosswordRouterModule {}
