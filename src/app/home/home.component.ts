import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router, public modalService: NgbModal){}

  @ViewChild('IOSInstallPrompt') IOSInstallPrompt!: TemplateRef<any>;


  deferredPrompt: any;
  isIos: boolean = false;
  public test: string = '';

  ngOnInit(): void {
    let isLoggedIn = this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isIos = /iPhone|iPad|iPod/.test(navigator.userAgent);
      this.test = navigator.userAgent;
      if(this.isIos){
        this.test += '<br> is ios';
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (isStandalone) {
          this.test += '<br> is standalone';
        }        
        else{
          this.test += '<br> is not standalone';
          this.showInstallButton();
        }
      }

      window.addEventListener('beforeinstallprompt', (e) => this.beforeInstallPrompt(e));
      // let user = this.authService.getUser();
      // if(user?.user_type === 'provider'){
      //   this.router.navigate(['/provider']);
      // }
      // else if(user?.user_type === 'client'){
      //   this.router.navigate(['/dashboard']);
      // }
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
    if(this.isIos){
      this.showIOSInstallPrompt();
      return;
    }

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

  showIOSInstallPrompt(): void {
    // Show your custom iOS install prompt UI here
    const modalRef = this.modalService.open(this.IOSInstallPrompt);    
  }

  closeIOSPrompt(result: string){
    this.modalService.dismissAll();
  }
}
