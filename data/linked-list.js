const CURRENT_PATTERN = {
  "id": "linked-list",
  "name": "Linked List",
  "summary": "Fast-slow pointers, reversal, merge, dummy nodes.",
  "complete": true,
  "subpatterns": [
    "Core Linked List recognition",
    "Boundary handling in Linked List",
    "Optimized iterative Linked List",
    "Recursive or DFS-style Linked List",
    "Advanced Linked List variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Reverse Linked List",
      "difficulty": "Easy",
      "subpattern": "Fast-slow pointers",
      "question": "Solve Reverse Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Reverse Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Reverse%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseLinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseLinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge Two Sorted Lists",
      "difficulty": "Easy",
      "subpattern": "reversal",
      "question": "Solve Merge Two Sorted Lists using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Merge Two Sorted Lists - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Merge%20Two%20Sorted%20Lists"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeTwoSortedLists(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeTwoSortedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeTwoSortedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeTwoSortedLists(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeTwoSortedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Linked List Cycle",
      "difficulty": "Easy",
      "subpattern": "merge",
      "question": "Solve Linked List Cycle using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes merge and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for merge and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Linked List Cycle - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Linked%20List%20Cycle"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycle(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycle(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycle(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycle(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycle(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Linked List Cycle II",
      "difficulty": "Easy",
      "subpattern": "dummy nodes.",
      "question": "Solve Linked List Cycle II using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes dummy nodes. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for dummy nodes. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Linked List Cycle II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Linked%20List%20Cycle%20II"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycleIi(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycleIi(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycleIi(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycleIi(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode linkedListCycleIi(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Middle of the Linked List",
      "difficulty": "Easy",
      "subpattern": "Fast-slow pointers",
      "question": "Solve Middle of the Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Middle of the Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Middle%20of%20the%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode middleOfTheLinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode middleOfTheLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode middleOfTheLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode middleOfTheLinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode middleOfTheLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Remove Nth Node From End of List",
      "difficulty": "Easy",
      "subpattern": "reversal",
      "question": "Solve Remove Nth Node From End of List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Remove Nth Node From End of List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Remove%20Nth%20Node%20From%20End%20of%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeNthNodeFromEndOfList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeNthNodeFromEndOfList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeNthNodeFromEndOfList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeNthNodeFromEndOfList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeNthNodeFromEndOfList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reorder List",
      "difficulty": "Easy",
      "subpattern": "merge",
      "question": "Solve Reorder List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes merge and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for merge and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Reorder List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Reorder%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reorderList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reorderList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reorderList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reorderList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reorderList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Add Two Numbers",
      "difficulty": "Easy",
      "subpattern": "dummy nodes.",
      "question": "Solve Add Two Numbers using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes dummy nodes. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for dummy nodes. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Add Two Numbers - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Add%20Two%20Numbers"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode addTwoNumbers(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode addTwoNumbers(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode addTwoNumbers(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode addTwoNumbers(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode addTwoNumbers(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Palindrome Linked List",
      "difficulty": "Easy",
      "subpattern": "Fast-slow pointers",
      "question": "Solve Palindrome Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Palindrome Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Palindrome%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode palindromeLinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode palindromeLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode palindromeLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode palindromeLinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode palindromeLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Intersection of Two Linked Lists",
      "difficulty": "Easy",
      "subpattern": "reversal",
      "question": "Solve Intersection of Two Linked Lists using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Intersection of Two Linked Lists - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Intersection%20of%20Two%20Linked%20Lists"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode intersectionOfTwoLinkedLists(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode intersectionOfTwoLinkedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode intersectionOfTwoLinkedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode intersectionOfTwoLinkedLists(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode intersectionOfTwoLinkedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Swap Nodes in Pairs",
      "difficulty": "Medium",
      "subpattern": "merge",
      "question": "Solve Swap Nodes in Pairs using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes merge and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for merge and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Swap Nodes in Pairs - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Swap%20Nodes%20in%20Pairs"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode swapNodesInPairs(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode swapNodesInPairs(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode swapNodesInPairs(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode swapNodesInPairs(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode swapNodesInPairs(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reverse Nodes in k-Group",
      "difficulty": "Medium",
      "subpattern": "dummy nodes.",
      "question": "Solve Reverse Nodes in k-Group using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes dummy nodes. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for dummy nodes. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Reverse Nodes in k-Group - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Reverse%20Nodes%20in%20k-Group"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseNodesInKGroup(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseNodesInKGroup(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseNodesInKGroup(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseNodesInKGroup(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode reverseNodesInKGroup(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Rotate List",
      "difficulty": "Medium",
      "subpattern": "Fast-slow pointers",
      "question": "Solve Rotate List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Rotate List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Rotate%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode rotateList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode rotateList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode rotateList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode rotateList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode rotateList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Partition List",
      "difficulty": "Medium",
      "subpattern": "reversal",
      "question": "Solve Partition List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Partition List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Partition%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode partitionList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode partitionList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode partitionList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode partitionList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode partitionList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Odd Even Linked List",
      "difficulty": "Medium",
      "subpattern": "merge",
      "question": "Solve Odd Even Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes merge and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for merge and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Odd Even Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Odd%20Even%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode oddEvenLinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode oddEvenLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode oddEvenLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode oddEvenLinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode oddEvenLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Copy List with Random Pointer",
      "difficulty": "Medium",
      "subpattern": "dummy nodes.",
      "question": "Solve Copy List with Random Pointer using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes dummy nodes. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for dummy nodes. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Copy List with Random Pointer - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Copy%20List%20with%20Random%20Pointer"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode copyListWithRandomPointer(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode copyListWithRandomPointer(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode copyListWithRandomPointer(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode copyListWithRandomPointer(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode copyListWithRandomPointer(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sort List",
      "difficulty": "Medium",
      "subpattern": "Fast-slow pointers",
      "question": "Solve Sort List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sort List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sort%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode sortList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode sortList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode sortList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode sortList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode sortList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Merge k Sorted Lists",
      "difficulty": "Medium",
      "subpattern": "reversal",
      "question": "Solve Merge k Sorted Lists using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Merge k Sorted Lists - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Merge%20k%20Sorted%20Lists"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeKSortedLists(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeKSortedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeKSortedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeKSortedLists(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode mergeKSortedLists(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Flatten a Multilevel Doubly Linked List",
      "difficulty": "Medium",
      "subpattern": "merge",
      "question": "Solve Flatten a Multilevel Doubly Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes merge and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for merge and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Flatten a Multilevel Doubly Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Flatten%20a%20Multilevel%20Doubly%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode flattenAMultilevelDoublyLinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode flattenAMultilevelDoublyLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode flattenAMultilevelDoublyLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode flattenAMultilevelDoublyLinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode flattenAMultilevelDoublyLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Delete Node in a Linked List",
      "difficulty": "Medium",
      "subpattern": "dummy nodes.",
      "question": "Solve Delete Node in a Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes dummy nodes. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for dummy nodes. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Delete Node in a Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Delete%20Node%20in%20a%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode deleteNodeInALinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode deleteNodeInALinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode deleteNodeInALinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode deleteNodeInALinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode deleteNodeInALinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Remove Linked List Elements",
      "difficulty": "Medium",
      "subpattern": "Fast-slow pointers",
      "question": "Solve Remove Linked List Elements using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Remove Linked List Elements - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Remove%20Linked%20List%20Elements"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeLinkedListElements(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeLinkedListElements(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeLinkedListElements(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeLinkedListElements(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeLinkedListElements(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Remove Duplicates from Sorted List",
      "difficulty": "Medium",
      "subpattern": "reversal",
      "question": "Solve Remove Duplicates from Sorted List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Remove Duplicates from Sorted List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Remove%20Duplicates%20from%20Sorted%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Remove Duplicates from Sorted List II",
      "difficulty": "Medium",
      "subpattern": "merge",
      "question": "Solve Remove Duplicates from Sorted List II using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes merge and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for merge and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Remove Duplicates from Sorted List II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Remove%20Duplicates%20from%20Sorted%20List%20II"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedListIi(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedListIi(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedListIi(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedListIi(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode removeDuplicatesFromSortedListIi(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Insertion Sort List",
      "difficulty": "Medium",
      "subpattern": "dummy nodes.",
      "question": "Solve Insertion Sort List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes dummy nodes. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for dummy nodes. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Insertion Sort List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Insertion%20Sort%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode insertionSortList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode insertionSortList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode insertionSortList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode insertionSortList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode insertionSortList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "LRU Cache",
      "difficulty": "Hard",
      "subpattern": "Fast-slow pointers",
      "question": "Solve LRU Cache using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "LRU Cache - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=LRU%20Cache"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode lruCache(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode lruCache(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode lruCache(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode lruCache(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode lruCache(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Design Linked List",
      "difficulty": "Hard",
      "subpattern": "reversal",
      "question": "Solve Design Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Design Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Design%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode designLinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode designLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode designLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode designLinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode designLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Split Linked List in Parts",
      "difficulty": "Hard",
      "subpattern": "merge",
      "question": "Solve Split Linked List in Parts using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes merge and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for merge and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Split Linked List in Parts - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Split%20Linked%20List%20in%20Parts"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode splitLinkedListInParts(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode splitLinkedListInParts(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode splitLinkedListInParts(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode splitLinkedListInParts(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode splitLinkedListInParts(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Next Greater Node In Linked List",
      "difficulty": "Hard",
      "subpattern": "dummy nodes.",
      "question": "Solve Next Greater Node In Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes dummy nodes. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for dummy nodes. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Next Greater Node In Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Next%20Greater%20Node%20In%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode nextGreaterNodeInLinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode nextGreaterNodeInLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode nextGreaterNodeInLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode nextGreaterNodeInLinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode nextGreaterNodeInLinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Double a Number Represented as a Linked List",
      "difficulty": "Hard",
      "subpattern": "Fast-slow pointers",
      "question": "Solve Double a Number Represented as a Linked List using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes fast-slow pointers and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for fast-slow pointers and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Double a Number Represented as a Linked List - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Double%20a%20Number%20Represented%20as%20a%20Linked%20List"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode doubleANumberRepresentedAsALinkedList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode doubleANumberRepresentedAsALinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode doubleANumberRepresentedAsALinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode doubleANumberRepresentedAsALinkedList(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode doubleANumberRepresentedAsALinkedList(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Convert Binary Number in a Linked List to Integer",
      "difficulty": "Hard",
      "subpattern": "reversal",
      "question": "Solve Convert Binary Number in a Linked List to Integer using the Linked List pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Linked List when the input structure exposes reversal and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for reversal and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Convert Binary Number in a Linked List to Integer - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Convert%20Binary%20Number%20in%20a%20Linked%20List%20to%20Integer"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[4,3,2,1]",
          "explanation": "Pointers are rewired without losing the next node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "Empty list stays empty."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "Single node has no structural change."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode convertBinaryNumberInALinkedListToInteger(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode cur = head; cur != null; cur = cur.next) values.add(cur.val);\n    ListNode dummy = new ListNode(0), tail = dummy;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      tail.next = new ListNode(values.get(i));\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode convertBinaryNumberInALinkedListToInteger(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "optimizedCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode convertBinaryNumberInALinkedListToInteger(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}",
      "recursiveCode": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode convertBinaryNumberInALinkedListToInteger(ListNode head) {\n    return reverse(head, null);\n  }\n\n  private ListNode reverse(ListNode cur, ListNode prev) {\n    if (cur == null) return prev;\n    ListNode next = cur.next;\n    cur.next = prev;\n    return reverse(next, cur);\n  }\n}",
      "code": "class Solution {\n  static class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n\n  public ListNode convertBinaryNumberInALinkedListToInteger(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n      ListNode next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    return prev;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Linked List signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Linked List problem with duplicates and boundary indexes.",
    "A Linked List problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Linked List but needs one helper structure.",
    "A maximum-constraint version of a familiar Linked List problem.",
    "A recognition test where the statement does not mention Linked List."
  ]
};
