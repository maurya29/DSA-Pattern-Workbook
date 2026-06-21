function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function readableTopicName(value) {
  return String(value || 'DSA')
    .replaceAll('-', ' ')
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

async function initRevisionSolutions() {
if (window.REVISION_SOLUTION_READY) {
  try {
    await window.REVISION_SOLUTION_READY;
  } catch (error) {
    console.error('Unable to load remaining revision topics', error);
  }
}

const revisionParams = new URLSearchParams(window.location.search);
const revisionTopicId = document.body.dataset.topicId || revisionParams.get('topic') || 'arrays';
const revisionTopic = REVISION_SOLUTION_TOPICS[revisionTopicId];

const revisionTitle = document.querySelector('#revisionSolutionTitle');
const revisionHeading = document.querySelector('#revisionSolutionHeading');
const revisionSummary = document.querySelector('#revisionSolutionSummary');
const revisionDetail = document.querySelector('#revisionSolutionDetail');

if (!revisionTopic) {
  const topicName = `${readableTopicName(revisionTopicId)} Revision`;
  document.title = topicName + ' | DSA Pattern Workbook';
  revisionTitle.textContent = topicName;
  revisionHeading.textContent = topicName;
  revisionSummary.textContent = 'This topic data was not found. Check the topic link or redeploy the latest static data files.';
  revisionDetail.innerHTML = `
    <article class="problem">
      <div class="problem-head">
        <div>
          <p class="eyebrow">Topic data unavailable</p>
          <h3>No solutions loaded for ${escapeHtml(revisionTopicId)}</h3>
          <p class="muted">The page refused to show another topic as a fallback, so wrong Arrays content cannot appear here.</p>
        </div>
      </div>
    </article>
  `;
  return;
}

document.title = revisionTopic.name + ' | DSA Pattern Workbook';
revisionTitle.textContent = revisionTopic.name;
revisionHeading.textContent = revisionTopic.name;
revisionSummary.textContent = revisionTopic.summary;

function titleCase(value) {
  return String(value || '')
    .replaceAll('-', ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatJava(code) {
  const source = String(code || '').trim();
  if (source.includes('\n')) return source;

  let formatted = source
    .replace(/\s+/g, ' ')
    .replace(/\s*{\s*/g, ' {\n')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/\s*;\s*/g, ';\n')
    .replace(/\s*(else)\s*/g, ' else ')
    .replace(/\s*(for|while|if)\s*\(/g, '\n$1 (')
    .replace(/\)\s*(?=(for|while|if)\s*\()/g, ')\n')
    .replace(/\n{2,}/g, '\n');

  const lines = formatted.split('\n').map((line) => line.trim()).filter(Boolean);
  let depth = 0;
  return lines.map((line) => {
    if (line.startsWith('}')) depth = Math.max(0, depth - 1);
    const indented = `${'  '.repeat(depth)}${line}`;
    if (line.endsWith('{')) depth++;
    return indented;
  }).join('\n');
}

function highlightJava(code) {
  const escaped = escapeHtml(formatJava(code));
  const tokens = [];
  let marked = escaped.replace(/(&quot;.*?&quot;|'.*?'|\/\/.*?$|\/\*[\s\S]*?\*\/)/gm, (match) => {
    const index = tokens.push(match) - 1;
    return `@@TOKEN_${index}@@`;
  });

  marked = marked
    .replace(/\b(import|class|public|private|protected|static|final|void|int|long|double|float|boolean|char|new|return|if|else|for|while|do|switch|case|break|continue|null|true|false|extends|implements|this|throw)\b/g, '<span class="java-keyword">$1</span>')
    .replace(/\b(String|Integer|Long|Double|Float|Boolean|Character|Map|HashMap|Set|HashSet|List|ArrayList|Arrays|PriorityQueue|Queue|Deque|Stack|StringBuilder|Random|Math|Collections|ListNode|IllegalArgumentException)\b/g, '<span class="java-type">$1</span>')
    .replace(/\b\d+\b/g, '<span class="java-number">$&</span>')
    .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="java-method">$1</span>');

  return marked.replace(/@@TOKEN_(\d+)@@/g, (_, index) => {
    const token = tokens[Number(index)];
    if (token.startsWith('//') || token.startsWith('/*')) return `<span class="java-comment">${token}</span>`;
    return `<span class="java-string">${token}</span>`;
  });
}

function renderTabComplexity(value) {
  if (!value) return '';
  return `<div class="tab-complexity"><strong>Time & Space:</strong> ${value}</div>`;
}

function renderExamples(problem) {
  if (!problem.examples || problem.examples.length === 0) return '';
  return `
    <div class="examples-block">
      <strong>Examples</strong>
      ${problem.examples.map((example) => `
        <pre><code>Input: ${escapeHtml(example.input)}
Output: ${escapeHtml(example.output)}${example.explanation ? `
Explanation: ${escapeHtml(example.explanation)}` : ''}</code></pre>
      `).join('')}
    </div>
  `;
}

function renderProblemFacts(problem) {
  if (!problem.constraints && !problem.source) return '';
  return `
    <div class="facts-grid">
      ${problem.constraints ? `<p class="mini"><strong>Constraints</strong>${problem.constraints}</p>` : ''}
      ${problem.source ? `<p class="mini"><strong>Reference</strong><a href="${problem.source.url}" target="_blank" rel="noreferrer">${problem.source.label}</a></p>` : ''}
    </div>
  `;
}

function renderProblemEdgeCases(problem) {
  if (!problem.edgeCases) return '';
  return `<div class="complexity-grid"><p class="mini"><strong>Edge cases</strong>${problem.edgeCases}</p></div>`;
}

function renderProblem(problem, number) {
  return `
    <article class="problem" id="problem-${slugify(problem.name)}">
      <div class="problem-head">
        <div>
          <p class="eyebrow">Topic ${revisionTopic.name.replace(' Revision', '')} - Problem ${number} - ${titleCase(problem.group)}</p>
          <h3>${problem.name}</h3>
          <p class="muted">${problem.question}</p>
        </div>
        <span class="badge ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
      </div>
      ${renderExamples(problem)}
      ${renderProblemFacts(problem)}
      <div class="problem-grid">
        <p class="mini"><strong>Why this pattern applies</strong>${problem.trigger}</p>
        <p class="mini"><strong>Key intuition</strong>${problem.intuition}</p>
        <p class="mini"><strong>Sub-pattern</strong>${problem.subpattern}</p>
      </div>
      ${renderProblemEdgeCases(problem)}
      <div class="code-tabs" data-tabs>
        <div class="tab-list" role="tablist" aria-label="Java solution type">
          <button class="tab-button active" type="button" role="tab" aria-selected="true" data-tab="brute">Brute Force</button>
          <button class="tab-button" type="button" role="tab" aria-selected="false" data-tab="iterative">Optimized Iterative</button>
          <button class="tab-button" type="button" role="tab" aria-selected="false" data-tab="recursive">Recursive</button>
        </div>
        <div class="tab-panel active" data-panel="brute" role="tabpanel">
          ${renderTabComplexity(problem.bruteForceComplexity)}
          <pre><code>${highlightJava(problem.bruteForceCode)}</code></pre>
        </div>
        <div class="tab-panel" data-panel="iterative" role="tabpanel" hidden>
          ${renderTabComplexity(problem.optimizedComplexity)}
          <pre><code>${highlightJava(problem.iterativeCode)}</code></pre>
        </div>
        <div class="tab-panel" data-panel="recursive" role="tabpanel" hidden>
          ${renderTabComplexity(problem.recursiveComplexity)}
          <pre><code>${highlightJava(problem.recursiveCode)}</code></pre>
        </div>
      </div>
    </article>
  `;
}

function listBlock(title, items) {
  if (!items || items.length === 0) return '';
  return `
    <section class="block">
      <h3>${title}</h3>
      <ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>
    </section>
  `;
}

revisionDetail.innerHTML = `
  <section class="block">
    <h3>Questions</h3>
    <div class="revision-toc">
      ${revisionTopic.problems.map((problem) => `<a href="#problem-${slugify(problem.name)}">${problem.name}</a>`).join('')}
    </div>
  </section>
  ${revisionTopic.problems.map((problem, index) => renderProblem(problem, index + 1)).join('')}
  ${listBlock('Pattern recognition checklist', revisionTopic.checklist)}
  ${listBlock('Common mistakes / traps', revisionTopic.mistakes)}
  ${listBlock('Edge cases to always consider', revisionTopic.edgeCases)}
  ${listBlock('Time & space complexity patterns', revisionTopic.complexities)}
  ${listBlock('Mental Model', revisionTopic.mentalModel)}
  ${listBlock('Revision Strategy', revisionTopic.revisionStrategy)}
`;

revisionDetail.addEventListener('click', (event) => {
  const button = event.target.closest('.tab-button');
  if (!button) return;

  const tabs = button.closest('[data-tabs]');
  const selected = button.dataset.tab;

  tabs.querySelectorAll('.tab-button').forEach((tab) => {
    const isActive = tab.dataset.tab === selected;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  tabs.querySelectorAll('.tab-panel').forEach((panel) => {
    const isActive = panel.dataset.panel === selected;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
});

requestAnimationFrame(() => {
  if (!window.location.hash) return;
  document.querySelector(window.location.hash)?.scrollIntoView();
});
}

initRevisionSolutions();
