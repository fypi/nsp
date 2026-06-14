import { NextResponse } from "next/server";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value) {
  return String(value || "").replace(/\r\n/g, "\n").trim();
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    success: true,
    message: "NinesPro contact API is running.",
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email);
    const message = clean(body.message);
    const company = clean(body.company);
    const phone = clean(body.phone);
    const subject = clean(body.subject || "官网联系表单");
    const locale = clean(body.locale);
    const source = clean(body.source || "contact-page");

    const privacyAccepted = Boolean(
      body.privacyAccepted || body.agree || body.consent
    );

    const honeypot = clean(body.website || body.hp || body.honeypot || "");

    if (honeypot) {
      return NextResponse.json({
        ok: true,
        success: true,
        message: "提交成功，我们会尽快联系您。",
      });
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "请先阅读并同意隐私政策与服务条款。",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "请填写姓名。",
        },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "请填写有效邮箱。",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "请填写留言内容。",
        },
        { status: 400 }
      );
    }

    if (message.length < 2) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "请填写至少 2 个字的留言内容。",
        },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "one@ninespro.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const emailText = [
      "官网联系表单新消息",
      "",
      "姓名：" + name,
      "邮箱：" + email,
      "公司：" + (company || "未填写"),
      "电话：" + (phone || "未填写"),
      "主题：" + subject,
      "语言：" + (locale || "未提供"),
      "来源：" + source,
      "",
      "留言内容：",
      message,
      "",
      "用户已同意隐私政策与服务条款。",
    ].join("\n");

    if (!resendApiKey) {
      console.log("Contact form submission without RESEND_API_KEY:", {
        name,
        email,
        company,
        phone,
        subject,
        message,
        locale,
        source,
      });

      return NextResponse.json({
        ok: true,
        success: true,
        message:
          "提交成功。当前邮件服务未配置 RESEND_API_KEY，消息已记录到服务器日志。",
      });
    }

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + resendApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        replyto: email,
        subject: "官网联系表单：" + subject,
        text: emailText,
      }),
    });

    const resendText = await resendResp.text();

    if (!resendResp.ok) {
      console.error("Resend email error:", resendText);

      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "邮件发送失败，请检查 Resend 配置。",
          details: resendText,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      success: true,
      message: "提交成功，我们会尽快联系您。",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        ok: false,
        success: false,
        message: "提交失败，请稍后再试。",
      },
      { status: 500 }
    );
  }
}