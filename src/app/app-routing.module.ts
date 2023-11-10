import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { FrequencyComponent } from './book/frequency/frequency.component';
import { PrivacyPolicyComponent } from './static/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './static/terms-of-service/terms-of-service.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SeoGuard } from './services/seo.guard';
import { DoConfirmEmailComponent } from './do-confirm-email/do-confirm-email.component';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'do-confirm-email',
    component: DoConfirmEmailComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [SeoGuard]
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path : 'provider',
    loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule),
    canActivate: [SeoGuard]
  },
  {
    path : 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [SeoGuard]
  },
  {
    path : 'conversations',
    loadChildren: () => import('./conversations/conversations.module').then(m => m.ConversationsModule),
    canActivate: [SeoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
