export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { subject, message } = req.body;

    // Here you can add your email sending logic
    // For example, using a service like SendGrid, Mailgun, or Nodemailer
    // For now, we'll just log the message
    console.log('New message received:', { subject, message });

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({ message: 'Error processing form' });
  }
} 