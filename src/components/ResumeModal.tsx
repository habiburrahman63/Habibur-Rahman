import React from 'react';
import { X, Download, Printer, Mail, Github, MapPin, CheckCircle2, PhoneCall } from 'lucide-react';
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

  const downloadTextResume = () => {
    const resumeText = `=====================================================
${RESUME_DATA.name.toUpperCase()} - ${RESUME_DATA.role.toUpperCase()}
Email: ${RESUME_DATA.email}
Phone: ${RESUME_DATA.phoneDisplay}
GitHub: ${RESUME_DATA.github}
Location: ${RESUME_DATA.location}
=====================================================

PROFESSIONAL SUMMARY:
${RESUME_DATA.summary}

PROFESSIONAL EXPERIENCE:
${RESUME_DATA.experience.map(e => `
- ${e.role} | ${e.company} (${e.period})
${e.points.map(p => `  * ${p}`).join('\n')}
`).join('\n')}

EDUCATION:
${RESUME_DATA.education.map(ed => `
- ${ed.degree}
  ${ed.institution} (${ed.period})
  ${ed.details}
`).join('\n')}

CERTIFICATIONS & DOMAIN RIGOR:
${RESUME_DATA.certifications.map(c => `* ${c}`).join('\n')}

Generated from Habibur Rahman Portfolio.
`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Habibur_Rahman_MERN_Stack_Resume.txt`;
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
        <div className="print-hide flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 sticky top-0 bg-inherit z-10">
          <div className="flex items-center gap-2">
            <span className="text-micro font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-500">
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
              className="px-3.5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors text-body-sm flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
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
        <div className="p-6 sm:p-10 space-y-8 max-h-[82vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Header Profile */}
          <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
            <h1 id="resume-modal-title" className="text-section font-display font-bold">
              {RESUME_DATA.name}
            </h1>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              {RESUME_DATA.role}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-label text-slate-600 dark:text-slate-400 mt-3">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {RESUME_DATA.email}
              </span>
              <span aria-hidden="true">·</span>
              <a href={RESUME_DATA.phoneHref} className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <PhoneCall className="w-3.5 h-3.5" />
                {RESUME_DATA.phoneDisplay}
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={RESUME_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                {RESUME_DATA.github.replace('https://', '')}
              </a>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {RESUME_DATA.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-2 font-mono">
              Professional Summary
            </h2>
            <p className="text-body-sm text-slate-700 dark:text-slate-300">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-4 font-mono">
              Work Experience
            </h2>
            <div className="space-y-6">
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-body-sm font-semibold">
                    <span>{exp.role} · <span className="text-emerald-600 dark:text-emerald-400 font-medium">{exp.company}</span></span>
                    <span className="font-mono text-micro text-slate-600 dark:text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="space-y-2 text-body-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                    {exp.points.map((p, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-3 font-mono">
              Education
            </h2>
            <div className="space-y-3">
              {RESUME_DATA.education.map((ed, idx) => (
                <div key={idx} className="text-body-sm">
                  <div className="flex items-center justify-between gap-3 font-semibold">
                    <span>{ed.degree}</span>
                    <span className="font-mono text-micro text-slate-600 dark:text-slate-400">{ed.period}</span>
                  </div>
                  <p className="text-body-sm text-emerald-600/90 dark:text-emerald-400/90 mt-1">{ed.institution}</p>
                  <p className="text-label text-slate-600 dark:text-slate-400 mt-1">{ed.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 mb-3 font-mono">
              Certifications & Domain Rigor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm text-slate-700 dark:text-slate-300">
              {RESUME_DATA.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
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
