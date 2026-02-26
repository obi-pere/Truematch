import { useState } from 'react';
import { CaretRight, Question, X } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';

const APPLICATION_DETAILS = {
  'app-001': {
    universityName: 'University of Manchester',
    degree: 'MSc Data Science',
    applicationSummary: {
      applicationId: 'APP-001',
      universityName: 'University of Manchester',
      universityCountry: 'United Kingdom',
      courseName: 'Data Science',
      degreeType: 'MSc',
      studyMode: 'Full-time',
      intake: 'September 2026',
      applicationDate: '12 February 2026',
      currentApplicationStatus: 'Under review',
      assignedAdmissionOfficer: 'Sarah Morgan',
      offerType: 'Conditional',
      offerDate: 'Pending',
      casStatus: 'Not issued',
      casNumber: 'N/A'
    },
    documents: [
      { documentName: 'International Passport', documentUploaded: 'my_passport.pdf' },
      { documentName: 'Academic Transcript(s)', documentUploaded: 'my_academic_transcript.pdf' },
      { documentName: 'Degree Certificate(s)', documentUploaded: 'my_degree_certificate.pdf' },
      { documentName: 'IELTS/TOEFL Certificate', documentUploaded: 'my_ielts_result.pdf' },
      { documentName: 'Statement of Purpose (SOP)', documentUploaded: 'my_sop.pdf' },
      { documentName: 'CV', documentUploaded: 'my_cv.pdf' },
      { documentName: 'Reference Letter(s)', documentUploaded: 'my_reference_letter.pdf' },
      { documentName: 'Portfolio', documentUploaded: 'portfolio.pdf' },
      { documentName: 'Application Fee Receipt', documentUploaded: 'application_fee_receipt.pdf' },
      { documentName: 'Offer Letter', documentUploaded: 'offer_letter.pdf' },
      { documentName: 'CAS Letter', documentUploaded: 'cas_letter.pdf' },
      { documentName: 'Visa Decision Letter', documentUploaded: 'visa_decision_letter.pdf' }
    ],
    financialInformation: [
      { documentName: 'Proof of Funds', documentUploaded: 'proof_of_funds.pdf' }
    ]
  }
};

const UPLOAD_DOCUMENTS = new Set(['Application Fee Receipt', 'Proof of Funds']);
const APPLICATION_PROGRESS_STEPS = [
  { label: 'Application Pending', status: 'completed', description: 'completed' },
  { label: 'Submitted to University', status: 'completed', description: 'completed' },
  { label: 'Under Review', status: 'pending', description: 'Current stage' },
  { label: 'Offer Issued', status: 'pending', description: 'pending' }
] as const;

export const ApplicationDetailsPage = () => {
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isOfferInfoOpen, setIsOfferInfoOpen] = useState(false);
  const { applicationId } = useParams();
  const application = applicationId ? APPLICATION_DETAILS[applicationId as keyof typeof APPLICATION_DETAILS] : undefined;

  if (!application) {
    return (
      <div className="flex min-h-screen flex-col bg-dark-bg">
        <nav aria-label="Breadcrumb" className="border-b border-white/10 px-4 py-2.5 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-zinc-400">
            <li>
              <Link
                to="/"
                className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-zinc-600">
              <CaretRight size={10} weight="bold" />
            </li>
            <li>
              <Link
                to="/dashboard"
                className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
              >
                Dashboard
              </Link>
            </li>
            <li aria-hidden className="text-zinc-600">
              <CaretRight size={10} weight="bold" />
            </li>
            <li>
              <Link
                to="/dashboard/applications"
                className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
              >
                My Applications
              </Link>
            </li>
            <li aria-hidden className="text-zinc-600">
              <CaretRight size={10} weight="bold" />
            </li>
            <li aria-current="page" className="font-medium text-zinc-100">
              Details
            </li>
          </ol>
        </nav>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-xl border border-white/10 bg-dark-card p-6">
            <h1 className="text-lg font-semibold text-zinc-100">Application not found</h1>
            <p className="mt-2 text-sm text-zinc-400">This application could not be located.</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg">
      <nav aria-label="Breadcrumb" className="border-b border-white/10 px-4 py-2.5 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-zinc-400">
          <li>
            <Link
              to="/"
              className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-zinc-600">
            <CaretRight size={10} weight="bold" />
          </li>
          <li>
            <Link
              to="/dashboard"
              className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
            >
              Dashboard
            </Link>
          </li>
          <li aria-hidden className="text-zinc-600">
            <CaretRight size={10} weight="bold" />
          </li>
          <li>
            <Link
              to="/dashboard/applications"
              className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
            >
              My Applications
            </Link>
          </li>
          <li aria-hidden className="text-zinc-600">
            <CaretRight size={10} weight="bold" />
          </li>
          <li aria-current="page" className="font-medium text-zinc-100">
            Details
          </li>
        </ol>
      </nav>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6">
          <h1 className="text-lg font-semibold text-zinc-100">{application.universityName} — {application.degree}</h1>
          <p className="mt-1 text-sm text-zinc-400">View and manage your application details, documents, and financial information.</p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setIsTrackerOpen(true)}
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
            >
              View tracker
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl divide-y divide-white/10">
          <section>
            <div className="px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold uppercase tracking-wide text-zinc-100">Application Summary</h2>
            </div>
            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Application ID</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.applicationId}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">University Name</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.universityName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">University Country</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.universityCountry}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Course Name</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.courseName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Degree Type</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.degreeType}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Study Mode</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.studyMode}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Intake</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.intake}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Application Date</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.applicationDate}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Current Application Status</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.currentApplicationStatus}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Assigned Admission Officer</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.assignedAdmissionOfficer}</p>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Offer Type</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.offerType}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOfferInfoOpen(true)}
                  title="Learn more about offer types"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-300 transition-colors hover:bg-yellow-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                >
                  <Question size={14} weight="bold" />
                </button>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Offer Date</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.offerDate}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">CAS Status</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.casStatus}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">CAS Number</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">{application.applicationSummary.casNumber}</p>
              </div>
            </div>
          </section>

          <section>
            <div className="px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold uppercase tracking-wide text-zinc-100">Documents</h2>
            </div>
            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              {application.documents.map((document) => (
                <div key={document.documentName} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-zinc-100">{document.documentName}</p>
                    <p className="mt-1 truncate text-sm font-medium text-zinc-500">{document.documentUploaded}</p>
                  </div>
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 rounded-md bg-brand-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                  >
                    {UPLOAD_DOCUMENTS.has(document.documentName) ? 'Upload' : 'Update'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold uppercase tracking-wide text-zinc-100">Financial Information</h2>
            </div>
            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              {application.financialInformation.map((document) => (
                <div key={document.documentName} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-zinc-100">{document.documentName}</p>
                    <p className="mt-1 truncate text-sm font-medium text-zinc-500">{document.documentUploaded}</p>
                  </div>
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 rounded-md bg-brand-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                  >
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {isTrackerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="application-progress-title"
          onClick={() => setIsTrackerOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-white/10 bg-dark-card p-5 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id="application-progress-title" className="text-base font-semibold text-zinc-100">
                  Application Progress
                </h3>
                <p className="mt-1 text-sm text-zinc-400">Track your current application stage.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsTrackerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-400 transition-colors hover:bg-white/15 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label="Close tracker"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="mt-5">
              {APPLICATION_PROGRESS_STEPS.map((step, index) => {
                const isCompleted = step.status === 'completed';
                const isLast = index === APPLICATION_PROGRESS_STEPS.length - 1;

                return (
                  <div key={step.label} className={`relative flex items-start gap-3 ${isLast ? '' : 'pb-8'}`}>
                    <div className="relative flex w-7 justify-center">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                          isCompleted ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {!isLast && <div className="absolute left-1/2 top-7 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-white/15" />}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-medium text-zinc-100">{step.label}</p>
                      <p className="mt-0.5 text-xs uppercase tracking-wide text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isOfferInfoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offer-info-title"
          onClick={() => setIsOfferInfoOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-yellow-300/50 bg-yellow-100 p-5 text-zinc-900 shadow-lg sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 id="offer-info-title" className="text-base font-semibold">
                What is an Offer?
              </h3>
              <button
                type="button"
                onClick={() => setIsOfferInfoOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-300/80 text-zinc-800 transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                aria-label="Close offer information"
              >
                <X size={14} weight="bold" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              An offer is the university's formal response to your application. After you apply, the university reviews your qualifications, academic history, and supporting documents. If they are satisfied, they issue an offer — this is an invitation for you to accept a place on the course you applied for.
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Offers can be <strong>unconditional</strong> (you have met all requirements) or <strong>conditional</strong> (you still need to meet certain conditions, such as achieving a required grade or submitting additional documents). The offer is provided by the university and issued directly to you, the student applicant.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
