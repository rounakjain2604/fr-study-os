import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { PaletteCommand } from "../lib/paletteCommands";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const GROUP_ORDER: PaletteCommand["group"][] = ["Go to", "Chapters", "Syllabus", "Study days"];

const filterCommands = (commands: PaletteCommand[], query: string): PaletteCommand[] => {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) {
    // No query: show navigation and chapters only, so the list stays scannable.
    return commands.filter((command) => command.group === "Go to" || command.group === "Chapters");
  }

  const scored = commands
    .map((command) => {
      let score = 0;
      for (const token of tokens) {
        if (!command.keywords.includes(token)) return null;
        score += command.label.toLowerCase().startsWith(token) ? 3 : command.keywords.startsWith(token) ? 2 : 1;
      }
      return { command, score };
    })
    .filter((entry): entry is { command: PaletteCommand; score: number } => entry !== null);

  scored.sort(
    (left, right) =>
      right.score - left.score || GROUP_ORDER.indexOf(left.command.group) - GROUP_ORDER.indexOf(right.command.group),
  );

  return scored.slice(0, 24).map((entry) => entry.command);
};

export function CommandPalette({
  open,
  commands,
  onClose,
}: {
  open: boolean;
  commands: PaletteCommand[];
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => filterCommands(commands, query), [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const runCommand = (command: PaletteCommand) => {
    onClose();
    command.run();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (results[activeIndex]) runCommand(results[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  let lastGroup: string | null = null;

  return (
    <div aria-modal="true" className="palette-overlay" role="dialog" onMouseDown={onClose}>
      <div className="palette" onMouseDown={(event) => event.stopPropagation()}>
        <label className="palette-input">
          <Search size={16} />
          <input
            placeholder="Jump to a chapter, syllabus unit, study day…"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <kbd>esc</kbd>
        </label>
        <div className="palette-list" ref={listRef}>
          {results.map((command, index) => {
            const Icon = command.icon;
            const groupHeading = command.group !== lastGroup ? command.group : null;
            lastGroup = command.group;

            return (
              <div key={command.id}>
                {groupHeading ? <div className="palette-group">{groupHeading}</div> : null}
                <button
                  className={cx("palette-item", index === activeIndex && "active")}
                  data-index={index}
                  type="button"
                  onClick={() => runCommand(command)}
                  onMouseMove={() => setActiveIndex(index)}
                >
                  <Icon size={15} />
                  <span className="palette-label">{command.label}</span>
                  {command.hint ? <em>{command.hint}</em> : null}
                </button>
              </div>
            );
          })}
          {!results.length ? <p className="palette-empty">Nothing matches. Try a standard number or a topic word.</p> : null}
        </div>
        <div className="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Ctrl</kbd><kbd>K</kbd> toggle</span>
        </div>
      </div>
    </div>
  );
}
