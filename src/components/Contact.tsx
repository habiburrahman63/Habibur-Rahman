import React, { memo, useCallback, useState, useEffect } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, PhoneCall } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { buildMailtoLink, sendContactMessage } from '../utils/contact';
import { copyTextToClipboard } from '../utils/clipboard';

interface ContactProps {
  darkMode: boolean;
  prefilledSubject?: string;
}

type ContactStatus = 'idle' | 'loading' | 'success' | 'mailto' | 'error';

export const Contact: React.FC<ContactProps> = memo(({ darkMode, prefilledSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: prefilledSubject || '',
    serviceType: 'Full-Stack MERN Development',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Replaces the whole form object and clears the error for the edited field, so
  // a validation message disappears as soon as the visitor starts correcting
  // that field instead of lingering until the next submit.
  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[field];
        return next;
      });
    }
  };

  // Sync if prefilledSubject changes
  useEffect(() => {
    if (prefilledSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry: ${prefilledSubject}`,
      }));
    }
  }, [prefilledSubject]);

  const copyEmail = useCallback(async () => {
    const copied = await copyTextToClipboard(PERSONAL_INFO.email);
    setCopiedEmail(copied);
    if (copied) {
      window.setTimeout(() => setCopiedEmail(false), 2000);
    }
  }, []);

  /** Copies the plain digit form, since that is what pastes into a dialer
   *  or messaging app without manual cleanup of the +880 formatting. */
  const copyPhone = useCallback(async () => {
    const copied = await copyTextToClipboard(PERSONAL_INFO.phone);
    setCopiedPhone(copied);
    if (copied) {
      window.setTimeout(() => setCopiedPhone(false), 2000);
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject line is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters';
    }
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      serviceType: 'Full-Stack MERN Development',
      message: '',
    });
    setErrors({});
    setSubmitError('');
    setStatus('idle');
  };

  // Declared after `validate` because it calls it, and wrapped in `useCallback`
  // so the memoised section is not invalidated on every keystroke elsewhere.
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      setSubmitError('');
      setStatus('loading');

      const result = await sendContactMessage(formData);

      if (result.status === 'sent') {
        setStatus('success');
        return;
      }

      if (result.status === 'mailto') {
        // No submission endpoint is configured, so the inquiry is handed to the
        // visitor's mail client rather than being silently discarded.
        window.location.href = buildMailtoLink(formData);
        setStatus('mailto');
        return;
      }

      setSubmitError(result.error ?? 'The message could not be sent.');
      setStatus('error');
    },
    [formData],
  );

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-2 text-micro font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-500 mb-3">
            <span>Get In Touch</span>
            <span aria-hidden="true">·</span>
            <span>Project Collaboration</span>
          </div>
          <h2 className="text-section font-display font-bold text-balance">
            Let's build something exceptional together.
          </h2>
          <p className={`mt-4 text-lead measure ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Have an upcoming project, freelance inquiry, or full-stack engineering opening? Send a message directly or connect via email.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className="text-card font-display font-bold mb-4">Direct Channels</h3>

              <div className="space-y-4 text-body-sm">
                {/* Email Item with Copy Button */}
                <div className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-900/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-micro text-slate-500 uppercase tracking-[0.12em] font-semibold">Email</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item with Copy Button - placed after Email because it
                    is the second most-used direct channel for local clients. */}
                <div className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-900/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-micro text-slate-500 uppercase tracking-[0.12em] font-semibold">Phone</div>
                      <a
                        href={PERSONAL_INFO.phoneHref}
                        className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {PERSONAL_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyPhone}
                    className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    title="Copy Phone Number"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* GitHub Item */}
                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-900/20">
                  <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-micro text-slate-500 uppercase tracking-[0.12em] font-semibold">GitHub Profile</div>
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      github.com/habiburrahman63
                    </a>
                  </div>
                </div>

                {/* LinkedIn Item */}
                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-900/20">
                  <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-micro text-slate-500 uppercase tracking-[0.12em] font-semibold">Professional Network</div>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      LinkedIn / Habibur Rahman
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-900/20">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-micro text-slate-500 uppercase tracking-[0.12em] font-semibold">Location & Timezone</div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/40 text-body-sm text-slate-600 dark:text-slate-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Guaranteed Response: </span>
                Typical reply turnaround is within 12–24 business hours.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              
              {status === 'success' || status === 'mailto' ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display">
                    {status === 'success' ? 'Message Sent Successfully!' : 'Your Mail App Is Opening'}
                  </h3>
                  <p className="text-body-sm text-slate-700 dark:text-slate-300 max-w-md">
                    {status === 'success' ? (
                      <>
                        Thank you, <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{formData.name}</span>. Your inquiry regarding <span className="italic">"{formData.subject}"</span> has been received. Habibur will review your project requirements and follow up via email at <span className="text-emerald-600 dark:text-emerald-400">{formData.email}</span> shortly.
                      </>
                    ) : (
                      <>
                        Thank you, <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{formData.name}</span>. Your inquiry is pre-filled in your email client — just press send. If nothing opened, write to{' '}
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-600 dark:text-emerald-400 underline">
                          {PERSONAL_INFO.email}
                        </a>{' '}
                        directly.
                      </>
                    )}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    {status === 'mailto' && (
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-body-sm font-semibold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? 'Email Copied' : 'Copy Email Address'}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-lg text-body-sm font-semibold bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <h3 className="text-card font-display font-bold mb-2">Send an Inquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-micro font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        placeholder="Alex Morgan"
                        className={`w-full px-4 py-3 rounded-xl text-body-sm border transition-all ${
                          errors.name
                            ? 'border-rose-500 bg-rose-950/20'
                            : darkMode
                            ? 'bg-slate-950/60 border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100'
                            : 'bg-slate-50 border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-900'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-micro text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-micro font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3 rounded-xl text-body-sm border transition-all ${
                          errors.email
                            ? 'border-rose-500 bg-rose-950/20'
                            : darkMode
                            ? 'bg-slate-950/60 border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100'
                            : 'bg-slate-50 border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-900'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-micro text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-micro font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-2">
                        Subject Line *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        aria-invalid={Boolean(errors.subject)}
                        placeholder="MERN Web Application Project"
                        className={`w-full px-4 py-3 rounded-xl text-body-sm border transition-all ${
                          errors.subject
                            ? 'border-rose-500 bg-rose-950/20'
                            : darkMode
                            ? 'bg-slate-950/60 border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100'
                            : 'bg-slate-50 border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-900'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-micro text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>

                    {/* Service Type Selection */}
                    <div>
                      <label htmlFor="contact-service" className="block text-micro font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-2">
                        Project Scope / Category
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceType}
                        onChange={(e) => updateField('serviceType', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-body-sm border transition-all ${
                          darkMode
                            ? 'bg-[#06080F] border-slate-800 text-slate-100 focus:border-emerald-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                        }`}
                      >
                        <option value="Full-Stack MERN Development">Full-Stack MERN Development</option>
                        <option value="Modern Frontend Architecture">Modern Frontend Architecture (React)</option>
                        <option value="Scalable REST API Development">Scalable REST API Development (Node/Express)</option>
                        <option value="E-Commerce Platform">E-Commerce Platform & Cart Systems</option>
                        <option value="Custom Admin Dashboard">Custom Admin Dashboard & CMS</option>
                        <option value="Performance & Security Audit">Performance & Security Audit</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-micro font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 mb-2">
                      Project Details & Timeline *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      placeholder="Briefly describe your product goals, required features, technical stack, or timeline..."
                      className={`w-full px-4 py-3 rounded-xl text-body-sm border transition-all ${
                        errors.message
                          ? 'border-rose-500 bg-rose-950/20'
                          : darkMode
                          ? 'bg-slate-950/60 border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100'
                          : 'bg-slate-50 border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-900'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-micro text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Delivery failure feedback */}
                  {status === 'error' && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl border border-rose-500/40 bg-rose-50 dark:bg-rose-950/20 flex items-start gap-2 text-micro text-rose-700 dark:text-rose-300"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        {submitError} You can also email{' '}
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="underline text-rose-700 dark:text-rose-200">
                          {PERSONAL_INFO.email}
                        </a>{' '}
                        directly.
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-body-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20"
                  >
                    {status === 'loading' ? (
                      <span>Dispatching Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
