// // email.js (or a separate utility file)
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'your-email-service-provider', // e.g., Gmail
//   auth: {
//     user: 'your-email@example.com',
//     pass: 'your-email-password',
//   },
// });

// const sendContactEmail = (data) => {
//   const mailOptions = {
//     from: 'your-email@example.com',
//     to: 'recipient@example.com', // Change to the recipient's email address
//     subject: 'New Contact Form Submission',
//     text: `
//       Name: ${data.name}
//       Phone Number: ${data.phoneNumber}
//       City: ${data.city}
//       Message: ${data.message}
//       Email: ${data.email}
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// module.exports = sendContactEmail;
