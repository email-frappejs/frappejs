const nodemailer = require('nodemailer');
const getConfig = require("./getConfig");

module.exports = {
  'sendMail': async function (mailDetails) {
    let account = await getConfig();
    for (var i = 0; i < account.length; i++) {
      if (mailDetails.fromEmailAddress == account[i].email) {
        // EDITS 
        var mailKey = "Sent to : " + mailDetails.toEmailAddress + " " + mailDetails.subject.slice(0, 10);  
        mailDetails = {
          from: mailDetails.fromEmailAddress,
          to: mailDetails.toEmailAddress,
          cc: mailDetails.ccEmailAddress,
          bcc: mailDetails.bccEmailAddress,
          subject: mailDetails.subject,
          text: mailDetails.bodyText,
        };
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: account[i].email,
            pass: account[i].password,
          }
        });
        transporter.sendMail(mailDetails);
        return mailKey;
        }
      }
  console.log(mailDetails.fromEmailAddress + " NOT FOUND IN RECORDS");
  }
};
