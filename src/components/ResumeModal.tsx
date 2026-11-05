import React from 'react';
import { X, Download, Printer, Mail, Github, MapPin, CheckCircle2, PhoneCall, Globe, Linkedin, FileText } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { useDialogBehavior } from '../hooks/useDialogBehavior';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, darkMode }) => {
  // `resume-print` scopes the print stylesheet in index.css to this dialog.
  const dialogRef = useDialogBehavior<HTMLDivElement>(isOpen, onClose, 'resume-print');

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    const pdfUrl = `${import.meta.env.BASE_URL}Habibur_Rahman_Resume.pdf`;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'Habibur_Rahman_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadTextResume = () => {
    const resumeText = `=====================================================
${RESUME_DATA.name.toUpperCase()}
${RESUME_DATA.role.toUpperCase()}
Email: ${RESUME_DATA.email} | Phone: ${RESUME_DATA.phoneDisplay}
GitHub: ${RESUME_DATA.github} | Location: ${RESUME_DATA.location}
Portfolio: ${RESUME_DATA.portfolio}
LinkedIn: ${RESUME_DATA.linkedin}
=====================================================

PROFESSIONAL SUMMARY:
${RESUME_DATA.summary}

TECHNICAL SKILLS:
${RESUME_DATA.technicalSkills?.map(s => `${s.category}: ${s.skills}`).join('\n')}

PROFESSIONAL EXPERIENCE:
${RESUME_DATA.experience.map(e => `
- ${e.role} (${e.period})
  ${e.company}${e.subtext ? ` · ${e.subtext}` : ''}
${e.points.map(p => `  * ${p}`).join('\n')}
`).join('\n')}

EDUCATION:
${RESUME_DATA.education.map(ed => `
- ${ed.degree} | ${ed.institution} (${ed.period})
  ${ed.details}
`).join('\n')}

CERTIFICATIONS:
${RESUME_DATA.certifications.map(c => `* ${c}`).join('\n')}

=====================================================
Generated from Habibur Rahman Portfolio (${RESUME_DATA.portfolio}).
`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Habibur_Rahman_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="modal-shell fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`modal-panel w-full max-w-4xl my-auto rounded-2xl border overflow-hidden shadow-2xl transition-all outline-none ${
          darkMode ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header Actions */}
        <div className="print-hide flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 sticky top-0 bg-inherit z-10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-micro font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-500 font-mono">
              Curriculum Vitae
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              aria-label="Print resume"
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-body-sm flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={downloadTextResume}
              title="Download TXT format"
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-body-sm flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TXT</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-3.5 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors text-body-sm flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume view"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Viewable Body */}
        <div className="p-6 sm:p-10 space-y-7 max-h-[82vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0 print:space-y-5">
          
          {/* Header Profile */}
          <div className="border-b border-slate-200 dark:border-slate-800/80 pb-5">
            <h1 id="resume-modal-title" className="text-section font-display font-bold uppercase tracking-tight">
              {RESUME_DATA.name}
            </h1>
            <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              {RESUME_DATA.role}
            </p>

            {/* Line 1: Email | Phone | GitHub | Location */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-label text-slate-600 dark:text-slate-400 mt-2.5">
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{RESUME_DATA.email}</span>
              </a>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">|</span>
              <a
                href={RESUME_DATA.phoneHref}
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{RESUME_DATA.phoneDisplay}</span>
              </a>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">|</span>
              <a
                href={RESUME_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{RESUME_DATA.githubDisplay}</span>
              </a>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{RESUME_DATA.location}</span>
              </span>
            </div>

            {/* Line 2: Portfolio | LinkedIn */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-label text-slate-600 dark:text-slate-400 mt-1.5">
              <a
                href={RESUME_DATA.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span>Portfolio: <span className="underline decoration-slate-400/50">{RESUME_DATA.portfolioDisplay}</span></span>
              </a>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">|</span>
              <a
                href={RESUME_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Linkedin: <span className="underline decoration-slate-400/50">{RESUME_DATA.linkedinDisplay}</span></span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-2 font-mono border-b border-slate-200 dark:border-slate-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-3 font-mono border-b border-slate-200 dark:border-slate-800 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-body-sm">
              {RESUME_DATA.technicalSkills?.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-0.5 sm:gap-3 items-baseline">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-micro uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {skill.category}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {skill.skills}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-3 font-mono border-b border-slate-200 dark:border-slate-800 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-body-sm font-semibold">
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{exp.role}</span>
                    <span className="font-mono text-micro text-slate-600 dark:text-slate-400">{exp.period}</span>
                  </div>
                  {exp.company && (
                    <div className="text-label text-slate-500 dark:text-slate-400 italic">
                      {exp.company}{exp.subtext ? ` · ${exp.subtext}` : ''}
                    </div>
                  )}
                  <ul className="space-y-1.5 text-body-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                    {exp.points.map((p, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-3 font-mono border-b border-slate-200 dark:border-slate-800 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {RESUME_DATA.education.map((ed, idx) => (
                <div key={idx} className="text-body-sm">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 font-semibold">
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{ed.degree}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-body-sm">{ed.institution}</span>
                  </div>
                  <p className="text-label text-slate-500 dark:text-slate-400 italic">{ed.period}</p>
                  <p className="text-body-sm text-slate-700 dark:text-slate-300 mt-1">{ed.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-3 font-mono border-b border-slate-200 dark:border-slate-800 pb-1">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm text-slate-700 dark:text-slate-300">
              {RESUME_DATA.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
