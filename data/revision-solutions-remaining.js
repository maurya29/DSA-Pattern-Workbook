// Static revision-topic data generated from the source pattern files.
// Keep this file static so GitHub Pages does not depend on runtime fetch/eval.
(function () {
  Object.assign(REVISION_SOLUTION_TOPICS, {
  "queue-deque": {
    "id": "queue-deque",
    "name": "Queue and Deque Revision",
    "summary": "FIFO queues, circular buffers, monotonic deque windows, first-negative windows, and BFS grids.",
    "checklist": [
      "Use a queue when processing oldest pending work first.",
      "Use a deque when both ends matter or a monotonic window is needed.",
      "For circular queues, track front and size instead of shifting values.",
      "For BFS grids, push all starting cells before level traversal.",
      "For window queues, store indexes so expired values can be removed."
    ],
    "mistakes": [
      "Using values instead of indexes in sliding windows.",
      "Incrementing BFS minutes once per cell instead of once per level.",
      "Not handling full and empty circular queue states separately.",
      "Forgetting to remove expired indexes from a deque.",
      "Using DFS when shortest distance by levels is required."
    ],
    "edgeCases": [
      "Empty structure, one element, full circular buffer, k = 1, k = n, all fresh oranges, and no fresh oranges."
    ],
    "complexities": [
      "Queue and deque operations are O(1) amortized.",
      "Monotonic deque windows are O(n) because each index enters and leaves once.",
      "Grid BFS is O(rows * cols) time and space.",
      "Circular queue operations should be O(1)."
    ],
    "mentalModel": [
      "Queue means oldest unresolved item moves first.",
      "Deque means both front expiry and back pruning matter.",
      "Circular arrays replace physical shifting with modular indexes.",
      "BFS level size controls distance or time.",
      "Store indexes whenever window boundaries matter."
    ],
    "revisionStrategy": [
      "Solve Implement Queue and Circular Queue first.",
      "Then practice Sliding Window Maximum and First Negative Number together.",
      "Finish with Rotting Oranges to reinforce BFS level timing."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Implement Queue",
        "difficulty": "Easy",
        "subpattern": "Queue simulation with two stacks",
        "question": "Implement a first-in-first-out queue using only two stacks. Support push, pop, peek, and empty operations.",
        "trigger": "A queue removes the oldest item, while a stack exposes the newest item. Two stacks can reverse insertion order to expose the oldest item.",
        "intuition": "Push new values into input stack. For pop/peek, move all values to output stack only when output is empty, so the oldest value becomes the stack top.",
        "edgeCases": "Pop after many pushes, peek without pop, alternating push/pop, empty queue checks, moving elements only when needed.",
        "constraints": "1 \u003c= x \u003c= 9; at most 100 calls are made to push, pop, peek, and empty; pop and peek are called only on non-empty queue.",
        "source": {
          "label": "Implement Queue using Stacks - LeetCode 232",
          "url": "https://leetcode.com/problems/implement-queue-using-stacks/"
        },
        "examples": [
          {
            "input": "push(1), push(2), peek(), pop(), empty()",
            "output": "[null,null,1,1,false]",
            "explanation": "The first pushed value is returned first."
          },
          {
            "input": "push(3), pop(), empty()",
            "output": "[null,3,true]",
            "explanation": "After popping the only value, the queue is empty."
          },
          {
            "input": "push(1), push(2), pop(), push(3), peek()",
            "output": "[null,null,1,null,2]",
            "explanation": "The queue preserves FIFO order across later pushes."
          }
        ],
        "bruteForceComplexity": "push Time O(n), pop/peek/empty Time O(1); Space O(n). One-stack brute force reverses on every push.",
        "optimizedComplexity": "Amortized push/pop/peek/empty Time O(1); Space O(n). Each item moves from input stack to output stack at most once.",
        "recursiveComplexity": "push Time O(1), pop/peek Time O(n), Space O(n) recursion stack. Recursion can reach the oldest item in one stack but is not optimal.",
        "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque\u003cInteger> stack = new ArrayDeque\u003c>();\n\n  public void push(int x) {\n    Deque\u003cInteger> temp = new ArrayDeque\u003c>();\n    while (!stack.isEmpty()) temp.push(stack.pop());\n    stack.push(x);\n    while (!temp.isEmpty()) stack.push(temp.pop());\n  }\n\n  public int pop() {\n    return stack.pop();\n  }\n\n  public int peek() {\n    return stack.peek();\n  }\n\n  public boolean empty() {\n    return stack.isEmpty();\n  }\n}",
        "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque\u003cInteger> input = new ArrayDeque\u003c>();\n  private final Deque\u003cInteger> output = new ArrayDeque\u003c>();\n\n  public void push(int x) {\n    input.push(x);\n  }\n\n  public int pop() {\n    moveIfNeeded();\n    return output.pop();\n  }\n\n  public int peek() {\n    moveIfNeeded();\n    return output.peek();\n  }\n\n  public boolean empty() {\n    return input.isEmpty() && output.isEmpty();\n  }\n\n  private void moveIfNeeded() {\n    if (!output.isEmpty()) return;\n    while (!input.isEmpty()) output.push(input.pop());\n  }\n}",
        "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque\u003cInteger> stack = new ArrayDeque\u003c>();\n\n  public void push(int x) {\n    stack.push(x);\n  }\n\n  public int pop() {\n    return removeOldest();\n  }\n\n  public int peek() {\n    int value = removeOldest();\n    stack.push(value);\n    return value;\n  }\n\n  public boolean empty() {\n    return stack.isEmpty();\n  }\n\n  private int removeOldest() {\n    int value = stack.pop();\n    if (stack.isEmpty()) return value;\n    int oldest = removeOldest();\n    stack.push(value);\n    return oldest;\n  }\n}",
        "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque\u003cInteger> input = new ArrayDeque\u003c>();\n  private final Deque\u003cInteger> output = new ArrayDeque\u003c>();\n\n  public void push(int x) {\n    input.push(x);\n  }\n\n  public int pop() {\n    moveIfNeeded();\n    return output.pop();\n  }\n\n  public int peek() {\n    moveIfNeeded();\n    return output.peek();\n  }\n\n  public boolean empty() {\n    return input.isEmpty() && output.isEmpty();\n  }\n\n  private void moveIfNeeded() {\n    if (!output.isEmpty()) return;\n    while (!input.isEmpty()) output.push(input.pop());\n  }\n}",
        "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque\u003cInteger> input = new ArrayDeque\u003c>();\n  private final Deque\u003cInteger> output = new ArrayDeque\u003c>();\n\n  public void push(int x) {\n    input.push(x);\n  }\n\n  public int pop() {\n    moveIfNeeded();\n    return output.pop();\n  }\n\n  public int peek() {\n    moveIfNeeded();\n    return output.peek();\n  }\n\n  public boolean empty() {\n    return input.isEmpty() && output.isEmpty();\n  }\n\n  private void moveIfNeeded() {\n    if (!output.isEmpty()) return;\n    while (!input.isEmpty()) output.push(input.pop());\n  }\n}"
      },
      {
        "group": "core",
        "name": "Circular Queue",
        "difficulty": "Medium",
        "subpattern": "Fixed-size circular buffer",
        "question": "Design a circular queue with fixed capacity k. Support enQueue, deQueue, Front, Rear, isEmpty, and isFull.",
        "trigger": "A fixed-capacity queue needs O(1) insertion/removal at both logical ends without shifting elements, so indexes must wrap around with modulo arithmetic.",
        "intuition": "Store values in an array. Track front index and current size. The rear index is derived as (front + size - 1) % capacity.",
        "edgeCases": "Capacity one, enqueue into full queue, dequeue from empty queue, wrap-around after removals, front/rear on empty queue.",
        "constraints": "1 \u003c= k \u003c= 1000; 0 \u003c= value \u003c= 1000; at most 3000 calls are made to operations.",
        "source": {
          "label": "Design Circular Queue - LeetCode 622",
          "url": "https://leetcode.com/problems/design-circular-queue/"
        },
        "examples": [
          {
            "input": "MyCircularQueue(3), enQueue(1), enQueue(2), enQueue(3), enQueue(4), Rear(), isFull(), deQueue(), enQueue(4), Rear()",
            "output": "[null,true,true,true,false,3,true,true,true,4]",
            "explanation": "The fourth enqueue fails while full, then succeeds after one dequeue."
          },
          {
            "input": "MyCircularQueue(1), enQueue(10), isFull(), deQueue(), isEmpty()",
            "output": "[null,true,true,true,true]",
            "explanation": "Capacity one toggles between full and empty."
          },
          {
            "input": "MyCircularQueue(2), Front(), Rear()",
            "output": "[null,-1,-1]",
            "explanation": "Front and Rear return -1 when empty."
          }
        ],
        "bruteForceComplexity": "enQueue Time O(1), deQueue Time O(n), Space O(k). Array shifting after dequeue is simple but inefficient.",
        "optimizedComplexity": "All operations Time O(1); Space O(k). Circular indexes avoid shifting.",
        "recursiveComplexity": "Time O(1), Space O(1). Recursive implementation is not useful for circular queues; the correct design uses iterative index updates.",
        "bruteForceCode": "class MyCircularQueue {\n  private final int[] data;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    data[size++] = value;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    for (int i = 1; i \u003c size; i++) data[i - 1] = data[i];\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[0];\n  }\n\n  public int Rear() {\n    return isEmpty() ? -1 : data[size - 1];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}",
        "iterativeCode": "class MyCircularQueue {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int Rear() {\n    if (isEmpty()) return -1;\n    int rear = (front + size - 1) % data.length;\n    return data[rear];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}",
        "recursiveCode": "class MyCircularQueue {\n  private final MyCircularQueueCore queue;\n\n  public MyCircularQueue(int k) {\n    queue = new MyCircularQueueCore(k);\n  }\n\n  public boolean enQueue(int value) { return queue.enQueue(value); }\n  public boolean deQueue() { return queue.deQueue(); }\n  public int Front() { return queue.Front(); }\n  public int Rear() { return queue.Rear(); }\n  public boolean isEmpty() { return queue.isEmpty(); }\n  public boolean isFull() { return queue.isFull(); }\n}\n\nclass MyCircularQueueCore {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  MyCircularQueueCore(int k) { data = new int[k]; }\n\n  boolean enQueue(int value) {\n    if (isFull()) return false;\n    data[(front + size) % data.length] = value;\n    size++;\n    return true;\n  }\n\n  boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  int Front() { return isEmpty() ? -1 : data[front]; }\n  int Rear() { return isEmpty() ? -1 : data[(front + size - 1) % data.length]; }\n  boolean isEmpty() { return size == 0; }\n  boolean isFull() { return size == data.length; }\n}",
        "optimizedCode": "class MyCircularQueue {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int Rear() {\n    if (isEmpty()) return -1;\n    int rear = (front + size - 1) % data.length;\n    return data[rear];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}",
        "code": "class MyCircularQueue {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int Rear() {\n    if (isEmpty()) return -1;\n    int rear = (front + size - 1) % data.length;\n    return data[rear];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Sliding Window Maximum",
        "difficulty": "Hard",
        "subpattern": "Monotonic decreasing deque",
        "question": "Given an integer array nums and an integer k, return an array containing the maximum value in every contiguous window of size k.",
        "trigger": "Each window needs its maximum while moving one step at a time, so a deque can keep candidate indexes in decreasing value order.",
        "intuition": "Remove indexes outside the current window from the front. Remove smaller/equal values from the back before adding the current index. The front is the maximum.",
        "edgeCases": "k = 1, k = nums.length, duplicate values, negative numbers, strictly increasing array, strictly decreasing array.",
        "constraints": "1 \u003c= nums.length \u003c= 100000; -10000 \u003c= nums[i] \u003c= 10000; 1 \u003c= k \u003c= nums.length.",
        "source": {
          "label": "Sliding Window Maximum - LeetCode 239",
          "url": "https://leetcode.com/problems/sliding-window-maximum/"
        },
        "examples": [
          {
            "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
            "output": "[3,3,5,5,6,7]",
            "explanation": "Each output is the maximum of a length-3 window."
          },
          {
            "input": "nums = [1], k = 1",
            "output": "[1]",
            "explanation": "The only window contains the only value."
          },
          {
            "input": "nums = [9,8,7], k = 2",
            "output": "[9,8]",
            "explanation": "The maximum moves as the leftmost value expires."
          }
        ],
        "bruteForceComplexity": "Time O(n*k); Space O(1) excluding output. Compute each window maximum by scanning k values.",
        "optimizedComplexity": "Time O(n); Space O(k). Each index enters and leaves the deque at most once.",
        "recursiveComplexity": "Time O(n); Space O(n + k). Recursive scan can maintain the same monotonic deque.",
        "bruteForceCode": "class Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n\n    for (int left = 0; left \u003c= nums.length - k; left++) {\n      int max = nums[left];\n      for (int i = left + 1; i \u003c left + k; i++) {\n        max = Math.max(max, nums[i]);\n      }\n      answer[left] = max;\n    }\n\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    Deque\u003cInteger> deque = new ArrayDeque\u003c>();\n\n    for (int right = 0; right \u003c nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() \u003c= right - k) deque.pollFirst();\n      while (!deque.isEmpty() && nums[deque.peekLast()] \u003c= nums[right]) deque.pollLast();\n\n      deque.offerLast(right);\n      if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    fill(nums, k, 0, new ArrayDeque\u003c>(), answer);\n    return answer;\n  }\n\n  private void fill(int[] nums, int k, int right, Deque\u003cInteger> deque, int[] answer) {\n    if (right == nums.length) return;\n\n    while (!deque.isEmpty() && deque.peekFirst() \u003c= right - k) deque.pollFirst();\n    while (!deque.isEmpty() && nums[deque.peekLast()] \u003c= nums[right]) deque.pollLast();\n    deque.offerLast(right);\n\n    if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    fill(nums, k, right + 1, deque, answer);\n  }\n}",
        "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    Deque\u003cInteger> deque = new ArrayDeque\u003c>();\n\n    for (int right = 0; right \u003c nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() \u003c= right - k) deque.pollFirst();\n      while (!deque.isEmpty() && nums[deque.peekLast()] \u003c= nums[right]) deque.pollLast();\n\n      deque.offerLast(right);\n      if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    }\n\n    return answer;\n  }\n}",
        "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    Deque\u003cInteger> deque = new ArrayDeque\u003c>();\n\n    for (int right = 0; right \u003c nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() \u003c= right - k) deque.pollFirst();\n      while (!deque.isEmpty() && nums[deque.peekLast()] \u003c= nums[right]) deque.pollLast();\n\n      deque.offerLast(right);\n      if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    }\n\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "First Negative Number in Window",
        "difficulty": "Medium",
        "subpattern": "Fixed-size window with queue",
        "question": "Given an integer array nums and window size k, return the first negative number in every contiguous window of size k. Use 0 when a window has no negative number.",
        "trigger": "Each window needs the oldest negative value still inside its left boundary.",
        "intuition": "Store indexes of negative values in a queue. Drop indexes that leave the window.",
        "edgeCases": "No negatives, all negatives, k = 1, k = nums.length, negatives at boundaries, and repeated zero values.",
        "constraints": "1 \u003c= k \u003c= nums.length. Values may be positive, negative, or zero.",
        "bruteForceComplexity": "Time O(n*k), Space O(1) excluding the answer.",
        "optimizedComplexity": "Time O(n), Space O(k).",
        "recursiveComplexity": "Time O(n), Space O(k + n) including recursion stack.",
        "examples": [
          {
            "input": "nums = [12, -1, -7, 8, -15, 30, 16, 28], k = 3",
            "output": "[-1, -1, -7, -15, -15, 0]",
            "explanation": "Each output value is the first negative number in that window."
          }
        ],
        "bruteForceCode": "class Solution {\n  public int[] firstNegativeInWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n\n    for (int left = 0; left + k \u003c= nums.length; left++) {\n      for (int right = left; right \u003c left + k; right++) {\n        if (nums[right] \u003c 0) {\n          answer[left] = nums[right];\n          break;\n        }\n      }\n    }\n\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] firstNegativeInWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    Deque\u003cInteger> negatives = new ArrayDeque\u003c>();\n\n    for (int right = 0; right \u003c nums.length; right++) {\n      if (nums[right] \u003c 0) {\n        negatives.offerLast(right);\n      }\n\n      if (right >= k - 1) {\n        int left = right - k + 1;\n        while (!negatives.isEmpty() && negatives.peekFirst() \u003c left) {\n          negatives.pollFirst();\n        }\n        answer[left] = negatives.isEmpty() ? 0 : nums[negatives.peekFirst()];\n      }\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] firstNegativeInWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    fill(nums, k, 0, new ArrayDeque\u003c>(), answer);\n    return answer;\n  }\n\n  private void fill(int[] nums, int k, int right, Deque\u003cInteger> negatives, int[] answer) {\n    if (right == nums.length) {\n      return;\n    }\n\n    if (nums[right] \u003c 0) {\n      negatives.offerLast(right);\n    }\n\n    if (right >= k - 1) {\n      int left = right - k + 1;\n      while (!negatives.isEmpty() && negatives.peekFirst() \u003c left) {\n        negatives.pollFirst();\n      }\n      answer[left] = negatives.isEmpty() ? 0 : nums[negatives.peekFirst()];\n    }\n\n    fill(nums, k, right + 1, negatives, answer);\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Rotting Oranges",
        "difficulty": "Medium",
        "subpattern": "Multi-source BFS queue",
        "question": "Given a grid where 0 is empty, 1 is a fresh orange, and 2 is a rotten orange, return the minimum minutes until no fresh orange remains. Each minute, rotten oranges rot adjacent fresh oranges. Return -1 if impossible.",
        "trigger": "Rot spreads level by level from all initially rotten oranges, so all starting rotten cells must enter the BFS queue at time 0.",
        "intuition": "Count fresh oranges, enqueue all rotten oranges, and process BFS layers. Each layer is one minute of spread.",
        "edgeCases": "No fresh oranges, no rotten oranges, isolated fresh orange, all oranges rotten, one-cell grid.",
        "constraints": "1 \u003c= m, n \u003c= 10; grid[i][j] is 0, 1, or 2.",
        "source": {
          "label": "Rotting Oranges - LeetCode 994",
          "url": "https://leetcode.com/problems/rotting-oranges/"
        },
        "examples": [
          {
            "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
            "output": "4",
            "explanation": "Rot spreads for four BFS layers until all fresh oranges rot."
          },
          {
            "input": "grid = [[2,1,1],[0,1,1],[1,0,1]]",
            "output": "-1",
            "explanation": "The bottom-left orange is isolated."
          },
          {
            "input": "grid = [[0,2]]",
            "output": "0",
            "explanation": "There are no fresh oranges."
          }
        ],
        "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Repeatedly scan the whole grid minute by minute for newly rotten cells.",
        "optimizedComplexity": "Time O(mn); Space O(mn). Each orange enters the BFS queue at most once.",
        "recursiveComplexity": "Time O(mn); Space O(mn). Recursive layer BFS uses call stack for each minute layer.",
        "bruteForceCode": "class Solution {\n  public int orangesRotting(int[][] grid) {\n    int minutes = 0;\n\n    while (true) {\n      boolean changed = false;\n      int[][] copy = new int[grid.length][grid[0].length];\n      for (int r = 0; r \u003c grid.length; r++) copy[r] = grid[r].clone();\n\n      for (int r = 0; r \u003c grid.length; r++) {\n        for (int c = 0; c \u003c grid[0].length; c++) {\n          if (grid[r][c] == 1 && hasRottenNeighbor(grid, r, c)) {\n            copy[r][c] = 2;\n            changed = true;\n          }\n        }\n      }\n\n      if (!changed) break;\n      grid = copy;\n      minutes++;\n    }\n\n    for (int[] row : grid) for (int cell : row) if (cell == 1) return -1;\n    return minutes;\n  }\n\n  private boolean hasRottenNeighbor(int[][] grid, int r, int c) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    for (int[] d : dirs) {\n      int nr = r + d[0], nc = c + d[1];\n      if (nr >= 0 && nc >= 0 && nr \u003c grid.length && nc \u003c grid[0].length && grid[nr][nc] == 2) return true;\n    }\n    return false;\n  }\n}",
        "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    int fresh = 0;\n\n    for (int r = 0; r \u003c grid.length; r++) {\n      for (int c = 0; c \u003c grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      minutes++;\n\n      for (int i = 0; i \u003c size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr \u003c 0 || nc \u003c 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n    }\n\n    return fresh == 0 ? minutes : -1;\n  }\n}",
        "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int orangesRotting(int[][] grid) {\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    int fresh = 0;\n\n    for (int r = 0; r \u003c grid.length; r++) {\n      for (int c = 0; c \u003c grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int result = bfs(grid, queue, fresh, 0);\n    return result;\n  }\n\n  private int bfs(int[][] grid, Queue\u003cint[]> queue, int fresh, int minutes) {\n    if (fresh == 0) return minutes;\n    if (queue.isEmpty()) return -1;\n\n    int size = queue.size();\n    for (int i = 0; i \u003c size; i++) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr \u003c 0 || nc \u003c 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n        grid[nr][nc] = 2;\n        fresh--;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n    return bfs(grid, queue, fresh, minutes + 1);\n  }\n}",
        "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    int fresh = 0;\n\n    for (int r = 0; r \u003c grid.length; r++) {\n      for (int c = 0; c \u003c grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      minutes++;\n\n      for (int i = 0; i \u003c size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr \u003c 0 || nc \u003c 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n    }\n\n    return fresh == 0 ? minutes : -1;\n  }\n}",
        "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    int fresh = 0;\n\n    for (int r = 0; r \u003c grid.length; r++) {\n      for (int c = 0; c \u003c grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      minutes++;\n\n      for (int i = 0; i \u003c size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr \u003c 0 || nc \u003c 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n    }\n\n    return fresh == 0 ? minutes : -1;\n  }\n}"
      }
    ]
  },
  "trees": {
    "id": "trees",
    "name": "Trees Revision",
    "summary": "DFS traversals, BFS level order, height/diameter aggregation, path sums, LCA, and tree views.",
    "checklist": [
      "Identify whether the answer is preorder, inorder, postorder, or level order.",
      "Return values from children when the parent combines subtree information.",
      "Track depth for views and vertical traversal.",
      "Use BFS when order by level is required.",
      "Use DFS when subtree height, path, or ancestor state is needed."
    ],
    "mistakes": [
      "Confusing height in nodes versus edges.",
      "Updating diameter after returning from only one child.",
      "Forgetting negative values in maximum path sum.",
      "Recording right or left view after both children instead of first visible node.",
      "Not sorting row/value ties in vertical traversal."
    ],
    "edgeCases": [
      "Empty tree, one node, skewed tree, duplicate values, negative values, and missing children."
    ],
    "complexities": [
      "Most tree traversals are O(n) time.",
      "Recursive DFS adds O(h) stack space.",
      "BFS adds O(w) queue space.",
      "Sorting vertical coordinates costs O(n log n)."
    ],
    "mentalModel": [
      "Traversal order is where you process the current node.",
      "Subtree problems usually return one value and update a global answer.",
      "Level problems use queue size.",
      "View problems record first or last node per depth.",
      "Ancestor problems decide whether targets appear in left, right, or current node."
    ],
    "revisionStrategy": [
      "Start with preorder, inorder, postorder, and level order.",
      "Then revise height, diameter, balanced tree, and max path sum.",
      "Finish with LCA and views."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Preorder Traversal",
        "difficulty": "Easy",
        "subpattern": "Root-left-right DFS traversal",
        "question": "Given the root of a binary tree, return its preorder traversal order as a list of node values.",
        "trigger": "The problem asks for a deterministic root/left/right visitation order.",
        "intuition": "Traversal is controlled by the position where the current node is recorded relative to its children.",
        "edgeCases": "Empty tree, one node, skewed tree, complete tree, and duplicate values.",
        "constraints": "Number of nodes may be zero or more.",
        "bruteForceComplexity": "Time O(n), Space O(n). Recursive DFS is the direct baseline.",
        "optimizedComplexity": "Time O(n), Space O(h) to O(n) depending on tree shape.",
        "recursiveComplexity": "Time O(n), Space O(h) recursion stack.",
        "examples": [
          {
            "input": "root = [1, null, 2, 3]",
            "output": "[1, 2, 3]",
            "explanation": "The output follows the requested traversal order."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> preorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    traverse(root, answer);\n    return answer;\n  }\n\n  private void traverse(TreeNode node, List\u003cInteger> answer) {\n    if (node == null) {\n      return;\n    }\n\n    answer.add(node.val);\n    traverse(node.left, answer);\n    traverse(node.right, answer);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> preorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) {\n      return answer;\n    }\n\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    stack.push(root);\n\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      answer.add(node.val);\n      if (node.right != null) {\n        stack.push(node.right);\n      }\n      if (node.left != null) {\n        stack.push(node.left);\n      }\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> preorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    traverse(root, answer);\n    return answer;\n  }\n\n  private void traverse(TreeNode node, List\u003cInteger> answer) {\n    if (node == null) {\n      return;\n    }\n\n    answer.add(node.val);\n    traverse(node.left, answer);\n    traverse(node.right, answer);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Inorder Traversal",
        "difficulty": "Easy",
        "subpattern": "Left-root-right DFS traversal",
        "question": "Given the root of a binary tree, return its inorder traversal order as a list of node values.",
        "trigger": "The problem asks for a deterministic root/left/right visitation order.",
        "intuition": "Traversal is controlled by the position where the current node is recorded relative to its children.",
        "edgeCases": "Empty tree, one node, skewed tree, complete tree, and duplicate values.",
        "constraints": "Number of nodes may be zero or more.",
        "bruteForceComplexity": "Time O(n), Space O(n). Recursive DFS is the direct baseline.",
        "optimizedComplexity": "Time O(n), Space O(h) to O(n) depending on tree shape.",
        "recursiveComplexity": "Time O(n), Space O(h) recursion stack.",
        "examples": [
          {
            "input": "root = [1, null, 2, 3]",
            "output": "[1, 3, 2]",
            "explanation": "The output follows the requested traversal order."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> inorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    traverse(root, answer);\n    return answer;\n  }\n\n  private void traverse(TreeNode node, List\u003cInteger> answer) {\n    if (node == null) {\n      return;\n    }\n\n    traverse(node.left, answer);\n    answer.add(node.val);\n    traverse(node.right, answer);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> inorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) {\n        stack.push(current);\n        current = current.left;\n      }\n\n      current = stack.pop();\n      answer.add(current.val);\n      current = current.right;\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> inorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    traverse(root, answer);\n    return answer;\n  }\n\n  private void traverse(TreeNode node, List\u003cInteger> answer) {\n    if (node == null) {\n      return;\n    }\n\n    traverse(node.left, answer);\n    answer.add(node.val);\n    traverse(node.right, answer);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Postorder Traversal",
        "difficulty": "Easy",
        "subpattern": "Left-right-root DFS traversal",
        "question": "Given the root of a binary tree, return its postorder traversal order as a list of node values.",
        "trigger": "The problem asks for a deterministic root/left/right visitation order.",
        "intuition": "Traversal is controlled by the position where the current node is recorded relative to its children.",
        "edgeCases": "Empty tree, one node, skewed tree, complete tree, and duplicate values.",
        "constraints": "Number of nodes may be zero or more.",
        "bruteForceComplexity": "Time O(n), Space O(n). Recursive DFS is the direct baseline.",
        "optimizedComplexity": "Time O(n), Space O(h) to O(n) depending on tree shape.",
        "recursiveComplexity": "Time O(n), Space O(h) recursion stack.",
        "examples": [
          {
            "input": "root = [1, null, 2, 3]",
            "output": "[3, 2, 1]",
            "explanation": "The output follows the requested traversal order."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> postorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    traverse(root, answer);\n    return answer;\n  }\n\n  private void traverse(TreeNode node, List\u003cInteger> answer) {\n    if (node == null) {\n      return;\n    }\n\n    traverse(node.left, answer);\n    traverse(node.right, answer);\n    answer.add(node.val);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> postorderTraversal(TreeNode root) {\n    LinkedList\u003cInteger> answer = new LinkedList\u003c>();\n    if (root == null) {\n      return answer;\n    }\n\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    stack.push(root);\n\n    while (!stack.isEmpty()) {\n      TreeNode node = stack.pop();\n      answer.addFirst(node.val);\n      if (node.left != null) {\n        stack.push(node.left);\n      }\n      if (node.right != null) {\n        stack.push(node.right);\n      }\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> postorderTraversal(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    traverse(root, answer);\n    return answer;\n  }\n\n  private void traverse(TreeNode node, List\u003cInteger> answer) {\n    if (node == null) {\n      return;\n    }\n\n    traverse(node.left, answer);\n    traverse(node.right, answer);\n    answer.add(node.val);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Level Order Traversal",
        "difficulty": "Medium",
        "subpattern": "Tree BFS level traversal",
        "question": "Given the root of a binary tree, return the level order traversal of its nodes values from left to right, level by level.",
        "trigger": "The output is grouped by depth, so BFS naturally processes one complete level at a time.",
        "intuition": "Use a queue. For each level, process exactly the current queue size and enqueue children for the next level.",
        "edgeCases": "Empty tree, one node, incomplete levels, skewed tree, preserving left-to-right order.",
        "constraints": "0 \u003c= number of nodes \u003c= 2000; -1000 \u003c= Node.val \u003c= 1000.",
        "source": {
          "label": "Binary Tree Level Order Traversal - LeetCode 102",
          "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
        },
        "examples": [
          {
            "input": "root = [3,9,20,null,null,15,7]",
            "output": "[[3],[9,20],[15,7]]",
            "explanation": "Values are grouped by depth."
          },
          {
            "input": "root = [1]",
            "output": "[[1]]",
            "explanation": "One level contains the root."
          },
          {
            "input": "root = []",
            "output": "[]",
            "explanation": "There are no levels."
          }
        ],
        "bruteForceComplexity": "Time O(n*h); Space O(h + n). Compute tree height, then collect each depth separately.",
        "optimizedComplexity": "Time O(n); Space O(w). BFS visits each node once and stores the widest level.",
        "recursiveComplexity": "Time O(n); Space O(h). DFS creates a list for each depth and appends node values.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> levelOrder(TreeNode root) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    int height = height(root);\n    for (int depth = 0; depth \u003c height; depth++) {\n      List\u003cInteger> level = new ArrayList\u003c>();\n      collect(root, depth, level);\n      answer.add(level);\n    }\n    return answer;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n\n  private void collect(TreeNode node, int depth, List\u003cInteger> level) {\n    if (node == null) return;\n    if (depth == 0) level.add(node.val);\n    else { collect(node.left, depth - 1, level); collect(node.right, depth - 1, level); }\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> levelOrder(TreeNode root) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List\u003cInteger> level = new ArrayList\u003c>();\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(level);\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> levelOrder(TreeNode root) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    dfs(root, 0, answer);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int depth, List\u003cList\u003cInteger>> answer) {\n    if (node == null) return;\n    if (depth == answer.size()) answer.add(new ArrayList\u003c>());\n    answer.get(depth).add(node.val);\n    dfs(node.left, depth + 1, answer);\n    dfs(node.right, depth + 1, answer);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> levelOrder(TreeNode root) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List\u003cInteger> level = new ArrayList\u003c>();\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(level);\n    }\n\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> levelOrder(TreeNode root) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List\u003cInteger> level = new ArrayList\u003c>();\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      answer.add(level);\n    }\n\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Height of Tree",
        "difficulty": "Easy",
        "subpattern": "Tree DFS height aggregation",
        "question": "Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node down to a leaf.",
        "trigger": "The depth of a node is defined from the depths of its left and right subtrees, so every subtree returns one value to its parent.",
        "intuition": "An empty tree has depth 0. A non-empty node contributes 1 plus the larger depth of its children.",
        "edgeCases": "Empty tree, one node, completely skewed tree, balanced tree, deep recursion stack.",
        "constraints": "0 \u003c= number of nodes \u003c= 10000; -100 \u003c= Node.val \u003c= 100.",
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
            "explanation": "The right-skewed path has two nodes."
          },
          {
            "input": "root = []",
            "output": "0",
            "explanation": "An empty tree has depth 0."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(n). Store all root-to-leaf depths, then take the maximum.",
        "optimizedComplexity": "Time O(n); Space O(w). BFS level traversal counts tree levels.",
        "recursiveComplexity": "Time O(n); Space O(h). DFS recursion returns height from each subtree.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    List\u003cInteger> depths = new ArrayList\u003c>();\n    collect(root, 0, depths);\n    int best = 0;\n    for (int depth : depths) {\n      best = Math.max(best, depth);\n    }\n    return best;\n  }\n\n  private void collect(TreeNode node, int depth, List\u003cInteger> depths) {\n    if (node == null) {\n      depths.add(depth);\n      return;\n    }\n    collect(node.left, depth + 1, depths);\n    collect(node.right, depth + 1, depths);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    int leftDepth = maxDepth(root.left);\n    int rightDepth = maxDepth(root.right);\n    return 1 + Math.max(leftDepth, rightDepth);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n    int depth = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      depth++;\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return depth;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Diameter of Tree",
        "difficulty": "Easy",
        "subpattern": "Tree DFS height and global aggregation",
        "question": "Given the root of a binary tree, return the length in edges of the longest path between any two nodes in the tree.",
        "trigger": "The best path through a node is left height plus right height, while each subtree must return height to its parent.",
        "intuition": "Postorder DFS computes child heights. Update global diameter with leftHeight + rightHeight at every node.",
        "edgeCases": "Empty tree, one node diameter 0, skewed tree, longest path not passing through root, edge count not node count.",
        "constraints": "1 \u003c= number of nodes \u003c= 10000; -100 \u003c= Node.val \u003c= 100.",
        "source": {
          "label": "Diameter of Binary Tree - LeetCode 543",
          "url": "https://leetcode.com/problems/diameter-of-binary-tree/"
        },
        "examples": [
          {
            "input": "root = [1,2,3,4,5]",
            "output": "3",
            "explanation": "The longest path is 4-2-1-3 or 5-2-1-3."
          },
          {
            "input": "root = [1,2]",
            "output": "1",
            "explanation": "The only edge is the diameter."
          },
          {
            "input": "root = [1]",
            "output": "0",
            "explanation": "A single node has no edge path."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(h). For every node, recompute left and right heights.",
        "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes heights once per node.",
        "recursiveComplexity": "Time O(n); Space O(h). Postorder DFS returns heights and updates the best diameter.",
        "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    int throughRoot = height(root.left) + height(root.right);\n    int left = diameterOfBinaryTree(root.left);\n    int right = diameterOfBinaryTree(root.right);\n    return Math.max(throughRoot, Math.max(left, right));\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    Map\u003cTreeNode, Integer> height = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = 0;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode peek = stack.peek();\n      if (peek.right != null && last != peek.right) { current = peek.right; continue; }\n      int left = height.getOrDefault(peek.left, 0);\n      int right = height.getOrDefault(peek.right, 0);\n      best = Math.max(best, left + right);\n      height.put(peek, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int best = 0;\n\n  public int diameterOfBinaryTree(TreeNode root) {\n    height(root);\n    return best;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    int left = height(node.left);\n    int right = height(node.right);\n    best = Math.max(best, left + right);\n    return 1 + Math.max(left, right);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    Map\u003cTreeNode, Integer> height = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = 0;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode peek = stack.peek();\n      if (peek.right != null && last != peek.right) { current = peek.right; continue; }\n      int left = height.getOrDefault(peek.left, 0);\n      int right = height.getOrDefault(peek.right, 0);\n      best = Math.max(best, left + right);\n      height.put(peek, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int diameterOfBinaryTree(TreeNode root) {\n    if (root == null) return 0;\n    Map\u003cTreeNode, Integer> height = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = 0;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode peek = stack.peek();\n      if (peek.right != null && last != peek.right) { current = peek.right; continue; }\n      int left = height.getOrDefault(peek.left, 0);\n      int right = height.getOrDefault(peek.right, 0);\n      best = Math.max(best, left + right);\n      height.put(peek, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Balanced Binary Tree",
        "difficulty": "Easy",
        "subpattern": "Tree DFS height with sentinel failure",
        "question": "Given a binary tree, return true if it is height-balanced: for every node, the left and right subtree heights differ by no more than one.",
        "trigger": "Balance depends on subtree heights, and an unbalanced child should stop work early.",
        "intuition": "Return subtree height when balanced; return -1 as a sentinel when any subtree is already unbalanced.",
        "edgeCases": "Empty tree, one node, skewed tree, imbalance deep below root, difference exactly one.",
        "constraints": "0 \u003c= number of nodes \u003c= 5000; -10000 \u003c= Node.val \u003c= 10000.",
        "source": {
          "label": "Balanced Binary Tree - LeetCode 110",
          "url": "https://leetcode.com/problems/balanced-binary-tree/"
        },
        "examples": [
          {
            "input": "root = [3,9,20,null,null,15,7]",
            "output": "true",
            "explanation": "Every subtree height difference is at most one."
          },
          {
            "input": "root = [1,2,2,3,3,null,null,4,4]",
            "output": "false",
            "explanation": "The left subtree is too deep."
          },
          {
            "input": "root = []",
            "output": "true",
            "explanation": "An empty tree is balanced."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(h). Recompute heights for every node.",
        "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes each height once.",
        "recursiveComplexity": "Time O(n); Space O(h). DFS returns -1 immediately for unbalanced subtrees.",
        "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    if (root == null) return true;\n    int left = height(root.left);\n    int right = height(root.right);\n    return Math.abs(left - right) \u003c= 1 && isBalanced(root.left) && isBalanced(root.right);\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    Map\u003cTreeNode, Integer> height = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = height.getOrDefault(node.left, 0);\n      int right = height.getOrDefault(node.right, 0);\n      if (Math.abs(left - right) > 1) return false;\n      height.put(node, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return true;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    return height(root) != -1;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    int left = height(node.left);\n    if (left == -1) return -1;\n    int right = height(node.right);\n    if (right == -1) return -1;\n    if (Math.abs(left - right) > 1) return -1;\n    return 1 + Math.max(left, right);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    Map\u003cTreeNode, Integer> height = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = height.getOrDefault(node.left, 0);\n      int right = height.getOrDefault(node.right, 0);\n      if (Math.abs(left - right) > 1) return false;\n      height.put(node, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return true;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isBalanced(TreeNode root) {\n    Map\u003cTreeNode, Integer> height = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = height.getOrDefault(node.left, 0);\n      int right = height.getOrDefault(node.right, 0);\n      if (Math.abs(left - right) > 1) return false;\n      height.put(node, 1 + Math.max(left, right));\n      last = stack.pop();\n    }\n    return true;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Maximum Path Sum",
        "difficulty": "Hard",
        "subpattern": "Tree DFS gain aggregation",
        "question": "Given the root of a non-empty binary tree, return the maximum path sum of any non-empty path. A path can start and end at any nodes and must follow parent-child links.",
        "trigger": "The best complete path through a node can use both children, but the gain returned to the parent can use only one side.",
        "intuition": "For each node, compute max downward gain from left and right, ignoring negative gains. Update global best with left + node + right.",
        "edgeCases": "All negative values, one node, best path not through root, negative child gain, skewed tree.",
        "constraints": "1 \u003c= number of nodes \u003c= 30000; -1000 \u003c= Node.val \u003c= 1000.",
        "source": {
          "label": "Binary Tree Maximum Path Sum - LeetCode 124",
          "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
        },
        "examples": [
          {
            "input": "root = [1,2,3]",
            "output": "6",
            "explanation": "The best path is 2 -> 1 -> 3."
          },
          {
            "input": "root = [-10,9,20,null,null,15,7]",
            "output": "42",
            "explanation": "The best path is 15 -> 20 -> 7."
          },
          {
            "input": "root = [-3]",
            "output": "-3",
            "explanation": "A path must contain at least one node."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(n). Treat every node as a path peak and recompute best downward gains.",
        "optimizedComplexity": "Time O(n); Space O(n). Iterative postorder computes each downward gain once.",
        "recursiveComplexity": "Time O(n); Space O(h). Postorder DFS returns one-side gain and updates global answer.",
        "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    if (root == null) return Integer.MIN_VALUE;\n    int throughRoot = root.val + Math.max(0, gain(root.left)) + Math.max(0, gain(root.right));\n    int left = maxPathSum(root.left);\n    int right = maxPathSum(root.right);\n    return Math.max(throughRoot, Math.max(left, right));\n  }\n\n  private int gain(TreeNode node) {\n    if (node == null) return 0;\n    return node.val + Math.max(0, Math.max(gain(node.left), gain(node.right)));\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    Map\u003cTreeNode, Integer> gain = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = Integer.MIN_VALUE;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = Math.max(0, gain.getOrDefault(node.left, 0));\n      int right = Math.max(0, gain.getOrDefault(node.right, 0));\n      best = Math.max(best, node.val + left + right);\n      gain.put(node, node.val + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int best = Integer.MIN_VALUE;\n\n  public int maxPathSum(TreeNode root) {\n    gain(root);\n    return best;\n  }\n\n  private int gain(TreeNode node) {\n    if (node == null) return 0;\n    int left = Math.max(0, gain(node.left));\n    int right = Math.max(0, gain(node.right));\n    best = Math.max(best, node.val + left + right);\n    return node.val + Math.max(left, right);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    Map\u003cTreeNode, Integer> gain = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = Integer.MIN_VALUE;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = Math.max(0, gain.getOrDefault(node.left, 0));\n      int right = Math.max(0, gain.getOrDefault(node.right, 0));\n      best = Math.max(best, node.val + left + right);\n      gain.put(node, node.val + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int maxPathSum(TreeNode root) {\n    Map\u003cTreeNode, Integer> gain = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    TreeNode last = null;\n    int best = Integer.MIN_VALUE;\n\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      TreeNode node = stack.peek();\n      if (node.right != null && last != node.right) { current = node.right; continue; }\n      int left = Math.max(0, gain.getOrDefault(node.left, 0));\n      int right = Math.max(0, gain.getOrDefault(node.right, 0));\n      best = Math.max(best, node.val + left + right);\n      gain.put(node, node.val + Math.max(left, right));\n      last = stack.pop();\n    }\n    return best;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Lowest Common Ancestor",
        "difficulty": "Medium",
        "subpattern": "Ancestor bubbling in tree DFS",
        "question": "Given a binary tree and two nodes p and q, return their lowest common ancestor.",
        "trigger": "A subtree can report whether it contains p or q; the first node receiving hits from both sides is the LCA.",
        "intuition": "If current node is p or q, return it. Recurse left and right. If both sides return non-null, current node is the answer.",
        "edgeCases": "p is ancestor of q, q is ancestor of p, p and q in different subtrees, root is one target, skewed tree.",
        "constraints": "2 \u003c= number of nodes \u003c= 100000; all values are unique; p and q exist in the tree.",
        "source": {
          "label": "Lowest Common Ancestor of a Binary Tree - LeetCode 236",
          "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
        },
        "examples": [
          {
            "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
            "output": "3",
            "explanation": "The nodes are in different subtrees of 3."
          },
          {
            "input": "same root, p = 5, q = 4",
            "output": "5",
            "explanation": "5 is an ancestor of 4."
          },
          {
            "input": "root = [1,2], p = 1, q = 2",
            "output": "1",
            "explanation": "The root is an ancestor."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(n). Store root-to-node paths and compare them.",
        "optimizedComplexity": "Time O(n); Space O(n). Iterative parent map climbs ancestors.",
        "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS bubbles candidate nodes upward.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    List\u003cTreeNode> pathP = new ArrayList\u003c>();\n    List\u003cTreeNode> pathQ = new ArrayList\u003c>();\n    find(root, p, pathP);\n    find(root, q, pathQ);\n    TreeNode answer = null;\n    for (int i = 0; i \u003c Math.min(pathP.size(), pathQ.size()) && pathP.get(i) == pathQ.get(i); i++) {\n      answer = pathP.get(i);\n    }\n    return answer;\n  }\n\n  private boolean find(TreeNode node, TreeNode target, List\u003cTreeNode> path) {\n    if (node == null) return false;\n    path.add(node);\n    if (node == target || find(node.left, target, path) || find(node.right, target, path)) return true;\n    path.remove(path.size() - 1);\n    return false;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map\u003cTreeNode, TreeNode> parent = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) { parent.put(node.left, node); stack.push(node.left); }\n      if (node.right != null) { parent.put(node.right, node); stack.push(node.right); }\n    }\n\n    Set\u003cTreeNode> ancestors = new HashSet\u003c>();\n    while (p != null) { ancestors.add(p); p = parent.get(p); }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return left != null ? left : right;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map\u003cTreeNode, TreeNode> parent = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) { parent.put(node.left, node); stack.push(node.left); }\n      if (node.right != null) { parent.put(node.right, node); stack.push(node.right); }\n    }\n\n    Set\u003cTreeNode> ancestors = new HashSet\u003c>();\n    while (p != null) { ancestors.add(p); p = parent.get(p); }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    Map\u003cTreeNode, TreeNode> parent = new HashMap\u003c>();\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    parent.put(root, null);\n    stack.push(root);\n\n    while (!parent.containsKey(p) || !parent.containsKey(q)) {\n      TreeNode node = stack.pop();\n      if (node.left != null) { parent.put(node.left, node); stack.push(node.left); }\n      if (node.right != null) { parent.put(node.right, node); stack.push(node.right); }\n    }\n\n    Set\u003cTreeNode> ancestors = new HashSet\u003c>();\n    while (p != null) { ancestors.add(p); p = parent.get(p); }\n    while (!ancestors.contains(q)) q = parent.get(q);\n    return q;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Left View",
        "difficulty": "Medium",
        "subpattern": "Level boundary view",
        "question": "Given a binary tree, return the nodes visible when the tree is viewed from the left side.",
        "trigger": "The first node seen at every depth is needed.",
        "intuition": "Visit each level left to right and record the first node.",
        "edgeCases": "Empty tree, one node, left-skewed tree, right-skewed tree, and missing children.",
        "constraints": "Return one value per visible level.",
        "bruteForceComplexity": "Time O(n*h), Space O(h). Scan each depth independently.",
        "optimizedComplexity": "Time O(n), Space O(w) for BFS queue.",
        "recursiveComplexity": "Time O(n), Space O(h).",
        "examples": [
          {
            "input": "root = [1, 2, 3, 4, null, null, 5]",
            "output": "[1, 2, 4]",
            "explanation": "The first node at each level is visible from the left."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> leftView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    int height = height(root);\n    for (int level = 0; level \u003c height; level++) {\n      Integer value = firstAtLevel(root, level);\n      if (value != null) {\n        answer.add(value);\n      }\n    }\n    return answer;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) {\n      return 0;\n    }\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n\n  private Integer firstAtLevel(TreeNode node, int level) {\n    if (node == null) {\n      return null;\n    }\n    if (level == 0) {\n      return node.val;\n    }\n    Integer left = firstAtLevel(node.left, level - 1);\n    if (left != null) {\n      return left;\n    }\n    return firstAtLevel(node.right, level - 1);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> leftView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) {\n      return answer;\n    }\n\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        if (i == 0) {\n          answer.add(node.val);\n        }\n        if (node.left != null) {\n          queue.offer(node.left);\n        }\n        if (node.right != null) {\n          queue.offer(node.right);\n        }\n      }\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> leftView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    dfs(root, 0, answer);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int depth, List\u003cInteger> answer) {\n    if (node == null) {\n      return;\n    }\n    if (depth == answer.size()) {\n      answer.add(node.val);\n    }\n\n    dfs(node.left, depth + 1, answer);\n    dfs(node.right, depth + 1, answer);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Right View",
        "difficulty": "Medium",
        "subpattern": "Tree BFS/DFS visible nodes by depth",
        "question": "Given the root of a binary tree, return the values visible when looking at the tree from the right side, ordered from top to bottom.",
        "trigger": "For each depth, only the rightmost node matters.",
        "intuition": "BFS can take the last node of each level. DFS can visit right child first and record the first node seen at each depth.",
        "edgeCases": "Empty tree, one node, missing right child, skewed left tree, multiple nodes at same depth.",
        "constraints": "0 \u003c= number of nodes \u003c= 100; -100 \u003c= Node.val \u003c= 100.",
        "source": {
          "label": "Binary Tree Right Side View - LeetCode 199",
          "url": "https://leetcode.com/problems/binary-tree-right-side-view/"
        },
        "examples": [
          {
            "input": "root = [1,2,3,null,5,null,4]",
            "output": "[1,3,4]",
            "explanation": "Nodes 1, 3, and 4 are rightmost by level."
          },
          {
            "input": "root = [1,null,3]",
            "output": "[1,3]",
            "explanation": "The visible path follows the right child."
          },
          {
            "input": "root = []",
            "output": "[]",
            "explanation": "No nodes are visible."
          }
        ],
        "bruteForceComplexity": "Time O(n*h); Space O(h). For each depth, scan the tree to find the rightmost node.",
        "optimizedComplexity": "Time O(n); Space O(w). BFS records the last value at each level.",
        "recursiveComplexity": "Time O(n); Space O(h). Right-first DFS records first node per depth.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> rightSideView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    int height = height(root);\n    for (int depth = 0; depth \u003c height; depth++) {\n      TreeNode node = rightmostAtDepth(root, depth);\n      if (node != null) answer.add(node.val);\n    }\n    return answer;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n\n  private TreeNode rightmostAtDepth(TreeNode node, int depth) {\n    if (node == null) return null;\n    if (depth == 0) return node;\n    TreeNode right = rightmostAtDepth(node.right, depth - 1);\n    return right != null ? right : rightmostAtDepth(node.left, depth - 1);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> rightSideView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        if (i == size - 1) answer.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> rightSideView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    dfs(root, 0, answer);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int depth, List\u003cInteger> answer) {\n    if (node == null) return;\n    if (depth == answer.size()) answer.add(node.val);\n    dfs(node.right, depth + 1, answer);\n    dfs(node.left, depth + 1, answer);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> rightSideView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        if (i == size - 1) answer.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cInteger> rightSideView(TreeNode root) {\n    List\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    Queue\u003cTreeNode> queue = new ArrayDeque\u003c>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i \u003c size; i++) {\n        TreeNode node = queue.poll();\n        if (i == size - 1) answer.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Vertical Order Traversal",
        "difficulty": "Hard",
        "subpattern": "Column-indexed tree traversal",
        "question": "Given a binary tree, return vertical order traversal grouped from leftmost column to rightmost column.",
        "trigger": "Each node belongs to a horizontal column based on left and right moves from root.",
        "intuition": "Assign root column 0, left child column -1, right child column +1, then group by column.",
        "edgeCases": "Empty tree, duplicate values, nodes sharing row and column, negative columns, and skewed trees.",
        "constraints": "For LeetCode 987 style ordering, sort by column, then row, then value.",
        "source": {
          "label": "Vertical Order Traversal of a Binary Tree - LeetCode 987",
          "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/"
        },
        "bruteForceComplexity": "Time O(n log n), Space O(n). Store all coordinates and sort.",
        "optimizedComplexity": "Time O(n log n), Space O(n). BFS groups by columns while preserving row tracking.",
        "recursiveComplexity": "Time O(n log n), Space O(n). DFS stores coordinates then sorts.",
        "examples": [
          {
            "input": "root = [3, 9, 20, null, null, 15, 7]",
            "output": "[[9], [3, 15], [20], [7]]",
            "explanation": "Nodes are grouped by vertical column from left to right."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> verticalTraversal(TreeNode root) {\n    List\u003cint[]> nodes = new ArrayList\u003c>();\n    collect(root, 0, 0, nodes);\n    nodes.sort((a, b) -> a[1] != b[1] ? a[1] - b[1] : a[0] != b[0] ? a[0] - b[0] : a[2] - b[2]);\n\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    Integer previousColumn = null;\n    for (int[] node : nodes) {\n      if (previousColumn == null || node[1] != previousColumn) {\n        answer.add(new ArrayList\u003c>());\n        previousColumn = node[1];\n      }\n      answer.get(answer.size() - 1).add(node[2]);\n    }\n    return answer;\n  }\n\n  private void collect(TreeNode node, int row, int column, List\u003cint[]> nodes) {\n    if (node == null) {\n      return;\n    }\n    nodes.add(new int[] {row, column, node.val});\n    collect(node.left, row + 1, column - 1, nodes);\n    collect(node.right, row + 1, column + 1, nodes);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> verticalTraversal(TreeNode root) {\n    List\u003cint[]> nodes = new ArrayList\u003c>();\n    if (root == null) {\n      return new ArrayList\u003c>();\n    }\n\n    Queue\u003cObject[]> queue = new ArrayDeque\u003c>();\n    queue.offer(new Object[] {root, 0, 0});\n\n    while (!queue.isEmpty()) {\n      Object[] item = queue.poll();\n      TreeNode node = (TreeNode) item[0];\n      int row = (Integer) item[1];\n      int column = (Integer) item[2];\n      nodes.add(new int[] {row, column, node.val});\n\n      if (node.left != null) {\n        queue.offer(new Object[] {node.left, row + 1, column - 1});\n      }\n      if (node.right != null) {\n        queue.offer(new Object[] {node.right, row + 1, column + 1});\n      }\n    }\n\n    nodes.sort((a, b) -> a[1] != b[1] ? a[1] - b[1] : a[0] != b[0] ? a[0] - b[0] : a[2] - b[2]);\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    Integer previousColumn = null;\n    for (int[] node : nodes) {\n      if (previousColumn == null || node[1] != previousColumn) {\n        answer.add(new ArrayList\u003c>());\n        previousColumn = node[1];\n      }\n      answer.get(answer.size() - 1).add(node[2]);\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public List\u003cList\u003cInteger>> verticalTraversal(TreeNode root) {\n    List\u003cint[]> nodes = new ArrayList\u003c>();\n    dfs(root, 0, 0, nodes);\n    nodes.sort((a, b) -> a[1] != b[1] ? a[1] - b[1] : a[0] != b[0] ? a[0] - b[0] : a[2] - b[2]);\n\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    Integer previousColumn = null;\n    for (int[] node : nodes) {\n      if (previousColumn == null || node[1] != previousColumn) {\n        answer.add(new ArrayList\u003c>());\n        previousColumn = node[1];\n      }\n      answer.get(answer.size() - 1).add(node[2]);\n    }\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int row, int column, List\u003cint[]> nodes) {\n    if (node == null) {\n      return;\n    }\n    nodes.add(new int[] {row, column, node.val});\n    dfs(node.left, row + 1, column - 1, nodes);\n    dfs(node.right, row + 1, column + 1, nodes);\n  }\n}"
      },
      {
        "group": "more-practice",
        "name": "Boundary Traversal",
        "difficulty": "Medium",
        "subpattern": "Tree boundary DFS traversal",
        "question": "Given a binary tree, return its boundary traversal in anti-clockwise order: root, left boundary, leaves, and reversed right boundary without duplicates.",
        "trigger": "The boundary is not a normal traversal; it combines three structural parts with leaf de-duplication.",
        "intuition": "Add root if not leaf, walk left boundary excluding leaves, collect all leaves left-to-right, then collect right boundary excluding leaves and reverse it.",
        "edgeCases": "Empty tree, single root, only left chain, only right chain, leaves that are also boundary nodes, duplicate prevention.",
        "constraints": "1 \u003c= number of nodes \u003c= 100000; 0 \u003c= Node.val \u003c= 100000 in common variants.",
        "source": {
          "label": "Boundary Traversal of Binary Tree - GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1"
        },
        "examples": [
          {
            "input": "root = [1,2,3,4,5,6,7]",
            "output": "[1,2,4,5,6,7,3]",
            "explanation": "Left boundary, leaves, and reversed right boundary are combined."
          },
          {
            "input": "root = [1]",
            "output": "[1]",
            "explanation": "A single root is the whole boundary."
          },
          {
            "input": "root = [1,null,2,null,3]",
            "output": "[1,3,2]",
            "explanation": "The right chain appears after leaves in reverse boundary order."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(n). Store root-to-leaf paths and derive boundary nodes using sets.",
        "optimizedComplexity": "Time O(n); Space O(h). Iterative boundary walks plus leaf traversal visit nodes linearly.",
        "recursiveComplexity": "Time O(n); Space O(h). Recursive helpers collect leaves and boundary parts.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList\u003cInteger> boundary(TreeNode root) {\n    ArrayList\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    List\u003cList\u003cTreeNode>> paths = new ArrayList\u003c>();\n    collectPaths(root, new ArrayList\u003c>(), paths);\n    Set\u003cTreeNode> boundary = new LinkedHashSet\u003c>();\n    for (List\u003cTreeNode> path : paths) boundary.add(path.get(0));\n    if (!paths.isEmpty()) for (TreeNode node : paths.get(0)) boundary.add(node);\n    for (List\u003cTreeNode> path : paths) boundary.add(path.get(path.size() - 1));\n    if (!paths.isEmpty()) {\n      List\u003cTreeNode> last = paths.get(paths.size() - 1);\n      for (int i = last.size() - 1; i >= 0; i--) boundary.add(last.get(i));\n    }\n    for (TreeNode node : boundary) answer.add(node.val);\n    return answer;\n  }\n\n  private void collectPaths(TreeNode node, List\u003cTreeNode> path, List\u003cList\u003cTreeNode>> paths) {\n    if (node == null) return;\n    path.add(node);\n    if (node.left == null && node.right == null) paths.add(new ArrayList\u003c>(path));\n    collectPaths(node.left, path, paths);\n    collectPaths(node.right, path, paths);\n    path.remove(path.size() - 1);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList\u003cInteger> boundary(TreeNode root) {\n    ArrayList\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n\n    TreeNode current = root.left;\n    while (current != null) {\n      if (!isLeaf(current)) answer.add(current.val);\n      current = current.left != null ? current.left : current.right;\n    }\n\n    addLeaves(root, answer);\n    Stack\u003cInteger> right = new Stack\u003c>();\n    current = root.right;\n    while (current != null) {\n      if (!isLeaf(current)) right.push(current.val);\n      current = current.right != null ? current.right : current.left;\n    }\n    while (!right.isEmpty()) answer.add(right.pop());\n    return answer;\n  }\n\n  private void addLeaves(TreeNode node, ArrayList\u003cInteger> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    addLeaves(node.left, answer);\n    addLeaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList\u003cInteger> boundary(TreeNode root) {\n    ArrayList\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n    leftBoundary(root.left, answer);\n    leaves(root, answer);\n    ArrayList\u003cInteger> right = new ArrayList\u003c>();\n    rightBoundary(root.right, right);\n    for (int i = right.size() - 1; i >= 0; i--) answer.add(right.get(i));\n    return answer;\n  }\n\n  private void leftBoundary(TreeNode node, ArrayList\u003cInteger> answer) {\n    if (node == null || isLeaf(node)) return;\n    answer.add(node.val);\n    if (node.left != null) leftBoundary(node.left, answer);\n    else leftBoundary(node.right, answer);\n  }\n\n  private void rightBoundary(TreeNode node, ArrayList\u003cInteger> answer) {\n    if (node == null || isLeaf(node)) return;\n    answer.add(node.val);\n    if (node.right != null) rightBoundary(node.right, answer);\n    else rightBoundary(node.left, answer);\n  }\n\n  private void leaves(TreeNode node, ArrayList\u003cInteger> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    leaves(node.left, answer);\n    leaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList\u003cInteger> boundary(TreeNode root) {\n    ArrayList\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n\n    TreeNode current = root.left;\n    while (current != null) {\n      if (!isLeaf(current)) answer.add(current.val);\n      current = current.left != null ? current.left : current.right;\n    }\n\n    addLeaves(root, answer);\n    Stack\u003cInteger> right = new Stack\u003c>();\n    current = root.right;\n    while (current != null) {\n      if (!isLeaf(current)) right.push(current.val);\n      current = current.right != null ? current.right : current.left;\n    }\n    while (!right.isEmpty()) answer.add(right.pop());\n    return answer;\n  }\n\n  private void addLeaves(TreeNode node, ArrayList\u003cInteger> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    addLeaves(node.left, answer);\n    addLeaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public ArrayList\u003cInteger> boundary(TreeNode root) {\n    ArrayList\u003cInteger> answer = new ArrayList\u003c>();\n    if (root == null) return answer;\n    if (!isLeaf(root)) answer.add(root.val);\n\n    TreeNode current = root.left;\n    while (current != null) {\n      if (!isLeaf(current)) answer.add(current.val);\n      current = current.left != null ? current.left : current.right;\n    }\n\n    addLeaves(root, answer);\n    Stack\u003cInteger> right = new Stack\u003c>();\n    current = root.right;\n    while (current != null) {\n      if (!isLeaf(current)) right.push(current.val);\n      current = current.right != null ? current.right : current.left;\n    }\n    while (!right.isEmpty()) answer.add(right.pop());\n    return answer;\n  }\n\n  private void addLeaves(TreeNode node, ArrayList\u003cInteger> answer) {\n    if (node == null) return;\n    if (isLeaf(node)) { answer.add(node.val); return; }\n    addLeaves(node.left, answer);\n    addLeaves(node.right, answer);\n  }\n\n  private boolean isLeaf(TreeNode node) {\n    return node.left == null && node.right == null;\n  }\n}"
      }
    ]
  },
  "bst": {
    "id": "bst",
    "name": "Binary Search Tree Revision",
    "summary": "Ordered tree search, insertion, deletion, validation, inorder rank queries, floor/ceil, and BST LCA.",
    "checklist": [
      "Use node value ordering before reaching for full tree traversal.",
      "Inorder traversal of a BST is sorted.",
      "Deletion has three cases: leaf, one child, two children.",
      "Validation needs min/max bounds, not just parent comparison.",
      "Floor and ceil are updated while walking one path."
    ],
    "mistakes": [
      "Allowing equal values on the wrong side without checking constraints.",
      "Losing subtree links during delete.",
      "Using int bounds that overflow for validation.",
      "Doing full traversal when one ordered path is enough.",
      "Returning kth by value count without considering duplicates policy."
    ],
    "edgeCases": [
      "Empty tree, one node, key not found, deleting root, skewed tree, and Integer.MIN_VALUE or Integer.MAX_VALUE."
    ],
    "complexities": [
      "Balanced BST operations are O(log n).",
      "Skewed BST operations degrade to O(n).",
      "Recursive BST operations add O(h) stack.",
      "Inorder rank queries cost O(h + k) or O(n)."
    ],
    "mentalModel": [
      "Every comparison discards one subtree.",
      "Inorder means sorted order.",
      "Bounds flow downward for validation.",
      "Successor is the leftmost node in the right subtree.",
      "BST LCA is the split point between two values."
    ],
    "revisionStrategy": [
      "Practice Search, Insert, and Delete first.",
      "Then revise Validate BST and Kth Smallest.",
      "Finish with Floor/Ceil and LCA."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Search",
        "difficulty": "Easy",
        "subpattern": "BST ordered search",
        "question": "Given the root of a binary search tree and an integer val, return the subtree rooted at the node whose value equals val, or null if the value does not exist.",
        "trigger": "BST ordering lets each comparison discard either the entire left subtree or the entire right subtree.",
        "intuition": "If val is smaller than current node, move left. If larger, move right. If equal, return the node.",
        "edgeCases": "Empty tree, value at root, value absent, value in leaf, skewed BST.",
        "constraints": "1 \u003c= number of nodes \u003c= 5000; 1 \u003c= Node.val \u003c= 10000000; all values are unique; 1 \u003c= val \u003c= 10000000.",
        "source": {
          "label": "Search in a Binary Search Tree - LeetCode 700",
          "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/"
        },
        "examples": [
          {
            "input": "root = [4,2,7,1,3], val = 2",
            "output": "[2,1,3]",
            "explanation": "The node with value 2 is found and its subtree is returned."
          },
          {
            "input": "root = [4,2,7,1,3], val = 5",
            "output": "[]",
            "explanation": "5 does not exist in the BST."
          },
          {
            "input": "root = [1], val = 1",
            "output": "[1]",
            "explanation": "The root itself matches."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(h). DFS can search every node without using BST ordering.",
        "optimizedComplexity": "Time O(h); Space O(1). Iterative BST search follows one path.",
        "recursiveComplexity": "Time O(h); Space O(h). Recursive BST search follows one path.",
        "bruteForceCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    if (root == null) return null;\n    if (root.val == val) return root;\n    TreeNode left = searchBST(root.left, val);\n    if (left != null) return left;\n    return searchBST(root.right, val);\n  }\n}",
        "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    TreeNode current = root;\n    while (current != null && current.val != val) {\n      current = val \u003c current.val ? current.left : current.right;\n    }\n    return current;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    if (root == null || root.val == val) return root;\n    if (val \u003c root.val) return searchBST(root.left, val);\n    return searchBST(root.right, val);\n  }\n}",
        "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    TreeNode current = root;\n    while (current != null && current.val != val) {\n      current = val \u003c current.val ? current.left : current.right;\n    }\n    return current;\n  }\n}",
        "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode searchBST(TreeNode root, int val) {\n    TreeNode current = root;\n    while (current != null && current.val != val) {\n      current = val \u003c current.val ? current.left : current.right;\n    }\n    return current;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Insert",
        "difficulty": "Medium",
        "subpattern": "BST ordered insertion",
        "question": "Given the root of a BST and a value not currently in the tree, insert the value into the BST and return the root.",
        "trigger": "BST ordering determines the unique leaf position where the new value belongs.",
        "intuition": "Walk down the tree until the next child pointer is null, then attach the new node on that side.",
        "edgeCases": "Empty tree, insert as left child, insert as right child, skewed tree, value guaranteed unique.",
        "constraints": "0 \u003c= number of nodes \u003c= 10000; -100000000 \u003c= Node.val,val \u003c= 100000000; val does not exist in the BST.",
        "source": {
          "label": "Insert into a Binary Search Tree - LeetCode 701",
          "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/"
        },
        "examples": [
          {
            "input": "root = [4,2,7,1,3], val = 5",
            "output": "[4,2,7,1,3,5]",
            "explanation": "5 is inserted as the left child of 7."
          },
          {
            "input": "root = [40,20,60,10,30,50,70], val = 25",
            "output": "valid BST containing 25",
            "explanation": "25 belongs between 20 and 30."
          },
          {
            "input": "root = [], val = 5",
            "output": "[5]",
            "explanation": "A new root is created."
          }
        ],
        "bruteForceComplexity": "Time O(n log n) average after collecting values and rebuilding; Space O(n).",
        "optimizedComplexity": "Time O(h); Space O(1). Iterative insertion follows one search path.",
        "recursiveComplexity": "Time O(h); Space O(h). Recursive insertion returns the updated subtree root.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    List\u003cInteger> values = new ArrayList\u003c>();\n    collect(root, values);\n    values.add(val);\n    TreeNode rebuilt = null;\n    for (int value : values) rebuilt = insert(rebuilt, value);\n    return rebuilt;\n  }\n\n  private void collect(TreeNode node, List\u003cInteger> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.left, values);\n    collect(node.right, values);\n  }\n\n  private TreeNode insert(TreeNode node, int val) {\n    if (node == null) return new TreeNode(val);\n    if (val \u003c node.val) node.left = insert(node.left, val);\n    else node.right = insert(node.right, val);\n    return node;\n  }\n}",
        "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    TreeNode current = root;\n    while (true) {\n      if (val \u003c current.val) {\n        if (current.left == null) { current.left = new TreeNode(val); break; }\n        current = current.left;\n      } else {\n        if (current.right == null) { current.right = new TreeNode(val); break; }\n        current = current.right;\n      }\n    }\n    return root;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    if (val \u003c root.val) root.left = insertIntoBST(root.left, val);\n    else root.right = insertIntoBST(root.right, val);\n    return root;\n  }\n}",
        "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    TreeNode current = root;\n    while (true) {\n      if (val \u003c current.val) {\n        if (current.left == null) { current.left = new TreeNode(val); break; }\n        current = current.left;\n      } else {\n        if (current.right == null) { current.right = new TreeNode(val); break; }\n        current = current.right;\n      }\n    }\n    return root;\n  }\n}",
        "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    TreeNode current = root;\n    while (true) {\n      if (val \u003c current.val) {\n        if (current.left == null) { current.left = new TreeNode(val); break; }\n        current = current.left;\n      } else {\n        if (current.right == null) { current.right = new TreeNode(val); break; }\n        current = current.right;\n      }\n    }\n    return root;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Delete",
        "difficulty": "Medium",
        "subpattern": "BST deletion and successor replacement",
        "question": "Given the root of a BST and a key, delete the node with value key if it exists and return the updated root.",
        "trigger": "BST ordering finds the node, and deleting a node with two children requires replacing it with inorder successor or predecessor.",
        "intuition": "Search for key. If node has one child, return that child. If it has two children, copy the smallest value from the right subtree and delete that successor.",
        "edgeCases": "Key absent, delete leaf, delete node with one child, delete root, delete node with two children.",
        "constraints": "0 \u003c= number of nodes \u003c= 10000; -100000 \u003c= Node.val,key \u003c= 100000; all node values are unique.",
        "source": {
          "label": "Delete Node in a BST - LeetCode 450",
          "url": "https://leetcode.com/problems/delete-node-in-a-bst/"
        },
        "examples": [
          {
            "input": "root = [5,3,6,2,4,null,7], key = 3",
            "output": "[5,4,6,2,null,null,7]",
            "explanation": "3 is replaced by its inorder successor 4."
          },
          {
            "input": "root = [5,3,6,2,4,null,7], key = 0",
            "output": "same tree",
            "explanation": "0 is absent."
          },
          {
            "input": "root = [], key = 0",
            "output": "[]",
            "explanation": "Empty tree remains empty."
          }
        ],
        "bruteForceComplexity": "Time O(n log n) average; Space O(n). Collect all values except key and rebuild a BST.",
        "optimizedComplexity": "Time O(h); Space O(1). Iteratively search and rewire the deleted node.",
        "recursiveComplexity": "Time O(h); Space O(h). Recursive deletion updates subtree links while unwinding.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    List\u003cInteger> values = new ArrayList\u003c>();\n    collect(root, values, key);\n    TreeNode rebuilt = null;\n    for (int value : values) rebuilt = insert(rebuilt, value);\n    return rebuilt;\n  }\n\n  private void collect(TreeNode node, List\u003cInteger> values, int key) {\n    if (node == null) return;\n    if (node.val != key) values.add(node.val);\n    collect(node.left, values, key);\n    collect(node.right, values, key);\n  }\n\n  private TreeNode insert(TreeNode node, int val) {\n    if (node == null) return new TreeNode(val);\n    if (val \u003c node.val) node.left = insert(node.left, val);\n    else node.right = insert(node.right, val);\n    return node;\n  }\n}",
        "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    TreeNode dummy = new TreeNode(0, null, root);\n    TreeNode parent = dummy;\n    TreeNode current = root;\n    while (current != null && current.val != key) {\n      parent = current;\n      current = key \u003c current.val ? current.left : current.right;\n    }\n    if (current == null) return dummy.right;\n\n    TreeNode replacement = removeRoot(current);\n    if (parent.left == current) parent.left = replacement;\n    else parent.right = replacement;\n    return dummy.right;\n  }\n\n  private TreeNode removeRoot(TreeNode node) {\n    if (node.left == null) return node.right;\n    if (node.right == null) return node.left;\n    TreeNode successorParent = node;\n    TreeNode successor = node.right;\n    while (successor.left != null) {\n      successorParent = successor;\n      successor = successor.left;\n    }\n    if (successorParent != node) {\n      successorParent.left = successor.right;\n      successor.right = node.right;\n    }\n    successor.left = node.left;\n    return successor;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    if (root == null) return null;\n    if (key \u003c root.val) root.left = deleteNode(root.left, key);\n    else if (key > root.val) root.right = deleteNode(root.right, key);\n    else {\n      if (root.left == null) return root.right;\n      if (root.right == null) return root.left;\n      TreeNode successor = min(root.right);\n      root.val = successor.val;\n      root.right = deleteNode(root.right, successor.val);\n    }\n    return root;\n  }\n\n  private TreeNode min(TreeNode node) {\n    while (node.left != null) node = node.left;\n    return node;\n  }\n}",
        "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    TreeNode dummy = new TreeNode(0, null, root);\n    TreeNode parent = dummy;\n    TreeNode current = root;\n    while (current != null && current.val != key) {\n      parent = current;\n      current = key \u003c current.val ? current.left : current.right;\n    }\n    if (current == null) return dummy.right;\n\n    TreeNode replacement = removeRoot(current);\n    if (parent.left == current) parent.left = replacement;\n    else parent.right = replacement;\n    return dummy.right;\n  }\n\n  private TreeNode removeRoot(TreeNode node) {\n    if (node.left == null) return node.right;\n    if (node.right == null) return node.left;\n    TreeNode successorParent = node;\n    TreeNode successor = node.right;\n    while (successor.left != null) {\n      successorParent = successor;\n      successor = successor.left;\n    }\n    if (successorParent != node) {\n      successorParent.left = successor.right;\n      successor.right = node.right;\n    }\n    successor.left = node.left;\n    return successor;\n  }\n}",
        "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode deleteNode(TreeNode root, int key) {\n    TreeNode dummy = new TreeNode(0, null, root);\n    TreeNode parent = dummy;\n    TreeNode current = root;\n    while (current != null && current.val != key) {\n      parent = current;\n      current = key \u003c current.val ? current.left : current.right;\n    }\n    if (current == null) return dummy.right;\n\n    TreeNode replacement = removeRoot(current);\n    if (parent.left == current) parent.left = replacement;\n    else parent.right = replacement;\n    return dummy.right;\n  }\n\n  private TreeNode removeRoot(TreeNode node) {\n    if (node.left == null) return node.right;\n    if (node.right == null) return node.left;\n    TreeNode successorParent = node;\n    TreeNode successor = node.right;\n    while (successor.left != null) {\n      successorParent = successor;\n      successor = successor.left;\n    }\n    if (successorParent != node) {\n      successorParent.left = successor.right;\n      successor.right = node.right;\n    }\n    successor.left = node.left;\n    return successor;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Validate BST",
        "difficulty": "Medium",
        "subpattern": "BST validation with bounds or inorder order",
        "question": "Given the root of a binary tree, determine if it is a valid BST. Every node must be strictly greater than all values in its left subtree and strictly less than all values in its right subtree.",
        "trigger": "BST validity is controlled by ancestor bounds, not just direct parent-child comparisons.",
        "intuition": "Use inorder strict increase or pass low/high bounds down the tree.",
        "edgeCases": "Duplicate values, Integer.MIN_VALUE, Integer.MAX_VALUE, invalid descendant far below root, one node.",
        "constraints": "1 \u003c= number of nodes \u003c= 10000; -2147483648 \u003c= Node.val \u003c= 2147483647.",
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
            "explanation": "3 is in the right subtree of 5 but less than 5."
          },
          {
            "input": "root = [2,2,2]",
            "output": "false",
            "explanation": "BST ordering is strict."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(n). Store inorder traversal and check strict increase.",
        "optimizedComplexity": "Time O(n); Space O(h). Iterative inorder stops at first violation.",
        "recursiveComplexity": "Time O(n); Space O(h). Recursive bounds validate every node once.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    List\u003cInteger> values = new ArrayList\u003c>();\n    inorder(root, values);\n    for (int i = 1; i \u003c values.size(); i++) {\n      if (values.get(i) \u003c= values.get(i - 1)) return false;\n    }\n    return true;\n  }\n\n  private void inorder(TreeNode node, List\u003cInteger> values) {\n    if (node == null) return;\n    inorder(node.left, values);\n    values.add(node.val);\n    inorder(node.right, values);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    Long previous = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val \u003c= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);\n  }\n\n  private boolean valid(TreeNode node, long low, long high) {\n    if (node == null) return true;\n    if (node.val \u003c= low || node.val >= high) return false;\n    return valid(node.left, low, node.val) && valid(node.right, node.val, high);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    Long previous = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val \u003c= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public boolean isValidBST(TreeNode root) {\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    Long previous = null;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (previous != null && current.val \u003c= previous) return false;\n      previous = (long) current.val;\n      current = current.right;\n    }\n    return true;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Kth Smallest",
        "difficulty": "Medium",
        "subpattern": "BST kth/order-statistic traversal",
        "question": "Given the root of a BST and an integer k, return the kth smallest value in the tree.",
        "trigger": "Inorder traversal of a BST yields values in sorted ascending order.",
        "intuition": "Visit left subtree, current node, then right subtree. Stop at the kth visited node.",
        "edgeCases": "k = 1, k = node count, one node, skewed tree, k always valid.",
        "constraints": "1 \u003c= k \u003c= number of nodes \u003c= 10000; 0 \u003c= Node.val \u003c= 10000.",
        "source": {
          "label": "Kth Smallest Element in a BST - LeetCode 230",
          "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
        },
        "examples": [
          {
            "input": "root = [3,1,4,null,2], k = 1",
            "output": "1",
            "explanation": "The first inorder value is 1."
          },
          {
            "input": "root = [5,3,6,2,4,null,null,1], k = 3",
            "output": "3",
            "explanation": "The sorted values are [1,2,3,4,5,6]."
          },
          {
            "input": "root = [1], k = 1",
            "output": "1",
            "explanation": "The only value is kth."
          }
        ],
        "bruteForceComplexity": "Time O(n log n); Space O(n). Collect all values, sort, and index k - 1.",
        "optimizedComplexity": "Time O(h + k); Space O(h). Iterative inorder stops after k nodes.",
        "recursiveComplexity": "Time O(h + k); Space O(h). Recursive inorder stops when kth is found.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    List\u003cInteger> values = new ArrayList\u003c>();\n    collect(root, values);\n    Collections.sort(values);\n    return values.get(k - 1);\n  }\n\n  private void collect(TreeNode node, List\u003cInteger> values) {\n    if (node == null) return;\n    values.add(node.val);\n    collect(node.left, values);\n    collect(node.right, values);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  private int remaining;\n  private int answer;\n\n  public int kthSmallest(TreeNode root, int k) {\n    remaining = k;\n    inorder(root);\n    return answer;\n  }\n\n  private void inorder(TreeNode node) {\n    if (node == null || remaining == 0) return;\n    inorder(node.left);\n    if (--remaining == 0) { answer = node.val; return; }\n    inorder(node.right);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}",
        "code": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int kthSmallest(TreeNode root, int k) {\n    Deque\u003cTreeNode> stack = new ArrayDeque\u003c>();\n    TreeNode current = root;\n    while (current != null || !stack.isEmpty()) {\n      while (current != null) { stack.push(current); current = current.left; }\n      current = stack.pop();\n      if (--k == 0) return current.val;\n      current = current.right;\n    }\n    return -1;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Floor and Ceil",
        "difficulty": "Medium",
        "subpattern": "BST predecessor and successor search",
        "question": "Given a BST and a key, return {floor, ceil}, where floor is the greatest value \u003c= key and ceil is the smallest value >= key. Use -1 when missing.",
        "trigger": "BST ordering lets one path update possible lower and upper answers.",
        "intuition": "Move left when current value is too large, move right when too small, and record candidates along the path.",
        "edgeCases": "Empty tree, key smaller than all nodes, key larger than all nodes, key exists, and skewed BST.",
        "constraints": "BST contains integer values.",
        "bruteForceComplexity": "Time O(n), Space O(n). Inorder traversal then scan sorted values.",
        "optimizedComplexity": "Time O(h), Space O(1).",
        "recursiveComplexity": "Time O(h), Space O(h) call stack.",
        "examples": [
          {
            "input": "root = [8, 4, 12, 2, 6, 10, 14], key = 5",
            "output": "[4, 6]",
            "explanation": "4 is the greatest value \u003c= 5 and 6 is the smallest value >= 5."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int[] floorCeil(TreeNode root, int key) {\n    List\u003cInteger> values = new ArrayList\u003c>();\n    inorder(root, values);\n\n    int floor = -1;\n    int ceil = -1;\n    for (int value : values) {\n      if (value \u003c= key) {\n        floor = value;\n      }\n      if (value >= key) {\n        ceil = value;\n        break;\n      }\n    }\n\n    return new int[] {floor, ceil};\n  }\n\n  private void inorder(TreeNode node, List\u003cInteger> values) {\n    if (node == null) {\n      return;\n    }\n    inorder(node.left, values);\n    values.add(node.val);\n    inorder(node.right, values);\n  }\n}",
        "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int[] floorCeil(TreeNode root, int key) {\n    int floor = -1;\n    int ceil = -1;\n    TreeNode node = root;\n\n    while (node != null) {\n      if (node.val == key) {\n        return new int[] {key, key};\n      }\n      if (node.val \u003c key) {\n        floor = node.val;\n        node = node.right;\n      } else {\n        ceil = node.val;\n        node = node.left;\n      }\n    }\n\n    return new int[] {floor, ceil};\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n\n  TreeNode(int val) {\n    this.val = val;\n  }\n\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public int[] floorCeil(TreeNode root, int key) {\n    int[] answer = {-1, -1};\n    search(root, key, answer);\n    return answer;\n  }\n\n  private void search(TreeNode node, int key, int[] answer) {\n    if (node == null) {\n      return;\n    }\n    if (node.val == key) {\n      answer[0] = key;\n      answer[1] = key;\n      return;\n    }\n    if (node.val \u003c key) {\n      answer[0] = node.val;\n      search(node.right, key, answer);\n    } else {\n      answer[1] = node.val;\n      search(node.left, key, answer);\n    }\n  }\n}"
      },
      {
        "group": "core",
        "name": "Lowest Common Ancestor",
        "difficulty": "Medium",
        "subpattern": "BST ancestor search using ordered split",
        "question": "Given a BST and two nodes p and q, return their lowest common ancestor.",
        "trigger": "In a BST, if both targets are smaller than current node go left, if both are larger go right; otherwise current node is the split point.",
        "intuition": "Walk from root toward p and q until their values diverge around current node or one equals current node.",
        "edgeCases": "p is ancestor of q, q is ancestor of p, root is LCA, both nodes on one side, two-node tree.",
        "constraints": "2 \u003c= number of nodes \u003c= 100000; all Node.val values are unique; p and q exist in the BST.",
        "source": {
          "label": "Lowest Common Ancestor of a Binary Search Tree - LeetCode 235",
          "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
        },
        "examples": [
          {
            "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
            "output": "6",
            "explanation": "2 and 8 split at root 6."
          },
          {
            "input": "same root, p = 2, q = 4",
            "output": "2",
            "explanation": "2 is an ancestor of 4."
          },
          {
            "input": "root = [2,1], p = 2, q = 1",
            "output": "2",
            "explanation": "Root is the LCA."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(n). Build root-to-node paths and compare them.",
        "optimizedComplexity": "Time O(h); Space O(1). Iterative BST split search follows one path.",
        "recursiveComplexity": "Time O(h); Space O(h). Recursive BST split search follows one path.",
        "bruteForceCode": "import java.util.*;\n\nclass TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    List\u003cTreeNode> pathP = new ArrayList\u003c>();\n    List\u003cTreeNode> pathQ = new ArrayList\u003c>();\n    find(root, p, pathP);\n    find(root, q, pathQ);\n    TreeNode answer = null;\n    for (int i = 0; i \u003c Math.min(pathP.size(), pathQ.size()) && pathP.get(i) == pathQ.get(i); i++) answer = pathP.get(i);\n    return answer;\n  }\n\n  private boolean find(TreeNode node, TreeNode target, List\u003cTreeNode> path) {\n    if (node == null) return false;\n    path.add(node);\n    if (node == target || find(node.left, target, path) || find(node.right, target, path)) return true;\n    path.remove(path.size() - 1);\n    return false;\n  }\n}",
        "iterativeCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode current = root;\n    while (current != null) {\n      if (p.val \u003c current.val && q.val \u003c current.val) current = current.left;\n      else if (p.val > current.val && q.val > current.val) current = current.right;\n      else return current;\n    }\n    return null;\n  }\n}",
        "recursiveCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (p.val \u003c root.val && q.val \u003c root.val) return lowestCommonAncestor(root.left, p, q);\n    if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);\n    return root;\n  }\n}",
        "optimizedCode": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode current = root;\n    while (current != null) {\n      if (p.val \u003c current.val && q.val \u003c current.val) current = current.left;\n      else if (p.val > current.val && q.val > current.val) current = current.right;\n      else return current;\n    }\n    return null;\n  }\n}",
        "code": "class TreeNode {\n  int val;\n  TreeNode left;\n  TreeNode right;\n\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) {\n    this.val = val;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nclass Solution {\n  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode current = root;\n    while (current != null) {\n      if (p.val \u003c current.val && q.val \u003c current.val) current = current.left;\n      else if (p.val > current.val && q.val > current.val) current = current.right;\n      else return current;\n    }\n    return null;\n  }\n}"
      }
    ]
  },
  "heap": {
    "id": "heap",
    "name": "Heap / Priority Queue Revision",
    "summary": "Top-k selection, frequency ranking, k-way merge, and streaming median with min/max heaps.",
    "checklist": [
      "Use a min-heap of size k for k largest values.",
      "Use a max-heap or frequency heap when the largest priority comes first.",
      "For k-way merge, push one active item per list.",
      "For median stream, balance max-heap lower half and min-heap upper half.",
      "Check whether sorting is simpler but too expensive."
    ],
    "mistakes": [
      "Keeping all n elements when only k are needed.",
      "Using the wrong heap direction.",
      "Forgetting to rebalance median heaps.",
      "Pushing null list nodes in merge-k lists.",
      "Returning heap order as sorted order without final extraction."
    ],
    "edgeCases": [
      "k = 1, k = n, duplicate values, empty lists, one stream value, and negative numbers."
    ],
    "complexities": [
      "Top-k with heap is O(n log k).",
      "K-way merge is O(N log k).",
      "Streaming median insert is O(log n), query O(1).",
      "Sorting baselines are O(n log n)."
    ],
    "mentalModel": [
      "Heap keeps only the best candidate at the root.",
      "Bound heap size when only k answers matter.",
      "Priority is the comparator.",
      "For streaming median, two heaps represent two halves.",
      "For merge, heap entries are frontiers."
    ],
    "revisionStrategy": [
      "Solve K Largest and Kth Largest together.",
      "Then Top K Frequent and Merge K Sorted Lists.",
      "End with Find Median From Data Stream."
    ],
    "problems": [
      {
        "group": "core",
        "name": "K Largest Elements",
        "difficulty": "Medium",
        "subpattern": "Top-k min heap",
        "question": "Given an integer array nums and integer k, return the k largest values in descending order.",
        "trigger": "Only the top k values matter, so a heap can discard smaller values as it scans.",
        "intuition": "Keep a min-heap of size k. The heap root is the smallest value among the current top k.",
        "edgeCases": "k = 1, k = nums.length, duplicates, negative values, and already sorted input.",
        "constraints": "1 \u003c= k \u003c= nums.length.",
        "bruteForceComplexity": "Time O(n log n), Space O(n) for sorting a copy.",
        "optimizedComplexity": "Time O(n log k + k log k), Space O(k).",
        "recursiveComplexity": "Time O(n log k + k log k), Space O(k + n) including recursion stack.",
        "examples": [
          {
            "input": "nums = [3, 1, 5, 12, 2, 11], k = 3",
            "output": "[12, 11, 5]",
            "explanation": "The three largest values are 12, 11, and 5."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] kLargest(int[] nums, int k) {\n    int[] copy = Arrays.copyOf(nums, nums.length);\n    Arrays.sort(copy);\n    int[] answer = new int[k];\n\n    for (int i = 0; i \u003c k; i++) {\n      answer[i] = copy[copy.length - 1 - i];\n    }\n\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] kLargest(int[] nums, int k) {\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>();\n\n    for (int num : nums) {\n      heap.offer(num);\n      if (heap.size() > k) {\n        heap.poll();\n      }\n    }\n\n    int[] answer = new int[k];\n    for (int i = k - 1; i >= 0; i--) {\n      answer[i] = heap.poll();\n    }\n    return answer;\n  }\n\n  private void reverse(int[] nums) {\n    int left = 0;\n    int right = nums.length - 1;\n    while (left \u003c right) {\n      int temp = nums[left];\n      nums[left++] = nums[right];\n      nums[right--] = temp;\n    }\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] kLargest(int[] nums, int k) {\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>();\n    fill(nums, 0, k, heap);\n\n    int[] answer = new int[k];\n    for (int i = k - 1; i >= 0; i--) {\n      answer[i] = heap.poll();\n    }\n    return answer;\n  }\n\n  private void fill(int[] nums, int index, int k, PriorityQueue\u003cInteger> heap) {\n    if (index == nums.length) {\n      return;\n    }\n    heap.offer(nums[index]);\n    if (heap.size() > k) {\n      heap.poll();\n    }\n    fill(nums, index + 1, k, heap);\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    if (left >= right) {\n      return;\n    }\n    int temp = nums[left];\n    nums[left] = nums[right];\n    nums[right] = temp;\n    reverse(nums, left + 1, right - 1);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Kth Largest Element",
        "difficulty": "Medium",
        "subpattern": "Top K with min-heap",
        "question": "Given an integer array nums and an integer k, return the kth largest element in the array. The kth largest is based on sorted order, not distinct values.",
        "trigger": "The task asks for the kth largest value without needing the full sorted order, so a size-k min-heap can keep only the k largest candidates.",
        "intuition": "Push values into a min-heap. If heap size exceeds k, remove the smallest. After all values, heap top is the kth largest.",
        "edgeCases": "Duplicates, k = 1, k = nums.length, negative values, all values equal.",
        "constraints": "1 \u003c= k \u003c= nums.length \u003c= 100000; -10000 \u003c= nums[i] \u003c= 10000.",
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
        "iterativeCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>();\n\n    for (int num : nums) {\n      heap.offer(num);\n      if (heap.size() > k) heap.poll();\n    }\n\n    return heap.peek();\n  }\n}",
        "recursiveCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>();\n    add(nums, 0, k, heap);\n    return heap.peek();\n  }\n\n  private void add(int[] nums, int index, int k, PriorityQueue\u003cInteger> heap) {\n    if (index == nums.length) return;\n\n    heap.offer(nums[index]);\n    if (heap.size() > k) heap.poll();\n    add(nums, index + 1, k, heap);\n  }\n}",
        "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>();\n\n    for (int num : nums) {\n      heap.offer(num);\n      if (heap.size() > k) heap.poll();\n    }\n\n    return heap.peek();\n  }\n}",
        "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public int findKthLargest(int[] nums, int k) {\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>();\n\n    for (int num : nums) {\n      heap.offer(num);\n      if (heap.size() > k) heap.poll();\n    }\n\n    return heap.peek();\n  }\n}"
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
        "constraints": "1 \u003c= nums.length \u003c= 100000; -10000 \u003c= nums[i] \u003c= 10000; k is in [1, number of unique elements].",
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
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map\u003cInteger, Integer> frequency = new HashMap\u003c>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    List\u003cInteger> values = new ArrayList\u003c>(frequency.keySet());\n    values.sort((a, b) -> frequency.get(b) - frequency.get(a));\n\n    int[] answer = new int[k];\n    for (int i = 0; i \u003c k; i++) answer[i] = values.get(i);\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map\u003cInteger, Integer> frequency = new HashMap\u003c>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>((a, b) -> frequency.get(a) - frequency.get(b));\n    for (int value : frequency.keySet()) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[] answer = new int[k];\n    for (int i = 0; i \u003c k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map\u003cInteger, Integer> frequency = new HashMap\u003c>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    List\u003cInteger> values = new ArrayList\u003c>(frequency.keySet());\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>((a, b) -> frequency.get(a) - frequency.get(b));\n    add(values, 0, k, frequency, heap);\n\n    int[] answer = new int[k];\n    for (int i = 0; i \u003c k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private void add(List\u003cInteger> values, int index, int k, Map\u003cInteger, Integer> frequency, PriorityQueue\u003cInteger> heap) {\n    if (index == values.size()) return;\n    heap.offer(values.get(index));\n    if (heap.size() > k) heap.poll();\n    add(values, index + 1, k, frequency, heap);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map\u003cInteger, Integer> frequency = new HashMap\u003c>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>((a, b) -> frequency.get(a) - frequency.get(b));\n    for (int value : frequency.keySet()) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[] answer = new int[k];\n    for (int i = 0; i \u003c k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int[] topKFrequent(int[] nums, int k) {\n    Map\u003cInteger, Integer> frequency = new HashMap\u003c>();\n    for (int num : nums) frequency.put(num, frequency.getOrDefault(num, 0) + 1);\n\n    PriorityQueue\u003cInteger> heap = new PriorityQueue\u003c>((a, b) -> frequency.get(a) - frequency.get(b));\n    for (int value : frequency.keySet()) {\n      heap.offer(value);\n      if (heap.size() > k) heap.poll();\n    }\n\n    int[] answer = new int[k];\n    for (int i = 0; i \u003c k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Merge K Sorted Lists",
        "difficulty": "Hard",
        "subpattern": "K-way merge with min-heap",
        "question": "Given an array of k linked-list heads where each list is sorted in ascending order, merge all lists into one sorted linked list and return its head.",
        "trigger": "At every step, the smallest current head among k sorted lists is needed, which is exactly a min-heap selection problem.",
        "intuition": "Push each non-null list head into a min-heap by node value. Pop the smallest node, append it, and push its next node if it exists.",
        "edgeCases": "No lists, all lists empty, one list, duplicate values, many lists with one node.",
        "constraints": "0 \u003c= lists.length \u003c= 10000; total nodes \u003c= 10000; -10000 \u003c= Node.val \u003c= 10000; each list is sorted.",
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
        "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n\n  ListNode(int val) {\n    this.val = val;\n  }\n\n  ListNode(int val, ListNode next) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    List\u003cInteger> values = new ArrayList\u003c>();\n    for (ListNode head : lists) {\n      for (ListNode node = head; node != null; node = node.next) values.add(node.val);\n    }\n    Collections.sort(values);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    for (int value : values) {\n      tail.next = new ListNode(value);\n      tail = tail.next;\n    }\n    return dummy.next;\n  }\n}",
        "iterativeCode": "import java.util.PriorityQueue;\n\nclass ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n\n  ListNode(int val) {\n    this.val = val;\n  }\n\n  ListNode(int val, ListNode next) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue\u003cListNode> heap = new PriorityQueue\u003c>((a, b) -> a.val - b.val);\n    for (ListNode head : lists) if (head != null) heap.offer(head);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}",
        "recursiveCode": "class ListNode {\n  int val;\n  ListNode next;\n\n  ListNode() {}\n\n  ListNode(int val) {\n    this.val = val;\n  }\n\n  ListNode(int val, ListNode next) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    if (lists == null || lists.length == 0) return null;\n    return mergeRange(lists, 0, lists.length - 1);\n  }\n\n  private ListNode mergeRange(ListNode[] lists, int left, int right) {\n    if (left == right) return lists[left];\n    int mid = left + (right - left) / 2;\n    return mergeTwo(mergeRange(lists, left, mid), mergeRange(lists, mid + 1, right));\n  }\n\n  private ListNode mergeTwo(ListNode a, ListNode b) {\n    if (a == null) return b;\n    if (b == null) return a;\n    if (a.val \u003c= b.val) {\n      a.next = mergeTwo(a.next, b);\n      return a;\n    }\n    b.next = mergeTwo(a, b.next);\n    return b;\n  }\n}",
        "optimizedCode": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue\u003cListNode> heap = new PriorityQueue\u003c>((a, b) -> a.val - b.val);\n    for (ListNode head : lists) if (head != null) heap.offer(head);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}",
        "code": "import java.util.PriorityQueue;\n\nclass Solution {\n  public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue\u003cListNode> heap = new PriorityQueue\u003c>((a, b) -> a.val - b.val);\n    for (ListNode head : lists) if (head != null) heap.offer(head);\n\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n\n    while (!heap.isEmpty()) {\n      ListNode node = heap.poll();\n      tail.next = node;\n      tail = tail.next;\n      if (node.next != null) heap.offer(node.next);\n    }\n\n    return dummy.next;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Find Median From Data Stream",
        "difficulty": "Hard",
        "subpattern": "Streaming median with two heaps",
        "question": "Design MedianFinder, which supports addNum(num) and findMedian(). findMedian returns the median of all numbers inserted so far.",
        "trigger": "The median needs quick access to the largest value in the lower half and the smallest value in the upper half while the stream changes.",
        "intuition": "Use a max-heap for the lower half and a min-heap for the upper half. Keep sizes balanced so the median is either one heap top or the average of both tops.",
        "edgeCases": "First number, even count, odd count, duplicate values, negative values, values arriving sorted or reverse sorted.",
        "constraints": "-100000 \u003c= num \u003c= 100000; at most 50000 calls are made; findMedian is called after at least one addNum.",
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
        "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nclass MedianFinder {\n  private final List\u003cInteger> values = new ArrayList\u003c>();\n\n  public void addNum(int num) {\n    values.add(num);\n  }\n\n  public double findMedian() {\n    Collections.sort(values);\n    int n = values.size();\n    if (n % 2 == 1) return values.get(n / 2);\n    return (values.get(n / 2 - 1) + values.get(n / 2)) / 2.0;\n  }\n}",
        "iterativeCode": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue\u003cInteger> lower = new PriorityQueue\u003c>((a, b) -> b - a);\n  private final PriorityQueue\u003cInteger> upper = new PriorityQueue\u003c>();\n\n  public void addNum(int num) {\n    if (lower.isEmpty() || num \u003c= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n\n    if (lower.size() > upper.size() + 1) upper.offer(lower.poll());\n    else if (upper.size() > lower.size()) lower.offer(upper.poll());\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n}",
        "recursiveCode": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue\u003cInteger> lower = new PriorityQueue\u003c>((a, b) -> b - a);\n  private final PriorityQueue\u003cInteger> upper = new PriorityQueue\u003c>();\n\n  public void addNum(int num) {\n    insert(num);\n    balance();\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n\n  private void insert(int num) {\n    if (lower.isEmpty() || num \u003c= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n  }\n\n  private void balance() {\n    if (lower.size() > upper.size() + 1) {\n      upper.offer(lower.poll());\n      balance();\n    } else if (upper.size() > lower.size()) {\n      lower.offer(upper.poll());\n      balance();\n    }\n  }\n}",
        "optimizedCode": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue\u003cInteger> lower = new PriorityQueue\u003c>((a, b) -> b - a);\n  private final PriorityQueue\u003cInteger> upper = new PriorityQueue\u003c>();\n\n  public void addNum(int num) {\n    if (lower.isEmpty() || num \u003c= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n\n    if (lower.size() > upper.size() + 1) upper.offer(lower.poll());\n    else if (upper.size() > lower.size()) lower.offer(upper.poll());\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n}",
        "code": "import java.util.PriorityQueue;\n\nclass MedianFinder {\n  private final PriorityQueue\u003cInteger> lower = new PriorityQueue\u003c>((a, b) -> b - a);\n  private final PriorityQueue\u003cInteger> upper = new PriorityQueue\u003c>();\n\n  public void addNum(int num) {\n    if (lower.isEmpty() || num \u003c= lower.peek()) lower.offer(num);\n    else upper.offer(num);\n\n    if (lower.size() > upper.size() + 1) upper.offer(lower.poll());\n    else if (upper.size() > lower.size()) lower.offer(upper.poll());\n  }\n\n  public double findMedian() {\n    if (lower.size() > upper.size()) return lower.peek();\n    return (lower.peek() + upper.peek()) / 2.0;\n  }\n}"
      }
    ]
  },
  "graphs": {
    "id": "graphs",
    "name": "Graphs Revision",
    "summary": "DFS/BFS traversal, grid graphs, cycle detection, topological sorting, bipartite coloring, Dijkstra, and DSU.",
    "checklist": [
      "Build adjacency lists first unless input is already adjacency.",
      "Use BFS for shortest unweighted distance or level spread.",
      "Use DFS for connected exploration, cycle state, and postorder.",
      "Use indegree for Kahn topological sort.",
      "Use DSU when edges merge components."
    ],
    "mistakes": [
      "Not marking visited at enqueue time for BFS.",
      "Counting the parent edge as a cycle in undirected graphs.",
      "Using one visited state for directed cycle detection instead of visiting/done colors.",
      "Forgetting disconnected components.",
      "Using plain BFS for weighted shortest paths."
    ],
    "edgeCases": [
      "Disconnected graph, no edges, self loops, cycles, repeated edges, isolated nodes, and unreachable weighted nodes."
    ],
    "complexities": [
      "DFS and BFS are O(V + E).",
      "Topological sort is O(V + E).",
      "Dijkstra with heap is O(E log V).",
      "DSU is O(alpha(V)) amortized per operation."
    ],
    "mentalModel": [
      "Visited prevents infinite revisits.",
      "Queue means level order.",
      "DFS state colors detect directed cycles.",
      "Indegree zero means currently available.",
      "DSU compresses connectivity into roots."
    ],
    "revisionStrategy": [
      "Start with DFS and BFS traversals.",
      "Then do islands/flood fill and cycle detection.",
      "Finish with topological sort, Dijkstra, and DSU."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Graph Traversal DFS",
        "difficulty": "Easy",
        "subpattern": "Graph DFS traversal",
        "question": "Given n nodes, undirected edges, and a start node, return the traversal order.",
        "trigger": "You need to explore as deep as possible before backtracking.",
        "intuition": "A stack or recursion follows one branch until it ends.",
        "edgeCases": "Disconnected graph, start with no edges, duplicate edges, self loops, and cycles.",
        "constraints": "Nodes are labeled 0 to n - 1.",
        "bruteForceComplexity": "Time O(V + E), Space O(V + E).",
        "optimizedComplexity": "Time O(V + E), Space O(V + E).",
        "recursiveComplexity": "Time O(V + E), Space O(V + E) including recursion stack.",
        "examples": [
          {
            "input": "n = 5, edges = [[0,1],[0,2],[1,3],[2,4]], start = 0",
            "output": "[0, 1, 3, 2, 4]",
            "explanation": "The traversal visits every reachable node once."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger> dfsTraversal(int n, int[][] edges, int start) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    List\u003cInteger> order = new ArrayList\u003c>();\n    boolean[] visited = new boolean[n];\n    Deque\u003cInteger> work = new ArrayDeque\u003c>();\n    work.push(start);\n\n    while (!work.isEmpty()) {\n      int node = work.pop();\n      if (visited[node]) {\n        continue;\n      }\n      visited[node] = true;\n      order.add(node);\n      List\u003cInteger> neighbors = graph.get(node);\n      for (int i = neighbors.size() - 1; i >= 0; i--) {\n        if (!visited[neighbors.get(i)]) work.push(neighbors.get(i));\n      }\n    }\n\n    return order;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger> dfsTraversal(int n, int[][] edges, int start) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    List\u003cInteger> order = new ArrayList\u003c>();\n    boolean[] visited = new boolean[n];\n    Deque\u003cInteger> stack = new ArrayDeque\u003c>();\n    stack.push(start);\n\n    while (!stack.isEmpty()) {\n      int node = stack.pop();\n      if (visited[node]) {\n        continue;\n      }\n      visited[node] = true;\n      order.add(node);\n      List\u003cInteger> neighbors = graph.get(node);\n      for (int i = neighbors.size() - 1; i >= 0; i--) {\n        if (!visited[neighbors.get(i)]) {\n          stack.push(neighbors.get(i));\n        }\n      }\n    }\n\n    return order;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger> dfsTraversal(int n, int[][] edges, int start) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    List\u003cInteger> order = new ArrayList\u003c>();\n    boolean[] visited = new boolean[n];\n    dfs(graph, start, visited, order);\n    return order;\n  }\n\n  private void dfs(List\u003cList\u003cInteger>> graph, int node, boolean[] visited, List\u003cInteger> order) {\n    visited[node] = true;\n    order.add(node);\n    for (int next : graph.get(node)) {\n      if (!visited[next]) dfs(graph, next, visited, order);\n    }\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Graph Traversal BFS",
        "difficulty": "Easy",
        "subpattern": "Graph BFS traversal",
        "question": "Given n nodes, undirected edges, and a start node, return the traversal order.",
        "trigger": "Nearest nodes must be visited level by level.",
        "intuition": "A queue processes nodes in discovery order.",
        "edgeCases": "Disconnected graph, start with no edges, duplicate edges, self loops, and cycles.",
        "constraints": "Nodes are labeled 0 to n - 1.",
        "bruteForceComplexity": "Time O(V + E), Space O(V + E).",
        "optimizedComplexity": "Time O(V + E), Space O(V + E).",
        "recursiveComplexity": "Time O(V + E), Space O(V + E) including recursion stack.",
        "examples": [
          {
            "input": "n = 5, edges = [[0,1],[0,2],[1,3],[2,4]], start = 0",
            "output": "[0, 1, 2, 3, 4]",
            "explanation": "The traversal visits every reachable node once."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger> bfsTraversal(int n, int[][] edges, int start) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    List\u003cInteger> order = new ArrayList\u003c>();\n    boolean[] visited = new boolean[n];\n    Queue\u003cInteger> work = new ArrayDeque\u003c>();\n    work.offer(start);\n\n    while (!work.isEmpty()) {\n      int node = work.poll();\n      if (visited[node]) {\n        continue;\n      }\n      visited[node] = true;\n      order.add(node);\n      for (int next : graph.get(node)) {\n        if (!visited[next]) work.offer(next);\n      }\n    }\n\n    return order;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger> bfsTraversal(int n, int[][] edges, int start) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    List\u003cInteger> order = new ArrayList\u003c>();\n    boolean[] visited = new boolean[n];\n    Queue\u003cInteger> queue = new ArrayDeque\u003c>();\n    queue.offer(start);\n    visited[start] = true;\n\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      order.add(node);\n      for (int next : graph.get(node)) {\n        if (!visited[next]) {\n          visited[next] = true;\n          queue.offer(next);\n        }\n      }\n    }\n\n    return order;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cInteger> bfsTraversal(int n, int[][] edges, int start) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    List\u003cInteger> order = new ArrayList\u003c>();\n    boolean[] visited = new boolean[n];\n    Queue\u003cInteger> queue = new ArrayDeque\u003c>();\n    queue.offer(start);\n    visited[start] = true;\n    bfs(graph, queue, visited, order);\n    return order;\n  }\n\n  private void bfs(List\u003cList\u003cInteger>> graph, Queue\u003cInteger> queue, boolean[] visited, List\u003cInteger> order) {\n    if (queue.isEmpty()) return;\n    int node = queue.poll();\n    order.add(node);\n    for (int next : graph.get(node)) {\n      if (!visited[next]) {\n        visited[next] = true;\n        queue.offer(next);\n      }\n    }\n    bfs(graph, queue, visited, order);\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Number of Islands",
        "difficulty": "Medium",
        "subpattern": "Grid graph DFS and BFS",
        "question": "Given an m x n grid of characters 1 and 0, count how many disconnected groups of land cells exist. Land cells connect vertically and horizontally.",
        "trigger": "The grid cells are vertices and adjacent land cells are edges; each island is one connected component.",
        "intuition": "Start a traversal only when an unseen land cell is found, then mark the whole component so it is counted once.",
        "edgeCases": "Empty grid, all water, all land, one row, one column, long thin island, many tiny islands.",
        "constraints": "m == grid.length; n == grid[i].length; 1 \u003c= m,n \u003c= 300; grid[i][j] is 0 or 1.",
        "source": {
          "label": "Number of Islands - LeetCode 200",
          "url": "https://leetcode.com/problems/number-of-islands/"
        },
        "examples": [
          {
            "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
            "output": "1",
            "explanation": "All land cells are connected into one island."
          },
          {
            "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
            "output": "3",
            "explanation": "There are three disconnected land components."
          },
          {
            "input": "grid = [[\"0\"]]",
            "output": "0",
            "explanation": "There is no land to count."
          }
        ],
        "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Each land cell may launch a fresh reachability search against already discovered components.",
        "optimizedComplexity": "Time O(mn); Space O(mn). Each cell is pushed into the queue at most once.",
        "recursiveComplexity": "Time O(mn); Space O(mn). DFS visits each cell once and recursion depth can reach mn.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    List\u003cint[]> representatives = new ArrayList\u003c>();\n\n    for (int r = 0; r \u003c rows; r++) {\n      for (int c = 0; c \u003c cols; c++) {\n        if (grid[r][c] == '0') continue;\n        boolean seenIsland = false;\n        for (int[] start : representatives) {\n          if (canReach(grid, start[0], start[1], r, c)) {\n            seenIsland = true;\n            break;\n          }\n        }\n        if (!seenIsland) representatives.add(new int[] {r, c});\n      }\n    }\n\n    return representatives.size();\n  }\n\n  private boolean canReach(char[][] grid, int sr, int sc, int tr, int tc) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    Deque\u003cint[]> stack = new ArrayDeque\u003c>();\n    stack.push(new int[] {sr, sc});\n    seen[sr][sc] = true;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      if (cell[0] == tr && cell[1] == tc) return true;\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr \u003c 0 || nc \u003c 0 || nr == grid.length || nc == grid[0].length) continue;\n        if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n        seen[nr][nc] = true;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n    return false;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    boolean[][] seen = new boolean[rows][cols];\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r \u003c rows; r++) {\n      for (int c = 0; c \u003c cols; c++) {\n        if (grid[r][c] == '0' || seen[r][c]) continue;\n        islands++;\n        Deque\u003cint[]> queue = new ArrayDeque\u003c>();\n        queue.offer(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr \u003c 0 || nc \u003c 0 || nr == rows || nc == cols) continue;\n            if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n            seen[nr][nc] = true;\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int numIslands(char[][] grid) {\n    int islands = 0;\n    for (int r = 0; r \u003c grid.length; r++) {\n      for (int c = 0; c \u003c grid[0].length; c++) {\n        if (grid[r][c] == '1') {\n          islands++;\n          sink(grid, r, c);\n        }\n      }\n    }\n    return islands;\n  }\n\n  private void sink(char[][] grid, int r, int c) {\n    if (r \u003c 0 || c \u003c 0 || r == grid.length || c == grid[0].length) return;\n    if (grid[r][c] != '1') return;\n\n    grid[r][c] = '0';\n    sink(grid, r + 1, c);\n    sink(grid, r - 1, c);\n    sink(grid, r, c + 1);\n    sink(grid, r, c - 1);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    boolean[][] seen = new boolean[rows][cols];\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r \u003c rows; r++) {\n      for (int c = 0; c \u003c cols; c++) {\n        if (grid[r][c] == '0' || seen[r][c]) continue;\n        islands++;\n        Deque\u003cint[]> queue = new ArrayDeque\u003c>();\n        queue.offer(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr \u003c 0 || nc \u003c 0 || nr == rows || nc == cols) continue;\n            if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n            seen[nr][nc] = true;\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    boolean[][] seen = new boolean[rows][cols];\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r \u003c rows; r++) {\n      for (int c = 0; c \u003c cols; c++) {\n        if (grid[r][c] == '0' || seen[r][c]) continue;\n        islands++;\n        Deque\u003cint[]> queue = new ArrayDeque\u003c>();\n        queue.offer(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr \u003c 0 || nc \u003c 0 || nr == rows || nc == cols) continue;\n            if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n            seen[nr][nc] = true;\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Flood Fill",
        "difficulty": "Easy",
        "subpattern": "Color replacement flood fill",
        "question": "Given an image, a starting cell, and a new color, recolor the connected component with the same original color.",
        "trigger": "The changed cells are exactly the connected component of the starting cell under four-direction adjacency.",
        "intuition": "Capture the original color, then flood fill neighboring cells that still have that original color.",
        "edgeCases": "New color equals original color, single cell image, component touches border, disconnected same-color cells, full image recolor.",
        "constraints": "1 \u003c= m, n \u003c= 50; 0 \u003c= image[i][j], color \u003c 2^16.",
        "source": {
          "label": "Flood Fill - LeetCode 733",
          "url": "https://leetcode.com/problems/flood-fill/"
        },
        "examples": [
          {
            "input": "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2",
            "output": "[[2,2,2],[2,2,0],[2,0,1]]",
            "explanation": "Only the connected 1-component is recolored."
          },
          {
            "input": "image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0",
            "output": "[[0,0,0],[0,0,0]]",
            "explanation": "No work is needed when the color is unchanged."
          },
          {
            "input": "image = [[1]], sr = 0, sc = 0, color = 2",
            "output": "[[2]]",
            "explanation": "The single component is one cell."
          }
        ],
        "bruteForceComplexity": "Time O(mn); Space O(mn). BFS with a visited matrix.",
        "optimizedComplexity": "Time O(mn); Space O(mn) queue. Recolor cells directly to mark visited.",
        "recursiveComplexity": "Time O(mn); Space O(mn) call stack. Recursive DFS recolors the component.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    boolean[][] seen = new boolean[image.length][image[0].length];\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    queue.offer(new int[]{sr, sc});\n    seen[sr][sc] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      image[cell[0]][cell[1]] = color;\n      for (int d = 0; d \u003c 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr \u003c image.length && nc >= 0 && nc \u003c image[0].length && !seen[nr][nc] && image[nr][nc] == original) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original == color) return image;\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    queue.offer(new int[]{sr, sc});\n    image[sr][sc] = color;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d \u003c 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr \u003c image.length && nc >= 0 && nc \u003c image[0].length && image[nr][nc] == original) {\n          image[nr][nc] = color;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original != color) dfs(image, sr, sc, original, color);\n    return image;\n  }\n\n  private void dfs(int[][] image, int r, int c, int original, int color) {\n    if (r \u003c 0 || r == image.length || c \u003c 0 || c == image[0].length || image[r][c] != original) return;\n    image[r][c] = color;\n    dfs(image, r + 1, c, original, color);\n    dfs(image, r - 1, c, original, color);\n    dfs(image, r, c + 1, original, color);\n    dfs(image, r, c - 1, original, color);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original == color) return image;\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    queue.offer(new int[]{sr, sc});\n    image[sr][sc] = color;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d \u003c 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr \u003c image.length && nc >= 0 && nc \u003c image[0].length && image[nr][nc] == original) {\n          image[nr][nc] = color;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original == color) return image;\n    Queue\u003cint[]> queue = new ArrayDeque\u003c>();\n    queue.offer(new int[]{sr, sc});\n    image[sr][sc] = color;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d \u003c 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr \u003c image.length && nc >= 0 && nc \u003c image[0].length && image[nr][nc] == original) {\n          image[nr][nc] = color;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Cycle Detection Undirected Graph",
        "difficulty": "Medium",
        "subpattern": "Undirected parent-aware DFS cycle detection",
        "question": "Given an undirected graph with n nodes and edges, return true if it contains a cycle.",
        "trigger": "A visited neighbor that is not the parent means an undirected cycle.",
        "intuition": "DFS tracks the parent edge so it does not count the edge it came from.",
        "edgeCases": "Disconnected graph, self loop, parallel edges, no edges, and one node.",
        "constraints": "Nodes are labeled 0 to n - 1.",
        "bruteForceComplexity": "Time O(V * (V + E)), Space O(V + E).",
        "optimizedComplexity": "Time O(V + E), Space O(V + E).",
        "recursiveComplexity": "Time O(V + E), Space O(V + E) including recursion stack.",
        "examples": [
          {
            "input": "n = 4, edges = [[0,1],[1,2],[2,0],[2,3]]",
            "output": "true",
            "explanation": "The graph has a cycle."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean hasCycle(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    boolean[] visited = new boolean[n];\n    for (int node = 0; node \u003c n; node++) {\n      if (!visited[node] && dfs(graph, visited, node, -1)) return true;\n    }\n    return false;\n  }\n\n  private boolean dfs(List\u003cList\u003cInteger>> graph, boolean[] visited, int node, int parent) {\n    visited[node] = true;\n    for (int next : graph.get(node)) {\n      if (!visited[next]) {\n        if (dfs(graph, visited, next, node)) return true;\n      } else if (next != parent) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean hasCycle(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    boolean[] visited = new boolean[n];\n\n    for (int start = 0; start \u003c n; start++) {\n      if (visited[start]) continue;\n      Deque\u003cint[]> stack = new ArrayDeque\u003c>();\n      stack.push(new int[] {start, -1});\n\n      while (!stack.isEmpty()) {\n        int[] item = stack.pop();\n        int node = item[0], parent = item[1];\n        if (visited[node]) return true;\n        visited[node] = true;\n        for (int next : graph.get(node)) {\n          if (next != parent) stack.push(new int[] {next, node});\n        }\n      }\n    }\n    return false;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean hasCycle(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    boolean[] visited = new boolean[n];\n    for (int node = 0; node \u003c n; node++) {\n      if (!visited[node] && hasCycleFrom(node, -1, graph, visited)) return true;\n    }\n    return false;\n  }\n\n  private boolean hasCycleFrom(int node, int parent, List\u003cList\u003cInteger>> graph, boolean[] visited) {\n    visited[node] = true;\n    for (int next : graph.get(node)) {\n      if (!visited[next]) {\n        if (hasCycleFrom(next, node, graph, visited)) return true;\n      } else if (next != parent) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Cycle Detection Directed Graph",
        "difficulty": "Medium",
        "subpattern": "Directed DFS color cycle detection",
        "question": "Given a directed graph with n nodes and edges, return true if it contains a cycle.",
        "trigger": "A node reached again while still in the active recursion path means a directed cycle.",
        "intuition": "Use colors: 0 unvisited, 1 visiting, 2 done.",
        "edgeCases": "Disconnected graph, self loop, parallel edges, no edges, and one node.",
        "constraints": "Nodes are labeled 0 to n - 1.",
        "bruteForceComplexity": "Time O(V * (V + E)), Space O(V + E).",
        "optimizedComplexity": "Time O(V + E), Space O(V + E).",
        "recursiveComplexity": "Time O(V + E), Space O(V + E) including recursion stack.",
        "examples": [
          {
            "input": "n = 4, edges = [[0,1],[1,2],[2,0],[2,3]]",
            "output": "true",
            "explanation": "The graph has a cycle."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean hasCycle(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    for (int start = 0; start \u003c n; start++) {\n      if (reaches(start, start, graph, new boolean[n], true)) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean reaches(int start, int node, List\u003cList\u003cInteger>> graph, boolean[] visited, boolean skipFirst) {\n    if (!skipFirst && node == start) return true;\n    if (visited[node]) return false;\n    visited[node] = true;\n    for (int next : graph.get(node)) {\n      if (reaches(start, next, graph, visited, false)) return true;\n    }\n    return false;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) graph.get(edge[0]).add(edge[1]);\n    return graph;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean hasCycle(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    int[] color = new int[n];\n\n    for (int node = 0; node \u003c n; node++) {\n      if (color[node] == 0 && dfs(node, graph, color)) return true;\n    }\n    return false;\n  }\n\n  private boolean dfs(int start, List\u003cList\u003cInteger>> graph, int[] color) {\n    Deque\u003cint[]> stack = new ArrayDeque\u003c>();\n    stack.push(new int[] {start, 0});\n    color[start] = 1;\n\n    while (!stack.isEmpty()) {\n      int[] frame = stack.peek();\n      int node = frame[0];\n      if (frame[1] == graph.get(node).size()) {\n        color[node] = 2;\n        stack.pop();\n        continue;\n      }\n\n      int next = graph.get(node).get(frame[1]++);\n      if (color[next] == 1) return true;\n      if (color[next] == 0) {\n        color[next] = 1;\n        stack.push(new int[] {next, 0});\n      }\n    }\n    return false;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) graph.get(edge[0]).add(edge[1]);\n    return graph;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean hasCycle(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = buildGraph(n, edges);\n    int[] color = new int[n];\n    for (int node = 0; node \u003c n; node++) {\n      if (color[node] == 0 && hasCycleFrom(node, graph, color)) return true;\n    }\n    return false;\n  }\n\n  private boolean hasCycleFrom(int node, List\u003cList\u003cInteger>> graph, int[] color) {\n    color[node] = 1;\n    for (int next : graph.get(node)) {\n      if (color[next] == 1) return true;\n      if (color[next] == 0 && hasCycleFrom(next, graph, color)) return true;\n    }\n    color[node] = 2;\n    return false;\n  }\n\n  private List\u003cList\u003cInteger>> buildGraph(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) graph.get(edge[0]).add(edge[1]);\n    return graph;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Topological Sort DFS",
        "difficulty": "Medium",
        "subpattern": "DFS postorder topological sort",
        "question": "Given a directed acyclic graph with n nodes and edges u -> v, return a topological ordering. Return empty array if a cycle exists.",
        "trigger": "A valid order must place every prerequisite/source before its outgoing neighbor.",
        "intuition": "DFS records a node after all outgoing neighbors are processed, then reverses postorder.",
        "edgeCases": "Disconnected DAG, cycle, no edges, multiple valid orders, and self loop.",
        "constraints": "Nodes are labeled 0 to n - 1.",
        "bruteForceComplexity": "Time O(V^2 + E), Space O(V + E).",
        "optimizedComplexity": "Time O(V + E), Space O(V + E).",
        "recursiveComplexity": "Time O(V + E), Space O(V + E) including recursion stack.",
        "examples": [
          {
            "input": "n = 4, edges = [[0,1],[0,2],[1,3],[2,3]]",
            "output": "[0, 1, 2, 3]",
            "explanation": "Every edge points from an earlier node to a later node."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] topoSort(int n, int[][] edges) {\n    boolean[][] graph = new boolean[n][n];\n    int[] indegree = new int[n];\n    for (int[] edge : edges) {\n      if (!graph[edge[0]][edge[1]]) {\n        graph[edge[0]][edge[1]] = true;\n        indegree[edge[1]]++;\n      }\n    }\n\n    int[] order = new int[n];\n    boolean[] used = new boolean[n];\n    for (int position = 0; position \u003c n; position++) {\n      int chosen = -1;\n      for (int node = 0; node \u003c n; node++) {\n        if (!used[node] && indegree[node] == 0) {\n          chosen = node;\n          break;\n        }\n      }\n      if (chosen == -1) return new int[0];\n      used[chosen] = true;\n      order[position] = chosen;\n      for (int next = 0; next \u003c n; next++) {\n        if (graph[chosen][next]) indegree[next]--;\n      }\n    }\n    return order;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] topoSort(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) graph.get(edge[0]).add(edge[1]);\n\n    int[] color = new int[n];\n    List\u003cInteger> order = new ArrayList\u003c>();\n    for (int node = 0; node \u003c n; node++) {\n      if (color[node] == 0 && !dfs(node, graph, color, order)) return new int[0];\n    }\n    Collections.reverse(order);\n    return order.stream().mapToInt(Integer::intValue).toArray();\n  }\n\n  private boolean dfs(int node, List\u003cList\u003cInteger>> graph, int[] color, List\u003cInteger> order) {\n    color[node] = 1;\n    for (int next : graph.get(node)) {\n      if (color[next] == 1) return false;\n      if (color[next] == 0 && !dfs(next, graph, color, order)) return false;\n    }\n    color[node] = 2;\n    order.add(node);\n    return true;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] topoSort(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) graph.get(edge[0]).add(edge[1]);\n\n    int[] color = new int[n];\n    List\u003cInteger> order = new ArrayList\u003c>();\n    if (!visitAll(0, n, graph, color, order)) return new int[0];\n    Collections.reverse(order);\n    return order.stream().mapToInt(Integer::intValue).toArray();\n  }\n\n  private boolean visitAll(int node, int n, List\u003cList\u003cInteger>> graph, int[] color, List\u003cInteger> order) {\n    if (node == n) return true;\n    if (color[node] == 0 && !dfs(node, graph, color, order)) return false;\n    return visitAll(node + 1, n, graph, color, order);\n  }\n\n  private boolean dfs(int node, List\u003cList\u003cInteger>> graph, int[] color, List\u003cInteger> order) {\n    color[node] = 1;\n    for (int next : graph.get(node)) {\n      if (color[next] == 1) return false;\n      if (color[next] == 0 && !dfs(next, graph, color, order)) return false;\n    }\n    color[node] = 2;\n    order.add(node);\n    return true;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Topological Sort BFS (Kahn)",
        "difficulty": "Medium",
        "subpattern": "Kahn indegree topological sort",
        "question": "Given a directed acyclic graph with n nodes and edges u -> v, return a topological ordering. Return empty array if a cycle exists.",
        "trigger": "A valid order must place every prerequisite/source before its outgoing neighbor.",
        "intuition": "Repeatedly take nodes with indegree zero.",
        "edgeCases": "Disconnected DAG, cycle, no edges, multiple valid orders, and self loop.",
        "constraints": "Nodes are labeled 0 to n - 1.",
        "bruteForceComplexity": "Time O(V^2 + E), Space O(V + E).",
        "optimizedComplexity": "Time O(V + E), Space O(V + E).",
        "recursiveComplexity": "Time O(V + E), Space O(V + E) including recursion stack.",
        "examples": [
          {
            "input": "n = 4, edges = [[0,1],[0,2],[1,3],[2,3]]",
            "output": "[0, 1, 2, 3]",
            "explanation": "Every edge points from an earlier node to a later node."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] topoSort(int n, int[][] edges) {\n    boolean[][] graph = new boolean[n][n];\n    int[] indegree = new int[n];\n    for (int[] edge : edges) {\n      if (!graph[edge[0]][edge[1]]) {\n        graph[edge[0]][edge[1]] = true;\n        indegree[edge[1]]++;\n      }\n    }\n\n    int[] order = new int[n];\n    boolean[] used = new boolean[n];\n    for (int position = 0; position \u003c n; position++) {\n      int chosen = -1;\n      for (int node = 0; node \u003c n; node++) {\n        if (!used[node] && indegree[node] == 0) {\n          chosen = node;\n          break;\n        }\n      }\n      if (chosen == -1) return new int[0];\n      used[chosen] = true;\n      order[position] = chosen;\n      for (int next = 0; next \u003c n; next++) {\n        if (graph[chosen][next]) indegree[next]--;\n      }\n    }\n    return order;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] topoSort(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    int[] indegree = new int[n];\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      indegree[edge[1]]++;\n    }\n\n    Queue\u003cInteger> queue = new ArrayDeque\u003c>();\n    for (int node = 0; node \u003c n; node++) {\n      if (indegree[node] == 0) queue.offer(node);\n    }\n\n    int[] order = new int[n];\n    int index = 0;\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      order[index++] = node;\n      for (int next : graph.get(node)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n\n    return index == n ? order : new int[0];\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] topoSort(int n, int[][] edges) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : edges) graph.get(edge[0]).add(edge[1]);\n\n    int[] color = new int[n];\n    List\u003cInteger> order = new ArrayList\u003c>();\n    if (!visitAll(0, n, graph, color, order)) return new int[0];\n    Collections.reverse(order);\n    return order.stream().mapToInt(Integer::intValue).toArray();\n  }\n\n  private boolean visitAll(int node, int n, List\u003cList\u003cInteger>> graph, int[] color, List\u003cInteger> order) {\n    if (node == n) return true;\n    if (color[node] == 0 && !dfs(node, graph, color, order)) return false;\n    return visitAll(node + 1, n, graph, color, order);\n  }\n\n  private boolean dfs(int node, List\u003cList\u003cInteger>> graph, int[] color, List\u003cInteger> order) {\n    color[node] = 1;\n    for (int next : graph.get(node)) {\n      if (color[next] == 1) return false;\n      if (color[next] == 0 && !dfs(next, graph, color, order)) return false;\n    }\n    color[node] = 2;\n    order.add(node);\n    return true;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Course Schedule",
        "difficulty": "Medium",
        "subpattern": "Directed graph cycle detection",
        "question": "Given numCourses and prerequisite pairs, determine whether it is possible to finish every course.",
        "trigger": "Prerequisites form a directed graph; finishing all courses is possible only when the graph has no directed cycle.",
        "intuition": "A course can be taken after all incoming dependencies are removed, or DFS proves no node re-enters the current path.",
        "edgeCases": "No prerequisites, self dependency, duplicate edge, disconnected prerequisite groups, long prerequisite chain.",
        "constraints": "1 \u003c= numCourses \u003c= 2000; 0 \u003c= prerequisites.length \u003c= 5000; prerequisites[i] = [course, prerequisite].",
        "source": {
          "label": "Course Schedule - LeetCode 207",
          "url": "https://leetcode.com/problems/course-schedule/"
        },
        "examples": [
          {
            "input": "numCourses = 2, prerequisites = [[1,0]]",
            "output": "true",
            "explanation": "Take course 0 before course 1."
          },
          {
            "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
            "output": "false",
            "explanation": "The two courses depend on each other."
          },
          {
            "input": "numCourses = 3, prerequisites = []",
            "output": "true",
            "explanation": "There are no dependency cycles."
          }
        ],
        "bruteForceComplexity": "Time O(VE + V^2); Space O(V). Each course scans the prerequisite list during recursive cycle checks.",
        "optimizedComplexity": "Time O(V + E); Space O(V + E). Kahn BFS removes zero-indegree nodes once.",
        "recursiveComplexity": "Time O(V + E); Space O(V + E). DFS coloring detects back edges.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    for (int course = 0; course \u003c numCourses; course++) {\n      if (hasCycle(course, prerequisites, new HashSet\u003c>())) return false;\n    }\n    return true;\n  }\n\n  private boolean hasCycle(int course, int[][] prerequisites, Set\u003cInteger> path) {\n    if (!path.add(course)) return true;\n    for (int[] edge : prerequisites) {\n      if (edge[0] == course && hasCycle(edge[1], prerequisites, path)) {\n        return true;\n      }\n    }\n    path.remove(course);\n    return false;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c numCourses; i++) graph.add(new ArrayList\u003c>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque\u003cInteger> queue = new ArrayDeque\u003c>();\n    for (int i = 0; i \u003c numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int taken = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      taken++;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return taken == numCourses;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c numCourses; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : prerequisites) graph.get(edge[1]).add(edge[0]);\n\n    int[] state = new int[numCourses];\n    for (int course = 0; course \u003c numCourses; course++) {\n      if (hasCycle(course, graph, state)) return false;\n    }\n    return true;\n  }\n\n  private boolean hasCycle(int course, List\u003cList\u003cInteger>> graph, int[] state) {\n    if (state[course] == 1) return true;\n    if (state[course] == 2) return false;\n\n    state[course] = 1;\n    for (int next : graph.get(course)) {\n      if (hasCycle(next, graph, state)) return true;\n    }\n    state[course] = 2;\n    return false;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c numCourses; i++) graph.add(new ArrayList\u003c>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque\u003cInteger> queue = new ArrayDeque\u003c>();\n    for (int i = 0; i \u003c numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int taken = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      taken++;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return taken == numCourses;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List\u003cList\u003cInteger>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c numCourses; i++) graph.add(new ArrayList\u003c>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque\u003cInteger> queue = new ArrayDeque\u003c>();\n    for (int i = 0; i \u003c numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int taken = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      taken++;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return taken == numCourses;\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Bipartite Graph",
        "difficulty": "Medium",
        "subpattern": "Bipartite graph coloring",
        "question": "Given an undirected graph as adjacency lists, determine whether its nodes can be split into two sets so every edge connects nodes in different sets.",
        "trigger": "The graph asks for a two-color assignment with no same-color adjacent nodes.",
        "intuition": "Color one node, force all neighbors to the opposite color, and fail if a conflict appears.",
        "edgeCases": "Disconnected graph, isolated node, odd cycle, even cycle, self-loop if present, empty adjacency list.",
        "constraints": "1 \u003c= graph.length \u003c= 100; 0 \u003c= graph[u].length \u003c graph.length; graph is undirected.",
        "source": {
          "label": "Is Graph Bipartite? - LeetCode 785",
          "url": "https://leetcode.com/problems/is-graph-bipartite/"
        },
        "examples": [
          {
            "input": "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]",
            "output": "false",
            "explanation": "Nodes 0,1,2 form an odd cycle conflict."
          },
          {
            "input": "graph = [[1,3],[0,2],[1,3],[0,2]]",
            "output": "true",
            "explanation": "The graph can be split into {0,2} and {1,3}."
          },
          {
            "input": "graph = [[],[2],[1]]",
            "output": "true",
            "explanation": "The isolated node does not affect coloring."
          }
        ],
        "bruteForceComplexity": "Time O(2^V * E); Space O(V). Backtracking tries color assignments.",
        "optimizedComplexity": "Time O(V + E); Space O(V). BFS coloring checks each edge once.",
        "recursiveComplexity": "Time O(V + E); Space O(V). DFS coloring recurses through each component.",
        "bruteForceCode": "class Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    return assign(0, graph, color);\n  }\n\n  private boolean assign(int node, int[][] graph, int[] color) {\n    if (node == graph.length) return valid(graph, color);\n    color[node] = 1;\n    if (partialValid(graph, color, node) && assign(node + 1, graph, color)) return true;\n    color[node] = -1;\n    if (partialValid(graph, color, node) && assign(node + 1, graph, color)) return true;\n    color[node] = 0;\n    return false;\n  }\n\n  private boolean partialValid(int[][] graph, int[] color, int node) {\n    for (int next : graph[node]) {\n      if (color[next] != 0 && color[next] == color[node]) return false;\n    }\n    return true;\n  }\n\n  private boolean valid(int[][] graph, int[] color) {\n    for (int node = 0; node \u003c graph.length; node++) {\n      for (int next : graph[node]) if (color[node] == color[next]) return false;\n    }\n    return true;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int start = 0; start \u003c graph.length; start++) {\n      if (color[start] != 0) continue;\n      Deque\u003cInteger> queue = new ArrayDeque\u003c>();\n      queue.offer(start);\n      color[start] = 1;\n\n      while (!queue.isEmpty()) {\n        int node = queue.poll();\n        for (int next : graph[node]) {\n          if (color[next] == color[node]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[node];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int node = 0; node \u003c graph.length; node++) {\n      if (color[node] == 0 && !dfs(node, 1, graph, color)) return false;\n    }\n    return true;\n  }\n\n  private boolean dfs(int node, int paint, int[][] graph, int[] color) {\n    if (color[node] != 0) return color[node] == paint;\n    color[node] = paint;\n    for (int next : graph[node]) {\n      if (!dfs(next, -paint, graph, color)) return false;\n    }\n    return true;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int start = 0; start \u003c graph.length; start++) {\n      if (color[start] != 0) continue;\n      Deque\u003cInteger> queue = new ArrayDeque\u003c>();\n      queue.offer(start);\n      color[start] = 1;\n\n      while (!queue.isEmpty()) {\n        int node = queue.poll();\n        for (int next : graph[node]) {\n          if (color[next] == color[node]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[node];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int start = 0; start \u003c graph.length; start++) {\n      if (color[start] != 0) continue;\n      Deque\u003cInteger> queue = new ArrayDeque\u003c>();\n      queue.offer(start);\n      color[start] = 1;\n\n      while (!queue.isEmpty()) {\n        int node = queue.poll();\n        for (int next : graph[node]) {\n          if (color[next] == color[node]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[node];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}"
      },
      {
        "group": "more-practice",
        "name": "Dijkstra Algorithm",
        "difficulty": "Medium",
        "subpattern": "Weighted shortest path with Dijkstra",
        "question": "Given directed weighted edges and a starting node k, return the time for all nodes to receive the signal, or -1 if some node is unreachable.",
        "trigger": "Signal arrival time is single-source shortest path over positive weighted directed edges.",
        "intuition": "Use Dijkstra to settle nodes in increasing known arrival time; the answer is the largest settled distance.",
        "edgeCases": "Unreachable node, single node, multiple edges between same nodes, cycle, k has no outgoing edge.",
        "constraints": "1 \u003c= n \u003c= 100; 1 \u003c= times.length \u003c= 6000; edge weights are positive; nodes are labeled 1 to n.",
        "source": {
          "label": "Network Delay Time - LeetCode 743",
          "url": "https://leetcode.com/problems/network-delay-time/"
        },
        "examples": [
          {
            "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
            "output": "2",
            "explanation": "The farthest node receives the signal after two units."
          },
          {
            "input": "times = [[1,2,1]], n = 2, k = 1",
            "output": "1",
            "explanation": "Node 2 is reached in one unit."
          },
          {
            "input": "times = [[1,2,1]], n = 2, k = 2",
            "output": "-1",
            "explanation": "Node 1 is unreachable from node 2."
          }
        ],
        "bruteForceComplexity": "Time O(VE); Space O(V). Bellman-Ford relaxes every edge up to n - 1 times.",
        "optimizedComplexity": "Time O(E log V); Space O(V + E). Dijkstra uses a priority queue and adjacency list.",
        "recursiveComplexity": "Time O(VE) worst case; Space O(V + E). Recursive relaxation propagates only improved distances.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE / 4);\n    dist[k] = 0;\n\n    for (int i = 1; i \u003c n; i++) {\n      boolean changed = false;\n      for (int[] edge : times) {\n        int from = edge[0], to = edge[1], weight = edge[2];\n        if (dist[from] + weight \u003c dist[to]) {\n          dist[to] = dist[from] + weight;\n          changed = true;\n        }\n      }\n      if (!changed) break;\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) answer = Math.max(answer, dist[node]);\n    return answer >= Integer.MAX_VALUE / 4 ? -1 : answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cList\u003cint[]>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c= n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue\u003cint[]> pq = new PriorityQueue\u003c>(Comparator.comparingInt(a -> a[1]));\n    pq.offer(new int[] {k, 0});\n\n    while (!pq.isEmpty()) {\n      int[] current = pq.poll();\n      int node = current[0], time = current[1];\n      if (time != dist[node]) continue;\n      for (int[] edge : graph.get(node)) {\n        int next = edge[0], arrival = time + edge[1];\n        if (arrival \u003c dist[next]) {\n          dist[next] = arrival;\n          pq.offer(new int[] {next, arrival});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) answer = Math.max(answer, dist[node]);\n    return answer == Integer.MAX_VALUE ? -1 : answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cList\u003cint[]>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c= n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE / 4);\n    relax(k, 0, graph, dist);\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) answer = Math.max(answer, dist[node]);\n    return answer >= Integer.MAX_VALUE / 4 ? -1 : answer;\n  }\n\n  private void relax(int node, int time, List\u003cList\u003cint[]>> graph, int[] dist) {\n    if (time >= dist[node]) return;\n    dist[node] = time;\n    for (int[] edge : graph.get(node)) {\n      relax(edge[0], time + edge[1], graph, dist);\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cList\u003cint[]>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c= n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue\u003cint[]> pq = new PriorityQueue\u003c>(Comparator.comparingInt(a -> a[1]));\n    pq.offer(new int[] {k, 0});\n\n    while (!pq.isEmpty()) {\n      int[] current = pq.poll();\n      int node = current[0], time = current[1];\n      if (time != dist[node]) continue;\n      for (int[] edge : graph.get(node)) {\n        int next = edge[0], arrival = time + edge[1];\n        if (arrival \u003c dist[next]) {\n          dist[next] = arrival;\n          pq.offer(new int[] {next, arrival});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) answer = Math.max(answer, dist[node]);\n    return answer == Integer.MAX_VALUE ? -1 : answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List\u003cList\u003cint[]>> graph = new ArrayList\u003c>();\n    for (int i = 0; i \u003c= n; i++) graph.add(new ArrayList\u003c>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue\u003cint[]> pq = new PriorityQueue\u003c>(Comparator.comparingInt(a -> a[1]));\n    pq.offer(new int[] {k, 0});\n\n    while (!pq.isEmpty()) {\n      int[] current = pq.poll();\n      int node = current[0], time = current[1];\n      if (time != dist[node]) continue;\n      for (int[] edge : graph.get(node)) {\n        int next = edge[0], arrival = time + edge[1];\n        if (arrival \u003c dist[next]) {\n          dist[next] = arrival;\n          pq.offer(new int[] {next, arrival});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node \u003c= n; node++) answer = Math.max(answer, dist[node]);\n    return answer == Integer.MAX_VALUE ? -1 : answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Union Find (DSU)",
        "difficulty": "Medium",
        "subpattern": "Disjoint Set Union",
        "question": "Given n nodes and undirected edges, return the number of connected components using Union Find.",
        "trigger": "Edges merge components, and repeated connectivity queries need near-constant parent lookup.",
        "intuition": "Each node starts as its own parent. Union connects roots; path compression flattens future finds.",
        "edgeCases": "No edges, already connected graph, duplicate edges, self loop, and isolated nodes.",
        "constraints": "Nodes are labeled 0 to n - 1.",
        "bruteForceComplexity": "Time O(VE), Space O(V). Relabel components by scanning.",
        "optimizedComplexity": "Time O((V + E) alpha(V)), Space O(V).",
        "recursiveComplexity": "Time O((V + E) alpha(V)), Space O(V) plus recursive find stack.",
        "examples": [
          {
            "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
            "output": "2",
            "explanation": "The graph has components {0,1,2} and {3,4}."
          }
        ],
        "bruteForceCode": "class Solution {\n  public int countComponents(int n, int[][] edges) {\n    int[] component = new int[n];\n    for (int i = 0; i \u003c n; i++) component[i] = i;\n\n    for (int[] edge : edges) {\n      int from = component[edge[0]];\n      int to = component[edge[1]];\n      if (from == to) continue;\n      for (int node = 0; node \u003c n; node++) {\n        if (component[node] == to) component[node] = from;\n      }\n    }\n\n    int count = 0;\n    for (int node = 0; node \u003c n; node++) {\n      if (component[node] == node) count++;\n    }\n    return count;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int countComponents(int n, int[][] edges) {\n    int[] parent = new int[n];\n    int[] rank = new int[n];\n    for (int i = 0; i \u003c n; i++) parent[i] = i;\n\n    int components = n;\n    for (int[] edge : edges) {\n      if (union(edge[0], edge[1], parent, rank)) {\n        components--;\n      }\n    }\n    return components;\n  }\n\n  private int find(int node, int[] parent) {\n    while (node != parent[node]) {\n      parent[node] = parent[parent[node]];\n      node = parent[node];\n    }\n    return node;\n  }\n\n  private boolean union(int a, int b, int[] parent, int[] rank) {\n    int rootA = find(a, parent);\n    int rootB = find(b, parent);\n    if (rootA == rootB) return false;\n\n    if (rank[rootA] \u003c rank[rootB]) {\n      parent[rootA] = rootB;\n    } else if (rank[rootA] > rank[rootB]) {\n      parent[rootB] = rootA;\n    } else {\n      parent[rootB] = rootA;\n      rank[rootA]++;\n    }\n    return true;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int countComponents(int n, int[][] edges) {\n    int[] parent = new int[n];\n    int[] rank = new int[n];\n    for (int i = 0; i \u003c n; i++) parent[i] = i;\n\n    return merge(edges, 0, parent, rank, n);\n  }\n\n  private int merge(int[][] edges, int index, int[] parent, int[] rank, int components) {\n    if (index == edges.length) return components;\n    if (union(edges[index][0], edges[index][1], parent, rank)) components--;\n    return merge(edges, index + 1, parent, rank, components);\n  }\n\n  private int find(int node, int[] parent) {\n    if (parent[node] != node) {\n      parent[node] = find(parent[node], parent);\n    }\n    return parent[node];\n  }\n\n  private boolean union(int a, int b, int[] parent, int[] rank) {\n    int rootA = find(a, parent);\n    int rootB = find(b, parent);\n    if (rootA == rootB) return false;\n    if (rank[rootA] \u003c rank[rootB]) {\n      parent[rootA] = rootB;\n    } else if (rank[rootA] > rank[rootB]) {\n      parent[rootB] = rootA;\n    } else {\n      parent[rootB] = rootA;\n      rank[rootA]++;\n    }\n    return true;\n  }\n}"
      }
    ]
  },
  "recursion": {
    "id": "recursion",
    "name": "Recursion Revision",
    "summary": "Base cases, include/exclude choices, permutation trees, combination recursion, and phone keypad branching.",
    "checklist": [
      "Define the base case before writing recursive calls.",
      "Know what each call owns: index, current path, remaining target, or used set.",
      "Undo path changes after recursive calls when reusing mutable state.",
      "Use memoization when the same state repeats.",
      "Return values for DP recursion; collect paths for generation recursion."
    ],
    "mistakes": [
      "Missing base case.",
      "Not backtracking mutable lists or builders.",
      "Allowing duplicate permutations when input has duplicates.",
      "Recursing past array bounds.",
      "Forgetting to copy the current path into the answer."
    ],
    "edgeCases": [
      "Empty input, one element, repeated values, target 0, and large branching output."
    ],
    "complexities": [
      "Subsets and subsequences generate O(2^n) outputs.",
      "Permutations generate O(n!) outputs.",
      "Combination recursion depends on target and candidates.",
      "Recursive output problems use space proportional to output size."
    ],
    "mentalModel": [
      "A recursive function solves one state.",
      "Every branch changes exactly one decision.",
      "Base case commits an answer or returns a value.",
      "Backtracking restores state.",
      "Memoization turns repeated states into lookup."
    ],
    "revisionStrategy": [
      "Practice Print Subsequences and Generate Subsets first.",
      "Then Generate Permutations and Combination Sum.",
      "Finish with Letter Combinations."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Print Subsequences",
        "difficulty": "Easy",
        "subpattern": "Include/exclude recursion",
        "question": "Given a string s, return all subsequences of s, including the empty subsequence.",
        "trigger": "For each character, you choose to either include it or skip it.",
        "intuition": "A binary recursion tree represents every subsequence.",
        "edgeCases": "Empty string, one character, duplicate characters, and output order.",
        "constraints": "Output size is 2^n.",
        "bruteForceComplexity": "Time O(n * 2^n), Space O(n * 2^n).",
        "optimizedComplexity": "Time O(n * 2^n), Space O(n * 2^n).",
        "recursiveComplexity": "Time O(n * 2^n), Space O(n * 2^n) including output.",
        "examples": [
          {
            "input": "s = \"ab\"",
            "output": "[\"\", \"b\", \"a\", \"ab\"]",
            "explanation": "Each character is either skipped or included."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cString> subsequences(String s) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    int total = 1 \u003c\u003c s.length();\n    for (int mask = 0; mask \u003c total; mask++) {\n      StringBuilder current = new StringBuilder();\n      for (int i = 0; i \u003c s.length(); i++) {\n        if ((mask & (1 \u003c\u003c i)) != 0) {\n          current.append(s.charAt(i));\n        }\n      }\n      answer.add(current.toString());\n    }\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cString> subsequences(String s) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    answer.add(\"\");\n\n    for (char ch : s.toCharArray()) {\n      int size = answer.size();\n      for (int i = 0; i \u003c size; i++) {\n        answer.add(answer.get(i) + ch);\n      }\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cString> subsequences(String s) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    build(s, 0, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void build(String s, int index, StringBuilder current, List\u003cString> answer) {\n    if (index == s.length()) {\n      answer.add(current.toString());\n      return;\n    }\n\n    build(s, index + 1, current, answer);\n    current.append(s.charAt(index));\n    build(s, index + 1, current, answer);\n    current.deleteCharAt(current.length() - 1);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Generate Subsets",
        "difficulty": "Medium",
        "subpattern": "Include-exclude recursion",
        "question": "Given an integer array nums with unique elements, return all possible subsets of nums.",
        "trigger": "For every element, recursion has exactly two choices: exclude it or include it.",
        "intuition": "At index i, first recurse without nums[i], then recurse with nums[i]. The leaf is one subset.",
        "edgeCases": "Empty input if allowed, one element, unique values, output can be in any order, exponential output size.",
        "constraints": "1 \u003c= nums.length \u003c= 10; -10 \u003c= nums[i] \u003c= 10; all nums values are unique.",
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
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> subsets(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    int total = 1 \u003c\u003c nums.length;\n\n    for (int mask = 0; mask \u003c total; mask++) {\n      List\u003cInteger> subset = new ArrayList\u003c>();\n      for (int i = 0; i \u003c nums.length; i++) {\n        if ((mask & (1 \u003c\u003c i)) != 0) subset.add(nums[i]);\n      }\n      answer.add(subset);\n    }\n\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> subsets(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    answer.add(new ArrayList\u003c>());\n\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i \u003c size; i++) {\n        List\u003cInteger> next = new ArrayList\u003c>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> subsets(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    dfs(nums, 0, new ArrayList\u003c>(), answer);\n    return answer;\n  }\n\n  private void dfs(int[] nums, int index, List\u003cInteger> path, List\u003cList\u003cInteger>> answer) {\n    if (index == nums.length) {\n      answer.add(new ArrayList\u003c>(path));\n      return;\n    }\n\n    dfs(nums, index + 1, path, answer);\n    path.add(nums[index]);\n    dfs(nums, index + 1, path, answer);\n    path.remove(path.size() - 1);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> subsets(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    answer.add(new ArrayList\u003c>());\n\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i \u003c size; i++) {\n        List\u003cInteger> next = new ArrayList\u003c>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> subsets(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    answer.add(new ArrayList\u003c>());\n\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i \u003c size; i++) {\n        List\u003cInteger> next = new ArrayList\u003c>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Generate Permutations",
        "difficulty": "Medium",
        "subpattern": "Recursive ordering with used-state",
        "question": "Given an array nums of distinct integers, return all possible permutations.",
        "trigger": "Each recursion level chooses one unused element for the next position.",
        "intuition": "Track which numbers are already used. When path length equals n, record one permutation.",
        "edgeCases": "One element, distinct values only, negative values, output order not important, factorial output size.",
        "constraints": "1 \u003c= nums.length \u003c= 6; -10 \u003c= nums[i] \u003c= 10; all nums values are unique.",
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
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> permute(int[] nums) {\n    Arrays.sort(nums);\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    do {\n      List\u003cInteger> current = new ArrayList\u003c>();\n      for (int num : nums) current.add(num);\n      answer.add(current);\n    } while (nextPermutation(nums));\n    return answer;\n  }\n\n  private boolean nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i \u003c 0) return false;\n    int j = nums.length - 1;\n    while (nums[j] \u003c= nums[i]) j--;\n    swap(nums, i, j);\n    reverse(nums, i + 1, nums.length - 1);\n    return true;\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left \u003c right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> permute(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    answer.add(new ArrayList\u003c>());\n\n    for (int num : nums) {\n      List\u003cList\u003cInteger>> nextLevel = new ArrayList\u003c>();\n      for (List\u003cInteger> perm : answer) {\n        for (int pos = 0; pos \u003c= perm.size(); pos++) {\n          List\u003cInteger> next = new ArrayList\u003c>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> permute(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    dfs(nums, new boolean[nums.length], new ArrayList\u003c>(), answer);\n    return answer;\n  }\n\n  private void dfs(int[] nums, boolean[] used, List\u003cInteger> path, List\u003cList\u003cInteger>> answer) {\n    if (path.size() == nums.length) {\n      answer.add(new ArrayList\u003c>(path));\n      return;\n    }\n\n    for (int i = 0; i \u003c nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      path.add(nums[i]);\n      dfs(nums, used, path, answer);\n      path.remove(path.size() - 1);\n      used[i] = false;\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> permute(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    answer.add(new ArrayList\u003c>());\n\n    for (int num : nums) {\n      List\u003cList\u003cInteger>> nextLevel = new ArrayList\u003c>();\n      for (List\u003cInteger> perm : answer) {\n        for (int pos = 0; pos \u003c= perm.size(); pos++) {\n          List\u003cInteger> next = new ArrayList\u003c>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> permute(int[] nums) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    answer.add(new ArrayList\u003c>());\n\n    for (int num : nums) {\n      List\u003cList\u003cInteger>> nextLevel = new ArrayList\u003c>();\n      for (List\u003cInteger> perm : answer) {\n        for (int pos = 0; pos \u003c= perm.size(); pos++) {\n          List\u003cInteger> next = new ArrayList\u003c>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n\n    return answer;\n  }\n}"
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
        "constraints": "1 \u003c= candidates.length \u003c= 30; 2 \u003c= candidates[i] \u003c= 40; all candidates are distinct; 1 \u003c= target \u003c= 40.",
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
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> combinationSum(int[] candidates, int target) {\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    search(candidates, 0, target, new ArrayList\u003c>(), answer);\n    return answer;\n  }\n\n  private void search(int[] candidates, int index, int remaining,\n      List\u003cInteger> path, List\u003cList\u003cInteger>> answer) {\n    if (remaining == 0) {\n      answer.add(new ArrayList\u003c>(path));\n      return;\n    }\n    if (index == candidates.length || remaining \u003c 0) return;\n\n    path.add(candidates[index]);\n    search(candidates, index, remaining - candidates[index], path, answer);\n    path.remove(path.size() - 1);\n    search(candidates, index + 1, remaining, path, answer);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, target, new ArrayList\u003c>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List\u003cInteger> next = new ArrayList\u003c>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    int remaining;\n    List\u003cInteger> path;\n    State(int start, int remaining, List\u003cInteger> path) {\n      this.start = start;\n      this.remaining = remaining;\n      this.path = path;\n    }\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    dfs(candidates, 0, target, new ArrayList\u003c>(), answer);\n    return answer;\n  }\n\n  private void dfs(int[] candidates, int start, int remaining,\n      List\u003cInteger> path, List\u003cList\u003cInteger>> answer) {\n    if (remaining == 0) {\n      answer.add(new ArrayList\u003c>(path));\n      return;\n    }\n\n    for (int i = start; i \u003c candidates.length && candidates[i] \u003c= remaining; i++) {\n      path.add(candidates[i]);\n      dfs(candidates, i, remaining - candidates[i], path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, target, new ArrayList\u003c>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List\u003cInteger> next = new ArrayList\u003c>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    int remaining;\n    List\u003cInteger> path;\n    State(int start, int remaining, List\u003cInteger> path) {\n      this.start = start;\n      this.remaining = remaining;\n      this.path = path;\n    }\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cInteger>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List\u003cList\u003cInteger>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, target, new ArrayList\u003c>()));\n\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List\u003cInteger> next = new ArrayList\u003c>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n\n    return answer;\n  }\n\n  private static class State {\n    int start;\n    int remaining;\n    List\u003cInteger> path;\n    State(int start, int remaining, List\u003cInteger> path) {\n      this.start = start;\n      this.remaining = remaining;\n      this.path = path;\n    }\n  }\n}"
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
        "constraints": "0 \u003c= digits.length \u003c= 4; digits[i] is in 2..9.",
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
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List\u003cString> letterCombinations(String digits) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    if (digits.length() == 0) return answer;\n    answer.add(\"\");\n\n    for (char digit : digits.toCharArray()) {\n      List\u003cString> next = new ArrayList\u003c>();\n      for (String prefix : answer) {\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          next.add(prefix + ch);\n        }\n      }\n      answer = next;\n    }\n\n    return answer;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List\u003cString> letterCombinations(String digits) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    if (digits.length() == 0) return answer;\n\n    Queue\u003cString> queue = new ArrayDeque\u003c>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i \u003c size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          queue.offer(prefix + ch);\n        }\n      }\n    }\n\n    answer.addAll(queue);\n    return answer;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List\u003cString> letterCombinations(String digits) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    if (digits.length() == 0) return answer;\n    dfs(digits, 0, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void dfs(String digits, int index, StringBuilder path, List\u003cString> answer) {\n    if (index == digits.length()) {\n      answer.add(path.toString());\n      return;\n    }\n\n    for (char ch : MAP[digits.charAt(index) - '0'].toCharArray()) {\n      path.append(ch);\n      dfs(digits, index + 1, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List\u003cString> letterCombinations(String digits) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    if (digits.length() == 0) return answer;\n\n    Queue\u003cString> queue = new ArrayDeque\u003c>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i \u003c size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          queue.offer(prefix + ch);\n        }\n      }\n    }\n\n    answer.addAll(queue);\n    return answer;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List\u003cString> letterCombinations(String digits) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    if (digits.length() == 0) return answer;\n\n    Queue\u003cString> queue = new ArrayDeque\u003c>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i \u003c size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) {\n          queue.offer(prefix + ch);\n        }\n      }\n    }\n\n    answer.addAll(queue);\n    return answer;\n  }\n}"
      }
    ]
  },
  "backtracking": {
    "id": "backtracking",
    "name": "Backtracking Revision",
    "summary": "Constraint search with choose, explore, unchoose over boards, paths, partitions, and permutations.",
    "checklist": [
      "Identify the choices available at the current state.",
      "Check constraints before recursing.",
      "Mark and unmark board cells or used values.",
      "Copy completed paths into the result.",
      "Prune impossible branches early."
    ],
    "mistakes": [
      "Forgetting to unmark visited state.",
      "Adding mutable path references without copying.",
      "Checking constraints too late.",
      "Not handling duplicate candidates.",
      "Mutating the board without restoring it."
    ],
    "edgeCases": [
      "Empty board, no solution, one-cell board, duplicate choices, and all choices invalid."
    ],
    "complexities": [
      "Backtracking is usually exponential.",
      "Pruning reduces branches but not worst-case class.",
      "Board search often costs O(mn * branching^length).",
      "Result space can dominate."
    ],
    "mentalModel": [
      "Choose one candidate.",
      "Validate it.",
      "Explore deeper.",
      "Undo the choice.",
      "Stop when the state is complete."
    ],
    "revisionStrategy": [
      "Start with N Queens and Word Search.",
      "Then Sudoku Solver and Rat in a Maze.",
      "Finish with Palindrome Partitioning."
    ],
    "problems": [
      {
        "group": "advanced",
        "name": "N Queens",
        "difficulty": "Hard",
        "subpattern": "Constraint search with column and diagonal pruning",
        "question": "Given n, return all distinct boards that place n queens on an n x n board so no two queens attack each other.",
        "trigger": "Each row needs one queen, and columns/diagonals chosen by previous rows constrain the next row.",
        "intuition": "Backtrack row by row. Track used columns and diagonals to test safety in O(1).",
        "edgeCases": "n = 1, n = 2 or 3 no solution, diagonal indexes, board formatting, cleanup after each queen.",
        "constraints": "1 \u003c= n \u003c= 9.",
        "source": {
          "label": "N-Queens - LeetCode 51",
          "url": "https://leetcode.com/problems/n-queens/"
        },
        "examples": [
          {
            "input": "n = 4",
            "output": "two boards",
            "explanation": "The classic 4-queens puzzle has two solutions."
          },
          {
            "input": "n = 1",
            "output": "[[\"Q\"]]",
            "explanation": "One queen is valid."
          },
          {
            "input": "n = 2",
            "output": "[]",
            "explanation": "No valid placement exists."
          }
        ],
        "bruteForceComplexity": "Time O(n! * n^2); Space O(n). Generate column permutations and validate diagonals.",
        "optimizedComplexity": "Time O(n!); Space O(n). Iterative row search maintains constraint arrays.",
        "recursiveComplexity": "Time O(n!); Space O(n). Backtracking places one queen per row.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> solveNQueens(int n) {\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    int[] cols = new int[n];\n    for (int i = 0; i \u003c n; i++) cols[i] = i;\n    permute(cols, 0, answer);\n    return answer;\n  }\n\n  private void permute(int[] cols, int row, List\u003cList\u003cString>> answer) {\n    if (row == cols.length) { if (valid(cols)) answer.add(build(cols)); return; }\n    for (int i = row; i \u003c cols.length; i++) {\n      swap(cols, row, i); permute(cols, row + 1, answer); swap(cols, row, i);\n    }\n  }\n\n  private boolean valid(int[] cols) {\n    for (int a = 0; a \u003c cols.length; a++) for (int b = a + 1; b \u003c cols.length; b++)\n      if (Math.abs(a - b) == Math.abs(cols[a] - cols[b])) return false;\n    return true;\n  }\n\n  private List\u003cString> build(int[] cols) {\n    List\u003cString> board = new ArrayList\u003c>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private void swap(int[] nums, int i, int j) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> solveNQueens(int n) {\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n]));\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.row == n) { answer.add(build(s.cols)); continue; }\n      for (int col = n - 1; col >= 0; col--) {\n        int d1 = s.row - col + n, d2 = s.row + col;\n        if (s.used[col] || s.d1[d1] || s.d2[d2]) continue;\n        State next = s.copy();\n        next.cols[s.row] = col;\n        next.used[col] = next.d1[d1] = next.d2[d2] = true;\n        next.row++;\n        stack.push(next);\n      }\n    }\n    return answer;\n  }\n\n  private List\u003cString> build(int[] cols) {\n    List\u003cString> board = new ArrayList\u003c>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private static class State {\n    int row; int[] cols; boolean[] used, d1, d2;\n    State(int row,int[] cols,boolean[] used,boolean[] d1,boolean[] d2){this.row=row;this.cols=cols;this.used=used;this.d1=d1;this.d2=d2;}\n    State copy(){return new State(row, cols.clone(), used.clone(), d1.clone(), d2.clone());}\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> solveNQueens(int n) {\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    backtrack(0, n, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n], answer);\n    return answer;\n  }\n\n  private void backtrack(int row, int n, int[] cols, boolean[] used, boolean[] d1, boolean[] d2, List\u003cList\u003cString>> answer) {\n    if (row == n) { answer.add(build(cols)); return; }\n    for (int col = 0; col \u003c n; col++) {\n      int a = row - col + n, b = row + col;\n      if (used[col] || d1[a] || d2[b]) continue;\n      cols[row] = col; used[col] = d1[a] = d2[b] = true;\n      backtrack(row + 1, n, cols, used, d1, d2, answer);\n      used[col] = d1[a] = d2[b] = false;\n    }\n  }\n\n  private List\u003cString> build(int[] cols) {\n    List\u003cString> board = new ArrayList\u003c>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> solveNQueens(int n) {\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n]));\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.row == n) { answer.add(build(s.cols)); continue; }\n      for (int col = n - 1; col >= 0; col--) {\n        int d1 = s.row - col + n, d2 = s.row + col;\n        if (s.used[col] || s.d1[d1] || s.d2[d2]) continue;\n        State next = s.copy();\n        next.cols[s.row] = col;\n        next.used[col] = next.d1[d1] = next.d2[d2] = true;\n        next.row++;\n        stack.push(next);\n      }\n    }\n    return answer;\n  }\n\n  private List\u003cString> build(int[] cols) {\n    List\u003cString> board = new ArrayList\u003c>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private static class State {\n    int row; int[] cols; boolean[] used, d1, d2;\n    State(int row,int[] cols,boolean[] used,boolean[] d1,boolean[] d2){this.row=row;this.cols=cols;this.used=used;this.d1=d1;this.d2=d2;}\n    State copy(){return new State(row, cols.clone(), used.clone(), d1.clone(), d2.clone());}\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> solveNQueens(int n) {\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n]));\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.row == n) { answer.add(build(s.cols)); continue; }\n      for (int col = n - 1; col >= 0; col--) {\n        int d1 = s.row - col + n, d2 = s.row + col;\n        if (s.used[col] || s.d1[d1] || s.d2[d2]) continue;\n        State next = s.copy();\n        next.cols[s.row] = col;\n        next.used[col] = next.d1[d1] = next.d2[d2] = true;\n        next.row++;\n        stack.push(next);\n      }\n    }\n    return answer;\n  }\n\n  private List\u003cString> build(int[] cols) {\n    List\u003cString> board = new ArrayList\u003c>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private static class State {\n    int row; int[] cols; boolean[] used, d1, d2;\n    State(int row,int[] cols,boolean[] used,boolean[] d1,boolean[] d2){this.row=row;this.cols=cols;this.used=used;this.d1=d1;this.d2=d2;}\n    State copy(){return new State(row, cols.clone(), used.clone(), d1.clone(), d2.clone());}\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Sudoku Solver",
        "difficulty": "Hard",
        "subpattern": "Constraint search with row/column/box state",
        "question": "Solve a 9 x 9 Sudoku board by filling empty cells marked with dots. The given board has exactly one solution.",
        "trigger": "Each blank cell branches over digits 1..9, constrained by row, column, and 3x3 box usage.",
        "intuition": "Preload constraints. Pick a blank, try valid digits, place one, recurse, and undo if it fails.",
        "edgeCases": "Already solved board, one blank, no valid digit at a cell, box index calculation, restoring constraints.",
        "constraints": "board is 9 x 9; cells are digits 1..9 or dot; the puzzle has exactly one solution.",
        "source": {
          "label": "Sudoku Solver - LeetCode 37",
          "url": "https://leetcode.com/problems/sudoku-solver/"
        },
        "examples": [
          {
            "input": "standard partially-filled Sudoku board",
            "output": "solved board",
            "explanation": "All rows, columns, and boxes become valid."
          },
          {
            "input": "board with one blank",
            "output": "blank filled",
            "explanation": "The only valid digit is inserted."
          },
          {
            "input": "already solved board",
            "output": "same board",
            "explanation": "No search is needed."
          }
        ],
        "bruteForceComplexity": "Time O(9^e * 81); Space O(e). Each validity check scans row, column, and box.",
        "optimizedComplexity": "Time O(9^e); Space O(e). Iterative stack uses precomputed constraints.",
        "recursiveComplexity": "Time O(9^e); Space O(e). Backtracking with constraint tables tests digits in O(1).",
        "bruteForceCode": "class Solution {\n  public void solveSudoku(char[][] board) {\n    solve(board, 0, 0);\n  }\n\n  private boolean solve(char[][] board, int row, int col) {\n    if (row == 9) return true;\n    if (col == 9) return solve(board, row + 1, 0);\n    if (board[row][col] != '.') return solve(board, row, col + 1);\n    for (char digit = '1'; digit \u003c= '9'; digit++) {\n      if (!valid(board, row, col, digit)) continue;\n      board[row][col] = digit;\n      if (solve(board, row, col + 1)) return true;\n      board[row][col] = '.';\n    }\n    return false;\n  }\n\n  private boolean valid(char[][] board, int row, int col, char digit) {\n    for (int i = 0; i \u003c 9; i++) {\n      if (board[row][i] == digit || board[i][col] == digit) return false;\n      if (board[(row/3)*3 + i/3][(col/3)*3 + i%3] == digit) return false;\n    }\n    return true;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List\u003cint[]> blanks = new ArrayList\u003c>();\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    for (int r = 0; r \u003c 9; r++) for (int c = 0; c \u003c 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    int[] next = new int[blanks.size()];\n    Arrays.fill(next, 1);\n    int i = 0;\n    while (i >= 0 && i \u003c blanks.size()) {\n      int r = blanks.get(i)[0], c = blanks.get(i)[1];\n      if (board[r][c] != '.') { set(rows, cols, boxes, r, c, board[r][c] - '0', false); board[r][c] = '.'; }\n      boolean placed = false;\n      for (int d = next[i]; d \u003c= 9; d++) if (!rows[r][d] && !cols[c][d] && !boxes[box(r,c)][d]) {\n        board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true); next[i] = d + 1; i++; placed = true; break;\n      }\n      if (!placed) { next[i] = 1; i--; }\n    }\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    List\u003cint[]> blanks = new ArrayList\u003c>();\n    for (int r = 0; r \u003c 9; r++) for (int c = 0; c \u003c 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    backtrack(board, blanks, 0, rows, cols, boxes);\n  }\n\n  private boolean backtrack(char[][] board, List\u003cint[]> blanks, int index, boolean[][] rows, boolean[][] cols, boolean[][] boxes) {\n    if (index == blanks.size()) return true;\n    int r = blanks.get(index)[0], c = blanks.get(index)[1];\n    for (int d = 1; d \u003c= 9; d++) {\n      if (rows[r][d] || cols[c][d] || boxes[box(r,c)][d]) continue;\n      board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true);\n      if (backtrack(board, blanks, index + 1, rows, cols, boxes)) return true;\n      set(rows, cols, boxes, r, c, d, false); board[r][c] = '.';\n    }\n    return false;\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List\u003cint[]> blanks = new ArrayList\u003c>();\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    for (int r = 0; r \u003c 9; r++) for (int c = 0; c \u003c 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    int[] next = new int[blanks.size()];\n    Arrays.fill(next, 1);\n    int i = 0;\n    while (i >= 0 && i \u003c blanks.size()) {\n      int r = blanks.get(i)[0], c = blanks.get(i)[1];\n      if (board[r][c] != '.') { set(rows, cols, boxes, r, c, board[r][c] - '0', false); board[r][c] = '.'; }\n      boolean placed = false;\n      for (int d = next[i]; d \u003c= 9; d++) if (!rows[r][d] && !cols[c][d] && !boxes[box(r,c)][d]) {\n        board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true); next[i] = d + 1; i++; placed = true; break;\n      }\n      if (!placed) { next[i] = 1; i--; }\n    }\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List\u003cint[]> blanks = new ArrayList\u003c>();\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    for (int r = 0; r \u003c 9; r++) for (int c = 0; c \u003c 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    int[] next = new int[blanks.size()];\n    Arrays.fill(next, 1);\n    int i = 0;\n    while (i >= 0 && i \u003c blanks.size()) {\n      int r = blanks.get(i)[0], c = blanks.get(i)[1];\n      if (board[r][c] != '.') { set(rows, cols, boxes, r, c, board[r][c] - '0', false); board[r][c] = '.'; }\n      boolean placed = false;\n      for (int d = next[i]; d \u003c= 9; d++) if (!rows[r][d] && !cols[c][d] && !boxes[box(r,c)][d]) {\n        board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true); next[i] = d + 1; i++; placed = true; break;\n      }\n      if (!placed) { next[i] = 1; i--; }\n    }\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}"
      },
      {
        "group": "advanced",
        "name": "Rat in a Maze",
        "difficulty": "Medium",
        "subpattern": "Grid path backtracking with directional choices",
        "question": "Given an n x n maze matrix where 1 means open and 0 means blocked, return all paths from top-left to bottom-right using moves D, L, R, and U without revisiting cells.",
        "trigger": "Each open cell branches to neighboring open cells, and the path must undo visited marks after exploring a branch.",
        "intuition": "Start at (0,0). Try directions in lexicographic order, mark the cell visited, recurse, then unmark it.",
        "edgeCases": "Start blocked, destination blocked, n = 1, no path, multiple paths, avoiding cycles.",
        "constraints": "1 \u003c= n \u003c= 5 in common interview variants; mat[i][j] is 0 or 1.",
        "source": {
          "label": "Rat in a Maze Problem - GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1"
        },
        "examples": [
          {
            "input": "mat = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]",
            "output": "[\"DDRDRR\",\"DRDDRR\"]",
            "explanation": "Two valid paths reach the bottom-right cell."
          },
          {
            "input": "mat = [[1,0],[0,1]]",
            "output": "[]",
            "explanation": "The destination is isolated."
          },
          {
            "input": "mat = [[1]]",
            "output": "[\"\"]",
            "explanation": "The rat starts at the destination."
          }
        ],
        "bruteForceComplexity": "Time O(4^(n^2)); Space O(n^2). Try all simple paths with visited state.",
        "optimizedComplexity": "Time O(4^(n^2)); Space O(n^2). Iterative DFS stores path and visited mask.",
        "recursiveComplexity": "Time O(4^(n^2)); Space O(n^2). Recursive DFS marks and unmarks visited cells.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList\u003cString> findPath(int[][] mat) {\n    ArrayList\u003cString> answer = new ArrayList\u003c>();\n    if (mat[0][0] == 0) return answer;\n    dfs(mat, 0, 0, new boolean[mat.length][mat.length], new StringBuilder(), answer);\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private void dfs(int[][] mat, int r, int c, boolean[][] used, StringBuilder path, ArrayList\u003cString> answer) {\n    int n = mat.length;\n    if (r \u003c 0 || c \u003c 0 || r == n || c == n || mat[r][c] == 0 || used[r][c]) return;\n    if (r == n - 1 && c == n - 1) { answer.add(path.toString()); return; }\n    used[r][c] = true;\n    char[] move = {'D','L','R','U'}; int[] dr = {1,0,0,-1}; int[] dc = {0,-1,1,0};\n    for (int i = 0; i \u003c 4; i++) { path.append(move[i]); dfs(mat, r + dr[i], c + dc[i], used, path, answer); path.deleteCharAt(path.length() - 1); }\n    used[r][c] = false;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList\u003cString> findPath(int[][] mat) {\n    ArrayList\u003cString> answer = new ArrayList\u003c>();\n    if (mat[0][0] == 0) return answer;\n    int n = mat.length;\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, 0, \"\", new boolean[n][n]));\n    char[] move = {'U','R','L','D'}; int[] dr = {-1,0,0,1}; int[] dc = {0,1,-1,0};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r \u003c 0 || s.c \u003c 0 || s.r == n || s.c == n || mat[s.r][s.c] == 0 || s.used[s.r][s.c]) continue;\n      if (s.r == n - 1 && s.c == n - 1) { answer.add(s.path); continue; }\n      s.used[s.r][s.c] = true;\n      for (int i = 0; i \u003c 4; i++) stack.push(new State(s.r + dr[i], s.c + dc[i], s.path + move[i], copy(s.used)));\n    }\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private boolean[][] copy(boolean[][] used) { boolean[][] next = new boolean[used.length][used.length]; for (int i = 0; i \u003c used.length; i++) next[i] = used[i].clone(); return next; }\n  private static class State { int r,c; String path; boolean[][] used; State(int r,int c,String p,boolean[][] u){this.r=r;this.c=c;path=p;used=u;} }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList\u003cString> findPath(int[][] mat) {\n    ArrayList\u003cString> answer = new ArrayList\u003c>();\n    if (mat[0][0] == 0) return answer;\n    backtrack(mat, 0, 0, new boolean[mat.length][mat.length], new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[][] mat, int r, int c, boolean[][] used, StringBuilder path, ArrayList\u003cString> answer) {\n    int n = mat.length;\n    if (r \u003c 0 || c \u003c 0 || r == n || c == n || mat[r][c] == 0 || used[r][c]) return;\n    if (r == n - 1 && c == n - 1) { answer.add(path.toString()); return; }\n    used[r][c] = true;\n    char[] move = {'D','L','R','U'}; int[] dr = {1,0,0,-1}; int[] dc = {0,-1,1,0};\n    for (int i = 0; i \u003c 4; i++) {\n      path.append(move[i]);\n      backtrack(mat, r + dr[i], c + dc[i], used, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n    used[r][c] = false;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList\u003cString> findPath(int[][] mat) {\n    ArrayList\u003cString> answer = new ArrayList\u003c>();\n    if (mat[0][0] == 0) return answer;\n    int n = mat.length;\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, 0, \"\", new boolean[n][n]));\n    char[] move = {'U','R','L','D'}; int[] dr = {-1,0,0,1}; int[] dc = {0,1,-1,0};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r \u003c 0 || s.c \u003c 0 || s.r == n || s.c == n || mat[s.r][s.c] == 0 || s.used[s.r][s.c]) continue;\n      if (s.r == n - 1 && s.c == n - 1) { answer.add(s.path); continue; }\n      s.used[s.r][s.c] = true;\n      for (int i = 0; i \u003c 4; i++) stack.push(new State(s.r + dr[i], s.c + dc[i], s.path + move[i], copy(s.used)));\n    }\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private boolean[][] copy(boolean[][] used) { boolean[][] next = new boolean[used.length][used.length]; for (int i = 0; i \u003c used.length; i++) next[i] = used[i].clone(); return next; }\n  private static class State { int r,c; String path; boolean[][] used; State(int r,int c,String p,boolean[][] u){this.r=r;this.c=c;path=p;used=u;} }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public ArrayList\u003cString> findPath(int[][] mat) {\n    ArrayList\u003cString> answer = new ArrayList\u003c>();\n    if (mat[0][0] == 0) return answer;\n    int n = mat.length;\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, 0, \"\", new boolean[n][n]));\n    char[] move = {'U','R','L','D'}; int[] dr = {-1,0,0,1}; int[] dc = {0,1,-1,0};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r \u003c 0 || s.c \u003c 0 || s.r == n || s.c == n || mat[s.r][s.c] == 0 || s.used[s.r][s.c]) continue;\n      if (s.r == n - 1 && s.c == n - 1) { answer.add(s.path); continue; }\n      s.used[s.r][s.c] = true;\n      for (int i = 0; i \u003c 4; i++) stack.push(new State(s.r + dr[i], s.c + dc[i], s.path + move[i], copy(s.used)));\n    }\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private boolean[][] copy(boolean[][] used) { boolean[][] next = new boolean[used.length][used.length]; for (int i = 0; i \u003c used.length; i++) next[i] = used[i].clone(); return next; }\n  private static class State { int r,c; String path; boolean[][] used; State(int r,int c,String p,boolean[][] u){this.r=r;this.c=c;path=p;used=u;} }\n}"
      },
      {
        "group": "advanced",
        "name": "Word Search",
        "difficulty": "Medium",
        "subpattern": "Grid/path backtracking with visited state",
        "question": "Given an m x n character board and a word, return true if the word exists in the grid by adjacent horizontal or vertical moves without reusing cells.",
        "trigger": "Every matched cell branches to up to four neighbors and must be unmarked after the path is tried.",
        "intuition": "Start from every matching first character. Mark the cell, search the next index in four directions, then restore it.",
        "edgeCases": "One-cell board, word length one, repeated letters, word longer than cell count, avoiding cell reuse.",
        "constraints": "1 \u003c= m, n \u003c= 6; 1 \u003c= word.length \u003c= 15.",
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
            "input": "board = same, word = \"SEE\"",
            "output": "true",
            "explanation": "SEE exists on the board."
          },
          {
            "input": "board = same, word = \"ABCB\"",
            "output": "false",
            "explanation": "The path would need to reuse B."
          }
        ],
        "bruteForceComplexity": "Time O(m*n*4^L); Space O(L). Try every path recursively with visited state.",
        "optimizedComplexity": "Time O(m*n*3^L); Space O(L). Iterative DFS avoids revisiting cells already in the path.",
        "recursiveComplexity": "Time O(m*n*3^L); Space O(L). In-place marking keeps visited state compact.",
        "bruteForceCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    for (int r = 0; r \u003c board.length; r++) {\n      for (int c = 0; c \u003c board[0].length; c++) {\n        if (search(board, word, r, c, 0, new boolean[board.length][board[0].length])) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean search(char[][] board, String word, int r, int c, int index, boolean[][] used) {\n    if (index == word.length()) return true;\n    if (r \u003c 0 || c \u003c 0 || r == board.length || c == board[0].length) return false;\n    if (used[r][c] || board[r][c] != word.charAt(index)) return false;\n    used[r][c] = true;\n    boolean found = search(board, word, r + 1, c, index + 1, used) || search(board, word, r - 1, c, index + 1, used)\n        || search(board, word, r, c + 1, index + 1, used) || search(board, word, r, c - 1, index + 1, used);\n    used[r][c] = false;\n    return found;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r \u003c rows; r++) for (int c = 0; c \u003c cols; c++) {\n      if (board[r][c] != word.charAt(0)) continue;\n      Deque\u003cState> stack = new ArrayDeque\u003c>();\n      stack.push(new State(r, c, 0, new boolean[rows][cols]));\n      while (!stack.isEmpty()) {\n        State cur = stack.pop();\n        if (cur.row \u003c 0 || cur.col \u003c 0 || cur.row == rows || cur.col == cols) continue;\n        if (cur.used[cur.row][cur.col] || board[cur.row][cur.col] != word.charAt(cur.index)) continue;\n        if (cur.index == word.length() - 1) return true;\n        cur.used[cur.row][cur.col] = true;\n        for (int[] d : DIRS) stack.push(new State(cur.row + d[0], cur.col + d[1], cur.index + 1, copy(cur.used)));\n      }\n    }\n    return false;\n  }\n\n  private boolean[][] copy(boolean[][] used) {\n    boolean[][] next = new boolean[used.length][used[0].length];\n    for (int i = 0; i \u003c used.length; i++) next[i] = used[i].clone();\n    return next;\n  }\n\n  private static class State { int row, col, index; boolean[][] used; State(int r,int c,int i,boolean[][] u){row=r;col=c;index=i;used=u;} }\n}",
        "recursiveCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    for (int r = 0; r \u003c board.length; r++) {\n      for (int c = 0; c \u003c board[0].length; c++) {\n        if (backtrack(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean backtrack(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r \u003c 0 || c \u003c 0 || r == board.length || c == board[0].length) return false;\n    if (board[r][c] != word.charAt(index)) return false;\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = backtrack(board, word, r + 1, c, index + 1) || backtrack(board, word, r - 1, c, index + 1)\n        || backtrack(board, word, r, c + 1, index + 1) || backtrack(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r \u003c rows; r++) for (int c = 0; c \u003c cols; c++) {\n      if (board[r][c] != word.charAt(0)) continue;\n      Deque\u003cState> stack = new ArrayDeque\u003c>();\n      stack.push(new State(r, c, 0, new boolean[rows][cols]));\n      while (!stack.isEmpty()) {\n        State cur = stack.pop();\n        if (cur.row \u003c 0 || cur.col \u003c 0 || cur.row == rows || cur.col == cols) continue;\n        if (cur.used[cur.row][cur.col] || board[cur.row][cur.col] != word.charAt(cur.index)) continue;\n        if (cur.index == word.length() - 1) return true;\n        cur.used[cur.row][cur.col] = true;\n        for (int[] d : DIRS) stack.push(new State(cur.row + d[0], cur.col + d[1], cur.index + 1, copy(cur.used)));\n      }\n    }\n    return false;\n  }\n\n  private boolean[][] copy(boolean[][] used) {\n    boolean[][] next = new boolean[used.length][used[0].length];\n    for (int i = 0; i \u003c used.length; i++) next[i] = used[i].clone();\n    return next;\n  }\n\n  private static class State { int row, col, index; boolean[][] used; State(int r,int c,int i,boolean[][] u){row=r;col=c;index=i;used=u;} }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r \u003c rows; r++) for (int c = 0; c \u003c cols; c++) {\n      if (board[r][c] != word.charAt(0)) continue;\n      Deque\u003cState> stack = new ArrayDeque\u003c>();\n      stack.push(new State(r, c, 0, new boolean[rows][cols]));\n      while (!stack.isEmpty()) {\n        State cur = stack.pop();\n        if (cur.row \u003c 0 || cur.col \u003c 0 || cur.row == rows || cur.col == cols) continue;\n        if (cur.used[cur.row][cur.col] || board[cur.row][cur.col] != word.charAt(cur.index)) continue;\n        if (cur.index == word.length() - 1) return true;\n        cur.used[cur.row][cur.col] = true;\n        for (int[] d : DIRS) stack.push(new State(cur.row + d[0], cur.col + d[1], cur.index + 1, copy(cur.used)));\n      }\n    }\n    return false;\n  }\n\n  private boolean[][] copy(boolean[][] used) {\n    boolean[][] next = new boolean[used.length][used[0].length];\n    for (int i = 0; i \u003c used.length; i++) next[i] = used[i].clone();\n    return next;\n  }\n\n  private static class State { int row, col, index; boolean[][] used; State(int r,int c,int i,boolean[][] u){row=r;col=c;index=i;used=u;} }\n}"
      },
      {
        "group": "core",
        "name": "Palindrome Partitioning",
        "difficulty": "Medium",
        "subpattern": "String partition backtracking",
        "question": "Given a string s, partition it so that every substring in the partition is a palindrome. Return all possible palindrome partitionings.",
        "trigger": "At each index, the next cut can end at many positions, but only palindrome substrings are valid choices.",
        "intuition": "Try every palindrome prefix starting at index. Add it to the path, recurse from the next index, then remove it.",
        "edgeCases": "Single character, entire string palindrome, no multi-character palindrome, repeated letters, output order not important.",
        "constraints": "1 \u003c= s.length \u003c= 16; s contains lowercase English letters.",
        "source": {
          "label": "Palindrome Partitioning - LeetCode 131",
          "url": "https://leetcode.com/problems/palindrome-partitioning/"
        },
        "examples": [
          {
            "input": "s = \"aab\"",
            "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
            "explanation": "Both partitions contain only palindromes."
          },
          {
            "input": "s = \"a\"",
            "output": "[[\"a\"]]",
            "explanation": "A single character is a palindrome."
          },
          {
            "input": "s = \"efe\"",
            "output": "[[\"e\",\"f\",\"e\"],[\"efe\"]]",
            "explanation": "The whole string is also a palindrome."
          }
        ],
        "bruteForceComplexity": "Time O(n * 2^n); Space O(n). Try every cut mask and validate every piece.",
        "optimizedComplexity": "Time O(n * 2^n); Space O(n^2). Iterative stack uses precomputed palindrome table.",
        "recursiveComplexity": "Time O(n * 2^n); Space O(n^2 + n). Backtracking uses a palindrome DP table.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> partition(String s) {\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    int cuts = 1 \u003c\u003c (s.length() - 1);\n    for (int mask = 0; mask \u003c cuts; mask++) {\n      List\u003cString> path = new ArrayList\u003c>();\n      int start = 0;\n      boolean valid = true;\n      for (int i = 0; i \u003c s.length() - 1; i++) {\n        if ((mask & (1 \u003c\u003c i)) != 0) {\n          String part = s.substring(start, i + 1);\n          if (!isPalindrome(part)) valid = false;\n          path.add(part);\n          start = i + 1;\n        }\n      }\n      String last = s.substring(start);\n      if (!isPalindrome(last)) valid = false;\n      path.add(last);\n      if (valid) answer.add(path);\n    }\n    return answer;\n  }\n\n  private boolean isPalindrome(String s) {\n    for (int l = 0, r = s.length() - 1; l \u003c r; l++, r--) if (s.charAt(l) != s.charAt(r)) return false;\n    return true;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> partition(String s) {\n    boolean[][] pal = buildTable(s);\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, new ArrayList\u003c>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == s.length()) { answer.add(state.path); continue; }\n      for (int end = s.length() - 1; end >= state.index; end--) {\n        if (!pal[state.index][end]) continue;\n        List\u003cString> next = new ArrayList\u003c>(state.path);\n        next.add(s.substring(state.index, end + 1));\n        stack.push(new State(end + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len \u003c= n; len++) for (int l = 0; l + len - 1 \u003c n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len \u003c= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n\n  private static class State { int index; List\u003cString> path; State(int index, List\u003cString> path){this.index=index;this.path=path;} }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> partition(String s) {\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    boolean[][] pal = buildTable(s);\n    backtrack(s, 0, pal, new ArrayList\u003c>(), answer);\n    return answer;\n  }\n\n  private void backtrack(String s, int index, boolean[][] pal, List\u003cString> path, List\u003cList\u003cString>> answer) {\n    if (index == s.length()) { answer.add(new ArrayList\u003c>(path)); return; }\n    for (int end = index; end \u003c s.length(); end++) {\n      if (!pal[index][end]) continue;\n      path.add(s.substring(index, end + 1));\n      backtrack(s, end + 1, pal, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len \u003c= n; len++) for (int l = 0; l + len - 1 \u003c n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len \u003c= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> partition(String s) {\n    boolean[][] pal = buildTable(s);\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, new ArrayList\u003c>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == s.length()) { answer.add(state.path); continue; }\n      for (int end = s.length() - 1; end >= state.index; end--) {\n        if (!pal[state.index][end]) continue;\n        List\u003cString> next = new ArrayList\u003c>(state.path);\n        next.add(s.substring(state.index, end + 1));\n        stack.push(new State(end + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len \u003c= n; len++) for (int l = 0; l + len - 1 \u003c n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len \u003c= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n\n  private static class State { int index; List\u003cString> path; State(int index, List\u003cString> path){this.index=index;this.path=path;} }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public List\u003cList\u003cString>> partition(String s) {\n    boolean[][] pal = buildTable(s);\n    List\u003cList\u003cString>> answer = new ArrayList\u003c>();\n    Deque\u003cState> stack = new ArrayDeque\u003c>();\n    stack.push(new State(0, new ArrayList\u003c>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == s.length()) { answer.add(state.path); continue; }\n      for (int end = s.length() - 1; end >= state.index; end--) {\n        if (!pal[state.index][end]) continue;\n        List\u003cString> next = new ArrayList\u003c>(state.path);\n        next.add(s.substring(state.index, end + 1));\n        stack.push(new State(end + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len \u003c= n; len++) for (int l = 0; l + len - 1 \u003c n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len \u003c= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n\n  private static class State { int index; List\u003cString> path; State(int index, List\u003cString> path){this.index=index;this.path=path;} }\n}"
      }
    ]
  },
  "dynamic-programming": {
    "id": "dynamic-programming",
    "name": "Dynamic Programming Revision",
    "summary": "Pure recursion, memoization, tabulation, and space optimization for repeated-state problems.",
    "checklist": [
      "Find the state variables.",
      "Write the transition from smaller states.",
      "Start with pure recursion, then memoize.",
      "Convert memoization to tabulation when iteration order is clear.",
      "Space-optimize only after tabulation is correct."
    ],
    "mistakes": [
      "Memoizing with an incomplete state key.",
      "Wrong base case for empty prefix or amount 0.",
      "Reusing the same item twice in 0/1 DP.",
      "Iterating capacity in the wrong direction.",
      "Applying greedy when overlapping subproblems exist."
    ],
    "edgeCases": [
      "n = 0, amount = 0, impossible target, empty string, empty array, and all values equal."
    ],
    "complexities": [
      "Pure recursion is usually exponential.",
      "Memoization reduces repeated states to number of unique states.",
      "Tabulation has the same state count without recursion stack.",
      "Space optimization removes dimensions that only depend on previous rows or values."
    ],
    "mentalModel": [
      "DP is recursion plus memory.",
      "State must contain everything future decisions need.",
      "Transition chooses from smaller solved states.",
      "Base cases anchor the table.",
      "Space optimization preserves only needed history."
    ],
    "revisionStrategy": [
      "Redo Fibonacci, Climbing Stairs, and House Robber first.",
      "Then Coin Change, Knapsack, and Partition.",
      "Finish with LCS, LIS, and Edit Distance."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Fibonacci",
        "difficulty": "Easy",
        "subpattern": "Base case and recurrence recursion",
        "question": "Given n, return the nth Fibonacci number where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2).",
        "trigger": "The definition directly depends on smaller values of the same function and has clear base cases for n = 0 and n = 1.",
        "intuition": "Stop at the base cases. For larger n, combine the two previous answers; memoization removes repeated branches.",
        "edgeCases": "n = 0, n = 1, small n = 2, maximum n, repeated subproblems in naive recursion.",
        "constraints": "0 \u003c= n \u003c= 30 in the original problem; use int for the original range.",
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
        "iterativeCode": "class Solution {\n  public int fib(int n) {\n    if (n \u003c= 1) return n;\n\n    int prev = 0;\n    int curr = 1;\n    for (int i = 2; i \u003c= n; i++) {\n      int next = prev + curr;\n      prev = curr;\n      curr = next;\n    }\n\n    return curr;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int fib(int n) {\n    int[] memo = new int[n + 1];\n    Arrays.fill(memo, -1);\n    return dfs(n, memo);\n  }\n\n  private int dfs(int n, int[] memo) {\n    if (n \u003c= 1) return n;\n    if (memo[n] != -1) return memo[n];\n    memo[n] = dfs(n - 1, memo) + dfs(n - 2, memo);\n    return memo[n];\n  }\n}",
        "optimizedCode": "class Solution {\n  public int fib(int n) {\n    if (n \u003c= 1) return n;\n\n    int prev = 0;\n    int curr = 1;\n    for (int i = 2; i \u003c= n; i++) {\n      int next = prev + curr;\n      prev = curr;\n      curr = next;\n    }\n\n    return curr;\n  }\n}",
        "code": "class Solution {\n  public int fib(int n) {\n    if (n \u003c= 1) return n;\n\n    int prev = 0;\n    int curr = 1;\n    for (int i = 2; i \u003c= n; i++) {\n      int next = prev + curr;\n      prev = curr;\n      curr = next;\n    }\n\n    return curr;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Climbing Stairs",
        "difficulty": "Easy",
        "subpattern": "Fibonacci-style linear recurrence",
        "question": "Given n stairs, you can climb either 1 or 2 steps at a time. Return the number of distinct ways to reach the top.",
        "trigger": "Ways to reach step i depend only on the previous two step counts: i - 1 and i - 2.",
        "intuition": "The final move is either one step from i - 1 or two steps from i - 2, so add both counts.",
        "edgeCases": "n = 1, n = 2, small base cases, large n where naive recursion repeats states.",
        "constraints": "1 \u003c= n \u003c= 45.",
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
            "explanation": "Only one single-step climb is possible."
          }
        ],
        "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion recomputes the same step counts many times.",
        "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps only the previous two counts.",
        "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes each step count once.",
        "bruteForceCode": "class Solution {\n  public int climbStairs(int n) {\n    return countWays(0, n);\n  }\n\n  private int countWays(int step, int target) {\n    if (step == target) return 1;\n    if (step > target) return 0;\n\n    int oneStep = countWays(step + 1, target);\n    int twoSteps = countWays(step + 2, target);\n    return oneStep + twoSteps;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int climbStairs(int n) {\n    if (n \u003c= 2) return n;\n\n    int twoBack = 1;\n    int oneBack = 2;\n    for (int step = 3; step \u003c= n; step++) {\n      int current = oneBack + twoBack;\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int climbStairs(int n) {\n    int[] memo = new int[n + 1];\n    return ways(n, memo);\n  }\n\n  private int ways(int step, int[] memo) {\n    if (step \u003c= 2) return step;\n    if (memo[step] != 0) return memo[step];\n    memo[step] = ways(step - 1, memo) + ways(step - 2, memo);\n    return memo[step];\n  }\n}",
        "optimizedCode": "class Solution {\n  public int climbStairs(int n) {\n    if (n \u003c= 2) return n;\n\n    int twoBack = 1;\n    int oneBack = 2;\n    for (int step = 3; step \u003c= n; step++) {\n      int current = oneBack + twoBack;\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
        "code": "class Solution {\n  public int climbStairs(int n) {\n    if (n \u003c= 2) return n;\n\n    int twoBack = 1;\n    int oneBack = 2;\n    for (int step = 3; step \u003c= n; step++) {\n      int current = oneBack + twoBack;\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}"
      },
      {
        "group": "core",
        "name": "House Robber",
        "difficulty": "Medium",
        "subpattern": "Take-or-skip recurrence on a line",
        "question": "Given money in houses along a street, return the maximum amount you can rob without robbing adjacent houses.",
        "trigger": "At each house, the decision is take it and skip the previous house, or skip it and keep the previous best.",
        "intuition": "best[i] = max(best[i - 1], best[i - 2] + nums[i]).",
        "edgeCases": "Empty array if allowed, one house, two houses, all zeros, alternating high values.",
        "constraints": "1 \u003c= nums.length \u003c= 100; 0 \u003c= nums[i] \u003c= 400.",
        "source": {
          "label": "House Robber - LeetCode 198",
          "url": "https://leetcode.com/problems/house-robber/"
        },
        "examples": [
          {
            "input": "nums = [1,2,3,1]",
            "output": "4",
            "explanation": "Rob houses with values 1 and 3."
          },
          {
            "input": "nums = [2,7,9,3,1]",
            "output": "12",
            "explanation": "Rob 2, 9, and 1."
          },
          {
            "input": "nums = [5]",
            "output": "5",
            "explanation": "Only one house is available."
          }
        ],
        "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion branches on rob or skip.",
        "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps take/skip best values.",
        "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes each starting index once.",
        "bruteForceCode": "class Solution {\n  public int rob(int[] nums) {\n    return choose(nums, 0);\n  }\n\n  private int choose(int[] nums, int index) {\n    if (index >= nums.length) return 0;\n    int take = nums[index] + choose(nums, index + 2);\n    int skip = choose(nums, index + 1);\n    return Math.max(take, skip);\n  }\n}",
        "iterativeCode": "class Solution {\n  public int rob(int[] nums) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int money : nums) {\n      int current = Math.max(oneBack, twoBack + money);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int rob(int[] nums) {\n    int[] memo = new int[nums.length];\n    Arrays.fill(memo, -1);\n    return dp(nums, 0, memo);\n  }\n\n  private int dp(int[] nums, int index, int[] memo) {\n    if (index >= nums.length) return 0;\n    if (memo[index] != -1) return memo[index];\n    int take = nums[index] + dp(nums, index + 2, memo);\n    int skip = dp(nums, index + 1, memo);\n    memo[index] = Math.max(take, skip);\n    return memo[index];\n  }\n}",
        "optimizedCode": "class Solution {\n  public int rob(int[] nums) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int money : nums) {\n      int current = Math.max(oneBack, twoBack + money);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
        "code": "class Solution {\n  public int rob(int[] nums) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int money : nums) {\n      int current = Math.max(oneBack, twoBack + money);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Coin Change",
        "difficulty": "Medium",
        "subpattern": "Unbounded knapsack minimum coins",
        "question": "Given coin denominations and an amount, return the fewest number of coins needed to make that amount, or -1 if impossible.",
        "trigger": "The best answer for amount x can reuse any coin and depends on best answers for x - coin.",
        "intuition": "For each amount, try taking one last coin and minimize 1 + dp[amount - coin].",
        "edgeCases": "Amount zero, impossible amount, coin greater than amount, coin value one, duplicate denominations.",
        "constraints": "1 \u003c= coins.length \u003c= 12; 1 \u003c= coins[i] \u003c= 2^31 - 1; 0 \u003c= amount \u003c= 10000.",
        "source": {
          "label": "Coin Change - LeetCode 322",
          "url": "https://leetcode.com/problems/coin-change/"
        },
        "examples": [
          {
            "input": "coins = [1,2,5], amount = 11",
            "output": "3",
            "explanation": "11 = 5 + 5 + 1."
          },
          {
            "input": "coins = [2], amount = 3",
            "output": "-1",
            "explanation": "No combination of 2-value coins makes 3."
          },
          {
            "input": "coins = [1], amount = 0",
            "output": "0",
            "explanation": "No coins are needed for amount zero."
          }
        ],
        "bruteForceComplexity": "Time O(coins^amount) in the worst case; Space O(amount). Plain recursion tries every coin at every remaining amount.",
        "optimizedComplexity": "Time O(amount * coins.length); Space O(amount). Bottom-up DP computes minimum coins for every amount.",
        "recursiveComplexity": "Time O(amount * coins.length); Space O(amount). Memoized recursion solves each remaining amount once.",
        "bruteForceCode": "class Solution {\n  public int coinChange(int[] coins, int amount) {\n    int answer = search(coins, amount);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int search(int[] coins, int amount) {\n    if (amount == 0) return 0;\n    if (amount \u003c 0) return 1_000_000;\n    int best = 1_000_000;\n    for (int coin : coins) {\n      best = Math.min(best, 1 + search(coins, amount - coin));\n    }\n    return best;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value \u003c= amount; value++) {\n      for (int coin : coins) {\n        if (coin \u003c= value) {\n          dp[value] = Math.min(dp[value], dp[value - coin] + 1);\n        }\n      }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] memo = new int[amount + 1];\n    Arrays.fill(memo, -2);\n    int answer = dp(coins, amount, memo);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int dp(int[] coins, int amount, int[] memo) {\n    if (amount == 0) return 0;\n    if (amount \u003c 0) return 1_000_000;\n    if (memo[amount] != -2) return memo[amount];\n    int best = 1_000_000;\n    for (int coin : coins) best = Math.min(best, 1 + dp(coins, amount - coin, memo));\n    memo[amount] = best;\n    return best;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value \u003c= amount; value++) {\n      for (int coin : coins) {\n        if (coin \u003c= value) {\n          dp[value] = Math.min(dp[value], dp[value - coin] + 1);\n        }\n      }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value \u003c= amount; value++) {\n      for (int coin : coins) {\n        if (coin \u003c= value) {\n          dp[value] = Math.min(dp[value], dp[value - coin] + 1);\n        }\n      }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "0/1 Knapsack",
        "difficulty": "Medium",
        "subpattern": "Pick/skip DP",
        "question": "Given weights, values, and capacity, return the maximum value that can be taken when each item can be used at most once.",
        "trigger": "Each item has a binary choice: take it once or skip it.",
        "intuition": "State is item index and remaining capacity. Memoization removes repeated subproblems; tabulation builds them bottom-up.",
        "edgeCases": "Capacity 0, item heavier than capacity, all items fit, no items, and duplicate weights.",
        "constraints": "weights.length == values.length. Each item can be chosen at most once.",
        "bruteForceComplexity": "Time O(2^n), Space O(n).",
        "optimizedComplexity": "Time O(n * capacity), Space O(capacity).",
        "recursiveComplexity": "Time O(n * capacity), Space O(n * capacity).",
        "examples": [
          {
            "input": "weights = [1, 3, 4, 5], values = [1, 4, 5, 7], capacity = 7",
            "output": "9",
            "explanation": "Items with weights 3 and 4 give value 9."
          }
        ],
        "bruteForceCode": "class Solution {\n  public int knapsack(int[] weights, int[] values, int capacity) {\n    return choose(weights, values, 0, capacity);\n  }\n\n  private int choose(int[] weights, int[] values, int index, int capacity) {\n    if (index == weights.length || capacity == 0) {\n      return 0;\n    }\n\n    int skip = choose(weights, values, index + 1, capacity);\n    int take = 0;\n    if (weights[index] \u003c= capacity) {\n      take = values[index] + choose(weights, values, index + 1, capacity - weights[index]);\n    }\n\n    return Math.max(skip, take);\n  }\n}",
        "iterativeCode": "class Solution {\n  public int knapsack(int[] weights, int[] values, int capacity) {\n    int[] dp = new int[capacity + 1];\n\n    for (int i = 0; i \u003c weights.length; i++) {\n      for (int cap = capacity; cap >= weights[i]; cap--) {\n        dp[cap] = Math.max(dp[cap], values[i] + dp[cap - weights[i]]);\n      }\n    }\n\n    return dp[capacity];\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int knapsack(int[] weights, int[] values, int capacity) {\n    int[][] memo = new int[weights.length][capacity + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return solve(weights, values, 0, capacity, memo);\n  }\n\n  private int solve(int[] weights, int[] values, int index, int capacity, int[][] memo) {\n    if (index == weights.length || capacity == 0) {\n      return 0;\n    }\n    if (memo[index][capacity] != -1) {\n      return memo[index][capacity];\n    }\n\n    int skip = solve(weights, values, index + 1, capacity, memo);\n    int take = 0;\n    if (weights[index] \u003c= capacity) {\n      take = values[index] + solve(weights, values, index + 1, capacity - weights[index], memo);\n    }\n\n    memo[index][capacity] = Math.max(skip, take);\n    return memo[index][capacity];\n  }\n}"
      },
      {
        "group": "core",
        "name": "Longest Common Subsequence",
        "difficulty": "Medium",
        "subpattern": "Two-string subsequence DP",
        "question": "Given two strings, return the length of their longest common subsequence.",
        "trigger": "The choice at two indexes depends on whether the current characters match or one side is skipped.",
        "intuition": "If characters match, take 1 plus the diagonal state; otherwise take the better skip from either string.",
        "edgeCases": "One empty string, no shared characters, identical strings, repeated characters, different lengths.",
        "constraints": "1 \u003c= text1.length, text2.length \u003c= 1000; strings contain lowercase English letters.",
        "source": {
          "label": "Longest Common Subsequence - LeetCode 1143",
          "url": "https://leetcode.com/problems/longest-common-subsequence/"
        },
        "examples": [
          {
            "input": "text1 = \"abcde\", text2 = \"ace\"",
            "output": "3",
            "explanation": "ace is a common subsequence."
          },
          {
            "input": "text1 = \"abc\", text2 = \"abc\"",
            "output": "3",
            "explanation": "The full string is common."
          },
          {
            "input": "text1 = \"abc\", text2 = \"def\"",
            "output": "0",
            "explanation": "There are no common characters."
          }
        ],
        "bruteForceComplexity": "Time O(2^(m+n)); Space O(m+n). Plain recursion branches by skipping one character.",
        "optimizedComplexity": "Time O(mn); Space O(n). Rolling row DP stores LCS lengths for the second string.",
        "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion computes each pair of indexes once.",
        "bruteForceCode": "class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    return lcs(text1, text2, 0, 0);\n  }\n\n  private int lcs(String a, String b, int i, int j) {\n    if (i == a.length() || j == b.length()) return 0;\n    if (a.charAt(i) == b.charAt(j)) return 1 + lcs(a, b, i + 1, j + 1);\n    return Math.max(lcs(a, b, i + 1, j), lcs(a, b, i, j + 1));\n  }\n}",
        "iterativeCode": "class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[] dp = new int[text2.length() + 1];\n\n    for (int i = 1; i \u003c= text1.length(); i++) {\n      int diagonal = 0;\n      for (int j = 1; j \u003c= text2.length(); j++) {\n        int saved = dp[j];\n        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n          dp[j] = diagonal + 1;\n        } else {\n          dp[j] = Math.max(dp[j], dp[j - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[text2.length()];\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[][] memo = new int[text1.length()][text2.length()];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(text1, text2, 0, 0, memo);\n  }\n\n  private int dp(String a, String b, int i, int j, int[][] memo) {\n    if (i == a.length() || j == b.length()) return 0;\n    if (memo[i][j] != -1) return memo[i][j];\n    if (a.charAt(i) == b.charAt(j)) memo[i][j] = 1 + dp(a, b, i + 1, j + 1, memo);\n    else memo[i][j] = Math.max(dp(a, b, i + 1, j, memo), dp(a, b, i, j + 1, memo));\n    return memo[i][j];\n  }\n}",
        "optimizedCode": "class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[] dp = new int[text2.length() + 1];\n\n    for (int i = 1; i \u003c= text1.length(); i++) {\n      int diagonal = 0;\n      for (int j = 1; j \u003c= text2.length(); j++) {\n        int saved = dp[j];\n        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n          dp[j] = diagonal + 1;\n        } else {\n          dp[j] = Math.max(dp[j], dp[j - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[text2.length()];\n  }\n}",
        "code": "class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[] dp = new int[text2.length() + 1];\n\n    for (int i = 1; i \u003c= text1.length(); i++) {\n      int diagonal = 0;\n      for (int j = 1; j \u003c= text2.length(); j++) {\n        int saved = dp[j];\n        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n          dp[j] = diagonal + 1;\n        } else {\n          dp[j] = Math.max(dp[j], dp[j - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[text2.length()];\n  }\n}"
      },
      {
        "group": "core",
        "name": "Longest Increasing Subsequence",
        "difficulty": "Medium",
        "subpattern": "Longest increasing subsequence DP and patience sorting",
        "question": "Given an integer array, return the length of the longest strictly increasing subsequence.",
        "trigger": "The best subsequence ending at i depends on previous smaller values, and can be optimized with sorted tails.",
        "intuition": "Maintain tails[len] as the smallest possible tail value for an increasing subsequence of length len + 1.",
        "edgeCases": "Strictly increasing, strictly decreasing, duplicates, one element, negative numbers.",
        "constraints": "1 \u003c= nums.length \u003c= 2500; -10000 \u003c= nums[i] \u003c= 10000.",
        "source": {
          "label": "Longest Increasing Subsequence - LeetCode 300",
          "url": "https://leetcode.com/problems/longest-increasing-subsequence/"
        },
        "examples": [
          {
            "input": "nums = [10,9,2,5,3,7,101,18]",
            "output": "4",
            "explanation": "One LIS is 2,3,7,101."
          },
          {
            "input": "nums = [0,1,0,3,2,3]",
            "output": "4",
            "explanation": "One LIS is 0,1,2,3."
          },
          {
            "input": "nums = [7,7,7,7]",
            "output": "1",
            "explanation": "Strict increase does not allow equal values."
          }
        ],
        "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion tries taking or skipping each element.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Patience sorting tails use binary search.",
        "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoized recursion tracks index and previous index.",
        "bruteForceCode": "class Solution {\n  public int lengthOfLIS(int[] nums) {\n    return choose(nums, 0, Integer.MIN_VALUE);\n  }\n\n  private int choose(int[] nums, int index, int previous) {\n    if (index == nums.length) return 0;\n    int skip = choose(nums, index + 1, previous);\n    int take = nums[index] > previous ? 1 + choose(nums, index + 1, nums[index]) : 0;\n    return Math.max(take, skip);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n\n    for (int num : nums) {\n      int index = Arrays.binarySearch(tails, 0, size, num);\n      if (index \u003c 0) index = -index - 1;\n      tails[index] = num;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[][] memo = new int[nums.length][nums.length + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(nums, 0, -1, memo);\n  }\n\n  private int dp(int[] nums, int index, int previous, int[][] memo) {\n    if (index == nums.length) return 0;\n    if (memo[index][previous + 1] != -1) return memo[index][previous + 1];\n    int skip = dp(nums, index + 1, previous, memo);\n    int take = previous == -1 || nums[index] > nums[previous]\n        ? 1 + dp(nums, index + 1, index, memo)\n        : 0;\n    memo[index][previous + 1] = Math.max(take, skip);\n    return memo[index][previous + 1];\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n\n    for (int num : nums) {\n      int index = Arrays.binarySearch(tails, 0, size, num);\n      if (index \u003c 0) index = -index - 1;\n      tails[index] = num;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n\n    for (int num : nums) {\n      int index = Arrays.binarySearch(tails, 0, size, num);\n      if (index \u003c 0) index = -index - 1;\n      tails[index] = num;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Edit Distance",
        "difficulty": "Medium",
        "subpattern": "Edit-distance operation DP",
        "question": "Given two words, return the minimum number of insert, delete, and replace operations needed to convert word1 into word2.",
        "trigger": "At every pair of indexes, the optimal edit sequence either matches characters or pays for one of three operations.",
        "intuition": "If characters differ, choose the cheapest of insert, delete, or replace plus one operation.",
        "edgeCases": "One empty string, identical strings, completely different strings, repeated characters, large length mismatch.",
        "constraints": "0 \u003c= word1.length, word2.length \u003c= 500; words contain lowercase English letters.",
        "source": {
          "label": "Edit Distance - LeetCode 72",
          "url": "https://leetcode.com/problems/edit-distance/"
        },
        "examples": [
          {
            "input": "word1 = \"horse\", word2 = \"ros\"",
            "output": "3",
            "explanation": "horse -> rorse -> rose -> ros."
          },
          {
            "input": "word1 = \"intention\", word2 = \"execution\"",
            "output": "5",
            "explanation": "Five edits are required in an optimal sequence."
          },
          {
            "input": "word1 = \"\", word2 = \"abc\"",
            "output": "3",
            "explanation": "Insert all three characters."
          }
        ],
        "bruteForceComplexity": "Time O(3^(m+n)); Space O(m+n). Plain recursion branches on insert, delete, and replace.",
        "optimizedComplexity": "Time O(mn); Space O(n). Rolling DP keeps previous row and current row values.",
        "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion solves each index pair once.",
        "bruteForceCode": "class Solution {\n  public int minDistance(String word1, String word2) {\n    return edit(word1, word2, 0, 0);\n  }\n\n  private int edit(String a, String b, int i, int j) {\n    if (i == a.length()) return b.length() - j;\n    if (j == b.length()) return a.length() - i;\n    if (a.charAt(i) == b.charAt(j)) return edit(a, b, i + 1, j + 1);\n\n    int insert = edit(a, b, i, j + 1);\n    int delete = edit(a, b, i + 1, j);\n    int replace = edit(a, b, i + 1, j + 1);\n    return 1 + Math.min(insert, Math.min(delete, replace));\n  }\n}",
        "iterativeCode": "class Solution {\n  public int minDistance(String word1, String word2) {\n    int m = word1.length();\n    int n = word2.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j \u003c= n; j++) dp[j] = j;\n\n    for (int i = 1; i \u003c= m; i++) {\n      int diagonal = dp[0];\n      dp[0] = i;\n      for (int j = 1; j \u003c= n; j++) {\n        int saved = dp[j];\n        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n          dp[j] = diagonal;\n        } else {\n          dp[j] = 1 + Math.min(diagonal, Math.min(dp[j], dp[j - 1]));\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minDistance(String word1, String word2) {\n    int[][] memo = new int[word1.length()][word2.length()];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(word1, word2, 0, 0, memo);\n  }\n\n  private int dp(String a, String b, int i, int j, int[][] memo) {\n    if (i == a.length()) return b.length() - j;\n    if (j == b.length()) return a.length() - i;\n    if (memo[i][j] != -1) return memo[i][j];\n    if (a.charAt(i) == b.charAt(j)) memo[i][j] = dp(a, b, i + 1, j + 1, memo);\n    else memo[i][j] = 1 + Math.min(dp(a, b, i, j + 1, memo), Math.min(dp(a, b, i + 1, j, memo), dp(a, b, i + 1, j + 1, memo)));\n    return memo[i][j];\n  }\n}",
        "optimizedCode": "class Solution {\n  public int minDistance(String word1, String word2) {\n    int m = word1.length();\n    int n = word2.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j \u003c= n; j++) dp[j] = j;\n\n    for (int i = 1; i \u003c= m; i++) {\n      int diagonal = dp[0];\n      dp[0] = i;\n      for (int j = 1; j \u003c= n; j++) {\n        int saved = dp[j];\n        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n          dp[j] = diagonal;\n        } else {\n          dp[j] = 1 + Math.min(diagonal, Math.min(dp[j], dp[j - 1]));\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}",
        "code": "class Solution {\n  public int minDistance(String word1, String word2) {\n    int m = word1.length();\n    int n = word2.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j \u003c= n; j++) dp[j] = j;\n\n    for (int i = 1; i \u003c= m; i++) {\n      int diagonal = dp[0];\n      dp[0] = i;\n      for (int j = 1; j \u003c= n; j++) {\n        int saved = dp[j];\n        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n          dp[j] = diagonal;\n        } else {\n          dp[j] = 1 + Math.min(diagonal, Math.min(dp[j], dp[j - 1]));\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}"
      },
      {
        "group": "advanced",
        "name": "Partition Equal Subset Sum",
        "difficulty": "Medium",
        "subpattern": "2D knapsack partition DP",
        "question": "Given nums, return true if the array can be split into two subsets with equal sum.",
        "trigger": "Equal partition exists exactly when a subset can reach total sum / 2.",
        "intuition": "This is a 0/1 knapsack reachability table over index and target sum.",
        "edgeCases": "Odd total sum, single element, target zero, duplicate numbers, exact half reached early.",
        "constraints": "1 \u003c= nums.length \u003c= 200; 1 \u003c= nums[i] \u003c= 100.",
        "source": {
          "label": "Partition Equal Subset Sum - LeetCode 416",
          "url": "https://leetcode.com/problems/partition-equal-subset-sum/"
        },
        "examples": [
          {
            "input": "nums = [1,5,11,5]",
            "output": "true",
            "explanation": "One subset can sum to 11."
          },
          {
            "input": "nums = [1,2,3,5]",
            "output": "false",
            "explanation": "No subset reaches half of 11 because the total is odd."
          },
          {
            "input": "nums = [2,2,3,5]",
            "output": "false",
            "explanation": "The target is 6, but no subset sums to 6."
          }
        ],
        "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion includes or excludes each number.",
        "optimizedComplexity": "Time O(n * target); Space O(target). Descending 0/1 subset DP avoids reusing a number.",
        "recursiveComplexity": "Time O(n * target); Space O(n * target). Memoization stores index and remaining target.",
        "bruteForceCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n    return search(nums, 0, total / 2);\n  }\n\n  private boolean search(int[] nums, int index, int target) {\n    if (target == 0) return true;\n    if (index == nums.length || target \u003c 0) return false;\n    return search(nums, index + 1, target) || search(nums, index + 1, target - nums[index]);\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n\n    int target = total / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n\n    for (int num : nums) {\n      for (int sum = target; sum >= num; sum--) {\n        dp[sum] |= dp[sum - num];\n      }\n    }\n    return dp[target];\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n    Boolean[][] memo = new Boolean[nums.length][total / 2 + 1];\n    return dp(nums, 0, total / 2, memo);\n  }\n\n  private boolean dp(int[] nums, int index, int target, Boolean[][] memo) {\n    if (target == 0) return true;\n    if (index == nums.length || target \u003c 0) return false;\n    if (memo[index][target] != null) return memo[index][target];\n    boolean skip = dp(nums, index + 1, target, memo);\n    boolean take = target >= nums[index] && dp(nums, index + 1, target - nums[index], memo);\n    memo[index][target] = skip || take;\n    return memo[index][target];\n  }\n}",
        "optimizedCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n\n    int target = total / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n\n    for (int num : nums) {\n      for (int sum = target; sum >= num; sum--) {\n        dp[sum] |= dp[sum - num];\n      }\n    }\n    return dp[target];\n  }\n}",
        "code": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n\n    int target = total / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n\n    for (int num : nums) {\n      for (int sum = target; sum >= num; sum--) {\n        dp[sum] |= dp[sum - num];\n      }\n    }\n    return dp[target];\n  }\n}"
      }
    ]
  },
  "greedy": {
    "id": "greedy",
    "name": "Greedy Revision",
    "summary": "Local choices with proof by earliest finish, farthest reach, balance, and interval merging.",
    "checklist": [
      "Look for a choice that never hurts future options.",
      "Sort when the local choice depends on order.",
      "Track the best reachable boundary for jump problems.",
      "Use total feasibility plus running balance for gas station.",
      "Merge intervals after sorting by start."
    ],
    "mistakes": [
      "Using greedy without proving the local choice.",
      "Sorting by the wrong key.",
      "Resetting state too late in Gas Station.",
      "Not merging touching intervals when required.",
      "Confusing Meeting Rooms I and II."
    ],
    "edgeCases": [
      "Empty intervals, one interval, fully overlapping intervals, impossible jump, total gas equals cost, and touching boundaries."
    ],
    "complexities": [
      "Sorting greedy problems are usually O(n log n).",
      "One-pass reach/balance problems are O(n).",
      "Greedy space is often O(1) excluding output.",
      "Interval output can require O(n) space."
    ],
    "mentalModel": [
      "Sort to expose the safe local choice.",
      "Keep only the frontier needed for the next decision.",
      "When a prefix fails, restart after it.",
      "Greedy answers need an exchange argument.",
      "If future dependencies are complex, suspect DP instead."
    ],
    "revisionStrategy": [
      "Practice Activity Selection and Meeting Rooms first.",
      "Then Jump Game and Gas Station.",
      "Finish with Merge Intervals."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Activity Selection",
        "difficulty": "Medium",
        "subpattern": "Earliest finishing greedy",
        "question": "Given start and end times of activities, return the maximum number of non-overlapping activities that can be selected.",
        "trigger": "Choosing the activity that finishes earliest leaves the most room for future activities.",
        "intuition": "Sort by end time and pick the next activity whose start is not before the last selected end.",
        "edgeCases": "Empty input, same end times, touching intervals, fully overlapping intervals, and unsorted input.",
        "constraints": "start.length == end.length. An activity can start when the previous one ends.",
        "bruteForceComplexity": "Time O(2^n), Space O(n).",
        "optimizedComplexity": "Time O(n log n), Space O(n) for sorted activities.",
        "recursiveComplexity": "Time O(n log n), Space O(n) including recursion stack.",
        "examples": [
          {
            "input": "start = [1, 3, 0, 5, 8, 5], end = [2, 4, 6, 7, 9, 9]",
            "output": "4",
            "explanation": "Activities (1,2), (3,4), (5,7), and (8,9) can be selected."
          }
        ],
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maxActivities(int[] start, int[] end) {\n    int[][] activities = new int[start.length][2];\n    for (int i = 0; i \u003c start.length; i++) {\n      activities[i] = new int[] {start[i], end[i]};\n    }\n    Arrays.sort(activities, Comparator.comparingInt(a -> a[0]));\n    return choose(activities, 0, Integer.MIN_VALUE);\n  }\n\n  private int choose(int[][] activities, int index, int lastEnd) {\n    if (index == activities.length) {\n      return 0;\n    }\n\n    int skip = choose(activities, index + 1, lastEnd);\n    int take = 0;\n    if (activities[index][0] >= lastEnd) {\n      take = 1 + choose(activities, index + 1, activities[index][1]);\n    }\n\n    return Math.max(skip, take);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxActivities(int[] start, int[] end) {\n    int[][] activities = new int[start.length][2];\n    for (int i = 0; i \u003c start.length; i++) {\n      activities[i] = new int[] {start[i], end[i]};\n    }\n    Arrays.sort(activities, Comparator.comparingInt(a -> a[1]));\n\n    int count = 0;\n    int lastEnd = Integer.MIN_VALUE;\n    for (int[] activity : activities) {\n      if (activity[0] >= lastEnd) {\n        count++;\n        lastEnd = activity[1];\n      }\n    }\n    return count;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxActivities(int[] start, int[] end) {\n    int[][] activities = new int[start.length][2];\n    for (int i = 0; i \u003c start.length; i++) {\n      activities[i] = new int[] {start[i], end[i]};\n    }\n    Arrays.sort(activities, Comparator.comparingInt(a -> a[1]));\n    return select(activities, 0, Integer.MIN_VALUE);\n  }\n\n  private int select(int[][] activities, int index, int lastEnd) {\n    if (index == activities.length) {\n      return 0;\n    }\n    if (activities[index][0] >= lastEnd) {\n      return 1 + select(activities, index + 1, activities[index][1]);\n    }\n    return select(activities, index + 1, lastEnd);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Meeting Rooms",
        "difficulty": "Easy",
        "subpattern": "Pairwise overlap detection",
        "question": "Given meeting intervals, return true if one person can attend all meetings without time overlap.",
        "trigger": "A conflict exists exactly when two sorted adjacent meetings overlap.",
        "intuition": "Sort by start time and compare each start with the previous end.",
        "edgeCases": "No meetings, one meeting, meetings touching at endpoints, unsorted input, duplicate intervals.",
        "constraints": "0 \u003c= intervals.length \u003c= 10000; 0 \u003c= start \u003c end \u003c= 1000000.",
        "source": {
          "label": "Meeting Rooms - LeetCode 252",
          "url": "https://leetcode.com/problems/meeting-rooms/"
        },
        "examples": [
          {
            "input": "intervals = [[0,30],[5,10],[15,20]]",
            "output": "false",
            "explanation": "[0,30] overlaps the other meetings."
          },
          {
            "input": "intervals = [[7,10],[2,4]]",
            "output": "true",
            "explanation": "The meetings do not overlap after sorting."
          },
          {
            "input": "intervals = [[1,5],[5,8]]",
            "output": "true",
            "explanation": "Ending at the next start is allowed."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(1). Compare every pair of intervals for overlap.",
        "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Only adjacent sorted intervals need checking.",
        "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive adjacent scan after sorting.",
        "bruteForceCode": "class Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    for (int i = 0; i \u003c intervals.length; i++) {\n      for (int j = i + 1; j \u003c intervals.length; j++) {\n        if (intervals[i][0] \u003c intervals[j][1] && intervals[j][0] \u003c intervals[i][1]) return false;\n      }\n    }\n    return true;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i \u003c intervals.length; i++) {\n      if (intervals[i][0] \u003c intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    return check(intervals, 1);\n  }\n\n  private boolean check(int[][] intervals, int index) {\n    if (index == intervals.length) return true;\n    if (intervals[index][0] \u003c intervals[index - 1][1]) return false;\n    return check(intervals, index + 1);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i \u003c intervals.length; i++) {\n      if (intervals[i][0] \u003c intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i \u003c intervals.length; i++) {\n      if (intervals[i][0] \u003c intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Jump Game",
        "difficulty": "Medium",
        "subpattern": "Reachability frontier greedy",
        "question": "Given nums where nums[i] is the maximum jump length from index i, return true if the last index is reachable from index 0.",
        "trigger": "Only the farthest reachable index matters; every index up to that frontier is already reachable.",
        "intuition": "Scan left to right while the current index is reachable, and expand the farthest frontier.",
        "edgeCases": "Single element, zero at start, zero inside reachable range, large jump over zeros, frontier exactly reaches last index.",
        "constraints": "1 \u003c= nums.length \u003c= 10000; 0 \u003c= nums[i] \u003c= 100000.",
        "source": {
          "label": "Jump Game - LeetCode 55",
          "url": "https://leetcode.com/problems/jump-game/"
        },
        "examples": [
          {
            "input": "nums = [2,3,1,1,4]",
            "output": "true",
            "explanation": "The frontier reaches the final index."
          },
          {
            "input": "nums = [3,2,1,0,4]",
            "output": "false",
            "explanation": "The frontier stops at index 3."
          },
          {
            "input": "nums = [0]",
            "output": "true",
            "explanation": "The start is already the end."
          }
        ],
        "bruteForceComplexity": "Time O(2^n) in dense jump ranges; Space O(n). Try every jump length recursively.",
        "optimizedComplexity": "Time O(n); Space O(1). Maintain the farthest reachable index.",
        "recursiveComplexity": "Time O(n^2); Space O(n). Memoized recursion checks each index and possible jump once.",
        "bruteForceCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    return jump(nums, 0);\n  }\n\n  private boolean jump(int[] nums, int index) {\n    if (index >= nums.length - 1) return true;\n    for (int step = 1; step \u003c= nums[index]; step++) {\n      if (jump(nums, index + step)) return true;\n    }\n    return false;\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    Boolean[] memo = new Boolean[nums.length];\n    return canReach(nums, 0, memo);\n  }\n\n  private boolean canReach(int[] nums, int index, Boolean[] memo) {\n    if (index >= nums.length - 1) return true;\n    if (memo[index] != null) return memo[index];\n    int limit = Math.min(nums.length - 1, index + nums[index]);\n    for (int next = index + 1; next \u003c= limit; next++) {\n      if (canReach(nums, next, memo)) return memo[index] = true;\n    }\n    memo[index] = false;\n    return false;\n  }\n}",
        "optimizedCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}",
        "code": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i \u003c nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Gas Station",
        "difficulty": "Medium",
        "subpattern": "Reset-on-negative surplus greedy",
        "question": "Given gas and cost arrays around a circular route, return the starting station index that can complete the circuit, or -1 if impossible.",
        "trigger": "If the tank becomes negative at station i, no station between the current start and i can be a valid start.",
        "intuition": "Track total surplus for existence and reset the candidate start whenever the running tank drops below zero.",
        "edgeCases": "Total gas less than total cost, exact zero total surplus, one station, reset near end, multiple valid-looking starts.",
        "constraints": "gas.length == cost.length; 1 \u003c= n \u003c= 100000; 0 \u003c= gas[i], cost[i] \u003c= 10000.",
        "source": {
          "label": "Gas Station - LeetCode 134",
          "url": "https://leetcode.com/problems/gas-station/"
        },
        "examples": [
          {
            "input": "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
            "output": "3",
            "explanation": "Starting at station 3 completes the circuit."
          },
          {
            "input": "gas = [2,3,4], cost = [3,4,3]",
            "output": "-1",
            "explanation": "Total gas is less than total cost."
          },
          {
            "input": "gas = [5], cost = [4]",
            "output": "0",
            "explanation": "The single station has enough gas."
          }
        ],
        "bruteForceComplexity": "Time O(n^2); Space O(1). Simulate a full circuit from every possible start.",
        "optimizedComplexity": "Time O(n); Space O(1). One pass tracks total surplus and the current candidate start.",
        "recursiveComplexity": "Time O(n); Space O(n). Recursive scan applies the same reset rule.",
        "bruteForceCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int n = gas.length;\n    for (int start = 0; start \u003c n; start++) {\n      int tank = 0;\n      boolean ok = true;\n      for (int step = 0; step \u003c n; step++) {\n        int station = (start + step) % n;\n        tank += gas[station] - cost[station];\n        if (tank \u003c 0) {\n          ok = false;\n          break;\n        }\n      }\n      if (ok) return start;\n    }\n    return -1;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0;\n    int tank = 0;\n    int start = 0;\n\n    for (int i = 0; i \u003c gas.length; i++) {\n      int diff = gas[i] - cost[i];\n      total += diff;\n      tank += diff;\n      if (tank \u003c 0) {\n        start = i + 1;\n        tank = 0;\n      }\n    }\n    return total >= 0 ? start : -1;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int[] result = scan(gas, cost, 0, 0, 0, 0);\n    return result[0] >= 0 ? result[2] : -1;\n  }\n\n  private int[] scan(int[] gas, int[] cost, int index, int total, int tank, int start) {\n    if (index == gas.length) return new int[] {total, tank, start};\n    int diff = gas[index] - cost[index];\n    if (tank + diff \u003c 0) {\n      return scan(gas, cost, index + 1, total + diff, 0, index + 1);\n    }\n    return scan(gas, cost, index + 1, total + diff, tank + diff, start);\n  }\n}",
        "optimizedCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0;\n    int tank = 0;\n    int start = 0;\n\n    for (int i = 0; i \u003c gas.length; i++) {\n      int diff = gas[i] - cost[i];\n      total += diff;\n      tank += diff;\n      if (tank \u003c 0) {\n        start = i + 1;\n        tank = 0;\n      }\n    }\n    return total >= 0 ? start : -1;\n  }\n}",
        "code": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0;\n    int tank = 0;\n    int start = 0;\n\n    for (int i = 0; i \u003c gas.length; i++) {\n      int diff = gas[i] - cost[i];\n      total += diff;\n      tank += diff;\n      if (tank \u003c 0) {\n        start = i + 1;\n        tank = 0;\n      }\n    }\n    return total >= 0 ? start : -1;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Merge Intervals",
        "difficulty": "Medium",
        "subpattern": "Sorted interval merge greedy",
        "question": "Given intervals, merge all overlapping intervals and return the non-overlapping result.",
        "trigger": "After sorting by start, only the current merged interval can overlap the next interval.",
        "intuition": "Maintain the last merged interval; extend it when the next interval overlaps, otherwise start a new one.",
        "edgeCases": "Empty-like not allowed, one interval, touching intervals, nested intervals, unsorted input.",
        "constraints": "1 \u003c= intervals.length \u003c= 10000; 0 \u003c= start \u003c= end \u003c= 10000.",
        "source": {
          "label": "Merge Intervals - LeetCode 56",
          "url": "https://leetcode.com/problems/merge-intervals/"
        },
        "examples": [
          {
            "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            "output": "[[1,6],[8,10],[15,18]]",
            "explanation": "[1,3] and [2,6] overlap."
          },
          {
            "input": "intervals = [[1,4],[4,5]]",
            "output": "[[1,5]]",
            "explanation": "Touching endpoints merge."
          },
          {
            "input": "intervals = [[1,4],[0,2],[3,5]]",
            "output": "[[0,5]]",
            "explanation": "All intervals connect after sorting."
          }
        ],
        "bruteForceComplexity": "Time O(n^3) worst case; Space O(n). Repeatedly search for any overlapping pair and merge it.",
        "optimizedComplexity": "Time O(n log n); Space O(n). Sort by start and scan once.",
        "recursiveComplexity": "Time O(n log n); Space O(n). Recursive scan appends or extends the last merged interval.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    List\u003cint[]> list = new ArrayList\u003c>();\n    for (int[] interval : intervals) list.add(interval.clone());\n    boolean changed = true;\n\n    while (changed) {\n      changed = false;\n      outer:\n      for (int i = 0; i \u003c list.size(); i++) {\n        for (int j = i + 1; j \u003c list.size(); j++) {\n          int[] a = list.get(i);\n          int[] b = list.get(j);\n          if (a[0] \u003c= b[1] && b[0] \u003c= a[1]) {\n            list.set(i, new int[] {Math.min(a[0], b[0]), Math.max(a[1], b[1])});\n            list.remove(j);\n            changed = true;\n            break outer;\n          }\n        }\n      }\n    }\n    return list.toArray(new int[list.size()][]);\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List\u003cint[]> merged = new ArrayList\u003c>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List\u003cint[]> merged = new ArrayList\u003c>();\n    scan(intervals, 0, merged);\n    return merged.toArray(new int[merged.size()][]);\n  }\n\n  private void scan(int[][] intervals, int index, List\u003cint[]> merged) {\n    if (index == intervals.length) return;\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c intervals[index][0]) {\n      merged.add(intervals[index].clone());\n    } else {\n      int[] last = merged.get(merged.size() - 1);\n      last[1] = Math.max(last[1], intervals[index][1]);\n    }\n    scan(intervals, index + 1, merged);\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List\u003cint[]> merged = new ArrayList\u003c>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List\u003cint[]> merged = new ArrayList\u003c>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] \u003c interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}"
      }
    ]
  },
  "trie": {
    "id": "trie",
    "name": "Trie Revision",
    "summary": "Prefix tree insert, exact search, prefix search, and grid word search with trie pruning.",
    "checklist": [
      "Use a trie when many words share prefixes.",
      "Each edge represents one character.",
      "Mark terminal nodes to distinguish full words from prefixes.",
      "For startsWith, terminal flag is not required.",
      "For Word Search II, prune board DFS using trie edges."
    ],
    "mistakes": [
      "Returning true for search when only a prefix exists.",
      "Forgetting to create missing child nodes on insert.",
      "Not restoring visited board cells.",
      "Adding the same word multiple times in Word Search II.",
      "Assuming only lowercase letters when input differs."
    ],
    "edgeCases": [
      "Empty word where allowed, prefix only, duplicate words, one-cell board, and no matching word."
    ],
    "complexities": [
      "Trie insert/search/startsWith are O(L).",
      "Trie space is O(total characters).",
      "Word Search II is exponential in path length but pruned by prefixes.",
      "Recursive trie operations add O(L) stack."
    ],
    "mentalModel": [
      "Trie nodes are shared prefixes.",
      "Search needs terminal marker.",
      "startsWith only needs the path to exist.",
      "DFS plus trie cuts dead branches.",
      "Remove found words or null them to avoid duplicates."
    ],
    "revisionStrategy": [
      "Master Insert, Search, and StartsWith together.",
      "Then solve Word Search II."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Insert",
        "difficulty": "Medium",
        "subpattern": "Basic prefix trie insert/search/startsWith",
        "question": "Design a trie that supports inserting words, searching complete words, and checking whether any word starts with a given prefix.",
        "trigger": "Multiple prefix queries over the same dictionary need shared prefix nodes instead of repeated string scans.",
        "intuition": "Store one edge per character; a terminal flag separates complete words from prefixes.",
        "edgeCases": "Empty trie, prefix that is not a word, word that extends an existing word, duplicate insert, missing child.",
        "constraints": "1 \u003c= word.length, prefix.length \u003c= 2000; calls contain lowercase English letters; at most 30000 operations.",
        "source": {
          "label": "Implement Trie Prefix Tree - LeetCode 208",
          "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
        },
        "examples": [
          {
            "input": "insert(\"apple\"), search(\"apple\"), search(\"app\"), startsWith(\"app\")",
            "output": "true, false, true",
            "explanation": "app is only a prefix until it is inserted."
          },
          {
            "input": "insert(\"app\"), search(\"app\")",
            "output": "true",
            "explanation": "The terminal flag is set on the app node."
          },
          {
            "input": "startsWith(\"banana\") on empty trie",
            "output": "false",
            "explanation": "The first character path is missing."
          }
        ],
        "bruteForceComplexity": "Time insert O(1), search O(nL), startsWith O(nL); Space O(nL). A list scans stored words per query.",
        "optimizedComplexity": "Time O(L) per operation; Space O(total characters). Each character moves one trie edge.",
        "recursiveComplexity": "Time O(L) per operation; Space O(L) call stack. Recursive helpers process one character per call.",
        "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final List\u003cString> words = new ArrayList\u003c>();\n\n  public void insert(String word) {\n    words.add(word);\n  }\n\n  public boolean search(String word) {\n    for (String current : words) {\n      if (current.equals(word)) return true;\n    }\n    return false;\n  }\n\n  public boolean startsWith(String prefix) {\n    for (String current : words) {\n      if (current.startsWith(prefix)) return true;\n    }\n    return false;\n  }\n}",
        "iterativeCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
        "recursiveCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    insert(root, word, 0);\n  }\n\n  public boolean search(String word) {\n    Node node = find(root, word, 0);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(root, prefix, 0) != null;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private Node find(Node node, String text, int index) {\n    if (node == null || index == text.length()) return node;\n    return find(node.next[text.charAt(index) - 'a'], text, index + 1);\n  }\n}",
        "optimizedCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
        "code": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Search",
        "difficulty": "Medium",
        "subpattern": "Basic prefix trie insert/search/startsWith",
        "question": "Design a trie that supports inserting words, searching complete words, and checking whether any word starts with a given prefix.",
        "trigger": "Multiple prefix queries over the same dictionary need shared prefix nodes instead of repeated string scans.",
        "intuition": "Store one edge per character; a terminal flag separates complete words from prefixes.",
        "edgeCases": "Empty trie, prefix that is not a word, word that extends an existing word, duplicate insert, missing child.",
        "constraints": "1 \u003c= word.length, prefix.length \u003c= 2000; calls contain lowercase English letters; at most 30000 operations.",
        "source": {
          "label": "Implement Trie Prefix Tree - LeetCode 208",
          "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
        },
        "examples": [
          {
            "input": "insert(\"apple\"), search(\"apple\"), search(\"app\"), startsWith(\"app\")",
            "output": "true, false, true",
            "explanation": "app is only a prefix until it is inserted."
          },
          {
            "input": "insert(\"app\"), search(\"app\")",
            "output": "true",
            "explanation": "The terminal flag is set on the app node."
          },
          {
            "input": "startsWith(\"banana\") on empty trie",
            "output": "false",
            "explanation": "The first character path is missing."
          }
        ],
        "bruteForceComplexity": "Time insert O(1), search O(nL), startsWith O(nL); Space O(nL). A list scans stored words per query.",
        "optimizedComplexity": "Time O(L) per operation; Space O(total characters). Each character moves one trie edge.",
        "recursiveComplexity": "Time O(L) per operation; Space O(L) call stack. Recursive helpers process one character per call.",
        "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final List\u003cString> words = new ArrayList\u003c>();\n\n  public void insert(String word) {\n    words.add(word);\n  }\n\n  public boolean search(String word) {\n    for (String current : words) {\n      if (current.equals(word)) return true;\n    }\n    return false;\n  }\n\n  public boolean startsWith(String prefix) {\n    for (String current : words) {\n      if (current.startsWith(prefix)) return true;\n    }\n    return false;\n  }\n}",
        "iterativeCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
        "recursiveCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    insert(root, word, 0);\n  }\n\n  public boolean search(String word) {\n    Node node = find(root, word, 0);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(root, prefix, 0) != null;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private Node find(Node node, String text, int index) {\n    if (node == null || index == text.length()) return node;\n    return find(node.next[text.charAt(index) - 'a'], text, index + 1);\n  }\n}",
        "optimizedCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
        "code": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}"
      },
      {
        "group": "core",
        "name": "StartsWith",
        "difficulty": "Medium",
        "subpattern": "Basic prefix trie insert/search/startsWith",
        "question": "Design a trie that supports inserting words, searching complete words, and checking whether any word starts with a given prefix.",
        "trigger": "Multiple prefix queries over the same dictionary need shared prefix nodes instead of repeated string scans.",
        "intuition": "Store one edge per character; a terminal flag separates complete words from prefixes.",
        "edgeCases": "Empty trie, prefix that is not a word, word that extends an existing word, duplicate insert, missing child.",
        "constraints": "1 \u003c= word.length, prefix.length \u003c= 2000; calls contain lowercase English letters; at most 30000 operations.",
        "source": {
          "label": "Implement Trie Prefix Tree - LeetCode 208",
          "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
        },
        "examples": [
          {
            "input": "insert(\"apple\"), search(\"apple\"), search(\"app\"), startsWith(\"app\")",
            "output": "true, false, true",
            "explanation": "app is only a prefix until it is inserted."
          },
          {
            "input": "insert(\"app\"), search(\"app\")",
            "output": "true",
            "explanation": "The terminal flag is set on the app node."
          },
          {
            "input": "startsWith(\"banana\") on empty trie",
            "output": "false",
            "explanation": "The first character path is missing."
          }
        ],
        "bruteForceComplexity": "Time insert O(1), search O(nL), startsWith O(nL); Space O(nL). A list scans stored words per query.",
        "optimizedComplexity": "Time O(L) per operation; Space O(total characters). Each character moves one trie edge.",
        "recursiveComplexity": "Time O(L) per operation; Space O(L) call stack. Recursive helpers process one character per call.",
        "bruteForceCode": "import java.util.*;\n\nclass Trie {\n  private final List\u003cString> words = new ArrayList\u003c>();\n\n  public void insert(String word) {\n    words.add(word);\n  }\n\n  public boolean search(String word) {\n    for (String current : words) {\n      if (current.equals(word)) return true;\n    }\n    return false;\n  }\n\n  public boolean startsWith(String prefix) {\n    for (String current : words) {\n      if (current.startsWith(prefix)) return true;\n    }\n    return false;\n  }\n}",
        "iterativeCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
        "recursiveCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    insert(root, word, 0);\n  }\n\n  public boolean search(String word) {\n    Node node = find(root, word, 0);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(root, prefix, 0) != null;\n  }\n\n  private void insert(Node node, String word, int index) {\n    if (index == word.length()) {\n      node.word = true;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1);\n  }\n\n  private Node find(Node node, String text, int index) {\n    if (node == null || index == text.length()) return node;\n    return find(node.next[text.charAt(index) - 'a'], text, index + 1);\n  }\n}",
        "optimizedCode": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}",
        "code": "class Trie {\n  private static class Node {\n    Node[] next = new Node[26];\n    boolean word;\n  }\n\n  private final Node root = new Node();\n\n  public void insert(String word) {\n    Node node = root;\n    for (char ch : word.toCharArray()) {\n      int index = ch - 'a';\n      if (node.next[index] == null) node.next[index] = new Node();\n      node = node.next[index];\n    }\n    node.word = true;\n  }\n\n  public boolean search(String word) {\n    Node node = find(word);\n    return node != null && node.word;\n  }\n\n  public boolean startsWith(String prefix) {\n    return find(prefix) != null;\n  }\n\n  private Node find(String text) {\n    Node node = root;\n    for (char ch : text.toCharArray()) {\n      node = node.next[ch - 'a'];\n      if (node == null) return null;\n    }\n    return node;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Word Search II",
        "difficulty": "Hard",
        "subpattern": "Grid search with trie pruning",
        "question": "Given a board of letters and a list of words, return every word that can be formed by adjacent horizontal or vertical cells without reusing a cell.",
        "trigger": "Many word searches share prefixes, so one trie-guided traversal prunes impossible board paths early.",
        "intuition": "Build a trie of words, DFS from each cell, and stop a path as soon as its prefix is not in the trie.",
        "edgeCases": "Empty result, duplicate words, same board cell cannot repeat, one-cell word, overlapping words, long shared prefixes.",
        "constraints": "1 \u003c= board rows, cols \u003c= 12; 1 \u003c= words.length \u003c= 30000; words contain lowercase English letters.",
        "source": {
          "label": "Word Search II - LeetCode 212",
          "url": "https://leetcode.com/problems/word-search-ii/"
        },
        "examples": [
          {
            "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
            "output": "[\"oath\",\"eat\"]",
            "explanation": "Only oath and eat can be formed on valid adjacent paths."
          },
          {
            "input": "board = [[\"a\",\"b\"],[\"c\",\"d\"]], words = [\"abcb\"]",
            "output": "[]",
            "explanation": "The path would need to reuse b."
          },
          {
            "input": "board = [[\"a\"]], words = [\"a\"]",
            "output": "[\"a\"]",
            "explanation": "The single cell forms the word."
          }
        ],
        "bruteForceComplexity": "Time O(W * mn * 4^L); Space O(L). Each word is searched on the board independently.",
        "optimizedComplexity": "Time O(mn * 4^L) with prefix pruning; Space O(total word characters). Trie nodes cut dead paths early.",
        "recursiveComplexity": "Time O(mn * 4^L) with trie pruning; Space O(total word characters + L) including recursion stack.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List\u003cString> findWords(char[][] board, String[] words) {\n    List\u003cString> answer = new ArrayList\u003c>();\n    for (String word : words) {\n      if (exists(board, word)) answer.add(word);\n    }\n    return answer;\n  }\n\n  private boolean exists(char[][] board, String word) {\n    for (int r = 0; r \u003c board.length; r++) {\n      for (int c = 0; c \u003c board[0].length; c++) {\n        if (search(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean search(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r \u003c 0 || c \u003c 0 || r == board.length || c == board[0].length) return false;\n    if (board[r][c] != word.charAt(index)) return false;\n\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = search(board, word, r + 1, c, index + 1)\n        || search(board, word, r - 1, c, index + 1)\n        || search(board, word, r, c + 1, index + 1)\n        || search(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
        "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List\u003cString> findWords(char[][] board, String[] words) {\n    Node root = build(words);\n    Set\u003cString> found = new LinkedHashSet\u003c>();\n    for (int r = 0; r \u003c board.length; r++) {\n      for (int c = 0; c \u003c board[0].length; c++) {\n        collect(board, r, c, root, found);\n      }\n    }\n    return new ArrayList\u003c>(found);\n  }\n\n  private Node build(String[] words) {\n    Node root = new Node();\n    for (String word : words) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int index = ch - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = word;\n    }\n    return root;\n  }\n\n  private void collect(char[][] board, int r, int c, Node node, Set\u003cString> found) {\n    if (r \u003c 0 || c \u003c 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) found.add(next.word);\n    board[r][c] = '#';\n    collect(board, r + 1, c, next, found);\n    collect(board, r - 1, c, next, found);\n    collect(board, r, c + 1, next, found);\n    collect(board, r, c - 1, next, found);\n    board[r][c] = ch;\n  }\n}",
        "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List\u003cString> findWords(char[][] board, String[] words) {\n    Node root = new Node();\n    insertAll(root, words, 0);\n    List\u003cString> answer = new ArrayList\u003c>();\n    for (int r = 0; r \u003c board.length; r++) {\n      for (int c = 0; c \u003c board[0].length; c++) {\n        dfs(board, r, c, root, answer);\n      }\n    }\n    return answer;\n  }\n\n  private void insertAll(Node root, String[] words, int index) {\n    if (index == words.length) return;\n    insert(root, words[index], 0, words[index]);\n    insertAll(root, words, index + 1);\n  }\n\n  private void insert(Node node, String word, int index, String full) {\n    if (index == word.length()) {\n      node.word = full;\n      return;\n    }\n    int child = word.charAt(index) - 'a';\n    if (node.next[child] == null) node.next[child] = new Node();\n    insert(node.next[child], word, index + 1, full);\n  }\n\n  private void dfs(char[][] board, int r, int c, Node node, List\u003cString> answer) {\n    if (r \u003c 0 || c \u003c 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) {\n      answer.add(next.word);\n      next.word = null;\n    }\n    board[r][c] = '#';\n    dfs(board, r + 1, c, next, answer);\n    dfs(board, r - 1, c, next, answer);\n    dfs(board, r, c + 1, next, answer);\n    dfs(board, r, c - 1, next, answer);\n    board[r][c] = ch;\n  }\n}",
        "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List\u003cString> findWords(char[][] board, String[] words) {\n    Node root = build(words);\n    Set\u003cString> found = new LinkedHashSet\u003c>();\n    for (int r = 0; r \u003c board.length; r++) {\n      for (int c = 0; c \u003c board[0].length; c++) {\n        collect(board, r, c, root, found);\n      }\n    }\n    return new ArrayList\u003c>(found);\n  }\n\n  private Node build(String[] words) {\n    Node root = new Node();\n    for (String word : words) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int index = ch - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = word;\n    }\n    return root;\n  }\n\n  private void collect(char[][] board, int r, int c, Node node, Set\u003cString> found) {\n    if (r \u003c 0 || c \u003c 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) found.add(next.word);\n    board[r][c] = '#';\n    collect(board, r + 1, c, next, found);\n    collect(board, r - 1, c, next, found);\n    collect(board, r, c + 1, next, found);\n    collect(board, r, c - 1, next, found);\n    board[r][c] = ch;\n  }\n}",
        "code": "import java.util.*;\n\nclass Solution {\n  private static class Node {\n    Node[] next = new Node[26];\n    String word;\n  }\n\n  public List\u003cString> findWords(char[][] board, String[] words) {\n    Node root = build(words);\n    Set\u003cString> found = new LinkedHashSet\u003c>();\n    for (int r = 0; r \u003c board.length; r++) {\n      for (int c = 0; c \u003c board[0].length; c++) {\n        collect(board, r, c, root, found);\n      }\n    }\n    return new ArrayList\u003c>(found);\n  }\n\n  private Node build(String[] words) {\n    Node root = new Node();\n    for (String word : words) {\n      Node node = root;\n      for (char ch : word.toCharArray()) {\n        int index = ch - 'a';\n        if (node.next[index] == null) node.next[index] = new Node();\n        node = node.next[index];\n      }\n      node.word = word;\n    }\n    return root;\n  }\n\n  private void collect(char[][] board, int r, int c, Node node, Set\u003cString> found) {\n    if (r \u003c 0 || c \u003c 0 || r == board.length || c == board[0].length) return;\n    char ch = board[r][c];\n    if (ch == '#' || node.next[ch - 'a'] == null) return;\n\n    Node next = node.next[ch - 'a'];\n    if (next.word != null) found.add(next.word);\n    board[r][c] = '#';\n    collect(board, r + 1, c, next, found);\n    collect(board, r - 1, c, next, found);\n    collect(board, r, c + 1, next, found);\n    collect(board, r, c - 1, next, found);\n    board[r][c] = ch;\n  }\n}"
      }
    ]
  },
  "bit-manipulation": {
    "id": "bit-manipulation",
    "name": "Bit Manipulation Revision",
    "summary": "Parity bits, set-bit counting, powers of two, XOR cancellation, missing values, and prefix XOR tricks.",
    "checklist": [
      "Use n & 1 for parity.",
      "Use n & (n - 1) to remove the lowest set bit.",
      "Use XOR when pairs cancel.",
      "Use prefix XOR for range XOR.",
      "Check positive n before power-of-two tests."
    ],
    "mistakes": [
      "Treating 0 as a power of two.",
      "Forgetting negative number behavior in bit tests.",
      "Using addition where XOR cancellation is intended.",
      "Looping 32 times when Kernighan's method is enough.",
      "Missing off-by-one in missing-number XOR."
    ],
    "edgeCases": [
      "0, 1, negative numbers, Integer.MIN_VALUE, Integer.MAX_VALUE, duplicate pairs, and single-element arrays."
    ],
    "complexities": [
      "Most direct bit operations are O(1).",
      "Counting set bits with Kernighan is O(number of set bits).",
      "XOR array scans are O(n) time and O(1) space.",
      "Recursive bit methods add stack proportional to bit removals."
    ],
    "mentalModel": [
      "Bits are independent boolean flags.",
      "XOR cancels equal pairs.",
      "n & -n isolates the lowest set bit.",
      "n & (n - 1) removes the lowest set bit.",
      "Pattern repetition often appears modulo 2 or 4."
    ],
    "revisionStrategy": [
      "Practice Check Odd/Even, Count Set Bits, and Power of Two.",
      "Then Single Number and Missing Number.",
      "Finish with XOR Tricks."
    ],
    "problems": [
      {
        "group": "core",
        "name": "Check Odd/Even",
        "difficulty": "Easy",
        "subpattern": "Least significant bit test",
        "question": "Given an integer n, return true when n is odd and false when n is even.",
        "trigger": "The least significant bit is 1 for odd numbers and 0 for even numbers.",
        "intuition": "n & 1 isolates the parity bit.",
        "edgeCases": "Zero, one, negative numbers, Integer.MIN_VALUE, and Integer.MAX_VALUE.",
        "constraints": "n can be any int.",
        "bruteForceComplexity": "Time O(1), Space O(1).",
        "optimizedComplexity": "Time O(1), Space O(1).",
        "recursiveComplexity": "Time O(log |n|), Space O(log |n|) for repeated subtraction by two.",
        "examples": [
          {
            "input": "n = 7",
            "output": "true",
            "explanation": "7 has least significant bit 1."
          }
        ],
        "bruteForceCode": "class Solution {\n  public boolean isOdd(int n) {\n    return n % 2 != 0;\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean isOdd(int n) {\n    return (n & 1) == 1;\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean isOdd(int n) {\n    if (n == 0) {\n      return false;\n    }\n    if (n == 1 || n == -1) {\n      return true;\n    }\n    return isOdd(n > 0 ? n - 2 : n + 2);\n  }\n}"
      },
      {
        "group": "core",
        "name": "Count Set Bits",
        "difficulty": "Easy",
        "subpattern": "Brian Kernighan set-bit counting",
        "question": "Given a 32-bit integer n, return the number of set bits in its binary representation.",
        "trigger": "The operation n & (n - 1) removes the lowest set bit each time.",
        "intuition": "Repeatedly clear one set bit and count how many clears are needed.",
        "edgeCases": "n is zero, n is negative, only sign bit set, all bits set, one set bit.",
        "constraints": "Input is treated as a 32-bit signed integer; return the count of 1 bits in its binary representation.",
        "source": {
          "label": "Number of 1 Bits - LeetCode 191",
          "url": "https://leetcode.com/problems/number-of-1-bits/"
        },
        "examples": [
          {
            "input": "n = 00000000000000000000000000001011",
            "output": "3",
            "explanation": "Three bits are set."
          },
          {
            "input": "n = 00000000000000000000000010000000",
            "output": "1",
            "explanation": "Only one bit is set."
          },
          {
            "input": "n = 11111111111111111111111111111101",
            "output": "31",
            "explanation": "All but one bit are set."
          }
        ],
        "bruteForceComplexity": "Time O(32); Space O(1). Check every bit position.",
        "optimizedComplexity": "Time O(number of set bits); Space O(1). Kernighan clears one set bit per loop.",
        "recursiveComplexity": "Time O(number of set bits); Space O(number of set bits). Recursive Kernighan clearing.",
        "bruteForceCode": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    for (int bit = 0; bit \u003c 32; bit++) {\n      count += (n >>> bit) & 1;\n    }\n    return count;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n      n &= n - 1;\n      count++;\n    }\n    return count;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int hammingWeight(int n) {\n    return count(n, 0);\n  }\n\n  private int count(int value, int total) {\n    if (value == 0) return total;\n    return count(value & (value - 1), total + 1);\n  }\n}",
        "optimizedCode": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n      n &= n - 1;\n      count++;\n    }\n    return count;\n  }\n}",
        "code": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n      n &= n - 1;\n      count++;\n    }\n    return count;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Power of Two",
        "difficulty": "Easy",
        "subpattern": "Single set-bit power test",
        "question": "Given an integer n, return true if it is a power of two.",
        "trigger": "A positive power of two has exactly one set bit.",
        "intuition": "For positive n, n & (n - 1) clears the only set bit only when n is a power of two.",
        "edgeCases": "n is zero, n is negative, n is one, maximum power of two, odd non-one numbers.",
        "constraints": "-2^31 \u003c= n \u003c= 2^31 - 1.",
        "source": {
          "label": "Power of Two - LeetCode 231",
          "url": "https://leetcode.com/problems/power-of-two/"
        },
        "examples": [
          {
            "input": "n = 1",
            "output": "true",
            "explanation": "2^0 equals 1."
          },
          {
            "input": "n = 16",
            "output": "true",
            "explanation": "16 has one set bit."
          },
          {
            "input": "n = 3",
            "output": "false",
            "explanation": "3 has two set bits."
          }
        ],
        "bruteForceComplexity": "Time O(log n); Space O(1). Repeatedly divide by two.",
        "optimizedComplexity": "Time O(1); Space O(1). One bit trick checks the set-bit count.",
        "recursiveComplexity": "Time O(log n); Space O(log n). Recursive divisibility by two.",
        "bruteForceCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n \u003c= 0) return false;\n    while (n % 2 == 0) {\n      n /= 2;\n    }\n    return n == 1;\n  }\n}",
        "iterativeCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n \u003c= 0) {\n      return false;\n    }\n    return (n & (n - 1)) == 0;\n  }\n}",
        "recursiveCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n == 1) return true;\n    if (n \u003c= 0 || n % 2 != 0) {\n      return false;\n    }\n    return isPowerOfTwo(n / 2);\n  }\n}",
        "optimizedCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n \u003c= 0) {\n      return false;\n    }\n    return (n & (n - 1)) == 0;\n  }\n}",
        "code": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n \u003c= 0) {\n      return false;\n    }\n    return (n & (n - 1)) == 0;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Single Number",
        "difficulty": "Easy",
        "subpattern": "XOR pair cancellation",
        "question": "Given a non-empty integer array where every element appears twice except one, return the element that appears once.",
        "trigger": "Pairs cancel under XOR because x ^ x = 0 and 0 ^ x = x.",
        "intuition": "XOR every value; all duplicate pairs vanish and only the unique value remains.",
        "edgeCases": "Single element, unique value is zero, negative values, duplicates adjacent or scattered, large array.",
        "constraints": "1 \u003c= nums.length \u003c= 30000; -30000 \u003c= nums[i] \u003c= 30000; exactly one value appears once and all others appear twice.",
        "source": {
          "label": "Single Number - LeetCode 136",
          "url": "https://leetcode.com/problems/single-number/"
        },
        "examples": [
          {
            "input": "nums = [2,2,1]",
            "output": "1",
            "explanation": "The pair 2 cancels under XOR."
          },
          {
            "input": "nums = [4,1,2,1,2]",
            "output": "4",
            "explanation": "All duplicated values cancel, leaving 4."
          },
          {
            "input": "nums = [1]",
            "output": "1",
            "explanation": "The only element is the single number."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(n). Count frequencies with a hash map.",
        "optimizedComplexity": "Time O(n); Space O(1). XOR cancellation keeps one integer state.",
        "recursiveComplexity": "Time O(n); Space O(n). Recursive XOR folds the array with call-stack depth n.",
        "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int singleNumber(int[] nums) {\n    Map\u003cInteger, Integer> count = new HashMap\u003c>();\n    for (int num : nums) count.put(num, count.getOrDefault(num, 0) + 1);\n    for (int num : nums) {\n      if (count.get(num) == 1) return num;\n    }\n    return 0;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    int answer = 0;\n    for (int num : nums) {\n      answer ^= num;\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    return xor(nums, 0, 0);\n  }\n\n  private int xor(int[] nums, int index, int value) {\n    if (index == nums.length) return value;\n    return xor(nums, index + 1, value ^ nums[index]);\n  }\n}",
        "optimizedCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    int answer = 0;\n    for (int num : nums) {\n      answer ^= num;\n    }\n    return answer;\n  }\n}",
        "code": "class Solution {\n  public int singleNumber(int[] nums) {\n    int answer = 0;\n    for (int num : nums) {\n      answer ^= num;\n    }\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "Missing Number",
        "difficulty": "Easy",
        "subpattern": "XOR missing-number cancellation",
        "question": "Given nums containing n distinct numbers from the range [0, n], return the only number missing from the array.",
        "trigger": "XORing all indexes and values cancels every present number, leaving the missing number.",
        "intuition": "Start with n, then XOR each index and nums[index].",
        "edgeCases": "Missing zero, missing n, n equals one, unsorted input, array contains zero.",
        "constraints": "1 \u003c= nums.length \u003c= 10000; 0 \u003c= nums[i] \u003c= n; all values are unique.",
        "source": {
          "label": "Missing Number - LeetCode 268",
          "url": "https://leetcode.com/problems/missing-number/"
        },
        "examples": [
          {
            "input": "nums = [3,0,1]",
            "output": "2",
            "explanation": "2 is absent from 0..3."
          },
          {
            "input": "nums = [0,1]",
            "output": "2",
            "explanation": "n itself is missing."
          },
          {
            "input": "nums = [9,6,4,2,3,5,7,0,1]",
            "output": "8",
            "explanation": "8 is the only missing value."
          }
        ],
        "bruteForceComplexity": "Time O(n); Space O(n). Mark present values in a boolean array.",
        "optimizedComplexity": "Time O(n); Space O(1). XOR indexes and values to cancel present numbers.",
        "recursiveComplexity": "Time O(n); Space O(n). Recursive XOR fold uses call-stack depth n.",
        "bruteForceCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    boolean[] seen = new boolean[nums.length + 1];\n    for (int num : nums) seen[num] = true;\n    for (int value = 0; value \u003c seen.length; value++) {\n      if (!seen[value]) return value;\n    }\n    return -1;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    int answer = nums.length;\n    for (int i = 0; i \u003c nums.length; i++) {\n      answer ^= i;\n      answer ^= nums[i];\n    }\n    return answer;\n  }\n}",
        "recursiveCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    return fold(nums, 0, nums.length);\n  }\n\n  private int fold(int[] nums, int index, int value) {\n    if (index == nums.length) return value;\n    return fold(nums, index + 1, value ^ index ^ nums[index]);\n  }\n}",
        "optimizedCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    int answer = nums.length;\n    for (int i = 0; i \u003c nums.length; i++) {\n      answer ^= i;\n      answer ^= nums[i];\n    }\n    return answer;\n  }\n}",
        "code": "class Solution {\n  public int missingNumber(int[] nums) {\n    int answer = nums.length;\n    for (int i = 0; i \u003c nums.length; i++) {\n      answer ^= i;\n      answer ^= nums[i];\n    }\n    return answer;\n  }\n}"
      },
      {
        "group": "core",
        "name": "XOR Tricks",
        "difficulty": "Medium",
        "subpattern": "Prefix XOR cancellation",
        "question": "Given left and right, return the XOR of every integer in the inclusive range [left, right].",
        "trigger": "XOR over a range can be answered by canceling prefix XORs.",
        "intuition": "xor(left..right) = xor(0..right) ^ xor(0..left - 1). The prefix repeats every 4 numbers.",
        "edgeCases": "left = right, left = 0, range length multiple of 4, and large right.",
        "constraints": "0 \u003c= left \u003c= right.",
        "bruteForceComplexity": "Time O(right - left + 1), Space O(1).",
        "optimizedComplexity": "Time O(1), Space O(1).",
        "recursiveComplexity": "Time O(1), Space O(1).",
        "examples": [
          {
            "input": "left = 3, right = 6",
            "output": "4",
            "explanation": "3 ^ 4 ^ 5 ^ 6 = 4."
          }
        ],
        "bruteForceCode": "class Solution {\n  public int xorRange(int left, int right) {\n    int answer = 0;\n    for (int value = left; value \u003c= right; value++) {\n      answer ^= value;\n    }\n    return answer;\n  }\n}",
        "iterativeCode": "class Solution {\n  public int xorRange(int left, int right) {\n    return prefixXor(right) ^ prefixXor(left - 1);\n  }\n\n  private int prefixXor(int value) {\n    if (value \u003c 0) return 0;\n    switch (value % 4) {\n      case 0: return value;\n      case 1: return 1;\n      case 2: return value + 1;\n      default: return 0;\n    }\n  }\n}",
        "recursiveCode": "class Solution {\n  public int xorRange(int left, int right) {\n    return prefixXor(right) ^ prefixXor(left - 1);\n  }\n\n  private int prefixXor(int value) {\n    if (value \u003c 0) return 0;\n    if (value % 4 == 0) return value;\n    if (value % 4 == 1) return 1;\n    if (value % 4 == 2) return value + 1;\n    return 0;\n  }\n}"
      }
    ]
  }
});
  window.REVISION_SOLUTION_READY = Promise.resolve();
})();
