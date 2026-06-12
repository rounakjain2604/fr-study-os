import { useEffect, useRef, useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import type { ChapterAsset } from "../data/catalog";
import { chapterContext, type AiContext } from "../lib/ai";
import { ChapterDashboard } from "./ChapterDashboard";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

// Floating "Ask AI about this" affordance for any text selected inside the workspace.
function useSelectionAsk(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const documentSelection = window.getSelection();
      const text = documentSelection?.toString().trim() ?? "";
      if (!text || text.length < 8 || !documentSelection || documentSelection.rangeCount === 0) {
        setSelection(null);
        return;
      }
      const range = documentSelection.getRangeAt(0);
      const container = containerRef.current;
      if (!container || !container.contains(range.commonAncestorContainer)) {
        setSelection(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setSelection({
        text: text.slice(0, 600),
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    };

    // selectionchange can fire synchronously while React is committing DOM
    // removals; defer to the next frame so we never set state mid-render.
    const onSelectionChange = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [containerRef]);

  return selection;
}

export function ChapterView({ chapter, onOpenAi }: { chapter: ChapterAsset; onOpenAi: (context?: AiContext) => void }) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const selection = useSelectionAsk(workspaceRef);

  const askSelection = () => {
    if (!selection) return;
    onOpenAi({ ...chapterContext(chapter), selection: selection.text });
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div className="chapter-workspace" ref={workspaceRef}>
      {selection ? (
        <button
          className="selection-ask"
          style={{ left: Math.max(12, selection.x - 60), top: Math.max(60, selection.y - 44) }}
          type="button"
          // preserve the selection: mousedown would collapse it before click fires
          onMouseDown={(event) => event.preventDefault()}
          onClick={askSelection}
        >
          <Sparkles size={13} /> Ask AI about this
        </button>
      ) : null}

      {/* Chapters with a native doc render their own header — avoid a double hero. */}
      {!chapter.doc ? (
        <section className="chapter-hero">
          <div>
            <span className={cx("tag", chapter.tone)}>{chapter.status}</span>
            <p>{chapter.summary}</p>
            <div className="chip-row">
              {chapter.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="chapter-actions">
            <button className="btn cap" type="button" onClick={() => onOpenAi(chapterContext(chapter))}>
              <Brain size={16} />
              Ask AI
            </button>
          </div>
        </section>
      ) : null}

      {chapter.doc ? (
        <ChapterDashboard
          doc={chapter.doc}
          onAskPractice={(item) =>
            onOpenAi({
              ...chapterContext(chapter),
              section: `ICAI Practical ${item.ref}`,
              title: item.title,
              question: item.question,
              modelAnswer: item.solution.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 2000),
            })
          }
          onAskSection={(request) =>
            onOpenAi({
              ...chapterContext(chapter),
              section: request.sectionTitle,
              title: request.sectionTitle,
              summary: request.summary,
            })
          }
        />
      ) : (
        <>
          {chapter.sections.length ? (
            <section className="study-section-grid">
              {chapter.sections.map((section) => (
                <article className="study-card" key={section.id}>
                  <div>
                    <span className="tag cap">Study</span>
                    <h3>{section.title}</h3>
                    <p>{section.summary}</p>
                    <ul>{section.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
                  </div>
                  <button
                    className="btn ghost small"
                    type="button"
                    onClick={() =>
                      onOpenAi({
                        subject: chapter.subject,
                        chapter: chapter.title,
                        unit: chapter.unit,
                        section: section.title,
                        title: section.title,
                        summary: section.summary,
                        keyRules: section.rules,
                        traps: section.traps,
                        sourceFile: chapter.sourceFile,
                      })
                    }
                  >
                    Ask AI
                  </button>
                </article>
              ))}
            </section>
          ) : null}

          {chapter.practice.length ? (
            <section className="practice-panel">
              <div className="sec-head">
                <span className="folio">Practice</span>
                <h2>Question cards</h2>
              </div>
              <div className="practice-list">
                {chapter.practice.map((item) => (
                  <article className="practice-card" key={item.id}>
                    <div className="practice-meta">
                      <span>{item.type}</span>
                      <span>{item.topic}</span>
                      <span>{item.difficulty}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.question}</p>
                    <details>
                      <summary>Model answer</summary>
                      <p>{item.modelAnswer}</p>
                    </details>
                    <button
                      className="btn ghost small"
                      type="button"
                      onClick={() =>
                        onOpenAi({
                          subject: chapter.subject,
                          chapter: chapter.title,
                          unit: chapter.unit,
                          title: item.title,
                          question: item.question,
                          modelAnswer: item.modelAnswer,
                          section: item.topic,
                          sourceFile: chapter.sourceFile,
                        })
                      }
                    >
                      Ask AI
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {chapter.href ? (
            <section className="embedded-dashboard">
              <div className="sec-head">
                <span className="folio">Board</span>
                <h2>Chapter dashboard</h2>
              </div>
              <p className="embed-note">
                This chapter still runs on its legacy standalone board, embedded here until it is migrated to a native workspace like Ind AS 23.
              </p>
              <iframe src={chapter.href} title={`${chapter.title} dashboard`} />
            </section>
          ) : (
            <section className="empty-card">
              This chapter is registered, but its structured content is still pending migration.
            </section>
          )}
        </>
      )}
    </div>
  );
}
