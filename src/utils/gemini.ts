const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are a friendly AI assistant integrated into FutureStack, a developer OS and project management app. You help users with:
- Answering questions about their projects, tasks, and notes (based on what they tell you)
- General coding and development questions
- Productivity tips and workflow advice
- Friendly conversation

Keep responses concise, helpful, and warm. Use Indonesian language. Don't mention that you're an AI unless asked.`;

export interface GeminiResponse {
  text: string;
  error?: string;
}

export async function sendMessage(messages: { role: string; content: string }[]): Promise<GeminiResponse> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return {
      text: '',
      error: 'Gemini API key belum diatur. Tambahkan di file .env: VITE_GEMINI_API_KEY=...',
    };
  }

  const chatMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Siap! Saya akan membantu dengan ramah dan informatif.' }] },
    ...chatMessages,
  ];

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        return { text: '', error: '⚠️ Kuota Gemini API habis. Tunggu beberapa saat, lalu coba lagi.' };
      }
      const err = await res.text();
      return { text: '', error: `API error: ${res.status}` };
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return { text };
  } catch (err: any) {
    return { text: '', error: err.message || 'Network error' };
  }
}

export function hasGeminiKey(): boolean {
  return Boolean(GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here');
}
