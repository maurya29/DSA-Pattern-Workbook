const params = new URLSearchParams(window.location.search);
const pageId = document.body.dataset.patternId;
const id = pageId || params.get('id') || 'arrays-hashing';
const pattern = typeof CURRENT_PATTERN !== 'undefined' ? CURRENT_PATTERN : DSA_PATTERNS.find((item) => item.id === id);

const patternTitle = document.querySelector('#patternTitle');
const patternHeading = document.querySelector('#patternHeading');
const patternSummary = document.querySelector('#patternSummary');
const patternDetail = document.querySelector('#patternDetail');

document.title = pattern.name + ' | DSA Pattern Workbook';
patternTitle.textContent = pattern.name;
patternHeading.textContent = pattern.name;
patternSummary.textContent = pattern.summary;

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function titleCase(value) {
  return String(value || '')
    .replaceAll('-', ' ')
    .replace(/^./, (char) => char.toUpperCase());
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
    .replace(/\b(import|class|public|private|protected|static|final|void|int|long|double|float|boolean|char|new|return|if|else|for|while|do|switch|case|break|continue|null|true|false|extends|implements|this)\b/g, '<span class="java-keyword">$1</span>')
    .replace(/\b(String|Integer|Long|Double|Float|Boolean|Character|Map|HashMap|Set|HashSet|List|ArrayList|Arrays|PriorityQueue|Queue|Deque|Stack|StringBuilder|Random|Math|Collections|ListNode)\b/g, '<span class="java-type">$1</span>')
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

function renderProblemEdgeCases(problem) {
  if (!problem.edgeCases) return '';
  return `<div class="complexity-grid"><p class="mini"><strong>Edge cases</strong>${problem.edgeCases}</p></div>`;
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

function renderProblem(problem, number) {
  const bruteForceCode = problem.bruteForceCode || problem.code;
  const iterativeCode = problem.iterativeCode || problem.optimizedCode || problem.code;
  const recursiveCode = problem.recursiveCode || problem.code;

  return `
    <article class="problem">
      <div class="problem-head">
        <div>
          <p class="eyebrow">Problem ${number} - ${titleCase(problem.group)}</p>
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
          <pre><code>${highlightJava(bruteForceCode)}</code></pre>
        </div>
        <div class="tab-panel" data-panel="iterative" role="tabpanel" hidden>
          ${renderTabComplexity(problem.optimizedComplexity)}
          <pre><code>${highlightJava(iterativeCode)}</code></pre>
        </div>
        <div class="tab-panel" data-panel="recursive" role="tabpanel" hidden>
          ${renderTabComplexity(problem.recursiveComplexity)}
          <pre><code>${highlightJava(recursiveCode)}</code></pre>
        </div>
      </div>
    </article>
  `;
}

function listBlock(title, items) {
  return `
    <section class="block">
      <h3>${title}</h3>
      <ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>
    </section>
  `;
}

const groups = [
  ['12 Core Problems', pattern.problems.filter((p) => p.group === 'core')],
  ['8 Advanced / Variation Problems', pattern.problems.filter((p) => p.group === 'advanced')],
  ['10 More Practice Problems', pattern.problems.filter((p) => ['practice', 'more', 'more-practice'].includes(p.group))]
];

patternDetail.innerHTML = `
  <section class="block">
    <h3>1. List ALL sub-patterns</h3>
    <div class="chip-list">${pattern.subpatterns.map((item) => `<span class="chip">${item}</span>`).join('')}</div>
  </section>
  <section id="problems" class="block">
    <h3>2. 30 curated problems with Java code</h3>
    <p class="muted">12 core, 8 advanced / variation, and 10 more practice problems. Each problem has Brute Force, Optimized Iterative, and Recursive Java tabs.</p>
  </section>
  ${groups.map(([title, problems]) => `
    <section class="block"><h3>${title}</h3></section>
    ${problems.map((problem, index) => renderProblem(problem, index + 1)).join('')}
  `).join('')}
  ${listBlock('Pattern recognition checklist', pattern.checklist)}
  ${listBlock('Common mistakes / traps', pattern.traps)}
  ${listBlock('Edge cases to always consider', pattern.edgeCases)}
  ${listBlock('Time & space complexity patterns', pattern.complexities)}
  ${listBlock('Mental Model', pattern.mentalModel)}
  ${listBlock('Revision Strategy', pattern.revisionStrategy)}
  ${listBlock('5 random unseen problems', pattern.unseen)}
`;

patternDetail.addEventListener('click', (event) => {
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
