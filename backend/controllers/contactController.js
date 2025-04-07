//controllers/contactController.js
import { sendEmail } from "../utils/emailService.js";

export const contactUs = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const adminEmail = process.env.EMAIL_USER;
    await sendEmail(
      adminEmail,
      subject,
      `From: ${name} <${email}>\n\n${message}`
    );
    res.json({ message: "Your message has been sent successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send message.", error: error.message });
  }
};
