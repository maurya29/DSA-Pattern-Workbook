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
      "subpattern": "Running prefix accumulation",
      "question": "Given an integer array nums, return an array where answer[i] equals nums[0] + nums[1] + ... + nums[i].",
      "trigger": "Each result is a prefix ending at the current index, so recomputing earlier values is unnecessary.",
      "intuition": "Carry one running sum; after adding nums[i], that running sum is exactly answer[i].",
      "edgeCases": "Single element array, all zeros, negative numbers, and whether modifying nums in-place is acceptable.",
      "constraints": "1 <= nums.length <= 1000; -10^6 <= nums[i] <= 10^6.",
      "source": {
        "label": "LeetCode 1480 - Running Sum of 1d Array",
        "url": "https://leetcode.com/problems/running-sum-of-1d-array/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,4]",
          "output": "[1,3,6,10]",
          "explanation": "The prefixes are 1, 1+2, 1+2+3, and 1+2+3+4."
        },
        {
          "input": "nums = [1,1,1,1,1]",
          "output": "[1,2,3,4,5]",
          "explanation": "Each step adds one more 1 to the previous prefix."
        },
        {
          "input": "nums = [3,1,2,10,1]",
          "output": "[3,4,6,16,17]",
          "explanation": "The running total is written at every index."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(n) for the returned array.",
      "optimizedComplexity": "Time O(n), Space O(1) extra if nums is reused as the output.",
      "recursiveComplexity": "Time O(n), Space O(n) for recursion stack; output storage is O(n).",
      "bruteForceCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    int[] ans = new int[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n      int sum = 0;\n      for (int j = 0; j <= i; j++) {\n        sum += nums[j];\n      }\n      ans[i] = sum;\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n      nums[i] += nums[i - 1];\n    }\n    return nums;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n      nums[i] += nums[i - 1];\n    }\n    return nums;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] runningSum(int[] nums) {\n    int[] ans = new int[nums.length];\n    fill(nums, ans, 0, 0);\n    return ans;\n  }\n\n  private void fill(int[] nums, int[] ans, int index, int prefix) {\n    if (index == nums.length) return;\n    int nextPrefix = prefix + nums[index];\n    ans[index] = nextPrefix;\n    fill(nums, ans, index + 1, nextPrefix);\n  }\n}",
      "code": "class Solution {\n  public int[] runningSum(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n      nums[i] += nums[i - 1];\n    }\n    return nums;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Pivot Index",
      "difficulty": "Easy",
      "subpattern": "Left/right prefix balance",
      "question": "Given nums, return the leftmost index where the sum of all elements to the left equals the sum of all elements to the right. Return -1 if no such index exists.",
      "trigger": "A split point is valid when left prefix sum equals total sum minus left prefix minus nums[i].",
      "intuition": "Compute total once, then walk left to right while maintaining only the left sum.",
      "edgeCases": "Pivot at index 0, pivot at last index, negative values, no pivot, and multiple valid pivots where the leftmost must be returned.",
      "constraints": "1 <= nums.length <= 10^4; -1000 <= nums[i] <= 1000.",
      "source": {
        "label": "LeetCode 724 - Find Pivot Index",
        "url": "https://leetcode.com/problems/find-pivot-index/"
      },
      "examples": [
        {
          "input": "nums = [1,7,3,6,5,6]",
          "output": "3",
          "explanation": "Left sum 1+7+3 equals right sum 5+6."
        },
        {
          "input": "nums = [1,2,3]",
          "output": "-1",
          "explanation": "No index has equal left and right sums."
        },
        {
          "input": "nums = [2,1,-1]",
          "output": "0",
          "explanation": "At index 0, the left sum is 0 and the right sum is 1 + -1 = 0."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n      int left = 0;\n      int right = 0;\n      for (int j = 0; j < i; j++) {\n        left += nums[j];\n      }\n      for (int j = i + 1; j < nums.length; j++) {\n        right += nums[j];\n      }\n      if (left == right) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) {\n      total += num;\n    }\n\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) {\n      total += num;\n    }\n\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = sum(nums, 0);\n    return find(nums, 0, 0, total);\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int find(int[] nums, int index, int left, int total) {\n    if (index == nums.length) return -1;\n    int right = total - left - nums[index];\n    if (left == right) return index;\n    return find(nums, index + 1, left + nums[index], total);\n  }\n}",
      "code": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) {\n      total += num;\n    }\n\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find the Highest Altitude",
      "difficulty": "Easy",
      "subpattern": "Running prefix maximum",
      "question": "A biker starts at altitude 0. Given gain[i] as the net altitude change between point i and i + 1, return the highest altitude reached.",
      "trigger": "Altitude at each point is the prefix sum of gain values up to that point, and the answer is the maximum prefix.",
      "intuition": "Start from altitude 0, add each gain once, and keep the maximum altitude seen so far.",
      "edgeCases": "All negative gains, all positive gains, highest altitude stays at starting altitude 0, one gain value, and gains that return to 0.",
      "constraints": "1 <= gain.length <= 100; -100 <= gain[i] <= 100.",
      "source": {
        "label": "LeetCode 1732 - Find the Highest Altitude",
        "url": "https://leetcode.com/problems/find-the-highest-altitude/"
      },
      "examples": [
        {
          "input": "gain = [-5,1,5,0,-7]",
          "output": "1",
          "explanation": "Altitudes are 0, -5, -4, 1, 1, -6; the maximum is 1."
        },
        {
          "input": "gain = [-4,-3,-2,-1,4,3,2]",
          "output": "0",
          "explanation": "Every altitude after the start is below 0, so the highest remains 0."
        },
        {
          "input": "gain = [2,2,-3,-1,2]",
          "output": "4",
          "explanation": "Altitudes are 0, 2, 4, 1, 0, 2; the maximum is 4."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int largestAltitude(int[] gain) {\n    int highest = 0;\n    for (int point = 1; point <= gain.length; point++) {\n      int altitude = 0;\n      for (int i = 0; i < point; i++) {\n        altitude += gain[i];\n      }\n      highest = Math.max(highest, altitude);\n    }\n    return highest;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int largestAltitude(int[] gain) {\n    int altitude = 0;\n    int highest = 0;\n    for (int change : gain) {\n      altitude += change;\n      highest = Math.max(highest, altitude);\n    }\n    return highest;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int largestAltitude(int[] gain) {\n    int altitude = 0;\n    int highest = 0;\n    for (int change : gain) {\n      altitude += change;\n      highest = Math.max(highest, altitude);\n    }\n    return highest;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int largestAltitude(int[] gain) {\n    return scan(gain, 0, 0, 0);\n  }\n\n  private int scan(int[] gain, int index, int altitude, int highest) {\n    if (index == gain.length) return highest;\n    int nextAltitude = altitude + gain[index];\n    int nextHighest = Math.max(highest, nextAltitude);\n    return scan(gain, index + 1, nextAltitude, nextHighest);\n  }\n}",
      "code": "class Solution {\n  public int largestAltitude(int[] gain) {\n    int altitude = 0;\n    int highest = 0;\n    for (int change : gain) {\n      altitude += change;\n      highest = Math.max(highest, altitude);\n    }\n    return highest;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Value to Get Positive Step by Step Sum",
      "difficulty": "Easy",
      "subpattern": "Minimum prefix guard",
      "question": "Given an integer array nums, choose the minimum positive startValue so that the running sum startValue + nums[0] + ... + nums[i] is always at least 1.",
      "trigger": "The smallest start value depends only on the lowest prefix sum reached by nums.",
      "intuition": "Track the minimum prefix. If the minimum prefix is -4, startValue must be 5 to keep every step positive.",
      "edgeCases": "All positive values, all negative values, minimum prefix at the last index, single element, and prefix never dropping below zero.",
      "constraints": "1 <= nums.length <= 100; -100 <= nums[i] <= 100.",
      "source": {
        "label": "LeetCode 1413 - Minimum Value to Get Positive Step by Step Sum",
        "url": "https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/"
      },
      "examples": [
        {
          "input": "nums = [-3,2,-3,4,2]",
          "output": "5",
          "explanation": "Prefix sums are -3, -1, -4, 0, 2; lowest is -4, so startValue is 5."
        },
        {
          "input": "nums = [1,2]",
          "output": "1",
          "explanation": "The running sum never drops below 1 when startValue is 1."
        },
        {
          "input": "nums = [1,-2,-3]",
          "output": "5",
          "explanation": "Prefix sums are 1, -1, -4; startValue 5 keeps the minimum running sum at 1."
        }
      ],
      "bruteForceComplexity": "Time O(a*n), where a is the answer tried by simulation; Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int minStartValue(int[] nums) {\n    int startValue = 1;\n    while (!isValid(nums, startValue)) {\n      startValue++;\n    }\n    return startValue;\n  }\n\n  private boolean isValid(int[] nums, int startValue) {\n    int sum = startValue;\n    for (int num : nums) {\n      sum += num;\n      if (sum < 1) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minStartValue(int[] nums) {\n    int prefix = 0;\n    int minPrefix = 0;\n    for (int num : nums) {\n      prefix += num;\n      minPrefix = Math.min(minPrefix, prefix);\n    }\n    return 1 - minPrefix;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minStartValue(int[] nums) {\n    int prefix = 0;\n    int minPrefix = 0;\n    for (int num : nums) {\n      prefix += num;\n      minPrefix = Math.min(minPrefix, prefix);\n    }\n    return 1 - minPrefix;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minStartValue(int[] nums) {\n    int minPrefix = scan(nums, 0, 0, 0);\n    return 1 - minPrefix;\n  }\n\n  private int scan(int[] nums, int index, int prefix, int minPrefix) {\n    if (index == nums.length) return minPrefix;\n    int nextPrefix = prefix + nums[index];\n    int nextMin = Math.min(minPrefix, nextPrefix);\n    return scan(nums, index + 1, nextPrefix, nextMin);\n  }\n}",
      "code": "class Solution {\n  public int minStartValue(int[] nums) {\n    int prefix = 0;\n    int minPrefix = 0;\n    for (int num : nums) {\n      prefix += num;\n      minPrefix = Math.min(minPrefix, prefix);\n    }\n    return 1 - minPrefix;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Sum Query - Immutable",
      "difficulty": "Easy",
      "subpattern": "Prefix array range query",
      "question": "Design NumArray so that sumRange(left, right) returns the sum of nums[left] through nums[right] for many immutable range-sum queries.",
      "trigger": "The array does not change, and the same range-sum operation may be asked many times.",
      "intuition": "Store prefix[i + 1] as the sum before index i + 1; range sum is prefix[right + 1] - prefix[left].",
      "edgeCases": "Query starts at index 0, query ends at last index, negative values, single-element ranges, and repeated queries.",
      "constraints": "1 <= nums.length <= 10^4; -10^5 <= nums[i] <= 10^5; 0 <= left <= right < nums.length; at most 10^4 calls to sumRange.",
      "source": {
        "label": "LeetCode 303 - Range Sum Query - Immutable",
        "url": "https://leetcode.com/problems/range-sum-query-immutable/"
      },
      "examples": [
        {
          "input": "nums = [-2,0,3,-5,2,-1], sumRange(0,2)",
          "output": "1",
          "explanation": "-2 + 0 + 3 = 1."
        },
        {
          "input": "nums = [-2,0,3,-5,2,-1], sumRange(2,5)",
          "output": "-1",
          "explanation": "3 + -5 + 2 + -1 = -1."
        },
        {
          "input": "nums = [-2,0,3,-5,2,-1], sumRange(0,5)",
          "output": "-3",
          "explanation": "The full array sum is -3."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(1), Space O(1); sumRange Time O(n), Space O(1).",
      "optimizedComplexity": "Constructor Time O(n), Space O(n); sumRange Time O(1), Space O(1).",
      "recursiveComplexity": "Constructor Time O(n), Space O(n) prefix plus O(n) recursion stack; sumRange Time O(1), Space O(1).",
      "bruteForceCode": "class NumArray {\n  private final int[] nums;\n\n  public NumArray(int[] nums) {\n    this.nums = nums;\n  }\n\n  public int sumRange(int left, int right) {\n    int sum = 0;\n    for (int i = left; i <= right; i++) {\n      sum += nums[i];\n    }\n    return sum;\n  }\n}",
      "iterativeCode": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}",
      "optimizedCode": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}",
      "recursiveCode": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    build(nums, 0);\n  }\n\n  private void build(int[] nums, int index) {\n    if (index == nums.length) return;\n    prefix[index + 1] = prefix[index] + nums[index];\n    build(nums, index + 1);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}",
      "code": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Sum Query 2D - Immutable",
      "difficulty": "Medium",
      "subpattern": "2D prefix sum",
      "question": "Design NumMatrix so that sumRegion(row1, col1, row2, col2) returns the sum of a rectangle in an immutable matrix.",
      "trigger": "Many rectangle-sum queries over a fixed matrix require avoiding repeated nested scans.",
      "intuition": "Build a 2D prefix grid with one extra row and column. Rectangle sum is total area minus top and left strips plus the overlapped corner.",
      "edgeCases": "Single cell rectangle, first row or first column query, whole matrix query, negative values, and one-row or one-column matrix.",
      "constraints": "1 <= m, n <= 200; -10^5 <= matrix[i][j] <= 10^5; at most 10^4 calls to sumRegion.",
      "source": {
        "label": "LeetCode 304 - Range Sum Query 2D - Immutable",
        "url": "https://leetcode.com/problems/range-sum-query-2d-immutable/"
      },
      "examples": [
        {
          "input": "matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], sumRegion(2,1,4,3)",
          "output": "8",
          "explanation": "The selected rectangle sums to 8."
        },
        {
          "input": "same matrix, sumRegion(1,1,2,2)",
          "output": "11",
          "explanation": "6 + 3 + 2 + 0 = 11."
        },
        {
          "input": "same matrix, sumRegion(1,2,2,4)",
          "output": "12",
          "explanation": "3 + 2 + 1 + 0 + 1 + 5 = 12."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(1), Space O(1); sumRegion Time O(m*n) over the queried rectangle, Space O(1).",
      "optimizedComplexity": "Constructor Time O(m*n), Space O(m*n); sumRegion Time O(1), Space O(1).",
      "recursiveComplexity": "Constructor Time O(m*n), Space O(m*n) prefix plus O(m*n) recursion stack; sumRegion Time O(1), Space O(1).",
      "bruteForceCode": "class NumMatrix {\n  private final int[][] matrix;\n\n  public NumMatrix(int[][] matrix) {\n    this.matrix = matrix;\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    int sum = 0;\n    for (int row = row1; row <= row2; row++) {\n      for (int col = col1; col <= col2; col++) {\n        sum += matrix[row][col];\n      }\n    }\n    return sum;\n  }\n}",
      "iterativeCode": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    prefix = new int[rows + 1][cols + 1];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        prefix[row + 1][col + 1] = matrix[row][col]\n            + prefix[row][col + 1]\n            + prefix[row + 1][col]\n            - prefix[row][col];\n      }\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1]\n        - prefix[row1][col2 + 1]\n        - prefix[row2 + 1][col1]\n        + prefix[row1][col1];\n  }\n}",
      "optimizedCode": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    prefix = new int[rows + 1][cols + 1];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        prefix[row + 1][col + 1] = matrix[row][col]\n            + prefix[row][col + 1]\n            + prefix[row + 1][col]\n            - prefix[row][col];\n      }\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1]\n        - prefix[row1][col2 + 1]\n        - prefix[row2 + 1][col1]\n        + prefix[row1][col1];\n  }\n}",
      "recursiveCode": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    prefix = new int[matrix.length + 1][matrix[0].length + 1];\n    build(matrix, 0, 0);\n  }\n\n  private void build(int[][] matrix, int row, int col) {\n    if (row == matrix.length) return;\n    if (col == matrix[0].length) {\n      build(matrix, row + 1, 0);\n      return;\n    }\n    prefix[row + 1][col + 1] = matrix[row][col]\n        + prefix[row][col + 1]\n        + prefix[row + 1][col]\n        - prefix[row][col];\n    build(matrix, row, col + 1);\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1]\n        - prefix[row1][col2 + 1]\n        - prefix[row2 + 1][col1]\n        + prefix[row1][col1];\n  }\n}",
      "code": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    prefix = new int[rows + 1][cols + 1];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        prefix[row + 1][col + 1] = matrix[row][col]\n            + prefix[row][col + 1]\n            + prefix[row + 1][col]\n            - prefix[row][col];\n      }\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1]\n        - prefix[row1][col2 + 1]\n        - prefix[row2 + 1][col1]\n        + prefix[row1][col1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Matrix Block Sum",
      "difficulty": "Medium",
      "subpattern": "2D prefix block query",
      "question": "Given a matrix mat and integer k, return answer where answer[i][j] is the sum of all mat[r][c] with |r - i| <= k and |c - j| <= k inside matrix bounds.",
      "trigger": "Every cell asks for a rectangle sum, so direct scanning repeats overlapping areas many times.",
      "intuition": "Build a 2D prefix table once, clamp each block rectangle to matrix bounds, then answer each cell in O(1).",
      "edgeCases": "k = 0, k larger than matrix dimensions, one row, one column, single cell matrix, and negative values.",
      "constraints": "1 <= m, n, k <= 100; 1 <= mat[i][j] <= 100.",
      "source": {
        "label": "LeetCode 1314 - Matrix Block Sum",
        "url": "https://leetcode.com/problems/matrix-block-sum/"
      },
      "examples": [
        {
          "input": "mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1",
          "output": "[[12,21,16],[27,45,33],[24,39,28]]",
          "explanation": "Each answer cell sums its clipped 3x3 neighborhood."
        },
        {
          "input": "mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2",
          "output": "[[45,45,45],[45,45,45],[45,45,45]]",
          "explanation": "Every block covers the entire matrix."
        },
        {
          "input": "mat = [[5]], k = 0",
          "output": "[[5]]",
          "explanation": "The only block is the single cell itself."
        }
      ],
      "bruteForceComplexity": "Time O(m*n*(2k+1)^2), Space O(m*n) for the answer.",
      "optimizedComplexity": "Time O(m*n), Space O(m*n) for prefix and answer.",
      "recursiveComplexity": "Time O(m*n), Space O(m*n) prefix/answer plus O(m*n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] ans = new int[rows][cols];\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        int sum = 0;\n        for (int r = Math.max(0, row - k); r <= Math.min(rows - 1, row + k); r++) {\n          for (int c = Math.max(0, col - k); c <= Math.min(cols - 1, col + k); c++) {\n            sum += mat[r][c];\n          }\n        }\n        ans[row][col] = sum;\n      }\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] prefix = new int[rows + 1][cols + 1];\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        prefix[row + 1][col + 1] = mat[row][col]\n            + prefix[row][col + 1]\n            + prefix[row + 1][col]\n            - prefix[row][col];\n      }\n    }\n\n    int[][] ans = new int[rows][cols];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        int r1 = Math.max(0, row - k);\n        int c1 = Math.max(0, col - k);\n        int r2 = Math.min(rows - 1, row + k);\n        int c2 = Math.min(cols - 1, col + k);\n        ans[row][col] = sum(prefix, r1, c1, r2, c2);\n      }\n    }\n    return ans;\n  }\n\n  private int sum(int[][] prefix, int r1, int c1, int r2, int c2) {\n    return prefix[r2 + 1][c2 + 1]\n        - prefix[r1][c2 + 1]\n        - prefix[r2 + 1][c1]\n        + prefix[r1][c1];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] prefix = new int[rows + 1][cols + 1];\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        prefix[row + 1][col + 1] = mat[row][col]\n            + prefix[row][col + 1]\n            + prefix[row + 1][col]\n            - prefix[row][col];\n      }\n    }\n\n    int[][] ans = new int[rows][cols];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        int r1 = Math.max(0, row - k);\n        int c1 = Math.max(0, col - k);\n        int r2 = Math.min(rows - 1, row + k);\n        int c2 = Math.min(cols - 1, col + k);\n        ans[row][col] = sum(prefix, r1, c1, r2, c2);\n      }\n    }\n    return ans;\n  }\n\n  private int sum(int[][] prefix, int r1, int c1, int r2, int c2) {\n    return prefix[r2 + 1][c2 + 1]\n        - prefix[r1][c2 + 1]\n        - prefix[r2 + 1][c1]\n        + prefix[r1][c1];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] prefix = new int[rows + 1][cols + 1];\n    int[][] ans = new int[rows][cols];\n    buildPrefix(mat, prefix, 0, 0);\n    fillAnswer(prefix, ans, k, 0, 0);\n    return ans;\n  }\n\n  private void buildPrefix(int[][] mat, int[][] prefix, int row, int col) {\n    if (row == mat.length) return;\n    if (col == mat[0].length) {\n      buildPrefix(mat, prefix, row + 1, 0);\n      return;\n    }\n    prefix[row + 1][col + 1] = mat[row][col]\n        + prefix[row][col + 1]\n        + prefix[row + 1][col]\n        - prefix[row][col];\n    buildPrefix(mat, prefix, row, col + 1);\n  }\n\n  private void fillAnswer(int[][] prefix, int[][] ans, int k, int row, int col) {\n    if (row == ans.length) return;\n    if (col == ans[0].length) {\n      fillAnswer(prefix, ans, k, row + 1, 0);\n      return;\n    }\n    int r1 = Math.max(0, row - k);\n    int c1 = Math.max(0, col - k);\n    int r2 = Math.min(ans.length - 1, row + k);\n    int c2 = Math.min(ans[0].length - 1, col + k);\n    ans[row][col] = prefix[r2 + 1][c2 + 1]\n        - prefix[r1][c2 + 1]\n        - prefix[r2 + 1][c1]\n        + prefix[r1][c1];\n    fillAnswer(prefix, ans, k, row, col + 1);\n  }\n}",
      "code": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] prefix = new int[rows + 1][cols + 1];\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        prefix[row + 1][col + 1] = mat[row][col]\n            + prefix[row][col + 1]\n            + prefix[row + 1][col]\n            - prefix[row][col];\n      }\n    }\n\n    int[][] ans = new int[rows][cols];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        int r1 = Math.max(0, row - k);\n        int c1 = Math.max(0, col - k);\n        int r2 = Math.min(rows - 1, row + k);\n        int c2 = Math.min(cols - 1, col + k);\n        ans[row][col] = prefix[r2 + 1][c2 + 1]\n            - prefix[r1][c2 + 1]\n            - prefix[r2 + 1][c1]\n            + prefix[r1][c1];\n      }\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Left and Right Sum Differences",
      "difficulty": "Easy",
      "subpattern": "Left/right prefix difference",
      "question": "Given nums, return an array answer where answer[i] is the absolute difference between the sum of elements left of i and the sum of elements right of i.",
      "trigger": "Each index needs both sides of a split, and right sum can be derived from total sum and current left prefix.",
      "intuition": "Track left prefix while total gives the remaining right side after removing nums[i].",
      "edgeCases": "Single element, all equal values, zeros, increasing values, and large positive sums within int range.",
      "constraints": "1 <= nums.length <= 1000; 1 <= nums[i] <= 10^5.",
      "source": {
        "label": "LeetCode 2574 - Left and Right Sum Differences",
        "url": "https://leetcode.com/problems/left-and-right-sum-differences/"
      },
      "examples": [
        {
          "input": "nums = [10,4,8,3]",
          "output": "[15,1,11,22]",
          "explanation": "At index 1, left sum is 10 and right sum is 11, so the difference is 1."
        },
        {
          "input": "nums = [1]",
          "output": "[0]",
          "explanation": "Both left and right sums are empty and equal to 0."
        },
        {
          "input": "nums = [1,2,3,4]",
          "output": "[9,6,1,6]",
          "explanation": "Each position compares accumulated left sum with remaining right sum."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(n) for the answer.",
      "optimizedComplexity": "Time O(n), Space O(n) for the answer; O(1) extra state.",
      "recursiveComplexity": "Time O(n), Space O(n) answer plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[] leftRightDifference(int[] nums) {\n    int[] ans = new int[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n      int left = 0;\n      int right = 0;\n      for (int j = 0; j < i; j++) left += nums[j];\n      for (int j = i + 1; j < nums.length; j++) right += nums[j];\n      ans[i] = Math.abs(left - right);\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] leftRightDifference(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n\n    int[] ans = new int[nums.length];\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      ans[i] = Math.abs(left - right);\n      left += nums[i];\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] leftRightDifference(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n\n    int[] ans = new int[nums.length];\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      ans[i] = Math.abs(left - right);\n      left += nums[i];\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] leftRightDifference(int[] nums) {\n    int[] ans = new int[nums.length];\n    int total = sum(nums, 0);\n    fill(nums, ans, 0, 0, total);\n    return ans;\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private void fill(int[] nums, int[] ans, int index, int left, int total) {\n    if (index == nums.length) return;\n    int right = total - left - nums[index];\n    ans[index] = Math.abs(left - right);\n    fill(nums, ans, index + 1, left + nums[index], total);\n  }\n}",
      "code": "class Solution {\n  public int[] leftRightDifference(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n\n    int[] ans = new int[nums.length];\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      ans[i] = Math.abs(left - right);\n      left += nums[i];\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find the Middle Index in Array",
      "difficulty": "Easy",
      "subpattern": "Left/right prefix balance",
      "question": "Given nums, return the leftmost middleIndex where the sum strictly before the index equals the sum strictly after it. Return -1 if none exists.",
      "trigger": "A candidate index is valid when left prefix equals total minus left prefix minus nums[i].",
      "intuition": "This is pivot index with the same prefix-balance invariant and leftmost return requirement.",
      "edgeCases": "Middle index at 0, middle index at the last position, negative numbers, all zeros, no valid index, and multiple valid indexes.",
      "constraints": "1 <= nums.length <= 100; -1000 <= nums[i] <= 1000.",
      "source": {
        "label": "LeetCode 1991 - Find the Middle Index in Array",
        "url": "https://leetcode.com/problems/find-the-middle-index-in-array/"
      },
      "examples": [
        {
          "input": "nums = [2,3,-1,8,4]",
          "output": "3",
          "explanation": "Left sum 2+3-1 equals right sum 4."
        },
        {
          "input": "nums = [1,-1,4]",
          "output": "2",
          "explanation": "Left sum 0 equals empty right sum 0."
        },
        {
          "input": "nums = [2,5]",
          "output": "-1",
          "explanation": "No index balances the two sides."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int findMiddleIndex(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n      int left = 0;\n      int right = 0;\n      for (int j = 0; j < i; j++) left += nums[j];\n      for (int j = i + 1; j < nums.length; j++) right += nums[j];\n      if (left == right) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findMiddleIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findMiddleIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findMiddleIndex(int[] nums) {\n    int total = sum(nums, 0);\n    return find(nums, 0, 0, total);\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int find(int[] nums, int index, int left, int total) {\n    if (index == nums.length) return -1;\n    int right = total - left - nums[index];\n    if (left == right) return index;\n    return find(nums, index + 1, left + nums[index], total);\n  }\n}",
      "code": "class Solution {\n  public int findMiddleIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n\n    int left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Sum of All Odd Length Subarrays",
      "difficulty": "Easy",
      "subpattern": "Prefix range enumeration",
      "question": "Given an array arr of positive integers, return the sum of all possible odd-length subarrays.",
      "trigger": "The direct requirement is many subarray sums; prefix sums let each candidate range sum be computed without rescanning.",
      "intuition": "Enumerate odd lengths and starts. With prefix, each odd subarray contributes prefix[end + 1] - prefix[start].",
      "edgeCases": "Single element, all one values, odd/even array length, large values, and avoiding even-length ranges.",
      "constraints": "1 <= arr.length <= 100; 1 <= arr[i] <= 1000.",
      "source": {
        "label": "LeetCode 1588 - Sum of All Odd Length Subarrays",
        "url": "https://leetcode.com/problems/sum-of-all-odd-length-subarrays/"
      },
      "examples": [
        {
          "input": "arr = [1,4,2,5,3]",
          "output": "58",
          "explanation": "Odd-length subarray sums are length 1, 3, and 5 totals: 15 + 34 + 9 = 58."
        },
        {
          "input": "arr = [1,2]",
          "output": "3",
          "explanation": "Only odd-length subarrays are [1] and [2]."
        },
        {
          "input": "arr = [10,11,12]",
          "output": "66",
          "explanation": "Single elements sum to 33 and the full length-3 subarray also sums to 33."
        }
      ],
      "bruteForceComplexity": "Time O(n^3), Space O(1).",
      "optimizedComplexity": "Time O(n^2), Space O(n) for prefix sums.",
      "recursiveComplexity": "Time O(n^2), Space O(n) prefix plus O(n) recursion stack for range enumeration.",
      "bruteForceCode": "class Solution {\n  public int sumOddLengthSubarrays(int[] arr) {\n    int total = 0;\n    for (int start = 0; start < arr.length; start++) {\n      for (int end = start; end < arr.length; end += 2) {\n        int sum = 0;\n        for (int i = start; i <= end; i++) {\n          sum += arr[i];\n        }\n        total += sum;\n      }\n    }\n    return total;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int sumOddLengthSubarrays(int[] arr) {\n    int[] prefix = new int[arr.length + 1];\n    for (int i = 0; i < arr.length; i++) {\n      prefix[i + 1] = prefix[i] + arr[i];\n    }\n\n    int total = 0;\n    for (int start = 0; start < arr.length; start++) {\n      for (int end = start; end < arr.length; end += 2) {\n        total += prefix[end + 1] - prefix[start];\n      }\n    }\n    return total;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int sumOddLengthSubarrays(int[] arr) {\n    int[] prefix = new int[arr.length + 1];\n    for (int i = 0; i < arr.length; i++) {\n      prefix[i + 1] = prefix[i] + arr[i];\n    }\n\n    int total = 0;\n    for (int start = 0; start < arr.length; start++) {\n      for (int end = start; end < arr.length; end += 2) {\n        total += prefix[end + 1] - prefix[start];\n      }\n    }\n    return total;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int sumOddLengthSubarrays(int[] arr) {\n    int[] prefix = new int[arr.length + 1];\n    buildPrefix(arr, prefix, 0);\n    return sumFromStart(prefix, 0);\n  }\n\n  private void buildPrefix(int[] arr, int[] prefix, int index) {\n    if (index == arr.length) return;\n    prefix[index + 1] = prefix[index] + arr[index];\n    buildPrefix(arr, prefix, index + 1);\n  }\n\n  private int sumFromStart(int[] prefix, int start) {\n    if (start == prefix.length - 1) return 0;\n    return sumOddEnds(prefix, start, start) + sumFromStart(prefix, start + 1);\n  }\n\n  private int sumOddEnds(int[] prefix, int start, int end) {\n    if (end == prefix.length - 1) return 0;\n    return prefix[end + 1] - prefix[start] + sumOddEnds(prefix, start, end + 2);\n  }\n}",
      "code": "class Solution {\n  public int sumOddLengthSubarrays(int[] arr) {\n    int[] prefix = new int[arr.length + 1];\n    for (int i = 0; i < arr.length; i++) {\n      prefix[i + 1] = prefix[i] + arr[i];\n    }\n\n    int total = 0;\n    for (int start = 0; start < arr.length; start++) {\n      for (int end = start; end < arr.length; end += 2) {\n        total += prefix[end + 1] - prefix[start];\n      }\n    }\n    return total;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Number of Ways to Split Array",
      "difficulty": "Medium",
      "subpattern": "Prefix split comparison",
      "question": "Given a 0-indexed integer array nums, count split positions i where the left part nums[0..i] and right part nums[i+1..n-1] are both non-empty and leftSum >= rightSum.",
      "trigger": "Each valid split compares a prefix sum against the remaining suffix sum.",
      "intuition": "Compute total once. Move the split from left to right, update prefix, and derive suffix as total - prefix.",
      "edgeCases": "Length 2, negative numbers, all negative numbers, large values requiring long, and split only before the last index.",
      "constraints": "2 <= nums.length <= 10^5; -10^5 <= nums[i] <= 10^5.",
      "source": {
        "label": "LeetCode 2270 - Number of Ways to Split Array",
        "url": "https://leetcode.com/problems/number-of-ways-to-split-array/"
      },
      "examples": [
        {
          "input": "nums = [10,4,-8,7]",
          "output": "2",
          "explanation": "Splits after indices 0 and 1 satisfy leftSum >= rightSum."
        },
        {
          "input": "nums = [2,3,1,0]",
          "output": "2",
          "explanation": "Splits after indices 1 and 2 are valid."
        },
        {
          "input": "nums = [-1,-2,-3]",
          "output": "1",
          "explanation": "Only the split after index 1 has left sum -3 >= right sum -3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int waysToSplitArray(int[] nums) {\n    int ways = 0;\n    for (int split = 0; split < nums.length - 1; split++) {\n      long left = 0;\n      long right = 0;\n      for (int i = 0; i <= split; i++) left += nums[i];\n      for (int i = split + 1; i < nums.length; i++) right += nums[i];\n      if (left >= right) ways++;\n    }\n    return ways;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int waysToSplitArray(int[] nums) {\n    long total = 0;\n    for (int num : nums) total += num;\n\n    int ways = 0;\n    long left = 0;\n    for (int i = 0; i < nums.length - 1; i++) {\n      left += nums[i];\n      long right = total - left;\n      if (left >= right) ways++;\n    }\n    return ways;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int waysToSplitArray(int[] nums) {\n    long total = 0;\n    for (int num : nums) total += num;\n\n    int ways = 0;\n    long left = 0;\n    for (int i = 0; i < nums.length - 1; i++) {\n      left += nums[i];\n      long right = total - left;\n      if (left >= right) ways++;\n    }\n    return ways;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int waysToSplitArray(int[] nums) {\n    long total = sum(nums, 0);\n    return count(nums, 0, 0L, total);\n  }\n\n  private long sum(int[] nums, int index) {\n    if (index == nums.length) return 0L;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int count(int[] nums, int index, long left, long total) {\n    if (index == nums.length - 1) return 0;\n    long nextLeft = left + nums[index];\n    long right = total - nextLeft;\n    int add = nextLeft >= right ? 1 : 0;\n    return add + count(nums, index + 1, nextLeft, total);\n  }\n}",
      "code": "class Solution {\n  public int waysToSplitArray(int[] nums) {\n    long total = 0;\n    for (int num : nums) total += num;\n\n    int ways = 0;\n    long left = 0;\n    for (int i = 0; i < nums.length - 1; i++) {\n      left += nums[i];\n      long right = total - left;\n      if (left >= right) ways++;\n    }\n    return ways;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Maximum Population Year",
      "difficulty": "Easy",
      "subpattern": "Difference array sweep",
      "question": "Given birth and death years where a person is alive from birth through death - 1, return the earliest year with the maximum population.",
      "trigger": "Each log adds +1 over a year range and -1 at the death boundary, which is exactly a difference-array sweep.",
      "intuition": "Mark population changes at birth and death, then prefix-sum the changes from 1950 to 2050 to find the earliest max.",
      "edgeCases": "Ties require earliest year, death year is exclusive, one log, births/deaths on boundary years, and overlapping identical intervals.",
      "constraints": "1 <= logs.length <= 100; 1950 <= birth < death <= 2050.",
      "source": {
        "label": "LeetCode 1854 - Maximum Population Year",
        "url": "https://leetcode.com/problems/maximum-population-year/"
      },
      "examples": [
        {
          "input": "logs = [[1993,1999],[2000,2010]]",
          "output": "1993",
          "explanation": "Population is 1 in 1993 and 2000, so the earliest max year is 1993."
        },
        {
          "input": "logs = [[1950,1961],[1960,1971],[1970,1981]]",
          "output": "1960",
          "explanation": "Population reaches 2 first in 1960."
        },
        {
          "input": "logs = [[2000,2001]]",
          "output": "2000",
          "explanation": "The person is alive in 2000 and not in 2001."
        }
      ],
      "bruteForceComplexity": "Time O(Y*n), where Y = 101 possible years; Space O(1).",
      "optimizedComplexity": "Time O(n + Y), Space O(Y).",
      "recursiveComplexity": "Time O(n + Y), Space O(Y) diff array plus O(n + Y) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int maximumPopulation(int[][] logs) {\n    int bestYear = 1950;\n    int bestPopulation = 0;\n    for (int year = 1950; year <= 2050; year++) {\n      int population = 0;\n      for (int[] log : logs) {\n        if (log[0] <= year && year < log[1]) {\n          population++;\n        }\n      }\n      if (population > bestPopulation) {\n        bestPopulation = population;\n        bestYear = year;\n      }\n    }\n    return bestYear;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maximumPopulation(int[][] logs) {\n    int[] diff = new int[102];\n    for (int[] log : logs) {\n      diff[log[0] - 1950]++;\n      diff[log[1] - 1950]--;\n    }\n\n    int bestYear = 1950;\n    int bestPopulation = 0;\n    int population = 0;\n    for (int i = 0; i <= 100; i++) {\n      population += diff[i];\n      if (population > bestPopulation) {\n        bestPopulation = population;\n        bestYear = 1950 + i;\n      }\n    }\n    return bestYear;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maximumPopulation(int[][] logs) {\n    int[] diff = new int[102];\n    for (int[] log : logs) {\n      diff[log[0] - 1950]++;\n      diff[log[1] - 1950]--;\n    }\n\n    int bestYear = 1950;\n    int bestPopulation = 0;\n    int population = 0;\n    for (int i = 0; i <= 100; i++) {\n      population += diff[i];\n      if (population > bestPopulation) {\n        bestPopulation = population;\n        bestYear = 1950 + i;\n      }\n    }\n    return bestYear;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maximumPopulation(int[][] logs) {\n    int[] diff = new int[102];\n    apply(logs, diff, 0);\n    return scan(diff, 0, 0, 0, 1950);\n  }\n\n  private void apply(int[][] logs, int[] diff, int index) {\n    if (index == logs.length) return;\n    diff[logs[index][0] - 1950]++;\n    diff[logs[index][1] - 1950]--;\n    apply(logs, diff, index + 1);\n  }\n\n  private int scan(int[] diff, int index, int population, int bestPopulation, int bestYear) {\n    if (index > 100) return bestYear;\n    int nextPopulation = population + diff[index];\n    if (nextPopulation > bestPopulation) {\n      return scan(diff, index + 1, nextPopulation, nextPopulation, 1950 + index);\n    }\n    return scan(diff, index + 1, nextPopulation, bestPopulation, bestYear);\n  }\n}",
      "code": "class Solution {\n  public int maximumPopulation(int[][] logs) {\n    int[] diff = new int[102];\n    for (int[] log : logs) {\n      diff[log[0] - 1950]++;\n      diff[log[1] - 1950]--;\n    }\n\n    int bestYear = 1950;\n    int bestPopulation = 0;\n    int population = 0;\n    for (int i = 0; i <= 100; i++) {\n      population += diff[i];\n      if (population > bestPopulation) {\n        bestPopulation = population;\n        bestYear = 1950 + i;\n      }\n    }\n    return bestYear;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Subarray Sum Equals K",
      "difficulty": "Medium",
      "subpattern": "Prefix hash frequency",
      "question": "Given an integer array nums and an integer k, return the total number of continuous subarrays whose sum equals k.",
      "trigger": "For a subarray ending at current index to sum to k, a previous prefix must equal currentPrefix - k.",
      "intuition": "Store how many times each prefix sum has appeared. Each current prefix adds frequency[currentPrefix - k] answers.",
      "edgeCases": "Negative numbers, zeros, k = 0, repeated prefix sums, subarray starting at index 0, and many overlapping answers.",
      "constraints": "1 <= nums.length <= 2 * 10^4; -1000 <= nums[i] <= 1000; -10^7 <= k <= 10^7.",
      "source": {
        "label": "LeetCode 560 - Subarray Sum Equals K",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1], k = 2",
          "output": "2",
          "explanation": "The valid subarrays are nums[0..1] and nums[1..2]."
        },
        {
          "input": "nums = [1,2,3], k = 3",
          "output": "2",
          "explanation": "The valid subarrays are [1,2] and [3]."
        },
        {
          "input": "nums = [1,-1,0], k = 0",
          "output": "3",
          "explanation": "Repeated prefix sums count [1,-1], [0], and [1,-1,0]."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n) for prefix frequency map.",
      "recursiveComplexity": "Time O(n), Space O(n) map plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int subarraySum(int[] nums, int k) {\n    int count = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum == k) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - k, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - k, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n    return scan(nums, k, 0, 0, 0, freq);\n  }\n\n  private int scan(int[] nums, int k, int index, int prefix, int count, Map<Integer, Integer> freq) {\n    if (index == nums.length) return count;\n    int nextPrefix = prefix + nums[index];\n    int nextCount = count + freq.getOrDefault(nextPrefix - k, 0);\n    freq.put(nextPrefix, freq.getOrDefault(nextPrefix, 0) + 1);\n    return scan(nums, k, index + 1, nextPrefix, nextCount, freq);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - k, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Continuous Subarray Sum",
      "difficulty": "Medium",
      "subpattern": "Prefix modulo first index",
      "question": "Given nums and k, return true if nums has a continuous subarray of length at least 2 whose sum is a multiple of k.",
      "trigger": "Two prefixes with the same remainder modulo k create a subarray between them whose sum is divisible by k.",
      "intuition": "Store the first index where each remainder appears. A repeated remainder is valid only when distance is at least 2.",
      "edgeCases": "Length less than 2, repeated remainder too close, subarray starting at index 0, zeros, and k positive with large prefix sums.",
      "constraints": "1 <= nums.length <= 10^5; 0 <= nums[i] <= 10^9; 1 <= k <= 2^31 - 1.",
      "source": {
        "label": "LeetCode 523 - Continuous Subarray Sum",
        "url": "https://leetcode.com/problems/continuous-subarray-sum/"
      },
      "examples": [
        {
          "input": "nums = [23,2,4,6,7], k = 6",
          "output": "true",
          "explanation": "The subarray [2,4] has sum 6, a multiple of 6."
        },
        {
          "input": "nums = [23,2,6,4,7], k = 6",
          "output": "true",
          "explanation": "The subarray [23,2,6,4,7] has sum 42, a multiple of 6."
        },
        {
          "input": "nums = [23,2,6,4,7], k = 13",
          "output": "false",
          "explanation": "No length-at-least-2 subarray has sum divisible by 13."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(min(n, k)) for first remainder index map.",
      "recursiveComplexity": "Time O(n), Space O(min(n, k)) map plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public boolean checkSubarraySum(int[] nums, int k) {\n    for (int start = 0; start < nums.length; start++) {\n      long sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (end - start + 1 >= 2 && sum % k == 0) return true;\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkSubarraySum(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int prefix = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix = (prefix + nums[i]) % k;\n      Integer first = firstIndex.get(prefix);\n      if (first != null) {\n        if (i - first >= 2) return true;\n      } else {\n        firstIndex.put(prefix, i);\n      }\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkSubarraySum(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int prefix = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix = (prefix + nums[i]) % k;\n      Integer first = firstIndex.get(prefix);\n      if (first != null) {\n        if (i - first >= 2) return true;\n      } else {\n        firstIndex.put(prefix, i);\n      }\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkSubarraySum(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    return scan(nums, k, 0, 0, firstIndex);\n  }\n\n  private boolean scan(int[] nums, int k, int index, int prefix, Map<Integer, Integer> firstIndex) {\n    if (index == nums.length) return false;\n    int nextPrefix = (prefix + nums[index]) % k;\n    Integer first = firstIndex.get(nextPrefix);\n    if (first != null && index - first >= 2) return true;\n    if (first == null) firstIndex.put(nextPrefix, index);\n    return scan(nums, k, index + 1, nextPrefix, firstIndex);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean checkSubarraySum(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int prefix = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix = (prefix + nums[i]) % k;\n      Integer first = firstIndex.get(prefix);\n      if (first != null) {\n        if (i - first >= 2) return true;\n      } else {\n        firstIndex.put(prefix, i);\n      }\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Subarray Sums Divisible by K",
      "difficulty": "Medium",
      "subpattern": "Prefix modulo frequency",
      "question": "Given nums and k, return the number of non-empty subarrays whose sum is divisible by k.",
      "trigger": "A subarray sum is divisible by k when two prefix sums have the same normalized remainder modulo k.",
      "intuition": "Count how many times each remainder has appeared. Each repeated remainder forms that many new divisible subarrays.",
      "edgeCases": "Negative numbers need normalized modulo, k = 1, zeros, repeated remainders, and subarray starting at index 0.",
      "constraints": "1 <= nums.length <= 3 * 10^4; -10^4 <= nums[i] <= 10^4; 2 <= k <= 10^4.",
      "source": {
        "label": "LeetCode 974 - Subarray Sums Divisible by K",
        "url": "https://leetcode.com/problems/subarray-sums-divisible-by-k/"
      },
      "examples": [
        {
          "input": "nums = [4,5,0,-2,-3,1], k = 5",
          "output": "7",
          "explanation": "Seven subarrays have sums divisible by 5."
        },
        {
          "input": "nums = [5], k = 9",
          "output": "0",
          "explanation": "The only subarray sum is 5, not divisible by 9."
        },
        {
          "input": "nums = [-1,2,9], k = 2",
          "output": "2",
          "explanation": "Normalized remainders handle the negative prefix correctly."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(k) for remainder frequencies.",
      "recursiveComplexity": "Time O(n), Space O(k) remainder array plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int count = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum % k == 0) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n    return scan(nums, k, 0, 0, 0, freq);\n  }\n\n  private int scan(int[] nums, int k, int index, int prefix, int count, int[] freq) {\n    if (index == nums.length) return count;\n    int nextPrefix = ((prefix + nums[index]) % k + k) % k;\n    int nextCount = count + freq[nextPrefix];\n    freq[nextPrefix]++;\n    return scan(nums, k, index + 1, nextPrefix, nextCount, freq);\n  }\n}",
      "code": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Contiguous Array",
      "difficulty": "Medium",
      "subpattern": "Prefix balance first index",
      "question": "Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.",
      "trigger": "Treat 0 as -1 and 1 as +1. A subarray has equal zeros and ones when the prefix balance repeats.",
      "intuition": "Store the first index of each balance. Repeating the same balance gives a zero-sum interval, so maximize distance.",
      "edgeCases": "All zeros, all ones, answer starts at index 0, repeated balance, length 1 input, and keeping the earliest index only.",
      "constraints": "1 <= nums.length <= 10^5; nums[i] is 0 or 1.",
      "source": {
        "label": "LeetCode 525 - Contiguous Array",
        "url": "https://leetcode.com/problems/contiguous-array/"
      },
      "examples": [
        {
          "input": "nums = [0,1]",
          "output": "2",
          "explanation": "The full array has one 0 and one 1."
        },
        {
          "input": "nums = [0,1,0]",
          "output": "2",
          "explanation": "Either [0,1] or [1,0] is balanced."
        },
        {
          "input": "nums = [0,0,1,0,0,0,1,1]",
          "output": "6",
          "explanation": "A longest balanced subarray has equal transformed sum from repeated balance."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n) for first balance index map.",
      "recursiveComplexity": "Time O(n), Space O(n) map plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int findMaxLength(int[] nums) {\n    int best = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int zeros = 0;\n      int ones = 0;\n      for (int end = start; end < nums.length; end++) {\n        if (nums[end] == 0) zeros++;\n        else ones++;\n        if (zeros == ones) best = Math.max(best, end - start + 1);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int balance = 0;\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      balance += nums[i] == 0 ? -1 : 1;\n      if (firstIndex.containsKey(balance)) {\n        best = Math.max(best, i - firstIndex.get(balance));\n      } else {\n        firstIndex.put(balance, i);\n      }\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int balance = 0;\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      balance += nums[i] == 0 ? -1 : 1;\n      if (firstIndex.containsKey(balance)) {\n        best = Math.max(best, i - firstIndex.get(balance));\n      } else {\n        firstIndex.put(balance, i);\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    return scan(nums, 0, 0, 0, firstIndex);\n  }\n\n  private int scan(int[] nums, int index, int balance, int best, Map<Integer, Integer> firstIndex) {\n    if (index == nums.length) return best;\n    int nextBalance = balance + (nums[index] == 0 ? -1 : 1);\n    int nextBest = best;\n    if (firstIndex.containsKey(nextBalance)) {\n      nextBest = Math.max(best, index - firstIndex.get(nextBalance));\n    } else {\n      firstIndex.put(nextBalance, index);\n    }\n    return scan(nums, index + 1, nextBalance, nextBest, firstIndex);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int balance = 0;\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      balance += nums[i] == 0 ? -1 : 1;\n      if (firstIndex.containsKey(balance)) {\n        best = Math.max(best, i - firstIndex.get(balance));\n      } else {\n        firstIndex.put(balance, i);\n      }\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Size Subarray Sum Equals k",
      "difficulty": "Medium",
      "subpattern": "Prefix hash first index",
      "question": "Given nums and k, return the maximum length of a subarray that sums to k. Return 0 if no such subarray exists.",
      "trigger": "For a subarray ending at i to sum to k, a previous prefix must be currentPrefix - k; earliest such prefix gives maximum length.",
      "intuition": "Store only the first index for each prefix sum, because earlier indices produce longer subarrays.",
      "edgeCases": "Negative numbers, zeros, k = 0, whole array answer, no answer, and repeated prefix sums where first index must be preserved.",
      "constraints": "1 <= nums.length <= 2 * 10^5; -10^4 <= nums[i] <= 10^4; -10^9 <= k <= 10^9.",
      "source": {
        "label": "LeetCode 325 - Maximum Size Subarray Sum Equals k",
        "url": "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/"
      },
      "examples": [
        {
          "input": "nums = [1,-1,5,-2,3], k = 3",
          "output": "4",
          "explanation": "The subarray [1,-1,5,-2] sums to 3 and has length 4."
        },
        {
          "input": "nums = [-2,-1,2,1], k = 1",
          "output": "2",
          "explanation": "The subarray [-1,2] sums to 1."
        },
        {
          "input": "nums = [1,2,3], k = 7",
          "output": "0",
          "explanation": "No subarray has sum 7."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n) for first prefix index map.",
      "recursiveComplexity": "Time O(n), Space O(n) map plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int maxSubArrayLen(int[] nums, int k) {\n    int best = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum == k) best = Math.max(best, end - start + 1);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxSubArrayLen(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int prefix = 0;\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      if (firstIndex.containsKey(prefix - k)) {\n        best = Math.max(best, i - firstIndex.get(prefix - k));\n      }\n      firstIndex.putIfAbsent(prefix, i);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxSubArrayLen(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int prefix = 0;\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      if (firstIndex.containsKey(prefix - k)) {\n        best = Math.max(best, i - firstIndex.get(prefix - k));\n      }\n      firstIndex.putIfAbsent(prefix, i);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxSubArrayLen(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    return scan(nums, k, 0, 0, 0, firstIndex);\n  }\n\n  private int scan(int[] nums, int k, int index, int prefix, int best, Map<Integer, Integer> firstIndex) {\n    if (index == nums.length) return best;\n    int nextPrefix = prefix + nums[index];\n    int nextBest = best;\n    if (firstIndex.containsKey(nextPrefix - k)) {\n      nextBest = Math.max(best, index - firstIndex.get(nextPrefix - k));\n    }\n    firstIndex.putIfAbsent(nextPrefix, index);\n    return scan(nums, k, index + 1, nextPrefix, nextBest, firstIndex);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxSubArrayLen(int[] nums, int k) {\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n\n    int prefix = 0;\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      if (firstIndex.containsKey(prefix - k)) {\n        best = Math.max(best, i - firstIndex.get(prefix - k));\n      }\n      firstIndex.putIfAbsent(prefix, i);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Corporate Flight Bookings",
      "difficulty": "Medium",
      "subpattern": "Difference array range add",
      "question": "Given bookings where bookings[i] = [first, last, seats], return seats booked for each flight 1 through n after applying every inclusive range booking.",
      "trigger": "Each booking adds the same value to a whole index range, which is exactly a difference-array range update.",
      "intuition": "Add seats at first, subtract after last, then prefix-sum the differences to recover each flight total.",
      "edgeCases": "Booking starts at flight 1, booking ends at flight n, overlapping bookings, single-flight booking, and large seat totals.",
      "constraints": "1 <= n <= 2 * 10^4; 1 <= bookings.length <= 2 * 10^4; 1 <= first <= last <= n; 1 <= seats <= 10^4.",
      "source": {
        "label": "LeetCode 1109 - Corporate Flight Bookings",
        "url": "https://leetcode.com/problems/corporate-flight-bookings/"
      },
      "examples": [
        {
          "input": "bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5",
          "output": "[10,55,45,25,25]",
          "explanation": "Range additions overlap on flights 2 and 3."
        },
        {
          "input": "bookings = [[1,2,10],[2,2,15]], n = 2",
          "output": "[10,25]",
          "explanation": "Flight 2 receives both bookings."
        },
        {
          "input": "bookings = [[1,1,5]], n = 1",
          "output": "[5]",
          "explanation": "A single inclusive range updates the only flight."
        }
      ],
      "bruteForceComplexity": "Time O(b*n) in the worst case, Space O(n) for the answer.",
      "optimizedComplexity": "Time O(b + n), Space O(n) for the difference/result array.",
      "recursiveComplexity": "Time O(b + n), Space O(n) diff plus O(b + n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] seats = new int[n];\n    for (int[] booking : bookings) {\n      for (int flight = booking[0]; flight <= booking[1]; flight++) {\n        seats[flight - 1] += booking[2];\n      }\n    }\n    return seats;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    for (int[] booking : bookings) {\n      int start = booking[0] - 1;\n      int end = booking[1];\n      int seats = booking[2];\n      diff[start] += seats;\n      diff[end] -= seats;\n    }\n\n    int running = 0;\n    int[] ans = new int[n];\n    for (int i = 0; i < n; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    for (int[] booking : bookings) {\n      int start = booking[0] - 1;\n      int end = booking[1];\n      int seats = booking[2];\n      diff[start] += seats;\n      diff[end] -= seats;\n    }\n\n    int running = 0;\n    int[] ans = new int[n];\n    for (int i = 0; i < n; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    apply(bookings, diff, 0);\n    int[] ans = new int[n];\n    build(diff, ans, 0, 0);\n    return ans;\n  }\n\n  private void apply(int[][] bookings, int[] diff, int index) {\n    if (index == bookings.length) return;\n    int start = bookings[index][0] - 1;\n    int end = bookings[index][1];\n    int seats = bookings[index][2];\n    diff[start] += seats;\n    diff[end] -= seats;\n    apply(bookings, diff, index + 1);\n  }\n\n  private void build(int[] diff, int[] ans, int index, int running) {\n    if (index == ans.length) return;\n    int next = running + diff[index];\n    ans[index] = next;\n    build(diff, ans, index + 1, next);\n  }\n}",
      "code": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    for (int[] booking : bookings) {\n      int start = booking[0] - 1;\n      int end = booking[1];\n      int seats = booking[2];\n      diff[start] += seats;\n      diff[end] -= seats;\n    }\n\n    int running = 0;\n    int[] ans = new int[n];\n    for (int i = 0; i < n; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Car Pooling",
      "difficulty": "Medium",
      "subpattern": "Difference array capacity sweep",
      "question": "Given trips [numPassengers, from, to] and vehicle capacity, return whether all trips can be completed. Passengers are in the car for locations from through to - 1.",
      "trigger": "Each trip adds passengers over a half-open location range and removes them at drop-off.",
      "intuition": "Use a difference array over locations, sweep passenger count, and fail as soon as it exceeds capacity.",
      "edgeCases": "Drop-off is exclusive, overlapping trips, trips touching at the same location, capacity exactly met, and max location boundary.",
      "constraints": "1 <= trips.length <= 1000; 1 <= numPassengers <= 100; 0 <= from < to <= 1000; 1 <= capacity <= 10^5.",
      "source": {
        "label": "LeetCode 1094 - Car Pooling",
        "url": "https://leetcode.com/problems/car-pooling/"
      },
      "examples": [
        {
          "input": "trips = [[2,1,5],[3,3,7]], capacity = 4",
          "output": "false",
          "explanation": "At locations 3 and 4, passenger count becomes 5."
        },
        {
          "input": "trips = [[2,1,5],[3,3,7]], capacity = 5",
          "output": "true",
          "explanation": "Maximum passenger count is exactly 5."
        },
        {
          "input": "trips = [[2,1,5],[3,5,7]], capacity = 3",
          "output": "true",
          "explanation": "The first group leaves at 5 before the second group boards from 5."
        }
      ],
      "bruteForceComplexity": "Time O(t*L), where L is max location range; Space O(L) or O(1) excluding occupancy if scanning directly.",
      "optimizedComplexity": "Time O(t + L), Space O(L), with L <= 1001.",
      "recursiveComplexity": "Time O(t + L), Space O(L) diff plus O(t + L) recursion stack.",
      "bruteForceCode": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] passengers = new int[1001];\n    for (int[] trip : trips) {\n      for (int location = trip[1]; location < trip[2]; location++) {\n        passengers[location] += trip[0];\n        if (passengers[location] > capacity) return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] diff = new int[1002];\n    for (int[] trip : trips) {\n      diff[trip[1]] += trip[0];\n      diff[trip[2]] -= trip[0];\n    }\n\n    int passengers = 0;\n    for (int location = 0; location <= 1000; location++) {\n      passengers += diff[location];\n      if (passengers > capacity) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] diff = new int[1002];\n    for (int[] trip : trips) {\n      diff[trip[1]] += trip[0];\n      diff[trip[2]] -= trip[0];\n    }\n\n    int passengers = 0;\n    for (int location = 0; location <= 1000; location++) {\n      passengers += diff[location];\n      if (passengers > capacity) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] diff = new int[1002];\n    apply(trips, diff, 0);\n    return scan(diff, 0, 0, capacity);\n  }\n\n  private void apply(int[][] trips, int[] diff, int index) {\n    if (index == trips.length) return;\n    diff[trips[index][1]] += trips[index][0];\n    diff[trips[index][2]] -= trips[index][0];\n    apply(trips, diff, index + 1);\n  }\n\n  private boolean scan(int[] diff, int location, int passengers, int capacity) {\n    if (location > 1000) return true;\n    int nextPassengers = passengers + diff[location];\n    if (nextPassengers > capacity) return false;\n    return scan(diff, location + 1, nextPassengers, capacity);\n  }\n}",
      "code": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] diff = new int[1002];\n    for (int[] trip : trips) {\n      diff[trip[1]] += trip[0];\n      diff[trip[2]] -= trip[0];\n    }\n\n    int passengers = 0;\n    for (int location = 0; location <= 1000; location++) {\n      passengers += diff[location];\n      if (passengers > capacity) return false;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Shifting Letters II",
      "difficulty": "Medium",
      "subpattern": "Difference array character shifts",
      "question": "Given a lowercase string s and shifts [start, end, direction], shift each character in every inclusive range backward for 0 or forward for 1. Return the final string.",
      "trigger": "Each operation adds +1 or -1 to every index in a range, so range updates should be accumulated with a difference array.",
      "intuition": "Mark net shift changes at range boundaries, prefix-sum the shifts, normalize modulo 26, and transform each character once.",
      "edgeCases": "Backward shifts below a, forward shifts above z, overlapping shifts, full-string shifts, single-character ranges, and negative modulo normalization.",
      "constraints": "1 <= s.length, shifts.length <= 5 * 10^4; shifts[i].length == 3; direction is 0 or 1.",
      "source": {
        "label": "LeetCode 2381 - Shifting Letters II",
        "url": "https://leetcode.com/problems/shifting-letters-ii/"
      },
      "examples": [
        {
          "input": "s = \"abc\", shifts = [[0,1,0],[1,2,1],[0,2,1]]",
          "output": "\"ace\"",
          "explanation": "Net shifts are [0,1,2], producing a, c, e."
        },
        {
          "input": "s = \"dztz\", shifts = [[0,0,0],[1,1,1]]",
          "output": "\"catz\"",
          "explanation": "d shifts backward to c and z shifts forward to a."
        },
        {
          "input": "s = \"a\", shifts = [[0,0,0],[0,0,1]]",
          "output": "\"a\"",
          "explanation": "The two opposite shifts cancel."
        }
      ],
      "bruteForceComplexity": "Time O(q*n) in the worst case, Space O(n) for the mutable characters.",
      "optimizedComplexity": "Time O(n + q), Space O(n) for difference array and output.",
      "recursiveComplexity": "Time O(n + q), Space O(n) diff/output plus O(n + q) recursion stack.",
      "bruteForceCode": "class Solution {\n  public String shiftingLetters(String s, int[][] shifts) {\n    char[] chars = s.toCharArray();\n    for (int[] shift : shifts) {\n      int delta = shift[2] == 1 ? 1 : -1;\n      for (int i = shift[0]; i <= shift[1]; i++) {\n        chars[i] = shift(chars[i], delta);\n      }\n    }\n    return new String(chars);\n  }\n\n  private char shift(char ch, int delta) {\n    int value = (ch - 'a' + delta + 26) % 26;\n    return (char) ('a' + value);\n  }\n}",
      "iterativeCode": "class Solution {\n  public String shiftingLetters(String s, int[][] shifts) {\n    int n = s.length();\n    int[] diff = new int[n + 1];\n    for (int[] shift : shifts) {\n      int delta = shift[2] == 1 ? 1 : -1;\n      diff[shift[0]] += delta;\n      diff[shift[1] + 1] -= delta;\n    }\n\n    char[] ans = s.toCharArray();\n    int running = 0;\n    for (int i = 0; i < n; i++) {\n      running += diff[i];\n      int offset = ((ans[i] - 'a' + running) % 26 + 26) % 26;\n      ans[i] = (char) ('a' + offset);\n    }\n    return new String(ans);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String shiftingLetters(String s, int[][] shifts) {\n    int n = s.length();\n    int[] diff = new int[n + 1];\n    for (int[] shift : shifts) {\n      int delta = shift[2] == 1 ? 1 : -1;\n      diff[shift[0]] += delta;\n      diff[shift[1] + 1] -= delta;\n    }\n\n    char[] ans = s.toCharArray();\n    int running = 0;\n    for (int i = 0; i < n; i++) {\n      running += diff[i];\n      int offset = ((ans[i] - 'a' + running) % 26 + 26) % 26;\n      ans[i] = (char) ('a' + offset);\n    }\n    return new String(ans);\n  }\n}",
      "recursiveCode": "class Solution {\n  public String shiftingLetters(String s, int[][] shifts) {\n    int[] diff = new int[s.length() + 1];\n    apply(shifts, diff, 0);\n    char[] ans = s.toCharArray();\n    build(ans, diff, 0, 0);\n    return new String(ans);\n  }\n\n  private void apply(int[][] shifts, int[] diff, int index) {\n    if (index == shifts.length) return;\n    int delta = shifts[index][2] == 1 ? 1 : -1;\n    diff[shifts[index][0]] += delta;\n    diff[shifts[index][1] + 1] -= delta;\n    apply(shifts, diff, index + 1);\n  }\n\n  private void build(char[] ans, int[] diff, int index, int running) {\n    if (index == ans.length) return;\n    int nextRunning = running + diff[index];\n    int offset = ((ans[index] - 'a' + nextRunning) % 26 + 26) % 26;\n    ans[index] = (char) ('a' + offset);\n    build(ans, diff, index + 1, nextRunning);\n  }\n}",
      "code": "class Solution {\n  public String shiftingLetters(String s, int[][] shifts) {\n    int n = s.length();\n    int[] diff = new int[n + 1];\n    for (int[] shift : shifts) {\n      int delta = shift[2] == 1 ? 1 : -1;\n      diff[shift[0]] += delta;\n      diff[shift[1] + 1] -= delta;\n    }\n\n    char[] ans = s.toCharArray();\n    int running = 0;\n    for (int i = 0; i < n; i++) {\n      running += diff[i];\n      int offset = ((ans[i] - 'a' + running) % 26 + 26) % 26;\n      ans[i] = (char) ('a' + offset);\n    }\n    return new String(ans);\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Plates Between Candles",
      "difficulty": "Medium",
      "subpattern": "Prefix count with nearest boundaries",
      "question": "Given a string s of plates (*) and candles (|), answer each query [left, right] with the number of plates strictly between two candles inside that range.",
      "trigger": "Each query needs a bounded count: first candle at or after left, last candle at or before right, then prefix-count plates between them.",
      "intuition": "Precompute nearest candle to the left/right and a prefix plate count. Each query becomes two boundary lookups and one subtraction.",
      "edgeCases": "No candle in range, only one candle in range, adjacent candles, all plates, all candles, and queries at string boundaries.",
      "constraints": "3 <= s.length <= 10^5; 1 <= queries.length <= 10^5; s[i] is * or |; 0 <= left <= right < s.length.",
      "source": {
        "label": "LeetCode 2055 - Plates Between Candles",
        "url": "https://leetcode.com/problems/plates-between-candles/"
      },
      "examples": [
        {
          "input": "s = \"**|**|***|\", queries = [[2,5],[5,9]]",
          "output": "[2,3]",
          "explanation": "The first range has two plates between candles 2 and 5; the second has three between candles 5 and 9."
        },
        {
          "input": "s = \"***|**|*****|**||**|*\", queries = [[1,17],[4,5],[14,17],[5,11],[15,16]]",
          "output": "[9,0,0,0,0]",
          "explanation": "Only ranges with two valid candle boundaries count enclosed plates."
        },
        {
          "input": "s = \"***\", queries = [[0,2]]",
          "output": "[0]",
          "explanation": "No candles exist, so no plates are enclosed."
        }
      ],
      "bruteForceComplexity": "Time O(q*n) in the worst case, Space O(q) for answers.",
      "optimizedComplexity": "Time O(n + q), Space O(n + q).",
      "recursiveComplexity": "Time O(n + q), Space O(n + q) plus O(n + q) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[] platesBetweenCandles(String s, int[][] queries) {\n    int[] ans = new int[queries.length];\n    for (int qi = 0; qi < queries.length; qi++) {\n      int left = queries[qi][0];\n      int right = queries[qi][1];\n      while (left <= right && s.charAt(left) != '|') left++;\n      while (left <= right && s.charAt(right) != '|') right--;\n      int plates = 0;\n      for (int i = left; i <= right; i++) {\n        if (s.charAt(i) == '*') plates++;\n      }\n      ans[qi] = left < right ? plates : 0;\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] platesBetweenCandles(String s, int[][] queries) {\n    int n = s.length();\n    int[] prefix = new int[n + 1];\n    int[] leftCandle = new int[n];\n    int[] rightCandle = new int[n];\n\n    int last = -1;\n    for (int i = 0; i < n; i++) {\n      prefix[i + 1] = prefix[i] + (s.charAt(i) == '*' ? 1 : 0);\n      if (s.charAt(i) == '|') last = i;\n      leftCandle[i] = last;\n    }\n\n    last = -1;\n    for (int i = n - 1; i >= 0; i--) {\n      if (s.charAt(i) == '|') last = i;\n      rightCandle[i] = last;\n    }\n\n    int[] ans = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int left = rightCandle[queries[i][0]];\n      int right = leftCandle[queries[i][1]];\n      if (left != -1 && right != -1 && left < right) {\n        ans[i] = prefix[right] - prefix[left + 1];\n      }\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] platesBetweenCandles(String s, int[][] queries) {\n    int n = s.length();\n    int[] prefix = new int[n + 1];\n    int[] leftCandle = new int[n];\n    int[] rightCandle = new int[n];\n\n    int last = -1;\n    for (int i = 0; i < n; i++) {\n      prefix[i + 1] = prefix[i] + (s.charAt(i) == '*' ? 1 : 0);\n      if (s.charAt(i) == '|') last = i;\n      leftCandle[i] = last;\n    }\n\n    last = -1;\n    for (int i = n - 1; i >= 0; i--) {\n      if (s.charAt(i) == '|') last = i;\n      rightCandle[i] = last;\n    }\n\n    int[] ans = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int left = rightCandle[queries[i][0]];\n      int right = leftCandle[queries[i][1]];\n      if (left != -1 && right != -1 && left < right) {\n        ans[i] = prefix[right] - prefix[left + 1];\n      }\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] platesBetweenCandles(String s, int[][] queries) {\n    int n = s.length();\n    int[] prefix = new int[n + 1];\n    int[] leftCandle = new int[n];\n    int[] rightCandle = new int[n];\n    buildLeft(s, prefix, leftCandle, 0, -1);\n    buildRight(s, rightCandle, n - 1, -1);\n    int[] ans = new int[queries.length];\n    answer(queries, prefix, leftCandle, rightCandle, ans, 0);\n    return ans;\n  }\n\n  private void buildLeft(String s, int[] prefix, int[] leftCandle, int index, int last) {\n    if (index == s.length()) return;\n    prefix[index + 1] = prefix[index] + (s.charAt(index) == '*' ? 1 : 0);\n    int nextLast = s.charAt(index) == '|' ? index : last;\n    leftCandle[index] = nextLast;\n    buildLeft(s, prefix, leftCandle, index + 1, nextLast);\n  }\n\n  private void buildRight(String s, int[] rightCandle, int index, int last) {\n    if (index < 0) return;\n    int nextLast = s.charAt(index) == '|' ? index : last;\n    rightCandle[index] = nextLast;\n    buildRight(s, rightCandle, index - 1, nextLast);\n  }\n\n  private void answer(int[][] queries, int[] prefix, int[] leftCandle, int[] rightCandle, int[] ans, int index) {\n    if (index == queries.length) return;\n    int left = rightCandle[queries[index][0]];\n    int right = leftCandle[queries[index][1]];\n    if (left != -1 && right != -1 && left < right) {\n      ans[index] = prefix[right] - prefix[left + 1];\n    }\n    answer(queries, prefix, leftCandle, rightCandle, ans, index + 1);\n  }\n}",
      "code": "class Solution {\n  public int[] platesBetweenCandles(String s, int[][] queries) {\n    int n = s.length();\n    int[] prefix = new int[n + 1];\n    int[] leftCandle = new int[n];\n    int[] rightCandle = new int[n];\n\n    int last = -1;\n    for (int i = 0; i < n; i++) {\n      prefix[i + 1] = prefix[i] + (s.charAt(i) == '*' ? 1 : 0);\n      if (s.charAt(i) == '|') last = i;\n      leftCandle[i] = last;\n    }\n\n    last = -1;\n    for (int i = n - 1; i >= 0; i--) {\n      if (s.charAt(i) == '|') last = i;\n      rightCandle[i] = last;\n    }\n\n    int[] ans = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int left = rightCandle[queries[i][0]];\n      int right = leftCandle[queries[i][1]];\n      if (left != -1 && right != -1 && left < right) {\n        ans[i] = prefix[right] - prefix[left + 1];\n      }\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Count Number of Nice Subarrays",
      "difficulty": "Medium",
      "subpattern": "Prefix odd-count frequency",
      "question": "Given nums and k, return the number of continuous subarrays containing exactly k odd numbers.",
      "trigger": "Convert each number to odd-count contribution 0 or 1; then count subarrays whose prefix odd count differs by k.",
      "intuition": "Store frequencies of prefix odd counts. At each index, previousOddCount = currentOddCount - k creates a nice subarray.",
      "edgeCases": "No odd numbers, k larger than odd count, all odd numbers, even-only stretches, k = 1, and subarray starting at index 0.",
      "constraints": "1 <= nums.length <= 5 * 10^4; 1 <= nums[i] <= 10^5; 1 <= k <= nums.length.",
      "source": {
        "label": "LeetCode 1248 - Count Number of Nice Subarrays",
        "url": "https://leetcode.com/problems/count-number-of-nice-subarrays/"
      },
      "examples": [
        {
          "input": "nums = [1,1,2,1,1], k = 3",
          "output": "2",
          "explanation": "The two nice subarrays are [1,1,2,1] and [1,2,1,1]."
        },
        {
          "input": "nums = [2,4,6], k = 1",
          "output": "0",
          "explanation": "No odd number exists."
        },
        {
          "input": "nums = [2,2,2,1,2,2,1,2,2,2], k = 2",
          "output": "16",
          "explanation": "Even stretches around the two odds create 16 choices."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n) for odd-count frequencies.",
      "recursiveComplexity": "Time O(n), Space O(n) frequencies plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    int count = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int odds = 0;\n      for (int end = start; end < nums.length; end++) {\n        odds += nums[end] % 2;\n        if (odds == k) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    int[] freq = new int[nums.length + 1];\n    freq[0] = 1;\n\n    int oddCount = 0;\n    int count = 0;\n    for (int num : nums) {\n      oddCount += num % 2;\n      if (oddCount >= k) {\n        count += freq[oddCount - k];\n      }\n      freq[oddCount]++;\n    }\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    int[] freq = new int[nums.length + 1];\n    freq[0] = 1;\n\n    int oddCount = 0;\n    int count = 0;\n    for (int num : nums) {\n      oddCount += num % 2;\n      if (oddCount >= k) {\n        count += freq[oddCount - k];\n      }\n      freq[oddCount]++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    int[] freq = new int[nums.length + 1];\n    freq[0] = 1;\n    return scan(nums, k, 0, 0, 0, freq);\n  }\n\n  private int scan(int[] nums, int k, int index, int oddCount, int count, int[] freq) {\n    if (index == nums.length) return count;\n    int nextOddCount = oddCount + nums[index] % 2;\n    int nextCount = count;\n    if (nextOddCount >= k) {\n      nextCount += freq[nextOddCount - k];\n    }\n    freq[nextOddCount]++;\n    return scan(nums, k, index + 1, nextOddCount, nextCount, freq);\n  }\n}",
      "code": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    int[] freq = new int[nums.length + 1];\n    freq[0] = 1;\n\n    int oddCount = 0;\n    int count = 0;\n    for (int num : nums) {\n      oddCount += num % 2;\n      if (oddCount >= k) {\n        count += freq[oddCount - k];\n      }\n      freq[oddCount]++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Binary Subarrays With Sum",
      "difficulty": "Medium",
      "subpattern": "Prefix sum frequency on binary array",
      "question": "Given a binary array nums and an integer goal, return the number of non-empty subarrays with sum equal to goal.",
      "trigger": "For a subarray ending now to sum to goal, a previous prefix must equal currentPrefix - goal.",
      "intuition": "Binary values still work with prefix frequency. Count prior prefixes that would complete the required sum.",
      "edgeCases": "goal = 0, all zeros, all ones, subarray starting at index 0, repeated prefix sums, and many overlapping answers.",
      "constraints": "1 <= nums.length <= 3 * 10^4; nums[i] is 0 or 1; 0 <= goal <= nums.length.",
      "source": {
        "label": "LeetCode 930 - Binary Subarrays With Sum",
        "url": "https://leetcode.com/problems/binary-subarrays-with-sum/"
      },
      "examples": [
        {
          "input": "nums = [1,0,1,0,1], goal = 2",
          "output": "4",
          "explanation": "Four subarrays contain exactly two ones."
        },
        {
          "input": "nums = [0,0,0,0,0], goal = 0",
          "output": "15",
          "explanation": "Every subarray has sum 0."
        },
        {
          "input": "nums = [1,1,1], goal = 2",
          "output": "2",
          "explanation": "The valid subarrays are nums[0..1] and nums[1..2]."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n) for prefix frequency map.",
      "recursiveComplexity": "Time O(n), Space O(n) map plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    int count = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum == goal) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - goal, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - goal, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n    return scan(nums, goal, 0, 0, 0, freq);\n  }\n\n  private int scan(int[] nums, int goal, int index, int prefix, int count, Map<Integer, Integer> freq) {\n    if (index == nums.length) return count;\n    int nextPrefix = prefix + nums[index];\n    int nextCount = count + freq.getOrDefault(nextPrefix - goal, 0);\n    freq.put(nextPrefix, freq.getOrDefault(nextPrefix, 0) + 1);\n    return scan(nums, goal, index + 1, nextPrefix, nextCount, freq);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - goal, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Operations to Reduce X to Zero",
      "difficulty": "Medium",
      "subpattern": "Complement prefix/window sum",
      "question": "Given nums and x, remove elements only from the left or right end so their sum is exactly x. Return the minimum operations, or -1 if impossible.",
      "trigger": "Removing ends with sum x is equivalent to keeping the longest middle subarray with sum total - x.",
      "intuition": "Find the longest subarray whose sum is target = total - x. Minimum removals are n - longestLength.",
      "edgeCases": "x equals total, target is negative, no valid middle subarray, whole middle subarray, single element, and positive-only values enabling window/prefix logic.",
      "constraints": "1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^4; 1 <= x <= 10^9.",
      "source": {
        "label": "LeetCode 1658 - Minimum Operations to Reduce X to Zero",
        "url": "https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/"
      },
      "examples": [
        {
          "input": "nums = [1,1,4,2,3], x = 5",
          "output": "2",
          "explanation": "Remove 2 and 3 from the right; the kept middle sum is total - x = 6."
        },
        {
          "input": "nums = [5,6,7,8,9], x = 4",
          "output": "-1",
          "explanation": "No end removals can sum to 4."
        },
        {
          "input": "nums = [3,2,20,1,1,3], x = 10",
          "output": "5",
          "explanation": "Keep [20], so remove five elements from the ends."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n) for first prefix index map.",
      "recursiveComplexity": "Time O(n), Space O(n) map plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n    int longest = -1;\n\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum == target) longest = Math.max(longest, end - start + 1);\n      }\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    int prefix = 0;\n    int longest = -1;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      if (firstIndex.containsKey(prefix - target)) {\n        longest = Math.max(longest, i - firstIndex.get(prefix - target));\n      }\n      firstIndex.putIfAbsent(prefix, i);\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    int prefix = 0;\n    int longest = -1;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      if (firstIndex.containsKey(prefix - target)) {\n        longest = Math.max(longest, i - firstIndex.get(prefix - target));\n      }\n      firstIndex.putIfAbsent(prefix, i);\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = sum(nums, 0);\n    int target = total - x;\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    int longest = scan(nums, target, 0, 0, -1, firstIndex);\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int scan(int[] nums, int target, int index, int prefix, int longest, Map<Integer, Integer> firstIndex) {\n    if (index == nums.length) return longest;\n    int nextPrefix = prefix + nums[index];\n    int nextLongest = longest;\n    if (firstIndex.containsKey(nextPrefix - target)) {\n      nextLongest = Math.max(longest, index - firstIndex.get(nextPrefix - target));\n    }\n    firstIndex.putIfAbsent(nextPrefix, index);\n    return scan(nums, target, index + 1, nextPrefix, nextLongest, firstIndex);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n\n    Map<Integer, Integer> firstIndex = new HashMap<>();\n    firstIndex.put(0, -1);\n    int prefix = 0;\n    int longest = -1;\n    for (int i = 0; i < nums.length; i++) {\n      prefix += nums[i];\n      if (firstIndex.containsKey(prefix - target)) {\n        longest = Math.max(longest, i - firstIndex.get(prefix - target));\n      }\n      firstIndex.putIfAbsent(prefix, i);\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Ways to Split Array Into Three Subarrays",
      "difficulty": "Medium",
      "subpattern": "Prefix sum with binary boundaries",
      "question": "Given non-negative nums, split it into left, mid, and right non-empty subarrays such that sum(left) <= sum(mid) <= sum(right). Return the number of valid splits modulo 1e9+7.",
      "trigger": "Each split comparison is between range sums, and non-negative values make prefix sums monotonic for binary searching boundaries.",
      "intuition": "Fix the end of left. Binary search the valid range of mid endings where left <= mid and mid <= right.",
      "edgeCases": "Minimum length 3, zeros causing many equal sums, large answer needing modulo, no valid split, and right part must be non-empty.",
      "constraints": "3 <= nums.length <= 10^5; 0 <= nums[i] <= 10^4.",
      "source": {
        "label": "LeetCode 1712 - Ways to Split Array Into Three Subarrays",
        "url": "https://leetcode.com/problems/ways-to-split-array-into-three-subarrays/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1]",
          "output": "1",
          "explanation": "Only [1], [1], [1] is valid."
        },
        {
          "input": "nums = [1,2,2,2,5,0]",
          "output": "3",
          "explanation": "Three split pairs satisfy left <= mid <= right."
        },
        {
          "input": "nums = [3,2,1]",
          "output": "0",
          "explanation": "No split can make the sums nondecreasing."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(n) for prefix sums.",
      "optimizedComplexity": "Time O(n log n), Space O(n) for prefix sums.",
      "recursiveComplexity": "Time O(n log n), Space O(n) prefix plus O(n + log n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int waysToSplit(int[] nums) {\n    int mod = 1_000_000_007;\n    long[] prefix = buildPrefix(nums);\n    long ways = 0;\n    int n = nums.length;\n\n    for (int i = 0; i < n - 2; i++) {\n      for (int j = i + 1; j < n - 1; j++) {\n        long left = prefix[i + 1];\n        long mid = prefix[j + 1] - prefix[i + 1];\n        long right = prefix[n] - prefix[j + 1];\n        if (left <= mid && mid <= right) ways++;\n      }\n    }\n    return (int) (ways % mod);\n  }\n\n  private long[] buildPrefix(int[] nums) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    return prefix;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int waysToSplit(int[] nums) {\n    int mod = 1_000_000_007;\n    int n = nums.length;\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n\n    long ways = 0;\n    for (int i = 0; i < n - 2; i++) {\n      int low = lowerBound(prefix, i + 2, n, 2 * prefix[i + 1]);\n      int high = upperBound(prefix, i + 2, n, (prefix[n] + prefix[i + 1]) / 2);\n      if (high > low) ways = (ways + high - low) % mod;\n    }\n    return (int) ways;\n  }\n\n  private int lowerBound(long[] prefix, int left, int right, long target) {\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (prefix[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] prefix, int left, int right, long target) {\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (prefix[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int waysToSplit(int[] nums) {\n    int mod = 1_000_000_007;\n    int n = nums.length;\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n\n    long ways = 0;\n    for (int i = 0; i < n - 2; i++) {\n      int low = lowerBound(prefix, i + 2, n, 2 * prefix[i + 1]);\n      int high = upperBound(prefix, i + 2, n, (prefix[n] + prefix[i + 1]) / 2);\n      if (high > low) ways = (ways + high - low) % mod;\n    }\n    return (int) ways;\n  }\n\n  private int lowerBound(long[] prefix, int left, int right, long target) {\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (prefix[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] prefix, int left, int right, long target) {\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (prefix[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int waysToSplit(int[] nums) {\n    long[] prefix = new long[nums.length + 1];\n    build(nums, prefix, 0);\n    return (int) count(prefix, 0, nums.length, 0L);\n  }\n\n  private void build(int[] nums, long[] prefix, int index) {\n    if (index == nums.length) return;\n    prefix[index + 1] = prefix[index] + nums[index];\n    build(nums, prefix, index + 1);\n  }\n\n  private long count(long[] prefix, int i, int n, long ways) {\n    if (i == n - 2) return ways % MOD;\n    int low = lower(prefix, i + 2, n, 2 * prefix[i + 1]);\n    int high = upper(prefix, i + 2, n, (prefix[n] + prefix[i + 1]) / 2);\n    long add = high > low ? high - low : 0;\n    return count(prefix, i + 1, n, (ways + add) % MOD);\n  }\n\n  private int lower(long[] prefix, int left, int right, long target) {\n    if (left >= right) return left;\n    int mid = left + (right - left) / 2;\n    if (prefix[mid] < target) return lower(prefix, mid + 1, right, target);\n    return lower(prefix, left, mid, target);\n  }\n\n  private int upper(long[] prefix, int left, int right, long target) {\n    if (left >= right) return left;\n    int mid = left + (right - left) / 2;\n    if (prefix[mid] <= target) return upper(prefix, mid + 1, right, target);\n    return upper(prefix, left, mid, target);\n  }\n}",
      "code": "class Solution {\n  public int waysToSplit(int[] nums) {\n    int mod = 1_000_000_007;\n    int n = nums.length;\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n\n    long ways = 0;\n    for (int i = 0; i < n - 2; i++) {\n      int low = lowerBound(prefix, i + 2, n, 2 * prefix[i + 1]);\n      int high = upperBound(prefix, i + 2, n, (prefix[n] + prefix[i + 1]) / 2);\n      if (high > low) ways = (ways + high - low) % mod;\n    }\n    return (int) ways;\n  }\n\n  private int lowerBound(long[] prefix, int left, int right, long target) {\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (prefix[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] prefix, int left, int right, long target) {\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (prefix[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "K Radius Subarray Averages",
      "difficulty": "Medium",
      "subpattern": "Fixed-radius prefix range query",
      "question": "Given nums and k, return an array avgs where avgs[i] is the average of the subarray centered at i with radius k, or -1 if that full radius does not fit.",
      "trigger": "Each valid center asks for the sum of a fixed range [i-k, i+k], which is a direct prefix range-sum query.",
      "intuition": "Build prefix sums once. For each center with enough elements on both sides, divide the range sum by length 2k+1.",
      "edgeCases": "k = 0, window length larger than nums length, large sums requiring long, centers near boundaries, and integer division flooring.",
      "constraints": "1 <= nums.length <= 10^5; 0 <= nums[i], k <= 10^5.",
      "source": {
        "label": "LeetCode 2090 - K Radius Subarray Averages",
        "url": "https://leetcode.com/problems/k-radius-subarray-averages/"
      },
      "examples": [
        {
          "input": "nums = [7,4,3,9,1,8,5,2,6], k = 3",
          "output": "[-1,-1,-1,5,4,4,-1,-1,-1]",
          "explanation": "Only centers 3, 4, and 5 have full length-7 windows."
        },
        {
          "input": "nums = [100000], k = 0",
          "output": "[100000]",
          "explanation": "Radius 0 means each element averages itself."
        },
        {
          "input": "nums = [8], k = 100000",
          "output": "[-1]",
          "explanation": "The required window does not fit."
        }
      ],
      "bruteForceComplexity": "Time O(n*k) in the worst case, Space O(n) for the answer.",
      "optimizedComplexity": "Time O(n), Space O(n) for prefix and answer.",
      "recursiveComplexity": "Time O(n), Space O(n) prefix/answer plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    java.util.Arrays.fill(ans, -1);\n    int len = 2 * k + 1;\n\n    for (int center = k; center + k < n; center++) {\n      long sum = 0;\n      for (int i = center - k; i <= center + k; i++) {\n        sum += nums[i];\n      }\n      ans[center] = (int) (sum / len);\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    Arrays.fill(ans, -1);\n    int len = 2 * k + 1;\n    if (len > n) return ans;\n\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n\n    for (int center = k; center + k < n; center++) {\n      long sum = prefix[center + k + 1] - prefix[center - k];\n      ans[center] = (int) (sum / len);\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    Arrays.fill(ans, -1);\n    int len = 2 * k + 1;\n    if (len > n) return ans;\n\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n\n    for (int center = k; center + k < n; center++) {\n      long sum = prefix[center + k + 1] - prefix[center - k];\n      ans[center] = (int) (sum / len);\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int[] ans = new int[nums.length];\n    Arrays.fill(ans, -1);\n    int len = 2 * k + 1;\n    if (len > nums.length) return ans;\n    long[] prefix = new long[nums.length + 1];\n    build(nums, prefix, 0);\n    fill(prefix, ans, k, len, k);\n    return ans;\n  }\n\n  private void build(int[] nums, long[] prefix, int index) {\n    if (index == nums.length) return;\n    prefix[index + 1] = prefix[index] + nums[index];\n    build(nums, prefix, index + 1);\n  }\n\n  private void fill(long[] prefix, int[] ans, int k, int len, int center) {\n    if (center + k >= ans.length) return;\n    long sum = prefix[center + k + 1] - prefix[center - k];\n    ans[center] = (int) (sum / len);\n    fill(prefix, ans, k, len, center + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    Arrays.fill(ans, -1);\n    int len = 2 * k + 1;\n    if (len > n) return ans;\n\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n\n    for (int center = k; center + k < n; center++) {\n      long sum = prefix[center + k + 1] - prefix[center - k];\n      ans[center] = (int) (sum / len);\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Count Vowel Strings in Ranges",
      "difficulty": "Medium",
      "subpattern": "Prefix count query",
      "question": "Given words and queries [left, right], return how many words in each range both start and end with a vowel.",
      "trigger": "Each query asks for a count over an immutable index range, so a prefix count answers it in O(1).",
      "intuition": "Mark each word as 1 if it starts and ends with a vowel, build prefix counts, then subtract range boundaries.",
      "edgeCases": "Single-character words, single-index queries, no vowel words, all vowel words, and ranges starting at index 0.",
      "constraints": "1 <= words.length <= 10^5; 1 <= words[i].length <= 40; 1 <= queries.length <= 10^5.",
      "source": {
        "label": "LeetCode 2559 - Count Vowel Strings in Ranges",
        "url": "https://leetcode.com/problems/count-vowel-strings-in-ranges/"
      },
      "examples": [
        {
          "input": "words = [\"aba\",\"bcb\",\"ece\",\"aa\",\"e\"], queries = [[0,2],[1,4],[1,1]]",
          "output": "[2,3,0]",
          "explanation": "Vowel strings are at indexes 0, 2, 3, and 4."
        },
        {
          "input": "words = [\"a\",\"e\",\"i\"], queries = [[0,2],[0,1],[2,2]]",
          "output": "[3,2,1]",
          "explanation": "Every word starts and ends with a vowel."
        },
        {
          "input": "words = [\"abc\",\"bcd\"], queries = [[0,1]]",
          "output": "[0]",
          "explanation": "No word both starts and ends with a vowel."
        }
      ],
      "bruteForceComplexity": "Time O(q*n) in the worst case, Space O(q) for answers.",
      "optimizedComplexity": "Time O(n + q), Space O(n + q).",
      "recursiveComplexity": "Time O(n + q), Space O(n + q) plus O(n + q) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[] vowelStrings(String[] words, int[][] queries) {\n    int[] ans = new int[queries.length];\n    for (int qi = 0; qi < queries.length; qi++) {\n      int count = 0;\n      for (int i = queries[qi][0]; i <= queries[qi][1]; i++) {\n        if (isVowelString(words[i])) count++;\n      }\n      ans[qi] = count;\n    }\n    return ans;\n  }\n\n  private boolean isVowelString(String word) {\n    return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length() - 1));\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] vowelStrings(String[] words, int[][] queries) {\n    int[] prefix = new int[words.length + 1];\n    for (int i = 0; i < words.length; i++) {\n      prefix[i + 1] = prefix[i] + (isVowelString(words[i]) ? 1 : 0);\n    }\n\n    int[] ans = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      ans[i] = prefix[queries[i][1] + 1] - prefix[queries[i][0]];\n    }\n    return ans;\n  }\n\n  private boolean isVowelString(String word) {\n    return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length() - 1));\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] vowelStrings(String[] words, int[][] queries) {\n    int[] prefix = new int[words.length + 1];\n    for (int i = 0; i < words.length; i++) {\n      prefix[i + 1] = prefix[i] + (isVowelString(words[i]) ? 1 : 0);\n    }\n\n    int[] ans = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      ans[i] = prefix[queries[i][1] + 1] - prefix[queries[i][0]];\n    }\n    return ans;\n  }\n\n  private boolean isVowelString(String word) {\n    return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length() - 1));\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] vowelStrings(String[] words, int[][] queries) {\n    int[] prefix = new int[words.length + 1];\n    build(words, prefix, 0);\n    int[] ans = new int[queries.length];\n    answer(queries, prefix, ans, 0);\n    return ans;\n  }\n\n  private void build(String[] words, int[] prefix, int index) {\n    if (index == words.length) return;\n    prefix[index + 1] = prefix[index] + (isVowelString(words[index]) ? 1 : 0);\n    build(words, prefix, index + 1);\n  }\n\n  private void answer(int[][] queries, int[] prefix, int[] ans, int index) {\n    if (index == queries.length) return;\n    ans[index] = prefix[queries[index][1] + 1] - prefix[queries[index][0]];\n    answer(queries, prefix, ans, index + 1);\n  }\n\n  private boolean isVowelString(String word) {\n    return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length() - 1));\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "code": "class Solution {\n  public int[] vowelStrings(String[] words, int[][] queries) {\n    int[] prefix = new int[words.length + 1];\n    for (int i = 0; i < words.length; i++) {\n      prefix[i + 1] = prefix[i] + (isVowelString(words[i]) ? 1 : 0);\n    }\n\n    int[] ans = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      ans[i] = prefix[queries[i][1] + 1] - prefix[queries[i][0]];\n    }\n    return ans;\n  }\n\n  private boolean isVowelString(String word) {\n    return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length() - 1));\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Range Addition",
      "difficulty": "Medium",
      "subpattern": "Difference array range updates",
      "question": "Given an initially zero array of given length and updates [start, end, inc], apply each inclusive range increment and return the final array.",
      "trigger": "Each update adds the same value to an inclusive range, so marking only the range boundaries avoids touching every element per update.",
      "intuition": "Add inc at start and subtract inc after end. A final prefix scan converts boundary changes into actual values.",
      "edgeCases": "Update starts at 0, update ends at length - 1, negative increments, overlapping updates, single-element range, and no updates.",
      "constraints": "1 <= length <= 10^5; 0 <= updates.length <= 10^4; 0 <= start <= end < length; -1000 <= inc <= 1000.",
      "source": {
        "label": "LeetCode 370 - Range Addition",
        "url": "https://leetcode.com/problems/range-addition/"
      },
      "examples": [
        {
          "input": "length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]",
          "output": "[-2,0,3,5,3]",
          "explanation": "Boundary updates prefix-scan into the final values."
        },
        {
          "input": "length = 3, updates = [[0,2,1]]",
          "output": "[1,1,1]",
          "explanation": "The whole array receives +1."
        },
        {
          "input": "length = 4, updates = []",
          "output": "[0,0,0,0]",
          "explanation": "No updates keep the zero array unchanged."
        }
      ],
      "bruteForceComplexity": "Time O(u*n) in the worst case, Space O(n) for the result.",
      "optimizedComplexity": "Time O(u + n), Space O(n).",
      "recursiveComplexity": "Time O(u + n), Space O(n) plus O(u + n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[] getModifiedArray(int length, int[][] updates) {\n    int[] ans = new int[length];\n    for (int[] update : updates) {\n      for (int i = update[0]; i <= update[1]; i++) {\n        ans[i] += update[2];\n      }\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] getModifiedArray(int length, int[][] updates) {\n    int[] diff = new int[length + 1];\n    for (int[] update : updates) {\n      diff[update[0]] += update[2];\n      diff[update[1] + 1] -= update[2];\n    }\n\n    int[] ans = new int[length];\n    int running = 0;\n    for (int i = 0; i < length; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] getModifiedArray(int length, int[][] updates) {\n    int[] diff = new int[length + 1];\n    for (int[] update : updates) {\n      diff[update[0]] += update[2];\n      diff[update[1] + 1] -= update[2];\n    }\n\n    int[] ans = new int[length];\n    int running = 0;\n    for (int i = 0; i < length; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] getModifiedArray(int length, int[][] updates) {\n    int[] diff = new int[length + 1];\n    apply(updates, diff, 0);\n    int[] ans = new int[length];\n    build(diff, ans, 0, 0);\n    return ans;\n  }\n\n  private void apply(int[][] updates, int[] diff, int index) {\n    if (index == updates.length) return;\n    diff[updates[index][0]] += updates[index][2];\n    diff[updates[index][1] + 1] -= updates[index][2];\n    apply(updates, diff, index + 1);\n  }\n\n  private void build(int[] diff, int[] ans, int index, int running) {\n    if (index == ans.length) return;\n    int next = running + diff[index];\n    ans[index] = next;\n    build(diff, ans, index + 1, next);\n  }\n}",
      "code": "class Solution {\n  public int[] getModifiedArray(int length, int[][] updates) {\n    int[] diff = new int[length + 1];\n    for (int[] update : updates) {\n      diff[update[0]] += update[2];\n      diff[update[1] + 1] -= update[2];\n    }\n\n    int[] ans = new int[length];\n    int running = 0;\n    for (int i = 0; i < length; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Average Difference",
      "difficulty": "Medium",
      "subpattern": "Prefix average split",
      "question": "Given nums, return the index with the minimum absolute difference between the average of nums[0..i] and the average of nums[i+1..n-1]. Return the smallest such index.",
      "trigger": "Each index compares left prefix average with right suffix average derived from total sum.",
      "intuition": "Compute total once. Sweep prefix left to right; right sum is total - left sum, with empty right average treated as 0.",
      "edgeCases": "Single element, tie returns smallest index, last index has empty right part, large sums requiring long, and all equal values.",
      "constraints": "1 <= nums.length <= 10^5; 0 <= nums[i] <= 10^5.",
      "source": {
        "label": "LeetCode 2256 - Minimum Average Difference",
        "url": "https://leetcode.com/problems/minimum-average-difference/"
      },
      "examples": [
        {
          "input": "nums = [2,5,3,9,5,3]",
          "output": "3",
          "explanation": "Index 3 gives minimum average difference 1."
        },
        {
          "input": "nums = [0]",
          "output": "0",
          "explanation": "Left average is 0 and empty right average is 0."
        },
        {
          "input": "nums = [4,2,0]",
          "output": "2",
          "explanation": "The last split has the smallest difference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int minimumAverageDifference(int[] nums) {\n    int bestIndex = 0;\n    long bestDiff = Long.MAX_VALUE;\n\n    for (int i = 0; i < nums.length; i++) {\n      long left = 0;\n      long right = 0;\n      for (int j = 0; j <= i; j++) left += nums[j];\n      for (int j = i + 1; j < nums.length; j++) right += nums[j];\n      long leftAvg = left / (i + 1);\n      long rightAvg = i == nums.length - 1 ? 0 : right / (nums.length - i - 1);\n      long diff = Math.abs(leftAvg - rightAvg);\n      if (diff < bestDiff) {\n        bestDiff = diff;\n        bestIndex = i;\n      }\n    }\n    return bestIndex;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minimumAverageDifference(int[] nums) {\n    long total = 0;\n    for (int num : nums) total += num;\n\n    int bestIndex = 0;\n    long bestDiff = Long.MAX_VALUE;\n    long left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      left += nums[i];\n      long right = total - left;\n      long leftAvg = left / (i + 1);\n      long rightAvg = i == nums.length - 1 ? 0 : right / (nums.length - i - 1);\n      long diff = Math.abs(leftAvg - rightAvg);\n      if (diff < bestDiff) {\n        bestDiff = diff;\n        bestIndex = i;\n      }\n    }\n    return bestIndex;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minimumAverageDifference(int[] nums) {\n    long total = 0;\n    for (int num : nums) total += num;\n\n    int bestIndex = 0;\n    long bestDiff = Long.MAX_VALUE;\n    long left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      left += nums[i];\n      long right = total - left;\n      long leftAvg = left / (i + 1);\n      long rightAvg = i == nums.length - 1 ? 0 : right / (nums.length - i - 1);\n      long diff = Math.abs(leftAvg - rightAvg);\n      if (diff < bestDiff) {\n        bestDiff = diff;\n        bestIndex = i;\n      }\n    }\n    return bestIndex;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minimumAverageDifference(int[] nums) {\n    long total = sum(nums, 0);\n    return scan(nums, 0, 0L, total, Long.MAX_VALUE, 0);\n  }\n\n  private long sum(int[] nums, int index) {\n    if (index == nums.length) return 0L;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int scan(int[] nums, int index, long left, long total, long bestDiff, int bestIndex) {\n    if (index == nums.length) return bestIndex;\n    long nextLeft = left + nums[index];\n    long right = total - nextLeft;\n    long leftAvg = nextLeft / (index + 1);\n    long rightAvg = index == nums.length - 1 ? 0 : right / (nums.length - index - 1);\n    long diff = Math.abs(leftAvg - rightAvg);\n    if (diff < bestDiff) {\n      return scan(nums, index + 1, nextLeft, total, diff, index);\n    }\n    return scan(nums, index + 1, nextLeft, total, bestDiff, bestIndex);\n  }\n}",
      "code": "class Solution {\n  public int minimumAverageDifference(int[] nums) {\n    long total = 0;\n    for (int num : nums) total += num;\n\n    int bestIndex = 0;\n    long bestDiff = Long.MAX_VALUE;\n    long left = 0;\n    for (int i = 0; i < nums.length; i++) {\n      left += nums[i];\n      long right = total - left;\n      long leftAvg = left / (i + 1);\n      long rightAvg = i == nums.length - 1 ? 0 : right / (nums.length - i - 1);\n      long diff = Math.abs(leftAvg - rightAvg);\n      if (diff < bestDiff) {\n        bestDiff = diff;\n        bestIndex = i;\n      }\n    }\n    return bestIndex;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Grid Game",
      "difficulty": "Medium",
      "subpattern": "Two-row prefix/suffix minimax",
      "question": "Given a 2 x n grid, the first robot moves from top-left to bottom-right and zeros its path. Return the minimum possible score the second robot can collect if the first robot chooses optimally.",
      "trigger": "The first robot chooses a column to drop from top to bottom; the second robot then can only collect either remaining top suffix or bottom prefix.",
      "intuition": "For each drop column, second robot score is max(top sum after column, bottom sum before column). Minimize that maximum.",
      "edgeCases": "n = 1, large values requiring long, drop at first column, drop at last column, and balancing top suffix vs bottom prefix.",
      "constraints": "grid.length == 2; 1 <= n <= 5 * 10^4; 1 <= grid[r][c] <= 10^5.",
      "source": {
        "label": "LeetCode 2017 - Grid Game",
        "url": "https://leetcode.com/problems/grid-game/"
      },
      "examples": [
        {
          "input": "grid = [[2,5,4],[1,5,1]]",
          "output": "4",
          "explanation": "Dropping at column 1 leaves top suffix 4 and bottom prefix 1, so second robot gets 4."
        },
        {
          "input": "grid = [[3,3,1],[8,5,2]]",
          "output": "4",
          "explanation": "The optimal first path limits the second robot to score 4."
        },
        {
          "input": "grid = [[1,3,1,15],[1,3,3,1]]",
          "output": "7",
          "explanation": "The best drop balances remaining top and bottom choices."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public long gridGame(int[][] grid) {\n    int n = grid[0].length;\n    long answer = Long.MAX_VALUE;\n\n    for (int drop = 0; drop < n; drop++) {\n      long top = 0;\n      long bottom = 0;\n      for (int col = drop + 1; col < n; col++) top += grid[0][col];\n      for (int col = 0; col < drop; col++) bottom += grid[1][col];\n      answer = Math.min(answer, Math.max(top, bottom));\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public long gridGame(int[][] grid) {\n    long topRemaining = 0;\n    for (int value : grid[0]) topRemaining += value;\n\n    long bottomCollected = 0;\n    long answer = Long.MAX_VALUE;\n    for (int col = 0; col < grid[0].length; col++) {\n      topRemaining -= grid[0][col];\n      answer = Math.min(answer, Math.max(topRemaining, bottomCollected));\n      bottomCollected += grid[1][col];\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "class Solution {\n  public long gridGame(int[][] grid) {\n    long topRemaining = 0;\n    for (int value : grid[0]) topRemaining += value;\n\n    long bottomCollected = 0;\n    long answer = Long.MAX_VALUE;\n    for (int col = 0; col < grid[0].length; col++) {\n      topRemaining -= grid[0][col];\n      answer = Math.min(answer, Math.max(topRemaining, bottomCollected));\n      bottomCollected += grid[1][col];\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public long gridGame(int[][] grid) {\n    long topTotal = sumTop(grid, 0);\n    return scan(grid, 0, topTotal, 0L, Long.MAX_VALUE);\n  }\n\n  private long sumTop(int[][] grid, int col) {\n    if (col == grid[0].length) return 0L;\n    return grid[0][col] + sumTop(grid, col + 1);\n  }\n\n  private long scan(int[][] grid, int col, long topRemaining, long bottomCollected, long answer) {\n    if (col == grid[0].length) return answer;\n    long nextTop = topRemaining - grid[0][col];\n    long nextAnswer = Math.min(answer, Math.max(nextTop, bottomCollected));\n    long nextBottom = bottomCollected + grid[1][col];\n    return scan(grid, col + 1, nextTop, nextBottom, nextAnswer);\n  }\n}",
      "code": "class Solution {\n  public long gridGame(int[][] grid) {\n    long topRemaining = 0;\n    for (int value : grid[0]) topRemaining += value;\n\n    long bottomCollected = 0;\n    long answer = Long.MAX_VALUE;\n    for (int col = 0; col < grid[0].length; col++) {\n      topRemaining -= grid[0][col];\n      answer = Math.min(answer, Math.max(topRemaining, bottomCollected));\n      bottomCollected += grid[1][col];\n    }\n    return answer;\n  }\n}"
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
