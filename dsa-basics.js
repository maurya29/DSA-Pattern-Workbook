(function () {
  const topicIndex = document.querySelector('#basicsTopicIndex');
  const content = document.querySelector('#basicsContent');
  const stats = document.querySelector('#basicsStats');

  if (!topicIndex || !content || !stats) return;

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function highlightJava(code) {
    const escaped = escapeHtml(code.trim());
    const tokens = [];
    let marked = escaped.replace(/(&quot;.*?&quot;|'.*?'|\/\/.*?$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const index = tokens.push(match) - 1;
      return `@@TOKEN_${index}@@`;
    });

    marked = marked
      .replace(/\b(import|class|interface|private|public|protected|static|final|void|int|long|double|boolean|char|new|return|if|else|for|while|do|switch|case|break|continue|true|false|null|this|extends|implements)\b/g, '<span class="java-keyword">$1</span>')
      .replace(/\b(String|StringBuilder|Integer|Long|Double|Boolean|Character|List|ArrayList|LinkedList|Map|HashMap|Set|HashSet|TreeSet|Queue|Deque|ArrayDeque|Stack|PriorityQueue|Arrays|Collections|Comparator|Node|TreeNode|ListNode|TrieNode|DSU)\b/g, '<span class="java-type">$1</span>')
      .replace(/\b\d+\b/g, '<span class="java-number">$&</span>')
      .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="java-method">$1</span>');

    return marked.replace(/@@TOKEN_(\d+)@@/g, (_, index) => {
      const token = tokens[Number(index)];
      if (token.startsWith('//') || token.startsWith('/*')) return `<span class="java-comment">${token}</span>`;
      return `<span class="java-string">${token}</span>`;
    });
  }

  const topics = [
    {
      title: 'Arrays',
      summary: 'Daily templates for scanning, inserting, deleting, reversing, and prefix sums.',
      rows: [
        {
          name: 'Traverse Array',
          use: 'Read every element once.',
          operations: 'Forward scan, index scan, enhanced for-loop.',
          code: `class ArrayTraversal {
  static void traverse(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
      int value = nums[i];
      System.out.println(i + " -> " + value);
    }
  }
}`
        },
        {
          name: 'Insert At Index',
          use: 'Insert when free capacity exists.',
          operations: 'Shift right from end to index, then write value.',
          code: `class ArrayInsert {
  static int insert(int[] arr, int size, int index, int value) {
    if (index < 0 || index > size || size == arr.length) return size;
    for (int i = size; i > index; i--) {
      arr[i] = arr[i - 1];
    }
    arr[index] = value;
    return size + 1;
  }
}`
        },
        {
          name: 'Delete At Index',
          use: 'Remove one element from a compact array.',
          operations: 'Shift left from index + 1, reduce logical size.',
          code: `class ArrayDelete {
  static int deleteAt(int[] arr, int size, int index) {
    if (index < 0 || index >= size) return size;
    for (int i = index; i + 1 < size; i++) {
      arr[i] = arr[i + 1];
    }
    return size - 1;
  }
}`
        },
        {
          name: 'Reverse Array',
          use: 'In-place two-pointer reversal.',
          operations: 'Swap left and right, move inward.',
          code: `class ArrayReverse {
  static void reverse(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
      int temp = nums[left];
      nums[left++] = nums[right];
      nums[right--] = temp;
    }
  }
}`
        },
        {
          name: 'Prefix Sum',
          use: 'Answer range-sum queries quickly.',
          operations: 'Build prefix, query with prefix[right + 1] - prefix[left].',
          code: `class PrefixSum {
  private final int[] prefix;

  PrefixSum(int[] nums) {
    prefix = new int[nums.length + 1];
    for (int i = 0; i < nums.length; i++) {
      prefix[i + 1] = prefix[i] + nums[i];
    }
  }

  int rangeSum(int left, int right) {
    return prefix[right + 1] - prefix[left];
  }
}`
        }
      ]
    },
    {
      title: 'Searching',
      summary: 'Linear search for unsorted data and binary search for sorted data.',
      rows: [
        {
          name: 'Linear Search',
          use: 'Use when data is unsorted or no structure is available.',
          operations: 'Scan until target appears.',
          code: `class LinearSearch {
  static int search(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] == target) return i;
    }
    return -1;
  }
}`
        },
        {
          name: 'Binary Search',
          use: 'Use on sorted arrays.',
          operations: 'Shrink [left, right] by comparing mid.',
          code: `class BinarySearchTemplate {
  static int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] == target) return mid;
      if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
}`
        },
        {
          name: 'Lower Bound',
          use: 'Find first index with value >= target.',
          operations: 'Move right when nums[mid] is too small.',
          code: `class LowerBound {
  static int lowerBound(int[] nums, int target) {
    int left = 0, right = nums.length;
    while (left < right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] < target) left = mid + 1;
      else right = mid;
    }
    return left;
  }
}`
        }
      ]
    },
    {
      title: 'Linked List',
      summary: 'Singly linked-list node, traversal, insertion, deletion, and reversal.',
      rows: [
        {
          name: 'ListNode Structure',
          use: 'Base node used in most linked-list problems.',
          operations: 'Store value and next pointer.',
          code: `class ListNode {
  int val;
  ListNode next;

  ListNode(int val) {
    this.val = val;
  }

  ListNode(int val, ListNode next) {
    this.val = val;
    this.next = next;
  }
}`
        },
        {
          name: 'Traverse Linked List',
          use: 'Visit every node once.',
          operations: 'Move current = current.next.',
          code: `class LinkedListTraversal {
  static void traverse(ListNode head) {
    for (ListNode current = head; current != null; current = current.next) {
      System.out.println(current.val);
    }
  }
}`
        },
        {
          name: 'Insert At Head',
          use: 'Fast prepend operation.',
          operations: 'New node points to old head.',
          code: `class InsertHead {
  static ListNode insertAtHead(ListNode head, int value) {
    return new ListNode(value, head);
  }
}`
        },
        {
          name: 'Delete By Value',
          use: 'Remove first matching value.',
          operations: 'Use dummy node to handle deleting head.',
          code: `class DeleteByValue {
  static ListNode delete(ListNode head, int value) {
    ListNode dummy = new ListNode(0, head);
    ListNode current = dummy;
    while (current.next != null) {
      if (current.next.val == value) {
        current.next = current.next.next;
        break;
      }
      current = current.next;
    }
    return dummy.next;
  }
}`
        },
        {
          name: 'Reverse Linked List',
          use: 'Core pointer manipulation template.',
          operations: 'prev, current, next rotation.',
          code: `class ReverseLinkedList {
  static ListNode reverse(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    while (current != null) {
      ListNode next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return prev;
  }
}`
        }
      ]
    },
    {
      title: 'Stack, Queue & Deque',
      summary: 'Java collection templates for LIFO, FIFO, and two-ended processing.',
      rows: [
        {
          name: 'Stack Using ArrayDeque',
          use: 'Use instead of legacy Stack in interviews.',
          operations: 'push, pop, peek, isEmpty.',
          code: `import java.util.*;

class StackTemplate {
  static void demo() {
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(10);
    stack.push(20);
    int top = stack.peek();
    int removed = stack.pop();
  }
}`
        },
        {
          name: 'Queue Using ArrayDeque',
          use: 'BFS and FIFO processing.',
          operations: 'offer, poll, peek.',
          code: `import java.util.*;

class QueueTemplate {
  static void demo() {
    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(10);
    queue.offer(20);
    int front = queue.peek();
    int removed = queue.poll();
  }
}`
        },
        {
          name: 'Monotonic Deque',
          use: 'Sliding window maximum/minimum.',
          operations: 'Remove expired front, remove weaker back, push index.',
          code: `import java.util.*;

class SlidingWindowMaximum {
  static int[] maxSlidingWindow(int[] nums, int k) {
    int[] ans = new int[nums.length - k + 1];
    Deque<Integer> dq = new ArrayDeque<>();
    for (int i = 0; i < nums.length; i++) {
      while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();
      while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
      dq.offerLast(i);
      if (i >= k - 1) ans[i - k + 1] = nums[dq.peekFirst()];
    }
    return ans;
  }
}`
        }
      ]
    },
    {
      title: 'HashMap & HashSet',
      summary: 'Frequency, uniqueness, and first-seen templates.',
      rows: [
        {
          name: 'Frequency Map',
          use: 'Count occurrences.',
          operations: 'getOrDefault, put.',
          code: `import java.util.*;

class FrequencyMap {
  static Map<Integer, Integer> count(int[] nums) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int num : nums) {
      freq.put(num, freq.getOrDefault(num, 0) + 1);
    }
    return freq;
  }
}`
        },
        {
          name: 'Seen Set',
          use: 'Detect duplicates or visited states.',
          operations: 'add returns false when item already exists.',
          code: `import java.util.*;

class SeenSet {
  static boolean hasDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
      if (!seen.add(num)) return true;
    }
    return false;
  }
}`
        }
      ]
    },
    {
      title: 'Binary Tree Traversals',
      summary: 'Tree node plus recursive, iterative, and level-order traversal templates.',
      rows: [
        {
          name: 'TreeNode Structure',
          use: 'Base node for binary tree and BST.',
          operations: 'Store value, left child, right child.',
          code: `class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode(int val) {
    this.val = val;
  }
}`
        },
        {
          name: 'Recursive DFS Traversals',
          use: 'Preorder, inorder, postorder.',
          operations: 'Change visit position around recursive calls.',
          code: `import java.util.*;

class RecursiveTraversals {
  void preorder(TreeNode root, List<Integer> ans) {
    if (root == null) return;
    ans.add(root.val);
    preorder(root.left, ans);
    preorder(root.right, ans);
  }

  void inorder(TreeNode root, List<Integer> ans) {
    if (root == null) return;
    inorder(root.left, ans);
    ans.add(root.val);
    inorder(root.right, ans);
  }

  void postorder(TreeNode root, List<Integer> ans) {
    if (root == null) return;
    postorder(root.left, ans);
    postorder(root.right, ans);
    ans.add(root.val);
  }
}`
        },
        {
          name: 'Iterative Inorder',
          use: 'BST sorted order and kth-smallest.',
          operations: 'Push left chain, visit, move right.',
          code: `import java.util.*;

class IterativeInorder {
  List<Integer> inorder(TreeNode root) {
    List<Integer> ans = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;
    while (current != null || !stack.isEmpty()) {
      while (current != null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      ans.add(current.val);
      current = current.right;
    }
    return ans;
  }
}`
        },
        {
          name: 'Level Order BFS',
          use: 'Tree by levels.',
          operations: 'Queue, process level size.',
          code: `import java.util.*;

class LevelOrderTraversal {
  List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> ans = new ArrayList<>();
    if (root == null) return ans;
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
      int size = queue.size();
      List<Integer> level = new ArrayList<>();
      for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        level.add(node.val);
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
      }
      ans.add(level);
    }
    return ans;
  }
}`
        }
      ]
    },
    {
      title: 'Binary Search Tree',
      summary: 'Search, insert, and delete in BST.',
      rows: [
        {
          name: 'BST Search',
          use: 'Find a value in ordered binary tree.',
          operations: 'Go left for smaller, right for larger.',
          code: `class BSTSearch {
  TreeNode search(TreeNode root, int target) {
    while (root != null && root.val != target) {
      root = target < root.val ? root.left : root.right;
    }
    return root;
  }
}`
        },
        {
          name: 'BST Insert',
          use: 'Insert while preserving BST order.',
          operations: 'Recursive placement under left/right child.',
          code: `class BSTInsert {
  TreeNode insert(TreeNode root, int value) {
    if (root == null) return new TreeNode(value);
    if (value < root.val) root.left = insert(root.left, value);
    else if (value > root.val) root.right = insert(root.right, value);
    return root;
  }
}`
        },
        {
          name: 'BST Delete',
          use: 'Delete node with 0, 1, or 2 children.',
          operations: 'Replace two-child node with inorder successor.',
          code: `class BSTDelete {
  TreeNode delete(TreeNode root, int key) {
    if (root == null) return null;
    if (key < root.val) root.left = delete(root.left, key);
    else if (key > root.val) root.right = delete(root.right, key);
    else {
      if (root.left == null) return root.right;
      if (root.right == null) return root.left;
      TreeNode successor = min(root.right);
      root.val = successor.val;
      root.right = delete(root.right, successor.val);
    }
    return root;
  }

  private TreeNode min(TreeNode node) {
    while (node.left != null) node = node.left;
    return node;
  }
}`
        }
      ]
    },
    {
      title: 'Heap / Priority Queue',
      summary: 'Min-heap, max-heap, and top-k templates.',
      rows: [
        {
          name: 'Min Heap',
          use: 'Always remove smallest element.',
          operations: 'offer, poll, peek.',
          code: `import java.util.*;

class MinHeapTemplate {
  static void demo() {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    minHeap.offer(5);
    minHeap.offer(2);
    int smallest = minHeap.poll();
  }
}`
        },
        {
          name: 'Max Heap',
          use: 'Always remove largest element.',
          operations: 'Use reverseOrder comparator.',
          code: `import java.util.*;

class MaxHeapTemplate {
  static void demo() {
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    maxHeap.offer(5);
    maxHeap.offer(2);
    int largest = maxHeap.poll();
  }
}`
        },
        {
          name: 'Top K Largest',
          use: 'Keep only k best elements.',
          operations: 'Min-heap of size k.',
          code: `import java.util.*;

class TopK {
  static int kthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int num : nums) {
      heap.offer(num);
      if (heap.size() > k) heap.poll();
    }
    return heap.peek();
  }
}`
        }
      ]
    },
    {
      title: 'Graph',
      summary: 'Adjacency list, BFS, DFS, and topological sort.',
      rows: [
        {
          name: 'Adjacency List',
          use: 'Represent sparse graph.',
          operations: 'Create list per node, add directed or undirected edges.',
          code: `import java.util.*;

class GraphBuild {
  static List<Integer>[] build(int n, int[][] edges) {
    List<Integer>[] graph = new ArrayList[n];
    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
    for (int[] edge : edges) {
      graph[edge[0]].add(edge[1]);
      graph[edge[1]].add(edge[0]);
    }
    return graph;
  }
}`
        },
        {
          name: 'Graph BFS',
          use: 'Shortest path by edge count and level traversal.',
          operations: 'Queue and visited array.',
          code: `import java.util.*;

class GraphBFS {
  static void bfs(List<Integer>[] graph, int start) {
    boolean[] seen = new boolean[graph.length];
    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(start);
    seen[start] = true;
    while (!queue.isEmpty()) {
      int node = queue.poll();
      for (int next : graph[node]) {
        if (!seen[next]) {
          seen[next] = true;
          queue.offer(next);
        }
      }
    }
  }
}`
        },
        {
          name: 'Graph DFS Recursive',
          use: 'Components, islands, cycle helpers.',
          operations: 'Mark then visit neighbors.',
          code: `import java.util.*;

class GraphDFS {
  static void dfs(List<Integer>[] graph, int node, boolean[] seen) {
    seen[node] = true;
    for (int next : graph[node]) {
      if (!seen[next]) dfs(graph, next, seen);
    }
  }
}`
        },
        {
          name: 'Topological Sort',
          use: 'DAG ordering, course schedule.',
          operations: 'Kahn BFS using indegree.',
          code: `import java.util.*;

class TopologicalSort {
  static List<Integer> topo(int n, int[][] edges) {
    List<Integer>[] graph = new ArrayList[n];
    int[] indegree = new int[n];
    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
    for (int[] edge : edges) {
      graph[edge[0]].add(edge[1]);
      indegree[edge[1]]++;
    }

    Queue<Integer> queue = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) queue.offer(i);
    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
      int node = queue.poll();
      order.add(node);
      for (int next : graph[node]) {
        if (--indegree[next] == 0) queue.offer(next);
      }
    }
    return order;
  }
}`
        }
      ]
    },
    {
      title: 'Trie',
      summary: 'Prefix tree structure with insert, search, and startsWith.',
      rows: [
        {
          name: 'Trie Template',
          use: 'Prefix search, dictionary, autocomplete basics.',
          operations: 'Insert word, search full word, search prefix.',
          code: `class Trie {
  private static class TrieNode {
    TrieNode[] child = new TrieNode[26];
    boolean word;
  }

  private final TrieNode root = new TrieNode();

  public void insert(String word) {
    TrieNode node = root;
    for (char ch : word.toCharArray()) {
      int index = ch - 'a';
      if (node.child[index] == null) node.child[index] = new TrieNode();
      node = node.child[index];
    }
    node.word = true;
  }

  public boolean search(String word) {
    TrieNode node = find(word);
    return node != null && node.word;
  }

  public boolean startsWith(String prefix) {
    return find(prefix) != null;
  }

  private TrieNode find(String text) {
    TrieNode node = root;
    for (char ch : text.toCharArray()) {
      int index = ch - 'a';
      if (node.child[index] == null) return null;
      node = node.child[index];
    }
    return node;
  }
}`
        }
      ]
    },
    {
      title: 'Union Find',
      summary: 'Disjoint-set union with path compression and union by size.',
      rows: [
        {
          name: 'DSU Template',
          use: 'Connectivity, components, redundant edges.',
          operations: 'find, union, component count.',
          code: `class DSU {
  private final int[] parent;
  private final int[] size;
  private int components;

  DSU(int n) {
    parent = new int[n];
    size = new int[n];
    components = n;
    for (int i = 0; i < n; i++) {
      parent[i] = i;
      size[i] = 1;
    }
  }

  int find(int node) {
    if (parent[node] != node) parent[node] = find(parent[node]);
    return parent[node];
  }

  boolean union(int a, int b) {
    int rootA = find(a);
    int rootB = find(b);
    if (rootA == rootB) return false;
    if (size[rootA] < size[rootB]) {
      int temp = rootA;
      rootA = rootB;
      rootB = temp;
    }
    parent[rootB] = rootA;
    size[rootA] += size[rootB];
    components--;
    return true;
  }

  int components() {
    return components;
  }
}`
        }
      ]
    },
    {
      title: 'Sorting',
      summary: 'Main sorting templates to revise daily.',
      rows: [
        {
          name: 'Bubble Sort',
          use: 'Learning only; rarely interview-optimal.',
          operations: 'Repeated adjacent swaps.',
          code: `class BubbleSort {
  static void sort(int[] nums) {
    for (int end = nums.length - 1; end > 0; end--) {
      boolean swapped = false;
      for (int i = 0; i < end; i++) {
        if (nums[i] > nums[i + 1]) {
          int temp = nums[i];
          nums[i] = nums[i + 1];
          nums[i + 1] = temp;
          swapped = true;
        }
      }
      if (!swapped) break;
    }
  }
}`
        },
        {
          name: 'Selection Sort',
          use: 'Learning selection of minimum.',
          operations: 'Find min and place at current index.',
          code: `class SelectionSort {
  static void sort(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
      int min = i;
      for (int j = i + 1; j < nums.length; j++) {
        if (nums[j] < nums[min]) min = j;
      }
      int temp = nums[i];
      nums[i] = nums[min];
      nums[min] = temp;
    }
  }
}`
        },
        {
          name: 'Insertion Sort',
          use: 'Good for nearly sorted arrays and linked-list insertion sort.',
          operations: 'Shift bigger elements right.',
          code: `class InsertionSort {
  static void sort(int[] nums) {
    for (int i = 1; i < nums.length; i++) {
      int key = nums[i];
      int j = i - 1;
      while (j >= 0 && nums[j] > key) {
        nums[j + 1] = nums[j];
        j--;
      }
      nums[j + 1] = key;
    }
  }
}`
        },
        {
          name: 'Merge Sort',
          use: 'Stable O(n log n), useful for inversion/count problems.',
          operations: 'Divide, sort halves, merge.',
          code: `class MergeSort {
  static void sort(int[] nums) {
    int[] temp = new int[nums.length];
    mergeSort(nums, temp, 0, nums.length - 1);
  }

  private static void mergeSort(int[] nums, int[] temp, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(nums, temp, left, mid);
    mergeSort(nums, temp, mid + 1, right);
    merge(nums, temp, left, mid, right);
  }

  private static void merge(int[] nums, int[] temp, int left, int mid, int right) {
    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
      temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
    }
    while (i <= mid) temp[k++] = nums[i++];
    while (j <= right) temp[k++] = nums[j++];
    for (int p = left; p <= right; p++) nums[p] = temp[p];
  }
}`
        },
        {
          name: 'Quick Sort',
          use: 'Average O(n log n), partition template.',
          operations: 'Partition around pivot, sort sides.',
          code: `class QuickSort {
  static void sort(int[] nums) {
    quickSort(nums, 0, nums.length - 1);
  }

  private static void quickSort(int[] nums, int left, int right) {
    if (left >= right) return;
    int pivot = partition(nums, left, right);
    quickSort(nums, left, pivot - 1);
    quickSort(nums, pivot + 1, right);
  }

  private static int partition(int[] nums, int left, int right) {
    int pivot = nums[right];
    int write = left;
    for (int i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        int temp = nums[i];
        nums[i] = nums[write];
        nums[write++] = temp;
      }
    }
    int temp = nums[write];
    nums[write] = nums[right];
    nums[right] = temp;
    return write;
  }
}`
        },
        {
          name: 'Counting Sort',
          use: 'Small integer range.',
          operations: 'Count frequency, overwrite sorted order.',
          code: `class CountingSort {
  static void sort(int[] nums, int maxValue) {
    int[] count = new int[maxValue + 1];
    for (int num : nums) count[num]++;
    int index = 0;
    for (int value = 0; value <= maxValue; value++) {
      while (count[value]-- > 0) nums[index++] = value;
    }
  }
}`
        }
      ]
    },
    {
      title: 'Recursion & Backtracking',
      summary: 'Base-case recursion and choose-explore-unchoose template.',
      rows: [
        {
          name: 'Basic Recursion Shape',
          use: 'Process index by index.',
          operations: 'Base case, work, recursive call.',
          code: `class RecursionShape {
  static int sum(int[] nums) {
    return sum(nums, 0);
  }

  private static int sum(int[] nums, int index) {
    if (index == nums.length) return 0;
    return nums[index] + sum(nums, index + 1);
  }
}`
        },
        {
          name: 'Backtracking Shape',
          use: 'Subsets, combinations, permutations.',
          operations: 'Choose, recurse, unchoose.',
          code: `import java.util.*;

class BacktrackingShape {
  static List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> ans = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), ans);
    return ans;
  }

  private static void backtrack(int[] nums, int index, List<Integer> path, List<List<Integer>> ans) {
    if (index == nums.length) {
      ans.add(new ArrayList<>(path));
      return;
    }
    backtrack(nums, index + 1, path, ans);
    path.add(nums[index]);
    backtrack(nums, index + 1, path, ans);
    path.remove(path.size() - 1);
  }
}`
        }
      ]
    }
  ];

  function renderTemplateCard(row, rowNumber) {
    return `
      <article class="basics-template-card">
        <div class="basics-card-head">
          <span class="basics-index">${rowNumber}</span>
          <div>
            <h3>${escapeHtml(row.name)}</h3>
            <p>${escapeHtml(row.use)}</p>
          </div>
        </div>
        <p class="basics-card-steps"><strong>Remember</strong>${escapeHtml(row.operations)}</p>
        <pre class="basics-code"><code>${highlightJava(row.code)}</code></pre>
      </article>
    `;
  }

  function renderTopic(topic, topicNumber) {
    const id = slugify(topic.title);
    return `
      <section class="section basics-topic-section" id="${id}">
        <div class="section-head">
          <div>
            <p class="eyebrow">Basic ${topicNumber}</p>
            <h2>${escapeHtml(topic.title)}</h2>
            <p>${escapeHtml(topic.summary)}</p>
          </div>
          <span class="open-link">${topic.rows.length} snippets</span>
        </div>
        <div class="basics-card-list">
          ${topic.rows.map((row, index) => renderTemplateCard(row, index + 1)).join('')}
        </div>
      </section>
    `;
  }

  const totalTemplates = topics.reduce((sum, topic) => sum + topic.rows.length, 0);

  stats.innerHTML = `
    <span>${topics.length} basic topics</span>
    <span>${totalTemplates} Java snippets</span>
    <span>Daily revision cards</span>
  `;

  topicIndex.innerHTML = topics.map((topic, index) => `
    <a href="#${slugify(topic.title)}">
      <strong>${index + 1}. ${escapeHtml(topic.title)}</strong>
      <span>${topic.rows.length} snippets</span>
    </a>
  `).join('');

  content.innerHTML = topics.map((topic, index) => renderTopic(topic, index + 1)).join('');
})();
