import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "thesoleyou@outlook.com",
    pass: "@Xc8023you",
  },
});

async function sendMail() {
  const info = await transporter.sendMail({
    from: "one@ninespro.com",
    to: "thesoleyou@outlook.com",
    subject: "测试邮件",
    text: "你好，这是一封来自 Node.js 的测试邮件。",
  });

  console.log("邮件已发送：", info.messageId);
}

sendMail();
