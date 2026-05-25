const CURRENT_PATTERN = {
  "id": "matrix",
  "name": "Matrix",
  "summary": "Use row/column markers, boundary traversal, in-place encoding, flood fill, multi-source BFS, 2D prefix sums, and grid DP for matrix-shaped state.",
  "complete": true,
  "subpatterns": [
    "Row/column marker propagation",
    "Boundary-layer traversal",
    "Spiral fill simulation",
    "Transpose and reverse rotation",
    "Flattened binary search",
    "Staircase sorted search",
    "In-place state encoding",
    "Backtracking grid search",
    "DFS island counting",
    "DFS component area",
    "Boundary flood fill",
    "Reverse multi-source ocean reachability",
    "Color replacement flood fill",
    "Multi-source BFS distance",
    "Level-order infection BFS",
    "8-direction shortest path BFS",
    "Diagonal consistency check",
    "3-mask constraint validation",
    "Constraint backtracking",
    "Diagonal index traversal",
    "Dimension swap",
    "2D prefix sum window",
    "Immutable 2D prefix queries",
    "Grid DP path cost",
    "Obstacle-aware path DP",
    "Memoized increasing paths",
    "Square DP side length",
    "Square DP counting",
    "Rolling row path DP",
    "Parent-aware cycle DFS"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Set Matrix Zeroes",
      "difficulty": "Medium",
      "subpattern": "Row/column marker propagation",
      "question": "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0 in place.",
      "trigger": "A zero affects two axes, so row and column markers preserve which axes must be cleared without losing original zeros.",
      "intuition": "Use the first row and first column as marker storage, while separately remembering whether they originally contained zero.",
      "edgeCases": "Zero in first row, zero in first column, single row, single column, no zeros, all zeros.",
      "constraints": "1 <= m, n <= 200; -2^31 <= matrix[i][j] <= 2^31 - 1.",
      "source": {
        "label": "Set Matrix Zeroes - LeetCode 73",
        "url": "https://leetcode.com/problems/set-matrix-zeroes/"
      },
      "examples": [
        {
          "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
          "output": "[[1,0,1],[0,0,0],[1,0,1]]",
          "explanation": "The zero at row 1, column 1 clears that row and column."
        },
        {
          "input": "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
          "output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
          "explanation": "Zeros in the first row must still clear their columns."
        },
        {
          "input": "matrix = [[1]]",
          "output": "[[1]]",
          "explanation": "There is no zero to propagate."
        }
      ],
      "bruteForceComplexity": "Time O(mn(m+n)); Space O(mn). Copy the original matrix before applying row and column clears.",
      "optimizedComplexity": "Time O(mn); Space O(1). First row and first column store marker flags.",
      "recursiveComplexity": "Time O(mn); Space O(m+n+mn call stack). Recursively scans cells and records affected rows and columns.",
      "bruteForceCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int[][] original = new int[m][n];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) original[r][c] = matrix[r][c];\n    }\n\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (original[r][c] == 0) {\n          for (int col = 0; col < n; col++) matrix[r][col] = 0;\n          for (int row = 0; row < m; row++) matrix[row][c] = 0;\n        }\n      }\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean firstRowZero = false;\n    boolean firstColZero = false;\n\n    for (int c = 0; c < n; c++) if (matrix[0][c] == 0) firstRowZero = true;\n    for (int r = 0; r < m; r++) if (matrix[r][0] == 0) firstColZero = true;\n\n    for (int r = 1; r < m; r++) {\n      for (int c = 1; c < n; c++) {\n        if (matrix[r][c] == 0) {\n          matrix[r][0] = 0;\n          matrix[0][c] = 0;\n        }\n      }\n    }\n\n    for (int r = 1; r < m; r++) {\n      for (int c = 1; c < n; c++) {\n        if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n      }\n    }\n    if (firstRowZero) for (int c = 0; c < n; c++) matrix[0][c] = 0;\n    if (firstColZero) for (int r = 0; r < m; r++) matrix[r][0] = 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    boolean[] rows = new boolean[matrix.length];\n    boolean[] cols = new boolean[matrix[0].length];\n    collect(matrix, 0, 0, rows, cols);\n    apply(matrix, 0, 0, rows, cols);\n  }\n\n  private void collect(int[][] matrix, int r, int c, boolean[] rows, boolean[] cols) {\n    if (r == matrix.length) return;\n    if (matrix[r][c] == 0) {\n      rows[r] = true;\n      cols[c] = true;\n    }\n    int nextR = c + 1 == matrix[0].length ? r + 1 : r;\n    int nextC = c + 1 == matrix[0].length ? 0 : c + 1;\n    collect(matrix, nextR, nextC, rows, cols);\n  }\n\n  private void apply(int[][] matrix, int r, int c, boolean[] rows, boolean[] cols) {\n    if (r == matrix.length) return;\n    if (rows[r] || cols[c]) matrix[r][c] = 0;\n    int nextR = c + 1 == matrix[0].length ? r + 1 : r;\n    int nextC = c + 1 == matrix[0].length ? 0 : c + 1;\n    apply(matrix, nextR, nextC, rows, cols);\n  }\n}",
      "optimizedCode": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean firstRowZero = false;\n    boolean firstColZero = false;\n\n    for (int c = 0; c < n; c++) if (matrix[0][c] == 0) firstRowZero = true;\n    for (int r = 0; r < m; r++) if (matrix[r][0] == 0) firstColZero = true;\n\n    for (int r = 1; r < m; r++) {\n      for (int c = 1; c < n; c++) {\n        if (matrix[r][c] == 0) {\n          matrix[r][0] = 0;\n          matrix[0][c] = 0;\n        }\n      }\n    }\n\n    for (int r = 1; r < m; r++) {\n      for (int c = 1; c < n; c++) {\n        if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n      }\n    }\n    if (firstRowZero) for (int c = 0; c < n; c++) matrix[0][c] = 0;\n    if (firstColZero) for (int r = 0; r < m; r++) matrix[r][0] = 0;\n  }\n}",
      "code": "class Solution {\n  public void setZeroes(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean firstRowZero = false;\n    boolean firstColZero = false;\n\n    for (int c = 0; c < n; c++) if (matrix[0][c] == 0) firstRowZero = true;\n    for (int r = 0; r < m; r++) if (matrix[r][0] == 0) firstColZero = true;\n\n    for (int r = 1; r < m; r++) {\n      for (int c = 1; c < n; c++) {\n        if (matrix[r][c] == 0) {\n          matrix[r][0] = 0;\n          matrix[0][c] = 0;\n        }\n      }\n    }\n\n    for (int r = 1; r < m; r++) {\n      for (int c = 1; c < n; c++) {\n        if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n      }\n    }\n    if (firstRowZero) for (int c = 0; c < n; c++) matrix[0][c] = 0;\n    if (firstColZero) for (int r = 0; r < m; r++) matrix[r][0] = 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Spiral Matrix",
      "difficulty": "Medium",
      "subpattern": "Boundary-layer traversal",
      "question": "Given an m x n matrix, return all elements of the matrix in spiral order.",
      "trigger": "Traversal repeatedly consumes the current outer boundary and shrinks inward.",
      "intuition": "Maintain top, bottom, left, and right boundaries and traverse four sides while they remain valid.",
      "edgeCases": "Single row, single column, rectangular matrix, odd center cell, empty matrix is not allowed by constraints.",
      "constraints": "1 <= m, n <= 10; -100 <= matrix[i][j] <= 100.",
      "source": {
        "label": "Spiral Matrix - LeetCode 54",
        "url": "https://leetcode.com/problems/spiral-matrix/"
      },
      "examples": [
        {
          "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          "output": "[1,2,3,6,9,8,7,4,5]",
          "explanation": "The outer layer is read before the center."
        },
        {
          "input": "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
          "output": "[1,2,3,4,8,12,11,10,9,5,6,7]",
          "explanation": "The final inner row is handled once."
        },
        {
          "input": "matrix = [[1],[2],[3]]",
          "output": "[1,2,3]",
          "explanation": "One column is already spiral order."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(mn). Simulate direction changes with a visited matrix.",
      "optimizedComplexity": "Time O(mn); Space O(1) excluding output. Shrinking boundaries avoid visited state.",
      "recursiveComplexity": "Time O(mn); Space O(min(m,n)) excluding output. Recursively peels one layer at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> spiralOrder(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    boolean[][] seen = new boolean[m][n];\n    int[] dr = {0, 1, 0, -1};\n    int[] dc = {1, 0, -1, 0};\n    int r = 0, c = 0, dir = 0;\n    List<Integer> answer = new ArrayList<>();\n\n    for (int step = 0; step < m * n; step++) {\n      answer.add(matrix[r][c]);\n      seen[r][c] = true;\n      int nr = r + dr[dir], nc = c + dc[dir];\n      if (nr < 0 || nr == m || nc < 0 || nc == n || seen[nr][nc]) {\n        dir = (dir + 1) % 4;\n        nr = r + dr[dir];\n        nc = c + dc[dir];\n      }\n      r = nr;\n      c = nc;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> spiralOrder(int[][] matrix) {\n    List<Integer> answer = new ArrayList<>();\n    int top = 0, bottom = matrix.length - 1;\n    int left = 0, right = matrix[0].length - 1;\n\n    while (top <= bottom && left <= right) {\n      for (int c = left; c <= right; c++) answer.add(matrix[top][c]);\n      top++;\n      for (int r = top; r <= bottom; r++) answer.add(matrix[r][right]);\n      right--;\n      if (top <= bottom) {\n        for (int c = right; c >= left; c--) answer.add(matrix[bottom][c]);\n        bottom--;\n      }\n      if (left <= right) {\n        for (int r = bottom; r >= top; r--) answer.add(matrix[r][left]);\n        left++;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> spiralOrder(int[][] matrix) {\n    List<Integer> answer = new ArrayList<>();\n    peel(matrix, 0, matrix.length - 1, 0, matrix[0].length - 1, answer);\n    return answer;\n  }\n\n  private void peel(int[][] matrix, int top, int bottom, int left, int right, List<Integer> answer) {\n    if (top > bottom || left > right) return;\n    for (int c = left; c <= right; c++) answer.add(matrix[top][c]);\n    for (int r = top + 1; r <= bottom; r++) answer.add(matrix[r][right]);\n    if (top < bottom) for (int c = right - 1; c >= left; c--) answer.add(matrix[bottom][c]);\n    if (left < right) for (int r = bottom - 1; r > top; r--) answer.add(matrix[r][left]);\n    peel(matrix, top + 1, bottom - 1, left + 1, right - 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> spiralOrder(int[][] matrix) {\n    List<Integer> answer = new ArrayList<>();\n    int top = 0, bottom = matrix.length - 1;\n    int left = 0, right = matrix[0].length - 1;\n\n    while (top <= bottom && left <= right) {\n      for (int c = left; c <= right; c++) answer.add(matrix[top][c]);\n      top++;\n      for (int r = top; r <= bottom; r++) answer.add(matrix[r][right]);\n      right--;\n      if (top <= bottom) {\n        for (int c = right; c >= left; c--) answer.add(matrix[bottom][c]);\n        bottom--;\n      }\n      if (left <= right) {\n        for (int r = bottom; r >= top; r--) answer.add(matrix[r][left]);\n        left++;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> spiralOrder(int[][] matrix) {\n    List<Integer> answer = new ArrayList<>();\n    int top = 0, bottom = matrix.length - 1;\n    int left = 0, right = matrix[0].length - 1;\n\n    while (top <= bottom && left <= right) {\n      for (int c = left; c <= right; c++) answer.add(matrix[top][c]);\n      top++;\n      for (int r = top; r <= bottom; r++) answer.add(matrix[r][right]);\n      right--;\n      if (top <= bottom) {\n        for (int c = right; c >= left; c--) answer.add(matrix[bottom][c]);\n        bottom--;\n      }\n      if (left <= right) {\n        for (int r = bottom; r >= top; r--) answer.add(matrix[r][left]);\n        left++;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Spiral Matrix II",
      "difficulty": "Medium",
      "subpattern": "Spiral fill simulation",
      "question": "Given an integer n, generate an n x n matrix filled with numbers from 1 to n^2 in spiral order.",
      "trigger": "The fill follows the same shrinking boundary layers as spiral traversal, but writes increasing values.",
      "intuition": "Write top row, right column, bottom row, and left column, then move the boundaries inward.",
      "edgeCases": "n is 1, odd n with center cell, even n, boundary crossing after a layer, final value n^2.",
      "constraints": "1 <= n <= 20.",
      "source": {
        "label": "Spiral Matrix II - LeetCode 59",
        "url": "https://leetcode.com/problems/spiral-matrix-ii/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "[[1,2,3],[8,9,4],[7,6,5]]",
          "explanation": "Values are written around the boundary then inward."
        },
        {
          "input": "n = 1",
          "output": "[[1]]",
          "explanation": "Only one cell is filled."
        },
        {
          "input": "n = 2",
          "output": "[[1,2],[4,3]]",
          "explanation": "The single layer contains four values."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n^2). Direction simulation tracks the next turn by bounds and filled cells.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). Boundary-layer filling writes each cell once.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively fills one spiral layer per call.",
      "bruteForceCode": "class Solution {\n  public int[][] generateMatrix(int n) {\n    int[][] matrix = new int[n][n];\n    int[] dr = {0, 1, 0, -1};\n    int[] dc = {1, 0, -1, 0};\n    int r = 0, c = 0, dir = 0;\n    for (int value = 1; value <= n * n; value++) {\n      matrix[r][c] = value;\n      int nr = r + dr[dir], nc = c + dc[dir];\n      if (nr < 0 || nr == n || nc < 0 || nc == n || matrix[nr][nc] != 0) {\n        dir = (dir + 1) % 4;\n        nr = r + dr[dir];\n        nc = c + dc[dir];\n      }\n      r = nr;\n      c = nc;\n    }\n    return matrix;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[][] generateMatrix(int n) {\n    int[][] matrix = new int[n][n];\n    int top = 0, bottom = n - 1;\n    int left = 0, right = n - 1;\n    int value = 1;\n\n    while (top <= bottom && left <= right) {\n      for (int c = left; c <= right; c++) matrix[top][c] = value++;\n      top++;\n      for (int r = top; r <= bottom; r++) matrix[r][right] = value++;\n      right--;\n      for (int c = right; c >= left && top <= bottom; c--) matrix[bottom][c] = value++;\n      bottom--;\n      for (int r = bottom; r >= top && left <= right; r--) matrix[r][left] = value++;\n      left++;\n    }\n    return matrix;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[][] generateMatrix(int n) {\n    int[][] matrix = new int[n][n];\n    fill(matrix, 0, n - 1, 0, n - 1, 1);\n    return matrix;\n  }\n\n  private void fill(int[][] matrix, int top, int bottom, int left, int right, int value) {\n    if (top > bottom || left > right) return;\n    for (int c = left; c <= right; c++) matrix[top][c] = value++;\n    for (int r = top + 1; r <= bottom; r++) matrix[r][right] = value++;\n    if (top < bottom) for (int c = right - 1; c >= left; c--) matrix[bottom][c] = value++;\n    if (left < right) for (int r = bottom - 1; r > top; r--) matrix[r][left] = value++;\n    fill(matrix, top + 1, bottom - 1, left + 1, right - 1, value);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[][] generateMatrix(int n) {\n    int[][] matrix = new int[n][n];\n    int top = 0, bottom = n - 1;\n    int left = 0, right = n - 1;\n    int value = 1;\n\n    while (top <= bottom && left <= right) {\n      for (int c = left; c <= right; c++) matrix[top][c] = value++;\n      top++;\n      for (int r = top; r <= bottom; r++) matrix[r][right] = value++;\n      right--;\n      for (int c = right; c >= left && top <= bottom; c--) matrix[bottom][c] = value++;\n      bottom--;\n      for (int r = bottom; r >= top && left <= right; r--) matrix[r][left] = value++;\n      left++;\n    }\n    return matrix;\n  }\n}",
      "code": "class Solution {\n  public int[][] generateMatrix(int n) {\n    int[][] matrix = new int[n][n];\n    int top = 0, bottom = n - 1;\n    int left = 0, right = n - 1;\n    int value = 1;\n\n    while (top <= bottom && left <= right) {\n      for (int c = left; c <= right; c++) matrix[top][c] = value++;\n      top++;\n      for (int r = top; r <= bottom; r++) matrix[r][right] = value++;\n      right--;\n      for (int c = right; c >= left && top <= bottom; c--) matrix[bottom][c] = value++;\n      bottom--;\n      for (int r = bottom; r >= top && left <= right; r--) matrix[r][left] = value++;\n      left++;\n    }\n    return matrix;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Rotate Image",
      "difficulty": "Medium",
      "subpattern": "Transpose and reverse rotation",
      "question": "Given an n x n matrix, rotate it 90 degrees clockwise in place.",
      "trigger": "A 90-degree rotation maps each cell by coordinates, and can be decomposed into transpose plus row reverse.",
      "intuition": "Transpose across the main diagonal, then reverse every row to complete clockwise rotation.",
      "edgeCases": "n is 1, even n, odd n with center cell, negative values, in-place requirement.",
      "constraints": "1 <= n <= 20; -1000 <= matrix[i][j] <= 1000.",
      "source": {
        "label": "Rotate Image - LeetCode 48",
        "url": "https://leetcode.com/problems/rotate-image/"
      },
      "examples": [
        {
          "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          "output": "[[7,4,1],[8,5,2],[9,6,3]]",
          "explanation": "Rows become columns after clockwise rotation."
        },
        {
          "input": "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
          "output": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
          "explanation": "All four layers rotate in place."
        },
        {
          "input": "matrix = [[1]]",
          "output": "[[1]]",
          "explanation": "One cell is unchanged."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n^2). Copy each value to its rotated coordinate.",
      "optimizedComplexity": "Time O(n^2); Space O(1). Transpose then reverse each row.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursively rotates four-way layer cycles.",
      "bruteForceCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    int[][] copy = new int[n][n];\n    for (int r = 0; r < n; r++) {\n      for (int c = 0; c < n; c++) {\n        copy[c][n - 1 - r] = matrix[r][c];\n      }\n    }\n    for (int r = 0; r < n; r++) {\n      for (int c = 0; c < n; c++) matrix[r][c] = copy[r][c];\n    }\n  }\n}",
      "iterativeCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int r = 0; r < n; r++) {\n      for (int c = r + 1; c < n; c++) {\n        int temp = matrix[r][c];\n        matrix[r][c] = matrix[c][r];\n        matrix[c][r] = temp;\n      }\n    }\n\n    for (int r = 0; r < n; r++) {\n      int left = 0, right = n - 1;\n      while (left < right) {\n        int temp = matrix[r][left];\n        matrix[r][left++] = matrix[r][right];\n        matrix[r][right--] = temp;\n      }\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    rotateLayer(matrix, 0, matrix.length - 1);\n  }\n\n  private void rotateLayer(int[][] matrix, int start, int end) {\n    if (start >= end) return;\n    for (int offset = 0; offset < end - start; offset++) {\n      int top = matrix[start][start + offset];\n      matrix[start][start + offset] = matrix[end - offset][start];\n      matrix[end - offset][start] = matrix[end][end - offset];\n      matrix[end][end - offset] = matrix[start + offset][end];\n      matrix[start + offset][end] = top;\n    }\n    rotateLayer(matrix, start + 1, end - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int r = 0; r < n; r++) {\n      for (int c = r + 1; c < n; c++) {\n        int temp = matrix[r][c];\n        matrix[r][c] = matrix[c][r];\n        matrix[c][r] = temp;\n      }\n    }\n\n    for (int r = 0; r < n; r++) {\n      int left = 0, right = n - 1;\n      while (left < right) {\n        int temp = matrix[r][left];\n        matrix[r][left++] = matrix[r][right];\n        matrix[r][right--] = temp;\n      }\n    }\n  }\n}",
      "code": "class Solution {\n  public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int r = 0; r < n; r++) {\n      for (int c = r + 1; c < n; c++) {\n        int temp = matrix[r][c];\n        matrix[r][c] = matrix[c][r];\n        matrix[c][r] = temp;\n      }\n    }\n\n    for (int r = 0; r < n; r++) {\n      int left = 0, right = n - 1;\n      while (left < right) {\n        int temp = matrix[r][left];\n        matrix[r][left++] = matrix[r][right];\n        matrix[r][right--] = temp;\n      }\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search a 2D Matrix",
      "difficulty": "Medium",
      "subpattern": "Flattened binary search",
      "question": "Given a matrix where each row is sorted and the first integer of each row is greater than the last integer of the previous row, return whether target exists.",
      "trigger": "The matrix is globally sorted if flattened row by row, making binary search valid over virtual indexes.",
      "intuition": "Map a virtual index mid to row mid / n and column mid % n.",
      "edgeCases": "Target smaller than first value, target larger than last value, one row, one column, target at row boundary.",
      "constraints": "1 <= m, n <= 100; -10000 <= matrix[i][j], target <= 10000.",
      "source": {
        "label": "Search a 2D Matrix - LeetCode 74",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/"
      },
      "examples": [
        {
          "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
          "output": "true",
          "explanation": "3 is present in the first row."
        },
        {
          "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
          "output": "false",
          "explanation": "13 is between values but absent."
        },
        {
          "input": "matrix = [[1]], target = 1",
          "output": "true",
          "explanation": "Single-cell matrix contains the target."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(1). Scan every cell.",
      "optimizedComplexity": "Time O(log(mn)); Space O(1). Binary search a flattened virtual array.",
      "recursiveComplexity": "Time O(log(mn)); Space O(log(mn)). Recursive binary search over virtual indexes.",
      "bruteForceCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        if (matrix[r][c] == target) return true;\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int left = 0;\n    int right = m * n - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / n][mid % n];\n      if (value == target) return true;\n      if (value < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int n = matrix[0].length;\n    return search(matrix, target, 0, matrix.length * n - 1, n);\n  }\n\n  private boolean search(int[][] matrix, int target, int left, int right, int n) {\n    if (left > right) return false;\n    int mid = left + (right - left) / 2;\n    int value = matrix[mid / n][mid % n];\n    if (value == target) return true;\n    if (value < target) return search(matrix, target, mid + 1, right, n);\n    return search(matrix, target, left, mid - 1, n);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int left = 0;\n    int right = m * n - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / n][mid % n];\n      if (value == target) return true;\n      if (value < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int left = 0;\n    int right = m * n - 1;\n\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      int value = matrix[mid / n][mid % n];\n      if (value == target) return true;\n      if (value < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Search a 2D Matrix II",
      "difficulty": "Medium",
      "subpattern": "Staircase sorted search",
      "question": "Given an m x n matrix sorted ascending left-to-right in each row and top-to-bottom in each column, return whether target exists.",
      "trigger": "From the top-right corner, moving left decreases values and moving down increases values.",
      "intuition": "Start at top-right and eliminate one row or one column after each comparison.",
      "edgeCases": "Target at top-right, target at bottom-left, one row, one column, target outside min/max range.",
      "constraints": "1 <= m, n <= 300; -1000000000 <= matrix[i][j], target <= 1000000000.",
      "source": {
        "label": "Search a 2D Matrix II - LeetCode 240",
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/"
      },
      "examples": [
        {
          "input": "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5",
          "output": "true",
          "explanation": "The target is found while walking the staircase."
        },
        {
          "input": "matrix = [[1,4],[2,5]], target = 3",
          "output": "false",
          "explanation": "The search eliminates all candidates."
        },
        {
          "input": "matrix = [[-1,3]], target = 3",
          "output": "true",
          "explanation": "Single row still supports staircase movement."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(1). Scan every cell.",
      "optimizedComplexity": "Time O(m+n); Space O(1). Staircase search eliminates one row or column each step.",
      "recursiveComplexity": "Time O(m+n); Space O(m+n). Recursive staircase movement.",
      "bruteForceCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        if (matrix[r][c] == target) return true;\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int r = 0;\n    int c = matrix[0].length - 1;\n    while (r < matrix.length && c >= 0) {\n      int value = matrix[r][c];\n      if (value == target) return true;\n      if (value > target) c--;\n      else r++;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    return search(matrix, target, 0, matrix[0].length - 1);\n  }\n\n  private boolean search(int[][] matrix, int target, int r, int c) {\n    if (r == matrix.length || c < 0) return false;\n    int value = matrix[r][c];\n    if (value == target) return true;\n    if (value > target) return search(matrix, target, r, c - 1);\n    return search(matrix, target, r + 1, c);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int r = 0;\n    int c = matrix[0].length - 1;\n    while (r < matrix.length && c >= 0) {\n      int value = matrix[r][c];\n      if (value == target) return true;\n      if (value > target) c--;\n      else r++;\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean searchMatrix(int[][] matrix, int target) {\n    int r = 0;\n    int c = matrix[0].length - 1;\n    while (r < matrix.length && c >= 0) {\n      int value = matrix[r][c];\n      if (value == target) return true;\n      if (value > target) c--;\n      else r++;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Game of Life",
      "difficulty": "Medium",
      "subpattern": "In-place state encoding",
      "question": "Given a board of live and dead cells, update it to the next Game of Life state in place using the standard four rules.",
      "trigger": "Each cell update depends on original neighbors, so transitional markers preserve old and new states in one integer.",
      "intuition": "Use -1 for live-to-dead and 2 for dead-to-live; old liveness is abs(value) == 1.",
      "edgeCases": "Single cell, all live cells, all dead cells, corner cells with fewer neighbors, births and deaths in the same pass.",
      "constraints": "1 <= m, n <= 25; board[i][j] is 0 or 1.",
      "source": {
        "label": "Game of Life - LeetCode 289",
        "url": "https://leetcode.com/problems/game-of-life/"
      },
      "examples": [
        {
          "input": "board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]",
          "output": "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
          "explanation": "Cells update simultaneously from the original board."
        },
        {
          "input": "board = [[1,1],[1,0]]",
          "output": "[[1,1],[1,1]]",
          "explanation": "The dead bottom-right cell becomes live."
        },
        {
          "input": "board = [[0]]",
          "output": "[[0]]",
          "explanation": "A single dead cell stays dead."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(mn). Copy the board before applying next states.",
      "optimizedComplexity": "Time O(mn); Space O(1). Transitional values encode old and new states in place.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursively scans cells while reading from a copy.",
      "bruteForceCode": "class Solution {\n  public void gameOfLife(int[][] board) {\n    int m = board.length, n = board[0].length;\n    int[][] original = new int[m][n];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) original[r][c] = board[r][c];\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int live = liveNeighbors(original, r, c);\n        if (original[r][c] == 1) board[r][c] = live == 2 || live == 3 ? 1 : 0;\n        else board[r][c] = live == 3 ? 1 : 0;\n      }\n    }\n  }\n\n  private int liveNeighbors(int[][] board, int r, int c) {\n    int count = 0;\n    for (int dr = -1; dr <= 1; dr++) for (int dc = -1; dc <= 1; dc++) {\n      if (dr == 0 && dc == 0) continue;\n      int nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) count += board[nr][nc];\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public void gameOfLife(int[][] board) {\n    int m = board.length, n = board[0].length;\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int live = liveNeighbors(board, r, c);\n        if (board[r][c] == 1 && (live < 2 || live > 3)) board[r][c] = -1;\n        if (board[r][c] == 0 && live == 3) board[r][c] = 2;\n      }\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) board[r][c] = board[r][c] > 0 ? 1 : 0;\n    }\n  }\n\n  private int liveNeighbors(int[][] board, int r, int c) {\n    int count = 0;\n    for (int dr = -1; dr <= 1; dr++) for (int dc = -1; dc <= 1; dc++) {\n      if (dr == 0 && dc == 0) continue;\n      int nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && Math.abs(board[nr][nc]) == 1) count++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public void gameOfLife(int[][] board) {\n    int[][] original = new int[board.length][board[0].length];\n    copy(board, original, 0, 0);\n    update(board, original, 0, 0);\n  }\n\n  private void copy(int[][] board, int[][] original, int r, int c) {\n    if (r == board.length) return;\n    original[r][c] = board[r][c];\n    int nr = c + 1 == board[0].length ? r + 1 : r;\n    int nc = c + 1 == board[0].length ? 0 : c + 1;\n    copy(board, original, nr, nc);\n  }\n\n  private void update(int[][] board, int[][] original, int r, int c) {\n    if (r == board.length) return;\n    int live = liveNeighbors(original, r, c);\n    board[r][c] = original[r][c] == 1 ? (live == 2 || live == 3 ? 1 : 0) : (live == 3 ? 1 : 0);\n    int nr = c + 1 == board[0].length ? r + 1 : r;\n    int nc = c + 1 == board[0].length ? 0 : c + 1;\n    update(board, original, nr, nc);\n  }\n\n  private int liveNeighbors(int[][] board, int r, int c) {\n    int count = 0;\n    for (int dr = -1; dr <= 1; dr++) for (int dc = -1; dc <= 1; dc++) {\n      int nr = r + dr, nc = c + dc;\n      if ((dr != 0 || dc != 0) && nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) count += board[nr][nc];\n    }\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public void gameOfLife(int[][] board) {\n    int m = board.length, n = board[0].length;\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int live = liveNeighbors(board, r, c);\n        if (board[r][c] == 1 && (live < 2 || live > 3)) board[r][c] = -1;\n        if (board[r][c] == 0 && live == 3) board[r][c] = 2;\n      }\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) board[r][c] = board[r][c] > 0 ? 1 : 0;\n    }\n  }\n\n  private int liveNeighbors(int[][] board, int r, int c) {\n    int count = 0;\n    for (int dr = -1; dr <= 1; dr++) for (int dc = -1; dc <= 1; dc++) {\n      if (dr == 0 && dc == 0) continue;\n      int nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && Math.abs(board[nr][nc]) == 1) count++;\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  public void gameOfLife(int[][] board) {\n    int m = board.length, n = board[0].length;\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int live = liveNeighbors(board, r, c);\n        if (board[r][c] == 1 && (live < 2 || live > 3)) board[r][c] = -1;\n        if (board[r][c] == 0 && live == 3) board[r][c] = 2;\n      }\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) board[r][c] = board[r][c] > 0 ? 1 : 0;\n    }\n  }\n\n  private int liveNeighbors(int[][] board, int r, int c) {\n    int count = 0;\n    for (int dr = -1; dr <= 1; dr++) for (int dc = -1; dc <= 1; dc++) {\n      if (dr == 0 && dc == 0) continue;\n      int nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && Math.abs(board[nr][nc]) == 1) count++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Word Search",
      "difficulty": "Medium",
      "subpattern": "Backtracking grid search",
      "question": "Given an m x n board of characters and a word, return true if the word exists by moving horizontally or vertically without reusing a cell.",
      "trigger": "Each character match branches to neighboring cells and must undo visited state when backtracking.",
      "intuition": "Start DFS from every matching first character and temporarily mark cells as used along the current path.",
      "edgeCases": "Word length is 1, board has repeated letters, path must not reuse a cell, word longer than cell count, target starts at any cell.",
      "constraints": "1 <= m, n <= 6; 1 <= word.length <= 15; board and word contain English letters.",
      "source": {
        "label": "Word Search - LeetCode 79",
        "url": "https://leetcode.com/problems/word-search/"
      },
      "examples": [
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
          "output": "true",
          "explanation": "A valid path spells the word."
        },
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"SEE\"",
          "output": "true",
          "explanation": "The word appears through adjacent cells."
        },
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
          "output": "false",
          "explanation": "The path would need to reuse B."
        }
      ],
      "bruteForceComplexity": "Time O(mn * 4^L); Space O(mn). DFS uses a separate visited matrix.",
      "optimizedComplexity": "Time O(mn * 4^L); Space O(L). In-place marking avoids a visited matrix.",
      "recursiveComplexity": "Time O(mn * 4^L); Space O(L). Recursive backtracking branches through neighbors.",
      "bruteForceCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (search(board, word, r, c, 0, new boolean[board.length][board[0].length])) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean search(char[][] board, String word, int r, int c, int index, boolean[][] seen) {\n    if (index == word.length()) return true;\n    if (r < 0 || r == board.length || c < 0 || c == board[0].length) return false;\n    if (seen[r][c] || board[r][c] != word.charAt(index)) return false;\n    seen[r][c] = true;\n    boolean found = search(board, word, r + 1, c, index + 1, seen) || search(board, word, r - 1, c, index + 1, seen) || search(board, word, r, c + 1, index + 1, seen) || search(board, word, r, c - 1, index + 1, seen);\n    seen[r][c] = false;\n    return found;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    if (word.length() > board.length * board[0].length) return false;\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (dfs(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean dfs(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r < 0 || r == board.length || c < 0 || c == board[0].length || board[r][c] != word.charAt(index)) return false;\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = dfs(board, word, r + 1, c, index + 1) || dfs(board, word, r - 1, c, index + 1) || dfs(board, word, r, c + 1, index + 1) || dfs(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    return tryStart(board, word, 0, 0);\n  }\n\n  private boolean tryStart(char[][] board, String word, int r, int c) {\n    if (r == board.length) return false;\n    if (dfs(board, word, r, c, 0)) return true;\n    int nr = c + 1 == board[0].length ? r + 1 : r;\n    int nc = c + 1 == board[0].length ? 0 : c + 1;\n    return tryStart(board, word, nr, nc);\n  }\n\n  private boolean dfs(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r < 0 || r == board.length || c < 0 || c == board[0].length || board[r][c] != word.charAt(index)) return false;\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = dfs(board, word, r + 1, c, index + 1) || dfs(board, word, r - 1, c, index + 1) || dfs(board, word, r, c + 1, index + 1) || dfs(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    if (word.length() > board.length * board[0].length) return false;\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (dfs(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean dfs(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r < 0 || r == board.length || c < 0 || c == board[0].length || board[r][c] != word.charAt(index)) return false;\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = dfs(board, word, r + 1, c, index + 1) || dfs(board, word, r - 1, c, index + 1) || dfs(board, word, r, c + 1, index + 1) || dfs(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
      "code": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    if (word.length() > board.length * board[0].length) return false;\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (dfs(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean dfs(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r < 0 || r == board.length || c < 0 || c == board[0].length || board[r][c] != word.charAt(index)) return false;\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = dfs(board, word, r + 1, c, index + 1) || dfs(board, word, r - 1, c, index + 1) || dfs(board, word, r, c + 1, index + 1) || dfs(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Number of Islands",
      "difficulty": "Medium",
      "subpattern": "DFS island counting",
      "question": "Given a grid of 1s and 0s, return the number of islands where land is connected horizontally or vertically.",
      "trigger": "Each island is a connected component in a grid, so one flood fill should consume exactly one island.",
      "intuition": "When an unvisited land cell is found, increment the count and flood fill all connected land.",
      "edgeCases": "All water, all land, single cell, diagonal land does not connect, multiple thin islands.",
      "constraints": "1 <= m, n <= 300; grid[i][j] is 0 or 1.",
      "source": {
        "label": "Number of Islands - LeetCode 200",
        "url": "https://leetcode.com/problems/number-of-islands/"
      },
      "examples": [
        {
          "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
          "output": "1",
          "explanation": "All land cells connect into one island."
        },
        {
          "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
          "output": "3",
          "explanation": "There are three disconnected land components."
        },
        {
          "input": "grid = [[\"0\"]]",
          "output": "0",
          "explanation": "No land means no island."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(mn). Use a visited matrix and BFS/DFS for each component.",
      "optimizedComplexity": "Time O(mn); Space O(mn) worst-case queue. Mutate visited land to water.",
      "recursiveComplexity": "Time O(mn); Space O(mn) call stack in worst case. Recursive DFS sinks each island.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    int count = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1' && !seen[r][c]) {\n          count++;\n          bfs(grid, seen, r, c);\n        }\n      }\n    }\n    return count;\n  }\n\n  private void bfs(char[][] grid, boolean[][] seen, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    seen[sr][sc] = true;\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == '1' && !seen[nr][nc]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1') {\n          count++;\n          sink(grid, r, c);\n        }\n      }\n    }\n    return count;\n  }\n\n  private void sink(char[][] grid, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    grid[sr][sc] = '0';\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == '1') {\n          grid[nr][nc] = '0';\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1') {\n          count++;\n          dfs(grid, r, c);\n        }\n      }\n    }\n    return count;\n  }\n\n  private void dfs(char[][] grid, int r, int c) {\n    if (r < 0 || r == grid.length || c < 0 || c == grid[0].length || grid[r][c] != '1') return;\n    grid[r][c] = '0';\n    dfs(grid, r + 1, c);\n    dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1);\n    dfs(grid, r, c - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1') {\n          count++;\n          sink(grid, r, c);\n        }\n      }\n    }\n    return count;\n  }\n\n  private void sink(char[][] grid, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    grid[sr][sc] = '0';\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == '1') {\n          grid[nr][nc] = '0';\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1') {\n          count++;\n          sink(grid, r, c);\n        }\n      }\n    }\n    return count;\n  }\n\n  private void sink(char[][] grid, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    grid[sr][sc] = '0';\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == '1') {\n          grid[nr][nc] = '0';\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Max Area of Island",
      "difficulty": "Medium",
      "subpattern": "DFS component area",
      "question": "Given a binary grid, return the maximum area of an island connected horizontally or vertically.",
      "trigger": "The required value is the size of the largest connected land component.",
      "intuition": "Flood fill each unseen land component, count its cells, and keep the maximum.",
      "edgeCases": "No land, single land cell, all land, diagonal cells not connected, multiple equal-size islands.",
      "constraints": "1 <= m, n <= 50; grid[i][j] is 0 or 1.",
      "source": {
        "label": "Max Area of Island - LeetCode 695",
        "url": "https://leetcode.com/problems/max-area-of-island/"
      },
      "examples": [
        {
          "input": "grid = [[0,0,1,0],[1,1,1,0],[0,0,0,0]]",
          "output": "4",
          "explanation": "The connected component has four land cells."
        },
        {
          "input": "grid = [[0,0,0,0]]",
          "output": "0",
          "explanation": "There is no island."
        },
        {
          "input": "grid = [[1,1],[1,1]]",
          "output": "4",
          "explanation": "The whole grid is one island."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(mn). Use visited state and BFS for every component.",
      "optimizedComplexity": "Time O(mn); Space O(mn) worst-case queue. Mutate visited land to water.",
      "recursiveComplexity": "Time O(mn); Space O(mn) call stack in worst case. Recursive DFS returns component area.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    int best = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 1 && !seen[r][c]) best = Math.max(best, area(grid, seen, r, c));\n      }\n    }\n    return best;\n  }\n\n  private int area(int[][] grid, boolean[][] seen, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    seen[sr][sc] = true;\n    int count = 0;\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      count++;\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1 && !seen[nr][nc]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    int best = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 1) best = Math.max(best, sink(grid, r, c));\n      }\n    }\n    return best;\n  }\n\n  private int sink(int[][] grid, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    grid[sr][sc] = 0;\n    int count = 0;\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      count++;\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {\n          grid[nr][nc] = 0;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    int best = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        best = Math.max(best, dfs(grid, r, c));\n      }\n    }\n    return best;\n  }\n\n  private int dfs(int[][] grid, int r, int c) {\n    if (r < 0 || r == grid.length || c < 0 || c == grid[0].length || grid[r][c] == 0) return 0;\n    grid[r][c] = 0;\n    return 1 + dfs(grid, r + 1, c) + dfs(grid, r - 1, c) + dfs(grid, r, c + 1) + dfs(grid, r, c - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    int best = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 1) best = Math.max(best, sink(grid, r, c));\n      }\n    }\n    return best;\n  }\n\n  private int sink(int[][] grid, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    grid[sr][sc] = 0;\n    int count = 0;\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      count++;\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {\n          grid[nr][nc] = 0;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return count;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    int best = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 1) best = Math.max(best, sink(grid, r, c));\n      }\n    }\n    return best;\n  }\n\n  private int sink(int[][] grid, int sr, int sc) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    grid[sr][sc] = 0;\n    int count = 0;\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      count++;\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {\n          grid[nr][nc] = 0;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Surrounded Regions",
      "difficulty": "Medium",
      "subpattern": "Boundary flood fill",
      "question": "Given a board of X and O, capture all regions of O that are fully surrounded by X.",
      "trigger": "Only O cells connected to the boundary are safe; every other O can be flipped.",
      "intuition": "Mark boundary-connected O cells first, then flip remaining O cells and restore marked safe cells.",
      "edgeCases": "No O cells, all O cells, boundary O, one row, one column, enclosed region touching boundary through a path.",
      "constraints": "1 <= m, n <= 200; board[i][j] is X or O.",
      "source": {
        "label": "Surrounded Regions - LeetCode 130",
        "url": "https://leetcode.com/problems/surrounded-regions/"
      },
      "examples": [
        {
          "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
          "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
          "explanation": "Only the boundary-connected O remains."
        },
        {
          "input": "board = [[\"X\"]]",
          "output": "[[\"X\"]]",
          "explanation": "Single cell remains unchanged."
        },
        {
          "input": "board = [[\"O\",\"O\"],[\"O\",\"O\"]]",
          "output": "[[\"O\",\"O\"],[\"O\",\"O\"]]",
          "explanation": "Every O touches the boundary."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). For each O, search whether it can reach a boundary.",
      "optimizedComplexity": "Time O(mn); Space O(mn) queue. Flood fill safe boundary-connected cells first.",
      "recursiveComplexity": "Time O(mn); Space O(mn) call stack. Recursive boundary DFS marks safe cells.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int m = board.length, n = board[0].length;\n    boolean[][] safe = new boolean[m][n];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (board[r][c] == 'O' && reachesBoundary(board, r, c)) safe[r][c] = true;\n      }\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) if (board[r][c] == 'O' && !safe[r][c]) board[r][c] = 'X';\n    }\n  }\n\n  private boolean reachesBoundary(char[][] board, int sr, int sc) {\n    boolean[][] seen = new boolean[board.length][board[0].length];\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    seen[sr][sc] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (cell[0] == 0 || cell[0] == board.length - 1 || cell[1] == 0 || cell[1] == board[0].length - 1) return true;\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && board[nr][nc] == 'O' && !seen[nr][nc]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int m = board.length, n = board[0].length;\n    for (int r = 0; r < m; r++) {\n      mark(board, r, 0);\n      mark(board, r, n - 1);\n    }\n    for (int c = 0; c < n; c++) {\n      mark(board, 0, c);\n      mark(board, m - 1, c);\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void mark(char[][] board, int sr, int sc) {\n    if (board[sr][sc] != 'O') return;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    board[sr][sc] = '#';\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && board[nr][nc] == 'O') {\n          board[nr][nc] = '#';\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public void solve(char[][] board) {\n    int m = board.length, n = board[0].length;\n    for (int r = 0; r < m; r++) {\n      mark(board, r, 0);\n      mark(board, r, n - 1);\n    }\n    for (int c = 0; c < n; c++) {\n      mark(board, 0, c);\n      mark(board, m - 1, c);\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        else if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void mark(char[][] board, int r, int c) {\n    if (r < 0 || r == board.length || c < 0 || c == board[0].length || board[r][c] != 'O') return;\n    board[r][c] = '#';\n    mark(board, r + 1, c);\n    mark(board, r - 1, c);\n    mark(board, r, c + 1);\n    mark(board, r, c - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int m = board.length, n = board[0].length;\n    for (int r = 0; r < m; r++) {\n      mark(board, r, 0);\n      mark(board, r, n - 1);\n    }\n    for (int c = 0; c < n; c++) {\n      mark(board, 0, c);\n      mark(board, m - 1, c);\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void mark(char[][] board, int sr, int sc) {\n    if (board[sr][sc] != 'O') return;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    board[sr][sc] = '#';\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && board[nr][nc] == 'O') {\n          board[nr][nc] = '#';\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int m = board.length, n = board[0].length;\n    for (int r = 0; r < m; r++) {\n      mark(board, r, 0);\n      mark(board, r, n - 1);\n    }\n    for (int c = 0; c < n; c++) {\n      mark(board, 0, c);\n      mark(board, m - 1, c);\n    }\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void mark(char[][] board, int sr, int sc) {\n    if (board[sr][sc] != 'O') return;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    board[sr][sc] = '#';\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && board[nr][nc] == 'O') {\n          board[nr][nc] = '#';\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Pacific Atlantic Water Flow",
      "difficulty": "Medium",
      "subpattern": "Reverse multi-source ocean reachability",
      "question": "Given a matrix of heights, return coordinates from which water can flow to both the Pacific and Atlantic oceans.",
      "trigger": "Instead of checking every cell downhill, reverse the direction and grow uphill reachability from both ocean borders.",
      "intuition": "Run reachability from Pacific borders and Atlantic borders; cells reached by both are answers.",
      "edgeCases": "Single cell, flat grid, strictly increasing grid, strictly decreasing grid, one row or one column.",
      "constraints": "1 <= m, n <= 200; 0 <= heights[i][j] <= 100000.",
      "source": {
        "label": "Pacific Atlantic Water Flow - LeetCode 417",
        "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
      },
      "examples": [
        {
          "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
          "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
          "explanation": "These cells can reach both oceans."
        },
        {
          "input": "heights = [[1]]",
          "output": "[[0,0]]",
          "explanation": "The only cell touches both oceans."
        },
        {
          "input": "heights = [[1,1],[1,1]]",
          "output": "[[0,0],[0,1],[1,0],[1,1]]",
          "explanation": "Flat terrain can flow everywhere."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Run a downhill search from every cell.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Reverse BFS/DFS from ocean borders.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive reverse DFS marks each ocean reachability grid.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < heights.length; r++) {\n      for (int c = 0; c < heights[0].length; c++) {\n        boolean[] oceans = new boolean[2];\n        flow(heights, r, c, Integer.MAX_VALUE, new boolean[heights.length][heights[0].length], oceans);\n        if (oceans[0] && oceans[1]) answer.add(Arrays.asList(r, c));\n      }\n    }\n    return answer;\n  }\n\n  private void flow(int[][] h, int r, int c, int prev, boolean[][] seen, boolean[] oceans) {\n    if (r < 0 || c < 0) { oceans[0] = true; return; }\n    if (r == h.length || c == h[0].length) { oceans[1] = true; return; }\n    if (seen[r][c] || h[r][c] > prev) return;\n    seen[r][c] = true;\n    flow(h, r + 1, c, h[r][c], seen, oceans);\n    flow(h, r - 1, c, h[r][c], seen, oceans);\n    flow(h, r, c + 1, h[r][c], seen, oceans);\n    flow(h, r, c - 1, h[r][c], seen, oceans);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int m = heights.length, n = heights[0].length;\n    boolean[][] pacific = new boolean[m][n];\n    boolean[][] atlantic = new boolean[m][n];\n    Queue<int[]> pQueue = new ArrayDeque<>();\n    Queue<int[]> aQueue = new ArrayDeque<>();\n\n    for (int r = 0; r < m; r++) {\n      add(pQueue, pacific, r, 0);\n      add(aQueue, atlantic, r, n - 1);\n    }\n    for (int c = 0; c < n; c++) {\n      add(pQueue, pacific, 0, c);\n      add(aQueue, atlantic, m - 1, c);\n    }\n    bfs(heights, pQueue, pacific);\n    bfs(heights, aQueue, atlantic);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {\n      if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n    }\n    return answer;\n  }\n\n  private void add(Queue<int[]> queue, boolean[][] seen, int r, int c) {\n    if (!seen[r][c]) {\n      seen[r][c] = true;\n      queue.offer(new int[]{r, c});\n    }\n  }\n\n  private void bfs(int[][] h, Queue<int[]> queue, boolean[][] seen) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < h.length && nc >= 0 && nc < h[0].length && !seen[nr][nc] && h[nr][nc] >= h[cell[0]][cell[1]]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int m = heights.length, n = heights[0].length;\n    boolean[][] pacific = new boolean[m][n];\n    boolean[][] atlantic = new boolean[m][n];\n    for (int r = 0; r < m; r++) {\n      dfs(heights, r, 0, Integer.MIN_VALUE, pacific);\n      dfs(heights, r, n - 1, Integer.MIN_VALUE, atlantic);\n    }\n    for (int c = 0; c < n; c++) {\n      dfs(heights, 0, c, Integer.MIN_VALUE, pacific);\n      dfs(heights, m - 1, c, Integer.MIN_VALUE, atlantic);\n    }\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {\n      if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n    }\n    return answer;\n  }\n\n  private void dfs(int[][] h, int r, int c, int prev, boolean[][] seen) {\n    if (r < 0 || r == h.length || c < 0 || c == h[0].length || seen[r][c] || h[r][c] < prev) return;\n    seen[r][c] = true;\n    dfs(h, r + 1, c, h[r][c], seen);\n    dfs(h, r - 1, c, h[r][c], seen);\n    dfs(h, r, c + 1, h[r][c], seen);\n    dfs(h, r, c - 1, h[r][c], seen);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int m = heights.length, n = heights[0].length;\n    boolean[][] pacific = new boolean[m][n];\n    boolean[][] atlantic = new boolean[m][n];\n    Queue<int[]> pQueue = new ArrayDeque<>();\n    Queue<int[]> aQueue = new ArrayDeque<>();\n\n    for (int r = 0; r < m; r++) {\n      add(pQueue, pacific, r, 0);\n      add(aQueue, atlantic, r, n - 1);\n    }\n    for (int c = 0; c < n; c++) {\n      add(pQueue, pacific, 0, c);\n      add(aQueue, atlantic, m - 1, c);\n    }\n    bfs(heights, pQueue, pacific);\n    bfs(heights, aQueue, atlantic);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {\n      if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n    }\n    return answer;\n  }\n\n  private void add(Queue<int[]> queue, boolean[][] seen, int r, int c) {\n    if (!seen[r][c]) {\n      seen[r][c] = true;\n      queue.offer(new int[]{r, c});\n    }\n  }\n\n  private void bfs(int[][] h, Queue<int[]> queue, boolean[][] seen) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < h.length && nc >= 0 && nc < h[0].length && !seen[nr][nc] && h[nr][nc] >= h[cell[0]][cell[1]]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int m = heights.length, n = heights[0].length;\n    boolean[][] pacific = new boolean[m][n];\n    boolean[][] atlantic = new boolean[m][n];\n    Queue<int[]> pQueue = new ArrayDeque<>();\n    Queue<int[]> aQueue = new ArrayDeque<>();\n\n    for (int r = 0; r < m; r++) {\n      add(pQueue, pacific, r, 0);\n      add(aQueue, atlantic, r, n - 1);\n    }\n    for (int c = 0; c < n; c++) {\n      add(pQueue, pacific, 0, c);\n      add(aQueue, atlantic, m - 1, c);\n    }\n    bfs(heights, pQueue, pacific);\n    bfs(heights, aQueue, atlantic);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {\n      if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n    }\n    return answer;\n  }\n\n  private void add(Queue<int[]> queue, boolean[][] seen, int r, int c) {\n    if (!seen[r][c]) {\n      seen[r][c] = true;\n      queue.offer(new int[]{r, c});\n    }\n  }\n\n  private void bfs(int[][] h, Queue<int[]> queue, boolean[][] seen) {\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < h.length && nc >= 0 && nc < h[0].length && !seen[nr][nc] && h[nr][nc] >= h[cell[0]][cell[1]]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n  }\n}"
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
      "constraints": "1 <= m, n <= 50; 0 <= image[i][j], color < 2^16.",
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
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    boolean[][] seen = new boolean[image.length][image[0].length];\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    seen[sr][sc] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      image[cell[0]][cell[1]] = color;\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < image.length && nc >= 0 && nc < image[0].length && !seen[nr][nc] && image[nr][nc] == original) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original == color) return image;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    image[sr][sc] = color;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < image.length && nc >= 0 && nc < image[0].length && image[nr][nc] == original) {\n          image[nr][nc] = color;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original != color) dfs(image, sr, sc, original, color);\n    return image;\n  }\n\n  private void dfs(int[][] image, int r, int c, int original, int color) {\n    if (r < 0 || r == image.length || c < 0 || c == image[0].length || image[r][c] != original) return;\n    image[r][c] = color;\n    dfs(image, r + 1, c, original, color);\n    dfs(image, r - 1, c, original, color);\n    dfs(image, r, c + 1, original, color);\n    dfs(image, r, c - 1, original, color);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original == color) return image;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    image[sr][sc] = color;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < image.length && nc >= 0 && nc < image[0].length && image[nr][nc] == original) {\n          image[nr][nc] = color;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int original = image[sr][sc];\n    if (original == color) return image;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc});\n    image[sr][sc] = color;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < image.length && nc >= 0 && nc < image[0].length && image[nr][nc] == original) {\n          image[nr][nc] = color;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return image;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "01 Matrix",
      "difficulty": "Medium",
      "subpattern": "Multi-source BFS distance",
      "question": "Given a binary matrix, return a matrix where each cell contains the distance to the nearest 0.",
      "trigger": "Distances from every cell to the nearest zero are shortest paths from all zero cells at once.",
      "intuition": "Push all zero cells into the queue first and expand level by level into one cells.",
      "edgeCases": "All zeros, one zero, zero at corner, rectangular matrix, many equal nearest zeros.",
      "constraints": "1 <= m, n <= 10000 total cells; mat[i][j] is 0 or 1; at least one zero exists.",
      "source": {
        "label": "01 Matrix - LeetCode 542",
        "url": "https://leetcode.com/problems/01-matrix/"
      },
      "examples": [
        {
          "input": "mat = [[0,0,0],[0,1,0],[0,0,0]]",
          "output": "[[0,0,0],[0,1,0],[0,0,0]]",
          "explanation": "The center one is adjacent to zeros."
        },
        {
          "input": "mat = [[0,0,0],[0,1,0],[1,1,1]]",
          "output": "[[0,0,0],[0,1,0],[1,2,1]]",
          "explanation": "Distances expand from all zeros."
        },
        {
          "input": "mat = [[0]]",
          "output": "[[0]]",
          "explanation": "Zero distance for the only cell."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Run BFS from each one cell to find a zero.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Multi-source BFS visits each cell once.",
      "recursiveComplexity": "Time O(mn * relaxations); Space O(mn). Recursive relaxation propagates shorter distances from zeros.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int[][] answer = new int[mat.length][mat[0].length];\n    for (int r = 0; r < mat.length; r++) {\n      for (int c = 0; c < mat[0].length; c++) answer[r][c] = distanceToZero(mat, r, c);\n    }\n    return answer;\n  }\n\n  private int distanceToZero(int[][] mat, int sr, int sc) {\n    if (mat[sr][sc] == 0) return 0;\n    boolean[][] seen = new boolean[mat.length][mat[0].length];\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{sr, sc, 0});\n    seen[sr][sc] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (mat[cell[0]][cell[1]] == 0) return cell[2];\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < mat.length && nc >= 0 && nc < mat[0].length && !seen[nr][nc]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[]{nr, nc, cell[2] + 1});\n        }\n      }\n    }\n    return 0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    Queue<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (mat[r][c] == 0) queue.offer(new int[]{r, c});\n        else mat[r][c] = -1;\n      }\n    }\n\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < m && nc >= 0 && nc < n && mat[nr][nc] == -1) {\n          mat[nr][nc] = mat[cell[0]][cell[1]] + 1;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return mat;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    int[][] dist = new int[m][n];\n    for (int[] row : dist) Arrays.fill(row, 1_000_000);\n    for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {\n      if (mat[r][c] == 0) relax(dist, r, c, 0);\n    }\n    return dist;\n  }\n\n  private void relax(int[][] dist, int r, int c, int value) {\n    if (r < 0 || r == dist.length || c < 0 || c == dist[0].length || value >= dist[r][c]) return;\n    dist[r][c] = value;\n    relax(dist, r + 1, c, value + 1);\n    relax(dist, r - 1, c, value + 1);\n    relax(dist, r, c + 1, value + 1);\n    relax(dist, r, c - 1, value + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    Queue<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (mat[r][c] == 0) queue.offer(new int[]{r, c});\n        else mat[r][c] = -1;\n      }\n    }\n\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < m && nc >= 0 && nc < n && mat[nr][nc] == -1) {\n          mat[nr][nc] = mat[cell[0]][cell[1]] + 1;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return mat;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    Queue<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        if (mat[r][c] == 0) queue.offer(new int[]{r, c});\n        else mat[r][c] = -1;\n      }\n    }\n\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int d = 0; d < 4; d++) {\n        int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n        if (nr >= 0 && nr < m && nc >= 0 && nc < n && mat[nr][nc] == -1) {\n          mat[nr][nc] = mat[cell[0]][cell[1]] + 1;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return mat;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Rotting Oranges",
      "difficulty": "Medium",
      "subpattern": "Level-order infection BFS",
      "question": "Given a grid of empty cells, fresh oranges, and rotten oranges, return minutes until all oranges rot or -1 if impossible.",
      "trigger": "Rot spreads simultaneously to adjacent cells each minute, which is exactly level-order BFS from all rotten sources.",
      "intuition": "Start with every rotten orange in the queue and process one BFS layer per minute.",
      "edgeCases": "No fresh oranges, no rotten source, isolated fresh orange, all rotten, multiple rotten sources.",
      "constraints": "1 <= m, n <= 10; grid[i][j] is 0, 1, or 2.",
      "source": {
        "label": "Rotting Oranges - LeetCode 994",
        "url": "https://leetcode.com/problems/rotting-oranges/"
      },
      "examples": [
        {
          "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
          "output": "4",
          "explanation": "Fresh oranges rot level by level."
        },
        {
          "input": "grid = [[2,1,1],[0,1,1],[1,0,1]]",
          "output": "-1",
          "explanation": "One fresh orange is isolated."
        },
        {
          "input": "grid = [[0,2]]",
          "output": "0",
          "explanation": "No fresh oranges exist."
        }
      ],
      "bruteForceComplexity": "Time O(mn * minutes); Space O(mn). Simulate each minute by copying the grid.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Multi-source BFS processes each orange once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). DFS writes the earliest rot time reachable from each source.",
      "bruteForceCode": "class Solution {\n  public int orangesRotting(int[][] grid) {\n    int minutes = 0;\n    while (hasFresh(grid)) {\n      boolean changed = false;\n      int[][] copy = copy(grid);\n      for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) changed |= rot(copy, r + 1, c) | rot(copy, r - 1, c) | rot(copy, r, c + 1) | rot(copy, r, c - 1);\n      }\n      if (!changed) return -1;\n      grid = copy;\n      minutes++;\n    }\n    return minutes;\n  }\n\n  private boolean hasFresh(int[][] grid) {\n    for (int[] row : grid) for (int value : row) if (value == 1) return true;\n    return false;\n  }\n\n  private int[][] copy(int[][] grid) {\n    int[][] copy = new int[grid.length][grid[0].length];\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) copy[r][c] = grid[r][c];\n    return copy;\n  }\n\n  private boolean rot(int[][] grid, int r, int c) {\n    if (r < 0 || r == grid.length || c < 0 || c == grid[0].length || grid[r][c] != 1) return false;\n    grid[r][c] = 2;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] == 2) queue.offer(new int[]{r, c});\n      if (grid[r][c] == 1) fresh++;\n    }\n\n    int minutes = 0;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty() && fresh > 0) {\n      for (int size = queue.size(); size > 0; size--) {\n        int[] cell = queue.poll();\n        for (int d = 0; d < 4; d++) {\n          int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {\n            grid[nr][nc] = 2;\n            fresh--;\n            queue.offer(new int[]{nr, nc});\n          }\n        }\n      }\n      minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int orangesRotting(int[][] grid) {\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] == 2) rot(grid, r, c, 2);\n    }\n    int time = 2;\n    for (int[] row : grid) for (int value : row) {\n      if (value == 1) return -1;\n      time = Math.max(time, value);\n    }\n    return time - 2;\n  }\n\n  private void rot(int[][] grid, int r, int c, int time) {\n    if (r < 0 || r == grid.length || c < 0 || c == grid[0].length) return;\n    if (grid[r][c] != 1 && grid[r][c] < time) return;\n    grid[r][c] = time;\n    rot(grid, r + 1, c, time + 1);\n    rot(grid, r - 1, c, time + 1);\n    rot(grid, r, c + 1, time + 1);\n    rot(grid, r, c - 1, time + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] == 2) queue.offer(new int[]{r, c});\n      if (grid[r][c] == 1) fresh++;\n    }\n\n    int minutes = 0;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty() && fresh > 0) {\n      for (int size = queue.size(); size > 0; size--) {\n        int[] cell = queue.poll();\n        for (int d = 0; d < 4; d++) {\n          int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {\n            grid[nr][nc] = 2;\n            fresh--;\n            queue.offer(new int[]{nr, nc});\n          }\n        }\n      }\n      minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Queue<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] == 2) queue.offer(new int[]{r, c});\n      if (grid[r][c] == 1) fresh++;\n    }\n\n    int minutes = 0;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    while (!queue.isEmpty() && fresh > 0) {\n      for (int size = queue.size(); size > 0; size--) {\n        int[] cell = queue.poll();\n        for (int d = 0; d < 4; d++) {\n          int nr = cell[0] + dr[d], nc = cell[1] + dc[d];\n          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {\n            grid[nr][nc] = 2;\n            fresh--;\n            queue.offer(new int[]{nr, nc});\n          }\n        }\n      }\n      minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Shortest Path in Binary Matrix",
      "difficulty": "Medium",
      "subpattern": "8-direction shortest path BFS",
      "question": "Given an n x n binary grid, return the length of the shortest clear path from top-left to bottom-right moving in 8 directions.",
      "trigger": "All moves have equal cost, so BFS over eight neighbors gives the shortest path length.",
      "intuition": "Reject blocked endpoints, then run BFS levels from (0,0) until reaching (n-1,n-1).",
      "edgeCases": "Start blocked, end blocked, n is 1, diagonal-only path, no path through obstacles.",
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
          "explanation": "BFS finds the shortest clear path."
        },
        {
          "input": "grid = [[1,0],[0,0]]",
          "output": "-1",
          "explanation": "The starting cell is blocked."
        }
      ],
      "bruteForceComplexity": "Time exponential in open cells; Space O(n^2). Explore all simple paths with DFS.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). BFS visits each open cell at most once.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Recursive BFS processes one level per call.",
      "bruteForceCode": "class Solution {\n  private int best;\n  private final int[] dir = {-1, 0, 1};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    best = Integer.MAX_VALUE;\n    dfs(grid, 0, 0, 1);\n    return best == Integer.MAX_VALUE ? -1 : best;\n  }\n\n  private void dfs(int[][] grid, int r, int c, int length) {\n    int n = grid.length;\n    if (r < 0 || r == n || c < 0 || c == n || grid[r][c] == 1 || length >= best) return;\n    if (r == n - 1 && c == n - 1) {\n      best = Math.min(best, length);\n      return;\n    }\n    grid[r][c] = 1;\n    for (int dr : dir) for (int dc : dir) if (dr != 0 || dc != 0) dfs(grid, r + dr, c + dc, length + 1);\n    grid[r][c] = 0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{0, 0});\n    grid[0][0] = 1;\n    int length = 1;\n    int[] dir = {-1, 0, 1};\n\n    while (!queue.isEmpty()) {\n      for (int size = queue.size(); size > 0; size--) {\n        int[] cell = queue.poll();\n        if (cell[0] == n - 1 && cell[1] == n - 1) return length;\n        for (int dr : dir) for (int dc : dir) {\n          int nr = cell[0] + dr, nc = cell[1] + dc;\n          if ((dr != 0 || dc != 0) && nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {\n            grid[nr][nc] = 1;\n            queue.offer(new int[]{nr, nc});\n          }\n        }\n      }\n      length++;\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{0, 0});\n    grid[0][0] = 1;\n    return bfs(grid, queue, 1);\n  }\n\n  private int bfs(int[][] grid, Queue<int[]> queue, int length) {\n    if (queue.isEmpty()) return -1;\n    int n = grid.length;\n    int[] dir = {-1, 0, 1};\n    for (int size = queue.size(); size > 0; size--) {\n      int[] cell = queue.poll();\n      if (cell[0] == n - 1 && cell[1] == n - 1) return length;\n      for (int dr : dir) for (int dc : dir) {\n        int nr = cell[0] + dr, nc = cell[1] + dc;\n        if ((dr != 0 || dc != 0) && nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {\n          grid[nr][nc] = 1;\n          queue.offer(new int[]{nr, nc});\n        }\n      }\n    }\n    return bfs(grid, queue, length + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{0, 0});\n    grid[0][0] = 1;\n    int length = 1;\n    int[] dir = {-1, 0, 1};\n\n    while (!queue.isEmpty()) {\n      for (int size = queue.size(); size > 0; size--) {\n        int[] cell = queue.poll();\n        if (cell[0] == n - 1 && cell[1] == n - 1) return length;\n        for (int dr : dir) for (int dc : dir) {\n          int nr = cell[0] + dr, nc = cell[1] + dc;\n          if ((dr != 0 || dc != 0) && nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {\n            grid[nr][nc] = 1;\n            queue.offer(new int[]{nr, nc});\n          }\n        }\n      }\n      length++;\n    }\n    return -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[]{0, 0});\n    grid[0][0] = 1;\n    int length = 1;\n    int[] dir = {-1, 0, 1};\n\n    while (!queue.isEmpty()) {\n      for (int size = queue.size(); size > 0; size--) {\n        int[] cell = queue.poll();\n        if (cell[0] == n - 1 && cell[1] == n - 1) return length;\n        for (int dr : dir) for (int dc : dir) {\n          int nr = cell[0] + dr, nc = cell[1] + dc;\n          if ((dr != 0 || dc != 0) && nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {\n            grid[nr][nc] = 1;\n            queue.offer(new int[]{nr, nc});\n          }\n        }\n      }\n      length++;\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Toeplitz Matrix",
      "difficulty": "Easy",
      "subpattern": "Diagonal consistency check",
      "question": "Given a matrix, return true if every diagonal from top-left to bottom-right has the same value.",
      "trigger": "Toeplitz validity only requires comparing each cell with its top-left neighbor.",
      "intuition": "Every diagonal is consistent iff matrix[r][c] equals matrix[r-1][c-1] for all r,c beyond the first row/column.",
      "edgeCases": "Single row, single column, mismatch near bottom-right, negative values, rectangular matrix.",
      "constraints": "1 <= m, n <= 20; 0 <= matrix[i][j] <= 99.",
      "source": {
        "label": "Toeplitz Matrix - LeetCode 766",
        "url": "https://leetcode.com/problems/toeplitz-matrix/"
      },
      "examples": [
        {
          "input": "matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]",
          "output": "true",
          "explanation": "Every diagonal repeats the same value."
        },
        {
          "input": "matrix = [[1,2],[2,2]]",
          "output": "false",
          "explanation": "The main diagonal contains 1 and 2."
        },
        {
          "input": "matrix = [[7]]",
          "output": "true",
          "explanation": "A single cell is Toeplitz."
        }
      ],
      "bruteForceComplexity": "Time O(mn * min(m,n)); Space O(1). Check each diagonal from its start.",
      "optimizedComplexity": "Time O(mn); Space O(1). Compare each cell to its top-left neighbor.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive scan checks one cell at a time.",
      "bruteForceCode": "class Solution {\n  public boolean isToeplitzMatrix(int[][] matrix) {\n    for (int c = 0; c < matrix[0].length; c++) if (!check(matrix, 0, c)) return false;\n    for (int r = 1; r < matrix.length; r++) if (!check(matrix, r, 0)) return false;\n    return true;\n  }\n\n  private boolean check(int[][] matrix, int r, int c) {\n    int value = matrix[r][c];\n    while (r < matrix.length && c < matrix[0].length) {\n      if (matrix[r][c] != value) return false;\n      r++;\n      c++;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isToeplitzMatrix(int[][] matrix) {\n    for (int r = 1; r < matrix.length; r++) {\n      for (int c = 1; c < matrix[0].length; c++) {\n        if (matrix[r][c] != matrix[r - 1][c - 1]) return false;\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isToeplitzMatrix(int[][] matrix) {\n    return scan(matrix, 1, 1);\n  }\n\n  private boolean scan(int[][] matrix, int r, int c) {\n    if (r == matrix.length) return true;\n    if (c == matrix[0].length) return scan(matrix, r + 1, 1);\n    if (matrix[r][c] != matrix[r - 1][c - 1]) return false;\n    return scan(matrix, r, c + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isToeplitzMatrix(int[][] matrix) {\n    for (int r = 1; r < matrix.length; r++) {\n      for (int c = 1; c < matrix[0].length; c++) {\n        if (matrix[r][c] != matrix[r - 1][c - 1]) return false;\n      }\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean isToeplitzMatrix(int[][] matrix) {\n    for (int r = 1; r < matrix.length; r++) {\n      for (int c = 1; c < matrix[0].length; c++) {\n        if (matrix[r][c] != matrix[r - 1][c - 1]) return false;\n      }\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Valid Sudoku",
      "difficulty": "Medium",
      "subpattern": "3-mask constraint validation",
      "question": "Given a partially filled 9 x 9 Sudoku board, return true if it is valid under row, column, and 3 x 3 box constraints.",
      "trigger": "Each filled digit must be unique in three independent constraint groups: row, column, and box.",
      "intuition": "Track seen digits for rows, columns, and boxes; a repeated digit in any group invalidates the board.",
      "edgeCases": "Empty cells, repeated digit in row, repeated digit in column, repeated digit in box, board not necessarily solvable.",
      "constraints": "board.length == 9; board[i].length == 9; board[i][j] is digit 1-9 or dot.",
      "source": {
        "label": "Valid Sudoku - LeetCode 36",
        "url": "https://leetcode.com/problems/valid-sudoku/"
      },
      "examples": [
        {
          "input": "board = standard valid partial Sudoku",
          "output": "true",
          "explanation": "No row, column, or box has duplicate digits."
        },
        {
          "input": "board has two 8s in the first column",
          "output": "false",
          "explanation": "Column uniqueness is violated."
        },
        {
          "input": "board is all dots",
          "output": "true",
          "explanation": "No filled digit violates constraints."
        }
      ],
      "bruteForceComplexity": "Time O(81 * 27); Space O(1). For each filled cell, scan its row, column, and box.",
      "optimizedComplexity": "Time O(81); Space O(1). Bit masks track used digits per row, column, and box.",
      "recursiveComplexity": "Time O(81); Space O(81). Recursive scan carries row, column, and box sets.",
      "bruteForceCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] != '.' && !validAt(board, r, c)) return false;\n      }\n    }\n    return true;\n  }\n\n  private boolean validAt(char[][] board, int row, int col) {\n    for (int c = 0; c < 9; c++) if (c != col && board[row][c] == board[row][col]) return false;\n    for (int r = 0; r < 9; r++) if (r != row && board[r][col] == board[row][col]) return false;\n    int br = row / 3 * 3, bc = col / 3 * 3;\n    for (int r = br; r < br + 3; r++) for (int c = bc; c < bc + 3; c++) {\n      if ((r != row || c != col) && board[r][c] == board[row][col]) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    int[] rows = new int[9];\n    int[] cols = new int[9];\n    int[] boxes = new int[9];\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] == '.') continue;\n        int bit = 1 << (board[r][c] - '1');\n        int box = (r / 3) * 3 + c / 3;\n        if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) return false;\n        rows[r] |= bit;\n        cols[c] |= bit;\n        boxes[box] |= bit;\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    return scan(board, 0, new int[9], new int[9], new int[9]);\n  }\n\n  private boolean scan(char[][] board, int index, int[] rows, int[] cols, int[] boxes) {\n    if (index == 81) return true;\n    int r = index / 9, c = index % 9;\n    if (board[r][c] == '.') return scan(board, index + 1, rows, cols, boxes);\n    int bit = 1 << (board[r][c] - '1');\n    int box = (r / 3) * 3 + c / 3;\n    if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) return false;\n    rows[r] |= bit;\n    cols[c] |= bit;\n    boxes[box] |= bit;\n    return scan(board, index + 1, rows, cols, boxes);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    int[] rows = new int[9];\n    int[] cols = new int[9];\n    int[] boxes = new int[9];\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] == '.') continue;\n        int bit = 1 << (board[r][c] - '1');\n        int box = (r / 3) * 3 + c / 3;\n        if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) return false;\n        rows[r] |= bit;\n        cols[c] |= bit;\n        boxes[box] |= bit;\n      }\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean isValidSudoku(char[][] board) {\n    int[] rows = new int[9];\n    int[] cols = new int[9];\n    int[] boxes = new int[9];\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] == '.') continue;\n        int bit = 1 << (board[r][c] - '1');\n        int box = (r / 3) * 3 + c / 3;\n        if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) return false;\n        rows[r] |= bit;\n        cols[c] |= bit;\n        boxes[box] |= bit;\n      }\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sudoku Solver",
      "difficulty": "Hard",
      "subpattern": "Constraint backtracking",
      "question": "Given a 9 x 9 Sudoku board, fill it so every row, column, and 3 x 3 box contains digits 1 through 9 exactly once.",
      "trigger": "Each empty cell has constrained digit choices, and backtracking must undo choices that lead to dead ends.",
      "intuition": "Pick an empty cell, try valid digits, recurse, and restore the cell if the branch fails.",
      "edgeCases": "Already solved board, many empty cells, box constraint conflict, row/column conflict, one remaining empty cell.",
      "constraints": "board.length == 9; board[i].length == 9; board has exactly one valid solution.",
      "source": {
        "label": "Sudoku Solver - LeetCode 37",
        "url": "https://leetcode.com/problems/sudoku-solver/"
      },
      "examples": [
        {
          "input": "board = standard unsolved Sudoku",
          "output": "solved board",
          "explanation": "Backtracking fills every dot with a valid digit."
        },
        {
          "input": "board has one dot in a row",
          "output": "that missing digit is filled",
          "explanation": "Only one candidate satisfies constraints."
        },
        {
          "input": "board already solved",
          "output": "same board",
          "explanation": "No empty cell requires branching."
        }
      ],
      "bruteForceComplexity": "Time O(9^E * 81); Space O(E). Try digits and scan constraints each time.",
      "optimizedComplexity": "Time O(9^E); Space O(E). Bit masks make constraint checks O(1).",
      "recursiveComplexity": "Time O(9^E * 81); Space O(E). Recursive backtracking scans for the next empty cell.",
      "bruteForceCode": "class Solution {\n  public void solveSudoku(char[][] board) {\n    solve(board);\n  }\n\n  private boolean solve(char[][] board) {\n    for (int r = 0; r < 9; r++) {\n      for (int c = 0; c < 9; c++) {\n        if (board[r][c] != '.') continue;\n        for (char digit = '1'; digit <= '9'; digit++) {\n          if (isValid(board, r, c, digit)) {\n            board[r][c] = digit;\n            if (solve(board)) return true;\n            board[r][c] = '.';\n          }\n        }\n        return false;\n      }\n    }\n    return true;\n  }\n\n  private boolean isValid(char[][] board, int row, int col, char digit) {\n    for (int i = 0; i < 9; i++) {\n      if (board[row][i] == digit || board[i][col] == digit) return false;\n      int r = row / 3 * 3 + i / 3, c = col / 3 * 3 + i % 3;\n      if (board[r][c] == digit) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  private int[] rows = new int[9];\n  private int[] cols = new int[9];\n  private int[] boxes = new int[9];\n\n  public void solveSudoku(char[][] board) {\n    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {\n      if (board[r][c] != '.') place(r, c, board[r][c] - '1');\n    }\n    solve(board, 0);\n  }\n\n  private boolean solve(char[][] board, int index) {\n    if (index == 81) return true;\n    int r = index / 9, c = index % 9;\n    if (board[r][c] != '.') return solve(board, index + 1);\n    int box = (r / 3) * 3 + c / 3;\n    for (int digit = 0; digit < 9; digit++) {\n      int bit = 1 << digit;\n      if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) continue;\n      board[r][c] = (char) ('1' + digit);\n      place(r, c, digit);\n      if (solve(board, index + 1)) return true;\n      remove(r, c, digit);\n      board[r][c] = '.';\n    }\n    return false;\n  }\n\n  private void place(int r, int c, int digit) {\n    int bit = 1 << digit, box = (r / 3) * 3 + c / 3;\n    rows[r] |= bit; cols[c] |= bit; boxes[box] |= bit;\n  }\n\n  private void remove(int r, int c, int digit) {\n    int bit = ~(1 << digit), box = (r / 3) * 3 + c / 3;\n    rows[r] &= bit; cols[c] &= bit; boxes[box] &= bit;\n  }\n}",
      "recursiveCode": "class Solution {\n  public void solveSudoku(char[][] board) {\n    backtrack(board, 0, 0);\n  }\n\n  private boolean backtrack(char[][] board, int row, int col) {\n    if (row == 9) return true;\n    int nextRow = col == 8 ? row + 1 : row;\n    int nextCol = col == 8 ? 0 : col + 1;\n    if (board[row][col] != '.') return backtrack(board, nextRow, nextCol);\n    for (char digit = '1'; digit <= '9'; digit++) {\n      if (valid(board, row, col, digit)) {\n        board[row][col] = digit;\n        if (backtrack(board, nextRow, nextCol)) return true;\n        board[row][col] = '.';\n      }\n    }\n    return false;\n  }\n\n  private boolean valid(char[][] board, int row, int col, char digit) {\n    for (int i = 0; i < 9; i++) {\n      if (board[row][i] == digit || board[i][col] == digit) return false;\n      if (board[row / 3 * 3 + i / 3][col / 3 * 3 + i % 3] == digit) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  private int[] rows = new int[9];\n  private int[] cols = new int[9];\n  private int[] boxes = new int[9];\n\n  public void solveSudoku(char[][] board) {\n    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {\n      if (board[r][c] != '.') place(r, c, board[r][c] - '1');\n    }\n    solve(board, 0);\n  }\n\n  private boolean solve(char[][] board, int index) {\n    if (index == 81) return true;\n    int r = index / 9, c = index % 9;\n    if (board[r][c] != '.') return solve(board, index + 1);\n    int box = (r / 3) * 3 + c / 3;\n    for (int digit = 0; digit < 9; digit++) {\n      int bit = 1 << digit;\n      if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) continue;\n      board[r][c] = (char) ('1' + digit);\n      place(r, c, digit);\n      if (solve(board, index + 1)) return true;\n      remove(r, c, digit);\n      board[r][c] = '.';\n    }\n    return false;\n  }\n\n  private void place(int r, int c, int digit) {\n    int bit = 1 << digit, box = (r / 3) * 3 + c / 3;\n    rows[r] |= bit; cols[c] |= bit; boxes[box] |= bit;\n  }\n\n  private void remove(int r, int c, int digit) {\n    int bit = ~(1 << digit), box = (r / 3) * 3 + c / 3;\n    rows[r] &= bit; cols[c] &= bit; boxes[box] &= bit;\n  }\n}",
      "code": "class Solution {\n  private int[] rows = new int[9];\n  private int[] cols = new int[9];\n  private int[] boxes = new int[9];\n\n  public void solveSudoku(char[][] board) {\n    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {\n      if (board[r][c] != '.') place(r, c, board[r][c] - '1');\n    }\n    solve(board, 0);\n  }\n\n  private boolean solve(char[][] board, int index) {\n    if (index == 81) return true;\n    int r = index / 9, c = index % 9;\n    if (board[r][c] != '.') return solve(board, index + 1);\n    int box = (r / 3) * 3 + c / 3;\n    for (int digit = 0; digit < 9; digit++) {\n      int bit = 1 << digit;\n      if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) continue;\n      board[r][c] = (char) ('1' + digit);\n      place(r, c, digit);\n      if (solve(board, index + 1)) return true;\n      remove(r, c, digit);\n      board[r][c] = '.';\n    }\n    return false;\n  }\n\n  private void place(int r, int c, int digit) {\n    int bit = 1 << digit, box = (r / 3) * 3 + c / 3;\n    rows[r] |= bit; cols[c] |= bit; boxes[box] |= bit;\n  }\n\n  private void remove(int r, int c, int digit) {\n    int bit = ~(1 << digit), box = (r / 3) * 3 + c / 3;\n    rows[r] &= bit; cols[c] &= bit; boxes[box] &= bit;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Diagonal Traverse",
      "difficulty": "Medium",
      "subpattern": "Diagonal index traversal",
      "question": "Given an m x n matrix, return all elements in diagonal order alternating up-right and down-left.",
      "trigger": "Cells on the same diagonal share r + c, and the traversal direction flips by diagonal parity.",
      "intuition": "For each diagonal sum, collect valid cells in the required direction.",
      "edgeCases": "Single row, single column, rectangular matrix, odd/even diagonal parity, final diagonal with one cell.",
      "constraints": "1 <= m, n <= 10000 total cells; -100000 <= mat[i][j] <= 100000.",
      "source": {
        "label": "Diagonal Traverse - LeetCode 498",
        "url": "https://leetcode.com/problems/diagonal-traverse/"
      },
      "examples": [
        {
          "input": "mat = [[1,2,3],[4,5,6],[7,8,9]]",
          "output": "[1,2,4,7,5,3,6,8,9]",
          "explanation": "Direction alternates between diagonals."
        },
        {
          "input": "mat = [[1,2],[3,4]]",
          "output": "[1,2,3,4]",
          "explanation": "The middle diagonal is reversed."
        },
        {
          "input": "mat = [[1,2,3]]",
          "output": "[1,2,3]",
          "explanation": "A single row has no vertical movement."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(min(m,n)). Collect each diagonal then reverse when needed.",
      "optimizedComplexity": "Time O(mn); Space O(1) excluding output. Simulate direction and bounce at boundaries.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursively emits one diagonal at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] findDiagonalOrder(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    int[] answer = new int[m * n];\n    int index = 0;\n    for (int sum = 0; sum <= m + n - 2; sum++) {\n      List<Integer> diagonal = new ArrayList<>();\n      for (int r = 0; r < m; r++) {\n        int c = sum - r;\n        if (c >= 0 && c < n) diagonal.add(mat[r][c]);\n      }\n      if (sum % 2 == 0) Collections.reverse(diagonal);\n      for (int value : diagonal) answer[index++] = value;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] findDiagonalOrder(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    int[] answer = new int[m * n];\n    int r = 0, c = 0;\n    for (int i = 0; i < answer.length; i++) {\n      answer[i] = mat[r][c];\n      if ((r + c) % 2 == 0) {\n        if (c == n - 1) r++;\n        else if (r == 0) c++;\n        else { r--; c++; }\n      } else {\n        if (r == m - 1) c++;\n        else if (c == 0) r++;\n        else { r++; c--; }\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] findDiagonalOrder(int[][] mat) {\n    int[] answer = new int[mat.length * mat[0].length];\n    fill(mat, 0, 0, answer, 0);\n    return answer;\n  }\n\n  private int fill(int[][] mat, int sum, int index, int[] answer, int ignored) {\n    if (index == answer.length) return index;\n    if (sum > mat.length + mat[0].length - 2) return index;\n    if (sum % 2 == 0) {\n      for (int r = Math.min(sum, mat.length - 1); r >= 0; r--) {\n        int c = sum - r;\n        if (c >= 0 && c < mat[0].length) answer[index++] = mat[r][c];\n      }\n    } else {\n      for (int c = Math.min(sum, mat[0].length - 1); c >= 0; c--) {\n        int r = sum - c;\n        if (r >= 0 && r < mat.length) answer[index++] = mat[r][c];\n      }\n    }\n    return fill(mat, sum + 1, index, answer, ignored);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] findDiagonalOrder(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    int[] answer = new int[m * n];\n    int r = 0, c = 0;\n    for (int i = 0; i < answer.length; i++) {\n      answer[i] = mat[r][c];\n      if ((r + c) % 2 == 0) {\n        if (c == n - 1) r++;\n        else if (r == 0) c++;\n        else { r--; c++; }\n      } else {\n        if (r == m - 1) c++;\n        else if (c == 0) r++;\n        else { r++; c--; }\n      }\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[] findDiagonalOrder(int[][] mat) {\n    int m = mat.length, n = mat[0].length;\n    int[] answer = new int[m * n];\n    int r = 0, c = 0;\n    for (int i = 0; i < answer.length; i++) {\n      answer[i] = mat[r][c];\n      if ((r + c) % 2 == 0) {\n        if (c == n - 1) r++;\n        else if (r == 0) c++;\n        else { r--; c++; }\n      } else {\n        if (r == m - 1) c++;\n        else if (c == 0) r++;\n        else { r++; c--; }\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Transpose Matrix",
      "difficulty": "Easy",
      "subpattern": "Dimension swap",
      "question": "Given an m x n matrix, return its transpose where rows become columns.",
      "trigger": "Each value moves from coordinate (r, c) to (c, r), swapping matrix dimensions.",
      "intuition": "Allocate n x m output and assign answer[c][r] = matrix[r][c].",
      "edgeCases": "Square matrix, rectangular matrix, one row, one column, negative values.",
      "constraints": "1 <= m, n <= 1000 total cells; -1000000000 <= matrix[i][j] <= 1000000000.",
      "source": {
        "label": "Transpose Matrix - LeetCode 867",
        "url": "https://leetcode.com/problems/transpose-matrix/"
      },
      "examples": [
        {
          "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          "output": "[[1,4,7],[2,5,8],[3,6,9]]",
          "explanation": "Rows become columns."
        },
        {
          "input": "matrix = [[1,2,3],[4,5,6]]",
          "output": "[[1,4],[2,5],[3,6]]",
          "explanation": "Output dimensions are 3 x 2."
        },
        {
          "input": "matrix = [[1]]",
          "output": "[[1]]",
          "explanation": "One cell is unchanged."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(mn). Copy each value to its transposed coordinate.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Direct coordinate mapping is already optimal.",
      "recursiveComplexity": "Time O(mn); Space O(mn) plus call stack. Recursively visits each cell.",
      "bruteForceCode": "class Solution {\n  public int[][] transpose(int[][] matrix) {\n    int m = matrix.length;\n    int n = matrix[0].length;\n    int[][] answer = new int[n][m];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        answer[c][r] = matrix[r][c];\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[][] transpose(int[][] matrix) {\n    int[][] answer = new int[matrix[0].length][matrix.length];\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        answer[c][r] = matrix[r][c];\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[][] transpose(int[][] matrix) {\n    int[][] answer = new int[matrix[0].length][matrix.length];\n    fill(matrix, answer, 0, 0);\n    return answer;\n  }\n\n  private void fill(int[][] matrix, int[][] answer, int r, int c) {\n    if (r == matrix.length) return;\n    answer[c][r] = matrix[r][c];\n    int nr = c + 1 == matrix[0].length ? r + 1 : r;\n    int nc = c + 1 == matrix[0].length ? 0 : c + 1;\n    fill(matrix, answer, nr, nc);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[][] transpose(int[][] matrix) {\n    int[][] answer = new int[matrix[0].length][matrix.length];\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        answer[c][r] = matrix[r][c];\n      }\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[][] transpose(int[][] matrix) {\n    int[][] answer = new int[matrix[0].length][matrix.length];\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        answer[c][r] = matrix[r][c];\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Matrix Block Sum",
      "difficulty": "Medium",
      "subpattern": "2D prefix sum window",
      "question": "Given a matrix and integer k, return a matrix where each cell is the sum of values within k distance in both row and column.",
      "trigger": "Every answer asks for a rectangular range sum, so 2D prefix sums avoid repeated window scanning.",
      "intuition": "Build an exclusive prefix matrix and query each clipped block in O(1).",
      "edgeCases": "k is 0, k larger than dimensions, one row, one column, overlapping blocks.",
      "constraints": "1 <= m, n <= 100; 1 <= mat[i][j] <= 100; 0 <= k <= 100.",
      "source": {
        "label": "Matrix Block Sum - LeetCode 1314",
        "url": "https://leetcode.com/problems/matrix-block-sum/"
      },
      "examples": [
        {
          "input": "mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1",
          "output": "[[12,21,16],[27,45,33],[24,39,28]]",
          "explanation": "Each block is clipped at the matrix boundary."
        },
        {
          "input": "mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2",
          "output": "[[45,45,45],[45,45,45],[45,45,45]]",
          "explanation": "Every block covers the whole matrix."
        },
        {
          "input": "mat = [[5]], k = 0",
          "output": "[[5]]",
          "explanation": "The block is the cell itself."
        }
      ],
      "bruteForceComplexity": "Time O(mn(2k+1)^2); Space O(mn). Sum every block directly.",
      "optimizedComplexity": "Time O(mn); Space O(mn). 2D prefix sums answer each block in O(1).",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursively fills prefix and answer cells.",
      "bruteForceCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int m = mat.length, n = mat[0].length;\n    int[][] answer = new int[m][n];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int sum = 0;\n        for (int i = Math.max(0, r - k); i <= Math.min(m - 1, r + k); i++) {\n          for (int j = Math.max(0, c - k); j <= Math.min(n - 1, c + k); j++) sum += mat[i][j];\n        }\n        answer[r][c] = sum;\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int m = mat.length, n = mat[0].length;\n    int[][] prefix = new int[m + 1][n + 1];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        prefix[r + 1][c + 1] = mat[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n      }\n    }\n\n    int[][] answer = new int[m][n];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int r1 = Math.max(0, r - k), c1 = Math.max(0, c - k);\n        int r2 = Math.min(m - 1, r + k), c2 = Math.min(n - 1, c + k);\n        answer[r][c] = prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int[][] prefix = new int[mat.length + 1][mat[0].length + 1];\n    buildPrefix(mat, prefix, 0, 0);\n    int[][] answer = new int[mat.length][mat[0].length];\n    fillAnswer(prefix, answer, k, 0, 0);\n    return answer;\n  }\n\n  private void buildPrefix(int[][] mat, int[][] prefix, int r, int c) {\n    if (r == mat.length) return;\n    prefix[r + 1][c + 1] = mat[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n    int nr = c + 1 == mat[0].length ? r + 1 : r;\n    int nc = c + 1 == mat[0].length ? 0 : c + 1;\n    buildPrefix(mat, prefix, nr, nc);\n  }\n\n  private void fillAnswer(int[][] prefix, int[][] answer, int k, int r, int c) {\n    if (r == answer.length) return;\n    int r1 = Math.max(0, r - k), c1 = Math.max(0, c - k);\n    int r2 = Math.min(answer.length - 1, r + k), c2 = Math.min(answer[0].length - 1, c + k);\n    answer[r][c] = prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];\n    int nr = c + 1 == answer[0].length ? r + 1 : r;\n    int nc = c + 1 == answer[0].length ? 0 : c + 1;\n    fillAnswer(prefix, answer, k, nr, nc);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int m = mat.length, n = mat[0].length;\n    int[][] prefix = new int[m + 1][n + 1];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        prefix[r + 1][c + 1] = mat[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n      }\n    }\n\n    int[][] answer = new int[m][n];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int r1 = Math.max(0, r - k), c1 = Math.max(0, c - k);\n        int r2 = Math.min(m - 1, r + k), c2 = Math.min(n - 1, c + k);\n        answer[r][c] = prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];\n      }\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[][] matrixBlockSum(int[][] mat, int k) {\n    int m = mat.length, n = mat[0].length;\n    int[][] prefix = new int[m + 1][n + 1];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        prefix[r + 1][c + 1] = mat[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n      }\n    }\n\n    int[][] answer = new int[m][n];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        int r1 = Math.max(0, r - k), c1 = Math.max(0, c - k);\n        int r2 = Math.min(m - 1, r + k), c2 = Math.min(n - 1, c + k);\n        answer[r][c] = prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Range Sum Query 2D Immutable",
      "difficulty": "Medium",
      "subpattern": "Immutable 2D prefix queries",
      "question": "Design a NumMatrix class that returns the sum of any sub-rectangle of an immutable matrix.",
      "trigger": "Many rectangle sum queries on unchanged data should pay preprocessing once and answer each query in O(1).",
      "intuition": "Build an exclusive 2D prefix sum so a rectangle is four prefix lookups.",
      "edgeCases": "Single cell query, whole matrix query, one row, one column, negative values.",
      "constraints": "1 <= m, n <= 200; -100000 <= matrix[i][j] <= 100000; up to 10000 queries.",
      "source": {
        "label": "Range Sum Query 2D Immutable - LeetCode 304",
        "url": "https://leetcode.com/problems/range-sum-query-2d-immutable/"
      },
      "examples": [
        {
          "input": "matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], sumRegion(2,1,4,3)",
          "output": "8",
          "explanation": "The rectangle sum is computed from prefix corners."
        },
        {
          "input": "sumRegion(1,1,2,2)",
          "output": "11",
          "explanation": "Another query reuses the same prefix table."
        },
        {
          "input": "matrix = [[-1]], sumRegion(0,0,0,0)",
          "output": "-1",
          "explanation": "Single-cell query returns the cell."
        }
      ],
      "bruteForceComplexity": "Constructor O(mn); query O(area); Space O(mn). Store matrix and scan each query rectangle.",
      "optimizedComplexity": "Constructor O(mn); query O(1); Space O(mn). Use exclusive 2D prefix sums.",
      "recursiveComplexity": "Constructor O(mn); query O(1); Space O(mn + mn stack). Recursively builds the prefix table.",
      "bruteForceCode": "class NumMatrix {\n  private final int[][] matrix;\n\n  public NumMatrix(int[][] matrix) {\n    this.matrix = matrix;\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    int sum = 0;\n    for (int r = row1; r <= row2; r++) {\n      for (int c = col1; c <= col2; c++) sum += matrix[r][c];\n    }\n    return sum;\n  }\n}",
      "iterativeCode": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    int m = matrix.length, n = matrix[0].length;\n    prefix = new int[m + 1][n + 1];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        prefix[r + 1][c + 1] = matrix[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n      }\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1] - prefix[row1][col2 + 1] - prefix[row2 + 1][col1] + prefix[row1][col1];\n  }\n}",
      "recursiveCode": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    prefix = new int[matrix.length + 1][matrix[0].length + 1];\n    build(matrix, 0, 0);\n  }\n\n  private void build(int[][] matrix, int r, int c) {\n    if (r == matrix.length) return;\n    prefix[r + 1][c + 1] = matrix[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n    int nr = c + 1 == matrix[0].length ? r + 1 : r;\n    int nc = c + 1 == matrix[0].length ? 0 : c + 1;\n    build(matrix, nr, nc);\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1] - prefix[row1][col2 + 1] - prefix[row2 + 1][col1] + prefix[row1][col1];\n  }\n}",
      "optimizedCode": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    int m = matrix.length, n = matrix[0].length;\n    prefix = new int[m + 1][n + 1];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        prefix[r + 1][c + 1] = matrix[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n      }\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1] - prefix[row1][col2 + 1] - prefix[row2 + 1][col1] + prefix[row1][col1];\n  }\n}",
      "code": "class NumMatrix {\n  private final int[][] prefix;\n\n  public NumMatrix(int[][] matrix) {\n    int m = matrix.length, n = matrix[0].length;\n    prefix = new int[m + 1][n + 1];\n    for (int r = 0; r < m; r++) {\n      for (int c = 0; c < n; c++) {\n        prefix[r + 1][c + 1] = matrix[r][c] + prefix[r][c + 1] + prefix[r + 1][c] - prefix[r][c];\n      }\n    }\n  }\n\n  public int sumRegion(int row1, int col1, int row2, int col2) {\n    return prefix[row2 + 1][col2 + 1] - prefix[row1][col2 + 1] - prefix[row2 + 1][col1] + prefix[row1][col1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Path Sum",
      "difficulty": "Medium",
      "subpattern": "Grid DP path cost",
      "question": "Given a grid of non-negative numbers, find a path from top-left to bottom-right with minimum sum moving only right or down.",
      "trigger": "Each cell depends only on the cheapest path into it from top or left.",
      "intuition": "Accumulate minimum path cost row by row, reusing the grid or a DP row.",
      "edgeCases": "Single cell, one row, one column, equal path sums, large values.",
      "constraints": "1 <= m, n <= 200; 0 <= grid[i][j] <= 200.",
      "source": {
        "label": "Minimum Path Sum - LeetCode 64",
        "url": "https://leetcode.com/problems/minimum-path-sum/"
      },
      "examples": [
        {
          "input": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
          "output": "7",
          "explanation": "Path 1 -> 3 -> 1 -> 1 -> 1 has sum 7."
        },
        {
          "input": "grid = [[1,2,3],[4,5,6]]",
          "output": "12",
          "explanation": "The best path is 1 -> 2 -> 3 -> 6."
        },
        {
          "input": "grid = [[5]]",
          "output": "5",
          "explanation": "The only path is the single cell."
        }
      ],
      "bruteForceComplexity": "Time O(2^(m+n)); Space O(m+n). Try every right/down path recursively.",
      "optimizedComplexity": "Time O(mn); Space O(1). Reuse the grid to store best cost to each cell.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion solves each cell once.",
      "bruteForceCode": "class Solution {\n  public int minPathSum(int[][] grid) {\n    return search(grid, 0, 0);\n  }\n\n  private int search(int[][] grid, int r, int c) {\n    if (r == grid.length || c == grid[0].length) return 1_000_000_000;\n    if (r == grid.length - 1 && c == grid[0].length - 1) return grid[r][c];\n    return grid[r][c] + Math.min(search(grid, r + 1, c), search(grid, r, c + 1));\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minPathSum(int[][] grid) {\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (r == 0 && c == 0) continue;\n        int fromTop = r > 0 ? grid[r - 1][c] : 1_000_000_000;\n        int fromLeft = c > 0 ? grid[r][c - 1] : 1_000_000_000;\n        grid[r][c] += Math.min(fromTop, fromLeft);\n      }\n    }\n    return grid[grid.length - 1][grid[0].length - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minPathSum(int[][] grid) {\n    int[][] memo = new int[grid.length][grid[0].length];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(grid, 0, 0, memo);\n  }\n\n  private int dp(int[][] grid, int r, int c, int[][] memo) {\n    if (r == grid.length || c == grid[0].length) return 1_000_000_000;\n    if (r == grid.length - 1 && c == grid[0].length - 1) return grid[r][c];\n    if (memo[r][c] != -1) return memo[r][c];\n    memo[r][c] = grid[r][c] + Math.min(dp(grid, r + 1, c, memo), dp(grid, r, c + 1, memo));\n    return memo[r][c];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minPathSum(int[][] grid) {\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (r == 0 && c == 0) continue;\n        int fromTop = r > 0 ? grid[r - 1][c] : 1_000_000_000;\n        int fromLeft = c > 0 ? grid[r][c - 1] : 1_000_000_000;\n        grid[r][c] += Math.min(fromTop, fromLeft);\n      }\n    }\n    return grid[grid.length - 1][grid[0].length - 1];\n  }\n}",
      "code": "class Solution {\n  public int minPathSum(int[][] grid) {\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (r == 0 && c == 0) continue;\n        int fromTop = r > 0 ? grid[r - 1][c] : 1_000_000_000;\n        int fromLeft = c > 0 ? grid[r][c - 1] : 1_000_000_000;\n        grid[r][c] += Math.min(fromTop, fromLeft);\n      }\n    }\n    return grid[grid.length - 1][grid[0].length - 1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Unique Paths II",
      "difficulty": "Medium",
      "subpattern": "Obstacle-aware path DP",
      "question": "Given a grid with obstacles, count unique paths from top-left to bottom-right moving only right or down.",
      "trigger": "Each open cell accumulates paths from top and left, while obstacle cells reset the count to zero.",
      "intuition": "Use DP where obstacle cells become 0 and open cells sum reachable paths.",
      "edgeCases": "Start blocked, end blocked, one row, one column, obstacle cuts all paths.",
      "constraints": "1 <= m, n <= 100; obstacleGrid[i][j] is 0 or 1.",
      "source": {
        "label": "Unique Paths II - LeetCode 63",
        "url": "https://leetcode.com/problems/unique-paths-ii/"
      },
      "examples": [
        {
          "input": "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]",
          "output": "2",
          "explanation": "Two paths go around the center obstacle."
        },
        {
          "input": "obstacleGrid = [[0,1],[0,0]]",
          "output": "1",
          "explanation": "Only the down-right path is valid."
        },
        {
          "input": "obstacleGrid = [[1]]",
          "output": "0",
          "explanation": "The start is blocked."
        }
      ],
      "bruteForceComplexity": "Time O(2^(m+n)); Space O(m+n). Try every right/down path recursively.",
      "optimizedComplexity": "Time O(mn); Space O(n). One DP row accumulates path counts.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion counts paths from each cell.",
      "bruteForceCode": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    return count(obstacleGrid, 0, 0);\n  }\n\n  private int count(int[][] grid, int r, int c) {\n    if (r == grid.length || c == grid[0].length || grid[r][c] == 1) return 0;\n    if (r == grid.length - 1 && c == grid[0].length - 1) return 1;\n    return count(grid, r + 1, c) + count(grid, r, c + 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int[] dp = new int[obstacleGrid[0].length];\n    dp[0] = obstacleGrid[0][0] == 1 ? 0 : 1;\n    for (int r = 0; r < obstacleGrid.length; r++) {\n      for (int c = 0; c < obstacleGrid[0].length; c++) {\n        if (obstacleGrid[r][c] == 1) dp[c] = 0;\n        else if (c > 0) dp[c] += dp[c - 1];\n      }\n    }\n    return dp[dp.length - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int[][] memo = new int[obstacleGrid.length][obstacleGrid[0].length];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(obstacleGrid, 0, 0, memo);\n  }\n\n  private int dp(int[][] grid, int r, int c, int[][] memo) {\n    if (r == grid.length || c == grid[0].length || grid[r][c] == 1) return 0;\n    if (r == grid.length - 1 && c == grid[0].length - 1) return 1;\n    if (memo[r][c] != -1) return memo[r][c];\n    memo[r][c] = dp(grid, r + 1, c, memo) + dp(grid, r, c + 1, memo);\n    return memo[r][c];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int[] dp = new int[obstacleGrid[0].length];\n    dp[0] = obstacleGrid[0][0] == 1 ? 0 : 1;\n    for (int r = 0; r < obstacleGrid.length; r++) {\n      for (int c = 0; c < obstacleGrid[0].length; c++) {\n        if (obstacleGrid[r][c] == 1) dp[c] = 0;\n        else if (c > 0) dp[c] += dp[c - 1];\n      }\n    }\n    return dp[dp.length - 1];\n  }\n}",
      "code": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int[] dp = new int[obstacleGrid[0].length];\n    dp[0] = obstacleGrid[0][0] == 1 ? 0 : 1;\n    for (int r = 0; r < obstacleGrid.length; r++) {\n      for (int c = 0; c < obstacleGrid[0].length; c++) {\n        if (obstacleGrid[r][c] == 1) dp[c] = 0;\n        else if (c > 0) dp[c] += dp[c - 1];\n      }\n    }\n    return dp[dp.length - 1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Longest Increasing Path in a Matrix",
      "difficulty": "Hard",
      "subpattern": "Memoized increasing paths",
      "question": "Given an integer matrix, return the length of the longest strictly increasing path moving in four directions.",
      "trigger": "From any cell, valid moves only go to larger values, forming a DAG over cells.",
      "intuition": "DFS from each cell and memoize the longest path starting there.",
      "edgeCases": "Single cell, all equal values, strictly increasing row, multiple local peaks, negative values.",
      "constraints": "1 <= m, n <= 200; -2^31 <= matrix[i][j] <= 2^31 - 1.",
      "source": {
        "label": "Longest Increasing Path in a Matrix - LeetCode 329",
        "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"
      },
      "examples": [
        {
          "input": "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
          "output": "4",
          "explanation": "One longest path is 1 -> 2 -> 6 -> 9."
        },
        {
          "input": "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
          "output": "4",
          "explanation": "Path 3 -> 4 -> 5 -> 6 has length 4."
        },
        {
          "input": "matrix = [[1]]",
          "output": "1",
          "explanation": "A single cell has path length 1."
        }
      ],
      "bruteForceComplexity": "Time exponential in path length; Space O(mn). DFS explores paths repeatedly without memoization.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Memoized DFS solves each cell once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive memoized search over larger neighbors.",
      "bruteForceCode": "class Solution {\n  public int longestIncreasingPath(int[][] matrix) {\n    int best = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) best = Math.max(best, dfs(matrix, r, c, Integer.MIN_VALUE));\n    }\n    return best;\n  }\n\n  private int dfs(int[][] matrix, int r, int c, int prev) {\n    if (r < 0 || r == matrix.length || c < 0 || c == matrix[0].length || matrix[r][c] <= prev) return 0;\n    int value = matrix[r][c];\n    int best = dfs(matrix, r + 1, c, value);\n    best = Math.max(best, dfs(matrix, r - 1, c, value));\n    best = Math.max(best, dfs(matrix, r, c + 1, value));\n    best = Math.max(best, dfs(matrix, r, c - 1, value));\n    return 1 + best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int longestIncreasingPath(int[][] matrix) {\n    int[][] memo = new int[matrix.length][matrix[0].length];\n    int best = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) best = Math.max(best, dfs(matrix, r, c, memo));\n    }\n    return best;\n  }\n\n  private int dfs(int[][] matrix, int r, int c, int[][] memo) {\n    if (memo[r][c] != 0) return memo[r][c];\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    int best = 1;\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length && matrix[nr][nc] > matrix[r][c]) {\n        best = Math.max(best, 1 + dfs(matrix, nr, nc, memo));\n      }\n    }\n    memo[r][c] = best;\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int longestIncreasingPath(int[][] matrix) {\n    int[][] memo = new int[matrix.length][matrix[0].length];\n    return scan(matrix, memo, 0, 0, 0);\n  }\n\n  private int scan(int[][] matrix, int[][] memo, int r, int c, int best) {\n    if (r == matrix.length) return best;\n    best = Math.max(best, path(matrix, memo, r, c));\n    int nr = c + 1 == matrix[0].length ? r + 1 : r;\n    int nc = c + 1 == matrix[0].length ? 0 : c + 1;\n    return scan(matrix, memo, nr, nc, best);\n  }\n\n  private int path(int[][] matrix, int[][] memo, int r, int c) {\n    if (memo[r][c] != 0) return memo[r][c];\n    int best = 1;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length && matrix[nr][nc] > matrix[r][c]) best = Math.max(best, 1 + path(matrix, memo, nr, nc));\n    }\n    return memo[r][c] = best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int longestIncreasingPath(int[][] matrix) {\n    int[][] memo = new int[matrix.length][matrix[0].length];\n    int best = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) best = Math.max(best, dfs(matrix, r, c, memo));\n    }\n    return best;\n  }\n\n  private int dfs(int[][] matrix, int r, int c, int[][] memo) {\n    if (memo[r][c] != 0) return memo[r][c];\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    int best = 1;\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length && matrix[nr][nc] > matrix[r][c]) {\n        best = Math.max(best, 1 + dfs(matrix, nr, nc, memo));\n      }\n    }\n    memo[r][c] = best;\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int longestIncreasingPath(int[][] matrix) {\n    int[][] memo = new int[matrix.length][matrix[0].length];\n    int best = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) best = Math.max(best, dfs(matrix, r, c, memo));\n    }\n    return best;\n  }\n\n  private int dfs(int[][] matrix, int r, int c, int[][] memo) {\n    if (memo[r][c] != 0) return memo[r][c];\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    int best = 1;\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length && matrix[nr][nc] > matrix[r][c]) {\n        best = Math.max(best, 1 + dfs(matrix, nr, nc, memo));\n      }\n    }\n    memo[r][c] = best;\n    return best;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximal Square",
      "difficulty": "Medium",
      "subpattern": "Square DP side length",
      "question": "Given a binary matrix of characters, return the area of the largest square containing only 1s.",
      "trigger": "A square ending at a cell depends on the minimum square side from top, left, and top-left neighbors.",
      "intuition": "DP side length at 1-cell is 1 + min(top, left, diagonal); track the largest side.",
      "edgeCases": "All zeros, all ones, single row, single column, largest square not at bottom-right.",
      "constraints": "1 <= m, n <= 300; matrix[i][j] is 0 or 1.",
      "source": {
        "label": "Maximal Square - LeetCode 221",
        "url": "https://leetcode.com/problems/maximal-square/"
      },
      "examples": [
        {
          "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
          "output": "4",
          "explanation": "The largest square has side 2."
        },
        {
          "input": "matrix = [[\"0\",\"1\"],[\"1\",\"0\"]]",
          "output": "1",
          "explanation": "Only 1x1 squares exist."
        },
        {
          "input": "matrix = [[\"0\"]]",
          "output": "0",
          "explanation": "No square of ones exists."
        }
      ],
      "bruteForceComplexity": "Time O(mn * min(m,n)^2); Space O(1). Try every square size from every top-left cell.",
      "optimizedComplexity": "Time O(mn); Space O(n). Rolling DP stores square side lengths.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion computes side length from down, right, and diagonal.",
      "bruteForceCode": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int best = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        for (int side = 1; r + side <= matrix.length && c + side <= matrix[0].length; side++) {\n          if (allOnes(matrix, r, c, side)) best = Math.max(best, side * side);\n        }\n      }\n    }\n    return best;\n  }\n\n  private boolean allOnes(char[][] matrix, int row, int col, int side) {\n    for (int r = row; r < row + side; r++) for (int c = col; c < col + side; c++) if (matrix[r][c] == '0') return false;\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int[] dp = new int[matrix[0].length + 1];\n    int best = 0;\n    for (int r = 1; r <= matrix.length; r++) {\n      int diagonal = 0;\n      for (int c = 1; c <= matrix[0].length; c++) {\n        int saved = dp[c];\n        if (matrix[r - 1][c - 1] == '1') {\n          dp[c] = 1 + Math.min(Math.min(dp[c], dp[c - 1]), diagonal);\n          best = Math.max(best, dp[c]);\n        } else {\n          dp[c] = 0;\n        }\n        diagonal = saved;\n      }\n    }\n    return best * best;\n  }\n}",
      "recursiveCode": "class Solution {\n  private int best;\n\n  public int maximalSquare(char[][] matrix) {\n    int[][] memo = new int[matrix.length][matrix[0].length];\n    best = 0;\n    for (int r = 0; r < matrix.length; r++) for (int c = 0; c < matrix[0].length; c++) side(matrix, r, c, memo);\n    return best * best;\n  }\n\n  private int side(char[][] matrix, int r, int c, int[][] memo) {\n    if (r == matrix.length || c == matrix[0].length || matrix[r][c] == '0') return 0;\n    if (memo[r][c] != 0) return memo[r][c];\n    int value = 1 + Math.min(side(matrix, r + 1, c, memo), Math.min(side(matrix, r, c + 1, memo), side(matrix, r + 1, c + 1, memo)));\n    best = Math.max(best, value);\n    return memo[r][c] = value;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int[] dp = new int[matrix[0].length + 1];\n    int best = 0;\n    for (int r = 1; r <= matrix.length; r++) {\n      int diagonal = 0;\n      for (int c = 1; c <= matrix[0].length; c++) {\n        int saved = dp[c];\n        if (matrix[r - 1][c - 1] == '1') {\n          dp[c] = 1 + Math.min(Math.min(dp[c], dp[c - 1]), diagonal);\n          best = Math.max(best, dp[c]);\n        } else {\n          dp[c] = 0;\n        }\n        diagonal = saved;\n      }\n    }\n    return best * best;\n  }\n}",
      "code": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int[] dp = new int[matrix[0].length + 1];\n    int best = 0;\n    for (int r = 1; r <= matrix.length; r++) {\n      int diagonal = 0;\n      for (int c = 1; c <= matrix[0].length; c++) {\n        int saved = dp[c];\n        if (matrix[r - 1][c - 1] == '1') {\n          dp[c] = 1 + Math.min(Math.min(dp[c], dp[c - 1]), diagonal);\n          best = Math.max(best, dp[c]);\n        } else {\n          dp[c] = 0;\n        }\n        diagonal = saved;\n      }\n    }\n    return best * best;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count Square Submatrices with All Ones",
      "difficulty": "Medium",
      "subpattern": "Square DP counting",
      "question": "Given a binary matrix, count all square submatrices that contain only ones.",
      "trigger": "The number of all-ones squares ending at a cell equals the largest valid side ending there.",
      "intuition": "Use the same square DP side length formula and add every side length to the answer.",
      "edgeCases": "All zeros, all ones, one row, one column, mixed small squares.",
      "constraints": "1 <= m, n <= 300; matrix[i][j] is 0 or 1.",
      "source": {
        "label": "Count Square Submatrices with All Ones - LeetCode 1277",
        "url": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/"
      },
      "examples": [
        {
          "input": "matrix = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]",
          "output": "15",
          "explanation": "Count 1x1, 2x2, and 3x3 all-ones squares."
        },
        {
          "input": "matrix = [[1,0,1],[1,1,0],[1,1,0]]",
          "output": "7",
          "explanation": "Six 1x1 squares and one 2x2 square."
        },
        {
          "input": "matrix = [[0]]",
          "output": "0",
          "explanation": "No all-ones square exists."
        }
      ],
      "bruteForceComplexity": "Time O(mn * min(m,n)^2); Space O(1). Try every square from every top-left cell.",
      "optimizedComplexity": "Time O(mn); Space O(1). Reuse matrix as DP side lengths.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion sums square sides from each cell.",
      "bruteForceCode": "class Solution {\n  public int countSquares(int[][] matrix) {\n    int answer = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        for (int side = 1; r + side <= matrix.length && c + side <= matrix[0].length; side++) {\n          if (allOnes(matrix, r, c, side)) answer++;\n          else break;\n        }\n      }\n    }\n    return answer;\n  }\n\n  private boolean allOnes(int[][] matrix, int row, int col, int side) {\n    for (int r = row; r < row + side; r++) for (int c = col; c < col + side; c++) if (matrix[r][c] == 0) return false;\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int countSquares(int[][] matrix) {\n    int answer = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        if (matrix[r][c] == 1 && r > 0 && c > 0) {\n          matrix[r][c] = 1 + Math.min(matrix[r - 1][c], Math.min(matrix[r][c - 1], matrix[r - 1][c - 1]));\n        }\n        answer += matrix[r][c];\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countSquares(int[][] matrix) {\n    int[][] memo = new int[matrix.length][matrix[0].length];\n    int answer = 0;\n    for (int r = 0; r < matrix.length; r++) for (int c = 0; c < matrix[0].length; c++) answer += side(matrix, r, c, memo);\n    return answer;\n  }\n\n  private int side(int[][] matrix, int r, int c, int[][] memo) {\n    if (r == matrix.length || c == matrix[0].length || matrix[r][c] == 0) return 0;\n    if (memo[r][c] != 0) return memo[r][c];\n    memo[r][c] = 1 + Math.min(side(matrix, r + 1, c, memo), Math.min(side(matrix, r, c + 1, memo), side(matrix, r + 1, c + 1, memo)));\n    return memo[r][c];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countSquares(int[][] matrix) {\n    int answer = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        if (matrix[r][c] == 1 && r > 0 && c > 0) {\n          matrix[r][c] = 1 + Math.min(matrix[r - 1][c], Math.min(matrix[r][c - 1], matrix[r - 1][c - 1]));\n        }\n        answer += matrix[r][c];\n      }\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int countSquares(int[][] matrix) {\n    int answer = 0;\n    for (int r = 0; r < matrix.length; r++) {\n      for (int c = 0; c < matrix[0].length; c++) {\n        if (matrix[r][c] == 1 && r > 0 && c > 0) {\n          matrix[r][c] = 1 + Math.min(matrix[r - 1][c], Math.min(matrix[r][c - 1], matrix[r - 1][c - 1]));\n        }\n        answer += matrix[r][c];\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Falling Path Sum",
      "difficulty": "Medium",
      "subpattern": "Rolling row path DP",
      "question": "Given an n x n matrix, return the minimum falling path sum from any top-row cell to any bottom-row cell moving down, down-left, or down-right.",
      "trigger": "Each row depends only on the previous row at three neighboring columns.",
      "intuition": "Carry one DP row of minimum costs and update it row by row.",
      "edgeCases": "n is 1, negative values, best path starts in middle, boundary columns, multiple equal paths.",
      "constraints": "1 <= n <= 100; -100 <= matrix[i][j] <= 100.",
      "source": {
        "label": "Minimum Falling Path Sum - LeetCode 931",
        "url": "https://leetcode.com/problems/minimum-falling-path-sum/"
      },
      "examples": [
        {
          "input": "matrix = [[2,1,3],[6,5,4],[7,8,9]]",
          "output": "13",
          "explanation": "Path 1 -> 4 -> 8 has sum 13."
        },
        {
          "input": "matrix = [[-19,57],[-40,-5]]",
          "output": "-59",
          "explanation": "Path -19 -> -40 is minimum."
        },
        {
          "input": "matrix = [[5]]",
          "output": "5",
          "explanation": "Only one falling path exists."
        }
      ],
      "bruteForceComplexity": "Time O(3^n * n); Space O(n). Try every falling path recursively.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Rolling DP keeps only the previous row.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoized recursion from each top cell.",
      "bruteForceCode": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int best = Integer.MAX_VALUE;\n    for (int c = 0; c < matrix.length; c++) best = Math.min(best, search(matrix, 0, c));\n    return best;\n  }\n\n  private int search(int[][] matrix, int r, int c) {\n    if (c < 0 || c == matrix.length) return 1_000_000_000;\n    if (r == matrix.length - 1) return matrix[r][c];\n    int next = Math.min(search(matrix, r + 1, c - 1), Math.min(search(matrix, r + 1, c), search(matrix, r + 1, c + 1)));\n    return matrix[r][c] + next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int n = matrix.length;\n    int[] dp = matrix[0].clone();\n    for (int r = 1; r < n; r++) {\n      int[] next = new int[n];\n      for (int c = 0; c < n; c++) {\n        int best = dp[c];\n        if (c > 0) best = Math.min(best, dp[c - 1]);\n        if (c + 1 < n) best = Math.min(best, dp[c + 1]);\n        next[c] = matrix[r][c] + best;\n      }\n      dp = next;\n    }\n    int answer = Integer.MAX_VALUE;\n    for (int value : dp) answer = Math.min(answer, value);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int[][] memo = new int[matrix.length][matrix.length];\n    for (int[] row : memo) Arrays.fill(row, Integer.MAX_VALUE);\n    int best = Integer.MAX_VALUE;\n    for (int c = 0; c < matrix.length; c++) best = Math.min(best, dp(matrix, 0, c, memo));\n    return best;\n  }\n\n  private int dp(int[][] matrix, int r, int c, int[][] memo) {\n    if (c < 0 || c == matrix.length) return 1_000_000_000;\n    if (r == matrix.length - 1) return matrix[r][c];\n    if (memo[r][c] != Integer.MAX_VALUE) return memo[r][c];\n    int next = Math.min(dp(matrix, r + 1, c - 1, memo), Math.min(dp(matrix, r + 1, c, memo), dp(matrix, r + 1, c + 1, memo)));\n    return memo[r][c] = matrix[r][c] + next;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int n = matrix.length;\n    int[] dp = matrix[0].clone();\n    for (int r = 1; r < n; r++) {\n      int[] next = new int[n];\n      for (int c = 0; c < n; c++) {\n        int best = dp[c];\n        if (c > 0) best = Math.min(best, dp[c - 1]);\n        if (c + 1 < n) best = Math.min(best, dp[c + 1]);\n        next[c] = matrix[r][c] + best;\n      }\n      dp = next;\n    }\n    int answer = Integer.MAX_VALUE;\n    for (int value : dp) answer = Math.min(answer, value);\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int n = matrix.length;\n    int[] dp = matrix[0].clone();\n    for (int r = 1; r < n; r++) {\n      int[] next = new int[n];\n      for (int c = 0; c < n; c++) {\n        int best = dp[c];\n        if (c > 0) best = Math.min(best, dp[c - 1]);\n        if (c + 1 < n) best = Math.min(best, dp[c + 1]);\n        next[c] = matrix[r][c] + best;\n      }\n      dp = next;\n    }\n    int answer = Integer.MAX_VALUE;\n    for (int value : dp) answer = Math.min(answer, value);\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Detect Cycles in 2D Grid",
      "difficulty": "Medium",
      "subpattern": "Parent-aware cycle DFS",
      "question": "Given a grid of characters, return true if there is a cycle of length at least four using adjacent cells with the same character.",
      "trigger": "Cycle detection in an undirected grid graph must avoid treating the immediate parent edge as a cycle.",
      "intuition": "DFS same-character neighbors while passing the parent cell; reaching an already visited non-parent cell means cycle.",
      "edgeCases": "2x2 same characters, no cycle line, mixed characters, revisiting parent, disconnected components.",
      "constraints": "1 <= m, n <= 500; grid[i][j] is a lowercase English letter.",
      "source": {
        "label": "Detect Cycles in 2D Grid - LeetCode 1559",
        "url": "https://leetcode.com/problems/detect-cycles-in-2d-grid/"
      },
      "examples": [
        {
          "input": "grid = [[\"a\",\"a\",\"a\",\"a\"],[\"a\",\"b\",\"b\",\"a\"],[\"a\",\"b\",\"b\",\"a\"],[\"a\",\"a\",\"a\",\"a\"]]",
          "output": "true",
          "explanation": "The outer ring of a cells forms a cycle."
        },
        {
          "input": "grid = [[\"c\",\"c\",\"c\",\"a\"],[\"c\",\"d\",\"c\",\"c\"],[\"c\",\"c\",\"e\",\"c\"],[\"f\",\"c\",\"c\",\"c\"]]",
          "output": "true",
          "explanation": "A cycle exists among c cells."
        },
        {
          "input": "grid = [[\"a\",\"b\",\"b\"],[\"b\",\"z\",\"b\"],[\"b\",\"b\",\"a\"]]",
          "output": "false",
          "explanation": "No same-character cycle exists."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Start a fresh DFS from each cell with path tracking.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Parent-aware DFS visits each cell once per component.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive DFS detects visited non-parent neighbors.",
      "bruteForceCode": "class Solution {\n  public boolean containsCycle(char[][] grid) {\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (search(grid, r, c, r, c, -1, -1, new boolean[grid.length][grid[0].length], 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean search(char[][] grid, int r, int c, int sr, int sc, int pr, int pc, boolean[][] seen, int depth) {\n    if (r < 0 || r == grid.length || c < 0 || c == grid[0].length || grid[r][c] != grid[sr][sc]) return false;\n    if (seen[r][c]) return depth >= 4 && r == sr && c == sc;\n    seen[r][c] = true;\n    boolean found = false;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr == pr && nc == pc) continue;\n      found |= search(grid, nr, nc, sr, sc, r, c, seen, depth + 1);\n    }\n    seen[r][c] = false;\n    return found;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean containsCycle(char[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (!seen[r][c] && dfs(grid, r, c, -1, -1, seen)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean dfs(char[][] grid, int r, int c, int pr, int pc, boolean[][] seen) {\n    seen[r][c] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr < 0 || nr == grid.length || nc < 0 || nc == grid[0].length || grid[nr][nc] != grid[r][c]) continue;\n      if (nr == pr && nc == pc) continue;\n      if (seen[nr][nc] || dfs(grid, nr, nc, r, c, seen)) return true;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean containsCycle(char[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    return scan(grid, seen, 0, 0);\n  }\n\n  private boolean scan(char[][] grid, boolean[][] seen, int r, int c) {\n    if (r == grid.length) return false;\n    if (!seen[r][c] && dfs(grid, seen, r, c, -1, -1)) return true;\n    int nr = c + 1 == grid[0].length ? r + 1 : r;\n    int nc = c + 1 == grid[0].length ? 0 : c + 1;\n    return scan(grid, seen, nr, nc);\n  }\n\n  private boolean dfs(char[][] grid, boolean[][] seen, int r, int c, int pr, int pc) {\n    seen[r][c] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr < 0 || nr == grid.length || nc < 0 || nc == grid[0].length || grid[nr][nc] != grid[r][c]) continue;\n      if (nr == pr && nc == pc) continue;\n      if (seen[nr][nc] || dfs(grid, seen, nr, nc, r, c)) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean containsCycle(char[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (!seen[r][c] && dfs(grid, r, c, -1, -1, seen)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean dfs(char[][] grid, int r, int c, int pr, int pc, boolean[][] seen) {\n    seen[r][c] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr < 0 || nr == grid.length || nc < 0 || nc == grid[0].length || grid[nr][nc] != grid[r][c]) continue;\n      if (nr == pr && nc == pc) continue;\n      if (seen[nr][nc] || dfs(grid, nr, nc, r, c, seen)) return true;\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean containsCycle(char[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (!seen[r][c] && dfs(grid, r, c, -1, -1, seen)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean dfs(char[][] grid, int r, int c, int pr, int pc, boolean[][] seen) {\n    seen[r][c] = true;\n    int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n    for (int d = 0; d < 4; d++) {\n      int nr = r + dr[d], nc = c + dc[d];\n      if (nr < 0 || nr == grid.length || nc < 0 || nc == grid[0].length || grid[nr][nc] != grid[r][c]) continue;\n      if (nr == pr && nc == pc) continue;\n      if (seen[nr][nc] || dfs(grid, nr, nc, r, c, seen)) return true;\n    }\n    return false;\n  }\n}"
    }
  ],
  "checklist": [
    "If each cell depends on neighbors, decide whether DFS/BFS, DP, or boundary traversal is the primary shape.",
    "Look for row/column side effects: markers or prefix sums often avoid repeated scans.",
    "For reachability, ask whether starting from every cell can be reversed into multi-source boundary BFS/DFS.",
    "For shortest distance in an unweighted grid, use BFS levels from one or many sources.",
    "For grid DP, identify which neighboring states feed the current cell and whether rolling rows are enough."
  ],
  "traps": [
    "Mutating cells before all original-state decisions are read.",
    "Treating diagonal adjacency as valid when the problem allows only four directions.",
    "Forgetting single-row or single-column boundary cases in spiral traversal and rotation.",
    "Running DFS from every cell when reverse multi-source BFS solves the same reachability once.",
    "Not passing the parent cell in undirected cycle detection.",
    "Using row count where column count is needed in rectangular matrices.",
    "Missing prefix-sum exclusive indexing offsets by one row and one column."
  ],
  "edgeCases": [
    "1 x 1 matrices and single row or single column matrices.",
    "All zeros, all ones, all water, all land, or all same character grids.",
    "Boundary cells that should not be flipped or captured.",
    "Rectangular matrices where m != n.",
    "Starting or ending cell blocked in path problems.",
    "Repeated values or equal heights where strict vs non-strict movement matters.",
    "In-place algorithms where marker values must not be confused with original values."
  ],
  "complexities": [
    "Plain matrix scans cost O(mn) time and usually O(1) extra space.",
    "DFS/BFS connected-component problems cost O(mn) time and O(mn) worst-case stack or queue space.",
    "Multi-source BFS distance problems cost O(mn) because each cell is enqueued at most once.",
    "2D prefix sums cost O(mn) preprocessing and O(1) per rectangle query.",
    "Grid DP is usually O(mn), often reducible from O(mn) space to O(n) rolling space.",
    "Backtracking word/Sudoku searches are exponential in empty cells or word length, but pruning controls practical runtime.",
    "Spiral and diagonal traversals are O(mn) and should write or read each cell exactly once."
  ],
  "mentalModel": [
    "A matrix problem is usually a graph, a table of DP states, or a coordinate transformation.",
    "Decide first whether movement is four-direction, eight-direction, diagonal, row-column, or bounded by layers.",
    "When many cells ask the same range or distance question, preprocess once from sources or prefix sums.",
    "When mutating in place, encode old and new state so one pass does not corrupt another.",
    "For rectangular grids, always name m and n separately and validate every boundary check."
  ],
  "revisionStrategy": [
    "Day 1: redo the 12 core problems and say the traversal direction before coding.",
    "Day 3: redo Set Matrix Zeroes, Game of Life, Surrounded Regions, Pacific Atlantic, and 01 Matrix.",
    "Day 7: solve one problem from each bucket: boundary traversal, flood fill, multi-source BFS, prefix sum, and grid DP.",
    "Day 14: time-box Word Search, Sudoku Solver, Longest Increasing Path, and Detect Cycles.",
    "Before interviews: implement neighbor loops, boundary checks, 2D prefix query, and BFS level counting from memory."
  ],
  "unseen": [
    "Given a grid of arrows, find the minimum changes needed so at least one valid path reaches the bottom-right cell.",
    "Given a matrix of heights, count cells that can reach at least two different boundary sides.",
    "Given a binary grid, return the largest plus sign made only of ones.",
    "Given many rectangle update operations, return the final matrix after all operations.",
    "Given a colored grid, determine whether removing one connected component can disconnect the remaining cells."
  ]
};
