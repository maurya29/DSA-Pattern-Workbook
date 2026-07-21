// Extra revision topics selected from the full DSA pattern workbook.
// These topics cover pattern pages that were not present as standalone revision topics.
(function () {
  Object.assign(REVISION_SOLUTION_TOPICS, {
  "prefix-sum": {
    "id": "prefix-sum",
    "name": "Prefix Sum Revision",
    "summary": "Range sums, prefix hash maps, modulo prefix counts, and difference-array range updates.",
    "checklist": [
      "Question asks many range sums or split sums.",
      "Brute force repeatedly recomputes sums over overlapping ranges.",
      "Subarray sum can be written as prefix[right] - prefix[left].",
      "Range updates can be delayed using a difference array.",
      "Modulo or equality of prefix states identifies valid subarrays."
    ],
    "mistakes": [
      "Forgetting prefix[0] = 0 or initial map entry 0 -\u003e 1.",
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
      "Solve these 5 important Prefix Sum problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Find Pivot Index",
        "difficulty": "Easy",
        "subpattern": "Left/right prefix balance",
        "question": "Given nums, return the leftmost index where the sum of all elements to the left equals the sum of all elements to the right. Return -1 if no such index exists.",
        "trigger": "A split point is valid when left prefix sum equals total sum minus left prefix minus nums[i].",
        "intuition": "Compute total once, then walk left to right while maintaining only the left sum.",
        "edgeCases": "Pivot at index 0, pivot at last index, negative values, no pivot, and multiple valid pivots where the leftmost must be returned.",
        "constraints": "1 \u003c= nums.length \u003c= 10^4; -1000 \u003c= nums[i] \u003c= 1000.",
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
        "bruteForceCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    for (int i = 0; i \u003c nums.length; i++) {\n      int left = 0;\n      int right = 0;\n      for (int j = 0; j \u003c i; j++) {\n        left += nums[j];\n      }\n      for (int j = i + 1; j \u003c nums.length; j++) {\n        right += nums[j];\n      }\n      if (left == right) return i;\n    }\n    return -1;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) {\n      total += num;\n    }\n\n    int left = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
        "optimizedCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) {\n      total += num;\n    }\n\n    int left = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = sum(nums, 0);\n    return find(nums, 0, 0, total);\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int find(int[] nums, int index, int left, int total) {\n    if (index == nums.length) return -1;\n    int right = total - left - nums[index];\n    if (left == right) return index;\n    return find(nums, index + 1, left + nums[index], total);\n  }\n}",
        "code": "class Solution {\n  public int pivotIndex(int[] nums) {\n    int total = 0;\n    for (int num : nums) {\n      total += num;\n    }\n\n    int left = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      int right = total - left - nums[i];\n      if (left == right) return i;\n      left += nums[i];\n    }\n    return -1;\n  }\n}"
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
        "constraints": "1 \u003c= nums.length \u003c= 10^4; -10^5 \u003c= nums[i] \u003c= 10^5; 0 \u003c= left \u003c= right \u003c nums.length; at most 10^4 calls to sumRange.",
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
        "bruteForceCode": "class NumArray {\n  private final int[] nums;\n\n  public NumArray(int[] nums) {\n    this.nums = nums;\n  }\n\n  public int sumRange(int left, int right) {\n    int sum = 0;\n    for (int i = left; i \u003c= right; i++) {\n      sum += nums[i];\n    }\n    return sum;\n  }\n}",
        "iterativeCode": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}",
        "optimizedCode": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}",
        "recursiveCode": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    build(nums, 0);\n  }\n\n  private void build(int[] nums, int index) {\n    if (index == nums.length) return;\n    prefix[index + 1] = prefix[index] + nums[index];\n    build(nums, index + 1);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}",
        "code": "class NumArray {\n  private final int[] prefix;\n\n  public NumArray(int[] nums) {\n    prefix = new int[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) {\n      prefix[i + 1] = prefix[i] + nums[i];\n    }\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix[right + 1] - prefix[left];\n  }\n}"
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
        "constraints": "1 \u003c= nums.length \u003c= 2 * 10^4; -1000 \u003c= nums[i] \u003c= 1000; -10^7 \u003c= k \u003c= 10^7.",
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
        "bruteForceCode": "class Solution {\n  public int subarraySum(int[] nums, int k) {\n    int count = 0;\n    for (int start = 0; start \u003c nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end \u003c nums.length; end++) {\n        sum += nums[end];\n        if (sum == k) count++;\n      }\n    }\n    return count;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map\u003cInteger, Integer\u003e freq = new HashMap\u003c\u003e();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - k, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map\u003cInteger, Integer\u003e freq = new HashMap\u003c\u003e();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - k, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map\u003cInteger, Integer\u003e freq = new HashMap\u003c\u003e();\n    freq.put(0, 1);\n    return scan(nums, k, 0, 0, 0, freq);\n  }\n\n  private int scan(int[] nums, int k, int index, int prefix, int count, Map\u003cInteger, Integer\u003e freq) {\n    if (index == nums.length) return count;\n    int nextPrefix = prefix + nums[index];\n    int nextCount = count + freq.getOrDefault(nextPrefix - k, 0);\n    freq.put(nextPrefix, freq.getOrDefault(nextPrefix, 0) + 1);\n    return scan(nums, k, index + 1, nextPrefix, nextCount, freq);\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map\u003cInteger, Integer\u003e freq = new HashMap\u003c\u003e();\n    freq.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - k, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}"
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
        "constraints": "1 \u003c= nums.length \u003c= 3 * 10^4; -10^4 \u003c= nums[i] \u003c= 10^4; 2 \u003c= k \u003c= 10^4.",
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
        "bruteForceCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int count = 0;\n    for (int start = 0; start \u003c nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end \u003c nums.length; end++) {\n        sum += nums[end];\n        if (sum % k == 0) count++;\n      }\n    }\n    return count;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}",
        "optimizedCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n    return scan(nums, k, 0, 0, 0, freq);\n  }\n\n  private int scan(int[] nums, int k, int index, int prefix, int count, int[] freq) {\n    if (index == nums.length) return count;\n    int nextPrefix = ((prefix + nums[index]) % k + k) % k;\n    int nextCount = count + freq[nextPrefix];\n    freq[nextPrefix]++;\n    return scan(nums, k, index + 1, nextPrefix, nextCount, freq);\n  }\n}",
        "code": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}"
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
        "constraints": "1 \u003c= n \u003c= 2 * 10^4; 1 \u003c= bookings.length \u003c= 2 * 10^4; 1 \u003c= first \u003c= last \u003c= n; 1 \u003c= seats \u003c= 10^4.",
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
        "bruteForceCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] seats = new int[n];\n    for (int[] booking : bookings) {\n      for (int flight = booking[0]; flight \u003c= booking[1]; flight++) {\n        seats[flight - 1] += booking[2];\n      }\n    }\n    return seats;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    for (int[] booking : bookings) {\n      int start = booking[0] - 1;\n      int end = booking[1];\n      int seats = booking[2];\n      diff[start] += seats;\n      diff[end] -= seats;\n    }\n\n    int running = 0;\n    int[] ans = new int[n];\n    for (int i = 0; i \u003c n; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}",
        "optimizedCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    for (int[] booking : bookings) {\n      int start = booking[0] - 1;\n      int end = booking[1];\n      int seats = booking[2];\n      diff[start] += seats;\n      diff[end] -= seats;\n    }\n\n    int running = 0;\n    int[] ans = new int[n];\n    for (int i = 0; i \u003c n; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    apply(bookings, diff, 0);\n    int[] ans = new int[n];\n    build(diff, ans, 0, 0);\n    return ans;\n  }\n\n  private void apply(int[][] bookings, int[] diff, int index) {\n    if (index == bookings.length) return;\n    int start = bookings[index][0] - 1;\n    int end = bookings[index][1];\n    int seats = bookings[index][2];\n    diff[start] += seats;\n    diff[end] -= seats;\n    apply(bookings, diff, index + 1);\n  }\n\n  private void build(int[] diff, int[] ans, int index, int running) {\n    if (index == ans.length) return;\n    int next = running + diff[index];\n    ans[index] = next;\n    build(diff, ans, index + 1, next);\n  }\n}",
        "code": "class Solution {\n  public int[] corpFlightBookings(int[][] bookings, int n) {\n    int[] diff = new int[n + 1];\n    for (int[] booking : bookings) {\n      int start = booking[0] - 1;\n      int end = booking[1];\n      int seats = booking[2];\n      diff[start] += seats;\n      diff[end] -= seats;\n    }\n\n    int running = 0;\n    int[] ans = new int[n];\n    for (int i = 0; i \u003c n; i++) {\n      running += diff[i];\n      ans[i] = running;\n    }\n    return ans;\n  }\n}"
      }
    ]
  },
  "union-find": {
    "id": "union-find",
    "name": "Union Find Revision",
    "summary": "Disjoint-set union patterns for connectivity, cycle checks, component merging, account grouping, and grid components.",
    "checklist": [
      "Use DSU when the problem repeatedly asks whether two items belong to the same component.",
      "Map non-integer keys like emails to ids or parent strings before union operations.",
      "For cycle detection, an edge is redundant when both endpoints already have the same root.",
      "For dynamic grid components, convert row and column into a single id.",
      "Use path compression and union by size/rank to keep operations nearly constant time."
    ],
    "mistakes": [
      "Forgetting to initialize every node before calling find.",
      "Counting components before all required unions are applied.",
      "Unioning duplicate edges without checking whether the roots are already equal.",
      "Using raw email names as owners after union without grouping by final root.",
      "Double-counting the same neighboring island when flipping one zero."
    ],
    "edgeCases": [
      "Single node graph, no edges, duplicate component roots, all land grid, all water grid, one account with one email, and disconnected graph with exactly n - 1 edges."
    ],
    "complexities": [
      "DSU with path compression and union by size/rank is O(alpha(n)) amortized per operation.",
      "Matrix DSU usually uses O(rows * cols) ids and memory.",
      "Graph connectivity with DSU is O(E alpha(V)) time and O(V) space.",
      "Email/account DSU is O(totalEmails alpha(totalEmails) + sorting output)."
    ],
    "mentalModel": [
      "Parent points upward; root represents the component.",
      "Union means two components become one component.",
      "Find answers the current representative after compression.",
      "A redundant edge connects two nodes already sharing a representative.",
      "Component size belongs to the root, not every node."
    ],
    "revisionStrategy": [
      "First solve Redundant Connection and Graph Valid Tree to lock cycle detection.",
      "Then solve Number of Provinces to practice matrix-to-component conversion.",
      "Solve Accounts Merge for string-key DSU mapping.",
      "Finish with Making A Large Island for grid ids and component-size aggregation.",
      "Redo all five by writing the DSU class from memory."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Redundant Connection",
        "difficulty": "Medium",
        "subpattern": "DSU cycle detection in undirected graph",
        "question": "Given edges of an undirected graph that started as a tree with one extra edge, return the edge that can be removed so the graph becomes a tree again.",
        "trigger": "While adding edges, an edge is redundant exactly when its two endpoints are already connected.",
        "intuition": "DSU tracks connected components. If union fails, the current edge closes a cycle and is the answer.",
        "edgeCases": "Cycle appears near the end, nodes are 1-indexed, graph has n edges for n nodes, and the last valid redundant edge must be returned.",
        "constraints": "3 \u003c= edges.length \u003c= 1000; edges[i] = [u, v]; 1 \u003c= u \u003c v \u003c= edges.length.",
        "source": {
          "label": "Redundant Connection - LeetCode 684",
          "url": "https://leetcode.com/problems/redundant-connection/"
        },
        "examples": [
          {
            "input": "edges = [[1,2],[1,3],[2,3]]",
            "output": "[2,3]",
            "explanation": "1, 2, and 3 are already connected before adding [2,3]."
          },
          {
            "input": "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
            "output": "[1,4]",
            "explanation": "[1,4] closes the first cycle."
          }
        ],
        "bruteForceComplexity": "Time O(E * (V + E)), Space O(V + E). Before adding each edge, DFS checks whether the endpoints are already connected.",
        "optimizedComplexity": "Time O(E alpha(V)), Space O(V). DSU detects the cycle while edges are processed once.",
        "recursiveComplexity": "Time O(E alpha(V)), Space O(V) plus recursive find stack. Recursive path compression finds roots.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    int n = edges.length;\n    List\u003cInteger\u003e[] graph = new ArrayList[n + 1];\n    for (int node = 1; node \u003c= n; node++) graph[node] = new ArrayList\u003c\u003e();\n\n    for (int[] edge : edges) {\n      boolean[] seen = new boolean[n + 1];\n      if (hasPath(edge[0], edge[1], graph, seen)) return edge;\n      graph[edge[0]].add(edge[1]);\n      graph[edge[1]].add(edge[0]);\n    }\n    return new int[0];\n  }\n\n  private boolean hasPath(int source, int target, List\u003cInteger\u003e[] graph, boolean[] seen) {\n    Deque\u003cInteger\u003e stack = new ArrayDeque\u003c\u003e();\n    stack.push(source);\n    seen[source] = true;\n    while (!stack.isEmpty()) {\n      int node = stack.pop();\n      if (node == target) return true;\n      for (int next : graph[node]) {\n        if (!seen[next]) {\n          seen[next] = true;\n          stack.push(next);\n        }\n      }\n    }\n    return false;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    DSU dsu = new DSU(edges.length + 1);\n    for (int[] edge : edges) {\n      if (!dsu.union(edge[0], edge[1])) return edge;\n    }\n    return new int[0];\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      int root = node;\n      while (root != parent[root]) root = parent[root];\n      while (node != root) {\n        int next = parent[node];\n        parent[node] = root;\n        node = next;\n      }\n      return root;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}",
        "recursiveCode": "class Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    DSU dsu = new DSU(edges.length + 1);\n    for (int[] edge : edges) {\n      if (!dsu.union(edge[0], edge[1])) return edge;\n    }\n    return new int[0];\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] rank;\n\n    DSU(int n) {\n      parent = new int[n];\n      rank = new int[n];\n      for (int i = 0; i \u003c n; i++) parent[i] = i;\n    }\n\n    int find(int node) {\n      if (parent[node] != node) parent[node] = find(parent[node]);\n      return parent[node];\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (rank[rootA] \u003c rank[rootB]) parent[rootA] = rootB;\n      else if (rank[rootA] \u003e rank[rootB]) parent[rootB] = rootA;\n      else {\n        parent[rootB] = rootA;\n        rank[rootA]++;\n      }\n      return true;\n    }\n  }\n}",
        "optimizedCode": "class Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    DSU dsu = new DSU(edges.length + 1);\n    for (int[] edge : edges) {\n      if (!dsu.union(edge[0], edge[1])) return edge;\n    }\n    return new int[0];\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      int root = node;\n      while (root != parent[root]) root = parent[root];\n      while (node != root) {\n        int next = parent[node];\n        parent[node] = root;\n        node = next;\n      }\n      return root;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}",
        "code": "class Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    DSU dsu = new DSU(edges.length + 1);\n    for (int[] edge : edges) {\n      if (!dsu.union(edge[0], edge[1])) return edge;\n    }\n    return new int[0];\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      int root = node;\n      while (root != parent[root]) root = parent[root];\n      while (node != root) {\n        int next = parent[node];\n        parent[node] = root;\n        node = next;\n      }\n      return root;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}"
      },
      {
        "group": "core",
        "name": "Number of Provinces",
        "difficulty": "Medium",
        "subpattern": "DSU components from adjacency matrix",
        "question": "Given an n x n isConnected matrix where isConnected[i][j] is 1 if city i and city j are directly connected, return the number of provinces.",
        "trigger": "Direct connections merge cities into components, and the final answer is the number of components.",
        "intuition": "Union every directly connected pair. Each successful union reduces the component count by one.",
        "edgeCases": "One city, diagonal entries, fully connected matrix, no connections except self, and symmetric duplicate pairs.",
        "constraints": "1 \u003c= n \u003c= 200; isConnected[i][i] = 1; isConnected[i][j] = isConnected[j][i].",
        "source": {
          "label": "Number of Provinces - LeetCode 547",
          "url": "https://leetcode.com/problems/number-of-provinces/"
        },
        "examples": [
          {
            "input": "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
            "output": "2",
            "explanation": "Cities 0 and 1 form one province; city 2 is separate."
          },
          {
            "input": "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
            "output": "3",
            "explanation": "No two distinct cities are connected."
          }
        ],
        "bruteForceComplexity": "Time O(n^2), Space O(n). DFS/BFS visits cities through the matrix.",
        "optimizedComplexity": "Time O(n^2 alpha(n)), Space O(n). DSU unions each connected pair once.",
        "recursiveComplexity": "Time O(n^2), Space O(n). Recursive DFS marks one province at a time.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findCircleNum(int[][] isConnected) {\n    int n = isConnected.length;\n    boolean[] seen = new boolean[n];\n    int provinces = 0;\n\n    for (int city = 0; city \u003c n; city++) {\n      if (seen[city]) continue;\n      provinces++;\n      Deque\u003cInteger\u003e stack = new ArrayDeque\u003c\u003e();\n      stack.push(city);\n      seen[city] = true;\n      while (!stack.isEmpty()) {\n        int current = stack.pop();\n        for (int next = 0; next \u003c n; next++) {\n          if (isConnected[current][next] == 1 \u0026\u0026 !seen[next]) {\n            seen[next] = true;\n            stack.push(next);\n          }\n        }\n      }\n    }\n    return provinces;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int findCircleNum(int[][] isConnected) {\n    int n = isConnected.length;\n    DSU dsu = new DSU(n);\n    int provinces = n;\n\n    for (int i = 0; i \u003c n; i++) {\n      for (int j = i + 1; j \u003c n; j++) {\n        if (isConnected[i][j] == 1 \u0026\u0026 dsu.union(i, j)) provinces--;\n      }\n    }\n    return provinces;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}",
        "recursiveCode": "class Solution {\n  public int findCircleNum(int[][] isConnected) {\n    boolean[] seen = new boolean[isConnected.length];\n    int provinces = 0;\n    for (int city = 0; city \u003c isConnected.length; city++) {\n      if (!seen[city]) {\n        provinces++;\n        dfs(city, isConnected, seen);\n      }\n    }\n    return provinces;\n  }\n\n  private void dfs(int city, int[][] isConnected, boolean[] seen) {\n    seen[city] = true;\n    for (int next = 0; next \u003c isConnected.length; next++) {\n      if (isConnected[city][next] == 1 \u0026\u0026 !seen[next]) dfs(next, isConnected, seen);\n    }\n  }\n}",
        "optimizedCode": "class Solution {\n  public int findCircleNum(int[][] isConnected) {\n    int n = isConnected.length;\n    DSU dsu = new DSU(n);\n    int provinces = n;\n\n    for (int i = 0; i \u003c n; i++) {\n      for (int j = i + 1; j \u003c n; j++) {\n        if (isConnected[i][j] == 1 \u0026\u0026 dsu.union(i, j)) provinces--;\n      }\n    }\n    return provinces;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}",
        "code": "class Solution {\n  public int findCircleNum(int[][] isConnected) {\n    int n = isConnected.length;\n    DSU dsu = new DSU(n);\n    int provinces = n;\n\n    for (int i = 0; i \u003c n; i++) {\n      for (int j = i + 1; j \u003c n; j++) {\n        if (isConnected[i][j] == 1 \u0026\u0026 dsu.union(i, j)) provinces--;\n      }\n    }\n    return provinces;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}"
      },
      {
        "group": "core",
        "name": "Graph Valid Tree",
        "difficulty": "Medium",
        "subpattern": "DSU tree validation",
        "question": "Given n nodes labeled 0 to n - 1 and undirected edges, return true if the edges form one valid tree.",
        "trigger": "A valid tree must have exactly n - 1 edges and no cycle while all nodes become connected.",
        "intuition": "If the edge count is wrong, it cannot be a tree. Otherwise, each union must connect two different components.",
        "edgeCases": "n = 1 with no edges, too many edges, too few edges, disconnected graph, and cycle with n - 1 edges impossible but still guarded by union.",
        "constraints": "1 \u003c= n \u003c= 2000; edges are undirected pairs [a, b].",
        "source": {
          "label": "Graph Valid Tree - LeetCode 261",
          "url": "https://leetcode.com/problems/graph-valid-tree/"
        },
        "examples": [
          {
            "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
            "output": "true",
            "explanation": "All nodes are connected and there is no cycle."
          },
          {
            "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
            "output": "false",
            "explanation": "The edge [1,3] creates a cycle."
          }
        ],
        "bruteForceComplexity": "Time O(V + E), Space O(V + E). Build graph and check edge count plus connectivity.",
        "optimizedComplexity": "Time O(E alpha(V)), Space O(V). DSU rejects cycles and edge count rejects disconnected graphs.",
        "recursiveComplexity": "Time O(V + E), Space O(V + E). Recursive DFS checks connectivity after the edge-count test.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    List\u003cInteger\u003e[] graph = new ArrayList[n];\n    for (int node = 0; node \u003c n; node++) graph[node] = new ArrayList\u003c\u003e();\n    for (int[] edge : edges) {\n      graph[edge[0]].add(edge[1]);\n      graph[edge[1]].add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque\u003cInteger\u003e stack = new ArrayDeque\u003c\u003e();\n    stack.push(0);\n    seen[0] = true;\n    int visited = 0;\n    while (!stack.isEmpty()) {\n      int node = stack.pop();\n      visited++;\n      for (int next : graph[node]) {\n        if (!seen[next]) {\n          seen[next] = true;\n          stack.push(next);\n        }\n      }\n    }\n    return visited == n;\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    DSU dsu = new DSU(n);\n    for (int[] edge : edges) {\n      if (!dsu.union(edge[0], edge[1])) return false;\n    }\n    return true;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    List\u003cInteger\u003e[] graph = new ArrayList[n];\n    for (int node = 0; node \u003c n; node++) graph[node] = new ArrayList\u003c\u003e();\n    for (int[] edge : edges) {\n      graph[edge[0]].add(edge[1]);\n      graph[edge[1]].add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    dfs(0, graph, seen);\n    for (boolean visited : seen) if (!visited) return false;\n    return true;\n  }\n\n  private void dfs(int node, List\u003cInteger\u003e[] graph, boolean[] seen) {\n    seen[node] = true;\n    for (int next : graph[node]) {\n      if (!seen[next]) dfs(next, graph, seen);\n    }\n  }\n}",
        "optimizedCode": "class Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    DSU dsu = new DSU(n);\n    for (int[] edge : edges) {\n      if (!dsu.union(edge[0], edge[1])) return false;\n    }\n    return true;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}",
        "code": "class Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    DSU dsu = new DSU(n);\n    for (int[] edge : edges) {\n      if (!dsu.union(edge[0], edge[1])) return false;\n    }\n    return true;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] size;\n\n    DSU(int n) {\n      parent = new int[n];\n      size = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        size[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    boolean union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return false;\n      if (size[rootA] \u003c size[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      size[rootA] += size[rootB];\n      return true;\n    }\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Accounts Merge",
        "difficulty": "Medium",
        "subpattern": "DSU grouping by shared email",
        "question": "Given accounts where accounts[i][0] is a name and the rest are emails, merge accounts that share at least one email and return each person with sorted emails.",
        "trigger": "Emails are nodes, and any emails inside the same account belong to the same connected component.",
        "intuition": "Union all emails in an account. After all unions, group emails by root and sort each group.",
        "edgeCases": "One-email account, duplicate email in an account, same name but no shared email, shared email across many accounts, and output email sorting.",
        "constraints": "1 \u003c= accounts.length \u003c= 1000; each account has one name and at least one email.",
        "source": {
          "label": "Accounts Merge - LeetCode 721",
          "url": "https://leetcode.com/problems/accounts-merge/"
        },
        "examples": [
          {
            "input": "accounts = [[\"John\",\"a@mail.com\",\"b@mail.com\"],[\"John\",\"b@mail.com\",\"c@mail.com\"],[\"Mary\",\"m@mail.com\"]]",
            "output": "[[\"John\",\"a@mail.com\",\"b@mail.com\",\"c@mail.com\"],[\"Mary\",\"m@mail.com\"]]",
            "explanation": "John accounts share b@mail.com."
          },
          {
            "input": "accounts = [[\"Alex\",\"x@mail.com\"],[\"Alex\",\"y@mail.com\"]]",
            "output": "two separate Alex accounts",
            "explanation": "Same name alone does not merge accounts."
          }
        ],
        "bruteForceComplexity": "Time O(totalEmails + edges + output sorting), Space O(totalEmails + edges). Build an email graph and traverse components.",
        "optimizedComplexity": "Time O(totalEmails alpha(totalEmails) + output sorting), Space O(totalEmails). DSU groups emails by representative.",
        "recursiveComplexity": "Time O(totalEmails + edges + output sorting), Space O(totalEmails + edges). Recursive DFS traverses the email graph.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString\u003e\u003e accountsMerge(List\u003cList\u003cString\u003e\u003e accounts) {\n    Map\u003cString, String\u003e owner = new HashMap\u003c\u003e();\n    Map\u003cString, List\u003cString\u003e\u003e graph = new HashMap\u003c\u003e();\n\n    for (List\u003cString\u003e account : accounts) {\n      String name = account.get(0);\n      String firstEmail = account.get(1);\n      graph.computeIfAbsent(firstEmail, key -\u003e new ArrayList\u003c\u003e());\n      owner.put(firstEmail, name);\n      for (int i = 2; i \u003c account.size(); i++) {\n        String email = account.get(i);\n        owner.put(email, name);\n        graph.computeIfAbsent(email, key -\u003e new ArrayList\u003c\u003e());\n        graph.get(firstEmail).add(email);\n        graph.get(email).add(firstEmail);\n      }\n    }\n\n    Set\u003cString\u003e seen = new HashSet\u003c\u003e();\n    List\u003cList\u003cString\u003e\u003e answer = new ArrayList\u003c\u003e();\n    for (String email : graph.keySet()) {\n      if (!seen.add(email)) continue;\n      List\u003cString\u003e merged = new ArrayList\u003c\u003e();\n      Deque\u003cString\u003e stack = new ArrayDeque\u003c\u003e();\n      stack.push(email);\n      while (!stack.isEmpty()) {\n        String current = stack.pop();\n        merged.add(current);\n        for (String next : graph.get(current)) {\n          if (seen.add(next)) stack.push(next);\n        }\n      }\n      Collections.sort(merged);\n      merged.add(0, owner.get(email));\n      answer.add(merged);\n    }\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString\u003e\u003e accountsMerge(List\u003cList\u003cString\u003e\u003e accounts) {\n    Map\u003cString, String\u003e parent = new HashMap\u003c\u003e();\n    Map\u003cString, String\u003e owner = new HashMap\u003c\u003e();\n\n    for (List\u003cString\u003e account : accounts) {\n      String name = account.get(0);\n      String firstEmail = account.get(1);\n      parent.putIfAbsent(firstEmail, firstEmail);\n      owner.put(firstEmail, name);\n      for (int i = 2; i \u003c account.size(); i++) {\n        String email = account.get(i);\n        parent.putIfAbsent(email, email);\n        owner.put(email, name);\n        union(firstEmail, email, parent);\n      }\n    }\n\n    Map\u003cString, TreeSet\u003cString\u003e\u003e groups = new HashMap\u003c\u003e();\n    for (String email : parent.keySet()) {\n      String root = find(email, parent);\n      groups.computeIfAbsent(root, key -\u003e new TreeSet\u003c\u003e()).add(email);\n    }\n\n    List\u003cList\u003cString\u003e\u003e answer = new ArrayList\u003c\u003e();\n    for (Map.Entry\u003cString, TreeSet\u003cString\u003e\u003e entry : groups.entrySet()) {\n      List\u003cString\u003e merged = new ArrayList\u003c\u003e();\n      merged.add(owner.get(entry.getKey()));\n      merged.addAll(entry.getValue());\n      answer.add(merged);\n    }\n    return answer;\n  }\n\n  private String find(String email, Map\u003cString, String\u003e parent) {\n    String root = email;\n    while (!root.equals(parent.get(root))) root = parent.get(root);\n    while (!email.equals(root)) {\n      String next = parent.get(email);\n      parent.put(email, root);\n      email = next;\n    }\n    return root;\n  }\n\n  private void union(String a, String b, Map\u003cString, String\u003e parent) {\n    String rootA = find(a, parent);\n    String rootB = find(b, parent);\n    if (!rootA.equals(rootB)) parent.put(rootB, rootA);\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString\u003e\u003e accountsMerge(List\u003cList\u003cString\u003e\u003e accounts) {\n    Map\u003cString, String\u003e owner = new HashMap\u003c\u003e();\n    Map\u003cString, List\u003cString\u003e\u003e graph = new HashMap\u003c\u003e();\n\n    for (List\u003cString\u003e account : accounts) {\n      String name = account.get(0);\n      String firstEmail = account.get(1);\n      graph.computeIfAbsent(firstEmail, key -\u003e new ArrayList\u003c\u003e());\n      owner.put(firstEmail, name);\n      for (int i = 2; i \u003c account.size(); i++) {\n        String email = account.get(i);\n        owner.put(email, name);\n        graph.computeIfAbsent(email, key -\u003e new ArrayList\u003c\u003e());\n        graph.get(firstEmail).add(email);\n        graph.get(email).add(firstEmail);\n      }\n    }\n\n    Set\u003cString\u003e seen = new HashSet\u003c\u003e();\n    List\u003cList\u003cString\u003e\u003e answer = new ArrayList\u003c\u003e();\n    for (String email : graph.keySet()) {\n      if (seen.contains(email)) continue;\n      List\u003cString\u003e merged = new ArrayList\u003c\u003e();\n      dfs(email, graph, seen, merged);\n      Collections.sort(merged);\n      merged.add(0, owner.get(email));\n      answer.add(merged);\n    }\n    return answer;\n  }\n\n  private void dfs(String email, Map\u003cString, List\u003cString\u003e\u003e graph, Set\u003cString\u003e seen, List\u003cString\u003e merged) {\n    seen.add(email);\n    merged.add(email);\n    for (String next : graph.get(email)) {\n      if (!seen.contains(next)) dfs(next, graph, seen, merged);\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString\u003e\u003e accountsMerge(List\u003cList\u003cString\u003e\u003e accounts) {\n    Map\u003cString, String\u003e parent = new HashMap\u003c\u003e();\n    Map\u003cString, String\u003e owner = new HashMap\u003c\u003e();\n\n    for (List\u003cString\u003e account : accounts) {\n      String name = account.get(0);\n      String firstEmail = account.get(1);\n      parent.putIfAbsent(firstEmail, firstEmail);\n      owner.put(firstEmail, name);\n      for (int i = 2; i \u003c account.size(); i++) {\n        String email = account.get(i);\n        parent.putIfAbsent(email, email);\n        owner.put(email, name);\n        union(firstEmail, email, parent);\n      }\n    }\n\n    Map\u003cString, TreeSet\u003cString\u003e\u003e groups = new HashMap\u003c\u003e();\n    for (String email : parent.keySet()) {\n      String root = find(email, parent);\n      groups.computeIfAbsent(root, key -\u003e new TreeSet\u003c\u003e()).add(email);\n    }\n\n    List\u003cList\u003cString\u003e\u003e answer = new ArrayList\u003c\u003e();\n    for (Map.Entry\u003cString, TreeSet\u003cString\u003e\u003e entry : groups.entrySet()) {\n      List\u003cString\u003e merged = new ArrayList\u003c\u003e();\n      merged.add(owner.get(entry.getKey()));\n      merged.addAll(entry.getValue());\n      answer.add(merged);\n    }\n    return answer;\n  }\n\n  private String find(String email, Map\u003cString, String\u003e parent) {\n    String root = email;\n    while (!root.equals(parent.get(root))) root = parent.get(root);\n    while (!email.equals(root)) {\n      String next = parent.get(email);\n      parent.put(email, root);\n      email = next;\n    }\n    return root;\n  }\n\n  private void union(String a, String b, Map\u003cString, String\u003e parent) {\n    String rootA = find(a, parent);\n    String rootB = find(b, parent);\n    if (!rootA.equals(rootB)) parent.put(rootB, rootA);\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString\u003e\u003e accountsMerge(List\u003cList\u003cString\u003e\u003e accounts) {\n    Map\u003cString, String\u003e parent = new HashMap\u003c\u003e();\n    Map\u003cString, String\u003e owner = new HashMap\u003c\u003e();\n\n    for (List\u003cString\u003e account : accounts) {\n      String name = account.get(0);\n      String firstEmail = account.get(1);\n      parent.putIfAbsent(firstEmail, firstEmail);\n      owner.put(firstEmail, name);\n      for (int i = 2; i \u003c account.size(); i++) {\n        String email = account.get(i);\n        parent.putIfAbsent(email, email);\n        owner.put(email, name);\n        union(firstEmail, email, parent);\n      }\n    }\n\n    Map\u003cString, TreeSet\u003cString\u003e\u003e groups = new HashMap\u003c\u003e();\n    for (String email : parent.keySet()) {\n      String root = find(email, parent);\n      groups.computeIfAbsent(root, key -\u003e new TreeSet\u003c\u003e()).add(email);\n    }\n\n    List\u003cList\u003cString\u003e\u003e answer = new ArrayList\u003c\u003e();\n    for (Map.Entry\u003cString, TreeSet\u003cString\u003e\u003e entry : groups.entrySet()) {\n      List\u003cString\u003e merged = new ArrayList\u003c\u003e();\n      merged.add(owner.get(entry.getKey()));\n      merged.addAll(entry.getValue());\n      answer.add(merged);\n    }\n    return answer;\n  }\n\n  private String find(String email, Map\u003cString, String\u003e parent) {\n    String root = email;\n    while (!root.equals(parent.get(root))) root = parent.get(root);\n    while (!email.equals(root)) {\n      String next = parent.get(email);\n      parent.put(email, root);\n      email = next;\n    }\n    return root;\n  }\n\n  private void union(String a, String b, Map\u003cString, String\u003e parent) {\n    String rootA = find(a, parent);\n    String rootB = find(b, parent);\n    if (!rootA.equals(rootB)) parent.put(rootB, rootA);\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Making A Large Island",
        "difficulty": "Hard",
        "subpattern": "Grid DSU component size aggregation",
        "question": "Given an n x n binary grid, change at most one 0 to 1 and return the size of the largest island possible.",
        "trigger": "Each land cell belongs to a component, and flipping one zero connects the unique neighboring components around it.",
        "intuition": "Precompute component sizes. For every zero, sum sizes of distinct adjacent components plus the flipped cell.",
        "edgeCases": "All land, all water, one cell, zero touching the same island on multiple sides, and diagonal cells not connected.",
        "constraints": "1 \u003c= n \u003c= 500; grid[i][j] is 0 or 1.",
        "source": {
          "label": "Making A Large Island - LeetCode 827",
          "url": "https://leetcode.com/problems/making-a-large-island/"
        },
        "examples": [
          {
            "input": "grid = [[1,0],[0,1]]",
            "output": "3",
            "explanation": "Flip either zero to connect two diagonal-separated islands through that cell."
          },
          {
            "input": "grid = [[1,1],[1,0]]",
            "output": "4",
            "explanation": "Flip the only zero."
          },
          {
            "input": "grid = [[1,1],[1,1]]",
            "output": "4",
            "explanation": "No flip is needed."
          }
        ],
        "bruteForceComplexity": "Time O(n^4), Space O(n^2). Try every zero as land and flood-fill the island size.",
        "optimizedComplexity": "Time O(n^2 alpha(n^2)), Space O(n^2). DSU stores every land component size.",
        "recursiveComplexity": "Time O(n^2), Space O(n^2). Recursive DFS paints each island with an id and records its size.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int largestIsland(int[][] grid) {\n    int n = grid.length;\n    boolean hasZero = false;\n    int best = 0;\n\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 0) {\n          hasZero = true;\n          grid[r][c] = 1;\n          best = Math.max(best, area(grid, r, c, new boolean[n][n]));\n          grid[r][c] = 0;\n        }\n      }\n    }\n    return hasZero ? best : n * n;\n  }\n\n  private int area(int[][] grid, int row, int col, boolean[][] seen) {\n    int n = grid.length;\n    int count = 0;\n    Deque\u003cint[]\u003e stack = new ArrayDeque\u003c\u003e();\n    stack.push(new int[] {row, col});\n    seen[row][col] = true;\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      count++;\n      for (int[] dir : dirs) {\n        int nr = cell[0] + dir[0];\n        int nc = cell[1] + dir[1];\n        if (nr \u003c 0 || nc \u003c 0 || nr \u003e= n || nc \u003e= n || seen[nr][nc] || grid[nr][nc] == 0) continue;\n        seen[nr][nc] = true;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n    return count;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int largestIsland(int[][] grid) {\n    int n = grid.length;\n    DSU dsu = new DSU(n * n);\n\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 0) continue;\n        int id = r * n + c;\n        if (r + 1 \u003c n \u0026\u0026 grid[r + 1][c] == 1) dsu.union(id, (r + 1) * n + c);\n        if (c + 1 \u003c n \u0026\u0026 grid[r][c + 1] == 1) dsu.union(id, r * n + c + 1);\n      }\n    }\n\n    int best = 0;\n    boolean hasZero = false;\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 1) {\n          best = Math.max(best, dsu.size(r * n + c));\n          continue;\n        }\n        hasZero = true;\n        Set\u003cInteger\u003e roots = new HashSet\u003c\u003e();\n        int area = 1;\n        for (int[] dir : dirs) {\n          int nr = r + dir[0];\n          int nc = c + dir[1];\n          if (nr \u003c 0 || nc \u003c 0 || nr \u003e= n || nc \u003e= n || grid[nr][nc] == 0) continue;\n          int root = dsu.find(nr * n + nc);\n          if (roots.add(root)) area += dsu.componentSize[root];\n        }\n        best = Math.max(best, area);\n      }\n    }\n    return hasZero ? best : n * n;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] componentSize;\n\n    DSU(int n) {\n      parent = new int[n];\n      componentSize = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        componentSize[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    void union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return;\n      if (componentSize[rootA] \u003c componentSize[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      componentSize[rootA] += componentSize[rootB];\n    }\n\n    int size(int node) {\n      return componentSize[find(node)];\n    }\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int largestIsland(int[][] grid) {\n    int n = grid.length;\n    Map\u003cInteger, Integer\u003e sizeById = new HashMap\u003c\u003e();\n    int id = 2;\n\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 1) {\n          sizeById.put(id, paint(grid, r, c, id));\n          id++;\n        }\n      }\n    }\n\n    int best = sizeById.values().stream().max(Integer::compareTo).orElse(0);\n    boolean hasZero = false;\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] != 0) continue;\n        hasZero = true;\n        Set\u003cInteger\u003e seen = new HashSet\u003c\u003e();\n        int area = 1;\n        for (int[] dir : dirs) {\n          int nr = r + dir[0];\n          int nc = c + dir[1];\n          if (nr \u003c 0 || nc \u003c 0 || nr \u003e= n || nc \u003e= n) continue;\n          int islandId = grid[nr][nc];\n          if (islandId \u003e 1 \u0026\u0026 seen.add(islandId)) area += sizeById.get(islandId);\n        }\n        best = Math.max(best, area);\n      }\n    }\n    return hasZero ? best : n * n;\n  }\n\n  private int paint(int[][] grid, int row, int col, int id) {\n    int n = grid.length;\n    if (row \u003c 0 || col \u003c 0 || row \u003e= n || col \u003e= n || grid[row][col] != 1) return 0;\n    grid[row][col] = id;\n    int area = 1;\n    for (int[] dir : dirs) area += paint(grid, row + dir[0], col + dir[1], id);\n    return area;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int largestIsland(int[][] grid) {\n    int n = grid.length;\n    DSU dsu = new DSU(n * n);\n\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 0) continue;\n        int id = r * n + c;\n        if (r + 1 \u003c n \u0026\u0026 grid[r + 1][c] == 1) dsu.union(id, (r + 1) * n + c);\n        if (c + 1 \u003c n \u0026\u0026 grid[r][c + 1] == 1) dsu.union(id, r * n + c + 1);\n      }\n    }\n\n    int best = 0;\n    boolean hasZero = false;\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 1) {\n          best = Math.max(best, dsu.size(r * n + c));\n          continue;\n        }\n        hasZero = true;\n        Set\u003cInteger\u003e roots = new HashSet\u003c\u003e();\n        int area = 1;\n        for (int[] dir : dirs) {\n          int nr = r + dir[0];\n          int nc = c + dir[1];\n          if (nr \u003c 0 || nc \u003c 0 || nr \u003e= n || nc \u003e= n || grid[nr][nc] == 0) continue;\n          int root = dsu.find(nr * n + nc);\n          if (roots.add(root)) area += dsu.componentSize[root];\n        }\n        best = Math.max(best, area);\n      }\n    }\n    return hasZero ? best : n * n;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] componentSize;\n\n    DSU(int n) {\n      parent = new int[n];\n      componentSize = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        componentSize[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    void union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return;\n      if (componentSize[rootA] \u003c componentSize[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      componentSize[rootA] += componentSize[rootB];\n    }\n\n    int size(int node) {\n      return componentSize[find(node)];\n    }\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int largestIsland(int[][] grid) {\n    int n = grid.length;\n    DSU dsu = new DSU(n * n);\n\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 0) continue;\n        int id = r * n + c;\n        if (r + 1 \u003c n \u0026\u0026 grid[r + 1][c] == 1) dsu.union(id, (r + 1) * n + c);\n        if (c + 1 \u003c n \u0026\u0026 grid[r][c + 1] == 1) dsu.union(id, r * n + c + 1);\n      }\n    }\n\n    int best = 0;\n    boolean hasZero = false;\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (grid[r][c] == 1) {\n          best = Math.max(best, dsu.size(r * n + c));\n          continue;\n        }\n        hasZero = true;\n        Set\u003cInteger\u003e roots = new HashSet\u003c\u003e();\n        int area = 1;\n        for (int[] dir : dirs) {\n          int nr = r + dir[0];\n          int nc = c + dir[1];\n          if (nr \u003c 0 || nc \u003c 0 || nr \u003e= n || nc \u003e= n || grid[nr][nc] == 0) continue;\n          int root = dsu.find(nr * n + nc);\n          if (roots.add(root)) area += dsu.componentSize[root];\n        }\n        best = Math.max(best, area);\n      }\n    }\n    return hasZero ? best : n * n;\n  }\n\n  private static class DSU {\n    private final int[] parent;\n    private final int[] componentSize;\n\n    DSU(int n) {\n      parent = new int[n];\n      componentSize = new int[n];\n      for (int i = 0; i \u003c n; i++) {\n        parent[i] = i;\n        componentSize[i] = 1;\n      }\n    }\n\n    int find(int node) {\n      while (node != parent[node]) {\n        parent[node] = parent[parent[node]];\n        node = parent[node];\n      }\n      return node;\n    }\n\n    void union(int a, int b) {\n      int rootA = find(a);\n      int rootB = find(b);\n      if (rootA == rootB) return;\n      if (componentSize[rootA] \u003c componentSize[rootB]) {\n        int temp = rootA;\n        rootA = rootB;\n        rootB = temp;\n      }\n      parent[rootB] = rootA;\n      componentSize[rootA] += componentSize[rootB];\n    }\n\n    int size(int node) {\n      return componentSize[find(node)];\n    }\n  }\n}"
      }
    ]
  },
  "intervals": {
    "id": "intervals",
    "name": "Intervals Revision",
    "summary": "Merge, insert, erase-overlap, meeting-room, and arrow-burst interval problems.",
    "checklist": [
      "The input contains ranges with start/end boundaries, times, days, coordinates, or coverage spans.",
      "The question asks to merge, insert, count overlap, detect conflict, find gaps, or answer which interval covers a point.",
      "Sorting by start or end makes only adjacent/current active intervals relevant.",
      "Endpoint changes can be represented as +1/-1 deltas for sweep-line counting.",
      "Dynamic operations need a sorted map of disjoint intervals or active end times."
    ],
    "mistakes": [
      "Mixing inclusive [l, r] and half-open [l, r) semantics.",
      "Treating touching endpoints as overlap when the problem says meetings can touch.",
      "Sorting by start when the greedy proof needs earliest end.",
      "Forgetting to merge intervals that touch in inclusive integer-union problems.",
      "Removing from a TreeMap while iterating over its live key set incorrectly.",
      "Using int subtraction in comparators when endpoints can be large.",
      "Counting gaps or free time before merging all busy intervals."
    ],
    "edgeCases": [
      "Empty interval list where the problem allows it.",
      "Single interval or single booking.",
      "Nested intervals and duplicate intervals.",
      "Intervals with the same start or the same end.",
      "Boundary-touching intervals such as [1,2] and [2,3].",
      "Queries exactly equal to interval start or end.",
      "Very large coordinates that require TreeMap or sorting instead of arrays."
    ],
    "complexities": [
      "Sort-and-merge interval problems are usually O(n log n) time and O(n) output space.",
      "Two sorted interval lists can often be solved in O(m + n) with two pointers.",
      "Sweep-line endpoint maps cost O(n log n) time and O(n) space.",
      "Meeting-room and event problems commonly use a heap for O(n log n) time and O(n) active space.",
      "Dynamic interval structures use TreeMap operations, often O(k log n) for k merged/removed intervals.",
      "Small-coordinate brute force can mark arrays directly; large-coordinate inputs need compression or ordered maps.",
      "Recursive tabs usually mirror scan logic and add O(n) call-stack space."
    ],
    "mentalModel": [
      "Decide first whether endpoints are inclusive or half-open.",
      "Sort by the boundary that makes the next decision local: start for merging, end for non-overlap greedy.",
      "Track the active state: current merged interval, active overlap count, heap of end times, or TreeMap of disjoint ranges.",
      "For query problems, sort queries offline when their order is not part of the answer logic.",
      "Convert repeated overlap checks into endpoint events or neighboring interval checks."
    ],
    "revisionStrategy": [
      "Solve these 5 important Intervals problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Merge Intervals",
        "difficulty": "Medium",
        "subpattern": "Sorted merge intervals",
        "question": "Given an array of intervals, merge all overlapping intervals and return the non-overlapping intervals that cover the same ranges.",
        "trigger": "After sorting by start, only the last merged interval can overlap the current interval.",
        "intuition": "Keep one active merged interval; extend its end on overlap, otherwise emit a new interval.",
        "edgeCases": "One interval, touching endpoints, nested intervals, unsorted input, all intervals overlapping.",
        "constraints": "1 \u003c= intervals.length \u003c= 10000; intervals[i].length == 2; 0 \u003c= start \u003c= end \u003c= 10000.",
        "source": {
          "label": "Merge Intervals - LeetCode 56",
          "url": "https://leetcode.com/problems/merge-intervals/"
        },
        "examples": [
          {
            "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            "output": "[[1,6],[8,10],[15,18]]",
            "explanation": "[1,3] and [2,6] overlap."
          },
          {
            "input": "intervals = [[1,4],[4,5]]",
            "output": "[[1,5]]",
            "explanation": "Touching endpoints merge in this problem."
          },
          {
            "input": "intervals = [[1,4],[0,2],[3,5]]",
            "output": "[[0,5]]",
            "explanation": "All intervals connect after sorting."
          }
        ],
        "bruteForceComplexity": "Time O(n^3); Space O(n). Repeatedly search for any overlapping pair and merge it.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Sorting dominates; the merge scan is linear.",
        "recursiveComplexity": "Time O(n log n); Space O(n). Recursion scans sorted intervals and maintains the merged list.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    List\u003cint[]\u003e list = new ArrayList\u003c\u003e();\n    for (int[] interval : intervals) list.add(interval.clone());\n    boolean changed = true;\n\n    while (changed) {\n      changed = false;\n      outer:\n      for (int i = 0; i \u003c list.size(); i++) {\n        for (int j = i + 1; j \u003c list.size(); j++) {\n          int[] a = list.get(i);\n          int[] b = list.get(j);\n          if (a[0] \u003c= b[1] \u0026\u0026 b[0] \u003c= a[1]) {\n            list.set(i, new int[] {Math.min(a[0], b[0]), Math.max(a[1], b[1])});\n            list.remove(j);\n            changed = true;\n            break outer;\n          }\n        }\n      }\n    }\n    return list.toArray(new int[list.size()][]);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    List\u003cint[]\u003e merged = new ArrayList\u003c\u003e();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    List\u003cint[]\u003e merged = new ArrayList\u003c\u003e();\n    scan(intervals, 0, merged);\n    return merged.toArray(new int[merged.size()][]);\n  }\n\n  private void scan(int[][] intervals, int index, List\u003cint[]\u003e merged) {\n    if (index == intervals.length) return;\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c intervals[index][0]) {\n      merged.add(intervals[index].clone());\n    } else {\n      int[] last = merged.get(merged.size() - 1);\n      last[1] = Math.max(last[1], intervals[index][1]);\n    }\n    scan(intervals, index + 1, merged);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    List\u003cint[]\u003e merged = new ArrayList\u003c\u003e();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    List\u003cint[]\u003e merged = new ArrayList\u003c\u003e();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Insert Interval",
        "difficulty": "Medium",
        "subpattern": "Insert and merge interval",
        "question": "Given non-overlapping intervals sorted by start and a new interval, insert the new interval and merge if necessary.",
        "trigger": "Sorted non-overlapping input lets you copy intervals before, merge the overlapping middle, then copy intervals after.",
        "intuition": "Move in three phases: before new interval, overlapping with new interval, and after new interval.",
        "edgeCases": "Empty interval list, insert before all, insert after all, new interval covers many intervals, touching endpoints.",
        "constraints": "0 \u003c= intervals.length \u003c= 10000; intervals are sorted by start and non-overlapping; 0 \u003c= start \u003c= end \u003c= 100000.",
        "source": {
          "label": "Insert Interval - LeetCode 57",
          "url": "https://leetcode.com/problems/insert-interval/"
        },
        "examples": [
          {
            "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
            "output": "[[1,5],[6,9]]",
            "explanation": "The new interval overlaps [1,3]."
          },
          {
            "input": "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
            "output": "[[1,2],[3,10],[12,16]]",
            "explanation": "The new interval bridges three intervals."
          },
          {
            "input": "intervals = [], newInterval = [5,7]",
            "output": "[[5,7]]",
            "explanation": "The new interval is the only result."
          }
        ],
        "bruteForceComplexity": "Time O(n log n); Space O(n). Append the new interval, sort everything, then run merge intervals.",
        "optimizedComplexity": "Time O(n); Space O(n). Sorted input allows one linear pass without re-sorting.",
        "recursiveComplexity": "Time O(n); Space O(n). Recursive scan handles before, merge, and after phases.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    int[][] all = new int[intervals.length + 1][2];\n    for (int i = 0; i \u003c intervals.length; i++) all[i] = intervals[i].clone();\n    all[intervals.length] = newInterval.clone();\n    Arrays.sort(all, (a, b) -\u003e Integer.compare(a[0], b[0]));\n\n    List\u003cint[]\u003e merged = new ArrayList\u003c\u003e();\n    for (int[] interval : all) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c interval[0]) merged.add(interval.clone());\n      else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List\u003cint[]\u003e result = new ArrayList\u003c\u003e();\n    int i = 0;\n\n    while (i \u003c intervals.length \u0026\u0026 intervals[i][1] \u003c newInterval[0]) {\n      result.add(intervals[i++].clone());\n    }\n    while (i \u003c intervals.length \u0026\u0026 intervals[i][0] \u003c= newInterval[1]) {\n      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n      i++;\n    }\n    result.add(newInterval.clone());\n    while (i \u003c intervals.length) result.add(intervals[i++].clone());\n    return result.toArray(new int[result.size()][]);\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List\u003cint[]\u003e result = new ArrayList\u003c\u003e();\n    add(intervals, 0, newInterval.clone(), false, result);\n    return result.toArray(new int[result.size()][]);\n  }\n\n  private void add(int[][] intervals, int index, int[] current, boolean placed, List\u003cint[]\u003e result) {\n    if (index == intervals.length) {\n      if (!placed) result.add(current.clone());\n      return;\n    }\n    int[] interval = intervals[index];\n    if (placed || interval[1] \u003c current[0]) {\n      result.add(interval.clone());\n      add(intervals, index + 1, current, placed, result);\n    } else if (current[1] \u003c interval[0]) {\n      result.add(current.clone());\n      result.add(interval.clone());\n      add(intervals, index + 1, current, true, result);\n    } else {\n      current[0] = Math.min(current[0], interval[0]);\n      current[1] = Math.max(current[1], interval[1]);\n      add(intervals, index + 1, current, false, result);\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List\u003cint[]\u003e result = new ArrayList\u003c\u003e();\n    int i = 0;\n\n    while (i \u003c intervals.length \u0026\u0026 intervals[i][1] \u003c newInterval[0]) {\n      result.add(intervals[i++].clone());\n    }\n    while (i \u003c intervals.length \u0026\u0026 intervals[i][0] \u003c= newInterval[1]) {\n      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n      i++;\n    }\n    result.add(newInterval.clone());\n    while (i \u003c intervals.length) result.add(intervals[i++].clone());\n    return result.toArray(new int[result.size()][]);\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List\u003cint[]\u003e result = new ArrayList\u003c\u003e();\n    int i = 0;\n\n    while (i \u003c intervals.length \u0026\u0026 intervals[i][1] \u003c newInterval[0]) {\n      result.add(intervals[i++].clone());\n    }\n    while (i \u003c intervals.length \u0026\u0026 intervals[i][0] \u003c= newInterval[1]) {\n      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n      i++;\n    }\n    result.add(newInterval.clone());\n    while (i \u003c intervals.length) result.add(intervals[i++].clone());\n    return result.toArray(new int[result.size()][]);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Non-overlapping Intervals",
        "difficulty": "Medium",
        "subpattern": "Earliest finish non-overlap greedy",
        "question": "Given intervals, return the minimum number of intervals to remove so the rest are non-overlapping.",
        "trigger": "Keeping the interval with the earliest end leaves the most room for future intervals.",
        "intuition": "Sort by end time and keep every interval whose start is at or after the previous kept end.",
        "edgeCases": "Touching endpoints, duplicate intervals, nested intervals, all overlap, no overlap.",
        "constraints": "1 \u003c= intervals.length \u003c= 100000; -50000 \u003c= start \u003c end \u003c= 50000.",
        "source": {
          "label": "Non-overlapping Intervals - LeetCode 435",
          "url": "https://leetcode.com/problems/non-overlapping-intervals/"
        },
        "examples": [
          {
            "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
            "output": "1",
            "explanation": "Remove [1,3]."
          },
          {
            "input": "intervals = [[1,2],[1,2],[1,2]]",
            "output": "2",
            "explanation": "Only one duplicate interval can remain."
          },
          {
            "input": "intervals = [[1,2],[2,3]]",
            "output": "0",
            "explanation": "Touching endpoints do not overlap."
          }
        ],
        "bruteForceComplexity": "Time O(2^n); Space O(n). Try keeping or removing each interval and maximize the kept count.",
        "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Earliest finish greedy scans once.",
        "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive scan after sorting by end time.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    int kept = keep(intervals, 0, Integer.MIN_VALUE);\n    return intervals.length - kept;\n  }\n\n  private int keep(int[][] intervals, int index, int previousEnd) {\n    if (index == intervals.length) return 0;\n    int skip = keep(intervals, index + 1, previousEnd);\n    int take = 0;\n    if (intervals[index][0] \u003e= previousEnd) take = 1 + keep(intervals, index + 1, intervals[index][1]);\n    return Math.max(skip, take);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] \u003c end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    return scan(intervals, 0, Integer.MIN_VALUE);\n  }\n\n  private int scan(int[][] intervals, int index, int end) {\n    if (index == intervals.length) return 0;\n    if (intervals[index][0] \u003c end) return 1 + scan(intervals, index + 1, end);\n    return scan(intervals, index + 1, intervals[index][1]);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] \u003c end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] \u003c end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Meeting Rooms II",
        "difficulty": "Medium",
        "subpattern": "Meeting rooms with min-heap",
        "question": "Given meeting intervals, return the minimum number of rooms required so every meeting can be held.",
        "trigger": "The number of active overlapping meetings is the number of rooms needed; the earliest ending meeting is the first room that can be reused.",
        "intuition": "Sort by start time, keep active end times in a min-heap, and reuse rooms whose meetings ended.",
        "edgeCases": "No meetings, one meeting, touching endpoints, all meetings overlap, meetings with same start time.",
        "constraints": "0 \u003c= intervals.length \u003c= 10000; 0 \u003c= start \u003c end \u003c= 1000000.",
        "source": {
          "label": "Meeting Rooms II - LeetCode 253",
          "url": "https://leetcode.com/problems/meeting-rooms-ii/"
        },
        "examples": [
          {
            "input": "intervals = [[0,30],[5,10],[15,20]]",
            "output": "2",
            "explanation": "Two rooms are enough because [5,10] ends before [15,20]."
          },
          {
            "input": "intervals = [[7,10],[2,4]]",
            "output": "1",
            "explanation": "The meetings do not overlap."
          },
          {
            "input": "intervals = [[1,5],[2,6],[3,7]]",
            "output": "3",
            "explanation": "All three are active at time 3."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(1). Count active meetings at each meeting start.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Sort meetings and use a min-heap of active end times.",
        "recursiveComplexity": "Time O(n log n); Space O(n). Recursive scheduler updates the same min-heap.",
        "bruteForceCode": "class Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    int rooms = 0;\n    for (int[] point : intervals) {\n      int active = 0;\n      int time = point[0];\n      for (int[] meeting : intervals) {\n        if (meeting[0] \u003c= time \u0026\u0026 time \u003c meeting[1]) active++;\n      }\n      rooms = Math.max(rooms, active);\n    }\n    return rooms;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    PriorityQueue\u003cInteger\u003e activeEnds = new PriorityQueue\u003c\u003e();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() \u0026\u0026 activeEnds.peek() \u003c= meeting[0]) activeEnds.poll();\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n    return rooms;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    return schedule(intervals, 0, new PriorityQueue\u003c\u003e(), 0);\n  }\n\n  private int schedule(int[][] intervals, int index, PriorityQueue\u003cInteger\u003e activeEnds, int best) {\n    if (index == intervals.length) return best;\n    while (!activeEnds.isEmpty() \u0026\u0026 activeEnds.peek() \u003c= intervals[index][0]) activeEnds.poll();\n    activeEnds.offer(intervals[index][1]);\n    return schedule(intervals, index + 1, activeEnds, Math.max(best, activeEnds.size()));\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    PriorityQueue\u003cInteger\u003e activeEnds = new PriorityQueue\u003c\u003e();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() \u0026\u0026 activeEnds.peek() \u003c= meeting[0]) activeEnds.poll();\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n    return rooms;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -\u003e Integer.compare(a[0], b[0]));\n    PriorityQueue\u003cInteger\u003e activeEnds = new PriorityQueue\u003c\u003e();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() \u0026\u0026 activeEnds.peek() \u003c= meeting[0]) activeEnds.poll();\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n    return rooms;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Minimum Number of Arrows to Burst Balloons",
        "difficulty": "Medium",
        "subpattern": "Interval stabbing by endpoint",
        "question": "Given balloon intervals on the x-axis, return the minimum number of arrows needed to burst all balloons.",
        "trigger": "An arrow at the earliest ending balloon also bursts every currently overlapping balloon and preserves future options.",
        "intuition": "Sort by end coordinate; shoot a new arrow only when the next balloon starts after the last arrow.",
        "edgeCases": "One balloon, touching endpoints, nested intervals, negative coordinates, very large endpoints.",
        "constraints": "1 \u003c= points.length \u003c= 100000; -2^31 \u003c= start \u003c end \u003c= 2^31 - 1.",
        "source": {
          "label": "Minimum Number of Arrows to Burst Balloons - LeetCode 452",
          "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
        },
        "examples": [
          {
            "input": "points = [[10,16],[2,8],[1,6],[7,12]]",
            "output": "2",
            "explanation": "Arrows at 6 and 12 burst all balloons."
          },
          {
            "input": "points = [[1,2],[3,4],[5,6],[7,8]]",
            "output": "4",
            "explanation": "No balloons overlap."
          },
          {
            "input": "points = [[1,2],[2,3]]",
            "output": "1",
            "explanation": "An arrow at 2 bursts both balloons."
          }
        ],
        "bruteForceComplexity": "Time exponential; Space O(n). Try shooting at endpoints and mark all balloons hit by each shot.",
        "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. One endpoint scan counts arrows.",
        "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive endpoint scan after sorting.",
        "bruteForceCode": "class Solution {\n  public int findMinArrowShots(int[][] points) {\n    return search(points, new boolean[points.length]);\n  }\n\n  private int search(int[][] points, boolean[] hit) {\n    int first = -1;\n    for (int i = 0; i \u003c points.length; i++) if (!hit[i]) { first = i; break; }\n    if (first == -1) return 0;\n    int best = points.length;\n    for (int i = 0; i \u003c points.length; i++) {\n      if (hit[i]) continue;\n      long arrow = points[i][1];\n      boolean[] next = hit.clone();\n      for (int j = 0; j \u003c points.length; j++) {\n        if (points[j][0] \u003c= arrow \u0026\u0026 arrow \u003c= points[j][1]) next[j] = true;\n      }\n      best = Math.min(best, 1 + search(points, next));\n    }\n    return best;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] \u003e arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    return scan(points, 0, Long.MIN_VALUE, 0);\n  }\n\n  private int scan(int[][] points, int index, long arrow, int arrows) {\n    if (index == points.length) return arrows;\n    if (arrows == 0 || points[index][0] \u003e arrow) {\n      return scan(points, index + 1, points[index][1], arrows + 1);\n    }\n    return scan(points, index + 1, arrow, arrows);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] \u003e arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -\u003e Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] \u003e arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}"
      }
    ]
  },
  "math": {
    "id": "math",
    "name": "Math \u0026 Number Theory Revision",
    "summary": "Prime counting, fast power, square roots, gcd strings, and fraction cycle detection.",
    "checklist": [
      "Look for divisibility, modulo wraparound, or a repeated remainder state.",
      "Check whether GCD, LCM, or Bezout identity decides reachability or periodicity.",
      "For digit problems, split by place value, carry direction, or repeated digit signature.",
      "When answer validity is monotonic, binary search the numeric answer instead of scanning.",
      "When exponent, permutation rank, or combinations are involved, use logarithmic/factorial/binomial structure."
    ],
    "mistakes": [
      "Negating Integer.MIN_VALUE before converting to long.",
      "Using int for multiplication in square, LCM, or binary-search bounds.",
      "Forgetting that Excel column titles are 1-indexed base 26.",
      "Treating repeated decimal digits as repeated output instead of repeated remainders.",
      "Missing duplicate candidate advancement in Ugly Number II.",
      "Using floating-point square root or logarithm without exact integer adjustment.",
      "Skipping modulo after every multiplication in modular exponentiation."
    ],
    "edgeCases": [
      "Zero and one, especially in factorial, power, square root, and happy-number problems.",
      "Negative inputs and sign handling for reverse integer and fractions.",
      "Boundary values near Integer.MAX_VALUE and Integer.MIN_VALUE.",
      "Cases where a divides b or gcd(a,b) is not 1.",
      "All 9s or carry-propagation through every digit.",
      "Repeating cycles that start after a non-repeating prefix.",
      "One-indexed inputs such as kth permutation and Excel columns."
    ],
    "complexities": [
      "Modulo scans are usually O(n) unless a cycle or formula removes the scan.",
      "Euclidean GCD is O(log min(a,b)) and often unlocks O(1) reachability checks.",
      "Sieve prime counting is O(n log log n) time and O(n) space.",
      "Fast exponentiation and modular exponentiation are O(log exponent) per power.",
      "Digit-place contribution problems usually take O(log10 n) time and O(1) space.",
      "Binary search on numeric answers costs O(log answer) predicate checks.",
      "Combinatorics generation may be O(output), but rank/formula problems can avoid full generation."
    ],
    "mentalModel": [
      "Numbers often have hidden structure: factors, digits, places, cycles, or monotonic counts.",
      "Remainders are state; when a remainder repeats, future behavior repeats.",
      "GCD tells what step sizes can eventually reach; LCM tells when periodic events align.",
      "Carry moves from low place to high place; base conversion repeatedly divides by the base.",
      "If brute force walks values one by one, look for a formula, a cycle, or a binary-search count."
    ],
    "revisionStrategy": [
      "Solve these 5 important Math \u0026 Number Theory problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Count Primes",
        "difficulty": "Medium",
        "subpattern": "Sieve of Eratosthenes",
        "question": "Given an integer n, return the number of prime numbers strictly less than n.",
        "trigger": "Repeated primality checks share multiples; marking composites once avoids duplicated divisibility work.",
        "intuition": "Start from each prime p and mark multiples from p * p because smaller multiples were already marked.",
        "edgeCases": "n \u003c= 2, n is prime, n is composite, small limits, large n where O(n sqrt n) is too slow.",
        "constraints": "0 \u003c= n \u003c= 5000000.",
        "source": {
          "label": "Count Primes - LeetCode 204",
          "url": "https://leetcode.com/problems/count-primes/"
        },
        "examples": [
          {
            "input": "n = 10",
            "output": "4",
            "explanation": "The primes below 10 are 2, 3, 5, and 7."
          },
          {
            "input": "n = 0",
            "output": "0",
            "explanation": "There are no positive primes below 0."
          },
          {
            "input": "n = 3",
            "output": "1",
            "explanation": "Only 2 is strictly below 3."
          }
        ],
        "bruteForceComplexity": "Time O(n sqrt n); Space O(1). Check each candidate by trial division.",
        "optimizedComplexity": "Time O(n log log n); Space O(n). Sieve marks composite multiples once per prime.",
        "recursiveComplexity": "Time O(n sqrt n); Space O(n) call stack in the scan. Recursively scans candidates and divisors.",
        "bruteForceCode": "class Solution {\n  public int countPrimes(int n) {\n    int count = 0;\n    for (int value = 2; value \u003c n; value++) {\n      if (isPrime(value)) count++;\n    }\n    return count;\n  }\n\n  private boolean isPrime(int value) {\n    for (int divisor = 2; divisor * divisor \u003c= value; divisor++) {\n      if (value % divisor == 0) return false;\n    }\n    return true;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int countPrimes(int n) {\n    if (n \u003c= 2) return 0;\n    boolean[] composite = new boolean[n];\n    for (int value = 2; (long) value * value \u003c n; value++) {\n      if (composite[value]) continue;\n      for (long multiple = (long) value * value; multiple \u003c n; multiple += value) {\n        composite[(int) multiple] = true;\n      }\n    }\n\n    int count = 0;\n    for (int value = 2; value \u003c n; value++) {\n      if (!composite[value]) count++;\n    }\n    return count;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int countPrimes(int n) {\n    return scan(2, n);\n  }\n\n  private int scan(int value, int n) {\n    if (value \u003e= n) return 0;\n    return (isPrime(value, 2) ? 1 : 0) + scan(value + 1, n);\n  }\n\n  private boolean isPrime(int value, int divisor) {\n    if ((long) divisor * divisor \u003e value) return true;\n    if (value % divisor == 0) return false;\n    return isPrime(value, divisor + 1);\n  }\n}",
        "optimizedCode": "class Solution {\n  public int countPrimes(int n) {\n    if (n \u003c= 2) return 0;\n    boolean[] composite = new boolean[n];\n    for (int value = 2; (long) value * value \u003c n; value++) {\n      if (composite[value]) continue;\n      for (long multiple = (long) value * value; multiple \u003c n; multiple += value) {\n        composite[(int) multiple] = true;\n      }\n    }\n\n    int count = 0;\n    for (int value = 2; value \u003c n; value++) {\n      if (!composite[value]) count++;\n    }\n    return count;\n  }\n}",
        "code": "class Solution {\n  public int countPrimes(int n) {\n    if (n \u003c= 2) return 0;\n    boolean[] composite = new boolean[n];\n    for (int value = 2; (long) value * value \u003c n; value++) {\n      if (composite[value]) continue;\n      for (long multiple = (long) value * value; multiple \u003c n; multiple += value) {\n        composite[(int) multiple] = true;\n      }\n    }\n\n    int count = 0;\n    for (int value = 2; value \u003c n; value++) {\n      if (!composite[value]) count++;\n    }\n    return count;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Pow(x, n)",
        "difficulty": "Medium",
        "subpattern": "Fast exponentiation",
        "question": "Implement pow(x, n), which calculates x raised to the integer power n.",
        "trigger": "Repeated multiplication can be compressed because x^n = (x^2)^(n/2) when n is even.",
        "intuition": "Use exponentiation by squaring and convert n to long before negating to handle Integer.MIN_VALUE.",
        "edgeCases": "n is 0, n is negative, n is Integer.MIN_VALUE, x is 0, x is 1 or -1.",
        "constraints": "-100.0 \u003c x \u003c 100.0; -2147483648 \u003c= n \u003c= 2147483647; result fits in double constraints.",
        "source": {
          "label": "Pow(x, n) - LeetCode 50",
          "url": "https://leetcode.com/problems/powx-n/"
        },
        "examples": [
          {
            "input": "x = 2.00000, n = 10",
            "output": "1024.00000",
            "explanation": "2 raised to 10 is 1024."
          },
          {
            "input": "x = 2.10000, n = 3",
            "output": "9.26100",
            "explanation": "Multiply 2.1 three times."
          },
          {
            "input": "x = 2.00000, n = -2",
            "output": "0.25000",
            "explanation": "Negative exponent returns reciprocal."
          }
        ],
        "bruteForceComplexity": "Time O(|n|); Space O(1). Multiply once per exponent step.",
        "optimizedComplexity": "Time O(log |n|); Space O(1). Exponentiation by squaring halves the exponent.",
        "recursiveComplexity": "Time O(log |n|); Space O(log |n|). Recursive squaring halves the exponent per call.",
        "bruteForceCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power \u003c 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n    double answer = 1.0;\n    for (long i = 0; i \u003c power; i++) answer *= x;\n    return answer;\n  }\n}",
        "iterativeCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power \u003c 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power \u003e 0) {\n      if ((power \u0026 1L) == 1L) answer *= x;\n      x *= x;\n      power \u003e\u003e= 1;\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power \u003c 0) return 1.0 / fastPow(x, -power);\n    return fastPow(x, power);\n  }\n\n  private double fastPow(double x, long power) {\n    if (power == 0) return 1.0;\n    double half = fastPow(x, power / 2);\n    double result = half * half;\n    return power % 2 == 0 ? result : result * x;\n  }\n}",
        "optimizedCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power \u003c 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power \u003e 0) {\n      if ((power \u0026 1L) == 1L) answer *= x;\n      x *= x;\n      power \u003e\u003e= 1;\n    }\n    return answer;\n  }\n}",
        "code": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power \u003c 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power \u003e 0) {\n      if ((power \u0026 1L) == 1L) answer *= x;\n      x *= x;\n      power \u003e\u003e= 1;\n    }\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Sqrt(x)",
        "difficulty": "Easy",
        "subpattern": "Integer square root search",
        "question": "Given a non-negative integer x, return the integer square root of x rounded down.",
        "trigger": "The answer is the largest integer m such that m * m \u003c= x, a monotonic predicate over integers.",
        "intuition": "Binary search the candidate root and use division or long multiplication to avoid overflow.",
        "edgeCases": "x is 0, x is 1, perfect square, non-perfect square, x near Integer.MAX_VALUE.",
        "constraints": "0 \u003c= x \u003c= 2147483647.",
        "source": {
          "label": "Sqrt(x) - LeetCode 69",
          "url": "https://leetcode.com/problems/sqrtx/"
        },
        "examples": [
          {
            "input": "x = 4",
            "output": "2",
            "explanation": "2 * 2 equals 4."
          },
          {
            "input": "x = 8",
            "output": "2",
            "explanation": "The real square root is 2.828, rounded down."
          },
          {
            "input": "x = 0",
            "output": "0",
            "explanation": "The square root of 0 is 0."
          }
        ],
        "bruteForceComplexity": "Time O(sqrt x); Space O(1). Increase candidate until its square is too large.",
        "optimizedComplexity": "Time O(log x); Space O(1). Binary search the monotonic square predicate.",
        "recursiveComplexity": "Time O(log x); Space O(log x). Recursive binary search stores call depth.",
        "bruteForceCode": "class Solution {\n  public int mySqrt(int x) {\n    long candidate = 0;\n    while ((candidate + 1) * (candidate + 1) \u003c= x) {\n      candidate++;\n    }\n    return (int) candidate;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int mySqrt(int x) {\n    int left = 0;\n    int right = x;\n    int answer = 0;\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      if ((long) mid * mid \u003c= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int mySqrt(int x) {\n    return search(x, 0, x, 0);\n  }\n\n  private int search(int x, int left, int right, int answer) {\n    if (left \u003e right) return answer;\n    int mid = left + (right - left) / 2;\n    if ((long) mid * mid \u003c= x) return search(x, mid + 1, right, mid);\n    return search(x, left, mid - 1, answer);\n  }\n}",
        "optimizedCode": "class Solution {\n  public int mySqrt(int x) {\n    int left = 0;\n    int right = x;\n    int answer = 0;\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      if ((long) mid * mid \u003c= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
        "code": "class Solution {\n  public int mySqrt(int x) {\n    int left = 0;\n    int right = x;\n    int answer = 0;\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      if ((long) mid * mid \u003c= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "GCD of Strings",
        "difficulty": "Easy",
        "subpattern": "Euclidean gcd string divisibility",
        "question": "Given two strings, return the largest string that can be repeated to form both strings.",
        "trigger": "A common repeating base exists only when concatenation order commutes, and its length is gcd of both lengths.",
        "intuition": "Check str1 + str2 equals str2 + str1, then take the prefix of length gcd(len1, len2).",
        "edgeCases": "No common base, equal strings, one string repeated many times, one-character base, very different lengths.",
        "constraints": "1 \u003c= str1.length, str2.length \u003c= 1000; strings contain uppercase English letters.",
        "source": {
          "label": "GCD of Strings - LeetCode 1071",
          "url": "https://leetcode.com/problems/greatest-common-divisor-of-strings/"
        },
        "examples": [
          {
            "input": "str1 = \"ABCABC\", str2 = \"ABC\"",
            "output": "\"ABC\"",
            "explanation": "ABC repeats to form both strings."
          },
          {
            "input": "str1 = \"ABABAB\", str2 = \"ABAB\"",
            "output": "\"AB\"",
            "explanation": "AB is the largest common repeating base."
          },
          {
            "input": "str1 = \"LEET\", str2 = \"CODE\"",
            "output": "\"\"",
            "explanation": "No repeating base can form both strings."
          }
        ],
        "bruteForceComplexity": "Time O((n + m) * min(n,m)); Space O(n + m). Try candidate prefix lengths from largest to smallest.",
        "optimizedComplexity": "Time O(n + m + log min(n,m)); Space O(n + m). Concatenation check plus Euclidean gcd.",
        "recursiveComplexity": "Time O(n + m + log min(n,m)); Space O(log min(n,m)). Recursive gcd computes the prefix length.",
        "bruteForceCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    int limit = Math.min(str1.length(), str2.length());\n    for (int length = limit; length \u003e= 1; length--) {\n      if (str1.length() % length == 0 \u0026\u0026 str2.length() % length == 0) {\n        String candidate = str1.substring(0, length);\n        if (divides(str1, candidate) \u0026\u0026 divides(str2, candidate)) return candidate;\n      }\n    }\n    return \"\";\n  }\n\n  private boolean divides(String value, String base) {\n    for (int i = 0; i \u003c value.length(); i += base.length()) {\n      if (!value.substring(i, i + base.length()).equals(base)) return false;\n    }\n    return true;\n  }\n}",
        "iterativeCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    int length = gcd(str1.length(), str2.length());\n    return str1.substring(0, length);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
        "recursiveCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    return str1.substring(0, gcd(str1.length(), str2.length()));\n  }\n\n  private int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n  }\n}",
        "optimizedCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    int length = gcd(str1.length(), str2.length());\n    return str1.substring(0, length);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
        "code": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    int length = gcd(str1.length(), str2.length());\n    return str1.substring(0, length);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Fraction to Recurring Decimal",
        "difficulty": "Medium",
        "subpattern": "Remainder cycle detection",
        "question": "Given numerator and denominator, return their decimal representation, enclosing any repeating fractional part in parentheses.",
        "trigger": "Long division repeats exactly when the same remainder appears again.",
        "intuition": "Map each remainder to the output index where it first appeared; insert parentheses when it repeats.",
        "edgeCases": "Zero numerator, negative result, denominator divides evenly, repeating decimals, Integer.MIN_VALUE absolute value.",
        "constraints": "-2147483648 \u003c= numerator, denominator \u003c= 2147483647; denominator != 0.",
        "source": {
          "label": "Fraction to Recurring Decimal - LeetCode 166",
          "url": "https://leetcode.com/problems/fraction-to-recurring-decimal/"
        },
        "examples": [
          {
            "input": "numerator = 1, denominator = 2",
            "output": "\"0.5\"",
            "explanation": "The decimal terminates."
          },
          {
            "input": "numerator = 2, denominator = 1",
            "output": "\"2\"",
            "explanation": "There is no fractional part."
          },
          {
            "input": "numerator = 4, denominator = 333",
            "output": "\"0.(012)\"",
            "explanation": "The remainder cycle repeats 012."
          }
        ],
        "bruteForceComplexity": "Time O(k^2); Space O(k). List lookup checks whether a remainder has appeared before.",
        "optimizedComplexity": "Time O(k); Space O(k). Hash map stores each remainder position.",
        "recursiveComplexity": "Time O(k); Space O(k). Recursive long division carries the remainder map.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator \u003c 0) ^ (denominator \u003c 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    List\u003cLong\u003e remainders = new ArrayList\u003c\u003e();\n    while (remainder != 0) {\n      int seen = remainders.indexOf(remainder);\n      if (seen \u003e= 0) {\n        answer.insert(answer.indexOf(\".\") + 1 + seen, '(');\n        answer.append(')');\n        break;\n      }\n      remainders.add(remainder);\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator \u003c 0) ^ (denominator \u003c 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    Map\u003cLong, Integer\u003e seen = new HashMap\u003c\u003e();\n    while (remainder != 0) {\n      if (seen.containsKey(remainder)) {\n        answer.insert(seen.get(remainder).intValue(), '(');\n        answer.append(')');\n        break;\n      }\n      seen.put(remainder, answer.length());\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator \u003c 0) ^ (denominator \u003c 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    divide(remainder, divisor, answer, new HashMap\u003c\u003e());\n    return answer.toString();\n  }\n\n  private void divide(long remainder, long divisor, StringBuilder answer, Map\u003cLong, Integer\u003e seen) {\n    if (remainder == 0) return;\n    if (seen.containsKey(remainder)) {\n      answer.insert(seen.get(remainder).intValue(), '(');\n      answer.append(')');\n      return;\n    }\n    seen.put(remainder, answer.length());\n    remainder *= 10;\n    answer.append(remainder / divisor);\n    divide(remainder % divisor, divisor, answer, seen);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator \u003c 0) ^ (denominator \u003c 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    Map\u003cLong, Integer\u003e seen = new HashMap\u003c\u003e();\n    while (remainder != 0) {\n      if (seen.containsKey(remainder)) {\n        answer.insert(seen.get(remainder).intValue(), '(');\n        answer.append(')');\n        break;\n      }\n      seen.put(remainder, answer.length());\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator \u003c 0) ^ (denominator \u003c 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    Map\u003cLong, Integer\u003e seen = new HashMap\u003c\u003e();\n    while (remainder != 0) {\n      if (seen.containsKey(remainder)) {\n        answer.insert(seen.get(remainder).intValue(), '(');\n        answer.append(')');\n        break;\n      }\n      seen.put(remainder, answer.length());\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}"
      }
    ]
  },
  "matrix": {
    "id": "matrix",
    "name": "Matrix Revision",
    "summary": "In-place matrix marking, boundary traversal, rotation, flattened search, and row/column validation.",
    "checklist": [
      "If each cell depends on neighbors, decide whether DFS/BFS, DP, or boundary traversal is the primary shape.",
      "Look for row/column side effects: markers or prefix sums often avoid repeated scans.",
      "For reachability, ask whether starting from every cell can be reversed into multi-source boundary BFS/DFS.",
      "For shortest distance in an unweighted grid, use BFS levels from one or many sources.",
      "For grid DP, identify which neighboring states feed the current cell and whether rolling rows are enough."
    ],
    "mistakes": [
      "Mutating cells before all original-state decisions are read.",
      "Treating diagonal adjacency as valid when the problem allows only four directions.",
      "Forgetting single-row or single-column boundary cases in spiral traversal and rotation.",
      "Running DFS from every cell when reverse multi-source BFS solves the same reachability once.",
      "Not passing the parent cell in undirected cycle detection.",
      "Using row count where column count is needed in rectangular matrices.",
      "Missing prefix-sum exclusive indexing offsets by one row and one column."
    ],
    "edgeCases": [
      "1 x 1 matrices and single row or single column matrices.",
      "All zeros, all ones, all water, all land, or all same character grids.",
      "Boundary cells that should not be flipped or captured.",
      "Rectangular matrices where m != n.",
      "Starting or ending cell blocked in path problems.",
      "Repeated values or equal heights where strict vs non-strict movement matters.",
      "In-place algorithms where marker values must not be confused with original values."
    ],
    "complexities": [
      "Plain matrix scans cost O(mn) time and usually O(1) extra space.",
      "DFS/BFS connected-component problems cost O(mn) time and O(mn) worst-case stack or queue space.",
      "Multi-source BFS distance problems cost O(mn) because each cell is enqueued at most once.",
      "2D prefix sums cost O(mn) preprocessing and O(1) per rectangle query.",
      "Grid DP is usually O(mn), often reducible from O(mn) space to O(n) rolling space.",
      "Backtracking word/Sudoku searches are exponential in empty cells or word length, but pruning controls practical runtime.",
      "Spiral and diagonal traversals are O(mn) and should write or read each cell exactly once."
    ],
    "mentalModel": [
      "A matrix problem is usually a graph, a table of DP states, or a coordinate transformation.",
      "Decide first whether movement is four-direction, eight-direction, diagonal, row-column, or bounded by layers.",
      "When many cells ask the same range or distance question, preprocess once from sources or prefix sums.",
      "When mutating in place, encode old and new state so one pass does not corrupt another.",
      "For rectangular grids, always name m and n separately and validate every boundary check."
    ],
    "revisionStrategy": [
      "Solve these 5 important Matrix problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Set Matrix Zeroes",
        "difficulty": "Medium",
        "subpattern": "Row/column marker propagation",
        "question": "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0 in place.",
        "trigger": "A zero affects two axes, so row and column markers preserve which axes must be cleared without losing original zeros.",
        "intuition": "Use the first row and first column as marker storage, while separately remembering whether they originally contained zero.",
        "edgeCases": "Zero in first row, zero in first column, single row, single column, no zeros, all zeros.",
        "constraints": "1 \u003c= m, n \u003c= 200; -2^31 \u003c= matrix[i][j] \u003c= 2^31 - 1.",
        "source": {
          "label": "Set Matrix Zeroes - LeetCode 73",
          "url": "https://leetcode.com/problems/set-matrix-zeroes/"
        },
        "examples": [
          {
            "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
            "output": "[[1,0,1],[0,0,0],[1,0,1]]",
            "explanation": "The zero at row 1, column 1 clears that row and column."
          },
          {
            "input": "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
            "output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
            "explanation": "Zeros in the first row must still clear their columns."
          },
          {
            "input": "matrix = [[1]]",
            "output": "[[1]]",
            "explanation": "There is no zero to propagate."
          }
        ],
        "bruteForceComplexity": "Time O(mn(m+n)); Space O(mn). Copy the original matrix before applying row and column clears.",
        "optimizedComplexity": "Time O(mn); Space O(1). First row and first column store marker flags.",
        "recursiveComplexity": "Time O(mn); Space O(m+n+mn call stack). Recursively scans cells and records affected rows and columns.",
        "bruteForceCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int[][] original = new int[m][n];\n    for (int r = 0; r \u003c m; r++) {\n      for (int c = 0; c \u003c n; c++) original[r][c] = matrix[r][c];\n    }\n\n    for (int r = 0; r \u003c m; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        if (original[r][c] == 0) {\n          for (int col = 0; col \u003c n; col++) matrix[r][col] = 0;\n          for (int row = 0; row \u003c m; row++) matrix[row][c] = 0;\n        }\n      }\n    }\n  }\n}",
        "iterativeCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean firstRowZero = false;\n    boolean firstColZero = false;\n\n    for (int c = 0; c \u003c n; c++) if (matrix[0][c] == 0) firstRowZero = true;\n    for (int r = 0; r \u003c m; r++) if (matrix[r][0] == 0) firstColZero = true;\n\n    for (int r = 1; r \u003c m; r++) {\n      for (int c = 1; c \u003c n; c++) {\n        if (matrix[r][c] == 0) {\n          matrix[r][0] = 0;\n          matrix[0][c] = 0;\n        }\n      }\n    }\n\n    for (int r = 1; r \u003c m; r++) {\n      for (int c = 1; c \u003c n; c++) {\n        if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n      }\n    }\n    if (firstRowZero) for (int c = 0; c \u003c n; c++) matrix[0][c] = 0;\n    if (firstColZero) for (int r = 0; r \u003c m; r++) matrix[r][0] = 0;\n  }\n}",
        "recursiveCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    boolean[] rows = new boolean[matrix.length];\n    boolean[] cols = new boolean[matrix[0].length];\n    collect(matrix, 0, 0, rows, cols);\n    apply(matrix, 0, 0, rows, cols);\n  }\n\n  private void collect(int[][] matrix, int r, int c, boolean[] rows, boolean[] cols) {\n    if (r == matrix.length) return;\n    if (matrix[r][c] == 0) {\n      rows[r] = true;\n      cols[c] = true;\n    }\n    int nextR = c + 1 == matrix[0].length ? r + 1 : r;\n    int nextC = c + 1 == matrix[0].length ? 0 : c + 1;\n    collect(matrix, nextR, nextC, rows, cols);\n  }\n\n  private void apply(int[][] matrix, int r, int c, boolean[] rows, boolean[] cols) {\n    if (r == matrix.length) return;\n    if (rows[r] || cols[c]) matrix[r][c] = 0;\n    int nextR = c + 1 == matrix[0].length ? r + 1 : r;\n    int nextC = c + 1 == matrix[0].length ? 0 : c + 1;\n    apply(matrix, nextR, nextC, rows, cols);\n  }\n}",
        "optimizedCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean firstRowZero = false;\n    boolean firstColZero = false;\n\n    for (int c = 0; c \u003c n; c++) if (matrix[0][c] == 0) firstRowZero = true;\n    for (int r = 0; r \u003c m; r++) if (matrix[r][0] == 0) firstColZero = true;\n\n    for (int r = 1; r \u003c m; r++) {\n      for (int c = 1; c \u003c n; c++) {\n        if (matrix[r][c] == 0) {\n          matrix[r][0] = 0;\n          matrix[0][c] = 0;\n        }\n      }\n    }\n\n    for (int r = 1; r \u003c m; r++) {\n      for (int c = 1; c \u003c n; c++) {\n        if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n      }\n    }\n    if (firstRowZero) for (int c = 0; c \u003c n; c++) matrix[0][c] = 0;\n    if (firstColZero) for (int r = 0; r \u003c m; r++) matrix[r][0] = 0;\n  }\n}",
        "code": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean firstRowZero = false;\n    boolean firstColZero = false;\n\n    for (int c = 0; c \u003c n; c++) if (matrix[0][c] == 0) firstRowZero = true;\n    for (int r = 0; r \u003c m; r++) if (matrix[r][0] == 0) firstColZero = true;\n\n    for (int r = 1; r \u003c m; r++) {\n      for (int c = 1; c \u003c n; c++) {\n        if (matrix[r][c] == 0) {\n          matrix[r][0] = 0;\n          matrix[0][c] = 0;\n        }\n      }\n    }\n\n    for (int r = 1; r \u003c m; r++) {\n      for (int c = 1; c \u003c n; c++) {\n        if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n      }\n    }\n    if (firstRowZero) for (int c = 0; c \u003c n; c++) matrix[0][c] = 0;\n    if (firstColZero) for (int r = 0; r \u003c m; r++) matrix[r][0] = 0;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Spiral Matrix",
        "difficulty": "Medium",
        "subpattern": "Boundary-layer traversal",
        "question": "Given an m x n matrix, return all elements of the matrix in spiral order.",
        "trigger": "Traversal repeatedly consumes the current outer boundary and shrinks inward.",
        "intuition": "Maintain top, bottom, left, and right boundaries and traverse four sides while they remain valid.",
        "edgeCases": "Single row, single column, rectangular matrix, odd center cell, empty matrix is not allowed by constraints.",
        "constraints": "1 \u003c= m, n \u003c= 10; -100 \u003c= matrix[i][j] \u003c= 100.",
        "source": {
          "label": "Spiral Matrix - LeetCode 54",
          "url": "https://leetcode.com/problems/spiral-matrix/"
        },
        "examples": [
          {
            "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
            "output": "[1,2,3,6,9,8,7,4,5]",
            "explanation": "The outer layer is read before the center."
          },
          {
            "input": "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
            "output": "[1,2,3,4,8,12,11,10,9,5,6,7]",
            "explanation": "The final inner row is handled once."
          },
          {
            "input": "matrix = [[1],[2],[3]]",
            "output": "[1,2,3]",
            "explanation": "One column is already spiral order."
          }
        ],
        "bruteForceComplexity": "Time O(mn); Space O(mn). Simulate direction changes with a visited matrix.",
        "optimizedComplexity": "Time O(mn); Space O(1) excluding output. Shrinking boundaries avoid visited state.",
        "recursiveComplexity": "Time O(mn); Space O(min(m,n)) excluding output. Recursively peels one layer at a time.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e spiralOrder(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean[][] seen = new boolean[m][n];\n    int[] dr = {0, 1, 0, -1};\n    int[] dc = {1, 0, -1, 0};\n    int r = 0, c = 0, dir = 0;\n    List\u003cInteger\u003e answer = new ArrayList\u003c\u003e();\n\n    for (int step = 0; step \u003c m * n; step++) {\n      answer.add(matrix[r][c]);\n      seen[r][c] = true;\n      int nr = r + dr[dir], nc = c + dc[dir];\n      if (nr \u003c 0 || nr == m || nc \u003c 0 || nc == n || seen[nr][nc]) {\n        dir = (dir + 1) % 4;\n        nr = r + dr[dir];\n        nc = c + dc[dir];\n      }\n      r = nr;\n      c = nc;\n    }\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e spiralOrder(int[][] matrix) {\n    List\u003cInteger\u003e answer = new ArrayList\u003c\u003e();\n    int top = 0, bottom = matrix.length - 1;\n    int left = 0, right = matrix[0].length - 1;\n\n    while (top \u003c= bottom \u0026\u0026 left \u003c= right) {\n      for (int c = left; c \u003c= right; c++) answer.add(matrix[top][c]);\n      top++;\n      for (int r = top; r \u003c= bottom; r++) answer.add(matrix[r][right]);\n      right--;\n      if (top \u003c= bottom) {\n        for (int c = right; c \u003e= left; c--) answer.add(matrix[bottom][c]);\n        bottom--;\n      }\n      if (left \u003c= right) {\n        for (int r = bottom; r \u003e= top; r--) answer.add(matrix[r][left]);\n        left++;\n      }\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e spiralOrder(int[][] matrix) {\n    List\u003cInteger\u003e answer = new ArrayList\u003c\u003e();\n    peel(matrix, 0, matrix.length - 1, 0, matrix[0].length - 1, answer);\n    return answer;\n  }\n\n  private void peel(int[][] matrix, int top, int bottom, int left, int right, List\u003cInteger\u003e answer) {\n    if (top \u003e bottom || left \u003e right) return;\n    for (int c = left; c \u003c= right; c++) answer.add(matrix[top][c]);\n    for (int r = top + 1; r \u003c= bottom; r++) answer.add(matrix[r][right]);\n    if (top \u003c bottom) for (int c = right - 1; c \u003e= left; c--) answer.add(matrix[bottom][c]);\n    if (left \u003c right) for (int r = bottom - 1; r \u003e top; r--) answer.add(matrix[r][left]);\n    peel(matrix, top + 1, bottom - 1, left + 1, right - 1, answer);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e spiralOrder(int[][] matrix) {\n    List\u003cInteger\u003e answer = new ArrayList\u003c\u003e();\n    int top = 0, bottom = matrix.length - 1;\n    int left = 0, right = matrix[0].length - 1;\n\n    while (top \u003c= bottom \u0026\u0026 left \u003c= right) {\n      for (int c = left; c \u003c= right; c++) answer.add(matrix[top][c]);\n      top++;\n      for (int r = top; r \u003c= bottom; r++) answer.add(matrix[r][right]);\n      right--;\n      if (top \u003c= bottom) {\n        for (int c = right; c \u003e= left; c--) answer.add(matrix[bottom][c]);\n        bottom--;\n      }\n      if (left \u003c= right) {\n        for (int r = bottom; r \u003e= top; r--) answer.add(matrix[r][left]);\n        left++;\n      }\n    }\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e spiralOrder(int[][] matrix) {\n    List\u003cInteger\u003e answer = new ArrayList\u003c\u003e();\n    int top = 0, bottom = matrix.length - 1;\n    int left = 0, right = matrix[0].length - 1;\n\n    while (top \u003c= bottom \u0026\u0026 left \u003c= right) {\n      for (int c = left; c \u003c= right; c++) answer.add(matrix[top][c]);\n      top++;\n      for (int r = top; r \u003c= bottom; r++) answer.add(matrix[r][right]);\n      right--;\n      if (top \u003c= bottom) {\n        for (int c = right; c \u003e= left; c--) answer.add(matrix[bottom][c]);\n        bottom--;\n      }\n      if (left \u003c= right) {\n        for (int r = bottom; r \u003e= top; r--) answer.add(matrix[r][left]);\n        left++;\n      }\n    }\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Rotate Image",
        "difficulty": "Medium",
        "subpattern": "Transpose and reverse rotation",
        "question": "Given an n x n matrix, rotate it 90 degrees clockwise in place.",
        "trigger": "A 90-degree rotation maps each cell by coordinates, and can be decomposed into transpose plus row reverse.",
        "intuition": "Transpose across the main diagonal, then reverse every row to complete clockwise rotation.",
        "edgeCases": "n is 1, even n, odd n with center cell, negative values, in-place requirement.",
        "constraints": "1 \u003c= n \u003c= 20; -1000 \u003c= matrix[i][j] \u003c= 1000.",
        "source": {
          "label": "Rotate Image - LeetCode 48",
          "url": "https://leetcode.com/problems/rotate-image/"
        },
        "examples": [
          {
            "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
            "output": "[[7,4,1],[8,5,2],[9,6,3]]",
            "explanation": "Rows become columns after clockwise rotation."
          },
          {
            "input": "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
            "output": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
            "explanation": "All four layers rotate in place."
          },
          {
            "input": "matrix = [[1]]",
            "output": "[[1]]",
            "explanation": "One cell is unchanged."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(n^2). Copy each value to its rotated coordinate.",
        "optimizedComplexity": "Time O(n^2); Space O(1). Transpose then reverse each row.",
        "recursiveComplexity": "Time O(n^2); Space O(n). Recursively rotates four-way layer cycles.",
        "bruteForceCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    int[][] copy = new int[n][n];\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) {\n        copy[c][n - 1 - r] = matrix[r][c];\n      }\n    }\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = 0; c \u003c n; c++) matrix[r][c] = copy[r][c];\n    }\n  }\n}",
        "iterativeCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = r + 1; c \u003c n; c++) {\n        int temp = matrix[r][c];\n        matrix[r][c] = matrix[c][r];\n        matrix[c][r] = temp;\n      }\n    }\n\n    for (int r = 0; r \u003c n; r++) {\n      int left = 0, right = n - 1;\n      while (left \u003c right) {\n        int temp = matrix[r][left];\n        matrix[r][left++] = matrix[r][right];\n        matrix[r][right--] = temp;\n      }\n    }\n  }\n}",
        "recursiveCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    rotateLayer(matrix, 0, matrix.length - 1);\n  }\n\n  private void rotateLayer(int[][] matrix, int start, int end) {\n    if (start \u003e= end) return;\n    for (int offset = 0; offset \u003c end - start; offset++) {\n      int top = matrix[start][start + offset];\n      matrix[start][start + offset] = matrix[end - offset][start];\n      matrix[end - offset][start] = matrix[end][end - offset];\n      matrix[end][end - offset] = matrix[start + offset][end];\n      matrix[start + offset][end] = top;\n    }\n    rotateLayer(matrix, start + 1, end - 1);\n  }\n}",
        "optimizedCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = r + 1; c \u003c n; c++) {\n        int temp = matrix[r][c];\n        matrix[r][c] = matrix[c][r];\n        matrix[c][r] = temp;\n      }\n    }\n\n    for (int r = 0; r \u003c n; r++) {\n      int left = 0, right = n - 1;\n      while (left \u003c right) {\n        int temp = matrix[r][left];\n        matrix[r][left++] = matrix[r][right];\n        matrix[r][right--] = temp;\n      }\n    }\n  }\n}",
        "code": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int r = 0; r \u003c n; r++) {\n      for (int c = r + 1; c \u003c n; c++) {\n        int temp = matrix[r][c];\n        matrix[r][c] = matrix[c][r];\n        matrix[c][r] = temp;\n      }\n    }\n\n    for (int r = 0; r \u003c n; r++) {\n      int left = 0, right = n - 1;\n      while (left \u003c right) {\n        int temp = matrix[r][left];\n        matrix[r][left++] = matrix[r][right];\n        matrix[r][right--] = temp;\n      }\n    }\n  }\n}"
      },
      {
        "group": "core",
        "name": "Search a 2D Matrix",
        "difficulty": "Medium",
        "subpattern": "Flattened binary search",
        "question": "Given a matrix where each row is sorted and the first integer of each row is greater than the last integer of the previous row, return whether target exists.",
        "trigger": "The matrix is globally sorted if flattened row by row, making binary search valid over virtual indexes.",
        "intuition": "Map a virtual index mid to row mid / n and column mid % n.",
        "edgeCases": "Target smaller than first value, target larger than last value, one row, one column, target at row boundary.",
        "constraints": "1 \u003c= m, n \u003c= 100; -10000 \u003c= matrix[i][j], target \u003c= 10000.",
        "source": {
          "label": "Search a 2D Matrix - LeetCode 74",
          "url": "https://leetcode.com/problems/search-a-2d-matrix/"
        },
        "examples": [
          {
            "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
            "output": "true",
            "explanation": "3 is present in the first row."
          },
          {
            "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
            "output": "false",
            "explanation": "13 is between values but absent."
          },
          {
            "input": "matrix = [[1]], target = 1",
            "output": "true",
            "explanation": "Single-cell matrix contains the target."
          }
        ],
        "bruteForceComplexity": "Time O(mn); Space O(1). Scan every cell.",
        "optimizedComplexity": "Time O(log(mn)); Space O(1). Binary search a flattened virtual array.",
        "recursiveComplexity": "Time O(log(mn)); Space O(log(mn)). Recursive binary search over virtual indexes.",
        "bruteForceCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int r = 0; r \u003c matrix.length; r++) {\n      for (int c = 0; c \u003c matrix[0].length; c++) {\n        if (matrix[r][c] == target) return true;\n      }\n    }\n    return false;\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int left = 0;\n    int right = m * n - 1;\n\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / n][mid % n];\n      if (value == target) return true;\n      if (value \u003c target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int n = matrix[0].length;\n    return search(matrix, target, 0, matrix.length * n - 1, n);\n  }\n\n  private boolean search(int[][] matrix, int target, int left, int right, int n) {\n    if (left \u003e right) return false;\n    int mid = left + (right - left) / 2;\n    int value = matrix[mid / n][mid % n];\n    if (value == target) return true;\n    if (value \u003c target) return search(matrix, target, mid + 1, right, n);\n    return search(matrix, target, left, mid - 1, n);\n  }\n}",
        "optimizedCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int left = 0;\n    int right = m * n - 1;\n\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / n][mid % n];\n      if (value == target) return true;\n      if (value \u003c target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}",
        "code": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int left = 0;\n    int right = m * n - 1;\n\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / n][mid % n];\n      if (value == target) return true;\n      if (value \u003c target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Valid Sudoku",
        "difficulty": "Medium",
        "subpattern": "3-mask constraint validation",
        "question": "Given a partially filled 9 x 9 Sudoku board, return true if it is valid under row, column, and 3 x 3 box constraints.",
        "trigger": "Each filled digit must be unique in three independent constraint groups: row, column, and box.",
        "intuition": "Track seen digits for rows, columns, and boxes; a repeated digit in any group invalidates the board.",
        "edgeCases": "Empty cells, repeated digit in row, repeated digit in column, repeated digit in box, board not necessarily solvable.",
        "constraints": "board.length == 9; board[i].length == 9; board[i][j] is digit 1-9 or dot.",
        "source": {
          "label": "Valid Sudoku - LeetCode 36",
          "url": "https://leetcode.com/problems/valid-sudoku/"
        },
        "examples": [
          {
            "input": "board = standard valid partial Sudoku",
            "output": "true",
            "explanation": "No row, column, or box has duplicate digits."
          },
          {
            "input": "board has two 8s in the first column",
            "output": "false",
            "explanation": "Column uniqueness is violated."
          },
          {
            "input": "board is all dots",
            "output": "true",
            "explanation": "No filled digit violates constraints."
          }
        ],
        "bruteForceComplexity": "Time O(81 * 27); Space O(1). For each filled cell, scan its row, column, and box.",
        "optimizedComplexity": "Time O(81); Space O(1). Bit masks track used digits per row, column, and box.",
        "recursiveComplexity": "Time O(81); Space O(81). Recursive scan carries row, column, and box sets.",
        "bruteForceCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    for (int r = 0; r \u003c 9; r++) {\n      for (int c = 0; c \u003c 9; c++) {\n        if (board[r][c] != '.' \u0026\u0026 !validAt(board, r, c)) return false;\n      }\n    }\n    return true;\n  }\n\n  private boolean validAt(char[][] board, int row, int col) {\n    for (int c = 0; c \u003c 9; c++) if (c != col \u0026\u0026 board[row][c] == board[row][col]) return false;\n    for (int r = 0; r \u003c 9; r++) if (r != row \u0026\u0026 board[r][col] == board[row][col]) return false;\n    int br = row / 3 * 3, bc = col / 3 * 3;\n    for (int r = br; r \u003c br + 3; r++) for (int c = bc; c \u003c bc + 3; c++) {\n      if ((r != row || c != col) \u0026\u0026 board[r][c] == board[row][col]) return false;\n    }\n    return true;\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    int[] rows = new int[9];\n    int[] cols = new int[9];\n    int[] boxes = new int[9];\n    for (int r = 0; r \u003c 9; r++) {\n      for (int c = 0; c \u003c 9; c++) {\n        if (board[r][c] == '.') continue;\n        int bit = 1 \u003c\u003c (board[r][c] - '1');\n        int box = (r / 3) * 3 + c / 3;\n        if ((rows[r] \u0026 bit) != 0 || (cols[c] \u0026 bit) != 0 || (boxes[box] \u0026 bit) != 0) return false;\n        rows[r] |= bit;\n        cols[c] |= bit;\n        boxes[box] |= bit;\n      }\n    }\n    return true;\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    return scan(board, 0, new int[9], new int[9], new int[9]);\n  }\n\n  private boolean scan(char[][] board, int index, int[] rows, int[] cols, int[] boxes) {\n    if (index == 81) return true;\n    int r = index / 9, c = index % 9;\n    if (board[r][c] == '.') return scan(board, index + 1, rows, cols, boxes);\n    int bit = 1 \u003c\u003c (board[r][c] - '1');\n    int box = (r / 3) * 3 + c / 3;\n    if ((rows[r] \u0026 bit) != 0 || (cols[c] \u0026 bit) != 0 || (boxes[box] \u0026 bit) != 0) return false;\n    rows[r] |= bit;\n    cols[c] |= bit;\n    boxes[box] |= bit;\n    return scan(board, index + 1, rows, cols, boxes);\n  }\n}",
        "optimizedCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    int[] rows = new int[9];\n    int[] cols = new int[9];\n    int[] boxes = new int[9];\n    for (int r = 0; r \u003c 9; r++) {\n      for (int c = 0; c \u003c 9; c++) {\n        if (board[r][c] == '.') continue;\n        int bit = 1 \u003c\u003c (board[r][c] - '1');\n        int box = (r / 3) * 3 + c / 3;\n        if ((rows[r] \u0026 bit) != 0 || (cols[c] \u0026 bit) != 0 || (boxes[box] \u0026 bit) != 0) return false;\n        rows[r] |= bit;\n        cols[c] |= bit;\n        boxes[box] |= bit;\n      }\n    }\n    return true;\n  }\n}",
        "code": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    int[] rows = new int[9];\n    int[] cols = new int[9];\n    int[] boxes = new int[9];\n    for (int r = 0; r \u003c 9; r++) {\n      for (int c = 0; c \u003c 9; c++) {\n        if (board[r][c] == '.') continue;\n        int bit = 1 \u003c\u003c (board[r][c] - '1');\n        int box = (r / 3) * 3 + c / 3;\n        if ((rows[r] \u0026 bit) != 0 || (cols[c] \u0026 bit) != 0 || (boxes[box] \u0026 bit) != 0) return false;\n        rows[r] |= bit;\n        cols[c] |= bit;\n        boxes[box] |= bit;\n      }\n    }\n    return true;\n  }\n}"
      }
    ]
  },
  "sorting": {
    "id": "sorting",
    "name": "Sorting Revision",
    "summary": "Dutch flag sorting, selection, comparator sorting, linked-list sorting, and merge-sort counting.",
    "checklist": [
      "The output depends on relative order, rank, or grouping after values are ordered.",
      "Intervals, events, or points become easy after sorting by start, end, height, position, or a custom key.",
      "Only a small value range exists, so counting or bucket sort can replace comparison sort.",
      "The problem asks for kth/top/frequency/rank, which often means partition, heap, or bucket after counting.",
      "Counting pairs during ordering hints at merge sort, Fenwick compression, or sweep-line sorting."
    ],
    "mistakes": [
      "Sorting in the wrong direction for greedy interval problems.",
      "Forgetting tie-breakers in custom comparators, especially largest number, queue reconstruction, and team ranking.",
      "Using subtraction in comparators and risking integer overflow.",
      "Breaking stability assumptions when the problem needs original values preserved through sorting.",
      "Ignoring duplicate values in count buckets, coordinate compression, or uniqueness problems.",
      "Returning sorted helper structures instead of mutating the required input array/list.",
      "Using recursion for linked lists without cutting the list, causing cycles or infinite recursion."
    ],
    "edgeCases": [
      "Empty input where allowed and single-element input.",
      "All elements equal or many duplicates.",
      "Already sorted, reverse sorted, and partially sorted inputs.",
      "Negative values and large positive values in comparators or pair counting.",
      "Intervals that touch at endpoints versus truly overlap.",
      "Custom comparator ties that must fall back to lexicographic or index order.",
      "Very small value ranges where buckets beat O(n log n) sorting."
    ],
    "complexities": [
      "Comparison sort usually costs Time O(n log n), Space O(log n) to O(n) depending on implementation.",
      "Counting and bucket sort cost Time O(n + range), Space O(range).",
      "Quickselect averages Time O(n), Space O(1) iterative or O(log n) expected recursive stack.",
      "Merge-sort counting costs Time O(n log n), Space O(n).",
      "Two-pointer partitioning costs Time O(n), Space O(1).",
      "Sorting intervals then scanning costs Time O(n log n), Space O(log n) to O(n).",
      "Linked-list merge sort costs Time O(n log n), Space O(log n) recursive stack or O(1) iterative links."
    ],
    "mentalModel": [
      "Choose the key first: value, frequency, endpoint, start time, distance, rank, or custom concatenation.",
      "After sorting, ask what single scan state is enough: previous end, room count, bucket index, write pointer, or best gap.",
      "For kth/top problems, avoid fully sorting when partition or buckets answer only the needed rank.",
      "When counting pairs, sort while merging so cross-pairs are counted before order is destroyed.",
      "Tie-breakers are part of the algorithm, not formatting details."
    ],
    "revisionStrategy": [
      "Solve these 5 important Sorting problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Sort Colors",
        "difficulty": "Medium",
        "subpattern": "Dutch national flag partition",
        "question": "Given an array nums containing only 0, 1, and 2, sort it in-place so equal colors are grouped in the order 0, 1, 2.",
        "trigger": "Only three ordered values exist, so a three-way partition can place each value in one pass.",
        "intuition": "Keep zones for 0s on the left, unknown values in the middle, and 2s on the right.",
        "edgeCases": "Empty array, one element, all same color, reverse order 2s then 1s then 0s, many middle 1s.",
        "constraints": "1 \u003c= nums.length \u003c= 300; nums[i] is 0, 1, or 2; mutate nums in-place.",
        "source": {
          "label": "Sort Colors - LeetCode 75",
          "url": "https://leetcode.com/problems/sort-colors/"
        },
        "examples": [
          {
            "input": "nums = [2,0,2,1,1,0]",
            "output": "[0,0,1,1,2,2]",
            "explanation": "All 0s move left and all 2s move right."
          },
          {
            "input": "nums = [2,0,1]",
            "output": "[0,1,2]",
            "explanation": "One pass partitions three values."
          },
          {
            "input": "nums = [1,1,1]",
            "output": "[1,1,1]",
            "explanation": "Middle values stay in the unknown scan zone until consumed."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(1). Count each color, then overwrite the array.",
        "optimizedComplexity": "Time O(n); Space O(1). Dutch national flag partition scans each index at most once.",
        "recursiveComplexity": "Time O(n); Space O(n). Recursive partition keeps the same three zones with call-stack depth n.",
        "bruteForceCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int[] count = new int[3];\n    for (int value : nums) count[value]++;\n    int index = 0;\n    for (int color = 0; color \u003c count.length; color++) {\n      while (count[color]-- \u003e 0) nums[index++] = color;\n    }\n  }\n}",
        "iterativeCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0;\n    int mid = 0;\n    int high = nums.length - 1;\n    while (mid \u003c= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 2) swap(nums, mid, high--);\n      else mid++;\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
        "recursiveCode": "class Solution {\n  public void sortColors(int[] nums) {\n    partition(nums, 0, 0, nums.length - 1);\n  }\n\n  private void partition(int[] nums, int low, int mid, int high) {\n    if (mid \u003e high) return;\n    if (nums[mid] == 0) {\n      swap(nums, low, mid);\n      partition(nums, low + 1, mid + 1, high);\n    } else if (nums[mid] == 2) {\n      swap(nums, mid, high);\n      partition(nums, low, mid, high - 1);\n    } else {\n      partition(nums, low, mid + 1, high);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
        "optimizedCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0;\n    int mid = 0;\n    int high = nums.length - 1;\n    while (mid \u003c= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 2) swap(nums, mid, high--);\n      else mid++;\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
        "code": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0;\n    int mid = 0;\n    int high = nums.length - 1;\n    while (mid \u003c= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 2) swap(nums, mid, high--);\n      else mid++;\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Kth Largest Element in an Array",
        "difficulty": "Medium",
        "subpattern": "Quickselect partition",
        "question": "Given an integer array nums and an integer k, return the kth largest element in the array.",
        "trigger": "Only one rank is needed, so full sorting does extra work.",
        "intuition": "Convert kth largest to sorted index n-k and partition until that index is fixed.",
        "edgeCases": "k is 1, k is nums.length, duplicates, negative numbers, already sorted input.",
        "constraints": "1 \u003c= k \u003c= nums.length \u003c= 100000; -10000 \u003c= nums[i] \u003c= 10000.",
        "source": {
          "label": "Kth Largest Element in an Array - LeetCode 215",
          "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
        },
        "examples": [
          {
            "input": "nums = [3,2,1,5,6,4], k = 2",
            "output": "5",
            "explanation": "The sorted order is [1,2,3,4,5,6]."
          },
          {
            "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
            "output": "4",
            "explanation": "Duplicates count as separate elements."
          },
          {
            "input": "nums = [1], k = 1",
            "output": "1",
            "explanation": "The only element is the first largest."
          }
        ],
        "bruteForceComplexity": "Time O(n log n); Space O(log n). Sort all values and index n-k.",
        "optimizedComplexity": "Average Time O(n), worst O(n^2); Space O(1). Iterative quickselect partitions in-place.",
        "recursiveComplexity": "Average Time O(n), worst O(n^2); Space O(n) worst stack. Recursive quickselect narrows one partition.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
        "iterativeCode": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    int target = nums.length - k;\n    int left = 0;\n    int right = nums.length - 1;\n    while (left \u003c= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot \u003c target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return -1;\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i \u003c right; i++) {\n      if (nums[i] \u003c= pivotValue) swap(nums, store++, i);\n    }\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    return select(nums, 0, nums.length - 1, nums.length - k);\n  }\n\n  private int select(int[] nums, int left, int right, int target) {\n    int pivot = partition(nums, left, right);\n    if (pivot == target) return nums[pivot];\n    if (pivot \u003c target) return select(nums, pivot + 1, right, target);\n    return select(nums, left, pivot - 1, target);\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i \u003c right; i++) if (nums[i] \u003c= pivotValue) swap(nums, store++, i);\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
        "optimizedCode": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    int target = nums.length - k;\n    int left = 0;\n    int right = nums.length - 1;\n    while (left \u003c= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot \u003c target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return -1;\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i \u003c right; i++) {\n      if (nums[i] \u003c= pivotValue) swap(nums, store++, i);\n    }\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
        "code": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    int target = nums.length - k;\n    int left = 0;\n    int right = nums.length - 1;\n    while (left \u003c= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot \u003c target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return -1;\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i \u003c right; i++) {\n      if (nums[i] \u003c= pivotValue) swap(nums, store++, i);\n    }\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Largest Number",
        "difficulty": "Medium",
        "subpattern": "Concatenation comparator ordering",
        "question": "Given a list of non-negative integers, arrange them so they form the largest possible number as a string.",
        "trigger": "Numeric order is wrong; two numbers must be ordered by which concatenation is larger.",
        "intuition": "Place a before b when a+b is lexicographically larger than b+a.",
        "edgeCases": "All zeros, shared prefixes like 3 and 30, single number, repeated values, very large concatenated result.",
        "constraints": "1 \u003c= nums.length \u003c= 100; 0 \u003c= nums[i] \u003c= 1000000000.",
        "source": {
          "label": "Largest Number - LeetCode 179",
          "url": "https://leetcode.com/problems/largest-number/"
        },
        "examples": [
          {
            "input": "nums = [10,2]",
            "output": "\"210\"",
            "explanation": "2 before 10 makes 210 larger than 102."
          },
          {
            "input": "nums = [3,30,34,5,9]",
            "output": "\"9534330\"",
            "explanation": "Pairwise concatenation decides the custom order."
          },
          {
            "input": "nums = [0,0]",
            "output": "\"0\"",
            "explanation": "Leading zeros collapse to one zero."
          }
        ],
        "bruteForceComplexity": "Time O(n^2 * d); Space O(n*d). Bubble-sort strings with the concatenation comparator.",
        "optimizedComplexity": "Time O(n log n * d); Space O(n*d). Sort string forms by a+b versus b+a.",
        "recursiveComplexity": "Average Time O(n log n * d), worst O(n^2*d); Space O(n*d + stack). Recursive quicksort uses the same comparator.",
        "bruteForceCode": "class Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i \u003c nums.length; i++) values[i] = String.valueOf(nums[i]);\n    for (int i = 0; i \u003c values.length; i++) {\n      for (int j = 1; j \u003c values.length - i; j++) {\n        if ((values[j] + values[j - 1]).compareTo(values[j - 1] + values[j]) \u003e 0) {\n          String temp = values[j];\n          values[j] = values[j - 1];\n          values[j - 1] = temp;\n        }\n      }\n    }\n    return build(values);\n  }\n\n  private String build(String[] values) {\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i \u003c nums.length; i++) values[i] = String.valueOf(nums[i]);\n    Arrays.sort(values, (a, b) -\u003e (b + a).compareTo(a + b));\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}",
        "recursiveCode": "class Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i \u003c nums.length; i++) values[i] = String.valueOf(nums[i]);\n    quickSort(values, 0, values.length - 1);\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n\n  private void quickSort(String[] values, int left, int right) {\n    if (left \u003e= right) return;\n    int pivot = partition(values, left, right);\n    quickSort(values, left, pivot - 1);\n    quickSort(values, pivot + 1, right);\n  }\n\n  private int partition(String[] values, int left, int right) {\n    String pivot = values[right];\n    int store = left;\n    for (int i = left; i \u003c right; i++) {\n      if ((values[i] + pivot).compareTo(pivot + values[i]) \u003e= 0) swap(values, store++, i);\n    }\n    swap(values, store, right);\n    return store;\n  }\n\n  private void swap(String[] values, int i, int j) {\n    String temp = values[i];\n    values[i] = values[j];\n    values[j] = temp;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i \u003c nums.length; i++) values[i] = String.valueOf(nums[i]);\n    Arrays.sort(values, (a, b) -\u003e (b + a).compareTo(a + b));\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i \u003c nums.length; i++) values[i] = String.valueOf(nums[i]);\n    Arrays.sort(values, (a, b) -\u003e (b + a).compareTo(a + b));\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Sort List",
        "difficulty": "Medium",
        "subpattern": "Linked-list merge sort",
        "question": "Given the head of a linked list, sort the list in ascending order and return the sorted head.",
        "trigger": "Linked lists cannot random-access efficiently, so merge sort is the natural O(n log n) sorting method.",
        "intuition": "Split the list with slow/fast pointers, sort each half, then merge sorted lists by relinking nodes.",
        "edgeCases": "Empty list, one node, duplicates, already sorted list, reverse sorted list.",
        "constraints": "0 \u003c= number of nodes \u003c= 50000; -100000 \u003c= Node.val \u003c= 100000.",
        "source": {
          "label": "Sort List - LeetCode 148",
          "url": "https://leetcode.com/problems/sort-list/"
        },
        "examples": [
          {
            "input": "head = [4,2,1,3]",
            "output": "[1,2,3,4]",
            "explanation": "Merge sort orders the linked nodes."
          },
          {
            "input": "head = [-1,5,3,4,0]",
            "output": "[-1,0,3,4,5]",
            "explanation": "Negative and positive values are both sorted."
          },
          {
            "input": "head = []",
            "output": "[]",
            "explanation": "An empty list stays empty."
          }
        ],
        "bruteForceComplexity": "Time O(n log n); Space O(n). Copy values to an array, sort, and write them back.",
        "optimizedComplexity": "Time O(n log n); Space O(1) extra links. Bottom-up merge sort relinks nodes iteratively.",
        "recursiveComplexity": "Time O(n log n); Space O(log n). Recursive merge sort splits and merges linked lists.",
        "bruteForceCode": "import java.util.*;\n\nclass ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    List\u003cInteger\u003e values = new ArrayList\u003c\u003e();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    Collections.sort(values);\n    int index = 0;\n    for (ListNode node = head; node != null; node = node.next) node.val = values.get(index++);\n    return head;\n  }\n}",
        "iterativeCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n    ListNode dummy = new ListNode(0, head);\n    for (int size = 1; size \u003c length; size *= 2) {\n      ListNode current = dummy.next;\n      ListNode tail = dummy;\n      while (current != null) {\n        ListNode left = current;\n        ListNode right = split(left, size);\n        current = split(right, size);\n        tail = merge(left, right, tail);\n      }\n    }\n    return dummy.next;\n  }\n\n  private ListNode split(ListNode head, int size) {\n    for (int i = 1; head != null \u0026\u0026 i \u003c size; i++) head = head.next;\n    if (head == null) return null;\n    ListNode second = head.next;\n    head.next = null;\n    return second;\n  }\n\n  private ListNode merge(ListNode a, ListNode b, ListNode tail) {\n    while (a != null \u0026\u0026 b != null) {\n      if (a.val \u003c= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n    tail.next = (a != null) ? a : b;\n    while (tail.next != null) tail = tail.next;\n    return tail;\n  }\n}",
        "recursiveCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    if (head == null || head.next == null) return head;\n    ListNode slow = head;\n    ListNode fast = head.next;\n    while (fast != null \u0026\u0026 fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    ListNode right = slow.next;\n    slow.next = null;\n    return merge(sortList(head), sortList(right));\n  }\n\n  private ListNode merge(ListNode a, ListNode b) {\n    if (a == null) return b;\n    if (b == null) return a;\n    if (a.val \u003c= b.val) {\n      a.next = merge(a.next, b);\n      return a;\n    }\n    b.next = merge(a, b.next);\n    return b;\n  }\n}",
        "optimizedCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n    ListNode dummy = new ListNode(0, head);\n    for (int size = 1; size \u003c length; size *= 2) {\n      ListNode current = dummy.next;\n      ListNode tail = dummy;\n      while (current != null) {\n        ListNode left = current;\n        ListNode right = split(left, size);\n        current = split(right, size);\n        tail = merge(left, right, tail);\n      }\n    }\n    return dummy.next;\n  }\n\n  private ListNode split(ListNode head, int size) {\n    for (int i = 1; head != null \u0026\u0026 i \u003c size; i++) head = head.next;\n    if (head == null) return null;\n    ListNode second = head.next;\n    head.next = null;\n    return second;\n  }\n\n  private ListNode merge(ListNode a, ListNode b, ListNode tail) {\n    while (a != null \u0026\u0026 b != null) {\n      if (a.val \u003c= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n    tail.next = (a != null) ? a : b;\n    while (tail.next != null) tail = tail.next;\n    return tail;\n  }\n}",
        "code": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n    ListNode dummy = new ListNode(0, head);\n    for (int size = 1; size \u003c length; size *= 2) {\n      ListNode current = dummy.next;\n      ListNode tail = dummy;\n      while (current != null) {\n        ListNode left = current;\n        ListNode right = split(left, size);\n        current = split(right, size);\n        tail = merge(left, right, tail);\n      }\n    }\n    return dummy.next;\n  }\n\n  private ListNode split(ListNode head, int size) {\n    for (int i = 1; head != null \u0026\u0026 i \u003c size; i++) head = head.next;\n    if (head == null) return null;\n    ListNode second = head.next;\n    head.next = null;\n    return second;\n  }\n\n  private ListNode merge(ListNode a, ListNode b, ListNode tail) {\n    while (a != null \u0026\u0026 b != null) {\n      if (a.val \u003c= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n    tail.next = (a != null) ? a : b;\n    while (tail.next != null) tail = tail.next;\n    return tail;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Count of Smaller Numbers After Self",
        "difficulty": "Hard",
        "subpattern": "Merge-sort smaller-count accumulation",
        "question": "Given nums, return counts where counts[i] is the number of smaller elements to the right of nums[i].",
        "trigger": "While sorting by value, each right-side element moved before a left element represents one smaller element after it.",
        "intuition": "Preserve original indices and accumulate how many right-half values pass each left-half value during merge.",
        "edgeCases": "Duplicates, negative numbers, sorted ascending, sorted descending, single element.",
        "constraints": "1 \u003c= nums.length \u003c= 100000; -10000 \u003c= nums[i] \u003c= 10000.",
        "source": {
          "label": "Count of Smaller Numbers After Self - LeetCode 315",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        "examples": [
          {
            "input": "nums = [5,2,6,1]",
            "output": "[2,1,1,0]",
            "explanation": "5 has smaller values 2 and 1 after it."
          },
          {
            "input": "nums = [-1]",
            "output": "[0]",
            "explanation": "No values appear after the only element."
          },
          {
            "input": "nums = [-1,-1]",
            "output": "[0,0]",
            "explanation": "Equal values are not smaller."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(n). Count smaller elements to the right for every index.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree over coordinate-compressed values scans from right.",
        "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort accumulates right-half values crossing left indices.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    Integer[] answer = new Integer[nums.length];\n    for (int i = 0; i \u003c nums.length; i++) {\n      int count = 0;\n      for (int j = i + 1; j \u003c nums.length; j++) if (nums[j] \u003c nums[i]) count++;\n      answer[i] = count;\n    }\n    return Arrays.asList(answer);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map\u003cInteger, Integer\u003e rank = new HashMap\u003c\u003e();\n    int id = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i \u003e= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      update(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int n = nums.length;\n    int[] indexes = new int[n];\n    int[] temp = new int[n];\n    int[] counts = new int[n];\n    for (int i = 0; i \u003c n; i++) indexes[i] = i;\n    sort(nums, indexes, temp, counts, 0, n - 1);\n    List\u003cInteger\u003e answer = new ArrayList\u003c\u003e();\n    for (int count : counts) answer.add(count);\n    return answer;\n  }\n\n  private void sort(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int right) {\n    if (left \u003e= right) return;\n    int mid = left + (right - left) / 2;\n    sort(nums, indexes, temp, counts, left, mid);\n    sort(nums, indexes, temp, counts, mid + 1, right);\n    merge(nums, indexes, temp, counts, left, mid, right);\n  }\n\n  private void merge(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left, smaller = 0;\n    while (i \u003c= mid \u0026\u0026 j \u003c= right) {\n      if (nums[indexes[j]] \u003c nums[indexes[i]]) {\n        temp[k++] = indexes[j++];\n        smaller++;\n      } else {\n        counts[indexes[i]] += smaller;\n        temp[k++] = indexes[i++];\n      }\n    }\n    while (i \u003c= mid) {\n      counts[indexes[i]] += smaller;\n      temp[k++] = indexes[i++];\n    }\n    while (j \u003c= right) temp[k++] = indexes[j++];\n    for (int p = left; p \u003c= right; p++) indexes[p] = temp[p];\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map\u003cInteger, Integer\u003e rank = new HashMap\u003c\u003e();\n    int id = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i \u003e= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      update(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map\u003cInteger, Integer\u003e rank = new HashMap\u003c\u003e();\n    int id = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i \u003e= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      update(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}"
      }
    ]
  },
  "design": {
    "id": "design",
    "name": "Design Revision",
    "summary": "High-frequency object design problems with maps, linked nodes, heaps, timestamps, and APIs.",
    "checklist": [
      "The prompt defines a class with constructor plus repeated method calls that mutate shared state.",
      "Operations require asymptotic guarantees such as O(1), O(log n), or efficient streaming updates.",
      "A simple value return is not enough; the object must preserve history, order, frequency, or versions.",
      "The correct internal structure usually combines two ideas: map plus list, heap plus map, trie plus DFS, or sweep map plus counters.",
      "Method-call examples should be simulated exactly because design bugs hide in operation ordering."
    ],
    "mistakes": [
      "Forgetting to update every structure on mutation, such as map and linked list in caches.",
      "Returning stale state after an overwrite, removal, or frequency change.",
      "Breaking tie rules: least recent, least frequent, lexicographic, timestamp order, or insertion order.",
      "Using static fields in snippets, causing multiple object instances to share state incorrectly.",
      "Ignoring boundary calls such as empty iterator, full queue, missing path, or absent key.",
      "Using random access on linked structures when an index map or cursor should be maintained.",
      "Implementing the visible API with the wrong class or method names."
    ],
    "edgeCases": [
      "Capacity zero or full capacity where the problem allows it.",
      "Repeated updates to the same key or same object id.",
      "Calls on empty state: getMin, getMaxKey, next, pop, back, forward, or get.",
      "Duplicate timestamps, equal frequencies, equal hotness, and lexicographic tie-breakers.",
      "Intervals that touch exactly at start or end.",
      "Nested empty lists, empty strings, root paths, and missing parent paths.",
      "Many operations that stress pruning, eviction, or stale cached values."
    ],
    "complexities": [
      "Hash map plus linked list designs target O(1) update, delete, and move-to-front operations.",
      "Heap-backed stream designs usually cost O(log k) per add and O(k) or O(1) for read depending on stored state.",
      "TreeMap and binary-search designs cost O(log n) for predecessor/successor or timestamp lookup.",
      "Trie designs cost O(length) per insert/search plus DFS size for wildcard or autocomplete collection.",
      "Sweep-line calendar designs cost O(n) to validate after each update unless upgraded to segment trees.",
      "Iterator designs pay O(total elements) upfront for eager flattening or amortized O(1) for lazy stacks.",
      "Snapshot/versioned structures cost O(log versions) per historical get after O(1) append-style set."
    ],
    "mentalModel": [
      "Name the invariant first: recency order, frequency groups, cursor position, active interval count, or trie prefix state.",
      "For every method, write which structures it reads and which structures it must update together.",
      "Separate API behavior from storage choice; then pick the storage that keeps the invariant cheap.",
      "Treat tie-breakers as part of the invariant, not as final sorting decoration.",
      "Replay the sample call sequence after implementation; design correctness is state-transition correctness."
    ],
    "revisionStrategy": [
      "Solve these 5 important Design problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "LRU Cache",
        "difficulty": "Medium",
        "subpattern": "Hash map plus doubly linked list cache",
        "question": "Design an LRUCache with get(key) and put(key,value). get returns the value or -1, and put inserts or updates while evicting the least recently used key when capacity is exceeded.",
        "trigger": "Requires O(1) lookup plus O(1) recency updates and eviction.",
        "intuition": "Use a hash map for key lookup and a doubly linked list ordered from most recent to least recent.",
        "edgeCases": "Updating an existing key, capacity one, repeated get calls, eviction after put, missing key.",
        "constraints": "1 \u003c= capacity \u003c= 3000; up to 200000 calls; 0 \u003c= key,value \u003c= 10000.",
        "source": {
          "label": "LRU Cache - LeetCode 146",
          "url": "https://leetcode.com/problems/lru-cache/"
        },
        "examples": [
          {
            "input": "LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)",
            "output": "1, then -1",
            "explanation": "get(1) makes key 1 recent, so key 2 is evicted."
          },
          {
            "input": "LRUCache(1); put(1,1); put(2,2); get(1); get(2)",
            "output": "-1, then 2",
            "explanation": "Capacity one keeps only the newest key."
          },
          {
            "input": "put(2,1); put(2,2); get(2)",
            "output": "2",
            "explanation": "Updating a key also refreshes its recency."
          }
        ],
        "bruteForceComplexity": "get Time O(n), put Time O(n); Space O(capacity). Scan arrays for keys and oldest timestamps.",
        "optimizedComplexity": "get Time O(1), put Time O(1); Space O(capacity). Hash map plus doubly linked list.",
        "recursiveComplexity": "get Time O(n), put Time O(n); Space O(capacity + n stack). Recursive helpers find keys and eviction victim.",
        "bruteForceCode": "import java.util.*;\n\nclass LRUCache {\n  private final int capacity;\n  private int clock = 0;\n  private final List\u003cint[]\u003e entries = new ArrayList\u003c\u003e();\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    for (int[] entry : entries) {\n      if (entry[0] == key) {\n        entry[2] = ++clock;\n        return entry[1];\n      }\n    }\n    return -1;\n  }\n\n  public void put(int key, int value) {\n    for (int[] entry : entries) {\n      if (entry[0] == key) {\n        entry[1] = value;\n        entry[2] = ++clock;\n        return;\n      }\n    }\n    if (entries.size() == capacity) {\n      int victim = 0;\n      for (int i = 1; i \u003c entries.size(); i++) if (entries.get(i)[2] \u003c entries.get(victim)[2]) victim = i;\n      entries.remove(victim);\n    }\n    entries.add(new int[]{key, value, ++clock});\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass LRUCache {\n  private static class Node {\n    int key;\n    int value;\n    Node prev;\n    Node next;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private final Map\u003cInteger, Node\u003e map = new HashMap\u003c\u003e();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.prev = head;\n  }\n\n  public int get(int key) {\n    Node node = map.get(key);\n    if (node == null) return -1;\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = map.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n    if (map.size() == capacity) {\n      Node victim = tail.prev;\n      remove(victim);\n      map.remove(victim.key);\n    }\n    Node created = new Node(key, value);\n    map.put(key, created);\n    addAfterHead(created);\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void remove(Node node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n\n  private void addAfterHead(Node node) {\n    node.next = head.next;\n    node.prev = head;\n    head.next.prev = node;\n    head.next = node;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass LRUCache {\n  private final int capacity;\n  private int clock = 0;\n  private final List\u003cint[]\u003e entries = new ArrayList\u003c\u003e();\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    int index = find(key, 0);\n    if (index == -1) return -1;\n    entries.get(index)[2] = ++clock;\n    return entries.get(index)[1];\n  }\n\n  public void put(int key, int value) {\n    int index = find(key, 0);\n    if (index != -1) {\n      int[] entry = entries.get(index);\n      entry[1] = value;\n      entry[2] = ++clock;\n      return;\n    }\n    if (entries.size() == capacity) entries.remove(oldest(1, 0));\n    entries.add(new int[]{key, value, ++clock});\n  }\n\n  private int find(int key, int index) {\n    if (index == entries.size()) return -1;\n    return entries.get(index)[0] == key ? index : find(key, index + 1);\n  }\n\n  private int oldest(int index, int best) {\n    if (index == entries.size()) return best;\n    if (entries.get(index)[2] \u003c entries.get(best)[2]) best = index;\n    return oldest(index + 1, best);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass LRUCache {\n  private static class Node {\n    int key;\n    int value;\n    Node prev;\n    Node next;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private final Map\u003cInteger, Node\u003e map = new HashMap\u003c\u003e();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.prev = head;\n  }\n\n  public int get(int key) {\n    Node node = map.get(key);\n    if (node == null) return -1;\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = map.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n    if (map.size() == capacity) {\n      Node victim = tail.prev;\n      remove(victim);\n      map.remove(victim.key);\n    }\n    Node created = new Node(key, value);\n    map.put(key, created);\n    addAfterHead(created);\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void remove(Node node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n\n  private void addAfterHead(Node node) {\n    node.next = head.next;\n    node.prev = head;\n    head.next.prev = node;\n    head.next = node;\n  }\n}",
        "code": "import java.util.*;\n\nclass LRUCache {\n  private static class Node {\n    int key;\n    int value;\n    Node prev;\n    Node next;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private final Map\u003cInteger, Node\u003e map = new HashMap\u003c\u003e();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.prev = head;\n  }\n\n  public int get(int key) {\n    Node node = map.get(key);\n    if (node == null) return -1;\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = map.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n    if (map.size() == capacity) {\n      Node victim = tail.prev;\n      remove(victim);\n      map.remove(victim.key);\n    }\n    Node created = new Node(key, value);\n    map.put(key, created);\n    addAfterHead(created);\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void remove(Node node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n\n  private void addAfterHead(Node node) {\n    node.next = head.next;\n    node.prev = head;\n    head.next.prev = node;\n    head.next = node;\n  }\n}"
      },
      {
        "group": "core",
        "name": "LFU Cache",
        "difficulty": "Hard",
        "subpattern": "Frequency buckets cache",
        "question": "Design an LFUCache with get and put. When full, evict the least frequently used key; if tied, evict the least recently used among those keys.",
        "trigger": "Requires lookup, frequency increase, and min-frequency eviction with recency tie-breaking.",
        "intuition": "Map keys to nodes and map each frequency to an ordered set of keys; track the current minimum frequency.",
        "edgeCases": "Capacity zero, updating existing key, frequency tie, minFreq changing after bucket becomes empty, repeated gets.",
        "constraints": "0 \u003c= capacity \u003c= 10000; up to 200000 calls; key and value are non-negative integers.",
        "source": {
          "label": "LFU Cache - LeetCode 460",
          "url": "https://leetcode.com/problems/lfu-cache/"
        },
        "examples": [
          {
            "input": "LFUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); get(3)",
            "output": "1, -1, 3",
            "explanation": "Key 2 has lower frequency and is evicted."
          },
          {
            "input": "put(1,1); put(2,2); get(1); get(2); put(3,3)",
            "output": "evicts key 1 or 2 by LRU among equal frequency after operations",
            "explanation": "Ties use recency inside the frequency bucket."
          },
          {
            "input": "LFUCache(0); put(1,1); get(1)",
            "output": "-1",
            "explanation": "Zero capacity stores nothing."
          }
        ],
        "bruteForceComplexity": "get Time O(1), put Time O(n); Space O(capacity). Scan all keys to find eviction victim.",
        "optimizedComplexity": "get Time O(1), put Time O(1); Space O(capacity). Frequency buckets keep LRU order per frequency.",
        "recursiveComplexity": "get Time O(1), put Time O(n); Space O(capacity + n stack). Recursive eviction scan applies frequency and recency tie rules.",
        "bruteForceCode": "import java.util.*;\n\nclass LFUCache {\n  private final int capacity;\n  private int time = 0;\n  private final Map\u003cInteger, int[]\u003e map = new HashMap\u003c\u003e();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    int[] data = map.get(key);\n    if (data == null) return -1;\n    data[1]++;\n    data[2] = ++time;\n    return data[0];\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    if (map.containsKey(key)) {\n      int[] data = map.get(key);\n      data[0] = value;\n      data[1]++;\n      data[2] = ++time;\n      return;\n    }\n    if (map.size() == capacity) {\n      int victim = 0;\n      boolean chosen = false;\n      for (int current : map.keySet()) {\n        if (!chosen || worse(current, victim)) {\n          victim = current;\n          chosen = true;\n        }\n      }\n      map.remove(victim);\n    }\n    map.put(key, new int[]{value, 1, ++time});\n  }\n\n  private boolean worse(int a, int b) {\n    int[] x = map.get(a), y = map.get(b);\n    if (x[1] != y[1]) return x[1] \u003c y[1];\n    return x[2] \u003c y[2];\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass LFUCache {\n  private static class Node {\n    int key, value, frequency = 1;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private int minFreq = 0;\n  private final Map\u003cInteger, Node\u003e nodes = new HashMap\u003c\u003e();\n  private final Map\u003cInteger, LinkedHashSet\u003cInteger\u003e\u003e buckets = new HashMap\u003c\u003e();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n    touch(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      touch(node);\n      return;\n    }\n    if (nodes.size() == capacity) {\n      LinkedHashSet\u003cInteger\u003e bucket = buckets.get(minFreq);\n      int victim = bucket.iterator().next();\n      bucket.remove(victim);\n      nodes.remove(victim);\n    }\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    buckets.computeIfAbsent(1, ignored -\u003e new LinkedHashSet\u003c\u003e()).add(key);\n    minFreq = 1;\n  }\n\n  private void touch(Node node) {\n    LinkedHashSet\u003cInteger\u003e oldBucket = buckets.get(node.frequency);\n    oldBucket.remove(node.key);\n    if (node.frequency == minFreq \u0026\u0026 oldBucket.isEmpty()) minFreq++;\n    node.frequency++;\n    buckets.computeIfAbsent(node.frequency, ignored -\u003e new LinkedHashSet\u003c\u003e()).add(node.key);\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass LFUCache {\n  private final int capacity;\n  private int time = 0;\n  private final Map\u003cInteger, int[]\u003e map = new HashMap\u003c\u003e();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    int[] data = map.get(key);\n    if (data == null) return -1;\n    data[1]++;\n    data[2] = ++time;\n    return data[0];\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    if (map.containsKey(key)) {\n      int[] data = map.get(key);\n      data[0] = value;\n      data[1]++;\n      data[2] = ++time;\n      return;\n    }\n    if (map.size() == capacity) {\n      List\u003cInteger\u003e keys = new ArrayList\u003c\u003e(map.keySet());\n      map.remove(victim(keys, 1, keys.get(0)));\n    }\n    map.put(key, new int[]{value, 1, ++time});\n  }\n\n  private int victim(List\u003cInteger\u003e keys, int index, int best) {\n    if (index == keys.size()) return best;\n    int key = keys.get(index);\n    int[] current = map.get(key), chosen = map.get(best);\n    if (current[1] \u003c chosen[1] || (current[1] == chosen[1] \u0026\u0026 current[2] \u003c chosen[2])) best = key;\n    return victim(keys, index + 1, best);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass LFUCache {\n  private static class Node {\n    int key, value, frequency = 1;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private int minFreq = 0;\n  private final Map\u003cInteger, Node\u003e nodes = new HashMap\u003c\u003e();\n  private final Map\u003cInteger, LinkedHashSet\u003cInteger\u003e\u003e buckets = new HashMap\u003c\u003e();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n    touch(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      touch(node);\n      return;\n    }\n    if (nodes.size() == capacity) {\n      LinkedHashSet\u003cInteger\u003e bucket = buckets.get(minFreq);\n      int victim = bucket.iterator().next();\n      bucket.remove(victim);\n      nodes.remove(victim);\n    }\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    buckets.computeIfAbsent(1, ignored -\u003e new LinkedHashSet\u003c\u003e()).add(key);\n    minFreq = 1;\n  }\n\n  private void touch(Node node) {\n    LinkedHashSet\u003cInteger\u003e oldBucket = buckets.get(node.frequency);\n    oldBucket.remove(node.key);\n    if (node.frequency == minFreq \u0026\u0026 oldBucket.isEmpty()) minFreq++;\n    node.frequency++;\n    buckets.computeIfAbsent(node.frequency, ignored -\u003e new LinkedHashSet\u003c\u003e()).add(node.key);\n  }\n}",
        "code": "import java.util.*;\n\nclass LFUCache {\n  private static class Node {\n    int key, value, frequency = 1;\n    Node(int key, int value) { this.key = key; this.value = value; }\n  }\n\n  private final int capacity;\n  private int minFreq = 0;\n  private final Map\u003cInteger, Node\u003e nodes = new HashMap\u003c\u003e();\n  private final Map\u003cInteger, LinkedHashSet\u003cInteger\u003e\u003e buckets = new HashMap\u003c\u003e();\n\n  public LFUCache(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n    touch(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    if (capacity == 0) return;\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      touch(node);\n      return;\n    }\n    if (nodes.size() == capacity) {\n      LinkedHashSet\u003cInteger\u003e bucket = buckets.get(minFreq);\n      int victim = bucket.iterator().next();\n      bucket.remove(victim);\n      nodes.remove(victim);\n    }\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    buckets.computeIfAbsent(1, ignored -\u003e new LinkedHashSet\u003c\u003e()).add(key);\n    minFreq = 1;\n  }\n\n  private void touch(Node node) {\n    LinkedHashSet\u003cInteger\u003e oldBucket = buckets.get(node.frequency);\n    oldBucket.remove(node.key);\n    if (node.frequency == minFreq \u0026\u0026 oldBucket.isEmpty()) minFreq++;\n    node.frequency++;\n    buckets.computeIfAbsent(node.frequency, ignored -\u003e new LinkedHashSet\u003c\u003e()).add(node.key);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Time Based Key-Value Store",
        "difficulty": "Medium",
        "subpattern": "Timestamped binary-search map",
        "question": "Design TimeMap with set(key,value,timestamp) and get(key,timestamp), returning the value with the greatest timestamp \u003c= timestamp or empty string.",
        "trigger": "Each key has historical versions queried by floor timestamp.",
        "intuition": "Store each key's values in timestamp order and binary search for the last valid timestamp.",
        "edgeCases": "Missing key, query before first timestamp, exact timestamp, multiple keys, increasing timestamps per key.",
        "constraints": "Timestamps are strictly increasing for each key in set calls; up to 200000 operations.",
        "source": {
          "label": "Time Based Key-Value Store - LeetCode 981",
          "url": "https://leetcode.com/problems/time-based-key-value-store/"
        },
        "examples": [
          {
            "input": "set(\"foo\",\"bar\",1); get(\"foo\",1); get(\"foo\",3)",
            "output": "\"bar\", \"bar\"",
            "explanation": "Timestamp 1 is the latest value at both query times."
          },
          {
            "input": "set(\"foo\",\"bar2\",4); get(\"foo\",4); get(\"foo\",5)",
            "output": "\"bar2\", \"bar2\"",
            "explanation": "The newer value applies from timestamp 4 onward."
          },
          {
            "input": "get(\"missing\",10)",
            "output": "\"\"",
            "explanation": "Unknown keys return an empty string."
          }
        ],
        "bruteForceComplexity": "set Time O(1), get Time O(v); Space O(total sets). Scan all versions for the key.",
        "optimizedComplexity": "set Time O(1), get Time O(log v); Space O(total sets). Binary search sorted timestamp versions.",
        "recursiveComplexity": "set Time O(1), get Time O(log v); Space O(total sets + log v stack). Recursive binary search finds floor timestamp.",
        "bruteForceCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map\u003cString, List\u003cEntry\u003e\u003e map = new HashMap\u003c\u003e();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -\u003e new ArrayList\u003c\u003e()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    String answer = \"\";\n    for (Entry entry : map.getOrDefault(key, Collections.emptyList())) {\n      if (entry.timestamp \u003c= timestamp) answer = entry.value;\n    }\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map\u003cString, List\u003cEntry\u003e\u003e map = new HashMap\u003c\u003e();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -\u003e new ArrayList\u003c\u003e()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List\u003cEntry\u003e list = map.get(key);\n    if (list == null) return \"\";\n    int left = 0, right = list.size() - 1;\n    String answer = \"\";\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid).timestamp \u003c= timestamp) {\n        answer = list.get(mid).value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map\u003cString, List\u003cEntry\u003e\u003e map = new HashMap\u003c\u003e();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -\u003e new ArrayList\u003c\u003e()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List\u003cEntry\u003e list = map.get(key);\n    if (list == null) return \"\";\n    return search(list, timestamp, 0, list.size() - 1, \"\");\n  }\n\n  private String search(List\u003cEntry\u003e list, int timestamp, int left, int right, String answer) {\n    if (left \u003e right) return answer;\n    int mid = left + (right - left) / 2;\n    if (list.get(mid).timestamp \u003c= timestamp) return search(list, timestamp, mid + 1, right, list.get(mid).value);\n    return search(list, timestamp, left, mid - 1, answer);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map\u003cString, List\u003cEntry\u003e\u003e map = new HashMap\u003c\u003e();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -\u003e new ArrayList\u003c\u003e()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List\u003cEntry\u003e list = map.get(key);\n    if (list == null) return \"\";\n    int left = 0, right = list.size() - 1;\n    String answer = \"\";\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid).timestamp \u003c= timestamp) {\n        answer = list.get(mid).value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass TimeMap {\n  private static class Entry {\n    int timestamp;\n    String value;\n    Entry(String value, int timestamp) { this.value = value; this.timestamp = timestamp; }\n  }\n\n  private final Map\u003cString, List\u003cEntry\u003e\u003e map = new HashMap\u003c\u003e();\n\n  public void set(String key, String value, int timestamp) {\n    map.computeIfAbsent(key, ignored -\u003e new ArrayList\u003c\u003e()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List\u003cEntry\u003e list = map.get(key);\n    if (list == null) return \"\";\n    int left = 0, right = list.size() - 1;\n    String answer = \"\";\n    while (left \u003c= right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid).timestamp \u003c= timestamp) {\n        answer = list.get(mid).value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Insert Delete GetRandom O(1)",
        "difficulty": "Medium",
        "subpattern": "Array plus index map random set",
        "question": "Design RandomizedSet supporting insert, remove, and getRandom, with average O(1) time for each operation.",
        "trigger": "Need both membership lookup and random index access.",
        "intuition": "Store values in an array list and map each value to its index; delete by swapping with the last value.",
        "edgeCases": "Insert existing value, remove missing value, remove last element, remove middle element, getRandom after deletions.",
        "constraints": "Values fit int; at least one element exists when getRandom is called; up to 200000 calls.",
        "source": {
          "label": "Insert Delete GetRandom O(1) - LeetCode 380",
          "url": "https://leetcode.com/problems/insert-delete-getrandom-o1/"
        },
        "examples": [
          {
            "input": "insert(1); remove(2); insert(2); getRandom(); remove(1); insert(2)",
            "output": "true, false, true, 1 or 2, true, false",
            "explanation": "Duplicate insert returns false and random chooses an existing value."
          },
          {
            "input": "insert(0); remove(0)",
            "output": "true, true",
            "explanation": "Removing the only element leaves the set empty."
          },
          {
            "input": "insert(1); insert(1)",
            "output": "true, false",
            "explanation": "Set membership is unique."
          }
        ],
        "bruteForceComplexity": "insert/remove Time O(n), getRandom Time O(1); Space O(n). Scan a list for membership and removal.",
        "optimizedComplexity": "insert/remove/getRandom average Time O(1); Space O(n). Array list plus value-to-index map.",
        "recursiveComplexity": "insert/remove Time O(n), getRandom Time O(1); Space O(n + stack). Recursive search locates values.",
        "bruteForceCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List\u003cInteger\u003e values = new ArrayList\u003c\u003e();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (values.contains(val)) return false;\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    int index = values.indexOf(val);\n    if (index == -1) return false;\n    values.remove(index);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List\u003cInteger\u003e values = new ArrayList\u003c\u003e();\n  private final Map\u003cInteger, Integer\u003e index = new HashMap\u003c\u003e();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size());\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    Integer i = index.get(val);\n    if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last);\n    index.put(last, i);\n    values.remove(values.size() - 1);\n    index.remove(val);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List\u003cInteger\u003e values = new ArrayList\u003c\u003e();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (find(val, 0) != -1) return false;\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    int index = find(val, 0);\n    if (index == -1) return false;\n    values.remove(index);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n\n  private int find(int val, int index) {\n    if (index == values.size()) return -1;\n    if (values.get(index) == val) return index;\n    return find(val, index + 1);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List\u003cInteger\u003e values = new ArrayList\u003c\u003e();\n  private final Map\u003cInteger, Integer\u003e index = new HashMap\u003c\u003e();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size());\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    Integer i = index.get(val);\n    if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last);\n    index.put(last, i);\n    values.remove(values.size() - 1);\n    index.remove(val);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}",
        "code": "import java.util.*;\n\nclass RandomizedSet {\n  private final List\u003cInteger\u003e values = new ArrayList\u003c\u003e();\n  private final Map\u003cInteger, Integer\u003e index = new HashMap\u003c\u003e();\n  private final Random random = new Random(0);\n\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size());\n    values.add(val);\n    return true;\n  }\n\n  public boolean remove(int val) {\n    Integer i = index.get(val);\n    if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last);\n    index.put(last, i);\n    values.remove(values.size() - 1);\n    index.remove(val);\n    return true;\n  }\n\n  public int getRandom() {\n    return values.get(random.nextInt(values.size()));\n  }\n}"
      },
      {
        "group": "core",
        "name": "Design Twitter",
        "difficulty": "Medium",
        "subpattern": "Social feed fan-out merge",
        "question": "Design Twitter with postTweet, getNewsFeed, follow, and unfollow. News feed returns up to 10 most recent tweet ids by the user and followed users.",
        "trigger": "Feed reads must merge recent items across multiple followed authors by timestamp.",
        "intuition": "Store tweets per user with timestamps and merge followed users' recent tweets using a heap or scan.",
        "edgeCases": "User follows self, unfollow self should not remove own feed, fewer than 10 tweets, no follows, multiple tweets by same user.",
        "constraints": "User ids and tweet ids are positive; at most 30000 operations.",
        "source": {
          "label": "Design Twitter - LeetCode 355",
          "url": "https://leetcode.com/problems/design-twitter/"
        },
        "examples": [
          {
            "input": "postTweet(1,5); getNewsFeed(1); follow(1,2); postTweet(2,6); getNewsFeed(1)",
            "output": "[5], then [6,5]",
            "explanation": "Following user 2 includes their newer tweet."
          },
          {
            "input": "unfollow(1,2); getNewsFeed(1)",
            "output": "[5]",
            "explanation": "After unfollowing, user 2 tweets disappear."
          },
          {
            "input": "getNewsFeed(99)",
            "output": "[]",
            "explanation": "A user with no tweets and follows has an empty feed."
          }
        ],
        "bruteForceComplexity": "post/follow/unfollow Time O(1), getNewsFeed Time O(total tweets log total tweets); Space O(total tweets + follows). Sort visible tweets each request.",
        "optimizedComplexity": "post/follow/unfollow Time O(1), getNewsFeed Time O(f log f + 10 log f); Space O(total tweets + follows). Heap-merge recent tweets per followed user.",
        "recursiveComplexity": "post/follow/unfollow Time O(1), getNewsFeed Time O(total tweets); Space O(total tweets + follows + stack). Recursively scans global tweets backward.",
        "bruteForceCode": "import java.util.*;\n\nclass Twitter {\n  private int time = 0;\n  private final List\u003cint[]\u003e tweets = new ArrayList\u003c\u003e();\n  private final Map\u003cInteger, Set\u003cInteger\u003e\u003e follows = new HashMap\u003c\u003e();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.add(new int[]{++time, userId, tweetId});\n  }\n\n  public List\u003cInteger\u003e getNewsFeed(int userId) {\n    List\u003cint[]\u003e visible = new ArrayList\u003c\u003e();\n    Set\u003cInteger\u003e followees = follows.getOrDefault(userId, Collections.emptySet());\n    for (int[] tweet : tweets) if (tweet[1] == userId || followees.contains(tweet[1])) visible.add(tweet);\n    visible.sort((a, b) -\u003e Integer.compare(b[0], a[0]));\n    List\u003cInteger\u003e feed = new ArrayList\u003c\u003e();\n    for (int i = 0; i \u003c visible.size() \u0026\u0026 i \u003c 10; i++) feed.add(visible.get(i)[2]);\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -\u003e new HashSet\u003c\u003e()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Twitter {\n  private static class Tweet {\n    int id, time;\n    Tweet next;\n    Tweet(int id, int time, Tweet next) { this.id = id; this.time = time; this.next = next; }\n  }\n\n  private int time = 0;\n  private final Map\u003cInteger, Tweet\u003e tweets = new HashMap\u003c\u003e();\n  private final Map\u003cInteger, Set\u003cInteger\u003e\u003e follows = new HashMap\u003c\u003e();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.put(userId, new Tweet(tweetId, ++time, tweets.get(userId)));\n  }\n\n  public List\u003cInteger\u003e getNewsFeed(int userId) {\n    Set\u003cInteger\u003e users = new HashSet\u003c\u003e(follows.getOrDefault(userId, Collections.emptySet()));\n    users.add(userId);\n    PriorityQueue\u003cTweet\u003e heap = new PriorityQueue\u003c\u003e((a, b) -\u003e Integer.compare(b.time, a.time));\n    for (int user : users) if (tweets.get(user) != null) heap.offer(tweets.get(user));\n    List\u003cInteger\u003e feed = new ArrayList\u003c\u003e();\n    while (!heap.isEmpty() \u0026\u0026 feed.size() \u003c 10) {\n      Tweet tweet = heap.poll();\n      feed.add(tweet.id);\n      if (tweet.next != null) heap.offer(tweet.next);\n    }\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -\u003e new HashSet\u003c\u003e()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Twitter {\n  private int time = 0;\n  private final List\u003cint[]\u003e tweets = new ArrayList\u003c\u003e();\n  private final Map\u003cInteger, Set\u003cInteger\u003e\u003e follows = new HashMap\u003c\u003e();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.add(new int[]{++time, userId, tweetId});\n  }\n\n  public List\u003cInteger\u003e getNewsFeed(int userId) {\n    List\u003cInteger\u003e feed = new ArrayList\u003c\u003e();\n    collect(userId, tweets.size() - 1, feed);\n    return feed;\n  }\n\n  private void collect(int userId, int index, List\u003cInteger\u003e feed) {\n    if (index \u003c 0 || feed.size() == 10) return;\n    int[] tweet = tweets.get(index);\n    if (tweet[1] == userId || follows.getOrDefault(userId, Collections.emptySet()).contains(tweet[1])) feed.add(tweet[2]);\n    collect(userId, index - 1, feed);\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -\u003e new HashSet\u003c\u003e()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Twitter {\n  private static class Tweet {\n    int id, time;\n    Tweet next;\n    Tweet(int id, int time, Tweet next) { this.id = id; this.time = time; this.next = next; }\n  }\n\n  private int time = 0;\n  private final Map\u003cInteger, Tweet\u003e tweets = new HashMap\u003c\u003e();\n  private final Map\u003cInteger, Set\u003cInteger\u003e\u003e follows = new HashMap\u003c\u003e();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.put(userId, new Tweet(tweetId, ++time, tweets.get(userId)));\n  }\n\n  public List\u003cInteger\u003e getNewsFeed(int userId) {\n    Set\u003cInteger\u003e users = new HashSet\u003c\u003e(follows.getOrDefault(userId, Collections.emptySet()));\n    users.add(userId);\n    PriorityQueue\u003cTweet\u003e heap = new PriorityQueue\u003c\u003e((a, b) -\u003e Integer.compare(b.time, a.time));\n    for (int user : users) if (tweets.get(user) != null) heap.offer(tweets.get(user));\n    List\u003cInteger\u003e feed = new ArrayList\u003c\u003e();\n    while (!heap.isEmpty() \u0026\u0026 feed.size() \u003c 10) {\n      Tweet tweet = heap.poll();\n      feed.add(tweet.id);\n      if (tweet.next != null) heap.offer(tweet.next);\n    }\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -\u003e new HashSet\u003c\u003e()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}",
        "code": "import java.util.*;\n\nclass Twitter {\n  private static class Tweet {\n    int id, time;\n    Tweet next;\n    Tweet(int id, int time, Tweet next) { this.id = id; this.time = time; this.next = next; }\n  }\n\n  private int time = 0;\n  private final Map\u003cInteger, Tweet\u003e tweets = new HashMap\u003c\u003e();\n  private final Map\u003cInteger, Set\u003cInteger\u003e\u003e follows = new HashMap\u003c\u003e();\n\n  public void postTweet(int userId, int tweetId) {\n    tweets.put(userId, new Tweet(tweetId, ++time, tweets.get(userId)));\n  }\n\n  public List\u003cInteger\u003e getNewsFeed(int userId) {\n    Set\u003cInteger\u003e users = new HashSet\u003c\u003e(follows.getOrDefault(userId, Collections.emptySet()));\n    users.add(userId);\n    PriorityQueue\u003cTweet\u003e heap = new PriorityQueue\u003c\u003e((a, b) -\u003e Integer.compare(b.time, a.time));\n    for (int user : users) if (tweets.get(user) != null) heap.offer(tweets.get(user));\n    List\u003cInteger\u003e feed = new ArrayList\u003c\u003e();\n    while (!heap.isEmpty() \u0026\u0026 feed.size() \u003c 10) {\n      Tweet tweet = heap.poll();\n      feed.add(tweet.id);\n      if (tweet.next != null) heap.offer(tweet.next);\n    }\n    return feed;\n  }\n\n  public void follow(int followerId, int followeeId) {\n    if (followerId != followeeId) follows.computeIfAbsent(followerId, ignored -\u003e new HashSet\u003c\u003e()).add(followeeId);\n  }\n\n  public void unfollow(int followerId, int followeeId) {\n    if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);\n  }\n}"
      }
    ]
  },
  "segment-tree": {
    "id": "segment-tree",
    "name": "Segment Tree / Fenwick Revision",
    "summary": "Mutable range queries, Fenwick counting, reverse pairs, range sums, and calendar range aggregation.",
    "checklist": [
      "The problem asks for many range queries and point or range updates on the same data.",
      "Naive recomputation would rescan O(n) per query, causing O(nq) time.",
      "Queries use prefixes, counts by rank, coordinate-compressed values, interval coverage, or range min/max/sum/gcd/xor.",
      "Updates affect one point or a whole interval and later queries must see the changed state.",
      "Offline sorting plus Fenwick/segment tree can replace nested loops when counting ordered pairs or ranks."
    ],
    "mistakes": [
      "Mixing 0-indexed input with 1-indexed Fenwick internals.",
      "Forgetting to coordinate-compress all values needed by both updates and queries.",
      "Using int when pair counts or sums need long arithmetic.",
      "Not pushing lazy values before partially overlapping child queries.",
      "Treating inclusive ranges and half-open ranges the same.",
      "Updating an original array value but not applying the delta to the tree.",
      "For majority/count candidates, returning the segment-tree candidate without verifying its real frequency."
    ],
    "edgeCases": [
      "Single element arrays and one-cell matrices.",
      "Empty query results, missing keys, or intervals that only touch at endpoints.",
      "Duplicate values in compression and pair-counting problems.",
      "Negative numbers and large values in reverse-pair/count-range-sum problems.",
      "Full-range updates, full-range queries, and repeated updates on the same index.",
      "Lazy propagation with nested overlapping updates.",
      "Fenwick find-kth when k is 1, total count, or invalid for current frequency totals."
    ],
    "complexities": [
      "Fenwick point update and prefix/range sum: Time O(log n), Space O(n).",
      "2D Fenwick update and rectangle sum: Time O(log m log n), Space O(mn).",
      "Segment tree point update and range query: Time O(log n), Space O(n).",
      "Lazy segment tree range update and range query: Time O(log n), Space O(n).",
      "Dynamic segment tree over huge coordinates: Time O(log C), Space O(number of touched nodes).",
      "Coordinate compression adds Time O(n log n) preprocessing and Space O(n).",
      "Merge-sort counting is Time O(n log n), Space O(n), often the recursive counterpart to Fenwick counting."
    ],
    "mentalModel": [
      "Fenwick answers prefix-shaped aggregation; convert range queries to prefix(right) - prefix(left-1).",
      "Segment trees store enough aggregate information for a segment so two child answers can merge into a parent answer.",
      "Lazy propagation means record work at a node now and push it to children only when a query/update needs them.",
      "Coordinate compression keeps order while shrinking huge values into dense indexes.",
      "For counting problems, scan in the direction that turns “previous” or “future” elements into already-updated tree state."
    ],
    "revisionStrategy": [
      "Solve these 5 important Segment Tree / Fenwick problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Range Sum Query Mutable",
        "difficulty": "Medium",
        "subpattern": "Fenwick point update range sum",
        "question": "Design NumArray with update(index,val) and sumRange(left,right), where sumRange returns the current sum of nums[left..right].",
        "trigger": "The same array receives point updates and many range-sum queries.",
        "intuition": "Store prefix deltas in a Fenwick tree so a point update changes O(log n) nodes and a range sum is two prefixes.",
        "edgeCases": "Single element array, update to same value, negative numbers, full-range query, repeated updates on one index.",
        "constraints": "1 \u003c= nums.length \u003c= 30000; up to 30000 calls; values fit in signed int.",
        "source": {
          "label": "Range Sum Query Mutable - LeetCode 307",
          "url": "https://leetcode.com/problems/range-sum-query-mutable/"
        },
        "examples": [
          {
            "input": "NumArray([1,3,5]); sumRange(0,2)",
            "output": "9",
            "explanation": "The initial full range sums to 9."
          },
          {
            "input": "update(1,2); sumRange(0,2)",
            "output": "8",
            "explanation": "The array becomes [1,2,5]."
          },
          {
            "input": "NumArray([7]); update(0,4); sumRange(0,0)",
            "output": "4",
            "explanation": "Single index updates and queries are valid."
          }
        ],
        "bruteForceComplexity": "update Time O(1), sumRange Time O(n); Space O(n). Store the array and scan the requested range.",
        "optimizedComplexity": "update Time O(log n), sumRange Time O(log n); Space O(n). Fenwick tree stores prefix deltas.",
        "recursiveComplexity": "update Time O(log n), sumRange Time O(log n); Space O(n). Recursive segment tree splits ranges.",
        "bruteForceCode": "class NumArray {\n  private final int[] nums;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n  }\n\n  public void update(int index, int val) {\n    nums[index] = val;\n  }\n\n  public int sumRange(int left, int right) {\n    int sum = 0;\n    for (int i = left; i \u003c= right; i++) sum += nums[i];\n    return sum;\n  }\n}",
        "iterativeCode": "class NumArray {\n  private final int[] nums;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n    this.tree = new int[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) add(i + 1, nums[i]);\n  }\n\n  public void update(int index, int val) {\n    int delta = val - nums[index];\n    nums[index] = val;\n    add(index + 1, delta);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix(right + 1) - prefix(left);\n  }\n\n  private void add(int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int prefix(int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "recursiveCode": "class NumArray {\n  private final int n;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    n = nums.length;\n    tree = new int[4 * n];\n    build(nums, 1, 0, n - 1);\n  }\n\n  public void update(int index, int val) {\n    update(1, 0, n - 1, index, val);\n  }\n\n  public int sumRange(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int[] nums, int node, int left, int right) {\n    if (left == right) {\n      tree[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(nums, node * 2, left, mid);\n    build(nums, node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private void update(int node, int left, int right, int index, int val) {\n    if (left == right) {\n      tree[node] = val;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index \u003c= mid) update(node * 2, left, mid, index, val);\n    else update(node * 2 + 1, mid + 1, right, index, val);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr \u003c left || right \u003c ql) return 0;\n    if (ql \u003c= left \u0026\u0026 right \u003c= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return query(node * 2, left, mid, ql, qr) + query(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n}",
        "optimizedCode": "class NumArray {\n  private final int[] nums;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n    this.tree = new int[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) add(i + 1, nums[i]);\n  }\n\n  public void update(int index, int val) {\n    int delta = val - nums[index];\n    nums[index] = val;\n    add(index + 1, delta);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix(right + 1) - prefix(left);\n  }\n\n  private void add(int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int prefix(int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "code": "class NumArray {\n  private final int[] nums;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n    this.tree = new int[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) add(i + 1, nums[i]);\n  }\n\n  public void update(int index, int val) {\n    int delta = val - nums[index];\n    nums[index] = val;\n    add(index + 1, delta);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix(right + 1) - prefix(left);\n  }\n\n  private void add(int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int prefix(int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Count of Smaller Numbers After Self",
        "difficulty": "Hard",
        "subpattern": "Fenwick coordinate compression counting",
        "question": "Given nums, return counts where counts[i] is the number of smaller elements to the right of nums[i].",
        "trigger": "While scanning right to left, already-seen values represent elements after the current index.",
        "intuition": "Compress values to ranks, query how many ranks are below current, then add the current rank.",
        "edgeCases": "Duplicates, negative values, sorted ascending, sorted descending, single element.",
        "constraints": "1 \u003c= nums.length \u003c= 100000; values fit in signed int.",
        "source": {
          "label": "Count of Smaller Numbers After Self - LeetCode 315",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        "examples": [
          {
            "input": "nums = [5,2,6,1]",
            "output": "[2,1,1,0]",
            "explanation": "5 has smaller values 2 and 1 after it."
          },
          {
            "input": "nums = [-1]",
            "output": "[0]",
            "explanation": "No elements appear after the only value."
          },
          {
            "input": "nums = [-1,-1]",
            "output": "[0,0]",
            "explanation": "Equal values are not smaller."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(n). Count smaller elements by scanning every suffix.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree over compressed ranks.",
        "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort counts right-half values that cross each left index.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    Integer[] answer = new Integer[nums.length];\n    for (int i = 0; i \u003c nums.length; i++) {\n      int count = 0;\n      for (int j = i + 1; j \u003c nums.length; j++) if (nums[j] \u003c nums[i]) count++;\n      answer[i] = count;\n    }\n    return Arrays.asList(answer);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map\u003cInteger, Integer\u003e rank = new HashMap\u003c\u003e();\n    int next = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, next++);\n    int[] tree = new int[next + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i \u003e= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      add(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int n = nums.length;\n    int[] indexes = new int[n];\n    int[] temp = new int[n];\n    int[] counts = new int[n];\n    for (int i = 0; i \u003c n; i++) indexes[i] = i;\n    sort(nums, indexes, temp, counts, 0, n - 1);\n    List\u003cInteger\u003e answer = new ArrayList\u003c\u003e();\n    for (int count : counts) answer.add(count);\n    return answer;\n  }\n\n  private void sort(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int right) {\n    if (left \u003e= right) return;\n    int mid = left + (right - left) / 2;\n    sort(nums, indexes, temp, counts, left, mid);\n    sort(nums, indexes, temp, counts, mid + 1, right);\n    merge(nums, indexes, temp, counts, left, mid, right);\n  }\n\n  private void merge(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left, smaller = 0;\n    while (i \u003c= mid \u0026\u0026 j \u003c= right) {\n      if (nums[indexes[j]] \u003c nums[indexes[i]]) {\n        temp[k++] = indexes[j++];\n        smaller++;\n      } else {\n        counts[indexes[i]] += smaller;\n        temp[k++] = indexes[i++];\n      }\n    }\n    while (i \u003c= mid) {\n      counts[indexes[i]] += smaller;\n      temp[k++] = indexes[i++];\n    }\n    while (j \u003c= right) temp[k++] = indexes[j++];\n    for (int p = left; p \u003c= right; p++) indexes[p] = temp[p];\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map\u003cInteger, Integer\u003e rank = new HashMap\u003c\u003e();\n    int next = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, next++);\n    int[] tree = new int[next + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i \u003e= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      add(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger\u003e countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map\u003cInteger, Integer\u003e rank = new HashMap\u003c\u003e();\n    int next = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, next++);\n    int[] tree = new int[next + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i \u003e= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      add(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Reverse Pairs",
        "difficulty": "Hard",
        "subpattern": "Fenwick reverse-pair threshold counting",
        "question": "Given nums, count pairs i \u003c j where nums[i] \u003e 2 * nums[j].",
        "trigger": "Each new value needs to know how many previous values are greater than twice it.",
        "intuition": "Compress values and doubled values; Fenwick stores previous values and queries how many are above 2*x.",
        "edgeCases": "Negative values, duplicates, integer overflow in 2*x, sorted ascending, sorted descending.",
        "constraints": "1 \u003c= nums.length \u003c= 50000; values fit in signed int.",
        "source": {
          "label": "Reverse Pairs - LeetCode 493",
          "url": "https://leetcode.com/problems/reverse-pairs/"
        },
        "examples": [
          {
            "input": "nums = [1,3,2,3,1]",
            "output": "2",
            "explanation": "Two pairs satisfy the strict double relation."
          },
          {
            "input": "nums = [2,4,3,5,1]",
            "output": "3",
            "explanation": "Three left values are more than double a later value."
          },
          {
            "input": "nums = [-5,-5]",
            "output": "1",
            "explanation": "-5 \u003e -10 is true for the ordered pair."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(1). Check every ordered pair using long arithmetic.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree over compressed nums and doubled thresholds.",
        "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort counts cross pairs before merging sorted halves.",
        "bruteForceCode": "class Solution {\n  public int reversePairs(int[] nums) {\n    int count = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      for (int j = i + 1; j \u003c nums.length; j++) {\n        if ((long) nums[i] \u003e 2L * nums[j]) count++;\n      }\n    }\n    return count;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet\u003cLong\u003e values = new TreeSet\u003c\u003e();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map\u003cLong, Integer\u003e rank = new HashMap\u003c\u003e();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      int notGreater = query(tree, rank.get(2L * nums[i]));\n      pairs += i - notGreater;\n      add(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int reversePairs(int[] nums) {\n    return sort(nums, new int[nums.length], 0, nums.length - 1);\n  }\n\n  private int sort(int[] nums, int[] temp, int left, int right) {\n    if (left \u003e= right) return 0;\n    int mid = left + (right - left) / 2;\n    int count = sort(nums, temp, left, mid) + sort(nums, temp, mid + 1, right);\n    int j = mid + 1;\n    for (int i = left; i \u003c= mid; i++) {\n      while (j \u003c= right \u0026\u0026 (long) nums[i] \u003e 2L * nums[j]) j++;\n      count += j - (mid + 1);\n    }\n    merge(nums, temp, left, mid, right);\n    return count;\n  }\n\n  private void merge(int[] nums, int[] temp, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left;\n    while (i \u003c= mid \u0026\u0026 j \u003c= right) temp[k++] = nums[i] \u003c= nums[j] ? nums[i++] : nums[j++];\n    while (i \u003c= mid) temp[k++] = nums[i++];\n    while (j \u003c= right) temp[k++] = nums[j++];\n    for (int p = left; p \u003c= right; p++) nums[p] = temp[p];\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet\u003cLong\u003e values = new TreeSet\u003c\u003e();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map\u003cLong, Integer\u003e rank = new HashMap\u003c\u003e();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      int notGreater = query(tree, rank.get(2L * nums[i]));\n      pairs += i - notGreater;\n      add(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet\u003cLong\u003e values = new TreeSet\u003c\u003e();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map\u003cLong, Integer\u003e rank = new HashMap\u003c\u003e();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      int notGreater = query(tree, rank.get(2L * nums[i]));\n      pairs += i - notGreater;\n      add(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Count of Range Sum",
        "difficulty": "Hard",
        "subpattern": "Prefix-sum coordinate compression",
        "question": "Given nums and bounds lower and upper, count range sums nums[i..j] whose sum lies in [lower, upper].",
        "trigger": "Each current prefix sum needs previous prefixes in a value interval.",
        "intuition": "For prefix sum s, count previous prefix p where s-upper \u003c= p \u003c= s-lower using compressed prefix values.",
        "edgeCases": "Negative values, zero-length prefix, lower equals upper, large sums needing long, all zeros.",
        "constraints": "1 \u003c= nums.length \u003c= 100000; values and bounds fit int; count can exceed int during computation.",
        "source": {
          "label": "Count of Range Sum - LeetCode 327",
          "url": "https://leetcode.com/problems/count-of-range-sum/"
        },
        "examples": [
          {
            "input": "nums = [-2,5,-1], lower = -2, upper = 2",
            "output": "3",
            "explanation": "Three subarrays have sums inside the target range."
          },
          {
            "input": "nums = [0], lower = 0, upper = 0",
            "output": "1",
            "explanation": "The single zero sum is valid."
          },
          {
            "input": "nums = [1,-1], lower = 0, upper = 0",
            "output": "1",
            "explanation": "The full subarray sums to zero."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(n). Build prefix sums and test every pair.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree counts previous compressed prefix sums in the needed interval.",
        "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort counts valid cross-prefix ranges while sorting prefix sums.",
        "bruteForceCode": "class Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    int count = 0;\n    for (int i = 0; i \u003c prefix.length; i++) {\n      for (int j = i + 1; j \u003c prefix.length; j++) {\n        long sum = prefix[j] - prefix[i];\n        if (lower \u003c= sum \u0026\u0026 sum \u003c= upper) count++;\n      }\n    }\n    return count;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    long[] sorted = prefix.clone();\n    Arrays.sort(sorted);\n    sorted = unique(sorted);\n    int[] tree = new int[sorted.length + 1];\n    int count = 0;\n    add(tree, rank(sorted, 0), 1);\n    for (int i = 1; i \u003c prefix.length; i++) {\n      long leftValue = prefix[i] - upper;\n      long rightValue = prefix[i] - lower;\n      int left = lowerBound(sorted, leftValue) + 1;\n      int right = upperBound(sorted, rightValue);\n      count += query(tree, right) - query(tree, left - 1);\n      add(tree, rank(sorted, prefix[i]), 1);\n    }\n    return count;\n  }\n\n  private long[] unique(long[] values) {\n    int size = 0;\n    for (long value : values) if (size == 0 || values[size - 1] != value) values[size++] = value;\n    return Arrays.copyOf(values, size);\n  }\n\n  private int rank(long[] values, long target) {\n    return lowerBound(values, target) + 1;\n  }\n\n  private int lowerBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left \u003c right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] \u003c target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left \u003c right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] \u003c= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    return sort(prefix, new long[prefix.length], 0, prefix.length - 1, lower, upper);\n  }\n\n  private int sort(long[] sums, long[] temp, int left, int right, int lower, int upper) {\n    if (left \u003e= right) return 0;\n    int mid = left + (right - left) / 2;\n    int count = sort(sums, temp, left, mid, lower, upper) + sort(sums, temp, mid + 1, right, lower, upper);\n    int start = mid + 1, end = mid + 1;\n    for (int i = left; i \u003c= mid; i++) {\n      while (start \u003c= right \u0026\u0026 sums[start] - sums[i] \u003c lower) start++;\n      while (end \u003c= right \u0026\u0026 sums[end] - sums[i] \u003c= upper) end++;\n      count += end - start;\n    }\n    merge(sums, temp, left, mid, right);\n    return count;\n  }\n\n  private void merge(long[] sums, long[] temp, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left;\n    while (i \u003c= mid \u0026\u0026 j \u003c= right) temp[k++] = sums[i] \u003c= sums[j] ? sums[i++] : sums[j++];\n    while (i \u003c= mid) temp[k++] = sums[i++];\n    while (j \u003c= right) temp[k++] = sums[j++];\n    for (int p = left; p \u003c= right; p++) sums[p] = temp[p];\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    long[] sorted = prefix.clone();\n    Arrays.sort(sorted);\n    sorted = unique(sorted);\n    int[] tree = new int[sorted.length + 1];\n    int count = 0;\n    add(tree, rank(sorted, 0), 1);\n    for (int i = 1; i \u003c prefix.length; i++) {\n      long leftValue = prefix[i] - upper;\n      long rightValue = prefix[i] - lower;\n      int left = lowerBound(sorted, leftValue) + 1;\n      int right = upperBound(sorted, rightValue);\n      count += query(tree, right) - query(tree, left - 1);\n      add(tree, rank(sorted, prefix[i]), 1);\n    }\n    return count;\n  }\n\n  private long[] unique(long[] values) {\n    int size = 0;\n    for (long value : values) if (size == 0 || values[size - 1] != value) values[size++] = value;\n    return Arrays.copyOf(values, size);\n  }\n\n  private int rank(long[] values, long target) {\n    return lowerBound(values, target) + 1;\n  }\n\n  private int lowerBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left \u003c right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] \u003c target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left \u003c right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] \u003c= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i \u003c nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    long[] sorted = prefix.clone();\n    Arrays.sort(sorted);\n    sorted = unique(sorted);\n    int[] tree = new int[sorted.length + 1];\n    int count = 0;\n    add(tree, rank(sorted, 0), 1);\n    for (int i = 1; i \u003c prefix.length; i++) {\n      long leftValue = prefix[i] - upper;\n      long rightValue = prefix[i] - lower;\n      int left = lowerBound(sorted, leftValue) + 1;\n      int right = upperBound(sorted, rightValue);\n      count += query(tree, right) - query(tree, left - 1);\n      add(tree, rank(sorted, prefix[i]), 1);\n    }\n    return count;\n  }\n\n  private long[] unique(long[] values) {\n    int size = 0;\n    for (long value : values) if (size == 0 || values[size - 1] != value) values[size++] = value;\n    return Arrays.copyOf(values, size);\n  }\n\n  private int rank(long[] values, long target) {\n    return lowerBound(values, target) + 1;\n  }\n\n  private int lowerBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left \u003c right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] \u003c target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left \u003c right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] \u003c= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index \u003c tree.length) {\n      tree[index] += delta;\n      index += index \u0026 -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index \u003e 0) {\n      sum += tree[index];\n      index -= index \u0026 -index;\n    }\n    return sum;\n  }\n}"
      },
      {
        "group": "core",
        "name": "My Calendar III",
        "difficulty": "Hard",
        "subpattern": "Dynamic segment tree range add max",
        "question": "Design MyCalendarThree where book(start,end) adds a half-open event [start,end) and returns the maximum number of overlapping events so far.",
        "trigger": "Each booking is a range add of +1, and the answer is the global maximum active count.",
        "intuition": "A dynamic segment tree over [0,1e9] supports range add and keeps max overlap at the root.",
        "edgeCases": "Touching endpoints, nested intervals, identical intervals, disjoint intervals, huge coordinates.",
        "constraints": "0 \u003c= start \u003c end \u003c= 1e9; up to 400 calls.",
        "source": {
          "label": "My Calendar III - LeetCode 732",
          "url": "https://leetcode.com/problems/my-calendar-iii/"
        },
        "examples": [
          {
            "input": "book(10,20); book(50,60); book(10,40)",
            "output": "1,1,2",
            "explanation": "The third booking overlaps [10,20)."
          },
          {
            "input": "book(5,15); book(5,10); book(25,55)",
            "output": "3,3,3 after the sample continuation",
            "explanation": "The maximum overlap reaches three."
          },
          {
            "input": "book(1,2); book(2,3)",
            "output": "1,1",
            "explanation": "Touching half-open intervals do not overlap."
          }
        ],
        "bruteForceComplexity": "book Time O(n^2); Space O(n). Count active intervals at every booking start after each add.",
        "optimizedComplexity": "book Time O(n) for sweep-map implementation here; Space O(n). Ordered deltas compute max active count.",
        "recursiveComplexity": "book Time O(log C); Space O(number of touched nodes). Dynamic lazy segment tree over the coordinate domain.",
        "bruteForceCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final List\u003cint[]\u003e bookings = new ArrayList\u003c\u003e();\n\n  public int book(int start, int end) {\n    bookings.add(new int[]{start, end});\n    int best = 0;\n    for (int[] point : bookings) {\n      int active = 0;\n      int time = point[0];\n      for (int[] booking : bookings) if (booking[0] \u003c= time \u0026\u0026 time \u003c booking[1]) active++;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap\u003cInteger, Integer\u003e delta = new TreeMap\u003c\u003e();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
        "recursiveCode": "class MyCalendarThree {\n  private static class Node {\n    Node left;\n    Node right;\n    int add;\n    int max;\n  }\n\n  private final Node root = new Node();\n  private static final int LIMIT = 1_000_000_000;\n\n  public int book(int start, int end) {\n    update(root, 0, LIMIT, start, end - 1);\n    return root.max;\n  }\n\n  private void update(Node node, int left, int right, int ql, int qr) {\n    if (ql \u003c= left \u0026\u0026 right \u003c= qr) {\n      node.add++;\n      node.max++;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (ql \u003c= mid) {\n      if (node.left == null) node.left = new Node();\n      update(node.left, left, mid, ql, qr);\n    }\n    if (qr \u003e mid) {\n      if (node.right == null) node.right = new Node();\n      update(node.right, mid + 1, right, ql, qr);\n    }\n    int leftMax = node.left == null ? 0 : node.left.max;\n    int rightMax = node.right == null ? 0 : node.right.max;\n    node.max = node.add + Math.max(leftMax, rightMax);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap\u003cInteger, Integer\u003e delta = new TreeMap\u003c\u003e();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
        "code": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap\u003cInteger, Integer\u003e delta = new TreeMap\u003c\u003e();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}"
      }
    ]
  },
  "advanced-graphs": {
    "id": "advanced-graphs",
    "name": "Advanced Graphs Revision",
    "summary": "Dijkstra variants, constrained shortest paths, MST-style effort paths, alien ordering, and bridges.",
    "checklist": [
      "Weighted edges plus non-negative weights usually trigger Dijkstra or 0-1 BFS.",
      "Need all-pairs shortest paths on small n: consider Floyd-Warshall.",
      "Need cheapest connection of all nodes: model as MST, often with virtual nodes.",
      "Need bridges, articulation points, or SCCs: use discovery time and low-link thinking.",
      "Need path using every edge once: check Eulerian degree balance and run Hierholzer."
    ],
    "mistakes": [
      "Using Dijkstra when negative weights are present.",
      "Marking a node visited too early when state includes stops, time, mask, or color.",
      "Forgetting to preserve original edge indices in MST classification.",
      "Not handling invalid prefix order in Alien Dictionary.",
      "Treating undirected bridge parent edges incorrectly when parallel edges exist."
    ],
    "edgeCases": [
      "Disconnected graph or unreachable destination.",
      "Single node, no edges, and self-loop inputs where allowed.",
      "Multiple edges between the same pair with different weights.",
      "Cycles in directed graphs and duplicate dependency edges.",
      "Large path costs requiring int sentinel discipline or long arithmetic."
    ],
    "complexities": [
      "Dijkstra with heap: O((V + E) log V) time and O(V + E) space.",
      "Bellman-Ford style relaxation: O(VE) or O(kE) for stop-limited paths.",
      "Floyd-Warshall: O(V^3) time and O(V^2) space.",
      "Tarjan/Kosaraju: O(V + E) time and O(V + E) space.",
      "MST with Kruskal: O(E log E); dense Prim: O(V^2)."
    ],
    "mentalModel": [
      "Treat graph state as more than node when constraints add stops, time, mask, or color.",
      "Shortest-path algorithms are relaxation engines; choose by weight rules and state size.",
      "MST problems often become easy after adding the right virtual node or edge index.",
      "Low-link algorithms answer whether a DFS subtree can escape to an ancestor.",
      "Euler, SCC, matching, and flow are structure problems: preserve invariants, not just distances."
    ],
    "revisionStrategy": [
      "Solve these 5 important Advanced Graphs problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Network Delay Time",
        "difficulty": "Medium",
        "subpattern": "Dijkstra shortest path",
        "question": "Given directed weighted edges times[i] = [u,v,w], n nodes labeled 1..n, and source k, return the time for all nodes to receive the signal, or -1 if any node is unreachable.",
        "trigger": "Single-source shortest path with non-negative edge weights and an unreachable check.",
        "intuition": "Always finalize the currently smallest known distance; each outgoing edge may relax a neighbor.",
        "edgeCases": "Disconnected nodes, duplicate directed edges, n = 1, source with no outgoing edges, and large path costs.",
        "constraints": "1 \u003c= n \u003c= 100; edge weights are positive; node labels are 1-based.",
        "source": {
          "label": "LeetCode 743 - Network Delay Time",
          "url": "https://leetcode.com/problems/network-delay-time/"
        },
        "examples": [
          {
            "input": "times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2",
            "output": "2",
            "explanation": "Node 4 receives after path 2-\u003e3-\u003e4."
          },
          {
            "input": "times=[[1,2,1]], n=2, k=2",
            "output": "-1",
            "explanation": "Node 1 is unreachable from 2."
          }
        ],
        "bruteForceComplexity": "Time O(nE); Space O(n). Bellman-Ford style relaxation repeats enough times to settle all paths.",
        "optimizedComplexity": "Time O((n + E) log n); Space O(n + E). Dijkstra uses a min-heap adjacency list.",
        "recursiveComplexity": "Time O(number of explored walks with pruning); Space O(n + E + recursion depth). DFS prunes states not improving distance.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    final int INF = 1_000_000_000;\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, INF);\n    dist[k] = 0;\n\n    for (int round = 1; round \u003c n; round++) {\n      boolean changed = false;\n      for (int[] edge : times) {\n        int from = edge[0], to = edge[1], weight = edge[2];\n        if (dist[from] != INF \u0026\u0026 dist[from] + weight \u003c dist[to]) {\n          dist[to] = dist[from] + weight;\n          changed = true;\n        }\n      }\n      if (!changed) break;\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) {\n      if (dist[node] == INF) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cint[]\u003e[] graph = new ArrayList[n + 1];\n    for (int node = 1; node \u003c= n; node++) graph[node] = new ArrayList\u003c\u003e();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e(Comparator.comparingInt(a -\u003e a[1]));\n    heap.offer(new int[] {k, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0], distance = current[1];\n      if (distance != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        int next = edge[0], nextDistance = distance + edge[1];\n        if (nextDistance \u003c dist[next]) {\n          dist[next] = nextDistance;\n          heap.offer(new int[] {next, nextDistance});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cint[]\u003e[] graph = new ArrayList[n + 1];\n    for (int node = 1; node \u003c= n; node++) graph[node] = new ArrayList\u003c\u003e();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n    for (List\u003cint[]\u003e edges : graph) {\n      if (edges != null) edges.sort(Comparator.comparingInt(a -\u003e a[1]));\n    }\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dfs(k, 0, graph, dist);\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n\n  private void dfs(int node, int time, List\u003cint[]\u003e[] graph, int[] dist) {\n    if (time \u003e= dist[node]) return;\n    dist[node] = time;\n    for (int[] edge : graph[node]) dfs(edge[0], time + edge[1], graph, dist);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cint[]\u003e[] graph = new ArrayList[n + 1];\n    for (int node = 1; node \u003c= n; node++) graph[node] = new ArrayList\u003c\u003e();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e(Comparator.comparingInt(a -\u003e a[1]));\n    heap.offer(new int[] {k, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0], distance = current[1];\n      if (distance != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        int next = edge[0], nextDistance = distance + edge[1];\n        if (nextDistance \u003c dist[next]) {\n          dist[next] = nextDistance;\n          heap.offer(new int[] {next, nextDistance});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cint[]\u003e[] graph = new ArrayList[n + 1];\n    for (int node = 1; node \u003c= n; node++) graph[node] = new ArrayList\u003c\u003e();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e(Comparator.comparingInt(a -\u003e a[1]));\n    heap.offer(new int[] {k, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0], distance = current[1];\n      if (distance != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        int next = edge[0], nextDistance = distance + edge[1];\n        if (nextDistance \u003c dist[next]) {\n          dist[next] = nextDistance;\n          heap.offer(new int[] {next, nextDistance});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Cheapest Flights Within K Stops",
        "difficulty": "Medium",
        "subpattern": "K-stop constrained shortest path",
        "question": "Given flights [from,to,price], find the cheapest price from src to dst using at most k stops, or -1 if no route satisfies the stop limit.",
        "trigger": "Shortest path where state includes how many edges or stops have been used.",
        "intuition": "Relax all flights once per allowed edge count; do not let a route with too many stops overwrite a valid shorter-state answer.",
        "edgeCases": "src equals dst, no route, direct flight more expensive than one-stop route, cycles, and k = 0.",
        "constraints": "n \u003c= 100; prices are positive; at most k + 1 edges may be used.",
        "source": {
          "label": "LeetCode 787 - Cheapest Flights Within K Stops",
          "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
        },
        "examples": [
          {
            "input": "n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1",
            "output": "700",
            "explanation": "0-\u003e1-\u003e3 uses one stop."
          },
          {
            "input": "n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1",
            "output": "200",
            "explanation": "The one-stop path is cheaper than direct."
          }
        ],
        "bruteForceComplexity": "Time O(branching^(k+1)); Space O(n + E + k). DFS tries bounded routes with pruning.",
        "optimizedComplexity": "Time O((k + 1)E); Space O(n). Bellman-Ford layers prevent same-round reuse.",
        "recursiveComplexity": "Time O((k + 1)(n + E)) with memoization; Space O((k + 1)n + recursion depth).",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private int best;\n\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    List\u003cint[]\u003e[] graph = new ArrayList[n];\n    for (int i = 0; i \u003c n; i++) graph[i] = new ArrayList\u003c\u003e();\n    for (int[] flight : flights) graph[flight[0]].add(new int[] {flight[1], flight[2]});\n    best = Integer.MAX_VALUE;\n    dfs(src, dst, k + 1, 0, graph);\n    return best == Integer.MAX_VALUE ? -1 : best;\n  }\n\n  private void dfs(int node, int dst, int edgesLeft, int cost, List\u003cint[]\u003e[] graph) {\n    if (cost \u003e= best) return;\n    if (node == dst) {\n      best = cost;\n      return;\n    }\n    if (edgesLeft == 0) return;\n    for (int[] edge : graph[node]) dfs(edge[0], dst, edgesLeft - 1, cost + edge[1], graph);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    final int INF = 1_000_000_000;\n    int[] cost = new int[n];\n    Arrays.fill(cost, INF);\n    cost[src] = 0;\n\n    for (int edges = 0; edges \u003c= k; edges++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        if (cost[flight[0]] == INF) continue;\n        next[flight[1]] = Math.min(next[flight[1]], cost[flight[0]] + flight[2]);\n      }\n      cost = next;\n    }\n    return cost[dst] == INF ? -1 : cost[dst];\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final int INF = 1_000_000_000;\n  private List\u003cint[]\u003e[] graph;\n  private int[][] memo;\n  private int dst;\n\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    this.dst = dst;\n    graph = new ArrayList[n];\n    for (int i = 0; i \u003c n; i++) graph[i] = new ArrayList\u003c\u003e();\n    for (int[] flight : flights) graph[flight[0]].add(new int[] {flight[1], flight[2]});\n    memo = new int[n][k + 2];\n    for (int[] row : memo) Arrays.fill(row, -2);\n    int answer = solve(src, k + 1);\n    return answer \u003e= INF ? -1 : answer;\n  }\n\n  private int solve(int node, int edgesLeft) {\n    if (node == dst) return 0;\n    if (edgesLeft == 0) return INF;\n    if (memo[node][edgesLeft] != -2) return memo[node][edgesLeft];\n    int best = INF;\n    for (int[] edge : graph[node]) {\n      int suffix = solve(edge[0], edgesLeft - 1);\n      if (suffix != INF) best = Math.min(best, edge[1] + suffix);\n    }\n    return memo[node][edgesLeft] = best;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    final int INF = 1_000_000_000;\n    int[] cost = new int[n];\n    Arrays.fill(cost, INF);\n    cost[src] = 0;\n\n    for (int edges = 0; edges \u003c= k; edges++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        if (cost[flight[0]] == INF) continue;\n        next[flight[1]] = Math.min(next[flight[1]], cost[flight[0]] + flight[2]);\n      }\n      cost = next;\n    }\n    return cost[dst] == INF ? -1 : cost[dst];\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    final int INF = 1_000_000_000;\n    int[] cost = new int[n];\n    Arrays.fill(cost, INF);\n    cost[src] = 0;\n\n    for (int edges = 0; edges \u003c= k; edges++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        if (cost[flight[0]] == INF) continue;\n        next[flight[1]] = Math.min(next[flight[1]], cost[flight[0]] + flight[2]);\n      }\n      cost = next;\n    }\n    return cost[dst] == INF ? -1 : cost[dst];\n  }\n}"
      },
      {
        "group": "core",
        "name": "Path With Minimum Effort",
        "difficulty": "Medium",
        "subpattern": "Minimax path on grid",
        "question": "Given a heights grid, move 4-directionally from top-left to bottom-right while minimizing the maximum absolute height difference along the path.",
        "trigger": "The path cost is the maximum edge on the path, not the sum of edges.",
        "intuition": "Dijkstra still works when relaxation uses max(currentEffort, edgeEffort) and picks the smallest current effort first.",
        "edgeCases": "Single cell grid, flat grid, steep final edge, multiple equal-effort paths, and narrow one-row grids.",
        "constraints": "Grid size up to 100x100; height differences fit in int.",
        "source": {
          "label": "LeetCode 1631 - Path With Minimum Effort",
          "url": "https://leetcode.com/problems/path-with-minimum-effort/"
        },
        "examples": [
          {
            "input": "heights=[[1,2,2],[3,8,2],[5,3,5]]",
            "output": "2",
            "explanation": "A route exists where every step differs by at most 2."
          },
          {
            "input": "heights=[[1,2,3],[3,8,4],[5,3,5]]",
            "output": "1",
            "explanation": "The right-side route keeps max effort 1."
          }
        ],
        "bruteForceComplexity": "Time exponential in cells; Space O(mn). DFS enumerates simple paths and keeps the best maximum edge.",
        "optimizedComplexity": "Time O(mn log(mn)); Space O(mn). Dijkstra over grid cells with minimax relaxation.",
        "recursiveComplexity": "Time O(mn log W); Space O(mn). Binary search effort and recursive DFS reachability check.",
        "bruteForceCode": "class Solution {\n  private int best;\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    best = Integer.MAX_VALUE;\n    boolean[][] seen = new boolean[heights.length][heights[0].length];\n    dfs(0, 0, 0, heights, seen);\n    return best;\n  }\n\n  private void dfs(int row, int col, int effort, int[][] heights, boolean[][] seen) {\n    if (effort \u003e= best) return;\n    int rows = heights.length, cols = heights[0].length;\n    if (row == rows - 1 \u0026\u0026 col == cols - 1) {\n      best = effort;\n      return;\n    }\n    seen[row][col] = true;\n    for (int[] dir : dirs) {\n      int nr = row + dir[0], nc = col + dir[1];\n      if (nr \u003c 0 || nc \u003c 0 || nr \u003e= rows || nc \u003e= cols || seen[nr][nc]) continue;\n      int next = Math.max(effort, Math.abs(heights[row][col] - heights[nr][nc]));\n      dfs(nr, nc, next, heights, seen);\n    }\n    seen[row][col] = false;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] effort = new int[rows][cols];\n    for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);\n    effort[0][0] = 0;\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e(Comparator.comparingInt(a -\u003e a[2]));\n    heap.offer(new int[] {0, 0, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], cost = current[2];\n      if (row == rows - 1 \u0026\u0026 col == cols - 1) return cost;\n      if (cost != effort[row][col]) continue;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr \u003c 0 || nc \u003c 0 || nr \u003e= rows || nc \u003e= cols) continue;\n        int next = Math.max(cost, Math.abs(heights[row][col] - heights[nr][nc]));\n        if (next \u003c effort[nr][nc]) {\n          effort[nr][nc] = next;\n          heap.offer(new int[] {nr, nc, next});\n        }\n      }\n    }\n    return 0;\n  }\n}",
        "recursiveCode": "class Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int left = 0, right = 1_000_000;\n    while (left \u003c right) {\n      int mid = left + (right - left) / 2;\n      boolean[][] seen = new boolean[heights.length][heights[0].length];\n      if (canReach(0, 0, mid, heights, seen)) right = mid;\n      else left = mid + 1;\n    }\n    return left;\n  }\n\n  private boolean canReach(int row, int col, int limit, int[][] heights, boolean[][] seen) {\n    int rows = heights.length, cols = heights[0].length;\n    if (row == rows - 1 \u0026\u0026 col == cols - 1) return true;\n    seen[row][col] = true;\n    for (int[] dir : dirs) {\n      int nr = row + dir[0], nc = col + dir[1];\n      if (nr \u003c 0 || nc \u003c 0 || nr \u003e= rows || nc \u003e= cols || seen[nr][nc]) continue;\n      if (Math.abs(heights[row][col] - heights[nr][nc]) \u003c= limit \u0026\u0026 canReach(nr, nc, limit, heights, seen)) return true;\n    }\n    return false;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] effort = new int[rows][cols];\n    for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);\n    effort[0][0] = 0;\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e(Comparator.comparingInt(a -\u003e a[2]));\n    heap.offer(new int[] {0, 0, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], cost = current[2];\n      if (row == rows - 1 \u0026\u0026 col == cols - 1) return cost;\n      if (cost != effort[row][col]) continue;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr \u003c 0 || nc \u003c 0 || nr \u003e= rows || nc \u003e= cols) continue;\n        int next = Math.max(cost, Math.abs(heights[row][col] - heights[nr][nc]));\n        if (next \u003c effort[nr][nc]) {\n          effort[nr][nc] = next;\n          heap.offer(new int[] {nr, nc, next});\n        }\n      }\n    }\n    return 0;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] effort = new int[rows][cols];\n    for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);\n    effort[0][0] = 0;\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e(Comparator.comparingInt(a -\u003e a[2]));\n    heap.offer(new int[] {0, 0, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], cost = current[2];\n      if (row == rows - 1 \u0026\u0026 col == cols - 1) return cost;\n      if (cost != effort[row][col]) continue;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr \u003c 0 || nc \u003c 0 || nr \u003e= rows || nc \u003e= cols) continue;\n        int next = Math.max(cost, Math.abs(heights[row][col] - heights[nr][nc]));\n        if (next \u003c effort[nr][nc]) {\n          effort[nr][nc] = next;\n          heap.offer(new int[] {nr, nc, next});\n        }\n      }\n    }\n    return 0;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Alien Dictionary",
        "difficulty": "Hard",
        "subpattern": "Topological ordering from constraints",
        "question": "Given sorted words from an alien language, return one valid character order, or empty string if the order is invalid.",
        "trigger": "Adjacent sorted words reveal directed precedence constraints between first differing characters.",
        "intuition": "Build a character graph, reject invalid prefix order, then topologically sort the graph.",
        "edgeCases": "Invalid prefix like abc before ab, isolated characters, duplicate edges, cycles, and one-word input.",
        "constraints": "Characters are lowercase English letters in the common LeetCode version.",
        "source": {
          "label": "LeetCode 269 - Alien Dictionary",
          "url": "https://leetcode.com/problems/alien-dictionary/"
        },
        "examples": [
          {
            "input": "words=[wrt,wrf,er,ett,rftt]",
            "output": "wertf",
            "explanation": "Constraints imply w before e, e before r, r before t, t before f."
          },
          {
            "input": "words=[z,x,z]",
            "output": "",
            "explanation": "The constraints create a cycle."
          }
        ],
        "bruteForceComplexity": "Time O(26(V + E)); Space O(V + E). Repeatedly scan for an unused zero-indegree character.",
        "optimizedComplexity": "Time O(total characters + V + E); Space O(V + E). Kahn queue processes zero-indegree characters.",
        "recursiveComplexity": "Time O(total characters + V + E); Space O(V + E). DFS color states detect cycles and build reverse postorder.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    GraphData data = build(words);\n    if (!data.valid) return \"\";\n    StringBuilder order = new StringBuilder();\n    boolean[] used = new boolean[26];\n    for (int step = 0; step \u003c data.count; step++) {\n      int pick = -1;\n      for (int c = 0; c \u003c 26; c++) if (data.exists[c] \u0026\u0026 !used[c] \u0026\u0026 data.indegree[c] == 0) { pick = c; break; }\n      if (pick == -1) return \"\";\n      used[pick] = true;\n      order.append((char) ('a' + pick));\n      for (int next : data.graph[pick]) data.indegree[next]--;\n    }\n    return order.toString();\n  }\n\n  private GraphData build(String[] words) {\n    GraphData data = new GraphData();\n    for (int i = 0; i \u003c 26; i++) data.graph[i] = new ArrayList\u003c\u003e();\n    for (String word : words) for (char ch : word.toCharArray()) if (!data.exists[ch - 'a']) { data.exists[ch - 'a'] = true; data.count++; }\n    for (int i = 0; i + 1 \u003c words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() \u003e b.length() \u0026\u0026 a.startsWith(b)) { data.valid = false; return data; }\n      int j = 0;\n      while (j \u003c a.length() \u0026\u0026 j \u003c b.length() \u0026\u0026 a.charAt(j) == b.charAt(j)) j++;\n      if (j \u003c a.length() \u0026\u0026 j \u003c b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!data.edge[from][to]) { data.edge[from][to] = true; data.graph[from].add(to); data.indegree[to]++; }\n      }\n    }\n    return data;\n  }\n\n  private static class GraphData { List\u003cInteger\u003e[] graph = new ArrayList[26]; int[] indegree = new int[26]; boolean[] exists = new boolean[26]; boolean[][] edge = new boolean[26][26]; boolean valid = true; int count; }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    List\u003cInteger\u003e[] graph = new ArrayList[26];\n    for (int i = 0; i \u003c 26; i++) graph[i] = new ArrayList\u003c\u003e();\n    int[] indegree = new int[26];\n    boolean[] exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    int count = 0;\n    for (String word : words) for (char ch : word.toCharArray()) if (!exists[ch - 'a']) { exists[ch - 'a'] = true; count++; }\n    for (int i = 0; i + 1 \u003c words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() \u003e b.length() \u0026\u0026 a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j \u003c a.length() \u0026\u0026 j \u003c b.length() \u0026\u0026 a.charAt(j) == b.charAt(j)) j++;\n      if (j \u003c a.length() \u0026\u0026 j \u003c b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); indegree[to]++; }\n      }\n    }\n    Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n    for (int c = 0; c \u003c 26; c++) if (exists[c] \u0026\u0026 indegree[c] == 0) queue.offer(c);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      int current = queue.poll();\n      order.append((char) ('a' + current));\n      for (int next : graph[current]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return order.length() == count ? order.toString() : \"\";\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List\u003cInteger\u003e[] graph;\n  private boolean[] exists;\n  private int[] color;\n  private StringBuilder order;\n\n  public String alienOrder(String[] words) {\n    graph = new ArrayList[26];\n    for (int i = 0; i \u003c 26; i++) graph[i] = new ArrayList\u003c\u003e();\n    exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    for (String word : words) for (char ch : word.toCharArray()) exists[ch - 'a'] = true;\n    for (int i = 0; i + 1 \u003c words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() \u003e b.length() \u0026\u0026 a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j \u003c a.length() \u0026\u0026 j \u003c b.length() \u0026\u0026 a.charAt(j) == b.charAt(j)) j++;\n      if (j \u003c a.length() \u0026\u0026 j \u003c b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); }\n      }\n    }\n    color = new int[26];\n    order = new StringBuilder();\n    for (int c = 0; c \u003c 26; c++) if (exists[c] \u0026\u0026 color[c] == 0 \u0026\u0026 !dfs(c)) return \"\";\n    return order.reverse().toString();\n  }\n\n  private boolean dfs(int node) {\n    color[node] = 1;\n    for (int next : graph[node]) {\n      if (color[next] == 1) return false;\n      if (color[next] == 0 \u0026\u0026 !dfs(next)) return false;\n    }\n    color[node] = 2;\n    order.append((char) ('a' + node));\n    return true;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    List\u003cInteger\u003e[] graph = new ArrayList[26];\n    for (int i = 0; i \u003c 26; i++) graph[i] = new ArrayList\u003c\u003e();\n    int[] indegree = new int[26];\n    boolean[] exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    int count = 0;\n    for (String word : words) for (char ch : word.toCharArray()) if (!exists[ch - 'a']) { exists[ch - 'a'] = true; count++; }\n    for (int i = 0; i + 1 \u003c words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() \u003e b.length() \u0026\u0026 a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j \u003c a.length() \u0026\u0026 j \u003c b.length() \u0026\u0026 a.charAt(j) == b.charAt(j)) j++;\n      if (j \u003c a.length() \u0026\u0026 j \u003c b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); indegree[to]++; }\n      }\n    }\n    Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n    for (int c = 0; c \u003c 26; c++) if (exists[c] \u0026\u0026 indegree[c] == 0) queue.offer(c);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      int current = queue.poll();\n      order.append((char) ('a' + current));\n      for (int next : graph[current]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return order.length() == count ? order.toString() : \"\";\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    List\u003cInteger\u003e[] graph = new ArrayList[26];\n    for (int i = 0; i \u003c 26; i++) graph[i] = new ArrayList\u003c\u003e();\n    int[] indegree = new int[26];\n    boolean[] exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    int count = 0;\n    for (String word : words) for (char ch : word.toCharArray()) if (!exists[ch - 'a']) { exists[ch - 'a'] = true; count++; }\n    for (int i = 0; i + 1 \u003c words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() \u003e b.length() \u0026\u0026 a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j \u003c a.length() \u0026\u0026 j \u003c b.length() \u0026\u0026 a.charAt(j) == b.charAt(j)) j++;\n      if (j \u003c a.length() \u0026\u0026 j \u003c b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); indegree[to]++; }\n      }\n    }\n    Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n    for (int c = 0; c \u003c 26; c++) if (exists[c] \u0026\u0026 indegree[c] == 0) queue.offer(c);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      int current = queue.poll();\n      order.append((char) ('a' + current));\n      for (int next : graph[current]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return order.length() == count ? order.toString() : \"\";\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Critical Connections in a Network",
        "difficulty": "Hard",
        "subpattern": "Tarjan bridge detection",
        "question": "Given an undirected connected network, return all critical connections whose removal disconnects the graph.",
        "trigger": "Need to identify edges that no back edge can bypass in a DFS tree.",
        "intuition": "An edge parent-\u003echild is a bridge when low[child] is greater than disc[parent].",
        "edgeCases": "Single edge, cycles with no bridges, chain graph, root handling, and duplicate-like input ordering.",
        "constraints": "n up to 1e5; O(V + E) low-link traversal is required.",
        "source": {
          "label": "LeetCode 1192 - Critical Connections in a Network",
          "url": "https://leetcode.com/problems/critical-connections-in-a-network/"
        },
        "examples": [
          {
            "input": "n=4, connections=[[0,1],[1,2],[2,0],[1,3]]",
            "output": "[[1,3]]",
            "explanation": "Removing 1-3 isolates node 3."
          },
          {
            "input": "n=2, connections=[[0,1]]",
            "output": "[[0,1]]",
            "explanation": "The only edge is a bridge."
          }
        ],
        "bruteForceComplexity": "Time O(E(V + E)); Space O(V + E). Remove each edge and test connectivity.",
        "optimizedComplexity": "Time O(V + E); Space O(V + E). Tarjan low-link finds all bridges in one DFS.",
        "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive DFS maintains discovery and low times.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger\u003e\u003e criticalConnections(int n, List\u003cList\u003cInteger\u003e\u003e connections) {\n    List\u003cList\u003cInteger\u003e\u003e answer = new ArrayList\u003c\u003e();\n    for (int skip = 0; skip \u003c connections.size(); skip++) {\n      if (!connected(n, connections, skip)) answer.add(connections.get(skip));\n    }\n    return answer;\n  }\n\n  private boolean connected(int n, List\u003cList\u003cInteger\u003e\u003e edges, int skip) {\n    List\u003cInteger\u003e[] graph = new ArrayList[n];\n    for (int i = 0; i \u003c n; i++) graph[i] = new ArrayList\u003c\u003e();\n    for (int i = 0; i \u003c edges.size(); i++) {\n      if (i == skip) continue;\n      int a = edges.get(i).get(0), b = edges.get(i).get(1);\n      graph[a].add(b); graph[b].add(a);\n    }\n    boolean[] seen = new boolean[n];\n    Deque\u003cInteger\u003e stack = new ArrayDeque\u003c\u003e();\n    stack.push(0); seen[0] = true;\n    int count = 0;\n    while (!stack.isEmpty()) {\n      int node = stack.pop(); count++;\n      for (int next : graph[node]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n    }\n    return count == n;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private List\u003cInteger\u003e[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List\u003cList\u003cInteger\u003e\u003e bridges;\n\n  public List\u003cList\u003cInteger\u003e\u003e criticalConnections(int n, List\u003cList\u003cInteger\u003e\u003e connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i \u003c n; i++) graph[i] = new ArrayList\u003c\u003e();\n    for (List\u003cInteger\u003e edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n]; low = new int[n]; bridges = new ArrayList\u003c\u003e();\n    dfs(0, -1);\n    return bridges;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] \u003e disc[node]) bridges.add(Arrays.asList(node, next));\n      } else {\n        low[node] = Math.min(low[node], disc[next]);\n      }\n    }\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List\u003cInteger\u003e[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List\u003cList\u003cInteger\u003e\u003e answer;\n\n  public List\u003cList\u003cInteger\u003e\u003e criticalConnections(int n, List\u003cList\u003cInteger\u003e\u003e connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i \u003c n; i++) graph[i] = new ArrayList\u003c\u003e();\n    for (List\u003cInteger\u003e edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n];\n    low = new int[n];\n    answer = new ArrayList\u003c\u003e();\n    dfs(0, -1);\n    return answer;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] \u003e disc[node]) answer.add(Arrays.asList(node, next));\n      } else low[node] = Math.min(low[node], disc[next]);\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private List\u003cInteger\u003e[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List\u003cList\u003cInteger\u003e\u003e bridges;\n\n  public List\u003cList\u003cInteger\u003e\u003e criticalConnections(int n, List\u003cList\u003cInteger\u003e\u003e connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i \u003c n; i++) graph[i] = new ArrayList\u003c\u003e();\n    for (List\u003cInteger\u003e edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n]; low = new int[n]; bridges = new ArrayList\u003c\u003e();\n    dfs(0, -1);\n    return bridges;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] \u003e disc[node]) bridges.add(Arrays.asList(node, next));\n      } else {\n        low[node] = Math.min(low[node], disc[next]);\n      }\n    }\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  private List\u003cInteger\u003e[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List\u003cList\u003cInteger\u003e\u003e bridges;\n\n  public List\u003cList\u003cInteger\u003e\u003e criticalConnections(int n, List\u003cList\u003cInteger\u003e\u003e connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i \u003c n; i++) graph[i] = new ArrayList\u003c\u003e();\n    for (List\u003cInteger\u003e edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n]; low = new int[n]; bridges = new ArrayList\u003c\u003e();\n    dfs(0, -1);\n    return bridges;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] \u003e disc[node]) bridges.add(Arrays.asList(node, next));\n      } else {\n        low[node] = Math.min(low[node], disc[next]);\n      }\n    }\n  }\n}"
      }
    ]
  },
  "geometry": {
    "id": "geometry",
    "name": "Geometry Revision",
    "summary": "Coordinate comparisons, distances, slopes, point counting, and sweep-line geometry.",
    "checklist": [
      "If only relative turn direction matters, reach for cross products before slopes.",
      "If distances are compared, use squared distance to avoid floating-point error.",
      "If rectangles are axis-aligned, reduce overlap to independent x/y interval overlap.",
      "If many points share a relation with one anchor, hash normalized slopes or distances.",
      "If union/outline changes at x-coordinates, consider sweep-line or coordinate compression."
    ],
    "mistakes": [
      "Using division for slopes and losing precision or mishandling vertical lines.",
      "Forgetting duplicate points when counting lines, squares, or distances.",
      "Treating touching rectangles as overlapping when positive area is required.",
      "Returning convex hull without keeping collinear boundary points when required.",
      "Overflowing int when squaring coordinates or computing cross products."
    ],
    "edgeCases": [
      "Duplicate points and zero-length vectors.",
      "Vertical and horizontal lines.",
      "Negative coordinates and very large coordinate values.",
      "Collinear boundary points on hull or polygon edges.",
      "Degenerate rectangles or circles with radius zero."
    ],
    "complexities": [
      "Pair enumeration is usually O(n^2); triple enumeration is O(n^3).",
      "Hashing normalized geometric keys often reduces repeated checks to O(n^2).",
      "Sweep-line with balanced structures is commonly O(n log n); coordinate compression can be O(n^3) for rectangle union but simple and robust.",
      "Convex hull by monotonic chain is O(n log n) time and O(n) space.",
      "Grid/circle brute enumeration depends on bounding-box area, not just object count."
    ],
    "mentalModel": [
      "Translate geometry into integer invariants: cross, dot, squared distance, midpoint, and interval overlap.",
      "Avoid floating point unless the required output is floating point.",
      "Choose the anchor carefully: many point problems become hash counts around one anchor.",
      "Separate degeneracy checks from the main formula.",
      "For sweeps, process events in sorted order and keep only the active state needed for the current x."
    ],
    "revisionStrategy": [
      "Solve these 5 important Geometry problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Rectangle Overlap",
        "difficulty": "Easy",
        "subpattern": "Axis-aligned rectangle overlap",
        "question": "Given two axis-aligned rectangles rec1 and rec2 as [x1,y1,x2,y2], return true if they overlap with positive area.",
        "trigger": "Axis-aligned rectangles overlap iff their x projections and y projections overlap with positive length.",
        "intuition": "Reject the four separating cases: one rectangle completely left, right, above, or below the other.",
        "edgeCases": "Touching edges only, zero-area rectangles, negative coordinates, one rectangle inside another, and identical rectangles.",
        "constraints": "Coordinates are integers; positive area overlap is required.",
        "source": {
          "label": "LeetCode 836 - Rectangle Overlap",
          "url": "https://leetcode.com/problems/rectangle-overlap/"
        },
        "examples": [
          {
            "input": "rec1=[0,0,2,2], rec2=[1,1,3,3]",
            "output": "true",
            "explanation": "Both projections overlap with positive length."
          },
          {
            "input": "rec1=[0,0,1,1], rec2=[1,0,2,1]",
            "output": "false",
            "explanation": "They only touch at an edge."
          }
        ],
        "bruteForceComplexity": "Time O(1); Space O(1). Check whether either rectangle has a corner strictly inside the other, plus containment.",
        "optimizedComplexity": "Time O(1); Space O(1). Projection overlap reduces the test to four comparisons.",
        "recursiveComplexity": "Time O(1); Space O(1). Recursive interval checks validate x and y projections.",
        "bruteForceCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    return area(rec1) \u003e 0 \u0026\u0026 area(rec2) \u003e 0\n        \u0026\u0026 Math.max(rec1[0], rec2[0]) \u003c Math.min(rec1[2], rec2[2])\n        \u0026\u0026 Math.max(rec1[1], rec2[1]) \u003c Math.min(rec1[3], rec2[3]);\n  }\n\n  private int area(int[] rec) {\n    return Math.max(0, rec[2] - rec[0]) * Math.max(0, rec[3] - rec[1]);\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    boolean separated = rec1[2] \u003c= rec2[0] || rec2[2] \u003c= rec1[0]\n        || rec1[3] \u003c= rec2[1] || rec2[3] \u003c= rec1[1];\n    return !separated;\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    return overlap(rec1, rec2, 0) \u0026\u0026 overlap(rec1, rec2, 1);\n  }\n\n  private boolean overlap(int[] a, int[] b, int axis) {\n    if (axis == 0) return Math.max(a[0], b[0]) \u003c Math.min(a[2], b[2]);\n    return Math.max(a[1], b[1]) \u003c Math.min(a[3], b[3]);\n  }\n}",
        "optimizedCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    boolean separated = rec1[2] \u003c= rec2[0] || rec2[2] \u003c= rec1[0]\n        || rec1[3] \u003c= rec2[1] || rec2[3] \u003c= rec1[1];\n    return !separated;\n  }\n}",
        "code": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    boolean separated = rec1[2] \u003c= rec2[0] || rec2[2] \u003c= rec1[0]\n        || rec1[3] \u003c= rec2[1] || rec2[3] \u003c= rec1[1];\n    return !separated;\n  }\n}"
      },
      {
        "group": "core",
        "name": "K Closest Points to Origin",
        "difficulty": "Medium",
        "subpattern": "Distance ordering with heap or selection",
        "question": "Given points and integer k, return any k points closest to the origin by Euclidean distance.",
        "trigger": "Only distance ranking matters, and squared distance preserves order without square roots.",
        "intuition": "Keep the k smallest squared distances with sorting, heap, or quickselect.",
        "edgeCases": "k equals number of points, equal distances, negative coordinates, origin point, and duplicate points.",
        "constraints": "Return order may be arbitrary for accepted LeetCode solutions.",
        "source": {
          "label": "LeetCode 973 - K Closest Points to Origin",
          "url": "https://leetcode.com/problems/k-closest-points-to-origin/"
        },
        "examples": [
          {
            "input": "points=[[1,3],[-2,2]], k=1",
            "output": "[[-2,2]]",
            "explanation": "Squared distances are 10 and 8."
          },
          {
            "input": "points=[[3,3],[5,-1],[-2,4]], k=2",
            "output": "two closest points",
            "explanation": "Any order of the two closest points is valid."
          }
        ],
        "bruteForceComplexity": "Time O(n log n); Space O(n). Sort all points by squared distance.",
        "optimizedComplexity": "Time O(n log k); Space O(k). Max-heap keeps only k closest points.",
        "recursiveComplexity": "Average Time O(n); Worst O(n^2); Space O(log n). Recursive quickselect partitions by squared distance.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    Arrays.sort(points, Comparator.comparingInt(this::dist));\n    return Arrays.copyOf(points, k);\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e((a, b) -\u003e Integer.compare(dist(b), dist(a)));\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() \u003e k) heap.poll();\n    }\n    int[][] answer = new int[k][2];\n    for (int i = 0; i \u003c k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
        "recursiveCode": "class Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    select(points, 0, points.length - 1, k);\n    int[][] answer = new int[k][2];\n    for (int i = 0; i \u003c k; i++) answer[i] = points[i];\n    return answer;\n  }\n\n  private void select(int[][] points, int left, int right, int k) {\n    if (left \u003e= right) return;\n    int pivot = partition(points, left, right);\n    if (pivot == k) return;\n    if (pivot \u003c k) select(points, pivot + 1, right, k);\n    else select(points, left, pivot - 1, k);\n  }\n\n  private int partition(int[][] points, int left, int right) {\n    int[] pivot = points[right];\n    int write = left;\n    for (int i = left; i \u003c right; i++) {\n      if (dist(points[i]) \u003c= dist(pivot)) swap(points, write++, i);\n    }\n    swap(points, write, right);\n    return write;\n  }\n\n  private void swap(int[][] points, int i, int j) {\n    int[] temp = points[i];\n    points[i] = points[j];\n    points[j] = temp;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e((a, b) -\u003e Integer.compare(dist(b), dist(a)));\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() \u003e k) heap.poll();\n    }\n    int[][] answer = new int[k][2];\n    for (int i = 0; i \u003c k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue\u003cint[]\u003e heap = new PriorityQueue\u003c\u003e((a, b) -\u003e Integer.compare(dist(b), dist(a)));\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() \u003e k) heap.poll();\n    }\n    int[][] answer = new int[k][2];\n    for (int i = 0; i \u003c k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}"
      },
      {
        "group": "core",
        "name": "Max Points on a Line",
        "difficulty": "Hard",
        "subpattern": "Normalized slope counting",
        "question": "Given points on a 2D plane, return the maximum number of points that lie on the same straight line.",
        "trigger": "For each anchor point, all other points on the same line share a normalized slope.",
        "intuition": "Count reduced dy/dx pairs per anchor, treating duplicate points separately.",
        "edgeCases": "Duplicate points, vertical lines, horizontal lines, negative slopes, and all points equal.",
        "constraints": "Use gcd normalization instead of floating-point slopes.",
        "source": {
          "label": "LeetCode 149 - Max Points on a Line",
          "url": "https://leetcode.com/problems/max-points-on-a-line/"
        },
        "examples": [
          {
            "input": "points=[[1,1],[2,2],[3,3]]",
            "output": "3",
            "explanation": "All points have the same slope from any anchor."
          },
          {
            "input": "points=[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]",
            "output": "4",
            "explanation": "Four points lie on one line."
          }
        ],
        "bruteForceComplexity": "Time O(n^3); Space O(1). Check every candidate line against every point.",
        "optimizedComplexity": "Time O(n^2 log C); Space O(n). Hash normalized slopes from each anchor.",
        "recursiveComplexity": "Time O(n^2 log C); Space O(n + recursion depth). Recursively process anchors with slope counts.",
        "bruteForceCode": "class Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length \u003c= 2) return points.length;\n    int best = 2;\n    for (int i = 0; i \u003c points.length; i++) {\n      for (int j = i + 1; j \u003c points.length; j++) {\n        int count = 0;\n        for (int k = 0; k \u003c points.length; k++) {\n          if (cross(points[i], points[j], points[k]) == 0) count++;\n        }\n        best = Math.max(best, count);\n      }\n    }\n    return best;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length \u003c= 2) return points.length;\n    int answer = 0;\n    for (int i = 0; i \u003c points.length; i++) {\n      Map\u003cString, Integer\u003e slopes = new HashMap\u003c\u003e();\n      int duplicates = 1;\n      int best = 0;\n      for (int j = i + 1; j \u003c points.length; j++) {\n        int dx = points[j][0] - points[i][0];\n        int dy = points[j][1] - points[i][1];\n        if (dx == 0 \u0026\u0026 dy == 0) {\n          duplicates++;\n          continue;\n        }\n        int g = gcd(Math.abs(dx), Math.abs(dy));\n        dx /= g;\n        dy /= g;\n        if (dx \u003c 0) { dx = -dx; dy = -dy; }\n        if (dx == 0) dy = 1;\n        if (dy == 0) dx = 1;\n        String key = dy + \"/\" + dx;\n        int count = slopes.getOrDefault(key, 0) + 1;\n        slopes.put(key, count);\n        best = Math.max(best, count);\n      }\n      answer = Math.max(answer, best + duplicates);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return a == 0 ? 1 : a;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length \u003c= 2) return points.length;\n    return processAnchor(points, 0, 0);\n  }\n\n  private int processAnchor(int[][] points, int index, int answer) {\n    if (index == points.length) return answer;\n    Map\u003cString, Integer\u003e slopes = new HashMap\u003c\u003e();\n    int[] result = countFrom(points, index, index + 1, slopes, 1, 0);\n    return processAnchor(points, index + 1, Math.max(answer, result[0] + result[1]));\n  }\n\n  private int[] countFrom(int[][] points, int anchor, int next, Map\u003cString, Integer\u003e slopes, int duplicates, int best) {\n    if (next == points.length) return new int[] {best, duplicates};\n    int dx = points[next][0] - points[anchor][0];\n    int dy = points[next][1] - points[anchor][1];\n    if (dx == 0 \u0026\u0026 dy == 0) return countFrom(points, anchor, next + 1, slopes, duplicates + 1, best);\n    int g = gcd(Math.abs(dx), Math.abs(dy));\n    dx /= g;\n    dy /= g;\n    if (dx \u003c 0) { dx = -dx; dy = -dy; }\n    if (dx == 0) dy = 1;\n    if (dy == 0) dx = 1;\n    String key = dy + \"/\" + dx;\n    int count = slopes.getOrDefault(key, 0) + 1;\n    slopes.put(key, count);\n    return countFrom(points, anchor, next + 1, slopes, duplicates, Math.max(best, count));\n  }\n\n  private int gcd(int a, int b) {\n    if (b == 0) return a == 0 ? 1 : a;\n    return gcd(b, a % b);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length \u003c= 2) return points.length;\n    int answer = 0;\n    for (int i = 0; i \u003c points.length; i++) {\n      Map\u003cString, Integer\u003e slopes = new HashMap\u003c\u003e();\n      int duplicates = 1;\n      int best = 0;\n      for (int j = i + 1; j \u003c points.length; j++) {\n        int dx = points[j][0] - points[i][0];\n        int dy = points[j][1] - points[i][1];\n        if (dx == 0 \u0026\u0026 dy == 0) {\n          duplicates++;\n          continue;\n        }\n        int g = gcd(Math.abs(dx), Math.abs(dy));\n        dx /= g;\n        dy /= g;\n        if (dx \u003c 0) { dx = -dx; dy = -dy; }\n        if (dx == 0) dy = 1;\n        if (dy == 0) dx = 1;\n        String key = dy + \"/\" + dx;\n        int count = slopes.getOrDefault(key, 0) + 1;\n        slopes.put(key, count);\n        best = Math.max(best, count);\n      }\n      answer = Math.max(answer, best + duplicates);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return a == 0 ? 1 : a;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length \u003c= 2) return points.length;\n    int answer = 0;\n    for (int i = 0; i \u003c points.length; i++) {\n      Map\u003cString, Integer\u003e slopes = new HashMap\u003c\u003e();\n      int duplicates = 1;\n      int best = 0;\n      for (int j = i + 1; j \u003c points.length; j++) {\n        int dx = points[j][0] - points[i][0];\n        int dy = points[j][1] - points[i][1];\n        if (dx == 0 \u0026\u0026 dy == 0) {\n          duplicates++;\n          continue;\n        }\n        int g = gcd(Math.abs(dx), Math.abs(dy));\n        dx /= g;\n        dy /= g;\n        if (dx \u003c 0) { dx = -dx; dy = -dy; }\n        if (dx == 0) dy = 1;\n        if (dy == 0) dx = 1;\n        String key = dy + \"/\" + dx;\n        int count = slopes.getOrDefault(key, 0) + 1;\n        slopes.put(key, count);\n        best = Math.max(best, count);\n      }\n      answer = Math.max(answer, best + duplicates);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return a == 0 ? 1 : a;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Detect Squares",
        "difficulty": "Medium",
        "subpattern": "Point-pair square counting",
        "question": "Design DetectSquares with add(point) and count(point), returning how many axis-aligned squares can be formed using the query point.",
        "trigger": "For a query point, every stored diagonal point determines two possible square corners.",
        "intuition": "Count point multiplicities and multiply the counts of the three required non-query corners.",
        "edgeCases": "Duplicate added points, zero side length, missing one corner, negative-style variants, and repeated queries.",
        "constraints": "Coordinates are small in LeetCode, but map-based counting is simpler and general.",
        "source": {
          "label": "LeetCode 2013 - Detect Squares",
          "url": "https://leetcode.com/problems/detect-squares/"
        },
        "examples": [
          {
            "input": "add [3,10], [11,2], [3,2]; count [11,10]",
            "output": "1",
            "explanation": "One square of side length 8 exists."
          },
          {
            "input": "add [11,2] again; count [11,10]",
            "output": "2",
            "explanation": "Duplicate points multiply the count."
          }
        ],
        "bruteForceComplexity": "add Time O(1), count Time O(n); Space O(n). Scan all added points as possible diagonals.",
        "optimizedComplexity": "add Time O(1), count Time O(m); Space O(m). Hash multiplicities and scan unique points.",
        "recursiveComplexity": "add Time O(1), count Time O(m); Space O(m + recursion depth). Recursive scan over unique points.",
        "bruteForceCode": "import java.util.*;\n\nclass DetectSquares {\n  private final List\u003cint[]\u003e points = new ArrayList\u003c\u003e();\n  private final Map\u003cString, Integer\u003e count = new HashMap\u003c\u003e();\n\n  public void add(int[] point) {\n    points.add(point.clone());\n    count.put(key(point[0], point[1]), count.getOrDefault(key(point[0], point[1]), 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : points) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (Math.abs(dx) == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      answer += count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
        "iterativeCode": "import java.util.*;\n\nclass DetectSquares {\n  private final Map\u003cString, Integer\u003e count = new HashMap\u003c\u003e();\n  private final List\u003cint[]\u003e unique = new ArrayList\u003c\u003e();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : unique) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (dx == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      int diagonalCount = count.get(key(diagonal[0], diagonal[1]));\n      answer += diagonalCount * count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
        "recursiveCode": "import java.util.*;\n\nclass DetectSquares {\n  private final Map\u003cString, Integer\u003e count = new HashMap\u003c\u003e();\n  private final List\u003cint[]\u003e unique = new ArrayList\u003c\u003e();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    return scan(point, 0);\n  }\n\n  private int scan(int[] point, int index) {\n    if (index == unique.size()) return 0;\n    int[] diagonal = unique.get(index);\n    int answer = 0;\n    int dx = diagonal[0] - point[0], dy = diagonal[1] - point[1];\n    if (dx != 0 \u0026\u0026 Math.abs(dx) == Math.abs(dy)) {\n      answer = count.get(key(diagonal[0], diagonal[1]))\n          * count.getOrDefault(key(point[0], diagonal[1]), 0)\n          * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer + scan(point, index + 1);\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
        "optimizedCode": "import java.util.*;\n\nclass DetectSquares {\n  private final Map\u003cString, Integer\u003e count = new HashMap\u003c\u003e();\n  private final List\u003cint[]\u003e unique = new ArrayList\u003c\u003e();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : unique) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (dx == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      int diagonalCount = count.get(key(diagonal[0], diagonal[1]));\n      answer += diagonalCount * count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
        "code": "import java.util.*;\n\nclass DetectSquares {\n  private final Map\u003cString, Integer\u003e count = new HashMap\u003c\u003e();\n  private final List\u003cint[]\u003e unique = new ArrayList\u003c\u003e();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : unique) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (dx == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      int diagonalCount = count.get(key(diagonal[0], diagonal[1]));\n      answer += diagonalCount * count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}"
      },
      {
        "group": "more-practice",
        "name": "The Skyline Problem",
        "difficulty": "Hard",
        "subpattern": "Skyline sweep-line events",
        "question": "Given buildings as [left,right,height], return the critical points of the skyline formed by their union.",
        "trigger": "Building edges are x-events, and the visible outline changes only when the maximum active height changes.",
        "intuition": "Process entering and leaving edges in x-order while tracking the current tallest active building.",
        "edgeCases": "Same x for multiple starts/ends, adjacent buildings of equal height, nested buildings, zero active height, and duplicate critical points.",
        "constraints": "Buildings have positive height and left \u003c right; output key points must be ordered by x without consecutive equal heights.",
        "source": {
          "label": "LeetCode 218 - The Skyline Problem",
          "url": "https://leetcode.com/problems/the-skyline-problem/"
        },
        "examples": [
          {
            "input": "buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]",
            "output": "[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]",
            "explanation": "Each point marks where the maximum active height changes."
          },
          {
            "input": "buildings = [[0,2,3],[2,5,3]]",
            "output": "[[0,3],[5,0]]",
            "explanation": "Equal adjacent heights merge into one flat segment."
          }
        ],
        "bruteForceComplexity": "Time O(N * X); Space O(X), where X is the number of distinct x-coordinates.",
        "optimizedComplexity": "Time O(N log N); Space O(N). Sweep sorted events with a multiset of active heights.",
        "recursiveComplexity": "Time O(N log N); Space O(N log N) for divide-and-conquer skyline merging.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger\u003e\u003e getSkyline(int[][] buildings) {\n    TreeSet\u003cInteger\u003e coordinates = new TreeSet\u003c\u003e();\n    for (int[] building : buildings) {\n      coordinates.add(building[0]);\n      coordinates.add(building[1]);\n    }\n\n    List\u003cInteger\u003e xs = new ArrayList\u003c\u003e(coordinates);\n    List\u003cList\u003cInteger\u003e\u003e skyline = new ArrayList\u003c\u003e();\n    int previousHeight = 0;\n    for (int i = 0; i \u003c xs.size(); i++) {\n      int x = xs.get(i);\n      int height = 0;\n      for (int[] building : buildings) {\n        if (building[0] \u003c= x \u0026\u0026 x \u003c building[1]) height = Math.max(height, building[2]);\n      }\n      if (i == 0 || height != previousHeight) {\n        skyline.add(Arrays.asList(x, height));\n        previousHeight = height;\n      }\n    }\n    return skyline;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger\u003e\u003e getSkyline(int[][] buildings) {\n    List\u003cint[]\u003e events = new ArrayList\u003c\u003e();\n    for (int[] building : buildings) {\n      events.add(new int[] {building[0], -building[2]});\n      events.add(new int[] {building[1], building[2]});\n    }\n    events.sort((a, b) -\u003e a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    TreeMap\u003cInteger, Integer\u003e heights = new TreeMap\u003c\u003e();\n    heights.put(0, 1);\n    int previousMax = 0;\n    List\u003cList\u003cInteger\u003e\u003e skyline = new ArrayList\u003c\u003e();\n\n    for (int[] event : events) {\n      int height = event[1];\n      if (height \u003c 0) {\n        heights.merge(-height, 1, Integer::sum);\n      } else {\n        int count = heights.get(height);\n        if (count == 1) heights.remove(height);\n        else heights.put(height, count - 1);\n      }\n\n      int currentMax = heights.lastKey();\n      if (currentMax != previousMax) {\n        skyline.add(Arrays.asList(event[0], currentMax));\n        previousMax = currentMax;\n      }\n    }\n    return skyline;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger\u003e\u003e getSkyline(int[][] buildings) {\n    if (buildings.length == 0) return new ArrayList\u003c\u003e();\n    return solve(buildings, 0, buildings.length - 1);\n  }\n\n  private List\u003cList\u003cInteger\u003e\u003e solve(int[][] buildings, int left, int right) {\n    if (left == right) {\n      List\u003cList\u003cInteger\u003e\u003e skyline = new ArrayList\u003c\u003e();\n      skyline.add(Arrays.asList(buildings[left][0], buildings[left][2]));\n      skyline.add(Arrays.asList(buildings[left][1], 0));\n      return skyline;\n    }\n    int mid = left + (right - left) / 2;\n    return merge(solve(buildings, left, mid), solve(buildings, mid + 1, right));\n  }\n\n  private List\u003cList\u003cInteger\u003e\u003e merge(List\u003cList\u003cInteger\u003e\u003e a, List\u003cList\u003cInteger\u003e\u003e b) {\n    int i = 0, j = 0, h1 = 0, h2 = 0;\n    List\u003cList\u003cInteger\u003e\u003e result = new ArrayList\u003c\u003e();\n    while (i \u003c a.size() \u0026\u0026 j \u003c b.size()) {\n      int x;\n      if (a.get(i).get(0) \u003c b.get(j).get(0)) {\n        x = a.get(i).get(0);\n        h1 = a.get(i++).get(1);\n      } else if (b.get(j).get(0) \u003c a.get(i).get(0)) {\n        x = b.get(j).get(0);\n        h2 = b.get(j++).get(1);\n      } else {\n        x = a.get(i).get(0);\n        h1 = a.get(i++).get(1);\n        h2 = b.get(j++).get(1);\n      }\n      addPoint(result, x, Math.max(h1, h2));\n    }\n    while (i \u003c a.size()) addPoint(result, a.get(i).get(0), a.get(i++).get(1));\n    while (j \u003c b.size()) addPoint(result, b.get(j).get(0), b.get(j++).get(1));\n    return result;\n  }\n\n  private void addPoint(List\u003cList\u003cInteger\u003e\u003e skyline, int x, int height) {\n    if (!skyline.isEmpty() \u0026\u0026 skyline.get(skyline.size() - 1).get(1) == height) return;\n    if (!skyline.isEmpty() \u0026\u0026 skyline.get(skyline.size() - 1).get(0) == x) {\n      skyline.get(skyline.size() - 1).set(1, height);\n    } else {\n      skyline.add(new ArrayList\u003c\u003e(Arrays.asList(x, height)));\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger\u003e\u003e getSkyline(int[][] buildings) {\n    List\u003cint[]\u003e events = new ArrayList\u003c\u003e();\n    for (int[] building : buildings) {\n      events.add(new int[] {building[0], -building[2]});\n      events.add(new int[] {building[1], building[2]});\n    }\n    events.sort((a, b) -\u003e a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    TreeMap\u003cInteger, Integer\u003e heights = new TreeMap\u003c\u003e();\n    heights.put(0, 1);\n    int previousMax = 0;\n    List\u003cList\u003cInteger\u003e\u003e skyline = new ArrayList\u003c\u003e();\n\n    for (int[] event : events) {\n      int height = event[1];\n      if (height \u003c 0) {\n        heights.merge(-height, 1, Integer::sum);\n      } else {\n        int count = heights.get(height);\n        if (count == 1) heights.remove(height);\n        else heights.put(height, count - 1);\n      }\n\n      int currentMax = heights.lastKey();\n      if (currentMax != previousMax) {\n        skyline.add(Arrays.asList(event[0], currentMax));\n        previousMax = currentMax;\n      }\n    }\n    return skyline;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger\u003e\u003e getSkyline(int[][] buildings) {\n    List\u003cint[]\u003e events = new ArrayList\u003c\u003e();\n    for (int[] building : buildings) {\n      events.add(new int[] {building[0], -building[2]});\n      events.add(new int[] {building[1], building[2]});\n    }\n    events.sort((a, b) -\u003e a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    TreeMap\u003cInteger, Integer\u003e heights = new TreeMap\u003c\u003e();\n    heights.put(0, 1);\n    int previousMax = 0;\n    List\u003cList\u003cInteger\u003e\u003e skyline = new ArrayList\u003c\u003e();\n\n    for (int[] event : events) {\n      int height = event[1];\n      if (height \u003c 0) {\n        heights.merge(-height, 1, Integer::sum);\n      } else {\n        int count = heights.get(height);\n        if (count == 1) heights.remove(height);\n        else heights.put(height, count - 1);\n      }\n\n      int currentMax = heights.lastKey();\n      if (currentMax != previousMax) {\n        skyline.add(Arrays.asList(event[0], currentMax));\n        previousMax = currentMax;\n      }\n    }\n    return skyline;\n  }\n}"
      }
    ]
  },
  "concurrency": {
    "id": "concurrency",
    "name": "Concurrency Revision",
    "summary": "Thread ordering, alternation, counters, producer-consumer coordination, and blocking queues.",
    "checklist": [
      "Multiple threads must print, mutate, or proceed in a fixed order.",
      "A method must block until shared state reaches a safe condition.",
      "There is a bounded resource: permits, capacity, workers, or queue slots.",
      "Deadlock is possible because multiple locks/resources are acquired.",
      "Correctness depends on visibility and atomicity, not only algorithmic output."
    ],
    "mistakes": [
      "Using if instead of while around wait conditions.",
      "Calling wait, notify, or notifyAll without owning the monitor.",
      "Acquiring locks in inconsistent order across threads.",
      "Forgetting to release a semaphore or lock in a finally block.",
      "Using volatile for compound read-modify-write operations.",
      "Assuming thread scheduling order is deterministic."
    ],
    "edgeCases": [
      "n = 0 or n = 1 where no alternation may be needed.",
      "Spurious wakeups from wait or Condition.await.",
      "InterruptedException while blocked.",
      "Queue empty/full boundary transitions.",
      "Duplicate task ids or repeated API calls.",
      "Multiple readers with one writer waiting.",
      "All permits consumed and then released.",
      "Exception inside a critical section."
    ],
    "complexities": [
      "Ordering problems: O(number of prints) time and O(1) synchronization state.",
      "Blocking queues/stacks: O(1) amortized operation time and O(capacity) space.",
      "Concurrent maps/sets: O(1) expected operation time with lock or stripe overhead.",
      "Schedulers/rate limiters: O(log n) for priority queues or O(1) amortized for queues.",
      "Fork-join reductions: O(n) work, O(log n) span, and O(log n) recursion depth."
    ],
    "mentalModel": [
      "Protect every shared invariant with exactly one synchronization strategy.",
      "Wait for a condition, not for a thread identity.",
      "Acquire resources in one global order or use permits to prevent circular wait.",
      "Release in finally blocks so exceptions do not leak locks or permits.",
      "Prefer higher-level java.util.concurrent tools when they directly model the problem."
    ],
    "revisionStrategy": [
      "Solve these 5 important Concurrency Basics problems first without opening the full pattern page.",
      "Redo only the optimized iterative tab after 24 hours.",
      "Redo the recursive tab where it is natural; otherwise explain why recursion is not the interview-preferred approach.",
      "After these are clean, use the full pattern page for deeper variations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Print in Order",
        "difficulty": "Easy",
        "subpattern": "Happens-before ordering with latches",
        "question": "Implement Foo so second() runs after first(), and third() runs after second(), even when three threads call the methods in any order.",
        "trigger": "The required output order is fixed while thread scheduling order is arbitrary.",
        "intuition": "Create two gates: first opens the gate for second, and second opens the gate for third.",
        "edgeCases": "Threads starting in reverse order, a runnable throwing, repeated wakeups, and preserving interrupt status.",
        "constraints": "Each method is called exactly once by a different thread.",
        "source": {
          "label": "LeetCode 1114 - Print in Order",
          "url": "https://leetcode.com/problems/print-in-order/"
        },
        "examples": [
          {
            "input": "Calls arrive as third(), second(), first()",
            "output": "firstsecondthird",
            "explanation": "third waits for second, and second waits for first."
          },
          {
            "input": "Calls arrive as first(), second(), third()",
            "output": "firstsecondthird",
            "explanation": "All gates are opened in the natural order."
          }
        ],
        "bruteForceComplexity": "Time O(1); Space O(1). Monitor waits guard two boolean conditions.",
        "optimizedComplexity": "Time O(1); Space O(1). CountDownLatch directly models the two happens-before gates.",
        "recursiveComplexity": "Time O(1); Space O(1). The same gates are wrapped behind small helper calls.",
        "bruteForceCode": "class Foo {\n  private boolean firstDone;\n  private boolean secondDone;\n\n  public Foo() {}\n\n  public synchronized void first(Runnable printFirst) throws InterruptedException {\n    printFirst.run();\n    firstDone = true;\n    notifyAll();\n  }\n\n  public synchronized void second(Runnable printSecond) throws InterruptedException {\n    while (!firstDone) wait();\n    printSecond.run();\n    secondDone = true;\n    notifyAll();\n  }\n\n  public synchronized void third(Runnable printThird) throws InterruptedException {\n    while (!secondDone) wait();\n    printThird.run();\n  }\n}",
        "iterativeCode": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    printFirst.run();\n    firstDone.countDown();\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    firstDone.await();\n    printSecond.run();\n    secondDone.countDown();\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    secondDone.await();\n    printThird.run();\n  }\n}",
        "recursiveCode": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    runAndOpen(printFirst, firstDone);\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    waitRunOpen(firstDone, printSecond, secondDone);\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    waitRunOpen(secondDone, printThird, null);\n  }\n\n  private void waitRunOpen(CountDownLatch gate, Runnable action, CountDownLatch next) throws InterruptedException {\n    gate.await();\n    runAndOpen(action, next);\n  }\n\n  private void runAndOpen(Runnable action, CountDownLatch next) {\n    action.run();\n    if (next != null) next.countDown();\n  }\n}",
        "optimizedCode": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    printFirst.run();\n    firstDone.countDown();\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    firstDone.await();\n    printSecond.run();\n    secondDone.countDown();\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    secondDone.await();\n    printThird.run();\n  }\n}",
        "code": "import java.util.concurrent.*;\n\nclass Foo {\n  private final CountDownLatch firstDone = new CountDownLatch(1);\n  private final CountDownLatch secondDone = new CountDownLatch(1);\n\n  public Foo() {}\n\n  public void first(Runnable printFirst) {\n    printFirst.run();\n    firstDone.countDown();\n  }\n\n  public void second(Runnable printSecond) throws InterruptedException {\n    firstDone.await();\n    printSecond.run();\n    secondDone.countDown();\n  }\n\n  public void third(Runnable printThird) throws InterruptedException {\n    secondDone.await();\n    printThird.run();\n  }\n}"
      },
      {
        "group": "core",
        "name": "Print FooBar Alternately",
        "difficulty": "Easy",
        "subpattern": "Alternating output with binary semaphores",
        "question": "Two threads call foo() and bar(). Print \"foobar\" exactly n times in alternating order.",
        "trigger": "One thread must run only after the other thread releases the next turn.",
        "intuition": "Use two one-permit gates; foo starts open and bar starts closed.",
        "edgeCases": "n = 1, bar thread starts first, interrupted acquire, and releasing the wrong gate.",
        "constraints": "n is positive; printFoo prints \"foo\" and printBar prints \"bar\".",
        "source": {
          "label": "LeetCode 1115 - Print FooBar Alternately",
          "url": "https://leetcode.com/problems/print-foobar-alternately/"
        },
        "examples": [
          {
            "input": "n = 1",
            "output": "foobar",
            "explanation": "foo prints once, then bar prints once."
          },
          {
            "input": "n = 3",
            "output": "foobarfoobarfoobar",
            "explanation": "The two gates alternate three times."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(1). Monitor state stores whose turn it is.",
        "optimizedComplexity": "Time O(n); Space O(1). Two semaphores encode the alternating turns.",
        "recursiveComplexity": "Time O(n); Space O(n) recursion depth for each printer helper.",
        "bruteForceCode": "class FooBar {\n  private final int n;\n  private boolean fooTurn = true;\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public synchronized void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      while (!fooTurn) wait();\n      printFoo.run();\n      fooTurn = false;\n      notifyAll();\n    }\n  }\n\n  public synchronized void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      while (fooTurn) wait();\n      printBar.run();\n      fooTurn = true;\n      notifyAll();\n    }\n  }\n}",
        "iterativeCode": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      foo.acquire();\n      printFoo.run();\n      bar.release();\n    }\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      bar.acquire();\n      printBar.run();\n      foo.release();\n    }\n  }\n}",
        "recursiveCode": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    printFooRecursive(0, printFoo);\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    printBarRecursive(0, printBar);\n  }\n\n  private void printFooRecursive(int index, Runnable printFoo) throws InterruptedException {\n    if (index == n) return;\n    foo.acquire();\n    printFoo.run();\n    bar.release();\n    printFooRecursive(index + 1, printFoo);\n  }\n\n  private void printBarRecursive(int index, Runnable printBar) throws InterruptedException {\n    if (index == n) return;\n    bar.acquire();\n    printBar.run();\n    foo.release();\n    printBarRecursive(index + 1, printBar);\n  }\n}",
        "optimizedCode": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      foo.acquire();\n      printFoo.run();\n      bar.release();\n    }\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      bar.acquire();\n      printBar.run();\n      foo.release();\n    }\n  }\n}",
        "code": "import java.util.concurrent.*;\n\nclass FooBar {\n  private final int n;\n  private final Semaphore foo = new Semaphore(1);\n  private final Semaphore bar = new Semaphore(0);\n\n  public FooBar(int n) {\n    this.n = n;\n  }\n\n  public void foo(Runnable printFoo) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      foo.acquire();\n      printFoo.run();\n      bar.release();\n    }\n  }\n\n  public void bar(Runnable printBar) throws InterruptedException {\n    for (int i = 0; i \u003c n; i++) {\n      bar.acquire();\n      printBar.run();\n      foo.release();\n    }\n  }\n}"
      },
      {
        "group": "core",
        "name": "Thread-Safe Counter",
        "difficulty": "Easy",
        "subpattern": "Atomic counter and mutual exclusion",
        "question": "Implement a counter supporting increment(), add(delta), and get() safely from multiple threads.",
        "trigger": "Increment and add are compound updates that lose writes without atomicity.",
        "intuition": "Use one atomic primitive or one lock to make each update indivisible and visible.",
        "edgeCases": "Many increments racing, negative deltas, reading during updates, and integer overflow bounds.",
        "constraints": "All methods may be called concurrently.",
        "source": {
          "label": "Java Concurrency Reference",
          "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
        },
        "examples": [
          {
            "input": "100 threads call increment once",
            "output": "100",
            "explanation": "No increment is lost."
          },
          {
            "input": "add(5), add(-2), get()",
            "output": "3",
            "explanation": "Updates are applied atomically in some serial order."
          }
        ],
        "bruteForceComplexity": "Time O(1); Space O(1). synchronized protects a plain int.",
        "optimizedComplexity": "Time O(1); Space O(1). AtomicInteger performs lock-free atomic updates.",
        "recursiveComplexity": "Time O(1); Space O(1). Recursive style is not natural here, so the tab keeps the synchronized helper path stack-safe.",
        "bruteForceCode": "class ThreadSafeCounter {\n  private int value;\n\n  public synchronized void increment() {\n    value++;\n  }\n\n  public synchronized void add(int delta) {\n    value += delta;\n  }\n\n  public synchronized int get() {\n    return value;\n  }\n}",
        "iterativeCode": "import java.util.concurrent.atomic.*;\n\nclass ThreadSafeCounter {\n  private final AtomicInteger value = new AtomicInteger();\n\n  public void increment() {\n    value.incrementAndGet();\n  }\n\n  public void add(int delta) {\n    value.addAndGet(delta);\n  }\n\n  public int get() {\n    return value.get();\n  }\n}",
        "recursiveCode": "class ThreadSafeCounter {\n  private int value;\n\n  public synchronized void increment() {\n    add(1);\n  }\n\n  public synchronized void add(int delta) {\n    value = applyDelta(value, delta);\n  }\n\n  public synchronized int get() {\n    return value;\n  }\n\n  private int applyDelta(int current, int delta) {\n    return current + delta;\n  }\n}",
        "optimizedCode": "import java.util.concurrent.atomic.*;\n\nclass ThreadSafeCounter {\n  private final AtomicInteger value = new AtomicInteger();\n\n  public void increment() {\n    value.incrementAndGet();\n  }\n\n  public void add(int delta) {\n    value.addAndGet(delta);\n  }\n\n  public int get() {\n    return value.get();\n  }\n}",
        "code": "import java.util.concurrent.atomic.*;\n\nclass ThreadSafeCounter {\n  private final AtomicInteger value = new AtomicInteger();\n\n  public void increment() {\n    value.incrementAndGet();\n  }\n\n  public void add(int delta) {\n    value.addAndGet(delta);\n  }\n\n  public int get() {\n    return value.get();\n  }\n}"
      },
      {
        "group": "core",
        "name": "Producer Consumer Buffer",
        "difficulty": "Medium",
        "subpattern": "Producer-consumer bounded buffer",
        "question": "Implement put(value), take(), and size() for a bounded FIFO buffer shared by producers and consumers.",
        "trigger": "Producers wait for free capacity while consumers wait for available items.",
        "intuition": "The buffer state is valid when 0 \u003c= size \u003c= capacity; every operation waits until it can preserve that invariant.",
        "edgeCases": "Empty take, full put, capacity one, multiple producers, and multiple consumers.",
        "constraints": "The buffer stores integers and all methods may be called concurrently.",
        "source": {
          "label": "Java Concurrency Reference",
          "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html"
        },
        "examples": [
          {
            "input": "put(4), put(5), take(), take()",
            "output": "4 then 5",
            "explanation": "FIFO order is preserved."
          },
          {
            "input": "capacity = 1, put(1), put(2) before take",
            "output": "second put waits",
            "explanation": "The second producer blocks until space exists."
          }
        ],
        "bruteForceComplexity": "Time O(1); Space O(capacity). Monitor wait/notify guards queue state.",
        "optimizedComplexity": "Time O(1); Space O(capacity). ArrayBlockingQueue provides the blocking behavior.",
        "recursiveComplexity": "Time O(1) after conditions are met; Space O(capacity) plus recursive retry depth.",
        "bruteForceCode": "import java.util.*;\n\nclass ProducerConsumerBuffer {\n  private final Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n  private final int capacity;\n\n  public ProducerConsumerBuffer(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void put(int value) throws InterruptedException {\n    while (queue.size() == capacity) wait();\n    queue.offer(value);\n    notifyAll();\n  }\n\n  public synchronized int take() throws InterruptedException {\n    while (queue.isEmpty()) wait();\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
        "iterativeCode": "import java.util.concurrent.*;\n\nclass ProducerConsumerBuffer {\n  private final BlockingQueue\u003cInteger\u003e queue;\n\n  public ProducerConsumerBuffer(int capacity) {\n    queue = new ArrayBlockingQueue\u003c\u003e(capacity);\n  }\n\n  public void put(int value) throws InterruptedException {\n    queue.put(value);\n  }\n\n  public int take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass ProducerConsumerBuffer {\n  private final Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n  private final int capacity;\n\n  public ProducerConsumerBuffer(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void put(int value) throws InterruptedException {\n    if (queue.size() == capacity) {\n      wait();\n      put(value);\n      return;\n    }\n    queue.offer(value);\n    notifyAll();\n  }\n\n  public synchronized int take() throws InterruptedException {\n    if (queue.isEmpty()) {\n      wait();\n      return take();\n    }\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
        "optimizedCode": "import java.util.concurrent.*;\n\nclass ProducerConsumerBuffer {\n  private final BlockingQueue\u003cInteger\u003e queue;\n\n  public ProducerConsumerBuffer(int capacity) {\n    queue = new ArrayBlockingQueue\u003c\u003e(capacity);\n  }\n\n  public void put(int value) throws InterruptedException {\n    queue.put(value);\n  }\n\n  public int take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}",
        "code": "import java.util.concurrent.*;\n\nclass ProducerConsumerBuffer {\n  private final BlockingQueue\u003cInteger\u003e queue;\n\n  public ProducerConsumerBuffer(int capacity) {\n    queue = new ArrayBlockingQueue\u003c\u003e(capacity);\n  }\n\n  public void put(int value) throws InterruptedException {\n    queue.put(value);\n  }\n\n  public int take() throws InterruptedException {\n    return queue.take();\n  }\n\n  public int size() {\n    return queue.size();\n  }\n}"
      },
      {
        "group": "core",
        "name": "Design Bounded Blocking Queue",
        "difficulty": "Medium",
        "subpattern": "Bounded blocking queues with conditions",
        "question": "Implement a fixed-capacity queue where enqueue blocks while full and dequeue blocks while empty.",
        "trigger": "Producers and consumers must wait on opposite capacity conditions.",
        "intuition": "Protect the queue with one lock; producers wait for not-full and consumers wait for not-empty.",
        "edgeCases": "Capacity one, dequeue before enqueue, many producers, many consumers, and size visibility.",
        "constraints": "enqueue and dequeue may be called by multiple threads.",
        "source": {
          "label": "LeetCode 1188 - Design Bounded Blocking Queue",
          "url": "https://leetcode.com/problems/design-bounded-blocking-queue/"
        },
        "examples": [
          {
            "input": "capacity = 2, enqueue(1), enqueue(2), dequeue()",
            "output": "1",
            "explanation": "FIFO order is preserved."
          },
          {
            "input": "capacity = 1, dequeue() starts before enqueue(7)",
            "output": "dequeue returns 7 after enqueue",
            "explanation": "Consumer blocks until an item exists."
          }
        ],
        "bruteForceComplexity": "Time O(1) per operation; Space O(capacity). Monitor wait/notify guards queue size.",
        "optimizedComplexity": "Time O(1) per operation; Space O(capacity). ReentrantLock has separate notFull and notEmpty conditions.",
        "recursiveComplexity": "Time O(1) per successful operation; Space O(capacity) plus retry recursion under contention.",
        "bruteForceCode": "import java.util.*;\n\nclass BoundedBlockingQueue {\n  private final Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n  private final int capacity;\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void enqueue(int element) throws InterruptedException {\n    while (queue.size() == capacity) wait();\n    queue.offer(element);\n    notifyAll();\n  }\n\n  public synchronized int dequeue() throws InterruptedException {\n    while (queue.isEmpty()) wait();\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
        "iterativeCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BoundedBlockingQueue {\n  private final Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void enqueue(int element) throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.size() == capacity) notFull.await();\n      queue.offer(element);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int dequeue() throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.isEmpty()) notEmpty.await();\n      int value = queue.poll();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return queue.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass BoundedBlockingQueue {\n  private final Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n  private final int capacity;\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public synchronized void enqueue(int element) throws InterruptedException {\n    if (queue.size() == capacity) {\n      wait();\n      enqueue(element);\n      return;\n    }\n    queue.offer(element);\n    notifyAll();\n  }\n\n  public synchronized int dequeue() throws InterruptedException {\n    if (queue.isEmpty()) {\n      wait();\n      return dequeue();\n    }\n    int value = queue.poll();\n    notifyAll();\n    return value;\n  }\n\n  public synchronized int size() {\n    return queue.size();\n  }\n}",
        "optimizedCode": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BoundedBlockingQueue {\n  private final Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void enqueue(int element) throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.size() == capacity) notFull.await();\n      queue.offer(element);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int dequeue() throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.isEmpty()) notEmpty.await();\n      int value = queue.poll();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return queue.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}",
        "code": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\nclass BoundedBlockingQueue {\n  private final Queue\u003cInteger\u003e queue = new ArrayDeque\u003c\u003e();\n  private final int capacity;\n  private final Lock lock = new ReentrantLock();\n  private final Condition notFull = lock.newCondition();\n  private final Condition notEmpty = lock.newCondition();\n\n  public BoundedBlockingQueue(int capacity) {\n    this.capacity = capacity;\n  }\n\n  public void enqueue(int element) throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.size() == capacity) notFull.await();\n      queue.offer(element);\n      notEmpty.signal();\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int dequeue() throws InterruptedException {\n    lock.lock();\n    try {\n      while (queue.isEmpty()) notEmpty.await();\n      int value = queue.poll();\n      notFull.signal();\n      return value;\n    } finally {\n      lock.unlock();\n    }\n  }\n\n  public int size() {\n    lock.lock();\n    try {\n      return queue.size();\n    } finally {\n      lock.unlock();\n    }\n  }\n}"
      }
    ]
  }
});
})();
