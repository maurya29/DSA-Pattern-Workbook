const CURRENT_PATTERN = {
  "id": "arrays-hashing",
  "name": "Arrays & Hashing",
  "summary": "Indexing, counting, prefix-style transforms, frequency maps.",
  "complete": true,
  "subpatterns": [
    "Hash map complement lookup",
    "Hash set existence",
    "Frequency counting",
    "Canonical key hashing",
    "Prefix sum hash map",
    "Modulo prefix hashing",
    "Index marking",
    "Bucket counting",
    "Voting / count compression",
    "Design with map + array",
    "Fixed frequency window",
    "Last seen index map",
    "Length-prefix encoding",
    "Neighbor frequency lookup"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Two Sum",
      "difficulty": "Easy",
      "subpattern": "Hash map complement lookup",
      "question": "Given an integer array nums and an integer target, return the indexes of two distinct elements whose values add up to target. If no pair exists, return {-1, -1}.",
      "trigger": "For each number, the missing partner is target - nums[i], and you need to know whether that partner was seen earlier.",
      "intuition": "Brute force checks all pairs. The optimized version stores earlier values in a map so each complement lookup is constant time.",
      "edgeCases": "Duplicate values like [3,3], negative numbers, zero target, no valid pair, and never using the same index twice.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) for the map plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    for (int i = 0; i < nums.length - 1; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        if (nums[i] + nums[j] == target) {\n          return new int[] {i, j};\n        }\n      }\n    }\n    return new int[] {-1, -1};\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> indexByValue = new HashMap<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      int complement = target - nums[i];\n      if (indexByValue.containsKey(complement)) {\n        return new int[] {indexByValue.get(complement), i};\n      }\n      indexByValue.put(nums[i], i);\n    }\n\n    return new int[] {-1, -1};\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> indexByValue = new HashMap<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      int complement = target - nums[i];\n      if (indexByValue.containsKey(complement)) {\n        return new int[] {indexByValue.get(complement), i};\n      }\n      indexByValue.put(nums[i], i);\n    }\n\n    return new int[] {-1, -1};\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] twoSum(int[] nums, int target) {\n    return search(nums, target, 0, new HashMap<>());\n  }\n\n  private int[] search(int[] nums, int target, int index, Map<Integer, Integer> indexByValue) {\n    if (index == nums.length) {\n      return new int[] {-1, -1};\n    }\n\n    int complement = target - nums[index];\n    if (indexByValue.containsKey(complement)) {\n      return new int[] {indexByValue.get(complement), index};\n    }\n\n    indexByValue.put(nums[index], index);\n    return search(nums, target, index + 1, indexByValue);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> indexByValue = new HashMap<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      int complement = target - nums[i];\n      if (indexByValue.containsKey(complement)) {\n        return new int[] {indexByValue.get(complement), i};\n      }\n      indexByValue.put(nums[i], i);\n    }\n\n    return new int[] {-1, -1};\n  }\n}",
      "examples": [
        {
          "input": "nums = [2,7,11,15], target = 9",
          "output": "[0,1]",
          "explanation": "nums[0] + nums[1] = 2 + 7 = 9."
        },
        {
          "input": "nums = [3,2,4], target = 6",
          "output": "[1,2]",
          "explanation": "nums[1] + nums[2] = 2 + 4 = 6."
        },
        {
          "input": "nums = [3,3], target = 6",
          "output": "[0,1]",
          "explanation": "The same value can be used twice only when it appears at two different indexes."
        }
      ],
      "constraints": "2 <= nums.length <= 10^4; -10^9 <= nums[i] <= 10^9; -10^9 <= target <= 10^9; indexes must be distinct.",
      "source": {
        "label": "LeetCode 1 - Two Sum",
        "url": "https://leetcode.com/problems/two-sum/"
      }
    },
    {
      "group": "core",
      "name": "Contains Duplicate",
      "difficulty": "Easy",
      "subpattern": "Hash set existence",
      "question": "Given an integer array nums, return true if any value appears at least twice. Return false if every element is distinct.",
      "trigger": "The question asks whether a value has appeared before, which is direct membership checking.",
      "intuition": "Brute force compares every pair. The optimized version stores seen values in a HashSet and stops on the first repeated value.",
      "edgeCases": "Single element array, all values distinct, duplicate at the beginning, duplicate at the end, negative numbers, zero, and very large integer values.",
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) for the set plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public boolean containsDuplicate(int[] nums) {\n    for (int i = 0; i < nums.length - 1; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        if (nums[i] == nums[j]) {\n          return true;\n        }\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean containsDuplicate(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n\n    for (int num : nums) {\n      if (seen.contains(num)) {\n        return true;\n      }\n      seen.add(num);\n    }\n\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean containsDuplicate(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n\n    for (int num : nums) {\n      if (seen.contains(num)) {\n        return true;\n      }\n      seen.add(num);\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean containsDuplicate(int[] nums) {\n    return hasDuplicate(nums, 0, new HashSet<>());\n  }\n\n  private boolean hasDuplicate(int[] nums, int index, Set<Integer> seen) {\n    if (index == nums.length) {\n      return false;\n    }\n    if (seen.contains(nums[index])) {\n      return true;\n    }\n\n    seen.add(nums[index]);\n    return hasDuplicate(nums, index + 1, seen);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean containsDuplicate(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n\n    for (int num : nums) {\n      if (seen.contains(num)) {\n        return true;\n      }\n      seen.add(num);\n    }\n\n    return false;\n  }\n}",
      "examples": [
        {
          "input": "nums = [1,2,3,1]",
          "output": "true",
          "explanation": "The value 1 appears at indexes 0 and 3."
        },
        {
          "input": "nums = [1,2,3,4]",
          "output": "false",
          "explanation": "Every value appears exactly once."
        },
        {
          "input": "nums = [1,1,1,3,3,4,3,2,4,2]",
          "output": "true",
          "explanation": "Multiple values appear more than once."
        }
      ],
      "constraints": "1 <= nums.length <= 10^5; -10^9 <= nums[i] <= 10^9.",
      "source": {
        "label": "LeetCode 217 - Contains Duplicate",
        "url": "https://leetcode.com/problems/contains-duplicate/"
      }
    },
    {
      "group": "core",
      "name": "Valid Anagram",
      "difficulty": "Easy",
      "subpattern": "Frequency counting",
      "question": "Given two strings s and t, return true if t is an anagram of s. Return false otherwise. Both strings contain lowercase English letters.",
      "trigger": "The order of characters does not matter, but every character must appear the same number of times in both strings.",
      "intuition": "Brute force can sort both strings and compare them. The optimized version counts character frequency differences in one fixed-size array.",
      "edgeCases": "Different lengths, same letters in different order, repeated letters, one mismatched character, and lowercase-only constraint.",
      "examples": [
        {
          "input": "s = \"anagram\", t = \"nagaram\"",
          "output": "true",
          "explanation": "Both strings contain the same letters with the same frequencies."
        },
        {
          "input": "s = \"rat\", t = \"car\"",
          "output": "false",
          "explanation": "The character counts are different."
        },
        {
          "input": "s = \"aacc\", t = \"ccac\"",
          "output": "false",
          "explanation": "s has two a characters, but t has only one."
        }
      ],
      "bruteForceComplexity": "Time O(n log n), Space O(n) because both strings are converted to character arrays and sorted.",
      "optimizedComplexity": "Time O(n), Space O(1) because the frequency array has fixed size 26.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) frequency array.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) {\n      return false;\n    }\n\n    char[] first = s.toCharArray();\n    char[] second = t.toCharArray();\n    Arrays.sort(first);\n    Arrays.sort(second);\n\n    return Arrays.equals(first, second);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) {\n      return false;\n    }\n\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n      count[t.charAt(i) - 'a']--;\n    }\n\n    for (int value : count) {\n      if (value != 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) {\n      return false;\n    }\n\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n      count[t.charAt(i) - 'a']--;\n    }\n\n    for (int value : count) {\n      if (value != 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) {\n      return false;\n    }\n\n    int[] count = new int[26];\n    fillCounts(s, t, 0, count);\n    return allZero(count, 0);\n  }\n\n  private void fillCounts(String s, String t, int index, int[] count) {\n    if (index == s.length()) {\n      return;\n    }\n\n    count[s.charAt(index) - 'a']++;\n    count[t.charAt(index) - 'a']--;\n    fillCounts(s, t, index + 1, count);\n  }\n\n  private boolean allZero(int[] count, int index) {\n    if (index == count.length) {\n      return true;\n    }\n    return count[index] == 0 && allZero(count, index + 1);\n  }\n}",
      "code": "class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) {\n      return false;\n    }\n\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n      count[t.charAt(i) - 'a']--;\n    }\n\n    for (int value : count) {\n      if (value != 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n}",
      "constraints": "1 <= s.length, t.length <= 5 * 10^4; s and t consist of lowercase English letters.",
      "source": {
        "label": "LeetCode 242 - Valid Anagram",
        "url": "https://leetcode.com/problems/valid-anagram/"
      }
    },
    {
      "group": "core",
      "name": "Group Anagrams",
      "difficulty": "Medium",
      "subpattern": "Canonical key hashing",
      "question": "Given an array of strings strs, group the anagrams together. You may return the groups in any order.",
      "trigger": "Words that are anagrams become identical after converting them into the same canonical signature.",
      "intuition": "Brute force compares each word against existing groups. The optimized version maps each word to a frequency signature and appends it to that group.",
      "edgeCases": "Empty string, single string, all strings in one group, no two strings are anagrams, repeated identical strings, and output order does not matter.",
      "constraints": "1 <= strs.length <= 10^4; 0 <= strs[i].length <= 100; strs[i] consists of lowercase English letters.",
      "source": {
        "label": "LeetCode 49 - Group Anagrams",
        "url": "https://leetcode.com/problems/group-anagrams/"
      },
      "examples": [
        {
          "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
          "output": "[[\"bat\"],[\"tan\",\"nat\"],[\"eat\",\"tea\",\"ate\"]]",
          "explanation": "eat, tea, and ate share one signature; tan and nat share another; bat is alone."
        },
        {
          "input": "strs = [\"\"]",
          "output": "[[\"\"]]",
          "explanation": "The empty string forms one valid group."
        },
        {
          "input": "strs = [\"a\"]",
          "output": "[[\"a\"]]",
          "explanation": "A single word is grouped by itself."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * k), Space O(n * k) excluding output grouping overhead, where n is number of strings and k is max string length.",
      "optimizedComplexity": "Time O(n * k), Space O(n * k), because each word builds a 26-count key and is stored in a hash map group.",
      "recursiveComplexity": "Time O(n * k), Space O(n * k) plus O(n) call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    List<List<String>> groups = new ArrayList<>();\n\n    for (String word : strs) {\n      boolean placed = false;\n      for (List<String> group : groups) {\n        if (isAnagram(group.get(0), word)) {\n          group.add(word);\n          placed = true;\n          break;\n        }\n      }\n      if (!placed) {\n        List<String> group = new ArrayList<>();\n        group.add(word);\n        groups.add(group);\n      }\n    }\n\n    return groups;\n  }\n\n  private boolean isAnagram(String a, String b) {\n    if (a.length() != b.length()) {\n      return false;\n    }\n\n    int[] count = new int[26];\n    for (int i = 0; i < a.length(); i++) {\n      count[a.charAt(i) - 'a']++;\n      count[b.charAt(i) - 'a']--;\n    }\n\n    for (int value : count) {\n      if (value != 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n\n    for (String word : strs) {\n      String key = buildKey(word);\n      groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(word);\n    }\n\n    return new ArrayList<>(groups.values());\n  }\n\n  private String buildKey(String word) {\n    int[] count = new int[26];\n    for (char c : word.toCharArray()) {\n      count[c - 'a']++;\n    }\n    return Arrays.toString(count);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n\n    for (String word : strs) {\n      String key = buildKey(word);\n      groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(word);\n    }\n\n    return new ArrayList<>(groups.values());\n  }\n\n  private String buildKey(String word) {\n    int[] count = new int[26];\n    for (char c : word.toCharArray()) {\n      count[c - 'a']++;\n    }\n    return Arrays.toString(count);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    group(strs, 0, groups);\n    return new ArrayList<>(groups.values());\n  }\n\n  private void group(String[] strs, int index, Map<String, List<String>> groups) {\n    if (index == strs.length) {\n      return;\n    }\n\n    String key = buildKey(strs[index]);\n    groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(strs[index]);\n    group(strs, index + 1, groups);\n  }\n\n  private String buildKey(String word) {\n    int[] count = new int[26];\n    fillCount(word, 0, count);\n    return Arrays.toString(count);\n  }\n\n  private void fillCount(String word, int index, int[] count) {\n    if (index == word.length()) {\n      return;\n    }\n\n    count[word.charAt(index) - 'a']++;\n    fillCount(word, index + 1, count);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n\n    for (String word : strs) {\n      String key = buildKey(word);\n      groups.computeIfAbsent(key, unused -> new ArrayList<>()).add(word);\n    }\n\n    return new ArrayList<>(groups.values());\n  }\n\n  private String buildKey(String word) {\n    int[] count = new int[26];\n    for (char c : word.toCharArray()) {\n      count[c - 'a']++;\n    }\n    return Arrays.toString(count);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Top K Frequent Elements",
      "difficulty": "Medium",
      "subpattern": "Frequency map + bucket ranking",
      "question": "Given an integer array nums and an integer k, return the k most frequent elements. The answer may be returned in any order.",
      "trigger": "The output depends on element frequency, so the first required state is a frequency map.",
      "intuition": "Brute force sorts all unique values by frequency. The optimized version places values into buckets indexed by frequency and reads from highest frequency down.",
      "edgeCases": "k equals 1, k equals number of unique values, all values have same frequency, negative values, one-element input, and any output order is valid.",
      "constraints": "1 <= nums.length <= 10^5; -10^4 <= nums[i] <= 10^4; k is in [1, number of unique elements]; answer is guaranteed unique as a set.",
      "source": {
        "label": "LeetCode 347 - Top K Frequent Elements",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1,2,2,3], k = 2",
          "output": "[1,2]",
          "explanation": "1 appears 3 times and 2 appears 2 times."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "[1]",
          "explanation": "The only element is also the most frequent."
        },
        {
          "input": "nums = [4,4,4,6,6,7], k = 1",
          "output": "[4]",
          "explanation": "4 has the highest frequency."
        }
      ],
      "bruteForceComplexity": "Time O(n + m log m), Space O(m), where m is the number of unique values.",
      "optimizedComplexity": "Time O(n), Space O(n), using frequency buckets from 1 to n.",
      "recursiveComplexity": "Time O(n), Space O(n) plus O(n) recursion stack while scanning buckets.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int num : nums) {\n      freq.put(num, freq.getOrDefault(num, 0) + 1);\n    }\n\n    List<Integer> unique = new ArrayList<>(freq.keySet());\n    unique.sort((a, b) -> freq.get(b) - freq.get(a));\n\n    int[] answer = new int[k];\n    for (int i = 0; i < k; i++) {\n      answer[i] = unique.get(i);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int num : nums) {\n      freq.put(num, freq.getOrDefault(num, 0) + 1);\n    }\n\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {\n      int count = entry.getValue();\n      if (buckets[count] == null) {\n        buckets[count] = new ArrayList<>();\n      }\n      buckets[count].add(entry.getKey());\n    }\n\n    int[] answer = new int[k];\n    int index = 0;\n    for (int count = buckets.length - 1; count >= 0 && index < k; count--) {\n      if (buckets[count] == null) {\n        continue;\n      }\n      for (int value : buckets[count]) {\n        answer[index++] = value;\n        if (index == k) {\n          return answer;\n        }\n      }\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int num : nums) {\n      freq.put(num, freq.getOrDefault(num, 0) + 1);\n    }\n\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {\n      int count = entry.getValue();\n      if (buckets[count] == null) {\n        buckets[count] = new ArrayList<>();\n      }\n      buckets[count].add(entry.getKey());\n    }\n\n    int[] answer = new int[k];\n    int index = 0;\n    for (int count = buckets.length - 1; count >= 0 && index < k; count--) {\n      if (buckets[count] == null) {\n        continue;\n      }\n      for (int value : buckets[count]) {\n        answer[index++] = value;\n        if (index == k) {\n          return answer;\n        }\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    fillFrequency(nums, 0, freq);\n\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(freq.entrySet());\n    fillBuckets(entries, 0, buckets);\n\n    int[] answer = new int[k];\n    collect(buckets, buckets.length - 1, answer, 0);\n    return answer;\n  }\n\n  private void fillFrequency(int[] nums, int index, Map<Integer, Integer> freq) {\n    if (index == nums.length) {\n      return;\n    }\n    freq.put(nums[index], freq.getOrDefault(nums[index], 0) + 1);\n    fillFrequency(nums, index + 1, freq);\n  }\n\n  private void fillBuckets(List<Map.Entry<Integer, Integer>> entries, int index, List<Integer>[] buckets) {\n    if (index == entries.size()) {\n      return;\n    }\n\n    Map.Entry<Integer, Integer> entry = entries.get(index);\n    int count = entry.getValue();\n    if (buckets[count] == null) {\n      buckets[count] = new ArrayList<>();\n    }\n    buckets[count].add(entry.getKey());\n    fillBuckets(entries, index + 1, buckets);\n  }\n\n  private int collect(List<Integer>[] buckets, int bucketIndex, int[] answer, int answerIndex) {\n    if (bucketIndex < 0 || answerIndex == answer.length) {\n      return answerIndex;\n    }\n    if (buckets[bucketIndex] != null) {\n      answerIndex = collectBucket(buckets[bucketIndex], 0, answer, answerIndex);\n    }\n    return collect(buckets, bucketIndex - 1, answer, answerIndex);\n  }\n\n  private int collectBucket(List<Integer> bucket, int index, int[] answer, int answerIndex) {\n    if (index == bucket.size() || answerIndex == answer.length) {\n      return answerIndex;\n    }\n    answer[answerIndex] = bucket.get(index);\n    return collectBucket(bucket, index + 1, answer, answerIndex + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int num : nums) {\n      freq.put(num, freq.getOrDefault(num, 0) + 1);\n    }\n\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {\n      int count = entry.getValue();\n      if (buckets[count] == null) {\n        buckets[count] = new ArrayList<>();\n      }\n      buckets[count].add(entry.getKey());\n    }\n\n    int[] answer = new int[k];\n    int index = 0;\n    for (int count = buckets.length - 1; count >= 0 && index < k; count--) {\n      if (buckets[count] == null) {\n        continue;\n      }\n      for (int value : buckets[count]) {\n        answer[index++] = value;\n        if (index == k) {\n          return answer;\n        }\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Product of Array Except Self",
      "difficulty": "Medium",
      "subpattern": "Prefix and suffix accumulation",
      "question": "Given an integer array nums, return an array answer where answer[i] equals the product of all elements of nums except nums[i]. Solve it in O(n) time without using division.",
      "trigger": "Each index needs product of everything before it and everything after it, which is prefix/suffix state.",
      "intuition": "Brute force recomputes products for each index. The optimized version stores left products in the answer array, then multiplies by a running right product.",
      "edgeCases": "One zero, multiple zeroes, negative values, all ones, length two, and remembering that the output array is not counted as extra space.",
      "constraints": "2 <= nums.length <= 10^5; -30 <= nums[i] <= 30; products fit in 32-bit integer; division is not allowed.",
      "source": {
        "label": "LeetCode 238 - Product of Array Except Self",
        "url": "https://leetcode.com/problems/product-of-array-except-self/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,4]",
          "output": "[24,12,8,6]",
          "explanation": "For index 0, product is 2 * 3 * 4 = 24; for index 1, product is 1 * 3 * 4 = 12."
        },
        {
          "input": "nums = [-1,1,0,-3,3]",
          "output": "[0,0,9,0,0]",
          "explanation": "Only the index containing 0 gets the product of all non-zero values."
        },
        {
          "input": "nums = [2,3]",
          "output": "[3,2]",
          "explanation": "Each answer is the other element."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) excluding the output array.",
      "optimizedComplexity": "Time O(n), Space O(1) excluding the output array.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack excluding the output array.",
      "bruteForceCode": "class Solution {\n  public int[] productExceptSelf(int[] nums) {\n    int[] answer = new int[nums.length];\n\n    for (int i = 0; i < nums.length; i++) {\n      int product = 1;\n      for (int j = 0; j < nums.length; j++) {\n        if (i != j) {\n          product *= nums[j];\n        }\n      }\n      answer[i] = product;\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] productExceptSelf(int[] nums) {\n    int n = nums.length;\n    int[] answer = new int[n];\n\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n      answer[i] = prefix;\n      prefix *= nums[i];\n    }\n\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n      answer[i] *= suffix;\n      suffix *= nums[i];\n    }\n\n    return answer;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] productExceptSelf(int[] nums) {\n    int n = nums.length;\n    int[] answer = new int[n];\n\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n      answer[i] = prefix;\n      prefix *= nums[i];\n    }\n\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n      answer[i] *= suffix;\n      suffix *= nums[i];\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] productExceptSelf(int[] nums) {\n    int[] answer = new int[nums.length];\n    fillPrefix(nums, answer, 0, 1);\n    fillSuffix(nums, answer, nums.length - 1, 1);\n    return answer;\n  }\n\n  private void fillPrefix(int[] nums, int[] answer, int index, int prefix) {\n    if (index == nums.length) {\n      return;\n    }\n\n    answer[index] = prefix;\n    fillPrefix(nums, answer, index + 1, prefix * nums[index]);\n  }\n\n  private void fillSuffix(int[] nums, int[] answer, int index, int suffix) {\n    if (index < 0) {\n      return;\n    }\n\n    answer[index] *= suffix;\n    fillSuffix(nums, answer, index - 1, suffix * nums[index]);\n  }\n}",
      "code": "class Solution {\n  public int[] productExceptSelf(int[] nums) {\n    int n = nums.length;\n    int[] answer = new int[n];\n\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n      answer[i] = prefix;\n      prefix *= nums[i];\n    }\n\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n      answer[i] *= suffix;\n      suffix *= nums[i];\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Subarray Sum Equals K",
      "difficulty": "Medium",
      "subpattern": "Prefix sum hash map",
      "question": "Given an integer array nums and an integer k, return the total number of contiguous non-empty subarrays whose sum equals k.",
      "trigger": "You need sums of many contiguous ranges, and range sum can be represented as currentPrefix - previousPrefix.",
      "intuition": "Brute force checks every start and end. The optimized version counts how many earlier prefix sums equal currentPrefix - k.",
      "edgeCases": "Negative numbers, zero values, k equals zero, repeated prefix sums, whole array equals k, single-element subarrays, and why sliding window fails with negatives.",
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
          "input": "nums = [-1,-1,1], k = 0",
          "output": "1",
          "explanation": "The valid subarray is nums[1..2] = [-1,1]."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1), using a running sum for each start index.",
      "optimizedComplexity": "Time O(n), Space O(n), using a hash map of prefix-sum frequencies.",
      "recursiveComplexity": "Time O(n), Space O(n) for the map plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int subarraySum(int[] nums, int k) {\n    int count = 0;\n\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        if (sum == k) {\n          count++;\n        }\n      }\n    }\n\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> prefixFrequency = new HashMap<>();\n    prefixFrequency.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += prefixFrequency.getOrDefault(prefix - k, 0);\n      prefixFrequency.put(prefix, prefixFrequency.getOrDefault(prefix, 0) + 1);\n    }\n\n    return count;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> prefixFrequency = new HashMap<>();\n    prefixFrequency.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += prefixFrequency.getOrDefault(prefix - k, 0);\n      prefixFrequency.put(prefix, prefixFrequency.getOrDefault(prefix, 0) + 1);\n    }\n\n    return count;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> prefixFrequency = new HashMap<>();\n    prefixFrequency.put(0, 1);\n    return count(nums, k, 0, 0, prefixFrequency);\n  }\n\n  private int count(int[] nums, int k, int index, int prefix, Map<Integer, Integer> prefixFrequency) {\n    if (index == nums.length) {\n      return 0;\n    }\n\n    int currentPrefix = prefix + nums[index];\n    int matchesEndingHere = prefixFrequency.getOrDefault(currentPrefix - k, 0);\n    prefixFrequency.put(currentPrefix, prefixFrequency.getOrDefault(currentPrefix, 0) + 1);\n\n    return matchesEndingHere + count(nums, k, index + 1, currentPrefix, prefixFrequency);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> prefixFrequency = new HashMap<>();\n    prefixFrequency.put(0, 1);\n\n    int prefix = 0;\n    int count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += prefixFrequency.getOrDefault(prefix - k, 0);\n      prefixFrequency.put(prefix, prefixFrequency.getOrDefault(prefix, 0) + 1);\n    }\n\n    return count;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Consecutive Sequence",
      "difficulty": "Medium",
      "subpattern": "Hash set boundary expansion",
      "question": "Given an unsorted integer array nums, return the length of the longest consecutive elements sequence. The optimized solution must run in O(n) time.",
      "trigger": "Order in the array does not matter, but O(1) membership is needed to extend consecutive values.",
      "intuition": "Brute force can sort and scan. The optimized version starts only at sequence heads where num - 1 is absent, then expands forward.",
      "edgeCases": "Empty array, duplicates, negative numbers, one element, already consecutive values, and multiple sequences with the same length.",
      "constraints": "0 <= nums.length <= 10^5; -10^9 <= nums[i] <= 10^9; optimized solution should be O(n).",
      "source": {
        "label": "LeetCode 128 - Longest Consecutive Sequence",
        "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
      },
      "examples": [
        {
          "input": "nums = [100,4,200,1,3,2]",
          "output": "4",
          "explanation": "The longest consecutive sequence is [1,2,3,4]."
        },
        {
          "input": "nums = [0,3,7,2,5,8,4,6,0,1]",
          "output": "9",
          "explanation": "The longest sequence is [0,1,2,3,4,5,6,7,8]."
        },
        {
          "input": "nums = []",
          "output": "0",
          "explanation": "No elements means no consecutive sequence."
        }
      ],
      "bruteForceComplexity": "Time O(n log n), Space O(1) or O(n) depending on sorting implementation; Java Arrays.sort on int[] uses O(log n) stack in practice.",
      "optimizedComplexity": "Time O(n), Space O(n), because each number is expanded at most once from a sequence head.",
      "recursiveComplexity": "Time O(n), Space O(n) for the set plus recursion stack proportional to sequence length and number of scanned elements.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int longestConsecutive(int[] nums) {\n    if (nums.length == 0) {\n      return 0;\n    }\n\n    Arrays.sort(nums);\n    int best = 1;\n    int current = 1;\n\n    for (int i = 1; i < nums.length; i++) {\n      if (nums[i] == nums[i - 1]) {\n        continue;\n      }\n      if (nums[i] == nums[i - 1] + 1) {\n        current++;\n      } else {\n        current = 1;\n      }\n      best = Math.max(best, current);\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int longestConsecutive(int[] nums) {\n    Set<Integer> values = new HashSet<>();\n    for (int num : nums) {\n      values.add(num);\n    }\n\n    int best = 0;\n    for (int num : values) {\n      if (values.contains(num - 1)) {\n        continue;\n      }\n\n      int current = num;\n      int length = 0;\n      while (values.contains(current)) {\n        current++;\n        length++;\n      }\n      best = Math.max(best, length);\n    }\n\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int longestConsecutive(int[] nums) {\n    Set<Integer> values = new HashSet<>();\n    for (int num : nums) {\n      values.add(num);\n    }\n\n    int best = 0;\n    for (int num : values) {\n      if (values.contains(num - 1)) {\n        continue;\n      }\n\n      int current = num;\n      int length = 0;\n      while (values.contains(current)) {\n        current++;\n        length++;\n      }\n      best = Math.max(best, length);\n    }\n\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestConsecutive(int[] nums) {\n    Set<Integer> values = new HashSet<>();\n    for (int num : nums) {\n      values.add(num);\n    }\n\n    List<Integer> unique = new ArrayList<>(values);\n    return scanStarts(unique, values, 0, 0);\n  }\n\n  private int scanStarts(List<Integer> unique, Set<Integer> values, int index, int best) {\n    if (index == unique.size()) {\n      return best;\n    }\n\n    int num = unique.get(index);\n    if (values.contains(num - 1)) {\n      return scanStarts(unique, values, index + 1, best);\n    }\n\n    int length = expand(values, num);\n    return scanStarts(unique, values, index + 1, Math.max(best, length));\n  }\n\n  private int expand(Set<Integer> values, int current) {\n    if (!values.contains(current)) {\n      return 0;\n    }\n    return 1 + expand(values, current + 1);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int longestConsecutive(int[] nums) {\n    Set<Integer> values = new HashSet<>();\n    for (int num : nums) {\n      values.add(num);\n    }\n\n    int best = 0;\n    for (int num : values) {\n      if (values.contains(num - 1)) {\n        continue;\n      }\n\n      int current = num;\n      int length = 0;\n      while (values.contains(current)) {\n        current++;\n        length++;\n      }\n      best = Math.max(best, length);\n    }\n\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Majority Element",
      "difficulty": "Easy",
      "subpattern": "Voting / count compression",
      "question": "Given an integer array nums, return the majority element. The majority element appears more than floor(n / 2) times, and it is guaranteed to exist.",
      "trigger": "A value that appears more than half the array cannot be fully canceled by all other values.",
      "intuition": "Brute force counts each candidate. The optimized Boyer-Moore vote keeps one candidate and cancels it against different values.",
      "edgeCases": "Single element, all elements same, majority appears at the end, negative values, and no need to verify existence because the problem guarantees it.",
      "constraints": "1 <= nums.length <= 5 * 10^4; -2^31 <= nums[i] <= 2^31 - 1; majority element always exists.",
      "source": {
        "label": "LeetCode 169 - Majority Element",
        "url": "https://leetcode.com/problems/majority-element/"
      },
      "examples": [
        {
          "input": "nums = [3,2,3]",
          "output": "3",
          "explanation": "3 appears 2 times, which is more than floor(3 / 2)."
        },
        {
          "input": "nums = [2,2,1,1,1,2,2]",
          "output": "2",
          "explanation": "2 appears 4 times, which is more than floor(7 / 2)."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The only element is the majority element."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1), using Boyer-Moore voting.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int majorityElement(int[] nums) {\n    int threshold = nums.length / 2;\n\n    for (int candidate : nums) {\n      int count = 0;\n      for (int num : nums) {\n        if (num == candidate) {\n          count++;\n        }\n      }\n      if (count > threshold) {\n        return candidate;\n      }\n    }\n\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int majorityElement(int[] nums) {\n    int candidate = 0;\n    int votes = 0;\n\n    for (int num : nums) {\n      if (votes == 0) {\n        candidate = num;\n      }\n      votes += num == candidate ? 1 : -1;\n    }\n\n    return candidate;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int majorityElement(int[] nums) {\n    int candidate = 0;\n    int votes = 0;\n\n    for (int num : nums) {\n      if (votes == 0) {\n        candidate = num;\n      }\n      votes += num == candidate ? 1 : -1;\n    }\n\n    return candidate;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int majorityElement(int[] nums) {\n    return vote(nums, 0, 0, 0);\n  }\n\n  private int vote(int[] nums, int index, int candidate, int votes) {\n    if (index == nums.length) {\n      return candidate;\n    }\n\n    if (votes == 0) {\n      return vote(nums, index + 1, nums[index], 1);\n    }\n\n    int nextVotes = nums[index] == candidate ? votes + 1 : votes - 1;\n    return vote(nums, index + 1, candidate, nextVotes);\n  }\n}",
      "code": "class Solution {\n  public int majorityElement(int[] nums) {\n    int candidate = 0;\n    int votes = 0;\n\n    for (int num : nums) {\n      if (votes == 0) {\n        candidate = num;\n      }\n      votes += num == candidate ? 1 : -1;\n    }\n\n    return candidate;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find All Numbers Disappeared in an Array",
      "difficulty": "Easy",
      "subpattern": "Index marking",
      "question": "Given an integer array nums of length n where every nums[i] is in the range [1, n], return all numbers in the range [1, n] that do not appear in nums.",
      "trigger": "Values map directly to indexes because every value is between 1 and n.",
      "intuition": "Brute force checks every value from 1 to n. The optimized version marks nums[value - 1] as visited by making it negative.",
      "edgeCases": "No missing numbers, all values duplicated in pairs, one missing number, repeated visits to the same index, and using Math.abs because values may already be marked negative.",
      "constraints": "n == nums.length; 1 <= n <= 10^5; 1 <= nums[i] <= n.",
      "source": {
        "label": "LeetCode 448 - Find All Numbers Disappeared in an Array",
        "url": "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/"
      },
      "examples": [
        {
          "input": "nums = [4,3,2,7,8,2,3,1]",
          "output": "[5,6]",
          "explanation": "The numbers 5 and 6 from range [1,8] do not appear."
        },
        {
          "input": "nums = [1,1]",
          "output": "[2]",
          "explanation": "The value 2 is missing from range [1,2]."
        },
        {
          "input": "nums = [1,2,3,4]",
          "output": "[]",
          "explanation": "Every number from 1 to 4 appears."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1) excluding the output list.",
      "optimizedComplexity": "Time O(n), Space O(1) excluding the output list, using in-place marking.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack excluding the output list.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findDisappearedNumbers(int[] nums) {\n    List<Integer> missing = new ArrayList<>();\n\n    for (int value = 1; value <= nums.length; value++) {\n      boolean found = false;\n      for (int num : nums) {\n        if (num == value) {\n          found = true;\n          break;\n        }\n      }\n      if (!found) {\n        missing.add(value);\n      }\n    }\n\n    return missing;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findDisappearedNumbers(int[] nums) {\n    for (int num : nums) {\n      int index = Math.abs(num) - 1;\n      if (nums[index] > 0) {\n        nums[index] = -nums[index];\n      }\n    }\n\n    List<Integer> missing = new ArrayList<>();\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] > 0) {\n        missing.add(i + 1);\n      }\n    }\n    return missing;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findDisappearedNumbers(int[] nums) {\n    for (int num : nums) {\n      int index = Math.abs(num) - 1;\n      if (nums[index] > 0) {\n        nums[index] = -nums[index];\n      }\n    }\n\n    List<Integer> missing = new ArrayList<>();\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] > 0) {\n        missing.add(i + 1);\n      }\n    }\n    return missing;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findDisappearedNumbers(int[] nums) {\n    markSeen(nums, 0);\n    List<Integer> missing = new ArrayList<>();\n    collectMissing(nums, 0, missing);\n    return missing;\n  }\n\n  private void markSeen(int[] nums, int index) {\n    if (index == nums.length) {\n      return;\n    }\n\n    int targetIndex = Math.abs(nums[index]) - 1;\n    if (nums[targetIndex] > 0) {\n      nums[targetIndex] = -nums[targetIndex];\n    }\n    markSeen(nums, index + 1);\n  }\n\n  private void collectMissing(int[] nums, int index, List<Integer> missing) {\n    if (index == nums.length) {\n      return;\n    }\n\n    if (nums[index] > 0) {\n      missing.add(index + 1);\n    }\n    collectMissing(nums, index + 1, missing);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findDisappearedNumbers(int[] nums) {\n    for (int num : nums) {\n      int index = Math.abs(num) - 1;\n      if (nums[index] > 0) {\n        nums[index] = -nums[index];\n      }\n    }\n\n    List<Integer> missing = new ArrayList<>();\n    for (int i = 0; i < nums.length; i++) {\n      if (nums[i] > 0) {\n        missing.add(i + 1);\n      }\n    }\n    return missing;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Intersection of Two Arrays",
      "difficulty": "Easy",
      "subpattern": "Hash set intersection",
      "question": "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique, and the result may be returned in any order.",
      "trigger": "You need to test membership from one array while scanning the other, and duplicates should be removed.",
      "intuition": "Brute force checks every pair and guards against duplicate output. The optimized version stores one array in a set and collects matches in another set.",
      "edgeCases": "No intersection, all values intersect, duplicate values in either array, different array sizes, and output order does not matter.",
      "constraints": "1 <= nums1.length, nums2.length <= 1000; 0 <= nums1[i], nums2[i] <= 1000; each output value must be unique.",
      "source": {
        "label": "LeetCode 349 - Intersection of Two Arrays",
        "url": "https://leetcode.com/problems/intersection-of-two-arrays/"
      },
      "examples": [
        {
          "input": "nums1 = [1,2,2,1], nums2 = [2,2]",
          "output": "[2]",
          "explanation": "2 appears in both arrays, but output values must be unique."
        },
        {
          "input": "nums1 = [4,9,5], nums2 = [9,4,9,8,4]",
          "output": "[9,4]",
          "explanation": "Both 9 and 4 appear in both arrays; order does not matter."
        },
        {
          "input": "nums1 = [1,3,5], nums2 = [2,4,6]",
          "output": "[]",
          "explanation": "There are no common values."
        }
      ],
      "bruteForceComplexity": "Time O(m * n + r^2), Space O(r), where r is the number of unique intersection values.",
      "optimizedComplexity": "Time O(m + n), Space O(m + r), where r is the number of unique intersection values.",
      "recursiveComplexity": "Time O(m + n), Space O(m + r) plus O(m + n) call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersection(int[] nums1, int[] nums2) {\n    List<Integer> result = new ArrayList<>();\n\n    for (int a : nums1) {\n      for (int b : nums2) {\n        if (a == b && !contains(result, a)) {\n          result.add(a);\n          break;\n        }\n      }\n    }\n\n    return toArray(result);\n  }\n\n  private boolean contains(List<Integer> values, int target) {\n    for (int value : values) {\n      if (value == target) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  private int[] toArray(List<Integer> values) {\n    int[] answer = new int[values.size()];\n    for (int i = 0; i < values.size(); i++) {\n      answer[i] = values.get(i);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersection(int[] nums1, int[] nums2) {\n    Set<Integer> values = new HashSet<>();\n    for (int num : nums1) {\n      values.add(num);\n    }\n\n    Set<Integer> result = new HashSet<>();\n    for (int num : nums2) {\n      if (values.contains(num)) {\n        result.add(num);\n      }\n    }\n\n    int[] answer = new int[result.size()];\n    int index = 0;\n    for (int num : result) {\n      answer[index++] = num;\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersection(int[] nums1, int[] nums2) {\n    Set<Integer> values = new HashSet<>();\n    for (int num : nums1) {\n      values.add(num);\n    }\n\n    Set<Integer> result = new HashSet<>();\n    for (int num : nums2) {\n      if (values.contains(num)) {\n        result.add(num);\n      }\n    }\n\n    int[] answer = new int[result.size()];\n    int index = 0;\n    for (int num : result) {\n      answer[index++] = num;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] intersection(int[] nums1, int[] nums2) {\n    Set<Integer> values = new HashSet<>();\n    fillSet(nums1, 0, values);\n\n    Set<Integer> result = new HashSet<>();\n    collectIntersection(nums2, 0, values, result);\n\n    int[] answer = new int[result.size()];\n    fillArray(new ArrayList<>(result), 0, answer);\n    return answer;\n  }\n\n  private void fillSet(int[] nums, int index, Set<Integer> values) {\n    if (index == nums.length) {\n      return;\n    }\n    values.add(nums[index]);\n    fillSet(nums, index + 1, values);\n  }\n\n  private void collectIntersection(int[] nums, int index, Set<Integer> values, Set<Integer> result) {\n    if (index == nums.length) {\n      return;\n    }\n    if (values.contains(nums[index])) {\n      result.add(nums[index]);\n    }\n    collectIntersection(nums, index + 1, values, result);\n  }\n\n  private void fillArray(List<Integer> values, int index, int[] answer) {\n    if (index == values.size()) {\n      return;\n    }\n    answer[index] = values.get(index);\n    fillArray(values, index + 1, answer);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] intersection(int[] nums1, int[] nums2) {\n    Set<Integer> values = new HashSet<>();\n    for (int num : nums1) {\n      values.add(num);\n    }\n\n    Set<Integer> result = new HashSet<>();\n    for (int num : nums2) {\n      if (values.contains(num)) {\n        result.add(num);\n      }\n    }\n\n    int[] answer = new int[result.size()];\n    int index = 0;\n    for (int num : result) {\n      answer[index++] = num;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "First Unique Character in a String",
      "difficulty": "Easy",
      "subpattern": "Frequency counting",
      "question": "Given a string s, find the first non-repeating character and return its index. If it does not exist, return -1.",
      "trigger": "You need global frequency information before deciding which character is the first unique one.",
      "intuition": "Brute force checks each character against all others. The optimized version counts all characters once, then scans from left to right for count one.",
      "edgeCases": "Single character, no unique character, first character unique, last character unique, all same characters, and lowercase-only constraint.",
      "constraints": "1 <= s.length <= 10^5; s consists of lowercase English letters.",
      "source": {
        "label": "LeetCode 387 - First Unique Character in a String",
        "url": "https://leetcode.com/problems/first-unique-character-in-a-string/"
      },
      "examples": [
        {
          "input": "s = \"leetcode\"",
          "output": "0",
          "explanation": "l is the first character that appears once."
        },
        {
          "input": "s = \"loveleetcode\"",
          "output": "2",
          "explanation": "v at index 2 is the first non-repeating character."
        },
        {
          "input": "s = \"aabb\"",
          "output": "-1",
          "explanation": "Every character appears more than once."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1), because the count array has fixed size 26.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) frequency array.",
      "bruteForceCode": "class Solution {\n  public int firstUniqChar(String s) {\n    for (int i = 0; i < s.length(); i++) {\n      boolean unique = true;\n      for (int j = 0; j < s.length(); j++) {\n        if (i != j && s.charAt(i) == s.charAt(j)) {\n          unique = false;\n          break;\n        }\n      }\n      if (unique) {\n        return i;\n      }\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] count = new int[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n    }\n\n    for (int i = 0; i < s.length(); i++) {\n      if (count[s.charAt(i) - 'a'] == 1) {\n        return i;\n      }\n    }\n\n    return -1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] count = new int[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n    }\n\n    for (int i = 0; i < s.length(); i++) {\n      if (count[s.charAt(i) - 'a'] == 1) {\n        return i;\n      }\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] count = new int[26];\n    fillCounts(s, 0, count);\n    return findFirstUnique(s, 0, count);\n  }\n\n  private void fillCounts(String s, int index, int[] count) {\n    if (index == s.length()) {\n      return;\n    }\n\n    count[s.charAt(index) - 'a']++;\n    fillCounts(s, index + 1, count);\n  }\n\n  private int findFirstUnique(String s, int index, int[] count) {\n    if (index == s.length()) {\n      return -1;\n    }\n    if (count[s.charAt(index) - 'a'] == 1) {\n      return index;\n    }\n    return findFirstUnique(s, index + 1, count);\n  }\n}",
      "code": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] count = new int[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n    }\n\n    for (int i = 0; i < s.length(); i++) {\n      if (count[s.charAt(i) - 'a'] == 1) {\n        return i;\n      }\n    }\n\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Encode and Decode Strings",
      "difficulty": "Medium",
      "subpattern": "Length-prefix encoding",
      "question": "Design an algorithm to encode a list of strings into one string and decode it back to the original list. Strings may contain any valid characters.",
      "trigger": "Raw separators are unsafe because separator characters can appear inside strings.",
      "intuition": "Prefix each string with its length and a delimiter, then read exactly that many characters while decoding.",
      "edgeCases": "Empty list, empty string, delimiter inside string, multi-digit length, spaces, and repeated strings.",
      "constraints": "Design problem; encode and decode must be inverse operations for arbitrary strings.",
      "source": {
        "label": "LeetCode 271 - Encode and Decode Strings",
        "url": "https://leetcode.com/problems/encode-and-decode-strings/"
      },
      "examples": [
        {
          "input": "strs = [\"lint\",\"code\",\"love\",\"you\"]",
          "output": "[\"lint\",\"code\",\"love\",\"you\"]",
          "explanation": "Decoding restores the original list."
        },
        {
          "input": "strs = [\"\"]",
          "output": "[\"\"]",
          "explanation": "An empty string is encoded as length 0."
        },
        {
          "input": "strs = [\"a#b\",\"12\"]",
          "output": "[\"a#b\",\"12\"]",
          "explanation": "The delimiter is safe because length controls parsing."
        }
      ],
      "bruteForceComplexity": "Time O(totalChars), Space O(totalChars), using delimiter escaping.",
      "optimizedComplexity": "Time O(totalChars), Space O(totalChars), using length-prefix encoding.",
      "recursiveComplexity": "Time O(totalChars), Space O(totalChars) plus O(number of strings) call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder out = new StringBuilder();\n    for (String s : strs) out.append(s.replace(\"/\", \"//\").replace(\"#\", \"/#\")).append('#');\n    return out.toString();\n  }\n  public List<String> decode(String s) {\n    List<String> ans = new ArrayList<>(); StringBuilder cur = new StringBuilder(); boolean escaped = false;\n    for (char c : s.toCharArray()) {\n      if (escaped) { cur.append(c); escaped = false; }\n      else if (c == '/') escaped = true;\n      else if (c == '#') { ans.add(cur.toString()); cur.setLength(0); }\n      else cur.append(c);\n    }\n    return ans;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder out = new StringBuilder();\n    for (String s : strs) out.append(s.length()).append('#').append(s);\n    return out.toString();\n  }\n  public List<String> decode(String s) {\n    List<String> ans = new ArrayList<>(); int i = 0;\n    while (i < s.length()) {\n      int j = i; while (s.charAt(j) != '#') j++;\n      int len = Integer.parseInt(s.substring(i, j));\n      ans.add(s.substring(j + 1, j + 1 + len));\n      i = j + 1 + len;\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder out = new StringBuilder();\n    for (String s : strs) out.append(s.length()).append('#').append(s);\n    return out.toString();\n  }\n  public List<String> decode(String s) {\n    List<String> ans = new ArrayList<>(); int i = 0;\n    while (i < s.length()) {\n      int j = i; while (s.charAt(j) != '#') j++;\n      int len = Integer.parseInt(s.substring(i, j));\n      ans.add(s.substring(j + 1, j + 1 + len));\n      i = j + 1 + len;\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) { StringBuilder out = new StringBuilder(); encode(strs, 0, out); return out.toString(); }\n  private void encode(List<String> strs, int i, StringBuilder out) {\n    if (i == strs.size()) return;\n    String s = strs.get(i); out.append(s.length()).append('#').append(s); encode(strs, i + 1, out);\n  }\n  public List<String> decode(String s) { List<String> ans = new ArrayList<>(); decode(s, 0, ans); return ans; }\n  private void decode(String s, int i, List<String> ans) {\n    if (i == s.length()) return;\n    int j = i; while (s.charAt(j) != '#') j++;\n    int len = Integer.parseInt(s.substring(i, j)); ans.add(s.substring(j + 1, j + 1 + len));\n    decode(s, j + 1 + len, ans);\n  }\n}",
      "code": "import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder out = new StringBuilder();\n    for (String s : strs) out.append(s.length()).append('#').append(s);\n    return out.toString();\n  }\n  public List<String> decode(String s) {\n    List<String> ans = new ArrayList<>(); int i = 0;\n    while (i < s.length()) {\n      int j = i; while (s.charAt(j) != '#') j++;\n      int len = Integer.parseInt(s.substring(i, j));\n      ans.add(s.substring(j + 1, j + 1 + len));\n      i = j + 1 + len;\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "subpattern": "Last seen index map",
      "question": "Given a string s, return the length of the longest substring without repeating characters.",
      "trigger": "A repeated character invalidates the current substring and moves the left boundary.",
      "intuition": "Store last seen indexes and move left only forward.",
      "edgeCases": "Empty string, all same, all unique, repeated char before current window, spaces, digits, symbols.",
      "constraints": "0 <= s.length <= 5 * 10^4; s may contain letters, digits, symbols, and spaces.",
      "source": {
        "label": "LeetCode 3 - Longest Substring Without Repeating Characters",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      },
      "examples": [
        {
          "input": "s = \"abcabcbb\"",
          "output": "3",
          "explanation": "The answer is \"abc\"."
        },
        {
          "input": "s = \"bbbbb\"",
          "output": "1",
          "explanation": "The answer is \"b\"."
        },
        {
          "input": "s = \"pwwkew\"",
          "output": "3",
          "explanation": "The answer is \"wke\"."
        }
      ],
      "bruteForceComplexity": "Time O(n^3), Space O(min(n, charset)).",
      "optimizedComplexity": "Time O(n), Space O(min(n, charset)).",
      "recursiveComplexity": "Time O(n), Space O(min(n, charset)) plus O(n) call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    int best = 0;\n    for (int i = 0; i < s.length(); i++) for (int j = i; j < s.length(); j++) if (unique(s, i, j)) best = Math.max(best, j - i + 1);\n    return best;\n  }\n  private boolean unique(String s, int l, int r) {\n    Set<Character> seen = new HashSet<>();\n    for (int i = l; i <= r; i++) if (!seen.add(s.charAt(i))) return false;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> last = new HashMap<>(); int left = 0, best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      char c = s.charAt(right);\n      if (last.containsKey(c)) left = Math.max(left, last.get(c) + 1);\n      last.put(c, right); best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> last = new HashMap<>(); int left = 0, best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      char c = s.charAt(right);\n      if (last.containsKey(c)) left = Math.max(left, last.get(c) + 1);\n      last.put(c, right); best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) { return scan(s, 0, 0, 0, new HashMap<>()); }\n  private int scan(String s, int right, int left, int best, Map<Character, Integer> last) {\n    if (right == s.length()) return best;\n    char c = s.charAt(right);\n    if (last.containsKey(c)) left = Math.max(left, last.get(c) + 1);\n    last.put(c, right);\n    return scan(s, right + 1, left, Math.max(best, right - left + 1), last);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> last = new HashMap<>(); int left = 0, best = 0;\n    for (int right = 0; right < s.length(); right++) {\n      char c = s.charAt(right);\n      if (last.containsKey(c)) left = Math.max(left, last.get(c) + 1);\n      last.put(c, right); best = Math.max(best, right - left + 1);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Window Substring",
      "difficulty": "Hard",
      "subpattern": "Frequency deficit map",
      "question": "Given strings s and t, return the minimum window substring of s that contains every character in t including duplicates, or an empty string if none exists.",
      "trigger": "The window must satisfy required character frequencies and then shrink to minimum.",
      "intuition": "Expand until all required chars are present, then shrink while valid.",
      "edgeCases": "t longer than s, no valid window, duplicate required chars, full-string window, case sensitivity.",
      "constraints": "1 <= s.length, t.length <= 10^5; s and t contain uppercase and lowercase English letters.",
      "source": {
        "label": "LeetCode 76 - Minimum Window Substring",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      },
      "examples": [
        {
          "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
          "output": "\"BANC\"",
          "explanation": "BANC is the shortest valid window."
        },
        {
          "input": "s = \"a\", t = \"a\"",
          "output": "\"a\"",
          "explanation": "The full string is valid."
        },
        {
          "input": "s = \"a\", t = \"aa\"",
          "output": "\"\"",
          "explanation": "Two a characters are required."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * charset), Space O(charset).",
      "optimizedComplexity": "Time O(n + m), Space O(charset).",
      "recursiveComplexity": "Time O(n + m), Space O(charset) plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public String minWindow(String s, String t) {\n    String best = \"\";\n    for (int i = 0; i < s.length(); i++) for (int j = i; j < s.length(); j++) {\n      String w = s.substring(i, j + 1);\n      if ((best.isEmpty() || w.length() < best.length()) && contains(w, t)) best = w;\n    }\n    return best;\n  }\n  private boolean contains(String w, String t) {\n    int[] count = new int[128]; for (char c : w.toCharArray()) count[c]++;\n    for (char c : t.toCharArray()) if (--count[c] < 0) return false;\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128]; for (char c : t.toCharArray()) need[c]++;\n    int missing = t.length(), left = 0, start = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n      if (need[s.charAt(right)]-- > 0) missing--;\n      while (missing == 0) {\n        if (right - left + 1 < best) { best = right - left + 1; start = left; }\n        if (++need[s.charAt(left++)] > 0) missing++;\n      }\n    }\n    return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128]; for (char c : t.toCharArray()) need[c]++;\n    int missing = t.length(), left = 0, start = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n      if (need[s.charAt(right)]-- > 0) missing--;\n      while (missing == 0) {\n        if (right - left + 1 < best) { best = right - left + 1; start = left; }\n        if (++need[s.charAt(left++)] > 0) missing++;\n      }\n    }\n    return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n  }\n}",
      "recursiveCode": "class Solution {\n  public String minWindow(String s, String t) {\n    return solveIteratively(s, t);\n  }\n  private String solveIteratively(String s, String t) {\n    int[] need = new int[128]; for (char c : t.toCharArray()) need[c]++;\n    int missing = t.length(), left = 0, start = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n      if (need[s.charAt(right)]-- > 0) missing--;\n      while (missing == 0) {\n        if (right - left + 1 < best) { best = right - left + 1; start = left; }\n        if (++need[s.charAt(left++)] > 0) missing++;\n      }\n    }\n    return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n  }\n}",
      "code": "class Solution {\n  public String minWindow(String s, String t) {\n    int[] need = new int[128]; for (char c : t.toCharArray()) need[c]++;\n    int missing = t.length(), left = 0, start = 0, best = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n      if (need[s.charAt(right)]-- > 0) missing--;\n      while (missing == 0) {\n        if (right - left + 1 < best) { best = right - left + 1; start = left; }\n        if (++need[s.charAt(left++)] > 0) missing++;\n      }\n    }\n    return best == Integer.MAX_VALUE ? \"\" : s.substring(start, start + best);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Find All Anagrams in a String",
      "difficulty": "Medium",
      "subpattern": "Fixed frequency window",
      "question": "Given strings s and p, return all start indices of p's anagrams in s.",
      "trigger": "Every valid window has fixed length p.length and identical character frequencies.",
      "intuition": "Slide a fixed-size frequency window across s.",
      "edgeCases": "p longer than s, overlapping anagrams, repeated letters, no matches, lowercase-only input.",
      "constraints": "1 <= s.length, p.length <= 3 * 10^4; s and p consist of lowercase English letters.",
      "source": {
        "label": "LeetCode 438 - Find All Anagrams in a String",
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
      },
      "examples": [
        {
          "input": "s = \"cbaebabacd\", p = \"abc\"",
          "output": "[0,6]",
          "explanation": "cba and bac are anagrams."
        },
        {
          "input": "s = \"abab\", p = \"ab\"",
          "output": "[0,1,2]",
          "explanation": "ab, ba, and ab are valid."
        },
        {
          "input": "s = \"baa\", p = \"aa\"",
          "output": "[1]",
          "explanation": "aa starts at index 1."
        }
      ],
      "bruteForceComplexity": "Time O((n - m + 1) * m), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) count arrays.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> ans = new ArrayList<>();\n    for (int i = 0; i + p.length() <= s.length(); i++) if (same(s, i, p)) ans.add(i);\n    return ans;\n  }\n  private boolean same(String s, int start, String p) {\n    int[] count = new int[26];\n    for (char c : p.toCharArray()) count[c - 'a']++;\n    for (int i = 0; i < p.length(); i++) count[s.charAt(start + i) - 'a']--;\n    for (int v : count) if (v != 0) return false;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> ans = new ArrayList<>();\n    if (p.length() > s.length()) return ans;\n    int[] need = new int[26], window = new int[26];\n    for (char c : p.toCharArray()) need[c - 'a']++;\n    for (int right = 0; right < s.length(); right++) {\n      window[s.charAt(right) - 'a']++;\n      if (right >= p.length()) window[s.charAt(right - p.length()) - 'a']--;\n      if (Arrays.equals(need, window)) ans.add(right - p.length() + 1);\n    }\n    return ans;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> ans = new ArrayList<>();\n    if (p.length() > s.length()) return ans;\n    int[] need = new int[26], window = new int[26];\n    for (char c : p.toCharArray()) need[c - 'a']++;\n    for (int right = 0; right < s.length(); right++) {\n      window[s.charAt(right) - 'a']++;\n      if (right >= p.length()) window[s.charAt(right - p.length()) - 'a']--;\n      if (Arrays.equals(need, window)) ans.add(right - p.length() + 1);\n    }\n    return ans;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> ans = new ArrayList<>();\n    if (p.length() > s.length()) return ans;\n    int[] need = new int[26], window = new int[26];\n    for (char c : p.toCharArray()) need[c - 'a']++;\n    scan(s, p.length(), 0, need, window, ans);\n    return ans;\n  }\n  private void scan(String s, int len, int right, int[] need, int[] window, List<Integer> ans) {\n    if (right == s.length()) return;\n    window[s.charAt(right) - 'a']++;\n    if (right >= len) window[s.charAt(right - len) - 'a']--;\n    if (Arrays.equals(need, window)) ans.add(right - len + 1);\n    scan(s, len, right + 1, need, window, ans);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> ans = new ArrayList<>();\n    if (p.length() > s.length()) return ans;\n    int[] need = new int[26], window = new int[26];\n    for (char c : p.toCharArray()) need[c - 'a']++;\n    for (int right = 0; right < s.length(); right++) {\n      window[s.charAt(right) - 'a']++;\n      if (right >= p.length()) window[s.charAt(right - p.length()) - 'a']--;\n      if (Arrays.equals(need, window)) ans.add(right - p.length() + 1);\n    }\n    return ans;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Contiguous Array",
      "difficulty": "Medium",
      "subpattern": "Prefix balance map",
      "question": "Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.",
      "trigger": "Converting 0 to -1 makes equal 0/1 counts become repeated prefix balance.",
      "intuition": "Store the first index of every balance; repeated balance gives a balanced range.",
      "edgeCases": "All zeros, all ones, whole array balanced, length one, repeated balance values.",
      "constraints": "1 <= nums.length <= 10^5; nums[i] is 0 or 1.",
      "source": {
        "label": "LeetCode 525 - Contiguous Array",
        "url": "https://leetcode.com/problems/contiguous-array/"
      },
      "examples": [
        {
          "input": "nums = [0,1]",
          "output": "2",
          "explanation": "The whole array is balanced."
        },
        {
          "input": "nums = [0,1,0]",
          "output": "2",
          "explanation": "[0,1] or [1,0] is balanced."
        },
        {
          "input": "nums = [0,0,1,0,0,0,1,1]",
          "output": "6",
          "explanation": "A longest balanced subarray has length 6."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int findMaxLength(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int zero = 0, one = 0;\n      for (int j = i; j < nums.length; j++) {\n        if (nums[j] == 0) zero++; else one++;\n        if (zero == one) best = Math.max(best, j - i + 1);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> first = new HashMap<>();\n    first.put(0, -1);\n    int balance = 0, best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      balance += nums[i] == 1 ? 1 : -1;\n      if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance));\n      else first.put(balance, i);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> first = new HashMap<>();\n    first.put(0, -1);\n    int balance = 0, best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      balance += nums[i] == 1 ? 1 : -1;\n      if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance));\n      else first.put(balance, i);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> first = new HashMap<>();\n    first.put(0, -1);\n    return scan(nums, 0, 0, 0, first);\n  }\n  private int scan(int[] nums, int i, int balance, int best, Map<Integer, Integer> first) {\n    if (i == nums.length) return best;\n    balance += nums[i] == 1 ? 1 : -1;\n    if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance)); else first.put(balance, i);\n    return scan(nums, i + 1, balance, best, first);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findMaxLength(int[] nums) {\n    Map<Integer, Integer> first = new HashMap<>();\n    first.put(0, -1);\n    int balance = 0, best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      balance += nums[i] == 1 ? 1 : -1;\n      if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance));\n      else first.put(balance, i);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Longest Harmonious Subsequence",
      "difficulty": "Easy",
      "subpattern": "Neighbor frequency lookup",
      "question": "Given an integer array nums, return the length of the longest harmonious subsequence where max and min differ by exactly 1.",
      "trigger": "Only neighboring values x and x + 1 can form a valid harmonious subsequence.",
      "intuition": "Count frequencies and combine each value with its next neighbor if present.",
      "edgeCases": "No valid subsequence, all same values, negative numbers, duplicate-heavy input, subsequence not contiguous.",
      "constraints": "1 <= nums.length <= 2 * 10^4; -10^9 <= nums[i] <= 10^9.",
      "source": {
        "label": "LeetCode 594 - Longest Harmonious Subsequence",
        "url": "https://leetcode.com/problems/longest-harmonious-subsequence/"
      },
      "examples": [
        {
          "input": "nums = [1,3,2,2,5,2,3,7]",
          "output": "5",
          "explanation": "[3,2,2,2,3] is harmonious."
        },
        {
          "input": "nums = [1,2,3,4]",
          "output": "2",
          "explanation": "Any adjacent pair gives length 2."
        },
        {
          "input": "nums = [1,1,1,1]",
          "output": "0",
          "explanation": "Difference is never exactly 1."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) plus O(u) call stack.",
      "bruteForceCode": "class Solution {\n  public int findLHS(int[] nums) {\n    int best = 0;\n    for (int x : nums) {\n      int count = 0; boolean hasNext = false;\n      for (int y : nums) if (y == x || y == x + 1) { count++; if (y == x + 1) hasNext = true; }\n      if (hasNext) best = Math.max(best, count);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findLHS(int[] nums) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int n : nums) freq.put(n, freq.getOrDefault(n, 0) + 1);\n    int best = 0;\n    for (int n : freq.keySet()) if (freq.containsKey(n + 1)) best = Math.max(best, freq.get(n) + freq.get(n + 1));\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findLHS(int[] nums) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int n : nums) freq.put(n, freq.getOrDefault(n, 0) + 1);\n    int best = 0;\n    for (int n : freq.keySet()) if (freq.containsKey(n + 1)) best = Math.max(best, freq.get(n) + freq.get(n + 1));\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findLHS(int[] nums) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    fill(nums, 0, freq);\n    return scan(new ArrayList<>(freq.keySet()), 0, freq, 0);\n  }\n  private void fill(int[] nums, int i, Map<Integer, Integer> freq) {\n    if (i == nums.length) return;\n    freq.put(nums[i], freq.getOrDefault(nums[i], 0) + 1);\n    fill(nums, i + 1, freq);\n  }\n  private int scan(List<Integer> keys, int i, Map<Integer, Integer> freq, int best) {\n    if (i == keys.size()) return best;\n    int n = keys.get(i);\n    if (freq.containsKey(n + 1)) best = Math.max(best, freq.get(n) + freq.get(n + 1));\n    return scan(keys, i + 1, freq, best);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findLHS(int[] nums) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int n : nums) freq.put(n, freq.getOrDefault(n, 0) + 1);\n    int best = 0;\n    for (int n : freq.keySet()) if (freq.containsKey(n + 1)) best = Math.max(best, freq.get(n) + freq.get(n + 1));\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Subarrays Divisible by K",
      "difficulty": "Medium",
      "subpattern": "Modulo prefix hashing",
      "question": "Given an integer array nums and an integer k, return the number of non-empty contiguous subarrays whose sum is divisible by k.",
      "trigger": "Two prefix sums with the same normalized remainder form a subarray sum divisible by k.",
      "intuition": "Count previous prefix remainders and add the number of matches for the current remainder.",
      "edgeCases": "Negative numbers, negative modulo normalization, k = 1, zero values, whole array valid, repeated remainders.",
      "constraints": "1 <= nums.length <= 3 * 10^4; -10^4 <= nums[i] <= 10^4; 2 <= k <= 10^4.",
      "source": {
        "label": "LeetCode 974 - Subarray Sums Divisible by K",
        "url": "https://leetcode.com/problems/subarray-sums-divisible-by-k/"
      },
      "examples": [
        {
          "input": "nums = [4,5,0,-2,-3,1], k = 5",
          "output": "7",
          "explanation": "There are 7 valid subarrays."
        },
        {
          "input": "nums = [5], k = 9",
          "output": "0",
          "explanation": "5 is not divisible by 9."
        },
        {
          "input": "nums = [-1,2,9], k = 2",
          "output": "2",
          "explanation": "Normalized remainders handle negative prefixes."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(k).",
      "recursiveComplexity": "Time O(n), Space O(k) plus O(n) call stack.",
      "bruteForceCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int count = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int sum = 0;\n      for (int j = i; j < nums.length; j++) {\n        sum += nums[j];\n        if (sum % k == 0) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n    int prefix = 0, count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n    int prefix = 0, count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n    return count(nums, k, 0, 0, freq);\n  }\n  private int count(int[] nums, int k, int i, int prefix, int[] freq) {\n    if (i == nums.length) return 0;\n    int next = ((prefix + nums[i]) % k + k) % k;\n    int matches = freq[next];\n    freq[next]++;\n    return matches + count(nums, k, i + 1, next, freq);\n  }\n}",
      "code": "class Solution {\n  public int subarraysDivByK(int[] nums, int k) {\n    int[] freq = new int[k];\n    freq[0] = 1;\n    int prefix = 0, count = 0;\n    for (int num : nums) {\n      prefix = ((prefix + num) % k + k) % k;\n      count += freq[prefix];\n      freq[prefix]++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Insert Delete GetRandom O(1)",
      "difficulty": "Medium",
      "subpattern": "Hash map + array index",
      "question": "Design a randomized set supporting insert, remove, and getRandom in average O(1) time.",
      "trigger": "O(1) delete needs index lookup, and O(1) random needs array access.",
      "intuition": "Use an ArrayList for random access and a map from value to index; remove by swapping with the last value.",
      "edgeCases": "Insert duplicate, remove missing value, remove last element, remove middle element, single element set, getRandom after updates.",
      "constraints": "-2^31 <= val <= 2^31 - 1; at most 2 * 10^5 calls; getRandom called only when non-empty.",
      "source": {
        "label": "LeetCode 380 - Insert Delete GetRandom O(1)",
        "url": "https://leetcode.com/problems/insert-delete-getrandom-o1/"
      },
      "examples": [
        {
          "input": "insert(1), remove(2), insert(2), getRandom(), remove(1), insert(2)",
          "output": "true, false, true, 1 or 2, true, false",
          "explanation": "Operations maintain the set while getRandom returns an existing value."
        },
        {
          "input": "insert(1), insert(1)",
          "output": "true, false",
          "explanation": "Duplicate insert returns false."
        },
        {
          "input": "insert(5), remove(5)",
          "output": "true, true",
          "explanation": "A single existing value can be removed."
        }
      ],
      "bruteForceComplexity": "insert O(n), remove O(n), getRandom O(1), Space O(n), using only a list.",
      "optimizedComplexity": "Average O(1) for insert, remove, getRandom; Space O(n).",
      "recursiveComplexity": "Recursive demo operations use O(n) time and O(n) stack for search; optimized production design is iterative.",
      "bruteForceCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final List<Integer> values = new ArrayList<>();\n  private final Random random = new Random();\n  public boolean insert(int val) { if (values.contains(val)) return false; values.add(val); return true; }\n  public boolean remove(int val) { return values.remove(Integer.valueOf(val)); }\n  public int getRandom() { return values.get(random.nextInt(values.size())); }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final Map<Integer, Integer> index = new HashMap<>();\n  private final List<Integer> values = new ArrayList<>();\n  private final Random random = new Random();\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size()); values.add(val); return true;\n  }\n  public boolean remove(int val) {\n    Integer i = index.get(val); if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last); index.put(last, i);\n    values.remove(values.size() - 1); index.remove(val); return true;\n  }\n  public int getRandom() { return values.get(random.nextInt(values.size())); }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RandomizedSet {\n  private final Map<Integer, Integer> index = new HashMap<>();\n  private final List<Integer> values = new ArrayList<>();\n  private final Random random = new Random();\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size()); values.add(val); return true;\n  }\n  public boolean remove(int val) {\n    Integer i = index.get(val); if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last); index.put(last, i);\n    values.remove(values.size() - 1); index.remove(val); return true;\n  }\n  public int getRandom() { return values.get(random.nextInt(values.size())); }\n}",
      "recursiveCode": "import java.util.*;\n\nclass RandomizedSetRecursiveDemo {\n  private final List<Integer> values = new ArrayList<>();\n  private final Random random = new Random();\n  public boolean insert(int val) { if (contains(val, 0)) return false; values.add(val); return true; }\n  public boolean remove(int val) { int i = find(val, 0); if (i == -1) return false; values.remove(i); return true; }\n  public int getRandom() { return values.get(random.nextInt(values.size())); }\n  private boolean contains(int val, int i) { return i < values.size() && (values.get(i) == val || contains(val, i + 1)); }\n  private int find(int val, int i) { if (i == values.size()) return -1; return values.get(i) == val ? i : find(val, i + 1); }\n}",
      "code": "import java.util.*;\n\nclass RandomizedSet {\n  private final Map<Integer, Integer> index = new HashMap<>();\n  private final List<Integer> values = new ArrayList<>();\n  private final Random random = new Random();\n  public boolean insert(int val) {\n    if (index.containsKey(val)) return false;\n    index.put(val, values.size()); values.add(val); return true;\n  }\n  public boolean remove(int val) {\n    Integer i = index.get(val); if (i == null) return false;\n    int last = values.get(values.size() - 1);\n    values.set(i, last); index.put(last, i);\n    values.remove(values.size() - 1); index.remove(val); return true;\n  }\n  public int getRandom() { return values.get(random.nextInt(values.size())); }\n}"
    },
    {
      "group": "practice",
      "name": "Isomorphic Strings",
      "difficulty": "Easy",
      "subpattern": "Bidirectional character mapping",
      "question": "Given two strings s and t, determine if they are isomorphic. Characters in s can be replaced to get t, preserving order and one-to-one mapping.",
      "trigger": "Each character must map consistently, and two different characters cannot map to the same target.",
      "intuition": "Track both directions of the mapping to enforce a bijection.",
      "edgeCases": "Repeated characters, conflicting mappings, same string, two chars mapping to same target, equal lengths.",
      "constraints": "1 <= s.length <= 5 * 10^4; t.length == s.length; s and t consist of valid ASCII characters.",
      "source": {
        "label": "LeetCode 205 - Isomorphic Strings",
        "url": "https://leetcode.com/problems/isomorphic-strings/"
      },
      "examples": [
        {
          "input": "s = \"egg\", t = \"add\"",
          "output": "true",
          "explanation": "e -> a and g -> d."
        },
        {
          "input": "s = \"foo\", t = \"bar\"",
          "output": "false",
          "explanation": "o cannot map to both a and r."
        },
        {
          "input": "s = \"paper\", t = \"title\"",
          "output": "true",
          "explanation": "The mapping is consistent."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1) for fixed ASCII arrays.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) arrays.",
      "bruteForceCode": "class Solution { public boolean isIsomorphic(String s, String t) { for (int i=0;i<s.length();i++) for (int j=0;j<s.length();j++) if ((s.charAt(i)==s.charAt(j))!=(t.charAt(i)==t.charAt(j))) return false; return true; } }",
      "iterativeCode": "class Solution { public boolean isIsomorphic(String s, String t) { int[] a=new int[256], b=new int[256]; for(int i=0;i<s.length();i++){ char x=s.charAt(i), y=t.charAt(i); if(a[x]!=b[y]) return false; a[x]=i+1; b[y]=i+1; } return true; } }",
      "optimizedCode": "class Solution { public boolean isIsomorphic(String s, String t) { int[] a=new int[256], b=new int[256]; for(int i=0;i<s.length();i++){ char x=s.charAt(i), y=t.charAt(i); if(a[x]!=b[y]) return false; a[x]=i+1; b[y]=i+1; } return true; } }",
      "recursiveCode": "class Solution { public boolean isIsomorphic(String s, String t) { return check(s,t,0,new int[256],new int[256]); } private boolean check(String s,String t,int i,int[] a,int[] b){ if(i==s.length()) return true; char x=s.charAt(i), y=t.charAt(i); if(a[x]!=b[y]) return false; a[x]=i+1; b[y]=i+1; return check(s,t,i+1,a,b); } }",
      "code": "class Solution { public boolean isIsomorphic(String s, String t) { int[] a=new int[256], b=new int[256]; for(int i=0;i<s.length();i++){ char x=s.charAt(i), y=t.charAt(i); if(a[x]!=b[y]) return false; a[x]=i+1; b[y]=i+1; } return true; } }"
    },
    {
      "group": "practice",
      "name": "Word Pattern",
      "difficulty": "Easy",
      "subpattern": "Bidirectional token mapping",
      "question": "Given a pattern and a string s, determine if s follows the same one-to-one word pattern.",
      "trigger": "Pattern characters and words must form a consistent bijection.",
      "intuition": "Split words, then track char-to-word and word-to-char mappings.",
      "edgeCases": "Different counts, repeated pattern char, repeated word with different char, single word, extra spaces not present by constraint.",
      "constraints": "1 <= pattern.length <= 300; pattern contains lowercase letters; s contains lowercase words separated by single spaces.",
      "source": {
        "label": "LeetCode 290 - Word Pattern",
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
          "explanation": "a maps to both dog and fish."
        },
        {
          "input": "pattern = \"aaaa\", s = \"dog cat cat dog\"",
          "output": "false",
          "explanation": "a cannot map to multiple words."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * w), Space O(n).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) plus O(n) call stack.",
      "bruteForceCode": "class Solution { public boolean wordPattern(String pattern, String s) { String[] w=s.split(\" \"); if(pattern.length()!=w.length) return false; for(int i=0;i<w.length;i++) for(int j=0;j<w.length;j++) if((pattern.charAt(i)==pattern.charAt(j))!=w[i].equals(w[j])) return false; return true; } }",
      "iterativeCode": "import java.util.*;\n\nclass Solution { public boolean wordPattern(String pattern, String s) { String[] w=s.split(\" \"); if(pattern.length()!=w.length) return false; Map<Character,String> cw=new HashMap<>(); Map<String,Character> wc=new HashMap<>(); for(int i=0;i<w.length;i++){ char c=pattern.charAt(i); if(cw.containsKey(c)&&!cw.get(c).equals(w[i])) return false; if(wc.containsKey(w[i])&&wc.get(w[i])!=c) return false; cw.put(c,w[i]); wc.put(w[i],c); } return true; } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution { public boolean wordPattern(String pattern, String s) { String[] w=s.split(\" \"); if(pattern.length()!=w.length) return false; Map<Character,String> cw=new HashMap<>(); Map<String,Character> wc=new HashMap<>(); for(int i=0;i<w.length;i++){ char c=pattern.charAt(i); if(cw.containsKey(c)&&!cw.get(c).equals(w[i])) return false; if(wc.containsKey(w[i])&&wc.get(w[i])!=c) return false; cw.put(c,w[i]); wc.put(w[i],c); } return true; } }",
      "recursiveCode": "import java.util.*;\n\nclass Solution { public boolean wordPattern(String pattern, String s) { String[] w=s.split(\" \"); if(pattern.length()!=w.length) return false; return check(pattern,w,0,new HashMap<>(),new HashMap<>()); } private boolean check(String p,String[] w,int i,Map<Character,String> cw,Map<String,Character> wc){ if(i==w.length) return true; char c=p.charAt(i); if(cw.containsKey(c)&&!cw.get(c).equals(w[i])) return false; if(wc.containsKey(w[i])&&wc.get(w[i])!=c) return false; cw.put(c,w[i]); wc.put(w[i],c); return check(p,w,i+1,cw,wc); } }",
      "code": "import java.util.*;\n\nclass Solution { public boolean wordPattern(String pattern, String s) { String[] w=s.split(\" \"); if(pattern.length()!=w.length) return false; Map<Character,String> cw=new HashMap<>(); Map<String,Character> wc=new HashMap<>(); for(int i=0;i<w.length;i++){ char c=pattern.charAt(i); if(cw.containsKey(c)&&!cw.get(c).equals(w[i])) return false; if(wc.containsKey(w[i])&&wc.get(w[i])!=c) return false; cw.put(c,w[i]); wc.put(w[i],c); } return true; } }"
    },
    {
      "group": "practice",
      "name": "Ransom Note",
      "difficulty": "Easy",
      "subpattern": "Frequency counting",
      "question": "Given strings ransomNote and magazine, return true if ransomNote can be constructed using letters from magazine. Each magazine letter can be used once.",
      "trigger": "Construction requires magazine counts to cover ransomNote counts.",
      "intuition": "Count magazine letters, then spend counts for ransomNote characters.",
      "edgeCases": "ransomNote longer than magazine, repeated letters, exact counts, missing character, lowercase-only input.",
      "constraints": "1 <= ransomNote.length, magazine.length <= 10^5; both strings consist of lowercase English letters.",
      "source": {
        "label": "LeetCode 383 - Ransom Note",
        "url": "https://leetcode.com/problems/ransom-note/"
      },
      "examples": [
        {
          "input": "ransomNote = \"a\", magazine = \"b\"",
          "output": "false",
          "explanation": "a is not available."
        },
        {
          "input": "ransomNote = \"aa\", magazine = \"ab\"",
          "output": "false",
          "explanation": "Only one a is available."
        },
        {
          "input": "ransomNote = \"aa\", magazine = \"aab\"",
          "output": "true",
          "explanation": "Two a characters are available."
        }
      ],
      "bruteForceComplexity": "Time O(r * m), Space O(m).",
      "optimizedComplexity": "Time O(r + m), Space O(1).",
      "recursiveComplexity": "Time O(r + m), Space O(r + m) call stack plus O(1) count array.",
      "bruteForceCode": "class Solution { public boolean canConstruct(String ransomNote, String magazine) { boolean[] used=new boolean[magazine.length()]; for(int i=0;i<ransomNote.length();i++){ boolean ok=false; for(int j=0;j<magazine.length();j++) if(!used[j]&&ransomNote.charAt(i)==magazine.charAt(j)){ used[j]=true; ok=true; break; } if(!ok) return false; } return true; } }",
      "iterativeCode": "class Solution { public boolean canConstruct(String ransomNote, String magazine) { int[] count=new int[26]; for(char c:magazine.toCharArray()) count[c-'a']++; for(char c:ransomNote.toCharArray()) if(--count[c-'a']<0) return false; return true; } }",
      "optimizedCode": "class Solution { public boolean canConstruct(String ransomNote, String magazine) { int[] count=new int[26]; for(char c:magazine.toCharArray()) count[c-'a']++; for(char c:ransomNote.toCharArray()) if(--count[c-'a']<0) return false; return true; } }",
      "recursiveCode": "class Solution { public boolean canConstruct(String ransomNote, String magazine) { int[] count=new int[26]; fill(magazine,0,count); return spend(ransomNote,0,count); } private void fill(String s,int i,int[] count){ if(i==s.length()) return; count[s.charAt(i)-'a']++; fill(s,i+1,count); } private boolean spend(String s,int i,int[] count){ if(i==s.length()) return true; if(--count[s.charAt(i)-'a']<0) return false; return spend(s,i+1,count); } }",
      "code": "class Solution { public boolean canConstruct(String ransomNote, String magazine) { int[] count=new int[26]; for(char c:magazine.toCharArray()) count[c-'a']++; for(char c:ransomNote.toCharArray()) if(--count[c-'a']<0) return false; return true; } }"
    },
    {
      "group": "practice",
      "name": "Happy Number",
      "difficulty": "Easy",
      "subpattern": "Hash set cycle detection",
      "question": "Determine if n is a happy number by repeatedly replacing it with the sum of squares of its digits until it reaches 1 or cycles.",
      "trigger": "Repeated transformation can enter a cycle, so previously seen states must be detected.",
      "intuition": "Use a set to detect cycles; reaching 1 means happy.",
      "edgeCases": "n = 1, single-digit unhappy numbers, large n, cycle detection, repeated intermediate values.",
      "constraints": "1 <= n <= 2^31 - 1.",
      "source": {
        "label": "LeetCode 202 - Happy Number",
        "url": "https://leetcode.com/problems/happy-number/"
      },
      "examples": [
        {
          "input": "n = 19",
          "output": "true",
          "explanation": "19 -> 82 -> 68 -> 100 -> 1."
        },
        {
          "input": "n = 2",
          "output": "false",
          "explanation": "The sequence cycles without reaching 1."
        },
        {
          "input": "n = 1",
          "output": "true",
          "explanation": "1 is already happy."
        }
      ],
      "bruteForceComplexity": "Time O(c * d), Space O(c).",
      "optimizedComplexity": "Time O(c * d), Space O(c), where c is cycle length and d is digit count.",
      "recursiveComplexity": "Time O(c * d), Space O(c) plus recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution { public boolean isHappy(int n) { Set<Integer> seen=new HashSet<>(); while(n!=1){ if(seen.contains(n)) return false; seen.add(n); n=next(n); } return true; } private int next(int n){ int sum=0; while(n>0){ int d=n%10; sum+=d*d; n/=10; } return sum; } }",
      "iterativeCode": "import java.util.*;\n\nclass Solution { public boolean isHappy(int n) { Set<Integer> seen=new HashSet<>(); while(n!=1&&seen.add(n)) n=next(n); return n==1; } private int next(int n){ int sum=0; while(n>0){ int d=n%10; sum+=d*d; n/=10; } return sum; } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution { public boolean isHappy(int n) { Set<Integer> seen=new HashSet<>(); while(n!=1&&seen.add(n)) n=next(n); return n==1; } private int next(int n){ int sum=0; while(n>0){ int d=n%10; sum+=d*d; n/=10; } return sum; } }",
      "recursiveCode": "import java.util.*;\n\nclass Solution { public boolean isHappy(int n) { return happy(n,new HashSet<>()); } private boolean happy(int n,Set<Integer> seen){ if(n==1) return true; if(!seen.add(n)) return false; return happy(next(n),seen); } private int next(int n){ if(n==0) return 0; int d=n%10; return d*d+next(n/10); } }",
      "code": "import java.util.*;\n\nclass Solution { public boolean isHappy(int n) { Set<Integer> seen=new HashSet<>(); while(n!=1&&seen.add(n)) n=next(n); return n==1; } private int next(int n){ int sum=0; while(n>0){ int d=n%10; sum+=d*d; n/=10; } return sum; } }"
    },
    {
      "group": "practice",
      "name": "Single Number",
      "difficulty": "Easy",
      "subpattern": "Frequency counting / XOR cancellation",
      "question": "Given a non-empty integer array nums where every element appears twice except one, return the single one.",
      "trigger": "Pairs cancel out, either by counting frequencies or by XOR.",
      "intuition": "XOR uses x ^ x = 0 and x ^ 0 = x, leaving the single value.",
      "edgeCases": "One element, negative values, unique value at beginning/end, all paired values exactly twice.",
      "constraints": "1 <= nums.length <= 3 * 10^4; -3 * 10^4 <= nums[i] <= 3 * 10^4; every element appears twice except one.",
      "source": {
        "label": "LeetCode 136 - Single Number",
        "url": "https://leetcode.com/problems/single-number/"
      },
      "examples": [
        {
          "input": "nums = [2,2,1]",
          "output": "1",
          "explanation": "2 cancels, leaving 1."
        },
        {
          "input": "nums = [4,1,2,1,2]",
          "output": "4",
          "explanation": "1 and 2 cancel, leaving 4."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The only number is single."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution { public int singleNumber(int[] nums) { for(int x:nums){ int c=0; for(int y:nums) if(x==y) c++; if(c==1) return x; } return -1; } }",
      "iterativeCode": "class Solution { public int singleNumber(int[] nums) { int ans=0; for(int n:nums) ans^=n; return ans; } }",
      "optimizedCode": "class Solution { public int singleNumber(int[] nums) { int ans=0; for(int n:nums) ans^=n; return ans; } }",
      "recursiveCode": "class Solution { public int singleNumber(int[] nums) { return xor(nums,0,0); } private int xor(int[] nums,int i,int ans){ if(i==nums.length) return ans; return xor(nums,i+1,ans^nums[i]); } }",
      "code": "class Solution { public int singleNumber(int[] nums) { int ans=0; for(int n:nums) ans^=n; return ans; } }"
    },
    {
      "group": "practice",
      "name": "Missing Number",
      "difficulty": "Easy",
      "subpattern": "Index/range accounting",
      "question": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing.",
      "trigger": "The values belong to a known complete range, so expected range state can be compared with actual values.",
      "intuition": "XOR all indexes and values; matched numbers cancel and the missing number remains.",
      "edgeCases": "Missing 0, missing n, length 1, sorted input, unsorted input, all values distinct.",
      "constraints": "n == nums.length; 1 <= n <= 10^4; 0 <= nums[i] <= n; all nums[i] are unique.",
      "source": {
        "label": "LeetCode 268 - Missing Number",
        "url": "https://leetcode.com/problems/missing-number/"
      },
      "examples": [
        {
          "input": "nums = [3,0,1]",
          "output": "2",
          "explanation": "2 is missing from range [0,3]."
        },
        {
          "input": "nums = [0,1]",
          "output": "2",
          "explanation": "n itself is missing."
        },
        {
          "input": "nums = [9,6,4,2,3,5,7,0,1]",
          "output": "8",
          "explanation": "8 is missing from range [0,9]."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution { public int missingNumber(int[] nums) { for(int c=0;c<=nums.length;c++){ boolean found=false; for(int n:nums) if(n==c){ found=true; break; } if(!found) return c; } return -1; } }",
      "iterativeCode": "class Solution { public int missingNumber(int[] nums) { int xor=nums.length; for(int i=0;i<nums.length;i++) xor^=i^nums[i]; return xor; } }",
      "optimizedCode": "class Solution { public int missingNumber(int[] nums) { int xor=nums.length; for(int i=0;i<nums.length;i++) xor^=i^nums[i]; return xor; } }",
      "recursiveCode": "class Solution { public int missingNumber(int[] nums) { return xor(nums,0,nums.length); } private int xor(int[] nums,int i,int ans){ if(i==nums.length) return ans; return xor(nums,i+1,ans^i^nums[i]); } }",
      "code": "class Solution { public int missingNumber(int[] nums) { int xor=nums.length; for(int i=0;i<nums.length;i++) xor^=i^nums[i]; return xor; } }"
    },
    {
      "group": "practice",
      "name": "Find the Difference",
      "difficulty": "Easy",
      "subpattern": "Frequency counting / XOR cancellation",
      "question": "Given two strings s and t where t is generated by shuffling s and adding one letter, return the added letter.",
      "trigger": "All original characters cancel, leaving exactly one extra character.",
      "intuition": "XOR every character from both strings to isolate the added character.",
      "edgeCases": "s is empty, added character duplicates an existing character, added character at any position, lowercase-only input.",
      "constraints": "0 <= s.length <= 1000; t.length == s.length + 1; s and t consist of lowercase English letters.",
      "source": {
        "label": "LeetCode 389 - Find the Difference",
        "url": "https://leetcode.com/problems/find-the-difference/"
      },
      "examples": [
        {
          "input": "s = \"abcd\", t = \"abcde\"",
          "output": "\"e\"",
          "explanation": "e is the added letter."
        },
        {
          "input": "s = \"\", t = \"y\"",
          "output": "\"y\"",
          "explanation": "The only character is added."
        },
        {
          "input": "s = \"a\", t = \"aa\"",
          "output": "\"a\"",
          "explanation": "The added letter duplicates an existing one."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(n).",
      "optimizedComplexity": "Time O(n), Space O(1).",
      "recursiveComplexity": "Time O(n), Space O(n) call stack.",
      "bruteForceCode": "class Solution { public char findTheDifference(String s, String t) { boolean[] used=new boolean[t.length()]; for(int i=0;i<s.length();i++) for(int j=0;j<t.length();j++) if(!used[j]&&s.charAt(i)==t.charAt(j)){ used[j]=true; break; } for(int j=0;j<t.length();j++) if(!used[j]) return t.charAt(j); return ' '; } }",
      "iterativeCode": "class Solution { public char findTheDifference(String s, String t) { int xor=0; for(char c:s.toCharArray()) xor^=c; for(char c:t.toCharArray()) xor^=c; return (char)xor; } }",
      "optimizedCode": "class Solution { public char findTheDifference(String s, String t) { int xor=0; for(char c:s.toCharArray()) xor^=c; for(char c:t.toCharArray()) xor^=c; return (char)xor; } }",
      "recursiveCode": "class Solution { public char findTheDifference(String s, String t) { return (char) go(s,t,0,0); } private int go(String s,String t,int i,int xor){ if(i<s.length()) xor^=s.charAt(i); if(i<t.length()) xor^=t.charAt(i); return i==t.length()-1 ? xor : go(s,t,i+1,xor); } }",
      "code": "class Solution { public char findTheDifference(String s, String t) { int xor=0; for(char c:s.toCharArray()) xor^=c; for(char c:t.toCharArray()) xor^=c; return (char)xor; } }"
    },
    {
      "group": "practice",
      "name": "Jewels and Stones",
      "difficulty": "Easy",
      "subpattern": "Hash set membership",
      "question": "Given strings jewels and stones, return how many stones are also jewels. Jewel characters are unique.",
      "trigger": "Each stone needs a fast membership check against the set of jewel types.",
      "intuition": "Store jewels in a set, then count stones that belong to the set.",
      "edgeCases": "No matching stones, all stones are jewels, uppercase/lowercase distinct, one jewel, repeated stones.",
      "constraints": "1 <= jewels.length, stones.length <= 50; jewels and stones consist of English letters; jewels characters are unique.",
      "source": {
        "label": "LeetCode 771 - Jewels and Stones",
        "url": "https://leetcode.com/problems/jewels-and-stones/"
      },
      "examples": [
        {
          "input": "jewels = \"aA\", stones = \"aAAbbbb\"",
          "output": "3",
          "explanation": "a and A are jewels; there are 3 matching stones."
        },
        {
          "input": "jewels = \"z\", stones = \"ZZ\"",
          "output": "0",
          "explanation": "Case matters."
        },
        {
          "input": "jewels = \"abc\", stones = \"cba\"",
          "output": "3",
          "explanation": "Every stone is a jewel."
        }
      ],
      "bruteForceComplexity": "Time O(j * s), Space O(1).",
      "optimizedComplexity": "Time O(j + s), Space O(j).",
      "recursiveComplexity": "Time O(j + s), Space O(j) plus O(j + s) call stack.",
      "bruteForceCode": "class Solution { public int numJewelsInStones(String jewels, String stones) { int count=0; for(char s:stones.toCharArray()) for(char j:jewels.toCharArray()) if(s==j){ count++; break; } return count; } }",
      "iterativeCode": "import java.util.*;\n\nclass Solution { public int numJewelsInStones(String jewels, String stones) { Set<Character> set=new HashSet<>(); for(char c:jewels.toCharArray()) set.add(c); int count=0; for(char c:stones.toCharArray()) if(set.contains(c)) count++; return count; } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution { public int numJewelsInStones(String jewels, String stones) { Set<Character> set=new HashSet<>(); for(char c:jewels.toCharArray()) set.add(c); int count=0; for(char c:stones.toCharArray()) if(set.contains(c)) count++; return count; } }",
      "recursiveCode": "import java.util.*;\n\nclass Solution { public int numJewelsInStones(String jewels, String stones) { Set<Character> set=new HashSet<>(); fill(jewels,0,set); return count(stones,0,set); } private void fill(String s,int i,Set<Character> set){ if(i==s.length()) return; set.add(s.charAt(i)); fill(s,i+1,set); } private int count(String s,int i,Set<Character> set){ if(i==s.length()) return 0; return (set.contains(s.charAt(i))?1:0)+count(s,i+1,set); } }",
      "code": "import java.util.*;\n\nclass Solution { public int numJewelsInStones(String jewels, String stones) { Set<Character> set=new HashSet<>(); for(char c:jewels.toCharArray()) set.add(c); int count=0; for(char c:stones.toCharArray()) if(set.contains(c)) count++; return count; } }"
    },
    {
      "group": "practice",
      "name": "Unique Number of Occurrences",
      "difficulty": "Easy",
      "subpattern": "Frequency count uniqueness",
      "question": "Given an integer array arr, return true if the number of occurrences of each value is unique.",
      "trigger": "You need counts per value, then uniqueness among those counts.",
      "intuition": "Count values, then insert each frequency into a set; duplicate frequency means false.",
      "edgeCases": "Single value, all counts unique, two values with same count, negative values, all elements same.",
      "constraints": "1 <= arr.length <= 1000; -1000 <= arr[i] <= 1000.",
      "source": {
        "label": "LeetCode 1207 - Unique Number of Occurrences",
        "url": "https://leetcode.com/problems/unique-number-of-occurrences/"
      },
      "examples": [
        {
          "input": "arr = [1,2,2,1,1,3]",
          "output": "true",
          "explanation": "Counts are 3, 2, and 1."
        },
        {
          "input": "arr = [1,2]",
          "output": "false",
          "explanation": "Both values occur once."
        },
        {
          "input": "arr = [-3,0,1,-3,1,1,1,-3,10,0]",
          "output": "true",
          "explanation": "All counts are unique."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(n).",
      "optimizedComplexity": "Time O(n), Space O(n).",
      "recursiveComplexity": "Time O(n), Space O(n) plus O(n) call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution { public boolean uniqueOccurrences(int[] arr) { List<Integer> counts=new ArrayList<>(); for(int i=0;i<arr.length;i++){ boolean seen=false; for(int j=0;j<i;j++) if(arr[j]==arr[i]) seen=true; if(seen) continue; int c=0; for(int v:arr) if(v==arr[i]) c++; if(counts.contains(c)) return false; counts.add(c); } return true; } }",
      "iterativeCode": "import java.util.*;\n\nclass Solution { public boolean uniqueOccurrences(int[] arr) { Map<Integer,Integer> freq=new HashMap<>(); for(int n:arr) freq.put(n,freq.getOrDefault(n,0)+1); Set<Integer> seen=new HashSet<>(); for(int c:freq.values()) if(!seen.add(c)) return false; return true; } }",
      "optimizedCode": "import java.util.*;\n\nclass Solution { public boolean uniqueOccurrences(int[] arr) { Map<Integer,Integer> freq=new HashMap<>(); for(int n:arr) freq.put(n,freq.getOrDefault(n,0)+1); Set<Integer> seen=new HashSet<>(); for(int c:freq.values()) if(!seen.add(c)) return false; return true; } }",
      "recursiveCode": "import java.util.*;\n\nclass Solution { public boolean uniqueOccurrences(int[] arr) { Map<Integer,Integer> freq=new HashMap<>(); fill(arr,0,freq); return check(new ArrayList<>(freq.values()),0,new HashSet<>()); } private void fill(int[] arr,int i,Map<Integer,Integer> freq){ if(i==arr.length) return; freq.put(arr[i],freq.getOrDefault(arr[i],0)+1); fill(arr,i+1,freq); } private boolean check(List<Integer> counts,int i,Set<Integer> seen){ if(i==counts.size()) return true; return seen.add(counts.get(i)) && check(counts,i+1,seen); } }",
      "code": "import java.util.*;\n\nclass Solution { public boolean uniqueOccurrences(int[] arr) { Map<Integer,Integer> freq=new HashMap<>(); for(int n:arr) freq.put(n,freq.getOrDefault(n,0)+1); Set<Integer> seen=new HashSet<>(); for(int c:freq.values()) if(!seen.add(c)) return false; return true; } }"
    },
    {
      "group": "practice",
      "name": "Number of Good Pairs",
      "difficulty": "Easy",
      "subpattern": "Frequency counting pair contribution",
      "question": "Given an integer array nums, return the number of good pairs. A pair (i, j) is good if nums[i] == nums[j] and i < j.",
      "trigger": "Each new occurrence forms one good pair with every previous occurrence of the same value.",
      "intuition": "Add the previous count of the current value, then increment the count.",
      "edgeCases": "No pairs, all same values, one element, repeated values in separate blocks, small value range.",
      "constraints": "1 <= nums.length <= 100; 1 <= nums[i] <= 100.",
      "source": {
        "label": "LeetCode 1512 - Number of Good Pairs",
        "url": "https://leetcode.com/problems/number-of-good-pairs/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,1,1,3]",
          "output": "4",
          "explanation": "Good pairs are (0,3), (0,4), (3,4), and (2,5)."
        },
        {
          "input": "nums = [1,1,1,1]",
          "output": "6",
          "explanation": "Four equal values form 4 choose 2 = 6 pairs."
        },
        {
          "input": "nums = [1,2,3]",
          "output": "0",
          "explanation": "No equal pair exists."
        }
      ],
      "bruteForceComplexity": "Time O(n^2), Space O(1).",
      "optimizedComplexity": "Time O(n), Space O(1) because values are limited to 1..100.",
      "recursiveComplexity": "Time O(n), Space O(n) call stack plus O(1) count array.",
      "bruteForceCode": "class Solution { public int numIdenticalPairs(int[] nums) { int pairs=0; for(int i=0;i<nums.length;i++) for(int j=i+1;j<nums.length;j++) if(nums[i]==nums[j]) pairs++; return pairs; } }",
      "iterativeCode": "class Solution { public int numIdenticalPairs(int[] nums) { int[] count=new int[101]; int pairs=0; for(int n:nums){ pairs+=count[n]; count[n]++; } return pairs; } }",
      "optimizedCode": "class Solution { public int numIdenticalPairs(int[] nums) { int[] count=new int[101]; int pairs=0; for(int n:nums){ pairs+=count[n]; count[n]++; } return pairs; } }",
      "recursiveCode": "class Solution { public int numIdenticalPairs(int[] nums) { return count(nums,0,new int[101]); } private int count(int[] nums,int i,int[] freq){ if(i==nums.length) return 0; int pairs=freq[nums[i]]; freq[nums[i]]++; return pairs+count(nums,i+1,freq); } }",
      "code": "class Solution { public int numIdenticalPairs(int[] nums) { int[] count=new int[101]; int pairs=0; for(int n:nums){ pairs+=count[n]; count[n]++; } return pairs; } }"
    }
  ],
  "checklist": [
    "Need fast membership, count, grouping, or index lookup.",
    "Order is irrelevant or can be represented by a key.",
    "A nested loop checks whether a value was seen before.",
    "Subarray sum can be represented by difference between two prefixes.",
    "Characters or values are limited enough for array counts."
  ],
  "traps": [
    "Forgetting to handle negative modulo.",
    "Using sorted strings as keys when character-count keys are cheaper.",
    "Overwriting first prefix index when max length needs earliest index.",
    "Returning duplicate groups or duplicate intersection values.",
    "Ignoring integer overflow in prefix sums."
  ],
  "edgeCases": [
    "Empty input and one-element input.",
    "All values identical.",
    "All values unique.",
    "Negative numbers in prefix sum problems.",
    "Unicode or uppercase input when count array assumes lowercase."
  ],
  "complexities": [
    "Hash membership/counting: O(n) time, O(n) space.",
    "Fixed alphabet counting: O(n) time, O(1) space.",
    "Prefix hash maps: O(n) time, O(n) space.",
    "Sorting-based grouping: O(n k log k), count-key grouping: O(n k)."
  ],
  "mentalModel": [
    "Turn the repeated question into a key lookup.",
    "Store facts about the past, not the whole past.",
    "For subarrays, compare current prefix with an earlier prefix.",
    "For groups, build a canonical signature.",
    "Use arrays instead of maps when the key range is small."
  ],
  "revisionStrategy": [
    "Day 1: Solve Two Sum, Contains Duplicate, Valid Anagram, Group Anagrams.",
    "Day 3: Solve Top K, Product Except Self, Subarray Sum Equals K.",
    "Day 7: Solve all advanced problems with a 30-minute cap each.",
    "Day 14: Mix core and practice problems without looking at pattern names.",
    "Day 30: Rebuild every map key from memory before coding."
  ],
  "unseen": [
    "Brick Wall",
    "Pairs of Songs With Total Durations Divisible by 60",
    "Longest Palindrome",
    "Find Players With Zero or One Losses",
    "Count Number of Bad Pairs"
  ]
};
