import { getOfflineResponse } from './chatbot';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const SYSTEM_PROMPT = `You are a friendly AI assistant integrated into FutureStack, a developer OS and project management app.

IMPORTANT CONTEXT about FutureStack:
- Created by YusJuL, a Sistem Informasi (Information Systems) university student
- Built with React + TypeScript + Vite, neobrutalism design style
- Features: project management, kanban board, notes (markdown), analytics, cloud sync (Supabase), AI chat assistant
- Offline-first architecture using IndexedDB
- YusJuL's skills: React, TypeScript, Node.js, Express, Supabase, PostgreSQL, MySQL, Tailwind CSS, Figma, Git
- Contact: Instagram @m.yuusufj, GitHub github.com/YusJuL, Email dev@futurestack.io

YusJuL's Portfolio Projects:
1. FutureStack — Developer OS & Project Management (React + TypeScript + Vite + Supabase)
2. SiAkademik — Sistem Informasi Akademik (PHP Laravel + MySQL + Bootstrap)
3. InventoryPro — Sistem Manajemen Inventaris (Node.js + Express + PostgreSQL)
4. ClinicCare — Rekam Medis Elektronik (React + Firebase + Tailwind CSS)
5. BudgetMate — Aplikasi Keuangan Pribadi (React Native + SQLite)

You help users with:
- Answering questions about FutureStack and its creator YusJuL
- General coding and development questions
- Productivity tips and workflow advice
- Friendly conversation

RULES:
- Respond naturally and helpfully. If user asks for project ideas, give creative suggestions.
- You CANNOT create, add, or delete projects/tasks/notes. NEVER say "sudah ditambahkan" or "sudah dibuat" because you don't have that ability.
- If user asks you to create something, suggest a good name and say: "Ketik 'buat project [nama]' untuk membuatnya ya!"
- Keep responses concise, helpful, and warm
- Use Indonesian language`;

export interface GeminiResponse {
  text: string;
  error?: string;
}

async function tryGroq(messages: { role: string; content: string }[]): Promise<string | null> {
  if (!GROQ_API_KEY) return null;
  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });
    if (!res.ok) { console.warn(`[Groq] ${res.status}`); return null; }
    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? null;
  } catch (err: any) {
    console.warn('[Groq] error:', err.message);
    return null;
  }
}

async function tryGemini(messages: { role: string; content: string }[]): Promise<string | null> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') return null;
  const chatMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Siap!' }] },
    ...chatMessages,
  ];
  for (const model of ['gemini-2.0-flash', 'gemini-1.5-flash']) {
    try {
      const res = await fetch(`${GEMINI_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      if (text) return text;
    } catch { continue; }
  }
  return null;
}

export async function sendMessage(messages: { role: string; content: string }[]): Promise<GeminiResponse> {
  const lastMessage = messages[messages.length - 1]?.content ?? '';

  const groqResult = await tryGroq(messages);
  if (groqResult) return { text: groqResult };

  const geminiResult = await tryGemini(messages);
  if (geminiResult) return { text: geminiResult };

  console.info('[AI] All APIs failed, using offline chatbot');
  return { text: getOfflineResponse(lastMessage) };
}

export function hasGeminiKey(): boolean {
  return Boolean(GROQ_API_KEY || (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here'));
}
