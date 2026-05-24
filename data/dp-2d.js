const CURRENT_PATTERN = {
  "id": "dp-2d",
  "name": "2D Dynamic Programming",
  "summary": "Grid paths, string-pair DP, interval DP, knapsack tables, matrix states, and multi-agent transitions.",
  "complete": true,
  "subpatterns": [
    "Grid path counting DP",
    "Grid path counting DP with blocked cells",
    "Grid path minimization DP",
    "Triangle bottom-up DP",
    "Falling path DP",
    "Two-string subsequence DP",
    "Two-string reconstruction DP",
    "Edit-distance operation DP",
    "Pattern matching DP with wildcards",
    "Distinct subsequence counting DP",
    "Interleaving string grid DP",
    "Palindrome interval DP",
    "2D knapsack capacity DP",
    "2D knapsack signed-sum DP",
    "2D knapsack with two capacities",
    "2D knapsack partition DP",
    "2D knapsack with capped profit",
    "Counting DP with bounded transitions",
    "Matrix DFS with memoization",
    "Square-ending matrix DP",
    "Dungeon reverse grid DP",
    "Interval partition DP",
    "Multi-agent grid DP",
    "Interval game DP",
    "Pattern matching DP with star quantifier",
    "Pattern matching DP with wildcard star"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Unique Paths",
      "difficulty": "Medium",
      "subpattern": "Grid path counting DP",
      "question": "Given an m x n grid, a robot starts at the top-left and can move only right or down. Return the number of paths to the bottom-right.",
      "trigger": "The number of ways to reach a cell is the sum of ways from the cell above and the cell to the left.",
      "intuition": "Every path into a cell must arrive from exactly one of two previous cells.",
      "edgeCases": "Single row, single column, 1 x 1 grid, large dimensions, first row and first column base cases.",
      "constraints": "1 <= m, n <= 100; answer is at most 2 * 10^9.",
      "source": {
        "label": "Unique Paths - LeetCode 62",
        "url": "https://leetcode.com/problems/unique-paths/"
      },
      "examples": [
        {
          "input": "m = 3, n = 7",
          "output": "28",
          "explanation": "There are 28 right/down paths."
        },
        {
          "input": "m = 3, n = 2",
          "output": "3",
          "explanation": "The paths are DDR, DRD, and RDD in move notation."
        },
        {
          "input": "m = 1, n = 5",
          "output": "1",
          "explanation": "Only right moves are possible."
        }
      ],
      "bruteForceComplexity": "Time O(2^(m+n)); Space O(m+n). Plain recursion branches right and down from each cell.",
      "optimizedComplexity": "Time O(mn); Space O(n). 1D row DP updates path counts left to right.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion computes each cell once.",
      "bruteForceCode": "class Solution {\n  public int uniquePaths(int m, int n) {\n    return walk(0, 0, m, n);\n  }\n\n  private int walk(int row, int col, int rows, int cols) {\n    if (row == rows - 1 && col == cols - 1) return 1;\n    if (row == rows || col == cols) return 0;\n\n    int down = walk(row + 1, col, rows, cols);\n    int right = walk(row, col + 1, rows, cols);\n    return down + right;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int uniquePaths(int m, int n) {\n    int[] dp = new int[n];\n    for (int col = 0; col < n; col++) dp[col] = 1;\n\n    for (int row = 1; row < m; row++) {\n      for (int col = 1; col < n; col++) {\n        dp[col] += dp[col - 1];\n      }\n    }\n    return dp[n - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePaths(int m, int n) {\n    int[][] memo = new int[m][n];\n    return ways(0, 0, m, n, memo);\n  }\n\n  private int ways(int row, int col, int rows, int cols, int[][] memo) {\n    if (row == rows - 1 && col == cols - 1) return 1;\n    if (row == rows || col == cols) return 0;\n    if (memo[row][col] != 0) return memo[row][col];\n    memo[row][col] = ways(row + 1, col, rows, cols, memo) + ways(row, col + 1, rows, cols, memo);\n    return memo[row][col];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int uniquePaths(int m, int n) {\n    int[] dp = new int[n];\n    for (int col = 0; col < n; col++) dp[col] = 1;\n\n    for (int row = 1; row < m; row++) {\n      for (int col = 1; col < n; col++) {\n        dp[col] += dp[col - 1];\n      }\n    }\n    return dp[n - 1];\n  }\n}",
      "code": "class Solution {\n  public int uniquePaths(int m, int n) {\n    int[] dp = new int[n];\n    for (int col = 0; col < n; col++) dp[col] = 1;\n\n    for (int row = 1; row < m; row++) {\n      for (int col = 1; col < n; col++) {\n        dp[col] += dp[col - 1];\n      }\n    }\n    return dp[n - 1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Unique Paths II",
      "difficulty": "Medium",
      "subpattern": "Grid path counting DP with blocked cells",
      "question": "Given an m x n grid where 1 marks an obstacle and 0 marks open space, return the number of right/down paths from top-left to bottom-right.",
      "trigger": "The standard grid path recurrence still applies, but obstacle cells contribute zero ways.",
      "intuition": "When a cell is blocked, reset its path count to zero; otherwise add paths from up and left.",
      "edgeCases": "Blocked start, blocked finish, single row with obstacle, single column, fully open grid, blocked first row.",
      "constraints": "1 <= m, n <= 100; obstacleGrid[i][j] is 0 or 1.",
      "source": {
        "label": "Unique Paths II - LeetCode 63",
        "url": "https://leetcode.com/problems/unique-paths-ii/"
      },
      "examples": [
        {
          "input": "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]",
          "output": "2",
          "explanation": "Two paths go around the obstacle."
        },
        {
          "input": "obstacleGrid = [[0,1],[0,0]]",
          "output": "1",
          "explanation": "Only the down-right path is open."
        },
        {
          "input": "obstacleGrid = [[1]]",
          "output": "0",
          "explanation": "The start cell is blocked."
        }
      ],
      "bruteForceComplexity": "Time O(2^(m+n)); Space O(m+n). Plain recursion explores right/down paths and stops at obstacles.",
      "optimizedComplexity": "Time O(mn); Space O(n). A 1D row DP resets blocked cells to zero.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion stores path counts per cell.",
      "bruteForceCode": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    return walk(obstacleGrid, 0, 0);\n  }\n\n  private int walk(int[][] grid, int row, int col) {\n    if (row == grid.length || col == grid[0].length) return 0;\n    if (grid[row][col] == 1) return 0;\n    if (row == grid.length - 1 && col == grid[0].length - 1) return 1;\n\n    int down = walk(grid, row + 1, col);\n    int right = walk(grid, row, col + 1);\n    return down + right;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int rows = obstacleGrid.length;\n    int cols = obstacleGrid[0].length;\n    int[] dp = new int[cols];\n    dp[0] = obstacleGrid[0][0] == 1 ? 0 : 1;\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        if (obstacleGrid[row][col] == 1) {\n          dp[col] = 0;\n        } else if (col > 0) {\n          dp[col] += dp[col - 1];\n        }\n      }\n    }\n    return dp[cols - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int[][] memo = new int[obstacleGrid.length][obstacleGrid[0].length];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return ways(obstacleGrid, 0, 0, memo);\n  }\n\n  private int ways(int[][] grid, int row, int col, int[][] memo) {\n    if (row == grid.length || col == grid[0].length || grid[row][col] == 1) return 0;\n    if (row == grid.length - 1 && col == grid[0].length - 1) return 1;\n    if (memo[row][col] != -1) return memo[row][col];\n    memo[row][col] = ways(grid, row + 1, col, memo) + ways(grid, row, col + 1, memo);\n    return memo[row][col];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int rows = obstacleGrid.length;\n    int cols = obstacleGrid[0].length;\n    int[] dp = new int[cols];\n    dp[0] = obstacleGrid[0][0] == 1 ? 0 : 1;\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        if (obstacleGrid[row][col] == 1) {\n          dp[col] = 0;\n        } else if (col > 0) {\n          dp[col] += dp[col - 1];\n        }\n      }\n    }\n    return dp[cols - 1];\n  }\n}",
      "code": "class Solution {\n  public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n    int rows = obstacleGrid.length;\n    int cols = obstacleGrid[0].length;\n    int[] dp = new int[cols];\n    dp[0] = obstacleGrid[0][0] == 1 ? 0 : 1;\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        if (obstacleGrid[row][col] == 1) {\n          dp[col] = 0;\n        } else if (col > 0) {\n          dp[col] += dp[col - 1];\n        }\n      }\n    }\n    return dp[cols - 1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Path Sum",
      "difficulty": "Medium",
      "subpattern": "Grid path minimization DP",
      "question": "Given a grid of non-negative numbers, return the minimum sum path from top-left to bottom-right moving only right or down.",
      "trigger": "The cheapest path to a cell is its value plus the cheaper path from above or left.",
      "intuition": "Accumulate the best known cost into each cell or a rolling row array.",
      "edgeCases": "Single cell, single row, single column, zeros, large values, first row and column initialization.",
      "constraints": "1 <= m, n <= 200; 0 <= grid[i][j] <= 200.",
      "source": {
        "label": "Minimum Path Sum - LeetCode 64",
        "url": "https://leetcode.com/problems/minimum-path-sum/"
      },
      "examples": [
        {
          "input": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
          "output": "7",
          "explanation": "The path 1 -> 3 -> 1 -> 1 -> 1 has sum 7."
        },
        {
          "input": "grid = [[1,2,3],[4,5,6]]",
          "output": "12",
          "explanation": "The minimum path is 1 -> 2 -> 3 -> 6."
        },
        {
          "input": "grid = [[5]]",
          "output": "5",
          "explanation": "Only one cell is used."
        }
      ],
      "bruteForceComplexity": "Time O(2^(m+n)); Space O(m+n). Plain recursion tries all right/down paths.",
      "optimizedComplexity": "Time O(mn); Space O(n). Rolling row DP keeps minimum cost for each column.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion stores minimum suffix cost per cell.",
      "bruteForceCode": "class Solution {\n  public int minPathSum(int[][] grid) {\n    return path(grid, 0, 0);\n  }\n\n  private int path(int[][] grid, int row, int col) {\n    if (row == grid.length || col == grid[0].length) return 1_000_000_000;\n    if (row == grid.length - 1 && col == grid[0].length - 1) return grid[row][col];\n\n    int down = path(grid, row + 1, col);\n    int right = path(grid, row, col + 1);\n    return grid[row][col] + Math.min(down, right);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minPathSum(int[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    int[] dp = new int[cols];\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        if (row == 0 && col == 0) {\n          dp[col] = grid[row][col];\n        } else if (row == 0) {\n          dp[col] = dp[col - 1] + grid[row][col];\n        } else if (col == 0) {\n          dp[col] += grid[row][col];\n        } else {\n          dp[col] = Math.min(dp[col], dp[col - 1]) + grid[row][col];\n        }\n      }\n    }\n    return dp[cols - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minPathSum(int[][] grid) {\n    int[][] memo = new int[grid.length][grid[0].length];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(grid, 0, 0, memo);\n  }\n\n  private int dp(int[][] grid, int row, int col, int[][] memo) {\n    if (row == grid.length || col == grid[0].length) return 1_000_000_000;\n    if (row == grid.length - 1 && col == grid[0].length - 1) return grid[row][col];\n    if (memo[row][col] != -1) return memo[row][col];\n    memo[row][col] = grid[row][col] + Math.min(dp(grid, row + 1, col, memo), dp(grid, row, col + 1, memo));\n    return memo[row][col];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minPathSum(int[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    int[] dp = new int[cols];\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        if (row == 0 && col == 0) {\n          dp[col] = grid[row][col];\n        } else if (row == 0) {\n          dp[col] = dp[col - 1] + grid[row][col];\n        } else if (col == 0) {\n          dp[col] += grid[row][col];\n        } else {\n          dp[col] = Math.min(dp[col], dp[col - 1]) + grid[row][col];\n        }\n      }\n    }\n    return dp[cols - 1];\n  }\n}",
      "code": "class Solution {\n  public int minPathSum(int[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    int[] dp = new int[cols];\n\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        if (row == 0 && col == 0) {\n          dp[col] = grid[row][col];\n        } else if (row == 0) {\n          dp[col] = dp[col - 1] + grid[row][col];\n        } else if (col == 0) {\n          dp[col] += grid[row][col];\n        } else {\n          dp[col] = Math.min(dp[col], dp[col - 1]) + grid[row][col];\n        }\n      }\n    }\n    return dp[cols - 1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Triangle",
      "difficulty": "Medium",
      "subpattern": "Triangle bottom-up DP",
      "question": "Given a triangle array, return the minimum path sum from top to bottom by moving to adjacent numbers on the next row.",
      "trigger": "Each position depends on two adjacent positions directly below it.",
      "intuition": "Start from the bottom row and collapse upward by adding the smaller of the two child costs.",
      "edgeCases": "One row, negative numbers, unequal row lengths by design, best path at far edge, all equal values.",
      "constraints": "1 <= triangle.length <= 200; triangle[i].length == i + 1; -10000 <= values <= 10000.",
      "source": {
        "label": "Triangle - LeetCode 120",
        "url": "https://leetcode.com/problems/triangle/"
      },
      "examples": [
        {
          "input": "triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]",
          "output": "11",
          "explanation": "The path 2 -> 3 -> 5 -> 1 has sum 11."
        },
        {
          "input": "triangle = [[-10]]",
          "output": "-10",
          "explanation": "Only one value exists."
        },
        {
          "input": "triangle = [[1],[2,3]]",
          "output": "3",
          "explanation": "Choose 1 -> 2."
        }
      ],
      "bruteForceComplexity": "Time O(2^rows); Space O(rows). Plain recursion branches to two children.",
      "optimizedComplexity": "Time O(rows^2); Space O(rows). Bottom-up DP keeps one row of costs.",
      "recursiveComplexity": "Time O(rows^2); Space O(rows^2). Memoized recursion stores each triangle position.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minimumTotal(List<List<Integer>> triangle) {\n    return path(triangle, 0, 0);\n  }\n\n  private int path(List<List<Integer>> triangle, int row, int col) {\n    if (row == triangle.size() - 1) return triangle.get(row).get(col);\n    int down = path(triangle, row + 1, col);\n    int diagonal = path(triangle, row + 1, col + 1);\n    return triangle.get(row).get(col) + Math.min(down, diagonal);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumTotal(List<List<Integer>> triangle) {\n    int rows = triangle.size();\n    int[] dp = new int[rows + 1];\n\n    for (int row = rows - 1; row >= 0; row--) {\n      for (int col = 0; col < triangle.get(row).size(); col++) {\n        dp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col + 1]);\n      }\n    }\n    return dp[0];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumTotal(List<List<Integer>> triangle) {\n    Integer[][] memo = new Integer[triangle.size()][triangle.size()];\n    return dp(triangle, 0, 0, memo);\n  }\n\n  private int dp(List<List<Integer>> triangle, int row, int col, Integer[][] memo) {\n    if (row == triangle.size() - 1) return triangle.get(row).get(col);\n    if (memo[row][col] != null) return memo[row][col];\n    int down = dp(triangle, row + 1, col, memo);\n    int diagonal = dp(triangle, row + 1, col + 1, memo);\n    memo[row][col] = triangle.get(row).get(col) + Math.min(down, diagonal);\n    return memo[row][col];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumTotal(List<List<Integer>> triangle) {\n    int rows = triangle.size();\n    int[] dp = new int[rows + 1];\n\n    for (int row = rows - 1; row >= 0; row--) {\n      for (int col = 0; col < triangle.get(row).size(); col++) {\n        dp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col + 1]);\n      }\n    }\n    return dp[0];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumTotal(List<List<Integer>> triangle) {\n    int rows = triangle.size();\n    int[] dp = new int[rows + 1];\n\n    for (int row = rows - 1; row >= 0; row--) {\n      for (int col = 0; col < triangle.get(row).size(); col++) {\n        dp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col + 1]);\n      }\n    }\n    return dp[0];\n  }\n}"
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
      "constraints": "1 <= text1.length, text2.length <= 1000; strings contain lowercase English letters.",
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
      "iterativeCode": "class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[] dp = new int[text2.length() + 1];\n\n    for (int i = 1; i <= text1.length(); i++) {\n      int diagonal = 0;\n      for (int j = 1; j <= text2.length(); j++) {\n        int saved = dp[j];\n        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n          dp[j] = diagonal + 1;\n        } else {\n          dp[j] = Math.max(dp[j], dp[j - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[text2.length()];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[][] memo = new int[text1.length()][text2.length()];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(text1, text2, 0, 0, memo);\n  }\n\n  private int dp(String a, String b, int i, int j, int[][] memo) {\n    if (i == a.length() || j == b.length()) return 0;\n    if (memo[i][j] != -1) return memo[i][j];\n    if (a.charAt(i) == b.charAt(j)) memo[i][j] = 1 + dp(a, b, i + 1, j + 1, memo);\n    else memo[i][j] = Math.max(dp(a, b, i + 1, j, memo), dp(a, b, i, j + 1, memo));\n    return memo[i][j];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[] dp = new int[text2.length() + 1];\n\n    for (int i = 1; i <= text1.length(); i++) {\n      int diagonal = 0;\n      for (int j = 1; j <= text2.length(); j++) {\n        int saved = dp[j];\n        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n          dp[j] = diagonal + 1;\n        } else {\n          dp[j] = Math.max(dp[j], dp[j - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[text2.length()];\n  }\n}",
      "code": "class Solution {\n  public int longestCommonSubsequence(String text1, String text2) {\n    int[] dp = new int[text2.length() + 1];\n\n    for (int i = 1; i <= text1.length(); i++) {\n      int diagonal = 0;\n      for (int j = 1; j <= text2.length(); j++) {\n        int saved = dp[j];\n        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n          dp[j] = diagonal + 1;\n        } else {\n          dp[j] = Math.max(dp[j], dp[j - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[text2.length()];\n  }\n}"
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
      "constraints": "0 <= word1.length, word2.length <= 500; words contain lowercase English letters.",
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
      "iterativeCode": "class Solution {\n  public int minDistance(String word1, String word2) {\n    int m = word1.length();\n    int n = word2.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j <= n; j++) dp[j] = j;\n\n    for (int i = 1; i <= m; i++) {\n      int diagonal = dp[0];\n      dp[0] = i;\n      for (int j = 1; j <= n; j++) {\n        int saved = dp[j];\n        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n          dp[j] = diagonal;\n        } else {\n          dp[j] = 1 + Math.min(diagonal, Math.min(dp[j], dp[j - 1]));\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minDistance(String word1, String word2) {\n    int[][] memo = new int[word1.length()][word2.length()];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(word1, word2, 0, 0, memo);\n  }\n\n  private int dp(String a, String b, int i, int j, int[][] memo) {\n    if (i == a.length()) return b.length() - j;\n    if (j == b.length()) return a.length() - i;\n    if (memo[i][j] != -1) return memo[i][j];\n    if (a.charAt(i) == b.charAt(j)) memo[i][j] = dp(a, b, i + 1, j + 1, memo);\n    else memo[i][j] = 1 + Math.min(dp(a, b, i, j + 1, memo), Math.min(dp(a, b, i + 1, j, memo), dp(a, b, i + 1, j + 1, memo)));\n    return memo[i][j];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minDistance(String word1, String word2) {\n    int m = word1.length();\n    int n = word2.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j <= n; j++) dp[j] = j;\n\n    for (int i = 1; i <= m; i++) {\n      int diagonal = dp[0];\n      dp[0] = i;\n      for (int j = 1; j <= n; j++) {\n        int saved = dp[j];\n        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n          dp[j] = diagonal;\n        } else {\n          dp[j] = 1 + Math.min(diagonal, Math.min(dp[j], dp[j - 1]));\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}",
      "code": "class Solution {\n  public int minDistance(String word1, String word2) {\n    int m = word1.length();\n    int n = word2.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j <= n; j++) dp[j] = j;\n\n    for (int i = 1; i <= m; i++) {\n      int diagonal = dp[0];\n      dp[0] = i;\n      for (int j = 1; j <= n; j++) {\n        int saved = dp[j];\n        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n          dp[j] = diagonal;\n        } else {\n          dp[j] = 1 + Math.min(diagonal, Math.min(dp[j], dp[j - 1]));\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Regular Expression Matching",
      "difficulty": "Hard",
      "subpattern": "Pattern matching DP with star quantifier",
      "question": "Given string s and pattern p containing . and *, return whether p matches the entire string. Dot matches any single character and star repeats the previous element zero or more times.",
      "trigger": "Matching state depends on both string index and pattern index, especially when * can skip or consume characters.",
      "intuition": "When the next pattern character is *, either skip the x* group or consume one matching character and stay on the same pattern.",
      "edgeCases": "Empty string, pattern like a*, dot star, star matching zero characters, full-string match required.",
      "constraints": "1 <= s.length <= 20; 1 <= p.length <= 20; pattern is valid and uses lowercase letters, dot, and star.",
      "source": {
        "label": "Regular Expression Matching - LeetCode 10",
        "url": "https://leetcode.com/problems/regular-expression-matching/"
      },
      "examples": [
        {
          "input": "s = \"aa\", p = \"a\"",
          "output": "false",
          "explanation": "The pattern covers only one a."
        },
        {
          "input": "s = \"aa\", p = \"a*\"",
          "output": "true",
          "explanation": "a* can repeat a twice."
        },
        {
          "input": "s = \"ab\", p = \".*\"",
          "output": "true",
          "explanation": ".* can match any full string."
        }
      ],
      "bruteForceComplexity": "Time exponential in pattern length; Space O(m+n). Plain recursion branches on star skip or consume.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Bottom-up DP fills string-pattern states.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion stores each pair of indexes.",
      "bruteForceCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    return match(s, p, 0, 0);\n  }\n\n  private boolean match(String s, String p, int i, int j) {\n    if (j == p.length()) return i == s.length();\n    boolean first = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n\n    if (j + 1 < p.length() && p.charAt(j + 1) == '*') {\n      return match(s, p, i, j + 2) || first && match(s, p, i + 1, j);\n    }\n    return first && match(s, p, i + 1, j + 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length();\n    int n = p.length();\n    boolean[][] dp = new boolean[m + 1][n + 1];\n    dp[m][n] = true;\n\n    for (int i = m; i >= 0; i--) {\n      for (int j = n - 1; j >= 0; j--) {\n        boolean first = i < m && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n        if (j + 1 < n && p.charAt(j + 1) == '*') {\n          dp[i][j] = dp[i][j + 2] || first && dp[i + 1][j];\n        } else {\n          dp[i][j] = first && dp[i + 1][j + 1];\n        }\n      }\n    }\n    return dp[0][0];\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    Boolean[][] memo = new Boolean[s.length() + 1][p.length() + 1];\n    return dp(s, p, 0, 0, memo);\n  }\n\n  private boolean dp(String s, String p, int i, int j, Boolean[][] memo) {\n    if (j == p.length()) return i == s.length();\n    if (memo[i][j] != null) return memo[i][j];\n    boolean first = i < s.length() && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n    boolean answer;\n    if (j + 1 < p.length() && p.charAt(j + 1) == '*') {\n      answer = dp(s, p, i, j + 2, memo) || first && dp(s, p, i + 1, j, memo);\n    } else {\n      answer = first && dp(s, p, i + 1, j + 1, memo);\n    }\n    memo[i][j] = answer;\n    return answer;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length();\n    int n = p.length();\n    boolean[][] dp = new boolean[m + 1][n + 1];\n    dp[m][n] = true;\n\n    for (int i = m; i >= 0; i--) {\n      for (int j = n - 1; j >= 0; j--) {\n        boolean first = i < m && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n        if (j + 1 < n && p.charAt(j + 1) == '*') {\n          dp[i][j] = dp[i][j + 2] || first && dp[i + 1][j];\n        } else {\n          dp[i][j] = first && dp[i + 1][j + 1];\n        }\n      }\n    }\n    return dp[0][0];\n  }\n}",
      "code": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length();\n    int n = p.length();\n    boolean[][] dp = new boolean[m + 1][n + 1];\n    dp[m][n] = true;\n\n    for (int i = m; i >= 0; i--) {\n      for (int j = n - 1; j >= 0; j--) {\n        boolean first = i < m && (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');\n        if (j + 1 < n && p.charAt(j + 1) == '*') {\n          dp[i][j] = dp[i][j + 2] || first && dp[i + 1][j];\n        } else {\n          dp[i][j] = first && dp[i + 1][j + 1];\n        }\n      }\n    }\n    return dp[0][0];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Wildcard Matching",
      "difficulty": "Hard",
      "subpattern": "Pattern matching DP with wildcard star",
      "question": "Given string s and pattern p containing ? and *, return whether p matches the entire string. ? matches one character and * matches any sequence including empty.",
      "trigger": "A star can either match no characters or consume one character while staying on the star state.",
      "intuition": "dp[i][j] means s suffix i matches pattern suffix j; star transitions to dp[i][j+1] or dp[i+1][j].",
      "edgeCases": "Empty string, all-star pattern, pattern without star, multiple consecutive stars, full-string match required.",
      "constraints": "0 <= s.length, p.length <= 2000; p contains lowercase letters, ? and *.",
      "source": {
        "label": "Wildcard Matching - LeetCode 44",
        "url": "https://leetcode.com/problems/wildcard-matching/"
      },
      "examples": [
        {
          "input": "s = \"aa\", p = \"a\"",
          "output": "false",
          "explanation": "The pattern does not cover the full string."
        },
        {
          "input": "s = \"aa\", p = \"*\"",
          "output": "true",
          "explanation": "* can match both characters."
        },
        {
          "input": "s = \"cb\", p = \"?a\"",
          "output": "false",
          "explanation": "? matches c but a does not match b."
        }
      ],
      "bruteForceComplexity": "Time exponential in m+n; Space O(m+n). Plain recursion branches on star skip or consume.",
      "optimizedComplexity": "Time O(mn); Space O(n). Rolling pattern DP can match every string-pattern state.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion stores each pair of indexes.",
      "bruteForceCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    return match(s, p, 0, 0);\n  }\n\n  private boolean match(String s, String p, int i, int j) {\n    if (j == p.length()) return i == s.length();\n    if (p.charAt(j) == '*') {\n      return match(s, p, i, j + 1) || i < s.length() && match(s, p, i + 1, j);\n    }\n    boolean first = i < s.length() && (p.charAt(j) == '?' || p.charAt(j) == s.charAt(i));\n    return first && match(s, p, i + 1, j + 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length();\n    int n = p.length();\n    boolean[] dp = new boolean[n + 1];\n    dp[0] = true;\n\n    for (int j = 1; j <= n; j++) {\n      dp[j] = dp[j - 1] && p.charAt(j - 1) == '*';\n    }\n\n    for (int i = 1; i <= m; i++) {\n      boolean diagonal = dp[0];\n      dp[0] = false;\n      for (int j = 1; j <= n; j++) {\n        boolean saved = dp[j];\n        char ch = p.charAt(j - 1);\n        if (ch == '*') dp[j] = dp[j] || dp[j - 1];\n        else dp[j] = diagonal && (ch == '?' || ch == s.charAt(i - 1));\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    Boolean[][] memo = new Boolean[s.length() + 1][p.length() + 1];\n    return dp(s, p, 0, 0, memo);\n  }\n\n  private boolean dp(String s, String p, int i, int j, Boolean[][] memo) {\n    if (j == p.length()) return i == s.length();\n    if (memo[i][j] != null) return memo[i][j];\n    boolean answer;\n    if (p.charAt(j) == '*') {\n      answer = dp(s, p, i, j + 1, memo) || i < s.length() && dp(s, p, i + 1, j, memo);\n    } else {\n      boolean first = i < s.length() && (p.charAt(j) == '?' || p.charAt(j) == s.charAt(i));\n      answer = first && dp(s, p, i + 1, j + 1, memo);\n    }\n    memo[i][j] = answer;\n    return answer;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length();\n    int n = p.length();\n    boolean[] dp = new boolean[n + 1];\n    dp[0] = true;\n\n    for (int j = 1; j <= n; j++) {\n      dp[j] = dp[j - 1] && p.charAt(j - 1) == '*';\n    }\n\n    for (int i = 1; i <= m; i++) {\n      boolean diagonal = dp[0];\n      dp[0] = false;\n      for (int j = 1; j <= n; j++) {\n        boolean saved = dp[j];\n        char ch = p.charAt(j - 1);\n        if (ch == '*') dp[j] = dp[j] || dp[j - 1];\n        else dp[j] = diagonal && (ch == '?' || ch == s.charAt(i - 1));\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}",
      "code": "class Solution {\n  public boolean isMatch(String s, String p) {\n    int m = s.length();\n    int n = p.length();\n    boolean[] dp = new boolean[n + 1];\n    dp[0] = true;\n\n    for (int j = 1; j <= n; j++) {\n      dp[j] = dp[j - 1] && p.charAt(j - 1) == '*';\n    }\n\n    for (int i = 1; i <= m; i++) {\n      boolean diagonal = dp[0];\n      dp[0] = false;\n      for (int j = 1; j <= n; j++) {\n        boolean saved = dp[j];\n        char ch = p.charAt(j - 1);\n        if (ch == '*') dp[j] = dp[j] || dp[j - 1];\n        else dp[j] = diagonal && (ch == '?' || ch == s.charAt(i - 1));\n        diagonal = saved;\n      }\n    }\n    return dp[n];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Distinct Subsequences",
      "difficulty": "Hard",
      "subpattern": "Distinct subsequence counting DP",
      "question": "Given strings s and t, return the number of distinct subsequences of s equal to t.",
      "trigger": "For each pair of positions, if characters match, you can either use this s character for t or skip it.",
      "intuition": "dp[j] counts ways to form t prefix j; update j backward for each character in s.",
      "edgeCases": "t longer than s, empty t, repeated characters, no match, answer fits 32-bit signed integer.",
      "constraints": "1 <= s.length, t.length <= 1000; strings contain English letters.",
      "source": {
        "label": "Distinct Subsequences - LeetCode 115",
        "url": "https://leetcode.com/problems/distinct-subsequences/"
      },
      "examples": [
        {
          "input": "s = \"rabbbit\", t = \"rabbit\"",
          "output": "3",
          "explanation": "There are three ways to delete one b."
        },
        {
          "input": "s = \"babgbag\", t = \"bag\"",
          "output": "5",
          "explanation": "Five subsequences spell bag."
        },
        {
          "input": "s = \"abc\", t = \"abcd\"",
          "output": "0",
          "explanation": "t is longer than s."
        }
      ],
      "bruteForceComplexity": "Time O(2^m); Space O(m). Plain recursion uses or skips each character in s.",
      "optimizedComplexity": "Time O(mn); Space O(n). 1D DP updates target positions backward.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion stores source and target indexes.",
      "bruteForceCode": "class Solution {\n  public int numDistinct(String s, String t) {\n    return count(s, t, 0, 0);\n  }\n\n  private int count(String s, String t, int i, int j) {\n    if (j == t.length()) return 1;\n    if (i == s.length()) return 0;\n    int ways = count(s, t, i + 1, j);\n    if (s.charAt(i) == t.charAt(j)) ways += count(s, t, i + 1, j + 1);\n    return ways;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numDistinct(String s, String t) {\n    long[] dp = new long[t.length() + 1];\n    dp[0] = 1;\n\n    for (int i = 0; i < s.length(); i++) {\n      for (int j = t.length() - 1; j >= 0; j--) {\n        if (s.charAt(i) == t.charAt(j)) {\n          dp[j + 1] += dp[j];\n        }\n      }\n    }\n    return (int) dp[t.length()];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numDistinct(String s, String t) {\n    int[][] memo = new int[s.length()][t.length()];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(s, t, 0, 0, memo);\n  }\n\n  private int dp(String s, String t, int i, int j, int[][] memo) {\n    if (j == t.length()) return 1;\n    if (i == s.length()) return 0;\n    if (memo[i][j] != -1) return memo[i][j];\n    int ways = dp(s, t, i + 1, j, memo);\n    if (s.charAt(i) == t.charAt(j)) ways += dp(s, t, i + 1, j + 1, memo);\n    memo[i][j] = ways;\n    return ways;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numDistinct(String s, String t) {\n    long[] dp = new long[t.length() + 1];\n    dp[0] = 1;\n\n    for (int i = 0; i < s.length(); i++) {\n      for (int j = t.length() - 1; j >= 0; j--) {\n        if (s.charAt(i) == t.charAt(j)) {\n          dp[j + 1] += dp[j];\n        }\n      }\n    }\n    return (int) dp[t.length()];\n  }\n}",
      "code": "class Solution {\n  public int numDistinct(String s, String t) {\n    long[] dp = new long[t.length() + 1];\n    dp[0] = 1;\n\n    for (int i = 0; i < s.length(); i++) {\n      for (int j = t.length() - 1; j >= 0; j--) {\n        if (s.charAt(i) == t.charAt(j)) {\n          dp[j + 1] += dp[j];\n        }\n      }\n    }\n    return (int) dp[t.length()];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Interleaving String",
      "difficulty": "Medium",
      "subpattern": "Interleaving string grid DP",
      "question": "Given s1, s2, and s3, return true if s3 is formed by interleaving s1 and s2 while preserving the order of characters from each string.",
      "trigger": "The state is how many characters have been consumed from s1 and s2; that determines the next index in s3.",
      "intuition": "At dp[i][j], consume from s1 or s2 if its next character equals s3[i+j].",
      "edgeCases": "Length mismatch, one empty string, repeated characters creating multiple paths, exact concatenation, no valid path.",
      "constraints": "0 <= s1.length, s2.length <= 100; 0 <= s3.length <= 200; strings contain lowercase letters.",
      "source": {
        "label": "Interleaving String - LeetCode 97",
        "url": "https://leetcode.com/problems/interleaving-string/"
      },
      "examples": [
        {
          "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
          "output": "true",
          "explanation": "s3 can be formed while preserving both orders."
        },
        {
          "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"",
          "output": "false",
          "explanation": "No valid interleaving matches all characters."
        },
        {
          "input": "s1 = \"\", s2 = \"\", s3 = \"\"",
          "output": "true",
          "explanation": "All strings are empty."
        }
      ],
      "bruteForceComplexity": "Time O(2^(m+n)); Space O(m+n). Plain recursion branches by consuming from either string.",
      "optimizedComplexity": "Time O(mn); Space O(n). Rolling DP tracks feasible counts from s2 for each s1 prefix.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Memoized recursion solves each pair of consumed lengths once.",
      "bruteForceCode": "class Solution {\n  public boolean isInterleave(String s1, String s2, String s3) {\n    if (s1.length() + s2.length() != s3.length()) return false;\n    return search(s1, s2, s3, 0, 0);\n  }\n\n  private boolean search(String a, String b, String c, int i, int j) {\n    if (i + j == c.length()) return true;\n    boolean takeA = i < a.length() && a.charAt(i) == c.charAt(i + j) && search(a, b, c, i + 1, j);\n    boolean takeB = j < b.length() && b.charAt(j) == c.charAt(i + j) && search(a, b, c, i, j + 1);\n    return takeA || takeB;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isInterleave(String s1, String s2, String s3) {\n    if (s1.length() + s2.length() != s3.length()) return false;\n    boolean[] dp = new boolean[s2.length() + 1];\n    dp[0] = true;\n\n    for (int i = 0; i <= s1.length(); i++) {\n      for (int j = 0; j <= s2.length(); j++) {\n        if (i == 0 && j == 0) continue;\n        int k = i + j - 1;\n        boolean fromS1 = i > 0 && dp[j] && s1.charAt(i - 1) == s3.charAt(k);\n        boolean fromS2 = j > 0 && dp[j - 1] && s2.charAt(j - 1) == s3.charAt(k);\n        dp[j] = fromS1 || fromS2;\n      }\n    }\n    return dp[s2.length()];\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isInterleave(String s1, String s2, String s3) {\n    if (s1.length() + s2.length() != s3.length()) return false;\n    Boolean[][] memo = new Boolean[s1.length() + 1][s2.length() + 1];\n    return dp(s1, s2, s3, 0, 0, memo);\n  }\n\n  private boolean dp(String a, String b, String c, int i, int j, Boolean[][] memo) {\n    if (i + j == c.length()) return true;\n    if (memo[i][j] != null) return memo[i][j];\n    boolean ok = false;\n    if (i < a.length() && a.charAt(i) == c.charAt(i + j)) ok |= dp(a, b, c, i + 1, j, memo);\n    if (j < b.length() && b.charAt(j) == c.charAt(i + j)) ok |= dp(a, b, c, i, j + 1, memo);\n    memo[i][j] = ok;\n    return ok;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isInterleave(String s1, String s2, String s3) {\n    if (s1.length() + s2.length() != s3.length()) return false;\n    boolean[] dp = new boolean[s2.length() + 1];\n    dp[0] = true;\n\n    for (int i = 0; i <= s1.length(); i++) {\n      for (int j = 0; j <= s2.length(); j++) {\n        if (i == 0 && j == 0) continue;\n        int k = i + j - 1;\n        boolean fromS1 = i > 0 && dp[j] && s1.charAt(i - 1) == s3.charAt(k);\n        boolean fromS2 = j > 0 && dp[j - 1] && s2.charAt(j - 1) == s3.charAt(k);\n        dp[j] = fromS1 || fromS2;\n      }\n    }\n    return dp[s2.length()];\n  }\n}",
      "code": "class Solution {\n  public boolean isInterleave(String s1, String s2, String s3) {\n    if (s1.length() + s2.length() != s3.length()) return false;\n    boolean[] dp = new boolean[s2.length() + 1];\n    dp[0] = true;\n\n    for (int i = 0; i <= s1.length(); i++) {\n      for (int j = 0; j <= s2.length(); j++) {\n        if (i == 0 && j == 0) continue;\n        int k = i + j - 1;\n        boolean fromS1 = i > 0 && dp[j] && s1.charAt(i - 1) == s3.charAt(k);\n        boolean fromS2 = j > 0 && dp[j - 1] && s2.charAt(j - 1) == s3.charAt(k);\n        dp[j] = fromS1 || fromS2;\n      }\n    }\n    return dp[s2.length()];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Palindromic Subsequence",
      "difficulty": "Medium",
      "subpattern": "Palindrome interval DP",
      "question": "Given a string s, return the length of the longest subsequence that reads the same forward and backward.",
      "trigger": "The decision depends on both ends of a substring, so the state is an interval [left, right].",
      "intuition": "If both ends match, keep both and solve the inside; otherwise drop one end and take the best result.",
      "edgeCases": "Single character, all same characters, no repeated characters, even length palindrome, odd length palindrome.",
      "constraints": "1 <= s.length <= 1000; s contains lowercase English letters.",
      "source": {
        "label": "Longest Palindromic Subsequence - LeetCode 516",
        "url": "https://leetcode.com/problems/longest-palindromic-subsequence/"
      },
      "examples": [
        {
          "input": "s = \"bbbab\"",
          "output": "4",
          "explanation": "bbbb is a palindromic subsequence."
        },
        {
          "input": "s = \"cbbd\"",
          "output": "2",
          "explanation": "bb is the longest palindromic subsequence."
        },
        {
          "input": "s = \"abc\"",
          "output": "1",
          "explanation": "Any single character is valid."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion tries dropping either interval end.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Rolling interval DP stores results for the current left boundary.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoization stores every interval once.",
      "bruteForceCode": "class Solution {\n  public int longestPalindromeSubseq(String s) {\n    return solve(s, 0, s.length() - 1);\n  }\n\n  private int solve(String s, int left, int right) {\n    if (left > right) return 0;\n    if (left == right) return 1;\n    if (s.charAt(left) == s.charAt(right)) {\n      return 2 + solve(s, left + 1, right - 1);\n    }\n    return Math.max(solve(s, left + 1, right), solve(s, left, right - 1));\n  }\n}",
      "iterativeCode": "class Solution {\n  public int longestPalindromeSubseq(String s) {\n    int n = s.length();\n    int[] dp = new int[n];\n\n    for (int left = n - 1; left >= 0; left--) {\n      dp[left] = 1;\n      int diagonal = 0;\n      for (int right = left + 1; right < n; right++) {\n        int saved = dp[right];\n        if (s.charAt(left) == s.charAt(right)) {\n          dp[right] = diagonal + 2;\n        } else {\n          dp[right] = Math.max(dp[right], dp[right - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestPalindromeSubseq(String s) {\n    int n = s.length();\n    int[][] memo = new int[n][n];\n    return dp(s, 0, n - 1, memo);\n  }\n\n  private int dp(String s, int left, int right, int[][] memo) {\n    if (left > right) return 0;\n    if (left == right) return 1;\n    if (memo[left][right] != 0) return memo[left][right];\n    if (s.charAt(left) == s.charAt(right)) {\n      memo[left][right] = 2 + dp(s, left + 1, right - 1, memo);\n    } else {\n      memo[left][right] = Math.max(dp(s, left + 1, right, memo), dp(s, left, right - 1, memo));\n    }\n    return memo[left][right];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int longestPalindromeSubseq(String s) {\n    int n = s.length();\n    int[] dp = new int[n];\n\n    for (int left = n - 1; left >= 0; left--) {\n      dp[left] = 1;\n      int diagonal = 0;\n      for (int right = left + 1; right < n; right++) {\n        int saved = dp[right];\n        if (s.charAt(left) == s.charAt(right)) {\n          dp[right] = diagonal + 2;\n        } else {\n          dp[right] = Math.max(dp[right], dp[right - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n - 1];\n  }\n}",
      "code": "class Solution {\n  public int longestPalindromeSubseq(String s) {\n    int n = s.length();\n    int[] dp = new int[n];\n\n    for (int left = n - 1; left >= 0; left--) {\n      dp[left] = 1;\n      int diagonal = 0;\n      for (int right = left + 1; right < n; right++) {\n        int saved = dp[right];\n        if (s.charAt(left) == s.charAt(right)) {\n          dp[right] = diagonal + 2;\n        } else {\n          dp[right] = Math.max(dp[right], dp[right - 1]);\n        }\n        diagonal = saved;\n      }\n    }\n    return dp[n - 1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Palindromic Substring",
      "difficulty": "Medium",
      "subpattern": "Palindrome interval DP",
      "question": "Given a string s, return the longest contiguous substring that is a palindrome.",
      "trigger": "A substring is palindromic when its ends match and its inner substring is also palindromic.",
      "intuition": "Build short intervals first so each longer interval can reuse the answer for its inside.",
      "edgeCases": "Minimum length, one character, two equal characters, all same characters, multiple longest answers.",
      "constraints": "1 <= s.length <= 1000; s contains digits and English letters.",
      "source": {
        "label": "Longest Palindromic Substring - LeetCode 5",
        "url": "https://leetcode.com/problems/longest-palindromic-substring/"
      },
      "examples": [
        {
          "input": "s = \"babad\"",
          "output": "\"bab\"",
          "explanation": "aba is also a valid longest answer."
        },
        {
          "input": "s = \"cbbd\"",
          "output": "\"bb\"",
          "explanation": "bb is the longest palindromic substring."
        },
        {
          "input": "s = \"a\"",
          "output": "\"a\"",
          "explanation": "A single character is a palindrome."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every substring and scan it for palindrome validity.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). Boolean interval DP marks palindromic substrings.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoized palindrome checks are reused while scanning intervals.",
      "bruteForceCode": "class Solution {\n  public String longestPalindrome(String s) {\n    String best = \"\";\n    for (int left = 0; left < s.length(); left++) {\n      for (int right = left; right < s.length(); right++) {\n        if (right - left + 1 > best.length() && isPalindrome(s, left, right)) {\n          best = s.substring(left, right + 1);\n        }\n      }\n    }\n    return best;\n  }\n\n  private boolean isPalindrome(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String longestPalindrome(String s) {\n    int n = s.length();\n    boolean[][] dp = new boolean[n][n];\n    int bestStart = 0;\n    int bestLength = 1;\n\n    for (int length = 1; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        boolean innerOk = length <= 2 || dp[left + 1][right - 1];\n        dp[left][right] = s.charAt(left) == s.charAt(right) && innerOk;\n        if (dp[left][right] && length > bestLength) {\n          bestStart = left;\n          bestLength = length;\n        }\n      }\n    }\n    return s.substring(bestStart, bestStart + bestLength);\n  }\n}",
      "recursiveCode": "class Solution {\n  public String longestPalindrome(String s) {\n    int n = s.length();\n    Boolean[][] memo = new Boolean[n][n];\n    int bestStart = 0;\n    int bestLength = 1;\n\n    for (int left = 0; left < n; left++) {\n      for (int right = left; right < n; right++) {\n        int length = right - left + 1;\n        if (length > bestLength && isPalindrome(s, left, right, memo)) {\n          bestStart = left;\n          bestLength = length;\n        }\n      }\n    }\n    return s.substring(bestStart, bestStart + bestLength);\n  }\n\n  private boolean isPalindrome(String s, int left, int right, Boolean[][] memo) {\n    if (left >= right) return true;\n    if (memo[left][right] != null) return memo[left][right];\n    memo[left][right] = s.charAt(left) == s.charAt(right) && isPalindrome(s, left + 1, right - 1, memo);\n    return memo[left][right];\n  }\n}",
      "optimizedCode": "class Solution {\n  public String longestPalindrome(String s) {\n    int n = s.length();\n    boolean[][] dp = new boolean[n][n];\n    int bestStart = 0;\n    int bestLength = 1;\n\n    for (int length = 1; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        boolean innerOk = length <= 2 || dp[left + 1][right - 1];\n        dp[left][right] = s.charAt(left) == s.charAt(right) && innerOk;\n        if (dp[left][right] && length > bestLength) {\n          bestStart = left;\n          bestLength = length;\n        }\n      }\n    }\n    return s.substring(bestStart, bestStart + bestLength);\n  }\n}",
      "code": "class Solution {\n  public String longestPalindrome(String s) {\n    int n = s.length();\n    boolean[][] dp = new boolean[n][n];\n    int bestStart = 0;\n    int bestLength = 1;\n\n    for (int length = 1; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        boolean innerOk = length <= 2 || dp[left + 1][right - 1];\n        dp[left][right] = s.charAt(left) == s.charAt(right) && innerOk;\n        if (dp[left][right] && length > bestLength) {\n          bestStart = left;\n          bestLength = length;\n        }\n      }\n    }\n    return s.substring(bestStart, bestStart + bestLength);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Palindromic Substrings",
      "difficulty": "Medium",
      "subpattern": "Palindrome interval DP",
      "question": "Given a string s, return the number of contiguous substrings that are palindromes.",
      "trigger": "Each interval needs the palindrome status of its inner interval.",
      "intuition": "Every matching pair of ends creates a palindrome when the inside is already valid or the length is at most two.",
      "edgeCases": "One character, all same characters, no repeated characters, length two, overlapping palindromes.",
      "constraints": "1 <= s.length <= 1000; s contains lowercase English letters.",
      "source": {
        "label": "Palindromic Substrings - LeetCode 647",
        "url": "https://leetcode.com/problems/palindromic-substrings/"
      },
      "examples": [
        {
          "input": "s = \"abc\"",
          "output": "3",
          "explanation": "Only a, b, and c are palindromes."
        },
        {
          "input": "s = \"aaa\"",
          "output": "6",
          "explanation": "All three singles, two aa substrings, and aaa count."
        },
        {
          "input": "s = \"abccba\"",
          "output": "9",
          "explanation": "The full string and inner palindromes are included."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Enumerate every substring and scan it.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). Interval DP computes palindrome status once per substring.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Recursive palindrome checks are memoized for all intervals.",
      "bruteForceCode": "class Solution {\n  public int countSubstrings(String s) {\n    int count = 0;\n    for (int left = 0; left < s.length(); left++) {\n      for (int right = left; right < s.length(); right++) {\n        if (isPalindrome(s, left, right)) count++;\n      }\n    }\n    return count;\n  }\n\n  private boolean isPalindrome(String s, int left, int right) {\n    while (left < right) {\n      if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int countSubstrings(String s) {\n    int n = s.length();\n    boolean[][] dp = new boolean[n][n];\n    int count = 0;\n\n    for (int length = 1; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        boolean innerOk = length <= 2 || dp[left + 1][right - 1];\n        dp[left][right] = s.charAt(left) == s.charAt(right) && innerOk;\n        if (dp[left][right]) count++;\n      }\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countSubstrings(String s) {\n    int n = s.length();\n    Boolean[][] memo = new Boolean[n][n];\n    int count = 0;\n    for (int left = 0; left < n; left++) {\n      for (int right = left; right < n; right++) {\n        if (isPalindrome(s, left, right, memo)) count++;\n      }\n    }\n    return count;\n  }\n\n  private boolean isPalindrome(String s, int left, int right, Boolean[][] memo) {\n    if (left >= right) return true;\n    if (memo[left][right] != null) return memo[left][right];\n    memo[left][right] = s.charAt(left) == s.charAt(right) && isPalindrome(s, left + 1, right - 1, memo);\n    return memo[left][right];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countSubstrings(String s) {\n    int n = s.length();\n    boolean[][] dp = new boolean[n][n];\n    int count = 0;\n\n    for (int length = 1; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        boolean innerOk = length <= 2 || dp[left + 1][right - 1];\n        dp[left][right] = s.charAt(left) == s.charAt(right) && innerOk;\n        if (dp[left][right]) count++;\n      }\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  public int countSubstrings(String s) {\n    int n = s.length();\n    boolean[][] dp = new boolean[n][n];\n    int count = 0;\n\n    for (int length = 1; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        boolean innerOk = length <= 2 || dp[left + 1][right - 1];\n        dp[left][right] = s.charAt(left) == s.charAt(right) && innerOk;\n        if (dp[left][right]) count++;\n      }\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Coin Change II",
      "difficulty": "Medium",
      "subpattern": "2D knapsack capacity DP",
      "question": "Given coin denominations and an amount, return the number of combinations that make the amount. Each coin can be used unlimited times.",
      "trigger": "The state combines coin index and remaining amount, and each coin has take or skip choices.",
      "intuition": "Process coins in fixed order so combinations are counted once, not as permutations.",
      "edgeCases": "Amount zero, no coin can fit, coin value one, large count, combinations instead of orderings.",
      "constraints": "1 <= coins.length <= 300; 1 <= coins[i] <= 5000; 0 <= amount <= 5000.",
      "source": {
        "label": "Coin Change II - LeetCode 518",
        "url": "https://leetcode.com/problems/coin-change-ii/"
      },
      "examples": [
        {
          "input": "amount = 5, coins = [1,2,5]",
          "output": "4",
          "explanation": "The combinations are 5, 2+2+1, 2+1+1+1, and five 1s."
        },
        {
          "input": "amount = 3, coins = [2]",
          "output": "0",
          "explanation": "No combination reaches 3."
        },
        {
          "input": "amount = 0, coins = [1,2]",
          "output": "1",
          "explanation": "The empty combination makes amount zero."
        }
      ],
      "bruteForceComplexity": "Time exponential in amount and coin count; Space O(amount/minCoin). Plain recursion branches take or skip.",
      "optimizedComplexity": "Time O(n * amount); Space O(amount). 1D unbounded knapsack adds current coin contributions left to right.",
      "recursiveComplexity": "Time O(n * amount); Space O(n * amount). Memoization stores coin index and remaining amount.",
      "bruteForceCode": "class Solution {\n  public int change(int amount, int[] coins) {\n    return count(coins, 0, amount);\n  }\n\n  private int count(int[] coins, int index, int amount) {\n    if (amount == 0) return 1;\n    if (index == coins.length || amount < 0) return 0;\n    int skip = count(coins, index + 1, amount);\n    int take = count(coins, index, amount - coins[index]);\n    return skip + take;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n\n    for (int coin : coins) {\n      for (int sum = coin; sum <= amount; sum++) {\n        dp[sum] += dp[sum - coin];\n      }\n    }\n    return dp[amount];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int change(int amount, int[] coins) {\n    int[][] memo = new int[coins.length][amount + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(coins, 0, amount, memo);\n  }\n\n  private int dp(int[] coins, int index, int amount, int[][] memo) {\n    if (amount == 0) return 1;\n    if (index == coins.length || amount < 0) return 0;\n    if (memo[index][amount] != -1) return memo[index][amount];\n    memo[index][amount] = dp(coins, index + 1, amount, memo) + dp(coins, index, amount - coins[index], memo);\n    return memo[index][amount];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n\n    for (int coin : coins) {\n      for (int sum = coin; sum <= amount; sum++) {\n        dp[sum] += dp[sum - coin];\n      }\n    }\n    return dp[amount];\n  }\n}",
      "code": "class Solution {\n  public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n\n    for (int coin : coins) {\n      for (int sum = coin; sum <= amount; sum++) {\n        dp[sum] += dp[sum - coin];\n      }\n    }\n    return dp[amount];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Target Sum",
      "difficulty": "Medium",
      "subpattern": "2D knapsack signed-sum DP",
      "question": "Given nums and target, assign either plus or minus before every number. Return how many assignments evaluate to target.",
      "trigger": "Each index has two transitions, and the running sum is the second DP dimension.",
      "intuition": "Track how many ways each partial sum can be reached after processing each number.",
      "edgeCases": "Zeros double the count, unreachable target, negative target, all numbers used, large absolute sum.",
      "constraints": "1 <= nums.length <= 20; 0 <= nums[i] <= 1000; -1000 <= target <= 1000; total sum <= 1000.",
      "source": {
        "label": "Target Sum - LeetCode 494",
        "url": "https://leetcode.com/problems/target-sum/"
      },
      "examples": [
        {
          "input": "nums = [1,1,1,1,1], target = 3",
          "output": "5",
          "explanation": "Five sign assignments produce 3."
        },
        {
          "input": "nums = [1], target = 1",
          "output": "1",
          "explanation": "Only +1 works."
        },
        {
          "input": "nums = [0,0,1], target = 1",
          "output": "4",
          "explanation": "Each zero can be plus or minus without changing the sum."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion assigns plus or minus for each number.",
      "optimizedComplexity": "Time O(n * sum); Space O(sum). Offset DP stores counts for reachable signed sums.",
      "recursiveComplexity": "Time O(n * sum); Space O(n * sum). Memoization stores index and offset running sum.",
      "bruteForceCode": "class Solution {\n  public int findTargetSumWays(int[] nums, int target) {\n    return count(nums, 0, 0, target);\n  }\n\n  private int count(int[] nums, int index, int sum, int target) {\n    if (index == nums.length) return sum == target ? 1 : 0;\n    int plus = count(nums, index + 1, sum + nums[index], target);\n    int minus = count(nums, index + 1, sum - nums[index], target);\n    return plus + minus;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findTargetSumWays(int[] nums, int target) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (Math.abs(target) > total) return 0;\n\n    int offset = total;\n    int[] dp = new int[2 * total + 1];\n    dp[offset] = 1;\n\n    for (int num : nums) {\n      int[] next = new int[2 * total + 1];\n      for (int sum = -total; sum <= total; sum++) {\n        int ways = dp[sum + offset];\n        if (ways == 0) continue;\n        next[sum + num + offset] += ways;\n        next[sum - num + offset] += ways;\n      }\n      dp = next;\n    }\n    return dp[target + offset];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findTargetSumWays(int[] nums, int target) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (Math.abs(target) > total) return 0;\n    Integer[][] memo = new Integer[nums.length][2 * total + 1];\n    return dp(nums, 0, 0, target, total, memo);\n  }\n\n  private int dp(int[] nums, int index, int sum, int target, int offset, Integer[][] memo) {\n    if (index == nums.length) return sum == target ? 1 : 0;\n    int key = sum + offset;\n    if (memo[index][key] != null) return memo[index][key];\n    int plus = dp(nums, index + 1, sum + nums[index], target, offset, memo);\n    int minus = dp(nums, index + 1, sum - nums[index], target, offset, memo);\n    memo[index][key] = plus + minus;\n    return memo[index][key];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findTargetSumWays(int[] nums, int target) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (Math.abs(target) > total) return 0;\n\n    int offset = total;\n    int[] dp = new int[2 * total + 1];\n    dp[offset] = 1;\n\n    for (int num : nums) {\n      int[] next = new int[2 * total + 1];\n      for (int sum = -total; sum <= total; sum++) {\n        int ways = dp[sum + offset];\n        if (ways == 0) continue;\n        next[sum + num + offset] += ways;\n        next[sum - num + offset] += ways;\n      }\n      dp = next;\n    }\n    return dp[target + offset];\n  }\n}",
      "code": "class Solution {\n  public int findTargetSumWays(int[] nums, int target) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (Math.abs(target) > total) return 0;\n\n    int offset = total;\n    int[] dp = new int[2 * total + 1];\n    dp[offset] = 1;\n\n    for (int num : nums) {\n      int[] next = new int[2 * total + 1];\n      for (int sum = -total; sum <= total; sum++) {\n        int ways = dp[sum + offset];\n        if (ways == 0) continue;\n        next[sum + num + offset] += ways;\n        next[sum - num + offset] += ways;\n      }\n      dp = next;\n    }\n    return dp[target + offset];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Ones and Zeroes",
      "difficulty": "Medium",
      "subpattern": "2D knapsack with two capacities",
      "question": "Given binary strings strs and limits m zeros and n ones, return the maximum number of strings that can be chosen without exceeding either limit.",
      "trigger": "Each item consumes two resources, so the DP state needs both remaining zero and one capacities.",
      "intuition": "For every string, either skip it or take it and reduce both capacity dimensions.",
      "edgeCases": "String with only zeros, string with only ones, capacity zero, no string fits, many small strings.",
      "constraints": "1 <= strs.length <= 600; 1 <= strs[i].length <= 100; 0 <= m, n <= 100.",
      "source": {
        "label": "Ones and Zeroes - LeetCode 474",
        "url": "https://leetcode.com/problems/ones-and-zeroes/"
      },
      "examples": [
        {
          "input": "strs = [\"10\",\"0001\",\"111001\",\"1\",\"0\"], m = 5, n = 3",
          "output": "4",
          "explanation": "Choose 10, 0001, 1, and 0."
        },
        {
          "input": "strs = [\"10\",\"0\",\"1\"], m = 1, n = 1",
          "output": "2",
          "explanation": "Choose 0 and 1 or choose 10."
        },
        {
          "input": "strs = [\"111\",\"1000\"], m = 2, n = 2",
          "output": "0",
          "explanation": "Neither string fits both capacities."
        }
      ],
      "bruteForceComplexity": "Time O(2^k * L); Space O(k). Plain recursion tries each subset and counts zeros and ones.",
      "optimizedComplexity": "Time O(k * m * n * L); Space O(m * n). Descending capacity loops implement 0/1 knapsack.",
      "recursiveComplexity": "Time O(k * m * n * L); Space O(k * m * n). Memoization stores index and two capacities.",
      "bruteForceCode": "class Solution {\n  public int findMaxForm(String[] strs, int m, int n) {\n    return choose(strs, 0, m, n);\n  }\n\n  private int choose(String[] strs, int index, int zerosLeft, int onesLeft) {\n    if (index == strs.length) return 0;\n    int skip = choose(strs, index + 1, zerosLeft, onesLeft);\n    int[] cost = count(strs[index]);\n    int take = 0;\n    if (cost[0] <= zerosLeft && cost[1] <= onesLeft) {\n      take = 1 + choose(strs, index + 1, zerosLeft - cost[0], onesLeft - cost[1]);\n    }\n    return Math.max(skip, take);\n  }\n\n  private int[] count(String s) {\n    int zeros = 0;\n    for (char c : s.toCharArray()) if (c == '0') zeros++;\n    return new int[] {zeros, s.length() - zeros};\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findMaxForm(String[] strs, int m, int n) {\n    int[][] dp = new int[m + 1][n + 1];\n\n    for (String s : strs) {\n      int[] cost = count(s);\n      for (int zeros = m; zeros >= cost[0]; zeros--) {\n        for (int ones = n; ones >= cost[1]; ones--) {\n          dp[zeros][ones] = Math.max(dp[zeros][ones], 1 + dp[zeros - cost[0]][ones - cost[1]]);\n        }\n      }\n    }\n    return dp[m][n];\n  }\n\n  private int[] count(String s) {\n    int zeros = 0;\n    for (char c : s.toCharArray()) if (c == '0') zeros++;\n    return new int[] {zeros, s.length() - zeros};\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMaxForm(String[] strs, int m, int n) {\n    int[][][] memo = new int[strs.length][m + 1][n + 1];\n    for (int[][] layer : memo) {\n      for (int[] row : layer) Arrays.fill(row, -1);\n    }\n    return dp(strs, 0, m, n, memo);\n  }\n\n  private int dp(String[] strs, int index, int zerosLeft, int onesLeft, int[][][] memo) {\n    if (index == strs.length) return 0;\n    if (memo[index][zerosLeft][onesLeft] != -1) return memo[index][zerosLeft][onesLeft];\n    int skip = dp(strs, index + 1, zerosLeft, onesLeft, memo);\n    int[] cost = count(strs[index]);\n    int take = 0;\n    if (cost[0] <= zerosLeft && cost[1] <= onesLeft) {\n      take = 1 + dp(strs, index + 1, zerosLeft - cost[0], onesLeft - cost[1], memo);\n    }\n    memo[index][zerosLeft][onesLeft] = Math.max(skip, take);\n    return memo[index][zerosLeft][onesLeft];\n  }\n\n  private int[] count(String s) {\n    int zeros = 0;\n    for (char c : s.toCharArray()) if (c == '0') zeros++;\n    return new int[] {zeros, s.length() - zeros};\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findMaxForm(String[] strs, int m, int n) {\n    int[][] dp = new int[m + 1][n + 1];\n\n    for (String s : strs) {\n      int[] cost = count(s);\n      for (int zeros = m; zeros >= cost[0]; zeros--) {\n        for (int ones = n; ones >= cost[1]; ones--) {\n          dp[zeros][ones] = Math.max(dp[zeros][ones], 1 + dp[zeros - cost[0]][ones - cost[1]]);\n        }\n      }\n    }\n    return dp[m][n];\n  }\n\n  private int[] count(String s) {\n    int zeros = 0;\n    for (char c : s.toCharArray()) if (c == '0') zeros++;\n    return new int[] {zeros, s.length() - zeros};\n  }\n}",
      "code": "class Solution {\n  public int findMaxForm(String[] strs, int m, int n) {\n    int[][] dp = new int[m + 1][n + 1];\n\n    for (String s : strs) {\n      int[] cost = count(s);\n      for (int zeros = m; zeros >= cost[0]; zeros--) {\n        for (int ones = n; ones >= cost[1]; ones--) {\n          dp[zeros][ones] = Math.max(dp[zeros][ones], 1 + dp[zeros - cost[0]][ones - cost[1]]);\n        }\n      }\n    }\n    return dp[m][n];\n  }\n\n  private int[] count(String s) {\n    int zeros = 0;\n    for (char c : s.toCharArray()) if (c == '0') zeros++;\n    return new int[] {zeros, s.length() - zeros};\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Last Stone Weight II",
      "difficulty": "Medium",
      "subpattern": "2D knapsack partition DP",
      "question": "Given stone weights, repeatedly smashing stones is equivalent to splitting stones into two groups. Return the minimum possible remaining weight.",
      "trigger": "The result is minimized when one subset sum is as close as possible to half of the total sum.",
      "intuition": "Find the largest achievable subset sum not exceeding total / 2, then subtract it from the other group.",
      "edgeCases": "One stone, equal stones, all stones same, odd total sum, subset exactly half.",
      "constraints": "1 <= stones.length <= 30; 1 <= stones[i] <= 100.",
      "source": {
        "label": "Last Stone Weight II - LeetCode 1049",
        "url": "https://leetcode.com/problems/last-stone-weight-ii/"
      },
      "examples": [
        {
          "input": "stones = [2,7,4,1,8,1]",
          "output": "1",
          "explanation": "Groups can be split with sums 11 and 12."
        },
        {
          "input": "stones = [31,26,33,21,40]",
          "output": "5",
          "explanation": "The closest partition leaves difference 5."
        },
        {
          "input": "stones = [1]",
          "output": "1",
          "explanation": "One stone remains unchanged."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion assigns every stone to one of two groups.",
      "optimizedComplexity": "Time O(n * total); Space O(total). 0/1 subset DP finds the closest half-sum.",
      "recursiveComplexity": "Time O(n * total); Space O(n * total). Memoization stores index and current bounded subset sum.",
      "bruteForceCode": "class Solution {\n  public int lastStoneWeightII(int[] stones) {\n    return search(stones, 0, 0);\n  }\n\n  private int search(int[] stones, int index, int diff) {\n    if (index == stones.length) return Math.abs(diff);\n    int addLeft = search(stones, index + 1, diff + stones[index]);\n    int addRight = search(stones, index + 1, diff - stones[index]);\n    return Math.min(addLeft, addRight);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int lastStoneWeightII(int[] stones) {\n    int total = 0;\n    for (int stone : stones) total += stone;\n    int capacity = total / 2;\n    boolean[] dp = new boolean[capacity + 1];\n    dp[0] = true;\n\n    for (int stone : stones) {\n      for (int sum = capacity; sum >= stone; sum--) {\n        dp[sum] |= dp[sum - stone];\n      }\n    }\n    for (int sum = capacity; sum >= 0; sum--) {\n      if (dp[sum]) return total - 2 * sum;\n    }\n    return total;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int lastStoneWeightII(int[] stones) {\n    int total = 0;\n    for (int stone : stones) total += stone;\n    int capacity = total / 2;\n    Integer[][] memo = new Integer[stones.length][capacity + 1];\n    int best = bestSubset(stones, 0, capacity, memo);\n    return total - 2 * best;\n  }\n\n  private int bestSubset(int[] stones, int index, int capacity, Integer[][] memo) {\n    if (index == stones.length || capacity == 0) return 0;\n    if (memo[index][capacity] != null) return memo[index][capacity];\n    int skip = bestSubset(stones, index + 1, capacity, memo);\n    int take = 0;\n    if (stones[index] <= capacity) {\n      take = stones[index] + bestSubset(stones, index + 1, capacity - stones[index], memo);\n    }\n    memo[index][capacity] = Math.max(skip, take);\n    return memo[index][capacity];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int lastStoneWeightII(int[] stones) {\n    int total = 0;\n    for (int stone : stones) total += stone;\n    int capacity = total / 2;\n    boolean[] dp = new boolean[capacity + 1];\n    dp[0] = true;\n\n    for (int stone : stones) {\n      for (int sum = capacity; sum >= stone; sum--) {\n        dp[sum] |= dp[sum - stone];\n      }\n    }\n    for (int sum = capacity; sum >= 0; sum--) {\n      if (dp[sum]) return total - 2 * sum;\n    }\n    return total;\n  }\n}",
      "code": "class Solution {\n  public int lastStoneWeightII(int[] stones) {\n    int total = 0;\n    for (int stone : stones) total += stone;\n    int capacity = total / 2;\n    boolean[] dp = new boolean[capacity + 1];\n    dp[0] = true;\n\n    for (int stone : stones) {\n      for (int sum = capacity; sum >= stone; sum--) {\n        dp[sum] |= dp[sum - stone];\n      }\n    }\n    for (int sum = capacity; sum >= 0; sum--) {\n      if (dp[sum]) return total - 2 * sum;\n    }\n    return total;\n  }\n}"
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
      "constraints": "1 <= nums.length <= 200; 1 <= nums[i] <= 100.",
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
      "bruteForceCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n    return search(nums, 0, total / 2);\n  }\n\n  private boolean search(int[] nums, int index, int target) {\n    if (target == 0) return true;\n    if (index == nums.length || target < 0) return false;\n    return search(nums, index + 1, target) || search(nums, index + 1, target - nums[index]);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n\n    int target = total / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n\n    for (int num : nums) {\n      for (int sum = target; sum >= num; sum--) {\n        dp[sum] |= dp[sum - num];\n      }\n    }\n    return dp[target];\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n    Boolean[][] memo = new Boolean[nums.length][total / 2 + 1];\n    return dp(nums, 0, total / 2, memo);\n  }\n\n  private boolean dp(int[] nums, int index, int target, Boolean[][] memo) {\n    if (target == 0) return true;\n    if (index == nums.length || target < 0) return false;\n    if (memo[index][target] != null) return memo[index][target];\n    boolean skip = dp(nums, index + 1, target, memo);\n    boolean take = target >= nums[index] && dp(nums, index + 1, target - nums[index], memo);\n    memo[index][target] = skip || take;\n    return memo[index][target];\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n\n    int target = total / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n\n    for (int num : nums) {\n      for (int sum = target; sum >= num; sum--) {\n        dp[sum] |= dp[sum - num];\n      }\n    }\n    return dp[target];\n  }\n}",
      "code": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int total = 0;\n    for (int num : nums) total += num;\n    if (total % 2 == 1) return false;\n\n    int target = total / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n\n    for (int num : nums) {\n      for (int sum = target; sum >= num; sum--) {\n        dp[sum] |= dp[sum - num];\n      }\n    }\n    return dp[target];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Longest Increasing Path in a Matrix",
      "difficulty": "Hard",
      "subpattern": "Matrix DFS with memoization",
      "question": "Given an integer matrix, return the length of the longest path where each next cell is strictly larger and movement is allowed in four directions.",
      "trigger": "Each cell depends on neighboring cells with larger values, forming a DAG by value.",
      "intuition": "The best path starting at a cell is one plus the best larger-neighbor path.",
      "edgeCases": "Single cell, all equal values, strictly decreasing matrix, duplicate values, long snake-shaped path.",
      "constraints": "1 <= m, n <= 200; 0 <= matrix[i][j] <= 2^31 - 1.",
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
          "explanation": "One longest path is 3 -> 4 -> 5 -> 6."
        },
        {
          "input": "matrix = [[1]]",
          "output": "1",
          "explanation": "The single cell is the path."
        }
      ],
      "bruteForceComplexity": "Time exponential in cells; Space O(mn). Plain DFS recomputes paths from shared neighbors.",
      "optimizedComplexity": "Time O(mn log(mn)); Space O(mn). Sort cells by value and relax from smaller cells to larger neighbors.",
      "recursiveComplexity": "Time O(mn); Space O(mn). DFS memoization computes the best path from each cell once.",
      "bruteForceCode": "class Solution {\n  private static final int[][] DIRS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n\n  public int longestIncreasingPath(int[][] matrix) {\n    int best = 0;\n    for (int row = 0; row < matrix.length; row++) {\n      for (int col = 0; col < matrix[0].length; col++) {\n        best = Math.max(best, dfs(matrix, row, col));\n      }\n    }\n    return best;\n  }\n\n  private int dfs(int[][] matrix, int row, int col) {\n    int best = 1;\n    for (int[] dir : DIRS) {\n      int nextRow = row + dir[0];\n      int nextCol = col + dir[1];\n      if (nextRow < 0 || nextCol < 0 || nextRow == matrix.length || nextCol == matrix[0].length) continue;\n      if (matrix[nextRow][nextCol] > matrix[row][col]) {\n        best = Math.max(best, 1 + dfs(matrix, nextRow, nextCol));\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n\n  public int longestIncreasingPath(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[][] cells = new int[rows * cols][3];\n    int index = 0;\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        cells[index++] = new int[] {matrix[row][col], row, col};\n      }\n    }\n    Arrays.sort(cells, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[][] dp = new int[rows][cols];\n    int best = 1;\n    for (int[] cell : cells) {\n      int row = cell[1];\n      int col = cell[2];\n      dp[row][col] = Math.max(dp[row][col], 1);\n      for (int[] dir : DIRS) {\n        int nextRow = row + dir[0];\n        int nextCol = col + dir[1];\n        if (nextRow < 0 || nextCol < 0 || nextRow == rows || nextCol == cols) continue;\n        if (matrix[nextRow][nextCol] > matrix[row][col]) {\n          dp[nextRow][nextCol] = Math.max(dp[nextRow][nextCol], dp[row][col] + 1);\n          best = Math.max(best, dp[nextRow][nextCol]);\n        }\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static final int[][] DIRS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n\n  public int longestIncreasingPath(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[][] memo = new int[rows][cols];\n    int best = 0;\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        best = Math.max(best, dp(matrix, row, col, memo));\n      }\n    }\n    return best;\n  }\n\n  private int dp(int[][] matrix, int row, int col, int[][] memo) {\n    if (memo[row][col] != 0) return memo[row][col];\n    int best = 1;\n    for (int[] dir : DIRS) {\n      int nextRow = row + dir[0];\n      int nextCol = col + dir[1];\n      if (nextRow < 0 || nextCol < 0 || nextRow == matrix.length || nextCol == matrix[0].length) continue;\n      if (matrix[nextRow][nextCol] > matrix[row][col]) {\n        best = Math.max(best, 1 + dp(matrix, nextRow, nextCol, memo));\n      }\n    }\n    memo[row][col] = best;\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n\n  public int longestIncreasingPath(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[][] cells = new int[rows * cols][3];\n    int index = 0;\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        cells[index++] = new int[] {matrix[row][col], row, col};\n      }\n    }\n    Arrays.sort(cells, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[][] dp = new int[rows][cols];\n    int best = 1;\n    for (int[] cell : cells) {\n      int row = cell[1];\n      int col = cell[2];\n      dp[row][col] = Math.max(dp[row][col], 1);\n      for (int[] dir : DIRS) {\n        int nextRow = row + dir[0];\n        int nextCol = col + dir[1];\n        if (nextRow < 0 || nextCol < 0 || nextRow == rows || nextCol == cols) continue;\n        if (matrix[nextRow][nextCol] > matrix[row][col]) {\n          dp[nextRow][nextCol] = Math.max(dp[nextRow][nextCol], dp[row][col] + 1);\n          best = Math.max(best, dp[nextRow][nextCol]);\n        }\n      }\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n\n  public int longestIncreasingPath(int[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[][] cells = new int[rows * cols][3];\n    int index = 0;\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        cells[index++] = new int[] {matrix[row][col], row, col};\n      }\n    }\n    Arrays.sort(cells, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[][] dp = new int[rows][cols];\n    int best = 1;\n    for (int[] cell : cells) {\n      int row = cell[1];\n      int col = cell[2];\n      dp[row][col] = Math.max(dp[row][col], 1);\n      for (int[] dir : DIRS) {\n        int nextRow = row + dir[0];\n        int nextCol = col + dir[1];\n        if (nextRow < 0 || nextCol < 0 || nextRow == rows || nextCol == cols) continue;\n        if (matrix[nextRow][nextCol] > matrix[row][col]) {\n          dp[nextRow][nextCol] = Math.max(dp[nextRow][nextCol], dp[row][col] + 1);\n          best = Math.max(best, dp[nextRow][nextCol]);\n        }\n      }\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximal Square",
      "difficulty": "Medium",
      "subpattern": "Square-ending matrix DP",
      "question": "Given a binary matrix of characters, return the area of the largest square containing only 1s.",
      "trigger": "A square ending at a cell depends on the square sizes ending above, left, and diagonally above-left.",
      "intuition": "A 1 cell can extend the smallest neighboring square by one; a 0 cell contributes zero.",
      "edgeCases": "All zeros, all ones, one row, one column, isolated 1s, largest square at the border.",
      "constraints": "1 <= rows, cols <= 300; matrix[i][j] is 0 or 1 as a character.",
      "source": {
        "label": "Maximal Square - LeetCode 221",
        "url": "https://leetcode.com/problems/maximal-square/"
      },
      "examples": [
        {
          "input": "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
          "output": "4",
          "explanation": "The largest square has side length 2."
        },
        {
          "input": "matrix = [[\"0\",\"1\"],[\"1\",\"0\"]]",
          "output": "1",
          "explanation": "Each single 1 forms a square of area 1."
        },
        {
          "input": "matrix = [[\"0\"]]",
          "output": "0",
          "explanation": "There is no square of 1s."
        }
      ],
      "bruteForceComplexity": "Time O(rows * cols * min(rows, cols)^3); Space O(1). Try every square and scan its cells.",
      "optimizedComplexity": "Time O(rows * cols); Space O(cols). Rolling DP stores square side lengths for the current row.",
      "recursiveComplexity": "Time O(rows * cols); Space O(rows * cols). Memoized recursion computes each starting cell once.",
      "bruteForceCode": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int bestSide = 0;\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        for (int side = 1; row + side <= rows && col + side <= cols; side++) {\n          if (isAllOnes(matrix, row, col, side)) bestSide = Math.max(bestSide, side);\n        }\n      }\n    }\n    return bestSide * bestSide;\n  }\n\n  private boolean isAllOnes(char[][] matrix, int top, int left, int side) {\n    for (int row = top; row < top + side; row++) {\n      for (int col = left; col < left + side; col++) {\n        if (matrix[row][col] == '0') return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[] dp = new int[cols + 1];\n    int bestSide = 0;\n\n    for (int row = 1; row <= rows; row++) {\n      int diagonal = 0;\n      for (int col = 1; col <= cols; col++) {\n        int saved = dp[col];\n        if (matrix[row - 1][col - 1] == '1') {\n          dp[col] = 1 + Math.min(diagonal, Math.min(dp[col], dp[col - 1]));\n          bestSide = Math.max(bestSide, dp[col]);\n        } else {\n          dp[col] = 0;\n        }\n        diagonal = saved;\n      }\n    }\n    return bestSide * bestSide;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private int bestSide;\n\n  public int maximalSquare(char[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[][] memo = new int[rows][cols];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    for (int row = 0; row < rows; row++) {\n      for (int col = 0; col < cols; col++) {\n        bestSide = Math.max(bestSide, dp(matrix, row, col, memo));\n      }\n    }\n    return bestSide * bestSide;\n  }\n\n  private int dp(char[][] matrix, int row, int col, int[][] memo) {\n    if (row == matrix.length || col == matrix[0].length) return 0;\n    if (memo[row][col] != -1) return memo[row][col];\n    int down = dp(matrix, row + 1, col, memo);\n    int right = dp(matrix, row, col + 1, memo);\n    int diagonal = dp(matrix, row + 1, col + 1, memo);\n    memo[row][col] = matrix[row][col] == '1' ? 1 + Math.min(down, Math.min(right, diagonal)) : 0;\n    return memo[row][col];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[] dp = new int[cols + 1];\n    int bestSide = 0;\n\n    for (int row = 1; row <= rows; row++) {\n      int diagonal = 0;\n      for (int col = 1; col <= cols; col++) {\n        int saved = dp[col];\n        if (matrix[row - 1][col - 1] == '1') {\n          dp[col] = 1 + Math.min(diagonal, Math.min(dp[col], dp[col - 1]));\n          bestSide = Math.max(bestSide, dp[col]);\n        } else {\n          dp[col] = 0;\n        }\n        diagonal = saved;\n      }\n    }\n    return bestSide * bestSide;\n  }\n}",
      "code": "class Solution {\n  public int maximalSquare(char[][] matrix) {\n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[] dp = new int[cols + 1];\n    int bestSide = 0;\n\n    for (int row = 1; row <= rows; row++) {\n      int diagonal = 0;\n      for (int col = 1; col <= cols; col++) {\n        int saved = dp[col];\n        if (matrix[row - 1][col - 1] == '1') {\n          dp[col] = 1 + Math.min(diagonal, Math.min(dp[col], dp[col - 1]));\n          bestSide = Math.max(bestSide, dp[col]);\n        } else {\n          dp[col] = 0;\n        }\n        diagonal = saved;\n      }\n    }\n    return bestSide * bestSide;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Dungeon Game",
      "difficulty": "Hard",
      "subpattern": "Dungeon reverse grid DP",
      "question": "Given a dungeon grid of health gains and losses, return the minimum initial health needed to move only right or down from top-left to bottom-right while health always stays at least 1.",
      "trigger": "The required health at a cell depends on the minimum health required by its right and down exits.",
      "intuition": "Work backward: each cell must leave enough health to satisfy the cheaper next cell after applying the current value.",
      "edgeCases": "Positive start, negative princess cell, one cell dungeon, all positive cells, path with large early damage.",
      "constraints": "1 <= rows, cols <= 200; -1000 <= dungeon[i][j] <= 1000.",
      "source": {
        "label": "Dungeon Game - LeetCode 174",
        "url": "https://leetcode.com/problems/dungeon-game/"
      },
      "examples": [
        {
          "input": "dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]",
          "output": "7",
          "explanation": "The optimal path needs at least 7 initial health."
        },
        {
          "input": "dungeon = [[0]]",
          "output": "1",
          "explanation": "Health must start at least 1."
        },
        {
          "input": "dungeon = [[10]]",
          "output": "1",
          "explanation": "A positive cell still needs only one initial health."
        }
      ],
      "bruteForceComplexity": "Time O(2^(rows+cols)); Space O(rows+cols). Plain recursion branches right and down from each cell.",
      "optimizedComplexity": "Time O(rows * cols); Space O(cols). Reverse rolling DP keeps required health for the next row.",
      "recursiveComplexity": "Time O(rows * cols); Space O(rows * cols). Memoization stores required health for every cell.",
      "bruteForceCode": "class Solution {\n  public int calculateMinimumHP(int[][] dungeon) {\n    return need(dungeon, 0, 0);\n  }\n\n  private int need(int[][] dungeon, int row, int col) {\n    if (row == dungeon.length || col == dungeon[0].length) return Integer.MAX_VALUE / 4;\n    if (row == dungeon.length - 1 && col == dungeon[0].length - 1) {\n      return Math.max(1, 1 - dungeon[row][col]);\n    }\n    int nextNeed = Math.min(need(dungeon, row + 1, col), need(dungeon, row, col + 1));\n    return Math.max(1, nextNeed - dungeon[row][col]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int calculateMinimumHP(int[][] dungeon) {\n    int rows = dungeon.length;\n    int cols = dungeon[0].length;\n    int[] dp = new int[cols + 1];\n    Arrays.fill(dp, Integer.MAX_VALUE / 4);\n    dp[cols - 1] = 1;\n\n    for (int row = rows - 1; row >= 0; row--) {\n      for (int col = cols - 1; col >= 0; col--) {\n        int nextNeed = Math.min(dp[col], dp[col + 1]);\n        dp[col] = Math.max(1, nextNeed - dungeon[row][col]);\n      }\n    }\n    return dp[0];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int calculateMinimumHP(int[][] dungeon) {\n    int[][] memo = new int[dungeon.length][dungeon[0].length];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(dungeon, 0, 0, memo);\n  }\n\n  private int dp(int[][] dungeon, int row, int col, int[][] memo) {\n    if (row == dungeon.length || col == dungeon[0].length) return Integer.MAX_VALUE / 4;\n    if (row == dungeon.length - 1 && col == dungeon[0].length - 1) {\n      return Math.max(1, 1 - dungeon[row][col]);\n    }\n    if (memo[row][col] != -1) return memo[row][col];\n    int nextNeed = Math.min(dp(dungeon, row + 1, col, memo), dp(dungeon, row, col + 1, memo));\n    memo[row][col] = Math.max(1, nextNeed - dungeon[row][col]);\n    return memo[row][col];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int calculateMinimumHP(int[][] dungeon) {\n    int rows = dungeon.length;\n    int cols = dungeon[0].length;\n    int[] dp = new int[cols + 1];\n    Arrays.fill(dp, Integer.MAX_VALUE / 4);\n    dp[cols - 1] = 1;\n\n    for (int row = rows - 1; row >= 0; row--) {\n      for (int col = cols - 1; col >= 0; col--) {\n        int nextNeed = Math.min(dp[col], dp[col + 1]);\n        dp[col] = Math.max(1, nextNeed - dungeon[row][col]);\n      }\n    }\n    return dp[0];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int calculateMinimumHP(int[][] dungeon) {\n    int rows = dungeon.length;\n    int cols = dungeon[0].length;\n    int[] dp = new int[cols + 1];\n    Arrays.fill(dp, Integer.MAX_VALUE / 4);\n    dp[cols - 1] = 1;\n\n    for (int row = rows - 1; row >= 0; row--) {\n      for (int col = cols - 1; col >= 0; col--) {\n        int nextNeed = Math.min(dp[col], dp[col + 1]);\n        dp[col] = Math.max(1, nextNeed - dungeon[row][col]);\n      }\n    }\n    return dp[0];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Cherry Pickup",
      "difficulty": "Hard",
      "subpattern": "Multi-agent grid DP",
      "question": "Given an n x n grid with cherries, empty cells, and thorns, collect the maximum cherries by going from top-left to bottom-right and back, moving only right/down outbound and left/up return.",
      "trigger": "The round trip can be modeled as two synchronized walkers moving from start to finish at the same step count.",
      "intuition": "Track both walkers together; when they stand on different cells, collect both cherries once.",
      "edgeCases": "Blocked start or finish, no valid path, both walkers same cell, all cherries, thorns forcing a narrow path.",
      "constraints": "1 <= n <= 50; grid[i][j] is -1, 0, or 1.",
      "source": {
        "label": "Cherry Pickup - LeetCode 741",
        "url": "https://leetcode.com/problems/cherry-pickup/"
      },
      "examples": [
        {
          "input": "grid = [[0,1,-1],[1,0,-1],[1,1,1]]",
          "output": "5",
          "explanation": "The best round trip collects five cherries."
        },
        {
          "input": "grid = [[1,1,-1],[1,-1,1],[-1,1,1]]",
          "output": "0",
          "explanation": "No complete valid route exists."
        },
        {
          "input": "grid = [[1]]",
          "output": "1",
          "explanation": "The single cell is collected once."
        }
      ],
      "bruteForceComplexity": "Time exponential in n; Space O(n). Plain synchronized recursion recomputes the same walker states.",
      "optimizedComplexity": "Time O(n^3); Space O(n^2). Step DP stores row positions for both walkers at each time.",
      "recursiveComplexity": "Time O(n^3); Space O(n^3). Memoized recursion stores row1, col1, and row2.",
      "bruteForceCode": "class Solution {\n  public int cherryPickup(int[][] grid) {\n    int result = walk(grid, 0, 0, 0);\n    return Math.max(0, result);\n  }\n\n  private int walk(int[][] grid, int r1, int c1, int r2) {\n    int c2 = r1 + c1 - r2;\n    int n = grid.length;\n    if (r1 == n || c1 == n || r2 == n || c2 == n) return -1_000_000;\n    if (grid[r1][c1] == -1 || grid[r2][c2] == -1) return -1_000_000;\n    if (r1 == n - 1 && c1 == n - 1) return grid[r1][c1];\n\n    int cherries = grid[r1][c1];\n    if (r1 != r2 || c1 != c2) cherries += grid[r2][c2];\n    int bestNext = Math.max(\n        Math.max(walk(grid, r1 + 1, c1, r2 + 1), walk(grid, r1, c1 + 1, r2)),\n        Math.max(walk(grid, r1 + 1, c1, r2), walk(grid, r1, c1 + 1, r2 + 1)));\n    return cherries + bestNext;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int n = grid.length;\n    int[][] dp = new int[n][n];\n    for (int[] row : dp) Arrays.fill(row, -1_000_000);\n    dp[0][0] = grid[0][0];\n\n    for (int step = 1; step <= 2 * n - 2; step++) {\n      int[][] next = new int[n][n];\n      for (int[] row : next) Arrays.fill(row, -1_000_000);\n      for (int r1 = Math.max(0, step - n + 1); r1 <= Math.min(n - 1, step); r1++) {\n        int c1 = step - r1;\n        if (grid[r1][c1] == -1) continue;\n        for (int r2 = Math.max(0, step - n + 1); r2 <= Math.min(n - 1, step); r2++) {\n          int c2 = step - r2;\n          if (grid[r2][c2] == -1) continue;\n          int best = dp[r1][r2];\n          if (r1 > 0) best = Math.max(best, dp[r1 - 1][r2]);\n          if (r2 > 0) best = Math.max(best, dp[r1][r2 - 1]);\n          if (r1 > 0 && r2 > 0) best = Math.max(best, dp[r1 - 1][r2 - 1]);\n          int cherries = grid[r1][c1];\n          if (r1 != r2) cherries += grid[r2][c2];\n          next[r1][r2] = best + cherries;\n        }\n      }\n      dp = next;\n    }\n    return Math.max(0, dp[n - 1][n - 1]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int n = grid.length;\n    int[][][] memo = new int[n][n][n];\n    for (int[][] layer : memo) {\n      for (int[] row : layer) Arrays.fill(row, Integer.MIN_VALUE);\n    }\n    return Math.max(0, dp(grid, 0, 0, 0, memo));\n  }\n\n  private int dp(int[][] grid, int r1, int c1, int r2, int[][][] memo) {\n    int c2 = r1 + c1 - r2;\n    int n = grid.length;\n    if (r1 == n || c1 == n || r2 == n || c2 == n) return -1_000_000;\n    if (grid[r1][c1] == -1 || grid[r2][c2] == -1) return -1_000_000;\n    if (r1 == n - 1 && c1 == n - 1) return grid[r1][c1];\n    if (memo[r1][c1][r2] != Integer.MIN_VALUE) return memo[r1][c1][r2];\n\n    int cherries = grid[r1][c1];\n    if (r1 != r2 || c1 != c2) cherries += grid[r2][c2];\n    int bestNext = Math.max(\n        Math.max(dp(grid, r1 + 1, c1, r2 + 1, memo), dp(grid, r1, c1 + 1, r2, memo)),\n        Math.max(dp(grid, r1 + 1, c1, r2, memo), dp(grid, r1, c1 + 1, r2 + 1, memo)));\n    memo[r1][c1][r2] = cherries + bestNext;\n    return memo[r1][c1][r2];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int n = grid.length;\n    int[][] dp = new int[n][n];\n    for (int[] row : dp) Arrays.fill(row, -1_000_000);\n    dp[0][0] = grid[0][0];\n\n    for (int step = 1; step <= 2 * n - 2; step++) {\n      int[][] next = new int[n][n];\n      for (int[] row : next) Arrays.fill(row, -1_000_000);\n      for (int r1 = Math.max(0, step - n + 1); r1 <= Math.min(n - 1, step); r1++) {\n        int c1 = step - r1;\n        if (grid[r1][c1] == -1) continue;\n        for (int r2 = Math.max(0, step - n + 1); r2 <= Math.min(n - 1, step); r2++) {\n          int c2 = step - r2;\n          if (grid[r2][c2] == -1) continue;\n          int best = dp[r1][r2];\n          if (r1 > 0) best = Math.max(best, dp[r1 - 1][r2]);\n          if (r2 > 0) best = Math.max(best, dp[r1][r2 - 1]);\n          if (r1 > 0 && r2 > 0) best = Math.max(best, dp[r1 - 1][r2 - 1]);\n          int cherries = grid[r1][c1];\n          if (r1 != r2) cherries += grid[r2][c2];\n          next[r1][r2] = best + cherries;\n        }\n      }\n      dp = next;\n    }\n    return Math.max(0, dp[n - 1][n - 1]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int n = grid.length;\n    int[][] dp = new int[n][n];\n    for (int[] row : dp) Arrays.fill(row, -1_000_000);\n    dp[0][0] = grid[0][0];\n\n    for (int step = 1; step <= 2 * n - 2; step++) {\n      int[][] next = new int[n][n];\n      for (int[] row : next) Arrays.fill(row, -1_000_000);\n      for (int r1 = Math.max(0, step - n + 1); r1 <= Math.min(n - 1, step); r1++) {\n        int c1 = step - r1;\n        if (grid[r1][c1] == -1) continue;\n        for (int r2 = Math.max(0, step - n + 1); r2 <= Math.min(n - 1, step); r2++) {\n          int c2 = step - r2;\n          if (grid[r2][c2] == -1) continue;\n          int best = dp[r1][r2];\n          if (r1 > 0) best = Math.max(best, dp[r1 - 1][r2]);\n          if (r2 > 0) best = Math.max(best, dp[r1][r2 - 1]);\n          if (r1 > 0 && r2 > 0) best = Math.max(best, dp[r1 - 1][r2 - 1]);\n          int cherries = grid[r1][c1];\n          if (r1 != r2) cherries += grid[r2][c2];\n          next[r1][r2] = best + cherries;\n        }\n      }\n      dp = next;\n    }\n    return Math.max(0, dp[n - 1][n - 1]);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Cherry Pickup II",
      "difficulty": "Hard",
      "subpattern": "Multi-agent grid DP",
      "question": "Given a grid, two robots start at the top-left and top-right columns and move one row down each step. Return the maximum cherries collected.",
      "trigger": "Both robots move row by row, so the state is row plus both column positions.",
      "intuition": "For each row, try all nine next-column combinations and avoid double-counting when robots meet.",
      "edgeCases": "One column, robots crossing, same cell on a row, all zeros, narrow grids.",
      "constraints": "2 <= rows, cols <= 70; 0 <= grid[i][j] <= 100.",
      "source": {
        "label": "Cherry Pickup II - LeetCode 1463",
        "url": "https://leetcode.com/problems/cherry-pickup-ii/"
      },
      "examples": [
        {
          "input": "grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]",
          "output": "24",
          "explanation": "The best robot paths collect 24 cherries."
        },
        {
          "input": "grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]",
          "output": "28",
          "explanation": "The robots separate to collect high-value cells."
        },
        {
          "input": "grid = [[1,1],[1,1]]",
          "output": "4",
          "explanation": "Both robots collect all four cells."
        }
      ],
      "bruteForceComplexity": "Time O(9^rows); Space O(rows). Plain recursion tries every movement pair.",
      "optimizedComplexity": "Time O(rows * cols^2 * 9); Space O(cols^2). Rolling DP stores both robot columns.",
      "recursiveComplexity": "Time O(rows * cols^2 * 9); Space O(rows * cols^2). Memoization stores row and two columns.",
      "bruteForceCode": "class Solution {\n  public int cherryPickup(int[][] grid) {\n    return collect(grid, 0, 0, grid[0].length - 1);\n  }\n\n  private int collect(int[][] grid, int row, int col1, int col2) {\n    if (col1 < 0 || col2 < 0 || col1 == grid[0].length || col2 == grid[0].length) return -1_000_000;\n    int cherries = grid[row][col1];\n    if (col1 != col2) cherries += grid[row][col2];\n    if (row == grid.length - 1) return cherries;\n\n    int bestNext = 0;\n    for (int d1 = -1; d1 <= 1; d1++) {\n      for (int d2 = -1; d2 <= 1; d2++) {\n        bestNext = Math.max(bestNext, collect(grid, row + 1, col1 + d1, col2 + d2));\n      }\n    }\n    return cherries + bestNext;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    int[][] dp = new int[cols][cols];\n    for (int[] row : dp) Arrays.fill(row, -1_000_000);\n    dp[0][cols - 1] = grid[0][0] + (cols == 1 ? 0 : grid[0][cols - 1]);\n\n    for (int row = 1; row < rows; row++) {\n      int[][] next = new int[cols][cols];\n      for (int[] line : next) Arrays.fill(line, -1_000_000);\n      for (int col1 = 0; col1 < cols; col1++) {\n        for (int col2 = 0; col2 < cols; col2++) {\n          for (int d1 = -1; d1 <= 1; d1++) {\n            for (int d2 = -1; d2 <= 1; d2++) {\n              int prev1 = col1 - d1;\n              int prev2 = col2 - d2;\n              if (prev1 < 0 || prev2 < 0 || prev1 == cols || prev2 == cols) continue;\n              int cherries = grid[row][col1] + (col1 == col2 ? 0 : grid[row][col2]);\n              next[col1][col2] = Math.max(next[col1][col2], dp[prev1][prev2] + cherries);\n            }\n          }\n        }\n      }\n      dp = next;\n    }\n\n    int best = 0;\n    for (int[] row : dp) {\n      for (int value : row) best = Math.max(best, value);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    int[][][] memo = new int[rows][cols][cols];\n    for (int[][] layer : memo) {\n      for (int[] row : layer) Arrays.fill(row, -1);\n    }\n    return dp(grid, 0, 0, cols - 1, memo);\n  }\n\n  private int dp(int[][] grid, int row, int col1, int col2, int[][][] memo) {\n    if (col1 < 0 || col2 < 0 || col1 == grid[0].length || col2 == grid[0].length) return -1_000_000;\n    if (memo[row][col1][col2] != -1) return memo[row][col1][col2];\n    int cherries = grid[row][col1] + (col1 == col2 ? 0 : grid[row][col2]);\n    if (row == grid.length - 1) return cherries;\n    int bestNext = 0;\n    for (int d1 = -1; d1 <= 1; d1++) {\n      for (int d2 = -1; d2 <= 1; d2++) {\n        bestNext = Math.max(bestNext, dp(grid, row + 1, col1 + d1, col2 + d2, memo));\n      }\n    }\n    memo[row][col1][col2] = cherries + bestNext;\n    return memo[row][col1][col2];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    int[][] dp = new int[cols][cols];\n    for (int[] row : dp) Arrays.fill(row, -1_000_000);\n    dp[0][cols - 1] = grid[0][0] + (cols == 1 ? 0 : grid[0][cols - 1]);\n\n    for (int row = 1; row < rows; row++) {\n      int[][] next = new int[cols][cols];\n      for (int[] line : next) Arrays.fill(line, -1_000_000);\n      for (int col1 = 0; col1 < cols; col1++) {\n        for (int col2 = 0; col2 < cols; col2++) {\n          for (int d1 = -1; d1 <= 1; d1++) {\n            for (int d2 = -1; d2 <= 1; d2++) {\n              int prev1 = col1 - d1;\n              int prev2 = col2 - d2;\n              if (prev1 < 0 || prev2 < 0 || prev1 == cols || prev2 == cols) continue;\n              int cherries = grid[row][col1] + (col1 == col2 ? 0 : grid[row][col2]);\n              next[col1][col2] = Math.max(next[col1][col2], dp[prev1][prev2] + cherries);\n            }\n          }\n        }\n      }\n      dp = next;\n    }\n\n    int best = 0;\n    for (int[] row : dp) {\n      for (int value : row) best = Math.max(best, value);\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int cherryPickup(int[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    int[][] dp = new int[cols][cols];\n    for (int[] row : dp) Arrays.fill(row, -1_000_000);\n    dp[0][cols - 1] = grid[0][0] + (cols == 1 ? 0 : grid[0][cols - 1]);\n\n    for (int row = 1; row < rows; row++) {\n      int[][] next = new int[cols][cols];\n      for (int[] line : next) Arrays.fill(line, -1_000_000);\n      for (int col1 = 0; col1 < cols; col1++) {\n        for (int col2 = 0; col2 < cols; col2++) {\n          for (int d1 = -1; d1 <= 1; d1++) {\n            for (int d2 = -1; d2 <= 1; d2++) {\n              int prev1 = col1 - d1;\n              int prev2 = col2 - d2;\n              if (prev1 < 0 || prev2 < 0 || prev1 == cols || prev2 == cols) continue;\n              int cherries = grid[row][col1] + (col1 == col2 ? 0 : grid[row][col2]);\n              next[col1][col2] = Math.max(next[col1][col2], dp[prev1][prev2] + cherries);\n            }\n          }\n        }\n      }\n      dp = next;\n    }\n\n    int best = 0;\n    for (int[] row : dp) {\n      for (int value : row) best = Math.max(best, value);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Burst Balloons",
      "difficulty": "Hard",
      "subpattern": "Interval partition DP",
      "question": "Given balloons with values, choose an order to burst them. Bursting i earns leftValue * nums[i] * rightValue using the nearest remaining neighbors. Return the maximum coins.",
      "trigger": "Choosing the last balloon inside an interval separates the left and right subproblems.",
      "intuition": "Fix the last burst in each interval so its boundary neighbors are known.",
      "edgeCases": "One balloon, zeros, all ones, high values near boundaries, repeated values.",
      "constraints": "1 <= nums.length <= 300; 0 <= nums[i] <= 100.",
      "source": {
        "label": "Burst Balloons - LeetCode 312",
        "url": "https://leetcode.com/problems/burst-balloons/"
      },
      "examples": [
        {
          "input": "nums = [3,1,5,8]",
          "output": "167",
          "explanation": "The best order produces 167 coins."
        },
        {
          "input": "nums = [1,5]",
          "output": "10",
          "explanation": "Bursting 1 then 5 gives 10 coins."
        },
        {
          "input": "nums = [0,9]",
          "output": "9",
          "explanation": "The zero contributes no coins when burst."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(n). Plain interval recursion tries every last balloon repeatedly.",
      "optimizedComplexity": "Time O(n^3); Space O(n^2). Bottom-up interval DP fills shorter intervals first.",
      "recursiveComplexity": "Time O(n^3); Space O(n^2). Memoized interval recursion stores each open interval.",
      "bruteForceCode": "class Solution {\n  public int maxCoins(int[] nums) {\n    int[] values = build(nums);\n    return best(values, 1, nums.length);\n  }\n\n  private int best(int[] values, int left, int right) {\n    if (left > right) return 0;\n    int answer = 0;\n    for (int last = left; last <= right; last++) {\n      int coins = values[left - 1] * values[last] * values[right + 1];\n      coins += best(values, left, last - 1) + best(values, last + 1, right);\n      answer = Math.max(answer, coins);\n    }\n    return answer;\n  }\n\n  private int[] build(int[] nums) {\n    int[] values = new int[nums.length + 2];\n    values[0] = values[values.length - 1] = 1;\n    for (int i = 0; i < nums.length; i++) values[i + 1] = nums[i];\n    return values;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxCoins(int[] nums) {\n    int n = nums.length;\n    int[] values = new int[n + 2];\n    values[0] = values[n + 1] = 1;\n    for (int i = 0; i < n; i++) values[i + 1] = nums[i];\n\n    int[][] dp = new int[n + 2][n + 2];\n    for (int length = 1; length <= n; length++) {\n      for (int left = 1; left + length - 1 <= n; left++) {\n        int right = left + length - 1;\n        for (int last = left; last <= right; last++) {\n          int coins = values[left - 1] * values[last] * values[right + 1];\n          coins += dp[left][last - 1] + dp[last + 1][right];\n          dp[left][right] = Math.max(dp[left][right], coins);\n        }\n      }\n    }\n    return dp[1][n];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxCoins(int[] nums) {\n    int n = nums.length;\n    int[] values = new int[n + 2];\n    values[0] = values[n + 1] = 1;\n    for (int i = 0; i < n; i++) values[i + 1] = nums[i];\n    int[][] memo = new int[n + 2][n + 2];\n    return dp(values, 1, n, memo);\n  }\n\n  private int dp(int[] values, int left, int right, int[][] memo) {\n    if (left > right) return 0;\n    if (memo[left][right] != 0) return memo[left][right];\n    for (int last = left; last <= right; last++) {\n      int coins = values[left - 1] * values[last] * values[right + 1];\n      coins += dp(values, left, last - 1, memo) + dp(values, last + 1, right, memo);\n      memo[left][right] = Math.max(memo[left][right], coins);\n    }\n    return memo[left][right];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxCoins(int[] nums) {\n    int n = nums.length;\n    int[] values = new int[n + 2];\n    values[0] = values[n + 1] = 1;\n    for (int i = 0; i < n; i++) values[i + 1] = nums[i];\n\n    int[][] dp = new int[n + 2][n + 2];\n    for (int length = 1; length <= n; length++) {\n      for (int left = 1; left + length - 1 <= n; left++) {\n        int right = left + length - 1;\n        for (int last = left; last <= right; last++) {\n          int coins = values[left - 1] * values[last] * values[right + 1];\n          coins += dp[left][last - 1] + dp[last + 1][right];\n          dp[left][right] = Math.max(dp[left][right], coins);\n        }\n      }\n    }\n    return dp[1][n];\n  }\n}",
      "code": "class Solution {\n  public int maxCoins(int[] nums) {\n    int n = nums.length;\n    int[] values = new int[n + 2];\n    values[0] = values[n + 1] = 1;\n    for (int i = 0; i < n; i++) values[i + 1] = nums[i];\n\n    int[][] dp = new int[n + 2][n + 2];\n    for (int length = 1; length <= n; length++) {\n      for (int left = 1; left + length - 1 <= n; left++) {\n        int right = left + length - 1;\n        for (int last = left; last <= right; last++) {\n          int coins = values[left - 1] * values[last] * values[right + 1];\n          coins += dp[left][last - 1] + dp[last + 1][right];\n          dp[left][right] = Math.max(dp[left][right], coins);\n        }\n      }\n    }\n    return dp[1][n];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Score Triangulation of Polygon",
      "difficulty": "Medium",
      "subpattern": "Interval partition DP",
      "question": "Given polygon vertex values, triangulate the polygon to minimize the sum of triangle scores where each triangle score is the product of its three vertex values.",
      "trigger": "Choosing one triangle across an interval splits the polygon interval into two smaller intervals.",
      "intuition": "For every edge interval, try each middle vertex as the triangle that connects the endpoints.",
      "edgeCases": "Exactly three vertices, repeated values, one very large value, optimal split near edge, all equal values.",
      "constraints": "3 <= values.length <= 50; 1 <= values[i] <= 100.",
      "source": {
        "label": "Minimum Score Triangulation of Polygon - LeetCode 1039",
        "url": "https://leetcode.com/problems/minimum-score-triangulation-of-polygon/"
      },
      "examples": [
        {
          "input": "values = [1,2,3]",
          "output": "6",
          "explanation": "Only one triangle exists."
        },
        {
          "input": "values = [3,7,4,5]",
          "output": "144",
          "explanation": "The minimum triangulation score is 144."
        },
        {
          "input": "values = [1,3,1,4,1,5]",
          "output": "13",
          "explanation": "Choosing low-value triangle products minimizes the sum."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(n). Plain interval recursion recomputes overlapping polygon intervals.",
      "optimizedComplexity": "Time O(n^3); Space O(n^2). Bottom-up interval DP tries each split vertex.",
      "recursiveComplexity": "Time O(n^3); Space O(n^2). Memoization stores each endpoint interval.",
      "bruteForceCode": "class Solution {\n  public int minScoreTriangulation(int[] values) {\n    return score(values, 0, values.length - 1);\n  }\n\n  private int score(int[] values, int left, int right) {\n    if (right - left < 2) return 0;\n    int best = Integer.MAX_VALUE;\n    for (int mid = left + 1; mid < right; mid++) {\n      int triangle = values[left] * values[mid] * values[right];\n      best = Math.min(best, triangle + score(values, left, mid) + score(values, mid, right));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minScoreTriangulation(int[] values) {\n    int n = values.length;\n    int[][] dp = new int[n][n];\n\n    for (int length = 3; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        dp[left][right] = Integer.MAX_VALUE;\n        for (int mid = left + 1; mid < right; mid++) {\n          int triangle = values[left] * values[mid] * values[right];\n          dp[left][right] = Math.min(dp[left][right], triangle + dp[left][mid] + dp[mid][right]);\n        }\n      }\n    }\n    return dp[0][n - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minScoreTriangulation(int[] values) {\n    int n = values.length;\n    int[][] memo = new int[n][n];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(values, 0, n - 1, memo);\n  }\n\n  private int dp(int[] values, int left, int right, int[][] memo) {\n    if (right - left < 2) return 0;\n    if (memo[left][right] != -1) return memo[left][right];\n    int best = Integer.MAX_VALUE;\n    for (int mid = left + 1; mid < right; mid++) {\n      int triangle = values[left] * values[mid] * values[right];\n      best = Math.min(best, triangle + dp(values, left, mid, memo) + dp(values, mid, right, memo));\n    }\n    memo[left][right] = best;\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minScoreTriangulation(int[] values) {\n    int n = values.length;\n    int[][] dp = new int[n][n];\n\n    for (int length = 3; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        dp[left][right] = Integer.MAX_VALUE;\n        for (int mid = left + 1; mid < right; mid++) {\n          int triangle = values[left] * values[mid] * values[right];\n          dp[left][right] = Math.min(dp[left][right], triangle + dp[left][mid] + dp[mid][right]);\n        }\n      }\n    }\n    return dp[0][n - 1];\n  }\n}",
      "code": "class Solution {\n  public int minScoreTriangulation(int[] values) {\n    int n = values.length;\n    int[][] dp = new int[n][n];\n\n    for (int length = 3; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        dp[left][right] = Integer.MAX_VALUE;\n        for (int mid = left + 1; mid < right; mid++) {\n          int triangle = values[left] * values[mid] * values[right];\n          dp[left][right] = Math.min(dp[left][right], triangle + dp[left][mid] + dp[mid][right]);\n        }\n      }\n    }\n    return dp[0][n - 1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Falling Path Sum",
      "difficulty": "Medium",
      "subpattern": "Grid path minimization DP",
      "question": "Given an n x n matrix, choose one element from each row so that each next row uses the same column, column - 1, or column + 1. Return the minimum path sum.",
      "trigger": "Each cell depends on up to three cells from the previous row.",
      "intuition": "Keep the cheapest cost to land in every column of the current row.",
      "edgeCases": "One cell, negative values, best path touches border, all positive values, all equal values.",
      "constraints": "1 <= n <= 100; -100 <= matrix[i][j] <= 100.",
      "source": {
        "label": "Minimum Falling Path Sum - LeetCode 931",
        "url": "https://leetcode.com/problems/minimum-falling-path-sum/"
      },
      "examples": [
        {
          "input": "matrix = [[2,1,3],[6,5,4],[7,8,9]]",
          "output": "13",
          "explanation": "The path 1 -> 4 -> 8 has sum 13."
        },
        {
          "input": "matrix = [[-19,57],[-40,-5]]",
          "output": "-59",
          "explanation": "The path -19 -> -40 has sum -59."
        },
        {
          "input": "matrix = [[5]]",
          "output": "5",
          "explanation": "The only cell is the path."
        }
      ],
      "bruteForceComplexity": "Time O(n * 3^n); Space O(n). Plain recursion starts from every top-row column and branches downward.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Rolling DP stores previous row costs.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoization stores row and column states.",
      "bruteForceCode": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int best = Integer.MAX_VALUE;\n    for (int col = 0; col < matrix.length; col++) {\n      best = Math.min(best, fall(matrix, 0, col));\n    }\n    return best;\n  }\n\n  private int fall(int[][] matrix, int row, int col) {\n    if (col < 0 || col == matrix.length) return Integer.MAX_VALUE / 4;\n    if (row == matrix.length - 1) return matrix[row][col];\n    int next = Math.min(fall(matrix, row + 1, col - 1), Math.min(fall(matrix, row + 1, col), fall(matrix, row + 1, col + 1)));\n    return matrix[row][col] + next;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int n = matrix.length;\n    int[] dp = new int[n];\n    for (int col = 0; col < n; col++) dp[col] = matrix[0][col];\n\n    for (int row = 1; row < n; row++) {\n      int[] next = new int[n];\n      for (int col = 0; col < n; col++) {\n        int best = dp[col];\n        if (col > 0) best = Math.min(best, dp[col - 1]);\n        if (col + 1 < n) best = Math.min(best, dp[col + 1]);\n        next[col] = matrix[row][col] + best;\n      }\n      dp = next;\n    }\n\n    int answer = Integer.MAX_VALUE;\n    for (int value : dp) answer = Math.min(answer, value);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int n = matrix.length;\n    int[][] memo = new int[n][n];\n    for (int[] row : memo) Arrays.fill(row, Integer.MAX_VALUE);\n    int best = Integer.MAX_VALUE;\n    for (int col = 0; col < n; col++) {\n      best = Math.min(best, dp(matrix, 0, col, memo));\n    }\n    return best;\n  }\n\n  private int dp(int[][] matrix, int row, int col, int[][] memo) {\n    if (col < 0 || col == matrix.length) return Integer.MAX_VALUE / 4;\n    if (row == matrix.length - 1) return matrix[row][col];\n    if (memo[row][col] != Integer.MAX_VALUE) return memo[row][col];\n    int next = Math.min(dp(matrix, row + 1, col - 1, memo), Math.min(dp(matrix, row + 1, col, memo), dp(matrix, row + 1, col + 1, memo)));\n    memo[row][col] = matrix[row][col] + next;\n    return memo[row][col];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int n = matrix.length;\n    int[] dp = new int[n];\n    for (int col = 0; col < n; col++) dp[col] = matrix[0][col];\n\n    for (int row = 1; row < n; row++) {\n      int[] next = new int[n];\n      for (int col = 0; col < n; col++) {\n        int best = dp[col];\n        if (col > 0) best = Math.min(best, dp[col - 1]);\n        if (col + 1 < n) best = Math.min(best, dp[col + 1]);\n        next[col] = matrix[row][col] + best;\n      }\n      dp = next;\n    }\n\n    int answer = Integer.MAX_VALUE;\n    for (int value : dp) answer = Math.min(answer, value);\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int minFallingPathSum(int[][] matrix) {\n    int n = matrix.length;\n    int[] dp = new int[n];\n    for (int col = 0; col < n; col++) dp[col] = matrix[0][col];\n\n    for (int row = 1; row < n; row++) {\n      int[] next = new int[n];\n      for (int col = 0; col < n; col++) {\n        int best = dp[col];\n        if (col > 0) best = Math.min(best, dp[col - 1]);\n        if (col + 1 < n) best = Math.min(best, dp[col + 1]);\n        next[col] = matrix[row][col] + best;\n      }\n      dp = next;\n    }\n\n    int answer = Integer.MAX_VALUE;\n    for (int value : dp) answer = Math.min(answer, value);\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Number of Dice Rolls With Target Sum",
      "difficulty": "Medium",
      "subpattern": "Counting DP with bounded transitions",
      "question": "Given n dice with k faces numbered 1 to k, return the number of ways to roll exactly target modulo 1,000,000,007.",
      "trigger": "The state is dice used and sum reached, with each die adding one of k possible face values.",
      "intuition": "For every die count, build target counts from the previous die count.",
      "edgeCases": "Target below n, target above n * k, one die, modulo accumulation, k larger than target.",
      "constraints": "1 <= n, k <= 30; 1 <= target <= 1000.",
      "source": {
        "label": "Number of Dice Rolls With Target Sum - LeetCode 1155",
        "url": "https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/"
      },
      "examples": [
        {
          "input": "n = 1, k = 6, target = 3",
          "output": "1",
          "explanation": "Only rolling 3 works."
        },
        {
          "input": "n = 2, k = 6, target = 7",
          "output": "6",
          "explanation": "The pairs are 1+6 through 6+1."
        },
        {
          "input": "n = 30, k = 30, target = 500",
          "output": "222616187",
          "explanation": "The answer is returned modulo 1,000,000,007."
        }
      ],
      "bruteForceComplexity": "Time O(k^n); Space O(n). Plain recursion tries every face on every die.",
      "optimizedComplexity": "Time O(n * target * k); Space O(target). Rolling DP stores counts for the previous dice count.",
      "recursiveComplexity": "Time O(n * target * k); Space O(n * target). Memoization stores remaining dice and remaining target.",
      "bruteForceCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int numRollsToTarget(int n, int k, int target) {\n    return count(n, k, target);\n  }\n\n  private int count(int dice, int faces, int target) {\n    if (dice == 0) return target == 0 ? 1 : 0;\n    long ways = 0;\n    for (int face = 1; face <= faces; face++) {\n      ways += count(dice - 1, faces, target - face);\n    }\n    return (int) (ways % MOD);\n  }\n}",
      "iterativeCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int numRollsToTarget(int n, int k, int target) {\n    int[] dp = new int[target + 1];\n    dp[0] = 1;\n\n    for (int dice = 1; dice <= n; dice++) {\n      int[] next = new int[target + 1];\n      for (int sum = 1; sum <= target; sum++) {\n        long ways = 0;\n        for (int face = 1; face <= k && face <= sum; face++) {\n          ways += dp[sum - face];\n        }\n        next[sum] = (int) (ways % MOD);\n      }\n      dp = next;\n    }\n    return dp[target];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int numRollsToTarget(int n, int k, int target) {\n    int[][] memo = new int[n + 1][target + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(n, k, target, memo);\n  }\n\n  private int dp(int dice, int faces, int target, int[][] memo) {\n    if (target < 0) return 0;\n    if (dice == 0) return target == 0 ? 1 : 0;\n    if (memo[dice][target] != -1) return memo[dice][target];\n    long ways = 0;\n    for (int face = 1; face <= faces && face <= target; face++) {\n      ways += dp(dice - 1, faces, target - face, memo);\n    }\n    memo[dice][target] = (int) (ways % MOD);\n    return memo[dice][target];\n  }\n}",
      "optimizedCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int numRollsToTarget(int n, int k, int target) {\n    int[] dp = new int[target + 1];\n    dp[0] = 1;\n\n    for (int dice = 1; dice <= n; dice++) {\n      int[] next = new int[target + 1];\n      for (int sum = 1; sum <= target; sum++) {\n        long ways = 0;\n        for (int face = 1; face <= k && face <= sum; face++) {\n          ways += dp[sum - face];\n        }\n        next[sum] = (int) (ways % MOD);\n      }\n      dp = next;\n    }\n    return dp[target];\n  }\n}",
      "code": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int numRollsToTarget(int n, int k, int target) {\n    int[] dp = new int[target + 1];\n    dp[0] = 1;\n\n    for (int dice = 1; dice <= n; dice++) {\n      int[] next = new int[target + 1];\n      for (int sum = 1; sum <= target; sum++) {\n        long ways = 0;\n        for (int face = 1; face <= k && face <= sum; face++) {\n          ways += dp[sum - face];\n        }\n        next[sum] = (int) (ways % MOD);\n      }\n      dp = next;\n    }\n    return dp[target];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Profitable Schemes",
      "difficulty": "Hard",
      "subpattern": "2D knapsack with capped profit",
      "question": "Given jobs with group size and profit, count schemes using at most n people that earn at least minProfit. Return the count modulo 1,000,000,007.",
      "trigger": "The state needs people used and profit earned, but profit can be capped at minProfit.",
      "intuition": "Capping profit keeps every already-profitable scheme in the same final bucket.",
      "edgeCases": "minProfit zero, jobs with zero profit, people limit too small, all jobs fit, modulo count.",
      "constraints": "1 <= n <= 100; 0 <= minProfit <= 100; 1 <= group.length, profit.length <= 100.",
      "source": {
        "label": "Profitable Schemes - LeetCode 879",
        "url": "https://leetcode.com/problems/profitable-schemes/"
      },
      "examples": [
        {
          "input": "n = 5, minProfit = 3, group = [2,2], profit = [2,3]",
          "output": "2",
          "explanation": "Either take the second job or both jobs."
        },
        {
          "input": "n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]",
          "output": "7",
          "explanation": "Seven job subsets meet the profit and people constraints."
        },
        {
          "input": "n = 1, minProfit = 1, group = [2], profit = [1]",
          "output": "0",
          "explanation": "The only job needs too many people."
        }
      ],
      "bruteForceComplexity": "Time O(2^jobs); Space O(jobs). Plain recursion tries taking or skipping each job.",
      "optimizedComplexity": "Time O(jobs * n * minProfit); Space O(n * minProfit). Descending 2D knapsack avoids reusing a job.",
      "recursiveComplexity": "Time O(jobs * n * minProfit); Space O(jobs * n * minProfit). Memoization stores index, people used, and capped profit.",
      "bruteForceCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {\n    return count(0, 0, 0, n, minProfit, group, profit);\n  }\n\n  private int count(int index, int people, int earned, int limit, int minProfit, int[] group, int[] profit) {\n    if (people > limit) return 0;\n    if (index == group.length) return earned >= minProfit ? 1 : 0;\n    int skip = count(index + 1, people, earned, limit, minProfit, group, profit);\n    int take = count(index + 1, people + group[index], earned + profit[index], limit, minProfit, group, profit);\n    return (skip + take) % MOD;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {\n    int[][] dp = new int[n + 1][minProfit + 1];\n    dp[0][0] = 1;\n\n    for (int job = 0; job < group.length; job++) {\n      int peopleNeeded = group[job];\n      int profitEarned = profit[job];\n      for (int people = n; people >= peopleNeeded; people--) {\n        for (int earned = minProfit; earned >= 0; earned--) {\n          int nextProfit = Math.min(minProfit, earned + profitEarned);\n          dp[people][nextProfit] = (dp[people][nextProfit] + dp[people - peopleNeeded][earned]) % MOD;\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int people = 0; people <= n; people++) {\n      answer = (answer + dp[people][minProfit]) % MOD;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {\n    Integer[][][] memo = new Integer[group.length][n + 1][minProfit + 1];\n    return dp(0, 0, 0, n, minProfit, group, profit, memo);\n  }\n\n  private int dp(int index, int people, int earned, int limit, int minProfit, int[] group, int[] profit, Integer[][][] memo) {\n    if (people > limit) return 0;\n    if (index == group.length) return earned == minProfit ? 1 : 0;\n    if (memo[index][people][earned] != null) return memo[index][people][earned];\n    int skip = dp(index + 1, people, earned, limit, minProfit, group, profit, memo);\n    int nextProfit = Math.min(minProfit, earned + profit[index]);\n    int take = dp(index + 1, people + group[index], nextProfit, limit, minProfit, group, profit, memo);\n    memo[index][people][earned] = (skip + take) % MOD;\n    return memo[index][people][earned];\n  }\n}",
      "optimizedCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {\n    int[][] dp = new int[n + 1][minProfit + 1];\n    dp[0][0] = 1;\n\n    for (int job = 0; job < group.length; job++) {\n      int peopleNeeded = group[job];\n      int profitEarned = profit[job];\n      for (int people = n; people >= peopleNeeded; people--) {\n        for (int earned = minProfit; earned >= 0; earned--) {\n          int nextProfit = Math.min(minProfit, earned + profitEarned);\n          dp[people][nextProfit] = (dp[people][nextProfit] + dp[people - peopleNeeded][earned]) % MOD;\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int people = 0; people <= n; people++) {\n      answer = (answer + dp[people][minProfit]) % MOD;\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {\n    int[][] dp = new int[n + 1][minProfit + 1];\n    dp[0][0] = 1;\n\n    for (int job = 0; job < group.length; job++) {\n      int peopleNeeded = group[job];\n      int profitEarned = profit[job];\n      for (int people = n; people >= peopleNeeded; people--) {\n        for (int earned = minProfit; earned >= 0; earned--) {\n          int nextProfit = Math.min(minProfit, earned + profitEarned);\n          dp[people][nextProfit] = (dp[people][nextProfit] + dp[people - peopleNeeded][earned]) % MOD;\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int people = 0; people <= n; people++) {\n      answer = (answer + dp[people][minProfit]) % MOD;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Shortest Common Supersequence",
      "difficulty": "Hard",
      "subpattern": "Two-string reconstruction DP",
      "question": "Given two strings, return the shortest string that has both input strings as subsequences.",
      "trigger": "The state compares prefixes of both strings, and reconstruction follows the LCS table.",
      "intuition": "Keep common characters once and insert non-common characters from the side with the better remaining LCS.",
      "edgeCases": "One empty string, equal strings, no common characters, repeated characters, one string already subsequence of the other.",
      "constraints": "1 <= str1.length, str2.length <= 1000; strings contain lowercase English letters.",
      "source": {
        "label": "Shortest Common Supersequence - LeetCode 1092",
        "url": "https://leetcode.com/problems/shortest-common-supersequence/"
      },
      "examples": [
        {
          "input": "str1 = \"abac\", str2 = \"cab\"",
          "output": "\"cabac\"",
          "explanation": "cabac contains both strings as subsequences."
        },
        {
          "input": "str1 = \"aaaaaaaa\", str2 = \"aaaaaaaa\"",
          "output": "\"aaaaaaaa\"",
          "explanation": "The strings are already identical."
        },
        {
          "input": "str1 = \"abc\", str2 = \"def\"",
          "output": "\"abcdef\"",
          "explanation": "No characters can be shared."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(m+n). Plain recursion builds both choices when characters differ.",
      "optimizedComplexity": "Time O(mn); Space O(mn). LCS table guides one reconstruction pass.",
      "recursiveComplexity": "Time O(mn * (m+n)); Space O(mn * (m+n)). Memoization stores constructed strings for index pairs.",
      "bruteForceCode": "class Solution {\n  public String shortestCommonSupersequence(String str1, String str2) {\n    return build(str1, str2, 0, 0);\n  }\n\n  private String build(String a, String b, int i, int j) {\n    if (i == a.length()) return b.substring(j);\n    if (j == b.length()) return a.substring(i);\n    if (a.charAt(i) == b.charAt(j)) {\n      return a.charAt(i) + build(a, b, i + 1, j + 1);\n    }\n    String takeA = a.charAt(i) + build(a, b, i + 1, j);\n    String takeB = b.charAt(j) + build(a, b, i, j + 1);\n    return takeA.length() <= takeB.length() ? takeA : takeB;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String shortestCommonSupersequence(String str1, String str2) {\n    int m = str1.length();\n    int n = str2.length();\n    int[][] lcs = new int[m + 1][n + 1];\n\n    for (int i = 1; i <= m; i++) {\n      for (int j = 1; j <= n; j++) {\n        if (str1.charAt(i - 1) == str2.charAt(j - 1)) {\n          lcs[i][j] = 1 + lcs[i - 1][j - 1];\n        } else {\n          lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);\n        }\n      }\n    }\n\n    StringBuilder answer = new StringBuilder();\n    int i = m;\n    int j = n;\n    while (i > 0 && j > 0) {\n      if (str1.charAt(i - 1) == str2.charAt(j - 1)) {\n        answer.append(str1.charAt(i - 1));\n        i--;\n        j--;\n      } else if (lcs[i - 1][j] >= lcs[i][j - 1]) {\n        answer.append(str1.charAt(i - 1));\n        i--;\n      } else {\n        answer.append(str2.charAt(j - 1));\n        j--;\n      }\n    }\n    while (i > 0) answer.append(str1.charAt(--i));\n    while (j > 0) answer.append(str2.charAt(--j));\n    return answer.reverse().toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String shortestCommonSupersequence(String str1, String str2) {\n    String[][] memo = new String[str1.length() + 1][str2.length() + 1];\n    return dp(str1, str2, 0, 0, memo);\n  }\n\n  private String dp(String a, String b, int i, int j, String[][] memo) {\n    if (i == a.length()) return b.substring(j);\n    if (j == b.length()) return a.substring(i);\n    if (memo[i][j] != null) return memo[i][j];\n    if (a.charAt(i) == b.charAt(j)) {\n      memo[i][j] = a.charAt(i) + dp(a, b, i + 1, j + 1, memo);\n      return memo[i][j];\n    }\n    String takeA = a.charAt(i) + dp(a, b, i + 1, j, memo);\n    String takeB = b.charAt(j) + dp(a, b, i, j + 1, memo);\n    memo[i][j] = takeA.length() <= takeB.length() ? takeA : takeB;\n    return memo[i][j];\n  }\n}",
      "optimizedCode": "class Solution {\n  public String shortestCommonSupersequence(String str1, String str2) {\n    int m = str1.length();\n    int n = str2.length();\n    int[][] lcs = new int[m + 1][n + 1];\n\n    for (int i = 1; i <= m; i++) {\n      for (int j = 1; j <= n; j++) {\n        if (str1.charAt(i - 1) == str2.charAt(j - 1)) {\n          lcs[i][j] = 1 + lcs[i - 1][j - 1];\n        } else {\n          lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);\n        }\n      }\n    }\n\n    StringBuilder answer = new StringBuilder();\n    int i = m;\n    int j = n;\n    while (i > 0 && j > 0) {\n      if (str1.charAt(i - 1) == str2.charAt(j - 1)) {\n        answer.append(str1.charAt(i - 1));\n        i--;\n        j--;\n      } else if (lcs[i - 1][j] >= lcs[i][j - 1]) {\n        answer.append(str1.charAt(i - 1));\n        i--;\n      } else {\n        answer.append(str2.charAt(j - 1));\n        j--;\n      }\n    }\n    while (i > 0) answer.append(str1.charAt(--i));\n    while (j > 0) answer.append(str2.charAt(--j));\n    return answer.reverse().toString();\n  }\n}",
      "code": "class Solution {\n  public String shortestCommonSupersequence(String str1, String str2) {\n    int m = str1.length();\n    int n = str2.length();\n    int[][] lcs = new int[m + 1][n + 1];\n\n    for (int i = 1; i <= m; i++) {\n      for (int j = 1; j <= n; j++) {\n        if (str1.charAt(i - 1) == str2.charAt(j - 1)) {\n          lcs[i][j] = 1 + lcs[i - 1][j - 1];\n        } else {\n          lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);\n        }\n      }\n    }\n\n    StringBuilder answer = new StringBuilder();\n    int i = m;\n    int j = n;\n    while (i > 0 && j > 0) {\n      if (str1.charAt(i - 1) == str2.charAt(j - 1)) {\n        answer.append(str1.charAt(i - 1));\n        i--;\n        j--;\n      } else if (lcs[i - 1][j] >= lcs[i][j - 1]) {\n        answer.append(str1.charAt(i - 1));\n        i--;\n      } else {\n        answer.append(str2.charAt(j - 1));\n        j--;\n      }\n    }\n    while (i > 0) answer.append(str1.charAt(--i));\n    while (j > 0) answer.append(str2.charAt(--j));\n    return answer.reverse().toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Stone Game",
      "difficulty": "Medium",
      "subpattern": "Interval game DP",
      "question": "Given an even number of piles where players alternately take the leftmost or rightmost pile, return true if Alice can collect more stones than Bob with optimal play.",
      "trigger": "The choice at an interval changes the score difference for the remaining interval.",
      "intuition": "Store the maximum score difference the current player can force from each interval.",
      "edgeCases": "Two piles, equal-looking choices, large edge pile, symmetric piles, negative difference avoided by constraints.",
      "constraints": "2 <= piles.length <= 500; piles.length is even; 1 <= piles[i] <= 500; total stones is odd.",
      "source": {
        "label": "Stone Game - LeetCode 877",
        "url": "https://leetcode.com/problems/stone-game/"
      },
      "examples": [
        {
          "input": "piles = [5,3,4,5]",
          "output": "true",
          "explanation": "Alice can force a better total."
        },
        {
          "input": "piles = [3,7,2,3]",
          "output": "true",
          "explanation": "Alice can choose a side that preserves a winning line."
        },
        {
          "input": "piles = [1,100]",
          "output": "true",
          "explanation": "Alice takes 100 immediately."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion tries taking either interval end.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Rolling interval DP stores score differences.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoization stores every interval difference.",
      "bruteForceCode": "class Solution {\n  public boolean stoneGame(int[] piles) {\n    return diff(piles, 0, piles.length - 1) > 0;\n  }\n\n  private int diff(int[] piles, int left, int right) {\n    if (left == right) return piles[left];\n    int takeLeft = piles[left] - diff(piles, left + 1, right);\n    int takeRight = piles[right] - diff(piles, left, right - 1);\n    return Math.max(takeLeft, takeRight);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean stoneGame(int[] piles) {\n    int n = piles.length;\n    int[] dp = new int[n];\n    for (int i = 0; i < n; i++) dp[i] = piles[i];\n\n    for (int length = 2; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        int takeLeft = piles[left] - dp[left + 1];\n        int takeRight = piles[right] - dp[left];\n        dp[left] = Math.max(takeLeft, takeRight);\n      }\n    }\n    return dp[0] > 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean stoneGame(int[] piles) {\n    Integer[][] memo = new Integer[piles.length][piles.length];\n    return dp(piles, 0, piles.length - 1, memo) > 0;\n  }\n\n  private int dp(int[] piles, int left, int right, Integer[][] memo) {\n    if (left == right) return piles[left];\n    if (memo[left][right] != null) return memo[left][right];\n    int takeLeft = piles[left] - dp(piles, left + 1, right, memo);\n    int takeRight = piles[right] - dp(piles, left, right - 1, memo);\n    memo[left][right] = Math.max(takeLeft, takeRight);\n    return memo[left][right];\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean stoneGame(int[] piles) {\n    int n = piles.length;\n    int[] dp = new int[n];\n    for (int i = 0; i < n; i++) dp[i] = piles[i];\n\n    for (int length = 2; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        int takeLeft = piles[left] - dp[left + 1];\n        int takeRight = piles[right] - dp[left];\n        dp[left] = Math.max(takeLeft, takeRight);\n      }\n    }\n    return dp[0] > 0;\n  }\n}",
      "code": "class Solution {\n  public boolean stoneGame(int[] piles) {\n    int n = piles.length;\n    int[] dp = new int[n];\n    for (int i = 0; i < n; i++) dp[i] = piles[i];\n\n    for (int length = 2; length <= n; length++) {\n      for (int left = 0; left + length - 1 < n; left++) {\n        int right = left + length - 1;\n        int takeLeft = piles[left] - dp[left + 1];\n        int takeRight = piles[right] - dp[left];\n        dp[left] = Math.max(takeLeft, takeRight);\n      }\n    }\n    return dp[0] > 0;\n  }\n}"
    }
  ],
  "checklist": [
    "Two coordinates, two indexes, two strings, interval endpoints, or index plus capacity appear in the state.",
    "The question asks for count, min cost, max score, possible/impossible, or a reconstructed answer over a grid/table.",
    "A cell or interval depends on neighboring states, smaller prefixes, smaller capacities, or split points.",
    "Naive recursion repeats the same pair of indexes, row/column, interval, or capacity many times.",
    "The fill order is visible: top-left to bottom-right, bottom-right to top-left, by interval length, or by item then capacity."
  ],
  "traps": [
    "Using the wrong loop direction in 0/1 knapsack and accidentally reusing the same item.",
    "Counting permutations when the problem asks for combinations, especially coin-change variants.",
    "Forgetting obstacle, thorn, or blocked-cell states must contribute impossible or zero values.",
    "Not capping profit or target dimensions when only a threshold matters.",
    "Filling interval DP before its inner intervals are ready.",
    "Double-counting when two agents land on the same cell.",
    "Using 0 as a memo sentinel when 0 is also a valid answer."
  ],
  "edgeCases": [
    "Single row, single column, and 1 x 1 grids.",
    "Blocked start or blocked destination cells.",
    "Empty prefix states for two-string DP.",
    "Length one and length two intervals for palindrome and game DP.",
    "Target zero, odd total sum, and unreachable capacity states.",
    "Repeated characters or equal matrix values where strict movement is not allowed.",
    "Large counts that need long or modulo arithmetic."
  ],
  "complexities": [
    "Grid DP is usually O(rows * cols) time with O(cols) space after rolling compression.",
    "Two-string DP is O(mn) time and O(mn) space when reconstruction is needed; pure length/count can often use O(n).",
    "Interval DP is usually O(n^3) time and O(n^2) space because every interval tries split points.",
    "0/1 knapsack tables are O(items * capacity) or O(items * capacity1 * capacity2) depending on dimensions.",
    "Matrix DFS with memoization is O(rows * cols * directions) after each cell state is cached.",
    "Multi-agent grid DP often becomes O(steps * cols^2 * moves^2) or O(n^3) for square synchronized walkers.",
    "Brute force is normally exponential before memoization because every step branches across choices."
  ],
  "mentalModel": [
    "Name the state with exactly two moving parts before writing code.",
    "Decide whether the table means best ending here, best starting here, best inside this interval, or ways using first i items.",
    "Choose fill order from dependencies: previous row, next row, smaller interval, or previous item.",
    "Use impossible sentinels for max DP and large sentinels for min DP instead of mixing them with valid zeroes.",
    "Compress space only after the full recurrence is correct and the update direction is clear."
  ],
  "revisionStrategy": [
    "Day 1: redo Unique Paths, Minimum Path Sum, Triangle, LCS, Edit Distance, and Interleaving String with state definitions first.",
    "Day 2: redo Longest Palindromic Subsequence, Palindromic Substrings, Coin Change II, Target Sum, and Partition Equal Subset Sum.",
    "Day 4: redo Longest Increasing Path, Maximal Square, Dungeon Game, and Cherry Pickup II without looking at code.",
    "Day 7: redo Burst Balloons, Polygon Triangulation, Shortest Common Supersequence, and Stone Game from brute recursion to tabulation.",
    "Before interviews: pick five random problems and write only state, transition, base cases, and loop order in under ten minutes."
  ],
  "unseen": [
    "Given two strings, delete the fewest characters so they become equal.",
    "Given a grid with coins and traps, maximize coins from top-left to bottom-right with at most one trap removal.",
    "Given a matrix, count strictly decreasing paths from any cell to any other cell modulo a prime.",
    "Given item weights, volumes, and values, maximize value within both weight and volume limits.",
    "Given a row of numbers, two players alternately take one number from either end; return the final score difference."
  ]
};
