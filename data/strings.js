const CURRENT_PATTERN = {
  "id": "strings",
  "name": "Strings",
  "summary": "Use character counts, two-pointer normalization, sliding windows, parsing stacks, palindrome expansion, prefix functions, and string DP for text-shaped problems.",
  "complete": true,
  "subpatterns": [
    "Frequency counter matching",
    "Alphanumeric two-pointer normalization",
    "Last-seen sliding window",
    "Max-frequency replacement window",
    "Requirement-count minimum window",
    "Canonical anagram grouping",
    "Length-prefixed serialization",
    "Center expansion palindrome",
    "Palindrome center counting",
    "Wildcard parenthesis bounds",
    "KMP prefix matching",
    "Period detection",
    "Run-length in-place compression",
    "Reverse word parsing",
    "Zigzag row simulation",
    "Decimal carry string addition",
    "Bracketed repetition decoding",
    "Operator precedence parsing",
    "Vertical prefix scan",
    "Version segment comparison",
    "Fixed-window anagram matching",
    "Permutation inclusion window",
    "Dictionary segmentation DP",
    "Bijection pattern mapping",
    "Isomorphic character mapping",
    "Unix path stack normalization",
    "Greedy line packing",
    "Numeric token validation",
    "Run-length sequence generation",
    "KMP palindrome prefix"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Valid Anagram",
      "difficulty": "Easy",
      "subpattern": "Frequency counter matching",
      "question": "Given two strings s and t, return true if t is an anagram of s and false otherwise.",
      "trigger": "Order does not matter, only character multiplicity matters.",
      "intuition": "If lengths match, count characters in s and subtract characters in t; every count must end at zero.",
      "edgeCases": "Different lengths, empty strings, repeated characters, one mismatch with same length, all same character.",
      "constraints": "1 <= s.length, t.length <= 50000; s and t contain lowercase English letters.",
      "source": {
        "label": "Valid Anagram - LeetCode 242",
        "url": "https://leetcode.com/problems/valid-anagram/"
      },
      "examples": [
        {
          "input": "s = \"anagram\", t = \"nagaram\"",
          "output": "true",
          "explanation": "Both strings contain the same characters with the same counts."
        },
        {
          "input": "s = \"rat\", t = \"car\"",
          "output": "false",
          "explanation": "The character counts differ."
        },
        {
          "input": "s = \"a\", t = \"ab\"",
          "output": "false",
          "explanation": "Different lengths cannot be anagrams."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Sort both character arrays and compare.",
      "optimizedComplexity": "Time O(n); Space O(1). Count 26 lowercase letters.",
      "recursiveComplexity": "Time O(n); Space O(n) call stack. Recursively applies count deltas by index.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    char[] left = s.toCharArray();\n    char[] right = t.toCharArray();\n    Arrays.sort(left);\n    Arrays.sort(right);\n    return Arrays.equals(left, right);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n      count[t.charAt(i) - 'a']--;\n    }\n    for (int value : count) {\n      if (value != 0) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    apply(s, t, 0, count);\n    return allZero(count, 0);\n  }\n\n  private void apply(String s, String t, int index, int[] count) {\n    if (index == s.length()) return;\n    count[s.charAt(index) - 'a']++;\n    count[t.charAt(index) - 'a']--;\n    apply(s, t, index + 1, count);\n  }\n\n  private boolean allZero(int[] count, int index) {\n    if (index == count.length) return true;\n    return count[index] == 0 && allZero(count, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n      count[t.charAt(i) - 'a']--;\n    }\n    for (int value : count) {\n      if (value != 0) return false;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n      count[t.charAt(i) - 'a']--;\n    }\n    for (int value : count) {\n      if (value != 0) return false;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Valid Palindrome",
      "difficulty": "Easy",
      "subpattern": "Alphanumeric two-pointer normalization",
      "question": "Given a string s, return true if it is a palindrome after converting uppercase letters to lowercase and removing non-alphanumeric characters.",
      "trigger": "Only normalized alphanumeric characters matter, and palindrome comparison is symmetric from both ends.",
      "intuition": "Move two pointers inward, skipping ignored characters and comparing lowercase values.",
      "edgeCases": "Empty after filtering, punctuation only, mixed case, digits, mismatch near the middle.",
      "constraints": "1 <= s.length <= 200000; s consists of printable ASCII characters.",
      "source": {
        "label": "Valid Palindrome - LeetCode 125",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      },
      "examples": [
        {
          "input": "s = \"A man, a plan, a canal: Panama\"",
          "output": "true",
          "explanation": "Normalized string is amanaplanacanalpanama."
        },
        {
          "input": "s = \"race a car\"",
          "output": "false",
          "explanation": "Normalized string is not symmetric."
        },
        {
          "input": "s = \" \"",
          "output": "true",
          "explanation": "No alphanumeric characters remain."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build a normalized string and compare to its reverse.",
      "optimizedComplexity": "Time O(n); Space O(1). Two pointers skip ignored characters in place.",
      "recursiveComplexity": "Time O(n); Space O(n) call stack. Recursive two-pointer comparison skips invalid characters.",
      "bruteForceCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    StringBuilder normalized = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (Character.isLetterOrDigit(ch)) normalized.append(Character.toLowerCase(ch));\n    }\n    String forward = normalized.toString();\n    return forward.equals(normalized.reverse().toString());\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0;\n    int right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    return check(s, 0, s.length() - 1);\n  }\n\n  private boolean check(String s, int left, int right) {\n    if (left >= right) return true;\n    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);\n    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);\n    if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n    return check(s, left + 1, right - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0;\n    int right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean isPalindrome(String s) {\n    int left = 0;\n    int right = s.length() - 1;\n    while (left < right) {\n      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n      left++;\n      right--;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "subpattern": "Last-seen sliding window",
      "question": "Given a string s, return the length of the longest substring without repeating characters.",
      "trigger": "A duplicate character invalidates the current window only up to its previous occurrence.",
      "intuition": "Store the last index of each character and move the left boundary past repeats.",
      "edgeCases": "Empty string, all same characters, all unique characters, repeated character before current window, spaces and symbols.",
      "constraints": "0 <= s.length <= 50000; s consists of English letters, digits, symbols, and spaces.",
      "source": {
        "label": "Longest Substring Without Repeating Characters - LeetCode 3",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      },
      "examples": [
        {
          "input": "s = \"abcabcbb\"",
          "output": "3",
          "explanation": "The longest substrings include abc."
        },
        {
          "input": "s = \"bbbbb\"",
          "output": "1",
          "explanation": "Only one repeated character can be used."
        },
        {
          "input": "s = \"pwwkew\"",
          "output": "3",
          "explanation": "wke is valid; pwke is not contiguous."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(min(n, charset)). Test every substring for uniqueness.",
      "optimizedComplexity": "Time O(n); Space O(charset). Sliding window moves each boundary at most n times.",
      "recursiveComplexity": "Time O(n); Space O(charset + n). Recursive scan carries last-seen indexes.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    int best = 0;\n    for (int left = 0; left < s.length(); left++) {\n      for (int right = left; right < s.length(); right++) {\n        if (unique(s, left, right)) best = Math.max(best, right - left + 1);\n      }\n    }\n    return best;\n  }\n\n  private boolean unique(String s, int left, int right) {\n    Set<Character> seen = new HashSet<>();\n    for (int i = left; i <= right; i++) {\n      if (!seen.add(s.charAt(i))) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> last = new HashMap<>();\n    int left = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      char ch = s.charAt(right);\n      if (last.containsKey(ch) && last.get(ch) >= left) left = last.get(ch) + 1;\n      last.put(ch, right);\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    return scan(s, 0, 0, new HashMap<>(), 0);\n  }\n\n  private int scan(String s, int right, int left, Map<Character, Integer> last, int best) {\n    if (right == s.length()) return best;\n    char ch = s.charAt(right);\n    if (last.containsKey(ch) && last.get(ch) >= left) left = last.get(ch) + 1;\n    last.put(ch, right);\n    best = Math.max(best, right - left + 1);\n    return scan(s, right + 1, left, last, best);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> last = new HashMap<>();\n    int left = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      char ch = s.charAt(right);\n      if (last.containsKey(ch) && last.get(ch) >= left) left = last.get(ch) + 1;\n      last.put(ch, right);\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> last = new HashMap<>();\n    int left = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      char ch = s.charAt(right);\n      if (last.containsKey(ch) && last.get(ch) >= left) left = last.get(ch) + 1;\n      last.put(ch, right);\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Repeating Character Replacement",
      "difficulty": "Medium",
      "subpattern": "Max-frequency replacement window",
      "question": "Given a string s and integer k, return the length of the longest substring that can be made of one repeated character after at most k replacements.",
      "trigger": "A window is valid when its length minus the most frequent character count is at most k.",
      "intuition": "Grow the window, track the max frequency in it, and shrink only when replacements needed exceed k.",
      "edgeCases": "k is 0, all same letters, all distinct letters, max frequency becomes stale, k larger than string length.",
      "constraints": "1 <= s.length <= 100000; s contains uppercase English letters; 0 <= k <= s.length.",
      "source": {
        "label": "Longest Repeating Character Replacement - LeetCode 424",
        "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
      },
      "examples": [
        {
          "input": "s = \"ABAB\", k = 2",
          "output": "4",
          "explanation": "Replace two letters to make the whole string equal."
        },
        {
          "input": "s = \"AABABBA\", k = 1",
          "output": "4",
          "explanation": "AABA or ABBA can be made uniform."
        },
        {
          "input": "s = \"AAAA\", k = 0",
          "output": "4",
          "explanation": "No replacement is needed."
        }
      ],
      "bruteForceComplexity": "Time O(26n^2); Space O(1). Check every substring and its highest frequency.",
      "optimizedComplexity": "Time O(n); Space O(1). Sliding window tracks 26 uppercase counts.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan carries the window counts and left boundary.",
      "bruteForceCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int best = 0;\n    for (int left = 0; left < s.length(); left++) {\n      int[] count = new int[26];\n      int maxFreq = 0;\n      for (int right = left; right < s.length(); right++) {\n        maxFreq = Math.max(maxFreq, ++count[s.charAt(right) - 'A']);\n        if (right - left + 1 - maxFreq <= k) best = Math.max(best, right - left + 1);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0;\n    int maxFreq = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      maxFreq = Math.max(maxFreq, ++count[s.charAt(right) - 'A']);\n      while (right - left + 1 - maxFreq > k) {\n        count[s.charAt(left) - 'A']--;\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    return scan(s, k, 0, 0, 0, 0, new int[26]);\n  }\n\n  private int scan(String s, int k, int right, int left, int maxFreq, int best, int[] count) {\n    if (right == s.length()) return best;\n    int index = s.charAt(right) - 'A';\n    maxFreq = Math.max(maxFreq, ++count[index]);\n    while (right - left + 1 - maxFreq > k) {\n      count[s.charAt(left) - 'A']--;\n      left++;\n    }\n    best = Math.max(best, right - left + 1);\n    return scan(s, k, right + 1, left, maxFreq, best, count);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0;\n    int maxFreq = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      maxFreq = Math.max(maxFreq, ++count[s.charAt(right) - 'A']);\n      while (right - left + 1 - maxFreq > k) {\n        count[s.charAt(left) - 'A']--;\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0;\n    int maxFreq = 0;\n    int best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      maxFreq = Math.max(maxFreq, ++count[s.charAt(right) - 'A']);\n      while (right - left + 1 - maxFreq > k) {\n        count[s.charAt(left) - 'A']--;\n        left++;\n      }\n      best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Window Substring",
      "difficulty": "Hard",
      "subpattern": "Requirement-count minimum window",
      "question": "Given strings s and t, return the minimum window substring of s that contains every character of t including duplicates.",
      "trigger": "The window must satisfy required character counts and then shrink while still satisfying them.",
      "intuition": "Track how many required character types are fully satisfied and contract the left side whenever all are satisfied.",
      "edgeCases": "t longer than s, no valid window, duplicate required characters, answer at boundaries, case-sensitive characters.",
      "constraints": "1 <= s.length, t.length <= 100000; s and t consist of uppercase and lowercase English letters.",
      "source": {
        "label": "Minimum Window Substring - LeetCode 76",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      },
      "examples": [
        {
          "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
          "output": "\"BANC\"",
          "explanation": "BANC is the smallest window containing A, B, and C."
        },
        {
          "input": "s = \"a\", t = \"a\"",
          "output": "\"a\"",
          "explanation": "The only character satisfies the requirement."
        },
        {
          "input": "s = \"a\", t = \"aa\"",
          "output": "\"\"",
          "explanation": "The source does not contain enough a characters."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * charset); Space O(charset). Check every substring against target counts.",
      "optimizedComplexity": "Time O(n); Space O(charset). Sliding window expands and contracts each index once.",
      "recursiveComplexity": "Time O(n); Space O(charset + n). Recursive right expansion with iterative contraction.",
      "bruteForceCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    for (int i = 0; i < t.length(); i++) need[t.charAt(i)]++;\n    String best = \"\";\n    for (int left = 0; left < s.length(); left++) {\n      int[] have = new int[128];\n      for (int right = left; right < s.length(); right++) {\n        have[s.charAt(right)]++;\n        if (covers(have, need) && (best.isEmpty() || right - left + 1 < best.length())) {\n          best = s.substring(left, right + 1);\n        }\n      }\n    }\n    return best;\n  }\n\n  private boolean covers(int[] have, int[] need) {\n    for (int i = 0; i < need.length; i++) if (have[i] < need[i]) return false;\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    int required = 0;\n    for (int i = 0; i < t.length(); i++) {\n      if (need[t.charAt(i)]++ == 0) required++;\n    }\n\n    int[] window = new int[128];\n    int formed = 0, left = 0, bestLeft = 0, bestLength = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n      char add = s.charAt(right);\n      if (++window[add] == need[add] && need[add] > 0) formed++;\n      while (formed == required) {\n        if (right - left + 1 < bestLength) {\n          bestLength = right - left + 1;\n          bestLeft = left;\n        }\n        char remove = s.charAt(left++);\n        if (window[remove]-- == need[remove] && need[remove] > 0) formed--;\n      }\n    }\n    return bestLength == Integer.MAX_VALUE ? \"\" : s.substring(bestLeft, bestLeft + bestLength);\n  }\n}",
      "recursiveCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    int required = 0;\n    for (int i = 0; i < t.length(); i++) if (need[t.charAt(i)]++ == 0) required++;\n    int[] result = {0, Integer.MAX_VALUE, 0, 0};\n    scan(s, need, new int[128], required, 0, 0, 0, result);\n    return result[1] == Integer.MAX_VALUE ? \"\" : s.substring(result[0], result[0] + result[1]);\n  }\n\n  private void scan(String s, int[] need, int[] window, int required, int right, int left, int formed, int[] result) {\n    if (right == s.length()) return;\n    char add = s.charAt(right);\n    if (++window[add] == need[add] && need[add] > 0) formed++;\n    while (formed == required) {\n      if (right - left + 1 < result[1]) {\n        result[0] = left;\n        result[1] = right - left + 1;\n      }\n      char remove = s.charAt(left++);\n      if (window[remove]-- == need[remove] && need[remove] > 0) formed--;\n    }\n    scan(s, need, window, required, right + 1, left, formed, result);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    int required = 0;\n    for (int i = 0; i < t.length(); i++) {\n      if (need[t.charAt(i)]++ == 0) required++;\n    }\n\n    int[] window = new int[128];\n    int formed = 0, left = 0, bestLeft = 0, bestLength = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n      char add = s.charAt(right);\n      if (++window[add] == need[add] && need[add] > 0) formed++;\n      while (formed == required) {\n        if (right - left + 1 < bestLength) {\n          bestLength = right - left + 1;\n          bestLeft = left;\n        }\n        char remove = s.charAt(left++);\n        if (window[remove]-- == need[remove] && need[remove] > 0) formed--;\n      }\n    }\n    return bestLength == Integer.MAX_VALUE ? \"\" : s.substring(bestLeft, bestLeft + bestLength);\n  }\n}",
      "code": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    int required = 0;\n    for (int i = 0; i < t.length(); i++) {\n      if (need[t.charAt(i)]++ == 0) required++;\n    }\n\n    int[] window = new int[128];\n    int formed = 0, left = 0, bestLeft = 0, bestLength = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n      char add = s.charAt(right);\n      if (++window[add] == need[add] && need[add] > 0) formed++;\n      while (formed == required) {\n        if (right - left + 1 < bestLength) {\n          bestLength = right - left + 1;\n          bestLeft = left;\n        }\n        char remove = s.charAt(left++);\n        if (window[remove]-- == need[remove] && need[remove] > 0) formed--;\n      }\n    }\n    return bestLength == Integer.MAX_VALUE ? \"\" : s.substring(bestLeft, bestLeft + bestLength);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Group Anagrams",
      "difficulty": "Medium",
      "subpattern": "Canonical anagram grouping",
      "question": "Given an array of strings, group the anagrams together in any order.",
      "trigger": "Anagrams share a canonical representation such as sorted characters or letter counts.",
      "intuition": "Convert each word into a stable key and collect words with the same key in a map.",
      "edgeCases": "Empty string, duplicate strings, single word, many anagrams, words with repeated letters.",
      "constraints": "1 <= strs.length <= 10000; 0 <= strs[i].length <= 100; strs[i] contains lowercase English letters.",
      "source": {
        "label": "Group Anagrams - LeetCode 49",
        "url": "https://leetcode.com/problems/group-anagrams/"
      },
      "examples": [
        {
          "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
          "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
          "explanation": "Words with the same sorted key are grouped."
        },
        {
          "input": "strs = [\"\"]",
          "output": "[[\"\"]]",
          "explanation": "The empty string forms one group."
        },
        {
          "input": "strs = [\"a\"]",
          "output": "[[\"a\"]]",
          "explanation": "One word forms one group."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * L); Space O(n). Compare each word with existing group representatives.",
      "optimizedComplexity": "Time O(nL); Space O(nL). Use a 26-count signature as the map key.",
      "recursiveComplexity": "Time O(nL log L); Space O(nL + n). Recursively groups by sorted key.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    List<List<String>> groups = new ArrayList<>();\n    boolean[] used = new boolean[strs.length];\n    for (int i = 0; i < strs.length; i++) {\n      if (used[i]) continue;\n      List<String> group = new ArrayList<>();\n      for (int j = i; j < strs.length; j++) {\n        if (!used[j] && isAnagram(strs[i], strs[j])) {\n          used[j] = true;\n          group.add(strs[j]);\n        }\n      }\n      groups.add(group);\n    }\n    return groups;\n  }\n\n  private boolean isAnagram(String a, String b) {\n    if (a.length() != b.length()) return false;\n    int[] count = new int[26];\n    for (int i = 0; i < a.length(); i++) {\n      count[a.charAt(i) - 'a']++;\n      count[b.charAt(i) - 'a']--;\n    }\n    for (int value : count) if (value != 0) return false;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    for (String word : strs) {\n      int[] count = new int[26];\n      for (int i = 0; i < word.length(); i++) count[word.charAt(i) - 'a']++;\n      String key = Arrays.toString(count);\n      groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(word);\n    }\n    return new ArrayList<>(groups.values());\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    add(strs, 0, groups);\n    return new ArrayList<>(groups.values());\n  }\n\n  private void add(String[] strs, int index, Map<String, List<String>> groups) {\n    if (index == strs.length) return;\n    char[] chars = strs[index].toCharArray();\n    Arrays.sort(chars);\n    String key = new String(chars);\n    groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(strs[index]);\n    add(strs, index + 1, groups);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    for (String word : strs) {\n      int[] count = new int[26];\n      for (int i = 0; i < word.length(); i++) count[word.charAt(i) - 'a']++;\n      String key = Arrays.toString(count);\n      groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(word);\n    }\n    return new ArrayList<>(groups.values());\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    for (String word : strs) {\n      int[] count = new int[26];\n      for (int i = 0; i < word.length(); i++) count[word.charAt(i) - 'a']++;\n      String key = Arrays.toString(count);\n      groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(word);\n    }\n    return new ArrayList<>(groups.values());\n  }\n}"
    },
    {
      "group": "core",
      "name": "Encode and Decode Strings",
      "difficulty": "Medium",
      "subpattern": "Length-prefixed serialization",
      "question": "Design an algorithm to encode a list of strings into one string and decode it back to the original list.",
      "trigger": "Strings may contain delimiters, so the encoding must preserve exact lengths rather than rely on a separator alone.",
      "intuition": "Write each string as length + delimiter + content; decoding reads the length first, then consumes exactly that many characters.",
      "edgeCases": "Empty list, empty string inside list, strings containing delimiters, multi-digit lengths, repeated strings.",
      "constraints": "0 <= strs.length <= 200; 0 <= strs[i].length <= 200; strings may contain any valid characters.",
      "source": {
        "label": "Encode and Decode Strings - LeetCode 271",
        "url": "https://leetcode.com/problems/encode-and-decode-strings/"
      },
      "examples": [
        {
          "input": "strs = [\"lint\",\"code\",\"love\",\"you\"]",
          "output": "[\"lint\",\"code\",\"love\",\"you\"] after decode",
          "explanation": "Each length prefix makes decoding unambiguous."
        },
        {
          "input": "strs = [\"\"]",
          "output": "[\"\"] after decode",
          "explanation": "Length zero is encoded explicitly."
        },
        {
          "input": "strs = [\"a#b\",\"12\"]",
          "output": "[\"a#b\",\"12\"] after decode",
          "explanation": "Delimiter characters inside content are preserved."
        }
      ],
      "bruteForceComplexity": "Encode O(total characters); decode O(total characters); Space O(total characters). Escape delimiters and backslashes.",
      "optimizedComplexity": "Encode O(total characters); decode O(total characters); Space O(total characters). Length prefixes avoid escaping.",
      "recursiveComplexity": "Encode O(total characters); decode O(total characters); Space O(total characters + number of strings). Recursive prefix parsing.",
      "bruteForceCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder encoded = new StringBuilder();\n    for (String s : strs) {\n      for (int i = 0; i < s.length(); i++) {\n        char ch = s.charAt(i);\n        if (ch == '\\\\' || ch == ',') encoded.append('\\\\');\n        encoded.append(ch);\n      }\n      encoded.append(',');\n    }\n    return encoded.toString();\n  }\n\n  public List<String> decode(String s) {\n    List<String> answer = new ArrayList<>();\n    StringBuilder current = new StringBuilder();\n    boolean escaped = false;\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (escaped) {\n        current.append(ch);\n        escaped = false;\n      } else if (ch == '\\\\') escaped = true;\n      else if (ch == ',') {\n        answer.add(current.toString());\n        current.setLength(0);\n      } else current.append(ch);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder encoded = new StringBuilder();\n    for (String s : strs) {\n      encoded.append(s.length()).append('#').append(s);\n    }\n    return encoded.toString();\n  }\n\n  public List<String> decode(String s) {\n    List<String> answer = new ArrayList<>();\n    int index = 0;\n    while (index < s.length()) {\n      int delimiter = index;\n      while (s.charAt(delimiter) != '#') delimiter++;\n      int length = Integer.parseInt(s.substring(index, delimiter));\n      int start = delimiter + 1;\n      answer.add(s.substring(start, start + length));\n      index = start + length;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder encoded = new StringBuilder();\n    encodeAt(strs, 0, encoded);\n    return encoded.toString();\n  }\n\n  private void encodeAt(List<String> strs, int index, StringBuilder encoded) {\n    if (index == strs.size()) return;\n    String current = strs.get(index);\n    encoded.append(current.length()).append('#').append(current);\n    encodeAt(strs, index + 1, encoded);\n  }\n\n  public List<String> decode(String s) {\n    List<String> answer = new ArrayList<>();\n    decodeAt(s, 0, answer);\n    return answer;\n  }\n\n  private void decodeAt(String s, int index, List<String> answer) {\n    if (index == s.length()) return;\n    int delimiter = index;\n    while (s.charAt(delimiter) != '#') delimiter++;\n    int length = Integer.parseInt(s.substring(index, delimiter));\n    int start = delimiter + 1;\n    answer.add(s.substring(start, start + length));\n    decodeAt(s, start + length, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder encoded = new StringBuilder();\n    for (String s : strs) {\n      encoded.append(s.length()).append('#').append(s);\n    }\n    return encoded.toString();\n  }\n\n  public List<String> decode(String s) {\n    List<String> answer = new ArrayList<>();\n    int index = 0;\n    while (index < s.length()) {\n      int delimiter = index;\n      while (s.charAt(delimiter) != '#') delimiter++;\n      int length = Integer.parseInt(s.substring(index, delimiter));\n      int start = delimiter + 1;\n      answer.add(s.substring(start, start + length));\n      index = start + length;\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder encoded = new StringBuilder();\n    for (String s : strs) {\n      encoded.append(s.length()).append('#').append(s);\n    }\n    return encoded.toString();\n  }\n\n  public List<String> decode(String s) {\n    List<String> answer = new ArrayList<>();\n    int index = 0;\n    while (index < s.length()) {\n      int delimiter = index;\n      while (s.charAt(delimiter) != '#') delimiter++;\n      int length = Integer.parseInt(s.substring(index, delimiter));\n      int start = delimiter + 1;\n      answer.add(s.substring(start, start + length));\n      index = start + length;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Palindromic Substring",
      "difficulty": "Medium",
      "subpattern": "Center expansion palindrome",
      "question": "Given a string s, return the longest palindromic substring in s.",
      "trigger": "A palindrome is defined by a center and symmetric expansion around it.",
      "intuition": "Expand around every odd and even center and keep the longest valid range.",
      "edgeCases": "Single character, even-length palindrome, odd-length palindrome, all same characters, no palindrome longer than one.",
      "constraints": "1 <= s.length <= 1000; s consists of digits and English letters.",
      "source": {
        "label": "Longest Palindromic Substring - LeetCode 5",
        "url": "https://leetcode.com/problems/longest-palindromic-substring/"
      },
      "examples": [
        {
          "input": "s = \"babad\"",
          "output": "\"bab\" or \"aba\"",
          "explanation": "Both length-three palindromes are valid."
        },
        {
          "input": "s = \"cbbd\"",
          "output": "\"bb\"",
          "explanation": "The longest palindrome has an even center."
        },
        {
          "input": "s = \"a\"",
          "output": "\"a\"",
          "explanation": "A single character is a palindrome."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every substring for palindrome property.",
      "optimizedComplexity": "Time O(n^2); Space O(1). Expand around each center.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively evaluates centers and expands symmetrically.",
      "bruteForceCode": "class Solution {\n  public String longestPalindrome(String s) {\n    String best = \"\";\n    for (int left = 0; left < s.length(); left++) {\n      for (int right = left; right < s.length(); right++) {\n        if (right - left + 1 > best.length() && isPalindrome(s, left, right)) {\n          best = s.substring(left, right + 1);\n        }\n      }\n    }\n    return best;\n  }\n\n  private boolean isPalindrome(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String longestPalindrome(String s) {\n    int bestStart = 0;\n    int bestLength = 1;\n    for (int center = 0; center < s.length(); center++) {\n      int odd = expand(s, center, center);\n      int even = expand(s, center, center + 1);\n      int length = Math.max(odd, even);\n      if (length > bestLength) {\n        bestLength = length;\n        bestStart = center - (length - 1) / 2;\n      }\n    }\n    return s.substring(bestStart, bestStart + bestLength);\n  }\n\n  private int expand(String s, int left, int right) {\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n      left--;\n      right++;\n    }\n    return right - left - 1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public String longestPalindrome(String s) {\n    int[] best = {0, 1};\n    scanCenters(s, 0, best);\n    return s.substring(best[0], best[0] + best[1]);\n  }\n\n  private void scanCenters(String s, int center, int[] best) {\n    if (center == s.length()) return;\n    update(s, center, center, best);\n    update(s, center, center + 1, best);\n    scanCenters(s, center + 1, best);\n  }\n\n  private void update(String s, int left, int right, int[] best) {\n    int length = expand(s, left, right);\n    if (length > best[1]) {\n      best[0] = left - (length - 1) / 2;\n      best[1] = length;\n    }\n  }\n\n  private int expand(String s, int left, int right) {\n    if (left < 0 || right == s.length() || s.charAt(left) != s.charAt(right)) return right - left - 1;\n    return expand(s, left - 1, right + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String longestPalindrome(String s) {\n    int bestStart = 0;\n    int bestLength = 1;\n    for (int center = 0; center < s.length(); center++) {\n      int odd = expand(s, center, center);\n      int even = expand(s, center, center + 1);\n      int length = Math.max(odd, even);\n      if (length > bestLength) {\n        bestLength = length;\n        bestStart = center - (length - 1) / 2;\n      }\n    }\n    return s.substring(bestStart, bestStart + bestLength);\n  }\n\n  private int expand(String s, int left, int right) {\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n      left--;\n      right++;\n    }\n    return right - left - 1;\n  }\n}",
      "code": "class Solution {\n  public String longestPalindrome(String s) {\n    int bestStart = 0;\n    int bestLength = 1;\n    for (int center = 0; center < s.length(); center++) {\n      int odd = expand(s, center, center);\n      int even = expand(s, center, center + 1);\n      int length = Math.max(odd, even);\n      if (length > bestLength) {\n        bestLength = length;\n        bestStart = center - (length - 1) / 2;\n      }\n    }\n    return s.substring(bestStart, bestStart + bestLength);\n  }\n\n  private int expand(String s, int left, int right) {\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n      left--;\n      right++;\n    }\n    return right - left - 1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Palindromic Substrings",
      "difficulty": "Medium",
      "subpattern": "Palindrome center counting",
      "question": "Given a string s, return the number of palindromic substrings in it.",
      "trigger": "Every palindrome has a center, and expanding from each center counts all palindromes exactly once.",
      "intuition": "For each odd and even center, count how many symmetric expansions remain valid.",
      "edgeCases": "Single character, all same characters, no repeated characters, even center palindromes, long repeated runs.",
      "constraints": "1 <= s.length <= 1000; s consists of lowercase English letters.",
      "source": {
        "label": "Palindromic Substrings - LeetCode 647",
        "url": "https://leetcode.com/problems/palindromic-substrings/"
      },
      "examples": [
        {
          "input": "s = \"abc\"",
          "output": "3",
          "explanation": "Only single-character palindromes exist."
        },
        {
          "input": "s = \"aaa\"",
          "output": "6",
          "explanation": "Three singles, two aa substrings, and one aaa."
        },
        {
          "input": "s = \"aba\"",
          "output": "4",
          "explanation": "a, b, a, and aba are palindromes."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every substring.",
      "optimizedComplexity": "Time O(n^2); Space O(1). Expand around 2n-1 centers.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursive center expansion and center scan.",
      "bruteForceCode": "class Solution {\n  public int countSubstrings(String s) {\n    int count = 0;\n    for (int left = 0; left < s.length(); left++) {\n      for (int right = left; right < s.length(); right++) {\n        if (isPalindrome(s, left, right)) count++;\n      }\n    }\n    return count;\n  }\n\n  private boolean isPalindrome(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int countSubstrings(String s) {\n    int count = 0;\n    for (int center = 0; center < s.length(); center++) {\n      count += expand(s, center, center);\n      count += expand(s, center, center + 1);\n    }\n    return count;\n  }\n\n  private int expand(String s, int left, int right) {\n    int count = 0;\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n      count++;\n      left--;\n      right++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countSubstrings(String s) {\n    return scanCenters(s, 0);\n  }\n\n  private int scanCenters(String s, int center) {\n    if (center == s.length()) return 0;\n    return expand(s, center, center) + expand(s, center, center + 1) + scanCenters(s, center + 1);\n  }\n\n  private int expand(String s, int left, int right) {\n    if (left < 0 || right == s.length() || s.charAt(left) != s.charAt(right)) return 0;\n    return 1 + expand(s, left - 1, right + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countSubstrings(String s) {\n    int count = 0;\n    for (int center = 0; center < s.length(); center++) {\n      count += expand(s, center, center);\n      count += expand(s, center, center + 1);\n    }\n    return count;\n  }\n\n  private int expand(String s, int left, int right) {\n    int count = 0;\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n      count++;\n      left--;\n      right++;\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  public int countSubstrings(String s) {\n    int count = 0;\n    for (int center = 0; center < s.length(); center++) {\n      count += expand(s, center, center);\n      count += expand(s, center, center + 1);\n    }\n    return count;\n  }\n\n  private int expand(String s, int left, int right) {\n    int count = 0;\n    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n      count++;\n      left--;\n      right++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Valid Parenthesis String",
      "difficulty": "Medium",
      "subpattern": "Wildcard parenthesis bounds",
      "question": "Given a string containing (, ), and *, return true if * can be treated as (, ), or empty to make the string valid.",
      "trigger": "The wildcard creates a range of possible open-parenthesis counts rather than one fixed count.",
      "intuition": "Track the minimum and maximum possible open counts while scanning left to right.",
      "edgeCases": "Empty through stars, too many closing parentheses, too many opening parentheses, all stars, nested valid structure.",
      "constraints": "1 <= s.length <= 100; s[i] is (, ), or *.",
      "source": {
        "label": "Valid Parenthesis String - LeetCode 678",
        "url": "https://leetcode.com/problems/valid-parenthesis-string/"
      },
      "examples": [
        {
          "input": "s = \"()\"",
          "output": "true",
          "explanation": "Already valid."
        },
        {
          "input": "s = \"(*)\"",
          "output": "true",
          "explanation": "* can be empty."
        },
        {
          "input": "s = \"(*))\"",
          "output": "true",
          "explanation": "* can be an opening parenthesis."
        }
      ],
      "bruteForceComplexity": "Time O(3^n); Space O(n). Try all choices for each star.",
      "optimizedComplexity": "Time O(n); Space O(1). Greedy lower and upper open-count bounds.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoized recursion over index and open count.",
      "bruteForceCode": "class Solution {\n  public boolean checkValidString(String s) {\n    return tryAll(s, 0, 0);\n  }\n\n  private boolean tryAll(String s, int index, int open) {\n    if (open < 0) return false;\n    if (index == s.length()) return open == 0;\n    char ch = s.charAt(index);\n    if (ch == '(') return tryAll(s, index + 1, open + 1);\n    if (ch == ')') return tryAll(s, index + 1, open - 1);\n    return tryAll(s, index + 1, open) || tryAll(s, index + 1, open + 1) || tryAll(s, index + 1, open - 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean checkValidString(String s) {\n    int low = 0;\n    int high = 0;\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (ch == '(') {\n        low++;\n        high++;\n      } else if (ch == ')') {\n        low = Math.max(0, low - 1);\n        high--;\n      } else {\n        low = Math.max(0, low - 1);\n        high++;\n      }\n      if (high < 0) return false;\n    }\n    return low == 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkValidString(String s) {\n    return valid(s, 0, 0, new Boolean[s.length() + 1][s.length() + 1]);\n  }\n\n  private boolean valid(String s, int index, int open, Boolean[][] memo) {\n    if (open < 0) return false;\n    if (index == s.length()) return open == 0;\n    if (open > s.length()) return false;\n    if (memo[index][open] != null) return memo[index][open];\n    char ch = s.charAt(index);\n    boolean answer;\n    if (ch == '(') answer = valid(s, index + 1, open + 1, memo);\n    else if (ch == ')') answer = valid(s, index + 1, open - 1, memo);\n    else answer = valid(s, index + 1, open, memo) || valid(s, index + 1, open + 1, memo) || valid(s, index + 1, open - 1, memo);\n    return memo[index][open] = answer;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean checkValidString(String s) {\n    int low = 0;\n    int high = 0;\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (ch == '(') {\n        low++;\n        high++;\n      } else if (ch == ')') {\n        low = Math.max(0, low - 1);\n        high--;\n      } else {\n        low = Math.max(0, low - 1);\n        high++;\n      }\n      if (high < 0) return false;\n    }\n    return low == 0;\n  }\n}",
      "code": "class Solution {\n  public boolean checkValidString(String s) {\n    int low = 0;\n    int high = 0;\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (ch == '(') {\n        low++;\n        high++;\n      } else if (ch == ')') {\n        low = Math.max(0, low - 1);\n        high--;\n      } else {\n        low = Math.max(0, low - 1);\n        high++;\n      }\n      if (high < 0) return false;\n    }\n    return low == 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find the Index of the First Occurrence in a String",
      "difficulty": "Easy",
      "subpattern": "KMP prefix matching",
      "question": "Given strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if it is not present.",
      "trigger": "Repeated prefix comparisons can be reused with the prefix-function failure links from KMP.",
      "intuition": "Precompute how much of the pattern remains matched after a mismatch, then scan haystack once.",
      "edgeCases": "Needle length one, needle longer than haystack, match at index 0, repeated pattern prefix, no match.",
      "constraints": "1 <= haystack.length, needle.length <= 10000; strings contain lowercase English letters.",
      "source": {
        "label": "Find the Index of the First Occurrence in a String - LeetCode 28",
        "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
      },
      "examples": [
        {
          "input": "haystack = \"sadbutsad\", needle = \"sad\"",
          "output": "0",
          "explanation": "The first occurrence starts at index 0."
        },
        {
          "input": "haystack = \"leetcode\", needle = \"leeto\"",
          "output": "-1",
          "explanation": "The pattern is absent."
        },
        {
          "input": "haystack = \"aaaaa\", needle = \"bba\"",
          "output": "-1",
          "explanation": "Repeated haystack characters still do not match."
        }
      ],
      "bruteForceComplexity": "Time O(nm); Space O(1). Try every starting index and compare characters.",
      "optimizedComplexity": "Time O(n+m); Space O(m). KMP scans haystack once after prefix preprocessing.",
      "recursiveComplexity": "Time O(nm); Space O(n). Recursive naive search tries each start.",
      "bruteForceCode": "class Solution {\n  public int strStr(String haystack, String needle) {\n    for (int start = 0; start + needle.length() <= haystack.length(); start++) {\n      int i = 0;\n      while (i < needle.length() && haystack.charAt(start + i) == needle.charAt(i)) i++;\n      if (i == needle.length()) return start;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int strStr(String haystack, String needle) {\n    int[] lps = buildLps(needle);\n    int j = 0;\n    for (int i = 0; i < haystack.length(); i++) {\n      while (j > 0 && haystack.charAt(i) != needle.charAt(j)) j = lps[j - 1];\n      if (haystack.charAt(i) == needle.charAt(j)) j++;\n      if (j == needle.length()) return i - needle.length() + 1;\n    }\n    return -1;\n  }\n\n  private int[] buildLps(String pattern) {\n    int[] lps = new int[pattern.length()];\n    for (int i = 1, len = 0; i < pattern.length(); i++) {\n      while (len > 0 && pattern.charAt(i) != pattern.charAt(len)) len = lps[len - 1];\n      if (pattern.charAt(i) == pattern.charAt(len)) lps[i] = ++len;\n    }\n    return lps;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int strStr(String haystack, String needle) {\n    return search(haystack, needle, 0);\n  }\n\n  private int search(String haystack, String needle, int start) {\n    if (start + needle.length() > haystack.length()) return -1;\n    if (matches(haystack, needle, start, 0)) return start;\n    return search(haystack, needle, start + 1);\n  }\n\n  private boolean matches(String haystack, String needle, int start, int index) {\n    if (index == needle.length()) return true;\n    if (haystack.charAt(start + index) != needle.charAt(index)) return false;\n    return matches(haystack, needle, start, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int strStr(String haystack, String needle) {\n    int[] lps = buildLps(needle);\n    int j = 0;\n    for (int i = 0; i < haystack.length(); i++) {\n      while (j > 0 && haystack.charAt(i) != needle.charAt(j)) j = lps[j - 1];\n      if (haystack.charAt(i) == needle.charAt(j)) j++;\n      if (j == needle.length()) return i - needle.length() + 1;\n    }\n    return -1;\n  }\n\n  private int[] buildLps(String pattern) {\n    int[] lps = new int[pattern.length()];\n    for (int i = 1, len = 0; i < pattern.length(); i++) {\n      while (len > 0 && pattern.charAt(i) != pattern.charAt(len)) len = lps[len - 1];\n      if (pattern.charAt(i) == pattern.charAt(len)) lps[i] = ++len;\n    }\n    return lps;\n  }\n}",
      "code": "class Solution {\n  public int strStr(String haystack, String needle) {\n    int[] lps = buildLps(needle);\n    int j = 0;\n    for (int i = 0; i < haystack.length(); i++) {\n      while (j > 0 && haystack.charAt(i) != needle.charAt(j)) j = lps[j - 1];\n      if (haystack.charAt(i) == needle.charAt(j)) j++;\n      if (j == needle.length()) return i - needle.length() + 1;\n    }\n    return -1;\n  }\n\n  private int[] buildLps(String pattern) {\n    int[] lps = new int[pattern.length()];\n    for (int i = 1, len = 0; i < pattern.length(); i++) {\n      while (len > 0 && pattern.charAt(i) != pattern.charAt(len)) len = lps[len - 1];\n      if (pattern.charAt(i) == pattern.charAt(len)) lps[i] = ++len;\n    }\n    return lps;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Repeated Substring Pattern",
      "difficulty": "Easy",
      "subpattern": "Period detection",
      "question": "Given a string s, return true if it can be constructed by repeating one of its proper substrings multiple times.",
      "trigger": "A repeated string has a period length that divides the full length.",
      "intuition": "Try candidate periods or use the doubled-string trick to detect a non-trivial rotation.",
      "edgeCases": "Single character, all same characters, prime length, repeated multi-character period, almost repeated string.",
      "constraints": "1 <= s.length <= 10000; s consists of lowercase English letters.",
      "source": {
        "label": "Repeated Substring Pattern - LeetCode 459",
        "url": "https://leetcode.com/problems/repeated-substring-pattern/"
      },
      "examples": [
        {
          "input": "s = \"abab\"",
          "output": "true",
          "explanation": "ab repeated twice forms the string."
        },
        {
          "input": "s = \"aba\"",
          "output": "false",
          "explanation": "No proper substring repeats to form it."
        },
        {
          "input": "s = \"abcabcabcabc\"",
          "output": "true",
          "explanation": "abc repeats four times."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Try every period length that divides n.",
      "optimizedComplexity": "Time O(n); Space O(n). The prefix table gives the longest border; a valid period is n - border when it divides n.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively tests candidate period lengths.",
      "bruteForceCode": "class Solution {\n  public boolean repeatedSubstringPattern(String s) {\n    for (int length = 1; length <= s.length() / 2; length++) {\n      if (s.length() % length == 0 && repeats(s, length)) return true;\n    }\n    return false;\n  }\n\n  private boolean repeats(String s, int length) {\n    for (int i = length; i < s.length(); i++) {\n      if (s.charAt(i) != s.charAt(i % length)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean repeatedSubstringPattern(String s) {\n    int n = s.length();\n    int[] lps = new int[n];\n    for (int i = 1; i < n; i++) {\n      int length = lps[i - 1];\n      while (length > 0 && s.charAt(i) != s.charAt(length)) {\n        length = lps[length - 1];\n      }\n      if (s.charAt(i) == s.charAt(length)) length++;\n      lps[i] = length;\n    }\n    int border = lps[n - 1];\n    int period = n - border;\n    return border > 0 && n % period == 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean repeatedSubstringPattern(String s) {\n    return tryLength(s, 1);\n  }\n\n  private boolean tryLength(String s, int length) {\n    if (length > s.length() / 2) return false;\n    if (s.length() % length == 0 && matchesPeriod(s, length, length)) return true;\n    return tryLength(s, length + 1);\n  }\n\n  private boolean matchesPeriod(String s, int length, int index) {\n    if (index == s.length()) return true;\n    if (s.charAt(index) != s.charAt(index % length)) return false;\n    return matchesPeriod(s, length, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean repeatedSubstringPattern(String s) {\n    int n = s.length();\n    int[] lps = new int[n];\n    for (int i = 1; i < n; i++) {\n      int length = lps[i - 1];\n      while (length > 0 && s.charAt(i) != s.charAt(length)) {\n        length = lps[length - 1];\n      }\n      if (s.charAt(i) == s.charAt(length)) length++;\n      lps[i] = length;\n    }\n    int border = lps[n - 1];\n    int period = n - border;\n    return border > 0 && n % period == 0;\n  }\n}",
      "code": "class Solution {\n  public boolean repeatedSubstringPattern(String s) {\n    int n = s.length();\n    int[] lps = new int[n];\n    for (int i = 1; i < n; i++) {\n      int length = lps[i - 1];\n      while (length > 0 && s.charAt(i) != s.charAt(length)) {\n        length = lps[length - 1];\n      }\n      if (s.charAt(i) == s.charAt(length)) length++;\n      lps[i] = length;\n    }\n    int border = lps[n - 1];\n    int period = n - border;\n    return border > 0 && n % period == 0;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "String Compression",
      "difficulty": "Medium",
      "subpattern": "Run-length in-place compression",
      "question": "Given an array of characters, compress it in place by replacing each group with the character followed by its count when count is greater than one, and return the new length.",
      "trigger": "The string consists of consecutive runs, and compression writes a shorter representation back into the same array.",
      "intuition": "Read one run at a time and write the character plus decimal digits of its length.",
      "edgeCases": "Single character, count one should not write a digit, count has multiple digits, all same character, no compression possible.",
      "constraints": "1 <= chars.length <= 2000; chars[i] is a lowercase/uppercase letter, digit, or symbol.",
      "source": {
        "label": "String Compression - LeetCode 443",
        "url": "https://leetcode.com/problems/string-compression/"
      },
      "examples": [
        {
          "input": "chars = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
          "output": "6, chars starts [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"]",
          "explanation": "Each repeated run writes its count."
        },
        {
          "input": "chars = [\"a\"]",
          "output": "1",
          "explanation": "A count of one is omitted."
        },
        {
          "input": "chars = [\"a\" repeated 12 times]",
          "output": "3, chars starts [\"a\",\"1\",\"2\"]",
          "explanation": "Multi-digit counts are written one digit at a time."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build a compressed string first, then copy it back.",
      "optimizedComplexity": "Time O(n); Space O(1). Two pointers read runs and write compressed output in place.",
      "recursiveComplexity": "Time O(n); Space O(d) call stack for groups. Recursively writes one run per call.",
      "bruteForceCode": "class Solution {\n  public int compress(char[] chars) {\n    StringBuilder builder = new StringBuilder();\n    int index = 0;\n    while (index < chars.length) {\n      char current = chars[index];\n      int start = index;\n      while (index < chars.length && chars[index] == current) index++;\n      builder.append(current);\n      int count = index - start;\n      if (count > 1) builder.append(count);\n    }\n    for (int i = 0; i < builder.length(); i++) chars[i] = builder.charAt(i);\n    return builder.length();\n  }\n}",
      "iterativeCode": "class Solution {\n  public int compress(char[] chars) {\n    int write = 0;\n    int read = 0;\n    while (read < chars.length) {\n      char current = chars[read];\n      int start = read;\n      while (read < chars.length && chars[read] == current) read++;\n      chars[write++] = current;\n      int count = read - start;\n      if (count > 1) {\n        String digits = String.valueOf(count);\n        for (int i = 0; i < digits.length(); i++) chars[write++] = digits.charAt(i);\n      }\n    }\n    return write;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int compress(char[] chars) {\n    return writeRun(chars, 0, 0);\n  }\n\n  private int writeRun(char[] chars, int read, int write) {\n    if (read == chars.length) return write;\n    char current = chars[read];\n    int next = read;\n    while (next < chars.length && chars[next] == current) next++;\n    chars[write++] = current;\n    int count = next - read;\n    if (count > 1) {\n      String digits = String.valueOf(count);\n      for (int i = 0; i < digits.length(); i++) chars[write++] = digits.charAt(i);\n    }\n    return writeRun(chars, next, write);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int compress(char[] chars) {\n    int write = 0;\n    int read = 0;\n    while (read < chars.length) {\n      char current = chars[read];\n      int start = read;\n      while (read < chars.length && chars[read] == current) read++;\n      chars[write++] = current;\n      int count = read - start;\n      if (count > 1) {\n        String digits = String.valueOf(count);\n        for (int i = 0; i < digits.length(); i++) chars[write++] = digits.charAt(i);\n      }\n    }\n    return write;\n  }\n}",
      "code": "class Solution {\n  public int compress(char[] chars) {\n    int write = 0;\n    int read = 0;\n    while (read < chars.length) {\n      char current = chars[read];\n      int start = read;\n      while (read < chars.length && chars[read] == current) read++;\n      chars[write++] = current;\n      int count = read - start;\n      if (count > 1) {\n        String digits = String.valueOf(count);\n        for (int i = 0; i < digits.length(); i++) chars[write++] = digits.charAt(i);\n      }\n    }\n    return write;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Reverse Words in a String",
      "difficulty": "Medium",
      "subpattern": "Reverse word parsing",
      "question": "Given a string s, reverse the order of its words, removing leading/trailing spaces and reducing multiple spaces to one.",
      "trigger": "Words are separated by variable whitespace, and only word order changes, not character order inside words.",
      "intuition": "Parse words from right to left and append each word with a single separating space.",
      "edgeCases": "Leading spaces, trailing spaces, multiple spaces between words, single word, all words one character.",
      "constraints": "1 <= s.length <= 10000; s contains English letters, digits, and spaces.",
      "source": {
        "label": "Reverse Words in a String - LeetCode 151",
        "url": "https://leetcode.com/problems/reverse-words-in-a-string/"
      },
      "examples": [
        {
          "input": "s = \"the sky is blue\"",
          "output": "\"blue is sky the\"",
          "explanation": "Word order is reversed."
        },
        {
          "input": "s = \"  hello world  \"",
          "output": "\"world hello\"",
          "explanation": "Outer spaces are removed."
        },
        {
          "input": "s = \"a good   example\"",
          "output": "\"example good a\"",
          "explanation": "Multiple spaces collapse to one."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Split and rebuild reversed words.",
      "optimizedComplexity": "Time O(n); Space O(n). Parse words from the end without storing all tokens first.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively processes split words from right to left.",
      "bruteForceCode": "class Solution {\n  public String reverseWords(String s) {\n    String[] parts = s.trim().split(\"\\s+\");\n    StringBuilder answer = new StringBuilder();\n    for (int i = parts.length - 1; i >= 0; i--) {\n      if (answer.length() > 0) answer.append(' ');\n      answer.append(parts[i]);\n    }\n    return answer.toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  public String reverseWords(String s) {\n    StringBuilder answer = new StringBuilder();\n    int index = s.length() - 1;\n    while (index >= 0) {\n      while (index >= 0 && s.charAt(index) == ' ') index--;\n      if (index < 0) break;\n      int end = index;\n      while (index >= 0 && s.charAt(index) != ' ') index--;\n      if (answer.length() > 0) answer.append(' ');\n      answer.append(s, index + 1, end + 1);\n    }\n    return answer.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String reverseWords(String s) {\n    String[] words = s.trim().isEmpty() ? new String[0] : s.trim().split(\"\\s+\");\n    StringBuilder answer = new StringBuilder();\n    append(words, words.length - 1, answer);\n    return answer.toString();\n  }\n\n  private void append(String[] words, int index, StringBuilder answer) {\n    if (index < 0) return;\n    if (answer.length() > 0) answer.append(' ');\n    answer.append(words[index]);\n    append(words, index - 1, answer);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String reverseWords(String s) {\n    StringBuilder answer = new StringBuilder();\n    int index = s.length() - 1;\n    while (index >= 0) {\n      while (index >= 0 && s.charAt(index) == ' ') index--;\n      if (index < 0) break;\n      int end = index;\n      while (index >= 0 && s.charAt(index) != ' ') index--;\n      if (answer.length() > 0) answer.append(' ');\n      answer.append(s, index + 1, end + 1);\n    }\n    return answer.toString();\n  }\n}",
      "code": "class Solution {\n  public String reverseWords(String s) {\n    StringBuilder answer = new StringBuilder();\n    int index = s.length() - 1;\n    while (index >= 0) {\n      while (index >= 0 && s.charAt(index) == ' ') index--;\n      if (index < 0) break;\n      int end = index;\n      while (index >= 0 && s.charAt(index) != ' ') index--;\n      if (answer.length() > 0) answer.append(' ');\n      answer.append(s, index + 1, end + 1);\n    }\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Zigzag Conversion",
      "difficulty": "Medium",
      "subpattern": "Zigzag row simulation",
      "question": "Given a string s and number of rows, write the string in zigzag order and then read row by row.",
      "trigger": "Each character belongs to a row that moves down then up in a fixed cycle.",
      "intuition": "Simulate the current row and direction, appending each character to its row bucket.",
      "edgeCases": "numRows is 1, numRows >= s.length, two rows, full cycles, final partial cycle.",
      "constraints": "1 <= s.length <= 1000; 1 <= numRows <= 1000; s contains English letters, comma, and period.",
      "source": {
        "label": "Zigzag Conversion - LeetCode 6",
        "url": "https://leetcode.com/problems/zigzag-conversion/"
      },
      "examples": [
        {
          "input": "s = \"PAYPALISHIRING\", numRows = 3",
          "output": "\"PAHNAPLSIIGYIR\"",
          "explanation": "Rows are read after zigzag placement."
        },
        {
          "input": "s = \"PAYPALISHIRING\", numRows = 4",
          "output": "\"PINALSIGYAHRPI\"",
          "explanation": "A different row count changes the cycle."
        },
        {
          "input": "s = \"A\", numRows = 1",
          "output": "\"A\"",
          "explanation": "One row leaves the string unchanged."
        }
      ],
      "bruteForceComplexity": "Time O(n * rows); Space O(n * rows). Fill a grid-like layout and read rows.",
      "optimizedComplexity": "Time O(n); Space O(n). Append directly to row builders while simulating direction.",
      "recursiveComplexity": "Time O(n); Space O(n + recursion depth). Recursively places one character per call.",
      "bruteForceCode": "class Solution {\n  public String convert(String s, int numRows) {\n    if (numRows == 1 || numRows >= s.length()) return s;\n    int cycle = 2 * numRows - 2;\n    StringBuilder answer = new StringBuilder();\n    for (int row = 0; row < numRows; row++) {\n      for (int i = row; i < s.length(); i += cycle) {\n        answer.append(s.charAt(i));\n        int diagonal = i + cycle - 2 * row;\n        if (row != 0 && row != numRows - 1 && diagonal < s.length()) answer.append(s.charAt(diagonal));\n      }\n    }\n    return answer.toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  public String convert(String s, int numRows) {\n    if (numRows == 1 || numRows >= s.length()) return s;\n    StringBuilder[] rows = new StringBuilder[numRows];\n    for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();\n\n    int row = 0;\n    int direction = 1;\n    for (int i = 0; i < s.length(); i++) {\n      rows[row].append(s.charAt(i));\n      if (row == 0) direction = 1;\n      else if (row == numRows - 1) direction = -1;\n      row += direction;\n    }\n\n    StringBuilder answer = new StringBuilder();\n    for (StringBuilder current : rows) answer.append(current);\n    return answer.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String convert(String s, int numRows) {\n    if (numRows == 1 || numRows >= s.length()) return s;\n    StringBuilder[] rows = new StringBuilder[numRows];\n    for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();\n    place(s, 0, 0, 1, rows);\n    StringBuilder answer = new StringBuilder();\n    for (StringBuilder row : rows) answer.append(row);\n    return answer.toString();\n  }\n\n  private void place(String s, int index, int row, int direction, StringBuilder[] rows) {\n    if (index == s.length()) return;\n    rows[row].append(s.charAt(index));\n    if (row == 0) direction = 1;\n    else if (row == rows.length - 1) direction = -1;\n    place(s, index + 1, row + direction, direction, rows);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String convert(String s, int numRows) {\n    if (numRows == 1 || numRows >= s.length()) return s;\n    StringBuilder[] rows = new StringBuilder[numRows];\n    for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();\n\n    int row = 0;\n    int direction = 1;\n    for (int i = 0; i < s.length(); i++) {\n      rows[row].append(s.charAt(i));\n      if (row == 0) direction = 1;\n      else if (row == numRows - 1) direction = -1;\n      row += direction;\n    }\n\n    StringBuilder answer = new StringBuilder();\n    for (StringBuilder current : rows) answer.append(current);\n    return answer.toString();\n  }\n}",
      "code": "class Solution {\n  public String convert(String s, int numRows) {\n    if (numRows == 1 || numRows >= s.length()) return s;\n    StringBuilder[] rows = new StringBuilder[numRows];\n    for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();\n\n    int row = 0;\n    int direction = 1;\n    for (int i = 0; i < s.length(); i++) {\n      rows[row].append(s.charAt(i));\n      if (row == 0) direction = 1;\n      else if (row == numRows - 1) direction = -1;\n      row += direction;\n    }\n\n    StringBuilder answer = new StringBuilder();\n    for (StringBuilder current : rows) answer.append(current);\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Add Strings",
      "difficulty": "Easy",
      "subpattern": "Decimal carry string addition",
      "question": "Given two non-negative integers as strings, return their sum as a string without converting the full inputs to integers.",
      "trigger": "The inputs can be too large for primitive numeric types, so addition must be digit-by-digit with carry.",
      "intuition": "Read both strings from right to left, append sum modulo 10, and carry sum divided by 10.",
      "edgeCases": "Different lengths, final carry, one input zero, many consecutive carries, very long inputs.",
      "constraints": "1 <= num1.length, num2.length <= 10000; num1 and num2 contain digits only and have no leading zeros except 0.",
      "source": {
        "label": "Add Strings - LeetCode 415",
        "url": "https://leetcode.com/problems/add-strings/"
      },
      "examples": [
        {
          "input": "num1 = \"11\", num2 = \"123\"",
          "output": "\"134\"",
          "explanation": "11 + 123 = 134."
        },
        {
          "input": "num1 = \"456\", num2 = \"77\"",
          "output": "\"533\"",
          "explanation": "Carry propagates across digits."
        },
        {
          "input": "num1 = \"0\", num2 = \"0\"",
          "output": "\"0\"",
          "explanation": "Zero plus zero remains zero."
        }
      ],
      "bruteForceComplexity": "Time O(n+m); Space O(n+m). BigInteger handles arbitrary precision as a baseline.",
      "optimizedComplexity": "Time O(n+m); Space O(n+m). Manual carry addition over characters.",
      "recursiveComplexity": "Time O(n+m); Space O(n+m). Recursive digit addition builds the reversed result.",
      "bruteForceCode": "import java.math.*;\n\nclass Solution {\n  public String addStrings(String num1, String num2) {\n    BigInteger left = new BigInteger(num1);\n    BigInteger right = new BigInteger(num2);\n    return left.add(right).toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  public String addStrings(String num1, String num2) {\n    StringBuilder reversed = new StringBuilder();\n    int i = num1.length() - 1;\n    int j = num2.length() - 1;\n    int carry = 0;\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += num1.charAt(i--) - '0';\n      if (j >= 0) sum += num2.charAt(j--) - '0';\n      reversed.append(sum % 10);\n      carry = sum / 10;\n    }\n    return reversed.reverse().toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String addStrings(String num1, String num2) {\n    StringBuilder reversed = new StringBuilder();\n    add(num1, num1.length() - 1, num2, num2.length() - 1, 0, reversed);\n    return reversed.reverse().toString();\n  }\n\n  private void add(String a, int i, String b, int j, int carry, StringBuilder reversed) {\n    if (i < 0 && j < 0 && carry == 0) return;\n    int sum = carry;\n    if (i >= 0) sum += a.charAt(i) - '0';\n    if (j >= 0) sum += b.charAt(j) - '0';\n    reversed.append(sum % 10);\n    add(a, i - 1, b, j - 1, sum / 10, reversed);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String addStrings(String num1, String num2) {\n    StringBuilder reversed = new StringBuilder();\n    int i = num1.length() - 1;\n    int j = num2.length() - 1;\n    int carry = 0;\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += num1.charAt(i--) - '0';\n      if (j >= 0) sum += num2.charAt(j--) - '0';\n      reversed.append(sum % 10);\n      carry = sum / 10;\n    }\n    return reversed.reverse().toString();\n  }\n}",
      "code": "class Solution {\n  public String addStrings(String num1, String num2) {\n    StringBuilder reversed = new StringBuilder();\n    int i = num1.length() - 1;\n    int j = num2.length() - 1;\n    int carry = 0;\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += num1.charAt(i--) - '0';\n      if (j >= 0) sum += num2.charAt(j--) - '0';\n      reversed.append(sum % 10);\n      carry = sum / 10;\n    }\n    return reversed.reverse().toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Decode String",
      "difficulty": "Medium",
      "subpattern": "Bracketed repetition decoding",
      "question": "Given an encoded string with patterns k[encoded_string], return the decoded string.",
      "trigger": "Nested brackets require preserving prior strings and repeat counts until a closing bracket is reached.",
      "intuition": "Use stacks for counts and partial strings, or parse recursively inside each bracket.",
      "edgeCases": "Nested brackets, multi-digit repeat counts, adjacent encoded blocks, plain characters, repeat count one.",
      "constraints": "1 <= s.length <= 30; s contains lowercase letters, digits, and brackets; decoded length is within limits.",
      "source": {
        "label": "Decode String - LeetCode 394",
        "url": "https://leetcode.com/problems/decode-string/"
      },
      "examples": [
        {
          "input": "s = \"3[a]2[bc]\"",
          "output": "\"aaabcbc\"",
          "explanation": "Each bracketed block repeats independently."
        },
        {
          "input": "s = \"3[a2[c]]\"",
          "output": "\"accaccacc\"",
          "explanation": "The inner block is decoded before outer repetition."
        },
        {
          "input": "s = \"2[abc]3[cd]ef\"",
          "output": "\"abcabccdcdcdef\"",
          "explanation": "Plain suffix is appended after decoded blocks."
        }
      ],
      "bruteForceComplexity": "Time O(decoded length * nesting); Space O(decoded length). Repeatedly expands the innermost bracket.",
      "optimizedComplexity": "Time O(decoded length); Space O(n). Stacks store counts and previous builders.",
      "recursiveComplexity": "Time O(decoded length); Space O(n). Recursive parser decodes one bracketed region per call.",
      "bruteForceCode": "class Solution {\n  public String decodeString(String s) {\n    while (s.indexOf(']') >= 0) {\n      int close = s.indexOf(']');\n      int open = close;\n      while (s.charAt(open) != '[') open--;\n      int start = open - 1;\n      while (start >= 0 && Character.isDigit(s.charAt(start))) start--;\n      int count = Integer.parseInt(s.substring(start + 1, open));\n      String repeated = repeat(s.substring(open + 1, close), count);\n      s = s.substring(0, start + 1) + repeated + s.substring(close + 1);\n    }\n    return s;\n  }\n\n  private String repeat(String value, int count) {\n    StringBuilder builder = new StringBuilder();\n    for (int i = 0; i < count; i++) builder.append(value);\n    return builder.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> stack = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int number = 0;\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (Character.isDigit(ch)) number = number * 10 + ch - '0';\n      else if (ch == '[') {\n        counts.push(number);\n        stack.push(current);\n        current = new StringBuilder();\n        number = 0;\n      } else if (ch == ']') {\n        StringBuilder decoded = stack.pop();\n        int repeat = counts.pop();\n        for (int k = 0; k < repeat; k++) decoded.append(current);\n        current = decoded;\n      } else {\n        current.append(ch);\n      }\n    }\n    return current.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String decodeString(String s) {\n    return parse(s, new int[]{0});\n  }\n\n  private String parse(String s, int[] index) {\n    StringBuilder current = new StringBuilder();\n    while (index[0] < s.length() && s.charAt(index[0]) != ']') {\n      char ch = s.charAt(index[0]);\n      if (Character.isDigit(ch)) {\n        int count = 0;\n        while (Character.isDigit(s.charAt(index[0]))) count = count * 10 + s.charAt(index[0]++) - '0';\n        index[0]++;\n        String inner = parse(s, index);\n        index[0]++;\n        for (int i = 0; i < count; i++) current.append(inner);\n      } else {\n        current.append(ch);\n        index[0]++;\n      }\n    }\n    return current.toString();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> stack = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int number = 0;\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (Character.isDigit(ch)) number = number * 10 + ch - '0';\n      else if (ch == '[') {\n        counts.push(number);\n        stack.push(current);\n        current = new StringBuilder();\n        number = 0;\n      } else if (ch == ']') {\n        StringBuilder decoded = stack.pop();\n        int repeat = counts.pop();\n        for (int k = 0; k < repeat; k++) decoded.append(current);\n        current = decoded;\n      } else {\n        current.append(ch);\n      }\n    }\n    return current.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> stack = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int number = 0;\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (Character.isDigit(ch)) number = number * 10 + ch - '0';\n      else if (ch == '[') {\n        counts.push(number);\n        stack.push(current);\n        current = new StringBuilder();\n        number = 0;\n      } else if (ch == ']') {\n        StringBuilder decoded = stack.pop();\n        int repeat = counts.pop();\n        for (int k = 0; k < repeat; k++) decoded.append(current);\n        current = decoded;\n      } else {\n        current.append(ch);\n      }\n    }\n    return current.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Basic Calculator II",
      "difficulty": "Medium",
      "subpattern": "Operator precedence parsing",
      "question": "Given a string expression containing non-negative integers and operators +, -, *, /, evaluate it with integer division truncating toward zero.",
      "trigger": "Multiplication and division have higher precedence, so they must be resolved before addition and subtraction.",
      "intuition": "Keep the last signed term; commit it to the result only when a lower-precedence operator boundary is reached.",
      "edgeCases": "Spaces, multi-digit numbers, leading number, division truncation, expression ending with a number.",
      "constraints": "1 <= s.length <= 300000; s consists of digits, spaces, +, -, *, and /; expression is valid.",
      "source": {
        "label": "Basic Calculator II - LeetCode 227",
        "url": "https://leetcode.com/problems/basic-calculator-ii/"
      },
      "examples": [
        {
          "input": "s = \"3+2*2\"",
          "output": "7",
          "explanation": "Multiplication happens before addition."
        },
        {
          "input": "s = \" 3/2 \"",
          "output": "1",
          "explanation": "Integer division truncates toward zero."
        },
        {
          "input": "s = \" 3+5 / 2 \"",
          "output": "5",
          "explanation": "5 / 2 becomes 2, then 3 + 2."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Tokenize, resolve * and / first, then sum + and -.",
      "optimizedComplexity": "Time O(n); Space O(1). One pass keeps result, last term, current number, and operator.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive descent parser separates expression, term, and number levels.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int calculate(String s) {\n    List<Integer> nums = new ArrayList<>();\n    List<Character> ops = new ArrayList<>();\n    for (int i = 0; i < s.length();) {\n      if (s.charAt(i) == ' ') { i++; continue; }\n      if (Character.isDigit(s.charAt(i))) {\n        int value = 0;\n        while (i < s.length() && Character.isDigit(s.charAt(i))) value = value * 10 + s.charAt(i++) - '0';\n        nums.add(value);\n      } else ops.add(s.charAt(i++));\n    }\n    for (int i = 0; i < ops.size();) {\n      char op = ops.get(i);\n      if (op == '*' || op == '/') {\n        int value = op == '*' ? nums.get(i) * nums.get(i + 1) : nums.get(i) / nums.get(i + 1);\n        nums.set(i, value);\n        nums.remove(i + 1);\n        ops.remove(i);\n      } else i++;\n    }\n    int result = nums.get(0);\n    for (int i = 0; i < ops.size(); i++) result = ops.get(i) == '+' ? result + nums.get(i + 1) : result - nums.get(i + 1);\n    return result;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int calculate(String s) {\n    int result = 0;\n    int last = 0;\n    int number = 0;\n    char operator = '+';\n    for (int i = 0; i <= s.length(); i++) {\n      char ch = i < s.length() ? s.charAt(i) : '+';\n      if (ch == ' ') continue;\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      } else {\n        if (operator == '+') { result += last; last = number; }\n        else if (operator == '-') { result += last; last = -number; }\n        else if (operator == '*') last *= number;\n        else last /= number;\n        operator = ch;\n        number = 0;\n      }\n    }\n    return result + last;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int calculate(String s) {\n    return expression(s, new int[]{0});\n  }\n\n  private int expression(String s, int[] index) {\n    int value = term(s, index);\n    while (index[0] < s.length()) {\n      skipSpaces(s, index);\n      if (index[0] == s.length()) break;\n      char op = s.charAt(index[0]);\n      if (op != '+' && op != '-') break;\n      index[0]++;\n      int next = term(s, index);\n      value = op == '+' ? value + next : value - next;\n    }\n    return value;\n  }\n\n  private int term(String s, int[] index) {\n    int value = number(s, index);\n    while (index[0] < s.length()) {\n      skipSpaces(s, index);\n      if (index[0] == s.length()) break;\n      char op = s.charAt(index[0]);\n      if (op != '*' && op != '/') break;\n      index[0]++;\n      int next = number(s, index);\n      value = op == '*' ? value * next : value / next;\n    }\n    return value;\n  }\n\n  private int number(String s, int[] index) {\n    skipSpaces(s, index);\n    int value = 0;\n    while (index[0] < s.length() && Character.isDigit(s.charAt(index[0]))) value = value * 10 + s.charAt(index[0]++) - '0';\n    return value;\n  }\n\n  private void skipSpaces(String s, int[] index) {\n    while (index[0] < s.length() && s.charAt(index[0]) == ' ') index[0]++;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int calculate(String s) {\n    int result = 0;\n    int last = 0;\n    int number = 0;\n    char operator = '+';\n    for (int i = 0; i <= s.length(); i++) {\n      char ch = i < s.length() ? s.charAt(i) : '+';\n      if (ch == ' ') continue;\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      } else {\n        if (operator == '+') { result += last; last = number; }\n        else if (operator == '-') { result += last; last = -number; }\n        else if (operator == '*') last *= number;\n        else last /= number;\n        operator = ch;\n        number = 0;\n      }\n    }\n    return result + last;\n  }\n}",
      "code": "class Solution {\n  public int calculate(String s) {\n    int result = 0;\n    int last = 0;\n    int number = 0;\n    char operator = '+';\n    for (int i = 0; i <= s.length(); i++) {\n      char ch = i < s.length() ? s.charAt(i) : '+';\n      if (ch == ' ') continue;\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      } else {\n        if (operator == '+') { result += last; last = number; }\n        else if (operator == '-') { result += last; last = -number; }\n        else if (operator == '*') last *= number;\n        else last /= number;\n        operator = ch;\n        number = 0;\n      }\n    }\n    return result + last;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Longest Common Prefix",
      "difficulty": "Easy",
      "subpattern": "Vertical prefix scan",
      "question": "Given an array of strings, return the longest common prefix among all strings.",
      "trigger": "The answer is a prefix shared at every character position across all strings.",
      "intuition": "Check characters column by column until a string ends or a mismatch appears.",
      "edgeCases": "One string, empty string, no common prefix, all strings equal, prefix ends at the shortest string.",
      "constraints": "1 <= strs.length <= 200; 0 <= strs[i].length <= 200; strs[i] contains lowercase English letters.",
      "source": {
        "label": "Longest Common Prefix - LeetCode 14",
        "url": "https://leetcode.com/problems/longest-common-prefix/"
      },
      "examples": [
        {
          "input": "strs = [\"flower\",\"flow\",\"flight\"]",
          "output": "\"fl\"",
          "explanation": "All strings share fl."
        },
        {
          "input": "strs = [\"dog\",\"racecar\",\"car\"]",
          "output": "\"\"",
          "explanation": "There is no common first character."
        },
        {
          "input": "strs = [\"alone\"]",
          "output": "\"alone\"",
          "explanation": "One string is its own prefix."
        }
      ],
      "bruteForceComplexity": "Time O(S); Space O(1). Shrink a candidate prefix until every string starts with it.",
      "optimizedComplexity": "Time O(S); Space O(1). Vertical scan stops at the first mismatch.",
      "recursiveComplexity": "Time O(S); Space O(n). Recursively verifies one prefix index at a time.",
      "bruteForceCode": "class Solution {\n  public String longestCommonPrefix(String[] strs) {\n    String prefix = strs[0];\n    for (int i = 1; i < strs.length; i++) {\n      while (!strs[i].startsWith(prefix)) {\n        prefix = prefix.substring(0, prefix.length() - 1);\n        if (prefix.isEmpty()) return \"\";\n      }\n    }\n    return prefix;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String longestCommonPrefix(String[] strs) {\n    for (int index = 0; index < strs[0].length(); index++) {\n      char expected = strs[0].charAt(index);\n      for (int i = 1; i < strs.length; i++) {\n        if (index == strs[i].length() || strs[i].charAt(index) != expected) {\n          return strs[0].substring(0, index);\n        }\n      }\n    }\n    return strs[0];\n  }\n}",
      "recursiveCode": "class Solution {\n  public String longestCommonPrefix(String[] strs) {\n    int length = match(strs, 0);\n    return strs[0].substring(0, length);\n  }\n\n  private int match(String[] strs, int index) {\n    if (index == strs[0].length()) return index;\n    char expected = strs[0].charAt(index);\n    for (String s : strs) {\n      if (index == s.length() || s.charAt(index) != expected) return index;\n    }\n    return match(strs, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String longestCommonPrefix(String[] strs) {\n    for (int index = 0; index < strs[0].length(); index++) {\n      char expected = strs[0].charAt(index);\n      for (int i = 1; i < strs.length; i++) {\n        if (index == strs[i].length() || strs[i].charAt(index) != expected) {\n          return strs[0].substring(0, index);\n        }\n      }\n    }\n    return strs[0];\n  }\n}",
      "code": "class Solution {\n  public String longestCommonPrefix(String[] strs) {\n    for (int index = 0; index < strs[0].length(); index++) {\n      char expected = strs[0].charAt(index);\n      for (int i = 1; i < strs.length; i++) {\n        if (index == strs[i].length() || strs[i].charAt(index) != expected) {\n          return strs[0].substring(0, index);\n        }\n      }\n    }\n    return strs[0];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Compare Version Numbers",
      "difficulty": "Medium",
      "subpattern": "Version segment comparison",
      "question": "Given two version strings, compare their revision numbers and return -1, 0, or 1.",
      "trigger": "Dots split comparable integer segments, and missing segments are treated as zero.",
      "intuition": "Parse one numeric segment from each string at a time, compare, then continue after dots.",
      "edgeCases": "Leading zeros, different number of segments, trailing zeros, equal versions with different formatting, large segment values.",
      "constraints": "1 <= version1.length, version2.length <= 500; versions contain digits and dots; revisions fit in 32-bit signed integer.",
      "source": {
        "label": "Compare Version Numbers - LeetCode 165",
        "url": "https://leetcode.com/problems/compare-version-numbers/"
      },
      "examples": [
        {
          "input": "version1 = \"1.01\", version2 = \"1.001\"",
          "output": "0",
          "explanation": "Leading zeros do not change segment value."
        },
        {
          "input": "version1 = \"1.0\", version2 = \"1.0.0\"",
          "output": "0",
          "explanation": "Missing segments count as zero."
        },
        {
          "input": "version1 = \"0.1\", version2 = \"1.1\"",
          "output": "-1",
          "explanation": "The first segment 0 is smaller than 1."
        }
      ],
      "bruteForceComplexity": "Time O(n+m); Space O(n+m). Split both versions and parse every segment.",
      "optimizedComplexity": "Time O(n+m); Space O(1). Two pointers parse segments directly.",
      "recursiveComplexity": "Time O(n+m); Space O(number of segments). Recursively compares matching segment positions.",
      "bruteForceCode": "class Solution {\n  public int compareVersion(String version1, String version2) {\n    String[] a = version1.split(\"\\\\.\");\n    String[] b = version2.split(\"\\\\.\");\n    int length = Math.max(a.length, b.length);\n    for (int i = 0; i < length; i++) {\n      int left = i < a.length ? Integer.parseInt(a[i]) : 0;\n      int right = i < b.length ? Integer.parseInt(b[i]) : 0;\n      if (left != right) return left < right ? -1 : 1;\n    }\n    return 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int compareVersion(String version1, String version2) {\n    int i = 0, j = 0;\n    while (i < version1.length() || j < version2.length()) {\n      int left = 0;\n      while (i < version1.length() && version1.charAt(i) != '.') left = left * 10 + version1.charAt(i++) - '0';\n      int right = 0;\n      while (j < version2.length() && version2.charAt(j) != '.') right = right * 10 + version2.charAt(j++) - '0';\n      if (left != right) return left < right ? -1 : 1;\n      i++;\n      j++;\n    }\n    return 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int compareVersion(String version1, String version2) {\n    return compare(version1, 0, version2, 0);\n  }\n\n  private int compare(String a, int i, String b, int j) {\n    if (i >= a.length() && j >= b.length()) return 0;\n    int[] left = read(a, i);\n    int[] right = read(b, j);\n    if (left[0] != right[0]) return left[0] < right[0] ? -1 : 1;\n    return compare(a, left[1] + 1, b, right[1] + 1);\n  }\n\n  private int[] read(String value, int index) {\n    int number = 0;\n    while (index < value.length() && value.charAt(index) != '.') number = number * 10 + value.charAt(index++) - '0';\n    return new int[]{number, index};\n  }\n}",
      "optimizedCode": "class Solution {\n  public int compareVersion(String version1, String version2) {\n    int i = 0, j = 0;\n    while (i < version1.length() || j < version2.length()) {\n      int left = 0;\n      while (i < version1.length() && version1.charAt(i) != '.') left = left * 10 + version1.charAt(i++) - '0';\n      int right = 0;\n      while (j < version2.length() && version2.charAt(j) != '.') right = right * 10 + version2.charAt(j++) - '0';\n      if (left != right) return left < right ? -1 : 1;\n      i++;\n      j++;\n    }\n    return 0;\n  }\n}",
      "code": "class Solution {\n  public int compareVersion(String version1, String version2) {\n    int i = 0, j = 0;\n    while (i < version1.length() || j < version2.length()) {\n      int left = 0;\n      while (i < version1.length() && version1.charAt(i) != '.') left = left * 10 + version1.charAt(i++) - '0';\n      int right = 0;\n      while (j < version2.length() && version2.charAt(j) != '.') right = right * 10 + version2.charAt(j++) - '0';\n      if (left != right) return left < right ? -1 : 1;\n      i++;\n      j++;\n    }\n    return 0;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find All Anagrams in a String",
      "difficulty": "Medium",
      "subpattern": "Fixed-window anagram matching",
      "question": "Given strings s and p, return all start indices of p's anagrams in s.",
      "trigger": "Every candidate window has fixed length p.length and only character frequencies matter.",
      "intuition": "Maintain a sliding window count and compare it with the target count after each one-character shift.",
      "edgeCases": "p longer than s, repeated characters in p, overlapping anagrams, no match, all characters same.",
      "constraints": "1 <= s.length, p.length <= 30000; s and p contain lowercase English letters.",
      "source": {
        "label": "Find All Anagrams in a String - LeetCode 438",
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
      },
      "examples": [
        {
          "input": "s = \"cbaebabacd\", p = \"abc\"",
          "output": "[0,6]",
          "explanation": "cba and bac are anagrams of abc."
        },
        {
          "input": "s = \"abab\", p = \"ab\"",
          "output": "[0,1,2]",
          "explanation": "Overlapping windows are allowed."
        },
        {
          "input": "s = \"a\", p = \"aa\"",
          "output": "[]",
          "explanation": "The pattern is longer than the source."
        }
      ],
      "bruteForceComplexity": "Time O((n-m+1) * m log m); Space O(m). Sort every fixed window.",
      "optimizedComplexity": "Time O(26n); Space O(1). Sliding frequency windows compare 26 counts.",
      "recursiveComplexity": "Time O(26n); Space O(n) result plus recursion. Recursively slides one window at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    char[] target = p.toCharArray();\n    Arrays.sort(target);\n    for (int start = 0; start + p.length() <= s.length(); start++) {\n      char[] window = s.substring(start, start + p.length()).toCharArray();\n      Arrays.sort(window);\n      if (Arrays.equals(window, target)) answer.add(start);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) return answer;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < p.length(); i++) {\n      need[p.charAt(i) - 'a']++;\n      window[s.charAt(i) - 'a']++;\n    }\n    for (int start = 0; start + p.length() <= s.length(); start++) {\n      if (Arrays.equals(need, window)) answer.add(start);\n      if (start + p.length() < s.length()) {\n        window[s.charAt(start) - 'a']--;\n        window[s.charAt(start + p.length()) - 'a']++;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) return answer;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < p.length(); i++) {\n      need[p.charAt(i) - 'a']++;\n      window[s.charAt(i) - 'a']++;\n    }\n    scan(s, p.length(), 0, need, window, answer);\n    return answer;\n  }\n\n  private void scan(String s, int length, int start, int[] need, int[] window, List<Integer> answer) {\n    if (start + length > s.length()) return;\n    if (Arrays.equals(need, window)) answer.add(start);\n    if (start + length == s.length()) return;\n    window[s.charAt(start) - 'a']--;\n    window[s.charAt(start + length) - 'a']++;\n    scan(s, length, start + 1, need, window, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) return answer;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < p.length(); i++) {\n      need[p.charAt(i) - 'a']++;\n      window[s.charAt(i) - 'a']++;\n    }\n    for (int start = 0; start + p.length() <= s.length(); start++) {\n      if (Arrays.equals(need, window)) answer.add(start);\n      if (start + p.length() < s.length()) {\n        window[s.charAt(start) - 'a']--;\n        window[s.charAt(start + p.length()) - 'a']++;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> answer = new ArrayList<>();\n    if (p.length() > s.length()) return answer;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < p.length(); i++) {\n      need[p.charAt(i) - 'a']++;\n      window[s.charAt(i) - 'a']++;\n    }\n    for (int start = 0; start + p.length() <= s.length(); start++) {\n      if (Arrays.equals(need, window)) answer.add(start);\n      if (start + p.length() < s.length()) {\n        window[s.charAt(start) - 'a']--;\n        window[s.charAt(start + p.length()) - 'a']++;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Permutation in String",
      "difficulty": "Medium",
      "subpattern": "Permutation inclusion window",
      "question": "Given strings s1 and s2, return true if s2 contains a permutation of s1 as a substring.",
      "trigger": "The target permutation must occupy a fixed-length window with the same character counts as s1.",
      "intuition": "Slide a window of length s1.length over s2 and compare frequency counts.",
      "edgeCases": "s1 longer than s2, repeated letters, match at beginning, match at end, no match.",
      "constraints": "1 <= s1.length, s2.length <= 10000; both strings contain lowercase English letters.",
      "source": {
        "label": "Permutation in String - LeetCode 567",
        "url": "https://leetcode.com/problems/permutation-in-string/"
      },
      "examples": [
        {
          "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
          "output": "true",
          "explanation": "ba is a permutation of ab."
        },
        {
          "input": "s1 = \"ab\", s2 = \"eidboaoo\"",
          "output": "false",
          "explanation": "No length-two window has counts a:1,b:1."
        },
        {
          "input": "s1 = \"adc\", s2 = \"dcda\"",
          "output": "true",
          "explanation": "cda is a permutation of adc."
        }
      ],
      "bruteForceComplexity": "Time O((n-m+1) * m log m); Space O(m). Sort every candidate window.",
      "optimizedComplexity": "Time O(26n); Space O(1). Sliding frequency counts over fixed windows.",
      "recursiveComplexity": "Time O(26n); Space O(n). Recursively slides and compares counts.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) return false;\n    char[] target = s1.toCharArray();\n    Arrays.sort(target);\n    for (int start = 0; start + s1.length() <= s2.length(); start++) {\n      char[] window = s2.substring(start, start + s1.length()).toCharArray();\n      Arrays.sort(window);\n      if (Arrays.equals(target, window)) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) return false;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < s1.length(); i++) {\n      need[s1.charAt(i) - 'a']++;\n      window[s2.charAt(i) - 'a']++;\n    }\n    for (int start = 0; start + s1.length() <= s2.length(); start++) {\n      if (Arrays.equals(need, window)) return true;\n      if (start + s1.length() < s2.length()) {\n        window[s2.charAt(start) - 'a']--;\n        window[s2.charAt(start + s1.length()) - 'a']++;\n      }\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) return false;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < s1.length(); i++) {\n      need[s1.charAt(i) - 'a']++;\n      window[s2.charAt(i) - 'a']++;\n    }\n    return scan(s2, s1.length(), 0, need, window);\n  }\n\n  private boolean scan(String s, int length, int start, int[] need, int[] window) {\n    if (start + length > s.length()) return false;\n    if (Arrays.equals(need, window)) return true;\n    if (start + length == s.length()) return false;\n    window[s.charAt(start) - 'a']--;\n    window[s.charAt(start + length) - 'a']++;\n    return scan(s, length, start + 1, need, window);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) return false;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < s1.length(); i++) {\n      need[s1.charAt(i) - 'a']++;\n      window[s2.charAt(i) - 'a']++;\n    }\n    for (int start = 0; start + s1.length() <= s2.length(); start++) {\n      if (Arrays.equals(need, window)) return true;\n      if (start + s1.length() < s2.length()) {\n        window[s2.charAt(start) - 'a']--;\n        window[s2.charAt(start + s1.length()) - 'a']++;\n      }\n    }\n    return false;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean checkInclusion(String s1, String s2) {\n    if (s1.length() > s2.length()) return false;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (int i = 0; i < s1.length(); i++) {\n      need[s1.charAt(i) - 'a']++;\n      window[s2.charAt(i) - 'a']++;\n    }\n    for (int start = 0; start + s1.length() <= s2.length(); start++) {\n      if (Arrays.equals(need, window)) return true;\n      if (start + s1.length() < s2.length()) {\n        window[s2.charAt(start) - 'a']--;\n        window[s2.charAt(start + s1.length()) - 'a']++;\n      }\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Word Break",
      "difficulty": "Medium",
      "subpattern": "Dictionary segmentation DP",
      "question": "Given a string s and a dictionary wordDict, return true if s can be segmented into a sequence of dictionary words.",
      "trigger": "A prefix decision leaves the same problem on a suffix, creating overlapping subproblems.",
      "intuition": "Let dp[i] mean s[0..i) can be segmented; extend from every reachable index using dictionary words.",
      "edgeCases": "Entire string is one word, repeated dictionary words, impossible suffix, empty-like segmentation not allowed, overlapping word choices.",
      "constraints": "1 <= s.length <= 300; 1 <= wordDict.length <= 1000; words and s contain lowercase English letters.",
      "source": {
        "label": "Word Break - LeetCode 139",
        "url": "https://leetcode.com/problems/word-break/"
      },
      "examples": [
        {
          "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
          "output": "true",
          "explanation": "leet + code forms the string."
        },
        {
          "input": "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
          "output": "true",
          "explanation": "Words can be reused."
        },
        {
          "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
          "output": "false",
          "explanation": "No segmentation covers every character."
        }
      ],
      "bruteForceComplexity": "Time exponential in string length; Space O(n). Try every dictionary prefix recursively.",
      "optimizedComplexity": "Time O(n^2); Space O(n + dictionary). DP checks reachable prefixes.",
      "recursiveComplexity": "Time O(n^2); Space O(n + dictionary). Memoized recursion solves each start index once.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    return canBreak(s, 0, new HashSet<>(wordDict));\n  }\n\n  private boolean canBreak(String s, int start, Set<String> words) {\n    if (start == s.length()) return true;\n    for (int end = start + 1; end <= s.length(); end++) {\n      if (words.contains(s.substring(start, end)) && canBreak(s, end, words)) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n    for (int end = 1; end <= s.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && words.contains(s.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    return dp[s.length()];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    return canBreak(s, 0, new HashSet<>(wordDict), new Boolean[s.length() + 1]);\n  }\n\n  private boolean canBreak(String s, int start, Set<String> words, Boolean[] memo) {\n    if (start == s.length()) return true;\n    if (memo[start] != null) return memo[start];\n    for (int end = start + 1; end <= s.length(); end++) {\n      if (words.contains(s.substring(start, end)) && canBreak(s, end, words, memo)) return memo[start] = true;\n    }\n    return memo[start] = false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n    for (int end = 1; end <= s.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && words.contains(s.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    return dp[s.length()];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n    for (int end = 1; end <= s.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && words.contains(s.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    return dp[s.length()];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Word Pattern",
      "difficulty": "Easy",
      "subpattern": "Bijection pattern mapping",
      "question": "Given a pattern and a space-separated string s, return true if s follows the same bijective pattern.",
      "trigger": "Each pattern character must map to exactly one word and each word must map back to one character.",
      "intuition": "Maintain two maps to enforce a one-to-one relationship both directions.",
      "edgeCases": "Different number of words, repeated pattern character, repeated word with different character, one-word string, empty-looking extra spaces.",
      "constraints": "1 <= pattern.length <= 300; pattern contains lowercase letters; s contains lowercase words separated by single spaces.",
      "source": {
        "label": "Word Pattern - LeetCode 290",
        "url": "https://leetcode.com/problems/word-pattern/"
      },
      "examples": [
        {
          "input": "pattern = \"abba\", s = \"dog cat cat dog\"",
          "output": "true",
          "explanation": "a maps to dog and b maps to cat."
        },
        {
          "input": "pattern = \"abba\", s = \"dog cat cat fish\"",
          "output": "false",
          "explanation": "a would map to both dog and fish."
        },
        {
          "input": "pattern = \"aaaa\", s = \"dog cat cat dog\"",
          "output": "false",
          "explanation": "a cannot map to multiple words."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store first-seen signatures for pattern chars and words.",
      "optimizedComplexity": "Time O(n); Space O(n). Two maps enforce bijection directly.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan carries both maps.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordPattern(String pattern, String s) {\n    String[] words = s.split(\" \");\n    if (pattern.length() != words.length) return false;\n    return signature(pattern).equals(signature(words));\n  }\n\n  private String signature(String pattern) {\n    Map<Character, Integer> seen = new HashMap<>();\n    StringBuilder key = new StringBuilder();\n    for (int i = 0; i < pattern.length(); i++) {\n      seen.putIfAbsent(pattern.charAt(i), seen.size());\n      key.append(seen.get(pattern.charAt(i))).append('#');\n    }\n    return key.toString();\n  }\n\n  private String signature(String[] words) {\n    Map<String, Integer> seen = new HashMap<>();\n    StringBuilder key = new StringBuilder();\n    for (String word : words) {\n      seen.putIfAbsent(word, seen.size());\n      key.append(seen.get(word)).append('#');\n    }\n    return key.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordPattern(String pattern, String s) {\n    String[] words = s.split(\" \");\n    if (pattern.length() != words.length) return false;\n    Map<Character, String> toWord = new HashMap<>();\n    Map<String, Character> toChar = new HashMap<>();\n    for (int i = 0; i < pattern.length(); i++) {\n      char ch = pattern.charAt(i);\n      String word = words[i];\n      if (toWord.containsKey(ch) && !toWord.get(ch).equals(word)) return false;\n      if (toChar.containsKey(word) && toChar.get(word) != ch) return false;\n      toWord.put(ch, word);\n      toChar.put(word, ch);\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordPattern(String pattern, String s) {\n    String[] words = s.split(\" \");\n    if (pattern.length() != words.length) return false;\n    return match(pattern, words, 0, new HashMap<>(), new HashMap<>());\n  }\n\n  private boolean match(String pattern, String[] words, int index, Map<Character, String> toWord, Map<String, Character> toChar) {\n    if (index == words.length) return true;\n    char ch = pattern.charAt(index);\n    String word = words[index];\n    if (toWord.containsKey(ch) && !toWord.get(ch).equals(word)) return false;\n    if (toChar.containsKey(word) && toChar.get(word) != ch) return false;\n    toWord.put(ch, word);\n    toChar.put(word, ch);\n    return match(pattern, words, index + 1, toWord, toChar);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordPattern(String pattern, String s) {\n    String[] words = s.split(\" \");\n    if (pattern.length() != words.length) return false;\n    Map<Character, String> toWord = new HashMap<>();\n    Map<String, Character> toChar = new HashMap<>();\n    for (int i = 0; i < pattern.length(); i++) {\n      char ch = pattern.charAt(i);\n      String word = words[i];\n      if (toWord.containsKey(ch) && !toWord.get(ch).equals(word)) return false;\n      if (toChar.containsKey(word) && toChar.get(word) != ch) return false;\n      toWord.put(ch, word);\n      toChar.put(word, ch);\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean wordPattern(String pattern, String s) {\n    String[] words = s.split(\" \");\n    if (pattern.length() != words.length) return false;\n    Map<Character, String> toWord = new HashMap<>();\n    Map<String, Character> toChar = new HashMap<>();\n    for (int i = 0; i < pattern.length(); i++) {\n      char ch = pattern.charAt(i);\n      String word = words[i];\n      if (toWord.containsKey(ch) && !toWord.get(ch).equals(word)) return false;\n      if (toChar.containsKey(word) && toChar.get(word) != ch) return false;\n      toWord.put(ch, word);\n      toChar.put(word, ch);\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Isomorphic Strings",
      "difficulty": "Easy",
      "subpattern": "Isomorphic character mapping",
      "question": "Given two strings s and t, return true if characters in s can be replaced to get t with a one-to-one mapping.",
      "trigger": "Each source character must consistently map to one target character, and target characters cannot be shared.",
      "intuition": "Record forward and reverse mappings while scanning both strings together.",
      "edgeCases": "Different mapping conflict, two source chars to one target char, repeated characters, same strings, one-character strings.",
      "constraints": "1 <= s.length <= 50000; t.length == s.length; s and t consist of valid ASCII characters.",
      "source": {
        "label": "Isomorphic Strings - LeetCode 205",
        "url": "https://leetcode.com/problems/isomorphic-strings/"
      },
      "examples": [
        {
          "input": "s = \"egg\", t = \"add\"",
          "output": "true",
          "explanation": "e maps to a and g maps to d."
        },
        {
          "input": "s = \"foo\", t = \"bar\"",
          "output": "false",
          "explanation": "o cannot map to both a and r."
        },
        {
          "input": "s = \"paper\", t = \"title\"",
          "output": "true",
          "explanation": "The mapping stays consistent both ways."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Compare first occurrence positions for each pair of indexes.",
      "optimizedComplexity": "Time O(n); Space O(charset). Two arrays store last mapped characters.",
      "recursiveComplexity": "Time O(n); Space O(charset + n). Recursive scan carries forward and reverse maps.",
      "bruteForceCode": "class Solution {\n  public boolean isIsomorphic(String s, String t) {\n    for (int i = 0; i < s.length(); i++) {\n      for (int j = 0; j < s.length(); j++) {\n        if ((s.charAt(i) == s.charAt(j)) != (t.charAt(i) == t.charAt(j))) return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isIsomorphic(String s, String t) {\n    int[] mapST = new int[256];\n    int[] mapTS = new int[256];\n    for (int i = 0; i < s.length(); i++) {\n      char a = s.charAt(i);\n      char b = t.charAt(i);\n      if (mapST[a] != mapTS[b]) return false;\n      mapST[a] = i + 1;\n      mapTS[b] = i + 1;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean isIsomorphic(String s, String t) {\n    return match(s, t, 0, new HashMap<>(), new HashMap<>());\n  }\n\n  private boolean match(String s, String t, int index, Map<Character, Character> forward, Map<Character, Character> backward) {\n    if (index == s.length()) return true;\n    char a = s.charAt(index);\n    char b = t.charAt(index);\n    if (forward.containsKey(a) && forward.get(a) != b) return false;\n    if (backward.containsKey(b) && backward.get(b) != a) return false;\n    forward.put(a, b);\n    backward.put(b, a);\n    return match(s, t, index + 1, forward, backward);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isIsomorphic(String s, String t) {\n    int[] mapST = new int[256];\n    int[] mapTS = new int[256];\n    for (int i = 0; i < s.length(); i++) {\n      char a = s.charAt(i);\n      char b = t.charAt(i);\n      if (mapST[a] != mapTS[b]) return false;\n      mapST[a] = i + 1;\n      mapTS[b] = i + 1;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean isIsomorphic(String s, String t) {\n    int[] mapST = new int[256];\n    int[] mapTS = new int[256];\n    for (int i = 0; i < s.length(); i++) {\n      char a = s.charAt(i);\n      char b = t.charAt(i);\n      if (mapST[a] != mapTS[b]) return false;\n      mapST[a] = i + 1;\n      mapTS[b] = i + 1;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Simplify Path",
      "difficulty": "Medium",
      "subpattern": "Unix path stack normalization",
      "question": "Given an absolute Unix path, return its simplified canonical path.",
      "trigger": "Path components are commands over a stack: normal names push, .. pops, . and empty components do nothing.",
      "intuition": "Split or parse components between slashes and maintain a stack of directory names.",
      "edgeCases": "Multiple slashes, current directory dot, parent directory above root, trailing slash, names containing dots like ... .",
      "constraints": "1 <= path.length <= 3000; path is a valid absolute Unix path.",
      "source": {
        "label": "Simplify Path - LeetCode 71",
        "url": "https://leetcode.com/problems/simplify-path/"
      },
      "examples": [
        {
          "input": "path = \"/home/\"",
          "output": "\"/home\"",
          "explanation": "Trailing slash is removed."
        },
        {
          "input": "path = \"/../\"",
          "output": "\"/\"",
          "explanation": "Root has no parent above it."
        },
        {
          "input": "path = \"/home//foo/\"",
          "output": "\"/home/foo\"",
          "explanation": "Repeated slashes are treated as one separator."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Split on slash and process components with a stack.",
      "optimizedComplexity": "Time O(n); Space O(n). Parse components manually without creating empty split tokens.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively processes split path components.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    Deque<String> stack = new ArrayDeque<>();\n    for (String part : path.split(\"/\")) {\n      if (part.isEmpty() || part.equals(\".\")) continue;\n      if (part.equals(\"..\")) {\n        if (!stack.isEmpty()) stack.removeLast();\n      } else {\n        stack.addLast(part);\n      }\n    }\n    return build(stack);\n  }\n\n  private String build(Deque<String> stack) {\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder answer = new StringBuilder();\n    for (String part : stack) answer.append('/').append(part);\n    return answer.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    Deque<String> stack = new ArrayDeque<>();\n    int index = 0;\n    while (index < path.length()) {\n      while (index < path.length() && path.charAt(index) == '/') index++;\n      int start = index;\n      while (index < path.length() && path.charAt(index) != '/') index++;\n      if (start == index) continue;\n      String part = path.substring(start, index);\n      if (part.equals(\"..\")) {\n        if (!stack.isEmpty()) stack.removeLast();\n      } else if (!part.equals(\".\")) {\n        stack.addLast(part);\n      }\n    }\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder answer = new StringBuilder();\n    for (String part : stack) answer.append('/').append(part);\n    return answer.toString();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    String[] parts = path.split(\"/\");\n    Deque<String> stack = new ArrayDeque<>();\n    process(parts, 0, stack);\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder answer = new StringBuilder();\n    for (String part : stack) answer.append('/').append(part);\n    return answer.toString();\n  }\n\n  private void process(String[] parts, int index, Deque<String> stack) {\n    if (index == parts.length) return;\n    String part = parts[index];\n    if (part.equals(\"..\")) {\n      if (!stack.isEmpty()) stack.removeLast();\n    } else if (!part.isEmpty() && !part.equals(\".\")) {\n      stack.addLast(part);\n    }\n    process(parts, index + 1, stack);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    Deque<String> stack = new ArrayDeque<>();\n    int index = 0;\n    while (index < path.length()) {\n      while (index < path.length() && path.charAt(index) == '/') index++;\n      int start = index;\n      while (index < path.length() && path.charAt(index) != '/') index++;\n      if (start == index) continue;\n      String part = path.substring(start, index);\n      if (part.equals(\"..\")) {\n        if (!stack.isEmpty()) stack.removeLast();\n      } else if (!part.equals(\".\")) {\n        stack.addLast(part);\n      }\n    }\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder answer = new StringBuilder();\n    for (String part : stack) answer.append('/').append(part);\n    return answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    Deque<String> stack = new ArrayDeque<>();\n    int index = 0;\n    while (index < path.length()) {\n      while (index < path.length() && path.charAt(index) == '/') index++;\n      int start = index;\n      while (index < path.length() && path.charAt(index) != '/') index++;\n      if (start == index) continue;\n      String part = path.substring(start, index);\n      if (part.equals(\"..\")) {\n        if (!stack.isEmpty()) stack.removeLast();\n      } else if (!part.equals(\".\")) {\n        stack.addLast(part);\n      }\n    }\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder answer = new StringBuilder();\n    for (String part : stack) answer.append('/').append(part);\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Text Justification",
      "difficulty": "Hard",
      "subpattern": "Greedy line packing",
      "question": "Given an array of words and a maxWidth, format the text so each line has exactly maxWidth characters and is fully justified.",
      "trigger": "Each line greedily takes as many words as fit, then distributes spaces based on whether it is the last line or has one word.",
      "intuition": "Pack words greedily; for non-last lines, distribute base spaces across gaps and give left gaps the extras.",
      "edgeCases": "Single-word line, last line, words exactly fill width, extra spaces not divisible by gaps, one total line.",
      "constraints": "1 <= words.length <= 300; 1 <= words[i].length <= 20; 1 <= maxWidth <= 100; each word length <= maxWidth.",
      "source": {
        "label": "Text Justification - LeetCode 68",
        "url": "https://leetcode.com/problems/text-justification/"
      },
      "examples": [
        {
          "input": "words = [\"This\",\"is\",\"an\",\"example\",\"of\",\"text\",\"justification.\"], maxWidth = 16",
          "output": "[\"This    is    an\",\"example  of text\",\"justification.  \"]",
          "explanation": "Spaces are distributed per line."
        },
        {
          "input": "words = [\"What\",\"must\",\"be\",\"acknowledgment\",\"shall\",\"be\"], maxWidth = 16",
          "output": "[\"What   must   be\",\"acknowledgment  \",\"shall be        \"]",
          "explanation": "Single-word and last lines are left-justified."
        },
        {
          "input": "words = [\"a\"], maxWidth = 1",
          "output": "[\"a\"]",
          "explanation": "One word exactly fills the line."
        }
      ],
      "bruteForceComplexity": "Time O(total characters); Space O(output). Greedily packs each line and constructs strings.",
      "optimizedComplexity": "Time O(total characters); Space O(output). One pass packs lines and distributes spaces.",
      "recursiveComplexity": "Time O(total characters); Space O(output + number of lines). Recursive line packing.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fullJustify(String[] words, int maxWidth) {\n    List<String> answer = new ArrayList<>();\n    int index = 0;\n    while (index < words.length) {\n      int last = index;\n      int letters = 0;\n      while (last < words.length && letters + words[last].length() + (last - index) <= maxWidth) {\n        letters += words[last].length();\n        last++;\n      }\n      answer.add(line(words, index, last, letters, maxWidth, last == words.length));\n      index = last;\n    }\n    return answer;\n  }\n\n  private String line(String[] words, int start, int end, int letters, int width, boolean lastLine) {\n    StringBuilder builder = new StringBuilder();\n    int gaps = end - start - 1;\n    if (gaps == 0 || lastLine) {\n      for (int i = start; i < end; i++) {\n        if (i > start) builder.append(' ');\n        builder.append(words[i]);\n      }\n      while (builder.length() < width) builder.append(' ');\n      return builder.toString();\n    }\n    int spaces = width - letters;\n    for (int i = start; i < end; i++) {\n      builder.append(words[i]);\n      if (i < end - 1) {\n        int gap = spaces / gaps + (i - start < spaces % gaps ? 1 : 0);\n        while (gap-- > 0) builder.append(' ');\n      }\n    }\n    return builder.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fullJustify(String[] words, int maxWidth) {\n    List<String> answer = new ArrayList<>();\n    for (int index = 0; index < words.length;) {\n      int lineStart = index;\n      int letters = 0;\n      while (index < words.length && letters + words[index].length() + (index - lineStart) <= maxWidth) {\n        letters += words[index].length();\n        index++;\n      }\n      answer.add(build(words, lineStart, index, letters, maxWidth, index == words.length));\n    }\n    return answer;\n  }\n\n  private String build(String[] words, int start, int end, int letters, int width, boolean lastLine) {\n    StringBuilder line = new StringBuilder();\n    int gaps = end - start - 1;\n    if (gaps == 0 || lastLine) {\n      for (int i = start; i < end; i++) {\n        if (i > start) line.append(' ');\n        line.append(words[i]);\n      }\n      while (line.length() < width) line.append(' ');\n      return line.toString();\n    }\n    int totalSpaces = width - letters;\n    int base = totalSpaces / gaps;\n    int extra = totalSpaces % gaps;\n    for (int i = start; i < end; i++) {\n      line.append(words[i]);\n      if (i < end - 1) {\n        int spaces = base + (i - start < extra ? 1 : 0);\n        while (spaces-- > 0) line.append(' ');\n      }\n    }\n    return line.toString();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fullJustify(String[] words, int maxWidth) {\n    List<String> answer = new ArrayList<>();\n    pack(words, maxWidth, 0, answer);\n    return answer;\n  }\n\n  private void pack(String[] words, int width, int index, List<String> answer) {\n    if (index == words.length) return;\n    int end = index;\n    int letters = 0;\n    while (end < words.length && letters + words[end].length() + (end - index) <= width) {\n      letters += words[end].length();\n      end++;\n    }\n    answer.add(build(words, index, end, letters, width, end == words.length));\n    pack(words, width, end, answer);\n  }\n\n  private String build(String[] words, int start, int end, int letters, int width, boolean lastLine) {\n    StringBuilder line = new StringBuilder();\n    int gaps = end - start - 1;\n    if (gaps == 0 || lastLine) {\n      for (int i = start; i < end; i++) {\n        if (i > start) line.append(' ');\n        line.append(words[i]);\n      }\n      while (line.length() < width) line.append(' ');\n      return line.toString();\n    }\n    int spaces = width - letters;\n    for (int i = start; i < end; i++) {\n      line.append(words[i]);\n      if (i < end - 1) {\n        int gap = spaces / gaps + (i - start < spaces % gaps ? 1 : 0);\n        while (gap-- > 0) line.append(' ');\n      }\n    }\n    return line.toString();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fullJustify(String[] words, int maxWidth) {\n    List<String> answer = new ArrayList<>();\n    for (int index = 0; index < words.length;) {\n      int lineStart = index;\n      int letters = 0;\n      while (index < words.length && letters + words[index].length() + (index - lineStart) <= maxWidth) {\n        letters += words[index].length();\n        index++;\n      }\n      answer.add(build(words, lineStart, index, letters, maxWidth, index == words.length));\n    }\n    return answer;\n  }\n\n  private String build(String[] words, int start, int end, int letters, int width, boolean lastLine) {\n    StringBuilder line = new StringBuilder();\n    int gaps = end - start - 1;\n    if (gaps == 0 || lastLine) {\n      for (int i = start; i < end; i++) {\n        if (i > start) line.append(' ');\n        line.append(words[i]);\n      }\n      while (line.length() < width) line.append(' ');\n      return line.toString();\n    }\n    int totalSpaces = width - letters;\n    int base = totalSpaces / gaps;\n    int extra = totalSpaces % gaps;\n    for (int i = start; i < end; i++) {\n      line.append(words[i]);\n      if (i < end - 1) {\n        int spaces = base + (i - start < extra ? 1 : 0);\n        while (spaces-- > 0) line.append(' ');\n      }\n    }\n    return line.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> fullJustify(String[] words, int maxWidth) {\n    List<String> answer = new ArrayList<>();\n    for (int index = 0; index < words.length;) {\n      int lineStart = index;\n      int letters = 0;\n      while (index < words.length && letters + words[index].length() + (index - lineStart) <= maxWidth) {\n        letters += words[index].length();\n        index++;\n      }\n      answer.add(build(words, lineStart, index, letters, maxWidth, index == words.length));\n    }\n    return answer;\n  }\n\n  private String build(String[] words, int start, int end, int letters, int width, boolean lastLine) {\n    StringBuilder line = new StringBuilder();\n    int gaps = end - start - 1;\n    if (gaps == 0 || lastLine) {\n      for (int i = start; i < end; i++) {\n        if (i > start) line.append(' ');\n        line.append(words[i]);\n      }\n      while (line.length() < width) line.append(' ');\n      return line.toString();\n    }\n    int totalSpaces = width - letters;\n    int base = totalSpaces / gaps;\n    int extra = totalSpaces % gaps;\n    for (int i = start; i < end; i++) {\n      line.append(words[i]);\n      if (i < end - 1) {\n        int spaces = base + (i - start < extra ? 1 : 0);\n        while (spaces-- > 0) line.append(' ');\n      }\n    }\n    return line.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Valid Number",
      "difficulty": "Hard",
      "subpattern": "Numeric token validation",
      "question": "Given a string s, return true if it represents a valid decimal number with optional sign, decimal point, and exponent.",
      "trigger": "Validity depends on token order: optional sign, significand with digits, optional exponent with signed integer.",
      "intuition": "Track whether digits, decimal point, and exponent have appeared, and ensure exponent has digits after it.",
      "edgeCases": "Leading sign, decimal without leading digit, exponent sign, missing exponent digits, multiple dots or exponents.",
      "constraints": "1 <= s.length <= 20; s consists of English letters, digits, plus, minus, dot, and e/E.",
      "source": {
        "label": "Valid Number - LeetCode 65",
        "url": "https://leetcode.com/problems/valid-number/"
      },
      "examples": [
        {
          "input": "s = \"0\"",
          "output": "true",
          "explanation": "A plain integer is valid."
        },
        {
          "input": "s = \"e\"",
          "output": "false",
          "explanation": "An exponent marker needs a significand first."
        },
        {
          "input": "s = \".1\"",
          "output": "true",
          "explanation": "A decimal can omit digits before the dot if digits follow."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Regex validates the full token shape.",
      "optimizedComplexity": "Time O(n); Space O(1). One pass tracks digit, dot, exponent, and sign placement.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive parser consumes sign, decimal, and exponent sections.",
      "bruteForceCode": "class Solution {\n  public boolean isNumber(String s) {\n    String sign = \"[+-]?\";\n    String integer = \"\\\\d+\";\n    String decimalWithLeft = \"\\\\d+\\\\.\\\\d*\";\n    String decimalWithoutLeft = \"\\\\.\\\\d+\";\n    String significand = \"((\" + decimalWithLeft + \")|(\" + decimalWithoutLeft + \")|(\" + integer + \"))\";\n    String exponent = \"([eE]\" + sign + integer + \")?\";\n    String pattern = sign + significand + exponent;\n    return s.matches(pattern);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isNumber(String s) {\n    boolean seenDigit = false;\n    boolean seenDot = false;\n    boolean seenExponent = false;\n    boolean digitAfterExponent = true;\n\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (Character.isDigit(ch)) {\n        seenDigit = true;\n        if (seenExponent) digitAfterExponent = true;\n      } else if (ch == '+' || ch == '-') {\n        if (i != 0 && s.charAt(i - 1) != 'e' && s.charAt(i - 1) != 'E') return false;\n      } else if (ch == '.') {\n        if (seenDot || seenExponent) return false;\n        seenDot = true;\n      } else if (ch == 'e' || ch == 'E') {\n        if (seenExponent || !seenDigit) return false;\n        seenExponent = true;\n        digitAfterExponent = false;\n      } else {\n        return false;\n      }\n    }\n    return seenDigit && digitAfterExponent;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isNumber(String s) {\n    int[] index = {0};\n    readSign(s, index);\n    boolean digitsBefore = readDigits(s, index);\n    boolean digitsAfter = false;\n    if (index[0] < s.length() && s.charAt(index[0]) == '.') {\n      index[0]++;\n      digitsAfter = readDigits(s, index);\n    }\n    if (!digitsBefore && !digitsAfter) return false;\n    if (index[0] < s.length() && (s.charAt(index[0]) == 'e' || s.charAt(index[0]) == 'E')) {\n      index[0]++;\n      readSign(s, index);\n      if (!readDigits(s, index)) return false;\n    }\n    return index[0] == s.length();\n  }\n\n  private void readSign(String s, int[] index) {\n    if (index[0] < s.length() && (s.charAt(index[0]) == '+' || s.charAt(index[0]) == '-')) index[0]++;\n  }\n\n  private boolean readDigits(String s, int[] index) {\n    boolean seen = false;\n    while (index[0] < s.length() && Character.isDigit(s.charAt(index[0]))) {\n      seen = true;\n      index[0]++;\n    }\n    return seen;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isNumber(String s) {\n    boolean seenDigit = false;\n    boolean seenDot = false;\n    boolean seenExponent = false;\n    boolean digitAfterExponent = true;\n\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (Character.isDigit(ch)) {\n        seenDigit = true;\n        if (seenExponent) digitAfterExponent = true;\n      } else if (ch == '+' || ch == '-') {\n        if (i != 0 && s.charAt(i - 1) != 'e' && s.charAt(i - 1) != 'E') return false;\n      } else if (ch == '.') {\n        if (seenDot || seenExponent) return false;\n        seenDot = true;\n      } else if (ch == 'e' || ch == 'E') {\n        if (seenExponent || !seenDigit) return false;\n        seenExponent = true;\n        digitAfterExponent = false;\n      } else {\n        return false;\n      }\n    }\n    return seenDigit && digitAfterExponent;\n  }\n}",
      "code": "class Solution {\n  public boolean isNumber(String s) {\n    boolean seenDigit = false;\n    boolean seenDot = false;\n    boolean seenExponent = false;\n    boolean digitAfterExponent = true;\n\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      if (Character.isDigit(ch)) {\n        seenDigit = true;\n        if (seenExponent) digitAfterExponent = true;\n      } else if (ch == '+' || ch == '-') {\n        if (i != 0 && s.charAt(i - 1) != 'e' && s.charAt(i - 1) != 'E') return false;\n      } else if (ch == '.') {\n        if (seenDot || seenExponent) return false;\n        seenDot = true;\n      } else if (ch == 'e' || ch == 'E') {\n        if (seenExponent || !seenDigit) return false;\n        seenExponent = true;\n        digitAfterExponent = false;\n      } else {\n        return false;\n      }\n    }\n    return seenDigit && digitAfterExponent;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count and Say",
      "difficulty": "Medium",
      "subpattern": "Run-length sequence generation",
      "question": "Given n, return the nth term of the count-and-say sequence.",
      "trigger": "Each term is generated by run-length encoding the previous term.",
      "intuition": "Read consecutive equal digits in the previous string and append count followed by digit.",
      "edgeCases": "n is 1, repeated digit runs, multiple groups, growing length, transition from one term to next.",
      "constraints": "1 <= n <= 30.",
      "source": {
        "label": "Count and Say - LeetCode 38",
        "url": "https://leetcode.com/problems/count-and-say/"
      },
      "examples": [
        {
          "input": "n = 1",
          "output": "\"1\"",
          "explanation": "The first term is fixed."
        },
        {
          "input": "n = 4",
          "output": "\"1211\"",
          "explanation": "Term 3 is 21, read as one 2 then one 1."
        },
        {
          "input": "n = 5",
          "output": "\"111221\"",
          "explanation": "Term 4 is 1211, read as 11 12 21."
        }
      ],
      "bruteForceComplexity": "Time O(total generated length); Space O(max term length). Generate every term from 1 to n.",
      "optimizedComplexity": "Time O(total generated length); Space O(max term length). Build each next term with a StringBuilder.",
      "recursiveComplexity": "Time O(total generated length); Space O(n + max term length). Recursively generates the previous term.",
      "bruteForceCode": "class Solution {\n  public String countAndSay(int n) {\n    String value = \"1\";\n    for (int term = 2; term <= n; term++) value = describe(value);\n    return value;\n  }\n\n  private String describe(String value) {\n    StringBuilder next = new StringBuilder();\n    for (int i = 0; i < value.length();) {\n      char digit = value.charAt(i);\n      int start = i;\n      while (i < value.length() && value.charAt(i) == digit) i++;\n      next.append(i - start).append(digit);\n    }\n    return next.toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  public String countAndSay(int n) {\n    String current = \"1\";\n    while (n-- > 1) {\n      StringBuilder next = new StringBuilder();\n      int index = 0;\n      while (index < current.length()) {\n        char digit = current.charAt(index);\n        int count = 0;\n        while (index < current.length() && current.charAt(index) == digit) {\n          index++;\n          count++;\n        }\n        next.append(count).append(digit);\n      }\n      current = next.toString();\n    }\n    return current;\n  }\n}",
      "recursiveCode": "class Solution {\n  public String countAndSay(int n) {\n    if (n == 1) return \"1\";\n    return describe(countAndSay(n - 1), 0, new StringBuilder()).toString();\n  }\n\n  private StringBuilder describe(String value, int index, StringBuilder next) {\n    if (index == value.length()) return next;\n    char digit = value.charAt(index);\n    int start = index;\n    while (index < value.length() && value.charAt(index) == digit) index++;\n    next.append(index - start).append(digit);\n    return describe(value, index, next);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String countAndSay(int n) {\n    String current = \"1\";\n    while (n-- > 1) {\n      StringBuilder next = new StringBuilder();\n      int index = 0;\n      while (index < current.length()) {\n        char digit = current.charAt(index);\n        int count = 0;\n        while (index < current.length() && current.charAt(index) == digit) {\n          index++;\n          count++;\n        }\n        next.append(count).append(digit);\n      }\n      current = next.toString();\n    }\n    return current;\n  }\n}",
      "code": "class Solution {\n  public String countAndSay(int n) {\n    String current = \"1\";\n    while (n-- > 1) {\n      StringBuilder next = new StringBuilder();\n      int index = 0;\n      while (index < current.length()) {\n        char digit = current.charAt(index);\n        int count = 0;\n        while (index < current.length() && current.charAt(index) == digit) {\n          index++;\n          count++;\n        }\n        next.append(count).append(digit);\n      }\n      current = next.toString();\n    }\n    return current;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Shortest Palindrome",
      "difficulty": "Hard",
      "subpattern": "KMP palindrome prefix",
      "question": "Given a string s, return the shortest palindrome that can be formed by adding characters only in front of it.",
      "trigger": "The unchanged part must be the longest palindromic prefix of s.",
      "intuition": "Find the longest prefix that is also a palindrome, then prepend the reverse of the remaining suffix.",
      "edgeCases": "Already palindrome, empty string, single character, repeated prefix, mismatch near the end.",
      "constraints": "0 <= s.length <= 50000; s consists of lowercase English letters.",
      "source": {
        "label": "Shortest Palindrome - LeetCode 214",
        "url": "https://leetcode.com/problems/shortest-palindrome/"
      },
      "examples": [
        {
          "input": "s = \"aacecaaa\"",
          "output": "\"aaacecaaa\"",
          "explanation": "aacecaa is the longest palindromic prefix."
        },
        {
          "input": "s = \"abcd\"",
          "output": "\"dcbabcd\"",
          "explanation": "Only a is a palindromic prefix."
        },
        {
          "input": "s = \"\"",
          "output": "\"\"",
          "explanation": "Empty string is already a palindrome."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Check palindromic prefixes from longest to shortest.",
      "optimizedComplexity": "Time O(n); Space O(n). KMP prefix function finds the longest palindromic prefix.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively decreases candidate prefix length.",
      "bruteForceCode": "class Solution {\n  public String shortestPalindrome(String s) {\n    for (int end = s.length(); end >= 0; end--) {\n      if (isPalindrome(s, 0, end - 1)) {\n        String suffix = s.substring(end);\n        return new StringBuilder(suffix).reverse().toString() + s;\n      }\n    }\n    return s;\n  }\n\n  private boolean isPalindrome(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String shortestPalindrome(String s) {\n    String reversed = new StringBuilder(s).reverse().toString();\n    String combined = s + '#' + reversed;\n    int[] lps = new int[combined.length()];\n    for (int i = 1; i < combined.length(); i++) {\n      int len = lps[i - 1];\n      while (len > 0 && combined.charAt(i) != combined.charAt(len)) len = lps[len - 1];\n      if (combined.charAt(i) == combined.charAt(len)) len++;\n      lps[i] = len;\n    }\n    int prefix = lps[combined.length() - 1];\n    return reversed.substring(0, s.length() - prefix) + s;\n  }\n}",
      "recursiveCode": "class Solution {\n  public String shortestPalindrome(String s) {\n    return build(s, s.length());\n  }\n\n  private String build(String s, int end) {\n    if (end <= 0 || isPalindrome(s, 0, end - 1)) {\n      String suffix = s.substring(end);\n      return new StringBuilder(suffix).reverse().toString() + s;\n    }\n    return build(s, end - 1);\n  }\n\n  private boolean isPalindrome(String s, int left, int right) {\n    if (left >= right) return true;\n    if (s.charAt(left) != s.charAt(right)) return false;\n    return isPalindrome(s, left + 1, right - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String shortestPalindrome(String s) {\n    String reversed = new StringBuilder(s).reverse().toString();\n    String combined = s + '#' + reversed;\n    int[] lps = new int[combined.length()];\n    for (int i = 1; i < combined.length(); i++) {\n      int len = lps[i - 1];\n      while (len > 0 && combined.charAt(i) != combined.charAt(len)) len = lps[len - 1];\n      if (combined.charAt(i) == combined.charAt(len)) len++;\n      lps[i] = len;\n    }\n    int prefix = lps[combined.length() - 1];\n    return reversed.substring(0, s.length() - prefix) + s;\n  }\n}",
      "code": "class Solution {\n  public String shortestPalindrome(String s) {\n    String reversed = new StringBuilder(s).reverse().toString();\n    String combined = s + '#' + reversed;\n    int[] lps = new int[combined.length()];\n    for (int i = 1; i < combined.length(); i++) {\n      int len = lps[i - 1];\n      while (len > 0 && combined.charAt(i) != combined.charAt(len)) len = lps[len - 1];\n      if (combined.charAt(i) == combined.charAt(len)) len++;\n      lps[i] = len;\n    }\n    int prefix = lps[combined.length() - 1];\n    return reversed.substring(0, s.length() - prefix) + s;\n  }\n}"
    }
  ],
  "checklist": [
    "Ask whether order matters; if not, use counts, sorted keys, or bijection signatures.",
    "For contiguous substring questions, check if a fixed or variable sliding window applies.",
    "For palindrome questions, identify centers, mirrored indexes, or the longest palindromic prefix.",
    "For encoded or expression strings, decide whether a stack or recursive parser preserves nested state.",
    "For repeated pattern matching, look for KMP prefix reuse instead of restarting comparisons."
  ],
  "traps": [
    "Using a delimiter-only encoding when strings may contain the delimiter.",
    "Forgetting duplicate character counts in anagram and minimum-window problems.",
    "Moving the left pointer backward when a repeated character was last seen before the current window.",
    "Treating spaces, punctuation, and case incorrectly in normalized palindrome problems.",
    "Not handling multi-digit repeat counts in decode-string and compression problems.",
    "Breaking bijection by checking only one direction of a map.",
    "For text justification, forgetting that the last line and single-word lines are left-justified."
  ],
  "edgeCases": [
    "Empty strings where allowed, and strings that become empty after filtering.",
    "Single-character strings and one-word inputs.",
    "Repeated characters, repeated words, and duplicate dictionary entries.",
    "Patterns longer than the source string in fixed-window problems.",
    "Nested brackets or nested parse states.",
    "Leading zeros, signs, decimal points, and exponent markers in numeric strings.",
    "Very long strings where substring creation inside nested loops becomes too expensive."
  ],
  "complexities": [
    "Frequency-count matching is usually O(n) time with O(1) alphabet space.",
    "Sliding-window substring problems are usually O(n) because each pointer moves forward only.",
    "Palindrome center expansion is O(n^2) time and O(1) space.",
    "KMP-style prefix matching is O(n + m) time with O(m) prefix-table space.",
    "Stack and parser problems are O(n) time with O(n) stack space in nested cases.",
    "String DP such as word break is commonly O(n^2) time and O(n) memo/DP space.",
    "Formatting/generation problems are O(total output length), which may dominate input size."
  ],
  "mentalModel": [
    "A string problem usually asks about counts, order, windows, grammar, or symmetry.",
    "When a substring must satisfy counts, track what changed at the two window boundaries.",
    "When syntax is nested, save state on a stack or let recursion own the nested scope.",
    "When comparing structure instead of values, convert both sides to the same canonical signature.",
    "When matching repeats, reuse prefix information instead of starting over after every mismatch."
  ],
  "revisionStrategy": [
    "Day 1: redo the 12 core problems and write the trigger before coding.",
    "Day 3: redo Minimum Window, Encode/Decode, Longest Palindrome, KMP strStr, and Valid Parenthesis String.",
    "Day 7: solve all fixed-window and variable-window problems back to back.",
    "Day 14: time-box Decode String, Basic Calculator II, Text Justification, Valid Number, and Shortest Palindrome.",
    "Before interviews: implement a 26-count window, a stack parser, center expansion, and KMP prefix table from memory."
  ],
  "unseen": [
    "Given two strings, decide if one can become the other by replacing exactly one character group.",
    "Given a stream of lowercase characters, return the first index where the last k characters are all unique.",
    "Given an encoded string with braces instead of brackets, expand it with nested repeat counts.",
    "Given a sentence and a width, center-align each line instead of fully justifying it.",
    "Given a string, find the shortest suffix to append so the whole string becomes a palindrome."
  ]
};
