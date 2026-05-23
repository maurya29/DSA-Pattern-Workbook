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
      "recursiveCode": "class Solution {\n  public int[] twoSum(int[] numbers, int target) { return search(numbers, target, 0, numbers.length - 1); }\n  private int[] search(int[] a, int target, int l, int r) {\n    int sum = a[l] + a[r];\n    if (sum == target) return new int[] {l + 1, r + 1};\n    return sum < target ? search(a, target, l + 1, r) : search(a, target, l, r - 1);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    for (int i = 0; i < numbers.length; i++) for (int j = i + 1; j < numbers.length; j++) if (numbers[i] + numbers[j] == target) return new int[] {i + 1, j + 1};\n    return new int[] {-1, -1};\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n      int sum = numbers[left] + numbers[right];\n      if (sum == target) return new int[] {left + 1, right + 1};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "examples": [
        {
          "input": "numbers = [2,7,11,15], target = 9",
          "output": "[1,2]",
          "explanation": "2 + 7 = 9; return 1-indexed positions."
        },
        {
          "input": "numbers = [2,3,4], target = 6",
          "output": "[1,3]",
          "explanation": "2 + 4 = 6."
        },
        {
          "input": "numbers = [-1,0], target = -1",
          "output": "[1,2]",
          "explanation": "-1 + 0 = -1."
        }
      ],
      "edgeCases": "Two elements, negative numbers, duplicate values, answer at both ends, and 1-indexed output.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "2 <= numbers.length <= 3 * 10^4; numbers is sorted nondecreasing; exactly one solution exists.",
      "source": {
        "label": "LeetCode 167 - Two Sum II - Input Array Is Sorted",
        "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
      }
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
      "recursiveCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public boolean isPalindromeRecursive(String s) {\n    return check(s, 0, s.length() - 1);\n  }\n\n  private boolean check(String s, int left, int right) {\n    if (left >= right) return true;\n    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);\n    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);\n    return Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))\n        && check(s, left + 1, right - 1);\n  }\n}",
      "bruteForceCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    StringBuilder cleaned = new StringBuilder();\n    for (char c : s.toCharArray()) if (Character.isLetterOrDigit(c)) cleaned.append(Character.toLowerCase(c));\n    return cleaned.toString().equals(cleaned.reverse().toString());\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public boolean isPalindromeRecursive(String s) {\n    return check(s, 0, s.length() - 1);\n  }\n\n  private boolean check(String s, int left, int right) {\n    if (left >= right) return true;\n    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);\n    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);\n    return Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))\n        && check(s, left + 1, right - 1);\n  }\n}",
      "examples": [
        {
          "input": "s = \"A man, a plan, a canal: Panama\"",
          "output": "true",
          "explanation": "After cleanup it reads the same forward and backward."
        },
        {
          "input": "s = \"race a car\"",
          "output": "false",
          "explanation": "The cleaned string is not a palindrome."
        },
        {
          "input": "s = \" \"",
          "output": "true",
          "explanation": "No alphanumeric characters means an empty palindrome."
        }
      ],
      "edgeCases": "Empty cleaned string, punctuation, spaces, mixed case, digits, and one-character strings.",
      "bruteForceComplexity": "Time O(n), Space O(n) after building a cleaned string.",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "1 <= s.length <= 2 * 10^5; s consists of printable ASCII characters.",
      "source": {
        "label": "LeetCode 125 - Valid Palindrome",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      }
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
      "recursiveCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.length; read++) {\n      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "bruteForceCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    int[] temp = new int[nums.length]; int size = 0;\n    for (int num : nums) if (size == 0 || temp[size - 1] != num) temp[size++] = num;\n    for (int i = 0; i < size; i++) nums[i] = temp[i];\n    return size;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.length; read++) {\n      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "examples": [
        {
          "input": "nums = [1,1,2]",
          "output": "2, nums = [1,2,_]",
          "explanation": "First two values are unique."
        },
        {
          "input": "nums = [0,0,1,1,1,2,2,3,3,4]",
          "output": "5, nums = [0,1,2,3,4,_,_,_,_,_]",
          "explanation": "There are five unique values."
        },
        {
          "input": "nums = [1]",
          "output": "1, nums = [1]",
          "explanation": "Single value stays."
        }
      ],
      "edgeCases": "One element, all duplicates, no duplicates, negative values, and returned length only.",
      "bruteForceComplexity": "Time O(n), Space O(n) using a temporary list.",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "1 <= nums.length <= 3 * 10^4; nums is sorted nondecreasing.",
      "source": {
        "label": "LeetCode 26 - Remove Duplicates from Sorted Array",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
      }
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
      "recursiveCode": "class Solution {\n  public int removeElement(int[] nums, int val) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != val) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "bruteForceCode": "class Solution { public int removeElement(int[] nums, int val) { int[] temp = new int[nums.length]; int size = 0; for (int num : nums) if (num != val) temp[size++] = num; for (int i = 0; i < size; i++) nums[i] = temp[i]; return size; } }",
      "optimizedCode": "class Solution {\n  public int removeElement(int[] nums, int val) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != val) nums[write++] = nums[read];\n    }\n    return write;\n  }\n}",
      "examples": [
        {
          "input": "nums = [3,2,2,3], val = 3",
          "output": "2, nums = [2,2,_,_]",
          "explanation": "All 3s are removed."
        },
        {
          "input": "nums = [0,1,2,2,3,0,4,2], val = 2",
          "output": "5",
          "explanation": "Values not equal to 2 remain."
        },
        {
          "input": "nums = [1], val = 1",
          "output": "0",
          "explanation": "The only value is removed."
        }
      ],
      "edgeCases": "Empty array, remove all, remove none, single element.",
      "bruteForceComplexity": "Time O(n), Space O(n).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "0 <= nums.length <= 100; order of remaining elements may change or stay.",
      "source": {
        "label": "LeetCode 27 - Remove Element",
        "url": "https://leetcode.com/problems/remove-element/"
      }
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
      "recursiveCode": "class Solution {\n  public void moveZeroes(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != 0) nums[write++] = nums[read];\n    }\n    while (write < nums.length) nums[write++] = 0;\n  }\n}",
      "bruteForceCode": "class Solution { public void moveZeroes(int[] nums) { int[] temp = new int[nums.length]; int write = 0; for (int num : nums) if (num != 0) temp[write++] = num; for (int i = 0; i < nums.length; i++) nums[i] = temp[i]; } }",
      "optimizedCode": "class Solution {\n  public void moveZeroes(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n      if (nums[read] != 0) nums[write++] = nums[read];\n    }\n    while (write < nums.length) nums[write++] = 0;\n  }\n}",
      "examples": [
        {
          "input": "nums = [0,1,0,3,12]",
          "output": "[1,3,12,0,0]",
          "explanation": "Non-zero order is preserved."
        },
        {
          "input": "nums = [0]",
          "output": "[0]",
          "explanation": "Single zero stays."
        },
        {
          "input": "nums = [1,2,3]",
          "output": "[1,2,3]",
          "explanation": "No zeroes to move."
        }
      ],
      "edgeCases": "All zeroes, no zeroes, one value, stable order of non-zero values.",
      "bruteForceComplexity": "Time O(n), Space O(n).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "1 <= nums.length <= 10^4; modify nums in-place.",
      "source": {
        "label": "LeetCode 283 - Move Zeroes",
        "url": "https://leetcode.com/problems/move-zeroes/"
      }
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
      "recursiveCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int n = nums.length, left = 0, right = n - 1, write = n - 1;\n    int[] ans = new int[n];\n    while (left <= right) {\n      int a = nums[left] * nums[left];\n      int b = nums[right] * nums[right];\n      if (a > b) {\n        ans[write--] = a;\n        left++;\n      } else {\n        ans[write--] = b;\n        right--;\n      }\n    }\n    return ans;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public int[] sortedSquares(int[] nums) { int[] ans = new int[nums.length]; for (int i = 0; i < nums.length; i++) ans[i] = nums[i] * nums[i]; Arrays.sort(ans); return ans; } }",
      "optimizedCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int n = nums.length, left = 0, right = n - 1, write = n - 1;\n    int[] ans = new int[n];\n    while (left <= right) {\n      int a = nums[left] * nums[left];\n      int b = nums[right] * nums[right];\n      if (a > b) {\n        ans[write--] = a;\n        left++;\n      } else {\n        ans[write--] = b;\n        right--;\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "nums = [-4,-1,0,3,10]",
          "output": "[0,1,9,16,100]",
          "explanation": "Squares sorted."
        },
        {
          "input": "nums = [-7,-3,2,3,11]",
          "output": "[4,9,9,49,121]",
          "explanation": "Largest squares come from ends."
        },
        {
          "input": "nums = [0]",
          "output": "[0]",
          "explanation": "Single value."
        }
      ],
      "edgeCases": "All negative, all positive, mixed signs, zeros, duplicate absolute values.",
      "bruteForceComplexity": "Time O(n log n), Space O(n).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) output plus call stack.",
      "constraints": "1 <= nums.length <= 10^4; nums sorted nondecreasing.",
      "source": {
        "label": "LeetCode 977 - Squares of a Sorted Array",
        "url": "https://leetcode.com/problems/squares-of-a-sorted-array/"
      }
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
      "recursiveCode": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0, right = s.length - 1;\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n\n  public void reverseStringRecursive(char[] s) {\n    reverse(s, 0, s.length - 1);\n  }\n\n  private void reverse(char[] s, int left, int right) {\n    if (left >= right) return;\n    char temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    reverse(s, left + 1, right - 1);\n  }\n}",
      "bruteForceCode": "class Solution { public void reverseString(char[] s) { char[] copy = s.clone(); for (int i = 0; i < s.length; i++) s[i] = copy[s.length - 1 - i]; } }",
      "optimizedCode": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0, right = s.length - 1;\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n\n  public void reverseStringRecursive(char[] s) {\n    reverse(s, 0, s.length - 1);\n  }\n\n  private void reverse(char[] s, int left, int right) {\n    if (left >= right) return;\n    char temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    reverse(s, left + 1, right - 1);\n  }\n}",
      "examples": [
        {
          "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
          "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
          "explanation": "Reverse in-place."
        },
        {
          "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
          "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
          "explanation": "All chars swapped symmetrically."
        },
        {
          "input": "s = [\"a\"]",
          "output": "[\"a\"]",
          "explanation": "Single char unchanged."
        }
      ],
      "edgeCases": "One char, even length, odd length, repeated chars.",
      "bruteForceComplexity": "Time O(n), Space O(n) if copied.",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "1 <= s.length <= 10^5; modify in-place with O(1) extra memory.",
      "source": {
        "label": "LeetCode 344 - Reverse String",
        "url": "https://leetcode.com/problems/reverse-string/"
      }
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
      "recursiveCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1, j = n - 1, write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public void merge(int[] nums1, int m, int[] nums2, int n) { for (int i = 0; i < n; i++) nums1[m + i] = nums2[i]; Arrays.sort(nums1); } }",
      "optimizedCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1, j = n - 1, write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "examples": [
        {
          "input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
          "output": "[1,2,2,3,5,6]",
          "explanation": "Merged sorted order."
        },
        {
          "input": "nums1 = [1], m = 1, nums2 = [], n = 0",
          "output": "[1]",
          "explanation": "nums2 empty."
        },
        {
          "input": "nums1 = [0], m = 0, nums2 = [1], n = 1",
          "output": "[1]",
          "explanation": "nums1 has only buffer."
        }
      ],
      "edgeCases": "m=0, n=0, duplicates, all nums2 smaller/larger.",
      "bruteForceComplexity": "Time O((m+n) log(m+n)), Space O(1) if append then sort.",
      "optimizedComplexity": "Time O(m+n), Space O(1).",
      "recursiveComplexity": "Time O(m+n), Space O(m+n) call stack.",
      "constraints": "nums1.length == m + n; nums1 and nums2 sorted nondecreasing.",
      "source": {
        "label": "LeetCode 88 - Merge Sorted Array",
        "url": "https://leetcode.com/problems/merge-sorted-array/"
      }
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
      "recursiveCode": "class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) return true;\n    }\n    return false;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public boolean hasCycle(ListNode head) { Set<ListNode> seen = new HashSet<>(); while (head != null) { if (!seen.add(head)) return true; head = head.next; } return false; } }",
      "optimizedCode": "class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) return true;\n    }\n    return false;\n  }\n}",
      "examples": [
        {
          "input": "head = [3,2,0,-4], pos = 1",
          "output": "true",
          "explanation": "Tail connects to index 1."
        },
        {
          "input": "head = [1,2], pos = 0",
          "output": "true",
          "explanation": "Tail connects to head."
        },
        {
          "input": "head = [1], pos = -1",
          "output": "false",
          "explanation": "No cycle."
        }
      ],
      "edgeCases": "Empty list, one node, cycle at head, no cycle, two-node cycle.",
      "bruteForceComplexity": "Time O(n), Space O(n) using a HashSet.",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) visited set and call stack.",
      "constraints": "0 <= number of nodes <= 10^4.",
      "source": {
        "label": "LeetCode 141 - Linked List Cycle",
        "url": "https://leetcode.com/problems/linked-list-cycle/"
      }
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
      "recursiveCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    return slow;\n  }\n}",
      "bruteForceCode": "class Solution { public ListNode middleNode(ListNode head) { int len = 0; for (ListNode cur = head; cur != null; cur = cur.next) len++; for (int i = 0; i < len / 2; i++) head = head.next; return head; } }",
      "optimizedCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    return slow;\n  }\n}",
      "examples": [
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[3,4,5]",
          "explanation": "Middle is node 3."
        },
        {
          "input": "head = [1,2,3,4,5,6]",
          "output": "[4,5,6]",
          "explanation": "Second middle is returned."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Only node is middle."
        }
      ],
      "edgeCases": "One node, two nodes, odd length, even length second middle.",
      "bruteForceComplexity": "Time O(n), Space O(1) with length count two-pass.",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "1 <= number of nodes <= 100.",
      "source": {
        "label": "LeetCode 876 - Middle of the Linked List",
        "url": "https://leetcode.com/problems/middle-of-the-linked-list/"
      }
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
      "recursiveCode": "class Solution {\n  public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, best = 0;\n    while (left < right) {\n      int area = Math.min(height[left], height[right]) * (right - left);\n      best = Math.max(best, area);\n      if (height[left] < height[right]) left++;\n      else right--;\n    }\n    return best;\n  }\n}",
      "bruteForceCode": "class Solution { public int maxArea(int[] height) { int best = 0; for (int i = 0; i < height.length; i++) for (int j = i + 1; j < height.length; j++) best = Math.max(best, Math.min(height[i], height[j]) * (j - i)); return best; } }",
      "optimizedCode": "class Solution {\n  public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, best = 0;\n    while (left < right) {\n      int area = Math.min(height[left], height[right]) * (right - left);\n      best = Math.max(best, area);\n      if (height[left] < height[right]) left++;\n      else right--;\n    }\n    return best;\n  }\n}",
      "examples": [
        {
          "input": "height = [1,8,6,2,5,4,8,3,7]",
          "output": "49",
          "explanation": "Lines at 1 and 8 form area 49."
        },
        {
          "input": "height = [1,1]",
          "output": "1",
          "explanation": "Only one container."
        },
        {
          "input": "height = [4,3,2,1,4]",
          "output": "16",
          "explanation": "Ends form best area."
        }
      ],
      "edgeCases": "Two bars, equal heights, monotonic heights, zero heights.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "constraints": "2 <= height.length <= 10^5; 0 <= height[i] <= 10^4.",
      "source": {
        "label": "LeetCode 11 - Container With Most Water",
        "url": "https://leetcode.com/problems/container-with-most-water/"
      }
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
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (sum == 0) {\n          ans.add(Arrays.asList(nums[i], nums[left], nums[right]));\n          left++;\n          right--;\n          while (left < right && nums[left] == nums[left - 1]) left++;\n          while (left < right && nums[right] == nums[right + 1]) right--;\n        } else if (sum < 0) left++;\n        else right--;\n      }\n    }\n    return ans;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public List<List<Integer>> threeSum(int[] nums) { Set<List<Integer>> set = new HashSet<>(); for (int i=0;i<nums.length;i++) for (int j=i+1;j<nums.length;j++) for (int k=j+1;k<nums.length;k++) if (nums[i]+nums[j]+nums[k]==0) { List<Integer> t=Arrays.asList(nums[i],nums[j],nums[k]); Collections.sort(t); set.add(t); } return new ArrayList<>(set); } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (sum == 0) {\n          ans.add(Arrays.asList(nums[i], nums[left], nums[right]));\n          left++;\n          right--;\n          while (left < right && nums[left] == nums[left - 1]) left++;\n          while (left < right && nums[right] == nums[right + 1]) right--;\n        } else if (sum < 0) left++;\n        else right--;\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "nums = [-1,0,1,2,-1,-4]",
          "output": "[[-1,-1,2],[-1,0,1]]",
          "explanation": "Unique triplets sum to zero."
        },
        {
          "input": "nums = [0,1,1]",
          "output": "[]",
          "explanation": "No triplet sums to zero."
        },
        {
          "input": "nums = [0,0,0]",
          "output": "[[0,0,0]]",
          "explanation": "One unique triplet."
        }
      ],
      "edgeCases": "Duplicates, all zeroes, no answer, negative/positive mix.",
      "bruteForceComplexity": "Time O(n^3), Space O(output) with duplicate set.",
      "optimizedComplexity": "Time O(n^2), Space O(output).",
      "recursiveComplexity": "Time O(n^2), Space O(output) plus recursion stack.",
      "constraints": "3 <= nums.length <= 3000; -10^5 <= nums[i] <= 10^5.",
      "source": {
        "label": "LeetCode 15 - 3Sum",
        "url": "https://leetcode.com/problems/3sum/"
      }
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
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int threeSumClosest(int[] nums, int target) {\n    Arrays.sort(nums);\n    int best = nums[0] + nums[1] + nums[2];\n    for (int i = 0; i < nums.length - 2; i++) {\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (Math.abs(target - sum) < Math.abs(target - best)) best = sum;\n        if (sum < target) left++;\n        else if (sum > target) right--;\n        else return target;\n      }\n    }\n    return best;\n  }\n}",
      "bruteForceCode": "class Solution { public int threeSumClosest(int[] nums, int target) { int best = nums[0] + nums[1] + nums[2]; for (int i=0;i<nums.length;i++) for (int j=i+1;j<nums.length;j++) for (int k=j+1;k<nums.length;k++) { int sum=nums[i]+nums[j]+nums[k]; if (Math.abs(target-sum)<Math.abs(target-best)) best=sum; } return best; } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int threeSumClosest(int[] nums, int target) {\n    Arrays.sort(nums);\n    int best = nums[0] + nums[1] + nums[2];\n    for (int i = 0; i < nums.length - 2; i++) {\n      int left = i + 1, right = nums.length - 1;\n      while (left < right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (Math.abs(target - sum) < Math.abs(target - best)) best = sum;\n        if (sum < target) left++;\n        else if (sum > target) right--;\n        else return target;\n      }\n    }\n    return best;\n  }\n}",
      "examples": [
        {
          "input": "nums = [-1,2,1,-4], target = 1",
          "output": "2",
          "explanation": "The closest triplet sum is -1 + 2 + 1 = 2."
        },
        {
          "input": "nums = [0,0,0], target = 1",
          "output": "0",
          "explanation": "Only possible triplet sum is 0."
        },
        {
          "input": "nums = [1,1,1,0], target = -100",
          "output": "2",
          "explanation": "Closest sum is 0 + 1 + 1 = 2."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "3 <= nums.length <= 500; -1000 <= nums[i] <= 1000; -10^4 <= target <= 10^4.",
      "source": {
        "label": "LeetCode 16 - 3Sum Closest",
        "url": "https://leetcode.com/problems/3sum-closest/"
      }
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
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> fourSum(int[] nums, int target) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    int n = nums.length;\n    for (int i = 0; i < n - 3; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      for (int j = i + 1; j < n - 2; j++) {\n        if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n        int left = j + 1, right = n - 1;\n        while (left < right) {\n          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n          if (sum == target) {\n            ans.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n            left++;\n            right--;\n            while (left < right && nums[left] == nums[left - 1]) left++;\n            while (left < right && nums[right] == nums[right + 1]) right--;\n          } else if (sum < target) left++;\n          else right--;\n        }\n      }\n    }\n    return ans;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public List<List<Integer>> fourSum(int[] nums, int target) { Set<List<Integer>> set = new HashSet<>(); for(int a=0;a<nums.length;a++) for(int b=a+1;b<nums.length;b++) for(int c=b+1;c<nums.length;c++) for(int d=c+1;d<nums.length;d++) { long sum=(long)nums[a]+nums[b]+nums[c]+nums[d]; if(sum==target){ List<Integer> q=Arrays.asList(nums[a],nums[b],nums[c],nums[d]); Collections.sort(q); set.add(q); } } return new ArrayList<>(set); } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> fourSum(int[] nums, int target) {\n    Arrays.sort(nums);\n    List<List<Integer>> ans = new ArrayList<>();\n    int n = nums.length;\n    for (int i = 0; i < n - 3; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      for (int j = i + 1; j < n - 2; j++) {\n        if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n        int left = j + 1, right = n - 1;\n        while (left < right) {\n          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n          if (sum == target) {\n            ans.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n            left++;\n            right--;\n            while (left < right && nums[left] == nums[left - 1]) left++;\n            while (left < right && nums[right] == nums[right + 1]) right--;\n          } else if (sum < target) left++;\n          else right--;\n        }\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "nums = [1,0,-1,0,-2,2], target = 0",
          "output": "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]",
          "explanation": "Unique quadruplets sum to target."
        },
        {
          "input": "nums = [2,2,2,2,2], target = 8",
          "output": "[[2,2,2,2]]",
          "explanation": "Duplicate quadruplets collapse into one."
        },
        {
          "input": "nums = [1,2,3], target = 6",
          "output": "[]",
          "explanation": "Fewer than four elements cannot form a quadruplet."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= nums.length <= 200; -10^9 <= nums[i], target <= 10^9.",
      "source": {
        "label": "LeetCode 18 - 4Sum",
        "url": "https://leetcode.com/problems/4sum/"
      }
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
      "recursiveCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 1) mid++;\n      else swap(nums, mid, high--);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public void sortColors(int[] nums) { Arrays.sort(nums); } }",
      "optimizedCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 1) mid++;\n      else swap(nums, mid, high--);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "examples": [
        {
          "input": "nums = [2,0,2,1,1,0]",
          "output": "[0,0,1,1,2,2]",
          "explanation": "Sort 0s, 1s, and 2s in-place."
        },
        {
          "input": "nums = [2,0,1]",
          "output": "[0,1,2]",
          "explanation": "All colors ordered."
        },
        {
          "input": "nums = [0]",
          "output": "[0]",
          "explanation": "Single value remains."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= nums.length <= 300; nums[i] is 0, 1, or 2.",
      "source": {
        "label": "LeetCode 75 - Sort Colors",
        "url": "https://leetcode.com/problems/sort-colors/"
      }
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
      "recursiveCode": "class Solution {\n  public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n      if (height[left] < height[right]) {\n        leftMax = Math.max(leftMax, height[left]);\n        water += leftMax - height[left++];\n      } else {\n        rightMax = Math.max(rightMax, height[right]);\n        water += rightMax - height[right--];\n      }\n    }\n    return water;\n  }\n}",
      "bruteForceCode": "class Solution { public int trap(int[] height) { int water=0; for(int i=0;i<height.length;i++){ int left=0,right=0; for(int l=0;l<=i;l++) left=Math.max(left,height[l]); for(int r=i;r<height.length;r++) right=Math.max(right,height[r]); water += Math.min(left,right)-height[i]; } return water; } }",
      "optimizedCode": "class Solution {\n  public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n      if (height[left] < height[right]) {\n        leftMax = Math.max(leftMax, height[left]);\n        water += leftMax - height[left++];\n      } else {\n        rightMax = Math.max(rightMax, height[right]);\n        water += rightMax - height[right--];\n      }\n    }\n    return water;\n  }\n}",
      "examples": [
        {
          "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          "output": "6",
          "explanation": "Water is trapped between higher boundaries."
        },
        {
          "input": "height = [4,2,0,3,2,5]",
          "output": "9",
          "explanation": "Multiple basins trap 9 units."
        },
        {
          "input": "height = [1,2,3]",
          "output": "0",
          "explanation": "Monotonic bars trap no water."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= height.length <= 2 * 10^4; 0 <= height[i] <= 10^5.",
      "source": {
        "label": "LeetCode 42 - Trapping Rain Water",
        "url": "https://leetcode.com/problems/trapping-rain-water/"
      }
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
      "recursiveCode": "class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n    return null;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public ListNode detectCycle(ListNode head) { Set<ListNode> seen = new HashSet<>(); while (head != null) { if (!seen.add(head)) return head; head = head.next; } return null; } }",
      "optimizedCode": "class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n    return null;\n  }\n}",
      "examples": [
        {
          "input": "head = [3,2,0,-4], pos = 1",
          "output": "node with value 2",
          "explanation": "Cycle starts at index 1."
        },
        {
          "input": "head = [1,2], pos = 0",
          "output": "node with value 1",
          "explanation": "Cycle starts at head."
        },
        {
          "input": "head = [1], pos = -1",
          "output": "null",
          "explanation": "No cycle exists."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "0 <= number of nodes <= 10^4; pos may be -1 for no cycle.",
      "source": {
        "label": "LeetCode 142 - Linked List Cycle II",
        "url": "https://leetcode.com/problems/linked-list-cycle-ii/"
      }
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
      "recursiveCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode slow = dummy, fast = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) {\n      slow = slow.next;\n      fast = fast.next;\n    }\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "bruteForceCode": "class Solution { public ListNode removeNthFromEnd(ListNode head, int n) { int len=0; for(ListNode c=head;c!=null;c=c.next) len++; ListNode dummy=new ListNode(0,head), cur=dummy; for(int i=0;i<len-n;i++) cur=cur.next; cur.next=cur.next.next; return dummy.next; } }",
      "optimizedCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode slow = dummy, fast = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) {\n      slow = slow.next;\n      fast = fast.next;\n    }\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "examples": [
        {
          "input": "head = [1,2,3,4,5], n = 2",
          "output": "[1,2,3,5]",
          "explanation": "Remove 4."
        },
        {
          "input": "head = [1], n = 1",
          "output": "[]",
          "explanation": "Remove the only node."
        },
        {
          "input": "head = [1,2], n = 1",
          "output": "[1]",
          "explanation": "Remove tail."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= list length <= 30; 1 <= n <= list length.",
      "source": {
        "label": "LeetCode 19 - Remove Nth Node From End of List",
        "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
      }
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
      "recursiveCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode smallDummy = new ListNode(0), largeDummy = new ListNode(0);\n    ListNode small = smallDummy, large = largeDummy;\n    while (head != null) {\n      if (head.val < x) {\n        small.next = head;\n        small = small.next;\n      } else {\n        large.next = head;\n        large = large.next;\n      }\n      head = head.next;\n    }\n    large.next = null;\n    small.next = largeDummy.next;\n    return smallDummy.next;\n  }\n}",
      "bruteForceCode": "class Solution { public ListNode partition(ListNode head, int x) { ListNode small=new ListNode(0), big=new ListNode(0), a=small, b=big; for(ListNode c=head;c!=null;c=c.next) { if(c.val<x){ a.next=new ListNode(c.val); a=a.next; } else { b.next=new ListNode(c.val); b=b.next; } } a.next=big.next; return small.next; } }",
      "optimizedCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode smallDummy = new ListNode(0), largeDummy = new ListNode(0);\n    ListNode small = smallDummy, large = largeDummy;\n    while (head != null) {\n      if (head.val < x) {\n        small.next = head;\n        small = small.next;\n      } else {\n        large.next = head;\n        large = large.next;\n      }\n      head = head.next;\n    }\n    large.next = null;\n    small.next = largeDummy.next;\n    return smallDummy.next;\n  }\n}",
      "examples": [
        {
          "input": "head = [1,4,3,2,5,2], x = 3",
          "output": "[1,2,2,4,3,5]",
          "explanation": "Nodes less than 3 come first preserving order."
        },
        {
          "input": "head = [2,1], x = 2",
          "output": "[1,2]",
          "explanation": "1 moves before 2."
        },
        {
          "input": "head = [], x = 1",
          "output": "[]",
          "explanation": "Empty list remains empty."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "0 <= list length <= 200; -100 <= Node.val <= 100; -200 <= x <= 200.",
      "source": {
        "label": "LeetCode 86 - Partition List",
        "url": "https://leetcode.com/problems/partition-list/"
      }
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
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0, right = people.length - 1, boats = 0;\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public int numRescueBoats(int[] people, int limit) { Arrays.sort(people); boolean[] used=new boolean[people.length]; int boats=0; for(int i=people.length-1;i>=0;i--){ if(used[i]) continue; used[i]=true; for(int j=0;j<i;j++) if(!used[j] && people[i]+people[j]<=limit){ used[j]=true; break; } boats++; } return boats; } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0, right = people.length - 1, boats = 0;\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "examples": [
        {
          "input": "people = [1,2], limit = 3",
          "output": "1",
          "explanation": "Both fit in one boat."
        },
        {
          "input": "people = [3,2,2,1], limit = 3",
          "output": "3",
          "explanation": "Pair 1+2, remaining 2 and 3 alone."
        },
        {
          "input": "people = [3,5,3,4], limit = 5",
          "output": "4",
          "explanation": "No useful pair with 5 or 4."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= people.length <= 5 * 10^4; 1 <= people[i] <= limit <= 3 * 10^4.",
      "source": {
        "label": "LeetCode 881 - Boats to Save People",
        "url": "https://leetcode.com/problems/boats-to-save-people/"
      }
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
      "recursiveCode": "class Solution {\n  public boolean validPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      if (s.charAt(left) == s.charAt(right)) {\n        left++;\n        right--;\n      } else {\n        return isPal(s, left + 1, right) || isPal(s, left, right - 1);\n      }\n    }\n    return true;\n  }\n\n  private boolean isPal(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "bruteForceCode": "class Solution { public boolean validPalindrome(String s) { for(int skip=-1; skip<s.length(); skip++) if(isPal(s, skip)) return true; return false; } private boolean isPal(String s,int skip){ int l=0,r=s.length()-1; while(l<r){ if(l==skip) l++; else if(r==skip) r--; else if(s.charAt(l++)!=s.charAt(r--)) return false; } return true; } }",
      "optimizedCode": "class Solution {\n  public boolean validPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n      if (s.charAt(left) == s.charAt(right)) {\n        left++;\n        right--;\n      } else {\n        return isPal(s, left + 1, right) || isPal(s, left, right - 1);\n      }\n    }\n    return true;\n  }\n\n  private boolean isPal(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "examples": [
        {
          "input": "s = \"aba\"",
          "output": "true",
          "explanation": "Already a palindrome."
        },
        {
          "input": "s = \"abca\"",
          "output": "true",
          "explanation": "Delete c or b."
        },
        {
          "input": "s = \"abc\"",
          "output": "false",
          "explanation": "One deletion cannot fix it."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= s.length <= 10^5; s consists of lowercase English letters.",
      "source": {
        "label": "LeetCode 680 - Valid Palindrome II",
        "url": "https://leetcode.com/problems/valid-palindrome-ii/"
      }
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
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersect(int[] nums1, int[] nums2) {\n    Arrays.sort(nums1);\n    Arrays.sort(nums2);\n    int i = 0, j = 0, write = 0;\n    int[] temp = new int[Math.min(nums1.length, nums2.length)];\n    while (i < nums1.length && j < nums2.length) {\n      if (nums1[i] == nums2[j]) temp[write++] = nums1[i++];\n      else if (nums1[i] < nums2[j]) i++;\n      else j++;\n    }\n    return Arrays.copyOf(temp, write);\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public int[] intersect(int[] nums1, int[] nums2) { List<Integer> ans=new ArrayList<>(); boolean[] used=new boolean[nums2.length]; for(int a:nums1) for(int j=0;j<nums2.length;j++) if(!used[j]&&a==nums2[j]){ used[j]=true; ans.add(a); break; } int[] out=new int[ans.size()]; for(int i=0;i<ans.size();i++) out[i]=ans.get(i); return out; } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersect(int[] nums1, int[] nums2) {\n    Arrays.sort(nums1);\n    Arrays.sort(nums2);\n    int i = 0, j = 0, write = 0;\n    int[] temp = new int[Math.min(nums1.length, nums2.length)];\n    while (i < nums1.length && j < nums2.length) {\n      if (nums1[i] == nums2[j]) temp[write++] = nums1[i++];\n      else if (nums1[i] < nums2[j]) i++;\n      else j++;\n    }\n    return Arrays.copyOf(temp, write);\n  }\n}",
      "examples": [
        {
          "input": "nums1 = [1,2,2,1], nums2 = [2,2]",
          "output": "[2,2]",
          "explanation": "Include duplicate count."
        },
        {
          "input": "nums1 = [4,9,5], nums2 = [9,4,9,8,4]",
          "output": "[4,9]",
          "explanation": "Order does not matter."
        },
        {
          "input": "nums1 = [1], nums2 = [2]",
          "output": "[]",
          "explanation": "No intersection."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= nums1.length, nums2.length <= 1000; 0 <= nums[i] <= 1000.",
      "source": {
        "label": "LeetCode 350 - Intersection of Two Arrays II",
        "url": "https://leetcode.com/problems/intersection-of-two-arrays-ii/"
      }
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
      "recursiveCode": "class Solution {\n  public boolean backspaceCompare(String s, String t) {\n    return build(s).equals(build(t));\n  }\n\n  private String build(String value) {\n    char[] chars = value.toCharArray();\n    int write = 0;\n    for (char c : chars) {\n      if (c == '#') {\n        if (write > 0) write--;\n      } else {\n        chars[write++] = c;\n      }\n    }\n    return new String(chars, 0, write);\n  }\n}",
      "bruteForceCode": "class Solution { public boolean backspaceCompare(String s, String t) { return build(s).equals(build(t)); } private String build(String s){ StringBuilder b=new StringBuilder(); for(char c:s.toCharArray()) if(c=='#'){ if(b.length()>0)b.deleteCharAt(b.length()-1); } else b.append(c); return b.toString(); } }",
      "optimizedCode": "class Solution {\n  public boolean backspaceCompare(String s, String t) {\n    return build(s).equals(build(t));\n  }\n\n  private String build(String value) {\n    char[] chars = value.toCharArray();\n    int write = 0;\n    for (char c : chars) {\n      if (c == '#') {\n        if (write > 0) write--;\n      } else {\n        chars[write++] = c;\n      }\n    }\n    return new String(chars, 0, write);\n  }\n}",
      "examples": [
        {
          "input": "s = \"ab#c\", t = \"ad#c\"",
          "output": "true",
          "explanation": "Both become ac."
        },
        {
          "input": "s = \"ab##\", t = \"c#d#\"",
          "output": "true",
          "explanation": "Both become empty."
        },
        {
          "input": "s = \"a#c\", t = \"b\"",
          "output": "false",
          "explanation": "c != b."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= s.length, t.length <= 200; strings contain lowercase letters and #.",
      "source": {
        "label": "LeetCode 844 - Backspace String Compare",
        "url": "https://leetcode.com/problems/backspace-string-compare/"
      }
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
      "recursiveCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "bruteForceCode": "class Solution { public int minSubArrayLen(int target, int[] nums) { int best=Integer.MAX_VALUE; for(int i=0;i<nums.length;i++){ int sum=0; for(int j=i;j<nums.length;j++){ sum+=nums[j]; if(sum>=target){ best=Math.min(best,j-i+1); break; } } } return best==Integer.MAX_VALUE?0:best; } }",
      "optimizedCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "examples": [
        {
          "input": "target = 7, nums = [2,3,1,2,4,3]",
          "output": "2",
          "explanation": "[4,3] is shortest."
        },
        {
          "input": "target = 4, nums = [1,4,4]",
          "output": "1",
          "explanation": "[4] works."
        },
        {
          "input": "target = 11, nums = [1,1,1,1,1,1,1,1]",
          "output": "0",
          "explanation": "No valid subarray."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= target <= 10^9; 1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^4.",
      "source": {
        "label": "LeetCode 209 - Minimum Size Subarray Sum",
        "url": "https://leetcode.com/problems/minimum-size-subarray-sum/"
      }
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
      "recursiveCode": "class Solution {\n  public int[] pairWithTargetSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n      int sum = nums[left] + nums[right];\n      if (sum == target) return new int[] {left, right};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "bruteForceCode": "class Solution { public int[] pairWithTargetSum(int[] nums, int target) { for(int i=0;i<nums.length;i++) for(int j=i+1;j<nums.length;j++) if(nums[i]+nums[j]==target) return new int[]{i,j}; return new int[]{-1,-1}; } }",
      "optimizedCode": "class Solution {\n  public int[] pairWithTargetSum(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n      int sum = nums[left] + nums[right];\n      if (sum == target) return new int[] {left, right};\n      if (sum < target) left++;\n      else right--;\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "examples": [
        {
          "input": "nums = [1,2,3,4,6], target = 6",
          "output": "[1,3]",
          "explanation": "2 + 4 = 6."
        },
        {
          "input": "nums = [2,5,9,11], target = 11",
          "output": "[0,2]",
          "explanation": "2 + 9 = 11."
        },
        {
          "input": "nums = [1,3,5], target = 100",
          "output": "[-1,-1]",
          "explanation": "No pair exists."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "Sorted input array; return zero-based indexes for the educational variant.",
      "source": {
        "label": "Pattern Drill - Pair With Target Sum",
        "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
      }
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
      "recursiveCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    int write = 0;\n    for (int num : nums) {\n      if (write < 2 || num != nums[write - 2]) nums[write++] = num;\n    }\n    return write;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public int removeDuplicates(int[] nums) { List<Integer> out=new ArrayList<>(); int i=0; while(i<nums.length){ int val=nums[i], count=0; while(i<nums.length && nums[i]==val){ if(count<2) out.add(val); count++; i++; } } for(i=0;i<out.size();i++) nums[i]=out.get(i); return out.size(); } }",
      "optimizedCode": "class Solution {\n  public int removeDuplicates(int[] nums) {\n    int write = 0;\n    for (int num : nums) {\n      if (write < 2 || num != nums[write - 2]) nums[write++] = num;\n    }\n    return write;\n  }\n}",
      "examples": [
        {
          "input": "nums = [1,1,1,2,2,3]",
          "output": "5, nums = [1,1,2,2,3,_]",
          "explanation": "Each value appears at most twice."
        },
        {
          "input": "nums = [0,0,1,1,1,1,2,3,3]",
          "output": "7",
          "explanation": "Keep two 1s and two 3s."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "Single value remains."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= nums.length <= 3 * 10^4; nums is sorted nondecreasing.",
      "source": {
        "label": "LeetCode 80 - Remove Duplicates from Sorted Array II",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/"
      }
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
      "recursiveCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0, count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) product /= nums[left++];\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "bruteForceCode": "class Solution { public int numSubarrayProductLessThanK(int[] nums, int k) { int count=0; for(int i=0;i<nums.length;i++){ long product=1; for(int j=i;j<nums.length;j++){ product*=nums[j]; if(product<k) count++; else break; } } return count; } }",
      "optimizedCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0, count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) product /= nums[left++];\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "examples": [
        {
          "input": "nums = [10,5,2,6], k = 100",
          "output": "8",
          "explanation": "Eight subarrays have product less than 100."
        },
        {
          "input": "nums = [1,2,3], k = 0",
          "output": "0",
          "explanation": "No positive product is less than 0."
        },
        {
          "input": "nums = [1,1,1], k = 2",
          "output": "6",
          "explanation": "Every subarray product is 1."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= nums.length <= 3 * 10^4; 1 <= nums[i] <= 1000; 0 <= k <= 10^6.",
      "source": {
        "label": "LeetCode 713 - Subarray Product Less Than K",
        "url": "https://leetcode.com/problems/subarray-product-less-than-k/"
      }
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
      "recursiveCode": "class Solution {\n  public int findDuplicate(int[] nums) {\n    int slow = nums[0], fast = nums[0];\n    do {\n      slow = nums[slow];\n      fast = nums[nums[fast]];\n    } while (slow != fast);\n    slow = nums[0];\n    while (slow != fast) {\n      slow = nums[slow];\n      fast = nums[fast];\n    }\n    return slow;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public int findDuplicate(int[] nums) { Set<Integer> seen=new HashSet<>(); for(int n:nums) if(!seen.add(n)) return n; return -1; } }",
      "optimizedCode": "class Solution {\n  public int findDuplicate(int[] nums) {\n    int slow = nums[0], fast = nums[0];\n    do {\n      slow = nums[slow];\n      fast = nums[nums[fast]];\n    } while (slow != fast);\n    slow = nums[0];\n    while (slow != fast) {\n      slow = nums[slow];\n      fast = nums[fast];\n    }\n    return slow;\n  }\n}",
      "examples": [
        {
          "input": "nums = [1,3,4,2,2]",
          "output": "2",
          "explanation": "2 is duplicated."
        },
        {
          "input": "nums = [3,1,3,4,2]",
          "output": "3",
          "explanation": "3 is duplicated."
        },
        {
          "input": "nums = [3,3,3,3,3]",
          "output": "3",
          "explanation": "The duplicate is 3."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= n <= 10^5; nums.length == n + 1; nums[i] in [1,n]; exactly one repeated number.",
      "source": {
        "label": "LeetCode 287 - Find the Duplicate Number",
        "url": "https://leetcode.com/problems/find-the-duplicate-number/"
      }
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
      "recursiveCode": "class Solution {\n  public int[] rearrangeArray(int[] nums) {\n    int[] ans = new int[nums.length];\n    int positive = 0, negative = 1;\n    for (int num : nums) {\n      if (num > 0) {\n        ans[positive] = num;\n        positive += 2;\n      } else {\n        ans[negative] = num;\n        negative += 2;\n      }\n    }\n    return ans;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public int[] rearrangeArray(int[] nums) { List<Integer> pos=new ArrayList<>(), neg=new ArrayList<>(); for(int n:nums) if(n>0) pos.add(n); else neg.add(n); int[] ans=new int[nums.length]; for(int i=0;i<pos.size();i++){ ans[2*i]=pos.get(i); ans[2*i+1]=neg.get(i); } return ans; } }",
      "optimizedCode": "class Solution {\n  public int[] rearrangeArray(int[] nums) {\n    int[] ans = new int[nums.length];\n    int positive = 0, negative = 1;\n    for (int num : nums) {\n      if (num > 0) {\n        ans[positive] = num;\n        positive += 2;\n      } else {\n        ans[negative] = num;\n        negative += 2;\n      }\n    }\n    return ans;\n  }\n}",
      "examples": [
        {
          "input": "nums = [3,1,-2,-5,2,-4]",
          "output": "[3,-2,1,-5,2,-4]",
          "explanation": "Positive and negative alternate."
        },
        {
          "input": "nums = [-1,1]",
          "output": "[1,-1]",
          "explanation": "Starts positive."
        },
        {
          "input": "nums = [1,-1,2,-2]",
          "output": "[1,-1,2,-2]",
          "explanation": "Already valid."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "2 <= nums.length <= 2 * 10^5; equal positives and negatives; nums[i] != 0.",
      "source": {
        "label": "LeetCode 2149 - Rearrange Array Elements by Sign",
        "url": "https://leetcode.com/problems/rearrange-array-elements-by-sign/"
      }
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
      "recursiveCode": "class Solution {\n  public void nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n      int j = nums.length - 1;\n      while (nums[j] <= nums[i]) j--;\n      swap(nums, i, j);\n    }\n    reverse(nums, i + 1, nums.length - 1);\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "bruteForceCode": "import java.util.*; class Solution { public void nextPermutation(int[] nums) { List<int[]> perms=new ArrayList<>(); generate(nums.clone(),0,perms); perms.sort((a,b)->{ for(int i=0;i<a.length;i++) if(a[i]!=b[i]) return a[i]-b[i]; return 0; }); for(int i=0;i<perms.size();i++) if(Arrays.equals(perms.get(i),nums)){ int[] next=perms.get((i+1)%perms.size()); for(int j=0;j<nums.length;j++) nums[j]=next[j]; return; } } private void generate(int[] a,int idx,List<int[]> out){ if(idx==a.length){ out.add(a.clone()); return; } for(int i=idx;i<a.length;i++){ swap(a,idx,i); generate(a,idx+1,out); swap(a,idx,i); } } private void swap(int[] a,int i,int j){ int t=a[i]; a[i]=a[j]; a[j]=t; } }",
      "optimizedCode": "class Solution {\n  public void nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n      int j = nums.length - 1;\n      while (nums[j] <= nums[i]) j--;\n      swap(nums, i, j);\n    }\n    reverse(nums, i + 1, nums.length - 1);\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[1,3,2]",
          "explanation": "Next lexicographic permutation."
        },
        {
          "input": "nums = [3,2,1]",
          "output": "[1,2,3]",
          "explanation": "Last permutation wraps to first."
        },
        {
          "input": "nums = [1,1,5]",
          "output": "[1,5,1]",
          "explanation": "Handles duplicates."
        }
      ],
      "edgeCases": "Empty or smallest valid input, duplicate-heavy input, boundary values, and maximum constraint size.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time depends on the optimized pattern approach, usually O(n) or O(n log n); Space depends on maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes recursion call stack.",
      "constraints": "1 <= nums.length <= 100; 0 <= nums[i] <= 100.",
      "source": {
        "label": "LeetCode 31 - Next Permutation",
        "url": "https://leetcode.com/problems/next-permutation/"
      }
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
