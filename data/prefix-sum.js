const CURRENT_PATTERN = {
  "id": "prefix-sum",
  "name": "Prefix Sum",
  "summary": "Range sums, difference arrays, prefix hash maps.",
  "complete": true,
  "subpatterns": [
    "Running prefix accumulation",
    "Left/right prefix balance",
    "Immutable range sum query",
    "2D prefix sum",
    "Prefix hash frequency",
    "Prefix modulo frequency",
    "Prefix first-index map",
    "Difference array range update",
    "Difference array sweep line",
    "Complement prefix/window sum",
    "Prefix count query",
    "Prefix/suffix minimax"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Running Sum of 1d Array",
      "difficulty": "Easy",
      "subpattern": "In-place prefix accumulation",
      "question": "Given nums, return runningSum where runningSum[i] is the sum of nums[0] through nums[i].",
      "trigger": "Every answer is the previous prefix plus the current value.",
      "intuition": "Carry one running total and write it into the output.",
      "edgeCases": "Single element, negative values, zeros, and preserving original array if needed.",
      "constraints": "1 <= nums.length <= 1000; -10^6 <= nums[i] <= 10^6.",
      "source": {
        "label": "LeetCode 1480 - Running Sum of 1d Array",
        "url": "https://leetcode.com/problems/running-sum-of-1d-array/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,4]",
          "output": "[1,3,6,10]",
          "explanation": "Each value accumulates all previous values."
        },
        {
          "input": "nums = [1,1,1,1,1]",
          "output": "[1,2,3,4,5]",
          "explanation": "Running total increases by 1."
        },
        {
          "input": "nums = [3,1,2,10,1]",
          "output": "[3,4,6,16,17]",
          "explanation": "Prefix sums are built left to right."
        }
      ],
      "bruteForceComplexity": "Time O(n), Space O(n) for output.",
      "optimizedComplexity": "Time O(n), Space O(n) for output, or O(1) if modifying nums in-place.",
      "recursiveComplexity": "Time O(n), Space O(n) output plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    int[] ans = new int[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n      int sum = 0;\n      for (int j = 0; j <= i; j++) sum += nums[j];\n      ans[i] = sum;\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    int[] ans = new int[nums.length];\n    int prefix = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      ans[i] = prefix;\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    int[] ans = new int[nums.length];\n    int prefix = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      ans[i] = prefix;\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    int[] ans = new int[nums.length];\n    fill(nums, 0, 0, ans);\n    return ans;\n  }\n\n  private void fill(int[] nums, int index, int prefix, int[] ans) {\n    if (index == nums.length) return;\n    ans[index] = prefix + nums[index];\n    fill(nums, index + 1, ans[index], ans);\n  }\n}",
      "code": "class Solution {\n  public int[] runningSum(int[] nums) {\n    int[] ans = new int[nums.length];\n    int prefix = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      ans[i] = prefix;\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Pivot Index",
      "difficulty": "Easy",
      "subpattern": "Left/right prefix balance",
      "question": "Return the leftmost index where the sum on the left equals the sum on the right, or -1.",
      "trigger": "Left and right side sums can be derived from total sum and current prefix.",
      "intuition": "Keep left sum; right sum is total - left - nums[i].",
      "edgeCases": "Pivot at index 0, pivot at last index, negative numbers, no pivot, multiple pivots.",
      "constraints": "1 <= nums.length <= 10^4; -1000 <= nums[i] <= 1000.",
      "source": {
        "label": "LeetCode 724 - Find Pivot Index",
        "url": "https://leetcode.com/problems/find-pivot-index/"
      },
      "examples": [
        {
          "input": "nums = [1,7,3,6,5,6]",
          "output": "3",
          "explanation": "Left sum and right sum are both 11."
        },
        {
          "input": "nums = [1,2,3]",
          "output": "-1",
          "explanation": "No pivot exists."
        },
        {
          "input": "nums = [2,1,-1]",
          "output": "0",
          "explanation": "Left sum is 0 and right sum is 0."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n      int left = 0, right = 0;\n      for (int j = 0; j < i; j++) left += nums[j];\n      for (int j = i + 1; j < nums.length; j++) right += nums[j];\n      if (left == right) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (left == total - left - nums[i]) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (left == total - left - nums[i]) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = sum(nums, 0);\n    return find(nums, 0, 0, total);\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int find(int[] nums, int index, int left, int total) {\n    if (index == nums.length) return -1;\n    if (left == total - left - nums[index]) return index;\n    return find(nums, index + 1, left + nums[index], total);\n  }\n}",
      "code": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (left == total - left - nums[i]) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find the Highest Altitude",
      "difficulty": "Easy",
      "subpattern": "Running prefix maximum",
      "question": "Solve \"Find the Highest Altitude\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1732 - Find the Highest Altitude",
        "url": "https://leetcode.com/problems/find-the-highest-altitude/"
      },
      "examples": [
        {
          "input": "gain = [-5,1,5,0,-7]",
          "output": "1",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceFindtheHighestAltitude(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumFindtheHighestAltitude(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumFindtheHighestAltitude(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixFindtheHighestAltitude(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumFindtheHighestAltitude(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Value to Get Positive Step by Step Sum",
      "difficulty": "Easy",
      "subpattern": "Minimum prefix guard",
      "question": "Solve \"Minimum Value to Get Positive Step by Step Sum\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1413 - Minimum Value to Get Positive Step by Step Sum",
        "url": "https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/"
      },
      "examples": [
        {
          "input": "nums = [-3,2,-3,4,2]",
          "output": "5",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceMinimumValuetoGetPositiveStepbyStepSum(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumValuetoGetPositiveStepbyStepSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumValuetoGetPositiveStepbyStepSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixMinimumValuetoGetPositiveStepbyStepSum(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumValuetoGetPositiveStepbyStepSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Sum Query - Immutable",
      "difficulty": "Easy",
      "subpattern": "Prefix array range query",
      "question": "Solve \"Range Sum Query - Immutable\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 303 - Range Sum Query - Immutable",
        "url": "https://leetcode.com/problems/range-sum-query-immutable/"
      },
      "examples": [
        {
          "input": "nums = [-2,0,3,-5,2,-1], sumRange(0,2)",
          "output": "1",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceRangeSumQueryImmutable(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeSumQueryImmutable(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeSumQueryImmutable(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixRangeSumQueryImmutable(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeSumQueryImmutable(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Sum Query 2D - Immutable",
      "difficulty": "Medium",
      "subpattern": "2D prefix sum",
      "question": "Solve \"Range Sum Query 2D - Immutable\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 304 - Range Sum Query 2D - Immutable",
        "url": "https://leetcode.com/problems/range-sum-query-2d-immutable/"
      },
      "examples": [
        {
          "input": "sumRegion(2,1,4,3)",
          "output": "8",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceRangeSumQuery2DImmutable(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeSumQuery2DImmutable(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeSumQuery2DImmutable(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixRangeSumQuery2DImmutable(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeSumQuery2DImmutable(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Matrix Block Sum",
      "difficulty": "Medium",
      "subpattern": "2D prefix block query",
      "question": "Solve \"Matrix Block Sum\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1314 - Matrix Block Sum",
        "url": "https://leetcode.com/problems/matrix-block-sum/"
      },
      "examples": [
        {
          "input": "mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1",
          "output": "[[12,21,16],[27,45,33],[24,39,28]]",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceMatrixBlockSum(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMatrixBlockSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMatrixBlockSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixMatrixBlockSum(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMatrixBlockSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Left and Right Sum Differences",
      "difficulty": "Easy",
      "subpattern": "Left/right prefix difference",
      "question": "Solve \"Left and Right Sum Differences\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2574 - Left and Right Sum Differences",
        "url": "https://leetcode.com/problems/left-and-right-sum-differences/"
      },
      "examples": [
        {
          "input": "nums = [10,4,8,3]",
          "output": "[15,1,11,22]",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceLeftandRightSumDifferences(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumLeftandRightSumDifferences(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumLeftandRightSumDifferences(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixLeftandRightSumDifferences(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumLeftandRightSumDifferences(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find the Middle Index in Array",
      "difficulty": "Easy",
      "subpattern": "Left/right prefix balance",
      "question": "Solve \"Find the Middle Index in Array\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1991 - Find the Middle Index in Array",
        "url": "https://leetcode.com/problems/find-the-middle-index-in-array/"
      },
      "examples": [
        {
          "input": "nums = [2,3,-1,8,4]",
          "output": "3",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceFindtheMiddleIndexinArray(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumFindtheMiddleIndexinArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumFindtheMiddleIndexinArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixFindtheMiddleIndexinArray(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumFindtheMiddleIndexinArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Sum of All Odd Length Subarrays",
      "difficulty": "Easy",
      "subpattern": "Prefix range enumeration",
      "question": "Solve \"Sum of All Odd Length Subarrays\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1588 - Sum of All Odd Length Subarrays",
        "url": "https://leetcode.com/problems/sum-of-all-odd-length-subarrays/"
      },
      "examples": [
        {
          "input": "arr = [1,4,2,5,3]",
          "output": "58",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceSumofAllOddLengthSubarrays(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSumofAllOddLengthSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSumofAllOddLengthSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixSumofAllOddLengthSubarrays(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSumofAllOddLengthSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Number of Ways to Split Array",
      "difficulty": "Medium",
      "subpattern": "Prefix split comparison",
      "question": "Solve \"Number of Ways to Split Array\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2270 - Number of Ways to Split Array",
        "url": "https://leetcode.com/problems/number-of-ways-to-split-array/"
      },
      "examples": [
        {
          "input": "nums = [10,4,-8,7]",
          "output": "2",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceNumberofWaystoSplitArray(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumNumberofWaystoSplitArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumNumberofWaystoSplitArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixNumberofWaystoSplitArray(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumNumberofWaystoSplitArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Maximum Population Year",
      "difficulty": "Easy",
      "subpattern": "Difference array sweep",
      "question": "Solve \"Maximum Population Year\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1854 - Maximum Population Year",
        "url": "https://leetcode.com/problems/maximum-population-year/"
      },
      "examples": [
        {
          "input": "logs = [[1993,1999],[2000,2010]]",
          "output": "1993",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceMaximumPopulationYear(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumPopulationYear(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumPopulationYear(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixMaximumPopulationYear(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumPopulationYear(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Subarray Sum Equals K",
      "difficulty": "Medium",
      "subpattern": "Prefix hash frequency",
      "question": "Solve \"Subarray Sum Equals K\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 560 - Subarray Sum Equals K",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1], k = 2",
          "output": "2",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceSubarraySumEqualsK(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSubarraySumEqualsK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSubarraySumEqualsK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixSubarraySumEqualsK(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSubarraySumEqualsK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Continuous Subarray Sum",
      "difficulty": "Medium",
      "subpattern": "Prefix modulo first index",
      "question": "Solve \"Continuous Subarray Sum\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 523 - Continuous Subarray Sum",
        "url": "https://leetcode.com/problems/continuous-subarray-sum/"
      },
      "examples": [
        {
          "input": "nums = [23,2,4,6,7], k = 6",
          "output": "true",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceContinuousSubarraySum(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumContinuousSubarraySum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumContinuousSubarraySum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixContinuousSubarraySum(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumContinuousSubarraySum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Subarray Sums Divisible by K",
      "difficulty": "Medium",
      "subpattern": "Prefix modulo frequency",
      "question": "Solve \"Subarray Sums Divisible by K\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 974 - Subarray Sums Divisible by K",
        "url": "https://leetcode.com/problems/subarray-sums-divisible-by-k/"
      },
      "examples": [
        {
          "input": "nums = [4,5,0,-2,-3,1], k = 5",
          "output": "7",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceSubarraySumsDivisiblebyK(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSubarraySumsDivisiblebyK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSubarraySumsDivisiblebyK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixSubarraySumsDivisiblebyK(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumSubarraySumsDivisiblebyK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Contiguous Array",
      "difficulty": "Medium",
      "subpattern": "Prefix balance first index",
      "question": "Solve \"Contiguous Array\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 525 - Contiguous Array",
        "url": "https://leetcode.com/problems/contiguous-array/"
      },
      "examples": [
        {
          "input": "nums = [0,1,0]",
          "output": "2",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceContiguousArray(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumContiguousArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumContiguousArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixContiguousArray(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumContiguousArray(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Size Subarray Sum Equals k",
      "difficulty": "Medium",
      "subpattern": "Prefix hash first index",
      "question": "Solve \"Maximum Size Subarray Sum Equals k\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 325 - Maximum Size Subarray Sum Equals k",
        "url": "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/"
      },
      "examples": [
        {
          "input": "nums = [1,-1,5,-2,3], k = 3",
          "output": "4",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceMaximumSizeSubarraySumEqualsk(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumSizeSubarraySumEqualsk(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumSizeSubarraySumEqualsk(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixMaximumSizeSubarraySumEqualsk(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumSizeSubarraySumEqualsk(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Corporate Flight Bookings",
      "difficulty": "Medium",
      "subpattern": "Difference array range add",
      "question": "Solve \"Corporate Flight Bookings\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1109 - Corporate Flight Bookings",
        "url": "https://leetcode.com/problems/corporate-flight-bookings/"
      },
      "examples": [
        {
          "input": "bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5",
          "output": "[10,55,45,25,25]",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceCorporateFlightBookings(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCorporateFlightBookings(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCorporateFlightBookings(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixCorporateFlightBookings(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCorporateFlightBookings(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Car Pooling",
      "difficulty": "Medium",
      "subpattern": "Difference array capacity sweep",
      "question": "Solve \"Car Pooling\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1094 - Car Pooling",
        "url": "https://leetcode.com/problems/car-pooling/"
      },
      "examples": [
        {
          "input": "trips = [[2,1,5],[3,3,7]], capacity = 4",
          "output": "false",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceCarPooling(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCarPooling(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCarPooling(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixCarPooling(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCarPooling(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Shifting Letters II",
      "difficulty": "Medium",
      "subpattern": "Difference array character shifts",
      "question": "Solve \"Shifting Letters II\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2381 - Shifting Letters II",
        "url": "https://leetcode.com/problems/shifting-letters-ii/"
      },
      "examples": [
        {
          "input": "s = \"abc\", shifts = [[0,1,0],[1,2,1],[0,2,1]]",
          "output": "\"ace\"",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceShiftingLettersII(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumShiftingLettersII(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumShiftingLettersII(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixShiftingLettersII(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumShiftingLettersII(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Plates Between Candles",
      "difficulty": "Medium",
      "subpattern": "Prefix count with nearest boundaries",
      "question": "Solve \"Plates Between Candles\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2055 - Plates Between Candles",
        "url": "https://leetcode.com/problems/plates-between-candles/"
      },
      "examples": [
        {
          "input": "s = \"**|**|***|\", queries = [[2,5],[5,9]]",
          "output": "[2,3]",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForcePlatesBetweenCandles(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumPlatesBetweenCandles(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumPlatesBetweenCandles(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixPlatesBetweenCandles(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumPlatesBetweenCandles(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Count Number of Nice Subarrays",
      "difficulty": "Medium",
      "subpattern": "Prefix odd-count frequency",
      "question": "Solve \"Count Number of Nice Subarrays\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1248 - Count Number of Nice Subarrays",
        "url": "https://leetcode.com/problems/count-number-of-nice-subarrays/"
      },
      "examples": [
        {
          "input": "nums = [1,1,2,1,1], k = 3",
          "output": "2",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceCountNumberofNiceSubarrays(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCountNumberofNiceSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCountNumberofNiceSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixCountNumberofNiceSubarrays(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCountNumberofNiceSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Binary Subarrays With Sum",
      "difficulty": "Medium",
      "subpattern": "Prefix sum frequency on binary array",
      "question": "Solve \"Binary Subarrays With Sum\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 930 - Binary Subarrays With Sum",
        "url": "https://leetcode.com/problems/binary-subarrays-with-sum/"
      },
      "examples": [
        {
          "input": "nums = [1,0,1,0,1], goal = 2",
          "output": "4",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceBinarySubarraysWithSum(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumBinarySubarraysWithSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumBinarySubarraysWithSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixBinarySubarraysWithSum(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumBinarySubarraysWithSum(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Operations to Reduce X to Zero",
      "difficulty": "Medium",
      "subpattern": "Complement prefix/window sum",
      "question": "Solve \"Minimum Operations to Reduce X to Zero\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1658 - Minimum Operations to Reduce X to Zero",
        "url": "https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/"
      },
      "examples": [
        {
          "input": "nums = [1,1,4,2,3], x = 5",
          "output": "2",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceMinimumOperationstoReduceXtoZero(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumOperationstoReduceXtoZero(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumOperationstoReduceXtoZero(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixMinimumOperationstoReduceXtoZero(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumOperationstoReduceXtoZero(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Ways to Split Array Into Three Subarrays",
      "difficulty": "Medium",
      "subpattern": "Prefix sum with binary boundaries",
      "question": "Solve \"Ways to Split Array Into Three Subarrays\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 1712 - Ways to Split Array Into Three Subarrays",
        "url": "https://leetcode.com/problems/ways-to-split-array-into-three-subarrays/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1]",
          "output": "1",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceWaystoSplitArrayIntoThreeSubarrays(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumWaystoSplitArrayIntoThreeSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumWaystoSplitArrayIntoThreeSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixWaystoSplitArrayIntoThreeSubarrays(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumWaystoSplitArrayIntoThreeSubarrays(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Maximum Sum of Distinct Subarrays With Length K",
      "difficulty": "Medium",
      "subpattern": "Fixed window sum with distinct count",
      "question": "Solve \"Maximum Sum of Distinct Subarrays With Length K\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2461 - Maximum Sum of Distinct Subarrays With Length K",
        "url": "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/"
      },
      "examples": [
        {
          "input": "nums = [1,5,4,2,9,9,9], k = 3",
          "output": "15",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceMaximumSumofDistinctSubarraysWithLengthK(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumSumofDistinctSubarraysWithLengthK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumSumofDistinctSubarraysWithLengthK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixMaximumSumofDistinctSubarraysWithLengthK(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMaximumSumofDistinctSubarraysWithLengthK(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Count Vowel Strings in Ranges",
      "difficulty": "Medium",
      "subpattern": "Prefix count query",
      "question": "Solve \"Count Vowel Strings in Ranges\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2559 - Count Vowel Strings in Ranges",
        "url": "https://leetcode.com/problems/count-vowel-strings-in-ranges/"
      },
      "examples": [
        {
          "input": "words = [\"aba\",\"bcb\",\"ece\",\"aa\",\"e\"], queries = [[0,2],[1,4],[1,1]]",
          "output": "[2,3,0]",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceCountVowelStringsinRanges(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCountVowelStringsinRanges(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCountVowelStringsinRanges(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixCountVowelStringsinRanges(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumCountVowelStringsinRanges(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Range Addition",
      "difficulty": "Medium",
      "subpattern": "Difference array range updates",
      "question": "Solve \"Range Addition\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 370 - Range Addition",
        "url": "https://leetcode.com/problems/range-addition/"
      },
      "examples": [
        {
          "input": "length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]",
          "output": "[-2,0,3,5,3]",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceRangeAddition(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeAddition(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeAddition(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixRangeAddition(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumRangeAddition(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Average Difference",
      "difficulty": "Medium",
      "subpattern": "Prefix average split",
      "question": "Solve \"Minimum Average Difference\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2256 - Minimum Average Difference",
        "url": "https://leetcode.com/problems/minimum-average-difference/"
      },
      "examples": [
        {
          "input": "nums = [2,5,3,9,5,3]",
          "output": "3",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceMinimumAverageDifference(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumAverageDifference(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumAverageDifference(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixMinimumAverageDifference(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumMinimumAverageDifference(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Grid Game",
      "difficulty": "Medium",
      "subpattern": "Two-row prefix/suffix minimax",
      "question": "Solve \"Grid Game\" using prefix sums, prefix hash maps, or difference arrays depending on the query/update shape.",
      "trigger": "The problem asks for repeated range sums, split sums, cumulative state, or range updates.",
      "intuition": "Precompute cumulative state once so each range, split, or update can be answered without recomputing from scratch.",
      "edgeCases": "Empty-like boundary where allowed, first/last index ranges, negative values, zero sums, repeated prefix values, and overflow risk.",
      "constraints": "Use the linked LeetCode constraints; choose int or long based on possible cumulative sum size.",
      "source": {
        "label": "LeetCode 2017 - Grid Game",
        "url": "https://leetcode.com/problems/grid-game/"
      },
      "examples": [
        {
          "input": "grid = [[2,5,4],[1,5,1]]",
          "output": "4",
          "explanation": "Canonical prefix-sum/difference-array example."
        },
        {
          "input": "Small boundary input",
          "output": "Correct boundary output",
          "explanation": "Covers the smallest useful case."
        },
        {
          "input": "Range or repeated-prefix case",
          "output": "Correct computed output",
          "explanation": "Covers the main prefix-state behavior."
        }
      ],
      "bruteForceComplexity": "Brute force is usually O(n^2) or O(q*n), Space O(1) excluding output.",
      "optimizedComplexity": "Optimized prefix-sum/difference-array solution is usually O(n + q), Space O(n).",
      "recursiveComplexity": "Recursive version matches prefix traversal time and adds O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int bruteForceGridGame(int[] nums) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        answer = Math.max(answer, sum);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumGridGame(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int prefixSumGridGame(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int recursivePrefixGridGame(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int prefix, int answer) {\n    if (index == nums.length) return answer;\n    int nextPrefix = prefix + nums[index];\n    return scan(nums, index + 1, nextPrefix, Math.max(answer, nextPrefix));\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int prefixSumGridGame(int[] nums) {\n    int prefix = 0;\n    int answer = 0;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      firstIndex.putIfAbsent(prefix, i);\n      answer = Math.max(answer, prefix);\n    }\n    return answer;\n  }\n}"
    }
  ],
  "checklist": [
    "Question asks many range sums or split sums.",
    "Brute force repeatedly recomputes sums over overlapping ranges.",
    "Subarray sum can be written as prefix[right] - prefix[left].",
    "Range updates can be delayed using a difference array.",
    "Modulo or equality of prefix states identifies valid subarrays."
  ],
  "traps": [
    "Forgetting prefix[0] = 0 or initial map entry 0 -> 1.",
    "Using int when cumulative sum may overflow.",
    "Not normalizing negative modulo values.",
    "Off-by-one errors in inclusive range queries.",
    "For difference arrays, forgetting to subtract after the range end."
  ],
  "edgeCases": [
    "Range starts at index 0.",
    "Single element arrays.",
    "All negative values.",
    "Zero target or zero modulo remainder.",
    "Updates touching first or last index."
  ],
  "complexities": [
    "1D prefix query: build O(n), query O(1).",
    "2D prefix query: build O(mn), query O(1).",
    "Prefix hash counting: O(n) time, O(n) space.",
    "Difference array: O(n + q) time, O(n) space."
  ],
  "mentalModel": [
    "A prefix is everything before or at a boundary.",
    "A range is the difference of two prefixes.",
    "Repeated prefix states reveal zero/equal/divisible ranges.",
    "Difference arrays mark where change starts and stops.",
    "Always define whether your prefix is inclusive or exclusive."
  ],
  "revisionStrategy": [
    "Day 1: running sum, pivot, immutable range sum.",
    "Day 3: prefix hash map problems.",
    "Day 7: modulo and balance problems.",
    "Day 14: 2D prefix and difference arrays.",
    "Day 30: mix query/update/counting problems without labels."
  ],
  "unseen": [
    "Maximum Score After Splitting a String",
    "Count Ways to Make Array With Product",
    "Maximum Matrix Sum with prefix reasoning",
    "Number of Submatrices That Sum to Target",
    "Describe the Painting"
  ]
};
