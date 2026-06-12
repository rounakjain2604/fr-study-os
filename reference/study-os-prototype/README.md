# CA Final Study OS

First-pass unified app shell for the CA Final May 2027 study control room.

## Run locally with AI enabled

Start the shared AI server:

```powershell
cd ai-server
npm start
```

Then open:

```text
http://127.0.0.1:3721/apps/study-os/
```

The app calls `/api/ai-tutor` on the same origin. If opened directly as a file, it falls back to `http://127.0.0.1:3721/api/ai-tutor`.

## Current Scope

- Home / Control Room.
- Subject Library.
- Chapter Workspace.
- Contextual AI Tutor drawer.
- Seed chapter: FR - Financial Instruments - Ind AS 109 Unit 2.
- Legacy dashboard links for existing work.

Full Financial Instruments content migration will happen after the app shell stabilizes.

