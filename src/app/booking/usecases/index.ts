import { CreateBooking } from './create-booking/create-booking.usecase';
import { GetBookingDetails } from './get-booking-details/get-booking-details.usecase';
import { GetBookings } from './get-bookings/get-bookings.usecase';

export const USE_CASES = [CreateBooking, GetBookingDetails, GetBookings];
