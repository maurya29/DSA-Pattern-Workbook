const CURRENT_PATTERN = {
  "id": "sorting",
  "name": "Sorting",
  "summary": "Custom ordering, partitioning, counting/radix sort.",
  "complete": true,
  "subpatterns": [
    "Core Sorting recognition",
    "Boundary handling in Sorting",
    "Optimized iterative Sorting",
    "Recursive or DFS-style Sorting",
    "Advanced Sorting variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Sort Colors",
      "difficulty": "Easy",
      "subpattern": "Custom ordering",
      "question": "Solve Sort Colors using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sort Colors - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sort%20Colors"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int sortColors(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int sortColors(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int sortColors(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int sortColors(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int sortColors(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge Sorted Array",
      "difficulty": "Easy",
      "subpattern": "partitioning",
      "question": "Solve Merge Sorted Array using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Merge Sorted Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Merge%20Sorted%20Array"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int mergeSortedArray(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int mergeSortedArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int mergeSortedArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int mergeSortedArray(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int mergeSortedArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Largest Element in an Array",
      "difficulty": "Easy",
      "subpattern": "counting/radix sort.",
      "question": "Solve Kth Largest Element in an Array using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Kth Largest Element in an Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Kth%20Largest%20Element%20in%20an%20Array"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Top K Frequent Elements",
      "difficulty": "Easy",
      "subpattern": "Custom ordering",
      "question": "Solve Top K Frequent Elements using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Top K Frequent Elements - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Top%20K%20Frequent%20Elements"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Largest Number",
      "difficulty": "Easy",
      "subpattern": "partitioning",
      "question": "Solve Largest Number using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Largest Number - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Largest%20Number"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int largestNumber(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int largestNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int largestNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int largestNumber(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int largestNumber(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Meeting Rooms",
      "difficulty": "Easy",
      "subpattern": "counting/radix sort.",
      "question": "Solve Meeting Rooms using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Meeting Rooms - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Meeting%20Rooms"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRooms(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRooms(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRooms(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRooms(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int meetingRooms(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Meeting Rooms II",
      "difficulty": "Easy",
      "subpattern": "Custom ordering",
      "question": "Solve Meeting Rooms II using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Meeting Rooms II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Meeting%20Rooms%20II"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge Intervals",
      "difficulty": "Easy",
      "subpattern": "partitioning",
      "question": "Solve Merge Intervals using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Merge Intervals - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Merge%20Intervals"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int mergeIntervals(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int mergeIntervals(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int mergeIntervals(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int mergeIntervals(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int mergeIntervals(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Non-overlapping Intervals",
      "difficulty": "Easy",
      "subpattern": "counting/radix sort.",
      "question": "Solve Non-overlapping Intervals using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Non-overlapping Intervals - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Non-overlapping%20Intervals"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int nonOverlappingIntervals(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int nonOverlappingIntervals(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int nonOverlappingIntervals(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int nonOverlappingIntervals(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int nonOverlappingIntervals(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "H-Index",
      "difficulty": "Easy",
      "subpattern": "Custom ordering",
      "question": "Solve H-Index using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "H-Index - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=H-Index"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int hIndex(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int hIndex(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int hIndex(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int hIndex(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int hIndex(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Wiggle Sort",
      "difficulty": "Medium",
      "subpattern": "partitioning",
      "question": "Solve Wiggle Sort using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Wiggle Sort - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Wiggle%20Sort"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSort(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSort(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSort(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSort(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int wiggleSort(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Wiggle Sort II",
      "difficulty": "Medium",
      "subpattern": "counting/radix sort.",
      "question": "Solve Wiggle Sort II using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Wiggle Sort II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Wiggle%20Sort%20II"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSortIi(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSortIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSortIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int wiggleSortIi(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int wiggleSortIi(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sort List",
      "difficulty": "Medium",
      "subpattern": "Custom ordering",
      "question": "Solve Sort List using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sort List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sort%20List"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int sortList(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int sortList(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int sortList(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int sortList(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int sortList(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Insertion Sort List",
      "difficulty": "Medium",
      "subpattern": "partitioning",
      "question": "Solve Insertion Sort List using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Insertion Sort List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Insertion%20Sort%20List"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int insertionSortList(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int insertionSortList(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int insertionSortList(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int insertionSortList(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int insertionSortList(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Relative Sort Array",
      "difficulty": "Medium",
      "subpattern": "counting/radix sort.",
      "question": "Solve Relative Sort Array using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Relative Sort Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Relative%20Sort%20Array"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int relativeSortArray(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int relativeSortArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int relativeSortArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int relativeSortArray(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int relativeSortArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sort Characters By Frequency",
      "difficulty": "Medium",
      "subpattern": "Custom ordering",
      "question": "Solve Sort Characters By Frequency using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sort Characters By Frequency - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sort%20Characters%20By%20Frequency"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Gap",
      "difficulty": "Medium",
      "subpattern": "partitioning",
      "question": "Solve Maximum Gap using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Gap - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Gap"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Count of Smaller Numbers After Self",
      "difficulty": "Medium",
      "subpattern": "counting/radix sort.",
      "question": "Solve Count of Smaller Numbers After Self using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Count of Smaller Numbers After Self - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Count%20of%20Smaller%20Numbers%20After%20Self"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countOfSmallerNumbersAfterSelf(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countOfSmallerNumbersAfterSelf(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countOfSmallerNumbersAfterSelf(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countOfSmallerNumbersAfterSelf(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countOfSmallerNumbersAfterSelf(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Reverse Pairs",
      "difficulty": "Medium",
      "subpattern": "Custom ordering",
      "question": "Solve Reverse Pairs using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Reverse Pairs - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Reverse%20Pairs"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Queue Reconstruction by Height",
      "difficulty": "Medium",
      "subpattern": "partitioning",
      "question": "Solve Queue Reconstruction by Height using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Queue Reconstruction by Height - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Queue%20Reconstruction%20by%20Height"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int queueReconstructionByHeight(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int queueReconstructionByHeight(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int queueReconstructionByHeight(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int queueReconstructionByHeight(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int queueReconstructionByHeight(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Car Fleet",
      "difficulty": "Medium",
      "subpattern": "counting/radix sort.",
      "question": "Solve Car Fleet using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Car Fleet - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Car%20Fleet"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Rank Teams by Votes",
      "difficulty": "Medium",
      "subpattern": "Custom ordering",
      "question": "Solve Rank Teams by Votes using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Rank Teams by Votes - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Rank%20Teams%20by%20Votes"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int rankTeamsByVotes(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int rankTeamsByVotes(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int rankTeamsByVotes(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int rankTeamsByVotes(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int rankTeamsByVotes(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Number of Arrows to Burst Balloons",
      "difficulty": "Medium",
      "subpattern": "partitioning",
      "question": "Solve Minimum Number of Arrows to Burst Balloons using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Number of Arrows to Burst Balloons - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Number%20of%20Arrows%20to%20Burst%20Balloons"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfArrowsToBurstBalloons(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfArrowsToBurstBalloons(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfArrowsToBurstBalloons(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfArrowsToBurstBalloons(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfArrowsToBurstBalloons(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Sort Array By Parity",
      "difficulty": "Medium",
      "subpattern": "counting/radix sort.",
      "question": "Solve Sort Array By Parity using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sort Array By Parity - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sort%20Array%20By%20Parity"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int sortArrayByParity(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int sortArrayByParity(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int sortArrayByParity(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int sortArrayByParity(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int sortArrayByParity(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Squares of a Sorted Array",
      "difficulty": "Hard",
      "subpattern": "Custom ordering",
      "question": "Solve Squares of a Sorted Array using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Squares of a Sorted Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Squares%20of%20a%20Sorted%20Array"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int squaresOfASortedArray(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int squaresOfASortedArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int squaresOfASortedArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int squaresOfASortedArray(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int squaresOfASortedArray(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Pancake Sorting",
      "difficulty": "Hard",
      "subpattern": "partitioning",
      "question": "Solve Pancake Sorting using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Pancake Sorting - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Pancake%20Sorting"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int pancakeSorting(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int pancakeSorting(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int pancakeSorting(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int pancakeSorting(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int pancakeSorting(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Hand of Straights",
      "difficulty": "Hard",
      "subpattern": "counting/radix sort.",
      "question": "Solve Hand of Straights using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Hand of Straights - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Hand%20of%20Straights"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int handOfStraights(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int handOfStraights(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int handOfStraights(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int handOfStraights(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int handOfStraights(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Find K Closest Elements",
      "difficulty": "Hard",
      "subpattern": "Custom ordering",
      "question": "Solve Find K Closest Elements using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes custom ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for custom ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find K Closest Elements - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20K%20Closest%20Elements"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findKClosestElements(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findKClosestElements(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findKClosestElements(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findKClosestElements(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findKClosestElements(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Increment to Make Array Unique",
      "difficulty": "Hard",
      "subpattern": "partitioning",
      "question": "Solve Minimum Increment to Make Array Unique using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes partitioning and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for partitioning and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Increment to Make Array Unique - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Increment%20to%20Make%20Array%20Unique"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumIncrementToMakeArrayUnique(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumIncrementToMakeArrayUnique(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumIncrementToMakeArrayUnique(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumIncrementToMakeArrayUnique(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumIncrementToMakeArrayUnique(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Sort the Matrix Diagonally",
      "difficulty": "Hard",
      "subpattern": "counting/radix sort.",
      "question": "Solve Sort the Matrix Diagonally using the Sorting pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Sorting when the input structure exposes counting/radix sort. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for counting/radix sort. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sort the Matrix Diagonally - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sort%20the%20Matrix%20Diagonally"
      },
      "examples": [
        {
          "input": "nums = [5,2,3,1]",
          "output": "[1,2,3,5]",
          "explanation": "Ordering exposes the target relation."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "Empty input remains empty."
        },
        {
          "input": "nums = [2,2,1]",
          "output": "[1,2,2]",
          "explanation": "Duplicates stay in sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int sortTheMatrixDiagonally(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int sortTheMatrixDiagonally(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int sortTheMatrixDiagonally(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int sortTheMatrixDiagonally(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int sortTheMatrixDiagonally(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Sorting signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Sorting problem with duplicates and boundary indexes.",
    "A Sorting problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Sorting but needs one helper structure.",
    "A maximum-constraint version of a familiar Sorting problem.",
    "A recognition test where the statement does not mention Sorting."
  ]
};
