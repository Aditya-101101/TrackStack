import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ to, subject, html }) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY missing. Skipping email.");
        return;
    }

    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "TrackStack <onboarding@resend.dev>",
        to,
        subject,
        html,
    });

    if (error) {
        console.error("Email send failed:", error);
        throw new Error(error.message || "Failed to send email");
    }

    console.log("Email sent:", data?.id);
    return data;
}