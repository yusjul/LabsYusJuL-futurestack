import { useState, useEffect } from 'react';

const STORAGE_KEY = 'futurestack-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-center p-4 pointer-events-none">
      <div className="fixed inset-0 bg-black/40" />
      <div className="relative w-full max-w-xl border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[6px_6px_0px_0px_#a8a6ff] p-5 pointer-events-auto">
        <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea] mb-4">
          This app uses cookies for authentication (Google OAuth) and local storage for offline functionality.
          By continuing, you agree to our use of cookies.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={reject}
            className="px-4 py-2 min-h-[44px] border-2 border-on-surface dark:border-[#464552] bg-surface dark:bg-[#252533] font-mono text-xs text-on-surface dark:text-[#e5e1ea] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#464552] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 min-h-[44px] border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary font-mono text-xs shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
