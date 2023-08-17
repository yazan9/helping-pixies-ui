import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequencyComponent } from './frequency/frequency.component';
import { MainComponent } from './main/main.component';
import { BookComponent } from './book.component';

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      {
        path: '', // Empty path for default child route
        component: FrequencyComponent
      },
      {
        path: 'frequency',
        component: FrequencyComponent
      },
      {
        path: 'main',
        component: MainComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }