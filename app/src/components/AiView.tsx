import { useEffect, useRef, useState, type FormEvent } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, BookOpen, History, Plus, Trash2, X } from "lucide-react";
import type { AiContext, AiMessage, AiMode } from "../lib/ai";
import type { AiThread } from "../lib/aiThreads";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const MODES: Array<{ id: AiMode; label: string; hint: string }> = [
  { id: "explain", label: "Explain", hint: "Step-by-step from principle to answer" },
  { id: "socratic", label: "Socratic", hint: "Guided questions before the answer key" },
  { id: "journal", label: "Journal", hint: "Debit/credit logic for every entry" },
  { id: "exam", label: "Exam traps", hint: "Traps, common mistakes, memory hooks" },
  { id: "answer_check", label: "Check answer", hint: "Write your answer; the tutor marks it" },
];

const composerPlaceholder = (mode: AiMode) =>
  mode === "answer_check" ? "Write your full answer here — the tutor will mark it…" : "Type your question…";

function AssistantMessage({ content }: { content: string }) {
  return (
    <div className="chat-row assistant">
      <div className="chat-bubble assistant md">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
}

const threadDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date(iso));

export function AiView({
  busy,
  context,
  input,
  messages,
  mode,
  status,
  threads,
  activeThreadId,
  onAsk,
  onChangeInput,
  onChangeMode,
  onClearContext,
  onDeleteThread,
  onNewChat,
  onSelectThread,
}: {
  busy: boolean;
  context: AiContext | null;
  input: string;
  messages: AiMessage[];
  mode: AiMode;
  status: string;
  threads: AiThread[];
  activeThreadId: string | null;
  onAsk: (event: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (value: string) => void;
  onChangeMode: (mode: AiMode) => void;
  onClearContext: () => void;
  onDeleteThread: (threadId: string) => void;
  onNewChat: () => void;
  onSelectThread: (threadId: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const hasConversation = messages.length > 0;
  const activeMode = MODES.find((entry) => entry.id === mode) ?? MODES[0];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, busy]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [activeThreadId]);

  return (
    <div className="ai-page">
      <div className="ai-toolbar">
        {context ? (
          <span className="context-chip" title={context.selection ? `Selected text: ${context.selection}` : undefined}>
            <BookOpen size={13} />
            <span className="context-chip-text">
              {context.section || context.title || context.chapter}
              {context.selection ? " · highlighted text attached" : ""}
            </span>
            <button aria-label="Detach context" type="button" onClick={onClearContext}>
              <X size={12} />
            </button>
          </span>
        ) : (
          <span className="context-chip none">No chapter context attached</span>
        )}
        <div className="ai-toolbar-actions">
          {threads.length ? (
            <button
              className={cx("btn ghost small", historyOpen && "active")}
              type="button"
              onClick={() => setHistoryOpen((open) => !open)}
            >
              <History size={14} />
              History · {threads.length}
            </button>
          ) : null}
          {hasConversation ? (
            <button className="btn ghost small" type="button" onClick={onNewChat}>
              <Plus size={14} />
              New chat
            </button>
          ) : null}
        </div>
      </div>

      <div className="mode-rail" role="tablist" aria-label="Tutor mode">
        {MODES.map((entry) => (
          <button
            aria-selected={mode === entry.id}
            className={cx("mode-chip", mode === entry.id && "active")}
            key={entry.id}
            role="tab"
            title={entry.hint}
            type="button"
            onClick={() => onChangeMode(entry.id)}
          >
            {entry.label}
          </button>
        ))}
        <span className="mode-hint">{activeMode.hint}</span>
      </div>

      {historyOpen && threads.length ? (
        <div className="thread-panel">
          {threads.map((thread) => (
            <div className={cx("thread-row", thread.id === activeThreadId && "active")} key={thread.id}>
              <button
                className="thread-open"
                type="button"
                onClick={() => {
                  onSelectThread(thread.id);
                  setHistoryOpen(false);
                }}
              >
                <strong>{thread.title}</strong>
                <em>
                  {threadDate(thread.updatedAt)} · {thread.messages.length} messages
                </em>
              </button>
              <button
                aria-label={`Delete conversation: ${thread.title}`}
                className="thread-delete"
                type="button"
                onClick={() => onDeleteThread(thread.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="chat-scroll">
        {!hasConversation && !busy ? (
          <div className="chat-empty">
            <h3>Ask anything, in your own words.</h3>
            <p>
              The tutor answers from the attached chapter context when one is set
              {context ? "" : " — open a chapter and use its Ask AI buttons, or highlight any text inside a chapter"}.
              Nothing is pre-written for you. Conversations are saved on this device.
            </p>
          </div>
        ) : null}

        {messages.map((message, index) =>
          message.role === "assistant" ? (
            <AssistantMessage content={message.content} key={index} />
          ) : (
            <div className={cx("chat-row", message.role, message.kind)} key={index}>
              <div className={cx("chat-bubble", message.role, message.kind)}>{message.content}</div>
            </div>
          ),
        )}

        {busy ? (
          <div className="chat-row assistant">
            <div className="chat-bubble assistant thinking" aria-label="The tutor is thinking">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div className="composer-dock">
        <form className="composer" onSubmit={onAsk}>
          <textarea
            placeholder={composerPlaceholder(mode)}
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(event) => {
              onChangeInput(event.target.value);
              event.currentTarget.style.height = "auto";
              event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 200)}px`;
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
          />
          <button aria-label="Send" className="composer-send" disabled={busy || !input.trim()} type="submit">
            <ArrowUp size={17} />
          </button>
        </form>
        <div className="ai-status">{status}</div>
      </div>
    </div>
  );
}
