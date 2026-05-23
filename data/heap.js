const CURRENT_PATTERN = {
  "id": "heap",
  "name": "Heap / Priority Queue",
  "summary": "Top K, streaming median, scheduling, k-way merge.",
  "complete": true,
  "subpatterns": [
    "Core Heap / Priority Queue recognition",
    "Boundary handling in Heap / Priority Queue",
    "Optimized iterative Heap / Priority Queue",
    "Recursive or DFS-style Heap / Priority Queue",
    "Advanced Heap / Priority Queue variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Kth Largest Element in an Array",
      "difficulty": "Medium",
      "subpattern": "Top K with min-heap",
      "question": "Given an integer array nums and an integer k, return the kth largest element in the array. The kth largest is based on sorted order, not distinct values.",
      "trigger": "The task asks for the kth largest value without needing the full sorted order, so a size-k min-heap can keep only the k largest candidates.",
      "intuition": "Push values into a min-heap. If heap size exceeds k, remove the smallest. After all values, heap top is the kth largest.",
      "edgeCases": "Duplicates, k = 1, k = nums.length, negative values, all values equal.",
      "constraints": "1 <= k <= nums.length <= 100000; -10000 <= nums[i] <= 10000.",
      "source": {
        "label": "Kth Largest Element in an Array - LeetCode 215",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "Sorted descending is [6,5,4,3,2,1]."
        },
        {
          "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
          "output": "4",
          "explanation": "Duplicates count as separate elements."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "The only element is the kth largest."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(1) to O(n) depending on sort implementation. Sort the whole array and index from the end.",
      "optimizedComplexity": "Time O(n log k); Space O(k). The min-heap stores only the k largest seen values.",
      "recursiveComplexity": "Time O(n log k); Space O(k + n) recursion stack if values are inserted recursively.",
      "bruteForceCode": "import java.util.Arrays;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n    for (int num : nums) {\n      heap.offer(num);\n      if (heap.size() > k) heap.poll();\n    }\n\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    add(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void add(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    add(nums, index + 1, k, heap);\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n    for (int num : nums) {\n      heap.offer(num);\n      if (heap.size() > k) heap.poll();\n    }\n\n    return heap.peek();\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n    for (int num : nums) {\n      heap.offer(num);\n      if (heap.size() > k) heap.poll();\n    }\n\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Top K Frequent Elements",
      "difficulty": "Medium",
      "subpattern": "Top K frequencies with min-heap",
      "question": "Given an integer array nums and an integer k, return the k most frequent elements. The answer may be returned in any order.",
      "trigger": "The task asks for the top k items by frequency, so frequency counting plus a size-k heap avoids sorting every unique value.",
      "intuition": "Count each value. Push each value into a min-heap ordered by frequency. When heap size exceeds k, remove the least frequent candidate.",
      "edgeCases": "k equals number of unique values, all values have same frequency, negative values, one unique value, duplicate-heavy input.",
      "constraints": "1 <= nums.length <= 100000; -10000 <= nums[i] <= 10000; k is in [1, number of unique elements].",
      "source": {
        "label": "Top K Frequent Elements - LeetCode 347",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1,2,2,3], k = 2",
          "output": "[1,2]",
          "explanation": "1 and 2 are the two most frequent values."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "[1]",
          "explanation": "The only value is the top frequent value."
        },
        {
          "input": "nums = [4,4,6,6,6,7], k = 1",
          "output": "[6]",
          "explanation": "6 has the highest frequency."
        }
      ],
      "bruteForceComplexity": "Time O(n + u log u); Space O(u), where u is unique values. Count then sort all unique values by frequency.",
      "optimizedComplexity": "Time O(n + u log k); Space O(u + k). A size-k heap keeps only top frequency candidates.",
      "recursiveComplexity": "Time O(n + u log k); Space O(u + k + u recursion). Recursive heap insertion over unique values.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    List<Integer> values = new ArrayList<>(frequency.keySet());\n    values.sort((a, b) -> frequency.get(b) - frequency.get(a));\n\n    int[] answer = new int[k];\n    for (int i = 0; i < k; i++) answer[i] = values.get(i);\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> frequency.get(a) - frequency.get(b));\n    for (int value : frequency.keySet()) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[] answer = new int[k];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    List<Integer> values = new ArrayList<>(frequency.keySet());\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> frequency.get(a) - frequency.get(b));\n    add(values, 0, k, frequency, heap);\n\n    int[] answer = new int[k];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private void add(List<Integer> values, int index, int k, Map<Integer, Integer> frequency, PriorityQueue<Integer> heap) {\n    if (index == values.size()) return;\n    heap.offer(values.get(index));\n    if (heap.size() > k) heap.poll();\n    add(values, index + 1, k, frequency, heap);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> frequency.get(a) - frequency.get(b));\n    for (int value : frequency.keySet()) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[] answer = new int[k];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> frequency.get(a) - frequency.get(b));\n    for (int value : frequency.keySet()) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[] answer = new int[k];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "K Closest Points to Origin",
      "difficulty": "Medium",
      "subpattern": "Top K closest with max-heap",
      "question": "Given points on a 2D plane and an integer k, return the k points closest to the origin (0,0). Distance is Euclidean, and answer order does not matter.",
      "trigger": "Only k closest points are needed, so a size-k max-heap can discard points farther than the current kth closest.",
      "intuition": "Compare squared distances to avoid square roots. Keep a max-heap of selected points; remove the farthest whenever size exceeds k.",
      "edgeCases": "k equals points.length, negative coordinates, duplicate distances, origin point, one point.",
      "constraints": "1 <= k <= points.length <= 10000; -10000 <= xi, yi <= 10000.",
      "source": {
        "label": "K Closest Points to Origin - LeetCode 973",
        "url": "https://leetcode.com/problems/k-closest-points-to-origin/"
      },
      "examples": [
        {
          "input": "points = [[1,3],[-2,2]], k = 1",
          "output": "[[-2,2]]",
          "explanation": "[-2,2] has smaller squared distance."
        },
        {
          "input": "points = [[3,3],[5,-1],[-2,4]], k = 2",
          "output": "[[3,3],[-2,4]]",
          "explanation": "Any order of the two closest points is valid."
        },
        {
          "input": "points = [[0,0]], k = 1",
          "output": "[[0,0]]",
          "explanation": "The origin point is closest."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(1) to O(n). Sort all points by squared distance.",
      "optimizedComplexity": "Time O(n log k); Space O(k). A max-heap keeps only k closest points.",
      "recursiveComplexity": "Time O(n log k); Space O(k + n) recursion stack if points are inserted recursively.",
      "bruteForceCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    Arrays.sort(points, (a, b) -> Integer.compare(distance(a), distance(b)));\n    return Arrays.copyOf(points, k);\n  }\n\n  private int distance(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(distance(b), distance(a)));\n\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int distance(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "recursiveCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(distance(b), distance(a)));\n    add(points, 0, k, heap);\n\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private void add(int[][] points, int index, int k, PriorityQueue<int[]> heap) {\n    if (index == points.length) return;\n    heap.offer(points[index]);\n    if (heap.size() > k) heap.poll();\n    add(points, index + 1, k, heap);\n  }\n\n  private int distance(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(distance(b), distance(a)));\n\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int distance(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(distance(b), distance(a)));\n\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int distance(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Last Stone Weight",
      "difficulty": "Easy",
      "subpattern": "Max-heap repeated simulation",
      "question": "Given stone weights, repeatedly smash the two heaviest stones. If they differ, the remaining weight is inserted back. Return the final stone weight or 0 if none remain.",
      "trigger": "Each step needs the two largest current values, so a max-heap supports efficient repeated extraction.",
      "intuition": "Insert all stones into a max-heap. Pop two largest weights, push their difference if nonzero, and continue until fewer than two stones remain.",
      "edgeCases": "One stone, all stones destroyed, equal heaviest stones, repeated differences, duplicate weights.",
      "constraints": "1 <= stones.length <= 30; 1 <= stones[i] <= 1000.",
      "source": {
        "label": "Last Stone Weight - LeetCode 1046",
        "url": "https://leetcode.com/problems/last-stone-weight/"
      },
      "examples": [
        {
          "input": "stones = [2,7,4,1,8,1]",
          "output": "1",
          "explanation": "Repeated smashes leave one stone of weight 1."
        },
        {
          "input": "stones = [1]",
          "output": "1",
          "explanation": "A single stone remains unchanged."
        },
        {
          "input": "stones = [2,2]",
          "output": "0",
          "explanation": "Equal stones destroy each other."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly sort or scan the list to find two largest stones.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Heap operations handle each smash efficiently.",
      "recursiveComplexity": "Time O(n log n); Space O(n) heap plus recursion depth for smashes.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int lastStoneWeight(int[] stones) {\n    List<Integer> list = new ArrayList<>();\n    for (int stone : stones) list.add(stone);\n\n    while (list.size() > 1) {\n      int first = removeMax(list);\n      int second = removeMax(list);\n      if (first != second) list.add(first - second);\n    }\n\n    return list.isEmpty() ? 0 : list.get(0);\n  }\n\n  private int removeMax(List<Integer> list) {\n    int index = 0;\n    for (int i = 1; i < list.size(); i++) if (list.get(i) > list.get(index)) index = i;\n    return list.remove(index);\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int lastStoneWeight(int[] stones) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int stone : stones) heap.offer(stone);\n\n    while (heap.size() > 1) {\n      int first = heap.poll();\n      int second = heap.poll();\n      if (first != second) heap.offer(first - second);\n    }\n\n    return heap.isEmpty() ? 0 : heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int lastStoneWeight(int[] stones) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int stone : stones) heap.offer(stone);\n    return smash(heap);\n  }\n\n  private int smash(PriorityQueue<Integer> heap) {\n    if (heap.isEmpty()) return 0;\n    if (heap.size() == 1) return heap.peek();\n\n    int first = heap.poll();\n    int second = heap.poll();\n    if (first != second) heap.offer(first - second);\n    return smash(heap);\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int lastStoneWeight(int[] stones) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int stone : stones) heap.offer(stone);\n\n    while (heap.size() > 1) {\n      int first = heap.poll();\n      int second = heap.poll();\n      if (first != second) heap.offer(first - second);\n    }\n\n    return heap.isEmpty() ? 0 : heap.peek();\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int lastStoneWeight(int[] stones) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int stone : stones) heap.offer(stone);\n\n    while (heap.size() > 1) {\n      int first = heap.poll();\n      int second = heap.poll();\n      if (first != second) heap.offer(first - second);\n    }\n\n    return heap.isEmpty() ? 0 : heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Largest Element in a Stream",
      "difficulty": "Easy",
      "subpattern": "Streaming top K with min-heap",
      "question": "Design KthLargest, which receives an initial integer stream and an integer k. Each add(val) inserts val into the stream and returns the kth largest element so far.",
      "trigger": "The stream changes incrementally, but only the kth largest is needed after each insert, so a size-k min-heap maintains the top k values.",
      "intuition": "Keep the k largest values in a min-heap. On add, push val and remove the smallest if size exceeds k. Heap top is kth largest.",
      "edgeCases": "Initial nums has fewer than k values, duplicates, negative values, k = 1, added value smaller than kth largest.",
      "constraints": "1 <= k <= 10000; 0 <= nums.length <= 10000; -10000 <= nums[i], val <= 10000; at most 10000 calls to add.",
      "source": {
        "label": "Kth Largest Element in a Stream - LeetCode 703",
        "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/"
      },
      "examples": [
        {
          "input": "KthLargest(3, [4,5,8,2]), add(3), add(5), add(10), add(9), add(4)",
          "output": "[null,4,5,5,8,8]",
          "explanation": "The heap top tracks the 3rd largest after each add."
        },
        {
          "input": "KthLargest(1, []), add(-3), add(-2)",
          "output": "[null,-3,-2]",
          "explanation": "For k = 1, the answer is the current maximum."
        },
        {
          "input": "KthLargest(2, [0]), add(-1), add(1)",
          "output": "[null,-1,0]",
          "explanation": "The stream may initially contain fewer than k values."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(n log n), add Time O(n log n); Space O(n). Store all values and sort after every add.",
      "optimizedComplexity": "Constructor Time O(n log k), add Time O(log k); Space O(k). Heap stores only top k values.",
      "recursiveComplexity": "Constructor Time O(n log k), add Time O(log k); Space O(k + n) if initial insertion is recursive.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass KthLargest {\n  private final int k;\n  private final List<Integer> values = new ArrayList<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int num : nums) values.add(num);\n  }\n\n  public int add(int val) {\n    values.add(val);\n    values.sort(Collections.reverseOrder());\n    return values.get(k - 1);\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass KthLargest {\n  private final int k;\n  private final PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int num : nums) add(num);\n  }\n\n  public int add(int val) {\n    heap.offer(val);\n    if (heap.size() > k) heap.poll();\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.PriorityQueue;\n\nclass KthLargest {\n  private final int k;\n  private final PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    addInitial(nums, 0);\n  }\n\n  public int add(int val) {\n    heap.offer(val);\n    if (heap.size() > k) heap.poll();\n    return heap.peek();\n  }\n\n  private void addInitial(int[] nums, int index) {\n    if (index == nums.length) return;\n    add(nums[index]);\n    addInitial(nums, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass KthLargest {\n  private final int k;\n  private final PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int num : nums) add(num);\n  }\n\n  public int add(int val) {\n    heap.offer(val);\n    if (heap.size() > k) heap.poll();\n    return heap.peek();\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass KthLargest {\n  private final int k;\n  private final PriorityQueue<Integer> heap = new PriorityQueue<>();\n\n  public KthLargest(int k, int[] nums) {\n    this.k = k;\n    for (int num : nums) add(num);\n  }\n\n  public int add(int val) {\n    heap.offer(val);\n    if (heap.size() > k) heap.poll();\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Median from Data Stream",
      "difficulty": "Hard",
      "subpattern": "Streaming median with two heaps",
      "question": "Design MedianFinder, which supports addNum(num) and findMedian(). findMedian returns the median of all numbers inserted so far.",
      "trigger": "The median needs quick access to the largest value in the lower half and the smallest value in the upper half while the stream changes.",
      "intuition": "Use a max-heap for the lower half and a min-heap for the upper half. Keep sizes balanced so the median is either one heap top or the average of both tops.",
      "edgeCases": "First number, even count, odd count, duplicate values, negative values, values arriving sorted or reverse sorted.",
      "constraints": "-100000 <= num <= 100000; at most 50000 calls are made; findMedian is called after at least one addNum.",
      "source": {
        "label": "Find Median from Data Stream - LeetCode 295",
        "url": "https://leetcode.com/problems/find-median-from-data-stream/"
      },
      "examples": [
        {
          "input": "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()",
          "output": "[null,null,1.5,null,2.0]",
          "explanation": "Median changes from average of 1 and 2 to middle value 2."
        },
        {
          "input": "addNum(-1), addNum(-2), findMedian()",
          "output": "[null,null,-1.5]",
          "explanation": "Negative values are handled normally."
        },
        {
          "input": "addNum(5), findMedian()",
          "output": "[null,5.0]",
          "explanation": "One inserted number is the median."
        }
      ],
      "bruteForceComplexity": "addNum Time O(1), findMedian Time O(n log n); Space O(n). Store all values and sort on every median query.",
      "optimizedComplexity": "addNum Time O(log n), findMedian Time O(1); Space O(n). Two heaps maintain lower and upper halves.",
      "recursiveComplexity": "addNum Time O(log n), findMedian Time O(1); Space O(n) plus recursion if initial insertions are recursive.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass MedianFinder {\n  private final List<Integer> values = new ArrayList<>();\n\n  public void addNum(int num) {\n    values.add(num);\n  }\n\n  public double findMedian() {\n    Collections.sort(values);\n    int n = values.size();\n    if (n % 2 == 1) return values.get(n / 2);\n    return (values.get(n / 2 - 1) + values.get(n / 2)) / 2.0;\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue<Integer> lower = new PriorityQueue<>((a, b) -> b - a);\n  private final PriorityQueue<Integer> upper = new PriorityQueue<>();\n\n  public void addNum(int num) {\n    if (lower.isEmpty() || num <= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n\n    if (lower.size() > upper.size() + 1) upper.offer(lower.poll());\n    else if (upper.size() > lower.size()) lower.offer(upper.poll());\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n}",
      "recursiveCode": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue<Integer> lower = new PriorityQueue<>((a, b) -> b - a);\n  private final PriorityQueue<Integer> upper = new PriorityQueue<>();\n\n  public void addNum(int num) {\n    insert(num);\n    balance();\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n\n  private void insert(int num) {\n    if (lower.isEmpty() || num <= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n  }\n\n  private void balance() {\n    if (lower.size() > upper.size() + 1) {\n      upper.offer(lower.poll());\n      balance();\n    } else if (upper.size() > lower.size()) {\n      lower.offer(upper.poll());\n      balance();\n    }\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue<Integer> lower = new PriorityQueue<>((a, b) -> b - a);\n  private final PriorityQueue<Integer> upper = new PriorityQueue<>();\n\n  public void addNum(int num) {\n    if (lower.isEmpty() || num <= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n\n    if (lower.size() > upper.size() + 1) upper.offer(lower.poll());\n    else if (upper.size() > lower.size()) lower.offer(upper.poll());\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue<Integer> lower = new PriorityQueue<>((a, b) -> b - a);\n  private final PriorityQueue<Integer> upper = new PriorityQueue<>();\n\n  public void addNum(int num) {\n    if (lower.isEmpty() || num <= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n\n    if (lower.size() > upper.size() + 1) upper.offer(lower.poll());\n    else if (upper.size() > lower.size()) lower.offer(upper.poll());\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge k Sorted Lists",
      "difficulty": "Hard",
      "subpattern": "K-way merge with min-heap",
      "question": "Given an array of k linked-list heads where each list is sorted in ascending order, merge all lists into one sorted linked list and return its head.",
      "trigger": "At every step, the smallest current head among k sorted lists is needed, which is exactly a min-heap selection problem.",
      "intuition": "Push each non-null list head into a min-heap by node value. Pop the smallest node, append it, and push its next node if it exists.",
      "edgeCases": "No lists, all lists empty, one list, duplicate values, many lists with one node.",
      "constraints": "0 <= lists.length <= 10000; total nodes <= 10000; -10000 <= Node.val <= 10000; each list is sorted.",
      "source": {
        "label": "Merge k Sorted Lists - LeetCode 23",
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
      },
      "examples": [
        {
          "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
          "output": "[1,1,2,3,4,4,5,6]",
          "explanation": "The min-heap repeatedly selects the smallest current list node."
        },
        {
          "input": "lists = []",
          "output": "[]",
          "explanation": "No lists produce an empty result."
        },
        {
          "input": "lists = [[]]",
          "output": "[]",
          "explanation": "An empty list contributes no nodes."
        }
      ],
      "bruteForceComplexity": "Time O(N log N); Space O(N). Collect all values, sort them, and build a new list.",
      "optimizedComplexity": "Time O(N log k); Space O(k). The heap stores at most one active node per list.",
      "recursiveComplexity": "Time O(N log k); Space O(log k) for divide-and-conquer recursion, or O(N) for recursive merge calls.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode head : lists) {\n      for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    }\n    Collections.sort(values);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : values) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);\n    for (ListNode head : lists) if (head != null) heap.offer(head);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    if (lists == null || lists.length == 0) return null;\n    return mergeRange(lists, 0, lists.length - 1);\n  }\n\n  private ListNode mergeRange(ListNode[] lists, int left, int right) {\n    if (left == right) return lists[left];\n    int mid = left + (right - left) / 2;\n    return mergeTwo(mergeRange(lists, left, mid), mergeRange(lists, mid + 1, right));\n  }\n\n  private ListNode mergeTwo(ListNode a, ListNode b) {\n    if (a == null) return b;\n    if (b == null) return a;\n    if (a.val <= b.val) {\n      a.next = mergeTwo(a.next, b);\n      return a;\n    }\n    b.next = mergeTwo(a, b.next);\n    return b;\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);\n    for (ListNode head : lists) if (head != null) heap.offer(head);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);\n    for (ListNode head : lists) if (head != null) heap.offer(head);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Smallest Element in a Sorted Matrix",
      "difficulty": "Medium",
      "subpattern": "K-way merge across sorted matrix rows",
      "question": "Given an n x n matrix where each row and column is sorted in ascending order, return the kth smallest element in the matrix.",
      "trigger": "Each row is sorted, so the matrix can be treated as k-way merging sorted rows using a min-heap of row candidates.",
      "intuition": "Push the first element of each row. Pop the smallest element k times, and after popping from a row, push the next column from that same row.",
      "edgeCases": "k = 1, k = n*n, duplicate values, one-row matrix, negative values.",
      "constraints": "1 <= n <= 300; -1000000000 <= matrix[i][j] <= 1000000000; rows and columns are sorted; 1 <= k <= n^2.",
      "source": {
        "label": "Kth Smallest Element in a Sorted Matrix - LeetCode 378",
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
      },
      "examples": [
        {
          "input": "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8",
          "output": "13",
          "explanation": "The sorted order has 13 as the 8th element."
        },
        {
          "input": "matrix = [[-5]], k = 1",
          "output": "-5",
          "explanation": "The only element is the answer."
        },
        {
          "input": "matrix = [[1,2],[1,3]], k = 2",
          "output": "1",
          "explanation": "Duplicates count separately."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 log n^2); Space O(n^2). Flatten the matrix and sort all values.",
      "optimizedComplexity": "Time O(k log n); Space O(n). The heap stores at most one candidate per row.",
      "recursiveComplexity": "Time O(k log n); Space O(n + k) if heap pops are performed recursively.",
      "bruteForceCode": "import java.util.Arrays;\n\nclass Solution {\n  public int kthSmallest(int[][] matrix, int k) {\n    int n = matrix.length;\n    int[] values = new int[n * n];\n    int index = 0;\n\n    for (int[] row : matrix) {\n      for (int value : row) values[index++] = value;\n    }\n\n    Arrays.sort(values);\n    return values[k - 1];\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int kthSmallest(int[][] matrix, int k) {\n    int n = matrix.length;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n\n    for (int row = 0; row < n; row++) {\n      heap.offer(new int[] {matrix[row][0], row, 0});\n    }\n\n    int value = 0;\n    while (k-- > 0) {\n      int[] current = heap.poll();\n      value = current[0];\n      int row = current[1], col = current[2];\n      if (col + 1 < n) heap.offer(new int[] {matrix[row][col + 1], row, col + 1});\n    }\n\n    return value;\n  }\n}",
      "recursiveCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int kthSmallest(int[][] matrix, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    for (int row = 0; row < matrix.length; row++) heap.offer(new int[] {matrix[row][0], row, 0});\n    return popK(matrix, heap, k);\n  }\n\n  private int popK(int[][] matrix, PriorityQueue<int[]> heap, int k) {\n    int[] current = heap.poll();\n    int value = current[0];\n    int row = current[1], col = current[2];\n    if (col + 1 < matrix.length) heap.offer(new int[] {matrix[row][col + 1], row, col + 1});\n    if (k == 1) return value;\n    return popK(matrix, heap, k - 1);\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int kthSmallest(int[][] matrix, int k) {\n    int n = matrix.length;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n\n    for (int row = 0; row < n; row++) {\n      heap.offer(new int[] {matrix[row][0], row, 0});\n    }\n\n    int value = 0;\n    while (k-- > 0) {\n      int[] current = heap.poll();\n      value = current[0];\n      int row = current[1], col = current[2];\n      if (col + 1 < n) heap.offer(new int[] {matrix[row][col + 1], row, col + 1});\n    }\n\n    return value;\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int kthSmallest(int[][] matrix, int k) {\n    int n = matrix.length;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n\n    for (int row = 0; row < n; row++) {\n      heap.offer(new int[] {matrix[row][0], row, 0});\n    }\n\n    int value = 0;\n    while (k-- > 0) {\n      int[] current = heap.poll();\n      value = current[0];\n      int row = current[1], col = current[2];\n      if (col + 1 < n) heap.offer(new int[] {matrix[row][col + 1], row, col + 1});\n    }\n\n    return value;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Task Scheduler",
      "difficulty": "Medium",
      "subpattern": "Max-heap with cooldown queue",
      "question": "Given CPU tasks represented by capital letters and cooldown n, return the least number of intervals needed to finish all tasks so identical tasks are separated by at least n intervals.",
      "trigger": "At each interval, the best task is the available one with highest remaining count, while recently used tasks must wait in cooldown.",
      "intuition": "Use a max-heap for available task counts and a queue for tasks cooling down with their next available time. Simulate intervals until both are empty.",
      "edgeCases": "n = 0, all tasks same, all tasks unique, multiple tasks tied by frequency, idle intervals required.",
      "constraints": "1 <= tasks.length <= 10000; tasks[i] is uppercase English letter; 0 <= n <= 100.",
      "source": {
        "label": "Task Scheduler - LeetCode 621",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      "examples": [
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
          "output": "8",
          "explanation": "A valid schedule is A B idle A B idle A B."
        },
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0",
          "output": "6",
          "explanation": "No cooldown means no idle intervals."
        },
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"A\",\"B\",\"C\"], n = 2",
          "output": "10",
          "explanation": "The frequent A task forces idle slots."
        }
      ],
      "bruteForceComplexity": "Time O(time * 26); Space O(26). Scan all task counts each interval to pick an available task.",
      "optimizedComplexity": "Time O(time log 26); Space O(26). Heap and cooldown queue keep task choices efficient.",
      "recursiveComplexity": "Time O(time log 26); Space O(time) recursion stack if simulating recursively.",
      "bruteForceCode": "class Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    int[] next = new int[26];\n    for (char task : tasks) count[task - 'A']++;\n\n    int remaining = tasks.length;\n    int time = 0;\n    while (remaining > 0) {\n      int best = -1;\n      for (int i = 0; i < 26; i++) {\n        if (count[i] > 0 && next[i] <= time && (best == -1 || count[i] > count[best])) best = i;\n      }\n      if (best != -1) {\n        count[best]--;\n        next[best] = time + n + 1;\n        remaining--;\n      }\n      time++;\n    }\n    return time;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n\n    Queue<int[]> cooldown = new ArrayDeque<>();\n    int time = 0;\n\n    while (!heap.isEmpty() || !cooldown.isEmpty()) {\n      time++;\n      if (!heap.isEmpty()) {\n        int remaining = heap.poll() - 1;\n        if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n      }\n      if (!cooldown.isEmpty() && cooldown.peek()[1] == time) heap.offer(cooldown.poll()[0]);\n    }\n\n    return time;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n    return simulate(heap, new ArrayDeque<>(), n, 0);\n  }\n\n  private int simulate(PriorityQueue<Integer> heap, Queue<int[]> cooldown, int n, int time) {\n    if (heap.isEmpty() && cooldown.isEmpty()) return time;\n    time++;\n    if (!heap.isEmpty()) {\n      int remaining = heap.poll() - 1;\n      if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n    }\n    if (!cooldown.isEmpty() && cooldown.peek()[1] == time) heap.offer(cooldown.poll()[0]);\n    return simulate(heap, cooldown, n, time);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n\n    Queue<int[]> cooldown = new ArrayDeque<>();\n    int time = 0;\n\n    while (!heap.isEmpty() || !cooldown.isEmpty()) {\n      time++;\n      if (!heap.isEmpty()) {\n        int remaining = heap.poll() - 1;\n        if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n      }\n      if (!cooldown.isEmpty() && cooldown.peek()[1] == time) heap.offer(cooldown.poll()[0]);\n    }\n\n    return time;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n\n    Queue<int[]> cooldown = new ArrayDeque<>();\n    int time = 0;\n\n    while (!heap.isEmpty() || !cooldown.isEmpty()) {\n      time++;\n      if (!heap.isEmpty()) {\n        int remaining = heap.poll() - 1;\n        if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n      }\n      if (!cooldown.isEmpty() && cooldown.peek()[1] == time) heap.offer(cooldown.poll()[0]);\n    }\n\n    return time;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reorganize String",
      "difficulty": "Medium",
      "subpattern": "Greedy max-heap by character frequency",
      "question": "Given a string s, rearrange its characters so that no two adjacent characters are the same. Return any valid rearrangement, or an empty string if impossible.",
      "trigger": "The most frequent remaining character should be used greedily, but the previously used character must be temporarily withheld to avoid adjacency.",
      "intuition": "Use a max-heap by frequency. Each step picks the most frequent available character, appends it, decreases its count, and re-adds the previous held character.",
      "edgeCases": "Impossible frequency greater than half length rounded up, one character, all unique characters, repeated ties, odd length strings.",
      "constraints": "1 <= s.length <= 500; s consists of lowercase English letters.",
      "source": {
        "label": "Reorganize String - LeetCode 767",
        "url": "https://leetcode.com/problems/reorganize-string/"
      },
      "examples": [
        {
          "input": "s = \"aab\"",
          "output": "\"aba\"",
          "explanation": "No adjacent characters are equal."
        },
        {
          "input": "s = \"aaab\"",
          "output": "\"\"",
          "explanation": "a appears too often to separate."
        },
        {
          "input": "s = \"vvvlo\"",
          "output": "\"vlvov\"",
          "explanation": "Any valid non-adjacent arrangement is accepted."
        }
      ],
      "bruteForceComplexity": "Time O(n * 26); Space O(26). Repeatedly scan all counts for the best character not equal to previous.",
      "optimizedComplexity": "Time O(n log 26); Space O(26). Heap picks the highest remaining frequency efficiently.",
      "recursiveComplexity": "Time O(n log 26); Space O(n) recursion stack plus heap state.",
      "bruteForceCode": "class Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char ch : s.toCharArray()) count[ch - 'a']++;\n\n    StringBuilder result = new StringBuilder();\n    char previous = '#';\n\n    for (int pos = 0; pos < s.length(); pos++) {\n      int best = -1;\n      for (int i = 0; i < 26; i++) {\n        if (count[i] > 0 && (char) ('a' + i) != previous && (best == -1 || count[i] > count[best])) best = i;\n      }\n      if (best == -1) return \"\";\n      result.append((char) ('a' + best));\n      previous = (char) ('a' + best);\n      count[best]--;\n    }\n\n    return result.toString();\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char ch : s.toCharArray()) count[ch - 'a']++;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n\n    StringBuilder result = new StringBuilder();\n    int[] previous = null;\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      result.append((char) ('a' + current[0]));\n      current[1]--;\n\n      if (previous != null && previous[1] > 0) heap.offer(previous);\n      previous = current;\n    }\n\n    return result.length() == s.length() ? result.toString() : \"\";\n  }\n}",
      "recursiveCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char ch : s.toCharArray()) count[ch - 'a']++;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n\n    String result = build(heap, null, new StringBuilder(), s.length());\n    return result.length() == s.length() ? result : \"\";\n  }\n\n  private String build(PriorityQueue<int[]> heap, int[] previous, StringBuilder result, int targetLength) {\n    if (result.length() == targetLength || heap.isEmpty()) return result.toString();\n\n    int[] current = heap.poll();\n    result.append((char) ('a' + current[0]));\n    current[1]--;\n\n    if (previous != null && previous[1] > 0) heap.offer(previous);\n    return build(heap, current, result, targetLength);\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char ch : s.toCharArray()) count[ch - 'a']++;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n\n    StringBuilder result = new StringBuilder();\n    int[] previous = null;\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      result.append((char) ('a' + current[0]));\n      current[1]--;\n\n      if (previous != null && previous[1] > 0) heap.offer(previous);\n      previous = current;\n    }\n\n    return result.length() == s.length() ? result.toString() : \"\";\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char ch : s.toCharArray()) count[ch - 'a']++;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n\n    StringBuilder result = new StringBuilder();\n    int[] previous = null;\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      result.append((char) ('a' + current[0]));\n      current[1]--;\n\n      if (previous != null && previous[1] > 0) heap.offer(previous);\n      previous = current;\n    }\n\n    return result.length() == s.length() ? result.toString() : \"\";\n  }\n}"
    },
    {
      "group": "core",
      "name": "Meeting Rooms II",
      "difficulty": "Medium",
      "subpattern": "Interval scheduling with min-heap of end times",
      "question": "Given an array of meeting time intervals where intervals[i] = [start, end], return the minimum number of conference rooms required so that all meetings can take place.",
      "trigger": "The problem asks for the maximum number of overlapping intervals, and the earliest ending active meeting decides whether a room can be reused.",
      "intuition": "Sort meetings by start time. Keep active meeting end times in a min-heap. Reuse a room when the smallest end time is <= the next start; otherwise allocate another room.",
      "edgeCases": "No meetings, one meeting, meetings touching at boundaries such as [1,2] and [2,3], fully overlapping meetings, already sorted input, duplicate start times.",
      "constraints": "0 <= intervals.length <= 10000; 0 <= start < end <= 1000000.",
      "source": {
        "label": "Meeting Rooms II - LintCode 919",
        "url": "https://www.lintcode.com/problem/919/"
      },
      "examples": [
        {
          "input": "intervals = [[0,30],[5,10],[15,20]]",
          "output": "2",
          "explanation": "[5,10] and [15,20] can reuse one room, while [0,30] needs another."
        },
        {
          "input": "intervals = [[7,10],[2,4]]",
          "output": "1",
          "explanation": "The meetings do not overlap."
        },
        {
          "input": "intervals = [[1,5],[2,6],[3,7]]",
          "output": "3",
          "explanation": "All three meetings overlap around time 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2): test every meeting start against all intervals; Space O(1).",
      "optimizedComplexity": "Time O(n log n): sort plus heap operations; Space O(n) for active meeting end times.",
      "recursiveComplexity": "Time O(n log n): same heap decisions made recursively; Space O(n) heap plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    if (intervals == null || intervals.length == 0) return 0;\n    int rooms = 0;\n\n    for (int[] point : intervals) {\n      int time = point[0];\n      int active = 0;\n\n      for (int[] meeting : intervals) {\n        if (meeting[0] <= time && time < meeting[1]) {\n          active++;\n        }\n      }\n      rooms = Math.max(rooms, active);\n    }\n\n    return rooms;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    if (intervals == null || intervals.length == 0) return 0;\n\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() && activeEnds.peek() <= meeting[0]) {\n        activeEnds.poll();\n      }\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n\n    return rooms;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    if (intervals == null || intervals.length == 0) return 0;\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    return schedule(intervals, 0, new PriorityQueue<>(), 0);\n  }\n\n  private int schedule(int[][] intervals, int index, PriorityQueue<Integer> activeEnds, int best) {\n    if (index == intervals.length) return best;\n\n    int[] meeting = intervals[index];\n    while (!activeEnds.isEmpty() && activeEnds.peek() <= meeting[0]) {\n      activeEnds.poll();\n    }\n    activeEnds.offer(meeting[1]);\n\n    return schedule(intervals, index + 1, activeEnds, Math.max(best, activeEnds.size()));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    if (intervals == null || intervals.length == 0) return 0;\n\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() && activeEnds.peek() <= meeting[0]) {\n        activeEnds.poll();\n      }\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n\n    return rooms;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    if (intervals == null || intervals.length == 0) return 0;\n\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() && activeEnds.peek() <= meeting[0]) {\n        activeEnds.poll();\n      }\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n\n    return rooms;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find K Pairs with Smallest Sums",
      "difficulty": "Medium",
      "subpattern": "Top K pair sums with min-heap frontier",
      "question": "Given two sorted integer arrays nums1 and nums2 and an integer k, return the k pairs (u, v) with the smallest sums, where u comes from nums1 and v comes from nums2.",
      "trigger": "The arrays are sorted and the answer needs the next smallest pair repeatedly, so a min-heap can expand only the next best frontier instead of enumerating every pair.",
      "intuition": "Seed the heap with pairs using nums2[0]. Each time the smallest pair is removed, push the same nums1 index paired with the next nums2 index.",
      "edgeCases": "Either array empty, k = 0, k larger than total pairs, duplicate values, negative numbers, arrays of very different sizes.",
      "constraints": "1 <= nums1.length, nums2.length <= 100000; -1000000000 <= nums[i] <= 1000000000; 1 <= k <= 10000.",
      "source": {
        "label": "Find K Pairs with Smallest Sums - LeetCode 373",
        "url": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/"
      },
      "examples": [
        {
          "input": "nums1 = [1,7,11], nums2 = [2,4,6], k = 3",
          "output": "[[1,2],[1,4],[1,6]]",
          "explanation": "The three smallest sums are 3, 5, and 7."
        },
        {
          "input": "nums1 = [1,1,2], nums2 = [1,2,3], k = 2",
          "output": "[[1,1],[1,1]]",
          "explanation": "Duplicate pairs from different indexes are valid."
        },
        {
          "input": "nums1 = [1,2], nums2 = [3], k = 3",
          "output": "[[1,3],[2,3]]",
          "explanation": "Only two pairs exist."
        }
      ],
      "bruteForceComplexity": "Time O(n*m log(n*m)): generate and sort every pair; Space O(n*m).",
      "optimizedComplexity": "Time O(min(k,n) + k log min(k,n)): heap frontier only; Space O(min(k,n)).",
      "recursiveComplexity": "Time O(min(k,n) + k log min(k,n)): recursive extraction from the same frontier; Space O(min(k,n) + k) including recursion stack and output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {\n    List<int[]> all = new ArrayList<>();\n    for (int a : nums1) {\n      for (int b : nums2) {\n        all.add(new int[] {a, b});\n      }\n    }\n\n    all.sort((x, y) -> Integer.compare(x[0] + x[1], y[0] + y[1]));\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int i = 0; i < Math.min(k, all.size()); i++) {\n      answer.add(Arrays.asList(all.get(i)[0], all.get(i)[1]));\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (nums1.length == 0 || nums2.length == 0 || k == 0) return answer;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(nums1[a[0]] + nums2[a[1]], nums1[b[0]] + nums2[b[1]]));\n\n    for (int i = 0; i < Math.min(nums1.length, k); i++) {\n      heap.offer(new int[] {i, 0});\n    }\n\n    while (k-- > 0 && !heap.isEmpty()) {\n      int[] current = heap.poll();\n      int i = current[0], j = current[1];\n      answer.add(Arrays.asList(nums1[i], nums2[j]));\n      if (j + 1 < nums2.length) {\n        heap.offer(new int[] {i, j + 1});\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (nums1.length == 0 || nums2.length == 0 || k == 0) return answer;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(nums1[a[0]] + nums2[a[1]], nums1[b[0]] + nums2[b[1]]));\n    for (int i = 0; i < Math.min(nums1.length, k); i++) {\n      heap.offer(new int[] {i, 0});\n    }\n\n    collect(nums1, nums2, k, heap, answer);\n    return answer;\n  }\n\n  private void collect(int[] nums1, int[] nums2, int remaining,\n      PriorityQueue<int[]> heap, List<List<Integer>> answer) {\n    if (remaining == 0 || heap.isEmpty()) return;\n\n    int[] current = heap.poll();\n    int i = current[0], j = current[1];\n    answer.add(Arrays.asList(nums1[i], nums2[j]));\n    if (j + 1 < nums2.length) {\n      heap.offer(new int[] {i, j + 1});\n    }\n\n    collect(nums1, nums2, remaining - 1, heap, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (nums1.length == 0 || nums2.length == 0 || k == 0) return answer;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(nums1[a[0]] + nums2[a[1]], nums1[b[0]] + nums2[b[1]]));\n\n    for (int i = 0; i < Math.min(nums1.length, k); i++) {\n      heap.offer(new int[] {i, 0});\n    }\n\n    while (k-- > 0 && !heap.isEmpty()) {\n      int[] current = heap.poll();\n      int i = current[0], j = current[1];\n      answer.add(Arrays.asList(nums1[i], nums2[j]));\n      if (j + 1 < nums2.length) {\n        heap.offer(new int[] {i, j + 1});\n      }\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    if (nums1.length == 0 || nums2.length == 0 || k == 0) return answer;\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(nums1[a[0]] + nums2[a[1]], nums1[b[0]] + nums2[b[1]]));\n\n    for (int i = 0; i < Math.min(nums1.length, k); i++) {\n      heap.offer(new int[] {i, 0});\n    }\n\n    while (k-- > 0 && !heap.isEmpty()) {\n      int[] current = heap.poll();\n      int i = current[0], j = current[1];\n      answer.add(Arrays.asList(nums1[i], nums2[j]));\n      if (j + 1 < nums2.length) {\n        heap.offer(new int[] {i, j + 1});\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "IPO",
      "difficulty": "Hard",
      "subpattern": "Greedy project selection with max-heap",
      "question": "Given k, initial capital w, arrays profits and capital, choose at most k projects. A project can be chosen only if capital[i] <= current capital. Return the maximum final capital.",
      "trigger": "Each round needs the highest profit among currently affordable projects, while more projects become affordable as capital grows.",
      "intuition": "Sort projects by required capital. Move all affordable profits into a max-heap, then pick the largest profit for the current round.",
      "edgeCases": "No affordable project, k = 0, zero-profit projects, repeated capital requirements, capital already enough for all projects, profits with large sums.",
      "constraints": "1 <= k <= 100000; 0 <= w <= 1000000000; profits.length == capital.length <= 100000; 0 <= profits[i], capital[i] <= 1000000000.",
      "source": {
        "label": "IPO - LeetCode 502",
        "url": "https://leetcode.com/problems/ipo/"
      },
      "examples": [
        {
          "input": "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]",
          "output": "4",
          "explanation": "Pick profit 1 first, then profit 3."
        },
        {
          "input": "k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]",
          "output": "6",
          "explanation": "Each selected project unlocks the next one."
        },
        {
          "input": "k = 1, w = 0, profits = [1,2], capital = [1,1]",
          "output": "0",
          "explanation": "No project is affordable initially."
        }
      ],
      "bruteForceComplexity": "Time O(k*n): scan all unused projects in every round; Space O(n) for chosen flags.",
      "optimizedComplexity": "Time O(n log n + k log n): sort projects and select from max-heap; Space O(n).",
      "recursiveComplexity": "Time O(n log n + k log n): recursive rounds over the same sorted list and heap; Space O(n + k) including recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n    boolean[] used = new boolean[profits.length];\n\n    for (int round = 0; round < k; round++) {\n      int best = -1;\n      for (int i = 0; i < profits.length; i++) {\n        if (!used[i] && capital[i] <= w && (best == -1 || profits[i] > profits[best])) {\n          best = i;\n        }\n      }\n      if (best == -1) break;\n      used[best] = true;\n      w += profits[best];\n    }\n\n    return w;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n    int n = profits.length;\n    int[][] projects = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      projects[i] = new int[] {capital[i], profits[i]};\n    }\n    Arrays.sort(projects, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<Integer> affordable = new PriorityQueue<>(Collections.reverseOrder());\n    int index = 0;\n\n    for (int round = 0; round < k; round++) {\n      while (index < n && projects[index][0] <= w) {\n        affordable.offer(projects[index++][1]);\n      }\n      if (affordable.isEmpty()) break;\n      w += affordable.poll();\n    }\n\n    return w;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n    int[][] projects = new int[profits.length][2];\n    for (int i = 0; i < profits.length; i++) {\n      projects[i] = new int[] {capital[i], profits[i]};\n    }\n    Arrays.sort(projects, (a, b) -> Integer.compare(a[0], b[0]));\n    return choose(k, w, projects, 0, new PriorityQueue<>(Collections.reverseOrder()));\n  }\n\n  private int choose(int remaining, int capital, int[][] projects, int index,\n      PriorityQueue<Integer> affordable) {\n    while (index < projects.length && projects[index][0] <= capital) {\n      affordable.offer(projects[index++][1]);\n    }\n    if (remaining == 0 || affordable.isEmpty()) return capital;\n\n    return choose(remaining - 1, capital + affordable.poll(), projects, index, affordable);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n    int n = profits.length;\n    int[][] projects = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      projects[i] = new int[] {capital[i], profits[i]};\n    }\n    Arrays.sort(projects, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<Integer> affordable = new PriorityQueue<>(Collections.reverseOrder());\n    int index = 0;\n\n    for (int round = 0; round < k; round++) {\n      while (index < n && projects[index][0] <= w) {\n        affordable.offer(projects[index++][1]);\n      }\n      if (affordable.isEmpty()) break;\n      w += affordable.poll();\n    }\n\n    return w;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n    int n = profits.length;\n    int[][] projects = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      projects[i] = new int[] {capital[i], profits[i]};\n    }\n    Arrays.sort(projects, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<Integer> affordable = new PriorityQueue<>(Collections.reverseOrder());\n    int index = 0;\n\n    for (int round = 0; round < k; round++) {\n      while (index < n && projects[index][0] <= w) {\n        affordable.offer(projects[index++][1]);\n      }\n      if (affordable.isEmpty()) break;\n      w += affordable.poll();\n    }\n\n    return w;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Smallest Range Covering Elements from K Lists",
      "difficulty": "Hard",
      "subpattern": "K-way merge range tracking with min-heap",
      "question": "Given k sorted lists of integers, return the smallest inclusive range [left, right] that contains at least one number from each list. If ranges tie by length, choose the one with smaller left.",
      "trigger": "The range must include one value from every sorted list, and advancing the current minimum is the only move that can shrink or improve the range.",
      "intuition": "Put the first value of every list in a min-heap and track the current maximum. The heap minimum and current maximum define a valid range; advance the list that owns the minimum.",
      "edgeCases": "One list, duplicate values across lists, negative numbers, lists with different sizes, same best range length, very large value gaps.",
      "constraints": "1 <= nums.length <= 3500; 1 <= nums[i].length; -100000 <= nums[i][j] <= 100000; each list is sorted nondecreasing.",
      "source": {
        "label": "Smallest Range Covering Elements from K Lists - LeetCode 632",
        "url": "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/"
      },
      "examples": [
        {
          "input": "nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]",
          "output": "[20,24]",
          "explanation": "20, 24, and 22 cover all three lists with the smallest range."
        },
        {
          "input": "nums = [[1,2,3],[1,2,3],[1,2,3]]",
          "output": "[1,1]",
          "explanation": "The same value appears in every list."
        },
        {
          "input": "nums = [[1],[2],[3]]",
          "output": "[1,3]",
          "explanation": "Each list contributes its only element."
        }
      ],
      "bruteForceComplexity": "Time O(total^2): flatten, sort, and test candidate windows directly; Space O(total).",
      "optimizedComplexity": "Time O(total log k): each element enters/leaves the heap at most once; Space O(k).",
      "recursiveComplexity": "Time O(total log k): recursive heap advancement; Space O(k + total) in worst case due to recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] smallestRange(List<List<Integer>> nums) {\n    List<int[]> values = new ArrayList<>();\n    for (int list = 0; list < nums.size(); list++) {\n      for (int value : nums.get(list)) {\n        values.add(new int[] {value, list});\n      }\n    }\n    values.sort((a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] best = {values.get(0)[0], values.get(values.size() - 1)[0]};\n    for (int left = 0; left < values.size(); left++) {\n      boolean[] seen = new boolean[nums.size()];\n      int covered = 0;\n      for (int right = left; right < values.size(); right++) {\n        int list = values.get(right)[1];\n        if (!seen[list]) {\n          seen[list] = true;\n          covered++;\n        }\n        if (covered == nums.size()) {\n          int start = values.get(left)[0], end = values.get(right)[0];\n          if (end - start < best[1] - best[0]) best = new int[] {start, end};\n          break;\n        }\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] smallestRange(List<List<Integer>> nums) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    int currentMax = Integer.MIN_VALUE;\n\n    for (int i = 0; i < nums.size(); i++) {\n      int value = nums.get(i).get(0);\n      heap.offer(new int[] {value, i, 0});\n      currentMax = Math.max(currentMax, value);\n    }\n\n    int bestLeft = 0, bestRight = Integer.MAX_VALUE;\n    while (heap.size() == nums.size()) {\n      int[] min = heap.poll();\n      if (currentMax - min[0] < bestRight - bestLeft) {\n        bestLeft = min[0];\n        bestRight = currentMax;\n      }\n\n      int nextIndex = min[2] + 1;\n      if (nextIndex == nums.get(min[1]).size()) break;\n      int nextValue = nums.get(min[1]).get(nextIndex);\n      heap.offer(new int[] {nextValue, min[1], nextIndex});\n      currentMax = Math.max(currentMax, nextValue);\n    }\n\n    return new int[] {bestLeft, bestRight};\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] smallestRange(List<List<Integer>> nums) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    int currentMax = Integer.MIN_VALUE;\n\n    for (int i = 0; i < nums.size(); i++) {\n      int value = nums.get(i).get(0);\n      heap.offer(new int[] {value, i, 0});\n      currentMax = Math.max(currentMax, value);\n    }\n\n    return advance(nums, heap, currentMax, new int[] {0, Integer.MAX_VALUE});\n  }\n\n  private int[] advance(List<List<Integer>> nums, PriorityQueue<int[]> heap,\n      int currentMax, int[] best) {\n    if (heap.size() < nums.size()) return best;\n\n    int[] min = heap.poll();\n    if (currentMax - min[0] < best[1] - best[0]) {\n      best = new int[] {min[0], currentMax};\n    }\n\n    int nextIndex = min[2] + 1;\n    if (nextIndex == nums.get(min[1]).size()) return best;\n\n    int nextValue = nums.get(min[1]).get(nextIndex);\n    heap.offer(new int[] {nextValue, min[1], nextIndex});\n    return advance(nums, heap, Math.max(currentMax, nextValue), best);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] smallestRange(List<List<Integer>> nums) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    int currentMax = Integer.MIN_VALUE;\n\n    for (int i = 0; i < nums.size(); i++) {\n      int value = nums.get(i).get(0);\n      heap.offer(new int[] {value, i, 0});\n      currentMax = Math.max(currentMax, value);\n    }\n\n    int bestLeft = 0, bestRight = Integer.MAX_VALUE;\n    while (heap.size() == nums.size()) {\n      int[] min = heap.poll();\n      if (currentMax - min[0] < bestRight - bestLeft) {\n        bestLeft = min[0];\n        bestRight = currentMax;\n      }\n\n      int nextIndex = min[2] + 1;\n      if (nextIndex == nums.get(min[1]).size()) break;\n      int nextValue = nums.get(min[1]).get(nextIndex);\n      heap.offer(new int[] {nextValue, min[1], nextIndex});\n      currentMax = Math.max(currentMax, nextValue);\n    }\n\n    return new int[] {bestLeft, bestRight};\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] smallestRange(List<List<Integer>> nums) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    int currentMax = Integer.MIN_VALUE;\n\n    for (int i = 0; i < nums.size(); i++) {\n      int value = nums.get(i).get(0);\n      heap.offer(new int[] {value, i, 0});\n      currentMax = Math.max(currentMax, value);\n    }\n\n    int bestLeft = 0, bestRight = Integer.MAX_VALUE;\n    while (heap.size() == nums.size()) {\n      int[] min = heap.poll();\n      if (currentMax - min[0] < bestRight - bestLeft) {\n        bestLeft = min[0];\n        bestRight = currentMax;\n      }\n\n      int nextIndex = min[2] + 1;\n      if (nextIndex == nums.get(min[1]).size()) break;\n      int nextValue = nums.get(min[1]).get(nextIndex);\n      heap.offer(new int[] {nextValue, min[1], nextIndex});\n      currentMax = Math.max(currentMax, nextValue);\n    }\n\n    return new int[] {bestLeft, bestRight};\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Cost to Connect Sticks",
      "difficulty": "Medium",
      "subpattern": "Optimal merge pattern with min-heap",
      "question": "Given an array sticks where sticks[i] is the length of a stick, connect all sticks into one stick. Connecting two sticks costs their total length. Return the minimum total cost.",
      "trigger": "The cheapest global cost comes from repeatedly merging the two smallest available sticks, which is exactly a min-heap extraction pattern.",
      "intuition": "Always combine the two smallest sticks first. Push their sum back because the new stick may be used in later merges.",
      "edgeCases": "Zero or one stick, equal lengths, already sorted sticks, very large lengths causing large total cost, many small sticks.",
      "constraints": "1 <= sticks.length <= 10000; 1 <= sticks[i] <= 10000.",
      "source": {
        "label": "Minimum Cost of Ropes - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1"
      },
      "examples": [
        {
          "input": "sticks = [2,4,3]",
          "output": "14",
          "explanation": "Merge 2+3=5, then 4+5=9, total 14."
        },
        {
          "input": "sticks = [1,8,3,5]",
          "output": "30",
          "explanation": "Merge 1+3=4, 4+5=9, 8+9=17, total 30."
        },
        {
          "input": "sticks = [5]",
          "output": "0",
          "explanation": "No connection is needed for one stick."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 log n): repeatedly sort the remaining sticks; Space O(n).",
      "optimizedComplexity": "Time O(n log n): build a min-heap and perform n - 1 merges; Space O(n).",
      "recursiveComplexity": "Time O(n log n): recursive heap merges; Space O(n) heap plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int connectSticks(int[] sticks) {\n    List<Integer> list = new ArrayList<>();\n    for (int stick : sticks) list.add(stick);\n\n    int cost = 0;\n    while (list.size() > 1) {\n      Collections.sort(list);\n      int merged = list.remove(0) + list.remove(0);\n      cost += merged;\n      list.add(merged);\n    }\n\n    return cost;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int connectSticks(int[] sticks) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int stick : sticks) {\n      heap.offer(stick);\n    }\n\n    int cost = 0;\n    while (heap.size() > 1) {\n      int merged = heap.poll() + heap.poll();\n      cost += merged;\n      heap.offer(merged);\n    }\n\n    return cost;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int connectSticks(int[] sticks) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int stick : sticks) {\n      heap.offer(stick);\n    }\n    return merge(heap, 0);\n  }\n\n  private int merge(PriorityQueue<Integer> heap, int cost) {\n    if (heap.size() <= 1) return cost;\n\n    int merged = heap.poll() + heap.poll();\n    heap.offer(merged);\n    return merge(heap, cost + merged);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int connectSticks(int[] sticks) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int stick : sticks) {\n      heap.offer(stick);\n    }\n\n    int cost = 0;\n    while (heap.size() > 1) {\n      int merged = heap.poll() + heap.poll();\n      cost += merged;\n      heap.offer(merged);\n    }\n\n    return cost;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int connectSticks(int[] sticks) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int stick : sticks) {\n      heap.offer(stick);\n    }\n\n    int cost = 0;\n    while (heap.size() > 1) {\n      int merged = heap.poll() + heap.poll();\n      cost += merged;\n      heap.offer(merged);\n    }\n\n    return cost;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Seat Reservation Manager",
      "difficulty": "Medium",
      "subpattern": "Reusable smallest-id allocation with min-heap",
      "question": "Design a system that manages n seats numbered from 1 to n. reserve() returns the smallest-numbered unreserved seat and marks it reserved. unreserve(seatNumber) makes that seat available again.",
      "trigger": "Every reserve operation asks for the smallest currently available id, while unreserve inserts an id back into the available set.",
      "intuition": "Put all available seat numbers in a min-heap. reserve removes the heap top; unreserve pushes the seat number back.",
      "edgeCases": "Repeated reserve calls, unreserving the smallest seat, unreserving a large seat, n = 1, alternating reserve and unreserve operations.",
      "constraints": "1 <= n <= 100000; 1 <= seatNumber <= n; at most 100000 total calls; reserve is called only when a seat is available.",
      "source": {
        "label": "Seat Reservation Manager - LeetCode 1845",
        "url": "https://leetcode.com/problems/seat-reservation-manager/"
      },
      "examples": [
        {
          "input": "SeatManager(5); reserve(); reserve(); unreserve(2); reserve();",
          "output": "[1,2,null,2]",
          "explanation": "Seat 2 becomes the smallest available seat again after unreserve."
        },
        {
          "input": "SeatManager(1); reserve(); unreserve(1); reserve();",
          "output": "[1,null,1]",
          "explanation": "The only seat can be reused."
        },
        {
          "input": "SeatManager(3); reserve(); reserve(); reserve();",
          "output": "[1,2,3]",
          "explanation": "Seats are reserved in increasing order."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(n), reserve Time O(n), unreserve Time O(1); Space O(n).",
      "optimizedComplexity": "Constructor Time O(n log n), reserve Time O(log n), unreserve Time O(log n); Space O(n).",
      "recursiveComplexity": "Constructor Time O(n log n), reserve Time O(log n), unreserve Time O(log n); recursive initializer uses O(n) stack.",
      "bruteForceCode": "class SeatManager {\n  private final boolean[] reserved;\n\n  public SeatManager(int n) {\n    reserved = new boolean[n + 1];\n  }\n\n  public int reserve() {\n    for (int seat = 1; seat < reserved.length; seat++) {\n      if (!reserved[seat]) {\n        reserved[seat] = true;\n        return seat;\n      }\n    }\n    return -1;\n  }\n\n  public void unreserve(int seatNumber) {\n    reserved[seatNumber] = false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass SeatManager {\n  private final PriorityQueue<Integer> available;\n\n  public SeatManager(int n) {\n    available = new PriorityQueue<>();\n    for (int seat = 1; seat <= n; seat++) {\n      available.offer(seat);\n    }\n  }\n\n  public int reserve() {\n    return available.poll();\n  }\n\n  public void unreserve(int seatNumber) {\n    available.offer(seatNumber);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SeatManager {\n  private final PriorityQueue<Integer> available;\n\n  public SeatManager(int n) {\n    available = new PriorityQueue<>();\n    addSeats(1, n);\n  }\n\n  public int reserve() {\n    return available.poll();\n  }\n\n  public void unreserve(int seatNumber) {\n    available.offer(seatNumber);\n  }\n\n  private void addSeats(int seat, int n) {\n    if (seat > n) return;\n    available.offer(seat);\n    addSeats(seat + 1, n);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass SeatManager {\n  private final PriorityQueue<Integer> available;\n\n  public SeatManager(int n) {\n    available = new PriorityQueue<>();\n    for (int seat = 1; seat <= n; seat++) {\n      available.offer(seat);\n    }\n  }\n\n  public int reserve() {\n    return available.poll();\n  }\n\n  public void unreserve(int seatNumber) {\n    available.offer(seatNumber);\n  }\n}",
      "code": "import java.util.*;\n\nclass SeatManager {\n  private final PriorityQueue<Integer> available;\n\n  public SeatManager(int n) {\n    available = new PriorityQueue<>();\n    for (int seat = 1; seat <= n; seat++) {\n      available.offer(seat);\n    }\n  }\n\n  public int reserve() {\n    return available.poll();\n  }\n\n  public void unreserve(int seatNumber) {\n    available.offer(seatNumber);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Process Tasks Using Servers",
      "difficulty": "Medium",
      "subpattern": "Two-heap scheduling by availability and priority",
      "question": "Given servers where servers[i] is the weight of server i and tasks where tasks[j] is the processing time of task j arriving at time j, assign each task to the available server with smallest weight, then smallest index. Return the assigned server index for each task.",
      "trigger": "Tasks arrive over time, busy servers become available later, and each assignment needs the best currently available server.",
      "intuition": "Use one heap for available servers ordered by weight/index and another heap for busy servers ordered by finish time. Advance time when no server is available.",
      "edgeCases": "No server available at current time, multiple servers freeing together, equal server weights, long tasks, tasks arriving while earlier tasks are still running.",
      "constraints": "1 <= servers.length, tasks.length <= 200000; 1 <= servers[i], tasks[j] <= 200000.",
      "source": {
        "label": "Process Tasks Using Servers - LeetCode 1882",
        "url": "https://leetcode.com/problems/process-tasks-using-servers/"
      },
      "examples": [
        {
          "input": "servers = [3,3,2], tasks = [1,2,3,2,1,2]",
          "output": "[2,2,0,2,1,2]",
          "explanation": "Server 2 has the smallest weight, then other servers are chosen by availability and index."
        },
        {
          "input": "servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]",
          "output": "[1,4,1,4,1,3,2]",
          "explanation": "The available heap chooses smallest weight, then smallest index."
        },
        {
          "input": "servers = [1], tasks = [5,1,1]",
          "output": "[0,0,0]",
          "explanation": "Time jumps to when the only server is free."
        }
      ],
      "bruteForceComplexity": "Time O(m*n + m^2) in direct simulation; Space O(n + m).",
      "optimizedComplexity": "Time O((n + m) log n): each server transition uses a heap; Space O(n).",
      "recursiveComplexity": "Time O((n + m) log n): recursive task assignment over the same heaps; Space O(n + m) including recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] assignTasks(int[] servers, int[] tasks) {\n    int[] answer = new int[tasks.length];\n    long[] freeAt = new long[servers.length];\n\n    for (int task = 0; task < tasks.length; task++) {\n      long time = task;\n      int best = findBestServer(servers, freeAt, time);\n      while (best == -1) {\n        time++;\n        best = findBestServer(servers, freeAt, time);\n      }\n      answer[task] = best;\n      freeAt[best] = time + tasks[task];\n    }\n\n    return answer;\n  }\n\n  private int findBestServer(int[] servers, long[] freeAt, long time) {\n    int best = -1;\n    for (int i = 0; i < servers.length; i++) {\n      if (freeAt[i] <= time && (best == -1 || servers[i] < servers[best]\n          || (servers[i] == servers[best] && i < best))) {\n        best = i;\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] assignTasks(int[] servers, int[] tasks) {\n    PriorityQueue<int[]> available = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Long.compare(a[2], b[2]) : Long.compare(a[0], b[0]));\n\n    for (int i = 0; i < servers.length; i++) {\n      available.offer(new int[] {servers[i], i});\n    }\n\n    int[] answer = new int[tasks.length];\n    long time = 0;\n    for (int i = 0; i < tasks.length; i++) {\n      time = Math.max(time, i);\n      releaseServers(time, busy, available);\n      if (available.isEmpty()) {\n        time = busy.peek()[0];\n        releaseServers(time, busy, available);\n      }\n\n      int[] server = available.poll();\n      answer[i] = server[1];\n      busy.offer(new long[] {time + tasks[i], server[0], server[1]});\n    }\n\n    return answer;\n  }\n\n  private void releaseServers(long time, PriorityQueue<long[]> busy, PriorityQueue<int[]> available) {\n    while (!busy.isEmpty() && busy.peek()[0] <= time) {\n      long[] server = busy.poll();\n      available.offer(new int[] {(int) server[1], (int) server[2]});\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] assignTasks(int[] servers, int[] tasks) {\n    PriorityQueue<int[]> available = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Long.compare(a[2], b[2]) : Long.compare(a[0], b[0]));\n\n    for (int i = 0; i < servers.length; i++) {\n      available.offer(new int[] {servers[i], i});\n    }\n\n    int[] answer = new int[tasks.length];\n    assign(0, 0L, tasks, available, busy, answer);\n    return answer;\n  }\n\n  private void assign(int task, long time, int[] tasks, PriorityQueue<int[]> available,\n      PriorityQueue<long[]> busy, int[] answer) {\n    if (task == tasks.length) return;\n\n    time = Math.max(time, task);\n    while (!busy.isEmpty() && busy.peek()[0] <= time) {\n      long[] server = busy.poll();\n      available.offer(new int[] {(int) server[1], (int) server[2]});\n    }\n    if (available.isEmpty()) {\n      time = busy.peek()[0];\n      while (!busy.isEmpty() && busy.peek()[0] <= time) {\n        long[] server = busy.poll();\n        available.offer(new int[] {(int) server[1], (int) server[2]});\n      }\n    }\n\n    int[] server = available.poll();\n    answer[task] = server[1];\n    busy.offer(new long[] {time + tasks[task], server[0], server[1]});\n    assign(task + 1, time, tasks, available, busy, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] assignTasks(int[] servers, int[] tasks) {\n    PriorityQueue<int[]> available = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Long.compare(a[2], b[2]) : Long.compare(a[0], b[0]));\n\n    for (int i = 0; i < servers.length; i++) {\n      available.offer(new int[] {servers[i], i});\n    }\n\n    int[] answer = new int[tasks.length];\n    long time = 0;\n    for (int i = 0; i < tasks.length; i++) {\n      time = Math.max(time, i);\n      releaseServers(time, busy, available);\n      if (available.isEmpty()) {\n        time = busy.peek()[0];\n        releaseServers(time, busy, available);\n      }\n\n      int[] server = available.poll();\n      answer[i] = server[1];\n      busy.offer(new long[] {time + tasks[i], server[0], server[1]});\n    }\n\n    return answer;\n  }\n\n  private void releaseServers(long time, PriorityQueue<long[]> busy, PriorityQueue<int[]> available) {\n    while (!busy.isEmpty() && busy.peek()[0] <= time) {\n      long[] server = busy.poll();\n      available.offer(new int[] {(int) server[1], (int) server[2]});\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] assignTasks(int[] servers, int[] tasks) {\n    PriorityQueue<int[]> available = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Long.compare(a[2], b[2]) : Long.compare(a[0], b[0]));\n\n    for (int i = 0; i < servers.length; i++) {\n      available.offer(new int[] {servers[i], i});\n    }\n\n    int[] answer = new int[tasks.length];\n    long time = 0;\n    for (int i = 0; i < tasks.length; i++) {\n      time = Math.max(time, i);\n      releaseServers(time, busy, available);\n      if (available.isEmpty()) {\n        time = busy.peek()[0];\n        releaseServers(time, busy, available);\n      }\n\n      int[] server = available.poll();\n      answer[i] = server[1];\n      busy.offer(new long[] {time + tasks[i], server[0], server[1]});\n    }\n\n    return answer;\n  }\n\n  private void releaseServers(long time, PriorityQueue<long[]> busy, PriorityQueue<int[]> available) {\n    while (!busy.isEmpty() && busy.peek()[0] <= time) {\n      long[] server = busy.poll();\n      available.offer(new int[] {(int) server[1], (int) server[2]});\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Single-Threaded CPU",
      "difficulty": "Medium",
      "subpattern": "Event scheduling with min-heap by processing time",
      "question": "Given tasks where tasks[i] = [enqueueTime, processingTime], return the order in which a single-threaded CPU processes tasks. The CPU chooses the available task with shortest processing time, then smallest original index.",
      "trigger": "Tasks become available over time, and every CPU decision needs the best available task by processing time and index.",
      "intuition": "Sort tasks by enqueue time. Move all available tasks into a min-heap ordered by processing time/index. If none are available, jump time to the next enqueue time.",
      "edgeCases": "CPU idle gaps, equal processing times, equal enqueue times, one task, very long processing time causing large current time.",
      "constraints": "1 <= tasks.length <= 100000; 1 <= enqueueTime, processingTime <= 1000000000.",
      "source": {
        "label": "Single-Threaded CPU - LeetCode 1834",
        "url": "https://leetcode.com/problems/single-threaded-cpu/"
      },
      "examples": [
        {
          "input": "tasks = [[1,2],[2,4],[3,2],[4,1]]",
          "output": "[0,2,3,1]",
          "explanation": "At time 3, task 2 beats task 1 because it has shorter processing time."
        },
        {
          "input": "tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]",
          "output": "[4,3,2,0,1]",
          "explanation": "All tasks arrive together, so processing time decides."
        },
        {
          "input": "tasks = [[5,2],[6,1]]",
          "output": "[0,1]",
          "explanation": "The CPU jumps from time 0 to the first enqueue time."
        }
      ],
      "bruteForceComplexity": "Time O(n^2): repeatedly scan all unprocessed available tasks; Space O(n).",
      "optimizedComplexity": "Time O(n log n): sort plus heap scheduling; Space O(n).",
      "recursiveComplexity": "Time O(n log n): recursive scheduling over sorted tasks and heap; Space O(n) heap plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] getOrder(int[][] tasks) {\n    int n = tasks.length;\n    boolean[] done = new boolean[n];\n    int[] order = new int[n];\n    long time = 0;\n\n    for (int placed = 0; placed < n; placed++) {\n      int best = -1;\n      for (int i = 0; i < n; i++) {\n        if (!done[i] && tasks[i][0] <= time && better(tasks, i, best)) {\n          best = i;\n        }\n      }\n      if (best == -1) {\n        time = nextTime(tasks, done);\n        placed--;\n        continue;\n      }\n      done[best] = true;\n      order[placed] = best;\n      time += tasks[best][1];\n    }\n\n    return order;\n  }\n\n  private boolean better(int[][] tasks, int candidate, int best) {\n    return best == -1 || tasks[candidate][1] < tasks[best][1]\n        || (tasks[candidate][1] == tasks[best][1] && candidate < best);\n  }\n\n  private long nextTime(int[][] tasks, boolean[] done) {\n    long next = Long.MAX_VALUE;\n    for (int i = 0; i < tasks.length; i++) {\n      if (!done[i]) next = Math.min(next, tasks[i][0]);\n    }\n    return next;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] getOrder(int[][] tasks) {\n    int n = tasks.length;\n    int[][] indexed = new int[n][3];\n    for (int i = 0; i < n; i++) {\n      indexed[i] = new int[] {tasks[i][0], tasks[i][1], i};\n    }\n    Arrays.sort(indexed, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        a[1] == b[1] ? Integer.compare(a[2], b[2]) : Integer.compare(a[1], b[1]));\n    int[] order = new int[n];\n    long time = 0;\n    int index = 0;\n\n    for (int placed = 0; placed < n; placed++) {\n      if (heap.isEmpty() && time < indexed[index][0]) time = indexed[index][0];\n      while (index < n && indexed[index][0] <= time) {\n        heap.offer(indexed[index++]);\n      }\n      int[] task = heap.poll();\n      order[placed] = task[2];\n      time += task[1];\n    }\n\n    return order;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] getOrder(int[][] tasks) {\n    int n = tasks.length;\n    int[][] indexed = new int[n][3];\n    for (int i = 0; i < n; i++) {\n      indexed[i] = new int[] {tasks[i][0], tasks[i][1], i};\n    }\n    Arrays.sort(indexed, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] order = new int[n];\n    schedule(0, 0, 0L, indexed, new PriorityQueue<>((a, b) ->\n        a[1] == b[1] ? Integer.compare(a[2], b[2]) : Integer.compare(a[1], b[1])), order);\n    return order;\n  }\n\n  private void schedule(int placed, int index, long time, int[][] tasks,\n      PriorityQueue<int[]> heap, int[] order) {\n    if (placed == order.length) return;\n\n    if (heap.isEmpty() && index < tasks.length && time < tasks[index][0]) {\n      time = tasks[index][0];\n    }\n    while (index < tasks.length && tasks[index][0] <= time) {\n      heap.offer(tasks[index++]);\n    }\n\n    int[] task = heap.poll();\n    order[placed] = task[2];\n    schedule(placed + 1, index, time + task[1], tasks, heap, order);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] getOrder(int[][] tasks) {\n    int n = tasks.length;\n    int[][] indexed = new int[n][3];\n    for (int i = 0; i < n; i++) {\n      indexed[i] = new int[] {tasks[i][0], tasks[i][1], i};\n    }\n    Arrays.sort(indexed, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        a[1] == b[1] ? Integer.compare(a[2], b[2]) : Integer.compare(a[1], b[1]));\n    int[] order = new int[n];\n    long time = 0;\n    int index = 0;\n\n    for (int placed = 0; placed < n; placed++) {\n      if (heap.isEmpty() && time < indexed[index][0]) time = indexed[index][0];\n      while (index < n && indexed[index][0] <= time) {\n        heap.offer(indexed[index++]);\n      }\n      int[] task = heap.poll();\n      order[placed] = task[2];\n      time += task[1];\n    }\n\n    return order;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] getOrder(int[][] tasks) {\n    int n = tasks.length;\n    int[][] indexed = new int[n][3];\n    for (int i = 0; i < n; i++) {\n      indexed[i] = new int[] {tasks[i][0], tasks[i][1], i};\n    }\n    Arrays.sort(indexed, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        a[1] == b[1] ? Integer.compare(a[2], b[2]) : Integer.compare(a[1], b[1]));\n    int[] order = new int[n];\n    long time = 0;\n    int index = 0;\n\n    for (int placed = 0; placed < n; placed++) {\n      if (heap.isEmpty() && time < indexed[index][0]) time = indexed[index][0];\n      while (index < n && indexed[index][0] <= time) {\n        heap.offer(indexed[index++]);\n      }\n      int[] task = heap.poll();\n      order[placed] = task[2];\n      time += task[1];\n    }\n\n    return order;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Performance of a Team",
      "difficulty": "Hard",
      "subpattern": "Sort by limiting value and maintain top K with min-heap",
      "question": "Given n engineers with speed and efficiency, choose at most k engineers to maximize performance = sum(speed) * minimum(efficiency). Return the result modulo 1000000007.",
      "trigger": "Efficiency is the limiting minimum value, and for each possible minimum efficiency we need the largest speed sum of up to k engineers.",
      "intuition": "Sort engineers by efficiency descending. When processing an engineer, their efficiency is the current minimum; keep the best k speeds seen so far in a min-heap.",
      "edgeCases": "k = 1, k = n, equal efficiencies, equal speeds, large products requiring long, modulo result.",
      "constraints": "1 <= k <= n <= 100000; 1 <= speed[i], efficiency[i] <= 100000000.",
      "source": {
        "label": "Maximum Performance of a Team - LeetCode 1383",
        "url": "https://leetcode.com/problems/maximum-performance-of-a-team/"
      },
      "examples": [
        {
          "input": "n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2",
          "output": "60",
          "explanation": "Choose engineers with speed 10 and 5; minimum efficiency is 4."
        },
        {
          "input": "n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 3",
          "output": "68",
          "explanation": "Best team has speed sum 17 and minimum efficiency 4."
        },
        {
          "input": "n = 3, speed = [2,8,2], efficiency = [2,7,1], k = 2",
          "output": "56",
          "explanation": "The single engineer with speed 8 and efficiency 7 is best."
        }
      ],
      "bruteForceComplexity": "Time O(2^n * n): enumerate teams and compute performance; Space O(n) recursion stack.",
      "optimizedComplexity": "Time O(n log n): sort engineers and maintain a size-k heap of speeds; Space O(n).",
      "recursiveComplexity": "Time O(n log n): recursive scan after sorting with heap updates; Space O(n) heap plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {\n    long best = search(0, 0, 0L, Integer.MAX_VALUE, speed, efficiency, k);\n    return (int) (best % MOD);\n  }\n\n  private long search(int index, int count, long speedSum, int minEfficiency,\n      int[] speed, int[] efficiency, int k) {\n    if (index == speed.length) {\n      return count == 0 ? 0 : speedSum * minEfficiency;\n    }\n\n    long skip = search(index + 1, count, speedSum, minEfficiency, speed, efficiency, k);\n    long take = 0;\n    if (count < k) {\n      take = search(index + 1, count + 1, speedSum + speed[index],\n          Math.min(minEfficiency, efficiency[index]), speed, efficiency, k);\n    }\n    return Math.max(skip, take);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {\n    int[][] engineers = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      engineers[i] = new int[] {efficiency[i], speed[i]};\n    }\n    Arrays.sort(engineers, (a, b) -> Integer.compare(b[0], a[0]));\n\n    PriorityQueue<Integer> speeds = new PriorityQueue<>();\n    long speedSum = 0;\n    long best = 0;\n\n    for (int[] engineer : engineers) {\n      speeds.offer(engineer[1]);\n      speedSum += engineer[1];\n      if (speeds.size() > k) {\n        speedSum -= speeds.poll();\n      }\n      best = Math.max(best, speedSum * engineer[0]);\n    }\n\n    return (int) (best % MOD);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {\n    int[][] engineers = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      engineers[i] = new int[] {efficiency[i], speed[i]};\n    }\n    Arrays.sort(engineers, (a, b) -> Integer.compare(b[0], a[0]));\n    long best = scan(0, k, engineers, new PriorityQueue<>(), 0L, 0L);\n    return (int) (best % MOD);\n  }\n\n  private long scan(int index, int k, int[][] engineers, PriorityQueue<Integer> speeds,\n      long speedSum, long best) {\n    if (index == engineers.length) return best;\n\n    speeds.offer(engineers[index][1]);\n    speedSum += engineers[index][1];\n    if (speeds.size() > k) {\n      speedSum -= speeds.poll();\n    }\n\n    best = Math.max(best, speedSum * engineers[index][0]);\n    return scan(index + 1, k, engineers, speeds, speedSum, best);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {\n    int[][] engineers = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      engineers[i] = new int[] {efficiency[i], speed[i]};\n    }\n    Arrays.sort(engineers, (a, b) -> Integer.compare(b[0], a[0]));\n\n    PriorityQueue<Integer> speeds = new PriorityQueue<>();\n    long speedSum = 0;\n    long best = 0;\n\n    for (int[] engineer : engineers) {\n      speeds.offer(engineer[1]);\n      speedSum += engineer[1];\n      if (speeds.size() > k) {\n        speedSum -= speeds.poll();\n      }\n      best = Math.max(best, speedSum * engineer[0]);\n    }\n\n    return (int) (best % MOD);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {\n    int[][] engineers = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      engineers[i] = new int[] {efficiency[i], speed[i]};\n    }\n    Arrays.sort(engineers, (a, b) -> Integer.compare(b[0], a[0]));\n\n    PriorityQueue<Integer> speeds = new PriorityQueue<>();\n    long speedSum = 0;\n    long best = 0;\n\n    for (int[] engineer : engineers) {\n      speeds.offer(engineer[1]);\n      speedSum += engineer[1];\n      if (speeds.size() > k) {\n        speedSum -= speeds.poll();\n      }\n      best = Math.max(best, speedSum * engineer[0]);\n    }\n\n    return (int) (best % MOD);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "The Skyline Problem",
      "difficulty": "Hard",
      "subpattern": "Sweep line with max-heap of active heights",
      "question": "Given buildings where buildings[i] = [left, right, height], return the key points of the skyline formed by these buildings.",
      "trigger": "The visible height changes only at building start/end events, and at each event we need the maximum active building height.",
      "intuition": "Sweep from left to right. Add starting buildings to a max-heap and lazily remove buildings whose right edge is behind the sweep position. Emit a key point when max height changes.",
      "edgeCases": "Overlapping buildings, adjacent buildings with same height, nested buildings, same x coordinate start/end events, empty input.",
      "constraints": "1 <= buildings.length <= 10000; 0 <= left < right <= 2147483647; 1 <= height <= 2147483647.",
      "source": {
        "label": "The Skyline Problem - LeetCode 218",
        "url": "https://leetcode.com/problems/the-skyline-problem/"
      },
      "examples": [
        {
          "input": "buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]",
          "output": "[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]",
          "explanation": "Each key point marks a change in visible max height."
        },
        {
          "input": "buildings = [[0,2,3],[2,5,3]]",
          "output": "[[0,3],[5,0]]",
          "explanation": "Adjacent same-height buildings merge into one skyline segment."
        },
        {
          "input": "buildings = [[1,2,1],[1,2,2],[1,2,3]]",
          "output": "[[1,3],[2,0]]",
          "explanation": "Only the tallest active building is visible."
        }
      ],
      "bruteForceComplexity": "Time O(p*n) where p is the number of unique x coordinates; Space O(p).",
      "optimizedComplexity": "Time O(n log n): sort events and maintain active buildings in a max-heap; Space O(n).",
      "recursiveComplexity": "Time O(n log n): recursive sweep over sorted events; Space O(n) heap plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    TreeSet<Integer> points = new TreeSet<>();\n    for (int[] building : buildings) {\n      points.add(building[0]);\n      points.add(building[1]);\n    }\n\n    List<List<Integer>> skyline = new ArrayList<>();\n    int previousHeight = 0;\n    for (int x : points) {\n      int height = 0;\n      for (int[] building : buildings) {\n        if (building[0] <= x && x < building[1]) {\n          height = Math.max(height, building[2]);\n        }\n      }\n      if (skyline.isEmpty() || height != previousHeight) {\n        skyline.add(Arrays.asList(x, height));\n        previousHeight = height;\n      }\n    }\n    return skyline;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    int n = buildings.length;\n    int[][] events = new int[n * 2][2];\n    for (int i = 0; i < n; i++) {\n      events[2 * i] = new int[] {buildings[i][0], i};\n      events[2 * i + 1] = new int[] {buildings[i][1], i};\n    }\n    Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> active = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));\n    List<List<Integer>> skyline = new ArrayList<>();\n    int eventIndex = 0;\n    int previousHeight = 0;\n\n    while (eventIndex < events.length) {\n      int x = events[eventIndex][0];\n      while (eventIndex < events.length && events[eventIndex][0] == x) {\n        int buildingIndex = events[eventIndex][1];\n        if (buildings[buildingIndex][0] == x) {\n          active.offer(new int[] {buildings[buildingIndex][2], buildings[buildingIndex][1]});\n        }\n        eventIndex++;\n      }\n      while (!active.isEmpty() && active.peek()[1] <= x) {\n        active.poll();\n      }\n\n      int height = active.isEmpty() ? 0 : active.peek()[0];\n      if (height != previousHeight) {\n        skyline.add(Arrays.asList(x, height));\n        previousHeight = height;\n      }\n    }\n\n    return skyline;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    int[][] events = new int[buildings.length * 2][2];\n    for (int i = 0; i < buildings.length; i++) {\n      events[2 * i] = new int[] {buildings[i][0], i};\n      events[2 * i + 1] = new int[] {buildings[i][1], i};\n    }\n    Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));\n    List<List<Integer>> skyline = new ArrayList<>();\n    sweep(0, 0, events, buildings, new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0])), skyline);\n    return skyline;\n  }\n\n  private void sweep(int eventIndex, int previousHeight, int[][] events, int[][] buildings,\n      PriorityQueue<int[]> active, List<List<Integer>> skyline) {\n    if (eventIndex == events.length) return;\n\n    int x = events[eventIndex][0];\n    while (eventIndex < events.length && events[eventIndex][0] == x) {\n      int buildingIndex = events[eventIndex][1];\n      if (buildings[buildingIndex][0] == x) {\n        active.offer(new int[] {buildings[buildingIndex][2], buildings[buildingIndex][1]});\n      }\n      eventIndex++;\n    }\n    while (!active.isEmpty() && active.peek()[1] <= x) {\n      active.poll();\n    }\n\n    int height = active.isEmpty() ? 0 : active.peek()[0];\n    if (height != previousHeight) {\n      skyline.add(Arrays.asList(x, height));\n    }\n    sweep(eventIndex, height, events, buildings, active, skyline);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    int n = buildings.length;\n    int[][] events = new int[n * 2][2];\n    for (int i = 0; i < n; i++) {\n      events[2 * i] = new int[] {buildings[i][0], i};\n      events[2 * i + 1] = new int[] {buildings[i][1], i};\n    }\n    Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> active = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));\n    List<List<Integer>> skyline = new ArrayList<>();\n    int eventIndex = 0;\n    int previousHeight = 0;\n\n    while (eventIndex < events.length) {\n      int x = events[eventIndex][0];\n      while (eventIndex < events.length && events[eventIndex][0] == x) {\n        int buildingIndex = events[eventIndex][1];\n        if (buildings[buildingIndex][0] == x) {\n          active.offer(new int[] {buildings[buildingIndex][2], buildings[buildingIndex][1]});\n        }\n        eventIndex++;\n      }\n      while (!active.isEmpty() && active.peek()[1] <= x) {\n        active.poll();\n      }\n\n      int height = active.isEmpty() ? 0 : active.peek()[0];\n      if (height != previousHeight) {\n        skyline.add(Arrays.asList(x, height));\n        previousHeight = height;\n      }\n    }\n\n    return skyline;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    int n = buildings.length;\n    int[][] events = new int[n * 2][2];\n    for (int i = 0; i < n; i++) {\n      events[2 * i] = new int[] {buildings[i][0], i};\n      events[2 * i + 1] = new int[] {buildings[i][1], i};\n    }\n    Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> active = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));\n    List<List<Integer>> skyline = new ArrayList<>();\n    int eventIndex = 0;\n    int previousHeight = 0;\n\n    while (eventIndex < events.length) {\n      int x = events[eventIndex][0];\n      while (eventIndex < events.length && events[eventIndex][0] == x) {\n        int buildingIndex = events[eventIndex][1];\n        if (buildings[buildingIndex][0] == x) {\n          active.offer(new int[] {buildings[buildingIndex][2], buildings[buildingIndex][1]});\n        }\n        eventIndex++;\n      }\n      while (!active.isEmpty() && active.peek()[1] <= x) {\n        active.poll();\n      }\n\n      int height = active.isEmpty() ? 0 : active.peek()[0];\n      if (height != previousHeight) {\n        skyline.add(Arrays.asList(x, height));\n        previousHeight = height;\n      }\n    }\n\n    return skyline;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Number of Refueling Stops",
      "difficulty": "Hard",
      "subpattern": "Reachability greedy with max-heap of fuel choices",
      "question": "Given a target distance, startFuel, and stations where stations[i] = [position, fuel], return the minimum number of refueling stops needed to reach target, or -1 if it is impossible.",
      "trigger": "At each point where current fuel cannot reach farther, the best previous station to refuel from is the one with maximum fuel.",
      "intuition": "Scan reachable stations and store their fuel in a max-heap. Whenever fuel is insufficient to reach the next goal, refuel using the largest available previous station.",
      "edgeCases": "No stations, startFuel already reaches target, unreachable first station, multiple stations at reachable positions, zero remaining heap before target, very large fuel totals.",
      "constraints": "1 <= target, startFuel <= 1000000000; 0 <= stations.length <= 500; stations are sorted by position; 0 <= position < target; 1 <= fuel <= 1000000000.",
      "source": {
        "label": "Minimum Number of Refueling Stops - LeetCode 871",
        "url": "https://leetcode.com/problems/minimum-number-of-refueling-stops/"
      },
      "examples": [
        {
          "input": "target = 1, startFuel = 1, stations = []",
          "output": "0",
          "explanation": "The car can already reach the target."
        },
        {
          "input": "target = 100, startFuel = 1, stations = [[10,100]]",
          "output": "-1",
          "explanation": "The first station is unreachable."
        },
        {
          "input": "target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]",
          "output": "2",
          "explanation": "Refuel at the best previous stations to reach the target."
        }
      ],
      "bruteForceComplexity": "Time O(n^2): dynamic programming over number of stops and stations; Space O(n).",
      "optimizedComplexity": "Time O(n log n): each station fuel is pushed and popped at most once; Space O(n).",
      "recursiveComplexity": "Time O(n log n): recursive scan with the same max-heap decisions; Space O(n) heap plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    int n = stations.length;\n    long[] farthest = new long[n + 1];\n    farthest[0] = startFuel;\n\n    for (int i = 0; i < n; i++) {\n      for (int stops = i; stops >= 0; stops--) {\n        if (farthest[stops] >= stations[i][0]) {\n          farthest[stops + 1] = Math.max(farthest[stops + 1], farthest[stops] + stations[i][1]);\n        }\n      }\n    }\n\n    for (int stops = 0; stops <= n; stops++) {\n      if (farthest[stops] >= target) return stops;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    PriorityQueue<Integer> fuels = new PriorityQueue<>(Collections.reverseOrder());\n    long reach = startFuel;\n    int stops = 0;\n    int index = 0;\n\n    while (reach < target) {\n      while (index < stations.length && stations[index][0] <= reach) {\n        fuels.offer(stations[index++][1]);\n      }\n      if (fuels.isEmpty()) return -1;\n\n      reach += fuels.poll();\n      stops++;\n    }\n\n    return stops;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    return travel(target, stations, 0, startFuel, 0, new PriorityQueue<>(Collections.reverseOrder()));\n  }\n\n  private int travel(int target, int[][] stations, int index, long reach, int stops,\n      PriorityQueue<Integer> fuels) {\n    if (reach >= target) return stops;\n\n    while (index < stations.length && stations[index][0] <= reach) {\n      fuels.offer(stations[index++][1]);\n    }\n    if (fuels.isEmpty()) return -1;\n\n    return travel(target, stations, index, reach + fuels.poll(), stops + 1, fuels);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    PriorityQueue<Integer> fuels = new PriorityQueue<>(Collections.reverseOrder());\n    long reach = startFuel;\n    int stops = 0;\n    int index = 0;\n\n    while (reach < target) {\n      while (index < stations.length && stations[index][0] <= reach) {\n        fuels.offer(stations[index++][1]);\n      }\n      if (fuels.isEmpty()) return -1;\n\n      reach += fuels.poll();\n      stops++;\n    }\n\n    return stops;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    PriorityQueue<Integer> fuels = new PriorityQueue<>(Collections.reverseOrder());\n    long reach = startFuel;\n    int stops = 0;\n    int index = 0;\n\n    while (reach < target) {\n      while (index < stations.length && stations[index][0] <= reach) {\n        fuels.offer(stations[index++][1]);\n      }\n      if (fuels.isEmpty()) return -1;\n\n      reach += fuels.poll();\n      stops++;\n    }\n\n    return stops;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Sliding Window Median",
      "difficulty": "Hard",
      "subpattern": "Dual heap with lazy deletion",
      "question": "Given an integer array nums and window size k, return the median of every sliding window of size k.",
      "trigger": "The window changes by one insertion and one deletion, while median requires the lower and upper halves to stay balanced.",
      "intuition": "Use a max-heap for the lower half and a min-heap for the upper half. Lazy-delete outgoing values with a map because Java PriorityQueue cannot remove arbitrary values efficiently.",
      "edgeCases": "k = 1, even k, duplicate values, negative values, Integer.MIN_VALUE and Integer.MAX_VALUE, outgoing value not currently at heap top.",
      "constraints": "1 <= k <= nums.length <= 100000; -2147483648 <= nums[i] <= 2147483647.",
      "source": {
        "label": "Sliding Window Median - LeetCode 480",
        "url": "https://leetcode.com/problems/sliding-window-median/"
      },
      "examples": [
        {
          "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          "output": "[1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]",
          "explanation": "Each value is the median of the current size-3 window."
        },
        {
          "input": "nums = [1,2,3,4], k = 2",
          "output": "[1.50000,2.50000,3.50000]",
          "explanation": "Even window median is the average of the two middle values."
        },
        {
          "input": "nums = [5,5,5], k = 1",
          "output": "[5.00000,5.00000,5.00000]",
          "explanation": "A size-1 window median is the element itself."
        }
      ],
      "bruteForceComplexity": "Time O((n-k+1) * k log k): sort every window independently; Space O(k).",
      "optimizedComplexity": "Time O(n log k): each add/remove/rebalance is logarithmic; Space O(k).",
      "recursiveComplexity": "Time O(n log k): recursive window scan with the same dual-heap operations; Space O(k + n) including recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public double[] medianSlidingWindow(int[] nums, int k) {\n    double[] answer = new double[nums.length - k + 1];\n\n    for (int left = 0; left + k <= nums.length; left++) {\n      int[] window = new int[k];\n      for (int i = 0; i < k; i++) {\n        window[i] = nums[left + i];\n      }\n      Arrays.sort(window);\n      if (k % 2 == 1) {\n        answer[left] = window[k / 2];\n      } else {\n        answer[left] = ((long) window[k / 2 - 1] + window[k / 2]) / 2.0;\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public double[] medianSlidingWindow(int[] nums, int k) {\n    DualHeap heap = new DualHeap(k);\n    for (int i = 0; i < k; i++) {\n      heap.add(nums[i]);\n    }\n\n    double[] answer = new double[nums.length - k + 1];\n    answer[0] = heap.median();\n\n    for (int i = k; i < nums.length; i++) {\n      heap.add(nums[i]);\n      heap.remove(nums[i - k]);\n      answer[i - k + 1] = heap.median();\n    }\n\n    return answer;\n  }\n\n  private static class DualHeap {\n    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    PriorityQueue<Integer> large = new PriorityQueue<>();\n    Map<Integer, Integer> delayed = new HashMap<>();\n    int smallSize = 0, largeSize = 0, k;\n\n    DualHeap(int k) { this.k = k; }\n\n    void add(int num) {\n      if (small.isEmpty() || num <= small.peek()) {\n        small.offer(num);\n        smallSize++;\n      } else {\n        large.offer(num);\n        largeSize++;\n      }\n      rebalance();\n    }\n\n    void remove(int num) {\n      delayed.put(num, delayed.getOrDefault(num, 0) + 1);\n      if (num <= small.peek()) {\n        smallSize--;\n        if (num == small.peek()) prune(small);\n      } else {\n        largeSize--;\n        if (!large.isEmpty() && num == large.peek()) prune(large);\n      }\n      rebalance();\n    }\n\n    double median() {\n      if (k % 2 == 1) return small.peek();\n      return ((long) small.peek() + large.peek()) / 2.0;\n    }\n\n    private void rebalance() {\n      if (smallSize > largeSize + 1) {\n        large.offer(small.poll());\n        smallSize--;\n        largeSize++;\n        prune(small);\n      } else if (smallSize < largeSize) {\n        small.offer(large.poll());\n        smallSize++;\n        largeSize--;\n        prune(large);\n      }\n    }\n\n    private void prune(PriorityQueue<Integer> heap) {\n      while (!heap.isEmpty() && delayed.containsKey(heap.peek())) {\n        int value = heap.poll();\n        delayed.put(value, delayed.get(value) - 1);\n        if (delayed.get(value) == 0) delayed.remove(value);\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public double[] medianSlidingWindow(int[] nums, int k) {\n    DualHeap heap = new DualHeap(k);\n    for (int i = 0; i < k; i++) heap.add(nums[i]);\n\n    double[] answer = new double[nums.length - k + 1];\n    answer[0] = heap.median();\n    slide(k, nums, k, heap, answer);\n    return answer;\n  }\n\n  private void slide(int index, int[] nums, int k, DualHeap heap, double[] answer) {\n    if (index == nums.length) return;\n    heap.add(nums[index]);\n    heap.remove(nums[index - k]);\n    answer[index - k + 1] = heap.median();\n    slide(index + 1, nums, k, heap, answer);\n  }\n\n  private static class DualHeap {\n    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    PriorityQueue<Integer> large = new PriorityQueue<>();\n    Map<Integer, Integer> delayed = new HashMap<>();\n    int smallSize = 0, largeSize = 0, k;\n\n    DualHeap(int k) { this.k = k; }\n\n    void add(int num) {\n      if (small.isEmpty() || num <= small.peek()) { small.offer(num); smallSize++; }\n      else { large.offer(num); largeSize++; }\n      rebalance();\n    }\n\n    void remove(int num) {\n      delayed.put(num, delayed.getOrDefault(num, 0) + 1);\n      if (num <= small.peek()) { smallSize--; if (num == small.peek()) prune(small); }\n      else { largeSize--; if (!large.isEmpty() && num == large.peek()) prune(large); }\n      rebalance();\n    }\n\n    double median() {\n      return k % 2 == 1 ? small.peek() : ((long) small.peek() + large.peek()) / 2.0;\n    }\n\n    private void rebalance() {\n      if (smallSize > largeSize + 1) { large.offer(small.poll()); smallSize--; largeSize++; prune(small); }\n      else if (smallSize < largeSize) { small.offer(large.poll()); smallSize++; largeSize--; prune(large); }\n    }\n\n    private void prune(PriorityQueue<Integer> heap) {\n      while (!heap.isEmpty() && delayed.containsKey(heap.peek())) {\n        int value = heap.poll();\n        delayed.put(value, delayed.get(value) - 1);\n        if (delayed.get(value) == 0) delayed.remove(value);\n      }\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public double[] medianSlidingWindow(int[] nums, int k) {\n    DualHeap heap = new DualHeap(k);\n    for (int i = 0; i < k; i++) {\n      heap.add(nums[i]);\n    }\n\n    double[] answer = new double[nums.length - k + 1];\n    answer[0] = heap.median();\n\n    for (int i = k; i < nums.length; i++) {\n      heap.add(nums[i]);\n      heap.remove(nums[i - k]);\n      answer[i - k + 1] = heap.median();\n    }\n\n    return answer;\n  }\n\n  private static class DualHeap {\n    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    PriorityQueue<Integer> large = new PriorityQueue<>();\n    Map<Integer, Integer> delayed = new HashMap<>();\n    int smallSize = 0, largeSize = 0, k;\n\n    DualHeap(int k) { this.k = k; }\n\n    void add(int num) {\n      if (small.isEmpty() || num <= small.peek()) {\n        small.offer(num);\n        smallSize++;\n      } else {\n        large.offer(num);\n        largeSize++;\n      }\n      rebalance();\n    }\n\n    void remove(int num) {\n      delayed.put(num, delayed.getOrDefault(num, 0) + 1);\n      if (num <= small.peek()) {\n        smallSize--;\n        if (num == small.peek()) prune(small);\n      } else {\n        largeSize--;\n        if (!large.isEmpty() && num == large.peek()) prune(large);\n      }\n      rebalance();\n    }\n\n    double median() {\n      if (k % 2 == 1) return small.peek();\n      return ((long) small.peek() + large.peek()) / 2.0;\n    }\n\n    private void rebalance() {\n      if (smallSize > largeSize + 1) {\n        large.offer(small.poll());\n        smallSize--;\n        largeSize++;\n        prune(small);\n      } else if (smallSize < largeSize) {\n        small.offer(large.poll());\n        smallSize++;\n        largeSize--;\n        prune(large);\n      }\n    }\n\n    private void prune(PriorityQueue<Integer> heap) {\n      while (!heap.isEmpty() && delayed.containsKey(heap.peek())) {\n        int value = heap.poll();\n        delayed.put(value, delayed.get(value) - 1);\n        if (delayed.get(value) == 0) delayed.remove(value);\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public double[] medianSlidingWindow(int[] nums, int k) {\n    DualHeap heap = new DualHeap(k);\n    for (int i = 0; i < k; i++) {\n      heap.add(nums[i]);\n    }\n\n    double[] answer = new double[nums.length - k + 1];\n    answer[0] = heap.median();\n\n    for (int i = k; i < nums.length; i++) {\n      heap.add(nums[i]);\n      heap.remove(nums[i - k]);\n      answer[i - k + 1] = heap.median();\n    }\n\n    return answer;\n  }\n\n  private static class DualHeap {\n    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    PriorityQueue<Integer> large = new PriorityQueue<>();\n    Map<Integer, Integer> delayed = new HashMap<>();\n    int smallSize = 0, largeSize = 0, k;\n\n    DualHeap(int k) { this.k = k; }\n\n    void add(int num) {\n      if (small.isEmpty() || num <= small.peek()) {\n        small.offer(num);\n        smallSize++;\n      } else {\n        large.offer(num);\n        largeSize++;\n      }\n      rebalance();\n    }\n\n    void remove(int num) {\n      delayed.put(num, delayed.getOrDefault(num, 0) + 1);\n      if (num <= small.peek()) {\n        smallSize--;\n        if (num == small.peek()) prune(small);\n      } else {\n        largeSize--;\n        if (!large.isEmpty() && num == large.peek()) prune(large);\n      }\n      rebalance();\n    }\n\n    double median() {\n      if (k % 2 == 1) return small.peek();\n      return ((long) small.peek() + large.peek()) / 2.0;\n    }\n\n    private void rebalance() {\n      if (smallSize > largeSize + 1) {\n        large.offer(small.poll());\n        smallSize--;\n        largeSize++;\n        prune(small);\n      } else if (smallSize < largeSize) {\n        small.offer(large.poll());\n        smallSize++;\n        largeSize--;\n        prune(large);\n      }\n    }\n\n    private void prune(PriorityQueue<Integer> heap) {\n      while (!heap.isEmpty() && delayed.containsKey(heap.peek())) {\n        int value = heap.poll();\n        delayed.put(value, delayed.get(value) - 1);\n        if (delayed.get(value) == 0) delayed.remove(value);\n      }\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Ugly Number II",
      "difficulty": "Medium",
      "subpattern": "Generate sorted sequence with min-heap and duplicate guard",
      "question": "Given an integer n, return the nth ugly number. An ugly number is a positive integer whose prime factors are only 2, 3, and 5.",
      "trigger": "The next ugly number is always the smallest unseen multiple of a previous ugly number by 2, 3, or 5.",
      "intuition": "Use a min-heap seeded with 1. Pop the next smallest ugly number and push its multiples, skipping duplicates with a set.",
      "edgeCases": "n = 1, duplicate generated values like 6 from 2*3 and 3*2, large n, multiplication overflow if int is used too early.",
      "constraints": "1 <= n <= 1690; answer fits in a 32-bit signed integer.",
      "source": {
        "label": "Ugly Number II - LeetCode 264",
        "url": "https://leetcode.com/problems/ugly-number-ii/"
      },
      "examples": [
        {
          "input": "n = 10",
          "output": "12",
          "explanation": "The first ten ugly numbers are 1,2,3,4,5,6,8,9,10,12."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "1 is treated as the first ugly number."
        },
        {
          "input": "n = 15",
          "output": "24",
          "explanation": "The generated sorted sequence reaches 24 at position 15."
        }
      ],
      "bruteForceComplexity": "Time O(answer log answer) in practice from testing numbers until the nth ugly value; Space O(1).",
      "optimizedComplexity": "Time O(n log n): pop n heap values and push up to three new values; Space O(n).",
      "recursiveComplexity": "Time O(n log n): recursive generation over the heap; Space O(n) heap and set plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int nthUglyNumber(int n) {\n    int count = 0;\n    int value = 0;\n\n    while (count < n) {\n      value++;\n      if (isUgly(value)) count++;\n    }\n\n    return value;\n  }\n\n  private boolean isUgly(int num) {\n    for (int factor : new int[] {2, 3, 5}) {\n      while (num % factor == 0) num /= factor;\n    }\n    return num == 1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int nthUglyNumber(int n) {\n    int[] factors = {2, 3, 5};\n    PriorityQueue<Long> heap = new PriorityQueue<>();\n    Set<Long> seen = new HashSet<>();\n    heap.offer(1L);\n    seen.add(1L);\n\n    long current = 1;\n    for (int i = 0; i < n; i++) {\n      current = heap.poll();\n      for (int factor : factors) {\n        long next = current * factor;\n        if (seen.add(next)) {\n          heap.offer(next);\n        }\n      }\n    }\n\n    return (int) current;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int nthUglyNumber(int n) {\n    PriorityQueue<Long> heap = new PriorityQueue<>();\n    Set<Long> seen = new HashSet<>();\n    heap.offer(1L);\n    seen.add(1L);\n    return (int) generate(n, heap, seen, new int[] {2, 3, 5});\n  }\n\n  private long generate(int remaining, PriorityQueue<Long> heap, Set<Long> seen, int[] factors) {\n    long current = heap.poll();\n    for (int factor : factors) {\n      long next = current * factor;\n      if (seen.add(next)) heap.offer(next);\n    }\n    return remaining == 1 ? current : generate(remaining - 1, heap, seen, factors);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int nthUglyNumber(int n) {\n    int[] factors = {2, 3, 5};\n    PriorityQueue<Long> heap = new PriorityQueue<>();\n    Set<Long> seen = new HashSet<>();\n    heap.offer(1L);\n    seen.add(1L);\n\n    long current = 1;\n    for (int i = 0; i < n; i++) {\n      current = heap.poll();\n      for (int factor : factors) {\n        long next = current * factor;\n        if (seen.add(next)) {\n          heap.offer(next);\n        }\n      }\n    }\n\n    return (int) current;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int nthUglyNumber(int n) {\n    int[] factors = {2, 3, 5};\n    PriorityQueue<Long> heap = new PriorityQueue<>();\n    Set<Long> seen = new HashSet<>();\n    heap.offer(1L);\n    seen.add(1L);\n\n    long current = 1;\n    for (int i = 0; i < n; i++) {\n      current = heap.poll();\n      for (int factor : factors) {\n        long next = current * factor;\n        if (seen.add(next)) {\n          heap.offer(next);\n        }\n      }\n    }\n\n    return (int) current;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Super Ugly Number",
      "difficulty": "Medium",
      "subpattern": "K-way generated sequence with min-heap",
      "question": "Given n and an array primes, return the nth super ugly number. A super ugly number has prime factors only from primes.",
      "trigger": "Each prime generates a sorted stream of multiples of previously generated ugly numbers, and the next answer is the minimum across those streams.",
      "intuition": "Use a min-heap containing one candidate per prime: value, prime, and index into the ugly sequence. Pop the smallest, append it once, and advance that prime stream.",
      "edgeCases": "n = 1, duplicate candidates from different primes, primes length = 1, large generated values, repeated pops with same value.",
      "constraints": "1 <= n <= 100000; 1 <= primes.length <= 100; 2 <= primes[i] <= 1000; primes are sorted and unique; answer fits in signed 32-bit integer.",
      "source": {
        "label": "Super Ugly Number - LeetCode 313",
        "url": "https://leetcode.com/problems/super-ugly-number/"
      },
      "examples": [
        {
          "input": "n = 12, primes = [2,7,13,19]",
          "output": "32",
          "explanation": "32 is the 12th number whose prime factors are limited to the given primes."
        },
        {
          "input": "n = 1, primes = [2,3,5]",
          "output": "1",
          "explanation": "1 is the first super ugly number."
        },
        {
          "input": "n = 5, primes = [3]",
          "output": "81",
          "explanation": "The sequence is 1,3,9,27,81."
        }
      ],
      "bruteForceComplexity": "Time O(answer * p * log answer) in practical direct testing; Space O(1).",
      "optimizedComplexity": "Time O(n log p): one heap operation per generated candidate stream advance; Space O(n + p).",
      "recursiveComplexity": "Time O(n log p): recursive sequence construction with heap stream advancement; Space O(n + p) plus O(n) recursion stack.",
      "bruteForceCode": "class Solution {\n  public int nthSuperUglyNumber(int n, int[] primes) {\n    int count = 0;\n    int value = 0;\n\n    while (count < n) {\n      value++;\n      if (isSuperUgly(value, primes)) count++;\n    }\n\n    return value;\n  }\n\n  private boolean isSuperUgly(int num, int[] primes) {\n    for (int prime : primes) {\n      while (num % prime == 0) num /= prime;\n    }\n    return num == 1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int nthSuperUglyNumber(int n, int[] primes) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Long.compare((long) a[0] * ugly[a[1]], (long) b[0] * ugly[b[1]]));\n\n    for (int prime : primes) {\n      heap.offer(new int[] {prime, 0});\n    }\n\n    for (int i = 1; i < n; i++) {\n      long next = (long) heap.peek()[0] * ugly[heap.peek()[1]];\n      ugly[i] = (int) next;\n\n      while (!heap.isEmpty() && (long) heap.peek()[0] * ugly[heap.peek()[1]] == next) {\n        int[] node = heap.poll();\n        node[1]++;\n        heap.offer(node);\n      }\n    }\n\n    return ugly[n - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int nthSuperUglyNumber(int n, int[] primes) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Long.compare((long) a[0] * ugly[a[1]], (long) b[0] * ugly[b[1]]));\n    for (int prime : primes) heap.offer(new int[] {prime, 0});\n\n    build(1, n, ugly, heap);\n    return ugly[n - 1];\n  }\n\n  private void build(int index, int n, int[] ugly, PriorityQueue<int[]> heap) {\n    if (index == n) return;\n\n    long next = (long) heap.peek()[0] * ugly[heap.peek()[1]];\n    ugly[index] = (int) next;\n    while (!heap.isEmpty() && (long) heap.peek()[0] * ugly[heap.peek()[1]] == next) {\n      int[] node = heap.poll();\n      node[1]++;\n      heap.offer(node);\n    }\n\n    build(index + 1, n, ugly, heap);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int nthSuperUglyNumber(int n, int[] primes) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Long.compare((long) a[0] * ugly[a[1]], (long) b[0] * ugly[b[1]]));\n\n    for (int prime : primes) {\n      heap.offer(new int[] {prime, 0});\n    }\n\n    for (int i = 1; i < n; i++) {\n      long next = (long) heap.peek()[0] * ugly[heap.peek()[1]];\n      ugly[i] = (int) next;\n\n      while (!heap.isEmpty() && (long) heap.peek()[0] * ugly[heap.peek()[1]] == next) {\n        int[] node = heap.poll();\n        node[1]++;\n        heap.offer(node);\n      }\n    }\n\n    return ugly[n - 1];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int nthSuperUglyNumber(int n, int[] primes) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->\n        Long.compare((long) a[0] * ugly[a[1]], (long) b[0] * ugly[b[1]]));\n\n    for (int prime : primes) {\n      heap.offer(new int[] {prime, 0});\n    }\n\n    for (int i = 1; i < n; i++) {\n      long next = (long) heap.peek()[0] * ugly[heap.peek()[1]];\n      ugly[i] = (int) next;\n\n      while (!heap.isEmpty() && (long) heap.peek()[0] * ugly[heap.peek()[1]] == next) {\n        int[] node = heap.poll();\n        node[1]++;\n        heap.offer(node);\n      }\n    }\n\n    return ugly[n - 1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Relative Ranks",
      "difficulty": "Easy",
      "subpattern": "Ranking by max-heap",
      "question": "Given an array score where score[i] is the score of athlete i, return each athlete's rank. The top three ranks are Gold Medal, Silver Medal, and Bronze Medal; the rest are numeric ranks.",
      "trigger": "Ranks are assigned by repeatedly taking the highest remaining score while preserving each athlete's original index.",
      "intuition": "Push score/index pairs into a max-heap. Pop in rank order and write the medal or rank string at the original index.",
      "edgeCases": "One athlete, exactly three athletes, more than three athletes, large scores, scores already sorted ascending or descending.",
      "constraints": "1 <= score.length <= 10000; 0 <= score[i] <= 1000000; all scores are unique.",
      "source": {
        "label": "Relative Ranks - LeetCode 506",
        "url": "https://leetcode.com/problems/relative-ranks/"
      },
      "examples": [
        {
          "input": "score = [5,4,3,2,1]",
          "output": "[\"Gold Medal\",\"Silver Medal\",\"Bronze Medal\",\"4\",\"5\"]",
          "explanation": "Scores are already in descending order."
        },
        {
          "input": "score = [10,3,8,9,4]",
          "output": "[\"Gold Medal\",\"5\",\"Bronze Medal\",\"Silver Medal\",\"4\"]",
          "explanation": "Ranks are mapped back to original indexes."
        },
        {
          "input": "score = [1]",
          "output": "[\"Gold Medal\"]",
          "explanation": "The only athlete receives first place."
        }
      ],
      "bruteForceComplexity": "Time O(n^2): repeatedly scan for the next highest unused score; Space O(n).",
      "optimizedComplexity": "Time O(n log n): push and pop every athlete once from the heap; Space O(n).",
      "recursiveComplexity": "Time O(n log n): recursive heap pop per rank; Space O(n) heap plus O(n) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String[] findRelativeRanks(int[] score) {\n    String[] answer = new String[score.length];\n    boolean[] used = new boolean[score.length];\n\n    for (int rank = 1; rank <= score.length; rank++) {\n      int best = -1;\n      for (int i = 0; i < score.length; i++) {\n        if (!used[i] && (best == -1 || score[i] > score[best])) {\n          best = i;\n        }\n      }\n      used[best] = true;\n      answer[best] = label(rank);\n    }\n\n    return answer;\n  }\n\n  private String label(int rank) {\n    if (rank == 1) return \"Gold Medal\";\n    if (rank == 2) return \"Silver Medal\";\n    if (rank == 3) return \"Bronze Medal\";\n    return String.valueOf(rank);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String[] findRelativeRanks(int[] score) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));\n    for (int i = 0; i < score.length; i++) {\n      heap.offer(new int[] {score[i], i});\n    }\n\n    String[] answer = new String[score.length];\n    int rank = 1;\n    while (!heap.isEmpty()) {\n      int[] athlete = heap.poll();\n      answer[athlete[1]] = label(rank++);\n    }\n\n    return answer;\n  }\n\n  private String label(int rank) {\n    if (rank == 1) return \"Gold Medal\";\n    if (rank == 2) return \"Silver Medal\";\n    if (rank == 3) return \"Bronze Medal\";\n    return String.valueOf(rank);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String[] findRelativeRanks(int[] score) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));\n    for (int i = 0; i < score.length; i++) {\n      heap.offer(new int[] {score[i], i});\n    }\n\n    String[] answer = new String[score.length];\n    assign(1, heap, answer);\n    return answer;\n  }\n\n  private void assign(int rank, PriorityQueue<int[]> heap, String[] answer) {\n    if (heap.isEmpty()) return;\n    int[] athlete = heap.poll();\n    answer[athlete[1]] = label(rank);\n    assign(rank + 1, heap, answer);\n  }\n\n  private String label(int rank) {\n    if (rank == 1) return \"Gold Medal\";\n    if (rank == 2) return \"Silver Medal\";\n    if (rank == 3) return \"Bronze Medal\";\n    return String.valueOf(rank);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String[] findRelativeRanks(int[] score) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));\n    for (int i = 0; i < score.length; i++) {\n      heap.offer(new int[] {score[i], i});\n    }\n\n    String[] answer = new String[score.length];\n    int rank = 1;\n    while (!heap.isEmpty()) {\n      int[] athlete = heap.poll();\n      answer[athlete[1]] = label(rank++);\n    }\n\n    return answer;\n  }\n\n  private String label(int rank) {\n    if (rank == 1) return \"Gold Medal\";\n    if (rank == 2) return \"Silver Medal\";\n    if (rank == 3) return \"Bronze Medal\";\n    return String.valueOf(rank);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String[] findRelativeRanks(int[] score) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));\n    for (int i = 0; i < score.length; i++) {\n      heap.offer(new int[] {score[i], i});\n    }\n\n    String[] answer = new String[score.length];\n    int rank = 1;\n    while (!heap.isEmpty()) {\n      int[] athlete = heap.poll();\n      answer[athlete[1]] = label(rank++);\n    }\n\n    return answer;\n  }\n\n  private String label(int rank) {\n    if (rank == 1) return \"Gold Medal\";\n    if (rank == 2) return \"Silver Medal\";\n    if (rank == 3) return \"Bronze Medal\";\n    return String.valueOf(rank);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Sort Characters By Frequency",
      "difficulty": "Medium",
      "subpattern": "Frequency ordering with max-heap",
      "question": "Given a string s, sort it in decreasing order based on the frequency of characters and return the resulting string. Characters with the same frequency can appear in any order.",
      "trigger": "The output repeatedly needs the character with the highest remaining frequency, which maps directly to a max-heap over frequency counts.",
      "intuition": "Count each character, push character/frequency pairs into a max-heap, then append each character frequency times as it is popped.",
      "edgeCases": "Empty string, one character, all characters unique, all characters same, uppercase and lowercase treated separately, same frequency tie order not fixed.",
      "constraints": "1 <= s.length <= 500000; s contains uppercase letters, lowercase letters, digits, or symbols depending on platform variant.",
      "source": {
        "label": "Sort Characters By Frequency - LeetCode 451",
        "url": "https://leetcode.com/problems/sort-characters-by-frequency/"
      },
      "examples": [
        {
          "input": "s = \"tree\"",
          "output": "\"eert\"",
          "explanation": "e appears twice, so it comes before t and r."
        },
        {
          "input": "s = \"cccaaa\"",
          "output": "\"cccaaa\"",
          "explanation": "c and a tie with frequency 3, so either order is valid."
        },
        {
          "input": "s = \"Aabb\"",
          "output": "\"bbAa\"",
          "explanation": "b appears twice; A and a are different characters."
        }
      ],
      "bruteForceComplexity": "Time O(n + u^2 + n): count characters, repeatedly scan all unique characters for the next maximum; Space O(u).",
      "optimizedComplexity": "Time O(n + u log u): count and heap-sort unique characters by frequency; Space O(u + n) for heap and output.",
      "recursiveComplexity": "Time O(n + u log u): recursively pop heap entries and append; Space O(u + n) including recursion stack and output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> freq = new HashMap<>();\n    for (char ch : s.toCharArray()) {\n      freq.put(ch, freq.getOrDefault(ch, 0) + 1);\n    }\n\n    StringBuilder answer = new StringBuilder();\n    Set<Character> used = new HashSet<>();\n    while (used.size() < freq.size()) {\n      char best = 0;\n      int bestCount = -1;\n      for (char ch : freq.keySet()) {\n        if (!used.contains(ch) && freq.get(ch) > bestCount) {\n          best = ch;\n          bestCount = freq.get(ch);\n        }\n      }\n      used.add(best);\n      for (int i = 0; i < bestCount; i++) answer.append(best);\n    }\n\n    return answer.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> freq = new HashMap<>();\n    for (char ch : s.toCharArray()) {\n      freq.put(ch, freq.getOrDefault(ch, 0) + 1);\n    }\n\n    PriorityQueue<Map.Entry<Character, Integer>> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(b.getValue(), a.getValue()));\n    heap.addAll(freq.entrySet());\n\n    StringBuilder answer = new StringBuilder();\n    while (!heap.isEmpty()) {\n      Map.Entry<Character, Integer> entry = heap.poll();\n      for (int i = 0; i < entry.getValue(); i++) {\n        answer.append(entry.getKey());\n      }\n    }\n\n    return answer.toString();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> freq = new HashMap<>();\n    for (char ch : s.toCharArray()) {\n      freq.put(ch, freq.getOrDefault(ch, 0) + 1);\n    }\n\n    PriorityQueue<Map.Entry<Character, Integer>> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(b.getValue(), a.getValue()));\n    heap.addAll(freq.entrySet());\n\n    StringBuilder answer = new StringBuilder();\n    build(heap, answer);\n    return answer.toString();\n  }\n\n  private void build(PriorityQueue<Map.Entry<Character, Integer>> heap, StringBuilder answer) {\n    if (heap.isEmpty()) return;\n    Map.Entry<Character, Integer> entry = heap.poll();\n    for (int i = 0; i < entry.getValue(); i++) answer.append(entry.getKey());\n    build(heap, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> freq = new HashMap<>();\n    for (char ch : s.toCharArray()) {\n      freq.put(ch, freq.getOrDefault(ch, 0) + 1);\n    }\n\n    PriorityQueue<Map.Entry<Character, Integer>> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(b.getValue(), a.getValue()));\n    heap.addAll(freq.entrySet());\n\n    StringBuilder answer = new StringBuilder();\n    while (!heap.isEmpty()) {\n      Map.Entry<Character, Integer> entry = heap.poll();\n      for (int i = 0; i < entry.getValue(); i++) {\n        answer.append(entry.getKey());\n      }\n    }\n\n    return answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String frequencySort(String s) {\n    Map<Character, Integer> freq = new HashMap<>();\n    for (char ch : s.toCharArray()) {\n      freq.put(ch, freq.getOrDefault(ch, 0) + 1);\n    }\n\n    PriorityQueue<Map.Entry<Character, Integer>> heap = new PriorityQueue<>((a, b) ->\n        Integer.compare(b.getValue(), a.getValue()));\n    heap.addAll(freq.entrySet());\n\n    StringBuilder answer = new StringBuilder();\n    while (!heap.isEmpty()) {\n      Map.Entry<Character, Integer> entry = heap.poll();\n      for (int i = 0; i < entry.getValue(); i++) {\n        answer.append(entry.getKey());\n      }\n    }\n\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Deviation in Array",
      "difficulty": "Hard",
      "subpattern": "Minimize range using max-heap of reducible values",
      "question": "Given an array nums, you may multiply odd numbers by 2 and divide even numbers by 2 any number of times. Return the minimum possible deviation between the maximum and minimum value in the array.",
      "trigger": "The current deviation is controlled by the maximum and minimum values, and only the current maximum can be safely reduced after all numbers are normalized upward.",
      "intuition": "Convert every number to its largest even form, track the minimum, and keep all values in a max-heap. Repeatedly halve the current maximum while it is even and update the best range.",
      "edgeCases": "Single element, all odd values, all even values, duplicates, values becoming equal, large values after doubling odd numbers.",
      "constraints": "1 <= nums.length <= 50000; 1 <= nums[i] <= 1000000000.",
      "source": {
        "label": "Minimum Deviation in Array - LeetCode 1675",
        "url": "https://leetcode.com/problems/minimize-deviation-in-array/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,4]",
          "output": "1",
          "explanation": "Normalize to [2,2,6,4], then reduce 6 and 4 to reach range 1."
        },
        {
          "input": "nums = [4,1,5,20,3]",
          "output": "3",
          "explanation": "The best reachable values can have max-min equal to 3."
        },
        {
          "input": "nums = [2,10,8]",
          "output": "3",
          "explanation": "Reduce 10 to 5 and 8 to 4 for deviation 3."
        }
      ],
      "bruteForceComplexity": "Time exponential in the number of reducible states if every reachable value combination is explored; Space exponential for visited states.",
      "optimizedComplexity": "Time O(n log n log M): each value is halved at most O(log M) times; Space O(n).",
      "recursiveComplexity": "Time O(n log n log M): recursive max reduction over the heap; Space O(n + log M) including recursion depth in practice.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviation(int[] nums) {\n    List<List<Integer>> options = new ArrayList<>();\n    for (int num : nums) {\n      TreeSet<Integer> values = new TreeSet<>();\n      if (num % 2 == 1) num *= 2;\n      while (num % 2 == 0) {\n        values.add(num);\n        num /= 2;\n      }\n      values.add(num);\n      options.add(new ArrayList<>(values));\n    }\n    return search(options, 0, Integer.MAX_VALUE, Integer.MIN_VALUE);\n  }\n\n  private int search(List<List<Integer>> options, int index, int min, int max) {\n    if (index == options.size()) return max - min;\n    int best = Integer.MAX_VALUE;\n    for (int value : options.get(index)) {\n      best = Math.min(best, search(options, index + 1, Math.min(min, value), Math.max(max, value)));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviation(int[] nums) {\n    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n    int min = Integer.MAX_VALUE;\n\n    for (int num : nums) {\n      int value = num % 2 == 1 ? num * 2 : num;\n      maxHeap.offer(value);\n      min = Math.min(min, value);\n    }\n\n    int answer = Integer.MAX_VALUE;\n    while (!maxHeap.isEmpty()) {\n      int max = maxHeap.poll();\n      answer = Math.min(answer, max - min);\n      if (max % 2 == 1) break;\n\n      int reduced = max / 2;\n      min = Math.min(min, reduced);\n      maxHeap.offer(reduced);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviation(int[] nums) {\n    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n    int min = Integer.MAX_VALUE;\n    for (int num : nums) {\n      int value = num % 2 == 1 ? num * 2 : num;\n      maxHeap.offer(value);\n      min = Math.min(min, value);\n    }\n    return reduce(maxHeap, min, Integer.MAX_VALUE);\n  }\n\n  private int reduce(PriorityQueue<Integer> maxHeap, int min, int best) {\n    int max = maxHeap.poll();\n    best = Math.min(best, max - min);\n    if (max % 2 == 1) return best;\n\n    int reduced = max / 2;\n    maxHeap.offer(reduced);\n    return reduce(maxHeap, Math.min(min, reduced), best);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviation(int[] nums) {\n    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n    int min = Integer.MAX_VALUE;\n\n    for (int num : nums) {\n      int value = num % 2 == 1 ? num * 2 : num;\n      maxHeap.offer(value);\n      min = Math.min(min, value);\n    }\n\n    int answer = Integer.MAX_VALUE;\n    while (!maxHeap.isEmpty()) {\n      int max = maxHeap.poll();\n      answer = Math.min(answer, max - min);\n      if (max % 2 == 1) break;\n\n      int reduced = max / 2;\n      min = Math.min(min, reduced);\n      maxHeap.offer(reduced);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviation(int[] nums) {\n    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n    int min = Integer.MAX_VALUE;\n\n    for (int num : nums) {\n      int value = num % 2 == 1 ? num * 2 : num;\n      maxHeap.offer(value);\n      min = Math.min(min, value);\n    }\n\n    int answer = Integer.MAX_VALUE;\n    while (!maxHeap.isEmpty()) {\n      int max = maxHeap.poll();\n      answer = Math.min(answer, max - min);\n      if (max % 2 == 1) break;\n\n      int reduced = max / 2;\n      min = Math.min(min, reduced);\n      maxHeap.offer(reduced);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Furthest Building You Can Reach",
      "difficulty": "Medium",
      "subpattern": "Resource allocation with min-heap for ladder climbs",
      "question": "Given building heights, bricks, and ladders, return the furthest building index you can reach. Moving upward by diff requires either diff bricks or one ladder; moving downward or flat costs nothing.",
      "trigger": "Ladders should be saved for the largest climbs seen so far, and smaller climbs should be paid with bricks when ladder count is exceeded.",
      "intuition": "Push every positive climb into a min-heap representing climbs assigned to ladders. If heap size exceeds ladders, pay bricks for the smallest ladder climb.",
      "edgeCases": "No upward climbs, zero bricks, zero ladders, first climb too large, exact brick exhaustion, many equal climbs.",
      "constraints": "1 <= heights.length <= 100000; 1 <= heights[i] <= 1000000; 0 <= bricks <= 1000000000; 0 <= ladders <= heights.length.",
      "source": {
        "label": "Furthest Building You Can Reach - LeetCode 1642",
        "url": "https://leetcode.com/problems/furthest-building-you-can-reach/"
      },
      "examples": [
        {
          "input": "heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1",
          "output": "4",
          "explanation": "Use bricks for climb 5 and ladder for climb 3 or vice versa until index 4."
        },
        {
          "input": "heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2",
          "output": "7",
          "explanation": "The heap keeps ladders on the biggest climbs."
        },
        {
          "input": "heights = [14,3,19,3], bricks = 17, ladders = 0",
          "output": "3",
          "explanation": "Only one upward climb of 16 must be paid with bricks."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n) in direct branch search over brick/ladder choices; Space O(n) recursion depth.",
      "optimizedComplexity": "Time O(n log L): heap stores climbs assigned to ladders; Space O(L), where L is ladders.",
      "recursiveComplexity": "Time O(n log L): recursive scan with the same min-heap invariant; Space O(L + n) including recursion stack.",
      "bruteForceCode": "class Solution {\n  public int furthestBuilding(int[] heights, int bricks, int ladders) {\n    return dfs(heights, 0, bricks, ladders);\n  }\n\n  private int dfs(int[] heights, int index, int bricks, int ladders) {\n    if (index == heights.length - 1) return index;\n    int climb = heights[index + 1] - heights[index];\n    if (climb <= 0) return dfs(heights, index + 1, bricks, ladders);\n\n    int best = index;\n    if (bricks >= climb) {\n      best = Math.max(best, dfs(heights, index + 1, bricks - climb, ladders));\n    }\n    if (ladders > 0) {\n      best = Math.max(best, dfs(heights, index + 1, bricks, ladders - 1));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int furthestBuilding(int[] heights, int bricks, int ladders) {\n    PriorityQueue<Integer> ladderClimbs = new PriorityQueue<>();\n\n    for (int i = 0; i < heights.length - 1; i++) {\n      int climb = heights[i + 1] - heights[i];\n      if (climb <= 0) continue;\n\n      ladderClimbs.offer(climb);\n      if (ladderClimbs.size() > ladders) {\n        bricks -= ladderClimbs.poll();\n      }\n      if (bricks < 0) return i;\n    }\n\n    return heights.length - 1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int furthestBuilding(int[] heights, int bricks, int ladders) {\n    return reach(0, heights, bricks, ladders, new PriorityQueue<>());\n  }\n\n  private int reach(int index, int[] heights, int bricks, int ladders,\n      PriorityQueue<Integer> ladderClimbs) {\n    if (index == heights.length - 1) return index;\n\n    int climb = heights[index + 1] - heights[index];\n    if (climb > 0) {\n      ladderClimbs.offer(climb);\n      if (ladderClimbs.size() > ladders) {\n        bricks -= ladderClimbs.poll();\n      }\n      if (bricks < 0) return index;\n    }\n\n    return reach(index + 1, heights, bricks, ladders, ladderClimbs);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int furthestBuilding(int[] heights, int bricks, int ladders) {\n    PriorityQueue<Integer> ladderClimbs = new PriorityQueue<>();\n\n    for (int i = 0; i < heights.length - 1; i++) {\n      int climb = heights[i + 1] - heights[i];\n      if (climb <= 0) continue;\n\n      ladderClimbs.offer(climb);\n      if (ladderClimbs.size() > ladders) {\n        bricks -= ladderClimbs.poll();\n      }\n      if (bricks < 0) return i;\n    }\n\n    return heights.length - 1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int furthestBuilding(int[] heights, int bricks, int ladders) {\n    PriorityQueue<Integer> ladderClimbs = new PriorityQueue<>();\n\n    for (int i = 0; i < heights.length - 1; i++) {\n      int climb = heights[i + 1] - heights[i];\n      if (climb <= 0) continue;\n\n      ladderClimbs.offer(climb);\n      if (ladderClimbs.size() > ladders) {\n        bricks -= ladderClimbs.poll();\n      }\n      if (bricks < 0) return i;\n    }\n\n    return heights.length - 1;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Reduce Array Size to The Half",
      "difficulty": "Medium",
      "subpattern": "Frequency top-k with max-heap",
      "question": "Given an integer array arr, choose the minimum number of unique integers to remove so that at least half of the array elements are removed.",
      "trigger": "To minimize the number of chosen values, always remove the value with the largest remaining frequency first.",
      "intuition": "Count frequencies, push frequencies into a max-heap, and keep removing largest frequencies until the removed count reaches half the array length.",
      "edgeCases": "Array length 1 or 2, all values equal, all values unique, many equal frequencies, odd length where target is n / 2 rounded down by problem definition.",
      "constraints": "1 <= arr.length <= 100000; arr.length is even in the original problem; 1 <= arr[i] <= 100000.",
      "source": {
        "label": "Reduce Array Size to The Half - LeetCode 1338",
        "url": "https://leetcode.com/problems/reduce-array-size-to-the-half/"
      },
      "examples": [
        {
          "input": "arr = [3,3,3,3,5,5,5,2,2,7]",
          "output": "2",
          "explanation": "Removing 3 and 5 removes 7 elements, at least half."
        },
        {
          "input": "arr = [7,7,7,7,7,7]",
          "output": "1",
          "explanation": "Removing value 7 removes the whole array."
        },
        {
          "input": "arr = [1,2,3,4]",
          "output": "2",
          "explanation": "Each value has frequency 1, so two values must be removed."
        }
      ],
      "bruteForceComplexity": "Time O(n + u^2): count frequencies and repeatedly scan for the largest unused frequency; Space O(u).",
      "optimizedComplexity": "Time O(n + u log u): count and pop frequencies from a max-heap; Space O(u).",
      "recursiveComplexity": "Time O(n + u log u): recursively pop max frequencies; Space O(u) heap plus O(u) recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minSetSize(int[] arr) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int value : arr) freq.put(value, freq.getOrDefault(value, 0) + 1);\n\n    boolean[] used = new boolean[freq.size()];\n    int[] counts = new int[freq.size()];\n    int index = 0;\n    for (int count : freq.values()) counts[index++] = count;\n\n    int removed = 0;\n    int chosen = 0;\n    while (removed < arr.length / 2) {\n      int best = -1;\n      for (int i = 0; i < counts.length; i++) {\n        if (!used[i] && (best == -1 || counts[i] > counts[best])) best = i;\n      }\n      used[best] = true;\n      removed += counts[best];\n      chosen++;\n    }\n    return chosen;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minSetSize(int[] arr) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int value : arr) {\n      freq.put(value, freq.getOrDefault(value, 0) + 1);\n    }\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());\n    heap.addAll(freq.values());\n\n    int removed = 0;\n    int chosen = 0;\n    while (removed < arr.length / 2) {\n      removed += heap.poll();\n      chosen++;\n    }\n\n    return chosen;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minSetSize(int[] arr) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int value : arr) {\n      freq.put(value, freq.getOrDefault(value, 0) + 1);\n    }\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());\n    heap.addAll(freq.values());\n    return remove(heap, arr.length / 2, 0, 0);\n  }\n\n  private int remove(PriorityQueue<Integer> heap, int target, int removed, int chosen) {\n    if (removed >= target) return chosen;\n    return remove(heap, target, removed + heap.poll(), chosen + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minSetSize(int[] arr) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int value : arr) {\n      freq.put(value, freq.getOrDefault(value, 0) + 1);\n    }\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());\n    heap.addAll(freq.values());\n\n    int removed = 0;\n    int chosen = 0;\n    while (removed < arr.length / 2) {\n      removed += heap.poll();\n      chosen++;\n    }\n\n    return chosen;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minSetSize(int[] arr) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int value : arr) {\n      freq.put(value, freq.getOrDefault(value, 0) + 1);\n    }\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());\n    heap.addAll(freq.values());\n\n    int removed = 0;\n    int chosen = 0;\n    while (removed < arr.length / 2) {\n      removed += heap.poll();\n      chosen++;\n    }\n\n    return chosen;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Total Cost to Hire K Workers",
      "difficulty": "Medium",
      "subpattern": "Two-sided candidate pools with min-heaps",
      "question": "Given costs, k, and candidates, hire exactly k workers. In each session, choose the lowest cost worker among the first candidates unchosen workers and last candidates unchosen workers, breaking ties by smaller index. Return the total hiring cost.",
      "trigger": "Each hire compares the cheapest available worker from two moving frontier pools, and after a pick the same side must be replenished.",
      "intuition": "Maintain one min-heap for left candidates and one for right candidates. Pop the cheaper top, add its cost, and refill from the same side while the frontiers have not crossed.",
      "edgeCases": "candidates covers the whole array, k = 1, equal costs, left and right pools overlap, frontiers cross, large total requiring long.",
      "constraints": "1 <= costs.length <= 100000; 1 <= costs[i] <= 100000; 1 <= k, candidates <= costs.length.",
      "source": {
        "label": "Total Cost to Hire K Workers - LeetCode 2462",
        "url": "https://leetcode.com/problems/total-cost-to-hire-k-workers/"
      },
      "examples": [
        {
          "input": "costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4",
          "output": "11",
          "explanation": "Hire costs 2, 2, and 7."
        },
        {
          "input": "costs = [1,2,4,1], k = 3, candidates = 3",
          "output": "4",
          "explanation": "The candidate pools cover all workers."
        },
        {
          "input": "costs = [5,5,5], k = 2, candidates = 1",
          "output": "10",
          "explanation": "Equal costs are still valid from either side."
        }
      ],
      "bruteForceComplexity": "Time O(k*n): directly scan both eligible candidate windows for every hire; Space O(n) for hired flags.",
      "optimizedComplexity": "Time O((k + candidates) log candidates): each candidate enters a heap at most once; Space O(candidates).",
      "recursiveComplexity": "Time O((k + candidates) log candidates): recursive hire steps over two heaps; Space O(candidates + k) including recursion stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public long totalCost(int[] costs, int k, int candidates) {\n    boolean[] hired = new boolean[costs.length];\n    long total = 0;\n\n    for (int session = 0; session < k; session++) {\n      int best = -1;\n      for (int i = 0; i < costs.length; i++) {\n        if (hired[i] || !eligible(i, hired, candidates)) continue;\n        if (best == -1 || costs[i] < costs[best] || (costs[i] == costs[best] && i < best)) {\n          best = i;\n        }\n      }\n      hired[best] = true;\n      total += costs[best];\n    }\n\n    return total;\n  }\n\n  private boolean eligible(int index, boolean[] hired, int candidates) {\n    int leftCount = 0;\n    for (int i = 0; i < hired.length; i++) {\n      if (!hired[i] && leftCount++ < candidates && i == index) return true;\n    }\n    int rightCount = 0;\n    for (int i = hired.length - 1; i >= 0; i--) {\n      if (!hired[i] && rightCount++ < candidates && i == index) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public long totalCost(int[] costs, int k, int candidates) {\n    PriorityQueue<int[]> leftHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<int[]> rightHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    int left = 0;\n    int right = costs.length - 1;\n    while (left <= right && leftHeap.size() < candidates) {\n      leftHeap.offer(new int[] {costs[left], left++});\n    }\n    while (left <= right && rightHeap.size() < candidates) {\n      rightHeap.offer(new int[] {costs[right], right--});\n    }\n\n    long total = 0;\n    for (int hired = 0; hired < k; hired++) {\n      if (rightHeap.isEmpty() || (!leftHeap.isEmpty() && leftHeap.peek()[0] <= rightHeap.peek()[0])) {\n        total += leftHeap.poll()[0];\n        if (left <= right) leftHeap.offer(new int[] {costs[left], left++});\n      } else {\n        total += rightHeap.poll()[0];\n        if (left <= right) rightHeap.offer(new int[] {costs[right], right--});\n      }\n    }\n\n    return total;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public long totalCost(int[] costs, int k, int candidates) {\n    PriorityQueue<int[]> leftHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<int[]> rightHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    int[] bounds = seed(costs, candidates, leftHeap, rightHeap);\n    return hire(costs, k, bounds[0], bounds[1], leftHeap, rightHeap, 0L);\n  }\n\n  private int[] seed(int[] costs, int candidates, PriorityQueue<int[]> leftHeap,\n      PriorityQueue<int[]> rightHeap) {\n    int left = 0, right = costs.length - 1;\n    while (left <= right && leftHeap.size() < candidates) leftHeap.offer(new int[] {costs[left], left++});\n    while (left <= right && rightHeap.size() < candidates) rightHeap.offer(new int[] {costs[right], right--});\n    return new int[] {left, right};\n  }\n\n  private long hire(int[] costs, int remaining, int left, int right,\n      PriorityQueue<int[]> leftHeap, PriorityQueue<int[]> rightHeap, long total) {\n    if (remaining == 0) return total;\n\n    if (rightHeap.isEmpty() || (!leftHeap.isEmpty() && leftHeap.peek()[0] <= rightHeap.peek()[0])) {\n      total += leftHeap.poll()[0];\n      if (left <= right) leftHeap.offer(new int[] {costs[left], left++});\n    } else {\n      total += rightHeap.poll()[0];\n      if (left <= right) rightHeap.offer(new int[] {costs[right], right--});\n    }\n\n    return hire(costs, remaining - 1, left, right, leftHeap, rightHeap, total);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public long totalCost(int[] costs, int k, int candidates) {\n    PriorityQueue<int[]> leftHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<int[]> rightHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    int left = 0;\n    int right = costs.length - 1;\n    while (left <= right && leftHeap.size() < candidates) {\n      leftHeap.offer(new int[] {costs[left], left++});\n    }\n    while (left <= right && rightHeap.size() < candidates) {\n      rightHeap.offer(new int[] {costs[right], right--});\n    }\n\n    long total = 0;\n    for (int hired = 0; hired < k; hired++) {\n      if (rightHeap.isEmpty() || (!leftHeap.isEmpty() && leftHeap.peek()[0] <= rightHeap.peek()[0])) {\n        total += leftHeap.poll()[0];\n        if (left <= right) leftHeap.offer(new int[] {costs[left], left++});\n      } else {\n        total += rightHeap.poll()[0];\n        if (left <= right) rightHeap.offer(new int[] {costs[right], right--});\n      }\n    }\n\n    return total;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public long totalCost(int[] costs, int k, int candidates) {\n    PriorityQueue<int[]> leftHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    PriorityQueue<int[]> rightHeap = new PriorityQueue<>((a, b) ->\n        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    int left = 0;\n    int right = costs.length - 1;\n    while (left <= right && leftHeap.size() < candidates) {\n      leftHeap.offer(new int[] {costs[left], left++});\n    }\n    while (left <= right && rightHeap.size() < candidates) {\n      rightHeap.offer(new int[] {costs[right], right--});\n    }\n\n    long total = 0;\n    for (int hired = 0; hired < k; hired++) {\n      if (rightHeap.isEmpty() || (!leftHeap.isEmpty() && leftHeap.peek()[0] <= rightHeap.peek()[0])) {\n        total += leftHeap.poll()[0];\n        if (left <= right) leftHeap.offer(new int[] {costs[left], left++});\n      } else {\n        total += rightHeap.poll()[0];\n        if (left <= right) rightHeap.offer(new int[] {costs[right], right--});\n      }\n    }\n\n    return total;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Heap / Priority Queue signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Heap / Priority Queue problem with duplicates and boundary indexes.",
    "A Heap / Priority Queue problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Heap / Priority Queue but needs one helper structure.",
    "A maximum-constraint version of a familiar Heap / Priority Queue problem.",
    "A recognition test where the statement does not mention Heap / Priority Queue."
  ]
};
