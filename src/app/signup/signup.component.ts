import { Component, OnInit } from '@angular/core';
import { User } from '../types/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public user: User = new User();
  public countryCode: string = '';
  public location: string = '';

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.user = new User();
  }

  public signupClicked() {
    if(!this.validateUser()){
      alert('Please fill all the fields');
      return;
    }

    this.user.phone = this.countryCode + this.user.phone;
    this.user.latitude = this.location.split(',')[0];
    this.user.longitude = this.location.split(',')[1];

    this.authService.register(this.user).subscribe((response) => {
      console.log(response);
      this.clearForm();
      alert('User registered successfully');
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setLocation(this.parsePosition(position)),
        (err) => this.handleFirefoxLocation()
      );
    }
    else{
      alert("Geolocation is not supported by this browser.");
    }
  }

  private async handleFirefoxLocation(): Promise<any> {
    await fetch(
      "https://location.services.mozilla.com/v1/geolocate?key=test"
    ).then((el) => this.setLocation(el.json()));
  }

  parsePosition(position: any) {
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    return { location: { lat, lng } };
  }

  private setLocation(location: any) {
    this.location = location.location.lat + ',' + location.location.lng;
  }

  private validateUser(): boolean{
    return this.user.email.trim() !== '' && 
    this.user.name.trim() !== '' && 
    this.user.phone.trim() !== '' && 
    this.user.password.trim() !== '' && 
    this.countryCode.trim() !== '';
  }

  private clearForm(){
    this.user = new User();
    this.countryCode = '';
    this.location = '';
  }
}
