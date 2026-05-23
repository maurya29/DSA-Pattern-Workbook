const CURRENT_PATTERN = {
  "id": "two-pointers",
  "name": "Two Pointers",
  "summary": "Opposite-end, same-direction, partition, and in-place scans.",
  "complete": true,
  "subpatterns": [
    "Opposite-end convergence on sorted arrays",
    "Same-direction slow/fast scan",
    "Fast-slow cycle detection",
    "In-place overwrite / compaction",
    "Partition around condition or pivot",
    "Palindrome inward scan",
    "Two sorted arrays merge",
    "K-sum after sorting",
    "Container / area optimization",
    "Sliding boundary with duplicate skipping",
    "Gap method for arrays",
    "Linked-list two pointers",
    "Multi-pointer counting",
    "Dutch national flag"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Two Sum II - Input Array Is Sorted",
      "difficulty": "Easy",
      "subpattern": "Opposite-end convergence on sorted arrays",
      "question": "Return 1-indexed positions of two numbers in a sorted array that sum to target.",
      "trigger": "Sorted input plus pair sum asks for low/high movement.",
      "intuition": "Move the side that makes the sum too small or too large.",
      "code": "class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n      int sum = numbers[left] + numbers[right];\n      if (sum == target) return new int[] {left + 1, right + 1};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n      int sum = numbers[left] + numbers[right];\n      if (sum == target) return new int[] {left + 1, right + 1};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n      int sum = numbers[left] + numbers[right];\n      if (sum == target) return new int[] {left + 1, right + 1};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n      int sum = numbers[left] + numbers[right];\n      if (sum == target) return new int[] {left + 1, right + 1};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Valid Palindrome",
      "difficulty": "Easy",
      "subpattern": "Palindrome inward scan",
      "question": "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case.",
      "trigger": "Comparison from both ends with skipped invalid characters.",
      "intuition": "Advance each pointer until both point to comparable characters.",
      "code": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public boolean isPalindromeRecursive(String s) {\n    return check(s, 0, s.length() - 1);\n  }\n\n  private boolean check(String s, int left, int right) {\n    if (left >= right) return true;\n    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);\n    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);\n    return Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))\n        && check(s, left + 1, right - 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public boolean isPalindromeRecursive(String s) {\n    return check(s, 0, s.length() - 1);\n  }\n\n  private boolean check(String s, int left, int right) {\n    if (left >= right) return true;\n    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);\n    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);\n    return Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))\n        && check(s, left + 1, right - 1);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public boolean isPalindromeRecursive(String s) {\n    return check(s, 0, s.length() - 1);\n  }\n\n  private boolean check(String s, int left, int right) {\n    if (left >= right) return true;\n    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);\n    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);\n    return Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))\n        && check(s, left + 1, right - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public boolean isPalindromeRecursive(String s) {\n    return check(s, 0, s.length() - 1);\n  }\n\n  private boolean check(String s, int left, int right) {\n    if (left >= right) return true;\n    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);\n    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);\n    return Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))\n        && check(s, left + 1, right - 1);\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Remove Duplicates from Sorted Array",
      "difficulty": "Easy",
      "subpattern": "In-place overwrite / compaction",
      "question": "Remove duplicates in-place and return the count of unique values.",
      "trigger": "Sorted array means duplicates are adjacent; write pointer keeps the compacted prefix.",
      "intuition": "Only copy a value when it differs from the last kept value.",
      "code": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.length; read++) {\n      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.length; read++) {\n      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.length; read++) {\n      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.length; read++) {\n      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Remove Element",
      "difficulty": "Easy",
      "subpattern": "In-place overwrite / compaction",
      "question": "Remove all occurrences of val in-place and return the new length.",
      "trigger": "Need stable compaction without extra array.",
      "intuition": "Read every value once and overwrite only values that survive.",
      "code": "class Solution {\n  public int removeElement(int[] nums, int val) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != val) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int removeElement(int[] nums, int val) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != val) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int removeElement(int[] nums, int val) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != val) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int removeElement(int[] nums, int val) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != val) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Move Zeroes",
      "difficulty": "Easy",
      "subpattern": "In-place overwrite / compaction",
      "question": "Move all zeroes to the end while preserving non-zero order.",
      "trigger": "Separate read pointer from position where the next non-zero belongs.",
      "intuition": "Compact non-zero values first, then fill the tail with zeroes.",
      "code": "class Solution {\n  public void moveZeroes(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != 0) nums[write++] = nums[read];\n    }\n    while (write < nums.length) nums[write++] = 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public void moveZeroes(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != 0) nums[write++] = nums[read];\n    }\n    while (write < nums.length) nums[write++] = 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public void moveZeroes(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != 0) nums[write++] = nums[read];\n    }\n    while (write < nums.length) nums[write++] = 0;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void moveZeroes(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != 0) nums[write++] = nums[read];\n    }\n    while (write < nums.length) nums[write++] = 0;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Squares of a Sorted Array",
      "difficulty": "Easy",
      "subpattern": "Opposite-end convergence on sorted arrays",
      "question": "Return squares of a sorted array in nondecreasing order.",
      "trigger": "Largest square can come from either absolute end.",
      "intuition": "Fill output from right to left using the larger absolute endpoint.",
      "code": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int n = nums.length, left = 0, right = n - 1, write = n - 1;\n    int[] ans = new int[n];\n    while (left <= right) {\n      int a = nums[left] * nums[left];\n      int b = nums[right] * nums[right];\n      if (a > b) {\n        ans[write--] = a;\n        left++;\n      } else {\n        ans[write--] = b;\n        right--;\n      }\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int n = nums.length, left = 0, right = n - 1, write = n - 1;\n    int[] ans = new int[n];\n    while (left <= right) {\n      int a = nums[left] * nums[left];\n      int b = nums[right] * nums[right];\n      if (a > b) {\n        ans[write--] = a;\n        left++;\n      } else {\n        ans[write--] = b;\n        right--;\n      }\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int n = nums.length, left = 0, right = n - 1, write = n - 1;\n    int[] ans = new int[n];\n    while (left <= right) {\n      int a = nums[left] * nums[left];\n      int b = nums[right] * nums[right];\n      if (a > b) {\n        ans[write--] = a;\n        left++;\n      } else {\n        ans[write--] = b;\n        right--;\n      }\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int n = nums.length, left = 0, right = n - 1, write = n - 1;\n    int[] ans = new int[n];\n    while (left <= right) {\n      int a = nums[left] * nums[left];\n      int b = nums[right] * nums[right];\n      if (a > b) {\n        ans[write--] = a;\n        left++;\n      } else {\n        ans[write--] = b;\n        right--;\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Reverse String",
      "difficulty": "Easy",
      "subpattern": "Opposite-end swap",
      "question": "Reverse a character array in-place.",
      "trigger": "Symmetric endpoints need swapping until they cross.",
      "intuition": "Swap left and right, then shrink the range.",
      "code": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0, right = s.length - 1;\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n\n  public void reverseStringRecursive(char[] s) {\n    reverse(s, 0, s.length - 1);\n  }\n\n  private void reverse(char[] s, int left, int right) {\n    if (left >= right) return;\n    char temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    reverse(s, left + 1, right - 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0, right = s.length - 1;\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n\n  public void reverseStringRecursive(char[] s) {\n    reverse(s, 0, s.length - 1);\n  }\n\n  private void reverse(char[] s, int left, int right) {\n    if (left >= right) return;\n    char temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    reverse(s, left + 1, right - 1);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0, right = s.length - 1;\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n\n  public void reverseStringRecursive(char[] s) {\n    reverse(s, 0, s.length - 1);\n  }\n\n  private void reverse(char[] s, int left, int right) {\n    if (left >= right) return;\n    char temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    reverse(s, left + 1, right - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0, right = s.length - 1;\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n\n  public void reverseStringRecursive(char[] s) {\n    reverse(s, 0, s.length - 1);\n  }\n\n  private void reverse(char[] s, int left, int right) {\n    if (left >= right) return;\n    char temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    reverse(s, left + 1, right - 1);\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Merge Sorted Array",
      "difficulty": "Easy",
      "subpattern": "Two sorted arrays merge",
      "question": "Merge nums2 into nums1 in nondecreasing order.",
      "trigger": "Both arrays are sorted and nums1 has empty space at the end.",
      "intuition": "Write from the back so existing nums1 values are not overwritten.",
      "code": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1, j = n - 1, write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1, j = n - 1, write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1, j = n - 1, write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "optimizedCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1, j = n - 1, write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Linked List Cycle",
      "difficulty": "Easy",
      "subpattern": "Fast-slow cycle detection",
      "question": "Return true if a linked list contains a cycle.",
      "trigger": "Cycle can be detected by pointers moving at different speeds.",
      "intuition": "Fast eventually meets slow inside a cycle; otherwise fast reaches null.",
      "code": "class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) return true;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) return true;\n    }\n    return false;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Middle of the Linked List",
      "difficulty": "Easy",
      "subpattern": "Linked-list two pointers",
      "question": "Return the middle node of a linked list; for even length, return the second middle.",
      "trigger": "Fast pointer moves twice as quickly as slow.",
      "intuition": "When fast finishes, slow has crossed half the list.",
      "code": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    return slow;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    return slow;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    return slow;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    return slow;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "Container With Most Water",
      "difficulty": "Medium",
      "subpattern": "Container / area optimization",
      "question": "Find the maximum water area formed by two vertical lines.",
      "trigger": "Area depends on two endpoints and the smaller height.",
      "intuition": "Move the shorter side because the taller side cannot improve with less width.",
      "code": "class Solution {\n  public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, best = 0;\n    while (left < right) {\n      int area = Math.min(height[left], height[right]) * (right - left);\n      best = Math.max(best, area);\n      if (height[left] < height[right]) left++;\n      else right--;\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, best = 0;\n    while (left < right) {\n      int area = Math.min(height[left], height[right]) * (right - left);\n      best = Math.max(best, area);\n      if (height[left] < height[right]) left++;\n      else right--;\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, best = 0;\n    while (left < right) {\n      int area = Math.min(height[left], height[right]) * (right - left);\n      best = Math.max(best, area);\n      if (height[left] < height[right]) left++;\n      else right--;\n    }\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, best = 0;\n    while (left < right) {\n      int area = Math.min(height[left], height[right]) * (right - left);\n      best = Math.max(best, area);\n      if (height[left] < height[right]) left++;\n      else right--;\n    }\n    return best;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "core",
      "name": "3Sum",
      "difficulty": "Medium",
      "subpattern": "K-sum after sorting",
      "question": "Return all unique triplets that sum to zero.",
      "trigger": "After fixing one value, remaining pair is a sorted two-sum problem.",
      "intuition": "Sort, skip duplicates, and converge low/high for each fixed index.",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (sum == 0) {\n          ans.add(Arrays.asList(nums[i], nums[left], nums[right]));\n          left++;\n          right--;\n          while (left < right && nums[left] == nums[left - 1]) left++;\n          while (left < right && nums[right] == nums[right + 1]) right--;\n        } else if (sum < 0) left++;\n        else right--;\n      }\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (sum == 0) {\n          ans.add(Arrays.asList(nums[i], nums[left], nums[right]));\n          left++;\n          right--;\n          while (left < right && nums[left] == nums[left - 1]) left++;\n          while (left < right && nums[right] == nums[right + 1]) right--;\n        } else if (sum < 0) left++;\n        else right--;\n      }\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (sum == 0) {\n          ans.add(Arrays.asList(nums[i], nums[left], nums[right]));\n          left++;\n          right--;\n          while (left < right && nums[left] == nums[left - 1]) left++;\n          while (left < right && nums[right] == nums[right + 1]) right--;\n        } else if (sum < 0) left++;\n        else right--;\n      }\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (sum == 0) {\n          ans.add(Arrays.asList(nums[i], nums[left], nums[right]));\n          left++;\n          right--;\n          while (left < right && nums[left] == nums[left - 1]) left++;\n          while (left < right && nums[right] == nums[right + 1]) right--;\n        } else if (sum < 0) left++;\n        else right--;\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "3Sum Closest",
      "difficulty": "Medium",
      "subpattern": "K-sum after sorting",
      "question": "Find the triplet sum closest to target.",
      "trigger": "Fix one value; best remaining pair is found by low/high movement.",
      "intuition": "Update closest before moving the pointer based on comparison to target.",
      "code": "import java.util.*;\n\nclass Solution {\n  public int threeSumClosest(int[] nums, int target) {\n    Arrays.sort(nums);\n    int best = nums[0] + nums[1] + nums[2];\n    for (int i = 0; i < nums.length - 2; i++) {\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (Math.abs(target - sum) < Math.abs(target - best)) best = sum;\n        if (sum < target) left++;\n        else if (sum > target) right--;\n        else return target;\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int threeSumClosest(int[] nums, int target) {\n    Arrays.sort(nums);\n    int best = nums[0] + nums[1] + nums[2];\n    for (int i = 0; i < nums.length - 2; i++) {\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (Math.abs(target - sum) < Math.abs(target - best)) best = sum;\n        if (sum < target) left++;\n        else if (sum > target) right--;\n        else return target;\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int threeSumClosest(int[] nums, int target) {\n    Arrays.sort(nums);\n    int best = nums[0] + nums[1] + nums[2];\n    for (int i = 0; i < nums.length - 2; i++) {\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (Math.abs(target - sum) < Math.abs(target - best)) best = sum;\n        if (sum < target) left++;\n        else if (sum > target) right--;\n        else return target;\n      }\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int threeSumClosest(int[] nums, int target) {\n    Arrays.sort(nums);\n    int best = nums[0] + nums[1] + nums[2];\n    for (int i = 0; i < nums.length - 2; i++) {\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (Math.abs(target - sum) < Math.abs(target - best)) best = sum;\n        if (sum < target) left++;\n        else if (sum > target) right--;\n        else return target;\n      }\n    }\n    return best;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "4Sum",
      "difficulty": "Medium",
      "subpattern": "K-sum after sorting",
      "question": "Return all unique quadruplets that sum to target.",
      "trigger": "Two fixed values reduce the problem to sorted two-sum.",
      "intuition": "Use long sums, duplicate skipping, and inner convergence.",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> fourSum(int[] nums, int target) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    int n = nums.length;\n    for (int i = 0; i < n - 3; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      for (int j = i + 1; j < n - 2; j++) {\n        if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n        int left = j + 1, right = n - 1;\n        while (left < right) {\n          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n          if (sum == target) {\n            ans.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n            left++;\n            right--;\n            while (left < right && nums[left] == nums[left - 1]) left++;\n            while (left < right && nums[right] == nums[right + 1]) right--;\n          } else if (sum < target) left++;\n          else right--;\n        }\n      }\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> fourSum(int[] nums, int target) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    int n = nums.length;\n    for (int i = 0; i < n - 3; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      for (int j = i + 1; j < n - 2; j++) {\n        if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n        int left = j + 1, right = n - 1;\n        while (left < right) {\n          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n          if (sum == target) {\n            ans.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n            left++;\n            right--;\n            while (left < right && nums[left] == nums[left - 1]) left++;\n            while (left < right && nums[right] == nums[right + 1]) right--;\n          } else if (sum < target) left++;\n          else right--;\n        }\n      }\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> fourSum(int[] nums, int target) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    int n = nums.length;\n    for (int i = 0; i < n - 3; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      for (int j = i + 1; j < n - 2; j++) {\n        if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n        int left = j + 1, right = n - 1;\n        while (left < right) {\n          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n          if (sum == target) {\n            ans.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n            left++;\n            right--;\n            while (left < right && nums[left] == nums[left - 1]) left++;\n            while (left < right && nums[right] == nums[right + 1]) right--;\n          } else if (sum < target) left++;\n          else right--;\n        }\n      }\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> fourSum(int[] nums, int target) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    int n = nums.length;\n    for (int i = 0; i < n - 3; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      for (int j = i + 1; j < n - 2; j++) {\n        if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n        int left = j + 1, right = n - 1;\n        while (left < right) {\n          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n          if (sum == target) {\n            ans.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n            left++;\n            right--;\n            while (left < right && nums[left] == nums[left - 1]) left++;\n            while (left < right && nums[right] == nums[right + 1]) right--;\n          } else if (sum < target) left++;\n          else right--;\n        }\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "Sort Colors",
      "difficulty": "Medium",
      "subpattern": "Dutch national flag",
      "question": "Sort an array containing only 0, 1, and 2 in-place.",
      "trigger": "Three categories need one-pass partitioning.",
      "intuition": "Keep boundaries for zero zone, unknown zone, and two zone.",
      "code": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 1) mid++;\n      else swap(nums, mid, high--);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "iterativeCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 1) mid++;\n      else swap(nums, mid, high--);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 1) mid++;\n      else swap(nums, mid, high--);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 1) mid++;\n      else swap(nums, mid, high--);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "Trapping Rain Water",
      "difficulty": "Hard",
      "subpattern": "Container / area optimization",
      "question": "Compute how much rain water can be trapped between bars.",
      "trigger": "Water at each side is constrained by the smaller boundary.",
      "intuition": "Move the smaller boundary while tracking its best height.",
      "code": "class Solution {\n  public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n      if (height[left] < height[right]) {\n        leftMax = Math.max(leftMax, height[left]);\n        water += leftMax - height[left++];\n      } else {\n        rightMax = Math.max(rightMax, height[right]);\n        water += rightMax - height[right--];\n      }\n    }\n    return water;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n      if (height[left] < height[right]) {\n        leftMax = Math.max(leftMax, height[left]);\n        water += leftMax - height[left++];\n      } else {\n        rightMax = Math.max(rightMax, height[right]);\n        water += rightMax - height[right--];\n      }\n    }\n    return water;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n      if (height[left] < height[right]) {\n        leftMax = Math.max(leftMax, height[left]);\n        water += leftMax - height[left++];\n      } else {\n        rightMax = Math.max(rightMax, height[right]);\n        water += rightMax - height[right--];\n      }\n    }\n    return water;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n      if (height[left] < height[right]) {\n        leftMax = Math.max(leftMax, height[left]);\n        water += leftMax - height[left++];\n      } else {\n        rightMax = Math.max(rightMax, height[right]);\n        water += rightMax - height[right--];\n      }\n    }\n    return water;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "Linked List Cycle II",
      "difficulty": "Medium",
      "subpattern": "Fast-slow cycle detection",
      "question": "Return the node where a linked list cycle begins.",
      "trigger": "Meeting point plus head pointer identifies cycle entry.",
      "intuition": "After collision, move one pointer from head and one from meeting point.",
      "code": "class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n    return null;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n    return null;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n    return null;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n    return null;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "Remove Nth Node From End of List",
      "difficulty": "Medium",
      "subpattern": "Linked-list two pointers",
      "question": "Remove the nth node from the end of a linked list.",
      "trigger": "A fixed gap between fast and slow lands slow before target.",
      "intuition": "Advance fast n steps, then move both until fast reaches the end.",
      "code": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode slow = dummy, fast = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) {\n      slow = slow.next;\n      fast = fast.next;\n    }\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode slow = dummy, fast = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) {\n      slow = slow.next;\n      fast = fast.next;\n    }\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode slow = dummy, fast = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) {\n      slow = slow.next;\n      fast = fast.next;\n    }\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode slow = dummy, fast = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) {\n      slow = slow.next;\n      fast = fast.next;\n    }\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "Partition List",
      "difficulty": "Medium",
      "subpattern": "Partition around condition or pivot",
      "question": "Partition a linked list so nodes less than x come before nodes greater than or equal to x.",
      "trigger": "Two output chains represent two partitions.",
      "intuition": "Append each node to the correct chain, then connect the chains.",
      "code": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode smallDummy = new ListNode(0), largeDummy = new ListNode(0);\n    ListNode small = smallDummy, large = largeDummy;\n    while (head != null) {\n      if (head.val < x) {\n        small.next = head;\n        small = small.next;\n      } else {\n        large.next = head;\n        large = large.next;\n      }\n      head = head.next;\n    }\n    large.next = null;\n    small.next = largeDummy.next;\n    return smallDummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode smallDummy = new ListNode(0), largeDummy = new ListNode(0);\n    ListNode small = smallDummy, large = largeDummy;\n    while (head != null) {\n      if (head.val < x) {\n        small.next = head;\n        small = small.next;\n      } else {\n        large.next = head;\n        large = large.next;\n      }\n      head = head.next;\n    }\n    large.next = null;\n    small.next = largeDummy.next;\n    return smallDummy.next;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode smallDummy = new ListNode(0), largeDummy = new ListNode(0);\n    ListNode small = smallDummy, large = largeDummy;\n    while (head != null) {\n      if (head.val < x) {\n        small.next = head;\n        small = small.next;\n      } else {\n        large.next = head;\n        large = large.next;\n      }\n      head = head.next;\n    }\n    large.next = null;\n    small.next = largeDummy.next;\n    return smallDummy.next;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode smallDummy = new ListNode(0), largeDummy = new ListNode(0);\n    ListNode small = smallDummy, large = largeDummy;\n    while (head != null) {\n      if (head.val < x) {\n        small.next = head;\n        small = small.next;\n      } else {\n        large.next = head;\n        large = large.next;\n      }\n      head = head.next;\n    }\n    large.next = null;\n    small.next = largeDummy.next;\n    return smallDummy.next;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "advanced",
      "name": "Boats to Save People",
      "difficulty": "Medium",
      "subpattern": "Opposite-end convergence on sorted arrays",
      "question": "Return the minimum boats needed when each boat carries at most two people under a weight limit.",
      "trigger": "Sorted lightest and heaviest pairing decides each boat greedily.",
      "intuition": "Always place the heaviest remaining person; pair with lightest only if possible.",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0, right = people.length - 1, boats = 0;\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0, right = people.length - 1, boats = 0;\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0, right = people.length - 1, boats = 0;\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0, right = people.length - 1, boats = 0;\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Valid Palindrome II",
      "difficulty": "Easy",
      "subpattern": "Palindrome inward scan",
      "question": "Check whether deleting at most one character can make a string palindrome.",
      "trigger": "First mismatch leaves exactly two possible deletion choices.",
      "intuition": "Skip either left or right once, then require a clean palindrome.",
      "code": "class Solution {\n  public boolean validPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      if (s.charAt(left) == s.charAt(right)) {\n        left++;\n        right--;\n      } else {\n        return isPal(s, left + 1, right) || isPal(s, left, right - 1);\n      }\n    }\n    return true;\n  }\n\n  private boolean isPal(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean validPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      if (s.charAt(left) == s.charAt(right)) {\n        left++;\n        right--;\n      } else {\n        return isPal(s, left + 1, right) || isPal(s, left, right - 1);\n      }\n    }\n    return true;\n  }\n\n  private boolean isPal(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public boolean validPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      if (s.charAt(left) == s.charAt(right)) {\n        left++;\n        right--;\n      } else {\n        return isPal(s, left + 1, right) || isPal(s, left, right - 1);\n      }\n    }\n    return true;\n  }\n\n  private boolean isPal(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean validPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      if (s.charAt(left) == s.charAt(right)) {\n        left++;\n        right--;\n      } else {\n        return isPal(s, left + 1, right) || isPal(s, left, right - 1);\n      }\n    }\n    return true;\n  }\n\n  private boolean isPal(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Intersection of Two Arrays II",
      "difficulty": "Easy",
      "subpattern": "Two sorted arrays merge",
      "question": "Return the intersection of two integer arrays including duplicate counts.",
      "trigger": "After sorting both arrays, matching elements can be collected with two scans.",
      "intuition": "Advance the pointer with the smaller value; collect when equal.",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] intersect(int[] nums1, int[] nums2) {\n    Arrays.sort(nums1);\n    Arrays.sort(nums2);\n    int i = 0, j = 0, write = 0;\n    int[] temp = new int[Math.min(nums1.length, nums2.length)];\n    while (i < nums1.length && j < nums2.length) {\n      if (nums1[i] == nums2[j]) temp[write++] = nums1[i++];\n      else if (nums1[i] < nums2[j]) i++;\n      else j++;\n    }\n    return Arrays.copyOf(temp, write);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersect(int[] nums1, int[] nums2) {\n    Arrays.sort(nums1);\n    Arrays.sort(nums2);\n    int i = 0, j = 0, write = 0;\n    int[] temp = new int[Math.min(nums1.length, nums2.length)];\n    while (i < nums1.length && j < nums2.length) {\n      if (nums1[i] == nums2[j]) temp[write++] = nums1[i++];\n      else if (nums1[i] < nums2[j]) i++;\n      else j++;\n    }\n    return Arrays.copyOf(temp, write);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersect(int[] nums1, int[] nums2) {\n    Arrays.sort(nums1);\n    Arrays.sort(nums2);\n    int i = 0, j = 0, write = 0;\n    int[] temp = new int[Math.min(nums1.length, nums2.length)];\n    while (i < nums1.length && j < nums2.length) {\n      if (nums1[i] == nums2[j]) temp[write++] = nums1[i++];\n      else if (nums1[i] < nums2[j]) i++;\n      else j++;\n    }\n    return Arrays.copyOf(temp, write);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersect(int[] nums1, int[] nums2) {\n    Arrays.sort(nums1);\n    Arrays.sort(nums2);\n    int i = 0, j = 0, write = 0;\n    int[] temp = new int[Math.min(nums1.length, nums2.length)];\n    while (i < nums1.length && j < nums2.length) {\n      if (nums1[i] == nums2[j]) temp[write++] = nums1[i++];\n      else if (nums1[i] < nums2[j]) i++;\n      else j++;\n    }\n    return Arrays.copyOf(temp, write);\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Backspace String Compare",
      "difficulty": "Easy",
      "subpattern": "Same-direction slow/fast scan",
      "question": "Compare two strings after applying backspace characters.",
      "trigger": "Each string can be compacted in-place conceptually with a write pointer.",
      "intuition": "Build the final typed form by overwriting removed characters.",
      "code": "class Solution {\n  public boolean backspaceCompare(String s, String t) {\n    return build(s).equals(build(t));\n  }\n\n  private String build(String value) {\n    char[] chars = value.toCharArray();\n    int write = 0;\n    for (char c : chars) {\n      if (c == '#') {\n        if (write > 0) write--;\n      } else {\n        chars[write++] = c;\n      }\n    }\n    return new String(chars, 0, write);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean backspaceCompare(String s, String t) {\n    return build(s).equals(build(t));\n  }\n\n  private String build(String value) {\n    char[] chars = value.toCharArray();\n    int write = 0;\n    for (char c : chars) {\n      if (c == '#') {\n        if (write > 0) write--;\n      } else {\n        chars[write++] = c;\n      }\n    }\n    return new String(chars, 0, write);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public boolean backspaceCompare(String s, String t) {\n    return build(s).equals(build(t));\n  }\n\n  private String build(String value) {\n    char[] chars = value.toCharArray();\n    int write = 0;\n    for (char c : chars) {\n      if (c == '#') {\n        if (write > 0) write--;\n      } else {\n        chars[write++] = c;\n      }\n    }\n    return new String(chars, 0, write);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean backspaceCompare(String s, String t) {\n    return build(s).equals(build(t));\n  }\n\n  private String build(String value) {\n    char[] chars = value.toCharArray();\n    int write = 0;\n    for (char c : chars) {\n      if (c == '#') {\n        if (write > 0) write--;\n      } else {\n        chars[write++] = c;\n      }\n    }\n    return new String(chars, 0, write);\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Minimum Size Subarray Sum",
      "difficulty": "Medium",
      "subpattern": "Same-direction slow/fast scan",
      "question": "Find the minimum length of a contiguous subarray with sum at least target.",
      "trigger": "Positive values allow the left boundary to move forward once the target is reached.",
      "intuition": "Expand with right, shrink with left while the window is valid.",
      "code": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Pair With Target Sum",
      "difficulty": "Easy",
      "subpattern": "Opposite-end convergence on sorted arrays",
      "question": "Given a sorted array, return indexes of any pair that sums to target.",
      "trigger": "Sorted pair search has monotonic pointer movement.",
      "intuition": "Too small means increase left; too large means decrease right.",
      "code": "class Solution {\n  public int[] pairWithTargetSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n      int sum = nums[left] + nums[right];\n      if (sum == target) return new int[] {left, right};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] pairWithTargetSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n      int sum = nums[left] + nums[right];\n      if (sum == target) return new int[] {left, right};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int[] pairWithTargetSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n      int sum = nums[left] + nums[right];\n      if (sum == target) return new int[] {left, right};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] pairWithTargetSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n      int sum = nums[left] + nums[right];\n      if (sum == target) return new int[] {left, right};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Remove Duplicates from Sorted Array II",
      "difficulty": "Medium",
      "subpattern": "In-place overwrite / compaction",
      "question": "Allow each distinct number to appear at most twice in a sorted array.",
      "trigger": "Sorted duplicates form runs; write pointer can enforce count limit.",
      "intuition": "Keep a value only if it differs from the value two positions behind write.",
      "code": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    int write = 0;\n    for (int num : nums) {\n      if (write < 2 || num != nums[write - 2]) nums[write++] = num;\n    }\n    return write;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    int write = 0;\n    for (int num : nums) {\n      if (write < 2 || num != nums[write - 2]) nums[write++] = num;\n    }\n    return write;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    int write = 0;\n    for (int num : nums) {\n      if (write < 2 || num != nums[write - 2]) nums[write++] = num;\n    }\n    return write;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    int write = 0;\n    for (int num : nums) {\n      if (write < 2 || num != nums[write - 2]) nums[write++] = num;\n    }\n    return write;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Subarray Product Less Than K",
      "difficulty": "Medium",
      "subpattern": "Same-direction slow/fast scan",
      "question": "Count contiguous subarrays where product is less than k.",
      "trigger": "Positive values allow shrinking from the left when product becomes too large.",
      "intuition": "Every valid window ending at right contributes its length.",
      "code": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0, count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) product /= nums[left++];\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0, count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) product /= nums[left++];\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0, count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) product /= nums[left++];\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0, count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) product /= nums[left++];\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Find the Duplicate Number",
      "difficulty": "Medium",
      "subpattern": "Fast-slow cycle detection",
      "question": "Find the duplicate number in an array containing n + 1 integers from 1 to n.",
      "trigger": "Array values can be treated as next pointers forming a cycle.",
      "intuition": "Floyd cycle detection finds the duplicate as the cycle entry.",
      "code": "class Solution {\n  public int findDuplicate(int[] nums) {\n    int slow = nums[0], fast = nums[0];\n    do {\n      slow = nums[slow];\n      fast = nums[nums[fast]];\n    } while (slow != fast);\n    slow = nums[0];\n    while (slow != fast) {\n      slow = nums[slow];\n      fast = nums[fast];\n    }\n    return slow;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findDuplicate(int[] nums) {\n    int slow = nums[0], fast = nums[0];\n    do {\n      slow = nums[slow];\n      fast = nums[nums[fast]];\n    } while (slow != fast);\n    slow = nums[0];\n    while (slow != fast) {\n      slow = nums[slow];\n      fast = nums[fast];\n    }\n    return slow;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int findDuplicate(int[] nums) {\n    int slow = nums[0], fast = nums[0];\n    do {\n      slow = nums[slow];\n      fast = nums[nums[fast]];\n    } while (slow != fast);\n    slow = nums[0];\n    while (slow != fast) {\n      slow = nums[slow];\n      fast = nums[fast];\n    }\n    return slow;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findDuplicate(int[] nums) {\n    int slow = nums[0], fast = nums[0];\n    do {\n      slow = nums[slow];\n      fast = nums[nums[fast]];\n    } while (slow != fast);\n    slow = nums[0];\n    while (slow != fast) {\n      slow = nums[slow];\n      fast = nums[fast];\n    }\n    return slow;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Rearrange Array Elements by Sign",
      "difficulty": "Medium",
      "subpattern": "Multi-pointer counting",
      "question": "Rearrange equal counts of positive and negative numbers alternately starting with positive.",
      "trigger": "Two write pointers target even and odd positions.",
      "intuition": "Place positives at even indexes and negatives at odd indexes.",
      "code": "class Solution {\n  public int[] rearrangeArray(int[] nums) {\n    int[] ans = new int[nums.length];\n    int positive = 0, negative = 1;\n    for (int num : nums) {\n      if (num > 0) {\n        ans[positive] = num;\n        positive += 2;\n      } else {\n        ans[negative] = num;\n        negative += 2;\n      }\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] rearrangeArray(int[] nums) {\n    int[] ans = new int[nums.length];\n    int positive = 0, negative = 1;\n    for (int num : nums) {\n      if (num > 0) {\n        ans[positive] = num;\n        positive += 2;\n      } else {\n        ans[negative] = num;\n        negative += 2;\n      }\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int[] rearrangeArray(int[] nums) {\n    int[] ans = new int[nums.length];\n    int positive = 0, negative = 1;\n    for (int num : nums) {\n      if (num > 0) {\n        ans[positive] = num;\n        positive += 2;\n      } else {\n        ans[negative] = num;\n        negative += 2;\n      }\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] rearrangeArray(int[] nums) {\n    int[] ans = new int[nums.length];\n    int positive = 0, negative = 1;\n    for (int num : nums) {\n      if (num > 0) {\n        ans[positive] = num;\n        positive += 2;\n      } else {\n        ans[negative] = num;\n        negative += 2;\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    },
    {
      "group": "practice",
      "name": "Next Permutation",
      "difficulty": "Medium",
      "subpattern": "Gap / reverse suffix",
      "question": "Transform nums into its next lexicographic permutation in-place.",
      "trigger": "A decreasing suffix must be reversed after swapping the pivot.",
      "intuition": "Find first rising position from the right, swap with next larger, reverse suffix.",
      "code": "class Solution {\n  public void nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n      int j = nums.length - 1;\n      while (nums[j] <= nums[i]) j--;\n      swap(nums, i, j);\n    }\n    reverse(nums, i + 1, nums.length - 1);\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "iterativeCode": "class Solution {\n  public void nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n      int j = nums.length - 1;\n      while (nums[j] <= nums[i]) j--;\n      swap(nums, i, j);\n    }\n    reverse(nums, i + 1, nums.length - 1);\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public void nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n      int j = nums.length - 1;\n      while (nums[j] <= nums[i]) j--;\n      swap(nums, i, j);\n    }\n    reverse(nums, i + 1, nums.length - 1);\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n      int j = nums.length - 1;\n      while (nums[j] <= nums[i]) j--;\n      swap(nums, i, j);\n    }\n    reverse(nums, i + 1, nums.length - 1);\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "examples": [
        {
          "input": "Use the sample input from this LeetCode-style problem.",
          "output": "Expected result based on the problem requirement.",
          "explanation": "This placeholder will be replaced when we verify this problem in detail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack."
    }
  ],
  "checklist": [
    "Input is sorted, can be sorted, or has ordered boundaries.",
    "Question asks for a pair/triplet, palindrome, merge, partition, or in-place removal.",
    "A brute force nested loop repeats comparisons between two moving positions.",
    "Moving one pointer has a monotonic reason: sum too small, sum too large, boundary weaker, or duplicate run consumed.",
    "Extra array is avoidable because a read/write pointer can maintain the valid prefix."
  ],
  "traps": [
    "Skipping duplicates before recording the answer in 3Sum/4Sum.",
    "Forgetting integer overflow in 4Sum and area/product variants.",
    "Moving both pointers when only one side has a justified monotonic move.",
    "Breaking linked-list chains without setting the tail to null.",
    "Using two pointers on unsorted pair-sum input without sorting or a hash map."
  ],
  "edgeCases": [
    "Empty array, one element, or two elements.",
    "All duplicates, no duplicates, and duplicate-heavy inputs.",
    "Negative values with sorted square or K-sum problems.",
    "Already valid palindrome, one mismatch, and many non-alphanumeric characters.",
    "Linked list with zero nodes, one node, two nodes, and cycle at head."
  ],
  "complexities": [
    "Opposite-end pair search: O(n) time, O(1) space after sorting; O(n log n) if sorting is needed.",
    "In-place compaction: O(n) time, O(1) space.",
    "3Sum: O(n^2) time, O(1) extra space excluding output.",
    "4Sum: O(n^3) time, O(1) extra space excluding output.",
    "Fast-slow linked-list cycle: O(n) time, O(1) space."
  ],
  "mentalModel": [
    "One pointer owns the left boundary; the other owns the right or write boundary.",
    "Move a pointer only when you can prove the skipped state cannot be better.",
    "For sorted sums, low increases value and high decreases value.",
    "For compaction, read explores; write commits.",
    "For fast-slow, distance or speed difference encodes the answer."
  ],
  "revisionStrategy": [
    "Day 1: Solve the 12 core problems without looking at code.",
    "Day 3: Re-solve 3Sum, Container With Most Water, Linked List Cycle, and Remove Duplicates II.",
    "Day 7: Solve all 8 advanced problems in one sitting with a 25-minute cap each.",
    "Day 14: Mix 10 random problems and write only trigger point plus pointer movement first.",
    "Day 30: Redo the 12 core problems and compare edge-case handling."
  ],
  "unseen": [
    "Minimum Difference Between Highest and Lowest of K Scores",
    "Shortest Unsorted Continuous Subarray",
    "Sentence Similarity III",
    "Minimum Adjacent Swaps to Make a Valid Array",
    "Count Pairs Whose Sum is Less than Target"
  ]
};
