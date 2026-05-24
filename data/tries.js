const CURRENT_PATTERN = {
  "id": "tries",
  "name": "Trie",
  "summary": "Prefix trees, wildcard search, dictionary pruning, bitwise tries, and path tries.",
  "complete": true,
  "subpatterns": [
    "Basic prefix trie insert/search/startsWith",
    "Wildcard trie DFS search",
    "Grid search with trie pruning",
    "Shortest root prefix replacement",
    "Prefix aggregate trie with counts or sums",
    "Buildable word trie with terminal prefix checks",
    "Streaming reverse trie matching",
    "Search suggestions with sorted prefix candidates",
    "Bitwise trie for maximum XOR and range XOR counts",
    "Palindrome pair trie with suffix palindrome metadata",
    "Concatenated word detection with trie DP",
    "Path trie for file systems and folder grouping",
    "Reverse trie for suffix queries and word encoding"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Implement Trie Prefix Tree",
      "difficulty": "Medium",
      "subpattern": "Basic prefix trie insert/search/startsWith",
      "question": "Design a trie that supports inserting words, searching complete words, and checking whether any word starts with a given prefix.",
      "trigger": "Multiple prefix queries over the same dictionary need shared prefix nodes instead of repeated string scans.",
      "intuition": "Store one edge per character; a terminal flag separates complete words from prefixes.",
      "edgeCases": "Empty trie, prefix that is not a word, word that extends an existing word, duplicate insert, missing child.",
      "constraints": "1 <= word.length, prefix.length <= 2000; calls contain lowercase English letters; at most 30000 operations.",
      "source": {
        "label": "Implement Trie Prefix Tree - LeetCode 208",
        "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
      },
      "examples": [
        {
          "input": "insert(\"apple\"), search(\"apple\"), search(\"app\"), startsWith(\"app\")",
          "output": "true, false, true",
          "explanation": "app is only a prefix until it is inserted."
        },
        {
          "input": "insert(\"app\"), search(\"app\")",
          "output": "true",
          "explanation": "The terminal flag is set on the app node."
        },
        {
          "input": "startsWith(\"banana\") on empty trie",
          "output": "false",
          "explanation": "The first character path is missing."
        }
      ],
      "bruteForceComplexity": "Time insert O(1), search O(nL), startsWith O(nL); Space O(nL). A list scans stored words per query.",
      "optimizedComplexity": "Time O(L) per operation; Space O(total characters). Each character moves one trie edge.",
      "recursiveComplexity": "Time O(L) per operation; Space O(L) call stack. Recursive helpers process one character per call.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final List<String> words = new ArrayList<>();\n\n  public void insert(String word) {\n    words.add(word);\n  }\n\n  public boolean search(String word) {\n    for (String current : words) {\n      if (current.equals(word)) return true;\n    }\n    return false;\n  }\n\n  public boolean startsWith(String prefix) {\n    for (String current : words) {\n      if (current.startsWith(prefix)) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
      "recursiveCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    insert(root, word, 0);\n  }\n\n  public boolean search(String word) {\n    Node node = find(root, word, 0);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(root, prefix, 0) != null;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private Node find(Node node, String text, int index) {\n    if (node == null || index == text.length()) return node;\n    return find(node.next[text.charAt(index) - 'a'], text, index + 1);\n  }\n}",
      "optimizedCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
      "code": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Add and Search Words Data Structure",
      "difficulty": "Medium",
      "subpattern": "Wildcard trie DFS search",
      "question": "Design a data structure that adds lowercase words and searches words where dot can match any one letter.",
      "trigger": "Wildcard search over many stored words needs branching only at dot positions, which is a trie DFS fit.",
      "intuition": "For a normal character follow one child; for dot, try every existing child at that level.",
      "edgeCases": "Search before adding, dot at first character, all dots, length mismatch, duplicate words, missing branch.",
      "constraints": "1 <= word.length <= 25; calls contain lowercase letters and dots in search; at most 10000 calls.",
      "source": {
        "label": "Design Add and Search Words - LeetCode 211",
        "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
      },
      "examples": [
        {
          "input": "addWord(\"bad\"), addWord(\"dad\"), search(\"pad\")",
          "output": "false",
          "explanation": "No stored word matches pad."
        },
        {
          "input": "search(\".ad\")",
          "output": "true",
          "explanation": "The dot can match b or d."
        },
        {
          "input": "search(\"b..\")",
          "output": "true",
          "explanation": "Both dots match the remaining letters of bad."
        }
      ],
      "bruteForceComplexity": "Time add O(1), search O(nL); Space O(nL). Every stored word with matching length is compared.",
      "optimizedComplexity": "Time add O(L), search O(26^d * L) worst case where d is wildcard count; Space O(total characters).",
      "recursiveComplexity": "Time add O(L), search O(26^d * L); Space O(L) call stack for one search path.",
      "bruteForceCode": "import java.util.*;\n\nclass WordDictionary {\n  private final List<String> words = new ArrayList<>();\n\n  public void addWord(String word) {\n    words.add(word);\n  }\n\n  public boolean search(String pattern) {\n    for (String word : words) {\n      if (word.length() != pattern.length()) continue;\n      boolean match = true;\n      for (int i = 0; i < pattern.length(); i++) {\n        char ch = pattern.charAt(i);\n        if (ch != '.' && ch != word.charAt(i)) {\n          match = false;\n          break;\n        }\n      }\n      if (match) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass WordDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void addWord(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String pattern) {\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == pattern.length()) {\n        if (state.node.word) return true;\n        continue;\n      }\n      char ch = pattern.charAt(state.index);\n      if (ch == '.') {\n        for (Node child : state.node.next) {\n          if (child != null) stack.push(new State(child, state.index + 1));\n        }\n      } else {\n        Node child = state.node.next[ch - 'a'];\n        if (child != null) stack.push(new State(child, state.index + 1));\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    Node node;\n    int index;\n    State(Node node, int index) { this.node = node; this.index = index; }\n  }\n}",
      "recursiveCode": "class WordDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void addWord(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    return dfs(root, word, 0);\n  }\n\n  private boolean dfs(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n\n    char ch = word.charAt(index);\n    if (ch != '.') return dfs(node.next[ch - 'a'], word, index + 1);\n    for (Node child : node.next) {\n      if (child != null && dfs(child, word, index + 1)) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass WordDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void addWord(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String pattern) {\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == pattern.length()) {\n        if (state.node.word) return true;\n        continue;\n      }\n      char ch = pattern.charAt(state.index);\n      if (ch == '.') {\n        for (Node child : state.node.next) {\n          if (child != null) stack.push(new State(child, state.index + 1));\n        }\n      } else {\n        Node child = state.node.next[ch - 'a'];\n        if (child != null) stack.push(new State(child, state.index + 1));\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    Node node;\n    int index;\n    State(Node node, int index) { this.node = node; this.index = index; }\n  }\n}",
      "code": "import java.util.*;\n\nclass WordDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void addWord(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String pattern) {\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == pattern.length()) {\n        if (state.node.word) return true;\n        continue;\n      }\n      char ch = pattern.charAt(state.index);\n      if (ch == '.') {\n        for (Node child : state.node.next) {\n          if (child != null) stack.push(new State(child, state.index + 1));\n        }\n      } else {\n        Node child = state.node.next[ch - 'a'];\n        if (child != null) stack.push(new State(child, state.index + 1));\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    Node node;\n    int index;\n    State(Node node, int index) { this.node = node; this.index = index; }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Word Search II",
      "difficulty": "Hard",
      "subpattern": "Grid search with trie pruning",
      "question": "Given a board of letters and a list of words, return every word that can be formed by adjacent horizontal or vertical cells without reusing a cell.",
      "trigger": "Many word searches share prefixes, so one trie-guided traversal prunes impossible board paths early.",
      "intuition": "Build a trie of words, DFS from each cell, and stop a path as soon as its prefix is not in the trie.",
      "edgeCases": "Empty result, duplicate words, same board cell cannot repeat, one-cell word, overlapping words, long shared prefixes.",
      "constraints": "1 <= board rows, cols <= 12; 1 <= words.length <= 30000; words contain lowercase English letters.",
      "source": {
        "label": "Word Search II - LeetCode 212",
        "url": "https://leetcode.com/problems/word-search-ii/"
      },
      "examples": [
        {
          "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
          "output": "[\"oath\",\"eat\"]",
          "explanation": "Only oath and eat can be formed on valid adjacent paths."
        },
        {
          "input": "board = [[\"a\",\"b\"],[\"c\",\"d\"]], words = [\"abcb\"]",
          "output": "[]",
          "explanation": "The path would need to reuse b."
        },
        {
          "input": "board = [[\"a\"]], words = [\"a\"]",
          "output": "[\"a\"]",
          "explanation": "The single cell forms the word."
        }
      ],
      "bruteForceComplexity": "Time O(W * mn * 4^L); Space O(L). Each word is searched on the board independently.",
      "optimizedComplexity": "Time O(mn * 4^L) with prefix pruning; Space O(total word characters). Trie nodes cut dead paths early.",
      "recursiveComplexity": "Time O(mn * 4^L) with trie pruning; Space O(total word characters + L) including recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findWords(char[][] board, String[] words) {\n    List<String> answer = new ArrayList<>();\n    for (String word : words) {\n      if (exists(board, word)) answer.add(word);\n    }\n    return answer;\n  }\n\n  private boolean exists(char[][] board, String word) {\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (search(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean search(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return false;\n    if (board[r][c] != word.charAt(index)) return false;\n\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = search(board, word, r + 1, c, index + 1)\n        || search(board, word, r - 1, c, index + 1)\n        || search(board, word, r, c + 1, index + 1)\n        || search(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List<String> findWords(char[][] board, String[] words) {\n    Node root = build(words);\n    Set<String> found = new LinkedHashSet<>();\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        collect(board, r, c, root, found);\n      }\n    }\n    return new ArrayList<>(found);\n  }\n\n  private Node build(String[] words) {\n    Node root = new Node();\n    for (String word : words) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int index = ch - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = word;\n    }\n    return root;\n  }\n\n  private void collect(char[][] board, int r, int c, Node node, Set<String> found) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) found.add(next.word);\n    board[r][c] = '#';\n    collect(board, r + 1, c, next, found);\n    collect(board, r - 1, c, next, found);\n    collect(board, r, c + 1, next, found);\n    collect(board, r, c - 1, next, found);\n    board[r][c] = ch;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List<String> findWords(char[][] board, String[] words) {\n    Node root = new Node();\n    insertAll(root, words, 0);\n    List<String> answer = new ArrayList<>();\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        dfs(board, r, c, root, answer);\n      }\n    }\n    return answer;\n  }\n\n  private void insertAll(Node root, String[] words, int index) {\n    if (index == words.length) return;\n    insert(root, words[index], 0, words[index]);\n    insertAll(root, words, index + 1);\n  }\n\n  private void insert(Node node, String word, int index, String full) {\n    if (index == word.length()) {\n      node.word = full;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1, full);\n  }\n\n  private void dfs(char[][] board, int r, int c, Node node, List<String> answer) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) {\n      answer.add(next.word);\n      next.word = null;\n    }\n    board[r][c] = '#';\n    dfs(board, r + 1, c, next, answer);\n    dfs(board, r - 1, c, next, answer);\n    dfs(board, r, c + 1, next, answer);\n    dfs(board, r, c - 1, next, answer);\n    board[r][c] = ch;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List<String> findWords(char[][] board, String[] words) {\n    Node root = build(words);\n    Set<String> found = new LinkedHashSet<>();\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        collect(board, r, c, root, found);\n      }\n    }\n    return new ArrayList<>(found);\n  }\n\n  private Node build(String[] words) {\n    Node root = new Node();\n    for (String word : words) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int index = ch - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = word;\n    }\n    return root;\n  }\n\n  private void collect(char[][] board, int r, int c, Node node, Set<String> found) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) found.add(next.word);\n    board[r][c] = '#';\n    collect(board, r + 1, c, next, found);\n    collect(board, r - 1, c, next, found);\n    collect(board, r, c + 1, next, found);\n    collect(board, r, c - 1, next, found);\n    board[r][c] = ch;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List<String> findWords(char[][] board, String[] words) {\n    Node root = build(words);\n    Set<String> found = new LinkedHashSet<>();\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        collect(board, r, c, root, found);\n      }\n    }\n    return new ArrayList<>(found);\n  }\n\n  private Node build(String[] words) {\n    Node root = new Node();\n    for (String word : words) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int index = ch - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = word;\n    }\n    return root;\n  }\n\n  private void collect(char[][] board, int r, int c, Node node, Set<String> found) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) found.add(next.word);\n    board[r][c] = '#';\n    collect(board, r + 1, c, next, found);\n    collect(board, r - 1, c, next, found);\n    collect(board, r, c + 1, next, found);\n    collect(board, r, c - 1, next, found);\n    board[r][c] = ch;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Replace Words",
      "difficulty": "Medium",
      "subpattern": "Shortest root prefix replacement",
      "question": "Given dictionary roots and a sentence, replace each word with the shortest root that is its prefix when such a root exists.",
      "trigger": "Each sentence word asks for the shortest matching prefix among many dictionary roots.",
      "intuition": "Insert roots into a trie and stop scanning a word as soon as a terminal root is reached.",
      "edgeCases": "No matching root, multiple roots where shortest wins, root equals word, repeated spaces not present, duplicate dictionary roots.",
      "constraints": "1 <= dictionary.length <= 1000; 1 <= sentence.length <= 100000; words contain lowercase English letters.",
      "source": {
        "label": "Replace Words - LeetCode 648",
        "url": "https://leetcode.com/problems/replace-words/"
      },
      "examples": [
        {
          "input": "dictionary = [\"cat\",\"bat\",\"rat\"], sentence = \"the cattle was rattled by the battery\"",
          "output": "\"the cat was rat by the bat\"",
          "explanation": "cattle, rattled, and battery use their shortest roots."
        },
        {
          "input": "dictionary = [\"a\",\"aa\",\"aaa\"], sentence = \"a aa aaaa\"",
          "output": "\"a a a\"",
          "explanation": "The shortest root a wins each time."
        },
        {
          "input": "dictionary = [\"x\"], sentence = \"hello world\"",
          "output": "\"hello world\"",
          "explanation": "No word has x as a prefix."
        }
      ],
      "bruteForceComplexity": "Time O(words * roots * L); Space O(total output). Every word checks every root.",
      "optimizedComplexity": "Time O(total root chars + sentence chars); Space O(total root chars). Trie lookup stops at shortest terminal root.",
      "recursiveComplexity": "Time O(total root chars + sentence chars); Space O(total root chars + L) including recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String replaceWords(List<String> dictionary, String sentence) {\n    String[] words = sentence.split(\" \");\n    for (int i = 0; i < words.length; i++) {\n      String best = words[i];\n      for (String root : dictionary) {\n        if (words[i].startsWith(root) && root.length() < best.length()) {\n          best = root;\n        }\n      }\n      words[i] = best;\n    }\n    return String.join(\" \", words);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String replaceWords(List<String> dictionary, String sentence) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word);\n\n    String[] words = sentence.split(\" \");\n    for (int i = 0; i < words.length; i++) {\n      words[i] = shortestRoot(root, words[i]);\n    }\n    return String.join(\" \", words);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  private String shortestRoot(Node root, String word) {\n    Node node = root;\n    StringBuilder prefix = new StringBuilder();\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) return word;\n      prefix.append(ch);\n      node = node.next[index];\n      if (node.word) return prefix.toString();\n    }\n    return word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String replaceWords(List<String> dictionary, String sentence) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word, 0);\n    String[] words = sentence.split(\" \");\n    replace(words, 0, root);\n    return String.join(\" \", words);\n  }\n\n  private void replace(String[] words, int index, Node root) {\n    if (index == words.length) return;\n    String match = find(root, words[index], 0);\n    if (match != null) words[index] = match;\n    replace(words, index + 1, root);\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private String find(Node node, String word, int index) {\n    if (node.word) return word.substring(0, index);\n    if (index == word.length()) return null;\n    Node child = node.next[word.charAt(index) - 'a'];\n    if (child == null) return null;\n    return find(child, word, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String replaceWords(List<String> dictionary, String sentence) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word);\n\n    String[] words = sentence.split(\" \");\n    for (int i = 0; i < words.length; i++) {\n      words[i] = shortestRoot(root, words[i]);\n    }\n    return String.join(\" \", words);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  private String shortestRoot(Node root, String word) {\n    Node node = root;\n    StringBuilder prefix = new StringBuilder();\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) return word;\n      prefix.append(ch);\n      node = node.next[index];\n      if (node.word) return prefix.toString();\n    }\n    return word;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String replaceWords(List<String> dictionary, String sentence) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word);\n\n    String[] words = sentence.split(\" \");\n    for (int i = 0; i < words.length; i++) {\n      words[i] = shortestRoot(root, words[i]);\n    }\n    return String.join(\" \", words);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  private String shortestRoot(Node root, String word) {\n    Node node = root;\n    StringBuilder prefix = new StringBuilder();\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) return word;\n      prefix.append(ch);\n      node = node.next[index];\n      if (node.word) return prefix.toString();\n    }\n    return word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Map Sum Pairs",
      "difficulty": "Medium",
      "subpattern": "Prefix aggregate trie with counts or sums",
      "question": "Design a structure that inserts key-value pairs and returns the sum of values of all keys with a given prefix.",
      "trigger": "Prefix sum queries over mutable string keys need aggregate values maintained along trie paths.",
      "intuition": "When a key changes value, add only the delta to every node on that key path.",
      "edgeCases": "Overwrite existing key, prefix absent, prefix is a full key, zero value, multiple keys sharing prefix.",
      "constraints": "1 <= key.length, prefix.length <= 50; 1 <= val <= 1000; at most 50 operations in the original problem.",
      "source": {
        "label": "Map Sum Pairs - LeetCode 677",
        "url": "https://leetcode.com/problems/map-sum-pairs/"
      },
      "examples": [
        {
          "input": "insert(\"apple\", 3), sum(\"ap\")",
          "output": "3",
          "explanation": "apple contributes 3 to prefix ap."
        },
        {
          "input": "insert(\"app\", 2), sum(\"ap\")",
          "output": "5",
          "explanation": "apple and app both match ap."
        },
        {
          "input": "insert(\"apple\", 2), sum(\"apple\")",
          "output": "2",
          "explanation": "Overwriting apple changes its contribution from 3 to 2."
        }
      ],
      "bruteForceComplexity": "Time insert O(L), sum O(nL); Space O(nL). A hash map scans all keys for every prefix sum.",
      "optimizedComplexity": "Time insert O(L), sum O(P); Space O(total key chars). Each trie node stores the aggregate prefix sum.",
      "recursiveComplexity": "Time insert O(L), sum O(P); Space O(L) call stack for update and lookup.",
      "bruteForceCode": "import java.util.*;\n\nclass MapSum {\n  private final Map<String, Integer> values = new HashMap<>();\n\n  public void insert(String key, int val) {\n    values.put(key, val);\n  }\n\n  public int sum(String prefix) {\n    int total = 0;\n    for (Map.Entry<String, Integer> entry : values.entrySet()) {\n      if (entry.getKey().startsWith(prefix)) total += entry.getValue();\n    }\n    return total;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MapSum {\n  private static class Node {\n    Node[] next = new Node[26];\n    int sum;\n  }\n\n  private final Node root = new Node();\n  private final Map<String, Integer> values = new HashMap<>();\n\n  public void insert(String key, int val) {\n    int delta = val - values.getOrDefault(key, 0);\n    values.put(key, val);\n    Node node = root;\n    node.sum += delta;\n    for (char ch : key.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n      node.sum += delta;\n    }\n  }\n\n  public int sum(String prefix) {\n    Node node = root;\n    for (char ch : prefix.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return 0;\n    }\n    return node.sum;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MapSum {\n  private static class Node {\n    Node[] next = new Node[26];\n    int sum;\n  }\n\n  private final Node root = new Node();\n  private final Map<String, Integer> values = new HashMap<>();\n\n  public void insert(String key, int val) {\n    int delta = val - values.getOrDefault(key, 0);\n    values.put(key, val);\n    add(root, key, 0, delta);\n  }\n\n  public int sum(String prefix) {\n    Node node = find(root, prefix, 0);\n    return node == null ? 0 : node.sum;\n  }\n\n  private void add(Node node, String key, int index, int delta) {\n    node.sum += delta;\n    if (index == key.length()) return;\n    int child = key.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    add(node.next[child], key, index + 1, delta);\n  }\n\n  private Node find(Node node, String prefix, int index) {\n    if (node == null || index == prefix.length()) return node;\n    return find(node.next[prefix.charAt(index) - 'a'], prefix, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MapSum {\n  private static class Node {\n    Node[] next = new Node[26];\n    int sum;\n  }\n\n  private final Node root = new Node();\n  private final Map<String, Integer> values = new HashMap<>();\n\n  public void insert(String key, int val) {\n    int delta = val - values.getOrDefault(key, 0);\n    values.put(key, val);\n    Node node = root;\n    node.sum += delta;\n    for (char ch : key.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n      node.sum += delta;\n    }\n  }\n\n  public int sum(String prefix) {\n    Node node = root;\n    for (char ch : prefix.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return 0;\n    }\n    return node.sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass MapSum {\n  private static class Node {\n    Node[] next = new Node[26];\n    int sum;\n  }\n\n  private final Node root = new Node();\n  private final Map<String, Integer> values = new HashMap<>();\n\n  public void insert(String key, int val) {\n    int delta = val - values.getOrDefault(key, 0);\n    values.put(key, val);\n    Node node = root;\n    node.sum += delta;\n    for (char ch : key.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n      node.sum += delta;\n    }\n  }\n\n  public int sum(String prefix) {\n    Node node = root;\n    for (char ch : prefix.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return 0;\n    }\n    return node.sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Word in Dictionary",
      "difficulty": "Easy",
      "subpattern": "Buildable word trie with terminal prefix checks",
      "question": "Given a list of words, return the longest word that can be built one character at a time by other words in the list. Return the lexicographically smallest answer on ties.",
      "trigger": "A word is valid only when every prefix is also a terminal word in the dictionary.",
      "intuition": "After inserting all words, traverse only through trie nodes that mark complete words.",
      "edgeCases": "Tie by length, no buildable multi-character word, duplicate words, single-letter words, lexicographic order.",
      "constraints": "1 <= words.length <= 1000; 1 <= words[i].length <= 30; words contain lowercase English letters.",
      "source": {
        "label": "Longest Word in Dictionary - LeetCode 720",
        "url": "https://leetcode.com/problems/longest-word-in-dictionary/"
      },
      "examples": [
        {
          "input": "words = [\"w\",\"wo\",\"wor\",\"worl\",\"world\"]",
          "output": "\"world\"",
          "explanation": "Every prefix of world is present."
        },
        {
          "input": "words = [\"a\",\"banana\",\"app\",\"appl\",\"ap\",\"apply\",\"apple\"]",
          "output": "\"apple\"",
          "explanation": "apple and apply have length 5; apple is lexicographically smaller."
        },
        {
          "input": "words = [\"abc\",\"bc\"]",
          "output": "\"\"",
          "explanation": "No word can be built from single-character prefixes."
        }
      ],
      "bruteForceComplexity": "Time O(nL^2); Space O(nL). Each prefix is checked in a hash set for every word.",
      "optimizedComplexity": "Time O(nL + nodes); Space O(nL). Trie DFS visits only terminal-prefix paths.",
      "recursiveComplexity": "Time O(nL + nodes); Space O(nL + L). Recursive DFS builds candidates through terminal nodes.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String longestWord(String[] words) {\n    Set<String> dictionary = new HashSet<>(Arrays.asList(words));\n    String best = \"\";\n    for (String word : words) {\n      boolean valid = true;\n      for (int i = 1; i < word.length(); i++) {\n        if (!dictionary.contains(word.substring(0, i))) {\n          valid = false;\n          break;\n        }\n      }\n      if (valid && better(word, best)) best = word;\n    }\n    return best;\n  }\n\n  private boolean better(String word, String best) {\n    return word.length() > best.length()\n        || (word.length() == best.length() && word.compareTo(best) < 0);\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public String longestWord(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n\n    String best = \"\";\n    java.util.Deque<Node> stack = new java.util.ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      Node node = stack.pop();\n      if (node.word != null && better(node.word, best)) best = node.word;\n      for (int i = 25; i >= 0; i--) {\n        Node child = node.next[i];\n        if (child != null && child.word != null) stack.push(child);\n      }\n    }\n    return best;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = word;\n  }\n\n  private boolean better(String word, String best) {\n    return word.length() > best.length()\n        || (word.length() == best.length() && word.compareTo(best) < 0);\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public String longestWord(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word, 0, word);\n    return dfs(root, \"\");\n  }\n\n  private void insert(Node node, String word, int index, String full) {\n    if (index == word.length()) {\n      node.word = full;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1, full);\n  }\n\n  private String dfs(Node node, String best) {\n    if (node.word != null && isBetter(node.word, best)) best = node.word;\n    for (int i = 0; i < 26; i++) {\n      Node child = node.next[i];\n      if (child != null && child.word != null) best = dfs(child, best);\n    }\n    return best;\n  }\n\n  private boolean isBetter(String word, String best) {\n    return word.length() > best.length()\n        || (word.length() == best.length() && word.compareTo(best) < 0);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public String longestWord(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n\n    String best = \"\";\n    java.util.Deque<Node> stack = new java.util.ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      Node node = stack.pop();\n      if (node.word != null && better(node.word, best)) best = node.word;\n      for (int i = 25; i >= 0; i--) {\n        Node child = node.next[i];\n        if (child != null && child.word != null) stack.push(child);\n      }\n    }\n    return best;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = word;\n  }\n\n  private boolean better(String word, String best) {\n    return word.length() > best.length()\n        || (word.length() == best.length() && word.compareTo(best) < 0);\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public String longestWord(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n\n    String best = \"\";\n    java.util.Deque<Node> stack = new java.util.ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      Node node = stack.pop();\n      if (node.word != null && better(node.word, best)) best = node.word;\n      for (int i = 25; i >= 0; i--) {\n        Node child = node.next[i];\n        if (child != null && child.word != null) stack.push(child);\n      }\n    }\n    return best;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = word;\n  }\n\n  private boolean better(String word, String best) {\n    return word.length() > best.length()\n        || (word.length() == best.length() && word.compareTo(best) < 0);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Stream of Characters",
      "difficulty": "Hard",
      "subpattern": "Streaming reverse trie matching",
      "question": "Design a stream checker that receives one character at a time and returns true if any suffix of the stream equals a dictionary word.",
      "trigger": "The query asks whether the latest stream suffix matches a word, so words should be stored reversed.",
      "intuition": "Keep recent characters and walk the reverse trie from newest to oldest until a word ends or the path breaks.",
      "edgeCases": "Single-character word, long stream, word longer than stream, repeated letters, overlapping suffix matches.",
      "constraints": "1 <= words.length <= 2000; 1 <= words[i].length <= 200; at most 40000 query calls.",
      "source": {
        "label": "Stream of Characters - LeetCode 1032",
        "url": "https://leetcode.com/problems/stream-of-characters/"
      },
      "examples": [
        {
          "input": "words = [\"cd\",\"f\",\"kl\"], queries = a,b,c,d",
          "output": "false,false,false,true",
          "explanation": "The suffix cd appears after reading d."
        },
        {
          "input": "queries continue with f",
          "output": "true",
          "explanation": "The single-character word f matches the latest suffix."
        },
        {
          "input": "queries end with k,l",
          "output": "false,true",
          "explanation": "The suffix kl matches after reading l."
        }
      ],
      "bruteForceComplexity": "Time O(words * L) per query; Space O(total word chars + stream). Every word checks whether it is a suffix.",
      "optimizedComplexity": "Time O(max word length) per query; Space O(total word chars + max word length). Reverse trie stops at first broken suffix.",
      "recursiveComplexity": "Time O(max word length) per query; Space O(total word chars + max word length) including recursion.",
      "bruteForceCode": "import java.util.*;\n\nclass StreamChecker {\n  private final String[] words;\n  private final StringBuilder stream = new StringBuilder();\n\n  public StreamChecker(String[] words) {\n    this.words = words;\n  }\n\n  public boolean query(char letter) {\n    stream.append(letter);\n    String current = stream.toString();\n    for (String word : words) {\n      if (current.endsWith(word)) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass StreamChecker {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n  private final Deque<Character> stream = new ArrayDeque<>();\n  private int maxLength = 0;\n\n  public StreamChecker(String[] words) {\n    for (String word : words) {\n      maxLength = Math.max(maxLength, word.length());\n      Node node = root;\n      for (int i = word.length() - 1; i >= 0; i--) {\n        int index = word.charAt(i) - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = true;\n    }\n  }\n\n  public boolean query(char letter) {\n    stream.addFirst(letter);\n    if (stream.size() > maxLength) stream.removeLast();\n    Node node = root;\n    for (char ch : stream) {\n      node = node.next[ch - 'a'];\n      if (node == null) return false;\n      if (node.word) return true;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass StreamChecker {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n  private final StringBuilder stream = new StringBuilder();\n  private int maxLength = 0;\n\n  public StreamChecker(String[] words) {\n    for (String word : words) {\n      maxLength = Math.max(maxLength, word.length());\n      insert(root, word, word.length() - 1);\n    }\n  }\n\n  public boolean query(char letter) {\n    stream.append(letter);\n    if (stream.length() > maxLength) stream.deleteCharAt(0);\n    return search(root, stream.length() - 1);\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index < 0) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index - 1);\n  }\n\n  private boolean search(Node node, int index) {\n    if (node.word) return true;\n    if (index < 0) return false;\n    Node child = node.next[stream.charAt(index) - 'a'];\n    return child != null && search(child, index - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass StreamChecker {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n  private final Deque<Character> stream = new ArrayDeque<>();\n  private int maxLength = 0;\n\n  public StreamChecker(String[] words) {\n    for (String word : words) {\n      maxLength = Math.max(maxLength, word.length());\n      Node node = root;\n      for (int i = word.length() - 1; i >= 0; i--) {\n        int index = word.charAt(i) - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = true;\n    }\n  }\n\n  public boolean query(char letter) {\n    stream.addFirst(letter);\n    if (stream.size() > maxLength) stream.removeLast();\n    Node node = root;\n    for (char ch : stream) {\n      node = node.next[ch - 'a'];\n      if (node == null) return false;\n      if (node.word) return true;\n    }\n    return false;\n  }\n}",
      "code": "import java.util.*;\n\nclass StreamChecker {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n  private final Deque<Character> stream = new ArrayDeque<>();\n  private int maxLength = 0;\n\n  public StreamChecker(String[] words) {\n    for (String word : words) {\n      maxLength = Math.max(maxLength, word.length());\n      Node node = root;\n      for (int i = word.length() - 1; i >= 0; i--) {\n        int index = word.charAt(i) - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = true;\n    }\n  }\n\n  public boolean query(char letter) {\n    stream.addFirst(letter);\n    if (stream.size() > maxLength) stream.removeLast();\n    Node node = root;\n    for (char ch : stream) {\n      node = node.next[ch - 'a'];\n      if (node == null) return false;\n      if (node.word) return true;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search Suggestions System",
      "difficulty": "Medium",
      "subpattern": "Search suggestions with sorted prefix candidates",
      "question": "Given product names and a search word, return up to three lexicographically smallest product suggestions after each typed character.",
      "trigger": "Each prefix of the search word asks for the smallest dictionary words under that prefix.",
      "intuition": "Store sorted products in a trie path or sort once and collect at most three candidates per prefix.",
      "edgeCases": "No suggestions for a prefix, fewer than three matches, duplicate-looking prefixes, search word longer than any product.",
      "constraints": "1 <= products.length <= 1000; 1 <= products[i].length, searchWord.length <= 3000 total input size.",
      "source": {
        "label": "Search Suggestions System - LeetCode 1268",
        "url": "https://leetcode.com/problems/search-suggestions-system/"
      },
      "examples": [
        {
          "input": "products = [\"mobile\",\"mouse\",\"moneypot\",\"monitor\",\"mousepad\"], searchWord = \"mouse\"",
          "output": "[[\"mobile\",\"moneypot\",\"monitor\"],[\"mobile\",\"moneypot\",\"monitor\"],[\"mouse\",\"mousepad\"],[\"mouse\",\"mousepad\"],[\"mouse\",\"mousepad\"]]",
          "explanation": "Suggestions shrink as the prefix becomes more specific."
        },
        {
          "input": "products = [\"havana\"], searchWord = \"havana\"",
          "output": "[[\"havana\"],[\"havana\"],[\"havana\"],[\"havana\"],[\"havana\"],[\"havana\"]]",
          "explanation": "The only product matches every prefix."
        },
        {
          "input": "products = [\"bags\",\"baggage\",\"banner\",\"box\",\"cloths\"], searchWord = \"bags\"",
          "output": "[[\"baggage\",\"bags\",\"banner\"],[\"baggage\",\"bags\",\"banner\"],[\"baggage\",\"bags\"],[\"bags\"]]",
          "explanation": "Each prefix returns up to three sorted matches."
        }
      ],
      "bruteForceComplexity": "Time O(S * nL log n); Space O(nL). Each prefix filters and sorts matching products.",
      "optimizedComplexity": "Time O(nL log n + S); Space O(nL). Trie nodes store at most three sorted suggestions while inserting sorted products.",
      "recursiveComplexity": "Time O(nL + S * nodes under prefix); Space O(nL + L). DFS collects up to three words from each prefix node.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> suggestedProducts(String[] products, String searchWord) {\n    List<List<String>> answer = new ArrayList<>();\n    for (int i = 1; i <= searchWord.length(); i++) {\n      String prefix = searchWord.substring(0, i);\n      List<String> matches = new ArrayList<>();\n      for (String product : products) {\n        if (product.startsWith(prefix)) matches.add(product);\n      }\n      Collections.sort(matches);\n      if (matches.size() > 3) matches = matches.subList(0, 3);\n      answer.add(new ArrayList<>(matches));\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    List<String> suggestions = new ArrayList<>();\n  }\n\n  public List<List<String>> suggestedProducts(String[] products, String searchWord) {\n    Arrays.sort(products);\n    Node root = new Node();\n    for (String product : products) insert(root, product);\n\n    List<List<String>> answer = new ArrayList<>();\n    Node node = root;\n    for (char ch : searchWord.toCharArray()) {\n      if (node != null) node = node.next[ch - 'a'];\n      answer.add(node == null ? new ArrayList<>() : new ArrayList<>(node.suggestions));\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String product) {\n    Node node = root;\n    for (char ch : product.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n      if (node.suggestions.size() < 3) node.suggestions.add(product);\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List<List<String>> suggestedProducts(String[] products, String searchWord) {\n    Node root = new Node();\n    for (String product : products) insert(root, product, 0);\n    List<List<String>> answer = new ArrayList<>();\n    Node node = root;\n    for (char ch : searchWord.toCharArray()) {\n      node = node == null ? null : node.next[ch - 'a'];\n      List<String> list = new ArrayList<>();\n      collect(node, list);\n      answer.add(list);\n    }\n    return answer;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = word;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private void collect(Node node, List<String> list) {\n    if (node == null || list.size() == 3) return;\n    if (node.word != null) list.add(node.word);\n    for (int i = 0; i < 26 && list.size() < 3; i++) collect(node.next[i], list);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    List<String> suggestions = new ArrayList<>();\n  }\n\n  public List<List<String>> suggestedProducts(String[] products, String searchWord) {\n    Arrays.sort(products);\n    Node root = new Node();\n    for (String product : products) insert(root, product);\n\n    List<List<String>> answer = new ArrayList<>();\n    Node node = root;\n    for (char ch : searchWord.toCharArray()) {\n      if (node != null) node = node.next[ch - 'a'];\n      answer.add(node == null ? new ArrayList<>() : new ArrayList<>(node.suggestions));\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String product) {\n    Node node = root;\n    for (char ch : product.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n      if (node.suggestions.size() < 3) node.suggestions.add(product);\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    List<String> suggestions = new ArrayList<>();\n  }\n\n  public List<List<String>> suggestedProducts(String[] products, String searchWord) {\n    Arrays.sort(products);\n    Node root = new Node();\n    for (String product : products) insert(root, product);\n\n    List<List<String>> answer = new ArrayList<>();\n    Node node = root;\n    for (char ch : searchWord.toCharArray()) {\n      if (node != null) node = node.next[ch - 'a'];\n      answer.add(node == null ? new ArrayList<>() : new ArrayList<>(node.suggestions));\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String product) {\n    Node node = root;\n    for (char ch : product.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n      if (node.suggestions.size() < 3) node.suggestions.add(product);\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Maximum XOR of Two Numbers in an Array",
      "difficulty": "Medium",
      "subpattern": "Bitwise trie for maximum XOR",
      "question": "Given an integer array, return the maximum XOR value of any two numbers in the array.",
      "trigger": "Choosing opposite bits greedily from high to low is naturally represented by a binary trie.",
      "intuition": "For each number, walk the trie preferring the opposite bit at each position to maximize the XOR bit.",
      "edgeCases": "One number, duplicate numbers, zeros, high bit values, all equal numbers.",
      "constraints": "1 <= nums.length <= 200000; 0 <= nums[i] <= 2^31 - 1.",
      "source": {
        "label": "Maximum XOR of Two Numbers - LeetCode 421",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
      },
      "examples": [
        {
          "input": "nums = [3,10,5,25,2,8]",
          "output": "28",
          "explanation": "5 XOR 25 equals 28."
        },
        {
          "input": "nums = [0]",
          "output": "0",
          "explanation": "Only one number exists."
        },
        {
          "input": "nums = [14,70,53,83,49,91,36,80,92,51,66,70]",
          "output": "127",
          "explanation": "The best pair creates all seven lower bits as 1."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Every pair is evaluated directly.",
      "optimizedComplexity": "Time O(31n); Space O(31n). Each number inserts and queries one path in a binary trie.",
      "recursiveComplexity": "Time O(31n); Space O(31n + 31). Recursive insert/query processes one bit per call.",
      "bruteForceCode": "class Solution {\n  public int findMaximumXOR(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        best = Math.max(best, nums[i] ^ nums[j]);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num);\n\n    int best = 0;\n    for (int num : nums) {\n      Node node = root;\n      int value = 0;\n      for (int bit = 30; bit >= 0; bit--) {\n        int current = (num >>> bit) & 1;\n        int want = current ^ 1;\n        if (node.next[want] != null) {\n          value |= 1 << bit;\n          node = node.next[want];\n        } else {\n          node = node.next[current];\n        }\n      }\n      best = Math.max(best, value);\n    }\n    return best;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num, 30);\n    int best = 0;\n    for (int num : nums) best = Math.max(best, query(root, num, 30));\n    return best;\n  }\n\n  private void insert(Node node, int num, int bit) {\n    if (bit < 0) return;\n    int current = (num >>> bit) & 1;\n    if (node.next[current] == null) node.next[current] = new Node();\n    insert(node.next[current], num, bit - 1);\n  }\n\n  private int query(Node node, int num, int bit) {\n    if (bit < 0) return 0;\n    int current = (num >>> bit) & 1;\n    int want = current ^ 1;\n    if (node.next[want] != null) {\n      return (1 << bit) | query(node.next[want], num, bit - 1);\n    }\n    return query(node.next[current], num, bit - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num);\n\n    int best = 0;\n    for (int num : nums) {\n      Node node = root;\n      int value = 0;\n      for (int bit = 30; bit >= 0; bit--) {\n        int current = (num >>> bit) & 1;\n        int want = current ^ 1;\n        if (node.next[want] != null) {\n          value |= 1 << bit;\n          node = node.next[want];\n        } else {\n          node = node.next[current];\n        }\n      }\n      best = Math.max(best, value);\n    }\n    return best;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n    }\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num);\n\n    int best = 0;\n    for (int num : nums) {\n      Node node = root;\n      int value = 0;\n      for (int bit = 30; bit >= 0; bit--) {\n        int current = (num >>> bit) & 1;\n        int want = current ^ 1;\n        if (node.next[want] != null) {\n          value |= 1 << bit;\n          node = node.next[want];\n        } else {\n          node = node.next[current];\n        }\n      }\n      best = Math.max(best, value);\n    }\n    return best;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Palindrome Pairs",
      "difficulty": "Hard",
      "subpattern": "Palindrome pair trie with suffix palindrome metadata",
      "question": "Given unique words, return all index pairs [i, j] such that words[i] + words[j] is a palindrome.",
      "trigger": "Pairing a word with reversed prefixes/suffixes can be found efficiently with a reversed-word trie.",
      "intuition": "While matching a word through reversed words, add pairs when the unmatched remainder is already a palindrome.",
      "edgeCases": "Empty string, single-character words, duplicate-like reverse words, same index not allowed, multiple valid pairs.",
      "constraints": "1 <= words.length <= 5000; 0 <= words[i].length <= 300; words are unique lowercase strings.",
      "source": {
        "label": "Palindrome Pairs - LeetCode 336",
        "url": "https://leetcode.com/problems/palindrome-pairs/"
      },
      "examples": [
        {
          "input": "words = [\"abcd\",\"dcba\",\"lls\",\"s\",\"sssll\"]",
          "output": "[[0,1],[1,0],[3,2],[2,4]]",
          "explanation": "Each listed concatenation is a palindrome."
        },
        {
          "input": "words = [\"bat\",\"tab\",\"cat\"]",
          "output": "[[0,1],[1,0]]",
          "explanation": "bat+tab and tab+bat are palindromes."
        },
        {
          "input": "words = [\"a\",\"\"]",
          "output": "[[0,1],[1,0]]",
          "explanation": "The empty string pairs with any palindrome word."
        }
      ],
      "bruteForceComplexity": "Time O(n^2L); Space O(1) excluding output. Every ordered pair is concatenated and checked.",
      "optimizedComplexity": "Time O(nL^2); Space O(nL). Reversed trie stores palindrome suffix candidates.",
      "recursiveComplexity": "Time O(nL^2); Space O(nL + L). Recursive insertion and search process one character at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> palindromePairs(String[] words) {\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int i = 0; i < words.length; i++) {\n      for (int j = 0; j < words.length; j++) {\n        if (i != j && isPalindrome(words[i] + words[j])) {\n          answer.add(Arrays.asList(i, j));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private boolean isPalindrome(String text) {\n    int left = 0, right = text.length() - 1;\n    while (left < right) {\n      if (text.charAt(left++) != text.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int wordIndex = -1;\n    List<Integer> palindromeBelow = new ArrayList<>();\n  }\n\n  public List<List<Integer>> palindromePairs(String[] words) {\n    Node root = new Node();\n    for (int i = 0; i < words.length; i++) insert(root, words[i], i);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int i = 0; i < words.length; i++) search(root, words[i], i, answer);\n    return answer;\n  }\n\n  private void insert(Node root, String word, int index) {\n    Node node = root;\n    for (int i = word.length() - 1; i >= 0; i--) {\n      if (isPalindrome(word, 0, i)) node.palindromeBelow.add(index);\n      int child = word.charAt(i) - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.wordIndex = index;\n    node.palindromeBelow.add(index);\n  }\n\n  private void search(Node root, String word, int index, List<List<Integer>> answer) {\n    Node node = root;\n    for (int i = 0; i < word.length(); i++) {\n      if (node.wordIndex != -1 && node.wordIndex != index && isPalindrome(word, i, word.length() - 1)) {\n        answer.add(Arrays.asList(index, node.wordIndex));\n      }\n      node = node.next[word.charAt(i) - 'a'];\n      if (node == null) return;\n    }\n    for (int other : node.palindromeBelow) {\n      if (other != index) answer.add(Arrays.asList(index, other));\n    }\n  }\n\n  private boolean isPalindrome(String word, int left, int right) {\n    while (left < right) if (word.charAt(left++) != word.charAt(right--)) return false;\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int wordIndex = -1;\n    List<Integer> palindromeBelow = new ArrayList<>();\n  }\n\n  public List<List<Integer>> palindromePairs(String[] words) {\n    Node root = new Node();\n    for (int i = 0; i < words.length; i++) insert(root, words[i], words[i].length() - 1, i);\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int i = 0; i < words.length; i++) search(root, words[i], 0, i, answer);\n    return answer;\n  }\n\n  private void insert(Node node, String word, int index, int wordIndex) {\n    if (index < 0) {\n      node.wordIndex = wordIndex;\n      node.palindromeBelow.add(wordIndex);\n      return;\n    }\n    if (isPalindrome(word, 0, index)) node.palindromeBelow.add(wordIndex);\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index - 1, wordIndex);\n  }\n\n  private void search(Node node, String word, int index, int wordIndex, List<List<Integer>> answer) {\n    if (node == null) return;\n    if (index == word.length()) {\n      for (int other : node.palindromeBelow) if (other != wordIndex) answer.add(Arrays.asList(wordIndex, other));\n      return;\n    }\n    if (node.wordIndex != -1 && node.wordIndex != wordIndex && isPalindrome(word, index, word.length() - 1)) {\n      answer.add(Arrays.asList(wordIndex, node.wordIndex));\n    }\n    search(node.next[word.charAt(index) - 'a'], word, index + 1, wordIndex, answer);\n  }\n\n  private boolean isPalindrome(String word, int left, int right) {\n    while (left < right) if (word.charAt(left++) != word.charAt(right--)) return false;\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int wordIndex = -1;\n    List<Integer> palindromeBelow = new ArrayList<>();\n  }\n\n  public List<List<Integer>> palindromePairs(String[] words) {\n    Node root = new Node();\n    for (int i = 0; i < words.length; i++) insert(root, words[i], i);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int i = 0; i < words.length; i++) search(root, words[i], i, answer);\n    return answer;\n  }\n\n  private void insert(Node root, String word, int index) {\n    Node node = root;\n    for (int i = word.length() - 1; i >= 0; i--) {\n      if (isPalindrome(word, 0, i)) node.palindromeBelow.add(index);\n      int child = word.charAt(i) - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.wordIndex = index;\n    node.palindromeBelow.add(index);\n  }\n\n  private void search(Node root, String word, int index, List<List<Integer>> answer) {\n    Node node = root;\n    for (int i = 0; i < word.length(); i++) {\n      if (node.wordIndex != -1 && node.wordIndex != index && isPalindrome(word, i, word.length() - 1)) {\n        answer.add(Arrays.asList(index, node.wordIndex));\n      }\n      node = node.next[word.charAt(i) - 'a'];\n      if (node == null) return;\n    }\n    for (int other : node.palindromeBelow) {\n      if (other != index) answer.add(Arrays.asList(index, other));\n    }\n  }\n\n  private boolean isPalindrome(String word, int left, int right) {\n    while (left < right) if (word.charAt(left++) != word.charAt(right--)) return false;\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int wordIndex = -1;\n    List<Integer> palindromeBelow = new ArrayList<>();\n  }\n\n  public List<List<Integer>> palindromePairs(String[] words) {\n    Node root = new Node();\n    for (int i = 0; i < words.length; i++) insert(root, words[i], i);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int i = 0; i < words.length; i++) search(root, words[i], i, answer);\n    return answer;\n  }\n\n  private void insert(Node root, String word, int index) {\n    Node node = root;\n    for (int i = word.length() - 1; i >= 0; i--) {\n      if (isPalindrome(word, 0, i)) node.palindromeBelow.add(index);\n      int child = word.charAt(i) - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.wordIndex = index;\n    node.palindromeBelow.add(index);\n  }\n\n  private void search(Node root, String word, int index, List<List<Integer>> answer) {\n    Node node = root;\n    for (int i = 0; i < word.length(); i++) {\n      if (node.wordIndex != -1 && node.wordIndex != index && isPalindrome(word, i, word.length() - 1)) {\n        answer.add(Arrays.asList(index, node.wordIndex));\n      }\n      node = node.next[word.charAt(i) - 'a'];\n      if (node == null) return;\n    }\n    for (int other : node.palindromeBelow) {\n      if (other != index) answer.add(Arrays.asList(index, other));\n    }\n  }\n\n  private boolean isPalindrome(String word, int left, int right) {\n    while (left < right) if (word.charAt(left++) != word.charAt(right--)) return false;\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Concatenated Words",
      "difficulty": "Hard",
      "subpattern": "Concatenated word detection with trie DP",
      "question": "Given an array of words, return all words that are formed by concatenating at least two shorter words from the same array.",
      "trigger": "Each word must be segmented against a dictionary, and trie traversal tests many prefixes efficiently.",
      "intuition": "Sort by length, insert shorter words first, and check whether the current word can be split into two or more trie words.",
      "edgeCases": "Empty string, duplicate words, word made from two same shorter words, no concatenated words, long repeated prefix.",
      "constraints": "1 <= words.length <= 10000; 0 <= words[i].length <= 30; lowercase English letters.",
      "source": {
        "label": "Concatenated Words - LeetCode 472",
        "url": "https://leetcode.com/problems/concatenated-words/"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"cats\",\"catsdogcats\",\"dog\",\"dogcatsdog\",\"hippopotamuses\",\"rat\",\"ratcatdogcat\"]",
          "output": "[\"catsdogcats\",\"dogcatsdog\",\"ratcatdogcat\"]",
          "explanation": "Each returned word is composed from shorter dictionary words."
        },
        {
          "input": "words = [\"cat\",\"dog\",\"catdog\"]",
          "output": "[\"catdog\"]",
          "explanation": "catdog is cat + dog."
        },
        {
          "input": "words = [\"a\",\"aa\",\"aaa\"]",
          "output": "[\"aa\",\"aaa\"]",
          "explanation": "aa is a+a and aaa can be a+aa."
        }
      ],
      "bruteForceComplexity": "Time O(nL^3); Space O(nL + L). DP checks all splits using a hash set for each word.",
      "optimizedComplexity": "Time O(nL^2); Space O(nL + L). Trie DP follows only dictionary prefixes.",
      "recursiveComplexity": "Time O(nL^2); Space O(nL + L). Memoized recursive trie segmentation stores start positions.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findAllConcatenatedWordsInADict(String[] words) {\n    Set<String> dictionary = new HashSet<>(Arrays.asList(words));\n    List<String> answer = new ArrayList<>();\n    for (String word : words) {\n      if (word.length() > 0 && canBuild(word, dictionary)) answer.add(word);\n    }\n    return answer;\n  }\n\n  private boolean canBuild(String word, Set<String> dictionary) {\n    dictionary.remove(word);\n    boolean[] dp = new boolean[word.length() + 1];\n    dp[0] = true;\n    for (int end = 1; end <= word.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && dictionary.contains(word.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    dictionary.add(word);\n    return dp[word.length()];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public List<String> findAllConcatenatedWordsInADict(String[] words) {\n    Arrays.sort(words, Comparator.comparingInt(String::length));\n    Node root = new Node();\n    List<String> answer = new ArrayList<>();\n    for (String word : words) {\n      if (word.length() == 0) continue;\n      if (canBuild(root, word)) answer.add(word);\n      insert(root, word);\n    }\n    return answer;\n  }\n\n  private boolean canBuild(Node root, String word) {\n    boolean[] dp = new boolean[word.length() + 1];\n    dp[0] = true;\n    for (int start = 0; start < word.length(); start++) {\n      if (!dp[start]) continue;\n      Node node = root;\n      for (int end = start; end < word.length(); end++) {\n        node = node.next[word.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[end + 1] = true;\n      }\n    }\n    return dp[word.length()];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public List<String> findAllConcatenatedWordsInADict(String[] words) {\n    Node root = new Node();\n    for (String word : words) if (!word.isEmpty()) insert(root, word, 0);\n    List<String> answer = new ArrayList<>();\n    for (String word : words) {\n      if (!word.isEmpty() && dfs(root, root, word, 0, 0, new Boolean[word.length() + 1][word.length() + 1])) {\n        answer.add(word);\n      }\n    }\n    return answer;\n  }\n\n  private boolean dfs(Node root, Node node, String word, int index, int count, Boolean[][] memo) {\n    if (index == word.length()) return node.word && count >= 1;\n    if (memo[index][count] != null) return memo[index][count];\n    Node child = node.next[word.charAt(index) - 'a'];\n    if (child == null) return memo[index][count] = false;\n    boolean ok = dfs(root, child, word, index + 1, count, memo);\n    if (child.word) ok |= dfs(root, root, word, index + 1, count + 1, memo);\n    return memo[index][count] = ok;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public List<String> findAllConcatenatedWordsInADict(String[] words) {\n    Arrays.sort(words, Comparator.comparingInt(String::length));\n    Node root = new Node();\n    List<String> answer = new ArrayList<>();\n    for (String word : words) {\n      if (word.length() == 0) continue;\n      if (canBuild(root, word)) answer.add(word);\n      insert(root, word);\n    }\n    return answer;\n  }\n\n  private boolean canBuild(Node root, String word) {\n    boolean[] dp = new boolean[word.length() + 1];\n    dp[0] = true;\n    for (int start = 0; start < word.length(); start++) {\n      if (!dp[start]) continue;\n      Node node = root;\n      for (int end = start; end < word.length(); end++) {\n        node = node.next[word.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[end + 1] = true;\n      }\n    }\n    return dp[word.length()];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public List<String> findAllConcatenatedWordsInADict(String[] words) {\n    Arrays.sort(words, Comparator.comparingInt(String::length));\n    Node root = new Node();\n    List<String> answer = new ArrayList<>();\n    for (String word : words) {\n      if (word.length() == 0) continue;\n      if (canBuild(root, word)) answer.add(word);\n      insert(root, word);\n    }\n    return answer;\n  }\n\n  private boolean canBuild(Node root, String word) {\n    boolean[] dp = new boolean[word.length() + 1];\n    dp[0] = true;\n    for (int start = 0; start < word.length(); start++) {\n      if (!dp[start]) continue;\n      Node node = root;\n      for (int end = start; end < word.length(); end++) {\n        node = node.next[word.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[end + 1] = true;\n      }\n    }\n    return dp[word.length()];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Word Squares",
      "difficulty": "Hard",
      "subpattern": "Word square prefix trie backtracking",
      "question": "Given same-length words, return all word squares where the kth row and kth column read the same string.",
      "trigger": "At each row, the next word must match a prefix formed by existing columns, so prefix lookup is the bottleneck.",
      "intuition": "Use a trie to fetch candidate words for the required prefix, then backtrack one row at a time.",
      "edgeCases": "No square, one-letter words, duplicate words if present, shared prefixes, all words same length.",
      "constraints": "1 <= words.length <= 1000; 1 <= words[i].length <= 5 in the original problem; words contain lowercase letters.",
      "source": {
        "label": "Word Squares - LeetCode 425",
        "url": "https://leetcode.com/problems/word-squares/"
      },
      "examples": [
        {
          "input": "words = [\"area\",\"lead\",\"wall\",\"lady\",\"ball\"]",
          "output": "[[\"wall\",\"area\",\"lead\",\"lady\"],[\"ball\",\"area\",\"lead\",\"lady\"]]",
          "explanation": "Rows and columns match for both squares."
        },
        {
          "input": "words = [\"abat\",\"baba\",\"atan\",\"atal\"]",
          "output": "[[\"baba\",\"abat\",\"baba\",\"atan\"],[\"baba\",\"abat\",\"baba\",\"atal\"]]",
          "explanation": "The prefix trie finds valid row candidates."
        },
        {
          "input": "words = [\"a\"]",
          "output": "[[\"a\"]]",
          "explanation": "A one-letter word forms a one-row square."
        }
      ],
      "bruteForceComplexity": "Time O(n^k * k^2); Space O(k). Brute force tries word choices for each row.",
      "optimizedComplexity": "Time O(number of partial squares * candidate lookup); Space O(nk). Trie prefix lookup prunes invalid branches.",
      "recursiveComplexity": "Time O(number of partial squares * candidate lookup); Space O(nk + k). Recursive backtracking stores current square.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> wordSquares(String[] words) {\n    List<List<String>> answer = new ArrayList<>();\n    int size = words[0].length();\n    backtrack(words, size, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(String[] words, int size, List<String> square, List<List<String>> answer) {\n    if (square.size() == size) {\n      if (valid(square)) answer.add(new ArrayList<>(square));\n      return;\n    }\n    for (String word : words) {\n      square.add(word);\n      if (validPrefix(square)) backtrack(words, size, square, answer);\n      square.remove(square.size() - 1);\n    }\n  }\n\n  private boolean validPrefix(List<String> square) {\n    for (int r = 0; r < square.size(); r++) {\n      for (int c = 0; c < square.size(); c++) {\n        if (square.get(r).charAt(c) != square.get(c).charAt(r)) return false;\n      }\n    }\n    return true;\n  }\n\n  private boolean valid(List<String> square) {\n    return validPrefix(square);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    List<String> words = new ArrayList<>();\n  }\n\n  public List<List<String>> wordSquares(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    List<List<String>> answer = new ArrayList<>();\n    for (String word : words) {\n      List<String> square = new ArrayList<>();\n      square.add(word);\n      build(words[0].length(), root, square, answer);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    node.words.add(word);\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      node.words.add(word);\n    }\n  }\n\n  private void build(int size, Node root, List<String> square, List<List<String>> answer) {\n    if (square.size() == size) {\n      answer.add(new ArrayList<>(square));\n      return;\n    }\n    int row = square.size();\n    StringBuilder prefix = new StringBuilder();\n    for (String word : square) prefix.append(word.charAt(row));\n    for (String candidate : candidates(root, prefix.toString())) {\n      square.add(candidate);\n      build(size, root, square, answer);\n      square.remove(square.size() - 1);\n    }\n  }\n\n  private List<String> candidates(Node root, String prefix) {\n    Node node = root;\n    for (char ch : prefix.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return Collections.emptyList();\n    }\n    return node.words;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    List<String> words = new ArrayList<>();\n  }\n\n  public List<List<String>> wordSquares(String[] words) {\n    Node root = new Node();\n    insertAll(root, words, 0);\n    List<List<String>> answer = new ArrayList<>();\n    start(words, 0, root, answer);\n    return answer;\n  }\n\n  private void start(String[] words, int index, Node root, List<List<String>> answer) {\n    if (index == words.length) return;\n    List<String> square = new ArrayList<>();\n    square.add(words[index]);\n    dfs(words[index].length(), root, square, answer);\n    start(words, index + 1, root, answer);\n  }\n\n  private void dfs(int size, Node root, List<String> square, List<List<String>> answer) {\n    if (square.size() == size) {\n      answer.add(new ArrayList<>(square));\n      return;\n    }\n    String prefix = prefix(square, square.size(), 0, new StringBuilder()).toString();\n    for (String next : find(root, prefix, 0).words) {\n      square.add(next);\n      dfs(size, root, square, answer);\n      square.remove(square.size() - 1);\n    }\n  }\n\n  private StringBuilder prefix(List<String> square, int row, int index, StringBuilder out) {\n    if (index == square.size()) return out;\n    out.append(square.get(index).charAt(row));\n    return prefix(square, row, index + 1, out);\n  }\n\n  private Node find(Node node, String prefix, int index) {\n    if (node == null) return new Node();\n    if (index == prefix.length()) return node;\n    return find(node.next[prefix.charAt(index) - 'a'], prefix, index + 1);\n  }\n\n  private void insertAll(Node root, String[] words, int index) {\n    if (index == words.length) return;\n    insert(root, words[index], 0, words[index]);\n    insertAll(root, words, index + 1);\n  }\n\n  private void insert(Node node, String word, int index, String full) {\n    node.words.add(full);\n    if (index == word.length()) return;\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1, full);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    List<String> words = new ArrayList<>();\n  }\n\n  public List<List<String>> wordSquares(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    List<List<String>> answer = new ArrayList<>();\n    for (String word : words) {\n      List<String> square = new ArrayList<>();\n      square.add(word);\n      build(words[0].length(), root, square, answer);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    node.words.add(word);\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      node.words.add(word);\n    }\n  }\n\n  private void build(int size, Node root, List<String> square, List<List<String>> answer) {\n    if (square.size() == size) {\n      answer.add(new ArrayList<>(square));\n      return;\n    }\n    int row = square.size();\n    StringBuilder prefix = new StringBuilder();\n    for (String word : square) prefix.append(word.charAt(row));\n    for (String candidate : candidates(root, prefix.toString())) {\n      square.add(candidate);\n      build(size, root, square, answer);\n      square.remove(square.size() - 1);\n    }\n  }\n\n  private List<String> candidates(Node root, String prefix) {\n    Node node = root;\n    for (char ch : prefix.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return Collections.emptyList();\n    }\n    return node.words;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    List<String> words = new ArrayList<>();\n  }\n\n  public List<List<String>> wordSquares(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    List<List<String>> answer = new ArrayList<>();\n    for (String word : words) {\n      List<String> square = new ArrayList<>();\n      square.add(word);\n      build(words[0].length(), root, square, answer);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    node.words.add(word);\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      node.words.add(word);\n    }\n  }\n\n  private void build(int size, Node root, List<String> square, List<List<String>> answer) {\n    if (square.size() == size) {\n      answer.add(new ArrayList<>(square));\n      return;\n    }\n    int row = square.size();\n    StringBuilder prefix = new StringBuilder();\n    for (String word : square) prefix.append(word.charAt(row));\n    for (String candidate : candidates(root, prefix.toString())) {\n      square.add(candidate);\n      build(size, root, square, answer);\n      square.remove(square.size() - 1);\n    }\n  }\n\n  private List<String> candidates(Node root, String prefix) {\n    Node node = root;\n    for (char ch : prefix.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return Collections.emptyList();\n    }\n    return node.words;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Index Pairs of a String",
      "difficulty": "Easy",
      "subpattern": "Trie matching from every start index",
      "question": "Given a text and a list of words, return all index pairs [i, j] where text substring i..j appears in words.",
      "trigger": "The task repeatedly matches dictionary words starting at each text index, which a trie can stop early.",
      "intuition": "For every start index, walk the trie forward through text and emit a pair whenever a terminal word is reached.",
      "edgeCases": "Overlapping matches, same start different end, duplicate words, no matches, word longer than text.",
      "constraints": "1 <= text.length <= 100; 1 <= words.length <= 20; words and text contain lowercase English letters.",
      "source": {
        "label": "Index Pairs of a String - LeetCode 1065",
        "url": "https://leetcode.com/problems/index-pairs-of-a-string/"
      },
      "examples": [
        {
          "input": "text = \"thestoryofleetcodeandme\", words = [\"story\",\"fleet\",\"leetcode\"]",
          "output": "[[3,7],[9,13],[10,17]]",
          "explanation": "All matching substrings are returned in sorted order."
        },
        {
          "input": "text = \"ababa\", words = [\"aba\",\"ab\"]",
          "output": "[[0,1],[0,2],[2,3],[2,4]]",
          "explanation": "Matches can overlap."
        },
        {
          "input": "text = \"abc\", words = [\"d\"]",
          "output": "[]",
          "explanation": "No dictionary word appears."
        }
      ],
      "bruteForceComplexity": "Time O(n * W * L); Space O(P). Every start checks every word.",
      "optimizedComplexity": "Time O(n * maxWordLength); Space O(total word chars + P). Trie walk stops when the prefix fails.",
      "recursiveComplexity": "Time O(n * maxWordLength); Space O(total word chars + maxWordLength + P). Recursive scan follows one path per start.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] indexPairs(String text, String[] words) {\n    List<int[]> pairs = new ArrayList<>();\n    for (int i = 0; i < text.length(); i++) {\n      for (String word : words) {\n        if (text.startsWith(word, i)) pairs.add(new int[] {i, i + word.length() - 1});\n      }\n    }\n    pairs.sort((a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);\n    return pairs.toArray(new int[pairs.size()][]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int[][] indexPairs(String text, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    List<int[]> pairs = new ArrayList<>();\n\n    for (int start = 0; start < text.length(); start++) {\n      Node node = root;\n      for (int end = start; end < text.length(); end++) {\n        node = node.next[text.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) pairs.add(new int[] {start, end});\n      }\n    }\n    return pairs.toArray(new int[pairs.size()][]);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int[][] indexPairs(String text, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word, 0);\n    List<int[]> pairs = new ArrayList<>();\n    scanStarts(text, 0, root, pairs);\n    return pairs.toArray(new int[pairs.size()][]);\n  }\n\n  private void scanStarts(String text, int start, Node root, List<int[]> pairs) {\n    if (start == text.length()) return;\n    collect(text, start, start, root, pairs);\n    scanStarts(text, start + 1, root, pairs);\n  }\n\n  private void collect(String text, int start, int end, Node node, List<int[]> pairs) {\n    if (end == text.length()) return;\n    Node child = node.next[text.charAt(end) - 'a'];\n    if (child == null) return;\n    if (child.word) pairs.add(new int[] {start, end});\n    collect(text, start, end + 1, child, pairs);\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int[][] indexPairs(String text, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    List<int[]> pairs = new ArrayList<>();\n\n    for (int start = 0; start < text.length(); start++) {\n      Node node = root;\n      for (int end = start; end < text.length(); end++) {\n        node = node.next[text.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) pairs.add(new int[] {start, end});\n      }\n    }\n    return pairs.toArray(new int[pairs.size()][]);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int[][] indexPairs(String text, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    List<int[]> pairs = new ArrayList<>();\n\n    for (int start = 0; start < text.length(); start++) {\n      Node node = root;\n      for (int end = start; end < text.length(); end++) {\n        node = node.next[text.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) pairs.add(new int[] {start, end});\n      }\n    }\n    return pairs.toArray(new int[pairs.size()][]);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Prefix and Suffix Search",
      "difficulty": "Hard",
      "subpattern": "Combined prefix-suffix trie indexing",
      "question": "Design WordFilter so f(prefix, suffix) returns the largest index of a word that starts with prefix and ends with suffix.",
      "trigger": "Queries constrain both ends of the same word, so combined suffix#prefix keys can be indexed in one trie.",
      "intuition": "For each word, insert every suffix plus a separator plus the full word; query suffix#prefix and read the stored max index.",
      "edgeCases": "Empty prefix, empty suffix, no match, duplicate words at later index, longest suffix/prefix combination.",
      "constraints": "1 <= words.length <= 15000; 1 <= words[i].length <= 10; at most 15000 queries.",
      "source": {
        "label": "Prefix and Suffix Search - LeetCode 745",
        "url": "https://leetcode.com/problems/prefix-and-suffix-search/"
      },
      "examples": [
        {
          "input": "WordFilter([\"apple\"]), f(\"a\", \"e\")",
          "output": "0",
          "explanation": "apple starts with a and ends with e."
        },
        {
          "input": "WordFilter([\"apple\",\"apply\"]), f(\"app\", \"ly\")",
          "output": "1",
          "explanation": "apply is the latest matching word."
        },
        {
          "input": "f(\"b\", \"e\")",
          "output": "-1",
          "explanation": "No word has both constraints."
        }
      ],
      "bruteForceComplexity": "Time constructor O(1), query O(nL); Space O(nL). Each query scans all words.",
      "optimizedComplexity": "Time constructor O(nL^2), query O(P + S); Space O(nL^2). Combined trie stores every suffix separator word path.",
      "recursiveComplexity": "Time constructor O(nL^2), query O(P + S); Space O(nL^2 + L). Recursive trie insert/find follows combined keys.",
      "bruteForceCode": "class WordFilter {\n  private final String[] words;\n\n  public WordFilter(String[] words) {\n    this.words = words;\n  }\n\n  public int f(String pref, String suff) {\n    for (int i = words.length - 1; i >= 0; i--) {\n      if (words[i].startsWith(pref) && words[i].endsWith(suff)) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass WordFilter {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    int weight = -1;\n  }\n\n  private final Node root = new Node();\n\n  public WordFilter(String[] words) {\n    for (int weight = 0; weight < words.length; weight++) {\n      String word = words[weight];\n      for (int i = 0; i <= word.length(); i++) {\n        insert(word.substring(i) + \"{\" + word, weight);\n      }\n    }\n  }\n\n  public int f(String pref, String suff) {\n    Node node = root;\n    String key = suff + \"{\" + pref;\n    for (char ch : key.toCharArray()) {\n      node = node.next.get(ch);\n      if (node == null) return -1;\n    }\n    return node.weight;\n  }\n\n  private void insert(String key, int weight) {\n    Node node = root;\n    node.weight = weight;\n    for (char ch : key.toCharArray()) {\n      node = node.next.computeIfAbsent(ch, unused -> new Node());\n      node.weight = weight;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass WordFilter {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    int weight = -1;\n  }\n\n  private final Node root = new Node();\n\n  public WordFilter(String[] words) {\n    for (int weight = 0; weight < words.length; weight++) addSuffixes(words[weight], 0, weight);\n  }\n\n  public int f(String pref, String suff) {\n    Node node = find(root, suff + \"{\" + pref, 0);\n    return node == null ? -1 : node.weight;\n  }\n\n  private void addSuffixes(String word, int start, int weight) {\n    if (start > word.length()) return;\n    insert(root, word.substring(start) + \"{\" + word, 0, weight);\n    addSuffixes(word, start + 1, weight);\n  }\n\n  private void insert(Node node, String key, int index, int weight) {\n    node.weight = weight;\n    if (index == key.length()) return;\n    char ch = key.charAt(index);\n    node.next.putIfAbsent(ch, new Node());\n    insert(node.next.get(ch), key, index + 1, weight);\n  }\n\n  private Node find(Node node, String key, int index) {\n    if (node == null || index == key.length()) return node;\n    return find(node.next.get(key.charAt(index)), key, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass WordFilter {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    int weight = -1;\n  }\n\n  private final Node root = new Node();\n\n  public WordFilter(String[] words) {\n    for (int weight = 0; weight < words.length; weight++) {\n      String word = words[weight];\n      for (int i = 0; i <= word.length(); i++) {\n        insert(word.substring(i) + \"{\" + word, weight);\n      }\n    }\n  }\n\n  public int f(String pref, String suff) {\n    Node node = root;\n    String key = suff + \"{\" + pref;\n    for (char ch : key.toCharArray()) {\n      node = node.next.get(ch);\n      if (node == null) return -1;\n    }\n    return node.weight;\n  }\n\n  private void insert(String key, int weight) {\n    Node node = root;\n    node.weight = weight;\n    for (char ch : key.toCharArray()) {\n      node = node.next.computeIfAbsent(ch, unused -> new Node());\n      node.weight = weight;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass WordFilter {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    int weight = -1;\n  }\n\n  private final Node root = new Node();\n\n  public WordFilter(String[] words) {\n    for (int weight = 0; weight < words.length; weight++) {\n      String word = words[weight];\n      for (int i = 0; i <= word.length(); i++) {\n        insert(word.substring(i) + \"{\" + word, weight);\n      }\n    }\n  }\n\n  public int f(String pref, String suff) {\n    Node node = root;\n    String key = suff + \"{\" + pref;\n    for (char ch : key.toCharArray()) {\n      node = node.next.get(ch);\n      if (node == null) return -1;\n    }\n    return node.weight;\n  }\n\n  private void insert(String key, int weight) {\n    Node node = root;\n    node.weight = weight;\n    for (char ch : key.toCharArray()) {\n      node = node.next.computeIfAbsent(ch, unused -> new Node());\n      node.weight = weight;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Implement Magic Dictionary",
      "difficulty": "Medium",
      "subpattern": "Trie search with exactly one mismatch",
      "question": "Design a dictionary that supports building from words and searching whether a query can match a dictionary word after modifying exactly one character.",
      "trigger": "Search needs same-length word matching with exactly one mismatch, which trie DFS can track as state.",
      "intuition": "Walk matching characters normally, but allow one branch where the trie child character differs from the query character.",
      "edgeCases": "Exact same word should return false, different length, one mismatch at first or last character, duplicate dictionary words.",
      "constraints": "1 <= dictionary.length <= 100; 1 <= word.length <= 100; searchWord contains lowercase English letters.",
      "source": {
        "label": "Implement Magic Dictionary - LeetCode 676",
        "url": "https://leetcode.com/problems/implement-magic-dictionary/"
      },
      "examples": [
        {
          "input": "buildDict([\"hello\",\"leetcode\"]), search(\"hello\")",
          "output": "false",
          "explanation": "Exactly one character must change."
        },
        {
          "input": "search(\"hhllo\")",
          "output": "true",
          "explanation": "Changing e to h gives hello."
        },
        {
          "input": "search(\"hell\")",
          "output": "false",
          "explanation": "Length must stay the same."
        }
      ],
      "bruteForceComplexity": "Time build O(nL), search O(nL); Space O(nL). Every word is compared by mismatch count.",
      "optimizedComplexity": "Time build O(nL), search O(26L) worst case; Space O(nL). Trie state tracks whether the modification was used.",
      "recursiveComplexity": "Time build O(nL), search O(26L) worst case; Space O(nL + L). Recursive DFS tracks mismatch count.",
      "bruteForceCode": "class MagicDictionary {\n  private String[] words;\n\n  public void buildDict(String[] dictionary) {\n    words = dictionary;\n  }\n\n  public boolean search(String searchWord) {\n    for (String word : words) {\n      if (word.length() != searchWord.length()) continue;\n      int diff = 0;\n      for (int i = 0; i < word.length(); i++) {\n        if (word.charAt(i) != searchWord.charAt(i)) diff++;\n      }\n      if (diff == 1) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MagicDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void buildDict(String[] dictionary) {\n    for (String word : dictionary) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int child = ch - 'a';\n        if (node.next[child] == null) node.next[child] = new Node();\n        node = node.next[child];\n      }\n      node.word = true;\n    }\n  }\n\n  public boolean search(String searchWord) {\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == searchWord.length()) {\n        if (state.diff == 1 && state.node.word) return true;\n        continue;\n      }\n      int current = searchWord.charAt(state.index) - 'a';\n      for (int i = 0; i < 26; i++) {\n        if (state.node.next[i] == null) continue;\n        int nextDiff = state.diff + (i == current ? 0 : 1);\n        if (nextDiff <= 1) stack.push(new State(state.node.next[i], state.index + 1, nextDiff));\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    Node node;\n    int index;\n    int diff;\n    State(Node node, int index, int diff) { this.node = node; this.index = index; this.diff = diff; }\n  }\n}",
      "recursiveCode": "class MagicDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void buildDict(String[] dictionary) {\n    for (String word : dictionary) insert(root, word, 0);\n  }\n\n  public boolean search(String searchWord) {\n    return dfs(root, searchWord, 0, 0);\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private boolean dfs(Node node, String word, int index, int diff) {\n    if (node == null || diff > 1) return false;\n    if (index == word.length()) return diff == 1 && node.word;\n    int current = word.charAt(index) - 'a';\n    for (int i = 0; i < 26; i++) {\n      if (dfs(node.next[i], word, index + 1, diff + (i == current ? 0 : 1))) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MagicDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void buildDict(String[] dictionary) {\n    for (String word : dictionary) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int child = ch - 'a';\n        if (node.next[child] == null) node.next[child] = new Node();\n        node = node.next[child];\n      }\n      node.word = true;\n    }\n  }\n\n  public boolean search(String searchWord) {\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == searchWord.length()) {\n        if (state.diff == 1 && state.node.word) return true;\n        continue;\n      }\n      int current = searchWord.charAt(state.index) - 'a';\n      for (int i = 0; i < 26; i++) {\n        if (state.node.next[i] == null) continue;\n        int nextDiff = state.diff + (i == current ? 0 : 1);\n        if (nextDiff <= 1) stack.push(new State(state.node.next[i], state.index + 1, nextDiff));\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    Node node;\n    int index;\n    int diff;\n    State(Node node, int index, int diff) { this.node = node; this.index = index; this.diff = diff; }\n  }\n}",
      "code": "import java.util.*;\n\nclass MagicDictionary {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void buildDict(String[] dictionary) {\n    for (String word : dictionary) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int child = ch - 'a';\n        if (node.next[child] == null) node.next[child] = new Node();\n        node = node.next[child];\n      }\n      node.word = true;\n    }\n  }\n\n  public boolean search(String searchWord) {\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == searchWord.length()) {\n        if (state.diff == 1 && state.node.word) return true;\n        continue;\n      }\n      int current = searchWord.charAt(state.index) - 'a';\n      for (int i = 0; i < 26; i++) {\n        if (state.node.next[i] == null) continue;\n        int nextDiff = state.diff + (i == current ? 0 : 1);\n        if (nextDiff <= 1) stack.push(new State(state.node.next[i], state.index + 1, nextDiff));\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    Node node;\n    int index;\n    int diff;\n    State(Node node, int index, int diff) { this.node = node; this.index = index; this.diff = diff; }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Count Pairs With XOR in a Range",
      "difficulty": "Hard",
      "subpattern": "Bitwise trie for range XOR counts",
      "question": "Given nums, low, and high, count pairs i < j whose XOR value lies in the inclusive range [low, high].",
      "trigger": "Counting prior numbers with XOR below a limit is a bitwise trie prefix-count query.",
      "intuition": "For each number, count previous numbers with XOR <= high and subtract those with XOR < low.",
      "edgeCases": "low equals high, duplicate numbers, zeros, one element, high at large bit boundary.",
      "constraints": "1 <= nums.length <= 20000; 1 <= nums[i] <= 20000; 1 <= low <= high <= 20000.",
      "source": {
        "label": "Count Pairs With XOR in a Range - LeetCode 1803",
        "url": "https://leetcode.com/problems/count-pairs-with-xor-in-a-range/"
      },
      "examples": [
        {
          "input": "nums = [1,4,2,7], low = 2, high = 6",
          "output": "6",
          "explanation": "Six index pairs have XOR in the target range."
        },
        {
          "input": "nums = [9,8,4,2,1], low = 5, high = 14",
          "output": "8",
          "explanation": "Eight pairs satisfy the inclusive range."
        },
        {
          "input": "nums = [1], low = 1, high = 1",
          "output": "0",
          "explanation": "No pair exists."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Every pair XOR is checked directly.",
      "optimizedComplexity": "Time O(15n); Space O(15n). Binary trie counts prior values with XOR below each bound.",
      "recursiveComplexity": "Time O(15n); Space O(15n + 15). Recursive query processes one bit per level.",
      "bruteForceCode": "class Solution {\n  public int countPairs(int[] nums, int low, int high) {\n    int count = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        int value = nums[i] ^ nums[j];\n        if (low <= value && value <= high) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n    int count;\n  }\n\n  public int countPairs(int[] nums, int low, int high) {\n    Node root = new Node();\n    int answer = 0;\n    for (int num : nums) {\n      answer += countLess(root, num, high + 1) - countLess(root, num, low);\n      insert(root, num);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 14; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n      node.count++;\n    }\n  }\n\n  private int countLess(Node root, int num, int limit) {\n    Node node = root;\n    int count = 0;\n    for (int bit = 14; bit >= 0 && node != null; bit--) {\n      int current = (num >>> bit) & 1;\n      int bound = (limit >>> bit) & 1;\n      if (bound == 1) {\n        if (node.next[current] != null) count += node.next[current].count;\n        node = node.next[current ^ 1];\n      } else {\n        node = node.next[current];\n      }\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n    int count;\n  }\n\n  public int countPairs(int[] nums, int low, int high) {\n    Node root = new Node();\n    int answer = 0;\n    for (int num : nums) {\n      answer += countLess(root, num, high + 1, 14) - countLess(root, num, low, 14);\n      insert(root, num, 14);\n    }\n    return answer;\n  }\n\n  private void insert(Node node, int num, int bit) {\n    if (bit < 0) return;\n    int current = (num >>> bit) & 1;\n    if (node.next[current] == null) node.next[current] = new Node();\n    node.next[current].count++;\n    insert(node.next[current], num, bit - 1);\n  }\n\n  private int countLess(Node node, int num, int limit, int bit) {\n    if (node == null || bit < 0) return 0;\n    int current = (num >>> bit) & 1;\n    int bound = (limit >>> bit) & 1;\n    if (bound == 0) return countLess(node.next[current], num, limit, bit - 1);\n    int sameCount = node.next[current] == null ? 0 : node.next[current].count;\n    return sameCount + countLess(node.next[current ^ 1], num, limit, bit - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n    int count;\n  }\n\n  public int countPairs(int[] nums, int low, int high) {\n    Node root = new Node();\n    int answer = 0;\n    for (int num : nums) {\n      answer += countLess(root, num, high + 1) - countLess(root, num, low);\n      insert(root, num);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 14; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n      node.count++;\n    }\n  }\n\n  private int countLess(Node root, int num, int limit) {\n    Node node = root;\n    int count = 0;\n    for (int bit = 14; bit >= 0 && node != null; bit--) {\n      int current = (num >>> bit) & 1;\n      int bound = (limit >>> bit) & 1;\n      if (bound == 1) {\n        if (node.next[current] != null) count += node.next[current].count;\n        node = node.next[current ^ 1];\n      } else {\n        node = node.next[current];\n      }\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n    int count;\n  }\n\n  public int countPairs(int[] nums, int low, int high) {\n    Node root = new Node();\n    int answer = 0;\n    for (int num : nums) {\n      answer += countLess(root, num, high + 1) - countLess(root, num, low);\n      insert(root, num);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 14; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n      node.count++;\n    }\n  }\n\n  private int countLess(Node root, int num, int limit) {\n    Node node = root;\n    int count = 0;\n    for (int bit = 14; bit >= 0 && node != null; bit--) {\n      int current = (num >>> bit) & 1;\n      int bound = (limit >>> bit) & 1;\n      if (bound == 1) {\n        if (node.next[current] != null) count += node.next[current].count;\n        node = node.next[current ^ 1];\n      } else {\n        node = node.next[current];\n      }\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sum of Prefix Scores of Strings",
      "difficulty": "Hard",
      "subpattern": "Prefix aggregate trie with counts",
      "question": "For each word, return the sum of counts of all its non-empty prefixes across the entire words array.",
      "trigger": "Every prefix needs a frequency count shared by all words, which is exactly what trie nodes store.",
      "intuition": "Insert every word and increment each prefix node count; then sum counts along each word path.",
      "edgeCases": "Duplicate words, one-character words, no shared prefixes, all words same, long shared prefix chain.",
      "constraints": "1 <= words.length <= 1000; 1 <= words[i].length <= 1000; total characters <= 1000000.",
      "source": {
        "label": "Sum of Prefix Scores of Strings - LeetCode 2416",
        "url": "https://leetcode.com/problems/sum-of-prefix-scores-of-strings/"
      },
      "examples": [
        {
          "input": "words = [\"abc\",\"ab\",\"bc\",\"b\"]",
          "output": "[5,4,3,2]",
          "explanation": "abc has prefix counts a=2, ab=2, abc=1 for total 5."
        },
        {
          "input": "words = [\"abcd\"]",
          "output": "[4]",
          "explanation": "Each of its four prefixes appears once."
        },
        {
          "input": "words = [\"a\",\"a\"]",
          "output": "[2,2]",
          "explanation": "The prefix a appears twice."
        }
      ],
      "bruteForceComplexity": "Time O(n^2L^2); Space O(nL). Every prefix is compared against every word.",
      "optimizedComplexity": "Time O(total characters); Space O(total characters). Trie nodes store prefix frequencies.",
      "recursiveComplexity": "Time O(total characters); Space O(total characters + L). Recursive insert and score walk one character per level.",
      "bruteForceCode": "class Solution {\n  public int[] sumPrefixScores(String[] words) {\n    int[] answer = new int[words.length];\n    for (int i = 0; i < words.length; i++) {\n      for (int len = 1; len <= words[i].length(); len++) {\n        String prefix = words[i].substring(0, len);\n        for (String word : words) {\n          if (word.startsWith(prefix)) answer[i]++;\n        }\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int count;\n  }\n\n  public int[] sumPrefixScores(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n\n    int[] answer = new int[words.length];\n    for (int i = 0; i < words.length; i++) {\n      Node node = root;\n      for (char ch : words[i].toCharArray()) {\n        node = node.next[ch - 'a'];\n        answer[i] += node.count;\n      }\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      node.count++;\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int count;\n  }\n\n  public int[] sumPrefixScores(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word, 0);\n    int[] answer = new int[words.length];\n    fillScores(words, 0, root, answer);\n    return answer;\n  }\n\n  private void fillScores(String[] words, int index, Node root, int[] answer) {\n    if (index == words.length) return;\n    answer[index] = score(root, words[index], 0);\n    fillScores(words, index + 1, root, answer);\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) return;\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    node.next[child].count++;\n    insert(node.next[child], word, index + 1);\n  }\n\n  private int score(Node node, String word, int index) {\n    if (index == word.length()) return 0;\n    Node child = node.next[word.charAt(index) - 'a'];\n    return child.count + score(child, word, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int count;\n  }\n\n  public int[] sumPrefixScores(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n\n    int[] answer = new int[words.length];\n    for (int i = 0; i < words.length; i++) {\n      Node node = root;\n      for (char ch : words[i].toCharArray()) {\n        node = node.next[ch - 'a'];\n        answer[i] += node.count;\n      }\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      node.count++;\n    }\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int count;\n  }\n\n  public int[] sumPrefixScores(String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n\n    int[] answer = new int[words.length];\n    for (int i = 0; i < words.length; i++) {\n      Node node = root;\n      for (char ch : words[i].toCharArray()) {\n        node = node.next[ch - 'a'];\n        answer[i] += node.count;\n      }\n    }\n    return answer;\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      node.count++;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Short Encoding of Words",
      "difficulty": "Medium",
      "subpattern": "Reverse trie for suffix compression",
      "question": "Given words, return the length of the shortest reference string that encodes every word as a suffix followed by #.",
      "trigger": "Words that are suffixes of other words do not need separate encoding, so reversed words share prefix paths.",
      "intuition": "Insert reversed words; only leaf words contribute word length plus one for #.",
      "edgeCases": "Duplicate words, one word suffix of another, all independent words, single word, repeated suffix chains.",
      "constraints": "1 <= words.length <= 2000; 1 <= words[i].length <= 7; words contain lowercase English letters.",
      "source": {
        "label": "Short Encoding of Words - LeetCode 820",
        "url": "https://leetcode.com/problems/short-encoding-of-words/"
      },
      "examples": [
        {
          "input": "words = [\"time\",\"me\",\"bell\"]",
          "output": "10",
          "explanation": "time#bell# encodes me because me is a suffix of time."
        },
        {
          "input": "words = [\"t\"]",
          "output": "2",
          "explanation": "The encoding is t#."
        },
        {
          "input": "words = [\"me\",\"time\",\"ime\"]",
          "output": "5",
          "explanation": "time# also covers me and ime."
        }
      ],
      "bruteForceComplexity": "Time O(n^2L); Space O(nL). Remove words that are suffixes of another word.",
      "optimizedComplexity": "Time O(nL); Space O(nL). Reverse trie counts only terminal leaves.",
      "recursiveComplexity": "Time O(nL); Space O(nL + L). Recursive trie traversal sums leaf depths.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumLengthEncoding(String[] words) {\n    Set<String> needed = new HashSet<>(Arrays.asList(words));\n    for (String word : words) {\n      for (int i = 1; i < word.length(); i++) {\n        needed.remove(word.substring(i));\n      }\n    }\n    int length = 0;\n    for (String word : needed) length += word.length() + 1;\n    return length;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n  }\n\n  public int minimumLengthEncoding(String[] words) {\n    Set<String> unique = new HashSet<>(Arrays.asList(words));\n    Node root = new Node();\n    Map<Node, Integer> leafDepth = new HashMap<>();\n\n    for (String word : unique) {\n      Node node = root;\n      for (int i = word.length() - 1; i >= 0; i--) {\n        int child = word.charAt(i) - 'a';\n        if (node.next[child] == null) node.next[child] = new Node();\n        node = node.next[child];\n      }\n      leafDepth.put(node, word.length() + 1);\n    }\n\n    int total = 0;\n    for (Map.Entry<Node, Integer> entry : leafDepth.entrySet()) {\n      if (isLeaf(entry.getKey())) total += entry.getValue();\n    }\n    return total;\n  }\n\n  private boolean isLeaf(Node node) {\n    for (Node child : node.next) if (child != null) return false;\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n  }\n\n  public int minimumLengthEncoding(String[] words) {\n    Node root = new Node();\n    Set<String> unique = new HashSet<>(Arrays.asList(words));\n    for (String word : unique) insert(root, word, word.length() - 1);\n    return length(root, 0);\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index < 0) return;\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index - 1);\n  }\n\n  private int length(Node node, int depth) {\n    boolean leaf = true;\n    int total = 0;\n    for (Node child : node.next) {\n      if (child != null) {\n        leaf = false;\n        total += length(child, depth + 1);\n      }\n    }\n    return leaf ? depth + 1 : total;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n  }\n\n  public int minimumLengthEncoding(String[] words) {\n    Set<String> unique = new HashSet<>(Arrays.asList(words));\n    Node root = new Node();\n    Map<Node, Integer> leafDepth = new HashMap<>();\n\n    for (String word : unique) {\n      Node node = root;\n      for (int i = word.length() - 1; i >= 0; i--) {\n        int child = word.charAt(i) - 'a';\n        if (node.next[child] == null) node.next[child] = new Node();\n        node = node.next[child];\n      }\n      leafDepth.put(node, word.length() + 1);\n    }\n\n    int total = 0;\n    for (Map.Entry<Node, Integer> entry : leafDepth.entrySet()) {\n      if (isLeaf(entry.getKey())) total += entry.getValue();\n    }\n    return total;\n  }\n\n  private boolean isLeaf(Node node) {\n    for (Node child : node.next) if (child != null) return false;\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n  }\n\n  public int minimumLengthEncoding(String[] words) {\n    Set<String> unique = new HashSet<>(Arrays.asList(words));\n    Node root = new Node();\n    Map<Node, Integer> leafDepth = new HashMap<>();\n\n    for (String word : unique) {\n      Node node = root;\n      for (int i = word.length() - 1; i >= 0; i--) {\n        int child = word.charAt(i) - 'a';\n        if (node.next[child] == null) node.next[child] = new Node();\n        node = node.next[child];\n      }\n      leafDepth.put(node, word.length() + 1);\n    }\n\n    int total = 0;\n    for (Map.Entry<Node, Integer> entry : leafDepth.entrySet()) {\n      if (isLeaf(entry.getKey())) total += entry.getValue();\n    }\n    return total;\n  }\n\n  private boolean isLeaf(Node node) {\n    for (Node child : node.next) if (child != null) return false;\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Word Break with Trie",
      "difficulty": "Medium",
      "subpattern": "Trie DP word segmentation",
      "question": "Given a string and a dictionary, return true if the string can be segmented into one or more dictionary words.",
      "trigger": "Every start index needs dictionary prefix matches; a trie avoids checking every word at every position.",
      "intuition": "Use DP over start positions and walk the trie forward to activate reachable end positions.",
      "edgeCases": "Empty segmentation not needed, repeated dictionary words, full string is one word, impossible suffix, overlapping choices.",
      "constraints": "1 <= s.length <= 300; 1 <= wordDict.length <= 1000; words contain lowercase English letters.",
      "source": {
        "label": "Word Break - LeetCode 139",
        "url": "https://leetcode.com/problems/word-break/"
      },
      "examples": [
        {
          "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
          "output": "true",
          "explanation": "leetcode splits into leet + code."
        },
        {
          "input": "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
          "output": "true",
          "explanation": "Dictionary words may be reused."
        },
        {
          "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
          "output": "false",
          "explanation": "No complete segmentation covers the string."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(n + dictionary). Substring DP checks all split points in a set.",
      "optimizedComplexity": "Time O(nL); Space O(total word chars + n). Trie walk from reachable starts avoids unrelated dictionary words.",
      "recursiveComplexity": "Time O(nL); Space O(total word chars + n). Memoized recursion stores failed start positions.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n    for (int end = 1; end <= s.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && words.contains(s.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    return dp[s.length()];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Node root = new Node();\n    for (String word : wordDict) insert(root, word);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n\n    for (int start = 0; start < s.length(); start++) {\n      if (!dp[start]) continue;\n      Node node = root;\n      for (int end = start; end < s.length(); end++) {\n        node = node.next[s.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[end + 1] = true;\n      }\n    }\n    return dp[s.length()];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Node root = new Node();\n    for (String word : wordDict) insert(root, word, 0);\n    Boolean[] memo = new Boolean[s.length()];\n    return canBreak(s, 0, root, memo);\n  }\n\n  private boolean canBreak(String s, int start, Node root, Boolean[] memo) {\n    if (start == s.length()) return true;\n    if (memo[start] != null) return memo[start];\n    Node node = root;\n    for (int end = start; end < s.length(); end++) {\n      node = node.next[s.charAt(end) - 'a'];\n      if (node == null) break;\n      if (node.word && canBreak(s, end + 1, root, memo)) return memo[start] = true;\n    }\n    return memo[start] = false;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Node root = new Node();\n    for (String word : wordDict) insert(root, word);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n\n    for (int start = 0; start < s.length(); start++) {\n      if (!dp[start]) continue;\n      Node node = root;\n      for (int end = start; end < s.length(); end++) {\n        node = node.next[s.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[end + 1] = true;\n      }\n    }\n    return dp[s.length()];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Node root = new Node();\n    for (String word : wordDict) insert(root, word);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n\n    for (int start = 0; start < s.length(); start++) {\n      if (!dp[start]) continue;\n      Node node = root;\n      for (int end = start; end < s.length(); end++) {\n        node = node.next[s.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[end + 1] = true;\n      }\n    }\n    return dp[s.length()];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Design Search Autocomplete System",
      "difficulty": "Hard",
      "subpattern": "Autocomplete trie with hot sentence ranking",
      "question": "Design an autocomplete system that returns the top three historical sentences for the current typed prefix, ranked by frequency then lexicographic order. Character # commits the current sentence.",
      "trigger": "Every input character extends a prefix and asks for ranked sentences under that prefix.",
      "intuition": "Store sentence frequencies in trie nodes along each sentence path; each query ranks candidates under the current prefix.",
      "edgeCases": "Input # after new sentence, prefix with no matches, frequency tie, spaces inside sentences, repeated commits.",
      "constraints": "Sentences contain lowercase letters and spaces; times are positive; input is one lowercase letter, space, or #.",
      "source": {
        "label": "Design Search Autocomplete System - LeetCode 642",
        "url": "https://leetcode.com/problems/design-search-autocomplete-system/"
      },
      "examples": [
        {
          "input": "sentences = [\"i love you\",\"island\",\"iroman\",\"i love leetcode\"], times = [5,3,2,2], input(\"i\")",
          "output": "[\"i love you\",\"island\",\"i love leetcode\"]",
          "explanation": "Top matches are ranked by count then lexicographic order."
        },
        {
          "input": "input(\" \")",
          "output": "[\"i love you\",\"i love leetcode\"]",
          "explanation": "The prefix becomes \"i \"."
        },
        {
          "input": "input(\"#\")",
          "output": "[]",
          "explanation": "The current sentence is committed and the buffer resets."
        }
      ],
      "bruteForceComplexity": "Time O(N log N) per input character; Space O(total sentence characters). Scan all stored sentences for the prefix.",
      "optimizedComplexity": "Time O(P + K log K) per query where K is candidates at the prefix; Space O(total sentence characters * prefix maps).",
      "recursiveComplexity": "Time O(P + K log K) per query; Space O(total sentence characters + recursion depth). DFS collects candidates below the prefix node.",
      "bruteForceCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private final Map<String, Integer> count = new HashMap<>();\n  private final StringBuilder prefix = new StringBuilder();\n\n  public AutocompleteSystem(String[] sentences, int[] times) {\n    for (int i = 0; i < sentences.length; i++) count.put(sentences[i], times[i]);\n  }\n\n  public List<String> input(char c) {\n    if (c == '#') {\n      String sentence = prefix.toString();\n      count.put(sentence, count.getOrDefault(sentence, 0) + 1);\n      prefix.setLength(0);\n      return new ArrayList<>();\n    }\n    prefix.append(c);\n    PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> count.get(a).equals(count.get(b))\n        ? b.compareTo(a) : count.get(a) - count.get(b));\n    for (String sentence : count.keySet()) {\n      if (sentence.startsWith(prefix.toString())) {\n        pq.offer(sentence);\n        if (pq.size() > 3) pq.poll();\n      }\n    }\n    List<String> answer = new ArrayList<>();\n    while (!pq.isEmpty()) answer.add(pq.poll());\n    Collections.reverse(answer);\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    Map<String, Integer> hot = new HashMap<>();\n  }\n\n  private final Node root = new Node();\n  private final StringBuilder current = new StringBuilder();\n  private Node node = root;\n\n  public AutocompleteSystem(String[] sentences, int[] times) {\n    for (int i = 0; i < sentences.length; i++) add(sentences[i], times[i]);\n  }\n\n  public List<String> input(char c) {\n    if (c == '#') {\n      add(current.toString(), 1);\n      current.setLength(0);\n      node = root;\n      return new ArrayList<>();\n    }\n\n    current.append(c);\n    node = node == null ? null : node.next.get(c);\n    if (node == null) return new ArrayList<>();\n\n    PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> node.hot.get(a).equals(node.hot.get(b))\n        ? b.compareTo(a) : node.hot.get(a) - node.hot.get(b));\n    for (String sentence : node.hot.keySet()) {\n      pq.offer(sentence);\n      if (pq.size() > 3) pq.poll();\n    }\n    List<String> answer = new ArrayList<>();\n    while (!pq.isEmpty()) answer.add(pq.poll());\n    Collections.reverse(answer);\n    return answer;\n  }\n\n  private void add(String sentence, int delta) {\n    Node walk = root;\n    for (char ch : sentence.toCharArray()) {\n      walk = walk.next.computeIfAbsent(ch, unused -> new Node());\n      walk.hot.put(sentence, walk.hot.getOrDefault(sentence, 0) + delta);\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    String sentence;\n    int count;\n  }\n\n  private final Node root = new Node();\n  private final StringBuilder current = new StringBuilder();\n\n  public AutocompleteSystem(String[] sentences, int[] times) {\n    for (int i = 0; i < sentences.length; i++) add(root, sentences[i], 0, times[i]);\n  }\n\n  public List<String> input(char c) {\n    if (c == '#') {\n      add(root, current.toString(), 0, 1);\n      current.setLength(0);\n      return new ArrayList<>();\n    }\n    current.append(c);\n    Node node = find(root, current.toString(), 0);\n    List<Node> matches = new ArrayList<>();\n    collect(node, matches);\n    matches.sort((a, b) -> a.count == b.count ? a.sentence.compareTo(b.sentence) : b.count - a.count);\n    List<String> answer = new ArrayList<>();\n    for (int i = 0; i < Math.min(3, matches.size()); i++) answer.add(matches.get(i).sentence);\n    return answer;\n  }\n\n  private void add(Node node, String sentence, int index, int delta) {\n    if (index == sentence.length()) {\n      node.sentence = sentence;\n      node.count += delta;\n      return;\n    }\n    char ch = sentence.charAt(index);\n    node.next.putIfAbsent(ch, new Node());\n    add(node.next.get(ch), sentence, index + 1, delta);\n  }\n\n  private Node find(Node node, String prefix, int index) {\n    if (node == null || index == prefix.length()) return node;\n    return find(node.next.get(prefix.charAt(index)), prefix, index + 1);\n  }\n\n  private void collect(Node node, List<Node> matches) {\n    if (node == null) return;\n    if (node.sentence != null) matches.add(node);\n    for (Node child : node.next.values()) collect(child, matches);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass AutocompleteSystem {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    Map<String, Integer> hot = new HashMap<>();\n  }\n\n  private final Node root = new Node();\n  private final StringBuilder current = new StringBuilder();\n  private Node node = root;\n\n  public AutocompleteSystem(String[] sentences, int[] times) {\n    for (int i = 0; i < sentences.length; i++) add(sentences[i], times[i]);\n  }\n\n  public List<String> input(char c) {\n    if (c == '#') {\n      add(current.toString(), 1);\n      current.setLength(0);\n      node = root;\n      return new ArrayList<>();\n    }\n\n    current.append(c);\n    node = node == null ? null : node.next.get(c);\n    if (node == null) return new ArrayList<>();\n\n    PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> node.hot.get(a).equals(node.hot.get(b))\n        ? b.compareTo(a) : node.hot.get(a) - node.hot.get(b));\n    for (String sentence : node.hot.keySet()) {\n      pq.offer(sentence);\n      if (pq.size() > 3) pq.poll();\n    }\n    List<String> answer = new ArrayList<>();\n    while (!pq.isEmpty()) answer.add(pq.poll());\n    Collections.reverse(answer);\n    return answer;\n  }\n\n  private void add(String sentence, int delta) {\n    Node walk = root;\n    for (char ch : sentence.toCharArray()) {\n      walk = walk.next.computeIfAbsent(ch, unused -> new Node());\n      walk.hot.put(sentence, walk.hot.getOrDefault(sentence, 0) + delta);\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass AutocompleteSystem {\n  private static class Node {\n    Map<Character, Node> next = new HashMap<>();\n    Map<String, Integer> hot = new HashMap<>();\n  }\n\n  private final Node root = new Node();\n  private final StringBuilder current = new StringBuilder();\n  private Node node = root;\n\n  public AutocompleteSystem(String[] sentences, int[] times) {\n    for (int i = 0; i < sentences.length; i++) add(sentences[i], times[i]);\n  }\n\n  public List<String> input(char c) {\n    if (c == '#') {\n      add(current.toString(), 1);\n      current.setLength(0);\n      node = root;\n      return new ArrayList<>();\n    }\n\n    current.append(c);\n    node = node == null ? null : node.next.get(c);\n    if (node == null) return new ArrayList<>();\n\n    PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> node.hot.get(a).equals(node.hot.get(b))\n        ? b.compareTo(a) : node.hot.get(a) - node.hot.get(b));\n    for (String sentence : node.hot.keySet()) {\n      pq.offer(sentence);\n      if (pq.size() > 3) pq.poll();\n    }\n    List<String> answer = new ArrayList<>();\n    while (!pq.isEmpty()) answer.add(pq.poll());\n    Collections.reverse(answer);\n    return answer;\n  }\n\n  private void add(String sentence, int delta) {\n    Node walk = root;\n    for (char ch : sentence.toCharArray()) {\n      walk = walk.next.computeIfAbsent(ch, unused -> new Node());\n      walk.hot.put(sentence, walk.hot.getOrDefault(sentence, 0) + delta);\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Design File System",
      "difficulty": "Medium",
      "subpattern": "Path trie for file systems",
      "question": "Design a file system that supports createPath(path, value) and get(path), where a path can be created only if its parent exists.",
      "trigger": "Slash-separated path components form trie levels, and parent existence is part of insertion.",
      "intuition": "Walk each folder name from the root; all parents must exist before creating the final component.",
      "edgeCases": "Creating root, missing parent, duplicate path, get missing path, single-level path, multi-level path.",
      "constraints": "1 <= path.length <= 100; path starts with /; at most 10000 calls; values are positive integers.",
      "source": {
        "label": "Design File System - LeetCode 1166",
        "url": "https://leetcode.com/problems/design-file-system/"
      },
      "examples": [
        {
          "input": "createPath(\"/a\", 1), get(\"/a\")",
          "output": "true, 1",
          "explanation": "The path /a is created under root."
        },
        {
          "input": "createPath(\"/c/d\", 1)",
          "output": "false",
          "explanation": "The parent /c does not exist."
        },
        {
          "input": "createPath(\"/a\", 2)",
          "output": "false",
          "explanation": "The path already exists."
        }
      ],
      "bruteForceComplexity": "Time O(L) per operation; Space O(total path length). A map stores full path strings and checks parent substrings.",
      "optimizedComplexity": "Time O(number of path components); Space O(total path components). Trie nodes store children by folder name.",
      "recursiveComplexity": "Time O(number of path components); Space O(depth) call stack plus trie storage.",
      "bruteForceCode": "import java.util.*;\n\nclass FileSystem {\n  private final Map<String, Integer> values = new HashMap<>();\n\n  public FileSystem() {\n    values.put(\"\", -1);\n  }\n\n  public boolean createPath(String path, int value) {\n    if (values.containsKey(path)) return false;\n    int slash = path.lastIndexOf('/');\n    String parent = path.substring(0, slash);\n    if (!values.containsKey(parent)) return false;\n    values.put(path, value);\n    return true;\n  }\n\n  public int get(String path) {\n    return values.getOrDefault(path, -1);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    int value = -1;\n  }\n\n  private final Node root = new Node();\n\n  public boolean createPath(String path, int value) {\n    String[] parts = path.substring(1).split(\"/\");\n    Node node = root;\n    for (int i = 0; i < parts.length; i++) {\n      String part = parts[i];\n      if (i == parts.length - 1) {\n        if (node.children.containsKey(part)) return false;\n        Node child = new Node();\n        child.value = value;\n        node.children.put(part, child);\n        return true;\n      }\n      node = node.children.get(part);\n      if (node == null) return false;\n    }\n    return false;\n  }\n\n  public int get(String path) {\n    Node node = root;\n    for (String part : path.substring(1).split(\"/\")) {\n      node = node.children.get(part);\n      if (node == null) return -1;\n    }\n    return node.value;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    int value = -1;\n  }\n\n  private final Node root = new Node();\n\n  public boolean createPath(String path, int value) {\n    String[] parts = path.substring(1).split(\"/\");\n    return create(root, parts, 0, value);\n  }\n\n  public int get(String path) {\n    Node node = find(root, path.substring(1).split(\"/\"), 0);\n    return node == null ? -1 : node.value;\n  }\n\n  private boolean create(Node node, String[] parts, int index, int value) {\n    if (index == parts.length - 1) {\n      if (node.children.containsKey(parts[index])) return false;\n      Node child = new Node();\n      child.value = value;\n      node.children.put(parts[index], child);\n      return true;\n    }\n    Node child = node.children.get(parts[index]);\n    return child != null && create(child, parts, index + 1, value);\n  }\n\n  private Node find(Node node, String[] parts, int index) {\n    if (node == null || index == parts.length) return node;\n    return find(node.children.get(parts[index]), parts, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    int value = -1;\n  }\n\n  private final Node root = new Node();\n\n  public boolean createPath(String path, int value) {\n    String[] parts = path.substring(1).split(\"/\");\n    Node node = root;\n    for (int i = 0; i < parts.length; i++) {\n      String part = parts[i];\n      if (i == parts.length - 1) {\n        if (node.children.containsKey(part)) return false;\n        Node child = new Node();\n        child.value = value;\n        node.children.put(part, child);\n        return true;\n      }\n      node = node.children.get(part);\n      if (node == null) return false;\n    }\n    return false;\n  }\n\n  public int get(String path) {\n    Node node = root;\n    for (String part : path.substring(1).split(\"/\")) {\n      node = node.children.get(part);\n      if (node == null) return -1;\n    }\n    return node.value;\n  }\n}",
      "code": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    int value = -1;\n  }\n\n  private final Node root = new Node();\n\n  public boolean createPath(String path, int value) {\n    String[] parts = path.substring(1).split(\"/\");\n    Node node = root;\n    for (int i = 0; i < parts.length; i++) {\n      String part = parts[i];\n      if (i == parts.length - 1) {\n        if (node.children.containsKey(part)) return false;\n        Node child = new Node();\n        child.value = value;\n        node.children.put(part, child);\n        return true;\n      }\n      node = node.children.get(part);\n      if (node == null) return false;\n    }\n    return false;\n  }\n\n  public int get(String path) {\n    Node node = root;\n    for (String part : path.substring(1).split(\"/\")) {\n      node = node.children.get(part);\n      if (node == null) return -1;\n    }\n    return node.value;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Design In-Memory File System",
      "difficulty": "Hard",
      "subpattern": "Path trie for directories and files",
      "question": "Design an in-memory file system supporting ls, mkdir, addContentToFile, and readContentFromFile.",
      "trigger": "Folders and files are slash-separated trie nodes with different payloads and sorted directory listings.",
      "intuition": "Represent each path component as a child node; file nodes store content and directory nodes store children.",
      "edgeCases": "ls on file, ls on root, creating nested directories, appending to existing file, reading missing file not requested.",
      "constraints": "1 <= path.length, filePath.length <= 100; content contains lowercase letters; at most 300 operations.",
      "source": {
        "label": "Design In-Memory File System - LeetCode 588",
        "url": "https://leetcode.com/problems/design-in-memory-file-system/"
      },
      "examples": [
        {
          "input": "ls(\"/\"), mkdir(\"/a/b/c\"), addContentToFile(\"/a/b/c/d\", \"hello\"), ls(\"/\")",
          "output": "[], null, null, [\"a\"]",
          "explanation": "Directory a appears at root after mkdir."
        },
        {
          "input": "readContentFromFile(\"/a/b/c/d\")",
          "output": "\"hello\"",
          "explanation": "The file content is returned."
        },
        {
          "input": "addContentToFile(\"/a/b/c/d\", \" world\"), readContentFromFile(\"/a/b/c/d\")",
          "output": "\"hello world\"",
          "explanation": "File content is appended."
        }
      ],
      "bruteForceComplexity": "Time O(P log P) for ls; Space O(total path and content). Maps store directories and file contents by full path.",
      "optimizedComplexity": "Time O(depth log children) for ls and O(depth) for updates; Space O(total path nodes + content).",
      "recursiveComplexity": "Time O(depth log children) for ls and O(depth) for updates; Space includes recursion depth.",
      "bruteForceCode": "import java.util.*;\n\nclass FileSystem {\n  private final Map<String, StringBuilder> files = new HashMap<>();\n  private final Set<String> dirs = new HashSet<>();\n\n  public FileSystem() {\n    dirs.add(\"/\");\n  }\n\n  public List<String> ls(String path) {\n    if (files.containsKey(path)) return Arrays.asList(name(path));\n    TreeSet<String> result = new TreeSet<>();\n    String prefix = path.equals(\"/\") ? \"/\" : path + \"/\";\n    for (String dir : dirs) if (dir.startsWith(prefix) && !dir.equals(path)) result.add(nextName(prefix, dir));\n    for (String file : files.keySet()) if (file.startsWith(prefix)) result.add(nextName(prefix, file));\n    return new ArrayList<>(result);\n  }\n\n  public void mkdir(String path) {\n    String current = \"\";\n    for (String part : path.split(\"/\")) {\n      if (part.isEmpty()) continue;\n      current += \"/\" + part;\n      dirs.add(current);\n    }\n  }\n\n  public void addContentToFile(String filePath, String content) {\n    mkdir(filePath.substring(0, filePath.lastIndexOf('/')));\n    files.computeIfAbsent(filePath, unused -> new StringBuilder()).append(content);\n  }\n\n  public String readContentFromFile(String filePath) {\n    return files.get(filePath).toString();\n  }\n\n  private String name(String path) { return path.substring(path.lastIndexOf('/') + 1); }\n  private String nextName(String prefix, String path) {\n    String rest = path.substring(prefix.length());\n    int slash = rest.indexOf('/');\n    return slash == -1 ? rest : rest.substring(0, slash);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    TreeMap<String, Node> children = new TreeMap<>();\n    StringBuilder content;\n  }\n\n  private final Node root = new Node();\n\n  public List<String> ls(String path) {\n    Node node = traverse(path, false);\n    if (node.content != null) return Arrays.asList(last(path));\n    return new ArrayList<>(node.children.keySet());\n  }\n\n  public void mkdir(String path) {\n    traverse(path, true);\n  }\n\n  public void addContentToFile(String filePath, String content) {\n    Node node = traverse(filePath, true);\n    if (node.content == null) node.content = new StringBuilder();\n    node.content.append(content);\n  }\n\n  public String readContentFromFile(String filePath) {\n    return traverse(filePath, false).content.toString();\n  }\n\n  private Node traverse(String path, boolean create) {\n    Node node = root;\n    if (path.equals(\"/\")) return node;\n    for (String part : path.substring(1).split(\"/\")) {\n      if (create) node.children.putIfAbsent(part, new Node());\n      node = node.children.get(part);\n    }\n    return node;\n  }\n\n  private String last(String path) {\n    return path.substring(path.lastIndexOf('/') + 1);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    TreeMap<String, Node> children = new TreeMap<>();\n    StringBuilder content;\n  }\n\n  private final Node root = new Node();\n\n  public List<String> ls(String path) {\n    Node node = find(root, parts(path), 0, false);\n    if (node.content != null) return Arrays.asList(parts(path)[parts(path).length - 1]);\n    return new ArrayList<>(node.children.keySet());\n  }\n\n  public void mkdir(String path) {\n    find(root, parts(path), 0, true);\n  }\n\n  public void addContentToFile(String filePath, String content) {\n    Node node = find(root, parts(filePath), 0, true);\n    if (node.content == null) node.content = new StringBuilder();\n    node.content.append(content);\n  }\n\n  public String readContentFromFile(String filePath) {\n    return find(root, parts(filePath), 0, false).content.toString();\n  }\n\n  private Node find(Node node, String[] parts, int index, boolean create) {\n    if (index == parts.length || parts[index].isEmpty()) return node;\n    if (create) node.children.putIfAbsent(parts[index], new Node());\n    return find(node.children.get(parts[index]), parts, index + 1, create);\n  }\n\n  private String[] parts(String path) {\n    return path.equals(\"/\") ? new String[] {\"\"} : path.substring(1).split(\"/\");\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    TreeMap<String, Node> children = new TreeMap<>();\n    StringBuilder content;\n  }\n\n  private final Node root = new Node();\n\n  public List<String> ls(String path) {\n    Node node = traverse(path, false);\n    if (node.content != null) return Arrays.asList(last(path));\n    return new ArrayList<>(node.children.keySet());\n  }\n\n  public void mkdir(String path) {\n    traverse(path, true);\n  }\n\n  public void addContentToFile(String filePath, String content) {\n    Node node = traverse(filePath, true);\n    if (node.content == null) node.content = new StringBuilder();\n    node.content.append(content);\n  }\n\n  public String readContentFromFile(String filePath) {\n    return traverse(filePath, false).content.toString();\n  }\n\n  private Node traverse(String path, boolean create) {\n    Node node = root;\n    if (path.equals(\"/\")) return node;\n    for (String part : path.substring(1).split(\"/\")) {\n      if (create) node.children.putIfAbsent(part, new Node());\n      node = node.children.get(part);\n    }\n    return node;\n  }\n\n  private String last(String path) {\n    return path.substring(path.lastIndexOf('/') + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass FileSystem {\n  private static class Node {\n    TreeMap<String, Node> children = new TreeMap<>();\n    StringBuilder content;\n  }\n\n  private final Node root = new Node();\n\n  public List<String> ls(String path) {\n    Node node = traverse(path, false);\n    if (node.content != null) return Arrays.asList(last(path));\n    return new ArrayList<>(node.children.keySet());\n  }\n\n  public void mkdir(String path) {\n    traverse(path, true);\n  }\n\n  public void addContentToFile(String filePath, String content) {\n    Node node = traverse(filePath, true);\n    if (node.content == null) node.content = new StringBuilder();\n    node.content.append(content);\n  }\n\n  public String readContentFromFile(String filePath) {\n    return traverse(filePath, false).content.toString();\n  }\n\n  private Node traverse(String path, boolean create) {\n    Node node = root;\n    if (path.equals(\"/\")) return node;\n    for (String part : path.substring(1).split(\"/\")) {\n      if (create) node.children.putIfAbsent(part, new Node());\n      node = node.children.get(part);\n    }\n    return node;\n  }\n\n  private String last(String path) {\n    return path.substring(path.lastIndexOf('/') + 1);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Remove Sub-Folders from the Filesystem",
      "difficulty": "Medium",
      "subpattern": "Path trie with terminal ancestor pruning",
      "question": "Given folder paths, remove every path that is a sub-folder of another path and return the remaining top-level folders.",
      "trigger": "Folder paths are component tries; if an ancestor is terminal, descendants must be ignored.",
      "intuition": "Insert folder components, mark terminal folders, and collect only terminal nodes reached before any terminal ancestor.",
      "edgeCases": "Sibling folders with shared prefix, /a and /ab are not parent-child, duplicate-like paths, root-level folders, deep sub-folder.",
      "constraints": "1 <= folder.length <= 40000; 2 <= folder[i].length <= 100; folder paths are unique.",
      "source": {
        "label": "Remove Sub-Folders - LeetCode 1233",
        "url": "https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/"
      },
      "examples": [
        {
          "input": "folder = [\"/a\",\"/a/b\",\"/c/d\",\"/c/d/e\",\"/c/f\"]",
          "output": "[\"/a\",\"/c/d\",\"/c/f\"]",
          "explanation": "/a/b and /c/d/e are removed."
        },
        {
          "input": "folder = [\"/a\",\"/a/b/c\",\"/a/b/d\"]",
          "output": "[\"/a\"]",
          "explanation": "All deeper folders are under /a."
        },
        {
          "input": "folder = [\"/a/b/c\",\"/a/b/ca\",\"/a/b/d\"]",
          "output": "[\"/a/b/c\",\"/a/b/ca\",\"/a/b/d\"]",
          "explanation": "None is an ancestor of another."
        }
      ],
      "bruteForceComplexity": "Time O(n log n + total length); Space O(n). Sorting makes subfolders adjacent and easy to skip.",
      "optimizedComplexity": "Time O(total path components); Space O(total path components). Trie stops insertion/search below terminal ancestors.",
      "recursiveComplexity": "Time O(total path components); Space O(total path components + depth). Recursive DFS collects terminal roots.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> removeSubfolders(String[] folder) {\n    Arrays.sort(folder);\n    List<String> answer = new ArrayList<>();\n    String parent = \"\";\n    for (String path : folder) {\n      if (parent.isEmpty() || !path.startsWith(parent + \"/\")) {\n        answer.add(path);\n        parent = path;\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    String folder;\n  }\n\n  public List<String> removeSubfolders(String[] folder) {\n    Node root = new Node();\n    for (String path : folder) {\n      Node node = root;\n      for (String part : path.substring(1).split(\"/\")) {\n        node = node.children.computeIfAbsent(part, unused -> new Node());\n      }\n      node.folder = path;\n    }\n\n    List<String> answer = new ArrayList<>();\n    Deque<Node> stack = new ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      Node node = stack.pop();\n      if (node.folder != null) {\n        answer.add(node.folder);\n        continue;\n      }\n      for (Node child : node.children.values()) stack.push(child);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    String folder;\n  }\n\n  public List<String> removeSubfolders(String[] folder) {\n    Node root = new Node();\n    for (String path : folder) insert(root, path.substring(1).split(\"/\"), 0, path);\n    List<String> answer = new ArrayList<>();\n    collect(root, answer);\n    return answer;\n  }\n\n  private void insert(Node node, String[] parts, int index, String path) {\n    if (index == parts.length) {\n      node.folder = path;\n      return;\n    }\n    node.children.putIfAbsent(parts[index], new Node());\n    insert(node.children.get(parts[index]), parts, index + 1, path);\n  }\n\n  private void collect(Node node, List<String> answer) {\n    if (node.folder != null) {\n      answer.add(node.folder);\n      return;\n    }\n    for (Node child : node.children.values()) collect(child, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    String folder;\n  }\n\n  public List<String> removeSubfolders(String[] folder) {\n    Node root = new Node();\n    for (String path : folder) {\n      Node node = root;\n      for (String part : path.substring(1).split(\"/\")) {\n        node = node.children.computeIfAbsent(part, unused -> new Node());\n      }\n      node.folder = path;\n    }\n\n    List<String> answer = new ArrayList<>();\n    Deque<Node> stack = new ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      Node node = stack.pop();\n      if (node.folder != null) {\n        answer.add(node.folder);\n        continue;\n      }\n      for (Node child : node.children.values()) stack.push(child);\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    String folder;\n  }\n\n  public List<String> removeSubfolders(String[] folder) {\n    Node root = new Node();\n    for (String path : folder) {\n      Node node = root;\n      for (String part : path.substring(1).split(\"/\")) {\n        node = node.children.computeIfAbsent(part, unused -> new Node());\n      }\n      node.folder = path;\n    }\n\n    List<String> answer = new ArrayList<>();\n    Deque<Node> stack = new ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      Node node = stack.pop();\n      if (node.folder != null) {\n        answer.add(node.folder);\n        continue;\n      }\n      for (Node child : node.children.values()) stack.push(child);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Delete Duplicate Folders in System",
      "difficulty": "Hard",
      "subpattern": "Path trie subtree serialization",
      "question": "Given folder paths, delete every group of duplicate folders with identical non-empty child folder structures and return the remaining paths.",
      "trigger": "Folder hierarchy is a path trie, and duplicate subtrees can be detected by canonical serialization.",
      "intuition": "Build the folder trie, serialize each subtree bottom-up, count equal serializations, then skip duplicate subtrees while collecting paths.",
      "edgeCases": "Leaf folders are not deleted as empty duplicates, multiple duplicate groups, nested duplicates, same names under different parents.",
      "constraints": "1 <= paths.length <= 20000; 1 <= path length <= 500; folder names contain lowercase letters.",
      "source": {
        "label": "Delete Duplicate Folders in System - LeetCode 1948",
        "url": "https://leetcode.com/problems/delete-duplicate-folders-in-system/"
      },
      "examples": [
        {
          "input": "paths = [[\"a\"],[\"c\"],[\"d\"],[\"a\",\"b\"],[\"c\",\"b\"],[\"d\",\"a\"]]",
          "output": "[[\"d\"],[\"d\",\"a\"]]",
          "explanation": "Folders a and c have duplicate child structure b and are deleted."
        },
        {
          "input": "paths = [[\"a\"],[\"c\"],[\"a\",\"b\"],[\"c\",\"b\"],[\"a\",\"b\",\"x\"],[\"a\",\"b\",\"x\",\"y\"],[\"w\"],[\"w\",\"y\"]]",
          "output": "[[\"c\"],[\"c\",\"b\"],[\"a\"],[\"a\",\"b\"]]",
          "explanation": "The duplicate deeper folders are removed."
        },
        {
          "input": "paths = [[\"a\"],[\"a\",\"x\"],[\"a\",\"x\",\"y\"],[\"a\",\"z\"],[\"b\"],[\"b\",\"x\"],[\"b\",\"x\",\"y\"],[\"b\",\"z\"]]",
          "output": "[]",
          "explanation": "The duplicate a and b subtrees are both removed."
        }
      ],
      "bruteForceComplexity": "Time O(total nodes * average serialization length); Space O(total nodes). Canonical strings identify duplicate subtrees.",
      "optimizedComplexity": "Time O(total path components log children); Space O(total path components). Trie serialization counts each subtree once.",
      "recursiveComplexity": "Time O(total path components log children); Space O(total path components + depth). Recursive postorder serializes subtrees.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {\n    Node root = new Node();\n    for (List<String> path : paths) add(root, path);\n    Map<String, Integer> count = new HashMap<>();\n    serialize(root, count);\n    List<List<String>> answer = new ArrayList<>();\n    collect(root, new ArrayList<>(), count, answer);\n    return answer;\n  }\n\n  private void add(Node root, List<String> path) {\n    Node node = root;\n    for (String name : path) node = node.children.computeIfAbsent(name, unused -> new Node());\n  }\n\n  private String serialize(Node node, Map<String, Integer> count) {\n    StringBuilder key = new StringBuilder();\n    for (String name : new TreeSet<>(node.children.keySet())) {\n      key.append('(').append(name).append(serialize(node.children.get(name), count)).append(')');\n    }\n    node.serial = key.toString();\n    if (!node.serial.isEmpty()) count.put(node.serial, count.getOrDefault(node.serial, 0) + 1);\n    return node.serial;\n  }\n\n  private void collect(Node node, List<String> path, Map<String, Integer> count, List<List<String>> answer) {\n    for (String name : node.children.keySet()) {\n      Node child = node.children.get(name);\n      if (!child.serial.isEmpty() && count.get(child.serial) > 1) continue;\n      path.add(name);\n      answer.add(new ArrayList<>(path));\n      collect(child, path, count, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n\n  private static class Node {\n    Map<String, Node> children = new HashMap<>();\n    String serial = \"\";\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new TreeMap<>();\n    String serial = \"\";\n  }\n\n  public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {\n    Node root = new Node();\n    for (List<String> path : paths) {\n      Node node = root;\n      for (String name : path) node = node.children.computeIfAbsent(name, unused -> new Node());\n    }\n\n    Map<String, Integer> count = new HashMap<>();\n    serialize(root, count);\n    List<List<String>> answer = new ArrayList<>();\n    collect(root, new ArrayList<>(), count, answer);\n    return answer;\n  }\n\n  private String serialize(Node node, Map<String, Integer> count) {\n    StringBuilder key = new StringBuilder();\n    for (Map.Entry<String, Node> entry : node.children.entrySet()) {\n      key.append('(').append(entry.getKey()).append(serialize(entry.getValue(), count)).append(')');\n    }\n    node.serial = key.toString();\n    if (!node.serial.isEmpty()) count.put(node.serial, count.getOrDefault(node.serial, 0) + 1);\n    return node.serial;\n  }\n\n  private void collect(Node node, List<String> path, Map<String, Integer> count, List<List<String>> answer) {\n    for (Map.Entry<String, Node> entry : node.children.entrySet()) {\n      Node child = entry.getValue();\n      if (!child.serial.isEmpty() && count.get(child.serial) > 1) continue;\n      path.add(entry.getKey());\n      answer.add(new ArrayList<>(path));\n      collect(child, path, count, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new TreeMap<>();\n    String serial = \"\";\n  }\n\n  public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {\n    Node root = new Node();\n    addPaths(root, paths, 0);\n    Map<String, Integer> count = new HashMap<>();\n    serialize(root, count);\n    List<List<String>> answer = new ArrayList<>();\n    collect(root, new ArrayList<>(), count, answer);\n    return answer;\n  }\n\n  private void addPaths(Node root, List<List<String>> paths, int index) {\n    if (index == paths.size()) return;\n    insert(root, paths.get(index), 0);\n    addPaths(root, paths, index + 1);\n  }\n\n  private void insert(Node node, List<String> path, int index) {\n    if (index == path.size()) return;\n    node.children.putIfAbsent(path.get(index), new Node());\n    insert(node.children.get(path.get(index)), path, index + 1);\n  }\n\n  private String serialize(Node node, Map<String, Integer> count) {\n    StringBuilder key = new StringBuilder();\n    for (Map.Entry<String, Node> entry : node.children.entrySet()) {\n      key.append('(').append(entry.getKey()).append(serialize(entry.getValue(), count)).append(')');\n    }\n    node.serial = key.toString();\n    if (!node.serial.isEmpty()) count.put(node.serial, count.getOrDefault(node.serial, 0) + 1);\n    return node.serial;\n  }\n\n  private void collect(Node node, List<String> path, Map<String, Integer> count, List<List<String>> answer) {\n    for (String name : node.children.keySet()) {\n      Node child = node.children.get(name);\n      if (!child.serial.isEmpty() && count.get(child.serial) > 1) continue;\n      path.add(name);\n      answer.add(new ArrayList<>(path));\n      collect(child, path, count, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new TreeMap<>();\n    String serial = \"\";\n  }\n\n  public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {\n    Node root = new Node();\n    for (List<String> path : paths) {\n      Node node = root;\n      for (String name : path) node = node.children.computeIfAbsent(name, unused -> new Node());\n    }\n\n    Map<String, Integer> count = new HashMap<>();\n    serialize(root, count);\n    List<List<String>> answer = new ArrayList<>();\n    collect(root, new ArrayList<>(), count, answer);\n    return answer;\n  }\n\n  private String serialize(Node node, Map<String, Integer> count) {\n    StringBuilder key = new StringBuilder();\n    for (Map.Entry<String, Node> entry : node.children.entrySet()) {\n      key.append('(').append(entry.getKey()).append(serialize(entry.getValue(), count)).append(')');\n    }\n    node.serial = key.toString();\n    if (!node.serial.isEmpty()) count.put(node.serial, count.getOrDefault(node.serial, 0) + 1);\n    return node.serial;\n  }\n\n  private void collect(Node node, List<String> path, Map<String, Integer> count, List<List<String>> answer) {\n    for (Map.Entry<String, Node> entry : node.children.entrySet()) {\n      Node child = entry.getValue();\n      if (!child.serial.isEmpty() && count.get(child.serial) > 1) continue;\n      path.add(entry.getKey());\n      answer.add(new ArrayList<>(path));\n      collect(child, path, count, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Map<String, Node> children = new TreeMap<>();\n    String serial = \"\";\n  }\n\n  public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {\n    Node root = new Node();\n    for (List<String> path : paths) {\n      Node node = root;\n      for (String name : path) node = node.children.computeIfAbsent(name, unused -> new Node());\n    }\n\n    Map<String, Integer> count = new HashMap<>();\n    serialize(root, count);\n    List<List<String>> answer = new ArrayList<>();\n    collect(root, new ArrayList<>(), count, answer);\n    return answer;\n  }\n\n  private String serialize(Node node, Map<String, Integer> count) {\n    StringBuilder key = new StringBuilder();\n    for (Map.Entry<String, Node> entry : node.children.entrySet()) {\n      key.append('(').append(entry.getKey()).append(serialize(entry.getValue(), count)).append(')');\n    }\n    node.serial = key.toString();\n    if (!node.serial.isEmpty()) count.put(node.serial, count.getOrDefault(node.serial, 0) + 1);\n    return node.serial;\n  }\n\n  private void collect(Node node, List<String> path, Map<String, Integer> count, List<List<String>> answer) {\n    for (Map.Entry<String, Node> entry : node.children.entrySet()) {\n      Node child = entry.getValue();\n      if (!child.serial.isEmpty() && count.get(child.serial) > 1) continue;\n      path.add(entry.getKey());\n      answer.add(new ArrayList<>(path));\n      collect(child, path, count, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Extra Characters in a String",
      "difficulty": "Medium",
      "subpattern": "Trie DP word segmentation",
      "question": "Given a string and dictionary, return the minimum number of characters left over after choosing non-overlapping dictionary words as substrings.",
      "trigger": "At each start index, dictionary matches are prefix matches against the remaining suffix of the string.",
      "intuition": "DP can either skip one character or consume a dictionary word found by walking the trie from the current index.",
      "edgeCases": "No dictionary match, full string match, overlapping choices, repeated dictionary word, single-character leftovers.",
      "constraints": "1 <= s.length <= 50; 1 <= dictionary.length <= 50; words contain lowercase English letters.",
      "source": {
        "label": "Extra Characters in a String - LeetCode 2707",
        "url": "https://leetcode.com/problems/extra-characters-in-a-string/"
      },
      "examples": [
        {
          "input": "s = \"leetscode\", dictionary = [\"leet\",\"code\",\"leetcode\"]",
          "output": "1",
          "explanation": "Use leet and code, leaving s."
        },
        {
          "input": "s = \"sayhelloworld\", dictionary = [\"hello\",\"world\"]",
          "output": "3",
          "explanation": "The extra characters are say."
        },
        {
          "input": "s = \"abc\", dictionary = [\"a\",\"bc\"]",
          "output": "0",
          "explanation": "The whole string can be covered by dictionary words."
        }
      ],
      "bruteForceComplexity": "Time O(n^3 + dictionary); Space O(n). Substring DP checks all end positions with a set.",
      "optimizedComplexity": "Time O(nL); Space O(n + total dictionary chars). Trie walk finds dictionary words from each start.",
      "recursiveComplexity": "Time O(nL); Space O(n + total dictionary chars). Memoized recursion chooses skip or consume.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minExtraChar(String s, String[] dictionary) {\n    Set<String> words = new HashSet<>(Arrays.asList(dictionary));\n    int n = s.length();\n    int[] dp = new int[n + 1];\n    for (int i = n - 1; i >= 0; i--) {\n      dp[i] = dp[i + 1] + 1;\n      for (int end = i + 1; end <= n; end++) {\n        if (words.contains(s.substring(i, end))) dp[i] = Math.min(dp[i], dp[end]);\n      }\n    }\n    return dp[0];\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int minExtraChar(String s, String[] dictionary) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word);\n    int n = s.length();\n    int[] dp = new int[n + 1];\n\n    for (int i = n - 1; i >= 0; i--) {\n      dp[i] = dp[i + 1] + 1;\n      Node node = root;\n      for (int end = i; end < n; end++) {\n        node = node.next[s.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[i] = Math.min(dp[i], dp[end + 1]);\n      }\n    }\n    return dp[0];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int minExtraChar(String s, String[] dictionary) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word, 0);\n    Integer[] memo = new Integer[s.length()];\n    return solve(s, 0, root, memo);\n  }\n\n  private int solve(String s, int index, Node root, Integer[] memo) {\n    if (index == s.length()) return 0;\n    if (memo[index] != null) return memo[index];\n    int best = 1 + solve(s, index + 1, root, memo);\n    Node node = root;\n    for (int end = index; end < s.length(); end++) {\n      node = node.next[s.charAt(end) - 'a'];\n      if (node == null) break;\n      if (node.word) best = Math.min(best, solve(s, end + 1, root, memo));\n    }\n    return memo[index] = best;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int minExtraChar(String s, String[] dictionary) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word);\n    int n = s.length();\n    int[] dp = new int[n + 1];\n\n    for (int i = n - 1; i >= 0; i--) {\n      dp[i] = dp[i + 1] + 1;\n      Node node = root;\n      for (int end = i; end < n; end++) {\n        node = node.next[s.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[i] = Math.min(dp[i], dp[end + 1]);\n      }\n    }\n    return dp[0];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public int minExtraChar(String s, String[] dictionary) {\n    Node root = new Node();\n    for (String word : dictionary) insert(root, word);\n    int n = s.length();\n    int[] dp = new int[n + 1];\n\n    for (int i = n - 1; i >= 0; i--) {\n      dp[i] = dp[i + 1] + 1;\n      Node node = root;\n      for (int end = i; end < n; end++) {\n        node = node.next[s.charAt(end) - 'a'];\n        if (node == null) break;\n        if (node.word) dp[i] = Math.min(dp[i], dp[end + 1]);\n      }\n    }\n    return dp[0];\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Longest Common Prefix",
      "difficulty": "Easy",
      "subpattern": "Basic prefix trie common path",
      "question": "Given an array of strings, return the longest common prefix shared by all strings. Return an empty string if no common prefix exists.",
      "trigger": "A shared prefix is a single trie path followed by every word until branching or a terminal word.",
      "intuition": "Insert all words, then walk while the current node has exactly one child and is not the end of a word.",
      "edgeCases": "Empty array if allowed, one string, no shared first character, shortest string is the prefix, duplicate strings.",
      "constraints": "1 <= strs.length <= 200; 0 <= strs[i].length <= 200; strings contain lowercase English letters.",
      "source": {
        "label": "Longest Common Prefix - LeetCode 14",
        "url": "https://leetcode.com/problems/longest-common-prefix/"
      },
      "examples": [
        {
          "input": "strs = [\"flower\",\"flow\",\"flight\"]",
          "output": "\"fl\"",
          "explanation": "All strings share fl."
        },
        {
          "input": "strs = [\"dog\",\"racecar\",\"car\"]",
          "output": "\"\"",
          "explanation": "No common first character exists."
        },
        {
          "input": "strs = [\"interspecies\",\"interstellar\",\"interstate\"]",
          "output": "\"inters\"",
          "explanation": "The common path stops before branching."
        }
      ],
      "bruteForceComplexity": "Time O(total characters); Space O(1). Horizontal scanning shrinks a candidate prefix.",
      "optimizedComplexity": "Time O(total characters); Space O(total characters). Trie walk stops at branch or terminal node.",
      "recursiveComplexity": "Time O(total characters); Space O(total characters + prefix length). Recursive traversal follows the common path.",
      "bruteForceCode": "class Solution {\n  public String longestCommonPrefix(String[] strs) {\n    if (strs.length == 0) return \"\";\n    String prefix = strs[0];\n    for (int i = 1; i < strs.length; i++) {\n      while (!strs[i].startsWith(prefix)) {\n        prefix = prefix.substring(0, prefix.length() - 1);\n        if (prefix.isEmpty()) return \"\";\n      }\n    }\n    return prefix;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n    int children;\n  }\n\n  public String longestCommonPrefix(String[] strs) {\n    Node root = new Node();\n    for (String str : strs) insert(root, str);\n    StringBuilder prefix = new StringBuilder();\n    Node node = root;\n    while (!node.word && node.children == 1) {\n      for (int i = 0; i < 26; i++) {\n        if (node.next[i] != null) {\n          prefix.append((char) ('a' + i));\n          node = node.next[i];\n          break;\n        }\n      }\n    }\n    return prefix.toString();\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) {\n        node.next[child] = new Node();\n        node.children++;\n      }\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n    int children;\n  }\n\n  public String longestCommonPrefix(String[] strs) {\n    Node root = new Node();\n    for (String str : strs) insert(root, str, 0);\n    return collect(root, new StringBuilder()).toString();\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) {\n      node.next[child] = new Node();\n      node.children++;\n    }\n    insert(node.next[child], word, index + 1);\n  }\n\n  private StringBuilder collect(Node node, StringBuilder prefix) {\n    if (node.word || node.children != 1) return prefix;\n    for (int i = 0; i < 26; i++) {\n      if (node.next[i] != null) {\n        prefix.append((char) ('a' + i));\n        return collect(node.next[i], prefix);\n      }\n    }\n    return prefix;\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n    int children;\n  }\n\n  public String longestCommonPrefix(String[] strs) {\n    Node root = new Node();\n    for (String str : strs) insert(root, str);\n    StringBuilder prefix = new StringBuilder();\n    Node node = root;\n    while (!node.word && node.children == 1) {\n      for (int i = 0; i < 26; i++) {\n        if (node.next[i] != null) {\n          prefix.append((char) ('a' + i));\n          node = node.next[i];\n          break;\n        }\n      }\n    }\n    return prefix.toString();\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) {\n        node.next[child] = new Node();\n        node.children++;\n      }\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n    int children;\n  }\n\n  public String longestCommonPrefix(String[] strs) {\n    Node root = new Node();\n    for (String str : strs) insert(root, str);\n    StringBuilder prefix = new StringBuilder();\n    Node node = root;\n    while (!node.word && node.children == 1) {\n      for (int i = 0; i < 26; i++) {\n        if (node.next[i] != null) {\n          prefix.append((char) ('a' + i));\n          node = node.next[i];\n          break;\n        }\n      }\n    }\n    return prefix.toString();\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) {\n        node.next[child] = new Node();\n        node.children++;\n      }\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Add Bold Tag in String",
      "difficulty": "Medium",
      "subpattern": "Trie substring matching with interval merge",
      "question": "Given a string and dictionary words, wrap every substring that appears in the dictionary with bold tags, merging overlapping or adjacent bold ranges.",
      "trigger": "Every index starts a dictionary-prefix scan; a trie finds the farthest matching word ending at that index.",
      "intuition": "Mark bold positions using the longest trie match from each start, then emit tags around contiguous marked ranges.",
      "edgeCases": "Overlapping matches, adjacent matches, no matches, dictionary word longer than s, repeated word occurrences.",
      "constraints": "1 <= s.length <= 1000; 1 <= words.length <= 100; words contain lowercase English letters.",
      "source": {
        "label": "Add Bold Tag in String - LeetCode 616",
        "url": "https://leetcode.com/problems/add-bold-tag-in-string/"
      },
      "examples": [
        {
          "input": "s = \"abcxyz123\", words = [\"abc\",\"123\"]",
          "output": "\"<b>abc</b>xyz<b>123</b>\"",
          "explanation": "Two separate dictionary matches are wrapped."
        },
        {
          "input": "s = \"aaabbcc\", words = [\"aaa\",\"aab\",\"bc\"]",
          "output": "\"<b>aaabbc</b>c\"",
          "explanation": "Overlapping and adjacent ranges merge."
        },
        {
          "input": "s = \"abcd\", words = [\"x\"]",
          "output": "\"abcd\"",
          "explanation": "No positions are marked bold."
        }
      ],
      "bruteForceComplexity": "Time O(n * W * L); Space O(n). Each word is checked at every index and marked when it matches.",
      "optimizedComplexity": "Time O(n * maxWordLength); Space O(total word chars + n). Trie scan stops when the prefix fails.",
      "recursiveComplexity": "Time O(n * maxWordLength); Space O(total word chars + n + maxWordLength). Recursive trie scan marks ranges.",
      "bruteForceCode": "class Solution {\n  public String addBoldTag(String s, String[] words) {\n    boolean[] bold = new boolean[s.length()];\n    for (int i = 0; i < s.length(); i++) {\n      for (String word : words) {\n        if (s.startsWith(word, i)) {\n          for (int j = i; j < i + word.length(); j++) bold[j] = true;\n        }\n      }\n    }\n    return build(s, bold);\n  }\n\n  private String build(String s, boolean[] bold) {\n    StringBuilder out = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      if (bold[i] && (i == 0 || !bold[i - 1])) out.append(\"<b>\");\n      out.append(s.charAt(i));\n      if (bold[i] && (i == s.length() - 1 || !bold[i + 1])) out.append(\"</b>\");\n    }\n    return out.toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String addBoldTag(String s, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    boolean[] bold = new boolean[s.length()];\n\n    for (int start = 0; start < s.length(); start++) {\n      Node node = root;\n      int endBold = -1;\n      for (int end = start; end < s.length(); end++) {\n        int child = s.charAt(end) - 'a';\n        if (child < 0 || child >= 26 || node.next[child] == null) break;\n        node = node.next[child];\n        if (node.word) endBold = end;\n      }\n      for (int i = start; i <= endBold; i++) bold[i] = true;\n    }\n    return build(s, bold);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n\n  private String build(String s, boolean[] bold) {\n    StringBuilder out = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      if (bold[i] && (i == 0 || !bold[i - 1])) out.append(\"<b>\");\n      out.append(s.charAt(i));\n      if (bold[i] && (i == s.length() - 1 || !bold[i + 1])) out.append(\"</b>\");\n    }\n    return out.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String addBoldTag(String s, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word, 0);\n    boolean[] bold = new boolean[s.length()];\n    markStarts(s, 0, root, bold);\n    return build(s, bold, 0, new StringBuilder()).toString();\n  }\n\n  private void markStarts(String s, int start, Node root, boolean[] bold) {\n    if (start == s.length()) return;\n    int end = farthest(s, start, root, start, -1);\n    for (int i = start; i <= end; i++) bold[i] = true;\n    markStarts(s, start + 1, root, bold);\n  }\n\n  private int farthest(String s, int start, Node node, int index, int best) {\n    if (index == s.length()) return best;\n    int child = s.charAt(index) - 'a';\n    if (child < 0 || child >= 26 || node.next[child] == null) return best;\n    Node next = node.next[child];\n    return farthest(s, start, next, index + 1, next.word ? index : best);\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private StringBuilder build(String s, boolean[] bold, int index, StringBuilder out) {\n    if (index == s.length()) return out;\n    if (bold[index] && (index == 0 || !bold[index - 1])) out.append(\"<b>\");\n    out.append(s.charAt(index));\n    if (bold[index] && (index == s.length() - 1 || !bold[index + 1])) out.append(\"</b>\");\n    return build(s, bold, index + 1, out);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String addBoldTag(String s, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    boolean[] bold = new boolean[s.length()];\n\n    for (int start = 0; start < s.length(); start++) {\n      Node node = root;\n      int endBold = -1;\n      for (int end = start; end < s.length(); end++) {\n        int child = s.charAt(end) - 'a';\n        if (child < 0 || child >= 26 || node.next[child] == null) break;\n        node = node.next[child];\n        if (node.word) endBold = end;\n      }\n      for (int i = start; i <= endBold; i++) bold[i] = true;\n    }\n    return build(s, bold);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n\n  private String build(String s, boolean[] bold) {\n    StringBuilder out = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      if (bold[i] && (i == 0 || !bold[i - 1])) out.append(\"<b>\");\n      out.append(s.charAt(i));\n      if (bold[i] && (i == s.length() - 1 || !bold[i + 1])) out.append(\"</b>\");\n    }\n    return out.toString();\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  public String addBoldTag(String s, String[] words) {\n    Node root = new Node();\n    for (String word : words) insert(root, word);\n    boolean[] bold = new boolean[s.length()];\n\n    for (int start = 0; start < s.length(); start++) {\n      Node node = root;\n      int endBold = -1;\n      for (int end = start; end < s.length(); end++) {\n        int child = s.charAt(end) - 'a';\n        if (child < 0 || child >= 26 || node.next[child] == null) break;\n        node = node.next[child];\n        if (node.word) endBold = end;\n      }\n      for (int i = start; i <= endBold; i++) bold[i] = true;\n    }\n    return build(s, bold);\n  }\n\n  private void insert(Node root, String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int child = ch - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n    }\n    node.word = true;\n  }\n\n  private String build(String s, boolean[] bold) {\n    StringBuilder out = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      if (bold[i] && (i == 0 || !bold[i - 1])) out.append(\"<b>\");\n      out.append(s.charAt(i));\n      if (bold[i] && (i == s.length() - 1 || !bold[i + 1])) out.append(\"</b>\");\n    }\n    return out.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find the Length of the Longest Common Prefix",
      "difficulty": "Medium",
      "subpattern": "Digit trie prefix matching",
      "question": "Given two arrays of positive integers, return the maximum length of a common decimal-prefix between any number from arr1 and any number from arr2.",
      "trigger": "Numbers become strings of digits, and common decimal prefixes are trie paths.",
      "intuition": "Insert every arr1 number as digits, then walk each arr2 number until the digit path breaks.",
      "edgeCases": "No shared first digit, one-digit numbers, identical numbers, one number prefix of another, repeated values.",
      "constraints": "1 <= arr1.length, arr2.length <= 50000; 1 <= arr1[i], arr2[i] <= 100000000.",
      "source": {
        "label": "Length of Longest Common Prefix - LeetCode 3043",
        "url": "https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix/"
      },
      "examples": [
        {
          "input": "arr1 = [1,10,100], arr2 = [1000]",
          "output": "3",
          "explanation": "100 and 1000 share prefix length 3."
        },
        {
          "input": "arr1 = [1,2,3], arr2 = [4,4,4]",
          "output": "0",
          "explanation": "No first digit matches."
        },
        {
          "input": "arr1 = [12345], arr2 = [123,12]",
          "output": "3",
          "explanation": "123 is the longest shared prefix."
        }
      ],
      "bruteForceComplexity": "Time O(nmD); Space O(D). Compare every pair as decimal strings.",
      "optimizedComplexity": "Time O((n + m)D); Space O(nD). Digit trie stores arr1 prefixes.",
      "recursiveComplexity": "Time O((n + m)D); Space O(nD + D). Recursive insert and query process one digit per call.",
      "bruteForceCode": "class Solution {\n  public int longestCommonPrefix(int[] arr1, int[] arr2) {\n    int best = 0;\n    for (int a : arr1) {\n      String first = String.valueOf(a);\n      for (int b : arr2) {\n        String second = String.valueOf(b);\n        int i = 0;\n        while (i < first.length() && i < second.length() && first.charAt(i) == second.charAt(i)) i++;\n        best = Math.max(best, i);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[10];\n  }\n\n  public int longestCommonPrefix(int[] arr1, int[] arr2) {\n    Node root = new Node();\n    for (int value : arr1) insert(root, String.valueOf(value));\n    int best = 0;\n    for (int value : arr2) best = Math.max(best, query(root, String.valueOf(value)));\n    return best;\n  }\n\n  private void insert(Node root, String value) {\n    Node node = root;\n    for (char ch : value.toCharArray()) {\n      int digit = ch - '0';\n      if (node.next[digit] == null) node.next[digit] = new Node();\n      node = node.next[digit];\n    }\n  }\n\n  private int query(Node root, String value) {\n    Node node = root;\n    int length = 0;\n    for (char ch : value.toCharArray()) {\n      node = node.next[ch - '0'];\n      if (node == null) break;\n      length++;\n    }\n    return length;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[10];\n  }\n\n  public int longestCommonPrefix(int[] arr1, int[] arr2) {\n    Node root = new Node();\n    for (int value : arr1) insert(root, String.valueOf(value), 0);\n    return queryAll(root, arr2, 0, 0);\n  }\n\n  private int queryAll(Node root, int[] arr, int index, int best) {\n    if (index == arr.length) return best;\n    int current = query(root, String.valueOf(arr[index]), 0);\n    return queryAll(root, arr, index + 1, Math.max(best, current));\n  }\n\n  private void insert(Node node, String value, int index) {\n    if (index == value.length()) return;\n    int digit = value.charAt(index) - '0';\n    if (node.next[digit] == null) node.next[digit] = new Node();\n    insert(node.next[digit], value, index + 1);\n  }\n\n  private int query(Node node, String value, int index) {\n    if (node == null || index == value.length()) return 0;\n    Node child = node.next[value.charAt(index) - '0'];\n    return child == null ? 0 : 1 + query(child, value, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[10];\n  }\n\n  public int longestCommonPrefix(int[] arr1, int[] arr2) {\n    Node root = new Node();\n    for (int value : arr1) insert(root, String.valueOf(value));\n    int best = 0;\n    for (int value : arr2) best = Math.max(best, query(root, String.valueOf(value)));\n    return best;\n  }\n\n  private void insert(Node root, String value) {\n    Node node = root;\n    for (char ch : value.toCharArray()) {\n      int digit = ch - '0';\n      if (node.next[digit] == null) node.next[digit] = new Node();\n      node = node.next[digit];\n    }\n  }\n\n  private int query(Node root, String value) {\n    Node node = root;\n    int length = 0;\n    for (char ch : value.toCharArray()) {\n      node = node.next[ch - '0'];\n      if (node == null) break;\n      length++;\n    }\n    return length;\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[10];\n  }\n\n  public int longestCommonPrefix(int[] arr1, int[] arr2) {\n    Node root = new Node();\n    for (int value : arr1) insert(root, String.valueOf(value));\n    int best = 0;\n    for (int value : arr2) best = Math.max(best, query(root, String.valueOf(value)));\n    return best;\n  }\n\n  private void insert(Node root, String value) {\n    Node node = root;\n    for (char ch : value.toCharArray()) {\n      int digit = ch - '0';\n      if (node.next[digit] == null) node.next[digit] = new Node();\n      node = node.next[digit];\n    }\n  }\n\n  private int query(Node root, String value) {\n    Node node = root;\n    int length = 0;\n    for (char ch : value.toCharArray()) {\n      node = node.next[ch - '0'];\n      if (node == null) break;\n      length++;\n    }\n    return length;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Longest Common Suffix Queries",
      "difficulty": "Hard",
      "subpattern": "Reverse trie for suffix queries",
      "question": "Given wordsContainer and wordsQuery, for each query return the index of the container word with the longest common suffix; ties choose the shorter word, then smaller index.",
      "trigger": "Suffix matching becomes prefix matching after reversing words, so a reverse trie can store the best candidate at every node.",
      "intuition": "Insert each container word backwards and update best candidate on every node of its suffix path.",
      "edgeCases": "No shared suffix beyond empty, tie by word length, tie by index, query longer than container, duplicate suffixes.",
      "constraints": "1 <= wordsContainer.length, wordsQuery.length <= 10000; total characters <= 500000.",
      "source": {
        "label": "Longest Common Suffix Queries - LeetCode 3093",
        "url": "https://leetcode.com/problems/longest-common-suffix-queries/"
      },
      "examples": [
        {
          "input": "wordsContainer = [\"abcd\",\"bcd\",\"xbcd\"], wordsQuery = [\"cd\",\"bcd\",\"xyz\"]",
          "output": "[1,1,1]",
          "explanation": "bcd is the shortest best suffix match for all queries."
        },
        {
          "input": "wordsContainer = [\"abcdefgh\",\"poiuygh\",\"ghghgh\"], wordsQuery = [\"gh\",\"acbfgh\",\"acbfegh\"]",
          "output": "[2,0,2]",
          "explanation": "The trie follows matching suffix characters from the end."
        },
        {
          "input": "wordsContainer = [\"a\",\"b\"], wordsQuery = [\"c\"]",
          "output": "[0]",
          "explanation": "With no common suffix, choose the globally shortest then smallest index."
        }
      ],
      "bruteForceComplexity": "Time O(Q * C * L); Space O(1). Every query compares suffix length with every container word.",
      "optimizedComplexity": "Time O(total container chars + total query chars); Space O(total container chars). Reverse trie stores the best index per suffix node.",
      "recursiveComplexity": "Time O(total container chars + total query chars); Space O(total container chars + L). Recursive trie traversal follows reversed strings.",
      "bruteForceCode": "class Solution {\n  public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {\n    int[] answer = new int[wordsQuery.length];\n    for (int i = 0; i < wordsQuery.length; i++) {\n      int best = 0;\n      int bestMatch = -1;\n      for (int j = 0; j < wordsContainer.length; j++) {\n        int match = suffix(wordsContainer[j], wordsQuery[i]);\n        if (match > bestMatch || match == bestMatch && better(wordsContainer, j, best)) {\n          best = j;\n          bestMatch = match;\n        }\n      }\n      answer[i] = best;\n    }\n    return answer;\n  }\n\n  private int suffix(String a, String b) {\n    int i = a.length() - 1, j = b.length() - 1, count = 0;\n    while (i >= 0 && j >= 0 && a.charAt(i--) == b.charAt(j--)) count++;\n    return count;\n  }\n\n  private boolean better(String[] words, int a, int b) {\n    return words[a].length() < words[b].length() || words[a].length() == words[b].length() && a < b;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int best = -1;\n  }\n\n  public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {\n    Node root = new Node();\n    for (int i = 0; i < wordsContainer.length; i++) insert(root, wordsContainer, i);\n    int[] answer = new int[wordsQuery.length];\n    for (int i = 0; i < wordsQuery.length; i++) answer[i] = query(root, wordsQuery[i]);\n    return answer;\n  }\n\n  private void insert(Node root, String[] words, int index) {\n    Node node = root;\n    update(node, words, index);\n    String word = words[index];\n    for (int i = word.length() - 1; i >= 0; i--) {\n      int child = word.charAt(i) - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      update(node, words, index);\n    }\n  }\n\n  private int query(Node root, String query) {\n    Node node = root;\n    for (int i = query.length() - 1; i >= 0; i--) {\n      Node child = node.next[query.charAt(i) - 'a'];\n      if (child == null) break;\n      node = child;\n    }\n    return node.best;\n  }\n\n  private void update(Node node, String[] words, int index) {\n    if (node.best == -1 || words[index].length() < words[node.best].length()\n        || words[index].length() == words[node.best].length() && index < node.best) {\n      node.best = index;\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int best = -1;\n  }\n\n  public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {\n    Node root = new Node();\n    for (int i = 0; i < wordsContainer.length; i++) insert(root, wordsContainer, i, wordsContainer[i].length() - 1);\n    int[] answer = new int[wordsQuery.length];\n    fill(root, wordsQuery, 0, answer);\n    return answer;\n  }\n\n  private void fill(Node root, String[] queries, int index, int[] answer) {\n    if (index == queries.length) return;\n    answer[index] = query(root, queries[index], queries[index].length() - 1).best;\n    fill(root, queries, index + 1, answer);\n  }\n\n  private void insert(Node node, String[] words, int wordIndex, int charIndex) {\n    update(node, words, wordIndex);\n    if (charIndex < 0) return;\n    int child = words[wordIndex].charAt(charIndex) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], words, wordIndex, charIndex - 1);\n  }\n\n  private Node query(Node node, String word, int index) {\n    if (index < 0) return node;\n    Node child = node.next[word.charAt(index) - 'a'];\n    return child == null ? node : query(child, word, index - 1);\n  }\n\n  private void update(Node node, String[] words, int index) {\n    if (node.best == -1 || words[index].length() < words[node.best].length()\n        || words[index].length() == words[node.best].length() && index < node.best) node.best = index;\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int best = -1;\n  }\n\n  public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {\n    Node root = new Node();\n    for (int i = 0; i < wordsContainer.length; i++) insert(root, wordsContainer, i);\n    int[] answer = new int[wordsQuery.length];\n    for (int i = 0; i < wordsQuery.length; i++) answer[i] = query(root, wordsQuery[i]);\n    return answer;\n  }\n\n  private void insert(Node root, String[] words, int index) {\n    Node node = root;\n    update(node, words, index);\n    String word = words[index];\n    for (int i = word.length() - 1; i >= 0; i--) {\n      int child = word.charAt(i) - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      update(node, words, index);\n    }\n  }\n\n  private int query(Node root, String query) {\n    Node node = root;\n    for (int i = query.length() - 1; i >= 0; i--) {\n      Node child = node.next[query.charAt(i) - 'a'];\n      if (child == null) break;\n      node = child;\n    }\n    return node.best;\n  }\n\n  private void update(Node node, String[] words, int index) {\n    if (node.best == -1 || words[index].length() < words[node.best].length()\n        || words[index].length() == words[node.best].length() && index < node.best) {\n      node.best = index;\n    }\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    int best = -1;\n  }\n\n  public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {\n    Node root = new Node();\n    for (int i = 0; i < wordsContainer.length; i++) insert(root, wordsContainer, i);\n    int[] answer = new int[wordsQuery.length];\n    for (int i = 0; i < wordsQuery.length; i++) answer[i] = query(root, wordsQuery[i]);\n    return answer;\n  }\n\n  private void insert(Node root, String[] words, int index) {\n    Node node = root;\n    update(node, words, index);\n    String word = words[index];\n    for (int i = word.length() - 1; i >= 0; i--) {\n      int child = word.charAt(i) - 'a';\n      if (node.next[child] == null) node.next[child] = new Node();\n      node = node.next[child];\n      update(node, words, index);\n    }\n  }\n\n  private int query(Node root, String query) {\n    Node node = root;\n    for (int i = query.length() - 1; i >= 0; i--) {\n      Node child = node.next[query.charAt(i) - 'a'];\n      if (child == null) break;\n      node = child;\n    }\n    return node.best;\n  }\n\n  private void update(Node node, String[] words, int index) {\n    if (node.best == -1 || words[index].length() < words[node.best].length()\n        || words[index].length() == words[node.best].length() && index < node.best) {\n      node.best = index;\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum XOR With an Element From Array",
      "difficulty": "Hard",
      "subpattern": "Offline bitwise trie queries",
      "question": "Given nums and queries [x, m], return for each query the maximum x XOR num using a num from nums with num <= m, or -1 if none exists.",
      "trigger": "Each query needs maximum XOR but only over values below a limit, so sort queries by limit and insert eligible numbers into a binary trie.",
      "intuition": "Process queries in increasing m; the trie always contains exactly the numbers allowed for that query.",
      "edgeCases": "No eligible number, duplicate nums, m smaller than all nums, x equals a num, large high bits.",
      "constraints": "1 <= nums.length, queries.length <= 100000; 0 <= nums[i], x, m <= 1000000000.",
      "source": {
        "label": "Maximum XOR With an Element From Array - LeetCode 1707",
        "url": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/"
      },
      "examples": [
        {
          "input": "nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]",
          "output": "[3,3,7]",
          "explanation": "Each query only uses numbers not greater than m."
        },
        {
          "input": "nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]",
          "output": "[15,-1,5]",
          "explanation": "The second query has no eligible number."
        },
        {
          "input": "nums = [1], queries = [[0,0]]",
          "output": "[-1]",
          "explanation": "1 is greater than m."
        }
      ],
      "bruteForceComplexity": "Time O(nq); Space O(1). Each query scans all nums and checks the limit.",
      "optimizedComplexity": "Time O((n + q) log n + 31(n + q)); Space O(31n + q). Offline sorting plus binary trie answers each query greedily.",
      "recursiveComplexity": "Time O((n + q) log n + 31(n + q)); Space O(31n + q + 31). Recursive trie insert/query follows bits.",
      "bruteForceCode": "class Solution {\n  public int[] maximizeXor(int[] nums, int[][] queries) {\n    int[] answer = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int best = -1;\n      int x = queries[i][0], limit = queries[i][1];\n      for (int num : nums) {\n        if (num <= limit) best = Math.max(best, x ^ num);\n      }\n      answer[i] = best;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int[] maximizeXor(int[] nums, int[][] queries) {\n    Arrays.sort(nums);\n    int[][] ordered = new int[queries.length][3];\n    for (int i = 0; i < queries.length; i++) ordered[i] = new int[] {queries[i][0], queries[i][1], i};\n    Arrays.sort(ordered, Comparator.comparingInt(a -> a[1]));\n\n    int[] answer = new int[queries.length];\n    Node root = new Node();\n    int index = 0;\n    for (int[] query : ordered) {\n      while (index < nums.length && nums[index] <= query[1]) insert(root, nums[index++]);\n      answer[query[2]] = index == 0 ? -1 : query(root, query[0]);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n    }\n  }\n\n  private int query(Node root, int x) {\n    Node node = root;\n    int best = 0;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (x >>> bit) & 1;\n      int want = current ^ 1;\n      if (node.next[want] != null) {\n        best |= 1 << bit;\n        node = node.next[want];\n      } else {\n        node = node.next[current];\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int[] maximizeXor(int[] nums, int[][] queries) {\n    Arrays.sort(nums);\n    int[][] ordered = new int[queries.length][3];\n    for (int i = 0; i < queries.length; i++) ordered[i] = new int[] {queries[i][0], queries[i][1], i};\n    Arrays.sort(ordered, Comparator.comparingInt(a -> a[1]));\n    int[] answer = new int[queries.length];\n    Node root = new Node();\n    int index = 0;\n    for (int[] query : ordered) {\n      while (index < nums.length && nums[index] <= query[1]) insert(root, nums[index++], 30);\n      answer[query[2]] = index == 0 ? -1 : query(root, query[0], 30);\n    }\n    return answer;\n  }\n\n  private void insert(Node node, int num, int bit) {\n    if (bit < 0) return;\n    int current = (num >>> bit) & 1;\n    if (node.next[current] == null) node.next[current] = new Node();\n    insert(node.next[current], num, bit - 1);\n  }\n\n  private int query(Node node, int x, int bit) {\n    if (bit < 0) return 0;\n    int current = (x >>> bit) & 1;\n    int want = current ^ 1;\n    if (node.next[want] != null) return (1 << bit) | query(node.next[want], x, bit - 1);\n    return query(node.next[current], x, bit - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int[] maximizeXor(int[] nums, int[][] queries) {\n    Arrays.sort(nums);\n    int[][] ordered = new int[queries.length][3];\n    for (int i = 0; i < queries.length; i++) ordered[i] = new int[] {queries[i][0], queries[i][1], i};\n    Arrays.sort(ordered, Comparator.comparingInt(a -> a[1]));\n\n    int[] answer = new int[queries.length];\n    Node root = new Node();\n    int index = 0;\n    for (int[] query : ordered) {\n      while (index < nums.length && nums[index] <= query[1]) insert(root, nums[index++]);\n      answer[query[2]] = index == 0 ? -1 : query(root, query[0]);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n    }\n  }\n\n  private int query(Node root, int x) {\n    Node node = root;\n    int best = 0;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (x >>> bit) & 1;\n      int want = current ^ 1;\n      if (node.next[want] != null) {\n        best |= 1 << bit;\n        node = node.next[want];\n      } else {\n        node = node.next[current];\n      }\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int[] maximizeXor(int[] nums, int[][] queries) {\n    Arrays.sort(nums);\n    int[][] ordered = new int[queries.length][3];\n    for (int i = 0; i < queries.length; i++) ordered[i] = new int[] {queries[i][0], queries[i][1], i};\n    Arrays.sort(ordered, Comparator.comparingInt(a -> a[1]));\n\n    int[] answer = new int[queries.length];\n    Node root = new Node();\n    int index = 0;\n    for (int[] query : ordered) {\n      while (index < nums.length && nums[index] <= query[1]) insert(root, nums[index++]);\n      answer[query[2]] = index == 0 ? -1 : query(root, query[0]);\n    }\n    return answer;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (num >>> bit) & 1;\n      if (node.next[current] == null) node.next[current] = new Node();\n      node = node.next[current];\n    }\n  }\n\n  private int query(Node root, int x) {\n    Node node = root;\n    int best = 0;\n    for (int bit = 30; bit >= 0; bit--) {\n      int current = (x >>> bit) & 1;\n      int want = current ^ 1;\n      if (node.next[want] != null) {\n        best |= 1 << bit;\n        node = node.next[want];\n      } else {\n        node = node.next[current];\n      }\n    }\n    return best;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem asks for repeated prefix, suffix, wildcard, or dictionary membership queries.",
    "Many strings share prefixes or reversed suffixes, and scanning every word would repeat work.",
    "A query consumes characters one by one and can stop as soon as a path is missing.",
    "The needed state belongs on each prefix node: terminal flag, count, sum, top suggestions, index, or best candidate.",
    "For XOR problems, think of a binary trie over bits from high to low instead of characters."
  ],
  "traps": [
    "Forgetting that a prefix node is not a complete word unless terminal is true.",
    "Not handling overwrites in MapSum with a delta update.",
    "Marking visited board cells too late in trie-guided grid search.",
    "Returning exact-word matches in Magic Dictionary when exactly one mismatch is required.",
    "Building suffix problems forward instead of inserting reversed strings.",
    "Losing tie-breaking rules such as shortest word then smallest index.",
    "Using fixed 26-child arrays when input can contain spaces, slashes, separators, or digits."
  ],
  "edgeCases": [
    "Empty prefix or suffix when the original problem allows it.",
    "One-character word or one-node path.",
    "Duplicate inserted key that changes aggregate value.",
    "A word that is both a complete word and a prefix of another word.",
    "No matching prefix path after the first character.",
    "Wildcard branches that must try every child.",
    "Path components such as slash-separated folders instead of single characters."
  ],
  "complexities": [
    "Basic insert/search/startsWith: Time O(L), Space O(total characters).",
    "Wildcard search: Time O(26^d * L) worst case, where d is the number of wildcards.",
    "Trie-guided grid search: Time bounded by board paths but heavily pruned by missing prefixes.",
    "Prefix aggregate queries: update and query usually cost O(L) with counts or sums stored on nodes.",
    "Binary trie XOR queries: Time O(B) per insert/query, where B is number of bits considered.",
    "Path trie operations: Time O(number of components), Space O(total components).",
    "All-output problems still pay output size, even when trie lookup is efficient."
  ],
  "mentalModel": [
    "A trie node represents the prefix consumed so far.",
    "Put information on the node that answers future queries without rescanning descendants.",
    "Choose direction first: normal trie for prefixes, reverse trie for suffixes, binary trie for XOR.",
    "Terminal flags answer word existence; counts and weights answer aggregate prefix questions.",
    "When a query has branching characters such as dot, DFS from the current trie node is the cleanest model."
  ],
  "revisionStrategy": [
    "Day 1: redo Implement Trie, WordDictionary, Replace Words, and MapSum until node design is automatic.",
    "Day 2: redo Word Search II, Stream of Characters, Search Suggestions, and Maximum XOR.",
    "Day 4: redo Palindrome Pairs, Concatenated Words, Prefix and Suffix Search, and Magic Dictionary.",
    "Day 7: mix one character trie, one reverse trie, one binary trie, and one path trie problem in a single session.",
    "Before interviews: write the node fields first, then explain why each field is necessary before coding."
  ],
  "unseen": [
    "Design a dictionary that returns the number of stored words sharing a given prefix after deletions.",
    "Given product names and typo queries, return whether any product differs by at most one character.",
    "Given folder paths, return the deepest folder that contains all files with a requested extension.",
    "Given integers and online insertions, return the maximum XOR with the latest query number.",
    "Given a board and a dictionary, return the longest dictionary word that can be formed without reusing cells."
  ]
};
