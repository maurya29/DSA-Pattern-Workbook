(function () {
  const topicIndex = document.querySelector('#lambdaTopicIndex');
  const content = document.querySelector('#lambdaContent');
  const supportCode = document.querySelector('#lambdaSupportCode');
  const stats = document.querySelector('#lambdaStats');

  if (!topicIndex || !content || !supportCode || !stats) {
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
      .replace(/\b(import|class|interface|private|public|static|final|void|int|long|double|boolean|new|return|if|else|for|while|true|false|null|this|throw)\b/g, '<span class="java-keyword">$1</span>')
      .replace(/\b(String|Integer|Long|Double|Boolean|List|ArrayList|Map|HashMap|LinkedHashMap|Set|HashSet|LinkedHashSet|Optional|Stream|Collectors|Comparator|Function|Predicate|Consumer|Supplier|SecureRandom|UUID|Arrays|Collection|Collections|NoSuchElementException|DoubleSummaryStatistics|IntStream|Employee|Product|User|Student)\b/g, '<span class="java-type">$1</span>')
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

  function problemId(topic, problem, index) {
    return `${topic.id}-${index + 1}-${slugify(problem.name)}`;
  }

  function renderProblem(topic, problem, index) {
    return `
      <article class="problem lambda-problem" id="${problemId(topic, problem, index)}">
        <div class="problem-head">
          <div>
            <p class="eyebrow">${topic.title} - Problem ${index + 1}</p>
            <h3>${escapeHtml(problem.name)}</h3>
            <p class="muted">${escapeHtml(problem.question)}</p>
          </div>
          <span class="badge ${problem.difficulty.toLowerCase()}">${escapeHtml(problem.difficulty)}</span>
        </div>
        <div class="problem-grid">
          <p class="mini"><strong>Trigger point</strong>${escapeHtml(problem.trigger)}</p>
          <p class="mini"><strong>Complexity</strong>${escapeHtml(problem.complexity)}</p>
        </div>
        <div class="code-tabs lambda-code">
          <div class="tab-list" role="presentation">
            <span class="tab-button active">Java 8 Solution</span>
          </div>
          <div class="tab-panel active">
            <pre><code>${highlightJava(problem.code)}</code></pre>
          </div>
        </div>
      </article>
    `;
  }

  function renderTopic(topic, topicNumber) {
    return `
      <section class="section lambda-topic-section" id="${topic.id}">
        <div class="section-head">
          <div>
            <p class="eyebrow">Topic ${topicNumber}</p>
            <h2>${escapeHtml(topic.title)}</h2>
            <p>${escapeHtml(topic.summary)}</p>
          </div>
          <span class="open-link">${topic.problems.length} questions</span>
        </div>
        <div class="topic-links lambda-problem-links">
          ${topic.problems.map((problem, index) => `
            <a href="#${problemId(topic, problem, index)}">${index + 1}. ${escapeHtml(problem.name)}</a>
          `).join('')}
        </div>
        <div class="lambda-problem-list">
          ${topic.problems.map((problem, index) => renderProblem(topic, problem, index)).join('')}
        </div>
      </section>
    `;
  }

  const totalProblems = JAVA_LAMBDA_STREAM_TOPICS.reduce((sum, topic) => sum + topic.problems.length, 0);

  stats.innerHTML = `
    <span>${JAVA_LAMBDA_STREAM_TOPICS.length} topics</span>
    <span>${totalProblems} solved questions</span>
    <span>Java 8 lambda and stream focus</span>
  `;

  topicIndex.innerHTML = JAVA_LAMBDA_STREAM_TOPICS.map((topic, index) => `
    <a href="#${topic.id}">
      <strong>${index + 1}. ${escapeHtml(topic.title)}</strong>
      <span>${topic.problems.length} questions</span>
    </a>
  `).join('');

  supportCode.innerHTML = highlightJava(JAVA_LAMBDA_STREAMS_SUPPORT_CODE);
  content.innerHTML = JAVA_LAMBDA_STREAM_TOPICS.map((topic, index) => renderTopic(topic, index + 1)).join('');
})();
