const CURRENT_PATTERN = {
  "id": "graphs",
  "name": "Graphs",
  "summary": "DFS, BFS, connected components, topological ordering, shortest paths, and graph-state traversal.",
  "complete": true,
  "subpatterns": [
    "Grid graph DFS and BFS",
    "Connected components in undirected graphs",
    "Directed graph cycle detection",
    "Topological sorting with indegree",
    "Multi-source BFS",
    "Shortest path in unweighted graphs",
    "Weighted shortest path with Dijkstra or Bellman-Ford",
    "Bipartite graph coloring",
    "Reverse graph traversal",
    "Graph cloning and state mapping",
    "Graph path enumeration with backtracking",
    "Implicit graph state search"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Number of Islands",
      "difficulty": "Medium",
      "subpattern": "Grid graph DFS and BFS",
      "question": "Given an m x n grid of characters 1 and 0, count how many disconnected groups of land cells exist. Land cells connect vertically and horizontally.",
      "trigger": "The grid cells are vertices and adjacent land cells are edges; each island is one connected component.",
      "intuition": "Start a traversal only when an unseen land cell is found, then mark the whole component so it is counted once.",
      "edgeCases": "Empty grid, all water, all land, one row, one column, long thin island, many tiny islands.",
      "constraints": "m == grid.length; n == grid[i].length; 1 <= m,n <= 300; grid[i][j] is 0 or 1.",
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
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    List<int[]> representatives = new ArrayList<>();\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (grid[r][c] == '0') continue;\n        boolean seenIsland = false;\n        for (int[] start : representatives) {\n          if (canReach(grid, start[0], start[1], r, c)) {\n            seenIsland = true;\n            break;\n          }\n        }\n        if (!seenIsland) representatives.add(new int[] {r, c});\n      }\n    }\n\n    return representatives.size();\n  }\n\n  private boolean canReach(char[][] grid, int sr, int sc, int tr, int tc) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    Deque<int[]> stack = new ArrayDeque<>();\n    stack.push(new int[] {sr, sc});\n    seen[sr][sc] = true;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      if (cell[0] == tr && cell[1] == tc) return true;\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n        if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n        seen[nr][nc] = true;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    boolean[][] seen = new boolean[rows][cols];\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (grid[r][c] == '0' || seen[r][c]) continue;\n        islands++;\n        Deque<int[]> queue = new ArrayDeque<>();\n        queue.offer(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == rows || nc == cols) continue;\n            if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n            seen[nr][nc] = true;\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int numIslands(char[][] grid) {\n    int islands = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == '1') {\n          islands++;\n          sink(grid, r, c);\n        }\n      }\n    }\n    return islands;\n  }\n\n  private void sink(char[][] grid, int r, int c) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid[0].length) return;\n    if (grid[r][c] != '1') return;\n\n    grid[r][c] = '0';\n    sink(grid, r + 1, c);\n    sink(grid, r - 1, c);\n    sink(grid, r, c + 1);\n    sink(grid, r, c - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    boolean[][] seen = new boolean[rows][cols];\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (grid[r][c] == '0' || seen[r][c]) continue;\n        islands++;\n        Deque<int[]> queue = new ArrayDeque<>();\n        queue.offer(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == rows || nc == cols) continue;\n            if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n            seen[nr][nc] = true;\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numIslands(char[][] grid) {\n    int rows = grid.length;\n    int cols = grid[0].length;\n    boolean[][] seen = new boolean[rows][cols];\n    int islands = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (grid[r][c] == '0' || seen[r][c]) continue;\n        islands++;\n        Deque<int[]> queue = new ArrayDeque<>();\n        queue.offer(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!queue.isEmpty()) {\n          int[] cell = queue.poll();\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == rows || nc == cols) continue;\n            if (seen[nr][nc] || grid[nr][nc] == '0') continue;\n            seen[nr][nc] = true;\n            queue.offer(new int[] {nr, nc});\n          }\n        }\n      }\n    }\n\n    return islands;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Clone Graph",
      "difficulty": "Medium",
      "subpattern": "Graph cloning and state mapping",
      "question": "Given a reference to a node in a connected undirected graph, return a deep copy of the graph.",
      "trigger": "Each original node must map to exactly one clone, and edges must be rebuilt through that map.",
      "intuition": "Create the clone the first time a node is seen; later visits reuse the mapped clone to preserve cycles.",
      "edgeCases": "Null node, single node without neighbors, self-loop, cycle, dense graph, repeated neighbor references.",
      "constraints": "0 <= nodes <= 100; 1 <= Node.val <= 100; Node.val is unique; graph is connected from the input node.",
      "source": {
        "label": "Clone Graph - LeetCode 133",
        "url": "https://leetcode.com/problems/clone-graph/"
      },
      "examples": [
        {
          "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
          "output": "[[2,4],[1,3],[2,4],[1,3]]",
          "explanation": "The four-node cycle is copied with new node objects."
        },
        {
          "input": "adjList = [[]]",
          "output": "[[]]",
          "explanation": "A single isolated node is cloned."
        },
        {
          "input": "adjList = []",
          "output": "[]",
          "explanation": "A null input returns null."
        }
      ],
      "bruteForceComplexity": "Time O(V^2 + E); Space O(V). Linear searches in the clone list replace direct hash lookups.",
      "optimizedComplexity": "Time O(V + E); Space O(V). BFS creates one clone per node and processes each edge once.",
      "recursiveComplexity": "Time O(V + E); Space O(V). DFS recursion plus the map stores cloned nodes.",
      "bruteForceCode": "import java.util.*;\n\nclass Node {\n  public int val;\n  public List<Node> neighbors;\n  public Node() { val = 0; neighbors = new ArrayList<>(); }\n  public Node(int val) { this.val = val; neighbors = new ArrayList<>(); }\n  public Node(int val, ArrayList<Node> neighbors) { this.val = val; this.neighbors = neighbors; }\n}\n\nclass Solution {\n  public Node cloneGraph(Node node) {\n    if (node == null) return null;\n    List<Node> originals = new ArrayList<>();\n    List<Node> clones = new ArrayList<>();\n    Deque<Node> queue = new ArrayDeque<>();\n    queue.offer(node);\n    originals.add(node);\n    clones.add(new Node(node.val));\n\n    while (!queue.isEmpty()) {\n      Node current = queue.poll();\n      Node copy = getClone(current, originals, clones);\n      for (Node next : current.neighbors) {\n        Node nextCopy = getClone(next, originals, clones);\n        if (nextCopy == null) {\n          originals.add(next);\n          nextCopy = new Node(next.val);\n          clones.add(nextCopy);\n          queue.offer(next);\n        }\n        copy.neighbors.add(nextCopy);\n      }\n    }\n    return clones.get(0);\n  }\n\n  private Node getClone(Node node, List<Node> originals, List<Node> clones) {\n    for (int i = 0; i < originals.size(); i++) {\n      if (originals.get(i) == node) return clones.get(i);\n    }\n    return null;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Node {\n  public int val;\n  public List<Node> neighbors;\n  public Node() { val = 0; neighbors = new ArrayList<>(); }\n  public Node(int val) { this.val = val; neighbors = new ArrayList<>(); }\n  public Node(int val, ArrayList<Node> neighbors) { this.val = val; this.neighbors = neighbors; }\n}\n\nclass Solution {\n  public Node cloneGraph(Node node) {\n    if (node == null) return null;\n    Map<Node, Node> clone = new HashMap<>();\n    Deque<Node> queue = new ArrayDeque<>();\n    clone.put(node, new Node(node.val));\n    queue.offer(node);\n\n    while (!queue.isEmpty()) {\n      Node current = queue.poll();\n      for (Node next : current.neighbors) {\n        if (!clone.containsKey(next)) {\n          clone.put(next, new Node(next.val));\n          queue.offer(next);\n        }\n        clone.get(current).neighbors.add(clone.get(next));\n      }\n    }\n    return clone.get(node);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Node {\n  public int val;\n  public List<Node> neighbors;\n  public Node() { val = 0; neighbors = new ArrayList<>(); }\n  public Node(int val) { this.val = val; neighbors = new ArrayList<>(); }\n  public Node(int val, ArrayList<Node> neighbors) { this.val = val; this.neighbors = neighbors; }\n}\n\nclass Solution {\n  public Node cloneGraph(Node node) {\n    return clone(node, new HashMap<>());\n  }\n\n  private Node clone(Node node, Map<Node, Node> copies) {\n    if (node == null) return null;\n    if (copies.containsKey(node)) return copies.get(node);\n\n    Node copy = new Node(node.val);\n    copies.put(node, copy);\n    for (Node next : node.neighbors) {\n      copy.neighbors.add(clone(next, copies));\n    }\n    return copy;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Node {\n  public int val;\n  public List<Node> neighbors;\n  public Node() { val = 0; neighbors = new ArrayList<>(); }\n  public Node(int val) { this.val = val; neighbors = new ArrayList<>(); }\n  public Node(int val, ArrayList<Node> neighbors) { this.val = val; this.neighbors = neighbors; }\n}\n\nclass Solution {\n  public Node cloneGraph(Node node) {\n    if (node == null) return null;\n    Map<Node, Node> clone = new HashMap<>();\n    Deque<Node> queue = new ArrayDeque<>();\n    clone.put(node, new Node(node.val));\n    queue.offer(node);\n\n    while (!queue.isEmpty()) {\n      Node current = queue.poll();\n      for (Node next : current.neighbors) {\n        if (!clone.containsKey(next)) {\n          clone.put(next, new Node(next.val));\n          queue.offer(next);\n        }\n        clone.get(current).neighbors.add(clone.get(next));\n      }\n    }\n    return clone.get(node);\n  }\n}",
      "code": "import java.util.*;\n\nclass Node {\n  public int val;\n  public List<Node> neighbors;\n  public Node() { val = 0; neighbors = new ArrayList<>(); }\n  public Node(int val) { this.val = val; neighbors = new ArrayList<>(); }\n  public Node(int val, ArrayList<Node> neighbors) { this.val = val; this.neighbors = neighbors; }\n}\n\nclass Solution {\n  public Node cloneGraph(Node node) {\n    if (node == null) return null;\n    Map<Node, Node> clone = new HashMap<>();\n    Deque<Node> queue = new ArrayDeque<>();\n    clone.put(node, new Node(node.val));\n    queue.offer(node);\n\n    while (!queue.isEmpty()) {\n      Node current = queue.poll();\n      for (Node next : current.neighbors) {\n        if (!clone.containsKey(next)) {\n          clone.put(next, new Node(next.val));\n          queue.offer(next);\n        }\n        clone.get(current).neighbors.add(clone.get(next));\n      }\n    }\n    return clone.get(node);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Max Area of Island",
      "difficulty": "Medium",
      "subpattern": "Grid graph DFS and BFS",
      "question": "Given a binary grid, return the maximum number of land cells in any connected island.",
      "trigger": "Area is the size of a connected component in a grid graph.",
      "intuition": "Traverse each unvisited land component once and keep the largest component size.",
      "edgeCases": "All water, all land, one cell, islands touching corners only, thin snake-shaped island.",
      "constraints": "1 <= rows, cols <= 50; grid[i][j] is 0 or 1.",
      "source": {
        "label": "Max Area of Island - LeetCode 695",
        "url": "https://leetcode.com/problems/max-area-of-island/"
      },
      "examples": [
        {
          "input": "grid = [[0,0,1,0],[1,1,1,0],[0,0,0,1]]",
          "output": "4",
          "explanation": "The largest four-direction component has four cells."
        },
        {
          "input": "grid = [[0,0,0]]",
          "output": "0",
          "explanation": "There is no island."
        },
        {
          "input": "grid = [[1,1],[1,1]]",
          "output": "4",
          "explanation": "Every cell belongs to the same island."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). A fresh traversal can be launched from many land cells.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Shared visited state avoids recounting a component.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive DFS depth can include the whole grid.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    int best = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 1) {\n          best = Math.max(best, areaFrom(grid, r, c));\n        }\n      }\n    }\n    return best;\n  }\n\n  private int areaFrom(int[][] grid, int sr, int sc) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    Deque<int[]> stack = new ArrayDeque<>();\n    int area = 0;\n    stack.push(new int[] {sr, sc});\n    seen[sr][sc] = true;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      area++;\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n        if (seen[nr][nc] || grid[nr][nc] == 0) continue;\n        seen[nr][nc] = true;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n    return area;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    int best = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 0 || seen[r][c]) continue;\n        int area = 0;\n        Deque<int[]> stack = new ArrayDeque<>();\n        stack.push(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!stack.isEmpty()) {\n          int[] cell = stack.pop();\n          area++;\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n            if (seen[nr][nc] || grid[nr][nc] == 0) continue;\n            seen[nr][nc] = true;\n            stack.push(new int[] {nr, nc});\n          }\n        }\n        best = Math.max(best, area);\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    int best = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        best = Math.max(best, dfs(grid, r, c));\n      }\n    }\n    return best;\n  }\n\n  private int dfs(int[][] grid, int r, int c) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid[0].length) return 0;\n    if (grid[r][c] == 0) return 0;\n\n    grid[r][c] = 0;\n    return 1 + dfs(grid, r + 1, c) + dfs(grid, r - 1, c)\n             + dfs(grid, r, c + 1) + dfs(grid, r, c - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    int best = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 0 || seen[r][c]) continue;\n        int area = 0;\n        Deque<int[]> stack = new ArrayDeque<>();\n        stack.push(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!stack.isEmpty()) {\n          int[] cell = stack.pop();\n          area++;\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n            if (seen[nr][nc] || grid[nr][nc] == 0) continue;\n            seen[nr][nc] = true;\n            stack.push(new int[] {nr, nc});\n          }\n        }\n        best = Math.max(best, area);\n      }\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxAreaOfIsland(int[][] grid) {\n    boolean[][] seen = new boolean[grid.length][grid[0].length];\n    int best = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 0 || seen[r][c]) continue;\n        int area = 0;\n        Deque<int[]> stack = new ArrayDeque<>();\n        stack.push(new int[] {r, c});\n        seen[r][c] = true;\n\n        while (!stack.isEmpty()) {\n          int[] cell = stack.pop();\n          area++;\n          for (int[] d : dirs) {\n            int nr = cell[0] + d[0], nc = cell[1] + d[1];\n            if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n            if (seen[nr][nc] || grid[nr][nc] == 0) continue;\n            seen[nr][nc] = true;\n            stack.push(new int[] {nr, nc});\n          }\n        }\n        best = Math.max(best, area);\n      }\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Pacific Atlantic Water Flow",
      "difficulty": "Medium",
      "subpattern": "Reverse graph traversal from borders",
      "question": "Given a matrix of heights, return all cells from which water can flow to both the Pacific and Atlantic oceans.",
      "trigger": "Flow edges depend on height; reversing traversal from each ocean avoids repeated searches from every cell.",
      "intuition": "A cell can reach an ocean if the ocean can reach that cell by moving from lower/equal height to higher/equal height.",
      "edgeCases": "Single cell, one row, one column, equal heights, strictly increasing grid, strictly decreasing grid.",
      "constraints": "1 <= m,n <= 200; 0 <= heights[i][j] <= 100000.",
      "source": {
        "label": "Pacific Atlantic Water Flow - LeetCode 417",
        "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
      },
      "examples": [
        {
          "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
          "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
          "explanation": "These cells can flow to both ocean borders."
        },
        {
          "input": "heights = [[1]]",
          "output": "[[0,0]]",
          "explanation": "The only cell touches both oceans."
        },
        {
          "input": "heights = [[1,2,3]]",
          "output": "[[0,2]]",
          "explanation": "Only the rightmost cell can flow to both ends in this row."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Each cell independently searches for both oceans.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Two border BFS traversals mark all cells once per ocean.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Two DFS traversals mark all reachable cells per ocean.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < heights.length; r++) {\n      for (int c = 0; c < heights[0].length; c++) {\n        if (canReach(heights, r, c, true) && canReach(heights, r, c, false)) {\n          answer.add(Arrays.asList(r, c));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private boolean canReach(int[][] heights, int sr, int sc, boolean pacific) {\n    boolean[][] seen = new boolean[heights.length][heights[0].length];\n    Deque<int[]> stack = new ArrayDeque<>();\n    stack.push(new int[] {sr, sc});\n    seen[sr][sc] = true;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      int r = cell[0], c = cell[1];\n      if (pacific && (r == 0 || c == 0)) return true;\n      if (!pacific && (r == heights.length - 1 || c == heights[0].length - 1)) return true;\n      for (int[] d : dirs) {\n        int nr = r + d[0], nc = c + d[1];\n        if (nr < 0 || nc < 0 || nr == heights.length || nc == heights[0].length) continue;\n        if (seen[nr][nc] || heights[nr][nc] > heights[r][c]) continue;\n        seen[nr][nc] = true;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    boolean[][] pacific = new boolean[rows][cols];\n    boolean[][] atlantic = new boolean[rows][cols];\n    Deque<int[]> pQueue = new ArrayDeque<>();\n    Deque<int[]> aQueue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      add(pacific, pQueue, r, 0);\n      add(atlantic, aQueue, r, cols - 1);\n    }\n    for (int c = 0; c < cols; c++) {\n      add(pacific, pQueue, 0, c);\n      add(atlantic, aQueue, rows - 1, c);\n    }\n\n    bfs(heights, pQueue, pacific);\n    bfs(heights, aQueue, atlantic);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n      }\n    }\n    return answer;\n  }\n\n  private void add(boolean[][] seen, Deque<int[]> queue, int r, int c) {\n    if (!seen[r][c]) {\n      seen[r][c] = true;\n      queue.offer(new int[] {r, c});\n    }\n  }\n\n  private void bfs(int[][] heights, Deque<int[]> queue, boolean[][] seen) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == heights.length || nc == heights[0].length) continue;\n        if (seen[nr][nc] || heights[nr][nc] < heights[cell[0]][cell[1]]) continue;\n        seen[nr][nc] = true;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    boolean[][] pacific = new boolean[rows][cols];\n    boolean[][] atlantic = new boolean[rows][cols];\n\n    for (int r = 0; r < rows; r++) {\n      dfs(heights, r, 0, Integer.MIN_VALUE, pacific);\n      dfs(heights, r, cols - 1, Integer.MIN_VALUE, atlantic);\n    }\n    for (int c = 0; c < cols; c++) {\n      dfs(heights, 0, c, Integer.MIN_VALUE, pacific);\n      dfs(heights, rows - 1, c, Integer.MIN_VALUE, atlantic);\n    }\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n      }\n    }\n    return answer;\n  }\n\n  private void dfs(int[][] heights, int r, int c, int previous, boolean[][] seen) {\n    if (r < 0 || c < 0 || r == heights.length || c == heights[0].length) return;\n    if (seen[r][c] || heights[r][c] < previous) return;\n\n    seen[r][c] = true;\n    dfs(heights, r + 1, c, heights[r][c], seen);\n    dfs(heights, r - 1, c, heights[r][c], seen);\n    dfs(heights, r, c + 1, heights[r][c], seen);\n    dfs(heights, r, c - 1, heights[r][c], seen);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    boolean[][] pacific = new boolean[rows][cols];\n    boolean[][] atlantic = new boolean[rows][cols];\n    Deque<int[]> pQueue = new ArrayDeque<>();\n    Deque<int[]> aQueue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      add(pacific, pQueue, r, 0);\n      add(atlantic, aQueue, r, cols - 1);\n    }\n    for (int c = 0; c < cols; c++) {\n      add(pacific, pQueue, 0, c);\n      add(atlantic, aQueue, rows - 1, c);\n    }\n\n    bfs(heights, pQueue, pacific);\n    bfs(heights, aQueue, atlantic);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n      }\n    }\n    return answer;\n  }\n\n  private void add(boolean[][] seen, Deque<int[]> queue, int r, int c) {\n    if (!seen[r][c]) {\n      seen[r][c] = true;\n      queue.offer(new int[] {r, c});\n    }\n  }\n\n  private void bfs(int[][] heights, Deque<int[]> queue, boolean[][] seen) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == heights.length || nc == heights[0].length) continue;\n        if (seen[nr][nc] || heights[nr][nc] < heights[cell[0]][cell[1]]) continue;\n        seen[nr][nc] = true;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    boolean[][] pacific = new boolean[rows][cols];\n    boolean[][] atlantic = new boolean[rows][cols];\n    Deque<int[]> pQueue = new ArrayDeque<>();\n    Deque<int[]> aQueue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      add(pacific, pQueue, r, 0);\n      add(atlantic, aQueue, r, cols - 1);\n    }\n    for (int c = 0; c < cols; c++) {\n      add(pacific, pQueue, 0, c);\n      add(atlantic, aQueue, rows - 1, c);\n    }\n\n    bfs(heights, pQueue, pacific);\n    bfs(heights, aQueue, atlantic);\n\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (pacific[r][c] && atlantic[r][c]) answer.add(Arrays.asList(r, c));\n      }\n    }\n    return answer;\n  }\n\n  private void add(boolean[][] seen, Deque<int[]> queue, int r, int c) {\n    if (!seen[r][c]) {\n      seen[r][c] = true;\n      queue.offer(new int[] {r, c});\n    }\n  }\n\n  private void bfs(int[][] heights, Deque<int[]> queue, boolean[][] seen) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == heights.length || nc == heights[0].length) continue;\n        if (seen[nr][nc] || heights[nr][nc] < heights[cell[0]][cell[1]]) continue;\n        seen[nr][nc] = true;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Surrounded Regions",
      "difficulty": "Medium",
      "subpattern": "Boundary-connected component marking",
      "question": "Given an m x n board of X and O, capture every O region fully surrounded by X by changing it to X.",
      "trigger": "Only O components connected to the border survive; all other O components are captured.",
      "intuition": "Mark safe O cells starting from the border, then flip every unmarked O.",
      "edgeCases": "No O cells, all O cells, O on border, one row, one column, enclosed pocket inside a large border region.",
      "constraints": "1 <= m,n <= 200; board[i][j] is X or O.",
      "source": {
        "label": "Surrounded Regions - LeetCode 130",
        "url": "https://leetcode.com/problems/surrounded-regions/"
      },
      "examples": [
        {
          "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
          "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
          "explanation": "Only the border-connected O survives."
        },
        {
          "input": "board = [[\"X\"]]",
          "output": "[[\"X\"]]",
          "explanation": "A single X is unchanged."
        },
        {
          "input": "board = [[\"O\",\"O\"],[\"O\",\"O\"]]",
          "output": "[[\"O\",\"O\"],[\"O\",\"O\"]]",
          "explanation": "Every O touches the border."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Each O may independently search for a border escape.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Border BFS marks each safe cell once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Border DFS marks each safe cell once.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int rows = board.length, cols = board[0].length;\n    boolean[][] keep = new boolean[rows][cols];\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] == 'O' && reachesBorder(board, r, c)) {\n          keep[r][c] = true;\n        }\n      }\n    }\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] == 'O' && !keep[r][c]) board[r][c] = 'X';\n      }\n    }\n  }\n\n  private boolean reachesBorder(char[][] board, int sr, int sc) {\n    boolean[][] seen = new boolean[board.length][board[0].length];\n    Deque<int[]> stack = new ArrayDeque<>();\n    stack.push(new int[] {sr, sc});\n    seen[sr][sc] = true;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      int r = cell[0], c = cell[1];\n      if (r == 0 || c == 0 || r == board.length - 1 || c == board[0].length - 1) return true;\n      for (int[] d : dirs) {\n        int nr = r + d[0], nc = c + d[1];\n        if (nr < 0 || nc < 0 || nr == board.length || nc == board[0].length) continue;\n        if (seen[nr][nc] || board[nr][nc] == 'X') continue;\n        seen[nr][nc] = true;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int rows = board.length, cols = board[0].length;\n    Deque<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      offer(board, queue, r, 0);\n      offer(board, queue, r, cols - 1);\n    }\n    for (int c = 0; c < cols; c++) {\n      offer(board, queue, 0, c);\n      offer(board, queue, rows - 1, c);\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        offer(board, queue, cell[0] + d[0], cell[1] + d[1]);\n      }\n    }\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void offer(char[][] board, Deque<int[]> queue, int r, int c) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    if (board[r][c] != 'O') return;\n    board[r][c] = '#';\n    queue.offer(new int[] {r, c});\n  }\n}",
      "recursiveCode": "class Solution {\n  public void solve(char[][] board) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r < rows; r++) {\n      mark(board, r, 0);\n      mark(board, r, cols - 1);\n    }\n    for (int c = 0; c < cols; c++) {\n      mark(board, 0, c);\n      mark(board, rows - 1, c);\n    }\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void mark(char[][] board, int r, int c) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    if (board[r][c] != 'O') return;\n    board[r][c] = '#';\n    mark(board, r + 1, c);\n    mark(board, r - 1, c);\n    mark(board, r, c + 1);\n    mark(board, r, c - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int rows = board.length, cols = board[0].length;\n    Deque<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      offer(board, queue, r, 0);\n      offer(board, queue, r, cols - 1);\n    }\n    for (int c = 0; c < cols; c++) {\n      offer(board, queue, 0, c);\n      offer(board, queue, rows - 1, c);\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        offer(board, queue, cell[0] + d[0], cell[1] + d[1]);\n      }\n    }\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void offer(char[][] board, Deque<int[]> queue, int r, int c) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    if (board[r][c] != 'O') return;\n    board[r][c] = '#';\n    queue.offer(new int[] {r, c});\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public void solve(char[][] board) {\n    int rows = board.length, cols = board[0].length;\n    Deque<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      offer(board, queue, r, 0);\n      offer(board, queue, r, cols - 1);\n    }\n    for (int c = 0; c < cols; c++) {\n      offer(board, queue, 0, c);\n      offer(board, queue, rows - 1, c);\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        offer(board, queue, cell[0] + d[0], cell[1] + d[1]);\n      }\n    }\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (board[r][c] == 'O') board[r][c] = 'X';\n        if (board[r][c] == '#') board[r][c] = 'O';\n      }\n    }\n  }\n\n  private void offer(char[][] board, Deque<int[]> queue, int r, int c) {\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return;\n    if (board[r][c] != 'O') return;\n    board[r][c] = '#';\n    queue.offer(new int[] {r, c});\n  }\n}"
    },
    {
      "group": "core",
      "name": "Rotting Oranges",
      "difficulty": "Medium",
      "subpattern": "Multi-source BFS",
      "question": "Given a grid containing empty cells, fresh oranges, and rotten oranges, return the minimum minutes until no fresh orange remains, or -1 if impossible.",
      "trigger": "All rotten oranges spread infection at the same time, which is exactly level-order BFS from multiple sources.",
      "intuition": "Push every initially rotten orange into the queue and count BFS layers while fresh oranges become rotten.",
      "edgeCases": "No fresh oranges, no rotten oranges, isolated fresh orange, one cell, all fresh, all rotten.",
      "constraints": "1 <= rows, cols <= 10; grid[i][j] is 0, 1, or 2.",
      "source": {
        "label": "Rotting Oranges - LeetCode 994",
        "url": "https://leetcode.com/problems/rotting-oranges/"
      },
      "examples": [
        {
          "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
          "output": "4",
          "explanation": "The infection reaches the farthest fresh orange after four minutes."
        },
        {
          "input": "grid = [[2,1,1],[0,1,1],[1,0,1]]",
          "output": "-1",
          "explanation": "The bottom-left fresh orange is isolated."
        },
        {
          "input": "grid = [[0,2]]",
          "output": "0",
          "explanation": "There are no fresh oranges."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). Each minute scans the full grid and may need many minutes.",
      "optimizedComplexity": "Time O(mn); Space O(mn). Multi-source BFS processes each orange once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive layer processing consumes one BFS frontier per call.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    int fresh = countFresh(grid);\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (fresh > 0) {\n      List<int[]> nextRotten = new ArrayList<>();\n      for (int r = 0; r < grid.length; r++) {\n        for (int c = 0; c < grid[0].length; c++) {\n          if (grid[r][c] != 2) continue;\n          for (int[] d : dirs) {\n            int nr = r + d[0], nc = c + d[1];\n            if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n            if (grid[nr][nc] == 1) nextRotten.add(new int[] {nr, nc});\n          }\n        }\n      }\n      if (nextRotten.isEmpty()) return -1;\n      for (int[] cell : nextRotten) {\n        if (grid[cell[0]][cell[1]] == 1) {\n          grid[cell[0]][cell[1]] = 2;\n          fresh--;\n        }\n      }\n      minutes++;\n    }\n    return minutes;\n  }\n\n  private int countFresh(int[][] grid) {\n    int fresh = 0;\n    for (int[] row : grid) {\n      for (int value : row) if (value == 1) fresh++;\n    }\n    return fresh;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Deque<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n          if (grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int orangesRotting(int[][] grid) {\n    Deque<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        if (grid[r][c] == 1) fresh++;\n      }\n    }\n    return rotLayer(grid, queue, fresh, 0);\n  }\n\n  private int rotLayer(int[][] grid, Deque<int[]> queue, int fresh, int minutes) {\n    if (fresh == 0) return minutes;\n    if (queue.isEmpty()) return -1;\n\n    int size = queue.size();\n    for (int i = 0; i < size; i++) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n        if (grid[nr][nc] != 1) continue;\n        grid[nr][nc] = 2;\n        fresh--;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n    return rotLayer(grid, queue, fresh, minutes + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Deque<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n          if (grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int orangesRotting(int[][] grid) {\n    Deque<int[]> queue = new ArrayDeque<>();\n    int fresh = 0;\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid[0].length; c++) {\n        if (grid[r][c] == 2) queue.offer(new int[] {r, c});\n        if (grid[r][c] == 1) fresh++;\n      }\n    }\n\n    int minutes = 0;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (fresh > 0 && !queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == grid.length || nc == grid[0].length) continue;\n          if (grid[nr][nc] != 1) continue;\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Walls and Gates",
      "difficulty": "Medium",
      "subpattern": "Multi-source BFS",
      "question": "Given rooms marked as walls, gates, and empty rooms, fill each empty room with its distance to the nearest gate.",
      "trigger": "Nearest gate distance from all rooms is shortest path distance from multiple gate sources.",
      "intuition": "Start BFS from every gate at distance 0 so the first time an empty room is reached is its nearest gate distance.",
      "edgeCases": "No gates, all walls, one gate, unreachable empty room, adjacent gates, large open room.",
      "constraints": "m == rooms.length; n == rooms[i].length; rooms use -1 for walls, 0 for gates, and 2147483647 for empty rooms.",
      "source": {
        "label": "Walls and Gates - LeetCode 286",
        "url": "https://leetcode.com/problems/walls-and-gates/"
      },
      "examples": [
        {
          "input": "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
          "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
          "explanation": "Each empty room receives the shortest gate distance."
        },
        {
          "input": "rooms = [[-1]]",
          "output": "[[-1]]",
          "explanation": "A wall stays unchanged."
        },
        {
          "input": "rooms = [[0,2147483647]]",
          "output": "[[0,1]]",
          "explanation": "The empty room is one step from the gate."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). BFS is repeated from each empty room.",
      "optimizedComplexity": "Time O(mn); Space O(mn). All gates expand together and each room is finalized once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). DFS from gates relaxes only when it improves a room distance.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private static final int INF = 2147483647;\n\n  public void wallsAndGates(int[][] rooms) {\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == INF) rooms[r][c] = nearestGate(rooms, r, c);\n      }\n    }\n  }\n\n  private int nearestGate(int[][] rooms, int sr, int sc) {\n    boolean[][] seen = new boolean[rooms.length][rooms[0].length];\n    Deque<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {sr, sc, 0});\n    seen[sr][sc] = true;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (rooms[cell[0]][cell[1]] == 0) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length) continue;\n        if (seen[nr][nc] || rooms[nr][nc] == -1) continue;\n        seen[nr][nc] = true;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return INF;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final int INF = 2147483647;\n\n  public void wallsAndGates(int[][] rooms) {\n    Deque<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) queue.offer(new int[] {r, c});\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length) continue;\n        if (rooms[nr][nc] != INF) continue;\n        rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "recursiveCode": "class Solution {\n  public void wallsAndGates(int[][] rooms) {\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) fill(rooms, r, c, 0);\n      }\n    }\n  }\n\n  private void fill(int[][] rooms, int r, int c, int distance) {\n    if (r < 0 || c < 0 || r == rooms.length || c == rooms[0].length) return;\n    if (rooms[r][c] < distance) return;\n\n    rooms[r][c] = distance;\n    fill(rooms, r + 1, c, distance + 1);\n    fill(rooms, r - 1, c, distance + 1);\n    fill(rooms, r, c + 1, distance + 1);\n    fill(rooms, r, c - 1, distance + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final int INF = 2147483647;\n\n  public void wallsAndGates(int[][] rooms) {\n    Deque<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) queue.offer(new int[] {r, c});\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length) continue;\n        if (rooms[nr][nc] != INF) continue;\n        rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final int INF = 2147483647;\n\n  public void wallsAndGates(int[][] rooms) {\n    Deque<int[]> queue = new ArrayDeque<>();\n    for (int r = 0; r < rooms.length; r++) {\n      for (int c = 0; c < rooms[0].length; c++) {\n        if (rooms[r][c] == 0) queue.offer(new int[] {r, c});\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rooms.length || nc == rooms[0].length) continue;\n        if (rooms[nr][nc] != INF) continue;\n        rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n  }\n}"
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
      "constraints": "1 <= numCourses <= 2000; 0 <= prerequisites.length <= 5000; prerequisites[i] = [course, prerequisite].",
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
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    for (int course = 0; course < numCourses; course++) {\n      if (hasCycle(course, prerequisites, new HashSet<>())) return false;\n    }\n    return true;\n  }\n\n  private boolean hasCycle(int course, int[][] prerequisites, Set<Integer> path) {\n    if (!path.add(course)) return true;\n    for (int[] edge : prerequisites) {\n      if (edge[0] == course && hasCycle(edge[1], prerequisites, path)) {\n        return true;\n      }\n    }\n    path.remove(course);\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int taken = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      taken++;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return taken == numCourses;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    for (int[] edge : prerequisites) graph.get(edge[1]).add(edge[0]);\n\n    int[] state = new int[numCourses];\n    for (int course = 0; course < numCourses; course++) {\n      if (hasCycle(course, graph, state)) return false;\n    }\n    return true;\n  }\n\n  private boolean hasCycle(int course, List<List<Integer>> graph, int[] state) {\n    if (state[course] == 1) return true;\n    if (state[course] == 2) return false;\n\n    state[course] = 1;\n    for (int next : graph.get(course)) {\n      if (hasCycle(next, graph, state)) return true;\n    }\n    state[course] = 2;\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int taken = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      taken++;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return taken == numCourses;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int taken = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      taken++;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return taken == numCourses;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Course Schedule II",
      "difficulty": "Medium",
      "subpattern": "Topological sorting with indegree",
      "question": "Given numCourses and prerequisites, return one valid order to finish all courses, or an empty array if impossible.",
      "trigger": "The output must order directed dependencies, which is a topological sort problem.",
      "intuition": "Repeatedly take courses with zero remaining prerequisites; if a cycle exists, some courses never become available.",
      "edgeCases": "No prerequisites, cycle, multiple valid orders, disconnected courses, duplicate prerequisite pairs.",
      "constraints": "1 <= numCourses <= 2000; 0 <= prerequisites.length <= numCourses * (numCourses - 1).",
      "source": {
        "label": "Course Schedule II - LeetCode 210",
        "url": "https://leetcode.com/problems/course-schedule-ii/"
      },
      "examples": [
        {
          "input": "numCourses = 2, prerequisites = [[1,0]]",
          "output": "[0,1]",
          "explanation": "Course 0 must appear before course 1."
        },
        {
          "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
          "output": "[0,1,2,3]",
          "explanation": "Several valid topological orders exist."
        },
        {
          "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
          "output": "[]",
          "explanation": "A directed cycle prevents a valid order."
        }
      ],
      "bruteForceComplexity": "Time O(VE + V^2); Space O(V). Each selection scans remaining prerequisites.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Kahn BFS processes every course and edge once.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). DFS postorder builds the topological order when no cycle exists.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    boolean[] done = new boolean[numCourses];\n    int[] order = new int[numCourses];\n    int placed = 0;\n\n    while (placed < numCourses) {\n      boolean progress = false;\n      for (int course = 0; course < numCourses; course++) {\n        if (done[course] || !ready(course, prerequisites, done)) continue;\n        done[course] = true;\n        order[placed++] = course;\n        progress = true;\n      }\n      if (!progress) return new int[0];\n    }\n    return order;\n  }\n\n  private boolean ready(int course, int[][] prerequisites, boolean[] done) {\n    for (int[] edge : prerequisites) {\n      if (edge[0] == course && !done[edge[1]]) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int[] order = new int[numCourses];\n    int index = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      order[index++] = course;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return index == numCourses ? order : new int[0];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    for (int[] edge : prerequisites) graph.get(edge[1]).add(edge[0]);\n\n    int[] state = new int[numCourses];\n    List<Integer> postorder = new ArrayList<>();\n    for (int course = 0; course < numCourses; course++) {\n      if (!dfs(course, graph, state, postorder)) return new int[0];\n    }\n\n    Collections.reverse(postorder);\n    int[] order = new int[numCourses];\n    for (int i = 0; i < numCourses; i++) order[i] = postorder.get(i);\n    return order;\n  }\n\n  private boolean dfs(int course, List<List<Integer>> graph, int[] state, List<Integer> postorder) {\n    if (state[course] == 1) return false;\n    if (state[course] == 2) return true;\n\n    state[course] = 1;\n    for (int next : graph.get(course)) {\n      if (!dfs(next, graph, state, postorder)) return false;\n    }\n    state[course] = 2;\n    postorder.add(course);\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int[] order = new int[numCourses];\n    int index = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      order[index++] = course;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return index == numCourses ? order : new int[0];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indegree = new int[numCourses];\n\n    for (int[] edge : prerequisites) {\n      graph.get(edge[1]).add(edge[0]);\n      indegree[edge[0]]++;\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) {\n      if (indegree[i] == 0) queue.offer(i);\n    }\n\n    int[] order = new int[numCourses];\n    int index = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      order[index++] = course;\n      for (int next : graph.get(course)) {\n        if (--indegree[next] == 0) queue.offer(next);\n      }\n    }\n    return index == numCourses ? order : new int[0];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Graph Valid Tree",
      "difficulty": "Medium",
      "subpattern": "Connected components in undirected graphs",
      "question": "Given n nodes labeled 0 to n - 1 and undirected edges, return true if the edges form exactly one valid tree.",
      "trigger": "A tree is an undirected graph with no cycle and exactly one connected component.",
      "intuition": "A valid tree must have n - 1 edges and every node must be reachable from any starting node.",
      "edgeCases": "n = 1 with no edges, too many edges, too few edges, self cycle, disconnected graph with n - 1 edges.",
      "constraints": "1 <= n <= 2000; 0 <= edges.length <= 5000; edges[i] connects two distinct nodes.",
      "source": {
        "label": "Graph Valid Tree - LeetCode 261",
        "url": "https://leetcode.com/problems/graph-valid-tree/"
      },
      "examples": [
        {
          "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
          "output": "true",
          "explanation": "All nodes are connected and there is no cycle."
        },
        {
          "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
          "output": "false",
          "explanation": "The edge [1,3] creates a cycle."
        },
        {
          "input": "n = 4, edges = [[0,1],[2,3]]",
          "output": "false",
          "explanation": "The graph has two components."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 + E); Space O(n). Components are merged by scanning lists.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). BFS checks reachability after the edge count filter.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). DFS detects parent-aware cycles and connectivity.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    List<Set<Integer>> components = new ArrayList<>();\n    for (int i = 0; i < n; i++) {\n      Set<Integer> set = new HashSet<>();\n      set.add(i);\n      components.add(set);\n    }\n\n    for (int[] edge : edges) {\n      int a = findComponent(components, edge[0]);\n      int b = findComponent(components, edge[1]);\n      if (a == b) return false;\n      components.get(a).addAll(components.get(b));\n      components.remove(b);\n    }\n    return components.size() == 1;\n  }\n\n  private int findComponent(List<Set<Integer>> components, int node) {\n    for (int i = 0; i < components.size(); i++) {\n      if (components.get(i).contains(node)) return i;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> queue = new ArrayDeque<>();\n    queue.offer(0);\n    seen[0] = true;\n    int visited = 0;\n\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      visited++;\n      for (int next : graph.get(node)) {\n        if (seen[next]) continue;\n        seen[next] = true;\n        queue.offer(next);\n      }\n    }\n    return visited == n;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean validTree(int n, int[][] edges) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    if (hasCycle(0, -1, graph, seen)) return false;\n    for (boolean value : seen) {\n      if (!value) return false;\n    }\n    return true;\n  }\n\n  private boolean hasCycle(int node, int parent, List<List<Integer>> graph, boolean[] seen) {\n    if (seen[node]) return true;\n    seen[node] = true;\n    for (int next : graph.get(node)) {\n      if (next == parent) continue;\n      if (hasCycle(next, node, graph, seen)) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> queue = new ArrayDeque<>();\n    queue.offer(0);\n    seen[0] = true;\n    int visited = 0;\n\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      visited++;\n      for (int next : graph.get(node)) {\n        if (seen[next]) continue;\n        seen[next] = true;\n        queue.offer(next);\n      }\n    }\n    return visited == n;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> queue = new ArrayDeque<>();\n    queue.offer(0);\n    seen[0] = true;\n    int visited = 0;\n\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      visited++;\n      for (int next : graph.get(node)) {\n        if (seen[next]) continue;\n        seen[next] = true;\n        queue.offer(next);\n      }\n    }\n    return visited == n;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Number of Connected Components in an Undirected Graph",
      "difficulty": "Medium",
      "subpattern": "Connected components in undirected graphs",
      "question": "Given n nodes and undirected edges, return the number of connected components in the graph.",
      "trigger": "Each traversal from an unseen node discovers exactly one connected component.",
      "intuition": "Loop through every node; when a node has not been seen, start a traversal and increment the component count.",
      "edgeCases": "No edges, all nodes isolated, one component, duplicate edges, n = 1, disconnected chains.",
      "constraints": "1 <= n <= 2000; 0 <= edges.length <= 5000; nodes are labeled from 0 to n - 1.",
      "source": {
        "label": "Number of Connected Components - LeetCode 323",
        "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
      },
      "examples": [
        {
          "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
          "output": "2",
          "explanation": "Nodes 0,1,2 form one component and 3,4 form another."
        },
        {
          "input": "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
          "output": "1",
          "explanation": "All nodes are connected."
        },
        {
          "input": "n = 3, edges = []",
          "output": "3",
          "explanation": "Each isolated node is its own component."
        }
      ],
      "bruteForceComplexity": "Time O(VE); Space O(V). Traversal scans the full edge list for neighbors each time.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Adjacency lists let each edge be processed once.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive DFS visits every node and edge once.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countComponents(int n, int[][] edges) {\n    boolean[] seen = new boolean[n];\n    int components = 0;\n\n    for (int node = 0; node < n; node++) {\n      if (seen[node]) continue;\n      components++;\n      Deque<Integer> stack = new ArrayDeque<>();\n      stack.push(node);\n      seen[node] = true;\n\n      while (!stack.isEmpty()) {\n        int current = stack.pop();\n        for (int[] edge : edges) {\n          int next = -1;\n          if (edge[0] == current) next = edge[1];\n          if (edge[1] == current) next = edge[0];\n          if (next != -1 && !seen[next]) {\n            seen[next] = true;\n            stack.push(next);\n          }\n        }\n      }\n    }\n    return components;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countComponents(int n, int[][] edges) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    int components = 0;\n    for (int node = 0; node < n; node++) {\n      if (seen[node]) continue;\n      components++;\n      Deque<Integer> stack = new ArrayDeque<>();\n      stack.push(node);\n      seen[node] = true;\n      while (!stack.isEmpty()) {\n        int current = stack.pop();\n        for (int next : graph.get(current)) {\n          if (seen[next]) continue;\n          seen[next] = true;\n          stack.push(next);\n        }\n      }\n    }\n    return components;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countComponents(int n, int[][] edges) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    int components = 0;\n    for (int node = 0; node < n; node++) {\n      if (!seen[node]) {\n        components++;\n        dfs(node, graph, seen);\n      }\n    }\n    return components;\n  }\n\n  private void dfs(int node, List<List<Integer>> graph, boolean[] seen) {\n    seen[node] = true;\n    for (int next : graph.get(node)) {\n      if (!seen[next]) dfs(next, graph, seen);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countComponents(int n, int[][] edges) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    int components = 0;\n    for (int node = 0; node < n; node++) {\n      if (seen[node]) continue;\n      components++;\n      Deque<Integer> stack = new ArrayDeque<>();\n      stack.push(node);\n      seen[node] = true;\n      while (!stack.isEmpty()) {\n        int current = stack.pop();\n        for (int next : graph.get(current)) {\n          if (seen[next]) continue;\n          seen[next] = true;\n          stack.push(next);\n        }\n      }\n    }\n    return components;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countComponents(int n, int[][] edges) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    int components = 0;\n    for (int node = 0; node < n; node++) {\n      if (seen[node]) continue;\n      components++;\n      Deque<Integer> stack = new ArrayDeque<>();\n      stack.push(node);\n      seen[node] = true;\n      while (!stack.isEmpty()) {\n        int current = stack.pop();\n        for (int next : graph.get(current)) {\n          if (seen[next]) continue;\n          seen[next] = true;\n          stack.push(next);\n        }\n      }\n    }\n    return components;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Redundant Connection",
      "difficulty": "Medium",
      "subpattern": "Cycle detection in undirected graphs",
      "question": "Given edges of an undirected graph that started as a tree with one extra edge, return the edge that can be removed to make the graph a tree again.",
      "trigger": "The first edge whose endpoints are already connected creates the redundant cycle.",
      "intuition": "Before adding an edge, test whether its two endpoints are already in the same component.",
      "edgeCases": "Cycle closes at the last edge, cycle closes early, n inferred from edges, duplicate-looking paths, long chain plus back edge.",
      "constraints": "3 <= edges.length <= 1000; edges[i] = [ai, bi]; nodes are labeled from 1 to edges.length.",
      "source": {
        "label": "Redundant Connection - LeetCode 684",
        "url": "https://leetcode.com/problems/redundant-connection/"
      },
      "examples": [
        {
          "input": "edges = [[1,2],[1,3],[2,3]]",
          "output": "[2,3]",
          "explanation": "Nodes 2 and 3 are already connected through 1."
        },
        {
          "input": "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
          "output": "[1,4]",
          "explanation": "Adding [1,4] closes the cycle."
        },
        {
          "input": "edges = [[1,2],[2,3],[3,1]]",
          "output": "[3,1]",
          "explanation": "The last edge completes the triangle."
        }
      ],
      "bruteForceComplexity": "Time O(E(V + E)); Space O(V + E). Before each insertion, DFS tests existing connectivity.",
      "optimizedComplexity": "Time O(E alpha(V)); Space O(V). Union find detects the first same-component edge.",
      "recursiveComplexity": "Time O(E(V + E)); Space O(V + E). Recursive DFS checks reachability before adding each edge.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    Map<Integer, List<Integer>> graph = new HashMap<>();\n    for (int[] edge : edges) {\n      if (connected(graph, edge[0], edge[1])) return edge;\n      graph.computeIfAbsent(edge[0], unused -> new ArrayList<>()).add(edge[1]);\n      graph.computeIfAbsent(edge[1], unused -> new ArrayList<>()).add(edge[0]);\n    }\n    return new int[0];\n  }\n\n  private boolean connected(Map<Integer, List<Integer>> graph, int start, int target) {\n    if (!graph.containsKey(start) || !graph.containsKey(target)) return false;\n    Set<Integer> seen = new HashSet<>();\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(start);\n    seen.add(start);\n    while (!stack.isEmpty()) {\n      int node = stack.pop();\n      if (node == target) return true;\n      for (int next : graph.getOrDefault(node, Collections.emptyList())) {\n        if (seen.add(next)) stack.push(next);\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    int n = edges.length;\n    int[] parent = new int[n + 1];\n    int[] rank = new int[n + 1];\n    for (int i = 1; i <= n; i++) parent[i] = i;\n\n    for (int[] edge : edges) {\n      if (!union(edge[0], edge[1], parent, rank)) return edge;\n    }\n    return new int[0];\n  }\n\n  private boolean union(int a, int b, int[] parent, int[] rank) {\n    int rootA = find(a, parent);\n    int rootB = find(b, parent);\n    if (rootA == rootB) return false;\n    if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;\n    else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;\n    else {\n      parent[rootB] = rootA;\n      rank[rootA]++;\n    }\n    return true;\n  }\n\n  private int find(int node, int[] parent) {\n    while (node != parent[node]) {\n      parent[node] = parent[parent[node]];\n      node = parent[node];\n    }\n    return node;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    Map<Integer, List<Integer>> graph = new HashMap<>();\n    for (int[] edge : edges) {\n      if (hasPath(edge[0], edge[1], graph, new HashSet<>())) return edge;\n      graph.computeIfAbsent(edge[0], unused -> new ArrayList<>()).add(edge[1]);\n      graph.computeIfAbsent(edge[1], unused -> new ArrayList<>()).add(edge[0]);\n    }\n    return new int[0];\n  }\n\n  private boolean hasPath(int node, int target, Map<Integer, List<Integer>> graph, Set<Integer> seen) {\n    if (node == target) return true;\n    if (!seen.add(node)) return false;\n    for (int next : graph.getOrDefault(node, Collections.emptyList())) {\n      if (hasPath(next, target, graph, seen)) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    int n = edges.length;\n    int[] parent = new int[n + 1];\n    int[] rank = new int[n + 1];\n    for (int i = 1; i <= n; i++) parent[i] = i;\n\n    for (int[] edge : edges) {\n      if (!union(edge[0], edge[1], parent, rank)) return edge;\n    }\n    return new int[0];\n  }\n\n  private boolean union(int a, int b, int[] parent, int[] rank) {\n    int rootA = find(a, parent);\n    int rootB = find(b, parent);\n    if (rootA == rootB) return false;\n    if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;\n    else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;\n    else {\n      parent[rootB] = rootA;\n      rank[rootA]++;\n    }\n    return true;\n  }\n\n  private int find(int node, int[] parent) {\n    while (node != parent[node]) {\n      parent[node] = parent[parent[node]];\n      node = parent[node];\n    }\n    return node;\n  }\n}",
      "code": "class Solution {\n  public int[] findRedundantConnection(int[][] edges) {\n    int n = edges.length;\n    int[] parent = new int[n + 1];\n    int[] rank = new int[n + 1];\n    for (int i = 1; i <= n; i++) parent[i] = i;\n\n    for (int[] edge : edges) {\n      if (!union(edge[0], edge[1], parent, rank)) return edge;\n    }\n    return new int[0];\n  }\n\n  private boolean union(int a, int b, int[] parent, int[] rank) {\n    int rootA = find(a, parent);\n    int rootB = find(b, parent);\n    if (rootA == rootB) return false;\n    if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;\n    else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;\n    else {\n      parent[rootB] = rootA;\n      rank[rootA]++;\n    }\n    return true;\n  }\n\n  private int find(int node, int[] parent) {\n    while (node != parent[node]) {\n      parent[node] = parent[parent[node]];\n      node = parent[node];\n    }\n    return node;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Word Ladder",
      "difficulty": "Hard",
      "subpattern": "Shortest path in unweighted implicit graphs",
      "question": "Given beginWord, endWord, and a dictionary, return the length of the shortest transformation sequence where each step changes one character and every intermediate word is in the dictionary.",
      "trigger": "Words are implicit graph nodes and one-letter transformations are unweighted edges; shortest sequence means BFS.",
      "intuition": "Generate one-character neighbors level by level and stop the first time endWord is reached.",
      "edgeCases": "endWord missing, beginWord equals endWord, no possible path, many words with same wildcard pattern, repeated words.",
      "constraints": "1 <= wordList.length <= 5000; all words have the same length; words contain lowercase English letters.",
      "source": {
        "label": "Word Ladder - LeetCode 127",
        "url": "https://leetcode.com/problems/word-ladder/"
      },
      "examples": [
        {
          "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
          "output": "5",
          "explanation": "hit -> hot -> dot -> dog -> cog."
        },
        {
          "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
          "output": "0",
          "explanation": "The end word is not available."
        },
        {
          "input": "beginWord = \"a\", endWord = \"c\", wordList = [\"a\",\"b\",\"c\"]",
          "output": "2",
          "explanation": "a can change directly to c."
        }
      ],
      "bruteForceComplexity": "Time O(N! * L * 26) in the worst case; Space O(N). Backtracking explores many valid transformation paths.",
      "optimizedComplexity": "Time O(N * L * 26); Space O(N). BFS removes visited words once.",
      "recursiveComplexity": "Time O(N * L * 26); Space O(N). Recursive BFS processes one frontier per depth.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> words = new HashSet<>(wordList);\n    if (!words.contains(endWord)) return 0;\n    int[] best = {Integer.MAX_VALUE};\n    Set<String> used = new HashSet<>();\n    used.add(beginWord);\n    search(beginWord, endWord, words, used, 1, best);\n    return best[0] == Integer.MAX_VALUE ? 0 : best[0];\n  }\n\n  private void search(String word, String end, Set<String> words, Set<String> used, int depth, int[] best) {\n    if (word.equals(end)) {\n      best[0] = Math.min(best[0], depth);\n      return;\n    }\n    if (depth >= best[0]) return;\n\n    char[] chars = word.toCharArray();\n    for (int i = 0; i < chars.length; i++) {\n      char original = chars[i];\n      for (char ch = 'a'; ch <= 'z'; ch++) {\n        if (ch == original) continue;\n        chars[i] = ch;\n        String next = new String(chars);\n        if (words.contains(next) && used.add(next)) {\n          search(next, end, words, used, depth + 1, best);\n          used.remove(next);\n        }\n      }\n      chars[i] = original;\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> words = new HashSet<>(wordList);\n    if (!words.contains(endWord)) return 0;\n\n    Deque<String> queue = new ArrayDeque<>();\n    queue.offer(beginWord);\n    words.remove(beginWord);\n    int length = 1;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int s = 0; s < size; s++) {\n        String word = queue.poll();\n        if (word.equals(endWord)) return length;\n        char[] chars = word.toCharArray();\n        for (int i = 0; i < chars.length; i++) {\n          char original = chars[i];\n          for (char ch = 'a'; ch <= 'z'; ch++) {\n            chars[i] = ch;\n            String next = new String(chars);\n            if (words.remove(next)) queue.offer(next);\n          }\n          chars[i] = original;\n        }\n      }\n      length++;\n    }\n    return 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> words = new HashSet<>(wordList);\n    if (!words.contains(endWord)) return 0;\n    Set<String> frontier = new HashSet<>();\n    frontier.add(beginWord);\n    words.remove(beginWord);\n    return bfs(frontier, words, endWord, 1);\n  }\n\n  private int bfs(Set<String> frontier, Set<String> words, String endWord, int depth) {\n    if (frontier.isEmpty()) return 0;\n    Set<String> nextFrontier = new HashSet<>();\n    for (String word : frontier) {\n      if (word.equals(endWord)) return depth;\n      char[] chars = word.toCharArray();\n      for (int i = 0; i < chars.length; i++) {\n        char original = chars[i];\n        for (char ch = 'a'; ch <= 'z'; ch++) {\n          chars[i] = ch;\n          String next = new String(chars);\n          if (words.remove(next)) nextFrontier.add(next);\n        }\n        chars[i] = original;\n      }\n    }\n    return bfs(nextFrontier, words, endWord, depth + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> words = new HashSet<>(wordList);\n    if (!words.contains(endWord)) return 0;\n\n    Deque<String> queue = new ArrayDeque<>();\n    queue.offer(beginWord);\n    words.remove(beginWord);\n    int length = 1;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int s = 0; s < size; s++) {\n        String word = queue.poll();\n        if (word.equals(endWord)) return length;\n        char[] chars = word.toCharArray();\n        for (int i = 0; i < chars.length; i++) {\n          char original = chars[i];\n          for (char ch = 'a'; ch <= 'z'; ch++) {\n            chars[i] = ch;\n            String next = new String(chars);\n            if (words.remove(next)) queue.offer(next);\n          }\n          chars[i] = original;\n        }\n      }\n      length++;\n    }\n    return 0;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> words = new HashSet<>(wordList);\n    if (!words.contains(endWord)) return 0;\n\n    Deque<String> queue = new ArrayDeque<>();\n    queue.offer(beginWord);\n    words.remove(beginWord);\n    int length = 1;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int s = 0; s < size; s++) {\n        String word = queue.poll();\n        if (word.equals(endWord)) return length;\n        char[] chars = word.toCharArray();\n        for (int i = 0; i < chars.length; i++) {\n          char original = chars[i];\n          for (char ch = 'a'; ch <= 'z'; ch++) {\n            chars[i] = ch;\n            String next = new String(chars);\n            if (words.remove(next)) queue.offer(next);\n          }\n          chars[i] = original;\n        }\n      }\n      length++;\n    }\n    return 0;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Open the Lock",
      "difficulty": "Medium",
      "subpattern": "Implicit graph state search",
      "question": "Given deadends and a target lock combination, return the minimum wheel turns needed to reach target from 0000, or -1 if impossible.",
      "trigger": "Each lock combination is a graph state and each wheel turn is an unweighted edge.",
      "intuition": "Search combinations by distance from 0000 while avoiding dead states and repeated states.",
      "edgeCases": "0000 is dead, target is 0000, target is dead, all neighbors blocked, wrap from 0 to 9 and 9 to 0.",
      "constraints": "1 <= deadends.length <= 500; target has length 4; combinations contain digits 0 to 9.",
      "source": {
        "label": "Open the Lock - LeetCode 752",
        "url": "https://leetcode.com/problems/open-the-lock/"
      },
      "examples": [
        {
          "input": "deadends = [\"0201\",\"0101\",\"0102\",\"1212\",\"2002\"], target = \"0202\"",
          "output": "6",
          "explanation": "The shortest safe route takes six turns."
        },
        {
          "input": "deadends = [\"8888\"], target = \"0009\"",
          "output": "1",
          "explanation": "Turn the last wheel backward once."
        },
        {
          "input": "deadends = [\"0000\"], target = \"8888\"",
          "output": "-1",
          "explanation": "The start state is blocked."
        }
      ],
      "bruteForceComplexity": "Time O(10^4 * 8) with heavy DFS backtracking; Space O(10^4). DFS may explore many longer paths before the best one.",
      "optimizedComplexity": "Time O(10^4 * 8); Space O(10^4). BFS visits each combination at most once.",
      "recursiveComplexity": "Time O(10^4 * 8); Space O(10^4). Recursive BFS advances one frontier layer per call.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n    int[] best = {Integer.MAX_VALUE};\n    dfs(\"0000\", target, dead, new HashSet<>(), 0, best);\n    return best[0] == Integer.MAX_VALUE ? -1 : best[0];\n  }\n\n  private void dfs(String state, String target, Set<String> dead, Set<String> seen, int depth, int[] best) {\n    if (dead.contains(state) || !seen.add(state) || depth >= best[0]) return;\n    if (state.equals(target)) {\n      best[0] = depth;\n      seen.remove(state);\n      return;\n    }\n    for (String next : neighbors(state)) {\n      dfs(next, target, dead, seen, depth + 1, best);\n    }\n    seen.remove(state);\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> list = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      list.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      list.add(new String(chars));\n      chars[i] = original;\n    }\n    return list;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Deque<String> queue = new ArrayDeque<>();\n    Set<String> seen = new HashSet<>();\n    queue.offer(\"0000\");\n    seen.add(\"0000\");\n    int turns = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String state = queue.poll();\n        if (state.equals(target)) return turns;\n        for (String next : neighbors(state)) {\n          if (dead.contains(next) || !seen.add(next)) continue;\n          queue.offer(next);\n        }\n      }\n      turns++;\n    }\n    return -1;\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> list = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      list.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      list.add(new String(chars));\n      chars[i] = original;\n    }\n    return list;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n    Set<String> frontier = new HashSet<>();\n    Set<String> seen = new HashSet<>();\n    frontier.add(\"0000\");\n    seen.add(\"0000\");\n    return bfs(frontier, seen, dead, target, 0);\n  }\n\n  private int bfs(Set<String> frontier, Set<String> seen, Set<String> dead, String target, int turns) {\n    if (frontier.isEmpty()) return -1;\n    Set<String> nextLayer = new HashSet<>();\n    for (String state : frontier) {\n      if (state.equals(target)) return turns;\n      for (String next : neighbors(state)) {\n        if (!dead.contains(next) && seen.add(next)) nextLayer.add(next);\n      }\n    }\n    return bfs(nextLayer, seen, dead, target, turns + 1);\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> list = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      list.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      list.add(new String(chars));\n      chars[i] = original;\n    }\n    return list;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Deque<String> queue = new ArrayDeque<>();\n    Set<String> seen = new HashSet<>();\n    queue.offer(\"0000\");\n    seen.add(\"0000\");\n    int turns = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String state = queue.poll();\n        if (state.equals(target)) return turns;\n        for (String next : neighbors(state)) {\n          if (dead.contains(next) || !seen.add(next)) continue;\n          queue.offer(next);\n        }\n      }\n      turns++;\n    }\n    return -1;\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> list = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      list.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      list.add(new String(chars));\n      chars[i] = original;\n    }\n    return list;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n\n    Deque<String> queue = new ArrayDeque<>();\n    Set<String> seen = new HashSet<>();\n    queue.offer(\"0000\");\n    seen.add(\"0000\");\n    int turns = 0;\n\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String state = queue.poll();\n        if (state.equals(target)) return turns;\n        for (String next : neighbors(state)) {\n          if (dead.contains(next) || !seen.add(next)) continue;\n          queue.offer(next);\n        }\n      }\n      turns++;\n    }\n    return -1;\n  }\n\n  private List<String> neighbors(String state) {\n    List<String> list = new ArrayList<>();\n    char[] chars = state.toCharArray();\n    for (int i = 0; i < 4; i++) {\n      char original = chars[i];\n      chars[i] = original == '9' ? '0' : (char) (original + 1);\n      list.add(new String(chars));\n      chars[i] = original == '0' ? '9' : (char) (original - 1);\n      list.add(new String(chars));\n      chars[i] = original;\n    }\n    return list;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Shortest Path in Binary Matrix",
      "difficulty": "Medium",
      "subpattern": "Shortest path in unweighted grid graphs",
      "question": "Given an n x n binary matrix, return the length of the shortest clear path from top-left to bottom-right moving in 8 directions, or -1 if none exists.",
      "trigger": "Each clear cell is an unweighted graph node; shortest path length requires BFS by distance.",
      "intuition": "Start from (0,0), expand all cells at the current distance, and stop when the target cell is dequeued.",
      "edgeCases": "Blocked start, blocked target, n = 1, diagonal-only path, no path, all clear grid.",
      "constraints": "1 <= n <= 100; grid[i][j] is 0 or 1.",
      "source": {
        "label": "Shortest Path in Binary Matrix - LeetCode 1091",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
      },
      "examples": [
        {
          "input": "grid = [[0,1],[1,0]]",
          "output": "2",
          "explanation": "Move diagonally from start to target."
        },
        {
          "input": "grid = [[0,0,0],[1,1,0],[1,1,0]]",
          "output": "4",
          "explanation": "The shortest path follows the right side."
        },
        {
          "input": "grid = [[1,0,0],[1,1,0],[1,1,0]]",
          "output": "-1",
          "explanation": "The start cell is blocked."
        }
      ],
      "bruteForceComplexity": "Time exponential before pruning; Space O(n^2). DFS explores many possible paths.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). BFS visits each clear cell at most once.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Recursive frontier expansion follows BFS layers.",
      "bruteForceCode": "class Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    int[][] bestAt = new int[n][n];\n    for (int r = 0; r < n; r++) java.util.Arrays.fill(bestAt[r], Integer.MAX_VALUE);\n    int[] answer = {Integer.MAX_VALUE};\n    dfs(grid, 0, 0, 1, bestAt, answer);\n    return answer[0] == Integer.MAX_VALUE ? -1 : answer[0];\n  }\n\n  private void dfs(int[][] grid, int r, int c, int dist, int[][] bestAt, int[] answer) {\n    int n = grid.length;\n    if (r < 0 || c < 0 || r == n || c == n || grid[r][c] == 1) return;\n    if (dist >= bestAt[r][c] || dist >= answer[0]) return;\n    bestAt[r][c] = dist;\n    if (r == n - 1 && c == n - 1) {\n      answer[0] = dist;\n      return;\n    }\n    for (int[] d : dirs) dfs(grid, r + d[0], c + d[1], dist + 1, bestAt, answer);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    Deque<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0, 1});\n    grid[0][0] = 1;\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (cell[0] == n - 1 && cell[1] == n - 1) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 1) continue;\n        grid[nr][nc] = 1;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    List<int[]> frontier = new ArrayList<>();\n    frontier.add(new int[] {0, 0});\n    grid[0][0] = 1;\n    return bfs(grid, frontier, 1);\n  }\n\n  private int bfs(int[][] grid, List<int[]> frontier, int distance) {\n    if (frontier.isEmpty()) return -1;\n    int n = grid.length;\n    List<int[]> nextLayer = new ArrayList<>();\n    for (int[] cell : frontier) {\n      if (cell[0] == n - 1 && cell[1] == n - 1) return distance;\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 1) continue;\n        grid[nr][nc] = 1;\n        nextLayer.add(new int[] {nr, nc});\n      }\n    }\n    return bfs(grid, nextLayer, distance + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    Deque<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0, 1});\n    grid[0][0] = 1;\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (cell[0] == n - 1 && cell[1] == n - 1) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 1) continue;\n        grid[nr][nc] = 1;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    Deque<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0, 1});\n    grid[0][0] = 1;\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (cell[0] == n - 1 && cell[1] == n - 1) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 1) continue;\n        grid[nr][nc] = 1;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "01 Matrix",
      "difficulty": "Medium",
      "subpattern": "Multi-source BFS",
      "question": "Given a binary matrix, return a matrix where each cell stores the distance to the nearest 0.",
      "trigger": "Nearest zero distance for every cell is a multi-source shortest path problem from all zero cells.",
      "intuition": "Push all zero cells first; every one cell receives the first distance at which BFS reaches it.",
      "edgeCases": "All zeros, one zero, one row, one column, zeros at corners, large block of ones.",
      "constraints": "1 <= rows, cols <= 10000 total cells; mat[i][j] is 0 or 1; at least one zero exists.",
      "source": {
        "label": "01 Matrix - LeetCode 542",
        "url": "https://leetcode.com/problems/01-matrix/"
      },
      "examples": [
        {
          "input": "mat = [[0,0,0],[0,1,0],[0,0,0]]",
          "output": "[[0,0,0],[0,1,0],[0,0,0]]",
          "explanation": "The center one is adjacent to a zero."
        },
        {
          "input": "mat = [[0,0,0],[0,1,0],[1,1,1]]",
          "output": "[[0,0,0],[0,1,0],[1,2,1]]",
          "explanation": "Distances grow away from the nearest zero."
        },
        {
          "input": "mat = [[1,0,1]]",
          "output": "[[1,0,1]]",
          "explanation": "Both one cells are one step from the zero."
        }
      ],
      "bruteForceComplexity": "Time O((mn)^2); Space O(mn). BFS is repeated from each one cell.",
      "optimizedComplexity": "Time O(mn); Space O(mn). All zero cells expand together once.",
      "recursiveComplexity": "Time O(mn); Space O(mn). Recursive relaxation updates a cell only when a shorter distance is found.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int[][] answer = new int[mat.length][mat[0].length];\n    for (int r = 0; r < mat.length; r++) {\n      for (int c = 0; c < mat[0].length; c++) {\n        answer[r][c] = mat[r][c] == 0 ? 0 : nearestZero(mat, r, c);\n      }\n    }\n    return answer;\n  }\n\n  private int nearestZero(int[][] mat, int sr, int sc) {\n    boolean[][] seen = new boolean[mat.length][mat[0].length];\n    Deque<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {sr, sc, 0});\n    seen[sr][sc] = true;\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      if (mat[cell[0]][cell[1]] == 0) return cell[2];\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == mat.length || nc == mat[0].length) continue;\n        if (seen[nr][nc]) continue;\n        seen[nr][nc] = true;\n        queue.offer(new int[] {nr, nc, cell[2] + 1});\n      }\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int rows = mat.length, cols = mat[0].length;\n    int[][] dist = new int[rows][cols];\n    Deque<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      Arrays.fill(dist[r], -1);\n      for (int c = 0; c < cols; c++) {\n        if (mat[r][c] == 0) {\n          dist[r][c] = 0;\n          queue.offer(new int[] {r, c});\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rows || nc == cols || dist[nr][nc] != -1) continue;\n        dist[nr][nc] = dist[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n    return dist;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int[][] updateMatrix(int[][] mat) {\n    int rows = mat.length, cols = mat[0].length;\n    int[][] dist = new int[rows][cols];\n    for (int r = 0; r < rows; r++) Arrays.fill(dist[r], Integer.MAX_VALUE);\n\n    for (int r = 0; r < rows; r++) {\n      for (int c = 0; c < cols; c++) {\n        if (mat[r][c] == 0) relax(dist, r, c, 0);\n      }\n    }\n    return dist;\n  }\n\n  private void relax(int[][] dist, int r, int c, int value) {\n    if (r < 0 || c < 0 || r == dist.length || c == dist[0].length) return;\n    if (value >= dist[r][c]) return;\n    dist[r][c] = value;\n    for (int[] d : dirs) relax(dist, r + d[0], c + d[1], value + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int rows = mat.length, cols = mat[0].length;\n    int[][] dist = new int[rows][cols];\n    Deque<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      Arrays.fill(dist[r], -1);\n      for (int c = 0; c < cols; c++) {\n        if (mat[r][c] == 0) {\n          dist[r][c] = 0;\n          queue.offer(new int[] {r, c});\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rows || nc == cols || dist[nr][nc] != -1) continue;\n        dist[nr][nc] = dist[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n    return dist;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] updateMatrix(int[][] mat) {\n    int rows = mat.length, cols = mat[0].length;\n    int[][] dist = new int[rows][cols];\n    Deque<int[]> queue = new ArrayDeque<>();\n\n    for (int r = 0; r < rows; r++) {\n      Arrays.fill(dist[r], -1);\n      for (int c = 0; c < cols; c++) {\n        if (mat[r][c] == 0) {\n          dist[r][c] = 0;\n          queue.offer(new int[] {r, c});\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!queue.isEmpty()) {\n      int[] cell = queue.poll();\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == rows || nc == cols || dist[nr][nc] != -1) continue;\n        dist[nr][nc] = dist[cell[0]][cell[1]] + 1;\n        queue.offer(new int[] {nr, nc});\n      }\n    }\n    return dist;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Is Graph Bipartite?",
      "difficulty": "Medium",
      "subpattern": "Bipartite graph coloring",
      "question": "Given an undirected graph as adjacency lists, determine whether its nodes can be split into two sets so every edge connects nodes in different sets.",
      "trigger": "The graph asks for a two-color assignment with no same-color adjacent nodes.",
      "intuition": "Color one node, force all neighbors to the opposite color, and fail if a conflict appears.",
      "edgeCases": "Disconnected graph, isolated node, odd cycle, even cycle, self-loop if present, empty adjacency list.",
      "constraints": "1 <= graph.length <= 100; 0 <= graph[u].length < graph.length; graph is undirected.",
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
      "bruteForceCode": "class Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    return assign(0, graph, color);\n  }\n\n  private boolean assign(int node, int[][] graph, int[] color) {\n    if (node == graph.length) return valid(graph, color);\n    color[node] = 1;\n    if (partialValid(graph, color, node) && assign(node + 1, graph, color)) return true;\n    color[node] = -1;\n    if (partialValid(graph, color, node) && assign(node + 1, graph, color)) return true;\n    color[node] = 0;\n    return false;\n  }\n\n  private boolean partialValid(int[][] graph, int[] color, int node) {\n    for (int next : graph[node]) {\n      if (color[next] != 0 && color[next] == color[node]) return false;\n    }\n    return true;\n  }\n\n  private boolean valid(int[][] graph, int[] color) {\n    for (int node = 0; node < graph.length; node++) {\n      for (int next : graph[node]) if (color[node] == color[next]) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int start = 0; start < graph.length; start++) {\n      if (color[start] != 0) continue;\n      Deque<Integer> queue = new ArrayDeque<>();\n      queue.offer(start);\n      color[start] = 1;\n\n      while (!queue.isEmpty()) {\n        int node = queue.poll();\n        for (int next : graph[node]) {\n          if (color[next] == color[node]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[node];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int node = 0; node < graph.length; node++) {\n      if (color[node] == 0 && !dfs(node, 1, graph, color)) return false;\n    }\n    return true;\n  }\n\n  private boolean dfs(int node, int paint, int[][] graph, int[] color) {\n    if (color[node] != 0) return color[node] == paint;\n    color[node] = paint;\n    for (int next : graph[node]) {\n      if (!dfs(next, -paint, graph, color)) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int start = 0; start < graph.length; start++) {\n      if (color[start] != 0) continue;\n      Deque<Integer> queue = new ArrayDeque<>();\n      queue.offer(start);\n      color[start] = 1;\n\n      while (!queue.isEmpty()) {\n        int node = queue.poll();\n        for (int next : graph[node]) {\n          if (color[next] == color[node]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[node];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean isBipartite(int[][] graph) {\n    int[] color = new int[graph.length];\n    for (int start = 0; start < graph.length; start++) {\n      if (color[start] != 0) continue;\n      Deque<Integer> queue = new ArrayDeque<>();\n      queue.offer(start);\n      color[start] = 1;\n\n      while (!queue.isEmpty()) {\n        int node = queue.poll();\n        for (int next : graph[node]) {\n          if (color[next] == color[node]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[node];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Possible Bipartition",
      "difficulty": "Medium",
      "subpattern": "Bipartite graph coloring",
      "question": "Given n people and pairs of people who dislike each other, return true if everyone can be split into two groups so no pair in the same group dislikes each other.",
      "trigger": "Dislike pairs are undirected edges and two valid groups require bipartite coloring.",
      "intuition": "Color each dislike edge endpoints with opposite colors; a contradiction means no bipartition exists.",
      "edgeCases": "No dislikes, disconnected dislike graph, odd cycle, duplicate dislike, one-indexed node labels.",
      "constraints": "1 <= n <= 2000; 0 <= dislikes.length <= 10000; dislikes[i] = [a, b] with 1 <= a,b <= n.",
      "source": {
        "label": "Possible Bipartition - LeetCode 886",
        "url": "https://leetcode.com/problems/possible-bipartition/"
      },
      "examples": [
        {
          "input": "n = 4, dislikes = [[1,2],[1,3],[2,4]]",
          "output": "true",
          "explanation": "One valid split is {1,4} and {2,3}."
        },
        {
          "input": "n = 3, dislikes = [[1,2],[1,3],[2,3]]",
          "output": "false",
          "explanation": "Three mutual conflicts form an odd cycle."
        },
        {
          "input": "n = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]",
          "output": "false",
          "explanation": "The cycle of length five cannot be two-colored."
        }
      ],
      "bruteForceComplexity": "Time O(2^n * E); Space O(n). Backtracking tries group assignments.",
      "optimizedComplexity": "Time O(n + E); Space O(n + E). BFS coloring handles all components.",
      "recursiveComplexity": "Time O(n + E); Space O(n + E). DFS coloring recurses through dislike components.",
      "bruteForceCode": "class Solution {\n  public boolean possibleBipartition(int n, int[][] dislikes) {\n    int[] group = new int[n + 1];\n    return assign(1, n, dislikes, group);\n  }\n\n  private boolean assign(int person, int n, int[][] dislikes, int[] group) {\n    if (person > n) return true;\n    for (int color = 1; color <= 2; color++) {\n      group[person] = color;\n      if (valid(person, dislikes, group) && assign(person + 1, n, dislikes, group)) return true;\n    }\n    group[person] = 0;\n    return false;\n  }\n\n  private boolean valid(int person, int[][] dislikes, int[] group) {\n    for (int[] edge : dislikes) {\n      if (edge[0] == person && group[edge[1]] == group[person]) return false;\n      if (edge[1] == person && group[edge[0]] == group[person]) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean possibleBipartition(int n, int[][] dislikes) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : dislikes) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    int[] color = new int[n + 1];\n    for (int person = 1; person <= n; person++) {\n      if (color[person] != 0) continue;\n      Deque<Integer> queue = new ArrayDeque<>();\n      queue.offer(person);\n      color[person] = 1;\n      while (!queue.isEmpty()) {\n        int current = queue.poll();\n        for (int next : graph.get(current)) {\n          if (color[next] == color[current]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[current];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean possibleBipartition(int n, int[][] dislikes) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : dislikes) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    int[] color = new int[n + 1];\n    for (int person = 1; person <= n; person++) {\n      if (color[person] == 0 && !dfs(person, 1, graph, color)) return false;\n    }\n    return true;\n  }\n\n  private boolean dfs(int person, int paint, List<List<Integer>> graph, int[] color) {\n    if (color[person] != 0) return color[person] == paint;\n    color[person] = paint;\n    for (int next : graph.get(person)) {\n      if (!dfs(next, -paint, graph, color)) return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean possibleBipartition(int n, int[][] dislikes) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : dislikes) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    int[] color = new int[n + 1];\n    for (int person = 1; person <= n; person++) {\n      if (color[person] != 0) continue;\n      Deque<Integer> queue = new ArrayDeque<>();\n      queue.offer(person);\n      color[person] = 1;\n      while (!queue.isEmpty()) {\n        int current = queue.poll();\n        for (int next : graph.get(current)) {\n          if (color[next] == color[current]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[current];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean possibleBipartition(int n, int[][] dislikes) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : dislikes) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    int[] color = new int[n + 1];\n    for (int person = 1; person <= n; person++) {\n      if (color[person] != 0) continue;\n      Deque<Integer> queue = new ArrayDeque<>();\n      queue.offer(person);\n      color[person] = 1;\n      while (!queue.isEmpty()) {\n        int current = queue.poll();\n        for (int next : graph.get(current)) {\n          if (color[next] == color[current]) return false;\n          if (color[next] != 0) continue;\n          color[next] = -color[current];\n          queue.offer(next);\n        }\n      }\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Find Eventual Safe States",
      "difficulty": "Medium",
      "subpattern": "Reverse graph traversal and cycle detection",
      "question": "Given a directed graph, return all nodes that eventually lead only to terminal nodes and never enter a cycle.",
      "trigger": "A node is unsafe if any path can reach a directed cycle; safe nodes can be found by reverse topological pruning or DFS coloring.",
      "intuition": "Terminal nodes are safe first; reverse edges remove outgoing dependencies until more nodes become safe.",
      "edgeCases": "All terminal nodes, self-loop, directed cycle, disconnected graph, node with both safe and unsafe outgoing edges.",
      "constraints": "1 <= graph.length <= 10000; 0 <= graph[i].length <= graph.length; graph[i] lists outgoing edges.",
      "source": {
        "label": "Find Eventual Safe States - LeetCode 802",
        "url": "https://leetcode.com/problems/find-eventual-safe-states/"
      },
      "examples": [
        {
          "input": "graph = [[1,2],[2,3],[5],[0],[5],[],[]]",
          "output": "[2,4,5,6]",
          "explanation": "These nodes cannot reach the cycle containing 0,1,3."
        },
        {
          "input": "graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]",
          "output": "[4]",
          "explanation": "Only node 4 is terminal-safe."
        },
        {
          "input": "graph = [[],[0],[0,1]]",
          "output": "[0,1,2]",
          "explanation": "Every path reaches terminal node 0."
        }
      ],
      "bruteForceComplexity": "Time O(V(V + E)); Space O(V). Each node performs its own cycle search.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Reverse graph BFS removes each outgoing edge once.",
      "recursiveComplexity": "Time O(V + E); Space O(V). DFS coloring memoizes safe and unsafe states.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> eventualSafeNodes(int[][] graph) {\n    List<Integer> safe = new ArrayList<>();\n    for (int node = 0; node < graph.length; node++) {\n      if (!canReachCycle(node, graph, new boolean[graph.length])) safe.add(node);\n    }\n    return safe;\n  }\n\n  private boolean canReachCycle(int node, int[][] graph, boolean[] path) {\n    if (path[node]) return true;\n    path[node] = true;\n    for (int next : graph[node]) {\n      if (canReachCycle(next, graph, path)) {\n        path[node] = false;\n        return true;\n      }\n    }\n    path[node] = false;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> eventualSafeNodes(int[][] graph) {\n    int n = graph.length;\n    List<List<Integer>> reverse = new ArrayList<>();\n    for (int i = 0; i < n; i++) reverse.add(new ArrayList<>());\n    int[] outdegree = new int[n];\n\n    for (int node = 0; node < n; node++) {\n      outdegree[node] = graph[node].length;\n      for (int next : graph[node]) reverse.get(next).add(node);\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int node = 0; node < n; node++) {\n      if (outdegree[node] == 0) queue.offer(node);\n    }\n\n    boolean[] safe = new boolean[n];\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      safe[node] = true;\n      for (int prev : reverse.get(node)) {\n        if (--outdegree[prev] == 0) queue.offer(prev);\n      }\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (safe[node]) answer.add(node);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> eventualSafeNodes(int[][] graph) {\n    int[] state = new int[graph.length];\n    List<Integer> answer = new ArrayList<>();\n    for (int node = 0; node < graph.length; node++) {\n      if (safe(node, graph, state)) answer.add(node);\n    }\n    return answer;\n  }\n\n  private boolean safe(int node, int[][] graph, int[] state) {\n    if (state[node] != 0) return state[node] == 2;\n    state[node] = 1;\n    for (int next : graph[node]) {\n      if (!safe(next, graph, state)) return false;\n    }\n    state[node] = 2;\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> eventualSafeNodes(int[][] graph) {\n    int n = graph.length;\n    List<List<Integer>> reverse = new ArrayList<>();\n    for (int i = 0; i < n; i++) reverse.add(new ArrayList<>());\n    int[] outdegree = new int[n];\n\n    for (int node = 0; node < n; node++) {\n      outdegree[node] = graph[node].length;\n      for (int next : graph[node]) reverse.get(next).add(node);\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int node = 0; node < n; node++) {\n      if (outdegree[node] == 0) queue.offer(node);\n    }\n\n    boolean[] safe = new boolean[n];\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      safe[node] = true;\n      for (int prev : reverse.get(node)) {\n        if (--outdegree[prev] == 0) queue.offer(prev);\n      }\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (safe[node]) answer.add(node);\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> eventualSafeNodes(int[][] graph) {\n    int n = graph.length;\n    List<List<Integer>> reverse = new ArrayList<>();\n    for (int i = 0; i < n; i++) reverse.add(new ArrayList<>());\n    int[] outdegree = new int[n];\n\n    for (int node = 0; node < n; node++) {\n      outdegree[node] = graph[node].length;\n      for (int next : graph[node]) reverse.get(next).add(node);\n    }\n\n    Deque<Integer> queue = new ArrayDeque<>();\n    for (int node = 0; node < n; node++) {\n      if (outdegree[node] == 0) queue.offer(node);\n    }\n\n    boolean[] safe = new boolean[n];\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      safe[node] = true;\n      for (int prev : reverse.get(node)) {\n        if (--outdegree[prev] == 0) queue.offer(prev);\n      }\n    }\n\n    List<Integer> answer = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (safe[node]) answer.add(node);\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Keys and Rooms",
      "difficulty": "Medium",
      "subpattern": "Reachability in directed graphs",
      "question": "Given rooms where each room contains keys to other rooms, return true if every room can be visited starting from room 0.",
      "trigger": "Rooms are graph nodes and keys are directed edges; the task is reachability from node 0.",
      "intuition": "Traverse all keys reachable from room 0 and check whether the visited count equals the number of rooms.",
      "edgeCases": "One room, room with no keys, unreachable room, cycle of keys, duplicate keys, key to already visited room.",
      "constraints": "2 <= rooms.length <= 1000; 0 <= rooms[i].length <= 1000; keys are room indexes.",
      "source": {
        "label": "Keys and Rooms - LeetCode 841",
        "url": "https://leetcode.com/problems/keys-and-rooms/"
      },
      "examples": [
        {
          "input": "rooms = [[1],[2],[3],[]]",
          "output": "true",
          "explanation": "The keys unlock every room in order."
        },
        {
          "input": "rooms = [[1,3],[3,0,1],[2],[0]]",
          "output": "false",
          "explanation": "Room 2 is never reached."
        },
        {
          "input": "rooms = [[]]",
          "output": "true",
          "explanation": "The only room is already visited."
        }
      ],
      "bruteForceComplexity": "Time O(VE); Space O(V). Repeatedly scanning all visited rooms and keys can revisit many edges.",
      "optimizedComplexity": "Time O(V + E); Space O(V). Stack traversal processes each key edge once.",
      "recursiveComplexity": "Time O(V + E); Space O(V). DFS visits each reachable room once.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n    boolean[] visited = new boolean[rooms.size()];\n    visited[0] = true;\n    boolean changed = true;\n\n    while (changed) {\n      changed = false;\n      for (int room = 0; room < rooms.size(); room++) {\n        if (!visited[room]) continue;\n        for (int key : rooms.get(room)) {\n          if (!visited[key]) {\n            visited[key] = true;\n            changed = true;\n          }\n        }\n      }\n    }\n\n    for (boolean room : visited) if (!room) return false;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n    boolean[] visited = new boolean[rooms.size()];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0);\n    visited[0] = true;\n    int count = 0;\n\n    while (!stack.isEmpty()) {\n      int room = stack.pop();\n      count++;\n      for (int key : rooms.get(room)) {\n        if (visited[key]) continue;\n        visited[key] = true;\n        stack.push(key);\n      }\n    }\n    return count == rooms.size();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n    boolean[] visited = new boolean[rooms.size()];\n    dfs(0, rooms, visited);\n    for (boolean room : visited) if (!room) return false;\n    return true;\n  }\n\n  private void dfs(int room, List<List<Integer>> rooms, boolean[] visited) {\n    if (visited[room]) return;\n    visited[room] = true;\n    for (int key : rooms.get(room)) {\n      dfs(key, rooms, visited);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n    boolean[] visited = new boolean[rooms.size()];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0);\n    visited[0] = true;\n    int count = 0;\n\n    while (!stack.isEmpty()) {\n      int room = stack.pop();\n      count++;\n      for (int key : rooms.get(room)) {\n        if (visited[key]) continue;\n        visited[key] = true;\n        stack.push(key);\n      }\n    }\n    return count == rooms.size();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n    boolean[] visited = new boolean[rooms.size()];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0);\n    visited[0] = true;\n    int count = 0;\n\n    while (!stack.isEmpty()) {\n      int room = stack.pop();\n      count++;\n      for (int key : rooms.get(room)) {\n        if (visited[key]) continue;\n        visited[key] = true;\n        stack.push(key);\n      }\n    }\n    return count == rooms.size();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Reorder Routes to Make All Paths Lead to the City Zero",
      "difficulty": "Medium",
      "subpattern": "Tree traversal with directed edge cost",
      "question": "Given directed roads forming a tree, return the minimum number of roads that must be reversed so every city can reach city 0.",
      "trigger": "The undirected structure is a tree, but each traversal edge carries a cost if its original direction points away from city 0.",
      "intuition": "Traverse outward from city 0; every original edge followed outward must be reversed.",
      "edgeCases": "n = 1, all roads already point to zero, all roads point away from zero, star tree, long chain.",
      "constraints": "2 <= n <= 50000; connections.length == n - 1; connections[i] = [from, to].",
      "source": {
        "label": "Reorder Routes - LeetCode 1466",
        "url": "https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/"
      },
      "examples": [
        {
          "input": "n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
          "output": "3",
          "explanation": "Reverse roads 0->1, 1->3, and 4->5."
        },
        {
          "input": "n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]",
          "output": "2",
          "explanation": "Two roads point away from the route to city 0."
        },
        {
          "input": "n = 3, connections = [[1,0],[2,0]]",
          "output": "0",
          "explanation": "Every city already reaches city 0."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeated scans grow the set of cities known to reach zero.",
      "optimizedComplexity": "Time O(n); Space O(n). One traversal of the signed tree counts wrong-direction edges.",
      "recursiveComplexity": "Time O(n); Space O(n). DFS over the signed tree counts each edge once.",
      "bruteForceCode": "class Solution {\n  public int minReorder(int n, int[][] connections) {\n    boolean[] reachesZero = new boolean[n];\n    reachesZero[0] = true;\n    int known = 1;\n    int changes = 0;\n\n    while (known < n) {\n      for (int[] road : connections) {\n        int from = road[0], to = road[1];\n        if (reachesZero[to] && !reachesZero[from]) {\n          reachesZero[from] = true;\n          known++;\n        } else if (reachesZero[from] && !reachesZero[to]) {\n          reachesZero[to] = true;\n          known++;\n          changes++;\n        }\n      }\n    }\n    return changes;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minReorder(int n, int[][] connections) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] road : connections) {\n      graph.get(road[0]).add(new int[] {road[1], 1});\n      graph.get(road[1]).add(new int[] {road[0], 0});\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0);\n    seen[0] = true;\n    int changes = 0;\n\n    while (!stack.isEmpty()) {\n      int city = stack.pop();\n      for (int[] edge : graph.get(city)) {\n        int next = edge[0], cost = edge[1];\n        if (seen[next]) continue;\n        seen[next] = true;\n        changes += cost;\n        stack.push(next);\n      }\n    }\n    return changes;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minReorder(int n, int[][] connections) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] road : connections) {\n      graph.get(road[0]).add(new int[] {road[1], 1});\n      graph.get(road[1]).add(new int[] {road[0], 0});\n    }\n    return dfs(0, -1, graph);\n  }\n\n  private int dfs(int city, int parent, List<List<int[]>> graph) {\n    int changes = 0;\n    for (int[] edge : graph.get(city)) {\n      int next = edge[0], cost = edge[1];\n      if (next == parent) continue;\n      changes += cost + dfs(next, city, graph);\n    }\n    return changes;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minReorder(int n, int[][] connections) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] road : connections) {\n      graph.get(road[0]).add(new int[] {road[1], 1});\n      graph.get(road[1]).add(new int[] {road[0], 0});\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0);\n    seen[0] = true;\n    int changes = 0;\n\n    while (!stack.isEmpty()) {\n      int city = stack.pop();\n      for (int[] edge : graph.get(city)) {\n        int next = edge[0], cost = edge[1];\n        if (seen[next]) continue;\n        seen[next] = true;\n        changes += cost;\n        stack.push(next);\n      }\n    }\n    return changes;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minReorder(int n, int[][] connections) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] road : connections) {\n      graph.get(road[0]).add(new int[] {road[1], 1});\n      graph.get(road[1]).add(new int[] {road[0], 0});\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0);\n    seen[0] = true;\n    int changes = 0;\n\n    while (!stack.isEmpty()) {\n      int city = stack.pop();\n      for (int[] edge : graph.get(city)) {\n        int next = edge[0], cost = edge[1];\n        if (seen[next]) continue;\n        seen[next] = true;\n        changes += cost;\n        stack.push(next);\n      }\n    }\n    return changes;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Height Trees",
      "difficulty": "Medium",
      "subpattern": "Tree graph leaf trimming",
      "question": "Given an undirected tree, return all root labels that produce a tree of minimum possible height.",
      "trigger": "Tree centers are found by repeatedly removing leaves until one or two middle nodes remain.",
      "intuition": "The best roots are the last nodes left after trimming the outermost layer of leaves.",
      "edgeCases": "n = 1, n = 2, line tree, star tree, two centers, one center.",
      "constraints": "1 <= n <= 20000; edges.length == n - 1; edges form a tree.",
      "source": {
        "label": "Minimum Height Trees - LeetCode 310",
        "url": "https://leetcode.com/problems/minimum-height-trees/"
      },
      "examples": [
        {
          "input": "n = 4, edges = [[1,0],[1,2],[1,3]]",
          "output": "[1]",
          "explanation": "Rooting at 1 gives height 1."
        },
        {
          "input": "n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]",
          "output": "[3,4]",
          "explanation": "The tree has two centers."
        },
        {
          "input": "n = 1, edges = []",
          "output": "[0]",
          "explanation": "The only node is the only root."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). BFS computes the height for every possible root.",
      "optimizedComplexity": "Time O(n); Space O(n). Leaf trimming removes every node once.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursive height calculation is repeated for each root.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findMinHeightTrees(int n, int[][] edges) {\n    if (n == 1) return Arrays.asList(0);\n    List<List<Integer>> graph = build(n, edges);\n    int best = Integer.MAX_VALUE;\n    List<Integer> answer = new ArrayList<>();\n\n    for (int root = 0; root < n; root++) {\n      int height = heightByBfs(root, graph);\n      if (height < best) {\n        best = height;\n        answer.clear();\n      }\n      if (height == best) answer.add(root);\n    }\n    return answer;\n  }\n\n  private int heightByBfs(int root, List<List<Integer>> graph) {\n    boolean[] seen = new boolean[graph.size()];\n    Deque<Integer> queue = new ArrayDeque<>();\n    queue.offer(root);\n    seen[root] = true;\n    int height = -1;\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      height++;\n      for (int i = 0; i < size; i++) {\n        int node = queue.poll();\n        for (int next : graph.get(node)) {\n          if (!seen[next]) {\n            seen[next] = true;\n            queue.offer(next);\n          }\n        }\n      }\n    }\n    return height;\n  }\n\n  private List<List<Integer>> build(int n, int[][] edges) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return graph;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findMinHeightTrees(int n, int[][] edges) {\n    if (n == 1) return Arrays.asList(0);\n    List<Set<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new HashSet<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    Deque<Integer> leaves = new ArrayDeque<>();\n    for (int i = 0; i < n; i++) {\n      if (graph.get(i).size() == 1) leaves.offer(i);\n    }\n\n    int remaining = n;\n    while (remaining > 2) {\n      int size = leaves.size();\n      remaining -= size;\n      for (int i = 0; i < size; i++) {\n        int leaf = leaves.poll();\n        int neighbor = graph.get(leaf).iterator().next();\n        graph.get(neighbor).remove(leaf);\n        if (graph.get(neighbor).size() == 1) leaves.offer(neighbor);\n      }\n    }\n    return new ArrayList<>(leaves);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findMinHeightTrees(int n, int[][] edges) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    int best = Integer.MAX_VALUE;\n    List<Integer> answer = new ArrayList<>();\n    for (int root = 0; root < n; root++) {\n      int height = height(root, -1, graph);\n      if (height < best) {\n        best = height;\n        answer.clear();\n      }\n      if (height == best) answer.add(root);\n    }\n    return answer;\n  }\n\n  private int height(int node, int parent, List<List<Integer>> graph) {\n    int bestChild = -1;\n    for (int next : graph.get(node)) {\n      if (next != parent) bestChild = Math.max(bestChild, height(next, node, graph));\n    }\n    return bestChild + 1;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findMinHeightTrees(int n, int[][] edges) {\n    if (n == 1) return Arrays.asList(0);\n    List<Set<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new HashSet<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    Deque<Integer> leaves = new ArrayDeque<>();\n    for (int i = 0; i < n; i++) {\n      if (graph.get(i).size() == 1) leaves.offer(i);\n    }\n\n    int remaining = n;\n    while (remaining > 2) {\n      int size = leaves.size();\n      remaining -= size;\n      for (int i = 0; i < size; i++) {\n        int leaf = leaves.poll();\n        int neighbor = graph.get(leaf).iterator().next();\n        graph.get(neighbor).remove(leaf);\n        if (graph.get(neighbor).size() == 1) leaves.offer(neighbor);\n      }\n    }\n    return new ArrayList<>(leaves);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> findMinHeightTrees(int n, int[][] edges) {\n    if (n == 1) return Arrays.asList(0);\n    List<Set<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new HashSet<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    Deque<Integer> leaves = new ArrayDeque<>();\n    for (int i = 0; i < n; i++) {\n      if (graph.get(i).size() == 1) leaves.offer(i);\n    }\n\n    int remaining = n;\n    while (remaining > 2) {\n      int size = leaves.size();\n      remaining -= size;\n      for (int i = 0; i < size; i++) {\n        int leaf = leaves.poll();\n        int neighbor = graph.get(leaf).iterator().next();\n        graph.get(neighbor).remove(leaf);\n        if (graph.get(neighbor).size() == 1) leaves.offer(neighbor);\n      }\n    }\n    return new ArrayList<>(leaves);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Evaluate Division",
      "difficulty": "Medium",
      "subpattern": "Weighted graph path product",
      "question": "Given equations a / b = value and queries x / y, return each query result or -1.0 when the relationship is unknown.",
      "trigger": "Variables are graph nodes, ratios are weighted edges, and a query asks for path product between two nodes.",
      "intuition": "Build bidirectional weighted edges; multiply edge weights along any path from source to target.",
      "edgeCases": "Unknown variable, same source and target, disconnected variables, reciprocal edge, chain of ratios.",
      "constraints": "1 <= equations.length <= 20; values are positive; queries ask pairs of variable names.",
      "source": {
        "label": "Evaluate Division - LeetCode 399",
        "url": "https://leetcode.com/problems/evaluate-division/"
      },
      "examples": [
        {
          "input": "equations = [[\"a\",\"b\"],[\"b\",\"c\"]], values = [2.0,3.0], queries = [[\"a\",\"c\"],[\"b\",\"a\"],[\"a\",\"e\"],[\"a\",\"a\"],[\"x\",\"x\"]]",
          "output": "[6.0,0.5,-1.0,1.0,-1.0]",
          "explanation": "Known paths multiply ratios; unknown variables return -1.0."
        },
        {
          "input": "equations = [[\"a\",\"b\"]], values = [0.5], queries = [[\"a\",\"b\"],[\"b\",\"a\"]]",
          "output": "[0.5,2.0]",
          "explanation": "The reverse edge stores the reciprocal."
        },
        {
          "input": "equations = [[\"a\",\"b\"],[\"c\",\"d\"]], values = [1.5,2.5], queries = [[\"a\",\"d\"]]",
          "output": "[-1.0]",
          "explanation": "The variables are in different components."
        }
      ],
      "bruteForceComplexity": "Time O(QE^2); Space O(E). Each query scans the equation list during DFS.",
      "optimizedComplexity": "Time O(E + Q(V + E)); Space O(V + E). BFS uses an adjacency map.",
      "recursiveComplexity": "Time O(E + Q(V + E)); Space O(V + E). Recursive DFS multiplies weights along one path.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {\n    double[] answer = new double[queries.size()];\n    Set<String> vars = new HashSet<>();\n    for (List<String> equation : equations) vars.addAll(equation);\n\n    for (int i = 0; i < queries.size(); i++) {\n      String start = queries.get(i).get(0), end = queries.get(i).get(1);\n      if (!vars.contains(start) || !vars.contains(end)) answer[i] = -1.0;\n      else answer[i] = scan(start, end, equations, values, new HashSet<>(), 1.0);\n    }\n    return answer;\n  }\n\n  private double scan(String current, String target, List<List<String>> equations, double[] values, Set<String> seen, double product) {\n    if (current.equals(target)) return product;\n    if (!seen.add(current)) return -1.0;\n    for (int i = 0; i < equations.size(); i++) {\n      String a = equations.get(i).get(0), b = equations.get(i).get(1);\n      if (a.equals(current)) {\n        double result = scan(b, target, equations, values, seen, product * values[i]);\n        if (result != -1.0) return result;\n      }\n      if (b.equals(current)) {\n        double result = scan(a, target, equations, values, seen, product / values[i]);\n        if (result != -1.0) return result;\n      }\n    }\n    return -1.0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {\n    Map<String, List<Edge>> graph = new HashMap<>();\n    for (int i = 0; i < equations.size(); i++) {\n      String a = equations.get(i).get(0), b = equations.get(i).get(1);\n      graph.computeIfAbsent(a, unused -> new ArrayList<>()).add(new Edge(b, values[i]));\n      graph.computeIfAbsent(b, unused -> new ArrayList<>()).add(new Edge(a, 1.0 / values[i]));\n    }\n\n    double[] answer = new double[queries.size()];\n    for (int i = 0; i < queries.size(); i++) {\n      answer[i] = bfs(queries.get(i).get(0), queries.get(i).get(1), graph);\n    }\n    return answer;\n  }\n\n  private double bfs(String start, String target, Map<String, List<Edge>> graph) {\n    if (!graph.containsKey(start) || !graph.containsKey(target)) return -1.0;\n    Deque<Edge> queue = new ArrayDeque<>();\n    Set<String> seen = new HashSet<>();\n    queue.offer(new Edge(start, 1.0));\n    seen.add(start);\n    while (!queue.isEmpty()) {\n      Edge current = queue.poll();\n      if (current.to.equals(target)) return current.weight;\n      for (Edge next : graph.get(current.to)) {\n        if (seen.add(next.to)) queue.offer(new Edge(next.to, current.weight * next.weight));\n      }\n    }\n    return -1.0;\n  }\n\n  private static class Edge {\n    String to;\n    double weight;\n    Edge(String to, double weight) { this.to = to; this.weight = weight; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {\n    Map<String, Map<String, Double>> graph = new HashMap<>();\n    for (int i = 0; i < equations.size(); i++) {\n      String a = equations.get(i).get(0), b = equations.get(i).get(1);\n      graph.computeIfAbsent(a, unused -> new HashMap<>()).put(b, values[i]);\n      graph.computeIfAbsent(b, unused -> new HashMap<>()).put(a, 1.0 / values[i]);\n    }\n\n    double[] answer = new double[queries.size()];\n    for (int i = 0; i < queries.size(); i++) {\n      answer[i] = dfs(queries.get(i).get(0), queries.get(i).get(1), graph, new HashSet<>(), 1.0);\n    }\n    return answer;\n  }\n\n  private double dfs(String current, String target, Map<String, Map<String, Double>> graph, Set<String> seen, double product) {\n    if (!graph.containsKey(current) || !seen.add(current)) return -1.0;\n    if (current.equals(target)) return product;\n    for (Map.Entry<String, Double> edge : graph.get(current).entrySet()) {\n      double result = dfs(edge.getKey(), target, graph, seen, product * edge.getValue());\n      if (result != -1.0) return result;\n    }\n    return -1.0;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {\n    Map<String, List<Edge>> graph = new HashMap<>();\n    for (int i = 0; i < equations.size(); i++) {\n      String a = equations.get(i).get(0), b = equations.get(i).get(1);\n      graph.computeIfAbsent(a, unused -> new ArrayList<>()).add(new Edge(b, values[i]));\n      graph.computeIfAbsent(b, unused -> new ArrayList<>()).add(new Edge(a, 1.0 / values[i]));\n    }\n\n    double[] answer = new double[queries.size()];\n    for (int i = 0; i < queries.size(); i++) {\n      answer[i] = bfs(queries.get(i).get(0), queries.get(i).get(1), graph);\n    }\n    return answer;\n  }\n\n  private double bfs(String start, String target, Map<String, List<Edge>> graph) {\n    if (!graph.containsKey(start) || !graph.containsKey(target)) return -1.0;\n    Deque<Edge> queue = new ArrayDeque<>();\n    Set<String> seen = new HashSet<>();\n    queue.offer(new Edge(start, 1.0));\n    seen.add(start);\n    while (!queue.isEmpty()) {\n      Edge current = queue.poll();\n      if (current.to.equals(target)) return current.weight;\n      for (Edge next : graph.get(current.to)) {\n        if (seen.add(next.to)) queue.offer(new Edge(next.to, current.weight * next.weight));\n      }\n    }\n    return -1.0;\n  }\n\n  private static class Edge {\n    String to;\n    double weight;\n    Edge(String to, double weight) { this.to = to; this.weight = weight; }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {\n    Map<String, List<Edge>> graph = new HashMap<>();\n    for (int i = 0; i < equations.size(); i++) {\n      String a = equations.get(i).get(0), b = equations.get(i).get(1);\n      graph.computeIfAbsent(a, unused -> new ArrayList<>()).add(new Edge(b, values[i]));\n      graph.computeIfAbsent(b, unused -> new ArrayList<>()).add(new Edge(a, 1.0 / values[i]));\n    }\n\n    double[] answer = new double[queries.size()];\n    for (int i = 0; i < queries.size(); i++) {\n      answer[i] = bfs(queries.get(i).get(0), queries.get(i).get(1), graph);\n    }\n    return answer;\n  }\n\n  private double bfs(String start, String target, Map<String, List<Edge>> graph) {\n    if (!graph.containsKey(start) || !graph.containsKey(target)) return -1.0;\n    Deque<Edge> queue = new ArrayDeque<>();\n    Set<String> seen = new HashSet<>();\n    queue.offer(new Edge(start, 1.0));\n    seen.add(start);\n    while (!queue.isEmpty()) {\n      Edge current = queue.poll();\n      if (current.to.equals(target)) return current.weight;\n      for (Edge next : graph.get(current.to)) {\n        if (seen.add(next.to)) queue.offer(new Edge(next.to, current.weight * next.weight));\n      }\n    }\n    return -1.0;\n  }\n\n  private static class Edge {\n    String to;\n    double weight;\n    Edge(String to, double weight) { this.to = to; this.weight = weight; }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Alien Dictionary",
      "difficulty": "Hard",
      "subpattern": "Topological sorting with lexicographic constraints",
      "question": "Given a sorted list of words from an alien language, return a possible character order, or an empty string if no valid order exists.",
      "trigger": "The first differing character between adjacent words gives a directed ordering edge.",
      "intuition": "Build character precedence edges, reject invalid prefix order, then topologically sort the character graph.",
      "edgeCases": "Invalid prefix such as abc before ab, one word, disconnected letters, duplicate edge, cycle, repeated words.",
      "constraints": "1 <= words.length <= 100; 1 <= words[i].length <= 100; words contain lowercase English letters.",
      "source": {
        "label": "Alien Dictionary - LeetCode 269",
        "url": "https://leetcode.com/problems/alien-dictionary/"
      },
      "examples": [
        {
          "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
          "output": "\"wertf\"",
          "explanation": "Adjacent differences give w->e, r->t, t->f, and e->r."
        },
        {
          "input": "words = [\"z\",\"x\"]",
          "output": "\"zx\"",
          "explanation": "z must come before x."
        },
        {
          "input": "words = [\"abc\",\"ab\"]",
          "output": "\"\"",
          "explanation": "A longer word cannot appear before its exact prefix."
        }
      ],
      "bruteForceComplexity": "Time O(C^2 + total characters); Space O(C + E), where C is unique letters. Zero-indegree selection scans all letters repeatedly.",
      "optimizedComplexity": "Time O(C + E + total characters); Space O(C + E). Kahn BFS uses adjacency and indegrees.",
      "recursiveComplexity": "Time O(C + E + total characters); Space O(C + E). DFS topological sort detects cycles with coloring.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    Map<Character, Set<Character>> graph = buildGraph(words);\n    if (graph == null) return \"\";\n    Map<Character, Integer> indegree = indegrees(graph);\n    StringBuilder order = new StringBuilder();\n\n    while (order.length() < graph.size()) {\n      Character pick = null;\n      for (char ch : graph.keySet()) {\n        if (indegree.get(ch) == 0 && order.indexOf(String.valueOf(ch)) == -1) {\n          pick = ch;\n          break;\n        }\n      }\n      if (pick == null) return \"\";\n      order.append(pick);\n      for (char next : graph.get(pick)) indegree.put(next, indegree.get(next) - 1);\n    }\n    return order.toString();\n  }\n\n  private Map<Character, Set<Character>> buildGraph(String[] words) {\n    Map<Character, Set<Character>> graph = new HashMap<>();\n    for (String word : words) for (char ch : word.toCharArray()) graph.putIfAbsent(ch, new HashSet<>());\n    for (int i = 0; i + 1 < words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() > b.length() && a.startsWith(b)) return null;\n      for (int j = 0; j < Math.min(a.length(), b.length()); j++) {\n        if (a.charAt(j) != b.charAt(j)) {\n          graph.get(a.charAt(j)).add(b.charAt(j));\n          break;\n        }\n      }\n    }\n    return graph;\n  }\n\n  private Map<Character, Integer> indegrees(Map<Character, Set<Character>> graph) {\n    Map<Character, Integer> indegree = new HashMap<>();\n    for (char ch : graph.keySet()) indegree.put(ch, 0);\n    for (char from : graph.keySet()) for (char to : graph.get(from)) indegree.put(to, indegree.get(to) + 1);\n    return indegree;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    Map<Character, Set<Character>> graph = new HashMap<>();\n    Map<Character, Integer> indegree = new HashMap<>();\n    for (String word : words) {\n      for (char ch : word.toCharArray()) {\n        graph.putIfAbsent(ch, new HashSet<>());\n        indegree.putIfAbsent(ch, 0);\n      }\n    }\n\n    for (int i = 0; i + 1 < words.length; i++) {\n      String first = words[i], second = words[i + 1];\n      if (first.length() > second.length() && first.startsWith(second)) return \"\";\n      for (int j = 0; j < Math.min(first.length(), second.length()); j++) {\n        char a = first.charAt(j), b = second.charAt(j);\n        if (a == b) continue;\n        if (graph.get(a).add(b)) indegree.put(b, indegree.get(b) + 1);\n        break;\n      }\n    }\n\n    Deque<Character> queue = new ArrayDeque<>();\n    for (char ch : indegree.keySet()) if (indegree.get(ch) == 0) queue.offer(ch);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      char ch = queue.poll();\n      order.append(ch);\n      for (char next : graph.get(ch)) {\n        indegree.put(next, indegree.get(next) - 1);\n        if (indegree.get(next) == 0) queue.offer(next);\n      }\n    }\n    return order.length() == indegree.size() ? order.toString() : \"\";\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    Map<Character, Set<Character>> graph = new HashMap<>();\n    for (String word : words) for (char ch : word.toCharArray()) graph.putIfAbsent(ch, new HashSet<>());\n\n    for (int i = 0; i + 1 < words.length; i++) {\n      String first = words[i], second = words[i + 1];\n      if (first.length() > second.length() && first.startsWith(second)) return \"\";\n      for (int j = 0; j < Math.min(first.length(), second.length()); j++) {\n        char a = first.charAt(j), b = second.charAt(j);\n        if (a != b) {\n          graph.get(a).add(b);\n          break;\n        }\n      }\n    }\n\n    Map<Character, Integer> state = new HashMap<>();\n    StringBuilder postorder = new StringBuilder();\n    for (char ch : graph.keySet()) {\n      if (!dfs(ch, graph, state, postorder)) return \"\";\n    }\n    return postorder.reverse().toString();\n  }\n\n  private boolean dfs(char ch, Map<Character, Set<Character>> graph, Map<Character, Integer> state, StringBuilder postorder) {\n    if (state.getOrDefault(ch, 0) == 1) return false;\n    if (state.getOrDefault(ch, 0) == 2) return true;\n    state.put(ch, 1);\n    for (char next : graph.get(ch)) {\n      if (!dfs(next, graph, state, postorder)) return false;\n    }\n    state.put(ch, 2);\n    postorder.append(ch);\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    Map<Character, Set<Character>> graph = new HashMap<>();\n    Map<Character, Integer> indegree = new HashMap<>();\n    for (String word : words) {\n      for (char ch : word.toCharArray()) {\n        graph.putIfAbsent(ch, new HashSet<>());\n        indegree.putIfAbsent(ch, 0);\n      }\n    }\n\n    for (int i = 0; i + 1 < words.length; i++) {\n      String first = words[i], second = words[i + 1];\n      if (first.length() > second.length() && first.startsWith(second)) return \"\";\n      for (int j = 0; j < Math.min(first.length(), second.length()); j++) {\n        char a = first.charAt(j), b = second.charAt(j);\n        if (a == b) continue;\n        if (graph.get(a).add(b)) indegree.put(b, indegree.get(b) + 1);\n        break;\n      }\n    }\n\n    Deque<Character> queue = new ArrayDeque<>();\n    for (char ch : indegree.keySet()) if (indegree.get(ch) == 0) queue.offer(ch);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      char ch = queue.poll();\n      order.append(ch);\n      for (char next : graph.get(ch)) {\n        indegree.put(next, indegree.get(next) - 1);\n        if (indegree.get(next) == 0) queue.offer(next);\n      }\n    }\n    return order.length() == indegree.size() ? order.toString() : \"\";\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    Map<Character, Set<Character>> graph = new HashMap<>();\n    Map<Character, Integer> indegree = new HashMap<>();\n    for (String word : words) {\n      for (char ch : word.toCharArray()) {\n        graph.putIfAbsent(ch, new HashSet<>());\n        indegree.putIfAbsent(ch, 0);\n      }\n    }\n\n    for (int i = 0; i + 1 < words.length; i++) {\n      String first = words[i], second = words[i + 1];\n      if (first.length() > second.length() && first.startsWith(second)) return \"\";\n      for (int j = 0; j < Math.min(first.length(), second.length()); j++) {\n        char a = first.charAt(j), b = second.charAt(j);\n        if (a == b) continue;\n        if (graph.get(a).add(b)) indegree.put(b, indegree.get(b) + 1);\n        break;\n      }\n    }\n\n    Deque<Character> queue = new ArrayDeque<>();\n    for (char ch : indegree.keySet()) if (indegree.get(ch) == 0) queue.offer(ch);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      char ch = queue.poll();\n      order.append(ch);\n      for (char next : graph.get(ch)) {\n        indegree.put(next, indegree.get(next) - 1);\n        if (indegree.get(next) == 0) queue.offer(next);\n      }\n    }\n    return order.length() == indegree.size() ? order.toString() : \"\";\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Network Delay Time",
      "difficulty": "Medium",
      "subpattern": "Weighted shortest path with Dijkstra",
      "question": "Given directed weighted edges and a starting node k, return the time for all nodes to receive the signal, or -1 if some node is unreachable.",
      "trigger": "Signal arrival time is single-source shortest path over positive weighted directed edges.",
      "intuition": "Use Dijkstra to settle nodes in increasing known arrival time; the answer is the largest settled distance.",
      "edgeCases": "Unreachable node, single node, multiple edges between same nodes, cycle, k has no outgoing edge.",
      "constraints": "1 <= n <= 100; 1 <= times.length <= 6000; edge weights are positive; nodes are labeled 1 to n.",
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
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE / 4);\n    dist[k] = 0;\n\n    for (int i = 1; i < n; i++) {\n      boolean changed = false;\n      for (int[] edge : times) {\n        int from = edge[0], to = edge[1], weight = edge[2];\n        if (dist[from] + weight < dist[to]) {\n          dist[to] = dist[from] + weight;\n          changed = true;\n        }\n      }\n      if (!changed) break;\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) answer = Math.max(answer, dist[node]);\n    return answer >= Integer.MAX_VALUE / 4 ? -1 : answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    pq.offer(new int[] {k, 0});\n\n    while (!pq.isEmpty()) {\n      int[] current = pq.poll();\n      int node = current[0], time = current[1];\n      if (time != dist[node]) continue;\n      for (int[] edge : graph.get(node)) {\n        int next = edge[0], arrival = time + edge[1];\n        if (arrival < dist[next]) {\n          dist[next] = arrival;\n          pq.offer(new int[] {next, arrival});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) answer = Math.max(answer, dist[node]);\n    return answer == Integer.MAX_VALUE ? -1 : answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE / 4);\n    relax(k, 0, graph, dist);\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) answer = Math.max(answer, dist[node]);\n    return answer >= Integer.MAX_VALUE / 4 ? -1 : answer;\n  }\n\n  private void relax(int node, int time, List<List<int[]>> graph, int[] dist) {\n    if (time >= dist[node]) return;\n    dist[node] = time;\n    for (int[] edge : graph.get(node)) {\n      relax(edge[0], time + edge[1], graph, dist);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    pq.offer(new int[] {k, 0});\n\n    while (!pq.isEmpty()) {\n      int[] current = pq.poll();\n      int node = current[0], time = current[1];\n      if (time != dist[node]) continue;\n      for (int[] edge : graph.get(node)) {\n        int next = edge[0], arrival = time + edge[1];\n        if (arrival < dist[next]) {\n          dist[next] = arrival;\n          pq.offer(new int[] {next, arrival});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) answer = Math.max(answer, dist[node]);\n    return answer == Integer.MAX_VALUE ? -1 : answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : times) graph.get(edge[0]).add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    pq.offer(new int[] {k, 0});\n\n    while (!pq.isEmpty()) {\n      int[] current = pq.poll();\n      int node = current[0], time = current[1];\n      if (time != dist[node]) continue;\n      for (int[] edge : graph.get(node)) {\n        int next = edge[0], arrival = time + edge[1];\n        if (arrival < dist[next]) {\n          dist[next] = arrival;\n          pq.offer(new int[] {next, arrival});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) answer = Math.max(answer, dist[node]);\n    return answer == Integer.MAX_VALUE ? -1 : answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Cheapest Flights Within K Stops",
      "difficulty": "Medium",
      "subpattern": "Bounded weighted shortest path",
      "question": "Given flights, source, destination, and k, return the cheapest price from source to destination using at most k stops, or -1 if impossible.",
      "trigger": "The path has edge weights and a strict edge-count limit, so normal Dijkstra state must include stops or Bellman-Ford rounds.",
      "intuition": "At most k stops means at most k + 1 edges; relax prices exactly that many layers.",
      "edgeCases": "No route, direct flight cheaper, route with more than k stops cheaper but invalid, src equals dst, cycles.",
      "constraints": "1 <= n <= 100; 0 <= flights.length <= n*(n-1); 0 <= k < n; prices are positive.",
      "source": {
        "label": "Cheapest Flights Within K Stops - LeetCode 787",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
      },
      "examples": [
        {
          "input": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
          "output": "700",
          "explanation": "0 -> 1 -> 3 has one stop and cost 700."
        },
        {
          "input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
          "output": "200",
          "explanation": "0 -> 1 -> 2 is allowed with one stop."
        },
        {
          "input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0",
          "output": "500",
          "explanation": "Only the direct flight is allowed."
        }
      ],
      "bruteForceComplexity": "Time O(branch^(k+1)); Space O(k). DFS explores bounded flight paths.",
      "optimizedComplexity": "Time O((k + 1)E); Space O(V). Bellman-Ford layer relaxation enforces the stop limit.",
      "recursiveComplexity": "Time O((k + 1)(V + E)); Space O((k + 1)V). Memoized recursion stores node and remaining-edge states.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] flight : flights) graph.get(flight[0]).add(new int[] {flight[1], flight[2]});\n    int[] best = {Integer.MAX_VALUE};\n    dfs(src, dst, k + 1, 0, graph, best, new boolean[n]);\n    return best[0] == Integer.MAX_VALUE ? -1 : best[0];\n  }\n\n  private void dfs(int city, int dst, int edgesLeft, int cost, List<List<int[]>> graph, int[] best, boolean[] path) {\n    if (city == dst) {\n      best[0] = Math.min(best[0], cost);\n      return;\n    }\n    if (edgesLeft == 0 || cost >= best[0]) return;\n    path[city] = true;\n    for (int[] flight : graph.get(city)) {\n      if (!path[flight[0]]) dfs(flight[0], dst, edgesLeft - 1, cost + flight[1], graph, best, path);\n    }\n    path[city] = false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    int inf = Integer.MAX_VALUE / 4;\n    int[] cost = new int[n];\n    Arrays.fill(cost, inf);\n    cost[src] = 0;\n\n    for (int step = 0; step <= k; step++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        int from = flight[0], to = flight[1], price = flight[2];\n        if (cost[from] == inf) continue;\n        next[to] = Math.min(next[to], cost[from] + price);\n      }\n      cost = next;\n    }\n    return cost[dst] == inf ? -1 : cost[dst];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final int INF = 1_000_000_000;\n\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    List<List<int[]>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] flight : flights) graph.get(flight[0]).add(new int[] {flight[1], flight[2]});\n\n    Integer[][] memo = new Integer[n][k + 2];\n    int answer = best(src, dst, k + 1, graph, memo);\n    return answer >= INF ? -1 : answer;\n  }\n\n  private int best(int city, int dst, int edgesLeft, List<List<int[]>> graph, Integer[][] memo) {\n    if (city == dst) return 0;\n    if (edgesLeft == 0) return INF;\n    if (memo[city][edgesLeft] != null) return memo[city][edgesLeft];\n\n    int result = INF;\n    for (int[] flight : graph.get(city)) {\n      result = Math.min(result, flight[1] + best(flight[0], dst, edgesLeft - 1, graph, memo));\n    }\n    memo[city][edgesLeft] = result;\n    return result;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    int inf = Integer.MAX_VALUE / 4;\n    int[] cost = new int[n];\n    Arrays.fill(cost, inf);\n    cost[src] = 0;\n\n    for (int step = 0; step <= k; step++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        int from = flight[0], to = flight[1], price = flight[2];\n        if (cost[from] == inf) continue;\n        next[to] = Math.min(next[to], cost[from] + price);\n      }\n      cost = next;\n    }\n    return cost[dst] == inf ? -1 : cost[dst];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    int inf = Integer.MAX_VALUE / 4;\n    int[] cost = new int[n];\n    Arrays.fill(cost, inf);\n    cost[src] = 0;\n\n    for (int step = 0; step <= k; step++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        int from = flight[0], to = flight[1], price = flight[2];\n        if (cost[from] == inf) continue;\n        next[to] = Math.min(next[to], cost[from] + price);\n      }\n      cost = next;\n    }\n    return cost[dst] == inf ? -1 : cost[dst];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Shortest Bridge",
      "difficulty": "Medium",
      "subpattern": "DFS island marking plus BFS expansion",
      "question": "Given a binary grid with exactly two islands, return the minimum number of water cells to flip to connect them.",
      "trigger": "First identify one island as a source set, then expand through water by BFS until the other island is reached.",
      "intuition": "The shortest bridge is the first BFS layer from island A that touches island B.",
      "edgeCases": "Islands already separated by one water cell, islands at corners, thin islands, large water gap, n = 2.",
      "constraints": "2 <= n <= 100; grid contains exactly two islands; islands connect four-directionally.",
      "source": {
        "label": "Shortest Bridge - LeetCode 934",
        "url": "https://leetcode.com/problems/shortest-bridge/"
      },
      "examples": [
        {
          "input": "grid = [[0,1],[1,0]]",
          "output": "1",
          "explanation": "Flip either water cell between the two diagonal islands."
        },
        {
          "input": "grid = [[0,1,0],[0,0,0],[0,0,1]]",
          "output": "2",
          "explanation": "Two water cells are needed to connect the islands."
        },
        {
          "input": "grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]",
          "output": "1",
          "explanation": "The inner island is one flip from the outer island."
        }
      ],
      "bruteForceComplexity": "Time O(n^4); Space O(n^2). After labeling islands, all cell pairs are compared by Manhattan distance.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). Mark one island, then BFS outward through water.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Recursive frontier expansion advances the bridge one layer at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int shortestBridge(int[][] grid) {\n    List<int[]> first = new ArrayList<>();\n    List<int[]> second = new ArrayList<>();\n    boolean[][] seen = new boolean[grid.length][grid.length];\n\n    for (int r = 0; r < grid.length; r++) {\n      for (int c = 0; c < grid.length; c++) {\n        if (grid[r][c] == 1 && !seen[r][c]) {\n          List<int[]> island = first.isEmpty() ? first : second;\n          collect(grid, r, c, seen, island);\n        }\n      }\n    }\n\n    int best = Integer.MAX_VALUE;\n    for (int[] a : first) {\n      for (int[] b : second) {\n        best = Math.min(best, Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) - 1);\n      }\n    }\n    return best;\n  }\n\n  private void collect(int[][] grid, int r, int c, boolean[][] seen, List<int[]> cells) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid.length) return;\n    if (seen[r][c] || grid[r][c] == 0) return;\n    seen[r][c] = true;\n    cells.add(new int[] {r, c});\n    collect(grid, r + 1, c, seen, cells);\n    collect(grid, r - 1, c, seen, cells);\n    collect(grid, r, c + 1, seen, cells);\n    collect(grid, r, c - 1, seen, cells);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int shortestBridge(int[][] grid) {\n    int n = grid.length;\n    Deque<int[]> queue = new ArrayDeque<>();\n    boolean found = false;\n\n    for (int r = 0; r < n && !found; r++) {\n      for (int c = 0; c < n && !found; c++) {\n        if (grid[r][c] == 1) {\n          markIsland(grid, r, c, queue);\n          found = true;\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    int flips = 0;\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 2) continue;\n          if (grid[nr][nc] == 1) return flips;\n          grid[nr][nc] = 2;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      flips++;\n    }\n    return -1;\n  }\n\n  private void markIsland(int[][] grid, int sr, int sc, Deque<int[]> queue) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    Deque<int[]> stack = new ArrayDeque<>();\n    stack.push(new int[] {sr, sc});\n    grid[sr][sc] = 2;\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      queue.offer(cell);\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid.length || grid[nr][nc] != 1) continue;\n        grid[nr][nc] = 2;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int shortestBridge(int[][] grid) {\n    List<int[]> frontier = new ArrayList<>();\n    boolean found = false;\n    for (int r = 0; r < grid.length && !found; r++) {\n      for (int c = 0; c < grid.length && !found; c++) {\n        if (grid[r][c] == 1) {\n          mark(grid, r, c, frontier);\n          found = true;\n        }\n      }\n    }\n    return expand(grid, frontier, 0);\n  }\n\n  private void mark(int[][] grid, int r, int c, List<int[]> frontier) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid.length || grid[r][c] != 1) return;\n    grid[r][c] = 2;\n    frontier.add(new int[] {r, c});\n    for (int[] d : dirs) mark(grid, r + d[0], c + d[1], frontier);\n  }\n\n  private int expand(int[][] grid, List<int[]> frontier, int flips) {\n    List<int[]> nextLayer = new ArrayList<>();\n    for (int[] cell : frontier) {\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid.length || grid[nr][nc] == 2) continue;\n        if (grid[nr][nc] == 1) return flips;\n        grid[nr][nc] = 2;\n        nextLayer.add(new int[] {nr, nc});\n      }\n    }\n    return expand(grid, nextLayer, flips + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int shortestBridge(int[][] grid) {\n    int n = grid.length;\n    Deque<int[]> queue = new ArrayDeque<>();\n    boolean found = false;\n\n    for (int r = 0; r < n && !found; r++) {\n      for (int c = 0; c < n && !found; c++) {\n        if (grid[r][c] == 1) {\n          markIsland(grid, r, c, queue);\n          found = true;\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    int flips = 0;\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 2) continue;\n          if (grid[nr][nc] == 1) return flips;\n          grid[nr][nc] = 2;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      flips++;\n    }\n    return -1;\n  }\n\n  private void markIsland(int[][] grid, int sr, int sc, Deque<int[]> queue) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    Deque<int[]> stack = new ArrayDeque<>();\n    stack.push(new int[] {sr, sc});\n    grid[sr][sc] = 2;\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      queue.offer(cell);\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid.length || grid[nr][nc] != 1) continue;\n        grid[nr][nc] = 2;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int shortestBridge(int[][] grid) {\n    int n = grid.length;\n    Deque<int[]> queue = new ArrayDeque<>();\n    boolean found = false;\n\n    for (int r = 0; r < n && !found; r++) {\n      for (int c = 0; c < n && !found; c++) {\n        if (grid[r][c] == 1) {\n          markIsland(grid, r, c, queue);\n          found = true;\n        }\n      }\n    }\n\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    int flips = 0;\n    while (!queue.isEmpty()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        int[] cell = queue.poll();\n        for (int[] d : dirs) {\n          int nr = cell[0] + d[0], nc = cell[1] + d[1];\n          if (nr < 0 || nc < 0 || nr == n || nc == n || grid[nr][nc] == 2) continue;\n          if (grid[nr][nc] == 1) return flips;\n          grid[nr][nc] = 2;\n          queue.offer(new int[] {nr, nc});\n        }\n      }\n      flips++;\n    }\n    return -1;\n  }\n\n  private void markIsland(int[][] grid, int sr, int sc, Deque<int[]> queue) {\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    Deque<int[]> stack = new ArrayDeque<>();\n    stack.push(new int[] {sr, sc});\n    grid[sr][sc] = 2;\n    while (!stack.isEmpty()) {\n      int[] cell = stack.pop();\n      queue.offer(cell);\n      for (int[] d : dirs) {\n        int nr = cell[0] + d[0], nc = cell[1] + d[1];\n        if (nr < 0 || nc < 0 || nr == grid.length || nc == grid.length || grid[nr][nc] != 1) continue;\n        grid[nr][nc] = 2;\n        stack.push(new int[] {nr, nc});\n      }\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Accounts Merge",
      "difficulty": "Medium",
      "subpattern": "Connected components over shared identifiers",
      "question": "Given account lists where accounts sharing any email belong to the same person, merge accounts and return each name with sorted emails.",
      "trigger": "Emails are graph nodes and accounts create edges between emails in the same connected component.",
      "intuition": "Connect emails that appear in one account, traverse each email component, and output the sorted component.",
      "edgeCases": "Single account, same email in many accounts, same name but no shared email, duplicate email inside account, disconnected users.",
      "constraints": "1 <= accounts.length <= 1000; 2 <= accounts[i].length <= 10; first entry is the name; emails are strings.",
      "source": {
        "label": "Accounts Merge - LeetCode 721",
        "url": "https://leetcode.com/problems/accounts-merge/"
      },
      "examples": [
        {
          "input": "accounts = [[\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],[\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]",
          "output": "[[\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]",
          "explanation": "The two John accounts sharing johnsmith@mail.com merge."
        },
        {
          "input": "accounts = [[\"Gabe\",\"a@mail.com\"],[\"Gabe\",\"b@mail.com\"]]",
          "output": "[[\"Gabe\",\"a@mail.com\"],[\"Gabe\",\"b@mail.com\"]]",
          "explanation": "Same name alone does not merge accounts."
        },
        {
          "input": "accounts = [[\"Alex\",\"a@mail.com\",\"b@mail.com\"],[\"Alex\",\"b@mail.com\",\"c@mail.com\"]]",
          "output": "[[\"Alex\",\"a@mail.com\",\"b@mail.com\",\"c@mail.com\"]]",
          "explanation": "The shared email connects both accounts."
        }
      ],
      "bruteForceComplexity": "Time O(A^2 * E log E); Space O(AE). Repeated set merging scans prior groups for overlap.",
      "optimizedComplexity": "Time O(total emails log total emails); Space O(total emails). DFS over email graph plus sorting components.",
      "recursiveComplexity": "Time O(total emails log total emails); Space O(total emails). Recursive DFS gathers each email component.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> accountsMerge(List<List<String>> accounts) {\n    List<String> names = new ArrayList<>();\n    List<Set<String>> groups = new ArrayList<>();\n\n    for (List<String> account : accounts) {\n      String name = account.get(0);\n      Set<String> emails = new HashSet<>(account.subList(1, account.size()));\n      int mergeInto = -1;\n      for (int i = 0; i < groups.size(); i++) {\n        if (overlap(groups.get(i), emails)) {\n          if (mergeInto == -1) {\n            mergeInto = i;\n            groups.get(i).addAll(emails);\n          } else {\n            groups.get(mergeInto).addAll(groups.get(i));\n            groups.remove(i);\n            names.remove(i);\n            i--;\n          }\n        }\n      }\n      if (mergeInto == -1) {\n        names.add(name);\n        groups.add(emails);\n      }\n    }\n    return build(names, groups);\n  }\n\n  private boolean overlap(Set<String> a, Set<String> b) {\n    for (String email : b) if (a.contains(email)) return true;\n    return false;\n  }\n\n  private List<List<String>> build(List<String> names, List<Set<String>> groups) {\n    List<List<String>> answer = new ArrayList<>();\n    for (int i = 0; i < groups.size(); i++) {\n      List<String> emails = new ArrayList<>(groups.get(i));\n      Collections.sort(emails);\n      emails.add(0, names.get(i));\n      answer.add(emails);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> accountsMerge(List<List<String>> accounts) {\n    Map<String, List<String>> graph = new HashMap<>();\n    Map<String, String> name = new HashMap<>();\n    for (List<String> account : accounts) {\n      String owner = account.get(0);\n      String first = account.get(1);\n      for (int i = 1; i < account.size(); i++) {\n        String email = account.get(i);\n        graph.computeIfAbsent(email, unused -> new ArrayList<>()).add(first);\n        graph.computeIfAbsent(first, unused -> new ArrayList<>()).add(email);\n        name.put(email, owner);\n      }\n    }\n\n    Set<String> seen = new HashSet<>();\n    List<List<String>> answer = new ArrayList<>();\n    for (String email : graph.keySet()) {\n      if (!seen.add(email)) continue;\n      List<String> component = new ArrayList<>();\n      Deque<String> stack = new ArrayDeque<>();\n      stack.push(email);\n      while (!stack.isEmpty()) {\n        String current = stack.pop();\n        component.add(current);\n        for (String next : graph.get(current)) {\n          if (seen.add(next)) stack.push(next);\n        }\n      }\n      Collections.sort(component);\n      component.add(0, name.get(email));\n      answer.add(component);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> accountsMerge(List<List<String>> accounts) {\n    Map<String, List<String>> graph = new HashMap<>();\n    Map<String, String> owner = new HashMap<>();\n    for (List<String> account : accounts) {\n      String name = account.get(0);\n      String first = account.get(1);\n      for (int i = 1; i < account.size(); i++) {\n        String email = account.get(i);\n        graph.computeIfAbsent(first, unused -> new ArrayList<>()).add(email);\n        graph.computeIfAbsent(email, unused -> new ArrayList<>()).add(first);\n        owner.put(email, name);\n      }\n    }\n\n    Set<String> seen = new HashSet<>();\n    List<List<String>> answer = new ArrayList<>();\n    for (String email : graph.keySet()) {\n      if (seen.contains(email)) continue;\n      List<String> component = new ArrayList<>();\n      dfs(email, graph, seen, component);\n      Collections.sort(component);\n      component.add(0, owner.get(email));\n      answer.add(component);\n    }\n    return answer;\n  }\n\n  private void dfs(String email, Map<String, List<String>> graph, Set<String> seen, List<String> component) {\n    if (!seen.add(email)) return;\n    component.add(email);\n    for (String next : graph.get(email)) dfs(next, graph, seen, component);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> accountsMerge(List<List<String>> accounts) {\n    Map<String, List<String>> graph = new HashMap<>();\n    Map<String, String> name = new HashMap<>();\n    for (List<String> account : accounts) {\n      String owner = account.get(0);\n      String first = account.get(1);\n      for (int i = 1; i < account.size(); i++) {\n        String email = account.get(i);\n        graph.computeIfAbsent(email, unused -> new ArrayList<>()).add(first);\n        graph.computeIfAbsent(first, unused -> new ArrayList<>()).add(email);\n        name.put(email, owner);\n      }\n    }\n\n    Set<String> seen = new HashSet<>();\n    List<List<String>> answer = new ArrayList<>();\n    for (String email : graph.keySet()) {\n      if (!seen.add(email)) continue;\n      List<String> component = new ArrayList<>();\n      Deque<String> stack = new ArrayDeque<>();\n      stack.push(email);\n      while (!stack.isEmpty()) {\n        String current = stack.pop();\n        component.add(current);\n        for (String next : graph.get(current)) {\n          if (seen.add(next)) stack.push(next);\n        }\n      }\n      Collections.sort(component);\n      component.add(0, name.get(email));\n      answer.add(component);\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> accountsMerge(List<List<String>> accounts) {\n    Map<String, List<String>> graph = new HashMap<>();\n    Map<String, String> name = new HashMap<>();\n    for (List<String> account : accounts) {\n      String owner = account.get(0);\n      String first = account.get(1);\n      for (int i = 1; i < account.size(); i++) {\n        String email = account.get(i);\n        graph.computeIfAbsent(email, unused -> new ArrayList<>()).add(first);\n        graph.computeIfAbsent(first, unused -> new ArrayList<>()).add(email);\n        name.put(email, owner);\n      }\n    }\n\n    Set<String> seen = new HashSet<>();\n    List<List<String>> answer = new ArrayList<>();\n    for (String email : graph.keySet()) {\n      if (!seen.add(email)) continue;\n      List<String> component = new ArrayList<>();\n      Deque<String> stack = new ArrayDeque<>();\n      stack.push(email);\n      while (!stack.isEmpty()) {\n        String current = stack.pop();\n        component.add(current);\n        for (String next : graph.get(current)) {\n          if (seen.add(next)) stack.push(next);\n        }\n      }\n      Collections.sort(component);\n      component.add(0, name.get(email));\n      answer.add(component);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find if Path Exists in Graph",
      "difficulty": "Easy",
      "subpattern": "Reachability in undirected graphs",
      "question": "Given an undirected graph, source, and destination, return true if there is a path from source to destination.",
      "trigger": "The task is direct reachability between two nodes in an undirected graph.",
      "intuition": "Traverse from source and stop as soon as destination is visited.",
      "edgeCases": "source equals destination, no edges, disconnected graph, isolated source, duplicate edges, large chain.",
      "constraints": "1 <= n <= 200000; 0 <= edges.length <= 200000; nodes are labeled 0 to n - 1.",
      "source": {
        "label": "Find if Path Exists in Graph - LeetCode 1971",
        "url": "https://leetcode.com/problems/find-if-path-exists-in-graph/"
      },
      "examples": [
        {
          "input": "n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2",
          "output": "true",
          "explanation": "0 connects to 2 directly and through 1."
        },
        {
          "input": "n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5",
          "output": "false",
          "explanation": "Source and destination are in different components."
        },
        {
          "input": "n = 1, edges = [], source = 0, destination = 0",
          "output": "true",
          "explanation": "The start is already the destination."
        }
      ],
      "bruteForceComplexity": "Time O(VE); Space O(V). Each expansion scans the entire edge list for neighbors.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Adjacency-list traversal visits each edge once.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive DFS stops when destination is found.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean validPath(int n, int[][] edges, int source, int destination) {\n    boolean[] seen = new boolean[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(source);\n    seen[source] = true;\n\n    while (!stack.isEmpty()) {\n      int node = stack.pop();\n      if (node == destination) return true;\n      for (int[] edge : edges) {\n        int next = -1;\n        if (edge[0] == node) next = edge[1];\n        if (edge[1] == node) next = edge[0];\n        if (next != -1 && !seen[next]) {\n          seen[next] = true;\n          stack.push(next);\n        }\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean validPath(int n, int[][] edges, int source, int destination) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> queue = new ArrayDeque<>();\n    queue.offer(source);\n    seen[source] = true;\n\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      if (node == destination) return true;\n      for (int next : graph.get(node)) {\n        if (seen[next]) continue;\n        seen[next] = true;\n        queue.offer(next);\n      }\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean validPath(int n, int[][] edges, int source, int destination) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n    return dfs(source, destination, graph, new boolean[n]);\n  }\n\n  private boolean dfs(int node, int destination, List<List<Integer>> graph, boolean[] seen) {\n    if (node == destination) return true;\n    seen[node] = true;\n    for (int next : graph.get(node)) {\n      if (!seen[next] && dfs(next, destination, graph, seen)) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean validPath(int n, int[][] edges, int source, int destination) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> queue = new ArrayDeque<>();\n    queue.offer(source);\n    seen[source] = true;\n\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      if (node == destination) return true;\n      for (int next : graph.get(node)) {\n        if (seen[next]) continue;\n        seen[next] = true;\n        queue.offer(next);\n      }\n    }\n    return false;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean validPath(int n, int[][] edges, int source, int destination) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] edge : edges) {\n      graph.get(edge[0]).add(edge[1]);\n      graph.get(edge[1]).add(edge[0]);\n    }\n\n    boolean[] seen = new boolean[n];\n    Deque<Integer> queue = new ArrayDeque<>();\n    queue.offer(source);\n    seen[source] = true;\n\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      if (node == destination) return true;\n      for (int next : graph.get(node)) {\n        if (seen[next]) continue;\n        seen[next] = true;\n        queue.offer(next);\n      }\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "All Paths From Source to Target",
      "difficulty": "Medium",
      "subpattern": "Graph path enumeration with backtracking",
      "question": "Given a directed acyclic graph, return all paths from node 0 to node n - 1.",
      "trigger": "The graph is a DAG and the output asks for every source-to-target path, so traversal must keep the current path state.",
      "intuition": "Extend the current path through each outgoing edge; when the target is reached, copy the path into the answer.",
      "edgeCases": "Single path, many branching paths, direct edge to target, graph with one node, no outgoing edge before target.",
      "constraints": "2 <= graph.length <= 15; graph is a DAG; graph[i] contains outgoing neighbors from node i.",
      "source": {
        "label": "All Paths From Source to Target - LeetCode 797",
        "url": "https://leetcode.com/problems/all-paths-from-source-to-target/"
      },
      "examples": [
        {
          "input": "graph = [[1,2],[3],[3],[]]",
          "output": "[[0,1,3],[0,2,3]]",
          "explanation": "There are two paths from 0 to 3."
        },
        {
          "input": "graph = [[4,3,1],[3,2,4],[3],[4],[]]",
          "output": "[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]",
          "explanation": "Every valid path ending at node 4 is listed."
        },
        {
          "input": "graph = [[1],[]]",
          "output": "[[0,1]]",
          "explanation": "There is only one edge and one path."
        }
      ],
      "bruteForceComplexity": "Time O(P * V); Space O(P * V). Queue stores complete partial paths, where P is number of output paths.",
      "optimizedComplexity": "Time O(P * V); Space O(P * V). Iterative stack avoids recursion while enumerating complete paths.",
      "recursiveComplexity": "Time O(P * V); Space O(V) excluding output. Backtracking keeps only the current path on the call stack.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> allPathsSourceTarget(int[][] graph) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<List<Integer>> queue = new ArrayDeque<>();\n    queue.offer(new ArrayList<>(Arrays.asList(0)));\n    int target = graph.length - 1;\n\n    while (!queue.isEmpty()) {\n      List<Integer> path = queue.poll();\n      int node = path.get(path.size() - 1);\n      if (node == target) {\n        answer.add(path);\n        continue;\n      }\n      for (int next : graph[node]) {\n        List<Integer> copy = new ArrayList<>(path);\n        copy.add(next);\n        queue.offer(copy);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> allPathsSourceTarget(int[][] graph) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<List<Integer>> stack = new ArrayDeque<>();\n    stack.push(new ArrayList<>(Arrays.asList(0)));\n    int target = graph.length - 1;\n\n    while (!stack.isEmpty()) {\n      List<Integer> path = stack.pop();\n      int node = path.get(path.size() - 1);\n      if (node == target) {\n        answer.add(path);\n        continue;\n      }\n      for (int i = graph[node].length - 1; i >= 0; i--) {\n        List<Integer> nextPath = new ArrayList<>(path);\n        nextPath.add(graph[node][i]);\n        stack.push(nextPath);\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> allPathsSourceTarget(int[][] graph) {\n    List<List<Integer>> answer = new ArrayList<>();\n    List<Integer> path = new ArrayList<>();\n    path.add(0);\n    dfs(0, graph, path, answer);\n    return answer;\n  }\n\n  private void dfs(int node, int[][] graph, List<Integer> path, List<List<Integer>> answer) {\n    if (node == graph.length - 1) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n    for (int next : graph[node]) {\n      path.add(next);\n      dfs(next, graph, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> allPathsSourceTarget(int[][] graph) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<List<Integer>> stack = new ArrayDeque<>();\n    stack.push(new ArrayList<>(Arrays.asList(0)));\n    int target = graph.length - 1;\n\n    while (!stack.isEmpty()) {\n      List<Integer> path = stack.pop();\n      int node = path.get(path.size() - 1);\n      if (node == target) {\n        answer.add(path);\n        continue;\n      }\n      for (int i = graph[node].length - 1; i >= 0; i--) {\n        List<Integer> nextPath = new ArrayList<>(path);\n        nextPath.add(graph[node][i]);\n        stack.push(nextPath);\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> allPathsSourceTarget(int[][] graph) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<List<Integer>> stack = new ArrayDeque<>();\n    stack.push(new ArrayList<>(Arrays.asList(0)));\n    int target = graph.length - 1;\n\n    while (!stack.isEmpty()) {\n      List<Integer> path = stack.pop();\n      int node = path.get(path.size() - 1);\n      if (node == target) {\n        answer.add(path);\n        continue;\n      }\n      for (int i = graph[node].length - 1; i >= 0; i--) {\n        List<Integer> nextPath = new ArrayList<>(path);\n        nextPath.add(graph[node][i]);\n        stack.push(nextPath);\n      }\n    }\n    return answer;\n  }\n}"
    }
  ],
  "checklist": [
    "Input can be modeled as nodes plus edges, even when nodes are cells, words, strings, or lock states.",
    "Question asks reachability, shortest steps, connected components, cycle detection, ordering, or all paths.",
    "Unweighted shortest path means BFS; weighted positive shortest path means Dijkstra; bounded stops often means Bellman-Ford layers.",
    "Need all connected groups: loop through every node and start DFS/BFS only from unseen nodes.",
    "Directed prerequisites or ordering constraints should trigger topological sort or DFS cycle coloring."
  ],
  "traps": [
    "Marking visited too late in BFS and pushing the same node many times.",
    "Using DFS for shortest path in an unweighted graph when BFS is required.",
    "Forgetting disconnected components when checking bipartite graphs, cycles, or reachability over all nodes.",
    "Mixing directed and undirected edge construction.",
    "Ignoring invalid prefix cases in Alien Dictionary.",
    "Counting BFS levels before processing the current frontier.",
    "Not including source state in visited for implicit-state problems."
  ],
  "edgeCases": [
    "Empty or single-node graph when allowed by the original problem.",
    "Disconnected graph with isolated nodes.",
    "Self-loop, duplicate edge, or cycle where a tree/order is expected.",
    "Start equals target in reachability or shortest-path problems.",
    "Blocked start or target cell in grid shortest path.",
    "Multiple sources such as gates, rotten oranges, or zero cells.",
    "Large recursion depth on grids, chains, and dense connected components."
  ],
  "complexities": [
    "DFS/BFS with adjacency list: Time O(V + E), Space O(V + E).",
    "Grid traversal: Time O(rows * cols), Space O(rows * cols) for visited or queue/stack.",
    "Multi-source BFS keeps the same O(V + E) bound but starts with all sources in the initial frontier.",
    "Dijkstra with a binary heap: Time O(E log V), Space O(V + E).",
    "Bellman-Ford style bounded relaxation: Time O(kE), Space O(V).",
    "All-path enumeration is output-sensitive: Time and space grow with number of returned paths.",
    "Recursive graph DFS adds O(depth) call stack on top of visited/state storage."
  ],
  "mentalModel": [
    "First name the node type: index, cell, word, email, course, or full state.",
    "Then name the edge rule: adjacency, one edit, shared email, prerequisite, road direction, or valid move.",
    "Pick traversal by goal: BFS for shortest unweighted distance, DFS for full exploration, topo for dependencies.",
    "Visited state must match the graph state, not just the visible value.",
    "For directed graphs, decide whether edge direction matters before building adjacency."
  ],
  "revisionStrategy": [
    "Day 1: redo Number of Islands, Clone Graph, Course Schedule, and Rotting Oranges without notes.",
    "Day 2: redo Pacific Atlantic, Surrounded Regions, Walls and Gates, and Graph Valid Tree.",
    "Day 4: redo Word Ladder, Open the Lock, 01 Matrix, and Is Graph Bipartite with complexity written first.",
    "Day 7: mix five random graph problems and identify node type, edge rule, traversal, and visited state in under 30 seconds.",
    "Before interviews: re-implement one BFS shortest path, one DFS component problem, one topo sort, and one weighted shortest path."
  ],
  "unseen": [
    "Given a matrix of arrows, find whether a path exists from top-left to bottom-right after changing at most one arrow.",
    "Given recipes and ingredients, return every recipe that can be made from initial supplies.",
    "Given airports and tickets, reconstruct an itinerary that uses all tickets once.",
    "Given rooms with teleporters, return the minimum steps to reach the exit.",
    "Given friendship pairs over time, find the earliest time when everyone becomes connected."
  ]
};
