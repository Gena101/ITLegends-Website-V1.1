// src/components/sections/ContactForm.tsx
// The ONLY contact form on the site. Posts to the Make.com webhook.
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import { company } from '../../data/company';
import { CONTACT_WEBHOOK_URL, GENERAL_ENQUIRY, MIN_FILL_TIME_MS } from '../../data/forms';
import { services } from '../../data/services';
import { Button, cn } from '../ui';

const IS_PRODUCTION = import.meta.env.VITE_SITE_ENV === 'production';

interface ContactFormProps {
  /** Pre-select a service by name (e.g. on a service page) */
  defaultService?: string;
  /** Override the page path sent as `source` */
  source?: string;
  className?: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  /** Honeypot: real visitors never see or fill this */
  website: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const labelClass = 'mb-2 block text-sm font-medium text-white';
const optionalClass = 'font-normal text-fg-subtle';
const inputClass =
  'block w-full rounded-control border border-white/10 bg-ink-950/60 px-4 py-3 text-base text-fg ' +
  'placeholder:text-fg-subtle transition-colors hover:border-white/20 focus:border-itblue/60';

/** GA4 lead event: only exists in production after cookie consent */
function trackLead(source: string): void {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('event', 'generate_lead', { form_source: source });
}

/** Make may reply with JSON ({ reference }) or plain text ("Accepted") */
function parseReference(body: string): string | null {
  try {
    const data = JSON.parse(body) as { reference?: unknown };
    if (typeof data.reference === 'string' || typeof data.reference === 'number') {
      return String(data.reference) || null;
    }
  } catch {
    // Plain-text response: no reference
  }
  return null;
}

export function ContactForm({ defaultService = GENERAL_ENQUIRY, source, className }: ContactFormProps) {
  const id = useId();
  const { pathname } = useLocation();
  const startedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);

  const emptyValues: FormValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: defaultService,
    message: '',
    website: '',
  };

  const [values, setValues] = useState<FormValues>(emptyValues);
  const [status, setStatus] = useState<Status>('idle');
  const [reference, setReference] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the confirmation so screen readers announce it
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const leadSource = source ?? pathname;
    const name = values.name.trim();

    // Bot: filled the honeypot, or submitted faster than a person could. Fake success, send nothing.
    if (values.website || Date.now() - startedAt.current < MIN_FILL_TIME_MS) {
      setFirstName('');
      setReference(null);
      setStatus('success');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: IS_PRODUCTION ? name : `TEST - ${name}`,
          email: values.email.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          service: values.service,
          message: values.message.trim(),
          source: leadSource,
          test: !IS_PRODUCTION,
          honeypot: '',
        }),
      });

      if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);

      setReference(parseReference(await res.text()));
      setFirstName(name.split(/\s+/)[0] ?? '');
      setStatus('success');
      setValues(emptyValues);
      trackLead(leadSource);
    } catch (error) {
      console.error('Contact form submission failed', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn('rounded-panel border border-white/10 bg-ink-900 p-8 focus:outline-none sm:p-10', className)}
      >
        <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-itblue-soft" />
        <h3 className="mt-5 text-h3">
          Thanks{firstName ? `, ${firstName}` : ''}. We've received your message.
        </h3>
        <p className="mt-3 text-fg-muted">
          We'll get back to you {company.support.standardResponse}. For anything urgent, call{' '}
          <a href={company.phone.href} className="font-medium text-itblue-soft transition-colors hover:text-white">
            {company.phone.display}
          </a>
          .
        </p>
        {reference && (
          <p className="mt-4 text-sm text-fg-subtle">
            Reference: <span className="font-medium tabular-nums text-fg">{reference}</span>
          </p>
        )}
        <Button variant="ghost" className="-ml-5 mt-6" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={sending}
      className={cn('relative rounded-panel border border-white/10 bg-ink-900 p-6 sm:p-8', className)}
    >
      {/* Honeypot: off-screen, hidden from assistive tech, skipped by Tab */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={update}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={update}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Phone <span className={optionalClass}>(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-company`} className={labelClass}>
            Company <span className={optionalClass}>(optional)</span>
          </label>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={update}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-service`} className={labelClass}>
            What do you need help with?
          </label>
          <div className="relative">
            <select
              id={`${id}-service`}
              name="service"
              value={values.service}
              onChange={update}
              className={cn(inputClass, 'appearance-none pr-12')}
            >
              <option value={GENERAL_ENQUIRY}>General enquiry</option>
              {services.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={labelClass}>
            Message
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={5}
            value={values.message}
            onChange={update}
            className={cn(inputClass, 'resize-y')}
          />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 rounded-control border border-itred/40 bg-itred/10 px-4 py-3 text-sm text-fg">
          Your message didn't send. Please try again, or email us at{' '}
          <a href={`mailto:${company.email}`} className="font-medium text-white underline underline-offset-2">
            {company.email}
          </a>
          .
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">
          We only use your details to respond to your enquiry.{' '}
          <Link to="/privacy-policy" className="underline underline-offset-2 transition-colors hover:text-white">
            Privacy policy
          </Link>
        </p>
        <Button type="submit" size="lg" disabled={sending} className="sm:shrink-0">
          {sending ? (
            <>
              <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </Button>
      </div>

      {!IS_PRODUCTION && (
        <p className="mt-4 text-xs text-itred-soft">Staging build: submissions are marked TEST.</p>
      )}
    </form>
  );
}