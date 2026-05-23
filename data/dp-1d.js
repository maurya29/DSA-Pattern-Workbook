const CURRENT_PATTERN = {
  "id": "dp-1d",
  "name": "1D Dynamic Programming",
  "summary": "Linear recurrence, take/skip, state compression.",
  "complete": true,
  "subpatterns": [
    "Core 1D Dynamic Programming recognition",
    "Boundary handling in 1D Dynamic Programming",
    "Optimized iterative 1D Dynamic Programming",
    "Recursive or DFS-style 1D Dynamic Programming",
    "Advanced 1D Dynamic Programming variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Climbing Stairs",
      "difficulty": "Easy",
      "subpattern": "Linear recurrence",
      "question": "Solve Climbing Stairs using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Climbing Stairs - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Climbing%20Stairs"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int climbingStairs(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int climbingStairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int climbingStairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int climbingStairs(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int climbingStairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Min Cost Climbing Stairs",
      "difficulty": "Easy",
      "subpattern": "take/skip",
      "question": "Solve Min Cost Climbing Stairs using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Min Cost Climbing Stairs - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Min%20Cost%20Climbing%20Stairs"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minCostClimbingStairs(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minCostClimbingStairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minCostClimbingStairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minCostClimbingStairs(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minCostClimbingStairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "House Robber",
      "difficulty": "Easy",
      "subpattern": "state compression.",
      "question": "Solve House Robber using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "House Robber - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=House%20Robber"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobber(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobber(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int houseRobber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "House Robber II",
      "difficulty": "Easy",
      "subpattern": "Linear recurrence",
      "question": "Solve House Robber II using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "House Robber II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=House%20Robber%20II"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobberIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobberIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobberIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int houseRobberIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int houseRobberIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Decode Ways",
      "difficulty": "Easy",
      "subpattern": "take/skip",
      "question": "Solve Decode Ways using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Decode Ways - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Decode%20Ways"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int decodeWays(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int decodeWays(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int decodeWays(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int decodeWays(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int decodeWays(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Coin Change",
      "difficulty": "Easy",
      "subpattern": "state compression.",
      "question": "Solve Coin Change using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Coin Change - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Coin%20Change"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Coin Change II",
      "difficulty": "Easy",
      "subpattern": "Linear recurrence",
      "question": "Solve Coin Change II using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Coin Change II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Coin%20Change%20II"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int coinChangeIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int coinChangeIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int coinChangeIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int coinChangeIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int coinChangeIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum IV",
      "difficulty": "Easy",
      "subpattern": "take/skip",
      "question": "Solve Combination Sum IV using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Combination Sum IV - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Combination%20Sum%20IV"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIv(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIv(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIv(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIv(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int combinationSumIv(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Increasing Subsequence",
      "difficulty": "Easy",
      "subpattern": "state compression.",
      "question": "Solve Longest Increasing Subsequence using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Longest Increasing Subsequence - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Longest%20Increasing%20Subsequence"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int longestIncreasingSubsequence(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int longestIncreasingSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int longestIncreasingSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestIncreasingSubsequence(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int longestIncreasingSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Arithmetic Subsequence",
      "difficulty": "Easy",
      "subpattern": "Linear recurrence",
      "question": "Solve Longest Arithmetic Subsequence using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Longest Arithmetic Subsequence - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Longest%20Arithmetic%20Subsequence"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int longestArithmeticSubsequence(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int longestArithmeticSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int longestArithmeticSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestArithmeticSubsequence(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int longestArithmeticSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Partition Equal Subset Sum",
      "difficulty": "Medium",
      "subpattern": "take/skip",
      "question": "Solve Partition Equal Subset Sum using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Partition Equal Subset Sum - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Partition%20Equal%20Subset%20Sum"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int partitionEqualSubsetSum(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int partitionEqualSubsetSum(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int partitionEqualSubsetSum(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int partitionEqualSubsetSum(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int partitionEqualSubsetSum(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Word Break",
      "difficulty": "Medium",
      "subpattern": "state compression.",
      "question": "Solve Word Break using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Word Break - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Word%20Break"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreak(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreak(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreak(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int wordBreak(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int wordBreak(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Perfect Squares",
      "difficulty": "Medium",
      "subpattern": "Linear recurrence",
      "question": "Solve Perfect Squares using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Perfect Squares - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Perfect%20Squares"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int perfectSquares(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int perfectSquares(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int perfectSquares(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int perfectSquares(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int perfectSquares(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Integer Break",
      "difficulty": "Medium",
      "subpattern": "take/skip",
      "question": "Solve Integer Break using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Integer Break - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Integer%20Break"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int integerBreak(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int integerBreak(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int integerBreak(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int integerBreak(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int integerBreak(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Product Subarray",
      "difficulty": "Medium",
      "subpattern": "state compression.",
      "question": "Solve Maximum Product Subarray using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Product Subarray - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Product%20Subarray"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumProductSubarray(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumProductSubarray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumProductSubarray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maximumProductSubarray(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumProductSubarray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Subarray",
      "difficulty": "Medium",
      "subpattern": "Linear recurrence",
      "question": "Solve Maximum Subarray using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Subarray - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Subarray"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSubarray(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSubarray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSubarray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maximumSubarray(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumSubarray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Best Time to Buy and Sell Stock",
      "difficulty": "Medium",
      "subpattern": "take/skip",
      "question": "Solve Best Time to Buy and Sell Stock using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Best Time to Buy and Sell Stock - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Best%20Time%20to%20Buy%20and%20Sell%20Stock"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStock(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStock(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStock(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStock(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStock(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Best Time to Buy and Sell Stock with Cooldown",
      "difficulty": "Medium",
      "subpattern": "state compression.",
      "question": "Solve Best Time to Buy and Sell Stock with Cooldown using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Best Time to Buy and Sell Stock with Cooldown - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Best%20Time%20to%20Buy%20and%20Sell%20Stock%20with%20Cooldown"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithCooldown(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithCooldown(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithCooldown(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithCooldown(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithCooldown(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Best Time to Buy and Sell Stock with Transaction Fee",
      "difficulty": "Medium",
      "subpattern": "Linear recurrence",
      "question": "Solve Best Time to Buy and Sell Stock with Transaction Fee using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Best Time to Buy and Sell Stock with Transaction Fee - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Best%20Time%20to%20Buy%20and%20Sell%20Stock%20with%20Transaction%20Fee"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithTransactionFee(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithTransactionFee(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithTransactionFee(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithTransactionFee(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int bestTimeToBuyAndSellStockWithTransactionFee(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Delete and Earn",
      "difficulty": "Medium",
      "subpattern": "take/skip",
      "question": "Solve Delete and Earn using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Delete and Earn - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Delete%20and%20Earn"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int deleteAndEarn(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int deleteAndEarn(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int deleteAndEarn(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int deleteAndEarn(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int deleteAndEarn(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Paint House",
      "difficulty": "Medium",
      "subpattern": "state compression.",
      "question": "Solve Paint House using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Paint House - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Paint%20House"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int paintHouse(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int paintHouse(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int paintHouse(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int paintHouse(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int paintHouse(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Paint Fence",
      "difficulty": "Medium",
      "subpattern": "Linear recurrence",
      "question": "Solve Paint Fence using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Paint Fence - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Paint%20Fence"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int paintFence(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int paintFence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int paintFence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int paintFence(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int paintFence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Longest Valid Parentheses",
      "difficulty": "Medium",
      "subpattern": "take/skip",
      "question": "Solve Longest Valid Parentheses using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Longest Valid Parentheses - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Longest%20Valid%20Parentheses"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int longestValidParentheses(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int longestValidParentheses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int longestValidParentheses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestValidParentheses(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int longestValidParentheses(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Number of Longest Increasing Subsequence",
      "difficulty": "Medium",
      "subpattern": "state compression.",
      "question": "Solve Number of Longest Increasing Subsequence using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Number of Longest Increasing Subsequence - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Number%20of%20Longest%20Increasing%20Subsequence"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfLongestIncreasingSubsequence(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfLongestIncreasingSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfLongestIncreasingSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfLongestIncreasingSubsequence(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numberOfLongestIncreasingSubsequence(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Russian Doll Envelopes",
      "difficulty": "Hard",
      "subpattern": "Linear recurrence",
      "question": "Solve Russian Doll Envelopes using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Russian Doll Envelopes - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Russian%20Doll%20Envelopes"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int russianDollEnvelopes(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int russianDollEnvelopes(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int russianDollEnvelopes(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int russianDollEnvelopes(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int russianDollEnvelopes(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Jump Game",
      "difficulty": "Hard",
      "subpattern": "take/skip",
      "question": "Solve Jump Game using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Jump Game - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Jump%20Game"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGame(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGame(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGame(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGame(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int jumpGame(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Jump Game II",
      "difficulty": "Hard",
      "subpattern": "state compression.",
      "question": "Solve Jump Game II using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Jump Game II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Jump%20Game%20II"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGameIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGameIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGameIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int jumpGameIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int jumpGameIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Cost For Tickets",
      "difficulty": "Hard",
      "subpattern": "Linear recurrence",
      "question": "Solve Minimum Cost For Tickets using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes linear recurrence and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for linear recurrence and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Cost For Tickets - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Cost%20For%20Tickets"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostForTickets(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostForTickets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostForTickets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostForTickets(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumCostForTickets(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Domino and Tromino Tiling",
      "difficulty": "Hard",
      "subpattern": "take/skip",
      "question": "Solve Domino and Tromino Tiling using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes take/skip and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for take/skip and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Domino and Tromino Tiling - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Domino%20and%20Tromino%20Tiling"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int dominoAndTrominoTiling(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int dominoAndTrominoTiling(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int dominoAndTrominoTiling(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int dominoAndTrominoTiling(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int dominoAndTrominoTiling(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Count Vowels Permutation",
      "difficulty": "Hard",
      "subpattern": "state compression.",
      "question": "Solve Count Vowels Permutation using the 1D Dynamic Programming pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use 1D Dynamic Programming when the input structure exposes state compression. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for state compression. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Count Vowels Permutation - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Count%20Vowels%20Permutation"
      },
      "examples": [
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Each index uses previous states."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No item gives zero score."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Single state is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countVowelsPermutation(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countVowelsPermutation(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countVowelsPermutation(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countVowelsPermutation(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countVowelsPermutation(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious 1D Dynamic Programming signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden 1D Dynamic Programming problem with duplicates and boundary indexes.",
    "A 1D Dynamic Programming problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like 1D Dynamic Programming but needs one helper structure.",
    "A maximum-constraint version of a familiar 1D Dynamic Programming problem.",
    "A recognition test where the statement does not mention 1D Dynamic Programming."
  ]
};
