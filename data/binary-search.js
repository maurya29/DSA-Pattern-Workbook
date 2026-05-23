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
      "subpattern": "Sorted search",
      "question": "Solve Binary Search using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Binary Search - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Binary%20Search"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int binarySearch(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int binarySearch(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int binarySearch(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int binarySearch(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int binarySearch(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "First Bad Version",
      "difficulty": "Easy",
      "subpattern": "answer search",
      "question": "Solve First Bad Version using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "First Bad Version - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=First%20Bad%20Version"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int firstBadVersion(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int firstBadVersion(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int firstBadVersion(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int firstBadVersion(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int firstBadVersion(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search Insert Position",
      "difficulty": "Easy",
      "subpattern": "rotated arrays",
      "question": "Solve Search Insert Position using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes rotated arrays and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for rotated arrays and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Search Insert Position - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Search%20Insert%20Position"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int searchInsertPosition(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int searchInsertPosition(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int searchInsertPosition(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int searchInsertPosition(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int searchInsertPosition(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find First and Last Position of Element in Sorted Array",
      "difficulty": "Easy",
      "subpattern": "boundaries.",
      "question": "Solve Find First and Last Position of Element in Sorted Array using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes boundaries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for boundaries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find First and Last Position of Element in Sorted Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20First%20and%20Last%20Position%20of%20Element%20in%20Sorted%20Array"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int findFirstAndLastPositionOfElementInSortedArray(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findFirstAndLastPositionOfElementInSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findFirstAndLastPositionOfElementInSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findFirstAndLastPositionOfElementInSortedArray(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int findFirstAndLastPositionOfElementInSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Sqrt(x)",
      "difficulty": "Easy",
      "subpattern": "Sorted search",
      "question": "Solve Sqrt(x) using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sqrt(x) - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sqrt(x)"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int sqrtX(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int sqrtX(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int sqrtX(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int sqrtX(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int sqrtX(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Valid Perfect Square",
      "difficulty": "Easy",
      "subpattern": "answer search",
      "question": "Solve Valid Perfect Square using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Valid Perfect Square - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Valid%20Perfect%20Square"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int validPerfectSquare(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int validPerfectSquare(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int validPerfectSquare(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int validPerfectSquare(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int validPerfectSquare(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search in Rotated Sorted Array",
      "difficulty": "Easy",
      "subpattern": "rotated arrays",
      "question": "Solve Search in Rotated Sorted Array using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes rotated arrays and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for rotated arrays and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Search in Rotated Sorted Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Search%20in%20Rotated%20Sorted%20Array"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int searchInRotatedSortedArray(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int searchInRotatedSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int searchInRotatedSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int searchInRotatedSortedArray(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int searchInRotatedSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Minimum in Rotated Sorted Array",
      "difficulty": "Easy",
      "subpattern": "boundaries.",
      "question": "Solve Find Minimum in Rotated Sorted Array using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes boundaries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for boundaries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Minimum in Rotated Sorted Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Minimum%20in%20Rotated%20Sorted%20Array"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int findMinimumInRotatedSortedArray(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findMinimumInRotatedSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findMinimumInRotatedSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findMinimumInRotatedSortedArray(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int findMinimumInRotatedSortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Peak Element",
      "difficulty": "Easy",
      "subpattern": "Sorted search",
      "question": "Solve Find Peak Element using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Peak Element - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Peak%20Element"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int findPeakElement(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findPeakElement(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findPeakElement(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findPeakElement(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int findPeakElement(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Peak Index in a Mountain Array",
      "difficulty": "Easy",
      "subpattern": "answer search",
      "question": "Solve Peak Index in a Mountain Array using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Peak Index in a Mountain Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Peak%20Index%20in%20a%20Mountain%20Array"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int peakIndexInAMountainArray(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int peakIndexInAMountainArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int peakIndexInAMountainArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int peakIndexInAMountainArray(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int peakIndexInAMountainArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Single Element in a Sorted Array",
      "difficulty": "Medium",
      "subpattern": "rotated arrays",
      "question": "Solve Single Element in a Sorted Array using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes rotated arrays and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for rotated arrays and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Single Element in a Sorted Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Single%20Element%20in%20a%20Sorted%20Array"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int singleElementInASortedArray(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int singleElementInASortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int singleElementInASortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int singleElementInASortedArray(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int singleElementInASortedArray(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Smallest Letter Greater Than Target",
      "difficulty": "Medium",
      "subpattern": "boundaries.",
      "question": "Solve Find Smallest Letter Greater Than Target using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes boundaries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for boundaries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Smallest Letter Greater Than Target - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Smallest%20Letter%20Greater%20Than%20Target"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int findSmallestLetterGreaterThanTarget(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findSmallestLetterGreaterThanTarget(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findSmallestLetterGreaterThanTarget(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findSmallestLetterGreaterThanTarget(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int findSmallestLetterGreaterThanTarget(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Koko Eating Bananas",
      "difficulty": "Medium",
      "subpattern": "Sorted search",
      "question": "Solve Koko Eating Bananas using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Koko Eating Bananas - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Koko%20Eating%20Bananas"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int kokoEatingBananas(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int kokoEatingBananas(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int kokoEatingBananas(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int kokoEatingBananas(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int kokoEatingBananas(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Capacity To Ship Packages Within D Days",
      "difficulty": "Medium",
      "subpattern": "answer search",
      "question": "Solve Capacity To Ship Packages Within D Days using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Capacity To Ship Packages Within D Days - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Capacity%20To%20Ship%20Packages%20Within%20D%20Days"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int capacityToShipPackagesWithinDDays(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int capacityToShipPackagesWithinDDays(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int capacityToShipPackagesWithinDDays(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int capacityToShipPackagesWithinDDays(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int capacityToShipPackagesWithinDDays(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Split Array Largest Sum",
      "difficulty": "Medium",
      "subpattern": "rotated arrays",
      "question": "Solve Split Array Largest Sum using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes rotated arrays and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for rotated arrays and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Split Array Largest Sum - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Split%20Array%20Largest%20Sum"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int splitArrayLargestSum(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int splitArrayLargestSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int splitArrayLargestSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int splitArrayLargestSum(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int splitArrayLargestSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimized Maximum of Products Distributed to Any Store",
      "difficulty": "Medium",
      "subpattern": "boundaries.",
      "question": "Solve Minimized Maximum of Products Distributed to Any Store using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes boundaries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for boundaries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimized Maximum of Products Distributed to Any Store - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimized%20Maximum%20of%20Products%20Distributed%20to%20Any%20Store"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int minimizedMaximumOfProductsDistributedToAnyStore(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minimizedMaximumOfProductsDistributedToAnyStore(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minimizedMaximumOfProductsDistributedToAnyStore(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minimizedMaximumOfProductsDistributedToAnyStore(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int minimizedMaximumOfProductsDistributedToAnyStore(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Magnetic Force Between Two Balls",
      "difficulty": "Medium",
      "subpattern": "Sorted search",
      "question": "Solve Magnetic Force Between Two Balls using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Magnetic Force Between Two Balls - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Magnetic%20Force%20Between%20Two%20Balls"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int magneticForceBetweenTwoBalls(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int magneticForceBetweenTwoBalls(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int magneticForceBetweenTwoBalls(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int magneticForceBetweenTwoBalls(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int magneticForceBetweenTwoBalls(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Aggressive Cows",
      "difficulty": "Medium",
      "subpattern": "answer search",
      "question": "Solve Aggressive Cows using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Aggressive Cows - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Aggressive%20Cows"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int aggressiveCows(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int aggressiveCows(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int aggressiveCows(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int aggressiveCows(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int aggressiveCows(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Median of Two Sorted Arrays",
      "difficulty": "Medium",
      "subpattern": "rotated arrays",
      "question": "Solve Median of Two Sorted Arrays using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes rotated arrays and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for rotated arrays and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Median of Two Sorted Arrays - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Median%20of%20Two%20Sorted%20Arrays"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int medianOfTwoSortedArrays(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int medianOfTwoSortedArrays(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int medianOfTwoSortedArrays(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int medianOfTwoSortedArrays(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int medianOfTwoSortedArrays(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Kth Missing Positive Number",
      "difficulty": "Medium",
      "subpattern": "boundaries.",
      "question": "Solve Kth Missing Positive Number using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes boundaries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for boundaries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Kth Missing Positive Number - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Kth%20Missing%20Positive%20Number"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int kthMissingPositiveNumber(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int kthMissingPositiveNumber(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int kthMissingPositiveNumber(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int kthMissingPositiveNumber(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int kthMissingPositiveNumber(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Find Kth Smallest Pair Distance",
      "difficulty": "Medium",
      "subpattern": "Sorted search",
      "question": "Solve Find Kth Smallest Pair Distance using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Kth Smallest Pair Distance - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Kth%20Smallest%20Pair%20Distance"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int findKthSmallestPairDistance(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findKthSmallestPairDistance(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findKthSmallestPairDistance(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findKthSmallestPairDistance(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int findKthSmallestPairDistance(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Time Based Key-Value Store",
      "difficulty": "Medium",
      "subpattern": "answer search",
      "question": "Solve Time Based Key-Value Store using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Time Based Key-Value Store - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Time%20Based%20Key-Value%20Store"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int timeBasedKeyValueStore(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int timeBasedKeyValueStore(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int timeBasedKeyValueStore(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int timeBasedKeyValueStore(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int timeBasedKeyValueStore(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Search a 2D Matrix",
      "difficulty": "Medium",
      "subpattern": "rotated arrays",
      "question": "Solve Search a 2D Matrix using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes rotated arrays and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for rotated arrays and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Search a 2D Matrix - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Search%20a%202D%20Matrix"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int searchA2dMatrix(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int searchA2dMatrix(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int searchA2dMatrix(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int searchA2dMatrix(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int searchA2dMatrix(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Search a 2D Matrix II",
      "difficulty": "Medium",
      "subpattern": "boundaries.",
      "question": "Solve Search a 2D Matrix II using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes boundaries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for boundaries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Search a 2D Matrix II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Search%20a%202D%20Matrix%20II"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int searchA2dMatrixIi(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int searchA2dMatrixIi(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int searchA2dMatrixIi(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int searchA2dMatrixIi(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int searchA2dMatrixIi(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Find Right Interval",
      "difficulty": "Hard",
      "subpattern": "Sorted search",
      "question": "Solve Find Right Interval using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Right Interval - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Right%20Interval"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int findRightInterval(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findRightInterval(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findRightInterval(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findRightInterval(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int findRightInterval(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Successful Pairs of Spells and Potions",
      "difficulty": "Hard",
      "subpattern": "answer search",
      "question": "Solve Successful Pairs of Spells and Potions using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Successful Pairs of Spells and Potions - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Successful%20Pairs%20of%20Spells%20and%20Potions"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int successfulPairsOfSpellsAndPotions(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int successfulPairsOfSpellsAndPotions(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int successfulPairsOfSpellsAndPotions(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int successfulPairsOfSpellsAndPotions(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int successfulPairsOfSpellsAndPotions(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Maximum Candies Allocated to K Children",
      "difficulty": "Hard",
      "subpattern": "rotated arrays",
      "question": "Solve Maximum Candies Allocated to K Children using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes rotated arrays and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for rotated arrays and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Candies Allocated to K Children - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Candies%20Allocated%20to%20K%20Children"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int maximumCandiesAllocatedToKChildren(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maximumCandiesAllocatedToKChildren(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maximumCandiesAllocatedToKChildren(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maximumCandiesAllocatedToKChildren(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int maximumCandiesAllocatedToKChildren(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Speed to Arrive on Time",
      "difficulty": "Hard",
      "subpattern": "boundaries.",
      "question": "Solve Minimum Speed to Arrive on Time using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes boundaries. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for boundaries. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Speed to Arrive on Time - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Speed%20to%20Arrive%20on%20Time"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int minimumSpeedToArriveOnTime(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minimumSpeedToArriveOnTime(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minimumSpeedToArriveOnTime(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minimumSpeedToArriveOnTime(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int minimumSpeedToArriveOnTime(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "H-Index II",
      "difficulty": "Hard",
      "subpattern": "Sorted search",
      "question": "Solve H-Index II using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes sorted search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for sorted search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "H-Index II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=H-Index%20II"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int hIndexIi(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int hIndexIi(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int hIndexIi(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int hIndexIi(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int hIndexIi(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Guess Number Higher or Lower",
      "difficulty": "Hard",
      "subpattern": "answer search",
      "question": "Solve Guess Number Higher or Lower using the Binary Search pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Binary Search when the input structure exposes answer search and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for answer search and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Guess Number Higher or Lower - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Guess%20Number%20Higher%20or%20Lower"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,7], target = 5",
          "output": "2",
          "explanation": "Target is found at index 2."
        },
        {
          "input": "nums = [1,3,5,7], target = 4",
          "output": "-1",
          "explanation": "Target is absent."
        },
        {
          "input": "nums = [2], target = 2",
          "output": "0",
          "explanation": "Single element matches."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  public int guessNumberHigherOrLower(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] == target) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int guessNumberHigherOrLower(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int guessNumberHigherOrLower(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int guessNumberHigherOrLower(int[] nums, int target) {\n    return search(nums, target, 0, nums.length - 1);\n  }\n\n  private int search(int[] nums, int target, int left, int right) {\n    if (left > right) return -1;\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) return search(nums, target, mid + 1, right);\n    return search(nums, target, left, mid - 1);\n  }\n}",
      "code": "class Solution {\n  public int guessNumberHigherOrLower(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (nums[mid] == target) return mid;\n      if (nums[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}"
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
