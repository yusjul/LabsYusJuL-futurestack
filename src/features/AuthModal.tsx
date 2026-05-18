import { useState } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff, User, Users, ArrowLeft, KeyRound } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAuthErrorMessage } from '../utils/auth-errors';
import { Modal } from '../components/Overlays';
import { useTranslation } from '../translations';

const CHARACTER_SETS = [
  { label: 'Lowercase (a-z)', regex: /[a-z]/ },
  { label: 'Uppercase (A-Z)', regex: /[A-Z]/ },
  { label: 'Digit (0-9)', regex: /\d/ },
  { label: 'Special character', regex: /[!@#$%^&*()_+\-=\[\]{};':"|<>?,.\/`~]/ },
] as const;

type AuthMode = 'login' | 'register' | 'forgot' | 'otp' | 'newPassword';

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, signInWithUsername, signUpWithProfile, sendOtp, verifyOtpCode, updateUserPassword, signOut, addToast } = useApp();
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === 'login') {
      if (!username || !password) {
        addToast({ message: t('auth.toast_fill_fields'), type: 'warning' });
        return;
      }
      setLoading(true);
      try {
        await signInWithUsername(username, password);
      } catch (err: any) {
        addToast({ message: getAuthErrorMessage(err), type: 'error' });
      }
      setLoading(false);
      return;
    }

    if (mode === 'register') {
      if (!username || !email || !password) {
        addToast({ message: t('auth.toast_fill_fields'), type: 'warning' });
        return;
      }
      if (password.length < 8) {
        addToast({ message: t('auth.toast_password_length'), type: 'warning' });
        return;
      }
      const missing = CHARACTER_SETS.filter(cs => !cs.regex.test(password));
      if (missing.length > 0) {
        addToast({ message: t('auth.toast_password_complex'), type: 'warning' });
        return;
      }
      if (password !== confirmPassword) {
        addToast({ message: t('auth.toast_password_match'), type: 'warning' });
        return;
      }
      setLoading(true);
      try {
        await signUpWithProfile(username, email, gender, password);
        addToast({ message: t('auth.toast_signup_success'), type: 'success' });
      } catch (err: any) {
        addToast({ message: getAuthErrorMessage(err), type: 'error' });
      }
      setLoading(false);
      return;
    }

    if (mode === 'forgot') {
      if (!forgotEmail) {
        addToast({ message: t('auth.toast_fill_fields'), type: 'warning' });
        return;
      }
      setLoading(true);
      try {
        await sendOtp(forgotEmail);
        addToast({ message: t('auth.forgot_sent'), type: 'success' });
        setMode('otp');
      } catch (err: any) {
        addToast({ message: getAuthErrorMessage(err), type: 'error' });
      }
      setLoading(false);
      return;
    }

    if (mode === 'otp') {
      if (!otp || otp.length < 6) {
        addToast({ message: t('auth.toast_fill_fields'), type: 'warning' });
        return;
      }
      setLoading(true);
      try {
        await verifyOtpCode(forgotEmail, otp);
        setMode('newPassword');
      } catch (err: any) {
        addToast({ message: getAuthErrorMessage(err), type: 'error' });
      }
      setLoading(false);
      return;
    }

    if (mode === 'newPassword') {
      if (!password) {
        addToast({ message: t('auth.toast_fill_fields'), type: 'warning' });
        return;
      }
      if (password.length < 8) {
        addToast({ message: t('auth.toast_password_length'), type: 'warning' });
        return;
      }
      const missing = CHARACTER_SETS.filter(cs => !cs.regex.test(password));
      if (missing.length > 0) {
        addToast({ message: t('auth.toast_password_complex'), type: 'warning' });
        return;
      }
      if (password !== confirmPassword) {
        addToast({ message: t('auth.toast_password_match'), type: 'warning' });
        return;
      }
      setLoading(true);
      try {
        await updateUserPassword(password);
        await signOut();
        addToast({ message: t('auth.password_updated'), type: 'success' });
        resetForm();
        setMode('login');
      } catch (err: any) {
        addToast({ message: getAuthErrorMessage(err), type: 'error' });
      }
      setLoading(false);
      return;
    }
  }

  function resetForm() {
    setUsername('');
    setEmail('');
    setGender('male');
    setPassword('');
    setConfirmPassword('');
    setForgotEmail('');
    setOtp('');
  }

  function handleClose() {
    setShowAuthModal(false);
    resetForm();
    setMode('login');
  }

  function goTo(m: AuthMode) {
    setMode(m);
    setPassword('');
    setConfirmPassword('');
  }

  const showForm = (modeStr: AuthMode) => mode === modeStr ? '' : 'hidden';

  return (
    <Modal open={showAuthModal} onClose={handleClose} title="" size="sm">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff]">
            {mode === 'forgot' || mode === 'otp' || mode === 'newPassword'
              ? <KeyRound size={20} className="text-on-primary" />
              : <Zap size={20} className="text-on-primary" />
            }
          </div>
        </div>

        {mode === 'login' && (
          <>
            <h2 className="font-headline font-bold text-headline-md text-on-surface dark:text-[#e5e1ea]">{t('auth.sign_in_title')}</h2>
            <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">{t('auth.sign_in_sub')}</p>
          </>
        )}
        {mode === 'register' && (
          <>
            <h2 className="font-headline font-bold text-headline-md text-on-surface dark:text-[#e5e1ea]">{t('auth.register_title')}</h2>
            <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">{t('auth.register_sub')}</p>
          </>
        )}
        {mode === 'forgot' && (
          <>
            <h2 className="font-headline font-bold text-headline-md text-on-surface dark:text-[#e5e1ea]">{t('auth.forgot_password')}</h2>
            <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">{t('auth.forgot_sub')}</p>
          </>
        )}
        {mode === 'otp' && (
          <>
            <h2 className="font-headline font-bold text-headline-md text-on-surface dark:text-[#e5e1ea]">{t('auth.otp_title')}</h2>
            <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">{t('auth.otp_sub')}</p>
          </>
        )}
        {mode === 'newPassword' && (
          <>
            <h2 className="font-headline font-bold text-headline-md text-on-surface dark:text-[#e5e1ea]">{t('auth.new_password_title')}</h2>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ==================== LOGIN ==================== */}
        <div className={showForm('login')}>
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] block mb-1" htmlFor="auth-username">
              {t('auth.username_label')}
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
              <input id="auth-username" type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder={t('auth.username_placeholder')} autoComplete="username"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
            </div>
          </div>

          <div className="mt-4">
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-password">
              {t('auth.password_label')}
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input id="auth-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder='••••••••' autoComplete="current-password"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-10 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
              <button type="button" onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea]">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Forgot Password link */}
            <button type="button" onClick={() => goTo('forgot')}
              className="mt-1.5 font-mono text-[11px] text-primary dark:text-[var(--color-primary-fixed-dim-dark)] underline hover:no-underline float-right">
              {t('auth.forgot_password')}
            </button>
          </div>

          <button type="submit" disabled={loading}
            className={['w-full px-6 py-3 min-h-[48px] mt-6 border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary font-body text-body-md font-medium shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150', loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'].join(' ')}>
            {loading ? t('auth.signing_in') : t('auth.sign_in')}
          </button>
        </div>

        {/* ==================== REGISTER ==================== */}
        <div className={showForm('register')}>
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] block mb-1" htmlFor="auth-reg-username">{t('auth.username_label')}</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
              <input id="auth-reg-username" type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder={t('auth.username_placeholder')} autoComplete="username"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
            </div>
          </div>

          <div className="mt-4">
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] block mb-1" htmlFor="auth-reg-email">{t('auth.email_label')}</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
              <input id="auth-reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={t('auth.email_placeholder')} autoComplete="email"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
            </div>
          </div>

          <div className="mt-4">
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-reg-gender">{t('auth.gender_label')}</label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <select id="auth-reg-gender" value={gender} onChange={e => setGender(e.target.value)}
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)] appearance-none">
                <option value="male">{t('auth.gender_male')}</option>
                <option value="female">{t('auth.gender_female')}</option>
                <option value="other">{t('auth.gender_other')}</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-reg-password">{t('auth.password_label')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input id="auth-reg-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder={t('auth.password_placeholder')} autoComplete="new-password"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-10 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
              <button type="button" onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea]">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password.length > 0 && CHARACTER_SETS.every(cs => cs.regex.test(password)) && (
              <p className="font-mono text-xs text-green-500 dark:text-green-400 mt-1">{t('auth.password_valid')}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-reg-confirm">{t('auth.password_confirm')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input id="auth-reg-confirm" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                placeholder={t('auth.password_confirm_placeholder')} autoComplete="new-password"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-10 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
              <button type="button" onClick={() => setShowConfirmPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea]">
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className={['w-full px-6 py-3 min-h-[48px] mt-6 border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary font-body text-body-md font-medium shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150', loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'].join(' ')}>
            {loading ? t('auth.creating') : t('auth.create_account')}
          </button>
        </div>

        {/* ==================== FORGOT ==================== */}
        <div className={showForm('forgot')}>
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] block mb-1" htmlFor="auth-forgot-email">{t('auth.email_label')}</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
              <input id="auth-forgot-email" type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                placeholder={t('auth.email_placeholder')} autoComplete="email"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className={['w-full px-6 py-3 min-h-[48px] mt-6 border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary font-body text-body-md font-medium shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150', loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'].join(' ')}>
            {loading ? t('auth.forgot_sending') : t('auth.forgot_button')}
          </button>

          <button type="button" onClick={() => goTo('login')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 font-mono text-xs text-on-surface-variant dark:text-[#777584] hover:text-primary dark:hover:text-[var(--color-primary-fixed-dim-dark)] transition-colors">
            <ArrowLeft size={14} /> {t('auth.back_to_login')}
          </button>
        </div>

        {/* ==================== OTP ==================== */}
        <div className={showForm('otp')}>
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] block mb-1" htmlFor="auth-otp">{t('auth.otp_title')}</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
              <input id="auth-otp" type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder={t('auth.otp_placeholder')} autoComplete="one-time-code" inputMode="numeric" maxLength={6}
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-4 py-3 font-body text-body-sm text-center tracking-[0.5em] focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
            </div>
          </div>

          <button type="submit" disabled={loading || otp.length < 6}
            className={['w-full px-6 py-3 min-h-[48px] mt-6 border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary font-body text-body-md font-medium shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150', (loading || otp.length < 6) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'].join(' ')}>
            {loading ? t('auth.otp_verifying') : t('auth.otp_verify')}
          </button>

          <button type="button" onClick={() => goTo('forgot')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 font-mono text-xs text-on-surface-variant dark:text-[#777584] hover:text-primary dark:hover:text-[var(--color-primary-fixed-dim-dark)] transition-colors">
            <ArrowLeft size={14} /> {t('auth.back_to_login')}
          </button>
        </div>

        {/* ==================== NEW PASSWORD ==================== */}
        <div className={showForm('newPassword')}>
          <div>
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-new-password">{t('auth.password_label')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input id="auth-new-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder={t('auth.password_placeholder')} autoComplete="new-password"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-10 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
              <button type="button" onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea]">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password.length > 0 && CHARACTER_SETS.every(cs => cs.regex.test(password)) && (
              <p className="font-mono text-xs text-green-500 dark:text-green-400 mt-1">{t('auth.password_valid')}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-mono text-xs text-on-surface-variant dark:text-[#777584] block mb-1" htmlFor="auth-new-confirm">{t('auth.password_confirm')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
              <input id="auth-new-confirm" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                placeholder={t('auth.password_confirm_placeholder')} autoComplete="new-password"
                className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] pl-10 pr-10 py-3 font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)]" />
              <button type="button" onClick={() => setShowConfirmPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea]">
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className={['w-full px-6 py-3 min-h-[48px] mt-6 border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary font-body text-body-md font-medium shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150', loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'].join(' ')}>
            {loading ? t('auth.new_password_updating') : t('auth.new_password_button')}
          </button>

          <button type="button" onClick={() => goTo('login')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 font-mono text-xs text-on-surface-variant dark:text-[#777584] hover:text-primary dark:hover:text-[var(--color-primary-fixed-dim-dark)] transition-colors">
            <ArrowLeft size={14} /> {t('auth.back_to_login')}
          </button>
        </div>
      </form>

      {/* Footer */}
      {mode !== 'forgot' && mode !== 'otp' && mode !== 'newPassword' && (
        <div className="mt-6 pt-4 border-t border-on-surface/10 dark:border-[#464552]/50 text-center">
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">
            {mode === 'login' ? (
              <>{t('auth.no_account')}{' '}
                <button onClick={() => goTo('register')}
                  className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold underline hover:no-underline">
                  {t('auth.register_link')}
                </button>
              </>
            ) : (
              <>{t('auth.has_account')}{' '}
                <button onClick={() => goTo('login')}
                  className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold underline hover:no-underline">
                  {t('auth.sign_in_link')}
                </button>
              </>
            )}
          </p>
        </div>
      )}
    </Modal>
  );
}
