import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequencyComponent } from './frequency/frequency.component';
import { BookComponent } from './book.component';

const routes: Routes = [
  { path: '', redirectTo: 'frequency', pathMatch: 'full' },
  { path: 'frequency', component: FrequencyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }