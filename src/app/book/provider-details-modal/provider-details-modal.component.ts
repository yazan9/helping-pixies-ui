import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { CoreService } from 'src/app/services/core.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Provider } from 'src/app/types/provider';
import { Review } from 'src/app/types/review';

@Component({
  selector: 'app-provider-details-modal',
  templateUrl: './provider-details-modal.component.html',
  styleUrls: ['./provider-details-modal.component.css']
})
export class ProviderDetailsModalComponent implements OnInit {
  @Input() provider: Provider = {
    id: 0,
    name: '',
    description: '',
    distance: 0,
    average_rating: 0,
    profile_image_url: '',
    ratings_count: 0
  }

  public isLoggedIn: boolean = false;
  private subscriptions: Subscription[] = [];

  public reviews: Review[] = [];
  
  constructor(
    public modal:NgbActiveModal, 
    public reviewsService: ReviewsService, 
    private authService: AuthService,
    private router: Router,
    public bookingService: BookingService,
    public coreService: CoreService 
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      })
    );

    this.reviewsService.getReviewsForProvider(this.provider.id).subscribe((response) => {
      let reviews = response;
      
      // Sort the reviews by rating in descending order
      reviews.sort((a: Review, b: Review) => b.rating - a.rating);
      this.reviews = reviews;

    }, (error) => {
      alert('Error fetching reviews');
    });
  }

  book(): void {
    if(!this.isLoggedIn){
      this.coreService.setSavedProvider(this.provider);
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      this.modal.close();
    }
    else{
      this.bookingService.bookProvider(this.provider.id).subscribe((response) => {
        this.router.navigate(['/dashboard']);
        this.modal.close();
      }, (error) => {
        alert('Error booking provider');
      });
      
    }
  }
}
