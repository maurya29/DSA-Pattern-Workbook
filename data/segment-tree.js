const CURRENT_PATTERN = {
  "id": "segment-tree",
  "name": "Segment Tree / Fenwick",
  "summary": "Answer range queries with updates using Fenwick trees, segment trees, lazy propagation, coordinate compression, dynamic nodes, and ordered interval structures.",
  "complete": true,
  "subpatterns": [
    "Fenwick point update range sum",
    "2D Fenwick matrix sum",
    "Fenwick coordinate compression counting",
    "Fenwick reverse-pair threshold counting",
    "Fenwick cost by rank counts",
    "Prefix-sum coordinate compression",
    "Dynamic interval coverage",
    "Dynamic segment tree range add max",
    "Coordinate-compressed range max update",
    "Segment tree range maximum DP",
    "Segment tree pair aggregate DP",
    "Lazy flip segment tree",
    "Ordered interval merge counter",
    "Fenwick peak indicator maintenance",
    "Segment tree gather and scatter",
    "Value-to-index range frequency",
    "Mutable range minimum tree",
    "Mutable range maximum tree",
    "Lazy range add range sum",
    "Lazy range assign range sum",
    "Fenwick prefix sum API",
    "Fenwick inversion counting",
    "2D Fenwick API",
    "Dynamic range sum tree",
    "Range gcd segment tree",
    "Range xor segment tree",
    "Modulo product segment tree",
    "Majority candidate segment tree",
    "Fenwick range add point query",
    "Fenwick order statistic search"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Range Sum Query Mutable",
      "difficulty": "Medium",
      "subpattern": "Fenwick point update range sum",
      "question": "Design NumArray with update(index,val) and sumRange(left,right), where sumRange returns the current sum of nums[left..right].",
      "trigger": "The same array receives point updates and many range-sum queries.",
      "intuition": "Store prefix deltas in a Fenwick tree so a point update changes O(log n) nodes and a range sum is two prefixes.",
      "edgeCases": "Single element array, update to same value, negative numbers, full-range query, repeated updates on one index.",
      "constraints": "1 <= nums.length <= 30000; up to 30000 calls; values fit in signed int.",
      "source": {
        "label": "Range Sum Query Mutable - LeetCode 307",
        "url": "https://leetcode.com/problems/range-sum-query-mutable/"
      },
      "examples": [
        {
          "input": "NumArray([1,3,5]); sumRange(0,2)",
          "output": "9",
          "explanation": "The initial full range sums to 9."
        },
        {
          "input": "update(1,2); sumRange(0,2)",
          "output": "8",
          "explanation": "The array becomes [1,2,5]."
        },
        {
          "input": "NumArray([7]); update(0,4); sumRange(0,0)",
          "output": "4",
          "explanation": "Single index updates and queries are valid."
        }
      ],
      "bruteForceComplexity": "update Time O(1), sumRange Time O(n); Space O(n). Store the array and scan the requested range.",
      "optimizedComplexity": "update Time O(log n), sumRange Time O(log n); Space O(n). Fenwick tree stores prefix deltas.",
      "recursiveComplexity": "update Time O(log n), sumRange Time O(log n); Space O(n). Recursive segment tree splits ranges.",
      "bruteForceCode": "class NumArray {\n  private final int[] nums;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n  }\n\n  public void update(int index, int val) {\n    nums[index] = val;\n  }\n\n  public int sumRange(int left, int right) {\n    int sum = 0;\n    for (int i = left; i <= right; i++) sum += nums[i];\n    return sum;\n  }\n}",
      "iterativeCode": "class NumArray {\n  private final int[] nums;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n    this.tree = new int[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) add(i + 1, nums[i]);\n  }\n\n  public void update(int index, int val) {\n    int delta = val - nums[index];\n    nums[index] = val;\n    add(index + 1, delta);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix(right + 1) - prefix(left);\n  }\n\n  private void add(int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int prefix(int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class NumArray {\n  private final int n;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    n = nums.length;\n    tree = new int[4 * n];\n    build(nums, 1, 0, n - 1);\n  }\n\n  public void update(int index, int val) {\n    update(1, 0, n - 1, index, val);\n  }\n\n  public int sumRange(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int[] nums, int node, int left, int right) {\n    if (left == right) {\n      tree[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(nums, node * 2, left, mid);\n    build(nums, node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private void update(int node, int left, int right, int index, int val) {\n    if (left == right) {\n      tree[node] = val;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, val);\n    else update(node * 2 + 1, mid + 1, right, index, val);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return query(node * 2, left, mid, ql, qr) + query(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n}",
      "optimizedCode": "class NumArray {\n  private final int[] nums;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n    this.tree = new int[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) add(i + 1, nums[i]);\n  }\n\n  public void update(int index, int val) {\n    int delta = val - nums[index];\n    nums[index] = val;\n    add(index + 1, delta);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix(right + 1) - prefix(left);\n  }\n\n  private void add(int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int prefix(int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "code": "class NumArray {\n  private final int[] nums;\n  private final int[] tree;\n\n  public NumArray(int[] nums) {\n    this.nums = nums.clone();\n    this.tree = new int[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) add(i + 1, nums[i]);\n  }\n\n  public void update(int index, int val) {\n    int delta = val - nums[index];\n    nums[index] = val;\n    add(index + 1, delta);\n  }\n\n  public int sumRange(int left, int right) {\n    return prefix(right + 1) - prefix(left);\n  }\n\n  private void add(int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int prefix(int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Sum Query 2D Mutable",
      "difficulty": "Hard",
      "subpattern": "2D Fenwick matrix sum",
      "question": "Design NumMatrix with update(row,col,val) and sumRegion(row1,col1,row2,col2), returning the current rectangle sum.",
      "trigger": "The matrix receives point updates and repeated rectangle sum queries.",
      "intuition": "A 2D Fenwick tree stores prefix sums over rows and columns; a rectangle is four prefix sums.",
      "edgeCases": "One row, one column, one cell, update to same value, full matrix query, negative values.",
      "constraints": "1 <= rows, cols <= 200; up to 10000 calls; values fit in signed int.",
      "source": {
        "label": "Range Sum Query 2D Mutable - LeetCode 308",
        "url": "https://leetcode.com/problems/range-sum-query-2d-mutable/"
      },
      "examples": [
        {
          "input": "NumMatrix sample matrix; sumRegion(2,1,4,3)",
          "output": "8",
          "explanation": "The selected rectangle sums to 8."
        },
        {
          "input": "update(3,2,2); sumRegion(2,1,4,3)",
          "output": "10",
          "explanation": "Updating one cell changes later region sums."
        },
        {
          "input": "matrix = [[5]]; update(0,0,3); sumRegion(0,0,0,0)",
          "output": "3",
          "explanation": "The one-cell matrix is handled directly."
        }
      ],
      "bruteForceComplexity": "update Time O(1), sumRegion Time O(area); Space O(mn). Store the matrix and scan rectangles.",
      "optimizedComplexity": "update Time O(log m log n), sumRegion Time O(log m log n); Space O(mn). 2D Fenwick tree.",
      "recursiveComplexity": "Time O(rows * cols) per query and O(1) per update; Space O(rows + cols) recursion depth for the direct recursive scan.",
      "bruteForceCode": "class NumMatrix {\n  private final int[][] matrix;\n\n  public NumMatrix(int[][] matrix) {\n    this.matrix = new int[matrix.length][matrix[0].length];\n    for (int r = 0; r < matrix.length; r++) {\n      this.matrix[r] = matrix[r].clone();\n    }\n  }\n\n  public void update(int row, int col, int val) {\n    matrix[row][col] = val;\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    int sum = 0;\n    for (int r = row1; r <= row2; r++) {\n      for (int c = col1; c <= col2; c++) sum += matrix[r][c];\n    }\n    return sum;\n  }\n}",
      "iterativeCode": "class NumMatrix {\n  private final int rows;\n  private final int cols;\n  private final int[][] nums;\n  private final int[][] tree;\n\n  public NumMatrix(int[][] matrix) {\n    rows = matrix.length;\n    cols = matrix[0].length;\n    nums = new int[rows][cols];\n    tree = new int[rows + 1][cols + 1];\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) update(r, c, matrix[r][c]);\n    }\n  }\n\n  public void update(int row, int col, int val) {\n    int delta = val - nums[row][col];\n    nums[row][col] = val;\n    for (int r = row + 1; r <= rows; r += r & -r) {\n      for (int c = col + 1; c <= cols; c += c & -c) tree[r][c] += delta;\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix(row2 + 1, col2 + 1) - prefix(row1, col2 + 1) - prefix(row2 + 1, col1) + prefix(row1, col1);\n  }\n\n  private int prefix(int row, int col) {\n    int sum = 0;\n    for (int r = row; r > 0; r -= r & -r) {\n      for (int c = col; c > 0; c -= c & -c) sum += tree[r][c];\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class NumMatrix {\n  private final int[][] matrix;\n\n  public NumMatrix(int[][] matrix) {\n    this.matrix = new int[matrix.length][matrix.length == 0 ? 0 : matrix[0].length];\n    for (int row = 0; row < matrix.length; row++) {\n      this.matrix[row] = matrix[row].clone();\n    }\n  }\n\n  public void update(int row, int col, int val) {\n    matrix[row][col] = val;\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return sumRows(row1, row2, col1, col2);\n  }\n\n  private int sumRows(int row, int row2, int col1, int col2) {\n    if (row > row2) return 0;\n    return sumCols(row, col1, col2) + sumRows(row + 1, row2, col1, col2);\n  }\n\n  private int sumCols(int row, int col, int col2) {\n    if (col > col2) return 0;\n    return matrix[row][col] + sumCols(row, col + 1, col2);\n  }\n}",
      "optimizedCode": "class NumMatrix {\n  private final int rows;\n  private final int cols;\n  private final int[][] nums;\n  private final int[][] tree;\n\n  public NumMatrix(int[][] matrix) {\n    rows = matrix.length;\n    cols = matrix[0].length;\n    nums = new int[rows][cols];\n    tree = new int[rows + 1][cols + 1];\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) update(r, c, matrix[r][c]);\n    }\n  }\n\n  public void update(int row, int col, int val) {\n    int delta = val - nums[row][col];\n    nums[row][col] = val;\n    for (int r = row + 1; r <= rows; r += r & -r) {\n      for (int c = col + 1; c <= cols; c += c & -c) tree[r][c] += delta;\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix(row2 + 1, col2 + 1) - prefix(row1, col2 + 1) - prefix(row2 + 1, col1) + prefix(row1, col1);\n  }\n\n  private int prefix(int row, int col) {\n    int sum = 0;\n    for (int r = row; r > 0; r -= r & -r) {\n      for (int c = col; c > 0; c -= c & -c) sum += tree[r][c];\n    }\n    return sum;\n  }\n}",
      "code": "class NumMatrix {\n  private final int rows;\n  private final int cols;\n  private final int[][] nums;\n  private final int[][] tree;\n\n  public NumMatrix(int[][] matrix) {\n    rows = matrix.length;\n    cols = matrix[0].length;\n    nums = new int[rows][cols];\n    tree = new int[rows + 1][cols + 1];\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) update(r, c, matrix[r][c]);\n    }\n  }\n\n  public void update(int row, int col, int val) {\n    int delta = val - nums[row][col];\n    nums[row][col] = val;\n    for (int r = row + 1; r <= rows; r += r & -r) {\n      for (int c = col + 1; c <= cols; c += c & -c) tree[r][c] += delta;\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix(row2 + 1, col2 + 1) - prefix(row1, col2 + 1) - prefix(row2 + 1, col1) + prefix(row1, col1);\n  }\n\n  private int prefix(int row, int col) {\n    int sum = 0;\n    for (int r = row; r > 0; r -= r & -r) {\n      for (int c = col; c > 0; c -= c & -c) sum += tree[r][c];\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Count of Smaller Numbers After Self",
      "difficulty": "Hard",
      "subpattern": "Fenwick coordinate compression counting",
      "question": "Given nums, return counts where counts[i] is the number of smaller elements to the right of nums[i].",
      "trigger": "While scanning right to left, already-seen values represent elements after the current index.",
      "intuition": "Compress values to ranks, query how many ranks are below current, then add the current rank.",
      "edgeCases": "Duplicates, negative values, sorted ascending, sorted descending, single element.",
      "constraints": "1 <= nums.length <= 100000; values fit in signed int.",
      "source": {
        "label": "Count of Smaller Numbers After Self - LeetCode 315",
        "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
      },
      "examples": [
        {
          "input": "nums = [5,2,6,1]",
          "output": "[2,1,1,0]",
          "explanation": "5 has smaller values 2 and 1 after it."
        },
        {
          "input": "nums = [-1]",
          "output": "[0]",
          "explanation": "No elements appear after the only value."
        },
        {
          "input": "nums = [-1,-1]",
          "output": "[0,0]",
          "explanation": "Equal values are not smaller."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Count smaller elements by scanning every suffix.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree over compressed ranks.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort counts right-half values that cross each left index.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    Integer[] answer = new Integer[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n      int count = 0;\n      for (int j = i + 1; j < nums.length; j++) if (nums[j] < nums[i]) count++;\n      answer[i] = count;\n    }\n    return Arrays.asList(answer);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map<Integer, Integer> rank = new HashMap<>();\n    int next = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, next++);\n    int[] tree = new int[next + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i >= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      add(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int n = nums.length;\n    int[] indexes = new int[n];\n    int[] temp = new int[n];\n    int[] counts = new int[n];\n    for (int i = 0; i < n; i++) indexes[i] = i;\n    sort(nums, indexes, temp, counts, 0, n - 1);\n    List<Integer> answer = new ArrayList<>();\n    for (int count : counts) answer.add(count);\n    return answer;\n  }\n\n  private void sort(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int right) {\n    if (left >= right) return;\n    int mid = left + (right - left) / 2;\n    sort(nums, indexes, temp, counts, left, mid);\n    sort(nums, indexes, temp, counts, mid + 1, right);\n    merge(nums, indexes, temp, counts, left, mid, right);\n  }\n\n  private void merge(int[] nums, int[] indexes, int[] temp, int[] counts, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left, smaller = 0;\n    while (i <= mid && j <= right) {\n      if (nums[indexes[j]] < nums[indexes[i]]) {\n        temp[k++] = indexes[j++];\n        smaller++;\n      } else {\n        counts[indexes[i]] += smaller;\n        temp[k++] = indexes[i++];\n      }\n    }\n    while (i <= mid) {\n      counts[indexes[i]] += smaller;\n      temp[k++] = indexes[i++];\n    }\n    while (j <= right) temp[k++] = indexes[j++];\n    for (int p = left; p <= right; p++) indexes[p] = temp[p];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map<Integer, Integer> rank = new HashMap<>();\n    int next = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, next++);\n    int[] tree = new int[next + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i >= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      add(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countSmaller(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    Map<Integer, Integer> rank = new HashMap<>();\n    int next = 1;\n    for (int value : sorted) if (!rank.containsKey(value)) rank.put(value, next++);\n    int[] tree = new int[next + 1];\n    Integer[] answer = new Integer[nums.length];\n    for (int i = nums.length - 1; i >= 0; i--) {\n      int r = rank.get(nums[i]);\n      answer[i] = query(tree, r - 1);\n      add(tree, r, 1);\n    }\n    return Arrays.asList(answer);\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reverse Pairs",
      "difficulty": "Hard",
      "subpattern": "Fenwick reverse-pair threshold counting",
      "question": "Given nums, count pairs i < j where nums[i] > 2 * nums[j].",
      "trigger": "Each new value needs to know how many previous values are greater than twice it.",
      "intuition": "Compress values and doubled values; Fenwick stores previous values and queries how many are above 2*x.",
      "edgeCases": "Negative values, duplicates, integer overflow in 2*x, sorted ascending, sorted descending.",
      "constraints": "1 <= nums.length <= 50000; values fit in signed int.",
      "source": {
        "label": "Reverse Pairs - LeetCode 493",
        "url": "https://leetcode.com/problems/reverse-pairs/"
      },
      "examples": [
        {
          "input": "nums = [1,3,2,3,1]",
          "output": "2",
          "explanation": "Two pairs satisfy the strict double relation."
        },
        {
          "input": "nums = [2,4,3,5,1]",
          "output": "3",
          "explanation": "Three left values are more than double a later value."
        },
        {
          "input": "nums = [-5,-5]",
          "output": "1",
          "explanation": "-5 > -10 is true for the ordered pair."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Check every ordered pair using long arithmetic.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree over compressed nums and doubled thresholds.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort counts cross pairs before merging sorted halves.",
      "bruteForceCode": "class Solution {\n  public int reversePairs(int[] nums) {\n    int count = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        if ((long) nums[i] > 2L * nums[j]) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet<Long> values = new TreeSet<>();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map<Long, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int notGreater = query(tree, rank.get(2L * nums[i]));\n      pairs += i - notGreater;\n      add(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int reversePairs(int[] nums) {\n    return sort(nums, new int[nums.length], 0, nums.length - 1);\n  }\n\n  private int sort(int[] nums, int[] temp, int left, int right) {\n    if (left >= right) return 0;\n    int mid = left + (right - left) / 2;\n    int count = sort(nums, temp, left, mid) + sort(nums, temp, mid + 1, right);\n    int j = mid + 1;\n    for (int i = left; i <= mid; i++) {\n      while (j <= right && (long) nums[i] > 2L * nums[j]) j++;\n      count += j - (mid + 1);\n    }\n    merge(nums, temp, left, mid, right);\n    return count;\n  }\n\n  private void merge(int[] nums, int[] temp, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left;\n    while (i <= mid && j <= right) temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];\n    while (i <= mid) temp[k++] = nums[i++];\n    while (j <= right) temp[k++] = nums[j++];\n    for (int p = left; p <= right; p++) nums[p] = temp[p];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet<Long> values = new TreeSet<>();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map<Long, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int notGreater = query(tree, rank.get(2L * nums[i]));\n      pairs += i - notGreater;\n      add(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int reversePairs(int[] nums) {\n    TreeSet<Long> values = new TreeSet<>();\n    for (int value : nums) {\n      values.add((long) value);\n      values.add(2L * value);\n    }\n    Map<Long, Integer> rank = new HashMap<>();\n    int id = 1;\n    for (long value : values) rank.put(value, id++);\n    int[] tree = new int[id + 1];\n    int pairs = 0;\n    for (int i = 0; i < nums.length; i++) {\n      int notGreater = query(tree, rank.get(2L * nums[i]));\n      pairs += i - notGreater;\n      add(tree, rank.get((long) nums[i]), 1);\n    }\n    return pairs;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Create Sorted Array through Instructions",
      "difficulty": "Hard",
      "subpattern": "Fenwick cost by rank counts",
      "question": "Given instructions, insert each value into a sorted array and add min(count strictly less, count strictly greater) to the cost.",
      "trigger": "For each inserted value, the cost depends on how many previous values fall below and above its rank.",
      "intuition": "Use a Fenwick tree of inserted value frequencies; less is prefix(x-1), greater is insertedSoFar - prefix(x).",
      "edgeCases": "Duplicate values, all increasing, all decreasing, all equal, modulo arithmetic.",
      "constraints": "1 <= instructions.length <= 100000; 1 <= instructions[i] <= 100000; answer modulo 1e9+7.",
      "source": {
        "label": "Create Sorted Array through Instructions - LeetCode 1649",
        "url": "https://leetcode.com/problems/create-sorted-array-through-instructions/"
      },
      "examples": [
        {
          "input": "instructions = [1,5,6,2]",
          "output": "1",
          "explanation": "Only inserting 2 contributes min(1,2)=1."
        },
        {
          "input": "instructions = [1,2,3,6,5,4]",
          "output": "3",
          "explanation": "Later smaller values create insertion costs."
        },
        {
          "input": "instructions = [1,3,3,3,2,4,2,1,2]",
          "output": "4",
          "explanation": "Duplicates are excluded from strictly less/greater counts."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Maintain a sorted list and binary-search insertion positions, then insert with shifting.",
      "optimizedComplexity": "Time O(n log V); Space O(V). Fenwick tree counts inserted values by rank.",
      "recursiveComplexity": "Time O(n log V); Space O(V). Recursive segment tree queries less/greater counts and updates frequencies.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int createSortedArray(int[] instructions) {\n    List<Integer> sorted = new ArrayList<>();\n    long cost = 0;\n    for (int value : instructions) {\n      int less = lowerBound(sorted, value);\n      int greater = sorted.size() - upperBound(sorted, value);\n      cost = (cost + Math.min(less, greater)) % MOD;\n      sorted.add(upperBound(sorted, value), value);\n    }\n    return (int) cost;\n  }\n\n  private int lowerBound(List<Integer> values, int target) {\n    int left = 0, right = values.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> values, int target) {\n    int left = 0, right = values.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int createSortedArray(int[] instructions) {\n    int max = 0;\n    for (int value : instructions) max = Math.max(max, value);\n    int[] tree = new int[max + 2];\n    long cost = 0;\n    for (int i = 0; i < instructions.length; i++) {\n      int value = instructions[i];\n      int less = query(tree, value - 1);\n      int greater = i - query(tree, value);\n      cost = (cost + Math.min(less, greater)) % MOD;\n      add(tree, value, 1);\n    }\n    return (int) cost;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n  private int[] tree;\n\n  public int createSortedArray(int[] instructions) {\n    int max = 0;\n    for (int value : instructions) max = Math.max(max, value);\n    tree = new int[4 * (max + 1)];\n    long cost = 0;\n    for (int i = 0; i < instructions.length; i++) {\n      int value = instructions[i];\n      int less = query(1, 1, max, 1, value - 1);\n      int greater = i - query(1, 1, max, 1, value);\n      cost = (cost + Math.min(less, greater)) % MOD;\n      update(1, 1, max, value);\n    }\n    return (int) cost;\n  }\n\n  private void update(int node, int left, int right, int index) {\n    if (left == right) {\n      tree[node]++;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index);\n    else update(node * 2 + 1, mid + 1, right, index);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return query(node * 2, left, mid, ql, qr) + query(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int createSortedArray(int[] instructions) {\n    int max = 0;\n    for (int value : instructions) max = Math.max(max, value);\n    int[] tree = new int[max + 2];\n    long cost = 0;\n    for (int i = 0; i < instructions.length; i++) {\n      int value = instructions[i];\n      int less = query(tree, value - 1);\n      int greater = i - query(tree, value);\n      cost = (cost + Math.min(less, greater)) % MOD;\n      add(tree, value, 1);\n    }\n    return (int) cost;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "code": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int createSortedArray(int[] instructions) {\n    int max = 0;\n    for (int value : instructions) max = Math.max(max, value);\n    int[] tree = new int[max + 2];\n    long cost = 0;\n    for (int i = 0; i < instructions.length; i++) {\n      int value = instructions[i];\n      int less = query(tree, value - 1);\n      int greater = i - query(tree, value);\n      cost = (cost + Math.min(less, greater)) % MOD;\n      add(tree, value, 1);\n    }\n    return (int) cost;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Count of Range Sum",
      "difficulty": "Hard",
      "subpattern": "Prefix-sum coordinate compression",
      "question": "Given nums and bounds lower and upper, count range sums nums[i..j] whose sum lies in [lower, upper].",
      "trigger": "Each current prefix sum needs previous prefixes in a value interval.",
      "intuition": "For prefix sum s, count previous prefix p where s-upper <= p <= s-lower using compressed prefix values.",
      "edgeCases": "Negative values, zero-length prefix, lower equals upper, large sums needing long, all zeros.",
      "constraints": "1 <= nums.length <= 100000; values and bounds fit int; count can exceed int during computation.",
      "source": {
        "label": "Count of Range Sum - LeetCode 327",
        "url": "https://leetcode.com/problems/count-of-range-sum/"
      },
      "examples": [
        {
          "input": "nums = [-2,5,-1], lower = -2, upper = 2",
          "output": "3",
          "explanation": "Three subarrays have sums inside the target range."
        },
        {
          "input": "nums = [0], lower = 0, upper = 0",
          "output": "1",
          "explanation": "The single zero sum is valid."
        },
        {
          "input": "nums = [1,-1], lower = 0, upper = 0",
          "output": "1",
          "explanation": "The full subarray sums to zero."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Build prefix sums and test every pair.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Fenwick tree counts previous compressed prefix sums in the needed interval.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Merge sort counts valid cross-prefix ranges while sorting prefix sums.",
      "bruteForceCode": "class Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    int count = 0;\n    for (int i = 0; i < prefix.length; i++) {\n      for (int j = i + 1; j < prefix.length; j++) {\n        long sum = prefix[j] - prefix[i];\n        if (lower <= sum && sum <= upper) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    long[] sorted = prefix.clone();\n    Arrays.sort(sorted);\n    sorted = unique(sorted);\n    int[] tree = new int[sorted.length + 1];\n    int count = 0;\n    add(tree, rank(sorted, 0), 1);\n    for (int i = 1; i < prefix.length; i++) {\n      long leftValue = prefix[i] - upper;\n      long rightValue = prefix[i] - lower;\n      int left = lowerBound(sorted, leftValue) + 1;\n      int right = upperBound(sorted, rightValue);\n      count += query(tree, right) - query(tree, left - 1);\n      add(tree, rank(sorted, prefix[i]), 1);\n    }\n    return count;\n  }\n\n  private long[] unique(long[] values) {\n    int size = 0;\n    for (long value : values) if (size == 0 || values[size - 1] != value) values[size++] = value;\n    return Arrays.copyOf(values, size);\n  }\n\n  private int rank(long[] values, long target) {\n    return lowerBound(values, target) + 1;\n  }\n\n  private int lowerBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    return sort(prefix, new long[prefix.length], 0, prefix.length - 1, lower, upper);\n  }\n\n  private int sort(long[] sums, long[] temp, int left, int right, int lower, int upper) {\n    if (left >= right) return 0;\n    int mid = left + (right - left) / 2;\n    int count = sort(sums, temp, left, mid, lower, upper) + sort(sums, temp, mid + 1, right, lower, upper);\n    int start = mid + 1, end = mid + 1;\n    for (int i = left; i <= mid; i++) {\n      while (start <= right && sums[start] - sums[i] < lower) start++;\n      while (end <= right && sums[end] - sums[i] <= upper) end++;\n      count += end - start;\n    }\n    merge(sums, temp, left, mid, right);\n    return count;\n  }\n\n  private void merge(long[] sums, long[] temp, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left;\n    while (i <= mid && j <= right) temp[k++] = sums[i] <= sums[j] ? sums[i++] : sums[j++];\n    while (i <= mid) temp[k++] = sums[i++];\n    while (j <= right) temp[k++] = sums[j++];\n    for (int p = left; p <= right; p++) sums[p] = temp[p];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    long[] sorted = prefix.clone();\n    Arrays.sort(sorted);\n    sorted = unique(sorted);\n    int[] tree = new int[sorted.length + 1];\n    int count = 0;\n    add(tree, rank(sorted, 0), 1);\n    for (int i = 1; i < prefix.length; i++) {\n      long leftValue = prefix[i] - upper;\n      long rightValue = prefix[i] - lower;\n      int left = lowerBound(sorted, leftValue) + 1;\n      int right = upperBound(sorted, rightValue);\n      count += query(tree, right) - query(tree, left - 1);\n      add(tree, rank(sorted, prefix[i]), 1);\n    }\n    return count;\n  }\n\n  private long[] unique(long[] values) {\n    int size = 0;\n    for (long value : values) if (size == 0 || values[size - 1] != value) values[size++] = value;\n    return Arrays.copyOf(values, size);\n  }\n\n  private int rank(long[] values, long target) {\n    return lowerBound(values, target) + 1;\n  }\n\n  private int lowerBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countRangeSum(int[] nums, int lower, int upper) {\n    long[] prefix = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];\n    long[] sorted = prefix.clone();\n    Arrays.sort(sorted);\n    sorted = unique(sorted);\n    int[] tree = new int[sorted.length + 1];\n    int count = 0;\n    add(tree, rank(sorted, 0), 1);\n    for (int i = 1; i < prefix.length; i++) {\n      long leftValue = prefix[i] - upper;\n      long rightValue = prefix[i] - lower;\n      int left = lowerBound(sorted, leftValue) + 1;\n      int right = upperBound(sorted, rightValue);\n      count += query(tree, right) - query(tree, left - 1);\n      add(tree, rank(sorted, prefix[i]), 1);\n    }\n    return count;\n  }\n\n  private long[] unique(long[] values) {\n    int size = 0;\n    for (long value : values) if (size == 0 || values[size - 1] != value) values[size++] = value;\n    return Arrays.copyOf(values, size);\n  }\n\n  private int rank(long[] values, long target) {\n    return lowerBound(values, target) + 1;\n  }\n\n  private int lowerBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(long[] values, long target) {\n    int left = 0, right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private void add(int[] tree, int index, int delta) {\n    while (index < tree.length) {\n      tree[index] += delta;\n      index += index & -index;\n    }\n  }\n\n  private int query(int[] tree, int index) {\n    int sum = 0;\n    while (index > 0) {\n      sum += tree[index];\n      index -= index & -index;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Range Module",
      "difficulty": "Hard",
      "subpattern": "Dynamic interval coverage",
      "question": "Design RangeModule with addRange, queryRange, and removeRange over half-open intervals [left,right).",
      "trigger": "The active set is a changing union of ranges that must support merge, split, and coverage query.",
      "intuition": "Keep disjoint intervals ordered by start, merge overlaps on add, split intervals on remove, and query predecessor coverage.",
      "edgeCases": "Touching intervals, removing the middle of an interval, querying a gap, adding across multiple intervals, repeated removals.",
      "constraints": "1 <= left < right <= 1e9; up to 10000 operations.",
      "source": {
        "label": "Range Module - LeetCode 715",
        "url": "https://leetcode.com/problems/range-module/"
      },
      "examples": [
        {
          "input": "addRange(10,20); removeRange(14,16); queryRange(10,14)",
          "output": "true",
          "explanation": "[10,14) remains covered."
        },
        {
          "input": "queryRange(13,15)",
          "output": "false",
          "explanation": "The removed gap breaks full coverage."
        },
        {
          "input": "queryRange(16,17)",
          "output": "true",
          "explanation": "[16,20) remains covered."
        }
      ],
      "bruteForceComplexity": "add/remove Time O(n log n), query Time O(n); Space O(n). Maintain and normalize a list of covered intervals.",
      "optimizedComplexity": "add/remove/query Time O(k log n); Space O(n). TreeMap stores disjoint intervals by start.",
      "recursiveComplexity": "add/remove/query Time O(n); Space O(n + stack). Recursive list processing merges, splits, and scans intervals.",
      "bruteForceCode": "import java.util.*;\n\nclass RangeModule {\n  private final List<int[]> ranges = new ArrayList<>();\n\n  public void addRange(int left, int right) {\n    ranges.add(new int[]{left, right});\n    ranges.sort((a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    for (int[] range : ranges) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < range[0]) merged.add(range);\n      else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], range[1]);\n    }\n    ranges.clear();\n    ranges.addAll(merged);\n  }\n\n  public boolean queryRange(int left, int right) {\n    for (int[] range : ranges) if (range[0] <= left && right <= range[1]) return true;\n    return false;\n  }\n\n  public void removeRange(int left, int right) {\n    List<int[]> next = new ArrayList<>();\n    for (int[] range : ranges) {\n      if (range[1] <= left || right <= range[0]) next.add(range);\n      else {\n        if (range[0] < left) next.add(new int[]{range[0], left});\n        if (right < range[1]) next.add(new int[]{right, range[1]});\n      }\n    }\n    ranges.clear();\n    ranges.addAll(next);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n\n  public void addRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) >= left) {\n      left = start;\n      right = Math.max(right, ranges.remove(start));\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next <= right) {\n      right = Math.max(right, ranges.remove(next));\n      next = ranges.ceilingKey(left);\n    }\n    ranges.put(left, right);\n  }\n\n  public boolean queryRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    return start != null && ranges.get(start) >= right;\n  }\n\n  public void removeRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) > left) {\n      int end = ranges.get(start);\n      ranges.put(start, left);\n      if (end > right) ranges.put(right, end);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next < right) {\n      int end = ranges.remove(next);\n      if (end > right) {\n        ranges.put(right, end);\n        break;\n      }\n      next = ranges.ceilingKey(left);\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass RangeModule {\n  private final List<int[]> ranges = new ArrayList<>();\n\n  public void addRange(int left, int right) {\n    ranges.add(new int[]{left, right});\n    ranges.sort((a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    mergeInto(0, merged);\n    ranges.clear();\n    ranges.addAll(merged);\n  }\n\n  public boolean queryRange(int left, int right) {\n    return query(left, right, 0);\n  }\n\n  public void removeRange(int left, int right) {\n    List<int[]> next = new ArrayList<>();\n    removeInto(left, right, 0, next);\n    ranges.clear();\n    ranges.addAll(next);\n  }\n\n  private void mergeInto(int index, List<int[]> merged) {\n    if (index == ranges.size()) return;\n    int[] range = ranges.get(index);\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < range[0]) merged.add(new int[]{range[0], range[1]});\n    else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], range[1]);\n    mergeInto(index + 1, merged);\n  }\n\n  private boolean query(int left, int right, int index) {\n    if (index == ranges.size()) return false;\n    int[] range = ranges.get(index);\n    return (range[0] <= left && right <= range[1]) || query(left, right, index + 1);\n  }\n\n  private void removeInto(int left, int right, int index, List<int[]> next) {\n    if (index == ranges.size()) return;\n    int[] range = ranges.get(index);\n    if (range[1] <= left || right <= range[0]) next.add(range);\n    else {\n      if (range[0] < left) next.add(new int[]{range[0], left});\n      if (right < range[1]) next.add(new int[]{right, range[1]});\n    }\n    removeInto(left, right, index + 1, next);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n\n  public void addRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) >= left) {\n      left = start;\n      right = Math.max(right, ranges.remove(start));\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next <= right) {\n      right = Math.max(right, ranges.remove(next));\n      next = ranges.ceilingKey(left);\n    }\n    ranges.put(left, right);\n  }\n\n  public boolean queryRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    return start != null && ranges.get(start) >= right;\n  }\n\n  public void removeRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) > left) {\n      int end = ranges.get(start);\n      ranges.put(start, left);\n      if (end > right) ranges.put(right, end);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next < right) {\n      int end = ranges.remove(next);\n      if (end > right) {\n        ranges.put(right, end);\n        break;\n      }\n      next = ranges.ceilingKey(left);\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n\n  public void addRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) >= left) {\n      left = start;\n      right = Math.max(right, ranges.remove(start));\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next <= right) {\n      right = Math.max(right, ranges.remove(next));\n      next = ranges.ceilingKey(left);\n    }\n    ranges.put(left, right);\n  }\n\n  public boolean queryRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    return start != null && ranges.get(start) >= right;\n  }\n\n  public void removeRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) > left) {\n      int end = ranges.get(start);\n      ranges.put(start, left);\n      if (end > right) ranges.put(right, end);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next < right) {\n      int end = ranges.remove(next);\n      if (end > right) {\n        ranges.put(right, end);\n        break;\n      }\n      next = ranges.ceilingKey(left);\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "My Calendar III",
      "difficulty": "Hard",
      "subpattern": "Dynamic segment tree range add max",
      "question": "Design MyCalendarThree where book(start,end) adds a half-open event [start,end) and returns the maximum number of overlapping events so far.",
      "trigger": "Each booking is a range add of +1, and the answer is the global maximum active count.",
      "intuition": "A dynamic segment tree over [0,1e9] supports range add and keeps max overlap at the root.",
      "edgeCases": "Touching endpoints, nested intervals, identical intervals, disjoint intervals, huge coordinates.",
      "constraints": "0 <= start < end <= 1e9; up to 400 calls.",
      "source": {
        "label": "My Calendar III - LeetCode 732",
        "url": "https://leetcode.com/problems/my-calendar-iii/"
      },
      "examples": [
        {
          "input": "book(10,20); book(50,60); book(10,40)",
          "output": "1,1,2",
          "explanation": "The third booking overlaps [10,20)."
        },
        {
          "input": "book(5,15); book(5,10); book(25,55)",
          "output": "3,3,3 after the sample continuation",
          "explanation": "The maximum overlap reaches three."
        },
        {
          "input": "book(1,2); book(2,3)",
          "output": "1,1",
          "explanation": "Touching half-open intervals do not overlap."
        }
      ],
      "bruteForceComplexity": "book Time O(n^2); Space O(n). Count active intervals at every booking start after each add.",
      "optimizedComplexity": "book Time O(n) for sweep-map implementation here; Space O(n). Ordered deltas compute max active count.",
      "recursiveComplexity": "book Time O(log C); Space O(number of touched nodes). Dynamic lazy segment tree over the coordinate domain.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public int book(int start, int end) {\n    bookings.add(new int[]{start, end});\n    int best = 0;\n    for (int[] point : bookings) {\n      int active = 0;\n      int time = point[0];\n      for (int[] booking : bookings) if (booking[0] <= time && time < booking[1]) active++;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class MyCalendarThree {\n  private static class Node {\n    Node left;\n    Node right;\n    int add;\n    int max;\n  }\n\n  private final Node root = new Node();\n  private static final int LIMIT = 1_000_000_000;\n\n  public int book(int start, int end) {\n    update(root, 0, LIMIT, start, end - 1);\n    return root.max;\n  }\n\n  private void update(Node node, int left, int right, int ql, int qr) {\n    if (ql <= left && right <= qr) {\n      node.add++;\n      node.max++;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (ql <= mid) {\n      if (node.left == null) node.left = new Node();\n      update(node.left, left, mid, ql, qr);\n    }\n    if (qr > mid) {\n      if (node.right == null) node.right = new Node();\n      update(node.right, mid + 1, right, ql, qr);\n    }\n    int leftMax = node.left == null ? 0 : node.left.max;\n    int rightMax = node.right == null ? 0 : node.right.max;\n    node.max = node.add + Math.max(leftMax, rightMax);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Falling Squares",
      "difficulty": "Hard",
      "subpattern": "Coordinate-compressed range max update",
      "question": "Given falling squares as [left, sideLength], return the maximum stack height after each square lands.",
      "trigger": "Each square queries the maximum height over its horizontal interval, then assigns a new height to that interval.",
      "intuition": "Compress interval endpoints, query range max for the base height, then range-assign base + side length.",
      "edgeCases": "Non-overlapping squares, fully nested squares, touching but not overlapping squares, repeated positions, large coordinates.",
      "constraints": "1 <= positions.length <= 1000; coordinates and side lengths are positive integers.",
      "source": {
        "label": "Falling Squares - LeetCode 699",
        "url": "https://leetcode.com/problems/falling-squares/"
      },
      "examples": [
        {
          "input": "positions = [[1,2],[2,3],[6,1]]",
          "output": "[2,5,5]",
          "explanation": "The second square overlaps the first and stacks to height 5."
        },
        {
          "input": "positions = [[100,100],[200,100]]",
          "output": "[100,100]",
          "explanation": "Touching intervals do not overlap."
        },
        {
          "input": "positions = [[1,3],[1,2]]",
          "output": "[3,5]",
          "explanation": "The second square lands on the previous square."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Compare each new square against previous intervals.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Coordinate-compressed segment tree does range max query and range assign.",
      "recursiveComplexity": "Time O(n^2); Space O(n + stack). Recursive scan finds the base height among previous intervals.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> fallingSquares(int[][] positions) {\n    List<int[]> intervals = new ArrayList<>();\n    List<Integer> answer = new ArrayList<>();\n    int best = 0;\n    for (int[] square : positions) {\n      int left = square[0];\n      int right = left + square[1];\n      int base = 0;\n      for (int[] interval : intervals) {\n        if (left < interval[1] && interval[0] < right) base = Math.max(base, interval[2]);\n      }\n      int height = base + square[1];\n      intervals.add(new int[]{left, right, height});\n      best = Math.max(best, height);\n      answer.add(best);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private int[] max;\n  private int[] lazy;\n\n  public List<Integer> fallingSquares(int[][] positions) {\n    TreeSet<Integer> coordinates = new TreeSet<>();\n    for (int[] p : positions) {\n      coordinates.add(p[0]);\n      coordinates.add(p[0] + p[1] - 1);\n    }\n    Map<Integer, Integer> rank = new HashMap<>();\n    int index = 0;\n    for (int coordinate : coordinates) rank.put(coordinate, index++);\n    max = new int[4 * index];\n    lazy = new int[4 * index];\n    List<Integer> answer = new ArrayList<>();\n    int best = 0;\n    for (int[] p : positions) {\n      int left = rank.get(p[0]);\n      int right = rank.get(p[0] + p[1] - 1);\n      int height = query(1, 0, index - 1, left, right) + p[1];\n      update(1, 0, index - 1, left, right, height);\n      best = Math.max(best, height);\n      answer.add(best);\n    }\n    return answer;\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return max[node];\n    push(node);\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int ql, int qr, int value) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      max[node] = value;\n      lazy[node] = value;\n      return;\n    }\n    push(node);\n    int mid = left + (right - left) / 2;\n    update(node * 2, left, mid, ql, qr, value);\n    update(node * 2 + 1, mid + 1, right, ql, qr, value);\n    max[node] = Math.max(max[node * 2], max[node * 2 + 1]);\n  }\n\n  private void push(int node) {\n    if (lazy[node] == 0) return;\n    for (int child : new int[]{node * 2, node * 2 + 1}) {\n      max[child] = lazy[node];\n      lazy[child] = lazy[node];\n    }\n    lazy[node] = 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> fallingSquares(int[][] positions) {\n    List<int[]> intervals = new ArrayList<>();\n    List<Integer> answer = new ArrayList<>();\n    place(positions, 0, intervals, answer, 0);\n    return answer;\n  }\n\n  private void place(int[][] positions, int index, List<int[]> intervals, List<Integer> answer, int best) {\n    if (index == positions.length) return;\n    int left = positions[index][0];\n    int right = left + positions[index][1];\n    int height = base(intervals, 0, left, right, 0) + positions[index][1];\n    intervals.add(new int[]{left, right, height});\n    int nextBest = Math.max(best, height);\n    answer.add(nextBest);\n    place(positions, index + 1, intervals, answer, nextBest);\n  }\n\n  private int base(List<int[]> intervals, int index, int left, int right, int best) {\n    if (index == intervals.size()) return best;\n    int[] interval = intervals.get(index);\n    if (left < interval[1] && interval[0] < right) best = Math.max(best, interval[2]);\n    return base(intervals, index + 1, left, right, best);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private int[] max;\n  private int[] lazy;\n\n  public List<Integer> fallingSquares(int[][] positions) {\n    TreeSet<Integer> coordinates = new TreeSet<>();\n    for (int[] p : positions) {\n      coordinates.add(p[0]);\n      coordinates.add(p[0] + p[1] - 1);\n    }\n    Map<Integer, Integer> rank = new HashMap<>();\n    int index = 0;\n    for (int coordinate : coordinates) rank.put(coordinate, index++);\n    max = new int[4 * index];\n    lazy = new int[4 * index];\n    List<Integer> answer = new ArrayList<>();\n    int best = 0;\n    for (int[] p : positions) {\n      int left = rank.get(p[0]);\n      int right = rank.get(p[0] + p[1] - 1);\n      int height = query(1, 0, index - 1, left, right) + p[1];\n      update(1, 0, index - 1, left, right, height);\n      best = Math.max(best, height);\n      answer.add(best);\n    }\n    return answer;\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return max[node];\n    push(node);\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int ql, int qr, int value) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      max[node] = value;\n      lazy[node] = value;\n      return;\n    }\n    push(node);\n    int mid = left + (right - left) / 2;\n    update(node * 2, left, mid, ql, qr, value);\n    update(node * 2 + 1, mid + 1, right, ql, qr, value);\n    max[node] = Math.max(max[node * 2], max[node * 2 + 1]);\n  }\n\n  private void push(int node) {\n    if (lazy[node] == 0) return;\n    for (int child : new int[]{node * 2, node * 2 + 1}) {\n      max[child] = lazy[node];\n      lazy[child] = lazy[node];\n    }\n    lazy[node] = 0;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private int[] max;\n  private int[] lazy;\n\n  public List<Integer> fallingSquares(int[][] positions) {\n    TreeSet<Integer> coordinates = new TreeSet<>();\n    for (int[] p : positions) {\n      coordinates.add(p[0]);\n      coordinates.add(p[0] + p[1] - 1);\n    }\n    Map<Integer, Integer> rank = new HashMap<>();\n    int index = 0;\n    for (int coordinate : coordinates) rank.put(coordinate, index++);\n    max = new int[4 * index];\n    lazy = new int[4 * index];\n    List<Integer> answer = new ArrayList<>();\n    int best = 0;\n    for (int[] p : positions) {\n      int left = rank.get(p[0]);\n      int right = rank.get(p[0] + p[1] - 1);\n      int height = query(1, 0, index - 1, left, right) + p[1];\n      update(1, 0, index - 1, left, right, height);\n      best = Math.max(best, height);\n      answer.add(best);\n    }\n    return answer;\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return max[node];\n    push(node);\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int ql, int qr, int value) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      max[node] = value;\n      lazy[node] = value;\n      return;\n    }\n    push(node);\n    int mid = left + (right - left) / 2;\n    update(node * 2, left, mid, ql, qr, value);\n    update(node * 2 + 1, mid + 1, right, ql, qr, value);\n    max[node] = Math.max(max[node * 2], max[node * 2 + 1]);\n  }\n\n  private void push(int node) {\n    if (lazy[node] == 0) return;\n    for (int child : new int[]{node * 2, node * 2 + 1}) {\n      max[child] = lazy[node];\n      lazy[child] = lazy[node];\n    }\n    lazy[node] = 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Increasing Subsequence II",
      "difficulty": "Hard",
      "subpattern": "Segment tree range maximum DP",
      "question": "Given nums and k, return the length of the longest increasing subsequence where adjacent chosen values differ by at most k.",
      "trigger": "For each value x, the best previous value must lie in the value range [x-k, x-1].",
      "intuition": "Use a segment tree over value coordinates to query max DP length in [x-k,x-1], then update x.",
      "edgeCases": "No valid predecessor, duplicate values, k = 1, all increasing, all decreasing.",
      "constraints": "1 <= nums.length <= 100000; 1 <= nums[i], k <= 100000.",
      "source": {
        "label": "Longest Increasing Subsequence II - LeetCode 2407",
        "url": "https://leetcode.com/problems/longest-increasing-subsequence-ii/"
      },
      "examples": [
        {
          "input": "nums = [4,2,1,4,3,4,5,8,15], k = 3",
          "output": "5",
          "explanation": "One valid subsequence is [1,3,4,5,8]."
        },
        {
          "input": "nums = [7,4,5,1,8,12,4,7], k = 5",
          "output": "4",
          "explanation": "The value-difference limit restricts transitions."
        },
        {
          "input": "nums = [1,5], k = 1",
          "output": "1",
          "explanation": "5 cannot follow 1 because the difference is greater than k."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Check all previous positions and value differences.",
      "optimizedComplexity": "Time O(n log V); Space O(V). Segment tree range maximum query over value coordinates.",
      "recursiveComplexity": "Time O(n log V); Space O(V). Recursive segment tree query/update stores best length per value.",
      "bruteForceCode": "class Solution {\n  public int lengthOfLIS(int[] nums, int k) {\n    int[] dp = new int[nums.length];\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      dp[i] = 1;\n      for (int j = 0; j < i; j++) {\n        if (nums[j] < nums[i] && nums[i] - nums[j] <= k) dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n      best = Math.max(best, dp[i]);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  private int[] tree;\n\n  public int lengthOfLIS(int[] nums, int k) {\n    int max = 0;\n    for (int value : nums) max = Math.max(max, value);\n    tree = new int[4 * (max + 1)];\n    int answer = 0;\n    for (int value : nums) {\n      int left = Math.max(1, value - k);\n      int best = query(1, 1, max, left, value - 1) + 1;\n      update(1, 1, max, value, best);\n      answer = Math.max(answer, best);\n    }\n    return answer;\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = Math.max(tree[node], value);\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n}",
      "recursiveCode": "class Solution {\n  private int[] tree;\n  private int maxValue;\n\n  public int lengthOfLIS(int[] nums, int k) {\n    for (int value : nums) maxValue = Math.max(maxValue, value);\n    tree = new int[4 * (maxValue + 1)];\n    return scan(nums, k, 0, 0);\n  }\n\n  private int scan(int[] nums, int k, int index, int bestAnswer) {\n    if (index == nums.length) return bestAnswer;\n    int value = nums[index];\n    int best = query(1, 1, maxValue, Math.max(1, value - k), value - 1) + 1;\n    update(1, 1, maxValue, value, best);\n    return scan(nums, k, index + 1, Math.max(bestAnswer, best));\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = Math.max(tree[node], value);\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n}",
      "optimizedCode": "class Solution {\n  private int[] tree;\n\n  public int lengthOfLIS(int[] nums, int k) {\n    int max = 0;\n    for (int value : nums) max = Math.max(max, value);\n    tree = new int[4 * (max + 1)];\n    int answer = 0;\n    for (int value : nums) {\n      int left = Math.max(1, value - k);\n      int best = query(1, 1, max, left, value - 1) + 1;\n      update(1, 1, max, value, best);\n      answer = Math.max(answer, best);\n    }\n    return answer;\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = Math.max(tree[node], value);\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n}",
      "code": "class Solution {\n  private int[] tree;\n\n  public int lengthOfLIS(int[] nums, int k) {\n    int max = 0;\n    for (int value : nums) max = Math.max(max, value);\n    tree = new int[4 * (max + 1)];\n    int answer = 0;\n    for (int value : nums) {\n      int left = Math.max(1, value - k);\n      int best = query(1, 1, max, left, value - 1) + 1;\n      update(1, 1, max, value, best);\n      answer = Math.max(answer, best);\n    }\n    return answer;\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = Math.max(tree[node], value);\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Number of Longest Increasing Subsequence",
      "difficulty": "Medium",
      "subpattern": "Segment tree pair aggregate DP",
      "question": "Given nums, return the number of longest strictly increasing subsequences.",
      "trigger": "For each value, we need the best subsequence length and count among all smaller values.",
      "intuition": "Segment tree nodes store a pair: maximum length and total count for that maximum length.",
      "edgeCases": "All equal values, strictly increasing, strictly decreasing, duplicate values, one element.",
      "constraints": "1 <= nums.length <= 2000; answer fits in 32-bit signed int.",
      "source": {
        "label": "Number of Longest Increasing Subsequence - LeetCode 673",
        "url": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,4,7]",
          "output": "2",
          "explanation": "The longest length is 4 with two choices ending at 7."
        },
        {
          "input": "nums = [2,2,2,2,2]",
          "output": "5",
          "explanation": "Every single value is a longest subsequence."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The only subsequence has length 1."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). DP over positions stores length and count.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Segment tree over compressed values stores best length/count pairs.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive segment tree merges length/count pairs.",
      "bruteForceCode": "class Solution {\n  public int findNumberOfLIS(int[] nums) {\n    int n = nums.length;\n    int[] length = new int[n];\n    int[] count = new int[n];\n    int best = 0;\n    int answer = 0;\n    for (int i = 0; i < n; i++) {\n      length[i] = 1;\n      count[i] = 1;\n      for (int j = 0; j < i; j++) {\n        if (nums[j] < nums[i]) {\n          if (length[j] + 1 > length[i]) {\n            length[i] = length[j] + 1;\n            count[i] = count[j];\n          } else if (length[j] + 1 == length[i]) {\n            count[i] += count[j];\n          }\n        }\n      }\n      if (length[i] > best) {\n        best = length[i];\n        answer = count[i];\n      } else if (length[i] == best) {\n        answer += count[i];\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private int[] bestLength;\n  private int[] ways;\n\n  public int findNumberOfLIS(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int size = 0;\n    for (int value : sorted) if (size == 0 || sorted[size - 1] != value) sorted[size++] = value;\n    bestLength = new int[4 * size + 4];\n    ways = new int[4 * size + 4];\n    for (int value : nums) {\n      int rank = lowerBound(sorted, size, value) + 1;\n      int[] best = query(1, 1, size, 1, rank - 1);\n      int length = best[0] + 1;\n      int count = best[1] == 0 ? 1 : best[1];\n      update(1, 1, size, rank, length, count);\n    }\n    return ways[1];\n  }\n\n  private int lowerBound(int[] values, int size, int target) {\n    int left = 0, right = size;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int[] query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return new int[]{0, 0};\n    if (ql <= left && right <= qr) return new int[]{bestLength[node], ways[node]};\n    int mid = left + (right - left) / 2;\n    return merge(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int length, int count) {\n    if (left == right) {\n      int[] merged = merge(new int[]{bestLength[node], ways[node]}, new int[]{length, count});\n      bestLength[node] = merged[0];\n      ways[node] = merged[1];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, length, count);\n    else update(node * 2 + 1, mid + 1, right, index, length, count);\n    int[] merged = merge(new int[]{bestLength[node * 2], ways[node * 2]}, new int[]{bestLength[node * 2 + 1], ways[node * 2 + 1]});\n    bestLength[node] = merged[0];\n    ways[node] = merged[1];\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    if (a[0] == b[0]) return new int[]{a[0], a[1] + b[1]};\n    return a[0] > b[0] ? a : b;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private int[] bestLength;\n  private int[] ways;\n  private int[] values;\n  private int size;\n\n  public int findNumberOfLIS(int[] nums) {\n    values = nums.clone();\n    Arrays.sort(values);\n    for (int value : values) if (size == 0 || values[size - 1] != value) values[size++] = value;\n    bestLength = new int[4 * size + 4];\n    ways = new int[4 * size + 4];\n    scan(nums, 0);\n    return ways[1];\n  }\n\n  private void scan(int[] nums, int index) {\n    if (index == nums.length) return;\n    int rank = lowerBound(nums[index], 0, size) + 1;\n    int[] best = query(1, 1, size, 1, rank - 1);\n    update(1, 1, size, rank, best[0] + 1, best[1] == 0 ? 1 : best[1]);\n    scan(nums, index + 1);\n  }\n\n  private int lowerBound(int target, int left, int right) {\n    if (left >= right) return left;\n    int mid = left + (right - left) / 2;\n    if (values[mid] < target) return lowerBound(target, mid + 1, right);\n    return lowerBound(target, left, mid);\n  }\n\n  private int[] query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return new int[]{0, 0};\n    if (ql <= left && right <= qr) return new int[]{bestLength[node], ways[node]};\n    int mid = left + (right - left) / 2;\n    return merge(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int length, int count) {\n    if (left == right) {\n      int[] merged = merge(new int[]{bestLength[node], ways[node]}, new int[]{length, count});\n      bestLength[node] = merged[0];\n      ways[node] = merged[1];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, length, count);\n    else update(node * 2 + 1, mid + 1, right, index, length, count);\n    int[] merged = merge(new int[]{bestLength[node * 2], ways[node * 2]}, new int[]{bestLength[node * 2 + 1], ways[node * 2 + 1]});\n    bestLength[node] = merged[0];\n    ways[node] = merged[1];\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    if (a[0] == b[0]) return new int[]{a[0], a[1] + b[1]};\n    return a[0] > b[0] ? a : b;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private int[] bestLength;\n  private int[] ways;\n\n  public int findNumberOfLIS(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int size = 0;\n    for (int value : sorted) if (size == 0 || sorted[size - 1] != value) sorted[size++] = value;\n    bestLength = new int[4 * size + 4];\n    ways = new int[4 * size + 4];\n    for (int value : nums) {\n      int rank = lowerBound(sorted, size, value) + 1;\n      int[] best = query(1, 1, size, 1, rank - 1);\n      int length = best[0] + 1;\n      int count = best[1] == 0 ? 1 : best[1];\n      update(1, 1, size, rank, length, count);\n    }\n    return ways[1];\n  }\n\n  private int lowerBound(int[] values, int size, int target) {\n    int left = 0, right = size;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int[] query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return new int[]{0, 0};\n    if (ql <= left && right <= qr) return new int[]{bestLength[node], ways[node]};\n    int mid = left + (right - left) / 2;\n    return merge(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int length, int count) {\n    if (left == right) {\n      int[] merged = merge(new int[]{bestLength[node], ways[node]}, new int[]{length, count});\n      bestLength[node] = merged[0];\n      ways[node] = merged[1];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, length, count);\n    else update(node * 2 + 1, mid + 1, right, index, length, count);\n    int[] merged = merge(new int[]{bestLength[node * 2], ways[node * 2]}, new int[]{bestLength[node * 2 + 1], ways[node * 2 + 1]});\n    bestLength[node] = merged[0];\n    ways[node] = merged[1];\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    if (a[0] == b[0]) return new int[]{a[0], a[1] + b[1]};\n    return a[0] > b[0] ? a : b;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private int[] bestLength;\n  private int[] ways;\n\n  public int findNumberOfLIS(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int size = 0;\n    for (int value : sorted) if (size == 0 || sorted[size - 1] != value) sorted[size++] = value;\n    bestLength = new int[4 * size + 4];\n    ways = new int[4 * size + 4];\n    for (int value : nums) {\n      int rank = lowerBound(sorted, size, value) + 1;\n      int[] best = query(1, 1, size, 1, rank - 1);\n      int length = best[0] + 1;\n      int count = best[1] == 0 ? 1 : best[1];\n      update(1, 1, size, rank, length, count);\n    }\n    return ways[1];\n  }\n\n  private int lowerBound(int[] values, int size, int target) {\n    int left = 0, right = size;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int[] query(int node, int left, int right, int ql, int qr) {\n    if (ql > qr || qr < left || right < ql) return new int[]{0, 0};\n    if (ql <= left && right <= qr) return new int[]{bestLength[node], ways[node]};\n    int mid = left + (right - left) / 2;\n    return merge(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private void update(int node, int left, int right, int index, int length, int count) {\n    if (left == right) {\n      int[] merged = merge(new int[]{bestLength[node], ways[node]}, new int[]{length, count});\n      bestLength[node] = merged[0];\n      ways[node] = merged[1];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, length, count);\n    else update(node * 2 + 1, mid + 1, right, index, length, count);\n    int[] merged = merge(new int[]{bestLength[node * 2], ways[node * 2]}, new int[]{bestLength[node * 2 + 1], ways[node * 2 + 1]});\n    bestLength[node] = merged[0];\n    ways[node] = merged[1];\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    if (a[0] == b[0]) return new int[]{a[0], a[1] + b[1]};\n    return a[0] > b[0] ? a : b;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Handling Sum Queries After Update",
      "difficulty": "Hard",
      "subpattern": "Lazy flip segment tree",
      "question": "Given nums1, nums2, and queries, support flipping nums1 bits in a range, adding p times the number of ones in nums1 to the sum of nums2, and reporting the sum.",
      "trigger": "Range flips change many bits, but later queries only need the total number of ones.",
      "intuition": "A lazy segment tree stores ones count; flipping a segment changes ones to length - ones and toggles a lazy flag.",
      "edgeCases": "Flip full range, flip same range twice, query before any add, nums1 all zero, large nums2 sum needing long.",
      "constraints": "1 <= nums1.length <= 100000; nums1 is binary; queries length up to 100000.",
      "source": {
        "label": "Handling Sum Queries After Update - LeetCode 2569",
        "url": "https://leetcode.com/problems/handling-sum-queries-after-update/"
      },
      "examples": [
        {
          "input": "nums1=[1,0,1], nums2=[0,0,0], queries=[[1,1,1],[2,1,0],[3,0,0]]",
          "output": "[3]",
          "explanation": "After flipping index 1, nums1 has three ones, so add 3."
        },
        {
          "input": "flip the same range twice",
          "output": "original ones count restored",
          "explanation": "Lazy flip toggles cancel when applied twice."
        },
        {
          "input": "query type 3 before type 2",
          "output": "initial sum(nums2)",
          "explanation": "The sum is tracked independently as long."
        }
      ],
      "bruteForceComplexity": "Time O(nq); Space O(answers). Flip bits directly and count ones when needed.",
      "optimizedComplexity": "Time O((n+q) log n); Space O(n + answers). Lazy segment tree supports range flip and total ones.",
      "recursiveComplexity": "Time O(nq); Space O(n + answers + recursion). Recursive brute force flips and counts ranges.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public long[] handleQuery(int[] nums1, int[] nums2, int[][] queries) {\n    long sum = 0;\n    for (int value : nums2) sum += value;\n    List<Long> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) {\n        for (int i = query[1]; i <= query[2]; i++) nums1[i] ^= 1;\n      } else if (query[0] == 2) {\n        int ones = 0;\n        for (int value : nums1) ones += value;\n        sum += (long) query[1] * ones;\n      } else {\n        answer.add(sum);\n      }\n    }\n    long[] result = new long[answer.size()];\n    for (int i = 0; i < answer.size(); i++) result[i] = answer.get(i);\n    return result;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private int[] ones;\n  private boolean[] lazy;\n  private int n;\n\n  public long[] handleQuery(int[] nums1, int[] nums2, int[][] queries) {\n    n = nums1.length;\n    ones = new int[4 * n];\n    lazy = new boolean[4 * n];\n    build(nums1, 1, 0, n - 1);\n    long sum = 0;\n    for (int value : nums2) sum += value;\n    List<Long> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) flip(1, 0, n - 1, query[1], query[2]);\n      else if (query[0] == 2) sum += (long) query[1] * ones[1];\n      else answer.add(sum);\n    }\n    long[] result = new long[answer.size()];\n    for (int i = 0; i < answer.size(); i++) result[i] = answer.get(i);\n    return result;\n  }\n\n  private void build(int[] nums, int node, int left, int right) {\n    if (left == right) {\n      ones[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(nums, node * 2, left, mid);\n    build(nums, node * 2 + 1, mid + 1, right);\n    ones[node] = ones[node * 2] + ones[node * 2 + 1];\n  }\n\n  private void flip(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      apply(node, left, right);\n      return;\n    }\n    push(node, left, right);\n    int mid = left + (right - left) / 2;\n    flip(node * 2, left, mid, ql, qr);\n    flip(node * 2 + 1, mid + 1, right, ql, qr);\n    ones[node] = ones[node * 2] + ones[node * 2 + 1];\n  }\n\n  private void apply(int node, int left, int right) {\n    ones[node] = right - left + 1 - ones[node];\n    lazy[node] = !lazy[node];\n  }\n\n  private void push(int node, int left, int right) {\n    if (!lazy[node] || left == right) return;\n    int mid = left + (right - left) / 2;\n    apply(node * 2, left, mid);\n    apply(node * 2 + 1, mid + 1, right);\n    lazy[node] = false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public long[] handleQuery(int[] nums1, int[] nums2, int[][] queries) {\n    long sum = 0;\n    for (int value : nums2) sum += value;\n    List<Long> answer = new ArrayList<>();\n    process(nums1, queries, 0, sum, answer);\n    long[] result = new long[answer.size()];\n    for (int i = 0; i < answer.size(); i++) result[i] = answer.get(i);\n    return result;\n  }\n\n  private void process(int[] nums1, int[][] queries, int index, long sum, List<Long> answer) {\n    if (index == queries.length) return;\n    int[] query = queries[index];\n    if (query[0] == 1) {\n      flip(nums1, query[1], query[2]);\n    } else if (query[0] == 2) {\n      sum += (long) query[1] * countOnes(nums1, 0);\n    } else {\n      answer.add(sum);\n    }\n    process(nums1, queries, index + 1, sum, answer);\n  }\n\n  private void flip(int[] nums, int left, int right) {\n    if (left > right) return;\n    nums[left] ^= 1;\n    flip(nums, left + 1, right);\n  }\n\n  private int countOnes(int[] nums, int index) {\n    if (index == nums.length) return 0;\n    return nums[index] + countOnes(nums, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private int[] ones;\n  private boolean[] lazy;\n  private int n;\n\n  public long[] handleQuery(int[] nums1, int[] nums2, int[][] queries) {\n    n = nums1.length;\n    ones = new int[4 * n];\n    lazy = new boolean[4 * n];\n    build(nums1, 1, 0, n - 1);\n    long sum = 0;\n    for (int value : nums2) sum += value;\n    List<Long> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) flip(1, 0, n - 1, query[1], query[2]);\n      else if (query[0] == 2) sum += (long) query[1] * ones[1];\n      else answer.add(sum);\n    }\n    long[] result = new long[answer.size()];\n    for (int i = 0; i < answer.size(); i++) result[i] = answer.get(i);\n    return result;\n  }\n\n  private void build(int[] nums, int node, int left, int right) {\n    if (left == right) {\n      ones[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(nums, node * 2, left, mid);\n    build(nums, node * 2 + 1, mid + 1, right);\n    ones[node] = ones[node * 2] + ones[node * 2 + 1];\n  }\n\n  private void flip(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      apply(node, left, right);\n      return;\n    }\n    push(node, left, right);\n    int mid = left + (right - left) / 2;\n    flip(node * 2, left, mid, ql, qr);\n    flip(node * 2 + 1, mid + 1, right, ql, qr);\n    ones[node] = ones[node * 2] + ones[node * 2 + 1];\n  }\n\n  private void apply(int node, int left, int right) {\n    ones[node] = right - left + 1 - ones[node];\n    lazy[node] = !lazy[node];\n  }\n\n  private void push(int node, int left, int right) {\n    if (!lazy[node] || left == right) return;\n    int mid = left + (right - left) / 2;\n    apply(node * 2, left, mid);\n    apply(node * 2 + 1, mid + 1, right);\n    lazy[node] = false;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private int[] ones;\n  private boolean[] lazy;\n  private int n;\n\n  public long[] handleQuery(int[] nums1, int[] nums2, int[][] queries) {\n    n = nums1.length;\n    ones = new int[4 * n];\n    lazy = new boolean[4 * n];\n    build(nums1, 1, 0, n - 1);\n    long sum = 0;\n    for (int value : nums2) sum += value;\n    List<Long> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) flip(1, 0, n - 1, query[1], query[2]);\n      else if (query[0] == 2) sum += (long) query[1] * ones[1];\n      else answer.add(sum);\n    }\n    long[] result = new long[answer.size()];\n    for (int i = 0; i < answer.size(); i++) result[i] = answer.get(i);\n    return result;\n  }\n\n  private void build(int[] nums, int node, int left, int right) {\n    if (left == right) {\n      ones[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(nums, node * 2, left, mid);\n    build(nums, node * 2 + 1, mid + 1, right);\n    ones[node] = ones[node * 2] + ones[node * 2 + 1];\n  }\n\n  private void flip(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      apply(node, left, right);\n      return;\n    }\n    push(node, left, right);\n    int mid = left + (right - left) / 2;\n    flip(node * 2, left, mid, ql, qr);\n    flip(node * 2 + 1, mid + 1, right, ql, qr);\n    ones[node] = ones[node * 2] + ones[node * 2 + 1];\n  }\n\n  private void apply(int node, int left, int right) {\n    ones[node] = right - left + 1 - ones[node];\n    lazy[node] = !lazy[node];\n  }\n\n  private void push(int node, int left, int right) {\n    if (!lazy[node] || left == right) return;\n    int mid = left + (right - left) / 2;\n    apply(node * 2, left, mid);\n    apply(node * 2 + 1, mid + 1, right);\n    lazy[node] = false;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Count Integers in Intervals",
      "difficulty": "Hard",
      "subpattern": "Ordered interval merge counter",
      "question": "Design CountIntervals with add(left, right) and count(), where count returns how many distinct integers are covered by at least one added interval.",
      "trigger": "Intervals arrive online, ranges can overlap, and the answer is the union size after each update.",
      "intuition": "Store disjoint covered intervals; when a new interval arrives, delete every overlapping interval and add back one merged interval while maintaining total length.",
      "edgeCases": "Nested intervals, adjacent intervals, repeated adds, huge coordinate values, and intervals that overlap many stored ranges.",
      "constraints": "1 <= left <= right <= 1e9; many operations require logarithmic interval lookup instead of per-value marking.",
      "source": {
        "label": "LeetCode 2276 - Count Integers in Intervals",
        "url": "https://leetcode.com/problems/count-integers-in-intervals/"
      },
      "examples": [
        {
          "input": "add(2, 3), add(7, 10), count()",
          "output": "6",
          "explanation": "Covered values are 2,3,7,8,9,10."
        },
        {
          "input": "add(5, 8), count()",
          "output": "8",
          "explanation": "The intervals become [2,3] and [5,10], covering 8 integers."
        }
      ],
      "bruteForceComplexity": "Time O(right-left+1) per add and O(1) per count; Space O(number of covered integers).",
      "optimizedComplexity": "Time O(k log m) per add where k intervals are merged and m intervals are stored; Space O(m).",
      "recursiveComplexity": "Time O(m) per add in the recursive list merge; Space O(m) plus O(m) recursion depth.",
      "bruteForceCode": "import java.util.*;\n\nclass CountIntervals {\n  private final Set<Integer> covered = new HashSet<>();\n\n  public void add(int left, int right) {\n    for (long value = left; value <= right; value++) {\n      covered.add((int) value);\n    }\n  }\n\n  public int count() {\n    return covered.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass CountIntervals {\n  private final TreeMap<Integer, Integer> intervals = new TreeMap<>();\n  private long covered;\n\n  public void add(int left, int right) {\n    Map.Entry<Integer, Integer> entry = intervals.floorEntry(right);\n    while (entry != null && entry.getValue() >= left - 1) {\n      left = Math.min(left, entry.getKey());\n      right = Math.max(right, entry.getValue());\n      covered -= (long) entry.getValue() - entry.getKey() + 1;\n      intervals.remove(entry.getKey());\n      entry = intervals.floorEntry(right);\n    }\n    intervals.put(left, right);\n    covered += (long) right - left + 1;\n  }\n\n  public int count() {\n    return (int) covered;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass CountIntervals {\n  private final List<int[]> intervals = new ArrayList<>();\n  private long covered;\n\n  public void add(int left, int right) {\n    merge(0, left, right);\n  }\n\n  public int count() {\n    return (int) covered;\n  }\n\n  private void merge(int index, int left, int right) {\n    if (index == intervals.size() || intervals.get(index)[0] > right + 1) {\n      intervals.add(index, new int[] {left, right});\n      covered += (long) right - left + 1;\n      return;\n    }\n    int[] current = intervals.get(index);\n    if (current[1] < left - 1) {\n      merge(index + 1, left, right);\n      return;\n    }\n    intervals.remove(index);\n    covered -= (long) current[1] - current[0] + 1;\n    merge(index, Math.min(left, current[0]), Math.max(right, current[1]));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass CountIntervals {\n  private final TreeMap<Integer, Integer> intervals = new TreeMap<>();\n  private long covered;\n\n  public void add(int left, int right) {\n    Map.Entry<Integer, Integer> entry = intervals.floorEntry(right);\n    while (entry != null && entry.getValue() >= left - 1) {\n      left = Math.min(left, entry.getKey());\n      right = Math.max(right, entry.getValue());\n      covered -= (long) entry.getValue() - entry.getKey() + 1;\n      intervals.remove(entry.getKey());\n      entry = intervals.floorEntry(right);\n    }\n    intervals.put(left, right);\n    covered += (long) right - left + 1;\n  }\n\n  public int count() {\n    return (int) covered;\n  }\n}",
      "code": "import java.util.*;\n\nclass CountIntervals {\n  private final TreeMap<Integer, Integer> intervals = new TreeMap<>();\n  private long covered;\n\n  public void add(int left, int right) {\n    Map.Entry<Integer, Integer> entry = intervals.floorEntry(right);\n    while (entry != null && entry.getValue() >= left - 1) {\n      left = Math.min(left, entry.getKey());\n      right = Math.max(right, entry.getValue());\n      covered -= (long) entry.getValue() - entry.getKey() + 1;\n      intervals.remove(entry.getKey());\n      entry = intervals.floorEntry(right);\n    }\n    intervals.put(left, right);\n    covered += (long) right - left + 1;\n  }\n\n  public int count() {\n    return (int) covered;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Peaks in Array",
      "difficulty": "Hard",
      "subpattern": "Fenwick peak indicator maintenance",
      "question": "Given nums and queries, type 1 [1,l,r] asks for the number of peak indices inside nums[l..r], and type 2 [2,index,value] updates nums[index].",
      "trigger": "Only indices index-1, index, and index+1 can change peak status after a point update, while range counts are repeated.",
      "intuition": "Convert each interior index into a 0/1 peak indicator, then maintain that indicator array with Fenwick or segment tree range sums.",
      "edgeCases": "Ranges shorter than 3, updates at boundaries, equal neighboring values, and repeated updates to the same value.",
      "constraints": "nums length and queries can be large, so each query should avoid scanning the whole subarray.",
      "source": {
        "label": "LeetCode 3187 - Peaks in Array",
        "url": "https://leetcode.com/problems/peaks-in-array/"
      },
      "examples": [
        {
          "input": "nums=[3,1,4,2,5], query [1,0,4]",
          "output": "[1]",
          "explanation": "Index 2 is the only peak."
        },
        {
          "input": "update index 3 to 6, then query [1,0,4]",
          "output": "[1]",
          "explanation": "The peak moves from index 2 to index 3."
        }
      ],
      "bruteForceComplexity": "Time O(n) per count query and O(1) per update; Space O(1) excluding output.",
      "optimizedComplexity": "Time O((n + q) log n); each update refreshes at most three Fenwick positions; Space O(n).",
      "recursiveComplexity": "Time O((n + q) log n) with recursive segment tree point updates and range sums; Space O(n).",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countOfPeaks(int[] nums, int[][] queries) {\n    List<Integer> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) {\n        int count = 0;\n        for (int index = query[1] + 1; index <= query[2] - 1; index++) {\n          if (isPeak(nums, index)) count++;\n        }\n        answer.add(count);\n      } else {\n        nums[query[1]] = query[2];\n      }\n    }\n    return answer;\n  }\n\n  private boolean isPeak(int[] nums, int index) {\n    return index > 0 && index + 1 < nums.length && nums[index] > nums[index - 1] && nums[index] > nums[index + 1];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countOfPeaks(int[] nums, int[][] queries) {\n    Fenwick tree = new Fenwick(nums.length);\n    for (int index = 1; index + 1 < nums.length; index++) {\n      if (isPeak(nums, index)) tree.add(index, 1);\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) {\n        int left = query[1] + 1;\n        int right = query[2] - 1;\n        answer.add(left <= right ? tree.sumRange(left, right) : 0);\n      } else {\n        int index = query[1];\n        nums[index] = query[2];\n        refresh(nums, tree, index - 1);\n        refresh(nums, tree, index);\n        refresh(nums, tree, index + 1);\n      }\n    }\n    return answer;\n  }\n\n  private void refresh(int[] nums, Fenwick tree, int index) {\n    if (index <= 0 || index + 1 >= nums.length) return;\n    int current = tree.sumRange(index, index);\n    int next = isPeak(nums, index) ? 1 : 0;\n    tree.add(index, next - current);\n  }\n\n  private boolean isPeak(int[] nums, int index) {\n    return nums[index] > nums[index - 1] && nums[index] > nums[index + 1];\n  }\n\n  private static class Fenwick {\n    private final int[] bit;\n\n    Fenwick(int n) {\n      bit = new int[n + 1];\n    }\n\n    void add(int index, int delta) {\n      for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n    }\n\n    int prefixSum(int index) {\n      int sum = 0;\n      for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n      return sum;\n    }\n\n    int sumRange(int left, int right) {\n      return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countOfPeaks(int[] nums, int[][] queries) {\n    int[] peaks = new int[nums.length];\n    for (int i = 1; i + 1 < nums.length; i++) peaks[i] = isPeak(nums, i) ? 1 : 0;\n    SegmentTree tree = new SegmentTree(peaks);\n\n    List<Integer> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) {\n        int left = query[1] + 1;\n        int right = query[2] - 1;\n        answer.add(left <= right ? tree.query(left, right) : 0);\n      } else {\n        int index = query[1];\n        nums[index] = query[2];\n        updatePeak(nums, tree, index - 1);\n        updatePeak(nums, tree, index);\n        updatePeak(nums, tree, index + 1);\n      }\n    }\n    return answer;\n  }\n\n  private void updatePeak(int[] nums, SegmentTree tree, int index) {\n    if (index <= 0 || index + 1 >= nums.length) return;\n    tree.update(index, isPeak(nums, index) ? 1 : 0);\n  }\n\n  private boolean isPeak(int[] nums, int index) {\n    return nums[index] > nums[index - 1] && nums[index] > nums[index + 1];\n  }\n\n  private static class SegmentTree {\n    private final int n;\n    private final int[] tree;\n\n    SegmentTree(int[] values) {\n      n = values.length;\n      tree = new int[Math.max(1, 4 * n)];\n      build(1, 0, n - 1, values);\n    }\n\n    void update(int index, int value) {\n      update(1, 0, n - 1, index, value);\n    }\n\n    int query(int left, int right) {\n      return query(1, 0, n - 1, left, right);\n    }\n\n    private void build(int node, int left, int right, int[] values) {\n      if (left == right) {\n        tree[node] = values[left];\n        return;\n      }\n      int mid = left + (right - left) / 2;\n      build(node * 2, left, mid, values);\n      build(node * 2 + 1, mid + 1, right, values);\n      tree[node] = tree[node * 2] + tree[node * 2 + 1];\n    }\n\n    private void update(int node, int left, int right, int index, int value) {\n      if (left == right) {\n        tree[node] = value;\n        return;\n      }\n      int mid = left + (right - left) / 2;\n      if (index <= mid) update(node * 2, left, mid, index, value);\n      else update(node * 2 + 1, mid + 1, right, index, value);\n      tree[node] = tree[node * 2] + tree[node * 2 + 1];\n    }\n\n    private int query(int node, int left, int right, int ql, int qr) {\n      if (qr < left || right < ql) return 0;\n      if (ql <= left && right <= qr) return tree[node];\n      int mid = left + (right - left) / 2;\n      return query(node * 2, left, mid, ql, qr) + query(node * 2 + 1, mid + 1, right, ql, qr);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countOfPeaks(int[] nums, int[][] queries) {\n    Fenwick tree = new Fenwick(nums.length);\n    for (int index = 1; index + 1 < nums.length; index++) {\n      if (isPeak(nums, index)) tree.add(index, 1);\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) {\n        int left = query[1] + 1;\n        int right = query[2] - 1;\n        answer.add(left <= right ? tree.sumRange(left, right) : 0);\n      } else {\n        int index = query[1];\n        nums[index] = query[2];\n        refresh(nums, tree, index - 1);\n        refresh(nums, tree, index);\n        refresh(nums, tree, index + 1);\n      }\n    }\n    return answer;\n  }\n\n  private void refresh(int[] nums, Fenwick tree, int index) {\n    if (index <= 0 || index + 1 >= nums.length) return;\n    int current = tree.sumRange(index, index);\n    int next = isPeak(nums, index) ? 1 : 0;\n    tree.add(index, next - current);\n  }\n\n  private boolean isPeak(int[] nums, int index) {\n    return nums[index] > nums[index - 1] && nums[index] > nums[index + 1];\n  }\n\n  private static class Fenwick {\n    private final int[] bit;\n\n    Fenwick(int n) {\n      bit = new int[n + 1];\n    }\n\n    void add(int index, int delta) {\n      for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n    }\n\n    int prefixSum(int index) {\n      int sum = 0;\n      for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n      return sum;\n    }\n\n    int sumRange(int left, int right) {\n      return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> countOfPeaks(int[] nums, int[][] queries) {\n    Fenwick tree = new Fenwick(nums.length);\n    for (int index = 1; index + 1 < nums.length; index++) {\n      if (isPeak(nums, index)) tree.add(index, 1);\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    for (int[] query : queries) {\n      if (query[0] == 1) {\n        int left = query[1] + 1;\n        int right = query[2] - 1;\n        answer.add(left <= right ? tree.sumRange(left, right) : 0);\n      } else {\n        int index = query[1];\n        nums[index] = query[2];\n        refresh(nums, tree, index - 1);\n        refresh(nums, tree, index);\n        refresh(nums, tree, index + 1);\n      }\n    }\n    return answer;\n  }\n\n  private void refresh(int[] nums, Fenwick tree, int index) {\n    if (index <= 0 || index + 1 >= nums.length) return;\n    int current = tree.sumRange(index, index);\n    int next = isPeak(nums, index) ? 1 : 0;\n    tree.add(index, next - current);\n  }\n\n  private boolean isPeak(int[] nums, int index) {\n    return nums[index] > nums[index - 1] && nums[index] > nums[index + 1];\n  }\n\n  private static class Fenwick {\n    private final int[] bit;\n\n    Fenwick(int n) {\n      bit = new int[n + 1];\n    }\n\n    void add(int index, int delta) {\n      for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n    }\n\n    int prefixSum(int index) {\n      int sum = 0;\n      for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n      return sum;\n    }\n\n    int sumRange(int left, int right) {\n      return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Booking Concert Tickets in Groups",
      "difficulty": "Hard",
      "subpattern": "Segment tree gather and scatter",
      "question": "Design BookMyShow with gather(k,maxRow), which seats k people contiguously in one row, and scatter(k,maxRow), which seats k people anywhere across rows 0..maxRow.",
      "trigger": "You need both first row with enough remaining seats and total remaining seats across a prefix of rows.",
      "intuition": "Store max free seats and sum free seats for each row segment; max answers gather search, sum answers scatter feasibility.",
      "edgeCases": "maxRow clipping, exact row capacity, k larger than one row for scatter, empty return for gather, and repeated partial row fills.",
      "constraints": "n and operations are large; scanning every row for each request is too slow.",
      "source": {
        "label": "LeetCode 2286 - Booking Concert Tickets in Groups",
        "url": "https://leetcode.com/problems/booking-concert-tickets-in-groups/"
      },
      "examples": [
        {
          "input": "BookMyShow(2,5); gather(4,0)",
          "output": "[0,0]",
          "explanation": "Row 0 has 5 free seats and gives seats starting at 0."
        },
        {
          "input": "scatter(6,1)",
          "output": "true",
          "explanation": "The remaining one seat in row 0 and five in row 1 are enough."
        }
      ],
      "bruteForceComplexity": "Time O(n) per gather or scatter plus seats filled; Space O(n).",
      "optimizedComplexity": "Time O(log n) for gather and O(t log n) for scatter where t rows are touched; Space O(n).",
      "recursiveComplexity": "Time O(n) in the recursive direct simulation; Space O(n) plus recursion depth.",
      "bruteForceCode": "class BookMyShow {\n  private final int rows;\n  private final int seatsPerRow;\n  private final int[] used;\n\n  public BookMyShow(int n, int m) {\n    rows = n;\n    seatsPerRow = m;\n    used = new int[n];\n  }\n\n  public int[] gather(int k, int maxRow) {\n    for (int row = 0; row <= Math.min(maxRow, rows - 1); row++) {\n      if (seatsPerRow - used[row] >= k) {\n        int start = used[row];\n        used[row] += k;\n        return new int[] {row, start};\n      }\n    }\n    return new int[0];\n  }\n\n  public boolean scatter(int k, int maxRow) {\n    long free = 0;\n    for (int row = 0; row <= Math.min(maxRow, rows - 1); row++) free += seatsPerRow - used[row];\n    if (free < k) return false;\n\n    for (int row = 0; row <= Math.min(maxRow, rows - 1) && k > 0; row++) {\n      int take = Math.min(k, seatsPerRow - used[row]);\n      used[row] += take;\n      k -= take;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class BookMyShow {\n  private final int n;\n  private final int m;\n  private final long[] sum;\n  private final int[] max;\n\n  public BookMyShow(int n, int m) {\n    this.n = n;\n    this.m = m;\n    sum = new long[4 * n];\n    max = new int[4 * n];\n    build(1, 0, n - 1);\n  }\n\n  public int[] gather(int k, int maxRow) {\n    maxRow = Math.min(maxRow, n - 1);\n    if (queryMax(1, 0, n - 1, 0, maxRow) < k) return new int[0];\n    int row = findFirst(1, 0, n - 1, maxRow, k);\n    int free = (int) querySum(1, 0, n - 1, row, row);\n    int start = m - free;\n    update(1, 0, n - 1, row, free - k);\n    return new int[] {row, start};\n  }\n\n  public boolean scatter(int k, int maxRow) {\n    maxRow = Math.min(maxRow, n - 1);\n    if (querySum(1, 0, n - 1, 0, maxRow) < k) return false;\n    while (k > 0) {\n      int row = findFirst(1, 0, n - 1, maxRow, 1);\n      int free = (int) querySum(1, 0, n - 1, row, row);\n      int take = Math.min(k, free);\n      update(1, 0, n - 1, row, free - take);\n      k -= take;\n    }\n    return true;\n  }\n\n  private void build(int node, int left, int right) {\n    if (left == right) {\n      sum[node] = m;\n      max[node] = m;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    pull(node);\n  }\n\n  private void update(int node, int left, int right, int index, int free) {\n    if (left == right) {\n      sum[node] = free;\n      max[node] = free;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, free);\n    else update(node * 2 + 1, mid + 1, right, index, free);\n    pull(node);\n  }\n\n  private int findFirst(int node, int left, int right, int maxRow, int need) {\n    if (left > maxRow || max[node] < need) return -1;\n    if (left == right) return left;\n    int mid = left + (right - left) / 2;\n    int fromLeft = findFirst(node * 2, left, mid, maxRow, need);\n    return fromLeft != -1 ? fromLeft : findFirst(node * 2 + 1, mid + 1, right, maxRow, need);\n  }\n\n  private int queryMax(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return max[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(queryMax(node * 2, left, mid, ql, qr), queryMax(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private long querySum(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return sum[node];\n    int mid = left + (right - left) / 2;\n    return querySum(node * 2, left, mid, ql, qr) + querySum(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n\n  private void pull(int node) {\n    sum[node] = sum[node * 2] + sum[node * 2 + 1];\n    max[node] = Math.max(max[node * 2], max[node * 2 + 1]);\n  }\n}",
      "recursiveCode": "class BookMyShow {\n  private final int rows;\n  private final int seatsPerRow;\n  private final int[] used;\n\n  public BookMyShow(int n, int m) {\n    rows = n;\n    seatsPerRow = m;\n    used = new int[n];\n  }\n\n  public int[] gather(int k, int maxRow) {\n    return gather(0, Math.min(maxRow, rows - 1), k);\n  }\n\n  public boolean scatter(int k, int maxRow) {\n    maxRow = Math.min(maxRow, rows - 1);\n    if (freeSeats(0, maxRow) < k) return false;\n    scatter(0, maxRow, new int[] {k});\n    return true;\n  }\n\n  private int[] gather(int row, int maxRow, int k) {\n    if (row > maxRow) return new int[0];\n    if (seatsPerRow - used[row] >= k) {\n      int start = used[row];\n      used[row] += k;\n      return new int[] {row, start};\n    }\n    return gather(row + 1, maxRow, k);\n  }\n\n  private long freeSeats(int row, int maxRow) {\n    if (row > maxRow) return 0;\n    return seatsPerRow - used[row] + freeSeats(row + 1, maxRow);\n  }\n\n  private void scatter(int row, int maxRow, int[] remaining) {\n    if (row > maxRow || remaining[0] == 0) return;\n    int take = Math.min(remaining[0], seatsPerRow - used[row]);\n    used[row] += take;\n    remaining[0] -= take;\n    scatter(row + 1, maxRow, remaining);\n  }\n}",
      "optimizedCode": "class BookMyShow {\n  private final int n;\n  private final int m;\n  private final long[] sum;\n  private final int[] max;\n\n  public BookMyShow(int n, int m) {\n    this.n = n;\n    this.m = m;\n    sum = new long[4 * n];\n    max = new int[4 * n];\n    build(1, 0, n - 1);\n  }\n\n  public int[] gather(int k, int maxRow) {\n    maxRow = Math.min(maxRow, n - 1);\n    if (queryMax(1, 0, n - 1, 0, maxRow) < k) return new int[0];\n    int row = findFirst(1, 0, n - 1, maxRow, k);\n    int free = (int) querySum(1, 0, n - 1, row, row);\n    int start = m - free;\n    update(1, 0, n - 1, row, free - k);\n    return new int[] {row, start};\n  }\n\n  public boolean scatter(int k, int maxRow) {\n    maxRow = Math.min(maxRow, n - 1);\n    if (querySum(1, 0, n - 1, 0, maxRow) < k) return false;\n    while (k > 0) {\n      int row = findFirst(1, 0, n - 1, maxRow, 1);\n      int free = (int) querySum(1, 0, n - 1, row, row);\n      int take = Math.min(k, free);\n      update(1, 0, n - 1, row, free - take);\n      k -= take;\n    }\n    return true;\n  }\n\n  private void build(int node, int left, int right) {\n    if (left == right) {\n      sum[node] = m;\n      max[node] = m;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    pull(node);\n  }\n\n  private void update(int node, int left, int right, int index, int free) {\n    if (left == right) {\n      sum[node] = free;\n      max[node] = free;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, free);\n    else update(node * 2 + 1, mid + 1, right, index, free);\n    pull(node);\n  }\n\n  private int findFirst(int node, int left, int right, int maxRow, int need) {\n    if (left > maxRow || max[node] < need) return -1;\n    if (left == right) return left;\n    int mid = left + (right - left) / 2;\n    int fromLeft = findFirst(node * 2, left, mid, maxRow, need);\n    return fromLeft != -1 ? fromLeft : findFirst(node * 2 + 1, mid + 1, right, maxRow, need);\n  }\n\n  private int queryMax(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return max[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(queryMax(node * 2, left, mid, ql, qr), queryMax(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private long querySum(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return sum[node];\n    int mid = left + (right - left) / 2;\n    return querySum(node * 2, left, mid, ql, qr) + querySum(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n\n  private void pull(int node) {\n    sum[node] = sum[node * 2] + sum[node * 2 + 1];\n    max[node] = Math.max(max[node * 2], max[node * 2 + 1]);\n  }\n}",
      "code": "class BookMyShow {\n  private final int n;\n  private final int m;\n  private final long[] sum;\n  private final int[] max;\n\n  public BookMyShow(int n, int m) {\n    this.n = n;\n    this.m = m;\n    sum = new long[4 * n];\n    max = new int[4 * n];\n    build(1, 0, n - 1);\n  }\n\n  public int[] gather(int k, int maxRow) {\n    maxRow = Math.min(maxRow, n - 1);\n    if (queryMax(1, 0, n - 1, 0, maxRow) < k) return new int[0];\n    int row = findFirst(1, 0, n - 1, maxRow, k);\n    int free = (int) querySum(1, 0, n - 1, row, row);\n    int start = m - free;\n    update(1, 0, n - 1, row, free - k);\n    return new int[] {row, start};\n  }\n\n  public boolean scatter(int k, int maxRow) {\n    maxRow = Math.min(maxRow, n - 1);\n    if (querySum(1, 0, n - 1, 0, maxRow) < k) return false;\n    while (k > 0) {\n      int row = findFirst(1, 0, n - 1, maxRow, 1);\n      int free = (int) querySum(1, 0, n - 1, row, row);\n      int take = Math.min(k, free);\n      update(1, 0, n - 1, row, free - take);\n      k -= take;\n    }\n    return true;\n  }\n\n  private void build(int node, int left, int right) {\n    if (left == right) {\n      sum[node] = m;\n      max[node] = m;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    pull(node);\n  }\n\n  private void update(int node, int left, int right, int index, int free) {\n    if (left == right) {\n      sum[node] = free;\n      max[node] = free;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, free);\n    else update(node * 2 + 1, mid + 1, right, index, free);\n    pull(node);\n  }\n\n  private int findFirst(int node, int left, int right, int maxRow, int need) {\n    if (left > maxRow || max[node] < need) return -1;\n    if (left == right) return left;\n    int mid = left + (right - left) / 2;\n    int fromLeft = findFirst(node * 2, left, mid, maxRow, need);\n    return fromLeft != -1 ? fromLeft : findFirst(node * 2 + 1, mid + 1, right, maxRow, need);\n  }\n\n  private int queryMax(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return max[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(queryMax(node * 2, left, mid, ql, qr), queryMax(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private long querySum(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return sum[node];\n    int mid = left + (right - left) / 2;\n    return querySum(node * 2, left, mid, ql, qr) + querySum(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n\n  private void pull(int node) {\n    sum[node] = sum[node * 2] + sum[node * 2 + 1];\n    max[node] = Math.max(max[node * 2], max[node * 2 + 1]);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Range Frequency Queries",
      "difficulty": "Medium",
      "subpattern": "Value-to-index range frequency",
      "question": "Design RangeFreqQuery so query(left, right, value) returns how many times value appears between left and right inclusive.",
      "trigger": "The array is static, but many queries ask for one value inside an index range.",
      "intuition": "Group sorted indices by value; each query becomes two binary searches in that value's index list.",
      "edgeCases": "Value absent from the array, single-position ranges, duplicates clustered together, and querying full array boundaries.",
      "constraints": "Large query count makes repeated range scans too slow; preprocessing is allowed because values do not update.",
      "source": {
        "label": "LeetCode 2080 - Range Frequency Queries",
        "url": "https://leetcode.com/problems/range-frequency-queries/"
      },
      "examples": [
        {
          "input": "arr=[12,33,4,56,22,2,34,33,22,12,34,56], query(1,2,4)",
          "output": "1",
          "explanation": "Only index 2 contains 4."
        },
        {
          "input": "query(0,11,33)",
          "output": "2",
          "explanation": "The value 33 appears at indices 1 and 7."
        }
      ],
      "bruteForceComplexity": "Time O(right-left+1) per query; Space O(n) to store the array.",
      "optimizedComplexity": "Time O(n) preprocessing and O(log f) per query where f is frequency of value; Space O(n).",
      "recursiveComplexity": "Time O(log f) per query using recursive binary searches; Space O(log f) recursion depth.",
      "bruteForceCode": "class RangeFreqQuery {\n  private final int[] arr;\n\n  public RangeFreqQuery(int[] arr) {\n    this.arr = arr.clone();\n  }\n\n  public int query(int left, int right, int value) {\n    int count = 0;\n    for (int index = left; index <= right; index++) {\n      if (arr[index] == value) count++;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RangeFreqQuery {\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public RangeFreqQuery(int[] arr) {\n    for (int index = 0; index < arr.length; index++) {\n      positions.computeIfAbsent(arr[index], key -> new ArrayList<>()).add(index);\n    }\n  }\n\n  public int query(int left, int right, int value) {\n    List<Integer> list = positions.get(value);\n    if (list == null) return 0;\n    return upperBound(list, right) - lowerBound(list, left);\n  }\n\n  private int lowerBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass RangeFreqQuery {\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public RangeFreqQuery(int[] arr) {\n    for (int index = 0; index < arr.length; index++) {\n      positions.computeIfAbsent(arr[index], key -> new ArrayList<>()).add(index);\n    }\n  }\n\n  public int query(int left, int right, int value) {\n    List<Integer> list = positions.get(value);\n    if (list == null) return 0;\n    return upperBound(list, right, 0, list.size()) - lowerBound(list, left, 0, list.size());\n  }\n\n  private int lowerBound(List<Integer> list, int target, int left, int right) {\n    if (left >= right) return left;\n    int mid = left + (right - left) / 2;\n    if (list.get(mid) < target) return lowerBound(list, target, mid + 1, right);\n    return lowerBound(list, target, left, mid);\n  }\n\n  private int upperBound(List<Integer> list, int target, int left, int right) {\n    if (left >= right) return left;\n    int mid = left + (right - left) / 2;\n    if (list.get(mid) <= target) return upperBound(list, target, mid + 1, right);\n    return upperBound(list, target, left, mid);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RangeFreqQuery {\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public RangeFreqQuery(int[] arr) {\n    for (int index = 0; index < arr.length; index++) {\n      positions.computeIfAbsent(arr[index], key -> new ArrayList<>()).add(index);\n    }\n  }\n\n  public int query(int left, int right, int value) {\n    List<Integer> list = positions.get(value);\n    if (list == null) return 0;\n    return upperBound(list, right) - lowerBound(list, left);\n  }\n\n  private int lowerBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "code": "import java.util.*;\n\nclass RangeFreqQuery {\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public RangeFreqQuery(int[] arr) {\n    for (int index = 0; index < arr.length; index++) {\n      positions.computeIfAbsent(arr[index], key -> new ArrayList<>()).add(index);\n    }\n  }\n\n  public int query(int left, int right, int value) {\n    List<Integer> list = positions.get(value);\n    if (list == null) return 0;\n    return upperBound(list, right) - lowerBound(list, left);\n  }\n\n  private int lowerBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Mutable Range Minimum Query",
      "difficulty": "Medium",
      "subpattern": "Mutable range minimum tree",
      "question": "Design a data structure with update(index, value) and rangeMin(left, right) over a mutable integer array.",
      "trigger": "Point updates and repeated range minimum queries need the minimum of many reusable array segments.",
      "intuition": "Each tree node stores the minimum of its interval; after a point update, only ancestors of that leaf change.",
      "edgeCases": "Single element arrays, negative values, full-range query, same index updated repeatedly, and left equal to right.",
      "constraints": "Use O(log n) updates and queries when the operation count is large.",
      "source": {
        "label": "Segment Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html"
      },
      "examples": [
        {
          "input": "nums=[5,2,7,3], rangeMin(1,3)",
          "output": "2",
          "explanation": "Minimum in [2,7,3] is 2."
        },
        {
          "input": "update(1,8), rangeMin(1,3)",
          "output": "3",
          "explanation": "The range becomes [8,7,3]."
        }
      ],
      "bruteForceComplexity": "Time O(n) per query and O(1) per update; Space O(n).",
      "optimizedComplexity": "Time O(log n) per update/query with an iterative segment tree; Space O(n).",
      "recursiveComplexity": "Time O(log n) per update/query; Space O(n) tree plus O(log n) recursion depth.",
      "bruteForceCode": "class RangeMinQuery {\n  private final int[] nums;\n\n  public RangeMinQuery(int[] nums) {\n    this.nums = nums.clone();\n  }\n\n  public void update(int index, int value) {\n    nums[index] = value;\n  }\n\n  public int rangeMin(int left, int right) {\n    int best = Integer.MAX_VALUE;\n    for (int index = left; index <= right; index++) best = Math.min(best, nums[index]);\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RangeMinQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeMinQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    Arrays.fill(tree, Integer.MAX_VALUE);\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = Math.min(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = Math.min(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeMin(int left, int right) {\n    int answer = Integer.MAX_VALUE;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = Math.min(answer, tree[left++]);\n      if ((right & 1) == 0) answer = Math.min(answer, tree[right--]);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class RangeMinQuery {\n  private final int n;\n  private final int[] tree;\n\n  public RangeMinQuery(int[] nums) {\n    n = nums.length;\n    tree = new int[4 * n];\n    build(1, 0, n - 1, nums);\n  }\n\n  public void update(int index, int value) {\n    update(1, 0, n - 1, index, value);\n  }\n\n  public int rangeMin(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int node, int left, int right, int[] nums) {\n    if (left == right) {\n      tree[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, nums);\n    build(node * 2 + 1, mid + 1, right, nums);\n    tree[node] = Math.min(tree[node * 2], tree[node * 2 + 1]);\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = value;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = Math.min(tree[node * 2], tree[node * 2 + 1]);\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return Integer.MAX_VALUE;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return Math.min(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RangeMinQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeMinQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    Arrays.fill(tree, Integer.MAX_VALUE);\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = Math.min(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = Math.min(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeMin(int left, int right) {\n    int answer = Integer.MAX_VALUE;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = Math.min(answer, tree[left++]);\n      if ((right & 1) == 0) answer = Math.min(answer, tree[right--]);\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass RangeMinQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeMinQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    Arrays.fill(tree, Integer.MAX_VALUE);\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = Math.min(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = Math.min(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeMin(int left, int right) {\n    int answer = Integer.MAX_VALUE;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = Math.min(answer, tree[left++]);\n      if ((right & 1) == 0) answer = Math.min(answer, tree[right--]);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Mutable Range Maximum Query",
      "difficulty": "Medium",
      "subpattern": "Mutable range maximum tree",
      "question": "Design a data structure with update(index, value) and rangeMax(left, right) over a mutable integer array.",
      "trigger": "Point updates and repeated range maximum queries need the maximum of reusable segments.",
      "intuition": "Each node stores the maximum of its interval; combine two children with max and recompute ancestors after updates.",
      "edgeCases": "All negative values, single-element ranges, full-range query, and updating a value below the current maximum.",
      "constraints": "Large operation counts require O(log n) instead of O(n) range scans.",
      "source": {
        "label": "Segment Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html"
      },
      "examples": [
        {
          "input": "nums=[5,2,7,3], rangeMax(1,3)",
          "output": "7",
          "explanation": "Maximum in [2,7,3] is 7."
        },
        {
          "input": "update(2,1), rangeMax(1,3)",
          "output": "3",
          "explanation": "The range becomes [2,1,3]."
        }
      ],
      "bruteForceComplexity": "Time O(n) per query and O(1) per update; Space O(n).",
      "optimizedComplexity": "Time O(log n) per update/query with an iterative segment tree; Space O(n).",
      "recursiveComplexity": "Time O(log n) per update/query; Space O(n) tree plus O(log n) recursion depth.",
      "bruteForceCode": "class RangeMaxQuery {\n  private final int[] nums;\n\n  public RangeMaxQuery(int[] nums) {\n    this.nums = nums.clone();\n  }\n\n  public void update(int index, int value) {\n    nums[index] = value;\n  }\n\n  public int rangeMax(int left, int right) {\n    int best = Integer.MIN_VALUE;\n    for (int index = left; index <= right; index++) best = Math.max(best, nums[index]);\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RangeMaxQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeMaxQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    Arrays.fill(tree, Integer.MIN_VALUE);\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = Math.max(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = Math.max(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeMax(int left, int right) {\n    int answer = Integer.MIN_VALUE;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = Math.max(answer, tree[left++]);\n      if ((right & 1) == 0) answer = Math.max(answer, tree[right--]);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class RangeMaxQuery {\n  private final int n;\n  private final int[] tree;\n\n  public RangeMaxQuery(int[] nums) {\n    n = nums.length;\n    tree = new int[4 * n];\n    build(1, 0, n - 1, nums);\n  }\n\n  public void update(int index, int value) {\n    update(1, 0, n - 1, index, value);\n  }\n\n  public int rangeMax(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int node, int left, int right, int[] nums) {\n    if (left == right) {\n      tree[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, nums);\n    build(node * 2 + 1, mid + 1, right, nums);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = value;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return Integer.MIN_VALUE;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return Math.max(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RangeMaxQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeMaxQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    Arrays.fill(tree, Integer.MIN_VALUE);\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = Math.max(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = Math.max(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeMax(int left, int right) {\n    int answer = Integer.MIN_VALUE;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = Math.max(answer, tree[left++]);\n      if ((right & 1) == 0) answer = Math.max(answer, tree[right--]);\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass RangeMaxQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeMaxQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    Arrays.fill(tree, Integer.MIN_VALUE);\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = Math.max(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = Math.max(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeMax(int left, int right) {\n    int answer = Integer.MIN_VALUE;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = Math.max(answer, tree[left++]);\n      if ((right & 1) == 0) answer = Math.max(answer, tree[right--]);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Lazy Propagation Range Add",
      "difficulty": "Hard",
      "subpattern": "Lazy range add range sum",
      "question": "Design RangeAddSum with addRange(left,right,delta) and sumRange(left,right) over a mutable integer array.",
      "trigger": "Range updates and range sum queries overlap heavily, so updating every element is too slow.",
      "intuition": "Store each segment sum and delay a uniform addition on a segment until a child must be visited.",
      "edgeCases": "Negative deltas, full-range updates, single-index updates, overlapping updates, and long sums that exceed int.",
      "constraints": "Use lazy propagation to keep both range add and range sum near O(log n).",
      "source": {
        "label": "Lazy Segment Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html#range-updates-lazy-propagation"
      },
      "examples": [
        {
          "input": "nums=[1,2,3,4], addRange(1,3,2), sumRange(0,3)",
          "output": "16",
          "explanation": "Array becomes [1,4,5,6]."
        },
        {
          "input": "sumRange(1,2)",
          "output": "9",
          "explanation": "The updated middle range is 4+5."
        }
      ],
      "bruteForceComplexity": "Time O(n) per range add and O(n) per range sum; Space O(n).",
      "optimizedComplexity": "Time O(log n) amortized per operation with iterative lazy propagation; Space O(n).",
      "recursiveComplexity": "Time O(log n) per operation with recursive lazy propagation; Space O(n) plus recursion depth.",
      "bruteForceCode": "class RangeAddSum {\n  private final long[] nums;\n\n  public RangeAddSum(int[] nums) {\n    this.nums = new long[nums.length];\n    for (int i = 0; i < nums.length; i++) this.nums[i] = nums[i];\n  }\n\n  public void addRange(int left, int right, long delta) {\n    for (int index = left; index <= right; index++) nums[index] += delta;\n  }\n\n  public long sumRange(int left, int right) {\n    long sum = 0;\n    for (int index = left; index <= right; index++) sum += nums[index];\n    return sum;\n  }\n}",
      "iterativeCode": "class RangeAddSum {\n  private final int size;\n  private final int height;\n  private final long[] tree;\n  private final long[] lazy;\n  private final int[] length;\n\n  public RangeAddSum(int[] nums) {\n    int power = 1;\n    int levels = 0;\n    while (power < nums.length) {\n      power <<= 1;\n      levels++;\n    }\n    size = power;\n    height = levels;\n    tree = new long[2 * size];\n    lazy = new long[2 * size];\n    length = new int[2 * size];\n    for (int i = 0; i < size; i++) length[size + i] = i < nums.length ? 1 : 0;\n    for (int i = size - 1; i > 0; i--) length[i] = length[i * 2] + length[i * 2 + 1];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) pull(i);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    int l = left + size;\n    int r = right + size;\n    int originalLeft = l;\n    int originalRight = r;\n    pushPath(l);\n    pushPath(r);\n    while (l <= r) {\n      if ((l & 1) == 1) apply(l++, delta);\n      if ((r & 1) == 0) apply(r--, delta);\n      l >>= 1;\n      r >>= 1;\n    }\n    pullPath(originalLeft);\n    pullPath(originalRight);\n  }\n\n  public long sumRange(int left, int right) {\n    int l = left + size;\n    int r = right + size;\n    pushPath(l);\n    pushPath(r);\n    long sum = 0;\n    while (l <= r) {\n      if ((l & 1) == 1) sum += tree[l++];\n      if ((r & 1) == 0) sum += tree[r--];\n      l >>= 1;\n      r >>= 1;\n    }\n    return sum;\n  }\n\n  private void apply(int node, long delta) {\n    tree[node] += delta * length[node];\n    if (node < size) lazy[node] += delta;\n  }\n\n  private void push(int node) {\n    if (lazy[node] == 0) return;\n    apply(node * 2, lazy[node]);\n    apply(node * 2 + 1, lazy[node]);\n    lazy[node] = 0;\n  }\n\n  private void pushPath(int node) {\n    for (int level = height; level > 0; level--) push(node >> level);\n  }\n\n  private void pull(int node) {\n    tree[node] = tree[node * 2] + tree[node * 2 + 1] + lazy[node] * length[node];\n  }\n\n  private void pullPath(int node) {\n    for (node >>= 1; node > 0; node >>= 1) pull(node);\n  }\n}",
      "recursiveCode": "class RangeAddSum {\n  private final int n;\n  private final long[] tree;\n  private final long[] lazy;\n\n  public RangeAddSum(int[] nums) {\n    n = nums.length;\n    tree = new long[4 * n];\n    lazy = new long[4 * n];\n    build(1, 0, n - 1, nums);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(1, 0, n - 1, left, right, delta);\n  }\n\n  public long sumRange(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int node, int left, int right, int[] nums) {\n    if (left == right) {\n      tree[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, nums);\n    build(node * 2 + 1, mid + 1, right, nums);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private void add(int node, int left, int right, int ql, int qr, long delta) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      tree[node] += delta * (right - left + 1L);\n      lazy[node] += delta;\n      return;\n    }\n    push(node, left, right);\n    int mid = left + (right - left) / 2;\n    add(node * 2, left, mid, ql, qr, delta);\n    add(node * 2 + 1, mid + 1, right, ql, qr, delta);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private long query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    push(node, left, right);\n    int mid = left + (right - left) / 2;\n    return query(node * 2, left, mid, ql, qr) + query(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n\n  private void push(int node, int left, int right) {\n    if (lazy[node] == 0 || left == right) return;\n    int mid = left + (right - left) / 2;\n    apply(node * 2, left, mid, lazy[node]);\n    apply(node * 2 + 1, mid + 1, right, lazy[node]);\n    lazy[node] = 0;\n  }\n\n  private void apply(int node, int left, int right, long delta) {\n    tree[node] += delta * (right - left + 1L);\n    lazy[node] += delta;\n  }\n}",
      "optimizedCode": "class RangeAddSum {\n  private final int size;\n  private final int height;\n  private final long[] tree;\n  private final long[] lazy;\n  private final int[] length;\n\n  public RangeAddSum(int[] nums) {\n    int power = 1;\n    int levels = 0;\n    while (power < nums.length) {\n      power <<= 1;\n      levels++;\n    }\n    size = power;\n    height = levels;\n    tree = new long[2 * size];\n    lazy = new long[2 * size];\n    length = new int[2 * size];\n    for (int i = 0; i < size; i++) length[size + i] = i < nums.length ? 1 : 0;\n    for (int i = size - 1; i > 0; i--) length[i] = length[i * 2] + length[i * 2 + 1];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) pull(i);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    int l = left + size;\n    int r = right + size;\n    int originalLeft = l;\n    int originalRight = r;\n    pushPath(l);\n    pushPath(r);\n    while (l <= r) {\n      if ((l & 1) == 1) apply(l++, delta);\n      if ((r & 1) == 0) apply(r--, delta);\n      l >>= 1;\n      r >>= 1;\n    }\n    pullPath(originalLeft);\n    pullPath(originalRight);\n  }\n\n  public long sumRange(int left, int right) {\n    int l = left + size;\n    int r = right + size;\n    pushPath(l);\n    pushPath(r);\n    long sum = 0;\n    while (l <= r) {\n      if ((l & 1) == 1) sum += tree[l++];\n      if ((r & 1) == 0) sum += tree[r--];\n      l >>= 1;\n      r >>= 1;\n    }\n    return sum;\n  }\n\n  private void apply(int node, long delta) {\n    tree[node] += delta * length[node];\n    if (node < size) lazy[node] += delta;\n  }\n\n  private void push(int node) {\n    if (lazy[node] == 0) return;\n    apply(node * 2, lazy[node]);\n    apply(node * 2 + 1, lazy[node]);\n    lazy[node] = 0;\n  }\n\n  private void pushPath(int node) {\n    for (int level = height; level > 0; level--) push(node >> level);\n  }\n\n  private void pull(int node) {\n    tree[node] = tree[node * 2] + tree[node * 2 + 1] + lazy[node] * length[node];\n  }\n\n  private void pullPath(int node) {\n    for (node >>= 1; node > 0; node >>= 1) pull(node);\n  }\n}",
      "code": "class RangeAddSum {\n  private final int size;\n  private final int height;\n  private final long[] tree;\n  private final long[] lazy;\n  private final int[] length;\n\n  public RangeAddSum(int[] nums) {\n    int power = 1;\n    int levels = 0;\n    while (power < nums.length) {\n      power <<= 1;\n      levels++;\n    }\n    size = power;\n    height = levels;\n    tree = new long[2 * size];\n    lazy = new long[2 * size];\n    length = new int[2 * size];\n    for (int i = 0; i < size; i++) length[size + i] = i < nums.length ? 1 : 0;\n    for (int i = size - 1; i > 0; i--) length[i] = length[i * 2] + length[i * 2 + 1];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) pull(i);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    int l = left + size;\n    int r = right + size;\n    int originalLeft = l;\n    int originalRight = r;\n    pushPath(l);\n    pushPath(r);\n    while (l <= r) {\n      if ((l & 1) == 1) apply(l++, delta);\n      if ((r & 1) == 0) apply(r--, delta);\n      l >>= 1;\n      r >>= 1;\n    }\n    pullPath(originalLeft);\n    pullPath(originalRight);\n  }\n\n  public long sumRange(int left, int right) {\n    int l = left + size;\n    int r = right + size;\n    pushPath(l);\n    pushPath(r);\n    long sum = 0;\n    while (l <= r) {\n      if ((l & 1) == 1) sum += tree[l++];\n      if ((r & 1) == 0) sum += tree[r--];\n      l >>= 1;\n      r >>= 1;\n    }\n    return sum;\n  }\n\n  private void apply(int node, long delta) {\n    tree[node] += delta * length[node];\n    if (node < size) lazy[node] += delta;\n  }\n\n  private void push(int node) {\n    if (lazy[node] == 0) return;\n    apply(node * 2, lazy[node]);\n    apply(node * 2 + 1, lazy[node]);\n    lazy[node] = 0;\n  }\n\n  private void pushPath(int node) {\n    for (int level = height; level > 0; level--) push(node >> level);\n  }\n\n  private void pull(int node) {\n    tree[node] = tree[node * 2] + tree[node * 2 + 1] + lazy[node] * length[node];\n  }\n\n  private void pullPath(int node) {\n    for (node >>= 1; node > 0; node >>= 1) pull(node);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Lazy Propagation Range Assign",
      "difficulty": "Hard",
      "subpattern": "Lazy range assign range sum",
      "question": "Design RangeAssignSum with assignRange(left,right,value) and sumRange(left,right) over a mutable integer array.",
      "trigger": "Whole ranges are overwritten, so children under a fully covered segment should not be updated immediately.",
      "intuition": "A pending assignment replaces older values for an entire segment; push it only when a child segment is visited.",
      "edgeCases": "Assigning zero, assigning over a previous add or assign, nested updates, single-element ranges, and large sums.",
      "constraints": "Lazy assignment keeps repeated range overwrite and range sum operations near O(log n).",
      "source": {
        "label": "Lazy Segment Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html#assignment-on-segments"
      },
      "examples": [
        {
          "input": "nums=[1,2,3,4], assignRange(1,2,5), sumRange(0,3)",
          "output": "15",
          "explanation": "Array becomes [1,5,5,4]."
        },
        {
          "input": "assignRange(0,3,2), sumRange(1,3)",
          "output": "6",
          "explanation": "All positions become 2."
        }
      ],
      "bruteForceComplexity": "Time O(n) per range assign and O(n) per sum; Space O(n).",
      "optimizedComplexity": "Time O(log n) amortized per operation with iterative lazy assignment; Space O(n).",
      "recursiveComplexity": "Time O(log n) per operation with recursive lazy assignment; Space O(n) plus recursion depth.",
      "bruteForceCode": "class RangeAssignSum {\n  private final long[] nums;\n\n  public RangeAssignSum(int[] nums) {\n    this.nums = new long[nums.length];\n    for (int i = 0; i < nums.length; i++) this.nums[i] = nums[i];\n  }\n\n  public void assignRange(int left, int right, long value) {\n    for (int index = left; index <= right; index++) nums[index] = value;\n  }\n\n  public long sumRange(int left, int right) {\n    long sum = 0;\n    for (int index = left; index <= right; index++) sum += nums[index];\n    return sum;\n  }\n}",
      "iterativeCode": "class RangeAssignSum {\n  private final int size;\n  private final int height;\n  private final long[] tree;\n  private final long[] lazyValue;\n  private final boolean[] hasLazy;\n  private final int[] length;\n\n  public RangeAssignSum(int[] nums) {\n    int power = 1;\n    int levels = 0;\n    while (power < nums.length) {\n      power <<= 1;\n      levels++;\n    }\n    size = power;\n    height = levels;\n    tree = new long[2 * size];\n    lazyValue = new long[2 * size];\n    hasLazy = new boolean[2 * size];\n    length = new int[2 * size];\n    for (int i = 0; i < size; i++) length[size + i] = i < nums.length ? 1 : 0;\n    for (int i = size - 1; i > 0; i--) length[i] = length[i * 2] + length[i * 2 + 1];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) pull(i);\n  }\n\n  public void assignRange(int left, int right, long value) {\n    int l = left + size;\n    int r = right + size;\n    int originalLeft = l;\n    int originalRight = r;\n    pushPath(l);\n    pushPath(r);\n    while (l <= r) {\n      if ((l & 1) == 1) apply(l++, value);\n      if ((r & 1) == 0) apply(r--, value);\n      l >>= 1;\n      r >>= 1;\n    }\n    pullPath(originalLeft);\n    pullPath(originalRight);\n  }\n\n  public long sumRange(int left, int right) {\n    int l = left + size;\n    int r = right + size;\n    pushPath(l);\n    pushPath(r);\n    long sum = 0;\n    while (l <= r) {\n      if ((l & 1) == 1) sum += tree[l++];\n      if ((r & 1) == 0) sum += tree[r--];\n      l >>= 1;\n      r >>= 1;\n    }\n    return sum;\n  }\n\n  private void apply(int node, long value) {\n    tree[node] = value * length[node];\n    if (node < size) {\n      lazyValue[node] = value;\n      hasLazy[node] = true;\n    }\n  }\n\n  private void push(int node) {\n    if (!hasLazy[node]) return;\n    apply(node * 2, lazyValue[node]);\n    apply(node * 2 + 1, lazyValue[node]);\n    hasLazy[node] = false;\n  }\n\n  private void pushPath(int node) {\n    for (int level = height; level > 0; level--) push(node >> level);\n  }\n\n  private void pull(int node) {\n    tree[node] = hasLazy[node] ? lazyValue[node] * length[node] : tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private void pullPath(int node) {\n    for (node >>= 1; node > 0; node >>= 1) pull(node);\n  }\n}",
      "recursiveCode": "class RangeAssignSum {\n  private final int n;\n  private final long[] tree;\n  private final long[] lazyValue;\n  private final boolean[] hasLazy;\n\n  public RangeAssignSum(int[] nums) {\n    n = nums.length;\n    tree = new long[4 * n];\n    lazyValue = new long[4 * n];\n    hasLazy = new boolean[4 * n];\n    build(1, 0, n - 1, nums);\n  }\n\n  public void assignRange(int left, int right, long value) {\n    assign(1, 0, n - 1, left, right, value);\n  }\n\n  public long sumRange(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int node, int left, int right, int[] nums) {\n    if (left == right) {\n      tree[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, nums);\n    build(node * 2 + 1, mid + 1, right, nums);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private void assign(int node, int left, int right, int ql, int qr, long value) {\n    if (qr < left || right < ql) return;\n    if (ql <= left && right <= qr) {\n      apply(node, left, right, value);\n      return;\n    }\n    push(node, left, right);\n    int mid = left + (right - left) / 2;\n    assign(node * 2, left, mid, ql, qr, value);\n    assign(node * 2 + 1, mid + 1, right, ql, qr, value);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private long query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    push(node, left, right);\n    int mid = left + (right - left) / 2;\n    return query(node * 2, left, mid, ql, qr) + query(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n\n  private void apply(int node, int left, int right, long value) {\n    tree[node] = value * (right - left + 1L);\n    lazyValue[node] = value;\n    hasLazy[node] = true;\n  }\n\n  private void push(int node, int left, int right) {\n    if (!hasLazy[node] || left == right) return;\n    int mid = left + (right - left) / 2;\n    apply(node * 2, left, mid, lazyValue[node]);\n    apply(node * 2 + 1, mid + 1, right, lazyValue[node]);\n    hasLazy[node] = false;\n  }\n}",
      "optimizedCode": "class RangeAssignSum {\n  private final int size;\n  private final int height;\n  private final long[] tree;\n  private final long[] lazyValue;\n  private final boolean[] hasLazy;\n  private final int[] length;\n\n  public RangeAssignSum(int[] nums) {\n    int power = 1;\n    int levels = 0;\n    while (power < nums.length) {\n      power <<= 1;\n      levels++;\n    }\n    size = power;\n    height = levels;\n    tree = new long[2 * size];\n    lazyValue = new long[2 * size];\n    hasLazy = new boolean[2 * size];\n    length = new int[2 * size];\n    for (int i = 0; i < size; i++) length[size + i] = i < nums.length ? 1 : 0;\n    for (int i = size - 1; i > 0; i--) length[i] = length[i * 2] + length[i * 2 + 1];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) pull(i);\n  }\n\n  public void assignRange(int left, int right, long value) {\n    int l = left + size;\n    int r = right + size;\n    int originalLeft = l;\n    int originalRight = r;\n    pushPath(l);\n    pushPath(r);\n    while (l <= r) {\n      if ((l & 1) == 1) apply(l++, value);\n      if ((r & 1) == 0) apply(r--, value);\n      l >>= 1;\n      r >>= 1;\n    }\n    pullPath(originalLeft);\n    pullPath(originalRight);\n  }\n\n  public long sumRange(int left, int right) {\n    int l = left + size;\n    int r = right + size;\n    pushPath(l);\n    pushPath(r);\n    long sum = 0;\n    while (l <= r) {\n      if ((l & 1) == 1) sum += tree[l++];\n      if ((r & 1) == 0) sum += tree[r--];\n      l >>= 1;\n      r >>= 1;\n    }\n    return sum;\n  }\n\n  private void apply(int node, long value) {\n    tree[node] = value * length[node];\n    if (node < size) {\n      lazyValue[node] = value;\n      hasLazy[node] = true;\n    }\n  }\n\n  private void push(int node) {\n    if (!hasLazy[node]) return;\n    apply(node * 2, lazyValue[node]);\n    apply(node * 2 + 1, lazyValue[node]);\n    hasLazy[node] = false;\n  }\n\n  private void pushPath(int node) {\n    for (int level = height; level > 0; level--) push(node >> level);\n  }\n\n  private void pull(int node) {\n    tree[node] = hasLazy[node] ? lazyValue[node] * length[node] : tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private void pullPath(int node) {\n    for (node >>= 1; node > 0; node >>= 1) pull(node);\n  }\n}",
      "code": "class RangeAssignSum {\n  private final int size;\n  private final int height;\n  private final long[] tree;\n  private final long[] lazyValue;\n  private final boolean[] hasLazy;\n  private final int[] length;\n\n  public RangeAssignSum(int[] nums) {\n    int power = 1;\n    int levels = 0;\n    while (power < nums.length) {\n      power <<= 1;\n      levels++;\n    }\n    size = power;\n    height = levels;\n    tree = new long[2 * size];\n    lazyValue = new long[2 * size];\n    hasLazy = new boolean[2 * size];\n    length = new int[2 * size];\n    for (int i = 0; i < size; i++) length[size + i] = i < nums.length ? 1 : 0;\n    for (int i = size - 1; i > 0; i--) length[i] = length[i * 2] + length[i * 2 + 1];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) pull(i);\n  }\n\n  public void assignRange(int left, int right, long value) {\n    int l = left + size;\n    int r = right + size;\n    int originalLeft = l;\n    int originalRight = r;\n    pushPath(l);\n    pushPath(r);\n    while (l <= r) {\n      if ((l & 1) == 1) apply(l++, value);\n      if ((r & 1) == 0) apply(r--, value);\n      l >>= 1;\n      r >>= 1;\n    }\n    pullPath(originalLeft);\n    pullPath(originalRight);\n  }\n\n  public long sumRange(int left, int right) {\n    int l = left + size;\n    int r = right + size;\n    pushPath(l);\n    pushPath(r);\n    long sum = 0;\n    while (l <= r) {\n      if ((l & 1) == 1) sum += tree[l++];\n      if ((r & 1) == 0) sum += tree[r--];\n      l >>= 1;\n      r >>= 1;\n    }\n    return sum;\n  }\n\n  private void apply(int node, long value) {\n    tree[node] = value * length[node];\n    if (node < size) {\n      lazyValue[node] = value;\n      hasLazy[node] = true;\n    }\n  }\n\n  private void push(int node) {\n    if (!hasLazy[node]) return;\n    apply(node * 2, lazyValue[node]);\n    apply(node * 2 + 1, lazyValue[node]);\n    hasLazy[node] = false;\n  }\n\n  private void pushPath(int node) {\n    for (int level = height; level > 0; level--) push(node >> level);\n  }\n\n  private void pull(int node) {\n    tree[node] = hasLazy[node] ? lazyValue[node] * length[node] : tree[node * 2] + tree[node * 2 + 1];\n  }\n\n  private void pullPath(int node) {\n    for (node >>= 1; node > 0; node >>= 1) pull(node);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Fenwick Prefix Sum",
      "difficulty": "Easy",
      "subpattern": "Fenwick prefix sum API",
      "question": "Design FenwickPrefixSum with add(index, delta), prefixSum(index), and rangeSum(left, right) over a mutable integer array.",
      "trigger": "Point updates and prefix/range sums are repeated, and every update affects many later prefix sums.",
      "intuition": "Store partial sums in buckets sized by the last set bit; climb upward for updates and downward for prefix sums.",
      "edgeCases": "Index 0 conversion, negative deltas, single element arrays, querying prefix 0, and full-range sums.",
      "constraints": "Operations should run in O(log n) with O(n) memory.",
      "source": {
        "label": "Fenwick Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/fenwick.html"
      },
      "examples": [
        {
          "input": "nums=[1,2,3], prefixSum(2)",
          "output": "6",
          "explanation": "Sum of indices 0..2 is 6."
        },
        {
          "input": "add(1,4), rangeSum(1,2)",
          "output": "9",
          "explanation": "Array becomes [1,6,3]."
        }
      ],
      "bruteForceComplexity": "Time O(1) per add and O(n) per prefix/range sum; Space O(n).",
      "optimizedComplexity": "Time O(log n) per add, prefix sum, or range sum; Space O(n).",
      "recursiveComplexity": "Time O(log n) per operation with recursive Fenwick climbs; Space O(log n) recursion depth.",
      "bruteForceCode": "class FenwickPrefixSum {\n  private final long[] nums;\n\n  public FenwickPrefixSum(int[] nums) {\n    this.nums = new long[nums.length];\n    for (int i = 0; i < nums.length; i++) this.nums[i] = nums[i];\n  }\n\n  public void add(int index, long delta) {\n    nums[index] += delta;\n  }\n\n  public long prefixSum(int index) {\n    long sum = 0;\n    for (int i = 0; i <= index; i++) sum += nums[i];\n    return sum;\n  }\n\n  public long rangeSum(int left, int right) {\n    return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n  }\n}",
      "iterativeCode": "class FenwickPrefixSum {\n  private final long[] bit;\n\n  public FenwickPrefixSum(int[] nums) {\n    bit = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) add(i, nums[i]);\n  }\n\n  public void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n\n  public long prefixSum(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n\n  public long rangeSum(int left, int right) {\n    return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n  }\n}",
      "recursiveCode": "class FenwickPrefixSum {\n  private final long[] bit;\n\n  public FenwickPrefixSum(int[] nums) {\n    bit = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) add(i, nums[i]);\n  }\n\n  public void add(int index, long delta) {\n    add(index + 1, delta, bit.length);\n  }\n\n  public long prefixSum(int index) {\n    return prefix(index + 1);\n  }\n\n  public long rangeSum(int left, int right) {\n    return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n  }\n\n  private void add(int index, long delta, int limit) {\n    if (index >= limit) return;\n    bit[index] += delta;\n    add(index + (index & -index), delta, limit);\n  }\n\n  private long prefix(int index) {\n    if (index <= 0) return 0;\n    return bit[index] + prefix(index - (index & -index));\n  }\n}",
      "optimizedCode": "class FenwickPrefixSum {\n  private final long[] bit;\n\n  public FenwickPrefixSum(int[] nums) {\n    bit = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) add(i, nums[i]);\n  }\n\n  public void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n\n  public long prefixSum(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n\n  public long rangeSum(int left, int right) {\n    return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n  }\n}",
      "code": "class FenwickPrefixSum {\n  private final long[] bit;\n\n  public FenwickPrefixSum(int[] nums) {\n    bit = new long[nums.length + 1];\n    for (int i = 0; i < nums.length; i++) add(i, nums[i]);\n  }\n\n  public void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n\n  public long prefixSum(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n\n  public long rangeSum(int left, int right) {\n    return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Fenwick Inversion Count",
      "difficulty": "Medium",
      "subpattern": "Fenwick inversion counting",
      "question": "Given nums, count pairs (i,j) such that i < j and nums[i] > nums[j].",
      "trigger": "You need to count how many previous values are greater than the current value while processing left to right.",
      "intuition": "Coordinate-compress values, keep frequencies of seen ranks, and query how many seen ranks are larger than the current rank.",
      "edgeCases": "Duplicates should not count, negative values, sorted input, reverse sorted input, and large answer requiring long.",
      "constraints": "O(n log n) is expected for large arrays; O(n^2) only works for small inputs.",
      "source": {
        "label": "Inversion Count - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/dsa/inversion-count-in-array-using-merge-sort/"
      },
      "examples": [
        {
          "input": "nums=[2,4,1,3,5]",
          "output": "3",
          "explanation": "Inversions are (2,1), (4,1), and (4,3)."
        },
        {
          "input": "nums=[1,2,3]",
          "output": "0",
          "explanation": "No earlier value is greater than a later value."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1).",
      "optimizedComplexity": "Time O(n log n) with compression and Fenwick frequencies; Space O(n).",
      "recursiveComplexity": "Time O(n log n) with merge sort counting; Space O(n) plus recursion depth.",
      "bruteForceCode": "class Solution {\n  public long countInversions(int[] nums) {\n    long count = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        if (nums[i] > nums[j]) count++;\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public long countInversions(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int unique = 0;\n    for (int value : sorted) {\n      if (unique == 0 || sorted[unique - 1] != value) sorted[unique++] = value;\n    }\n\n    Fenwick tree = new Fenwick(unique);\n    long inversions = 0;\n    for (int value : nums) {\n      int rank = lowerBound(sorted, unique, value);\n      inversions += tree.sumRange(rank + 1, unique - 1);\n      tree.add(rank, 1);\n    }\n    return inversions;\n  }\n\n  private int lowerBound(int[] values, int size, int target) {\n    int left = 0, right = size;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private static class Fenwick {\n    private final long[] bit;\n\n    Fenwick(int n) {\n      bit = new long[n + 1];\n    }\n\n    void add(int index, long delta) {\n      for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n    }\n\n    long prefixSum(int index) {\n      long sum = 0;\n      for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n      return sum;\n    }\n\n    long sumRange(int left, int right) {\n      if (left > right) return 0;\n      return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public long countInversions(int[] nums) {\n    int[] temp = new int[nums.length];\n    return sort(nums.clone(), temp, 0, nums.length - 1);\n  }\n\n  private long sort(int[] nums, int[] temp, int left, int right) {\n    if (left >= right) return 0;\n    int mid = left + (right - left) / 2;\n    long count = sort(nums, temp, left, mid) + sort(nums, temp, mid + 1, right);\n    int i = left, j = mid + 1, write = left;\n    while (i <= mid && j <= right) {\n      if (nums[i] <= nums[j]) temp[write++] = nums[i++];\n      else {\n        count += mid - i + 1L;\n        temp[write++] = nums[j++];\n      }\n    }\n    while (i <= mid) temp[write++] = nums[i++];\n    while (j <= right) temp[write++] = nums[j++];\n    for (int index = left; index <= right; index++) nums[index] = temp[index];\n    return count;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public long countInversions(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int unique = 0;\n    for (int value : sorted) {\n      if (unique == 0 || sorted[unique - 1] != value) sorted[unique++] = value;\n    }\n\n    Fenwick tree = new Fenwick(unique);\n    long inversions = 0;\n    for (int value : nums) {\n      int rank = lowerBound(sorted, unique, value);\n      inversions += tree.sumRange(rank + 1, unique - 1);\n      tree.add(rank, 1);\n    }\n    return inversions;\n  }\n\n  private int lowerBound(int[] values, int size, int target) {\n    int left = 0, right = size;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private static class Fenwick {\n    private final long[] bit;\n\n    Fenwick(int n) {\n      bit = new long[n + 1];\n    }\n\n    void add(int index, long delta) {\n      for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n    }\n\n    long prefixSum(int index) {\n      long sum = 0;\n      for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n      return sum;\n    }\n\n    long sumRange(int left, int right) {\n      if (left > right) return 0;\n      return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public long countInversions(int[] nums) {\n    int[] sorted = nums.clone();\n    Arrays.sort(sorted);\n    int unique = 0;\n    for (int value : sorted) {\n      if (unique == 0 || sorted[unique - 1] != value) sorted[unique++] = value;\n    }\n\n    Fenwick tree = new Fenwick(unique);\n    long inversions = 0;\n    for (int value : nums) {\n      int rank = lowerBound(sorted, unique, value);\n      inversions += tree.sumRange(rank + 1, unique - 1);\n      tree.add(rank, 1);\n    }\n    return inversions;\n  }\n\n  private int lowerBound(int[] values, int size, int target) {\n    int left = 0, right = size;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private static class Fenwick {\n    private final long[] bit;\n\n    Fenwick(int n) {\n      bit = new long[n + 1];\n    }\n\n    void add(int index, long delta) {\n      for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n    }\n\n    long prefixSum(int index) {\n      long sum = 0;\n      for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n      return sum;\n    }\n\n    long sumRange(int left, int right) {\n      if (left > right) return 0;\n      return prefixSum(right) - (left == 0 ? 0 : prefixSum(left - 1));\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "2D Fenwick Sum",
      "difficulty": "Medium",
      "subpattern": "2D Fenwick API",
      "question": "Design Fenwick2D with add(row,col,delta) and sumRegion(row1,col1,row2,col2) for a mutable matrix.",
      "trigger": "Both dimensions have point updates and rectangle sum queries.",
      "intuition": "Use a Fenwick tree in rows and columns; each update touches logarithmic buckets in both dimensions.",
      "edgeCases": "Single row or column, index 0 conversion in two dimensions, negative deltas, and querying a rectangle touching row 0 or col 0.",
      "constraints": "Use O(log rows * log cols) per operation instead of scanning each rectangle.",
      "source": {
        "label": "Fenwick Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/fenwick.html#finding-sum-in-two-dimensional-array"
      },
      "examples": [
        {
          "input": "matrix=[[1,2],[3,4]], sumRegion(0,0,1,1)",
          "output": "10",
          "explanation": "All cells are included."
        },
        {
          "input": "add(0,1,5), sumRegion(0,1,1,1)",
          "output": "11",
          "explanation": "Column 1 becomes 7 and 4."
        }
      ],
      "bruteForceComplexity": "Time O(1) per add and O(rows * cols) per region sum; Space O(rows * cols).",
      "optimizedComplexity": "Time O(log rows * log cols) per operation; Space O(rows * cols).",
      "recursiveComplexity": "Time O(rows * cols) per region sum in the direct recursive scan; Space O(rows + cols) recursion depth.",
      "bruteForceCode": "class Fenwick2D {\n  private final long[][] matrix;\n\n  public Fenwick2D(int[][] matrix) {\n    this.matrix = new long[matrix.length][matrix.length == 0 ? 0 : matrix[0].length];\n    for (int row = 0; row < matrix.length; row++) {\n      for (int col = 0; col < matrix[row].length; col++) this.matrix[row][col] = matrix[row][col];\n    }\n  }\n\n  public void add(int row, int col, long delta) {\n    matrix[row][col] += delta;\n  }\n\n  public long sumRegion(int row1, int col1, int row2, int col2) {\n    long sum = 0;\n    for (int row = row1; row <= row2; row++) {\n      for (int col = col1; col <= col2; col++) sum += matrix[row][col];\n    }\n    return sum;\n  }\n}",
      "iterativeCode": "class Fenwick2D {\n  private final long[][] bit;\n\n  public Fenwick2D(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = rows == 0 ? 0 : matrix[0].length;\n    bit = new long[rows + 1][cols + 1];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) add(row, col, matrix[row][col]);\n    }\n  }\n\n  public void add(int row, int col, long delta) {\n    for (int r = row + 1; r < bit.length; r += r & -r) {\n      for (int c = col + 1; c < bit[0].length; c += c & -c) bit[r][c] += delta;\n    }\n  }\n\n  public long sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix(row2, col2) - prefix(row1 - 1, col2) - prefix(row2, col1 - 1) + prefix(row1 - 1, col1 - 1);\n  }\n\n  private long prefix(int row, int col) {\n    long sum = 0;\n    for (int r = row + 1; r > 0; r -= r & -r) {\n      for (int c = col + 1; c > 0; c -= c & -c) sum += bit[r][c];\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "class Fenwick2D {\n  private final long[][] matrix;\n\n  public Fenwick2D(int[][] matrix) {\n    this.matrix = new long[matrix.length][matrix.length == 0 ? 0 : matrix[0].length];\n    for (int row = 0; row < matrix.length; row++) {\n      for (int col = 0; col < matrix[row].length; col++) this.matrix[row][col] = matrix[row][col];\n    }\n  }\n\n  public void add(int row, int col, long delta) {\n    matrix[row][col] += delta;\n  }\n\n  public long sumRegion(int row1, int col1, int row2, int col2) {\n    return sumRows(row1, row2, col1, col2);\n  }\n\n  private long sumRows(int row, int row2, int col1, int col2) {\n    if (row > row2) return 0;\n    return sumCols(row, col1, col2) + sumRows(row + 1, row2, col1, col2);\n  }\n\n  private long sumCols(int row, int col, int col2) {\n    if (col > col2) return 0;\n    return matrix[row][col] + sumCols(row, col + 1, col2);\n  }\n}",
      "optimizedCode": "class Fenwick2D {\n  private final long[][] bit;\n\n  public Fenwick2D(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = rows == 0 ? 0 : matrix[0].length;\n    bit = new long[rows + 1][cols + 1];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) add(row, col, matrix[row][col]);\n    }\n  }\n\n  public void add(int row, int col, long delta) {\n    for (int r = row + 1; r < bit.length; r += r & -r) {\n      for (int c = col + 1; c < bit[0].length; c += c & -c) bit[r][c] += delta;\n    }\n  }\n\n  public long sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix(row2, col2) - prefix(row1 - 1, col2) - prefix(row2, col1 - 1) + prefix(row1 - 1, col1 - 1);\n  }\n\n  private long prefix(int row, int col) {\n    long sum = 0;\n    for (int r = row + 1; r > 0; r -= r & -r) {\n      for (int c = col + 1; c > 0; c -= c & -c) sum += bit[r][c];\n    }\n    return sum;\n  }\n}",
      "code": "class Fenwick2D {\n  private final long[][] bit;\n\n  public Fenwick2D(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = rows == 0 ? 0 : matrix[0].length;\n    bit = new long[rows + 1][cols + 1];\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) add(row, col, matrix[row][col]);\n    }\n  }\n\n  public void add(int row, int col, long delta) {\n    for (int r = row + 1; r < bit.length; r += r & -r) {\n      for (int c = col + 1; c < bit[0].length; c += c & -c) bit[r][c] += delta;\n    }\n  }\n\n  public long sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix(row2, col2) - prefix(row1 - 1, col2) - prefix(row2, col1 - 1) + prefix(row1 - 1, col1 - 1);\n  }\n\n  private long prefix(int row, int col) {\n    long sum = 0;\n    for (int r = row + 1; r > 0; r -= r & -r) {\n      for (int c = col + 1; c > 0; c -= c & -c) sum += bit[r][c];\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Dynamic Segment Tree",
      "difficulty": "Hard",
      "subpattern": "Dynamic range sum tree",
      "question": "Design DynamicSegmentTree over a large coordinate range with addRange(left,right,delta) and sumRange(left,right).",
      "trigger": "The coordinate range is huge but only a small subset of segments is touched by updates and queries.",
      "intuition": "Create child nodes only along visited paths; lazy tags keep fully covered large ranges compact.",
      "edgeCases": "Huge endpoints, updates outside the queried range, full-domain updates, single-coordinate ranges, and negative deltas.",
      "constraints": "Avoid allocating an array proportional to the coordinate universe.",
      "source": {
        "label": "Dynamic Segment Tree - CP Algorithms Segment Tree Concepts",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html"
      },
      "examples": [
        {
          "input": "tree over [0,10], addRange(2,5,3), sumRange(0,10)",
          "output": "12",
          "explanation": "Four coordinates each gain 3."
        },
        {
          "input": "addRange(4,10,1), sumRange(5,6)",
          "output": "5",
          "explanation": "Coordinate 5 has value 4 and coordinate 6 has value 1."
        }
      ],
      "bruteForceComplexity": "Time O(right-left+1) per update and query width per sum; Space O(number of touched coordinates).",
      "optimizedComplexity": "Time O(log U) for aligned updates/queries and O(visited nodes) generally, where U is coordinate universe; Space O(visited nodes).",
      "recursiveComplexity": "Time O(visited nodes) with recursive dynamic nodes; Space O(visited nodes) plus O(log U) recursion depth.",
      "bruteForceCode": "import java.util.*;\n\nclass DynamicSegmentTree {\n  private final Map<Integer, Long> values = new HashMap<>();\n\n  public DynamicSegmentTree(int left, int right) {\n  }\n\n  public void addRange(int left, int right, long delta) {\n    for (long value = left; value <= right; value++) {\n      int key = (int) value;\n      values.put(key, values.getOrDefault(key, 0L) + delta);\n    }\n  }\n\n  public long sumRange(int left, int right) {\n    long sum = 0;\n    for (long value = left; value <= right; value++) sum += values.getOrDefault((int) value, 0L);\n    return sum;\n  }\n}",
      "iterativeCode": "class DynamicSegmentTree {\n  private final Node root;\n\n  public DynamicSegmentTree(int left, int right) {\n    root = new Node(left, right);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(root, left, right, delta);\n  }\n\n  public long sumRange(int left, int right) {\n    return query(root, left, right);\n  }\n\n  private void add(Node node, int ql, int qr, long delta) {\n    if (node == null || qr < node.left || node.right < ql) return;\n    if (ql <= node.left && node.right <= qr) {\n      apply(node, delta);\n      return;\n    }\n    push(node);\n    add(node.leftChild, ql, qr, delta);\n    add(node.rightChild, ql, qr, delta);\n    node.sum = node.leftChild.sum + node.rightChild.sum;\n  }\n\n  private long query(Node node, int ql, int qr) {\n    if (node == null || qr < node.left || node.right < ql) return 0;\n    if (ql <= node.left && node.right <= qr) return node.sum;\n    push(node);\n    return query(node.leftChild, ql, qr) + query(node.rightChild, ql, qr);\n  }\n\n  private void push(Node node) {\n    if (node.left == node.right) return;\n    int mid = node.left + (node.right - node.left) / 2;\n    if (node.leftChild == null) node.leftChild = new Node(node.left, mid);\n    if (node.rightChild == null) node.rightChild = new Node(mid + 1, node.right);\n    if (node.lazy != 0) {\n      apply(node.leftChild, node.lazy);\n      apply(node.rightChild, node.lazy);\n      node.lazy = 0;\n    }\n  }\n\n  private void apply(Node node, long delta) {\n    node.sum += delta * (node.right - node.left + 1L);\n    node.lazy += delta;\n  }\n\n  private static class Node {\n    int left;\n    int right;\n    long sum;\n    long lazy;\n    Node leftChild;\n    Node rightChild;\n\n    Node(int left, int right) {\n      this.left = left;\n      this.right = right;\n    }\n  }\n}",
      "recursiveCode": "class DynamicSegmentTree {\n  private final Node root;\n\n  public DynamicSegmentTree(int left, int right) {\n    root = new Node(left, right);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(root, left, right, delta);\n  }\n\n  public long sumRange(int left, int right) {\n    return query(root, left, right);\n  }\n\n  private void add(Node node, int ql, int qr, long delta) {\n    if (qr < node.left || node.right < ql) return;\n    if (ql <= node.left && node.right <= qr) {\n      cover(node, delta);\n      return;\n    }\n    ensureChildren(node);\n    add(node.leftChild, ql, qr, delta);\n    add(node.rightChild, ql, qr, delta);\n    node.sum = node.leftChild.sum + node.rightChild.sum;\n  }\n\n  private long query(Node node, int ql, int qr) {\n    if (qr < node.left || node.right < ql) return 0;\n    if (ql <= node.left && node.right <= qr) return node.sum;\n    ensureChildren(node);\n    return query(node.leftChild, ql, qr) + query(node.rightChild, ql, qr);\n  }\n\n  private void ensureChildren(Node node) {\n    if (node.left == node.right) return;\n    int mid = node.left + (node.right - node.left) / 2;\n    if (node.leftChild == null) node.leftChild = new Node(node.left, mid);\n    if (node.rightChild == null) node.rightChild = new Node(mid + 1, node.right);\n    if (node.lazy != 0) {\n      cover(node.leftChild, node.lazy);\n      cover(node.rightChild, node.lazy);\n      node.lazy = 0;\n    }\n  }\n\n  private void cover(Node node, long delta) {\n    node.sum += delta * (node.right - node.left + 1L);\n    node.lazy += delta;\n  }\n\n  private static class Node {\n    int left;\n    int right;\n    long sum;\n    long lazy;\n    Node leftChild;\n    Node rightChild;\n\n    Node(int left, int right) {\n      this.left = left;\n      this.right = right;\n    }\n  }\n}",
      "optimizedCode": "class DynamicSegmentTree {\n  private final Node root;\n\n  public DynamicSegmentTree(int left, int right) {\n    root = new Node(left, right);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(root, left, right, delta);\n  }\n\n  public long sumRange(int left, int right) {\n    return query(root, left, right);\n  }\n\n  private void add(Node node, int ql, int qr, long delta) {\n    if (node == null || qr < node.left || node.right < ql) return;\n    if (ql <= node.left && node.right <= qr) {\n      apply(node, delta);\n      return;\n    }\n    push(node);\n    add(node.leftChild, ql, qr, delta);\n    add(node.rightChild, ql, qr, delta);\n    node.sum = node.leftChild.sum + node.rightChild.sum;\n  }\n\n  private long query(Node node, int ql, int qr) {\n    if (node == null || qr < node.left || node.right < ql) return 0;\n    if (ql <= node.left && node.right <= qr) return node.sum;\n    push(node);\n    return query(node.leftChild, ql, qr) + query(node.rightChild, ql, qr);\n  }\n\n  private void push(Node node) {\n    if (node.left == node.right) return;\n    int mid = node.left + (node.right - node.left) / 2;\n    if (node.leftChild == null) node.leftChild = new Node(node.left, mid);\n    if (node.rightChild == null) node.rightChild = new Node(mid + 1, node.right);\n    if (node.lazy != 0) {\n      apply(node.leftChild, node.lazy);\n      apply(node.rightChild, node.lazy);\n      node.lazy = 0;\n    }\n  }\n\n  private void apply(Node node, long delta) {\n    node.sum += delta * (node.right - node.left + 1L);\n    node.lazy += delta;\n  }\n\n  private static class Node {\n    int left;\n    int right;\n    long sum;\n    long lazy;\n    Node leftChild;\n    Node rightChild;\n\n    Node(int left, int right) {\n      this.left = left;\n      this.right = right;\n    }\n  }\n}",
      "code": "class DynamicSegmentTree {\n  private final Node root;\n\n  public DynamicSegmentTree(int left, int right) {\n    root = new Node(left, right);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(root, left, right, delta);\n  }\n\n  public long sumRange(int left, int right) {\n    return query(root, left, right);\n  }\n\n  private void add(Node node, int ql, int qr, long delta) {\n    if (node == null || qr < node.left || node.right < ql) return;\n    if (ql <= node.left && node.right <= qr) {\n      apply(node, delta);\n      return;\n    }\n    push(node);\n    add(node.leftChild, ql, qr, delta);\n    add(node.rightChild, ql, qr, delta);\n    node.sum = node.leftChild.sum + node.rightChild.sum;\n  }\n\n  private long query(Node node, int ql, int qr) {\n    if (node == null || qr < node.left || node.right < ql) return 0;\n    if (ql <= node.left && node.right <= qr) return node.sum;\n    push(node);\n    return query(node.leftChild, ql, qr) + query(node.rightChild, ql, qr);\n  }\n\n  private void push(Node node) {\n    if (node.left == node.right) return;\n    int mid = node.left + (node.right - node.left) / 2;\n    if (node.leftChild == null) node.leftChild = new Node(node.left, mid);\n    if (node.rightChild == null) node.rightChild = new Node(mid + 1, node.right);\n    if (node.lazy != 0) {\n      apply(node.leftChild, node.lazy);\n      apply(node.rightChild, node.lazy);\n      node.lazy = 0;\n    }\n  }\n\n  private void apply(Node node, long delta) {\n    node.sum += delta * (node.right - node.left + 1L);\n    node.lazy += delta;\n  }\n\n  private static class Node {\n    int left;\n    int right;\n    long sum;\n    long lazy;\n    Node leftChild;\n    Node rightChild;\n\n    Node(int left, int right) {\n      this.left = left;\n      this.right = right;\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Segment Tree Range GCD",
      "difficulty": "Medium",
      "subpattern": "Range gcd segment tree",
      "question": "Design RangeGCDQuery with update(index,value) and rangeGcd(left,right).",
      "trigger": "GCD is associative, so range answers can be built by combining child segment answers.",
      "intuition": "Store gcd for each segment; point updates recompute ancestor gcd values.",
      "edgeCases": "Zeros, negative input values, single element ranges, all values equal, and updates that make gcd smaller or larger.",
      "constraints": "Use O(log n) operations when many updates and range GCD queries are mixed.",
      "source": {
        "label": "Segment Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html"
      },
      "examples": [
        {
          "input": "nums=[12,18,6], rangeGcd(0,2)",
          "output": "6",
          "explanation": "GCD of all values is 6."
        },
        {
          "input": "update(1,10), rangeGcd(0,2)",
          "output": "2",
          "explanation": "GCD of 12,10,6 is 2."
        }
      ],
      "bruteForceComplexity": "Time O(n log V) per query and O(1) per update; Space O(n).",
      "optimizedComplexity": "Time O(log n * log V) per operation using an iterative segment tree; Space O(n).",
      "recursiveComplexity": "Time O(log n * log V) per operation; Space O(n) plus recursion depth.",
      "bruteForceCode": "class RangeGCDQuery {\n  private final int[] nums;\n\n  public RangeGCDQuery(int[] nums) {\n    this.nums = nums.clone();\n  }\n\n  public void update(int index, int value) {\n    nums[index] = value;\n  }\n\n  public int rangeGcd(int left, int right) {\n    int answer = 0;\n    for (int index = left; index <= right; index++) answer = gcd(answer, nums[index]);\n    return Math.abs(answer);\n  }\n\n  private int gcd(int a, int b) {\n    a = Math.abs(a);\n    b = Math.abs(b);\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return a;\n  }\n}",
      "iterativeCode": "class RangeGCDQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeGCDQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = Math.abs(nums[i]);\n    for (int i = size - 1; i > 0; i--) tree[i] = gcd(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = Math.abs(value);\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = gcd(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeGcd(int left, int right) {\n    int answer = 0;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = gcd(answer, tree[left++]);\n      if ((right & 1) == 0) answer = gcd(answer, tree[right--]);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return Math.abs(a);\n  }\n}",
      "recursiveCode": "class RangeGCDQuery {\n  private final int n;\n  private final int[] tree;\n\n  public RangeGCDQuery(int[] nums) {\n    n = nums.length;\n    tree = new int[4 * n];\n    build(1, 0, n - 1, nums);\n  }\n\n  public void update(int index, int value) {\n    update(1, 0, n - 1, index, Math.abs(value));\n  }\n\n  public int rangeGcd(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int node, int left, int right, int[] nums) {\n    if (left == right) {\n      tree[node] = Math.abs(nums[left]);\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, nums);\n    build(node * 2 + 1, mid + 1, right, nums);\n    tree[node] = gcd(tree[node * 2], tree[node * 2 + 1]);\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = value;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = gcd(tree[node * 2], tree[node * 2 + 1]);\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return gcd(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return Math.abs(a);\n  }\n}",
      "optimizedCode": "class RangeGCDQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeGCDQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = Math.abs(nums[i]);\n    for (int i = size - 1; i > 0; i--) tree[i] = gcd(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = Math.abs(value);\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = gcd(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeGcd(int left, int right) {\n    int answer = 0;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = gcd(answer, tree[left++]);\n      if ((right & 1) == 0) answer = gcd(answer, tree[right--]);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return Math.abs(a);\n  }\n}",
      "code": "class RangeGCDQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeGCDQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = Math.abs(nums[i]);\n    for (int i = size - 1; i > 0; i--) tree[i] = gcd(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = Math.abs(value);\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = gcd(tree[pos * 2], tree[pos * 2 + 1]);\n  }\n\n  public int rangeGcd(int left, int right) {\n    int answer = 0;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer = gcd(answer, tree[left++]);\n      if ((right & 1) == 0) answer = gcd(answer, tree[right--]);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return Math.abs(a);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Range XOR Query Mutable",
      "difficulty": "Medium",
      "subpattern": "Range xor segment tree",
      "question": "Design RangeXorQuery with update(index,value) and rangeXor(left,right).",
      "trigger": "XOR is associative and has identity 0, so segment answers combine cleanly.",
      "intuition": "Store XOR per interval; point updates replace one leaf and recompute ancestor XORs.",
      "edgeCases": "Zero values, duplicate values canceling out, single-index ranges, full-range queries, and repeated updates.",
      "constraints": "Use O(log n) update/query for many mixed operations.",
      "source": {
        "label": "Segment Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html"
      },
      "examples": [
        {
          "input": "nums=[1,3,4,8], rangeXor(0,2)",
          "output": "6",
          "explanation": "1 xor 3 xor 4 equals 6."
        },
        {
          "input": "update(1,2), rangeXor(0,2)",
          "output": "7",
          "explanation": "1 xor 2 xor 4 equals 7."
        }
      ],
      "bruteForceComplexity": "Time O(n) per query and O(1) per update; Space O(n).",
      "optimizedComplexity": "Time O(log n) per update/query using an iterative segment tree; Space O(n).",
      "recursiveComplexity": "Time O(log n) per update/query; Space O(n) plus recursion depth.",
      "bruteForceCode": "class RangeXorQuery {\n  private final int[] nums;\n\n  public RangeXorQuery(int[] nums) {\n    this.nums = nums.clone();\n  }\n\n  public void update(int index, int value) {\n    nums[index] = value;\n  }\n\n  public int rangeXor(int left, int right) {\n    int answer = 0;\n    for (int index = left; index <= right; index++) answer ^= nums[index];\n    return answer;\n  }\n}",
      "iterativeCode": "class RangeXorQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeXorQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = tree[i * 2] ^ tree[i * 2 + 1];\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = tree[pos * 2] ^ tree[pos * 2 + 1];\n  }\n\n  public int rangeXor(int left, int right) {\n    int answer = 0;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer ^= tree[left++];\n      if ((right & 1) == 0) answer ^= tree[right--];\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class RangeXorQuery {\n  private final int n;\n  private final int[] tree;\n\n  public RangeXorQuery(int[] nums) {\n    n = nums.length;\n    tree = new int[4 * n];\n    build(1, 0, n - 1, nums);\n  }\n\n  public void update(int index, int value) {\n    update(1, 0, n - 1, index, value);\n  }\n\n  public int rangeXor(int left, int right) {\n    return query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int node, int left, int right, int[] nums) {\n    if (left == right) {\n      tree[node] = nums[left];\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, nums);\n    build(node * 2 + 1, mid + 1, right, nums);\n    tree[node] = tree[node * 2] ^ tree[node * 2 + 1];\n  }\n\n  private void update(int node, int left, int right, int index, int value) {\n    if (left == right) {\n      tree[node] = value;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = tree[node * 2] ^ tree[node * 2 + 1];\n  }\n\n  private int query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return query(node * 2, left, mid, ql, qr) ^ query(node * 2 + 1, mid + 1, right, ql, qr);\n  }\n}",
      "optimizedCode": "class RangeXorQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeXorQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = tree[i * 2] ^ tree[i * 2 + 1];\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = tree[pos * 2] ^ tree[pos * 2 + 1];\n  }\n\n  public int rangeXor(int left, int right) {\n    int answer = 0;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer ^= tree[left++];\n      if ((right & 1) == 0) answer ^= tree[right--];\n    }\n    return answer;\n  }\n}",
      "code": "class RangeXorQuery {\n  private final int size;\n  private final int[] tree;\n\n  public RangeXorQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new int[2 * size];\n    for (int i = 0; i < nums.length; i++) tree[size + i] = nums[i];\n    for (int i = size - 1; i > 0; i--) tree[i] = tree[i * 2] ^ tree[i * 2 + 1];\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = value;\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = tree[pos * 2] ^ tree[pos * 2 + 1];\n  }\n\n  public int rangeXor(int left, int right) {\n    int answer = 0;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) answer ^= tree[left++];\n      if ((right & 1) == 0) answer ^= tree[right--];\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Range Product Query Modulo",
      "difficulty": "Medium",
      "subpattern": "Modulo product segment tree",
      "question": "Design RangeProductQuery with update(index,value) and rangeProduct(left,right), returning product modulo 1_000_000_007.",
      "trigger": "Product is associative, and modulo keeps segment products bounded.",
      "intuition": "Store each segment product modulo MOD; update one leaf and recompute parent products.",
      "edgeCases": "Zeros, value one, negative values normalized modulo MOD, full-range products, and repeated updates from zero to non-zero.",
      "constraints": "Use O(log n) update/query for mixed operations on large arrays.",
      "source": {
        "label": "Segment Tree - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/segment_tree.html"
      },
      "examples": [
        {
          "input": "nums=[2,3,4], rangeProduct(0,2)",
          "output": "24",
          "explanation": "2*3*4 modulo MOD is 24."
        },
        {
          "input": "update(1,5), rangeProduct(1,2)",
          "output": "20",
          "explanation": "5*4 equals 20."
        }
      ],
      "bruteForceComplexity": "Time O(n) per query and O(1) per update; Space O(n).",
      "optimizedComplexity": "Time O(log n) per update/query using an iterative segment tree; Space O(n).",
      "recursiveComplexity": "Time O(log n) per update/query; Space O(n) plus recursion depth.",
      "bruteForceCode": "class RangeProductQuery {\n  private static final long MOD = 1_000_000_007L;\n  private final long[] nums;\n\n  public RangeProductQuery(int[] nums) {\n    this.nums = new long[nums.length];\n    for (int i = 0; i < nums.length; i++) this.nums[i] = normalize(nums[i]);\n  }\n\n  public void update(int index, int value) {\n    nums[index] = normalize(value);\n  }\n\n  public int rangeProduct(int left, int right) {\n    long product = 1;\n    for (int index = left; index <= right; index++) product = product * nums[index] % MOD;\n    return (int) product;\n  }\n\n  private long normalize(long value) {\n    value %= MOD;\n    return value < 0 ? value + MOD : value;\n  }\n}",
      "iterativeCode": "class RangeProductQuery {\n  private static final long MOD = 1_000_000_007L;\n  private final int size;\n  private final long[] tree;\n\n  public RangeProductQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new long[2 * size];\n    for (int i = 0; i < tree.length; i++) tree[i] = 1;\n    for (int i = 0; i < nums.length; i++) tree[size + i] = normalize(nums[i]);\n    for (int i = size - 1; i > 0; i--) tree[i] = tree[i * 2] * tree[i * 2 + 1] % MOD;\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = normalize(value);\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = tree[pos * 2] * tree[pos * 2 + 1] % MOD;\n  }\n\n  public int rangeProduct(int left, int right) {\n    long product = 1;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) product = product * tree[left++] % MOD;\n      if ((right & 1) == 0) product = product * tree[right--] % MOD;\n    }\n    return (int) product;\n  }\n\n  private long normalize(long value) {\n    value %= MOD;\n    return value < 0 ? value + MOD : value;\n  }\n}",
      "recursiveCode": "class RangeProductQuery {\n  private static final long MOD = 1_000_000_007L;\n  private final int n;\n  private final long[] tree;\n\n  public RangeProductQuery(int[] nums) {\n    n = nums.length;\n    tree = new long[4 * n];\n    build(1, 0, n - 1, nums);\n  }\n\n  public void update(int index, int value) {\n    update(1, 0, n - 1, index, normalize(value));\n  }\n\n  public int rangeProduct(int left, int right) {\n    return (int) query(1, 0, n - 1, left, right);\n  }\n\n  private void build(int node, int left, int right, int[] nums) {\n    if (left == right) {\n      tree[node] = normalize(nums[left]);\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, nums);\n    build(node * 2 + 1, mid + 1, right, nums);\n    tree[node] = tree[node * 2] * tree[node * 2 + 1] % MOD;\n  }\n\n  private void update(int node, int left, int right, int index, long value) {\n    if (left == right) {\n      tree[node] = value;\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = tree[node * 2] * tree[node * 2 + 1] % MOD;\n  }\n\n  private long query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return 1;\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return query(node * 2, left, mid, ql, qr) * query(node * 2 + 1, mid + 1, right, ql, qr) % MOD;\n  }\n\n  private long normalize(long value) {\n    value %= MOD;\n    return value < 0 ? value + MOD : value;\n  }\n}",
      "optimizedCode": "class RangeProductQuery {\n  private static final long MOD = 1_000_000_007L;\n  private final int size;\n  private final long[] tree;\n\n  public RangeProductQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new long[2 * size];\n    for (int i = 0; i < tree.length; i++) tree[i] = 1;\n    for (int i = 0; i < nums.length; i++) tree[size + i] = normalize(nums[i]);\n    for (int i = size - 1; i > 0; i--) tree[i] = tree[i * 2] * tree[i * 2 + 1] % MOD;\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = normalize(value);\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = tree[pos * 2] * tree[pos * 2 + 1] % MOD;\n  }\n\n  public int rangeProduct(int left, int right) {\n    long product = 1;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) product = product * tree[left++] % MOD;\n      if ((right & 1) == 0) product = product * tree[right--] % MOD;\n    }\n    return (int) product;\n  }\n\n  private long normalize(long value) {\n    value %= MOD;\n    return value < 0 ? value + MOD : value;\n  }\n}",
      "code": "class RangeProductQuery {\n  private static final long MOD = 1_000_000_007L;\n  private final int size;\n  private final long[] tree;\n\n  public RangeProductQuery(int[] nums) {\n    int power = 1;\n    while (power < nums.length) power <<= 1;\n    size = power;\n    tree = new long[2 * size];\n    for (int i = 0; i < tree.length; i++) tree[i] = 1;\n    for (int i = 0; i < nums.length; i++) tree[size + i] = normalize(nums[i]);\n    for (int i = size - 1; i > 0; i--) tree[i] = tree[i * 2] * tree[i * 2 + 1] % MOD;\n  }\n\n  public void update(int index, int value) {\n    int pos = size + index;\n    tree[pos] = normalize(value);\n    for (pos >>= 1; pos > 0; pos >>= 1) tree[pos] = tree[pos * 2] * tree[pos * 2 + 1] % MOD;\n  }\n\n  public int rangeProduct(int left, int right) {\n    long product = 1;\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) product = product * tree[left++] % MOD;\n      if ((right & 1) == 0) product = product * tree[right--] % MOD;\n    }\n    return (int) product;\n  }\n\n  private long normalize(long value) {\n    value %= MOD;\n    return value < 0 ? value + MOD : value;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Online Majority Element In Subarray",
      "difficulty": "Hard",
      "subpattern": "Majority candidate segment tree",
      "question": "Design MajorityChecker so query(left,right,threshold) returns a value appearing at least threshold times in arr[left..right], or -1.",
      "trigger": "A majority-style candidate can be merged by cancellation, but the final candidate still needs frequency verification.",
      "intuition": "Use segment tree Boyer-Moore pairs to get one candidate for the range, then verify with sorted occurrence positions.",
      "edgeCases": "No valid majority, threshold equal to range length, repeated values, one-element ranges, and candidate count below threshold.",
      "constraints": "Many queries require faster than scanning every subarray.",
      "source": {
        "label": "LeetCode 1157 - Online Majority Element In Subarray",
        "url": "https://leetcode.com/problems/online-majority-element-in-subarray/"
      },
      "examples": [
        {
          "input": "arr=[1,1,2,2,1,1], query(0,5,4)",
          "output": "1",
          "explanation": "1 appears four times."
        },
        {
          "input": "query(2,3,2)",
          "output": "2",
          "explanation": "2 appears twice in [2,2]."
        }
      ],
      "bruteForceComplexity": "Time O(length of query range) per query; Space O(distinct values in range).",
      "optimizedComplexity": "Time O(log n + log f) per query after O(n log n) preprocessing; Space O(n).",
      "recursiveComplexity": "Time O(log n + log f) per query with recursive segment tree traversal; Space O(n) plus recursion depth.",
      "bruteForceCode": "import java.util.*;\n\nclass MajorityChecker {\n  private final int[] arr;\n\n  public MajorityChecker(int[] arr) {\n    this.arr = arr.clone();\n  }\n\n  public int query(int left, int right, int threshold) {\n    Map<Integer, Integer> count = new HashMap<>();\n    for (int index = left; index <= right; index++) {\n      int next = count.getOrDefault(arr[index], 0) + 1;\n      if (next >= threshold) return arr[index];\n      count.put(arr[index], next);\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MajorityChecker {\n  private final int size;\n  private final Pair[] tree;\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public MajorityChecker(int[] arr) {\n    int power = 1;\n    while (power < arr.length) power <<= 1;\n    size = power;\n    tree = new Pair[2 * size];\n    for (int i = 0; i < tree.length; i++) tree[i] = new Pair(0, 0);\n    for (int i = 0; i < arr.length; i++) {\n      tree[size + i] = new Pair(arr[i], 1);\n      positions.computeIfAbsent(arr[i], key -> new ArrayList<>()).add(i);\n    }\n    for (int i = size - 1; i > 0; i--) tree[i] = merge(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public int query(int left, int right, int threshold) {\n    Pair candidate = queryCandidate(left, right);\n    if (candidate.count == 0) return -1;\n    List<Integer> list = positions.get(candidate.value);\n    int frequency = upperBound(list, right) - lowerBound(list, left);\n    return frequency >= threshold ? candidate.value : -1;\n  }\n\n  private Pair queryCandidate(int left, int right) {\n    Pair leftAnswer = new Pair(0, 0);\n    Pair rightAnswer = new Pair(0, 0);\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) leftAnswer = merge(leftAnswer, tree[left++]);\n      if ((right & 1) == 0) rightAnswer = merge(tree[right--], rightAnswer);\n    }\n    return merge(leftAnswer, rightAnswer);\n  }\n\n  private Pair merge(Pair a, Pair b) {\n    if (a.count == 0) return b;\n    if (b.count == 0) return a;\n    if (a.value == b.value) return new Pair(a.value, a.count + b.count);\n    if (a.count > b.count) return new Pair(a.value, a.count - b.count);\n    return new Pair(b.value, b.count - a.count);\n  }\n\n  private int lowerBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private static class Pair {\n    int value;\n    int count;\n\n    Pair(int value, int count) {\n      this.value = value;\n      this.count = count;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MajorityChecker {\n  private final int n;\n  private final Pair[] tree;\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public MajorityChecker(int[] arr) {\n    n = arr.length;\n    tree = new Pair[4 * n];\n    for (int i = 0; i < arr.length; i++) positions.computeIfAbsent(arr[i], key -> new ArrayList<>()).add(i);\n    build(1, 0, n - 1, arr);\n  }\n\n  public int query(int left, int right, int threshold) {\n    Pair candidate = query(1, 0, n - 1, left, right);\n    if (candidate.count == 0) return -1;\n    List<Integer> list = positions.get(candidate.value);\n    int frequency = upperBound(list, right) - lowerBound(list, left);\n    return frequency >= threshold ? candidate.value : -1;\n  }\n\n  private void build(int node, int left, int right, int[] arr) {\n    if (left == right) {\n      tree[node] = new Pair(arr[left], 1);\n      return;\n    }\n    int mid = left + (right - left) / 2;\n    build(node * 2, left, mid, arr);\n    build(node * 2 + 1, mid + 1, right, arr);\n    tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);\n  }\n\n  private Pair query(int node, int left, int right, int ql, int qr) {\n    if (qr < left || right < ql) return new Pair(0, 0);\n    if (ql <= left && right <= qr) return tree[node];\n    int mid = left + (right - left) / 2;\n    return merge(query(node * 2, left, mid, ql, qr), query(node * 2 + 1, mid + 1, right, ql, qr));\n  }\n\n  private Pair merge(Pair a, Pair b) {\n    if (a.count == 0) return b;\n    if (b.count == 0) return a;\n    if (a.value == b.value) return new Pair(a.value, a.count + b.count);\n    if (a.count > b.count) return new Pair(a.value, a.count - b.count);\n    return new Pair(b.value, b.count - a.count);\n  }\n\n  private int lowerBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private static class Pair {\n    int value;\n    int count;\n\n    Pair(int value, int count) {\n      this.value = value;\n      this.count = count;\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MajorityChecker {\n  private final int size;\n  private final Pair[] tree;\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public MajorityChecker(int[] arr) {\n    int power = 1;\n    while (power < arr.length) power <<= 1;\n    size = power;\n    tree = new Pair[2 * size];\n    for (int i = 0; i < tree.length; i++) tree[i] = new Pair(0, 0);\n    for (int i = 0; i < arr.length; i++) {\n      tree[size + i] = new Pair(arr[i], 1);\n      positions.computeIfAbsent(arr[i], key -> new ArrayList<>()).add(i);\n    }\n    for (int i = size - 1; i > 0; i--) tree[i] = merge(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public int query(int left, int right, int threshold) {\n    Pair candidate = queryCandidate(left, right);\n    if (candidate.count == 0) return -1;\n    List<Integer> list = positions.get(candidate.value);\n    int frequency = upperBound(list, right) - lowerBound(list, left);\n    return frequency >= threshold ? candidate.value : -1;\n  }\n\n  private Pair queryCandidate(int left, int right) {\n    Pair leftAnswer = new Pair(0, 0);\n    Pair rightAnswer = new Pair(0, 0);\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) leftAnswer = merge(leftAnswer, tree[left++]);\n      if ((right & 1) == 0) rightAnswer = merge(tree[right--], rightAnswer);\n    }\n    return merge(leftAnswer, rightAnswer);\n  }\n\n  private Pair merge(Pair a, Pair b) {\n    if (a.count == 0) return b;\n    if (b.count == 0) return a;\n    if (a.value == b.value) return new Pair(a.value, a.count + b.count);\n    if (a.count > b.count) return new Pair(a.value, a.count - b.count);\n    return new Pair(b.value, b.count - a.count);\n  }\n\n  private int lowerBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private static class Pair {\n    int value;\n    int count;\n\n    Pair(int value, int count) {\n      this.value = value;\n      this.count = count;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass MajorityChecker {\n  private final int size;\n  private final Pair[] tree;\n  private final Map<Integer, List<Integer>> positions = new HashMap<>();\n\n  public MajorityChecker(int[] arr) {\n    int power = 1;\n    while (power < arr.length) power <<= 1;\n    size = power;\n    tree = new Pair[2 * size];\n    for (int i = 0; i < tree.length; i++) tree[i] = new Pair(0, 0);\n    for (int i = 0; i < arr.length; i++) {\n      tree[size + i] = new Pair(arr[i], 1);\n      positions.computeIfAbsent(arr[i], key -> new ArrayList<>()).add(i);\n    }\n    for (int i = size - 1; i > 0; i--) tree[i] = merge(tree[i * 2], tree[i * 2 + 1]);\n  }\n\n  public int query(int left, int right, int threshold) {\n    Pair candidate = queryCandidate(left, right);\n    if (candidate.count == 0) return -1;\n    List<Integer> list = positions.get(candidate.value);\n    int frequency = upperBound(list, right) - lowerBound(list, left);\n    return frequency >= threshold ? candidate.value : -1;\n  }\n\n  private Pair queryCandidate(int left, int right) {\n    Pair leftAnswer = new Pair(0, 0);\n    Pair rightAnswer = new Pair(0, 0);\n    for (left += size, right += size; left <= right; left >>= 1, right >>= 1) {\n      if ((left & 1) == 1) leftAnswer = merge(leftAnswer, tree[left++]);\n      if ((right & 1) == 0) rightAnswer = merge(tree[right--], rightAnswer);\n    }\n    return merge(leftAnswer, rightAnswer);\n  }\n\n  private Pair merge(Pair a, Pair b) {\n    if (a.count == 0) return b;\n    if (b.count == 0) return a;\n    if (a.value == b.value) return new Pair(a.value, a.count + b.count);\n    if (a.count > b.count) return new Pair(a.value, a.count - b.count);\n    return new Pair(b.value, b.count - a.count);\n  }\n\n  private int lowerBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private int upperBound(List<Integer> list, int target) {\n    int left = 0, right = list.size();\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (list.get(mid) <= target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n\n  private static class Pair {\n    int value;\n    int count;\n\n    Pair(int value, int count) {\n      this.value = value;\n      this.count = count;\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Fenwick Range Add Point Query",
      "difficulty": "Medium",
      "subpattern": "Fenwick range add point query",
      "question": "Design RangeAddPointQuery with addRange(left,right,delta) and pointQuery(index).",
      "trigger": "Updates affect ranges, but queries ask for one point value.",
      "intuition": "A range add is two updates on a difference array; a point query is the prefix sum of that difference array.",
      "edgeCases": "Update ending at last index, negative deltas, overlapping ranges, querying untouched points, and single-index updates.",
      "constraints": "Use O(log n) range updates and point queries with a Fenwick tree over the difference array.",
      "source": {
        "label": "Fenwick Tree Range Updates - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/fenwick.html#range-operations"
      },
      "examples": [
        {
          "input": "nums=[1,2,3], addRange(0,1,5), pointQuery(1)",
          "output": "7",
          "explanation": "Index 1 becomes 2+5."
        },
        {
          "input": "addRange(1,2,-2), pointQuery(2)",
          "output": "1",
          "explanation": "Index 2 becomes 3-2."
        }
      ],
      "bruteForceComplexity": "Time O(n) per range add and O(1) per point query; Space O(n).",
      "optimizedComplexity": "Time O(log n) per range add and point query; Space O(n).",
      "recursiveComplexity": "Time O(log n) per operation with recursive Fenwick updates/prefix; Space O(log n) recursion depth.",
      "bruteForceCode": "class RangeAddPointQuery {\n  private final long[] nums;\n\n  public RangeAddPointQuery(int[] nums) {\n    this.nums = new long[nums.length];\n    for (int i = 0; i < nums.length; i++) this.nums[i] = nums[i];\n  }\n\n  public void addRange(int left, int right, long delta) {\n    for (int index = left; index <= right; index++) nums[index] += delta;\n  }\n\n  public long pointQuery(int index) {\n    return nums[index];\n  }\n}",
      "iterativeCode": "class RangeAddPointQuery {\n  private final long[] bit;\n\n  public RangeAddPointQuery(int[] nums) {\n    bit = new long[nums.length + 2];\n    for (int i = 0; i < nums.length; i++) addRange(i, i, nums[i]);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(left, delta);\n    add(right + 1, -delta);\n  }\n\n  public long pointQuery(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n\n  private void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n}",
      "recursiveCode": "class RangeAddPointQuery {\n  private final long[] bit;\n\n  public RangeAddPointQuery(int[] nums) {\n    bit = new long[nums.length + 2];\n    for (int i = 0; i < nums.length; i++) addRange(i, i, nums[i]);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(left + 1, delta);\n    add(right + 2, -delta);\n  }\n\n  public long pointQuery(int index) {\n    return prefix(index + 1);\n  }\n\n  private void add(int index, long delta) {\n    if (index >= bit.length) return;\n    bit[index] += delta;\n    add(index + (index & -index), delta);\n  }\n\n  private long prefix(int index) {\n    if (index <= 0) return 0;\n    return bit[index] + prefix(index - (index & -index));\n  }\n}",
      "optimizedCode": "class RangeAddPointQuery {\n  private final long[] bit;\n\n  public RangeAddPointQuery(int[] nums) {\n    bit = new long[nums.length + 2];\n    for (int i = 0; i < nums.length; i++) addRange(i, i, nums[i]);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(left, delta);\n    add(right + 1, -delta);\n  }\n\n  public long pointQuery(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n\n  private void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n}",
      "code": "class RangeAddPointQuery {\n  private final long[] bit;\n\n  public RangeAddPointQuery(int[] nums) {\n    bit = new long[nums.length + 2];\n    for (int i = 0; i < nums.length; i++) addRange(i, i, nums[i]);\n  }\n\n  public void addRange(int left, int right, long delta) {\n    add(left, delta);\n    add(right + 1, -delta);\n  }\n\n  public long pointQuery(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n\n  private void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Fenwick Order Statistic Search",
      "difficulty": "Hard",
      "subpattern": "Fenwick order statistic search",
      "question": "Design OrderStatisticFenwick with add(index,delta) and findByOrder(k), returning the smallest index whose prefix frequency is at least k.",
      "trigger": "Frequencies change online and you need the kth item by cumulative count.",
      "intuition": "Use Fenwick prefix sums; binary-lift through Fenwick buckets to build the largest prefix with sum less than k.",
      "edgeCases": "k larger than total count, zero-frequency gaps, adding negative deltas within valid counts, first index answer, and last index answer.",
      "constraints": "Use O(log n) update and kth search instead of scanning all frequencies.",
      "source": {
        "label": "Fenwick Tree Order Statistic - CP Algorithms",
        "url": "https://cp-algorithms.com/data_structures/fenwick.html"
      },
      "examples": [
        {
          "input": "freq=[0,2,1,3], findByOrder(3)",
          "output": "2",
          "explanation": "The third item lands at index 2."
        },
        {
          "input": "add(0,1), findByOrder(1)",
          "output": "0",
          "explanation": "Index 0 now contains the first item."
        }
      ],
      "bruteForceComplexity": "Time O(1) per add and O(n) per findByOrder; Space O(n).",
      "optimizedComplexity": "Time O(log n) per add and O(log n) per kth search with Fenwick binary lifting; Space O(n).",
      "recursiveComplexity": "Time O(log^2 n) for recursive binary search over Fenwick prefix sums; Space O(log n) recursion depth.",
      "bruteForceCode": "class OrderStatisticFenwick {\n  private final long[] freq;\n\n  public OrderStatisticFenwick(int[] frequencies) {\n    freq = new long[frequencies.length];\n    for (int i = 0; i < frequencies.length; i++) freq[i] = frequencies[i];\n  }\n\n  public void add(int index, long delta) {\n    freq[index] += delta;\n  }\n\n  public int findByOrder(long k) {\n    long seen = 0;\n    for (int index = 0; index < freq.length; index++) {\n      seen += freq[index];\n      if (seen >= k) return index;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class OrderStatisticFenwick {\n  private final int n;\n  private final long[] bit;\n\n  public OrderStatisticFenwick(int[] frequencies) {\n    n = frequencies.length;\n    bit = new long[n + 1];\n    for (int i = 0; i < frequencies.length; i++) add(i, frequencies[i]);\n  }\n\n  public void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n\n  public int findByOrder(long k) {\n    if (k <= 0 || prefixSum(n - 1) < k) return -1;\n    int index = 0;\n    int bitMask = Integer.highestOneBit(n);\n    while (bitMask != 0) {\n      int next = index + bitMask;\n      if (next <= n && bit[next] < k) {\n        index = next;\n        k -= bit[next];\n      }\n      bitMask >>= 1;\n    }\n    return index;\n  }\n\n  private long prefixSum(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n}",
      "recursiveCode": "class OrderStatisticFenwick {\n  private final int n;\n  private final long[] bit;\n\n  public OrderStatisticFenwick(int[] frequencies) {\n    n = frequencies.length;\n    bit = new long[n + 1];\n    for (int i = 0; i < frequencies.length; i++) add(i, frequencies[i]);\n  }\n\n  public void add(int index, long delta) {\n    addInternal(index + 1, delta);\n  }\n\n  public int findByOrder(long k) {\n    if (k <= 0 || prefixSum(n - 1) < k) return -1;\n    return search(0, n - 1, k);\n  }\n\n  private int search(int left, int right, long k) {\n    if (left == right) return left;\n    int mid = left + (right - left) / 2;\n    if (prefixSum(mid) >= k) return search(left, mid, k);\n    return search(mid + 1, right, k);\n  }\n\n  private void addInternal(int index, long delta) {\n    if (index >= bit.length) return;\n    bit[index] += delta;\n    addInternal(index + (index & -index), delta);\n  }\n\n  private long prefixSum(int index) {\n    return prefix(index + 1);\n  }\n\n  private long prefix(int index) {\n    if (index <= 0) return 0;\n    return bit[index] + prefix(index - (index & -index));\n  }\n}",
      "optimizedCode": "class OrderStatisticFenwick {\n  private final int n;\n  private final long[] bit;\n\n  public OrderStatisticFenwick(int[] frequencies) {\n    n = frequencies.length;\n    bit = new long[n + 1];\n    for (int i = 0; i < frequencies.length; i++) add(i, frequencies[i]);\n  }\n\n  public void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n\n  public int findByOrder(long k) {\n    if (k <= 0 || prefixSum(n - 1) < k) return -1;\n    int index = 0;\n    int bitMask = Integer.highestOneBit(n);\n    while (bitMask != 0) {\n      int next = index + bitMask;\n      if (next <= n && bit[next] < k) {\n        index = next;\n        k -= bit[next];\n      }\n      bitMask >>= 1;\n    }\n    return index;\n  }\n\n  private long prefixSum(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n}",
      "code": "class OrderStatisticFenwick {\n  private final int n;\n  private final long[] bit;\n\n  public OrderStatisticFenwick(int[] frequencies) {\n    n = frequencies.length;\n    bit = new long[n + 1];\n    for (int i = 0; i < frequencies.length; i++) add(i, frequencies[i]);\n  }\n\n  public void add(int index, long delta) {\n    for (int i = index + 1; i < bit.length; i += i & -i) bit[i] += delta;\n  }\n\n  public int findByOrder(long k) {\n    if (k <= 0 || prefixSum(n - 1) < k) return -1;\n    int index = 0;\n    int bitMask = Integer.highestOneBit(n);\n    while (bitMask != 0) {\n      int next = index + bitMask;\n      if (next <= n && bit[next] < k) {\n        index = next;\n        k -= bit[next];\n      }\n      bitMask >>= 1;\n    }\n    return index;\n  }\n\n  private long prefixSum(int index) {\n    long sum = 0;\n    for (int i = index + 1; i > 0; i -= i & -i) sum += bit[i];\n    return sum;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem asks for many range queries and point or range updates on the same data.",
    "Naive recomputation would rescan O(n) per query, causing O(nq) time.",
    "Queries use prefixes, counts by rank, coordinate-compressed values, interval coverage, or range min/max/sum/gcd/xor.",
    "Updates affect one point or a whole interval and later queries must see the changed state.",
    "Offline sorting plus Fenwick/segment tree can replace nested loops when counting ordered pairs or ranks."
  ],
  "traps": [
    "Mixing 0-indexed input with 1-indexed Fenwick internals.",
    "Forgetting to coordinate-compress all values needed by both updates and queries.",
    "Using int when pair counts or sums need long arithmetic.",
    "Not pushing lazy values before partially overlapping child queries.",
    "Treating inclusive ranges and half-open ranges the same.",
    "Updating an original array value but not applying the delta to the tree.",
    "For majority/count candidates, returning the segment-tree candidate without verifying its real frequency."
  ],
  "edgeCases": [
    "Single element arrays and one-cell matrices.",
    "Empty query results, missing keys, or intervals that only touch at endpoints.",
    "Duplicate values in compression and pair-counting problems.",
    "Negative numbers and large values in reverse-pair/count-range-sum problems.",
    "Full-range updates, full-range queries, and repeated updates on the same index.",
    "Lazy propagation with nested overlapping updates.",
    "Fenwick find-kth when k is 1, total count, or invalid for current frequency totals."
  ],
  "complexities": [
    "Fenwick point update and prefix/range sum: Time O(log n), Space O(n).",
    "2D Fenwick update and rectangle sum: Time O(log m log n), Space O(mn).",
    "Segment tree point update and range query: Time O(log n), Space O(n).",
    "Lazy segment tree range update and range query: Time O(log n), Space O(n).",
    "Dynamic segment tree over huge coordinates: Time O(log C), Space O(number of touched nodes).",
    "Coordinate compression adds Time O(n log n) preprocessing and Space O(n).",
    "Merge-sort counting is Time O(n log n), Space O(n), often the recursive counterpart to Fenwick counting."
  ],
  "mentalModel": [
    "Fenwick answers prefix-shaped aggregation; convert range queries to prefix(right) - prefix(left-1).",
    "Segment trees store enough aggregate information for a segment so two child answers can merge into a parent answer.",
    "Lazy propagation means record work at a node now and push it to children only when a query/update needs them.",
    "Coordinate compression keeps order while shrinking huge values into dense indexes.",
    "For counting problems, scan in the direction that turns “previous” or “future” elements into already-updated tree state."
  ],
  "revisionStrategy": [
    "Day 1: redo NumArray, FenwickPrefixSum, Count Smaller, Reverse Pairs, and Create Sorted Array.",
    "Day 3: redo NumMatrix, Count Range Sum, RangeModule, MyCalendarThree, and Falling Squares.",
    "Day 7: redo lazy propagation drills: RangeAddSum, RangeAssignSum, Handling Sum Queries, and DynamicSegmentTree.",
    "Day 14: redo aggregate trees: LIS II, Number of LIS, Range GCD, Range XOR, MajorityChecker, and BookMyShow.",
    "Before interviews: implement Fenwick update/query, segment tree build/update/query, lazy push, and coordinate compression from memory."
  ],
  "unseen": [
    "Given an array with point updates, return the longest non-decreasing prefix inside any queried range.",
    "Given intervals added online, return the total covered length after each add.",
    "Given values arriving in a stream, return how many previous values are in [x-k, x+k].",
    "Given range add operations and point queries, find the first index whose current value reaches a threshold.",
    "Given rectangles on a compressed grid, support point toggle and rectangle sum queries."
  ]
};
