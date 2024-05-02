const nodemailer = require('nodemailer');
const Email = require('../models/Email');

exports.sendEmail = (req, res) => {
    const { propertyId, propertyOwnerEmail, name, email, message } = req.body;

    // Find all emails sent for the specified property
    Email.countDocuments({ toEmail: propertyOwnerEmail, propertyId: propertyId })
        .then(emailCount => {
            if (emailCount >= 2) {
                res.render('error', { error: 'You have reached the maximum limit of emails for this property' });
            } else {
                const transporter = nodemailer.createTransport({
                    // Configure your email provider settings here
                    service: 'gmail',
                    auth: {
                        user: 'kusalasameera@gmail.com',
                        pass: 'fmbqzlkpsfzbcfpr'
                    }
                });

                // Send email to property owner
                transporter.sendMail({
                    from: email, 
                    to: propertyOwnerEmail,
                    subject: 'Message from Contact Form',
                    text: `${name} sent you a message:\n${message}\n\nReply to: ${email}`
                }, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        res.render('error', { error: 'There was an error :(' });
                    } else {
                        // Store the email in the database only if it hasn't reached the limit
                        const emailRecord = new Email({
                            fromEmail: email,
                            toEmail: propertyOwnerEmail,
                            message: message,
                            propertyId: propertyId
                        });
                        emailRecord.save()
                            .then(() => {
                                res.render('error', { error: 'Mail has been sent!' }); // Render success page
                            })
                            .catch(error => {
                                console.error('Error saving email to database:', error);
                                res.render('error', { error: 'There was an error :(' });
                            });
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error counting emails:', error);
            res.render('error', { error: 'There was an error :(' });
        });
};
