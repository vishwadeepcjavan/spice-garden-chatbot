'use client';

import { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '@/types';

const QUICK_REPLIES = [
  "What's on the menu?",
  'Are you open on Sunday?',
  'Do you deliver?',
];

function getOrCreateSessionId(): string {
  const STORAGE_KEY = 'spice_garden_session_id';
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(existing)) {
      return existing;
    }
    const newId = crypto.randomUUID();
    sessionStorage.setItem(STORAGE_KEY, newId);
    return newId;
  } catch {
    // Fallback if sessionStorage is blocked
    return crypto.randomUUID();
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Namaste! 🙏 Welcome to Spice Garden. How can I help you today? Ask about our menu, hours, delivery, or reservations!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const sessionIdRef = useRef<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();

    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Delay focus slightly so container renders
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading || trimmed.length > 500) return;

    setError(null);
    setLastUserMessage(trimmed);

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          messages: newMessages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get a response.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      setLastUserMessage(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to assistant.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastUserMessage) {
      sendMessage(lastUserMessage);
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-700 to-orange-600 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:scale-95"
        aria-label={isOpen ? 'Close chat' : 'Open Spice Garden chat assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <span className="text-2xl" role="img" aria-label="chat">💬</span>
            {/* Ping notification dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Spice Garden Assistant"
          className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[580px] sm:w-[380px] sm:rounded-2xl sm:shadow-2xl sm:border sm:border-orange-100 overflow-hidden transition-all duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-red-800 to-red-700 px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-900/60 text-lg border border-red-600/40">
                🌿
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-wide">Spice Garden Assistant</h2>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs text-orange-200">Online • Pune</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-orange-200 hover:bg-red-700/60 hover:text-white transition-colors"
              aria-label="Close chat window"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto bg-orange-50/40 p-4 space-y-3.5">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-red-700 text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-orange-100/80 rounded-bl-xs'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {/* Quick replies (only visible if just the initial message exists) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-gray-500">Suggested questions:</p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_REPLIES.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMessage(chip)}
                      className="text-left rounded-xl border border-orange-200 bg-white px-3 py-2 text-xs text-red-800 hover:bg-orange-50 hover:border-red-300 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-xs bg-white border border-orange-100 px-4 py-3 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-bounce"></span>
                </div>
              </div>
            )}

            {/* Error display */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                <p className="font-medium">{error}</p>
                {lastUserMessage && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-2 inline-flex items-center font-semibold text-red-800 underline hover:text-red-900"
                  >
                    Retry message ↻
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer input form */}
          <div className="border-t border-orange-100 bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  maxLength={500}
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-700 text-white transition-colors hover:bg-red-800 disabled:opacity-40 disabled:hover:bg-red-700"
                  aria-label="Send message"
                >
                  <svg className="h-4 w-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between px-1 text-[11px] text-gray-400">
                <span>Enter to send</span>
                <span className={input.length >= 450 ? 'text-amber-600 font-semibold' : ''}>
                  {input.length}/500
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
