import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const phone = String(body.phone || "").trim();
    const subject = String(body.subject || "官网联系表单").trim();
    const message = String(body.message || "").trim();

    const privacyAccepted = Boolean(
      body.privacyAccepted || body.agree || body.consent
    );

    const honeypot = String(
      body.website || body.hp || body.honeypot || ""
    ).trim();

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        {
          ok: false,
          message: "请先阅读并同意隐私政策与服务条款。",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          ok: false,
          message: "请填写姓名。",
        },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        {
          ok: false,
          message: "请填写有效邮箱。",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          ok: false,
          message: "请填写留言内容。",
        },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          message: "请填写至少 10 个字的留言内容。",
        },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!resendApiKey || !toEmail) {
      console.log("Contact form submission:", {
        name,
        email,
        company,
        phone,
        subject,
        message,
      });

      return NextResponse.json({
        ok: true,
        message: "提交成功，我们会尽快联系您。",
      });
    }

    const text = [
      "官网联系表单新消息",
      "",
      "姓名：" + name,
      "邮箱：" + email,
      "公司：" + (company || "未填写"),
      "电话：" + (phone || "未填写"),
      "主题：" + subject,
      "",
      "留言内容：",
      message,
      "",
      "用户已勾选同意隐私政策与服务条款。",
    ].join("\n");

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + resendApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: "官网联系表单：" + subject,
        text,
      }),
    });

    if (!resendResp.ok) {
      const errorText = await resendResp.text();
      console.error("Resend email error:", errorText);

      return NextResponse.json(
        {
          ok: false,
          message: "邮件发送失败，请稍后再试。",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "提交成功，我们会尽快联系您。",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "提交失败，请稍后再试。",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "NinesPro contact API is running.",
  });
}