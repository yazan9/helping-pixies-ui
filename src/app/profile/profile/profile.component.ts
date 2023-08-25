import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User | null = new User();
  profilePicture: string = '';

  constructor(private authService: AuthService, private userService: UserService) {
    this.user = this.authService.getUser();
    this.profilePicture = this.user?.profile_image_url as string;
  }

  updateProfile(): void {
    this.userService.updateProfile(this.user as User).subscribe((response) => {
      this.authService.setUser(response);
      alert('Profile updated successfully');
    }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      let uploadedFile = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = () => {
        this.profilePicture = reader.result as string;
      };
    }
  }

  updateProfilePicture(): void {
    this.userService.updateProfileImage(this.user?.id as number, this.profilePicture).subscribe((response) => {
      this.authService.setUser(response);
      alert('Profile picture updated successfully');
    });
    // Logic to update the profile picture goes here
  }

  openUploadDialog(): void {
    const input = document.getElementById('fileInput');
    input?.click();
  }
}
