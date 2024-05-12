const nodemailer = require('nodemailer');

module.exports.config = {
	name: "gmail-text",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "shiki",
	description: "Send message on gmail",
	usePrefix: false,
	commandCategory: "Email",
	cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
	if (args.length < 2) {
		api.sendMessage("Usage: -email <receiver_email> <email_text>", event.threadID, event.messageID);
		return;
	}

	const receiverEmail = args[0];
	const emailText = args.slice(1).join(" ");

	try {
		// Create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'shikimachina@gmail.com', // Replace with your Gmail email address
				pass: 'qudmiipuidfpjlye' // Replace with your Gmail password or generate an app-specific password
			}
		});

		// Define email options
		const mailOptions = {
			from: 'anonymous@gmail.com', // Replace with your Gmail email address
			to: receiverEmail,
			subject: 'Email Subject', // You can customize the subject if needed
			text: emailText
		};

		// Send email
		await transporter.sendMail(mailOptions);
		console.log('Email sent successfully');
		api.sendMessage('Email sent successfully!', event.threadID, event.messageID);
	} catch (error) {
		console.error('Error sending email:', error.message);
		api.sendMessage('Error sending email. Please try again later.', event.threadID, event.messageID);
	}
};
