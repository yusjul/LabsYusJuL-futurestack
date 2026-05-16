import { useState } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAuthErrorMessage } from '../utils/auth-errors';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const { signInWithGoogle, signUpWithEmail, addToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleGoogleSignUp() {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch {
      addToast({ message: 'Failed to sign up with Google', type: 'error' });
      setLoading(false);
    }
  }

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      addToast({ message: 'Please fill in all fields', type: 'warning' });
      return;
    }
    if (password.length < 6) {
      addToast({ message: 'Password must be at least 6 characters', type: 'warning' });
      return;
    }
    if (password !== confirmPassword) {
      addToast({ message: 'Passwords do not match', type: 'warning' });
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      addToast({
        message: 'Account created! Check your email for a confirmation link.',
        type: 'success',
      });
    } catch (err: any) {
      addToast({ message: getAuthErrorMessage(err), type: 'error' });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#12121a] p-4">
      <div className="w-full max-w-md border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[8px_8px_0px_0px_#a8a6ff] p-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff]">
            <Zap size={24} className="text-on-primary" />
          </div>
        </div>

        <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea] text-center mb-2">
          Create Account
        </h1>
        <p className="font-body text-body-sm text-on-surface-variant dark:text-[#777584] text-center mb-8">
          Sign up to get started with your workspace
        </p>

        {/* Email/Password form */}
        <form onSubmit={handleEmailSignUp} className="space-y-4 mb-6">
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="reg-email">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="reg-password">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-10 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="reg-confirm">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input
                id="reg-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                autoComplete="new-password"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-10 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea]"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-on-surface/20 dark:bg-[#464552]/50" />
          <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">or continue with</span>
          <div className="flex-1 h-px bg-on-surface/20 dark:bg-[#464552]/50" />
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className={[
            'w-full flex items-center justify-center gap-3 px-6 py-3 min-h-[48px]',
            'border-2 border-on-surface dark:border-[#a8a6ff]',
            'bg-surface dark:bg-[#252533]',
            'font-body text-body-md font-medium text-on-surface dark:text-[#e5e1ea]',
            'shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff]',
            'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff]',
            'active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
            'transition-all duration-150',
            loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </g>
          </svg>
          {loading ? 'Signing in...' : 'Sign up with Google'}
        </button>

        {/* Switch to Login */}
        <div className="mt-6 pt-4 border-t border-on-surface/10 dark:border-[#464552]/50 text-center">
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold underline hover:no-underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
