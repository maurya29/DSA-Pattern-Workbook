const patternGrid = document.querySelector('#patternGrid');
const topicGrid = document.querySelector('#topicGrid');

const DSA_TOPICS = [
  {
    name: 'Arrays, Strings & Prefix Techniques',
    summary: 'Core linear data handling, hashing, substring windows, and range transforms.',
    links: ['arrays-hashing', 'two-pointers', 'sliding-window', 'prefix-sum', 'strings']
  },
  {
    name: 'Linked Lists, Stacks & Queues',
    summary: 'Pointer manipulation, monotonic structures, BFS queues, and deque patterns.',
    links: ['linked-list', 'stack', 'queue-deque']
  },
  {
    name: 'Searching, Sorting & Heaps',
    summary: 'Binary search, ordering, partitioning, top-k, scheduling, and priority queues.',
    links: ['binary-search', 'sorting', 'heap']
  },
  {
    name: 'Recursion & Backtracking',
    summary: 'Base cases, branching decisions, permutations, combinations, and constraint search.',
    links: ['recursion', 'backtracking']
  },
  {
    name: 'Trees, BST & Trie',
    summary: 'Tree traversal, ordered trees, prefix dictionaries, and word search structures.',
    links: ['trees', 'bst', 'tries']
  },
  {
    name: 'Graphs & Connectivity',
    summary: 'Traversal, components, shortest paths, topological order, union find, and advanced graph algorithms.',
    links: ['graphs', 'union-find', 'advanced-graphs']
  },
  {
    name: 'Dynamic Programming',
    summary: 'Linear recurrence, grid states, subsequences, intervals, and knapsack-style decisions.',
    links: ['dp-1d', 'dp-2d']
  },
  {
    name: 'Greedy, Intervals & Scheduling',
    summary: 'Local choice proofs, interval merging, sweep lines, meetings, and timeline decisions.',
    links: ['greedy', 'intervals', 'heap']
  },
  {
    name: 'Advanced Data Structures',
    summary: 'Fenwick trees, segment trees, design problems, bit masks, and stateful APIs.',
    links: ['segment-tree', 'design', 'bit-manipulation']
  },
  {
    name: 'Math, Matrix & Geometry',
    summary: 'Number theory, grid simulation, matrix traversal, coordinates, and geometric checks.',
    links: ['math', 'matrix', 'geometry']
  },
  {
    name: 'Systems-style DSA',
    summary: 'Concurrency, locks, ordering, producer-consumer queues, and thread-safe designs.',
    links: ['concurrency']
  }
];

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

const patternsById = new Map(DSA_PATTERNS.map((pattern) => [pattern.id, pattern]));

topicGrid.innerHTML = DSA_TOPICS.map((topic, index) => `
  <article class="topic-card">
    <div>
      <p class="status">Topic ${index + 1}</p>
      <h3>${topic.name}</h3>
      <p class="muted">${topic.summary}</p>
    </div>
    <div class="topic-links">
      ${topic.links.map((id) => {
        const pattern = patternsById.get(id);
        return pattern ? `<a href="pages/${pattern.id}.html">${pattern.name}</a>` : '';
      }).join('')}
    </div>
  </article>
`).join('');
