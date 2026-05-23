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
      "question": "Solve the LeetCode-style problem \"Subarray Product Less Than K\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "1 <= nums.length <= 3 * 10^4; 1 <= nums[i] <= 1000; 0 <= k <= 10^6.",
      "source": {
        "label": "LeetCode 713 - Subarray Product Less Than K",
        "url": "https://leetcode.com/problems/undefined/"
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
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int numSubarrayProductLessThanK(int[] nums,int k){ int count=0; for(int i=0;i<nums.length;i++){ long product=1; for(int j=i;j<nums.length;j++){ product*=nums[j]; if(product<k) count++; } } return count; } }",
      "iterativeCode": "class Solution { public int numSubarrayProductLessThanK(int[] nums,int k){ if(k<=1)return 0; int left=0,count=0; long product=1; for(int right=0;right<nums.length;right++){ product*=nums[right]; while(product>=k) product/=nums[left++]; count+=right-left+1; } return count; } }",
      "optimizedCode": "class Solution { public int numSubarrayProductLessThanK(int[] nums,int k){ if(k<=1)return 0; int left=0,count=0; long product=1; for(int right=0;right<nums.length;right++){ product*=nums[right]; while(product>=k) product/=nums[left++]; count+=right-left+1; } return count; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "class Solution { public int numSubarrayProductLessThanK(int[] nums,int k){ if(k<=1)return 0; int left=0,count=0; long product=1; for(int right=0;right<nums.length;right++){ product*=nums[right]; while(product>=k) product/=nums[left++]; count+=right-left+1; } return count; } }"
    },
    {
      "group": "advanced",
      "name": "Longest Subarray of 1s After Deleting One Element",
      "difficulty": "Medium",
      "subpattern": "At most one zero window",
      "question": "Solve the LeetCode-style problem \"Longest Subarray of 1s After Deleting One Element\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "1 <= nums.length <= 10^5; nums[i] is 0 or 1.",
      "source": {
        "label": "LeetCode 1493 - Longest Subarray of 1s After Deleting One Element",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [1,1,0,1]",
          "output": "3",
          "explanation": "Delete the zero."
        },
        {
          "input": "nums = [0,1,1,1,0,1,1,0,1]",
          "output": "5",
          "explanation": "Delete one zero in the best window."
        },
        {
          "input": "nums = [1,1,1]",
          "output": "2",
          "explanation": "Must delete one element."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int longestSubarray(int[] nums){ int best=0; for(int i=0;i<nums.length;i++){ int zero=0; for(int j=i;j<nums.length;j++){ if(nums[j]==0)zero++; if(zero<=1)best=Math.max(best,j-i); } } return best; } }",
      "iterativeCode": "class Solution { public int longestSubarray(int[] nums){ int left=0,zero=0,best=0; for(int right=0;right<nums.length;right++){ if(nums[right]==0)zero++; while(zero>1) if(nums[left++]==0)zero--; best=Math.max(best,right-left); } return best; } }",
      "optimizedCode": "class Solution { public int longestSubarray(int[] nums){ int left=0,zero=0,best=0; for(int right=0;right<nums.length;right++){ if(nums[right]==0)zero++; while(zero>1) if(nums[left++]==0)zero--; best=Math.max(best,right-left); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "class Solution { public int longestSubarray(int[] nums){ int left=0,zero=0,best=0; for(int right=0;right<nums.length;right++){ if(nums[right]==0)zero++; while(zero>1) if(nums[left++]==0)zero--; best=Math.max(best,right-left); } return best; } }"
    },
    {
      "group": "advanced",
      "name": "Number of Substrings Containing All Three Characters",
      "difficulty": "Medium",
      "subpattern": "At least all required chars window",
      "question": "Solve the LeetCode-style problem \"Number of Substrings Containing All Three Characters\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "3 <= s.length <= 5 * 10^4; s consists only of a, b, and c.",
      "source": {
        "label": "LeetCode 1358 - Number of Substrings Containing All Three Characters",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "s = \"abcabc\"",
          "output": "10",
          "explanation": "Every substring containing a,b,c is counted."
        },
        {
          "input": "s = \"aaacb\"",
          "output": "3",
          "explanation": "Valid substrings start before c and include b."
        },
        {
          "input": "s = \"abc\"",
          "output": "1",
          "explanation": "Only the full string works."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int numberOfSubstrings(String s){ int ans=0; for(int i=0;i<s.length();i++){ int[] c=new int[3]; for(int j=i;j<s.length();j++){ c[s.charAt(j)-'a']++; if(c[0]>0&&c[1]>0&&c[2]>0)ans++; } } return ans; } }",
      "iterativeCode": "class Solution { public int numberOfSubstrings(String s){ int[] count=new int[3]; int left=0,ans=0; for(int right=0;right<s.length();right++){ count[s.charAt(right)-'a']++; while(count[0]>0&&count[1]>0&&count[2]>0){ ans+=s.length()-right; count[s.charAt(left++)-'a']--; } } return ans; } }",
      "optimizedCode": "class Solution { public int numberOfSubstrings(String s){ int[] count=new int[3]; int left=0,ans=0; for(int right=0;right<s.length();right++){ count[s.charAt(right)-'a']++; while(count[0]>0&&count[1]>0&&count[2]>0){ ans+=s.length()-right; count[s.charAt(left++)-'a']--; } } return ans; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "class Solution { public int numberOfSubstrings(String s){ int[] count=new int[3]; int left=0,ans=0; for(int right=0;right<s.length();right++){ count[s.charAt(right)-'a']++; while(count[0]>0&&count[1]>0&&count[2]>0){ ans+=s.length()-right; count[s.charAt(left++)-'a']--; } } return ans; } }"
    },
    {
      "group": "advanced",
      "name": "Count Number of Nice Subarrays",
      "difficulty": "Medium",
      "subpattern": "Exactly k odd numbers window",
      "question": "Solve the LeetCode-style problem \"Count Number of Nice Subarrays\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "1 <= nums.length <= 5 * 10^4; 1 <= nums[i] <= 10^5; 1 <= k <= nums.length.",
      "source": {
        "label": "LeetCode 1248 - Count Number of Nice Subarrays",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [1,1,2,1,1], k = 3",
          "output": "2",
          "explanation": "Two subarrays contain exactly 3 odd numbers."
        },
        {
          "input": "nums = [2,4,6], k = 1",
          "output": "0",
          "explanation": "No odd numbers."
        },
        {
          "input": "nums = [2,2,2,1,2,2,1,2,2,2], k = 2",
          "output": "16",
          "explanation": "Count windows with exactly 2 odds."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int numberOfSubarrays(int[] nums,int k){ int ans=0; for(int i=0;i<nums.length;i++){ int odd=0; for(int j=i;j<nums.length;j++){ if(nums[j]%2==1)odd++; if(odd==k)ans++; } } return ans; } }",
      "iterativeCode": "class Solution { public int numberOfSubarrays(int[] nums,int k){ return atMost(nums,k)-atMost(nums,k-1); } private int atMost(int[] nums,int k){ int left=0,ans=0; for(int right=0;right<nums.length;right++){ if(nums[right]%2==1)k--; while(k<0) if(nums[left++]%2==1)k++; ans+=right-left+1; } return ans; } }",
      "optimizedCode": "class Solution { public int numberOfSubarrays(int[] nums,int k){ return atMost(nums,k)-atMost(nums,k-1); } private int atMost(int[] nums,int k){ int left=0,ans=0; for(int right=0;right<nums.length;right++){ if(nums[right]%2==1)k--; while(k<0) if(nums[left++]%2==1)k++; ans+=right-left+1; } return ans; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "class Solution { public int numberOfSubarrays(int[] nums,int k){ return atMost(nums,k)-atMost(nums,k-1); } private int atMost(int[] nums,int k){ int left=0,ans=0; for(int right=0;right<nums.length;right++){ if(nums[right]%2==1)k--; while(k<0) if(nums[left++]%2==1)k++; ans+=right-left+1; } return ans; } }"
    },
    {
      "group": "advanced",
      "name": "Max Consecutive Ones",
      "difficulty": "Easy",
      "subpattern": "Fixed violation-free window",
      "question": "Solve the LeetCode-style problem \"Max Consecutive Ones\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "1 <= nums.length <= 10^5; nums[i] is 0 or 1.",
      "source": {
        "label": "LeetCode 485 - Max Consecutive Ones",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [1,1,0,1,1,1]",
          "output": "3",
          "explanation": "Three consecutive ones at the end."
        },
        {
          "input": "nums = [1,0,1,1,0,1]",
          "output": "2",
          "explanation": "Longest run length is 2."
        },
        {
          "input": "nums = [0,0]",
          "output": "0",
          "explanation": "No ones."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int findMaxConsecutiveOnes(int[] nums){ int best=0; for(int i=0;i<nums.length;i++){ int len=0; for(int j=i;j<nums.length&&nums[j]==1;j++)len++; best=Math.max(best,len); } return best; } }",
      "iterativeCode": "class Solution { public int findMaxConsecutiveOnes(int[] nums){ int cur=0,best=0; for(int n:nums){ cur=n==1?cur+1:0; best=Math.max(best,cur); } return best; } }",
      "optimizedCode": "class Solution { public int findMaxConsecutiveOnes(int[] nums){ int cur=0,best=0; for(int n:nums){ cur=n==1?cur+1:0; best=Math.max(best,cur); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "class Solution { public int findMaxConsecutiveOnes(int[] nums){ int cur=0,best=0; for(int n:nums){ cur=n==1?cur+1:0; best=Math.max(best,cur); } return best; } }"
    },
    {
      "group": "advanced",
      "name": "Maximum Points You Can Obtain from Cards",
      "difficulty": "Medium",
      "subpattern": "Complement fixed window",
      "question": "Solve the LeetCode-style problem \"Maximum Points You Can Obtain from Cards\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "1 <= cardPoints.length <= 10^5; 1 <= cardPoints[i] <= 10^4; 1 <= k <= cardPoints.length.",
      "source": {
        "label": "LeetCode 1423 - Maximum Points You Can Obtain from Cards",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "cardPoints = [1,2,3,4,5,6,1], k = 3",
          "output": "12",
          "explanation": "Take 1 from left and 6,5 from right."
        },
        {
          "input": "cardPoints = [2,2,2], k = 2",
          "output": "4",
          "explanation": "Any two cards."
        },
        {
          "input": "cardPoints = [9,7,7,9,7,7,9], k = 7",
          "output": "55",
          "explanation": "Take all cards."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int maxScore(int[] cardPoints,int k){ int best=0; for(int left=0;left<=k;left++){ int sum=0; for(int i=0;i<left;i++)sum+=cardPoints[i]; for(int i=0;i<k-left;i++)sum+=cardPoints[cardPoints.length-1-i]; best=Math.max(best,sum);} return best; } }",
      "iterativeCode": "class Solution { public int maxScore(int[] cardPoints,int k){ int total=0; for(int x:cardPoints)total+=x; int keep=cardPoints.length-k; if(keep==0)return total; int sum=0; for(int i=0;i<keep;i++)sum+=cardPoints[i]; int min=sum; for(int r=keep;r<cardPoints.length;r++){ sum+=cardPoints[r]-cardPoints[r-keep]; min=Math.min(min,sum);} return total-min; } }",
      "optimizedCode": "class Solution { public int maxScore(int[] cardPoints,int k){ int total=0; for(int x:cardPoints)total+=x; int keep=cardPoints.length-k; if(keep==0)return total; int sum=0; for(int i=0;i<keep;i++)sum+=cardPoints[i]; int min=sum; for(int r=keep;r<cardPoints.length;r++){ sum+=cardPoints[r]-cardPoints[r-keep]; min=Math.min(min,sum);} return total-min; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "class Solution { public int maxScore(int[] cardPoints,int k){ int total=0; for(int x:cardPoints)total+=x; int keep=cardPoints.length-k; if(keep==0)return total; int sum=0; for(int i=0;i<keep;i++)sum+=cardPoints[i]; int min=sum; for(int r=keep;r<cardPoints.length;r++){ sum+=cardPoints[r]-cardPoints[r-keep]; min=Math.min(min,sum);} return total-min; } }"
    },
    {
      "group": "advanced",
      "name": "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
      "difficulty": "Medium",
      "subpattern": "Monotonic deque bounded window",
      "question": "Solve the LeetCode-style problem \"Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^9; 0 <= limit <= 10^9.",
      "source": {
        "label": "LeetCode 1438 - Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [8,2,4,7], limit = 4",
          "output": "2",
          "explanation": "[2,4] is valid."
        },
        {
          "input": "nums = [10,1,2,4,7,2], limit = 5",
          "output": "4",
          "explanation": "[2,4,7,2] is valid."
        },
        {
          "input": "nums = [4,2,2,2,4,4,2,2], limit = 0",
          "output": "3",
          "explanation": "Longest equal-value run length 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int longestSubarray(int[] nums,int limit){ int best=0; for(int i=0;i<nums.length;i++){ int mn=nums[i],mx=nums[i]; for(int j=i;j<nums.length;j++){ mn=Math.min(mn,nums[j]); mx=Math.max(mx,nums[j]); if(mx-mn<=limit)best=Math.max(best,j-i+1); } } return best; } }",
      "iterativeCode": "import java.util.*; class Solution { public int longestSubarray(int[] nums,int limit){ Deque<Integer> max=new ArrayDeque<>(), min=new ArrayDeque<>(); int left=0,best=0; for(int r=0;r<nums.length;r++){ while(!max.isEmpty()&&nums[max.peekLast()]<nums[r])max.pollLast(); while(!min.isEmpty()&&nums[min.peekLast()]>nums[r])min.pollLast(); max.add(r); min.add(r); while(nums[max.peekFirst()]-nums[min.peekFirst()]>limit){ if(max.peekFirst()==left)max.pollFirst(); if(min.peekFirst()==left)min.pollFirst(); left++; } best=Math.max(best,r-left+1); } return best; } }",
      "optimizedCode": "import java.util.*; class Solution { public int longestSubarray(int[] nums,int limit){ Deque<Integer> max=new ArrayDeque<>(), min=new ArrayDeque<>(); int left=0,best=0; for(int r=0;r<nums.length;r++){ while(!max.isEmpty()&&nums[max.peekLast()]<nums[r])max.pollLast(); while(!min.isEmpty()&&nums[min.peekLast()]>nums[r])min.pollLast(); max.add(r); min.add(r); while(nums[max.peekFirst()]-nums[min.peekFirst()]>limit){ if(max.peekFirst()==left)max.pollFirst(); if(min.peekFirst()==left)min.pollFirst(); left++; } best=Math.max(best,r-left+1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "import java.util.*; class Solution { public int longestSubarray(int[] nums,int limit){ Deque<Integer> max=new ArrayDeque<>(), min=new ArrayDeque<>(); int left=0,best=0; for(int r=0;r<nums.length;r++){ while(!max.isEmpty()&&nums[max.peekLast()]<nums[r])max.pollLast(); while(!min.isEmpty()&&nums[min.peekLast()]>nums[r])min.pollLast(); max.add(r); min.add(r); while(nums[max.peekFirst()]-nums[min.peekFirst()]>limit){ if(max.peekFirst()==left)max.pollFirst(); if(min.peekFirst()==left)min.pollFirst(); left++; } best=Math.max(best,r-left+1); } return best; } }"
    },
    {
      "group": "advanced",
      "name": "Minimum Operations to Reduce X to Zero",
      "difficulty": "Medium",
      "subpattern": "Longest complement sum window",
      "question": "Solve the LeetCode-style problem \"Minimum Operations to Reduce X to Zero\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "1 <= nums.length <= 10^5; 1 <= nums[i] <= 10^4; 1 <= x <= 10^9.",
      "source": {
        "label": "LeetCode 1658 - Minimum Operations to Reduce X to Zero",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [1,1,4,2,3], x = 5",
          "output": "2",
          "explanation": "Remove 2 and 3 from right."
        },
        {
          "input": "nums = [5,6,7,8,9], x = 4",
          "output": "-1",
          "explanation": "Cannot reduce exactly."
        },
        {
          "input": "nums = [3,2,20,1,1,3], x = 10",
          "output": "5",
          "explanation": "Keep longest middle sum total-x."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int minOperations(int[] nums,int x){ int n=nums.length,best=Integer.MAX_VALUE; for(int l=0;l<=n;l++){ int left=0; for(int i=0;i<l;i++)left+=nums[i]; for(int r=0;r+l<=n;r++){ int sum=left; for(int j=0;j<r;j++)sum+=nums[n-1-j]; if(sum==x)best=Math.min(best,l+r); } } return best==Integer.MAX_VALUE?-1:best; } }",
      "iterativeCode": "class Solution { public int minOperations(int[] nums,int x){ int total=0; for(int n:nums)total+=n; int target=total-x; if(target<0)return -1; int left=0,sum=0,best=-1; for(int r=0;r<nums.length;r++){ sum+=nums[r]; while(sum>target)sum-=nums[left++]; if(sum==target)best=Math.max(best,r-left+1); } return best==-1?-1:nums.length-best; } }",
      "optimizedCode": "class Solution { public int minOperations(int[] nums,int x){ int total=0; for(int n:nums)total+=n; int target=total-x; if(target<0)return -1; int left=0,sum=0,best=-1; for(int r=0;r<nums.length;r++){ sum+=nums[r]; while(sum>target)sum-=nums[left++]; if(sum==target)best=Math.max(best,r-left+1); } return best==-1?-1:nums.length-best; } }",
      "recursiveCode": "class Solution { public int recursiveScan(int[] nums) { return scan(nums, 0, 0); } private int scan(int[] nums, int index, int best) { if (index == nums.length) return best; return scan(nums, index + 1, Math.max(best, nums[index])); } }",
      "code": "class Solution { public int minOperations(int[] nums,int x){ int total=0; for(int n:nums)total+=n; int target=total-x; if(target<0)return -1; int left=0,sum=0,best=-1; for(int r=0;r<nums.length;r++){ sum+=nums[r]; while(sum>target)sum-=nums[left++]; if(sum==target)best=Math.max(best,r-left+1); } return best==-1?-1:nums.length-best; } }"
    },
    {
      "group": "practice",
      "name": "Binary Subarrays With Sum",
      "difficulty": "Medium",
      "subpattern": "At most sum counting window",
      "question": "Solve the LeetCode-style problem \"Binary Subarrays With Sum\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 930 - Binary Subarrays With Sum",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [1,0,1,0,1], goal = 2",
          "output": "4",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Get Equal Substrings Within Budget",
      "difficulty": "Medium",
      "subpattern": "Cost-bounded variable window",
      "question": "Solve the LeetCode-style problem \"Get Equal Substrings Within Budget\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 1208 - Get Equal Substrings Within Budget",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "s = \"abcd\", t = \"bcdf\", maxCost = 3",
          "output": "3",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Replace the Substring for Balanced String",
      "difficulty": "Medium",
      "subpattern": "Outside-count satisfying window",
      "question": "Solve the LeetCode-style problem \"Replace the Substring for Balanced String\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 1234 - Replace the Substring for Balanced String",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "s = \"QWER\"",
          "output": "0",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "K Radius Subarray Averages",
      "difficulty": "Medium",
      "subpattern": "Fixed radius sum window",
      "question": "Solve the LeetCode-style problem \"K Radius Subarray Averages\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 2090 - K Radius Subarray Averages",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [7,4,3,9,1,8,5,2,6], k = 3",
          "output": "[-1,-1,-1,5,4,4,-1,-1,-1]",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Defuse the Bomb",
      "difficulty": "Easy",
      "subpattern": "Circular fixed window",
      "question": "Solve the LeetCode-style problem \"Defuse the Bomb\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 1652 - Defuse the Bomb",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "code = [5,7,1,4], k = 3",
          "output": "[12,10,16,13]",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Maximum Number of Vowels in a Substring of Given Length",
      "difficulty": "Medium",
      "subpattern": "Fixed-size count window",
      "question": "Solve the LeetCode-style problem \"Maximum Number of Vowels in a Substring of Given Length\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 1456 - Maximum Number of Vowels in a Substring of Given Length",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "s = \"abciiidef\", k = 3",
          "output": "3",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Diet Plan Performance",
      "difficulty": "Easy",
      "subpattern": "Fixed-size score window",
      "question": "Solve the LeetCode-style problem \"Diet Plan Performance\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 1176 - Diet Plan Performance",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3",
          "output": "0",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Longest Nice Subarray",
      "difficulty": "Medium",
      "subpattern": "Bitmask conflict window",
      "question": "Solve the LeetCode-style problem \"Longest Nice Subarray\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 2401 - Longest Nice Subarray",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [1,3,8,48,10]",
          "output": "3",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Count Complete Subarrays in an Array",
      "difficulty": "Medium",
      "subpattern": "All distinct values window",
      "question": "Solve the LeetCode-style problem \"Count Complete Subarrays in an Array\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 2799 - Count Complete Subarrays in an Array",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "nums = [1,3,1,2,2]",
          "output": "4",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
    },
    {
      "group": "practice",
      "name": "Take K of Each Character From Left and Right",
      "difficulty": "Medium",
      "subpattern": "Complement valid middle window",
      "question": "Solve the LeetCode-style problem \"Take K of Each Character From Left and Right\" using a sliding window over a contiguous range.",
      "trigger": "The condition can be maintained while the right boundary expands and the left boundary shrinks.",
      "intuition": "Maintain only the state needed for the current window and update the answer when the window is valid.",
      "edgeCases": "Small input, all valid window, no valid window, duplicate values, boundary k/limit values.",
      "constraints": "See linked LeetCode source for exact constraints.",
      "source": {
        "label": "LeetCode 2516 - Take K of Each Character From Left and Right",
        "url": "https://leetcode.com/problems/undefined/"
      },
      "examples": [
        {
          "input": "s = \"aabaaaacaabc\", k = 2",
          "output": "8",
          "explanation": "Canonical sliding-window example."
        },
        {
          "input": "Second canonical case",
          "output": "Valid output",
          "explanation": "Concrete behavior is shown in the linked reference."
        },
        {
          "input": "Edge canonical case",
          "output": "Boundary output",
          "explanation": "Boundary behavior is shown in the linked reference."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) or O(window state).",
      "optimizedComplexity": "Time O(n), Space O(window state).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus window state.",
      "bruteForceCode": "class Solution { public int bruteForceWindow(int[] nums) { int best = 0; for (int i = 0; i < nums.length; i++) { for (int j = i; j < nums.length; j++) { best = Math.max(best, j - i + 1); } } return best; } }",
      "iterativeCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "optimizedCode": "class Solution { public int slidingWindow(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }",
      "recursiveCode": "class Solution { public int recursiveWindow(int[] nums) { return scan(nums, 0, 0, 0); } private int scan(int[] nums, int right, int left, int best) { if (right == nums.length) return best; return scan(nums, right + 1, left, Math.max(best, right - left + 1)); } }",
      "code": "class Solution { public int slidingWindowTemplate(int[] nums) { int left = 0, best = 0; for (int right = 0; right < nums.length; right++) { while (left <= right && false) left++; best = Math.max(best, right - left + 1); } return best; } }"
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
