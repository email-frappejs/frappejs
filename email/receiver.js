const frappe = require('frappejs');
const simpleParser = require('mailparser').simpleParser;
const Imap = require('imap');
const getConfig = require("./getConfig");

module.exports = {
  sync: async (email) => {
    let account = await getConfig();
    var i ;
    for (i = 0; i < account.length; i++) {
      if (account[i].email == email.Id) {
        break;
      }
    }
    let emailSyncOption = account[i].emailSync;
        var config = {
          "user": account[i].email,
          "password": account[i].password,
          "host": account[i].imapHost,
          "port": account[i].imapPort,
          "tls": true,
        }
    var imap = new Imap(config);

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function () {

      openInbox(function (err, box) {

        if (err) throw err;
        imap.search([emailSyncOption, ['SINCE', account[i].initialDate]], function (err, results) {
          if (err) throw err;
          var fetch = imap.fetch(results, {
            bodies: ''
          });
          fetch.on('message', function (msg, seqno) {
            msg.on('body', function (stream, info) {

              simpleParser(stream)
                .then(async function (mail_object) {
                  await frappe.insert({
                    doctype: 'Email',
                    // EDITS 
                    name: "Received from : " + mail_object.to.value[0].address + " " + mail_object.subject.slice(0, 10), // needs change : THINK 
                    fromEmailAddress: mail_object.from.value[0].address,
                    toEmailAddress: mail_object.to.value[0].address,
                    ccEmailAddress: mail_object.cc,
                    bccEmailAddress: mail_object.bcc,
                    date: mail_object.date,
                    subject: mail_object.subject,
                    bodyHtml: mail_object.html,
                    bodyText: mail_object.text,
                    sent: "1",
                  });
                })
                .catch(function (err) {
                  console.log('An error occurred:', err.message);
                });
            });
          });

          fetch.once('error', function (err) {
            console.log('Fetch error: ' + err);
          });

          fetch.once('end', function () {
            console.log('Done fetching all messages!');
            imap.end();
          });
        });
      });
    });

    imap.once('error', function (err) {
      console.log(err);
    });

    imap.once('end', function () {
      console.log('Connection ended');
    });

    imap.connect();
  }
}
