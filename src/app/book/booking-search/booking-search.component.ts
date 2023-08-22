import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/services/booking.service';
import { Meta } from 'src/app/types/meta';
import { Provider } from 'src/app/types/provider';
import { ProviderDetailsModalComponent } from '../provider-details-modal/provider-details-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-search',
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.css']
})
export class BookingSearchComponent implements OnInit{
  public providers: Provider[] = [];
  public radius: number = 0;
  public meta: Meta | null = null;
  public query: string = '';

  constructor(
    public bookingService: BookingService, 
    private config: NgbRatingConfig, 
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.bookingService.selectedFrequency){
      this.router.navigate(['/book']);
      return;
    }
    this.radius = this.bookingService.radius;
    this.fetchData(1);

    this.config.max = 5;
  }

  getPagesArray(num: number | null): number[] {
    if (num === null) {
      return [];
    }
    return Array.from({ length: num }, (_, index) => index + 1);
  }

  changePage(page: number | null): void {
    if (page !== null) {
      // Change your component's page variable and make an API request to fetch new data for this page
      this.meta!.page = page;

      // Fetch data for the new page from your API
      this.fetchData(page);
    }
  }

  updateData(): void {
    this.bookingService.radius = this.radius;
    this.bookingService.query = this.query;
    this.fetchData(1);
  }

  fetchData(page: number): void {
    this.bookingService.searchProviders(page).subscribe((response: {users: Provider[], meta: Meta}) => {
      this.providers = response.users;
      this.meta = response.meta;
      this.providers.forEach((provider) => {
        provider.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
        provider.distance
      });
    }, (error) => {
      alert('Error fetching providers');
    });
  }

  open(providerId: number) {
		const modalRef = this.modalService.open(ProviderDetailsModalComponent, {fullscreen: true, scrollable: true});
		modalRef.componentInstance.provider = this.providers.find((provider) => provider.id === providerId);
	}
}
