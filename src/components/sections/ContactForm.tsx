// src/components/sections/ContactForm.tsx
// Enquiry form - 08 §6. Posts to the existing Make.com webhook (02 §3).
//
// Two variants: "compact" in the CtaBand at the foot of every page,
// "full" on /contact. Same webhook, same honeypot, same handler.
//
// HONEYPOT: a real input named `honeypot`, visually hidden rather than
// display:none, excluded from the tab order and from the accessibility tree.
// Bots fill it, people never see it. A filled honeypot is dropped silently -
// never tell a bot why it failed.
//
// FIELDS: name, email, company, service, message are the five the Make
// scenario already receives. `phone` and `source` are NEW and must be mapped
// in Make before they are relied on.
import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { services } from '../../data/services';
import { trackEvent } from '../../analytics';

const WEBHOOK = 'https://hook.us2.make.com/pt14ynlwgyio4c48iwruduu9curorf4a';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type ContactFormProps = {
  /** "full" adds company and service. "compact" is name, email,phone, message. */
  variant?: 'compact' | 'full';
  /** Where the enquiry came from, sent as `source` so enquiries can be routed. */
  source: string;
  /** Rendered on a dark band: inputs keep light surfaces, helper text lightens. */
  onDark?: boolean;
  className?: string;
};

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  honeypot: '',
};

export default function ContactForm({
  variant = 'full',
  source,
  onDark = false,
  className = '',
}: ContactFormProps) {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');

  const full = variant === 'full';
  const labelClass = `block text-small font-bold ${onDark ? 'text-itsilver' : 'text-itdark'}`;
  const fieldClass =
    'mt-1.5 block w-full min-h-[44px] rounded-btn border border-border bg-surface px-3 py-2 text-body text-itdark focus:border-itblue focus:outline-none focus:ring-2 focus:ring-itblue';
  
  function set(field: keyof typeof EMPTY, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot tripped: behave exactly as if it succeeded, send nothing.
    if (values.honeypot) {
      setStatus('sent')
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          service: values.service,
          message: values.message,
          source,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Webhook returned ${res.status}`);
      trackEvent('generate_lead', { location: source });
      setValues(EMPTY);
      setStatus('sent');
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className={`rounded-card border border-border bg-surface p-5 lg:p-6 ${className}`}
      >
        <p className="text-h3 font-bold text-itdark">Thank you, we have your message.</p>
        <p className="mt-2 text-body text-muted">
          We reply within one business day. Monday to Friday 07:30 to 17:00, Saturday 08:00 to
          13:00. If it is urgent, call or WhatsApp us on +27 84 634 8144.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-small text-link underline underline-offset-2 hover:no-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`} noValidate={false}>
      <div>
        <label htmlFor={`${source}-name`} className={labelClass}>
          Your name
        </label>
        <input
          id={`${source}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className={full ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4'}>
        <div>
          <label htmlFor={`${source}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={`${source}-phone`} className={labelClass}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={`${source}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {full && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${source}-company`} className={labelClass}>
              Company <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id={`${source}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => set('company', e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor={`${source}-service`} className={labelClass}>
              What do you need help with?
            </label>
            <select
              id={`${source}-service`}
              name="service"
              value={values.service}
              onChange={(e) => set('service', e.target.value)}
              className={fieldClass}
            >
              <option value="">Not sure yet</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`${source}-message`} className={labelClass}>
          How can we help?
        </label>
        <textarea
          id={`${source}-message`}
          name="message"
          required
          rows={full ? 5 : 3}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Honeypot. Hidden from sight, tab order and screen readers. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${source}-honeypot`}>Leave this field empty</label>
        <input
          id={`${source}-honeypot`}
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(e) => set('honeypot', e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-body text-itdark">
          Something went wrong sending that. Please call or WhatsApp us on{' '}
          <strong>+27 84 634 8144</strong>, or email{' '}
          <strong>info@itlegends.co.za</strong>.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
        {status === 'sending' && <Loader2 aria-hidden="true" className="h-5 w-5 animate-apin" />}
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>

      <p className={`text-small ${onDark ? 'text-itsilver' : 'text-muted'}`}>
        We use your details only to answer your enquiry.
      </p>
    </form>
  );
}