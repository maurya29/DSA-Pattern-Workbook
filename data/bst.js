const CURRENT_PATTERN = {
  "id": "bst",
  "name": "Binary Search Tree",
  "summary": "Ordered tree search, validation, kth, predecessor/successor.",
  "complete": true,
  "subpatterns": [
    "BST ordered search and insertion",
    "BST deletion and structural mutation",
    "BST validation with bounds or inorder order",
    "BST kth/order-statistic traversal",
    "BST predecessor and successor traversal",
    "BST construction and balancing",
    "BST range pruning and trimming",
    "BST two-pointer and iterator patterns",
    "BST dynamic programming and subtree aggregation",
    "BST serialization using ordering constraints"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Search in a Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "BST ordered search",
      "question": "Given the root of a binary search tree and an integer val, return the subtree rooted at the node whose value equals val, or null if the value does not exist.",
      "trigger": "BST ordering lets each comparison discard either the entire left subtree or the entire right subtree.",
      "intuition": "If val is smaller than current node, move left. If larger, move right. If equal, return the node.",
      "edgeCases": "Empty tree, value at root, value absent, value in leaf, skewed BST.",
      "constraints": "1 <= number of nodes <= 5000; 1 <= Node.val <= 10000000; all values are unique; 1 <= val <= 10000000.",
      "source": {
        "label": "Search in a Binary Search Tree - LeetCode 700",
        "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], val = 2",
          "output": "[2,1,3]",
          "explanation": "The node with value 2 is found and its subtree is returned."
        },
        {
          "input": "root = [4,2,7,1,3], val = 5",
          "output": "[]",
          "explanation": "5 does not exist in the BST."
        },
        {
          "input": "root = [1], val = 1",
          "output": "[1]",
          "explanation": "The root itself matches."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(h). DFS can search every node without using BST ordering.",
      "optimizedComplexity": "Time O(h); Space O(1). Iterative BST search follows one path.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive BST search follows one path.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    if (root == null) return null;\n    if (root.val == val) return root;\n    TreeNode left = searchBST(root.left, val);\n    if (left != null) return left;\n    return searchBST(root.right, val);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    TreeNode current = root;\n    while (current != null && current.val != val) {\n      current = val < current.val ? current.left : current.right;\n    }\n    return current;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    if (root == null || root.val == val) return root;\n    if (val < root.val) return searchBST(root.left, val);\n    return searchBST(root.right, val);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    TreeNode current = root;\n    while (current != null && current.val != val) {\n      current = val < current.val ? current.left : current.right;\n    }\n    return current;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    TreeNode current = root;\n    while (current != null && current.val != val) {\n      current = val < current.val ? current.left : current.right;\n    }\n    return current;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Insert into a Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST ordered insertion",
      "question": "Given the root of a BST and a value not currently in the tree, insert the value into the BST and return the root.",
      "trigger": "BST ordering determines the unique leaf position where the new value belongs.",
      "intuition": "Walk down the tree until the next child pointer is null, then attach the new node on that side.",
      "edgeCases": "Empty tree, insert as left child, insert as right child, skewed tree, value guaranteed unique.",
      "constraints": "0 <= number of nodes <= 10000; -100000000 <= Node.val,val <= 100000000; val does not exist in the BST.",
      "source": {
        "label": "Insert into a Binary Search Tree - LeetCode 701",
        "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], val = 5",
          "output": "[4,2,7,1,3,5]",
          "explanation": "5 is inserted as the left child of 7."
        },
        {
          "input": "root = [40,20,60,10,30,50,70], val = 25",
          "output": "valid BST containing 25",
          "explanation": "25 belongs between 20 and 30."
        },
        {
          "input": "root = [], val = 5",
          "output": "[5]",
          "explanation": "A new root is created."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) average after collecting values and rebuilding; Space O(n).",
      "optimizedComplexity": "Time O(h); Space O(1). Iterative insertion follows one search path.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive insertion returns the updated subtree root.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    values.add(val);\n    TreeNode rebuilt = null;\n    for (int value : values) rebuilt = insert(rebuilt, value);\n    return rebuilt;\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.left, values);\n    collect(node.right, values);\n  }\n\n  private TreeNode insert(TreeNode node, int val) {\n    if (node == null) return new TreeNode(val);\n    if (val < node.val) node.left = insert(node.left, val);\n    else node.right = insert(node.right, val);\n    return node;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    TreeNode current = root;\n    while (true) {\n      if (val < current.val) {\n        if (current.left == null) { current.left = new TreeNode(val); break; }\n        current = current.left;\n      } else {\n        if (current.right == null) { current.right = new TreeNode(val); break; }\n        current = current.right;\n      }\n    }\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    if (val < root.val) root.left = insertIntoBST(root.left, val);\n    else root.right = insertIntoBST(root.right, val);\n    return root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    TreeNode current = root;\n    while (true) {\n      if (val < current.val) {\n        if (current.left == null) { current.left = new TreeNode(val); break; }\n        current = current.left;\n      } else {\n        if (current.right == null) { current.right = new TreeNode(val); break; }\n        current = current.right;\n      }\n    }\n    return root;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    TreeNode current = root;\n    while (true) {\n      if (val < current.val) {\n        if (current.left == null) { current.left = new TreeNode(val); break; }\n        current = current.left;\n      } else {\n        if (current.right == null) { current.right = new TreeNode(val); break; }\n        current = current.right;\n      }\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Delete Node in a BST",
      "difficulty": "Medium",
      "subpattern": "BST deletion and successor replacement",
      "question": "Given the root of a BST and a key, delete the node with value key if it exists and return the updated root.",
      "trigger": "BST ordering finds the node, and deleting a node with two children requires replacing it with inorder successor or predecessor.",
      "intuition": "Search for key. If node has one child, return that child. If it has two children, copy the smallest value from the right subtree and delete that successor.",
      "edgeCases": "Key absent, delete leaf, delete node with one child, delete root, delete node with two children.",
      "constraints": "0 <= number of nodes <= 10000; -100000 <= Node.val,key <= 100000; all node values are unique.",
      "source": {
        "label": "Delete Node in a BST - LeetCode 450",
        "url": "https://leetcode.com/problems/delete-node-in-a-bst/"
      },
      "examples": [
        {
          "input": "root = [5,3,6,2,4,null,7], key = 3",
          "output": "[5,4,6,2,null,null,7]",
          "explanation": "3 is replaced by its inorder successor 4."
        },
        {
          "input": "root = [5,3,6,2,4,null,7], key = 0",
          "output": "same tree",
          "explanation": "0 is absent."
        },
        {
          "input": "root = [], key = 0",
          "output": "[]",
          "explanation": "Empty tree remains empty."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) average; Space O(n). Collect all values except key and rebuild a BST.",
      "optimizedComplexity": "Time O(h); Space O(1). Iteratively search and rewire the deleted node.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive deletion updates subtree links while unwinding.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values, key);\n    TreeNode rebuilt = null;\n    for (int value : values) rebuilt = insert(rebuilt, value);\n    return rebuilt;\n  }\n\n  private void collect(TreeNode node, List<Integer> values, int key) {\n    if (node == null) return;\n    if (node.val != key) values.add(node.val);\n    collect(node.left, values, key);\n    collect(node.right, values, key);\n  }\n\n  private TreeNode insert(TreeNode node, int val) {\n    if (node == null) return new TreeNode(val);\n    if (val < node.val) node.left = insert(node.left, val);\n    else node.right = insert(node.right, val);\n    return node;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    TreeNode dummy = new TreeNode(0, null, root);\n    TreeNode parent = dummy;\n    TreeNode current = root;\n    while (current != null && current.val != key) {\n      parent = current;\n      current = key < current.val ? current.left : current.right;\n    }\n    if (current == null) return dummy.right;\n\n    TreeNode replacement = removeRoot(current);\n    if (parent.left == current) parent.left = replacement;\n    else parent.right = replacement;\n    return dummy.right;\n  }\n\n  private TreeNode removeRoot(TreeNode node) {\n    if (node.left == null) return node.right;\n    if (node.right == null) return node.left;\n    TreeNode successorParent = node;\n    TreeNode successor = node.right;\n    while (successor.left != null) {\n      successorParent = successor;\n      successor = successor.left;\n    }\n    if (successorParent != node) {\n      successorParent.left = successor.right;\n      successor.right = node.right;\n    }\n    successor.left = node.left;\n    return successor;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    if (root == null) return null;\n    if (key < root.val) root.left = deleteNode(root.left, key);\n    else if (key > root.val) root.right = deleteNode(root.right, key);\n    else {\n      if (root.left == null) return root.right;\n      if (root.right == null) return root.left;\n      TreeNode successor = min(root.right);\n      root.val = successor.val;\n      root.right = deleteNode(root.right, successor.val);\n    }\n    return root;\n  }\n\n  private TreeNode min(TreeNode node) {\n    while (node.left != null) node = node.left;\n    return node;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    TreeNode dummy = new TreeNode(0, null, root);\n    TreeNode parent = dummy;\n    TreeNode current = root;\n    while (current != null && current.val != key) {\n      parent = current;\n      current = key < current.val ? current.left : current.right;\n    }\n    if (current == null) return dummy.right;\n\n    TreeNode replacement = removeRoot(current);\n    if (parent.left == current) parent.left = replacement;\n    else parent.right = replacement;\n    return dummy.right;\n  }\n\n  private TreeNode removeRoot(TreeNode node) {\n    if (node.left == null) return node.right;\n    if (node.right == null) return node.left;\n    TreeNode successorParent = node;\n    TreeNode successor = node.right;\n    while (successor.left != null) {\n      successorParent = successor;\n      successor = successor.left;\n    }\n    if (successorParent != node) {\n      successorParent.left = successor.right;\n      successor.right = node.right;\n    }\n    successor.left = node.left;\n    return successor;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    TreeNode dummy = new TreeNode(0, null, root);\n    TreeNode parent = dummy;\n    TreeNode current = root;\n    while (current != null && current.val != key) {\n      parent = current;\n      current = key < current.val ? current.left : current.right;\n    }\n    if (current == null) return dummy.right;\n\n    TreeNode replacement = removeRoot(current);\n    if (parent.left == current) parent.left = replacement;\n    else parent.right = replacement;\n    return dummy.right;\n  }\n\n  private TreeNode removeRoot(TreeNode node) {\n    if (node.left == null) return node.right;\n    if (node.right == null) return node.left;\n    TreeNode successorParent = node;\n    TreeNode successor = node.right;\n    while (successor.left != null) {\n      successorParent = successor;\n      successor = successor.left;\n    }\n    if (successorParent != node) {\n      successorParent.left = successor.right;\n      successor.right = node.right;\n    }\n    successor.left = node.left;\n    return successor;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Validate Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST validation with bounds or inorder order",
      "question": "Given the root of a binary tree, determine if it is a valid BST. Every node must be strictly greater than all values in its left subtree and strictly less than all values in its right subtree.",
      "trigger": "BST validity is controlled by ancestor bounds, not just direct parent-child comparisons.",
      "intuition": "Use inorder strict increase or pass low/high bounds down the tree.",
      "edgeCases": "Duplicate values, Integer.MIN_VALUE, Integer.MAX_VALUE, invalid descendant far below root, one node.",
      "constraints": "1 <= number of nodes <= 10000; -2147483648 <= Node.val <= 2147483647.",
      "source": {
        "label": "Validate Binary Search Tree - LeetCode 98",
        "url": "https://leetcode.com/problems/validate-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [2,1,3]",
          "output": "true",
          "explanation": "All nodes satisfy BST ordering."
        },
        {
          "input": "root = [5,1,4,null,null,3,6]",
          "output": "false",
          "explanation": "3 is in the right subtree of 5 but less than 5."
        },
        {
          "input": "root = [2,2,2]",
          "output": "false",
          "explanation": "BST ordering is strict."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store inorder traversal and check strict increase.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder stops at first violation.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive bounds validate every node once.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    inorder(root, values);\n    for (int i = 1; i < values.size(); i++) {\n      if (values.get(i) <= values.get(i - 1)) return false;\n    }\n    return true;\n  }\n\n  private void inorder(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    inorder(node.left, values);\n    values.add(node.val);\n    inorder(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);\n  }\n\n  private boolean valid(TreeNode node, long low, long high) {\n    if (node == null) return true;\n    if (node.val <= low || node.val >= high) return false;\n    return valid(node.left, low, node.val) && valid(node.right, node.val, high);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Smallest Element in a BST",
      "difficulty": "Medium",
      "subpattern": "BST kth/order-statistic traversal",
      "question": "Given the root of a BST and an integer k, return the kth smallest value in the tree.",
      "trigger": "Inorder traversal of a BST yields values in sorted ascending order.",
      "intuition": "Visit left subtree, current node, then right subtree. Stop at the kth visited node.",
      "edgeCases": "k = 1, k = node count, one node, skewed tree, k always valid.",
      "constraints": "1 <= k <= number of nodes <= 10000; 0 <= Node.val <= 10000.",
      "source": {
        "label": "Kth Smallest Element in a BST - LeetCode 230",
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
      },
      "examples": [
        {
          "input": "root = [3,1,4,null,2], k = 1",
          "output": "1",
          "explanation": "The first inorder value is 1."
        },
        {
          "input": "root = [5,3,6,2,4,null,null,1], k = 3",
          "output": "3",
          "explanation": "The sorted values are [1,2,3,4,5,6]."
        },
        {
          "input": "root = [1], k = 1",
          "output": "1",
          "explanation": "The only value is kth."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Collect all values, sort, and index k - 1.",
      "optimizedComplexity": "Time O(h + k); Space O(h). Iterative inorder stops after k nodes.",
      "recursiveComplexity": "Time O(h + k); Space O(h). Recursive inorder stops when kth is found.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    Collections.sort(values);\n    return values.get(k - 1);\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.left, values);\n    collect(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int remaining;\n  private int answer;\n\n  public int kthSmallest(TreeNode root, int k) {\n    remaining = k;\n    inorder(root);\n    return answer;\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null || remaining == 0) return;\n    inorder(node.left);\n    if (--remaining == 0) { answer = node.val; return; }\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Lowest Common Ancestor of a Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST ancestor search using ordered split",
      "question": "Given a BST and two nodes p and q, return their lowest common ancestor.",
      "trigger": "In a BST, if both targets are smaller than current node go left, if both are larger go right; otherwise current node is the split point.",
      "intuition": "Walk from root toward p and q until their values diverge around current node or one equals current node.",
      "edgeCases": "p is ancestor of q, q is ancestor of p, root is LCA, both nodes on one side, two-node tree.",
      "constraints": "2 <= number of nodes <= 100000; all Node.val values are unique; p and q exist in the BST.",
      "source": {
        "label": "Lowest Common Ancestor of a Binary Search Tree - LeetCode 235",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
          "output": "6",
          "explanation": "2 and 8 split at root 6."
        },
        {
          "input": "same root, p = 2, q = 4",
          "output": "2",
          "explanation": "2 is an ancestor of 4."
        },
        {
          "input": "root = [2,1], p = 2, q = 1",
          "output": "2",
          "explanation": "Root is the LCA."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build root-to-node paths and compare them.",
      "optimizedComplexity": "Time O(h); Space O(1). Iterative BST split search follows one path.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive BST split search follows one path.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    List<TreeNode> pathP = new ArrayList<>();\n    List<TreeNode> pathQ = new ArrayList<>();\n    find(root, p, pathP);\n    find(root, q, pathQ);\n    TreeNode answer = null;\n    for (int i = 0; i < Math.min(pathP.size(), pathQ.size()) && pathP.get(i) == pathQ.get(i); i++) answer = pathP.get(i);\n    return answer;\n  }\n\n  private boolean find(TreeNode node, TreeNode target, List<TreeNode> path) {\n    if (node == null) return false;\n    path.add(node);\n    if (node == target || find(node.left, target, path) || find(node.right, target, path)) return true;\n    path.remove(path.size() - 1);\n    return false;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode current = root;\n    while (current != null) {\n      if (p.val < current.val && q.val < current.val) current = current.left;\n      else if (p.val > current.val && q.val > current.val) current = current.right;\n      else return current;\n    }\n    return null;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);\n    if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);\n    return root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode current = root;\n    while (current != null) {\n      if (p.val < current.val && q.val < current.val) current = current.left;\n      else if (p.val > current.val && q.val > current.val) current = current.right;\n      else return current;\n    }\n    return null;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode current = root;\n    while (current != null) {\n      if (p.val < current.val && q.val < current.val) current = current.left;\n      else if (p.val > current.val && q.val > current.val) current = current.right;\n      else return current;\n    }\n    return null;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Convert Sorted Array to Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "BST construction and balancing",
      "question": "Given a sorted integer array, convert it to a height-balanced BST.",
      "trigger": "A balanced BST from sorted data is built by choosing the middle value as root at every range.",
      "intuition": "Pick the middle element as root. Recursively build the left half and right half as subtrees.",
      "edgeCases": "One element, two elements, even length midpoint choice, negative values, empty array in variants.",
      "constraints": "1 <= nums.length <= 10000; -10000 <= nums[i] <= 10000; nums is strictly increasing.",
      "source": {
        "label": "Convert Sorted Array to Binary Search Tree - LeetCode 108",
        "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"
      },
      "examples": [
        {
          "input": "nums = [-10,-3,0,5,9]",
          "output": "[0,-3,9,-10,null,5]",
          "explanation": "One valid balanced BST uses 0 as root."
        },
        {
          "input": "nums = [1,3]",
          "output": "[1,null,3] or [3,1]",
          "explanation": "Both are height-balanced."
        },
        {
          "input": "nums = [1]",
          "output": "[1]",
          "explanation": "The only value becomes root."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) average; Space O(n). Insert sorted values into a self-chosen order after collecting mids.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative stack builds ranges.",
      "recursiveComplexity": "Time O(n); Space O(log n). Recursive midpoint construction creates each node once.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    TreeNode root = null;\n    for (int value : nums) root = insert(root, value);\n    return root;\n  }\n\n  private TreeNode insert(TreeNode node, int value) {\n    if (node == null) return new TreeNode(value);\n    if (value < node.val) node.left = insert(node.left, value);\n    else node.right = insert(node.right, value);\n    return node;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    if (nums.length == 0) return null;\n    TreeNode root = new TreeNode(0);\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, nums.length - 1));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = nums[mid];\n      if (state.left <= mid - 1) { state.node.left = new TreeNode(0); stack.push(new State(state.node.left, state.left, mid - 1)); }\n      if (mid + 1 <= state.right) { state.node.right = new TreeNode(0); stack.push(new State(state.node.right, mid + 1, state.right)); }\n    }\n    return root;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode node, int left, int right){this.node=node;this.left=left;this.right=right;} }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    return build(nums, 0, nums.length - 1);\n  }\n\n  private TreeNode build(int[] nums, int left, int right) {\n    if (left > right) return null;\n    int mid = left + (right - left) / 2;\n    TreeNode root = new TreeNode(nums[mid]);\n    root.left = build(nums, left, mid - 1);\n    root.right = build(nums, mid + 1, right);\n    return root;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    if (nums.length == 0) return null;\n    TreeNode root = new TreeNode(0);\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, nums.length - 1));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = nums[mid];\n      if (state.left <= mid - 1) { state.node.left = new TreeNode(0); stack.push(new State(state.node.left, state.left, mid - 1)); }\n      if (mid + 1 <= state.right) { state.node.right = new TreeNode(0); stack.push(new State(state.node.right, mid + 1, state.right)); }\n    }\n    return root;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode node, int left, int right){this.node=node;this.left=left;this.right=right;} }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode sortedArrayToBST(int[] nums) {\n    if (nums.length == 0) return null;\n    TreeNode root = new TreeNode(0);\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, 0, nums.length - 1));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = nums[mid];\n      if (state.left <= mid - 1) { state.node.left = new TreeNode(0); stack.push(new State(state.node.left, state.left, mid - 1)); }\n      if (mid + 1 <= state.right) { state.node.right = new TreeNode(0); stack.push(new State(state.node.right, mid + 1, state.right)); }\n    }\n    return root;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode node, int left, int right){this.node=node;this.left=left;this.right=right;} }\n}"
    },
    {
      "group": "core",
      "name": "Two Sum IV - Input is a BST",
      "difficulty": "Easy",
      "subpattern": "BST two-pointer and set search",
      "question": "Given the root of a BST and an integer k, return true if there exist two different nodes whose values sum to k.",
      "trigger": "BST inorder order gives a sorted list, enabling two pointers; a traversal with a set also detects complements.",
      "intuition": "Either collect inorder values and use two pointers, or traverse and check if k - node.val was seen.",
      "edgeCases": "Tree with one node, pair cannot reuse same node, negative values, duplicate values in variants, absent pair.",
      "constraints": "1 <= number of nodes <= 10000; -10000 <= Node.val <= 10000; -100000 <= k <= 100000.",
      "source": {
        "label": "Two Sum IV - Input is a BST - LeetCode 653",
        "url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/"
      },
      "examples": [
        {
          "input": "root = [5,3,6,2,4,null,7], k = 9",
          "output": "true",
          "explanation": "2 + 7 = 9."
        },
        {
          "input": "root = [5,3,6,2,4,null,7], k = 28",
          "output": "false",
          "explanation": "No pair sums to 28."
        },
        {
          "input": "root = [1], k = 2",
          "output": "false",
          "explanation": "One node cannot form a pair with itself."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Compare every pair of collected values.",
      "optimizedComplexity": "Time O(n); Space O(n). Inorder list plus two pointers scans once.",
      "recursiveComplexity": "Time O(n); Space O(n). DFS checks complements in a hash set.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean findTarget(TreeNode root, int k) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    for (int i = 0; i < values.size(); i++) {\n      for (int j = i + 1; j < values.size(); j++) {\n        if (values.get(i) + values.get(j) == k) return true;\n      }\n    }\n    return false;\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.left, values);\n    collect(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean findTarget(TreeNode root, int k) {\n    List<Integer> values = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      values.add(current.val);\n      current = current.right;\n    }\n    int left = 0, right = values.size() - 1;\n    while (left < right) {\n      int sum = values.get(left) + values.get(right);\n      if (sum == k) return true;\n      if (sum < k) left++;\n      else right--;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean findTarget(TreeNode root, int k) {\n    return dfs(root, k, new HashSet<>());\n  }\n\n  private boolean dfs(TreeNode node, int k, Set<Integer> seen) {\n    if (node == null) return false;\n    if (seen.contains(k - node.val)) return true;\n    seen.add(node.val);\n    return dfs(node.left, k, seen) || dfs(node.right, k, seen);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean findTarget(TreeNode root, int k) {\n    List<Integer> values = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      values.add(current.val);\n      current = current.right;\n    }\n    int left = 0, right = values.size() - 1;\n    while (left < right) {\n      int sum = values.get(left) + values.get(right);\n      if (sum == k) return true;\n      if (sum < k) left++;\n      else right--;\n    }\n    return false;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean findTarget(TreeNode root, int k) {\n    List<Integer> values = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      values.add(current.val);\n      current = current.right;\n    }\n    int left = 0, right = values.size() - 1;\n    while (left < right) {\n      int sum = values.get(left) + values.get(right);\n      if (sum == k) return true;\n      if (sum < k) left++;\n      else right--;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Absolute Difference in BST",
      "difficulty": "Easy",
      "subpattern": "BST inorder adjacent difference",
      "question": "Given the root of a BST, return the minimum absolute difference between values of any two different nodes.",
      "trigger": "Inorder traversal gives sorted values, so the minimum difference must occur between adjacent inorder values.",
      "intuition": "Track the previous inorder value and update the best difference at each node.",
      "edgeCases": "Exactly two nodes, skewed BST, values near 0, adjacent closest pair, no duplicates in original constraints.",
      "constraints": "2 <= number of nodes <= 10000; 0 <= Node.val <= 100000.",
      "source": {
        "label": "Minimum Absolute Difference in BST - LeetCode 530",
        "url": "https://leetcode.com/problems/minimum-absolute-difference-in-bst/"
      },
      "examples": [
        {
          "input": "root = [4,2,6,1,3]",
          "output": "1",
          "explanation": "Adjacent sorted pairs differ by 1."
        },
        {
          "input": "root = [1,0,48,null,null,12,49]",
          "output": "1",
          "explanation": "48 and 49 are closest."
        },
        {
          "input": "root = [2,1]",
          "output": "1",
          "explanation": "The only pair differs by 1."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Compare every pair of collected values.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder compares adjacent sorted values.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive inorder tracks previous value and best answer.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int getMinimumDifference(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    int best = Integer.MAX_VALUE;\n    for (int i = 0; i < values.size(); i++) {\n      for (int j = i + 1; j < values.size(); j++) best = Math.min(best, Math.abs(values.get(i) - values.get(j)));\n    }\n    return best;\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val); collect(node.left, values); collect(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int getMinimumDifference(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Integer previous = null;\n    int best = Integer.MAX_VALUE;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null) best = Math.min(best, current.val - previous);\n      previous = current.val;\n      current = current.right;\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private Integer previous = null;\n  private int best = Integer.MAX_VALUE;\n\n  public int getMinimumDifference(TreeNode root) {\n    inorder(root);\n    return best;\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null) return;\n    inorder(node.left);\n    if (previous != null) best = Math.min(best, node.val - previous);\n    previous = node.val;\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int getMinimumDifference(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Integer previous = null;\n    int best = Integer.MAX_VALUE;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null) best = Math.min(best, current.val - previous);\n      previous = current.val;\n      current = current.right;\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int getMinimumDifference(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Integer previous = null;\n    int best = Integer.MAX_VALUE;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null) best = Math.min(best, current.val - previous);\n      previous = current.val;\n      current = current.right;\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Sum of BST",
      "difficulty": "Easy",
      "subpattern": "BST range pruning",
      "question": "Given a BST root and integers low and high, return the sum of values of all nodes with low <= value <= high.",
      "trigger": "BST ordering allows entire subtrees to be skipped when node values are below low or above high.",
      "intuition": "If node.val < low, only the right subtree can contain valid values. If node.val > high, only the left subtree can contain valid values.",
      "edgeCases": "No nodes in range, all nodes in range, range includes root, skewed tree, low equals high.",
      "constraints": "1 <= number of nodes <= 20000; 1 <= Node.val <= 100000; 1 <= low <= high <= 100000.",
      "source": {
        "label": "Range Sum of BST - LeetCode 938",
        "url": "https://leetcode.com/problems/range-sum-of-bst/"
      },
      "examples": [
        {
          "input": "root = [10,5,15,3,7,null,18], low = 7, high = 15",
          "output": "32",
          "explanation": "7 + 10 + 15 = 32."
        },
        {
          "input": "root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10",
          "output": "23",
          "explanation": "6 + 7 + 10 = 23."
        },
        {
          "input": "root = [1], low = 2, high = 3",
          "output": "0",
          "explanation": "The only value is outside range."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(h). Traverse every node without pruning.",
      "optimizedComplexity": "Time O(m + h); Space O(h). Iterative DFS skips irrelevant subtrees, where m is nodes visited in/pruned near range.",
      "recursiveComplexity": "Time O(m + h); Space O(h). Recursive pruning skips impossible subtrees.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rangeSumBST(TreeNode root, int low, int high) {\n    if (root == null) return 0;\n    int sum = root.val >= low && root.val <= high ? root.val : 0;\n    return sum + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rangeSumBST(TreeNode root, int low, int high) {\n    int sum = 0;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      if (node == null) continue;\n      if (node.val >= low && node.val <= high) sum += node.val;\n      if (node.val > low) stack.push(node.left);\n      if (node.val < high) stack.push(node.right);\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rangeSumBST(TreeNode root, int low, int high) {\n    if (root == null) return 0;\n    if (root.val < low) return rangeSumBST(root.right, low, high);\n    if (root.val > high) return rangeSumBST(root.left, low, high);\n    return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rangeSumBST(TreeNode root, int low, int high) {\n    int sum = 0;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      if (node == null) continue;\n      if (node.val >= low && node.val <= high) sum += node.val;\n      if (node.val > low) stack.push(node.left);\n      if (node.val < high) stack.push(node.right);\n    }\n    return sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int rangeSumBST(TreeNode root, int low, int high) {\n    int sum = 0;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      if (node == null) continue;\n      if (node.val >= low && node.val <= high) sum += node.val;\n      if (node.val > low) stack.push(node.left);\n      if (node.val < high) stack.push(node.right);\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Increasing Order Search Tree",
      "difficulty": "Easy",
      "subpattern": "BST inorder rewiring",
      "question": "Given the root of a BST, rearrange the tree in increasing order so the leftmost node becomes the new root and every node has no left child and only one right child.",
      "trigger": "The target order is exactly inorder traversal of the BST.",
      "intuition": "Visit nodes in inorder and append each node to the right of a running tail, clearing left pointers.",
      "edgeCases": "One node, skewed right tree, skewed left tree, preserving existing nodes, clearing every left pointer.",
      "constraints": "1 <= number of nodes <= 100; 0 <= Node.val <= 1000.",
      "source": {
        "label": "Increasing Order Search Tree - LeetCode 897",
        "url": "https://leetcode.com/problems/increasing-order-search-tree/"
      },
      "examples": [
        {
          "input": "root = [5,3,6,2,4,null,8,1,null,null,null,7,9]",
          "output": "[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]",
          "explanation": "The right chain follows inorder order."
        },
        {
          "input": "root = [5,1,7]",
          "output": "[1,null,5,null,7]",
          "explanation": "Values are rearranged ascending."
        },
        {
          "input": "root = [1]",
          "output": "[1]",
          "explanation": "A single node already satisfies the shape."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store inorder values and build new nodes.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder rewires existing nodes.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive inorder appends nodes to a tail pointer.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode increasingBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    inorder(root, values);\n    TreeNode dummy = new TreeNode(0);\n    TreeNode tail = dummy;\n    for (int value : values) {\n      tail.right = new TreeNode(value);\n      tail = tail.right;\n    }\n    return dummy.right;\n  }\n\n  private void inorder(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    inorder(node.left, values);\n    values.add(node.val);\n    inorder(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode increasingBST(TreeNode root) {\n    TreeNode dummy = new TreeNode(0);\n    TreeNode tail = dummy;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      current.left = null;\n      tail.right = current;\n      tail = current;\n      current = current.right;\n    }\n    return dummy.right;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private TreeNode tail;\n\n  public TreeNode increasingBST(TreeNode root) {\n    TreeNode dummy = new TreeNode(0);\n    tail = dummy;\n    inorder(root);\n    return dummy.right;\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null) return;\n    inorder(node.left);\n    node.left = null;\n    tail.right = node;\n    tail = node;\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode increasingBST(TreeNode root) {\n    TreeNode dummy = new TreeNode(0);\n    TreeNode tail = dummy;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      current.left = null;\n      tail.right = current;\n      tail = current;\n      current = current.right;\n    }\n    return dummy.right;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode increasingBST(TreeNode root) {\n    TreeNode dummy = new TreeNode(0);\n    TreeNode tail = dummy;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      current.left = null;\n      tail.right = current;\n      tail = current;\n      current = current.right;\n    }\n    return dummy.right;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Recover Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST inorder anomaly detection",
      "question": "Two nodes of a BST were swapped by mistake. Recover the tree without changing its structure.",
      "trigger": "A valid BST inorder traversal is strictly sorted; two swapped nodes create one or two inversions.",
      "intuition": "Track previous node during inorder. The first inversion identifies the first swapped node; every inversion updates the second.",
      "edgeCases": "Adjacent swapped nodes, non-adjacent swapped nodes, root swapped, two-node tree, already valid variants.",
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
          "explanation": "A valid tree remains valid in no-op variants."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Collect nodes and sorted values, then rewrite mismatches.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder detects the two swapped nodes.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive inorder detects inversions.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    List<TreeNode> nodes = new ArrayList<>();\n    inorder(root, nodes);\n    List<Integer> values = new ArrayList<>();\n    for (TreeNode node : nodes) values.add(node.val);\n    Collections.sort(values);\n    for (int i = 0; i < nodes.size(); i++) nodes.get(i).val = values.get(i);\n  }\n\n  private void inorder(TreeNode node, List<TreeNode> nodes) {\n    if (node == null) return;\n    inorder(node.left, nodes);\n    nodes.add(node);\n    inorder(node.right, nodes);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    TreeNode first = null, second = null, previous = null;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && previous.val > current.val) {\n        if (first == null) first = previous;\n        second = current;\n      }\n      previous = current;\n      current = current.right;\n    }\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private TreeNode first;\n  private TreeNode second;\n  private TreeNode previous;\n\n  public void recoverTree(TreeNode root) {\n    inorder(root);\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null) return;\n    inorder(node.left);\n    if (previous != null && previous.val > node.val) {\n      if (first == null) first = previous;\n      second = node;\n    }\n    previous = node;\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    TreeNode first = null, second = null, previous = null;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && previous.val > current.val) {\n        if (first == null) first = previous;\n        second = current;\n      }\n      previous = current;\n      current = current.right;\n    }\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public void recoverTree(TreeNode root) {\n    TreeNode first = null, second = null, previous = null;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && previous.val > current.val) {\n        if (first == null) first = previous;\n        second = current;\n      }\n      previous = current;\n      current = current.right;\n    }\n    int temp = first.val;\n    first.val = second.val;\n    second.val = temp;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Balance a Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST construction and balancing",
      "question": "Given the root of a BST, return a balanced BST containing the same node values.",
      "trigger": "BST inorder traversal gives sorted values; a balanced BST is built by repeatedly choosing middle values as roots.",
      "intuition": "Collect sorted values by inorder, then build a height-balanced tree from the sorted list.",
      "edgeCases": "Already balanced tree, completely skewed tree, one node, preserving values not original nodes, even number of nodes.",
      "constraints": "1 <= number of nodes <= 10000; 1 <= Node.val <= 100000.",
      "source": {
        "label": "Balance a Binary Search Tree - LeetCode 1382",
        "url": "https://leetcode.com/problems/balance-a-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [1,null,2,null,3,null,4]",
          "output": "balanced BST with values [1,2,3,4]",
          "explanation": "A skewed tree is rebuilt with smaller height."
        },
        {
          "input": "root = [2,1,3]",
          "output": "[2,1,3]",
          "explanation": "Already balanced tree may remain unchanged."
        },
        {
          "input": "root = [1]",
          "output": "[1]",
          "explanation": "One node is balanced."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) average; Space O(n). Collect values and insert them in median order into a new BST.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative inorder plus iterative range construction builds balanced tree.",
      "recursiveComplexity": "Time O(n); Space O(n). Inorder list plus recursive middle construction.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode balanceBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    inorder(root, values);\n    TreeNode rebuilt = null;\n    for (int value : values) rebuilt = insert(rebuilt, value);\n    return rebuilt;\n  }\n\n  private void inorder(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    inorder(node.left, values); values.add(node.val); inorder(node.right, values);\n  }\n\n  private TreeNode insert(TreeNode node, int value) {\n    if (node == null) return new TreeNode(value);\n    if (value < node.val) node.left = insert(node.left, value);\n    else node.right = insert(node.right, value);\n    return node;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode balanceBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      values.add(current.val);\n      current = current.right;\n    }\n    if (values.isEmpty()) return null;\n    TreeNode newRoot = new TreeNode(0);\n    Deque<State> ranges = new ArrayDeque<>();\n    ranges.push(new State(newRoot, 0, values.size() - 1));\n    while (!ranges.isEmpty()) {\n      State state = ranges.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = values.get(mid);\n      if (state.left <= mid - 1) { state.node.left = new TreeNode(0); ranges.push(new State(state.node.left, state.left, mid - 1)); }\n      if (mid + 1 <= state.right) { state.node.right = new TreeNode(0); ranges.push(new State(state.node.right, mid + 1, state.right)); }\n    }\n    return newRoot;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode node, int left, int right){this.node=node;this.left=left;this.right=right;} }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode balanceBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    inorder(root, values);\n    return build(values, 0, values.size() - 1);\n  }\n\n  private void inorder(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    inorder(node.left, values);\n    values.add(node.val);\n    inorder(node.right, values);\n  }\n\n  private TreeNode build(List<Integer> values, int left, int right) {\n    if (left > right) return null;\n    int mid = left + (right - left) / 2;\n    TreeNode root = new TreeNode(values.get(mid));\n    root.left = build(values, left, mid - 1);\n    root.right = build(values, mid + 1, right);\n    return root;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode balanceBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      values.add(current.val);\n      current = current.right;\n    }\n    if (values.isEmpty()) return null;\n    TreeNode newRoot = new TreeNode(0);\n    Deque<State> ranges = new ArrayDeque<>();\n    ranges.push(new State(newRoot, 0, values.size() - 1));\n    while (!ranges.isEmpty()) {\n      State state = ranges.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = values.get(mid);\n      if (state.left <= mid - 1) { state.node.left = new TreeNode(0); ranges.push(new State(state.node.left, state.left, mid - 1)); }\n      if (mid + 1 <= state.right) { state.node.right = new TreeNode(0); ranges.push(new State(state.node.right, mid + 1, state.right)); }\n    }\n    return newRoot;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode node, int left, int right){this.node=node;this.left=left;this.right=right;} }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode balanceBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      values.add(current.val);\n      current = current.right;\n    }\n    if (values.isEmpty()) return null;\n    TreeNode newRoot = new TreeNode(0);\n    Deque<State> ranges = new ArrayDeque<>();\n    ranges.push(new State(newRoot, 0, values.size() - 1));\n    while (!ranges.isEmpty()) {\n      State state = ranges.pop();\n      int mid = state.left + (state.right - state.left) / 2;\n      state.node.val = values.get(mid);\n      if (state.left <= mid - 1) { state.node.left = new TreeNode(0); ranges.push(new State(state.node.left, state.left, mid - 1)); }\n      if (mid + 1 <= state.right) { state.node.right = new TreeNode(0); ranges.push(new State(state.node.right, mid + 1, state.right)); }\n    }\n    return newRoot;\n  }\n\n  private static class State { TreeNode node; int left, right; State(TreeNode node, int left, int right){this.node=node;this.left=left;this.right=right;} }\n}"
    },
    {
      "group": "advanced",
      "name": "Trim a Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "BST range pruning and trimming",
      "question": "Given a BST root and range [low, high], trim the tree so every node value lies in the range while preserving relative ancestor-child structure among remaining nodes.",
      "trigger": "BST ordering tells which entire side must be discarded when a node is below low or above high.",
      "intuition": "If root.val < low, the valid tree is in root.right. If root.val > high, it is in root.left. Otherwise trim both children.",
      "edgeCases": "Root removed, all nodes removed, no nodes removed, one-sided tree, low equals high.",
      "constraints": "1 <= number of nodes <= 10000; 0 <= Node.val <= 10000; 0 <= low <= high <= 10000.",
      "source": {
        "label": "Trim a Binary Search Tree - LeetCode 669",
        "url": "https://leetcode.com/problems/trim-a-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [1,0,2], low = 1, high = 2",
          "output": "[1,null,2]",
          "explanation": "0 is removed."
        },
        {
          "input": "root = [3,0,4,null,2,null,null,1], low = 1, high = 3",
          "output": "[3,2,null,1]",
          "explanation": "0 and 4 are trimmed."
        },
        {
          "input": "root = [1], low = 1, high = 1",
          "output": "[1]",
          "explanation": "Root remains."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) average; Space O(n). Collect values in range and rebuild a BST.",
      "optimizedComplexity": "Time O(n); Space O(1). Iteratively find valid root and trim invalid boundary chains.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive trimming skips invalid subtrees by range.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode trimBST(TreeNode root, int low, int high) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, low, high, values);\n    TreeNode trimmed = null;\n    for (int value : values) trimmed = insert(trimmed, value);\n    return trimmed;\n  }\n\n  private void collect(TreeNode node, int low, int high, List<Integer> values) {\n    if (node == null) return;\n    if (node.val >= low && node.val <= high) values.add(node.val);\n    collect(node.left, low, high, values);\n    collect(node.right, low, high, values);\n  }\n\n  private TreeNode insert(TreeNode node, int value) {\n    if (node == null) return new TreeNode(value);\n    if (value < node.val) node.left = insert(node.left, value);\n    else node.right = insert(node.right, value);\n    return node;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode trimBST(TreeNode root, int low, int high) {\n    while (root != null && (root.val < low || root.val > high)) {\n      root = root.val < low ? root.right : root.left;\n    }\n    TreeNode current = root;\n    while (current != null) {\n      while (current.left != null && current.left.val < low) current.left = current.left.right;\n      current = current.left;\n    }\n    current = root;\n    while (current != null) {\n      while (current.right != null && current.right.val > high) current.right = current.right.left;\n      current = current.right;\n    }\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode trimBST(TreeNode root, int low, int high) {\n    if (root == null) return null;\n    if (root.val < low) return trimBST(root.right, low, high);\n    if (root.val > high) return trimBST(root.left, low, high);\n    root.left = trimBST(root.left, low, high);\n    root.right = trimBST(root.right, low, high);\n    return root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode trimBST(TreeNode root, int low, int high) {\n    while (root != null && (root.val < low || root.val > high)) {\n      root = root.val < low ? root.right : root.left;\n    }\n    TreeNode current = root;\n    while (current != null) {\n      while (current.left != null && current.left.val < low) current.left = current.left.right;\n      current = current.left;\n    }\n    current = root;\n    while (current != null) {\n      while (current.right != null && current.right.val > high) current.right = current.right.left;\n      current = current.right;\n    }\n    return root;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode trimBST(TreeNode root, int low, int high) {\n    while (root != null && (root.val < low || root.val > high)) {\n      root = root.val < low ? root.right : root.left;\n    }\n    TreeNode current = root;\n    while (current != null) {\n      while (current.left != null && current.left.val < low) current.left = current.left.right;\n      current = current.left;\n    }\n    current = root;\n    while (current != null) {\n      while (current.right != null && current.right.val > high) current.right = current.right.left;\n      current = current.right;\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Construct BST from Preorder Traversal",
      "difficulty": "Medium",
      "subpattern": "BST construction from preorder bounds",
      "question": "Given preorder traversal of a BST, construct the tree and return its root.",
      "trigger": "Preorder visits root before subtrees, and BST bounds determine where each next value belongs.",
      "intuition": "Consume preorder left to right. A value can be placed only if it is within the current low/high bounds.",
      "edgeCases": "One node, ascending preorder, descending preorder, balanced preorder, maintaining index across recursive calls.",
      "constraints": "1 <= preorder.length <= 100; 1 <= preorder[i] <= 1000; all values are unique.",
      "source": {
        "label": "Construct Binary Search Tree from Preorder Traversal - LeetCode 1008",
        "url": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/"
      },
      "examples": [
        {
          "input": "preorder = [8,5,1,7,10,12]",
          "output": "[8,5,10,1,7,null,12]",
          "explanation": "Values are inserted respecting BST preorder structure."
        },
        {
          "input": "preorder = [1,3]",
          "output": "[1,null,3]",
          "explanation": "3 is the right child."
        },
        {
          "input": "preorder = [2,1]",
          "output": "[2,1]",
          "explanation": "1 is the left child."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(h). Insert preorder values one by one into a BST.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative stack links nodes by preorder transitions.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive bounds consume each value once.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstFromPreorder(int[] preorder) {\n    TreeNode root = null;\n    for (int value : preorder) root = insert(root, value);\n    return root;\n  }\n\n  private TreeNode insert(TreeNode node, int value) {\n    if (node == null) return new TreeNode(value);\n    if (value < node.val) node.left = insert(node.left, value);\n    else node.right = insert(node.right, value);\n    return node;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstFromPreorder(int[] preorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    for (int i = 1; i < preorder.length; i++) {\n      TreeNode node = new TreeNode(preorder[i]);\n      if (preorder[i] < stack.peek().val) {\n        stack.peek().left = node;\n      } else {\n        TreeNode parent = null;\n        while (!stack.isEmpty() && preorder[i] > stack.peek().val) parent = stack.pop();\n        parent.right = node;\n      }\n      stack.push(node);\n    }\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int index = 0;\n\n  public TreeNode bstFromPreorder(int[] preorder) {\n    return build(preorder, Integer.MIN_VALUE, Integer.MAX_VALUE);\n  }\n\n  private TreeNode build(int[] preorder, int low, int high) {\n    if (index == preorder.length) return null;\n    int value = preorder[index];\n    if (value < low || value > high) return null;\n    index++;\n    TreeNode root = new TreeNode(value);\n    root.left = build(preorder, low, value);\n    root.right = build(preorder, value, high);\n    return root;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstFromPreorder(int[] preorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    for (int i = 1; i < preorder.length; i++) {\n      TreeNode node = new TreeNode(preorder[i]);\n      if (preorder[i] < stack.peek().val) {\n        stack.peek().left = node;\n      } else {\n        TreeNode parent = null;\n        while (!stack.isEmpty() && preorder[i] > stack.peek().val) parent = stack.pop();\n        parent.right = node;\n      }\n      stack.push(node);\n    }\n    return root;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstFromPreorder(int[] preorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    for (int i = 1; i < preorder.length; i++) {\n      TreeNode node = new TreeNode(preorder[i]);\n      if (preorder[i] < stack.peek().val) {\n        stack.peek().left = node;\n      } else {\n        TreeNode parent = null;\n        while (!stack.isEmpty() && preorder[i] > stack.peek().val) parent = stack.pop();\n        parent.right = node;\n      }\n      stack.push(node);\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Unique Binary Search Trees",
      "difficulty": "Medium",
      "subpattern": "BST counting with Catalan DP",
      "question": "Given n, return the number of structurally unique BSTs that store values 1 through n.",
      "trigger": "Choosing each value as root splits the remaining values into independent left and right BST ranges.",
      "intuition": "dp[n] is sum over roots of dp[leftSize] * dp[rightSize]. This is the Catalan recurrence.",
      "edgeCases": "n = 1, empty subtree count as 1, multiplication of left/right counts, medium n within int range.",
      "constraints": "1 <= n <= 19.",
      "source": {
        "label": "Unique Binary Search Trees - LeetCode 96",
        "url": "https://leetcode.com/problems/unique-binary-search-trees/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "5",
          "explanation": "There are five structurally unique BSTs."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "Only one tree can be formed."
        },
        {
          "input": "n = 2",
          "output": "2",
          "explanation": "Either 1 or 2 can be root."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(n). Plain recursion recomputes range counts repeatedly.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Bottom-up Catalan DP computes each size once.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Memoized recursion caches counts by subtree size.",
      "bruteForceCode": "class Solution {\n  public int numTrees(int n) {\n    if (n <= 1) return 1;\n    int total = 0;\n    for (int root = 1; root <= n; root++) {\n      total += numTrees(root - 1) * numTrees(n - root);\n    }\n    return total;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numTrees(int n) {\n    int[] dp = new int[n + 1];\n    dp[0] = 1;\n    dp[1] = 1;\n    for (int nodes = 2; nodes <= n; nodes++) {\n      for (int root = 1; root <= nodes; root++) {\n        dp[nodes] += dp[root - 1] * dp[nodes - root];\n      }\n    }\n    return dp[n];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numTrees(int n) {\n    int[] memo = new int[n + 1];\n    Arrays.fill(memo, -1);\n    return count(n, memo);\n  }\n\n  private int count(int nodes, int[] memo) {\n    if (nodes <= 1) return 1;\n    if (memo[nodes] != -1) return memo[nodes];\n    int total = 0;\n    for (int root = 1; root <= nodes; root++) {\n      total += count(root - 1, memo) * count(nodes - root, memo);\n    }\n    memo[nodes] = total;\n    return total;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numTrees(int n) {\n    int[] dp = new int[n + 1];\n    dp[0] = 1;\n    dp[1] = 1;\n    for (int nodes = 2; nodes <= n; nodes++) {\n      for (int root = 1; root <= nodes; root++) {\n        dp[nodes] += dp[root - 1] * dp[nodes - root];\n      }\n    }\n    return dp[n];\n  }\n}",
      "code": "class Solution {\n  public int numTrees(int n) {\n    int[] dp = new int[n + 1];\n    dp[0] = 1;\n    dp[1] = 1;\n    for (int nodes = 2; nodes <= n; nodes++) {\n      for (int root = 1; root <= nodes; root++) {\n        dp[nodes] += dp[root - 1] * dp[nodes - root];\n      }\n    }\n    return dp[n];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Unique Binary Search Trees II",
      "difficulty": "Medium",
      "subpattern": "BST generation from value ranges",
      "question": "Given n, generate all structurally unique BSTs that store values 1 through n.",
      "trigger": "Each possible root value splits the range into independent left and right generated subtree lists.",
      "intuition": "For each root, recursively generate all left trees and right trees, then combine every pair under the root.",
      "edgeCases": "n = 1, empty left/right subtree represented by null, copying structures by construction, Catalan output size.",
      "constraints": "1 <= n <= 8.",
      "source": {
        "label": "Unique Binary Search Trees II - LeetCode 95",
        "url": "https://leetcode.com/problems/unique-binary-search-trees-ii/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "five unique BST roots",
          "explanation": "All five structures for values 1..3 are generated."
        },
        {
          "input": "n = 1",
          "output": "[[1]]",
          "explanation": "Only one tree exists."
        },
        {
          "input": "n = 2",
          "output": "[[1,null,2],[2,1]]",
          "explanation": "Either value can be the root."
        }
      ],
      "bruteForceComplexity": "Time super-exponential if every permutation is inserted then deduplicated; Space proportional to generated trees.",
      "optimizedComplexity": "Time O(Cn * n); Space O(Cn * n). Iterative DP builds trees by interval length.",
      "recursiveComplexity": "Time O(Cn * n); Space O(Cn * n). Recursive range generation creates Catalan many trees.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> generateTrees(int n) {\n    Set<String> seen = new HashSet<>();\n    List<TreeNode> answer = new ArrayList<>();\n    int[] nums = new int[n];\n    for (int i = 0; i < n; i++) nums[i] = i + 1;\n    permute(nums, 0, seen, answer);\n    return answer;\n  }\n\n  private void permute(int[] nums, int index, Set<String> seen, List<TreeNode> answer) {\n    if (index == nums.length) {\n      TreeNode root = null;\n      for (int value : nums) root = insert(root, value);\n      String key = serialize(root);\n      if (seen.add(key)) answer.add(root);\n      return;\n    }\n    for (int i = index; i < nums.length; i++) { swap(nums, index, i); permute(nums, index + 1, seen, answer); swap(nums, index, i); }\n  }\n\n  private TreeNode insert(TreeNode node, int value) { if (node == null) return new TreeNode(value); if (value < node.val) node.left = insert(node.left, value); else node.right = insert(node.right, value); return node; }\n  private String serialize(TreeNode node) { return node == null ? \"#\" : node.val + \",\" + serialize(node.left) + \",\" + serialize(node.right); }\n  private void swap(int[] nums, int i, int j) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> generateTrees(int n) {\n    List<TreeNode>[][] dp = new ArrayList[n + 2][n + 2];\n    for (int i = 1; i <= n + 1; i++) {\n      dp[i][i - 1] = new ArrayList<>();\n      dp[i][i - 1].add(null);\n    }\n    for (int len = 1; len <= n; len++) {\n      for (int left = 1; left + len - 1 <= n; left++) {\n        int right = left + len - 1;\n        dp[left][right] = new ArrayList<>();\n        for (int root = left; root <= right; root++) {\n          for (TreeNode l : dp[left][root - 1]) for (TreeNode r : dp[root + 1][right]) {\n            dp[left][right].add(new TreeNode(root, l, r));\n          }\n        }\n      }\n    }\n    return dp[1][n];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> generateTrees(int n) {\n    return build(1, n);\n  }\n\n  private List<TreeNode> build(int left, int right) {\n    List<TreeNode> answer = new ArrayList<>();\n    if (left > right) {\n      answer.add(null);\n      return answer;\n    }\n    for (int root = left; root <= right; root++) {\n      for (TreeNode l : build(left, root - 1)) {\n        for (TreeNode r : build(root + 1, right)) {\n          answer.add(new TreeNode(root, l, r));\n        }\n      }\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> generateTrees(int n) {\n    List<TreeNode>[][] dp = new ArrayList[n + 2][n + 2];\n    for (int i = 1; i <= n + 1; i++) {\n      dp[i][i - 1] = new ArrayList<>();\n      dp[i][i - 1].add(null);\n    }\n    for (int len = 1; len <= n; len++) {\n      for (int left = 1; left + len - 1 <= n; left++) {\n        int right = left + len - 1;\n        dp[left][right] = new ArrayList<>();\n        for (int root = left; root <= right; root++) {\n          for (TreeNode l : dp[left][root - 1]) for (TreeNode r : dp[root + 1][right]) {\n            dp[left][right].add(new TreeNode(root, l, r));\n          }\n        }\n      }\n    }\n    return dp[1][n];\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> generateTrees(int n) {\n    List<TreeNode>[][] dp = new ArrayList[n + 2][n + 2];\n    for (int i = 1; i <= n + 1; i++) {\n      dp[i][i - 1] = new ArrayList<>();\n      dp[i][i - 1].add(null);\n    }\n    for (int len = 1; len <= n; len++) {\n      for (int left = 1; left + len - 1 <= n; left++) {\n        int right = left + len - 1;\n        dp[left][right] = new ArrayList<>();\n        for (int root = left; root <= right; root++) {\n          for (TreeNode l : dp[left][root - 1]) for (TreeNode r : dp[root + 1][right]) {\n            dp[left][right].add(new TreeNode(root, l, r));\n          }\n        }\n      }\n    }\n    return dp[1][n];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Closest Binary Search Tree Value",
      "difficulty": "Easy",
      "subpattern": "BST ordered closest-value search",
      "question": "Given the root of a BST and a target double, return the value in the BST closest to target.",
      "trigger": "BST ordering lets search move toward target while maintaining the closest value seen so far.",
      "intuition": "At each node update closest if current value is nearer. Move left if target is smaller, otherwise right.",
      "edgeCases": "Target below all values, target above all values, exact match, single node, tie behavior can return either closest value.",
      "constraints": "1 <= number of nodes <= 10000; -1000000000 <= Node.val <= 1000000000; target is a double.",
      "source": {
        "label": "Closest Binary Search Tree Value - LeetCode 270",
        "url": "https://leetcode.com/problems/closest-binary-search-tree-value/"
      },
      "examples": [
        {
          "input": "root = [4,2,5,1,3], target = 3.714286",
          "output": "4",
          "explanation": "4 is closest to the target."
        },
        {
          "input": "root = [1], target = 4.428571",
          "output": "1",
          "explanation": "Only one value exists."
        },
        {
          "input": "root = [2,1,3], target = 3.0",
          "output": "3",
          "explanation": "Exact match is closest."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(h). Traverse every node and compare distance.",
      "optimizedComplexity": "Time O(h); Space O(1). Iterative BST search follows the target direction.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive search tracks closest value.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int closestValue(TreeNode root, double target) {\n    int[] closest = {root.val};\n    scan(root, target, closest);\n    return closest[0];\n  }\n\n  private void scan(TreeNode node, double target, int[] closest) {\n    if (node == null) return;\n    if (Math.abs(node.val - target) < Math.abs(closest[0] - target)) closest[0] = node.val;\n    scan(node.left, target, closest);\n    scan(node.right, target, closest);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int closestValue(TreeNode root, double target) {\n    int closest = root.val;\n    TreeNode current = root;\n    while (current != null) {\n      if (Math.abs(current.val - target) < Math.abs(closest - target)) closest = current.val;\n      current = target < current.val ? current.left : current.right;\n    }\n    return closest;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int closestValue(TreeNode root, double target) {\n    return search(root, target, root.val);\n  }\n\n  private int search(TreeNode node, double target, int closest) {\n    if (node == null) return closest;\n    if (Math.abs(node.val - target) < Math.abs(closest - target)) closest = node.val;\n    if (target < node.val) return search(node.left, target, closest);\n    return search(node.right, target, closest);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int closestValue(TreeNode root, double target) {\n    int closest = root.val;\n    TreeNode current = root;\n    while (current != null) {\n      if (Math.abs(current.val - target) < Math.abs(closest - target)) closest = current.val;\n      current = target < current.val ? current.left : current.right;\n    }\n    return closest;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int closestValue(TreeNode root, double target) {\n    int closest = root.val;\n    TreeNode current = root;\n    while (current != null) {\n      if (Math.abs(current.val - target) < Math.abs(closest - target)) closest = current.val;\n      current = target < current.val ? current.left : current.right;\n    }\n    return closest;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Closest Binary Search Tree Value II",
      "difficulty": "Hard",
      "subpattern": "BST predecessor/successor and top-k closest",
      "question": "Given a non-empty BST, a target double, and integer k, return k values in the BST that are closest to target.",
      "trigger": "BST inorder order allows closest values to be found by comparing predecessor and successor streams around target.",
      "intuition": "Build predecessor stack for values <= target and successor stack for values > target. Repeatedly take the side with smaller distance.",
      "edgeCases": "k = 1, k = number of nodes, target below min, target above max, duplicate distance ties, empty predecessor or successor stack.",
      "constraints": "1 <= k <= number of nodes <= 10000; target is a double; all node values are unique in common variants.",
      "source": {
        "label": "Closest Binary Search Tree Value II - LeetCode 272",
        "url": "https://leetcode.com/problems/closest-binary-search-tree-value-ii/"
      },
      "examples": [
        {
          "input": "root = [4,2,5,1,3], target = 3.714286, k = 2",
          "output": "[4,3]",
          "explanation": "4 and 3 are the two closest values."
        },
        {
          "input": "root = [1], target = 0.0, k = 1",
          "output": "[1]",
          "explanation": "Only one node exists."
        },
        {
          "input": "root = [2,1,3], target = 10.0, k = 2",
          "output": "[3,2]",
          "explanation": "Largest values are closest when target is above all nodes."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Collect all values and sort by distance to target.",
      "optimizedComplexity": "Time O(h + k); Space O(h + k). Two stacks generate predecessor and successor values lazily.",
      "recursiveComplexity": "Time O(n log k); Space O(h + k). DFS maintains a max-heap of k closest values.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> closestKValues(TreeNode root, double target, int k) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    values.sort((a, b) -> Double.compare(Math.abs(a - target), Math.abs(b - target)));\n    return values.subList(0, k);\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.left, values);\n    collect(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> closestKValues(TreeNode root, double target, int k) {\n    Deque<TreeNode> predecessors = new ArrayDeque<>();\n    Deque<TreeNode> successors = new ArrayDeque<>();\n    initPredecessors(root, target, predecessors);\n    initSuccessors(root, target, successors);\n    List<Integer> answer = new ArrayList<>();\n    while (k-- > 0) {\n      if (predecessors.isEmpty()) answer.add(nextSuccessor(successors));\n      else if (successors.isEmpty()) answer.add(nextPredecessor(predecessors));\n      else if (Math.abs(predecessors.peek().val - target) <= Math.abs(successors.peek().val - target)) answer.add(nextPredecessor(predecessors));\n      else answer.add(nextSuccessor(successors));\n    }\n    return answer;\n  }\n\n  private void initPredecessors(TreeNode node, double target, Deque<TreeNode> stack) {\n    while (node != null) {\n      if (node.val <= target) { stack.push(node); node = node.right; }\n      else node = node.left;\n    }\n  }\n\n  private void initSuccessors(TreeNode node, double target, Deque<TreeNode> stack) {\n    while (node != null) {\n      if (node.val > target) { stack.push(node); node = node.left; }\n      else node = node.right;\n    }\n  }\n\n  private int nextPredecessor(Deque<TreeNode> stack) {\n    TreeNode node = stack.pop();\n    int value = node.val;\n    node = node.left;\n    while (node != null) { stack.push(node); node = node.right; }\n    return value;\n  }\n\n  private int nextSuccessor(Deque<TreeNode> stack) {\n    TreeNode node = stack.pop();\n    int value = node.val;\n    node = node.right;\n    while (node != null) { stack.push(node); node = node.left; }\n    return value;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> closestKValues(TreeNode root, double target, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> Double.compare(Math.abs(b - target), Math.abs(a - target)));\n    dfs(root, target, k, heap);\n    return new ArrayList<>(heap);\n  }\n\n  private void dfs(TreeNode node, double target, int k, PriorityQueue<Integer> heap) {\n    if (node == null) return;\n    heap.offer(node.val);\n    if (heap.size() > k) heap.poll();\n    dfs(node.left, target, k, heap);\n    dfs(node.right, target, k, heap);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> closestKValues(TreeNode root, double target, int k) {\n    Deque<TreeNode> predecessors = new ArrayDeque<>();\n    Deque<TreeNode> successors = new ArrayDeque<>();\n    initPredecessors(root, target, predecessors);\n    initSuccessors(root, target, successors);\n    List<Integer> answer = new ArrayList<>();\n    while (k-- > 0) {\n      if (predecessors.isEmpty()) answer.add(nextSuccessor(successors));\n      else if (successors.isEmpty()) answer.add(nextPredecessor(predecessors));\n      else if (Math.abs(predecessors.peek().val - target) <= Math.abs(successors.peek().val - target)) answer.add(nextPredecessor(predecessors));\n      else answer.add(nextSuccessor(successors));\n    }\n    return answer;\n  }\n\n  private void initPredecessors(TreeNode node, double target, Deque<TreeNode> stack) {\n    while (node != null) {\n      if (node.val <= target) { stack.push(node); node = node.right; }\n      else node = node.left;\n    }\n  }\n\n  private void initSuccessors(TreeNode node, double target, Deque<TreeNode> stack) {\n    while (node != null) {\n      if (node.val > target) { stack.push(node); node = node.left; }\n      else node = node.right;\n    }\n  }\n\n  private int nextPredecessor(Deque<TreeNode> stack) {\n    TreeNode node = stack.pop();\n    int value = node.val;\n    node = node.left;\n    while (node != null) { stack.push(node); node = node.right; }\n    return value;\n  }\n\n  private int nextSuccessor(Deque<TreeNode> stack) {\n    TreeNode node = stack.pop();\n    int value = node.val;\n    node = node.right;\n    while (node != null) { stack.push(node); node = node.left; }\n    return value;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> closestKValues(TreeNode root, double target, int k) {\n    Deque<TreeNode> predecessors = new ArrayDeque<>();\n    Deque<TreeNode> successors = new ArrayDeque<>();\n    initPredecessors(root, target, predecessors);\n    initSuccessors(root, target, successors);\n    List<Integer> answer = new ArrayList<>();\n    while (k-- > 0) {\n      if (predecessors.isEmpty()) answer.add(nextSuccessor(successors));\n      else if (successors.isEmpty()) answer.add(nextPredecessor(predecessors));\n      else if (Math.abs(predecessors.peek().val - target) <= Math.abs(successors.peek().val - target)) answer.add(nextPredecessor(predecessors));\n      else answer.add(nextSuccessor(successors));\n    }\n    return answer;\n  }\n\n  private void initPredecessors(TreeNode node, double target, Deque<TreeNode> stack) {\n    while (node != null) {\n      if (node.val <= target) { stack.push(node); node = node.right; }\n      else node = node.left;\n    }\n  }\n\n  private void initSuccessors(TreeNode node, double target, Deque<TreeNode> stack) {\n    while (node != null) {\n      if (node.val > target) { stack.push(node); node = node.left; }\n      else node = node.right;\n    }\n  }\n\n  private int nextPredecessor(Deque<TreeNode> stack) {\n    TreeNode node = stack.pop();\n    int value = node.val;\n    node = node.left;\n    while (node != null) { stack.push(node); node = node.right; }\n    return value;\n  }\n\n  private int nextSuccessor(Deque<TreeNode> stack) {\n    TreeNode node = stack.pop();\n    int value = node.val;\n    node = node.right;\n    while (node != null) { stack.push(node); node = node.left; }\n    return value;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Binary Search Tree Iterator",
      "difficulty": "Medium",
      "subpattern": "BST lazy inorder iterator",
      "question": "Design an iterator over a BST that supports next() returning the next smallest value and hasNext() indicating whether another value exists.",
      "trigger": "Inorder traversal gives sorted order, and a stack can lazily hold the path to the next smallest node.",
      "intuition": "Push all left nodes from the current subtree. next pops the top, then pushes the left spine of its right subtree.",
      "edgeCases": "One node, empty right subtree, hasNext called repeatedly, next after all nodes is not called by constraints, skewed BST.",
      "constraints": "1 <= number of nodes <= 100000; at most 100000 calls; next is called only when hasNext is true.",
      "source": {
        "label": "Binary Search Tree Iterator - LeetCode 173",
        "url": "https://leetcode.com/problems/binary-search-tree-iterator/"
      },
      "examples": [
        {
          "input": "BSTIterator([7,3,15,null,null,9,20]); next(); next(); hasNext();",
          "output": "3, 7, true",
          "explanation": "Values are returned in ascending order."
        },
        {
          "input": "next(); next(); next()",
          "output": "9, 15, 20 later in sequence",
          "explanation": "The iterator continues inorder."
        },
        {
          "input": "single-node tree",
          "output": "next returns root then hasNext false",
          "explanation": "Only one value exists."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(n), next Time O(1), hasNext O(1), Space O(n). Precompute full inorder list.",
      "optimizedComplexity": "Constructor Time O(h), next Amortized O(1), hasNext O(1), Space O(h). Lazy stack stores only the path.",
      "recursiveComplexity": "Constructor Time O(n), next O(1), hasNext O(1), Space O(n). Recursive inorder precomputes values.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass BSTIterator {\n  private final List<Integer> values = new ArrayList<>();\n  private int index = 0;\n\n  public BSTIterator(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      values.add(current.val);\n      current = current.right;\n    }\n  }\n\n  public int next() {\n    return values.get(index++);\n  }\n\n  public boolean hasNext() {\n    return index < values.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass BSTIterator {\n  private final Deque<TreeNode> stack = new ArrayDeque<>();\n\n  public BSTIterator(TreeNode root) {\n    pushLeft(root);\n  }\n\n  public int next() {\n    TreeNode node = stack.pop();\n    pushLeft(node.right);\n    return node.val;\n  }\n\n  public boolean hasNext() {\n    return !stack.isEmpty();\n  }\n\n  private void pushLeft(TreeNode node) {\n    while (node != null) {\n      stack.push(node);\n      node = node.left;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass BSTIterator {\n  private final List<Integer> values = new ArrayList<>();\n  private int index = 0;\n\n  public BSTIterator(TreeNode root) {\n    inorder(root);\n  }\n\n  public int next() {\n    return values.get(index++);\n  }\n\n  public boolean hasNext() {\n    return index < values.size();\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null) return;\n    inorder(node.left);\n    values.add(node.val);\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass BSTIterator {\n  private final Deque<TreeNode> stack = new ArrayDeque<>();\n\n  public BSTIterator(TreeNode root) {\n    pushLeft(root);\n  }\n\n  public int next() {\n    TreeNode node = stack.pop();\n    pushLeft(node.right);\n    return node.val;\n  }\n\n  public boolean hasNext() {\n    return !stack.isEmpty();\n  }\n\n  private void pushLeft(TreeNode node) {\n    while (node != null) {\n      stack.push(node);\n      node = node.left;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass BSTIterator {\n  private final Deque<TreeNode> stack = new ArrayDeque<>();\n\n  public BSTIterator(TreeNode root) {\n    pushLeft(root);\n  }\n\n  public int next() {\n    TreeNode node = stack.pop();\n    pushLeft(node.right);\n    return node.val;\n  }\n\n  public boolean hasNext() {\n    return !stack.isEmpty();\n  }\n\n  private void pushLeft(TreeNode node) {\n    while (node != null) {\n      stack.push(node);\n      node = node.left;\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find Mode in Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "BST inorder frequency counting",
      "question": "Given the root of a BST that may contain duplicates, return all mode values, meaning the values that appear most frequently.",
      "trigger": "BST inorder traversal groups equal values together, so frequencies can be counted in one sorted pass.",
      "intuition": "Track current value count, maximum count, and mode list while traversing inorder.",
      "edgeCases": "One node, all values same, all values unique, multiple modes, duplicates in both subtrees.",
      "constraints": "1 <= number of nodes <= 10000; -100000 <= Node.val <= 100000.",
      "source": {
        "label": "Find Mode in Binary Search Tree - LeetCode 501",
        "url": "https://leetcode.com/problems/find-mode-in-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [1,null,2,2]",
          "output": "[2]",
          "explanation": "2 appears twice."
        },
        {
          "input": "root = [0]",
          "output": "[0]",
          "explanation": "The only value is the mode."
        },
        {
          "input": "root = [1,1,2,2]",
          "output": "[1,2]",
          "explanation": "Both values tie for highest frequency."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Count every value in a hash map.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder counts sorted equal runs.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive inorder updates mode counts.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int[] findMode(TreeNode root) {\n    Map<Integer, Integer> count = new HashMap<>();\n    collect(root, count);\n    int max = 0;\n    for (int value : count.values()) max = Math.max(max, value);\n    List<Integer> modes = new ArrayList<>();\n    for (Map.Entry<Integer, Integer> entry : count.entrySet()) if (entry.getValue() == max) modes.add(entry.getKey());\n    return modes.stream().mapToInt(Integer::intValue).toArray();\n  }\n\n  private void collect(TreeNode node, Map<Integer, Integer> count) {\n    if (node == null) return;\n    count.put(node.val, count.getOrDefault(node.val, 0) + 1);\n    collect(node.left, count);\n    collect(node.right, count);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int[] findMode(TreeNode root) {\n    List<Integer> modes = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Integer previous = null;\n    int currentCount = 0, maxCount = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val == previous) currentCount++;\n      else currentCount = 1;\n      if (currentCount > maxCount) { modes.clear(); modes.add(current.val); maxCount = currentCount; }\n      else if (currentCount == maxCount) modes.add(current.val);\n      previous = current.val;\n      current = current.right;\n    }\n    return modes.stream().mapToInt(Integer::intValue).toArray();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private Integer previous = null;\n  private int currentCount = 0;\n  private int maxCount = 0;\n  private final List<Integer> modes = new ArrayList<>();\n\n  public int[] findMode(TreeNode root) {\n    inorder(root);\n    return modes.stream().mapToInt(Integer::intValue).toArray();\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null) return;\n    inorder(node.left);\n    currentCount = previous != null && node.val == previous ? currentCount + 1 : 1;\n    if (currentCount > maxCount) { modes.clear(); modes.add(node.val); maxCount = currentCount; }\n    else if (currentCount == maxCount) modes.add(node.val);\n    previous = node.val;\n    inorder(node.right);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int[] findMode(TreeNode root) {\n    List<Integer> modes = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Integer previous = null;\n    int currentCount = 0, maxCount = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val == previous) currentCount++;\n      else currentCount = 1;\n      if (currentCount > maxCount) { modes.clear(); modes.add(current.val); maxCount = currentCount; }\n      else if (currentCount == maxCount) modes.add(current.val);\n      previous = current.val;\n      current = current.right;\n    }\n    return modes.stream().mapToInt(Integer::intValue).toArray();\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int[] findMode(TreeNode root) {\n    List<Integer> modes = new ArrayList<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Integer previous = null;\n    int currentCount = 0, maxCount = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val == previous) currentCount++;\n      else currentCount = 1;\n      if (currentCount > maxCount) { modes.clear(); modes.add(current.val); maxCount = currentCount; }\n      else if (currentCount == maxCount) modes.add(current.val);\n      previous = current.val;\n      current = current.right;\n    }\n    return modes.stream().mapToInt(Integer::intValue).toArray();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Split BST",
      "difficulty": "Medium",
      "subpattern": "BST split by value boundary",
      "question": "Given a BST root and target V, split the tree into two trees: one with all values <= V and one with all values > V. Return both roots.",
      "trigger": "BST ordering tells whether the current root belongs to the small tree or large tree, and only one child subtree needs further splitting.",
      "intuition": "If root.val <= V, split root.right; root keeps the <= part as right child. Otherwise split root.left; root keeps the > part as left child.",
      "edgeCases": "Empty root, all values <= target, all values > target, target equals root, preserving original nodes.",
      "constraints": "0 <= number of nodes <= 50; 0 <= Node.val,V <= 1000; all values are unique.",
      "source": {
        "label": "Split BST - LeetCode 776",
        "url": "https://leetcode.com/problems/split-bst/"
      },
      "examples": [
        {
          "input": "root = [4,2,6,1,3,5,7], target = 2",
          "output": "[[2,1],[4,3,6,null,null,5,7]]",
          "explanation": "Values <= 2 are separated from values > 2."
        },
        {
          "input": "root = [1], target = 1",
          "output": "[[1],[]]",
          "explanation": "Root belongs to the first tree."
        },
        {
          "input": "root = [], target = 5",
          "output": "[[],[]]",
          "explanation": "Both split trees are empty."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) average; Space O(n). Collect values and rebuild two BSTs.",
      "optimizedComplexity": "Time O(h); Space O(1). Iterative pointer rewiring follows the split boundary path.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive split rewires one path from root.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode[] splitBST(TreeNode root, int target) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    TreeNode small = null, large = null;\n    for (int value : values) {\n      if (value <= target) small = insert(small, value);\n      else large = insert(large, value);\n    }\n    return new TreeNode[] {small, large};\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val); collect(node.left, values); collect(node.right, values);\n  }\n\n  private TreeNode insert(TreeNode node, int value) {\n    if (node == null) return new TreeNode(value);\n    if (value < node.val) node.left = insert(node.left, value);\n    else node.right = insert(node.right, value);\n    return node;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode[] splitBST(TreeNode root, int target) {\n    TreeNode smallDummy = new TreeNode(0);\n    TreeNode largeDummy = new TreeNode(0);\n    TreeNode smallTail = smallDummy;\n    TreeNode largeTail = largeDummy;\n    while (root != null) {\n      if (root.val <= target) {\n        smallTail.right = root;\n        smallTail = root;\n        root = root.right;\n        smallTail.right = null;\n      } else {\n        largeTail.left = root;\n        largeTail = root;\n        root = root.left;\n        largeTail.left = null;\n      }\n    }\n    return new TreeNode[] {smallDummy.right, largeDummy.left};\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode[] splitBST(TreeNode root, int target) {\n    if (root == null) return new TreeNode[] {null, null};\n    if (root.val <= target) {\n      TreeNode[] split = splitBST(root.right, target);\n      root.right = split[0];\n      split[0] = root;\n      return split;\n    }\n    TreeNode[] split = splitBST(root.left, target);\n    root.left = split[1];\n    split[1] = root;\n    return split;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode[] splitBST(TreeNode root, int target) {\n    TreeNode smallDummy = new TreeNode(0);\n    TreeNode largeDummy = new TreeNode(0);\n    TreeNode smallTail = smallDummy;\n    TreeNode largeTail = largeDummy;\n    while (root != null) {\n      if (root.val <= target) {\n        smallTail.right = root;\n        smallTail = root;\n        root = root.right;\n        smallTail.right = null;\n      } else {\n        largeTail.left = root;\n        largeTail = root;\n        root = root.left;\n        largeTail.left = null;\n      }\n    }\n    return new TreeNode[] {smallDummy.right, largeDummy.left};\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode[] splitBST(TreeNode root, int target) {\n    TreeNode smallDummy = new TreeNode(0);\n    TreeNode largeDummy = new TreeNode(0);\n    TreeNode smallTail = smallDummy;\n    TreeNode largeTail = largeDummy;\n    while (root != null) {\n      if (root.val <= target) {\n        smallTail.right = root;\n        smallTail = root;\n        root = root.right;\n        smallTail.right = null;\n      } else {\n        largeTail.left = root;\n        largeTail = root;\n        root = root.left;\n        largeTail.left = null;\n      }\n    }\n    return new TreeNode[] {smallDummy.right, largeDummy.left};\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "All Elements in Two Binary Search Trees",
      "difficulty": "Medium",
      "subpattern": "BST inorder merge",
      "question": "Given two BST roots, return a sorted list containing all elements from both trees.",
      "trigger": "Inorder traversal of each BST gives sorted lists, and two sorted lists can be merged linearly.",
      "intuition": "Traverse both trees in inorder. Merge the two sorted arrays with two pointers.",
      "edgeCases": "One tree empty, both trees empty in variants, duplicate values across trees, skewed trees, different tree sizes.",
      "constraints": "0 <= number of nodes in each tree <= 5000; -100000 <= Node.val <= 100000.",
      "source": {
        "label": "All Elements in Two Binary Search Trees - LeetCode 1305",
        "url": "https://leetcode.com/problems/all-elements-in-two-binary-search-trees/"
      },
      "examples": [
        {
          "input": "root1 = [2,1,4], root2 = [1,0,3]",
          "output": "[0,1,1,2,3,4]",
          "explanation": "Both inorder lists are merged."
        },
        {
          "input": "root1 = [1,null,8], root2 = [8,1]",
          "output": "[1,1,8,8]",
          "explanation": "Duplicates are retained."
        },
        {
          "input": "root1 = [], root2 = [5]",
          "output": "[5]",
          "explanation": "Only the second tree contributes values."
        }
      ],
      "bruteForceComplexity": "Time O((m+n) log(m+n)); Space O(m+n). Collect all values and sort.",
      "optimizedComplexity": "Time O(m+n); Space O(h1+h2). Iterative dual inorder streams merge values lazily.",
      "recursiveComplexity": "Time O(m+n); Space O(m+n). Recursive inorder lists plus linear merge.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> getAllElements(TreeNode root1, TreeNode root2) {\n    List<Integer> values = new ArrayList<>();\n    collect(root1, values);\n    collect(root2, values);\n    Collections.sort(values);\n    return values;\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val); collect(node.left, values); collect(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> getAllElements(TreeNode root1, TreeNode root2) {\n    List<Integer> answer = new ArrayList<>();\n    Deque<TreeNode> s1 = new ArrayDeque<>();\n    Deque<TreeNode> s2 = new ArrayDeque<>();\n    while (root1 != null || root2 != null || !s1.isEmpty() || !s2.isEmpty()) {\n      while (root1 != null) { s1.push(root1); root1 = root1.left; }\n      while (root2 != null) { s2.push(root2); root2 = root2.left; }\n      if (s2.isEmpty() || (!s1.isEmpty() && s1.peek().val <= s2.peek().val)) {\n        TreeNode node = s1.pop(); answer.add(node.val); root1 = node.right;\n      } else {\n        TreeNode node = s2.pop(); answer.add(node.val); root2 = node.right;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> getAllElements(TreeNode root1, TreeNode root2) {\n    List<Integer> a = new ArrayList<>();\n    List<Integer> b = new ArrayList<>();\n    inorder(root1, a);\n    inorder(root2, b);\n    return merge(a, b);\n  }\n\n  private void inorder(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    inorder(node.left, values); values.add(node.val); inorder(node.right, values);\n  }\n\n  private List<Integer> merge(List<Integer> a, List<Integer> b) {\n    List<Integer> result = new ArrayList<>();\n    int i = 0, j = 0;\n    while (i < a.size() || j < b.size()) {\n      if (j == b.size() || (i < a.size() && a.get(i) <= b.get(j))) result.add(a.get(i++));\n      else result.add(b.get(j++));\n    }\n    return result;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> getAllElements(TreeNode root1, TreeNode root2) {\n    List<Integer> answer = new ArrayList<>();\n    Deque<TreeNode> s1 = new ArrayDeque<>();\n    Deque<TreeNode> s2 = new ArrayDeque<>();\n    while (root1 != null || root2 != null || !s1.isEmpty() || !s2.isEmpty()) {\n      while (root1 != null) { s1.push(root1); root1 = root1.left; }\n      while (root2 != null) { s2.push(root2); root2 = root2.left; }\n      if (s2.isEmpty() || (!s1.isEmpty() && s1.peek().val <= s2.peek().val)) {\n        TreeNode node = s1.pop(); answer.add(node.val); root1 = node.right;\n      } else {\n        TreeNode node = s2.pop(); answer.add(node.val); root2 = node.right;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<Integer> getAllElements(TreeNode root1, TreeNode root2) {\n    List<Integer> answer = new ArrayList<>();\n    Deque<TreeNode> s1 = new ArrayDeque<>();\n    Deque<TreeNode> s2 = new ArrayDeque<>();\n    while (root1 != null || root2 != null || !s1.isEmpty() || !s2.isEmpty()) {\n      while (root1 != null) { s1.push(root1); root1 = root1.left; }\n      while (root2 != null) { s2.push(root2); root2 = root2.left; }\n      if (s2.isEmpty() || (!s1.isEmpty() && s1.peek().val <= s2.peek().val)) {\n        TreeNode node = s1.pop(); answer.add(node.val); root1 = node.right;\n      } else {\n        TreeNode node = s2.pop(); answer.add(node.val); root2 = node.right;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Greater Sum Tree",
      "difficulty": "Medium",
      "subpattern": "Reverse inorder accumulated sum",
      "question": "Given the root of a BST, transform it into a greater sum tree where each node value becomes the sum of all values greater than or equal to it.",
      "trigger": "Reverse inorder traversal visits BST values from largest to smallest, so a running sum contains all greater values.",
      "intuition": "Traverse right, node, left. Add node value to running sum, then assign node.val = running sum.",
      "edgeCases": "One node, skewed tree, duplicate values in variants, negative values in variants, preserving structure.",
      "constraints": "1 <= number of nodes <= 100; 0 <= Node.val <= 100; all values are unique in the original problem.",
      "source": {
        "label": "Binary Search Tree to Greater Sum Tree - LeetCode 1038",
        "url": "https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/"
      },
      "examples": [
        {
          "input": "root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]",
          "output": "[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]",
          "explanation": "Each node accumulates all greater-or-equal values."
        },
        {
          "input": "root = [0,null,1]",
          "output": "[1,null,1]",
          "explanation": "0 becomes 1 after adding greater value 1."
        },
        {
          "input": "root = [1]",
          "output": "[1]",
          "explanation": "Only one value exists."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). For every node, sum all collected values greater than or equal to it.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative reverse inorder maintains running sum.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive reverse inorder maintains running sum.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstToGst(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    collect(root, values);\n    update(root, values);\n    return root;\n  }\n\n  private void collect(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val); collect(node.left, values); collect(node.right, values);\n  }\n\n  private void update(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    int sum = 0;\n    for (int value : values) if (value >= node.val) sum += value;\n    node.val = sum;\n    update(node.left, values);\n    update(node.right, values);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstToGst(TreeNode root) {\n    int sum = 0;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.right; }\n      current = stack.pop();\n      sum += current.val;\n      current.val = sum;\n      current = current.left;\n    }\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int sum = 0;\n\n  public TreeNode bstToGst(TreeNode root) {\n    reverseInorder(root);\n    return root;\n  }\n\n  private void reverseInorder(TreeNode node) {\n    if (node == null) return;\n    reverseInorder(node.right);\n    sum += node.val;\n    node.val = sum;\n    reverseInorder(node.left);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstToGst(TreeNode root) {\n    int sum = 0;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.right; }\n      current = stack.pop();\n      sum += current.val;\n      current.val = sum;\n      current = current.left;\n    }\n    return root;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode bstToGst(TreeNode root) {\n    int sum = 0;\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.right; }\n      current = stack.pop();\n      sum += current.val;\n      current.val = sum;\n      current = current.left;\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Delete Nodes And Return Forest",
      "difficulty": "Medium",
      "subpattern": "Tree deletion with parent-child reconnection",
      "question": "Given a binary tree root and an array to_delete, delete those nodes and return the roots of the remaining forest.",
      "trigger": "When a node is deleted, its non-deleted children become new forest roots.",
      "intuition": "DFS with an isRoot flag. If current node is deleted, recurse into children as new roots and return null to its parent.",
      "edgeCases": "Delete root, delete leaf, delete all nodes, delete none, child of deleted node also deleted.",
      "constraints": "1 <= number of nodes <= 1000; node values are unique from 1 to 1000; 1 <= to_delete.length <= 1000.",
      "source": {
        "label": "Delete Nodes And Return Forest - LeetCode 1110",
        "url": "https://leetcode.com/problems/delete-nodes-and-return-forest/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,4,5,6,7], to_delete = [3,5]",
          "output": "[[1,2,null,4],[6],[7]]",
          "explanation": "Children of deleted 3 become new roots."
        },
        {
          "input": "root = [1,2,4,null,3], to_delete = [3]",
          "output": "[[1,2,4]]",
          "explanation": "Only leaf 3 is removed."
        },
        {
          "input": "root = [1], to_delete = [1]",
          "output": "[]",
          "explanation": "Deleting the root leaves no forest."
        }
      ],
      "bruteForceComplexity": "Time O(n*d); Space O(n). Check each node value against to_delete by scanning the array.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative DFS uses a deletion set and root flags.",
      "recursiveComplexity": "Time O(n); Space O(h + d). Recursive DFS uses deletion set and returns kept subtrees.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {\n    List<TreeNode> forest = new ArrayList<>();\n    root = delete(root, true, to_delete, forest);\n    return forest;\n  }\n\n  private TreeNode delete(TreeNode node, boolean isRoot, int[] toDelete, List<TreeNode> forest) {\n    if (node == null) return null;\n    boolean deleted = contains(toDelete, node.val);\n    if (isRoot && !deleted) forest.add(node);\n    node.left = delete(node.left, deleted, toDelete, forest);\n    node.right = delete(node.right, deleted, toDelete, forest);\n    return deleted ? null : node;\n  }\n\n  private boolean contains(int[] values, int target) {\n    for (int value : values) if (value == target) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {\n    Set<Integer> deleted = new HashSet<>();\n    for (int value : to_delete) deleted.add(value);\n    List<TreeNode> forest = new ArrayList<>();\n    if (root == null) return forest;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, null, false, true));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      TreeNode node = state.node;\n      boolean remove = deleted.contains(node.val);\n      if (state.isRoot && !remove) forest.add(node);\n      if (node.left != null) stack.push(new State(node.left, node, true, remove));\n      if (node.right != null) stack.push(new State(node.right, node, false, remove));\n      if (remove && state.parent != null) {\n        if (state.isLeft) state.parent.left = null;\n        else state.parent.right = null;\n      }\n    }\n    return forest;\n  }\n\n  private static class State { TreeNode node, parent; boolean isLeft, isRoot; State(TreeNode n, TreeNode p, boolean l, boolean r){node=n;parent=p;isLeft=l;isRoot=r;} }\n}",
      "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {\n    Set<Integer> deleted = new HashSet<>();\n    for (int value : to_delete) deleted.add(value);\n    List<TreeNode> forest = new ArrayList<>();\n    dfs(root, true, deleted, forest);\n    return forest;\n  }\n\n  private TreeNode dfs(TreeNode node, boolean isRoot, Set<Integer> deleted, List<TreeNode> forest) {\n    if (node == null) return null;\n    boolean remove = deleted.contains(node.val);\n    if (isRoot && !remove) forest.add(node);\n    node.left = dfs(node.left, remove, deleted, forest);\n    node.right = dfs(node.right, remove, deleted, forest);\n    return remove ? null : node;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {\n    Set<Integer> deleted = new HashSet<>();\n    for (int value : to_delete) deleted.add(value);\n    List<TreeNode> forest = new ArrayList<>();\n    if (root == null) return forest;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, null, false, true));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      TreeNode node = state.node;\n      boolean remove = deleted.contains(node.val);\n      if (state.isRoot && !remove) forest.add(node);\n      if (node.left != null) stack.push(new State(node.left, node, true, remove));\n      if (node.right != null) stack.push(new State(node.right, node, false, remove));\n      if (remove && state.parent != null) {\n        if (state.isLeft) state.parent.left = null;\n        else state.parent.right = null;\n      }\n    }\n    return forest;\n  }\n\n  private static class State { TreeNode node, parent; boolean isLeft, isRoot; State(TreeNode n, TreeNode p, boolean l, boolean r){node=n;parent=p;isLeft=l;isRoot=r;} }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {\n    Set<Integer> deleted = new HashSet<>();\n    for (int value : to_delete) deleted.add(value);\n    List<TreeNode> forest = new ArrayList<>();\n    if (root == null) return forest;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(root, null, false, true));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      TreeNode node = state.node;\n      boolean remove = deleted.contains(node.val);\n      if (state.isRoot && !remove) forest.add(node);\n      if (node.left != null) stack.push(new State(node.left, node, true, remove));\n      if (node.right != null) stack.push(new State(node.right, node, false, remove));\n      if (remove && state.parent != null) {\n        if (state.isLeft) state.parent.left = null;\n        else state.parent.right = null;\n      }\n    }\n    return forest;\n  }\n\n  private static class State { TreeNode node, parent; boolean isLeft, isRoot; State(TreeNode n, TreeNode p, boolean l, boolean r){node=n;parent=p;isLeft=l;isRoot=r;} }\n}"
    },
    {
      "group": "more-practice",
      "name": "Verify Preorder Sequence in BST",
      "difficulty": "Medium",
      "subpattern": "BST preorder validation with bounds",
      "question": "Given an integer array preorder, verify whether it can be the preorder traversal of a BST.",
      "trigger": "Preorder of a BST must respect a moving lower bound after the traversal switches from a left subtree to a right subtree.",
      "intuition": "Use a stack of ancestors. When a value is greater than stack top, pop ancestors and update the lower bound. Any later value below lower bound is invalid.",
      "edgeCases": "Ascending sequence, descending sequence, invalid value after right turn, single value, duplicates depending on variant.",
      "constraints": "1 <= preorder.length <= 10000; values are unique in common variants.",
      "source": {
        "label": "Verify Preorder Sequence in Binary Search Tree - LeetCode 255",
        "url": "https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree/"
      },
      "examples": [
        {
          "input": "preorder = [5,2,1,3,6]",
          "output": "true",
          "explanation": "This is a valid BST preorder."
        },
        {
          "input": "preorder = [5,2,6,1,3]",
          "output": "false",
          "explanation": "1 appears after moving into the right subtree of 5."
        },
        {
          "input": "preorder = [1,2,3]",
          "output": "true",
          "explanation": "A right-skewed BST is valid."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Recursively split each range into left and right parts.",
      "optimizedComplexity": "Time O(n); Space O(n). Monotonic stack tracks ancestors and lower bound.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive bounds consume preorder once.",
      "bruteForceCode": "class Solution {\n  public boolean verifyPreorder(int[] preorder) {\n    return valid(preorder, 0, preorder.length - 1, Integer.MIN_VALUE, Integer.MAX_VALUE);\n  }\n\n  private boolean valid(int[] preorder, int left, int right, int low, int high) {\n    if (left > right) return true;\n    int root = preorder[left];\n    if (root <= low || root >= high) return false;\n    int split = left + 1;\n    while (split <= right && preorder[split] < root) split++;\n    for (int i = split; i <= right; i++) if (preorder[i] < root) return false;\n    return valid(preorder, left + 1, split - 1, low, root) && valid(preorder, split, right, root, high);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean verifyPreorder(int[] preorder) {\n    int lowerBound = Integer.MIN_VALUE;\n    Deque<Integer> stack = new ArrayDeque<>();\n    for (int value : preorder) {\n      if (value < lowerBound) return false;\n      while (!stack.isEmpty() && value > stack.peek()) {\n        lowerBound = stack.pop();\n      }\n      stack.push(value);\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index = 0;\n\n  public boolean verifyPreorder(int[] preorder) {\n    build(preorder, Integer.MIN_VALUE, Integer.MAX_VALUE);\n    return index == preorder.length;\n  }\n\n  private void build(int[] preorder, int low, int high) {\n    if (index == preorder.length) return;\n    int value = preorder[index];\n    if (value <= low || value >= high) return;\n    index++;\n    build(preorder, low, value);\n    build(preorder, value, high);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean verifyPreorder(int[] preorder) {\n    int lowerBound = Integer.MIN_VALUE;\n    Deque<Integer> stack = new ArrayDeque<>();\n    for (int value : preorder) {\n      if (value < lowerBound) return false;\n      while (!stack.isEmpty() && value > stack.peek()) {\n        lowerBound = stack.pop();\n      }\n      stack.push(value);\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean verifyPreorder(int[] preorder) {\n    int lowerBound = Integer.MIN_VALUE;\n    Deque<Integer> stack = new ArrayDeque<>();\n    for (int value : preorder) {\n      if (value < lowerBound) return false;\n      while (!stack.isEmpty() && value > stack.peek()) {\n        lowerBound = stack.pop();\n      }\n      stack.push(value);\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Inorder Successor in BST",
      "difficulty": "Medium",
      "subpattern": "BST successor traversal",
      "question": "Given a BST and a node p, return the inorder successor of p, or null if it does not exist.",
      "trigger": "The successor is the smallest value greater than p.val, found either in p.right or among ancestors where traversal turns left.",
      "intuition": "Walk from root. Whenever current value is greater than p.val, it is a candidate successor and search continues left.",
      "edgeCases": "p has right subtree, p has no right subtree, p is maximum value, p is root, two-node tree.",
      "constraints": "1 <= number of nodes <= 10000; all Node.val values are unique; p exists in tree.",
      "source": {
        "label": "Inorder Successor in BST - LeetCode 285",
        "url": "https://leetcode.com/problems/inorder-successor-in-bst/"
      },
      "examples": [
        {
          "input": "root = [2,1,3], p = 1",
          "output": "2",
          "explanation": "2 is next in inorder."
        },
        {
          "input": "root = [5,3,6,2,4,null,null,1], p = 6",
          "output": "null",
          "explanation": "6 is the maximum value."
        },
        {
          "input": "root = [2,1,3], p = 2",
          "output": "3",
          "explanation": "The successor is in the right subtree."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store inorder list and return the value after p.",
      "optimizedComplexity": "Time O(h); Space O(1). Iterative ordered search tracks candidate successor.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive ordered search returns best candidate.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\n    List<TreeNode> nodes = new ArrayList<>();\n    inorder(root, nodes);\n    for (int i = 0; i + 1 < nodes.size(); i++) {\n      if (nodes.get(i) == p) return nodes.get(i + 1);\n    }\n    return null;\n  }\n\n  private void inorder(TreeNode node, List<TreeNode> nodes) {\n    if (node == null) return;\n    inorder(node.left, nodes); nodes.add(node); inorder(node.right, nodes);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\n    TreeNode successor = null;\n    while (root != null) {\n      if (p.val < root.val) {\n        successor = root;\n        root = root.left;\n      } else {\n        root = root.right;\n      }\n    }\n    return successor;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\n    if (root == null) return null;\n    if (p.val >= root.val) return inorderSuccessor(root.right, p);\n    TreeNode left = inorderSuccessor(root.left, p);\n    return left != null ? left : root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\n    TreeNode successor = null;\n    while (root != null) {\n      if (p.val < root.val) {\n        successor = root;\n        root = root.left;\n      } else {\n        root = root.right;\n      }\n    }\n    return successor;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\n    TreeNode successor = null;\n    while (root != null) {\n      if (p.val < root.val) {\n        successor = root;\n        root = root.left;\n      } else {\n        root = root.right;\n      }\n    }\n    return successor;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Inorder Predecessor in BST",
      "difficulty": "Medium",
      "subpattern": "BST predecessor traversal",
      "question": "Given a BST and a node p, return the inorder predecessor of p, or null if it does not exist.",
      "trigger": "The predecessor is the largest value smaller than p.val, found either in p.left or among ancestors where traversal turns right.",
      "intuition": "Walk from root. Whenever current value is smaller than p.val, it is a candidate predecessor and search continues right.",
      "edgeCases": "p has left subtree, p has no left subtree, p is minimum value, p is root, two-node tree.",
      "constraints": "1 <= number of nodes <= 10000; all Node.val values are unique; p exists in tree.",
      "source": {
        "label": "Inorder Predecessor in BST - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/inorder-predecessor-in-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [2,1,3], p = 3",
          "output": "2",
          "explanation": "2 is previous in inorder."
        },
        {
          "input": "root = [5,3,6,2,4,null,null,1], p = 1",
          "output": "null",
          "explanation": "1 is the minimum value."
        },
        {
          "input": "root = [2,1,3], p = 2",
          "output": "1",
          "explanation": "The predecessor is in the left subtree."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store inorder list and return the node before p.",
      "optimizedComplexity": "Time O(h); Space O(1). Iterative ordered search tracks candidate predecessor.",
      "recursiveComplexity": "Time O(h); Space O(h). Recursive ordered search returns best candidate.",
      "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {\n    List<TreeNode> nodes = new ArrayList<>();\n    inorder(root, nodes);\n    for (int i = 1; i < nodes.size(); i++) {\n      if (nodes.get(i) == p) return nodes.get(i - 1);\n    }\n    return null;\n  }\n\n  private void inorder(TreeNode node, List<TreeNode> nodes) {\n    if (node == null) return;\n    inorder(node.left, nodes); nodes.add(node); inorder(node.right, nodes);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {\n    TreeNode predecessor = null;\n    while (root != null) {\n      if (p.val > root.val) {\n        predecessor = root;\n        root = root.right;\n      } else {\n        root = root.left;\n      }\n    }\n    return predecessor;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {\n    if (root == null) return null;\n    if (p.val <= root.val) return inorderPredecessor(root.left, p);\n    TreeNode right = inorderPredecessor(root.right, p);\n    return right != null ? right : root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {\n    TreeNode predecessor = null;\n    while (root != null) {\n      if (p.val > root.val) {\n        predecessor = root;\n        root = root.right;\n      } else {\n        root = root.left;\n      }\n    }\n    return predecessor;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {\n    TreeNode predecessor = null;\n    while (root != null) {\n      if (p.val > root.val) {\n        predecessor = root;\n        root = root.right;\n      } else {\n        root = root.left;\n      }\n    }\n    return predecessor;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Serialize and Deserialize BST",
      "difficulty": "Medium",
      "subpattern": "BST serialization using ordering constraints",
      "question": "Design methods to serialize and deserialize a BST. The decoded tree must be structurally valid and contain the same values.",
      "trigger": "BST preorder can be deserialized without null markers by using value bounds to decide subtree membership.",
      "intuition": "Serialize preorder values. Deserialize by consuming values while they fit the current low/high BST bounds.",
      "edgeCases": "Empty tree, one node, skewed tree, negative values, preorder values exhausted, values near integer bounds.",
      "constraints": "0 <= number of nodes <= 10000; -10000 <= Node.val <= 10000; values are unique.",
      "source": {
        "label": "Serialize and Deserialize BST - LeetCode 449",
        "url": "https://leetcode.com/problems/serialize-and-deserialize-bst/"
      },
      "examples": [
        {
          "input": "root = [2,1,3]",
          "output": "deserialize(serialize(root)) returns same BST",
          "explanation": "Preorder plus BST bounds reconstructs the tree."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "Empty data returns null."
        },
        {
          "input": "root = [1,null,2,null,3]",
          "output": "same right-skewed BST",
          "explanation": "Bounds preserve the skewed structure."
        }
      ],
      "bruteForceComplexity": "Serialize Time O(n), Deserialize Time O(n log n) average; Space O(n). Deserialize by inserting preorder values one by one.",
      "optimizedComplexity": "Serialize Time O(n), Deserialize Time O(n); Space O(n). Iterative stack reconstructs BST from preorder.",
      "recursiveComplexity": "Serialize Time O(n), Deserialize Time O(n); Space O(h). Recursive bounds consume preorder once.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    if (root == null) return \"\";\n    return root.val + \",\" + serialize(root.left) + serialize(root.right);\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.isEmpty()) return null;\n    TreeNode root = null;\n    for (String token : data.split(\",\")) {\n      if (!token.isEmpty()) root = insert(root, Integer.parseInt(token));\n    }\n    return root;\n  }\n\n  private TreeNode insert(TreeNode node, int value) {\n    if (node == null) return new TreeNode(value);\n    if (value < node.val) node.left = insert(node.left, value);\n    else node.right = insert(node.right, value);\n    return node;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder sb = new StringBuilder();\n    preorder(root, sb);\n    return sb.toString();\n  }\n\n  private void preorder(TreeNode node, StringBuilder sb) {\n    if (node == null) return;\n    sb.append(node.val).append(',');\n    preorder(node.left, sb);\n    preorder(node.right, sb);\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.isEmpty()) return null;\n    String[] tokens = data.split(\",\");\n    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    for (int i = 1; i < tokens.length; i++) {\n      if (tokens[i].isEmpty()) continue;\n      int value = Integer.parseInt(tokens[i]);\n      TreeNode node = new TreeNode(value);\n      if (value < stack.peek().val) stack.peek().left = node;\n      else {\n        TreeNode parent = null;\n        while (!stack.isEmpty() && value > stack.peek().val) parent = stack.pop();\n        parent.right = node;\n      }\n      stack.push(node);\n    }\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  private int index;\n\n  public String serialize(TreeNode root) {\n    StringBuilder sb = new StringBuilder();\n    preorder(root, sb);\n    return sb.toString();\n  }\n\n  private void preorder(TreeNode node, StringBuilder sb) {\n    if (node == null) return;\n    sb.append(node.val).append(',');\n    preorder(node.left, sb);\n    preorder(node.right, sb);\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.isEmpty()) return null;\n    String[] tokens = data.split(\",\");\n    index = 0;\n    return build(tokens, Long.MIN_VALUE, Long.MAX_VALUE);\n  }\n\n  private TreeNode build(String[] tokens, long low, long high) {\n    if (index == tokens.length || tokens[index].isEmpty()) return null;\n    int value = Integer.parseInt(tokens[index]);\n    if (value <= low || value >= high) return null;\n    index++;\n    TreeNode node = new TreeNode(value);\n    node.left = build(tokens, low, value);\n    node.right = build(tokens, value, high);\n    return node;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder sb = new StringBuilder();\n    preorder(root, sb);\n    return sb.toString();\n  }\n\n  private void preorder(TreeNode node, StringBuilder sb) {\n    if (node == null) return;\n    sb.append(node.val).append(',');\n    preorder(node.left, sb);\n    preorder(node.right, sb);\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.isEmpty()) return null;\n    String[] tokens = data.split(\",\");\n    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    for (int i = 1; i < tokens.length; i++) {\n      if (tokens[i].isEmpty()) continue;\n      int value = Integer.parseInt(tokens[i]);\n      TreeNode node = new TreeNode(value);\n      if (value < stack.peek().val) stack.peek().left = node;\n      else {\n        TreeNode parent = null;\n        while (!stack.isEmpty() && value > stack.peek().val) parent = stack.pop();\n        parent.right = node;\n      }\n      stack.push(node);\n    }\n    return root;\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\npublic class Codec {\n  public String serialize(TreeNode root) {\n    StringBuilder sb = new StringBuilder();\n    preorder(root, sb);\n    return sb.toString();\n  }\n\n  private void preorder(TreeNode node, StringBuilder sb) {\n    if (node == null) return;\n    sb.append(node.val).append(',');\n    preorder(node.left, sb);\n    preorder(node.right, sb);\n  }\n\n  public TreeNode deserialize(String data) {\n    if (data.isEmpty()) return null;\n    String[] tokens = data.split(\",\");\n    TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    for (int i = 1; i < tokens.length; i++) {\n      if (tokens[i].isEmpty()) continue;\n      int value = Integer.parseInt(tokens[i]);\n      TreeNode node = new TreeNode(value);\n      if (value < stack.peek().val) stack.peek().left = node;\n      else {\n        TreeNode parent = null;\n        while (!stack.isEmpty() && value > stack.peek().val) parent = stack.pop();\n        parent.right = node;\n      }\n      stack.push(node);\n    }\n    return root;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Sum BST in Binary Tree",
      "difficulty": "Hard",
      "subpattern": "BST subtree dynamic programming",
      "question": "Given a binary tree root, return the maximum sum of all keys of any subtree that is also a BST.",
      "trigger": "Each subtree must report whether it is a BST, its min value, max value, and sum so the parent can decide if it is a BST.",
      "intuition": "Postorder DFS. A node forms a BST if both children are BSTs and left.max < node.val < right.min. Track the best sum globally.",
      "edgeCases": "All negative values, single node, no positive BST except empty, duplicate boundary violation, largest BST not rooted at root.",
      "constraints": "1 <= number of nodes <= 40000; -40000 <= Node.val <= 40000.",
      "source": {
        "label": "Maximum Sum BST in Binary Tree - LeetCode 1373",
        "url": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]",
          "output": "20",
          "explanation": "The subtree rooted at 3 is the maximum-sum BST."
        },
        {
          "input": "root = [4,3,null,1,2]",
          "output": "2",
          "explanation": "The best BST subtree is a single node 2."
        },
        {
          "input": "root = [-4,-2,-5]",
          "output": "0",
          "explanation": "Empty subtree sum 0 beats negative sums by problem definition."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(h). For every node, validate its subtree as BST and compute sum.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes BST info once per node.",
      "recursiveComplexity": "Time O(n); Space O(h). Postorder DFS returns BST info tuple for each subtree.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxSumBST(TreeNode root) {\n    if (root == null) return 0;\n    int best = isBST(root, Long.MIN_VALUE, Long.MAX_VALUE) ? sum(root) : 0;\n    best = Math.max(best, maxSumBST(root.left));\n    best = Math.max(best, maxSumBST(root.right));\n    return best;\n  }\n\n  private boolean isBST(TreeNode node, long low, long high) {\n    if (node == null) return true;\n    if (node.val <= low || node.val >= high) return false;\n    return isBST(node.left, low, node.val) && isBST(node.right, node.val, high);\n  }\n\n  private int sum(TreeNode node) {\n    if (node == null) return 0;\n    return node.val + sum(node.left) + sum(node.right);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxSumBST(TreeNode root) {\n    Map<TreeNode, Info> info = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int best = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      Info left = info.getOrDefault(node.left, new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0));\n      Info right = info.getOrDefault(node.right, new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0));\n      if (left.isBST && right.isBST && left.max < node.val && node.val < right.min) {\n        int sum = left.sum + right.sum + node.val;\n        info.put(node, new Info(true, Math.min(left.min, node.val), Math.max(right.max, node.val), sum));\n        best = Math.max(best, sum);\n      } else {\n        info.put(node, new Info(false, 0, 0, 0));\n      }\n      last = stack.pop();\n    }\n    return best;\n  }\n\n  private static class Info {\n    boolean isBST; int min, max, sum;\n    Info(boolean isBST, int min, int max, int sum) { this.isBST = isBST; this.min = min; this.max = max; this.sum = sum; }\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int best = 0;\n\n  public int maxSumBST(TreeNode root) {\n    dfs(root);\n    return best;\n  }\n\n  private Info dfs(TreeNode node) {\n    if (node == null) return new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0);\n    Info left = dfs(node.left);\n    Info right = dfs(node.right);\n    if (left.isBST && right.isBST && left.max < node.val && node.val < right.min) {\n      int sum = left.sum + right.sum + node.val;\n      best = Math.max(best, sum);\n      return new Info(true, Math.min(left.min, node.val), Math.max(right.max, node.val), sum);\n    }\n    return new Info(false, 0, 0, 0);\n  }\n\n  private static class Info {\n    boolean isBST;\n    int min;\n    int max;\n    int sum;\n    Info(boolean isBST, int min, int max, int sum) {\n      this.isBST = isBST;\n      this.min = min;\n      this.max = max;\n      this.sum = sum;\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxSumBST(TreeNode root) {\n    Map<TreeNode, Info> info = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int best = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      Info left = info.getOrDefault(node.left, new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0));\n      Info right = info.getOrDefault(node.right, new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0));\n      if (left.isBST && right.isBST && left.max < node.val && node.val < right.min) {\n        int sum = left.sum + right.sum + node.val;\n        info.put(node, new Info(true, Math.min(left.min, node.val), Math.max(right.max, node.val), sum));\n        best = Math.max(best, sum);\n      } else {\n        info.put(node, new Info(false, 0, 0, 0));\n      }\n      last = stack.pop();\n    }\n    return best;\n  }\n\n  private static class Info {\n    boolean isBST; int min, max, sum;\n    Info(boolean isBST, int min, int max, int sum) { this.isBST = isBST; this.min = min; this.max = max; this.sum = sum; }\n  }\n}",
      "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxSumBST(TreeNode root) {\n    Map<TreeNode, Info> info = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root, last = null;\n    int best = 0;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      Info left = info.getOrDefault(node.left, new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0));\n      Info right = info.getOrDefault(node.right, new Info(true, Integer.MAX_VALUE, Integer.MIN_VALUE, 0));\n      if (left.isBST && right.isBST && left.max < node.val && node.val < right.min) {\n        int sum = left.sum + right.sum + node.val;\n        info.put(node, new Info(true, Math.min(left.min, node.val), Math.max(right.max, node.val), sum));\n        best = Math.max(best, sum);\n      } else {\n        info.put(node, new Info(false, 0, 0, 0));\n      }\n      last = stack.pop();\n    }\n    return best;\n  }\n\n  private static class Info {\n    boolean isBST; int min, max, sum;\n    Info(boolean isBST, int min, int max, int sum) { this.isBST = isBST; this.min = min; this.max = max; this.sum = sum; }\n  }\n}"
    }
  ],
  "checklist": [
    "The tree has the BST invariant: left values are smaller and right values are larger.",
    "The operation can discard one subtree after comparing with the current node.",
    "Sorted order appears through inorder traversal.",
    "The question asks for kth, closest, predecessor, successor, range, validation, insertion, deletion, or construction.",
    "Ancestor bounds or inorder previous value are needed to prove validity."
  ],
  "traps": [
    "Checking only parent-child order instead of full ancestor bounds.",
    "Forgetting that inorder successor/predecessor may be an ancestor, not only a child subtree.",
    "Using int bounds for validation and failing on Integer.MIN_VALUE or Integer.MAX_VALUE.",
    "Deleting a two-child node without correctly removing its successor/predecessor.",
    "Ignoring skewed-tree height where O(h) becomes O(n)."
  ],
  "edgeCases": [
    "Empty tree when the problem allows it.",
    "Single-node tree.",
    "Completely skewed BST.",
    "Minimum and maximum integer node values.",
    "Target below minimum value or above maximum value.",
    "Duplicate values in variants where duplicates are allowed."
  ],
  "complexities": [
    "Search, insert, delete, LCA, predecessor, and successor are O(h), which is O(log n) balanced and O(n) skewed.",
    "Inorder traversal problems are O(n) time and O(h) stack space.",
    "Construction from sorted arrays or preorder is O(n) when indexes or bounds are used correctly.",
    "Naive rebuild or collect-sort approaches are usually O(n log n) or worse.",
    "BST subtree DP problems are O(n) when each subtree returns a compact state tuple."
  ],
  "mentalModel": [
    "Compare once, then decide left, right, or current.",
    "Use inorder whenever sorted order would simplify the problem.",
    "Use low/high bounds when validating or constructing from traversal.",
    "For kth/iterator problems, stop traversal as soon as enough sorted values are consumed.",
    "For mutation problems, return the new subtree root after every recursive change."
  ],
  "revisionStrategy": [
    "Revise the 12 core problems first: search, insert, delete, validation, kth, LCA, sorted build, two sum, min diff, range sum, increasing tree, recover tree.",
    "Practice iterative and recursive inorder side by side until predecessor/current/successor tracking is automatic.",
    "Group mutation problems together: insert, delete, trim, split, recover, greater sum tree.",
    "For construction problems, write the invariant for bounds or sorted range before coding.",
    "After every solution, state whether the tree height h is balanced or can degrade to n."
  ],
  "unseen": [
    "Find the floor and ceil of a target value in a BST.",
    "Return the sum of all BST nodes whose rank is between L and R.",
    "Merge k BST iterators into one sorted stream.",
    "Delete every node outside two disjoint value ranges from a BST.",
    "Find the largest valid BST after changing at most one node value."
  ]
};
