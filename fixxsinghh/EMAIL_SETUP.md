# Email Setup for Contact Form

Your contact form is configured to send emails to **info@fixxsinghh.iopings.com** using Formspree.

## Setup Instructions

### Step 1: Create a Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Click "Get Started" or "Sign Up"
3. Create a free account (no credit card required)

### Step 2: Create a New Form

1. Once logged in, click "+ New Form"
2. Name your form: "FixxSinghh Contact Form"
3. Enter your email: **info@fixxsinghh.iopings.com**
4. Click "Create Form"

### Step 3: Get Your Form Endpoint

1. After creating the form, you'll see a form endpoint like: `https://formspree.io/f/YOUR_FORM_ID`
2. Copy the `YOUR_FORM_ID` part (it will be a random string like "xanyrovw")

### Step 4: Update Your Website

1. Open `fixxsinghh/index.html`
2. Find line 268 (the form tag)
3. Replace `xanyrovw` with your actual form ID:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Step 5: Verify Email (First Submission)

1. On the first form submission, Formspree will send a verification email to **info@fixxsinghh.iopings.com**
2. Click the verification link in that email
3. After verification, all future submissions will be delivered automatically

## What Happens When Someone Submits the Form?

1. User fills out the contact form on your website
2. Form data is sent securely to Formspree
3. Formspree forwards the information to **info@fixxsinghh.iopings.com**
4. You receive an email with:
   - Customer's name
   - Customer's email (set as reply-to, so you can reply directly)
   - Phone number
   - Service type requested
   - Their message
5. User sees a success notification on the website

## Email Format

You'll receive emails with the subject: **"New FixxSinghh Service Request"**

Each email will contain:
- **Name**: Customer's name
- **Email**: Customer's email address
- **Phone**: Customer's phone number
- **Service**: Type of service they selected
- **Message**: Their detailed message

You can reply directly to these emails, and your response will go to the customer's email address.

## Free Plan Limits

Formspree's free plan includes:
- ✅ 50 submissions per month
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File uploads (if needed)
- ✅ Form submissions archive

If you need more submissions, you can upgrade to a paid plan starting at $10/month.

## Viewing Submissions

You can also view all form submissions in your Formspree dashboard at [https://formspree.io/forms](https://formspree.io/forms)

## Troubleshooting

### Not receiving emails?

1. Check your spam folder
2. Verify your email is confirmed in Formspree
3. Check submission logs in Formspree dashboard
4. Make sure the form ID in `index.html` matches your Formspree form ID

### Form shows error message?

1. Check that you've verified your email with Formspree
2. Make sure the form ID is correct
3. Check browser console for error messages

## Alternative: Using a Different Email Service

If you prefer not to use Formspree, you can also integrate with:

### EmailJS
- Free tier: 200 emails/month
- Setup: [https://www.emailjs.com](https://www.emailjs.com)

### Web3Forms
- Free tier: Unlimited submissions
- Setup: [https://web3forms.com](https://web3forms.com)

### Your Own Backend
If you have your own server, you can create a custom PHP or Node.js endpoint to handle form submissions.

## Support

If you need help with setup, contact:
- Formspree Support: [https://formspree.io/help](https://formspree.io/help)
- Or modify the form to use a different email service

---

**Current Configuration:**
- Email: info@fixxsinghh.iopings.com
- Form ID: xanyrovw (CHANGE THIS to your actual form ID)
- Service: Formspree
