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
      "subpattern": "Pointer reversal",
      "question": "Given the head of a singly linked list, reverse the list and return the new head.",
      "trigger": "The task asks to reverse links in a singly linked list, so each node must point to its previous node instead of its next node.",
      "intuition": "Keep previous, current, and next pointers. Save next before changing current.next, then move the window forward.",
      "edgeCases": "Empty list, one node, two nodes, long list, preserving every node without losing the remaining chain.",
      "constraints": "0 <= number of nodes <= 5000; -5000 <= Node.val <= 5000.",
      "source": {
        "label": "Reverse Linked List - LeetCode 206",
        "url": "https://leetcode.com/problems/reverse-linked-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[5,4,3,2,1]",
          "explanation": "Every next pointer is reversed."
        },
        {
          "input": "head = [1,2]",
          "output": "[2,1]",
          "explanation": "The second node becomes the new head."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "An empty list stays empty."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store values, then rewrite nodes in reverse value order.",
      "optimizedComplexity": "Time O(n); Space O(1). Reverse links in place using three pointers.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion uses one stack frame per node.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public ListNode reverseList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n\n    for (ListNode node = head; node != null; node = node.next) {\n      values.add(node.val);\n    }\n\n    ListNode node = head;\n    for (int i = values.size() - 1; i >= 0; i--) {\n      node.val = values.get(i);\n      node = node.next;\n    }\n\n    return head;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode reverseList(ListNode head) {\n    ListNode previous = null;\n    ListNode current = head;\n\n    while (current != null) {\n      ListNode next = current.next;\n      current.next = previous;\n      previous = current;\n      current = next;\n    }\n\n    return previous;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode reverseList(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    ListNode newHead = reverseList(head.next);\n    head.next.next = head;\n    head.next = null;\n\n    return newHead;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode reverseList(ListNode head) {\n    ListNode previous = null;\n    ListNode current = head;\n\n    while (current != null) {\n      ListNode next = current.next;\n      current.next = previous;\n      previous = current;\n      current = next;\n    }\n\n    return previous;\n  }\n}",
      "code": "class Solution {\n  public ListNode reverseList(ListNode head) {\n    ListNode previous = null;\n    ListNode current = head;\n\n    while (current != null) {\n      ListNode next = current.next;\n      current.next = previous;\n      previous = current;\n      current = next;\n    }\n\n    return previous;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Merge Two Sorted Lists",
      "difficulty": "Easy",
      "subpattern": "Dummy node merge",
      "question": "Given the heads of two sorted linked lists list1 and list2, merge them into one sorted list by splicing nodes together. Return the head of the merged list.",
      "trigger": "Two sorted linked lists can be merged by repeatedly choosing the smaller current node and advancing that list pointer.",
      "intuition": "Use a dummy head to avoid special handling for the first node. Attach the smaller node each step, then append the remaining list.",
      "edgeCases": "One list empty, both lists empty, duplicate values, negative values, one list exhausted early.",
      "constraints": "0 <= number of nodes in each list <= 50; -100 <= Node.val <= 100; both lists are sorted in non-decreasing order.",
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
          "explanation": "The non-empty list is returned."
        }
      ],
      "bruteForceComplexity": "Time O((m+n) log(m+n)); Space O(m+n). Copy values, sort them, and build a new list.",
      "optimizedComplexity": "Time O(m+n); Space O(1). Reuse existing nodes with a dummy merge pointer.",
      "recursiveComplexity": "Time O(m+n); Space O(m+n). Recursion advances one node per call.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    List<Integer> values = new ArrayList<>();\n\n    for (ListNode node = list1; node != null; node = node.next) values.add(node.val);\n    for (ListNode node = list2; node != null; node = node.next) values.add(node.val);\n    Collections.sort(values);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : values) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (list1 != null && list2 != null) {\n      if (list1.val <= list2.val) {\n        tail.next = list1;\n        list1 = list1.next;\n      } else {\n        tail.next = list2;\n        list2 = list2.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = list1 != null ? list1 : list2;\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    if (list1 == null) return list2;\n    if (list2 == null) return list1;\n\n    if (list1.val <= list2.val) {\n      list1.next = mergeTwoLists(list1.next, list2);\n      return list1;\n    }\n\n    list2.next = mergeTwoLists(list1, list2.next);\n    return list2;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (list1 != null && list2 != null) {\n      if (list1.val <= list2.val) {\n        tail.next = list1;\n        list1 = list1.next;\n      } else {\n        tail.next = list2;\n        list2 = list2.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = list1 != null ? list1 : list2;\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (list1 != null && list2 != null) {\n      if (list1.val <= list2.val) {\n        tail.next = list1;\n        list1 = list1.next;\n      } else {\n        tail.next = list2;\n        list2 = list2.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = list1 != null ? list1 : list2;\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Linked List Cycle",
      "difficulty": "Easy",
      "subpattern": "Fast and slow pointers",
      "question": "Given the head of a linked list, determine whether the linked list has a cycle.",
      "trigger": "Cycle detection in a linked list should avoid infinite traversal. Fast and slow pointers reveal a cycle when they meet.",
      "intuition": "Move slow by one step and fast by two steps. If there is a cycle, fast eventually laps slow; if fast reaches null, no cycle exists.",
      "edgeCases": "Empty list, one node without cycle, one node pointing to itself, cycle at head, cycle near tail.",
      "constraints": "0 <= number of nodes <= 10000; -100000 <= Node.val <= 100000; pos is internal and not passed as a parameter.",
      "source": {
        "label": "Linked List Cycle - LeetCode 141",
        "url": "https://leetcode.com/problems/linked-list-cycle/"
      },
      "examples": [
        {
          "input": "head = [3,2,0,-4], pos = 1",
          "output": "true",
          "explanation": "The tail connects to the node at index 1."
        },
        {
          "input": "head = [1,2], pos = 0",
          "output": "true",
          "explanation": "The tail connects back to the head."
        },
        {
          "input": "head = [1], pos = -1",
          "output": "false",
          "explanation": "The single node points to null."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store visited node references in a set.",
      "optimizedComplexity": "Time O(n); Space O(1). Floyd cycle detection uses two pointers only.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion tracks visited node references and call stack.",
      "bruteForceCode": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class Solution {\n  public boolean hasCycle(ListNode head) {\n    Set<ListNode> seen = new HashSet<>();\n\n    while (head != null) {\n      if (!seen.add(head)) return true;\n      head = head.next;\n    }\n\n    return false;\n  }\n}",
      "iterativeCode": "public class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n\n      if (slow == fast) return true;\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class Solution {\n  public boolean hasCycle(ListNode head) {\n    return hasCycle(head, new HashSet<>());\n  }\n\n  private boolean hasCycle(ListNode node, Set<ListNode> seen) {\n    if (node == null) return false;\n    if (!seen.add(node)) return true;\n    return hasCycle(node.next, seen);\n  }\n}",
      "optimizedCode": "public class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n\n      if (slow == fast) return true;\n    }\n\n    return false;\n  }\n}",
      "code": "public class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n\n      if (slow == fast) return true;\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Linked List Cycle II",
      "difficulty": "Medium",
      "subpattern": "Cycle entry detection",
      "question": "Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.",
      "trigger": "After fast and slow pointers meet inside a cycle, resetting one pointer to head makes both pointers meet at the cycle entry.",
      "intuition": "First detect a meeting point with Floyd. Then move one pointer from head and one from the meeting point one step at a time; their meeting node is the entry.",
      "edgeCases": "No cycle, cycle starts at head, one-node self-cycle, two-node cycle, long non-cycle prefix before cycle.",
      "constraints": "0 <= number of nodes <= 10000; -100000 <= Node.val <= 100000; pos is internal and not passed as a parameter.",
      "source": {
        "label": "Linked List Cycle II - LeetCode 142",
        "url": "https://leetcode.com/problems/linked-list-cycle-ii/"
      },
      "examples": [
        {
          "input": "head = [3,2,0,-4], pos = 1",
          "output": "tail connects to node index 1",
          "explanation": "The cycle begins at the node with value 2."
        },
        {
          "input": "head = [1,2], pos = 0",
          "output": "tail connects to node index 0",
          "explanation": "The cycle begins at the head."
        },
        {
          "input": "head = [1], pos = -1",
          "output": "no cycle",
          "explanation": "Return null because there is no cycle."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). The first repeated node reference is the cycle entry.",
      "optimizedComplexity": "Time O(n); Space O(1). Floyd detection plus entry walk uses constant extra space.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion stores visited references and uses call stack.",
      "bruteForceCode": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class Solution {\n  public ListNode detectCycle(ListNode head) {\n    Set<ListNode> seen = new HashSet<>();\n\n    while (head != null) {\n      if (!seen.add(head)) return head;\n      head = head.next;\n    }\n\n    return null;\n  }\n}",
      "iterativeCode": "public class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n\n    return null;\n  }\n}",
      "recursiveCode": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class Solution {\n  public ListNode detectCycle(ListNode head) {\n    return detectCycle(head, new HashSet<>());\n  }\n\n  private ListNode detectCycle(ListNode node, Set<ListNode> seen) {\n    if (node == null) return null;\n    if (!seen.add(node)) return node;\n    return detectCycle(node.next, seen);\n  }\n}",
      "optimizedCode": "public class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n\n    return null;\n  }\n}",
      "code": "public class Solution {\n  public ListNode detectCycle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n\n      if (slow == fast) {\n        ListNode entry = head;\n        while (entry != slow) {\n          entry = entry.next;\n          slow = slow.next;\n        }\n        return entry;\n      }\n    }\n\n    return null;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Middle of the Linked List",
      "difficulty": "Easy",
      "subpattern": "Fast and slow pointers",
      "question": "Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.",
      "trigger": "Finding the middle in one pass is a fast-slow pointer problem: fast moves twice as quickly as slow.",
      "intuition": "When fast reaches the end, slow has traveled half as many steps and points at the required middle node.",
      "edgeCases": "One node, two nodes where second middle is required, odd length, even length, long list.",
      "constraints": "1 <= number of nodes <= 100; 1 <= Node.val <= 100.",
      "source": {
        "label": "Middle of the Linked List - LeetCode 876",
        "url": "https://leetcode.com/problems/middle-of-the-linked-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[3,4,5]",
          "explanation": "Node 3 is the middle."
        },
        {
          "input": "head = [1,2,3,4,5,6]",
          "output": "[4,5,6]",
          "explanation": "There are two middles, 3 and 4; return the second."
        },
        {
          "input": "head = [1]",
          "output": "[1]",
          "explanation": "The only node is the middle."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store nodes in an array and return index n / 2.",
      "optimizedComplexity": "Time O(n); Space O(1). Fast and slow pointers find the middle in one pass.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion counts length and then recurses to the middle index.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public ListNode middleNode(ListNode head) {\n    List<ListNode> nodes = new ArrayList<>();\n\n    for (ListNode node = head; node != null; node = node.next) {\n      nodes.add(node);\n    }\n\n    return nodes.get(nodes.size() / 2);\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    return slow;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    int length = length(head);\n    return nodeAt(head, length / 2);\n  }\n\n  private int length(ListNode node) {\n    if (node == null) return 0;\n    return 1 + length(node.next);\n  }\n\n  private ListNode nodeAt(ListNode node, int index) {\n    if (index == 0) return node;\n    return nodeAt(node.next, index - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    return slow;\n  }\n}",
      "code": "class Solution {\n  public ListNode middleNode(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    return slow;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Remove Nth Node From End of List",
      "difficulty": "Medium",
      "subpattern": "Two pointers with dummy node",
      "question": "Given the head of a linked list, remove the nth node from the end of the list and return the head of the modified list.",
      "trigger": "The target is counted from the end, so keeping a fixed gap of n nodes between two pointers identifies the node before the target in one pass.",
      "intuition": "Use a dummy node before head. Move fast n steps ahead, then move fast and slow together until fast reaches the last node. slow.next is removed.",
      "edgeCases": "Remove the head, one-node list, remove the last node, n equals list length, two-node list.",
      "constraints": "1 <= number of nodes <= 30; 0 <= Node.val <= 100; 1 <= n <= number of nodes.",
      "source": {
        "label": "Remove Nth Node From End of List - LeetCode 19",
        "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4,5], n = 2",
          "output": "[1,2,3,5]",
          "explanation": "The 2nd node from the end is 4."
        },
        {
          "input": "head = [1], n = 1",
          "output": "[]",
          "explanation": "The only node is removed."
        },
        {
          "input": "head = [1,2], n = 1",
          "output": "[1]",
          "explanation": "The last node is removed."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Count length first, then remove the length - n indexed node in a second pass.",
      "optimizedComplexity": "Time O(n); Space O(1). Two pointers with a fixed gap remove the target in one pass.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion counts positions from the end using call stack.",
      "bruteForceCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n\n    ListNode dummy = new ListNode(0, head);\n    ListNode current = dummy;\n\n    for (int i = 0; i < length - n; i++) {\n      current = current.next;\n    }\n\n    current.next = current.next.next;\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode fast = dummy;\n    ListNode slow = dummy;\n\n    for (int i = 0; i < n; i++) {\n      fast = fast.next;\n    }\n\n    while (fast.next != null) {\n      fast = fast.next;\n      slow = slow.next;\n    }\n\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  private int countFromEnd;\n\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    countFromEnd = n;\n    return remove(head);\n  }\n\n  private ListNode remove(ListNode node) {\n    if (node == null) return null;\n\n    node.next = remove(node.next);\n    countFromEnd--;\n\n    if (countFromEnd == 0) return node.next;\n    return node;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode fast = dummy;\n    ListNode slow = dummy;\n\n    for (int i = 0; i < n; i++) {\n      fast = fast.next;\n    }\n\n    while (fast.next != null) {\n      fast = fast.next;\n      slow = slow.next;\n    }\n\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode fast = dummy;\n    ListNode slow = dummy;\n\n    for (int i = 0; i < n; i++) {\n      fast = fast.next;\n    }\n\n    while (fast.next != null) {\n      fast = fast.next;\n      slow = slow.next;\n    }\n\n    slow.next = slow.next.next;\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reorder List",
      "difficulty": "Medium",
      "subpattern": "Find middle, reverse second half, merge alternately",
      "question": "Given the head of a linked list L0 -> L1 -> ... -> Ln, reorder it to L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ... in place. Do not modify node values.",
      "trigger": "The target order alternates nodes from the front and back, which requires splitting the list, reversing the second half, then weaving the two halves.",
      "intuition": "Find the middle with fast/slow pointers, reverse the second half, cut the list, and merge first-half and reversed second-half nodes alternately.",
      "edgeCases": "Empty list if reused outside constraints, one node, two nodes, odd length, even length, avoiding cycles after merge.",
      "constraints": "1 <= number of nodes <= 50000; 1 <= Node.val <= 1000.",
      "source": {
        "label": "Reorder List - LeetCode 143",
        "url": "https://leetcode.com/problems/reorder-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4]",
          "output": "[1,4,2,3]",
          "explanation": "Nodes are alternated from front and back."
        },
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[1,5,2,4,3]",
          "explanation": "The middle node remains at the end."
        },
        {
          "input": "head = [1,2]",
          "output": "[1,2]",
          "explanation": "Two nodes are already in required order."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store node references in a list, then relink from both ends.",
      "optimizedComplexity": "Time O(n); Space O(1). Middle, reverse, and merge are all linear in-place operations.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion reaches the tail and pairs nodes from outside inward.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public void reorderList(ListNode head) {\n    if (head == null) return;\n\n    List<ListNode> nodes = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) nodes.add(node);\n\n    int left = 0;\n    int right = nodes.size() - 1;\n    while (left < right) {\n      nodes.get(left).next = nodes.get(right);\n      left++;\n      if (left == right) break;\n      nodes.get(right).next = nodes.get(left);\n      right--;\n    }\n\n    nodes.get(left).next = null;\n  }\n}",
      "iterativeCode": "class Solution {\n  public void reorderList(ListNode head) {\n    if (head == null || head.next == null) return;\n\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast.next != null && fast.next.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    ListNode second = reverse(slow.next);\n    slow.next = null;\n    ListNode first = head;\n\n    while (second != null) {\n      ListNode firstNext = first.next;\n      ListNode secondNext = second.next;\n      first.next = second;\n      second.next = firstNext;\n      first = firstNext;\n      second = secondNext;\n    }\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}",
      "recursiveCode": "class Solution {\n  private ListNode front;\n  private boolean stop;\n\n  public void reorderList(ListNode head) {\n    front = head;\n    stop = false;\n    reorder(head);\n  }\n\n  private void reorder(ListNode back) {\n    if (back == null) return;\n    reorder(back.next);\n\n    if (stop) return;\n    if (front == back || front.next == back) {\n      back.next = null;\n      stop = true;\n      return;\n    }\n\n    ListNode nextFront = front.next;\n    front.next = back;\n    back.next = nextFront;\n    front = nextFront;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void reorderList(ListNode head) {\n    if (head == null || head.next == null) return;\n\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast.next != null && fast.next.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    ListNode second = reverse(slow.next);\n    slow.next = null;\n    ListNode first = head;\n\n    while (second != null) {\n      ListNode firstNext = first.next;\n      ListNode secondNext = second.next;\n      first.next = second;\n      second.next = firstNext;\n      first = firstNext;\n      second = secondNext;\n    }\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}",
      "code": "class Solution {\n  public void reorderList(ListNode head) {\n    if (head == null || head.next == null) return;\n\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast.next != null && fast.next.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    ListNode second = reverse(slow.next);\n    slow.next = null;\n    ListNode first = head;\n\n    while (second != null) {\n      ListNode firstNext = first.next;\n      ListNode secondNext = second.next;\n      first.next = second;\n      second.next = firstNext;\n      first = firstNext;\n      second = secondNext;\n    }\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Add Two Numbers",
      "difficulty": "Medium",
      "subpattern": "Dummy node with carry propagation",
      "question": "Given two non-empty linked lists representing two non-negative integers in reverse digit order, add the numbers and return the sum as a linked list in reverse digit order.",
      "trigger": "Digits are already stored from least significant to most significant, so addition can proceed node by node with carry.",
      "intuition": "Use a dummy result head. At each step, add current digits plus carry, append sum % 10, and carry sum / 10 forward.",
      "edgeCases": "Different list lengths, final carry, zero values, many carry chains like 999 + 1, one list exhausted early.",
      "constraints": "1 <= number of nodes in each list <= 100; 0 <= Node.val <= 9; input numbers do not contain leading zero except number 0.",
      "source": {
        "label": "Add Two Numbers - LeetCode 2",
        "url": "https://leetcode.com/problems/add-two-numbers/"
      },
      "examples": [
        {
          "input": "l1 = [2,4,3], l2 = [5,6,4]",
          "output": "[7,0,8]",
          "explanation": "342 + 465 = 807."
        },
        {
          "input": "l1 = [0], l2 = [0]",
          "output": "[0]",
          "explanation": "0 + 0 = 0."
        },
        {
          "input": "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
          "output": "[8,9,9,9,0,0,0,1]",
          "explanation": "Carry propagates through several digits."
        }
      ],
      "bruteForceComplexity": "Time O(m+n); Space O(m+n). Build digit stacks/strings conceptually, but this can overflow if converted to primitive numbers.",
      "optimizedComplexity": "Time O(max(m,n)); Space O(max(m,n)) for the output list. Carry is tracked in constant extra state.",
      "recursiveComplexity": "Time O(max(m,n)); Space O(max(m,n)) including recursion stack and output nodes.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    List<Integer> digits = new ArrayList<>();\n    int carry = 0;\n\n    while (l1 != null || l2 != null || carry != 0) {\n      int sum = carry;\n      if (l1 != null) {\n        sum += l1.val;\n        l1 = l1.next;\n      }\n      if (l2 != null) {\n        sum += l2.val;\n        l2 = l2.next;\n      }\n      digits.add(sum % 10);\n      carry = sum / 10;\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int digit : digits) {\n      tail.next = new ListNode(digit);\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    int carry = 0;\n\n    while (l1 != null || l2 != null || carry != 0) {\n      int sum = carry;\n      if (l1 != null) {\n        sum += l1.val;\n        l1 = l1.next;\n      }\n      if (l2 != null) {\n        sum += l2.val;\n        l2 = l2.next;\n      }\n\n      tail.next = new ListNode(sum % 10);\n      tail = tail.next;\n      carry = sum / 10;\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    return add(l1, l2, 0);\n  }\n\n  private ListNode add(ListNode l1, ListNode l2, int carry) {\n    if (l1 == null && l2 == null && carry == 0) return null;\n\n    int sum = carry;\n    if (l1 != null) sum += l1.val;\n    if (l2 != null) sum += l2.val;\n\n    ListNode node = new ListNode(sum % 10);\n    node.next = add(l1 == null ? null : l1.next, l2 == null ? null : l2.next, sum / 10);\n    return node;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    int carry = 0;\n\n    while (l1 != null || l2 != null || carry != 0) {\n      int sum = carry;\n      if (l1 != null) {\n        sum += l1.val;\n        l1 = l1.next;\n      }\n      if (l2 != null) {\n        sum += l2.val;\n        l2 = l2.next;\n      }\n\n      tail.next = new ListNode(sum % 10);\n      tail = tail.next;\n      carry = sum / 10;\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    int carry = 0;\n\n    while (l1 != null || l2 != null || carry != 0) {\n      int sum = carry;\n      if (l1 != null) {\n        sum += l1.val;\n        l1 = l1.next;\n      }\n      if (l2 != null) {\n        sum += l2.val;\n        l2 = l2.next;\n      }\n\n      tail.next = new ListNode(sum % 10);\n      tail = tail.next;\n      carry = sum / 10;\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Palindrome Linked List",
      "difficulty": "Easy",
      "subpattern": "Fast-slow middle plus second-half reversal",
      "question": "Given the head of a singly linked list, return true if the list values form a palindrome, otherwise return false.",
      "trigger": "Palindrome comparison needs matching front and back values; in a singly linked list, reversing the second half enables O(1)-space comparison.",
      "intuition": "Find the middle, reverse the second half, compare first half and reversed second half node by node.",
      "edgeCases": "Empty list if reused outside constraints, one node, two equal nodes, two different nodes, odd length, even length.",
      "constraints": "1 <= number of nodes <= 100000; 0 <= Node.val <= 9.",
      "source": {
        "label": "Palindrome Linked List - LeetCode 234",
        "url": "https://leetcode.com/problems/palindrome-linked-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,2,1]",
          "output": "true",
          "explanation": "Values read the same forward and backward."
        },
        {
          "input": "head = [1,2]",
          "output": "false",
          "explanation": "The first and last values differ."
        },
        {
          "input": "head = [1,2,3,2,1]",
          "output": "true",
          "explanation": "The middle value does not need a match."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Copy values to an array and compare from both ends.",
      "optimizedComplexity": "Time O(n); Space O(1). Reverse only the second half and compare nodes.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion compares tail nodes against a moving front pointer.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public boolean isPalindrome(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    int left = 0;\n    int right = values.size() - 1;\n    while (left < right) {\n      if (!values.get(left).equals(values.get(right))) return false;\n      left++;\n      right--;\n    }\n\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPalindrome(ListNode head) {\n    if (head == null || head.next == null) return true;\n\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    ListNode second = reverse(slow);\n    ListNode first = head;\n\n    while (second != null) {\n      if (first.val != second.val) return false;\n      first = first.next;\n      second = second.next;\n    }\n\n    return true;\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}",
      "recursiveCode": "class Solution {\n  private ListNode front;\n\n  public boolean isPalindrome(ListNode head) {\n    front = head;\n    return check(head);\n  }\n\n  private boolean check(ListNode back) {\n    if (back == null) return true;\n    if (!check(back.next)) return false;\n\n    boolean same = front.val == back.val;\n    front = front.next;\n    return same;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPalindrome(ListNode head) {\n    if (head == null || head.next == null) return true;\n\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    ListNode second = reverse(slow);\n    ListNode first = head;\n\n    while (second != null) {\n      if (first.val != second.val) return false;\n      first = first.next;\n      second = second.next;\n    }\n\n    return true;\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}",
      "code": "class Solution {\n  public boolean isPalindrome(ListNode head) {\n    if (head == null || head.next == null) return true;\n\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    ListNode second = reverse(slow);\n    ListNode first = head;\n\n    while (second != null) {\n      if (first.val != second.val) return false;\n      first = first.next;\n      second = second.next;\n    }\n\n    return true;\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Intersection of Two Linked Lists",
      "difficulty": "Easy",
      "subpattern": "Two-pointer length alignment",
      "question": "Given the heads of two singly linked lists headA and headB, return the node where the two lists intersect. If the lists do not intersect, return null. Intersection is by node reference, not by value.",
      "trigger": "Two lists may have different prefix lengths before sharing the same tail. Pointer switching equalizes total distance traveled without computing lengths.",
      "intuition": "Move pointer A through list A then list B, and pointer B through list B then list A. They meet at the intersection or both reach null.",
      "edgeCases": "No intersection, intersection at head, one-node shared tail, different lengths, same values but different node objects.",
      "constraints": "0 <= number of nodes in each list <= 30000; 1 <= Node.val <= 100000; lists are acyclic.",
      "source": {
        "label": "Intersection of Two Linked Lists - LeetCode 160",
        "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/"
      },
      "examples": [
        {
          "input": "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]",
          "output": "Intersected at 8",
          "explanation": "Both lists share the node with value 8 and everything after it."
        },
        {
          "input": "intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4]",
          "output": "Intersected at 2",
          "explanation": "The shared tail starts at value 2."
        },
        {
          "input": "intersectVal = 0, listA = [2,6,4], listB = [1,5]",
          "output": "No intersection",
          "explanation": "The lists do not share node references."
        }
      ],
      "bruteForceComplexity": "Time O(m+n); Space O(m). Store nodes from one list in a set, then scan the other list.",
      "optimizedComplexity": "Time O(m+n); Space O(1). Pointer switching aligns path lengths without extra storage.",
      "recursiveComplexity": "Time O(m+n); Space O(m+n). Recursive version aligns lengths, then walks both lists together.",
      "bruteForceCode": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class Solution {\n  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    Set<ListNode> seen = new HashSet<>();\n\n    for (ListNode node = headA; node != null; node = node.next) {\n      seen.add(node);\n    }\n\n    for (ListNode node = headB; node != null; node = node.next) {\n      if (seen.contains(node)) return node;\n    }\n\n    return null;\n  }\n}",
      "iterativeCode": "public class Solution {\n  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    ListNode pointerA = headA;\n    ListNode pointerB = headB;\n\n    while (pointerA != pointerB) {\n      pointerA = pointerA == null ? headB : pointerA.next;\n      pointerB = pointerB == null ? headA : pointerB.next;\n    }\n\n    return pointerA;\n  }\n}",
      "recursiveCode": "public class Solution {\n  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    int lengthA = length(headA);\n    int lengthB = length(headB);\n\n    while (lengthA > lengthB) {\n      headA = headA.next;\n      lengthA--;\n    }\n    while (lengthB > lengthA) {\n      headB = headB.next;\n      lengthB--;\n    }\n\n    return findSameNode(headA, headB);\n  }\n\n  private int length(ListNode node) {\n    if (node == null) return 0;\n    return 1 + length(node.next);\n  }\n\n  private ListNode findSameNode(ListNode a, ListNode b) {\n    if (a == null || b == null) return null;\n    if (a == b) return a;\n    return findSameNode(a.next, b.next);\n  }\n}",
      "optimizedCode": "public class Solution {\n  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    ListNode pointerA = headA;\n    ListNode pointerB = headB;\n\n    while (pointerA != pointerB) {\n      pointerA = pointerA == null ? headB : pointerA.next;\n      pointerB = pointerB == null ? headA : pointerB.next;\n    }\n\n    return pointerA;\n  }\n}",
      "code": "public class Solution {\n  public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    ListNode pointerA = headA;\n    ListNode pointerB = headB;\n\n    while (pointerA != pointerB) {\n      pointerA = pointerA == null ? headB : pointerA.next;\n      pointerB = pointerB == null ? headA : pointerB.next;\n    }\n\n    return pointerA;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Swap Nodes in Pairs",
      "difficulty": "Medium",
      "subpattern": "Local pointer rewiring with dummy node",
      "question": "Given the head of a linked list, swap every two adjacent nodes and return the head of the modified list. You must swap nodes themselves, not just values.",
      "trigger": "The list must be changed in adjacent pairs, so each step rewires a small fixed group of two nodes while preserving the rest of the chain.",
      "intuition": "Use a dummy node before head. For each pair, keep first and second nodes, point previous to second, first to the node after the pair, and second to first.",
      "edgeCases": "Empty list, one node, odd number of nodes, even number of nodes, preserving the tail after the last swapped pair.",
      "constraints": "0 <= number of nodes <= 100; 0 <= Node.val <= 100.",
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
          "explanation": "The last unpaired node stays in place."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Copy nodes/values into a list, swap adjacent values, and rebuild or rewrite.",
      "optimizedComplexity": "Time O(n); Space O(1). Rewire each adjacent pair in place.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion swaps the first pair and recurses on the remaining list.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public ListNode swapPairs(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    for (int i = 0; i + 1 < values.size(); i += 2) {\n      int temp = values.get(i);\n      values.set(i, values.get(i + 1));\n      values.set(i + 1, temp);\n    }\n\n    ListNode node = head;\n    for (int value : values) {\n      node.val = value;\n      node = node.next;\n    }\n    return head;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode swapPairs(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode previous = dummy;\n\n    while (previous.next != null && previous.next.next != null) {\n      ListNode first = previous.next;\n      ListNode second = first.next;\n\n      first.next = second.next;\n      second.next = first;\n      previous.next = second;\n\n      previous = first;\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode swapPairs(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    ListNode second = head.next;\n    head.next = swapPairs(second.next);\n    second.next = head;\n\n    return second;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode swapPairs(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode previous = dummy;\n\n    while (previous.next != null && previous.next.next != null) {\n      ListNode first = previous.next;\n      ListNode second = first.next;\n\n      first.next = second.next;\n      second.next = first;\n      previous.next = second;\n\n      previous = first;\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode swapPairs(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode previous = dummy;\n\n    while (previous.next != null && previous.next.next != null) {\n      ListNode first = previous.next;\n      ListNode second = first.next;\n\n      first.next = second.next;\n      second.next = first;\n      previous.next = second;\n\n      previous = first;\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Reverse Nodes in k-Group",
      "difficulty": "Hard",
      "subpattern": "Fixed-size group reversal",
      "question": "Given the head of a linked list, reverse the nodes of the list k at a time and return the modified list. If the number of remaining nodes is less than k, leave them unchanged. You must not alter node values.",
      "trigger": "The operation repeats in fixed-size linked-list groups, and each complete group needs in-place pointer reversal with the previous group connected to the next one.",
      "intuition": "Before reversing, verify that k nodes exist. Reverse exactly k links, connect the previous group to the new group head, and move to the next group.",
      "edgeCases": "k = 1, list length less than k, length exactly k, final partial group, multiple full groups.",
      "constraints": "1 <= number of nodes <= 5000; 0 <= Node.val <= 1000; 1 <= k <= number of nodes.",
      "source": {
        "label": "Reverse Nodes in k-Group - LeetCode 25",
        "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4,5], k = 2",
          "output": "[2,1,4,3,5]",
          "explanation": "Pairs are reversed and the last single node remains."
        },
        {
          "input": "head = [1,2,3,4,5], k = 3",
          "output": "[3,2,1,4,5]",
          "explanation": "Only the first complete group of three is reversed."
        },
        {
          "input": "head = [1,2], k = 1",
          "output": "[1,2]",
          "explanation": "Groups of size one do not change the list."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store values, reverse values in complete k-sized blocks, and rewrite the list.",
      "optimizedComplexity": "Time O(n); Space O(1). Each node is rewired once inside a complete group.",
      "recursiveComplexity": "Time O(n); Space O(n/k). Recursion processes one complete k-sized group per call.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass Solution {\n  public ListNode reverseKGroup(ListNode head, int k) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    for (int start = 0; start + k <= values.size(); start += k) {\n      Collections.reverse(values.subList(start, start + k));\n    }\n\n    ListNode node = head;\n    for (int value : values) {\n      node.val = value;\n      node = node.next;\n    }\n    return head;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode reverseKGroup(ListNode head, int k) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode groupPrevious = dummy;\n\n    while (true) {\n      ListNode kth = getKth(groupPrevious, k);\n      if (kth == null) break;\n\n      ListNode groupNext = kth.next;\n      ListNode previous = groupNext;\n      ListNode current = groupPrevious.next;\n\n      while (current != groupNext) {\n        ListNode next = current.next;\n        current.next = previous;\n        previous = current;\n        current = next;\n      }\n\n      ListNode oldGroupHead = groupPrevious.next;\n      groupPrevious.next = kth;\n      groupPrevious = oldGroupHead;\n    }\n\n    return dummy.next;\n  }\n\n  private ListNode getKth(ListNode node, int k) {\n    while (node != null && k > 0) {\n      node = node.next;\n      k--;\n    }\n    return node;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode reverseKGroup(ListNode head, int k) {\n    ListNode cursor = head;\n    for (int i = 0; i < k; i++) {\n      if (cursor == null) return head;\n      cursor = cursor.next;\n    }\n\n    ListNode previous = reverseKGroup(cursor, k);\n    ListNode current = head;\n\n    for (int i = 0; i < k; i++) {\n      ListNode next = current.next;\n      current.next = previous;\n      previous = current;\n      current = next;\n    }\n\n    return previous;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode reverseKGroup(ListNode head, int k) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode groupPrevious = dummy;\n\n    while (true) {\n      ListNode kth = getKth(groupPrevious, k);\n      if (kth == null) break;\n\n      ListNode groupNext = kth.next;\n      ListNode previous = groupNext;\n      ListNode current = groupPrevious.next;\n\n      while (current != groupNext) {\n        ListNode next = current.next;\n        current.next = previous;\n        previous = current;\n        current = next;\n      }\n\n      ListNode oldGroupHead = groupPrevious.next;\n      groupPrevious.next = kth;\n      groupPrevious = oldGroupHead;\n    }\n\n    return dummy.next;\n  }\n\n  private ListNode getKth(ListNode node, int k) {\n    while (node != null && k > 0) {\n      node = node.next;\n      k--;\n    }\n    return node;\n  }\n}",
      "code": "class Solution {\n  public ListNode reverseKGroup(ListNode head, int k) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode groupPrevious = dummy;\n\n    while (true) {\n      ListNode kth = getKth(groupPrevious, k);\n      if (kth == null) break;\n\n      ListNode groupNext = kth.next;\n      ListNode previous = groupNext;\n      ListNode current = groupPrevious.next;\n\n      while (current != groupNext) {\n        ListNode next = current.next;\n        current.next = previous;\n        previous = current;\n        current = next;\n      }\n\n      ListNode oldGroupHead = groupPrevious.next;\n      groupPrevious.next = kth;\n      groupPrevious = oldGroupHead;\n    }\n\n    return dummy.next;\n  }\n\n  private ListNode getKth(ListNode node, int k) {\n    while (node != null && k > 0) {\n      node = node.next;\n      k--;\n    }\n    return node;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Rotate List",
      "difficulty": "Medium",
      "subpattern": "Length counting and tail reconnection",
      "question": "Given the head of a linked list and an integer k, rotate the list to the right by k places and return the new head.",
      "trigger": "Rotation moves a suffix of the list to the front, so the list length and the new tail position determine the final links.",
      "intuition": "Compute length, reduce k modulo length, connect tail to head temporarily, then break the cycle after length - k - 1 steps.",
      "edgeCases": "Empty list, one node, k = 0, k multiple of length, k greater than length, two nodes.",
      "constraints": "0 <= number of nodes <= 500; -100 <= Node.val <= 100; 0 <= k <= 2000000000.",
      "source": {
        "label": "Rotate List - LeetCode 61",
        "url": "https://leetcode.com/problems/rotate-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4,5], k = 2",
          "output": "[4,5,1,2,3]",
          "explanation": "The last two nodes move to the front."
        },
        {
          "input": "head = [0,1,2], k = 4",
          "output": "[2,0,1]",
          "explanation": "k modulo length is 1."
        },
        {
          "input": "head = [], k = 0",
          "output": "[]",
          "explanation": "An empty list remains empty."
        }
      ],
      "bruteForceComplexity": "Time O(n * (k mod n)); Space O(1). Rotate right one step repeatedly after reducing k.",
      "optimizedComplexity": "Time O(n); Space O(1). Count length once, form a cycle, and break at the new tail.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion can count length and find the new tail using stack frames.",
      "bruteForceCode": "class Solution {\n  public ListNode rotateRight(ListNode head, int k) {\n    if (head == null || head.next == null) return head;\n\n    int length = length(head);\n    k %= length;\n\n    for (int i = 0; i < k; i++) {\n      head = rotateOnce(head);\n    }\n\n    return head;\n  }\n\n  private int length(ListNode head) {\n    int count = 0;\n    while (head != null) {\n      count++;\n      head = head.next;\n    }\n    return count;\n  }\n\n  private ListNode rotateOnce(ListNode head) {\n    ListNode previous = null;\n    ListNode tail = head;\n    while (tail.next != null) {\n      previous = tail;\n      tail = tail.next;\n    }\n    previous.next = null;\n    tail.next = head;\n    return tail;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode rotateRight(ListNode head, int k) {\n    if (head == null || head.next == null || k == 0) return head;\n\n    int length = 1;\n    ListNode tail = head;\n    while (tail.next != null) {\n      tail = tail.next;\n      length++;\n    }\n\n    k %= length;\n    if (k == 0) return head;\n\n    tail.next = head;\n    int stepsToNewTail = length - k - 1;\n    ListNode newTail = head;\n\n    for (int i = 0; i < stepsToNewTail; i++) {\n      newTail = newTail.next;\n    }\n\n    ListNode newHead = newTail.next;\n    newTail.next = null;\n    return newHead;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode rotateRight(ListNode head, int k) {\n    if (head == null || head.next == null || k == 0) return head;\n\n    int length = length(head);\n    k %= length;\n    if (k == 0) return head;\n\n    ListNode tail = nodeAt(head, length - 1);\n    tail.next = head;\n\n    ListNode newTail = nodeAt(head, length - k - 1);\n    ListNode newHead = newTail.next;\n    newTail.next = null;\n    return newHead;\n  }\n\n  private int length(ListNode node) {\n    if (node == null) return 0;\n    return 1 + length(node.next);\n  }\n\n  private ListNode nodeAt(ListNode node, int index) {\n    if (index == 0) return node;\n    return nodeAt(node.next, index - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode rotateRight(ListNode head, int k) {\n    if (head == null || head.next == null || k == 0) return head;\n\n    int length = 1;\n    ListNode tail = head;\n    while (tail.next != null) {\n      tail = tail.next;\n      length++;\n    }\n\n    k %= length;\n    if (k == 0) return head;\n\n    tail.next = head;\n    int stepsToNewTail = length - k - 1;\n    ListNode newTail = head;\n\n    for (int i = 0; i < stepsToNewTail; i++) {\n      newTail = newTail.next;\n    }\n\n    ListNode newHead = newTail.next;\n    newTail.next = null;\n    return newHead;\n  }\n}",
      "code": "class Solution {\n  public ListNode rotateRight(ListNode head, int k) {\n    if (head == null || head.next == null || k == 0) return head;\n\n    int length = 1;\n    ListNode tail = head;\n    while (tail.next != null) {\n      tail = tail.next;\n      length++;\n    }\n\n    k %= length;\n    if (k == 0) return head;\n\n    tail.next = head;\n    int stepsToNewTail = length - k - 1;\n    ListNode newTail = head;\n\n    for (int i = 0; i < stepsToNewTail; i++) {\n      newTail = newTail.next;\n    }\n\n    ListNode newHead = newTail.next;\n    newTail.next = null;\n    return newHead;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Partition List",
      "difficulty": "Medium",
      "subpattern": "Stable partition with two dummy lists",
      "question": "Given the head of a linked list and a value x, partition the list so that all nodes with values less than x come before nodes with values greater than or equal to x. Preserve the original relative order in each partition.",
      "trigger": "The partition must be stable, so nodes are appended to one of two lists as they are encountered and then joined.",
      "intuition": "Build two chains: before for nodes less than x and after for nodes greater than or equal to x. Terminate after and connect before to after.",
      "edgeCases": "All nodes less than x, all nodes greater than or equal to x, empty list, one node, duplicates around x, preserving relative order.",
      "constraints": "0 <= number of nodes <= 200; -100 <= Node.val <= 100; -200 <= x <= 200.",
      "source": {
        "label": "Partition List - LeetCode 86",
        "url": "https://leetcode.com/problems/partition-list/"
      },
      "examples": [
        {
          "input": "head = [1,4,3,2,5,2], x = 3",
          "output": "[1,2,2,4,3,5]",
          "explanation": "Nodes less than 3 move before the rest while preserving order."
        },
        {
          "input": "head = [2,1], x = 2",
          "output": "[1,2]",
          "explanation": "1 moves before 2."
        },
        {
          "input": "head = [1,1], x = 2",
          "output": "[1,1]",
          "explanation": "All nodes are already in the less-than partition."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Copy values into two lists and build a new linked list.",
      "optimizedComplexity": "Time O(n); Space O(1). Reuse nodes by appending them to two dummy chains.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion partitions the suffix and prepends/appends current nodes conceptually.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public ListNode partition(ListNode head, int x) {\n    List<Integer> before = new ArrayList<>();\n    List<Integer> after = new ArrayList<>();\n\n    for (ListNode node = head; node != null; node = node.next) {\n      if (node.val < x) before.add(node.val);\n      else after.add(node.val);\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : before) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n    for (int value : after) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode beforeDummy = new ListNode(0);\n    ListNode afterDummy = new ListNode(0);\n    ListNode before = beforeDummy;\n    ListNode after = afterDummy;\n\n    while (head != null) {\n      if (head.val < x) {\n        before.next = head;\n        before = before.next;\n      } else {\n        after.next = head;\n        after = after.next;\n      }\n      head = head.next;\n    }\n\n    after.next = null;\n    before.next = afterDummy.next;\n    return beforeDummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode beforeDummy = new ListNode(0);\n    ListNode afterDummy = new ListNode(0);\n    partition(head, x, beforeDummy, afterDummy);\n    ListNode beforeTail = beforeDummy;\n    while (beforeTail.next != null) beforeTail = beforeTail.next;\n    beforeTail.next = afterDummy.next;\n    return beforeDummy.next;\n  }\n\n  private void partition(ListNode node, int x, ListNode beforeTail, ListNode afterTail) {\n    if (node == null) {\n      afterTail.next = null;\n      return;\n    }\n\n    ListNode next = node.next;\n    node.next = null;\n    if (node.val < x) {\n      beforeTail.next = node;\n      partition(next, x, beforeTail.next, afterTail);\n    } else {\n      afterTail.next = node;\n      partition(next, x, beforeTail, afterTail.next);\n    }\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode beforeDummy = new ListNode(0);\n    ListNode afterDummy = new ListNode(0);\n    ListNode before = beforeDummy;\n    ListNode after = afterDummy;\n\n    while (head != null) {\n      if (head.val < x) {\n        before.next = head;\n        before = before.next;\n      } else {\n        after.next = head;\n        after = after.next;\n      }\n      head = head.next;\n    }\n\n    after.next = null;\n    before.next = afterDummy.next;\n    return beforeDummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode partition(ListNode head, int x) {\n    ListNode beforeDummy = new ListNode(0);\n    ListNode afterDummy = new ListNode(0);\n    ListNode before = beforeDummy;\n    ListNode after = afterDummy;\n\n    while (head != null) {\n      if (head.val < x) {\n        before.next = head;\n        before = before.next;\n      } else {\n        after.next = head;\n        after = after.next;\n      }\n      head = head.next;\n    }\n\n    after.next = null;\n    before.next = afterDummy.next;\n    return beforeDummy.next;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Odd Even Linked List",
      "difficulty": "Medium",
      "subpattern": "Index-parity relinking",
      "question": "Given the head of a singly linked list, group all nodes at odd indexes followed by all nodes at even indexes. The first node is index 1. Preserve relative order inside both groups.",
      "trigger": "The grouping is based on node position parity, so two chains can be maintained while walking the list once.",
      "intuition": "Keep odd and even pointers. Link odd nodes together, link even nodes together, then append the even chain after the odd chain.",
      "edgeCases": "Empty list, one node, two nodes, odd length, even length, preserving relative order of each group.",
      "constraints": "0 <= number of nodes <= 10000; -1000000 <= Node.val <= 1000000.",
      "source": {
        "label": "Odd Even Linked List - LeetCode 328",
        "url": "https://leetcode.com/problems/odd-even-linked-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[1,3,5,2,4]",
          "explanation": "Odd-indexed nodes come before even-indexed nodes."
        },
        {
          "input": "head = [2,1,3,5,6,4,7]",
          "output": "[2,3,6,7,1,5,4]",
          "explanation": "Relative order within odd and even groups is preserved."
        },
        {
          "input": "head = [1,2]",
          "output": "[1,2]",
          "explanation": "One odd node and one even node stay in order."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store odd-indexed and even-indexed values, then build a new list.",
      "optimizedComplexity": "Time O(n); Space O(1). Relink existing nodes into odd and even chains.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion collects nodes by index parity using call stack.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public ListNode oddEvenList(ListNode head) {\n    List<Integer> odd = new ArrayList<>();\n    List<Integer> even = new ArrayList<>();\n    int index = 1;\n\n    for (ListNode node = head; node != null; node = node.next) {\n      if (index % 2 == 1) odd.add(node.val);\n      else even.add(node.val);\n      index++;\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : odd) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n    for (int value : even) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode oddEvenList(ListNode head) {\n    if (head == null) return null;\n\n    ListNode odd = head;\n    ListNode even = head.next;\n    ListNode evenHead = even;\n\n    while (even != null && even.next != null) {\n      odd.next = even.next;\n      odd = odd.next;\n      even.next = odd.next;\n      even = even.next;\n    }\n\n    odd.next = evenHead;\n    return head;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode oddEvenList(ListNode head) {\n    ListNode oddDummy = new ListNode(0);\n    ListNode evenDummy = new ListNode(0);\n    collect(head, 1, oddDummy, evenDummy);\n\n    ListNode oddTail = oddDummy;\n    while (oddTail.next != null) oddTail = oddTail.next;\n    oddTail.next = evenDummy.next;\n    return oddDummy.next;\n  }\n\n  private void collect(ListNode node, int index, ListNode oddTail, ListNode evenTail) {\n    if (node == null) {\n      evenTail.next = null;\n      return;\n    }\n\n    ListNode next = node.next;\n    node.next = null;\n    if (index % 2 == 1) {\n      oddTail.next = node;\n      collect(next, index + 1, oddTail.next, evenTail);\n    } else {\n      evenTail.next = node;\n      collect(next, index + 1, oddTail, evenTail.next);\n    }\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode oddEvenList(ListNode head) {\n    if (head == null) return null;\n\n    ListNode odd = head;\n    ListNode even = head.next;\n    ListNode evenHead = even;\n\n    while (even != null && even.next != null) {\n      odd.next = even.next;\n      odd = odd.next;\n      even.next = odd.next;\n      even = even.next;\n    }\n\n    odd.next = evenHead;\n    return head;\n  }\n}",
      "code": "class Solution {\n  public ListNode oddEvenList(ListNode head) {\n    if (head == null) return null;\n\n    ListNode odd = head;\n    ListNode even = head.next;\n    ListNode evenHead = even;\n\n    while (even != null && even.next != null) {\n      odd.next = even.next;\n      odd = odd.next;\n      even.next = odd.next;\n      even = even.next;\n    }\n\n    odd.next = evenHead;\n    return head;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Copy List with Random Pointer",
      "difficulty": "Medium",
      "subpattern": "Clone nodes with random-pointer mapping",
      "question": "Given the head of a linked list where each node has next and random pointers, construct a deep copy of the list and return the copied head. The copied nodes must not share references with the original nodes.",
      "trigger": "Random pointers can point anywhere, so each original node needs a stable mapping to its cloned node before random links can be assigned.",
      "intuition": "Either map originals to clones, or interleave cloned nodes between originals so each random clone can be found from original.random.next.",
      "edgeCases": "Empty list, random pointer is null, random points to itself, random points backward, multiple nodes point to the same random node.",
      "constraints": "0 <= number of nodes <= 1000; -10000 <= Node.val <= 10000; random is null or points to a node in the list.",
      "source": {
        "label": "Copy List with Random Pointer - LeetCode 138",
        "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
      },
      "examples": [
        {
          "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
          "output": "deep copy of same structure",
          "explanation": "Each copied node has the same value and random index as the original."
        },
        {
          "input": "head = [[1,1],[2,1]]",
          "output": "deep copy of same structure",
          "explanation": "Both random pointers in the copy point to the copied second node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "An empty list copies to null."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Store originals/clones in lists and find random indexes by scanning.",
      "optimizedComplexity": "Time O(n); Space O(n). A hash map gives O(1) original-to-copy lookup.",
      "recursiveComplexity": "Time O(n); Space O(n). DFS recursion with memoization clones each node once.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public Node copyRandomList(Node head) {\n    if (head == null) return null;\n\n    List<Node> originals = new ArrayList<>();\n    List<Node> copies = new ArrayList<>();\n\n    for (Node node = head; node != null; node = node.next) {\n      originals.add(node);\n      copies.add(new Node(node.val));\n    }\n\n    for (int i = 0; i < originals.size(); i++) {\n      if (i + 1 < copies.size()) copies.get(i).next = copies.get(i + 1);\n      Node random = originals.get(i).random;\n      if (random != null) copies.get(i).random = copies.get(originals.indexOf(random));\n    }\n\n    return copies.get(0);\n  }\n}",
      "iterativeCode": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public Node copyRandomList(Node head) {\n    if (head == null) return null;\n\n    Map<Node, Node> copies = new HashMap<>();\n    for (Node node = head; node != null; node = node.next) {\n      copies.put(node, new Node(node.val));\n    }\n\n    for (Node node = head; node != null; node = node.next) {\n      Node copy = copies.get(node);\n      copy.next = copies.get(node.next);\n      copy.random = copies.get(node.random);\n    }\n\n    return copies.get(head);\n  }\n}",
      "recursiveCode": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  private final Map<Node, Node> copies = new HashMap<>();\n\n  public Node copyRandomList(Node head) {\n    if (head == null) return null;\n    if (copies.containsKey(head)) return copies.get(head);\n\n    Node copy = new Node(head.val);\n    copies.put(head, copy);\n    copy.next = copyRandomList(head.next);\n    copy.random = copyRandomList(head.random);\n\n    return copy;\n  }\n}",
      "optimizedCode": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public Node copyRandomList(Node head) {\n    if (head == null) return null;\n\n    Map<Node, Node> copies = new HashMap<>();\n    for (Node node = head; node != null; node = node.next) {\n      copies.put(node, new Node(node.val));\n    }\n\n    for (Node node = head; node != null; node = node.next) {\n      Node copy = copies.get(node);\n      copy.next = copies.get(node.next);\n      copy.random = copies.get(node.random);\n    }\n\n    return copies.get(head);\n  }\n}",
      "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public Node copyRandomList(Node head) {\n    if (head == null) return null;\n\n    Map<Node, Node> copies = new HashMap<>();\n    for (Node node = head; node != null; node = node.next) {\n      copies.put(node, new Node(node.val));\n    }\n\n    for (Node node = head; node != null; node = node.next) {\n      Node copy = copies.get(node);\n      copy.next = copies.get(node.next);\n      copy.random = copies.get(node.random);\n    }\n\n    return copies.get(head);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sort List",
      "difficulty": "Medium",
      "subpattern": "Merge sort on linked list",
      "question": "Given the head of a linked list, sort the list in ascending order and return the sorted head. The optimized solution should run in O(n log n) time with O(1) extra list-node space.",
      "trigger": "Linked lists can be split with fast/slow pointers and merged efficiently, making merge sort the natural sorting pattern.",
      "intuition": "Split the list into halves, sort each half, and merge two sorted linked lists. Cutting at the middle prevents cycles.",
      "edgeCases": "Empty list, one node, duplicate values, negative values, already sorted list, reverse sorted list.",
      "constraints": "0 <= number of nodes <= 50000; -100000 <= Node.val <= 100000.",
      "source": {
        "label": "Sort List - LeetCode 148",
        "url": "https://leetcode.com/problems/sort-list/"
      },
      "examples": [
        {
          "input": "head = [4,2,1,3]",
          "output": "[1,2,3,4]",
          "explanation": "The list is sorted in ascending order."
        },
        {
          "input": "head = [-1,5,3,4,0]",
          "output": "[-1,0,3,4,5]",
          "explanation": "Negative and positive values are ordered."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "An empty list stays empty."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Copy values to an array/list, sort, then rewrite node values.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) recursion stack for top-down merge sort.",
      "recursiveComplexity": "Time O(n log n); Space O(log n). Recursive merge sort splits and merges list halves.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass Solution {\n  public ListNode sortList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    Collections.sort(values);\n\n    ListNode node = head;\n    for (int value : values) {\n      node.val = value;\n      node = node.next;\n    }\n\n    return head;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode sortList(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    ListNode middle = getMiddle(head);\n    ListNode rightHead = middle.next;\n    middle.next = null;\n\n    ListNode left = sortList(head);\n    ListNode right = sortList(rightHead);\n    return merge(left, right);\n  }\n\n  private ListNode getMiddle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head.next;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    return slow;\n  }\n\n  private ListNode merge(ListNode a, ListNode b) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (a != null && b != null) {\n      if (a.val <= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = a != null ? a : b;\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode sortList(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    ListNode middle = getMiddle(head);\n    ListNode rightHead = middle.next;\n    middle.next = null;\n\n    return merge(sortList(head), sortList(rightHead));\n  }\n\n  private ListNode getMiddle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head.next;\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n    return slow;\n  }\n\n  private ListNode merge(ListNode a, ListNode b) {\n    if (a == null) return b;\n    if (b == null) return a;\n    if (a.val <= b.val) {\n      a.next = merge(a.next, b);\n      return a;\n    }\n    b.next = merge(a, b.next);\n    return b;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode sortList(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    ListNode middle = getMiddle(head);\n    ListNode rightHead = middle.next;\n    middle.next = null;\n\n    ListNode left = sortList(head);\n    ListNode right = sortList(rightHead);\n    return merge(left, right);\n  }\n\n  private ListNode getMiddle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head.next;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    return slow;\n  }\n\n  private ListNode merge(ListNode a, ListNode b) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (a != null && b != null) {\n      if (a.val <= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = a != null ? a : b;\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode sortList(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    ListNode middle = getMiddle(head);\n    ListNode rightHead = middle.next;\n    middle.next = null;\n\n    ListNode left = sortList(head);\n    ListNode right = sortList(rightHead);\n    return merge(left, right);\n  }\n\n  private ListNode getMiddle(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head.next;\n\n    while (fast != null && fast.next != null) {\n      slow = slow.next;\n      fast = fast.next.next;\n    }\n\n    return slow;\n  }\n\n  private ListNode merge(ListNode a, ListNode b) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (a != null && b != null) {\n      if (a.val <= b.val) {\n        tail.next = a;\n        a = a.next;\n      } else {\n        tail.next = b;\n        b = b.next;\n      }\n      tail = tail.next;\n    }\n\n    tail.next = a != null ? a : b;\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Merge k Sorted Lists",
      "difficulty": "Hard",
      "subpattern": "Priority queue or divide-and-conquer merge",
      "question": "Given an array of k linked-list heads where each list is sorted in ascending order, merge all lists into one sorted linked list and return its head.",
      "trigger": "Multiple sorted linked lists can be merged by repeatedly selecting the smallest current head or by merging lists in pairs.",
      "intuition": "Use a min-heap of list heads for the iterative solution. For recursion, divide the list array and merge two sorted lists at a time.",
      "edgeCases": "No lists, lists containing null, one list, duplicate values across lists, many short lists.",
      "constraints": "0 <= lists.length <= 10000; 0 <= total nodes <= 10000; -10000 <= Node.val <= 10000; each list is sorted.",
      "source": {
        "label": "Merge k Sorted Lists - LeetCode 23",
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
      },
      "examples": [
        {
          "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
          "output": "[1,1,2,3,4,4,5,6]",
          "explanation": "All sorted lists are merged into one sorted chain."
        },
        {
          "input": "lists = []",
          "output": "[]",
          "explanation": "There are no lists to merge."
        },
        {
          "input": "lists = [[]]",
          "output": "[]",
          "explanation": "The only list is empty."
        }
      ],
      "bruteForceComplexity": "Time O(N log N); Space O(N). Collect all values, sort them, and build a new list.",
      "optimizedComplexity": "Time O(N log k); Space O(k). A min-heap stores at most one node from each list.",
      "recursiveComplexity": "Time O(N log k); Space O(log k). Divide-and-conquer merges list ranges recursively.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    List<Integer> values = new ArrayList<>();\n\n    for (ListNode head : lists) {\n      for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    }\n    Collections.sort(values);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : values) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n\n    return dummy.next;\n  }\n}",
      "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));\n\n    for (ListNode head : lists) {\n      if (head != null) heap.offer(head);\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    if (lists == null || lists.length == 0) return null;\n    return mergeRange(lists, 0, lists.length - 1);\n  }\n\n  private ListNode mergeRange(ListNode[] lists, int left, int right) {\n    if (left == right) return lists[left];\n\n    int mid = left + (right - left) / 2;\n    ListNode a = mergeRange(lists, left, mid);\n    ListNode b = mergeRange(lists, mid + 1, right);\n    return mergeTwo(a, b);\n  }\n\n  private ListNode mergeTwo(ListNode a, ListNode b) {\n    if (a == null) return b;\n    if (b == null) return a;\n    if (a.val <= b.val) {\n      a.next = mergeTwo(a.next, b);\n      return a;\n    }\n    b.next = mergeTwo(a, b.next);\n    return b;\n  }\n}",
      "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));\n\n    for (ListNode head : lists) {\n      if (head != null) heap.offer(head);\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));\n\n    for (ListNode head : lists) {\n      if (head != null) heap.offer(head);\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Flatten a Multilevel Doubly Linked List",
      "difficulty": "Medium",
      "subpattern": "Depth-first child splicing",
      "question": "Given a multilevel doubly linked list where nodes have next, prev, and child pointers, flatten the list so all nodes appear in depth-first order as a single-level doubly linked list. All child pointers must become null.",
      "trigger": "A child pointer represents a nested list that must be inserted immediately after the current node before continuing to the original next node.",
      "intuition": "Use DFS. When a child exists, flatten the child chain, splice it between current and next, then continue from the child tail.",
      "edgeCases": "Empty list, no child pointers, child at head, deeply nested child chains, restoring prev pointers, nulling child pointers.",
      "constraints": "0 <= number of nodes <= 1000; 1 <= Node.val <= 100000.",
      "source": {
        "label": "Flatten a Multilevel Doubly Linked List - LeetCode 430",
        "url": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]",
          "output": "[1,2,3,7,8,11,12,9,10,4,5,6]",
          "explanation": "Child lists are inserted in depth-first order."
        },
        {
          "input": "head = [1,2,null,3]",
          "output": "[1,3,2]",
          "explanation": "The child of 1 is flattened before original next 2."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "An empty list stays empty."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). DFS collects nodes in order, then relinks them afterward.",
      "optimizedComplexity": "Time O(n); Space O(n) worst-case for stack. Iterative DFS uses an explicit stack for saved next nodes.",
      "recursiveComplexity": "Time O(n); Space O(depth). Recursive DFS returns the tail of each flattened segment.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public Node flatten(Node head) {\n    if (head == null) return null;\n\n    List<Node> order = new ArrayList<>();\n    collect(head, order);\n\n    for (int i = 0; i < order.size(); i++) {\n      Node node = order.get(i);\n      node.prev = i == 0 ? null : order.get(i - 1);\n      node.next = i + 1 == order.size() ? null : order.get(i + 1);\n      node.child = null;\n    }\n\n    return order.get(0);\n  }\n\n  private void collect(Node node, List<Node> order) {\n    while (node != null) {\n      order.add(node);\n      if (node.child != null) collect(node.child, order);\n      node = node.next;\n    }\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public Node flatten(Node head) {\n    if (head == null) return null;\n\n    Deque<Node> stack = new ArrayDeque<>();\n    stack.push(head);\n    Node dummy = new Node(0);\n    Node previous = dummy;\n\n    while (!stack.isEmpty()) {\n      Node current = stack.pop();\n      previous.next = current;\n      current.prev = previous;\n\n      if (current.next != null) stack.push(current.next);\n      if (current.child != null) {\n        stack.push(current.child);\n        current.child = null;\n      }\n\n      previous = current;\n    }\n\n    dummy.next.prev = null;\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public Node flatten(Node head) {\n    flattenTail(head);\n    return head;\n  }\n\n  private Node flattenTail(Node head) {\n    Node current = head;\n    Node tail = head;\n\n    while (current != null) {\n      Node next = current.next;\n      if (current.child != null) {\n        Node child = current.child;\n        Node childTail = flattenTail(child);\n\n        current.next = child;\n        child.prev = current;\n        current.child = null;\n\n        if (next != null) {\n          childTail.next = next;\n          next.prev = childTail;\n        }\n        tail = childTail;\n      } else {\n        tail = current;\n      }\n      current = next;\n    }\n\n    return tail;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public Node flatten(Node head) {\n    if (head == null) return null;\n\n    Deque<Node> stack = new ArrayDeque<>();\n    stack.push(head);\n    Node dummy = new Node(0);\n    Node previous = dummy;\n\n    while (!stack.isEmpty()) {\n      Node current = stack.pop();\n      previous.next = current;\n      current.prev = previous;\n\n      if (current.next != null) stack.push(current.next);\n      if (current.child != null) {\n        stack.push(current.child);\n        current.child = null;\n      }\n\n      previous = current;\n    }\n\n    dummy.next.prev = null;\n    return dummy.next;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public Node flatten(Node head) {\n    if (head == null) return null;\n\n    Deque<Node> stack = new ArrayDeque<>();\n    stack.push(head);\n    Node dummy = new Node(0);\n    Node previous = dummy;\n\n    while (!stack.isEmpty()) {\n      Node current = stack.pop();\n      previous.next = current;\n      current.prev = previous;\n\n      if (current.next != null) stack.push(current.next);\n      if (current.child != null) {\n        stack.push(current.child);\n        current.child = null;\n      }\n\n      previous = current;\n    }\n\n    dummy.next.prev = null;\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Delete Node in a Linked List",
      "difficulty": "Medium",
      "subpattern": "Overwrite-and-skip node deletion",
      "question": "Given only a node to delete from a singly linked list, delete that node. The given node is not the tail, and you are not given the head of the list.",
      "trigger": "Without the head or previous pointer, the only possible deletion is to copy the next node data into the current node and skip the next node.",
      "intuition": "Replace node.val with node.next.val, then bypass node.next. This makes the current node represent the next node and removes the next reference.",
      "edgeCases": "Given node is guaranteed not tail, two-node suffix, duplicate values, deletion by reference not by value.",
      "constraints": "The number of nodes is in [2, 1000]; -1000 <= Node.val <= 1000; the node to delete is in the list and is not a tail node.",
      "source": {
        "label": "Delete Node in a Linked List - LeetCode 237",
        "url": "https://leetcode.com/problems/delete-node-in-a-linked-list/"
      },
      "examples": [
        {
          "input": "head = [4,5,1,9], node = 5",
          "output": "[4,1,9]",
          "explanation": "The node with value 5 is overwritten by 1 and skipped."
        },
        {
          "input": "head = [4,5,1,9], node = 1",
          "output": "[4,5,9]",
          "explanation": "The node with value 1 is removed by copying 9."
        },
        {
          "input": "head = [1,2,3,4], node = 3",
          "output": "[1,2,4]",
          "explanation": "The next node data replaces the target node."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). With no head pointer, the overwrite-and-skip method is the direct baseline.",
      "optimizedComplexity": "Time O(1); Space O(1). Copy next node value and bypass next node.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursion is not needed because the operation is local.",
      "bruteForceCode": "class Solution {\n  public void deleteNode(ListNode node) {\n    ListNode nextNode = node.next;\n\n    // The problem guarantees nextNode exists because node is not the tail.\n    node.val = nextNode.val;\n    node.next = nextNode.next;\n\n    // The old nextNode is now unreachable from the list.\n    nextNode.next = null;\n  }\n}",
      "iterativeCode": "class Solution {\n  public void deleteNode(ListNode node) {\n    ListNode nodeToRemove = node.next;\n\n    // Copy the next node into the current node.\n    node.val = nodeToRemove.val;\n\n    // Skip the next node to remove it from the chain.\n    node.next = nodeToRemove.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public void deleteNode(ListNode node) {\n    overwriteWithNext(node);\n  }\n\n  private void overwriteWithNext(ListNode node) {\n    ListNode nextNode = node.next;\n\n    node.val = nextNode.val;\n    node.next = nextNode.next;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void deleteNode(ListNode node) {\n    ListNode nodeToRemove = node.next;\n\n    // Copy the next node into the current node.\n    node.val = nodeToRemove.val;\n\n    // Skip the next node to remove it from the chain.\n    node.next = nodeToRemove.next;\n  }\n}",
      "code": "class Solution {\n  public void deleteNode(ListNode node) {\n    ListNode nodeToRemove = node.next;\n\n    // Copy the next node into the current node.\n    node.val = nodeToRemove.val;\n\n    // Skip the next node to remove it from the chain.\n    node.next = nodeToRemove.next;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Remove Linked List Elements",
      "difficulty": "Easy",
      "subpattern": "Dummy node deletion",
      "question": "Given the head of a linked list and an integer val, remove all nodes whose value equals val and return the new head.",
      "trigger": "Nodes may be removed from anywhere, including the head, so a dummy node gives a stable previous pointer before the real head.",
      "intuition": "Walk with a current pointer whose next node is the deletion candidate. If current.next matches val, skip it; otherwise advance current.",
      "edgeCases": "Empty list, all nodes removed, head nodes removed, no nodes removed, consecutive matching nodes, one-node list.",
      "constraints": "0 <= number of nodes <= 10000; 1 <= Node.val <= 50; 0 <= val <= 50.",
      "source": {
        "label": "Remove Linked List Elements - LeetCode 203",
        "url": "https://leetcode.com/problems/remove-linked-list-elements/"
      },
      "examples": [
        {
          "input": "head = [1,2,6,3,4,5,6], val = 6",
          "output": "[1,2,3,4,5]",
          "explanation": "Both nodes with value 6 are removed."
        },
        {
          "input": "head = [], val = 1",
          "output": "[]",
          "explanation": "An empty list stays empty."
        },
        {
          "input": "head = [7,7,7,7], val = 7",
          "output": "[]",
          "explanation": "Every node is removed."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Copy values that do not match val and build a new list.",
      "optimizedComplexity": "Time O(n); Space O(1). Delete matching nodes in place with a dummy node.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion filters the suffix and returns the kept head.",
      "bruteForceCode": "class Solution {\n  public ListNode removeElements(ListNode head, int val) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    for (ListNode node = head; node != null; node = node.next) {\n      if (node.val != val) {\n        tail.next = new ListNode(node.val);\n        tail = tail.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode removeElements(ListNode head, int val) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode current = dummy;\n\n    while (current.next != null) {\n      if (current.next.val == val) {\n        current.next = current.next.next;\n      } else {\n        current = current.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode removeElements(ListNode head, int val) {\n    if (head == null) return null;\n\n    head.next = removeElements(head.next, val);\n    if (head.val == val) return head.next;\n    return head;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode removeElements(ListNode head, int val) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode current = dummy;\n\n    while (current.next != null) {\n      if (current.next.val == val) {\n        current.next = current.next.next;\n      } else {\n        current = current.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode removeElements(ListNode head, int val) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode current = dummy;\n\n    while (current.next != null) {\n      if (current.next.val == val) {\n        current.next = current.next.next;\n      } else {\n        current = current.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Remove Duplicates from Sorted List",
      "difficulty": "Easy",
      "subpattern": "Sorted-list duplicate skipping",
      "question": "Given the head of a sorted linked list, delete all duplicate values so that each value appears only once. Return the sorted linked list.",
      "trigger": "The list is sorted, so duplicate values are adjacent and can be removed by comparing current with current.next.",
      "intuition": "Walk the list once. If current and current.next have the same value, skip current.next; otherwise move current forward.",
      "edgeCases": "Empty list, one node, all duplicates, no duplicates, duplicates at the head, duplicates at the tail.",
      "constraints": "0 <= number of nodes <= 300; -100 <= Node.val <= 100; list is sorted in ascending order.",
      "source": {
        "label": "Remove Duplicates from Sorted List - LeetCode 83",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/"
      },
      "examples": [
        {
          "input": "head = [1,1,2]",
          "output": "[1,2]",
          "explanation": "The second 1 is removed."
        },
        {
          "input": "head = [1,1,2,3,3]",
          "output": "[1,2,3]",
          "explanation": "Adjacent duplicates are collapsed to one node."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "An empty list stays empty."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Copy first occurrence of each value into a new list.",
      "optimizedComplexity": "Time O(n); Space O(1). Sorted duplicates are removed in place.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion removes duplicates from the suffix.",
      "bruteForceCode": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    Integer last = null;\n\n    for (ListNode node = head; node != null; node = node.next) {\n      if (last == null || node.val != last) {\n        tail.next = new ListNode(node.val);\n        tail = tail.next;\n        last = node.val;\n      }\n    }\n\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    ListNode current = head;\n\n    while (current != null && current.next != null) {\n      if (current.val == current.next.val) {\n        current.next = current.next.next;\n      } else {\n        current = current.next;\n      }\n    }\n\n    return head;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    head.next = deleteDuplicates(head.next);\n    if (head.next != null && head.val == head.next.val) return head.next;\n    return head;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    ListNode current = head;\n\n    while (current != null && current.next != null) {\n      if (current.val == current.next.val) {\n        current.next = current.next.next;\n      } else {\n        current = current.next;\n      }\n    }\n\n    return head;\n  }\n}",
      "code": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    ListNode current = head;\n\n    while (current != null && current.next != null) {\n      if (current.val == current.next.val) {\n        current.next = current.next.next;\n      } else {\n        current = current.next;\n      }\n    }\n\n    return head;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Remove Duplicates from Sorted List II",
      "difficulty": "Medium",
      "subpattern": "Remove entire duplicate groups with dummy node",
      "question": "Given the head of a sorted linked list, delete all nodes that have duplicate values, leaving only values that appeared exactly once in the original list.",
      "trigger": "Because the list is sorted, duplicates form contiguous groups. A dummy node is needed when a duplicate group begins at the head.",
      "intuition": "Use previous before the current group. If current has duplicates, skip the whole group; otherwise advance previous one node.",
      "edgeCases": "All nodes duplicated, duplicates at head, duplicates at tail, no duplicates, one node, multiple duplicate groups.",
      "constraints": "0 <= number of nodes <= 300; -100 <= Node.val <= 100; list is sorted in ascending order.",
      "source": {
        "label": "Remove Duplicates from Sorted List II - LeetCode 82",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/"
      },
      "examples": [
        {
          "input": "head = [1,2,3,3,4,4,5]",
          "output": "[1,2,5]",
          "explanation": "Values 3 and 4 are removed completely."
        },
        {
          "input": "head = [1,1,1,2,3]",
          "output": "[2,3]",
          "explanation": "The whole group of 1 values is removed."
        },
        {
          "input": "head = [1,2,3]",
          "output": "[1,2,3]",
          "explanation": "No value has duplicates."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Count frequencies and build a new list with values whose count is one.",
      "optimizedComplexity": "Time O(n); Space O(1). Skip duplicate groups in place using a dummy node.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion removes a duplicate group before processing the suffix.",
      "bruteForceCode": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    Map<Integer, Integer> count = new HashMap<>();\n    for (ListNode node = head; node != null; node = node.next) {\n      count.put(node.val, count.getOrDefault(node.val, 0) + 1);\n    }\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (ListNode node = head; node != null; node = node.next) {\n      if (count.get(node.val) == 1) {\n        tail.next = new ListNode(node.val);\n        tail = tail.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode previous = dummy;\n\n    while (head != null) {\n      if (head.next != null && head.val == head.next.val) {\n        int duplicateValue = head.val;\n        while (head != null && head.val == duplicateValue) {\n          head = head.next;\n        }\n        previous.next = head;\n      } else {\n        previous = head;\n        head = head.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    if (head == null || head.next == null) return head;\n\n    if (head.val == head.next.val) {\n      int duplicateValue = head.val;\n      while (head != null && head.val == duplicateValue) {\n        head = head.next;\n      }\n      return deleteDuplicates(head);\n    }\n\n    head.next = deleteDuplicates(head.next);\n    return head;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode previous = dummy;\n\n    while (head != null) {\n      if (head.next != null && head.val == head.next.val) {\n        int duplicateValue = head.val;\n        while (head != null && head.val == duplicateValue) {\n          head = head.next;\n        }\n        previous.next = head;\n      } else {\n        previous = head;\n        head = head.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode deleteDuplicates(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode previous = dummy;\n\n    while (head != null) {\n      if (head.next != null && head.val == head.next.val) {\n        int duplicateValue = head.val;\n        while (head != null && head.val == duplicateValue) {\n          head = head.next;\n        }\n        previous.next = head;\n      } else {\n        previous = head;\n        head = head.next;\n      }\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Insertion Sort List",
      "difficulty": "Medium",
      "subpattern": "Sorted prefix insertion with dummy node",
      "question": "Given the head of a linked list, sort the list using insertion sort and return the sorted head.",
      "trigger": "Insertion sort maintains a sorted prefix and inserts each unsorted node into its correct position in that prefix.",
      "intuition": "Use a dummy head for the sorted list. For each original node, find the insertion point from dummy and splice the node there.",
      "edgeCases": "Empty list, one node, already sorted list, reverse sorted list, duplicate values, negative values.",
      "constraints": "0 <= number of nodes <= 5000; -5000 <= Node.val <= 5000.",
      "source": {
        "label": "Insertion Sort List - LeetCode 147",
        "url": "https://leetcode.com/problems/insertion-sort-list/"
      },
      "examples": [
        {
          "input": "head = [4,2,1,3]",
          "output": "[1,2,3,4]",
          "explanation": "Each node is inserted into the growing sorted list."
        },
        {
          "input": "head = [-1,5,3,4,0]",
          "output": "[-1,0,3,4,5]",
          "explanation": "Negative and positive values are sorted."
        },
        {
          "input": "head = []",
          "output": "[]",
          "explanation": "An empty list stays empty."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Copy values, sort them, and rebuild the list.",
      "optimizedComplexity": "Time O(n^2); Space O(1). Linked-list insertion sort may scan the sorted prefix for each node.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursion sorts the suffix and inserts the current node into it.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass Solution {\n  public ListNode insertionSortList(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    Collections.sort(values);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : values) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode insertionSortList(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    ListNode current = head;\n\n    while (current != null) {\n      ListNode next = current.next;\n      ListNode previous = dummy;\n\n      while (previous.next != null && previous.next.val < current.val) {\n        previous = previous.next;\n      }\n\n      current.next = previous.next;\n      previous.next = current;\n      current = next;\n    }\n\n    return dummy.next;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode insertionSortList(ListNode head) {\n    if (head == null) return null;\n\n    ListNode sortedRest = insertionSortList(head.next);\n    head.next = null;\n    return insert(sortedRest, head);\n  }\n\n  private ListNode insert(ListNode head, ListNode node) {\n    if (head == null || node.val <= head.val) {\n      node.next = head;\n      return node;\n    }\n\n    head.next = insert(head.next, node);\n    return head;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode insertionSortList(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    ListNode current = head;\n\n    while (current != null) {\n      ListNode next = current.next;\n      ListNode previous = dummy;\n\n      while (previous.next != null && previous.next.val < current.val) {\n        previous = previous.next;\n      }\n\n      current.next = previous.next;\n      previous.next = current;\n      current = next;\n    }\n\n    return dummy.next;\n  }\n}",
      "code": "class Solution {\n  public ListNode insertionSortList(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    ListNode current = head;\n\n    while (current != null) {\n      ListNode next = current.next;\n      ListNode previous = dummy;\n\n      while (previous.next != null && previous.next.val < current.val) {\n        previous = previous.next;\n      }\n\n      current.next = previous.next;\n      previous.next = current;\n      current = next;\n    }\n\n    return dummy.next;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "LRU Cache",
      "difficulty": "Medium",
      "subpattern": "Hash map plus doubly linked list",
      "question": "Design an LRU cache with get and put operations in O(1) average time. When capacity is exceeded, evict the least recently used key.",
      "trigger": "O(1) lookup needs a hash map, and O(1) recency updates need a doubly linked list that can move nodes to the front and remove the tail.",
      "intuition": "Map keys to list nodes. The front is most recently used and the back is least recently used. Every get/put moves the node to the front.",
      "edgeCases": "Capacity one, updating an existing key, get missing key, repeated gets, eviction after put, overwriting value without growing size.",
      "constraints": "1 <= capacity <= 3000; 0 <= key <= 10000; 0 <= value <= 100000; at most 200000 calls to get and put.",
      "source": {
        "label": "LRU Cache - LeetCode 146",
        "url": "https://leetcode.com/problems/lru-cache/"
      },
      "examples": [
        {
          "input": "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)",
          "output": "[null,null,null,1,null,-1]",
          "explanation": "Key 2 is least recently used and is evicted."
        },
        {
          "input": "LRUCache(1), put(1,1), put(2,2), get(1), get(2)",
          "output": "[null,null,null,-1,2]",
          "explanation": "Capacity one keeps only the most recent key."
        },
        {
          "input": "LRUCache(2), put(2,1), put(2,2), get(2)",
          "output": "[null,null,null,2]",
          "explanation": "Updating key 2 changes its value and marks it recent."
        }
      ],
      "bruteForceComplexity": "get Time O(n), put Time O(n); Space O(capacity). A list scan can track recency but is too slow for the target.",
      "optimizedComplexity": "get Time O(1) average, put Time O(1) average; Space O(capacity). Hash map plus doubly linked list supports direct node movement.",
      "recursiveComplexity": "Recursive implementation is not appropriate for cache operations; the shown wrapper keeps O(1) operations and O(capacity) space.",
      "bruteForceCode": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\nclass LRUCache {\n  private final int capacity;\n  private final LinkedHashMap<Integer, Integer> cache;\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    this.cache = new LinkedHashMap<>();\n  }\n\n  public int get(int key) {\n    if (!cache.containsKey(key)) return -1;\n    int value = cache.remove(key);\n    cache.put(key, value);\n    return value;\n  }\n\n  public void put(int key, int value) {\n    if (cache.containsKey(key)) cache.remove(key);\n    cache.put(key, value);\n\n    if (cache.size() > capacity) {\n      int oldestKey = cache.keySet().iterator().next();\n      cache.remove(oldestKey);\n    }\n  }\n}",
      "iterativeCode": "import java.util.HashMap;\nimport java.util.Map;\n\nclass LRUCache {\n  private final int capacity;\n  private final Map<Integer, Node> nodes = new HashMap<>();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.previous = head;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    addAfterHead(created);\n\n    if (nodes.size() > capacity) {\n      Node leastUsed = tail.previous;\n      remove(leastUsed);\n      nodes.remove(leastUsed.key);\n    }\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void addAfterHead(Node node) {\n    node.previous = head;\n    node.next = head.next;\n    head.next.previous = node;\n    head.next = node;\n  }\n\n  private void remove(Node node) {\n    node.previous.next = node.next;\n    node.next.previous = node.previous;\n  }\n\n  private static class Node {\n    int key;\n    int value;\n    Node previous;\n    Node next;\n\n    Node(int key, int value) {\n      this.key = key;\n      this.value = value;\n    }\n  }\n}",
      "recursiveCode": "class LRUCache {\n  private final LRUCacheIterative cache;\n\n  public LRUCache(int capacity) {\n    cache = new LRUCacheIterative(capacity);\n  }\n\n  public int get(int key) {\n    return cache.get(key);\n  }\n\n  public void put(int key, int value) {\n    cache.put(key, value);\n  }\n}\n\nclass LRUCacheIterative extends LRUCacheBase {\n  LRUCacheIterative(int capacity) {\n    super(capacity);\n  }\n}\n\nclass LRUCacheBase {\n  private final int capacity;\n  private final java.util.Map<Integer, Node> nodes = new java.util.HashMap<>();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  LRUCacheBase(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.previous = head;\n  }\n\n  int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n    moveToFront(node);\n    return node.value;\n  }\n\n  void put(int key, int value) {\n    Node node = nodes.get(key);\n    if (node == null) {\n      node = new Node(key, value);\n      nodes.put(key, node);\n      addAfterHead(node);\n    } else {\n      node.value = value;\n      moveToFront(node);\n    }\n    if (nodes.size() > capacity) evictLeastUsed();\n  }\n\n  private void evictLeastUsed() {\n    Node node = tail.previous;\n    remove(node);\n    nodes.remove(node.key);\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void addAfterHead(Node node) {\n    node.previous = head;\n    node.next = head.next;\n    head.next.previous = node;\n    head.next = node;\n  }\n\n  private void remove(Node node) {\n    node.previous.next = node.next;\n    node.next.previous = node.previous;\n  }\n\n  private static class Node {\n    int key;\n    int value;\n    Node previous;\n    Node next;\n\n    Node(int key, int value) {\n      this.key = key;\n      this.value = value;\n    }\n  }\n}",
      "optimizedCode": "import java.util.HashMap;\nimport java.util.Map;\n\nclass LRUCache {\n  private final int capacity;\n  private final Map<Integer, Node> nodes = new HashMap<>();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.previous = head;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    addAfterHead(created);\n\n    if (nodes.size() > capacity) {\n      Node leastUsed = tail.previous;\n      remove(leastUsed);\n      nodes.remove(leastUsed.key);\n    }\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void addAfterHead(Node node) {\n    node.previous = head;\n    node.next = head.next;\n    head.next.previous = node;\n    head.next = node;\n  }\n\n  private void remove(Node node) {\n    node.previous.next = node.next;\n    node.next.previous = node.previous;\n  }\n\n  private static class Node {\n    int key;\n    int value;\n    Node previous;\n    Node next;\n\n    Node(int key, int value) {\n      this.key = key;\n      this.value = value;\n    }\n  }\n}",
      "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass LRUCache {\n  private final int capacity;\n  private final Map<Integer, Node> nodes = new HashMap<>();\n  private final Node head = new Node(0, 0);\n  private final Node tail = new Node(0, 0);\n\n  public LRUCache(int capacity) {\n    this.capacity = capacity;\n    head.next = tail;\n    tail.previous = head;\n  }\n\n  public int get(int key) {\n    Node node = nodes.get(key);\n    if (node == null) return -1;\n\n    moveToFront(node);\n    return node.value;\n  }\n\n  public void put(int key, int value) {\n    Node node = nodes.get(key);\n    if (node != null) {\n      node.value = value;\n      moveToFront(node);\n      return;\n    }\n\n    Node created = new Node(key, value);\n    nodes.put(key, created);\n    addAfterHead(created);\n\n    if (nodes.size() > capacity) {\n      Node leastUsed = tail.previous;\n      remove(leastUsed);\n      nodes.remove(leastUsed.key);\n    }\n  }\n\n  private void moveToFront(Node node) {\n    remove(node);\n    addAfterHead(node);\n  }\n\n  private void addAfterHead(Node node) {\n    node.previous = head;\n    node.next = head.next;\n    head.next.previous = node;\n    head.next = node;\n  }\n\n  private void remove(Node node) {\n    node.previous.next = node.next;\n    node.next.previous = node.previous;\n  }\n\n  private static class Node {\n    int key;\n    int value;\n    Node previous;\n    Node next;\n\n    Node(int key, int value) {\n      this.key = key;\n      this.value = value;\n    }\n  }\n}"
    },
    {
      "group": "more",
      "name": "Design Linked List",
      "difficulty": "Medium",
      "subpattern": "Linked list design with sentinel nodes",
      "question": "Design a linked list that supports get(index), addAtHead(val), addAtTail(val), addAtIndex(index, val), and deleteAtIndex(index). If index is invalid, ignore the operation or return -1 for get.",
      "trigger": "The problem asks for direct linked-list operations, so correctness depends on index traversal, insertion links, deletion links, and size tracking.",
      "intuition": "Use sentinel head and tail nodes in a doubly linked list. They remove special cases for inserting or deleting at the real head or tail.",
      "edgeCases": "get invalid index, add at index 0, add at index size, add beyond size, delete head, delete tail, empty list operations.",
      "constraints": "0 <= index, val <= 1000; at most 2000 calls are made to linked-list operations.",
      "source": {
        "label": "Design Linked List - LeetCode 707",
        "url": "https://leetcode.com/problems/design-linked-list/"
      },
      "examples": [
        {
          "input": "addAtHead(1), addAtTail(3), addAtIndex(1,2), get(1)",
          "output": "2",
          "explanation": "The list becomes [1,2,3], so index 1 is 2."
        },
        {
          "input": "deleteAtIndex(1), get(1)",
          "output": "3",
          "explanation": "After deleting 2, the list is [1,3]."
        },
        {
          "input": "get(5) on a shorter list",
          "output": "-1",
          "explanation": "Invalid indexes return -1."
        }
      ],
      "bruteForceComplexity": "get Time O(1), add/delete Time O(n) with array storage; Space O(n). This is simpler but does not practice linked-list pointer design.",
      "optimizedComplexity": "get/add/delete Time O(n) due to index traversal; Space O(n). Sentinel nodes make pointer updates O(1) after traversal.",
      "recursiveComplexity": "get/add/delete Time O(n); Space O(n) when traversal is recursive.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass MyLinkedList {\n  private final List<Integer> values = new ArrayList<>();\n\n  public int get(int index) {\n    if (index < 0 || index >= values.size()) return -1;\n    return values.get(index);\n  }\n\n  public void addAtHead(int val) {\n    values.add(0, val);\n  }\n\n  public void addAtTail(int val) {\n    values.add(val);\n  }\n\n  public void addAtIndex(int index, int val) {\n    if (index < 0) index = 0;\n    if (index > values.size()) return;\n    values.add(index, val);\n  }\n\n  public void deleteAtIndex(int index) {\n    if (index < 0 || index >= values.size()) return;\n    values.remove(index);\n  }\n}",
      "iterativeCode": "class MyLinkedList {\n  private final Node head = new Node(0);\n  private final Node tail = new Node(0);\n  private int size;\n\n  public MyLinkedList() {\n    head.next = tail;\n    tail.previous = head;\n  }\n\n  public int get(int index) {\n    if (index < 0 || index >= size) return -1;\n    return nodeAt(index).value;\n  }\n\n  public void addAtHead(int val) {\n    addAfter(head, new Node(val));\n  }\n\n  public void addAtTail(int val) {\n    addAfter(tail.previous, new Node(val));\n  }\n\n  public void addAtIndex(int index, int val) {\n    if (index < 0) index = 0;\n    if (index > size) return;\n\n    Node previous = index == size ? tail.previous : nodeAt(index).previous;\n    addAfter(previous, new Node(val));\n  }\n\n  public void deleteAtIndex(int index) {\n    if (index < 0 || index >= size) return;\n    remove(nodeAt(index));\n  }\n\n  private Node nodeAt(int index) {\n    Node current;\n    if (index < size / 2) {\n      current = head.next;\n      for (int i = 0; i < index; i++) current = current.next;\n    } else {\n      current = tail.previous;\n      for (int i = size - 1; i > index; i--) current = current.previous;\n    }\n    return current;\n  }\n\n  private void addAfter(Node previous, Node node) {\n    Node next = previous.next;\n    previous.next = node;\n    node.previous = previous;\n    node.next = next;\n    next.previous = node;\n    size++;\n  }\n\n  private void remove(Node node) {\n    node.previous.next = node.next;\n    node.next.previous = node.previous;\n    size--;\n  }\n\n  private static class Node {\n    int value;\n    Node previous;\n    Node next;\n\n    Node(int value) {\n      this.value = value;\n    }\n  }\n}",
      "recursiveCode": "class MyLinkedList {\n  private Node head;\n  private int size;\n\n  public int get(int index) {\n    if (index < 0 || index >= size) return -1;\n    return nodeAt(head, index).value;\n  }\n\n  public void addAtHead(int val) {\n    Node node = new Node(val);\n    node.next = head;\n    head = node;\n    size++;\n  }\n\n  public void addAtTail(int val) {\n    addAtIndex(size, val);\n  }\n\n  public void addAtIndex(int index, int val) {\n    if (index < 0) index = 0;\n    if (index > size) return;\n    if (index == 0) {\n      addAtHead(val);\n      return;\n    }\n\n    Node previous = nodeAt(head, index - 1);\n    Node node = new Node(val);\n    node.next = previous.next;\n    previous.next = node;\n    size++;\n  }\n\n  public void deleteAtIndex(int index) {\n    if (index < 0 || index >= size) return;\n    if (index == 0) head = head.next;\n    else {\n      Node previous = nodeAt(head, index - 1);\n      previous.next = previous.next.next;\n    }\n    size--;\n  }\n\n  private Node nodeAt(Node node, int index) {\n    if (index == 0) return node;\n    return nodeAt(node.next, index - 1);\n  }\n\n  private static class Node {\n    int value;\n    Node next;\n\n    Node(int value) {\n      this.value = value;\n    }\n  }\n}",
      "optimizedCode": "class MyLinkedList {\n  private final Node head = new Node(0);\n  private final Node tail = new Node(0);\n  private int size;\n\n  public MyLinkedList() {\n    head.next = tail;\n    tail.previous = head;\n  }\n\n  public int get(int index) {\n    if (index < 0 || index >= size) return -1;\n    return nodeAt(index).value;\n  }\n\n  public void addAtHead(int val) {\n    addAfter(head, new Node(val));\n  }\n\n  public void addAtTail(int val) {\n    addAfter(tail.previous, new Node(val));\n  }\n\n  public void addAtIndex(int index, int val) {\n    if (index < 0) index = 0;\n    if (index > size) return;\n\n    Node previous = index == size ? tail.previous : nodeAt(index).previous;\n    addAfter(previous, new Node(val));\n  }\n\n  public void deleteAtIndex(int index) {\n    if (index < 0 || index >= size) return;\n    remove(nodeAt(index));\n  }\n\n  private Node nodeAt(int index) {\n    Node current;\n    if (index < size / 2) {\n      current = head.next;\n      for (int i = 0; i < index; i++) current = current.next;\n    } else {\n      current = tail.previous;\n      for (int i = size - 1; i > index; i--) current = current.previous;\n    }\n    return current;\n  }\n\n  private void addAfter(Node previous, Node node) {\n    Node next = previous.next;\n    previous.next = node;\n    node.previous = previous;\n    node.next = next;\n    next.previous = node;\n    size++;\n  }\n\n  private void remove(Node node) {\n    node.previous.next = node.next;\n    node.next.previous = node.previous;\n    size--;\n  }\n\n  private static class Node {\n    int value;\n    Node previous;\n    Node next;\n\n    Node(int value) {\n      this.value = value;\n    }\n  }\n}",
      "code": "class MyLinkedList {\n  private final Node head = new Node(0);\n  private final Node tail = new Node(0);\n  private int size;\n\n  public MyLinkedList() {\n    head.next = tail;\n    tail.previous = head;\n  }\n\n  public int get(int index) {\n    if (index < 0 || index >= size) return -1;\n    return nodeAt(index).value;\n  }\n\n  public void addAtHead(int val) {\n    addAfter(head, new Node(val));\n  }\n\n  public void addAtTail(int val) {\n    addAfter(tail.previous, new Node(val));\n  }\n\n  public void addAtIndex(int index, int val) {\n    if (index < 0) index = 0;\n    if (index > size) return;\n\n    Node previous = index == size ? tail.previous : nodeAt(index).previous;\n    addAfter(previous, new Node(val));\n  }\n\n  public void deleteAtIndex(int index) {\n    if (index < 0 || index >= size) return;\n    remove(nodeAt(index));\n  }\n\n  private Node nodeAt(int index) {\n    Node current;\n    if (index < size / 2) {\n      current = head.next;\n      for (int i = 0; i < index; i++) current = current.next;\n    } else {\n      current = tail.previous;\n      for (int i = size - 1; i > index; i--) current = current.previous;\n    }\n    return current;\n  }\n\n  private void addAfter(Node previous, Node node) {\n    Node next = previous.next;\n    previous.next = node;\n    node.previous = previous;\n    node.next = next;\n    next.previous = node;\n    size++;\n  }\n\n  private void remove(Node node) {\n    node.previous.next = node.next;\n    node.next.previous = node.previous;\n    size--;\n  }\n\n  private static class Node {\n    int value;\n    Node previous;\n    Node next;\n\n    Node(int value) {\n      this.value = value;\n    }\n  }\n}"
    },
    {
      "group": "more",
      "name": "Split Linked List in Parts",
      "difficulty": "Medium",
      "subpattern": "Length-based list splitting",
      "question": "Given the head of a linked list and an integer k, split the list into k consecutive parts as equally as possible. Earlier parts should have size one greater when nodes cannot be split evenly.",
      "trigger": "The output sizes are determined by list length: each part gets length / k nodes, and the first length % k parts get one extra node.",
      "intuition": "Count nodes first, compute base size and extra parts, then cut the list after each part and store its head.",
      "edgeCases": "k greater than list length, empty list, one node, length divisible by k, length not divisible by k, preserving original order.",
      "constraints": "0 <= number of nodes <= 1000; 1 <= k <= 50; 0 <= Node.val <= 1000.",
      "source": {
        "label": "Split Linked List in Parts - LeetCode 725",
        "url": "https://leetcode.com/problems/split-linked-list-in-parts/"
      },
      "examples": [
        {
          "input": "head = [1,2,3], k = 5",
          "output": "[[1],[2],[3],[],[]]",
          "explanation": "Extra empty parts are added when k is larger than length."
        },
        {
          "input": "head = [1,2,3,4,5,6,7,8,9,10], k = 3",
          "output": "[[1,2,3,4],[5,6,7],[8,9,10]]",
          "explanation": "The first part gets one extra node."
        },
        {
          "input": "head = [], k = 3",
          "output": "[[],[],[]]",
          "explanation": "Every part is empty."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n + k). Copy values into an array and build each part separately.",
      "optimizedComplexity": "Time O(n + k); Space O(k) excluding output references. Count length and cut the original list into parts.",
      "recursiveComplexity": "Time O(n + k); Space O(n + k). Recursion can count and cut parts but adds call-stack space.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public ListNode[] splitListToParts(ListNode head, int k) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    ListNode[] parts = new ListNode[k];\n    int base = values.size() / k;\n    int extra = values.size() % k;\n    int index = 0;\n\n    for (int part = 0; part < k; part++) {\n      int size = base + (part < extra ? 1 : 0);\n      ListNode dummy = new ListNode(0);\n      ListNode tail = dummy;\n      for (int i = 0; i < size; i++) {\n        tail.next = new ListNode(values.get(index++));\n        tail = tail.next;\n      }\n      parts[part] = dummy.next;\n    }\n\n    return parts;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode[] splitListToParts(ListNode head, int k) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n\n    int base = length / k;\n    int extra = length % k;\n    ListNode[] parts = new ListNode[k];\n    ListNode current = head;\n\n    for (int i = 0; i < k; i++) {\n      parts[i] = current;\n      int partSize = base + (i < extra ? 1 : 0);\n\n      for (int j = 1; j < partSize; j++) {\n        current = current.next;\n      }\n\n      if (current != null) {\n        ListNode next = current.next;\n        current.next = null;\n        current = next;\n      }\n    }\n\n    return parts;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode[] splitListToParts(ListNode head, int k) {\n    int length = length(head);\n    ListNode[] parts = new ListNode[k];\n    split(head, parts, 0, length / k, length % k);\n    return parts;\n  }\n\n  private void split(ListNode head, ListNode[] parts, int index, int base, int extra) {\n    if (index == parts.length) return;\n\n    parts[index] = head;\n    int partSize = base + (index < extra ? 1 : 0);\n    ListNode current = head;\n\n    for (int i = 1; i < partSize && current != null; i++) {\n      current = current.next;\n    }\n\n    ListNode next = null;\n    if (current != null) {\n      next = current.next;\n      current.next = null;\n    }\n\n    split(next, parts, index + 1, base, extra);\n  }\n\n  private int length(ListNode node) {\n    if (node == null) return 0;\n    return 1 + length(node.next);\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode[] splitListToParts(ListNode head, int k) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n\n    int base = length / k;\n    int extra = length % k;\n    ListNode[] parts = new ListNode[k];\n    ListNode current = head;\n\n    for (int i = 0; i < k; i++) {\n      parts[i] = current;\n      int partSize = base + (i < extra ? 1 : 0);\n\n      for (int j = 1; j < partSize; j++) {\n        current = current.next;\n      }\n\n      if (current != null) {\n        ListNode next = current.next;\n        current.next = null;\n        current = next;\n      }\n    }\n\n    return parts;\n  }\n}",
      "code": "class Solution {\n  public ListNode[] splitListToParts(ListNode head, int k) {\n    int length = 0;\n    for (ListNode node = head; node != null; node = node.next) length++;\n\n    int base = length / k;\n    int extra = length % k;\n    ListNode[] parts = new ListNode[k];\n    ListNode current = head;\n\n    for (int i = 0; i < k; i++) {\n      parts[i] = current;\n      int partSize = base + (i < extra ? 1 : 0);\n\n      for (int j = 1; j < partSize; j++) {\n        current = current.next;\n      }\n\n      if (current != null) {\n        ListNode next = current.next;\n        current.next = null;\n        current = next;\n      }\n    }\n\n    return parts;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Next Greater Node In Linked List",
      "difficulty": "Medium",
      "subpattern": "Monotonic stack over linked-list values",
      "question": "Given the head of a linked list, return an array where answer[i] is the value of the next node after the ith node whose value is greater than the ith node value. If no such node exists, answer[i] is 0.",
      "trigger": "Each node needs the next greater value to its right, which is the classic monotonic decreasing stack pattern after converting traversal order to indexes.",
      "intuition": "Traverse values from left to right. While the current value is greater than values at unresolved indexes, fill those answers and pop them.",
      "edgeCases": "Strictly increasing list, strictly decreasing list, duplicate values, one node, all equal values.",
      "constraints": "1 <= number of nodes <= 10000; 1 <= Node.val <= 1000000000.",
      "source": {
        "label": "Next Greater Node In Linked List - LeetCode 1019",
        "url": "https://leetcode.com/problems/next-greater-node-in-linked-list/"
      },
      "examples": [
        {
          "input": "head = [2,1,5]",
          "output": "[5,5,0]",
          "explanation": "5 is next greater for 2 and 1; 5 has none."
        },
        {
          "input": "head = [2,7,4,3,5]",
          "output": "[7,0,5,5,0]",
          "explanation": "Unresolved nodes are filled when a larger value appears."
        },
        {
          "input": "head = [1,1,1]",
          "output": "[0,0,0]",
          "explanation": "Equal values are not greater."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). For each node, scan all following nodes until a greater value is found.",
      "optimizedComplexity": "Time O(n); Space O(n). A monotonic stack stores unresolved indexes.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive right-to-left processing can maintain a decreasing stack.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int[] nextLargerNodes(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    int[] answer = new int[values.size()];\n    for (int i = 0; i < values.size(); i++) {\n      for (int j = i + 1; j < values.size(); j++) {\n        if (values.get(j) > values.get(i)) {\n          answer[i] = values.get(j);\n          break;\n        }\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] nextLargerNodes(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    int[] answer = new int[values.size()];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < values.size(); i++) {\n      while (!stack.isEmpty() && values.get(i) > values.get(stack.peek())) {\n        answer[stack.pop()] = values.get(i);\n      }\n      stack.push(i);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] nextLargerNodes(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    collect(head, values);\n\n    int[] answer = new int[values.size()];\n    fill(values, values.size() - 1, new ArrayDeque<>(), answer);\n    return answer;\n  }\n\n  private void collect(ListNode node, List<Integer> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.next, values);\n  }\n\n  private void fill(List<Integer> values, int index, Deque<Integer> stack, int[] answer) {\n    if (index < 0) return;\n\n    while (!stack.isEmpty() && stack.peek() <= values.get(index)) stack.pop();\n    answer[index] = stack.isEmpty() ? 0 : stack.peek();\n    stack.push(values.get(index));\n\n    fill(values, index - 1, stack, answer);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] nextLargerNodes(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    int[] answer = new int[values.size()];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < values.size(); i++) {\n      while (!stack.isEmpty() && values.get(i) > values.get(stack.peek())) {\n        answer[stack.pop()] = values.get(i);\n      }\n      stack.push(i);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] nextLargerNodes(ListNode head) {\n    List<Integer> values = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n\n    int[] answer = new int[values.size()];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < values.size(); i++) {\n      while (!stack.isEmpty() && values.get(i) > values.get(stack.peek())) {\n        answer[stack.pop()] = values.get(i);\n      }\n      stack.push(i);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Double a Number Represented as a Linked List",
      "difficulty": "Medium",
      "subpattern": "Carry propagation through linked-list digits",
      "question": "Given the head of a non-empty linked list representing a non-negative integer with the most significant digit first, double the number and return the head of the resulting linked list.",
      "trigger": "The carry flows from least significant digit to most significant digit, opposite the list direction, so reverse traversal or recursion is needed.",
      "intuition": "Process from the tail using recursion, or reverse the list and double from least significant digit. If a carry remains, add a new head.",
      "edgeCases": "Single digit, final carry creates new head, all 9s, zeros inside number, no final carry.",
      "constraints": "1 <= number of nodes <= 10000; 0 <= Node.val <= 9; the list has no leading zeros except the number 0.",
      "source": {
        "label": "Double a Number Represented as a Linked List - LeetCode 2816",
        "url": "https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/"
      },
      "examples": [
        {
          "input": "head = [1,8,9]",
          "output": "[3,7,8]",
          "explanation": "189 doubled is 378."
        },
        {
          "input": "head = [9,9,9]",
          "output": "[1,9,9,8]",
          "explanation": "999 doubled is 1998."
        },
        {
          "input": "head = [0]",
          "output": "[0]",
          "explanation": "0 doubled is 0."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Copy digits to a list, process from right to left, and build the answer.",
      "optimizedComplexity": "Time O(n); Space O(1). Reverse, double with carry, append carry if needed, then reverse back.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion doubles the suffix first and returns carry to the caller.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass Solution {\n  public ListNode doubleIt(ListNode head) {\n    List<Integer> digits = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) digits.add(node.val);\n\n    List<Integer> result = new ArrayList<>();\n    int carry = 0;\n    for (int i = digits.size() - 1; i >= 0; i--) {\n      int value = digits.get(i) * 2 + carry;\n      result.add(value % 10);\n      carry = value / 10;\n    }\n    if (carry > 0) result.add(carry);\n    Collections.reverse(result);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int digit : result) {\n      tail.next = new ListNode(digit);\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public ListNode doubleIt(ListNode head) {\n    head = reverse(head);\n    ListNode current = head;\n    ListNode previous = null;\n    int carry = 0;\n\n    while (current != null) {\n      int value = current.val * 2 + carry;\n      current.val = value % 10;\n      carry = value / 10;\n      previous = current;\n      current = current.next;\n    }\n\n    if (carry > 0) previous.next = new ListNode(carry);\n    return reverse(head);\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}",
      "recursiveCode": "class Solution {\n  public ListNode doubleIt(ListNode head) {\n    int carry = doubleFromTail(head);\n    if (carry == 0) return head;\n\n    ListNode newHead = new ListNode(carry);\n    newHead.next = head;\n    return newHead;\n  }\n\n  private int doubleFromTail(ListNode node) {\n    if (node == null) return 0;\n\n    int carry = doubleFromTail(node.next);\n    int value = node.val * 2 + carry;\n    node.val = value % 10;\n    return value / 10;\n  }\n}",
      "optimizedCode": "class Solution {\n  public ListNode doubleIt(ListNode head) {\n    head = reverse(head);\n    ListNode current = head;\n    ListNode previous = null;\n    int carry = 0;\n\n    while (current != null) {\n      int value = current.val * 2 + carry;\n      current.val = value % 10;\n      carry = value / 10;\n      previous = current;\n      current = current.next;\n    }\n\n    if (carry > 0) previous.next = new ListNode(carry);\n    return reverse(head);\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}",
      "code": "class Solution {\n  public ListNode doubleIt(ListNode head) {\n    head = reverse(head);\n    ListNode current = head;\n    ListNode previous = null;\n    int carry = 0;\n\n    while (current != null) {\n      int value = current.val * 2 + carry;\n      current.val = value % 10;\n      carry = value / 10;\n      previous = current;\n      current = current.next;\n    }\n\n    if (carry > 0) previous.next = new ListNode(carry);\n    return reverse(head);\n  }\n\n  private ListNode reverse(ListNode head) {\n    ListNode previous = null;\n    while (head != null) {\n      ListNode next = head.next;\n      head.next = previous;\n      previous = head;\n      head = next;\n    }\n    return previous;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Convert Binary Number in a Linked List to Integer",
      "difficulty": "Easy",
      "subpattern": "Forward accumulation over linked-list digits",
      "question": "Given the head of a singly linked list where each node contains 0 or 1, return the decimal value of the binary number represented by the list.",
      "trigger": "The bits are stored from most significant to least significant, so each new bit shifts the current value left and adds the bit.",
      "intuition": "Walk the list once. For each bit, update value = value * 2 + bit.",
      "edgeCases": "Single node 0, single node 1, leading 1 followed by zeros, maximum length, alternating bits.",
      "constraints": "1 <= number of nodes <= 30; Node.val is 0 or 1.",
      "source": {
        "label": "Convert Binary Number in a Linked List to Integer - LeetCode 1290",
        "url": "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/"
      },
      "examples": [
        {
          "input": "head = [1,0,1]",
          "output": "5",
          "explanation": "Binary 101 equals decimal 5."
        },
        {
          "input": "head = [0]",
          "output": "0",
          "explanation": "Binary 0 equals decimal 0."
        },
        {
          "input": "head = [1,0,0,1]",
          "output": "9",
          "explanation": "Binary 1001 equals decimal 9."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store bits and compute the weighted sum afterward.",
      "optimizedComplexity": "Time O(n); Space O(1). Accumulate the decimal value while traversing once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion carries the accumulated value through the call stack.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int getDecimalValue(ListNode head) {\n    List<Integer> bits = new ArrayList<>();\n    for (ListNode node = head; node != null; node = node.next) bits.add(node.val);\n\n    int value = 0;\n    int power = 1;\n    for (int i = bits.size() - 1; i >= 0; i--) {\n      value += bits.get(i) * power;\n      power *= 2;\n    }\n\n    return value;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int getDecimalValue(ListNode head) {\n    int value = 0;\n\n    while (head != null) {\n      value = value * 2 + head.val;\n      head = head.next;\n    }\n\n    return value;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int getDecimalValue(ListNode head) {\n    return accumulate(head, 0);\n  }\n\n  private int accumulate(ListNode node, int value) {\n    if (node == null) return value;\n    return accumulate(node.next, value * 2 + node.val);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int getDecimalValue(ListNode head) {\n    int value = 0;\n\n    while (head != null) {\n      value = value * 2 + head.val;\n      head = head.next;\n    }\n\n    return value;\n  }\n}",
      "code": "class Solution {\n  public int getDecimalValue(ListNode head) {\n    int value = 0;\n\n    while (head != null) {\n      value = value * 2 + head.val;\n      head = head.next;\n    }\n\n    return value;\n  }\n}"
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
