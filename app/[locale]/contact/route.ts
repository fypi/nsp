import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  privacyAccepted?: boolean;
  locale?: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name) {
      return NextResponse.json(
        { ok: false, message: "请填写姓名。" },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "请填写有效邮箱。" },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { ok: false, message: "请填写留言内容。" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL || "one@ninespro.com";
    const contactFromEmail =
      process.env.CONTACT_FROM_EMAIL || "NinesPro <onboarding@resend.dev>";

    if (!resendApiKey) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "邮件服务未配置：缺少 RESEND_API_KEY。请在 Vercel 环境变量中添加 RESEND_API_KEY。",
        },
        { status: 500 }
      );
    }

    const subject = `NinesPro Contact Form - ${name}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111;">
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Locale:</strong> ${escapeHtml(String(body.locale || ""))}</p>
        <p><strong>Source:</strong> ${escapeHtml(String(body.source || "contact-page"))}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;background:#f6f7f9;padding:14px;border-radius:10px;">${escapeHtml(
          message
        )}</div>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject,
        html,
      }),
    });

    const resendData = await resendRes.json().catch(() => null);

    if (!resendRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            resendData?.message ||
            resendData?.error ||
            "邮件发送失败，请检查 Resend 配置。",
          details: resendData,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      success: true,
      message: "邮件已发送。",
      id: resendData?.id || null,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "服务器处理失败，请稍后再试。",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Contact API is running. Use POST to submit the form.",
  });
}