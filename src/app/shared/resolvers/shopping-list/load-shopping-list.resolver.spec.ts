import { TestBed } from '@angular/core/testing';

import { LoadShoppingListResolver } from './load-shopping-list.resolver';

describe('LoadShoppingListResolver', () => {
  let resolver: LoadShoppingListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LoadShoppingListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
