import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  subject?: string;
  message?: string;

  // 前端可任选这些字段名，后端都兼容
  privacyAccepted?: boolean;
  agree?: boolean;
  consent?: boolean;

  // honeypot：前端隐藏字段，正常用户不会填
  website?: string;
  hp?: string;
  honeypot?: string;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1小时
const RATE_LIMIT_MAX = 5; // 单 IP 每小时最多 5 次

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return true;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: "提交过于频繁，请稍后再试。" },
        { status: 429 }
      );
    }

    const body = (await req.json()) as ContactPayload;

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

    // Honeypot：机器人大概率会填隐藏字段。这里直接假装成功，不暴露拦截逻辑。
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { ok: false, message: "请先阅读并同意隐私政策与服务条款。" },
        { status: 400 }
      );
    }

    if (!name || name.length < 2) {
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

    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, message: "请填写至少 10 个字的留言内容。" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Website Contact <onboarding@resend.dev>";

    if (!resendApiKey || !toEmail) {
      return NextResponse.json(
        { ok: false, message: "邮件服务暂未配置，请稍后再试。" },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111;">
        <h2>官网联系表单新消息</h2>

        <p><strong>姓名：</strong>${escapeHtml(name)}</p>
        <p><strong>邮箱：</strong>${escapeHtml(email)}</p>
        <p><strong>公司：</strong>${escapeHtml(company || "未填写")}</p>
        <p><strong>电话：</strong>${escapeHtml(phone || "未填写")}</p>
        <p><strong>主题：</strong>${escapeHtml(subject)}</p>

        <hr />

        <p><strong>留言内容：</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>

        <hr />

        <p style="font-size: 12px; color: #666;">
          来源 IP：${escapeHtml(ip)}<br />
          用户已勾选同意《隐私政策》与《服务条款》。
        </p>
      </div>
    `;

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `官网联系表单：${subject}`,
        html,
      }),
    });

    if (!resendResp.ok) {
      return NextResponse.json(
        { ok: false, message: "邮件发送失败，请稍后再试。" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "提交成功，我们会尽快联系您。",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "提交失败，请稍后再试。" },
      { status: 500 }
    );
  }
}
