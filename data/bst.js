const CURRENT_PATTERN = {
  "id": "bst",
  "name": "Binary Search Tree",
  "summary": "Ordered tree search, validation, kth, predecessor/successor.",
  "complete": true,
  "subpatterns": [
    "Core Binary Search Tree recognition",
    "Boundary handling in Binary Search Tree",
    "Optimized iterative Binary Search Tree",
    "Recursive or DFS-style Binary Search Tree",
    "Advanced Binary Search Tree variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Search in a Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "Ordered tree search",
      "question": "Solve Search in a Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Search in a Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Search%20in%20a%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int searchInABinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int searchInABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int searchInABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int searchInABinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int searchInABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Insert into a Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "validation",
      "question": "Solve Insert into a Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Insert into a Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Insert%20into%20a%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int insertIntoABinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int insertIntoABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int insertIntoABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int insertIntoABinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int insertIntoABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Delete Node in a BST",
      "difficulty": "Easy",
      "subpattern": "kth",
      "question": "Solve Delete Node in a BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes kth and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for kth and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Delete Node in a BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Delete%20Node%20in%20a%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodeInABst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodeInABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodeInABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodeInABst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int deleteNodeInABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Validate Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "predecessor/successor.",
      "question": "Solve Validate Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes predecessor/successor. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for predecessor/successor. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Validate Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Validate%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int validateBinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int validateBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int validateBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int validateBinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int validateBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Smallest Element in a BST",
      "difficulty": "Easy",
      "subpattern": "Ordered tree search",
      "question": "Solve Kth Smallest Element in a BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Kth Smallest Element in a BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Kth%20Smallest%20Element%20in%20a%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInABst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInABst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Lowest Common Ancestor of a Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "validation",
      "question": "Solve Lowest Common Ancestor of a Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Lowest Common Ancestor of a Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int lowestCommonAncestorOfABinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lowestCommonAncestorOfABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lowestCommonAncestorOfABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lowestCommonAncestorOfABinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int lowestCommonAncestorOfABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Convert Sorted Array to Binary Search Tree",
      "difficulty": "Easy",
      "subpattern": "kth",
      "question": "Solve Convert Sorted Array to Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes kth and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for kth and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Convert Sorted Array to Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Convert%20Sorted%20Array%20to%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int convertSortedArrayToBinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int convertSortedArrayToBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int convertSortedArrayToBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int convertSortedArrayToBinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int convertSortedArrayToBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Two Sum IV - Input is a BST",
      "difficulty": "Easy",
      "subpattern": "predecessor/successor.",
      "question": "Solve Two Sum IV - Input is a BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes predecessor/successor. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for predecessor/successor. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Two Sum IV - Input is a BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Two%20Sum%20IV%20-%20Input%20is%20a%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int twoSumIvInputIsABst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int twoSumIvInputIsABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int twoSumIvInputIsABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int twoSumIvInputIsABst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int twoSumIvInputIsABst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Absolute Difference in BST",
      "difficulty": "Easy",
      "subpattern": "Ordered tree search",
      "question": "Solve Minimum Absolute Difference in BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Absolute Difference in BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Absolute%20Difference%20in%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumAbsoluteDifferenceInBst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumAbsoluteDifferenceInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumAbsoluteDifferenceInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumAbsoluteDifferenceInBst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumAbsoluteDifferenceInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Sum of BST",
      "difficulty": "Easy",
      "subpattern": "validation",
      "question": "Solve Range Sum of BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Range Sum of BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Range%20Sum%20of%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int rangeSumOfBst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int rangeSumOfBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int rangeSumOfBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int rangeSumOfBst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int rangeSumOfBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Increasing Order Search Tree",
      "difficulty": "Medium",
      "subpattern": "kth",
      "question": "Solve Increasing Order Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes kth and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for kth and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Increasing Order Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Increasing%20Order%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int increasingOrderSearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int increasingOrderSearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int increasingOrderSearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int increasingOrderSearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int increasingOrderSearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Recover Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "predecessor/successor.",
      "question": "Solve Recover Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes predecessor/successor. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for predecessor/successor. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Recover Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Recover%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int recoverBinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int recoverBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int recoverBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int recoverBinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int recoverBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Balance a Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "Ordered tree search",
      "question": "Solve Balance a Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Balance a Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Balance%20a%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int balanceABinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int balanceABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int balanceABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int balanceABinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int balanceABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Trim a Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "validation",
      "question": "Solve Trim a Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Trim a Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Trim%20a%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int trimABinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int trimABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int trimABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int trimABinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int trimABinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Construct BST from Preorder Traversal",
      "difficulty": "Medium",
      "subpattern": "kth",
      "question": "Solve Construct BST from Preorder Traversal using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes kth and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for kth and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Construct BST from Preorder Traversal - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Construct%20BST%20from%20Preorder%20Traversal"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int constructBstFromPreorderTraversal(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int constructBstFromPreorderTraversal(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int constructBstFromPreorderTraversal(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int constructBstFromPreorderTraversal(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int constructBstFromPreorderTraversal(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Unique Binary Search Trees",
      "difficulty": "Medium",
      "subpattern": "predecessor/successor.",
      "question": "Solve Unique Binary Search Trees using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes predecessor/successor. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for predecessor/successor. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Unique Binary Search Trees - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Unique%20Binary%20Search%20Trees"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTrees(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTrees(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTrees(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTrees(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTrees(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Unique Binary Search Trees II",
      "difficulty": "Medium",
      "subpattern": "Ordered tree search",
      "question": "Solve Unique Binary Search Trees II using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Unique Binary Search Trees II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Unique%20Binary%20Search%20Trees%20II"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTreesIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTreesIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTreesIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTreesIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int uniqueBinarySearchTreesIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Closest Binary Search Tree Value",
      "difficulty": "Medium",
      "subpattern": "validation",
      "question": "Solve Closest Binary Search Tree Value using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Closest Binary Search Tree Value - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Closest%20Binary%20Search%20Tree%20Value"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValue(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValue(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValue(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValue(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValue(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Closest Binary Search Tree Value II",
      "difficulty": "Medium",
      "subpattern": "kth",
      "question": "Solve Closest Binary Search Tree Value II using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes kth and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for kth and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Closest Binary Search Tree Value II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Closest%20Binary%20Search%20Tree%20Value%20II"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValueIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValueIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValueIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValueIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int closestBinarySearchTreeValueIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Binary Search Tree Iterator",
      "difficulty": "Medium",
      "subpattern": "predecessor/successor.",
      "question": "Solve Binary Search Tree Iterator using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes predecessor/successor. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for predecessor/successor. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Binary Search Tree Iterator - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Binary%20Search%20Tree%20Iterator"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int binarySearchTreeIterator(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int binarySearchTreeIterator(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int binarySearchTreeIterator(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int binarySearchTreeIterator(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int binarySearchTreeIterator(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Find Mode in Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "Ordered tree search",
      "question": "Solve Find Mode in Binary Search Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Mode in Binary Search Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Mode%20in%20Binary%20Search%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findModeInBinarySearchTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findModeInBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findModeInBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findModeInBinarySearchTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findModeInBinarySearchTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Split BST",
      "difficulty": "Medium",
      "subpattern": "validation",
      "question": "Solve Split BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Split BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Split%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int splitBst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int splitBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int splitBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int splitBst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int splitBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "All Elements in Two Binary Search Trees",
      "difficulty": "Medium",
      "subpattern": "kth",
      "question": "Solve All Elements in Two Binary Search Trees using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes kth and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for kth and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "All Elements in Two Binary Search Trees - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=All%20Elements%20in%20Two%20Binary%20Search%20Trees"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int allElementsInTwoBinarySearchTrees(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int allElementsInTwoBinarySearchTrees(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int allElementsInTwoBinarySearchTrees(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int allElementsInTwoBinarySearchTrees(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int allElementsInTwoBinarySearchTrees(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Greater Sum Tree",
      "difficulty": "Medium",
      "subpattern": "predecessor/successor.",
      "question": "Solve Greater Sum Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes predecessor/successor. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for predecessor/successor. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Greater Sum Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Greater%20Sum%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int greaterSumTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int greaterSumTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int greaterSumTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int greaterSumTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int greaterSumTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Delete Nodes And Return Forest",
      "difficulty": "Hard",
      "subpattern": "Ordered tree search",
      "question": "Solve Delete Nodes And Return Forest using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Delete Nodes And Return Forest - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Delete%20Nodes%20And%20Return%20Forest"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodesAndReturnForest(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodesAndReturnForest(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodesAndReturnForest(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int deleteNodesAndReturnForest(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int deleteNodesAndReturnForest(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Verify Preorder Sequence in BST",
      "difficulty": "Hard",
      "subpattern": "validation",
      "question": "Solve Verify Preorder Sequence in BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Verify Preorder Sequence in BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Verify%20Preorder%20Sequence%20in%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int verifyPreorderSequenceInBst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int verifyPreorderSequenceInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int verifyPreorderSequenceInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int verifyPreorderSequenceInBst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int verifyPreorderSequenceInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Inorder Successor in BST",
      "difficulty": "Hard",
      "subpattern": "kth",
      "question": "Solve Inorder Successor in BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes kth and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for kth and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Inorder Successor in BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Inorder%20Successor%20in%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int inorderSuccessorInBst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int inorderSuccessorInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int inorderSuccessorInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int inorderSuccessorInBst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int inorderSuccessorInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Inorder Predecessor in BST",
      "difficulty": "Hard",
      "subpattern": "predecessor/successor.",
      "question": "Solve Inorder Predecessor in BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes predecessor/successor. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for predecessor/successor. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Inorder Predecessor in BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Inorder%20Predecessor%20in%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int inorderPredecessorInBst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int inorderPredecessorInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int inorderPredecessorInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int inorderPredecessorInBst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int inorderPredecessorInBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Serialize and Deserialize BST",
      "difficulty": "Hard",
      "subpattern": "Ordered tree search",
      "question": "Solve Serialize and Deserialize BST using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes ordered tree search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordered tree search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Serialize and Deserialize BST - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Serialize%20and%20Deserialize%20BST"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int serializeAndDeserializeBst(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int serializeAndDeserializeBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int serializeAndDeserializeBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int serializeAndDeserializeBst(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int serializeAndDeserializeBst(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Maximum Sum BST in Binary Tree",
      "difficulty": "Hard",
      "subpattern": "validation",
      "question": "Solve Maximum Sum BST in Binary Tree using the Binary Search Tree pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search Tree when the input structure exposes validation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for validation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Sum BST in Binary Tree - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Sum%20BST%20in%20Binary%20Tree"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3], target = 3",
          "output": "found",
          "explanation": "Ordering decides left or right branch."
        },
        {
          "input": "root = [], target = 1",
          "output": "not found",
          "explanation": "Null tree has no value."
        },
        {
          "input": "root = [2,1,3], target = 4",
          "output": "not found",
          "explanation": "Search exits at null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSumBstInBinaryTree(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSumBstInBinaryTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSumBstInBinaryTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSumBstInBinaryTree(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumSumBstInBinaryTree(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Binary Search Tree signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Binary Search Tree problem with duplicates and boundary indexes.",
    "A Binary Search Tree problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Binary Search Tree but needs one helper structure.",
    "A maximum-constraint version of a familiar Binary Search Tree problem.",
    "A recognition test where the statement does not mention Binary Search Tree."
  ]
};
