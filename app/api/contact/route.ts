import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import prisma from '../../../lib/prisma'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendInquiryEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  await transporter.sendMail({
    from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `New Enquiry: ${data.subject} — ${data.name}`,
    html: `
<div style="background:#f7f7f7;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:650px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#111827;padding:24px 30px;color:#fff;">
      <h1 style="margin:0;font-size:20px;letter-spacing:1px;">New Project Inquiry</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#cbd5e1;">
        You have received a new message from your website
      </p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">

      <!-- Info Card -->
      <div style="border:1px solid #eee;border-radius:10px;overflow:hidden;margin-bottom:20px;">
        
        <div style="display:flex;flex-wrap:wrap;">
          
          <div style="width:50%;padding:12px 16px;border-bottom:1px solid #eee;">
            <div style="font-size:12px;color:#6b7280;">Name</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${data.name}</div>
          </div>

          <div style="width:50%;padding:12px 16px;border-bottom:1px solid #eee;border-left:1px solid #eee;">
            <div style="font-size:12px;color:#6b7280;">Phone</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${data.phone || '—'}</div>
          </div>

          <div style="width:50%;padding:12px 16px;border-bottom:1px solid #eee;">
            <div style="font-size:12px;color:#6b7280;">Email</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">
              <a href="mailto:${data.email}" style="color:#2563eb;text-decoration:none;">
                ${data.email}
              </a>
            </div>
          </div>

          <div style="width:50%;padding:12px 16px;border-left:1px solid #eee;border-bottom:1px solid #eee;">
            <div style="font-size:12px;color:#6b7280;">Project Type</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${data.subject}</div>
          </div>

        </div>
      </div>

      <!-- Message -->
      <div style="margin-top:10px;">
        <h3 style="margin:0 0 10px;font-size:15px;color:#111827;border-left:4px solid #111827;padding-left:10px;">
          Message
        </h3>
        <div style="background:#f9fafb;padding:16px;border-radius:10px;color:#374151;line-height:1.7;font-size:14px;">
          ${data.message.replace(/\n/g, '<br/>')}
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding:16px 30px;background:#f3f4f6;font-size:12px;color:#6b7280;text-align:center;">
      This inquiry was submitted from your website contact form.
    </div>

  </div>
</div>
`
    // html: `
    //   <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
    //     <h2 style="border-bottom:2px solid #c8a96e;padding-bottom:12px;">New Project Enquiry</h2>
    //     <table style="width:100%;border-collapse:collapse;">
    //       <tr><td style="padding:8px 0;font-weight:bold;width:120px;">Name</td><td>${data.name}</td></tr>
    //       <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
    //       <tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td>${data.phone || '—'}</td></tr>
    //       <tr><td style="padding:8px 0;font-weight:bold;">Project Type</td><td>${data.subject}</td></tr>
    //     </table>
    //     <h3 style="margin-top:24px;">Message</h3>
    //     <p style="line-height:1.7;color:#444;">${data.message.replace(/\n/g, '<br/>')}</p>
    //   </div>
    // `,
  })
}

// GET ALL
export async function GET() {
  try {
    const data = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

// CREATE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { name, email, phone, subject, message } = body

    const inquiry = await prisma.inquiry.create({
      data: {
        senderName: name,
        senderEmail: email,
        phone: phone || null,
        projectType: subject || null,
        subject: subject,
        message: message,
        status: 'UNREAD',
      },
    })

    try {
      await sendInquiryEmail({ name, email, phone, subject, message })
    } catch (mailError) {
      console.error('Email send failed:', mailError)
    }

    return NextResponse.json({ success: true, data: inquiry })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}
