import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { animate } from 'animejs';
import { AssistantFace } from './AssistantFace';
import { sendMessage, hasGeminiKey } from '../utils/gemini';
import type { ChatMessage } from '../types';

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiReady] = useState(hasGeminiKey());
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  const hasUnread = !open && messages.length > 0 && messages[messages.length - 1].role === 'assistant';

  useEffect(() => {
    if (animRef.current) {
      animRef.current.pause();
      animRef.current = null;
    }

    if (open) {
      setPanelVisible(true);
      setTimeout(() => {
        if (panelRef.current) {
          animRef.current = animate(panelRef.current, {
            translateY: { from: 20, to: 0 },
            opacity: { from: 0, to: 1 },
            scale: { from: 0.85, to: 1 },
            duration: 350,
            easing: 'easeOutBack(1.2)',
          });
        }
        if (inputRef.current) inputRef.current.focus();
      }, 10);
    } else {
      if (panelRef.current) {
        animRef.current = animate(panelRef.current, {
          translateY: { from: 0, to: 20 },
          opacity: { from: 1, to: 0 },
          scale: { from: 1, to: 0.85 },
          duration: 200,
          easing: 'easeInQuad',
          onComplete: () => {
            if (!open) setPanelVisible(false);
          },
        });
      } else {
        setPanelVisible(false);
      }
    }
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    if (!apiReady) {
      const errMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: '⚠️ Gemini API key belum diatur. Tambahkan `VITE_GEMINI_API_KEY=...` di file .env lalu restart dev server.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errMsg]);
      setLoading(false);
      return;
    }

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const result = await sendMessage([...history, { role: 'user', content: text }]);

    const assistMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: result.error || result.text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, assistMsg]);
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        {panelVisible && (
          <div
            ref={panelRef}
            className="w-80 sm:w-96 border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard-lg dark:shadow-[6px_6px_0px_0px_#a8a6ff] flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(500px, 70vh)', transformOrigin: 'bottom right' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-on-surface dark:border-[#464552] bg-primary text-on-primary">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs font-bold">AI</span>
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Assistant</span>
              </div>
              {!apiReady && (
                <span className="font-mono text-[10px] text-yellow-200 px-1.5 py-0.5 bg-yellow-800/30 border border-yellow-200/30">
                  NO KEY
                </span>
              )}
            </div>

            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]"
            >
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] mb-2">
                    👋 Hai! Ada yang bisa dibantu?
                  </p>
                  <p className="font-mono text-[10px] text-on-surface-variant dark:text-[#464552]">
                    Tanya seputar project, task, atau coding
                  </p>
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={[
                        'max-w-[85%] px-3 py-2 border-2',
                        msg.role === 'user'
                          ? 'bg-primary text-on-primary border-on-surface dark:border-[#a8a6ff]'
                          : 'bg-surface-container dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] border-on-surface/40 dark:border-[#464552]',
                      ].join(' ')}
                    >
                      <p className="font-body text-body-sm whitespace-pre-wrap break-words">{msg.content}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant/60 dark:text-[#777584]/60 text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container dark:bg-[#252533] border-2 border-on-surface/40 dark:border-[#464552] px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t-2 border-on-surface dark:border-[#464552] p-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pesan..."
                disabled={loading}
                className="flex-1 px-3 py-2 border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)] min-h-[44px]"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        <AssistantFace open={open} onToggle={() => setOpen(v => !v)} unread={hasUnread} />
      </div>

      {panelVisible && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
