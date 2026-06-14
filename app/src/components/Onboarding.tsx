import { useState } from "react";
import { BookOpen, Brain, Gauge, Layers } from "lucide-react";
import { TrinsicMark } from "./TrinsicMark";

type OnboardingProps = {
  onDone: () => void;
};

const FEATURES = [
  { icon: BookOpen, title: "Chapter workspaces", note: "Drills, worked sums and quizzes — authored exam-tight, not bloated." },
  { icon: Layers, title: "Recall cards", note: "Spaced repetition that builds itself from every chapter you open." },
  { icon: Gauge, title: "Plan & analytics", note: "A day-by-day ledger that keeps your pace honest to exam day." },
  { icon: Brain, title: "AI tutor", note: "Ask anything — grounded in exactly what you're studying." },
];

/**
 * First-run welcome. Three calm, full-screen steps that set the Trinsic tone
 * before the dense study dashboard. Shown once (gated on localStorage in App).
 */
export function Onboarding({ onDone }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const last = 2;
  const next = () => (step >= last ? onDone() : setStep((s) => s + 1));

  return (
    <div className="onboarding" role="dialog" aria-modal="true" aria-label="Welcome to Trinsic">
      <div className="onboarding-card">
        {step < last ? (
          <button className="onboarding-skip" type="button" onClick={onDone}>
            Skip
          </button>
        ) : (
          <span className="onboarding-skip" aria-hidden="true" />
        )}

        <div className="onboarding-body" key={step}>
          {step === 0 ? (
            <>
              <span className="onboarding-overline">Trinsic</span>
              <TrinsicMark className="onboarding-mark" size={96} />
              <h2>Welcome to Trinsic</h2>
              <p>A calm place to master what you study — one focus at a time, until it's intrinsic.</p>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2>Built for the sprint</h2>
              <ul className="onboarding-list">
                {FEATURES.map(({ icon: Icon, title, note }) => (
                  <li key={title}>
                    <span className="ob-ico">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <span>
                      <b>{title}</b>
                      <span>{note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <TrinsicMark className="onboarding-mark" size={72} />
              <h2>Everything stays yours</h2>
              <p>Your progress lives on this device. Back it up or sync across devices from Settings whenever you like.</p>
            </>
          ) : null}
        </div>

        <div className="onboarding-foot">
          <button className="btn cap" type="button" onClick={next}>
            {step === 0 ? "Begin" : step === 1 ? "Continue" : "Enter Trinsic"}
          </button>
          <div className="onboarding-dots" aria-hidden="true">
            <span className={step === 0 ? "on" : undefined} />
            <span className={step === 1 ? "on" : undefined} />
            <span className={step === 2 ? "on" : undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
