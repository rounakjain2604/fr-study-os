import { subjects, liveChapter, legacyAssets } from './data/catalog.js';

const STORAGE_KEY = 'caFinalStudyOs.v1';

const state = loadState();
let currentView = state.currentView || 'home';
let selectedSubjectId = state.selectedSubjectId || 'fr';
let selectedChapterId = state.selectedChapterId || liveChapter.id;
let activeAiMode = 'explain';
let activeAiContext = null;
let aiHistory = [];

const els = {
  pageTitle: document.querySelector('#pageTitle'),
  pageSubtitle: document.querySelector('#pageSubtitle'),
  viewRoot: document.querySelector('#viewRoot'),
  navButtons: document.querySelectorAll('.nav-btn'),
  resumeBtn: document.querySelector('#resumeBtn'),
  openAiBtn: document.querySelector('#openAiBtn'),
  mobileMenuBtn: document.querySelector('#mobileMenuBtn'),
  sidebar: document.querySelector('#sidebar'),
  globalSearch: document.querySelector('#globalSearch'),
  sidebarOverallPct: document.querySelector('#sidebarOverallPct'),
  sidebarOverallMeter: document.querySelector('#sidebarOverallMeter'),
  sidebarAiStatus: document.querySelector('#sidebarAiStatus'),
  aiDrawer: document.querySelector('#aiDrawer'),
  closeAiBtn: document.querySelector('#closeAiBtn'),
  aiContext: document.querySelector('#aiContext'),
  aiModes: document.querySelector('#aiModes'),
  aiLog: document.querySelector('#aiLog'),
  aiForm: document.querySelector('#aiForm'),
  aiInput: document.querySelector('#aiInput'),
  aiStatus: document.querySelector('#aiStatus'),
  aiSendBtn: document.querySelector('#aiSendBtn'),
};

init();

function init() {
  els.navButtons.forEach(button => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });

  els.resumeBtn.addEventListener('click', () => setView('workspace'));
  els.openAiBtn.addEventListener('click', () => openAiDrawer());
  els.closeAiBtn.addEventListener('click', closeAiDrawer);
  els.mobileMenuBtn.addEventListener('click', () => els.sidebar.classList.toggle('open'));

  els.globalSearch.addEventListener('input', () => render());

  els.aiModes.addEventListener('click', event => {
    const button = event.target.closest('button[data-mode]');
    if (!button) return;
    activeAiMode = button.dataset.mode;
    els.aiModes.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
    if (!els.aiInput.value.trim()) els.aiInput.value = starterForMode(activeAiMode);
  });

  els.aiForm.addEventListener('submit', askAi);

  render();
}

function setView(view) {
  currentView = view;
  state.currentView = view;
  saveState();
  render();
  els.sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  renderChrome();
  if (currentView === 'home') renderHome();
  if (currentView === 'library') renderLibrary();
  if (currentView === 'workspace') renderWorkspace();
}

function renderChrome() {
  els.navButtons.forEach(button => button.classList.toggle('active', button.dataset.view === currentView));

  const avg = Math.round(subjects.reduce((sum, subject) => sum + subject.readiness, 0) / subjects.length);
  els.sidebarOverallPct.textContent = `${avg}%`;
  els.sidebarOverallMeter.style.width = `${avg}%`;
}

function renderHome() {
  els.pageTitle.textContent = 'Control Room';
  els.pageSubtitle.textContent = 'See the entire CA Final battlefield, then move into the next useful study action.';

  const nextChapter = findChapter(selectedChapterId) || findChapter(liveChapter.id);
  els.viewRoot.innerHTML = `
    <section class="hero-panel">
      <div>
        <div class="eyebrow">Current North Star</div>
        <h2>Pass CA Final first. Productize only after the system proves itself.</h2>
        <p>This shell is the first pass of the study room: full syllabus visibility, chapter workspaces, weak areas, and contextual AI.</p>
        <div class="hero-actions">
          <button class="primary-btn" type="button" data-action="resume">Resume ${escapeHtml(nextChapter.title)}</button>
          <button class="ghost-btn" type="button" data-action="library">Open Library</button>
        </div>
      </div>
      <div class="mission-card">
        <span>Live chapter</span>
        <strong>${escapeHtml(liveChapter.title)}</strong>
        <p>${escapeHtml(liveChapter.examPromise)}</p>
      </div>
    </section>

    <section class="metric-grid">
      ${metricCard('Subjects visible', subjects.length, 'FR, AFM, Audit, DT, IDT, IBS, SPOM')}
      ${metricCard('Live chapters', 1, 'Ind AS 109 Unit 2 seeded')}
      ${metricCard('Legacy assets', legacyAssets.length, 'Available as migration references')}
      ${metricCard('AI modes', 5, 'Explain, quiz, journal, trap, answer check')}
    </section>

    <section class="dashboard-grid">
      <article class="panel span-2">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Syllabus Map</span>
            <h3>Subject Readiness</h3>
          </div>
          <button class="ghost-btn small" type="button" data-action="library">See all</button>
        </div>
        <div class="subject-readiness">
          ${subjects.map(subject => `
            <button class="subject-row" type="button" data-subject="${subject.id}">
              <span class="tone-dot ${subject.tone}"></span>
              <strong>${escapeHtml(subject.code)}</strong>
              <em>${escapeHtml(subject.name)}</em>
              <span class="row-meter"><i style="width:${subject.readiness}%"></i></span>
              <b>${subject.readiness}%</b>
            </button>
          `).join('')}
        </div>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Next Actions</span>
            <h3>This Week</h3>
          </div>
        </div>
        <div class="task-list">
          ${taskItem('Stabilize first-pass Study OS shell', 'Build')}
          ${taskItem('Make AI tutor context-aware and reliable', 'AI')}
          ${taskItem('Start full Financial Instruments content migration', 'FR')}
          ${taskItem('Keep design stable after shell approval', 'Rule')}
        </div>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Risk Control</span>
            <h3>No Blind Spots</h3>
          </div>
        </div>
        <p class="soft-copy">Every chapter must eventually land in one of four states: Not started, First pass, Practice active, Exam ready. The app should make missing chapters visible, not hidden.</p>
      </article>

      <article class="panel span-2">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Legacy Workbench</span>
            <h3>Existing Assets to Migrate</h3>
          </div>
        </div>
        <div class="legacy-grid">
          ${legacyAssets.map(asset => legacyCard(asset)).join('')}
        </div>
      </article>
    </section>
  `;

  bindCommonActions();
}

function renderLibrary() {
  els.pageTitle.textContent = 'Subject Library';
  els.pageSubtitle.textContent = 'Keep the full syllabus visible while building chapter workspaces one by one.';

  const query = els.globalSearch.value.trim().toLowerCase();
  const filteredSubjects = subjects.map(subject => ({
    ...subject,
    chapters: subject.chapters.filter(chapter => {
      if (!query) return true;
      return [
        subject.code,
        subject.name,
        chapter.title,
        chapter.subtitle,
        chapter.status,
        ...(chapter.tags || []),
      ].join(' ').toLowerCase().includes(query);
    }),
  })).filter(subject => subject.chapters.length);

  els.viewRoot.innerHTML = `
    <section class="library-layout">
      ${filteredSubjects.map(subject => `
        <article class="subject-panel">
          <div class="subject-panel-head">
            <div>
              <span class="eyebrow">${escapeHtml(subject.group)}</span>
              <h2>${escapeHtml(subject.code)} · ${escapeHtml(subject.name)}</h2>
            </div>
            <div class="readiness-pill">${subject.readiness}% ready</div>
          </div>
          <div class="chapter-grid">
            ${subject.chapters.map(chapter => chapterCard(subject, chapter)).join('')}
          </div>
        </article>
      `).join('')}
    </section>
  `;

  document.querySelectorAll('[data-open-chapter]').forEach(button => {
    button.addEventListener('click', () => {
      selectedSubjectId = button.dataset.subject;
      selectedChapterId = button.dataset.openChapter;
      state.selectedSubjectId = selectedSubjectId;
      state.selectedChapterId = selectedChapterId;
      saveState();
      setView('workspace');
    });
  });
}

function renderWorkspace() {
  els.pageTitle.textContent = 'Chapter Workspace';
  els.pageSubtitle.textContent = 'Study, practice, revise, and ask AI with the selected chapter context.';

  const selected = findChapter(selectedChapterId);
  const isLive = selectedChapterId === liveChapter.id;

  els.viewRoot.innerHTML = `
    <section class="workspace-hero">
      <div>
        <span class="eyebrow">Current Chapter</span>
        <h2>${escapeHtml(selected?.title || liveChapter.title)}</h2>
        <p>${escapeHtml(selected?.subtitle || liveChapter.subtitle)}</p>
        <div class="chip-row">
          ${(selected?.tags || liveChapter.studySections.map(s => s.title)).map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
      <div class="workspace-actions">
        ${selected?.legacyUrl ? `<a class="ghost-link" href="${selected.legacyUrl}" target="_blank" rel="noreferrer">Open legacy dashboard</a>` : ''}
        <button class="primary-btn" type="button" data-ai-general>Ask AI about this chapter</button>
      </div>
    </section>

    ${isLive ? renderLiveChapterWorkspace() : renderPlannedChapterWorkspace(selected)}
  `;

  document.querySelectorAll('[data-ai-context]').forEach(button => {
    button.addEventListener('click', () => {
      const context = contextById(button.dataset.aiContext);
      openAiDrawer(context);
    });
  });

  const generalBtn = document.querySelector('[data-ai-general]');
  if (generalBtn) {
    generalBtn.addEventListener('click', () => {
      openAiDrawer({
        scope: 'chapter',
        subject: 'FR',
        chapter: selected?.title || liveChapter.title,
        title: selected?.title || liveChapter.title,
        summary: selected?.subtitle || liveChapter.subtitle,
        sourceStatus: selected?.sourceStatus || 'Source mapping pending',
      });
    });
  }
}

function renderLiveChapterWorkspace() {
  return `
    <div class="workspace-grid">
      <section class="panel span-2">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Study Guide</span>
            <h3>Seed Blocks</h3>
          </div>
        </div>
        <div class="study-block-list">
          ${liveChapter.studySections.map(section => `
            <article class="study-block">
              <div>
                <span class="block-kicker">${escapeHtml(section.type)} · ${escapeHtml(section.confidence)}</span>
                <h4>${escapeHtml(section.title)}</h4>
                <p>${escapeHtml(section.summary)}</p>
                <ul>${section.coreRules.map(rule => `<li>${escapeHtml(rule)}</li>`).join('')}</ul>
              </div>
              <button class="ai-card-btn" type="button" data-ai-context="${section.id}">Ask AI</button>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Revision Sheet</span>
            <h3>Must Remember</h3>
          </div>
        </div>
        <div class="revision-stack">
          ${liveChapter.revisionCards.map(card => `
            <div class="revision-card">
              <strong>${escapeHtml(card.title)}</strong>
              <p>${escapeHtml(card.body)}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="panel span-2">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Practice</span>
            <h3>Seed Question Cards</h3>
          </div>
        </div>
        <div class="practice-list">
          ${liveChapter.practice.map(item => `
            <article class="practice-card">
              <div class="practice-meta">
                <span>${escapeHtml(item.type)} ${item.number}</span>
                <span>${escapeHtml(item.topic)}</span>
                <span>${escapeHtml(item.difficulty)}</span>
              </div>
              <h4>${escapeHtml(item.title)}</h4>
              <p>${escapeHtml(item.question)}</p>
              <details>
                <summary>Model answer</summary>
                <p>${escapeHtml(item.modelAnswer)}</p>
              </details>
              <div class="card-actions">
                <button class="ai-card-btn" type="button" data-ai-context="${item.id}">Ask AI</button>
                <button class="ghost-btn small" type="button" data-log-mistake="${item.id}">Log weak area</button>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <span class="eyebrow">Source Grounding</span>
            <h3>Retrieval Plan</h3>
          </div>
        </div>
        ${liveChapter.sourceRefs.map(ref => `
          <div class="source-card">
            <strong>${escapeHtml(ref.label)}</strong>
            <p>${escapeHtml(ref.status)}</p>
            <code>${escapeHtml(ref.file)}</code>
          </div>
        `).join('')}
      </section>
    </div>
  `;
}

function renderPlannedChapterWorkspace(chapter) {
  return `
    <section class="panel empty-workspace">
      <span class="eyebrow">Planned Chapter</span>
      <h2>${escapeHtml(chapter?.title || 'Chapter not selected')}</h2>
      <p>This chapter has not yet been migrated into the Study OS. It remains visible so the bigger syllabus picture is not lost.</p>
      ${chapter?.legacyUrl ? `<a class="ghost-link" href="${chapter.legacyUrl}" target="_blank" rel="noreferrer">Open existing asset</a>` : ''}
    </section>
  `;
}

function contextById(id) {
  const section = liveChapter.studySections.find(item => item.id === id);
  if (section) {
    return {
      scope: 'study-section',
      subject: 'FR',
      chapter: liveChapter.title,
      title: section.title,
      summary: section.summary,
      coreRules: section.coreRules,
      traps: section.traps,
      sourceRefs: liveChapter.sourceRefs,
    };
  }

  const practice = liveChapter.practice.find(item => item.id === id);
  if (practice) {
    return {
      scope: 'practice-card',
      subject: 'FR',
      chapter: liveChapter.title,
      title: practice.title,
      itemType: practice.type,
      itemNo: practice.number,
      topic: practice.topic,
      difficulty: practice.difficulty,
      question: practice.question,
      modelAnswer: practice.modelAnswer,
      traps: practice.traps,
      sourceStatus: practice.sourceStatus,
      sourceRefs: liveChapter.sourceRefs,
    };
  }

  return null;
}

function openAiDrawer(context = null) {
  if (context) activeAiContext = context;
  renderAiContext();
  els.aiDrawer.classList.add('open');
  if (!els.aiInput.value.trim()) els.aiInput.value = starterForMode(activeAiMode);
  els.aiInput.focus();
}

function closeAiDrawer() {
  els.aiDrawer.classList.remove('open');
}

function renderAiContext() {
  const context = activeAiContext;
  if (!context) {
    els.aiContext.innerHTML = `
      <div class="ai-context-title">General CA Final context</div>
      <div class="ai-context-meta">No specific section selected</div>
    `;
    return;
  }

  els.aiContext.innerHTML = `
    <div class="ai-context-title">${escapeHtml(context.title || context.chapter || 'Selected context')}</div>
    <div class="ai-context-meta">${escapeHtml([context.subject, context.chapter, context.scope, context.topic].filter(Boolean).join(' · '))}</div>
  `;
}

async function askAi(event) {
  event.preventDefault();
  const userQuestion = els.aiInput.value.trim();
  if (!userQuestion) {
    setAiStatus('Type a question first.');
    return;
  }

  appendAiMessage('user', userQuestion);
  aiHistory.push({ role: 'user', content: userQuestion });
  els.aiInput.value = '';
  els.aiSendBtn.disabled = true;
  setAiStatus('Thinking...');

  try {
    const response = await fetch(resolveAiEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: activeAiMode,
        userQuestion,
        context: activeAiContext,
        history: aiHistory.slice(-8),
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('AI endpoint unavailable. Start ai-server and open this app through port 3721.');
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'AI request failed.');

    const answer = data.answer || 'No answer returned.';
    appendAiMessage('assistant', answer);
    aiHistory.push({ role: 'assistant', content: answer });
    const provider = data.provider ? ` via ${data.provider}` : '';
    const latency = data.latencyMs ? ` · ${data.latencyMs}ms` : '';
    setAiStatus(`Answered by ${data.model || 'AI'}${provider}${latency}`);
  } catch (error) {
    appendAiMessage('system', error.message || 'AI tutor unavailable.');
    setAiStatus('Run: cd ai-server && npm start');
  } finally {
    els.aiSendBtn.disabled = false;
  }
}

function resolveAiEndpoint() {
  const isLocalHost = ['127.0.0.1', 'localhost', ''].includes(window.location.hostname);
  if (window.location.protocol === 'file:' || (isLocalHost && window.location.port !== '3721')) {
    return 'http://127.0.0.1:3721/api/ai-tutor';
  }
  return '/api/ai-tutor';
}

function setAiStatus(text) {
  els.aiStatus.textContent = text;
  els.sidebarAiStatus.textContent = text;
}

function appendAiMessage(role, text) {
  const message = document.createElement('div');
  message.className = `ai-message ${role}`;
  message.innerHTML = parseMarkdown(String(text || ''));
  els.aiLog.appendChild(message);
  els.aiLog.scrollTop = els.aiLog.scrollHeight;
}

function starterForMode(mode) {
  return {
    explain: 'Explain this in simple CA Final exam language using the selected context.',
    socratic: 'Ask me 3 guided questions before showing the answer.',
    journal: 'Explain the journal entry logic and why each account is debited or credited.',
    exam: 'What is the exam trap here and how do I avoid it?',
    answer_check: 'Check my answer against the model answer and tell me missing points.',
  }[mode] || 'Explain this using the selected context.';
}

function bindCommonActions() {
  document.querySelectorAll('[data-action="resume"]').forEach(button => button.addEventListener('click', () => setView('workspace')));
  document.querySelectorAll('[data-action="library"]').forEach(button => button.addEventListener('click', () => setView('library')));
  document.querySelectorAll('[data-subject]').forEach(button => {
    button.addEventListener('click', () => {
      selectedSubjectId = button.dataset.subject;
      state.selectedSubjectId = selectedSubjectId;
      saveState();
      setView('library');
    });
  });
}

function findChapter(chapterId) {
  for (const subject of subjects) {
    const chapter = subject.chapters.find(item => item.id === chapterId);
    if (chapter) return chapter;
  }
  return null;
}

function metricCard(label, value, note) {
  return `
    <article class="metric-card">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(note)}</p>
    </article>
  `;
}

function taskItem(title, tag) {
  return `
    <div class="task-item">
      <span>${escapeHtml(tag)}</span>
      <strong>${escapeHtml(title)}</strong>
    </div>
  `;
}

function legacyCard(asset) {
  return `
    <a class="legacy-card" href="${asset.href}" target="_blank" rel="noreferrer">
      <span>${escapeHtml(asset.type)}</span>
      <strong>${escapeHtml(asset.title)}</strong>
      <p>${escapeHtml(asset.note)}</p>
    </a>
  `;
}

function chapterCard(subject, chapter) {
  return `
    <article class="chapter-card">
      <div>
        <span class="chapter-status">${escapeHtml(chapter.status)}</span>
        <h3>${escapeHtml(chapter.title)}</h3>
        <p>${escapeHtml(chapter.subtitle)}</p>
      </div>
      <div class="chip-row">
        ${(chapter.tags || []).slice(0, 4).map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
      </div>
      <div class="chapter-footer">
        <span class="row-meter"><i style="width:${chapter.readiness}%"></i></span>
        <b>${chapter.readiness}%</b>
        <button class="ghost-btn small" type="button" data-subject="${subject.id}" data-open-chapter="${chapter.id}">Open</button>
      </div>
    </article>
  `;
}

function parseMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\n{2,}/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  return `<p>${html}</p>`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
