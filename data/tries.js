const CURRENT_PATTERN = {
  "id": "tries",
  "name": "Trie",
  "summary": "Prefix search, word dictionaries, bitwise tries.",
  "complete": true,
  "subpatterns": [
    "Core Trie recognition",
    "Boundary handling in Trie",
    "Optimized iterative Trie",
    "Recursive or DFS-style Trie",
    "Advanced Trie variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Implement Trie Prefix Tree",
      "difficulty": "Easy",
      "subpattern": "Prefix search",
      "question": "Solve Implement Trie Prefix Tree using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Implement Trie Prefix Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Implement%20Trie%20Prefix%20Tree"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Add and Search Words Data Structure",
      "difficulty": "Easy",
      "subpattern": "word dictionaries",
      "question": "Solve Design Add and Search Words Data Structure using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Design Add and Search Words Data Structure - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Design%20Add%20and%20Search%20Words%20Data%20Structure"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Word Search II",
      "difficulty": "Easy",
      "subpattern": "bitwise tries.",
      "question": "Solve Word Search II using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Word Search II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Word%20Search%20II"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Replace Words",
      "difficulty": "Easy",
      "subpattern": "Prefix search",
      "question": "Solve Replace Words using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Replace Words - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Replace%20Words"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Map Sum Pairs",
      "difficulty": "Easy",
      "subpattern": "word dictionaries",
      "question": "Solve Map Sum Pairs using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Map Sum Pairs - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Map%20Sum%20Pairs"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Word in Dictionary",
      "difficulty": "Easy",
      "subpattern": "bitwise tries.",
      "question": "Solve Longest Word in Dictionary using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Longest Word in Dictionary - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Longest%20Word%20in%20Dictionary"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Stream of Characters",
      "difficulty": "Easy",
      "subpattern": "Prefix search",
      "question": "Solve Stream of Characters using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Stream of Characters - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Stream%20of%20Characters"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search Suggestions System",
      "difficulty": "Easy",
      "subpattern": "word dictionaries",
      "question": "Solve Search Suggestions System using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Search Suggestions System - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Search%20Suggestions%20System"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Maximum XOR of Two Numbers in an Array",
      "difficulty": "Easy",
      "subpattern": "bitwise tries.",
      "question": "Solve Maximum XOR of Two Numbers in an Array using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum XOR of Two Numbers in an Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20XOR%20of%20Two%20Numbers%20in%20an%20Array"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Palindrome Pairs",
      "difficulty": "Easy",
      "subpattern": "Prefix search",
      "question": "Solve Palindrome Pairs using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Palindrome Pairs - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Palindrome%20Pairs"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Concatenated Words",
      "difficulty": "Medium",
      "subpattern": "word dictionaries",
      "question": "Solve Concatenated Words using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Concatenated Words - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Concatenated%20Words"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Word Squares",
      "difficulty": "Medium",
      "subpattern": "bitwise tries.",
      "question": "Solve Word Squares using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Word Squares - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Word%20Squares"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Index Pairs of a String",
      "difficulty": "Medium",
      "subpattern": "Prefix search",
      "question": "Solve Index Pairs of a String using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Index Pairs of a String - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Index%20Pairs%20of%20a%20String"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Camelcase Matching",
      "difficulty": "Medium",
      "subpattern": "word dictionaries",
      "question": "Solve Camelcase Matching using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Camelcase Matching - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Camelcase%20Matching"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Prefix and Suffix Search",
      "difficulty": "Medium",
      "subpattern": "bitwise tries.",
      "question": "Solve Prefix and Suffix Search using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Prefix and Suffix Search - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Prefix%20and%20Suffix%20Search"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Shortest Unique Prefix",
      "difficulty": "Medium",
      "subpattern": "Prefix search",
      "question": "Solve Shortest Unique Prefix using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Shortest Unique Prefix - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Shortest%20Unique%20Prefix"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Count Pairs With XOR in a Range",
      "difficulty": "Medium",
      "subpattern": "word dictionaries",
      "question": "Solve Count Pairs With XOR in a Range using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Count Pairs With XOR in a Range - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Count%20Pairs%20With%20XOR%20in%20a%20Range"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sum of Prefix Scores of Strings",
      "difficulty": "Medium",
      "subpattern": "bitwise tries.",
      "question": "Solve Sum of Prefix Scores of Strings using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sum of Prefix Scores of Strings - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sum%20of%20Prefix%20Scores%20of%20Strings"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Implement Magic Dictionary",
      "difficulty": "Medium",
      "subpattern": "Prefix search",
      "question": "Solve Implement Magic Dictionary using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Implement Magic Dictionary - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Implement%20Magic%20Dictionary"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Encrypt and Decrypt Strings",
      "difficulty": "Medium",
      "subpattern": "word dictionaries",
      "question": "Solve Encrypt and Decrypt Strings using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Encrypt and Decrypt Strings - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Encrypt%20and%20Decrypt%20Strings"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Design File System",
      "difficulty": "Medium",
      "subpattern": "bitwise tries.",
      "question": "Solve Design File System using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Design File System - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Design%20File%20System"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Design In-Memory File System",
      "difficulty": "Medium",
      "subpattern": "Prefix search",
      "question": "Solve Design In-Memory File System using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Design In-Memory File System - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Design%20In-Memory%20File%20System"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Bold Words in String",
      "difficulty": "Medium",
      "subpattern": "word dictionaries",
      "question": "Solve Bold Words in String using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Bold Words in String - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Bold%20Words%20in%20String"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Ternary Search Trie Search",
      "difficulty": "Medium",
      "subpattern": "bitwise tries.",
      "question": "Solve Ternary Search Trie Search using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Ternary Search Trie Search - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Ternary%20Search%20Trie%20Search"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Autocomplete System",
      "difficulty": "Hard",
      "subpattern": "Prefix search",
      "question": "Solve Autocomplete System using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Autocomplete System - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Autocomplete%20System"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Word Break with Trie",
      "difficulty": "Hard",
      "subpattern": "word dictionaries",
      "question": "Solve Word Break with Trie using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Word Break with Trie - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Word%20Break%20with%20Trie"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Find Duplicate Folders in System",
      "difficulty": "Hard",
      "subpattern": "bitwise tries.",
      "question": "Solve Find Duplicate Folders in System using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Duplicate Folders in System - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Duplicate%20Folders%20in%20System"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Longest Common Prefix",
      "difficulty": "Hard",
      "subpattern": "Prefix search",
      "question": "Solve Longest Common Prefix using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes prefix search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for prefix search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Longest Common Prefix - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Longest%20Common%20Prefix"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Remove Sub-Folders from the Filesystem",
      "difficulty": "Hard",
      "subpattern": "word dictionaries",
      "question": "Solve Remove Sub-Folders from the Filesystem using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes word dictionaries and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for word dictionaries and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Remove Sub-Folders from the Filesystem - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Remove%20Sub-Folders%20from%20the%20Filesystem"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Extra Characters in a String",
      "difficulty": "Hard",
      "subpattern": "bitwise tries.",
      "question": "Solve Extra Characters in a String using the Trie pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Trie when the input structure exposes bitwise tries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for bitwise tries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Extra Characters in a String - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Extra%20Characters%20in%20a%20String"
      },
      "examples": [
        {
          "input": "words = [\"cat\",\"car\"], prefix = \"ca\"",
          "output": "true",
          "explanation": "Both words share the prefix path."
        },
        {
          "input": "words = [\"cat\"], prefix = \"dog\"",
          "output": "false",
          "explanation": "Missing child breaks search."
        },
        {
          "input": "word = \"\"",
          "output": "root state",
          "explanation": "Empty prefix stops at root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final Set<String> words = new HashSet<>();\n\n  public void insert(String word) { words.add(word); }\n\n  public boolean search(String word) { return words.contains(word); }\n\n  public boolean startsWith(String prefix) {\n    for (String word : words) if (word.startsWith(prefix)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) { insert(root, word, 0); }\n  public boolean search(String word) { return search(root, word, 0); }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) { node.word = true; return; }\n    int i = word.charAt(index) - 'a';\n    if (node.next[i] == null) node.next[i] = new Node();\n    insert(node.next[i], word, index + 1);\n  }\n\n  private boolean search(Node node, String word, int index) {\n    if (node == null) return false;\n    if (index == word.length()) return node.word;\n    return search(node.next[word.charAt(index) - 'a'], word, index + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Trie {\n  private static class Node { Node[] next = new Node[26]; boolean word; }\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node cur = root;\n    for (char c : word.toCharArray()) {\n      int i = c - 'a';\n      if (cur.next[i] == null) cur.next[i] = new Node();\n      cur = cur.next[i];\n    }\n    cur.word = true;\n  }\n\n  public boolean search(String word) { return find(word, false); }\n  public boolean startsWith(String prefix) { return find(prefix, true); }\n\n  private boolean find(String text, boolean prefixOnly) {\n    Node cur = root;\n    for (char c : text.toCharArray()) {\n      cur = cur.next[c - 'a'];\n      if (cur == null) return false;\n    }\n    return prefixOnly || cur.word;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Trie signal in ordering, state transition, connectivity, range, or repeated decision work.",
    "A brute force solution repeats the same local calculation many times.",
    "The optimized solution keeps a compact state and updates it predictably.",
    "Boundary cases decide correctness more than syntax.",
    "The answer can be verified by checking the invariant after each step."
  ],
  "traps": [
    "Forgetting empty or single-item inputs.",
    "Using the optimized structure before defining the invariant.",
    "Mixing inclusive and exclusive boundaries.",
    "Letting duplicate values break comparison logic.",
    "Writing recursion without a clear base case."
  ],
  "edgeCases": [
    "Empty input if the original problem allows it.",
    "Single element or single node.",
    "All values equal.",
    "Strictly increasing or decreasing values.",
    "Maximum constraints where brute force times out."
  ],
  "complexities": [
    "Brute force usually enumerates candidates and costs O(n^2) or worse.",
    "Optimized iterative solutions keep a stable invariant and usually reduce repeated work.",
    "Recursive solutions add call-stack space equal to depth unless memoized.",
    "Hash maps, heaps, queues, stacks, trees, and graph structures add state proportional to stored candidates.",
    "DP and graph patterns should name states/vertices before estimating complexity."
  ],
  "mentalModel": [
    "Name the state before writing code.",
    "Write the invariant in one sentence.",
    "Move one boundary or process one decision at a time.",
    "Prove each update preserves the invariant.",
    "Check the smallest valid input before optimizing."
  ],
  "revisionStrategy": [
    "Revise the 12 core problems first until the trigger is instant.",
    "Redo 4 core problems after 24 hours without looking at code.",
    "Mix 3 advanced problems with 3 core problems every third session.",
    "Track mistakes by category: boundary, state, duplicate, recursion base case, complexity.",
    "Use the unseen problems only after solving the core set cleanly."
  ],
  "unseen": [
    "A hidden Trie problem with duplicates and boundary indexes.",
    "A Trie problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Trie but needs one helper structure.",
    "A maximum-constraint version of a familiar Trie problem.",
    "A recognition test where the statement does not mention Trie."
  ]
};
