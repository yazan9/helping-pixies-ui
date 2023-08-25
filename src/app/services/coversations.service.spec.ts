import { TestBed } from '@angular/core/testing';

import { CoversationsService } from './coversations.service';

describe('CoversationsService', () => {
  let service: CoversationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoversationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
