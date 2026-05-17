import { useState } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff, User, Users } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAuthErrorMessage } from '../utils/auth-errors';
import { Modal } from '../components/Overlays';

const CHARACTER_SETS = [
  { label: 'Lowercase (a-z)', regex: /[a-z]/ },
  { label: 'Uppercase (A-Z)', regex: /[A-Z]/ },
  { label: 'Digit (0-9)', regex: /\d/ },
  { label: 'Special character', regex: /[!@#$%^&*()_+\-=\[\]{};':"|<>?,.\/`~]/ },
] as const;

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, signInWithUsername, signUpWithProfile, addToast } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      addToast({ message: 'Please fill in all fields', type: 'warning' });
      return;
    }
    if (isLogin) {
      setLoading(true);
      try {
        await signInWithUsername(username, password);
      } catch (err: any) {
        addToast({ message: getAuthErrorMessage(err), type: 'error' });
      }
      setLoading(false);
    } else {
      if (!email) {
        addToast({ message: 'Please fill in all fields', type: 'warning' });
        return;
      }
      if (password.length < 8) {
        addToast({ message: 'Password must be at least 8 characters', type: 'warning' });
        return;
      }
      const missing = CHARACTER_SETS.filter(cs => !cs.regex.test(password));
      if (missing.length > 0) {
        addToast({ message: 'Password must contain at least one lowercase, uppercase, digit, and special character', type: 'warning' });
        return;
      }
      if (password !== confirmPassword) {
        addToast({ message: 'Passwords do not match', type: 'warning' });
        return;
      }
      setLoading(true);
      try {
        await signUpWithProfile(username, email, gender, password);
        addToast({
          message: 'Account created! Check your email for a confirmation link.',
          type: 'success',
        });
      } catch (err: any) {
        addToast({ message: getAuthErrorMessage(err), type: 'error' });
      }
      setLoading(false);
    }
  }

  function handleClose() {
    setShowAuthModal(false);
    setUsername('');
    setEmail('');
    setGender('male');
    setPassword('');
    setConfirmPassword('');
  }

  function switchMode() {
    setIsLogin(!isLogin);
    setEmail('');
    setConfirmPassword('');
  }

  return (
    <Modal
      open={showAuthModal}
      onClose={handleClose}
      title=""
      size="sm"
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff]">
            <Zap size={20} className="text-on-primary" />
          </div>
        </div>
        <h2 className="font-headline font-bold text-headline-md text-on-surface dark:text-[#e5e1ea]">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">
          {isLogin
            ? 'Sign in to create and edit data'
            : 'Register to start collaborating'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] block mb-1" htmlFor="auth-username">
            Username
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
            <input
              id="auth-username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="your_username"
              autoComplete="username"
              className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]"
            />
          </div>
        </div>

        {/* Email - only for register */}
        {!isLogin && (
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] block mb-1" htmlFor="auth-email">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]"
              />
            </div>
          </div>
        )}

        {/* Gender - only for register */}
        {!isLogin && (
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-gender">
              Gender
            </label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <select
                id="auth-gender"
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)] appearance-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Password */}
        <div>
          <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-password">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={isLogin ? '••••••••' : 'Min. 8 characters'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
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

        {/* Password requirement status - only for register */}
        {!isLogin && password.length > 0 && CHARACTER_SETS.every(cs => cs.regex.test(password)) && (
          <p className="font-mono text-xs text-green-500 dark:text-green-400">✓ Password meets requirements</p>
        )}

        {/* Confirm Password - only for register */}
        {!isLogin && (
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-confirm">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input
                id="auth-confirm"
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
        )}

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
          {loading
            ? (isLogin ? 'Signing in...' : 'Creating account...')
            : (isLogin ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-on-surface/10 dark:border-[#464552]/50 text-center">
        <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">
          {isLogin ? (
            <>Don't have an account?{' '}
              <button
                onClick={switchMode}
                className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold underline hover:no-underline"
              >
                Register
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button
                onClick={switchMode}
                className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold underline hover:no-underline"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </Modal>
  );
}
