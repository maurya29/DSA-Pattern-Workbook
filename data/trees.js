const CURRENT_PATTERN = {
  "id": "trees",
  "name": "Trees",
  "summary": "DFS, BFS, paths, LCA, construction, serialization.",
  "complete": true,
  "subpatterns": [
    "Tree DFS height and aggregation",
    "Tree BFS level traversal",
    "Tree comparison and symmetry",
    "Root-to-leaf path recursion",
    "Lowest common ancestor and ancestor bubbling",
    "Tree construction from traversals",
    "Tree serialization and structural hashing",
    "BST inorder and bounds traversal",
    "Tree dynamic programming states",
    "In-place tree mutation and pointer rewiring"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Maximum Depth of Binary Tree",
      "difficulty": "Easy",
      "subpattern": "Tree DFS height aggregation",
      "question": "Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node down to a leaf.",
      "trigger": "The depth of a node is defined from the depths of its left and right subtrees, so every subtree returns one value to its parent.",
      "intuition": "An empty tree has depth 0. A non-empty node contributes 1 plus the larger depth of its children.",
      "edgeCases": "Empty tree, one node, completely skewed tree, balanced tree, deep recursion stack.",
      "constraints": "0 <= number of nodes <= 10000; -100 <= Node.val <= 100.",
      "source": {
        "label": "Maximum Depth of Binary Tree - LeetCode 104",
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "3",
          "explanation": "The longest root-to-leaf path has 3 nodes."
        },
        {
          "input": "root = [1,null,2]",
          "output": "2",
          "explanation": "The right-skewed path has two nodes."
        },
        {
          "input": "root = []",
          "output": "0",
          "explanation": "An empty tree has depth 0."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store all root-to-leaf depths, then take the maximum.",
      "optimizedComplexity": "Time O(n); Space O(w). BFS level traversal counts tree levels.",
      "recursiveComplexity": "Time O(n); Space O(h). DFS recursion returns height from each subtree.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    List<Integer> depths = new ArrayList<>();\n    collect(root, 0, depths);\n    int best = 0;\n    for (int depth : depths) {\n      best = Math.max(best, depth);\n    }\n    return best;\n  }\n\n  private void collect(TreeNode node, int depth, List<Integer> depths) {\n    if (node == null) {\n      depths.add(depth);\n      return;\n    }\n    collect(node.left, depth + 1, depths);\n    collect(node.right, depth + 1, depths);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    int leftDepth = maxDepth(root.left);\n    int rightDepth = maxDepth(root.right);\n    return 1 + Math.max(leftDepth, rightDepth);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Same Tree",
      "difficulty": "Easy",
      "subpattern": "Tree comparison and structural DFS",
      "question": "Given the roots of two binary trees p and q, return true if they are structurally identical and every corresponding node has the same value.",
      "trigger": "Two trees are equal only when the current nodes match and both left and right subtree pairs are also equal.",
      "intuition": "Handle null pairs first. Then compare values and recurse or iterate over corresponding child pairs.",
      "edgeCases": "Both roots null, one root null, same values with different structure, different values with same structure, single-node trees.",
      "constraints": "0 <= number of nodes <= 100; -10000 <= Node.val <= 10000.",
      "source": {
        "label": "Same Tree - LeetCode 100",
        "url": "https://leetcode.com/problems/same-tree/"
      },
      "examples": [
        {
          "input": "p = [1,2,3], q = [1,2,3]",
          "output": "true",
          "explanation": "Both structure and values match."
        },
        {
          "input": "p = [1,2], q = [1,null,2]",
          "output": "false",
          "explanation": "The node positions differ."
        },
        {
          "input": "p = [1,2,1], q = [1,1,2]",
          "output": "false",
          "explanation": "The same values are in different positions."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Serialize both trees with null markers and compare strings.",
      "optimizedComplexity": "Time O(n); Space O(h) to O(n). Iterative stack compares node pairs.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS compares corresponding nodes.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    String first = serialize(p);\n    String second = serialize(q);\n    return first.equals(second);\n  }\n\n  private String serialize(TreeNode node) {\n    if (node == null) return \"#,\";\n    return node.val + \",\" + serialize(node.left) + serialize(node.right);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    Deque<TreeNode[]> stack = new ArrayDeque<>();\n    stack.push(new TreeNode[] {p, q});\n\n    while (!stack.isEmpty()) {\n      TreeNode[] pair = stack.pop();\n      TreeNode a = pair[0];\n      TreeNode b = pair[1];\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      stack.push(new TreeNode[] {a.left, b.left});\n      stack.push(new TreeNode[] {a.right, b.right});\n    }\n\n    return true;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null || q == null) return p == q;\n    if (p.val != q.val) return false;\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    Deque<TreeNode[]> stack = new ArrayDeque<>();\n    stack.push(new TreeNode[] {p, q});\n\n    while (!stack.isEmpty()) {\n      TreeNode[] pair = stack.pop();\n      TreeNode a = pair[0];\n      TreeNode b = pair[1];\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      stack.push(new TreeNode[] {a.left, b.left});\n      stack.push(new TreeNode[] {a.right, b.right});\n    }\n\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    Deque<TreeNode[]> stack = new ArrayDeque<>();\n    stack.push(new TreeNode[] {p, q});\n\n    while (!stack.isEmpty()) {\n      TreeNode[] pair = stack.pop();\n      TreeNode a = pair[0];\n      TreeNode b = pair[1];\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      stack.push(new TreeNode[] {a.left, b.left});\n      stack.push(new TreeNode[] {a.right, b.right});\n    }\n\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Invert Binary Tree",
      "difficulty": "Easy",
      "subpattern": "In-place tree mutation",
      "question": "Given the root of a binary tree, invert the tree and return its root. Inversion swaps every node’s left and right children.",
      "trigger": "Every node performs the same local operation, then the same operation must be applied to both child subtrees.",
      "intuition": "Swap left and right at the current node. Then visit children by BFS, stack DFS, or recursion.",
      "edgeCases": "Empty tree, one node, only left children, only right children, preserving node references.",
      "constraints": "0 <= number of nodes <= 100; -100 <= Node.val <= 100.",
      "source": {
        "label": "Invert Binary Tree - LeetCode 226",
        "url": "https://leetcode.com/problems/invert-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3,6,9]",
          "output": "[4,7,2,9,6,3,1]",
          "explanation": "All left and right child links are swapped."
        },
        {
          "input": "root = [2,1,3]",
          "output": "[2,3,1]",
          "explanation": "The root children swap."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "The empty tree stays empty."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build a new mirrored copy of the tree.",
      "optimizedComplexity": "Time O(n); Space O(w). Iterative BFS mutates the tree in-place.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS mutates each node once.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    TreeNode copy = new TreeNode(root.val);\n    copy.left = invertTree(root.right);\n    copy.right = invertTree(root.left);\n    return copy;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      TreeNode temp = node.left;\n      node.left = node.right;\n      node.right = temp;\n      if (node.left != null) queue.offer(node.left);\n      if (node.right != null) queue.offer(node.right);\n    }\n\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    TreeNode left = invertTree(root.left);\n    TreeNode right = invertTree(root.right);\n    root.left = right;\n    root.right = left;\n    return root;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      TreeNode temp = node.left;\n      node.left = node.right;\n      node.right = temp;\n      if (node.left != null) queue.offer(node.left);\n      if (node.right != null) queue.offer(node.right);\n    }\n\n    return root;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      TreeNode temp = node.left;\n      node.left = node.right;\n      node.right = temp;\n      if (node.left != null) queue.offer(node.left);\n      if (node.right != null) queue.offer(node.right);\n    }\n\n    return root;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Binary Tree Level Order Traversal",
      "difficulty": "Medium",
      "subpattern": "Tree BFS level traversal",
      "question": "Given the root of a binary tree, return the level order traversal of its nodes values from left to right, level by level.",
      "trigger": "The output is grouped by depth, so BFS naturally processes one complete level at a time.",
      "intuition": "Use a queue. For each level, process exactly the current queue size and enqueue children for the next level.",
      "edgeCases": "Empty tree, one node, incomplete levels, skewed tree, preserving left-to-right order.",
      "constraints": "0 <= number of nodes <= 2000; -1000 <= Node.val <= 1000.",
      "source": {
        "label": "Binary Tree Level Order Traversal - LeetCode 102",
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "[[3],[9,20],[15,7]]",
          "explanation": "Values are grouped by depth."
        },
        {
          "input": "root = [1]",
          "output": "[[1]]",
          "explanation": "One level contains the root."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "There are no levels."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(h + n). Compute tree height, then collect each depth separately.",
      "optimizedComplexity": "Time O(n); Space O(w). BFS visits each node once and stores the widest level.",
      "recursiveComplexity": "Time O(n); Space O(h). DFS creates a list for each depth and appends node values.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    int height = height(root);\n    for (int depth = 0; depth < height; depth++) {\n      List<Integer> level = new ArrayList<>();\n      collect(root, depth, level);\n      answer.add(level);\n    }\n    return answer;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n\n  private void collect(TreeNode node, int depth, List<Integer> level) {\n    if (node == null) return;\n    if (depth == 0) level.add(node.val);\n    else { collect(node.left, depth - 1, level); collect(node.right, depth - 1, level); }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List<Integer> level = new ArrayList<>();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(level);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    dfs(root, 0, answer);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int depth, List<List<Integer>> answer) {\n    if (node == null) return;\n    if (depth == answer.size()) answer.add(new ArrayList<>());\n    answer.get(depth).add(node.val);\n    dfs(node.left, depth + 1, answer);\n    dfs(node.right, depth + 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List<Integer> level = new ArrayList<>();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(level);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List<Integer> level = new ArrayList<>();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(level);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Binary Tree Right Side View",
      "difficulty": "Medium",
      "subpattern": "Tree BFS/DFS visible nodes by depth",
      "question": "Given the root of a binary tree, return the values visible when looking at the tree from the right side, ordered from top to bottom.",
      "trigger": "For each depth, only the rightmost node matters.",
      "intuition": "BFS can take the last node of each level. DFS can visit right child first and record the first node seen at each depth.",
      "edgeCases": "Empty tree, one node, missing right child, skewed left tree, multiple nodes at same depth.",
      "constraints": "0 <= number of nodes <= 100; -100 <= Node.val <= 100.",
      "source": {
        "label": "Binary Tree Right Side View - LeetCode 199",
        "url": "https://leetcode.com/problems/binary-tree-right-side-view/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,null,5,null,4]",
          "output": "[1,3,4]",
          "explanation": "Nodes 1, 3, and 4 are rightmost by level."
        },
        {
          "input": "root = [1,null,3]",
          "output": "[1,3]",
          "explanation": "The visible path follows the right child."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "No nodes are visible."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(h). For each depth, scan the tree to find the rightmost node.",
      "optimizedComplexity": "Time O(n); Space O(w). BFS records the last value at each level.",
      "recursiveComplexity": "Time O(n); Space O(h). Right-first DFS records first node per depth.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> answer = new ArrayList<>();\n    int height = height(root);\n    for (int depth = 0; depth < height; depth++) {\n      TreeNode node = rightmostAtDepth(root, depth);\n      if (node != null) answer.add(node.val);\n    }\n    return answer;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n\n  private TreeNode rightmostAtDepth(TreeNode node, int depth) {\n    if (node == null) return null;\n    if (depth == 0) return node;\n    TreeNode right = rightmostAtDepth(node.right, depth - 1);\n    return right != null ? right : rightmostAtDepth(node.left, depth - 1);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (i == size - 1) answer.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> answer = new ArrayList<>();\n    dfs(root, 0, answer);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int depth, List<Integer> answer) {\n    if (node == null) return;\n    if (depth == answer.size()) answer.add(node.val);\n    dfs(node.right, depth + 1, answer);\n    dfs(node.left, depth + 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (i == size - 1) answer.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (i == size - 1) answer.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Diameter of Binary Tree",
      "difficulty": "Easy",
      "subpattern": "Tree DFS height and global aggregation",
      "question": "Given the root of a binary tree, return the length in edges of the longest path between any two nodes in the tree.",
      "trigger": "The best path through a node is left height plus right height, while each subtree must return height to its parent.",
      "intuition": "Postorder DFS computes child heights. Update global diameter with leftHeight + rightHeight at every node.",
      "edgeCases": "Empty tree, one node diameter 0, skewed tree, longest path not passing through root, edge count not node count.",
      "constraints": "1 <= number of nodes <= 10000; -100 <= Node.val <= 100.",
      "source": {
        "label": "Diameter of Binary Tree - LeetCode 543",
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,4,5]",
          "output": "3",
          "explanation": "The longest path is 4-2-1-3 or 5-2-1-3."
        },
        {
          "input": "root = [1,2]",
          "output": "1",
          "explanation": "The only edge is the diameter."
        },
        {
          "input": "root = [1]",
          "output": "0",
          "explanation": "A single node has no edge path."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(h). For every node, recompute left and right heights.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes heights once per node.",
      "recursiveComplexity": "Time O(n); Space O(h). Postorder DFS returns heights and updates the best diameter.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    int throughRoot = height(root.left) + height(root.right);\n    int left = diameterOfBinaryTree(root.left);\n    int right = diameterOfBinaryTree(root.right);\n    return Math.max(throughRoot, Math.max(left, right));\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    Map<TreeNode, Integer> height = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = 0;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode peek = stack.peek();\n      if (peek.right != null && last != peek.right) { current = peek.right; continue; }\n      int left = height.getOrDefault(peek.left, 0);\n      int right = height.getOrDefault(peek.right, 0);\n      best = Math.max(best, left + right);\n      height.put(peek, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int best = 0;\n\n  public int diameterOfBinaryTree(TreeNode root) {\n    height(root);\n    return best;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    int left = height(node.left);\n    int right = height(node.right);\n    best = Math.max(best, left + right);\n    return 1 + Math.max(left, right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    Map<TreeNode, Integer> height = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = 0;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode peek = stack.peek();\n      if (peek.right != null && last != peek.right) { current = peek.right; continue; }\n      int left = height.getOrDefault(peek.left, 0);\n      int right = height.getOrDefault(peek.right, 0);\n      best = Math.max(best, left + right);\n      height.put(peek, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    Map<TreeNode, Integer> height = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = 0;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode peek = stack.peek();\n      if (peek.right != null && last != peek.right) { current = peek.right; continue; }\n      int left = height.getOrDefault(peek.left, 0);\n      int right = height.getOrDefault(peek.right, 0);\n      best = Math.max(best, left + right);\n      height.put(peek, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Balanced Binary Tree",
      "difficulty": "Easy",
      "subpattern": "Tree DFS height with sentinel failure",
      "question": "Given a binary tree, return true if it is height-balanced: for every node, the left and right subtree heights differ by no more than one.",
      "trigger": "Balance depends on subtree heights, and an unbalanced child should stop work early.",
      "intuition": "Return subtree height when balanced; return -1 as a sentinel when any subtree is already unbalanced.",
      "edgeCases": "Empty tree, one node, skewed tree, imbalance deep below root, difference exactly one.",
      "constraints": "0 <= number of nodes <= 5000; -10000 <= Node.val <= 10000.",
      "source": {
        "label": "Balanced Binary Tree - LeetCode 110",
        "url": "https://leetcode.com/problems/balanced-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "true",
          "explanation": "Every subtree height difference is at most one."
        },
        {
          "input": "root = [1,2,2,3,3,null,null,4,4]",
          "output": "false",
          "explanation": "The left subtree is too deep."
        },
        {
          "input": "root = []",
          "output": "true",
          "explanation": "An empty tree is balanced."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(h). Recompute heights for every node.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes each height once.",
      "recursiveComplexity": "Time O(n); Space O(h). DFS returns -1 immediately for unbalanced subtrees.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    if (root == null) return true;\n    int left = height(root.left);\n    int right = height(root.right);\n    return Math.abs(left - right) <= 1 && isBalanced(root.left) && isBalanced(root.right);\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    Map<TreeNode, Integer> height = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = height.getOrDefault(node.left, 0);\n      int right = height.getOrDefault(node.right, 0);\n      if (Math.abs(left - right) > 1) return false;\n      height.put(node, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    return height(root) != -1;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    int left = height(node.left);\n    if (left == -1) return -1;\n    int right = height(node.right);\n    if (right == -1) return -1;\n    if (Math.abs(left - right) > 1) return -1;\n    return 1 + Math.max(left, right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    Map<TreeNode, Integer> height = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = height.getOrDefault(node.left, 0);\n      int right = height.getOrDefault(node.right, 0);\n      if (Math.abs(left - right) > 1) return false;\n      height.put(node, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    Map<TreeNode, Integer> height = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = height.getOrDefault(node.left, 0);\n      int right = height.getOrDefault(node.right, 0);\n      if (Math.abs(left - right) > 1) return false;\n      height.put(node, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Subtree of Another Tree",
      "difficulty": "Easy",
      "subpattern": "Tree structural matching",
      "question": "Given roots root and subRoot, return true if subRoot is a subtree of root with the same structure and node values.",
      "trigger": "Every node in root can be a candidate start, and candidate equality is a same-tree comparison.",
      "intuition": "Traverse root. When values align, compare both trees structurally. Otherwise keep searching children.",
      "edgeCases": "subRoot equals root, subRoot is one node, repeated values, same preorder without null markers, root null.",
      "constraints": "1 <= number of root nodes <= 2000; 1 <= number of subRoot nodes <= 1000; -10000 <= Node.val <= 10000.",
      "source": {
        "label": "Subtree of Another Tree - LeetCode 572",
        "url": "https://leetcode.com/problems/subtree-of-another-tree/"
      },
      "examples": [
        {
          "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
          "output": "true",
          "explanation": "The subtree rooted at 4 matches subRoot."
        },
        {
          "input": "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
          "output": "false",
          "explanation": "The extra 0 changes the structure."
        },
        {
          "input": "root = [1], subRoot = [1]",
          "output": "true",
          "explanation": "The whole tree can be the subtree."
        }
      ],
      "bruteForceComplexity": "Time O(n*m); Space O(h). Compare subRoot against every node in root.",
      "optimizedComplexity": "Time O(n + m); Space O(n + m). Serialize both trees with null markers and search the serialized string.",
      "recursiveComplexity": "Time O(n*m); Space O(h). Recursive traversal checks same-tree at candidate nodes.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    if (root == null) return subRoot == null;\n    if (same(root, subRoot)) return true;\n    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n  }\n\n  private boolean same(TreeNode a, TreeNode b) {\n    if (a == null || b == null) return a == b;\n    return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    String tree = serialize(root);\n    String sub = serialize(subRoot);\n    return tree.contains(sub);\n  }\n\n  private String serialize(TreeNode node) {\n    if (node == null) return \"#,\";\n    return \"^\" + node.val + \",\" + serialize(node.left) + serialize(node.right);\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    if (root == null) return false;\n    if (sameTree(root, subRoot)) return true;\n    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n  }\n\n  private boolean sameTree(TreeNode a, TreeNode b) {\n    if (a == null || b == null) return a == b;\n    if (a.val != b.val) return false;\n    return sameTree(a.left, b.left) && sameTree(a.right, b.right);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    String tree = serialize(root);\n    String sub = serialize(subRoot);\n    return tree.contains(sub);\n  }\n\n  private String serialize(TreeNode node) {\n    if (node == null) return \"#,\";\n    return \"^\" + node.val + \",\" + serialize(node.left) + serialize(node.right);\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    String tree = serialize(root);\n    String sub = serialize(subRoot);\n    return tree.contains(sub);\n  }\n\n  private String serialize(TreeNode node) {\n    if (node == null) return \"#,\";\n    return \"^\" + node.val + \",\" + serialize(node.left) + serialize(node.right);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Lowest Common Ancestor of a Binary Tree",
      "difficulty": "Medium",
      "subpattern": "Ancestor bubbling in tree DFS",
      "question": "Given a binary tree and two nodes p and q, return their lowest common ancestor.",
      "trigger": "A subtree can report whether it contains p or q; the first node receiving hits from both sides is the LCA.",
      "intuition": "If current node is p or q, return it. Recurse left and right. If both sides return non-null, current node is the answer.",
      "edgeCases": "p is ancestor of q, q is ancestor of p, p and q in different subtrees, root is one target, skewed tree.",
      "constraints": "2 <= number of nodes <= 100000; all values are unique; p and q exist in the tree.",
      "source": {
        "label": "Lowest Common Ancestor of a Binary Tree - LeetCode 236",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
          "output": "3",
          "explanation": "The nodes are in different subtrees of 3."
        },
        {
          "input": "same root, p = 5, q = 4",
          "output": "5",
          "explanation": "5 is an ancestor of 4."
        },
        {
          "input": "root = [1,2], p = 1, q = 2",
          "output": "1",
          "explanation": "The root is an ancestor."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store root-to-node paths and compare them.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative parent map climbs ancestors.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS bubbles candidate nodes upward.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    List<TreeNode> pathP = new ArrayList<>();\n    List<TreeNode> pathQ = new ArrayList<>();\n    find(root, p, pathP);\n    find(root, q, pathQ);\n    TreeNode answer = null;\n    for (int i = 0; i < Math.min(pathP.size(), pathQ.size()) && pathP.get(i) == pathQ.get(i); i++) {\n      answer = pathP.get(i);\n    }\n    return answer;\n  }\n\n  private boolean find(TreeNode node, TreeNode target, List<TreeNode> path) {\n    if (node == null) return false;\n    path.add(node);\n    if (node == target || find(node.left, target, path) || find(node.right, target, path)) return true;\n    path.remove(path.size() - 1);\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) { parent.put(node.left, node); stack.push(node.left); }\n      if (node.right != null) { parent.put(node.right, node); stack.push(node.right); }\n    }\n\n    Set<TreeNode> ancestors = new HashSet<>();\n    while (p != null) { ancestors.add(p); p = parent.get(p); }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return left != null ? left : right;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) { parent.put(node.left, node); stack.push(node.left); }\n      if (node.right != null) { parent.put(node.right, node); stack.push(node.right); }\n    }\n\n    Set<TreeNode> ancestors = new HashSet<>();\n    while (p != null) { ancestors.add(p); p = parent.get(p); }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) { parent.put(node.left, node); stack.push(node.left); }\n      if (node.right != null) { parent.put(node.right, node); stack.push(node.right); }\n    }\n\n    Set<TreeNode> ancestors = new HashSet<>();\n    while (p != null) { ancestors.add(p); p = parent.get(p); }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Binary Tree Maximum Path Sum",
      "difficulty": "Hard",
      "subpattern": "Tree DFS gain aggregation",
      "question": "Given the root of a non-empty binary tree, return the maximum path sum of any non-empty path. A path can start and end at any nodes and must follow parent-child links.",
      "trigger": "The best complete path through a node can use both children, but the gain returned to the parent can use only one side.",
      "intuition": "For each node, compute max downward gain from left and right, ignoring negative gains. Update global best with left + node + right.",
      "edgeCases": "All negative values, one node, best path not through root, negative child gain, skewed tree.",
      "constraints": "1 <= number of nodes <= 30000; -1000 <= Node.val <= 1000.",
      "source": {
        "label": "Binary Tree Maximum Path Sum - LeetCode 124",
        "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
      },
      "examples": [
        {
          "input": "root = [1,2,3]",
          "output": "6",
          "explanation": "The best path is 2 -> 1 -> 3."
        },
        {
          "input": "root = [-10,9,20,null,null,15,7]",
          "output": "42",
          "explanation": "The best path is 15 -> 20 -> 7."
        },
        {
          "input": "root = [-3]",
          "output": "-3",
          "explanation": "A path must contain at least one node."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Treat every node as a path peak and recompute best downward gains.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes each downward gain once.",
      "recursiveComplexity": "Time O(n); Space O(h). Postorder DFS returns one-side gain and updates global answer.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    if (root == null) return Integer.MIN_VALUE;\n    int throughRoot = root.val + Math.max(0, gain(root.left)) + Math.max(0, gain(root.right));\n    int left = maxPathSum(root.left);\n    int right = maxPathSum(root.right);\n    return Math.max(throughRoot, Math.max(left, right));\n  }\n\n  private int gain(TreeNode node) {\n    if (node == null) return 0;\n    return node.val + Math.max(0, Math.max(gain(node.left), gain(node.right)));\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    Map<TreeNode, Integer> gain = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = Integer.MIN_VALUE;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = Math.max(0, gain.getOrDefault(node.left, 0));\n      int right = Math.max(0, gain.getOrDefault(node.right, 0));\n      best = Math.max(best, node.val + left + right);\n      gain.put(node, node.val + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int best = Integer.MIN_VALUE;\n\n  public int maxPathSum(TreeNode root) {\n    gain(root);\n    return best;\n  }\n\n  private int gain(TreeNode node) {\n    if (node == null) return 0;\n    int left = Math.max(0, gain(node.left));\n    int right = Math.max(0, gain(node.right));\n    best = Math.max(best, node.val + left + right);\n    return node.val + Math.max(left, right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    Map<TreeNode, Integer> gain = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = Integer.MIN_VALUE;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = Math.max(0, gain.getOrDefault(node.left, 0));\n      int right = Math.max(0, gain.getOrDefault(node.right, 0));\n      best = Math.max(best, node.val + left + right);\n      gain.put(node, node.val + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    Map<TreeNode, Integer> gain = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = Integer.MIN_VALUE;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = Math.max(0, gain.getOrDefault(node.left, 0));\n      int right = Math.max(0, gain.getOrDefault(node.right, 0));\n      best = Math.max(best, node.val + left + right);\n      gain.put(node, node.val + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Path Sum",
      "difficulty": "Easy",
      "subpattern": "Root-to-leaf path recursion",
      "question": "Given a binary tree root and an integer targetSum, return true if the tree has a root-to-leaf path whose node values sum to targetSum.",
      "trigger": "A valid path must move from root to leaf, and each recursive step reduces the remaining target by the current node value.",
      "intuition": "At a leaf, check whether remaining target equals the leaf value. Otherwise continue into children with the reduced target.",
      "edgeCases": "Empty tree, one node, negative values, target zero, path must end at a leaf.",
      "constraints": "0 <= number of nodes <= 5000; -1000 <= Node.val <= 1000; -1000 <= targetSum <= 1000.",
      "source": {
        "label": "Path Sum - LeetCode 112",
        "url": "https://leetcode.com/problems/path-sum/"
      },
      "examples": [
        {
          "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
          "output": "true",
          "explanation": "The path 5->4->11->2 sums to 22."
        },
        {
          "input": "root = [1,2,3], targetSum = 5",
          "output": "false",
          "explanation": "No root-to-leaf path sums to 5."
        },
        {
          "input": "root = [], targetSum = 0",
          "output": "false",
          "explanation": "An empty tree has no path."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Collect all root-to-leaf sums, then scan them.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative DFS stores nodes with running sums.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS subtracts current values from target.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    List<Integer> sums = new ArrayList<>();\n    collect(root, 0, sums);\n    for (int sum : sums) {\n      if (sum == targetSum) return true;\n    }\n    return false;\n  }\n\n  private void collect(TreeNode node, int sum, List<Integer> sums) {\n    if (node == null) return;\n    int next = sum + node.val;\n    if (node.left == null && node.right == null) sums.add(next);\n    collect(node.left, next, sums);\n    collect(node.right, next, sums);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> sums = new ArrayDeque<>();\n    nodes.push(root);\n    sums.push(root.val);\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int sum = sums.pop();\n      if (node.left == null && node.right == null && sum == targetSum) return true;\n      if (node.right != null) { nodes.push(node.right); sums.push(sum + node.right.val); }\n      if (node.left != null) { nodes.push(node.left); sums.push(sum + node.left.val); }\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    if (root.left == null && root.right == null) return root.val == targetSum;\n    return hasPathSum(root.left, targetSum - root.val)\n        || hasPathSum(root.right, targetSum - root.val);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> sums = new ArrayDeque<>();\n    nodes.push(root);\n    sums.push(root.val);\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int sum = sums.pop();\n      if (node.left == null && node.right == null && sum == targetSum) return true;\n      if (node.right != null) { nodes.push(node.right); sums.push(sum + node.right.val); }\n      if (node.left != null) { nodes.push(node.left); sums.push(sum + node.left.val); }\n    }\n\n    return false;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> sums = new ArrayDeque<>();\n    nodes.push(root);\n    sums.push(root.val);\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int sum = sums.pop();\n      if (node.left == null && node.right == null && sum == targetSum) return true;\n      if (node.right != null) { nodes.push(node.right); sums.push(sum + node.right.val); }\n      if (node.left != null) { nodes.push(node.left); sums.push(sum + node.left.val); }\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Path Sum II",
      "difficulty": "Medium",
      "subpattern": "Root-to-leaf path backtracking",
      "question": "Given a binary tree root and targetSum, return all root-to-leaf paths where the sum of node values equals targetSum.",
      "trigger": "The answer requires full root-to-leaf paths, so traversal must maintain and restore the current path.",
      "intuition": "Append the current node, recurse into children with reduced target, and remove the node when returning.",
      "edgeCases": "Empty tree, one valid path, no valid path, negative values, copying the path only at leaf success.",
      "constraints": "0 <= number of nodes <= 5000; -1000 <= Node.val <= 1000; -1000 <= targetSum <= 1000.",
      "source": {
        "label": "Path Sum II - LeetCode 113",
        "url": "https://leetcode.com/problems/path-sum-ii/"
      },
      "examples": [
        {
          "input": "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22",
          "output": "[[5,4,11,2],[5,8,4,5]]",
          "explanation": "Two root-to-leaf paths sum to 22."
        },
        {
          "input": "root = [1,2,3], targetSum = 5",
          "output": "[]",
          "explanation": "No leaf path has sum 5."
        },
        {
          "input": "root = [1,2], targetSum = 3",
          "output": "[[1,2]]",
          "explanation": "The only leaf path sums to 3."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(n*h). Collect all root-to-leaf paths and filter by sum.",
      "optimizedComplexity": "Time O(n*h); Space O(n*h). Iterative DFS stores copied paths on the stack.",
      "recursiveComplexity": "Time O(n*h); Space O(h). Backtracking reuses one path list excluding output.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n    List<List<Integer>> allPaths = new ArrayList<>();\n    collect(root, new ArrayList<>(), allPaths);\n    List<List<Integer>> answer = new ArrayList<>();\n    for (List<Integer> path : allPaths) {\n      int sum = 0;\n      for (int value : path) sum += value;\n      if (sum == targetSum) answer.add(path);\n    }\n    return answer;\n  }\n\n  private void collect(TreeNode node, List<Integer> path, List<List<Integer>> allPaths) {\n    if (node == null) return;\n    List<Integer> next = new ArrayList<>(path);\n    next.add(node.val);\n    if (node.left == null && node.right == null) allPaths.add(next);\n    collect(node.left, next, allPaths);\n    collect(node.right, next, allPaths);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, root.val, new ArrayList<>(Arrays.asList(root.val))));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      TreeNode node = state.node;\n      if (node.left == null && node.right == null && state.sum == targetSum) answer.add(state.path);\n      if (node.right != null) stack.push(next(state, node.right));\n      if (node.left != null) stack.push(next(state, node.left));\n    }\n    return answer;\n  }\n\n  private State next(State state, TreeNode child) {\n    List<Integer> path = new ArrayList<>(state.path);\n    path.add(child.val);\n    return new State(child, state.sum + child.val, path);\n  }\n\n  private static class State {\n    TreeNode node; int sum; List<Integer> path;\n    State(TreeNode node, int sum, List<Integer> path) { this.node = node; this.sum = sum; this.path = path; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n    List<List<Integer>> answer = new ArrayList<>();\n    dfs(root, targetSum, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int remaining, List<Integer> path, List<List<Integer>> answer) {\n    if (node == null) return;\n    path.add(node.val);\n    if (node.left == null && node.right == null && node.val == remaining) {\n      answer.add(new ArrayList<>(path));\n    } else {\n      dfs(node.left, remaining - node.val, path, answer);\n      dfs(node.right, remaining - node.val, path, answer);\n    }\n    path.remove(path.size() - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, root.val, new ArrayList<>(Arrays.asList(root.val))));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      TreeNode node = state.node;\n      if (node.left == null && node.right == null && state.sum == targetSum) answer.add(state.path);\n      if (node.right != null) stack.push(next(state, node.right));\n      if (node.left != null) stack.push(next(state, node.left));\n    }\n    return answer;\n  }\n\n  private State next(State state, TreeNode child) {\n    List<Integer> path = new ArrayList<>(state.path);\n    path.add(child.val);\n    return new State(child, state.sum + child.val, path);\n  }\n\n  private static class State {\n    TreeNode node; int sum; List<Integer> path;\n    State(TreeNode node, int sum, List<Integer> path) { this.node = node; this.sum = sum; this.path = path; }\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, root.val, new ArrayList<>(Arrays.asList(root.val))));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      TreeNode node = state.node;\n      if (node.left == null && node.right == null && state.sum == targetSum) answer.add(state.path);\n      if (node.right != null) stack.push(next(state, node.right));\n      if (node.left != null) stack.push(next(state, node.left));\n    }\n    return answer;\n  }\n\n  private State next(State state, TreeNode child) {\n    List<Integer> path = new ArrayList<>(state.path);\n    path.add(child.val);\n    return new State(child, state.sum + child.val, path);\n  }\n\n  private static class State {\n    TreeNode node; int sum; List<Integer> path;\n    State(TreeNode node, int sum, List<Integer> path) { this.node = node; this.sum = sum; this.path = path; }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sum Root to Leaf Numbers",
      "difficulty": "Medium",
      "subpattern": "Root-to-leaf numeric accumulation",
      "question": "Given a binary tree containing digits 0 through 9, each root-to-leaf path represents a number. Return the total sum of all root-to-leaf numbers.",
      "trigger": "Each node extends the current path number by one digit, and only leaves contribute final numbers.",
      "intuition": "Carry current = current * 10 + node.val while descending. At a leaf, add current to the answer.",
      "edgeCases": "Single node, zero values, skewed tree, multiple leaves, integer range for accumulated numbers.",
      "constraints": "1 <= number of nodes <= 1000; 0 <= Node.val <= 9; depth <= 10 in original constraints.",
      "source": {
        "label": "Sum Root to Leaf Numbers - LeetCode 129",
        "url": "https://leetcode.com/problems/sum-root-to-leaf-numbers/"
      },
      "examples": [
        {
          "input": "root = [1,2,3]",
          "output": "25",
          "explanation": "Paths 12 and 13 sum to 25."
        },
        {
          "input": "root = [4,9,0,5,1]",
          "output": "1026",
          "explanation": "Paths 495, 491, and 40 sum to 1026."
        },
        {
          "input": "root = [0]",
          "output": "0",
          "explanation": "The only path number is 0."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(n*h). Store every path as digits, then convert paths to numbers.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative DFS carries the numeric prefix.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS accumulates prefix values.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int sumNumbers(TreeNode root) {\n    List<List<Integer>> paths = new ArrayList<>();\n    collect(root, new ArrayList<>(), paths);\n    int sum = 0;\n    for (List<Integer> path : paths) {\n      int value = 0;\n      for (int digit : path) value = value * 10 + digit;\n      sum += value;\n    }\n    return sum;\n  }\n\n  private void collect(TreeNode node, List<Integer> path, List<List<Integer>> paths) {\n    if (node == null) return;\n    List<Integer> next = new ArrayList<>(path);\n    next.add(node.val);\n    if (node.left == null && node.right == null) paths.add(next);\n    collect(node.left, next, paths);\n    collect(node.right, next, paths);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int sumNumbers(TreeNode root) {\n    if (root == null) return 0;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> values = new ArrayDeque<>();\n    nodes.push(root);\n    values.push(root.val);\n    int sum = 0;\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int value = values.pop();\n      if (node.left == null && node.right == null) sum += value;\n      if (node.right != null) { nodes.push(node.right); values.push(value * 10 + node.right.val); }\n      if (node.left != null) { nodes.push(node.left); values.push(value * 10 + node.left.val); }\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int sumNumbers(TreeNode root) {\n    return dfs(root, 0);\n  }\n\n  private int dfs(TreeNode node, int current) {\n    if (node == null) return 0;\n    int next = current * 10 + node.val;\n    if (node.left == null && node.right == null) return next;\n    return dfs(node.left, next) + dfs(node.right, next);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int sumNumbers(TreeNode root) {\n    if (root == null) return 0;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> values = new ArrayDeque<>();\n    nodes.push(root);\n    values.push(root.val);\n    int sum = 0;\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int value = values.pop();\n      if (node.left == null && node.right == null) sum += value;\n      if (node.right != null) { nodes.push(node.right); values.push(value * 10 + node.right.val); }\n      if (node.left != null) { nodes.push(node.left); values.push(value * 10 + node.left.val); }\n    }\n    return sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int sumNumbers(TreeNode root) {\n    if (root == null) return 0;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> values = new ArrayDeque<>();\n    nodes.push(root);\n    values.push(root.val);\n    int sum = 0;\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int value = values.pop();\n      if (node.left == null && node.right == null) sum += value;\n      if (node.right != null) { nodes.push(node.right); values.push(value * 10 + node.right.val); }\n      if (node.left != null) { nodes.push(node.left); values.push(value * 10 + node.left.val); }\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Count Good Nodes in Binary Tree",
      "difficulty": "Medium",
      "subpattern": "Tree DFS with ancestor maximum state",
      "question": "Given a binary tree root, a node is good if no node on the path from root to that node has a value greater than it. Return the number of good nodes.",
      "trigger": "Goodness depends on the maximum value seen along the current root-to-node path.",
      "intuition": "Carry pathMax while traversing. A node is good when node.val >= pathMax, then update pathMax for children.",
      "edgeCases": "Root is always good, negative values, all decreasing, all increasing, duplicate equal-to-max values.",
      "constraints": "1 <= number of nodes <= 100000; -10000 <= Node.val <= 10000.",
      "source": {
        "label": "Count Good Nodes in Binary Tree - LeetCode 1448",
        "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,1,4,3,null,1,5]",
          "output": "4",
          "explanation": "Nodes 3, 3, 4, and 5 are good."
        },
        {
          "input": "root = [3,3,null,4,2]",
          "output": "3",
          "explanation": "Equal values count as good when not less than path max."
        },
        {
          "input": "root = [1]",
          "output": "1",
          "explanation": "The root is always good."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(h). For each node, scan its ancestor path maximum.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative DFS carries path maximum per stack item.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS passes path maximum down.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int goodNodes(TreeNode root) {\n    return count(root, root);\n  }\n\n  private int count(TreeNode node, TreeNode root) {\n    if (node == null) return 0;\n    int good = maxOnPath(root, node, Integer.MIN_VALUE) <= node.val ? 1 : 0;\n    return good + count(node.left, root) + count(node.right, root);\n  }\n\n  private int maxOnPath(TreeNode current, TreeNode target, int max) {\n    if (current == null) return Integer.MAX_VALUE;\n    max = Math.max(max, current.val);\n    if (current == target) return max;\n    int left = maxOnPath(current.left, target, max);\n    if (left != Integer.MAX_VALUE) return left;\n    return maxOnPath(current.right, target, max);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int goodNodes(TreeNode root) {\n    int count = 0;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, Integer.MIN_VALUE));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.node == null) continue;\n      if (state.node.val >= state.maxSoFar) count++;\n      int nextMax = Math.max(state.maxSoFar, state.node.val);\n      stack.push(new State(state.node.right, nextMax));\n      stack.push(new State(state.node.left, nextMax));\n    }\n    return count;\n  }\n\n  private static class State {\n    TreeNode node; int maxSoFar;\n    State(TreeNode node, int maxSoFar) { this.node = node; this.maxSoFar = maxSoFar; }\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int goodNodes(TreeNode root) {\n    return dfs(root, Integer.MIN_VALUE);\n  }\n\n  private int dfs(TreeNode node, int maxSoFar) {\n    if (node == null) return 0;\n    int good = node.val >= maxSoFar ? 1 : 0;\n    int nextMax = Math.max(maxSoFar, node.val);\n    return good + dfs(node.left, nextMax) + dfs(node.right, nextMax);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int goodNodes(TreeNode root) {\n    int count = 0;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, Integer.MIN_VALUE));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.node == null) continue;\n      if (state.node.val >= state.maxSoFar) count++;\n      int nextMax = Math.max(state.maxSoFar, state.node.val);\n      stack.push(new State(state.node.right, nextMax));\n      stack.push(new State(state.node.left, nextMax));\n    }\n    return count;\n  }\n\n  private static class State {\n    TreeNode node; int maxSoFar;\n    State(TreeNode node, int maxSoFar) { this.node = node; this.maxSoFar = maxSoFar; }\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int goodNodes(TreeNode root) {\n    int count = 0;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, Integer.MIN_VALUE));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.node == null) continue;\n      if (state.node.val >= state.maxSoFar) count++;\n      int nextMax = Math.max(state.maxSoFar, state.node.val);\n      stack.push(new State(state.node.right, nextMax));\n      stack.push(new State(state.node.left, nextMax));\n    }\n    return count;\n  }\n\n  private static class State {\n    TreeNode node; int maxSoFar;\n    State(TreeNode node, int maxSoFar) { this.node = node; this.maxSoFar = maxSoFar; }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Validate Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST inorder and bounds traversal",
      "question": "Given the root of a binary tree, return true if it is a valid binary search tree with strict ordering.",
      "trigger": "Each node must satisfy bounds created by all ancestors, not only its direct parent.",
      "intuition": "Pass low/high bounds down recursion, or verify that inorder traversal is strictly increasing.",
      "edgeCases": "Duplicate values, Integer.MIN_VALUE, Integer.MAX_VALUE, invalid descendant far below root, empty tree.",
      "constraints": "1 <= number of nodes <= 10000; -2147483648 <= Node.val <= 2147483647.",
      "source": {
        "label": "Validate Binary Search Tree - LeetCode 98",
        "url": "https://leetcode.com/problems/validate-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [2,1,3]",
          "output": "true",
          "explanation": "The tree satisfies strict BST order."
        },
        {
          "input": "root = [5,1,4,null,null,3,6]",
          "output": "false",
          "explanation": "3 is in the right subtree of 5 but less than 5."
        },
        {
          "input": "root = [2,2,2]",
          "output": "false",
          "explanation": "Duplicates are not allowed."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store inorder traversal and check strict increase.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder stops at first violation.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive bounds validate each node once.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    inorder(root, values);\n    for (int i = 1; i < values.size(); i++) {\n      if (values.get(i) <= values.get(i - 1)) return false;\n    }\n    return true;\n  }\n\n  private void inorder(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    inorder(node.left, values);\n    values.add(node.val);\n    inorder(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);\n  }\n\n  private boolean valid(TreeNode node, long low, long high) {\n    if (node == null) return true;\n    if (node.val <= low || node.val >= high) return false;\n    return valid(node.left, low, node.val) && valid(node.right, node.val, high);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Kth Smallest Element in a BST",
      "difficulty": "Medium",
      "subpattern": "BST inorder traversal",
      "question": "Given the root of a BST and an integer k, return the kth smallest value among all node values.",
      "trigger": "Inorder traversal of a BST visits values in ascending order, so the kth visited node is the answer.",
      "intuition": "Traverse left, node, right. Stop as soon as k nodes have been visited.",
      "edgeCases": "k = 1, k = number of nodes, skewed BST, one node, duplicate-free BST assumption.",
      "constraints": "1 <= k <= number of nodes <= 10000; 0 <= Node.val <= 10000.",
      "source": {
        "label": "Kth Smallest Element in a BST - LeetCode 230",
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
      },
      "examples": [
        {
          "input": "root = [3,1,4,null,2], k = 1",
          "output": "1",
          "explanation": "The smallest value is 1."
        },
        {
          "input": "root = [5,3,6,2,4,null,null,1], k = 3",
          "output": "3",
          "explanation": "The sorted order is [1,2,3,4,5,6]."
        },
        {
          "input": "root = [1], k = 1",
          "output": "1",
          "explanation": "The only node is kth smallest."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Collect all values, sort, and index k - 1.",
      "optimizedComplexity": "Time O(h + k); Space O(h). Iterative inorder stops after k pops.",
      "recursiveComplexity": "Time O(h + k); Space O(h). Recursive inorder stops once kth value is found.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    Collections.sort(values);\n    return values.get(k - 1);\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.left, values);\n    collect(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int remaining;\n  private int answer;\n\n  public int kthSmallest(TreeNode root, int k) {\n    remaining = k;\n    inorder(root);\n    return answer;\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null || remaining == 0) return;\n    inorder(node.left);\n    if (--remaining == 0) {\n      answer = node.val;\n      return;\n    }\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Construct Binary Tree from Preorder and Inorder Traversal",
      "difficulty": "Medium",
      "subpattern": "Tree construction from traversals",
      "question": "Given preorder and inorder traversal arrays of a binary tree with unique values, construct and return the binary tree.",
      "trigger": "Preorder gives the current root, and inorder splits that root’s left and right subtree ranges.",
      "intuition": "Use a preorder index for roots and an inorder value-to-index map for O(1) splits.",
      "edgeCases": "One node, skewed tree, balanced tree, empty recursive range, unique values required.",
      "constraints": "1 <= preorder.length <= 3000; inorder.length == preorder.length; values are unique and traversals are valid.",
      "source": {
        "label": "Construct Binary Tree from Preorder and Inorder Traversal - LeetCode 105",
        "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
      },
      "examples": [
        {
          "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
          "output": "[3,9,20,null,null,15,7]",
          "explanation": "3 is root, then inorder splits left and right subtrees."
        },
        {
          "input": "preorder = [-1], inorder = [-1]",
          "output": "[-1]",
          "explanation": "One node is constructed."
        },
        {
          "input": "preorder = [1,2], inorder = [2,1]",
          "output": "[1,2]",
          "explanation": "2 is the left child of 1."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(h). Each call linearly searches inorder for the root.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative stack reconstructs links from traversal order.",
      "recursiveComplexity": "Time O(n); Space O(n). Hash map enables O(1) root splits.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int preIndex = 0;\n\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    return build(preorder, inorder, 0, inorder.length - 1);\n  }\n\n  private TreeNode build(int[] preorder, int[] inorder, int left, int right) {\n    if (left > right) return null;\n    int value = preorder[preIndex++];\n    TreeNode root = new TreeNode(value);\n    int split = left;\n    while (inorder[split] != value) split++;\n    root.left = build(preorder, inorder, left, split - 1);\n    root.right = build(preorder, inorder, split + 1, right);\n    return root;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    int inorderIndex = 0;\n\n    for (int i = 1; i < preorder.length; i++) {\n      int value = preorder[i];\n      TreeNode node = stack.peek();\n      if (node.val != inorder[inorderIndex]) {\n        node.left = new TreeNode(value);\n        stack.push(node.left);\n      } else {\n        while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {\n          node = stack.pop();\n          inorderIndex++;\n        }\n        node.right = new TreeNode(value);\n        stack.push(node.right);\n      }\n    }\n    return root;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int preIndex = 0;\n  private Map<Integer, Integer> inorderIndex = new HashMap<>();\n\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    for (int i = 0; i < inorder.length; i++) inorderIndex.put(inorder[i], i);\n    return build(preorder, 0, inorder.length - 1);\n  }\n\n  private TreeNode build(int[] preorder, int left, int right) {\n    if (left > right) return null;\n    int value = preorder[preIndex++];\n    TreeNode root = new TreeNode(value);\n    int split = inorderIndex.get(value);\n    root.left = build(preorder, left, split - 1);\n    root.right = build(preorder, split + 1, right);\n    return root;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    int inorderIndex = 0;\n\n    for (int i = 1; i < preorder.length; i++) {\n      int value = preorder[i];\n      TreeNode node = stack.peek();\n      if (node.val != inorder[inorderIndex]) {\n        node.left = new TreeNode(value);\n        stack.push(node.left);\n      } else {\n        while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {\n          node = stack.pop();\n          inorderIndex++;\n        }\n        node.right = new TreeNode(value);\n        stack.push(node.right);\n      }\n    }\n    return root;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    int inorderIndex = 0;\n\n    for (int i = 1; i < preorder.length; i++) {\n      int value = preorder[i];\n      TreeNode node = stack.peek();\n      if (node.val != inorder[inorderIndex]) {\n        node.left = new TreeNode(value);\n        stack.push(node.left);\n      } else {\n        while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {\n          node = stack.pop();\n          inorderIndex++;\n        }\n        node.right = new TreeNode(value);\n        stack.push(node.right);\n      }\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Serialize and Deserialize Binary Tree",
      "difficulty": "Hard",
      "subpattern": "Tree serialization with null markers",
      "question": "Design an algorithm to serialize and deserialize a binary tree. Serialization converts a tree to a string; deserialization rebuilds the same structure.",
      "trigger": "A binary tree cannot be reconstructed from values alone; null child markers must be preserved in traversal order.",
      "intuition": "Preorder with # null markers is self-delimiting: root, left subtree, right subtree. Deserialize by consuming tokens in the same order.",
      "edgeCases": "Empty tree, one node, negative values, repeated values, skewed tree, trailing delimiters.",
      "constraints": "0 <= number of nodes <= 10000; -1000 <= Node.val <= 1000.",
      "source": {
        "label": "Serialize and Deserialize Binary Tree - LeetCode 297",
        "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,null,null,4,5]",
          "output": "deserialize(serialize(root)) returns same tree",
          "explanation": "Null markers preserve child positions."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "The empty tree serializes to a null marker."
        },
        {
          "input": "root = [1]",
          "output": "[1]",
          "explanation": "A single value with two null children is reconstructed."
        }
      ],
      "bruteForceComplexity": "Serialize Time O(n), Space O(n); Deserialize Time O(n^2) if tokens are removed from the front of a list.",
      "optimizedComplexity": "Serialize Time O(n), Deserialize Time O(n); Space O(n). Iterative level order uses a queue.",
      "recursiveComplexity": "Serialize Time O(n), Deserialize Time O(n); Space O(h) stack plus O(n) tokens.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    if (root == null) return \"#,\";\n    return root.val + \",\" + serialize(root.left) + serialize(root.right);\n  }\n\n  public TreeNode deserialize(String data) {\n    List<String> tokens = new ArrayList<>(Arrays.asList(data.split(\",\")));\n    return build(tokens);\n  }\n\n  private TreeNode build(List<String> tokens) {\n    String token = tokens.remove(0);\n    if (token.equals(\"#\")) return null;\n    TreeNode node = new TreeNode(Integer.parseInt(token));\n    node.left = build(tokens);\n    node.right = build(tokens);\n    return node;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    if (root == null) return \"#\";\n    StringBuilder sb = new StringBuilder();\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      if (node == null) { sb.append(\"#,\"); continue; }\n      sb.append(node.val).append(',');\n      queue.offer(node.left);\n      queue.offer(node.right);\n    }\n    return sb.toString();\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.equals(\"#\")) return null;\n    String[] tokens = data.split(\",\");\n    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int index = 1;\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      if (!tokens[index].equals(\"#\")) { node.left = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.left); }\n      index++;\n      if (!tokens[index].equals(\"#\")) { node.right = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.right); }\n      index++;\n    }\n    return root;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder sb = new StringBuilder();\n    write(root, sb);\n    return sb.toString();\n  }\n\n  private void write(TreeNode node, StringBuilder sb) {\n    if (node == null) { sb.append(\"#,\"); return; }\n    sb.append(node.val).append(',');\n    write(node.left, sb);\n    write(node.right, sb);\n  }\n\n  public TreeNode deserialize(String data) {\n    Queue<String> tokens = new ArrayDeque<>(Arrays.asList(data.split(\",\")));\n    return read(tokens);\n  }\n\n  private TreeNode read(Queue<String> tokens) {\n    String token = tokens.poll();\n    if (token.equals(\"#\")) return null;\n    TreeNode node = new TreeNode(Integer.parseInt(token));\n    node.left = read(tokens);\n    node.right = read(tokens);\n    return node;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    if (root == null) return \"#\";\n    StringBuilder sb = new StringBuilder();\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      if (node == null) { sb.append(\"#,\"); continue; }\n      sb.append(node.val).append(',');\n      queue.offer(node.left);\n      queue.offer(node.right);\n    }\n    return sb.toString();\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.equals(\"#\")) return null;\n    String[] tokens = data.split(\",\");\n    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int index = 1;\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      if (!tokens[index].equals(\"#\")) { node.left = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.left); }\n      index++;\n      if (!tokens[index].equals(\"#\")) { node.right = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.right); }\n      index++;\n    }\n    return root;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    if (root == null) return \"#\";\n    StringBuilder sb = new StringBuilder();\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      if (node == null) { sb.append(\"#,\"); continue; }\n      sb.append(node.val).append(',');\n      queue.offer(node.left);\n      queue.offer(node.right);\n    }\n    return sb.toString();\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.equals(\"#\")) return null;\n    String[] tokens = data.split(\",\");\n    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int index = 1;\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      if (!tokens[index].equals(\"#\")) { node.left = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.left); }\n      index++;\n      if (!tokens[index].equals(\"#\")) { node.right = new TreeNode(Integer.parseInt(tokens[index])); queue.offer(node.right); }\n      index++;\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Flatten Binary Tree to Linked List",
      "difficulty": "Medium",
      "subpattern": "In-place tree pointer rewiring",
      "question": "Given the root of a binary tree, flatten it into a linked list in-place using the same TreeNode class. The flattened order should follow preorder traversal using right pointers only.",
      "trigger": "The target order is preorder, so each node’s left subtree must be inserted between the node and its original right subtree.",
      "intuition": "Either collect preorder nodes then relink, or recursively flatten left/right and splice the left tail before the original right subtree.",
      "edgeCases": "Empty tree, one node, only left subtree, only right subtree, setting every left pointer to null.",
      "constraints": "0 <= number of nodes <= 2000; -100 <= Node.val <= 100.",
      "source": {
        "label": "Flatten Binary Tree to Linked List - LeetCode 114",
        "url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/"
      },
      "examples": [
        {
          "input": "root = [1,2,5,3,4,null,6]",
          "output": "[1,null,2,null,3,null,4,null,5,null,6]",
          "explanation": "The right chain follows preorder."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "Nothing changes."
        },
        {
          "input": "root = [0]",
          "output": "[0]",
          "explanation": "A single node is already flat."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store preorder nodes then relink them.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative Morris-style rewiring finds the rightmost predecessor of each left subtree.",
      "recursiveComplexity": "Time O(n); Space O(h). Reverse preorder recursion links nodes with a previous pointer.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void flatten(TreeNode root) {\n    List<TreeNode> nodes = new ArrayList<>();\n    preorder(root, nodes);\n    for (int i = 0; i < nodes.size(); i++) {\n      nodes.get(i).left = null;\n      nodes.get(i).right = i + 1 < nodes.size() ? nodes.get(i + 1) : null;\n    }\n  }\n\n  private void preorder(TreeNode node, List<TreeNode> nodes) {\n    if (node == null) return;\n    nodes.add(node);\n    preorder(node.left, nodes);\n    preorder(node.right, nodes);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void flatten(TreeNode root) {\n    TreeNode current = root;\n    while (current != null) {\n      if (current.left != null) {\n        TreeNode predecessor = current.left;\n        while (predecessor.right != null) predecessor = predecessor.right;\n        predecessor.right = current.right;\n        current.right = current.left;\n        current.left = null;\n      }\n      current = current.right;\n    }\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private TreeNode previous = null;\n\n  public void flatten(TreeNode root) {\n    if (root == null) return;\n    flatten(root.right);\n    flatten(root.left);\n    root.right = previous;\n    root.left = null;\n    previous = root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void flatten(TreeNode root) {\n    TreeNode current = root;\n    while (current != null) {\n      if (current.left != null) {\n        TreeNode predecessor = current.left;\n        while (predecessor.right != null) predecessor = predecessor.right;\n        predecessor.right = current.right;\n        current.right = current.left;\n        current.left = null;\n      }\n      current = current.right;\n    }\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void flatten(TreeNode root) {\n    TreeNode current = root;\n    while (current != null) {\n      if (current.left != null) {\n        TreeNode predecessor = current.left;\n        while (predecessor.right != null) predecessor = predecessor.right;\n        predecessor.right = current.right;\n        current.right = current.left;\n        current.left = null;\n      }\n      current = current.right;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Binary Tree Zigzag Level Order Traversal",
      "difficulty": "Medium",
      "subpattern": "Tree BFS level traversal with alternating direction",
      "question": "Given the root of a binary tree, return the zigzag level order traversal of its node values, alternating left-to-right and right-to-left each level.",
      "trigger": "The output is still level-based, but insertion direction alternates by depth.",
      "intuition": "BFS level by level. Use a deque for level values and add to back or front depending on direction.",
      "edgeCases": "Empty tree, one node, incomplete levels, skewed tree, direction toggle after every level.",
      "constraints": "0 <= number of nodes <= 2000; -100 <= Node.val <= 100.",
      "source": {
        "label": "Binary Tree Zigzag Level Order Traversal - LeetCode 103",
        "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "[[3],[20,9],[15,7]]",
          "explanation": "The second level is reversed."
        },
        {
          "input": "root = [1]",
          "output": "[[1]]",
          "explanation": "One level has no direction change effect."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "No levels exist."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Run normal level order, then reverse every odd level.",
      "optimizedComplexity": "Time O(n); Space O(w). BFS uses deque insertion to avoid post-reversal.",
      "recursiveComplexity": "Time O(n); Space O(h). DFS appends values into depth lists with direction-aware insertion.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> levels = new ArrayList<>();\n    collect(root, 0, levels);\n    for (int i = 1; i < levels.size(); i += 2) Collections.reverse(levels.get(i));\n    return levels;\n  }\n\n  private void collect(TreeNode node, int depth, List<List<Integer>> levels) {\n    if (node == null) return;\n    if (depth == levels.size()) levels.add(new ArrayList<>());\n    levels.get(depth).add(node.val);\n    collect(node.left, depth + 1, levels);\n    collect(node.right, depth + 1, levels);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    boolean leftToRight = true;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      Deque<Integer> level = new ArrayDeque<>();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (leftToRight) level.addLast(node.val); else level.addFirst(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(new ArrayList<>(level));\n      leftToRight = !leftToRight;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<LinkedList<Integer>> levels = new ArrayList<>();\n    dfs(root, 0, levels);\n    return new ArrayList<>(levels);\n  }\n\n  private void dfs(TreeNode node, int depth, List<LinkedList<Integer>> levels) {\n    if (node == null) return;\n    if (depth == levels.size()) levels.add(new LinkedList<>());\n    if (depth % 2 == 0) levels.get(depth).addLast(node.val);\n    else levels.get(depth).addFirst(node.val);\n    dfs(node.left, depth + 1, levels);\n    dfs(node.right, depth + 1, levels);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    boolean leftToRight = true;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      Deque<Integer> level = new ArrayDeque<>();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (leftToRight) level.addLast(node.val); else level.addFirst(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(new ArrayList<>(level));\n      leftToRight = !leftToRight;\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (root == null) return answer;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    boolean leftToRight = true;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      Deque<Integer> level = new ArrayDeque<>();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (leftToRight) level.addLast(node.val); else level.addFirst(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(new ArrayList<>(level));\n      leftToRight = !leftToRight;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Populating Next Right Pointers in Each Node",
      "difficulty": "Medium",
      "subpattern": "Level traversal pointer linking",
      "question": "Given a perfect binary tree, populate each next pointer to point to its next right node. If there is no next right node, next should be null.",
      "trigger": "Nodes must be connected horizontally level by level, and a perfect tree lets each parent connect children and cross-parent neighbors.",
      "intuition": "BFS can connect neighbors in each level. In a perfect tree, use existing next pointers to connect children in O(1) extra space.",
      "edgeCases": "Empty tree, one node, final node on each level points to null, perfect tree assumption, preserving child pointers.",
      "constraints": "0 <= number of nodes <= 4096; the tree is perfect; -1000 <= Node.val <= 1000.",
      "source": {
        "label": "Populating Next Right Pointers in Each Node - LeetCode 116",
        "url": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,4,5,6,7]",
          "output": "[1,#,2,3,#,4,5,6,7,#]",
          "explanation": "Each level is connected left to right."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "Nothing is connected."
        },
        {
          "input": "root = [1]",
          "output": "[1,#]",
          "explanation": "The root has no next node."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(w). BFS stores each level and links adjacent nodes.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative perfect-tree traversal uses next pointers already built above.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursion connects children and cross-parent neighbors.",
      "bruteForceCode": "import java.util.*;\n\nclass Node {\n  public int val;\n  public Node left;\n  public Node right;\n  public Node next;\n\n  public Node() {}\n  public Node(int val) { this.val = val; }\n  public Node(int val, Node left, Node right, Node next) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public Node connect(Node root) {\n    if (root == null) return null;\n    Queue<Node> queue = new ArrayDeque<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      Node previous = null;\n      for (int i = 0; i < size; i++) {\n        Node node = queue.poll();\n        if (previous != null) previous.next = node;\n        previous = node;\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n    return root;\n  }\n}",
      "iterativeCode": "class Node {\n  public int val;\n  public Node left;\n  public Node right;\n  public Node next;\n\n  public Node() {}\n  public Node(int val) { this.val = val; }\n  public Node(int val, Node left, Node right, Node next) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public Node connect(Node root) {\n    if (root == null) return null;\n    Node levelStart = root;\n    while (levelStart.left != null) {\n      Node current = levelStart;\n      while (current != null) {\n        current.left.next = current.right;\n        if (current.next != null) current.right.next = current.next.left;\n        current = current.next;\n      }\n      levelStart = levelStart.left;\n    }\n    return root;\n  }\n}",
      "recursiveCode": "class Node {\n  public int val;\n  public Node left;\n  public Node right;\n  public Node next;\n\n  public Node() {}\n  public Node(int val) { this.val = val; }\n  public Node(int val, Node left, Node right, Node next) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public Node connect(Node root) {\n    if (root == null || root.left == null) return root;\n    root.left.next = root.right;\n    if (root.next != null) root.right.next = root.next.left;\n    connect(root.left);\n    connect(root.right);\n    return root;\n  }\n}",
      "optimizedCode": "class Node {\n  public int val;\n  public Node left;\n  public Node right;\n  public Node next;\n\n  public Node() {}\n  public Node(int val) { this.val = val; }\n  public Node(int val, Node left, Node right, Node next) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public Node connect(Node root) {\n    if (root == null) return null;\n    Node levelStart = root;\n    while (levelStart.left != null) {\n      Node current = levelStart;\n      while (current != null) {\n        current.left.next = current.right;\n        if (current.next != null) current.right.next = current.next.left;\n        current = current.next;\n      }\n      levelStart = levelStart.left;\n    }\n    return root;\n  }\n}",
      "code": "class Node {\n  public int val;\n  public Node left;\n  public Node right;\n  public Node next;\n\n  public Node() {}\n  public Node(int val) { this.val = val; }\n  public Node(int val, Node left, Node right, Node next) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public Node connect(Node root) {\n    if (root == null) return null;\n    Node levelStart = root;\n    while (levelStart.left != null) {\n      Node current = levelStart;\n      while (current != null) {\n        current.left.next = current.right;\n        if (current.next != null) current.right.next = current.next.left;\n        current = current.next;\n      }\n      levelStart = levelStart.left;\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "House Robber III",
      "difficulty": "Medium",
      "subpattern": "Tree dynamic programming states",
      "question": "Given the root of a binary tree where each node stores money, return the maximum amount you can rob without robbing directly connected nodes.",
      "trigger": "At every node, the choice to rob it prevents robbing its children, so each subtree needs two states.",
      "intuition": "For each node return [skip, take]. take = node.val + skip children; skip = max child states.",
      "edgeCases": "Empty tree, one node, negative not present in original, skewed tree, grandchildren better than children.",
      "constraints": "0 <= number of nodes <= 10000; 0 <= Node.val <= 10000.",
      "source": {
        "label": "House Robber III - LeetCode 337",
        "url": "https://leetcode.com/problems/house-robber-iii/"
      },
      "examples": [
        {
          "input": "root = [3,2,3,null,3,null,1]",
          "output": "7",
          "explanation": "Rob 3, 3, and 1."
        },
        {
          "input": "root = [3,4,5,1,3,null,1]",
          "output": "9",
          "explanation": "Rob 4 and 5."
        },
        {
          "input": "root = []",
          "output": "0",
          "explanation": "No houses means zero money."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(h). Naive recursion branches rob/skip and recomputes subtrees.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes take/skip states once per node.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive tree DP returns two states for each node.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rob(TreeNode root) {\n    if (root == null) return 0;\n    int take = root.val;\n    if (root.left != null) take += rob(root.left.left) + rob(root.left.right);\n    if (root.right != null) take += rob(root.right.left) + rob(root.right.right);\n    int skip = rob(root.left) + rob(root.right);\n    return Math.max(take, skip);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rob(TreeNode root) {\n    Map<TreeNode, int[]> dp = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int[] left = dp.getOrDefault(node.left, new int[2]);\n      int[] right = dp.getOrDefault(node.right, new int[2]);\n      int take = node.val + left[0] + right[0];\n      int skip = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);\n      dp.put(node, new int[] {skip, take});\n      last = stack.pop();\n    }\n    int[] result = dp.getOrDefault(root, new int[2]);\n    return Math.max(result[0], result[1]);\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rob(TreeNode root) {\n    int[] result = dfs(root);\n    return Math.max(result[0], result[1]);\n  }\n\n  private int[] dfs(TreeNode node) {\n    if (node == null) return new int[2];\n    int[] left = dfs(node.left);\n    int[] right = dfs(node.right);\n    int take = node.val + left[0] + right[0];\n    int skip = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);\n    return new int[] {skip, take};\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rob(TreeNode root) {\n    Map<TreeNode, int[]> dp = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int[] left = dp.getOrDefault(node.left, new int[2]);\n      int[] right = dp.getOrDefault(node.right, new int[2]);\n      int take = node.val + left[0] + right[0];\n      int skip = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);\n      dp.put(node, new int[] {skip, take});\n      last = stack.pop();\n    }\n    int[] result = dp.getOrDefault(root, new int[2]);\n    return Math.max(result[0], result[1]);\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rob(TreeNode root) {\n    Map<TreeNode, int[]> dp = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    TreeNode last = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int[] left = dp.getOrDefault(node.left, new int[2]);\n      int[] right = dp.getOrDefault(node.right, new int[2]);\n      int take = node.val + left[0] + right[0];\n      int skip = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);\n      dp.put(node, new int[] {skip, take});\n      last = stack.pop();\n    }\n    int[] result = dp.getOrDefault(root, new int[2]);\n    return Math.max(result[0], result[1]);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find Duplicate Subtrees",
      "difficulty": "Medium",
      "subpattern": "Tree serialization and structural hashing",
      "question": "Given the root of a binary tree, return all duplicate subtrees. Duplicate subtrees have the same structure and node values; return one root for each duplicate group.",
      "trigger": "Subtree equality requires structure and values, so each subtree can be represented by a postorder serialization key.",
      "intuition": "Serialize left subtree, right subtree, and current value. Count each key; when a key is seen the second time, add the current root.",
      "edgeCases": "No duplicates, duplicate leaf values, duplicate structure with different values, repeated duplicates more than twice, null markers.",
      "constraints": "1 <= number of nodes <= 5000; -200 <= Node.val <= 200.",
      "source": {
        "label": "Find Duplicate Subtrees - LeetCode 652",
        "url": "https://leetcode.com/problems/find-duplicate-subtrees/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,4,null,2,4,null,null,4]",
          "output": "[[2,4],[4]]",
          "explanation": "The subtree [2,4] and leaf [4] repeat."
        },
        {
          "input": "root = [2,1,1]",
          "output": "[[1]]",
          "explanation": "The leaf value 1 appears twice."
        },
        {
          "input": "root = [2,2,2,3,null,3,null]",
          "output": "[[2,3],[3]]",
          "explanation": "Both a leaf and a larger subtree duplicate."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Compare every pair of subtree roots structurally.",
      "optimizedComplexity": "Time O(n); Space O(n). Map each unique subtree signature to an integer id.",
      "recursiveComplexity": "Time O(n*h) worst with strings; Space O(n). Postorder serialization counts duplicate keys.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> findDuplicateSubtrees(TreeNode root) {\n    List<TreeNode> nodes = new ArrayList<>();\n    collect(root, nodes);\n    List<TreeNode> answer = new ArrayList<>();\n    Set<TreeNode> added = new HashSet<>();\n    for (int i = 0; i < nodes.size(); i++) {\n      for (int j = i + 1; j < nodes.size(); j++) {\n        if (same(nodes.get(i), nodes.get(j)) && added.add(nodes.get(i))) {\n          answer.add(nodes.get(i));\n          break;\n        }\n      }\n    }\n    return answer;\n  }\n\n  private void collect(TreeNode node, List<TreeNode> nodes) {\n    if (node == null) return;\n    nodes.add(node); collect(node.left, nodes); collect(node.right, nodes);\n  }\n\n  private boolean same(TreeNode a, TreeNode b) {\n    if (a == null || b == null) return a == b;\n    return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> findDuplicateSubtrees(TreeNode root) {\n    Map<String, Integer> ids = new HashMap<>();\n    Map<Integer, Integer> counts = new HashMap<>();\n    Map<TreeNode, Integer> subtreeId = new HashMap<>();\n    List<TreeNode> answer = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int nextId = 1;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      String key = node.val + \",\" + subtreeId.getOrDefault(node.left, 0) + \",\" + subtreeId.getOrDefault(node.right, 0);\n      if (!ids.containsKey(key)) ids.put(key, nextId++);\n      int id = ids.get(key);\n      subtreeId.put(node, id);\n      counts.put(id, counts.getOrDefault(id, 0) + 1);\n      if (counts.get(id) == 2) answer.add(node);\n      last = stack.pop();\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> findDuplicateSubtrees(TreeNode root) {\n    List<TreeNode> answer = new ArrayList<>();\n    serialize(root, new HashMap<>(), answer);\n    return answer;\n  }\n\n  private String serialize(TreeNode node, Map<String, Integer> count, List<TreeNode> answer) {\n    if (node == null) return \"#\";\n    String key = node.val + \",\" + serialize(node.left, count, answer) + \",\" + serialize(node.right, count, answer);\n    int seen = count.getOrDefault(key, 0);\n    if (seen == 1) answer.add(node);\n    count.put(key, seen + 1);\n    return key;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> findDuplicateSubtrees(TreeNode root) {\n    Map<String, Integer> ids = new HashMap<>();\n    Map<Integer, Integer> counts = new HashMap<>();\n    Map<TreeNode, Integer> subtreeId = new HashMap<>();\n    List<TreeNode> answer = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int nextId = 1;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      String key = node.val + \",\" + subtreeId.getOrDefault(node.left, 0) + \",\" + subtreeId.getOrDefault(node.right, 0);\n      if (!ids.containsKey(key)) ids.put(key, nextId++);\n      int id = ids.get(key);\n      subtreeId.put(node, id);\n      counts.put(id, counts.getOrDefault(id, 0) + 1);\n      if (counts.get(id) == 2) answer.add(node);\n      last = stack.pop();\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> findDuplicateSubtrees(TreeNode root) {\n    Map<String, Integer> ids = new HashMap<>();\n    Map<Integer, Integer> counts = new HashMap<>();\n    Map<TreeNode, Integer> subtreeId = new HashMap<>();\n    List<TreeNode> answer = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int nextId = 1;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      String key = node.val + \",\" + subtreeId.getOrDefault(node.left, 0) + \",\" + subtreeId.getOrDefault(node.right, 0);\n      if (!ids.containsKey(key)) ids.put(key, nextId++);\n      int id = ids.get(key);\n      subtreeId.put(node, id);\n      counts.put(id, counts.getOrDefault(id, 0) + 1);\n      if (counts.get(id) == 2) answer.add(node);\n      last = stack.pop();\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "All Nodes Distance K in Binary Tree",
      "difficulty": "Medium",
      "subpattern": "Tree to graph traversal from target",
      "question": "Given a binary tree, a target node, and integer k, return the values of all nodes exactly distance k from the target.",
      "trigger": "Distance can move from child to parent as well as parent to child, so the tree must be traversed like an undirected graph from target.",
      "intuition": "Build parent pointers, then BFS from target across left, right, and parent neighbors until distance k.",
      "edgeCases": "k = 0, target is root, target is leaf, duplicate values but unique nodes, no nodes at distance k.",
      "constraints": "1 <= number of nodes <= 500; 0 <= Node.val <= 500; all Node.val values are unique; target exists; 0 <= k <= 1000.",
      "source": {
        "label": "All Nodes Distance K in Binary Tree - LeetCode 863",
        "url": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2",
          "output": "[7,4,1]",
          "explanation": "Those nodes are two edges from target 5."
        },
        {
          "input": "root = [1], target = 1, k = 0",
          "output": "[1]",
          "explanation": "The target is distance zero from itself."
        },
        {
          "input": "root = [0,1,null,3,2], target = 2, k = 1",
          "output": "[1]",
          "explanation": "The parent is one edge away."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). For every node, compute distance to target by searching paths.",
      "optimizedComplexity": "Time O(n); Space O(n). Parent map plus BFS visits each node at most once.",
      "recursiveComplexity": "Time O(n); Space O(h + output). DFS returns distance from target and collects downward nodes.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {\n    List<TreeNode> nodes = new ArrayList<>();\n    collect(root, nodes);\n    List<Integer> answer = new ArrayList<>();\n    for (TreeNode node : nodes) {\n      if (distance(root, node, target) == k) answer.add(node.val);\n    }\n    return answer;\n  }\n\n  private void collect(TreeNode node, List<TreeNode> nodes) {\n    if (node == null) return;\n    nodes.add(node); collect(node.left, nodes); collect(node.right, nodes);\n  }\n\n  private int distance(TreeNode root, TreeNode a, TreeNode b) {\n    TreeNode lca = lca(root, a, b);\n    return depth(lca, a, 0) + depth(lca, b, 0);\n  }\n\n  private TreeNode lca(TreeNode root, TreeNode a, TreeNode b) {\n    if (root == null || root == a || root == b) return root;\n    TreeNode left = lca(root.left, a, b), right = lca(root.right, a, b);\n    return left != null && right != null ? root : (left != null ? left : right);\n  }\n\n  private int depth(TreeNode node, TreeNode target, int d) {\n    if (node == null) return -1;\n    if (node == target) return d;\n    int left = depth(node.left, target, d + 1);\n    return left != -1 ? left : depth(node.right, target, d + 1);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    buildParent(root, null, parent);\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    Set<TreeNode> seen = new HashSet<>();\n    queue.offer(target);\n    seen.add(target);\n    int distance = 0;\n\n    while (!queue.isEmpty() && distance < k) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        for (TreeNode next : Arrays.asList(node.left, node.right, parent.get(node))) {\n          if (next != null && seen.add(next)) queue.offer(next);\n        }\n      }\n      distance++;\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    while (!queue.isEmpty()) answer.add(queue.poll().val);\n    return answer;\n  }\n\n  private void buildParent(TreeNode node, TreeNode par, Map<TreeNode, TreeNode> parent) {\n    if (node == null) return;\n    parent.put(node, par);\n    buildParent(node.left, node, parent);\n    buildParent(node.right, node, parent);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {\n    List<Integer> answer = new ArrayList<>();\n    dfs(root, target, k, answer);\n    return answer;\n  }\n\n  private int dfs(TreeNode node, TreeNode target, int k, List<Integer> answer) {\n    if (node == null) return -1;\n    if (node == target) {\n      collectDown(node, k, answer);\n      return 0;\n    }\n    int left = dfs(node.left, target, k, answer);\n    if (left != -1) {\n      if (left + 1 == k) answer.add(node.val);\n      else collectDown(node.right, k - left - 2, answer);\n      return left + 1;\n    }\n    int right = dfs(node.right, target, k, answer);\n    if (right != -1) {\n      if (right + 1 == k) answer.add(node.val);\n      else collectDown(node.left, k - right - 2, answer);\n      return right + 1;\n    }\n    return -1;\n  }\n\n  private void collectDown(TreeNode node, int distance, List<Integer> answer) {\n    if (node == null || distance < 0) return;\n    if (distance == 0) { answer.add(node.val); return; }\n    collectDown(node.left, distance - 1, answer);\n    collectDown(node.right, distance - 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    buildParent(root, null, parent);\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    Set<TreeNode> seen = new HashSet<>();\n    queue.offer(target);\n    seen.add(target);\n    int distance = 0;\n\n    while (!queue.isEmpty() && distance < k) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        for (TreeNode next : Arrays.asList(node.left, node.right, parent.get(node))) {\n          if (next != null && seen.add(next)) queue.offer(next);\n        }\n      }\n      distance++;\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    while (!queue.isEmpty()) answer.add(queue.poll().val);\n    return answer;\n  }\n\n  private void buildParent(TreeNode node, TreeNode par, Map<TreeNode, TreeNode> parent) {\n    if (node == null) return;\n    parent.put(node, par);\n    buildParent(node.left, node, parent);\n    buildParent(node.right, node, parent);\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    buildParent(root, null, parent);\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    Set<TreeNode> seen = new HashSet<>();\n    queue.offer(target);\n    seen.add(target);\n    int distance = 0;\n\n    while (!queue.isEmpty() && distance < k) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        for (TreeNode next : Arrays.asList(node.left, node.right, parent.get(node))) {\n          if (next != null && seen.add(next)) queue.offer(next);\n        }\n      }\n      distance++;\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    while (!queue.isEmpty()) answer.add(queue.poll().val);\n    return answer;\n  }\n\n  private void buildParent(TreeNode node, TreeNode par, Map<TreeNode, TreeNode> parent) {\n    if (node == null) return;\n    parent.put(node, par);\n    buildParent(node.left, node, parent);\n    buildParent(node.right, node, parent);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Binary Tree Cameras",
      "difficulty": "Hard",
      "subpattern": "Tree DP/greedy postorder states",
      "question": "Given the root of a binary tree, return the minimum number of cameras needed to monitor every node. A camera monitors its parent, itself, and its immediate children.",
      "trigger": "A node’s camera decision depends on child coverage states, so postorder traversal can greedily place cameras above uncovered children.",
      "intuition": "Use states: uncovered, covered without camera, has camera. If any child is uncovered, place a camera at current node.",
      "edgeCases": "Single node, leaf nodes uncovered by default, root uncovered after DFS, skewed tree, both children covered without cameras.",
      "constraints": "1 <= number of nodes <= 1000; Node.val is 0.",
      "source": {
        "label": "Binary Tree Cameras - LeetCode 968",
        "url": "https://leetcode.com/problems/binary-tree-cameras/"
      },
      "examples": [
        {
          "input": "root = [0,0,null,0,0]",
          "output": "1",
          "explanation": "One camera at the left child covers all nodes."
        },
        {
          "input": "root = [0,0,null,0,null,0,null,null,0]",
          "output": "2",
          "explanation": "Two cameras are needed along the chain."
        },
        {
          "input": "root = [0]",
          "output": "1",
          "explanation": "A single node needs one camera."
        }
      ],
      "bruteForceComplexity": "Time O(2^n * n); Space O(n). Try all camera subsets and test coverage.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder assigns greedy states once per node.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive postorder returns coverage state and camera count.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minCameraCover(TreeNode root) {\n    List<TreeNode> nodes = new ArrayList<>();\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    collect(root, null, nodes, parent);\n    int best = nodes.size();\n    for (int mask = 1; mask < (1 << nodes.size()); mask++) {\n      if (Integer.bitCount(mask) >= best) continue;\n      if (covers(nodes, parent, mask)) best = Integer.bitCount(mask);\n    }\n    return best;\n  }\n\n  private void collect(TreeNode node, TreeNode par, List<TreeNode> nodes, Map<TreeNode, TreeNode> parent) {\n    if (node == null) return;\n    parent.put(node, par); nodes.add(node); collect(node.left, node, nodes, parent); collect(node.right, node, nodes, parent);\n  }\n\n  private boolean covers(List<TreeNode> nodes, Map<TreeNode, TreeNode> parent, int mask) {\n    Set<TreeNode> covered = new HashSet<>();\n    for (int i = 0; i < nodes.size(); i++) if ((mask & (1 << i)) != 0) {\n      TreeNode node = nodes.get(i); covered.add(node); covered.add(parent.get(node)); covered.add(node.left); covered.add(node.right);\n    }\n    for (TreeNode node : nodes) if (!covered.contains(node)) return false;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minCameraCover(TreeNode root) {\n    Map<TreeNode, Integer> state = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int cameras = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = state.getOrDefault(node.left, 1);\n      int right = state.getOrDefault(node.right, 1);\n      if (left == 0 || right == 0) { state.put(node, 2); cameras++; }\n      else if (left == 2 || right == 2) state.put(node, 1);\n      else state.put(node, 0);\n      last = stack.pop();\n    }\n    return cameras + (state.getOrDefault(root, 1) == 0 ? 1 : 0);\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int cameras = 0;\n\n  public int minCameraCover(TreeNode root) {\n    if (dfs(root) == 0) cameras++;\n    return cameras;\n  }\n\n  private int dfs(TreeNode node) {\n    if (node == null) return 1;\n    int left = dfs(node.left);\n    int right = dfs(node.right);\n    if (left == 0 || right == 0) {\n      cameras++;\n      return 2;\n    }\n    if (left == 2 || right == 2) return 1;\n    return 0;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minCameraCover(TreeNode root) {\n    Map<TreeNode, Integer> state = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int cameras = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = state.getOrDefault(node.left, 1);\n      int right = state.getOrDefault(node.right, 1);\n      if (left == 0 || right == 0) { state.put(node, 2); cameras++; }\n      else if (left == 2 || right == 2) state.put(node, 1);\n      else state.put(node, 0);\n      last = stack.pop();\n    }\n    return cameras + (state.getOrDefault(root, 1) == 0 ? 1 : 0);\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minCameraCover(TreeNode root) {\n    Map<TreeNode, Integer> state = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int cameras = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = state.getOrDefault(node.left, 1);\n      int right = state.getOrDefault(node.right, 1);\n      if (left == 0 || right == 0) { state.put(node, 2); cameras++; }\n      else if (left == 2 || right == 2) state.put(node, 1);\n      else state.put(node, 0);\n      last = stack.pop();\n    }\n    return cameras + (state.getOrDefault(root, 1) == 0 ? 1 : 0);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Recover Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST inorder anomaly detection",
      "question": "Two nodes of a BST are swapped by mistake. Recover the tree without changing its structure.",
      "trigger": "A valid BST inorder traversal is sorted. Swapped nodes create one or two descending inversions in inorder order.",
      "intuition": "During inorder traversal, track previous node. The first inversion gives the first swapped node; the last inversion gives the second.",
      "edgeCases": "Adjacent swapped nodes, non-adjacent swapped nodes, root swapped, two-node tree, values near integer boundaries.",
      "constraints": "2 <= number of nodes <= 1000; -2147483648 <= Node.val <= 2147483647.",
      "source": {
        "label": "Recover Binary Search Tree - LeetCode 99",
        "url": "https://leetcode.com/problems/recover-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [1,3,null,null,2]",
          "output": "[3,1,null,null,2]",
          "explanation": "Values 1 and 3 are swapped back."
        },
        {
          "input": "root = [3,1,4,null,null,2]",
          "output": "[2,1,4,null,null,3]",
          "explanation": "Values 2 and 3 are swapped back."
        },
        {
          "input": "root = [2,1]",
          "output": "[2,1]",
          "explanation": "Already valid input would remain valid in variants."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Collect nodes and sorted values, then rewrite mismatched values.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder detects inversions.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive inorder detects swapped nodes.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    List<TreeNode> nodes = new ArrayList<>();\n    inorder(root, nodes);\n    List<Integer> values = new ArrayList<>();\n    for (TreeNode node : nodes) values.add(node.val);\n    Collections.sort(values);\n    for (int i = 0; i < nodes.size(); i++) nodes.get(i).val = values.get(i);\n  }\n\n  private void inorder(TreeNode node, List<TreeNode> nodes) {\n    if (node == null) return;\n    inorder(node.left, nodes);\n    nodes.add(node);\n    inorder(node.right, nodes);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, previous = null, first = null, second = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && previous.val > current.val) {\n        if (first == null) first = previous;\n        second = current;\n      }\n      previous = current;\n      current = current.right;\n    }\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private TreeNode previous;\n  private TreeNode first;\n  private TreeNode second;\n\n  public void recoverTree(TreeNode root) {\n    inorder(root);\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null) return;\n    inorder(node.left);\n    if (previous != null && previous.val > node.val) {\n      if (first == null) first = previous;\n      second = node;\n    }\n    previous = node;\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, previous = null, first = null, second = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && previous.val > current.val) {\n        if (first == null) first = previous;\n        second = current;\n      }\n      previous = current;\n      current = current.right;\n    }\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, previous = null, first = null, second = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && previous.val > current.val) {\n        if (first == null) first = previous;\n        second = current;\n      }\n      previous = current;\n      current = current.right;\n    }\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Convert Sorted Array to Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "Balanced tree construction from sorted data",
      "question": "Given a sorted integer array, convert it to a height-balanced binary search tree.",
      "trigger": "A height-balanced BST uses the middle element as root, with left and right halves recursively forming subtrees.",
      "intuition": "Pick mid as root to split the array evenly. Recurse on left half and right half.",
      "edgeCases": "Empty array if allowed, one element, two elements, even length midpoint choice, negative values.",
      "constraints": "1 <= nums.length <= 10000; -10000 <= nums[i] <= 10000; nums is strictly increasing.",
      "source": {
        "label": "Convert Sorted Array to Binary Search Tree - LeetCode 108",
        "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"
      },
      "examples": [
        {
          "input": "nums = [-10,-3,0,5,9]",
          "output": "[0,-3,9,-10,null,5]",
          "explanation": "One valid height-balanced BST uses 0 as root."
        },
        {
          "input": "nums = [1,3]",
          "output": "[1,null,3] or [3,1]",
          "explanation": "Both valid outputs are height-balanced."
        },
        {
          "input": "nums = [1]",
          "output": "[1]",
          "explanation": "The only value becomes root."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Insert middle-order values one by one into a BST.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative stack builds subtree ranges.",
      "recursiveComplexity": "Time O(n); Space O(log n) recursion stack for balanced splits.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    TreeNode root = null;\n    for (int value : nums) {\n      root = insert(root, value);\n    }\n    return root;\n  }\n\n  private TreeNode insert(TreeNode node, int value) {\n    if (node == null) return new TreeNode(value);\n    if (value < node.val) node.left = insert(node.left, value);\n    else node.right = insert(node.right, value);\n    return node;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    if (nums.length == 0) return null;\n    TreeNode root = new TreeNode(0);\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, nums.length - 1));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = nums[mid];\n      if (state.left <= mid - 1) {\n        state.node.left = new TreeNode(0);\n        stack.push(new State(state.node.left, state.left, mid - 1));\n      }\n      if (mid + 1 <= state.right) {\n        state.node.right = new TreeNode(0);\n        stack.push(new State(state.node.right, mid + 1, state.right));\n      }\n    }\n    return root;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode n, int l, int r){node=n;left=l;right=r;} }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    return build(nums, 0, nums.length - 1);\n  }\n\n  private TreeNode build(int[] nums, int left, int right) {\n    if (left > right) return null;\n    int mid = left + (right - left) / 2;\n    TreeNode root = new TreeNode(nums[mid]);\n    root.left = build(nums, left, mid - 1);\n    root.right = build(nums, mid + 1, right);\n    return root;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    if (nums.length == 0) return null;\n    TreeNode root = new TreeNode(0);\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, nums.length - 1));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = nums[mid];\n      if (state.left <= mid - 1) {\n        state.node.left = new TreeNode(0);\n        stack.push(new State(state.node.left, state.left, mid - 1));\n      }\n      if (mid + 1 <= state.right) {\n        state.node.right = new TreeNode(0);\n        stack.push(new State(state.node.right, mid + 1, state.right));\n      }\n    }\n    return root;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode n, int l, int r){node=n;left=l;right=r;} }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    if (nums.length == 0) return null;\n    TreeNode root = new TreeNode(0);\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, nums.length - 1));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = nums[mid];\n      if (state.left <= mid - 1) {\n        state.node.left = new TreeNode(0);\n        stack.push(new State(state.node.left, state.left, mid - 1));\n      }\n      if (mid + 1 <= state.right) {\n        state.node.right = new TreeNode(0);\n        stack.push(new State(state.node.right, mid + 1, state.right));\n      }\n    }\n    return root;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode n, int l, int r){node=n;left=l;right=r;} }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Depth of Binary Tree",
      "difficulty": "Easy",
      "subpattern": "Tree BFS shortest root-to-leaf path",
      "question": "Given a binary tree, return its minimum depth, the number of nodes along the shortest path from root to any leaf.",
      "trigger": "The shortest root-to-leaf path is found as soon as BFS reaches the first leaf.",
      "intuition": "Level-order traversal stops at the first leaf. Recursive DFS must handle missing children carefully.",
      "edgeCases": "Empty tree, one node, one child missing, skewed tree, leaf definition requires no children.",
      "constraints": "0 <= number of nodes <= 100000; -1000 <= Node.val <= 1000.",
      "source": {
        "label": "Minimum Depth of Binary Tree - LeetCode 111",
        "url": "https://leetcode.com/problems/minimum-depth-of-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "2",
          "explanation": "Node 9 is the nearest leaf."
        },
        {
          "input": "root = [2,null,3,null,4,null,5,null,6]",
          "output": "5",
          "explanation": "A one-sided chain has depth equal to its length."
        },
        {
          "input": "root = []",
          "output": "0",
          "explanation": "Empty tree has depth 0."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Collect all leaf depths and take the minimum.",
      "optimizedComplexity": "Time O(n) worst, often less; Space O(w). BFS stops at the first leaf.",
      "recursiveComplexity": "Time O(n); Space O(h). DFS handles one-child cases without treating null as depth zero incorrectly.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minDepth(TreeNode root) {\n    if (root == null) return 0;\n    List<Integer> depths = new ArrayList<>();\n    collect(root, 1, depths);\n    int best = Integer.MAX_VALUE;\n    for (int depth : depths) best = Math.min(best, depth);\n    return best;\n  }\n\n  private void collect(TreeNode node, int depth, List<Integer> depths) {\n    if (node == null) return;\n    if (node.left == null && node.right == null) depths.add(depth);\n    collect(node.left, depth + 1, depths);\n    collect(node.right, depth + 1, depths);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 1;\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left == null && node.right == null) return depth;\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      depth++;\n    }\n    return depth;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minDepth(TreeNode root) {\n    if (root == null) return 0;\n    if (root.left == null) return 1 + minDepth(root.right);\n    if (root.right == null) return 1 + minDepth(root.left);\n    return 1 + Math.min(minDepth(root.left), minDepth(root.right));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 1;\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left == null && node.right == null) return depth;\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      depth++;\n    }\n    return depth;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int minDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 1;\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left == null && node.right == null) return depth;\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      depth++;\n    }\n    return depth;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Cousins in Binary Tree",
      "difficulty": "Easy",
      "subpattern": "Tree BFS parent/depth comparison",
      "question": "Given the root of a binary tree with unique values and two values x and y, return true if their nodes are cousins: same depth but different parents.",
      "trigger": "Cousin status depends on both depth and parent, so level traversal can compare both values when found.",
      "intuition": "BFS level by level, storing each node parent. If both targets appear in the same level with different parents, return true.",
      "edgeCases": "One target missing in variants, siblings with same parent, different depths, root as one target, unique values.",
      "constraints": "2 <= number of nodes <= 100; 1 <= Node.val <= 100; all values are unique; x and y exist and are distinct.",
      "source": {
        "label": "Cousins in Binary Tree - LeetCode 993",
        "url": "https://leetcode.com/problems/cousins-in-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,4], x = 4, y = 3",
          "output": "false",
          "explanation": "The nodes are at different depths."
        },
        {
          "input": "root = [1,2,3,null,4,null,5], x = 5, y = 4",
          "output": "true",
          "explanation": "Both are depth 3 with different parents."
        },
        {
          "input": "root = [1,2,3,null,4], x = 2, y = 3",
          "output": "false",
          "explanation": "They are siblings, not cousins."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(h). Find depth and parent for x, then find depth and parent for y separately.",
      "optimizedComplexity": "Time O(n); Space O(w). BFS checks both targets level by level.",
      "recursiveComplexity": "Time O(n); Space O(h). DFS records depth and parent for each target.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isCousins(TreeNode root, int x, int y) {\n    Info first = find(root, null, x, 0);\n    Info second = find(root, null, y, 0);\n    return first.depth == second.depth && first.parent != second.parent;\n  }\n\n  private Info find(TreeNode node, TreeNode parent, int target, int depth) {\n    if (node == null) return null;\n    if (node.val == target) return new Info(parent, depth);\n    Info left = find(node.left, node, target, depth + 1);\n    return left != null ? left : find(node.right, node, target, depth + 1);\n  }\n\n  private static class Info {\n    TreeNode parent; int depth;\n    Info(TreeNode parent, int depth) { this.parent = parent; this.depth = depth; }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isCousins(TreeNode root, int x, int y) {\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      TreeNode parentX = null, parentY = null;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) {\n          if (node.left.val == x) parentX = node;\n          if (node.left.val == y) parentY = node;\n          queue.offer(node.left);\n        }\n        if (node.right != null) {\n          if (node.right.val == x) parentX = node;\n          if (node.right.val == y) parentY = node;\n          queue.offer(node.right);\n        }\n      }\n      if (parentX != null || parentY != null) return parentX != null && parentY != null && parentX != parentY;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private TreeNode parentX;\n  private TreeNode parentY;\n  private int depthX = -1;\n  private int depthY = -1;\n\n  public boolean isCousins(TreeNode root, int x, int y) {\n    dfs(root, null, 0, x, y);\n    return depthX == depthY && parentX != parentY;\n  }\n\n  private void dfs(TreeNode node, TreeNode parent, int depth, int x, int y) {\n    if (node == null) return;\n    if (node.val == x) { parentX = parent; depthX = depth; }\n    if (node.val == y) { parentY = parent; depthY = depth; }\n    dfs(node.left, node, depth + 1, x, y);\n    dfs(node.right, node, depth + 1, x, y);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isCousins(TreeNode root, int x, int y) {\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      TreeNode parentX = null, parentY = null;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) {\n          if (node.left.val == x) parentX = node;\n          if (node.left.val == y) parentY = node;\n          queue.offer(node.left);\n        }\n        if (node.right != null) {\n          if (node.right.val == x) parentX = node;\n          if (node.right.val == y) parentY = node;\n          queue.offer(node.right);\n        }\n      }\n      if (parentX != null || parentY != null) return parentX != null && parentY != null && parentX != parentY;\n    }\n    return false;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isCousins(TreeNode root, int x, int y) {\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      TreeNode parentX = null, parentY = null;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) {\n          if (node.left.val == x) parentX = node;\n          if (node.left.val == y) parentY = node;\n          queue.offer(node.left);\n        }\n        if (node.right != null) {\n          if (node.right.val == x) parentX = node;\n          if (node.right.val == y) parentY = node;\n          queue.offer(node.right);\n        }\n      }\n      if (parentX != null || parentY != null) return parentX != null && parentY != null && parentX != parentY;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Boundary Traversal of Binary Tree",
      "difficulty": "Medium",
      "subpattern": "Tree boundary DFS traversal",
      "question": "Given a binary tree, return its boundary traversal in anti-clockwise order: root, left boundary, leaves, and reversed right boundary without duplicates.",
      "trigger": "The boundary is not a normal traversal; it combines three structural parts with leaf de-duplication.",
      "intuition": "Add root if not leaf, walk left boundary excluding leaves, collect all leaves left-to-right, then collect right boundary excluding leaves and reverse it.",
      "edgeCases": "Empty tree, single root, only left chain, only right chain, leaves that are also boundary nodes, duplicate prevention.",
      "constraints": "1 <= number of nodes <= 100000; 0 <= Node.val <= 100000 in common variants.",
      "source": {
        "label": "Boundary Traversal of Binary Tree - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1"
      },
      "examples": [
        {
          "input": "root = [1,2,3,4,5,6,7]",
          "output": "[1,2,4,5,6,7,3]",
          "explanation": "Left boundary, leaves, and reversed right boundary are combined."
        },
        {
          "input": "root = [1]",
          "output": "[1]",
          "explanation": "A single root is the whole boundary."
        },
        {
          "input": "root = [1,null,2,null,3]",
          "output": "[1,3,2]",
          "explanation": "The right chain appears after leaves in reverse boundary order."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store root-to-leaf paths and derive boundary nodes using sets.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative boundary walks plus leaf traversal visit nodes linearly.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive helpers collect leaves and boundary parts.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList<Integer> boundary(TreeNode root) {\n    ArrayList<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    List<List<TreeNode>> paths = new ArrayList<>();\n    collectPaths(root, new ArrayList<>(), paths);\n    Set<TreeNode> boundary = new LinkedHashSet<>();\n    for (List<TreeNode> path : paths) boundary.add(path.get(0));\n    if (!paths.isEmpty()) for (TreeNode node : paths.get(0)) boundary.add(node);\n    for (List<TreeNode> path : paths) boundary.add(path.get(path.size() - 1));\n    if (!paths.isEmpty()) {\n      List<TreeNode> last = paths.get(paths.size() - 1);\n      for (int i = last.size() - 1; i >= 0; i--) boundary.add(last.get(i));\n    }\n    for (TreeNode node : boundary) answer.add(node.val);\n    return answer;\n  }\n\n  private void collectPaths(TreeNode node, List<TreeNode> path, List<List<TreeNode>> paths) {\n    if (node == null) return;\n    path.add(node);\n    if (node.left == null && node.right == null) paths.add(new ArrayList<>(path));\n    collectPaths(node.left, path, paths);\n    collectPaths(node.right, path, paths);\n    path.remove(path.size() - 1);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList<Integer> boundary(TreeNode root) {\n    ArrayList<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n\n    TreeNode current = root.left;\n    while (current != null) {\n      if (!isLeaf(current)) answer.add(current.val);\n      current = current.left != null ? current.left : current.right;\n    }\n\n    addLeaves(root, answer);\n    Stack<Integer> right = new Stack<>();\n    current = root.right;\n    while (current != null) {\n      if (!isLeaf(current)) right.push(current.val);\n      current = current.right != null ? current.right : current.left;\n    }\n    while (!right.isEmpty()) answer.add(right.pop());\n    return answer;\n  }\n\n  private void addLeaves(TreeNode node, ArrayList<Integer> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    addLeaves(node.left, answer);\n    addLeaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList<Integer> boundary(TreeNode root) {\n    ArrayList<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n    leftBoundary(root.left, answer);\n    leaves(root, answer);\n    ArrayList<Integer> right = new ArrayList<>();\n    rightBoundary(root.right, right);\n    for (int i = right.size() - 1; i >= 0; i--) answer.add(right.get(i));\n    return answer;\n  }\n\n  private void leftBoundary(TreeNode node, ArrayList<Integer> answer) {\n    if (node == null || isLeaf(node)) return;\n    answer.add(node.val);\n    if (node.left != null) leftBoundary(node.left, answer);\n    else leftBoundary(node.right, answer);\n  }\n\n  private void rightBoundary(TreeNode node, ArrayList<Integer> answer) {\n    if (node == null || isLeaf(node)) return;\n    answer.add(node.val);\n    if (node.right != null) rightBoundary(node.right, answer);\n    else rightBoundary(node.left, answer);\n  }\n\n  private void leaves(TreeNode node, ArrayList<Integer> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    leaves(node.left, answer);\n    leaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList<Integer> boundary(TreeNode root) {\n    ArrayList<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n\n    TreeNode current = root.left;\n    while (current != null) {\n      if (!isLeaf(current)) answer.add(current.val);\n      current = current.left != null ? current.left : current.right;\n    }\n\n    addLeaves(root, answer);\n    Stack<Integer> right = new Stack<>();\n    current = root.right;\n    while (current != null) {\n      if (!isLeaf(current)) right.push(current.val);\n      current = current.right != null ? current.right : current.left;\n    }\n    while (!right.isEmpty()) answer.add(right.pop());\n    return answer;\n  }\n\n  private void addLeaves(TreeNode node, ArrayList<Integer> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    addLeaves(node.left, answer);\n    addLeaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList<Integer> boundary(TreeNode root) {\n    ArrayList<Integer> answer = new ArrayList<>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n\n    TreeNode current = root.left;\n    while (current != null) {\n      if (!isLeaf(current)) answer.add(current.val);\n      current = current.left != null ? current.left : current.right;\n    }\n\n    addLeaves(root, answer);\n    Stack<Integer> right = new Stack<>();\n    current = root.right;\n    while (current != null) {\n      if (!isLeaf(current)) right.push(current.val);\n      current = current.right != null ? current.right : current.left;\n    }\n    while (!right.isEmpty()) answer.add(right.pop());\n    return answer;\n  }\n\n  private void addLeaves(TreeNode node, ArrayList<Integer> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    addLeaves(node.left, answer);\n    addLeaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}"
    }
  ],
  "checklist": [
    "The input is a tree/root node and each subtree can be solved independently or level by level.",
    "The problem asks for height, depth, path, ancestor, subtree equality, traversal order, or pointer mutation.",
    "A DFS solution returns information upward such as height, gain, state, serialized key, or found node.",
    "A BFS solution is natural when output or logic is grouped by level or shortest depth.",
    "BST problems usually become inorder traversal or ancestor-bound propagation."
  ],
  "traps": [
    "Confusing node count with edge count for diameter and path length.",
    "Treating null child depth as a valid minimum depth in one-child trees.",
    "Forgetting null markers in serialization and subtree matching.",
    "Checking BST parent-child order only instead of ancestor bounds.",
    "Not resetting or preserving pointers during in-place mutation problems."
  ],
  "edgeCases": [
    "Empty root when the problem allows it.",
    "Single-node tree.",
    "Completely left-skewed or right-skewed tree.",
    "Duplicate values when structure matters more than value alone.",
    "Negative values for path sum and maximum path sum problems."
  ],
  "complexities": [
    "Most tree traversals are O(n) time because each node is visited once.",
    "Recursive DFS uses O(h) stack space, which becomes O(n) on skewed trees.",
    "BFS uses O(w) space where w is the maximum level width.",
    "Naive subtree/path comparisons often become O(n^2) when heights or equality are recomputed.",
    "Tree DP usually stores constant states per node and stays O(n)."
  ],
  "mentalModel": [
    "Decide whether the answer is built top-down, bottom-up, or level-by-level.",
    "For DFS, define exactly what each subtree returns to its parent.",
    "For BFS, process a fixed queue size to isolate one level.",
    "Carry path state downward and aggregate height/gain/state upward.",
    "For BSTs, trust inorder order or pass low/high bounds, not just parent comparisons."
  ],
  "revisionStrategy": [
    "Start with the 12 core problems: depth, equality, inversion, BFS levels, diameter, balance, subtree, LCA, max path, and path sums.",
    "Practice one DFS aggregation and one BFS traversal together in every revision session.",
    "Group BST problems together: Validate BST, Kth Smallest, Recover BST, and Sorted Array to BST.",
    "For hard tree DP problems, write the returned state tuple before code.",
    "After each solution, state whether stack space is O(h), O(w), or O(n) and why."
  ],
  "unseen": [
    "Return the longest path where adjacent node values differ by exactly one.",
    "Find all nodes that are the only maximum value on their root-to-node path.",
    "Serialize an N-ary tree and rebuild it from the string.",
    "Convert a binary tree into a circular doubly linked list in inorder order.",
    "Find the minimum cameras needed when a camera covers nodes within distance two."
  ]
};
