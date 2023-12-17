import { Injectable } from '@nestjs/common';
import { CancelBookingCommand } from './cancel-booking.command';

@Injectable()
export class CancelBooking {
  constructor() {}

  async execute(command: CancelBookingCommand): Promise<Boolean> {
    // Check if the booking exists and belongs to the host
    // const foundBooking
    //send notification

    return true;
  }

  // async sendInviterAcceptedEmail(inviter: UserEntity, member: MemberEntity) {
  //   if (!member.invite) return;

  //   try {
  //     if ((process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production') && process.env.NOVU_API_KEY) {
  //       const novu = new Novu(process.env.NOVU_API_KEY);

  //       await novu.trigger(process.env.NOVU_TEMPLATEID_INVITE_ACCEPTED || 'invite-accepted-dEQAsKD1E', {
  //         to: {
  //           subscriberId: inviter._id,
  //           firstName: capitalize(inviter.firstName || ''),
  //           email: inviter.email || '',
  //         },
  //         payload: {
  //           invitedUserEmail: member.invite.email,
  //           firstName: capitalize(inviter.firstName || ''),
  //           ctaUrl: '/team',
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     Logger.error(e.message, e.stack, 'Accept inviter send email');
  //   }
  // }
}
