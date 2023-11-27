import { CreateListing } from './create-listings/create-listing.usecase';
import { GetListings } from './get-all-listings/get-listings.usecase';
import { GetListingById } from './get-listing/get-listing-id.usecase';
import { GetListingByHost } from './get-my-listing';
import { GetByHostListings } from './get-my-listings/get-my-listings.usecase';

export const USE_CASES = [CreateListing, GetByHostListings, GetListingByHost, GetListings, GetListingById];
