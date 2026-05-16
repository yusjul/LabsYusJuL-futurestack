import { useState } from 'react';
import { Zap, Mail, ArrowLeft } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAuthErrorMessage } from '../utils/auth-errors';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const { resetPasswordForEmail, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      addToast({ message: 'Please enter your email', type: 'warning' });
      return;
    }
    setLoading(true);
    try {
      await resetPasswordForEmail(email);
      setSent(true);
      addToast({ message: 'Reset link sent! Check your email.', type: 'success' });
    } catch (err: any) {
      addToast({ message: getAuthErrorMessage(err), type: 'error' });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#12121a] p-4">
      <div className="w-full max-w-md border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[8px_8px_0px_0px_#a8a6ff] p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff]">
            <Zap size={24} className="text-on-primary" />
          </div>
        </div>

        {!sent ? (
          <>
            <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea] text-center mb-2">
              Reset Password
            </h1>
            <p className="font-body text-body-sm text-on-surface-variant dark:text-[#777584] text-center mb-8">
              Enter your email and we'll send you a reset link
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="reset-email">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={[
                  'w-full px-6 py-3 min-h-[48px]',
                  'border-2 border-on-surface dark:border-[#a8a6ff]',
                  'bg-primary text-on-primary',
                  'font-body text-body-md font-medium',
                  'shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff]',
                  'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff]',
                  'active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
                  'transition-all duration-150',
                  loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                ].join(' ')}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea] text-center mb-2">
              Check Your Email
            </h1>
            <p className="font-body text-body-sm text-on-surface-variant dark:text-[#777584] text-center mb-8">
              We've sent a password reset link to <strong className="text-on-surface dark:text-[#e5e1ea]">{email}</strong>
            </p>
            <div className="w-12 h-12 mx-auto mb-6 border-2 border-[#84cc16] border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] text-center">
              Didn't receive the email? Check your spam folder or{' '}
              <button onClick={() => setSent(false)} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] underline hover:no-underline">
                try again
              </button>
            </p>
          </>
        )}

        <div className="mt-6 pt-4 border-t border-on-surface/10 dark:border-[#464552]/50 text-center">
          <button
            onClick={onBackToLogin}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-primary dark:text-[var(--color-primary-fixed-dim-dark)] hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
