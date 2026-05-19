import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "one@ninespro.com",
      to: "thesoleyou@gmail.com",
      subject: `来自 ${name} 的联系表单`,
      html: `
        <p><strong>姓名：</strong> ${name}</p>
        <p><strong>邮箱：</strong> ${email}</p>
        <p><strong>内容：</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
