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
      "difficulty": "Easy",
      "subpattern": "Top K",
      "question": "Solve Kth Largest Element in an Array using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Kth Largest Element in an Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Kth%20Largest%20Element%20in%20an%20Array"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAnArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Top K Frequent Elements",
      "difficulty": "Easy",
      "subpattern": "streaming median",
      "question": "Solve Top K Frequent Elements using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Top K Frequent Elements - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Top%20K%20Frequent%20Elements"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int topKFrequentElements(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "K Closest Points to Origin",
      "difficulty": "Easy",
      "subpattern": "scheduling",
      "question": "Solve K Closest Points to Origin using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes scheduling and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for scheduling and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "K Closest Points to Origin - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=K%20Closest%20Points%20to%20Origin"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int kClosestPointsToOrigin(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int kClosestPointsToOrigin(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int kClosestPointsToOrigin(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int kClosestPointsToOrigin(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int kClosestPointsToOrigin(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Last Stone Weight",
      "difficulty": "Easy",
      "subpattern": "k-way merge.",
      "question": "Solve Last Stone Weight using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes k-way merge. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for k-way merge. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Last Stone Weight - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Last%20Stone%20Weight"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int lastStoneWeight(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lastStoneWeight(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lastStoneWeight(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lastStoneWeight(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int lastStoneWeight(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Largest Element in a Stream",
      "difficulty": "Easy",
      "subpattern": "Top K",
      "question": "Solve Kth Largest Element in a Stream using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Kth Largest Element in a Stream - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Kth%20Largest%20Element%20in%20a%20Stream"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAStream(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int kthLargestElementInAStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Median from Data Stream",
      "difficulty": "Easy",
      "subpattern": "streaming median",
      "question": "Solve Find Median from Data Stream using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find Median from Data Stream - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20Median%20from%20Data%20Stream"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findMedianFromDataStream(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMedianFromDataStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMedianFromDataStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMedianFromDataStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findMedianFromDataStream(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge k Sorted Lists",
      "difficulty": "Easy",
      "subpattern": "scheduling",
      "question": "Solve Merge k Sorted Lists using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes scheduling and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for scheduling and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Merge k Sorted Lists - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Merge%20k%20Sorted%20Lists"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int mergeKSortedLists(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int mergeKSortedLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int mergeKSortedLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int mergeKSortedLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int mergeKSortedLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Kth Smallest Element in a Sorted Matrix",
      "difficulty": "Easy",
      "subpattern": "k-way merge.",
      "question": "Solve Kth Smallest Element in a Sorted Matrix using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes k-way merge. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for k-way merge. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Kth Smallest Element in a Sorted Matrix - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Kth%20Smallest%20Element%20in%20a%20Sorted%20Matrix"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInASortedMatrix(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInASortedMatrix(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInASortedMatrix(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInASortedMatrix(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int kthSmallestElementInASortedMatrix(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Task Scheduler",
      "difficulty": "Easy",
      "subpattern": "Top K",
      "question": "Solve Task Scheduler using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Task Scheduler - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Task%20Scheduler"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int taskScheduler(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int taskScheduler(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int taskScheduler(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int taskScheduler(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int taskScheduler(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reorganize String",
      "difficulty": "Easy",
      "subpattern": "streaming median",
      "question": "Solve Reorganize String using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Reorganize String - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Reorganize%20String"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int reorganizeString(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int reorganizeString(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int reorganizeString(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int reorganizeString(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int reorganizeString(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Meeting Rooms II",
      "difficulty": "Medium",
      "subpattern": "scheduling",
      "question": "Solve Meeting Rooms II using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes scheduling and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for scheduling and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Meeting Rooms II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Meeting%20Rooms%20II"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int meetingRoomsIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find K Pairs with Smallest Sums",
      "difficulty": "Medium",
      "subpattern": "k-way merge.",
      "question": "Solve Find K Pairs with Smallest Sums using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes k-way merge. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for k-way merge. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Find K Pairs with Smallest Sums - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Find%20K%20Pairs%20with%20Smallest%20Sums"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findKPairsWithSmallestSums(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findKPairsWithSmallestSums(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findKPairsWithSmallestSums(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findKPairsWithSmallestSums(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findKPairsWithSmallestSums(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "IPO",
      "difficulty": "Medium",
      "subpattern": "Top K",
      "question": "Solve IPO using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "IPO - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=IPO"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int ipo(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int ipo(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int ipo(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int ipo(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int ipo(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Smallest Range Covering Elements from K Lists",
      "difficulty": "Medium",
      "subpattern": "streaming median",
      "question": "Solve Smallest Range Covering Elements from K Lists using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Smallest Range Covering Elements from K Lists - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Smallest%20Range%20Covering%20Elements%20from%20K%20Lists"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int smallestRangeCoveringElementsFromKLists(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int smallestRangeCoveringElementsFromKLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int smallestRangeCoveringElementsFromKLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int smallestRangeCoveringElementsFromKLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int smallestRangeCoveringElementsFromKLists(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Cost to Connect Sticks",
      "difficulty": "Medium",
      "subpattern": "scheduling",
      "question": "Solve Minimum Cost to Connect Sticks using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes scheduling and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for scheduling and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Cost to Connect Sticks - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Cost%20to%20Connect%20Sticks"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostToConnectSticks(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostToConnectSticks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostToConnectSticks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumCostToConnectSticks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumCostToConnectSticks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Seat Reservation Manager",
      "difficulty": "Medium",
      "subpattern": "k-way merge.",
      "question": "Solve Seat Reservation Manager using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes k-way merge. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for k-way merge. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Seat Reservation Manager - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Seat%20Reservation%20Manager"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int seatReservationManager(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int seatReservationManager(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int seatReservationManager(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int seatReservationManager(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int seatReservationManager(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Process Tasks Using Servers",
      "difficulty": "Medium",
      "subpattern": "Top K",
      "question": "Solve Process Tasks Using Servers using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Process Tasks Using Servers - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Process%20Tasks%20Using%20Servers"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int processTasksUsingServers(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int processTasksUsingServers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int processTasksUsingServers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int processTasksUsingServers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int processTasksUsingServers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Single-Threaded CPU",
      "difficulty": "Medium",
      "subpattern": "streaming median",
      "question": "Solve Single-Threaded CPU using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Single-Threaded CPU - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Single-Threaded%20CPU"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int singleThreadedCpu(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int singleThreadedCpu(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int singleThreadedCpu(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int singleThreadedCpu(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int singleThreadedCpu(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Performance of a Team",
      "difficulty": "Medium",
      "subpattern": "scheduling",
      "question": "Solve Maximum Performance of a Team using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes scheduling and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for scheduling and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Performance of a Team - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Performance%20of%20a%20Team"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumPerformanceOfATeam(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumPerformanceOfATeam(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumPerformanceOfATeam(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maximumPerformanceOfATeam(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumPerformanceOfATeam(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "The Skyline Problem",
      "difficulty": "Medium",
      "subpattern": "k-way merge.",
      "question": "Solve The Skyline Problem using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes k-way merge. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for k-way merge. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "The Skyline Problem - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=The%20Skyline%20Problem"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int theSkylineProblem(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int theSkylineProblem(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int theSkylineProblem(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int theSkylineProblem(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int theSkylineProblem(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Number of Refueling Stops",
      "difficulty": "Medium",
      "subpattern": "Top K",
      "question": "Solve Minimum Number of Refueling Stops using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Number of Refueling Stops - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Number%20of%20Refueling%20Stops"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfRefuelingStops(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfRefuelingStops(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfRefuelingStops(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfRefuelingStops(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumNumberOfRefuelingStops(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Sliding Window Median",
      "difficulty": "Medium",
      "subpattern": "streaming median",
      "question": "Solve Sliding Window Median using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sliding Window Median - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sliding%20Window%20Median"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int slidingWindowMedian(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int slidingWindowMedian(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int slidingWindowMedian(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int slidingWindowMedian(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int slidingWindowMedian(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Ugly Number II",
      "difficulty": "Medium",
      "subpattern": "scheduling",
      "question": "Solve Ugly Number II using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes scheduling and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for scheduling and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Ugly Number II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Ugly%20Number%20II"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int uglyNumberIi(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int uglyNumberIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int uglyNumberIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int uglyNumberIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int uglyNumberIi(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Super Ugly Number",
      "difficulty": "Medium",
      "subpattern": "k-way merge.",
      "question": "Solve Super Ugly Number using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes k-way merge. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for k-way merge. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Super Ugly Number - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Super%20Ugly%20Number"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int superUglyNumber(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int superUglyNumber(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int superUglyNumber(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int superUglyNumber(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int superUglyNumber(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Relative Ranks",
      "difficulty": "Hard",
      "subpattern": "Top K",
      "question": "Solve Relative Ranks using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Relative Ranks - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Relative%20Ranks"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int relativeRanks(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int relativeRanks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int relativeRanks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int relativeRanks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int relativeRanks(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Sort Characters By Frequency",
      "difficulty": "Hard",
      "subpattern": "streaming median",
      "question": "Solve Sort Characters By Frequency using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sort Characters By Frequency - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sort%20Characters%20By%20Frequency"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int sortCharactersByFrequency(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Deviation in Array",
      "difficulty": "Hard",
      "subpattern": "scheduling",
      "question": "Solve Minimum Deviation in Array using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes scheduling and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for scheduling and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Deviation in Array - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Deviation%20in%20Array"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviationInArray(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviationInArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviationInArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviationInArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumDeviationInArray(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Furthest Building You Can Reach",
      "difficulty": "Hard",
      "subpattern": "k-way merge.",
      "question": "Solve Furthest Building You Can Reach using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes k-way merge. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for k-way merge. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Furthest Building You Can Reach - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Furthest%20Building%20You%20Can%20Reach"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int furthestBuildingYouCanReach(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int furthestBuildingYouCanReach(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int furthestBuildingYouCanReach(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int furthestBuildingYouCanReach(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int furthestBuildingYouCanReach(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Reduce Array Size to The Half",
      "difficulty": "Hard",
      "subpattern": "Top K",
      "question": "Solve Reduce Array Size to The Half using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes top k and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for top k and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Reduce Array Size to The Half - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Reduce%20Array%20Size%20to%20The%20Half"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int reduceArraySizeToTheHalf(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int reduceArraySizeToTheHalf(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int reduceArraySizeToTheHalf(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int reduceArraySizeToTheHalf(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int reduceArraySizeToTheHalf(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Total Cost to Hire K Workers",
      "difficulty": "Hard",
      "subpattern": "streaming median",
      "question": "Solve Total Cost to Hire K Workers using the Heap / Priority Queue pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Heap / Priority Queue when the input structure exposes streaming median and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for streaming median and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Total Cost to Hire K Workers - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Total%20Cost%20to%20Hire%20K%20Workers"
      },
      "examples": [
        {
          "input": "nums = [3,2,1,5,6,4], k = 2",
          "output": "5",
          "explanation": "The heap tracks the two largest candidates."
        },
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "Single item is the answer."
        },
        {
          "input": "nums = [4,4,4], k = 2",
          "output": "4",
          "explanation": "Duplicates remain valid heap entries."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int totalCostToHireKWorkers(int[] nums, int k) {\n    Arrays.sort(nums);\n    return nums[nums.length - k];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int totalCostToHireKWorkers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int totalCostToHireKWorkers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int totalCostToHireKWorkers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    fill(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue<Integer> heap) {\n    if (index == nums.length) return;\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    fill(nums, index + 1, k, heap);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int totalCostToHireKWorkers(int[] nums, int k) {\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int value : nums) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n    return heap.peek();\n  }\n}"
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
