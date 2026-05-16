const ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Email or password is incorrect',
  'Email not confirmed': 'Please confirm your email address before signing in',
  'User already registered': 'An account with this email already exists',
  'Invalid email': 'Please enter a valid email address',
  'Rate limit exceeded': 'Too many requests. Please try again later.',
  'Failed to send': 'Something went wrong. Please try again.',
  'new row violates row-level security': 'You do not have permission to perform this action',
};

export function getAuthErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err ?? '');
  for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
    if (message.includes(key)) return value;
  }
  return message || 'Something went wrong';
}
