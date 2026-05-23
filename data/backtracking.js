const CURRENT_PATTERN = {
  "id": "backtracking",
  "name": "Backtracking",
  "summary": "Subsets, permutations, combinations, constraint search.",
  "complete": true,
  "subpatterns": [
    "Core Backtracking recognition",
    "Boundary handling in Backtracking",
    "Optimized iterative Backtracking",
    "Recursive or DFS-style Backtracking",
    "Advanced Backtracking variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Subsets",
      "difficulty": "Easy",
      "subpattern": "Subsets",
      "question": "Solve Subsets using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Subsets - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Subsets"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int subsets(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int subsets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int subsets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int subsets(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int subsets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Subsets II",
      "difficulty": "Easy",
      "subpattern": "permutations",
      "question": "Solve Subsets II using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Subsets II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Subsets%20II"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int subsetsIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int subsetsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int subsetsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int subsetsIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int subsetsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Permutations",
      "difficulty": "Easy",
      "subpattern": "combinations",
      "question": "Solve Permutations using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes combinations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for combinations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Permutations - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Permutations"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int permutations(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int permutations(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int permutations(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int permutations(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int permutations(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Permutations II",
      "difficulty": "Easy",
      "subpattern": "constraint search.",
      "question": "Solve Permutations II using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes constraint search. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for constraint search. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Permutations II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Permutations%20II"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int permutationsIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int permutationsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int permutationsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int permutationsIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int permutationsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combinations",
      "difficulty": "Easy",
      "subpattern": "Subsets",
      "question": "Solve Combinations using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Combinations - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Combinations"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int combinations(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int combinations(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int combinations(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int combinations(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int combinations(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum",
      "difficulty": "Easy",
      "subpattern": "permutations",
      "question": "Solve Combination Sum using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Combination Sum - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Combination%20Sum"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSum(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSum(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSum(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSum(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int combinationSum(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum II",
      "difficulty": "Easy",
      "subpattern": "combinations",
      "question": "Solve Combination Sum II using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes combinations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for combinations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Combination Sum II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Combination%20Sum%20II"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum III",
      "difficulty": "Easy",
      "subpattern": "constraint search.",
      "question": "Solve Combination Sum III using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes constraint search. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for constraint search. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Combination Sum III - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Combination%20Sum%20III"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIii(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIii(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIii(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIii(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIii(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Generate Parentheses",
      "difficulty": "Easy",
      "subpattern": "Subsets",
      "question": "Solve Generate Parentheses using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Generate Parentheses - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Generate%20Parentheses"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int generateParentheses(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int generateParentheses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int generateParentheses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int generateParentheses(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int generateParentheses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Letter Combinations of a Phone Number",
      "difficulty": "Easy",
      "subpattern": "permutations",
      "question": "Solve Letter Combinations of a Phone Number using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Letter Combinations of a Phone Number - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Letter%20Combinations%20of%20a%20Phone%20Number"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int letterCombinationsOfAPhoneNumber(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int letterCombinationsOfAPhoneNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int letterCombinationsOfAPhoneNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int letterCombinationsOfAPhoneNumber(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int letterCombinationsOfAPhoneNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Palindrome Partitioning",
      "difficulty": "Medium",
      "subpattern": "combinations",
      "question": "Solve Palindrome Partitioning using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes combinations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for combinations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Palindrome Partitioning - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Palindrome%20Partitioning"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int palindromePartitioning(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int palindromePartitioning(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int palindromePartitioning(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int palindromePartitioning(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int palindromePartitioning(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Restore IP Addresses",
      "difficulty": "Medium",
      "subpattern": "constraint search.",
      "question": "Solve Restore IP Addresses using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes constraint search. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for constraint search. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Restore IP Addresses - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Restore%20IP%20Addresses"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int restoreIpAddresses(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int restoreIpAddresses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int restoreIpAddresses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int restoreIpAddresses(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int restoreIpAddresses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Word Search",
      "difficulty": "Medium",
      "subpattern": "Subsets",
      "question": "Solve Word Search using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Word Search - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Word%20Search"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int wordSearch(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int wordSearch(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int wordSearch(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int wordSearch(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int wordSearch(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "N-Queens",
      "difficulty": "Medium",
      "subpattern": "permutations",
      "question": "Solve N-Queens using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "N-Queens - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=N-Queens"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int nQueens(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int nQueens(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int nQueens(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int nQueens(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int nQueens(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sudoku Solver",
      "difficulty": "Medium",
      "subpattern": "combinations",
      "question": "Solve Sudoku Solver using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes combinations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for combinations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sudoku Solver - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sudoku%20Solver"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int sudokuSolver(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int sudokuSolver(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int sudokuSolver(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int sudokuSolver(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int sudokuSolver(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Rat in a Maze",
      "difficulty": "Medium",
      "subpattern": "constraint search.",
      "question": "Solve Rat in a Maze using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes constraint search. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for constraint search. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Rat in a Maze - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Rat%20in%20a%20Maze"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int ratInAMaze(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int ratInAMaze(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int ratInAMaze(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int ratInAMaze(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int ratInAMaze(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Unique Paths III",
      "difficulty": "Medium",
      "subpattern": "Subsets",
      "question": "Solve Unique Paths III using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Unique Paths III - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Unique%20Paths%20III"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIii(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIii(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIii(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIii(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIii(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Matchsticks to Square",
      "difficulty": "Medium",
      "subpattern": "permutations",
      "question": "Solve Matchsticks to Square using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Matchsticks to Square - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Matchsticks%20to%20Square"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int matchsticksToSquare(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int matchsticksToSquare(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int matchsticksToSquare(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int matchsticksToSquare(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int matchsticksToSquare(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Partition to K Equal Sum Subsets",
      "difficulty": "Medium",
      "subpattern": "combinations",
      "question": "Solve Partition to K Equal Sum Subsets using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes combinations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for combinations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Partition to K Equal Sum Subsets - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Partition%20to%20K%20Equal%20Sum%20Subsets"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int partitionToKEqualSumSubsets(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int partitionToKEqualSumSubsets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int partitionToKEqualSumSubsets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int partitionToKEqualSumSubsets(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int partitionToKEqualSumSubsets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Beautiful Arrangement",
      "difficulty": "Medium",
      "subpattern": "constraint search.",
      "question": "Solve Beautiful Arrangement using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes constraint search. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for constraint search. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Beautiful Arrangement - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Beautiful%20Arrangement"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int beautifulArrangement(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int beautifulArrangement(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int beautifulArrangement(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int beautifulArrangement(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int beautifulArrangement(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Expression Add Operators",
      "difficulty": "Medium",
      "subpattern": "Subsets",
      "question": "Solve Expression Add Operators using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Expression Add Operators - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Expression%20Add%20Operators"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int expressionAddOperators(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int expressionAddOperators(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int expressionAddOperators(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int expressionAddOperators(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int expressionAddOperators(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Word Break II",
      "difficulty": "Medium",
      "subpattern": "permutations",
      "question": "Solve Word Break II using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Word Break II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Word%20Break%20II"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreakIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreakIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreakIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreakIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int wordBreakIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Gray Code",
      "difficulty": "Medium",
      "subpattern": "combinations",
      "question": "Solve Gray Code using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes combinations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for combinations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Gray Code - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Gray%20Code"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int grayCode(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int grayCode(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int grayCode(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int grayCode(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int grayCode(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Increasing Subsequences",
      "difficulty": "Medium",
      "subpattern": "constraint search.",
      "question": "Solve Increasing Subsequences using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes constraint search. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for constraint search. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Increasing Subsequences - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Increasing%20Subsequences"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int increasingSubsequences(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int increasingSubsequences(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int increasingSubsequences(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int increasingSubsequences(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int increasingSubsequences(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Iterator for Combination",
      "difficulty": "Hard",
      "subpattern": "Subsets",
      "question": "Solve Iterator for Combination using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Iterator for Combination - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Iterator%20for%20Combination"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int iteratorForCombination(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int iteratorForCombination(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int iteratorForCombination(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int iteratorForCombination(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int iteratorForCombination(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "The kth Lexicographical Happy String",
      "difficulty": "Hard",
      "subpattern": "permutations",
      "question": "Solve The kth Lexicographical Happy String using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "The kth Lexicographical Happy String - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=The%20kth%20Lexicographical%20Happy%20String"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int theKthLexicographicalHappyString(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int theKthLexicographicalHappyString(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int theKthLexicographicalHappyString(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int theKthLexicographicalHappyString(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int theKthLexicographicalHappyString(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Maximum Length of a Concatenated String with Unique Characters",
      "difficulty": "Hard",
      "subpattern": "combinations",
      "question": "Solve Maximum Length of a Concatenated String with Unique Characters using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes combinations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for combinations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Length of a Concatenated String with Unique Characters - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Length%20of%20a%20Concatenated%20String%20with%20Unique%20Characters"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumLengthOfAConcatenatedStringWithUniqueCharacters(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumLengthOfAConcatenatedStringWithUniqueCharacters(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumLengthOfAConcatenatedStringWithUniqueCharacters(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maximumLengthOfAConcatenatedStringWithUniqueCharacters(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumLengthOfAConcatenatedStringWithUniqueCharacters(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Number of Squareful Arrays",
      "difficulty": "Hard",
      "subpattern": "constraint search.",
      "question": "Solve Number of Squareful Arrays using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes constraint search. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for constraint search. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Number of Squareful Arrays - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Number%20of%20Squareful%20Arrays"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfSquarefulArrays(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfSquarefulArrays(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfSquarefulArrays(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfSquarefulArrays(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numberOfSquarefulArrays(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Shopping Offers",
      "difficulty": "Hard",
      "subpattern": "Subsets",
      "question": "Solve Shopping Offers using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes subsets and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for subsets and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Shopping Offers - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Shopping%20Offers"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Additive Number",
      "difficulty": "Hard",
      "subpattern": "permutations",
      "question": "Solve Additive Number using the Backtracking pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Backtracking when the input structure exposes permutations and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for permutations and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Additive Number - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Additive%20Number"
      },
      "examples": [
        {
          "input": "candidates = [1,2,3]",
          "output": "valid choices only",
          "explanation": "The search chooses, explores, and unchooses."
        },
        {
          "input": "candidates = []",
          "output": "[]",
          "explanation": "No branches exist."
        },
        {
          "input": "candidates = [1,1,2]",
          "output": "duplicates handled",
          "explanation": "Sorted order allows duplicate skipping."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int additiveNumber(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int additiveNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int additiveNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int additiveNumber(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int additiveNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Backtracking signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Backtracking problem with duplicates and boundary indexes.",
    "A Backtracking problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Backtracking but needs one helper structure.",
    "A maximum-constraint version of a familiar Backtracking problem.",
    "A recognition test where the statement does not mention Backtracking."
  ]
};
