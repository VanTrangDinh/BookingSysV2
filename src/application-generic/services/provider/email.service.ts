// import { Injectable } from '@nestjs/common';
// import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

// interface INodemailerConfig {
//   from: string;
//   host: string;
//   port: number;
//   secure?: boolean;
//   user?: string;
//   password?: string;
//   dkim?: DKIM.SingleKeyOptions;
//   ignoreTls?: boolean;
//   requireTls?: boolean;
//   tlsOptions?: ConnectionOptions;
//   senderName?: string;
// }
// @Injectable()
// export class EmailService {
//   private FROM_EMAIL;
//   private BASE_URL;
//   private NODE_ENV;
//   constructor() {
//     this.FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL || 'example@example.com';
//     // this.AIRBNB_HOST = this.stripTrailingSlash(process.env.)
//     this.NODE_ENV = process.env.NODE_ENV || 'development';
//   }

//   stripTrailingSlash(hostname: string) {
//     return hostname?.endsWith('/') ? hostname.slice(0, -1) : hostname;
//   }

//   async sendMail(to: string, subject: string, html: string) {
//     // if (this.NODE_ENV === 'test' || (this.NODE_ENV !== 'development' && !process.env.SMTP_DOMAIN)) return;
//     const port = process.env.SMTP_PORT || 587;
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_DOMAIN,
//       port: port,
//       secure: port == 465,
//       auth: {
//         user: process.env.SMTP_USERNAME,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
//   }
// }
