const CURRENT_PATTERN = {
  "id": "design",
  "name": "Design",
  "summary": "Build stateful APIs with the right internal data structures: caches, stacks, heaps, maps, streams, calendars, iterators, tries, and file-system models.",
  "complete": true,
  "subpatterns": [
    "Hash map plus doubly linked list cache",
    "Frequency buckets cache",
    "Auxiliary minimum tracking stack",
    "Bounded heap stream rank",
    "Two-heap median stream",
    "Timestamped binary-search map",
    "Array plus index map random set",
    "Social feed fan-out merge",
    "Rolling time-window counter",
    "History cursor with back-forward state",
    "Trip aggregation by route",
    "Capacity counter design",
    "Fixed-size circular queue",
    "Fixed-size circular deque",
    "Separate chaining hash map",
    "Separate chaining hash set",
    "Trie prefix tree",
    "Wildcard trie search",
    "Versioned array snapshots",
    "Interval booking without overlap",
    "Double-booking calendar sweep",
    "Maximum-overlap calendar sweep",
    "Dynamic interval range tracking",
    "Lazy nested-list iterator",
    "Cached peeking iterator",
    "2D vector flattening cursor",
    "Binary tree serialization codec",
    "Path trie file system",
    "Autocomplete trie with hot ranking",
    "Frequency bucket all-one structure"
  ],
  "problems": [
    {
      "group": "core",
      "name": "LRU Cache",
      "difficulty": "Medium",
      "subpattern": "Hash map plus doubly linked list cache",
      "question": "Design an LRUCache with get(key) and put(key,value). get returns the value or -1, and put inserts or updates while evicting the least recently used key when capacity is exceeded.",
      "trigger": "Requires O(1) lookup plus O(1) recency updates and eviction.",
      "intuition": "Use a hash map for key lookup and a doubly linked list ordered from most recent to least recent.",
      "edgeCases": "Updating an existing key, capacity one, repeated get calls, eviction after put, missing key.",
      "constraints": "1 <= capacity <= 3000; up to 200000 calls; 0 <= key,value <= 10000.",
      "source": {
        "label": "LRU Cache - LeetCode 146",
        "url": "https://leetcode.com/problems/lru-cache/"
      },
      "examples": [
        {
          "input": "LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)",
          "output": "1, then -1",
          "explanation": "get(1) makes key 1 recent, so key 2 is evicted."
        },
        {
          "input": "LRUCache(1); put(1,1); put(2,2); get(1); get(2)",
          "output": "-1, then 2",
          "explanation": "Capacity one keeps only the newest key."
        },
        {
          "input": "put(2,1); put(2,2); get(2)",
          "output": "2",
          "explanation": "Updating a key also refreshes its recency."
        }
      ],
      "bruteForceComplexity": "get Time O(n), put Time O(n); Space O(capacity). Scan arrays for keys and oldest timestamps.",
      "optimizedComplexity": "get Time O(1), put Time O(1); Space O(capacity). Hash map plus doubly linked list.",
      "recursiveComplexity": "get Time O(n), put Time O(n); Space O(capacity + n stack). Recursive helpers find keys and eviction victim.",
      "bruteForceCode": "import java.util.*;\n\nclass LRUCache {\n  private final int capacity;\n  private int clock = 0;\n  private final List<int[]> entries = new ArrayList<>();\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    for (int[] entry : entries) {\n      if (entry[0] == key) {\n        entry[2] = ++clock;\n        return entry[1];\n      }\n    }\n    return -1;\n  }\n\n  public void put(int key, int value) {\n    for (int[] entry : entries) {\n      if (entry[0] == key) {\n        entry[1] = value;\n        entry[2] = ++clock;\n        return;\n      }\n    }\n    if (entries.size() == capacity) {\n      int victim = 0;\n      for (int i = 1; i < entries.size(); i++) if (entries.get(i)[2] < entries.get(victim)[2]) victim = i;\n      entries.remove(victim);\n    }\n    entries.add(new int[]{key, value, ++clock});\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass LRUCache {\n  private static class Node {\n    int key;\n    int value;\n    Node prev;\n    Node next;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private final Map<Integer, Node> map = new HashMap<>();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.prev = head;\n  }\n\n  public int get(int key) {\n    Node node = map.get(key);\n    if (node == null) return -1;\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = map.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n    if (map.size() == capacity) {\n      Node victim = tail.prev;\n      remove(victim);\n      map.remove(victim.key);\n    }\n    Node created = new Node(key, value);\n    map.put(key, created);\n    addAfterHead(created);\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void remove(Node node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n\n  private void addAfterHead(Node node) {\n    node.next = head.next;\n    node.prev = head;\n    head.next.prev = node;\n    head.next = node;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass LRUCache {\n  private final int capacity;\n  private int clock = 0;\n  private final List<int[]> entries = new ArrayList<>();\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    int index = find(key, 0);\n    if (index == -1) return -1;\n    entries.get(index)[2] = ++clock;\n    return entries.get(index)[1];\n  }\n\n  public void put(int key, int value) {\n    int index = find(key, 0);\n    if (index != -1) {\n      int[] entry = entries.get(index);\n      entry[1] = value;\n      entry[2] = ++clock;\n      return;\n    }\n    if (entries.size() == capacity) entries.remove(oldest(1, 0));\n    entries.add(new int[]{key, value, ++clock});\n  }\n\n  private int find(int key, int index) {\n    if (index == entries.size()) return -1;\n    return entries.get(index)[0] == key ? index : find(key, index + 1);\n  }\n\n  private int oldest(int index, int best) {\n    if (index == entries.size()) return best;\n    if (entries.get(index)[2] < entries.get(best)[2]) best = index;\n    return oldest(index + 1, best);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass LRUCache {\n  private static class Node {\n    int key;\n    int value;\n    Node prev;\n    Node next;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private final Map<Integer, Node> map = new HashMap<>();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.prev = head;\n  }\n\n  public int get(int key) {\n    Node node = map.get(key);\n    if (node == null) return -1;\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = map.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n    if (map.size() == capacity) {\n      Node victim = tail.prev;\n      remove(victim);\n      map.remove(victim.key);\n    }\n    Node created = new Node(key, value);\n    map.put(key, created);\n    addAfterHead(created);\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void remove(Node node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n\n  private void addAfterHead(Node node) {\n    node.next = head.next;\n    node.prev = head;\n    head.next.prev = node;\n    head.next = node;\n  }\n}",
      "code": "import java.util.*;\n\nclass LRUCache {\n  private static class Node {\n    int key;\n    int value;\n    Node prev;\n    Node next;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private final Map<Integer, Node> map = new HashMap<>();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.prev = head;\n  }\n\n  public int get(int key) {\n    Node node = map.get(key);\n    if (node == null) return -1;\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = map.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n    if (map.size() == capacity) {\n      Node victim = tail.prev;\n      remove(victim);\n      map.remove(victim.key);\n    }\n    Node created = new Node(key, value);\n    map.put(key, created);\n    addAfterHead(created);\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void remove(Node node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n\n  private void addAfterHead(Node node) {\n    node.next = head.next;\n    node.prev = head;\n    head.next.prev = node;\n    head.next = node;\n  }\n}"
    },
    {
      "group": "core",
      "name": "LFU Cache",
      "difficulty": "Hard",
      "subpattern": "Frequency buckets cache",
      "question": "Design an LFUCache with get and put. When full, evict the least frequently used key; if tied, evict the least recently used among those keys.",
      "trigger": "Requires lookup, frequency increase, and min-frequency eviction with recency tie-breaking.",
      "intuition": "Map keys to nodes and map each frequency to an ordered set of keys; track the current minimum frequency.",
      "edgeCases": "Capacity zero, updating existing key, frequency tie, minFreq changing after bucket becomes empty, repeated gets.",
      "constraints": "0 <= capacity <= 10000; up to 200000 calls; key and value are non-negative integers.",
      "source": {
        "label": "LFU Cache - LeetCode 460",
        "url": "https://leetcode.com/problems/lfu-cache/"
      },
      "examples": [
        {
          "input": "LFUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); get(3)",
          "output": "1, -1, 3",
          "explanation": "Key 2 has lower frequency and is evicted."
        },
        {
          "input": "put(1,1); put(2,2); get(1); get(2); put(3,3)",
          "output": "evicts key 1 or 2 by LRU among equal frequency after operations",
          "explanation": "Ties use recency inside the frequency bucket."
        },
        {
          "input": "LFUCache(0); put(1,1); get(1)",
          "output": "-1",
          "explanation": "Zero capacity stores nothing."
        }
      ],
      "bruteForceComplexity": "get Time O(1), put Time O(n); Space O(capacity). Scan all keys to find eviction victim.",
      "optimizedComplexity": "get Time O(1), put Time O(1); Space O(capacity). Frequency buckets keep LRU order per frequency.",
      "recursiveComplexity": "get Time O(1), put Time O(n); Space O(capacity + n stack). Recursive eviction scan applies frequency and recency tie rules.",
      "bruteForceCode": "import java.util.*;\n\nclass LFUCache {\n  private final int capacity;\n  private int time = 0;\n  private final Map<Integer, int[]> map = new HashMap<>();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    int[] data = map.get(key);\n    if (data == null) return -1;\n    data[1]++;\n    data[2] = ++time;\n    return data[0];\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    if (map.containsKey(key)) {\n      int[] data = map.get(key);\n      data[0] = value;\n      data[1]++;\n      data[2] = ++time;\n      return;\n    }\n    if (map.size() == capacity) {\n      int victim = 0;\n      boolean chosen = false;\n      for (int current : map.keySet()) {\n        if (!chosen || worse(current, victim)) {\n          victim = current;\n          chosen = true;\n        }\n      }\n      map.remove(victim);\n    }\n    map.put(key, new int[]{value, 1, ++time});\n  }\n\n  private boolean worse(int a, int b) {\n    int[] x = map.get(a), y = map.get(b);\n    if (x[1] != y[1]) return x[1] < y[1];\n    return x[2] < y[2];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass LFUCache {\n  private static class Node {\n    int key, value, frequency = 1;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private int minFreq = 0;\n  private final Map<Integer, Node> nodes = new HashMap<>();\n  private final Map<Integer, LinkedHashSet<Integer>> buckets = new HashMap<>();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n    touch(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      touch(node);\n      return;\n    }\n    if (nodes.size() == capacity) {\n      LinkedHashSet<Integer> bucket = buckets.get(minFreq);\n      int victim = bucket.iterator().next();\n      bucket.remove(victim);\n      nodes.remove(victim);\n    }\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    buckets.computeIfAbsent(1, ignored -> new LinkedHashSet<>()).add(key);\n    minFreq = 1;\n  }\n\n  private void touch(Node node) {\n    LinkedHashSet<Integer> oldBucket = buckets.get(node.frequency);\n    oldBucket.remove(node.key);\n    if (node.frequency == minFreq && oldBucket.isEmpty()) minFreq++;\n    node.frequency++;\n    buckets.computeIfAbsent(node.frequency, ignored -> new LinkedHashSet<>()).add(node.key);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass LFUCache {\n  private final int capacity;\n  private int time = 0;\n  private final Map<Integer, int[]> map = new HashMap<>();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    int[] data = map.get(key);\n    if (data == null) return -1;\n    data[1]++;\n    data[2] = ++time;\n    return data[0];\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    if (map.containsKey(key)) {\n      int[] data = map.get(key);\n      data[0] = value;\n      data[1]++;\n      data[2] = ++time;\n      return;\n    }\n    if (map.size() == capacity) {\n      List<Integer> keys = new ArrayList<>(map.keySet());\n      map.remove(victim(keys, 1, keys.get(0)));\n    }\n    map.put(key, new int[]{value, 1, ++time});\n  }\n\n  private int victim(List<Integer> keys, int index, int best) {\n    if (index == keys.size()) return best;\n    int key = keys.get(index);\n    int[] current = map.get(key), chosen = map.get(best);\n    if (current[1] < chosen[1] || (current[1] == chosen[1] && current[2] < chosen[2])) best = key;\n    return victim(keys, index + 1, best);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass LFUCache {\n  private static class Node {\n    int key, value, frequency = 1;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private int minFreq = 0;\n  private final Map<Integer, Node> nodes = new HashMap<>();\n  private final Map<Integer, LinkedHashSet<Integer>> buckets = new HashMap<>();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n    touch(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      touch(node);\n      return;\n    }\n    if (nodes.size() == capacity) {\n      LinkedHashSet<Integer> bucket = buckets.get(minFreq);\n      int victim = bucket.iterator().next();\n      bucket.remove(victim);\n      nodes.remove(victim);\n    }\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    buckets.computeIfAbsent(1, ignored -> new LinkedHashSet<>()).add(key);\n    minFreq = 1;\n  }\n\n  private void touch(Node node) {\n    LinkedHashSet<Integer> oldBucket = buckets.get(node.frequency);\n    oldBucket.remove(node.key);\n    if (node.frequency == minFreq && oldBucket.isEmpty()) minFreq++;\n    node.frequency++;\n    buckets.computeIfAbsent(node.frequency, ignored -> new LinkedHashSet<>()).add(node.key);\n  }\n}",
      "code": "import java.util.*;\n\nclass LFUCache {\n  private static class Node {\n    int key, value, frequency = 1;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private int minFreq = 0;\n  private final Map<Integer, Node> nodes = new HashMap<>();\n  private final Map<Integer, LinkedHashSet<Integer>> buckets = new HashMap<>();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n    touch(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      touch(node);\n      return;\n    }\n    if (nodes.size() == capacity) {\n      LinkedHashSet<Integer> bucket = buckets.get(minFreq);\n      int victim = bucket.iterator().next();\n      bucket.remove(victim);\n      nodes.remove(victim);\n    }\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    buckets.computeIfAbsent(1, ignored -> new LinkedHashSet<>()).add(key);\n    minFreq = 1;\n  }\n\n  private void touch(Node node) {\n    LinkedHashSet<Integer> oldBucket = buckets.get(node.frequency);\n    oldBucket.remove(node.key);\n    if (node.frequency == minFreq && oldBucket.isEmpty()) minFreq++;\n    node.frequency++;\n    buckets.computeIfAbsent(node.frequency, ignored -> new LinkedHashSet<>()).add(node.key);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Min Stack",
      "difficulty": "Medium",
      "subpattern": "Auxiliary minimum tracking stack",
      "question": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
      "trigger": "A stack needs normal LIFO behavior plus fast min queries over the active prefix.",
      "intuition": "Store the current minimum alongside each pushed value or maintain a second stack of minimums.",
      "edgeCases": "Duplicate minimums, popping the current min, negative values, one element, alternating push/pop.",
      "constraints": "Methods are called on valid non-empty stack when top, pop, or getMin is used; values fit int.",
      "source": {
        "label": "Min Stack - LeetCode 155",
        "url": "https://leetcode.com/problems/min-stack/"
      },
      "examples": [
        {
          "input": "push(-2); push(0); push(-3); getMin(); pop(); top(); getMin()",
          "output": "-3, 0, -2",
          "explanation": "The min updates after popping -3."
        },
        {
          "input": "push(1); push(1); pop(); getMin()",
          "output": "1",
          "explanation": "Duplicate minimums must be tracked correctly."
        },
        {
          "input": "push(2); push(-1); top(); getMin()",
          "output": "-1, -1",
          "explanation": "Top and min can be the same value."
        }
      ],
      "bruteForceComplexity": "push/pop/top Time O(1), getMin Time O(n); Space O(n). Scan the stack for the minimum.",
      "optimizedComplexity": "All operations Time O(1); Space O(n). Store a parallel min stack.",
      "recursiveComplexity": "push/pop/top Time O(1), getMin Time O(n); Space O(n stack + n recursion). Recursively scans and restores values.",
      "bruteForceCode": "import java.util.*;\n\nclass MinStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n\n  public void push(int val) {\n    stack.push(val);\n  }\n\n  public void pop() {\n    stack.pop();\n  }\n\n  public int top() {\n    return stack.peek();\n  }\n\n  public int getMin() {\n    int best = Integer.MAX_VALUE;\n    for (int value : stack) best = Math.min(best, value);\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MinStack {\n  private final Deque<Integer> values = new ArrayDeque<>();\n  private final Deque<Integer> mins = new ArrayDeque<>();\n\n  public void push(int val) {\n    values.push(val);\n    if (mins.isEmpty() || val <= mins.peek()) mins.push(val);\n  }\n\n  public void pop() {\n    int removed = values.pop();\n    if (removed == mins.peek()) mins.pop();\n  }\n\n  public int top() {\n    return values.peek();\n  }\n\n  public int getMin() {\n    return mins.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MinStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n\n  public void push(int val) {\n    stack.push(val);\n  }\n\n  public void pop() {\n    stack.pop();\n  }\n\n  public int top() {\n    return stack.peek();\n  }\n\n  public int getMin() {\n    return scanMin(Integer.MAX_VALUE);\n  }\n\n  private int scanMin(int best) {\n    if (stack.isEmpty()) return best;\n    int value = stack.pop();\n    int answer = scanMin(Math.min(best, value));\n    stack.push(value);\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MinStack {\n  private final Deque<Integer> values = new ArrayDeque<>();\n  private final Deque<Integer> mins = new ArrayDeque<>();\n\n  public void push(int val) {\n    values.push(val);\n    if (mins.isEmpty() || val <= mins.peek()) mins.push(val);\n  }\n\n  public void pop() {\n    int removed = values.pop();\n    if (removed == mins.peek()) mins.pop();\n  }\n\n  public int top() {\n    return values.peek();\n  }\n\n  public int getMin() {\n    return mins.peek();\n  }\n}",
      "code": "import java.util.*;\n\nclass MinStack {\n  private final Deque<Integer> values = new ArrayDeque<>();\n  private final Deque<Integer> mins = new ArrayDeque<>();\n\n  public void push(int val) {\n    values.push(val);\n    if (mins.isEmpty() || val <= mins.peek()) mins.push(val);\n  }\n\n  public void pop() {\n    int removed = values.pop();\n    if (removed == mins.peek()) mins.pop();\n  }\n\n  public int top() {\n    return values.peek();\n  }\n\n  public int getMin() {\n    return mins.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Largest Element in a Stream",
      "difficulty": "Easy",
      "subpattern": "Bounded heap stream rank",
      "question": "Design KthLargest that receives an initial stream and returns the kth largest element after each add(val).",
      "trigger": "Only the kth largest rank is needed as values arrive online.",
      "intuition": "Keep a min-heap of the largest k values; its root is the kth largest.",
      "edgeCases": "Initial nums shorter than k, duplicates, negative values, add values smaller than kth, k equals one.",
      "constraints": "1 <= k <= 10000; up to 10000 add calls; values fit int.",
      "source": {
        "label": "Kth Largest Element in a Stream - LeetCode 703",
        "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/"
      },
      "examples": [
        {
          "input": "KthLargest(3,[4,5,8,2]); add(3); add(5); add(10)",
          "output": "4, 5, 5",
          "explanation": "The heap keeps the three largest seen values."
        },
        {
          "input": "KthLargest(1,[]); add(-3); add(-2)",
          "output": "-3, -2",
          "explanation": "With k=1, the answer is the maximum."
        },
        {
          "input": "KthLargest(2,[0]); add(-1); add(1)",
          "output": "-1, 0",
          "explanation": "The stream can start shorter than k."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(n log n), add Time O(n log n); Space O(n). Sort the whole stream after every add.",
      "optimizedComplexity": "Constructor Time O(n log k), add Time O(log k); Space O(k). Maintain a bounded min-heap.",
      "recursiveComplexity": "Constructor Time O(n*k), add Time O(k); Space O(n). Recursively inserts into a sorted list.",
      "bruteForceCode": "import java.util.*;\n\nclass KthLargest {\n  private final int k;\n  private final List<Integer> values = new ArrayList<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int value : nums) values.add(value);\n  }\n\n  public int add(int val) {\n    values.add(val);\n    values.sort(Collections.reverseOrder());\n    return values.get(k - 1);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass KthLargest {\n  private final int k;\n  private final PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int value : nums) add(value);\n  }\n\n  public int add(int val) {\n    heap.offer(val);\n    if (heap.size() > k) heap.poll();\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass KthLargest {\n  private final int k;\n  private final List<Integer> sorted = new ArrayList<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int value : nums) insert(value, 0);\n  }\n\n  public int add(int val) {\n    insert(val, 0);\n    return sorted.get(k - 1);\n  }\n\n  private void insert(int val, int index) {\n    if (index == sorted.size() || val >= sorted.get(index)) {\n      sorted.add(index, val);\n      return;\n    }\n    insert(val, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass KthLargest {\n  private final int k;\n  private final PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int value : nums) add(value);\n  }\n\n  public int add(int val) {\n    heap.offer(val);\n    if (heap.size() > k) heap.poll();\n    return heap.peek();\n  }\n}",
      "code": "import java.util.*;\n\nclass KthLargest {\n  private final int k;\n  private final PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int value : nums) add(value);\n  }\n\n  public int add(int val) {\n    heap.offer(val);\n    if (heap.size() > k) heap.poll();\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Median from Data Stream",
      "difficulty": "Hard",
      "subpattern": "Two-heap median stream",
      "question": "Design MedianFinder with addNum(num) and findMedian() for a stream of integers.",
      "trigger": "The median must be available after each online insertion.",
      "intuition": "Keep lower half in a max-heap and upper half in a min-heap, balanced by size.",
      "edgeCases": "Odd count, even count, duplicate values, negative values, increasing stream, decreasing stream.",
      "constraints": "At least one number exists before findMedian; values fit int; up to 50000 calls.",
      "source": {
        "label": "Find Median from Data Stream - LeetCode 295",
        "url": "https://leetcode.com/problems/find-median-from-data-stream/"
      },
      "examples": [
        {
          "input": "addNum(1); addNum(2); findMedian(); addNum(3); findMedian()",
          "output": "1.5, then 2.0",
          "explanation": "Even count averages the two middles; odd count returns the middle."
        },
        {
          "input": "addNum(-1); findMedian()",
          "output": "-1.0",
          "explanation": "A single value is the median."
        },
        {
          "input": "addNum(5); addNum(5); findMedian()",
          "output": "5.0",
          "explanation": "Duplicates are handled naturally."
        }
      ],
      "bruteForceComplexity": "addNum Time O(1), findMedian Time O(n log n); Space O(n). Sort a copy when median is requested.",
      "optimizedComplexity": "addNum Time O(log n), findMedian Time O(1); Space O(n). Two heaps maintain balanced halves.",
      "recursiveComplexity": "addNum Time O(n), findMedian Time O(1); Space O(n). Recursively inserts into a sorted list.",
      "bruteForceCode": "import java.util.*;\n\nclass MedianFinder {\n  private final List<Integer> values = new ArrayList<>();\n\n  public void addNum(int num) {\n    values.add(num);\n  }\n\n  public double findMedian() {\n    List<Integer> copy = new ArrayList<>(values);\n    Collections.sort(copy);\n    int n = copy.size();\n    if (n % 2 == 1) return copy.get(n / 2);\n    return (copy.get(n / 2 - 1) + copy.get(n / 2)) / 2.0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MedianFinder {\n  private final PriorityQueue<Integer> low = new PriorityQueue<>(Collections.reverseOrder());\n  private final PriorityQueue<Integer> high = new PriorityQueue<>();\n\n  public void addNum(int num) {\n    if (low.isEmpty() || num <= low.peek()) low.offer(num);\n    else high.offer(num);\n    if (low.size() > high.size() + 1) high.offer(low.poll());\n    if (high.size() > low.size()) low.offer(high.poll());\n  }\n\n  public double findMedian() {\n    if (low.size() == high.size()) return (low.peek() + high.peek()) / 2.0;\n    return low.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MedianFinder {\n  private final List<Integer> sorted = new ArrayList<>();\n\n  public void addNum(int num) {\n    insert(num, 0);\n  }\n\n  public double findMedian() {\n    int n = sorted.size();\n    if (n % 2 == 1) return sorted.get(n / 2);\n    return (sorted.get(n / 2 - 1) + sorted.get(n / 2)) / 2.0;\n  }\n\n  private void insert(int num, int index) {\n    if (index == sorted.size() || num <= sorted.get(index)) {\n      sorted.add(index, num);\n      return;\n    }\n    insert(num, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MedianFinder {\n  private final PriorityQueue<Integer> low = new PriorityQueue<>(Collections.reverseOrder());\n  private final PriorityQueue<Integer> high = new PriorityQueue<>();\n\n  public void addNum(int num) {\n    if (low.isEmpty() || num <= low.peek()) low.offer(num);\n    else high.offer(num);\n    if (low.size() > high.size() + 1) high.offer(low.poll());\n    if (high.size() > low.size()) low.offer(high.poll());\n  }\n\n  public double findMedian() {\n    if (low.size() == high.size()) return (low.peek() + high.peek()) / 2.0;\n    return low.peek();\n  }\n}",
      "code": "import java.util.*;\n\nclass MedianFinder {\n  private final PriorityQueue<Integer> low = new PriorityQueue<>(Collections.reverseOrder());\n  private final PriorityQueue<Integer> high = new PriorityQueue<>();\n\n  public void addNum(int num) {\n    if (low.isEmpty() || num <= low.peek()) low.offer(num);\n    else high.offer(num);\n    if (low.size() > high.size() + 1) high.offer(low.poll());\n    if (high.size() > low.size()) low.offer(high.poll());\n  }\n\n  public double findMedian() {\n    if (low.size() == high.size()) return (low.peek() + high.peek()) / 2.0;\n    return low.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Time Based Key-Value Store",
      "difficulty": "Medium",
      "subpattern": "Timestamped binary-search map",
      "question": "Design TimeMap with set(key,value,timestamp) and get(key,timestamp), returning the value with the greatest timestamp <= timestamp or empty string.",
      "trigger": "Each key has historical versions queried by floor timestamp.",
      "intuition": "Store each key's values in timestamp order and binary search for the last valid timestamp.",
      "edgeCases": "Missing key, query before first timestamp, exact timestamp, multiple keys, increasing timestamps per key.",
      "constraints": "Timestamps are strictly increasing for each key in set calls; up to 200000 operations.",
      "source": {
        "label": "Time Based Key-Value Store - LeetCode 981",
        "url": "https://leetcode.com/problems/time-based-key-value-store/"
      },
      "examples": [
        {
          "input": "set(\"foo\",\"bar\",1); get(\"foo\",1); get(\"foo\",3)",
          "output": "\"bar\", \"bar\"",
          "explanation": "Timestamp 1 is the latest value at both query times."
        },
        {
          "input": "set(\"foo\",\"bar2\",4); get(\"foo\",4); get(\"foo\",5)",
          "output": "\"bar2\", \"bar2\"",
          "explanation": "The newer value applies from timestamp 4 onward."
        },
        {
          "input": "get(\"missing\",10)",
          "output": "\"\"",
          "explanation": "Unknown keys return an empty string."
        }
      ],
      "bruteForceComplexity": "set Time O(1), get Time O(v); Space O(total sets). Scan all versions for the key.",
      "optimizedComplexity": "set Time O(1), get Time O(log v); Space O(total sets). Binary search sorted timestamp versions.",
      "recursiveComplexity": "set Time O(1), get Time O(log v); Space O(total sets + log v stack). Recursive binary search finds floor timestamp.",
      "bruteForceCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map<String, List<Entry>> map = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    String answer = \"\";\n    for (Entry entry : map.getOrDefault(key, Collections.emptyList())) {\n      if (entry.timestamp <= timestamp) answer = entry.value;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map<String, List<Entry>> map = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> list = map.get(key);\n    if (list == null) return \"\";\n    int left = 0, right = list.size() - 1;\n    String answer = \"\";\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid).timestamp <= timestamp) {\n        answer = list.get(mid).value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map<String, List<Entry>> map = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> list = map.get(key);\n    if (list == null) return \"\";\n    return search(list, timestamp, 0, list.size() - 1, \"\");\n  }\n\n  private String search(List<Entry> list, int timestamp, int left, int right, String answer) {\n    if (left > right) return answer;\n    int mid = left + (right - left) / 2;\n    if (list.get(mid).timestamp <= timestamp) return search(list, timestamp, mid + 1, right, list.get(mid).value);\n    return search(list, timestamp, left, mid - 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map<String, List<Entry>> map = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> list = map.get(key);\n    if (list == null) return \"\";\n    int left = 0, right = list.size() - 1;\n    String answer = \"\";\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid).timestamp <= timestamp) {\n        answer = list.get(mid).value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map<String, List<Entry>> map = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> list = map.get(key);\n    if (list == null) return \"\";\n    int left = 0, right = list.size() - 1;\n    String answer = \"\";\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid).timestamp <= timestamp) {\n        answer = list.get(mid).value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Insert Delete GetRandom O(1)",
      "difficulty": "Medium",
      "subpattern": "Array plus index map random set",
      "question": "Design RandomizedSet supporting insert, remove, and getRandom, with average O(1) time for each operation.",
      "trigger": "Need both membership lookup and random index access.",
      "intuition": "Store values in an array list and map each value to its index; delete by swapping with the last value.",
      "edgeCases": "Insert existing value, remove missing value, remove last element, remove middle element, getRandom after deletions.",
      "constraints": "Values fit int; at least one element exists when getRandom is called; up to 200000 calls.",
      "source": {
        "label": "Insert Delete GetRandom O(1) - LeetCode 380",
        "url": "https://leetcode.com/problems/insert-delete-getrandom-o1/"
      },
      "examples": [
        {
          "input": "insert(1); remove(2); insert(2); getRandom(); remove(1); insert(2)",
          "output": "true, false, true, 1 or 2, true, false",
          "explanation": "Duplicate insert returns false and random chooses an existing value."
        },
        {
          "input": "insert(0); remove(0)",
          "output": "true, true",
          "explanation": "Removing the only element leaves the set empty."
        },
        {
          "input": "insert(1); insert(1)",
          "output": "true, false",
          "explanation": "Set membership is unique."
        }
      ],
      "bruteForceComplexity": "insert/remove Time O(n), getRandom Time O(1); Space O(n). Scan a list for membership and removal.",
      "optimizedComplexity": "insert/remove/getRandom average Time O(1); Space O(n). Array list plus value-to-index map.",
      "recursiveComplexity": "insert/remove Time O(n), getRandom Time O(1); Space O(n + stack). Recursive search locates values.",
      "bruteForceCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List<Integer> values = new ArrayList<>();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (values.contains(val)) return false;\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    int index = values.indexOf(val);\n    if (index == -1) return false;\n    values.remove(index);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List<Integer> values = new ArrayList<>();\n  private final Map<Integer, Integer> index = new HashMap<>();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size());\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    Integer i = index.get(val);\n    if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last);\n    index.put(last, i);\n    values.remove(values.size() - 1);\n    index.remove(val);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List<Integer> values = new ArrayList<>();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (find(val, 0) != -1) return false;\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    int index = find(val, 0);\n    if (index == -1) return false;\n    values.remove(index);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n\n  private int find(int val, int index) {\n    if (index == values.size()) return -1;\n    if (values.get(index) == val) return index;\n    return find(val, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List<Integer> values = new ArrayList<>();\n  private final Map<Integer, Integer> index = new HashMap<>();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size());\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    Integer i = index.get(val);\n    if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last);\n    index.put(last, i);\n    values.remove(values.size() - 1);\n    index.remove(val);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}",
      "code": "import java.util.*;\n\nclass RandomizedSet {\n  private final List<Integer> values = new ArrayList<>();\n  private final Map<Integer, Integer> index = new HashMap<>();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size());\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    Integer i = index.get(val);\n    if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last);\n    index.put(last, i);\n    values.remove(values.size() - 1);\n    index.remove(val);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Twitter",
      "difficulty": "Medium",
      "subpattern": "Social feed fan-out merge",
      "question": "Design Twitter with postTweet, getNewsFeed, follow, and unfollow. News feed returns up to 10 most recent tweet ids by the user and followed users.",
      "trigger": "Feed reads must merge recent items across multiple followed authors by timestamp.",
      "intuition": "Store tweets per user with timestamps and merge followed users' recent tweets using a heap or scan.",
      "edgeCases": "User follows self, unfollow self should not remove own feed, fewer than 10 tweets, no follows, multiple tweets by same user.",
      "constraints": "User ids and tweet ids are positive; at most 30000 operations.",
      "source": {
        "label": "Design Twitter - LeetCode 355",
        "url": "https://leetcode.com/problems/design-twitter/"
      },
      "examples": [
        {
          "input": "postTweet(1,5); getNewsFeed(1); follow(1,2); postTweet(2,6); getNewsFeed(1)",
          "output": "[5], then [6,5]",
          "explanation": "Following user 2 includes their newer tweet."
        },
        {
          "input": "unfollow(1,2); getNewsFeed(1)",
          "output": "[5]",
          "explanation": "After unfollowing, user 2 tweets disappear."
        },
        {
          "input": "getNewsFeed(99)",
          "output": "[]",
          "explanation": "A user with no tweets and follows has an empty feed."
        }
      ],
      "bruteForceComplexity": "post/follow/unfollow Time O(1), getNewsFeed Time O(total tweets log total tweets); Space O(total tweets + follows). Sort visible tweets each request.",
      "optimizedComplexity": "post/follow/unfollow Time O(1), getNewsFeed Time O(f log f + 10 log f); Space O(total tweets + follows). Heap-merge recent tweets per followed user.",
      "recursiveComplexity": "post/follow/unfollow Time O(1), getNewsFeed Time O(total tweets); Space O(total tweets + follows + stack). Recursively scans global tweets backward.",
      "bruteForceCode": "import java.util.*;\n\nclass Twitter {\n  private int time = 0;\n  private final List<int[]> tweets = new ArrayList<>();\n  private final Map<Integer, Set<Integer>> follows = new HashMap<>();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.add(new int[]{++time, userId, tweetId});\n  }\n\n  public List<Integer> getNewsFeed(int userId) {\n    List<int[]> visible = new ArrayList<>();\n    Set<Integer> followees = follows.getOrDefault(userId, Collections.emptySet());\n    for (int[] tweet : tweets) if (tweet[1] == userId || followees.contains(tweet[1])) visible.add(tweet);\n    visible.sort((a, b) -> Integer.compare(b[0], a[0]));\n    List<Integer> feed = new ArrayList<>();\n    for (int i = 0; i < visible.size() && i < 10; i++) feed.add(visible.get(i)[2]);\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -> new HashSet<>()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Twitter {\n  private static class Tweet {\n    int id, time;\n    Tweet next;\n    Tweet(int id, int time, Tweet next) { this.id = id; this.time = time; this.next = next; }\n  }\n\n  private int time = 0;\n  private final Map<Integer, Tweet> tweets = new HashMap<>();\n  private final Map<Integer, Set<Integer>> follows = new HashMap<>();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.put(userId, new Tweet(tweetId, ++time, tweets.get(userId)));\n  }\n\n  public List<Integer> getNewsFeed(int userId) {\n    Set<Integer> users = new HashSet<>(follows.getOrDefault(userId, Collections.emptySet()));\n    users.add(userId);\n    PriorityQueue<Tweet> heap = new PriorityQueue<>((a, b) -> Integer.compare(b.time, a.time));\n    for (int user : users) if (tweets.get(user) != null) heap.offer(tweets.get(user));\n    List<Integer> feed = new ArrayList<>();\n    while (!heap.isEmpty() && feed.size() < 10) {\n      Tweet tweet = heap.poll();\n      feed.add(tweet.id);\n      if (tweet.next != null) heap.offer(tweet.next);\n    }\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -> new HashSet<>()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Twitter {\n  private int time = 0;\n  private final List<int[]> tweets = new ArrayList<>();\n  private final Map<Integer, Set<Integer>> follows = new HashMap<>();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.add(new int[]{++time, userId, tweetId});\n  }\n\n  public List<Integer> getNewsFeed(int userId) {\n    List<Integer> feed = new ArrayList<>();\n    collect(userId, tweets.size() - 1, feed);\n    return feed;\n  }\n\n  private void collect(int userId, int index, List<Integer> feed) {\n    if (index < 0 || feed.size() == 10) return;\n    int[] tweet = tweets.get(index);\n    if (tweet[1] == userId || follows.getOrDefault(userId, Collections.emptySet()).contains(tweet[1])) feed.add(tweet[2]);\n    collect(userId, index - 1, feed);\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -> new HashSet<>()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Twitter {\n  private static class Tweet {\n    int id, time;\n    Tweet next;\n    Tweet(int id, int time, Tweet next) { this.id = id; this.time = time; this.next = next; }\n  }\n\n  private int time = 0;\n  private final Map<Integer, Tweet> tweets = new HashMap<>();\n  private final Map<Integer, Set<Integer>> follows = new HashMap<>();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.put(userId, new Tweet(tweetId, ++time, tweets.get(userId)));\n  }\n\n  public List<Integer> getNewsFeed(int userId) {\n    Set<Integer> users = new HashSet<>(follows.getOrDefault(userId, Collections.emptySet()));\n    users.add(userId);\n    PriorityQueue<Tweet> heap = new PriorityQueue<>((a, b) -> Integer.compare(b.time, a.time));\n    for (int user : users) if (tweets.get(user) != null) heap.offer(tweets.get(user));\n    List<Integer> feed = new ArrayList<>();\n    while (!heap.isEmpty() && feed.size() < 10) {\n      Tweet tweet = heap.poll();\n      feed.add(tweet.id);\n      if (tweet.next != null) heap.offer(tweet.next);\n    }\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -> new HashSet<>()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
      "code": "import java.util.*;\n\nclass Twitter {\n  private static class Tweet {\n    int id, time;\n    Tweet next;\n    Tweet(int id, int time, Tweet next) { this.id = id; this.time = time; this.next = next; }\n  }\n\n  private int time = 0;\n  private final Map<Integer, Tweet> tweets = new HashMap<>();\n  private final Map<Integer, Set<Integer>> follows = new HashMap<>();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.put(userId, new Tweet(tweetId, ++time, tweets.get(userId)));\n  }\n\n  public List<Integer> getNewsFeed(int userId) {\n    Set<Integer> users = new HashSet<>(follows.getOrDefault(userId, Collections.emptySet()));\n    users.add(userId);\n    PriorityQueue<Tweet> heap = new PriorityQueue<>((a, b) -> Integer.compare(b.time, a.time));\n    for (int user : users) if (tweets.get(user) != null) heap.offer(tweets.get(user));\n    List<Integer> feed = new ArrayList<>();\n    while (!heap.isEmpty() && feed.size() < 10) {\n      Tweet tweet = heap.poll();\n      feed.add(tweet.id);\n      if (tweet.next != null) heap.offer(tweet.next);\n    }\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -> new HashSet<>()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Hit Counter",
      "difficulty": "Medium",
      "subpattern": "Rolling time-window counter",
      "question": "Design a hit counter that records hits by timestamp and returns hits in the past 5 minutes.",
      "trigger": "Only events in a fixed rolling 300-second window matter.",
      "intuition": "Use timestamp buckets modulo 300 and reset a bucket when its stored timestamp is stale.",
      "edgeCases": "Multiple hits at same timestamp, query exactly 300 seconds later, no hits, sparse timestamps, timestamp jumps.",
      "constraints": "Timestamps are monotonically increasing in seconds; methods may be called many times.",
      "source": {
        "label": "Design Hit Counter - LeetCode 362",
        "url": "https://leetcode.com/problems/design-hit-counter/"
      },
      "examples": [
        {
          "input": "hit(1); hit(2); hit(3); getHits(4)",
          "output": "3",
          "explanation": "All hits are within 300 seconds."
        },
        {
          "input": "hit(300); getHits(300)",
          "output": "4 after the previous hits plus timestamp 300",
          "explanation": "Timestamp 1 is still within the window at 300."
        },
        {
          "input": "getHits(301)",
          "output": "3",
          "explanation": "The hit at timestamp 1 expires."
        }
      ],
      "bruteForceComplexity": "hit Time O(1), getHits Time O(n); Space O(n). Store every timestamp and scan valid hits.",
      "optimizedComplexity": "hit Time O(1), getHits Time O(300); Space O(300). Rolling buckets aggregate timestamps.",
      "recursiveComplexity": "hit Time O(1), getHits Time O(n); Space O(n + stack). Recursive count scans timestamps.",
      "bruteForceCode": "import java.util.*;\n\nclass HitCounter {\n  private final List<Integer> hits = new ArrayList<>();\n\n  public void hit(int timestamp) {\n    hits.add(timestamp);\n  }\n\n  public int getHits(int timestamp) {\n    int count = 0;\n    for (int hit : hits) if (timestamp - hit < 300) count++;\n    return count;\n  }\n}",
      "iterativeCode": "class HitCounter {\n  private final int[] times = new int[300];\n  private final int[] counts = new int[300];\n\n  public void hit(int timestamp) {\n    int index = timestamp % 300;\n    if (times[index] != timestamp) {\n      times[index] = timestamp;\n      counts[index] = 1;\n    } else {\n      counts[index]++;\n    }\n  }\n\n  public int getHits(int timestamp) {\n    int total = 0;\n    for (int i = 0; i < 300; i++) if (timestamp - times[i] < 300) total += counts[i];\n    return total;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass HitCounter {\n  private final List<Integer> hits = new ArrayList<>();\n\n  public void hit(int timestamp) {\n    hits.add(timestamp);\n  }\n\n  public int getHits(int timestamp) {\n    return count(timestamp, hits.size() - 1);\n  }\n\n  private int count(int timestamp, int index) {\n    if (index < 0) return 0;\n    if (timestamp - hits.get(index) >= 300) return count(timestamp, index - 1);\n    return 1 + count(timestamp, index - 1);\n  }\n}",
      "optimizedCode": "class HitCounter {\n  private final int[] times = new int[300];\n  private final int[] counts = new int[300];\n\n  public void hit(int timestamp) {\n    int index = timestamp % 300;\n    if (times[index] != timestamp) {\n      times[index] = timestamp;\n      counts[index] = 1;\n    } else {\n      counts[index]++;\n    }\n  }\n\n  public int getHits(int timestamp) {\n    int total = 0;\n    for (int i = 0; i < 300; i++) if (timestamp - times[i] < 300) total += counts[i];\n    return total;\n  }\n}",
      "code": "class HitCounter {\n  private final int[] times = new int[300];\n  private final int[] counts = new int[300];\n\n  public void hit(int timestamp) {\n    int index = timestamp % 300;\n    if (times[index] != timestamp) {\n      times[index] = timestamp;\n      counts[index] = 1;\n    } else {\n      counts[index]++;\n    }\n  }\n\n  public int getHits(int timestamp) {\n    int total = 0;\n    for (int i = 0; i < 300; i++) if (timestamp - times[i] < 300) total += counts[i];\n    return total;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Browser History",
      "difficulty": "Medium",
      "subpattern": "History cursor with back-forward state",
      "question": "Design BrowserHistory with visit(url), back(steps), and forward(steps). Visiting clears forward history.",
      "trigger": "The object maintains a cursor over a mutable timeline of pages.",
      "intuition": "Use either a list with current index or two stacks for back and forward navigation.",
      "edgeCases": "Back more than available, forward more than available, visit after back clears future, one homepage only, repeated same URL.",
      "constraints": "1 <= url.length <= 20; up to 5000 calls.",
      "source": {
        "label": "Design Browser History - LeetCode 1472",
        "url": "https://leetcode.com/problems/design-browser-history/"
      },
      "examples": [
        {
          "input": "BrowserHistory(\"leetcode.com\"); visit(\"google.com\"); visit(\"facebook.com\"); back(1)",
          "output": "\"google.com\"",
          "explanation": "Back moves the cursor left."
        },
        {
          "input": "forward(1); visit(\"linkedin.com\"); forward(2)",
          "output": "\"facebook.com\", then \"linkedin.com\"",
          "explanation": "Visit clears old forward history."
        },
        {
          "input": "back(10)",
          "output": "homepage if steps exceed history",
          "explanation": "Back stops at the first page."
        }
      ],
      "bruteForceComplexity": "visit Time O(n) in worst case, back/forward Time O(1); Space O(n). List plus cursor and truncate forward pages.",
      "optimizedComplexity": "visit/back/forward Time O(steps); Space O(n). Two stacks model back and forward state.",
      "recursiveComplexity": "visit Time O(n), back/forward Time O(1); Space O(n + stack). Recursive truncation clears forward history.",
      "bruteForceCode": "import java.util.*;\n\nclass BrowserHistory {\n  private final List<String> pages = new ArrayList<>();\n  private int index = 0;\n\n  public BrowserHistory(String homepage) {\n    pages.add(homepage);\n  }\n\n  public void visit(String url) {\n    while (pages.size() > index + 1) pages.remove(pages.size() - 1);\n    pages.add(url);\n    index++;\n  }\n\n  public String back(int steps) {\n    index = Math.max(0, index - steps);\n    return pages.get(index);\n  }\n\n  public String forward(int steps) {\n    index = Math.min(pages.size() - 1, index + steps);\n    return pages.get(index);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass BrowserHistory {\n  private final Deque<String> back = new ArrayDeque<>();\n  private final Deque<String> forward = new ArrayDeque<>();\n  private String current;\n\n  public BrowserHistory(String homepage) {\n    current = homepage;\n  }\n\n  public void visit(String url) {\n    back.push(current);\n    current = url;\n    forward.clear();\n  }\n\n  public String back(int steps) {\n    while (steps-- > 0 && !back.isEmpty()) {\n      forward.push(current);\n      current = back.pop();\n    }\n    return current;\n  }\n\n  public String forward(int steps) {\n    while (steps-- > 0 && !forward.isEmpty()) {\n      back.push(current);\n      current = forward.pop();\n    }\n    return current;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass BrowserHistory {\n  private final List<String> pages = new ArrayList<>();\n  private int index = 0;\n\n  public BrowserHistory(String homepage) {\n    pages.add(homepage);\n  }\n\n  public void visit(String url) {\n    trim();\n    pages.add(url);\n    index++;\n  }\n\n  public String back(int steps) {\n    index = Math.max(0, index - steps);\n    return pages.get(index);\n  }\n\n  public String forward(int steps) {\n    index = Math.min(pages.size() - 1, index + steps);\n    return pages.get(index);\n  }\n\n  private void trim() {\n    if (pages.size() == index + 1) return;\n    pages.remove(pages.size() - 1);\n    trim();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass BrowserHistory {\n  private final Deque<String> back = new ArrayDeque<>();\n  private final Deque<String> forward = new ArrayDeque<>();\n  private String current;\n\n  public BrowserHistory(String homepage) {\n    current = homepage;\n  }\n\n  public void visit(String url) {\n    back.push(current);\n    current = url;\n    forward.clear();\n  }\n\n  public String back(int steps) {\n    while (steps-- > 0 && !back.isEmpty()) {\n      forward.push(current);\n      current = back.pop();\n    }\n    return current;\n  }\n\n  public String forward(int steps) {\n    while (steps-- > 0 && !forward.isEmpty()) {\n      back.push(current);\n      current = forward.pop();\n    }\n    return current;\n  }\n}",
      "code": "import java.util.*;\n\nclass BrowserHistory {\n  private final Deque<String> back = new ArrayDeque<>();\n  private final Deque<String> forward = new ArrayDeque<>();\n  private String current;\n\n  public BrowserHistory(String homepage) {\n    current = homepage;\n  }\n\n  public void visit(String url) {\n    back.push(current);\n    current = url;\n    forward.clear();\n  }\n\n  public String back(int steps) {\n    while (steps-- > 0 && !back.isEmpty()) {\n      forward.push(current);\n      current = back.pop();\n    }\n    return current;\n  }\n\n  public String forward(int steps) {\n    while (steps-- > 0 && !forward.isEmpty()) {\n      back.push(current);\n      current = forward.pop();\n    }\n    return current;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Underground System",
      "difficulty": "Medium",
      "subpattern": "Trip aggregation by route",
      "question": "Design an underground transit system that records check-ins and check-outs, then returns average travel time between station pairs.",
      "trigger": "Trips are stateful: active rider starts must be matched with later exits and aggregated by route.",
      "intuition": "Map active customer id to start station/time, and map route to total duration plus trip count.",
      "edgeCases": "Multiple customers active, same route repeated, different station pairs, same customer after checkout, average as double.",
      "constraints": "Calls are valid; checkOut has a matching checkIn; up to 20000 operations.",
      "source": {
        "label": "Design Underground System - LeetCode 1396",
        "url": "https://leetcode.com/problems/design-underground-system/"
      },
      "examples": [
        {
          "input": "checkIn(45,\"Leyton\",3); checkOut(45,\"Waterloo\",15); getAverageTime(\"Leyton\",\"Waterloo\")",
          "output": "12.0",
          "explanation": "The trip duration is 15 - 3."
        },
        {
          "input": "another Leyton->Waterloo trip of 10 minutes",
          "output": "11.0 average after two trips",
          "explanation": "Average is total duration divided by count."
        },
        {
          "input": "parallel check-ins with different ids",
          "output": "tracked independently",
          "explanation": "Customer id maps each active ride to its own start."
        }
      ],
      "bruteForceComplexity": "checkIn/checkOut Time O(1), getAverageTime Time O(t); Space O(t + active). Store every completed trip and scan routes.",
      "optimizedComplexity": "checkIn/checkOut/getAverageTime Time O(1); Space O(routes + active). Aggregate totals by route key.",
      "recursiveComplexity": "checkIn/checkOut Time O(1), getAverageTime Time O(t); Space O(t + active + stack). Recursive scan computes route average.",
      "bruteForceCode": "import java.util.*;\n\nclass UndergroundSystem {\n  private static class Start {\n    String station;\n    int time;\n    Start(String station, int time) { this.station = station; this.time = time; }\n  }\n\n  private final Map<Integer, Start> active = new HashMap<>();\n  private final List<String[]> trips = new ArrayList<>();\n\n  public void checkIn(int id, String stationName, int t) {\n    active.put(id, new Start(stationName, t));\n  }\n\n  public void checkOut(int id, String stationName, int t) {\n    Start start = active.remove(id);\n    trips.add(new String[]{start.station, stationName, String.valueOf(t - start.time)});\n  }\n\n  public double getAverageTime(String startStation, String endStation) {\n    int total = 0, count = 0;\n    for (String[] trip : trips) {\n      if (trip[0].equals(startStation) && trip[1].equals(endStation)) {\n        total += Integer.parseInt(trip[2]);\n        count++;\n      }\n    }\n    return (double) total / count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass UndergroundSystem {\n  private static class Start {\n    String station;\n    int time;\n    Start(String station, int time) { this.station = station; this.time = time; }\n  }\n\n  private final Map<Integer, Start> active = new HashMap<>();\n  private final Map<String, long[]> stats = new HashMap<>();\n\n  public void checkIn(int id, String stationName, int t) {\n    active.put(id, new Start(stationName, t));\n  }\n\n  public void checkOut(int id, String stationName, int t) {\n    Start start = active.remove(id);\n    String route = start.station + \"#\" + stationName;\n    long[] data = stats.computeIfAbsent(route, ignored -> new long[2]);\n    data[0] += t - start.time;\n    data[1]++;\n  }\n\n  public double getAverageTime(String startStation, String endStation) {\n    long[] data = stats.get(startStation + \"#\" + endStation);\n    return (double) data[0] / data[1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass UndergroundSystem {\n  private static class Start {\n    String station;\n    int time;\n    Start(String station, int time) { this.station = station; this.time = time; }\n  }\n\n  private final Map<Integer, Start> active = new HashMap<>();\n  private final List<String[]> trips = new ArrayList<>();\n\n  public void checkIn(int id, String stationName, int t) {\n    active.put(id, new Start(stationName, t));\n  }\n\n  public void checkOut(int id, String stationName, int t) {\n    Start start = active.remove(id);\n    trips.add(new String[]{start.station, stationName, String.valueOf(t - start.time)});\n  }\n\n  public double getAverageTime(String startStation, String endStation) {\n    long[] result = sum(startStation, endStation, 0, 0, 0);\n    return (double) result[0] / result[1];\n  }\n\n  private long[] sum(String start, String end, int index, long total, long count) {\n    if (index == trips.size()) return new long[]{total, count};\n    String[] trip = trips.get(index);\n    if (trip[0].equals(start) && trip[1].equals(end)) {\n      total += Integer.parseInt(trip[2]);\n      count++;\n    }\n    return sum(start, end, index + 1, total, count);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass UndergroundSystem {\n  private static class Start {\n    String station;\n    int time;\n    Start(String station, int time) { this.station = station; this.time = time; }\n  }\n\n  private final Map<Integer, Start> active = new HashMap<>();\n  private final Map<String, long[]> stats = new HashMap<>();\n\n  public void checkIn(int id, String stationName, int t) {\n    active.put(id, new Start(stationName, t));\n  }\n\n  public void checkOut(int id, String stationName, int t) {\n    Start start = active.remove(id);\n    String route = start.station + \"#\" + stationName;\n    long[] data = stats.computeIfAbsent(route, ignored -> new long[2]);\n    data[0] += t - start.time;\n    data[1]++;\n  }\n\n  public double getAverageTime(String startStation, String endStation) {\n    long[] data = stats.get(startStation + \"#\" + endStation);\n    return (double) data[0] / data[1];\n  }\n}",
      "code": "import java.util.*;\n\nclass UndergroundSystem {\n  private static class Start {\n    String station;\n    int time;\n    Start(String station, int time) { this.station = station; this.time = time; }\n  }\n\n  private final Map<Integer, Start> active = new HashMap<>();\n  private final Map<String, long[]> stats = new HashMap<>();\n\n  public void checkIn(int id, String stationName, int t) {\n    active.put(id, new Start(stationName, t));\n  }\n\n  public void checkOut(int id, String stationName, int t) {\n    Start start = active.remove(id);\n    String route = start.station + \"#\" + stationName;\n    long[] data = stats.computeIfAbsent(route, ignored -> new long[2]);\n    data[0] += t - start.time;\n    data[1]++;\n  }\n\n  public double getAverageTime(String startStation, String endStation) {\n    long[] data = stats.get(startStation + \"#\" + endStation);\n    return (double) data[0] / data[1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Parking System",
      "difficulty": "Easy",
      "subpattern": "Capacity counter design",
      "question": "Design ParkingSystem with fixed counts of big, medium, and small slots. addCar(carType) parks a car if a slot remains.",
      "trigger": "Each operation is just capacity decrement by category.",
      "intuition": "Store remaining slots by car type and decrement only when positive.",
      "edgeCases": "No slots of a type, exactly one slot left, invalid repeated calls after full, independent categories, carType indexing.",
      "constraints": "0 <= big, medium, small <= 1000; carType is 1, 2, or 3; up to 1000 calls.",
      "source": {
        "label": "Design Parking System - LeetCode 1603",
        "url": "https://leetcode.com/problems/design-parking-system/"
      },
      "examples": [
        {
          "input": "ParkingSystem(1,1,0); addCar(1); addCar(2); addCar(3)",
          "output": "true, true, false",
          "explanation": "There is no small slot."
        },
        {
          "input": "addCar(1) again after one big slot used",
          "output": "false",
          "explanation": "The big slot capacity is exhausted."
        },
        {
          "input": "ParkingSystem(0,0,1); addCar(3)",
          "output": "true",
          "explanation": "Small capacity is independent."
        }
      ],
      "bruteForceComplexity": "addCar Time O(1); Space O(1). Store three counters explicitly.",
      "optimizedComplexity": "addCar Time O(1); Space O(1). Store counters in an indexed array.",
      "recursiveComplexity": "addCar Time O(1); Space O(1). Recursive helper applies the decrement by index.",
      "bruteForceCode": "class ParkingSystem {\n  private int big;\n  private int medium;\n  private int small;\n\n  public ParkingSystem(int big, int medium, int small) {\n    this.big = big;\n    this.medium = medium;\n    this.small = small;\n  }\n\n  public boolean addCar(int carType) {\n    if (carType == 1 && big > 0) { big--; return true; }\n    if (carType == 2 && medium > 0) { medium--; return true; }\n    if (carType == 3 && small > 0) { small--; return true; }\n    return false;\n  }\n}",
      "iterativeCode": "class ParkingSystem {\n  private final int[] remaining = new int[4];\n\n  public ParkingSystem(int big, int medium, int small) {\n    remaining[1] = big;\n    remaining[2] = medium;\n    remaining[3] = small;\n  }\n\n  public boolean addCar(int carType) {\n    if (remaining[carType] == 0) return false;\n    remaining[carType]--;\n    return true;\n  }\n}",
      "recursiveCode": "class ParkingSystem {\n  private final int[] remaining = new int[4];\n\n  public ParkingSystem(int big, int medium, int small) {\n    remaining[1] = big;\n    remaining[2] = medium;\n    remaining[3] = small;\n  }\n\n  public boolean addCar(int carType) {\n    return park(carType);\n  }\n\n  private boolean park(int carType) {\n    if (remaining[carType] == 0) return false;\n    remaining[carType]--;\n    return true;\n  }\n}",
      "optimizedCode": "class ParkingSystem {\n  private final int[] remaining = new int[4];\n\n  public ParkingSystem(int big, int medium, int small) {\n    remaining[1] = big;\n    remaining[2] = medium;\n    remaining[3] = small;\n  }\n\n  public boolean addCar(int carType) {\n    if (remaining[carType] == 0) return false;\n    remaining[carType]--;\n    return true;\n  }\n}",
      "code": "class ParkingSystem {\n  private final int[] remaining = new int[4];\n\n  public ParkingSystem(int big, int medium, int small) {\n    remaining[1] = big;\n    remaining[2] = medium;\n    remaining[3] = small;\n  }\n\n  public boolean addCar(int carType) {\n    if (remaining[carType] == 0) return false;\n    remaining[carType]--;\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Design Circular Queue",
      "difficulty": "Medium",
      "subpattern": "Fixed-size circular queue",
      "question": "Design MyCircularQueue with enQueue, deQueue, Front, Rear, isEmpty, and isFull for a fixed-size queue.",
      "trigger": "A bounded FIFO queue needs wraparound without shifting elements.",
      "intuition": "Keep an array, head index, and size; rear is derived from head + size - 1 modulo capacity.",
      "edgeCases": "Capacity one, enqueue when full, dequeue when empty, wraparound after removals, Front/Rear on empty.",
      "constraints": "1 <= k <= 1000; values are integers; up to 3000 calls.",
      "source": {
        "label": "Design Circular Queue - LeetCode 622",
        "url": "https://leetcode.com/problems/design-circular-queue/"
      },
      "examples": [
        {
          "input": "MyCircularQueue(3); enQueue(1); enQueue(2); enQueue(3); enQueue(4)",
          "output": "true,true,true,false",
          "explanation": "The fourth enqueue fails because the queue is full."
        },
        {
          "input": "Rear(); isFull(); deQueue(); enQueue(4); Rear()",
          "output": "3,true,true,true,4",
          "explanation": "After dequeue, wraparound allows inserting 4."
        },
        {
          "input": "Front() on empty",
          "output": "-1",
          "explanation": "Empty queue has no front."
        }
      ],
      "bruteForceComplexity": "enQueue Time O(1), deQueue Time O(n); Space O(k). ArrayList removes from front by shifting.",
      "optimizedComplexity": "All operations Time O(1); Space O(k). Fixed array ring buffer.",
      "recursiveComplexity": "Operations Time O(1); Space O(k). Linked nodes keep front/rear with bounded size.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCircularQueue {\n  private final int capacity;\n  private final List<Integer> list = new ArrayList<>();\n\n  public MyCircularQueue(int k) { capacity = k; }\n  public boolean enQueue(int value) { if (isFull()) return false; list.add(value); return true; }\n  public boolean deQueue() { if (isEmpty()) return false; list.remove(0); return true; }\n  public int Front() { return isEmpty() ? -1 : list.get(0); }\n  public int Rear() { return isEmpty() ? -1 : list.get(list.size() - 1); }\n  public boolean isEmpty() { return list.isEmpty(); }\n  public boolean isFull() { return list.size() == capacity; }\n}",
      "iterativeCode": "class MyCircularQueue {\n  private final int[] data;\n  private int head = 0;\n  private int size = 0;\n\n  public MyCircularQueue(int k) { data = new int[k]; }\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    data[(head + size) % data.length] = value;\n    size++;\n    return true;\n  }\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    head = (head + 1) % data.length;\n    size--;\n    return true;\n  }\n  public int Front() { return isEmpty() ? -1 : data[head]; }\n  public int Rear() { return isEmpty() ? -1 : data[(head + size - 1) % data.length]; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}",
      "recursiveCode": "class MyCircularQueue {\n  private static class Node { int value; Node next; Node(int value) { this.value = value; } }\n  private final int capacity;\n  private int size = 0;\n  private Node head;\n  private Node tail;\n\n  public MyCircularQueue(int k) { capacity = k; }\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    Node node = new Node(value);\n    if (tail != null) tail.next = node;\n    tail = node;\n    if (head == null) head = node;\n    size++;\n    return true;\n  }\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    head = head.next;\n    size--;\n    if (head == null) tail = null;\n    return true;\n  }\n  public int Front() { return isEmpty() ? -1 : head.value; }\n  public int Rear() { return isEmpty() ? -1 : tail.value; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == capacity; }\n}",
      "optimizedCode": "class MyCircularQueue {\n  private final int[] data;\n  private int head = 0;\n  private int size = 0;\n\n  public MyCircularQueue(int k) { data = new int[k]; }\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    data[(head + size) % data.length] = value;\n    size++;\n    return true;\n  }\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    head = (head + 1) % data.length;\n    size--;\n    return true;\n  }\n  public int Front() { return isEmpty() ? -1 : data[head]; }\n  public int Rear() { return isEmpty() ? -1 : data[(head + size - 1) % data.length]; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}",
      "code": "class MyCircularQueue {\n  private final int[] data;\n  private int head = 0;\n  private int size = 0;\n\n  public MyCircularQueue(int k) { data = new int[k]; }\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    data[(head + size) % data.length] = value;\n    size++;\n    return true;\n  }\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    head = (head + 1) % data.length;\n    size--;\n    return true;\n  }\n  public int Front() { return isEmpty() ? -1 : data[head]; }\n  public int Rear() { return isEmpty() ? -1 : data[(head + size - 1) % data.length]; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}"
    },
    {
      "group": "advanced",
      "name": "Design Circular Deque",
      "difficulty": "Medium",
      "subpattern": "Fixed-size circular deque",
      "question": "Design MyCircularDeque supporting insert/delete at both front and rear plus front/rear reads for a fixed capacity.",
      "trigger": "A bounded deque needs O(1) operations at both ends with wraparound.",
      "intuition": "Use a circular array with front index and size; decrement front for insertFront and write at front+size for insertLast.",
      "edgeCases": "Capacity one, wraparound at both ends, delete from empty, insert into full deque, getFront/getRear on empty.",
      "constraints": "1 <= k <= 1000; up to 3000 calls.",
      "source": {
        "label": "Design Circular Deque - LeetCode 641",
        "url": "https://leetcode.com/problems/design-circular-deque/"
      },
      "examples": [
        {
          "input": "MyCircularDeque(3); insertLast(1); insertLast(2); insertFront(3); insertFront(4)",
          "output": "true,true,true,false",
          "explanation": "The fourth insertion fails because the deque is full."
        },
        {
          "input": "getRear(); isFull(); deleteLast(); insertFront(4); getFront()",
          "output": "2,true,true,true,4",
          "explanation": "Both ends update correctly."
        },
        {
          "input": "getFront() on empty",
          "output": "-1",
          "explanation": "Empty deque has no front."
        }
      ],
      "bruteForceComplexity": "insertFront/deleteFront Time O(n), other operations Time O(1); Space O(k). ArrayList shifts front operations.",
      "optimizedComplexity": "All operations Time O(1); Space O(k). Circular array stores both ends.",
      "recursiveComplexity": "All operations Time O(1); Space O(k). Doubly linked nodes track both ends.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCircularDeque {\n  private final int capacity;\n  private final List<Integer> list = new ArrayList<>();\n\n  public MyCircularDeque(int k) { capacity = k; }\n  public boolean insertFront(int value) { if (isFull()) return false; list.add(0, value); return true; }\n  public boolean insertLast(int value) { if (isFull()) return false; list.add(value); return true; }\n  public boolean deleteFront() { if (isEmpty()) return false; list.remove(0); return true; }\n  public boolean deleteLast() { if (isEmpty()) return false; list.remove(list.size() - 1); return true; }\n  public int getFront() { return isEmpty() ? -1 : list.get(0); }\n  public int getRear() { return isEmpty() ? -1 : list.get(list.size() - 1); }\n  public boolean isEmpty() { return list.isEmpty(); }\n  public boolean isFull() { return list.size() == capacity; }\n}",
      "iterativeCode": "class MyCircularDeque {\n  private final int[] data;\n  private int front = 0;\n  private int size = 0;\n\n  public MyCircularDeque(int k) { data = new int[k]; }\n  public boolean insertFront(int value) { if (isFull()) return false; front = (front - 1 + data.length) % data.length; data[front] = value; size++; return true; }\n  public boolean insertLast(int value) { if (isFull()) return false; data[(front + size) % data.length] = value; size++; return true; }\n  public boolean deleteFront() { if (isEmpty()) return false; front = (front + 1) % data.length; size--; return true; }\n  public boolean deleteLast() { if (isEmpty()) return false; size--; return true; }\n  public int getFront() { return isEmpty() ? -1 : data[front]; }\n  public int getRear() { return isEmpty() ? -1 : data[(front + size - 1) % data.length]; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}",
      "recursiveCode": "class MyCircularDeque {\n  private static class Node { int value; Node prev, next; Node(int value) { this.value = value; } }\n  private final int capacity;\n  private int size = 0;\n  private Node head;\n  private Node tail;\n\n  public MyCircularDeque(int k) { capacity = k; }\n  public boolean insertFront(int value) { if (isFull()) return false; Node node = new Node(value); node.next = head; if (head != null) head.prev = node; head = node; if (tail == null) tail = node; size++; return true; }\n  public boolean insertLast(int value) { if (isFull()) return false; Node node = new Node(value); node.prev = tail; if (tail != null) tail.next = node; tail = node; if (head == null) head = node; size++; return true; }\n  public boolean deleteFront() { if (isEmpty()) return false; head = head.next; if (head != null) head.prev = null; else tail = null; size--; return true; }\n  public boolean deleteLast() { if (isEmpty()) return false; tail = tail.prev; if (tail != null) tail.next = null; else head = null; size--; return true; }\n  public int getFront() { return isEmpty() ? -1 : head.value; }\n  public int getRear() { return isEmpty() ? -1 : tail.value; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == capacity; }\n}",
      "optimizedCode": "class MyCircularDeque {\n  private final int[] data;\n  private int front = 0;\n  private int size = 0;\n\n  public MyCircularDeque(int k) { data = new int[k]; }\n  public boolean insertFront(int value) { if (isFull()) return false; front = (front - 1 + data.length) % data.length; data[front] = value; size++; return true; }\n  public boolean insertLast(int value) { if (isFull()) return false; data[(front + size) % data.length] = value; size++; return true; }\n  public boolean deleteFront() { if (isEmpty()) return false; front = (front + 1) % data.length; size--; return true; }\n  public boolean deleteLast() { if (isEmpty()) return false; size--; return true; }\n  public int getFront() { return isEmpty() ? -1 : data[front]; }\n  public int getRear() { return isEmpty() ? -1 : data[(front + size - 1) % data.length]; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}",
      "code": "class MyCircularDeque {\n  private final int[] data;\n  private int front = 0;\n  private int size = 0;\n\n  public MyCircularDeque(int k) { data = new int[k]; }\n  public boolean insertFront(int value) { if (isFull()) return false; front = (front - 1 + data.length) % data.length; data[front] = value; size++; return true; }\n  public boolean insertLast(int value) { if (isFull()) return false; data[(front + size) % data.length] = value; size++; return true; }\n  public boolean deleteFront() { if (isEmpty()) return false; front = (front + 1) % data.length; size--; return true; }\n  public boolean deleteLast() { if (isEmpty()) return false; size--; return true; }\n  public int getFront() { return isEmpty() ? -1 : data[front]; }\n  public int getRear() { return isEmpty() ? -1 : data[(front + size - 1) % data.length]; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}"
    },
    {
      "group": "advanced",
      "name": "Design HashMap",
      "difficulty": "Easy",
      "subpattern": "Separate chaining hash map",
      "question": "Design MyHashMap without using built-in hash table libraries, supporting put, get, and remove.",
      "trigger": "Keys need direct addressable lookup with collision handling.",
      "intuition": "Use bucket indexing by hash and store collisions in linked lists.",
      "edgeCases": "Overwrite existing key, remove missing key, collision keys, key zero, get after remove.",
      "constraints": "0 <= key,value <= 1000000; up to 10000 operations.",
      "source": {
        "label": "Design HashMap - LeetCode 706",
        "url": "https://leetcode.com/problems/design-hashmap/"
      },
      "examples": [
        {
          "input": "put(1,1); put(2,2); get(1); get(3)",
          "output": "1, -1",
          "explanation": "Missing keys return -1."
        },
        {
          "input": "put(2,1); get(2); remove(2); get(2)",
          "output": "1, -1",
          "explanation": "Remove deletes the key."
        },
        {
          "input": "put(1,1); put(1,2); get(1)",
          "output": "2",
          "explanation": "put overwrites existing values."
        }
      ],
      "bruteForceComplexity": "put/get/remove Time O(n); Space O(n). Store key-value pairs in a list.",
      "optimizedComplexity": "Average Time O(1), worst O(n); Space O(bucket count + n). Separate chaining handles collisions.",
      "recursiveComplexity": "Average Time O(1), worst O(n); Space O(bucket count + n + chain stack). Recursive chain operations.",
      "bruteForceCode": "import java.util.*;\n\nclass MyHashMap {\n  private final List<int[]> pairs = new ArrayList<>();\n  public void put(int key, int value) { for (int[] pair : pairs) if (pair[0] == key) { pair[1] = value; return; } pairs.add(new int[]{key, value}); }\n  public int get(int key) { for (int[] pair : pairs) if (pair[0] == key) return pair[1]; return -1; }\n  public void remove(int key) { for (int i = 0; i < pairs.size(); i++) if (pairs.get(i)[0] == key) { pairs.remove(i); return; } }\n}",
      "iterativeCode": "class MyHashMap {\n  private static class Node { int key, value; Node next; Node(int key, int value, Node next) { this.key = key; this.value = value; this.next = next; } }\n  private final Node[] buckets = new Node[1009];\n  public void put(int key, int value) { int i = hash(key); for (Node n = buckets[i]; n != null; n = n.next) if (n.key == key) { n.value = value; return; } buckets[i] = new Node(key, value, buckets[i]); }\n  public int get(int key) { for (Node n = buckets[hash(key)]; n != null; n = n.next) if (n.key == key) return n.value; return -1; }\n  public void remove(int key) { int i = hash(key); Node dummy = new Node(0, 0, buckets[i]); Node p = dummy; while (p.next != null) { if (p.next.key == key) { p.next = p.next.next; break; } p = p.next; } buckets[i] = dummy.next; }\n  private int hash(int key) { return key % buckets.length; }\n}",
      "recursiveCode": "class MyHashMap {\n  private static class Node { int key, value; Node next; Node(int key, int value, Node next) { this.key = key; this.value = value; this.next = next; } }\n  private final Node[] buckets = new Node[1009];\n  public void put(int key, int value) { int i = key % buckets.length; buckets[i] = putNode(buckets[i], key, value); }\n  public int get(int key) { return getNode(buckets[key % buckets.length], key); }\n  public void remove(int key) { int i = key % buckets.length; buckets[i] = removeNode(buckets[i], key); }\n  private Node putNode(Node node, int key, int value) { if (node == null) return new Node(key, value, null); if (node.key == key) { node.value = value; return node; } node.next = putNode(node.next, key, value); return node; }\n  private int getNode(Node node, int key) { if (node == null) return -1; return node.key == key ? node.value : getNode(node.next, key); }\n  private Node removeNode(Node node, int key) { if (node == null) return null; if (node.key == key) return node.next; node.next = removeNode(node.next, key); return node; }\n}",
      "optimizedCode": "class MyHashMap {\n  private static class Node { int key, value; Node next; Node(int key, int value, Node next) { this.key = key; this.value = value; this.next = next; } }\n  private final Node[] buckets = new Node[1009];\n  public void put(int key, int value) { int i = hash(key); for (Node n = buckets[i]; n != null; n = n.next) if (n.key == key) { n.value = value; return; } buckets[i] = new Node(key, value, buckets[i]); }\n  public int get(int key) { for (Node n = buckets[hash(key)]; n != null; n = n.next) if (n.key == key) return n.value; return -1; }\n  public void remove(int key) { int i = hash(key); Node dummy = new Node(0, 0, buckets[i]); Node p = dummy; while (p.next != null) { if (p.next.key == key) { p.next = p.next.next; break; } p = p.next; } buckets[i] = dummy.next; }\n  private int hash(int key) { return key % buckets.length; }\n}",
      "code": "class MyHashMap {\n  private static class Node { int key, value; Node next; Node(int key, int value, Node next) { this.key = key; this.value = value; this.next = next; } }\n  private final Node[] buckets = new Node[1009];\n  public void put(int key, int value) { int i = hash(key); for (Node n = buckets[i]; n != null; n = n.next) if (n.key == key) { n.value = value; return; } buckets[i] = new Node(key, value, buckets[i]); }\n  public int get(int key) { for (Node n = buckets[hash(key)]; n != null; n = n.next) if (n.key == key) return n.value; return -1; }\n  public void remove(int key) { int i = hash(key); Node dummy = new Node(0, 0, buckets[i]); Node p = dummy; while (p.next != null) { if (p.next.key == key) { p.next = p.next.next; break; } p = p.next; } buckets[i] = dummy.next; }\n  private int hash(int key) { return key % buckets.length; }\n}"
    },
    {
      "group": "advanced",
      "name": "Design HashSet",
      "difficulty": "Easy",
      "subpattern": "Separate chaining hash set",
      "question": "Design MyHashSet without using built-in hash table libraries, supporting add, remove, and contains.",
      "trigger": "Set membership needs efficient lookup plus collision handling.",
      "intuition": "Use buckets indexed by hash and linked chains for keys that collide.",
      "edgeCases": "Add duplicate key, remove missing key, contains after remove, key zero, collision keys.",
      "constraints": "0 <= key <= 1000000; up to 10000 operations.",
      "source": {
        "label": "Design HashSet - LeetCode 705",
        "url": "https://leetcode.com/problems/design-hashset/"
      },
      "examples": [
        {
          "input": "add(1); add(2); contains(1); contains(3)",
          "output": "true, false",
          "explanation": "Only added keys are present."
        },
        {
          "input": "add(2); remove(2); contains(2)",
          "output": "false",
          "explanation": "Remove deletes membership."
        },
        {
          "input": "add(1); add(1); contains(1)",
          "output": "true",
          "explanation": "Adding duplicates keeps one set entry."
        }
      ],
      "bruteForceComplexity": "add/remove/contains Time O(n); Space O(n). Store keys in a list and scan.",
      "optimizedComplexity": "Average Time O(1), worst O(n); Space O(bucket count + n). Separate chaining hash set.",
      "recursiveComplexity": "Average Time O(1), worst O(n); Space O(bucket count + n + stack). Recursive chain helpers.",
      "bruteForceCode": "import java.util.*;\n\nclass MyHashSet {\n  private final List<Integer> keys = new ArrayList<>();\n  public void add(int key) { if (!keys.contains(key)) keys.add(key); }\n  public void remove(int key) { keys.remove(Integer.valueOf(key)); }\n  public boolean contains(int key) { return keys.contains(key); }\n}",
      "iterativeCode": "class MyHashSet {\n  private static class Node {\n    int key;\n    Node next;\n    Node(int key, Node next) {\n      this.key = key;\n      this.next = next;\n    }\n  }\n\n  private final Node[] buckets = new Node[1009];\n\n  public void add(int key) {\n    if (contains(key)) return;\n    int index = key % buckets.length;\n    buckets[index] = new Node(key, buckets[index]);\n  }\n\n  public void remove(int key) {\n    int index = key % buckets.length;\n    Node dummy = new Node(0, buckets[index]);\n    Node current = dummy;\n    while (current.next != null) {\n      if (current.next.key == key) {\n        current.next = current.next.next;\n        break;\n      }\n      current = current.next;\n    }\n    buckets[index] = dummy.next;\n  }\n\n  public boolean contains(int key) {\n    Node current = buckets[key % buckets.length];\n    while (current != null) {\n      if (current.key == key) return true;\n      current = current.next;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class MyHashSet {\n  private static class Node { int key; Node next; Node(int key, Node next) { this.key = key; this.next = next; } }\n  private final Node[] buckets = new Node[1009];\n  public void add(int key) { int i = key % buckets.length; if (!has(buckets[i], key)) buckets[i] = new Node(key, buckets[i]); }\n  public void remove(int key) { int i = key % buckets.length; buckets[i] = removeNode(buckets[i], key); }\n  public boolean contains(int key) { return has(buckets[key % buckets.length], key); }\n  private boolean has(Node node, int key) { if (node == null) return false; return node.key == key || has(node.next, key); }\n  private Node removeNode(Node node, int key) { if (node == null) return null; if (node.key == key) return node.next; node.next = removeNode(node.next, key); return node; }\n}",
      "optimizedCode": "class MyHashSet {\n  private static class Node {\n    int key;\n    Node next;\n    Node(int key, Node next) {\n      this.key = key;\n      this.next = next;\n    }\n  }\n\n  private final Node[] buckets = new Node[1009];\n\n  public void add(int key) {\n    if (contains(key)) return;\n    int index = key % buckets.length;\n    buckets[index] = new Node(key, buckets[index]);\n  }\n\n  public void remove(int key) {\n    int index = key % buckets.length;\n    Node dummy = new Node(0, buckets[index]);\n    Node current = dummy;\n    while (current.next != null) {\n      if (current.next.key == key) {\n        current.next = current.next.next;\n        break;\n      }\n      current = current.next;\n    }\n    buckets[index] = dummy.next;\n  }\n\n  public boolean contains(int key) {\n    Node current = buckets[key % buckets.length];\n    while (current != null) {\n      if (current.key == key) return true;\n      current = current.next;\n    }\n    return false;\n  }\n}",
      "code": "class MyHashSet {\n  private static class Node {\n    int key;\n    Node next;\n    Node(int key, Node next) {\n      this.key = key;\n      this.next = next;\n    }\n  }\n\n  private final Node[] buckets = new Node[1009];\n\n  public void add(int key) {\n    if (contains(key)) return;\n    int index = key % buckets.length;\n    buckets[index] = new Node(key, buckets[index]);\n  }\n\n  public void remove(int key) {\n    int index = key % buckets.length;\n    Node dummy = new Node(0, buckets[index]);\n    Node current = dummy;\n    while (current.next != null) {\n      if (current.next.key == key) {\n        current.next = current.next.next;\n        break;\n      }\n      current = current.next;\n    }\n    buckets[index] = dummy.next;\n  }\n\n  public boolean contains(int key) {\n    Node current = buckets[key % buckets.length];\n    while (current != null) {\n      if (current.key == key) return true;\n      current = current.next;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Implement Trie",
      "difficulty": "Medium",
      "subpattern": "Trie prefix tree",
      "question": "Design Trie with insert(word), search(word), and startsWith(prefix) for lowercase words.",
      "trigger": "Prefix queries need shared character paths rather than scanning all words.",
      "intuition": "Each node has child pointers for next characters and a flag marking complete words.",
      "edgeCases": "Search prefix that is not a word, duplicate inserts, single-character words, missing branch, word extends another word.",
      "constraints": "word and prefix consist of lowercase English letters; up to 30000 operations.",
      "source": {
        "label": "Implement Trie - LeetCode 208",
        "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
      },
      "examples": [
        {
          "input": "insert(\"apple\"); search(\"apple\"); search(\"app\"); startsWith(\"app\")",
          "output": "true,false,true",
          "explanation": "A prefix is not a word until inserted."
        },
        {
          "input": "insert(\"app\"); search(\"app\")",
          "output": "true",
          "explanation": "The end marker distinguishes words."
        },
        {
          "input": "startsWith(\"z\")",
          "output": "false",
          "explanation": "Missing child means prefix absent."
        }
      ],
      "bruteForceComplexity": "insert Time O(1) average, search Time O(1) average, startsWith Time O(total words * prefix length); Space O(total characters). HashSet plus prefix scan.",
      "optimizedComplexity": "insert/search/startsWith Time O(length); Space O(total characters). Iterative trie traversal.",
      "recursiveComplexity": "insert/search/startsWith Time O(length); Space O(total characters + length stack). Recursive trie traversal.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n  public void insert(String word) { words.add(word); }\n  public boolean search(String word) { return words.contains(word); }\n  public boolean startsWith(String prefix) { for (String word : words) if (word.startsWith(prefix)) return true; return false; }\n}",
      "iterativeCode": "class Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n  public void insert(String word) { Node node = root; for (char ch : word.toCharArray()) { int i = ch - 'a'; if (node.next[i] == null) node.next[i] = new Node(); node = node.next[i]; } node.word = true; }\n  public boolean search(String word) { Node node = walk(word); return node != null && node.word; }\n  public boolean startsWith(String prefix) { return walk(prefix) != null; }\n  private Node walk(String s) { Node node = root; for (char ch : s.toCharArray()) { node = node.next[ch - 'a']; if (node == null) return null; } return node; }\n}",
      "recursiveCode": "class Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { Node node = walk(root, word, 0); return node != null && node.word; }\n  public boolean startsWith(String prefix) { return walk(root, prefix, 0) != null; }\n  private void insert(Node node, String word, int index) { if (index == word.length()) { node.word = true; return; } int i = word.charAt(index) - 'a'; if (node.next[i] == null) node.next[i] = new Node(); insert(node.next[i], word, index + 1); }\n  private Node walk(Node node, String value, int index) { if (node == null) return null; if (index == value.length()) return node; return walk(node.next[value.charAt(index) - 'a'], value, index + 1); }\n}",
      "optimizedCode": "class Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n  public void insert(String word) { Node node = root; for (char ch : word.toCharArray()) { int i = ch - 'a'; if (node.next[i] == null) node.next[i] = new Node(); node = node.next[i]; } node.word = true; }\n  public boolean search(String word) { Node node = walk(word); return node != null && node.word; }\n  public boolean startsWith(String prefix) { return walk(prefix) != null; }\n  private Node walk(String s) { Node node = root; for (char ch : s.toCharArray()) { node = node.next[ch - 'a']; if (node == null) return null; } return node; }\n}",
      "code": "class Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n  public void insert(String word) { Node node = root; for (char ch : word.toCharArray()) { int i = ch - 'a'; if (node.next[i] == null) node.next[i] = new Node(); node = node.next[i]; } node.word = true; }\n  public boolean search(String word) { Node node = walk(word); return node != null && node.word; }\n  public boolean startsWith(String prefix) { return walk(prefix) != null; }\n  private Node walk(String s) { Node node = root; for (char ch : s.toCharArray()) { node = node.next[ch - 'a']; if (node == null) return null; } return node; }\n}"
    },
    {
      "group": "advanced",
      "name": "Design Add and Search Words Data Structure",
      "difficulty": "Medium",
      "subpattern": "Wildcard trie search",
      "question": "Design WordDictionary with addWord(word) and search(word), where search may contain dot wildcards matching any letter.",
      "trigger": "Wildcard positions require branching across trie children.",
      "intuition": "Use a trie for stored words and DFS when a dot appears.",
      "edgeCases": "Search with only dots, word length mismatch, missing branch, duplicate words, wildcard at first or last character.",
      "constraints": "Words contain lowercase English letters; search may contain dots; up to 10000 calls.",
      "source": {
        "label": "Design Add and Search Words Data Structure - LeetCode 211",
        "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
      },
      "examples": [
        {
          "input": "addWord(\"bad\"); addWord(\"dad\"); addWord(\"mad\"); search(\"pad\"); search(\"bad\")",
          "output": "false,true",
          "explanation": "Exact search works through trie paths."
        },
        {
          "input": "search(\".ad\"); search(\"b..\")",
          "output": "true,true",
          "explanation": "Dots branch across matching children."
        },
        {
          "input": "search(\"...\")",
          "output": "true",
          "explanation": "Any stored three-letter word matches."
        }
      ],
      "bruteForceComplexity": "addWord Time O(1), search Time O(words * length); Space O(total characters). Scan all words and match dots.",
      "optimizedComplexity": "addWord Time O(length), search worst O(26^dots * length); Space O(total characters). Iterative trie DFS with stack.",
      "recursiveComplexity": "addWord Time O(length), search worst O(26^dots * length); Space O(total characters + length stack). Recursive trie DFS.",
      "bruteForceCode": "import java.util.*;\n\nclass WordDictionary {\n  private final List<String> words = new ArrayList<>();\n  public void addWord(String word) { words.add(word); }\n  public boolean search(String word) { for (String stored : words) if (matches(stored, word)) return true; return false; }\n  private boolean matches(String stored, String pattern) { if (stored.length() != pattern.length()) return false; for (int i = 0; i < stored.length(); i++) if (pattern.charAt(i) != '.' && stored.charAt(i) != pattern.charAt(i)) return false; return true; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass WordDictionary {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private static class State { Node node; int index; State(Node node, int index) { this.node = node; this.index = index; } }\n  private final Node root = new Node();\n  public void addWord(String word) { Node node = root; for (char ch : word.toCharArray()) { int i = ch - 'a'; if (node.next[i] == null) node.next[i] = new Node(); node = node.next[i]; } node.word = true; }\n  public boolean search(String word) { Deque<State> stack = new ArrayDeque<>(); stack.push(new State(root, 0)); while (!stack.isEmpty()) { State state = stack.pop(); if (state.index == word.length()) { if (state.node.word) return true; continue; } char ch = word.charAt(state.index); if (ch == '.') { for (Node child : state.node.next) if (child != null) stack.push(new State(child, state.index + 1)); } else { Node child = state.node.next[ch - 'a']; if (child != null) stack.push(new State(child, state.index + 1)); } } return false; }\n}",
      "recursiveCode": "class WordDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void addWord(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    return dfs(root, word, 0);\n  }\n\n  private boolean dfs(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    char ch = word.charAt(index);\n    if (ch != '.') return dfs(node.next[ch - 'a'], word, index + 1);\n    for (Node child : node.next) {\n      if (dfs(child, word, index + 1)) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass WordDictionary {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private static class State { Node node; int index; State(Node node, int index) { this.node = node; this.index = index; } }\n  private final Node root = new Node();\n  public void addWord(String word) { Node node = root; for (char ch : word.toCharArray()) { int i = ch - 'a'; if (node.next[i] == null) node.next[i] = new Node(); node = node.next[i]; } node.word = true; }\n  public boolean search(String word) { Deque<State> stack = new ArrayDeque<>(); stack.push(new State(root, 0)); while (!stack.isEmpty()) { State state = stack.pop(); if (state.index == word.length()) { if (state.node.word) return true; continue; } char ch = word.charAt(state.index); if (ch == '.') { for (Node child : state.node.next) if (child != null) stack.push(new State(child, state.index + 1)); } else { Node child = state.node.next[ch - 'a']; if (child != null) stack.push(new State(child, state.index + 1)); } } return false; }\n}",
      "code": "import java.util.*;\n\nclass WordDictionary {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private static class State { Node node; int index; State(Node node, int index) { this.node = node; this.index = index; } }\n  private final Node root = new Node();\n  public void addWord(String word) { Node node = root; for (char ch : word.toCharArray()) { int i = ch - 'a'; if (node.next[i] == null) node.next[i] = new Node(); node = node.next[i]; } node.word = true; }\n  public boolean search(String word) { Deque<State> stack = new ArrayDeque<>(); stack.push(new State(root, 0)); while (!stack.isEmpty()) { State state = stack.pop(); if (state.index == word.length()) { if (state.node.word) return true; continue; } char ch = word.charAt(state.index); if (ch == '.') { for (Node child : state.node.next) if (child != null) stack.push(new State(child, state.index + 1)); } else { Node child = state.node.next[ch - 'a']; if (child != null) stack.push(new State(child, state.index + 1)); } } return false; }\n}"
    },
    {
      "group": "advanced",
      "name": "Snapshot Array",
      "difficulty": "Medium",
      "subpattern": "Versioned array snapshots",
      "question": "Design SnapshotArray with set(index,val), snap(), and get(index,snap_id), where get returns the value at that snapshot.",
      "trigger": "Each index has historical versions and queries need the latest value at or before a snapshot id.",
      "intuition": "Store per-index pairs of snapshot id and value, and binary search by snap id.",
      "edgeCases": "Unset values default to 0, multiple sets before same snap, get old snapshot after later updates, length one, repeated snap without set.",
      "constraints": "1 <= length <= 50000; up to 50000 operations; snap_id is valid.",
      "source": {
        "label": "Snapshot Array - LeetCode 1146",
        "url": "https://leetcode.com/problems/snapshot-array/"
      },
      "examples": [
        {
          "input": "SnapshotArray(3); set(0,5); snap(); set(0,6); get(0,0)",
          "output": "5",
          "explanation": "Snapshot 0 captured value 5."
        },
        {
          "input": "get(1,0) after no set",
          "output": "0",
          "explanation": "Unset indexes default to zero."
        },
        {
          "input": "set(0,1); set(0,2); snap(); get(0,0)",
          "output": "2",
          "explanation": "The last set before snap wins."
        }
      ],
      "bruteForceComplexity": "set Time O(1), snap Time O(n), get Time O(1); Space O(length * snapshots). Copy the full array on every snap.",
      "optimizedComplexity": "set Time O(1), snap Time O(1), get Time O(log versions); Space O(total sets + length). Per-index version lists.",
      "recursiveComplexity": "set Time O(1), snap Time O(1), get Time O(log versions); Space O(total sets + length + log versions). Recursive binary search.",
      "bruteForceCode": "import java.util.*;\n\nclass SnapshotArray {\n  private final int[] current;\n  private final List<int[]> snapshots = new ArrayList<>();\n  public SnapshotArray(int length) { current = new int[length]; }\n  public void set(int index, int val) { current[index] = val; }\n  public int snap() { snapshots.add(current.clone()); return snapshots.size() - 1; }\n  public int get(int index, int snap_id) { return snapshots.get(snap_id)[index]; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass SnapshotArray {\n  private int snapId = 0;\n  private final List<int[]>[] history;\n  public SnapshotArray(int length) { history = new ArrayList[length]; for (int i = 0; i < length; i++) { history[i] = new ArrayList<>(); history[i].add(new int[]{0, 0}); } }\n  public void set(int index, int val) { List<int[]> list = history[index]; if (list.get(list.size() - 1)[0] == snapId) list.get(list.size() - 1)[1] = val; else list.add(new int[]{snapId, val}); }\n  public int snap() { return snapId++; }\n  public int get(int index, int snap_id) { List<int[]> list = history[index]; int left = 0, right = list.size() - 1, answer = 0; while (left <= right) { int mid = left + (right - left) / 2; if (list.get(mid)[0] <= snap_id) { answer = list.get(mid)[1]; left = mid + 1; } else right = mid - 1; } return answer; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SnapshotArray {\n  private int snapId = 0;\n  private final List<int[]>[] history;\n  public SnapshotArray(int length) { history = new ArrayList[length]; for (int i = 0; i < length; i++) { history[i] = new ArrayList<>(); history[i].add(new int[]{0, 0}); } }\n  public void set(int index, int val) { List<int[]> list = history[index]; if (list.get(list.size() - 1)[0] == snapId) list.get(list.size() - 1)[1] = val; else list.add(new int[]{snapId, val}); }\n  public int snap() { return snapId++; }\n  public int get(int index, int snap_id) { return search(history[index], snap_id, 0, history[index].size() - 1, 0); }\n  private int search(List<int[]> list, int snapId, int left, int right, int answer) { if (left > right) return answer; int mid = left + (right - left) / 2; if (list.get(mid)[0] <= snapId) return search(list, snapId, mid + 1, right, list.get(mid)[1]); return search(list, snapId, left, mid - 1, answer); }\n}",
      "optimizedCode": "import java.util.*;\n\nclass SnapshotArray {\n  private int snapId = 0;\n  private final List<int[]>[] history;\n  public SnapshotArray(int length) { history = new ArrayList[length]; for (int i = 0; i < length; i++) { history[i] = new ArrayList<>(); history[i].add(new int[]{0, 0}); } }\n  public void set(int index, int val) { List<int[]> list = history[index]; if (list.get(list.size() - 1)[0] == snapId) list.get(list.size() - 1)[1] = val; else list.add(new int[]{snapId, val}); }\n  public int snap() { return snapId++; }\n  public int get(int index, int snap_id) { List<int[]> list = history[index]; int left = 0, right = list.size() - 1, answer = 0; while (left <= right) { int mid = left + (right - left) / 2; if (list.get(mid)[0] <= snap_id) { answer = list.get(mid)[1]; left = mid + 1; } else right = mid - 1; } return answer; }\n}",
      "code": "import java.util.*;\n\nclass SnapshotArray {\n  private int snapId = 0;\n  private final List<int[]>[] history;\n  public SnapshotArray(int length) { history = new ArrayList[length]; for (int i = 0; i < length; i++) { history[i] = new ArrayList<>(); history[i].add(new int[]{0, 0}); } }\n  public void set(int index, int val) { List<int[]> list = history[index]; if (list.get(list.size() - 1)[0] == snapId) list.get(list.size() - 1)[1] = val; else list.add(new int[]{snapId, val}); }\n  public int snap() { return snapId++; }\n  public int get(int index, int snap_id) { List<int[]> list = history[index]; int left = 0, right = list.size() - 1, answer = 0; while (left <= right) { int mid = left + (right - left) / 2; if (list.get(mid)[0] <= snap_id) { answer = list.get(mid)[1]; left = mid + 1; } else right = mid - 1; } return answer; }\n}"
    },
    {
      "group": "advanced",
      "name": "My Calendar I",
      "difficulty": "Medium",
      "subpattern": "Interval booking without overlap",
      "question": "Design MyCalendar with book(start,end), returning true if the half-open interval [start,end) can be added without overlapping an existing booking.",
      "trigger": "Each new interval only conflicts with its predecessor or successor after ordering by start.",
      "intuition": "Keep bookings ordered by start and check nearest intervals around the new start.",
      "edgeCases": "Touching endpoints, exact duplicate interval, interval inside existing, existing inside new, first booking.",
      "constraints": "0 <= start < end <= 1000000000; up to 1000 calls.",
      "source": {
        "label": "My Calendar I - LeetCode 729",
        "url": "https://leetcode.com/problems/my-calendar-i/"
      },
      "examples": [
        {
          "input": "book(10,20); book(15,25); book(20,30)",
          "output": "true,false,true",
          "explanation": "[15,25) overlaps but [20,30) only touches."
        },
        {
          "input": "book(5,10); book(1,5)",
          "output": "true,true",
          "explanation": "Touching at 5 is allowed."
        },
        {
          "input": "book(5,10); book(6,7)",
          "output": "true,false",
          "explanation": "Nested interval overlaps."
        }
      ],
      "bruteForceComplexity": "book Time O(n); Space O(n). Scan all intervals for overlap.",
      "optimizedComplexity": "book Time O(log n); Space O(n). TreeMap checks predecessor and successor starts.",
      "recursiveComplexity": "Average book Time O(log n), worst O(n); Space O(n). Binary-search-tree insertion checks overlaps recursively.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCalendar {\n  private final List<int[]> intervals = new ArrayList<>();\n\n  public boolean book(int start, int end) {\n    for (int[] interval : intervals) {\n      if (start < interval[1] && interval[0] < end) return false;\n    }\n    intervals.add(new int[]{start, end});\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MyCalendar {\n  private final TreeMap<Integer, Integer> calendar = new TreeMap<>();\n\n  public boolean book(int start, int end) {\n    Integer previous = calendar.floorKey(start);\n    if (previous != null && calendar.get(previous) > start) return false;\n    Integer next = calendar.ceilingKey(start);\n    if (next != null && next < end) return false;\n    calendar.put(start, end);\n    return true;\n  }\n}",
      "recursiveCode": "class MyCalendar {\n  private static class Node {\n    int start;\n    int end;\n    Node left;\n    Node right;\n    Node(int start, int end) {\n      this.start = start;\n      this.end = end;\n    }\n  }\n\n  private Node root;\n\n  public boolean book(int start, int end) {\n    if (root == null) {\n      root = new Node(start, end);\n      return true;\n    }\n    return insert(root, start, end);\n  }\n\n  private boolean insert(Node node, int start, int end) {\n    if (end <= node.start) {\n      if (node.left == null) {\n        node.left = new Node(start, end);\n        return true;\n      }\n      return insert(node.left, start, end);\n    }\n    if (start >= node.end) {\n      if (node.right == null) {\n        node.right = new Node(start, end);\n        return true;\n      }\n      return insert(node.right, start, end);\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MyCalendar {\n  private final TreeMap<Integer, Integer> calendar = new TreeMap<>();\n\n  public boolean book(int start, int end) {\n    Integer previous = calendar.floorKey(start);\n    if (previous != null && calendar.get(previous) > start) return false;\n    Integer next = calendar.ceilingKey(start);\n    if (next != null && next < end) return false;\n    calendar.put(start, end);\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass MyCalendar {\n  private final TreeMap<Integer, Integer> calendar = new TreeMap<>();\n\n  public boolean book(int start, int end) {\n    Integer previous = calendar.floorKey(start);\n    if (previous != null && calendar.get(previous) > start) return false;\n    Integer next = calendar.ceilingKey(start);\n    if (next != null && next < end) return false;\n    calendar.put(start, end);\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "My Calendar II",
      "difficulty": "Medium",
      "subpattern": "Double-booking calendar sweep",
      "question": "Design MyCalendarTwo with book(start,end), allowing double bookings but rejecting any booking that would create a triple booking.",
      "trigger": "The object must detect whether a new interval overlaps an already double-booked segment.",
      "intuition": "Track all single bookings and all pairwise overlaps; reject if the new interval intersects an overlap.",
      "edgeCases": "Touching endpoints, partial overlap with one booking, overlap with a double-booked segment, nested intervals, repeated booking.",
      "constraints": "0 <= start < end <= 1000000000; up to 1000 calls.",
      "source": {
        "label": "My Calendar II - LeetCode 731",
        "url": "https://leetcode.com/problems/my-calendar-ii/"
      },
      "examples": [
        {
          "input": "book(10,20); book(50,60); book(10,40); book(5,15)",
          "output": "true,true,true,false",
          "explanation": "[5,15) would triple-book [10,15)."
        },
        {
          "input": "book(5,10); book(10,15)",
          "output": "true,true",
          "explanation": "Touching endpoints do not overlap."
        },
        {
          "input": "book(25,55) after the sample prefix",
          "output": "true",
          "explanation": "It overlaps some singles but does not create a triple."
        }
      ],
      "bruteForceComplexity": "book Time O(n^2); Space O(n). Tentatively add and sweep all boundary deltas to detect active count three.",
      "optimizedComplexity": "book Time O(n); Space O(n). Store bookings and double-booked overlaps.",
      "recursiveComplexity": "book Time O(n); Space O(n + stack). Recursively scans overlaps and adds new pairwise intersections.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public boolean book(int start, int end) {\n    bookings.add(new int[]{start, end});\n    TreeMap<Integer, Integer> delta = new TreeMap<>();\n    for (int[] booking : bookings) {\n      delta.put(booking[0], delta.getOrDefault(booking[0], 0) + 1);\n      delta.put(booking[1], delta.getOrDefault(booking[1], 0) - 1);\n    }\n    int active = 0;\n    for (int change : delta.values()) {\n      active += change;\n      if (active >= 3) {\n        bookings.remove(bookings.size() - 1);\n        return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public boolean book(int start, int end) {\n    for (int[] overlap : overlaps) if (start < overlap[1] && overlap[0] < end) return false;\n    for (int[] booking : bookings) {\n      int left = Math.max(start, booking[0]);\n      int right = Math.min(end, booking[1]);\n      if (left < right) overlaps.add(new int[]{left, right});\n    }\n    bookings.add(new int[]{start, end});\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public boolean book(int start, int end) {\n    if (hitsOverlap(start, end, 0)) return false;\n    addOverlaps(start, end, 0);\n    bookings.add(new int[]{start, end});\n    return true;\n  }\n\n  private boolean hitsOverlap(int start, int end, int index) {\n    if (index == overlaps.size()) return false;\n    int[] overlap = overlaps.get(index);\n    if (start < overlap[1] && overlap[0] < end) return true;\n    return hitsOverlap(start, end, index + 1);\n  }\n\n  private void addOverlaps(int start, int end, int index) {\n    if (index == bookings.size()) return;\n    int[] booking = bookings.get(index);\n    int left = Math.max(start, booking[0]);\n    int right = Math.min(end, booking[1]);\n    if (left < right) overlaps.add(new int[]{left, right});\n    addOverlaps(start, end, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public boolean book(int start, int end) {\n    for (int[] overlap : overlaps) if (start < overlap[1] && overlap[0] < end) return false;\n    for (int[] booking : bookings) {\n      int left = Math.max(start, booking[0]);\n      int right = Math.min(end, booking[1]);\n      if (left < right) overlaps.add(new int[]{left, right});\n    }\n    bookings.add(new int[]{start, end});\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public boolean book(int start, int end) {\n    for (int[] overlap : overlaps) if (start < overlap[1] && overlap[0] < end) return false;\n    for (int[] booking : bookings) {\n      int left = Math.max(start, booking[0]);\n      int right = Math.min(end, booking[1]);\n      if (left < right) overlaps.add(new int[]{left, right});\n    }\n    bookings.add(new int[]{start, end});\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "My Calendar III",
      "difficulty": "Hard",
      "subpattern": "Maximum-overlap calendar sweep",
      "question": "Design MyCalendarThree with book(start,end), returning the maximum number of overlapping events after adding the booking.",
      "trigger": "Every booking changes a sweep-line active count and the API asks for the current maximum overlap.",
      "intuition": "Add +1 at start and -1 at end, then sweep ordered boundaries to compute the max active count.",
      "edgeCases": "Touching endpoints, nested intervals, many identical intervals, disjoint intervals, increasing max over time.",
      "constraints": "0 <= start < end <= 1000000000; up to 400 calls.",
      "source": {
        "label": "My Calendar III - LeetCode 732",
        "url": "https://leetcode.com/problems/my-calendar-iii/"
      },
      "examples": [
        {
          "input": "book(10,20); book(50,60); book(10,40)",
          "output": "1,1,2",
          "explanation": "The third booking overlaps [10,20)."
        },
        {
          "input": "book(5,15); book(5,10); book(25,55)",
          "output": "3,3,3 after sample continuation",
          "explanation": "The maximum overlap reaches three."
        },
        {
          "input": "book(1,2); book(2,3)",
          "output": "1,1",
          "explanation": "Touching half-open intervals do not overlap."
        }
      ],
      "bruteForceComplexity": "book Time O(n^2); Space O(n). Store intervals and count active bookings at every start boundary.",
      "optimizedComplexity": "book Time O(n); Space O(n). Ordered sweep map recomputes max active count after each update.",
      "recursiveComplexity": "book Time O(n^2); Space O(n + stack). Recursive scan evaluates active count at each start boundary.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public int book(int start, int end) {\n    bookings.add(new int[]{start, end});\n    int best = 0;\n    for (int[] point : bookings) {\n      int active = 0;\n      int time = point[0];\n      for (int[] booking : bookings) if (booking[0] <= time && time < booking[1]) active++;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public int book(int start, int end) {\n    bookings.add(new int[]{start, end});\n    return bestAt(0, 0);\n  }\n\n  private int bestAt(int index, int best) {\n    if (index == bookings.size()) return best;\n    int time = bookings.get(index)[0];\n    int active = countActive(time, 0);\n    return bestAt(index + 1, Math.max(best, active));\n  }\n\n  private int countActive(int time, int index) {\n    if (index == bookings.size()) return 0;\n    int[] booking = bookings.get(index);\n    int current = booking[0] <= time && time < booking[1] ? 1 : 0;\n    return current + countActive(time, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Range Module",
      "difficulty": "Hard",
      "subpattern": "Dynamic interval range tracking",
      "question": "Design RangeModule with addRange, queryRange, and removeRange over half-open intervals [left,right).",
      "trigger": "The object maintains a dynamic union of intervals and must merge, split, and query coverage.",
      "intuition": "Store disjoint covered intervals ordered by start; add merges overlaps and remove splits affected intervals.",
      "edgeCases": "Touching ranges, removing middle of an interval, querying uncovered gap, adding across many intervals, repeated add/remove.",
      "constraints": "1 <= left < right <= 1000000000; up to 10000 operations.",
      "source": {
        "label": "Range Module - LeetCode 715",
        "url": "https://leetcode.com/problems/range-module/"
      },
      "examples": [
        {
          "input": "addRange(10,20); removeRange(14,16); queryRange(10,14); queryRange(13,15)",
          "output": "true,false",
          "explanation": "[14,16) was removed."
        },
        {
          "input": "queryRange(16,17)",
          "output": "true",
          "explanation": "The right remaining segment is still covered."
        },
        {
          "input": "addRange(5,10); addRange(8,12)",
          "output": "merged [5,12)",
          "explanation": "Overlapping adds merge coverage."
        }
      ],
      "bruteForceComplexity": "add/remove Time O(n log n), query Time O(n); Space O(n). Maintain a list and sort/merge after add.",
      "optimizedComplexity": "add/remove/query Time O(k log n) for affected intervals; Space O(n). TreeMap stores disjoint intervals.",
      "recursiveComplexity": "add/remove/query Time O(n); Space O(n + stack). Recursive list processing merges and splits intervals.",
      "bruteForceCode": "import java.util.*;\n\nclass RangeModule {\n  private final List<int[]> ranges = new ArrayList<>();\n  public void addRange(int left, int right) { ranges.add(new int[]{left, right}); ranges.sort((a, b) -> Integer.compare(a[0], b[0])); List<int[]> merged = new ArrayList<>(); for (int[] range : ranges) { if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < range[0]) merged.add(range); else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], range[1]); } ranges.clear(); ranges.addAll(merged); }\n  public boolean queryRange(int left, int right) { for (int[] range : ranges) if (range[0] <= left && right <= range[1]) return true; return false; }\n  public void removeRange(int left, int right) { List<int[]> next = new ArrayList<>(); for (int[] range : ranges) { if (range[1] <= left || right <= range[0]) next.add(range); else { if (range[0] < left) next.add(new int[]{range[0], left}); if (right < range[1]) next.add(new int[]{right, range[1]}); } } ranges.clear(); ranges.addAll(next); }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n  public void addRange(int left, int right) { Integer start = ranges.floorKey(left); if (start != null && ranges.get(start) >= left) { left = start; right = Math.max(right, ranges.remove(start)); } Integer next = ranges.ceilingKey(left); while (next != null && next <= right) { right = Math.max(right, ranges.remove(next)); next = ranges.ceilingKey(left); } ranges.put(left, right); }\n  public boolean queryRange(int left, int right) { Integer start = ranges.floorKey(left); return start != null && ranges.get(start) >= right; }\n  public void removeRange(int left, int right) { Integer start = ranges.floorKey(left); if (start != null && ranges.get(start) > left) { int end = ranges.get(start); ranges.put(start, left); if (end > right) ranges.put(right, end); } Integer next = ranges.ceilingKey(left); while (next != null && next < right) { int end = ranges.remove(next); if (end > right) { ranges.put(right, end); break; } next = ranges.ceilingKey(left); } }\n}",
      "recursiveCode": "import java.util.*;\n\nclass RangeModule {\n  private final List<int[]> ranges = new ArrayList<>();\n  public void addRange(int left, int right) { ranges.add(new int[]{left, right}); ranges.sort((a, b) -> Integer.compare(a[0], b[0])); List<int[]> merged = new ArrayList<>(); mergeInto(0, merged); ranges.clear(); ranges.addAll(merged); }\n  public boolean queryRange(int left, int right) { return query(left, right, 0); }\n  public void removeRange(int left, int right) { List<int[]> next = new ArrayList<>(); removeInto(left, right, 0, next); ranges.clear(); ranges.addAll(next); }\n  private void mergeInto(int index, List<int[]> merged) { if (index == ranges.size()) return; int[] range = ranges.get(index); if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < range[0]) merged.add(new int[]{range[0], range[1]}); else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], range[1]); mergeInto(index + 1, merged); }\n  private boolean query(int left, int right, int index) { if (index == ranges.size()) return false; int[] range = ranges.get(index); return (range[0] <= left && right <= range[1]) || query(left, right, index + 1); }\n  private void removeInto(int left, int right, int index, List<int[]> next) { if (index == ranges.size()) return; int[] range = ranges.get(index); if (range[1] <= left || right <= range[0]) next.add(range); else { if (range[0] < left) next.add(new int[]{range[0], left}); if (right < range[1]) next.add(new int[]{right, range[1]}); } removeInto(left, right, index + 1, next); }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n  public void addRange(int left, int right) { Integer start = ranges.floorKey(left); if (start != null && ranges.get(start) >= left) { left = start; right = Math.max(right, ranges.remove(start)); } Integer next = ranges.ceilingKey(left); while (next != null && next <= right) { right = Math.max(right, ranges.remove(next)); next = ranges.ceilingKey(left); } ranges.put(left, right); }\n  public boolean queryRange(int left, int right) { Integer start = ranges.floorKey(left); return start != null && ranges.get(start) >= right; }\n  public void removeRange(int left, int right) { Integer start = ranges.floorKey(left); if (start != null && ranges.get(start) > left) { int end = ranges.get(start); ranges.put(start, left); if (end > right) ranges.put(right, end); } Integer next = ranges.ceilingKey(left); while (next != null && next < right) { int end = ranges.remove(next); if (end > right) { ranges.put(right, end); break; } next = ranges.ceilingKey(left); } }\n}",
      "code": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n  public void addRange(int left, int right) { Integer start = ranges.floorKey(left); if (start != null && ranges.get(start) >= left) { left = start; right = Math.max(right, ranges.remove(start)); } Integer next = ranges.ceilingKey(left); while (next != null && next <= right) { right = Math.max(right, ranges.remove(next)); next = ranges.ceilingKey(left); } ranges.put(left, right); }\n  public boolean queryRange(int left, int right) { Integer start = ranges.floorKey(left); return start != null && ranges.get(start) >= right; }\n  public void removeRange(int left, int right) { Integer start = ranges.floorKey(left); if (start != null && ranges.get(start) > left) { int end = ranges.get(start); ranges.put(start, left); if (end > right) ranges.put(right, end); } Integer next = ranges.ceilingKey(left); while (next != null && next < right) { int end = ranges.remove(next); if (end > right) { ranges.put(right, end); break; } next = ranges.ceilingKey(left); } }\n}"
    },
    {
      "group": "more-practice",
      "name": "Flatten Nested List Iterator",
      "difficulty": "Medium",
      "subpattern": "Lazy nested-list iterator",
      "question": "Design NestedIterator that flattens a nested list of integers and supports next() and hasNext().",
      "trigger": "The input is recursively nested, but the API must expose a flat iterator.",
      "intuition": "Either flatten eagerly in the constructor or lazily expand lists on a stack when hasNext is called.",
      "edgeCases": "Empty nested lists, deeply nested single integer, consecutive empty lists, hasNext called repeatedly, next after hasNext.",
      "constraints": "Nested lists contain integers or lists; method calls are valid when next is used.",
      "source": {
        "label": "Flatten Nested List Iterator - LeetCode 341",
        "url": "https://leetcode.com/problems/flatten-nested-list-iterator/"
      },
      "examples": [
        {
          "input": "nestedList = [[1,1],2,[1,1]]",
          "output": "1,1,2,1,1",
          "explanation": "The iterator returns all integers in DFS order."
        },
        {
          "input": "nestedList = [1,[4,[6]]]",
          "output": "1,4,6",
          "explanation": "Nested lists are recursively expanded."
        },
        {
          "input": "nestedList = [[]]",
          "output": "empty iterator",
          "explanation": "Empty lists contribute no values."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(n), next/hasNext Time O(1); Space O(n). Eagerly flatten every integer.",
      "optimizedComplexity": "Constructor Time O(k), hasNext amortized O(1), next O(1); Space O(depth). Lazy stack expansion.",
      "recursiveComplexity": "Constructor Time O(n), next/hasNext Time O(1); Space O(n + depth). Recursive flatten fills a queue.",
      "bruteForceCode": "import java.util.*;\n\ninterface NestedInteger {\n  boolean isInteger();\n  Integer getInteger();\n  List<NestedInteger> getList();\n}\n\nclass NestedIterator implements Iterator<Integer> {\n  private final List<Integer> values = new ArrayList<>();\n  private int index = 0;\n  public NestedIterator(List<NestedInteger> nestedList) { flatten(nestedList); }\n  private void flatten(List<NestedInteger> list) { for (NestedInteger item : list) { if (item.isInteger()) values.add(item.getInteger()); else flatten(item.getList()); } }\n  public Integer next() { return values.get(index++); }\n  public boolean hasNext() { return index < values.size(); }\n}",
      "iterativeCode": "import java.util.*;\n\ninterface NestedInteger {\n  boolean isInteger();\n  Integer getInteger();\n  List<NestedInteger> getList();\n}\n\nclass NestedIterator implements Iterator<Integer> {\n  private final Deque<NestedInteger> stack = new ArrayDeque<>();\n  public NestedIterator(List<NestedInteger> nestedList) { for (int i = nestedList.size() - 1; i >= 0; i--) stack.push(nestedList.get(i)); }\n  public Integer next() { hasNext(); return stack.pop().getInteger(); }\n  public boolean hasNext() { while (!stack.isEmpty() && !stack.peek().isInteger()) { List<NestedInteger> list = stack.pop().getList(); for (int i = list.size() - 1; i >= 0; i--) stack.push(list.get(i)); } return !stack.isEmpty(); }\n}",
      "recursiveCode": "import java.util.*;\n\ninterface NestedInteger {\n  boolean isInteger();\n  Integer getInteger();\n  List<NestedInteger> getList();\n}\n\nclass NestedIterator implements Iterator<Integer> {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  public NestedIterator(List<NestedInteger> nestedList) { addAll(nestedList, 0); }\n  private void addAll(List<NestedInteger> list, int index) { if (index == list.size()) return; NestedInteger item = list.get(index); if (item.isInteger()) queue.offer(item.getInteger()); else addAll(item.getList(), 0); addAll(list, index + 1); }\n  public Integer next() { return queue.poll(); }\n  public boolean hasNext() { return !queue.isEmpty(); }\n}",
      "optimizedCode": "import java.util.*;\n\ninterface NestedInteger {\n  boolean isInteger();\n  Integer getInteger();\n  List<NestedInteger> getList();\n}\n\nclass NestedIterator implements Iterator<Integer> {\n  private final Deque<NestedInteger> stack = new ArrayDeque<>();\n  public NestedIterator(List<NestedInteger> nestedList) { for (int i = nestedList.size() - 1; i >= 0; i--) stack.push(nestedList.get(i)); }\n  public Integer next() { hasNext(); return stack.pop().getInteger(); }\n  public boolean hasNext() { while (!stack.isEmpty() && !stack.peek().isInteger()) { List<NestedInteger> list = stack.pop().getList(); for (int i = list.size() - 1; i >= 0; i--) stack.push(list.get(i)); } return !stack.isEmpty(); }\n}",
      "code": "import java.util.*;\n\ninterface NestedInteger {\n  boolean isInteger();\n  Integer getInteger();\n  List<NestedInteger> getList();\n}\n\nclass NestedIterator implements Iterator<Integer> {\n  private final Deque<NestedInteger> stack = new ArrayDeque<>();\n  public NestedIterator(List<NestedInteger> nestedList) { for (int i = nestedList.size() - 1; i >= 0; i--) stack.push(nestedList.get(i)); }\n  public Integer next() { hasNext(); return stack.pop().getInteger(); }\n  public boolean hasNext() { while (!stack.isEmpty() && !stack.peek().isInteger()) { List<NestedInteger> list = stack.pop().getList(); for (int i = list.size() - 1; i >= 0; i--) stack.push(list.get(i)); } return !stack.isEmpty(); }\n}"
    },
    {
      "group": "more-practice",
      "name": "Peeking Iterator",
      "difficulty": "Medium",
      "subpattern": "Cached peeking iterator",
      "question": "Design PeekingIterator wrapping an Iterator<Integer>, supporting peek() without advancing plus next() and hasNext().",
      "trigger": "peek needs to reveal the next value while preserving iterator state.",
      "intuition": "Cache one lookahead value and consume it only when next() is called.",
      "edgeCases": "Multiple peek calls, peek then next, iterator with one element, hasNext after consuming all, mixed next/peek sequence.",
      "constraints": "All next and peek calls are valid; underlying iterator contains integers.",
      "source": {
        "label": "Peeking Iterator - LeetCode 284",
        "url": "https://leetcode.com/problems/peeking-iterator/"
      },
      "examples": [
        {
          "input": "iterator [1,2,3]; next(); peek(); next(); next(); hasNext()",
          "output": "1,2,2,3,false",
          "explanation": "peek returns 2 without consuming it."
        },
        {
          "input": "peek(); peek(); next()",
          "output": "same first value twice, then consumed",
          "explanation": "Repeated peek is stable."
        },
        {
          "input": "single element iterator; peek(); hasNext(); next(); hasNext()",
          "output": "value,true,value,false",
          "explanation": "The cached value still counts as next."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(n), peek/next/hasNext Time O(1); Space O(n). Copy the iterator into a list.",
      "optimizedComplexity": "Constructor Time O(1), peek/next/hasNext Time O(1); Space O(1). Keep one cached value.",
      "recursiveComplexity": "Constructor Time O(n), peek/next/hasNext Time O(1); Space O(n + stack). Recursively drains the iterator into a queue.",
      "bruteForceCode": "import java.util.*;\n\nclass PeekingIterator implements Iterator<Integer> {\n  private final List<Integer> values = new ArrayList<>();\n  private int index = 0;\n  public PeekingIterator(Iterator<Integer> iterator) { while (iterator.hasNext()) values.add(iterator.next()); }\n  public Integer peek() { return values.get(index); }\n  public Integer next() { return values.get(index++); }\n  public boolean hasNext() { return index < values.size(); }\n}",
      "iterativeCode": "import java.util.*;\n\nclass PeekingIterator implements Iterator<Integer> {\n  private final Iterator<Integer> iterator;\n  private Integer next;\n  public PeekingIterator(Iterator<Integer> iterator) { this.iterator = iterator; if (iterator.hasNext()) next = iterator.next(); }\n  public Integer peek() { return next; }\n  public Integer next() { Integer answer = next; next = iterator.hasNext() ? iterator.next() : null; return answer; }\n  public boolean hasNext() { return next != null; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass PeekingIterator implements Iterator<Integer> {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n  public PeekingIterator(Iterator<Integer> iterator) { drain(iterator); }\n  private void drain(Iterator<Integer> iterator) { if (!iterator.hasNext()) return; queue.offer(iterator.next()); drain(iterator); }\n  public Integer peek() { return queue.peek(); }\n  public Integer next() { return queue.poll(); }\n  public boolean hasNext() { return !queue.isEmpty(); }\n}",
      "optimizedCode": "import java.util.*;\n\nclass PeekingIterator implements Iterator<Integer> {\n  private final Iterator<Integer> iterator;\n  private Integer next;\n  public PeekingIterator(Iterator<Integer> iterator) { this.iterator = iterator; if (iterator.hasNext()) next = iterator.next(); }\n  public Integer peek() { return next; }\n  public Integer next() { Integer answer = next; next = iterator.hasNext() ? iterator.next() : null; return answer; }\n  public boolean hasNext() { return next != null; }\n}",
      "code": "import java.util.*;\n\nclass PeekingIterator implements Iterator<Integer> {\n  private final Iterator<Integer> iterator;\n  private Integer next;\n  public PeekingIterator(Iterator<Integer> iterator) { this.iterator = iterator; if (iterator.hasNext()) next = iterator.next(); }\n  public Integer peek() { return next; }\n  public Integer next() { Integer answer = next; next = iterator.hasNext() ? iterator.next() : null; return answer; }\n  public boolean hasNext() { return next != null; }\n}"
    },
    {
      "group": "more-practice",
      "name": "Flatten 2D Vector",
      "difficulty": "Medium",
      "subpattern": "2D vector flattening cursor",
      "question": "Design Vector2D with next() and hasNext() to flatten a 2D integer vector row by row.",
      "trigger": "The API needs a cursor across rows with possible empty rows.",
      "intuition": "Maintain row and column pointers and advance past empty rows before reading.",
      "edgeCases": "Empty outer array, empty inner rows, one element, repeated hasNext calls, next after advancing rows.",
      "constraints": "The vector may contain empty rows; next is called only when a next element exists.",
      "source": {
        "label": "Flatten 2D Vector - LeetCode 251",
        "url": "https://leetcode.com/problems/flatten-2d-vector/"
      },
      "examples": [
        {
          "input": "vec = [[1,2],[3],[],[4]]; next calls",
          "output": "1,2,3,4",
          "explanation": "Rows are flattened in order and empty rows are skipped."
        },
        {
          "input": "vec = [[],[1]]",
          "output": "1",
          "explanation": "Initial empty rows are skipped."
        },
        {
          "input": "vec = []",
          "output": "hasNext() = false",
          "explanation": "No elements exist."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(n), next/hasNext Time O(1); Space O(n). Eagerly flatten values.",
      "optimizedComplexity": "Constructor Time O(1), next amortized O(1), hasNext amortized O(1); Space O(1). Row/column cursor skips empty rows.",
      "recursiveComplexity": "Constructor Time O(1), next/hasNext amortized O(1); Space O(row skip stack). Recursive advance skips empty rows.",
      "bruteForceCode": "import java.util.*;\n\nclass Vector2D {\n  private final List<Integer> values = new ArrayList<>();\n  private int index = 0;\n  public Vector2D(int[][] vec) { for (int[] row : vec) for (int value : row) values.add(value); }\n  public int next() { return values.get(index++); }\n  public boolean hasNext() { return index < values.size(); }\n}",
      "iterativeCode": "class Vector2D {\n  private final int[][] vec;\n  private int row = 0;\n  private int col = 0;\n  public Vector2D(int[][] vec) { this.vec = vec; }\n  public int next() { hasNext(); return vec[row][col++]; }\n  public boolean hasNext() { while (row < vec.length && col == vec[row].length) { row++; col = 0; } return row < vec.length; }\n}",
      "recursiveCode": "class Vector2D {\n  private final int[][] vec;\n  private int row = 0;\n  private int col = 0;\n  public Vector2D(int[][] vec) { this.vec = vec; }\n  public int next() { hasNext(); return vec[row][col++]; }\n  public boolean hasNext() { advance(); return row < vec.length; }\n  private void advance() { if (row == vec.length || col < vec[row].length) return; row++; col = 0; advance(); }\n}",
      "optimizedCode": "class Vector2D {\n  private final int[][] vec;\n  private int row = 0;\n  private int col = 0;\n  public Vector2D(int[][] vec) { this.vec = vec; }\n  public int next() { hasNext(); return vec[row][col++]; }\n  public boolean hasNext() { while (row < vec.length && col == vec[row].length) { row++; col = 0; } return row < vec.length; }\n}",
      "code": "class Vector2D {\n  private final int[][] vec;\n  private int row = 0;\n  private int col = 0;\n  public Vector2D(int[][] vec) { this.vec = vec; }\n  public int next() { hasNext(); return vec[row][col++]; }\n  public boolean hasNext() { while (row < vec.length && col == vec[row].length) { row++; col = 0; } return row < vec.length; }\n}"
    },
    {
      "group": "more-practice",
      "name": "Serialize and Deserialize Binary Tree",
      "difficulty": "Hard",
      "subpattern": "Binary tree serialization codec",
      "question": "Design Codec with serialize(root) and deserialize(data) for a binary tree, preserving exact tree structure.",
      "trigger": "Tree shape must be encoded along with node values, including null children.",
      "intuition": "Preorder with null markers can reconstruct the tree by consuming tokens in the same order.",
      "edgeCases": "Empty tree, single node, negative values, skewed tree, duplicate values.",
      "constraints": "Node values fit int; the codec only needs to be consistent with itself.",
      "source": {
        "label": "Serialize and Deserialize Binary Tree - LeetCode 297",
        "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,null,null,4,5]",
          "output": "deserializes to the same tree",
          "explanation": "Null markers preserve missing children."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "The null marker reconstructs an empty tree."
        },
        {
          "input": "root = [-1]",
          "output": "[-1]",
          "explanation": "Negative values are preserved as tokens."
        }
      ],
      "bruteForceComplexity": "serialize/deserialze Time O(n); Space O(n). Level-order encoding with null markers.",
      "optimizedComplexity": "serialize/deserialze Time O(n); Space O(n). Iterative preorder with explicit stack and null markers.",
      "recursiveComplexity": "serialize/deserialze Time O(n); Space O(n + height). Recursive preorder consumes tokens.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n  TreeNode(int x) { val = x; }\n}\n\nclass Codec {\n  public String serialize(TreeNode root) {\n    if (root == null) return \"#\";\n    StringBuilder out = new StringBuilder();\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      if (node == null) { out.append(\"#, \"); continue; }\n      out.append(node.val).append(\", \");\n      queue.offer(node.left);\n      queue.offer(node.right);\n    }\n    return out.toString();\n  }\n\n  public TreeNode deserialize(String data) {\n    String[] tokens = data.split(\", \");\n    if (tokens[0].equals(\"#\")) return null;\n    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    int index = 1;\n    while (!queue.isEmpty() && index < tokens.length) {\n      TreeNode node = queue.poll();\n      if (!tokens[index].equals(\"#\")) { node.left = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.left); }\n      index++;\n      if (index < tokens.length && !tokens[index].equals(\"#\")) { node.right = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.right); }\n      index++;\n    }\n    return root;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n  TreeNode(int x) { val = x; }\n}\n\nclass Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder out = new StringBuilder();\n    Deque<TreeNode> stack = new LinkedList<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      if (node == null) { out.append(\"#, \"); continue; }\n      out.append(node.val).append(\", \");\n      stack.push(node.right);\n      stack.push(node.left);\n    }\n    return out.toString();\n  }\n\n  public TreeNode deserialize(String data) {\n    String[] tokens = data.split(\", \");\n    int[] index = {0};\n    return build(tokens, index);\n  }\n\n  private TreeNode build(String[] tokens, int[] index) {\n    String token = tokens[index[0]++];\n    if (token.equals(\"#\")) return null;\n    TreeNode node = new TreeNode(Integer.parseInt(token));\n    node.left = build(tokens, index);\n    node.right = build(tokens, index);\n    return node;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n  TreeNode(int x) { val = x; }\n}\n\nclass Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder out = new StringBuilder();\n    write(root, out);\n    return out.toString();\n  }\n\n  private void write(TreeNode node, StringBuilder out) {\n    if (node == null) { out.append(\"#, \"); return; }\n    out.append(node.val).append(\", \");\n    write(node.left, out);\n    write(node.right, out);\n  }\n\n  public TreeNode deserialize(String data) {\n    String[] tokens = data.split(\", \");\n    return read(tokens, new int[]{0});\n  }\n\n  private TreeNode read(String[] tokens, int[] index) {\n    String token = tokens[index[0]++];\n    if (token.equals(\"#\")) return null;\n    TreeNode node = new TreeNode(Integer.parseInt(token));\n    node.left = read(tokens, index);\n    node.right = read(tokens, index);\n    return node;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n  TreeNode(int x) { val = x; }\n}\n\nclass Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder out = new StringBuilder();\n    Deque<TreeNode> stack = new LinkedList<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      if (node == null) { out.append(\"#, \"); continue; }\n      out.append(node.val).append(\", \");\n      stack.push(node.right);\n      stack.push(node.left);\n    }\n    return out.toString();\n  }\n\n  public TreeNode deserialize(String data) {\n    String[] tokens = data.split(\", \");\n    int[] index = {0};\n    return build(tokens, index);\n  }\n\n  private TreeNode build(String[] tokens, int[] index) {\n    String token = tokens[index[0]++];\n    if (token.equals(\"#\")) return null;\n    TreeNode node = new TreeNode(Integer.parseInt(token));\n    node.left = build(tokens, index);\n    node.right = build(tokens, index);\n    return node;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n  TreeNode(int x) { val = x; }\n}\n\nclass Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder out = new StringBuilder();\n    Deque<TreeNode> stack = new LinkedList<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      if (node == null) { out.append(\"#, \"); continue; }\n      out.append(node.val).append(\", \");\n      stack.push(node.right);\n      stack.push(node.left);\n    }\n    return out.toString();\n  }\n\n  public TreeNode deserialize(String data) {\n    String[] tokens = data.split(\", \");\n    int[] index = {0};\n    return build(tokens, index);\n  }\n\n  private TreeNode build(String[] tokens, int[] index) {\n    String token = tokens[index[0]++];\n    if (token.equals(\"#\")) return null;\n    TreeNode node = new TreeNode(Integer.parseInt(token));\n    node.left = build(tokens, index);\n    node.right = build(tokens, index);\n    return node;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Design File System",
      "difficulty": "Medium",
      "subpattern": "Path trie file system",
      "question": "Design FileSystem with createPath(path,value) and get(path). A path can be created only if its parent exists and it does not already exist.",
      "trigger": "Paths are hierarchical strings, so parent existence and child traversal matter.",
      "intuition": "Split paths by slash and store components in a trie, with values on created nodes.",
      "edgeCases": "Creating root-level path, missing parent, duplicate path, getting missing path, multi-level path.",
      "constraints": "Path starts with / and does not end with /; values are positive; up to 10000 calls.",
      "source": {
        "label": "Design File System - LeetCode 1166",
        "url": "https://leetcode.com/problems/design-file-system/"
      },
      "examples": [
        {
          "input": "createPath(\"/a\",1); get(\"/a\")",
          "output": "true,1",
          "explanation": "Root-level path can be created."
        },
        {
          "input": "createPath(\"/c/d\",1)",
          "output": "false",
          "explanation": "Parent /c does not exist."
        },
        {
          "input": "createPath(\"/a\",2)",
          "output": "false",
          "explanation": "Existing paths cannot be recreated."
        }
      ],
      "bruteForceComplexity": "createPath/get Time O(path length); Space O(paths). Hash map stores full path strings.",
      "optimizedComplexity": "createPath/get Time O(components); Space O(total path components). Trie nodes model the hierarchy.",
      "recursiveComplexity": "createPath/get Time O(components); Space O(total path components + component stack). Recursive trie traversal.",
      "bruteForceCode": "import java.util.*;\n\nclass FileSystem {\n  private final Map<String, Integer> values = new HashMap<>();\n\n  public boolean createPath(String path, int value) {\n    if (values.containsKey(path)) return false;\n    int cut = path.lastIndexOf('/');\n    String parent = path.substring(0, cut);\n    if (!parent.isEmpty() && !values.containsKey(parent)) return false;\n    values.put(path, value);\n    return true;\n  }\n\n  public int get(String path) {\n    return values.getOrDefault(path, -1);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node { Map<String, Node> children = new HashMap<>(); int value = -1; }\n  private final Node root = new Node();\n  public boolean createPath(String path, int value) { String[] parts = path.substring(1).split(\"/\"); Node node = root; for (int i = 0; i < parts.length - 1; i++) { node = node.children.get(parts[i]); if (node == null) return false; } if (node.children.containsKey(parts[parts.length - 1])) return false; Node child = new Node(); child.value = value; node.children.put(parts[parts.length - 1], child); return true; }\n  public int get(String path) { String[] parts = path.substring(1).split(\"/\"); Node node = root; for (String part : parts) { node = node.children.get(part); if (node == null) return -1; } return node.value; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node { Map<String, Node> children = new HashMap<>(); int value = -1; }\n  private final Node root = new Node();\n  public boolean createPath(String path, int value) { String[] parts = path.substring(1).split(\"/\"); return create(root, parts, 0, value); }\n  public int get(String path) { String[] parts = path.substring(1).split(\"/\"); Node node = find(root, parts, 0); return node == null ? -1 : node.value; }\n  private boolean create(Node node, String[] parts, int index, int value) { if (index == parts.length - 1) { if (node.children.containsKey(parts[index])) return false; Node child = new Node(); child.value = value; node.children.put(parts[index], child); return true; } Node child = node.children.get(parts[index]); return child != null && create(child, parts, index + 1, value); }\n  private Node find(Node node, String[] parts, int index) { if (node == null) return null; if (index == parts.length) return node; return find(node.children.get(parts[index]), parts, index + 1); }\n}",
      "optimizedCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node { Map<String, Node> children = new HashMap<>(); int value = -1; }\n  private final Node root = new Node();\n  public boolean createPath(String path, int value) { String[] parts = path.substring(1).split(\"/\"); Node node = root; for (int i = 0; i < parts.length - 1; i++) { node = node.children.get(parts[i]); if (node == null) return false; } if (node.children.containsKey(parts[parts.length - 1])) return false; Node child = new Node(); child.value = value; node.children.put(parts[parts.length - 1], child); return true; }\n  public int get(String path) { String[] parts = path.substring(1).split(\"/\"); Node node = root; for (String part : parts) { node = node.children.get(part); if (node == null) return -1; } return node.value; }\n}",
      "code": "import java.util.*;\n\nclass FileSystem {\n  private static class Node { Map<String, Node> children = new HashMap<>(); int value = -1; }\n  private final Node root = new Node();\n  public boolean createPath(String path, int value) { String[] parts = path.substring(1).split(\"/\"); Node node = root; for (int i = 0; i < parts.length - 1; i++) { node = node.children.get(parts[i]); if (node == null) return false; } if (node.children.containsKey(parts[parts.length - 1])) return false; Node child = new Node(); child.value = value; node.children.put(parts[parts.length - 1], child); return true; }\n  public int get(String path) { String[] parts = path.substring(1).split(\"/\"); Node node = root; for (String part : parts) { node = node.children.get(part); if (node == null) return -1; } return node.value; }\n}"
    },
    {
      "group": "more-practice",
      "name": "Design Search Autocomplete System",
      "difficulty": "Hard",
      "subpattern": "Autocomplete trie with hot ranking",
      "question": "Design AutocompleteSystem. For each input character, return up to three historical sentences matching the current prefix, ranked by hotness then lexicographic order; # commits the current sentence.",
      "trigger": "Prefix search must combine trie traversal with top-k ranking by frequency and lexicographic tie.",
      "intuition": "Store sentence counts and current prefix; filter or trie-collect candidates, then sort by count descending and sentence ascending.",
      "edgeCases": "Input #, missing prefix, lexicographic ties, same sentence committed multiple times, spaces inside sentences.",
      "constraints": "Sentences contain lowercase letters and spaces; times are positive; return at most 3 suggestions.",
      "source": {
        "label": "Design Search Autocomplete System - LeetCode 642",
        "url": "https://leetcode.com/problems/design-search-autocomplete-system/"
      },
      "examples": [
        {
          "input": "sentences=[\"i love you\",\"island\",\"iroman\",\"i love leetcode\"], times=[5,3,2,2]; input(\"i\")",
          "output": "[\"i love you\",\"island\",\"i love leetcode\"]",
          "explanation": "Top matches are ranked by hotness then lexicographic order."
        },
        {
          "input": "input(\" \"); input(\"a\")",
          "output": "matches prefix \"i \", then []",
          "explanation": "Current prefix is accumulated across calls."
        },
        {
          "input": "input(\"#\")",
          "output": "[]",
          "explanation": "# stores the current sentence and clears the prefix."
        }
      ],
      "bruteForceComplexity": "input Time O(S log S * L); Space O(total sentence length). Scan all sentences for each prefix.",
      "optimizedComplexity": "input Time O(P + C log C); Space O(total characters). Trie narrows candidates by prefix before ranking.",
      "recursiveComplexity": "input Time O(P + C log C); Space O(total characters + DFS stack). Recursive trie collection gathers candidates.",
      "bruteForceCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private final Map<String, Integer> counts = new HashMap<>();\n  private final StringBuilder prefix = new StringBuilder();\n  public AutocompleteSystem(String[] sentences, int[] times) { for (int i = 0; i < sentences.length; i++) counts.put(sentences[i], times[i]); }\n  public List<String> input(char c) { if (c == '#') { String sentence = prefix.toString(); counts.put(sentence, counts.getOrDefault(sentence, 0) + 1); prefix.setLength(0); return new ArrayList<>(); } prefix.append(c); List<String> candidates = new ArrayList<>(); for (String sentence : counts.keySet()) if (sentence.startsWith(prefix.toString())) candidates.add(sentence); candidates.sort((a, b) -> counts.get(a).equals(counts.get(b)) ? a.compareTo(b) : counts.get(b) - counts.get(a)); return candidates.subList(0, Math.min(3, candidates.size())); }\n}",
      "iterativeCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private static class Node { Map<Character, Node> next = new HashMap<>(); Map<String, Integer> counts = new HashMap<>(); }\n  private final Node root = new Node();\n  private final StringBuilder prefix = new StringBuilder();\n  public AutocompleteSystem(String[] sentences, int[] times) { for (int i = 0; i < sentences.length; i++) add(sentences[i], times[i]); }\n  public List<String> input(char c) { if (c == '#') { add(prefix.toString(), 1); prefix.setLength(0); return new ArrayList<>(); } prefix.append(c); Node node = root; for (int i = 0; i < prefix.length(); i++) { node = node.next.get(prefix.charAt(i)); if (node == null) return new ArrayList<>(); } final Node current = node; List<String> list = new ArrayList<>(current.counts.keySet()); list.sort((a, b) -> current.counts.get(a).equals(current.counts.get(b)) ? a.compareTo(b) : current.counts.get(b) - current.counts.get(a)); return list.subList(0, Math.min(3, list.size())); }\n  private void add(String sentence, int count) { Node node = root; for (char ch : sentence.toCharArray()) { node = node.next.computeIfAbsent(ch, ignored -> new Node()); node.counts.put(sentence, node.counts.getOrDefault(sentence, 0) + count); } }\n}",
      "recursiveCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private final Map<String, Integer> counts = new HashMap<>();\n  private final StringBuilder prefix = new StringBuilder();\n  public AutocompleteSystem(String[] sentences, int[] times) { for (int i = 0; i < sentences.length; i++) counts.put(sentences[i], times[i]); }\n  public List<String> input(char c) { if (c == '#') { String sentence = prefix.toString(); counts.put(sentence, counts.getOrDefault(sentence, 0) + 1); prefix.setLength(0); return new ArrayList<>(); } prefix.append(c); List<String> candidates = new ArrayList<>(); collect(new ArrayList<>(counts.keySet()), 0, prefix.toString(), candidates); candidates.sort((a, b) -> counts.get(a).equals(counts.get(b)) ? a.compareTo(b) : counts.get(b) - counts.get(a)); return candidates.subList(0, Math.min(3, candidates.size())); }\n  private void collect(List<String> sentences, int index, String target, List<String> out) { if (index == sentences.size()) return; String sentence = sentences.get(index); if (sentence.startsWith(target)) out.add(sentence); collect(sentences, index + 1, target, out); }\n}",
      "optimizedCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private static class Node { Map<Character, Node> next = new HashMap<>(); Map<String, Integer> counts = new HashMap<>(); }\n  private final Node root = new Node();\n  private final StringBuilder prefix = new StringBuilder();\n  public AutocompleteSystem(String[] sentences, int[] times) { for (int i = 0; i < sentences.length; i++) add(sentences[i], times[i]); }\n  public List<String> input(char c) { if (c == '#') { add(prefix.toString(), 1); prefix.setLength(0); return new ArrayList<>(); } prefix.append(c); Node node = root; for (int i = 0; i < prefix.length(); i++) { node = node.next.get(prefix.charAt(i)); if (node == null) return new ArrayList<>(); } final Node current = node; List<String> list = new ArrayList<>(current.counts.keySet()); list.sort((a, b) -> current.counts.get(a).equals(current.counts.get(b)) ? a.compareTo(b) : current.counts.get(b) - current.counts.get(a)); return list.subList(0, Math.min(3, list.size())); }\n  private void add(String sentence, int count) { Node node = root; for (char ch : sentence.toCharArray()) { node = node.next.computeIfAbsent(ch, ignored -> new Node()); node.counts.put(sentence, node.counts.getOrDefault(sentence, 0) + count); } }\n}",
      "code": "import java.util.*;\n\nclass AutocompleteSystem {\n  private static class Node { Map<Character, Node> next = new HashMap<>(); Map<String, Integer> counts = new HashMap<>(); }\n  private final Node root = new Node();\n  private final StringBuilder prefix = new StringBuilder();\n  public AutocompleteSystem(String[] sentences, int[] times) { for (int i = 0; i < sentences.length; i++) add(sentences[i], times[i]); }\n  public List<String> input(char c) { if (c == '#') { add(prefix.toString(), 1); prefix.setLength(0); return new ArrayList<>(); } prefix.append(c); Node node = root; for (int i = 0; i < prefix.length(); i++) { node = node.next.get(prefix.charAt(i)); if (node == null) return new ArrayList<>(); } final Node current = node; List<String> list = new ArrayList<>(current.counts.keySet()); list.sort((a, b) -> current.counts.get(a).equals(current.counts.get(b)) ? a.compareTo(b) : current.counts.get(b) - current.counts.get(a)); return list.subList(0, Math.min(3, list.size())); }\n  private void add(String sentence, int count) { Node node = root; for (char ch : sentence.toCharArray()) { node = node.next.computeIfAbsent(ch, ignored -> new Node()); node.counts.put(sentence, node.counts.getOrDefault(sentence, 0) + count); } }\n}"
    },
    {
      "group": "more-practice",
      "name": "All O(1) Data Structure",
      "difficulty": "Hard",
      "subpattern": "Frequency bucket all-one structure",
      "question": "Design AllOne supporting inc, dec, getMaxKey, and getMinKey in O(1) average time.",
      "trigger": "Keys move between frequency counts and the API needs any key at current min and max counts.",
      "intuition": "Use a doubly linked list of count buckets and a map from key to its current bucket.",
      "edgeCases": "Increment new key, decrement to zero removes key, empty structure, moving between adjacent buckets, min/max after bucket deletion.",
      "constraints": "Keys are non-empty lowercase strings; dec is called only on existing keys; up to 50000 operations.",
      "source": {
        "label": "All O(1) Data Structure - LeetCode 432",
        "url": "https://leetcode.com/problems/all-oone-data-structure/"
      },
      "examples": [
        {
          "input": "inc(\"hello\"); inc(\"hello\"); getMaxKey(); getMinKey()",
          "output": "\"hello\", \"hello\"",
          "explanation": "Only one key exists."
        },
        {
          "input": "inc(\"leet\"); getMaxKey(); getMinKey()",
          "output": "\"hello\", \"leet\"",
          "explanation": "hello has count 2 and leet has count 1."
        },
        {
          "input": "dec(\"hello\"); dec(\"hello\")",
          "output": "hello removed after reaching zero",
          "explanation": "Keys with count zero leave the structure."
        }
      ],
      "bruteForceComplexity": "inc/dec Time O(1), getMaxKey/getMinKey Time O(n); Space O(n). Scan key counts for min and max.",
      "optimizedComplexity": "All operations O(1) average; Space O(n). Count buckets in a doubly linked list with key-to-bucket map.",
      "recursiveComplexity": "inc/dec Time O(1), getMaxKey/getMinKey Time O(n); Space O(n + stack). Recursive key scan finds min/max.",
      "bruteForceCode": "import java.util.*;\n\nclass AllOne {\n  private final Map<String, Integer> count = new HashMap<>();\n  public void inc(String key) { count.put(key, count.getOrDefault(key, 0) + 1); }\n  public void dec(String key) { int next = count.get(key) - 1; if (next == 0) count.remove(key); else count.put(key, next); }\n  public String getMaxKey() { String best = \"\"; for (String key : count.keySet()) if (best.equals(\"\") || count.get(key) > count.get(best)) best = key; return best; }\n  public String getMinKey() { String best = \"\"; for (String key : count.keySet()) if (best.equals(\"\") || count.get(key) < count.get(best)) best = key; return best; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass AllOne {\n  private static class Bucket {\n    int count;\n    Set<String> keys = new LinkedHashSet<>();\n    Bucket prev, next;\n    Bucket(int count) { this.count = count; }\n  }\n  private final Bucket head = new Bucket(0);\n  private final Bucket tail = new Bucket(0);\n  private final Map<String, Bucket> keyBucket = new HashMap<>();\n  public AllOne() { head.next = tail; tail.prev = head; }\n  public void inc(String key) { if (!keyBucket.containsKey(key)) { Bucket bucket = head.next.count == 1 ? head.next : insertAfter(head, new Bucket(1)); bucket.keys.add(key); keyBucket.put(key, bucket); } else move(key, keyBucket.get(key), 1); }\n  public void dec(String key) { Bucket bucket = keyBucket.get(key); if (bucket.count == 1) { bucket.keys.remove(key); keyBucket.remove(key); if (bucket.keys.isEmpty()) remove(bucket); } else move(key, bucket, -1); }\n  public String getMaxKey() { return tail.prev == head ? \"\" : tail.prev.keys.iterator().next(); }\n  public String getMinKey() { return head.next == tail ? \"\" : head.next.keys.iterator().next(); }\n  private void move(String key, Bucket bucket, int delta) { int nextCount = bucket.count + delta; Bucket target = delta > 0 ? bucket.next : bucket.prev; if (target == head || target == tail || target.count != nextCount) target = delta > 0 ? insertAfter(bucket, new Bucket(nextCount)) : insertAfter(bucket.prev, new Bucket(nextCount)); bucket.keys.remove(key); target.keys.add(key); keyBucket.put(key, target); if (bucket.keys.isEmpty()) remove(bucket); }\n  private Bucket insertAfter(Bucket prev, Bucket node) { node.next = prev.next; node.prev = prev; prev.next.prev = node; prev.next = node; return node; }\n  private void remove(Bucket node) { node.prev.next = node.next; node.next.prev = node.prev; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass AllOne {\n  private final Map<String, Integer> count = new HashMap<>();\n  public void inc(String key) { count.put(key, count.getOrDefault(key, 0) + 1); }\n  public void dec(String key) { int next = count.get(key) - 1; if (next == 0) count.remove(key); else count.put(key, next); }\n  public String getMaxKey() { return choose(new ArrayList<>(count.keySet()), 0, \"\", true); }\n  public String getMinKey() { return choose(new ArrayList<>(count.keySet()), 0, \"\", false); }\n  private String choose(List<String> keys, int index, String best, boolean max) { if (index == keys.size()) return best; String key = keys.get(index); if (best.equals(\"\") || (max ? count.get(key) > count.get(best) : count.get(key) < count.get(best))) best = key; return choose(keys, index + 1, best, max); }\n}",
      "optimizedCode": "import java.util.*;\n\nclass AllOne {\n  private static class Bucket {\n    int count;\n    Set<String> keys = new LinkedHashSet<>();\n    Bucket prev, next;\n    Bucket(int count) { this.count = count; }\n  }\n  private final Bucket head = new Bucket(0);\n  private final Bucket tail = new Bucket(0);\n  private final Map<String, Bucket> keyBucket = new HashMap<>();\n  public AllOne() { head.next = tail; tail.prev = head; }\n  public void inc(String key) { if (!keyBucket.containsKey(key)) { Bucket bucket = head.next.count == 1 ? head.next : insertAfter(head, new Bucket(1)); bucket.keys.add(key); keyBucket.put(key, bucket); } else move(key, keyBucket.get(key), 1); }\n  public void dec(String key) { Bucket bucket = keyBucket.get(key); if (bucket.count == 1) { bucket.keys.remove(key); keyBucket.remove(key); if (bucket.keys.isEmpty()) remove(bucket); } else move(key, bucket, -1); }\n  public String getMaxKey() { return tail.prev == head ? \"\" : tail.prev.keys.iterator().next(); }\n  public String getMinKey() { return head.next == tail ? \"\" : head.next.keys.iterator().next(); }\n  private void move(String key, Bucket bucket, int delta) { int nextCount = bucket.count + delta; Bucket target = delta > 0 ? bucket.next : bucket.prev; if (target == head || target == tail || target.count != nextCount) target = delta > 0 ? insertAfter(bucket, new Bucket(nextCount)) : insertAfter(bucket.prev, new Bucket(nextCount)); bucket.keys.remove(key); target.keys.add(key); keyBucket.put(key, target); if (bucket.keys.isEmpty()) remove(bucket); }\n  private Bucket insertAfter(Bucket prev, Bucket node) { node.next = prev.next; node.prev = prev; prev.next.prev = node; prev.next = node; return node; }\n  private void remove(Bucket node) { node.prev.next = node.next; node.next.prev = node.prev; }\n}",
      "code": "import java.util.*;\n\nclass AllOne {\n  private static class Bucket {\n    int count;\n    Set<String> keys = new LinkedHashSet<>();\n    Bucket prev, next;\n    Bucket(int count) { this.count = count; }\n  }\n  private final Bucket head = new Bucket(0);\n  private final Bucket tail = new Bucket(0);\n  private final Map<String, Bucket> keyBucket = new HashMap<>();\n  public AllOne() { head.next = tail; tail.prev = head; }\n  public void inc(String key) { if (!keyBucket.containsKey(key)) { Bucket bucket = head.next.count == 1 ? head.next : insertAfter(head, new Bucket(1)); bucket.keys.add(key); keyBucket.put(key, bucket); } else move(key, keyBucket.get(key), 1); }\n  public void dec(String key) { Bucket bucket = keyBucket.get(key); if (bucket.count == 1) { bucket.keys.remove(key); keyBucket.remove(key); if (bucket.keys.isEmpty()) remove(bucket); } else move(key, bucket, -1); }\n  public String getMaxKey() { return tail.prev == head ? \"\" : tail.prev.keys.iterator().next(); }\n  public String getMinKey() { return head.next == tail ? \"\" : head.next.keys.iterator().next(); }\n  private void move(String key, Bucket bucket, int delta) { int nextCount = bucket.count + delta; Bucket target = delta > 0 ? bucket.next : bucket.prev; if (target == head || target == tail || target.count != nextCount) target = delta > 0 ? insertAfter(bucket, new Bucket(nextCount)) : insertAfter(bucket.prev, new Bucket(nextCount)); bucket.keys.remove(key); target.keys.add(key); keyBucket.put(key, target); if (bucket.keys.isEmpty()) remove(bucket); }\n  private Bucket insertAfter(Bucket prev, Bucket node) { node.next = prev.next; node.prev = prev; prev.next.prev = node; prev.next = node; return node; }\n  private void remove(Bucket node) { node.prev.next = node.next; node.next.prev = node.prev; }\n}"
    }
  ],
  "checklist": [
    "The prompt defines a class with constructor plus repeated method calls that mutate shared state.",
    "Operations require asymptotic guarantees such as O(1), O(log n), or efficient streaming updates.",
    "A simple value return is not enough; the object must preserve history, order, frequency, or versions.",
    "The correct internal structure usually combines two ideas: map plus list, heap plus map, trie plus DFS, or sweep map plus counters.",
    "Method-call examples should be simulated exactly because design bugs hide in operation ordering."
  ],
  "traps": [
    "Forgetting to update every structure on mutation, such as map and linked list in caches.",
    "Returning stale state after an overwrite, removal, or frequency change.",
    "Breaking tie rules: least recent, least frequent, lexicographic, timestamp order, or insertion order.",
    "Using static fields in snippets, causing multiple object instances to share state incorrectly.",
    "Ignoring boundary calls such as empty iterator, full queue, missing path, or absent key.",
    "Using random access on linked structures when an index map or cursor should be maintained.",
    "Implementing the visible API with the wrong class or method names."
  ],
  "edgeCases": [
    "Capacity zero or full capacity where the problem allows it.",
    "Repeated updates to the same key or same object id.",
    "Calls on empty state: getMin, getMaxKey, next, pop, back, forward, or get.",
    "Duplicate timestamps, equal frequencies, equal hotness, and lexicographic tie-breakers.",
    "Intervals that touch exactly at start or end.",
    "Nested empty lists, empty strings, root paths, and missing parent paths.",
    "Many operations that stress pruning, eviction, or stale cached values."
  ],
  "complexities": [
    "Hash map plus linked list designs target O(1) update, delete, and move-to-front operations.",
    "Heap-backed stream designs usually cost O(log k) per add and O(k) or O(1) for read depending on stored state.",
    "TreeMap and binary-search designs cost O(log n) for predecessor/successor or timestamp lookup.",
    "Trie designs cost O(length) per insert/search plus DFS size for wildcard or autocomplete collection.",
    "Sweep-line calendar designs cost O(n) to validate after each update unless upgraded to segment trees.",
    "Iterator designs pay O(total elements) upfront for eager flattening or amortized O(1) for lazy stacks.",
    "Snapshot/versioned structures cost O(log versions) per historical get after O(1) append-style set."
  ],
  "mentalModel": [
    "Name the invariant first: recency order, frequency groups, cursor position, active interval count, or trie prefix state.",
    "For every method, write which structures it reads and which structures it must update together.",
    "Separate API behavior from storage choice; then pick the storage that keeps the invariant cheap.",
    "Treat tie-breakers as part of the invariant, not as final sorting decoration.",
    "Replay the sample call sequence after implementation; design correctness is state-transition correctness."
  ],
  "revisionStrategy": [
    "Day 1: redo LRU Cache, Min Stack, KthLargest, TimeMap, RandomizedSet, and BrowserHistory.",
    "Day 3: redo LFU Cache, MedianFinder, Twitter, UndergroundSystem, Circular Queue, and HashMap.",
    "Day 7: redo Trie, WordDictionary, SnapshotArray, MyCalendar I/II/III, and RangeModule.",
    "Day 14: redo NestedIterator, PeekingIterator, Vector2D, Codec, FileSystem, AutocompleteSystem, and AllOne.",
    "Before interviews: implement map+DLL, two heaps, trie wildcard DFS, timestamp binary search, and calendar sweep from memory."
  ],
  "unseen": [
    "Design a cache that evicts the key with the oldest expiration time, then least recent among ties.",
    "Design a playlist iterator that can peek two songs ahead and skip nested album folders.",
    "Design a booking system that allows at most three overlapping events and reports the current maximum overlap.",
    "Design a prefix search system that returns top products by sales count with lexicographic ties.",
    "Design a versioned key-value store that supports rollback to any previous operation id."
  ]
};
