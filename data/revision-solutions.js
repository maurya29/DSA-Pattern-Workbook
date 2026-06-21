const LINKED_LIST_NODE_CODE = `class ListNode {
  int val;
  ListNode next;

  ListNode(int val) {
    this.val = val;
  }

  ListNode(int val, ListNode next) {
    this.val = val;
    this.next = next;
  }
}`;

const REVISION_SOLUTION_TOPICS = {
  arrays: {
    id: "arrays",
    name: "Arrays Revision",
    summary: "Core array interview problems with brute force, optimized iterative, and recursive Java solutions.",
    checklist: [
      "Check whether the array is sorted before choosing two pointers.",
      "Ask whether the answer must be in-place or can use extra space.",
      "Track indexes carefully when the output is a prefix length.",
      "Handle empty arrays and one-element arrays before main logic.",
      "For subarray problems, decide whether the state is running sum, min-so-far, or best-so-far."
    ],
    mistakes: [
      "Using a hash map or set when sorted adjacency is enough.",
      "Forgetting k %= nums.length in rotation.",
      "Treating duplicate largest values as a valid second largest value.",
      "Returning a full modified array when the problem expects only a valid prefix length.",
      "Breaking stock profit by allowing sell before buy."
    ],
    edgeCases: [
      "Empty array and one-element array.",
      "All elements equal.",
      "All values negative.",
      "Zeroes at the start, middle, and end.",
      "Duplicate values and duplicate answers.",
      "k = 0, k = n, and k greater than n for rotation."
    ],
    complexities: [
      "Sorting-based array solutions usually cost O(n log n) time.",
      "Single-pass tracking problems usually cost O(n) time and O(1) space.",
      "Hash map complement or frequency problems usually cost O(n) time and O(n) space.",
      "Prefix/suffix array transforms usually cost O(n) time and O(1) extra space excluding the answer.",
      "Recursive array scans usually keep the same time complexity but add O(n) stack space."
    ],
    mentalModel: [
      "If only extremes are needed, scan once and update state.",
      "If order must be preserved, use a write pointer.",
      "If a value needs its partner, store what has already been seen.",
      "If each index needs left and right information, use prefix and suffix passes.",
      "If subarray must be contiguous, carry a running state."
    ],
    revisionStrategy: [
      "Day 1: Solve all 11 without looking at code.",
      "Day 3: Redo only the optimized iterative solutions.",
      "Day 7: Redo the recursive versions and explain the base cases.",
      "Day 14: Mix the problems randomly and identify the trigger before coding.",
      "Before interviews: Revisit Rotate Array, Kadane's Algorithm, Merge Intervals, and Product of Array Except Self."
    ],
    problems: [
      {
        group: "core",
        name: "Find Maximum/Minimum",
        difficulty: "Easy",
        subpattern: "Single pass min/max tracking",
        question: "Given an integer array nums, return an array {minimum, maximum}. Throw an exception when nums is null or empty.",
        trigger: "You need only the smallest and largest values, so every element can update two running answers.",
        intuition: "Sorting exposes the answer but does extra work. A single scan keeps the best minimum and maximum seen so far.",
        edgeCases: "Null input, empty input, one element, all equal elements, negative values, and Integer.MIN_VALUE or Integer.MAX_VALUE.",
        constraints: "1 <= nums.length. Values may be any int.",
        bruteForceComplexity: "Time O(n log n), Space O(n) for the copied array.",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(log n) average call stack for divide and conquer.",
        examples: [
          {
            input: "nums = [3, 1, 9, -2, 5]",
            output: "[-2, 9]",
            explanation: "-2 is the minimum and 9 is the maximum."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public int[] findMinMax(int[] nums) {
    if (nums == null || nums.length == 0) {
      throw new IllegalArgumentException("nums must contain at least one value");
    }

    int[] copy = Arrays.copyOf(nums, nums.length);
    Arrays.sort(copy);

    return new int[] {copy[0], copy[copy.length - 1]};
  }
}`,
        iterativeCode: `class Solution {
  public int[] findMinMax(int[] nums) {
    if (nums == null || nums.length == 0) {
      throw new IllegalArgumentException("nums must contain at least one value");
    }

    int min = nums[0];
    int max = nums[0];

    for (int i = 1; i < nums.length; i++) {
      min = Math.min(min, nums[i]);
      max = Math.max(max, nums[i]);
    }

    return new int[] {min, max};
  }
}`,
        recursiveCode: `class Solution {
  public int[] findMinMax(int[] nums) {
    if (nums == null || nums.length == 0) {
      throw new IllegalArgumentException("nums must contain at least one value");
    }

    return divide(nums, 0, nums.length - 1);
  }

  private int[] divide(int[] nums, int left, int right) {
    if (left == right) {
      return new int[] {nums[left], nums[left]};
    }

    int mid = left + (right - left) / 2;
    int[] first = divide(nums, left, mid);
    int[] second = divide(nums, mid + 1, right);

    return new int[] {
      Math.min(first[0], second[0]),
      Math.max(first[1], second[1])
    };
  }
}`
      },
      {
        group: "core",
        name: "Second Largest Element",
        difficulty: "Easy",
        subpattern: "Distinct top-two tracking",
        question: "Given an integer array nums, return the second largest distinct value. Return null when fewer than two distinct values exist.",
        trigger: "You need the second best distinct value, so duplicates of the current largest must not update the answer.",
        intuition: "Sorting can find the second distinct value from the end. One scan tracks the largest and second largest distinct values.",
        edgeCases: "Array length less than two, all values equal, duplicate largest values, negative numbers, and Integer.MIN_VALUE.",
        constraints: "0 <= nums.length. Return null if the second distinct value does not exist.",
        bruteForceComplexity: "Time O(n log n), Space O(n) for the copied array.",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [12, 35, 1, 10, 34, 1]",
            output: "34",
            explanation: "35 is largest and 34 is the second largest distinct value."
          },
          {
            input: "nums = [5, 5, 5]",
            output: "null",
            explanation: "There is no second distinct value."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public Integer secondLargest(int[] nums) {
    if (nums == null || nums.length < 2) {
      return null;
    }

    int[] copy = Arrays.copyOf(nums, nums.length);
    Arrays.sort(copy);

    int largest = copy[copy.length - 1];
    for (int i = copy.length - 2; i >= 0; i--) {
      if (copy[i] != largest) {
        return copy[i];
      }
    }

    return null;
  }
}`,
        iterativeCode: `class Solution {
  public Integer secondLargest(int[] nums) {
    if (nums == null || nums.length < 2) {
      return null;
    }

    Integer largest = null;
    Integer second = null;

    for (int value : nums) {
      if (largest == null || value > largest) {
        second = largest;
        largest = value;
      } else if (value != largest && (second == null || value > second)) {
        second = value;
      }
    }

    return second;
  }
}`,
        recursiveCode: `class Solution {
  public Integer secondLargest(int[] nums) {
    if (nums == null || nums.length < 2) {
      return null;
    }

    return scan(nums, 0, null, null);
  }

  private Integer scan(int[] nums, int index, Integer largest, Integer second) {
    if (index == nums.length) {
      return second;
    }

    int value = nums[index];
    if (largest == null || value > largest) {
      return scan(nums, index + 1, value, largest);
    }
    if (value != largest && (second == null || value > second)) {
      return scan(nums, index + 1, largest, value);
    }

    return scan(nums, index + 1, largest, second);
  }
}`
      },
      {
        group: "core",
        name: "Remove Duplicates",
        difficulty: "Easy",
        subpattern: "Sorted-array write pointer",
        question: "Given a sorted integer array nums, remove duplicates in-place so each unique value appears once. Return the number of unique values.",
        trigger: "The array is sorted, so duplicates are adjacent and a write pointer can keep only the first occurrence.",
        intuition: "Read every value once. Write a value only when it differs from the last written unique value.",
        edgeCases: "Empty array, one element, no duplicates, all duplicates, and negative values.",
        constraints: "nums is sorted in non-decreasing order. Modify the first returned-length positions in-place.",
        source: {
          label: "Remove Duplicates from Sorted Array - LeetCode 26",
          url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [1, 1, 2, 2, 3]",
            output: "k = 3, nums prefix = [1, 2, 3]",
            explanation: "The first three positions contain the unique values."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }

    List<Integer> unique = new ArrayList<>();
    unique.add(nums[0]);

    for (int i = 1; i < nums.length; i++) {
      if (nums[i] != nums[i - 1]) {
        unique.add(nums[i]);
      }
    }

    for (int i = 0; i < unique.size(); i++) {
      nums[i] = unique.get(i);
    }

    return unique.size();
  }
}`,
        iterativeCode: `class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }

    int write = 1;
    for (int read = 1; read < nums.length; read++) {
      if (nums[read] != nums[write - 1]) {
        nums[write] = nums[read];
        write++;
      }
    }

    return write;
  }
}`,
        recursiveCode: `class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }

    return writeUnique(nums, 1, 1);
  }

  private int writeUnique(int[] nums, int read, int write) {
    if (read == nums.length) {
      return write;
    }

    if (nums[read] != nums[write - 1]) {
      nums[write] = nums[read];
      return writeUnique(nums, read + 1, write + 1);
    }

    return writeUnique(nums, read + 1, write);
  }
}`
      },
      {
        group: "core",
        name: "Move Zeroes",
        difficulty: "Easy",
        subpattern: "Stable compaction",
        question: "Given an integer array nums, move all zeroes to the end in-place while preserving the relative order of non-zero values.",
        trigger: "You need stable placement of non-zero values and all zeroes can be filled after compaction.",
        intuition: "Write each non-zero value to the next available position, then fill the remaining suffix with zeroes.",
        edgeCases: "No zeroes, all zeroes, one element, already compacted array, and negative non-zero values.",
        constraints: "Modify nums in-place.",
        source: {
          label: "Move Zeroes - LeetCode 283",
          url: "https://leetcode.com/problems/move-zeroes/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [0, 1, 0, 3, 12]",
            output: "[1, 3, 12, 0, 0]",
            explanation: "The non-zero values keep their original order."
          }
        ],
        bruteForceCode: `class Solution {
  public void moveZeroes(int[] nums) {
    if (nums == null || nums.length == 0) {
      return;
    }

    int[] arranged = new int[nums.length];
    int write = 0;

    for (int value : nums) {
      if (value != 0) {
        arranged[write] = value;
        write++;
      }
    }

    for (int i = 0; i < nums.length; i++) {
      nums[i] = arranged[i];
    }
  }
}`,
        iterativeCode: `class Solution {
  public void moveZeroes(int[] nums) {
    if (nums == null || nums.length == 0) {
      return;
    }

    int write = 0;
    for (int read = 0; read < nums.length; read++) {
      if (nums[read] != 0) {
        nums[write] = nums[read];
        write++;
      }
    }

    while (write < nums.length) {
      nums[write] = 0;
      write++;
    }
  }
}`,
        recursiveCode: `class Solution {
  public void moveZeroes(int[] nums) {
    if (nums == null || nums.length == 0) {
      return;
    }

    int write = compact(nums, 0, 0);
    fillZeroes(nums, write);
  }

  private int compact(int[] nums, int read, int write) {
    if (read == nums.length) {
      return write;
    }

    if (nums[read] != 0) {
      nums[write] = nums[read];
      return compact(nums, read + 1, write + 1);
    }

    return compact(nums, read + 1, write);
  }

  private void fillZeroes(int[] nums, int index) {
    if (index == nums.length) {
      return;
    }

    nums[index] = 0;
    fillZeroes(nums, index + 1);
  }
}`
      },
      {
        group: "core",
        name: "Rotate Array",
        difficulty: "Medium",
        subpattern: "Modulo index rotation",
        question: "Given an integer array nums, rotate the array to the right by k steps in-place.",
        trigger: "Every value moves to (index + k) % n, and k may be larger than the array length.",
        intuition: "Repeated one-step rotation is direct but slow. Reversing the whole array and the two parts performs the same rotation in-place.",
        edgeCases: "Empty array, one element, k = 0, k greater than n, and k divisible by n.",
        constraints: "0 <= nums.length. Rotate right by k steps.",
        source: {
          label: "Rotate Array - LeetCode 189",
          url: "https://leetcode.com/problems/rotate-array/"
        },
        bruteForceComplexity: "Time O(n * (k mod n)), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) for the copy plus O(n) call stack.",
        examples: [
          {
            input: "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
            output: "[5, 6, 7, 1, 2, 3, 4]",
            explanation: "Each element moves three positions to the right."
          }
        ],
        bruteForceCode: `class Solution {
  public void rotate(int[] nums, int k) {
    if (nums == null || nums.length == 0) {
      return;
    }

    k %= nums.length;
    for (int step = 0; step < k; step++) {
      int last = nums[nums.length - 1];
      for (int i = nums.length - 1; i > 0; i--) {
        nums[i] = nums[i - 1];
      }
      nums[0] = last;
    }
  }
}`,
        iterativeCode: `class Solution {
  public void rotate(int[] nums, int k) {
    if (nums == null || nums.length == 0) {
      return;
    }

    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
  }

  private void reverse(int[] nums, int left, int right) {
    while (left < right) {
      int temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
      left++;
      right--;
    }
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public void rotate(int[] nums, int k) {
    if (nums == null || nums.length == 0) {
      return;
    }

    int[] copy = Arrays.copyOf(nums, nums.length);
    place(copy, nums, 0, k % nums.length);
  }

  private void place(int[] copy, int[] nums, int index, int k) {
    if (index == copy.length) {
      return;
    }

    nums[(index + k) % copy.length] = copy[index];
    place(copy, nums, index + 1, k);
  }
}`
      },
      {
        group: "core",
        name: "Two Sum",
        difficulty: "Easy",
        subpattern: "Hash map complement lookup",
        question: "Given an integer array nums and an integer target, return the indexes of two distinct elements whose values add up to target. Return {-1, -1} when no pair exists.",
        trigger: "For each value, target - value is the only value that can complete the pair.",
        intuition: "Brute force checks every pair. A map remembers previous values so the complement can be found in constant time.",
        edgeCases: "Duplicate values like [3, 3], negative numbers, zero target, no answer, and never reusing the same index.",
        constraints: "2 <= nums.length. Return any valid pair if multiple pairs exist.",
        source: {
          label: "Two Sum - LeetCode 1",
          url: "https://leetcode.com/problems/two-sum/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(n).",
        recursiveComplexity: "Time O(n), Space O(n) for the map plus O(n) call stack.",
        examples: [
          {
            input: "nums = [2, 7, 11, 15], target = 9",
            output: "[0, 1]",
            explanation: "nums[0] + nums[1] = 9."
          }
        ],
        bruteForceCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length - 1; i++) {
      for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
          return new int[] {i, j};
        }
      }
    }

    return new int[] {-1, -1};
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> indexByValue = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (indexByValue.containsKey(complement)) {
        return new int[] {indexByValue.get(complement), i};
      }
      indexByValue.put(nums[i], i);
    }

    return new int[] {-1, -1};
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int[] twoSum(int[] nums, int target) {
    return search(nums, target, 0, new HashMap<>());
  }

  private int[] search(int[] nums, int target, int index, Map<Integer, Integer> indexByValue) {
    if (index == nums.length) {
      return new int[] {-1, -1};
    }

    int complement = target - nums[index];
    if (indexByValue.containsKey(complement)) {
      return new int[] {indexByValue.get(complement), index};
    }

    indexByValue.put(nums[index], index);
    return search(nums, target, index + 1, indexByValue);
  }
}`
      },
      {
        group: "core",
        name: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        subpattern: "Minimum-so-far profit tracking",
        question: "Given an array prices where prices[i] is the stock price on day i, return the maximum profit from one buy followed by one sell. Return 0 if no profit is possible.",
        trigger: "Selling on day i is only useful relative to the lowest price seen before day i.",
        intuition: "Track the cheapest buy price so far and update the best profit at each sell day.",
        edgeCases: "Empty prices, one day, strictly decreasing prices, equal prices, and best buy before best sell.",
        constraints: "At most one transaction. Buy must happen before sell.",
        source: {
          label: "Best Time to Buy and Sell Stock - LeetCode 121",
          url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "prices = [7, 1, 5, 3, 6, 4]",
            output: "5",
            explanation: "Buy at 1 and sell at 6."
          },
          {
            input: "prices = [7, 6, 4, 3, 1]",
            output: "0",
            explanation: "No profitable transaction exists."
          }
        ],
        bruteForceCode: `class Solution {
  public int maxProfit(int[] prices) {
    int best = 0;

    for (int buy = 0; buy < prices.length - 1; buy++) {
      for (int sell = buy + 1; sell < prices.length; sell++) {
        best = Math.max(best, prices[sell] - prices[buy]);
      }
    }

    return best;
  }
}`,
        iterativeCode: `class Solution {
  public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int best = 0;

    for (int price : prices) {
      minPrice = Math.min(minPrice, price);
      best = Math.max(best, price - minPrice);
    }

    return best;
  }
}`,
        recursiveCode: `class Solution {
  public int maxProfit(int[] prices) {
    return scan(prices, 0, Integer.MAX_VALUE, 0);
  }

  private int scan(int[] prices, int index, int minPrice, int best) {
    if (index == prices.length) {
      return best;
    }

    int nextMin = Math.min(minPrice, prices[index]);
    int nextBest = Math.max(best, prices[index] - nextMin);
    return scan(prices, index + 1, nextMin, nextBest);
  }
}`
      },
      {
        group: "core",
        name: "Kadane's Algorithm",
        difficulty: "Medium",
        subpattern: "Running subarray state",
        question: "Given an integer array nums, return the maximum possible sum of a non-empty contiguous subarray.",
        trigger: "A subarray ending at index i either extends the previous subarray or starts fresh at nums[i].",
        intuition: "Keep the best sum ending here and the best sum seen anywhere.",
        edgeCases: "All negative values, one value, zeroes, and the best subarray at the beginning or end.",
        constraints: "1 <= nums.length. The subarray must be non-empty.",
        source: {
          label: "Maximum Subarray - LeetCode 53",
          url: "https://leetcode.com/problems/maximum-subarray/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
            output: "6",
            explanation: "[4, -1, 2, 1] has sum 6."
          }
        ],
        bruteForceCode: `class Solution {
  public int maxSubArray(int[] nums) {
    int best = Integer.MIN_VALUE;

    for (int start = 0; start < nums.length; start++) {
      int sum = 0;
      for (int end = start; end < nums.length; end++) {
        sum += nums[end];
        best = Math.max(best, sum);
      }
    }

    return best;
  }
}`,
        iterativeCode: `class Solution {
  public int maxSubArray(int[] nums) {
    int current = nums[0];
    int best = nums[0];

    for (int i = 1; i < nums.length; i++) {
      current = Math.max(nums[i], current + nums[i]);
      best = Math.max(best, current);
    }

    return best;
  }
}`,
        recursiveCode: `class Solution {
  public int maxSubArray(int[] nums) {
    return scan(nums, 1, nums[0], nums[0]);
  }

  private int scan(int[] nums, int index, int current, int best) {
    if (index == nums.length) {
      return best;
    }

    int nextCurrent = Math.max(nums[index], current + nums[index]);
    int nextBest = Math.max(best, nextCurrent);
    return scan(nums, index + 1, nextCurrent, nextBest);
  }
}`
      },
      {
        group: "core",
        name: "Majority Element",
        difficulty: "Easy",
        subpattern: "Boyer-Moore voting",
        question: "Given an integer array nums where a majority element always exists, return the element that appears more than n / 2 times.",
        trigger: "The majority count is larger than all other counts combined, so opposite values can cancel each other.",
        intuition: "Brute force counts each candidate. Boyer-Moore keeps one candidate and a vote count that survives cancellations.",
        edgeCases: "One element, majority at the start, majority at the end, negative values, and many alternating values before the majority dominates.",
        constraints: "Majority element is guaranteed to exist.",
        source: {
          label: "Majority Element - LeetCode 169",
          url: "https://leetcode.com/problems/majority-element/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [2, 2, 1, 1, 1, 2, 2]",
            output: "2",
            explanation: "2 appears four times out of seven."
          }
        ],
        bruteForceCode: `class Solution {
  public int majorityElement(int[] nums) {
    for (int candidate : nums) {
      int count = 0;
      for (int value : nums) {
        if (value == candidate) {
          count++;
        }
      }
      if (count > nums.length / 2) {
        return candidate;
      }
    }

    throw new IllegalArgumentException("majority element is required");
  }
}`,
        iterativeCode: `class Solution {
  public int majorityElement(int[] nums) {
    int candidate = 0;
    int votes = 0;

    for (int value : nums) {
      if (votes == 0) {
        candidate = value;
        votes = 1;
      } else if (value == candidate) {
        votes++;
      } else {
        votes--;
      }
    }

    return candidate;
  }
}`,
        recursiveCode: `class Solution {
  public int majorityElement(int[] nums) {
    return vote(nums, 0, 0, 0);
  }

  private int vote(int[] nums, int index, int candidate, int votes) {
    if (index == nums.length) {
      return candidate;
    }

    if (votes == 0) {
      return vote(nums, index + 1, nums[index], 1);
    }
    if (nums[index] == candidate) {
      return vote(nums, index + 1, candidate, votes + 1);
    }

    return vote(nums, index + 1, candidate, votes - 1);
  }
}`
      },
      {
        group: "core",
        name: "Merge Intervals",
        difficulty: "Medium",
        subpattern: "Sort then merge overlapping ranges",
        question: "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals and return the non-overlapping result sorted by start.",
        trigger: "Overlaps are easiest to detect once intervals are ordered by start time.",
        intuition: "Sort by start, keep the current merged interval, and extend it while the next interval overlaps.",
        edgeCases: "Empty input, one interval, touching intervals like [1,4] and [4,5], nested intervals, and unsorted input.",
        constraints: "Each interval has exactly two values where start <= end.",
        source: {
          label: "Merge Intervals - LeetCode 56",
          url: "https://leetcode.com/problems/merge-intervals/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(n).",
        optimizedComplexity: "Time O(n log n), Space O(n) for the result.",
        recursiveComplexity: "Time O(n log n), Space O(n) for result plus O(n) call stack.",
        examples: [
          {
            input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            output: "[[1,6],[8,10],[15,18]]",
            explanation: "[1,3] and [2,6] overlap."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public int[][] merge(int[][] intervals) {
    if (intervals == null || intervals.length == 0) {
      return new int[0][0];
    }

    boolean[] used = new boolean[intervals.length];
    List<int[]> merged = new ArrayList<>();

    for (int i = 0; i < intervals.length; i++) {
      if (used[i]) {
        continue;
      }

      int start = intervals[i][0];
      int end = intervals[i][1];
      used[i] = true;

      boolean expanded = true;
      while (expanded) {
        expanded = false;
        for (int j = 0; j < intervals.length; j++) {
          if (!used[j] && intervals[j][0] <= end && intervals[j][1] >= start) {
            start = Math.min(start, intervals[j][0]);
            end = Math.max(end, intervals[j][1]);
            used[j] = true;
            expanded = true;
          }
        }
      }

      merged.add(new int[] {start, end});
    }

    merged.sort((a, b) -> Integer.compare(a[0], b[0]));
    return merged.toArray(new int[merged.size()][]);
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int[][] merge(int[][] intervals) {
    if (intervals == null || intervals.length == 0) {
      return new int[0][0];
    }

    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();

    int start = intervals[0][0];
    int end = intervals[0][1];

    for (int i = 1; i < intervals.length; i++) {
      if (intervals[i][0] <= end) {
        end = Math.max(end, intervals[i][1]);
      } else {
        merged.add(new int[] {start, end});
        start = intervals[i][0];
        end = intervals[i][1];
      }
    }

    merged.add(new int[] {start, end});
    return merged.toArray(new int[merged.size()][]);
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int[][] merge(int[][] intervals) {
    if (intervals == null || intervals.length == 0) {
      return new int[0][0];
    }

    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    mergeFrom(intervals, 1, intervals[0][0], intervals[0][1], merged);
    return merged.toArray(new int[merged.size()][]);
  }

  private void mergeFrom(int[][] intervals, int index, int start, int end, List<int[]> merged) {
    if (index == intervals.length) {
      merged.add(new int[] {start, end});
      return;
    }

    if (intervals[index][0] <= end) {
      mergeFrom(intervals, index + 1, start, Math.max(end, intervals[index][1]), merged);
      return;
    }

    merged.add(new int[] {start, end});
    mergeFrom(intervals, index + 1, intervals[index][0], intervals[index][1], merged);
  }
}`
      },
      {
        group: "core",
        name: "Product of Array Except Self",
        difficulty: "Medium",
        subpattern: "Prefix and suffix products",
        question: "Given an integer array nums, return an array answer where answer[i] is the product of all nums[j] where j != i, without using division.",
        trigger: "Each answer needs product of values on the left and product of values on the right.",
        intuition: "Build prefix products into the result, then multiply by suffix products from the right.",
        edgeCases: "One zero, multiple zeroes, negative values, one element, and product overflow assumptions.",
        constraints: "Do not use division. Intermediate products fit in 32-bit int for the test data.",
        source: {
          label: "Product of Array Except Self - LeetCode 238",
          url: "https://leetcode.com/problems/product-of-array-except-self/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(n) for the answer.",
        optimizedComplexity: "Time O(n), Space O(1) extra space excluding the answer array.",
        recursiveComplexity: "Time O(n), Space O(n) for answer plus O(n) call stack.",
        examples: [
          {
            input: "nums = [1, 2, 3, 4]",
            output: "[24, 12, 8, 6]",
            explanation: "Each position stores the product of every other value."
          }
        ],
        bruteForceCode: `class Solution {
  public int[] productExceptSelf(int[] nums) {
    int[] answer = new int[nums.length];

    for (int i = 0; i < nums.length; i++) {
      int product = 1;
      for (int j = 0; j < nums.length; j++) {
        if (i != j) {
          product *= nums[j];
        }
      }
      answer[i] = product;
    }

    return answer;
  }
}`,
        iterativeCode: `class Solution {
  public int[] productExceptSelf(int[] nums) {
    int[] answer = new int[nums.length];

    int prefix = 1;
    for (int i = 0; i < nums.length; i++) {
      answer[i] = prefix;
      prefix *= nums[i];
    }

    int suffix = 1;
    for (int i = nums.length - 1; i >= 0; i--) {
      answer[i] *= suffix;
      suffix *= nums[i];
    }

    return answer;
  }
}`,
        recursiveCode: `class Solution {
  public int[] productExceptSelf(int[] nums) {
    int[] answer = new int[nums.length];
    fillPrefix(nums, answer, 0, 1);
    fillSuffix(nums, answer, nums.length - 1, 1);
    return answer;
  }

  private void fillPrefix(int[] nums, int[] answer, int index, int product) {
    if (index == nums.length) {
      return;
    }

    answer[index] = product;
    fillPrefix(nums, answer, index + 1, product * nums[index]);
  }

  private void fillSuffix(int[] nums, int[] answer, int index, int product) {
    if (index < 0) {
      return;
    }

    answer[index] *= product;
    fillSuffix(nums, answer, index - 1, product * nums[index]);
  }
}`
      }
    ]
  },
  "two-pointers": {
    id: "two-pointers",
    name: "Two Pointers Revision",
    summary: "Sorted arrays, opposite-end scans, duplicate skipping, and left/right boundary movement.",
    checklist: [
      "Check whether the input is sorted or can be sorted without losing required indexes.",
      "Use left and right pointers when the decision compares a pair or boundary area.",
      "Move the pointer that can still improve the answer.",
      "Skip duplicates only after recording a valid tuple.",
      "Use long for 4Sum and any sum that may overflow int."
    ],
    mistakes: [
      "Using two pointers on an unsorted array when order matters.",
      "Moving both pointers when the sum is too small or too large.",
      "Skipping duplicates before adding the valid 3Sum or 4Sum answer.",
      "Forgetting that Container With Most Water moves the shorter wall.",
      "Using int sum in 4Sum and overflowing on large values."
    ],
    edgeCases: [
      "Empty array and arrays with too few values.",
      "All duplicate values.",
      "Negative numbers mixed with positive numbers.",
      "No valid pair/triplet/quadruplet.",
      "Multiple duplicate answers that must appear once.",
      "Monotonic height arrays for water problems."
    ],
    complexities: [
      "Pair sum in a sorted array is usually O(n) time and O(1) space.",
      "In-place duplicate removal is O(n) time and O(1) space.",
      "Container With Most Water and trapping rain water are O(n) with left/right pointers.",
      "3Sum is O(n^2) after sorting.",
      "4Sum is O(n^3) after sorting."
    ],
    mentalModel: [
      "If the pair sum is too small, move left rightward.",
      "If the pair sum is too large, move right leftward.",
      "For area/water boundaries, the smaller boundary controls the answer.",
      "For k-sum, fix one value and reduce the rest to a smaller sum problem.",
      "Duplicate skipping is part of correctness, not just performance."
    ],
    revisionStrategy: [
      "Day 1: Solve Pair Sum, Remove Duplicates, and Container With Most Water.",
      "Day 3: Solve 3Sum and 4Sum with duplicate skipping from memory.",
      "Day 7: Redo Trapping Rain Water using both brute force and two pointers.",
      "Day 14: Explain exactly why each pointer moves before writing code.",
      "Before interviews: Revisit 3Sum, 4Sum, and Trapping Rain Water."
    ],
    problems: [
      {
        group: "core",
        name: "Pair Sum",
        difficulty: "Easy",
        subpattern: "Sorted two-sum opposite pointers",
        question: "Given a sorted integer array nums and an integer target, return the 1-based indexes of two distinct numbers whose sum is target. Return {-1, -1} when no pair exists.",
        trigger: "The array is sorted, so a small sum can only improve by moving left rightward and a large sum can only improve by moving right leftward.",
        intuition: "Brute force checks all pairs. Two pointers eliminate one side of the search space on every comparison.",
        edgeCases: "No answer, duplicate values, negative values, smallest pair, largest pair, and target outside possible range.",
        constraints: "nums is sorted in non-decreasing order. Return 1-based indexes.",
        source: {
          label: "Two Sum II - LeetCode 167",
          url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [2, 7, 11, 15], target = 9",
            output: "[1, 2]",
            explanation: "2 + 7 = 9, and the problem uses 1-based indexes."
          }
        ],
        bruteForceCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length - 1; i++) {
      for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
          return new int[] {i + 1, j + 1};
        }
      }
    }

    return new int[] {-1, -1};
  }
}`,
        iterativeCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left < right) {
      int sum = nums[left] + nums[right];
      if (sum == target) {
        return new int[] {left + 1, right + 1};
      }
      if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    return new int[] {-1, -1};
  }
}`,
        recursiveCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    return search(nums, target, 0, nums.length - 1);
  }

  private int[] search(int[] nums, int target, int left, int right) {
    if (left >= right) {
      return new int[] {-1, -1};
    }

    int sum = nums[left] + nums[right];
    if (sum == target) {
      return new int[] {left + 1, right + 1};
    }
    if (sum < target) {
      return search(nums, target, left + 1, right);
    }

    return search(nums, target, left, right - 1);
  }
}`
      },
      {
        group: "core",
        name: "Remove Duplicates",
        difficulty: "Easy",
        subpattern: "Sorted-array write pointer",
        question: "Given a sorted integer array nums, remove duplicates in-place so each unique value appears once. Return the number of unique values.",
        trigger: "The array is sorted, so duplicates are adjacent and a write pointer can keep the next unique value.",
        intuition: "Read every value once. Write only the values that differ from the last written unique value.",
        edgeCases: "Empty array, one element, all duplicates, no duplicates, and negative sorted values.",
        constraints: "nums is sorted in non-decreasing order. Modify nums in-place.",
        source: {
          label: "Remove Duplicates from Sorted Array - LeetCode 26",
          url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [0, 0, 1, 1, 1, 2]",
            output: "k = 3, nums prefix = [0, 1, 2]",
            explanation: "Only the first three positions are required to be correct."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }

    List<Integer> unique = new ArrayList<>();
    unique.add(nums[0]);

    for (int i = 1; i < nums.length; i++) {
      if (nums[i] != nums[i - 1]) {
        unique.add(nums[i]);
      }
    }

    for (int i = 0; i < unique.size(); i++) {
      nums[i] = unique.get(i);
    }

    return unique.size();
  }
}`,
        iterativeCode: `class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }

    int write = 1;
    for (int read = 1; read < nums.length; read++) {
      if (nums[read] != nums[write - 1]) {
        nums[write] = nums[read];
        write++;
      }
    }

    return write;
  }
}`,
        recursiveCode: `class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }

    return writeUnique(nums, 1, 1);
  }

  private int writeUnique(int[] nums, int read, int write) {
    if (read == nums.length) {
      return write;
    }

    if (nums[read] != nums[write - 1]) {
      nums[write] = nums[read];
      return writeUnique(nums, read + 1, write + 1);
    }

    return writeUnique(nums, read + 1, write);
  }
}`
      },
      {
        group: "core",
        name: "Container With Most Water",
        difficulty: "Medium",
        subpattern: "Opposite boundary area maximization",
        question: "Given an integer array height, return the maximum water area formed by choosing two vertical lines.",
        trigger: "Area depends on width and the shorter boundary, so the only useful move is away from the shorter boundary.",
        intuition: "Brute force checks all pairs. Two pointers start with max width and move the smaller wall to seek a taller boundary.",
        edgeCases: "Two lines only, all heights equal, increasing heights, decreasing heights, and zero heights.",
        constraints: "2 <= height.length. Heights are non-negative.",
        source: {
          label: "Container With Most Water - LeetCode 11",
          url: "https://leetcode.com/problems/container-with-most-water/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
            output: "49",
            explanation: "The best container uses heights 8 and 7 with width 7."
          }
        ],
        bruteForceCode: `class Solution {
  public int maxArea(int[] height) {
    int best = 0;

    for (int left = 0; left < height.length - 1; left++) {
      for (int right = left + 1; right < height.length; right++) {
        int width = right - left;
        int area = Math.min(height[left], height[right]) * width;
        best = Math.max(best, area);
      }
    }

    return best;
  }
}`,
        iterativeCode: `class Solution {
  public int maxArea(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int best = 0;

    while (left < right) {
      int width = right - left;
      int area = Math.min(height[left], height[right]) * width;
      best = Math.max(best, area);

      if (height[left] < height[right]) {
        left++;
      } else {
        right--;
      }
    }

    return best;
  }
}`,
        recursiveCode: `class Solution {
  public int maxArea(int[] height) {
    return search(height, 0, height.length - 1, 0);
  }

  private int search(int[] height, int left, int right, int best) {
    if (left >= right) {
      return best;
    }

    int width = right - left;
    int area = Math.min(height[left], height[right]) * width;
    int nextBest = Math.max(best, area);

    if (height[left] < height[right]) {
      return search(height, left + 1, right, nextBest);
    }

    return search(height, left, right - 1, nextBest);
  }
}`
      },
      {
        group: "core",
        name: "3Sum",
        difficulty: "Medium",
        subpattern: "Sort, fix one value, two-sum remainder",
        question: "Given an integer array nums, return all unique triplets [a, b, c] such that a + b + c = 0.",
        trigger: "After sorting, fixing one number reduces the problem to a two-pointer pair sum on the remaining suffix.",
        intuition: "Sort to control duplicate answers. For each fixed value, move left/right based on the remaining sum.",
        edgeCases: "Fewer than three numbers, all zeroes, all positives, all negatives, duplicate triplets, and repeated fixed values.",
        constraints: "Return unique triplets in any order.",
        source: {
          label: "3Sum - LeetCode 15",
          url: "https://leetcode.com/problems/3sum/"
        },
        bruteForceComplexity: "Time O(n^3), Space O(k) for unique answers.",
        optimizedComplexity: "Time O(n^2), Space O(k) for answers; sorting may use O(log n) stack space.",
        recursiveComplexity: "Time O(n^2), Space O(k + n) for answers plus call stack.",
        examples: [
          {
            input: "nums = [-1, 0, 1, 2, -1, -4]",
            output: "[[-1, -1, 2], [-1, 0, 1]]",
            explanation: "Only unique triplets whose sum is zero are returned."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    Set<List<Integer>> unique = new LinkedHashSet<>();

    for (int i = 0; i < nums.length - 2; i++) {
      for (int j = i + 1; j < nums.length - 1; j++) {
        for (int k = j + 1; k < nums.length; k++) {
          if (nums[i] + nums[j] + nums[k] == 0) {
            unique.add(Arrays.asList(nums[i], nums[j], nums[k]));
          }
        }
      }
    }

    return new ArrayList<>(unique);
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();

    for (int i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) {
        continue;
      }

      int left = i + 1;
      int right = nums.length - 1;

      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
          result.add(Arrays.asList(nums[i], nums[left], nums[right]));
          left++;
          right--;

          while (left < right && nums[left] == nums[left - 1]) {
            left++;
          }
          while (left < right && nums[right] == nums[right + 1]) {
            right--;
          }
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }

    return result;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    fixIndex(nums, 0, result);
    return result;
  }

  private void fixIndex(int[] nums, int index, List<List<Integer>> result) {
    if (index >= nums.length - 2) {
      return;
    }

    if (index == 0 || nums[index] != nums[index - 1]) {
      twoPointer(nums, index, index + 1, nums.length - 1, result);
    }

    fixIndex(nums, index + 1, result);
  }

  private void twoPointer(int[] nums, int fixed, int left, int right, List<List<Integer>> result) {
    if (left >= right) {
      return;
    }

    int sum = nums[fixed] + nums[left] + nums[right];
    if (sum == 0) {
      result.add(Arrays.asList(nums[fixed], nums[left], nums[right]));
      int nextLeft = left + 1;
      int nextRight = right - 1;

      while (nextLeft < nextRight && nums[nextLeft] == nums[left]) {
        nextLeft++;
      }
      while (nextLeft < nextRight && nums[nextRight] == nums[right]) {
        nextRight--;
      }

      twoPointer(nums, fixed, nextLeft, nextRight, result);
    } else if (sum < 0) {
      twoPointer(nums, fixed, left + 1, right, result);
    } else {
      twoPointer(nums, fixed, left, right - 1, result);
    }
  }
}`
      },
      {
        group: "core",
        name: "4Sum",
        difficulty: "Medium",
        subpattern: "Sort, fix two values, two-sum remainder",
        question: "Given an integer array nums and an integer target, return all unique quadruplets [a, b, c, d] such that a + b + c + d = target.",
        trigger: "After sorting, fixing two values reduces the remainder to a two-pointer pair sum.",
        intuition: "Sort to skip duplicates. Use nested fixed indexes and a left/right scan for the remaining target.",
        edgeCases: "Fewer than four numbers, duplicate quadruplets, large values causing int overflow, target outside possible range, and all zeroes.",
        constraints: "Return unique quadruplets in any order. Use long when summing values.",
        source: {
          label: "4Sum - LeetCode 18",
          url: "https://leetcode.com/problems/4sum/"
        },
        bruteForceComplexity: "Time O(n^4), Space O(k) for unique answers.",
        optimizedComplexity: "Time O(n^3), Space O(k) for answers; sorting may use O(log n) stack space.",
        recursiveComplexity: "Time O(n^3), Space O(k + 4) excluding sorting stack.",
        examples: [
          {
            input: "nums = [1, 0, -1, 0, -2, 2], target = 0",
            output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
            explanation: "The output contains each valid quadruplet once."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums);
    Set<List<Integer>> unique = new LinkedHashSet<>();

    for (int a = 0; a < nums.length - 3; a++) {
      for (int b = a + 1; b < nums.length - 2; b++) {
        for (int c = b + 1; c < nums.length - 1; c++) {
          for (int d = c + 1; d < nums.length; d++) {
            long sum = (long) nums[a] + nums[b] + nums[c] + nums[d];
            if (sum == target) {
              unique.add(Arrays.asList(nums[a], nums[b], nums[c], nums[d]));
            }
          }
        }
      }
    }

    return new ArrayList<>(unique);
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();

    for (int i = 0; i < nums.length - 3; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) {
        continue;
      }

      for (int j = i + 1; j < nums.length - 2; j++) {
        if (j > i + 1 && nums[j] == nums[j - 1]) {
          continue;
        }

        int left = j + 1;
        int right = nums.length - 1;

        while (left < right) {
          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
          if (sum == target) {
            result.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
            left++;
            right--;

            while (left < right && nums[left] == nums[left - 1]) {
              left++;
            }
            while (left < right && nums[right] == nums[right + 1]) {
              right--;
            }
          } else if (sum < target) {
            left++;
          } else {
            right--;
          }
        }
      }
    }

    return result;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums);
    return kSum(nums, 0, 4, target);
  }

  private List<List<Integer>> kSum(int[] nums, int start, int k, long target) {
    List<List<Integer>> result = new ArrayList<>();

    if (k == 2) {
      return twoSum(nums, start, target);
    }

    for (int i = start; i <= nums.length - k; i++) {
      if (i > start && nums[i] == nums[i - 1]) {
        continue;
      }

      for (List<Integer> suffix : kSum(nums, i + 1, k - 1, target - nums[i])) {
        List<Integer> combination = new ArrayList<>();
        combination.add(nums[i]);
        combination.addAll(suffix);
        result.add(combination);
      }
    }

    return result;
  }

  private List<List<Integer>> twoSum(int[] nums, int start, long target) {
    List<List<Integer>> result = new ArrayList<>();
    int left = start;
    int right = nums.length - 1;

    while (left < right) {
      long sum = (long) nums[left] + nums[right];
      if (sum == target) {
        result.add(Arrays.asList(nums[left], nums[right]));
        left++;
        right--;

        while (left < right && nums[left] == nums[left - 1]) {
          left++;
        }
        while (left < right && nums[right] == nums[right + 1]) {
          right--;
        }
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    return result;
  }
}`
      },
      {
        group: "core",
        name: "Trapping Rain Water",
        difficulty: "Hard",
        subpattern: "Two-boundary water accumulation",
        question: "Given an array height where height[i] is an elevation bar, return how much rain water can be trapped after raining.",
        trigger: "Water above an index is limited by the smaller of the maximum wall on its left and right.",
        intuition: "Brute force recomputes both side maxima. Two pointers keep leftMax and rightMax while processing the smaller boundary first.",
        edgeCases: "Fewer than three bars, all zeroes, strictly increasing heights, strictly decreasing heights, flat bars, and multiple valleys.",
        constraints: "Heights are non-negative integers.",
        source: {
          label: "Trapping Rain Water - LeetCode 42",
          url: "https://leetcode.com/problems/trapping-rain-water/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
            output: "6",
            explanation: "The valleys between taller boundaries trap six units."
          }
        ],
        bruteForceCode: `class Solution {
  public int trap(int[] height) {
    int water = 0;

    for (int i = 0; i < height.length; i++) {
      int leftMax = 0;
      int rightMax = 0;

      for (int left = 0; left <= i; left++) {
        leftMax = Math.max(leftMax, height[left]);
      }
      for (int right = i; right < height.length; right++) {
        rightMax = Math.max(rightMax, height[right]);
      }

      water += Math.min(leftMax, rightMax) - height[i];
    }

    return water;
  }
}`,
        iterativeCode: `class Solution {
  public int trap(int[] height) {
    int left = 0;
    int right = height.length - 1;
    int leftMax = 0;
    int rightMax = 0;
    int water = 0;

    while (left < right) {
      if (height[left] <= height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
        } else {
          water += leftMax - height[left];
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
        } else {
          water += rightMax - height[right];
        }
        right--;
      }
    }

    return water;
  }
}`,
        recursiveCode: `class Solution {
  public int trap(int[] height) {
    return collect(height, 0, height.length - 1, 0, 0, 0);
  }

  private int collect(int[] height, int left, int right, int leftMax, int rightMax, int water) {
    if (left >= right) {
      return water;
    }

    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        return collect(height, left + 1, right, height[left], rightMax, water);
      }
      return collect(height, left + 1, right, leftMax, rightMax, water + leftMax - height[left]);
    }

    if (height[right] >= rightMax) {
      return collect(height, left, right - 1, leftMax, height[right], water);
    }
    return collect(height, left, right - 1, leftMax, rightMax, water + rightMax - height[right]);
  }
}`
      }
    ]
  },
  "sliding-window": {
    id: "sliding-window",
    name: "Sliding Window Revision",
    summary: "Fixed-size windows, variable-size windows, frequency windows, and monotonic deque windows.",
    checklist: [
      "Identify whether the window size is fixed or variable.",
      "For fixed k, add the incoming value and remove the outgoing value.",
      "For variable windows, expand right first, then shrink left while the window is invalid.",
      "For character-frequency windows, track counts and the exact condition that makes the window valid.",
      "For max/min in every window, use a monotonic deque."
    ],
    mistakes: [
      "Forgetting to remove the outgoing element in a fixed-size window.",
      "Shrinking before recording a valid minimum window.",
      "Recomputing max or frequency from scratch inside every window when a running state is enough.",
      "Using a stale index in a deque after it falls out of the window.",
      "Confusing substring with subsequence."
    ],
    edgeCases: [
      "k = 1 and k equal to array length.",
      "k greater than array length.",
      "Empty string or empty target.",
      "Repeated characters in the target string.",
      "All identical characters.",
      "No valid window exists."
    ],
    complexities: [
      "Fixed-size sum windows usually cost O(n) time and O(1) space.",
      "Variable-size character windows usually cost O(n) time and O(alphabet) space.",
      "Brute force substring windows commonly cost O(n^2) or worse.",
      "Monotonic deque windows cost O(n) time and O(k) space.",
      "Recursive window scans keep the same main time complexity but add O(n) call stack."
    ],
    mentalModel: [
      "Right expands the search space.",
      "Left removes what makes the current window invalid or non-optimal.",
      "The window state must answer validity in O(1) or near O(1).",
      "Record max windows after expansion; record min windows before shrinking away validity.",
      "A deque keeps only candidates that can still become the answer."
    ],
    revisionStrategy: [
      "Day 1: Solve fixed-size max sum and longest substring without repeats.",
      "Day 3: Solve permutation and character replacement from memory.",
      "Day 7: Redo minimum window substring and explain formed/required carefully.",
      "Day 14: Redo sliding window maximum with a monotonic deque.",
      "Before interviews: Revisit Minimum Window Substring and Sliding Window Maximum."
    ],
    problems: [
      {
        group: "core",
        name: "Maximum Sum Subarray of Size K",
        difficulty: "Easy",
        subpattern: "Fixed-size running sum window",
        question: "Given an integer array nums and an integer k, return the maximum sum of any contiguous subarray of exactly size k.",
        trigger: "The window size is fixed, so each step adds one incoming value and removes one outgoing value.",
        intuition: "Brute force sums every k-length subarray. The optimized version reuses the previous window sum.",
        edgeCases: "k = 1, k equals nums.length, negative values, all negative values, and invalid k.",
        constraints: "1 <= k <= nums.length for normal use.",
        bruteForceComplexity: "Time O(n * k), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "nums = [2, 1, 5, 1, 3, 2], k = 3",
            output: "9",
            explanation: "[5, 1, 3] has the maximum sum."
          }
        ],
        bruteForceCode: `class Solution {
  public int maxSumSubarray(int[] nums, int k) {
    if (nums == null || k <= 0 || k > nums.length) {
      throw new IllegalArgumentException("k must be between 1 and nums.length");
    }

    int best = Integer.MIN_VALUE;
    for (int start = 0; start <= nums.length - k; start++) {
      int sum = 0;
      for (int i = start; i < start + k; i++) {
        sum += nums[i];
      }
      best = Math.max(best, sum);
    }

    return best;
  }
}`,
        iterativeCode: `class Solution {
  public int maxSumSubarray(int[] nums, int k) {
    if (nums == null || k <= 0 || k > nums.length) {
      throw new IllegalArgumentException("k must be between 1 and nums.length");
    }

    int windowSum = 0;
    for (int i = 0; i < k; i++) {
      windowSum += nums[i];
    }

    int best = windowSum;
    for (int right = k; right < nums.length; right++) {
      windowSum += nums[right] - nums[right - k];
      best = Math.max(best, windowSum);
    }

    return best;
  }
}`,
        recursiveCode: `class Solution {
  public int maxSumSubarray(int[] nums, int k) {
    if (nums == null || k <= 0 || k > nums.length) {
      throw new IllegalArgumentException("k must be between 1 and nums.length");
    }

    int firstWindow = sumFirstK(nums, 0, k);
    return slide(nums, k, k, firstWindow, firstWindow);
  }

  private int sumFirstK(int[] nums, int index, int k) {
    if (index == k) {
      return 0;
    }

    return nums[index] + sumFirstK(nums, index + 1, k);
  }

  private int slide(int[] nums, int k, int right, int windowSum, int best) {
    if (right == nums.length) {
      return best;
    }

    int nextSum = windowSum + nums[right] - nums[right - k];
    return slide(nums, k, right + 1, nextSum, Math.max(best, nextSum));
  }
}`
      },
      {
        group: "core",
        name: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        subpattern: "Variable window with last seen index",
        question: "Given a string s, return the length of the longest substring without repeating characters.",
        trigger: "A duplicate character invalidates the current window, so left must move past that character's previous index.",
        intuition: "Maintain the latest index of each character and keep the window free of duplicates.",
        edgeCases: "Empty string, one character, all same characters, all unique characters, and duplicate before current left.",
        constraints: "The input can contain any Java char value.",
        source: {
          label: "Longest Substring Without Repeating Characters - LeetCode 3",
          url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(min(n, alphabet)).",
        optimizedComplexity: "Time O(n), Space O(min(n, alphabet)).",
        recursiveComplexity: "Time O(n), Space O(min(n, alphabet) + n) including call stack.",
        examples: [
          {
            input: "s = \"abcabcbb\"",
            output: "3",
            explanation: "\"abc\" is the longest substring without repeating characters."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public int lengthOfLongestSubstring(String s) {
    if (s == null || s.isEmpty()) {
      return 0;
    }

    int best = 0;
    for (int start = 0; start < s.length(); start++) {
      Set<Character> seen = new HashSet<>();
      for (int end = start; end < s.length(); end++) {
        char current = s.charAt(end);
        if (seen.contains(current)) {
          break;
        }
        seen.add(current);
        best = Math.max(best, end - start + 1);
      }
    }

    return best;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int lengthOfLongestSubstring(String s) {
    if (s == null || s.isEmpty()) {
      return 0;
    }

    Map<Character, Integer> lastSeen = new HashMap<>();
    int left = 0;
    int best = 0;

    for (int right = 0; right < s.length(); right++) {
      char current = s.charAt(right);
      if (lastSeen.containsKey(current) && lastSeen.get(current) >= left) {
        left = lastSeen.get(current) + 1;
      }

      lastSeen.put(current, right);
      best = Math.max(best, right - left + 1);
    }

    return best;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int lengthOfLongestSubstring(String s) {
    if (s == null || s.isEmpty()) {
      return 0;
    }

    return expand(s, 0, 0, 0, new HashMap<>());
  }

  private int expand(String s, int right, int left, int best, Map<Character, Integer> lastSeen) {
    if (right == s.length()) {
      return best;
    }

    char current = s.charAt(right);
    if (lastSeen.containsKey(current) && lastSeen.get(current) >= left) {
      left = lastSeen.get(current) + 1;
    }

    lastSeen.put(current, right);
    int nextBest = Math.max(best, right - left + 1);
    return expand(s, right + 1, left, nextBest, lastSeen);
  }
}`
      },
      {
        group: "core",
        name: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        subpattern: "Variable frequency window with replacement budget",
        question: "Given an uppercase string s and an integer k, return the length of the longest substring that can become all one repeated character after replacing at most k characters.",
        trigger: "A window is valid when window length minus its most frequent character count is at most k.",
        intuition: "Track character counts and the highest count in the window; shrink only when replacements needed exceed k.",
        edgeCases: "k = 0, k larger than string length, empty string, all same characters, and alternating characters.",
        constraints: "s contains uppercase English letters.",
        source: {
          label: "Longest Repeating Character Replacement - LeetCode 424",
          url: "https://leetcode.com/problems/longest-repeating-character-replacement/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1) because the alphabet size is 26.",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack plus O(1) counts.",
        examples: [
          {
            input: "s = \"AABABBA\", k = 1",
            output: "4",
            explanation: "\"AABA\" or \"ABBA\" can become one repeated character with one replacement."
          }
        ],
        bruteForceCode: `class Solution {
  public int characterReplacement(String s, int k) {
    if (s == null || s.isEmpty()) {
      return 0;
    }

    int best = 0;
    for (int start = 0; start < s.length(); start++) {
      int[] count = new int[26];
      int maxFrequency = 0;

      for (int end = start; end < s.length(); end++) {
        int index = s.charAt(end) - 'A';
        count[index]++;
        maxFrequency = Math.max(maxFrequency, count[index]);

        int length = end - start + 1;
        if (length - maxFrequency <= k) {
          best = Math.max(best, length);
        }
      }
    }

    return best;
  }
}`,
        iterativeCode: `class Solution {
  public int characterReplacement(String s, int k) {
    if (s == null || s.isEmpty()) {
      return 0;
    }

    int[] count = new int[26];
    int left = 0;
    int maxFrequency = 0;
    int best = 0;

    for (int right = 0; right < s.length(); right++) {
      int rightIndex = s.charAt(right) - 'A';
      count[rightIndex]++;
      maxFrequency = Math.max(maxFrequency, count[rightIndex]);

      while (right - left + 1 - maxFrequency > k) {
        count[s.charAt(left) - 'A']--;
        left++;
      }

      best = Math.max(best, right - left + 1);
    }

    return best;
  }
}`,
        recursiveCode: `class Solution {
  public int characterReplacement(String s, int k) {
    if (s == null || s.isEmpty()) {
      return 0;
    }

    return expand(s, k, 0, 0, 0, 0, new int[26]);
  }

  private int expand(String s, int k, int left, int right, int maxFrequency, int best, int[] count) {
    if (right == s.length()) {
      return best;
    }

    int rightIndex = s.charAt(right) - 'A';
    count[rightIndex]++;
    maxFrequency = Math.max(maxFrequency, count[rightIndex]);

    while (right - left + 1 - maxFrequency > k) {
      count[s.charAt(left) - 'A']--;
      left++;
    }

    int nextBest = Math.max(best, right - left + 1);
    return expand(s, k, left, right + 1, maxFrequency, nextBest, count);
  }
}`
      },
      {
        group: "core",
        name: "Minimum Window Substring",
        difficulty: "Hard",
        subpattern: "Variable window with required frequency coverage",
        question: "Given strings s and t, return the smallest substring of s that contains every character of t including duplicates. Return an empty string if no such window exists.",
        trigger: "The window becomes valid only when it contains every required character count from t.",
        intuition: "Expand right until the target is covered, then shrink left while the window remains valid to minimize length.",
        edgeCases: "t longer than s, repeated characters in t, no valid window, t empty, and best window at the beginning or end.",
        constraints: "Characters are handled with an ASCII-sized frequency table.",
        source: {
          label: "Minimum Window Substring - LeetCode 76",
          url: "https://leetcode.com/problems/minimum-window-substring/"
        },
        bruteForceComplexity: "Time O(n^2 * alphabet), Space O(alphabet).",
        optimizedComplexity: "Time O(n + m), Space O(alphabet).",
        recursiveComplexity: "Time O(n + m), Space O(alphabet + n) including call stack.",
        examples: [
          {
            input: "s = \"ADOBECODEBANC\", t = \"ABC\"",
            output: "\"BANC\"",
            explanation: "\"BANC\" is the smallest substring containing A, B, and C."
          }
        ],
        bruteForceCode: `class Solution {
  public String minWindow(String s, String t) {
    if (s == null || t == null || t.isEmpty() || s.length() < t.length()) {
      return "";
    }

    int[] need = new int[128];
    for (char c : t.toCharArray()) {
      need[c]++;
    }

    int bestStart = 0;
    int bestLength = Integer.MAX_VALUE;

    for (int start = 0; start < s.length(); start++) {
      int[] window = new int[128];
      for (int end = start; end < s.length(); end++) {
        window[s.charAt(end)]++;
        if (covers(window, need)) {
          int length = end - start + 1;
          if (length < bestLength) {
            bestStart = start;
            bestLength = length;
          }
          break;
        }
      }
    }

    return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
  }

  private boolean covers(int[] window, int[] need) {
    for (int i = 0; i < need.length; i++) {
      if (window[i] < need[i]) {
        return false;
      }
    }

    return true;
  }
}`,
        iterativeCode: `class Solution {
  public String minWindow(String s, String t) {
    if (s == null || t == null || t.isEmpty() || s.length() < t.length()) {
      return "";
    }

    int[] need = new int[128];
    for (char c : t.toCharArray()) {
      need[c]++;
    }

    int left = 0;
    int matched = 0;
    int bestStart = 0;
    int bestLength = Integer.MAX_VALUE;
    int[] window = new int[128];

    for (int right = 0; right < s.length(); right++) {
      char rightChar = s.charAt(right);
      window[rightChar]++;
      if (need[rightChar] > 0 && window[rightChar] <= need[rightChar]) {
        matched++;
      }

      while (matched == t.length()) {
        int length = right - left + 1;
        if (length < bestLength) {
          bestStart = left;
          bestLength = length;
        }

        char leftChar = s.charAt(left);
        window[leftChar]--;
        if (need[leftChar] > 0 && window[leftChar] < need[leftChar]) {
          matched--;
        }
        left++;
      }
    }

    return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
  }
}`,
        recursiveCode: `class Solution {
  public String minWindow(String s, String t) {
    if (s == null || t == null || t.isEmpty() || s.length() < t.length()) {
      return "";
    }

    int[] need = new int[128];
    for (char c : t.toCharArray()) {
      need[c]++;
    }

    int[] best = expand(s, t, need, new int[128], 0, 0, 0, new int[] {0, Integer.MAX_VALUE});
    return best[1] == Integer.MAX_VALUE ? "" : s.substring(best[0], best[0] + best[1]);
  }

  private int[] expand(String s, String t, int[] need, int[] window, int left, int right, int matched, int[] best) {
    if (right == s.length()) {
      return best;
    }

    char rightChar = s.charAt(right);
    window[rightChar]++;
    if (need[rightChar] > 0 && window[rightChar] <= need[rightChar]) {
      matched++;
    }

    while (matched == t.length()) {
      int length = right - left + 1;
      if (length < best[1]) {
        best[0] = left;
        best[1] = length;
      }

      char leftChar = s.charAt(left);
      window[leftChar]--;
      if (need[leftChar] > 0 && window[leftChar] < need[leftChar]) {
        matched--;
      }
      left++;
    }

    return expand(s, t, need, window, left, right + 1, matched, best);
  }
}`
      },
      {
        group: "core",
        name: "Permutation in String",
        difficulty: "Medium",
        subpattern: "Fixed-size frequency window",
        question: "Given strings s1 and s2, return true if s2 contains a permutation of s1 as a contiguous substring.",
        trigger: "Any permutation of s1 must have the same length and character frequency as s1.",
        intuition: "Slide a fixed-size window of length s1.length over s2 and compare frequency counts.",
        edgeCases: "s1 longer than s2, empty s1, repeated characters, match at the start, match at the end, and no match.",
        constraints: "s1 and s2 contain lowercase English letters.",
        source: {
          label: "Permutation in String - LeetCode 567",
          url: "https://leetcode.com/problems/permutation-in-string/"
        },
        bruteForceComplexity: "Time O(n * m + n * alphabet), Space O(alphabet).",
        optimizedComplexity: "Time O(n * alphabet), Space O(alphabet), which is O(n) for fixed lowercase alphabet.",
        recursiveComplexity: "Time O(n * alphabet), Space O(alphabet + n) including call stack.",
        examples: [
          {
            input: "s1 = \"ab\", s2 = \"eidbaooo\"",
            output: "true",
            explanation: "\"ba\" is a permutation of \"ab\"."
          }
        ],
        bruteForceCode: `class Solution {
  public boolean checkInclusion(String s1, String s2) {
    if (s1 == null || s2 == null || s1.length() > s2.length()) {
      return false;
    }

    int[] need = buildCount(s1, 0, s1.length());
    for (int start = 0; start <= s2.length() - s1.length(); start++) {
      int[] window = buildCount(s2, start, start + s1.length());
      if (matches(need, window)) {
        return true;
      }
    }

    return false;
  }

  private int[] buildCount(String value, int start, int end) {
    int[] count = new int[26];
    for (int i = start; i < end; i++) {
      count[value.charAt(i) - 'a']++;
    }

    return count;
  }

  private boolean matches(int[] first, int[] second) {
    for (int i = 0; i < first.length; i++) {
      if (first[i] != second[i]) {
        return false;
      }
    }

    return true;
  }
}`,
        iterativeCode: `class Solution {
  public boolean checkInclusion(String s1, String s2) {
    if (s1 == null || s2 == null || s1.length() > s2.length()) {
      return false;
    }

    int[] need = new int[26];
    int[] window = new int[26];

    for (int i = 0; i < s1.length(); i++) {
      need[s1.charAt(i) - 'a']++;
      window[s2.charAt(i) - 'a']++;
    }

    if (matches(need, window)) {
      return true;
    }

    for (int right = s1.length(); right < s2.length(); right++) {
      window[s2.charAt(right) - 'a']++;
      window[s2.charAt(right - s1.length()) - 'a']--;
      if (matches(need, window)) {
        return true;
      }
    }

    return false;
  }

  private boolean matches(int[] first, int[] second) {
    for (int i = 0; i < first.length; i++) {
      if (first[i] != second[i]) {
        return false;
      }
    }

    return true;
  }
}`,
        recursiveCode: `class Solution {
  public boolean checkInclusion(String s1, String s2) {
    if (s1 == null || s2 == null || s1.length() > s2.length()) {
      return false;
    }

    int[] need = new int[26];
    int[] window = new int[26];
    fill(s1, need, 0, s1.length());
    fill(s2, window, 0, s1.length());

    return slide(s2, s1.length(), s1.length(), need, window);
  }

  private void fill(String value, int[] count, int index, int end) {
    if (index == end) {
      return;
    }

    count[value.charAt(index) - 'a']++;
    fill(value, count, index + 1, end);
  }

  private boolean slide(String s2, int size, int right, int[] need, int[] window) {
    if (matches(need, window)) {
      return true;
    }
    if (right == s2.length()) {
      return false;
    }

    window[s2.charAt(right) - 'a']++;
    window[s2.charAt(right - size) - 'a']--;
    return slide(s2, size, right + 1, need, window);
  }

  private boolean matches(int[] first, int[] second) {
    for (int i = 0; i < first.length; i++) {
      if (first[i] != second[i]) {
        return false;
      }
    }

    return true;
  }
}`
      },
      {
        group: "core",
        name: "Sliding Window Maximum",
        difficulty: "Hard",
        subpattern: "Monotonic decreasing deque",
        question: "Given an integer array nums and an integer k, return the maximum value in every contiguous window of size k.",
        trigger: "Each window needs a maximum, and expired indexes plus smaller trailing values can never be future answers.",
        intuition: "Keep indexes in a deque ordered by decreasing value. The front is always the current window maximum.",
        edgeCases: "k = 1, k equals nums.length, duplicate maximum values, negative values, and invalid k.",
        constraints: "1 <= k <= nums.length for normal use.",
        source: {
          label: "Sliding Window Maximum - LeetCode 239",
          url: "https://leetcode.com/problems/sliding-window-maximum/"
        },
        bruteForceComplexity: "Time O(n * k), Space O(n - k + 1) for the answer.",
        optimizedComplexity: "Time O(n), Space O(k) for the deque plus answer.",
        recursiveComplexity: "Time O(n), Space O(k + n) for deque and call stack plus answer.",
        examples: [
          {
            input: "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
            output: "[3, 3, 5, 5, 6, 7]",
            explanation: "Each output is the maximum of the corresponding size-3 window."
          }
        ],
        bruteForceCode: `class Solution {
  public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums == null || k <= 0 || k > nums.length) {
      return new int[0];
    }

    int[] answer = new int[nums.length - k + 1];
    for (int start = 0; start <= nums.length - k; start++) {
      int max = nums[start];
      for (int i = start + 1; i < start + k; i++) {
        max = Math.max(max, nums[i]);
      }
      answer[start] = max;
    }

    return answer;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums == null || k <= 0 || k > nums.length) {
      return new int[0];
    }

    int[] answer = new int[nums.length - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();

    for (int i = 0; i < nums.length; i++) {
      while (!deque.isEmpty() && deque.peekFirst() <= i - k) {
        deque.pollFirst();
      }
      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
        deque.pollLast();
      }

      deque.offerLast(i);
      if (i >= k - 1) {
        answer[i - k + 1] = nums[deque.peekFirst()];
      }
    }

    return answer;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums == null || k <= 0 || k > nums.length) {
      return new int[0];
    }

    int[] answer = new int[nums.length - k + 1];
    fill(nums, k, 0, new ArrayDeque<>(), answer);
    return answer;
  }

  private void fill(int[] nums, int k, int index, Deque<Integer> deque, int[] answer) {
    if (index == nums.length) {
      return;
    }

    while (!deque.isEmpty() && deque.peekFirst() <= index - k) {
      deque.pollFirst();
    }
    while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[index]) {
      deque.pollLast();
    }

    deque.offerLast(index);
    if (index >= k - 1) {
      answer[index - k + 1] = nums[deque.peekFirst()];
    }

    fill(nums, k, index + 1, deque, answer);
  }
}`
      }
    ]
  },
  "binary-search": {
    id: "binary-search",
    name: "Binary Search Revision",
    summary: "Classic search, boundary search, rotated arrays, peak search, matrix search, and binary search on answer.",
    checklist: [
      "Confirm the search space is sorted, monotonic, or can be converted into a yes/no monotonic predicate.",
      "Decide whether you need any match, first match, last match, lower bound, or upper bound.",
      "Use left + (right - left) / 2 to avoid overflow.",
      "When searching an answer, define the smallest or largest feasible value before coding.",
      "After the loop, return the boundary that matches the invariant."
    ],
    mistakes: [
      "Using normal binary search when the problem asks for first or last occurrence.",
      "Mixing inclusive [left, right] and half-open [left, right) rules in the same method.",
      "Forgetting that lower bound is first >= target and upper bound is first > target.",
      "Overflowing int when summing weights, piles, or capacities.",
      "Writing a feasibility check that is not monotonic."
    ],
    edgeCases: [
      "Empty array and one-element array.",
      "Target smaller than all values or larger than all values.",
      "All values equal.",
      "Target absent but between existing values.",
      "Rotated array with target in either sorted half.",
      "Binary-search-on-answer with minimum feasible at the low or high bound."
    ],
    complexities: [
      "Classic binary search is O(log n) time and O(1) iterative space.",
      "Recursive binary search is O(log n) time and O(log n) stack space.",
      "Boundary searches keep O(log n) time but must preserve an answer/index invariant.",
      "Matrix virtual binary search is O(log(mn)) time.",
      "Binary search on answer is O(n log range) when each feasibility check scans the input."
    ],
    mentalModel: [
      "Binary search is not about arrays; it is about discarding half of a monotonic search space.",
      "Every branch must preserve the answer inside the remaining range.",
      "For first true problems, move right when predicate(mid) is true.",
      "For last true problems, move left when predicate(mid) is true.",
      "If you cannot explain the invariant, the code is probably accidental."
    ],
    revisionStrategy: [
      "Day 1: Solve Binary Search, First Occurrence, Last Occurrence, Lower Bound, and Upper Bound.",
      "Day 3: Solve Rotated Search, Peak Element, and Search 2D Matrix.",
      "Day 7: Solve Koko Eating Bananas and Capacity to Ship Packages from memory.",
      "Day 14: Redo every recursive version and explain the base case.",
      "Before interviews: Revisit lower/upper bound and binary search on answer."
    ],
    problems: [
      {
        group: "core",
        name: "Binary Search",
        difficulty: "Easy",
        subpattern: "Classic sorted-array binary search",
        question: "Given a sorted integer array nums and an integer target, return the index of target. Return -1 if target is not present.",
        trigger: "The array is sorted, so comparing target with nums[mid] tells which half can be discarded.",
        intuition: "Linear search checks every value. Binary search halves the candidate range after each comparison.",
        edgeCases: "Empty array, one element, target at first index, target at last index, target absent, and negative numbers.",
        constraints: "nums is sorted in ascending order.",
        source: {
          label: "Binary Search - LeetCode 704",
          url: "https://leetcode.com/problems/binary-search/"
        },
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(log n), Space O(1).",
        recursiveComplexity: "Time O(log n), Space O(log n) call stack.",
        examples: [
          {
            input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
            output: "4",
            explanation: "9 exists at index 4."
          }
        ],
        bruteForceCode: `class Solution {
  public int search(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] == target) {
        return i;
      }
    }

    return -1;
  }
}`,
        iterativeCode: `class Solution {
  public int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] == target) {
        return mid;
      }
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  }
}`,
        recursiveCode: `class Solution {
  public int search(int[] nums, int target) {
    return search(nums, target, 0, nums.length - 1);
  }

  private int search(int[] nums, int target, int left, int right) {
    if (left > right) {
      return -1;
    }

    int mid = left + (right - left) / 2;
    if (nums[mid] == target) {
      return mid;
    }
    if (nums[mid] < target) {
      return search(nums, target, mid + 1, right);
    }

    return search(nums, target, left, mid - 1);
  }
}`
      },
      {
        group: "core",
        name: "First Occurrence",
        difficulty: "Easy",
        subpattern: "Left boundary binary search",
        question: "Given a sorted integer array nums and an integer target, return the first index where target appears. Return -1 if target is absent.",
        trigger: "Finding any target is not enough because duplicates can appear before it.",
        intuition: "When nums[mid] equals target, save mid and continue searching the left half.",
        edgeCases: "Target absent, target appears once, target appears many times, all values equal target, and target at index 0.",
        constraints: "nums is sorted in ascending order and may contain duplicates.",
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(log n), Space O(1).",
        recursiveComplexity: "Time O(log n), Space O(log n) call stack.",
        examples: [
          {
            input: "nums = [1, 2, 2, 2, 3], target = 2",
            output: "1",
            explanation: "The first 2 is at index 1."
          }
        ],
        bruteForceCode: `class Solution {
  public int firstOccurrence(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] == target) {
        return i;
      }
    }

    return -1;
  }
}`,
        iterativeCode: `class Solution {
  public int firstOccurrence(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    int answer = -1;

    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] >= target) {
        if (nums[mid] == target) {
          answer = mid;
        }
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return answer;
  }
}`,
        recursiveCode: `class Solution {
  public int firstOccurrence(int[] nums, int target) {
    return first(nums, target, 0, nums.length - 1, -1);
  }

  private int first(int[] nums, int target, int left, int right, int answer) {
    if (left > right) {
      return answer;
    }

    int mid = left + (right - left) / 2;
    if (nums[mid] >= target) {
      int nextAnswer = nums[mid] == target ? mid : answer;
      return first(nums, target, left, mid - 1, nextAnswer);
    }

    return first(nums, target, mid + 1, right, answer);
  }
}`
      },
      {
        group: "core",
        name: "Last Occurrence",
        difficulty: "Easy",
        subpattern: "Right boundary binary search",
        question: "Given a sorted integer array nums and an integer target, return the last index where target appears. Return -1 if target is absent.",
        trigger: "Finding any target is not enough because duplicates can appear after it.",
        intuition: "When nums[mid] equals target, save mid and continue searching the right half.",
        edgeCases: "Target absent, target appears once, target appears many times, all values equal target, and target at last index.",
        constraints: "nums is sorted in ascending order and may contain duplicates.",
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(log n), Space O(1).",
        recursiveComplexity: "Time O(log n), Space O(log n) call stack.",
        examples: [
          {
            input: "nums = [1, 2, 2, 2, 3], target = 2",
            output: "3",
            explanation: "The last 2 is at index 3."
          }
        ],
        bruteForceCode: `class Solution {
  public int lastOccurrence(int[] nums, int target) {
    for (int i = nums.length - 1; i >= 0; i--) {
      if (nums[i] == target) {
        return i;
      }
    }

    return -1;
  }
}`,
        iterativeCode: `class Solution {
  public int lastOccurrence(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    int answer = -1;

    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] <= target) {
        if (nums[mid] == target) {
          answer = mid;
        }
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return answer;
  }
}`,
        recursiveCode: `class Solution {
  public int lastOccurrence(int[] nums, int target) {
    return last(nums, target, 0, nums.length - 1, -1);
  }

  private int last(int[] nums, int target, int left, int right, int answer) {
    if (left > right) {
      return answer;
    }

    int mid = left + (right - left) / 2;
    if (nums[mid] <= target) {
      int nextAnswer = nums[mid] == target ? mid : answer;
      return last(nums, target, mid + 1, right, nextAnswer);
    }

    return last(nums, target, left, mid - 1, answer);
  }
}`
      },
      {
        group: "core",
        name: "Lower Bound",
        difficulty: "Easy",
        subpattern: "First index greater than or equal to target",
        question: "Given a sorted integer array nums and an integer target, return the first index i such that nums[i] >= target. Return nums.length if no such index exists.",
        trigger: "The predicate nums[i] >= target is false, false, then true over the sorted array.",
        intuition: "Search for the first true index. When mid qualifies, keep it and move left.",
        edgeCases: "Target smaller than all values, target larger than all values, duplicates, empty array, and exact match at index 0.",
        constraints: "nums is sorted in ascending order.",
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(log n), Space O(1).",
        recursiveComplexity: "Time O(log n), Space O(log n) call stack.",
        examples: [
          {
            input: "nums = [1, 3, 3, 5, 8], target = 4",
            output: "3",
            explanation: "5 is the first value greater than or equal to 4."
          }
        ],
        bruteForceCode: `class Solution {
  public int lowerBound(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] >= target) {
        return i;
      }
    }

    return nums.length;
  }
}`,
        iterativeCode: `class Solution {
  public int lowerBound(int[] nums, int target) {
    int left = 0;
    int right = nums.length;

    while (left < right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] >= target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }
}`,
        recursiveCode: `class Solution {
  public int lowerBound(int[] nums, int target) {
    return lower(nums, target, 0, nums.length);
  }

  private int lower(int[] nums, int target, int left, int right) {
    if (left >= right) {
      return left;
    }

    int mid = left + (right - left) / 2;
    if (nums[mid] >= target) {
      return lower(nums, target, left, mid);
    }

    return lower(nums, target, mid + 1, right);
  }
}`
      },
      {
        group: "core",
        name: "Upper Bound",
        difficulty: "Easy",
        subpattern: "First index greater than target",
        question: "Given a sorted integer array nums and an integer target, return the first index i such that nums[i] > target. Return nums.length if no such index exists.",
        trigger: "The predicate nums[i] > target is false, false, then true over the sorted array.",
        intuition: "Search for the first index strictly greater than target. Equal values are still on the left side.",
        edgeCases: "Target smaller than all values, target larger than all values, all values equal target, duplicates, and empty array.",
        constraints: "nums is sorted in ascending order.",
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(log n), Space O(1).",
        recursiveComplexity: "Time O(log n), Space O(log n) call stack.",
        examples: [
          {
            input: "nums = [1, 3, 3, 5, 8], target = 3",
            output: "3",
            explanation: "5 at index 3 is the first value greater than 3."
          }
        ],
        bruteForceCode: `class Solution {
  public int upperBound(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] > target) {
        return i;
      }
    }

    return nums.length;
  }
}`,
        iterativeCode: `class Solution {
  public int upperBound(int[] nums, int target) {
    int left = 0;
    int right = nums.length;

    while (left < right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] > target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }
}`,
        recursiveCode: `class Solution {
  public int upperBound(int[] nums, int target) {
    return upper(nums, target, 0, nums.length);
  }

  private int upper(int[] nums, int target, int left, int right) {
    if (left >= right) {
      return left;
    }

    int mid = left + (right - left) / 2;
    if (nums[mid] > target) {
      return upper(nums, target, left, mid);
    }

    return upper(nums, target, mid + 1, right);
  }
}`
      },
      {
        group: "core",
        name: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        subpattern: "Binary search with one sorted half",
        question: "Given a rotated sorted array nums with distinct values and an integer target, return the target index. Return -1 if target is absent.",
        trigger: "At every mid, either the left half or right half is still sorted, so one half can be discarded.",
        intuition: "Determine which side is sorted, then decide whether target lies inside that sorted side.",
        edgeCases: "No rotation, one element, target in left sorted half, target in right sorted half, and target absent.",
        constraints: "nums contains distinct values and was originally sorted ascending before rotation.",
        source: {
          label: "Search in Rotated Sorted Array - LeetCode 33",
          url: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
        },
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(log n), Space O(1).",
        recursiveComplexity: "Time O(log n), Space O(log n) call stack.",
        examples: [
          {
            input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
            output: "4",
            explanation: "0 is at index 4 after rotation."
          }
        ],
        bruteForceCode: `class Solution {
  public int search(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] == target) {
        return i;
      }
    }

    return -1;
  }
}`,
        iterativeCode: `class Solution {
  public int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] == target) {
        return mid;
      }

      if (nums[left] <= nums[mid]) {
        if (nums[left] <= target && target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        if (nums[mid] < target && target <= nums[right]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }

    return -1;
  }
}`,
        recursiveCode: `class Solution {
  public int search(int[] nums, int target) {
    return search(nums, target, 0, nums.length - 1);
  }

  private int search(int[] nums, int target, int left, int right) {
    if (left > right) {
      return -1;
    }

    int mid = left + (right - left) / 2;
    if (nums[mid] == target) {
      return mid;
    }

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        return search(nums, target, left, mid - 1);
      }
      return search(nums, target, mid + 1, right);
    }

    if (nums[mid] < target && target <= nums[right]) {
      return search(nums, target, mid + 1, right);
    }
    return search(nums, target, left, mid - 1);
  }
}`
      },
      {
        group: "core",
        name: "Peak Element",
        difficulty: "Medium",
        subpattern: "Binary search on slope direction",
        question: "Given an integer array nums where adjacent values are not equal, return any peak index. A peak is greater than its neighbors.",
        trigger: "If nums[mid] < nums[mid + 1], a peak must exist on the right; otherwise a peak exists on the left including mid.",
        intuition: "Follow the upward slope. The boundary where the slope stops rising is a peak.",
        edgeCases: "One element, peak at first index, peak at last index, strictly increasing array, and strictly decreasing array.",
        constraints: "nums[-1] and nums[n] are treated as negative infinity.",
        source: {
          label: "Find Peak Element - LeetCode 162",
          url: "https://leetcode.com/problems/find-peak-element/"
        },
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(log n), Space O(1).",
        recursiveComplexity: "Time O(log n), Space O(log n) call stack.",
        examples: [
          {
            input: "nums = [1, 2, 1, 3, 5, 6, 4]",
            output: "5",
            explanation: "nums[5] = 6 is greater than both neighbors."
          }
        ],
        bruteForceCode: `class Solution {
  public int findPeakElement(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
      boolean leftIsLower = i == 0 || nums[i] > nums[i - 1];
      boolean rightIsLower = i == nums.length - 1 || nums[i] > nums[i + 1];
      if (leftIsLower && rightIsLower) {
        return i;
      }
    }

    return -1;
  }
}`,
        iterativeCode: `class Solution {
  public int findPeakElement(int[] nums) {
    int left = 0;
    int right = nums.length - 1;

    while (left < right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] < nums[mid + 1]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }
}`,
        recursiveCode: `class Solution {
  public int findPeakElement(int[] nums) {
    return peak(nums, 0, nums.length - 1);
  }

  private int peak(int[] nums, int left, int right) {
    if (left == right) {
      return left;
    }

    int mid = left + (right - left) / 2;
    if (nums[mid] < nums[mid + 1]) {
      return peak(nums, mid + 1, right);
    }

    return peak(nums, left, mid);
  }
}`
      },
      {
        group: "core",
        name: "Search 2D Matrix",
        difficulty: "Medium",
        subpattern: "Flattened matrix binary search",
        question: "Given an m x n matrix where each row is sorted and the first value of each row is greater than the last value of the previous row, return true if target exists.",
        trigger: "The matrix behaves like one sorted 1D array when indexes are mapped with row = index / cols and col = index % cols.",
        intuition: "Binary search virtual indexes from 0 to m * n - 1 without physically flattening the matrix.",
        edgeCases: "Empty matrix, empty row, one value, target smaller than first value, target larger than last value, and target at row boundary.",
        constraints: "Rows are sorted and row ranges are globally ordered.",
        source: {
          label: "Search a 2D Matrix - LeetCode 74",
          url: "https://leetcode.com/problems/search-a-2d-matrix/"
        },
        bruteForceComplexity: "Time O(mn), Space O(1).",
        optimizedComplexity: "Time O(log(mn)), Space O(1).",
        recursiveComplexity: "Time O(log(mn)), Space O(log(mn)) call stack.",
        examples: [
          {
            input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
            output: "true",
            explanation: "3 exists at row 0, column 1."
          }
        ],
        bruteForceCode: `class Solution {
  public boolean searchMatrix(int[][] matrix, int target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
      return false;
    }

    for (int[] row : matrix) {
      for (int value : row) {
        if (value == target) {
          return true;
        }
      }
    }

    return false;
  }
}`,
        iterativeCode: `class Solution {
  public boolean searchMatrix(int[][] matrix, int target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
      return false;
    }

    int rows = matrix.length;
    int cols = matrix[0].length;
    int left = 0;
    int right = rows * cols - 1;

    while (left <= right) {
      int mid = left + (right - left) / 2;
      int value = matrix[mid / cols][mid % cols];
      if (value == target) {
        return true;
      }
      if (value < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return false;
  }
}`,
        recursiveCode: `class Solution {
  public boolean searchMatrix(int[][] matrix, int target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
      return false;
    }

    int cols = matrix[0].length;
    return search(matrix, target, cols, 0, matrix.length * cols - 1);
  }

  private boolean search(int[][] matrix, int target, int cols, int left, int right) {
    if (left > right) {
      return false;
    }

    int mid = left + (right - left) / 2;
    int value = matrix[mid / cols][mid % cols];
    if (value == target) {
      return true;
    }
    if (value < target) {
      return search(matrix, target, cols, mid + 1, right);
    }

    return search(matrix, target, cols, left, mid - 1);
  }
}`
      },
      {
        group: "core",
        name: "Koko Eating Bananas",
        difficulty: "Medium",
        subpattern: "Minimum feasible speed search",
        question: "Given piles of bananas and h hours, return the minimum integer eating speed k such that Koko can finish all piles within h hours.",
        trigger: "If speed k works, every faster speed also works, so feasibility is monotonic.",
        intuition: "Binary search speed from 1 to max pile. Each feasibility check sums ceil(pile / speed).",
        edgeCases: "One pile, h equals number of piles, very large piles, minimum speed is 1, and answer equals max pile.",
        constraints: "1 <= h and piles contains positive values.",
        source: {
          label: "Koko Eating Bananas - LeetCode 875",
          url: "https://leetcode.com/problems/koko-eating-bananas/"
        },
        bruteForceComplexity: "Time O(n * maxPile), Space O(1).",
        optimizedComplexity: "Time O(n log maxPile), Space O(1).",
        recursiveComplexity: "Time O(n log maxPile), Space O(log maxPile) call stack.",
        examples: [
          {
            input: "piles = [3, 6, 7, 11], h = 8",
            output: "4",
            explanation: "Speed 4 finishes within 8 hours and speed 3 does not."
          }
        ],
        bruteForceCode: `class Solution {
  public int minEatingSpeed(int[] piles, int h) {
    int maxPile = 0;
    for (int pile : piles) {
      maxPile = Math.max(maxPile, pile);
    }

    for (int speed = 1; speed <= maxPile; speed++) {
      if (canFinish(piles, h, speed)) {
        return speed;
      }
    }

    return maxPile;
  }

  private boolean canFinish(int[] piles, int h, int speed) {
    long hours = 0;
    for (int pile : piles) {
      hours += (pile + speed - 1) / speed;
    }

    return hours <= h;
  }
}`,
        iterativeCode: `class Solution {
  public int minEatingSpeed(int[] piles, int h) {
    int left = 1;
    int right = 0;

    for (int pile : piles) {
      right = Math.max(right, pile);
    }

    while (left < right) {
      int mid = left + (right - left) / 2;
      if (canFinish(piles, h, mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

  private boolean canFinish(int[] piles, int h, int speed) {
    long hours = 0;
    for (int pile : piles) {
      hours += (pile + speed - 1) / speed;
      if (hours > h) {
        return false;
      }
    }

    return true;
  }
}`,
        recursiveCode: `class Solution {
  public int minEatingSpeed(int[] piles, int h) {
    int right = 0;
    for (int pile : piles) {
      right = Math.max(right, pile);
    }

    return search(piles, h, 1, right);
  }

  private int search(int[] piles, int h, int left, int right) {
    if (left == right) {
      return left;
    }

    int mid = left + (right - left) / 2;
    if (canFinish(piles, h, mid)) {
      return search(piles, h, left, mid);
    }

    return search(piles, h, mid + 1, right);
  }

  private boolean canFinish(int[] piles, int h, int speed) {
    long hours = 0;
    for (int pile : piles) {
      hours += (pile + speed - 1) / speed;
      if (hours > h) {
        return false;
      }
    }

    return true;
  }
}`
      },
      {
        group: "core",
        name: "Capacity to Ship Packages",
        difficulty: "Medium",
        subpattern: "Minimum feasible capacity search",
        question: "Given package weights in order and an integer days, return the least ship capacity needed to ship all packages within days days.",
        trigger: "If capacity c can ship all packages within days, any larger capacity also works.",
        intuition: "The answer is between max(weight) and sum(weights). Binary search this range and greedily count required days.",
        edgeCases: "days = 1, days equals weights.length, one package, all weights equal, and answer equals max weight or total sum.",
        constraints: "Packages must be shipped in the given order.",
        source: {
          label: "Capacity To Ship Packages Within D Days - LeetCode 1011",
          url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
        },
        bruteForceComplexity: "Time O(n * (sumWeights - maxWeight)), Space O(1).",
        optimizedComplexity: "Time O(n log(sumWeights - maxWeight)), Space O(1).",
        recursiveComplexity: "Time O(n log(sumWeights - maxWeight)), Space O(log range) call stack.",
        examples: [
          {
            input: "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
            output: "15",
            explanation: "Capacity 15 ships all packages within 5 days."
          }
        ],
        bruteForceCode: `class Solution {
  public int shipWithinDays(int[] weights, int days) {
    int maxWeight = 0;
    int total = 0;
    for (int weight : weights) {
      maxWeight = Math.max(maxWeight, weight);
      total += weight;
    }

    for (int capacity = maxWeight; capacity <= total; capacity++) {
      if (canShip(weights, days, capacity)) {
        return capacity;
      }
    }

    return total;
  }

  private boolean canShip(int[] weights, int days, int capacity) {
    int usedDays = 1;
    int load = 0;

    for (int weight : weights) {
      if (load + weight > capacity) {
        usedDays++;
        load = 0;
      }
      load += weight;
    }

    return usedDays <= days;
  }
}`,
        iterativeCode: `class Solution {
  public int shipWithinDays(int[] weights, int days) {
    int left = 0;
    int right = 0;

    for (int weight : weights) {
      left = Math.max(left, weight);
      right += weight;
    }

    while (left < right) {
      int mid = left + (right - left) / 2;
      if (canShip(weights, days, mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

  private boolean canShip(int[] weights, int days, int capacity) {
    int usedDays = 1;
    int load = 0;

    for (int weight : weights) {
      if (load + weight > capacity) {
        usedDays++;
        load = 0;
      }
      load += weight;
      if (usedDays > days) {
        return false;
      }
    }

    return true;
  }
}`,
        recursiveCode: `class Solution {
  public int shipWithinDays(int[] weights, int days) {
    int left = 0;
    int right = 0;

    for (int weight : weights) {
      left = Math.max(left, weight);
      right += weight;
    }

    return search(weights, days, left, right);
  }

  private int search(int[] weights, int days, int left, int right) {
    if (left == right) {
      return left;
    }

    int mid = left + (right - left) / 2;
    if (canShip(weights, days, mid)) {
      return search(weights, days, left, mid);
    }

    return search(weights, days, mid + 1, right);
  }

  private boolean canShip(int[] weights, int days, int capacity) {
    int usedDays = 1;
    int load = 0;

    for (int weight : weights) {
      if (load + weight > capacity) {
        usedDays++;
        load = 0;
      }
      load += weight;
      if (usedDays > days) {
        return false;
      }
    }

    return true;
  }
}`
      }
    ]
  },
  "strings": {
    id: "strings",
    name: "Strings Revision",
    summary: "Character scanning, two pointers, frequency counting, grouping keys, prefix comparison, in-place compression, and KMP matching.",
    checklist: [
      "Clarify whether comparison is case-sensitive and whether non-alphanumeric characters matter.",
      "Use two pointers when comparing from both ends or editing a char array in-place.",
      "Use frequency counts when character order does not matter.",
      "Use a canonical key when grouping equivalent strings.",
      "Use KMP when repeated pattern matching must avoid rechecking characters."
    ],
    mistakes: [
      "Treating substring and subsequence as the same problem.",
      "Forgetting to lowercase characters in normalized palindrome checks.",
      "Sorting for anagram checks when a fixed alphabet count is enough.",
      "Returning the compressed string instead of the new in-place length.",
      "Building KMP lps values from the haystack instead of the pattern."
    ],
    edgeCases: [
      "Empty string and one-character string.",
      "Only punctuation or spaces.",
      "Duplicate strings in anagram grouping.",
      "No common prefix.",
      "Compression count with multiple digits.",
      "Pattern longer than text."
    ],
    complexities: [
      "Single-pass string scans are usually O(n) time and O(1) space for fixed alphabets.",
      "Sorting a string key costs O(k log k) per string.",
      "Count-based anagram keys cost O(k + alphabet).",
      "In-place string compression costs O(n) time and O(1) extra space.",
      "KMP costs O(n + m) time and O(m) space for the lps array."
    ],
    mentalModel: [
      "Normalize before comparing when the statement ignores case or symbols.",
      "If order matters, scan positions; if order does not matter, count frequencies.",
      "For grouping, convert every equivalent item to the same key.",
      "When writing in-place, keep separate read and write indexes.",
      "KMP remembers the longest reusable prefix after a mismatch."
    ],
    revisionStrategy: [
      "Day 1: Solve Reverse String, Valid Palindrome, and Anagram.",
      "Day 3: Solve Group Anagrams and Longest Common Prefix.",
      "Day 7: Redo String Compression with in-place writes.",
      "Day 14: Rebuild KMP lps and matching from memory.",
      "Before interviews: Revisit Valid Palindrome, Group Anagrams, String Compression, and KMP."
    ],
    problems: [
      {
        group: "core",
        name: "Reverse String",
        difficulty: "Easy",
        subpattern: "Two-pointer in-place reversal",
        question: "Given a character array s, reverse it in-place.",
        trigger: "You need to swap symmetric positions from the start and end of the array.",
        intuition: "A copy can reverse directly, but two pointers swap the outer characters and move inward without extra space.",
        edgeCases: "Empty array, one character, even length, odd length, and repeated characters.",
        constraints: "Modify the input char array in-place.",
        source: {
          label: "Reverse String - LeetCode 344",
          url: "https://leetcode.com/problems/reverse-string/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "s = ['h','e','l','l','o']",
            output: "['o','l','l','e','h']",
            explanation: "The array is reversed in-place."
          }
        ],
        bruteForceCode: `class Solution {
  public void reverseString(char[] s) {
    if (s == null) {
      return;
    }

    char[] reversed = new char[s.length];
    for (int i = 0; i < s.length; i++) {
      reversed[i] = s[s.length - 1 - i];
    }

    for (int i = 0; i < s.length; i++) {
      s[i] = reversed[i];
    }
  }
}`,
        iterativeCode: `class Solution {
  public void reverseString(char[] s) {
    if (s == null) {
      return;
    }

    int left = 0;
    int right = s.length - 1;

    while (left < right) {
      char temp = s[left];
      s[left] = s[right];
      s[right] = temp;
      left++;
      right--;
    }
  }
}`,
        recursiveCode: `class Solution {
  public void reverseString(char[] s) {
    if (s == null) {
      return;
    }

    reverse(s, 0, s.length - 1);
  }

  private void reverse(char[] s, int left, int right) {
    if (left >= right) {
      return;
    }

    char temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    reverse(s, left + 1, right - 1);
  }
}`
      },
      {
        group: "core",
        name: "Valid Palindrome",
        difficulty: "Easy",
        subpattern: "Normalized two-pointer comparison",
        question: "Given a string s, return true if it is a palindrome after converting uppercase letters to lowercase and removing non-alphanumeric characters.",
        trigger: "Only normalized alphanumeric characters matter, and palindrome comparison naturally uses both ends.",
        intuition: "A cleaned copy is simple. The optimized version skips invalid characters in-place with two pointers.",
        edgeCases: "Empty string, only punctuation, mixed case, numbers, spaces, and mismatch after normalization.",
        constraints: "Use Character.isLetterOrDigit and Character.toLowerCase for normalization.",
        source: {
          label: "Valid Palindrome - LeetCode 125",
          url: "https://leetcode.com/problems/valid-palindrome/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "s = \"A man, a plan, a canal: Panama\"",
            output: "true",
            explanation: "After normalization, the string is \"amanaplanacanalpanama\"."
          }
        ],
        bruteForceCode: `class Solution {
  public boolean isPalindrome(String s) {
    if (s == null) {
      return true;
    }

    StringBuilder cleaned = new StringBuilder();
    for (int i = 0; i < s.length(); i++) {
      char current = s.charAt(i);
      if (Character.isLetterOrDigit(current)) {
        cleaned.append(Character.toLowerCase(current));
      }
    }

    String normalized = cleaned.toString();
    return normalized.equals(cleaned.reverse().toString());
  }
}`,
        iterativeCode: `class Solution {
  public boolean isPalindrome(String s) {
    if (s == null) {
      return true;
    }

    int left = 0;
    int right = s.length() - 1;

    while (left < right) {
      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
        left++;
      }
      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
        right--;
      }

      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }
}`,
        recursiveCode: `class Solution {
  public boolean isPalindrome(String s) {
    if (s == null) {
      return true;
    }

    return check(s, 0, s.length() - 1);
  }

  private boolean check(String s, int left, int right) {
    if (left >= right) {
      return true;
    }
    if (!Character.isLetterOrDigit(s.charAt(left))) {
      return check(s, left + 1, right);
    }
    if (!Character.isLetterOrDigit(s.charAt(right))) {
      return check(s, left, right - 1);
    }
    if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
      return false;
    }

    return check(s, left + 1, right - 1);
  }
}`
      },
      {
        group: "core",
        name: "Anagram",
        difficulty: "Easy",
        subpattern: "Frequency equality",
        question: "Given two strings s and t, return true if t is an anagram of s.",
        trigger: "Anagrams have identical character counts but may appear in different order.",
        intuition: "Sorting makes equal anagrams identical. Counting characters avoids sorting.",
        edgeCases: "Different lengths, empty strings, repeated characters, same strings, and one extra character.",
        constraints: "Assume lowercase English letters for the optimized count solution.",
        source: {
          label: "Valid Anagram - LeetCode 242",
          url: "https://leetcode.com/problems/valid-anagram/"
        },
        bruteForceComplexity: "Time O(n log n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1) for fixed lowercase alphabet.",
        recursiveComplexity: "Time O(n), Space O(n) call stack plus O(1) counts.",
        examples: [
          {
            input: "s = \"anagram\", t = \"nagaram\"",
            output: "true",
            explanation: "Both strings have the same character frequencies."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public boolean isAnagram(String s, String t) {
    if (s == null || t == null || s.length() != t.length()) {
      return false;
    }

    char[] first = s.toCharArray();
    char[] second = t.toCharArray();
    Arrays.sort(first);
    Arrays.sort(second);

    return Arrays.equals(first, second);
  }
}`,
        iterativeCode: `class Solution {
  public boolean isAnagram(String s, String t) {
    if (s == null || t == null || s.length() != t.length()) {
      return false;
    }

    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
      count[s.charAt(i) - 'a']++;
      count[t.charAt(i) - 'a']--;
    }

    for (int value : count) {
      if (value != 0) {
        return false;
      }
    }

    return true;
  }
}`,
        recursiveCode: `class Solution {
  public boolean isAnagram(String s, String t) {
    if (s == null || t == null || s.length() != t.length()) {
      return false;
    }

    int[] count = new int[26];
    countCharacters(s, t, 0, count);
    return allZero(count, 0);
  }

  private void countCharacters(String s, String t, int index, int[] count) {
    if (index == s.length()) {
      return;
    }

    count[s.charAt(index) - 'a']++;
    count[t.charAt(index) - 'a']--;
    countCharacters(s, t, index + 1, count);
  }

  private boolean allZero(int[] count, int index) {
    if (index == count.length) {
      return true;
    }

    return count[index] == 0 && allZero(count, index + 1);
  }
}`
      },
      {
        group: "core",
        name: "Group Anagrams",
        difficulty: "Medium",
        subpattern: "Canonical anagram key",
        question: "Given an array of strings strs, group the anagrams together.",
        trigger: "Strings that are anagrams become identical after converting them to a canonical key.",
        intuition: "Use a sorted string or frequency signature as the key, then collect strings with the same key.",
        edgeCases: "Empty input, empty strings, duplicates, one string, and many strings in the same group.",
        constraints: "Return groups in any order.",
        source: {
          label: "Group Anagrams - LeetCode 49",
          url: "https://leetcode.com/problems/group-anagrams/"
        },
        bruteForceComplexity: "Time O(n^2 * k), Space O(n * k) for grouped output.",
        optimizedComplexity: "Time O(n * k), Space O(n * k) for groups and keys with fixed lowercase alphabet.",
        recursiveComplexity: "Time O(n * k), Space O(n * k + n) including call stack.",
        examples: [
          {
            input: "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
            output: "[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
            explanation: "Words with the same character counts are grouped."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public List<List<String>> groupAnagrams(String[] strs) {
    List<List<String>> groups = new ArrayList<>();

    for (String word : strs) {
      boolean placed = false;
      for (List<String> group : groups) {
        if (isAnagram(group.get(0), word)) {
          group.add(word);
          placed = true;
          break;
        }
      }

      if (!placed) {
        List<String> group = new ArrayList<>();
        group.add(word);
        groups.add(group);
      }
    }

    return groups;
  }

  private boolean isAnagram(String first, String second) {
    if (first.length() != second.length()) {
      return false;
    }

    int[] count = new int[26];
    for (int i = 0; i < first.length(); i++) {
      count[first.charAt(i) - 'a']++;
      count[second.charAt(i) - 'a']--;
    }

    for (int value : count) {
      if (value != 0) {
        return false;
      }
    }

    return true;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();

    for (String word : strs) {
      String key = buildKey(word);
      groups.computeIfAbsent(key, ignored -> new ArrayList<>()).add(word);
    }

    return new ArrayList<>(groups.values());
  }

  private String buildKey(String word) {
    int[] count = new int[26];
    for (int i = 0; i < word.length(); i++) {
      count[word.charAt(i) - 'a']++;
    }

    StringBuilder key = new StringBuilder();
    for (int value : count) {
      key.append('#').append(value);
    }

    return key.toString();
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    group(strs, 0, groups);
    return new ArrayList<>(groups.values());
  }

  private void group(String[] strs, int index, Map<String, List<String>> groups) {
    if (index == strs.length) {
      return;
    }

    String key = buildKey(strs[index]);
    groups.computeIfAbsent(key, ignored -> new ArrayList<>()).add(strs[index]);
    group(strs, index + 1, groups);
  }

  private String buildKey(String word) {
    int[] count = new int[26];
    fillCount(word, 0, count);

    StringBuilder key = new StringBuilder();
    for (int value : count) {
      key.append('#').append(value);
    }

    return key.toString();
  }

  private void fillCount(String word, int index, int[] count) {
    if (index == word.length()) {
      return;
    }

    count[word.charAt(index) - 'a']++;
    fillCount(word, index + 1, count);
  }
}`
      },
      {
        group: "core",
        name: "Longest Common Prefix",
        difficulty: "Easy",
        subpattern: "Shared prefix scan",
        question: "Given an array of strings strs, return the longest common prefix among all strings.",
        trigger: "A common prefix must match every string from index 0 onward.",
        intuition: "Compare characters column by column, or repeatedly shrink a candidate prefix until all strings match it.",
        edgeCases: "Empty array, empty string inside array, no common prefix, one string, and all strings equal.",
        constraints: "Return an empty string when no common prefix exists.",
        source: {
          label: "Longest Common Prefix - LeetCode 14",
          url: "https://leetcode.com/problems/longest-common-prefix/"
        },
        bruteForceComplexity: "Time O(S), Space O(1), where S is total compared characters.",
        optimizedComplexity: "Time O(S), Space O(1).",
        recursiveComplexity: "Time O(S), Space O(log n) call stack for divide and conquer.",
        examples: [
          {
            input: "strs = [\"flower\", \"flow\", \"flight\"]",
            output: "\"fl\"",
            explanation: "\"fl\" is shared by every string."
          }
        ],
        bruteForceCode: `class Solution {
  public String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) {
      return "";
    }

    String first = strs[0];
    StringBuilder prefix = new StringBuilder();

    for (int index = 0; index < first.length(); index++) {
      char current = first.charAt(index);
      for (int i = 1; i < strs.length; i++) {
        if (index == strs[i].length() || strs[i].charAt(index) != current) {
          return prefix.toString();
        }
      }
      prefix.append(current);
    }

    return prefix.toString();
  }
}`,
        iterativeCode: `class Solution {
  public String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) {
      return "";
    }

    String prefix = strs[0];
    for (int i = 1; i < strs.length; i++) {
      while (!strs[i].startsWith(prefix)) {
        prefix = prefix.substring(0, prefix.length() - 1);
        if (prefix.isEmpty()) {
          return "";
        }
      }
    }

    return prefix;
  }
}`,
        recursiveCode: `class Solution {
  public String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) {
      return "";
    }

    return divide(strs, 0, strs.length - 1);
  }

  private String divide(String[] strs, int left, int right) {
    if (left == right) {
      return strs[left];
    }

    int mid = left + (right - left) / 2;
    String first = divide(strs, left, mid);
    String second = divide(strs, mid + 1, right);
    return commonPrefix(first, second);
  }

  private String commonPrefix(String first, String second) {
    int limit = Math.min(first.length(), second.length());
    int index = 0;

    while (index < limit && first.charAt(index) == second.charAt(index)) {
      index++;
    }

    return first.substring(0, index);
  }
}`
      },
      {
        group: "core",
        name: "String Compression",
        difficulty: "Medium",
        subpattern: "In-place run-length encoding",
        question: "Given a character array chars, compress it in-place using run-length encoding and return the new length.",
        trigger: "Consecutive equal characters form groups, and each group writes one character plus optional count digits.",
        intuition: "Read each run, write the character, then write count digits only when the run length is greater than one.",
        edgeCases: "One character, no repeated characters, count with multiple digits, all same characters, and mixed runs.",
        constraints: "Modify chars in-place and return the compressed length.",
        source: {
          label: "String Compression - LeetCode 443",
          url: "https://leetcode.com/problems/string-compression/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "chars = ['a','a','b','b','c','c','c']",
            output: "6, chars prefix = ['a','2','b','2','c','3']",
            explanation: "Each repeated run writes the character and its count."
          }
        ],
        bruteForceCode: `class Solution {
  public int compress(char[] chars) {
    StringBuilder compressed = new StringBuilder();
    int read = 0;

    while (read < chars.length) {
      char current = chars[read];
      int start = read;
      while (read < chars.length && chars[read] == current) {
        read++;
      }

      compressed.append(current);
      int count = read - start;
      if (count > 1) {
        compressed.append(count);
      }
    }

    for (int i = 0; i < compressed.length(); i++) {
      chars[i] = compressed.charAt(i);
    }

    return compressed.length();
  }
}`,
        iterativeCode: `class Solution {
  public int compress(char[] chars) {
    int read = 0;
    int write = 0;

    while (read < chars.length) {
      char current = chars[read];
      int start = read;

      while (read < chars.length && chars[read] == current) {
        read++;
      }

      chars[write++] = current;
      int count = read - start;
      if (count > 1) {
        String digits = String.valueOf(count);
        for (int i = 0; i < digits.length(); i++) {
          chars[write++] = digits.charAt(i);
        }
      }
    }

    return write;
  }
}`,
        recursiveCode: `class Solution {
  public int compress(char[] chars) {
    return compress(chars, 0, 0);
  }

  private int compress(char[] chars, int read, int write) {
    if (read == chars.length) {
      return write;
    }

    char current = chars[read];
    int end = findRunEnd(chars, read, current);
    int count = end - read;

    chars[write++] = current;
    if (count > 1) {
      write = writeDigits(chars, String.valueOf(count), 0, write);
    }

    return compress(chars, end, write);
  }

  private int findRunEnd(char[] chars, int index, char current) {
    if (index == chars.length || chars[index] != current) {
      return index;
    }

    return findRunEnd(chars, index + 1, current);
  }

  private int writeDigits(char[] chars, String digits, int index, int write) {
    if (index == digits.length()) {
      return write;
    }

    chars[write] = digits.charAt(index);
    return writeDigits(chars, digits, index + 1, write + 1);
  }
}`
      },
      {
        group: "core",
        name: "KMP Pattern Matching",
        difficulty: "Medium",
        subpattern: "Prefix-function pattern search",
        question: "Given strings haystack and needle, return the first index where needle appears in haystack. Return -1 if needle is absent.",
        trigger: "After a mismatch, matched prefix information can tell how far the pattern can shift without rechecking text characters.",
        intuition: "Build the lps array for the pattern. During search, use lps to reuse the longest valid prefix after mismatches.",
        edgeCases: "Empty needle, needle longer than haystack, match at index 0, match at the end, repeated pattern characters, and absent pattern.",
        constraints: "Return 0 when needle is empty.",
        source: {
          label: "Find the Index of the First Occurrence in a String - LeetCode 28",
          url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/"
        },
        bruteForceComplexity: "Time O(n * m), Space O(1).",
        optimizedComplexity: "Time O(n + m), Space O(m).",
        recursiveComplexity: "Time O(n + m), Space O(m + n) including call stack.",
        examples: [
          {
            input: "haystack = \"sadbutsad\", needle = \"sad\"",
            output: "0",
            explanation: "\"sad\" first appears at index 0."
          }
        ],
        bruteForceCode: `class Solution {
  public int strStr(String haystack, String needle) {
    if (needle.isEmpty()) {
      return 0;
    }
    if (needle.length() > haystack.length()) {
      return -1;
    }

    for (int start = 0; start <= haystack.length() - needle.length(); start++) {
      int matched = 0;
      while (matched < needle.length()
          && haystack.charAt(start + matched) == needle.charAt(matched)) {
        matched++;
      }
      if (matched == needle.length()) {
        return start;
      }
    }

    return -1;
  }
}`,
        iterativeCode: `class Solution {
  public int strStr(String haystack, String needle) {
    if (needle.isEmpty()) {
      return 0;
    }

    int[] lps = buildLps(needle);
    int text = 0;
    int pattern = 0;

    while (text < haystack.length()) {
      if (haystack.charAt(text) == needle.charAt(pattern)) {
        text++;
        pattern++;
        if (pattern == needle.length()) {
          return text - pattern;
        }
      } else if (pattern > 0) {
        pattern = lps[pattern - 1];
      } else {
        text++;
      }
    }

    return -1;
  }

  private int[] buildLps(String pattern) {
    int[] lps = new int[pattern.length()];
    int length = 0;
    int index = 1;

    while (index < pattern.length()) {
      if (pattern.charAt(index) == pattern.charAt(length)) {
        length++;
        lps[index] = length;
        index++;
      } else if (length > 0) {
        length = lps[length - 1];
      } else {
        lps[index] = 0;
        index++;
      }
    }

    return lps;
  }
}`,
        recursiveCode: `class Solution {
  public int strStr(String haystack, String needle) {
    if (needle.isEmpty()) {
      return 0;
    }

    int[] lps = buildLps(needle);
    return match(haystack, needle, lps, 0, 0);
  }

  private int match(String haystack, String needle, int[] lps, int text, int pattern) {
    if (pattern == needle.length()) {
      return text - pattern;
    }
    if (text == haystack.length()) {
      return -1;
    }

    if (haystack.charAt(text) == needle.charAt(pattern)) {
      return match(haystack, needle, lps, text + 1, pattern + 1);
    }
    if (pattern > 0) {
      return match(haystack, needle, lps, text, lps[pattern - 1]);
    }

    return match(haystack, needle, lps, text + 1, 0);
  }

  private int[] buildLps(String pattern) {
    int[] lps = new int[pattern.length()];
    int length = 0;
    int index = 1;

    while (index < pattern.length()) {
      if (pattern.charAt(index) == pattern.charAt(length)) {
        length++;
        lps[index] = length;
        index++;
      } else if (length > 0) {
        length = lps[length - 1];
      } else {
        lps[index] = 0;
        index++;
      }
    }

    return lps;
  }
}`
      }
    ]
  },
  "linked-list": {
    id: "linked-list",
    name: "Linked List Revision",
    summary: "Pointer rewiring, fast/slow pointers, cycle detection, sorted merge, intersection, k-group reversal, and LRU cache design.",
    checklist: [
      "Decide whether the problem changes node links or only reads values.",
      "Use a dummy node when deleting or building a list near the head.",
      "Use fast and slow pointers for middle, cycle, and nth-from-end problems.",
      "Track node references, not values, for intersection and cycle problems.",
      "For k-group reversal, verify a complete group exists before reversing."
    ],
    mistakes: [
      "Losing the next pointer before rewiring current.next.",
      "Returning the old head after reversing a list.",
      "Comparing node values instead of node references for intersection.",
      "Deleting the wrong node when n equals the list length.",
      "Reversing an incomplete final k-group."
    ],
    edgeCases: [
      "Empty list and one-node list.",
      "Removing or reversing at the head.",
      "Even and odd list lengths.",
      "Cycle starting at the head.",
      "No intersection vs shared tail by reference.",
      "k = 1 and k greater than list length."
    ],
    complexities: [
      "Most linked-list pointer scans are O(n) time.",
      "Fast/slow pointer solutions usually use O(1) extra space.",
      "HashSet-based detection uses O(n) extra space.",
      "Recursive linked-list solutions usually add O(n) call stack.",
      "LRU brute force is O(capacity) per operation; optimized hash map plus doubly linked list is O(1) average."
    ],
    mentalModel: [
      "Always save next before changing current.next.",
      "A dummy node removes special cases around the head.",
      "Two pointers can encode distance, speed, or list-length difference.",
      "Reference equality matters more than value equality in linked-list identity problems.",
      "For cache design, the linked list stores recency and the map stores access."
    ],
    revisionStrategy: [
      "Day 1: Solve Reverse Linked List, Middle Node, Detect Cycle, and Merge Two Sorted Lists.",
      "Day 3: Solve Remove Nth Node From End and Intersection of Two Lists.",
      "Day 7: Redo Reverse in K Group carefully with pointer diagrams.",
      "Day 14: Implement LRU Cache from memory.",
      "Before interviews: Revisit dummy-node deletion, k-group reversal, and LRU cache."
    ],
    problems: [
      {
        group: "core",
        name: "Reverse Linked List",
        difficulty: "Easy",
        subpattern: "Pointer reversal",
        question: "Given the head of a singly linked list, reverse the list and return the new head.",
        trigger: "Every node's next pointer must point to the previous node instead of the next node.",
        intuition: "Keep previous, current, and next. Save next before rewiring current.next to previous.",
        edgeCases: "Empty list, one node, two nodes, and longer lists.",
        constraints: "Return the new head after reversing node links.",
        source: {
          label: "Reverse Linked List - LeetCode 206",
          url: "https://leetcode.com/problems/reverse-linked-list/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "head = [1, 2, 3, 4, 5]",
            output: "[5, 4, 3, 2, 1]",
            explanation: "All next pointers are reversed."
          }
        ],
        bruteForceCode: `import java.util.*;

${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode reverseList(ListNode head) {
    if (head == null) {
      return null;
    }

    List<ListNode> nodes = new ArrayList<>();
    for (ListNode node = head; node != null; node = node.next) {
      nodes.add(node);
    }

    for (int i = nodes.size() - 1; i > 0; i--) {
      nodes.get(i).next = nodes.get(i - 1);
    }
    nodes.get(0).next = null;

    return nodes.get(nodes.size() - 1);
  }
}`,
        iterativeCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode reverseList(ListNode head) {
    ListNode previous = null;
    ListNode current = head;

    while (current != null) {
      ListNode next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    return previous;
  }
}`,
        recursiveCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) {
      return head;
    }

    ListNode newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
  }
}`
      },
      {
        group: "core",
        name: "Middle Node",
        difficulty: "Easy",
        subpattern: "Fast and slow pointer",
        question: "Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second one.",
        trigger: "A fast pointer moving two steps makes the slow pointer land at the middle.",
        intuition: "Counting length works, but slow/fast finds the middle in one pass.",
        edgeCases: "Empty list, one node, two nodes, odd length, and even length.",
        constraints: "For even length, return the second middle node.",
        source: {
          label: "Middle of the Linked List - LeetCode 876",
          url: "https://leetcode.com/problems/middle-of-the-linked-list/"
        },
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "head = [1, 2, 3, 4, 5, 6]",
            output: "4",
            explanation: "The second middle node is value 4."
          }
        ],
        bruteForceCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode middleNode(ListNode head) {
    int length = 0;
    for (ListNode node = head; node != null; node = node.next) {
      length++;
    }

    int steps = length / 2;
    ListNode current = head;
    while (steps > 0) {
      current = current.next;
      steps--;
    }

    return current;
  }
}`,
        iterativeCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode middleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }
}`,
        recursiveCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode middleNode(ListNode head) {
    int length = length(head);
    return nodeAt(head, length / 2);
  }

  private int length(ListNode node) {
    if (node == null) {
      return 0;
    }

    return 1 + length(node.next);
  }

  private ListNode nodeAt(ListNode node, int index) {
    if (index == 0 || node == null) {
      return node;
    }

    return nodeAt(node.next, index - 1);
  }
}`
      },
      {
        group: "core",
        name: "Detect Cycle",
        difficulty: "Easy",
        subpattern: "Floyd cycle detection",
        question: "Given the head of a linked list, return true if the list has a cycle.",
        trigger: "A fast pointer will eventually meet a slow pointer if a cycle exists.",
        intuition: "A set can remember visited nodes. Floyd's algorithm detects repetition with two moving pointers and no extra memory.",
        edgeCases: "Empty list, one node without cycle, one node pointing to itself, cycle at head, and cycle after several nodes.",
        constraints: "Cycle identity is by node reference, not value.",
        source: {
          label: "Linked List Cycle - LeetCode 141",
          url: "https://leetcode.com/problems/linked-list-cycle/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "head = [3, 2, 0, -4], tail connects to node index 1",
            output: "true",
            explanation: "The fast and slow pointers meet inside the cycle."
          }
        ],
        bruteForceCode: `import java.util.*;

${LINKED_LIST_NODE_CODE}

class Solution {
  public boolean hasCycle(ListNode head) {
    Set<ListNode> seen = new HashSet<>();

    for (ListNode node = head; node != null; node = node.next) {
      if (!seen.add(node)) {
        return true;
      }
    }

    return false;
  }
}`,
        iterativeCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) {
        return true;
      }
    }

    return false;
  }
}`,
        recursiveCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public boolean hasCycle(ListNode head) {
    return detect(head, head);
  }

  private boolean detect(ListNode slow, ListNode fast) {
    if (fast == null || fast.next == null) {
      return false;
    }

    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) {
      return true;
    }

    return detect(slow, fast);
  }
}`
      },
      {
        group: "core",
        name: "Merge Two Sorted Lists",
        difficulty: "Easy",
        subpattern: "Sorted linked-list merge",
        question: "Given the heads of two sorted linked lists, merge them into one sorted list and return the head.",
        trigger: "At each step, the smaller head node is the next node of the merged list.",
        intuition: "Repeatedly choose the smaller current node. A dummy node keeps appends simple.",
        edgeCases: "Both lists empty, one list empty, duplicate values, negative values, and unequal lengths.",
        constraints: "Input lists are sorted in non-decreasing order.",
        source: {
          label: "Merge Two Sorted Lists - LeetCode 21",
          url: "https://leetcode.com/problems/merge-two-sorted-lists/"
        },
        bruteForceComplexity: "Time O((m+n) log(m+n)), Space O(m+n).",
        optimizedComplexity: "Time O(m+n), Space O(1).",
        recursiveComplexity: "Time O(m+n), Space O(m+n) call stack.",
        examples: [
          {
            input: "list1 = [1, 2, 4], list2 = [1, 3, 4]",
            output: "[1, 1, 2, 3, 4, 4]",
            explanation: "Nodes are merged in sorted order."
          }
        ],
        bruteForceCode: `import java.util.*;

${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    List<Integer> values = new ArrayList<>();

    for (ListNode node = list1; node != null; node = node.next) {
      values.add(node.val);
    }
    for (ListNode node = list2; node != null; node = node.next) {
      values.add(node.val);
    }

    Collections.sort(values);
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    for (int value : values) {
      tail.next = new ListNode(value);
      tail = tail.next;
    }

    return dummy.next;
  }
}`,
        iterativeCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (list1 != null && list2 != null) {
      if (list1.val <= list2.val) {
        tail.next = list1;
        list1 = list1.next;
      } else {
        tail.next = list2;
        list2 = list2.next;
      }
      tail = tail.next;
    }

    tail.next = list1 != null ? list1 : list2;
    return dummy.next;
  }
}`,
        recursiveCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    if (list1 == null) {
      return list2;
    }
    if (list2 == null) {
      return list1;
    }

    if (list1.val <= list2.val) {
      list1.next = mergeTwoLists(list1.next, list2);
      return list1;
    }

    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}`
      },
      {
        group: "core",
        name: "Remove Nth Node From End",
        difficulty: "Medium",
        subpattern: "Two pointers with fixed gap",
        question: "Given the head of a linked list and an integer n, remove the nth node from the end and return the head.",
        trigger: "A pointer n nodes ahead lets another pointer stop right before the node to delete.",
        intuition: "Counting length works in two passes. The optimized method keeps a fixed gap and deletes in one pass.",
        edgeCases: "Remove head, remove tail, one-node list, n equals length, and n equals 1.",
        constraints: "1 <= n <= list length.",
        source: {
          label: "Remove Nth Node From End of List - LeetCode 19",
          url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
        },
        bruteForceComplexity: "Time O(n), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "head = [1, 2, 3, 4, 5], n = 2",
            output: "[1, 2, 3, 5]",
            explanation: "The second node from the end is value 4."
          }
        ],
        bruteForceCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode removeNthFromEnd(ListNode head, int n) {
    int length = 0;
    for (ListNode node = head; node != null; node = node.next) {
      length++;
    }

    ListNode dummy = new ListNode(0, head);
    ListNode previous = dummy;
    for (int i = 0; i < length - n; i++) {
      previous = previous.next;
    }

    previous.next = previous.next.next;
    return dummy.next;
  }
}`,
        iterativeCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode fast = dummy;
    ListNode slow = dummy;

    for (int i = 0; i < n; i++) {
      fast = fast.next;
    }

    while (fast.next != null) {
      fast = fast.next;
      slow = slow.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
  }
}`,
        recursiveCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    remove(dummy, n);
    return dummy.next;
  }

  private int remove(ListNode node, int n) {
    if (node == null) {
      return 0;
    }

    int indexFromEnd = remove(node.next, n) + 1;
    if (indexFromEnd == n + 1) {
      node.next = node.next.next;
    }

    return indexFromEnd;
  }
}`
      },
      {
        group: "core",
        name: "Intersection of Two Lists",
        difficulty: "Easy",
        subpattern: "Reference alignment",
        question: "Given heads of two singly linked lists, return the node where they intersect. Return null when they do not intersect.",
        trigger: "Intersection is by shared node reference, not equal value.",
        intuition: "A set can store visited nodes. The optimized pointer switch makes both pointers traverse equal total length.",
        edgeCases: "No intersection, intersection at head, one list empty, both lists same head, and same values without shared nodes.",
        constraints: "Do not compare node values to decide intersection.",
        source: {
          label: "Intersection of Two Linked Lists - LeetCode 160",
          url: "https://leetcode.com/problems/intersection-of-two-linked-lists/"
        },
        bruteForceComplexity: "Time O(m+n), Space O(m).",
        optimizedComplexity: "Time O(m+n), Space O(1).",
        recursiveComplexity: "Time O(m+n), Space O(m+n) call stack.",
        examples: [
          {
            input: "A = [4, 1, 8, 4, 5], B = [5, 6, 1, 8, 4, 5], shared node value = 8",
            output: "Node with value 8",
            explanation: "Both lists point to the same node object starting at value 8."
          }
        ],
        bruteForceCode: `import java.util.*;

${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    Set<ListNode> seen = new HashSet<>();

    for (ListNode node = headA; node != null; node = node.next) {
      seen.add(node);
    }
    for (ListNode node = headB; node != null; node = node.next) {
      if (seen.contains(node)) {
        return node;
      }
    }

    return null;
  }
}`,
        iterativeCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    ListNode pointerA = headA;
    ListNode pointerB = headB;

    while (pointerA != pointerB) {
      pointerA = pointerA == null ? headB : pointerA.next;
      pointerB = pointerB == null ? headA : pointerB.next;
    }

    return pointerA;
  }
}`,
        recursiveCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    int lengthA = length(headA);
    int lengthB = length(headB);

    while (lengthA > lengthB) {
      headA = headA.next;
      lengthA--;
    }
    while (lengthB > lengthA) {
      headB = headB.next;
      lengthB--;
    }

    return sameNode(headA, headB);
  }

  private int length(ListNode node) {
    if (node == null) {
      return 0;
    }

    return 1 + length(node.next);
  }

  private ListNode sameNode(ListNode a, ListNode b) {
    if (a == null || b == null) {
      return null;
    }
    if (a == b) {
      return a;
    }

    return sameNode(a.next, b.next);
  }
}`
      },
      {
        group: "core",
        name: "Reverse in K Group",
        difficulty: "Hard",
        subpattern: "Chunked linked-list reversal",
        question: "Given the head of a linked list, reverse nodes in groups of k and return the modified list. Leave the final incomplete group unchanged.",
        trigger: "Only complete k-sized chunks should be reversed, so each group needs a pre-check before pointer reversal.",
        intuition: "Find the kth node, reverse the group, reconnect it, and continue from the next group.",
        edgeCases: "k = 1, k greater than list length, length multiple of k, incomplete final group, and reversing at head.",
        constraints: "Reverse node links, not just node values.",
        source: {
          label: "Reverse Nodes in k-Group - LeetCode 25",
          url: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
        },
        bruteForceComplexity: "Time O(n), Space O(n).",
        optimizedComplexity: "Time O(n), Space O(1).",
        recursiveComplexity: "Time O(n), Space O(n/k) call stack.",
        examples: [
          {
            input: "head = [1, 2, 3, 4, 5], k = 2",
            output: "[2, 1, 4, 3, 5]",
            explanation: "Only complete groups of two are reversed."
          }
        ],
        bruteForceCode: `import java.util.*;

${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode reverseKGroup(ListNode head, int k) {
    if (k <= 1 || head == null) {
      return head;
    }

    List<ListNode> nodes = new ArrayList<>();
    for (ListNode node = head; node != null; node = node.next) {
      nodes.add(node);
    }

    for (int start = 0; start + k <= nodes.size(); start += k) {
      Collections.reverse(nodes.subList(start, start + k));
    }

    for (int i = 0; i < nodes.size() - 1; i++) {
      nodes.get(i).next = nodes.get(i + 1);
    }
    nodes.get(nodes.size() - 1).next = null;

    return nodes.get(0);
  }
}`,
        iterativeCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode reverseKGroup(ListNode head, int k) {
    if (k <= 1 || head == null) {
      return head;
    }

    ListNode dummy = new ListNode(0, head);
    ListNode groupPrevious = dummy;

    while (true) {
      ListNode kth = getKth(groupPrevious, k);
      if (kth == null) {
        break;
      }

      ListNode groupNext = kth.next;
      ListNode previous = groupNext;
      ListNode current = groupPrevious.next;

      while (current != groupNext) {
        ListNode next = current.next;
        current.next = previous;
        previous = current;
        current = next;
      }

      ListNode oldGroupHead = groupPrevious.next;
      groupPrevious.next = kth;
      groupPrevious = oldGroupHead;
    }

    return dummy.next;
  }

  private ListNode getKth(ListNode node, int k) {
    while (node != null && k > 0) {
      node = node.next;
      k--;
    }

    return node;
  }
}`,
        recursiveCode: `${LINKED_LIST_NODE_CODE}

class Solution {
  public ListNode reverseKGroup(ListNode head, int k) {
    ListNode kth = head;
    for (int i = 0; i < k; i++) {
      if (kth == null) {
        return head;
      }
      kth = kth.next;
    }

    ListNode previous = reverseKGroup(kth, k);
    ListNode current = head;

    for (int i = 0; i < k; i++) {
      ListNode next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    return previous;
  }
}`
      },
      {
        group: "core",
        name: "LRU Cache Concept",
        difficulty: "Medium",
        subpattern: "Hash map plus recency list",
        question: "Design an LRU cache with get and put. get returns the value for a key or -1. put inserts or updates a key and evicts the least recently used key when capacity is exceeded.",
        trigger: "The cache needs fast key lookup and fast recency updates.",
        intuition: "A brute force list can scan for keys. The optimized design uses a hash map for lookup and a doubly linked list for recency order.",
        edgeCases: "Capacity one, updating an existing key, getting a missing key, evicting after put, and repeatedly reading the same key.",
        constraints: "Optimized get and put should be O(1) average time.",
        source: {
          label: "LRU Cache - LeetCode 146",
          url: "https://leetcode.com/problems/lru-cache/"
        },
        bruteForceComplexity: "get Time O(capacity), put Time O(capacity), Space O(capacity).",
        optimizedComplexity: "get Time O(1) average, put Time O(1) average, Space O(capacity).",
        recursiveComplexity: "get Time O(capacity), put Time O(capacity), Space O(capacity) plus O(capacity) call stack.",
        examples: [
          {
            input: "LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)",
            output: "1, -1",
            explanation: "get(1) makes key 1 recent, so put(3,3) evicts key 2."
          }
        ],
        bruteForceCode: `import java.util.*;

class LRUCache {
  private final int capacity;
  private final List<int[]> entries;

  public LRUCache(int capacity) {
    this.capacity = capacity;
    this.entries = new ArrayList<>();
  }

  public int get(int key) {
    for (int i = 0; i < entries.size(); i++) {
      if (entries.get(i)[0] == key) {
        int value = entries.get(i)[1];
        int[] entry = entries.remove(i);
        entries.add(entry);
        return value;
      }
    }

    return -1;
  }

  public void put(int key, int value) {
    for (int i = 0; i < entries.size(); i++) {
      if (entries.get(i)[0] == key) {
        entries.remove(i);
        entries.add(new int[] {key, value});
        return;
      }
    }

    if (entries.size() == capacity) {
      entries.remove(0);
    }
    entries.add(new int[] {key, value});
  }
}`,
        iterativeCode: `import java.util.*;

class LRUCache {
  private static class Node {
    int key;
    int value;
    Node previous;
    Node next;

    Node(int key, int value) {
      this.key = key;
      this.value = value;
    }
  }

  private final int capacity;
  private final Map<Integer, Node> nodes;
  private final Node head;
  private final Node tail;

  public LRUCache(int capacity) {
    this.capacity = capacity;
    this.nodes = new HashMap<>();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    head.next = tail;
    tail.previous = head;
  }

  public int get(int key) {
    Node node = nodes.get(key);
    if (node == null) {
      return -1;
    }

    moveToFront(node);
    return node.value;
  }

  public void put(int key, int value) {
    Node node = nodes.get(key);
    if (node != null) {
      node.value = value;
      moveToFront(node);
      return;
    }

    Node created = new Node(key, value);
    nodes.put(key, created);
    addAfterHead(created);

    if (nodes.size() > capacity) {
      Node leastRecent = tail.previous;
      remove(leastRecent);
      nodes.remove(leastRecent.key);
    }
  }

  private void moveToFront(Node node) {
    remove(node);
    addAfterHead(node);
  }

  private void addAfterHead(Node node) {
    node.previous = head;
    node.next = head.next;
    head.next.previous = node;
    head.next = node;
  }

  private void remove(Node node) {
    node.previous.next = node.next;
    node.next.previous = node.previous;
  }
}`,
        recursiveCode: `import java.util.*;

class LRUCache {
  private static class Entry {
    int key;
    int value;

    Entry(int key, int value) {
      this.key = key;
      this.value = value;
    }
  }

  private final int capacity;
  private final List<Entry> entries;

  public LRUCache(int capacity) {
    this.capacity = capacity;
    this.entries = new ArrayList<>();
  }

  public int get(int key) {
    int index = findIndex(key, 0);
    if (index == -1) {
      return -1;
    }

    Entry entry = entries.remove(index);
    entries.add(entry);
    return entry.value;
  }

  public void put(int key, int value) {
    int index = findIndex(key, 0);
    if (index != -1) {
      entries.remove(index);
      entries.add(new Entry(key, value));
      return;
    }

    if (entries.size() == capacity) {
      entries.remove(0);
    }
    entries.add(new Entry(key, value));
  }

  private int findIndex(int key, int index) {
    if (index == entries.size()) {
      return -1;
    }
    if (entries.get(index).key == key) {
      return index;
    }

    return findIndex(key, index + 1);
  }
}`
      }
    ]
  },
  stack: {
    id: "stack",
    name: "Stack Revision",
    summary: "Parentheses matching, auxiliary stacks, monotonic stacks, histogram boundaries, and greedy digit removal.",
    checklist: [
      "Look for last-in-first-out cancellation or matching pairs.",
      "Use a helper stack when the current answer depends on previous unresolved items.",
      "For next greater or next warmer problems, keep a monotonic stack of candidates.",
      "For histogram area, each bar needs the nearest smaller boundary on both sides.",
      "For greedy removals, pop earlier worse choices when a better current digit arrives."
    ],
    mistakes: [
      "Popping before checking whether the stack is empty.",
      "Using strict comparison when equal values must also be removed from the monotonic stack.",
      "Storing values when indexes are needed for distance or width.",
      "Forgetting duplicate minimum values in Min Stack.",
      "Leaving leading zeroes in Remove K Digits."
    ],
    edgeCases: [
      "Empty input string or empty array.",
      "Single element stack or array.",
      "Already increasing and already decreasing sequences.",
      "Duplicate values in monotonic stack problems.",
      "k = 0 and k equal to the number length for digit removal.",
      "All zeroes after removing digits."
    ],
    complexities: [
      "Basic stack matching is usually O(n) time and O(n) space.",
      "Monotonic stack solutions are O(n) because each element is pushed and popped at most once.",
      "Auxiliary stack designs trade O(n) space for O(1) query time.",
      "Brute force boundary scans usually cost O(n^2) time.",
      "Recursive stack solutions usually keep the same work but add call-stack space."
    ],
    mentalModel: [
      "If the newest item can cancel or close an older item, think stack.",
      "If an item waits for a future greater or smaller value, keep it unresolved on the stack.",
      "Store indexes when the answer needs distance, span, or width.",
      "Preserve duplicates when duplicates affect future minimum or boundary answers.",
      "A monotonic stack is a filtered memory of only useful candidates."
    ],
    revisionStrategy: [
      "Day 1: Solve Valid Parentheses, Min Stack, and Next Greater Element.",
      "Day 3: Redo Daily Temperatures and explain why each index is popped once.",
      "Day 7: Redo Largest Rectangle and draw nearest-smaller boundaries.",
      "Day 10: Redo Remove K Digits and test leading-zero cases.",
      "Before interviews: Mix all six and identify whether the stack is matching, auxiliary, monotonic, or greedy."
    ],
    problems: [
      {
        group: "core",
        name: "Valid Parentheses",
        difficulty: "Easy",
        subpattern: "Matching stack",
        question: "Given a string s containing only '(', ')', '{', '}', '[' and ']', return true if every opening bracket is closed by the same type in the correct order.",
        trigger: "The most recent unmatched opening bracket must be closed first.",
        intuition: "Push opening brackets. A closing bracket is valid only when it matches the stack top.",
        edgeCases: "Empty string, odd length, starts with a closing bracket, nested brackets, adjacent pairs, and mismatched pair order.",
        constraints: "0 <= s.length. Characters are bracket symbols only.",
        source: {
          label: "Valid Parentheses - LeetCode 20",
          url: "https://leetcode.com/problems/valid-parentheses/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(n) for repeated string replacements.",
        optimizedComplexity: "Time O(n), Space O(n).",
        recursiveComplexity: "Time O(n), Space O(n) call stack.",
        examples: [
          {
            input: "s = \"()[]{}\"",
            output: "true",
            explanation: "Every opening bracket is closed by the correct later bracket."
          },
          {
            input: "s = \"([)]\"",
            output: "false",
            explanation: "The closing parenthesis appears before the square bracket is closed."
          }
        ],
        bruteForceCode: `class Solution {
  public boolean isValid(String s) {
    if (s == null) {
      return false;
    }

    int previousLength;
    do {
      previousLength = s.length();
      s = s.replace("()", "").replace("[]", "").replace("{}", "");
    } while (s.length() != previousLength);

    return s.isEmpty();
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public boolean isValid(String s) {
    if (s == null) {
      return false;
    }

    Deque<Character> stack = new ArrayDeque<>();

    for (char ch : s.toCharArray()) {
      if (ch == '(' || ch == '[' || ch == '{') {
        stack.push(ch);
      } else {
        if (stack.isEmpty() || !matches(stack.pop(), ch)) {
          return false;
        }
      }
    }

    return stack.isEmpty();
  }

  private boolean matches(char open, char close) {
    return (open == '(' && close == ')')
        || (open == '[' && close == ']')
        || (open == '{' && close == '}');
  }
}`,
        recursiveCode: `class Solution {
  public boolean isValid(String s) {
    if (s == null) {
      return false;
    }

    return parse(s, 0, '\\0') == s.length();
  }

  private int parse(String s, int index, char expectedClose) {
    while (index < s.length()) {
      char ch = s.charAt(index);

      if (isOpen(ch)) {
        index = parse(s, index + 1, matchingClose(ch));
        if (index == -1) {
          return -1;
        }
      } else {
        return ch == expectedClose ? index + 1 : -1;
      }
    }

    return expectedClose == '\\0' ? index : -1;
  }

  private boolean isOpen(char ch) {
    return ch == '(' || ch == '[' || ch == '{';
  }

  private char matchingClose(char ch) {
    if (ch == '(') {
      return ')';
    }
    if (ch == '[') {
      return ']';
    }
    return '}';
  }
}`
      },
      {
        group: "core",
        name: "Min Stack",
        difficulty: "Medium",
        subpattern: "Auxiliary stack design",
        question: "Design a stack that supports push, pop, top, and getMin. The optimized design should return the minimum element in O(1) time.",
        trigger: "A normal stack loses the old minimum when a smaller value is pushed, so minimum history must be stored.",
        intuition: "Maintain the value stack plus a second stack containing the minimum at each minimum-changing point.",
        edgeCases: "Duplicate minimum values, negative values, one element, popping the current minimum, and calling operations after many updates.",
        constraints: "Operations are called only when valid, except constructors. Values may be any int.",
        source: {
          label: "Min Stack - LeetCode 155",
          url: "https://leetcode.com/problems/min-stack/"
        },
        bruteForceComplexity: "push/pop/top Time O(1), getMin Time O(n), Space O(n).",
        optimizedComplexity: "All operations Time O(1), Space O(n).",
        recursiveComplexity: "push/pop/top Time O(1), getMin Time O(n), Space O(n) including call stack.",
        examples: [
          {
            input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
            output: "-3, 0, -2",
            explanation: "The minimum updates when -3 is pushed and restores after it is popped."
          }
        ],
        bruteForceCode: `import java.util.*;

class MinStack {
  private final Deque<Integer> values = new ArrayDeque<>();

  public void push(int val) {
    values.push(val);
  }

  public void pop() {
    values.pop();
  }

  public int top() {
    return values.peek();
  }

  public int getMin() {
    if (values.isEmpty()) {
      throw new NoSuchElementException("stack is empty");
    }

    int min = Integer.MAX_VALUE;
    for (int value : values) {
      min = Math.min(min, value);
    }

    return min;
  }
}`,
        iterativeCode: `import java.util.*;

class MinStack {
  private final Deque<Integer> values = new ArrayDeque<>();
  private final Deque<Integer> minimums = new ArrayDeque<>();

  public void push(int val) {
    values.push(val);
    if (minimums.isEmpty() || val <= minimums.peek()) {
      minimums.push(val);
    }
  }

  public void pop() {
    int removed = values.pop();
    if (removed == minimums.peek()) {
      minimums.pop();
    }
  }

  public int top() {
    return values.peek();
  }

  public int getMin() {
    return minimums.peek();
  }
}`,
        recursiveCode: `import java.util.*;

class MinStack {
  private final Deque<Integer> values = new ArrayDeque<>();

  public void push(int val) {
    values.push(val);
  }

  public void pop() {
    values.pop();
  }

  public int top() {
    return values.peek();
  }

  public int getMin() {
    if (values.isEmpty()) {
      throw new NoSuchElementException("stack is empty");
    }

    return minFromTop();
  }

  private int minFromTop() {
    int value = values.pop();

    if (values.isEmpty()) {
      values.push(value);
      return value;
    }

    int min = Math.min(value, minFromTop());
    values.push(value);
    return min;
  }
}`
      },
      {
        group: "core",
        name: "Next Greater Element",
        difficulty: "Easy",
        subpattern: "Monotonic decreasing stack",
        question: "Given nums1 and nums2 where nums1 is a subset of nums2, return the next greater element in nums2 for each value in nums1, or -1 if none exists.",
        trigger: "Each element needs the first greater value to its right.",
        intuition: "Scan nums2 from right to left and keep only greater candidates in a decreasing stack.",
        edgeCases: "No greater value, last element, increasing array, decreasing array, and nums1 containing one value.",
        constraints: "Values in nums2 are unique. nums1 is a subset of nums2.",
        source: {
          label: "Next Greater Element I - LeetCode 496",
          url: "https://leetcode.com/problems/next-greater-element-i/"
        },
        bruteForceComplexity: "Time O(mn), Space O(1) excluding the answer.",
        optimizedComplexity: "Time O(m+n), Space O(n).",
        recursiveComplexity: "Time O(m+n), Space O(n) plus O(m+n) call stack.",
        examples: [
          {
            input: "nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]",
            output: "[-1, 3, -1]",
            explanation: "4 and 2 have no greater value to the right; 1's next greater value is 3."
          }
        ],
        bruteForceCode: `class Solution {
  public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    int[] answer = new int[nums1.length];

    for (int i = 0; i < nums1.length; i++) {
      int index = 0;
      while (nums2[index] != nums1[i]) {
        index++;
      }

      answer[i] = -1;
      for (int j = index + 1; j < nums2.length; j++) {
        if (nums2[j] > nums1[i]) {
          answer[i] = nums2[j];
          break;
        }
      }
    }

    return answer;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    Map<Integer, Integer> nextGreater = new HashMap<>();
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = nums2.length - 1; i >= 0; i--) {
      while (!stack.isEmpty() && stack.peek() <= nums2[i]) {
        stack.pop();
      }

      nextGreater.put(nums2[i], stack.isEmpty() ? -1 : stack.peek());
      stack.push(nums2[i]);
    }

    int[] answer = new int[nums1.length];
    for (int i = 0; i < nums1.length; i++) {
      answer[i] = nextGreater.get(nums1[i]);
    }

    return answer;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    Map<Integer, Integer> nextGreater = new HashMap<>();
    buildNextGreater(nums2, nums2.length - 1, new ArrayDeque<>(), nextGreater);

    int[] answer = new int[nums1.length];
    fillAnswer(nums1, 0, nextGreater, answer);
    return answer;
  }

  private void buildNextGreater(int[] nums, int index, Deque<Integer> stack, Map<Integer, Integer> nextGreater) {
    if (index < 0) {
      return;
    }

    while (!stack.isEmpty() && stack.peek() <= nums[index]) {
      stack.pop();
    }

    nextGreater.put(nums[index], stack.isEmpty() ? -1 : stack.peek());
    stack.push(nums[index]);
    buildNextGreater(nums, index - 1, stack, nextGreater);
  }

  private void fillAnswer(int[] nums, int index, Map<Integer, Integer> nextGreater, int[] answer) {
    if (index == nums.length) {
      return;
    }

    answer[index] = nextGreater.get(nums[index]);
    fillAnswer(nums, index + 1, nextGreater, answer);
  }
}`
      },
      {
        group: "core",
        name: "Daily Temperatures",
        difficulty: "Medium",
        subpattern: "Monotonic decreasing index stack",
        question: "Given daily temperatures, return an array where answer[i] is the number of days until a warmer temperature. Use 0 when no warmer day exists.",
        trigger: "Each day waits for the next future day with a greater temperature.",
        intuition: "Store indexes of days that still need a warmer future day. Pop colder or equal days that cannot help the current day.",
        edgeCases: "Single day, strictly increasing temperatures, strictly decreasing temperatures, equal temperatures, and no warmer future day.",
        constraints: "1 <= temperatures.length. Temperature values are integers.",
        source: {
          label: "Daily Temperatures - LeetCode 739",
          url: "https://leetcode.com/problems/daily-temperatures/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1) excluding the answer.",
        optimizedComplexity: "Time O(n), Space O(n).",
        recursiveComplexity: "Time O(n), Space O(n) plus O(n) call stack.",
        examples: [
          {
            input: "temperatures = [73, 74, 75, 71, 69, 72, 76, 73]",
            output: "[1, 1, 4, 2, 1, 1, 0, 0]",
            explanation: "Each value is the distance to the next warmer day."
          }
        ],
        bruteForceCode: `class Solution {
  public int[] dailyTemperatures(int[] temperatures) {
    int[] answer = new int[temperatures.length];

    for (int i = 0; i < temperatures.length; i++) {
      for (int j = i + 1; j < temperatures.length; j++) {
        if (temperatures[j] > temperatures[i]) {
          answer[i] = j - i;
          break;
        }
      }
    }

    return answer;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int[] dailyTemperatures(int[] temperatures) {
    int[] answer = new int[temperatures.length];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = temperatures.length - 1; i >= 0; i--) {
      while (!stack.isEmpty() && temperatures[stack.peek()] <= temperatures[i]) {
        stack.pop();
      }

      answer[i] = stack.isEmpty() ? 0 : stack.peek() - i;
      stack.push(i);
    }

    return answer;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int[] dailyTemperatures(int[] temperatures) {
    int[] answer = new int[temperatures.length];
    solve(temperatures, temperatures.length - 1, answer, new ArrayDeque<>());
    return answer;
  }

  private void solve(int[] temperatures, int index, int[] answer, Deque<Integer> stack) {
    if (index < 0) {
      return;
    }

    while (!stack.isEmpty() && temperatures[stack.peek()] <= temperatures[index]) {
      stack.pop();
    }

    answer[index] = stack.isEmpty() ? 0 : stack.peek() - index;
    stack.push(index);
    solve(temperatures, index - 1, answer, stack);
  }
}`
      },
      {
        group: "advanced",
        name: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        subpattern: "Monotonic increasing boundary stack",
        question: "Given an array heights where heights[i] is a histogram bar height, return the area of the largest rectangle in the histogram.",
        trigger: "A bar can form its largest rectangle only between the nearest smaller bars on both sides.",
        intuition: "Keep increasing bar indexes. When a smaller bar arrives, the popped bar's right boundary is known.",
        edgeCases: "Empty array, one bar, all bars equal, strictly increasing heights, strictly decreasing heights, and zero-height bars.",
        constraints: "0 <= heights.length. Heights are non-negative integers.",
        source: {
          label: "Largest Rectangle in Histogram - LeetCode 84",
          url: "https://leetcode.com/problems/largest-rectangle-in-histogram/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(n).",
        recursiveComplexity: "Time O(n^2) worst case, Space O(n) call stack.",
        examples: [
          {
            input: "heights = [2, 1, 5, 6, 2, 3]",
            output: "10",
            explanation: "Bars with heights 5 and 6 form the best rectangle of width 2 and height 5."
          }
        ],
        bruteForceCode: `class Solution {
  public int largestRectangleArea(int[] heights) {
    int best = 0;

    for (int left = 0; left < heights.length; left++) {
      int minHeight = Integer.MAX_VALUE;
      for (int right = left; right < heights.length; right++) {
        minHeight = Math.min(minHeight, heights[right]);
        best = Math.max(best, minHeight * (right - left + 1));
      }
    }

    return best;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int largestRectangleArea(int[] heights) {
    int best = 0;
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i <= heights.length; i++) {
      int currentHeight = i == heights.length ? 0 : heights[i];

      while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
        int height = heights[stack.pop()];
        int leftBoundary = stack.isEmpty() ? -1 : stack.peek();
        int width = i - leftBoundary - 1;
        best = Math.max(best, height * width);
      }

      stack.push(i);
    }

    return best;
  }
}`,
        recursiveCode: `class Solution {
  public int largestRectangleArea(int[] heights) {
    return largest(heights, 0, heights.length - 1);
  }

  private int largest(int[] heights, int left, int right) {
    if (left > right) {
      return 0;
    }

    int minIndex = left;
    for (int i = left + 1; i <= right; i++) {
      if (heights[i] < heights[minIndex]) {
        minIndex = i;
      }
    }

    int usingMin = heights[minIndex] * (right - left + 1);
    int leftBest = largest(heights, left, minIndex - 1);
    int rightBest = largest(heights, minIndex + 1, right);

    return Math.max(usingMin, Math.max(leftBest, rightBest));
  }
}`
      },
      {
        group: "advanced",
        name: "Remove K Digits",
        difficulty: "Medium",
        subpattern: "Greedy monotonic increasing stack",
        question: "Given a non-negative integer string num and an integer k, remove exactly k digits so the remaining number is the smallest possible.",
        trigger: "A larger earlier digit should be removed when a smaller digit appears after it.",
        intuition: "Build an increasing digit stack. Pop previous larger digits while removals remain.",
        edgeCases: "k = 0, k equals num.length, leading zeroes after removal, already increasing digits, decreasing digits, and all zeroes.",
        constraints: "1 <= num.length. num contains digits only. 0 <= k <= num.length.",
        source: {
          label: "Remove K Digits - LeetCode 402",
          url: "https://leetcode.com/problems/remove-k-digits/"
        },
        bruteForceComplexity: "Time O(2^n * n), Space O(n) recursion depth for exhaustive kept-digit choices.",
        optimizedComplexity: "Time O(n), Space O(n).",
        recursiveComplexity: "Time O(kn), Space O(kn) from recursive string copies.",
        examples: [
          {
            input: "num = \"1432219\", k = 3",
            output: "\"1219\"",
            explanation: "Removing 4, 3, and 2 leaves the smallest possible number."
          },
          {
            input: "num = \"10200\", k = 1",
            output: "\"200\"",
            explanation: "Removing 1 leaves leading zeroes, which are stripped."
          }
        ],
        bruteForceCode: `class Solution {
  public String removeKdigits(String num, int k) {
    if (k >= num.length()) {
      return "0";
    }

    int targetLength = num.length() - k;
    String best = choose(num, 0, k, new StringBuilder(), targetLength, null);
    return best == null ? "0" : best;
  }

  private String choose(String num, int index, int remove, StringBuilder kept, int targetLength, String best) {
    if (kept.length() == targetLength) {
      return better(stripLeadingZeroes(kept.toString()), best);
    }
    if (index == num.length()) {
      return best;
    }
    if (kept.length() + num.length() - index < targetLength) {
      return best;
    }

    if (remove > 0) {
      best = choose(num, index + 1, remove - 1, kept, targetLength, best);
    }

    kept.append(num.charAt(index));
    best = choose(num, index + 1, remove, kept, targetLength, best);
    kept.deleteCharAt(kept.length() - 1);

    return best;
  }

  private String better(String candidate, String best) {
    if (best == null) {
      return candidate;
    }
    if (candidate.length() != best.length()) {
      return candidate.length() < best.length() ? candidate : best;
    }
    return candidate.compareTo(best) < 0 ? candidate : best;
  }

  private String stripLeadingZeroes(String value) {
    int index = 0;
    while (index < value.length() && value.charAt(index) == '0') {
      index++;
    }
    return index == value.length() ? "0" : value.substring(index);
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public String removeKdigits(String num, int k) {
    if (k >= num.length()) {
      return "0";
    }

    Deque<Character> digits = new ArrayDeque<>();

    for (char digit : num.toCharArray()) {
      while (k > 0 && !digits.isEmpty() && digits.peekLast() > digit) {
        digits.removeLast();
        k--;
      }
      digits.addLast(digit);
    }

    while (k > 0 && !digits.isEmpty()) {
      digits.removeLast();
      k--;
    }

    StringBuilder result = new StringBuilder();
    boolean leadingZero = true;

    while (!digits.isEmpty()) {
      char digit = digits.removeFirst();
      if (leadingZero && digit == '0') {
        continue;
      }

      leadingZero = false;
      result.append(digit);
    }

    return result.length() == 0 ? "0" : result.toString();
  }
}`,
        recursiveCode: `class Solution {
  public String removeKdigits(String num, int k) {
    if (k >= num.length()) {
      return "0";
    }

    return stripLeadingZeroes(removeOneDrop(num, k));
  }

  private String removeOneDrop(String num, int k) {
    if (k == 0) {
      return num;
    }

    int index = 0;
    while (index + 1 < num.length() && num.charAt(index) <= num.charAt(index + 1)) {
      index++;
    }

    String next = num.substring(0, index) + num.substring(index + 1);
    return removeOneDrop(next, k - 1);
  }

  private String stripLeadingZeroes(String value) {
    int index = 0;
    while (index < value.length() && value.charAt(index) == '0') {
      index++;
    }
    return index == value.length() ? "0" : value.substring(index);
  }
}`
      }
    ]
  },
  "hashmap-hashset": {
    id: "hashmap-hashset",
    name: "HashMap and HashSet Revision",
    summary: "Frequency counting, complement lookup, prefix-sum counting, duplicate elimination, and constant-time membership checks.",
    checklist: [
      "If you repeatedly ask whether a value was seen before, use a HashSet or HashMap.",
      "If a value needs a partner, store the complement or previous values.",
      "If counting subarrays with a target sum, count prefix sums instead of storing all subarrays.",
      "If consecutive values matter but order does not, put values in a HashSet.",
      "If duplicates change the answer, store frequencies instead of only membership."
    ],
    mistakes: [
      "Checking a complement after inserting the current index in Two Sum.",
      "Starting every consecutive sequence instead of only sequence starts.",
      "Forgetting the initial prefix sum 0 for Subarray Sum Equals K.",
      "Using HashSet when duplicate counts are required.",
      "Assuming HashMap preserves sorted order."
    ],
    edgeCases: [
      "Empty input and one-element input.",
      "Negative numbers and zero.",
      "Duplicate values.",
      "All values identical.",
      "No valid answer when the method contract allows it.",
      "Integer boundary values in consecutive-sequence checks."
    ],
    complexities: [
      "HashMap and HashSet lookup, insert, and delete are O(1) average time.",
      "Sorting alternatives are usually O(n log n) time and O(n) or O(1) extra space depending on mutation.",
      "Frequency counting is usually O(n) time and O(k) space for k distinct values.",
      "Prefix-sum counting is O(n) time and O(n) space in the worst case.",
      "Recursive variants usually keep the same logical work but add O(n) call stack."
    ],
    mentalModel: [
      "A HashMap turns repeated searching into direct lookup.",
      "A HashSet is memory of existence, not count.",
      "A frequency map answers how many ways a value has appeared.",
      "Prefix maps convert subarray questions into previous-state lookup.",
      "For sequence problems, only start from values that have no predecessor."
    ],
    revisionStrategy: [
      "Day 1: Solve Frequency Count, Two Sum, and First Non-Repeating Character.",
      "Day 3: Redo Longest Consecutive Sequence and explain why starts are checked.",
      "Day 5: Redo Subarray Sum Equals K with negative numbers.",
      "Day 7: Recode all optimized versions without looking.",
      "Before interviews: Mix these with array and sliding-window problems and identify when hashing is the trigger."
    ],
    problems: [
      {
        group: "core",
        name: "Frequency Count",
        difficulty: "Easy",
        subpattern: "Frequency map",
        question: "Given an integer array nums, return a map where each distinct number maps to its frequency.",
        trigger: "The answer needs counts per distinct value, so membership alone is not enough.",
        intuition: "Each number increments its own bucket. A HashMap creates buckets only for values that appear.",
        edgeCases: "Empty array, one value, all values same, negative values, zero, and large duplicate groups.",
        constraints: "nums may be empty. Values may be any int.",
        bruteForceComplexity: "Time O(n log n), Space O(n) for the copied sorted array and result map.",
        optimizedComplexity: "Time O(n), Space O(k) where k is the number of distinct values.",
        recursiveComplexity: "Time O(n), Space O(k + n) including the call stack.",
        examples: [
          {
            input: "nums = [1, 2, 2, 3, 1, 2]",
            output: "{1=2, 2=3, 3=1}",
            explanation: "1 appears twice, 2 appears three times, and 3 appears once."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public Map<Integer, Integer> frequencyCount(int[] nums) {
    Map<Integer, Integer> counts = new LinkedHashMap<>();
    if (nums == null || nums.length == 0) {
      return counts;
    }

    int[] copy = Arrays.copyOf(nums, nums.length);
    Arrays.sort(copy);

    int current = copy[0];
    int count = 1;

    for (int i = 1; i < copy.length; i++) {
      if (copy[i] == current) {
        count++;
      } else {
        counts.put(current, count);
        current = copy[i];
        count = 1;
      }
    }

    counts.put(current, count);
    return counts;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public Map<Integer, Integer> frequencyCount(int[] nums) {
    Map<Integer, Integer> counts = new HashMap<>();
    if (nums == null) {
      return counts;
    }

    for (int num : nums) {
      counts.put(num, counts.getOrDefault(num, 0) + 1);
    }

    return counts;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public Map<Integer, Integer> frequencyCount(int[] nums) {
    Map<Integer, Integer> counts = new HashMap<>();
    if (nums == null) {
      return counts;
    }

    fill(nums, 0, counts);
    return counts;
  }

  private void fill(int[] nums, int index, Map<Integer, Integer> counts) {
    if (index == nums.length) {
      return;
    }

    counts.put(nums[index], counts.getOrDefault(nums[index], 0) + 1);
    fill(nums, index + 1, counts);
  }
}`
      },
      {
        group: "core",
        name: "Two Sum",
        difficulty: "Easy",
        subpattern: "Complement lookup",
        question: "Given an integer array nums and an integer target, return the indexes of two different elements whose sum equals target.",
        trigger: "For each number, the needed partner is target - current.",
        intuition: "Store previously seen values with their indexes. If the complement is already stored, the pair is complete.",
        edgeCases: "Duplicate values, negative values, zero target, pair at first and last index, and no answer when outside LeetCode constraints.",
        constraints: "Exactly one answer exists in the standard LeetCode version. Do not use the same index twice.",
        source: {
          label: "Two Sum - LeetCode 1",
          url: "https://leetcode.com/problems/two-sum/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1) excluding the answer.",
        optimizedComplexity: "Time O(n), Space O(n).",
        recursiveComplexity: "Time O(n), Space O(n) map plus O(n) call stack.",
        examples: [
          {
            input: "nums = [2, 7, 11, 15], target = 9",
            output: "[0, 1]",
            explanation: "nums[0] + nums[1] equals 9."
          }
        ],
        bruteForceCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
      for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
          return new int[] {i, j};
        }
      }
    }

    throw new IllegalArgumentException("no two sum solution");
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> indexByValue = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (indexByValue.containsKey(complement)) {
        return new int[] {indexByValue.get(complement), i};
      }

      indexByValue.put(nums[i], i);
    }

    throw new IllegalArgumentException("no two sum solution");
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int[] twoSum(int[] nums, int target) {
    return find(nums, target, 0, new HashMap<>());
  }

  private int[] find(int[] nums, int target, int index, Map<Integer, Integer> indexByValue) {
    if (index == nums.length) {
      throw new IllegalArgumentException("no two sum solution");
    }

    int complement = target - nums[index];
    if (indexByValue.containsKey(complement)) {
      return new int[] {indexByValue.get(complement), index};
    }

    indexByValue.put(nums[index], index);
    return find(nums, target, index + 1, indexByValue);
  }
}`
      },
      {
        group: "advanced",
        name: "Longest Consecutive Sequence",
        difficulty: "Medium",
        subpattern: "HashSet sequence starts",
        question: "Given an unsorted integer array nums, return the length of the longest consecutive elements sequence.",
        trigger: "Order does not matter, but O(1) existence checks for value + 1 and value - 1 matter.",
        intuition: "Only start counting from values that have no predecessor. Each sequence is counted once.",
        edgeCases: "Empty array, duplicates, negative values, isolated values, full consecutive range, and Integer.MIN_VALUE or Integer.MAX_VALUE.",
        constraints: "The optimized solution should run in O(n) average time.",
        source: {
          label: "Longest Consecutive Sequence - LeetCode 128",
          url: "https://leetcode.com/problems/longest-consecutive-sequence/"
        },
        bruteForceComplexity: "Time O(n log n), Space O(n) for sorting a copy.",
        optimizedComplexity: "Time O(n) average, Space O(n).",
        recursiveComplexity: "Time O(n) average, Space O(n) set plus O(n) call stack.",
        examples: [
          {
            input: "nums = [100, 4, 200, 1, 3, 2]",
            output: "4",
            explanation: "The longest sequence is [1, 2, 3, 4]."
          }
        ],
        bruteForceCode: `import java.util.*;

class Solution {
  public int longestConsecutive(int[] nums) {
    if (nums.length == 0) {
      return 0;
    }

    int[] copy = Arrays.copyOf(nums, nums.length);
    Arrays.sort(copy);

    int best = 1;
    int current = 1;

    for (int i = 1; i < copy.length; i++) {
      if (copy[i] == copy[i - 1]) {
        continue;
      }

      if (copy[i - 1] != Integer.MAX_VALUE && copy[i] == copy[i - 1] + 1) {
        current++;
      } else {
        current = 1;
      }

      best = Math.max(best, current);
    }

    return best;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int longestConsecutive(int[] nums) {
    Set<Integer> values = new HashSet<>();
    for (int num : nums) {
      values.add(num);
    }

    int best = 0;

    for (int num : values) {
      boolean startsSequence = num == Integer.MIN_VALUE || !values.contains(num - 1);
      if (!startsSequence) {
        continue;
      }

      int length = 1;
      int current = num;

      while (current != Integer.MAX_VALUE && values.contains(current + 1)) {
        current++;
        length++;
      }

      best = Math.max(best, length);
    }

    return best;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int longestConsecutive(int[] nums) {
    Set<Integer> values = new HashSet<>();
    for (int num : nums) {
      values.add(num);
    }

    return scan(nums, 0, values, 0);
  }

  private int scan(int[] nums, int index, Set<Integer> values, int best) {
    if (index == nums.length) {
      return best;
    }

    int num = nums[index];
    boolean startsSequence = num == Integer.MIN_VALUE || !values.contains(num - 1);
    if (startsSequence) {
      best = Math.max(best, streak(values, num));
    }

    return scan(nums, index + 1, values, best);
  }

  private int streak(Set<Integer> values, int value) {
    if (!values.contains(value)) {
      return 0;
    }
    if (value == Integer.MAX_VALUE) {
      return 1;
    }

    return 1 + streak(values, value + 1);
  }
}`
      },
      {
        group: "advanced",
        name: "Subarray Sum Equals K",
        difficulty: "Medium",
        subpattern: "Prefix sum frequency map",
        question: "Given an integer array nums and an integer k, return the number of continuous subarrays whose sum equals k.",
        trigger: "For current prefix sum p, every previous prefix sum p - k forms a valid subarray ending here.",
        intuition: "Count prefix sums seen so far. Add the number of matching previous prefixes before recording the current prefix.",
        edgeCases: "Negative numbers, zero values, k = 0, repeated prefix sums, whole-array match, and overlapping subarrays.",
        constraints: "nums can contain negative numbers, so sliding window is not generally valid.",
        source: {
          label: "Subarray Sum Equals K - LeetCode 560",
          url: "https://leetcode.com/problems/subarray-sum-equals-k/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(n).",
        recursiveComplexity: "Time O(n), Space O(n) map plus O(n) call stack.",
        examples: [
          {
            input: "nums = [1, 1, 1], k = 2",
            output: "2",
            explanation: "The first two and last two elements each form a sum of 2."
          },
          {
            input: "nums = [1, -1, 0], k = 0",
            output: "3",
            explanation: "[1, -1], [0], and [1, -1, 0] each sum to 0."
          }
        ],
        bruteForceCode: `class Solution {
  public int subarraySum(int[] nums, int k) {
    int count = 0;

    for (int start = 0; start < nums.length; start++) {
      int sum = 0;
      for (int end = start; end < nums.length; end++) {
        sum += nums[end];
        if (sum == k) {
          count++;
        }
      }
    }

    return count;
  }
}`,
        iterativeCode: `import java.util.*;

class Solution {
  public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCounts = new HashMap<>();
    prefixCounts.put(0, 1);

    int prefix = 0;
    int count = 0;

    for (int num : nums) {
      prefix += num;
      count += prefixCounts.getOrDefault(prefix - k, 0);
      prefixCounts.put(prefix, prefixCounts.getOrDefault(prefix, 0) + 1);
    }

    return count;
  }
}`,
        recursiveCode: `import java.util.*;

class Solution {
  public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCounts = new HashMap<>();
    prefixCounts.put(0, 1);
    return count(nums, 0, 0, k, prefixCounts);
  }

  private int count(int[] nums, int index, int prefix, int k, Map<Integer, Integer> prefixCounts) {
    if (index == nums.length) {
      return 0;
    }

    int nextPrefix = prefix + nums[index];
    int matches = prefixCounts.getOrDefault(nextPrefix - k, 0);
    prefixCounts.put(nextPrefix, prefixCounts.getOrDefault(nextPrefix, 0) + 1);

    return matches + count(nums, index + 1, nextPrefix, k, prefixCounts);
  }
}`
      },
      {
        group: "core",
        name: "First Non-Repeating Character",
        difficulty: "Easy",
        subpattern: "Character frequency count",
        question: "Given a lowercase English string s, return the index of the first character that appears exactly once. Return -1 if no such character exists.",
        trigger: "The first unique character depends on total frequency and original order.",
        intuition: "Count every character first, then scan from left to right for the first count of one.",
        edgeCases: "Empty string, one character, all characters repeated, first character unique, last character unique, and repeated lowercase letters.",
        constraints: "s contains only lowercase English letters in the standard LeetCode version.",
        source: {
          label: "First Unique Character in a String - LeetCode 387",
          url: "https://leetcode.com/problems/first-unique-character-in-a-string/"
        },
        bruteForceComplexity: "Time O(n^2), Space O(1).",
        optimizedComplexity: "Time O(n), Space O(1) for 26 lowercase counters.",
        recursiveComplexity: "Time O(n), Space O(n) call stack plus O(1) counters.",
        examples: [
          {
            input: "s = \"leetcode\"",
            output: "0",
            explanation: "'l' appears once and is the first unique character."
          },
          {
            input: "s = \"loveleetcode\"",
            output: "2",
            explanation: "'v' is the first character with frequency 1."
          }
        ],
        bruteForceCode: `class Solution {
  public int firstUniqChar(String s) {
    if (s == null) {
      return -1;
    }

    for (int i = 0; i < s.length(); i++) {
      boolean unique = true;
      for (int j = 0; j < s.length(); j++) {
        if (i != j && s.charAt(i) == s.charAt(j)) {
          unique = false;
          break;
        }
      }

      if (unique) {
        return i;
      }
    }

    return -1;
  }
}`,
        iterativeCode: `class Solution {
  public int firstUniqChar(String s) {
    if (s == null) {
      return -1;
    }

    int[] frequency = new int[26];
    for (int i = 0; i < s.length(); i++) {
      frequency[s.charAt(i) - 'a']++;
    }

    for (int i = 0; i < s.length(); i++) {
      if (frequency[s.charAt(i) - 'a'] == 1) {
        return i;
      }
    }

    return -1;
  }
}`,
        recursiveCode: `class Solution {
  public int firstUniqChar(String s) {
    if (s == null) {
      return -1;
    }

    int[] frequency = new int[26];
    count(s, 0, frequency);
    return findFirstUnique(s, 0, frequency);
  }

  private void count(String s, int index, int[] frequency) {
    if (index == s.length()) {
      return;
    }

    frequency[s.charAt(index) - 'a']++;
    count(s, index + 1, frequency);
  }

  private int findFirstUnique(String s, int index, int[] frequency) {
    if (index == s.length()) {
      return -1;
    }
    if (frequency[s.charAt(index) - 'a'] == 1) {
      return index;
    }

    return findFirstUnique(s, index + 1, frequency);
  }
}`
      }
    ]
  }
};
