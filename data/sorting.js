const CURRENT_PATTERN = {
  "id": "sorting",
  "name": "Sorting",
  "summary": "Use ordering, partitioning, counting buckets, custom comparators, and merge-sort style counting to turn unordered data into scan-friendly structure.",
  "complete": true,
  "subpatterns": [
    "Dutch national flag partition",
    "Backward sorted merge",
    "Quickselect partition",
    "Frequency bucket extraction",
    "Concatenation comparator ordering",
    "Start-time interval ordering",
    "Sweep-line room counting",
    "Interval merge after sorting",
    "Greedy non-overlap by end time",
    "Citation counting sort",
    "Local wiggle ordering",
    "Median virtual-index partition",
    "Linked-list merge sort",
    "Linked-list insertion sort",
    "Relative counting order",
    "Character frequency bucket sort",
    "Bucket gap sorting",
    "Merge-sort smaller-count accumulation",
    "Merge-sort reverse-pair counting",
    "Height-descending reconstruction comparator",
    "Position-time ordering",
    "Multi-key vote comparator",
    "Endpoint greedy interval sorting",
    "Parity partition",
    "Two-pointer sorted square merge",
    "Pancake reversal sorting",
    "Ordered consecutive grouping",
    "Binary search on sorted closeness",
    "Greedy uniqueness after sorting",
    "Independent diagonal sorting"
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
      "constraints": "1 <= nums.length <= 300; nums[i] is 0, 1, or 2; mutate nums in-place.",
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
      "bruteForceCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int[] count = new int[3];\n    for (int value : nums) count[value]++;\n    int index = 0;\n    for (int color = 0; color < count.length; color++) {\n      while (count[color]-- > 0) nums[index++] = color;\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0;\n    int mid = 0;\n    int high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 2) swap(nums, mid, high--);\n      else mid++;\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "recursiveCode": "class Solution {\n  public void sortColors(int[] nums) {\n    partition(nums, 0, 0, nums.length - 1);\n  }\n\n  private void partition(int[] nums, int low, int mid, int high) {\n    if (mid > high) return;\n    if (nums[mid] == 0) {\n      swap(nums, low, mid);\n      partition(nums, low + 1, mid + 1, high);\n    } else if (nums[mid] == 2) {\n      swap(nums, mid, high);\n      partition(nums, low, mid, high - 1);\n    } else {\n      partition(nums, low, mid + 1, high);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0;\n    int mid = 0;\n    int high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 2) swap(nums, mid, high--);\n      else mid++;\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "code": "class Solution {\n  public void sortColors(int[] nums) {\n    int low = 0;\n    int mid = 0;\n    int high = nums.length - 1;\n    while (mid <= high) {\n      if (nums[mid] == 0) swap(nums, low++, mid++);\n      else if (nums[mid] == 2) swap(nums, mid, high--);\n      else mid++;\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge Sorted Array",
      "difficulty": "Easy",
      "subpattern": "Backward sorted merge",
      "question": "Given sorted arrays nums1 and nums2 where nums1 has enough trailing space, merge nums2 into nums1 as one sorted array.",
      "trigger": "Two arrays are already sorted and the destination has free space at the end.",
      "intuition": "Fill from the back so unread nums1 values are not overwritten.",
      "edgeCases": "m is 0, n is 0, duplicates, all nums2 values smaller, all nums2 values larger.",
      "constraints": "nums1.length == m + n; nums2.length == n; 0 <= m,n <= 200; mutate nums1.",
      "source": {
        "label": "Merge Sorted Array - LeetCode 88",
        "url": "https://leetcode.com/problems/merge-sorted-array/"
      },
      "examples": [
        {
          "input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
          "output": "[1,2,2,3,5,6]",
          "explanation": "The arrays merge into one sorted sequence."
        },
        {
          "input": "nums1 = [1], m = 1, nums2 = [], n = 0",
          "output": "[1]",
          "explanation": "No second array values need to be copied."
        },
        {
          "input": "nums1 = [0], m = 0, nums2 = [1], n = 1",
          "output": "[1]",
          "explanation": "The destination initially contains only buffer space."
        }
      ],
      "bruteForceComplexity": "Time O((m+n) log(m+n)); Space O(1). Copy nums2 into nums1 and sort.",
      "optimizedComplexity": "Time O(m+n); Space O(1). Merge from the back using three pointers.",
      "recursiveComplexity": "Time O(m+n); Space O(m+n) call stack. Recursively fills one position from the back.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    for (int i = 0; i < n; i++) nums1[m + i] = nums2[i];\n    Arrays.sort(nums1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1;\n    int j = n - 1;\n    int write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    fill(nums1, m - 1, nums2, n - 1, m + n - 1);\n  }\n\n  private void fill(int[] nums1, int i, int[] nums2, int j, int write) {\n    if (j < 0) return;\n    if (i >= 0 && nums1[i] > nums2[j]) {\n      nums1[write] = nums1[i];\n      fill(nums1, i - 1, nums2, j, write - 1);\n    } else {\n      nums1[write] = nums2[j];\n      fill(nums1, i, nums2, j - 1, write - 1);\n    }\n  }\n}",
      "optimizedCode": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1;\n    int j = n - 1;\n    int write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}",
      "code": "class Solution {\n  public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int i = m - 1;\n    int j = n - 1;\n    int write = m + n - 1;\n    while (j >= 0) {\n      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];\n      else nums1[write--] = nums2[j--];\n    }\n  }\n}"
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
      "constraints": "1 <= k <= nums.length <= 100000; -10000 <= nums[i] <= 10000.",
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
      "iterativeCode": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    int target = nums.length - k;\n    int left = 0;\n    int right = nums.length - 1;\n    while (left <= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot < target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return -1;\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i < right; i++) {\n      if (nums[i] <= pivotValue) swap(nums, store++, i);\n    }\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    return select(nums, 0, nums.length - 1, nums.length - k);\n  }\n\n  private int select(int[] nums, int left, int right, int target) {\n    int pivot = partition(nums, left, right);\n    if (pivot == target) return nums[pivot];\n    if (pivot < target) return select(nums, pivot + 1, right, target);\n    return select(nums, left, pivot - 1, target);\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i < right; i++) if (nums[i] <= pivotValue) swap(nums, store++, i);\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    int target = nums.length - k;\n    int left = 0;\n    int right = nums.length - 1;\n    while (left <= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot < target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return -1;\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i < right; i++) {\n      if (nums[i] <= pivotValue) swap(nums, store++, i);\n    }\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "code": "class Solution {\n  public int findKthLargest(int[] nums, int k) {\n    int target = nums.length - k;\n    int left = 0;\n    int right = nums.length - 1;\n    while (left <= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot < target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return -1;\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivotValue = nums[right];\n    int store = left;\n    for (int i = left; i < right; i++) {\n      if (nums[i] <= pivotValue) swap(nums, store++, i);\n    }\n    swap(nums, store, right);\n    return store;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Top K Frequent Elements",
      "difficulty": "Medium",
      "subpattern": "Frequency bucket extraction",
      "question": "Given an integer array nums and integer k, return any order of the k most frequent elements.",
      "trigger": "The output is ranked by frequency, not numeric value.",
      "intuition": "Count values, bucket values by frequency, then read buckets from high frequency down.",
      "edgeCases": "k equals number of unique values, one unique value, ties allowed in any order, negative numbers, repeated dominant value.",
      "constraints": "1 <= nums.length <= 100000; k is in range [1, number of unique values].",
      "source": {
        "label": "Top K Frequent Elements - LeetCode 347",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1,2,2,3], k = 2",
          "output": "[1,2]",
          "explanation": "1 appears three times and 2 appears twice."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "[1]",
          "explanation": "Only one unique value exists."
        },
        {
          "input": "nums = [4,4,6,6,7], k = 2",
          "output": "any two of [4,6]",
          "explanation": "4 and 6 tie for highest frequency."
        }
      ],
      "bruteForceComplexity": "Time O(u log u + n); Space O(u). Count and sort unique values by frequency.",
      "optimizedComplexity": "Time O(n + u); Space O(n + u). Frequency buckets avoid sorting unique values.",
      "recursiveComplexity": "Time O(n + u); Space O(n + u). Recursively scans buckets from highest frequency down.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int value : nums) frequency.put(value, frequency.getOrDefault(value, 0) + 1);\n    List<Integer> values = new ArrayList<>(frequency.keySet());\n    values.sort((a, b) -> Integer.compare(frequency.get(b), frequency.get(a)));\n    int[] answer = new int[k];\n    for (int i = 0; i < k; i++) answer[i] = values.get(i);\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int value : nums) frequency.put(value, frequency.getOrDefault(value, 0) + 1);\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    for (Map.Entry<Integer, Integer> entry : frequency.entrySet()) {\n      int count = entry.getValue();\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(entry.getKey());\n    }\n    int[] answer = new int[k];\n    int index = 0;\n    for (int count = buckets.length - 1; count >= 0 && index < k; count--) {\n      if (buckets[count] == null) continue;\n      for (int value : buckets[count]) {\n        answer[index++] = value;\n        if (index == k) break;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int value : nums) frequency.put(value, frequency.getOrDefault(value, 0) + 1);\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    for (int value : frequency.keySet()) {\n      int count = frequency.get(value);\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(value);\n    }\n    int[] answer = new int[k];\n    fill(buckets, buckets.length - 1, answer, new int[]{0});\n    return answer;\n  }\n\n  private void fill(List<Integer>[] buckets, int count, int[] answer, int[] index) {\n    if (count < 0 || index[0] == answer.length) return;\n    if (buckets[count] != null) {\n      for (int value : buckets[count]) {\n        if (index[0] == answer.length) return;\n        answer[index[0]++] = value;\n      }\n    }\n    fill(buckets, count - 1, answer, index);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int value : nums) frequency.put(value, frequency.getOrDefault(value, 0) + 1);\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    for (Map.Entry<Integer, Integer> entry : frequency.entrySet()) {\n      int count = entry.getValue();\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(entry.getKey());\n    }\n    int[] answer = new int[k];\n    int index = 0;\n    for (int count = buckets.length - 1; count >= 0 && index < k; count--) {\n      if (buckets[count] == null) continue;\n      for (int value : buckets[count]) {\n        answer[index++] = value;\n        if (index == k) break;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int value : nums) frequency.put(value, frequency.getOrDefault(value, 0) + 1);\n    List<Integer>[] buckets = new ArrayList[nums.length + 1];\n    for (Map.Entry<Integer, Integer> entry : frequency.entrySet()) {\n      int count = entry.getValue();\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(entry.getKey());\n    }\n    int[] answer = new int[k];\n    int index = 0;\n    for (int count = buckets.length - 1; count >= 0 && index < k; count--) {\n      if (buckets[count] == null) continue;\n      for (int value : buckets[count]) {\n        answer[index++] = value;\n        if (index == k) break;\n      }\n    }\n    return answer;\n  }\n}"
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
      "constraints": "1 <= nums.length <= 100; 0 <= nums[i] <= 1000000000.",
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
      "bruteForceCode": "class Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i < nums.length; i++) values[i] = String.valueOf(nums[i]);\n    for (int i = 0; i < values.length; i++) {\n      for (int j = 1; j < values.length - i; j++) {\n        if ((values[j] + values[j - 1]).compareTo(values[j - 1] + values[j]) > 0) {\n          String temp = values[j];\n          values[j] = values[j - 1];\n          values[j - 1] = temp;\n        }\n      }\n    }\n    return build(values);\n  }\n\n  private String build(String[] values) {\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i < nums.length; i++) values[i] = String.valueOf(nums[i]);\n    Arrays.sort(values, (a, b) -> (b + a).compareTo(a + b));\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i < nums.length; i++) values[i] = String.valueOf(nums[i]);\n    quickSort(values, 0, values.length - 1);\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n\n  private void quickSort(String[] values, int left, int right) {\n    if (left >= right) return;\n    int pivot = partition(values, left, right);\n    quickSort(values, left, pivot - 1);\n    quickSort(values, pivot + 1, right);\n  }\n\n  private int partition(String[] values, int left, int right) {\n    String pivot = values[right];\n    int store = left;\n    for (int i = left; i < right; i++) {\n      if ((values[i] + pivot).compareTo(pivot + values[i]) >= 0) swap(values, store++, i);\n    }\n    swap(values, store, right);\n    return store;\n  }\n\n  private void swap(String[] values, int i, int j) {\n    String temp = values[i];\n    values[i] = values[j];\n    values[j] = temp;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i < nums.length; i++) values[i] = String.valueOf(nums[i]);\n    Arrays.sort(values, (a, b) -> (b + a).compareTo(a + b));\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String largestNumber(int[] nums) {\n    String[] values = new String[nums.length];\n    for (int i = 0; i < nums.length; i++) values[i] = String.valueOf(nums[i]);\n    Arrays.sort(values, (a, b) -> (b + a).compareTo(a + b));\n    if (values[0].equals(\"0\")) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    for (String value : values) answer.append(value);\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Meeting Rooms",
      "difficulty": "Easy",
      "subpattern": "Start-time interval ordering",
      "question": "Given meeting time intervals, return true if one person can attend all meetings.",
      "trigger": "Meetings only conflict with the previous meeting after sorting by start time.",
      "intuition": "Sort starts ascending and check whether each start is before the previous end.",
      "edgeCases": "No meetings, one meeting, touching endpoints, nested intervals, unsorted input.",
      "constraints": "0 <= intervals.length <= 10000; intervals[i] = [start,end] and start < end.",
      "source": {
        "label": "Meeting Rooms - LeetCode 252",
        "url": "https://leetcode.com/problems/meeting-rooms/"
      },
      "examples": [
        {
          "input": "intervals = [[0,30],[5,10],[15,20]]",
          "output": "false",
          "explanation": "The meeting starting at 5 overlaps [0,30]."
        },
        {
          "input": "intervals = [[7,10],[2,4]]",
          "output": "true",
          "explanation": "After sorting, 4 <= 7 so there is no overlap."
        },
        {
          "input": "intervals = [[1,2],[2,3]]",
          "output": "true",
          "explanation": "Touching endpoints do not overlap."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Compare every pair for overlap.",
      "optimizedComplexity": "Time O(n log n); Space O(log n). Sort by start and scan adjacent intervals.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursively checks adjacent intervals after sorting.",
      "bruteForceCode": "class Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    for (int i = 0; i < intervals.length; i++) {\n      for (int j = i + 1; j < intervals.length; j++) {\n        if (intervals[i][0] < intervals[j][1] && intervals[j][0] < intervals[i][1]) return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i < intervals.length; i++) {\n      if (intervals[i][0] < intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    return check(intervals, 1);\n  }\n\n  private boolean check(int[][] intervals, int index) {\n    if (index == intervals.length) return true;\n    if (intervals[index][0] < intervals[index - 1][1]) return false;\n    return check(intervals, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i < intervals.length; i++) {\n      if (intervals[i][0] < intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i < intervals.length; i++) {\n      if (intervals[i][0] < intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Meeting Rooms II",
      "difficulty": "Medium",
      "subpattern": "Sweep-line room counting",
      "question": "Given meeting time intervals, return the minimum number of conference rooms required.",
      "trigger": "Starts and ends are events; sorting them separately reveals concurrent meetings.",
      "intuition": "Every start before the earliest end needs a new room; otherwise reuse a room.",
      "edgeCases": "No meetings, same start times, touching endpoints, fully nested meetings, all non-overlapping meetings.",
      "constraints": "0 <= intervals.length <= 10000; intervals[i] = [start,end] and start < end.",
      "source": {
        "label": "Meeting Rooms II - LeetCode 253",
        "url": "https://leetcode.com/problems/meeting-rooms-ii/"
      },
      "examples": [
        {
          "input": "intervals = [[0,30],[5,10],[15,20]]",
          "output": "2",
          "explanation": "At most two meetings overlap."
        },
        {
          "input": "intervals = [[7,10],[2,4]]",
          "output": "1",
          "explanation": "Meetings do not overlap."
        },
        {
          "input": "intervals = [[1,5],[2,6],[3,7]]",
          "output": "3",
          "explanation": "All three overlap around time 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Test each start time against every interval to count overlaps.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sort starts and ends, then sweep with two pointers.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive sweep advances start and end pointers.",
      "bruteForceCode": "class Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    int best = 0;\n    for (int[] point : intervals) {\n      int active = 0;\n      int time = point[0];\n      for (int[] interval : intervals) {\n        if (interval[0] <= time && time < interval[1]) active++;\n      }\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    int n = intervals.length;\n    int[] starts = new int[n];\n    int[] ends = new int[n];\n    for (int i = 0; i < n; i++) {\n      starts[i] = intervals[i][0];\n      ends[i] = intervals[i][1];\n    }\n    Arrays.sort(starts);\n    Arrays.sort(ends);\n    int rooms = 0;\n    int best = 0;\n    int end = 0;\n    for (int start = 0; start < n; start++) {\n      while (end < n && ends[end] <= starts[start]) {\n        rooms--;\n        end++;\n      }\n      rooms++;\n      best = Math.max(best, rooms);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    int n = intervals.length;\n    int[] starts = new int[n];\n    int[] ends = new int[n];\n    for (int i = 0; i < n; i++) {\n      starts[i] = intervals[i][0];\n      ends[i] = intervals[i][1];\n    }\n    Arrays.sort(starts);\n    Arrays.sort(ends);\n    return sweep(starts, ends, 0, 0, 0, 0);\n  }\n\n  private int sweep(int[] starts, int[] ends, int s, int e, int rooms, int best) {\n    if (s == starts.length) return best;\n    if (e < ends.length && ends[e] <= starts[s]) return sweep(starts, ends, s, e + 1, rooms - 1, best);\n    return sweep(starts, ends, s + 1, e, rooms + 1, Math.max(best, rooms + 1));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    int n = intervals.length;\n    int[] starts = new int[n];\n    int[] ends = new int[n];\n    for (int i = 0; i < n; i++) {\n      starts[i] = intervals[i][0];\n      ends[i] = intervals[i][1];\n    }\n    Arrays.sort(starts);\n    Arrays.sort(ends);\n    int rooms = 0;\n    int best = 0;\n    int end = 0;\n    for (int start = 0; start < n; start++) {\n      while (end < n && ends[end] <= starts[start]) {\n        rooms--;\n        end++;\n      }\n      rooms++;\n      best = Math.max(best, rooms);\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    int n = intervals.length;\n    int[] starts = new int[n];\n    int[] ends = new int[n];\n    for (int i = 0; i < n; i++) {\n      starts[i] = intervals[i][0];\n      ends[i] = intervals[i][1];\n    }\n    Arrays.sort(starts);\n    Arrays.sort(ends);\n    int rooms = 0;\n    int best = 0;\n    int end = 0;\n    for (int start = 0; start < n; start++) {\n      while (end < n && ends[end] <= starts[start]) {\n        rooms--;\n        end++;\n      }\n      rooms++;\n      best = Math.max(best, rooms);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge Intervals",
      "difficulty": "Medium",
      "subpattern": "Interval merge after sorting",
      "question": "Given intervals, merge all overlapping intervals and return the non-overlapping result.",
      "trigger": "Overlaps become adjacent after sorting intervals by start time.",
      "intuition": "Keep the last merged interval; extend its end when the next interval overlaps.",
      "edgeCases": "Empty input, one interval, touching endpoints, nested intervals, disjoint intervals.",
      "constraints": "1 <= intervals.length <= 10000; intervals[i].length == 2; 0 <= start <= end <= 10000.",
      "source": {
        "label": "Merge Intervals - LeetCode 56",
        "url": "https://leetcode.com/problems/merge-intervals/"
      },
      "examples": [
        {
          "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          "output": "[[1,6],[8,10],[15,18]]",
          "explanation": "[1,3] overlaps [2,6]."
        },
        {
          "input": "intervals = [[1,4],[4,5]]",
          "output": "[[1,5]]",
          "explanation": "Touching intervals merge."
        },
        {
          "input": "intervals = [[1,4],[0,0]]",
          "output": "[[0,0],[1,4]]",
          "explanation": "Sorting places disjoint intervals in output order."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly merge any overlapping pair until stable.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sort by start and scan once.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursively consumes sorted intervals into the merged list.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    List<int[]> list = new ArrayList<>();\n    for (int[] interval : intervals) list.add(new int[]{interval[0], interval[1]});\n    boolean changed = true;\n    while (changed) {\n      changed = false;\n      outer:\n      for (int i = 0; i < list.size(); i++) {\n        for (int j = i + 1; j < list.size(); j++) {\n          int[] a = list.get(i), b = list.get(j);\n          if (a[0] <= b[1] && b[0] <= a[1]) {\n            a[0] = Math.min(a[0], b[0]);\n            a[1] = Math.max(a[1], b[1]);\n            list.remove(j);\n            changed = true;\n            break outer;\n          }\n        }\n      }\n    }\n    list.sort((a, b) -> Integer.compare(a[0], b[0]));\n    return list.toArray(new int[list.size()][]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(new int[]{interval[0], interval[1]});\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    consume(intervals, 0, merged);\n    return merged.toArray(new int[merged.size()][]);\n  }\n\n  private void consume(int[][] intervals, int index, List<int[]> merged) {\n    if (index == intervals.length) return;\n    int[] interval = intervals[index];\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n      merged.add(new int[]{interval[0], interval[1]});\n    } else {\n      int[] last = merged.get(merged.size() - 1);\n      last[1] = Math.max(last[1], interval[1]);\n    }\n    consume(intervals, index + 1, merged);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(new int[]{interval[0], interval[1]});\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(new int[]{interval[0], interval[1]});\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Non-overlapping Intervals",
      "difficulty": "Medium",
      "subpattern": "Greedy non-overlap by end time",
      "question": "Given intervals, return the minimum number of intervals to remove so the rest are non-overlapping.",
      "trigger": "Keeping intervals with the earliest end leaves maximum space for future intervals.",
      "intuition": "Sort by end time and count intervals whose start is before the last kept end.",
      "edgeCases": "Touching endpoints, all overlapping, none overlapping, duplicate intervals, negative endpoints.",
      "constraints": "1 <= intervals.length <= 100000; intervals[i].length == 2; start < end.",
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
      "bruteForceComplexity": "Time O(2^n * n); Space O(n). Try keep/remove choices and maximize kept non-overlapping intervals.",
      "optimizedComplexity": "Time O(n log n); Space O(log n). Sort by end and greedily keep compatible intervals.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive greedy scan counts removals after sorting by end.",
      "bruteForceCode": "class Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    return intervals.length - best(intervals, 0, Integer.MIN_VALUE);\n  }\n\n  private int best(int[][] intervals, int index, int lastEnd) {\n    if (index == intervals.length) return 0;\n    int skip = best(intervals, index + 1, lastEnd);\n    int take = 0;\n    if (intervals[index][0] >= lastEnd) take = 1 + best(intervals, index + 1, intervals[index][1]);\n    return Math.max(skip, take);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removals = 0;\n    int lastEnd = Integer.MIN_VALUE;\n    for (int[] interval : intervals) {\n      if (interval[0] >= lastEnd) lastEnd = interval[1];\n      else removals++;\n    }\n    return removals;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    return count(intervals, 0, Integer.MIN_VALUE, 0);\n  }\n\n  private int count(int[][] intervals, int index, int lastEnd, int removed) {\n    if (index == intervals.length) return removed;\n    if (intervals[index][0] >= lastEnd) return count(intervals, index + 1, intervals[index][1], removed);\n    return count(intervals, index + 1, lastEnd, removed + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removals = 0;\n    int lastEnd = Integer.MIN_VALUE;\n    for (int[] interval : intervals) {\n      if (interval[0] >= lastEnd) lastEnd = interval[1];\n      else removals++;\n    }\n    return removals;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removals = 0;\n    int lastEnd = Integer.MIN_VALUE;\n    for (int[] interval : intervals) {\n      if (interval[0] >= lastEnd) lastEnd = interval[1];\n      else removals++;\n    }\n    return removals;\n  }\n}"
    },
    {
      "group": "core",
      "name": "H-Index",
      "difficulty": "Medium",
      "subpattern": "Citation counting sort",
      "question": "Given citations where citations[i] is citations for a paper, return the researcher h-index.",
      "trigger": "The answer is bounded by n, so citations above n can be bucketed together.",
      "intuition": "Count how many papers have each citation cap, then scan h from n downward until papers >= h.",
      "edgeCases": "All zero citations, one paper, citations much larger than n, exact threshold, duplicate citation counts.",
      "constraints": "1 <= citations.length <= 5000; 0 <= citations[i] <= 1000.",
      "source": {
        "label": "H-Index - LeetCode 274",
        "url": "https://leetcode.com/problems/h-index/"
      },
      "examples": [
        {
          "input": "citations = [3,0,6,1,5]",
          "output": "3",
          "explanation": "Three papers have at least three citations."
        },
        {
          "input": "citations = [1,3,1]",
          "output": "1",
          "explanation": "Only one paper has at least one citation after thresholding."
        },
        {
          "input": "citations = [0,0]",
          "output": "0",
          "explanation": "No paper has at least one citation."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Test every h and count qualifying papers.",
      "optimizedComplexity": "Time O(n); Space O(n). Bucket citation counts capped at n.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively tests h values and counts papers.",
      "bruteForceCode": "class Solution {\n  public int hIndex(int[] citations) {\n    for (int h = citations.length; h >= 0; h--) {\n      int count = 0;\n      for (int citation : citations) if (citation >= h) count++;\n      if (count >= h) return h;\n    }\n    return 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int hIndex(int[] citations) {\n    int n = citations.length;\n    int[] buckets = new int[n + 1];\n    for (int citation : citations) buckets[Math.min(citation, n)]++;\n    int papers = 0;\n    for (int h = n; h >= 0; h--) {\n      papers += buckets[h];\n      if (papers >= h) return h;\n    }\n    return 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int hIndex(int[] citations) {\n    return test(citations, citations.length);\n  }\n\n  private int test(int[] citations, int h) {\n    if (h == 0) return 0;\n    if (countAtLeast(citations, h, 0) >= h) return h;\n    return test(citations, h - 1);\n  }\n\n  private int countAtLeast(int[] citations, int h, int index) {\n    if (index == citations.length) return 0;\n    return (citations[index] >= h ? 1 : 0) + countAtLeast(citations, h, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int hIndex(int[] citations) {\n    int n = citations.length;\n    int[] buckets = new int[n + 1];\n    for (int citation : citations) buckets[Math.min(citation, n)]++;\n    int papers = 0;\n    for (int h = n; h >= 0; h--) {\n      papers += buckets[h];\n      if (papers >= h) return h;\n    }\n    return 0;\n  }\n}",
      "code": "class Solution {\n  public int hIndex(int[] citations) {\n    int n = citations.length;\n    int[] buckets = new int[n + 1];\n    for (int citation : citations) buckets[Math.min(citation, n)]++;\n    int papers = 0;\n    for (int h = n; h >= 0; h--) {\n      papers += buckets[h];\n      if (papers >= h) return h;\n    }\n    return 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Wiggle Sort",
      "difficulty": "Medium",
      "subpattern": "Local wiggle ordering",
      "question": "Given an unsorted array nums, reorder it in-place so nums[0] <= nums[1] >= nums[2] <= nums[3] and so on.",
      "trigger": "Only local adjacent inequalities matter, not global sorted order.",
      "intuition": "At each index, swap only when the current adjacent pair violates the required <= or >= relation.",
      "edgeCases": "Empty array, one element, duplicate values, already wiggle ordered, strictly sorted or reverse sorted input.",
      "constraints": "1 <= nums.length <= 50000; values fit in 32-bit signed integer; any valid wiggle order is accepted.",
      "source": {
        "label": "Wiggle Sort - LeetCode 280",
        "url": "https://leetcode.com/problems/wiggle-sort/"
      },
      "examples": [
        {
          "input": "nums = [3,5,2,1,6,4]",
          "output": "a valid wiggle order such as [3,5,1,6,2,4]",
          "explanation": "Every odd index is at least its neighbors."
        },
        {
          "input": "nums = [1,2,3,4]",
          "output": "[1,3,2,4] or another valid order",
          "explanation": "Only adjacent wiggle inequalities must hold."
        },
        {
          "input": "nums = [2,2,2]",
          "output": "[2,2,2]",
          "explanation": "Equal values satisfy non-strict inequalities."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(log n). Sort then swap every adjacent pair starting at index 1.",
      "optimizedComplexity": "Time O(n); Space O(1). One pass fixes each local violation by swapping adjacent values.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively enforces one adjacent relation per call.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public void wiggleSort(int[] nums) {\n    Arrays.sort(nums);\n    for (int i = 1; i + 1 < nums.length; i += 2) swap(nums, i, i + 1);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "iterativeCode": "class Solution {\n  public void wiggleSort(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n      boolean shouldRise = i % 2 == 1;\n      if (shouldRise && nums[i] < nums[i - 1]) swap(nums, i, i - 1);\n      if (!shouldRise && nums[i] > nums[i - 1]) swap(nums, i, i - 1);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "recursiveCode": "class Solution {\n  public void wiggleSort(int[] nums) {\n    fix(nums, 1);\n  }\n\n  private void fix(int[] nums, int index) {\n    if (index == nums.length) return;\n    if ((index % 2 == 1 && nums[index] < nums[index - 1]) ||\n        (index % 2 == 0 && nums[index] > nums[index - 1])) {\n      swap(nums, index, index - 1);\n    }\n    fix(nums, index + 1);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void wiggleSort(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n      boolean shouldRise = i % 2 == 1;\n      if (shouldRise && nums[i] < nums[i - 1]) swap(nums, i, i - 1);\n      if (!shouldRise && nums[i] > nums[i - 1]) swap(nums, i, i - 1);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "code": "class Solution {\n  public void wiggleSort(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n      boolean shouldRise = i % 2 == 1;\n      if (shouldRise && nums[i] < nums[i - 1]) swap(nums, i, i - 1);\n      if (!shouldRise && nums[i] > nums[i - 1]) swap(nums, i, i - 1);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Wiggle Sort II",
      "difficulty": "Medium",
      "subpattern": "Median virtual-index partition",
      "question": "Given nums, reorder it in-place so nums[0] < nums[1] > nums[2] < nums[3] and so on.",
      "trigger": "Strict wiggle order with duplicates needs values around the median placed into virtual odd/even positions.",
      "intuition": "Put larger-than-median values at odd virtual indices and smaller values at even virtual indices.",
      "edgeCases": "Many duplicates, odd length, even length, all values almost equal, already wiggle shaped input.",
      "constraints": "1 <= nums.length <= 50000; a valid answer is guaranteed for the input.",
      "source": {
        "label": "Wiggle Sort II - LeetCode 324",
        "url": "https://leetcode.com/problems/wiggle-sort-ii/"
      },
      "examples": [
        {
          "input": "nums = [1,5,1,1,6,4]",
          "output": "a valid result such as [1,6,1,5,1,4]",
          "explanation": "Odd indices are local peaks."
        },
        {
          "input": "nums = [1,3,2,2,3,1]",
          "output": "a valid result such as [2,3,1,3,1,2]",
          "explanation": "Duplicates are separated around peaks."
        },
        {
          "input": "nums = [1,1,2,2,3,3]",
          "output": "any strict wiggle order",
          "explanation": "The median split prevents equal neighbors where possible."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Sort a copy and fill small half and large half from the back.",
      "optimizedComplexity": "Average Time O(n), worst O(n^2); Space O(1). Quickselect median, then virtual-index 3-way partition.",
      "recursiveComplexity": "Time O(n log n); Space O(n + call stack). Recursively fills positions from sorted halves.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public void wiggleSort(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int small = (nums.length - 1) / 2;\n    int large = nums.length - 1;\n    for (int i = 0; i < nums.length; i++) {\n      nums[i] = (i % 2 == 0) ? sorted[small--] : sorted[large--];\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public void wiggleSort(int[] nums) {\n    int median = select(nums.clone(), nums.length / 2);\n    int left = 0;\n    int index = 0;\n    int right = nums.length - 1;\n    while (index <= right) {\n      int mapped = map(index, nums.length);\n      if (nums[mapped] > median) {\n        swap(nums, map(left++, nums.length), mapped);\n        index++;\n      } else if (nums[mapped] < median) {\n        swap(nums, mapped, map(right--, nums.length));\n      } else {\n        index++;\n      }\n    }\n  }\n\n  private int select(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot < target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return nums[target];\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivot = nums[right];\n    int store = left;\n    for (int i = left; i < right; i++) if (nums[i] <= pivot) swap(nums, store++, i);\n    swap(nums, store, right);\n    return store;\n  }\n\n  private int map(int index, int n) {\n    return (1 + 2 * index) % (n | 1);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public void wiggleSort(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    fill(nums, sorted, 0, (nums.length - 1) / 2, nums.length - 1);\n  }\n\n  private void fill(int[] nums, int[] sorted, int index, int small, int large) {\n    if (index == nums.length) return;\n    if (index % 2 == 0) {\n      nums[index] = sorted[small];\n      fill(nums, sorted, index + 1, small - 1, large);\n    } else {\n      nums[index] = sorted[large];\n      fill(nums, sorted, index + 1, small, large - 1);\n    }\n  }\n}",
      "optimizedCode": "class Solution {\n  public void wiggleSort(int[] nums) {\n    int median = select(nums.clone(), nums.length / 2);\n    int left = 0;\n    int index = 0;\n    int right = nums.length - 1;\n    while (index <= right) {\n      int mapped = map(index, nums.length);\n      if (nums[mapped] > median) {\n        swap(nums, map(left++, nums.length), mapped);\n        index++;\n      } else if (nums[mapped] < median) {\n        swap(nums, mapped, map(right--, nums.length));\n      } else {\n        index++;\n      }\n    }\n  }\n\n  private int select(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot < target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return nums[target];\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivot = nums[right];\n    int store = left;\n    for (int i = left; i < right; i++) if (nums[i] <= pivot) swap(nums, store++, i);\n    swap(nums, store, right);\n    return store;\n  }\n\n  private int map(int index, int n) {\n    return (1 + 2 * index) % (n | 1);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "code": "class Solution {\n  public void wiggleSort(int[] nums) {\n    int median = select(nums.clone(), nums.length / 2);\n    int left = 0;\n    int index = 0;\n    int right = nums.length - 1;\n    while (index <= right) {\n      int mapped = map(index, nums.length);\n      if (nums[mapped] > median) {\n        swap(nums, map(left++, nums.length), mapped);\n        index++;\n      } else if (nums[mapped] < median) {\n        swap(nums, mapped, map(right--, nums.length));\n      } else {\n        index++;\n      }\n    }\n  }\n\n  private int select(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n      int pivot = partition(nums, left, right);\n      if (pivot == target) return nums[pivot];\n      if (pivot < target) left = pivot + 1;\n      else right = pivot - 1;\n    }\n    return nums[target];\n  }\n\n  private int partition(int[] nums, int left, int right) {\n    int pivot = nums[right];\n    int store = left;\n    for (int i = left; i < right; i++) if (nums[i] <= pivot) swap(nums, store++, i);\n    swap(nums, store, right);\n    return store;\n  }\n\n  private int map(int index, int n) {\n    return (1 + 2 * index) % (n | 1);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}"
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
      "constraints": "0 <= number of nodes <= 50000; -100000 <= Node.val <= 100000.",
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
      "bruteForceCode": "import java.util.*;\n\nclass ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    Collections.sort(values);\n    int index = 0;\n    for (ListNode node = head; node != null; node = node.next) node.val = values.get(index++);\n    return head;\n  }\n}",
      "iterativeCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n    ListNode dummy = new ListNode(0, head);\n    for (int size = 1; size < length; size *= 2) {\n      ListNode current = dummy.next;\n      ListNode tail = dummy;\n      while (current != null) {\n        ListNode left = current;\n        ListNode right = split(left, size);\n        current = split(right, size);\n        tail = merge(left, right, tail);\n      }\n    }\n    return dummy.next;\n  }\n\n  private ListNode split(ListNode head, int size) {\n    for (int i = 1; head != null && i < size; i++) head = head.next;\n    if (head == null) return null;\n    ListNode second = head.next;\n    head.next = null;\n    return second;\n  }\n\n  private ListNode merge(ListNode a, ListNode b, ListNode tail) {\n    while (a != null && b != null) {\n      if (a.val <= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n    tail.next = (a != null) ? a : b;\n    while (tail.next != null) tail = tail.next;\n    return tail;\n  }\n}",
      "recursiveCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    if (head == null || head.next == null) return head;\n    ListNode slow = head;\n    ListNode fast = head.next;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    ListNode right = slow.next;\n    slow.next = null;\n    return merge(sortList(head), sortList(right));\n  }\n\n  private ListNode merge(ListNode a, ListNode b) {\n    if (a == null) return b;\n    if (b == null) return a;\n    if (a.val <= b.val) {\n      a.next = merge(a.next, b);\n      return a;\n    }\n    b.next = merge(a, b.next);\n    return b;\n  }\n}",
      "optimizedCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n    ListNode dummy = new ListNode(0, head);\n    for (int size = 1; size < length; size *= 2) {\n      ListNode current = dummy.next;\n      ListNode tail = dummy;\n      while (current != null) {\n        ListNode left = current;\n        ListNode right = split(left, size);\n        current = split(right, size);\n        tail = merge(left, right, tail);\n      }\n    }\n    return dummy.next;\n  }\n\n  private ListNode split(ListNode head, int size) {\n    for (int i = 1; head != null && i < size; i++) head = head.next;\n    if (head == null) return null;\n    ListNode second = head.next;\n    head.next = null;\n    return second;\n  }\n\n  private ListNode merge(ListNode a, ListNode b, ListNode tail) {\n    while (a != null && b != null) {\n      if (a.val <= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n    tail.next = (a != null) ? a : b;\n    while (tail.next != null) tail = tail.next;\n    return tail;\n  }\n}",
      "code": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n    ListNode dummy = new ListNode(0, head);\n    for (int size = 1; size < length; size *= 2) {\n      ListNode current = dummy.next;\n      ListNode tail = dummy;\n      while (current != null) {\n        ListNode left = current;\n        ListNode right = split(left, size);\n        current = split(right, size);\n        tail = merge(left, right, tail);\n      }\n    }\n    return dummy.next;\n  }\n\n  private ListNode split(ListNode head, int size) {\n    for (int i = 1; head != null && i < size; i++) head = head.next;\n    if (head == null) return null;\n    ListNode second = head.next;\n    head.next = null;\n    return second;\n  }\n\n  private ListNode merge(ListNode a, ListNode b, ListNode tail) {\n    while (a != null && b != null) {\n      if (a.val <= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n    tail.next = (a != null) ? a : b;\n    while (tail.next != null) tail = tail.next;\n    return tail;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Insertion Sort List",
      "difficulty": "Medium",
      "subpattern": "Linked-list insertion sort",
      "question": "Given the head of a linked list, sort it using insertion sort and return the sorted head.",
      "trigger": "Nodes are processed one at a time and inserted into the correct place in a growing sorted prefix.",
      "intuition": "Maintain a dummy-headed sorted list and splice each original node into its sorted position.",
      "edgeCases": "Empty list, one node, already sorted list, reverse sorted list, duplicate values.",
      "constraints": "0 <= number of nodes <= 5000; -5000 <= Node.val <= 5000.",
      "source": {
        "label": "Insertion Sort List - LeetCode 147",
        "url": "https://leetcode.com/problems/insertion-sort-list/"
      },
      "examples": [
        {
          "input": "head = [4,2,1,3]",
          "output": "[1,2,3,4]",
          "explanation": "Each node is inserted into the sorted prefix."
        },
        {
          "input": "head = [-1,5,3,4,0]",
          "output": "[-1,0,3,4,5]",
          "explanation": "Nodes are re-linked in ascending order."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "A single node is already sorted."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Copy values, sort, and rewrite node values.",
      "optimizedComplexity": "Time O(n^2); Space O(1). Insert each node into a sorted linked prefix.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively sorts the tail and inserts the head.",
      "bruteForceCode": "import java.util.*;\n\nclass ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode insertionSortList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    Collections.sort(values);\n    int index = 0;\n    for (ListNode node = head; node != null; node = node.next) node.val = values.get(index++);\n    return head;\n  }\n}",
      "iterativeCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode insertionSortList(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    ListNode current = head;\n    while (current != null) {\n      ListNode next = current.next;\n      ListNode prev = dummy;\n      while (prev.next != null && prev.next.val < current.val) prev = prev.next;\n      current.next = prev.next;\n      prev.next = current;\n      current = next;\n    }\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode insertionSortList(ListNode head) {\n    if (head == null || head.next == null) return head;\n    ListNode rest = insertionSortList(head.next);\n    head.next = null;\n    return insert(rest, head);\n  }\n\n  private ListNode insert(ListNode sorted, ListNode node) {\n    if (sorted == null || node.val <= sorted.val) {\n      node.next = sorted;\n      return node;\n    }\n    sorted.next = insert(sorted.next, node);\n    return sorted;\n  }\n}",
      "optimizedCode": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode insertionSortList(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    ListNode current = head;\n    while (current != null) {\n      ListNode next = current.next;\n      ListNode prev = dummy;\n      while (prev.next != null && prev.next.val < current.val) prev = prev.next;\n      current.next = prev.next;\n      prev.next = current;\n      current = next;\n    }\n    return dummy.next;\n  }\n}",
      "code": "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode insertionSortList(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    ListNode current = head;\n    while (current != null) {\n      ListNode next = current.next;\n      ListNode prev = dummy;\n      while (prev.next != null && prev.next.val < current.val) prev = prev.next;\n      current.next = prev.next;\n      prev.next = current;\n      current = next;\n    }\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Relative Sort Array",
      "difficulty": "Easy",
      "subpattern": "Relative counting order",
      "question": "Given arr1 and arr2 where arr2 has distinct values appearing in arr1, sort arr1 so values in arr2 appear first in arr2 order and remaining values appear ascending.",
      "trigger": "The desired order is defined by a reference array plus natural order for leftovers.",
      "intuition": "Count arr1 values, emit arr2 values in reference order, then emit remaining values ascending.",
      "edgeCases": "All values in arr2, no values in arr2, repeated values, missing reference values, smallest and largest allowed values.",
      "constraints": "1 <= arr1.length, arr2.length <= 1000; 0 <= arr1[i], arr2[i] <= 1000; arr2 values are distinct.",
      "source": {
        "label": "Relative Sort Array - LeetCode 1122",
        "url": "https://leetcode.com/problems/relative-sort-array/"
      },
      "examples": [
        {
          "input": "arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]",
          "output": "[2,2,2,1,4,3,3,9,6,7,19]",
          "explanation": "Reference values come first in arr2 order."
        },
        {
          "input": "arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]",
          "output": "[22,28,8,6,17,44]",
          "explanation": "Leftovers 17 and 44 are ascending."
        },
        {
          "input": "arr1 = [1,1,2], arr2 = [1]",
          "output": "[1,1,2]",
          "explanation": "Repeated reference values are emitted together."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n + m). Sort boxed values with a rank map comparator.",
      "optimizedComplexity": "Time O(n + range); Space O(range). Count values in the bounded domain and emit in required order.",
      "recursiveComplexity": "Time O(n + range); Space O(range + m). Recursive writers emit reference and leftover buckets.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] relativeSortArray(int[] arr1, int[] arr2) {\n    Map<Integer, Integer> rank = new HashMap<>();\n    for (int i = 0; i < arr2.length; i++) rank.put(arr2[i], i);\n    Integer[] boxed = new Integer[arr1.length];\n    for (int i = 0; i < arr1.length; i++) boxed[i] = arr1[i];\n    Arrays.sort(boxed, (a, b) -> {\n      int ra = rank.getOrDefault(a, 1001 + a);\n      int rb = rank.getOrDefault(b, 1001 + b);\n      return Integer.compare(ra, rb);\n    });\n    for (int i = 0; i < arr1.length; i++) arr1[i] = boxed[i];\n    return arr1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] relativeSortArray(int[] arr1, int[] arr2) {\n    int[] count = new int[1001];\n    for (int value : arr1) count[value]++;\n    int index = 0;\n    for (int value : arr2) {\n      while (count[value]-- > 0) arr1[index++] = value;\n    }\n    for (int value = 0; value < count.length; value++) {\n      while (count[value]-- > 0) arr1[index++] = value;\n    }\n    return arr1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] relativeSortArray(int[] arr1, int[] arr2) {\n    int[] count = new int[1001];\n    for (int value : arr1) count[value]++;\n    fillReference(arr1, arr2, count, 0, new int[]{0});\n    fillRest(arr1, count, 0, new int[]{arr1.length - remaining(count)});\n    return arr1;\n  }\n\n  private void fillReference(int[] arr1, int[] arr2, int[] count, int ref, int[] index) {\n    if (ref == arr2.length) return;\n    int value = arr2[ref];\n    while (count[value]-- > 0) arr1[index[0]++] = value;\n    fillReference(arr1, arr2, count, ref + 1, index);\n  }\n\n  private void fillRest(int[] arr1, int[] count, int value, int[] index) {\n    if (value == count.length) return;\n    while (count[value]-- > 0) arr1[index[0]++] = value;\n    fillRest(arr1, count, value + 1, index);\n  }\n\n  private int remaining(int[] count) {\n    int total = 0;\n    for (int value : count) total += Math.max(value, 0);\n    return total;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] relativeSortArray(int[] arr1, int[] arr2) {\n    int[] count = new int[1001];\n    for (int value : arr1) count[value]++;\n    int index = 0;\n    for (int value : arr2) {\n      while (count[value]-- > 0) arr1[index++] = value;\n    }\n    for (int value = 0; value < count.length; value++) {\n      while (count[value]-- > 0) arr1[index++] = value;\n    }\n    return arr1;\n  }\n}",
      "code": "class Solution {\n  public int[] relativeSortArray(int[] arr1, int[] arr2) {\n    int[] count = new int[1001];\n    for (int value : arr1) count[value]++;\n    int index = 0;\n    for (int value : arr2) {\n      while (count[value]-- > 0) arr1[index++] = value;\n    }\n    for (int value = 0; value < count.length; value++) {\n      while (count[value]-- > 0) arr1[index++] = value;\n    }\n    return arr1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sort Characters By Frequency",
      "difficulty": "Medium",
      "subpattern": "Character frequency bucket sort",
      "question": "Given a string s, sort its characters in decreasing frequency and return the resulting string.",
      "trigger": "Characters are ranked by occurrence count instead of alphabetic order.",
      "intuition": "Count characters, bucket them by frequency, then append buckets from high to low.",
      "edgeCases": "Single character, all same character, ties in frequency, uppercase/lowercase distinct, digits or symbols.",
      "constraints": "1 <= s.length <= 500000; s contains uppercase/lowercase English letters and digits.",
      "source": {
        "label": "Sort Characters By Frequency - LeetCode 451",
        "url": "https://leetcode.com/problems/sort-characters-by-frequency/"
      },
      "examples": [
        {
          "input": "s = \"tree\"",
          "output": "\"eert\" or \"eetr\"",
          "explanation": "e appears twice and comes first."
        },
        {
          "input": "s = \"cccaaa\"",
          "output": "\"cccaaa\" or \"aaaccc\"",
          "explanation": "c and a tie, so either order is valid."
        },
        {
          "input": "s = \"Aabb\"",
          "output": "\"bbAa\" or \"bbaA\"",
          "explanation": "Uppercase and lowercase are different characters."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Sort Character objects by frequency.",
      "optimizedComplexity": "Time O(n + u); Space O(n + u). Bucket characters by frequency.",
      "recursiveComplexity": "Time O(n + u); Space O(n + u). Recursively emits buckets from high to low.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> frequency = new HashMap<>();\n    for (char ch : s.toCharArray()) frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);\n    Character[] chars = new Character[s.length()];\n    for (int i = 0; i < s.length(); i++) chars[i] = s.charAt(i);\n    Arrays.sort(chars, (a, b) -> Integer.compare(frequency.get(b), frequency.get(a)));\n    StringBuilder answer = new StringBuilder();\n    for (char ch : chars) answer.append(ch);\n    return answer.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> frequency = new HashMap<>();\n    for (char ch : s.toCharArray()) frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);\n    List<Character>[] buckets = new ArrayList[s.length() + 1];\n    for (char ch : frequency.keySet()) {\n      int count = frequency.get(ch);\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(ch);\n    }\n    StringBuilder answer = new StringBuilder();\n    for (int count = buckets.length - 1; count >= 0; count--) {\n      if (buckets[count] == null) continue;\n      for (char ch : buckets[count]) {\n        for (int i = 0; i < count; i++) answer.append(ch);\n      }\n    }\n    return answer.toString();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> frequency = new HashMap<>();\n    for (char ch : s.toCharArray()) frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);\n    List<Character>[] buckets = new ArrayList[s.length() + 1];\n    for (char ch : frequency.keySet()) {\n      int count = frequency.get(ch);\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(ch);\n    }\n    StringBuilder answer = new StringBuilder();\n    appendBuckets(buckets, buckets.length - 1, answer);\n    return answer.toString();\n  }\n\n  private void appendBuckets(List<Character>[] buckets, int count, StringBuilder answer) {\n    if (count == 0) return;\n    if (buckets[count] != null) {\n      for (char ch : buckets[count]) for (int i = 0; i < count; i++) answer.append(ch);\n    }\n    appendBuckets(buckets, count - 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> frequency = new HashMap<>();\n    for (char ch : s.toCharArray()) frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);\n    List<Character>[] buckets = new ArrayList[s.length() + 1];\n    for (char ch : frequency.keySet()) {\n      int count = frequency.get(ch);\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(ch);\n    }\n    StringBuilder answer = new StringBuilder();\n    for (int count = buckets.length - 1; count >= 0; count--) {\n      if (buckets[count] == null) continue;\n      for (char ch : buckets[count]) {\n        for (int i = 0; i < count; i++) answer.append(ch);\n      }\n    }\n    return answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> frequency = new HashMap<>();\n    for (char ch : s.toCharArray()) frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);\n    List<Character>[] buckets = new ArrayList[s.length() + 1];\n    for (char ch : frequency.keySet()) {\n      int count = frequency.get(ch);\n      if (buckets[count] == null) buckets[count] = new ArrayList<>();\n      buckets[count].add(ch);\n    }\n    StringBuilder answer = new StringBuilder();\n    for (int count = buckets.length - 1; count >= 0; count--) {\n      if (buckets[count] == null) continue;\n      for (char ch : buckets[count]) {\n        for (int i = 0; i < count; i++) answer.append(ch);\n      }\n    }\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Gap",
      "difficulty": "Hard",
      "subpattern": "Bucket gap sorting",
      "question": "Given an integer array nums, return the maximum difference between two successive elements in sorted order.",
      "trigger": "Only adjacent sorted gaps matter, and pigeonhole buckets can avoid full sorting.",
      "intuition": "The max gap must appear between bucket maximum and next non-empty bucket minimum.",
      "edgeCases": "Fewer than two numbers, all equal values, negative values, large range, sparse buckets.",
      "constraints": "1 <= nums.length <= 100000; 0 <= nums[i] <= 1000000000; target linear time and space.",
      "source": {
        "label": "Maximum Gap - LeetCode 164",
        "url": "https://leetcode.com/problems/maximum-gap/"
      },
      "examples": [
        {
          "input": "nums = [3,6,9,1]",
          "output": "3",
          "explanation": "Sorted order is [1,3,6,9], max gap is 3."
        },
        {
          "input": "nums = [10]",
          "output": "0",
          "explanation": "No adjacent pair exists."
        },
        {
          "input": "nums = [1,10000000]",
          "output": "9999999",
          "explanation": "The only sorted gap is the answer."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(log n). Sort and scan adjacent differences.",
      "optimizedComplexity": "Time O(n); Space O(n). Use min/max buckets sized by pigeonhole lower bound.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive merge sort then scans adjacent gaps.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    if (nums.length < 2) return 0;\n    Arrays.sort(nums);\n    int best = 0;\n    for (int i = 1; i < nums.length; i++) best = Math.max(best, nums[i] - nums[i - 1]);\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    if (nums.length < 2) return 0;\n    int min = nums[0], max = nums[0];\n    for (int value : nums) {\n      min = Math.min(min, value);\n      max = Math.max(max, value);\n    }\n    if (min == max) return 0;\n    int bucketSize = Math.max(1, (max - min) / (nums.length - 1));\n    int bucketCount = (max - min) / bucketSize + 1;\n    int[] bucketMin = new int[bucketCount];\n    int[] bucketMax = new int[bucketCount];\n    Arrays.fill(bucketMin, Integer.MAX_VALUE);\n    Arrays.fill(bucketMax, Integer.MIN_VALUE);\n    for (int value : nums) {\n      int bucket = (value - min) / bucketSize;\n      bucketMin[bucket] = Math.min(bucketMin[bucket], value);\n      bucketMax[bucket] = Math.max(bucketMax[bucket], value);\n    }\n    int best = 0;\n    int previous = min;\n    for (int i = 0; i < bucketCount; i++) {\n      if (bucketMin[i] == Integer.MAX_VALUE) continue;\n      best = Math.max(best, bucketMin[i] - previous);\n      previous = bucketMax[i];\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maximumGap(int[] nums) {\n    if (nums.length < 2) return 0;\n    int[] buffer = new int[nums.length];\n    sort(nums, buffer, 0, nums.length - 1);\n    return gap(nums, 1, 0);\n  }\n\n  private void sort(int[] nums, int[] buffer, int left, int right) {\n    if (left >= right) return;\n    int mid = left + (right - left) / 2;\n    sort(nums, buffer, left, mid);\n    sort(nums, buffer, mid + 1, right);\n    merge(nums, buffer, left, mid, right);\n  }\n\n  private void merge(int[] nums, int[] buffer, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left;\n    while (i <= mid && j <= right) buffer[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];\n    while (i <= mid) buffer[k++] = nums[i++];\n    while (j <= right) buffer[k++] = nums[j++];\n    for (int p = left; p <= right; p++) nums[p] = buffer[p];\n  }\n\n  private int gap(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    return gap(nums, index + 1, Math.max(best, nums[index] - nums[index - 1]));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    if (nums.length < 2) return 0;\n    int min = nums[0], max = nums[0];\n    for (int value : nums) {\n      min = Math.min(min, value);\n      max = Math.max(max, value);\n    }\n    if (min == max) return 0;\n    int bucketSize = Math.max(1, (max - min) / (nums.length - 1));\n    int bucketCount = (max - min) / bucketSize + 1;\n    int[] bucketMin = new int[bucketCount];\n    int[] bucketMax = new int[bucketCount];\n    Arrays.fill(bucketMin, Integer.MAX_VALUE);\n    Arrays.fill(bucketMax, Integer.MIN_VALUE);\n    for (int value : nums) {\n      int bucket = (value - min) / bucketSize;\n      bucketMin[bucket] = Math.min(bucketMin[bucket], value);\n      bucketMax[bucket] = Math.max(bucketMax[bucket], value);\n    }\n    int best = 0;\n    int previous = min;\n    for (int i = 0; i < bucketCount; i++) {\n      if (bucketMin[i] == Integer.MAX_VALUE) continue;\n      best = Math.max(best, bucketMin[i] - previous);\n      previous = bucketMax[i];\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumGap(int[] nums) {\n    if (nums.length < 2) return 0;\n    int min = nums[0], max = nums[0];\n    for (int value : nums) {\n      min = Math.min(min, value);\n      max = Math.max(max, value);\n    }\n    if (min == max) return 0;\n    int bucketSize = Math.max(1, (max - min) / (nums.length - 1));\n    int bucketCount = (max - min) / bucketSize + 1;\n    int[] bucketMin = new int[bucketCount];\n    int[] bucketMax = new int[bucketCount];\n    Arrays.fill(bucketMin, Integer.MAX_VALUE);\n    Arrays.fill(bucketMax, Integer.MIN_VALUE);\n    for (int value : nums) {\n      int bucket = (value - min) / bucketSize;\n      bucketMin[bucket] = Math.min(bucketMin[bucket], value);\n      bucketMax[bucket] = Math.max(bucketMax[bucket], value);\n    }\n    int best = 0;\n    int previous = min;\n    for (int i = 0; i < bucketCount; i++) {\n      if (bucketMin[i] == Integer.MAX_VALUE) continue;\n      best = Math.max(best, bucketMin[i] - previous);\n      previous = bucketMax[i];\n    }\n    return best;\n  }\n}"
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
      "constraints": "1 <= nums.length <= 100000; -10000 <= nums[i] <= 10000.",
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
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    Integer[] answer = new Integer[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n      int count = 0;\n      for (int j = i + 1; j < nums.length; j++) if (nums[j] < nums[i]) count++;\n      answer[i] = count;\n    }\n    return Arrays.asList(answer);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map<Integer, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i >= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      update(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int n = nums.length;\n    int[] indexes = new int[n];\n    int[] temp = new int[n];\n    int[] counts = new int[n];\n    for (int i = 0; i < n; i++) indexes[i] = i;\n    sort(nums, indexes, temp, counts, 0, n - 1);\n    List<Integer> answer = new ArrayList<>();\n    for (int count : counts) answer.add(count);\n    return answer;\n  }\n\n  private void sort(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int right) {\n    if (left >= right) return;\n    int mid = left + (right - left) / 2;\n    sort(nums, indexes, temp, counts, left, mid);\n    sort(nums, indexes, temp, counts, mid + 1, right);\n    merge(nums, indexes, temp, counts, left, mid, right);\n  }\n\n  private void merge(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left, smaller = 0;\n    while (i <= mid && j <= right) {\n      if (nums[indexes[j]] < nums[indexes[i]]) {\n        temp[k++] = indexes[j++];\n        smaller++;\n      } else {\n        counts[indexes[i]] += smaller;\n        temp[k++] = indexes[i++];\n      }\n    }\n    while (i <= mid) {\n      counts[indexes[i]] += smaller;\n      temp[k++] = indexes[i++];\n    }\n    while (j <= right) temp[k++] = indexes[j++];\n    for (int p = left; p <= right; p++) indexes[p] = temp[p];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map<Integer, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i >= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      update(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map<Integer, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i >= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      update(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Reverse Pairs",
      "difficulty": "Hard",
      "subpattern": "Merge-sort reverse-pair counting",
      "question": "Given nums, return the number of reverse pairs where i < j and nums[i] > 2 * nums[j].",
      "trigger": "Pair counting depends on relative order and value threshold, which can be counted while sorting halves.",
      "intuition": "For each left value, advance a right pointer while right values satisfy the double inequality.",
      "edgeCases": "Negative numbers, duplicates, integer overflow in 2 * nums[j], sorted ascending, sorted descending.",
      "constraints": "1 <= nums.length <= 50000; -2^31 <= nums[i] <= 2^31 - 1.",
      "source": {
        "label": "Reverse Pairs - LeetCode 493",
        "url": "https://leetcode.com/problems/reverse-pairs/"
      },
      "examples": [
        {
          "input": "nums = [1,3,2,3,1]",
          "output": "2",
          "explanation": "The reverse pairs are formed by values 3 with later 1s."
        },
        {
          "input": "nums = [2,4,3,5,1]",
          "output": "3",
          "explanation": "Three pairs satisfy nums[i] > 2*nums[j]."
        },
        {
          "input": "nums = [-5,-5]",
          "output": "1",
          "explanation": "-5 > 2*(-5) is true for the first value before the second."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Check every ordered pair with long arithmetic.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree with compressed values counts prior values greater than 2*x.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort counts valid cross pairs before merging.",
      "bruteForceCode": "class Solution {\n  public int reversePairs(int[] nums) {\n    int count = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        if ((long) nums[i] > 2L * nums[j]) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet<Long> values = new TreeSet<>();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map<Long, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int lessOrEqualDouble = query(tree, rank.get(2L * nums[i]));\n      pairs += i - lessOrEqualDouble;\n      update(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int reversePairs(int[] nums) {\n    return sort(nums, new int[nums.length], 0, nums.length - 1);\n  }\n\n  private int sort(int[] nums, int[] temp, int left, int right) {\n    if (left >= right) return 0;\n    int mid = left + (right - left) / 2;\n    int count = sort(nums, temp, left, mid) + sort(nums, temp, mid + 1, right);\n    int j = mid + 1;\n    for (int i = left; i <= mid; i++) {\n      while (j <= right && (long) nums[i] > 2L * nums[j]) j++;\n      count += j - (mid + 1);\n    }\n    merge(nums, temp, left, mid, right);\n    return count;\n  }\n\n  private void merge(int[] nums, int[] temp, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left;\n    while (i <= mid && j <= right) temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];\n    while (i <= mid) temp[k++] = nums[i++];\n    while (j <= right) temp[k++] = nums[j++];\n    for (int p = left; p <= right; p++) nums[p] = temp[p];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet<Long> values = new TreeSet<>();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map<Long, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int lessOrEqualDouble = query(tree, rank.get(2L * nums[i]));\n      pairs += i - lessOrEqualDouble;\n      update(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet<Long> values = new TreeSet<>();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map<Long, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int lessOrEqualDouble = query(tree, rank.get(2L * nums[i]));\n      pairs += i - lessOrEqualDouble;\n      update(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void update(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Queue Reconstruction by Height",
      "difficulty": "Medium",
      "subpattern": "Height-descending reconstruction comparator",
      "question": "Given people as [height, k], reconstruct the queue where k is the number of people in front with height at least height.",
      "trigger": "Taller people must be placed first because shorter people do not affect their k counts.",
      "intuition": "Sort by height descending and k ascending, then insert each person at index k.",
      "edgeCases": "Same heights, k equals 0, k equals current list size, already reconstructed input, many short people.",
      "constraints": "1 <= people.length <= 2000; 0 <= height <= 1000000; 0 <= k < people.length.",
      "source": {
        "label": "Queue Reconstruction by Height - LeetCode 406",
        "url": "https://leetcode.com/problems/queue-reconstruction-by-height/"
      },
      "examples": [
        {
          "input": "people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
          "output": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
          "explanation": "Each person has exactly k taller-or-equal people before them."
        },
        {
          "input": "people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]",
          "output": "[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]",
          "explanation": "Taller-first insertion satisfies all counts."
        },
        {
          "input": "people = [[7,0]]",
          "output": "[[7,0]]",
          "explanation": "A single person is already valid."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n^2); Space O(n). Backtrack permutations until one satisfies all k counts.",
      "optimizedComplexity": "Time O(n^2 + n log n); Space O(n). Sort by height descending/k ascending and insert at k.",
      "recursiveComplexity": "Time O(n^2 + n log n); Space O(n). Recursively inserts sorted people into the queue.",
      "bruteForceCode": "class Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    boolean[] used = new boolean[people.length];\n    int[][] queue = new int[people.length][2];\n    backtrack(people, used, queue, 0);\n    return queue;\n  }\n\n  private boolean backtrack(int[][] people, boolean[] used, int[][] queue, int index) {\n    if (index == people.length) return valid(queue);\n    for (int i = 0; i < people.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      queue[index] = people[i];\n      if (backtrack(people, used, queue, index + 1)) return true;\n      used[i] = false;\n    }\n    return false;\n  }\n\n  private boolean valid(int[][] queue) {\n    for (int i = 0; i < queue.length; i++) {\n      int count = 0;\n      for (int j = 0; j < i; j++) if (queue[j][0] >= queue[i][0]) count++;\n      if (count != queue[i][1]) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n    for (int[] person : people) queue.add(person[1], person);\n    return queue.toArray(new int[queue.size()][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n    insert(people, 0, queue);\n    return queue.toArray(new int[queue.size()][]);\n  }\n\n  private void insert(int[][] people, int index, List<int[]> queue) {\n    if (index == people.length) return;\n    queue.add(people[index][1], people[index]);\n    insert(people, index + 1, queue);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n    for (int[] person : people) queue.add(person[1], person);\n    return queue.toArray(new int[queue.size()][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n    for (int[] person : people) queue.add(person[1], person);\n    return queue.toArray(new int[queue.size()][]);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Car Fleet",
      "difficulty": "Medium",
      "subpattern": "Position-time ordering",
      "question": "Given target, position, and speed for cars moving toward the target, return how many car fleets arrive.",
      "trigger": "Cars only interact with cars ahead, so sorting by position reveals fleet merges.",
      "intuition": "Scan cars from closest to target backward; a car forms a new fleet only if its arrival time is greater than the fleet ahead.",
      "edgeCases": "One car, same arrival time, car behind catches car ahead, already ordered positions, large target.",
      "constraints": "1 <= n <= 100000; 0 < target <= 1000000; positions are unique; speed[i] > 0.",
      "source": {
        "label": "Car Fleet - LeetCode 853",
        "url": "https://leetcode.com/problems/car-fleet/"
      },
      "examples": [
        {
          "input": "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
          "output": "3",
          "explanation": "Cars merge into three arrival groups."
        },
        {
          "input": "target = 10, position = [3], speed = [3]",
          "output": "1",
          "explanation": "One car is one fleet."
        },
        {
          "input": "target = 100, position = [0,2,4], speed = [4,2,1]",
          "output": "1",
          "explanation": "Behind cars catch the slow fleet ahead."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Sort cars by position and keep explicit arrival times.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sort by position and scan from nearest car to farthest.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursively scans sorted cars from right to left.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    double[][] cars = new double[position.length][2];\n    for (int i = 0; i < position.length; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = (double) (target - position[i]) / speed[i];\n    }\n    Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));\n    int fleets = 0;\n    double slowest = -1.0;\n    for (double[] car : cars) {\n      if (car[1] > slowest) {\n        fleets++;\n        slowest = car[1];\n      }\n    }\n    return fleets;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int n = position.length;\n    int[][] cars = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n    Arrays.sort(cars, (a, b) -> Integer.compare(a[0], b[0]));\n    int fleets = 0;\n    double fleetTime = 0.0;\n    for (int i = n - 1; i >= 0; i--) {\n      double time = (double) (target - cars[i][0]) / cars[i][1];\n      if (time > fleetTime) {\n        fleets++;\n        fleetTime = time;\n      }\n    }\n    return fleets;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int[][] cars = new int[position.length][2];\n    for (int i = 0; i < position.length; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n    Arrays.sort(cars, (a, b) -> Integer.compare(a[0], b[0]));\n    return scan(cars, target, cars.length - 1, 0.0, 0);\n  }\n\n  private int scan(int[][] cars, int target, int index, double fleetTime, int fleets) {\n    if (index < 0) return fleets;\n    double time = (double) (target - cars[index][0]) / cars[index][1];\n    if (time > fleetTime) return scan(cars, target, index - 1, time, fleets + 1);\n    return scan(cars, target, index - 1, fleetTime, fleets);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int n = position.length;\n    int[][] cars = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n    Arrays.sort(cars, (a, b) -> Integer.compare(a[0], b[0]));\n    int fleets = 0;\n    double fleetTime = 0.0;\n    for (int i = n - 1; i >= 0; i--) {\n      double time = (double) (target - cars[i][0]) / cars[i][1];\n      if (time > fleetTime) {\n        fleets++;\n        fleetTime = time;\n      }\n    }\n    return fleets;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int n = position.length;\n    int[][] cars = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n    Arrays.sort(cars, (a, b) -> Integer.compare(a[0], b[0]));\n    int fleets = 0;\n    double fleetTime = 0.0;\n    for (int i = n - 1; i >= 0; i--) {\n      double time = (double) (target - cars[i][0]) / cars[i][1];\n      if (time > fleetTime) {\n        fleets++;\n        fleetTime = time;\n      }\n    }\n    return fleets;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Rank Teams by Votes",
      "difficulty": "Medium",
      "subpattern": "Multi-key vote comparator",
      "question": "Given votes where each string ranks all teams, return the teams ordered by vote counts at each rank, breaking ties alphabetically.",
      "trigger": "Ordering depends on multiple rank-count keys plus a final alphabetical tie-breaker.",
      "intuition": "Count how many times each team appears at every rank, then sort teams by rank counts from first to last.",
      "edgeCases": "One vote, one team, complete ties, alphabetical tie-breaker, many teams with same prefix counts.",
      "constraints": "1 <= votes.length <= 1000; 1 <= votes[i].length <= 26; votes are permutations of the same uppercase teams.",
      "source": {
        "label": "Rank Teams by Votes - LeetCode 1366",
        "url": "https://leetcode.com/problems/rank-teams-by-votes/"
      },
      "examples": [
        {
          "input": "votes = [\"ABC\",\"ACB\",\"ABC\",\"ACB\",\"ACB\"]",
          "output": "\"ACB\"",
          "explanation": "A wins first place, C beats B at second place."
        },
        {
          "input": "votes = [\"WXYZ\",\"XYZW\"]",
          "output": "\"XWYZ\"",
          "explanation": "Rank counts are compared position by position."
        },
        {
          "input": "votes = [\"ZMNAGUEDSJYLBOPHRQICWFXTVK\"]",
          "output": "same string",
          "explanation": "A single vote defines the ranking."
        }
      ],
      "bruteForceComplexity": "Time O(26 log 26 * ranks); Space O(26*ranks). Count ranks and sort Character objects.",
      "optimizedComplexity": "Time O(26 log 26 * ranks + votes*ranks); Space O(26*ranks). Sort team indexes by count vectors.",
      "recursiveComplexity": "Average Time O(26 log 26 * ranks); Space O(26*ranks + stack). Recursive quicksort applies the vote comparator.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String rankTeams(String[] votes) {\n    int ranks = votes[0].length();\n    int[][] count = new int[26][ranks];\n    for (String vote : votes) for (int i = 0; i < ranks; i++) count[vote.charAt(i) - 'A'][i]++;\n    List<Character> teams = new ArrayList<>();\n    for (char ch : votes[0].toCharArray()) teams.add(ch);\n    teams.sort((a, b) -> compare(a, b, count, ranks));\n    StringBuilder answer = new StringBuilder();\n    for (char team : teams) answer.append(team);\n    return answer.toString();\n  }\n\n  private int compare(char a, char b, int[][] count, int ranks) {\n    for (int i = 0; i < ranks; i++) {\n      int diff = count[b - 'A'][i] - count[a - 'A'][i];\n      if (diff != 0) return diff;\n    }\n    return Character.compare(a, b);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String rankTeams(String[] votes) {\n    int ranks = votes[0].length();\n    int[][] count = new int[26][ranks];\n    for (String vote : votes) {\n      for (int rank = 0; rank < ranks; rank++) count[vote.charAt(rank) - 'A'][rank]++;\n    }\n    Character[] teams = new Character[ranks];\n    for (int i = 0; i < ranks; i++) teams[i] = votes[0].charAt(i);\n    Arrays.sort(teams, (a, b) -> {\n      for (int rank = 0; rank < ranks; rank++) {\n        if (count[a - 'A'][rank] != count[b - 'A'][rank]) {\n          return Integer.compare(count[b - 'A'][rank], count[a - 'A'][rank]);\n        }\n      }\n      return Character.compare(a, b);\n    });\n    StringBuilder answer = new StringBuilder();\n    for (char team : teams) answer.append(team);\n    return answer.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String rankTeams(String[] votes) {\n    int ranks = votes[0].length();\n    int[][] count = new int[26][ranks];\n    for (String vote : votes) for (int i = 0; i < ranks; i++) count[vote.charAt(i) - 'A'][i]++;\n    char[] teams = votes[0].toCharArray();\n    quickSort(teams, 0, teams.length - 1, count, ranks);\n    return new String(teams);\n  }\n\n  private void quickSort(char[] teams, int left, int right, int[][] count, int ranks) {\n    if (left >= right) return;\n    int pivot = partition(teams, left, right, count, ranks);\n    quickSort(teams, left, pivot - 1, count, ranks);\n    quickSort(teams, pivot + 1, right, count, ranks);\n  }\n\n  private int partition(char[] teams, int left, int right, int[][] count, int ranks) {\n    char pivot = teams[right];\n    int store = left;\n    for (int i = left; i < right; i++) if (compare(teams[i], pivot, count, ranks) <= 0) swap(teams, store++, i);\n    swap(teams, store, right);\n    return store;\n  }\n\n  private int compare(char a, char b, int[][] count, int ranks) {\n    for (int i = 0; i < ranks; i++) {\n      if (count[a - 'A'][i] != count[b - 'A'][i]) return count[b - 'A'][i] - count[a - 'A'][i];\n    }\n    return a - b;\n  }\n\n  private void swap(char[] teams, int i, int j) {\n    char temp = teams[i];\n    teams[i] = teams[j];\n    teams[j] = temp;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String rankTeams(String[] votes) {\n    int ranks = votes[0].length();\n    int[][] count = new int[26][ranks];\n    for (String vote : votes) {\n      for (int rank = 0; rank < ranks; rank++) count[vote.charAt(rank) - 'A'][rank]++;\n    }\n    Character[] teams = new Character[ranks];\n    for (int i = 0; i < ranks; i++) teams[i] = votes[0].charAt(i);\n    Arrays.sort(teams, (a, b) -> {\n      for (int rank = 0; rank < ranks; rank++) {\n        if (count[a - 'A'][rank] != count[b - 'A'][rank]) {\n          return Integer.compare(count[b - 'A'][rank], count[a - 'A'][rank]);\n        }\n      }\n      return Character.compare(a, b);\n    });\n    StringBuilder answer = new StringBuilder();\n    for (char team : teams) answer.append(team);\n    return answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String rankTeams(String[] votes) {\n    int ranks = votes[0].length();\n    int[][] count = new int[26][ranks];\n    for (String vote : votes) {\n      for (int rank = 0; rank < ranks; rank++) count[vote.charAt(rank) - 'A'][rank]++;\n    }\n    Character[] teams = new Character[ranks];\n    for (int i = 0; i < ranks; i++) teams[i] = votes[0].charAt(i);\n    Arrays.sort(teams, (a, b) -> {\n      for (int rank = 0; rank < ranks; rank++) {\n        if (count[a - 'A'][rank] != count[b - 'A'][rank]) {\n          return Integer.compare(count[b - 'A'][rank], count[a - 'A'][rank]);\n        }\n      }\n      return Character.compare(a, b);\n    });\n    StringBuilder answer = new StringBuilder();\n    for (char team : teams) answer.append(team);\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Number of Arrows to Burst Balloons",
      "difficulty": "Medium",
      "subpattern": "Endpoint greedy interval sorting",
      "question": "Given balloon intervals on the x-axis, return the minimum arrows needed to burst all balloons.",
      "trigger": "One arrow can cover overlapping intervals, and sorting by end chooses the most reusable arrow position.",
      "intuition": "Shoot at the earliest possible end; every balloon starting after that end needs a new arrow.",
      "edgeCases": "Touching endpoints, negative coordinates, one balloon, all overlapping, all disjoint.",
      "constraints": "1 <= points.length <= 100000; points[i] = [start,end]; coordinates fit in 32-bit signed integer.",
      "source": {
        "label": "Minimum Number of Arrows to Burst Balloons - LeetCode 452",
        "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
      },
      "examples": [
        {
          "input": "points = [[10,16],[2,8],[1,6],[7,12]]",
          "output": "2",
          "explanation": "One arrow can burst [1,6] and [2,8], another handles [7,12] and [10,16]."
        },
        {
          "input": "points = [[1,2],[3,4],[5,6],[7,8]]",
          "output": "4",
          "explanation": "No intervals overlap."
        },
        {
          "input": "points = [[1,2],[2,3],[3,4],[4,5]]",
          "output": "2",
          "explanation": "Touching endpoints can share an arrow."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(log n). Sort by start and shrink current overlap window.",
      "optimizedComplexity": "Time O(n log n); Space O(log n). Sort by end and greedily shoot arrows.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive greedy scan after sorting by end.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[0], b[0]));\n    int arrows = 0;\n    int i = 0;\n    while (i < points.length) {\n      int end = points[i][1];\n      i++;\n      while (i < points.length && points[i][0] <= end) {\n        end = Math.min(end, points[i][1]);\n        i++;\n      }\n      arrows++;\n    }\n    return arrows;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrowEnd = Long.MIN_VALUE;\n    for (int[] point : points) {\n      if (point[0] > arrowEnd) {\n        arrows++;\n        arrowEnd = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    return scan(points, 0, Long.MIN_VALUE, 0);\n  }\n\n  private int scan(int[][] points, int index, long arrowEnd, int arrows) {\n    if (index == points.length) return arrows;\n    if (points[index][0] > arrowEnd) return scan(points, index + 1, points[index][1], arrows + 1);\n    return scan(points, index + 1, arrowEnd, arrows);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrowEnd = Long.MIN_VALUE;\n    for (int[] point : points) {\n      if (point[0] > arrowEnd) {\n        arrows++;\n        arrowEnd = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrowEnd = Long.MIN_VALUE;\n    for (int[] point : points) {\n      if (point[0] > arrowEnd) {\n        arrows++;\n        arrowEnd = point[1];\n      }\n    }\n    return arrows;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Sort Array By Parity",
      "difficulty": "Easy",
      "subpattern": "Parity partition",
      "question": "Given nums, return an array with all even integers before all odd integers.",
      "trigger": "Only a binary property matters, so a two-way partition is enough.",
      "intuition": "Move an even value from the right into the next even slot whenever the left side has an odd value.",
      "edgeCases": "All even, all odd, one element, zeros, already partitioned input.",
      "constraints": "1 <= nums.length <= 5000; 0 <= nums[i] <= 5000; any valid parity partition is accepted.",
      "source": {
        "label": "Sort Array By Parity - LeetCode 905",
        "url": "https://leetcode.com/problems/sort-array-by-parity/"
      },
      "examples": [
        {
          "input": "nums = [3,1,2,4]",
          "output": "[2,4,3,1] or any even-before-odd order",
          "explanation": "Even values appear before odd values."
        },
        {
          "input": "nums = [0]",
          "output": "[0]",
          "explanation": "Zero is even."
        },
        {
          "input": "nums = [1,3,5]",
          "output": "[1,3,5]",
          "explanation": "There are no even values to move forward."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build a new array with evens first and odds second.",
      "optimizedComplexity": "Time O(n); Space O(1). Two pointers partition in-place by parity.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive two-pointer partition uses call-stack space.",
      "bruteForceCode": "class Solution {\n  public int[] sortArrayByParity(int[] nums) {\n    int[] answer = new int[nums.length];\n    int index = 0;\n    for (int value : nums) if (value % 2 == 0) answer[index++] = value;\n    for (int value : nums) if (value % 2 != 0) answer[index++] = value;\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] sortArrayByParity(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n    while (left < right) {\n      if (nums[left] % 2 <= nums[right] % 2) {\n        left++;\n      } else {\n        int temp = nums[left];\n        nums[left] = nums[right];\n        nums[right] = temp;\n        right--;\n      }\n    }\n    return nums;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] sortArrayByParity(int[] nums) {\n    partition(nums, 0, nums.length - 1);\n    return nums;\n  }\n\n  private void partition(int[] nums, int left, int right) {\n    if (left >= right) return;\n    if (nums[left] % 2 <= nums[right] % 2) {\n      partition(nums, left + 1, right);\n    } else {\n      int temp = nums[left];\n      nums[left] = nums[right];\n      nums[right] = temp;\n      partition(nums, left, right - 1);\n    }\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] sortArrayByParity(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n    while (left < right) {\n      if (nums[left] % 2 <= nums[right] % 2) {\n        left++;\n      } else {\n        int temp = nums[left];\n        nums[left] = nums[right];\n        nums[right] = temp;\n        right--;\n      }\n    }\n    return nums;\n  }\n}",
      "code": "class Solution {\n  public int[] sortArrayByParity(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n    while (left < right) {\n      if (nums[left] % 2 <= nums[right] % 2) {\n        left++;\n      } else {\n        int temp = nums[left];\n        nums[left] = nums[right];\n        nums[right] = temp;\n        right--;\n      }\n    }\n    return nums;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Squares of a Sorted Array",
      "difficulty": "Easy",
      "subpattern": "Two-pointer sorted square merge",
      "question": "Given a non-decreasing array nums, return an array of the squares of each number, also sorted non-decreasing.",
      "trigger": "The input is sorted but squaring makes large negative values move to the end.",
      "intuition": "The largest square is always at one of the two ends, so fill the answer from the back.",
      "edgeCases": "All negative, all non-negative, contains zero, one element, equal absolute values.",
      "constraints": "1 <= nums.length <= 10000; -10000 <= nums[i] <= 10000; nums is non-decreasing.",
      "source": {
        "label": "Squares of a Sorted Array - LeetCode 977",
        "url": "https://leetcode.com/problems/squares-of-a-sorted-array/"
      },
      "examples": [
        {
          "input": "nums = [-4,-1,0,3,10]",
          "output": "[0,1,9,16,100]",
          "explanation": "Squares are sorted after two-end merge."
        },
        {
          "input": "nums = [-7,-3,2,3,11]",
          "output": "[4,9,9,49,121]",
          "explanation": "The largest square first comes from -7 then 11."
        },
        {
          "input": "nums = [0,1,2]",
          "output": "[0,1,4]",
          "explanation": "Already non-negative values stay ordered after squaring."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Square all values and sort the result.",
      "optimizedComplexity": "Time O(n); Space O(n). Two pointers fill largest squares from the back.",
      "recursiveComplexity": "Time O(n); Space O(n + call stack). Recursive two-pointer fill writes one position per call.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] sortedSquares(int[] nums) {\n    int[] answer = new int[nums.length];\n    for (int i = 0; i < nums.length; i++) answer[i] = nums[i] * nums[i];\n    Arrays.sort(answer);\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int[] answer = new int[nums.length];\n    int left = 0;\n    int right = nums.length - 1;\n    for (int write = nums.length - 1; write >= 0; write--) {\n      int leftSquare = nums[left] * nums[left];\n      int rightSquare = nums[right] * nums[right];\n      if (leftSquare > rightSquare) {\n        answer[write] = leftSquare;\n        left++;\n      } else {\n        answer[write] = rightSquare;\n        right--;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int[] answer = new int[nums.length];\n    fill(nums, 0, nums.length - 1, answer, nums.length - 1);\n    return answer;\n  }\n\n  private void fill(int[] nums, int left, int right, int[] answer, int write) {\n    if (write < 0) return;\n    int leftSquare = nums[left] * nums[left];\n    int rightSquare = nums[right] * nums[right];\n    if (leftSquare > rightSquare) {\n      answer[write] = leftSquare;\n      fill(nums, left + 1, right, answer, write - 1);\n    } else {\n      answer[write] = rightSquare;\n      fill(nums, left, right - 1, answer, write - 1);\n    }\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int[] answer = new int[nums.length];\n    int left = 0;\n    int right = nums.length - 1;\n    for (int write = nums.length - 1; write >= 0; write--) {\n      int leftSquare = nums[left] * nums[left];\n      int rightSquare = nums[right] * nums[right];\n      if (leftSquare > rightSquare) {\n        answer[write] = leftSquare;\n        left++;\n      } else {\n        answer[write] = rightSquare;\n        right--;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[] sortedSquares(int[] nums) {\n    int[] answer = new int[nums.length];\n    int left = 0;\n    int right = nums.length - 1;\n    for (int write = nums.length - 1; write >= 0; write--) {\n      int leftSquare = nums[left] * nums[left];\n      int rightSquare = nums[right] * nums[right];\n      if (leftSquare > rightSquare) {\n        answer[write] = leftSquare;\n        left++;\n      } else {\n        answer[write] = rightSquare;\n        right--;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Pancake Sorting",
      "difficulty": "Medium",
      "subpattern": "Pancake reversal sorting",
      "question": "Given an array arr containing a permutation of 1..n, return a sequence of pancake flips that sorts it ascending.",
      "trigger": "Only prefix reversals are allowed, so each step moves the current maximum into its final position.",
      "intuition": "Flip the maximum in the unsorted prefix to the front, then flip it into its final back position.",
      "edgeCases": "Already sorted, maximum already at front, maximum already fixed, n is 1, reverse sorted input.",
      "constraints": "1 <= arr.length <= 100; arr is a permutation of [1, arr.length]; any valid flip sequence is accepted.",
      "source": {
        "label": "Pancake Sorting - LeetCode 969",
        "url": "https://leetcode.com/problems/pancake-sorting/"
      },
      "examples": [
        {
          "input": "arr = [3,2,4,1]",
          "output": "a valid flip list such as [3,4,2,3,2]",
          "explanation": "Applying the flips sorts the array."
        },
        {
          "input": "arr = [1,2,3]",
          "output": "[] or another valid no-op-equivalent list",
          "explanation": "The array is already sorted."
        },
        {
          "input": "arr = [2,1]",
          "output": "[2]",
          "explanation": "One prefix reversal sorts two values."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly scans the unsorted prefix for the maximum and flips.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Skips unnecessary flips when the maximum is already placed.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively places the largest remaining pancake.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> pancakeSort(int[] arr) {\n    List<Integer> flips = new ArrayList<>();\n    for (int size = arr.length; size > 1; size--) {\n      int max = 0;\n      for (int i = 1; i < size; i++) if (arr[i] > arr[max]) max = i;\n      if (max != size - 1) {\n        reverse(arr, max + 1);\n        flips.add(max + 1);\n        reverse(arr, size);\n        flips.add(size);\n      }\n    }\n    return flips;\n  }\n\n  private void reverse(int[] arr, int k) {\n    for (int left = 0, right = k - 1; left < right; left++, right--) {\n      int temp = arr[left];\n      arr[left] = arr[right];\n      arr[right] = temp;\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> pancakeSort(int[] arr) {\n    List<Integer> answer = new ArrayList<>();\n    for (int value = arr.length; value >= 1; value--) {\n      int index = find(arr, value);\n      if (index == value - 1) continue;\n      if (index > 0) {\n        flip(arr, index + 1);\n        answer.add(index + 1);\n      }\n      flip(arr, value);\n      answer.add(value);\n    }\n    return answer;\n  }\n\n  private int find(int[] arr, int value) {\n    for (int i = 0; i < arr.length; i++) if (arr[i] == value) return i;\n    return -1;\n  }\n\n  private void flip(int[] arr, int k) {\n    int left = 0, right = k - 1;\n    while (left < right) {\n      int temp = arr[left];\n      arr[left++] = arr[right];\n      arr[right--] = temp;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> pancakeSort(int[] arr) {\n    List<Integer> flips = new ArrayList<>();\n    place(arr, arr.length, flips);\n    return flips;\n  }\n\n  private void place(int[] arr, int size, List<Integer> flips) {\n    if (size <= 1) return;\n    int max = 0;\n    for (int i = 1; i < size; i++) if (arr[i] > arr[max]) max = i;\n    if (max != size - 1) {\n      if (max > 0) {\n        reverse(arr, max + 1);\n        flips.add(max + 1);\n      }\n      reverse(arr, size);\n      flips.add(size);\n    }\n    place(arr, size - 1, flips);\n  }\n\n  private void reverse(int[] arr, int k) {\n    for (int left = 0, right = k - 1; left < right; left++, right--) {\n      int temp = arr[left];\n      arr[left] = arr[right];\n      arr[right] = temp;\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> pancakeSort(int[] arr) {\n    List<Integer> answer = new ArrayList<>();\n    for (int value = arr.length; value >= 1; value--) {\n      int index = find(arr, value);\n      if (index == value - 1) continue;\n      if (index > 0) {\n        flip(arr, index + 1);\n        answer.add(index + 1);\n      }\n      flip(arr, value);\n      answer.add(value);\n    }\n    return answer;\n  }\n\n  private int find(int[] arr, int value) {\n    for (int i = 0; i < arr.length; i++) if (arr[i] == value) return i;\n    return -1;\n  }\n\n  private void flip(int[] arr, int k) {\n    int left = 0, right = k - 1;\n    while (left < right) {\n      int temp = arr[left];\n      arr[left++] = arr[right];\n      arr[right--] = temp;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> pancakeSort(int[] arr) {\n    List<Integer> answer = new ArrayList<>();\n    for (int value = arr.length; value >= 1; value--) {\n      int index = find(arr, value);\n      if (index == value - 1) continue;\n      if (index > 0) {\n        flip(arr, index + 1);\n        answer.add(index + 1);\n      }\n      flip(arr, value);\n      answer.add(value);\n    }\n    return answer;\n  }\n\n  private int find(int[] arr, int value) {\n    for (int i = 0; i < arr.length; i++) if (arr[i] == value) return i;\n    return -1;\n  }\n\n  private void flip(int[] arr, int k) {\n    int left = 0, right = k - 1;\n    while (left < right) {\n      int temp = arr[left];\n      arr[left++] = arr[right];\n      arr[right--] = temp;\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Hand of Straights",
      "difficulty": "Medium",
      "subpattern": "Ordered consecutive grouping",
      "question": "Given a hand of cards and groupSize, return true if the cards can be rearranged into groups of groupSize consecutive cards.",
      "trigger": "Groups must start from the current smallest remaining card.",
      "intuition": "Sort or use an ordered map; each time take the smallest card and consume the next groupSize values.",
      "edgeCases": "Hand length not divisible, duplicates, missing middle card, groupSize is 1, multiple identical groups.",
      "constraints": "1 <= hand.length <= 10000; 0 <= hand[i] <= 1000000000; 1 <= groupSize <= hand.length.",
      "source": {
        "label": "Hand of Straights - LeetCode 846",
        "url": "https://leetcode.com/problems/hand-of-straights/"
      },
      "examples": [
        {
          "input": "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
          "output": "true",
          "explanation": "Groups can be [1,2,3], [2,3,4], [6,7,8]."
        },
        {
          "input": "hand = [1,2,3,4,5], groupSize = 4",
          "output": "false",
          "explanation": "The length is not divisible by 4."
        },
        {
          "input": "hand = [1,2,3], groupSize = 1",
          "output": "true",
          "explanation": "Each single card is a valid group."
        }
      ],
      "bruteForceComplexity": "Time O(n log n + n*groupSize); Space O(n). Sort and mark used cards while building groups.",
      "optimizedComplexity": "Time O(n log n + n*groupSize); Space O(n). TreeMap consumes counts from the smallest key.",
      "recursiveComplexity": "Time O(n log n + n*groupSize); Space O(n). Recursively consumes the next group from the ordered map.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    Arrays.sort(hand);\n    boolean[] used = new boolean[hand.length];\n    for (int i = 0; i < hand.length; i++) {\n      if (used[i]) continue;\n      int need = hand[i];\n      for (int count = 0; count < groupSize; count++, need++) {\n        int found = find(hand, used, need);\n        if (found == -1) return false;\n        used[found] = true;\n      }\n    }\n    return true;\n  }\n\n  private int find(int[] hand, boolean[] used, int value) {\n    for (int i = 0; i < hand.length; i++) if (!used[i] && hand[i] == value) return i;\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n    while (!count.isEmpty()) {\n      int start = count.firstKey();\n      for (int card = start; card < start + groupSize; card++) {\n        Integer current = count.get(card);\n        if (current == null) return false;\n        if (current == 1) count.remove(card);\n        else count.put(card, current - 1);\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n    return consume(count, groupSize);\n  }\n\n  private boolean consume(TreeMap<Integer, Integer> count, int groupSize) {\n    if (count.isEmpty()) return true;\n    int start = count.firstKey();\n    for (int card = start; card < start + groupSize; card++) {\n      Integer current = count.get(card);\n      if (current == null) return false;\n      if (current == 1) count.remove(card);\n      else count.put(card, current - 1);\n    }\n    return consume(count, groupSize);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n    while (!count.isEmpty()) {\n      int start = count.firstKey();\n      for (int card = start; card < start + groupSize; card++) {\n        Integer current = count.get(card);\n        if (current == null) return false;\n        if (current == 1) count.remove(card);\n        else count.put(card, current - 1);\n      }\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n    while (!count.isEmpty()) {\n      int start = count.firstKey();\n      for (int card = start; card < start + groupSize; card++) {\n        Integer current = count.get(card);\n        if (current == null) return false;\n        if (current == 1) count.remove(card);\n        else count.put(card, current - 1);\n      }\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find K Closest Elements",
      "difficulty": "Medium",
      "subpattern": "Binary search on sorted closeness",
      "question": "Given a sorted array arr, integers k and x, return the k closest elements to x in ascending order.",
      "trigger": "The array is sorted, and the answer is a contiguous window of length k.",
      "intuition": "Binary search the left boundary by comparing x-arr[mid] with arr[mid+k]-x.",
      "edgeCases": "x smaller than all values, x larger than all values, ties prefer smaller values, k equals array length, duplicates.",
      "constraints": "1 <= k <= arr.length <= 10000; arr is sorted ascending.",
      "source": {
        "label": "Find K Closest Elements - LeetCode 658",
        "url": "https://leetcode.com/problems/find-k-closest-elements/"
      },
      "examples": [
        {
          "input": "arr = [1,2,3,4,5], k = 4, x = 3",
          "output": "[1,2,3,4]",
          "explanation": "The closest four values form a sorted window."
        },
        {
          "input": "arr = [1,2,3,4,5], k = 4, x = -1",
          "output": "[1,2,3,4]",
          "explanation": "When x is left of all values, choose the first k."
        },
        {
          "input": "arr = [1,1,1,10,10,10], k = 1, x = 9",
          "output": "[10]",
          "explanation": "10 is closest to 9."
        }
      ],
      "bruteForceComplexity": "Time O(n log n + k log k); Space O(n). Sort values by distance, then sort the selected k values.",
      "optimizedComplexity": "Time O(log(n-k) + k); Space O(k). Binary search the answer window start.",
      "recursiveComplexity": "Time O(log(n-k) + k); Space O(k + log n). Recursive binary search finds the left boundary.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findClosestElements(int[] arr, int k, int x) {\n    Integer[] boxed = new Integer[arr.length];\n    for (int i = 0; i < arr.length; i++) boxed[i] = arr[i];\n    Arrays.sort(boxed, (a, b) -> Math.abs(a - x) == Math.abs(b - x) ? Integer.compare(a, b) : Integer.compare(Math.abs(a - x), Math.abs(b - x)));\n    List<Integer> answer = new ArrayList<>();\n    for (int i = 0; i < k; i++) answer.add(boxed[i]);\n    Collections.sort(answer);\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findClosestElements(int[] arr, int k, int x) {\n    int left = 0;\n    int right = arr.length - k;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (x - arr[mid] > arr[mid + k] - x) left = mid + 1;\n      else right = mid;\n    }\n    List<Integer> answer = new ArrayList<>();\n    for (int i = left; i < left + k; i++) answer.add(arr[i]);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findClosestElements(int[] arr, int k, int x) {\n    int left = search(arr, k, x, 0, arr.length - k);\n    List<Integer> answer = new ArrayList<>();\n    for (int i = left; i < left + k; i++) answer.add(arr[i]);\n    return answer;\n  }\n\n  private int search(int[] arr, int k, int x, int left, int right) {\n    if (left >= right) return left;\n    int mid = left + (right - left) / 2;\n    if (x - arr[mid] > arr[mid + k] - x) return search(arr, k, x, mid + 1, right);\n    return search(arr, k, x, left, mid);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findClosestElements(int[] arr, int k, int x) {\n    int left = 0;\n    int right = arr.length - k;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (x - arr[mid] > arr[mid + k] - x) left = mid + 1;\n      else right = mid;\n    }\n    List<Integer> answer = new ArrayList<>();\n    for (int i = left; i < left + k; i++) answer.add(arr[i]);\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findClosestElements(int[] arr, int k, int x) {\n    int left = 0;\n    int right = arr.length - k;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (x - arr[mid] > arr[mid + k] - x) left = mid + 1;\n      else right = mid;\n    }\n    List<Integer> answer = new ArrayList<>();\n    for (int i = left; i < left + k; i++) answer.add(arr[i]);\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Increment to Make Array Unique",
      "difficulty": "Medium",
      "subpattern": "Greedy uniqueness after sorting",
      "question": "Given nums, increment elements any number of times so every value is unique, and return the minimum total increments.",
      "trigger": "After sorting, each value only needs to be at least one greater than the previous assigned value.",
      "intuition": "Keep the next minimum allowed value and raise duplicates or too-small values to it.",
      "edgeCases": "All unique, all same, zeros, large clusters, already increasing input.",
      "constraints": "1 <= nums.length <= 100000; 0 <= nums[i] <= 100000.",
      "source": {
        "label": "Minimum Increment to Make Array Unique - LeetCode 945",
        "url": "https://leetcode.com/problems/minimum-increment-to-make-array-unique/"
      },
      "examples": [
        {
          "input": "nums = [1,2,2]",
          "output": "1",
          "explanation": "Increment one 2 to 3."
        },
        {
          "input": "nums = [3,2,1,2,1,7]",
          "output": "6",
          "explanation": "One optimal final array is [1,2,3,4,5,7]."
        },
        {
          "input": "nums = [0,0]",
          "output": "1",
          "explanation": "Increment one zero to one."
        }
      ],
      "bruteForceComplexity": "Time O(n * max increments); Space O(n). Use a set and increment each duplicate until free.",
      "optimizedComplexity": "Time O(n log n); Space O(log n). Sort and greedily enforce strictly increasing values.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive sorted scan carries the next required value.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minIncrementForUnique(int[] nums) {\n    Set<Integer> used = new HashSet<>();\n    int moves = 0;\n    for (int value : nums) {\n      while (used.contains(value)) {\n        value++;\n        moves++;\n      }\n      used.add(value);\n    }\n    return moves;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minIncrementForUnique(int[] nums) {\n    Arrays.sort(nums);\n    int moves = 0;\n    int nextAllowed = 0;\n    for (int value : nums) {\n      if (value < nextAllowed) {\n        moves += nextAllowed - value;\n        value = nextAllowed;\n      }\n      nextAllowed = value + 1;\n    }\n    return moves;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minIncrementForUnique(int[] nums) {\n    Arrays.sort(nums);\n    return scan(nums, 0, 0, 0);\n  }\n\n  private int scan(int[] nums, int index, int nextAllowed, int moves) {\n    if (index == nums.length) return moves;\n    int value = nums[index];\n    if (value < nextAllowed) {\n      moves += nextAllowed - value;\n      value = nextAllowed;\n    }\n    return scan(nums, index + 1, value + 1, moves);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minIncrementForUnique(int[] nums) {\n    Arrays.sort(nums);\n    int moves = 0;\n    int nextAllowed = 0;\n    for (int value : nums) {\n      if (value < nextAllowed) {\n        moves += nextAllowed - value;\n        value = nextAllowed;\n      }\n      nextAllowed = value + 1;\n    }\n    return moves;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minIncrementForUnique(int[] nums) {\n    Arrays.sort(nums);\n    int moves = 0;\n    int nextAllowed = 0;\n    for (int value : nums) {\n      if (value < nextAllowed) {\n        moves += nextAllowed - value;\n        value = nextAllowed;\n      }\n      nextAllowed = value + 1;\n    }\n    return moves;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Sort the Matrix Diagonally",
      "difficulty": "Medium",
      "subpattern": "Independent diagonal sorting",
      "question": "Given a matrix mat, sort every diagonal from top-left to bottom-right in ascending order and return the matrix.",
      "trigger": "Each diagonal is independent and identified by row - column.",
      "intuition": "Collect values per diagonal, sort them, then write them back along the same diagonal.",
      "edgeCases": "Single row, single column, square matrix, rectangular matrix, duplicate values in a diagonal.",
      "constraints": "1 <= m,n <= 100; 1 <= mat[i][j] <= 100.",
      "source": {
        "label": "Sort the Matrix Diagonally - LeetCode 1329",
        "url": "https://leetcode.com/problems/sort-the-matrix-diagonally/"
      },
      "examples": [
        {
          "input": "mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]",
          "output": "[[1,1,1,1],[1,2,2,2],[1,2,3,3]]",
          "explanation": "Each top-left to bottom-right diagonal is sorted."
        },
        {
          "input": "mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]",
          "output": "diagonals sorted ascending",
          "explanation": "Every diagonal is processed independently."
        },
        {
          "input": "mat = [[1]]",
          "output": "[[1]]",
          "explanation": "A one-cell diagonal is already sorted."
        }
      ],
      "bruteForceComplexity": "Time O(mn log(min(m,n))); Space O(mn). Store each diagonal list, sort, and write back.",
      "optimizedComplexity": "Time O(mn * range); Space O(range). Since values are 1..100, count-sort each diagonal.",
      "recursiveComplexity": "Time O(mn log(min(m,n))); Space O(min(m,n)). Recursively starts each diagonal and uses a min-heap.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] diagonalSort(int[][] mat) {\n    Map<Integer, List<Integer>> diagonals = new HashMap<>();\n    for (int r = 0; r < mat.length; r++) {\n      for (int c = 0; c < mat[0].length; c++) diagonals.computeIfAbsent(r - c, key -> new ArrayList<>()).add(mat[r][c]);\n    }\n    for (List<Integer> values : diagonals.values()) Collections.sort(values);\n    Map<Integer, Integer> index = new HashMap<>();\n    for (int r = 0; r < mat.length; r++) {\n      for (int c = 0; c < mat[0].length; c++) {\n        int key = r - c;\n        int next = index.getOrDefault(key, 0);\n        mat[r][c] = diagonals.get(key).get(next);\n        index.put(key, next + 1);\n      }\n    }\n    return mat;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[][] diagonalSort(int[][] mat) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    for (int r = 0; r < rows; r++) sortDiagonal(mat, r, 0);\n    for (int c = 1; c < cols; c++) sortDiagonal(mat, 0, c);\n    return mat;\n  }\n\n  private void sortDiagonal(int[][] mat, int row, int col) {\n    int[] count = new int[101];\n    int r = row, c = col;\n    while (r < mat.length && c < mat[0].length) count[mat[r++][c++]]++;\n    r = row;\n    c = col;\n    for (int value = 1; value < count.length; value++) {\n      while (count[value]-- > 0) mat[r++][c++] = value;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] diagonalSort(int[][] mat) {\n    startRows(mat, 0);\n    startCols(mat, 1);\n    return mat;\n  }\n\n  private void startRows(int[][] mat, int row) {\n    if (row == mat.length) return;\n    sortOne(mat, row, 0);\n    startRows(mat, row + 1);\n  }\n\n  private void startCols(int[][] mat, int col) {\n    if (col == mat[0].length) return;\n    sortOne(mat, 0, col);\n    startCols(mat, col + 1);\n  }\n\n  private void sortOne(int[][] mat, int row, int col) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    int r = row, c = col;\n    while (r < mat.length && c < mat[0].length) heap.offer(mat[r++][c++]);\n    r = row;\n    c = col;\n    while (r < mat.length && c < mat[0].length) mat[r++][c++] = heap.poll();\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[][] diagonalSort(int[][] mat) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    for (int r = 0; r < rows; r++) sortDiagonal(mat, r, 0);\n    for (int c = 1; c < cols; c++) sortDiagonal(mat, 0, c);\n    return mat;\n  }\n\n  private void sortDiagonal(int[][] mat, int row, int col) {\n    int[] count = new int[101];\n    int r = row, c = col;\n    while (r < mat.length && c < mat[0].length) count[mat[r++][c++]]++;\n    r = row;\n    c = col;\n    for (int value = 1; value < count.length; value++) {\n      while (count[value]-- > 0) mat[r++][c++] = value;\n    }\n  }\n}",
      "code": "class Solution {\n  public int[][] diagonalSort(int[][] mat) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    for (int r = 0; r < rows; r++) sortDiagonal(mat, r, 0);\n    for (int c = 1; c < cols; c++) sortDiagonal(mat, 0, c);\n    return mat;\n  }\n\n  private void sortDiagonal(int[][] mat, int row, int col) {\n    int[] count = new int[101];\n    int r = row, c = col;\n    while (r < mat.length && c < mat[0].length) count[mat[r++][c++]]++;\n    r = row;\n    c = col;\n    for (int value = 1; value < count.length; value++) {\n      while (count[value]-- > 0) mat[r++][c++] = value;\n    }\n  }\n}"
    }
  ],
  "checklist": [
    "The output depends on relative order, rank, or grouping after values are ordered.",
    "Intervals, events, or points become easy after sorting by start, end, height, position, or a custom key.",
    "Only a small value range exists, so counting or bucket sort can replace comparison sort.",
    "The problem asks for kth/top/frequency/rank, which often means partition, heap, or bucket after counting.",
    "Counting pairs during ordering hints at merge sort, Fenwick compression, or sweep-line sorting."
  ],
  "traps": [
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
    "Day 1: redo Sort Colors, Merge Sorted Array, Kth Largest, Top K Frequent, and Largest Number.",
    "Day 3: redo the interval set: Meeting Rooms, Meeting Rooms II, Merge Intervals, Non-overlapping Intervals, and Arrows.",
    "Day 7: redo linked-list sorting and merge-sort counting problems from memory.",
    "Day 14: time-box comparator-heavy problems: Queue Reconstruction, Rank Teams, Largest Number, and Find K Closest Elements.",
    "Before interviews: implement DNF partition, bucket frequency extraction, merge-sort counting, and interval end-time greedy without looking."
  ],
  "unseen": [
    "Given log records with severity and timestamp, return them in custom priority order while preserving timestamp order inside ties.",
    "Given intervals and a cooldown, find the maximum number of non-overlapping intervals after adding cooldown to each end.",
    "Given product ratings, return the k products closest to a target rating with smaller id as tie-breaker.",
    "Given an array, count pairs where nums[i] is greater than three times nums[j] for i < j.",
    "Given matrix cells with repeated values, sort every anti-diagonal independently."
  ]
};
