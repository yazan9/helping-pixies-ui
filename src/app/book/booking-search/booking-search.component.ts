import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/services/booking.service';
import { Meta } from 'src/app/types/meta';
import { Provider } from 'src/app/types/provider';
import { ProviderDetailsModalComponent } from '../provider-details-modal/provider-details-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CoreService } from 'src/app/services/core.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { FrequencyType } from 'src/app/types/frequency-type';

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
  public loading: boolean = false;

  constructor(
    public bookingService: BookingService, 
    private config: NgbRatingConfig, 
    private modalService: NgbModal,
    private router: Router,
    public location: Location,
    public route: ActivatedRoute,
    private coreService: CoreService,
    private avatarService: AvatarService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const source = params['source'];
      if(source === 'login' && this.coreService.getSavedProvider() !== null){
        this.openProvidersPage(this.coreService.getSavedProvider());
      }
    });

    //test block
    // if(!this.bookingService.selectedFrequency){
    //   this.router.navigate(['/book']);
    //   return;
    // }
    this.bookingService.selectedFrequency = FrequencyType.once;
    // end of test block


    this.radius = this.bookingService.radius;
    this.fetchData(1);

    this.config.max = 5;
    this.config.readonly = true;
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
    this.loading = true;
    this.bookingService.searchProviders(page).subscribe((response: {users: Provider[], meta: Meta}) => {
      this.loading = false;
      this.providers = response.users;
      this.meta = response.meta;
    }, (error) => {
      alert('Error fetching providers');
      this.loading = false;
    });
  }

  open(providerId: number) {
		const modalRef = this.modalService.open(ProviderDetailsModalComponent, {fullscreen: true, scrollable: true});
		modalRef.componentInstance.provider = this.providers.find((provider) => provider.id === providerId);
	}

  openProvidersPage(provider: Provider | null): void {
    const modalRef = this.modalService.open(ProviderDetailsModalComponent, {fullscreen: true, scrollable: true});
		modalRef.componentInstance.provider = provider;
  }

  getMin(name: string){
    return Math.min(2, name.length);
  }
}
