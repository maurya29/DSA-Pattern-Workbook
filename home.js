const patternGrid = document.querySelector('#patternGrid');

patternGrid.innerHTML = DSA_PATTERNS.map((pattern, index) => `
  <a class="pattern-card complete" href="pages/${pattern.id}.html">
    <div>
      <p class="status">30 Java problems</p>
      <h3>${index + 1}. ${pattern.name}</h3>
      <p class="muted">${pattern.summary}</p>
    </div>
    <span class="open-link">Open pattern page</span>
  </a>
`).join('');
