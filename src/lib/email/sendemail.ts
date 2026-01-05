import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const msg = {
    to,
    from: process.env.SENDGRID_SENDER!,
    subject,
    html,
  };

  const response = await sendgrid.send(msg);
  return response;
}
