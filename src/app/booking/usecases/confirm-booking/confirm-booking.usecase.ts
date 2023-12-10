import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class ConfirmBooking {
  private bookingId: string;
  constructor() {}
  async execute() {
    //Handle Special Situations 

    //Update Calendar and Room Status 
    
    //send notification to the customer and host
    
    //update booking status //payment verification
  }
}
