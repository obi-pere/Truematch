import { PencilSimple } from '@phosphor-icons/react';
import { useState, type KeyboardEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';

type EditableFieldKey =
  | 'fullName'
  | 'gender'
  | 'dateOfBirth'
  | 'nationality'
  | 'countryOfResidence'
  | 'residentialAddress'
  | 'stateOrProvince'
  | 'passportNumber'
  | 'passportExpiryDate'
  | 'phoneNumber'
  | 'emailAddress'
  | 'changePassword';

export const DashboardProfilePage = () => {
  const { user } = useAuth();

  const firstName = user?.fullName?.trim().split(/\s+/).filter(Boolean)[0] ?? 'Applicant';
  const avatarSeed = user?.fullName?.trim() || user?.email || firstName;
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`;
  const [profileSummary, setProfileSummary] = useState<Record<EditableFieldKey, string>>({
    fullName: user?.fullName ?? '—',
    gender: '—',
    dateOfBirth: '—',
    nationality: '—',
    countryOfResidence: '—',
    stateOrProvince: '—',
    passportNumber: '—',
    passportExpiryDate: '—',
    emailAddress: user?.email ?? '—',
    phoneNumber: '—',
    residentialAddress: '—',
    changePassword: '••••••••'
  });
  const [activeField, setActiveField] = useState<EditableFieldKey | null>(null);

  const handleStartEdit = (field: EditableFieldKey) => {
    setActiveField(field);
  };

  const handleFinishEdit = () => {
    setActiveField(null);
  };

  const handleFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>, field: EditableFieldKey) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFinishEdit();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setProfileSummary((previous) => ({
        ...previous,
        [field]: previous[field] || '—'
      }));
      handleFinishEdit();
    }
  };

  const renderEditableRow = (
    label: string,
    field: EditableFieldKey,
    options?: { type?: 'text' | 'email' | 'password' }
  ) => {
    const isActive = activeField === field;
    const inputType = options?.type ?? 'text';

    return (
      <button
        key={field}
        type="button"
        onClick={() => handleStartEdit(field)}
        className="group flex w-full items-start justify-between gap-2 text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
          {isActive ? (
            <input
              autoFocus
              type={inputType}
              value={profileSummary[field]}
              onChange={(event) =>
                setProfileSummary((previous) => ({
                  ...previous,
                  [field]: event.target.value
                }))
              }
              onBlur={handleFinishEdit}
              onKeyDown={(event) => handleFieldKeyDown(event, field)}
              onClick={(event) => event.stopPropagation()}
              className="mt-1 w-full border-0 bg-transparent p-0 text-sm font-medium text-zinc-200 outline-none focus:ring-0"
            />
          ) : (
            <p className="mt-1 text-sm font-medium text-zinc-200">{profileSummary[field]}</p>
          )}
        </div>

        <span
          className="ml-auto shrink-0 rounded-md p-1.5 text-zinc-500 transition-colors group-hover:text-zinc-200"
          aria-hidden
        >
          <PencilSimple size={16} weight="regular" />
        </span>
      </button>
    );
  };

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto px-3 pt-5 pb-3">
        <div className="max-w-5xl divide-y divide-white/10">
          <section>
            <div className="px-5 py-4 sm:px-6">
              <h3 className="text-base font-semibold uppercase tracking-wide text-zinc-100">Personal Information</h3>
            </div>
            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Profile Photo</p>
                <div className="relative mt-2 inline-block">
                  <img src={avatarUrl} alt={`${firstName} profile`} className="h-20 w-20 rounded-full border border-white/10" />
                  <button
                    type="button"
                    className="glass-border absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-dark-card px-3 py-1 text-[11px] font-medium text-zinc-200 shadow-lg transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    Change photo
                  </button>
                </div>
              </div>
              {renderEditableRow('Full Name', 'fullName')}
              {renderEditableRow('Gender', 'gender')}
              {renderEditableRow('Date of Birth', 'dateOfBirth')}
              {renderEditableRow('Nationality', 'nationality')}
              {renderEditableRow('Country of Residence', 'countryOfResidence')}
              {renderEditableRow('Residential Address', 'residentialAddress')}
              {renderEditableRow('State / Province', 'stateOrProvince')}
              {renderEditableRow('Passport Number', 'passportNumber')}
              {renderEditableRow('Passport Expiry Date', 'passportExpiryDate')}
              {renderEditableRow('Phone Number', 'phoneNumber')}
            </div>
          </section>

          <section>
            <div className="px-5 py-4 sm:px-6">
              <h3 className="text-base font-semibold uppercase tracking-wide text-zinc-100">Email Settings</h3>
            </div>
            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              {renderEditableRow('Current Email Address', 'emailAddress', { type: 'email' })}
            </div>
          </section>

          <section>
            <div className="px-5 py-4 sm:px-6">
              <h3 className="text-base font-semibold uppercase tracking-wide text-zinc-100">Security</h3>
            </div>
            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              {renderEditableRow('Change Password', 'changePassword', { type: 'password' })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};