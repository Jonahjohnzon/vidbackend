const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.USEREMAIL,
    pass: process.env.PASS,
  },
});

module.exports ={
    verifyEmail: async function verifyEmail({userEmail, username, token}){
            try{
              
                 await transporter.sendMail({
                    from: '"VIDNAIJA 👻" <foo@example.com>',
                    to: userEmail,
                    subject: " Verify Email Address ✔",
                    text: "",
                    html : `<b>Hello</b><br/><p>Please verify your vidnaija account by clicking the link</p><br/><B>LINK NOT ACCEPTABLE AFTER ONE HOUR</B> <br/>https://vidnaija.com.ng/activate/${token}`
                })
            
            }
            catch(e){
                    console.log(e)
            }
    }
}