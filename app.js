const patternGrid = document.querySelector("#patternGrid");
const patternTitle = document.querySelector("#patternTitle");
const patternMeta = document.querySelector("#patternMeta");
const patternDetail = document.querySelector("#patternDetail");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderPatterns() {
  patternGrid.innerHTML = DSA_PATTERNS.map((pattern) => `
    <article class="pattern-card ${pattern.complete ? "complete" : ""}">
      <div>
        <p class="status">${pattern.complete ? "Complete page" : "Roadmap item"}</p>
        <h3>${pattern.name}</h3>
        <p class="muted">${pattern.summary}</p>
      </div>
      <button type="button" data-pattern="${pattern.id}">${pattern.complete ? "Open" : "Preview"}</button>
    </article>
  `).join("");

  patternGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-pattern]");
    if (!button) return;
    const selected = DSA_PATTERNS.find((pattern) => pattern.id === button.dataset.pattern);
    renderDetail(selected);
    document.querySelector("#detail").scrollIntoView({ behavior: "smooth" });
  });
}

function renderDetail(pattern) {
  patternTitle.textContent = pattern.name;
  patternMeta.textContent = pattern.complete
    ? "30 curated LeetCode-style problems with Java solutions."
    : "Roadmap page. Full 30-problem solution set can be added next.";

  if (!pattern.complete) {
    patternDetail.innerHTML = `
      <section class="block">
        <h3>1. Sub-patterns</h3>
        <div class="chip-list">${pattern.subpatterns.map((item) => `<span class="chip">${item}</span>`).join("")}</div>
      </section>
      <section class="block">
        <h3>Next Build Target</h3>
        <p class="muted">This pattern is listed for complete roadmap coverage. The populated template below is ready for its 30 Java solutions.</p>
      </section>
    `;
    return;
  }

  const groups = [
    ["12 Core Problems", pattern.problems.filter((p) => p.group === "core")],
    ["8 Advanced / Variation Problems", pattern.problems.filter((p) => p.group === "advanced")],
    ["10 More Practice Problems", pattern.problems.filter((p) => p.group === "practice")]
  ];

  patternDetail.innerHTML = `
    <section class="block">
      <h3>1. List ALL sub-patterns</h3>
      <div class="chip-list">${pattern.subpatterns.map((item) => `<span class="chip">${item}</span>`).join("")}</div>
    </section>
    ${groups.map(([title, problems]) => `
      <section class="block">
        <h3>2. ${title}</h3>
      </section>
      ${problems.map(renderProblem).join("")}
    `).join("")}
    ${renderListBlock("Pattern recognition checklist", pattern.checklist)}
    ${renderListBlock("Common mistakes / traps", pattern.traps)}
    ${renderListBlock("Edge cases to always consider", pattern.edgeCases)}
    ${renderListBlock("Time & space complexity patterns", pattern.complexities)}
    ${renderListBlock("Mental Model", pattern.mentalModel)}
    ${renderListBlock("Revision Strategy", pattern.revisionStrategy)}
    ${renderListBlock("5 random unseen problems", pattern.unseen)}
  `;
}

function renderProblem(problem) {
  return `
    <article class="problem">
      <div class="problem-head">
        <div>
          <h3>${problem.name}</h3>
          <p class="muted">${problem.question}</p>
        </div>
        <span class="badge ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
      </div>
      <div class="problem-grid">
        <p class="mini"><strong>Why this pattern applies</strong>${problem.trigger}</p>
        <p class="mini"><strong>Key intuition</strong>${problem.intuition}</p>
        <p class="mini"><strong>Sub-pattern</strong>${problem.subpattern}</p>
      </div>
      <pre><code>${escapeHtml(problem.code)}</code></pre>
    </article>
  `;
}

function renderListBlock(title, items) {
  return `
    <section class="block">
      <h3>${title}</h3>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;
}

renderPatterns();
renderDetail(DSA_PATTERNS.find((pattern) => pattern.id === "two-pointers"));
