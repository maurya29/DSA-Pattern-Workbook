const CURRENT_PATTERN = {
  "id": "recursion",
  "name": "Recursion",
  "summary": "Base cases, branching, divide-and-conquer.",
  "complete": true,
  "subpatterns": [
    "Base case and recurrence recursion",
    "Linear recursion and tail-call style state passing",
    "Binary branching recursion",
    "Divide-and-conquer recursion",
    "Recursive linked-list and tree traversal",
    "Recursive generation and backtracking",
    "Memoized recursion for overlapping subproblems",
    "Recursive parsing of nested expressions"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Fibonacci Number",
      "difficulty": "Easy",
      "subpattern": "Base case and recurrence recursion",
      "question": "Given n, return the nth Fibonacci number where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2).",
      "trigger": "The definition directly depends on smaller values of the same function and has clear base cases for n = 0 and n = 1.",
      "intuition": "Stop at the base cases. For larger n, combine the two previous answers; memoization removes repeated branches.",
      "edgeCases": "n = 0, n = 1, small n = 2, maximum n, repeated subproblems in naive recursion.",
      "constraints": "0 <= n <= 30 in the original problem; use int for the original range.",
      "source": {
        "label": "Fibonacci Number - LeetCode 509",
        "url": "https://leetcode.com/problems/fibonacci-number/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "1",
          "explanation": "F(2) = F(1) + F(0) = 1."
        },
        {
          "input": "n = 3",
          "output": "2",
          "explanation": "F(3) = F(2) + F(1) = 2."
        },
        {
          "input": "n = 4",
          "output": "3",
          "explanation": "F(4) = 3."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n) recursion depth. Naive recursion recomputes the same states.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps only the previous two values.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes each n once and uses call stack plus memo.",
      "bruteForceCode": "class Solution {\n  public int fib(int n) {\n    if (n == 0) {\n      return 0;\n    }\n    if (n == 1) {\n      return 1;\n    }\n\n    int left = fib(n - 1);\n    int right = fib(n - 2);\n    return left + right;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int fib(int n) {\n    if (n <= 1) return n;\n\n    int prev = 0;\n    int curr = 1;\n    for (int i = 2; i <= n; i++) {\n      int next = prev + curr;\n      prev = curr;\n      curr = next;\n    }\n\n    return curr;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int fib(int n) {\n    int[] memo = new int[n + 1];\n    Arrays.fill(memo, -1);\n    return dfs(n, memo);\n  }\n\n  private int dfs(int n, int[] memo) {\n    if (n <= 1) return n;\n    if (memo[n] != -1) return memo[n];\n    memo[n] = dfs(n - 1, memo) + dfs(n - 2, memo);\n    return memo[n];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int fib(int n) {\n    if (n <= 1) return n;\n\n    int prev = 0;\n    int curr = 1;\n    for (int i = 2; i <= n; i++) {\n      int next = prev + curr;\n      prev = curr;\n      curr = next;\n    }\n\n    return curr;\n  }\n}",
      "code": "class Solution {\n  public int fib(int n) {\n    if (n <= 1) return n;\n\n    int prev = 0;\n    int curr = 1;\n    for (int i = 2; i <= n; i++) {\n      int next = prev + curr;\n      prev = curr;\n      curr = next;\n    }\n\n    return curr;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Climbing Stairs",
      "difficulty": "Easy",
      "subpattern": "Binary branching recursion with memoization",
      "question": "You are climbing a staircase with n steps. Each move can climb 1 or 2 steps. Return the number of distinct ways to reach the top.",
      "trigger": "At each step the recursion branches into taking 1 step or 2 steps, and many step indexes repeat.",
      "intuition": "The number of ways from step i is ways(i + 1) + ways(i + 2). Cache each step index.",
      "edgeCases": "n = 1, n = 2, reaching exactly n, overshooting n, repeated branches without memoization.",
      "constraints": "1 <= n <= 45.",
      "source": {
        "label": "Climbing Stairs - LeetCode 70",
        "url": "https://leetcode.com/problems/climbing-stairs/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "2",
          "explanation": "The ways are 1+1 and 2."
        },
        {
          "input": "n = 3",
          "output": "3",
          "explanation": "The ways are 1+1+1, 1+2, and 2+1."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "Only one move is possible."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Every step branches without caching.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps the last two counts.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion stores each step count once.",
      "bruteForceCode": "class Solution {\n  public int climbStairs(int n) {\n    return count(0, n);\n  }\n\n  private int count(int step, int n) {\n    if (step == n) return 1;\n    if (step > n) return 0;\n    return count(step + 1, n) + count(step + 2, n);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int climbStairs(int n) {\n    if (n <= 2) return n;\n\n    int oneStepBefore = 2;\n    int twoStepsBefore = 1;\n    for (int step = 3; step <= n; step++) {\n      int current = oneStepBefore + twoStepsBefore;\n      twoStepsBefore = oneStepBefore;\n      oneStepBefore = current;\n    }\n\n    return oneStepBefore;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int climbStairs(int n) {\n    int[] memo = new int[n + 1];\n    Arrays.fill(memo, -1);\n    return ways(0, n, memo);\n  }\n\n  private int ways(int step, int n, int[] memo) {\n    if (step == n) return 1;\n    if (step > n) return 0;\n    if (memo[step] != -1) return memo[step];\n    memo[step] = ways(step + 1, n, memo) + ways(step + 2, n, memo);\n    return memo[step];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int climbStairs(int n) {\n    if (n <= 2) return n;\n\n    int oneStepBefore = 2;\n    int twoStepsBefore = 1;\n    for (int step = 3; step <= n; step++) {\n      int current = oneStepBefore + twoStepsBefore;\n      twoStepsBefore = oneStepBefore;\n      oneStepBefore = current;\n    }\n\n    return oneStepBefore;\n  }\n}",
      "code": "class Solution {\n  public int climbStairs(int n) {\n    if (n <= 2) return n;\n\n    int oneStepBefore = 2;\n    int twoStepsBefore = 1;\n    for (int step = 3; step <= n; step++) {\n      int current = oneStepBefore + twoStepsBefore;\n      twoStepsBefore = oneStepBefore;\n      oneStepBefore = current;\n    }\n\n    return oneStepBefore;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Pow(x, n)",
      "difficulty": "Medium",
      "subpattern": "Divide-and-conquer recursion",
      "question": "Implement pow(x, n), which calculates x raised to the power n.",
      "trigger": "Exponentiation can be split into half powers, so each recursive call reduces n by half.",
      "intuition": "Compute half = x^(n/2). Square it; multiply by x once more when n is odd. Convert n to long to handle Integer.MIN_VALUE.",
      "edgeCases": "n = 0, n < 0, x = 0, x = 1, x = -1, n = Integer.MIN_VALUE.",
      "constraints": "-100.0 < x < 100.0; -2147483648 <= n <= 2147483647; result fits standard double constraints.",
      "source": {
        "label": "Pow(x, n) - LeetCode 50",
        "url": "https://leetcode.com/problems/powx-n/"
      },
      "examples": [
        {
          "input": "x = 2.00000, n = 10",
          "output": "1024.00000",
          "explanation": "2 raised to 10 is 1024."
        },
        {
          "input": "x = 2.10000, n = 3",
          "output": "9.26100",
          "explanation": "2.1 * 2.1 * 2.1 = 9.261."
        },
        {
          "input": "x = 2.00000, n = -2",
          "output": "0.25000",
          "explanation": "Negative exponent returns reciprocal power."
        }
      ],
      "bruteForceComplexity": "Time O(|n|); Space O(1). Multiply x repeatedly.",
      "optimizedComplexity": "Time O(log |n|); Space O(1). Iterative binary exponentiation halves the exponent.",
      "recursiveComplexity": "Time O(log |n|); Space O(log |n|). Recursive fast power halves the exponent at each call.",
      "bruteForceCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    double base = x;\n    if (power < 0) {\n      base = 1.0 / base;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    for (long i = 0; i < power; i++) {\n      answer *= base;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power > 0) {\n      if ((power & 1L) == 1L) answer *= x;\n      x *= x;\n      power >>= 1;\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) return 1.0 / fastPow(x, -power);\n    return fastPow(x, power);\n  }\n\n  private double fastPow(double x, long power) {\n    if (power == 0) return 1.0;\n    double half = fastPow(x, power / 2);\n    double squared = half * half;\n    return power % 2 == 0 ? squared : squared * x;\n  }\n}",
      "optimizedCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power > 0) {\n      if ((power & 1L) == 1L) answer *= x;\n      x *= x;\n      power >>= 1;\n    }\n\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power > 0) {\n      if ((power & 1L) == 1L) answer *= x;\n      x *= x;\n      power >>= 1;\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reverse String",
      "difficulty": "Easy",
      "subpattern": "Two-boundary linear recursion",
      "question": "Given a character array s, reverse it in-place.",
      "trigger": "The recursive state is two boundaries; after swapping them, the same problem remains inside the boundaries.",
      "intuition": "Swap left and right, then recurse inward until the boundaries meet or cross.",
      "edgeCases": "Empty array if allowed, one character, two characters, even length, odd length, repeated characters.",
      "constraints": "1 <= s.length <= 100000; s[i] is a printable ASCII character in the original problem.",
      "source": {
        "label": "Reverse String - LeetCode 344",
        "url": "https://leetcode.com/problems/reverse-string/"
      },
      "examples": [
        {
          "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
          "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
          "explanation": "The array is reversed in-place."
        },
        {
          "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
          "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
          "explanation": "Case is preserved while positions change."
        },
        {
          "input": "s = [\"a\"]",
          "output": "[\"a\"]",
          "explanation": "A single character is already reversed."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build a copied reversed array and write it back.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative two pointers swap in-place.",
      "recursiveComplexity": "Time O(n); Space O(n) call stack. Recursive two pointers swap one pair per call.",
      "bruteForceCode": "class Solution {\n  public void reverseString(char[] s) {\n    char[] copy = new char[s.length];\n    for (int i = 0; i < s.length; i++) {\n      copy[i] = s[s.length - 1 - i];\n    }\n\n    for (int i = 0; i < s.length; i++) {\n      s[i] = copy[i];\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0;\n    int right = s.length - 1;\n\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public void reverseString(char[] s) {\n    reverse(s, 0, s.length - 1);\n  }\n\n  private void reverse(char[] s, int left, int right) {\n    if (left >= right) return;\n\n    char temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    reverse(s, left + 1, right - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0;\n    int right = s.length - 1;\n\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n}",
      "code": "class Solution {\n  public void reverseString(char[] s) {\n    int left = 0;\n    int right = s.length - 1;\n\n    while (left < right) {\n      char temp = s[left];\n      s[left++] = s[right];\n      s[right--] = temp;\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Swap Nodes in Pairs",
      "difficulty": "Medium",
      "subpattern": "Recursive linked-list rewiring",
      "question": "Given a linked list, swap every two adjacent nodes and return its head. Node values must not be modified.",
      "trigger": "After swapping the first pair, the rest of the list is the same problem on head.next.next.",
      "intuition": "Make the second node the new head of the pair, connect the first node to the recursively swapped remainder, then return the second node.",
      "edgeCases": "Empty list, one node, two nodes, odd length, even length, preserving node objects instead of swapping values.",
      "constraints": "0 <= number of nodes <= 100; -100 <= Node.val <= 100.",
      "source": {
        "label": "Swap Nodes in Pairs - LeetCode 24",
        "url": "https://leetcode.com/problems/swap-nodes-in-pairs/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[2,1,4,3]",
          "explanation": "Each adjacent pair is swapped."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "There are no nodes to swap."
        },
        {
          "input": "head = [1,2,3]",
          "output": "[2,1,3]",
          "explanation": "The final unpaired node remains in place."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store nodes in an array and reconnect pairs.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative pointer rewiring uses a dummy node.",
      "recursiveComplexity": "Time O(n); Space O(n) call stack. Each call swaps one pair.",
      "bruteForceCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public ListNode swapPairs(ListNode head) {\n    List<ListNode> nodes = new ArrayList<>();\n    while (head != null) {\n      nodes.add(head);\n      head = head.next;\n    }\n\n    for (int i = 0; i + 1 < nodes.size(); i += 2) {\n      ListNode temp = nodes.get(i);\n      nodes.set(i, nodes.get(i + 1));\n      nodes.set(i + 1, temp);\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (ListNode node : nodes) {\n      tail.next = node;\n      tail = node;\n    }\n    tail.next = null;\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode swapPairs(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode prev = dummy;\n\n    while (prev.next != null && prev.next.next != null) {\n      ListNode first = prev.next;\n      ListNode second = first.next;\n      first.next = second.next;\n      second.next = first;\n      prev.next = second;\n      prev = first;\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode swapPairs(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    ListNode second = head.next;\n    head.next = swapPairs(second.next);\n    second.next = head;\n    return second;\n  }\n}",
      "optimizedCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode swapPairs(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode prev = dummy;\n\n    while (prev.next != null && prev.next.next != null) {\n      ListNode first = prev.next;\n      ListNode second = first.next;\n      first.next = second.next;\n      second.next = first;\n      prev.next = second;\n      prev = first;\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode swapPairs(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode prev = dummy;\n\n    while (prev.next != null && prev.next.next != null) {\n      ListNode first = prev.next;\n      ListNode second = first.next;\n      first.next = second.next;\n      second.next = first;\n      prev.next = second;\n      prev = first;\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge Two Sorted Lists",
      "difficulty": "Easy",
      "subpattern": "Recursive linked-list choice",
      "question": "Given the heads of two sorted linked lists, merge them into one sorted linked list and return its head.",
      "trigger": "The smaller current head must be chosen, then the remaining work is the same merge problem on the rest of that list and the other list.",
      "intuition": "Compare list heads. Attach the smaller one to the merge of its next node and the other list.",
      "edgeCases": "Both lists empty, one list empty, duplicate values, negative values, one list much longer than the other.",
      "constraints": "0 <= number of nodes in each list <= 50; -100 <= Node.val <= 100; both lists are sorted nondecreasing.",
      "source": {
        "label": "Merge Two Sorted Lists - LeetCode 21",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
      },
      "examples": [
        {
          "input": "list1 = [1,2,4], list2 = [1,3,4]",
          "output": "[1,1,2,3,4,4]",
          "explanation": "Nodes are merged in sorted order."
        },
        {
          "input": "list1 = [], list2 = []",
          "output": "[]",
          "explanation": "Both lists are empty."
        },
        {
          "input": "list1 = [], list2 = [0]",
          "output": "[0]",
          "explanation": "The non-empty list is already the answer."
        }
      ],
      "bruteForceComplexity": "Time O((m+n) log(m+n)); Space O(m+n). Collect values, sort, and rebuild.",
      "optimizedComplexity": "Time O(m+n); Space O(1). Iteratively relink existing nodes.",
      "recursiveComplexity": "Time O(m+n); Space O(m+n) call stack. Each call consumes one node.",
      "bruteForceCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    List<Integer> values = new ArrayList<>();\n    while (list1 != null) {\n      values.add(list1.val);\n      list1 = list1.next;\n    }\n    while (list2 != null) {\n      values.add(list2.val);\n      list2 = list2.next;\n    }\n    Collections.sort(values);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : values) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (list1 != null && list2 != null) {\n      if (list1.val <= list2.val) {\n        tail.next = list1;\n        list1 = list1.next;\n      } else {\n        tail.next = list2;\n        list2 = list2.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = list1 != null ? list1 : list2;\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    if (list1 == null) return list2;\n    if (list2 == null) return list1;\n\n    if (list1.val <= list2.val) {\n      list1.next = mergeTwoLists(list1.next, list2);\n      return list1;\n    }\n\n    list2.next = mergeTwoLists(list1, list2.next);\n    return list2;\n  }\n}",
      "optimizedCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (list1 != null && list2 != null) {\n      if (list1.val <= list2.val) {\n        tail.next = list1;\n        list1 = list1.next;\n      } else {\n        tail.next = list2;\n        list2 = list2.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = list1 != null ? list1 : list2;\n    return dummy.next;\n  }\n}",
      "code": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (list1 != null && list2 != null) {\n      if (list1.val <= list2.val) {\n        tail.next = list1;\n        list1 = list1.next;\n      } else {\n        tail.next = list2;\n        list2 = list2.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = list1 != null ? list1 : list2;\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "core",
      "name": "K-th Symbol in Grammar",
      "difficulty": "Medium",
      "subpattern": "Recursive parent-state reduction",
      "question": "In row 1 the grammar is 0. Each 0 becomes 01 and each 1 becomes 10. Return the kth symbol in row n.",
      "trigger": "The kth symbol is determined by its parent in row n - 1 and whether k is a left or right child.",
      "intuition": "Move from (n, k) to the parent index. Left child keeps the parent value; right child flips it.",
      "edgeCases": "n = 1, k = 1, first symbol, last symbol, large n where building the row is impossible.",
      "constraints": "1 <= n <= 30; 1 <= k <= 2^(n - 1).",
      "source": {
        "label": "K-th Symbol in Grammar - LeetCode 779",
        "url": "https://leetcode.com/problems/k-th-symbol-in-grammar/"
      },
      "examples": [
        {
          "input": "n = 1, k = 1",
          "output": "0",
          "explanation": "The first row is only 0."
        },
        {
          "input": "n = 2, k = 1",
          "output": "0",
          "explanation": "Row 2 is 01."
        },
        {
          "input": "n = 2, k = 2",
          "output": "1",
          "explanation": "The second symbol in 01 is 1."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(2^n). Build rows until n.",
      "optimizedComplexity": "Time O(n); Space O(1). Count flips while walking from k toward the root.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively ask for the parent symbol.",
      "bruteForceCode": "class Solution {\n  public int kthGrammar(int n, int k) {\n    String row = \"0\";\n    for (int level = 2; level <= n; level++) {\n      StringBuilder next = new StringBuilder();\n      for (char ch : row.toCharArray()) {\n        next.append(ch == '0' ? \"01\" : \"10\");\n      }\n      row = next.toString();\n    }\n    return row.charAt(k - 1) - '0';\n  }\n}",
      "iterativeCode": "class Solution {\n  public int kthGrammar(int n, int k) {\n    int flips = 0;\n    while (k > 1) {\n      if (k % 2 == 0) flips++;\n      k = (k + 1) / 2;\n    }\n    return flips % 2;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int kthGrammar(int n, int k) {\n    if (n == 1) return 0;\n\n    int parent = kthGrammar(n - 1, (k + 1) / 2);\n    if (k % 2 == 1) return parent;\n    return 1 - parent;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int kthGrammar(int n, int k) {\n    int flips = 0;\n    while (k > 1) {\n      if (k % 2 == 0) flips++;\n      k = (k + 1) / 2;\n    }\n    return flips % 2;\n  }\n}",
      "code": "class Solution {\n  public int kthGrammar(int n, int k) {\n    int flips = 0;\n    while (k > 1) {\n      if (k % 2 == 0) flips++;\n      k = (k + 1) / 2;\n    }\n    return flips % 2;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Generate Parentheses",
      "difficulty": "Medium",
      "subpattern": "Recursive generation with validity bounds",
      "question": "Given n pairs of parentheses, generate all combinations of well-formed parentheses.",
      "trigger": "Each position chooses either open or close, but the choice is valid only if counts preserve a legal prefix.",
      "intuition": "Add an opening parenthesis while open < n. Add a closing parenthesis while close < open.",
      "edgeCases": "n = 1, closing before opening, exactly n opens used, output order not important, exponential output size.",
      "constraints": "1 <= n <= 8.",
      "source": {
        "label": "Generate Parentheses - LeetCode 22",
        "url": "https://leetcode.com/problems/generate-parentheses/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
          "explanation": "All valid strings with three pairs are generated."
        },
        {
          "input": "n = 1",
          "output": "[\"()\"]",
          "explanation": "Only one valid pair exists."
        },
        {
          "input": "n = 2",
          "output": "[\"(())\",\"()()\"]",
          "explanation": "Two valid combinations exist."
        }
      ],
      "bruteForceComplexity": "Time O(2^(2n) * n); Space O(n). Generate every string and validate at the leaf.",
      "optimizedComplexity": "Time O(Cn * n); Space O(Cn * n). Iterative stack explores only valid prefixes, where Cn is the nth Catalan number.",
      "recursiveComplexity": "Time O(Cn * n); Space O(n) call stack excluding output. Recursion prunes invalid prefixes early.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    buildAll(new StringBuilder(), 2 * n, answer);\n    return answer;\n  }\n\n  private void buildAll(StringBuilder path, int length, List<String> answer) {\n    if (path.length() == length) {\n      if (isValid(path)) answer.add(path.toString());\n      return;\n    }\n\n    path.append('(');\n    buildAll(path, length, answer);\n    path.setCharAt(path.length() - 1, ')');\n    buildAll(path, length, answer);\n    path.deleteCharAt(path.length() - 1);\n  }\n\n  private boolean isValid(StringBuilder path) {\n    int balance = 0;\n    for (int i = 0; i < path.length(); i++) {\n      balance += path.charAt(i) == '(' ? 1 : -1;\n      if (balance < 0) return false;\n    }\n    return balance == 0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(\"\", 0, 0));\n\n    while (!stack.isEmpty()) {\n      State current = stack.pop();\n      if (current.value.length() == 2 * n) {\n        answer.add(current.value);\n        continue;\n      }\n      if (current.close < current.open) {\n        stack.push(new State(current.value + \")\", current.open, current.close + 1));\n      }\n      if (current.open < n) {\n        stack.push(new State(current.value + \"(\", current.open + 1, current.close));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    String value;\n    int open;\n    int close;\n    State(String value, int open, int close) {\n      this.value = value;\n      this.open = open;\n      this.close = close;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    backtrack(n, 0, 0, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void backtrack(int n, int open, int close, StringBuilder path, List<String> answer) {\n    if (path.length() == 2 * n) {\n      answer.add(path.toString());\n      return;\n    }\n\n    if (open < n) {\n      path.append('(');\n      backtrack(n, open + 1, close, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n    if (close < open) {\n      path.append(')');\n      backtrack(n, open, close + 1, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(\"\", 0, 0));\n\n    while (!stack.isEmpty()) {\n      State current = stack.pop();\n      if (current.value.length() == 2 * n) {\n        answer.add(current.value);\n        continue;\n      }\n      if (current.close < current.open) {\n        stack.push(new State(current.value + \")\", current.open, current.close + 1));\n      }\n      if (current.open < n) {\n        stack.push(new State(current.value + \"(\", current.open + 1, current.close));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    String value;\n    int open;\n    int close;\n    State(String value, int open, int close) {\n      this.value = value;\n      this.open = open;\n      this.close = close;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(\"\", 0, 0));\n\n    while (!stack.isEmpty()) {\n      State current = stack.pop();\n      if (current.value.length() == 2 * n) {\n        answer.add(current.value);\n        continue;\n      }\n      if (current.close < current.open) {\n        stack.push(new State(current.value + \")\", current.open, current.close + 1));\n      }\n      if (current.open < n) {\n        stack.push(new State(current.value + \"(\", current.open + 1, current.close));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    String value;\n    int open;\n    int close;\n    State(String value, int open, int close) {\n      this.value = value;\n      this.open = open;\n      this.close = close;\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Subsets",
      "difficulty": "Medium",
      "subpattern": "Include-exclude recursion",
      "question": "Given an integer array nums with unique elements, return all possible subsets of nums.",
      "trigger": "For every element, recursion has exactly two choices: exclude it or include it.",
      "intuition": "At index i, first recurse without nums[i], then recurse with nums[i]. The leaf is one subset.",
      "edgeCases": "Empty input if allowed, one element, unique values, output can be in any order, exponential output size.",
      "constraints": "1 <= nums.length <= 10; -10 <= nums[i] <= 10; all nums values are unique.",
      "source": {
        "label": "Subsets - LeetCode 78",
        "url": "https://leetcode.com/problems/subsets/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
          "explanation": "All 2^3 subsets are returned."
        },
        {
          "input": "nums = [0]",
          "output": "[[],[0]]",
          "explanation": "A single element can be excluded or included."
        },
        {
          "input": "nums = [1,2]",
          "output": "[[],[1],[2],[1,2]]",
          "explanation": "There are four subsets."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n * 2^n). Bitmasks enumerate every subset.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(n * 2^n). Iteratively extend previous subsets.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(n) recursion stack excluding output. Include-exclude recursion creates every subset.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    int total = 1 << nums.length;\n\n    for (int mask = 0; mask < total; mask++) {\n      List<Integer> subset = new ArrayList<>();\n      for (int i = 0; i < nums.length; i++) {\n        if ((mask & (1 << i)) != 0) subset.add(nums[i]);\n      }\n      answer.add(subset);\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    dfs(nums, 0, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void dfs(int[] nums, int index, List<Integer> path, List<List<Integer>> answer) {\n    if (index == nums.length) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n\n    dfs(nums, index + 1, path, answer);\n    path.add(nums[index]);\n    dfs(nums, index + 1, path, answer);\n    path.remove(path.size() - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Permutations",
      "difficulty": "Medium",
      "subpattern": "Recursive ordering with used-state",
      "question": "Given an array nums of distinct integers, return all possible permutations.",
      "trigger": "Each recursion level chooses one unused element for the next position.",
      "intuition": "Track which numbers are already used. When path length equals n, record one permutation.",
      "edgeCases": "One element, distinct values only, negative values, output order not important, factorial output size.",
      "constraints": "1 <= nums.length <= 6; -10 <= nums[i] <= 10; all nums values are unique.",
      "source": {
        "label": "Permutations - LeetCode 46",
        "url": "https://leetcode.com/problems/permutations/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
          "explanation": "All 3! orderings are generated."
        },
        {
          "input": "nums = [0,1]",
          "output": "[[0,1],[1,0]]",
          "explanation": "Two elements have two permutations."
        },
        {
          "input": "nums = [1]",
          "output": "[[1]]",
          "explanation": "One element has one ordering."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n); Space O(n). Lexicographic next permutation visits every ordering.",
      "optimizedComplexity": "Time O(n! * n); Space O(n! * n). Iterative insertion builds permutations level by level.",
      "recursiveComplexity": "Time O(n! * n); Space O(n) recursion stack excluding output. Backtracking chooses unused values.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    do {\n      List<Integer> current = new ArrayList<>();\n      for (int num : nums) current.add(num);\n      answer.add(current);\n    } while (nextPermutation(nums));\n    return answer;\n  }\n\n  private boolean nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i < 0) return false;\n    int j = nums.length - 1;\n    while (nums[j] <= nums[i]) j--;\n    swap(nums, i, j);\n    reverse(nums, i + 1, nums.length - 1);\n    return true;\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    dfs(nums, new boolean[nums.length], new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void dfs(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> answer) {\n    if (path.size() == nums.length) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n\n    for (int i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      path.add(nums[i]);\n      dfs(nums, used, path, answer);\n      path.remove(path.size() - 1);\n      used[i] = false;\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Letter Combinations of a Phone Number",
      "difficulty": "Medium",
      "subpattern": "Recursive cartesian product generation",
      "question": "Given a string digits containing digits 2 through 9, return all possible letter combinations the number could represent.",
      "trigger": "Each digit expands to a small set of letters, and recursion chooses one letter per digit.",
      "intuition": "At index i, iterate over letters for digits[i], append one, and recurse to i + 1.",
      "edgeCases": "Empty digits, one digit, digits containing 7 or 9 with four letters, preserving output strings of length digits.length.",
      "constraints": "0 <= digits.length <= 4; digits[i] is in 2..9.",
      "source": {
        "label": "Letter Combinations of a Phone Number - LeetCode 17",
        "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
      },
      "examples": [
        {
          "input": "digits = \"23\"",
          "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
          "explanation": "Every letter from 2 combines with every letter from 3."
        },
        {
          "input": "digits = \"\"",
          "output": "[]",
          "explanation": "No digits means no combinations."
        },
        {
          "input": "digits = \"2\"",
          "output": "[\"a\",\"b\",\"c\"]",
          "explanation": "Digit 2 maps to a, b, and c."
        }
      ],
      "bruteForceComplexity": "Time O(4^n * n); Space O(4^n * n). Iteratively forms the full cartesian product.",
      "optimizedComplexity": "Time O(4^n * n); Space O(4^n * n). Queue expansion processes combinations level by level.",
      "recursiveComplexity": "Time O(4^n * n); Space O(n) call stack excluding output. Backtracking builds one string at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n    answer.add(\"\");\n\n    for (char digit : digits.toCharArray()) {\n      List<String> next = new ArrayList<>();\n      for (String prefix : answer) {\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          next.add(prefix + ch);\n        }\n      }\n      answer = next;\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          queue.offer(prefix + ch);\n        }\n      }\n    }\n\n    answer.addAll(queue);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n    dfs(digits, 0, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void dfs(String digits, int index, StringBuilder path, List<String> answer) {\n    if (index == digits.length()) {\n      answer.add(path.toString());\n      return;\n    }\n\n    for (char ch : MAP[digits.charAt(index) - '0'].toCharArray()) {\n      path.append(ch);\n      dfs(digits, index + 1, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          queue.offer(prefix + ch);\n        }\n      }\n    }\n\n    answer.addAll(queue);\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          queue.offer(prefix + ch);\n        }\n      }\n    }\n\n    answer.addAll(queue);\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combinations",
      "difficulty": "Medium",
      "subpattern": "Recursive choose-skip generation",
      "question": "Given integers n and k, return all possible combinations of k numbers chosen from the range 1 to n.",
      "trigger": "At each candidate number, recursion chooses whether to include it, while pruning when not enough numbers remain.",
      "intuition": "Build increasing paths. Once path size is k, record it. Stop loops early when remaining numbers cannot fill the path.",
      "edgeCases": "k = 1, k = n, n = 1, insufficient remaining candidates, output order not important.",
      "constraints": "1 <= n <= 20; 1 <= k <= n.",
      "source": {
        "label": "Combinations - LeetCode 77",
        "url": "https://leetcode.com/problems/combinations/"
      },
      "examples": [
        {
          "input": "n = 4, k = 2",
          "output": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
          "explanation": "All size-2 choices from 1..4 are returned."
        },
        {
          "input": "n = 1, k = 1",
          "output": "[[1]]",
          "explanation": "Only one combination exists."
        },
        {
          "input": "n = 3, k = 3",
          "output": "[[1,2,3]]",
          "explanation": "Choosing all numbers gives one combination."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n). Enumerate all masks and keep those with k bits.",
      "optimizedComplexity": "Time O(C(n,k) * k); Space O(k) stack state excluding output. Iterative stack simulates increasing choices.",
      "recursiveComplexity": "Time O(C(n,k) * k); Space O(k) call stack excluding output. Pruned recursion builds only valid-size paths.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    int limit = 1 << n;\n\n    for (int mask = 0; mask < limit; mask++) {\n      if (Integer.bitCount(mask) != k) continue;\n      List<Integer> current = new ArrayList<>();\n      for (int i = 0; i < n; i++) {\n        if ((mask & (1 << i)) != 0) current.add(i + 1);\n      }\n      answer.add(current);\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, new ArrayList<>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int num = n; num >= state.start; num--) {\n        if (state.path.size() + (n - num + 1) < k) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    List<Integer> path;\n    State(int start, List<Integer> path) {\n      this.start = start;\n      this.path = path;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    dfs(1, n, k, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void dfs(int start, int n, int k, List<Integer> path, List<List<Integer>> answer) {\n    if (path.size() == k) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n\n    int need = k - path.size();\n    for (int num = start; num <= n - need + 1; num++) {\n      path.add(num);\n      dfs(num + 1, n, k, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, new ArrayList<>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int num = n; num >= state.start; num--) {\n        if (state.path.size() + (n - num + 1) < k) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    List<Integer> path;\n    State(int start, List<Integer> path) {\n      this.start = start;\n      this.path = path;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, new ArrayList<>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int num = n; num >= state.start; num--) {\n        if (state.path.size() + (n - num + 1) < k) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    List<Integer> path;\n    State(int start, List<Integer> path) {\n      this.start = start;\n      this.path = path;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Combination Sum",
      "difficulty": "Medium",
      "subpattern": "Recursive branching with reusable choices",
      "question": "Given distinct candidate numbers and a target, return all unique combinations where chosen numbers sum to target. A candidate may be chosen unlimited times.",
      "trigger": "Every recursive step either reuses the current candidate or moves to later candidates, and the remaining sum is the state.",
      "intuition": "Sort candidates. Choose a value, reduce target, and recurse from the same index to allow reuse.",
      "edgeCases": "Target smaller than every candidate, exact match, repeated use of one value, candidates sorted or unsorted, pruning after sum exceeds target.",
      "constraints": "1 <= candidates.length <= 30; 2 <= candidates[i] <= 40; all candidates are distinct; 1 <= target <= 40.",
      "source": {
        "label": "Combination Sum - LeetCode 39",
        "url": "https://leetcode.com/problems/combination-sum/"
      },
      "examples": [
        {
          "input": "candidates = [2,3,6,7], target = 7",
          "output": "[[2,2,3],[7]]",
          "explanation": "2 can be reused and 7 is an exact match."
        },
        {
          "input": "candidates = [2,3,5], target = 8",
          "output": "[[2,2,2,2],[2,3,3],[3,5]]",
          "explanation": "All unique combinations summing to 8 are returned."
        },
        {
          "input": "candidates = [2], target = 1",
          "output": "[]",
          "explanation": "No candidate can sum to the target."
        }
      ],
      "bruteForceComplexity": "Time exponential in target/minCandidate; Space O(target/minCandidate). Try include/skip branches without sorting-based pruning.",
      "optimizedComplexity": "Time exponential in output size; Space O(target/minCandidate). Iterative stack stores partial combinations and remaining sums.",
      "recursiveComplexity": "Time exponential in output size; Space O(target/minCandidate). Backtracking prunes when candidate exceeds remaining target.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    List<List<Integer>> answer = new ArrayList<>();\n    search(candidates, 0, target, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void search(int[] candidates, int index, int remaining,\n      List<Integer> path, List<List<Integer>> answer) {\n    if (remaining == 0) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n    if (index == candidates.length || remaining < 0) return;\n\n    path.add(candidates[index]);\n    search(candidates, index, remaining - candidates[index], path, answer);\n    path.remove(path.size() - 1);\n    search(candidates, index + 1, remaining, path, answer);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    int remaining;\n    List<Integer> path;\n    State(int start, int remaining, List<Integer> path) {\n      this.start = start;\n      this.remaining = remaining;\n      this.path = path;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    dfs(candidates, 0, target, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void dfs(int[] candidates, int start, int remaining,\n      List<Integer> path, List<List<Integer>> answer) {\n    if (remaining == 0) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n\n    for (int i = start; i < candidates.length && candidates[i] <= remaining; i++) {\n      path.add(candidates[i]);\n      dfs(candidates, i, remaining - candidates[i], path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    int remaining;\n    List<Integer> path;\n    State(int start, int remaining, List<Integer> path) {\n      this.start = start;\n      this.remaining = remaining;\n      this.path = path;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    int remaining;\n    List<Integer> path;\n    State(int start, int remaining, List<Integer> path) {\n      this.start = start;\n      this.remaining = remaining;\n      this.path = path;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "N-Queens",
      "difficulty": "Hard",
      "subpattern": "Recursive constraint search",
      "question": "Given n, return all distinct solutions to the n-queens puzzle, placing n queens on an n x n chessboard so no two queens attack each other.",
      "trigger": "Each row needs one queen, and valid columns depend on columns and diagonals chosen by previous rows.",
      "intuition": "Place queens row by row. Track used columns and both diagonals to reject unsafe cells in O(1).",
      "edgeCases": "n = 1, n = 2 or n = 3 with no solution, diagonal conflicts, output board formatting, backtracking state cleanup.",
      "constraints": "1 <= n <= 9.",
      "source": {
        "label": "N-Queens - LeetCode 51",
        "url": "https://leetcode.com/problems/n-queens/"
      },
      "examples": [
        {
          "input": "n = 4",
          "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
          "explanation": "There are two valid 4-queen boards."
        },
        {
          "input": "n = 1",
          "output": "[[\"Q\"]]",
          "explanation": "A single queen is valid."
        },
        {
          "input": "n = 2",
          "output": "[]",
          "explanation": "No arrangement avoids attacks."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n^2); Space O(n). Generate column permutations and validate diagonals.",
      "optimizedComplexity": "Time O(n!); Space O(n). Iterative stack tracks row choices and constraint sets.",
      "recursiveComplexity": "Time O(n!); Space O(n). Recursive backtracking places one queen per row with O(1) safety checks.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    int[] cols = new int[n];\n    for (int i = 0; i < n; i++) cols[i] = i;\n\n    do {\n      if (valid(cols)) answer.add(build(cols));\n    } while (nextPermutation(cols));\n    return answer;\n  }\n\n  private boolean valid(int[] cols) {\n    for (int r1 = 0; r1 < cols.length; r1++) {\n      for (int r2 = r1 + 1; r2 < cols.length; r2++) {\n        if (Math.abs(r1 - r2) == Math.abs(cols[r1] - cols[r2])) return false;\n      }\n    }\n    return true;\n  }\n\n  private List<String> build(int[] cols) {\n    List<String> board = new ArrayList<>();\n    for (int col : cols) {\n      char[] row = new char[cols.length];\n      Arrays.fill(row, '.');\n      row[col] = 'Q';\n      board.add(new String(row));\n    }\n    return board;\n  }\n\n  private boolean nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i < 0) return false;\n    int j = nums.length - 1;\n    while (nums[j] <= nums[i]) j--;\n    swap(nums, i, j);\n    for (int l = i + 1, r = nums.length - 1; l < r; l++, r--) swap(nums, l, r);\n    return true;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    int[] queenCol = new int[n];\n    Arrays.fill(queenCol, -1);\n    boolean[] cols = new boolean[n];\n    boolean[] diag1 = new boolean[2 * n];\n    boolean[] diag2 = new boolean[2 * n];\n    int row = 0;\n    int col = 0;\n\n    while (row >= 0) {\n      boolean placed = false;\n      for (; col < n; col++) {\n        int d1 = row - col + n;\n        int d2 = row + col;\n        if (cols[col] || diag1[d1] || diag2[d2]) continue;\n        queenCol[row] = col;\n        cols[col] = diag1[d1] = diag2[d2] = true;\n        row++;\n        col = 0;\n        placed = true;\n        break;\n      }\n\n      if (row == n) {\n        answer.add(build(queenCol));\n        row--;\n        col = queenCol[row] + 1;\n        remove(row, queenCol, cols, diag1, diag2, n);\n      } else if (!placed) {\n        row--;\n        if (row >= 0) {\n          col = queenCol[row] + 1;\n          remove(row, queenCol, cols, diag1, diag2, n);\n        }\n      }\n    }\n    return answer;\n  }\n\n  private void remove(int row, int[] queenCol, boolean[] cols, boolean[] diag1, boolean[] diag2, int n) {\n    int col = queenCol[row];\n    cols[col] = false;\n    diag1[row - col + n] = false;\n    diag2[row + col] = false;\n    queenCol[row] = -1;\n  }\n\n  private List<String> build(int[] queenCol) {\n    List<String> board = new ArrayList<>();\n    for (int col : queenCol) {\n      char[] row = new char[queenCol.length];\n      Arrays.fill(row, '.');\n      row[col] = 'Q';\n      board.add(new String(row));\n    }\n    return board;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    backtrack(0, n, new int[n], new boolean[n], new boolean[2 * n], new boolean[2 * n], answer);\n    return answer;\n  }\n\n  private void backtrack(int row, int n, int[] queenCol, boolean[] cols,\n      boolean[] diag1, boolean[] diag2, List<List<String>> answer) {\n    if (row == n) {\n      answer.add(build(queenCol));\n      return;\n    }\n\n    for (int col = 0; col < n; col++) {\n      int d1 = row - col + n;\n      int d2 = row + col;\n      if (cols[col] || diag1[d1] || diag2[d2]) continue;\n      queenCol[row] = col;\n      cols[col] = diag1[d1] = diag2[d2] = true;\n      backtrack(row + 1, n, queenCol, cols, diag1, diag2, answer);\n      cols[col] = diag1[d1] = diag2[d2] = false;\n    }\n  }\n\n  private List<String> build(int[] queenCol) {\n    List<String> board = new ArrayList<>();\n    for (int col : queenCol) {\n      char[] row = new char[queenCol.length];\n      Arrays.fill(row, '.');\n      row[col] = 'Q';\n      board.add(new String(row));\n    }\n    return board;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    int[] queenCol = new int[n];\n    Arrays.fill(queenCol, -1);\n    boolean[] cols = new boolean[n];\n    boolean[] diag1 = new boolean[2 * n];\n    boolean[] diag2 = new boolean[2 * n];\n    int row = 0;\n    int col = 0;\n\n    while (row >= 0) {\n      boolean placed = false;\n      for (; col < n; col++) {\n        int d1 = row - col + n;\n        int d2 = row + col;\n        if (cols[col] || diag1[d1] || diag2[d2]) continue;\n        queenCol[row] = col;\n        cols[col] = diag1[d1] = diag2[d2] = true;\n        row++;\n        col = 0;\n        placed = true;\n        break;\n      }\n\n      if (row == n) {\n        answer.add(build(queenCol));\n        row--;\n        col = queenCol[row] + 1;\n        remove(row, queenCol, cols, diag1, diag2, n);\n      } else if (!placed) {\n        row--;\n        if (row >= 0) {\n          col = queenCol[row] + 1;\n          remove(row, queenCol, cols, diag1, diag2, n);\n        }\n      }\n    }\n    return answer;\n  }\n\n  private void remove(int row, int[] queenCol, boolean[] cols, boolean[] diag1, boolean[] diag2, int n) {\n    int col = queenCol[row];\n    cols[col] = false;\n    diag1[row - col + n] = false;\n    diag2[row + col] = false;\n    queenCol[row] = -1;\n  }\n\n  private List<String> build(int[] queenCol) {\n    List<String> board = new ArrayList<>();\n    for (int col : queenCol) {\n      char[] row = new char[queenCol.length];\n      Arrays.fill(row, '.');\n      row[col] = 'Q';\n      board.add(new String(row));\n    }\n    return board;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    int[] queenCol = new int[n];\n    Arrays.fill(queenCol, -1);\n    boolean[] cols = new boolean[n];\n    boolean[] diag1 = new boolean[2 * n];\n    boolean[] diag2 = new boolean[2 * n];\n    int row = 0;\n    int col = 0;\n\n    while (row >= 0) {\n      boolean placed = false;\n      for (; col < n; col++) {\n        int d1 = row - col + n;\n        int d2 = row + col;\n        if (cols[col] || diag1[d1] || diag2[d2]) continue;\n        queenCol[row] = col;\n        cols[col] = diag1[d1] = diag2[d2] = true;\n        row++;\n        col = 0;\n        placed = true;\n        break;\n      }\n\n      if (row == n) {\n        answer.add(build(queenCol));\n        row--;\n        col = queenCol[row] + 1;\n        remove(row, queenCol, cols, diag1, diag2, n);\n      } else if (!placed) {\n        row--;\n        if (row >= 0) {\n          col = queenCol[row] + 1;\n          remove(row, queenCol, cols, diag1, diag2, n);\n        }\n      }\n    }\n    return answer;\n  }\n\n  private void remove(int row, int[] queenCol, boolean[] cols, boolean[] diag1, boolean[] diag2, int n) {\n    int col = queenCol[row];\n    cols[col] = false;\n    diag1[row - col + n] = false;\n    diag2[row + col] = false;\n    queenCol[row] = -1;\n  }\n\n  private List<String> build(int[] queenCol) {\n    List<String> board = new ArrayList<>();\n    for (int col : queenCol) {\n      char[] row = new char[queenCol.length];\n      Arrays.fill(row, '.');\n      row[col] = 'Q';\n      board.add(new String(row));\n    }\n    return board;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sudoku Solver",
      "difficulty": "Hard",
      "subpattern": "Recursive constraint search with backtracking",
      "question": "Write a program to solve a 9 x 9 Sudoku board by filling empty cells marked with dot characters.",
      "trigger": "Every blank cell branches over digits 1 through 9, and constraints from row, column, and box determine valid choices.",
      "intuition": "Track used digits for each row, column, and box. Pick blanks in order, place a valid digit, and backtrack on failure.",
      "edgeCases": "Already solved board, one blank, cells with no valid digit, box indexing, restoring constraints after backtracking.",
      "constraints": "board.length == 9; board[i].length == 9; board contains digits 1..9 or dot; the input has exactly one solution.",
      "source": {
        "label": "Sudoku Solver - LeetCode 37",
        "url": "https://leetcode.com/problems/sudoku-solver/"
      },
      "examples": [
        {
          "input": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],...]",
          "output": "solved board",
          "explanation": "Every row, column, and 3x3 box is filled with digits 1 through 9."
        },
        {
          "input": "board with one empty cell",
          "output": "board with that cell filled",
          "explanation": "Only the valid digit is placed."
        },
        {
          "input": "already solved board",
          "output": "same board",
          "explanation": "No recursive placement is needed."
        }
      ],
      "bruteForceComplexity": "Time O(9^e * 81) where e is blanks; Space O(e). Each placement scans row, column, and box directly.",
      "optimizedComplexity": "Time O(9^e) worst case with faster O(1) validity checks; Space O(e). Iterative stack uses bit masks.",
      "recursiveComplexity": "Time O(9^e) worst case with O(1) validity checks; Space O(e). Recursive backtracking fills one blank per level.",
      "bruteForceCode": "class Solution {\n  public void solveSudoku(char[][] board) {\n    solve(board, 0, 0);\n  }\n\n  private boolean solve(char[][] board, int row, int col) {\n    if (row == 9) return true;\n    if (col == 9) return solve(board, row + 1, 0);\n    if (board[row][col] != '.') return solve(board, row, col + 1);\n\n    for (char digit = '1'; digit <= '9'; digit++) {\n      if (!valid(board, row, col, digit)) continue;\n      board[row][col] = digit;\n      if (solve(board, row, col + 1)) return true;\n      board[row][col] = '.';\n    }\n    return false;\n  }\n\n  private boolean valid(char[][] board, int row, int col, char digit) {\n    for (int i = 0; i < 9; i++) {\n      if (board[row][i] == digit || board[i][col] == digit) return false;\n      int boxRow = (row / 3) * 3 + i / 3;\n      int boxCol = (col / 3) * 3 + i % 3;\n      if (board[boxRow][boxCol] == digit) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List<int[]> blanks = new ArrayList<>();\n    boolean[][] rows = new boolean[9][10];\n    boolean[][] cols = new boolean[9][10];\n    boolean[][] boxes = new boolean[9][10];\n\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] == '.') blanks.add(new int[] {r, c});\n        else place(rows, cols, boxes, r, c, board[r][c] - '0', true);\n      }\n    }\n\n    int[] nextDigit = new int[blanks.size()];\n    Arrays.fill(nextDigit, 1);\n    int index = 0;\n    while (index >= 0 && index < blanks.size()) {\n      int r = blanks.get(index)[0], c = blanks.get(index)[1];\n      if (board[r][c] != '.') {\n        place(rows, cols, boxes, r, c, board[r][c] - '0', false);\n        board[r][c] = '.';\n      }\n\n      boolean placed = false;\n      for (int d = nextDigit[index]; d <= 9; d++) {\n        if (!rows[r][d] && !cols[c][d] && !boxes[box(r, c)][d]) {\n          board[r][c] = (char) ('0' + d);\n          place(rows, cols, boxes, r, c, d, true);\n          nextDigit[index] = d + 1;\n          index++;\n          placed = true;\n          break;\n        }\n      }\n      if (!placed) {\n        nextDigit[index] = 1;\n        index--;\n      }\n    }\n  }\n\n  private void place(boolean[][] rows, boolean[][] cols, boolean[][] boxes,\n      int r, int c, int d, boolean used) {\n    rows[r][d] = used;\n    cols[c][d] = used;\n    boxes[box(r, c)][d] = used;\n  }\n\n  private int box(int r, int c) {\n    return (r / 3) * 3 + c / 3;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    boolean[][] rows = new boolean[9][10];\n    boolean[][] cols = new boolean[9][10];\n    boolean[][] boxes = new boolean[9][10];\n    List<int[]> blanks = new ArrayList<>();\n\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] == '.') blanks.add(new int[] {r, c});\n        else place(rows, cols, boxes, r, c, board[r][c] - '0', true);\n      }\n    }\n    solve(board, blanks, 0, rows, cols, boxes);\n  }\n\n  private boolean solve(char[][] board, List<int[]> blanks, int index,\n      boolean[][] rows, boolean[][] cols, boolean[][] boxes) {\n    if (index == blanks.size()) return true;\n\n    int r = blanks.get(index)[0], c = blanks.get(index)[1];\n    for (int d = 1; d <= 9; d++) {\n      if (rows[r][d] || cols[c][d] || boxes[box(r, c)][d]) continue;\n      board[r][c] = (char) ('0' + d);\n      place(rows, cols, boxes, r, c, d, true);\n      if (solve(board, blanks, index + 1, rows, cols, boxes)) return true;\n      place(rows, cols, boxes, r, c, d, false);\n      board[r][c] = '.';\n    }\n    return false;\n  }\n\n  private void place(boolean[][] rows, boolean[][] cols, boolean[][] boxes,\n      int r, int c, int d, boolean used) {\n    rows[r][d] = used;\n    cols[c][d] = used;\n    boxes[box(r, c)][d] = used;\n  }\n\n  private int box(int r, int c) {\n    return (r / 3) * 3 + c / 3;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List<int[]> blanks = new ArrayList<>();\n    boolean[][] rows = new boolean[9][10];\n    boolean[][] cols = new boolean[9][10];\n    boolean[][] boxes = new boolean[9][10];\n\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] == '.') blanks.add(new int[] {r, c});\n        else place(rows, cols, boxes, r, c, board[r][c] - '0', true);\n      }\n    }\n\n    int[] nextDigit = new int[blanks.size()];\n    Arrays.fill(nextDigit, 1);\n    int index = 0;\n    while (index >= 0 && index < blanks.size()) {\n      int r = blanks.get(index)[0], c = blanks.get(index)[1];\n      if (board[r][c] != '.') {\n        place(rows, cols, boxes, r, c, board[r][c] - '0', false);\n        board[r][c] = '.';\n      }\n\n      boolean placed = false;\n      for (int d = nextDigit[index]; d <= 9; d++) {\n        if (!rows[r][d] && !cols[c][d] && !boxes[box(r, c)][d]) {\n          board[r][c] = (char) ('0' + d);\n          place(rows, cols, boxes, r, c, d, true);\n          nextDigit[index] = d + 1;\n          index++;\n          placed = true;\n          break;\n        }\n      }\n      if (!placed) {\n        nextDigit[index] = 1;\n        index--;\n      }\n    }\n  }\n\n  private void place(boolean[][] rows, boolean[][] cols, boolean[][] boxes,\n      int r, int c, int d, boolean used) {\n    rows[r][d] = used;\n    cols[c][d] = used;\n    boxes[box(r, c)][d] = used;\n  }\n\n  private int box(int r, int c) {\n    return (r / 3) * 3 + c / 3;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List<int[]> blanks = new ArrayList<>();\n    boolean[][] rows = new boolean[9][10];\n    boolean[][] cols = new boolean[9][10];\n    boolean[][] boxes = new boolean[9][10];\n\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] == '.') blanks.add(new int[] {r, c});\n        else place(rows, cols, boxes, r, c, board[r][c] - '0', true);\n      }\n    }\n\n    int[] nextDigit = new int[blanks.size()];\n    Arrays.fill(nextDigit, 1);\n    int index = 0;\n    while (index >= 0 && index < blanks.size()) {\n      int r = blanks.get(index)[0], c = blanks.get(index)[1];\n      if (board[r][c] != '.') {\n        place(rows, cols, boxes, r, c, board[r][c] - '0', false);\n        board[r][c] = '.';\n      }\n\n      boolean placed = false;\n      for (int d = nextDigit[index]; d <= 9; d++) {\n        if (!rows[r][d] && !cols[c][d] && !boxes[box(r, c)][d]) {\n          board[r][c] = (char) ('0' + d);\n          place(rows, cols, boxes, r, c, d, true);\n          nextDigit[index] = d + 1;\n          index++;\n          placed = true;\n          break;\n        }\n      }\n      if (!placed) {\n        nextDigit[index] = 1;\n        index--;\n      }\n    }\n  }\n\n  private void place(boolean[][] rows, boolean[][] cols, boolean[][] boxes,\n      int r, int c, int d, boolean used) {\n    rows[r][d] = used;\n    cols[c][d] = used;\n    boxes[box(r, c)][d] = used;\n  }\n\n  private int box(int r, int c) {\n    return (r / 3) * 3 + c / 3;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Word Search",
      "difficulty": "Medium",
      "subpattern": "Recursive grid DFS with backtracking",
      "question": "Given an m x n board of characters and a word, return true if the word exists in the grid by moving horizontally or vertically without reusing a cell.",
      "trigger": "Each character match branches to neighboring cells while the path must remember visited cells.",
      "intuition": "Start DFS from cells matching word[0]. Mark the current cell, recurse to four neighbors for the next index, then unmark it.",
      "edgeCases": "Word length 1, board with one cell, repeated letters, needing to avoid cell reuse, word longer than total cells.",
      "constraints": "1 <= m, n <= 6; 1 <= word.length <= 15; board and word contain uppercase/lowercase English letters in the original problem.",
      "source": {
        "label": "Word Search - LeetCode 79",
        "url": "https://leetcode.com/problems/word-search/"
      },
      "examples": [
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
          "output": "true",
          "explanation": "A valid adjacent path spells the word."
        },
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"SEE\"",
          "output": "true",
          "explanation": "The word can be formed on the right side."
        },
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
          "output": "false",
          "explanation": "The path would need to reuse B."
        }
      ],
      "bruteForceComplexity": "Time O(m*n*4^L); Space O(L). Direct DFS tries every path of word length L.",
      "optimizedComplexity": "Time O(m*n*3^L); Space O(L). Iterative DFS avoids immediately revisiting the previous path cells.",
      "recursiveComplexity": "Time O(m*n*3^L); Space O(L). Recursive backtracking marks cells in-place during the path.",
      "bruteForceCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (search(board, word, r, c, 0, new boolean[board.length][board[0].length])) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean search(char[][] board, String word, int r, int c, int index, boolean[][] used) {\n    if (index == word.length()) return true;\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return false;\n    if (used[r][c] || board[r][c] != word.charAt(index)) return false;\n\n    used[r][c] = true;\n    boolean found = search(board, word, r + 1, c, index + 1, used)\n        || search(board, word, r - 1, c, index + 1, used)\n        || search(board, word, r, c + 1, index + 1, used)\n        || search(board, word, r, c - 1, index + 1, used);\n    used[r][c] = false;\n    return found;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] != word.charAt(0)) continue;\n        Deque<State> stack = new ArrayDeque<>();\n        stack.push(new State(r, c, 0, 1L << (r * cols + c)));\n        while (!stack.isEmpty()) {\n          State cur = stack.pop();\n          if (cur.index == word.length() - 1) return true;\n          for (int[] dir : DIRS) {\n            int nr = cur.row + dir[0], nc = cur.col + dir[1];\n            int nextIndex = cur.index + 1;\n            if (nr < 0 || nc < 0 || nr == rows || nc == cols) continue;\n            long bit = 1L << (nr * cols + nc);\n            if ((cur.used & bit) != 0 || board[nr][nc] != word.charAt(nextIndex)) continue;\n            stack.push(new State(nr, nc, nextIndex, cur.used | bit));\n          }\n        }\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    int row, col, index;\n    long used;\n    State(int row, int col, int index, long used) {\n      this.row = row;\n      this.col = col;\n      this.index = index;\n      this.used = used;\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (dfs(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean dfs(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return false;\n    if (board[r][c] != word.charAt(index)) return false;\n\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = dfs(board, word, r + 1, c, index + 1)\n        || dfs(board, word, r - 1, c, index + 1)\n        || dfs(board, word, r, c + 1, index + 1)\n        || dfs(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] != word.charAt(0)) continue;\n        Deque<State> stack = new ArrayDeque<>();\n        stack.push(new State(r, c, 0, 1L << (r * cols + c)));\n        while (!stack.isEmpty()) {\n          State cur = stack.pop();\n          if (cur.index == word.length() - 1) return true;\n          for (int[] dir : DIRS) {\n            int nr = cur.row + dir[0], nc = cur.col + dir[1];\n            int nextIndex = cur.index + 1;\n            if (nr < 0 || nc < 0 || nr == rows || nc == cols) continue;\n            long bit = 1L << (nr * cols + nc);\n            if ((cur.used & bit) != 0 || board[nr][nc] != word.charAt(nextIndex)) continue;\n            stack.push(new State(nr, nc, nextIndex, cur.used | bit));\n          }\n        }\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    int row, col, index;\n    long used;\n    State(int row, int col, int index, long used) {\n      this.row = row;\n      this.col = col;\n      this.index = index;\n      this.used = used;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] != word.charAt(0)) continue;\n        Deque<State> stack = new ArrayDeque<>();\n        stack.push(new State(r, c, 0, 1L << (r * cols + c)));\n        while (!stack.isEmpty()) {\n          State cur = stack.pop();\n          if (cur.index == word.length() - 1) return true;\n          for (int[] dir : DIRS) {\n            int nr = cur.row + dir[0], nc = cur.col + dir[1];\n            int nextIndex = cur.index + 1;\n            if (nr < 0 || nc < 0 || nr == rows || nc == cols) continue;\n            long bit = 1L << (nr * cols + nc);\n            if ((cur.used & bit) != 0 || board[nr][nc] != word.charAt(nextIndex)) continue;\n            stack.push(new State(nr, nc, nextIndex, cur.used | bit));\n          }\n        }\n      }\n    }\n    return false;\n  }\n\n  private static class State {\n    int row, col, index;\n    long used;\n    State(int row, int col, int index, long used) {\n      this.row = row;\n      this.col = col;\n      this.index = index;\n      this.used = used;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Same Tree",
      "difficulty": "Easy",
      "subpattern": "Recursive tree comparison",
      "question": "Given the roots of two binary trees p and q, return true if they are structurally identical and node values are equal.",
      "trigger": "Two trees are the same only if their roots match and their left and right subtrees are also the same.",
      "intuition": "Compare the current pair, then recursively compare left with left and right with right.",
      "edgeCases": "Both null, one null, same values different shape, different values same shape, single-node trees.",
      "constraints": "0 <= number of nodes <= 100; -10000 <= Node.val <= 10000.",
      "source": {
        "label": "Same Tree - LeetCode 100",
        "url": "https://leetcode.com/problems/same-tree/"
      },
      "examples": [
        {
          "input": "p = [1,2,3], q = [1,2,3]",
          "output": "true",
          "explanation": "Structure and values match."
        },
        {
          "input": "p = [1,2], q = [1,null,2]",
          "output": "false",
          "explanation": "The shapes differ."
        },
        {
          "input": "p = [1,2,1], q = [1,1,2]",
          "output": "false",
          "explanation": "The values differ by position."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Serialize both trees with null markers and compare strings.",
      "optimizedComplexity": "Time O(n); Space O(w). Iterative stack or queue compares node pairs.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS compares corresponding subtrees.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    return serialize(p).equals(serialize(q));\n  }\n\n  private String serialize(TreeNode node) {\n    if (node == null) return \"#,\";\n    return node.val + \",\" + serialize(node.left) + serialize(node.right);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    Deque<TreeNode[]> stack = new ArrayDeque<>();\n    stack.push(new TreeNode[] {p, q});\n\n    while (!stack.isEmpty()) {\n      TreeNode[] pair = stack.pop();\n      TreeNode a = pair[0], b = pair[1];\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      stack.push(new TreeNode[] {a.left, b.left});\n      stack.push(new TreeNode[] {a.right, b.right});\n    }\n\n    return true;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null || q == null) return p == q;\n    return p.val == q.val\n        && isSameTree(p.left, q.left)\n        && isSameTree(p.right, q.right);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    Deque<TreeNode[]> stack = new ArrayDeque<>();\n    stack.push(new TreeNode[] {p, q});\n\n    while (!stack.isEmpty()) {\n      TreeNode[] pair = stack.pop();\n      TreeNode a = pair[0], b = pair[1];\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      stack.push(new TreeNode[] {a.left, b.left});\n      stack.push(new TreeNode[] {a.right, b.right});\n    }\n\n    return true;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isSameTree(TreeNode p, TreeNode q) {\n    Deque<TreeNode[]> stack = new ArrayDeque<>();\n    stack.push(new TreeNode[] {p, q});\n\n    while (!stack.isEmpty()) {\n      TreeNode[] pair = stack.pop();\n      TreeNode a = pair[0], b = pair[1];\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      stack.push(new TreeNode[] {a.left, b.left});\n      stack.push(new TreeNode[] {a.right, b.right});\n    }\n\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Symmetric Tree",
      "difficulty": "Easy",
      "subpattern": "Recursive mirror comparison",
      "question": "Given the root of a binary tree, return true if it is symmetric around its center.",
      "trigger": "Symmetry compares opposite children: left.left with right.right and left.right with right.left.",
      "intuition": "A tree is symmetric if its left and right subtrees are mirrors of each other.",
      "edgeCases": "Empty tree, single node, same values but asymmetric shape, null positions, deeper mirror mismatch.",
      "constraints": "1 <= number of nodes <= 1000; -100 <= Node.val <= 100.",
      "source": {
        "label": "Symmetric Tree - LeetCode 101",
        "url": "https://leetcode.com/problems/symmetric-tree/"
      },
      "examples": [
        {
          "input": "root = [1,2,2,3,4,4,3]",
          "output": "true",
          "explanation": "The left and right sides mirror each other."
        },
        {
          "input": "root = [1,2,2,null,3,null,3]",
          "output": "false",
          "explanation": "Null positions do not mirror."
        },
        {
          "input": "root = [1]",
          "output": "true",
          "explanation": "A single node is symmetric."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Serialize left and right with mirrored traversal and compare.",
      "optimizedComplexity": "Time O(n); Space O(w). Iterative queue compares mirror pairs.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive mirror comparison follows opposite branches.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    return leftSerial(root.left).equals(rightSerial(root.right));\n  }\n\n  private String leftSerial(TreeNode node) {\n    if (node == null) return \"#,\";\n    return node.val + \",\" + leftSerial(node.left) + leftSerial(node.right);\n  }\n\n  private String rightSerial(TreeNode node) {\n    if (node == null) return \"#,\";\n    return node.val + \",\" + rightSerial(node.right) + rightSerial(node.left);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root.left);\n    queue.offer(root.right);\n\n    while (!queue.isEmpty()) {\n      TreeNode a = queue.poll();\n      TreeNode b = queue.poll();\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      queue.offer(a.left);\n      queue.offer(b.right);\n      queue.offer(a.right);\n      queue.offer(b.left);\n    }\n\n    return true;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isSymmetric(TreeNode root) {\n    return root == null || mirror(root.left, root.right);\n  }\n\n  private boolean mirror(TreeNode left, TreeNode right) {\n    if (left == null || right == null) return left == right;\n    return left.val == right.val\n        && mirror(left.left, right.right)\n        && mirror(left.right, right.left);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root.left);\n    queue.offer(root.right);\n\n    while (!queue.isEmpty()) {\n      TreeNode a = queue.poll();\n      TreeNode b = queue.poll();\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      queue.offer(a.left);\n      queue.offer(b.right);\n      queue.offer(a.right);\n      queue.offer(b.left);\n    }\n\n    return true;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root.left);\n    queue.offer(root.right);\n\n    while (!queue.isEmpty()) {\n      TreeNode a = queue.poll();\n      TreeNode b = queue.poll();\n      if (a == null && b == null) continue;\n      if (a == null || b == null || a.val != b.val) return false;\n      queue.offer(a.left);\n      queue.offer(b.right);\n      queue.offer(a.right);\n      queue.offer(b.left);\n    }\n\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Depth of Binary Tree",
      "difficulty": "Easy",
      "subpattern": "Recursive tree height aggregation",
      "question": "Given the root of a binary tree, return its maximum depth.",
      "trigger": "The depth of a node is 1 plus the maximum depth of its left and right subtrees.",
      "intuition": "Null contributes 0. Every non-null node asks both children for their heights and takes the larger one.",
      "edgeCases": "Empty tree, one node, skewed tree, balanced tree, deep tree recursion stack.",
      "constraints": "0 <= number of nodes <= 10000; -100 <= Node.val <= 100.",
      "source": {
        "label": "Maximum Depth of Binary Tree - LeetCode 104",
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "3",
          "explanation": "The longest root-to-leaf path has 3 nodes."
        },
        {
          "input": "root = [1,null,2]",
          "output": "2",
          "explanation": "The right-skewed path has length 2."
        },
        {
          "input": "root = []",
          "output": "0",
          "explanation": "An empty tree has depth 0."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Enumerate all root-to-leaf depths and take the maximum.",
      "optimizedComplexity": "Time O(n); Space O(w). BFS counts levels iteratively.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS returns height from children.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    List<Integer> depths = new ArrayList<>();\n    collect(root, 0, depths);\n    int best = 0;\n    for (int depth : depths) best = Math.max(best, depth);\n    return best;\n  }\n\n  private void collect(TreeNode node, int depth, List<Integer> depths) {\n    if (node == null) {\n      depths.add(depth);\n      return;\n    }\n    collect(node.left, depth + 1, depths);\n    collect(node.right, depth + 1, depths);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Invert Binary Tree",
      "difficulty": "Easy",
      "subpattern": "Recursive tree mutation",
      "question": "Given the root of a binary tree, invert the tree and return its root.",
      "trigger": "Every node performs the same local operation: swap its left and right children, then invert both subtrees.",
      "intuition": "Swap children at the current node. Then apply the same operation to each child.",
      "edgeCases": "Empty tree, one node, only left children, only right children, preserving node identities.",
      "constraints": "0 <= number of nodes <= 100; -100 <= Node.val <= 100.",
      "source": {
        "label": "Invert Binary Tree - LeetCode 226",
        "url": "https://leetcode.com/problems/invert-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [4,2,7,1,3,6,9]",
          "output": "[4,7,2,9,6,3,1]",
          "explanation": "Every left and right child pair is swapped."
        },
        {
          "input": "root = [2,1,3]",
          "output": "[2,3,1]",
          "explanation": "The two children of the root swap."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "Empty tree remains empty."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build a new mirrored tree instead of mutating in-place.",
      "optimizedComplexity": "Time O(n); Space O(w). Iterative BFS swaps every node once.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS swaps current node and subtrees.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    TreeNode copy = new TreeNode(root.val);\n    copy.left = invertTree(root.right);\n    copy.right = invertTree(root.left);\n    return copy;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      TreeNode temp = node.left;\n      node.left = node.right;\n      node.right = temp;\n      if (node.left != null) queue.offer(node.left);\n      if (node.right != null) queue.offer(node.right);\n    }\n\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n\n    TreeNode left = invertTree(root.left);\n    TreeNode right = invertTree(root.right);\n    root.left = right;\n    root.right = left;\n    return root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      TreeNode temp = node.left;\n      node.left = node.right;\n      node.right = temp;\n      if (node.left != null) queue.offer(node.left);\n      if (node.right != null) queue.offer(node.right);\n    }\n\n    return root;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      TreeNode node = queue.poll();\n      TreeNode temp = node.left;\n      node.left = node.right;\n      node.right = temp;\n      if (node.left != null) queue.offer(node.left);\n      if (node.right != null) queue.offer(node.right);\n    }\n\n    return root;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Path Sum",
      "difficulty": "Easy",
      "subpattern": "Recursive root-to-leaf accumulation",
      "question": "Given a binary tree root and targetSum, return true if the tree has a root-to-leaf path whose values sum to targetSum.",
      "trigger": "A path decision moves from a node to one child, and the remaining target decreases by the current node value.",
      "intuition": "At a leaf, check whether remaining target equals the leaf value. Otherwise recurse into children with target - node.val.",
      "edgeCases": "Empty tree, single node equal target, negative values, target zero, path must end at a leaf.",
      "constraints": "0 <= number of nodes <= 5000; -1000 <= Node.val <= 1000; -1000 <= targetSum <= 1000.",
      "source": {
        "label": "Path Sum - LeetCode 112",
        "url": "https://leetcode.com/problems/path-sum/"
      },
      "examples": [
        {
          "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
          "output": "true",
          "explanation": "The path 5->4->11->2 sums to 22."
        },
        {
          "input": "root = [1,2,3], targetSum = 5",
          "output": "false",
          "explanation": "No root-to-leaf path sums to 5."
        },
        {
          "input": "root = [], targetSum = 0",
          "output": "false",
          "explanation": "An empty tree has no root-to-leaf path."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Collect every root-to-leaf sum, then scan for target.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative DFS carries running sums on a stack.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS subtracts node values from target.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    List<Integer> sums = new ArrayList<>();\n    collect(root, 0, sums);\n    for (int sum : sums) {\n      if (sum == targetSum) return true;\n    }\n    return false;\n  }\n\n  private void collect(TreeNode node, int sum, List<Integer> sums) {\n    if (node == null) return;\n    int next = sum + node.val;\n    if (node.left == null && node.right == null) sums.add(next);\n    collect(node.left, next, sums);\n    collect(node.right, next, sums);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> sums = new ArrayDeque<>();\n    nodes.push(root);\n    sums.push(root.val);\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int sum = sums.pop();\n      if (node.left == null && node.right == null && sum == targetSum) return true;\n      if (node.right != null) {\n        nodes.push(node.right);\n        sums.push(sum + node.right.val);\n      }\n      if (node.left != null) {\n        nodes.push(node.left);\n        sums.push(sum + node.left.val);\n      }\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    if (root.left == null && root.right == null) return targetSum == root.val;\n    return hasPathSum(root.left, targetSum - root.val)\n        || hasPathSum(root.right, targetSum - root.val);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> sums = new ArrayDeque<>();\n    nodes.push(root);\n    sums.push(root.val);\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int sum = sums.pop();\n      if (node.left == null && node.right == null && sum == targetSum) return true;\n      if (node.right != null) {\n        nodes.push(node.right);\n        sums.push(sum + node.right.val);\n      }\n      if (node.left != null) {\n        nodes.push(node.left);\n        sums.push(sum + node.left.val);\n      }\n    }\n\n    return false;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<Integer> sums = new ArrayDeque<>();\n    nodes.push(root);\n    sums.push(root.val);\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      int sum = sums.pop();\n      if (node.left == null && node.right == null && sum == targetSum) return true;\n      if (node.right != null) {\n        nodes.push(node.right);\n        sums.push(sum + node.right.val);\n      }\n      if (node.left != null) {\n        nodes.push(node.left);\n        sums.push(sum + node.left.val);\n      }\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Binary Tree Paths",
      "difficulty": "Easy",
      "subpattern": "Recursive path construction",
      "question": "Given the root of a binary tree, return all root-to-leaf paths as strings using arrows between node values.",
      "trigger": "A path is built as recursion descends, and a result is emitted only at leaf nodes.",
      "intuition": "Append the current node value to the path. If it is a leaf, record the path; otherwise continue into children.",
      "edgeCases": "Empty tree, one node, negative values, skewed tree, restoring path text after returning from recursion.",
      "constraints": "1 <= number of nodes <= 100; -100 <= Node.val <= 100.",
      "source": {
        "label": "Binary Tree Paths - LeetCode 257",
        "url": "https://leetcode.com/problems/binary-tree-paths/"
      },
      "examples": [
        {
          "input": "root = [1,2,3,null,5]",
          "output": "[\"1->2->5\",\"1->3\"]",
          "explanation": "There are two root-to-leaf paths."
        },
        {
          "input": "root = [1]",
          "output": "[\"1\"]",
          "explanation": "The root is also a leaf."
        },
        {
          "input": "root = [1,2]",
          "output": "[\"1->2\"]",
          "explanation": "Only the left path reaches a leaf."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(n*h). Copy a path list at every traversal step.",
      "optimizedComplexity": "Time O(n*h); Space O(n*h). Iterative DFS carries path strings on a stack.",
      "recursiveComplexity": "Time O(n*h); Space O(h). Recursive DFS uses one mutable path builder excluding output.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public List<String> binaryTreePaths(TreeNode root) {\n    List<String> answer = new ArrayList<>();\n    if (root == null) return answer;\n    collect(root, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void collect(TreeNode node, List<Integer> path, List<String> answer) {\n    if (node == null) return;\n    List<Integer> nextPath = new ArrayList<>(path);\n    nextPath.add(node.val);\n    if (node.left == null && node.right == null) {\n      answer.add(format(nextPath));\n      return;\n    }\n    collect(node.left, nextPath, answer);\n    collect(node.right, nextPath, answer);\n  }\n\n  private String format(List<Integer> path) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < path.size(); i++) {\n      if (i > 0) sb.append(\"->\");\n      sb.append(path.get(i));\n    }\n    return sb.toString();\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public List<String> binaryTreePaths(TreeNode root) {\n    List<String> answer = new ArrayList<>();\n    if (root == null) return answer;\n\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<String> paths = new ArrayDeque<>();\n    nodes.push(root);\n    paths.push(String.valueOf(root.val));\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      String path = paths.pop();\n      if (node.left == null && node.right == null) {\n        answer.add(path);\n      }\n      if (node.right != null) {\n        nodes.push(node.right);\n        paths.push(path + \"->\" + node.right.val);\n      }\n      if (node.left != null) {\n        nodes.push(node.left);\n        paths.push(path + \"->\" + node.left.val);\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public List<String> binaryTreePaths(TreeNode root) {\n    List<String> answer = new ArrayList<>();\n    dfs(root, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, StringBuilder path, List<String> answer) {\n    if (node == null) return;\n\n    int length = path.length();\n    if (length > 0) path.append(\"->\");\n    path.append(node.val);\n\n    if (node.left == null && node.right == null) answer.add(path.toString());\n    else {\n      dfs(node.left, path, answer);\n      dfs(node.right, path, answer);\n    }\n\n    path.setLength(length);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public List<String> binaryTreePaths(TreeNode root) {\n    List<String> answer = new ArrayList<>();\n    if (root == null) return answer;\n\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<String> paths = new ArrayDeque<>();\n    nodes.push(root);\n    paths.push(String.valueOf(root.val));\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      String path = paths.pop();\n      if (node.left == null && node.right == null) {\n        answer.add(path);\n      }\n      if (node.right != null) {\n        nodes.push(node.right);\n        paths.push(path + \"->\" + node.right.val);\n      }\n      if (node.left != null) {\n        nodes.push(node.left);\n        paths.push(path + \"->\" + node.left.val);\n      }\n    }\n\n    return answer;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public List<String> binaryTreePaths(TreeNode root) {\n    List<String> answer = new ArrayList<>();\n    if (root == null) return answer;\n\n    Deque<TreeNode> nodes = new ArrayDeque<>();\n    Deque<String> paths = new ArrayDeque<>();\n    nodes.push(root);\n    paths.push(String.valueOf(root.val));\n\n    while (!nodes.isEmpty()) {\n      TreeNode node = nodes.pop();\n      String path = paths.pop();\n      if (node.left == null && node.right == null) {\n        answer.add(path);\n      }\n      if (node.right != null) {\n        nodes.push(node.right);\n        paths.push(path + \"->\" + node.right.val);\n      }\n      if (node.left != null) {\n        nodes.push(node.left);\n        paths.push(path + \"->\" + node.left.val);\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Validate Binary Search Tree",
      "difficulty": "Medium",
      "subpattern": "Recursive bounds propagation",
      "question": "Given the root of a binary tree, determine if it is a valid binary search tree.",
      "trigger": "Every node must lie inside a value range determined by all ancestors, not just its parent.",
      "intuition": "Pass lower and upper bounds down recursion. Left child must be below node value; right child must be above it.",
      "edgeCases": "Duplicate values, Integer.MIN_VALUE, Integer.MAX_VALUE, invalid descendant far below root, empty tree.",
      "constraints": "1 <= number of nodes <= 10000; -2147483648 <= Node.val <= 2147483647.",
      "source": {
        "label": "Validate Binary Search Tree - LeetCode 98",
        "url": "https://leetcode.com/problems/validate-binary-search-tree/"
      },
      "examples": [
        {
          "input": "root = [2,1,3]",
          "output": "true",
          "explanation": "All nodes satisfy BST ordering."
        },
        {
          "input": "root = [5,1,4,null,null,3,6]",
          "output": "false",
          "explanation": "Node 3 is in the right subtree of 5 but is less than 5."
        },
        {
          "input": "root = [2,2,2]",
          "output": "false",
          "explanation": "Duplicates are not allowed in this BST definition."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Inorder traversal must be strictly increasing.",
      "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder stops at the first non-increasing value.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive bounds validate every node once.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    List<Integer> values = new ArrayList<>();\n    inorder(root, values);\n    for (int i = 1; i < values.size(); i++) {\n      if (values.get(i) <= values.get(i - 1)) return false;\n    }\n    return true;\n  }\n\n  private void inorder(TreeNode node, List<Integer> values) {\n    if (node == null) return;\n    inorder(node.left, values);\n    values.add(node.val);\n    inorder(node.right, values);\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) {\n        stack.push(current);\n        current = current.left;\n      }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n\n    return true;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);\n  }\n\n  private boolean valid(TreeNode node, long low, long high) {\n    if (node == null) return true;\n    if (node.val <= low || node.val >= high) return false;\n    return valid(node.left, low, node.val) && valid(node.right, node.val, high);\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) {\n        stack.push(current);\n        current = current.left;\n      }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n\n    return true;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode current = root;\n    Long previous = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) {\n        stack.push(current);\n        current = current.left;\n      }\n      current = stack.pop();\n      if (previous != null && current.val <= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Lowest Common Ancestor of a Binary Tree",
      "difficulty": "Medium",
      "subpattern": "Recursive tree result bubbling",
      "question": "Given a binary tree and two nodes p and q, return their lowest common ancestor.",
      "trigger": "A subtree returns whether it found p or q; the first node receiving matches from both sides is the answer.",
      "intuition": "If root is p or q, return root. Recurse left and right. If both sides return non-null, root is the LCA.",
      "edgeCases": "p is ancestor of q, q is ancestor of p, p and q in different subtrees, root is one target, skewed tree.",
      "constraints": "2 <= number of nodes <= 100000; all Node.val values are unique; p and q exist in the tree.",
      "source": {
        "label": "Lowest Common Ancestor of a Binary Tree - LeetCode 236",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
      },
      "examples": [
        {
          "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
          "output": "3",
          "explanation": "5 and 1 are in different subtrees of 3."
        },
        {
          "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
          "output": "5",
          "explanation": "5 is an ancestor of 4."
        },
        {
          "input": "root = [1,2], p = 1, q = 2",
          "output": "1",
          "explanation": "The root is one target and ancestor of the other."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Build root-to-node paths for p and q, then compare them.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative parent map climbs ancestors.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS bubbles target hits up from children.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    List<TreeNode> pathP = new ArrayList<>();\n    List<TreeNode> pathQ = new ArrayList<>();\n    find(root, p, pathP);\n    find(root, q, pathQ);\n\n    TreeNode answer = null;\n    int limit = Math.min(pathP.size(), pathQ.size());\n    for (int i = 0; i < limit && pathP.get(i) == pathQ.get(i); i++) {\n      answer = pathP.get(i);\n    }\n    return answer;\n  }\n\n  private boolean find(TreeNode node, TreeNode target, List<TreeNode> path) {\n    if (node == null) return false;\n    path.add(node);\n    if (node == target || find(node.left, target, path) || find(node.right, target, path)) return true;\n    path.remove(path.size() - 1);\n    return false;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) {\n        parent.put(node.left, node);\n        stack.push(node.left);\n      }\n      if (node.right != null) {\n        parent.put(node.right, node);\n        stack.push(node.right);\n      }\n    }\n\n    Set<TreeNode> ancestors = new HashSet<>();\n    while (p != null) {\n      ancestors.add(p);\n      p = parent.get(p);\n    }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return left != null ? left : right;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) {\n        parent.put(node.left, node);\n        stack.push(node.left);\n      }\n      if (node.right != null) {\n        parent.put(node.right, node);\n        stack.push(node.right);\n      }\n    }\n\n    Set<TreeNode> ancestors = new HashSet<>();\n    while (p != null) {\n      ancestors.add(p);\n      p = parent.get(p);\n    }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map<TreeNode, TreeNode> parent = new HashMap<>();\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) {\n        parent.put(node.left, node);\n        stack.push(node.left);\n      }\n      if (node.right != null) {\n        parent.put(node.right, node);\n        stack.push(node.right);\n      }\n    }\n\n    Set<TreeNode> ancestors = new HashSet<>();\n    while (p != null) {\n      ancestors.add(p);\n      p = parent.get(p);\n    }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Construct Binary Tree from Preorder and Inorder Traversal",
      "difficulty": "Medium",
      "subpattern": "Recursive divide-and-conquer construction",
      "question": "Given preorder and inorder traversal arrays of a binary tree with unique values, construct and return the binary tree.",
      "trigger": "Preorder gives the root first, and inorder splits all nodes into left and right subtrees around that root.",
      "intuition": "Take preorder[preIndex] as root. Find it in inorder, recursively build left range, then right range.",
      "edgeCases": "One node, empty range, skewed tree, balanced tree, unique values required, keeping preorder index synchronized.",
      "constraints": "1 <= preorder.length <= 3000; inorder.length == preorder.length; values are unique and traversals are valid.",
      "source": {
        "label": "Construct Binary Tree from Preorder and Inorder Traversal - LeetCode 105",
        "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
      },
      "examples": [
        {
          "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
          "output": "[3,9,20,null,null,15,7]",
          "explanation": "3 is root; inorder splits left [9] and right [15,20,7]."
        },
        {
          "input": "preorder = [-1], inorder = [-1]",
          "output": "[-1]",
          "explanation": "A single node tree is built."
        },
        {
          "input": "preorder = [1,2], inorder = [2,1]",
          "output": "[1,2]",
          "explanation": "The second value is the left child."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(h). Each recursive call linearly searches inorder for the root.",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative stack reconstructs parent-child links from traversals.",
      "recursiveComplexity": "Time O(n); Space O(n). Hash map gives root index in O(1) for recursive splits.",
      "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int preIndex = 0;\n\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    return build(preorder, inorder, 0, inorder.length - 1);\n  }\n\n  private TreeNode build(int[] preorder, int[] inorder, int left, int right) {\n    if (left > right) return null;\n\n    int rootValue = preorder[preIndex++];\n    TreeNode root = new TreeNode(rootValue);\n    int split = left;\n    while (inorder[split] != rootValue) split++;\n\n    root.left = build(preorder, inorder, left, split - 1);\n    root.right = build(preorder, inorder, split + 1, right);\n    return root;\n  }\n}",
      "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    int inorderIndex = 0;\n\n    for (int i = 1; i < preorder.length; i++) {\n      int value = preorder[i];\n      TreeNode node = stack.peek();\n      if (node.val != inorder[inorderIndex]) {\n        node.left = new TreeNode(value);\n        stack.push(node.left);\n      } else {\n        while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {\n          node = stack.pop();\n          inorderIndex++;\n        }\n        node.right = new TreeNode(value);\n        stack.push(node.right);\n      }\n    }\n\n    return root;\n  }\n}",
      "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  private int preIndex = 0;\n  private Map<Integer, Integer> inorderIndex = new HashMap<>();\n\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    for (int i = 0; i < inorder.length; i++) {\n      inorderIndex.put(inorder[i], i);\n    }\n    return build(preorder, 0, inorder.length - 1);\n  }\n\n  private TreeNode build(int[] preorder, int left, int right) {\n    if (left > right) return null;\n\n    int rootValue = preorder[preIndex++];\n    TreeNode root = new TreeNode(rootValue);\n    int split = inorderIndex.get(rootValue);\n    root.left = build(preorder, left, split - 1);\n    root.right = build(preorder, split + 1, right);\n    return root;\n  }\n}",
      "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    int inorderIndex = 0;\n\n    for (int i = 1; i < preorder.length; i++) {\n      int value = preorder[i];\n      TreeNode node = stack.peek();\n      if (node.val != inorder[inorderIndex]) {\n        node.left = new TreeNode(value);\n        stack.push(node.left);\n      } else {\n        while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {\n          node = stack.pop();\n          inorderIndex++;\n        }\n        node.right = new TreeNode(value);\n        stack.push(node.right);\n      }\n    }\n\n    return root;\n  }\n}",
      "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nimport java.util.*;\n\nclass Solution {\n  public TreeNode buildTree(int[] preorder, int[] inorder) {\n    TreeNode root = new TreeNode(preorder[0]);\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    stack.push(root);\n    int inorderIndex = 0;\n\n    for (int i = 1; i < preorder.length; i++) {\n      int value = preorder[i];\n      TreeNode node = stack.peek();\n      if (node.val != inorder[inorderIndex]) {\n        node.left = new TreeNode(value);\n        stack.push(node.left);\n      } else {\n        while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {\n          node = stack.pop();\n          inorderIndex++;\n        }\n        node.right = new TreeNode(value);\n        stack.push(node.right);\n      }\n    }\n\n    return root;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Decode String",
      "difficulty": "Medium",
      "subpattern": "Recursive parsing of nested brackets",
      "question": "Given an encoded string with patterns like k[encoded_string], return the decoded string.",
      "trigger": "Nested brackets naturally form recursive subexpressions; decoding inside brackets must finish before repeating it.",
      "intuition": "When parser sees a number and [, recursively decode the bracket content, then append it count times.",
      "edgeCases": "Multi-digit counts, nested brackets, adjacent encoded groups, plain letters, deeply nested expression.",
      "constraints": "1 <= s.length <= 30; input is valid; decoded output length fits platform limits.",
      "source": {
        "label": "Decode String - LeetCode 394",
        "url": "https://leetcode.com/problems/decode-string/"
      },
      "examples": [
        {
          "input": "s = \"3[a]2[bc]\"",
          "output": "\"aaabcbc\"",
          "explanation": "Repeat a three times and bc two times."
        },
        {
          "input": "s = \"3[a2[c]]\"",
          "output": "\"accaccacc\"",
          "explanation": "The nested c group decodes before repeating a2[c]."
        },
        {
          "input": "s = \"2[abc]3[cd]ef\"",
          "output": "\"abcabccdcdcdef\"",
          "explanation": "Plain suffix ef remains as-is."
        }
      ],
      "bruteForceComplexity": "Time O(n * decodedLength) in repeated substring replacement; Space O(decodedLength).",
      "optimizedComplexity": "Time O(n + decodedLength); Space O(n + decodedLength). Iterative stacks hold counts and partial strings.",
      "recursiveComplexity": "Time O(n + decodedLength); Space O(depth + decodedLength). Recursive parser consumes each input character once.",
      "bruteForceCode": "class Solution {\n  public String decodeString(String s) {\n    while (s.contains(\"[\")) {\n      int close = s.indexOf(']');\n      int open = close;\n      while (s.charAt(open) != '[') open--;\n      int start = open - 1;\n      while (start >= 0 && Character.isDigit(s.charAt(start))) start--;\n\n      int count = Integer.parseInt(s.substring(start + 1, open));\n      String repeated = s.substring(open + 1, close).repeat(count);\n      s = s.substring(0, start + 1) + repeated + s.substring(close + 1);\n    }\n    return s;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> builders = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int count = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        counts.push(count);\n        builders.push(current);\n        current = new StringBuilder();\n        count = 0;\n      } else if (ch == ']') {\n        StringBuilder parent = builders.pop();\n        int repeat = counts.pop();\n        for (int i = 0; i < repeat; i++) parent.append(current);\n        current = parent;\n      } else {\n        current.append(ch);\n      }\n    }\n\n    return current.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index = 0;\n\n  public String decodeString(String s) {\n    return parse(s);\n  }\n\n  private String parse(String s) {\n    StringBuilder answer = new StringBuilder();\n    int count = 0;\n\n    while (index < s.length() && s.charAt(index) != ']') {\n      char ch = s.charAt(index++);\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        String inner = parse(s);\n        index++;\n        for (int i = 0; i < count; i++) answer.append(inner);\n        count = 0;\n      } else {\n        answer.append(ch);\n      }\n    }\n\n    return answer.toString();\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> builders = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int count = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        counts.push(count);\n        builders.push(current);\n        current = new StringBuilder();\n        count = 0;\n      } else if (ch == ']') {\n        StringBuilder parent = builders.pop();\n        int repeat = counts.pop();\n        for (int i = 0; i < repeat; i++) parent.append(current);\n        current = parent;\n      } else {\n        current.append(ch);\n      }\n    }\n\n    return current.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> builders = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int count = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        counts.push(count);\n        builders.push(current);\n        current = new StringBuilder();\n        count = 0;\n      } else if (ch == ']') {\n        StringBuilder parent = builders.pop();\n        int repeat = counts.pop();\n        for (int i = 0; i < repeat; i++) parent.append(current);\n        current = parent;\n      } else {\n        current.append(ch);\n      }\n    }\n\n    return current.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Different Ways to Add Parentheses",
      "difficulty": "Medium",
      "subpattern": "Divide-and-conquer expression recursion",
      "question": "Given a string expression of numbers and operators +, -, *, return all possible results from computing every different parenthesization.",
      "trigger": "Each operator can be the final operation; left and right sides become independent recursive subexpressions.",
      "intuition": "Split at every operator. Combine every result from the left side with every result from the right side.",
      "edgeCases": "Single number, multi-digit numbers, repeated operators, negative intermediate results, duplicate result values are allowed.",
      "constraints": "1 <= expression.length <= 20; expression contains digits and +, -, * operators.",
      "source": {
        "label": "Different Ways to Add Parentheses - LeetCode 241",
        "url": "https://leetcode.com/problems/different-ways-to-add-parentheses/"
      },
      "examples": [
        {
          "input": "expression = \"2-1-1\"",
          "output": "[0,2]",
          "explanation": "((2-1)-1)=0 and (2-(1-1))=2."
        },
        {
          "input": "expression = \"2*3-4*5\"",
          "output": "[-34,-14,-10,-10,10]",
          "explanation": "Different split points create different results."
        },
        {
          "input": "expression = \"11\"",
          "output": "[11]",
          "explanation": "A number without operators evaluates to itself."
        }
      ],
      "bruteForceComplexity": "Time exponential in operators; Space exponential for result lists. Plain recursion recomputes substrings.",
      "optimizedComplexity": "Time O(n^3 * r) depending on result combinations; Space O(n^2 * r). Bottom-up interval DP stores expression ranges.",
      "recursiveComplexity": "Time O(n^3 * r) with memoized substring results; Space O(n^2 * r).",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> diffWaysToCompute(String expression) {\n    List<Integer> answer = new ArrayList<>();\n    for (int i = 0; i < expression.length(); i++) {\n      char op = expression.charAt(i);\n      if (op != '+' && op != '-' && op != '*') continue;\n      for (int left : diffWaysToCompute(expression.substring(0, i))) {\n        for (int right : diffWaysToCompute(expression.substring(i + 1))) {\n          answer.add(apply(left, right, op));\n        }\n      }\n    }\n    if (answer.isEmpty()) answer.add(Integer.parseInt(expression));\n    return answer;\n  }\n\n  private int apply(int left, int right, char op) {\n    if (op == '+') return left + right;\n    if (op == '-') return left - right;\n    return left * right;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> diffWaysToCompute(String expression) {\n    List<Integer> nums = new ArrayList<>();\n    List<Character> ops = new ArrayList<>();\n    for (int i = 0; i < expression.length();) {\n      if (Character.isDigit(expression.charAt(i))) {\n        int value = 0;\n        while (i < expression.length() && Character.isDigit(expression.charAt(i))) {\n          value = value * 10 + expression.charAt(i++) - '0';\n        }\n        nums.add(value);\n      } else {\n        ops.add(expression.charAt(i++));\n      }\n    }\n\n    int n = nums.size();\n    List<Integer>[][] dp = new ArrayList[n][n];\n    for (int i = 0; i < n; i++) {\n      dp[i][i] = new ArrayList<>();\n      dp[i][i].add(nums.get(i));\n    }\n    for (int len = 2; len <= n; len++) {\n      for (int left = 0; left + len - 1 < n; left++) {\n        int right = left + len - 1;\n        dp[left][right] = new ArrayList<>();\n        for (int split = left; split < right; split++) {\n          for (int a : dp[left][split]) {\n            for (int b : dp[split + 1][right]) {\n              dp[left][right].add(apply(a, b, ops.get(split)));\n            }\n          }\n        }\n      }\n    }\n    return dp[0][n - 1];\n  }\n\n  private int apply(int left, int right, char op) {\n    if (op == '+') return left + right;\n    if (op == '-') return left - right;\n    return left * right;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final Map<String, List<Integer>> memo = new HashMap<>();\n\n  public List<Integer> diffWaysToCompute(String expression) {\n    if (memo.containsKey(expression)) return memo.get(expression);\n\n    List<Integer> answer = new ArrayList<>();\n    for (int i = 0; i < expression.length(); i++) {\n      char op = expression.charAt(i);\n      if (op != '+' && op != '-' && op != '*') continue;\n      for (int left : diffWaysToCompute(expression.substring(0, i))) {\n        for (int right : diffWaysToCompute(expression.substring(i + 1))) {\n          answer.add(apply(left, right, op));\n        }\n      }\n    }\n    if (answer.isEmpty()) answer.add(Integer.parseInt(expression));\n    memo.put(expression, answer);\n    return answer;\n  }\n\n  private int apply(int left, int right, char op) {\n    if (op == '+') return left + right;\n    if (op == '-') return left - right;\n    return left * right;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> diffWaysToCompute(String expression) {\n    List<Integer> nums = new ArrayList<>();\n    List<Character> ops = new ArrayList<>();\n    for (int i = 0; i < expression.length();) {\n      if (Character.isDigit(expression.charAt(i))) {\n        int value = 0;\n        while (i < expression.length() && Character.isDigit(expression.charAt(i))) {\n          value = value * 10 + expression.charAt(i++) - '0';\n        }\n        nums.add(value);\n      } else {\n        ops.add(expression.charAt(i++));\n      }\n    }\n\n    int n = nums.size();\n    List<Integer>[][] dp = new ArrayList[n][n];\n    for (int i = 0; i < n; i++) {\n      dp[i][i] = new ArrayList<>();\n      dp[i][i].add(nums.get(i));\n    }\n    for (int len = 2; len <= n; len++) {\n      for (int left = 0; left + len - 1 < n; left++) {\n        int right = left + len - 1;\n        dp[left][right] = new ArrayList<>();\n        for (int split = left; split < right; split++) {\n          for (int a : dp[left][split]) {\n            for (int b : dp[split + 1][right]) {\n              dp[left][right].add(apply(a, b, ops.get(split)));\n            }\n          }\n        }\n      }\n    }\n    return dp[0][n - 1];\n  }\n\n  private int apply(int left, int right, char op) {\n    if (op == '+') return left + right;\n    if (op == '-') return left - right;\n    return left * right;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> diffWaysToCompute(String expression) {\n    List<Integer> nums = new ArrayList<>();\n    List<Character> ops = new ArrayList<>();\n    for (int i = 0; i < expression.length();) {\n      if (Character.isDigit(expression.charAt(i))) {\n        int value = 0;\n        while (i < expression.length() && Character.isDigit(expression.charAt(i))) {\n          value = value * 10 + expression.charAt(i++) - '0';\n        }\n        nums.add(value);\n      } else {\n        ops.add(expression.charAt(i++));\n      }\n    }\n\n    int n = nums.size();\n    List<Integer>[][] dp = new ArrayList[n][n];\n    for (int i = 0; i < n; i++) {\n      dp[i][i] = new ArrayList<>();\n      dp[i][i].add(nums.get(i));\n    }\n    for (int len = 2; len <= n; len++) {\n      for (int left = 0; left + len - 1 < n; left++) {\n        int right = left + len - 1;\n        dp[left][right] = new ArrayList<>();\n        for (int split = left; split < right; split++) {\n          for (int a : dp[left][split]) {\n            for (int b : dp[split + 1][right]) {\n              dp[left][right].add(apply(a, b, ops.get(split)));\n            }\n          }\n        }\n      }\n    }\n    return dp[0][n - 1];\n  }\n\n  private int apply(int left, int right, char op) {\n    if (op == '+') return left + right;\n    if (op == '-') return left - right;\n    return left * right;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Beautiful Arrangement",
      "difficulty": "Medium",
      "subpattern": "Recursive permutation counting with bitmask state",
      "question": "Given n, count the number of beautiful arrangements of numbers 1 to n where at position i either perm[i] is divisible by i or i is divisible by perm[i].",
      "trigger": "Each position chooses one unused number that satisfies a local divisibility constraint.",
      "intuition": "Fill positions from 1 to n. Track used numbers with a bitmask, and count valid choices recursively.",
      "edgeCases": "n = 1, position indexing starts at 1, all numbers used, bitmask updates, factorial search space without pruning.",
      "constraints": "1 <= n <= 15.",
      "source": {
        "label": "Beautiful Arrangement - LeetCode 526",
        "url": "https://leetcode.com/problems/beautiful-arrangement/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "2",
          "explanation": "[1,2] and [2,1] are both valid."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "Only one arrangement exists."
        },
        {
          "input": "n = 3",
          "output": "3",
          "explanation": "Three permutations satisfy the divisibility rule."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n); Space O(n). Generate all permutations and validate each.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(2^n). Iterative DP over used-number masks.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(2^n + n). Memoized recursion counts each mask state once.",
      "bruteForceCode": "class Solution {\n  public int countArrangement(int n) {\n    int[] nums = new int[n];\n    for (int i = 0; i < n; i++) nums[i] = i + 1;\n    return permute(nums, 0);\n  }\n\n  private int permute(int[] nums, int index) {\n    if (index == nums.length) return valid(nums) ? 1 : 0;\n    int count = 0;\n    for (int i = index; i < nums.length; i++) {\n      swap(nums, index, i);\n      count += permute(nums, index + 1);\n      swap(nums, index, i);\n    }\n    return count;\n  }\n\n  private boolean valid(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n      int position = i + 1;\n      if (nums[i] % position != 0 && position % nums[i] != 0) return false;\n    }\n    return true;\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int countArrangement(int n) {\n    int totalMasks = 1 << n;\n    int[] dp = new int[totalMasks];\n    dp[0] = 1;\n\n    for (int mask = 0; mask < totalMasks; mask++) {\n      int position = Integer.bitCount(mask) + 1;\n      for (int num = 1; num <= n; num++) {\n        int bit = 1 << (num - 1);\n        if ((mask & bit) != 0) continue;\n        if (num % position == 0 || position % num == 0) {\n          dp[mask | bit] += dp[mask];\n        }\n      }\n    }\n\n    return dp[totalMasks - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countArrangement(int n) {\n    int[] memo = new int[1 << n];\n    Arrays.fill(memo, -1);\n    return dfs(n, 1, 0, memo);\n  }\n\n  private int dfs(int n, int position, int mask, int[] memo) {\n    if (position > n) return 1;\n    if (memo[mask] != -1) return memo[mask];\n\n    int count = 0;\n    for (int num = 1; num <= n; num++) {\n      int bit = 1 << (num - 1);\n      if ((mask & bit) != 0) continue;\n      if (num % position == 0 || position % num == 0) {\n        count += dfs(n, position + 1, mask | bit, memo);\n      }\n    }\n    memo[mask] = count;\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countArrangement(int n) {\n    int totalMasks = 1 << n;\n    int[] dp = new int[totalMasks];\n    dp[0] = 1;\n\n    for (int mask = 0; mask < totalMasks; mask++) {\n      int position = Integer.bitCount(mask) + 1;\n      for (int num = 1; num <= n; num++) {\n        int bit = 1 << (num - 1);\n        if ((mask & bit) != 0) continue;\n        if (num % position == 0 || position % num == 0) {\n          dp[mask | bit] += dp[mask];\n        }\n      }\n    }\n\n    return dp[totalMasks - 1];\n  }\n}",
      "code": "class Solution {\n  public int countArrangement(int n) {\n    int totalMasks = 1 << n;\n    int[] dp = new int[totalMasks];\n    dp[0] = 1;\n\n    for (int mask = 0; mask < totalMasks; mask++) {\n      int position = Integer.bitCount(mask) + 1;\n      for (int num = 1; num <= n; num++) {\n        int bit = 1 << (num - 1);\n        if ((mask & bit) != 0) continue;\n        if (num % position == 0 || position % num == 0) {\n          dp[mask | bit] += dp[mask];\n        }\n      }\n    }\n\n    return dp[totalMasks - 1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Regular Expression Matching",
      "difficulty": "Hard",
      "subpattern": "Recursive pattern matching with memoization",
      "question": "Given strings s and p, return true if p matches the entire string s. Dot matches any single character and star matches zero or more of the previous element.",
      "trigger": "A star creates a recursive branch: skip the starred token or consume one matching character and stay on the same pattern token.",
      "intuition": "Match current characters, then handle whether p[j + 1] is star. Memoize indexes i and j.",
      "edgeCases": "Empty string, empty pattern, star matching zero characters, dot with star, full-string match only, repeated stars in valid pattern form.",
      "constraints": "1 <= s.length <= 20; 1 <= p.length <= 20; pattern uses lowercase letters, dot, and star with valid star placement.",
      "source": {
        "label": "Regular Expression Matching - LeetCode 10",
        "url": "https://leetcode.com/problems/regular-expression-matching/"
      },
      "examples": [
        {
          "input": "s = \"aa\", p = \"a\"",
          "output": "false",
          "explanation": "The pattern matches only one a."
        },
        {
          "input": "s = \"aa\", p = \"a*\"",
          "output": "true",
          "explanation": "Star repeats a twice."
        },
        {
          "input": "s = \"ab\", p = \".*\"",
          "output": "true",
          "explanation": "Dot-star can consume both characters."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(s.length + p.length). Plain recursion explores repeated star branches.",
      "optimizedComplexity": "Time O(m*n); Space O(m*n). Iterative DP fills match states by suffix indexes.",
      "recursiveComplexity": "Time O(m*n); Space O(m*n). Memoized recursion caches each pair of indexes.",
      "bruteForceCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    return match(s, p, 0, 0);\n  }\n\n  private boolean match(String s, String p, int i, int j) {\n    if (j == p.length()) return i == s.length();\n\n    boolean first = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n    if (j + 1 < p.length() && p.charAt(j + 1) == '*') {\n      return match(s, p, i, j + 2) || (first && match(s, p, i + 1, j));\n    }\n    return first && match(s, p, i + 1, j + 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length(), n = p.length();\n    boolean[][] dp = new boolean[m + 1][n + 1];\n    dp[m][n] = true;\n\n    for (int i = m; i >= 0; i--) {\n      for (int j = n - 1; j >= 0; j--) {\n        boolean first = i < m && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n        if (j + 1 < n && p.charAt(j + 1) == '*') {\n          dp[i][j] = dp[i][j + 2] || (first && dp[i + 1][j]);\n        } else {\n          dp[i][j] = first && dp[i + 1][j + 1];\n        }\n      }\n    }\n\n    return dp[0][0];\n  }\n}",
      "recursiveCode": "class Solution {\n  private Boolean[][] memo;\n\n  public boolean isMatch(String s, String p) {\n    memo = new Boolean[s.length() + 1][p.length() + 1];\n    return dfs(s, p, 0, 0);\n  }\n\n  private boolean dfs(String s, String p, int i, int j) {\n    if (memo[i][j] != null) return memo[i][j];\n    if (j == p.length()) return memo[i][j] = i == s.length();\n\n    boolean first = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n    if (j + 1 < p.length() && p.charAt(j + 1) == '*') {\n      memo[i][j] = dfs(s, p, i, j + 2) || (first && dfs(s, p, i + 1, j));\n    } else {\n      memo[i][j] = first && dfs(s, p, i + 1, j + 1);\n    }\n    return memo[i][j];\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length(), n = p.length();\n    boolean[][] dp = new boolean[m + 1][n + 1];\n    dp[m][n] = true;\n\n    for (int i = m; i >= 0; i--) {\n      for (int j = n - 1; j >= 0; j--) {\n        boolean first = i < m && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n        if (j + 1 < n && p.charAt(j + 1) == '*') {\n          dp[i][j] = dp[i][j + 2] || (first && dp[i + 1][j]);\n        } else {\n          dp[i][j] = first && dp[i + 1][j + 1];\n        }\n      }\n    }\n\n    return dp[0][0];\n  }\n}",
      "code": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length(), n = p.length();\n    boolean[][] dp = new boolean[m + 1][n + 1];\n    dp[m][n] = true;\n\n    for (int i = m; i >= 0; i--) {\n      for (int j = n - 1; j >= 0; j--) {\n        boolean first = i < m && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n        if (j + 1 < n && p.charAt(j + 1) == '*') {\n          dp[i][j] = dp[i][j + 2] || (first && dp[i + 1][j]);\n        } else {\n          dp[i][j] = first && dp[i + 1][j + 1];\n        }\n      }\n    }\n\n    return dp[0][0];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Parse Boolean Expression",
      "difficulty": "Hard",
      "subpattern": "Recursive parsing of nested logical expressions",
      "question": "Given a valid boolean expression using t, f, !, &, |, parentheses, and commas, return its boolean value.",
      "trigger": "Each operator owns a parenthesized list of operands, and operands can themselves be nested expressions.",
      "intuition": "Parse one expression at a time. Literals return immediately; operators recursively parse operands until their closing parenthesis.",
      "edgeCases": "Single literal, not operator, nested operators, many operands for & or |, commas between operands, deeply nested expression.",
      "constraints": "1 <= expression.length <= 20000; expression is valid and contains t, f, !, &, |, parentheses, and commas.",
      "source": {
        "label": "Parsing A Boolean Expression - LeetCode 1106",
        "url": "https://leetcode.com/problems/parsing-a-boolean-expression/"
      },
      "examples": [
        {
          "input": "expression = \"&(|(f))\"",
          "output": "false",
          "explanation": "|(f) is false, so &(false) is false."
        },
        {
          "input": "expression = \"|(f,f,f,t)\"",
          "output": "true",
          "explanation": "OR is true because one operand is true."
        },
        {
          "input": "expression = \"!(&(f,t))\"",
          "output": "true",
          "explanation": "&(f,t) is false, and not false is true."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) worst case from repeated substring splitting; Space O(n).",
      "optimizedComplexity": "Time O(n); Space O(n). Iterative stack evaluates when a closing parenthesis is reached.",
      "recursiveComplexity": "Time O(n); Space O(depth). Recursive parser consumes each character once.",
      "bruteForceCode": "class Solution {\n  public boolean parseBoolExpr(String expression) {\n    if (expression.equals(\"t\")) return true;\n    if (expression.equals(\"f\")) return false;\n\n    char op = expression.charAt(0);\n    String inside = expression.substring(2, expression.length() - 1);\n    if (op == '!') return !parseBoolExpr(inside);\n\n    boolean result = op == '&';\n    int start = 0;\n    int depth = 0;\n    for (int i = 0; i <= inside.length(); i++) {\n      if (i == inside.length() || (inside.charAt(i) == ',' && depth == 0)) {\n        boolean value = parseBoolExpr(inside.substring(start, i));\n        result = op == '&' ? result && value : result || value;\n        start = i + 1;\n      } else if (inside.charAt(i) == '(') depth++;\n      else if (inside.charAt(i) == ')') depth--;\n    }\n    return result;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean parseBoolExpr(String expression) {\n    Deque<Character> stack = new ArrayDeque<>();\n\n    for (char ch : expression.toCharArray()) {\n      if (ch == ',' || ch == '(') continue;\n      if (ch != ')') {\n        stack.push(ch);\n        continue;\n      }\n\n      int trueCount = 0;\n      int falseCount = 0;\n      while (stack.peek() != '!' && stack.peek() != '&' && stack.peek() != '|') {\n        if (stack.pop() == 't') trueCount++;\n        else falseCount++;\n      }\n      char op = stack.pop();\n      if (op == '!') stack.push(falseCount == 1 ? 't' : 'f');\n      else if (op == '&') stack.push(falseCount == 0 ? 't' : 'f');\n      else stack.push(trueCount > 0 ? 't' : 'f');\n    }\n\n    return stack.pop() == 't';\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index = 0;\n\n  public boolean parseBoolExpr(String expression) {\n    return parse(expression);\n  }\n\n  private boolean parse(String s) {\n    char ch = s.charAt(index++);\n    if (ch == 't') return true;\n    if (ch == 'f') return false;\n\n    index++;\n    if (ch == '!') {\n      boolean value = !parse(s);\n      index++;\n      return value;\n    }\n\n    boolean result = ch == '&';\n    while (s.charAt(index) != ')') {\n      if (s.charAt(index) == ',') {\n        index++;\n        continue;\n      }\n      boolean value = parse(s);\n      result = ch == '&' ? result && value : result || value;\n    }\n    index++;\n    return result;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean parseBoolExpr(String expression) {\n    Deque<Character> stack = new ArrayDeque<>();\n\n    for (char ch : expression.toCharArray()) {\n      if (ch == ',' || ch == '(') continue;\n      if (ch != ')') {\n        stack.push(ch);\n        continue;\n      }\n\n      int trueCount = 0;\n      int falseCount = 0;\n      while (stack.peek() != '!' && stack.peek() != '&' && stack.peek() != '|') {\n        if (stack.pop() == 't') trueCount++;\n        else falseCount++;\n      }\n      char op = stack.pop();\n      if (op == '!') stack.push(falseCount == 1 ? 't' : 'f');\n      else if (op == '&') stack.push(falseCount == 0 ? 't' : 'f');\n      else stack.push(trueCount > 0 ? 't' : 'f');\n    }\n\n    return stack.pop() == 't';\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean parseBoolExpr(String expression) {\n    Deque<Character> stack = new ArrayDeque<>();\n\n    for (char ch : expression.toCharArray()) {\n      if (ch == ',' || ch == '(') continue;\n      if (ch != ')') {\n        stack.push(ch);\n        continue;\n      }\n\n      int trueCount = 0;\n      int falseCount = 0;\n      while (stack.peek() != '!' && stack.peek() != '&' && stack.peek() != '|') {\n        if (stack.pop() == 't') trueCount++;\n        else falseCount++;\n      }\n      char op = stack.pop();\n      if (op == '!') stack.push(falseCount == 1 ? 't' : 'f');\n      else if (op == '&') stack.push(falseCount == 0 ? 't' : 'f');\n      else stack.push(trueCount > 0 ? 't' : 'f');\n    }\n\n    return stack.pop() == 't';\n  }\n}"
    }
  ],
  "checklist": [
    "A smaller version of the same problem appears after one choice or split.",
    "The statement has natural base cases such as empty, one node, one index, or completed path.",
    "A tree, linked list, nested expression, or grid path asks you to process one node/cell/token and delegate the rest.",
    "Naive branching repeats states, so memoization or pruning may be needed.",
    "The answer is built from child answers, remaining target, or path state."
  ],
  "traps": [
    "Missing the base case before making recursive calls.",
    "Forgetting to restore path, visited, or constraint state after a branch.",
    "Using parent-only checks when ancestor bounds are required.",
    "Letting recursion duplicate overlapping subproblems without memoization.",
    "Ignoring stack depth for skewed trees, long strings, or large indexes."
  ],
  "edgeCases": [
    "Empty input or null node when allowed.",
    "Single element, single node, or one-character expression.",
    "Duplicate-looking states that require memoization.",
    "Deeply nested input and skewed trees.",
    "Boundary values such as Integer.MIN_VALUE and Integer.MAX_VALUE."
  ],
  "complexities": [
    "Linear recursion over a list/tree is usually O(n) time with O(depth) stack.",
    "Binary branching without memoization often grows as O(2^n) or worse.",
    "Backtracking complexity is tied to the number of valid or attempted states.",
    "Memoized recursion usually becomes number of states times transition cost.",
    "Divide-and-conquer stack space is O(log n) when splits are balanced and O(n) when skewed."
  ],
  "mentalModel": [
    "Define the state in one sentence before coding.",
    "Write base cases before recursive cases.",
    "Make one choice, recurse on the smaller state, then undo the choice if state was mutated.",
    "Ask whether repeated states need memoization.",
    "Complexity equals number of states times work per state."
  ],
  "revisionStrategy": [
    "Revise the 12 core problems first: base recurrence, linked list recursion, generation, and tree recursion.",
    "Redo Fibonacci, Climbing Stairs, Pow, and Reverse String after 24 hours to lock base-case thinking.",
    "Practice one tree recursion and one generation recursion in every session.",
    "For hard problems, write the state tuple first, then code memoization or backtracking cleanup.",
    "After solving, name the exact stack depth and whether repeated states exist."
  ],
  "unseen": [
    "Given a nested ternary expression, evaluate it.",
    "Return all root-to-leaf paths whose product is divisible by k.",
    "Count ways to tile a 2 x n board with dominoes and trominoes.",
    "Given a string with nested brackets and weights, compute its score.",
    "Generate all valid abbreviations of a word."
  ]
};
