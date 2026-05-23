const CURRENT_PATTERN = {
  "id": "concurrency",
  "name": "Concurrency Basics",
  "summary": "Locks, ordering, producer-consumer style problems.",
  "complete": true,
  "subpatterns": [
    "Core Concurrency Basics recognition",
    "Boundary handling in Concurrency Basics",
    "Optimized iterative Concurrency Basics",
    "Recursive or DFS-style Concurrency Basics",
    "Advanced Concurrency Basics variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Print in Order",
      "difficulty": "Easy",
      "subpattern": "Locks",
      "question": "Solve Print in Order using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Print in Order - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Print%20in%20Order"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int printInOrder(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int printInOrder(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int printInOrder(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int printInOrder(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int printInOrder(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Print FooBar Alternately",
      "difficulty": "Easy",
      "subpattern": "ordering",
      "question": "Solve Print FooBar Alternately using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Print FooBar Alternately - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Print%20FooBar%20Alternately"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int printFoobarAlternately(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int printFoobarAlternately(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int printFoobarAlternately(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int printFoobarAlternately(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int printFoobarAlternately(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Print Zero Even Odd",
      "difficulty": "Easy",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Print Zero Even Odd using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Print Zero Even Odd - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Print%20Zero%20Even%20Odd"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int printZeroEvenOdd(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int printZeroEvenOdd(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int printZeroEvenOdd(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int printZeroEvenOdd(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int printZeroEvenOdd(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Building H2O",
      "difficulty": "Easy",
      "subpattern": "Locks",
      "question": "Solve Building H2O using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Building H2O - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Building%20H2O"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int buildingH2o(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int buildingH2o(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int buildingH2o(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int buildingH2o(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int buildingH2o(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Fizz Buzz Multithreaded",
      "difficulty": "Easy",
      "subpattern": "ordering",
      "question": "Solve Fizz Buzz Multithreaded using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Fizz Buzz Multithreaded - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Fizz%20Buzz%20Multithreaded"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int fizzBuzzMultithreaded(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int fizzBuzzMultithreaded(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int fizzBuzzMultithreaded(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int fizzBuzzMultithreaded(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int fizzBuzzMultithreaded(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "The Dining Philosophers",
      "difficulty": "Easy",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve The Dining Philosophers using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "The Dining Philosophers - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=The%20Dining%20Philosophers"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int theDiningPhilosophers(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int theDiningPhilosophers(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int theDiningPhilosophers(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int theDiningPhilosophers(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int theDiningPhilosophers(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Bounded Blocking Queue",
      "difficulty": "Easy",
      "subpattern": "Locks",
      "question": "Solve Design Bounded Blocking Queue using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Design Bounded Blocking Queue - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Design%20Bounded%20Blocking%20Queue"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int designBoundedBlockingQueue(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int designBoundedBlockingQueue(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int designBoundedBlockingQueue(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int designBoundedBlockingQueue(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int designBoundedBlockingQueue(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Traffic Light Controlled Intersection",
      "difficulty": "Easy",
      "subpattern": "ordering",
      "question": "Solve Traffic Light Controlled Intersection using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Traffic Light Controlled Intersection - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Traffic%20Light%20Controlled%20Intersection"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int trafficLightControlledIntersection(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int trafficLightControlledIntersection(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int trafficLightControlledIntersection(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int trafficLightControlledIntersection(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int trafficLightControlledIntersection(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Web Crawler Multithreaded",
      "difficulty": "Easy",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Web Crawler Multithreaded using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Web Crawler Multithreaded - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Web%20Crawler%20Multithreaded"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int webCrawlerMultithreaded(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int webCrawlerMultithreaded(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int webCrawlerMultithreaded(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int webCrawlerMultithreaded(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int webCrawlerMultithreaded(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Producer Consumer Buffer",
      "difficulty": "Easy",
      "subpattern": "Locks",
      "question": "Solve Producer Consumer Buffer using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Producer Consumer Buffer - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Producer%20Consumer%20Buffer"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int producerConsumerBuffer(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int producerConsumerBuffer(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int producerConsumerBuffer(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int producerConsumerBuffer(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int producerConsumerBuffer(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Read Write Lock",
      "difficulty": "Medium",
      "subpattern": "ordering",
      "question": "Solve Read Write Lock using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Read Write Lock - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Read%20Write%20Lock"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int readWriteLock(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int readWriteLock(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int readWriteLock(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int readWriteLock(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int readWriteLock(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Semaphore Rate Limiter",
      "difficulty": "Medium",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Semaphore Rate Limiter using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Semaphore Rate Limiter - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Semaphore%20Rate%20Limiter"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int semaphoreRateLimiter(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int semaphoreRateLimiter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int semaphoreRateLimiter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int semaphoreRateLimiter(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int semaphoreRateLimiter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Token Bucket Rate Limiter",
      "difficulty": "Medium",
      "subpattern": "Locks",
      "question": "Solve Token Bucket Rate Limiter using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Token Bucket Rate Limiter - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Token%20Bucket%20Rate%20Limiter"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int tokenBucketRateLimiter(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int tokenBucketRateLimiter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int tokenBucketRateLimiter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int tokenBucketRateLimiter(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int tokenBucketRateLimiter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Thread Safe Counter",
      "difficulty": "Medium",
      "subpattern": "ordering",
      "question": "Solve Thread Safe Counter using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Thread Safe Counter - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Thread%20Safe%20Counter"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeCounter(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeCounter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeCounter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeCounter(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int threadSafeCounter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Thread Safe Singleton",
      "difficulty": "Medium",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Thread Safe Singleton using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Thread Safe Singleton - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Thread%20Safe%20Singleton"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeSingleton(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeSingleton(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeSingleton(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int threadSafeSingleton(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int threadSafeSingleton(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Barrier Synchronization",
      "difficulty": "Medium",
      "subpattern": "Locks",
      "question": "Solve Barrier Synchronization using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Barrier Synchronization - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Barrier%20Synchronization"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int barrierSynchronization(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int barrierSynchronization(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int barrierSynchronization(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int barrierSynchronization(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int barrierSynchronization(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Cyclic Barrier Demo",
      "difficulty": "Medium",
      "subpattern": "ordering",
      "question": "Solve Cyclic Barrier Demo using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Cyclic Barrier Demo - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Cyclic%20Barrier%20Demo"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int cyclicBarrierDemo(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int cyclicBarrierDemo(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int cyclicBarrierDemo(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int cyclicBarrierDemo(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int cyclicBarrierDemo(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Countdown Latch Demo",
      "difficulty": "Medium",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Countdown Latch Demo using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Countdown Latch Demo - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Countdown%20Latch%20Demo"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countdownLatchDemo(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countdownLatchDemo(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countdownLatchDemo(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countdownLatchDemo(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countdownLatchDemo(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Blocking Queue with wait notify",
      "difficulty": "Medium",
      "subpattern": "Locks",
      "question": "Solve Blocking Queue with wait notify using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Blocking Queue with wait notify - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Blocking%20Queue%20with%20wait%20notify"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int blockingQueueWithWaitNotify(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int blockingQueueWithWaitNotify(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int blockingQueueWithWaitNotify(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int blockingQueueWithWaitNotify(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int blockingQueueWithWaitNotify(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Executor Completion Service",
      "difficulty": "Medium",
      "subpattern": "ordering",
      "question": "Solve Executor Completion Service using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Executor Completion Service - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Executor%20Completion%20Service"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int executorCompletionService(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int executorCompletionService(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int executorCompletionService(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int executorCompletionService(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int executorCompletionService(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Future Timeout Handling",
      "difficulty": "Medium",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Future Timeout Handling using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Future Timeout Handling - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Future%20Timeout%20Handling"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int futureTimeoutHandling(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int futureTimeoutHandling(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int futureTimeoutHandling(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int futureTimeoutHandling(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int futureTimeoutHandling(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Deadlock Prevention Ordering",
      "difficulty": "Medium",
      "subpattern": "Locks",
      "question": "Solve Deadlock Prevention Ordering using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Deadlock Prevention Ordering - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Deadlock%20Prevention%20Ordering"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int deadlockPreventionOrdering(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int deadlockPreventionOrdering(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int deadlockPreventionOrdering(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int deadlockPreventionOrdering(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int deadlockPreventionOrdering(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Dining Savages Variation",
      "difficulty": "Medium",
      "subpattern": "ordering",
      "question": "Solve Dining Savages Variation using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Dining Savages Variation - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Dining%20Savages%20Variation"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int diningSavagesVariation(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int diningSavagesVariation(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int diningSavagesVariation(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int diningSavagesVariation(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int diningSavagesVariation(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Alternating Odd Even Printer",
      "difficulty": "Medium",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Alternating Odd Even Printer using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Alternating Odd Even Printer - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Alternating%20Odd%20Even%20Printer"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int alternatingOddEvenPrinter(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int alternatingOddEvenPrinter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int alternatingOddEvenPrinter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int alternatingOddEvenPrinter(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int alternatingOddEvenPrinter(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Ordered Batch Processor",
      "difficulty": "Hard",
      "subpattern": "Locks",
      "question": "Solve Ordered Batch Processor using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Ordered Batch Processor - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Ordered%20Batch%20Processor"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int orderedBatchProcessor(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int orderedBatchProcessor(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int orderedBatchProcessor(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int orderedBatchProcessor(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int orderedBatchProcessor(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Thread Pool Backpressure",
      "difficulty": "Hard",
      "subpattern": "ordering",
      "question": "Solve Thread Pool Backpressure using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Thread Pool Backpressure - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Thread%20Pool%20Backpressure"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int threadPoolBackpressure(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int threadPoolBackpressure(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int threadPoolBackpressure(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int threadPoolBackpressure(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int threadPoolBackpressure(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Concurrent LRU Cache",
      "difficulty": "Hard",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Concurrent LRU Cache using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Concurrent LRU Cache - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Concurrent%20LRU%20Cache"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentLruCache(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentLruCache(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentLruCache(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentLruCache(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int concurrentLruCache(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Concurrent Hash Set",
      "difficulty": "Hard",
      "subpattern": "Locks",
      "question": "Solve Concurrent Hash Set using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes locks and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for locks and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Concurrent Hash Set - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Concurrent%20Hash%20Set"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentHashSet(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentHashSet(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentHashSet(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int concurrentHashSet(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int concurrentHashSet(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Lock Striping Map",
      "difficulty": "Hard",
      "subpattern": "ordering",
      "question": "Solve Lock Striping Map using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes ordering and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for ordering and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Lock Striping Map - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Lock%20Striping%20Map"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int lockStripingMap(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lockStripingMap(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lockStripingMap(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lockStripingMap(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int lockStripingMap(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Async Retry Scheduler",
      "difficulty": "Hard",
      "subpattern": "producer-consumer style problems.",
      "question": "Solve Async Retry Scheduler using the Concurrency Basics pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Concurrency Basics when the input structure exposes producer-consumer style problems. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for producer-consumer style problems. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Async Retry Scheduler - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Async%20Retry%20Scheduler"
      },
      "examples": [
        {
          "input": "threads call first, second, third",
          "output": "firstsecondthird",
          "explanation": "Synchronization enforces order."
        },
        {
          "input": "single producer and consumer",
          "output": "all items consumed",
          "explanation": "Blocking protects empty/full states."
        },
        {
          "input": "two workers update counter",
          "output": "correct final count",
          "explanation": "Locking protects shared state."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int asyncRetryScheduler(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i; j < nums.length; j++) {\n        int score = 0;\n        for (int k = i; k <= j; k++) score += nums[k];\n        best = Math.max(best, score);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int asyncRetryScheduler(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int asyncRetryScheduler(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int asyncRetryScheduler(int[] nums) {\n    return dfs(nums, 0, 0, 0);\n  }\n\n  private int dfs(int[] nums, int index, int state, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], state + nums[index]);\n    return dfs(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int asyncRetryScheduler(int[] nums) {\n    int best = 0, state = 0;\n    for (int value : nums) {\n      state = Math.max(value, state + value);\n      best = Math.max(best, state);\n    }\n    return best;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Concurrency Basics signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Concurrency Basics problem with duplicates and boundary indexes.",
    "A Concurrency Basics problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Concurrency Basics but needs one helper structure.",
    "A maximum-constraint version of a familiar Concurrency Basics problem.",
    "A recognition test where the statement does not mention Concurrency Basics."
  ]
};
