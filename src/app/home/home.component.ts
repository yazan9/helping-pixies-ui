import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, public router: Router){}

  deferredPrompt: any;

  ngOnInit(): void {
    let isLoggedIn = this.authService.isLoggedIn.subscribe(loggedIn => {
      // let user = this.authService.getUser();
      // if(user?.user_type === 'provider'){
      //   this.router.navigate(['/provider']);
      // }
      // else if(user?.user_type === 'client'){
      //   this.router.navigate(['/dashboard']);
      // }
      window.addEventListener('beforeinstallprompt', (e) => this.beforeInstallPrompt(e));

    });
  }

  beforeInstallPrompt(e: any): void {
    e.preventDefault();
    this.deferredPrompt = e;
    this.showInstallButton();
  }

  showInstallButton(): void {
    const installButton = document.getElementById('install-button');
    installButton!.style.display = 'block';
    installButton!.addEventListener('click', () => this.installPWA());
  }

  installPWA(): void {
    const installButton = document.getElementById('install-button');
    installButton!.style.display = 'none';
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult:any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
    });
  }
}
