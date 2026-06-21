(function () {
  const topicIndex = document.querySelector('#coreTopicIndex');
  const content = document.querySelector('#coreContent');
  const stats = document.querySelector('#coreStats');

  if (!topicIndex || !content || !stats) {
    return;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function highlightJava(code) {
    const escaped = escapeHtml(code);
    const tokens = [];
    let marked = escaped.replace(/(&quot;.*?&quot;|'.*?'|\/\/.*?$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const index = tokens.push(match) - 1;
      return `@@TOKEN_${index}@@`;
    });

    marked = marked
      .replace(/\b(import|package|class|interface|enum|record|sealed|permits|non-sealed|private|protected|public|static|final|abstract|default|void|int|long|double|float|byte|short|char|boolean|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|extends|implements|this|super|instanceof|var|yield|true|false|null)\b/g, '<span class="java-keyword">$1</span>')
      .replace(/\b(String|StringBuilder|StringBuffer|Object|Integer|Long|Double|BigDecimal|List|ArrayList|Map|HashMap|Set|HashSet|LinkedHashSet|Collections|Comparator|Iterator|Thread|Runnable|Callable|Future|ExecutorService|Optional|Stream|System|Class|Exception|RuntimeException|NoSuchElementException|AutoCloseable|InvalidClassException|Cloneable|Serializable|BigDecimal|Math|Database)\b/g, '<span class="java-type">$1</span>')
      .replace(/\b\d+(?:_\d+)*\b/g, '<span class="java-number">$&</span>')
      .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="java-method">$1</span>');

    return marked.replace(/@@TOKEN_(\d+)@@/g, (_, index) => {
      const token = tokens[Number(index)];
      if (token.startsWith('//') || token.startsWith('/*')) {
        return `<span class="java-comment">${token}</span>`;
      }
      return `<span class="java-string">${token}</span>`;
    });
  }

  function questionId(topic, question, index) {
    return `${topic.id}-${index + 1}-${slugify(question.name)}`;
  }

  function renderList(title, items, className) {
    return `
      <div class="${className}">
        <strong>${title}</strong>
        <ul>
          ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  function renderQuestion(topic, question, index) {
    return `
      <article class="problem core-question" id="${questionId(topic, question, index)}">
        <div class="problem-head">
          <div>
            <p class="eyebrow">${escapeHtml(topic.title)} - Question ${index + 1}</p>
            <h3>${escapeHtml(question.name)}</h3>
            <p class="muted">${escapeHtml(question.question)}</p>
          </div>
          <span class="badge ${question.difficulty.toLowerCase()}">${escapeHtml(question.difficulty)}</span>
        </div>
        <div class="core-answer-grid">
          ${renderList('Expected answer', question.answer, 'core-answer')}
          ${renderList('Interview traps', question.traps, 'core-traps')}
        </div>
        ${question.code ? `
          <div class="code-tabs core-code">
            <div class="tab-list" role="presentation">
              <span class="tab-button active">Code / Output Trap</span>
            </div>
            <div class="tab-panel active">
              <pre><code>${highlightJava(question.code)}</code></pre>
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }

  function renderTopic(topic, topicNumber) {
    return `
      <section class="section core-topic-section" id="${topic.id}">
        <div class="section-head">
          <div>
            <p class="eyebrow">Core Java Topic ${topicNumber}</p>
            <h2>${escapeHtml(topic.title)}</h2>
            <p>${escapeHtml(topic.summary)}</p>
          </div>
          <span class="open-link">${topic.questions.length} questions</span>
        </div>
        <div class="topic-links core-question-links">
          ${topic.questions.map((question, index) => `
            <a href="#${questionId(topic, question, index)}">${index + 1}. ${escapeHtml(question.name)}</a>
          `).join('')}
        </div>
        <div class="core-question-list">
          ${topic.questions.map((question, index) => renderQuestion(topic, question, index)).join('')}
        </div>
      </section>
    `;
  }

  const totalQuestions = CORE_JAVA_TOPICS.reduce((sum, topic) => sum + topic.questions.length, 0);

  stats.innerHTML = `
    <span>${CORE_JAVA_TOPICS.length} subtopics</span>
    <span>${totalQuestions} expert questions</span>
    <span>Interview traps and output prediction</span>
  `;

  topicIndex.innerHTML = CORE_JAVA_TOPICS.map((topic, index) => `
    <a href="#${topic.id}">
      <strong>${index + 1}. ${escapeHtml(topic.title)}</strong>
      <span>${topic.questions.length} questions</span>
    </a>
  `).join('');

  content.innerHTML = CORE_JAVA_TOPICS.map((topic, index) => renderTopic(topic, index + 1)).join('');
})();
