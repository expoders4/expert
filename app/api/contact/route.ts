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
<div style="background-color:#f7f7f7; padding:20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background-color:#ffffff; border-radius:14px; overflow:hidden; border-collapse: separate; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <tr>
      <td style="background-color:#111827; padding:30px; color:#ffffff;">
        <h1 style="margin:0; font-size:22px; font-weight:bold; letter-spacing:0.5px;">New Project Inquiry</h1>
        <p style="margin:8px 0 0; font-size:14px; color:#cbd5e1;">You have received a new message from your website</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:30px;">
        
        <!-- Info Grid (Using Table for Compatibility) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #eeeeee; border-radius:10px; overflow:hidden;">
          <tr>
            <td width="50%" style="padding:15px; border-bottom:1px solid #eeeeee; border-right:1px solid #eeeeee;">
              <div style="font-size:12px; color:#6b7280; text-transform:uppercase; margin-bottom:4px;">Name</div>
              <div style="font-size:14px; font-weight:600; color:#111827;">${data.name}</div>
            </td>
            <td width="50%" style="padding:15px; border-bottom:1px solid #eeeeee;">
              <div style="font-size:12px; color:#6b7280; text-transform:uppercase; margin-bottom:4px;">Phone</div>
              <div style="font-size:14px; font-weight:600; color:#111827;">${data.phone || '—'}</div>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:15px; border-right:1px solid #eeeeee; word-break:break-all;">
              <div style="font-size:12px; color:#6b7280; text-transform:uppercase; margin-bottom:4px;">Email</div>
              <div style="font-size:14px; font-weight:600;">
                <a href="mailto:${data.email}" style="color:#2563eb; text-decoration:none;">${data.email}</a>
              </div>
            </td>
            <td width="50%" style="padding:15px;">
              <div style="font-size:12px; color:#6b7280; text-transform:uppercase; margin-bottom:4px;">Project Type</div>
              <div style="font-size:14px; font-weight:600; color:#111827;">${data.subject}</div>
            </td>
          </tr>
        </table>

        <!-- Message Section -->
        <div style="margin-top:25px;">
          <h3 style="margin:0 0 12px; font-size:16px; color:#111827; border-left:4px solid #111827; padding-left:12px;">
            Message
          </h3>
          <div style="background-color:#f9fafb; padding:20px; border-radius:10px; color:#374151; line-height:1.6; font-size:15px; white-space: pre-wrap;">
            ${data.message.replace(/\n/g, '<br/>')}
          </div>
        </div>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:20px; background-color:#f3f4f6; font-size:12px; color:#9ca3af; text-align:center;">
        This inquiry was submitted via the automated contact form.
      </td>
    </tr>
  </table>
</div>
`
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
