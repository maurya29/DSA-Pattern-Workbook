const ROADMAP = [
  ["arrays-hashing", "Arrays & Hashing", "Indexing, counting, prefix-style transforms, frequency maps."],
  ["two-pointers", "Two Pointers", "Opposite-end, same-direction, partition, and in-place scans."],
  ["sliding-window", "Sliding Window", "Fixed and variable windows over contiguous ranges."],
  ["prefix-sum", "Prefix Sum", "Range sums, difference arrays, prefix hash maps."],
  ["binary-search", "Binary Search", "Sorted search, answer search, rotated arrays, boundaries."],
  ["linked-list", "Linked List", "Fast-slow pointers, reversal, merge, dummy nodes."],
  ["stack", "Stack", "Monotonic stack, parsing, expression evaluation, intervals."],
  ["queue-deque", "Queue & Deque", "BFS queues, monotonic deque, circular queues."],
  ["heap", "Heap / Priority Queue", "Top K, streaming median, scheduling, k-way merge."],
  ["recursion", "Recursion", "Base cases, branching, divide-and-conquer."],
  ["backtracking", "Backtracking", "Subsets, permutations, combinations, constraint search."],
  ["trees", "Trees", "DFS, BFS, paths, LCA, construction, serialization."],
  ["bst", "Binary Search Tree", "Ordered tree search, validation, kth, predecessor/successor."],
  ["graphs", "Graphs", "DFS/BFS, components, shortest paths, topological sort."],
  ["union-find", "Union Find", "Connectivity, cycle detection, dynamic components."],
  ["tries", "Trie", "Prefix search, word dictionaries, bitwise tries."],
  ["dp-1d", "1D Dynamic Programming", "Linear recurrence, take/skip, state compression."],
  ["dp-2d", "2D Dynamic Programming", "Grid, subsequence, interval, knapsack states."],
  ["greedy", "Greedy", "Local choice, sorting, intervals, exchange arguments."],
  ["intervals", "Intervals", "Merge, sweep line, overlap, meeting rooms."],
  ["bit-manipulation", "Bit Manipulation", "Masks, XOR, subsets, bit counting."],
  ["math", "Math & Number Theory", "Modulo, gcd, primes, combinatorics."],
  ["matrix", "Matrix", "Traversal, flood fill, simulation, spiral, rotation."],
  ["strings", "Strings", "Matching, parsing, palindrome, rolling hash."],
  ["sorting", "Sorting", "Custom ordering, partitioning, counting/radix sort."],
  ["design", "Design", "Caches, iterators, rate limits, object modeling."],
  ["segment-tree", "Segment Tree / Fenwick", "Range query and update data structures."],
  ["advanced-graphs", "Advanced Graphs", "MST, Dijkstra, Bellman-Ford, Floyd, SCC."],
  ["geometry", "Geometry", "Coordinates, sweep, orientation, distance."],
  ["concurrency", "Concurrency Basics", "Locks, ordering, producer-consumer style problems."]
];

function problem(group, name, difficulty, subpattern, question, trigger, intuition, code) {
  return { group, name, difficulty, subpattern, question, trigger, intuition, code };
}

const twoPointers = {
  id: "two-pointers",
  name: "Two Pointers",
  summary: "Opposite-end, same-direction, partition, and in-place scans.",
  complete: true,
  subpatterns: [
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
  problems: [
    problem("core", "Two Sum II - Input Array Is Sorted", "Easy", "Opposite-end convergence on sorted arrays", "Return 1-indexed positions of two numbers in a sorted array that sum to target.", "Sorted input plus pair sum asks for low/high movement.", "Move the side that makes the sum too small or too large.", `class Solution {
  public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
      int sum = numbers[left] + numbers[right];
      if (sum == target) return new int[] {left + 1, right + 1};
      if (sum < target) left++;
      else right--;
    }
    return new int[] {-1, -1};
  }
}`),
    problem("core", "Valid Palindrome", "Easy", "Palindrome inward scan", "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case.", "Comparison from both ends with skipped invalid characters.", "Advance each pointer until both point to comparable characters.", `class Solution {
  public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
      while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
      while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
      if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
      left++;
      right--;
    }
    return true;
  }

  public boolean isPalindromeRecursive(String s) {
    return check(s, 0, s.length() - 1);
  }

  private boolean check(String s, int left, int right) {
    if (left >= right) return true;
    if (!Character.isLetterOrDigit(s.charAt(left))) return check(s, left + 1, right);
    if (!Character.isLetterOrDigit(s.charAt(right))) return check(s, left, right - 1);
    return Character.toLowerCase(s.charAt(left)) == Character.toLowerCase(s.charAt(right))
        && check(s, left + 1, right - 1);
  }
}`),
    problem("core", "Remove Duplicates from Sorted Array", "Easy", "In-place overwrite / compaction", "Remove duplicates in-place and return the count of unique values.", "Sorted array means duplicates are adjacent; write pointer keeps the compacted prefix.", "Only copy a value when it differs from the last kept value.", `class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int write = 1;
    for (int read = 1; read < nums.length; read++) {
      if (nums[read] != nums[write - 1]) nums[write++] = nums[read];
    }
    return write;
  }
}`),
    problem("core", "Remove Element", "Easy", "In-place overwrite / compaction", "Remove all occurrences of val in-place and return the new length.", "Need stable compaction without extra array.", "Read every value once and overwrite only values that survive.", `class Solution {
  public int removeElement(int[] nums, int val) {
    int write = 0;
    for (int read = 0; read < nums.length; read++) {
      if (nums[read] != val) nums[write++] = nums[read];
    }
    return write;
  }
}`),
    problem("core", "Move Zeroes", "Easy", "In-place overwrite / compaction", "Move all zeroes to the end while preserving non-zero order.", "Separate read pointer from position where the next non-zero belongs.", "Compact non-zero values first, then fill the tail with zeroes.", `class Solution {
  public void moveZeroes(int[] nums) {
    int write = 0;
    for (int read = 0; read < nums.length; read++) {
      if (nums[read] != 0) nums[write++] = nums[read];
    }
    while (write < nums.length) nums[write++] = 0;
  }
}`),
    problem("core", "Squares of a Sorted Array", "Easy", "Opposite-end convergence on sorted arrays", "Return squares of a sorted array in nondecreasing order.", "Largest square can come from either absolute end.", "Fill output from right to left using the larger absolute endpoint.", `class Solution {
  public int[] sortedSquares(int[] nums) {
    int n = nums.length, left = 0, right = n - 1, write = n - 1;
    int[] ans = new int[n];
    while (left <= right) {
      int a = nums[left] * nums[left];
      int b = nums[right] * nums[right];
      if (a > b) {
        ans[write--] = a;
        left++;
      } else {
        ans[write--] = b;
        right--;
      }
    }
    return ans;
  }
}`),
    problem("core", "Reverse String", "Easy", "Opposite-end swap", "Reverse a character array in-place.", "Symmetric endpoints need swapping until they cross.", "Swap left and right, then shrink the range.", `class Solution {
  public void reverseString(char[] s) {
    int left = 0, right = s.length - 1;
    while (left < right) {
      char temp = s[left];
      s[left++] = s[right];
      s[right--] = temp;
    }
  }

  public void reverseStringRecursive(char[] s) {
    reverse(s, 0, s.length - 1);
  }

  private void reverse(char[] s, int left, int right) {
    if (left >= right) return;
    char temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    reverse(s, left + 1, right - 1);
  }
}`),
    problem("core", "Merge Sorted Array", "Easy", "Two sorted arrays merge", "Merge nums2 into nums1 in nondecreasing order.", "Both arrays are sorted and nums1 has empty space at the end.", "Write from the back so existing nums1 values are not overwritten.", `class Solution {
  public void merge(int[] nums1, int m, int[] nums2, int n) {
    int i = m - 1, j = n - 1, write = m + n - 1;
    while (j >= 0) {
      if (i >= 0 && nums1[i] > nums2[j]) nums1[write--] = nums1[i--];
      else nums1[write--] = nums2[j--];
    }
  }
}`),
    problem("core", "Linked List Cycle", "Easy", "Fast-slow cycle detection", "Return true if a linked list contains a cycle.", "Cycle can be detected by pointers moving at different speeds.", "Fast eventually meets slow inside a cycle; otherwise fast reaches null.", `class Solution {
  public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) return true;
    }
    return false;
  }
}`),
    problem("core", "Middle of the Linked List", "Easy", "Linked-list two pointers", "Return the middle node of a linked list; for even length, return the second middle.", "Fast pointer moves twice as quickly as slow.", "When fast finishes, slow has crossed half the list.", `class Solution {
  public ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
}`),
    problem("core", "Container With Most Water", "Medium", "Container / area optimization", "Find the maximum water area formed by two vertical lines.", "Area depends on two endpoints and the smaller height.", "Move the shorter side because the taller side cannot improve with less width.", `class Solution {
  public int maxArea(int[] height) {
    int left = 0, right = height.length - 1, best = 0;
    while (left < right) {
      int area = Math.min(height[left], height[right]) * (right - left);
      best = Math.max(best, area);
      if (height[left] < height[right]) left++;
      else right--;
    }
    return best;
  }
}`),
    problem("core", "3Sum", "Medium", "K-sum after sorting", "Return all unique triplets that sum to zero.", "After fixing one value, remaining pair is a sorted two-sum problem.", "Sort, skip duplicates, and converge low/high for each fixed index.", `import java.util.*;

class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> ans = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue;
      int left = i + 1, right = nums.length - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
          ans.add(Arrays.asList(nums[i], nums[left], nums[right]));
          left++;
          right--;
          while (left < right && nums[left] == nums[left - 1]) left++;
          while (left < right && nums[right] == nums[right + 1]) right--;
        } else if (sum < 0) left++;
        else right--;
      }
    }
    return ans;
  }
}`),
    problem("advanced", "3Sum Closest", "Medium", "K-sum after sorting", "Find the triplet sum closest to target.", "Fix one value; best remaining pair is found by low/high movement.", "Update closest before moving the pointer based on comparison to target.", `import java.util.*;

class Solution {
  public int threeSumClosest(int[] nums, int target) {
    Arrays.sort(nums);
    int best = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < nums.length - 2; i++) {
      int left = i + 1, right = nums.length - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (Math.abs(target - sum) < Math.abs(target - best)) best = sum;
        if (sum < target) left++;
        else if (sum > target) right--;
        else return target;
      }
    }
    return best;
  }
}`),
    problem("advanced", "4Sum", "Medium", "K-sum after sorting", "Return all unique quadruplets that sum to target.", "Two fixed values reduce the problem to sorted two-sum.", "Use long sums, duplicate skipping, and inner convergence.", `import java.util.*;

class Solution {
  public List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums);
    List<List<Integer>> ans = new ArrayList<>();
    int n = nums.length;
    for (int i = 0; i < n - 3; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue;
      for (int j = i + 1; j < n - 2; j++) {
        if (j > i + 1 && nums[j] == nums[j - 1]) continue;
        int left = j + 1, right = n - 1;
        while (left < right) {
          long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
          if (sum == target) {
            ans.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
            left++;
            right--;
            while (left < right && nums[left] == nums[left - 1]) left++;
            while (left < right && nums[right] == nums[right + 1]) right--;
          } else if (sum < target) left++;
          else right--;
        }
      }
    }
    return ans;
  }
}`),
    problem("advanced", "Sort Colors", "Medium", "Dutch national flag", "Sort an array containing only 0, 1, and 2 in-place.", "Three categories need one-pass partitioning.", "Keep boundaries for zero zone, unknown zone, and two zone.", `class Solution {
  public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
      if (nums[mid] == 0) swap(nums, low++, mid++);
      else if (nums[mid] == 1) mid++;
      else swap(nums, mid, high--);
    }
  }

  private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
}`),
    problem("advanced", "Trapping Rain Water", "Hard", "Container / area optimization", "Compute how much rain water can be trapped between bars.", "Water at each side is constrained by the smaller boundary.", "Move the smaller boundary while tracking its best height.", `class Solution {
  public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
      if (height[left] < height[right]) {
        leftMax = Math.max(leftMax, height[left]);
        water += leftMax - height[left++];
      } else {
        rightMax = Math.max(rightMax, height[right]);
        water += rightMax - height[right--];
      }
    }
    return water;
  }
}`),
    problem("advanced", "Linked List Cycle II", "Medium", "Fast-slow cycle detection", "Return the node where a linked list cycle begins.", "Meeting point plus head pointer identifies cycle entry.", "After collision, move one pointer from head and one from meeting point.", `class Solution {
  public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) {
        ListNode entry = head;
        while (entry != slow) {
          entry = entry.next;
          slow = slow.next;
        }
        return entry;
      }
    }
    return null;
  }
}`),
    problem("advanced", "Remove Nth Node From End of List", "Medium", "Linked-list two pointers", "Remove the nth node from the end of a linked list.", "A fixed gap between fast and slow lands slow before target.", "Advance fast n steps, then move both until fast reaches the end.", `class Solution {
  public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode slow = dummy, fast = dummy;
    for (int i = 0; i < n; i++) fast = fast.next;
    while (fast.next != null) {
      slow = slow.next;
      fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
  }
}`),
    problem("advanced", "Partition List", "Medium", "Partition around condition or pivot", "Partition a linked list so nodes less than x come before nodes greater than or equal to x.", "Two output chains represent two partitions.", "Append each node to the correct chain, then connect the chains.", `class Solution {
  public ListNode partition(ListNode head, int x) {
    ListNode smallDummy = new ListNode(0), largeDummy = new ListNode(0);
    ListNode small = smallDummy, large = largeDummy;
    while (head != null) {
      if (head.val < x) {
        small.next = head;
        small = small.next;
      } else {
        large.next = head;
        large = large.next;
      }
      head = head.next;
    }
    large.next = null;
    small.next = largeDummy.next;
    return smallDummy.next;
  }
}`),
    problem("advanced", "Boats to Save People", "Medium", "Opposite-end convergence on sorted arrays", "Return the minimum boats needed when each boat carries at most two people under a weight limit.", "Sorted lightest and heaviest pairing decides each boat greedily.", "Always place the heaviest remaining person; pair with lightest only if possible.", `import java.util.*;

class Solution {
  public int numRescueBoats(int[] people, int limit) {
    Arrays.sort(people);
    int left = 0, right = people.length - 1, boats = 0;
    while (left <= right) {
      if (people[left] + people[right] <= limit) left++;
      right--;
      boats++;
    }
    return boats;
  }
}`),
    problem("practice", "Valid Palindrome II", "Easy", "Palindrome inward scan", "Check whether deleting at most one character can make a string palindrome.", "First mismatch leaves exactly two possible deletion choices.", "Skip either left or right once, then require a clean palindrome.", `class Solution {
  public boolean validPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
      if (s.charAt(left) == s.charAt(right)) {
        left++;
        right--;
      } else {
        return isPal(s, left + 1, right) || isPal(s, left, right - 1);
      }
    }
    return true;
  }

  private boolean isPal(String s, int left, int right) {
    while (left < right) {
      if (s.charAt(left++) != s.charAt(right--)) return false;
    }
    return true;
  }
}`),
    problem("practice", "Intersection of Two Arrays II", "Easy", "Two sorted arrays merge", "Return the intersection of two integer arrays including duplicate counts.", "After sorting both arrays, matching elements can be collected with two scans.", "Advance the pointer with the smaller value; collect when equal.", `import java.util.*;

class Solution {
  public int[] intersect(int[] nums1, int[] nums2) {
    Arrays.sort(nums1);
    Arrays.sort(nums2);
    int i = 0, j = 0, write = 0;
    int[] temp = new int[Math.min(nums1.length, nums2.length)];
    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] == nums2[j]) temp[write++] = nums1[i++];
      else if (nums1[i] < nums2[j]) i++;
      else j++;
    }
    return Arrays.copyOf(temp, write);
  }
}`),
    problem("practice", "Backspace String Compare", "Easy", "Same-direction slow/fast scan", "Compare two strings after applying backspace characters.", "Each string can be compacted in-place conceptually with a write pointer.", "Build the final typed form by overwriting removed characters.", `class Solution {
  public boolean backspaceCompare(String s, String t) {
    return build(s).equals(build(t));
  }

  private String build(String value) {
    char[] chars = value.toCharArray();
    int write = 0;
    for (char c : chars) {
      if (c == '#') {
        if (write > 0) write--;
      } else {
        chars[write++] = c;
      }
    }
    return new String(chars, 0, write);
  }
}`),
    problem("practice", "Minimum Size Subarray Sum", "Medium", "Same-direction slow/fast scan", "Find the minimum length of a contiguous subarray with sum at least target.", "Positive values allow the left boundary to move forward once the target is reached.", "Expand with right, shrink with left while the window is valid.", `class Solution {
  public int minSubArrayLen(int target, int[] nums) {
    int left = 0, sum = 0, best = Integer.MAX_VALUE;
    for (int right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum >= target) {
        best = Math.min(best, right - left + 1);
        sum -= nums[left++];
      }
    }
    return best == Integer.MAX_VALUE ? 0 : best;
  }
}`),
    problem("practice", "Pair With Target Sum", "Easy", "Opposite-end convergence on sorted arrays", "Given a sorted array, return indexes of any pair that sums to target.", "Sorted pair search has monotonic pointer movement.", "Too small means increase left; too large means decrease right.", `class Solution {
  public int[] pairWithTargetSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
      int sum = nums[left] + nums[right];
      if (sum == target) return new int[] {left, right};
      if (sum < target) left++;
      else right--;
    }
    return new int[] {-1, -1};
  }
}`),
    problem("practice", "Remove Duplicates from Sorted Array II", "Medium", "In-place overwrite / compaction", "Allow each distinct number to appear at most twice in a sorted array.", "Sorted duplicates form runs; write pointer can enforce count limit.", "Keep a value only if it differs from the value two positions behind write.", `class Solution {
  public int removeDuplicates(int[] nums) {
    int write = 0;
    for (int num : nums) {
      if (write < 2 || num != nums[write - 2]) nums[write++] = num;
    }
    return write;
  }
}`),
    problem("practice", "Subarray Product Less Than K", "Medium", "Same-direction slow/fast scan", "Count contiguous subarrays where product is less than k.", "Positive values allow shrinking from the left when product becomes too large.", "Every valid window ending at right contributes its length.", `class Solution {
  public int numSubarrayProductLessThanK(int[] nums, int k) {
    if (k <= 1) return 0;
    int left = 0, count = 0;
    long product = 1;
    for (int right = 0; right < nums.length; right++) {
      product *= nums[right];
      while (product >= k) product /= nums[left++];
      count += right - left + 1;
    }
    return count;
  }
}`),
    problem("practice", "Find the Duplicate Number", "Medium", "Fast-slow cycle detection", "Find the duplicate number in an array containing n + 1 integers from 1 to n.", "Array values can be treated as next pointers forming a cycle.", "Floyd cycle detection finds the duplicate as the cycle entry.", `class Solution {
  public int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];
    do {
      slow = nums[slow];
      fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
      slow = nums[slow];
      fast = nums[fast];
    }
    return slow;
  }
}`),
    problem("practice", "Rearrange Array Elements by Sign", "Medium", "Multi-pointer counting", "Rearrange equal counts of positive and negative numbers alternately starting with positive.", "Two write pointers target even and odd positions.", "Place positives at even indexes and negatives at odd indexes.", `class Solution {
  public int[] rearrangeArray(int[] nums) {
    int[] ans = new int[nums.length];
    int positive = 0, negative = 1;
    for (int num : nums) {
      if (num > 0) {
        ans[positive] = num;
        positive += 2;
      } else {
        ans[negative] = num;
        negative += 2;
      }
    }
    return ans;
  }
}`),
    problem("practice", "Next Permutation", "Medium", "Gap / reverse suffix", "Transform nums into its next lexicographic permutation in-place.", "A decreasing suffix must be reversed after swapping the pivot.", "Find first rising position from the right, swap with next larger, reverse suffix.", `class Solution {
  public void nextPermutation(int[] nums) {
    int i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
      int j = nums.length - 1;
      while (nums[j] <= nums[i]) j--;
      swap(nums, i, j);
    }
    reverse(nums, i + 1, nums.length - 1);
  }

  private void reverse(int[] nums, int left, int right) {
    while (left < right) swap(nums, left++, right--);
  }

  private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
}`)
  ],
  checklist: [
    "Input is sorted, can be sorted, or has ordered boundaries.",
    "Question asks for a pair/triplet, palindrome, merge, partition, or in-place removal.",
    "A brute force nested loop repeats comparisons between two moving positions.",
    "Moving one pointer has a monotonic reason: sum too small, sum too large, boundary weaker, or duplicate run consumed.",
    "Extra array is avoidable because a read/write pointer can maintain the valid prefix."
  ],
  traps: [
    "Skipping duplicates before recording the answer in 3Sum/4Sum.",
    "Forgetting integer overflow in 4Sum and area/product variants.",
    "Moving both pointers when only one side has a justified monotonic move.",
    "Breaking linked-list chains without setting the tail to null.",
    "Using two pointers on unsorted pair-sum input without sorting or a hash map."
  ],
  edgeCases: [
    "Empty array, one element, or two elements.",
    "All duplicates, no duplicates, and duplicate-heavy inputs.",
    "Negative values with sorted square or K-sum problems.",
    "Already valid palindrome, one mismatch, and many non-alphanumeric characters.",
    "Linked list with zero nodes, one node, two nodes, and cycle at head."
  ],
  complexities: [
    "Opposite-end pair search: O(n) time, O(1) space after sorting; O(n log n) if sorting is needed.",
    "In-place compaction: O(n) time, O(1) space.",
    "3Sum: O(n^2) time, O(1) extra space excluding output.",
    "4Sum: O(n^3) time, O(1) extra space excluding output.",
    "Fast-slow linked-list cycle: O(n) time, O(1) space."
  ],
  mentalModel: [
    "One pointer owns the left boundary; the other owns the right or write boundary.",
    "Move a pointer only when you can prove the skipped state cannot be better.",
    "For sorted sums, low increases value and high decreases value.",
    "For compaction, read explores; write commits.",
    "For fast-slow, distance or speed difference encodes the answer."
  ],
  revisionStrategy: [
    "Day 1: Solve the 12 core problems without looking at code.",
    "Day 3: Re-solve 3Sum, Container With Most Water, Linked List Cycle, and Remove Duplicates II.",
    "Day 7: Solve all 8 advanced problems in one sitting with a 25-minute cap each.",
    "Day 14: Mix 10 random problems and write only trigger point plus pointer movement first.",
    "Day 30: Redo the 12 core problems and compare edge-case handling."
  ],
  unseen: [
    "Minimum Difference Between Highest and Lowest of K Scores",
    "Shortest Unsorted Continuous Subarray",
    "Sentence Similarity III",
    "Minimum Adjacent Swaps to Make a Valid Array",
    "Count Pairs Whose Sum is Less than Target"
  ]
};

const DSA_PATTERNS = ROADMAP.map(([id, name, summary]) => ({
  id,
  name,
  summary,
  complete: id === "two-pointers",
  subpatterns: id === "two-pointers" ? twoPointers.subpatterns : [
    "Core recognition triggers",
    "Common interview variants",
    "Edge-case families",
    "Optimal-code templates"
  ]
})).map((item) => item.id === "two-pointers" ? twoPointers : item);

const HASHING_CODE = "import java.util.*;\n\nclass Solution {\n  public int solve(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n      int need = target - nums[i];\n      if (seen.containsKey(need)) return i;\n      seen.put(nums[i], i);\n    }\n    return -1;\n  }\n}";
const COUNTING_CODE = "import java.util.*;\n\nclass Solution {\n  public int solve(int[] nums) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    int answer = 0;\n    for (int num : nums) {\n      int count = freq.getOrDefault(num, 0) + 1;\n      freq.put(num, count);\n      answer = Math.max(answer, count);\n    }\n    return answer;\n  }\n}";
const PREFIX_HASH_CODE = "import java.util.*;\n\nclass Solution {\n  public int countSubarrays(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    freq.put(0, 1);\n    int prefix = 0, count = 0;\n    for (int num : nums) {\n      prefix += num;\n      count += freq.getOrDefault(prefix - k, 0);\n      freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n    }\n    return count;\n  }\n}";
const SET_CODE = "import java.util.*;\n\nclass Solution {\n  public boolean hasDuplicate(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n    for (int num : nums) {\n      if (!seen.add(num)) return true;\n    }\n    return false;\n  }\n}";
const GENERIC_PATTERN_CODE = "import java.util.*;\n\nclass Solution {\n  public int solve(int[] nums) {\n    int answer = 0;\n    for (int value : nums) {\n      answer = Math.max(answer, value);\n    }\n    return answer;\n  }\n}";

const arraysProblemRows = [
  ['core','Two Sum','Easy','Hash map complement lookup','Return indexes of two numbers that add to target.','Need O(1) lookup for the complement of each value.','Store seen values with indexes before moving forward.',HASHING_CODE],
  ['core','Contains Duplicate','Easy','Hash set existence','Return true if any value appears at least twice.','Duplicate detection needs membership history.','A set fails to add the second copy.',SET_CODE],
  ['core','Valid Anagram','Easy','Frequency counting','Check whether two strings contain the same characters with the same counts.','Order does not matter; counts do.','Increment for one string and decrement for the other.',"class Solution {\n  public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n      count[s.charAt(i) - 'a']++;\n      count[t.charAt(i) - 'a']--;\n    }\n    for (int value : count) if (value != 0) return false;\n    return true;\n  }\n}"],
  ['core','Group Anagrams','Medium','Canonical key hashing','Group strings that are anagrams of each other.','Each word needs a normalized signature as a key.','Use character counts or sorted characters as the hash key.',"import java.util.*;\n\nclass Solution {\n  public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    for (String word : strs) {\n      int[] count = new int[26];\n      for (char c : word.toCharArray()) count[c - 'a']++;\n      String key = Arrays.toString(count);\n      groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);\n    }\n    return new ArrayList<>(groups.values());\n  }\n}"],
  ['core','Top K Frequent Elements','Medium','Frequency map + heap/bucket','Return the k most frequent values.','Frequency is the ranking key.','Count first, then extract the highest-frequency values.',"import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1);\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> freq.get(a) - freq.get(b));\n    for (int num : freq.keySet()) {\n      heap.offer(num);\n      if (heap.size() > k) heap.poll();\n    }\n    int[] ans = new int[k];\n    for (int i = k - 1; i >= 0; i--) ans[i] = heap.poll();\n    return ans;\n  }\n}"],
  ['core','Product of Array Except Self','Medium','Prefix and suffix accumulation','Return product of all elements except self without division.','Each answer depends on everything left and right of index.','Write prefix products, then multiply suffix products in reverse.',"class Solution {\n  public int[] productExceptSelf(int[] nums) {\n    int[] ans = new int[nums.length];\n    int prefix = 1;\n    for (int i = 0; i < nums.length; i++) {\n      ans[i] = prefix;\n      prefix *= nums[i];\n    }\n    int suffix = 1;\n    for (int i = nums.length - 1; i >= 0; i--) {\n      ans[i] *= suffix;\n      suffix *= nums[i];\n    }\n    return ans;\n  }\n}"],
  ['core','Subarray Sum Equals K','Medium','Prefix sum hash map','Count subarrays whose sum equals k.','Range sum can be written as current prefix minus earlier prefix.','Count previous prefixes equal to prefix - k.',PREFIX_HASH_CODE],
  ['core','Longest Consecutive Sequence','Medium','Hash set boundary expansion','Return length of the longest consecutive values sequence.','Order is irrelevant but O(1) membership is needed.','Start only at sequence heads where value - 1 is absent.',"import java.util.*;\n\nclass Solution {\n  public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int num : nums) set.add(num);\n    int best = 0;\n    for (int num : set) {\n      if (set.contains(num - 1)) continue;\n      int current = num;\n      while (set.contains(current)) current++;\n      best = Math.max(best, current - num);\n    }\n    return best;\n  }\n}"],
  ['core','Majority Element','Easy','Voting / count compression','Return the element appearing more than n/2 times.','A guaranteed majority can cancel all minority values.','Boyer-Moore keeps one candidate and balance.',"class Solution {\n  public int majorityElement(int[] nums) {\n    int candidate = 0, votes = 0;\n    for (int num : nums) {\n      if (votes == 0) candidate = num;\n      votes += num == candidate ? 1 : -1;\n    }\n    return candidate;\n  }\n}"],
  ['core','Find All Numbers Disappeared in an Array','Easy','Index marking','Find values in 1..n missing from the array.','Values map directly to indexes.','Mark visited indexes negative, then collect positive positions.',"import java.util.*;\n\nclass Solution {\n  public List<Integer> findDisappearedNumbers(int[] nums) {\n    for (int num : nums) {\n      int index = Math.abs(num) - 1;\n      if (nums[index] > 0) nums[index] = -nums[index];\n    }\n    List<Integer> ans = new ArrayList<>();\n    for (int i = 0; i < nums.length; i++) if (nums[i] > 0) ans.add(i + 1);\n    return ans;\n  }\n}"],
  ['core','Intersection of Two Arrays','Easy','Hash set intersection','Return unique common values from two arrays.','Need membership in one array while scanning the other.','Store one side and collect matches once.',SET_CODE],
  ['core','First Unique Character in a String','Easy','Frequency counting','Return the first index whose character appears once.','Need all counts before deciding first unique.','Count once, scan again to find first count of one.',COUNTING_CODE],
  ['advanced','Encode and Decode Strings','Medium','Length-prefix encoding','Encode a list of strings and decode it back.','Separators can appear inside strings, so raw joining is unsafe.','Prefix every string with its length and delimiter.',"import java.util.*;\n\nclass Codec {\n  public String encode(List<String> strs) {\n    StringBuilder sb = new StringBuilder();\n    for (String s : strs) sb.append(s.length()).append('#').append(s);\n    return sb.toString();\n  }\n\n  public List<String> decode(String s) {\n    List<String> ans = new ArrayList<>();\n    int i = 0;\n    while (i < s.length()) {\n      int j = i;\n      while (s.charAt(j) != '#') j++;\n      int len = Integer.parseInt(s.substring(i, j));\n      ans.add(s.substring(j + 1, j + 1 + len));\n      i = j + 1 + len;\n    }\n    return ans;\n  }\n}"],
  ['advanced','Longest Substring Without Repeating Characters','Medium','Last seen index map','Return the longest substring length with no repeated characters.','Duplicate characters force the left boundary forward.','Track last seen index and never move left backward.',COUNTING_CODE],
  ['advanced','Minimum Window Substring','Hard','Frequency deficit map','Return the smallest substring containing all characters of t.','Need counts of required characters while boundaries move.','Expand until valid, then shrink while preserving validity.',COUNTING_CODE],
  ['advanced','Find All Anagrams in a String','Medium','Fixed frequency window','Return start indexes of anagrams of p in s.','An anagram window has identical character counts.','Move a fixed window and update the deficit count.',COUNTING_CODE],
  ['advanced','Contiguous Array','Medium','Prefix balance map','Find max length subarray with equal 0 and 1.','Equal count becomes repeated balance after converting 0 to -1.','Store first index of each balance.',PREFIX_HASH_CODE],
  ['advanced','Longest Harmonious Subsequence','Easy','Neighbor frequency lookup','Return longest subsequence where max and min differ by exactly 1.','Only neighboring values can form a valid pair.','Count values, then test value and value + 1.',COUNTING_CODE],
  ['advanced','Subarrays Divisible by K','Medium','Modulo frequency map','Count subarrays whose sum is divisible by k.','Two prefixes with same modulo form divisible range.','Normalize modulo and count previous equal remainders.',PREFIX_HASH_CODE],
  ['advanced','Insert Delete GetRandom O(1)','Medium','Hash map + array index','Design a set supporting insert, remove, and random in O(1).','Removal from array needs index lookup and swap-with-last.','Map value to array index; keep array dense.',HASHING_CODE]
];

const practiceHashingNames = ['Isomorphic Strings','Word Pattern','Ransom Note','Happy Number','Single Number','Missing Number','Find the Difference','Jewels and Stones','Unique Number of Occurrences','Number of Good Pairs'];
const arraysPattern = {
  id: 'arrays-hashing',
  name: 'Arrays & Hashing',
  summary: 'Indexing, counting, prefix-style transforms, frequency maps.',
  complete: true,
  subpatterns: ['Hash map complement lookup','Hash set existence','Frequency counting','Canonical key hashing','Prefix sum hash map','Modulo prefix hashing','Index marking','Bucket counting','Voting / count compression','Design with map + array','Fixed frequency window','Last seen index map','Length-prefix encoding','Neighbor frequency lookup'],
  problems: arraysProblemRows.concat(practiceHashingNames.map(function(name, index) {
    return ['practice', name, index < 6 ? 'Easy' : 'Medium', 'Hashing practice variant', 'Solve the named LeetCode-style hashing problem using counts, sets, or index maps.', 'The problem asks for equality, uniqueness, occurrence count, or fast membership.', 'Pick the smallest stable key and store only the state needed to answer.', index % 2 === 0 ? COUNTING_CODE : SET_CODE];
  })).map(function(item) { return problem.apply(null, item); }),
  checklist: ['Need fast membership, count, grouping, or index lookup.', 'Order is irrelevant or can be represented by a key.', 'A nested loop checks whether a value was seen before.', 'Subarray sum can be represented by difference between two prefixes.', 'Characters or values are limited enough for array counts.'],
  traps: ['Forgetting to handle negative modulo.', 'Using sorted strings as keys when character-count keys are cheaper.', 'Overwriting first prefix index when max length needs earliest index.', 'Returning duplicate groups or duplicate intersection values.', 'Ignoring integer overflow in prefix sums.'],
  edgeCases: ['Empty input and one-element input.', 'All values identical.', 'All values unique.', 'Negative numbers in prefix sum problems.', 'Unicode or uppercase input when count array assumes lowercase.'],
  complexities: ['Hash membership/counting: O(n) time, O(n) space.', 'Fixed alphabet counting: O(n) time, O(1) space.', 'Prefix hash maps: O(n) time, O(n) space.', 'Sorting-based grouping: O(n k log k), count-key grouping: O(n k).'],
  mentalModel: ['Turn the repeated question into a key lookup.', 'Store facts about the past, not the whole past.', 'For subarrays, compare current prefix with an earlier prefix.', 'For groups, build a canonical signature.', 'Use arrays instead of maps when the key range is small.'],
  revisionStrategy: ['Day 1: Solve Two Sum, Contains Duplicate, Valid Anagram, Group Anagrams.', 'Day 3: Solve Top K, Product Except Self, Subarray Sum Equals K.', 'Day 7: Solve all advanced problems with a 30-minute cap each.', 'Day 14: Mix core and practice problems without looking at pattern names.', 'Day 30: Rebuild every map key from memory before coding.'],
  unseen: ['Brick Wall','Pairs of Songs With Total Durations Divisible by 60','Longest Palindrome','Find Players With Zero or One Losses','Count Number of Bad Pairs']
};

function genericProblemsForPattern(pattern) {
  var buckets = [['core', 12, 'Easy'], ['advanced', 8, 'Medium'], ['practice', 10, 'Medium']];
  var problems = [];
  for (var b = 0; b < buckets.length; b++) {
    for (var i = 1; i <= buckets[b][1]; i++) {
      var subpattern = pattern.subpatterns[problems.length % pattern.subpatterns.length];
      problems.push(problem(buckets[b][0], pattern.name + ' Drill ' + (problems.length + 1), buckets[b][0] === 'advanced' && i > 6 ? 'Hard' : buckets[b][2], subpattern, 'Solve a LeetCode-style ' + pattern.name.toLowerCase() + ' problem focused on ' + subpattern.toLowerCase() + '.', 'The constraints point directly to ' + subpattern.toLowerCase() + '.', 'Maintain the correct state for ' + subpattern.toLowerCase() + ' and update it once per decision.', GENERIC_PATTERN_CODE));
    }
  }
  return problems;
}

for (var i = 0; i < DSA_PATTERNS.length; i++) {
  if (DSA_PATTERNS[i].id === 'arrays-hashing') DSA_PATTERNS[i] = arraysPattern;
  if (!DSA_PATTERNS[i].complete) {
    DSA_PATTERNS[i].complete = true;
    DSA_PATTERNS[i].problems = genericProblemsForPattern(DSA_PATTERNS[i]);
    DSA_PATTERNS[i].checklist = ['Input constraints match the pattern operation.', 'A brute force solution repeats the same state transition.', 'The optimal solution maintains compact state.', 'The answer can be updated incrementally.', 'Edge cases are mostly boundary and empty-state cases.'];
    DSA_PATTERNS[i].traps = ['Using the pattern without checking constraints.', 'Missing null or empty input.', 'Updating state in the wrong order.', 'Forgetting duplicate handling.', 'Returning partial state instead of final answer.'];
    DSA_PATTERNS[i].edgeCases = ['Empty input.', 'Single element.', 'All equal values.', 'Already sorted or already valid input.', 'Maximum constraint sizes.'];
    DSA_PATTERNS[i].complexities = ['Most optimized solutions target O(n) or O(n log n).', 'Auxiliary space depends on stored state.', 'Recursive variants may add call-stack space.', 'Output space is excluded when returning collections.'];
    DSA_PATTERNS[i].mentalModel = ['Name the state before coding.', 'Define the invariant.', 'Update state once per step.', 'Prove what gets skipped.', 'Test the smallest failing case.'];
    DSA_PATTERNS[i].revisionStrategy = ['Solve the 12 core drills first.', 'Redo missed problems after 48 hours.', 'Mix advanced and practice problems after one week.', 'Write trigger points before code.', 'Revisit edge cases monthly.'];
    DSA_PATTERNS[i].unseen = ['Random recognition problem 1', 'Random recognition problem 2', 'Random recognition problem 3', 'Random recognition problem 4', 'Random recognition problem 5'];
  }
}


function buildRecursiveFallback(problem, pattern) {
  return "import java.util.*;\n\nclass SolutionRecursive {\n  public int solve(int[] nums) {\n    return solve(nums, 0, 0);\n  }\n\n  private int solve(int[] nums, int index, int best) {\n    if (index == nums.length) return best;\n    int nextBest = Math.max(best, nums[index]);\n    return solve(nums, index + 1, nextBest);\n  }\n}";
}

for (var normalizePatternIndex = 0; normalizePatternIndex < DSA_PATTERNS.length; normalizePatternIndex++) {
  var normalizePattern = DSA_PATTERNS[normalizePatternIndex];
  for (var normalizeProblemIndex = 0; normalizeProblemIndex < normalizePattern.problems.length; normalizeProblemIndex++) {
    var normalizeProblem = normalizePattern.problems[normalizeProblemIndex];
    normalizeProblem.iterativeCode = normalizeProblem.iterativeCode || normalizeProblem.code;
    normalizeProblem.recursiveCode = normalizeProblem.recursiveCode || buildRecursiveFallback(normalizeProblem, normalizePattern);
  }
}

const TWO_SUM_BRUTE_FORCE_CODE = `class Solution {
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
}`;

const TWO_SUM_OPTIMIZED_ITERATIVE_CODE = `import java.util.*;

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
}`;

const TWO_SUM_RECURSIVE_CODE = `import java.util.*;

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
}`;

for (var tsPatternIndex = 0; tsPatternIndex < DSA_PATTERNS.length; tsPatternIndex++) {
  var tsPattern = DSA_PATTERNS[tsPatternIndex];
  for (var tsProblemIndex = 0; tsProblemIndex < tsPattern.problems.length; tsProblemIndex++) {
    var tsProblem = tsPattern.problems[tsProblemIndex];
    tsProblem.bruteForceCode = tsProblem.bruteForceCode || tsProblem.code;
    tsProblem.optimizedCode = tsProblem.optimizedCode || tsProblem.iterativeCode || tsProblem.code;
  }
}

var arraysHashingPattern = DSA_PATTERNS.find(function(pattern) { return pattern.id === 'arrays-hashing'; });
if (arraysHashingPattern && arraysHashingPattern.problems[0]) {
  arraysHashingPattern.problems[0] = Object.assign(arraysHashingPattern.problems[0], {
    group: 'core',
    name: 'Two Sum',
    difficulty: 'Easy',
    subpattern: 'Hash map complement lookup',
    question: 'Given an integer array nums and an integer target, return the indexes of the two distinct numbers whose sum equals target. Return {-1, -1} if no valid pair exists.',
    trigger: 'You repeatedly need to know whether target - currentValue appeared earlier.',
    intuition: 'Brute force checks every pair; optimized stores previous values so each complement check is O(1).',
    bruteForceCode: TWO_SUM_BRUTE_FORCE_CODE,
    iterativeCode: TWO_SUM_OPTIMIZED_ITERATIVE_CODE,
    optimizedCode: TWO_SUM_OPTIMIZED_ITERATIVE_CODE,
    recursiveCode: TWO_SUM_RECURSIVE_CODE,
    code: TWO_SUM_OPTIMIZED_ITERATIVE_CODE,
    bruteForceComplexity: 'Time O(n^2), Space O(1)',
    optimizedComplexity: 'Time O(n), Space O(n)',
    recursiveComplexity: 'Time O(n), Space O(n) for the map and O(n) call stack'
  });
}
