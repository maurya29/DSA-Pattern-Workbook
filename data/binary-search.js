const CURRENT_PATTERN = {
  "id": "binary-search",
  "name": "Binary Search",
  "summary": "Sorted search, answer search, rotated arrays, boundaries.",
  "complete": true,
  "subpatterns": [
    "Core Binary Search recognition",
    "Boundary handling in Binary Search",
    "Optimized iterative Binary Search",
    "Recursive or DFS-style Binary Search",
    "Advanced Binary Search variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Binary Search",
      "difficulty": "Easy",
      "subpattern": "Classic sorted-array binary search",
      "question": "Given an array nums sorted in strictly increasing order and an integer target, return the index of target if it is present. If target is not present, return -1. The required optimized solution must run in O(log n) time.",
      "trigger": "A sorted array plus exact target lookup means every middle comparison can eliminate the entire left half or right half.",
      "intuition": "Keep an inclusive window [left, right]. The target, if it exists, is always inside this window. Move only the boundary that cannot contain the target.",
      "edgeCases": "Single element matches, single element misses, target smaller than nums[0], target greater than nums[n - 1], negative values, empty array if reused outside LeetCode constraints.",
      "constraints": "1 <= nums.length <= 10000; -10000 < nums[i], target < 10000; nums is sorted in strictly increasing order.",
      "source": {
        "label": "Binary Search - LeetCode 704",
        "url": "https://leetcode.com/problems/binary-search/"
      },
      "examples": [
        {
          "input": "nums = [-1,0,3,5,9,12], target = 9",
          "output": "4",
          "explanation": "nums[4] is 9."
        },
        {
          "input": "nums = [-1,0,3,5,9,12], target = 2",
          "output": "-1",
          "explanation": "2 is not present in nums."
        },
        {
          "input": "nums = [5], target = -5",
          "output": "-1",
          "explanation": "The only value does not match target."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). A linear scan may inspect every element.",
      "optimizedComplexity": "Time O(log n); Space O(1). Each loop removes half of the remaining search window.",
      "recursiveComplexity": "Time O(log n); Space O(log n). The recursion depth is the number of halvings.",
      "bruteForceCode": "class Solution {\n  public int search(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int search(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int search(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int search(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return -1;\n  }\n}",
      "code": "class Solution {\n  public int search(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "First Bad Version",
      "difficulty": "Easy",
      "subpattern": "First true in monotonic predicate",
      "question": "You are given versions 1 through n and an API isBadVersion(version). All versions after a bad version are also bad. Return the first bad version while calling the API as few times as possible.",
      "trigger": "The API result changes once from false to true, so the answer is the first index where a monotonic predicate becomes true.",
      "intuition": "When mid is bad, mid may be the first bad version, so keep it by moving right to mid. When mid is good, discard it and all earlier versions.",
      "edgeCases": "n = 1, bad = 1, first version is bad, last version is bad, very large n requiring overflow-safe midpoint calculation.",
      "constraints": "1 <= bad <= n <= 2^31 - 1; isBadVersion(version) returns false before bad and true from bad onward.",
      "source": {
        "label": "First Bad Version - LeetCode 278",
        "url": "https://leetcode.com/problems/first-bad-version/"
      },
      "examples": [
        {
          "input": "n = 5, bad = 4",
          "output": "4",
          "explanation": "Versions 1, 2, and 3 are good; versions 4 and 5 are bad."
        },
        {
          "input": "n = 1, bad = 1",
          "output": "1",
          "explanation": "The only version is the first bad version."
        },
        {
          "input": "n = 7, bad = 1",
          "output": "1",
          "explanation": "Every version is bad, so the first version is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(bad), worst-case O(n) API calls; Space O(1). Check versions from left to right.",
      "optimizedComplexity": "Time O(log n) API calls; Space O(1). Binary search finds the first true predicate value.",
      "recursiveComplexity": "Time O(log n) API calls; Space O(log n). Recursion stack follows the halved search range.",
      "bruteForceCode": "/* The isBadVersion API is defined in the parent class VersionControl.\n   boolean isBadVersion(int version); */\n\npublic class Solution extends VersionControl {\n  public int firstBadVersion(int n) {\n    for (int version = 1; version <= n; version++) {\n      if (isBadVersion(version)) return version;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "/* The isBadVersion API is defined in the parent class VersionControl.\n   boolean isBadVersion(int version); */\n\npublic class Solution extends VersionControl {\n  public int firstBadVersion(int n) {\n    int left = 1;\n    int right = n;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (isBadVersion(mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n}",
      "recursiveCode": "/* The isBadVersion API is defined in the parent class VersionControl.\n   boolean isBadVersion(int version); */\n\npublic class Solution extends VersionControl {\n  public int firstBadVersion(int n) {\n    return firstBadVersion(1, n);\n  }\n\n  private int firstBadVersion(int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (isBadVersion(mid)) return firstBadVersion(left, mid);\n    return firstBadVersion(mid + 1, right);\n  }\n}",
      "optimizedCode": "/* The isBadVersion API is defined in the parent class VersionControl.\n   boolean isBadVersion(int version); */\n\npublic class Solution extends VersionControl {\n  public int firstBadVersion(int n) {\n    int left = 1;\n    int right = n;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (isBadVersion(mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n}",
      "code": "/* The isBadVersion API is defined in the parent class VersionControl.\n   boolean isBadVersion(int version); */\n\npublic class Solution extends VersionControl {\n  public int firstBadVersion(int n) {\n    int left = 1;\n    int right = n;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (isBadVersion(mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search Insert Position",
      "difficulty": "Easy",
      "subpattern": "Lower bound binary search",
      "question": "Given a sorted array of distinct integers nums and an integer target, return the index if target is found. Otherwise return the index where target should be inserted to keep nums sorted. The optimized solution must run in O(log n) time.",
      "trigger": "The answer is the first index i where nums[i] >= target. That is exactly a lower-bound boundary search.",
      "intuition": "Use a half-open window [left, right). If nums[mid] is smaller than target, the insertion point is after mid; otherwise mid remains a valid candidate.",
      "edgeCases": "Target equals an existing value, insert at index 0, insert at nums.length, insert between two values, one-element array.",
      "constraints": "1 <= nums.length <= 10000; -10000 <= nums[i], target <= 10000; nums is sorted in ascending order with distinct values.",
      "source": {
        "label": "Search Insert Position - LeetCode 35",
        "url": "https://leetcode.com/problems/search-insert-position/"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,6], target = 5",
          "output": "2",
          "explanation": "5 already exists at index 2."
        },
        {
          "input": "nums = [1,3,5,6], target = 2",
          "output": "1",
          "explanation": "2 belongs between 1 and 3."
        },
        {
          "input": "nums = [1,3,5,6], target = 7",
          "output": "4",
          "explanation": "7 should be inserted after all existing values."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Scan until the first value that is not smaller than target.",
      "optimizedComplexity": "Time O(log n); Space O(1). Lower-bound binary search halves the candidate index range.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive lower bound uses one call per halving.",
      "bruteForceCode": "class Solution {\n  public int searchInsert(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] >= target) return i;\n    }\n    return nums.length;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int searchInsert(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int searchInsert(int[] nums, int target) {\n    return lowerBound(nums, target, 0, nums.length);\n  }\n\n  private int lowerBound(int[] nums, int target, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (nums[mid] < target) return lowerBound(nums, target, mid + 1, right);\n    return lowerBound(nums, target, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int searchInsert(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}",
      "code": "class Solution {\n  public int searchInsert(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find First and Last Position of Element in Sorted Array",
      "difficulty": "Medium",
      "subpattern": "Leftmost and rightmost duplicate boundary",
      "question": "Given an array nums sorted in non-decreasing order and an integer target, return the first and last index of target. If target is not found, return [-1, -1]. The optimized solution must run in O(log n) time.",
      "trigger": "Duplicates break normal binary search because finding one target is not enough; the task asks for both target boundaries.",
      "intuition": "Run two boundary searches: first index with nums[i] >= target and first index with nums[i] > target. Validate the left boundary before returning the range.",
      "edgeCases": "Empty array, target absent, target appears once, target fills the whole array, target starts at index 0, target ends at index n - 1.",
      "constraints": "0 <= nums.length <= 100000; -1000000000 <= nums[i], target <= 1000000000; nums is sorted in non-decreasing order.",
      "source": {
        "label": "Find First and Last Position - LeetCode 34",
        "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
      },
      "examples": [
        {
          "input": "nums = [5,7,7,8,8,10], target = 8",
          "output": "[3,4]",
          "explanation": "8 starts at index 3 and ends at index 4."
        },
        {
          "input": "nums = [5,7,7,8,8,10], target = 6",
          "output": "[-1,-1]",
          "explanation": "6 is not present."
        },
        {
          "input": "nums = [], target = 0",
          "output": "[-1,-1]",
          "explanation": "The array is empty."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Inspect all positions to record the first and last match.",
      "optimizedComplexity": "Time O(log n); Space O(1). Two binary searches locate the lower and upper boundaries.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive boundary searches add logarithmic call-stack space.",
      "bruteForceCode": "class Solution {\n  public int[] searchRange(int[] nums, int target) {\n    int first = -1;\n    int last = -1;\n\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) {\n        if (first == -1) first = i;\n        last = i;\n      }\n    }\n\n    return new int[] {first, last};\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] searchRange(int[] nums, int target) {\n    int first = firstGreaterOrEqual(nums, target);\n    if (first == nums.length || nums[first] != target) return new int[] {-1, -1};\n\n    int afterLast = firstGreaterThan(nums, target);\n    return new int[] {first, afterLast - 1};\n  }\n\n  private int firstGreaterOrEqual(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n\n  private int firstGreaterThan(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] searchRange(int[] nums, int target) {\n    int first = firstGreaterOrEqual(nums, target, 0, nums.length);\n    if (first == nums.length || nums[first] != target) return new int[] {-1, -1};\n\n    int afterLast = firstGreaterThan(nums, target, 0, nums.length);\n    return new int[] {first, afterLast - 1};\n  }\n\n  private int firstGreaterOrEqual(int[] nums, int target, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (nums[mid] < target) return firstGreaterOrEqual(nums, target, mid + 1, right);\n    return firstGreaterOrEqual(nums, target, left, mid);\n  }\n\n  private int firstGreaterThan(int[] nums, int target, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (nums[mid] <= target) return firstGreaterThan(nums, target, mid + 1, right);\n    return firstGreaterThan(nums, target, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] searchRange(int[] nums, int target) {\n    int first = firstGreaterOrEqual(nums, target);\n    if (first == nums.length || nums[first] != target) return new int[] {-1, -1};\n\n    int afterLast = firstGreaterThan(nums, target);\n    return new int[] {first, afterLast - 1};\n  }\n\n  private int firstGreaterOrEqual(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n\n  private int firstGreaterThan(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}",
      "code": "class Solution {\n  public int[] searchRange(int[] nums, int target) {\n    int first = firstGreaterOrEqual(nums, target);\n    if (first == nums.length || nums[first] != target) return new int[] {-1, -1};\n\n    int afterLast = firstGreaterThan(nums, target);\n    return new int[] {first, afterLast - 1};\n  }\n\n  private int firstGreaterOrEqual(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n\n  private int firstGreaterThan(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Sqrt(x)",
      "difficulty": "Easy",
      "subpattern": "Last true in numeric answer space",
      "question": "Given a non-negative integer x, return the floor of its square root. You must not use built-in exponent functions or square-root functions.",
      "trigger": "For any candidate root r, the predicate r * r <= x is true up to the answer and false after it, creating a monotonic answer space.",
      "intuition": "Search for the largest valid root. When mid is valid, save it and move right; when mid is too large, move left.",
      "edgeCases": "x = 0, x = 1, perfect square, non-perfect square, x close to Integer.MAX_VALUE, multiplication overflow if int is used for mid * mid.",
      "constraints": "0 <= x <= 2^31 - 1; built-in exponent and square-root functions are not allowed.",
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
          "explanation": "The real square root is about 2.828, so the floor is 2."
        },
        {
          "input": "x = 2147395599",
          "output": "46339",
          "explanation": "46339 is the largest integer whose square does not exceed x."
        }
      ],
      "bruteForceComplexity": "Time O(sqrt(x)); Space O(1). Increase the candidate root until the next square is too large.",
      "optimizedComplexity": "Time O(log x); Space O(1). Binary search over candidate roots from 1 to x / 2.",
      "recursiveComplexity": "Time O(log x); Space O(log x). Recursive search keeps one stack frame per halving.",
      "bruteForceCode": "class Solution {\n  public int mySqrt(int x) {\n    int root = 0;\n\n    while ((long) (root + 1) * (root + 1) <= x) {\n      root++;\n    }\n\n    return root;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int mySqrt(int x) {\n    if (x < 2) return x;\n\n    int left = 1;\n    int right = x / 2;\n    int answer = 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n\n      if (square <= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int mySqrt(int x) {\n    if (x < 2) return x;\n    return mySqrt(x, 1, x / 2, 1);\n  }\n\n  private int mySqrt(int x, int left, int right, int answer) {\n    if (left > right) return answer;\n\n    int mid = left + (right - left) / 2;\n    long square = (long) mid * mid;\n\n    if (square <= x) return mySqrt(x, mid + 1, right, mid);\n    return mySqrt(x, left, mid - 1, answer);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int mySqrt(int x) {\n    if (x < 2) return x;\n\n    int left = 1;\n    int right = x / 2;\n    int answer = 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n\n      if (square <= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int mySqrt(int x) {\n    if (x < 2) return x;\n\n    int left = 1;\n    int right = x / 2;\n    int answer = 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n\n      if (square <= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Valid Perfect Square",
      "difficulty": "Easy",
      "subpattern": "Binary search on numeric answer",
      "question": "Given a positive integer num, return true if num is a perfect square. Otherwise return false. You must not use built-in square-root functions.",
      "trigger": "The predicate mid * mid >= num changes monotonically over candidate roots, so binary search can find whether an exact square exists.",
      "intuition": "Search candidate roots from 1 to num / 2. If mid squared is too small, move right; if too large, move left; exact equality proves a perfect square.",
      "edgeCases": "num = 1, num = 2, large perfect square, large non-perfect square, integer overflow from mid * mid.",
      "constraints": "1 <= num <= 2^31 - 1; do not use built-in square-root functions.",
      "source": {
        "label": "Valid Perfect Square - LeetCode 367",
        "url": "https://leetcode.com/problems/valid-perfect-square/"
      },
      "examples": [
        {
          "input": "num = 16",
          "output": "true",
          "explanation": "4 * 4 equals 16."
        },
        {
          "input": "num = 14",
          "output": "false",
          "explanation": "No integer squared equals 14."
        },
        {
          "input": "num = 1",
          "output": "true",
          "explanation": "1 * 1 equals 1."
        }
      ],
      "bruteForceComplexity": "Time O(sqrt(num)); Space O(1). Try roots until root * root reaches or passes num.",
      "optimizedComplexity": "Time O(log num); Space O(1). Binary search halves the candidate root range.",
      "recursiveComplexity": "Time O(log num); Space O(log num). Recursion stack follows the binary-search depth.",
      "bruteForceCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    for (long root = 1; root * root <= num; root++) {\n      if (root * root == num) return true;\n    }\n\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    if (num == 1) return true;\n\n    int left = 1;\n    int right = num / 2;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n\n      if (square == num) return true;\n      if (square < num) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    if (num == 1) return true;\n    return search(num, 1, num / 2);\n  }\n\n  private boolean search(int num, int left, int right) {\n    if (left > right) return false;\n\n    int mid = left + (right - left) / 2;\n    long square = (long) mid * mid;\n\n    if (square == num) return true;\n    if (square < num) return search(num, mid + 1, right);\n    return search(num, left, mid - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    if (num == 1) return true;\n\n    int left = 1;\n    int right = num / 2;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n\n      if (square == num) return true;\n      if (square < num) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    if (num == 1) return true;\n\n    int left = 1;\n    int right = num / 2;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n\n      if (square == num) return true;\n      if (square < num) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search in Rotated Sorted Array",
      "difficulty": "Medium",
      "subpattern": "Binary search on rotated sorted array",
      "question": "Given a sorted array of distinct integers that has been rotated at an unknown pivot and an integer target, return the index of target if it exists. Otherwise return -1. The optimized solution must run in O(log n) time.",
      "trigger": "Although the whole array is rotated, at least one side of every midpoint is still sorted, allowing one half to be discarded.",
      "intuition": "Identify whether the left half or right half is sorted. If target lies inside that sorted half, keep it; otherwise search the other half.",
      "edgeCases": "Array not rotated, rotation at last index, one element, target missing, target at pivot, target at first or last index.",
      "constraints": "1 <= nums.length <= 5000; -10000 <= nums[i], target <= 10000; nums contains distinct values and is rotated from ascending order.",
      "source": {
        "label": "Search in Rotated Sorted Array - LeetCode 33",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
      },
      "examples": [
        {
          "input": "nums = [4,5,6,7,0,1,2], target = 0",
          "output": "4",
          "explanation": "0 is at index 4 after the rotation pivot."
        },
        {
          "input": "nums = [4,5,6,7,0,1,2], target = 3",
          "output": "-1",
          "explanation": "3 is not in the array."
        },
        {
          "input": "nums = [1], target = 0",
          "output": "-1",
          "explanation": "The only element does not match target."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Scan every index until target is found.",
      "optimizedComplexity": "Time O(log n); Space O(1). Each step discards one sorted or impossible half.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive calls follow the remaining half of the array.",
      "bruteForceCode": "class Solution {\n  public int search(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int search(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n\n      if (nums[left] <= nums[mid]) {\n        if (nums[left] <= target && target < nums[mid]) {\n          right = mid - 1;\n        } else {\n          left = mid + 1;\n        }\n      } else {\n        if (nums[mid] < target && target <= nums[right]) {\n          left = mid + 1;\n        } else {\n          right = mid - 1;\n        }\n      }\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int search(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n\n    if (nums[left] <= nums[mid]) {\n      if (nums[left] <= target && target < nums[mid]) {\n        return search(nums, target, left, mid - 1);\n      }\n      return search(nums, target, mid + 1, right);\n    }\n\n    if (nums[mid] < target && target <= nums[right]) {\n      return search(nums, target, mid + 1, right);\n    }\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int search(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n\n      if (nums[left] <= nums[mid]) {\n        if (nums[left] <= target && target < nums[mid]) {\n          right = mid - 1;\n        } else {\n          left = mid + 1;\n        }\n      } else {\n        if (nums[mid] < target && target <= nums[right]) {\n          left = mid + 1;\n        } else {\n          right = mid - 1;\n        }\n      }\n    }\n\n    return -1;\n  }\n}",
      "code": "class Solution {\n  public int search(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n\n      if (nums[left] <= nums[mid]) {\n        if (nums[left] <= target && target < nums[mid]) {\n          right = mid - 1;\n        } else {\n          left = mid + 1;\n        }\n      } else {\n        if (nums[mid] < target && target <= nums[right]) {\n          left = mid + 1;\n        } else {\n          right = mid - 1;\n        }\n      }\n    }\n\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Minimum in Rotated Sorted Array",
      "difficulty": "Medium",
      "subpattern": "Minimum boundary in rotated sorted array",
      "question": "Given a sorted array of unique integers rotated between 1 and n times, return the minimum element. The optimized solution must run in O(log n) time.",
      "trigger": "In a rotated sorted array without duplicates, comparing nums[mid] with nums[right] tells which side contains the rotation minimum.",
      "intuition": "The minimum is the rotation boundary. If nums[mid] is greater than nums[right], the minimum is to the right of mid; otherwise mid may be the minimum.",
      "edgeCases": "Array length 1, array already sorted, rotation by one, rotation by n, minimum at the last index, minimum at the first index.",
      "constraints": "1 <= nums.length <= 5000; -5000 <= nums[i] <= 5000; all integers are unique; nums is a rotated ascending array.",
      "source": {
        "label": "Find Minimum in Rotated Sorted Array - LeetCode 153",
        "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
      },
      "examples": [
        {
          "input": "nums = [3,4,5,1,2]",
          "output": "1",
          "explanation": "1 is the rotation boundary and the minimum value."
        },
        {
          "input": "nums = [4,5,6,7,0,1,2]",
          "output": "0",
          "explanation": "0 is smaller than every other value."
        },
        {
          "input": "nums = [11,13,15,17]",
          "output": "11",
          "explanation": "The array is effectively already sorted."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Inspect every value and keep the minimum.",
      "optimizedComplexity": "Time O(log n); Space O(1). Binary search moves toward the rotation boundary.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursion depth is logarithmic.",
      "bruteForceCode": "class Solution {\n  public int findMin(int[] nums) {\n    int minimum = nums[0];\n\n    for (int value : nums) {\n      if (value < minimum) minimum = value;\n    }\n\n    return minimum;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findMin(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] > nums[right]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return nums[left];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findMin(int[] nums) {\n    return findMin(nums, 0, nums.length - 1);\n  }\n\n  private int findMin(int[] nums, int left, int right) {\n    if (left == right) return nums[left];\n\n    int mid = left + (right - left) / 2;\n    if (nums[mid] > nums[right]) return findMin(nums, mid + 1, right);\n    return findMin(nums, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findMin(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] > nums[right]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return nums[left];\n  }\n}",
      "code": "class Solution {\n  public int findMin(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] > nums[right]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return nums[left];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Peak Element",
      "difficulty": "Medium",
      "subpattern": "Binary search on slope direction",
      "question": "A peak element is an element strictly greater than its neighbors. Given an integer array nums where adjacent values are not equal, return the index of any peak element. Treat nums[-1] and nums[n] as negative infinity. The optimized solution must run in O(log n) time.",
      "trigger": "The comparison between nums[mid] and nums[mid + 1] reveals an upward or downward slope, and a peak is guaranteed in the chosen direction.",
      "intuition": "If the slope goes up from mid to mid + 1, a peak exists on the right. Otherwise, mid or something on the left can be a peak.",
      "edgeCases": "Single element, peak at index 0, peak at last index, multiple valid peaks, strictly increasing array, strictly decreasing array.",
      "constraints": "1 <= nums.length <= 1000; -2^31 <= nums[i] <= 2^31 - 1; nums[i] != nums[i + 1].",
      "source": {
        "label": "Find Peak Element - LeetCode 162",
        "url": "https://leetcode.com/problems/find-peak-element/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,1]",
          "output": "2",
          "explanation": "3 is greater than both neighbors."
        },
        {
          "input": "nums = [1,2,1,3,5,6,4]",
          "output": "5",
          "explanation": "Index 5 is valid because 6 is a peak; index 1 is also a valid peak."
        },
        {
          "input": "nums = [1]",
          "output": "0",
          "explanation": "The single element is a peak."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Check each index against its neighbors.",
      "optimizedComplexity": "Time O(log n); Space O(1). Each slope check discards one side that does not need to be searched.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive slope search halves the range.",
      "bruteForceCode": "class Solution {\n  public int findPeakElement(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n      boolean leftOk = i == 0 || nums[i] > nums[i - 1];\n      boolean rightOk = i == nums.length - 1 || nums[i] > nums[i + 1];\n      if (leftOk && rightOk) return i;\n    }\n\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findPeakElement(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] < nums[mid + 1]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findPeakElement(int[] nums) {\n    return findPeak(nums, 0, nums.length - 1);\n  }\n\n  private int findPeak(int[] nums, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (nums[mid] < nums[mid + 1]) return findPeak(nums, mid + 1, right);\n    return findPeak(nums, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findPeakElement(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] < nums[mid + 1]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}",
      "code": "class Solution {\n  public int findPeakElement(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (nums[mid] < nums[mid + 1]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Peak Index in a Mountain Array",
      "difficulty": "Easy",
      "subpattern": "Binary search on mountain peak",
      "question": "Given a mountain array arr, return the index of its peak. A mountain array strictly increases up to one peak and then strictly decreases.",
      "trigger": "A mountain array has one turning point. Comparing arr[mid] with arr[mid + 1] tells whether the peak is still to the right or at/before mid.",
      "intuition": "Move toward the increasing slope until it stops. If arr[mid] < arr[mid + 1], the peak is right; otherwise mid may be the peak.",
      "edgeCases": "Minimum length 3, peak at index 1, peak at index n - 2, very steep increase, very steep decrease.",
      "constraints": "3 <= arr.length <= 100000; 0 <= arr[i] <= 1000000; arr is guaranteed to be a valid mountain array.",
      "source": {
        "label": "Peak Index in a Mountain Array - LeetCode 852",
        "url": "https://leetcode.com/problems/peak-index-in-a-mountain-array/"
      },
      "examples": [
        {
          "input": "arr = [0,1,0]",
          "output": "1",
          "explanation": "1 is greater than both neighbors."
        },
        {
          "input": "arr = [0,2,1,0]",
          "output": "1",
          "explanation": "2 is the peak value."
        },
        {
          "input": "arr = [0,10,5,2]",
          "output": "1",
          "explanation": "10 is the only turning point."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Scan until the first element greater than both neighbors.",
      "optimizedComplexity": "Time O(log n); Space O(1). Binary search follows the slope toward the peak.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive calls halve the mountain interval.",
      "bruteForceCode": "class Solution {\n  public int peakIndexInMountainArray(int[] arr) {\n    for (int i = 1; i < arr.length - 1; i++) {\n      if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) return i;\n    }\n\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int peakIndexInMountainArray(int[] arr) {\n    int left = 0;\n    int right = arr.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (arr[mid] < arr[mid + 1]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int peakIndexInMountainArray(int[] arr) {\n    return peak(arr, 0, arr.length - 1);\n  }\n\n  private int peak(int[] arr, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (arr[mid] < arr[mid + 1]) return peak(arr, mid + 1, right);\n    return peak(arr, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int peakIndexInMountainArray(int[] arr) {\n    int left = 0;\n    int right = arr.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (arr[mid] < arr[mid + 1]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}",
      "code": "class Solution {\n  public int peakIndexInMountainArray(int[] arr) {\n    int left = 0;\n    int right = arr.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (arr[mid] < arr[mid + 1]) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Single Element in a Sorted Array",
      "difficulty": "Medium",
      "subpattern": "Parity-based binary search on pairs",
      "question": "Given a sorted array where every element appears exactly twice except one element that appears once, return the single element. The optimized solution must run in O(log n) time and O(1) space.",
      "trigger": "Before the single element, pairs start at even indexes. After the single element, pair alignment flips, so index parity tells which half contains the answer.",
      "intuition": "Force mid to the first index of a pair. If nums[mid] equals nums[mid + 1], the single element is after that pair; otherwise it is at mid or before mid.",
      "edgeCases": "Array length 1, single element at index 0, single element at last index, single element in the middle, negative values.",
      "constraints": "1 <= nums.length <= 100000; nums.length is odd; every value appears twice except one; nums is sorted.",
      "source": {
        "label": "Single Element in a Sorted Array - LeetCode 540",
        "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/"
      },
      "examples": [
        {
          "input": "nums = [1,1,2,3,3,4,4,8,8]",
          "output": "2",
          "explanation": "2 is the only value that appears once."
        },
        {
          "input": "nums = [3,3,7,7,10,11,11]",
          "output": "10",
          "explanation": "10 is the unpaired element."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The only element is single."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Check elements in pairs until the broken pair is found.",
      "optimizedComplexity": "Time O(log n); Space O(1). Binary search uses pair parity to discard half the array.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursion follows the same halved parity search.",
      "bruteForceCode": "class Solution {\n  public int singleNonDuplicate(int[] nums) {\n    for (int i = 0; i < nums.length - 1; i += 2) {\n      if (nums[i] != nums[i + 1]) return nums[i];\n    }\n\n    return nums[nums.length - 1];\n  }\n}",
      "iterativeCode": "class Solution {\n  public int singleNonDuplicate(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (mid % 2 == 1) mid--;\n\n      if (nums[mid] == nums[mid + 1]) {\n        left = mid + 2;\n      } else {\n        right = mid;\n      }\n    }\n\n    return nums[left];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int singleNonDuplicate(int[] nums) {\n    return search(nums, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int left, int right) {\n    if (left == right) return nums[left];\n\n    int mid = left + (right - left) / 2;\n    if (mid % 2 == 1) mid--;\n\n    if (nums[mid] == nums[mid + 1]) return search(nums, mid + 2, right);\n    return search(nums, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int singleNonDuplicate(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (mid % 2 == 1) mid--;\n\n      if (nums[mid] == nums[mid + 1]) {\n        left = mid + 2;\n      } else {\n        right = mid;\n      }\n    }\n\n    return nums[left];\n  }\n}",
      "code": "class Solution {\n  public int singleNonDuplicate(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (mid % 2 == 1) mid--;\n\n      if (nums[mid] == nums[mid + 1]) {\n        left = mid + 2;\n      } else {\n        right = mid;\n      }\n    }\n\n    return nums[left];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Find Smallest Letter Greater Than Target",
      "difficulty": "Easy",
      "subpattern": "Upper bound with circular wrap",
      "question": "Given a sorted array of lowercase letters and a target letter, return the smallest letter in the array that is strictly greater than target. The letters wrap around, so if no larger letter exists, return letters[0].",
      "trigger": "The answer is the first index where letters[i] > target, which is an upper-bound search with a wrap-around fallback.",
      "intuition": "Binary search for the first letter greater than target. If the boundary reaches the array length, wrap to index 0.",
      "edgeCases": "Target before all letters, target equal to repeated letters, target greater than or equal to last letter, all letters same, wrap-around answer.",
      "constraints": "2 <= letters.length <= 10000; letters is sorted in non-decreasing order; letters contains lowercase English letters; target is lowercase.",
      "source": {
        "label": "Find Smallest Letter Greater Than Target - LeetCode 744",
        "url": "https://leetcode.com/problems/find-smallest-letter-greater-than-target/"
      },
      "examples": [
        {
          "input": "letters = [\"c\",\"f\",\"j\"], target = \"a\"",
          "output": "\"c\"",
          "explanation": "c is the smallest letter greater than a."
        },
        {
          "input": "letters = [\"c\",\"f\",\"j\"], target = \"c\"",
          "output": "\"f\"",
          "explanation": "The answer must be strictly greater than c."
        },
        {
          "input": "letters = [\"x\",\"x\",\"y\",\"y\"], target = \"z\"",
          "output": "\"x\"",
          "explanation": "No letter is greater than z, so the answer wraps to x."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Scan for the first letter greater than target.",
      "optimizedComplexity": "Time O(log n); Space O(1). Upper-bound binary search finds the first greater letter.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive upper bound uses logarithmic stack depth.",
      "bruteForceCode": "class Solution {\n  public char nextGreatestLetter(char[] letters, char target) {\n    for (char letter : letters) {\n      if (letter > target) return letter;\n    }\n\n    return letters[0];\n  }\n}",
      "iterativeCode": "class Solution {\n  public char nextGreatestLetter(char[] letters, char target) {\n    int left = 0;\n    int right = letters.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (letters[mid] <= target) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return letters[left % letters.length];\n  }\n}",
      "recursiveCode": "class Solution {\n  public char nextGreatestLetter(char[] letters, char target) {\n    int index = upperBound(letters, target, 0, letters.length);\n    return letters[index % letters.length];\n  }\n\n  private int upperBound(char[] letters, char target, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (letters[mid] <= target) return upperBound(letters, target, mid + 1, right);\n    return upperBound(letters, target, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public char nextGreatestLetter(char[] letters, char target) {\n    int left = 0;\n    int right = letters.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (letters[mid] <= target) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return letters[left % letters.length];\n  }\n}",
      "code": "class Solution {\n  public char nextGreatestLetter(char[] letters, char target) {\n    int left = 0;\n    int right = letters.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (letters[mid] <= target) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return letters[left % letters.length];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Koko Eating Bananas",
      "difficulty": "Medium",
      "subpattern": "Minimum feasible answer search",
      "question": "Koko has piles of bananas and h hours. Each hour she chooses one pile and eats up to k bananas from it. Return the minimum integer speed k such that she can eat all bananas within h hours.",
      "trigger": "If Koko can finish at speed k, she can also finish at any faster speed. This monotonic feasibility makes the minimum speed binary-searchable.",
      "intuition": "Binary search speed from 1 to max pile. For each speed, compute total hours using ceiling division. Keep speeds that finish within h.",
      "edgeCases": "One pile, h equals number of piles, very large pile sizes, all piles equal, speed 1, answer equals max pile.",
      "constraints": "1 <= piles.length <= 10000; piles.length <= h <= 1000000000; 1 <= piles[i] <= 1000000000.",
      "source": {
        "label": "Koko Eating Bananas - LeetCode 875",
        "url": "https://leetcode.com/problems/koko-eating-bananas/"
      },
      "examples": [
        {
          "input": "piles = [3,6,7,11], h = 8",
          "output": "4",
          "explanation": "At speed 4, total hours are 1 + 2 + 2 + 3 = 8."
        },
        {
          "input": "piles = [30,11,23,4,20], h = 5",
          "output": "30",
          "explanation": "Only speed 30 can finish one pile per hour."
        },
        {
          "input": "piles = [30,11,23,4,20], h = 6",
          "output": "23",
          "explanation": "Speed 23 finishes within 6 hours; lower speeds do not."
        }
      ],
      "bruteForceComplexity": "Time O(n * maxPile); Space O(1). Try every possible speed from 1 to the largest pile.",
      "optimizedComplexity": "Time O(n log maxPile); Space O(1). Each binary-search check scans all piles once.",
      "recursiveComplexity": "Time O(n log maxPile); Space O(log maxPile). Recursive answer search adds stack space.",
      "bruteForceCode": "class Solution {\n  public int minEatingSpeed(int[] piles, int h) {\n    int maxPile = 0;\n    for (int pile : piles) maxPile = Math.max(maxPile, pile);\n\n    for (int speed = 1; speed <= maxPile; speed++) {\n      if (canFinish(piles, h, speed)) return speed;\n    }\n\n    return maxPile;\n  }\n\n  private boolean canFinish(int[] piles, int h, int speed) {\n    long hours = 0;\n    for (int pile : piles) {\n      hours += (pile + speed - 1L) / speed;\n    }\n    return hours <= h;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minEatingSpeed(int[] piles, int h) {\n    int left = 1;\n    int right = 0;\n    for (int pile : piles) right = Math.max(right, pile);\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canFinish(piles, h, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canFinish(int[] piles, int h, int speed) {\n    long hours = 0;\n    for (int pile : piles) {\n      hours += (pile + speed - 1L) / speed;\n      if (hours > h) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minEatingSpeed(int[] piles, int h) {\n    int maxPile = 0;\n    for (int pile : piles) maxPile = Math.max(maxPile, pile);\n    return search(piles, h, 1, maxPile);\n  }\n\n  private int search(int[] piles, int h, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (canFinish(piles, h, mid)) return search(piles, h, left, mid);\n    return search(piles, h, mid + 1, right);\n  }\n\n  private boolean canFinish(int[] piles, int h, int speed) {\n    long hours = 0;\n    for (int pile : piles) {\n      hours += (pile + speed - 1L) / speed;\n      if (hours > h) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minEatingSpeed(int[] piles, int h) {\n    int left = 1;\n    int right = 0;\n    for (int pile : piles) right = Math.max(right, pile);\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canFinish(piles, h, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canFinish(int[] piles, int h, int speed) {\n    long hours = 0;\n    for (int pile : piles) {\n      hours += (pile + speed - 1L) / speed;\n      if (hours > h) return false;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public int minEatingSpeed(int[] piles, int h) {\n    int left = 1;\n    int right = 0;\n    for (int pile : piles) right = Math.max(right, pile);\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canFinish(piles, h, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canFinish(int[] piles, int h, int speed) {\n    long hours = 0;\n    for (int pile : piles) {\n      hours += (pile + speed - 1L) / speed;\n      if (hours > h) return false;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Capacity To Ship Packages Within D Days",
      "difficulty": "Medium",
      "subpattern": "Minimum feasible capacity search",
      "question": "Given package weights in order and an integer days, return the least ship capacity needed to ship all packages within days days. Packages must be shipped in the given order.",
      "trigger": "If a capacity can ship all packages within days, any larger capacity can also do it. That monotonic feasibility supports binary search on capacity.",
      "intuition": "The capacity must be at least the heaviest package and at most the sum of all weights. Binary search this range and simulate required days for each capacity.",
      "edgeCases": "days = 1, days equals weights.length, one package, one very heavy package, all weights equal, capacity exactly equals max weight.",
      "constraints": "1 <= days <= weights.length <= 50000; 1 <= weights[i] <= 500.",
      "source": {
        "label": "Capacity To Ship Packages Within D Days - LeetCode 1011",
        "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
      },
      "examples": [
        {
          "input": "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
          "output": "15",
          "explanation": "Capacity 15 can ship the packages in 5 days."
        },
        {
          "input": "weights = [3,2,2,4,1,4], days = 3",
          "output": "6",
          "explanation": "Capacity 6 is the least feasible capacity."
        },
        {
          "input": "weights = [1,2,3,1,1], days = 4",
          "output": "3",
          "explanation": "Capacity 3 ships all packages within 4 days."
        }
      ],
      "bruteForceComplexity": "Time O(n * (sumWeights - maxWeight)); Space O(1). Try every capacity from max weight to total weight.",
      "optimizedComplexity": "Time O(n log sumWeights); Space O(1). Each feasibility check scans weights once.",
      "recursiveComplexity": "Time O(n log sumWeights); Space O(log sumWeights). Recursive search adds logarithmic stack space.",
      "bruteForceCode": "class Solution {\n  public int shipWithinDays(int[] weights, int days) {\n    int maxWeight = 0;\n    int sum = 0;\n    for (int weight : weights) {\n      maxWeight = Math.max(maxWeight, weight);\n      sum += weight;\n    }\n\n    for (int capacity = maxWeight; capacity <= sum; capacity++) {\n      if (canShip(weights, days, capacity)) return capacity;\n    }\n\n    return sum;\n  }\n\n  private boolean canShip(int[] weights, int days, int capacity) {\n    int usedDays = 1;\n    int load = 0;\n\n    for (int weight : weights) {\n      if (load + weight > capacity) {\n        usedDays++;\n        load = 0;\n      }\n      load += weight;\n    }\n\n    return usedDays <= days;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int shipWithinDays(int[] weights, int days) {\n    int left = 0;\n    int right = 0;\n\n    for (int weight : weights) {\n      left = Math.max(left, weight);\n      right += weight;\n    }\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canShip(weights, days, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canShip(int[] weights, int days, int capacity) {\n    int usedDays = 1;\n    int load = 0;\n\n    for (int weight : weights) {\n      if (load + weight > capacity) {\n        usedDays++;\n        load = 0;\n      }\n      load += weight;\n      if (usedDays > days) return false;\n    }\n\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int shipWithinDays(int[] weights, int days) {\n    int left = 0;\n    int right = 0;\n\n    for (int weight : weights) {\n      left = Math.max(left, weight);\n      right += weight;\n    }\n\n    return search(weights, days, left, right);\n  }\n\n  private int search(int[] weights, int days, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (canShip(weights, days, mid)) return search(weights, days, left, mid);\n    return search(weights, days, mid + 1, right);\n  }\n\n  private boolean canShip(int[] weights, int days, int capacity) {\n    int usedDays = 1;\n    int load = 0;\n\n    for (int weight : weights) {\n      if (load + weight > capacity) {\n        usedDays++;\n        load = 0;\n      }\n      load += weight;\n      if (usedDays > days) return false;\n    }\n\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int shipWithinDays(int[] weights, int days) {\n    int left = 0;\n    int right = 0;\n\n    for (int weight : weights) {\n      left = Math.max(left, weight);\n      right += weight;\n    }\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canShip(weights, days, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canShip(int[] weights, int days, int capacity) {\n    int usedDays = 1;\n    int load = 0;\n\n    for (int weight : weights) {\n      if (load + weight > capacity) {\n        usedDays++;\n        load = 0;\n      }\n      load += weight;\n      if (usedDays > days) return false;\n    }\n\n    return true;\n  }\n}",
      "code": "class Solution {\n  public int shipWithinDays(int[] weights, int days) {\n    int left = 0;\n    int right = 0;\n\n    for (int weight : weights) {\n      left = Math.max(left, weight);\n      right += weight;\n    }\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canShip(weights, days, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canShip(int[] weights, int days, int capacity) {\n    int usedDays = 1;\n    int load = 0;\n\n    for (int weight : weights) {\n      if (load + weight > capacity) {\n        usedDays++;\n        load = 0;\n      }\n      load += weight;\n      if (usedDays > days) return false;\n    }\n\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Split Array Largest Sum",
      "difficulty": "Hard",
      "subpattern": "Minimize maximum partition sum",
      "question": "Given an integer array nums and an integer k, split nums into k non-empty contiguous subarrays. Return the minimized largest sum among these subarrays.",
      "trigger": "If a maximum allowed subarray sum limit is feasible with at most k parts, then any larger limit is also feasible. This creates a monotonic answer space.",
      "intuition": "Binary search the largest allowed subarray sum from max(nums) to sum(nums). Greedily count how many parts are needed for each limit.",
      "edgeCases": "k = 1, k = nums.length, one element, all values equal, very large sum, answer equals max element, answer equals total sum.",
      "constraints": "1 <= nums.length <= 1000; 0 <= nums[i] <= 1000000; 1 <= k <= min(50, nums.length).",
      "source": {
        "label": "Split Array Largest Sum - LeetCode 410",
        "url": "https://leetcode.com/problems/split-array-largest-sum/"
      },
      "examples": [
        {
          "input": "nums = [7,2,5,10,8], k = 2",
          "output": "18",
          "explanation": "Split as [7,2,5] and [10,8]; largest sum is 18."
        },
        {
          "input": "nums = [1,2,3,4,5], k = 2",
          "output": "9",
          "explanation": "Split as [1,2,3] and [4,5]."
        },
        {
          "input": "nums = [1,4,4], k = 3",
          "output": "4",
          "explanation": "Each element can be its own subarray."
        }
      ],
      "bruteForceComplexity": "Time O(k * n^2); Space O(k * n). Dynamic programming tries split points for each prefix and partition count.",
      "optimizedComplexity": "Time O(n log sumNums); Space O(1). Binary search checks each candidate limit with one greedy scan.",
      "recursiveComplexity": "Time O(n log sumNums); Space O(log sumNums). Recursive answer search adds logarithmic stack space.",
      "bruteForceCode": "class Solution {\n  public int splitArray(int[] nums, int k) {\n    int n = nums.length;\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n\n    long[][] dp = new long[k + 1][n + 1];\n    for (int i = 1; i <= n; i++) dp[1][i] = prefix[i];\n\n    for (int parts = 2; parts <= k; parts++) {\n      for (int i = parts; i <= n; i++) {\n        dp[parts][i] = Long.MAX_VALUE;\n        for (int cut = parts - 1; cut < i; cut++) {\n          long largest = Math.max(dp[parts - 1][cut], prefix[i] - prefix[cut]);\n          dp[parts][i] = Math.min(dp[parts][i], largest);\n        }\n      }\n    }\n\n    return (int) dp[k][n];\n  }\n}",
      "iterativeCode": "class Solution {\n  public int splitArray(int[] nums, int k) {\n    int left = 0;\n    int right = 0;\n\n    for (int num : nums) {\n      left = Math.max(left, num);\n      right += num;\n    }\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canSplit(nums, k, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canSplit(int[] nums, int k, int limit) {\n    int parts = 1;\n    int currentSum = 0;\n\n    for (int num : nums) {\n      if (currentSum + num > limit) {\n        parts++;\n        currentSum = 0;\n      }\n      currentSum += num;\n      if (parts > k) return false;\n    }\n\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int splitArray(int[] nums, int k) {\n    int left = 0;\n    int right = 0;\n\n    for (int num : nums) {\n      left = Math.max(left, num);\n      right += num;\n    }\n\n    return search(nums, k, left, right);\n  }\n\n  private int search(int[] nums, int k, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (canSplit(nums, k, mid)) return search(nums, k, left, mid);\n    return search(nums, k, mid + 1, right);\n  }\n\n  private boolean canSplit(int[] nums, int k, int limit) {\n    int parts = 1;\n    int currentSum = 0;\n\n    for (int num : nums) {\n      if (currentSum + num > limit) {\n        parts++;\n        currentSum = 0;\n      }\n      currentSum += num;\n      if (parts > k) return false;\n    }\n\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int splitArray(int[] nums, int k) {\n    int left = 0;\n    int right = 0;\n\n    for (int num : nums) {\n      left = Math.max(left, num);\n      right += num;\n    }\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canSplit(nums, k, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canSplit(int[] nums, int k, int limit) {\n    int parts = 1;\n    int currentSum = 0;\n\n    for (int num : nums) {\n      if (currentSum + num > limit) {\n        parts++;\n        currentSum = 0;\n      }\n      currentSum += num;\n      if (parts > k) return false;\n    }\n\n    return true;\n  }\n}",
      "code": "class Solution {\n  public int splitArray(int[] nums, int k) {\n    int left = 0;\n    int right = 0;\n\n    for (int num : nums) {\n      left = Math.max(left, num);\n      right += num;\n    }\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canSplit(nums, k, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canSplit(int[] nums, int k, int limit) {\n    int parts = 1;\n    int currentSum = 0;\n\n    for (int num : nums) {\n      if (currentSum + num > limit) {\n        parts++;\n        currentSum = 0;\n      }\n      currentSum += num;\n      if (parts > k) return false;\n    }\n\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimized Maximum of Products Distributed to Any Store",
      "difficulty": "Medium",
      "subpattern": "Minimum feasible maximum search",
      "question": "You have n stores and product quantities where quantities[i] is the count of one product type. A store can receive at most one product type, but any amount of that type. Return the minimum possible maximum number of products assigned to any store.",
      "trigger": "If a maximum load x is feasible, any larger load is also feasible. This monotonic feasibility lets us binary search the answer.",
      "intuition": "For a guessed maximum x, each product type needs ceil(quantity / x) stores. If total required stores is at most n, x is feasible.",
      "edgeCases": "One product type, n equals quantities.length, very large quantity, all quantities equal, answer equals 1, answer equals max quantity.",
      "constraints": "1 <= quantities.length <= n <= 100000; 1 <= quantities[i] <= 100000.",
      "source": {
        "label": "Minimized Maximum of Products Distributed to Any Store - LeetCode 2064",
        "url": "https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/"
      },
      "examples": [
        {
          "input": "n = 6, quantities = [11,6]",
          "output": "3",
          "explanation": "11 needs 4 stores and 6 needs 2 stores when maximum load is 3."
        },
        {
          "input": "n = 7, quantities = [15,10,10]",
          "output": "5",
          "explanation": "Each type can be split so no store gets more than 5 products."
        },
        {
          "input": "n = 1, quantities = [100000]",
          "output": "100000",
          "explanation": "The only store must receive all products."
        }
      ],
      "bruteForceComplexity": "Time O(m * maxQuantity); Space O(1), where m is quantities.length. Try every possible maximum load.",
      "optimizedComplexity": "Time O(m log maxQuantity); Space O(1). Each feasibility check scans all product quantities once.",
      "recursiveComplexity": "Time O(m log maxQuantity); Space O(log maxQuantity). Recursive answer search adds stack frames.",
      "bruteForceCode": "class Solution {\n  public int minimizedMaximum(int n, int[] quantities) {\n    int max = 0;\n    for (int quantity : quantities) max = Math.max(max, quantity);\n\n    for (int limit = 1; limit <= max; limit++) {\n      if (canDistribute(n, quantities, limit)) return limit;\n    }\n\n    return max;\n  }\n\n  private boolean canDistribute(int n, int[] quantities, int limit) {\n    long stores = 0;\n    for (int quantity : quantities) {\n      stores += (quantity + limit - 1L) / limit;\n    }\n    return stores <= n;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minimizedMaximum(int n, int[] quantities) {\n    int left = 1;\n    int right = 0;\n    for (int quantity : quantities) right = Math.max(right, quantity);\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canDistribute(n, quantities, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canDistribute(int n, int[] quantities, int limit) {\n    long stores = 0;\n    for (int quantity : quantities) {\n      stores += (quantity + limit - 1L) / limit;\n      if (stores > n) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minimizedMaximum(int n, int[] quantities) {\n    int max = 0;\n    for (int quantity : quantities) max = Math.max(max, quantity);\n    return search(n, quantities, 1, max);\n  }\n\n  private int search(int n, int[] quantities, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (canDistribute(n, quantities, mid)) return search(n, quantities, left, mid);\n    return search(n, quantities, mid + 1, right);\n  }\n\n  private boolean canDistribute(int n, int[] quantities, int limit) {\n    long stores = 0;\n    for (int quantity : quantities) {\n      stores += (quantity + limit - 1L) / limit;\n      if (stores > n) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minimizedMaximum(int n, int[] quantities) {\n    int left = 1;\n    int right = 0;\n    for (int quantity : quantities) right = Math.max(right, quantity);\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canDistribute(n, quantities, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canDistribute(int n, int[] quantities, int limit) {\n    long stores = 0;\n    for (int quantity : quantities) {\n      stores += (quantity + limit - 1L) / limit;\n      if (stores > n) return false;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public int minimizedMaximum(int n, int[] quantities) {\n    int left = 1;\n    int right = 0;\n    for (int quantity : quantities) right = Math.max(right, quantity);\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (canDistribute(n, quantities, mid)) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private boolean canDistribute(int n, int[] quantities, int limit) {\n    long stores = 0;\n    for (int quantity : quantities) {\n      stores += (quantity + limit - 1L) / limit;\n      if (stores > n) return false;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Magnetic Force Between Two Balls",
      "difficulty": "Medium",
      "subpattern": "Maximize minimum distance search",
      "question": "Given basket positions and an integer m, place m balls into baskets so that the minimum magnetic force between any two balls is maximized. Magnetic force is the absolute difference between positions. Return that maximum possible minimum distance.",
      "trigger": "If distance d is feasible, every smaller distance is also feasible. This monotonic yes/no check supports binary search for the largest feasible distance.",
      "intuition": "Sort positions. For a candidate distance, greedily place each next ball at the earliest position at least distance away from the last placed ball.",
      "edgeCases": "m = 2, m equals position.length, duplicate-free but unsorted positions, large coordinate gaps, answer equals 1.",
      "constraints": "2 <= position.length <= 100000; 1 <= position[i] <= 1000000000; all positions are distinct; 2 <= m <= position.length.",
      "source": {
        "label": "Magnetic Force Between Two Balls - LeetCode 1552",
        "url": "https://leetcode.com/problems/magnetic-force-between-two-balls/"
      },
      "examples": [
        {
          "input": "position = [1,2,3,4,7], m = 3",
          "output": "3",
          "explanation": "Place balls at 1, 4, and 7 for minimum distance 3."
        },
        {
          "input": "position = [5,4,3,2,1,1000000000], m = 2",
          "output": "999999999",
          "explanation": "Place balls at positions 1 and 1000000000."
        },
        {
          "input": "position = [1,10,20,30], m = 4",
          "output": "9",
          "explanation": "All baskets are used, so the smallest adjacent gap is 9."
        }
      ],
      "bruteForceComplexity": "Time O(n log n + n * range); Space O(1) excluding sort. Try every distance after sorting.",
      "optimizedComplexity": "Time O(n log n + n log range); Space O(1) excluding sort. Binary search each feasible distance with a greedy scan.",
      "recursiveComplexity": "Time O(n log n + n log range); Space O(log range) for recursive answer search excluding sort.",
      "bruteForceCode": "import java.util.Arrays;\n\nclass Solution {\n  public int maxDistance(int[] position, int m) {\n    Arrays.sort(position);\n    int answer = 1;\n    int maxDistance = position[position.length - 1] - position[0];\n\n    for (int distance = 1; distance <= maxDistance; distance++) {\n      if (canPlace(position, m, distance)) answer = distance;\n    }\n\n    return answer;\n  }\n\n  private boolean canPlace(int[] position, int m, int distance) {\n    int count = 1;\n    int last = position[0];\n\n    for (int i = 1; i < position.length; i++) {\n      if (position[i] - last >= distance) {\n        count++;\n        last = position[i];\n      }\n    }\n\n    return count >= m;\n  }\n}",
      "iterativeCode": "import java.util.Arrays;\n\nclass Solution {\n  public int maxDistance(int[] position, int m) {\n    Arrays.sort(position);\n    int left = 1;\n    int right = position[position.length - 1] - position[0];\n    int answer = 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canPlace(position, m, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canPlace(int[] position, int m, int distance) {\n    int count = 1;\n    int last = position[0];\n\n    for (int i = 1; i < position.length; i++) {\n      if (position[i] - last >= distance) {\n        count++;\n        last = position[i];\n        if (count == m) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.Arrays;\n\nclass Solution {\n  public int maxDistance(int[] position, int m) {\n    Arrays.sort(position);\n    int right = position[position.length - 1] - position[0];\n    return search(position, m, 1, right, 1);\n  }\n\n  private int search(int[] position, int m, int left, int right, int answer) {\n    if (left > right) return answer;\n\n    int mid = left + (right - left) / 2;\n    if (canPlace(position, m, mid)) return search(position, m, mid + 1, right, mid);\n    return search(position, m, left, mid - 1, answer);\n  }\n\n  private boolean canPlace(int[] position, int m, int distance) {\n    int count = 1;\n    int last = position[0];\n\n    for (int i = 1; i < position.length; i++) {\n      if (position[i] - last >= distance) {\n        count++;\n        last = position[i];\n        if (count == m) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.Arrays;\n\nclass Solution {\n  public int maxDistance(int[] position, int m) {\n    Arrays.sort(position);\n    int left = 1;\n    int right = position[position.length - 1] - position[0];\n    int answer = 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canPlace(position, m, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canPlace(int[] position, int m, int distance) {\n    int count = 1;\n    int last = position[0];\n\n    for (int i = 1; i < position.length; i++) {\n      if (position[i] - last >= distance) {\n        count++;\n        last = position[i];\n        if (count == m) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "code": "import java.util.Arrays;\n\nclass Solution {\n  public int maxDistance(int[] position, int m) {\n    Arrays.sort(position);\n    int left = 1;\n    int right = position[position.length - 1] - position[0];\n    int answer = 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canPlace(position, m, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canPlace(int[] position, int m, int distance) {\n    int count = 1;\n    int last = position[0];\n\n    for (int i = 1; i < position.length; i++) {\n      if (position[i] - last >= distance) {\n        count++;\n        last = position[i];\n        if (count == m) return true;\n      }\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Aggressive Cows",
      "difficulty": "Medium",
      "subpattern": "Classic maximize minimum distance search",
      "question": "Given stall positions and k cows, place the cows in stalls so that the minimum distance between any two cows is as large as possible. Return that largest minimum distance.",
      "trigger": "A candidate distance is monotonic: if distance d can be achieved, then every distance smaller than d can also be achieved.",
      "intuition": "Sort stalls and greedily place each cow in the earliest stall far enough from the previous cow. Binary search the largest feasible distance.",
      "edgeCases": "k = 2, k equals number of stalls, unsorted stalls, repeated close gaps, large coordinate range.",
      "constraints": "2 <= stalls.length <= 100000; 2 <= k <= stalls.length; 0 <= stalls[i] <= 1000000000.",
      "source": {
        "label": "Aggressive Cows - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/problems/aggressive-cows/1"
      },
      "examples": [
        {
          "input": "stalls = [1,2,4,8,9], k = 3",
          "output": "3",
          "explanation": "Place cows at 1, 4, and 8 or 9 for minimum distance 3."
        },
        {
          "input": "stalls = [10,1,2,7,5], k = 3",
          "output": "4",
          "explanation": "After sorting, place cows at 1, 5, and 10."
        },
        {
          "input": "stalls = [1,2,3], k = 2",
          "output": "2",
          "explanation": "Place cows at 1 and 3."
        }
      ],
      "bruteForceComplexity": "Time O(n log n + n * range); Space O(1) excluding sort. Test each possible minimum distance.",
      "optimizedComplexity": "Time O(n log n + n log range); Space O(1) excluding sort. Binary search uses greedy feasibility.",
      "recursiveComplexity": "Time O(n log n + n log range); Space O(log range) for recursion excluding sort.",
      "bruteForceCode": "import java.util.Arrays;\n\nclass Solution {\n  public static int aggressiveCows(int[] stalls, int k) {\n    Arrays.sort(stalls);\n    int answer = 0;\n    int maxDistance = stalls[stalls.length - 1] - stalls[0];\n\n    for (int distance = 1; distance <= maxDistance; distance++) {\n      if (canPlace(stalls, k, distance)) answer = distance;\n    }\n\n    return answer;\n  }\n\n  private static boolean canPlace(int[] stalls, int k, int distance) {\n    int cows = 1;\n    int last = stalls[0];\n\n    for (int i = 1; i < stalls.length; i++) {\n      if (stalls[i] - last >= distance) {\n        cows++;\n        last = stalls[i];\n      }\n    }\n\n    return cows >= k;\n  }\n}",
      "iterativeCode": "import java.util.Arrays;\n\nclass Solution {\n  public static int aggressiveCows(int[] stalls, int k) {\n    Arrays.sort(stalls);\n    int left = 1;\n    int right = stalls[stalls.length - 1] - stalls[0];\n    int answer = 0;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canPlace(stalls, k, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private static boolean canPlace(int[] stalls, int k, int distance) {\n    int cows = 1;\n    int last = stalls[0];\n\n    for (int i = 1; i < stalls.length; i++) {\n      if (stalls[i] - last >= distance) {\n        cows++;\n        last = stalls[i];\n        if (cows == k) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.Arrays;\n\nclass Solution {\n  public static int aggressiveCows(int[] stalls, int k) {\n    Arrays.sort(stalls);\n    int right = stalls[stalls.length - 1] - stalls[0];\n    return search(stalls, k, 1, right, 0);\n  }\n\n  private static int search(int[] stalls, int k, int left, int right, int answer) {\n    if (left > right) return answer;\n\n    int mid = left + (right - left) / 2;\n    if (canPlace(stalls, k, mid)) return search(stalls, k, mid + 1, right, mid);\n    return search(stalls, k, left, mid - 1, answer);\n  }\n\n  private static boolean canPlace(int[] stalls, int k, int distance) {\n    int cows = 1;\n    int last = stalls[0];\n\n    for (int i = 1; i < stalls.length; i++) {\n      if (stalls[i] - last >= distance) {\n        cows++;\n        last = stalls[i];\n        if (cows == k) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.Arrays;\n\nclass Solution {\n  public static int aggressiveCows(int[] stalls, int k) {\n    Arrays.sort(stalls);\n    int left = 1;\n    int right = stalls[stalls.length - 1] - stalls[0];\n    int answer = 0;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canPlace(stalls, k, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private static boolean canPlace(int[] stalls, int k, int distance) {\n    int cows = 1;\n    int last = stalls[0];\n\n    for (int i = 1; i < stalls.length; i++) {\n      if (stalls[i] - last >= distance) {\n        cows++;\n        last = stalls[i];\n        if (cows == k) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "code": "import java.util.Arrays;\n\nclass Solution {\n  public static int aggressiveCows(int[] stalls, int k) {\n    Arrays.sort(stalls);\n    int left = 1;\n    int right = stalls[stalls.length - 1] - stalls[0];\n    int answer = 0;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canPlace(stalls, k, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private static boolean canPlace(int[] stalls, int k, int distance) {\n    int cows = 1;\n    int last = stalls[0];\n\n    for (int i = 1; i < stalls.length; i++) {\n      if (stalls[i] - last >= distance) {\n        cows++;\n        last = stalls[i];\n        if (cows == k) return true;\n      }\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Median of Two Sorted Arrays",
      "difficulty": "Hard",
      "subpattern": "Binary search partition across two sorted arrays",
      "question": "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays. The optimized solution must run in O(log(m + n)) time.",
      "trigger": "Both arrays are sorted, and the median is defined by a partition where every value on the left side is less than or equal to every value on the right side.",
      "intuition": "Binary search the partition size in the smaller array. The other partition is forced by the total left-side size.",
      "edgeCases": "One array empty, odd total length, even total length, all values in one array smaller than the other, duplicates, negative values.",
      "constraints": "0 <= nums1.length, nums2.length <= 1000; 1 <= nums1.length + nums2.length <= 2000; -1000000 <= nums1[i], nums2[i] <= 1000000.",
      "source": {
        "label": "Median of Two Sorted Arrays - LeetCode 4",
        "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
      },
      "examples": [
        {
          "input": "nums1 = [1,3], nums2 = [2]",
          "output": "2.00000",
          "explanation": "The merged sorted array is [1,2,3]."
        },
        {
          "input": "nums1 = [1,2], nums2 = [3,4]",
          "output": "2.50000",
          "explanation": "Median is (2 + 3) / 2."
        },
        {
          "input": "nums1 = [], nums2 = [1]",
          "output": "1.00000",
          "explanation": "The second array alone determines the median."
        }
      ],
      "bruteForceComplexity": "Time O(m + n); Space O(m + n). Merge both arrays and read the middle value.",
      "optimizedComplexity": "Time O(log min(m, n)); Space O(1). Binary search only partitions the smaller array.",
      "recursiveComplexity": "Time O(log(m + n)); Space O(log(m + n)). Recursive kth-element search discards about half of one remaining prefix each step.",
      "bruteForceCode": "class Solution {\n  public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    int[] merged = new int[nums1.length + nums2.length];\n    int i = 0;\n    int j = 0;\n    int index = 0;\n\n    while (i < nums1.length || j < nums2.length) {\n      if (j == nums2.length || (i < nums1.length && nums1[i] <= nums2[j])) {\n        merged[index++] = nums1[i++];\n      } else {\n        merged[index++] = nums2[j++];\n      }\n    }\n\n    int n = merged.length;\n    if (n % 2 == 1) return merged[n / 2];\n    return (merged[n / 2 - 1] + merged[n / 2]) / 2.0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n\n    int m = nums1.length;\n    int n = nums2.length;\n    int leftSize = (m + n + 1) / 2;\n    int left = 0;\n    int right = m;\n\n    while (left <= right) {\n      int cut1 = left + (right - left) / 2;\n      int cut2 = leftSize - cut1;\n\n      int left1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];\n      int right1 = cut1 == m ? Integer.MAX_VALUE : nums1[cut1];\n      int left2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];\n      int right2 = cut2 == n ? Integer.MAX_VALUE : nums2[cut2];\n\n      if (left1 <= right2 && left2 <= right1) {\n        if ((m + n) % 2 == 1) return Math.max(left1, left2);\n        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;\n      }\n\n      if (left1 > right2) right = cut1 - 1;\n      else left = cut1 + 1;\n    }\n\n    return 0.0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    int total = nums1.length + nums2.length;\n\n    if (total % 2 == 1) {\n      return kth(nums1, 0, nums2, 0, total / 2 + 1);\n    }\n\n    int left = kth(nums1, 0, nums2, 0, total / 2);\n    int right = kth(nums1, 0, nums2, 0, total / 2 + 1);\n    return (left + right) / 2.0;\n  }\n\n  private int kth(int[] a, int aStart, int[] b, int bStart, int k) {\n    if (aStart == a.length) return b[bStart + k - 1];\n    if (bStart == b.length) return a[aStart + k - 1];\n    if (k == 1) return Math.min(a[aStart], b[bStart]);\n\n    int half = k / 2;\n    int aKey = aStart + half - 1 < a.length ? a[aStart + half - 1] : Integer.MAX_VALUE;\n    int bKey = bStart + half - 1 < b.length ? b[bStart + half - 1] : Integer.MAX_VALUE;\n\n    if (aKey <= bKey) return kth(a, aStart + half, b, bStart, k - half);\n    return kth(a, aStart, b, bStart + half, k - half);\n  }\n}",
      "optimizedCode": "class Solution {\n  public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n\n    int m = nums1.length;\n    int n = nums2.length;\n    int leftSize = (m + n + 1) / 2;\n    int left = 0;\n    int right = m;\n\n    while (left <= right) {\n      int cut1 = left + (right - left) / 2;\n      int cut2 = leftSize - cut1;\n\n      int left1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];\n      int right1 = cut1 == m ? Integer.MAX_VALUE : nums1[cut1];\n      int left2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];\n      int right2 = cut2 == n ? Integer.MAX_VALUE : nums2[cut2];\n\n      if (left1 <= right2 && left2 <= right1) {\n        if ((m + n) % 2 == 1) return Math.max(left1, left2);\n        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;\n      }\n\n      if (left1 > right2) right = cut1 - 1;\n      else left = cut1 + 1;\n    }\n\n    return 0.0;\n  }\n}",
      "code": "class Solution {\n  public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n\n    int m = nums1.length;\n    int n = nums2.length;\n    int leftSize = (m + n + 1) / 2;\n    int left = 0;\n    int right = m;\n\n    while (left <= right) {\n      int cut1 = left + (right - left) / 2;\n      int cut2 = leftSize - cut1;\n\n      int left1 = cut1 == 0 ? Integer.MIN_VALUE : nums1[cut1 - 1];\n      int right1 = cut1 == m ? Integer.MAX_VALUE : nums1[cut1];\n      int left2 = cut2 == 0 ? Integer.MIN_VALUE : nums2[cut2 - 1];\n      int right2 = cut2 == n ? Integer.MAX_VALUE : nums2[cut2];\n\n      if (left1 <= right2 && left2 <= right1) {\n        if ((m + n) % 2 == 1) return Math.max(left1, left2);\n        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;\n      }\n\n      if (left1 > right2) right = cut1 - 1;\n      else left = cut1 + 1;\n    }\n\n    return 0.0;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Kth Missing Positive Number",
      "difficulty": "Easy",
      "subpattern": "Missing-count boundary search",
      "question": "Given a strictly increasing positive integer array arr and an integer k, return the kth positive integer missing from arr.",
      "trigger": "At index i, arr[i] - i - 1 tells how many positive integers are missing before arr[i]. This count is monotonic.",
      "intuition": "Find the first index where the missing count is at least k. The answer is k plus the number of present elements before that boundary.",
      "edgeCases": "Missing number before arr[0], kth missing after the last array value, k = 1, arr starts at 1, large k.",
      "constraints": "1 <= arr.length <= 1000; 1 <= arr[i] <= 1000; arr is strictly increasing; 1 <= k <= 1000.",
      "source": {
        "label": "Kth Missing Positive Number - LeetCode 1539",
        "url": "https://leetcode.com/problems/kth-missing-positive-number/"
      },
      "examples": [
        {
          "input": "arr = [2,3,4,7,11], k = 5",
          "output": "9",
          "explanation": "The missing positives are 1, 5, 6, 8, 9."
        },
        {
          "input": "arr = [1,2,3,4], k = 2",
          "output": "6",
          "explanation": "The missing positives are 5 and 6."
        },
        {
          "input": "arr = [5,6,7], k = 1",
          "output": "1",
          "explanation": "1 is missing before the first array value."
        }
      ],
      "bruteForceComplexity": "Time O(arr.length + answer); Space O(1). Count missing positives one by one.",
      "optimizedComplexity": "Time O(log n); Space O(1). Binary search the first index with at least k missing numbers before it.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive boundary search adds call-stack space.",
      "bruteForceCode": "class Solution {\n  public int findKthPositive(int[] arr, int k) {\n    int index = 0;\n    int current = 1;\n\n    while (true) {\n      if (index < arr.length && arr[index] == current) {\n        index++;\n      } else {\n        k--;\n        if (k == 0) return current;\n      }\n      current++;\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findKthPositive(int[] arr, int k) {\n    int left = 0;\n    int right = arr.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      int missingBeforeMid = arr[mid] - mid - 1;\n\n      if (missingBeforeMid < k) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left + k;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findKthPositive(int[] arr, int k) {\n    int index = lowerBound(arr, k, 0, arr.length);\n    return index + k;\n  }\n\n  private int lowerBound(int[] arr, int k, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    int missingBeforeMid = arr[mid] - mid - 1;\n\n    if (missingBeforeMid < k) return lowerBound(arr, k, mid + 1, right);\n    return lowerBound(arr, k, left, mid);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findKthPositive(int[] arr, int k) {\n    int left = 0;\n    int right = arr.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      int missingBeforeMid = arr[mid] - mid - 1;\n\n      if (missingBeforeMid < k) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left + k;\n  }\n}",
      "code": "class Solution {\n  public int findKthPositive(int[] arr, int k) {\n    int left = 0;\n    int right = arr.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      int missingBeforeMid = arr[mid] - mid - 1;\n\n      if (missingBeforeMid < k) {\n        left = mid + 1;\n      } else {\n        right = mid;\n      }\n    }\n\n    return left + k;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Find Kth Smallest Pair Distance",
      "difficulty": "Hard",
      "subpattern": "Binary search on pair-distance answer",
      "question": "Given an integer array nums and an integer k, return the kth smallest absolute difference between any pair nums[i] and nums[j] where i < j.",
      "trigger": "For a candidate distance d, the count of pairs with distance <= d is monotonic. If at least k pairs fit, the kth distance is d or smaller.",
      "intuition": "Sort nums. Binary search the distance. For each distance, use a sliding left pointer to count how many pairs have difference at most that distance.",
      "edgeCases": "Duplicate numbers, k = 1, k equals total number of pairs, all values equal, large value range.",
      "constraints": "2 <= nums.length <= 10000; 0 <= nums[i] <= 1000000; 1 <= k <= nums.length * (nums.length - 1) / 2.",
      "source": {
        "label": "Find Kth Smallest Pair Distance - LeetCode 719",
        "url": "https://leetcode.com/problems/find-k-th-smallest-pair-distance/"
      },
      "examples": [
        {
          "input": "nums = [1,3,1], k = 1",
          "output": "0",
          "explanation": "The smallest pair distance is between the two 1 values."
        },
        {
          "input": "nums = [1,1,1], k = 2",
          "output": "0",
          "explanation": "Every pair distance is 0."
        },
        {
          "input": "nums = [1,6,1], k = 3",
          "output": "5",
          "explanation": "Sorted pair distances are 0, 5, and 5."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 log n); Space O(n^2). Generate all pair distances, sort them, and read the kth distance.",
      "optimizedComplexity": "Time O(n log n + n log range); Space O(1) excluding sort. Each distance check counts valid pairs in linear time.",
      "recursiveComplexity": "Time O(n log n + n log range); Space O(log range) excluding sort. Recursion searches the answer space.",
      "bruteForceCode": "import java.util.Arrays;\n\nclass Solution {\n  public int smallestDistancePair(int[] nums, int k) {\n    int n = nums.length;\n    int[] distances = new int[n * (n - 1) / 2];\n    int index = 0;\n\n    for (int i = 0; i < n; i++) {\n      for (int j = i + 1; j < n; j++) {\n        distances[index++] = Math.abs(nums[i] - nums[j]);\n      }\n    }\n\n    Arrays.sort(distances);\n    return distances[k - 1];\n  }\n}",
      "iterativeCode": "import java.util.Arrays;\n\nclass Solution {\n  public int smallestDistancePair(int[] nums, int k) {\n    Arrays.sort(nums);\n    int left = 0;\n    int right = nums[nums.length - 1] - nums[0];\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (countPairs(nums, mid) >= k) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private int countPairs(int[] nums, int maxDistance) {\n    int count = 0;\n    int left = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      while (nums[right] - nums[left] > maxDistance) left++;\n      count += right - left;\n    }\n\n    return count;\n  }\n}",
      "recursiveCode": "import java.util.Arrays;\n\nclass Solution {\n  public int smallestDistancePair(int[] nums, int k) {\n    Arrays.sort(nums);\n    int right = nums[nums.length - 1] - nums[0];\n    return search(nums, k, 0, right);\n  }\n\n  private int search(int[] nums, int k, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (countPairs(nums, mid) >= k) return search(nums, k, left, mid);\n    return search(nums, k, mid + 1, right);\n  }\n\n  private int countPairs(int[] nums, int maxDistance) {\n    int count = 0;\n    int left = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      while (nums[right] - nums[left] > maxDistance) left++;\n      count += right - left;\n    }\n\n    return count;\n  }\n}",
      "optimizedCode": "import java.util.Arrays;\n\nclass Solution {\n  public int smallestDistancePair(int[] nums, int k) {\n    Arrays.sort(nums);\n    int left = 0;\n    int right = nums[nums.length - 1] - nums[0];\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (countPairs(nums, mid) >= k) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private int countPairs(int[] nums, int maxDistance) {\n    int count = 0;\n    int left = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      while (nums[right] - nums[left] > maxDistance) left++;\n      count += right - left;\n    }\n\n    return count;\n  }\n}",
      "code": "import java.util.Arrays;\n\nclass Solution {\n  public int smallestDistancePair(int[] nums, int k) {\n    Arrays.sort(nums);\n    int left = 0;\n    int right = nums[nums.length - 1] - nums[0];\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n\n      if (countPairs(nums, mid) >= k) {\n        right = mid;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return left;\n  }\n\n  private int countPairs(int[] nums, int maxDistance) {\n    int count = 0;\n    int left = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      while (nums[right] - nums[left] > maxDistance) left++;\n      count += right - left;\n    }\n\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Time Based Key-Value Store",
      "difficulty": "Medium",
      "subpattern": "Binary search over timestamp history",
      "question": "Design a time-based key-value store that supports set(key, value, timestamp) and get(key, timestamp). get must return the value with the largest timestamp less than or equal to the given timestamp, or an empty string if no such value exists.",
      "trigger": "For each key, timestamps are stored in increasing order. get asks for the rightmost timestamp <= query timestamp, which is an upper-bound binary search.",
      "intuition": "Store a sorted history list per key. Binary search the last record whose timestamp does not exceed the query timestamp.",
      "edgeCases": "Key never set, query timestamp before first set, query exactly matches a timestamp, query after latest timestamp, multiple keys.",
      "constraints": "1 <= key.length, value.length <= 100; key and value contain lowercase letters and digits; timestamps are strictly increasing per key; up to 200000 calls.",
      "source": {
        "label": "Time Based Key-Value Store - LeetCode 981",
        "url": "https://leetcode.com/problems/time-based-key-value-store/"
      },
      "examples": [
        {
          "input": "set(\"foo\",\"bar\",1), get(\"foo\",1), get(\"foo\",3)",
          "output": "[null,\"bar\",\"bar\"]",
          "explanation": "Timestamp 1 is the latest value available for queries 1 and 3."
        },
        {
          "input": "set(\"foo\",\"bar2\",4), get(\"foo\",4), get(\"foo\",5)",
          "output": "[null,\"bar2\",\"bar2\"]",
          "explanation": "The value at timestamp 4 is returned for queries 4 and 5."
        },
        {
          "input": "get(\"missing\",10)",
          "output": "\"\"",
          "explanation": "No history exists for the key."
        }
      ],
      "bruteForceComplexity": "set Time O(1), get Time O(h); Space O(total sets), where h is the history length for the key.",
      "optimizedComplexity": "set Time O(1), get Time O(log h); Space O(total sets). Binary search finds the rightmost valid timestamp.",
      "recursiveComplexity": "set Time O(1), get Time O(log h); Space O(log h) for recursive binary search plus stored history.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\nclass TimeMap {\n  private final Map<String, List<Entry>> store = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    store.computeIfAbsent(key, unused -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> history = store.get(key);\n    if (history == null) return \"\";\n\n    String answer = \"\";\n    for (Entry entry : history) {\n      if (entry.timestamp <= timestamp) answer = entry.value;\n      else break;\n    }\n\n    return answer;\n  }\n\n  private static class Entry {\n    String value;\n    int timestamp;\n\n    Entry(String value, int timestamp) {\n      this.value = value;\n      this.timestamp = timestamp;\n    }\n  }\n}",
      "iterativeCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\nclass TimeMap {\n  private final Map<String, List<Entry>> store = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    store.computeIfAbsent(key, unused -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> history = store.get(key);\n    if (history == null) return \"\";\n\n    int left = 0;\n    int right = history.size() - 1;\n    String answer = \"\";\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      Entry entry = history.get(mid);\n\n      if (entry.timestamp <= timestamp) {\n        answer = entry.value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private static class Entry {\n    String value;\n    int timestamp;\n\n    Entry(String value, int timestamp) {\n      this.value = value;\n      this.timestamp = timestamp;\n    }\n  }\n}",
      "recursiveCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\nclass TimeMap {\n  private final Map<String, List<Entry>> store = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    store.computeIfAbsent(key, unused -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> history = store.get(key);\n    if (history == null) return \"\";\n\n    int index = upperBound(history, timestamp, 0, history.size()) - 1;\n    return index < 0 ? \"\" : history.get(index).value;\n  }\n\n  private int upperBound(List<Entry> history, int timestamp, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (history.get(mid).timestamp <= timestamp) return upperBound(history, timestamp, mid + 1, right);\n    return upperBound(history, timestamp, left, mid);\n  }\n\n  private static class Entry {\n    String value;\n    int timestamp;\n\n    Entry(String value, int timestamp) {\n      this.value = value;\n      this.timestamp = timestamp;\n    }\n  }\n}",
      "optimizedCode": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\nclass TimeMap {\n  private final Map<String, List<Entry>> store = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    store.computeIfAbsent(key, unused -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> history = store.get(key);\n    if (history == null) return \"\";\n\n    int left = 0;\n    int right = history.size() - 1;\n    String answer = \"\";\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      Entry entry = history.get(mid);\n\n      if (entry.timestamp <= timestamp) {\n        answer = entry.value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private static class Entry {\n    String value;\n    int timestamp;\n\n    Entry(String value, int timestamp) {\n      this.value = value;\n      this.timestamp = timestamp;\n    }\n  }\n}",
      "code": "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\nclass TimeMap {\n  private final Map<String, List<Entry>> store = new HashMap<>();\n\n  public void set(String key, String value, int timestamp) {\n    store.computeIfAbsent(key, unused -> new ArrayList<>()).add(new Entry(value, timestamp));\n  }\n\n  public String get(String key, int timestamp) {\n    List<Entry> history = store.get(key);\n    if (history == null) return \"\";\n\n    int left = 0;\n    int right = history.size() - 1;\n    String answer = \"\";\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      Entry entry = history.get(mid);\n\n      if (entry.timestamp <= timestamp) {\n        answer = entry.value;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private static class Entry {\n    String value;\n    int timestamp;\n\n    Entry(String value, int timestamp) {\n      this.value = value;\n      this.timestamp = timestamp;\n    }\n  }\n}"
    },
    {
      "group": "more",
      "name": "Search a 2D Matrix",
      "difficulty": "Medium",
      "subpattern": "Flattened matrix binary search",
      "question": "Given an m x n matrix where each row is sorted and the first integer of each row is greater than the last integer of the previous row, return true if target exists in the matrix.",
      "trigger": "The matrix ordering is equivalent to one sorted 1D array, so index arithmetic lets binary search work without physically flattening it.",
      "intuition": "Binary search from 0 to m * n - 1. Convert a virtual index to row = index / n and col = index % n.",
      "edgeCases": "One row, one column, target at first cell, target at last cell, target absent between rows, empty dimensions if reused outside constraints.",
      "constraints": "1 <= m, n <= 100; -10000 <= matrix[i][j], target <= 10000; rows are sorted and each row starts after the previous row ends.",
      "source": {
        "label": "Search a 2D Matrix - LeetCode 74",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/"
      },
      "examples": [
        {
          "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
          "output": "true",
          "explanation": "3 appears in the first row."
        },
        {
          "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
          "output": "false",
          "explanation": "13 does not appear in the matrix."
        },
        {
          "input": "matrix = [[1]], target = 1",
          "output": "true",
          "explanation": "The only cell matches target."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(1). Check every matrix cell.",
      "optimizedComplexity": "Time O(log(mn)); Space O(1). Binary search treats the matrix as a virtual sorted array.",
      "recursiveComplexity": "Time O(log(mn)); Space O(log(mn)). Recursive binary search halves the virtual range.",
      "bruteForceCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int[] row : matrix) {\n      for (int value : row) {\n        if (value == target) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int left = 0;\n    int right = rows * cols - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / cols][mid % cols];\n\n      if (value == target) return true;\n      if (value < target) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int cols = matrix[0].length;\n    return search(matrix, target, 0, matrix.length * cols - 1, cols);\n  }\n\n  private boolean search(int[][] matrix, int target, int left, int right, int cols) {\n    if (left > right) return false;\n\n    int mid = left + (right - left) / 2;\n    int value = matrix[mid / cols][mid % cols];\n\n    if (value == target) return true;\n    if (value < target) return search(matrix, target, mid + 1, right, cols);\n    return search(matrix, target, left, mid - 1, cols);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int left = 0;\n    int right = rows * cols - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / cols][mid % cols];\n\n      if (value == target) return true;\n      if (value < target) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int left = 0;\n    int right = rows * cols - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / cols][mid % cols];\n\n      if (value == target) return true;\n      if (value < target) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Search a 2D Matrix II",
      "difficulty": "Medium",
      "subpattern": "Row-wise binary search in sorted matrix",
      "question": "Given an m x n matrix where each row is sorted left to right and each column is sorted top to bottom, return true if target exists in the matrix.",
      "trigger": "Each row is sorted, so a row whose range can contain target can be searched with binary search.",
      "intuition": "Skip rows where target is outside the row range. For every possible row, run binary search inside that row.",
      "edgeCases": "One row, one column, target smaller than all values, target larger than all values, target in first or last column, duplicate values.",
      "constraints": "1 <= m, n <= 300; -1000000000 <= matrix[i][j], target <= 1000000000; rows and columns are sorted ascending.",
      "source": {
        "label": "Search a 2D Matrix II - LeetCode 240",
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/"
      },
      "examples": [
        {
          "input": "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 5",
          "output": "true",
          "explanation": "5 exists in the second row."
        },
        {
          "input": "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 10",
          "output": "false",
          "explanation": "10 is not present."
        },
        {
          "input": "matrix = [[-5]], target = -5",
          "output": "true",
          "explanation": "The only cell matches target."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(1). Check every cell.",
      "optimizedComplexity": "Time O(m log n); Space O(1). Each candidate row is searched with binary search.",
      "recursiveComplexity": "Time O(m log n); Space O(log n + m). Row recursion plus row-level binary-search recursion.",
      "bruteForceCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int[] row : matrix) {\n      for (int value : row) {\n        if (value == target) return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int[] row : matrix) {\n      if (target < row[0] || target > row[row.length - 1]) continue;\n      if (binarySearch(row, target)) return true;\n    }\n\n    return false;\n  }\n\n  private boolean binarySearch(int[] row, int target) {\n    int left = 0;\n    int right = row.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (row[mid] == target) return true;\n      if (row[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    return searchRows(matrix, target, 0);\n  }\n\n  private boolean searchRows(int[][] matrix, int target, int row) {\n    if (row == matrix.length) return false;\n\n    int[] current = matrix[row];\n    if (target >= current[0] && target <= current[current.length - 1]) {\n      if (binarySearch(current, target, 0, current.length - 1)) return true;\n    }\n\n    return searchRows(matrix, target, row + 1);\n  }\n\n  private boolean binarySearch(int[] row, int target, int left, int right) {\n    if (left > right) return false;\n\n    int mid = left + (right - left) / 2;\n    if (row[mid] == target) return true;\n    if (row[mid] < target) return binarySearch(row, target, mid + 1, right);\n    return binarySearch(row, target, left, mid - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int[] row : matrix) {\n      if (target < row[0] || target > row[row.length - 1]) continue;\n      if (binarySearch(row, target)) return true;\n    }\n\n    return false;\n  }\n\n  private boolean binarySearch(int[] row, int target) {\n    int left = 0;\n    int right = row.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (row[mid] == target) return true;\n      if (row[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int[] row : matrix) {\n      if (target < row[0] || target > row[row.length - 1]) continue;\n      if (binarySearch(row, target)) return true;\n    }\n\n    return false;\n  }\n\n  private boolean binarySearch(int[] row, int target) {\n    int left = 0;\n    int right = row.length - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (row[mid] == target) return true;\n      if (row[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Find Right Interval",
      "difficulty": "Medium",
      "subpattern": "Lower bound over interval starts",
      "question": "Given intervals where each interval has a unique start point, return for each interval the index of the interval with the smallest start point greater than or equal to the current interval end. If no such interval exists, return -1.",
      "trigger": "For each interval end, the needed right interval is the first sorted start value greater than or equal to that end.",
      "intuition": "Store each start with its original index, sort by start, and run lower-bound binary search for every interval end.",
      "edgeCases": "One interval, no right interval, right interval is itself for zero-length intervals, negative endpoints, unsorted input.",
      "constraints": "1 <= intervals.length <= 20000; intervals[i].length == 2; -1000000 <= start <= end <= 1000000; all starts are unique.",
      "source": {
        "label": "Find Right Interval - LeetCode 436",
        "url": "https://leetcode.com/problems/find-right-interval/"
      },
      "examples": [
        {
          "input": "intervals = [[1,2]]",
          "output": "[-1]",
          "explanation": "There is no interval starting at or after 2."
        },
        {
          "input": "intervals = [[3,4],[2,3],[1,2]]",
          "output": "[-1,0,1]",
          "explanation": "The right intervals for [2,3] and [1,2] start at 3 and 2."
        },
        {
          "input": "intervals = [[1,4],[2,3],[3,4]]",
          "output": "[-1,2,-1]",
          "explanation": "Only [2,3] has a right interval starting at 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1) excluding output. For each interval, scan every start to find the smallest valid one.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sort interval starts, then lower-bound each interval end.",
      "recursiveComplexity": "Time O(n log n); Space O(n + log n). Recursive lower bound adds logarithmic stack space.",
      "bruteForceCode": "class Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[] answer = new int[n];\n\n    for (int i = 0; i < n; i++) {\n      int bestStart = Integer.MAX_VALUE;\n      int bestIndex = -1;\n\n      for (int j = 0; j < n; j++) {\n        if (intervals[j][0] >= intervals[i][1] && intervals[j][0] < bestStart) {\n          bestStart = intervals[j][0];\n          bestIndex = j;\n        }\n      }\n\n      answer[i] = bestIndex;\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n\n    for (int i = 0; i < n; i++) {\n      starts[i][0] = intervals[i][0];\n      starts[i][1] = i;\n    }\n\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n    int[] answer = new int[n];\n\n    for (int i = 0; i < n; i++) {\n      int index = lowerBound(starts, intervals[i][1]);\n      answer[i] = index == n ? -1 : starts[index][1];\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target) {\n    int left = 0;\n    int right = starts.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (starts[mid][0] < target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}",
      "recursiveCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n\n    for (int i = 0; i < n; i++) {\n      starts[i][0] = intervals[i][0];\n      starts[i][1] = i;\n    }\n\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n    int[] answer = new int[n];\n\n    for (int i = 0; i < n; i++) {\n      int index = lowerBound(starts, intervals[i][1], 0, n);\n      answer[i] = index == n ? -1 : starts[index][1];\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if (starts[mid][0] < target) return lowerBound(starts, target, mid + 1, right);\n    return lowerBound(starts, target, left, mid);\n  }\n}",
      "optimizedCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n\n    for (int i = 0; i < n; i++) {\n      starts[i][0] = intervals[i][0];\n      starts[i][1] = i;\n    }\n\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n    int[] answer = new int[n];\n\n    for (int i = 0; i < n; i++) {\n      int index = lowerBound(starts, intervals[i][1]);\n      answer[i] = index == n ? -1 : starts[index][1];\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target) {\n    int left = 0;\n    int right = starts.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (starts[mid][0] < target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}",
      "code": "import java.util.Arrays;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n\n    for (int i = 0; i < n; i++) {\n      starts[i][0] = intervals[i][0];\n      starts[i][1] = i;\n    }\n\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n    int[] answer = new int[n];\n\n    for (int i = 0; i < n; i++) {\n      int index = lowerBound(starts, intervals[i][1]);\n      answer[i] = index == n ? -1 : starts[index][1];\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target) {\n    int left = 0;\n    int right = starts.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (starts[mid][0] < target) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Successful Pairs of Spells and Potions",
      "difficulty": "Medium",
      "subpattern": "Lower bound after sorting helper array",
      "question": "Given arrays spells and potions and a long integer success, return for each spell the number of potions such that spell * potion is at least success.",
      "trigger": "After sorting potions, each spell needs the first potion whose value reaches a threshold. That is a lower-bound binary search.",
      "intuition": "For each spell, compute the minimum potion needed using ceiling division, then binary search the first potion greater than or equal to it.",
      "edgeCases": "Very large multiplication, threshold greater than all potions, threshold less than or equal to smallest potion, duplicate potions, one spell or one potion.",
      "constraints": "1 <= spells.length, potions.length <= 100000; 1 <= spells[i], potions[i] <= 100000; 1 <= success <= 10000000000.",
      "source": {
        "label": "Successful Pairs of Spells and Potions - LeetCode 2300",
        "url": "https://leetcode.com/problems/successful-pairs-of-spells-and-potions/"
      },
      "examples": [
        {
          "input": "spells = [5,1,3], potions = [1,2,3,4,5], success = 7",
          "output": "[4,0,3]",
          "explanation": "Spell 5 pairs with potions 2 through 5; spell 1 has none; spell 3 pairs with 3 through 5."
        },
        {
          "input": "spells = [3,1,2], potions = [8,5,8], success = 16",
          "output": "[2,0,2]",
          "explanation": "Sorted potions allow counting all values meeting each spell threshold."
        },
        {
          "input": "spells = [10], potions = [1,2,3], success = 20",
          "output": "[2]",
          "explanation": "Potions 2 and 3 form successful pairs."
        }
      ],
      "bruteForceComplexity": "Time O(s * p); Space O(1) excluding output. Check every spell-potion product.",
      "optimizedComplexity": "Time O(p log p + s log p); Space O(1) excluding sort/output. Each spell uses one lower-bound search.",
      "recursiveComplexity": "Time O(p log p + s log p); Space O(log p) for recursive lower-bound calls excluding sort/output.",
      "bruteForceCode": "class Solution {\n  public int[] successfulPairs(int[] spells, int[] potions, long success) {\n    int[] answer = new int[spells.length];\n\n    for (int i = 0; i < spells.length; i++) {\n      int count = 0;\n      for (int potion : potions) {\n        if ((long) spells[i] * potion >= success) count++;\n      }\n      answer[i] = count;\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[] successfulPairs(int[] spells, int[] potions, long success) {\n    Arrays.sort(potions);\n    int[] answer = new int[spells.length];\n\n    for (int i = 0; i < spells.length; i++) {\n      int index = lowerBound(potions, spells[i], success);\n      answer[i] = potions.length - index;\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[] potions, int spell, long success) {\n    int left = 0;\n    int right = potions.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if ((long) spell * potions[mid] < success) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}",
      "recursiveCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[] successfulPairs(int[] spells, int[] potions, long success) {\n    Arrays.sort(potions);\n    int[] answer = new int[spells.length];\n\n    for (int i = 0; i < spells.length; i++) {\n      int index = lowerBound(potions, spells[i], success, 0, potions.length);\n      answer[i] = potions.length - index;\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[] potions, int spell, long success, int left, int right) {\n    if (left == right) return left;\n\n    int mid = left + (right - left) / 2;\n    if ((long) spell * potions[mid] < success) {\n      return lowerBound(potions, spell, success, mid + 1, right);\n    }\n    return lowerBound(potions, spell, success, left, mid);\n  }\n}",
      "optimizedCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[] successfulPairs(int[] spells, int[] potions, long success) {\n    Arrays.sort(potions);\n    int[] answer = new int[spells.length];\n\n    for (int i = 0; i < spells.length; i++) {\n      int index = lowerBound(potions, spells[i], success);\n      answer[i] = potions.length - index;\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[] potions, int spell, long success) {\n    int left = 0;\n    int right = potions.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if ((long) spell * potions[mid] < success) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}",
      "code": "import java.util.Arrays;\n\nclass Solution {\n  public int[] successfulPairs(int[] spells, int[] potions, long success) {\n    Arrays.sort(potions);\n    int[] answer = new int[spells.length];\n\n    for (int i = 0; i < spells.length; i++) {\n      int index = lowerBound(potions, spells[i], success);\n      answer[i] = potions.length - index;\n    }\n\n    return answer;\n  }\n\n  private int lowerBound(int[] potions, int spell, long success) {\n    int left = 0;\n    int right = potions.length;\n\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if ((long) spell * potions[mid] < success) left = mid + 1;\n      else right = mid;\n    }\n\n    return left;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Maximum Candies Allocated to K Children",
      "difficulty": "Medium",
      "subpattern": "Maximum feasible answer search",
      "question": "Given piles of candies and a long integer k, split piles into smaller piles but do not merge them. Return the maximum candies each child can receive if exactly k children receive the same positive number of candies, or 0 if impossible.",
      "trigger": "If each child can receive x candies, then every smaller amount is also feasible. This monotonic feasibility supports binary search for the maximum x.",
      "intuition": "For a candidate amount x, each pile contributes pile / x children. If total children is at least k, try a larger x.",
      "edgeCases": "Total candies less than k, k = 1, one pile, all piles small, answer equals 0, answer equals max pile.",
      "constraints": "1 <= candies.length <= 100000; 1 <= candies[i] <= 10000000; 1 <= k <= 1000000000000.",
      "source": {
        "label": "Maximum Candies Allocated to K Children - LeetCode 2226",
        "url": "https://leetcode.com/problems/maximum-candies-allocated-to-k-children/"
      },
      "examples": [
        {
          "input": "candies = [5,8,6], k = 3",
          "output": "5",
          "explanation": "Three children can receive 5 candies each."
        },
        {
          "input": "candies = [2,5], k = 11",
          "output": "0",
          "explanation": "There are not enough candies to give each child at least one."
        },
        {
          "input": "candies = [4,7,5], k = 4",
          "output": "3",
          "explanation": "Candidate 3 is feasible, but 4 is not."
        }
      ],
      "bruteForceComplexity": "Time O(n * maxCandy); Space O(1). Try every possible candies-per-child value.",
      "optimizedComplexity": "Time O(n log maxCandy); Space O(1). Each feasibility check scans all piles.",
      "recursiveComplexity": "Time O(n log maxCandy); Space O(log maxCandy). Recursive answer search adds stack depth.",
      "bruteForceCode": "class Solution {\n  public int maximumCandies(int[] candies, long k) {\n    int max = 0;\n    for (int pile : candies) max = Math.max(max, pile);\n\n    for (int amount = max; amount >= 1; amount--) {\n      if (canGive(candies, k, amount)) return amount;\n    }\n\n    return 0;\n  }\n\n  private boolean canGive(int[] candies, long k, int amount) {\n    long children = 0;\n    for (int pile : candies) children += pile / amount;\n    return children >= k;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maximumCandies(int[] candies, long k) {\n    int left = 1;\n    int right = 0;\n    for (int pile : candies) right = Math.max(right, pile);\n    int answer = 0;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canGive(candies, k, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canGive(int[] candies, long k, int amount) {\n    long children = 0;\n    for (int pile : candies) {\n      children += pile / amount;\n      if (children >= k) return true;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maximumCandies(int[] candies, long k) {\n    int max = 0;\n    for (int pile : candies) max = Math.max(max, pile);\n    return search(candies, k, 1, max, 0);\n  }\n\n  private int search(int[] candies, long k, int left, int right, int answer) {\n    if (left > right) return answer;\n\n    int mid = left + (right - left) / 2;\n    if (canGive(candies, k, mid)) return search(candies, k, mid + 1, right, mid);\n    return search(candies, k, left, mid - 1, answer);\n  }\n\n  private boolean canGive(int[] candies, long k, int amount) {\n    long children = 0;\n    for (int pile : candies) {\n      children += pile / amount;\n      if (children >= k) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maximumCandies(int[] candies, long k) {\n    int left = 1;\n    int right = 0;\n    for (int pile : candies) right = Math.max(right, pile);\n    int answer = 0;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canGive(candies, k, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canGive(int[] candies, long k, int amount) {\n    long children = 0;\n    for (int pile : candies) {\n      children += pile / amount;\n      if (children >= k) return true;\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public int maximumCandies(int[] candies, long k) {\n    int left = 1;\n    int right = 0;\n    for (int pile : candies) right = Math.max(right, pile);\n    int answer = 0;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canGive(candies, k, mid)) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canGive(int[] candies, long k, int amount) {\n    long children = 0;\n    for (int pile : candies) {\n      children += pile / amount;\n      if (children >= k) return true;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Minimum Speed to Arrive on Time",
      "difficulty": "Medium",
      "subpattern": "Minimum feasible speed search",
      "question": "Given train distances and a decimal hour, return the minimum positive integer speed needed to arrive on time. Each train except the last must depart at the next integer hour. Return -1 if arrival on time is impossible.",
      "trigger": "If a speed v arrives on time, every faster speed also arrives on time, so the minimum feasible speed can be binary searched.",
      "intuition": "Binary search speed. For all but the last train, add ceil(distance / speed); for the last train, add exact fractional time.",
      "edgeCases": "Impossible because hour <= n - 1, one train, exact integer arrival, large distances, answer near 10000000.",
      "constraints": "1 <= dist.length <= 100000; 1 <= dist[i] <= 100000; 1 <= hour <= 1000000000 with at most two decimal digits.",
      "source": {
        "label": "Minimum Speed to Arrive on Time - LeetCode 1870",
        "url": "https://leetcode.com/problems/minimum-speed-to-arrive-on-time/"
      },
      "examples": [
        {
          "input": "dist = [1,3,2], hour = 6",
          "output": "1",
          "explanation": "Speed 1 arrives in exactly 6 hours."
        },
        {
          "input": "dist = [1,3,2], hour = 2.7",
          "output": "3",
          "explanation": "Speed 3 is the minimum feasible speed."
        },
        {
          "input": "dist = [1,3,2], hour = 1.9",
          "output": "-1",
          "explanation": "At least two integer waits are needed before the last train."
        }
      ],
      "bruteForceComplexity": "Time O(n * 10000000); Space O(1). Try speeds from 1 upward until one works.",
      "optimizedComplexity": "Time O(n log 10000000); Space O(1). Binary search over the allowed speed range.",
      "recursiveComplexity": "Time O(n log 10000000); Space O(log 10000000). Recursive speed search adds stack frames.",
      "bruteForceCode": "class Solution {\n  public int minSpeedOnTime(int[] dist, double hour) {\n    for (int speed = 1; speed <= 10000000; speed++) {\n      if (canArrive(dist, hour, speed)) return speed;\n    }\n\n    return -1;\n  }\n\n  private boolean canArrive(int[] dist, double hour, int speed) {\n    double time = 0.0;\n    for (int i = 0; i < dist.length; i++) {\n      double trip = (double) dist[i] / speed;\n      time += i == dist.length - 1 ? trip : Math.ceil(trip);\n    }\n    return time <= hour;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minSpeedOnTime(int[] dist, double hour) {\n    if (hour <= dist.length - 1) return -1;\n\n    int left = 1;\n    int right = 10000000;\n    int answer = -1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canArrive(dist, hour, mid)) {\n        answer = mid;\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canArrive(int[] dist, double hour, int speed) {\n    double time = 0.0;\n\n    for (int i = 0; i < dist.length; i++) {\n      double trip = (double) dist[i] / speed;\n      time += i == dist.length - 1 ? trip : Math.ceil(trip);\n      if (time > hour) return false;\n    }\n\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minSpeedOnTime(int[] dist, double hour) {\n    if (hour <= dist.length - 1) return -1;\n    return search(dist, hour, 1, 10000000, -1);\n  }\n\n  private int search(int[] dist, double hour, int left, int right, int answer) {\n    if (left > right) return answer;\n\n    int mid = left + (right - left) / 2;\n    if (canArrive(dist, hour, mid)) return search(dist, hour, left, mid - 1, mid);\n    return search(dist, hour, mid + 1, right, answer);\n  }\n\n  private boolean canArrive(int[] dist, double hour, int speed) {\n    double time = 0.0;\n    for (int i = 0; i < dist.length; i++) {\n      double trip = (double) dist[i] / speed;\n      time += i == dist.length - 1 ? trip : Math.ceil(trip);\n      if (time > hour) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minSpeedOnTime(int[] dist, double hour) {\n    if (hour <= dist.length - 1) return -1;\n\n    int left = 1;\n    int right = 10000000;\n    int answer = -1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canArrive(dist, hour, mid)) {\n        answer = mid;\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canArrive(int[] dist, double hour, int speed) {\n    double time = 0.0;\n\n    for (int i = 0; i < dist.length; i++) {\n      double trip = (double) dist[i] / speed;\n      time += i == dist.length - 1 ? trip : Math.ceil(trip);\n      if (time > hour) return false;\n    }\n\n    return true;\n  }\n}",
      "code": "class Solution {\n  public int minSpeedOnTime(int[] dist, double hour) {\n    if (hour <= dist.length - 1) return -1;\n\n    int left = 1;\n    int right = 10000000;\n    int answer = -1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n\n      if (canArrive(dist, hour, mid)) {\n        answer = mid;\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return answer;\n  }\n\n  private boolean canArrive(int[] dist, double hour, int speed) {\n    double time = 0.0;\n\n    for (int i = 0; i < dist.length; i++) {\n      double trip = (double) dist[i] / speed;\n      time += i == dist.length - 1 ? trip : Math.ceil(trip);\n      if (time > hour) return false;\n    }\n\n    return true;\n  }\n}"
    },
    {
      "group": "more",
      "name": "H-Index II",
      "difficulty": "Medium",
      "subpattern": "Boundary search on sorted citations",
      "question": "Given citations sorted in ascending order, return the researcher h-index. h-index is the maximum h such that the researcher has at least h papers with at least h citations each.",
      "trigger": "For index i, there are n - i papers with citations at least citations[i]. The first index satisfying citations[i] >= n - i defines the h-index boundary.",
      "intuition": "Binary search the earliest index where citation count can support the number of papers to its right.",
      "edgeCases": "No cited papers, one paper, all citations high, all citations zero, h-index equals n, h-index equals 0.",
      "constraints": "1 <= citations.length <= 100000; 0 <= citations[i] <= 1000; citations is sorted in ascending order.",
      "source": {
        "label": "H-Index II - LeetCode 275",
        "url": "https://leetcode.com/problems/h-index-ii/"
      },
      "examples": [
        {
          "input": "citations = [0,1,3,5,6]",
          "output": "3",
          "explanation": "There are 3 papers with at least 3 citations."
        },
        {
          "input": "citations = [1,2,100]",
          "output": "2",
          "explanation": "There are 2 papers with at least 2 citations."
        },
        {
          "input": "citations = [0,0,0]",
          "output": "0",
          "explanation": "No positive h-index is possible."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Try every h and count papers with at least h citations.",
      "optimizedComplexity": "Time O(log n); Space O(1). Binary search finds the first citation boundary supporting h.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive boundary search adds stack space.",
      "bruteForceCode": "class Solution {\n  public int hIndex(int[] citations) {\n    int n = citations.length;\n\n    for (int h = n; h >= 0; h--) {\n      int count = 0;\n      for (int citation : citations) {\n        if (citation >= h) count++;\n      }\n      if (count >= h) return h;\n    }\n\n    return 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int hIndex(int[] citations) {\n    int n = citations.length;\n    int left = 0;\n    int right = n - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int papers = n - mid;\n\n      if (citations[mid] >= papers) {\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return n - left;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int hIndex(int[] citations) {\n    int boundary = lowerBoundary(citations, 0, citations.length - 1);\n    return citations.length - boundary;\n  }\n\n  private int lowerBoundary(int[] citations, int left, int right) {\n    if (left > right) return left;\n\n    int mid = left + (right - left) / 2;\n    int papers = citations.length - mid;\n\n    if (citations[mid] >= papers) return lowerBoundary(citations, left, mid - 1);\n    return lowerBoundary(citations, mid + 1, right);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int hIndex(int[] citations) {\n    int n = citations.length;\n    int left = 0;\n    int right = n - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int papers = n - mid;\n\n      if (citations[mid] >= papers) {\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return n - left;\n  }\n}",
      "code": "class Solution {\n  public int hIndex(int[] citations) {\n    int n = citations.length;\n    int left = 0;\n    int right = n - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int papers = n - mid;\n\n      if (citations[mid] >= papers) {\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    }\n\n    return n - left;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Guess Number Higher or Lower",
      "difficulty": "Easy",
      "subpattern": "Interactive binary search by comparison API",
      "question": "You are playing a guessing game from 1 to n. The API guess(num) returns -1 if num is higher than the picked number, 1 if num is lower, and 0 if num is correct. Return the picked number.",
      "trigger": "The API comparison tells whether the hidden answer is lower or higher than mid, exactly matching binary search over a numeric range.",
      "intuition": "Search [1, n]. A high guess moves right down; a low guess moves left up; equality returns the answer.",
      "edgeCases": "n = 1, picked number is 1, picked number is n, large n where midpoint overflow is possible.",
      "constraints": "1 <= n <= 2^31 - 1; 1 <= pick <= n; guess(num) returns -1, 0, or 1.",
      "source": {
        "label": "Guess Number Higher or Lower - LeetCode 374",
        "url": "https://leetcode.com/problems/guess-number-higher-or-lower/"
      },
      "examples": [
        {
          "input": "n = 10, pick = 6",
          "output": "6",
          "explanation": "Binary search reaches the hidden number 6."
        },
        {
          "input": "n = 1, pick = 1",
          "output": "1",
          "explanation": "The only possible number is correct."
        },
        {
          "input": "n = 2, pick = 1",
          "output": "1",
          "explanation": "After guessing too high, search moves left."
        }
      ],
      "bruteForceComplexity": "Time O(n) API calls; Space O(1). Try every number from 1 to n.",
      "optimizedComplexity": "Time O(log n) API calls; Space O(1). Each guess halves the numeric range.",
      "recursiveComplexity": "Time O(log n) API calls; Space O(log n). Recursive binary search uses logarithmic stack space.",
      "bruteForceCode": "/* The guess API is defined in the parent class GuessGame.\n   int guess(int num); */\n\npublic class Solution extends GuessGame {\n  public int guessNumber(int n) {\n    for (int number = 1; number <= n; number++) {\n      if (guess(number) == 0) return number;\n    }\n\n    return -1;\n  }\n}",
      "iterativeCode": "/* The guess API is defined in the parent class GuessGame.\n   int guess(int num); */\n\npublic class Solution extends GuessGame {\n  public int guessNumber(int n) {\n    int left = 1;\n    int right = n;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int result = guess(mid);\n\n      if (result == 0) return mid;\n      if (result < 0) right = mid - 1;\n      else left = mid + 1;\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "/* The guess API is defined in the parent class GuessGame.\n   int guess(int num); */\n\npublic class Solution extends GuessGame {\n  public int guessNumber(int n) {\n    return search(1, n);\n  }\n\n  private int search(int left, int right) {\n    int mid = left + (right - left) / 2;\n    int result = guess(mid);\n\n    if (result == 0) return mid;\n    if (result < 0) return search(left, mid - 1);\n    return search(mid + 1, right);\n  }\n}",
      "optimizedCode": "/* The guess API is defined in the parent class GuessGame.\n   int guess(int num); */\n\npublic class Solution extends GuessGame {\n  public int guessNumber(int n) {\n    int left = 1;\n    int right = n;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int result = guess(mid);\n\n      if (result == 0) return mid;\n      if (result < 0) right = mid - 1;\n      else left = mid + 1;\n    }\n\n    return -1;\n  }\n}",
      "code": "/* The guess API is defined in the parent class GuessGame.\n   int guess(int num); */\n\npublic class Solution extends GuessGame {\n  public int guessNumber(int n) {\n    int left = 1;\n    int right = n;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int result = guess(mid);\n\n      if (result == 0) return mid;\n      if (result < 0) right = mid - 1;\n      else left = mid + 1;\n    }\n\n    return -1;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Binary Search signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Binary Search problem with duplicates and boundary indexes.",
    "A Binary Search problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Binary Search but needs one helper structure.",
    "A maximum-constraint version of a familiar Binary Search problem.",
    "A recognition test where the statement does not mention Binary Search."
  ]
};
