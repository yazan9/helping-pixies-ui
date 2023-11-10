import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { ToastContainerComponent } from './shared/toast-container/toast-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { PasswordValidator } from './directives/password-validator/password-validator.directive';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { PrivacyPolicyComponent } from './static/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './static/terms-of-service/terms-of-service.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BubblesComponent } from './bubbles/bubbles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DoConfirmEmailComponent } from './do-confirm-email/do-confirm-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ToastContainerComponent,
    PasswordValidator,
    PhoneInputComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent,
    BubblesComponent,
    DoConfirmEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    NgbToastModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthInterceptorInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
    DatePipe
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
