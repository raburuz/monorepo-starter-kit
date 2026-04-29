import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

interface ISendEmail {
  from: string,
  to: string,
  subject: string,
  react: any,
}

export const sendEmail = async ( { from, to, subject, react }: ISendEmail ) => {

  if (!resend) {
    console.log(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.",
    );
    return Promise.resolve();
  }

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      //https://react.email/
      react,
    });
    
  } catch (error) {
    console.log("Error sending email with Resend:", error);
  }

}