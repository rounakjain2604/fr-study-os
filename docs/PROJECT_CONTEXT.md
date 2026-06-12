# CA Final Study OS - Project Context

Last updated: 2026-06-07

## Core Vision

This project is first a personal CA Final May 2027 study control room, and only later a possible commercial product. The immediate success criterion is simple: it must help Rounak prepare better, cover the full syllabus without blind spots, and pass CA Final.

The project should feel like a comfortable daily study environment, not a generic SaaS dashboard. Visual polish matters because the app is intended to be opened and used for long study sessions. However, design work should stabilize early so that later effort goes into content, practice, revision, and AI grounding.

## User Context

- Attempt: CA Final May 2027.
- Both groups are relevant.
- SPOM also needs visibility.
- User recently appeared for CFA Level 2 and studied heavily through AI.
- AFM may move faster because of CFA background, but CA Final-style presentation, formula selection, assumptions, and timed practice still matter.
- The system is being built around the user's actual study workflow first.

## Product Principle

Build like a student preparing for CA Final, not like a SaaS founder avoiding revision.

This means every feature must either:

- Help decide what to study next.
- Improve concept understanding.
- Improve exam-answer quality.
- Track weak areas or mistakes.
- Preserve useful output from actual preparation.
- Reduce hallucination by grounding AI in source/context.

Avoid features that add visual or product complexity without study value.

## Desired First-Pass Product

The first serious build should be a unified CA Final Study OS shell, not a set of disconnected dashboards.

Core screens:

1. Home / Control Room
   - Full CA Final picture.
   - Subject-level and chapter-level coverage.
   - Today's focus.
   - Weak areas and next actions.

2. Subject Library
   - FR, AFM, Audit, DT, IDT, IBS, SPOM.
   - Bigger picture always visible.
   - No testable chapter should disappear.

3. Chapter Workspace
   - Study Guide.
   - Practice.
   - Illustrations / TYK / RTP / MTP / PYQ where available.
   - Mistake Log.
   - Revision Sheet.
   - AI Tutor.

4. AI Tutor Drawer
   - Always accessible.
   - Contextual to the current chapter, section, illustration, or question.
   - Should not behave like a generic chatbot.

5. Weak Areas / Error Log
   - Practical list of things that can cost marks.
   - Linked back to questions, chapters, and next revision actions.

## Existing Assets in This Workspace

- `CA_Final_May_2027_Command_Center/`
  - Existing broad command-center tracker.
  - Includes project context, AI tutor workflow docs, ICAI materials, and extracted text corpus.

- `CA_Final_May_2027_Command_Center/ICAI_Materials/`
  - Source PDFs already present.

- `CA_Final_May_2027_Command_Center/ICAI_Materials_Text/`
  - Extracted text corpus from ICAI PDFs.
  - Should become the source-grounding base for AI.

- `ind_as_109_unit2_dashboard.html`
  - Most polished current chapter dashboard.
  - Strong candidate for visual direction.
  - Includes AI Tutor UI integration.

- `ind_as_115_dashboard.html`
  - Large, content-rich chapter dashboard.
  - Useful for practice-card and chapter-coverage patterns.

- `FR_Revision_AI_App/`
  - Earlier app prototype with dashboard, answer checker, and local server.

- `ai-server/`
  - Multi-provider AI proxy with Groq, Gemini, Mistral, and OpenRouter providers.
  - Should become the single AI backend after cleanup.

- `scripts/convert_pdfs_to_text.py`
  - Existing PDF-to-text pipeline for source extraction.

## AI Direction

The AI layer must be grounded. Generic model answers are risky for CA Final.

Preferred flow:

```text
User asks question
  -> app identifies current context
  -> app retrieves relevant chapter / section / illustration / source extract
  -> AI receives bounded context plus user question
  -> AI answers from context
  -> AI states uncertainty if source context is insufficient
```

Context objects should eventually include:

- Subject.
- Chapter.
- Unit.
- Section.
- Illustration / TYK / RTP / MTP / PYQ id.
- Question text.
- Model answer / dashboard answer.
- Source references.
- Related traps.
- User mistake history where relevant.

Example:

```json
{
  "subject": "FR",
  "chapter": "Ind AS 109",
  "unit": "Classification and Measurement",
  "itemType": "Illustration",
  "itemNo": 23,
  "question": "...",
  "modelAnswer": "...",
  "sourceRefs": [
    {
      "file": "74911bos60524-cp11-u2.txt",
      "page": 42,
      "chunkId": "indas109-u2-illus23"
    }
  ],
  "userQuestion": "Why is this shareholder contribution?"
}
```

AI modes to preserve:

- Explain.
- Quiz me / Socratic.
- Journal logic.
- Exam trap.
- Answer check / examiner mode.

Important technical direction:

- Tutor mode should return natural Markdown/text.
- Examiner/answer-check mode can require structured JSON.
- Do not force JSON response format for all provider calls.

## Source and Commercialization Notes

For personal study, local ICAI material can be used as a private source-grounding corpus.

For commercial use, be careful:

- Do not sell copied ICAI text, examples, or full model answers as-is.
- Do not reproduce paid faculty notes or lecture content.
- Commercial product should use original explanations, original practice questions, source references, and only licensed/allowed excerpts.
- Personal version may be source-heavy; public version should be rights-safe.

This distinction should shape the architecture:

- Private study build can include local source maps.
- Commercial-ready build should separate original content from third-party copyrighted source material.

## Build Strategy

Phase 1 - Unified Environment

- Build one coherent app shell.
- Use Ind AS 109 Unit 2 as the first real chapter loaded into it.
- Keep visual system stable and comfortable.
- Integrate AI Tutor as a shared component.

Phase 2 - Content Schema

- Move chapter content out of monolithic HTML into structured data files.
- Define repeatable chapter package format.

Suggested chapter package:

```text
content/
  subjects/
    fr/
      ind-as-109/
        unit-2/
          meta.json
          study-guide.json
          practice.json
          illustrations.json
          tyk.json
          traps.json
          revision-sheet.json
          source-map.json
```

Phase 3 - Grounded AI Retrieval

- Create source chunks from extracted ICAI text.
- Map dashboard items to source chunks.
- Retrieve relevant context before AI calls.

Phase 4 - Iterative Chapter Build

- Add chapters in the order the user studies them.
- Each chapter should leave behind reusable study content, practice, traps, and revision sheets.

Phase 5 - Productization Later

- Only after the personal system proves useful.
- Add auth, deployment, clean licensing model, public-safe content, customer onboarding, and analytics.

## Clean Code Expectations

Going forward, avoid one-off giant HTML files for the final app.

Target architecture should separate:

- UI components.
- Content data.
- AI services.
- Source retrieval.
- Progress/state.
- Styling/design tokens.

The codebase should be clean enough that a future Vercel/GitHub deployment and small paying-user beta are possible.

## Git / Deployment Notes from 2026-06-07 Check

- Git repo exists locally but has no commits yet.
- Current branch: `master`.
- No remote is configured yet.
- GitHub CLI is installed and authenticated as `rounakjain2604`.
- Auth has repo permissions, so creating a GitHub repo and pushing should be possible when requested.
- Add `.gitignore` before first commit to avoid committing secrets and dependencies.

## Immediate Next Decision

Before coding the full app, decide the first-pass app foundation:

- Use a modern app framework and clean folders.
- Keep current dashboards as source/reference assets.
- Rebuild the unified shell around reusable data and components.

Recommended next implementation target:

Create the first-pass unified CA Final Study OS shell with:

- Home Control Room.
- Subject Library.
- Chapter Workspace.
- AI Tutor drawer.
- Ind AS 109 Unit 2 imported as first live chapter.

