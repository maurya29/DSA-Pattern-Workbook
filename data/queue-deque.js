const CURRENT_PATTERN = {
  "id": "queue-deque",
  "name": "Queue & Deque",
  "summary": "BFS queues, monotonic deque, circular queues.",
  "complete": true,
  "subpatterns": [
    "Core Queue & Deque recognition",
    "Boundary handling in Queue & Deque",
    "Optimized iterative Queue & Deque",
    "Recursive or DFS-style Queue & Deque",
    "Advanced Queue & Deque variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Implement Queue using Stacks",
      "difficulty": "Easy",
      "subpattern": "Queue simulation with two stacks",
      "question": "Implement a first-in-first-out queue using only two stacks. Support push, pop, peek, and empty operations.",
      "trigger": "A queue removes the oldest item, while a stack exposes the newest item. Two stacks can reverse insertion order to expose the oldest item.",
      "intuition": "Push new values into input stack. For pop/peek, move all values to output stack only when output is empty, so the oldest value becomes the stack top.",
      "edgeCases": "Pop after many pushes, peek without pop, alternating push/pop, empty queue checks, moving elements only when needed.",
      "constraints": "1 <= x <= 9; at most 100 calls are made to push, pop, peek, and empty; pop and peek are called only on non-empty queue.",
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
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n\n  public void push(int x) {\n    Deque<Integer> temp = new ArrayDeque<>();\n    while (!stack.isEmpty()) temp.push(stack.pop());\n    stack.push(x);\n    while (!temp.isEmpty()) stack.push(temp.pop());\n  }\n\n  public int pop() {\n    return stack.pop();\n  }\n\n  public int peek() {\n    return stack.peek();\n  }\n\n  public boolean empty() {\n    return stack.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque<Integer> input = new ArrayDeque<>();\n  private final Deque<Integer> output = new ArrayDeque<>();\n\n  public void push(int x) {\n    input.push(x);\n  }\n\n  public int pop() {\n    moveIfNeeded();\n    return output.pop();\n  }\n\n  public int peek() {\n    moveIfNeeded();\n    return output.peek();\n  }\n\n  public boolean empty() {\n    return input.isEmpty() && output.isEmpty();\n  }\n\n  private void moveIfNeeded() {\n    if (!output.isEmpty()) return;\n    while (!input.isEmpty()) output.push(input.pop());\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n\n  public void push(int x) {\n    stack.push(x);\n  }\n\n  public int pop() {\n    return removeOldest();\n  }\n\n  public int peek() {\n    int value = removeOldest();\n    stack.push(value);\n    return value;\n  }\n\n  public boolean empty() {\n    return stack.isEmpty();\n  }\n\n  private int removeOldest() {\n    int value = stack.pop();\n    if (stack.isEmpty()) return value;\n    int oldest = removeOldest();\n    stack.push(value);\n    return oldest;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque<Integer> input = new ArrayDeque<>();\n  private final Deque<Integer> output = new ArrayDeque<>();\n\n  public void push(int x) {\n    input.push(x);\n  }\n\n  public int pop() {\n    moveIfNeeded();\n    return output.pop();\n  }\n\n  public int peek() {\n    moveIfNeeded();\n    return output.peek();\n  }\n\n  public boolean empty() {\n    return input.isEmpty() && output.isEmpty();\n  }\n\n  private void moveIfNeeded() {\n    if (!output.isEmpty()) return;\n    while (!input.isEmpty()) output.push(input.pop());\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MyQueue {\n  private final Deque<Integer> input = new ArrayDeque<>();\n  private final Deque<Integer> output = new ArrayDeque<>();\n\n  public void push(int x) {\n    input.push(x);\n  }\n\n  public int pop() {\n    moveIfNeeded();\n    return output.pop();\n  }\n\n  public int peek() {\n    moveIfNeeded();\n    return output.peek();\n  }\n\n  public boolean empty() {\n    return input.isEmpty() && output.isEmpty();\n  }\n\n  private void moveIfNeeded() {\n    if (!output.isEmpty()) return;\n    while (!input.isEmpty()) output.push(input.pop());\n  }\n}"
    },
    {
      "group": "core",
      "name": "Implement Stack using Queues",
      "difficulty": "Easy",
      "subpattern": "Stack simulation with queue rotation",
      "question": "Implement a last-in-first-out stack using only queues. Support push, pop, top, and empty operations.",
      "trigger": "A stack removes the newest item, while a queue exposes the oldest item. Rotating the queue after each push can place the newest item at the front.",
      "intuition": "Push x to the queue, then rotate all older elements behind it. The queue front now behaves like the stack top.",
      "edgeCases": "Single item, alternating push/pop, top without pop, empty checks, preserving order after multiple pushes.",
      "constraints": "1 <= x <= 9; at most 100 calls are made to push, pop, top, and empty; pop and top are called only on non-empty stack.",
      "source": {
        "label": "Implement Stack using Queues - LeetCode 225",
        "url": "https://leetcode.com/problems/implement-stack-using-queues/"
      },
      "examples": [
        {
          "input": "push(1), push(2), top(), pop(), empty()",
          "output": "[null,null,2,2,false]",
          "explanation": "The most recently pushed value is returned first."
        },
        {
          "input": "push(5), pop(), empty()",
          "output": "[null,5,true]",
          "explanation": "After popping the only value, the stack is empty."
        },
        {
          "input": "push(1), push(2), push(3), pop(), top()",
          "output": "[null,null,null,3,2]",
          "explanation": "LIFO order is maintained."
        }
      ],
      "bruteForceComplexity": "push Time O(1), pop/top Time O(n); Space O(n). A plain queue can remove the newest only after rotating older values.",
      "optimizedComplexity": "push Time O(n), pop/top/empty Time O(1); Space O(n). Rotating on push keeps the newest value at the front.",
      "recursiveComplexity": "push Time O(1), pop/top Time O(n), Space O(n) recursion stack. Recursion can remove the last queued value.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MyStack {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public void push(int x) {\n    queue.offer(x);\n  }\n\n  public int pop() {\n    for (int i = 0; i < queue.size() - 1; i++) {\n      queue.offer(queue.poll());\n    }\n    return queue.poll();\n  }\n\n  public int top() {\n    int value = pop();\n    queue.offer(value);\n    for (int i = 0; i < queue.size() - 1; i++) queue.offer(queue.poll());\n    return value;\n  }\n\n  public boolean empty() {\n    return queue.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MyStack {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public void push(int x) {\n    queue.offer(x);\n    int rotations = queue.size() - 1;\n    while (rotations-- > 0) {\n      queue.offer(queue.poll());\n    }\n  }\n\n  public int pop() {\n    return queue.poll();\n  }\n\n  public int top() {\n    return queue.peek();\n  }\n\n  public boolean empty() {\n    return queue.isEmpty();\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MyStack {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public void push(int x) {\n    queue.offer(x);\n  }\n\n  public int pop() {\n    return removeNewest(queue.size());\n  }\n\n  public int top() {\n    int value = removeNewest(queue.size());\n    queue.offer(value);\n    rotate(queue.size() - 1);\n    return value;\n  }\n\n  public boolean empty() {\n    return queue.isEmpty();\n  }\n\n  private int removeNewest(int size) {\n    int value = queue.poll();\n    if (size == 1) return value;\n    queue.offer(value);\n    return removeNewest(size - 1);\n  }\n\n  private void rotate(int count) {\n    if (count == 0) return;\n    queue.offer(queue.poll());\n    rotate(count - 1);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MyStack {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public void push(int x) {\n    queue.offer(x);\n    int rotations = queue.size() - 1;\n    while (rotations-- > 0) {\n      queue.offer(queue.poll());\n    }\n  }\n\n  public int pop() {\n    return queue.poll();\n  }\n\n  public int top() {\n    return queue.peek();\n  }\n\n  public boolean empty() {\n    return queue.isEmpty();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MyStack {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public void push(int x) {\n    queue.offer(x);\n    int rotations = queue.size() - 1;\n    while (rotations-- > 0) {\n      queue.offer(queue.poll());\n    }\n  }\n\n  public int pop() {\n    return queue.poll();\n  }\n\n  public int top() {\n    return queue.peek();\n  }\n\n  public boolean empty() {\n    return queue.isEmpty();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Circular Queue",
      "difficulty": "Medium",
      "subpattern": "Fixed-size circular buffer",
      "question": "Design a circular queue with fixed capacity k. Support enQueue, deQueue, Front, Rear, isEmpty, and isFull.",
      "trigger": "A fixed-capacity queue needs O(1) insertion/removal at both logical ends without shifting elements, so indexes must wrap around with modulo arithmetic.",
      "intuition": "Store values in an array. Track front index and current size. The rear index is derived as (front + size - 1) % capacity.",
      "edgeCases": "Capacity one, enqueue into full queue, dequeue from empty queue, wrap-around after removals, front/rear on empty queue.",
      "constraints": "1 <= k <= 1000; 0 <= value <= 1000; at most 3000 calls are made to operations.",
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
      "recursiveComplexity": "Recursive implementation is not useful for circular queues; operations remain O(1) with iterative index updates.",
      "bruteForceCode": "class MyCircularQueue {\n  private final int[] data;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    data[size++] = value;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    for (int i = 1; i < size; i++) data[i - 1] = data[i];\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[0];\n  }\n\n  public int Rear() {\n    return isEmpty() ? -1 : data[size - 1];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}",
      "iterativeCode": "class MyCircularQueue {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int Rear() {\n    if (isEmpty()) return -1;\n    int rear = (front + size - 1) % data.length;\n    return data[rear];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}",
      "recursiveCode": "class MyCircularQueue {\n  private final MyCircularQueueCore queue;\n\n  public MyCircularQueue(int k) {\n    queue = new MyCircularQueueCore(k);\n  }\n\n  public boolean enQueue(int value) { return queue.enQueue(value); }\n  public boolean deQueue() { return queue.deQueue(); }\n  public int Front() { return queue.Front(); }\n  public int Rear() { return queue.Rear(); }\n  public boolean isEmpty() { return queue.isEmpty(); }\n  public boolean isFull() { return queue.isFull(); }\n}\n\nclass MyCircularQueueCore {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  MyCircularQueueCore(int k) { data = new int[k]; }\n\n  boolean enQueue(int value) {\n    if (isFull()) return false;\n    data[(front + size) % data.length] = value;\n    size++;\n    return true;\n  }\n\n  boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  int Front() { return isEmpty() ? -1 : data[front]; }\n  int Rear() { return isEmpty() ? -1 : data[(front + size - 1) % data.length]; }\n  boolean isEmpty() { return size == 0; }\n  boolean isFull() { return size == data.length; }\n}",
      "optimizedCode": "class MyCircularQueue {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int Rear() {\n    if (isEmpty()) return -1;\n    int rear = (front + size - 1) % data.length;\n    return data[rear];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}",
      "code": "class MyCircularQueue {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularQueue(int k) {\n    data = new int[k];\n  }\n\n  public boolean enQueue(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deQueue() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public int Front() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int Rear() {\n    if (isEmpty()) return -1;\n    int rear = (front + size - 1) % data.length;\n    return data[rear];\n  }\n\n  public boolean isEmpty() {\n    return size == 0;\n  }\n\n  public boolean isFull() {\n    return size == data.length;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Design Circular Deque",
      "difficulty": "Medium",
      "subpattern": "Fixed-size circular deque buffer",
      "question": "Design a circular double-ended queue with fixed capacity k. Support insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, and isFull.",
      "trigger": "Both ends need O(1) insertion and deletion in fixed capacity storage, so front and rear movement must wrap with modulo arithmetic.",
      "intuition": "Track front index and size. Insert front by moving front backward first; insert rear at (front + size) % capacity. Delete operations adjust front or size.",
      "edgeCases": "Capacity one, insert into full deque, delete from empty deque, wrap around both ends, getFront/getRear on empty deque.",
      "constraints": "1 <= k <= 1000; 0 <= value <= 1000; at most 2000 calls are made to operations.",
      "source": {
        "label": "Design Circular Deque - LeetCode 641",
        "url": "https://leetcode.com/problems/design-circular-deque/"
      },
      "examples": [
        {
          "input": "MyCircularDeque(3), insertLast(1), insertLast(2), insertFront(3), insertFront(4), getRear(), isFull(), deleteLast(), insertFront(4), getFront()",
          "output": "[null,true,true,true,false,2,true,true,true,4]",
          "explanation": "Insertion fails while full, then succeeds after deleteLast."
        },
        {
          "input": "MyCircularDeque(1), insertFront(9), getRear(), deleteLast(), isEmpty()",
          "output": "[null,true,9,true,true]",
          "explanation": "One-slot deque handles both front and rear as same value."
        },
        {
          "input": "MyCircularDeque(2), getFront(), getRear()",
          "output": "[null,-1,-1]",
          "explanation": "Empty deque returns -1 for both ends."
        }
      ],
      "bruteForceComplexity": "insertFront/deleteFront Time O(n), other operations O(1); Space O(k). Shifting array elements is simple but inefficient.",
      "optimizedComplexity": "All operations Time O(1); Space O(k). Circular front index and size avoid shifting.",
      "recursiveComplexity": "Recursive implementation is not useful for deque design; O(1) circular updates are the correct model.",
      "bruteForceCode": "class MyCircularDeque {\n  private final int[] data;\n  private int size;\n\n  public MyCircularDeque(int k) { data = new int[k]; }\n\n  public boolean insertFront(int value) {\n    if (isFull()) return false;\n    for (int i = size; i > 0; i--) data[i] = data[i - 1];\n    data[0] = value;\n    size++;\n    return true;\n  }\n\n  public boolean insertLast(int value) {\n    if (isFull()) return false;\n    data[size++] = value;\n    return true;\n  }\n\n  public boolean deleteFront() {\n    if (isEmpty()) return false;\n    for (int i = 1; i < size; i++) data[i - 1] = data[i];\n    size--;\n    return true;\n  }\n\n  public boolean deleteLast() {\n    if (isEmpty()) return false;\n    size--;\n    return true;\n  }\n\n  public int getFront() { return isEmpty() ? -1 : data[0]; }\n  public int getRear() { return isEmpty() ? -1 : data[size - 1]; }\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}",
      "iterativeCode": "class MyCircularDeque {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularDeque(int k) {\n    data = new int[k];\n  }\n\n  public boolean insertFront(int value) {\n    if (isFull()) return false;\n    front = (front - 1 + data.length) % data.length;\n    data[front] = value;\n    size++;\n    return true;\n  }\n\n  public boolean insertLast(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deleteFront() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public boolean deleteLast() {\n    if (isEmpty()) return false;\n    size--;\n    return true;\n  }\n\n  public int getFront() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int getRear() {\n    if (isEmpty()) return -1;\n    return data[(front + size - 1) % data.length];\n  }\n\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}",
      "recursiveCode": "class MyCircularDeque {\n  private final MyCircularDequeCore deque;\n\n  public MyCircularDeque(int k) { deque = new MyCircularDequeCore(k); }\n  public boolean insertFront(int value) { return deque.insertFront(value); }\n  public boolean insertLast(int value) { return deque.insertLast(value); }\n  public boolean deleteFront() { return deque.deleteFront(); }\n  public boolean deleteLast() { return deque.deleteLast(); }\n  public int getFront() { return deque.getFront(); }\n  public int getRear() { return deque.getRear(); }\n  public boolean isEmpty() { return deque.isEmpty(); }\n  public boolean isFull() { return deque.isFull(); }\n}\n\nclass MyCircularDequeCore {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  MyCircularDequeCore(int k) { data = new int[k]; }\n  boolean insertFront(int value) {\n    if (isFull()) return false;\n    front = (front - 1 + data.length) % data.length;\n    data[front] = value;\n    size++;\n    return true;\n  }\n  boolean insertLast(int value) {\n    if (isFull()) return false;\n    data[(front + size) % data.length] = value;\n    size++;\n    return true;\n  }\n  boolean deleteFront() { if (isEmpty()) return false; front = (front + 1) % data.length; size--; return true; }\n  boolean deleteLast() { if (isEmpty()) return false; size--; return true; }\n  int getFront() { return isEmpty() ? -1 : data[front]; }\n  int getRear() { return isEmpty() ? -1 : data[(front + size - 1) % data.length]; }\n  boolean isEmpty() { return size == 0; }\n  boolean isFull() { return size == data.length; }\n}",
      "optimizedCode": "class MyCircularDeque {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularDeque(int k) {\n    data = new int[k];\n  }\n\n  public boolean insertFront(int value) {\n    if (isFull()) return false;\n    front = (front - 1 + data.length) % data.length;\n    data[front] = value;\n    size++;\n    return true;\n  }\n\n  public boolean insertLast(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deleteFront() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public boolean deleteLast() {\n    if (isEmpty()) return false;\n    size--;\n    return true;\n  }\n\n  public int getFront() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int getRear() {\n    if (isEmpty()) return -1;\n    return data[(front + size - 1) % data.length];\n  }\n\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}",
      "code": "class MyCircularDeque {\n  private final int[] data;\n  private int front;\n  private int size;\n\n  public MyCircularDeque(int k) {\n    data = new int[k];\n  }\n\n  public boolean insertFront(int value) {\n    if (isFull()) return false;\n    front = (front - 1 + data.length) % data.length;\n    data[front] = value;\n    size++;\n    return true;\n  }\n\n  public boolean insertLast(int value) {\n    if (isFull()) return false;\n    int rear = (front + size) % data.length;\n    data[rear] = value;\n    size++;\n    return true;\n  }\n\n  public boolean deleteFront() {\n    if (isEmpty()) return false;\n    front = (front + 1) % data.length;\n    size--;\n    return true;\n  }\n\n  public boolean deleteLast() {\n    if (isEmpty()) return false;\n    size--;\n    return true;\n  }\n\n  public int getFront() {\n    return isEmpty() ? -1 : data[front];\n  }\n\n  public int getRear() {\n    if (isEmpty()) return -1;\n    return data[(front + size - 1) % data.length];\n  }\n\n  public boolean isEmpty() { return size == 0; }\n  public boolean isFull() { return size == data.length; }\n}"
    },
    {
      "group": "core",
      "name": "Moving Average from Data Stream",
      "difficulty": "Easy",
      "subpattern": "Fixed-size sliding window queue",
      "question": "Design a MovingAverage class that returns the moving average of the last size values from a stream after each next(val) call.",
      "trigger": "Only the most recent size values matter, so a queue can evict the oldest value when the window grows too large.",
      "intuition": "Keep a queue and a running sum. Add the new value, subtract and remove the oldest value if capacity is exceeded, then return sum / queue size.",
      "edgeCases": "Fewer values than window size, window exactly full, repeated evictions, negative values if reused beyond constraints, size one.",
      "constraints": "1 <= size <= 1000; -100000 <= val <= 100000; at most 10000 calls are made to next.",
      "source": {
        "label": "Moving Average from Data Stream - LeetCode 346",
        "url": "https://leetcode.com/problems/moving-average-from-data-stream/"
      },
      "examples": [
        {
          "input": "MovingAverage(3), next(1), next(10), next(3), next(5)",
          "output": "[null,1.0,5.5,4.66667,6.0]",
          "explanation": "After 5 arrives, the window is [10,3,5]."
        },
        {
          "input": "MovingAverage(1), next(4), next(7)",
          "output": "[null,4.0,7.0]",
          "explanation": "Window size one keeps only the latest value."
        },
        {
          "input": "MovingAverage(2), next(2), next(2), next(2)",
          "output": "[null,2.0,2.0,2.0]",
          "explanation": "The average remains 2 as older equal values are evicted."
        }
      ],
      "bruteForceComplexity": "next Time O(size); Space O(size). Recompute the sum by scanning the current window after each insertion.",
      "optimizedComplexity": "next Time O(1); Space O(size). A running sum and queue maintain the fixed-size window.",
      "recursiveComplexity": "next Time O(size), Space O(size) recursion stack if summing recursively; running-sum queue is preferred.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MovingAverage {\n  private final int capacity;\n  private final Queue<Integer> window = new ArrayDeque<>();\n\n  public MovingAverage(int size) {\n    capacity = size;\n  }\n\n  public double next(int val) {\n    window.offer(val);\n    if (window.size() > capacity) window.poll();\n\n    int sum = 0;\n    for (int value : window) sum += value;\n    return (double) sum / window.size();\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MovingAverage {\n  private final int capacity;\n  private final Queue<Integer> window = new ArrayDeque<>();\n  private long sum;\n\n  public MovingAverage(int size) {\n    capacity = size;\n  }\n\n  public double next(int val) {\n    window.offer(val);\n    sum += val;\n\n    if (window.size() > capacity) {\n      sum -= window.poll();\n    }\n\n    return (double) sum / window.size();\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MovingAverage {\n  private final int capacity;\n  private final Queue<Integer> window = new ArrayDeque<>();\n\n  public MovingAverage(int size) {\n    capacity = size;\n  }\n\n  public double next(int val) {\n    window.offer(val);\n    if (window.size() > capacity) window.poll();\n\n    Integer[] values = window.toArray(new Integer[0]);\n    return (double) sum(values, 0) / values.length;\n  }\n\n  private int sum(Integer[] values, int index) {\n    if (index == values.length) return 0;\n    return values[index] + sum(values, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MovingAverage {\n  private final int capacity;\n  private final Queue<Integer> window = new ArrayDeque<>();\n  private long sum;\n\n  public MovingAverage(int size) {\n    capacity = size;\n  }\n\n  public double next(int val) {\n    window.offer(val);\n    sum += val;\n\n    if (window.size() > capacity) {\n      sum -= window.poll();\n    }\n\n    return (double) sum / window.size();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass MovingAverage {\n  private final int capacity;\n  private final Queue<Integer> window = new ArrayDeque<>();\n  private long sum;\n\n  public MovingAverage(int size) {\n    capacity = size;\n  }\n\n  public double next(int val) {\n    window.offer(val);\n    sum += val;\n\n    if (window.size() > capacity) {\n      sum -= window.poll();\n    }\n\n    return (double) sum / window.size();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Number of Recent Calls",
      "difficulty": "Easy",
      "subpattern": "Time-window queue",
      "question": "Implement RecentCounter, which counts requests in the inclusive time window [t - 3000, t] after each ping(t). Calls to ping use strictly increasing t values.",
      "trigger": "Only recent timestamps inside a fixed time window matter, so older timestamps should be removed from the front of a queue.",
      "intuition": "Append the new timestamp. While the oldest timestamp is less than t - 3000, remove it. The queue size is the answer.",
      "edgeCases": "First ping, timestamp exactly t - 3000, many expired timestamps, strictly increasing calls, all calls still inside window.",
      "constraints": "1 <= t <= 1000000000; t is strictly increasing between calls; at most 10000 calls are made to ping.",
      "source": {
        "label": "Number of Recent Calls - LeetCode 933",
        "url": "https://leetcode.com/problems/number-of-recent-calls/"
      },
      "examples": [
        {
          "input": "RecentCounter(), ping(1), ping(100), ping(3001), ping(3002)",
          "output": "[null,1,2,3,3]",
          "explanation": "At t = 3002, timestamp 1 expires but 100, 3001, and 3002 remain."
        },
        {
          "input": "ping(3000), ping(6000)",
          "output": "[1,2]",
          "explanation": "3000 is inside [3000,6000]."
        },
        {
          "input": "ping(1), ping(4000)",
          "output": "[1,1]",
          "explanation": "1 is outside [1000,4000]."
        }
      ],
      "bruteForceComplexity": "ping Time O(n); Space O(n). Store all timestamps and scan them each call.",
      "optimizedComplexity": "Amortized ping Time O(1); Space O(w), where w is the number of timestamps inside the 3000ms window.",
      "recursiveComplexity": "ping Time O(w); Space O(w) recursion stack if expired timestamps are removed recursively.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass RecentCounter {\n  private final List<Integer> calls = new ArrayList<>();\n\n  public int ping(int t) {\n    calls.add(t);\n    int count = 0;\n\n    for (int time : calls) {\n      if (time >= t - 3000 && time <= t) count++;\n    }\n\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass RecentCounter {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public int ping(int t) {\n    queue.offer(t);\n\n    while (queue.peek() < t - 3000) {\n      queue.poll();\n    }\n\n    return queue.size();\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass RecentCounter {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public int ping(int t) {\n    queue.offer(t);\n    removeExpired(t - 3000);\n    return queue.size();\n  }\n\n  private void removeExpired(int earliestAllowed) {\n    if (queue.isEmpty() || queue.peek() >= earliestAllowed) return;\n    queue.poll();\n    removeExpired(earliestAllowed);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass RecentCounter {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public int ping(int t) {\n    queue.offer(t);\n\n    while (queue.peek() < t - 3000) {\n      queue.poll();\n    }\n\n    return queue.size();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass RecentCounter {\n  private final Queue<Integer> queue = new ArrayDeque<>();\n\n  public int ping(int t) {\n    queue.offer(t);\n\n    while (queue.peek() < t - 3000) {\n      queue.poll();\n    }\n\n    return queue.size();\n  }\n}"
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
      "constraints": "1 <= nums.length <= 100000; -10000 <= nums[i] <= 10000; 1 <= k <= nums.length.",
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
      "bruteForceCode": "class Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n\n    for (int left = 0; left <= nums.length - k; left++) {\n      int max = nums[left];\n      for (int i = left + 1; i < left + k; i++) {\n        max = Math.max(max, nums[i]);\n      }\n      answer[left] = max;\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() <= right - k) deque.pollFirst();\n      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) deque.pollLast();\n\n      deque.offerLast(right);\n      if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    fill(nums, k, 0, new ArrayDeque<>(), answer);\n    return answer;\n  }\n\n  private void fill(int[] nums, int k, int right, Deque<Integer> deque, int[] answer) {\n    if (right == nums.length) return;\n\n    while (!deque.isEmpty() && deque.peekFirst() <= right - k) deque.pollFirst();\n    while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) deque.pollLast();\n    deque.offerLast(right);\n\n    if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    fill(nums, k, right + 1, deque, answer);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() <= right - k) deque.pollFirst();\n      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) deque.pollLast();\n\n      deque.offerLast(right);\n      if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] maxSlidingWindow(int[] nums, int k) {\n    int[] answer = new int[nums.length - k + 1];\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    for (int right = 0; right < nums.length; right++) {\n      while (!deque.isEmpty() && deque.peekFirst() <= right - k) deque.pollFirst();\n      while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[right]) deque.pollLast();\n\n      deque.offerLast(right);\n      if (right >= k - 1) answer[right - k + 1] = nums[deque.peekFirst()];\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Shortest Subarray with Sum at Least K",
      "difficulty": "Hard",
      "subpattern": "Monotonic deque over prefix sums",
      "question": "Given an integer array nums and an integer k, return the length of the shortest non-empty contiguous subarray whose sum is at least k. Return -1 if no such subarray exists.",
      "trigger": "Negative numbers break normal sliding window. Prefix sums plus a monotonic deque keep the best earlier prefix candidates for each right boundary.",
      "intuition": "For each prefix sum, pop front while the current prefix minus the oldest prefix reaches k. Pop back while older prefixes are greater or equal, because they are worse starts.",
      "edgeCases": "Negative numbers, single element meeting k, no valid subarray, k negative or positive, best subarray not found by normal sliding window.",
      "constraints": "1 <= nums.length <= 100000; -100000 <= nums[i] <= 100000; 1 <= k <= 1000000000.",
      "source": {
        "label": "Shortest Subarray with Sum at Least K - LeetCode 862",
        "url": "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/"
      },
      "examples": [
        {
          "input": "nums = [1], k = 1",
          "output": "1",
          "explanation": "The single element reaches k."
        },
        {
          "input": "nums = [1,2], k = 4",
          "output": "-1",
          "explanation": "No subarray sum reaches 4."
        },
        {
          "input": "nums = [2,-1,2], k = 3",
          "output": "3",
          "explanation": "The whole array is the shortest valid subarray."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Enumerate every subarray sum.",
      "optimizedComplexity": "Time O(n); Space O(n). Each prefix index enters and leaves the deque at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive prefix processing can maintain the same monotonic deque.",
      "bruteForceCode": "class Solution {\n  public int shortestSubarray(int[] nums, int k) {\n    int best = Integer.MAX_VALUE;\n\n    for (int left = 0; left < nums.length; left++) {\n      long sum = 0;\n      for (int right = left; right < nums.length; right++) {\n        sum += nums[right];\n        if (sum >= k) {\n          best = Math.min(best, right - left + 1);\n          break;\n        }\n      }\n    }\n\n    return best == Integer.MAX_VALUE ? -1 : best;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int shortestSubarray(int[] nums, int k) {\n    int n = nums.length;\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n\n    int best = n + 1;\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    for (int right = 0; right <= n; right++) {\n      while (!deque.isEmpty() && prefix[right] - prefix[deque.peekFirst()] >= k) {\n        best = Math.min(best, right - deque.pollFirst());\n      }\n      while (!deque.isEmpty() && prefix[deque.peekLast()] >= prefix[right]) {\n        deque.pollLast();\n      }\n      deque.offerLast(right);\n    }\n\n    return best == n + 1 ? -1 : best;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int shortestSubarray(int[] nums, int k) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    int best = scan(prefix, k, 0, new ArrayDeque<>(), nums.length + 1);\n    return best == nums.length + 1 ? -1 : best;\n  }\n\n  private int scan(long[] prefix, int k, int right, Deque<Integer> deque, int best) {\n    if (right == prefix.length) return best;\n\n    while (!deque.isEmpty() && prefix[right] - prefix[deque.peekFirst()] >= k) {\n      best = Math.min(best, right - deque.pollFirst());\n    }\n    while (!deque.isEmpty() && prefix[deque.peekLast()] >= prefix[right]) deque.pollLast();\n    deque.offerLast(right);\n\n    return scan(prefix, k, right + 1, deque, best);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int shortestSubarray(int[] nums, int k) {\n    int n = nums.length;\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n\n    int best = n + 1;\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    for (int right = 0; right <= n; right++) {\n      while (!deque.isEmpty() && prefix[right] - prefix[deque.peekFirst()] >= k) {\n        best = Math.min(best, right - deque.pollFirst());\n      }\n      while (!deque.isEmpty() && prefix[deque.peekLast()] >= prefix[right]) {\n        deque.pollLast();\n      }\n      deque.offerLast(right);\n    }\n\n    return best == n + 1 ? -1 : best;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int shortestSubarray(int[] nums, int k) {\n    int n = nums.length;\n    long[] prefix = new long[n + 1];\n    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];\n\n    int best = n + 1;\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    for (int right = 0; right <= n; right++) {\n      while (!deque.isEmpty() && prefix[right] - prefix[deque.peekFirst()] >= k) {\n        best = Math.min(best, right - deque.pollFirst());\n      }\n      while (!deque.isEmpty() && prefix[deque.peekLast()] >= prefix[right]) {\n        deque.pollLast();\n      }\n      deque.offerLast(right);\n    }\n\n    return best == n + 1 ? -1 : best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Jump Game VI",
      "difficulty": "Medium",
      "subpattern": "Monotonic deque for DP window maximum",
      "question": "Given nums and k, start at index 0 and jump at most k steps forward each move. Return the maximum score possible when reaching the last index, where score is the sum of visited nums values.",
      "trigger": "The DP transition needs the maximum dp value among the previous k indexes, which a monotonic deque maintains in O(1) amortized time.",
      "intuition": "dp[i] = nums[i] + max dp[j] for j in [i-k, i-1]. Keep candidate indexes in decreasing dp order and remove expired indexes from the front.",
      "edgeCases": "k = 1, k >= n, negative values, all negative values, best path skips many indexes.",
      "constraints": "1 <= nums.length <= 100000; -10000 <= nums[i] <= 10000; 1 <= k <= 100000.",
      "source": {
        "label": "Jump Game VI - LeetCode 1696",
        "url": "https://leetcode.com/problems/jump-game-vi/"
      },
      "examples": [
        {
          "input": "nums = [1,-1,-2,4,-7,3], k = 2",
          "output": "7",
          "explanation": "One best path is 1 -> -1 -> 4 -> 3."
        },
        {
          "input": "nums = [10,-5,-2,4,0,3], k = 3",
          "output": "17",
          "explanation": "A best path reaches score 17."
        },
        {
          "input": "nums = [1,-5,-20,4,-1,3,-6,-3], k = 2",
          "output": "0",
          "explanation": "Deque keeps the best reachable prior score."
        }
      ],
      "bruteForceComplexity": "Time O(n*k); Space O(n). For every index, scan all previous k dp states.",
      "optimizedComplexity": "Time O(n); Space O(n). Each index is pushed and popped at most once from the monotonic deque.",
      "recursiveComplexity": "Time O(n*k) with memoized recursion; Space O(n). The optimized iterative deque is preferred.",
      "bruteForceCode": "class Solution {\n  public int maxResult(int[] nums, int k) {\n    int n = nums.length;\n    int[] dp = new int[n];\n    dp[0] = nums[0];\n\n    for (int i = 1; i < n; i++) {\n      dp[i] = Integer.MIN_VALUE;\n      for (int j = Math.max(0, i - k); j < i; j++) {\n        dp[i] = Math.max(dp[i], dp[j] + nums[i]);\n      }\n    }\n\n    return dp[n - 1];\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int maxResult(int[] nums, int k) {\n    int n = nums.length;\n    int[] dp = new int[n];\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    dp[0] = nums[0];\n    deque.offerLast(0);\n\n    for (int i = 1; i < n; i++) {\n      while (!deque.isEmpty() && deque.peekFirst() < i - k) deque.pollFirst();\n      dp[i] = nums[i] + dp[deque.peekFirst()];\n\n      while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) deque.pollLast();\n      deque.offerLast(i);\n    }\n\n    return dp[n - 1];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxResult(int[] nums, int k) {\n    Integer[] memo = new Integer[nums.length];\n    return best(nums, k, nums.length - 1, memo);\n  }\n\n  private int best(int[] nums, int k, int index, Integer[] memo) {\n    if (index == 0) return nums[0];\n    if (memo[index] != null) return memo[index];\n\n    int answer = Integer.MIN_VALUE;\n    for (int previous = Math.max(0, index - k); previous < index; previous++) {\n      answer = Math.max(answer, best(nums, k, previous, memo) + nums[index]);\n    }\n\n    memo[index] = answer;\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int maxResult(int[] nums, int k) {\n    int n = nums.length;\n    int[] dp = new int[n];\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    dp[0] = nums[0];\n    deque.offerLast(0);\n\n    for (int i = 1; i < n; i++) {\n      while (!deque.isEmpty() && deque.peekFirst() < i - k) deque.pollFirst();\n      dp[i] = nums[i] + dp[deque.peekFirst()];\n\n      while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) deque.pollLast();\n      deque.offerLast(i);\n    }\n\n    return dp[n - 1];\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int maxResult(int[] nums, int k) {\n    int n = nums.length;\n    int[] dp = new int[n];\n    Deque<Integer> deque = new ArrayDeque<>();\n\n    dp[0] = nums[0];\n    deque.offerLast(0);\n\n    for (int i = 1; i < n; i++) {\n      while (!deque.isEmpty() && deque.peekFirst() < i - k) deque.pollFirst();\n      dp[i] = nums[i] + dp[deque.peekFirst()];\n\n      while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) deque.pollLast();\n      deque.offerLast(i);\n    }\n\n    return dp[n - 1];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Constrained Subsequence Sum",
      "difficulty": "Hard",
      "subpattern": "Monotonic deque for constrained DP maximum",
      "question": "Given nums and k, return the maximum sum of a non-empty subsequence such that for every two adjacent chosen elements, their indexes differ by at most k.",
      "trigger": "The DP state needs the maximum positive dp value among the previous k indexes, which is a sliding-window maximum over DP values.",
      "intuition": "dp[i] is nums[i] plus the best non-negative dp inside the last k indexes. Maintain those dp candidates in decreasing order with a deque.",
      "edgeCases": "All negative values, k = 1, k >= n, best subsequence starts in the middle, zero/negative dp should not reduce future sums.",
      "constraints": "1 <= nums.length <= 100000; -10000 <= nums[i] <= 10000; 1 <= k <= nums.length.",
      "source": {
        "label": "Constrained Subsequence Sum - LeetCode 1425",
        "url": "https://leetcode.com/problems/constrained-subsequence-sum/"
      },
      "examples": [
        {
          "input": "nums = [10,2,-10,5,20], k = 2",
          "output": "37",
          "explanation": "Choose 10, 2, 5, and 20."
        },
        {
          "input": "nums = [-1,-2,-3], k = 1",
          "output": "-1",
          "explanation": "The best non-empty subsequence is the largest single value."
        },
        {
          "input": "nums = [10,-2,-10,-5,20], k = 2",
          "output": "23",
          "explanation": "The constraint allows a best sum of 23."
        }
      ],
      "bruteForceComplexity": "Time O(n*k); Space O(n). For every index, scan previous k dp states.",
      "optimizedComplexity": "Time O(n); Space O(n). Each index enters and leaves the deque at most once.",
      "recursiveComplexity": "Time O(n*k) with memoized recursion; Space O(n). Deque optimization is the intended approach.",
      "bruteForceCode": "class Solution {\n  public int constrainedSubsetSum(int[] nums, int k) {\n    int n = nums.length;\n    int[] dp = new int[n];\n    int answer = nums[0];\n\n    for (int i = 0; i < n; i++) {\n      dp[i] = nums[i];\n      for (int j = Math.max(0, i - k); j < i; j++) {\n        dp[i] = Math.max(dp[i], nums[i] + dp[j]);\n      }\n      answer = Math.max(answer, dp[i]);\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int constrainedSubsetSum(int[] nums, int k) {\n    int[] dp = new int[nums.length];\n    Deque<Integer> deque = new ArrayDeque<>();\n    int answer = nums[0];\n\n    for (int i = 0; i < nums.length; i++) {\n      while (!deque.isEmpty() && deque.peekFirst() < i - k) deque.pollFirst();\n\n      dp[i] = nums[i] + (deque.isEmpty() ? 0 : Math.max(0, dp[deque.peekFirst()]));\n      answer = Math.max(answer, dp[i]);\n\n      while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) deque.pollLast();\n      deque.offerLast(i);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int constrainedSubsetSum(int[] nums, int k) {\n    Integer[] memo = new Integer[nums.length];\n    int answer = Integer.MIN_VALUE;\n\n    for (int i = 0; i < nums.length; i++) {\n      answer = Math.max(answer, bestEndingAt(nums, k, i, memo));\n    }\n\n    return answer;\n  }\n\n  private int bestEndingAt(int[] nums, int k, int index, Integer[] memo) {\n    if (memo[index] != null) return memo[index];\n\n    int bestPrevious = 0;\n    for (int previous = Math.max(0, index - k); previous < index; previous++) {\n      bestPrevious = Math.max(bestPrevious, bestEndingAt(nums, k, previous, memo));\n    }\n\n    memo[index] = nums[index] + bestPrevious;\n    return memo[index];\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int constrainedSubsetSum(int[] nums, int k) {\n    int[] dp = new int[nums.length];\n    Deque<Integer> deque = new ArrayDeque<>();\n    int answer = nums[0];\n\n    for (int i = 0; i < nums.length; i++) {\n      while (!deque.isEmpty() && deque.peekFirst() < i - k) deque.pollFirst();\n\n      dp[i] = nums[i] + (deque.isEmpty() ? 0 : Math.max(0, dp[deque.peekFirst()]));\n      answer = Math.max(answer, dp[i]);\n\n      while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) deque.pollLast();\n      deque.offerLast(i);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int constrainedSubsetSum(int[] nums, int k) {\n    int[] dp = new int[nums.length];\n    Deque<Integer> deque = new ArrayDeque<>();\n    int answer = nums[0];\n\n    for (int i = 0; i < nums.length; i++) {\n      while (!deque.isEmpty() && deque.peekFirst() < i - k) deque.pollFirst();\n\n      dp[i] = nums[i] + (deque.isEmpty() ? 0 : Math.max(0, dp[deque.peekFirst()]));\n      answer = Math.max(answer, dp[i]);\n\n      while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) deque.pollLast();\n      deque.offerLast(i);\n    }\n\n    return answer;\n  }\n}"
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
      "constraints": "1 <= m, n <= 10; grid[i][j] is 0, 1, or 2.",
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
      "bruteForceCode": "class Solution {\n  public int orangesRotting(int[][] grid) {\n    int minutes = 0;\n\n    while (true) {\n      boolean changed = false;\n      int[][] copy = new int[grid.length][grid[0].length];\n      for (int r = 0; r < grid.length; r++) copy[r] = grid[r].clone();\n\n      for (int r = 0; r < grid.length; r++) {\n        for (int c = 0; c < grid[0].length; c++) {\n          if (grid[r][c] == 1 && hasRottenNeighbor(grid, r, c)) {\n            copy[r][c] = 2;\n            changed = true;\n          }\n        }\n      }\n\n      if (!changed) break;\n      grid = copy;\n      minutes++;\n    }\n\n    for (int[] row : grid) for (int cell : row) if (cell == 1) return -1;\n    return minutes;\n  }\n\n  private boolean hasRottenNeighbor(int[][] grid, int r, int c) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    for (int[] d : dirs) {\n      int nr = r + d[0], nc = c + d[1];\n      if (nr >= 0 && nc >= 0 && nr < grid.length && nc < grid[0].length && grid[nr][nc] == 2) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      minutes++;\n\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n    }\n\n    return fresh == 0 ? minutes : -1;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int orangesRotting(int[][] grid) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int result = bfs(grid, queue, fresh, 0);\n    return result;\n  }\n\n  private int bfs(int[][] grid, Queue<int[]> queue, int fresh, int minutes) {\n    if (fresh == 0) return minutes;\n    if (queue.isEmpty()) return -1;\n\n    int size = queue.size();\n    for (int i = 0; i < size; i++) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n        grid[nr][nc] = 2;\n        fresh--;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n    return bfs(grid, queue, fresh, minutes + 1);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      minutes++;\n\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n    }\n\n    return fresh == 0 ? minutes : -1;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        else if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      minutes++;\n\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n    }\n\n    return fresh == 0 ? minutes : -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Number of Islands BFS",
      "difficulty": "Medium",
      "subpattern": "Grid BFS connected components",
      "question": "Given an m x n grid of 1s as land and 0s as water, return the number of islands. An island is connected horizontally or vertically.",
      "trigger": "Each island is a connected component in a grid, and BFS from one land cell visits the whole component once.",
      "intuition": "Scan the grid. When unvisited land is found, count one island and BFS to mark all land in that island as visited.",
      "edgeCases": "All water, all land, one cell, diagonal land not connected, multiple separated islands.",
      "constraints": "1 <= m, n <= 300; grid[i][j] is 0 or 1.",
      "source": {
        "label": "Number of Islands - LeetCode 200",
        "url": "https://leetcode.com/problems/number-of-islands/"
      },
      "examples": [
        {
          "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
          "output": "1",
          "explanation": "All land cells are connected as one island."
        },
        {
          "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
          "output": "3",
          "explanation": "There are three separated connected components."
        },
        {
          "input": "grid = [[\"0\"]]",
          "output": "0",
          "explanation": "No land exists."
        }
      ],
      "bruteForceComplexity": "Time O(mn * mn) if each component search does not mark visited efficiently; Space O(mn).",
      "optimizedComplexity": "Time O(mn); Space O(min(mn, queue size)). Each cell is visited at most once.",
      "recursiveComplexity": "Time O(mn); Space O(mn) recursion stack in worst case. DFS recursion is the common recursive variant.",
      "bruteForceCode": "class Solution {\n  public int numIslands(char[][] grid) {\n    boolean[][] visited = new boolean[grid.length][grid[0].length];\n    int count = 0;\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1' && !visited[r][c]) {\n          count++;\n          mark(grid, visited, r, c);\n        }\n      }\n    }\n\n    return count;\n  }\n\n  private void mark(char[][] grid, boolean[][] visited, int r, int c) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid[0].length || visited[r][c] || grid[r][c] == '0') return;\n    visited[r][c] = true;\n    mark(grid, visited, r + 1, c);\n    mark(grid, visited, r - 1, c);\n    mark(grid, visited, r, c + 1);\n    mark(grid, visited, r, c - 1);\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] != '1') continue;\n\n        islands++;\n        grid[r][c] = '0';\n        Queue<int[]> queue = new ArrayDeque<>();\n        queue.offer(new int[] {r, c});\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != '1') continue;\n            grid[nr][nc] = '0';\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numIslands(char[][] grid) {\n    int islands = 0;\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1') {\n          islands++;\n          sink(grid, r, c);\n        }\n      }\n    }\n\n    return islands;\n  }\n\n  private void sink(char[][] grid, int r, int c) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid[0].length || grid[r][c] != '1') return;\n\n    grid[r][c] = '0';\n    sink(grid, r + 1, c);\n    sink(grid, r - 1, c);\n    sink(grid, r, c + 1);\n    sink(grid, r, c - 1);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] != '1') continue;\n\n        islands++;\n        grid[r][c] = '0';\n        Queue<int[]> queue = new ArrayDeque<>();\n        queue.offer(new int[] {r, c});\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != '1') continue;\n            grid[nr][nc] = '0';\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] != '1') continue;\n\n        islands++;\n        grid[r][c] = '0';\n        Queue<int[]> queue = new ArrayDeque<>();\n        queue.offer(new int[] {r, c});\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length || grid[nr][nc] != '1') continue;\n            grid[nr][nc] = '0';\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Open the Lock",
      "difficulty": "Medium",
      "subpattern": "Shortest path BFS over states",
      "question": "Given deadends and a target lock combination, return the minimum turns needed to reach target from 0000. Each move turns one wheel one step up or down. Return -1 if impossible.",
      "trigger": "Every lock combination is an unweighted graph state, and each wheel turn is one edge, so minimum turns require BFS.",
      "intuition": "Start from 0000, skip deadends, generate eight neighbors per state, and return the BFS depth when target is reached.",
      "edgeCases": "0000 is a deadend, target is 0000, target blocked by deadends, repeated generated states, wrap from 9 to 0 and 0 to 9.",
      "constraints": "1 <= deadends.length <= 500; deadends[i].length == 4; target.length == 4; strings contain digits.",
      "source": {
        "label": "Open the Lock - LeetCode 752",
        "url": "https://leetcode.com/problems/open-the-lock/"
      },
      "examples": [
        {
          "input": "deadends = [\"0201\",\"0101\",\"0102\",\"1212\",\"2002\"], target = \"0202\"",
          "output": "6",
          "explanation": "BFS finds the shortest sequence of six turns."
        },
        {
          "input": "deadends = [\"8888\"], target = \"0009\"",
          "output": "1",
          "explanation": "Turn the last wheel down once."
        },
        {
          "input": "deadends = [\"0000\"], target = \"8888\"",
          "output": "-1",
          "explanation": "The start state is blocked."
        }
      ],
      "bruteForceComplexity": "Time O(10^4 * 8); Space O(10^4). BFS over all states is already the practical baseline.",
      "optimizedComplexity": "Time O(10^4 * 8); Space O(10^4). Each reachable combination is visited at most once.",
      "recursiveComplexity": "Time O(10^4 * 8); Space O(10^4). Recursive layer BFS adds recursion depth equal to turns.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    return bfs(deadends, target);\n  }\n\n  private int bfs(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(\"0000\");\n    visited.add(\"0000\");\n    int turns = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String state = queue.poll();\n        if (state.equals(target)) return turns;\n        for (String next : neighbors(state)) {\n          if (!dead.contains(next) && visited.add(next)) queue.offer(next);\n        }\n      }\n      turns++;\n    }\n    return -1;\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> result = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      result.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      result.add(new String(chars));\n      chars[i] = original;\n    }\n    return result;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(\"0000\");\n    visited.add(\"0000\");\n    int turns = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String state = queue.poll();\n        if (state.equals(target)) return turns;\n\n        for (String next : neighbors(state)) {\n          if (!dead.contains(next) && visited.add(next)) queue.offer(next);\n        }\n      }\n      turns++;\n    }\n\n    return -1;\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> result = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      result.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      result.add(new String(chars));\n      chars[i] = original;\n    }\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(\"0000\");\n    visited.add(\"0000\");\n    return bfs(queue, visited, dead, target, 0);\n  }\n\n  private int bfs(Queue<String> queue, Set<String> visited, Set<String> dead, String target, int turns) {\n    if (queue.isEmpty()) return -1;\n\n    int size = queue.size();\n    for (int i = 0; i < size; i++) {\n      String state = queue.poll();\n      if (state.equals(target)) return turns;\n      for (String next : neighbors(state)) {\n        if (!dead.contains(next) && visited.add(next)) queue.offer(next);\n      }\n    }\n\n    return bfs(queue, visited, dead, target, turns + 1);\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> result = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1); result.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1); result.add(new String(chars));\n      chars[i] = original;\n    }\n    return result;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(\"0000\");\n    visited.add(\"0000\");\n    int turns = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String state = queue.poll();\n        if (state.equals(target)) return turns;\n\n        for (String next : neighbors(state)) {\n          if (!dead.contains(next) && visited.add(next)) queue.offer(next);\n        }\n      }\n      turns++;\n    }\n\n    return -1;\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> result = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      result.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      result.add(new String(chars));\n      chars[i] = original;\n    }\n    return result;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(\"0000\");\n    visited.add(\"0000\");\n    int turns = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String state = queue.poll();\n        if (state.equals(target)) return turns;\n\n        for (String next : neighbors(state)) {\n          if (!dead.contains(next) && visited.add(next)) queue.offer(next);\n        }\n      }\n      turns++;\n    }\n\n    return -1;\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> result = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      result.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      result.add(new String(chars));\n      chars[i] = original;\n    }\n    return result;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Perfect Squares",
      "difficulty": "Medium",
      "subpattern": "BFS shortest count over remainders",
      "question": "Given an integer n, return the least number of perfect square numbers whose sum equals n.",
      "trigger": "Each subtraction of a square is one step, and the target is the fewest steps to reach 0, so BFS over remaining sums gives the shortest count.",
      "intuition": "Precompute square numbers up to n. BFS starts at n and subtracts each square to generate remainders. The first time 0 is reached gives the answer.",
      "edgeCases": "n is a perfect square, n = 1, repeated remainders, answer uses several same squares, large n.",
      "constraints": "1 <= n <= 10000.",
      "source": {
        "label": "Perfect Squares - LeetCode 279",
        "url": "https://leetcode.com/problems/perfect-squares/"
      },
      "examples": [
        {
          "input": "n = 12",
          "output": "3",
          "explanation": "12 = 4 + 4 + 4."
        },
        {
          "input": "n = 13",
          "output": "2",
          "explanation": "13 = 4 + 9."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "1 itself is a perfect square."
        }
      ],
      "bruteForceComplexity": "Time exponential without memoization; Space O(n). Try all square combinations recursively.",
      "optimizedComplexity": "Time O(n*sqrt(n)); Space O(n). BFS visits each remainder at most once and tries all squares.",
      "recursiveComplexity": "Time O(n*sqrt(n)); Space O(n). Memoized recursion computes the best count for each remainder.",
      "bruteForceCode": "class Solution {\n  public int numSquares(int n) {\n    if (n == 0) return 0;\n    int best = n;\n\n    for (int square = 1; square * square <= n; square++) {\n      best = Math.min(best, 1 + numSquares(n - square * square));\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public int numSquares(int n) {\n    List<Integer> squares = new ArrayList<>();\n    for (int i = 1; i * i <= n; i++) squares.add(i * i);\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    boolean[] visited = new boolean[n + 1];\n    queue.offer(n);\n    visited[n] = true;\n    int steps = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      steps++;\n      for (int i = 0; i < size; i++) {\n        int current = queue.poll();\n        for (int square : squares) {\n          int next = current - square;\n          if (next == 0) return steps;\n          if (next < 0) break;\n          if (!visited[next]) {\n            visited[next] = true;\n            queue.offer(next);\n          }\n        }\n      }\n    }\n\n    return steps;\n  }\n}",
      "recursiveCode": "import java.util.Arrays;\n\nclass Solution {\n  public int numSquares(int n) {\n    int[] memo = new int[n + 1];\n    Arrays.fill(memo, -1);\n    memo[0] = 0;\n    return solve(n, memo);\n  }\n\n  private int solve(int n, int[] memo) {\n    if (memo[n] != -1) return memo[n];\n\n    int best = n;\n    for (int i = 1; i * i <= n; i++) {\n      best = Math.min(best, 1 + solve(n - i * i, memo));\n    }\n\n    memo[n] = best;\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public int numSquares(int n) {\n    List<Integer> squares = new ArrayList<>();\n    for (int i = 1; i * i <= n; i++) squares.add(i * i);\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    boolean[] visited = new boolean[n + 1];\n    queue.offer(n);\n    visited[n] = true;\n    int steps = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      steps++;\n      for (int i = 0; i < size; i++) {\n        int current = queue.poll();\n        for (int square : squares) {\n          int next = current - square;\n          if (next == 0) return steps;\n          if (next < 0) break;\n          if (!visited[next]) {\n            visited[next] = true;\n            queue.offer(next);\n          }\n        }\n      }\n    }\n\n    return steps;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public int numSquares(int n) {\n    List<Integer> squares = new ArrayList<>();\n    for (int i = 1; i * i <= n; i++) squares.add(i * i);\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    boolean[] visited = new boolean[n + 1];\n    queue.offer(n);\n    visited[n] = true;\n    int steps = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      steps++;\n      for (int i = 0; i < size; i++) {\n        int current = queue.poll();\n        for (int square : squares) {\n          int next = current - square;\n          if (next == 0) return steps;\n          if (next < 0) break;\n          if (!visited[next]) {\n            visited[next] = true;\n            queue.offer(next);\n          }\n        }\n      }\n    }\n\n    return steps;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Walls and Gates",
      "difficulty": "Medium",
      "subpattern": "Multi-source BFS distance fill",
      "question": "Given rooms where -1 is a wall, 0 is a gate, and INF is an empty room, fill each empty room with the distance to its nearest gate. If a room cannot reach a gate, leave it as INF.",
      "trigger": "Every gate is a distance-0 source, and nearest distances in an unweighted grid are found by multi-source BFS.",
      "intuition": "Enqueue all gates first. BFS outward through INF rooms, setting each room to previous distance plus one when first visited.",
      "edgeCases": "No gates, all walls, all gates, unreachable rooms, one row or one column, multiple gates competing for nearest rooms.",
      "constraints": "m and n are non-negative; rooms[i][j] is -1, 0, or 2147483647.",
      "source": {
        "label": "Walls and Gates - LeetCode 286",
        "url": "https://leetcode.com/problems/walls-and-gates/"
      },
      "examples": [
        {
          "input": "rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]",
          "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
          "explanation": "Each empty room receives distance to the nearest gate."
        },
        {
          "input": "rooms = [[0]]",
          "output": "[[0]]",
          "explanation": "A gate remains 0."
        },
        {
          "input": "rooms = [[INF]]",
          "output": "[[INF]]",
          "explanation": "No gate can reach the room."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Run BFS from every empty room to find its nearest gate.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Multi-source BFS visits each room at most once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive layer BFS uses call stack over distance layers.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private static final int INF = 2147483647;\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public void wallsAndGates(int[][] rooms) {\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == INF) rooms[r][c] = distanceToGate(rooms, r, c);\n      }\n    }\n  }\n\n  private int distanceToGate(int[][] rooms, int sr, int sc) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    boolean[][] visited = new boolean[rooms.length][rooms[0].length];\n    queue.offer(new int[] {sr, sc, 0});\n    visited[sr][sc] = true;\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (rooms[cell[0]][cell[1]] == 0) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length || visited[nr][nc] || rooms[nr][nc] == -1) continue;\n        visited[nr][nc] = true;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return INF;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private static final int INF = 2147483647;\n\n  public void wallsAndGates(int[][] rooms) {\n    if (rooms == null || rooms.length == 0 || rooms[0].length == 0) return;\n\n    Queue<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) queue.offer(new int[] {r, c});\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length || rooms[nr][nc] != INF) continue;\n        rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private static final int INF = 2147483647;\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public void wallsAndGates(int[][] rooms) {\n    if (rooms == null || rooms.length == 0 || rooms[0].length == 0) return;\n\n    Queue<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) queue.offer(new int[] {r, c});\n      }\n    }\n    bfs(rooms, queue);\n  }\n\n  private void bfs(int[][] rooms, Queue<int[]> queue) {\n    if (queue.isEmpty()) return;\n\n    int[] cell = queue.poll();\n    for (int[] d : dirs) {\n      int nr = cell[0] + d[0], nc = cell[1] + d[1];\n      if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length || rooms[nr][nc] != INF) continue;\n      rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;\n      queue.offer(new int[] {nr, nc});\n    }\n    bfs(rooms, queue);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private static final int INF = 2147483647;\n\n  public void wallsAndGates(int[][] rooms) {\n    if (rooms == null || rooms.length == 0 || rooms[0].length == 0) return;\n\n    Queue<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) queue.offer(new int[] {r, c});\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length || rooms[nr][nc] != INF) continue;\n        rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private static final int INF = 2147483647;\n\n  public void wallsAndGates(int[][] rooms) {\n    if (rooms == null || rooms.length == 0 || rooms[0].length == 0) return;\n\n    Queue<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) queue.offer(new int[] {r, c});\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length || rooms[nr][nc] != INF) continue;\n        rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "01 Matrix",
      "difficulty": "Medium",
      "subpattern": "Multi-source BFS distance matrix",
      "question": "Given an m x n binary matrix mat, return a matrix where each cell contains the distance to the nearest 0. Distance between adjacent cells is 1.",
      "trigger": "Every zero is a distance-0 source, and nearest distances in an unweighted grid are found by multi-source BFS.",
      "intuition": "Enqueue all zero cells first. Treat one cells as unvisited. BFS outward and assign each neighbor current distance plus one.",
      "edgeCases": "All zeros, one zero, one row, one column, zeros on edges, large block of ones between zeros.",
      "constraints": "1 <= m, n <= 10000 total cells; mat[i][j] is 0 or 1; at least one 0 exists.",
      "source": {
        "label": "01 Matrix - LeetCode 542",
        "url": "https://leetcode.com/problems/01-matrix/"
      },
      "examples": [
        {
          "input": "mat = [[0,0,0],[0,1,0],[0,0,0]]",
          "output": "[[0,0,0],[0,1,0],[0,0,0]]",
          "explanation": "The center cell is one step from a zero."
        },
        {
          "input": "mat = [[0,0,0],[0,1,0],[1,1,1]]",
          "output": "[[0,0,0],[0,1,0],[1,2,1]]",
          "explanation": "BFS expands from all zeros at once."
        },
        {
          "input": "mat = [[1,0,1]]",
          "output": "[[1,0,1]]",
          "explanation": "Both ones are adjacent to the zero."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Run BFS from each one-cell separately to find the nearest zero.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Multi-source BFS visits each cell at most once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive BFS layer processing uses queue storage plus call stack.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int[][] answer = new int[mat.length][mat[0].length];\n\n    for (int r = 0; r < mat.length; r++) {\n      for (int c = 0; c < mat[0].length; c++) {\n        answer[r][c] = mat[r][c] == 0 ? 0 : distanceToZero(mat, r, c);\n      }\n    }\n\n    return answer;\n  }\n\n  private int distanceToZero(int[][] mat, int sr, int sc) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    boolean[][] seen = new boolean[mat.length][mat[0].length];\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {sr, sc, 0});\n    seen[sr][sc] = true;\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (mat[cell[0]][cell[1]] == 0) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == mat.length || nc == mat[0].length || seen[nr][nc]) continue;\n        seen[nr][nc] = true;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] distance = new int[rows][cols];\n    Queue<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      Arrays.fill(distance[r], -1);\n      for (int c = 0; c < cols; c++) {\n        if (mat[r][c] == 0) {\n          distance[r][c] = 0;\n          queue.offer(new int[] {r, c});\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rows || nc == cols || distance[nr][nc] != -1) continue;\n        distance[nr][nc] = distance[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n\n    return distance;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int[][] updateMatrix(int[][] mat) {\n    int[][] distance = new int[mat.length][mat[0].length];\n    Queue<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < mat.length; r++) {\n      Arrays.fill(distance[r], -1);\n      for (int c = 0; c < mat[0].length; c++) {\n        if (mat[r][c] == 0) {\n          distance[r][c] = 0;\n          queue.offer(new int[] {r, c});\n        }\n      }\n    }\n\n    bfs(distance, queue);\n    return distance;\n  }\n\n  private void bfs(int[][] distance, Queue<int[]> queue) {\n    if (queue.isEmpty()) return;\n    int[] cell = queue.poll();\n\n    for (int[] d : dirs) {\n      int nr = cell[0] + d[0], nc = cell[1] + d[1];\n      if (nr < 0 || nc < 0 || nr == distance.length || nc == distance[0].length || distance[nr][nc] != -1) continue;\n      distance[nr][nc] = distance[cell[0]][cell[1]] + 1;\n      queue.offer(new int[] {nr, nc});\n    }\n    bfs(distance, queue);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] distance = new int[rows][cols];\n    Queue<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      Arrays.fill(distance[r], -1);\n      for (int c = 0; c < cols; c++) {\n        if (mat[r][c] == 0) {\n          distance[r][c] = 0;\n          queue.offer(new int[] {r, c});\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rows || nc == cols || distance[nr][nc] != -1) continue;\n        distance[nr][nc] = distance[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n\n    return distance;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int rows = mat.length;\n    int cols = mat[0].length;\n    int[][] distance = new int[rows][cols];\n    Queue<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      Arrays.fill(distance[r], -1);\n      for (int c = 0; c < cols; c++) {\n        if (mat[r][c] == 0) {\n          distance[r][c] = 0;\n          queue.offer(new int[] {r, c});\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rows || nc == cols || distance[nr][nc] != -1) continue;\n        distance[nr][nc] = distance[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n\n    return distance;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Binary Tree Level Order Traversal",
      "difficulty": "Medium",
      "subpattern": "Tree BFS level queue",
      "question": "Given the root of a binary tree, return the level order traversal of its node values from left to right, level by level.",
      "trigger": "Level order means nodes must be processed by distance from the root, which is exactly BFS with a queue.",
      "intuition": "Queue the root. For each level, process the current queue size, append children to the queue, and collect values for that level.",
      "edgeCases": "Empty tree, one node, only left children, only right children, complete tree, uneven last level.",
      "constraints": "0 <= number of nodes <= 2000; -1000 <= Node.val <= 1000.",
      "source": {
        "label": "Binary Tree Level Order Traversal - LeetCode 102",
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "[[3],[9,20],[15,7]]",
          "explanation": "Nodes are grouped by tree depth."
        },
        {
          "input": "root = [1]",
          "output": "[[1]]",
          "explanation": "A single node is one level."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "An empty tree has no levels."
        }
      ],
      "bruteForceComplexity": "Time O(n*h); Space O(h) recursion stack. Collect each depth by scanning recursively for that target depth.",
      "optimizedComplexity": "Time O(n); Space O(w), where w is maximum tree width. Each node is enqueued once.",
      "recursiveComplexity": "Time O(n); Space O(h) recursion stack plus output. DFS can place values into lists by depth.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    int height = height(root);\n\n    for (int level = 0; level < height; level++) {\n      List<Integer> values = new ArrayList<>();\n      collect(root, level, values);\n      result.add(values);\n    }\n\n    return result;\n  }\n\n  private int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n  }\n\n  private void collect(TreeNode node, int level, List<Integer> values) {\n    if (node == null) return;\n    if (level == 0) values.add(node.val);\n    else {\n      collect(node.left, level - 1, values);\n      collect(node.right, level - 1, values);\n    }\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List<Integer> level = new ArrayList<>();\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n\n      result.add(level);\n    }\n\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    dfs(root, 0, result);\n    return result;\n  }\n\n  private void dfs(TreeNode node, int depth, List<List<Integer>> result) {\n    if (node == null) return;\n\n    if (depth == result.size()) result.add(new ArrayList<>());\n    result.get(depth).add(node.val);\n\n    dfs(node.left, depth + 1, result);\n    dfs(node.right, depth + 1, result);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List<Integer> level = new ArrayList<>();\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n\n      result.add(level);\n    }\n\n    return result;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List<Integer> level = new ArrayList<>();\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n\n      result.add(level);\n    }\n\n    return result;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Zigzag Level Order Traversal",
      "difficulty": "Medium",
      "subpattern": "BFS level queue with deque ordering",
      "question": "Given the root of a binary tree, return the zigzag level order traversal of its node values, alternating left-to-right and right-to-left at each level.",
      "trigger": "The traversal is still level order BFS, but each level alternates insertion direction, which a deque/list supports cleanly.",
      "intuition": "Run normal BFS by levels. For left-to-right levels append values at the end; for right-to-left levels insert at the front.",
      "edgeCases": "Empty tree, one node, uneven levels, only one child on a level, alternating direction correctness.",
      "constraints": "0 <= number of nodes <= 2000; -100 <= Node.val <= 100.",
      "source": {
        "label": "Binary Tree Zigzag Level Order Traversal - LeetCode 103",
        "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
      },
      "examples": [
        {
          "input": "root = [3,9,20,null,null,15,7]",
          "output": "[[3],[20,9],[15,7]]",
          "explanation": "The second level is read right-to-left."
        },
        {
          "input": "root = [1]",
          "output": "[[1]]",
          "explanation": "A single level is unchanged."
        },
        {
          "input": "root = []",
          "output": "[]",
          "explanation": "No nodes means no levels."
        }
      ],
      "bruteForceComplexity": "Time O(n*w) if inserting at the front of an ArrayList for wide levels; Space O(w).",
      "optimizedComplexity": "Time O(n); Space O(w). A deque builds each level in O(1) insertion per node.",
      "recursiveComplexity": "Time O(n); Space O(h) recursion stack plus output. DFS can add values by depth and direction.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    boolean reverse = false;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      List<Integer> level = new ArrayList<>();\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (reverse) level.add(0, node.val);\n        else level.add(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n      result.add(level);\n      reverse = !reverse;\n    }\n    return result;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    boolean leftToRight = true;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      LinkedList<Integer> level = new LinkedList<>();\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (leftToRight) level.addLast(node.val);\n        else level.addFirst(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n\n      result.add(level);\n      leftToRight = !leftToRight;\n    }\n\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    dfs(root, 0, result);\n    return result;\n  }\n\n  private void dfs(TreeNode node, int depth, List<List<Integer>> result) {\n    if (node == null) return;\n\n    if (depth == result.size()) result.add(new LinkedList<>());\n    LinkedList<Integer> level = (LinkedList<Integer>) result.get(depth);\n    if (depth % 2 == 0) level.addLast(node.val);\n    else level.addFirst(node.val);\n\n    dfs(node.left, depth + 1, result);\n    dfs(node.right, depth + 1, result);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    boolean leftToRight = true;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      LinkedList<Integer> level = new LinkedList<>();\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (leftToRight) level.addLast(node.val);\n        else level.addFirst(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n\n      result.add(level);\n      leftToRight = !leftToRight;\n    }\n\n    return result;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\nclass Solution {\n  public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    boolean leftToRight = true;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      LinkedList<Integer> level = new LinkedList<>();\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (leftToRight) level.addLast(node.val);\n        else level.addFirst(node.val);\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n\n      result.add(level);\n      leftToRight = !leftToRight;\n    }\n\n    return result;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Snakes and Ladders",
      "difficulty": "Medium",
      "subpattern": "Shortest path BFS on board states",
      "question": "Given an n x n snakes and ladders board, return the minimum number of dice moves needed to reach square n^2 from square 1. If impossible, return -1.",
      "trigger": "Each dice roll is one unweighted move between board states, so the minimum number of rolls is found by BFS.",
      "intuition": "BFS from square 1. For each square, try dice outcomes 1 through 6, apply snake or ladder jump once, and visit unvisited destination squares.",
      "edgeCases": "Destination reached in one roll, snake/ladder near end, board coordinate zigzag mapping, cycles caused by snakes/ladders, no possible route.",
      "constraints": "2 <= n <= 20; board[i][j] is -1 or a square number; squares 1 and n^2 do not have snakes or ladders.",
      "source": {
        "label": "Snakes and Ladders - LeetCode 909",
        "url": "https://leetcode.com/problems/snakes-and-ladders/"
      },
      "examples": [
        {
          "input": "board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]",
          "output": "4",
          "explanation": "BFS finds the shortest dice sequence."
        },
        {
          "input": "board = [[-1,-1],[-1,3]]",
          "output": "1",
          "explanation": "A roll can reach the final square."
        },
        {
          "input": "board = [[-1,4],[-1,3]]",
          "output": "1",
          "explanation": "A ladder can move directly toward the end."
        }
      ],
      "bruteForceComplexity": "Time exponential without visited state tracking; Space O(n^2). Paths can revisit board states repeatedly.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). Each square is visited once and each visit checks up to six rolls.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Recursive BFS layers use queue storage plus recursion depth.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int snakesAndLadders(int[][] board) {\n    return bfs(board);\n  }\n\n  private int bfs(int[][] board) {\n    int n = board.length;\n    boolean[] visited = new boolean[n * n + 1];\n    Queue<Integer> queue = new ArrayDeque<>();\n    queue.offer(1);\n    visited[1] = true;\n    int moves = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int square = queue.poll();\n        if (square == n * n) return moves;\n        for (int next = square + 1; next <= Math.min(square + 6, n * n); next++) {\n          int destination = destination(board, next);\n          if (!visited[destination]) {\n            visited[destination] = true;\n            queue.offer(destination);\n          }\n        }\n      }\n      moves++;\n    }\n    return -1;\n  }\n\n  private int destination(int[][] board, int square) {\n    int n = board.length;\n    int rowFromBottom = (square - 1) / n;\n    int row = n - 1 - rowFromBottom;\n    int col = (square - 1) % n;\n    if (rowFromBottom % 2 == 1) col = n - 1 - col;\n    return board[row][col] == -1 ? square : board[row][col];\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int snakesAndLadders(int[][] board) {\n    int n = board.length;\n    boolean[] visited = new boolean[n * n + 1];\n    Queue<Integer> queue = new ArrayDeque<>();\n    queue.offer(1);\n    visited[1] = true;\n    int moves = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int square = queue.poll();\n        if (square == n * n) return moves;\n\n        for (int roll = 1; roll <= 6 && square + roll <= n * n; roll++) {\n          int next = square + roll;\n          int destination = getDestination(board, next);\n          if (visited[destination]) continue;\n          visited[destination] = true;\n          queue.offer(destination);\n        }\n      }\n      moves++;\n    }\n\n    return -1;\n  }\n\n  private int getDestination(int[][] board, int square) {\n    int n = board.length;\n    int rowFromBottom = (square - 1) / n;\n    int row = n - 1 - rowFromBottom;\n    int col = (square - 1) % n;\n    if (rowFromBottom % 2 == 1) col = n - 1 - col;\n    return board[row][col] == -1 ? square : board[row][col];\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int snakesAndLadders(int[][] board) {\n    Queue<Integer> queue = new ArrayDeque<>();\n    boolean[] visited = new boolean[board.length * board.length + 1];\n    queue.offer(1);\n    visited[1] = true;\n    return bfs(board, queue, visited, 0);\n  }\n\n  private int bfs(int[][] board, Queue<Integer> queue, boolean[] visited, int moves) {\n    if (queue.isEmpty()) return -1;\n    int n = board.length;\n    int size = queue.size();\n\n    for (int i = 0; i < size; i++) {\n      int square = queue.poll();\n      if (square == n * n) return moves;\n      for (int roll = 1; roll <= 6 && square + roll <= n * n; roll++) {\n        int destination = getDestination(board, square + roll);\n        if (!visited[destination]) {\n          visited[destination] = true;\n          queue.offer(destination);\n        }\n      }\n    }\n    return bfs(board, queue, visited, moves + 1);\n  }\n\n  private int getDestination(int[][] board, int square) {\n    int n = board.length;\n    int rowFromBottom = (square - 1) / n;\n    int row = n - 1 - rowFromBottom;\n    int col = (square - 1) % n;\n    if (rowFromBottom % 2 == 1) col = n - 1 - col;\n    return board[row][col] == -1 ? square : board[row][col];\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int snakesAndLadders(int[][] board) {\n    int n = board.length;\n    boolean[] visited = new boolean[n * n + 1];\n    Queue<Integer> queue = new ArrayDeque<>();\n    queue.offer(1);\n    visited[1] = true;\n    int moves = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int square = queue.poll();\n        if (square == n * n) return moves;\n\n        for (int roll = 1; roll <= 6 && square + roll <= n * n; roll++) {\n          int next = square + roll;\n          int destination = getDestination(board, next);\n          if (visited[destination]) continue;\n          visited[destination] = true;\n          queue.offer(destination);\n        }\n      }\n      moves++;\n    }\n\n    return -1;\n  }\n\n  private int getDestination(int[][] board, int square) {\n    int n = board.length;\n    int rowFromBottom = (square - 1) / n;\n    int row = n - 1 - rowFromBottom;\n    int col = (square - 1) % n;\n    if (rowFromBottom % 2 == 1) col = n - 1 - col;\n    return board[row][col] == -1 ? square : board[row][col];\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int snakesAndLadders(int[][] board) {\n    int n = board.length;\n    boolean[] visited = new boolean[n * n + 1];\n    Queue<Integer> queue = new ArrayDeque<>();\n    queue.offer(1);\n    visited[1] = true;\n    int moves = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int square = queue.poll();\n        if (square == n * n) return moves;\n\n        for (int roll = 1; roll <= 6 && square + roll <= n * n; roll++) {\n          int next = square + roll;\n          int destination = getDestination(board, next);\n          if (visited[destination]) continue;\n          visited[destination] = true;\n          queue.offer(destination);\n        }\n      }\n      moves++;\n    }\n\n    return -1;\n  }\n\n  private int getDestination(int[][] board, int square) {\n    int n = board.length;\n    int rowFromBottom = (square - 1) / n;\n    int row = n - 1 - rowFromBottom;\n    int col = (square - 1) % n;\n    if (rowFromBottom % 2 == 1) col = n - 1 - col;\n    return board[row][col] == -1 ? square : board[row][col];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Bus Routes",
      "difficulty": "Hard",
      "subpattern": "BFS over routes and stops",
      "question": "Given bus routes where routes[i] lists stops on bus i, and source and target stops, return the minimum number of buses needed to travel from source to target. Return -1 if impossible.",
      "trigger": "Taking one bus is one BFS layer. Stops connect to routes, and routes connect to more stops, forming an unweighted graph of bus transfers.",
      "intuition": "Map each stop to buses that visit it. BFS starts at source stop. Each layer boards one more bus and explores every stop reachable by those buses.",
      "edgeCases": "Source equals target, no route contains source, target unreachable, many buses sharing one stop, avoiding revisiting routes and stops.",
      "constraints": "1 <= routes.length <= 500; 1 <= routes[i].length <= 100000 total stops; 0 <= stop <= 1000000.",
      "source": {
        "label": "Bus Routes - LeetCode 815",
        "url": "https://leetcode.com/problems/bus-routes/"
      },
      "examples": [
        {
          "input": "routes = [[1,2,7],[3,6,7]], source = 1, target = 6",
          "output": "2",
          "explanation": "Take bus 0 to stop 7, then bus 1 to stop 6."
        },
        {
          "input": "routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12",
          "output": "-1",
          "explanation": "No sequence of buses connects the stops."
        },
        {
          "input": "routes = [[1,7]], source = 1, target = 1",
          "output": "0",
          "explanation": "Already at the target."
        }
      ],
      "bruteForceComplexity": "Time O(R*S*transfers) in naive repeated scans; Space O(R+S). Scanning all routes for every stop is expensive.",
      "optimizedComplexity": "Time O(totalStops); Space O(totalStops). Each bus route and reachable stop is processed at most once.",
      "recursiveComplexity": "Time O(totalStops); Space O(totalStops). Recursive BFS layer processing uses the same visited sets plus call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numBusesToDestination(int[][] routes, int source, int target) {\n    if (source == target) return 0;\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    Set<Integer> visitedStops = new HashSet<>();\n    boolean[] usedBus = new boolean[routes.length];\n    queue.offer(source);\n    visitedStops.add(source);\n    int buses = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      buses++;\n      for (int i = 0; i < size; i++) {\n        int stop = queue.poll();\n        for (int bus = 0; bus < routes.length; bus++) {\n          if (usedBus[bus] || !contains(routes[bus], stop)) continue;\n          usedBus[bus] = true;\n          for (int nextStop : routes[bus]) {\n            if (nextStop == target) return buses;\n            if (visitedStops.add(nextStop)) queue.offer(nextStop);\n          }\n        }\n      }\n    }\n    return -1;\n  }\n\n  private boolean contains(int[] route, int stop) {\n    for (int value : route) if (value == stop) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numBusesToDestination(int[][] routes, int source, int target) {\n    if (source == target) return 0;\n\n    Map<Integer, List<Integer>> stopToBuses = new HashMap<>();\n    for (int bus = 0; bus < routes.length; bus++) {\n      for (int stop : routes[bus]) {\n        stopToBuses.computeIfAbsent(stop, unused -> new ArrayList<>()).add(bus);\n      }\n    }\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    Set<Integer> visitedStops = new HashSet<>();\n    boolean[] visitedBuses = new boolean[routes.length];\n    queue.offer(source);\n    visitedStops.add(source);\n    int busesTaken = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      busesTaken++;\n      for (int i = 0; i < size; i++) {\n        int stop = queue.poll();\n        for (int bus : stopToBuses.getOrDefault(stop, Collections.emptyList())) {\n          if (visitedBuses[bus]) continue;\n          visitedBuses[bus] = true;\n          for (int nextStop : routes[bus]) {\n            if (nextStop == target) return busesTaken;\n            if (visitedStops.add(nextStop)) queue.offer(nextStop);\n          }\n        }\n      }\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numBusesToDestination(int[][] routes, int source, int target) {\n    if (source == target) return 0;\n\n    Map<Integer, List<Integer>> stopToBuses = new HashMap<>();\n    for (int bus = 0; bus < routes.length; bus++) {\n      for (int stop : routes[bus]) stopToBuses.computeIfAbsent(stop, x -> new ArrayList<>()).add(bus);\n    }\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    queue.offer(source);\n    Set<Integer> visitedStops = new HashSet<>();\n    visitedStops.add(source);\n    return bfs(routes, target, stopToBuses, queue, visitedStops, new boolean[routes.length], 0);\n  }\n\n  private int bfs(int[][] routes, int target, Map<Integer, List<Integer>> stopToBuses, Queue<Integer> queue, Set<Integer> visitedStops, boolean[] visitedBuses, int busesTaken) {\n    if (queue.isEmpty()) return -1;\n    int size = queue.size();\n\n    for (int i = 0; i < size; i++) {\n      int stop = queue.poll();\n      for (int bus : stopToBuses.getOrDefault(stop, Collections.emptyList())) {\n        if (visitedBuses[bus]) continue;\n        visitedBuses[bus] = true;\n        for (int nextStop : routes[bus]) {\n          if (nextStop == target) return busesTaken + 1;\n          if (visitedStops.add(nextStop)) queue.offer(nextStop);\n        }\n      }\n    }\n    return bfs(routes, target, stopToBuses, queue, visitedStops, visitedBuses, busesTaken + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numBusesToDestination(int[][] routes, int source, int target) {\n    if (source == target) return 0;\n\n    Map<Integer, List<Integer>> stopToBuses = new HashMap<>();\n    for (int bus = 0; bus < routes.length; bus++) {\n      for (int stop : routes[bus]) {\n        stopToBuses.computeIfAbsent(stop, unused -> new ArrayList<>()).add(bus);\n      }\n    }\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    Set<Integer> visitedStops = new HashSet<>();\n    boolean[] visitedBuses = new boolean[routes.length];\n    queue.offer(source);\n    visitedStops.add(source);\n    int busesTaken = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      busesTaken++;\n      for (int i = 0; i < size; i++) {\n        int stop = queue.poll();\n        for (int bus : stopToBuses.getOrDefault(stop, Collections.emptyList())) {\n          if (visitedBuses[bus]) continue;\n          visitedBuses[bus] = true;\n          for (int nextStop : routes[bus]) {\n            if (nextStop == target) return busesTaken;\n            if (visitedStops.add(nextStop)) queue.offer(nextStop);\n          }\n        }\n      }\n    }\n\n    return -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numBusesToDestination(int[][] routes, int source, int target) {\n    if (source == target) return 0;\n\n    Map<Integer, List<Integer>> stopToBuses = new HashMap<>();\n    for (int bus = 0; bus < routes.length; bus++) {\n      for (int stop : routes[bus]) {\n        stopToBuses.computeIfAbsent(stop, unused -> new ArrayList<>()).add(bus);\n      }\n    }\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    Set<Integer> visitedStops = new HashSet<>();\n    boolean[] visitedBuses = new boolean[routes.length];\n    queue.offer(source);\n    visitedStops.add(source);\n    int busesTaken = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      busesTaken++;\n      for (int i = 0; i < size; i++) {\n        int stop = queue.poll();\n        for (int bus : stopToBuses.getOrDefault(stop, Collections.emptyList())) {\n          if (visitedBuses[bus]) continue;\n          visitedBuses[bus] = true;\n          for (int nextStop : routes[bus]) {\n            if (nextStop == target) return busesTaken;\n            if (visitedStops.add(nextStop)) queue.offer(nextStop);\n          }\n        }\n      }\n    }\n\n    return -1;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Reveal Cards in Increasing Order",
      "difficulty": "Medium",
      "subpattern": "Index queue simulation",
      "question": "Given a deck of unique integers, return an ordering of the deck so that repeatedly revealing the top card and moving the next top card to the bottom reveals cards in increasing order.",
      "trigger": "The reveal process repeatedly consumes and rotates positions, which is naturally simulated with a queue of indexes.",
      "intuition": "Sort the card values. Maintain a queue of deck indexes. Place the next smallest card at the next revealed index, then rotate the following index to the back.",
      "edgeCases": "One card, two cards, already sorted deck, reverse sorted deck, odd number of cards, even number of cards.",
      "constraints": "1 <= deck.length <= 1000; 1 <= deck[i] <= 1000000; all deck values are unique.",
      "source": {
        "label": "Reveal Cards in Increasing Order - LeetCode 950",
        "url": "https://leetcode.com/problems/reveal-cards-in-increasing-order/"
      },
      "examples": [
        {
          "input": "deck = [17,13,11,2,3,5,7]",
          "output": "[2,13,3,11,5,17,7]",
          "explanation": "Simulating reveal/move-bottom reveals 2,3,5,7,11,13,17."
        },
        {
          "input": "deck = [1,1000]",
          "output": "[1,1000]",
          "explanation": "Two cards reveal in sorted order as-is."
        },
        {
          "input": "deck = [3]",
          "output": "[3]",
          "explanation": "A single card is already valid."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Simulate the reveal process with list removals from the front.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sorting dominates; queue operations over indexes are O(n).",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursion can assign sorted cards while rotating the index queue.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\nclass Solution {\n  public int[] deckRevealedIncreasing(int[] deck) {\n    Arrays.sort(deck);\n    List<Integer> indexes = new ArrayList<>();\n    for (int i = 0; i < deck.length; i++) indexes.add(i);\n\n    int[] answer = new int[deck.length];\n    for (int card : deck) {\n      int revealIndex = indexes.remove(0);\n      answer[revealIndex] = card;\n      if (!indexes.isEmpty()) indexes.add(indexes.remove(0));\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  public int[] deckRevealedIncreasing(int[] deck) {\n    Arrays.sort(deck);\n    Queue<Integer> indexes = new ArrayDeque<>();\n    for (int i = 0; i < deck.length; i++) indexes.offer(i);\n\n    int[] answer = new int[deck.length];\n    for (int card : deck) {\n      answer[indexes.poll()] = card;\n      if (!indexes.isEmpty()) indexes.offer(indexes.poll());\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  public int[] deckRevealedIncreasing(int[] deck) {\n    Arrays.sort(deck);\n    Queue<Integer> indexes = new ArrayDeque<>();\n    for (int i = 0; i < deck.length; i++) indexes.offer(i);\n\n    int[] answer = new int[deck.length];\n    place(deck, 0, indexes, answer);\n    return answer;\n  }\n\n  private void place(int[] deck, int cardIndex, Queue<Integer> indexes, int[] answer) {\n    if (cardIndex == deck.length) return;\n\n    answer[indexes.poll()] = deck[cardIndex];\n    if (!indexes.isEmpty()) indexes.offer(indexes.poll());\n    place(deck, cardIndex + 1, indexes, answer);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  public int[] deckRevealedIncreasing(int[] deck) {\n    Arrays.sort(deck);\n    Queue<Integer> indexes = new ArrayDeque<>();\n    for (int i = 0; i < deck.length; i++) indexes.offer(i);\n\n    int[] answer = new int[deck.length];\n    for (int card : deck) {\n      answer[indexes.poll()] = card;\n      if (!indexes.isEmpty()) indexes.offer(indexes.poll());\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Queue;\n\nclass Solution {\n  public int[] deckRevealedIncreasing(int[] deck) {\n    Arrays.sort(deck);\n    Queue<Integer> indexes = new ArrayDeque<>();\n    for (int i = 0; i < deck.length; i++) indexes.offer(i);\n\n    int[] answer = new int[deck.length];\n    for (int card : deck) {\n      answer[indexes.poll()] = card;\n      if (!indexes.isEmpty()) indexes.offer(indexes.poll());\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Dota2 Senate",
      "difficulty": "Medium",
      "subpattern": "Two queue round simulation",
      "question": "Given a senate string of R and D senators, predict which party wins. Each senator bans one senator from the other party in cyclic order until only one party remains.",
      "trigger": "Senators act in original cyclic order, so two queues of active indexes can simulate rounds and bans.",
      "intuition": "Queue indexes of Radiant and Dire senators. The smaller index acts first, bans the other, and re-enters with index + n for the next cycle.",
      "edgeCases": "All one party, alternating parties, one senator, early party elimination, long cycles requiring index wrap.",
      "constraints": "1 <= senate.length <= 10000; senate[i] is R or D.",
      "source": {
        "label": "Dota2 Senate - LeetCode 649",
        "url": "https://leetcode.com/problems/dota2-senate/"
      },
      "examples": [
        {
          "input": "senate = \"RD\"",
          "output": "\"Radiant\"",
          "explanation": "R acts first and bans D."
        },
        {
          "input": "senate = \"RDD\"",
          "output": "\"Dire\"",
          "explanation": "Dire eventually has the only active senators."
        },
        {
          "input": "senate = \"RRD\"",
          "output": "\"Radiant\"",
          "explanation": "Radiant keeps enough turns to eliminate Dire."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly scan a mutable senate list and remove banned senators.",
      "optimizedComplexity": "Time O(n); Space O(n). Each active turn removes one senator and requeues one senator.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive queue simulation processes one ban per call.",
      "bruteForceCode": "class Solution {\n  public String predictPartyVictory(String senate) {\n    StringBuilder current = new StringBuilder(senate);\n\n    while (current.indexOf(\"R\") != -1 && current.indexOf(\"D\") != -1) {\n      int radiantBan = 0;\n      int direBan = 0;\n      StringBuilder next = new StringBuilder();\n\n      for (int i = 0; i < current.length(); i++) {\n        char ch = current.charAt(i);\n        if (ch == 'R') {\n          if (radiantBan > 0) radiantBan--;\n          else {\n            direBan++;\n            next.append(ch);\n          }\n        } else {\n          if (direBan > 0) direBan--;\n          else {\n            radiantBan++;\n            next.append(ch);\n          }\n        }\n      }\n      current = next;\n    }\n\n    return current.indexOf(\"R\") != -1 ? \"Radiant\" : \"Dire\";\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    int n = senate.length();\n\n    for (int i = 0; i < n; i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i);\n      else dire.offer(i);\n    }\n\n    while (!radiant.isEmpty() && !dire.isEmpty()) {\n      int r = radiant.poll();\n      int d = dire.poll();\n\n      if (r < d) radiant.offer(r + n);\n      else dire.offer(d + n);\n    }\n\n    return radiant.isEmpty() ? \"Dire\" : \"Radiant\";\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    for (int i = 0; i < senate.length(); i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i);\n      else dire.offer(i);\n    }\n    return winner(radiant, dire, senate.length());\n  }\n\n  private String winner(Queue<Integer> radiant, Queue<Integer> dire, int n) {\n    if (radiant.isEmpty()) return \"Dire\";\n    if (dire.isEmpty()) return \"Radiant\";\n\n    int r = radiant.poll();\n    int d = dire.poll();\n    if (r < d) radiant.offer(r + n);\n    else dire.offer(d + n);\n\n    return winner(radiant, dire, n);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    int n = senate.length();\n\n    for (int i = 0; i < n; i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i);\n      else dire.offer(i);\n    }\n\n    while (!radiant.isEmpty() && !dire.isEmpty()) {\n      int r = radiant.poll();\n      int d = dire.poll();\n\n      if (r < d) radiant.offer(r + n);\n      else dire.offer(d + n);\n    }\n\n    return radiant.isEmpty() ? \"Dire\" : \"Radiant\";\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    int n = senate.length();\n\n    for (int i = 0; i < n; i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i);\n      else dire.offer(i);\n    }\n\n    while (!radiant.isEmpty() && !dire.isEmpty()) {\n      int r = radiant.poll();\n      int d = dire.poll();\n\n      if (r < d) radiant.offer(r + n);\n      else dire.offer(d + n);\n    }\n\n    return radiant.isEmpty() ? \"Dire\" : \"Radiant\";\n  }\n}"
    },
    {
      "group": "more",
      "name": "Time Needed to Buy Tickets",
      "difficulty": "Easy",
      "subpattern": "Queue process simulation",
      "question": "Given tickets where tickets[i] is how many tickets person i wants and an index k, return the time until person k finishes buying tickets. Each second, the front person buys one ticket and goes to the back if they still need more.",
      "trigger": "The statement describes a queue process where people cycle through the front until their ticket count reaches zero.",
      "intuition": "Simulate indexes in a queue, decrementing ticket counts one at a time, until index k buys their last ticket.",
      "edgeCases": "Person k first, person k last, tickets[k] = 1, everyone has same count, people before/after k with fewer tickets.",
      "constraints": "1 <= tickets.length <= 100; 1 <= tickets[i] <= 100; 0 <= k < tickets.length.",
      "source": {
        "label": "Time Needed to Buy Tickets - LeetCode 2073",
        "url": "https://leetcode.com/problems/time-needed-to-buy-tickets/"
      },
      "examples": [
        {
          "input": "tickets = [2,3,2], k = 2",
          "output": "6",
          "explanation": "Person 2 finishes after 6 seconds."
        },
        {
          "input": "tickets = [5,1,1,1], k = 0",
          "output": "8",
          "explanation": "Person 0 needs five turns while others finish earlier."
        },
        {
          "input": "tickets = [1], k = 0",
          "output": "1",
          "explanation": "The only person buys one ticket."
        }
      ],
      "bruteForceComplexity": "Time O(totalTickets); Space O(n). Direct queue simulation processes one ticket per second.",
      "optimizedComplexity": "Time O(n); Space O(1). Count how many tickets each position contributes before person k finishes.",
      "recursiveComplexity": "Time O(totalTickets); Space O(totalTickets) recursion stack for direct process simulation.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int timeRequiredToBuy(int[] tickets, int k) {\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < tickets.length; i++) queue.offer(i);\n\n    int time = 0;\n    while (true) {\n      int person = queue.poll();\n      tickets[person]--;\n      time++;\n\n      if (person == k && tickets[person] == 0) return time;\n      if (tickets[person] > 0) queue.offer(person);\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public int timeRequiredToBuy(int[] tickets, int k) {\n    int time = 0;\n\n    for (int i = 0; i < tickets.length; i++) {\n      if (i <= k) time += Math.min(tickets[i], tickets[k]);\n      else time += Math.min(tickets[i], tickets[k] - 1);\n    }\n\n    return time;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int timeRequiredToBuy(int[] tickets, int k) {\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < tickets.length; i++) queue.offer(i);\n    return simulate(tickets, k, queue, 0);\n  }\n\n  private int simulate(int[] tickets, int k, Queue<Integer> queue, int time) {\n    int person = queue.poll();\n    tickets[person]--;\n    time++;\n\n    if (person == k && tickets[person] == 0) return time;\n    if (tickets[person] > 0) queue.offer(person);\n    return simulate(tickets, k, queue, time);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int timeRequiredToBuy(int[] tickets, int k) {\n    int time = 0;\n\n    for (int i = 0; i < tickets.length; i++) {\n      if (i <= k) time += Math.min(tickets[i], tickets[k]);\n      else time += Math.min(tickets[i], tickets[k] - 1);\n    }\n\n    return time;\n  }\n}",
      "code": "class Solution {\n  public int timeRequiredToBuy(int[] tickets, int k) {\n    int time = 0;\n\n    for (int i = 0; i < tickets.length; i++) {\n      if (i <= k) time += Math.min(tickets[i], tickets[k]);\n      else time += Math.min(tickets[i], tickets[k] - 1);\n    }\n\n    return time;\n  }\n}"
    },
    {
      "group": "more",
      "name": "First Unique Character in a String",
      "difficulty": "Easy",
      "subpattern": "Frequency count with queue of candidates",
      "question": "Given a string s, return the index of the first non-repeating character. If no such character exists, return -1.",
      "trigger": "Characters become invalid unique candidates when their frequency exceeds one, and a queue can keep candidates in arrival order.",
      "intuition": "Count frequencies, then scan in order to find the first character with frequency one. For streaming style, maintain a queue of candidate indexes.",
      "edgeCases": "No unique character, first character unique, unique character at end, all same character, one-character string.",
      "constraints": "1 <= s.length <= 100000; s consists of lowercase English letters.",
      "source": {
        "label": "First Unique Character in a String - LeetCode 387",
        "url": "https://leetcode.com/problems/first-unique-character-in-a-string/"
      },
      "examples": [
        {
          "input": "s = \"leetcode\"",
          "output": "0",
          "explanation": "l is the first unique character."
        },
        {
          "input": "s = \"loveleetcode\"",
          "output": "2",
          "explanation": "v is the first character with frequency one."
        },
        {
          "input": "s = \"aabb\"",
          "output": "-1",
          "explanation": "No character appears exactly once."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). For each character, scan the string to count occurrences.",
      "optimizedComplexity": "Time O(n); Space O(1). Frequency array size is fixed at 26 lowercase letters.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan can build frequencies and find the first unique index.",
      "bruteForceCode": "class Solution {\n  public int firstUniqChar(String s) {\n    for (int i = 0; i < s.length(); i++) {\n      boolean unique = true;\n      for (int j = 0; j < s.length(); j++) {\n        if (i != j && s.charAt(i) == s.charAt(j)) {\n          unique = false;\n          break;\n        }\n      }\n      if (unique) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] frequency = new int[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      frequency[s.charAt(i) - 'a']++;\n    }\n\n    for (int i = 0; i < s.length(); i++) {\n      if (frequency[s.charAt(i) - 'a'] == 1) return i;\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] frequency = new int[26];\n    count(s, 0, frequency);\n    return find(s, 0, frequency);\n  }\n\n  private void count(String s, int index, int[] frequency) {\n    if (index == s.length()) return;\n    frequency[s.charAt(index) - 'a']++;\n    count(s, index + 1, frequency);\n  }\n\n  private int find(String s, int index, int[] frequency) {\n    if (index == s.length()) return -1;\n    if (frequency[s.charAt(index) - 'a'] == 1) return index;\n    return find(s, index + 1, frequency);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] frequency = new int[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      frequency[s.charAt(i) - 'a']++;\n    }\n\n    for (int i = 0; i < s.length(); i++) {\n      if (frequency[s.charAt(i) - 'a'] == 1) return i;\n    }\n\n    return -1;\n  }\n}",
      "code": "class Solution {\n  public int firstUniqChar(String s) {\n    int[] frequency = new int[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      frequency[s.charAt(i) - 'a']++;\n    }\n\n    for (int i = 0; i < s.length(); i++) {\n      if (frequency[s.charAt(i) - 'a'] == 1) return i;\n    }\n\n    return -1;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Hit Counter",
      "difficulty": "Medium",
      "subpattern": "Rolling time-window queue",
      "question": "Design a hit counter that records hits at timestamps and returns the number of hits in the past 5 minutes, meaning timestamps in [timestamp - 299, timestamp]. Timestamps are given in non-decreasing order.",
      "trigger": "Only hits inside a fixed rolling time window matter, so old timestamps should be evicted from the front of a queue.",
      "intuition": "Store hit timestamps in a queue. On hit, append timestamp. On getHits, remove timestamps older than timestamp - 299 and return queue size.",
      "edgeCases": "Multiple hits at same timestamp, no hits, hits exactly 300 seconds old, long idle gap, many expired hits.",
      "constraints": "1 <= timestamp <= 2 * 10^9; calls are in chronological order; design should support hit and getHits.",
      "source": {
        "label": "Design Hit Counter - LeetCode 362",
        "url": "https://leetcode.com/problems/design-hit-counter/"
      },
      "examples": [
        {
          "input": "hit(1), hit(2), hit(3), getHits(4), hit(300), getHits(300), getHits(301)",
          "output": "[null,null,null,3,null,4,3]",
          "explanation": "At timestamp 301, hit at 1 is outside the 5-minute window."
        },
        {
          "input": "getHits(1)",
          "output": "0",
          "explanation": "No hits have been recorded."
        },
        {
          "input": "hit(10), hit(10), getHits(10)",
          "output": "[null,null,2]",
          "explanation": "Multiple hits at the same timestamp are counted separately."
        }
      ],
      "bruteForceComplexity": "hit Time O(1), getHits Time O(n); Space O(n). Store all timestamps and scan them on query.",
      "optimizedComplexity": "Amortized hit Time O(1), getHits Time O(expired hits), Space O(hits in last 300 seconds). Each timestamp is removed once.",
      "recursiveComplexity": "getHits Time O(expired hits), Space O(expired hits) recursion stack if eviction is recursive.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass HitCounter {\n  private final List<Integer> hits = new ArrayList<>();\n\n  public void hit(int timestamp) {\n    hits.add(timestamp);\n  }\n\n  public int getHits(int timestamp) {\n    int count = 0;\n    for (int hit : hits) {\n      if (hit > timestamp - 300 && hit <= timestamp) count++;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass HitCounter {\n  private final Queue<Integer> hits = new ArrayDeque<>();\n\n  public void hit(int timestamp) {\n    hits.offer(timestamp);\n  }\n\n  public int getHits(int timestamp) {\n    while (!hits.isEmpty() && hits.peek() <= timestamp - 300) {\n      hits.poll();\n    }\n    return hits.size();\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass HitCounter {\n  private final Queue<Integer> hits = new ArrayDeque<>();\n\n  public void hit(int timestamp) {\n    hits.offer(timestamp);\n  }\n\n  public int getHits(int timestamp) {\n    removeOld(timestamp - 300);\n    return hits.size();\n  }\n\n  private void removeOld(int oldestAllowedExclusive) {\n    if (hits.isEmpty() || hits.peek() > oldestAllowedExclusive) return;\n    hits.poll();\n    removeOld(oldestAllowedExclusive);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass HitCounter {\n  private final Queue<Integer> hits = new ArrayDeque<>();\n\n  public void hit(int timestamp) {\n    hits.offer(timestamp);\n  }\n\n  public int getHits(int timestamp) {\n    while (!hits.isEmpty() && hits.peek() <= timestamp - 300) {\n      hits.poll();\n    }\n    return hits.size();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass HitCounter {\n  private final Queue<Integer> hits = new ArrayDeque<>();\n\n  public void hit(int timestamp) {\n    hits.offer(timestamp);\n  }\n\n  public int getHits(int timestamp) {\n    while (!hits.isEmpty() && hits.peek() <= timestamp - 300) {\n      hits.poll();\n    }\n    return hits.size();\n  }\n}"
    },
    {
      "group": "more",
      "name": "Design Front Middle Back Queue",
      "difficulty": "Medium",
      "subpattern": "Two-deque balanced queue design",
      "question": "Design a queue that supports pushFront, pushMiddle, pushBack, popFront, popMiddle, and popBack. pop operations return -1 when the queue is empty.",
      "trigger": "Efficient middle operations require splitting the queue into two balanced halves so the middle is always at an end of one deque.",
      "intuition": "Keep left and right deques balanced so left.size() is either equal to right.size() or one larger. The middle is the back of left.",
      "edgeCases": "Empty queue pops, one element, two elements, repeated middle operations, rebalancing after every push/pop.",
      "constraints": "1 <= val <= 10^9; at most 1000 calls are made to operations.",
      "source": {
        "label": "Design Front Middle Back Queue - LeetCode 1670",
        "url": "https://leetcode.com/problems/design-front-middle-back-queue/"
      },
      "examples": [
        {
          "input": "pushFront(1), pushBack(2), pushMiddle(3), pushMiddle(4), popFront(), popMiddle(), popMiddle(), popBack(), popFront()",
          "output": "[null,null,null,null,1,3,4,2,-1]",
          "explanation": "Operations maintain the required front/middle/back behavior."
        },
        {
          "input": "popFront()",
          "output": "-1",
          "explanation": "Popping from an empty queue returns -1."
        },
        {
          "input": "pushMiddle(10), popMiddle()",
          "output": "[null,10]",
          "explanation": "The only element is also the middle."
        }
      ],
      "bruteForceComplexity": "push/pop middle Time O(n), front/back O(1); Space O(n). ArrayList insertion/removal at middle shifts elements.",
      "optimizedComplexity": "Each operation Time O(1) amortized; Space O(n). Two balanced deques expose front, middle, and back.",
      "recursiveComplexity": "Recursive design is not useful here; operations are stateful O(1) deque updates.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass FrontMiddleBackQueue {\n  private final List<Integer> values = new ArrayList<>();\n\n  public void pushFront(int val) { values.add(0, val); }\n  public void pushMiddle(int val) { values.add(values.size() / 2, val); }\n  public void pushBack(int val) { values.add(val); }\n\n  public int popFront() {\n    return values.isEmpty() ? -1 : values.remove(0);\n  }\n\n  public int popMiddle() {\n    if (values.isEmpty()) return -1;\n    return values.remove((values.size() - 1) / 2);\n  }\n\n  public int popBack() {\n    return values.isEmpty() ? -1 : values.remove(values.size() - 1);\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass FrontMiddleBackQueue {\n  private final Deque<Integer> left = new ArrayDeque<>();\n  private final Deque<Integer> right = new ArrayDeque<>();\n\n  public void pushFront(int val) {\n    left.addFirst(val);\n    balance();\n  }\n\n  public void pushMiddle(int val) {\n    if (left.size() > right.size()) right.addFirst(left.removeLast());\n    left.addLast(val);\n  }\n\n  public void pushBack(int val) {\n    right.addLast(val);\n    balance();\n  }\n\n  public int popFront() {\n    if (isEmpty()) return -1;\n    int value = left.isEmpty() ? right.removeFirst() : left.removeFirst();\n    balance();\n    return value;\n  }\n\n  public int popMiddle() {\n    if (isEmpty()) return -1;\n    int value = left.removeLast();\n    balance();\n    return value;\n  }\n\n  public int popBack() {\n    if (isEmpty()) return -1;\n    int value = right.isEmpty() ? left.removeLast() : right.removeLast();\n    balance();\n    return value;\n  }\n\n  private boolean isEmpty() {\n    return left.isEmpty() && right.isEmpty();\n  }\n\n  private void balance() {\n    while (left.size() > right.size() + 1) right.addFirst(left.removeLast());\n    while (left.size() < right.size()) left.addLast(right.removeFirst());\n  }\n}",
      "recursiveCode": "class FrontMiddleBackQueue {\n  private final FrontMiddleBackQueueCore queue = new FrontMiddleBackQueueCore();\n\n  public void pushFront(int val) { queue.pushFront(val); }\n  public void pushMiddle(int val) { queue.pushMiddle(val); }\n  public void pushBack(int val) { queue.pushBack(val); }\n  public int popFront() { return queue.popFront(); }\n  public int popMiddle() { return queue.popMiddle(); }\n  public int popBack() { return queue.popBack(); }\n}\n\nclass FrontMiddleBackQueueCore {\n  private final java.util.Deque<Integer> left = new java.util.ArrayDeque<>();\n  private final java.util.Deque<Integer> right = new java.util.ArrayDeque<>();\n\n  void pushFront(int val) { left.addFirst(val); balance(); }\n  void pushMiddle(int val) { if (left.size() > right.size()) right.addFirst(left.removeLast()); left.addLast(val); }\n  void pushBack(int val) { right.addLast(val); balance(); }\n  int popFront() { if (empty()) return -1; int v = left.isEmpty() ? right.removeFirst() : left.removeFirst(); balance(); return v; }\n  int popMiddle() { if (empty()) return -1; int v = left.removeLast(); balance(); return v; }\n  int popBack() { if (empty()) return -1; int v = right.isEmpty() ? left.removeLast() : right.removeLast(); balance(); return v; }\n  private boolean empty() { return left.isEmpty() && right.isEmpty(); }\n  private void balance() { while (left.size() > right.size() + 1) right.addFirst(left.removeLast()); while (left.size() < right.size()) left.addLast(right.removeFirst()); }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass FrontMiddleBackQueue {\n  private final Deque<Integer> left = new ArrayDeque<>();\n  private final Deque<Integer> right = new ArrayDeque<>();\n\n  public void pushFront(int val) {\n    left.addFirst(val);\n    balance();\n  }\n\n  public void pushMiddle(int val) {\n    if (left.size() > right.size()) right.addFirst(left.removeLast());\n    left.addLast(val);\n  }\n\n  public void pushBack(int val) {\n    right.addLast(val);\n    balance();\n  }\n\n  public int popFront() {\n    if (isEmpty()) return -1;\n    int value = left.isEmpty() ? right.removeFirst() : left.removeFirst();\n    balance();\n    return value;\n  }\n\n  public int popMiddle() {\n    if (isEmpty()) return -1;\n    int value = left.removeLast();\n    balance();\n    return value;\n  }\n\n  public int popBack() {\n    if (isEmpty()) return -1;\n    int value = right.isEmpty() ? left.removeLast() : right.removeLast();\n    balance();\n    return value;\n  }\n\n  private boolean isEmpty() {\n    return left.isEmpty() && right.isEmpty();\n  }\n\n  private void balance() {\n    while (left.size() > right.size() + 1) right.addFirst(left.removeLast());\n    while (left.size() < right.size()) left.addLast(right.removeFirst());\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass FrontMiddleBackQueue {\n  private final Deque<Integer> left = new ArrayDeque<>();\n  private final Deque<Integer> right = new ArrayDeque<>();\n\n  public void pushFront(int val) {\n    left.addFirst(val);\n    balance();\n  }\n\n  public void pushMiddle(int val) {\n    if (left.size() > right.size()) right.addFirst(left.removeLast());\n    left.addLast(val);\n  }\n\n  public void pushBack(int val) {\n    right.addLast(val);\n    balance();\n  }\n\n  public int popFront() {\n    if (isEmpty()) return -1;\n    int value = left.isEmpty() ? right.removeFirst() : left.removeFirst();\n    balance();\n    return value;\n  }\n\n  public int popMiddle() {\n    if (isEmpty()) return -1;\n    int value = left.removeLast();\n    balance();\n    return value;\n  }\n\n  public int popBack() {\n    if (isEmpty()) return -1;\n    int value = right.isEmpty() ? left.removeLast() : right.removeLast();\n    balance();\n    return value;\n  }\n\n  private boolean isEmpty() {\n    return left.isEmpty() && right.isEmpty();\n  }\n\n  private void balance() {\n    while (left.size() > right.size() + 1) right.addFirst(left.removeLast());\n    while (left.size() < right.size()) left.addLast(right.removeFirst());\n  }\n}"
    },
    {
      "group": "more",
      "name": "Task Scheduler With Queue",
      "difficulty": "Medium",
      "subpattern": "Cooldown scheduling with queue",
      "question": "Given CPU tasks represented by letters and a cooldown n, return the least number of intervals needed to finish all tasks so that the same task appears at least n intervals apart.",
      "trigger": "Tasks with remaining counts are chosen by highest frequency, while recently used tasks must wait in a cooldown queue before becoming available again.",
      "intuition": "Use a max heap for available task counts and a queue for tasks cooling down with their next available time. Simulate time until both are empty.",
      "edgeCases": "n = 0, all tasks same, all tasks unique, idle intervals required, multiple tasks tied by frequency.",
      "constraints": "1 <= tasks.length <= 10000; tasks[i] is uppercase English letter; 0 <= n <= 100.",
      "source": {
        "label": "Task Scheduler - LeetCode 621",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      "examples": [
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
          "output": "8",
          "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B."
        },
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0",
          "output": "6",
          "explanation": "No cooldown means no idle intervals are needed."
        },
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"A\",\"B\",\"C\"], n = 2",
          "output": "10",
          "explanation": "The high-frequency A task forces idle time."
        }
      ],
      "bruteForceComplexity": "Time O(time * 26); Space O(26). At each interval, scan all tasks to choose an available one.",
      "optimizedComplexity": "Time O(time log 26); Space O(26). Heap selects available task and queue tracks cooldown.",
      "recursiveComplexity": "Time O(time log 26); Space O(time) recursion stack if simulating one interval per call.",
      "bruteForceCode": "class Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    int[] nextAvailable = new int[26];\n    for (char task : tasks) count[task - 'A']++;\n\n    int remaining = tasks.length;\n    int time = 0;\n    while (remaining > 0) {\n      int best = -1;\n      for (int i = 0; i < 26; i++) {\n        if (count[i] > 0 && nextAvailable[i] <= time && (best == -1 || count[i] > count[best])) best = i;\n      }\n      if (best != -1) {\n        count[best]--;\n        nextAvailable[best] = time + n + 1;\n        remaining--;\n      }\n      time++;\n    }\n    return time;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n\n    Queue<int[]> cooldown = new ArrayDeque<>();\n    int time = 0;\n\n    while (!heap.isEmpty() || !cooldown.isEmpty()) {\n      time++;\n\n      if (!heap.isEmpty()) {\n        int remaining = heap.poll() - 1;\n        if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n      }\n\n      if (!cooldown.isEmpty() && cooldown.peek()[1] == time) {\n        heap.offer(cooldown.poll()[0]);\n      }\n    }\n\n    return time;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n    return simulate(heap, new ArrayDeque<>(), n, 0);\n  }\n\n  private int simulate(PriorityQueue<Integer> heap, Queue<int[]> cooldown, int n, int time) {\n    if (heap.isEmpty() && cooldown.isEmpty()) return time;\n    time++;\n\n    if (!heap.isEmpty()) {\n      int remaining = heap.poll() - 1;\n      if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n    }\n    if (!cooldown.isEmpty() && cooldown.peek()[1] == time) heap.offer(cooldown.poll()[0]);\n\n    return simulate(heap, cooldown, n, time);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n\n    Queue<int[]> cooldown = new ArrayDeque<>();\n    int time = 0;\n\n    while (!heap.isEmpty() || !cooldown.isEmpty()) {\n      time++;\n\n      if (!heap.isEmpty()) {\n        int remaining = heap.poll() - 1;\n        if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n      }\n\n      if (!cooldown.isEmpty() && cooldown.peek()[1] == time) {\n        heap.offer(cooldown.poll()[0]);\n      }\n    }\n\n    return time;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\nclass Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] frequency = new int[26];\n    for (char task : tasks) frequency[task - 'A']++;\n\n    PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);\n    for (int count : frequency) if (count > 0) heap.offer(count);\n\n    Queue<int[]> cooldown = new ArrayDeque<>();\n    int time = 0;\n\n    while (!heap.isEmpty() || !cooldown.isEmpty()) {\n      time++;\n\n      if (!heap.isEmpty()) {\n        int remaining = heap.poll() - 1;\n        if (remaining > 0) cooldown.offer(new int[] {remaining, time + n});\n      }\n\n      if (!cooldown.isEmpty() && cooldown.peek()[1] == time) {\n        heap.offer(cooldown.poll()[0]);\n      }\n    }\n\n    return time;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Shortest Path in Binary Matrix",
      "difficulty": "Medium",
      "subpattern": "8-direction grid BFS shortest path",
      "question": "Given an n x n binary matrix grid, return the length of the shortest clear path from top-left to bottom-right. A clear path uses only 0 cells and can move in 8 directions. Return -1 if no path exists.",
      "trigger": "All valid moves have equal cost, so the shortest path in the grid is found by BFS.",
      "intuition": "Start BFS from (0,0) if clear. Explore 8 neighbors level by level and return distance when the bottom-right cell is reached.",
      "edgeCases": "Start blocked, end blocked, n = 1, diagonal-only path, no path, all zeros.",
      "constraints": "1 <= n <= 100; grid[i][j] is 0 or 1.",
      "source": {
        "label": "Shortest Path in Binary Matrix - LeetCode 1091",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
      },
      "examples": [
        {
          "input": "grid = [[0,1],[1,0]]",
          "output": "2",
          "explanation": "Move diagonally from start to end."
        },
        {
          "input": "grid = [[0,0,0],[1,1,0],[1,1,0]]",
          "output": "4",
          "explanation": "BFS finds a length-4 clear path."
        },
        {
          "input": "grid = [[1,0,0],[1,1,0],[1,1,0]]",
          "output": "-1",
          "explanation": "The start cell is blocked."
        }
      ],
      "bruteForceComplexity": "Time exponential without visited tracking; Space O(n^2). Repeated path exploration revisits cells.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). Each cell is enqueued at most once.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Recursive BFS layers use queue storage and call stack.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    return bfs(grid);\n  }\n\n  private int bfs(int[][] grid) {\n    if (grid[0][0] == 1) return -1;\n    int n = grid.length;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0, 1});\n    grid[0][0] = 1;\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (cell[0] == n - 1 && cell[1] == n - 1) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 1) continue;\n        grid[nr][nc] = 1;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0});\n    grid[0][0] = 1;\n    int distance = 1;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        if (cell[0] == n - 1 && cell[1] == n - 1) return distance;\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] != 0) continue;\n          grid[nr][nc] = 1;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      distance++;\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0});\n    grid[0][0] = 1;\n    return bfs(grid, queue, 1);\n  }\n\n  private int bfs(int[][] grid, Queue<int[]> queue, int distance) {\n    if (queue.isEmpty()) return -1;\n    int n = grid.length;\n    int size = queue.size();\n\n    for (int i = 0; i < size; i++) {\n      int[] cell = queue.poll();\n      if (cell[0] == n - 1 && cell[1] == n - 1) return distance;\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] != 0) continue;\n        grid[nr][nc] = 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n    return bfs(grid, queue, distance + 1);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0});\n    grid[0][0] = 1;\n    int distance = 1;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        if (cell[0] == n - 1 && cell[1] == n - 1) return distance;\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] != 0) continue;\n          grid[nr][nc] = 1;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      distance++;\n    }\n\n    return -1;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0});\n    grid[0][0] = 1;\n    int distance = 1;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        if (cell[0] == n - 1 && cell[1] == n - 1) return distance;\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] != 0) continue;\n          grid[nr][nc] = 1;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      distance++;\n    }\n\n    return -1;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Minimum Genetic Mutation",
      "difficulty": "Medium",
      "subpattern": "BFS shortest mutation path",
      "question": "Given startGene, endGene, and a bank of valid genes, return the minimum number of single-character mutations needed to transform startGene into endGene. Each intermediate gene must be in bank.",
      "trigger": "Each valid mutation is one unweighted edge between gene strings, so the minimum mutation count is a BFS shortest path.",
      "intuition": "BFS from startGene. For each gene, try replacing each position with A/C/G/T and enqueue valid unvisited bank genes.",
      "edgeCases": "endGene not in bank, start equals end, one-step mutation, no path, repeated generated genes.",
      "constraints": "0 <= bank.length <= 10; gene strings have length 8 and contain only A, C, G, T.",
      "source": {
        "label": "Minimum Genetic Mutation - LeetCode 433",
        "url": "https://leetcode.com/problems/minimum-genetic-mutation/"
      },
      "examples": [
        {
          "input": "startGene = \"AACCGGTT\", endGene = \"AACCGGTA\", bank = [\"AACCGGTA\"]",
          "output": "1",
          "explanation": "One valid mutation reaches the target."
        },
        {
          "input": "startGene = \"AACCGGTT\", endGene = \"AAACGGTA\", bank = [\"AACCGGTA\",\"AACCGCTA\",\"AAACGGTA\"]",
          "output": "2",
          "explanation": "Two bank-valid mutations are needed."
        },
        {
          "input": "startGene = \"AAAAACCC\", endGene = \"AACCCCCC\", bank = [\"AAAACCCC\",\"AAACCCCC\",\"AACCCCCC\"]",
          "output": "3",
          "explanation": "BFS finds the shortest chain of three mutations."
        }
      ],
      "bruteForceComplexity": "Time O(B^2 * L); Space O(B). Build graph by comparing every pair of bank genes.",
      "optimizedComplexity": "Time O(B * L * 4); Space O(B). BFS generates possible one-step mutations directly.",
      "recursiveComplexity": "Time O(B * L * 4); Space O(B). Recursive BFS layer processing uses queue and visited set.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minMutation(String startGene, String endGene, String[] bank) {\n    Set<String> valid = new HashSet<>(Arrays.asList(bank));\n    if (!valid.contains(endGene)) return -1;\n\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(startGene);\n    visited.add(startGene);\n    int steps = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String gene = queue.poll();\n        if (gene.equals(endGene)) return steps;\n        for (String next : bank) {\n          if (!visited.contains(next) && differsByOne(gene, next)) {\n            visited.add(next);\n            queue.offer(next);\n          }\n        }\n      }\n      steps++;\n    }\n    return -1;\n  }\n\n  private boolean differsByOne(String a, String b) {\n    int diff = 0;\n    for (int i = 0; i < a.length(); i++) if (a.charAt(i) != b.charAt(i)) diff++;\n    return diff == 1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minMutation(String startGene, String endGene, String[] bank) {\n    Set<String> valid = new HashSet<>(Arrays.asList(bank));\n    if (!valid.contains(endGene)) return -1;\n\n    char[] choices = {'A', 'C', 'G', 'T'};\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(startGene);\n    visited.add(startGene);\n    int mutations = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String gene = queue.poll();\n        if (gene.equals(endGene)) return mutations;\n\n        char[] chars = gene.toCharArray();\n        for (int pos = 0; pos < chars.length; pos++) {\n          char original = chars[pos];\n          for (char choice : choices) {\n            chars[pos] = choice;\n            String next = new String(chars);\n            if (valid.contains(next) && visited.add(next)) queue.offer(next);\n          }\n          chars[pos] = original;\n        }\n      }\n      mutations++;\n    }\n\n    return -1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final char[] choices = {'A', 'C', 'G', 'T'};\n\n  public int minMutation(String startGene, String endGene, String[] bank) {\n    Set<String> valid = new HashSet<>(Arrays.asList(bank));\n    if (!valid.contains(endGene)) return -1;\n\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(startGene);\n    visited.add(startGene);\n    return bfs(queue, visited, valid, endGene, 0);\n  }\n\n  private int bfs(Queue<String> queue, Set<String> visited, Set<String> valid, String endGene, int mutations) {\n    if (queue.isEmpty()) return -1;\n    int size = queue.size();\n\n    for (int i = 0; i < size; i++) {\n      String gene = queue.poll();\n      if (gene.equals(endGene)) return mutations;\n      char[] chars = gene.toCharArray();\n      for (int pos = 0; pos < chars.length; pos++) {\n        char original = chars[pos];\n        for (char choice : choices) {\n          chars[pos] = choice;\n          String next = new String(chars);\n          if (valid.contains(next) && visited.add(next)) queue.offer(next);\n        }\n        chars[pos] = original;\n      }\n    }\n    return bfs(queue, visited, valid, endGene, mutations + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minMutation(String startGene, String endGene, String[] bank) {\n    Set<String> valid = new HashSet<>(Arrays.asList(bank));\n    if (!valid.contains(endGene)) return -1;\n\n    char[] choices = {'A', 'C', 'G', 'T'};\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(startGene);\n    visited.add(startGene);\n    int mutations = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String gene = queue.poll();\n        if (gene.equals(endGene)) return mutations;\n\n        char[] chars = gene.toCharArray();\n        for (int pos = 0; pos < chars.length; pos++) {\n          char original = chars[pos];\n          for (char choice : choices) {\n            chars[pos] = choice;\n            String next = new String(chars);\n            if (valid.contains(next) && visited.add(next)) queue.offer(next);\n          }\n          chars[pos] = original;\n        }\n      }\n      mutations++;\n    }\n\n    return -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minMutation(String startGene, String endGene, String[] bank) {\n    Set<String> valid = new HashSet<>(Arrays.asList(bank));\n    if (!valid.contains(endGene)) return -1;\n\n    char[] choices = {'A', 'C', 'G', 'T'};\n    Queue<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.offer(startGene);\n    visited.add(startGene);\n    int mutations = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String gene = queue.poll();\n        if (gene.equals(endGene)) return mutations;\n\n        char[] chars = gene.toCharArray();\n        for (int pos = 0; pos < chars.length; pos++) {\n          char original = chars[pos];\n          for (char choice : choices) {\n            chars[pos] = choice;\n            String next = new String(chars);\n            if (valid.contains(next) && visited.add(next)) queue.offer(next);\n          }\n          chars[pos] = original;\n        }\n      }\n      mutations++;\n    }\n\n    return -1;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Find Bottom Left Tree Value",
      "difficulty": "Medium",
      "subpattern": "BFS level tracking",
      "question": "Given the root of a binary tree, return the leftmost value in the last row of the tree.",
      "trigger": "The last row is naturally discovered by level-order BFS, and the first node processed in each level is its leftmost value.",
      "intuition": "Process BFS by levels and record the first node value at each level. After the final level, that recorded value is the answer.",
      "edgeCases": "Single node, deepest node on left, deepest node on right, skewed tree, incomplete final level.",
      "constraints": "1 <= number of nodes <= 10000; -2^31 <= Node.val <= 2^31 - 1.",
      "source": {
        "label": "Find Bottom Left Tree Value - LeetCode 513",
        "url": "https://leetcode.com/problems/find-bottom-left-tree-value/"
      },
      "examples": [
        {
          "input": "root = [2,1,3]",
          "output": "1",
          "explanation": "The last row is [1,3], and 1 is leftmost."
        },
        {
          "input": "root = [1,2,3,4,null,5,6,null,null,7]",
          "output": "7",
          "explanation": "The deepest row starts with 7."
        },
        {
          "input": "root = [1]",
          "output": "1",
          "explanation": "The root is also the bottom-left value."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(h). DFS records the first value seen at each depth.",
      "optimizedComplexity": "Time O(n); Space O(w), where w is maximum tree width. BFS processes nodes level by level.",
      "recursiveComplexity": "Time O(n); Space O(h). Recursive DFS tracks maximum depth and first value at that depth.",
      "bruteForceCode": "class Solution {\n  private int bestDepth = -1;\n  private int answer;\n\n  public int findBottomLeftValue(TreeNode root) {\n    dfs(root, 0);\n    return answer;\n  }\n\n  private void dfs(TreeNode node, int depth) {\n    if (node == null) return;\n    if (depth > bestDepth) {\n      bestDepth = depth;\n      answer = node.val;\n    }\n    dfs(node.left, depth + 1);\n    dfs(node.right, depth + 1);\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int findBottomLeftValue(TreeNode root) {\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int answer = root.val;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      answer = queue.peek().val;\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  private int bestDepth = -1;\n  private int answer;\n\n  public int findBottomLeftValue(TreeNode root) {\n    search(root, 0);\n    return answer;\n  }\n\n  private void search(TreeNode node, int depth) {\n    if (node == null) return;\n\n    if (depth > bestDepth) {\n      bestDepth = depth;\n      answer = node.val;\n    }\n\n    search(node.left, depth + 1);\n    search(node.right, depth + 1);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int findBottomLeftValue(TreeNode root) {\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int answer = root.val;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      answer = queue.peek().val;\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\nclass Solution {\n  public int findBottomLeftValue(TreeNode root) {\n    Queue<TreeNode> queue = new ArrayDeque<>();\n    queue.offer(root);\n    int answer = root.val;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      answer = queue.peek().val;\n\n      for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n      }\n    }\n\n    return answer;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Queue & Deque signal in ordering, state transition, connectivity, range, or repeated decision work.",
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
    "A hidden Queue & Deque problem with duplicates and boundary indexes.",
    "A Queue & Deque problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Queue & Deque but needs one helper structure.",
    "A maximum-constraint version of a familiar Queue & Deque problem.",
    "A recognition test where the statement does not mention Queue & Deque."
  ]
};
