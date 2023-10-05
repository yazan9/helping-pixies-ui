import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeoGuard } from '../services/seo.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [SeoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
