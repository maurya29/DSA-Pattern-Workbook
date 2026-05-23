const CURRENT_PATTERN = {
  "id": "sliding-window",
  "name": "Sliding Window",
  "summary": "Fixed and variable windows over contiguous ranges.",
  "complete": true,
  "subpatterns": [
    "Fixed-size window",
    "Variable-size shrink while valid",
    "At most K distinct/violations",
    "Exactly K via atMost difference",
    "Frequency matching window",
    "Minimum satisfying window",
    "Monotonic deque window",
    "Circular window",
    "Complement window",
    "Bitmask conflict window"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Maximum Average Subarray I",
      "difficulty": "Easy",
      "subpattern": "Fixed-size sum window",
      "question": "Given an integer array nums and an integer k, return the maximum average value among all contiguous subarrays of length k.",
      "trigger": "The window length is fixed at k, so only one element enters and one element leaves when the window slides.",
      "intuition": "Compute the first k-sum once, then update the sum in O(1) per shift instead of recomputing the whole window.",
      "edgeCases": "k equals nums.length, k equals 1, all negative values, decimal result, and maximum sum should start from the first window.",
      "constraints": "1 <= k <= nums.length <= 10^5; -10^4 <= nums[i] <= 10^4.",
      "source": {
        "label": "LeetCode 643 - Maximum Average Subarray I",
        "url": "https://leetcode.com/problems/maximum-average-subarray-i/"
      },
      "examples": [
        {
          "input": "nums = [1,12,-5,-6,50,3], k = 4",
          "output": "12.75000",
          "explanation": "The best length-4 window is [12,-5,-6,50] with sum 51."
        },
        {
          "input": "nums = [5], k = 1",
          "output": "5.00000",
          "explanation": "The only element is the only window."
        },
        {
          "input": "nums = [-1,-2,-3], k = 2",
          "output": "-1.50000",
          "explanation": "The maximum sum window is [-1,-2]."
        }
      ],
      "bruteForceComplexity": "Time O(n*k), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    int bestSum = Integer.MIN_VALUE;\n\n    for (int start = 0; start + k <= nums.length; start++) {\n      int sum = 0;\n      for (int i = start; i < start + k; i++) {\n        sum += nums[i];\n      }\n      bestSum = Math.max(bestSum, sum);\n    }\n\n    return (double) bestSum / k;\n  }\n}",
      "iterativeCode": "class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    int windowSum = 0;\n    for (int i = 0; i < k; i++) {\n      windowSum += nums[i];\n    }\n\n    int bestSum = windowSum;\n    for (int right = k; right < nums.length; right++) {\n      windowSum += nums[right] - nums[right - k];\n      bestSum = Math.max(bestSum, windowSum);\n    }\n\n    return (double) bestSum / k;\n  }\n}",
      "optimizedCode": "class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    int windowSum = 0;\n    for (int i = 0; i < k; i++) {\n      windowSum += nums[i];\n    }\n\n    int bestSum = windowSum;\n    for (int right = k; right < nums.length; right++) {\n      windowSum += nums[right] - nums[right - k];\n      bestSum = Math.max(bestSum, windowSum);\n    }\n\n    return (double) bestSum / k;\n  }\n}",
      "recursiveCode": "class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    int firstSum = firstWindowSum(nums, 0, k);\n    int bestSum = slide(nums, k, k, firstSum, firstSum);\n    return (double) bestSum / k;\n  }\n\n  private int firstWindowSum(int[] nums, int index, int k) {\n    if (index == k) {\n      return 0;\n    }\n    return nums[index] + firstWindowSum(nums, index + 1, k);\n  }\n\n  private int slide(int[] nums, int right, int k, int windowSum, int bestSum) {\n    if (right == nums.length) {\n      return bestSum;\n    }\n\n    int nextSum = windowSum + nums[right] - nums[right - k];\n    return slide(nums, right + 1, k, nextSum, Math.max(bestSum, nextSum));\n  }\n}",
      "code": "class Solution {\n  public double findMaxAverage(int[] nums, int k) {\n    int windowSum = 0;\n    for (int i = 0; i < k; i++) {\n      windowSum += nums[i];\n    }\n\n    int bestSum = windowSum;\n    for (int right = k; right < nums.length; right++) {\n      windowSum += nums[right] - nums[right - k];\n      bestSum = Math.max(bestSum, windowSum);\n    }\n\n    return (double) bestSum / k;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Contains Duplicate II",
      "difficulty": "Easy",
      "subpattern": "Fixed-distance membership window",
      "question": "Given nums and k, return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i - j) <= k.",
      "trigger": "Only the last k elements can pair with the current index, so membership outside that distance should be removed.",
      "intuition": "Maintain a set of values inside the current distance window. Seeing the same value again means a valid nearby duplicate exists.",
      "edgeCases": "k equals 0, duplicate exactly distance k apart, duplicates outside k, negative values, and all unique values.",
      "constraints": "1 <= nums.length <= 10^5; -10^9 <= nums[i] <= 10^9; 0 <= k <= 10^5.",
      "source": {
        "label": "LeetCode 219 - Contains Duplicate II",
        "url": "https://leetcode.com/problems/contains-duplicate-ii/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,1], k = 3",
          "output": "true",
          "explanation": "The two 1 values are distance 3 apart."
        },
        {
          "input": "nums = [1,0,1,1], k = 1",
          "output": "true",
          "explanation": "The last two 1 values are distance 1 apart."
        },
        {
          "input": "nums = [1,2,3,1,2,3], k = 2",
          "output": "false",
          "explanation": "Every duplicate pair is farther than 2."
        }
      ],
      "bruteForceComplexity": "Time O(n*k), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(min(n, k)).",
      "recursiveComplexity": "Time O(n), Space O(min(n, k)) plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public boolean containsNearbyDuplicate(int[] nums, int k) {\n    for (int i = 0; i < nums.length; i++) {\n      int end = Math.min(nums.length - 1, i + k);\n      for (int j = i + 1; j <= end; j++) {\n        if (nums[i] == nums[j]) {\n          return true;\n        }\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean containsNearbyDuplicate(int[] nums, int k) {\n    Set<Integer> window = new HashSet<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      if (i > k) {\n        window.remove(nums[i - k - 1]);\n      }\n      if (!window.add(nums[i])) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean containsNearbyDuplicate(int[] nums, int k) {\n    Set<Integer> window = new HashSet<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      if (i > k) {\n        window.remove(nums[i - k - 1]);\n      }\n      if (!window.add(nums[i])) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean containsNearbyDuplicate(int[] nums, int k) {\n    return scan(nums, k, 0, new HashSet<>());\n  }\n\n  private boolean scan(int[] nums, int k, int index, Set<Integer> window) {\n    if (index == nums.length) {\n      return false;\n    }\n\n    if (index > k) {\n      window.remove(nums[index - k - 1]);\n    }\n    if (!window.add(nums[index])) {\n      return true;\n    }\n    return scan(nums, k, index + 1, window);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean containsNearbyDuplicate(int[] nums, int k) {\n    Set<Integer> window = new HashSet<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      if (i > k) {\n        window.remove(nums[i - k - 1]);\n      }\n      if (!window.add(nums[i])) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "subpattern": "Variable window with last seen index",
      "question": "Given a string s, return the length of the longest substring without repeating characters.",
      "trigger": "A duplicate character makes the current window invalid and forces the left boundary past its previous occurrence.",
      "intuition": "Store each character's last index. When a duplicate appears inside the current window, move left to one position after the old index.",
      "edgeCases": "Empty string, all same characters, all unique characters, spaces/symbols, and a repeated character before the current window.",
      "constraints": "0 <= s.length <= 5 * 10^4; s may contain English letters, digits, symbols, and spaces.",
      "source": {
        "label": "LeetCode 3 - Longest Substring Without Repeating Characters",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      },
      "examples": [
        {
          "input": "s = \"abcabcbb\"",
          "output": "3",
          "explanation": "The longest substring without repeats is \"abc\"."
        },
        {
          "input": "s = \"bbbbb\"",
          "output": "1",
          "explanation": "The longest substring is \"b\"."
        },
        {
          "input": "s = \"pwwkew\"",
          "output": "3",
          "explanation": "The answer is \"wke\"; subsequences do not count."
        }
      ],
      "bruteForceComplexity": "Time O(n^3), Space O(min(n, charset)).",
      "optimizedComplexity": "Time O(n), Space O(min(n, charset)).",
      "recursiveComplexity": "Time O(n), Space O(min(n, charset)) plus O(n) call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    int best = 0;\n\n    for (int start = 0; start < s.length(); start++) {\n      for (int end = start; end < s.length(); end++) {\n        if (hasUniqueCharacters(s, start, end)) {\n          best = Math.max(best, end - start + 1);\n        }\n      }\n    }\n\n    return best;\n  }\n\n  private boolean hasUniqueCharacters(String s, int start, int end) {\n    Set<Character> seen = new HashSet<>();\n    for (int i = start; i <= end; i++) {\n      if (!seen.add(s.charAt(i))) {\n        return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> lastSeen = new HashMap<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < s.length(); right++) {\n      char current = s.charAt(right);\n      if (lastSeen.containsKey(current)) {\n        left = Math.max(left, lastSeen.get(current) + 1);\n      }\n      lastSeen.put(current, right);\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> lastSeen = new HashMap<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < s.length(); right++) {\n      char current = s.charAt(right);\n      if (lastSeen.containsKey(current)) {\n        left = Math.max(left, lastSeen.get(current) + 1);\n      }\n      lastSeen.put(current, right);\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    return scan(s, 0, 0, 0, new HashMap<>());\n  }\n\n  private int scan(String s, int right, int left, int best, Map<Character, Integer> lastSeen) {\n    if (right == s.length()) {\n      return best;\n    }\n\n    char current = s.charAt(right);\n    if (lastSeen.containsKey(current)) {\n      left = Math.max(left, lastSeen.get(current) + 1);\n    }\n    lastSeen.put(current, right);\n\n    int nextBest = Math.max(best, right - left + 1);\n    return scan(s, right + 1, left, nextBest, lastSeen);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> lastSeen = new HashMap<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < s.length(); right++) {\n      char current = s.charAt(right);\n      if (lastSeen.containsKey(current)) {\n        left = Math.max(left, lastSeen.get(current) + 1);\n      }\n      lastSeen.put(current, right);\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Size Subarray Sum",
      "difficulty": "Medium",
      "subpattern": "Variable window shrink while valid",
      "question": "Given an array of positive integers nums and a positive integer target, return the minimum length of a contiguous subarray whose sum is at least target. Return 0 if no such subarray exists.",
      "trigger": "All numbers are positive, so expanding right increases the sum and moving left decreases it predictably.",
      "intuition": "Expand the right boundary until the sum is valid, then shrink the left boundary while preserving validity to minimize length.",
      "edgeCases": "No valid subarray, one element reaches target, whole array needed, target larger than total sum, and all values positive.",
      "constraints": "1 <= target <= 10^9; 1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^4.",
      "source": {
        "label": "LeetCode 209 - Minimum Size Subarray Sum",
        "url": "https://leetcode.com/problems/minimum-size-subarray-sum/"
      },
      "examples": [
        {
          "input": "target = 7, nums = [2,3,1,2,4,3]",
          "output": "2",
          "explanation": "The shortest valid subarray is [4,3]."
        },
        {
          "input": "target = 4, nums = [1,4,4]",
          "output": "1",
          "explanation": "A single 4 is enough."
        },
        {
          "input": "target = 11, nums = [1,1,1,1,1,1,1,1]",
          "output": "0",
          "explanation": "No subarray reaches 11."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int best = Integer.MAX_VALUE;\n\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum >= target) {\n          best = Math.min(best, end - start + 1);\n          break;\n        }\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0;\n    int sum = 0;\n    int best = Integer.MAX_VALUE;\n\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0;\n    int sum = 0;\n    int best = Integer.MAX_VALUE;\n\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int answer = scan(nums, target, 0, 0, 0, Integer.MAX_VALUE);\n    return answer == Integer.MAX_VALUE ? 0 : answer;\n  }\n\n  private int scan(int[] nums, int target, int right, int left, int sum, int best) {\n    if (right == nums.length) {\n      return shrink(nums, target, right, left, sum, best);\n    }\n\n    return shrink(nums, target, right + 1, left, sum + nums[right], best);\n  }\n\n  private int shrink(int[] nums, int target, int right, int left, int sum, int best) {\n    if (sum < target) {\n      return scan(nums, target, right, left, sum, best);\n    }\n\n    int nextBest = Math.min(best, right - left);\n    return shrink(nums, target, right, left + 1, sum - nums[left], nextBest);\n  }\n}",
      "code": "class Solution {\n  public int minSubArrayLen(int target, int[] nums) {\n    int left = 0;\n    int sum = 0;\n    int best = Integer.MAX_VALUE;\n\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum >= target) {\n        best = Math.min(best, right - left + 1);\n        sum -= nums[left++];\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Permutation in String",
      "difficulty": "Medium",
      "subpattern": "Fixed frequency window",
      "question": "Given strings s1 and s2, return true if s2 contains a permutation of s1 as a contiguous substring.",
      "trigger": "A permutation of s1 must have exactly s1.length characters and the same frequency counts.",
      "intuition": "Build the required frequency for s1, then slide a fixed-size window over s2 and compare counts.",
      "edgeCases": "s1 longer than s2, repeated characters in s1, exact match at start/end, no match, and lowercase-only input.",
      "constraints": "1 <= s1.length, s2.length <= 10^4; s1 and s2 consist of lowercase English letters.",
      "source": {
        "label": "LeetCode 567 - Permutation in String",
        "url": "https://leetcode.com/problems/permutation-in-string/"
      },
      "examples": [
        {
          "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
          "output": "true",
          "explanation": "The substring \"ba\" is a permutation of \"ab\"."
        },
        {
          "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
          "output": "false",
          "explanation": "No substring has both a and b together."
        },
        {
          "input": "s1 = \"adc\", s2 = \"dcda\"",
          "output": "true",
          "explanation": "The substring \"dca\" is a permutation of \"adc\"."
        }
      ],
      "bruteForceComplexity": "Time O((n-m+1)*m + 26*(n-m+1)), Space O(1), where m = s1.length and n = s2.length.",
      "optimizedComplexity": "Time O(n), Space O(1), using fixed 26-character count arrays.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) count arrays.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    int length = s1.length();\n    for (int start = 0; start + length <= s2.length(); start++) {\n      if (sameCounts(s1, s2, start)) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean sameCounts(String s1, String s2, int start) {\n    int[] count = new int[26];\n    for (char c : s1.toCharArray()) {\n      count[c - 'a']++;\n    }\n    for (int i = 0; i < s1.length(); i++) {\n      count[s2.charAt(start + i) - 'a']--;\n    }\n    return allZero(count);\n  }\n\n  private boolean allZero(int[] count) {\n    for (int value : count) {\n      if (value != 0) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) {\n      return false;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : s1.toCharArray()) {\n      need[c - 'a']++;\n    }\n\n    for (int right = 0; right < s2.length(); right++) {\n      window[s2.charAt(right) - 'a']++;\n      if (right >= s1.length()) {\n        window[s2.charAt(right - s1.length()) - 'a']--;\n      }\n      if (Arrays.equals(need, window)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) {\n      return false;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : s1.toCharArray()) {\n      need[c - 'a']++;\n    }\n\n    for (int right = 0; right < s2.length(); right++) {\n      window[s2.charAt(right) - 'a']++;\n      if (right >= s1.length()) {\n        window[s2.charAt(right - s1.length()) - 'a']--;\n      }\n      if (Arrays.equals(need, window)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) {\n      return false;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    fillNeed(s1, 0, need);\n    return scan(s1.length(), s2, 0, need, window);\n  }\n\n  private void fillNeed(String s, int index, int[] need) {\n    if (index == s.length()) return;\n    need[s.charAt(index) - 'a']++;\n    fillNeed(s, index + 1, need);\n  }\n\n  private boolean scan(int length, String s2, int right, int[] need, int[] window) {\n    if (right == s2.length()) return false;\n\n    window[s2.charAt(right) - 'a']++;\n    if (right >= length) {\n      window[s2.charAt(right - length) - 'a']--;\n    }\n    if (Arrays.equals(need, window)) return true;\n    return scan(length, s2, right + 1, need, window);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) {\n      return false;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : s1.toCharArray()) {\n      need[c - 'a']++;\n    }\n\n    for (int right = 0; right < s2.length(); right++) {\n      window[s2.charAt(right) - 'a']++;\n      if (right >= s1.length()) {\n        window[s2.charAt(right - s1.length()) - 'a']--;\n      }\n      if (Arrays.equals(need, window)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find All Anagrams in a String",
      "difficulty": "Medium",
      "subpattern": "Fixed frequency window",
      "question": "Given strings s and p, return all start indices of substrings in s that are anagrams of p. Return the answer in any order.",
      "trigger": "Every anagram window has fixed length p.length and the same character frequency as p.",
      "intuition": "Maintain a fixed-size frequency window over s and compare it with p's frequency counts.",
      "edgeCases": "p longer than s, overlapping anagrams, repeated letters in p, no anagrams, and lowercase-only input.",
      "constraints": "1 <= s.length, p.length <= 3 * 10^4; s and p consist of lowercase English letters.",
      "source": {
        "label": "LeetCode 438 - Find All Anagrams in a String",
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
      },
      "examples": [
        {
          "input": "s = \"cbaebabacd\", p = \"abc\"",
          "output": "[0,6]",
          "explanation": "The substrings \"cba\" and \"bac\" are anagrams of \"abc\"."
        },
        {
          "input": "s = \"abab\", p = \"ab\"",
          "output": "[0,1,2]",
          "explanation": "The substrings \"ab\", \"ba\", and \"ab\" all qualify."
        },
        {
          "input": "s = \"baa\", p = \"aa\"",
          "output": "[1]",
          "explanation": "The substring \"aa\" starts at index 1."
        }
      ],
      "bruteForceComplexity": "Time O((n-m+1)*m + 26*(n-m+1)), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1), using fixed 26-character count arrays.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) count arrays.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    for (int start = 0; start + p.length() <= s.length(); start++) {\n      if (isAnagramAt(s, p, start)) {\n        answer.add(start);\n      }\n    }\n    return answer;\n  }\n\n  private boolean isAnagramAt(String s, String p, int start) {\n    int[] count = new int[26];\n    for (char c : p.toCharArray()) {\n      count[c - 'a']++;\n    }\n    for (int i = 0; i < p.length(); i++) {\n      count[s.charAt(start + i) - 'a']--;\n    }\n    for (int value : count) {\n      if (value != 0) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) {\n      return answer;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : p.toCharArray()) {\n      need[c - 'a']++;\n    }\n\n    for (int right = 0; right < s.length(); right++) {\n      window[s.charAt(right) - 'a']++;\n      if (right >= p.length()) {\n        window[s.charAt(right - p.length()) - 'a']--;\n      }\n      if (Arrays.equals(need, window)) {\n        answer.add(right - p.length() + 1);\n      }\n    }\n\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) {\n      return answer;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : p.toCharArray()) {\n      need[c - 'a']++;\n    }\n\n    for (int right = 0; right < s.length(); right++) {\n      window[s.charAt(right) - 'a']++;\n      if (right >= p.length()) {\n        window[s.charAt(right - p.length()) - 'a']--;\n      }\n      if (Arrays.equals(need, window)) {\n        answer.add(right - p.length() + 1);\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) {\n      return answer;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    fillNeed(p, 0, need);\n    scan(s, p.length(), 0, need, window, answer);\n    return answer;\n  }\n\n  private void fillNeed(String p, int index, int[] need) {\n    if (index == p.length()) return;\n    need[p.charAt(index) - 'a']++;\n    fillNeed(p, index + 1, need);\n  }\n\n  private void scan(String s, int length, int right, int[] need, int[] window, List<Integer> answer) {\n    if (right == s.length()) return;\n\n    window[s.charAt(right) - 'a']++;\n    if (right >= length) {\n      window[s.charAt(right - length) - 'a']--;\n    }\n    if (Arrays.equals(need, window)) {\n      answer.add(right - length + 1);\n    }\n    scan(s, length, right + 1, need, window, answer);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) {\n      return answer;\n    }\n\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : p.toCharArray()) {\n      need[c - 'a']++;\n    }\n\n    for (int right = 0; right < s.length(); right++) {\n      window[s.charAt(right) - 'a']++;\n      if (right >= p.length()) {\n        window[s.charAt(right - p.length()) - 'a']--;\n      }\n      if (Arrays.equals(need, window)) {\n        answer.add(right - p.length() + 1);\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Fruit Into Baskets",
      "difficulty": "Medium",
      "subpattern": "At most two distinct window",
      "question": "Given an integer array fruits where fruits[i] is the type of fruit at tree i, return the length of the longest contiguous subarray containing at most two distinct fruit types.",
      "trigger": "The basket limit means the current window is valid only while it contains at most two distinct values.",
      "intuition": "Expand right by adding fruit counts. If the window has more than two types, shrink left until only two types remain.",
      "edgeCases": "One fruit type, exactly two fruit types, more than two types, longest window at the end, and repeated blocks.",
      "constraints": "1 <= fruits.length <= 10^5; 0 <= fruits[i] < fruits.length.",
      "source": {
        "label": "LeetCode 904 - Fruit Into Baskets",
        "url": "https://leetcode.com/problems/fruit-into-baskets/"
      },
      "examples": [
        {
          "input": "fruits = [1,2,1]",
          "output": "3",
          "explanation": "The entire array has only two fruit types."
        },
        {
          "input": "fruits = [0,1,2,2]",
          "output": "3",
          "explanation": "The best window is [1,2,2]."
        },
        {
          "input": "fruits = [1,2,3,2,2]",
          "output": "4",
          "explanation": "The best window is [2,3,2,2]."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) because at most three fruit types need to be tracked before breaking.",
      "optimizedComplexity": "Time O(n), Space O(1) because the map stores at most three types temporarily.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) window map.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int totalFruit(int[] fruits) {\n    int best = 0;\n\n    for (int start = 0; start < fruits.length; start++) {\n      Set<Integer> types = new HashSet<>();\n      for (int end = start; end < fruits.length; end++) {\n        types.add(fruits[end]);\n        if (types.size() > 2) {\n          break;\n        }\n        best = Math.max(best, end - start + 1);\n      }\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int totalFruit(int[] fruits) {\n    Map<Integer, Integer> count = new HashMap<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < fruits.length; right++) {\n      count.put(fruits[right], count.getOrDefault(fruits[right], 0) + 1);\n\n      while (count.size() > 2) {\n        int fruit = fruits[left++];\n        count.put(fruit, count.get(fruit) - 1);\n        if (count.get(fruit) == 0) {\n          count.remove(fruit);\n        }\n      }\n\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int totalFruit(int[] fruits) {\n    Map<Integer, Integer> count = new HashMap<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < fruits.length; right++) {\n      count.put(fruits[right], count.getOrDefault(fruits[right], 0) + 1);\n\n      while (count.size() > 2) {\n        int fruit = fruits[left++];\n        count.put(fruit, count.get(fruit) - 1);\n        if (count.get(fruit) == 0) {\n          count.remove(fruit);\n        }\n      }\n\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int totalFruit(int[] fruits) {\n    return scan(fruits, 0, 0, 0, new HashMap<>());\n  }\n\n  private int scan(int[] fruits, int right, int left, int best, Map<Integer, Integer> count) {\n    if (right == fruits.length) {\n      return best;\n    }\n\n    count.put(fruits[right], count.getOrDefault(fruits[right], 0) + 1);\n    int[] fixed = shrink(fruits, left, count);\n    int nextLeft = fixed[0];\n    int nextBest = Math.max(best, right - nextLeft + 1);\n    return scan(fruits, right + 1, nextLeft, nextBest, count);\n  }\n\n  private int[] shrink(int[] fruits, int left, Map<Integer, Integer> count) {\n    if (count.size() <= 2) {\n      return new int[] {left};\n    }\n\n    int fruit = fruits[left];\n    count.put(fruit, count.get(fruit) - 1);\n    if (count.get(fruit) == 0) {\n      count.remove(fruit);\n    }\n    return shrink(fruits, left + 1, count);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int totalFruit(int[] fruits) {\n    Map<Integer, Integer> count = new HashMap<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < fruits.length; right++) {\n      count.put(fruits[right], count.getOrDefault(fruits[right], 0) + 1);\n\n      while (count.size() > 2) {\n        int fruit = fruits[left++];\n        count.put(fruit, count.get(fruit) - 1);\n        if (count.get(fruit) == 0) {\n          count.remove(fruit);\n        }\n      }\n\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Max Consecutive Ones III",
      "difficulty": "Medium",
      "subpattern": "At most k violations window",
      "question": "Given a binary array nums and an integer k, return the maximum number of consecutive 1s after flipping at most k zeroes.",
      "trigger": "Zeroes are violations. The window is valid while the number of zeroes is at most k.",
      "intuition": "Expand right and count zeroes. If zeroes exceed k, move left until the window is valid again.",
      "edgeCases": "k equals 0, all ones, all zeroes, k larger than zero count, and longest window at either boundary.",
      "constraints": "1 <= nums.length <= 10^5; nums[i] is 0 or 1; 0 <= k <= nums.length.",
      "source": {
        "label": "LeetCode 1004 - Max Consecutive Ones III",
        "url": "https://leetcode.com/problems/max-consecutive-ones-iii/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
          "output": "6",
          "explanation": "Flip two zeroes to get six consecutive ones."
        },
        {
          "input": "nums = [0,0,1,1,0,0,1,1,1,0], k = 3",
          "output": "6",
          "explanation": "The best valid window has length 6."
        },
        {
          "input": "nums = [1,1,1], k = 0",
          "output": "3",
          "explanation": "No flips are needed."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int longestOnes(int[] nums, int k) {\n    int best = 0;\n\n    for (int start = 0; start < nums.length; start++) {\n      int zeroes = 0;\n      for (int end = start; end < nums.length; end++) {\n        if (nums[end] == 0) {\n          zeroes++;\n        }\n        if (zeroes > k) {\n          break;\n        }\n        best = Math.max(best, end - start + 1);\n      }\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int longestOnes(int[] nums, int k) {\n    int left = 0;\n    int zeroes = 0;\n    int best = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] == 0) {\n        zeroes++;\n      }\n      while (zeroes > k) {\n        if (nums[left++] == 0) {\n          zeroes--;\n        }\n      }\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int longestOnes(int[] nums, int k) {\n    int left = 0;\n    int zeroes = 0;\n    int best = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] == 0) {\n        zeroes++;\n      }\n      while (zeroes > k) {\n        if (nums[left++] == 0) {\n          zeroes--;\n        }\n      }\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int longestOnes(int[] nums, int k) {\n    return scan(nums, k, 0, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int k, int right, int left, int zeroes, int best) {\n    if (right == nums.length) {\n      return best;\n    }\n\n    int nextZeroes = zeroes + (nums[right] == 0 ? 1 : 0);\n    int[] fixed = shrink(nums, k, left, nextZeroes);\n    int nextLeft = fixed[0];\n    nextZeroes = fixed[1];\n    int nextBest = Math.max(best, right - nextLeft + 1);\n    return scan(nums, k, right + 1, nextLeft, nextZeroes, nextBest);\n  }\n\n  private int[] shrink(int[] nums, int k, int left, int zeroes) {\n    if (zeroes <= k) {\n      return new int[] {left, zeroes};\n    }\n\n    int nextZeroes = zeroes - (nums[left] == 0 ? 1 : 0);\n    return shrink(nums, k, left + 1, nextZeroes);\n  }\n}",
      "code": "class Solution {\n  public int longestOnes(int[] nums, int k) {\n    int left = 0;\n    int zeroes = 0;\n    int best = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] == 0) {\n        zeroes++;\n      }\n      while (zeroes > k) {\n        if (nums[left++] == 0) {\n          zeroes--;\n        }\n      }\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Repeating Character Replacement",
      "difficulty": "Medium",
      "subpattern": "Max-frequency variable window",
      "question": "Given a string s and integer k, return the length of the longest substring that can be turned into all the same character by replacing at most k characters.",
      "trigger": "A window is valid when window length minus the most frequent character count is at most k.",
      "intuition": "Track character counts and the highest frequency in the window. Shrink only when replacements needed exceed k.",
      "edgeCases": "k equals 0, all same characters, stale max frequency is acceptable, uppercase-only input, and answer at the end.",
      "constraints": "1 <= s.length <= 10^5; s consists of uppercase English letters; 0 <= k <= s.length.",
      "source": {
        "label": "LeetCode 424 - Longest Repeating Character Replacement",
        "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
      },
      "examples": [
        {
          "input": "s = \"ABAB\", k = 2",
          "output": "4",
          "explanation": "Replace two characters to make the whole string equal."
        },
        {
          "input": "s = \"AABABBA\", k = 1",
          "output": "4",
          "explanation": "A window like \"AABA\" can become all A."
        },
        {
          "input": "s = \"AAAA\", k = 0",
          "output": "4",
          "explanation": "Already all the same character."
        }
      ],
      "bruteForceComplexity": "Time O(26*n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) count array.",
      "bruteForceCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int best = 0;\n\n    for (int start = 0; start < s.length(); start++) {\n      int[] count = new int[26];\n      int maxFrequency = 0;\n      for (int end = start; end < s.length(); end++) {\n        int index = s.charAt(end) - 'A';\n        count[index]++;\n        maxFrequency = Math.max(maxFrequency, count[index]);\n\n        int length = end - start + 1;\n        if (length - maxFrequency <= k) {\n          best = Math.max(best, length);\n        }\n      }\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0;\n    int maxFrequency = 0;\n    int best = 0;\n\n    for (int right = 0; right < s.length(); right++) {\n      int index = s.charAt(right) - 'A';\n      count[index]++;\n      maxFrequency = Math.max(maxFrequency, count[index]);\n\n      while (right - left + 1 - maxFrequency > k) {\n        count[s.charAt(left) - 'A']--;\n        left++;\n      }\n\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0;\n    int maxFrequency = 0;\n    int best = 0;\n\n    for (int right = 0; right < s.length(); right++) {\n      int index = s.charAt(right) - 'A';\n      count[index]++;\n      maxFrequency = Math.max(maxFrequency, count[index]);\n\n      while (right - left + 1 - maxFrequency > k) {\n        count[s.charAt(left) - 'A']--;\n        left++;\n      }\n\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    return scan(s, k, 0, 0, 0, 0, new int[26]);\n  }\n\n  private int scan(String s, int k, int right, int left, int maxFrequency, int best, int[] count) {\n    if (right == s.length()) {\n      return best;\n    }\n\n    int index = s.charAt(right) - 'A';\n    count[index]++;\n    int nextMax = Math.max(maxFrequency, count[index]);\n\n    int[] fixed = shrink(s, k, right, left, nextMax, count);\n    int nextLeft = fixed[0];\n    int nextBest = Math.max(best, right - nextLeft + 1);\n    return scan(s, k, right + 1, nextLeft, nextMax, nextBest, count);\n  }\n\n  private int[] shrink(String s, int k, int right, int left, int maxFrequency, int[] count) {\n    if (right - left + 1 - maxFrequency <= k) {\n      return new int[] {left};\n    }\n\n    count[s.charAt(left) - 'A']--;\n    return shrink(s, k, right, left + 1, maxFrequency, count);\n  }\n}",
      "code": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0;\n    int maxFrequency = 0;\n    int best = 0;\n\n    for (int right = 0; right < s.length(); right++) {\n      int index = s.charAt(right) - 'A';\n      count[index]++;\n      maxFrequency = Math.max(maxFrequency, count[index]);\n\n      while (right - left + 1 - maxFrequency > k) {\n        count[s.charAt(left) - 'A']--;\n        left++;\n      }\n\n      best = Math.max(best, right - left + 1);\n    }\n\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Grumpy Bookstore Owner",
      "difficulty": "Medium",
      "subpattern": "Fixed-size gain window",
      "question": "Given customers, grumpy, and minutes, return the maximum number of satisfied customers if the owner can suppress grumpiness for exactly one consecutive window of length minutes.",
      "trigger": "The technique applies to one fixed-size window, and only grumpy minutes inside that window add extra satisfied customers.",
      "intuition": "Compute always-satisfied base customers, then slide a fixed-size window to maximize extra gain from grumpy minutes.",
      "edgeCases": "minutes equals array length, no grumpy minutes, all grumpy minutes, one minute, and zero-customer minutes.",
      "constraints": "1 <= minutes <= customers.length <= 2 * 10^4; 0 <= customers[i] <= 1000; grumpy[i] is 0 or 1.",
      "source": {
        "label": "LeetCode 1052 - Grumpy Bookstore Owner",
        "url": "https://leetcode.com/problems/grumpy-bookstore-owner/"
      },
      "examples": [
        {
          "input": "customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3",
          "output": "16",
          "explanation": "Base satisfied plus best extra gain window gives 16."
        },
        {
          "input": "customers = [1], grumpy = [0], minutes = 1",
          "output": "1",
          "explanation": "The only customer is already satisfied."
        },
        {
          "input": "customers = [4,10,10], grumpy = [1,1,0], minutes = 2",
          "output": "24",
          "explanation": "Suppressing first two minutes satisfies all customers."
        }
      ],
      "bruteForceComplexity": "Time O(n * minutes) if each possible technique window is simulated directly; Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n    int best = 0;\n\n    for (int start = 0; start < customers.length; start++) {\n      int satisfied = 0;\n      for (int i = 0; i < customers.length; i++) {\n        boolean techniqueActive = i >= start && i < start + minutes;\n        if (grumpy[i] == 0 || techniqueActive) {\n          satisfied += customers[i];\n        }\n      }\n      best = Math.max(best, satisfied);\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n    int baseSatisfied = 0;\n    int windowGain = 0;\n\n    for (int i = 0; i < customers.length; i++) {\n      if (grumpy[i] == 0) {\n        baseSatisfied += customers[i];\n      } else if (i < minutes) {\n        windowGain += customers[i];\n      }\n    }\n\n    int bestGain = windowGain;\n    for (int right = minutes; right < customers.length; right++) {\n      if (grumpy[right] == 1) {\n        windowGain += customers[right];\n      }\n      if (grumpy[right - minutes] == 1) {\n        windowGain -= customers[right - minutes];\n      }\n      bestGain = Math.max(bestGain, windowGain);\n    }\n\n    return baseSatisfied + bestGain;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n    int baseSatisfied = 0;\n    int windowGain = 0;\n\n    for (int i = 0; i < customers.length; i++) {\n      if (grumpy[i] == 0) {\n        baseSatisfied += customers[i];\n      } else if (i < minutes) {\n        windowGain += customers[i];\n      }\n    }\n\n    int bestGain = windowGain;\n    for (int right = minutes; right < customers.length; right++) {\n      if (grumpy[right] == 1) {\n        windowGain += customers[right];\n      }\n      if (grumpy[right - minutes] == 1) {\n        windowGain -= customers[right - minutes];\n      }\n      bestGain = Math.max(bestGain, windowGain);\n    }\n\n    return baseSatisfied + bestGain;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n    int base = baseSatisfied(customers, grumpy, 0);\n    int firstGain = firstGain(customers, grumpy, 0, minutes);\n    int bestGain = slide(customers, grumpy, minutes, minutes, firstGain, firstGain);\n    return base + bestGain;\n  }\n\n  private int baseSatisfied(int[] customers, int[] grumpy, int index) {\n    if (index == customers.length) return 0;\n    int add = grumpy[index] == 0 ? customers[index] : 0;\n    return add + baseSatisfied(customers, grumpy, index + 1);\n  }\n\n  private int firstGain(int[] customers, int[] grumpy, int index, int minutes) {\n    if (index == minutes) return 0;\n    int add = grumpy[index] == 1 ? customers[index] : 0;\n    return add + firstGain(customers, grumpy, index + 1, minutes);\n  }\n\n  private int slide(int[] customers, int[] grumpy, int right, int minutes, int gain, int best) {\n    if (right == customers.length) return best;\n\n    int nextGain = gain;\n    if (grumpy[right] == 1) nextGain += customers[right];\n    if (grumpy[right - minutes] == 1) nextGain -= customers[right - minutes];\n    return slide(customers, grumpy, right + 1, minutes, nextGain, Math.max(best, nextGain));\n  }\n}",
      "code": "class Solution {\n  public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n    int baseSatisfied = 0;\n    int windowGain = 0;\n\n    for (int i = 0; i < customers.length; i++) {\n      if (grumpy[i] == 0) {\n        baseSatisfied += customers[i];\n      } else if (i < minutes) {\n        windowGain += customers[i];\n      }\n    }\n\n    int bestGain = windowGain;\n    for (int right = minutes; right < customers.length; right++) {\n      if (grumpy[right] == 1) {\n        windowGain += customers[right];\n      }\n      if (grumpy[right - minutes] == 1) {\n        windowGain -= customers[right - minutes];\n      }\n      bestGain = Math.max(bestGain, windowGain);\n    }\n\n    return baseSatisfied + bestGain;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Sliding Window Maximum",
      "difficulty": "Hard",
      "subpattern": "Monotonic deque window",
      "question": "Given nums and k, return an array containing the maximum value in every contiguous window of size k.",
      "trigger": "Each fixed-size window needs a maximum, and recomputing it would repeat work across overlapping windows.",
      "intuition": "Maintain a decreasing deque of indexes. The front is always the maximum of the current window.",
      "edgeCases": "k equals 1, k equals nums.length, duplicates, strictly increasing values, strictly decreasing values, and negative numbers.",
      "constraints": "1 <= nums.length <= 10^5; -10^4 <= nums[i] <= 10^4; 1 <= k <= nums.length.",
      "source": {
        "label": "LeetCode 239 - Sliding Window Maximum",
        "url": "https://leetcode.com/problems/sliding-window-maximum/"
      },
      "examples": [
        {
          "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          "output": "[3,3,5,5,6,7]",
          "explanation": "Maximum for each length-3 window."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "[1]",
          "explanation": "Only one window exists."
        },
        {
          "input": "nums = [9,8,7], k = 2",
          "output": "[9,8]",
          "explanation": "Decreasing windows keep the leftmost value as max."
        }
      ],
      "bruteForceComplexity": "Time O(n*k), Space O(1) excluding output.",
      "optimizedComplexity": "Time O(n), Space O(k) for the deque.",
      "recursiveComplexity": "Time O(n), Space O(k + n) including deque and call stack.",
      "bruteForceCode": "class Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n\n    for (int start = 0; start < answer.length; start++) {\n      int max = nums[start];\n      for (int i = start; i < start + k; i++) {\n        max = Math.max(max, nums[i]);\n      }\n      answer[start] = max;\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    Deque<Integer> deque = new ArrayDeque<>();\n    int[] answer = new int[nums.length - k + 1];\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() <= right - k) {\n        deque.pollFirst();\n      }\n      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) {\n        deque.pollLast();\n      }\n      deque.offerLast(right);\n\n      if (right >= k - 1) {\n        answer[right - k + 1] = nums[deque.peekFirst()];\n      }\n    }\n\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    Deque<Integer> deque = new ArrayDeque<>();\n    int[] answer = new int[nums.length - k + 1];\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() <= right - k) {\n        deque.pollFirst();\n      }\n      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) {\n        deque.pollLast();\n      }\n      deque.offerLast(right);\n\n      if (right >= k - 1) {\n        answer[right - k + 1] = nums[deque.peekFirst()];\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    scan(nums, k, 0, new ArrayDeque<>(), answer);\n    return answer;\n  }\n\n  private void scan(int[] nums, int k, int right, Deque<Integer> deque, int[] answer) {\n    if (right == nums.length) return;\n\n    removeExpired(deque, right - k);\n    removeSmaller(nums, deque, nums[right]);\n    deque.offerLast(right);\n\n    if (right >= k - 1) {\n      answer[right - k + 1] = nums[deque.peekFirst()];\n    }\n    scan(nums, k, right + 1, deque, answer);\n  }\n\n  private void removeExpired(Deque<Integer> deque, int expiredIndex) {\n    if (!deque.isEmpty() && deque.peekFirst() <= expiredIndex) {\n      deque.pollFirst();\n      removeExpired(deque, expiredIndex);\n    }\n  }\n\n  private void removeSmaller(int[] nums, Deque<Integer> deque, int value) {\n    if (!deque.isEmpty() && nums[deque.peekLast()] <= value) {\n      deque.pollLast();\n      removeSmaller(nums, deque, value);\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    Deque<Integer> deque = new ArrayDeque<>();\n    int[] answer = new int[nums.length - k + 1];\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() <= right - k) {\n        deque.pollFirst();\n      }\n      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) {\n        deque.pollLast();\n      }\n      deque.offerLast(right);\n\n      if (right >= k - 1) {\n        answer[right - k + 1] = nums[deque.peekFirst()];\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Window Substring",
      "difficulty": "Hard",
      "subpattern": "Minimum satisfying frequency window",
      "question": "Given strings s and t, return the smallest substring of s that contains every character of t including duplicates. Return an empty string if no such window exists.",
      "trigger": "The window must satisfy required character frequencies, and the goal is the minimum valid window.",
      "intuition": "Expand until all required characters are covered, then shrink from the left while the window remains valid.",
      "edgeCases": "t longer than s, no valid window, duplicate required characters, exact full-string window, and case sensitivity.",
      "constraints": "1 <= s.length, t.length <= 10^5; s and t consist of uppercase and lowercase English letters.",
      "source": {
        "label": "LeetCode 76 - Minimum Window Substring",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      },
      "examples": [
        {
          "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
          "output": "\"BANC\"",
          "explanation": "BANC is the shortest substring containing A, B, and C."
        },
        {
          "input": "s = \"a\", t = \"a\"",
          "output": "\"a\"",
          "explanation": "The full string is the minimum window."
        },
        {
          "input": "s = \"a\", t = \"aa\"",
          "output": "\"\"",
          "explanation": "s does not contain two a characters."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * charset), Space O(charset).",
      "optimizedComplexity": "Time O(n + m), Space O(charset), where n = s.length and m = t.length.",
      "recursiveComplexity": "Time O(n + m), Space O(charset + n) including call stack.",
      "bruteForceCode": "class Solution {\n  public String minWindow(String s, String t) {\n    String best = \"\";\n\n    for (int start = 0; start < s.length(); start++) {\n      for (int end = start; end < s.length(); end++) {\n        String window = s.substring(start, end + 1);\n        if ((best.isEmpty() || window.length() < best.length()) && containsAll(window, t)) {\n          best = window;\n        }\n      }\n    }\n\n    return best;\n  }\n\n  private boolean containsAll(String window, String t) {\n    int[] count = new int[128];\n    for (char c : window.toCharArray()) {\n      count[c]++;\n    }\n    for (char c : t.toCharArray()) {\n      if (--count[c] < 0) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    for (char c : t.toCharArray()) {\n      need[c]++;\n    }\n\n    int missing = t.length();\n    int left = 0;\n    int start = 0;\n    int best = Integer.MAX_VALUE;\n\n    for (int right = 0; right < s.length(); right++) {\n      if (need[s.charAt(right)]-- > 0) {\n        missing--;\n      }\n\n      while (missing == 0) {\n        if (right - left + 1 < best) {\n          best = right - left + 1;\n          start = left;\n        }\n        if (++need[s.charAt(left++)] > 0) {\n          missing++;\n        }\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    for (char c : t.toCharArray()) {\n      need[c]++;\n    }\n\n    int missing = t.length();\n    int left = 0;\n    int start = 0;\n    int best = Integer.MAX_VALUE;\n\n    for (int right = 0; right < s.length(); right++) {\n      if (need[s.charAt(right)]-- > 0) {\n        missing--;\n      }\n\n      while (missing == 0) {\n        if (right - left + 1 < best) {\n          best = right - left + 1;\n          start = left;\n        }\n        if (++need[s.charAt(left++)] > 0) {\n          missing++;\n        }\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n  }\n}",
      "recursiveCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    fillNeed(t, 0, need);\n    int[] best = scan(s, 0, 0, t.length(), 0, Integer.MAX_VALUE, need);\n    return best[1] == Integer.MAX_VALUE ? \"\" : s.substring(best[0], best[0] + best[1]);\n  }\n\n  private void fillNeed(String t, int index, int[] need) {\n    if (index == t.length()) return;\n    need[t.charAt(index)]++;\n    fillNeed(t, index + 1, need);\n  }\n\n  private int[] scan(String s, int right, int left, int missing, int start, int bestLength, int[] need) {\n    if (right == s.length()) {\n      return new int[] {start, bestLength};\n    }\n\n    if (need[s.charAt(right)]-- > 0) {\n      missing--;\n    }\n\n    int[] state = shrink(s, right, left, missing, start, bestLength, need);\n    return scan(s, right + 1, state[0], state[1], state[2], state[3], need);\n  }\n\n  private int[] shrink(String s, int right, int left, int missing, int start, int bestLength, int[] need) {\n    if (missing != 0) {\n      return new int[] {left, missing, start, bestLength};\n    }\n\n    if (right - left + 1 < bestLength) {\n      start = left;\n      bestLength = right - left + 1;\n    }\n    if (++need[s.charAt(left)] > 0) {\n      return new int[] {left + 1, 1, start, bestLength};\n    }\n    return shrink(s, right, left + 1, 0, start, bestLength, need);\n  }\n}",
      "code": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    for (char c : t.toCharArray()) {\n      need[c]++;\n    }\n\n    int missing = t.length();\n    int left = 0;\n    int start = 0;\n    int best = Integer.MAX_VALUE;\n\n    for (int right = 0; right < s.length(); right++) {\n      if (need[s.charAt(right)]-- > 0) {\n        missing--;\n      }\n\n      while (missing == 0) {\n        if (right - left + 1 < best) {\n          best = right - left + 1;\n          start = left;\n        }\n        if (++need[s.charAt(left++)] > 0) {\n          missing++;\n        }\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Subarray Product Less Than K",
      "difficulty": "Medium",
      "subpattern": "Product-bounded variable window",
      "question": "Given an array of positive integers nums and integer k, return the number of contiguous subarrays where the product of all elements is strictly less than k.",
      "trigger": "All values are positive, so when product becomes too large, moving left only decreases the product.",
      "intuition": "Expand product by right. Shrink while product >= k. Every valid window ending at right contributes right - left + 1 subarrays.",
      "edgeCases": "k <= 1, all ones, single element, product exactly k, large product risk, and every subarray valid.",
      "constraints": "1 <= nums.length <= 3 * 10^4; 1 <= nums[i] <= 1000; 0 <= k <= 10^6.",
      "source": {
        "label": "LeetCode 713 - Subarray Product Less Than K",
        "url": "https://leetcode.com/problems/subarray-product-less-than-k/"
      },
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
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    int count = 0;\n    for (int start = 0; start < nums.length; start++) {\n      long product = 1;\n      for (int end = start; end < nums.length; end++) {\n        product *= nums[end];\n        if (product < k) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0;\n    int count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) {\n        product /= nums[left++];\n      }\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0;\n    int count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) {\n        product /= nums[left++];\n      }\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    return scan(nums, k, 0, 0, 1L, 0);\n  }\n\n  private int scan(int[] nums, int k, int right, int left, long product, int count) {\n    if (right == nums.length) return count;\n    return shrink(nums, k, right, left, product * nums[right], count);\n  }\n\n  private int shrink(int[] nums, int k, int right, int left, long product, int count) {\n    if (product >= k) return shrink(nums, k, right, left + 1, product / nums[left], count);\n    return scan(nums, k, right + 1, left, product, count + right - left + 1);\n  }\n}",
      "code": "class Solution {\n  public int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0;\n    int left = 0;\n    int count = 0;\n    long product = 1;\n    for (int right = 0; right < nums.length; right++) {\n      product *= nums[right];\n      while (product >= k) {\n        product /= nums[left++];\n      }\n      count += right - left + 1;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Longest Subarray of 1s After Deleting One Element",
      "difficulty": "Medium",
      "subpattern": "At most one zero window",
      "question": "Given a binary array nums, delete exactly one element and return the longest non-empty subarray containing only 1s.",
      "trigger": "A valid kept window can contain at most one zero because that one zero is the deleted element.",
      "intuition": "Keep a window with at most one zero. Since one element must be deleted, candidate length is right - left.",
      "edgeCases": "All ones must return n - 1, all zeros, one element, zero at boundary, and multiple zeros forcing shrink.",
      "constraints": "1 <= nums.length <= 10^5; nums[i] is 0 or 1.",
      "source": {
        "label": "LeetCode 1493 - Longest Subarray of 1s After Deleting One Element",
        "url": "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/"
      },
      "examples": [
        {
          "input": "nums = [1,1,0,1]",
          "output": "3",
          "explanation": "Delete the zero to join three ones."
        },
        {
          "input": "nums = [0,1,1,1,0,1,1,0,1]",
          "output": "5",
          "explanation": "The best window has one zero and length 6, then delete it."
        },
        {
          "input": "nums = [1,1,1]",
          "output": "2",
          "explanation": "One element must be deleted."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int longestSubarray(int[] nums) {\n    int best = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int zeros = 0;\n      for (int end = start; end < nums.length; end++) {\n        if (nums[end] == 0) zeros++;\n        if (zeros <= 1) best = Math.max(best, end - start);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int longestSubarray(int[] nums) {\n    int left = 0;\n    int zeros = 0;\n    int best = 0;\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] == 0) zeros++;\n      while (zeros > 1) {\n        if (nums[left++] == 0) zeros--;\n      }\n      best = Math.max(best, right - left);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int longestSubarray(int[] nums) {\n    int left = 0;\n    int zeros = 0;\n    int best = 0;\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] == 0) zeros++;\n      while (zeros > 1) {\n        if (nums[left++] == 0) zeros--;\n      }\n      best = Math.max(best, right - left);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int longestSubarray(int[] nums) {\n    return scan(nums, 0, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int right, int left, int zeros, int best) {\n    if (right == nums.length) return best;\n    int nextZeros = zeros + (nums[right] == 0 ? 1 : 0);\n    return shrink(nums, right, left, nextZeros, best);\n  }\n\n  private int shrink(int[] nums, int right, int left, int zeros, int best) {\n    if (zeros > 1) return shrink(nums, right, left + 1, zeros - (nums[left] == 0 ? 1 : 0), best);\n    return scan(nums, right + 1, left, zeros, Math.max(best, right - left));\n  }\n}",
      "code": "class Solution {\n  public int longestSubarray(int[] nums) {\n    int left = 0;\n    int zeros = 0;\n    int best = 0;\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] == 0) zeros++;\n      while (zeros > 1) {\n        if (nums[left++] == 0) zeros--;\n      }\n      best = Math.max(best, right - left);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Number of Substrings Containing All Three Characters",
      "difficulty": "Medium",
      "subpattern": "At least all required chars window",
      "question": "Given a string s containing only a, b, and c, return the number of substrings containing at least one occurrence of all three characters.",
      "trigger": "Once a window contains a, b, and c, every extension to the right is also valid.",
      "intuition": "Expand until all three exist, then repeatedly count s.length - right valid substrings while shrinking left.",
      "edgeCases": "String length 3, missing one character, repeated same character, valid window at the end, and many overlapping valid substrings.",
      "constraints": "3 <= s.length <= 5 * 10^4; s consists only of a, b, and c.",
      "source": {
        "label": "LeetCode 1358 - Number of Substrings Containing All Three Characters",
        "url": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/"
      },
      "examples": [
        {
          "input": "s = \"abcabc\"",
          "output": "10",
          "explanation": "Every substring containing a, b, and c is counted."
        },
        {
          "input": "s = \"aaacb\"",
          "output": "3",
          "explanation": "The valid substrings are aaacb, aacb, and acb."
        },
        {
          "input": "s = \"abc\"",
          "output": "1",
          "explanation": "Only the full string works."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int numberOfSubstrings(String s) {\n    int answer = 0;\n    for (int start = 0; start < s.length(); start++) {\n      int[] count = new int[3];\n      for (int end = start; end < s.length(); end++) {\n        count[s.charAt(end) - 'a']++;\n        if (count[0] > 0 && count[1] > 0 && count[2] > 0) answer++;\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numberOfSubstrings(String s) {\n    int[] count = new int[3];\n    int left = 0;\n    int answer = 0;\n    for (int right = 0; right < s.length(); right++) {\n      count[s.charAt(right) - 'a']++;\n      while (count[0] > 0 && count[1] > 0 && count[2] > 0) {\n        answer += s.length() - right;\n        count[s.charAt(left++) - 'a']--;\n      }\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numberOfSubstrings(String s) {\n    int[] count = new int[3];\n    int left = 0;\n    int answer = 0;\n    for (int right = 0; right < s.length(); right++) {\n      count[s.charAt(right) - 'a']++;\n      while (count[0] > 0 && count[1] > 0 && count[2] > 0) {\n        answer += s.length() - right;\n        count[s.charAt(left++) - 'a']--;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numberOfSubstrings(String s) {\n    return scan(s, 0, 0, 0, new int[3]);\n  }\n\n  private int scan(String s, int right, int left, int answer, int[] count) {\n    if (right == s.length()) return answer;\n    count[s.charAt(right) - 'a']++;\n    return shrink(s, right, left, answer, count);\n  }\n\n  private int shrink(String s, int right, int left, int answer, int[] count) {\n    if (count[0] > 0 && count[1] > 0 && count[2] > 0) {\n      count[s.charAt(left) - 'a']--;\n      return shrink(s, right, left + 1, answer + s.length() - right, count);\n    }\n    return scan(s, right + 1, left, answer, count);\n  }\n}",
      "code": "class Solution {\n  public int numberOfSubstrings(String s) {\n    int[] count = new int[3];\n    int left = 0;\n    int answer = 0;\n    for (int right = 0; right < s.length(); right++) {\n      count[s.charAt(right) - 'a']++;\n      while (count[0] > 0 && count[1] > 0 && count[2] > 0) {\n        answer += s.length() - right;\n        count[s.charAt(left++) - 'a']--;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Count Number of Nice Subarrays",
      "difficulty": "Medium",
      "subpattern": "Exactly k odd numbers window",
      "question": "Given nums and k, return the number of continuous subarrays containing exactly k odd numbers.",
      "trigger": "Exactly k can be counted as atMost(k) - atMost(k - 1), where atMost is a shrinkable window over odd-count budget.",
      "intuition": "Use each odd number as one unit of budget. Count all windows with at most k odds, then subtract at most k - 1 odds.",
      "edgeCases": "No odd numbers, k larger than odd count, all odd values, long even runs, k = 1, and subarray starting at index 0.",
      "constraints": "1 <= nums.length <= 5 * 10^4; 1 <= nums[i] <= 10^5; 1 <= k <= nums.length.",
      "source": {
        "label": "LeetCode 1248 - Count Number of Nice Subarrays",
        "url": "https://leetcode.com/problems/count-number-of-nice-subarrays/"
      },
      "examples": [
        {
          "input": "nums = [1,1,2,1,1], k = 3",
          "output": "2",
          "explanation": "Two subarrays contain exactly three odd numbers."
        },
        {
          "input": "nums = [2,4,6], k = 1",
          "output": "0",
          "explanation": "No odd numbers exist."
        },
        {
          "input": "nums = [2,2,2,1,2,2,1,2,2,2], k = 2",
          "output": "16",
          "explanation": "Even runs around the two odds create sixteen subarrays."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    int answer = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int odds = 0;\n      for (int end = start; end < nums.length; end++) {\n        odds += nums[end] % 2;\n        if (odds == k) answer++;\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    return atMost(nums, k) - atMost(nums, k - 1);\n  }\n\n  private int atMost(int[] nums, int k) {\n    int left = 0;\n    int answer = 0;\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] % 2 == 1) k--;\n      while (k < 0) {\n        if (nums[left++] % 2 == 1) k++;\n      }\n      answer += right - left + 1;\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    return atMost(nums, k) - atMost(nums, k - 1);\n  }\n\n  private int atMost(int[] nums, int k) {\n    int left = 0;\n    int answer = 0;\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] % 2 == 1) k--;\n      while (k < 0) {\n        if (nums[left++] % 2 == 1) k++;\n      }\n      answer += right - left + 1;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    return atMost(nums, k, 0, 0, 0) - atMost(nums, k - 1, 0, 0, 0);\n  }\n\n  private int atMost(int[] nums, int k, int right, int left, int answer) {\n    if (right == nums.length) return answer;\n    int nextK = k - (nums[right] % 2);\n    return shrink(nums, nextK, right, left, answer);\n  }\n\n  private int shrink(int[] nums, int k, int right, int left, int answer) {\n    if (k < 0) return shrink(nums, k + (nums[left] % 2), right, left + 1, answer);\n    return atMost(nums, k, right + 1, left, answer + right - left + 1);\n  }\n}",
      "code": "class Solution {\n  public int numberOfSubarrays(int[] nums, int k) {\n    return atMost(nums, k) - atMost(nums, k - 1);\n  }\n\n  private int atMost(int[] nums, int k) {\n    int left = 0;\n    int answer = 0;\n    for (int right = 0; right < nums.length; right++) {\n      if (nums[right] % 2 == 1) k--;\n      while (k < 0) {\n        if (nums[left++] % 2 == 1) k++;\n      }\n      answer += right - left + 1;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Max Consecutive Ones",
      "difficulty": "Easy",
      "subpattern": "Fixed violation-free window",
      "question": "Given a binary array nums, return the maximum number of consecutive 1s in the array.",
      "trigger": "The valid window has zero violations: it can contain only 1s.",
      "intuition": "Count the current run of 1s. Reset to 0 whenever a zero appears.",
      "edgeCases": "All ones, all zeros, one element, longest run at the start, longest run at the end, and multiple equal runs.",
      "constraints": "1 <= nums.length <= 10^5; nums[i] is 0 or 1.",
      "source": {
        "label": "LeetCode 485 - Max Consecutive Ones",
        "url": "https://leetcode.com/problems/max-consecutive-ones/"
      },
      "examples": [
        {
          "input": "nums = [1,1,0,1,1,1]",
          "output": "3",
          "explanation": "The longest run of ones is at the end."
        },
        {
          "input": "nums = [1,0,1,1,0,1]",
          "output": "2",
          "explanation": "The longest run length is 2."
        },
        {
          "input": "nums = [0,0]",
          "output": "0",
          "explanation": "There are no ones."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int findMaxConsecutiveOnes(int[] nums) {\n    int best = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int length = 0;\n      for (int end = start; end < nums.length && nums[end] == 1; end++) {\n        length++;\n      }\n      best = Math.max(best, length);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findMaxConsecutiveOnes(int[] nums) {\n    int current = 0;\n    int best = 0;\n    for (int num : nums) {\n      current = num == 1 ? current + 1 : 0;\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findMaxConsecutiveOnes(int[] nums) {\n    int current = 0;\n    int best = 0;\n    for (int num : nums) {\n      current = num == 1 ? current + 1 : 0;\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findMaxConsecutiveOnes(int[] nums) {\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int current, int best) {\n    if (index == nums.length) return best;\n    int nextCurrent = nums[index] == 1 ? current + 1 : 0;\n    return scan(nums, index + 1, nextCurrent, Math.max(best, nextCurrent));\n  }\n}",
      "code": "class Solution {\n  public int findMaxConsecutiveOnes(int[] nums) {\n    int current = 0;\n    int best = 0;\n    for (int num : nums) {\n      current = num == 1 ? current + 1 : 0;\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Points You Can Obtain from Cards",
      "difficulty": "Medium",
      "subpattern": "Complement fixed window",
      "question": "Given cardPoints and k, take exactly k cards from either end of the row and return the maximum score.",
      "trigger": "Taking k from the ends is equivalent to leaving one middle window of length n - k with minimum sum.",
      "intuition": "Compute total score, find the minimum fixed-size middle window to leave, and subtract it from total.",
      "edgeCases": "k equals n, k equals 1, all same values, best takes both ends, minimum middle window at boundary, and large n.",
      "constraints": "1 <= cardPoints.length <= 10^5; 1 <= cardPoints[i] <= 10^4; 1 <= k <= cardPoints.length.",
      "source": {
        "label": "LeetCode 1423 - Maximum Points You Can Obtain from Cards",
        "url": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/"
      },
      "examples": [
        {
          "input": "cardPoints = [1,2,3,4,5,6,1], k = 3",
          "output": "12",
          "explanation": "Leave [1,2,3,4], take [5,6,1]."
        },
        {
          "input": "cardPoints = [2,2,2], k = 2",
          "output": "4",
          "explanation": "Any two cards score 4."
        },
        {
          "input": "cardPoints = [9,7,7,9,7,7,9], k = 7",
          "output": "55",
          "explanation": "Take all cards."
        }
      ],
      "bruteForceComplexity": "Time O(k^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int maxScore(int[] cardPoints, int k) {\n    int best = 0;\n    for (int leftCards = 0; leftCards <= k; leftCards++) {\n      int sum = 0;\n      for (int i = 0; i < leftCards; i++) sum += cardPoints[i];\n      for (int i = 0; i < k - leftCards; i++) sum += cardPoints[cardPoints.length - 1 - i];\n      best = Math.max(best, sum);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxScore(int[] cardPoints, int k) {\n    int total = 0;\n    for (int point : cardPoints) total += point;\n\n    int keep = cardPoints.length - k;\n    if (keep == 0) return total;\n\n    int window = 0;\n    for (int i = 0; i < keep; i++) window += cardPoints[i];\n    int minWindow = window;\n    for (int right = keep; right < cardPoints.length; right++) {\n      window += cardPoints[right] - cardPoints[right - keep];\n      minWindow = Math.min(minWindow, window);\n    }\n    return total - minWindow;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxScore(int[] cardPoints, int k) {\n    int total = 0;\n    for (int point : cardPoints) total += point;\n\n    int keep = cardPoints.length - k;\n    if (keep == 0) return total;\n\n    int window = 0;\n    for (int i = 0; i < keep; i++) window += cardPoints[i];\n    int minWindow = window;\n    for (int right = keep; right < cardPoints.length; right++) {\n      window += cardPoints[right] - cardPoints[right - keep];\n      minWindow = Math.min(minWindow, window);\n    }\n    return total - minWindow;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxScore(int[] cardPoints, int k) {\n    int total = sum(cardPoints, 0);\n    int keep = cardPoints.length - k;\n    if (keep == 0) return total;\n    int firstWindow = sumRange(cardPoints, 0, keep);\n    int minWindow = slide(cardPoints, keep, keep, firstWindow, firstWindow);\n    return total - minWindow;\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int sumRange(int[] nums, int index, int end) {\n    if (index == end) return 0;\n    return nums[index] + sumRange(nums, index + 1, end);\n  }\n\n  private int slide(int[] nums, int keep, int right, int window, int minWindow) {\n    if (right == nums.length) return minWindow;\n    int nextWindow = window + nums[right] - nums[right - keep];\n    return slide(nums, keep, right + 1, nextWindow, Math.min(minWindow, nextWindow));\n  }\n}",
      "code": "class Solution {\n  public int maxScore(int[] cardPoints, int k) {\n    int total = 0;\n    for (int point : cardPoints) total += point;\n\n    int keep = cardPoints.length - k;\n    if (keep == 0) return total;\n\n    int window = 0;\n    for (int i = 0; i < keep; i++) window += cardPoints[i];\n    int minWindow = window;\n    for (int right = keep; right < cardPoints.length; right++) {\n      window += cardPoints[right] - cardPoints[right - keep];\n      minWindow = Math.min(minWindow, window);\n    }\n    return total - minWindow;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
      "difficulty": "Medium",
      "subpattern": "Monotonic deque bounded window",
      "question": "Given nums and limit, return the length of the longest continuous subarray where the absolute difference between any two elements is at most limit.",
      "trigger": "A window is valid when max(window) - min(window) <= limit; max and min must update as the window slides.",
      "intuition": "Use a decreasing deque for max and increasing deque for min. Shrink left until max - min fits.",
      "edgeCases": "limit = 0, all equal values, strictly increasing values, duplicate max/min values, single element, and large values.",
      "constraints": "1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^9; 0 <= limit <= 10^9.",
      "source": {
        "label": "LeetCode 1438 - Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
        "url": "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/"
      },
      "examples": [
        {
          "input": "nums = [8,2,4,7], limit = 4",
          "output": "2",
          "explanation": "[2,4] is valid, length 2."
        },
        {
          "input": "nums = [10,1,2,4,7,2], limit = 5",
          "output": "4",
          "explanation": "[2,4,7,2] is valid."
        },
        {
          "input": "nums = [4,2,2,2,4,4,2,2], limit = 0",
          "output": "3",
          "explanation": "The longest equal-value run has length 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n) for deques.",
      "recursiveComplexity": "Time O(n), Space O(n) deques plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int longestSubarray(int[] nums, int limit) {\n    int best = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int min = nums[start];\n      int max = nums[start];\n      for (int end = start; end < nums.length; end++) {\n        min = Math.min(min, nums[end]);\n        max = Math.max(max, nums[end]);\n        if (max - min <= limit) best = Math.max(best, end - start + 1);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int longestSubarray(int[] nums, int limit) {\n    Deque<Integer> maxDeque = new ArrayDeque<>();\n    Deque<Integer> minDeque = new ArrayDeque<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!maxDeque.isEmpty() && nums[maxDeque.peekLast()] < nums[right]) maxDeque.pollLast();\n      while (!minDeque.isEmpty() && nums[minDeque.peekLast()] > nums[right]) minDeque.pollLast();\n      maxDeque.offerLast(right);\n      minDeque.offerLast(right);\n\n      while (nums[maxDeque.peekFirst()] - nums[minDeque.peekFirst()] > limit) {\n        if (maxDeque.peekFirst() == left) maxDeque.pollFirst();\n        if (minDeque.peekFirst() == left) minDeque.pollFirst();\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int longestSubarray(int[] nums, int limit) {\n    Deque<Integer> maxDeque = new ArrayDeque<>();\n    Deque<Integer> minDeque = new ArrayDeque<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!maxDeque.isEmpty() && nums[maxDeque.peekLast()] < nums[right]) maxDeque.pollLast();\n      while (!minDeque.isEmpty() && nums[minDeque.peekLast()] > nums[right]) minDeque.pollLast();\n      maxDeque.offerLast(right);\n      minDeque.offerLast(right);\n\n      while (nums[maxDeque.peekFirst()] - nums[minDeque.peekFirst()] > limit) {\n        if (maxDeque.peekFirst() == left) maxDeque.pollFirst();\n        if (minDeque.peekFirst() == left) minDeque.pollFirst();\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestSubarray(int[] nums, int limit) {\n    return scan(nums, limit, 0, 0, 0, new ArrayDeque<>(), new ArrayDeque<>());\n  }\n\n  private int scan(int[] nums, int limit, int right, int left, int best, Deque<Integer> maxDeque, Deque<Integer> minDeque) {\n    if (right == nums.length) return best;\n    push(nums, right, maxDeque, minDeque);\n    return shrink(nums, limit, right, left, best, maxDeque, minDeque);\n  }\n\n  private void push(int[] nums, int right, Deque<Integer> maxDeque, Deque<Integer> minDeque) {\n    while (!maxDeque.isEmpty() && nums[maxDeque.peekLast()] < nums[right]) maxDeque.pollLast();\n    while (!minDeque.isEmpty() && nums[minDeque.peekLast()] > nums[right]) minDeque.pollLast();\n    maxDeque.offerLast(right);\n    minDeque.offerLast(right);\n  }\n\n  private int shrink(int[] nums, int limit, int right, int left, int best, Deque<Integer> maxDeque, Deque<Integer> minDeque) {\n    if (nums[maxDeque.peekFirst()] - nums[minDeque.peekFirst()] > limit) {\n      if (maxDeque.peekFirst() == left) maxDeque.pollFirst();\n      if (minDeque.peekFirst() == left) minDeque.pollFirst();\n      return shrink(nums, limit, right, left + 1, best, maxDeque, minDeque);\n    }\n    return scan(nums, limit, right + 1, left, Math.max(best, right - left + 1), maxDeque, minDeque);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int longestSubarray(int[] nums, int limit) {\n    Deque<Integer> maxDeque = new ArrayDeque<>();\n    Deque<Integer> minDeque = new ArrayDeque<>();\n    int left = 0;\n    int best = 0;\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!maxDeque.isEmpty() && nums[maxDeque.peekLast()] < nums[right]) maxDeque.pollLast();\n      while (!minDeque.isEmpty() && nums[minDeque.peekLast()] > nums[right]) minDeque.pollLast();\n      maxDeque.offerLast(right);\n      minDeque.offerLast(right);\n\n      while (nums[maxDeque.peekFirst()] - nums[minDeque.peekFirst()] > limit) {\n        if (maxDeque.peekFirst() == left) maxDeque.pollFirst();\n        if (minDeque.peekFirst() == left) minDeque.pollFirst();\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Operations to Reduce X to Zero",
      "difficulty": "Medium",
      "subpattern": "Longest complement sum window",
      "question": "Given nums and x, remove elements only from the left or right end so the removed sum is exactly x. Return the minimum number of removals, or -1 if impossible.",
      "trigger": "Removing ends with sum x is equivalent to keeping the longest middle window whose sum is total - x.",
      "intuition": "Because nums are positive, expand the middle window and shrink while its sum exceeds target. Maximize kept length.",
      "edgeCases": "x greater than total, x equals total, no target window, target window is whole array, single element, and all positive values.",
      "constraints": "1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^4; 1 <= x <= 10^9.",
      "source": {
        "label": "LeetCode 1658 - Minimum Operations to Reduce X to Zero",
        "url": "https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/"
      },
      "examples": [
        {
          "input": "nums = [1,1,4,2,3], x = 5",
          "output": "2",
          "explanation": "Keep [1,1,4] with sum 6, so remove 2 and 3."
        },
        {
          "input": "nums = [5,6,7,8,9], x = 4",
          "output": "-1",
          "explanation": "No removed-end sum can equal 4."
        },
        {
          "input": "nums = [3,2,20,1,1,3], x = 10",
          "output": "5",
          "explanation": "Keep [20], so remove five elements."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n    int longest = -1;\n\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum == target) longest = Math.max(longest, end - start + 1);\n      }\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n    if (target < 0) return -1;\n\n    int left = 0;\n    int sum = 0;\n    int longest = -1;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum > target && left <= right) {\n        sum -= nums[left++];\n      }\n      if (sum == target) longest = Math.max(longest, right - left + 1);\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n    if (target < 0) return -1;\n\n    int left = 0;\n    int sum = 0;\n    int longest = -1;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum > target && left <= right) {\n        sum -= nums[left++];\n      }\n      if (sum == target) longest = Math.max(longest, right - left + 1);\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = sum(nums, 0);\n    int target = total - x;\n    if (target < 0) return -1;\n    int longest = scan(nums, target, 0, 0, 0, -1);\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n\n  private int sum(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + sum(nums, index + 1);\n  }\n\n  private int scan(int[] nums, int target, int right, int left, int windowSum, int longest) {\n    if (right == nums.length) return longest;\n    return shrink(nums, target, right, left, windowSum + nums[right], longest);\n  }\n\n  private int shrink(int[] nums, int target, int right, int left, int windowSum, int longest) {\n    if (windowSum > target && left <= right) {\n      return shrink(nums, target, right, left + 1, windowSum - nums[left], longest);\n    }\n    int nextLongest = windowSum == target ? Math.max(longest, right - left + 1) : longest;\n    return scan(nums, target, right + 1, left, windowSum, nextLongest);\n  }\n}",
      "code": "class Solution {\n  public int minOperations(int[] nums, int x) {\n    int total = 0;\n    for (int num : nums) total += num;\n    int target = total - x;\n    if (target < 0) return -1;\n\n    int left = 0;\n    int sum = 0;\n    int longest = -1;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum > target && left <= right) {\n        sum -= nums[left++];\n      }\n      if (sum == target) longest = Math.max(longest, right - left + 1);\n    }\n    return longest == -1 ? -1 : nums.length - longest;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Binary Subarrays With Sum",
      "difficulty": "Medium",
      "subpattern": "At most sum counting window",
      "question": "Given a binary array nums and an integer goal, return the number of non-empty subarrays with sum equal to goal.",
      "trigger": "For binary arrays, number with exact sum goal equals atMost(goal) - atMost(goal - 1), and atMost can be maintained by a shrinking window.",
      "intuition": "Count all windows ending at right with sum at most k. Subtract the count with sum at most goal - 1.",
      "edgeCases": "goal = 0, all zeros, all ones, long zero stretches, single element, and goal larger than number of ones.",
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
          "explanation": "The valid subarrays are [1,1] at positions 0..1 and 1..2."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    int count = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum == goal) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    return atMost(nums, goal) - atMost(nums, goal - 1);\n  }\n\n  private int atMost(int[] nums, int goal) {\n    if (goal < 0) return 0;\n    int left = 0;\n    int sum = 0;\n    int count = 0;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum > goal) {\n        sum -= nums[left++];\n      }\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    return atMost(nums, goal) - atMost(nums, goal - 1);\n  }\n\n  private int atMost(int[] nums, int goal) {\n    if (goal < 0) return 0;\n    int left = 0;\n    int sum = 0;\n    int count = 0;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum > goal) {\n        sum -= nums[left++];\n      }\n      count += right - left + 1;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    return atMost(nums, goal, 0, 0, 0, 0) - atMost(nums, goal - 1, 0, 0, 0, 0);\n  }\n\n  private int atMost(int[] nums, int goal, int right, int left, int sum, int count) {\n    if (goal < 0) return 0;\n    if (right == nums.length) return count;\n    return shrink(nums, goal, right, left, sum + nums[right], count);\n  }\n\n  private int shrink(int[] nums, int goal, int right, int left, int sum, int count) {\n    if (sum > goal) return shrink(nums, goal, right, left + 1, sum - nums[left], count);\n    return atMost(nums, goal, right + 1, left, sum, count + right - left + 1);\n  }\n}",
      "code": "class Solution {\n  public int numSubarraysWithSum(int[] nums, int goal) {\n    return atMost(nums, goal) - atMost(nums, goal - 1);\n  }\n\n  private int atMost(int[] nums, int goal) {\n    if (goal < 0) return 0;\n    int left = 0;\n    int sum = 0;\n    int count = 0;\n    for (int right = 0; right < nums.length; right++) {\n      sum += nums[right];\n      while (sum > goal) {\n        sum -= nums[left++];\n      }\n      count += right - left + 1;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Get Equal Substrings Within Budget",
      "difficulty": "Medium",
      "subpattern": "Cost-bounded variable window",
      "question": "Given strings s and t of equal length and maxCost, return the maximum length substring of s that can be changed to the corresponding substring of t with total cost at most maxCost.",
      "trigger": "Each index has a conversion cost, and the longest contiguous range must have total cost within a budget.",
      "intuition": "Expand by adding current cost. While budget is exceeded, remove costs from the left.",
      "edgeCases": "maxCost = 0, all costs fit, no positive-length costly window fits, identical strings, single character, and large budget.",
      "constraints": "1 <= s.length == t.length <= 10^5; 0 <= maxCost <= 10^6; s and t contain lowercase English letters.",
      "source": {
        "label": "LeetCode 1208 - Get Equal Substrings Within Budget",
        "url": "https://leetcode.com/problems/get-equal-substrings-within-budget/"
      },
      "examples": [
        {
          "input": "s = \"abcd\", t = \"bcdf\", maxCost = 3",
          "output": "3",
          "explanation": "The substring \"abc\" costs 1 + 1 + 1 = 3."
        },
        {
          "input": "s = \"abcd\", t = \"cdef\", maxCost = 3",
          "output": "1",
          "explanation": "Any two-character substring costs more than 3."
        },
        {
          "input": "s = \"abcd\", t = \"acde\", maxCost = 0",
          "output": "1",
          "explanation": "Only unchanged characters can be included."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int equalSubstring(String s, String t, int maxCost) {\n    int best = 0;\n    for (int start = 0; start < s.length(); start++) {\n      int cost = 0;\n      for (int end = start; end < s.length(); end++) {\n        cost += Math.abs(s.charAt(end) - t.charAt(end));\n        if (cost <= maxCost) best = Math.max(best, end - start + 1);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int equalSubstring(String s, String t, int maxCost) {\n    int left = 0;\n    int cost = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      cost += Math.abs(s.charAt(right) - t.charAt(right));\n      while (cost > maxCost) {\n        cost -= Math.abs(s.charAt(left) - t.charAt(left));\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int equalSubstring(String s, String t, int maxCost) {\n    int left = 0;\n    int cost = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      cost += Math.abs(s.charAt(right) - t.charAt(right));\n      while (cost > maxCost) {\n        cost -= Math.abs(s.charAt(left) - t.charAt(left));\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int equalSubstring(String s, String t, int maxCost) {\n    return scan(s, t, maxCost, 0, 0, 0, 0);\n  }\n\n  private int scan(String s, String t, int maxCost, int right, int left, int cost, int best) {\n    if (right == s.length()) return best;\n    int nextCost = cost + Math.abs(s.charAt(right) - t.charAt(right));\n    return shrink(s, t, maxCost, right, left, nextCost, best);\n  }\n\n  private int shrink(String s, String t, int maxCost, int right, int left, int cost, int best) {\n    if (cost > maxCost) {\n      int removed = Math.abs(s.charAt(left) - t.charAt(left));\n      return shrink(s, t, maxCost, right, left + 1, cost - removed, best);\n    }\n    return scan(s, t, maxCost, right + 1, left, cost, Math.max(best, right - left + 1));\n  }\n}",
      "code": "class Solution {\n  public int equalSubstring(String s, String t, int maxCost) {\n    int left = 0;\n    int cost = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      cost += Math.abs(s.charAt(right) - t.charAt(right));\n      while (cost > maxCost) {\n        cost -= Math.abs(s.charAt(left) - t.charAt(left));\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Replace the Substring for Balanced String",
      "difficulty": "Medium",
      "subpattern": "Outside-count satisfying window",
      "question": "Given a string s containing only Q, W, E, R, replace one substring with any string of the same length so each character appears n / 4 times. Return the minimum substring length.",
      "trigger": "A window is replaceable when the counts outside that window are already no more than the required quota.",
      "intuition": "Track outside counts. Expand right by moving chars into the replace window, then shrink while outside counts are valid.",
      "edgeCases": "Already balanced string, one overrepresented character, whole string replacement, repeated valid windows, and n divisible by 4.",
      "constraints": "4 <= s.length <= 10^5; s.length is divisible by 4; s contains only Q, W, E, R.",
      "source": {
        "label": "LeetCode 1234 - Replace the Substring for Balanced String",
        "url": "https://leetcode.com/problems/replace-the-substring-for-balanced-string/"
      },
      "examples": [
        {
          "input": "s = \"QWER\"",
          "output": "0",
          "explanation": "The string is already balanced."
        },
        {
          "input": "s = \"QQWE\"",
          "output": "1",
          "explanation": "Replacing one Q is enough."
        },
        {
          "input": "s = \"QQQW\"",
          "output": "2",
          "explanation": "A length-2 substring can be replaced to balance all counts."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) because alphabet size is constant.",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack; character counts use O(1).",
      "bruteForceCode": "class Solution {\n  public int balancedString(String s) {\n    int n = s.length();\n    int answer = n;\n    for (int left = 0; left < n; left++) {\n      for (int right = left; right < n; right++) {\n        if (canReplace(s, left, right)) {\n          answer = Math.min(answer, right - left + 1);\n        }\n      }\n    }\n    return canReplace(s, 0, -1) ? 0 : answer;\n  }\n\n  private boolean canReplace(String s, int left, int right) {\n    int[] count = new int[128];\n    for (int i = 0; i < s.length(); i++) {\n      if (i < left || i > right) count[s.charAt(i)]++;\n    }\n    int quota = s.length() / 4;\n    return count['Q'] <= quota && count['W'] <= quota && count['E'] <= quota && count['R'] <= quota;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int balancedString(String s) {\n    int n = s.length();\n    int quota = n / 4;\n    int[] outside = new int[128];\n    for (char c : s.toCharArray()) outside[c]++;\n    if (valid(outside, quota)) return 0;\n\n    int answer = n;\n    int left = 0;\n    for (int right = 0; right < n; right++) {\n      outside[s.charAt(right)]--;\n      while (left <= right && valid(outside, quota)) {\n        answer = Math.min(answer, right - left + 1);\n        outside[s.charAt(left)]++;\n        left++;\n      }\n    }\n    return answer;\n  }\n\n  private boolean valid(int[] count, int quota) {\n    return count['Q'] <= quota && count['W'] <= quota && count['E'] <= quota && count['R'] <= quota;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int balancedString(String s) {\n    int n = s.length();\n    int quota = n / 4;\n    int[] outside = new int[128];\n    for (char c : s.toCharArray()) outside[c]++;\n    if (valid(outside, quota)) return 0;\n\n    int answer = n;\n    int left = 0;\n    for (int right = 0; right < n; right++) {\n      outside[s.charAt(right)]--;\n      while (left <= right && valid(outside, quota)) {\n        answer = Math.min(answer, right - left + 1);\n        outside[s.charAt(left)]++;\n        left++;\n      }\n    }\n    return answer;\n  }\n\n  private boolean valid(int[] count, int quota) {\n    return count['Q'] <= quota && count['W'] <= quota && count['E'] <= quota && count['R'] <= quota;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int balancedString(String s) {\n    int[] outside = new int[128];\n    fill(s, outside, 0);\n    int quota = s.length() / 4;\n    if (valid(outside, quota)) return 0;\n    return scan(s, quota, outside, 0, 0, s.length());\n  }\n\n  private void fill(String s, int[] outside, int index) {\n    if (index == s.length()) return;\n    outside[s.charAt(index)]++;\n    fill(s, outside, index + 1);\n  }\n\n  private int scan(String s, int quota, int[] outside, int right, int left, int answer) {\n    if (right == s.length()) return answer;\n    outside[s.charAt(right)]--;\n    return shrink(s, quota, outside, right, left, answer);\n  }\n\n  private int shrink(String s, int quota, int[] outside, int right, int left, int answer) {\n    if (left <= right && valid(outside, quota)) {\n      int nextAnswer = Math.min(answer, right - left + 1);\n      outside[s.charAt(left)]++;\n      return shrink(s, quota, outside, right, left + 1, nextAnswer);\n    }\n    return scan(s, quota, outside, right + 1, left, answer);\n  }\n\n  private boolean valid(int[] count, int quota) {\n    return count['Q'] <= quota && count['W'] <= quota && count['E'] <= quota && count['R'] <= quota;\n  }\n}",
      "code": "class Solution {\n  public int balancedString(String s) {\n    int n = s.length();\n    int quota = n / 4;\n    int[] outside = new int[128];\n    for (char c : s.toCharArray()) outside[c]++;\n    if (valid(outside, quota)) return 0;\n\n    int answer = n;\n    int left = 0;\n    for (int right = 0; right < n; right++) {\n      outside[s.charAt(right)]--;\n      while (left <= right && valid(outside, quota)) {\n        answer = Math.min(answer, right - left + 1);\n        outside[s.charAt(left)]++;\n        left++;\n      }\n    }\n    return answer;\n  }\n\n  private boolean valid(int[] count, int quota) {\n    return count['Q'] <= quota && count['W'] <= quota && count['E'] <= quota && count['R'] <= quota;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "K Radius Subarray Averages",
      "difficulty": "Medium",
      "subpattern": "Fixed radius sum window",
      "question": "Given nums and k, return an array where answer[i] is the average of the subarray centered at i with radius k, or -1 if the full radius does not fit.",
      "trigger": "Every valid center needs a fixed-size window of length 2k + 1.",
      "intuition": "Maintain one fixed-length sum. When the window reaches length 2k + 1, write the average at its center and slide by one.",
      "edgeCases": "k = 0, window longer than nums, large sums requiring long, boundary centers, and integer division.",
      "constraints": "1 <= nums.length <= 10^5; 0 <= nums[i], k <= 10^5.",
      "source": {
        "label": "LeetCode 2090 - K Radius Subarray Averages",
        "url": "https://leetcode.com/problems/k-radius-subarray-averages/"
      },
      "examples": [
        {
          "input": "nums = [7,4,3,9,1,8,5,2,6], k = 3",
          "output": "[-1,-1,-1,5,4,4,-1,-1,-1]",
          "explanation": "Only centers 3, 4, and 5 have full radius-3 windows."
        },
        {
          "input": "nums = [100000], k = 0",
          "output": "[100000]",
          "explanation": "Radius 0 averages the element itself."
        },
        {
          "input": "nums = [8], k = 100000",
          "output": "[-1]",
          "explanation": "The required window does not fit."
        }
      ],
      "bruteForceComplexity": "Time O(n*k) in the worst case, Space O(n) for output.",
      "optimizedComplexity": "Time O(n), Space O(n) for output; O(1) extra window state.",
      "recursiveComplexity": "Time O(n), Space O(n) output plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int[] ans = new int[nums.length];\n    Arrays.fill(ans, -1);\n    int length = 2 * k + 1;\n    for (int center = k; center + k < nums.length; center++) {\n      long sum = 0;\n      for (int i = center - k; i <= center + k; i++) {\n        sum += nums[i];\n      }\n      ans[center] = (int) (sum / length);\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    Arrays.fill(ans, -1);\n    int length = 2 * k + 1;\n    if (length > n) return ans;\n\n    long sum = 0;\n    for (int right = 0; right < n; right++) {\n      sum += nums[right];\n      if (right >= length) sum -= nums[right - length];\n      if (right >= length - 1) {\n        int center = right - k;\n        ans[center] = (int) (sum / length);\n      }\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    Arrays.fill(ans, -1);\n    int length = 2 * k + 1;\n    if (length > n) return ans;\n\n    long sum = 0;\n    for (int right = 0; right < n; right++) {\n      sum += nums[right];\n      if (right >= length) sum -= nums[right - length];\n      if (right >= length - 1) {\n        int center = right - k;\n        ans[center] = (int) (sum / length);\n      }\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int[] ans = new int[nums.length];\n    Arrays.fill(ans, -1);\n    int length = 2 * k + 1;\n    if (length > nums.length) return ans;\n    fill(nums, ans, k, length, 0, 0L);\n    return ans;\n  }\n\n  private void fill(int[] nums, int[] ans, int k, int length, int right, long sum) {\n    if (right == nums.length) return;\n    long nextSum = sum + nums[right];\n    if (right >= length) nextSum -= nums[right - length];\n    if (right >= length - 1) {\n      ans[right - k] = (int) (nextSum / length);\n    }\n    fill(nums, ans, k, length, right + 1, nextSum);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    Arrays.fill(ans, -1);\n    int length = 2 * k + 1;\n    if (length > n) return ans;\n\n    long sum = 0;\n    for (int right = 0; right < n; right++) {\n      sum += nums[right];\n      if (right >= length) sum -= nums[right - length];\n      if (right >= length - 1) {\n        int center = right - k;\n        ans[center] = (int) (sum / length);\n      }\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Defuse the Bomb",
      "difficulty": "Easy",
      "subpattern": "Circular fixed window",
      "question": "Given a circular array code and integer k, replace each element by the sum of the next k elements if k > 0, previous k elements if k < 0, or 0 if k = 0.",
      "trigger": "Each answer is a fixed-size circular neighbor window.",
      "intuition": "Duplicate traversal with modulo and maintain the next or previous k-sum instead of recomputing for every index.",
      "edgeCases": "k = 0, k positive, k negative, wraparound at both ends, n = 1 is not allowed by constraints but small n still wraps.",
      "constraints": "2 <= code.length <= 100; 1 <= code[i] <= 100; -(code.length - 1) <= k <= code.length - 1.",
      "source": {
        "label": "LeetCode 1652 - Defuse the Bomb",
        "url": "https://leetcode.com/problems/defuse-the-bomb/"
      },
      "examples": [
        {
          "input": "code = [5,7,1,4], k = 3",
          "output": "[12,10,16,13]",
          "explanation": "Each element becomes the sum of the next three circular elements."
        },
        {
          "input": "code = [1,2,3,4], k = 0",
          "output": "[0,0,0,0]",
          "explanation": "k = 0 forces every answer to 0."
        },
        {
          "input": "code = [2,4,9,3], k = -2",
          "output": "[12,5,6,13]",
          "explanation": "Each element uses the previous two circular elements."
        }
      ],
      "bruteForceComplexity": "Time O(n*|k|), Space O(n) for output.",
      "optimizedComplexity": "Time O(n), Space O(n) for output.",
      "recursiveComplexity": "Time O(n), Space O(n) output plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int[] decrypt(int[] code, int k) {\n    int n = code.length;\n    int[] ans = new int[n];\n    if (k == 0) return ans;\n\n    for (int i = 0; i < n; i++) {\n      int sum = 0;\n      for (int step = 1; step <= Math.abs(k); step++) {\n        int index = k > 0 ? (i + step) % n : (i - step + n) % n;\n        sum += code[index];\n      }\n      ans[i] = sum;\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] decrypt(int[] code, int k) {\n    int n = code.length;\n    int[] ans = new int[n];\n    if (k == 0) return ans;\n\n    int start = k > 0 ? 1 : n + k;\n    int end = k > 0 ? k : n - 1;\n    int sum = 0;\n    for (int i = start; i <= end; i++) {\n      sum += code[i % n];\n    }\n\n    for (int i = 0; i < n; i++) {\n      ans[i] = sum;\n      sum -= code[start % n];\n      start++;\n      end++;\n      sum += code[end % n];\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] decrypt(int[] code, int k) {\n    int n = code.length;\n    int[] ans = new int[n];\n    if (k == 0) return ans;\n\n    int start = k > 0 ? 1 : n + k;\n    int end = k > 0 ? k : n - 1;\n    int sum = 0;\n    for (int i = start; i <= end; i++) {\n      sum += code[i % n];\n    }\n\n    for (int i = 0; i < n; i++) {\n      ans[i] = sum;\n      sum -= code[start % n];\n      start++;\n      end++;\n      sum += code[end % n];\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] decrypt(int[] code, int k) {\n    int[] ans = new int[code.length];\n    if (k == 0) return ans;\n    int n = code.length;\n    int start = k > 0 ? 1 : n + k;\n    int end = k > 0 ? k : n - 1;\n    int sum = initial(code, start, end, 0);\n    fill(code, ans, 0, start, end, sum);\n    return ans;\n  }\n\n  private int initial(int[] code, int index, int end, int sum) {\n    if (index > end) return sum;\n    return initial(code, index + 1, end, sum + code[index % code.length]);\n  }\n\n  private void fill(int[] code, int[] ans, int index, int start, int end, int sum) {\n    if (index == code.length) return;\n    ans[index] = sum;\n    int nextSum = sum - code[start % code.length] + code[(end + 1) % code.length];\n    fill(code, ans, index + 1, start + 1, end + 1, nextSum);\n  }\n}",
      "code": "class Solution {\n  public int[] decrypt(int[] code, int k) {\n    int n = code.length;\n    int[] ans = new int[n];\n    if (k == 0) return ans;\n\n    int start = k > 0 ? 1 : n + k;\n    int end = k > 0 ? k : n - 1;\n    int sum = 0;\n    for (int i = start; i <= end; i++) {\n      sum += code[i % n];\n    }\n\n    for (int i = 0; i < n; i++) {\n      ans[i] = sum;\n      sum -= code[start % n];\n      start++;\n      end++;\n      sum += code[end % n];\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Maximum Number of Vowels in a Substring of Given Length",
      "difficulty": "Medium",
      "subpattern": "Fixed-size count window",
      "question": "Given a string s and integer k, return the maximum number of vowels in any substring of length k.",
      "trigger": "Every candidate substring has the same fixed length k, so slide one count window across the string.",
      "intuition": "Add the entering character, remove the character that falls out after k positions, and track the maximum vowel count.",
      "edgeCases": "k = 1, k = s.length, no vowels, all vowels, vowels entering/leaving at the same step, and uppercase not present.",
      "constraints": "1 <= s.length <= 10^5; s contains lowercase English letters; 1 <= k <= s.length.",
      "source": {
        "label": "LeetCode 1456 - Maximum Number of Vowels in a Substring of Given Length",
        "url": "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/"
      },
      "examples": [
        {
          "input": "s = \"abciiidef\", k = 3",
          "output": "3",
          "explanation": "The substring \"iii\" has three vowels."
        },
        {
          "input": "s = \"aeiou\", k = 2",
          "output": "2",
          "explanation": "Every length-2 substring has two vowels."
        },
        {
          "input": "s = \"leetcode\", k = 3",
          "output": "2",
          "explanation": "The substring \"lee\" has two vowels."
        }
      ],
      "bruteForceComplexity": "Time O(n*k), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int maxVowels(String s, int k) {\n    int best = 0;\n    for (int start = 0; start + k <= s.length(); start++) {\n      int count = 0;\n      for (int i = start; i < start + k; i++) {\n        if (isVowel(s.charAt(i))) count++;\n      }\n      best = Math.max(best, count);\n    }\n    return best;\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxVowels(String s, int k) {\n    int count = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      if (isVowel(s.charAt(right))) count++;\n      if (right >= k && isVowel(s.charAt(right - k))) count--;\n      if (right >= k - 1) best = Math.max(best, count);\n    }\n    return best;\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxVowels(String s, int k) {\n    int count = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      if (isVowel(s.charAt(right))) count++;\n      if (right >= k && isVowel(s.charAt(right - k))) count--;\n      if (right >= k - 1) best = Math.max(best, count);\n    }\n    return best;\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxVowels(String s, int k) {\n    return scan(s, k, 0, 0, 0);\n  }\n\n  private int scan(String s, int k, int right, int count, int best) {\n    if (right == s.length()) return best;\n    int nextCount = count + (isVowel(s.charAt(right)) ? 1 : 0);\n    if (right >= k && isVowel(s.charAt(right - k))) nextCount--;\n    int nextBest = right >= k - 1 ? Math.max(best, nextCount) : best;\n    return scan(s, k, right + 1, nextCount, nextBest);\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}",
      "code": "class Solution {\n  public int maxVowels(String s, int k) {\n    int count = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      if (isVowel(s.charAt(right))) count++;\n      if (right >= k && isVowel(s.charAt(right - k))) count--;\n      if (right >= k - 1) best = Math.max(best, count);\n    }\n    return best;\n  }\n\n  private boolean isVowel(char ch) {\n    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Diet Plan Performance",
      "difficulty": "Easy",
      "subpattern": "Fixed-size score window",
      "question": "Given calories, k, lower, and upper, score each length-k period: +1 if sum > upper, -1 if sum < lower, else 0. Return total score.",
      "trigger": "Every period has fixed size k and only its sum matters.",
      "intuition": "Maintain one rolling k-day calorie sum and score it once the window reaches size k.",
      "edgeCases": "k = 1, k = calories.length, sum exactly lower, sum exactly upper, all penalties, and all rewards.",
      "constraints": "1 <= k <= calories.length <= 10^5; 0 <= calories[i] <= 20000; 0 <= lower <= upper.",
      "source": {
        "label": "LeetCode 1176 - Diet Plan Performance",
        "url": "https://leetcode.com/problems/diet-plan-performance/"
      },
      "examples": [
        {
          "input": "calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3",
          "output": "0",
          "explanation": "Scores are -1, -1, 0, +1, +1."
        },
        {
          "input": "calories = [3,2], k = 2, lower = 0, upper = 1",
          "output": "1",
          "explanation": "The only window sum is 5, above upper."
        },
        {
          "input": "calories = [6,5,0,0], k = 2, lower = 1, upper = 5",
          "output": "0",
          "explanation": "Scores are +1, 0, -1."
        }
      ],
      "bruteForceComplexity": "Time O(n*k), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {\n    int points = 0;\n    for (int start = 0; start + k <= calories.length; start++) {\n      int sum = 0;\n      for (int i = start; i < start + k; i++) sum += calories[i];\n      if (sum < lower) points--;\n      else if (sum > upper) points++;\n    }\n    return points;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {\n    int sum = 0;\n    int points = 0;\n    for (int right = 0; right < calories.length; right++) {\n      sum += calories[right];\n      if (right >= k) sum -= calories[right - k];\n      if (right >= k - 1) {\n        if (sum < lower) points--;\n        else if (sum > upper) points++;\n      }\n    }\n    return points;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {\n    int sum = 0;\n    int points = 0;\n    for (int right = 0; right < calories.length; right++) {\n      sum += calories[right];\n      if (right >= k) sum -= calories[right - k];\n      if (right >= k - 1) {\n        if (sum < lower) points--;\n        else if (sum > upper) points++;\n      }\n    }\n    return points;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {\n    return scan(calories, k, lower, upper, 0, 0, 0);\n  }\n\n  private int scan(int[] calories, int k, int lower, int upper, int right, int sum, int points) {\n    if (right == calories.length) return points;\n    int nextSum = sum + calories[right];\n    if (right >= k) nextSum -= calories[right - k];\n    int nextPoints = points;\n    if (right >= k - 1) {\n      if (nextSum < lower) nextPoints--;\n      else if (nextSum > upper) nextPoints++;\n    }\n    return scan(calories, k, lower, upper, right + 1, nextSum, nextPoints);\n  }\n}",
      "code": "class Solution {\n  public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {\n    int sum = 0;\n    int points = 0;\n    for (int right = 0; right < calories.length; right++) {\n      sum += calories[right];\n      if (right >= k) sum -= calories[right - k];\n      if (right >= k - 1) {\n        if (sum < lower) points--;\n        else if (sum > upper) points++;\n      }\n    }\n    return points;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Longest Nice Subarray",
      "difficulty": "Medium",
      "subpattern": "Bitmask conflict window",
      "question": "Given nums, return the length of the longest subarray where every pair of elements has bitwise AND equal to 0.",
      "trigger": "A window is valid when no bit is set in more than one element; conflicts can be detected with a bitmask.",
      "intuition": "Keep OR mask of current window. Before adding nums[right], remove from left while it shares a bit with the mask.",
      "edgeCases": "Single element, repeated same bit, all powers of two, large values up to 10^9, and conflicts that require multiple removals.",
      "constraints": "1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^9.",
      "source": {
        "label": "LeetCode 2401 - Longest Nice Subarray",
        "url": "https://leetcode.com/problems/longest-nice-subarray/"
      },
      "examples": [
        {
          "input": "nums = [1,3,8,48,10]",
          "output": "3",
          "explanation": "The subarray [3,8,48] is nice."
        },
        {
          "input": "nums = [3,1,5,11,13]",
          "output": "1",
          "explanation": "Every length-2 candidate has a bit conflict."
        },
        {
          "input": "nums = [1,2,4,8]",
          "output": "4",
          "explanation": "All values use disjoint bits."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int longestNiceSubarray(int[] nums) {\n    int best = 0;\n    for (int start = 0; start < nums.length; start++) {\n      int mask = 0;\n      for (int end = start; end < nums.length; end++) {\n        if ((mask & nums[end]) != 0) break;\n        mask |= nums[end];\n        best = Math.max(best, end - start + 1);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int longestNiceSubarray(int[] nums) {\n    int left = 0;\n    int mask = 0;\n    int best = 0;\n    for (int right = 0; right < nums.length; right++) {\n      while ((mask & nums[right]) != 0) {\n        mask ^= nums[left];\n        left++;\n      }\n      mask |= nums[right];\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int longestNiceSubarray(int[] nums) {\n    int left = 0;\n    int mask = 0;\n    int best = 0;\n    for (int right = 0; right < nums.length; right++) {\n      while ((mask & nums[right]) != 0) {\n        mask ^= nums[left];\n        left++;\n      }\n      mask |= nums[right];\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int longestNiceSubarray(int[] nums) {\n    return scan(nums, 0, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int right, int left, int mask, int best) {\n    if (right == nums.length) return best;\n    return shrink(nums, right, left, mask, best);\n  }\n\n  private int shrink(int[] nums, int right, int left, int mask, int best) {\n    if ((mask & nums[right]) != 0) {\n      return shrink(nums, right, left + 1, mask ^ nums[left], best);\n    }\n    int nextMask = mask | nums[right];\n    int nextBest = Math.max(best, right - left + 1);\n    return scan(nums, right + 1, left, nextMask, nextBest);\n  }\n}",
      "code": "class Solution {\n  public int longestNiceSubarray(int[] nums) {\n    int left = 0;\n    int mask = 0;\n    int best = 0;\n    for (int right = 0; right < nums.length; right++) {\n      while ((mask & nums[right]) != 0) {\n        mask ^= nums[left];\n        left++;\n      }\n      mask |= nums[right];\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Count Complete Subarrays in an Array",
      "difficulty": "Medium",
      "subpattern": "All distinct values window",
      "question": "Given nums, return the number of subarrays whose number of distinct elements equals the number of distinct elements in the whole array.",
      "trigger": "A complete window is valid once it contains all globally distinct values; then every extension to the right is also complete.",
      "intuition": "Know the required distinct count. Expand until the window is complete, then shrink left while adding all right extensions.",
      "edgeCases": "All elements same, all elements distinct, duplicates clustered, smallest array, and repeated valid windows.",
      "constraints": "1 <= nums.length <= 1000; 1 <= nums[i] <= 2000.",
      "source": {
        "label": "LeetCode 2799 - Count Complete Subarrays in an Array",
        "url": "https://leetcode.com/problems/count-complete-subarrays-in-an-array/"
      },
      "examples": [
        {
          "input": "nums = [1,3,1,2,2]",
          "output": "4",
          "explanation": "The full array has three distinct values; four subarrays contain all three."
        },
        {
          "input": "nums = [5,5,5,5]",
          "output": "10",
          "explanation": "Every subarray is complete because the global distinct count is one."
        },
        {
          "input": "nums = [1,2,3]",
          "output": "1",
          "explanation": "Only the full array contains all three distinct values."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(n).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) map plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countCompleteSubarrays(int[] nums) {\n    Set<Integer> all = new HashSet<>();\n    for (int num : nums) all.add(num);\n    int required = all.size();\n    int count = 0;\n\n    for (int start = 0; start < nums.length; start++) {\n      Set<Integer> seen = new HashSet<>();\n      for (int end = start; end < nums.length; end++) {\n        seen.add(nums[end]);\n        if (seen.size() == required) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countCompleteSubarrays(int[] nums) {\n    Set<Integer> all = new HashSet<>();\n    for (int num : nums) all.add(num);\n    int required = all.size();\n\n    Map<Integer, Integer> freq = new HashMap<>();\n    int left = 0;\n    int count = 0;\n    for (int right = 0; right < nums.length; right++) {\n      freq.put(nums[right], freq.getOrDefault(nums[right], 0) + 1);\n      while (freq.size() == required) {\n        count += nums.length - right;\n        int value = nums[left++];\n        freq.put(value, freq.get(value) - 1);\n        if (freq.get(value) == 0) freq.remove(value);\n      }\n    }\n    return count;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countCompleteSubarrays(int[] nums) {\n    Set<Integer> all = new HashSet<>();\n    for (int num : nums) all.add(num);\n    int required = all.size();\n\n    Map<Integer, Integer> freq = new HashMap<>();\n    int left = 0;\n    int count = 0;\n    for (int right = 0; right < nums.length; right++) {\n      freq.put(nums[right], freq.getOrDefault(nums[right], 0) + 1);\n      while (freq.size() == required) {\n        count += nums.length - right;\n        int value = nums[left++];\n        freq.put(value, freq.get(value) - 1);\n        if (freq.get(value) == 0) freq.remove(value);\n      }\n    }\n    return count;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countCompleteSubarrays(int[] nums) {\n    Set<Integer> all = new HashSet<>();\n    for (int num : nums) all.add(num);\n    return scan(nums, all.size(), 0, 0, 0, new HashMap<>());\n  }\n\n  private int scan(int[] nums, int required, int right, int left, int count, Map<Integer, Integer> freq) {\n    if (right == nums.length) return count;\n    freq.put(nums[right], freq.getOrDefault(nums[right], 0) + 1);\n    return shrink(nums, required, right, left, count, freq);\n  }\n\n  private int shrink(int[] nums, int required, int right, int left, int count, Map<Integer, Integer> freq) {\n    if (freq.size() == required) {\n      int value = nums[left];\n      freq.put(value, freq.get(value) - 1);\n      if (freq.get(value) == 0) freq.remove(value);\n      return shrink(nums, required, right, left + 1, count + nums.length - right, freq);\n    }\n    return scan(nums, required, right + 1, left, count, freq);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countCompleteSubarrays(int[] nums) {\n    Set<Integer> all = new HashSet<>();\n    for (int num : nums) all.add(num);\n    int required = all.size();\n\n    Map<Integer, Integer> freq = new HashMap<>();\n    int left = 0;\n    int count = 0;\n    for (int right = 0; right < nums.length; right++) {\n      freq.put(nums[right], freq.getOrDefault(nums[right], 0) + 1);\n      while (freq.size() == required) {\n        count += nums.length - right;\n        int value = nums[left++];\n        freq.put(value, freq.get(value) - 1);\n        if (freq.get(value) == 0) freq.remove(value);\n      }\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Take K of Each Character From Left and Right",
      "difficulty": "Medium",
      "subpattern": "Complement valid middle window",
      "question": "Given a string s containing only a, b, c, take characters from the left and/or right so at least k of each character are taken. Return the minimum minutes, or -1 if impossible.",
      "trigger": "Taking from both ends is equivalent to leaving one middle window. The left middle window is valid if it leaves enough of each char outside.",
      "intuition": "If total count of each char is at least k, find the longest middle window whose counts do not exceed total[c] - k.",
      "edgeCases": "k = 0, impossible total counts, all characters taken, longest kept window empty, repeated characters, and shrinking multiple times.",
      "constraints": "1 <= s.length <= 10^5; s contains only a, b, c; 0 <= k <= s.length.",
      "source": {
        "label": "LeetCode 2516 - Take K of Each Character From Left and Right",
        "url": "https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/"
      },
      "examples": [
        {
          "input": "s = \"aabaaaacaabc\", k = 2",
          "output": "8",
          "explanation": "The longest keepable middle window has length 4, so 12 - 4 = 8."
        },
        {
          "input": "s = \"a\", k = 1",
          "output": "-1",
          "explanation": "There are not enough b and c characters."
        },
        {
          "input": "s = \"abc\", k = 0",
          "output": "0",
          "explanation": "No characters need to be taken."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) recursion stack; counts use O(1).",
      "bruteForceCode": "class Solution {\n  public int takeCharacters(String s, int k) {\n    if (k == 0) return 0;\n    int n = s.length();\n    int bestKeep = -1;\n    int[] total = countAll(s);\n    if (total[0] < k || total[1] < k || total[2] < k) return -1;\n\n    for (int start = 0; start < n; start++) {\n      int[] keep = new int[3];\n      for (int end = start; end < n; end++) {\n        keep[s.charAt(end) - 'a']++;\n        if (keep[0] <= total[0] - k && keep[1] <= total[1] - k && keep[2] <= total[2] - k) {\n          bestKeep = Math.max(bestKeep, end - start + 1);\n        }\n      }\n    }\n    return n - Math.max(bestKeep, 0);\n  }\n\n  private int[] countAll(String s) {\n    int[] total = new int[3];\n    for (char c : s.toCharArray()) total[c - 'a']++;\n    return total;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int takeCharacters(String s, int k) {\n    if (k == 0) return 0;\n    int[] total = new int[3];\n    for (char c : s.toCharArray()) total[c - 'a']++;\n    if (total[0] < k || total[1] < k || total[2] < k) return -1;\n\n    int[] keep = new int[3];\n    int left = 0;\n    int bestKeep = 0;\n    for (int right = 0; right < s.length(); right++) {\n      keep[s.charAt(right) - 'a']++;\n      while (keep[0] > total[0] - k || keep[1] > total[1] - k || keep[2] > total[2] - k) {\n        keep[s.charAt(left) - 'a']--;\n        left++;\n      }\n      bestKeep = Math.max(bestKeep, right - left + 1);\n    }\n    return s.length() - bestKeep;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int takeCharacters(String s, int k) {\n    if (k == 0) return 0;\n    int[] total = new int[3];\n    for (char c : s.toCharArray()) total[c - 'a']++;\n    if (total[0] < k || total[1] < k || total[2] < k) return -1;\n\n    int[] keep = new int[3];\n    int left = 0;\n    int bestKeep = 0;\n    for (int right = 0; right < s.length(); right++) {\n      keep[s.charAt(right) - 'a']++;\n      while (keep[0] > total[0] - k || keep[1] > total[1] - k || keep[2] > total[2] - k) {\n        keep[s.charAt(left) - 'a']--;\n        left++;\n      }\n      bestKeep = Math.max(bestKeep, right - left + 1);\n    }\n    return s.length() - bestKeep;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int takeCharacters(String s, int k) {\n    if (k == 0) return 0;\n    int[] total = new int[3];\n    count(s, total, 0);\n    if (total[0] < k || total[1] < k || total[2] < k) return -1;\n    int bestKeep = scan(s, k, total, new int[3], 0, 0, 0);\n    return s.length() - bestKeep;\n  }\n\n  private void count(String s, int[] total, int index) {\n    if (index == s.length()) return;\n    total[s.charAt(index) - 'a']++;\n    count(s, total, index + 1);\n  }\n\n  private int scan(String s, int k, int[] total, int[] keep, int right, int left, int bestKeep) {\n    if (right == s.length()) return bestKeep;\n    keep[s.charAt(right) - 'a']++;\n    return shrink(s, k, total, keep, right, left, bestKeep);\n  }\n\n  private int shrink(String s, int k, int[] total, int[] keep, int right, int left, int bestKeep) {\n    if (keep[0] > total[0] - k || keep[1] > total[1] - k || keep[2] > total[2] - k) {\n      keep[s.charAt(left) - 'a']--;\n      return shrink(s, k, total, keep, right, left + 1, bestKeep);\n    }\n    int nextBest = Math.max(bestKeep, right - left + 1);\n    return scan(s, k, total, keep, right + 1, left, nextBest);\n  }\n}",
      "code": "class Solution {\n  public int takeCharacters(String s, int k) {\n    if (k == 0) return 0;\n    int[] total = new int[3];\n    for (char c : s.toCharArray()) total[c - 'a']++;\n    if (total[0] < k || total[1] < k || total[2] < k) return -1;\n\n    int[] keep = new int[3];\n    int left = 0;\n    int bestKeep = 0;\n    for (int right = 0; right < s.length(); right++) {\n      keep[s.charAt(right) - 'a']++;\n      while (keep[0] > total[0] - k || keep[1] > total[1] - k || keep[2] > total[2] - k) {\n        keep[s.charAt(left) - 'a']--;\n        left++;\n      }\n      bestKeep = Math.max(bestKeep, right - left + 1);\n    }\n    return s.length() - bestKeep;\n  }\n}"
    }
  ],
  "checklist": [
    "Question asks about contiguous subarray or substring.",
    "You can update state when adding one right element and removing one left element.",
    "A brute force solution repeatedly recomputes overlapping ranges.",
    "Window validity can be checked from counts, sum, product, max/min, or distinct count.",
    "Input order matters and sorting would break contiguity."
  ],
  "traps": [
    "Using sliding window with negative numbers when sum monotonicity is required.",
    "Forgetting to shrink until the window is valid.",
    "Off-by-one length errors after moving left.",
    "Not removing zero-count keys from maps.",
    "Using fixed window when variable window is required."
  ],
  "edgeCases": [
    "Empty string where allowed.",
    "k = 0.",
    "k equals array length.",
    "No valid window.",
    "Every window valid.",
    "Duplicate-heavy input."
  ],
  "complexities": [
    "Fixed window: O(n) time, O(1) or O(charset) space.",
    "Variable window: O(n) time because each pointer moves at most n times.",
    "Monotonic deque: O(n) time, O(k) or O(n) space.",
    "Brute force is usually O(n^2) or O(n^3)."
  ],
  "mentalModel": [
    "Right pointer explores new elements.",
    "Left pointer repairs invalid windows.",
    "Window state must be updated symmetrically on add/remove.",
    "Answer updates either when valid, before shrink, or after shrink depending on max/min/count goal.",
    "Never sort if the problem requires contiguous ranges."
  ],
  "revisionStrategy": [
    "Day 1: fixed window and variable sum problems.",
    "Day 3: frequency matching windows.",
    "Day 7: atMost/exactly K conversions.",
    "Day 14: monotonic deque and complement windows.",
    "Day 30: mix all without pattern labels."
  ],
  "unseen": [
    "Longest Substring with At Most Two Distinct Characters",
    "Minimum Recolors to Get K Consecutive Black Blocks",
    "Maximum Erasure Value",
    "Count Subarrays Where Max Element Appears at Least K Times",
    "Longest Semi-Repetitive Substring"
  ]
};
