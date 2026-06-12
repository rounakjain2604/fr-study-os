// ai-server/prompts.mjs
// System prompts and user prompt builders for all AI modes.

export const SYSTEM_PROMPT = `You are a strict, expert CA Final Financial Reporting evaluator.

ROLE:
- Evaluate student answers against the provided ICAI/model answer and selected dashboard context.
- Never hallucinate or invent facts outside the supplied context or established Ind AS principles.
- If source context is insufficient, say so explicitly.

EVALUATION RULES:
1. Award marks only for points that are factually correct and supported by the model/source context.
2. Partial marks are valid; state exactly which sub-points were covered.
3. A partially correct answer must be called "partially correct", not "incorrect".
4. Flag conceptual errors explicitly.
5. Missing points must be listed individually.
6. Reference the specific Ind AS rule, dashboard conclusion, or source note where possible.

RESPONSE FORMAT:
You MUST respond with valid JSON only. No markdown, no code fences, no explanatory text outside the JSON.
Use the exact schema provided in the user prompt.`;

function cleanText(val, maxLen = 8000) {
  return String(val || '').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

function contextTopic(p) {
  return cleanText(p.topic || p.context?.chapter || p.context?.title || 'CA Final Financial Reporting');
}

export function buildUserPrompt(payload) {
  const mode = payload.mode || 'answer_check';

  switch (mode) {
    case 'answer_check':
      return buildAnswerCheckPrompt(payload);
    case 'explain':
      return buildExplainPrompt(payload);
    case 'summarise':
      return buildSummarisePrompt(payload);
    case 'memory_hook':
      return buildMemoryHookPrompt(payload);
    case 'classify_case':
      return buildClassifyCasePrompt(payload);
    default:
      return buildAnswerCheckPrompt(payload);
  }
}

function buildAnswerCheckPrompt(p) {
  const topic = contextTopic(p);
  const marks = p.marks ?? 'Not specified';
  const difficulty = p.difficulty || p.context?.difficulty || 'Not specified';
  const question = cleanText(p.question || p.context?.question);
  const modelAnswer = cleanText(p.modelAnswer || p.context?.modelAnswer || p.context?.solution);
  const studentAnswer = cleanText(p.studentAnswer || p.userQuestion);

  return `MODE: answer_check
TOPIC: ${topic}
MARKS: ${marks}
DIFFICULTY: ${difficulty}

QUESTION:
${question}

MODEL / ICAI ANSWER:
${modelAnswer}

STUDENT ANSWER:
${studentAnswer}

Respond with this exact JSON schema:
{
  "marksAwarded": <number or null>,
  "maxMarks": <number or null>,
  "missingPoints": ["point 1", "point 2"],
  "incorrectPoints": ["error 1"],
  "conceptualFeedback": "2-4 sentence evaluation of understanding",
  "improvedAnswer": "A concise model-quality answer the student should memorise",
  "memoryHook": "A one-line mnemonic or memory trick for the core rule",
  "examTrap": "One common exam trap related to this question"
}`;
}

function buildExplainPrompt(p) {
  const topic = contextTopic(p);
  const question = cleanText(p.question || p.context?.question || p.userQuestion);
  const modelAnswer = cleanText(p.modelAnswer || p.context?.modelAnswer || p.context?.summary || 'Not provided');

  return `MODE: explain
TOPIC: ${topic}

QUESTION:
${question}

MODEL / DASHBOARD CONTEXT:
${modelAnswer}

Explain this concept step by step in simple CA Final exam language.
Respond with this exact JSON schema:
{
  "explanation": "Step-by-step explanation in clear exam language",
  "keyRule": "The single most important Ind AS / FR rule here",
  "journalEntry": "Relevant journal entry if applicable, else null",
  "memoryHook": "A one-line mnemonic or memory trick",
  "examTrap": "One common exam trap related to this topic"
}`;
}

function buildSummarisePrompt(p) {
  const topic = contextTopic(p);
  const content = cleanText(p.question || p.modelAnswer || p.context?.summary || p.userQuestion);

  return `MODE: summarise
TOPIC: ${topic}

CONTENT TO SUMMARISE:
${content}

Create a concise revision summary.
Respond with this exact JSON schema:
{
  "summary": "3-5 bullet point summary",
  "keyRules": ["rule 1", "rule 2"],
  "examTrap": "One exam trap to watch for",
  "memoryHook": "One-line mnemonic"
}`;
}

function buildMemoryHookPrompt(p) {
  const topic = contextTopic(p);
  const concept = cleanText(p.question || p.modelAnswer || p.context?.summary || p.userQuestion);

  return `MODE: memory_hook
TOPIC: ${topic}

CONCEPT:
${concept}

Create memorable study hooks for this concept.
Respond with this exact JSON schema:
{
  "memoryHook": "Primary mnemonic or memory trick",
  "alternativeHooks": ["hook 2", "hook 3"],
  "visualisation": "A mental image to remember the rule",
  "examTrap": "The trap this hook helps avoid"
}`;
}

function buildClassifyCasePrompt(p) {
  const topic = contextTopic(p);
  const scenario = cleanText(p.question || p.context?.question || p.userQuestion);

  return `MODE: classify_case
TOPIC: ${topic}

CASE / SCENARIO:
${scenario}

Classify this FR scenario using the relevant Ind AS framework.
Respond with this exact JSON schema:
{
  "classification": "Relevant classification / treatment",
  "reasoning": "Step-by-step classification logic",
  "sppiResult": "Pass / Fail / Not applicable",
  "businessModel": "Hold to Collect / Hold to Collect and Sell / Trading / Not applicable",
  "journalEntry": "Relevant journal entry if applicable, else null",
  "examTrap": "Common exam trap for this classification"
}`;
}

export function buildTutorPrompt({ mode, userQuestion, context, history }) {
  const modeInstructions = {
    explain: 'Explain step by step in simple CA Final exam language. Start with the principle, then apply it to the facts, then state the answer.',
    socratic: 'Teach Socratically. Ask 3 short guided questions first, then give a compact answer key after the questions.',
    journal: 'Focus on journal entry logic. Explain why each account is debited or credited and how measurement affects the entry.',
    exam: 'Focus on exam traps, common mistakes, and a concise rule-memory hook.',
    answer_check: 'Evaluate the student answer against the model answer. Award partial marks where deserved. List missing and incorrect points.',
  };

  let contextBlock;
  if (context) {
    contextBlock = `
Selected study context:
Subject: ${cleanText(context.subject)}
Chapter: ${cleanText(context.chapter)}
Unit: ${cleanText(context.unit)}
Section: ${cleanText(context.section)}
Title: ${cleanText(context.title)}
Topic: ${cleanText(context.topic)}
Selected text (the exact passage the student highlighted): ${cleanText(context.selection, 1200)}
Difficulty: ${cleanText(context.difficulty)}
Question: ${cleanText(context.question)}
Model answer / dashboard solution: ${cleanText(context.modelAnswer || context.solution)}
Summary: ${cleanText(context.summary)}
Key rules: ${cleanText(Array.isArray(context.keyRules) ? context.keyRules.join('; ') : context.keyRules)}
Traps: ${cleanText(Array.isArray(context.traps) ? context.traps.join('; ') : context.traps)}
Source reference: ${cleanText(context.sourceFile || context.sourceRef || context.source)}`;
  } else {
    contextBlock = 'Selected study context: None. Answer cautiously from CA Final FR principles only.';
  }

  const historyBlock = Array.isArray(history)
    ? history.slice(-6).map((item) => `${item.role}: ${cleanText(item.content, 1200)}`).join('\n')
    : '';

  return `Mode: ${mode || 'explain'}
Mode instruction: ${modeInstructions[mode] || modeInstructions.explain}

${contextBlock}

Recent tutor exchange:
${historyBlock || 'None'}

Student question:
${cleanText(userQuestion)}`;
}

export const TUTOR_SYSTEM_PROMPT = `You are an expert CA Final Financial Reporting tutor.
Use the selected chapter, dashboard, question, model answer, source note, and trap context when provided.
Do not invent ICAI facts outside the provided context; if a question needs confirmation from current ICAI material, say so.
When explaining a solution, preserve the dashboard's conclusion unless the student explicitly asks you to critique it.

FORMAT — your answer is rendered as Markdown in a study app, so:
- Keep it tight: answer the question first, then supporting reasoning. No long preambles.
- Use short bold lead-ins or ### headings only when the answer has multiple parts.
- Use bullet or numbered lists for steps and conditions; use Markdown tables for computations and journal entries.
- Bold the final figure or conclusion.
- Do not wrap the whole answer in a code block.`;
