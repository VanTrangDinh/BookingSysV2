export enum AuthProviderEnum {
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
}

export enum UserRoleEnum {
  USER = 'user',
  HOST = 'host',
  ADMIN = 'admin',
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

export type UserId = string;

// export declare enum UserRoles {
//   "system-admin" = "system-admin",
//   "restaurant-admin" = "restaurant-admin",
//   "restaurant-user" = "restaurant-user",
//   "delivery-partner" = "delivery-partner"
// }
