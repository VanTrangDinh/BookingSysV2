import { CreateListing } from './create-listings/create-listing.usecase';
import { GetListings } from './get-all-listings/get-listings.usecase';
import { GetListingById } from './get-listing/get-listing-id.usecase';
import { GetListingByHost } from './get-my-listing';
import { GetByHostListings } from './get-my-listings/get-my-listings.usecase';
import { RemoveListing } from './remove-listing';
import { SearchListing } from './search-listing/search-listing.usecase';
import { UpdateListing } from './update-listing';
import { UpdateListingAvailable } from './update-listings-available/update-listing-available.usecase';

export const USE_CASES = [
  CreateListing,
  GetByHostListings,
  GetListingByHost,
  GetListings,
  GetListingById,
  SearchListing,
  UpdateListingAvailable,
  UpdateListing,
  RemoveListing,
];
