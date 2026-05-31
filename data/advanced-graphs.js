const CURRENT_PATTERN = {
  "id": "advanced-graphs",
  "name": "Advanced Graphs",
  "summary": "Master weighted shortest paths, MSTs, topological order, SCCs, bridges, Euler paths, matching, flow, and graph DP.",
  "complete": true,
  "subpatterns": [
    "Dijkstra shortest path",
    "K-stop constrained shortest path",
    "Minimax path on grid",
    "Binary search plus graph reachability",
    "Kruskal MST with edge classification",
    "Prim MST on dense graphs",
    "Virtual node MST modeling",
    "Eulerian path reconstruction",
    "Topological ordering from constraints",
    "Course dependency topological sort",
    "Bitmask BFS over graph states",
    "Time-expanded shortest path DP",
    "Floyd-Warshall all-pairs shortest paths",
    "Tarjan bridge detection",
    "Union-Find connected components",
    "Kosaraju strongly connected components",
    "Tarjan SCC low-link",
    "Kruskal MST implementation",
    "Prim MST implementation",
    "0-1 BFS on grids",
    "A* informed grid search",
    "Bidirectional BFS",
    "Eulerian trail in directed multigraph",
    "Bipartite matching by augmenting paths",
    "Minimum-cost maximum-flow",
    "Bellman-Ford negative cycle detection",
    "Longest path in DAG",
    "Articulation point detection",
    "Shortest path with alternating colors",
    "Minimum-weight subgraph with required paths"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Network Delay Time",
      "difficulty": "Medium",
      "subpattern": "Dijkstra shortest path",
      "question": "Given directed weighted edges times[i] = [u,v,w], n nodes labeled 1..n, and source k, return the time for all nodes to receive the signal, or -1 if any node is unreachable.",
      "trigger": "Single-source shortest path with non-negative edge weights and an unreachable check.",
      "intuition": "Always finalize the currently smallest known distance; each outgoing edge may relax a neighbor.",
      "edgeCases": "Disconnected nodes, duplicate directed edges, n = 1, source with no outgoing edges, and large path costs.",
      "constraints": "1 <= n <= 100; edge weights are positive; node labels are 1-based.",
      "source": {
        "label": "LeetCode 743 - Network Delay Time",
        "url": "https://leetcode.com/problems/network-delay-time/"
      },
      "examples": [
        {
          "input": "times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2",
          "output": "2",
          "explanation": "Node 4 receives after path 2->3->4."
        },
        {
          "input": "times=[[1,2,1]], n=2, k=2",
          "output": "-1",
          "explanation": "Node 1 is unreachable from 2."
        }
      ],
      "bruteForceComplexity": "Time O(nE); Space O(n). Bellman-Ford style relaxation repeats enough times to settle all paths.",
      "optimizedComplexity": "Time O((n + E) log n); Space O(n + E). Dijkstra uses a min-heap adjacency list.",
      "recursiveComplexity": "Time O(number of explored walks with pruning); Space O(n + E + recursion depth). DFS prunes states not improving distance.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    final int INF = 1_000_000_000;\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, INF);\n    dist[k] = 0;\n\n    for (int round = 1; round < n; round++) {\n      boolean changed = false;\n      for (int[] edge : times) {\n        int from = edge[0], to = edge[1], weight = edge[2];\n        if (dist[from] != INF && dist[from] + weight < dist[to]) {\n          dist[to] = dist[from] + weight;\n          changed = true;\n        }\n      }\n      if (!changed) break;\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) {\n      if (dist[node] == INF) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<int[]>[] graph = new ArrayList[n + 1];\n    for (int node = 1; node <= n; node++) graph[node] = new ArrayList<>();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {k, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0], distance = current[1];\n      if (distance != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        int next = edge[0], nextDistance = distance + edge[1];\n        if (nextDistance < dist[next]) {\n          dist[next] = nextDistance;\n          heap.offer(new int[] {next, nextDistance});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<int[]>[] graph = new ArrayList[n + 1];\n    for (int node = 1; node <= n; node++) graph[node] = new ArrayList<>();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n    for (List<int[]> edges : graph) {\n      if (edges != null) edges.sort(Comparator.comparingInt(a -> a[1]));\n    }\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dfs(k, 0, graph, dist);\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n\n  private void dfs(int node, int time, List<int[]>[] graph, int[] dist) {\n    if (time >= dist[node]) return;\n    dist[node] = time;\n    for (int[] edge : graph[node]) dfs(edge[0], time + edge[1], graph, dist);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<int[]>[] graph = new ArrayList[n + 1];\n    for (int node = 1; node <= n; node++) graph[node] = new ArrayList<>();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {k, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0], distance = current[1];\n      if (distance != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        int next = edge[0], nextDistance = distance + edge[1];\n        if (nextDistance < dist[next]) {\n          dist[next] = nextDistance;\n          heap.offer(new int[] {next, nextDistance});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int networkDelayTime(int[][] times, int n, int k) {\n    List<int[]>[] graph = new ArrayList[n + 1];\n    for (int node = 1; node <= n; node++) graph[node] = new ArrayList<>();\n    for (int[] edge : times) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[k] = 0;\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {k, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0], distance = current[1];\n      if (distance != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        int next = edge[0], nextDistance = distance + edge[1];\n        if (nextDistance < dist[next]) {\n          dist[next] = nextDistance;\n          heap.offer(new int[] {next, nextDistance});\n        }\n      }\n    }\n\n    int answer = 0;\n    for (int node = 1; node <= n; node++) {\n      if (dist[node] == Integer.MAX_VALUE) return -1;\n      answer = Math.max(answer, dist[node]);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Cheapest Flights Within K Stops",
      "difficulty": "Medium",
      "subpattern": "K-stop constrained shortest path",
      "question": "Given flights [from,to,price], find the cheapest price from src to dst using at most k stops, or -1 if no route satisfies the stop limit.",
      "trigger": "Shortest path where state includes how many edges or stops have been used.",
      "intuition": "Relax all flights once per allowed edge count; do not let a route with too many stops overwrite a valid shorter-state answer.",
      "edgeCases": "src equals dst, no route, direct flight more expensive than one-stop route, cycles, and k = 0.",
      "constraints": "n <= 100; prices are positive; at most k + 1 edges may be used.",
      "source": {
        "label": "LeetCode 787 - Cheapest Flights Within K Stops",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
      },
      "examples": [
        {
          "input": "n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1",
          "output": "700",
          "explanation": "0->1->3 uses one stop."
        },
        {
          "input": "n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1",
          "output": "200",
          "explanation": "The one-stop path is cheaper than direct."
        }
      ],
      "bruteForceComplexity": "Time O(branching^(k+1)); Space O(n + E + k). DFS tries bounded routes with pruning.",
      "optimizedComplexity": "Time O((k + 1)E); Space O(n). Bellman-Ford layers prevent same-round reuse.",
      "recursiveComplexity": "Time O((k + 1)(n + E)) with memoization; Space O((k + 1)n + recursion depth).",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private int best;\n\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] flight : flights) graph[flight[0]].add(new int[] {flight[1], flight[2]});\n    best = Integer.MAX_VALUE;\n    dfs(src, dst, k + 1, 0, graph);\n    return best == Integer.MAX_VALUE ? -1 : best;\n  }\n\n  private void dfs(int node, int dst, int edgesLeft, int cost, List<int[]>[] graph) {\n    if (cost >= best) return;\n    if (node == dst) {\n      best = cost;\n      return;\n    }\n    if (edgesLeft == 0) return;\n    for (int[] edge : graph[node]) dfs(edge[0], dst, edgesLeft - 1, cost + edge[1], graph);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    final int INF = 1_000_000_000;\n    int[] cost = new int[n];\n    Arrays.fill(cost, INF);\n    cost[src] = 0;\n\n    for (int edges = 0; edges <= k; edges++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        if (cost[flight[0]] == INF) continue;\n        next[flight[1]] = Math.min(next[flight[1]], cost[flight[0]] + flight[2]);\n      }\n      cost = next;\n    }\n    return cost[dst] == INF ? -1 : cost[dst];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final int INF = 1_000_000_000;\n  private List<int[]>[] graph;\n  private int[][] memo;\n  private int dst;\n\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    this.dst = dst;\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] flight : flights) graph[flight[0]].add(new int[] {flight[1], flight[2]});\n    memo = new int[n][k + 2];\n    for (int[] row : memo) Arrays.fill(row, -2);\n    int answer = solve(src, k + 1);\n    return answer >= INF ? -1 : answer;\n  }\n\n  private int solve(int node, int edgesLeft) {\n    if (node == dst) return 0;\n    if (edgesLeft == 0) return INF;\n    if (memo[node][edgesLeft] != -2) return memo[node][edgesLeft];\n    int best = INF;\n    for (int[] edge : graph[node]) {\n      int suffix = solve(edge[0], edgesLeft - 1);\n      if (suffix != INF) best = Math.min(best, edge[1] + suffix);\n    }\n    return memo[node][edgesLeft] = best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    final int INF = 1_000_000_000;\n    int[] cost = new int[n];\n    Arrays.fill(cost, INF);\n    cost[src] = 0;\n\n    for (int edges = 0; edges <= k; edges++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        if (cost[flight[0]] == INF) continue;\n        next[flight[1]] = Math.min(next[flight[1]], cost[flight[0]] + flight[2]);\n      }\n      cost = next;\n    }\n    return cost[dst] == INF ? -1 : cost[dst];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    final int INF = 1_000_000_000;\n    int[] cost = new int[n];\n    Arrays.fill(cost, INF);\n    cost[src] = 0;\n\n    for (int edges = 0; edges <= k; edges++) {\n      int[] next = cost.clone();\n      for (int[] flight : flights) {\n        if (cost[flight[0]] == INF) continue;\n        next[flight[1]] = Math.min(next[flight[1]], cost[flight[0]] + flight[2]);\n      }\n      cost = next;\n    }\n    return cost[dst] == INF ? -1 : cost[dst];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Path With Minimum Effort",
      "difficulty": "Medium",
      "subpattern": "Minimax path on grid",
      "question": "Given a heights grid, move 4-directionally from top-left to bottom-right while minimizing the maximum absolute height difference along the path.",
      "trigger": "The path cost is the maximum edge on the path, not the sum of edges.",
      "intuition": "Dijkstra still works when relaxation uses max(currentEffort, edgeEffort) and picks the smallest current effort first.",
      "edgeCases": "Single cell grid, flat grid, steep final edge, multiple equal-effort paths, and narrow one-row grids.",
      "constraints": "Grid size up to 100x100; height differences fit in int.",
      "source": {
        "label": "LeetCode 1631 - Path With Minimum Effort",
        "url": "https://leetcode.com/problems/path-with-minimum-effort/"
      },
      "examples": [
        {
          "input": "heights=[[1,2,2],[3,8,2],[5,3,5]]",
          "output": "2",
          "explanation": "A route exists where every step differs by at most 2."
        },
        {
          "input": "heights=[[1,2,3],[3,8,4],[5,3,5]]",
          "output": "1",
          "explanation": "The right-side route keeps max effort 1."
        }
      ],
      "bruteForceComplexity": "Time exponential in cells; Space O(mn). DFS enumerates simple paths and keeps the best maximum edge.",
      "optimizedComplexity": "Time O(mn log(mn)); Space O(mn). Dijkstra over grid cells with minimax relaxation.",
      "recursiveComplexity": "Time O(mn log W); Space O(mn). Binary search effort and recursive DFS reachability check.",
      "bruteForceCode": "class Solution {\n  private int best;\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    best = Integer.MAX_VALUE;\n    boolean[][] seen = new boolean[heights.length][heights[0].length];\n    dfs(0, 0, 0, heights, seen);\n    return best;\n  }\n\n  private void dfs(int row, int col, int effort, int[][] heights, boolean[][] seen) {\n    if (effort >= best) return;\n    int rows = heights.length, cols = heights[0].length;\n    if (row == rows - 1 && col == cols - 1) {\n      best = effort;\n      return;\n    }\n    seen[row][col] = true;\n    for (int[] dir : dirs) {\n      int nr = row + dir[0], nc = col + dir[1];\n      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || seen[nr][nc]) continue;\n      int next = Math.max(effort, Math.abs(heights[row][col] - heights[nr][nc]));\n      dfs(nr, nc, next, heights, seen);\n    }\n    seen[row][col] = false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] effort = new int[rows][cols];\n    for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);\n    effort[0][0] = 0;\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2]));\n    heap.offer(new int[] {0, 0, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], cost = current[2];\n      if (row == rows - 1 && col == cols - 1) return cost;\n      if (cost != effort[row][col]) continue;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        int next = Math.max(cost, Math.abs(heights[row][col] - heights[nr][nc]));\n        if (next < effort[nr][nc]) {\n          effort[nr][nc] = next;\n          heap.offer(new int[] {nr, nc, next});\n        }\n      }\n    }\n    return 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int left = 0, right = 1_000_000;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      boolean[][] seen = new boolean[heights.length][heights[0].length];\n      if (canReach(0, 0, mid, heights, seen)) right = mid;\n      else left = mid + 1;\n    }\n    return left;\n  }\n\n  private boolean canReach(int row, int col, int limit, int[][] heights, boolean[][] seen) {\n    int rows = heights.length, cols = heights[0].length;\n    if (row == rows - 1 && col == cols - 1) return true;\n    seen[row][col] = true;\n    for (int[] dir : dirs) {\n      int nr = row + dir[0], nc = col + dir[1];\n      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || seen[nr][nc]) continue;\n      if (Math.abs(heights[row][col] - heights[nr][nc]) <= limit && canReach(nr, nc, limit, heights, seen)) return true;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] effort = new int[rows][cols];\n    for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);\n    effort[0][0] = 0;\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2]));\n    heap.offer(new int[] {0, 0, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], cost = current[2];\n      if (row == rows - 1 && col == cols - 1) return cost;\n      if (cost != effort[row][col]) continue;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        int next = Math.max(cost, Math.abs(heights[row][col] - heights[nr][nc]));\n        if (next < effort[nr][nc]) {\n          effort[nr][nc] = next;\n          heap.offer(new int[] {nr, nc, next});\n        }\n      }\n    }\n    return 0;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] effort = new int[rows][cols];\n    for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);\n    effort[0][0] = 0;\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2]));\n    heap.offer(new int[] {0, 0, 0});\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], cost = current[2];\n      if (row == rows - 1 && col == cols - 1) return cost;\n      if (cost != effort[row][col]) continue;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        int next = Math.max(cost, Math.abs(heights[row][col] - heights[nr][nc]));\n        if (next < effort[nr][nc]) {\n          effort[nr][nc] = next;\n          heap.offer(new int[] {nr, nc, next});\n        }\n      }\n    }\n    return 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Swim in Rising Water",
      "difficulty": "Hard",
      "subpattern": "Binary search plus graph reachability",
      "question": "Given an n x n grid where grid[r][c] is the time that cell becomes passable, return the earliest time when a path exists from top-left to bottom-right.",
      "trigger": "A threshold controls which cells are reachable, and the answer is the minimum feasible threshold.",
      "intuition": "The path cost is the maximum cell value on the path; Dijkstra or binary-search reachability finds the minimum such maximum.",
      "edgeCases": "n = 1, start or end has high value, monotone increasing grid, and paths that require temporarily moving away from the target.",
      "constraints": "n <= 50; values are unique from 0 to n^2 - 1 in the original LeetCode problem.",
      "source": {
        "label": "LeetCode 778 - Swim in Rising Water",
        "url": "https://leetcode.com/problems/swim-in-rising-water/"
      },
      "examples": [
        {
          "input": "grid=[[0,2],[1,3]]",
          "output": "3",
          "explanation": "The destination opens at time 3."
        },
        {
          "input": "grid=[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
          "output": "16",
          "explanation": "The snake path is feasible when time reaches 16."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * n^2) in the threshold scan; Space O(n^2). Try times until DFS reaches the target.",
      "optimizedComplexity": "Time O(n^2 log n); Space O(n^2). Dijkstra minimizes the maximum grid value seen so far.",
      "recursiveComplexity": "Time O(n^2 log W); Space O(n^2). Binary search the time and use recursive DFS for feasibility.",
      "bruteForceCode": "class Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int swimInWater(int[][] grid) {\n    int n = grid.length;\n    for (int time = Math.max(grid[0][0], grid[n - 1][n - 1]); ; time++) {\n      if (canReach(0, 0, time, grid, new boolean[n][n])) return time;\n    }\n  }\n\n  private boolean canReach(int row, int col, int time, int[][] grid, boolean[][] seen) {\n    int n = grid.length;\n    if (row < 0 || col < 0 || row >= n || col >= n || seen[row][col] || grid[row][col] > time) return false;\n    if (row == n - 1 && col == n - 1) return true;\n    seen[row][col] = true;\n    for (int[] dir : dirs) if (canReach(row + dir[0], col + dir[1], time, grid, seen)) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int swimInWater(int[][] grid) {\n    int n = grid.length;\n    boolean[][] seen = new boolean[n][n];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2]));\n    heap.offer(new int[] {0, 0, grid[0][0]});\n    seen[0][0] = true;\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], time = current[2];\n      if (row == n - 1 && col == n - 1) return time;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= n || nc >= n || seen[nr][nc]) continue;\n        seen[nr][nc] = true;\n        heap.offer(new int[] {nr, nc, Math.max(time, grid[nr][nc])});\n      }\n    }\n    return -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int swimInWater(int[][] grid) {\n    int n = grid.length;\n    int left = Math.max(grid[0][0], grid[n - 1][n - 1]);\n    int right = n * n - 1;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (canReach(0, 0, mid, grid, new boolean[n][n])) right = mid;\n      else left = mid + 1;\n    }\n    return left;\n  }\n\n  private boolean canReach(int row, int col, int time, int[][] grid, boolean[][] seen) {\n    int n = grid.length;\n    if (row < 0 || col < 0 || row >= n || col >= n || seen[row][col] || grid[row][col] > time) return false;\n    if (row == n - 1 && col == n - 1) return true;\n    seen[row][col] = true;\n    for (int[] dir : dirs) if (canReach(row + dir[0], col + dir[1], time, grid, seen)) return true;\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int swimInWater(int[][] grid) {\n    int n = grid.length;\n    boolean[][] seen = new boolean[n][n];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2]));\n    heap.offer(new int[] {0, 0, grid[0][0]});\n    seen[0][0] = true;\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], time = current[2];\n      if (row == n - 1 && col == n - 1) return time;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= n || nc >= n || seen[nr][nc]) continue;\n        seen[nr][nc] = true;\n        heap.offer(new int[] {nr, nc, Math.max(time, grid[nr][nc])});\n      }\n    }\n    return -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int swimInWater(int[][] grid) {\n    int n = grid.length;\n    boolean[][] seen = new boolean[n][n];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2]));\n    heap.offer(new int[] {0, 0, grid[0][0]});\n    seen[0][0] = true;\n\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], time = current[2];\n      if (row == n - 1 && col == n - 1) return time;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= n || nc >= n || seen[nr][nc]) continue;\n        seen[nr][nc] = true;\n        heap.offer(new int[] {nr, nc, Math.max(time, grid[nr][nc])});\n      }\n    }\n    return -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Find Critical and Pseudo-Critical Edges in MST",
      "difficulty": "Hard",
      "subpattern": "Kruskal MST with edge classification",
      "question": "Given an undirected weighted connected graph, return which edge indices are critical for every MST and which can appear in at least one MST.",
      "trigger": "You must compare MST weights when forcing or excluding individual edges.",
      "intuition": "Compute the base MST cost, then rerun Kruskal with each edge excluded and forced to classify its role.",
      "edgeCases": "Equal edge weights, multiple MSTs, graph becoming disconnected after excluding an edge, and preserving original indices after sorting.",
      "constraints": "n <= 100 and edges <= 200 in the LeetCode problem; O(E^2 alpha(V)) classification is acceptable.",
      "source": {
        "label": "LeetCode 1489 - Find Critical and Pseudo-Critical Edges in MST",
        "url": "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/"
      },
      "examples": [
        {
          "input": "n=5, edges=[[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]",
          "output": "[[0,1],[2,3,4,5]]",
          "explanation": "Edges 0 and 1 are required in every MST."
        },
        {
          "input": "n=4, edges=[[0,1,1],[1,2,1],[2,3,1],[0,3,1]]",
          "output": "[[],[0,1,2,3]]",
          "explanation": "Any three cycle edges can form an MST."
        }
      ],
      "bruteForceComplexity": "Time O(E^2 log E); Space O(E + V). Rebuild an MST while excluding or forcing each edge.",
      "optimizedComplexity": "Time O(E^2 alpha(V) + E log E); Space O(E + V). Sorted Kruskal classification with DSU.",
      "recursiveComplexity": "Time O(E^2 alpha(V)); Space O(E + V). Recursive DSU find supports the same classification checks.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {\n    int m = edges.length;\n    int[][] indexed = new int[m][4];\n    for (int i = 0; i < m; i++) indexed[i] = new int[] {edges[i][0], edges[i][1], edges[i][2], i};\n    Arrays.sort(indexed, Comparator.comparingInt(a -> a[2]));\n    int base = mst(n, indexed, -1, -1);\n    List<Integer> critical = new ArrayList<>();\n    List<Integer> pseudo = new ArrayList<>();\n\n    for (int i = 0; i < m; i++) {\n      if (mst(n, indexed, i, -1) > base) critical.add(indexed[i][3]);\n      else if (mst(n, indexed, -1, i) == base) pseudo.add(indexed[i][3]);\n    }\n    return Arrays.asList(critical, pseudo);\n  }\n\n  private int mst(int n, int[][] edges, int skip, int force) {\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    if (force != -1 && dsu.union(edges[force][0], edges[force][1])) {\n      cost += edges[force][2];\n      used++;\n    }\n    for (int i = 0; i < edges.length; i++) {\n      if (i == skip) continue;\n      if (dsu.union(edges[i][0], edges[i][1])) {\n        cost += edges[i][2];\n        used++;\n      }\n    }\n    return used == n - 1 ? cost : Integer.MAX_VALUE;\n  }\n\n  private static class DSU {\n    int[] parent;\n    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) { int pa = find(a), pb = find(b); if (pa == pb) return false; parent[pa] = pb; return true; }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {\n    int m = edges.length;\n    int[][] indexed = new int[m][4];\n    for (int i = 0; i < m; i++) indexed[i] = new int[] {edges[i][0], edges[i][1], edges[i][2], i};\n    Arrays.sort(indexed, Comparator.comparingInt(a -> a[2]));\n    int base = mst(n, indexed, -1, -1);\n    List<Integer> critical = new ArrayList<>();\n    List<Integer> pseudo = new ArrayList<>();\n\n    for (int i = 0; i < m; i++) {\n      if (mst(n, indexed, i, -1) > base) critical.add(indexed[i][3]);\n      else if (mst(n, indexed, -1, i) == base) pseudo.add(indexed[i][3]);\n    }\n    return Arrays.asList(critical, pseudo);\n  }\n\n  private int mst(int n, int[][] edges, int skip, int force) {\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    if (force != -1) {\n      dsu.union(edges[force][0], edges[force][1]);\n      cost += edges[force][2];\n      used++;\n    }\n    for (int i = 0; i < edges.length; i++) {\n      if (i == skip) continue;\n      if (dsu.union(edges[i][0], edges[i][1])) {\n        cost += edges[i][2];\n        used++;\n        if (used == n - 1) break;\n      }\n    }\n    return used == n - 1 ? cost : Integer.MAX_VALUE;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {\n    int m = edges.length;\n    int[][] indexed = new int[m][4];\n    for (int i = 0; i < m; i++) indexed[i] = new int[] {edges[i][0], edges[i][1], edges[i][2], i};\n    Arrays.sort(indexed, Comparator.comparingInt(a -> a[2]));\n    int base = mst(n, indexed, -1, -1);\n    List<Integer> critical = new ArrayList<>();\n    List<Integer> pseudo = new ArrayList<>();\n    classify(0, n, indexed, base, critical, pseudo);\n    return Arrays.asList(critical, pseudo);\n  }\n\n  private void classify(int index, int n, int[][] edges, int base, List<Integer> critical, List<Integer> pseudo) {\n    if (index == edges.length) return;\n    if (mst(n, edges, index, -1) > base) critical.add(edges[index][3]);\n    else if (mst(n, edges, -1, index) == base) pseudo.add(edges[index][3]);\n    classify(index + 1, n, edges, base, critical, pseudo);\n  }\n\n  private int mst(int n, int[][] edges, int skip, int force) {\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    if (force != -1 && dsu.union(edges[force][0], edges[force][1])) { cost += edges[force][2]; used++; }\n    for (int i = 0; i < edges.length; i++) {\n      if (i != skip && dsu.union(edges[i][0], edges[i][1])) { cost += edges[i][2]; used++; }\n    }\n    return used == n - 1 ? cost : Integer.MAX_VALUE;\n  }\n\n  private static class DSU {\n    int[] parent;\n    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }\n    boolean union(int a, int b) { int pa = find(a), pb = find(b); if (pa == pb) return false; parent[pa] = pb; return true; }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {\n    int m = edges.length;\n    int[][] indexed = new int[m][4];\n    for (int i = 0; i < m; i++) indexed[i] = new int[] {edges[i][0], edges[i][1], edges[i][2], i};\n    Arrays.sort(indexed, Comparator.comparingInt(a -> a[2]));\n    int base = mst(n, indexed, -1, -1);\n    List<Integer> critical = new ArrayList<>();\n    List<Integer> pseudo = new ArrayList<>();\n\n    for (int i = 0; i < m; i++) {\n      if (mst(n, indexed, i, -1) > base) critical.add(indexed[i][3]);\n      else if (mst(n, indexed, -1, i) == base) pseudo.add(indexed[i][3]);\n    }\n    return Arrays.asList(critical, pseudo);\n  }\n\n  private int mst(int n, int[][] edges, int skip, int force) {\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    if (force != -1) {\n      dsu.union(edges[force][0], edges[force][1]);\n      cost += edges[force][2];\n      used++;\n    }\n    for (int i = 0; i < edges.length; i++) {\n      if (i == skip) continue;\n      if (dsu.union(edges[i][0], edges[i][1])) {\n        cost += edges[i][2];\n        used++;\n        if (used == n - 1) break;\n      }\n    }\n    return used == n - 1 ? cost : Integer.MAX_VALUE;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {\n    int m = edges.length;\n    int[][] indexed = new int[m][4];\n    for (int i = 0; i < m; i++) indexed[i] = new int[] {edges[i][0], edges[i][1], edges[i][2], i};\n    Arrays.sort(indexed, Comparator.comparingInt(a -> a[2]));\n    int base = mst(n, indexed, -1, -1);\n    List<Integer> critical = new ArrayList<>();\n    List<Integer> pseudo = new ArrayList<>();\n\n    for (int i = 0; i < m; i++) {\n      if (mst(n, indexed, i, -1) > base) critical.add(indexed[i][3]);\n      else if (mst(n, indexed, -1, i) == base) pseudo.add(indexed[i][3]);\n    }\n    return Arrays.asList(critical, pseudo);\n  }\n\n  private int mst(int n, int[][] edges, int skip, int force) {\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    if (force != -1) {\n      dsu.union(edges[force][0], edges[force][1]);\n      cost += edges[force][2];\n      used++;\n    }\n    for (int i = 0; i < edges.length; i++) {\n      if (i == skip) continue;\n      if (dsu.union(edges[i][0], edges[i][1])) {\n        cost += edges[i][2];\n        used++;\n        if (used == n - 1) break;\n      }\n    }\n    return used == n - 1 ? cost : Integer.MAX_VALUE;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Min Cost to Connect All Points",
      "difficulty": "Medium",
      "subpattern": "Prim MST on dense graphs",
      "question": "Given points on a plane, connect all points with minimum total Manhattan distance cost.",
      "trigger": "Every point can connect to every other point, so the problem is a complete-graph MST.",
      "intuition": "Avoid materializing all edges when dense Prim can repeatedly attach the nearest outside point.",
      "edgeCases": "One point, duplicate coordinates, negative coordinates, and many equal Manhattan distances.",
      "constraints": "n <= 1000; complete graph has O(n^2) implicit edges.",
      "source": {
        "label": "LeetCode 1584 - Min Cost to Connect All Points",
        "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/"
      },
      "examples": [
        {
          "input": "points=[[0,0],[2,2],[3,10],[5,2],[7,0]]",
          "output": "20",
          "explanation": "The minimum spanning tree has total cost 20."
        },
        {
          "input": "points=[[3,12],[-2,5],[-4,1]]",
          "output": "18",
          "explanation": "Connect all three points with two cheapest useful edges."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 log n); Space O(n^2). Build every edge and run Kruskal.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Dense Prim keeps the best current connection for every outside point.",
      "recursiveComplexity": "Time O(n^2); Space O(n + recursion depth). Recursive Prim adds one point per call.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minCostConnectPoints(int[][] points) {\n    int n = points.length;\n    List<int[]> edges = new ArrayList<>();\n    for (int i = 0; i < n; i++) {\n      for (int j = i + 1; j < n; j++) edges.add(new int[] {i, j, distance(points, i, j)});\n    }\n    edges.sort(Comparator.comparingInt(a -> a[2]));\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    for (int[] edge : edges) {\n      if (dsu.union(edge[0], edge[1])) {\n        cost += edge[2];\n        if (++used == n - 1) break;\n      }\n    }\n    return cost;\n  }\n\n  private int distance(int[][] points, int a, int b) {\n    return Math.abs(points[a][0] - points[b][0]) + Math.abs(points[a][1] - points[b][1]);\n  }\n\n  private static class DSU {\n    int[] parent;\n    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) { int pa = find(a), pb = find(b); if (pa == pb) return false; parent[pa] = pb; return true; }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minCostConnectPoints(int[][] points) {\n    int n = points.length;\n    boolean[] used = new boolean[n];\n    int[] min = new int[n];\n    Arrays.fill(min, Integer.MAX_VALUE);\n    min[0] = 0;\n    int answer = 0;\n\n    for (int step = 0; step < n; step++) {\n      int node = -1;\n      for (int i = 0; i < n; i++) if (!used[i] && (node == -1 || min[i] < min[node])) node = i;\n      used[node] = true;\n      answer += min[node];\n      for (int next = 0; next < n; next++) if (!used[next]) min[next] = Math.min(min[next], distance(points, node, next));\n    }\n    return answer;\n  }\n\n  private int distance(int[][] points, int a, int b) {\n    return Math.abs(points[a][0] - points[b][0]) + Math.abs(points[a][1] - points[b][1]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minCostConnectPoints(int[][] points) {\n    boolean[] used = new boolean[points.length];\n    int[] min = new int[points.length];\n    Arrays.fill(min, Integer.MAX_VALUE);\n    min[0] = 0;\n    return prim(points, used, min, 0, 0);\n  }\n\n  private int prim(int[][] points, boolean[] used, int[] min, int chosen, int total) {\n    if (chosen == points.length) return total;\n    int node = -1;\n    for (int i = 0; i < points.length; i++) if (!used[i] && (node == -1 || min[i] < min[node])) node = i;\n    used[node] = true;\n    for (int next = 0; next < points.length; next++) if (!used[next]) min[next] = Math.min(min[next], distance(points, node, next));\n    return prim(points, used, min, chosen + 1, total + min[node]);\n  }\n\n  private int distance(int[][] points, int a, int b) {\n    return Math.abs(points[a][0] - points[b][0]) + Math.abs(points[a][1] - points[b][1]);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minCostConnectPoints(int[][] points) {\n    int n = points.length;\n    boolean[] used = new boolean[n];\n    int[] min = new int[n];\n    Arrays.fill(min, Integer.MAX_VALUE);\n    min[0] = 0;\n    int answer = 0;\n\n    for (int step = 0; step < n; step++) {\n      int node = -1;\n      for (int i = 0; i < n; i++) if (!used[i] && (node == -1 || min[i] < min[node])) node = i;\n      used[node] = true;\n      answer += min[node];\n      for (int next = 0; next < n; next++) if (!used[next]) min[next] = Math.min(min[next], distance(points, node, next));\n    }\n    return answer;\n  }\n\n  private int distance(int[][] points, int a, int b) {\n    return Math.abs(points[a][0] - points[b][0]) + Math.abs(points[a][1] - points[b][1]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minCostConnectPoints(int[][] points) {\n    int n = points.length;\n    boolean[] used = new boolean[n];\n    int[] min = new int[n];\n    Arrays.fill(min, Integer.MAX_VALUE);\n    min[0] = 0;\n    int answer = 0;\n\n    for (int step = 0; step < n; step++) {\n      int node = -1;\n      for (int i = 0; i < n; i++) if (!used[i] && (node == -1 || min[i] < min[node])) node = i;\n      used[node] = true;\n      answer += min[node];\n      for (int next = 0; next < n; next++) if (!used[next]) min[next] = Math.min(min[next], distance(points, node, next));\n    }\n    return answer;\n  }\n\n  private int distance(int[][] points, int a, int b) {\n    return Math.abs(points[a][0] - points[b][0]) + Math.abs(points[a][1] - points[b][1]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Optimize Water Distribution in a Village",
      "difficulty": "Hard",
      "subpattern": "Virtual node MST modeling",
      "question": "Given well costs for each house and pipe costs between houses, return the minimum cost to supply water to every house.",
      "trigger": "Each house can either build its own well or connect by pipes; this becomes MST after adding a virtual water source.",
      "intuition": "Create node 0 and connect it to every house with the well cost, then run MST over wells plus pipes.",
      "edgeCases": "No pipes, all wells cheaper than pipes, houses numbered 1..n, duplicate pipes, and a pipe cost equal to a well cost.",
      "constraints": "n can be large enough that MST modeling is required; all costs are positive.",
      "source": {
        "label": "LeetCode 1168 - Optimize Water Distribution in a Village",
        "url": "https://leetcode.com/problems/optimize-water-distribution-in-a-village/"
      },
      "examples": [
        {
          "input": "n=3, wells=[1,2,2], pipes=[[1,2,1],[2,3,1]]",
          "output": "3",
          "explanation": "Build well at house 1 and connect 1-2 and 2-3."
        },
        {
          "input": "n=2, wells=[5,5], pipes=[[1,2,1]]",
          "output": "6",
          "explanation": "One well plus one pipe is cheapest."
        }
      ],
      "bruteForceComplexity": "Time O((n + p) log(n + p)); Space O(n + p). Kruskal over virtual well edges and pipes.",
      "optimizedComplexity": "Time O((n + p) log n); Space O(n + p). Prim starts from virtual source and chooses cheapest frontier edge.",
      "recursiveComplexity": "Time O((n + p) log(n + p)); Space O(n + p). Recursive DSU find inside Kruskal.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {\n    List<int[]> edges = new ArrayList<>();\n    for (int house = 1; house <= n; house++) edges.add(new int[] {0, house, wells[house - 1]});\n    for (int[] pipe : pipes) edges.add(pipe);\n    edges.sort(Comparator.comparingInt(a -> a[2]));\n    DSU dsu = new DSU(n + 1);\n    int cost = 0, used = 0;\n    for (int[] edge : edges) {\n      if (dsu.union(edge[0], edge[1])) {\n        cost += edge[2];\n        if (++used == n) break;\n      }\n    }\n    return cost;\n  }\n\n  private static class DSU {\n    int[] parent;\n    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) { int pa = find(a), pb = find(b); if (pa == pb) return false; parent[pa] = pb; return true; }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {\n    List<int[]>[] graph = new ArrayList[n + 1];\n    for (int i = 0; i <= n; i++) graph[i] = new ArrayList<>();\n    for (int house = 1; house <= n; house++) {\n      graph[0].add(new int[] {house, wells[house - 1]});\n      graph[house].add(new int[] {0, wells[house - 1]});\n    }\n    for (int[] pipe : pipes) {\n      graph[pipe[0]].add(new int[] {pipe[1], pipe[2]});\n      graph[pipe[1]].add(new int[] {pipe[0], pipe[2]});\n    }\n    boolean[] used = new boolean[n + 1];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {0, 0});\n    int cost = 0, count = 0;\n    while (!heap.isEmpty() && count <= n) {\n      int[] current = heap.poll();\n      int node = current[0];\n      if (used[node]) continue;\n      used[node] = true;\n      cost += current[1];\n      count++;\n      for (int[] edge : graph[node]) if (!used[edge[0]]) heap.offer(edge);\n    }\n    return cost;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {\n    List<int[]> edges = new ArrayList<>();\n    for (int house = 1; house <= n; house++) edges.add(new int[] {0, house, wells[house - 1]});\n    for (int[] pipe : pipes) edges.add(pipe);\n    edges.sort(Comparator.comparingInt(a -> a[2]));\n    return kruskal(0, n, edges, new DSU(n + 1), 0, 0);\n  }\n\n  private int kruskal(int index, int n, List<int[]> edges, DSU dsu, int used, int cost) {\n    if (used == n) return cost;\n    int[] edge = edges.get(index);\n    if (dsu.union(edge[0], edge[1])) return kruskal(index + 1, n, edges, dsu, used + 1, cost + edge[2]);\n    return kruskal(index + 1, n, edges, dsu, used, cost);\n  }\n\n  private static class DSU {\n    int[] parent;\n    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }\n    boolean union(int a, int b) { int pa = find(a), pb = find(b); if (pa == pb) return false; parent[pa] = pb; return true; }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {\n    List<int[]>[] graph = new ArrayList[n + 1];\n    for (int i = 0; i <= n; i++) graph[i] = new ArrayList<>();\n    for (int house = 1; house <= n; house++) {\n      graph[0].add(new int[] {house, wells[house - 1]});\n      graph[house].add(new int[] {0, wells[house - 1]});\n    }\n    for (int[] pipe : pipes) {\n      graph[pipe[0]].add(new int[] {pipe[1], pipe[2]});\n      graph[pipe[1]].add(new int[] {pipe[0], pipe[2]});\n    }\n    boolean[] used = new boolean[n + 1];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {0, 0});\n    int cost = 0, count = 0;\n    while (!heap.isEmpty() && count <= n) {\n      int[] current = heap.poll();\n      int node = current[0];\n      if (used[node]) continue;\n      used[node] = true;\n      cost += current[1];\n      count++;\n      for (int[] edge : graph[node]) if (!used[edge[0]]) heap.offer(edge);\n    }\n    return cost;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {\n    List<int[]>[] graph = new ArrayList[n + 1];\n    for (int i = 0; i <= n; i++) graph[i] = new ArrayList<>();\n    for (int house = 1; house <= n; house++) {\n      graph[0].add(new int[] {house, wells[house - 1]});\n      graph[house].add(new int[] {0, wells[house - 1]});\n    }\n    for (int[] pipe : pipes) {\n      graph[pipe[0]].add(new int[] {pipe[1], pipe[2]});\n      graph[pipe[1]].add(new int[] {pipe[0], pipe[2]});\n    }\n    boolean[] used = new boolean[n + 1];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {0, 0});\n    int cost = 0, count = 0;\n    while (!heap.isEmpty() && count <= n) {\n      int[] current = heap.poll();\n      int node = current[0];\n      if (used[node]) continue;\n      used[node] = true;\n      cost += current[1];\n      count++;\n      for (int[] edge : graph[node]) if (!used[edge[0]]) heap.offer(edge);\n    }\n    return cost;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reconstruct Itinerary",
      "difficulty": "Hard",
      "subpattern": "Eulerian path reconstruction",
      "question": "Given airline tickets [from,to], reconstruct the lexicographically smallest itinerary that starts at JFK and uses every ticket exactly once.",
      "trigger": "Every directed edge must be used exactly once, and lexical order decides among Eulerian trails.",
      "intuition": "Hierholzer consumes smallest outgoing edges first and prepends airports after each dead end.",
      "edgeCases": "Duplicate tickets, branching from JFK, cycles, dead ends resolved by postorder, and all tickets already in lexical order.",
      "constraints": "All tickets belong to at least one valid itinerary in the LeetCode problem.",
      "source": {
        "label": "LeetCode 332 - Reconstruct Itinerary",
        "url": "https://leetcode.com/problems/reconstruct-itinerary/"
      },
      "examples": [
        {
          "input": "tickets=[[JFK,SFO],[JFK,ATL],[SFO,ATL],[ATL,JFK],[ATL,SFO]]",
          "output": "[JFK, ATL, JFK, SFO, ATL, SFO]",
          "explanation": "ATL is chosen before SFO lexicographically."
        },
        {
          "input": "tickets=[[JFK,KUL],[JFK,NRT],[NRT,JFK]]",
          "output": "[JFK, NRT, JFK, KUL]",
          "explanation": "Postorder handles the KUL dead end correctly."
        }
      ],
      "bruteForceComplexity": "Time O(E! * E) worst case; Space O(E). Backtracking tries tickets in lexical order until a full route is found.",
      "optimizedComplexity": "Time O(E log E); Space O(E). Iterative Hierholzer uses min-heaps per airport and a stack.",
      "recursiveComplexity": "Time O(E log E); Space O(E). Recursive Hierholzer adds airports on postorder unwind.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findItinerary(List<List<String>> tickets) {\n    tickets.sort((a, b) -> a.get(0).equals(b.get(0)) ? a.get(1).compareTo(b.get(1)) : a.get(0).compareTo(b.get(0)));\n    boolean[] used = new boolean[tickets.size()];\n    List<String> route = new ArrayList<>();\n    route.add(\"JFK\");\n    backtrack(\"JFK\", tickets, used, route);\n    return route;\n  }\n\n  private boolean backtrack(String airport, List<List<String>> tickets, boolean[] used, List<String> route) {\n    if (route.size() == tickets.size() + 1) return true;\n    for (int i = 0; i < tickets.size(); i++) {\n      if (used[i] || !tickets.get(i).get(0).equals(airport)) continue;\n      used[i] = true;\n      route.add(tickets.get(i).get(1));\n      if (backtrack(tickets.get(i).get(1), tickets, used, route)) return true;\n      route.remove(route.size() - 1);\n      used[i] = false;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findItinerary(List<List<String>> tickets) {\n    Map<String, PriorityQueue<String>> graph = new HashMap<>();\n    for (List<String> ticket : tickets) graph.computeIfAbsent(ticket.get(0), key -> new PriorityQueue<>()).offer(ticket.get(1));\n    Deque<String> stack = new ArrayDeque<>();\n    LinkedList<String> route = new LinkedList<>();\n    stack.push(\"JFK\");\n    while (!stack.isEmpty()) {\n      String airport = stack.peek();\n      PriorityQueue<String> next = graph.get(airport);\n      if (next != null && !next.isEmpty()) stack.push(next.poll());\n      else route.addFirst(stack.pop());\n    }\n    return route;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final Map<String, PriorityQueue<String>> graph = new HashMap<>();\n  private final LinkedList<String> route = new LinkedList<>();\n\n  public List<String> findItinerary(List<List<String>> tickets) {\n    for (List<String> ticket : tickets) graph.computeIfAbsent(ticket.get(0), key -> new PriorityQueue<>()).offer(ticket.get(1));\n    dfs(\"JFK\");\n    return route;\n  }\n\n  private void dfs(String airport) {\n    PriorityQueue<String> next = graph.get(airport);\n    while (next != null && !next.isEmpty()) dfs(next.poll());\n    route.addFirst(airport);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findItinerary(List<List<String>> tickets) {\n    Map<String, PriorityQueue<String>> graph = new HashMap<>();\n    for (List<String> ticket : tickets) graph.computeIfAbsent(ticket.get(0), key -> new PriorityQueue<>()).offer(ticket.get(1));\n    Deque<String> stack = new ArrayDeque<>();\n    LinkedList<String> route = new LinkedList<>();\n    stack.push(\"JFK\");\n    while (!stack.isEmpty()) {\n      String airport = stack.peek();\n      PriorityQueue<String> next = graph.get(airport);\n      if (next != null && !next.isEmpty()) stack.push(next.poll());\n      else route.addFirst(stack.pop());\n    }\n    return route;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> findItinerary(List<List<String>> tickets) {\n    Map<String, PriorityQueue<String>> graph = new HashMap<>();\n    for (List<String> ticket : tickets) graph.computeIfAbsent(ticket.get(0), key -> new PriorityQueue<>()).offer(ticket.get(1));\n    Deque<String> stack = new ArrayDeque<>();\n    LinkedList<String> route = new LinkedList<>();\n    stack.push(\"JFK\");\n    while (!stack.isEmpty()) {\n      String airport = stack.peek();\n      PriorityQueue<String> next = graph.get(airport);\n      if (next != null && !next.isEmpty()) stack.push(next.poll());\n      else route.addFirst(stack.pop());\n    }\n    return route;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Alien Dictionary",
      "difficulty": "Hard",
      "subpattern": "Topological ordering from constraints",
      "question": "Given sorted words from an alien language, return one valid character order, or empty string if the order is invalid.",
      "trigger": "Adjacent sorted words reveal directed precedence constraints between first differing characters.",
      "intuition": "Build a character graph, reject invalid prefix order, then topologically sort the graph.",
      "edgeCases": "Invalid prefix like abc before ab, isolated characters, duplicate edges, cycles, and one-word input.",
      "constraints": "Characters are lowercase English letters in the common LeetCode version.",
      "source": {
        "label": "LeetCode 269 - Alien Dictionary",
        "url": "https://leetcode.com/problems/alien-dictionary/"
      },
      "examples": [
        {
          "input": "words=[wrt,wrf,er,ett,rftt]",
          "output": "wertf",
          "explanation": "Constraints imply w before e, e before r, r before t, t before f."
        },
        {
          "input": "words=[z,x,z]",
          "output": "",
          "explanation": "The constraints create a cycle."
        }
      ],
      "bruteForceComplexity": "Time O(26(V + E)); Space O(V + E). Repeatedly scan for an unused zero-indegree character.",
      "optimizedComplexity": "Time O(total characters + V + E); Space O(V + E). Kahn queue processes zero-indegree characters.",
      "recursiveComplexity": "Time O(total characters + V + E); Space O(V + E). DFS color states detect cycles and build reverse postorder.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    GraphData data = build(words);\n    if (!data.valid) return \"\";\n    StringBuilder order = new StringBuilder();\n    boolean[] used = new boolean[26];\n    for (int step = 0; step < data.count; step++) {\n      int pick = -1;\n      for (int c = 0; c < 26; c++) if (data.exists[c] && !used[c] && data.indegree[c] == 0) { pick = c; break; }\n      if (pick == -1) return \"\";\n      used[pick] = true;\n      order.append((char) ('a' + pick));\n      for (int next : data.graph[pick]) data.indegree[next]--;\n    }\n    return order.toString();\n  }\n\n  private GraphData build(String[] words) {\n    GraphData data = new GraphData();\n    for (int i = 0; i < 26; i++) data.graph[i] = new ArrayList<>();\n    for (String word : words) for (char ch : word.toCharArray()) if (!data.exists[ch - 'a']) { data.exists[ch - 'a'] = true; data.count++; }\n    for (int i = 0; i + 1 < words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() > b.length() && a.startsWith(b)) { data.valid = false; return data; }\n      int j = 0;\n      while (j < a.length() && j < b.length() && a.charAt(j) == b.charAt(j)) j++;\n      if (j < a.length() && j < b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!data.edge[from][to]) { data.edge[from][to] = true; data.graph[from].add(to); data.indegree[to]++; }\n      }\n    }\n    return data;\n  }\n\n  private static class GraphData { List<Integer>[] graph = new ArrayList[26]; int[] indegree = new int[26]; boolean[] exists = new boolean[26]; boolean[][] edge = new boolean[26][26]; boolean valid = true; int count; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    List<Integer>[] graph = new ArrayList[26];\n    for (int i = 0; i < 26; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[26];\n    boolean[] exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    int count = 0;\n    for (String word : words) for (char ch : word.toCharArray()) if (!exists[ch - 'a']) { exists[ch - 'a'] = true; count++; }\n    for (int i = 0; i + 1 < words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() > b.length() && a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j < a.length() && j < b.length() && a.charAt(j) == b.charAt(j)) j++;\n      if (j < a.length() && j < b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); indegree[to]++; }\n      }\n    }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int c = 0; c < 26; c++) if (exists[c] && indegree[c] == 0) queue.offer(c);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      int current = queue.poll();\n      order.append((char) ('a' + current));\n      for (int next : graph[current]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return order.length() == count ? order.toString() : \"\";\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private boolean[] exists;\n  private int[] color;\n  private StringBuilder order;\n\n  public String alienOrder(String[] words) {\n    graph = new ArrayList[26];\n    for (int i = 0; i < 26; i++) graph[i] = new ArrayList<>();\n    exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    for (String word : words) for (char ch : word.toCharArray()) exists[ch - 'a'] = true;\n    for (int i = 0; i + 1 < words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() > b.length() && a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j < a.length() && j < b.length() && a.charAt(j) == b.charAt(j)) j++;\n      if (j < a.length() && j < b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); }\n      }\n    }\n    color = new int[26];\n    order = new StringBuilder();\n    for (int c = 0; c < 26; c++) if (exists[c] && color[c] == 0 && !dfs(c)) return \"\";\n    return order.reverse().toString();\n  }\n\n  private boolean dfs(int node) {\n    color[node] = 1;\n    for (int next : graph[node]) {\n      if (color[next] == 1) return false;\n      if (color[next] == 0 && !dfs(next)) return false;\n    }\n    color[node] = 2;\n    order.append((char) ('a' + node));\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    List<Integer>[] graph = new ArrayList[26];\n    for (int i = 0; i < 26; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[26];\n    boolean[] exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    int count = 0;\n    for (String word : words) for (char ch : word.toCharArray()) if (!exists[ch - 'a']) { exists[ch - 'a'] = true; count++; }\n    for (int i = 0; i + 1 < words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() > b.length() && a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j < a.length() && j < b.length() && a.charAt(j) == b.charAt(j)) j++;\n      if (j < a.length() && j < b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); indegree[to]++; }\n      }\n    }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int c = 0; c < 26; c++) if (exists[c] && indegree[c] == 0) queue.offer(c);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      int current = queue.poll();\n      order.append((char) ('a' + current));\n      for (int next : graph[current]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return order.length() == count ? order.toString() : \"\";\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String alienOrder(String[] words) {\n    List<Integer>[] graph = new ArrayList[26];\n    for (int i = 0; i < 26; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[26];\n    boolean[] exists = new boolean[26];\n    boolean[][] edge = new boolean[26][26];\n    int count = 0;\n    for (String word : words) for (char ch : word.toCharArray()) if (!exists[ch - 'a']) { exists[ch - 'a'] = true; count++; }\n    for (int i = 0; i + 1 < words.length; i++) {\n      String a = words[i], b = words[i + 1];\n      if (a.length() > b.length() && a.startsWith(b)) return \"\";\n      int j = 0;\n      while (j < a.length() && j < b.length() && a.charAt(j) == b.charAt(j)) j++;\n      if (j < a.length() && j < b.length()) {\n        int from = a.charAt(j) - 'a', to = b.charAt(j) - 'a';\n        if (!edge[from][to]) { edge[from][to] = true; graph[from].add(to); indegree[to]++; }\n      }\n    }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int c = 0; c < 26; c++) if (exists[c] && indegree[c] == 0) queue.offer(c);\n    StringBuilder order = new StringBuilder();\n    while (!queue.isEmpty()) {\n      int current = queue.poll();\n      order.append((char) ('a' + current));\n      for (int next : graph[current]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return order.length() == count ? order.toString() : \"\";\n  }\n}"
    },
    {
      "group": "core",
      "name": "Course Schedule II",
      "difficulty": "Medium",
      "subpattern": "Course dependency topological sort",
      "question": "Given numCourses and prerequisites [course, prerequisite], return an order to finish all courses or an empty array if impossible.",
      "trigger": "Dependencies form a directed graph, and a valid answer is a topological order.",
      "intuition": "Repeatedly take courses with zero prerequisites, or use DFS postorder while detecting cycles.",
      "edgeCases": "Cycle, disconnected prerequisite components, duplicate dependencies, no prerequisites, and one course.",
      "constraints": "Courses are labeled 0..numCourses-1; any valid topological order is accepted.",
      "source": {
        "label": "LeetCode 210 - Course Schedule II",
        "url": "https://leetcode.com/problems/course-schedule-ii/"
      },
      "examples": [
        {
          "input": "numCourses=2, prerequisites=[[1,0]]",
          "output": "[0,1]",
          "explanation": "Course 0 must come before 1."
        },
        {
          "input": "numCourses=2, prerequisites=[[1,0],[0,1]]",
          "output": "[]",
          "explanation": "The prerequisites form a cycle."
        }
      ],
      "bruteForceComplexity": "Time O(V(V + E)); Space O(V + E). Repeatedly scan all courses for zero indegree.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Kahn queue emits zero-indegree courses.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). DFS colors detect cycles and produce reverse postorder.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<Integer>[] graph = new ArrayList[numCourses];\n    for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[numCourses];\n    for (int[] edge : prerequisites) { graph[edge[1]].add(edge[0]); indegree[edge[0]]++; }\n    boolean[] used = new boolean[numCourses];\n    int[] order = new int[numCourses];\n    int size = 0;\n    for (int step = 0; step < numCourses; step++) {\n      int pick = -1;\n      for (int course = 0; course < numCourses; course++) if (!used[course] && indegree[course] == 0) { pick = course; break; }\n      if (pick == -1) return new int[0];\n      used[pick] = true;\n      order[size++] = pick;\n      for (int next : graph[pick]) indegree[next]--;\n    }\n    return order;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<Integer>[] graph = new ArrayList[numCourses];\n    for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[numCourses];\n    for (int[] edge : prerequisites) { graph[edge[1]].add(edge[0]); indegree[edge[0]]++; }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int course = 0; course < numCourses; course++) if (indegree[course] == 0) queue.offer(course);\n    int[] order = new int[numCourses];\n    int size = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      order[size++] = course;\n      for (int next : graph[course]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return size == numCourses ? order : new int[0];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] color;\n  private int[] order;\n  private int index;\n\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    graph = new ArrayList[numCourses];\n    for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : prerequisites) graph[edge[1]].add(edge[0]);\n    color = new int[numCourses];\n    order = new int[numCourses];\n    index = numCourses - 1;\n    for (int course = 0; course < numCourses; course++) if (color[course] == 0 && !dfs(course)) return new int[0];\n    return order;\n  }\n\n  private boolean dfs(int course) {\n    color[course] = 1;\n    for (int next : graph[course]) {\n      if (color[next] == 1) return false;\n      if (color[next] == 0 && !dfs(next)) return false;\n    }\n    color[course] = 2;\n    order[index--] = course;\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<Integer>[] graph = new ArrayList[numCourses];\n    for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[numCourses];\n    for (int[] edge : prerequisites) { graph[edge[1]].add(edge[0]); indegree[edge[0]]++; }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int course = 0; course < numCourses; course++) if (indegree[course] == 0) queue.offer(course);\n    int[] order = new int[numCourses];\n    int size = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      order[size++] = course;\n      for (int next : graph[course]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return size == numCourses ? order : new int[0];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<Integer>[] graph = new ArrayList[numCourses];\n    for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[numCourses];\n    for (int[] edge : prerequisites) { graph[edge[1]].add(edge[0]); indegree[edge[0]]++; }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int course = 0; course < numCourses; course++) if (indegree[course] == 0) queue.offer(course);\n    int[] order = new int[numCourses];\n    int size = 0;\n    while (!queue.isEmpty()) {\n      int course = queue.poll();\n      order[size++] = course;\n      for (int next : graph[course]) if (--indegree[next] == 0) queue.offer(next);\n    }\n    return size == numCourses ? order : new int[0];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Shortest Path Visiting All Nodes",
      "difficulty": "Hard",
      "subpattern": "Bitmask BFS over graph states",
      "question": "Given an undirected connected graph, return the shortest number of edges needed to visit every node at least once.",
      "trigger": "The state is not just current node; it also includes the set of visited nodes.",
      "intuition": "Run multi-source BFS from every node with mask containing that node; first full mask reached is optimal.",
      "edgeCases": "Single node graph, complete graph, line graph, revisiting nodes, and multiple shortest walks.",
      "constraints": "n <= 12 in the LeetCode problem, making bitmask states feasible.",
      "source": {
        "label": "LeetCode 847 - Shortest Path Visiting All Nodes",
        "url": "https://leetcode.com/problems/shortest-path-visiting-all-nodes/"
      },
      "examples": [
        {
          "input": "graph=[[1,2,3],[0],[0],[0]]",
          "output": "4",
          "explanation": "Start at a leaf, visit center and the other leaves."
        },
        {
          "input": "graph=[[1],[0,2,4],[1,3,4],[2],[1,2]]",
          "output": "4",
          "explanation": "A shortest walk can cover all nodes in four edges."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n) style for path permutations; Space O(n). Backtracking tries walks with pruning.",
      "optimizedComplexity": "Time O(n * 2^n + E * 2^n); Space O(n * 2^n). BFS over (node, visitedMask).",
      "recursiveComplexity": "Time O(n^3 + n^2 * 2^n); Space O(n * 2^n). Floyd distances plus recursive TSP memo.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private int best;\n\n  public int shortestPathLength(int[][] graph) {\n    int n = graph.length;\n    if (n == 1) return 0;\n    best = Integer.MAX_VALUE;\n    int target = (1 << n) - 1;\n    int[][] seenBest = new int[n][1 << n];\n    for (int[] row : seenBest) Arrays.fill(row, Integer.MAX_VALUE);\n    for (int start = 0; start < n; start++) dfs(start, 1 << start, 0, target, graph, seenBest);\n    return best;\n  }\n\n  private void dfs(int node, int mask, int steps, int target, int[][] graph, int[][] seenBest) {\n    if (steps >= best || steps >= seenBest[node][mask]) return;\n    seenBest[node][mask] = steps;\n    if (mask == target) {\n      best = steps;\n      return;\n    }\n    for (int next : graph[node]) dfs(next, mask | (1 << next), steps + 1, target, graph, seenBest);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int shortestPathLength(int[][] graph) {\n    int n = graph.length;\n    int target = (1 << n) - 1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    boolean[][] seen = new boolean[n][1 << n];\n    for (int node = 0; node < n; node++) {\n      int mask = 1 << node;\n      queue.offer(new int[] {node, mask, 0});\n      seen[node][mask] = true;\n    }\n    while (!queue.isEmpty()) {\n      int[] state = queue.poll();\n      if (state[1] == target) return state[2];\n      for (int next : graph[state[0]]) {\n        int nextMask = state[1] | (1 << next);\n        if (!seen[next][nextMask]) {\n          seen[next][nextMask] = true;\n          queue.offer(new int[] {next, nextMask, state[2] + 1});\n        }\n      }\n    }\n    return 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private int[][] dist;\n  private int[][] memo;\n  private int target;\n\n  public int shortestPathLength(int[][] graph) {\n    int n = graph.length;\n    target = (1 << n) - 1;\n    dist = new int[n][n];\n    for (int i = 0; i < n; i++) {\n      Arrays.fill(dist[i], 1_000_000);\n      dist[i][i] = 0;\n      for (int next : graph[i]) dist[i][next] = 1;\n    }\n    for (int k = 0; k < n; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n    memo = new int[n][1 << n];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    int best = Integer.MAX_VALUE;\n    for (int start = 0; start < n; start++) best = Math.min(best, solve(start, 1 << start));\n    return best;\n  }\n\n  private int solve(int node, int mask) {\n    if (mask == target) return 0;\n    if (memo[node][mask] != -1) return memo[node][mask];\n    int best = 1_000_000;\n    for (int next = 0; next < dist.length; next++) {\n      if ((mask & (1 << next)) == 0) best = Math.min(best, dist[node][next] + solve(next, mask | (1 << next)));\n    }\n    return memo[node][mask] = best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int shortestPathLength(int[][] graph) {\n    int n = graph.length;\n    int target = (1 << n) - 1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    boolean[][] seen = new boolean[n][1 << n];\n    for (int node = 0; node < n; node++) {\n      int mask = 1 << node;\n      queue.offer(new int[] {node, mask, 0});\n      seen[node][mask] = true;\n    }\n    while (!queue.isEmpty()) {\n      int[] state = queue.poll();\n      if (state[1] == target) return state[2];\n      for (int next : graph[state[0]]) {\n        int nextMask = state[1] | (1 << next);\n        if (!seen[next][nextMask]) {\n          seen[next][nextMask] = true;\n          queue.offer(new int[] {next, nextMask, state[2] + 1});\n        }\n      }\n    }\n    return 0;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int shortestPathLength(int[][] graph) {\n    int n = graph.length;\n    int target = (1 << n) - 1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    boolean[][] seen = new boolean[n][1 << n];\n    for (int node = 0; node < n; node++) {\n      int mask = 1 << node;\n      queue.offer(new int[] {node, mask, 0});\n      seen[node][mask] = true;\n    }\n    while (!queue.isEmpty()) {\n      int[] state = queue.poll();\n      if (state[1] == target) return state[2];\n      for (int next : graph[state[0]]) {\n        int nextMask = state[1] | (1 << next);\n        if (!seen[next][nextMask]) {\n          seen[next][nextMask] = true;\n          queue.offer(new int[] {next, nextMask, state[2] + 1});\n        }\n      }\n    }\n    return 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Cost to Reach Destination in Time",
      "difficulty": "Hard",
      "subpattern": "Time-expanded shortest path DP",
      "question": "Given maxTime, undirected edges [u,v,time], and passingFees per city, return the minimum fee to reach city n-1 within maxTime or -1.",
      "trigger": "Shortest path state includes elapsed time, and cheapest cost is not always the fastest route.",
      "intuition": "Keep the cheapest fee for each city at each possible time and relax edges across time layers.",
      "edgeCases": "Destination unreachable within time, direct expensive path, cycles, maxTime too small, and returning to a city later with lower fee.",
      "constraints": "maxTime <= 1000 in the LeetCode problem, so time-layer DP is feasible.",
      "source": {
        "label": "LeetCode 1928 - Minimum Cost to Reach Destination in Time",
        "url": "https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/"
      },
      "examples": [
        {
          "input": "maxTime=30, edges=[[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], fees=[5,1,2,20,20,3]",
          "output": "11",
          "explanation": "Path 0-1-2-5 reaches in 30 with fee 11."
        },
        {
          "input": "maxTime=29 with the same graph",
          "output": "48",
          "explanation": "The cheaper path is too slow, so another route is needed."
        }
      ],
      "bruteForceComplexity": "Time exponential in paths bounded by time; Space O(V + E + maxTime). DFS enumerates feasible routes with pruning.",
      "optimizedComplexity": "Time O(maxTime * E); Space O(maxTime * V). DP relaxes every edge between adjacent time layers.",
      "recursiveComplexity": "Time O(V * maxTime + E * maxTime); Space O(V * maxTime). Memoized DFS chooses outgoing edges under remaining time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private int best;\n\n  public int minCost(int maxTime, int[][] edges, int[] passingFees) {\n    List<int[]>[] graph = build(passingFees.length, edges);\n    best = Integer.MAX_VALUE;\n    dfs(0, maxTime, passingFees[0], graph, passingFees);\n    return best == Integer.MAX_VALUE ? -1 : best;\n  }\n\n  private void dfs(int node, int timeLeft, int cost, List<int[]>[] graph, int[] fees) {\n    if (timeLeft < 0 || cost >= best) return;\n    if (node == fees.length - 1) {\n      best = cost;\n      return;\n    }\n    for (int[] edge : graph[node]) dfs(edge[0], timeLeft - edge[1], cost + fees[edge[0]], graph, fees);\n  }\n\n  private List<int[]>[] build(int n, int[][] edges) {\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); graph[edge[1]].add(new int[] {edge[0], edge[2]}); }\n    return graph;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minCost(int maxTime, int[][] edges, int[] passingFees) {\n    int n = passingFees.length;\n    int[][] dp = new int[maxTime + 1][n];\n    for (int[] row : dp) Arrays.fill(row, 1_000_000_000);\n    dp[0][0] = passingFees[0];\n    for (int time = 1; time <= maxTime; time++) {\n      for (int[] edge : edges) {\n        int a = edge[0], b = edge[1], t = edge[2];\n        if (time >= t) {\n          dp[time][a] = Math.min(dp[time][a], dp[time - t][b] + passingFees[a]);\n          dp[time][b] = Math.min(dp[time][b], dp[time - t][a] + passingFees[b]);\n        }\n      }\n    }\n    int answer = 1_000_000_000;\n    for (int time = 0; time <= maxTime; time++) answer = Math.min(answer, dp[time][n - 1]);\n    return answer == 1_000_000_000 ? -1 : answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<int[]>[] graph;\n  private int[] fees;\n  private int[][] memo;\n  private static final int INF = 1_000_000_000;\n\n  public int minCost(int maxTime, int[][] edges, int[] passingFees) {\n    fees = passingFees;\n    graph = new ArrayList[fees.length];\n    for (int i = 0; i < fees.length; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); graph[edge[1]].add(new int[] {edge[0], edge[2]}); }\n    memo = new int[fees.length][maxTime + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    int suffix = dfs(0, maxTime);\n    return suffix >= INF ? -1 : suffix;\n  }\n\n  private int dfs(int node, int timeLeft) {\n    if (timeLeft < 0) return INF;\n    if (node == fees.length - 1) return fees[node];\n    if (memo[node][timeLeft] != -1) return memo[node][timeLeft];\n    int best = INF;\n    for (int[] edge : graph[node]) {\n      int next = dfs(edge[0], timeLeft - edge[1]);\n      if (next < INF) best = Math.min(best, fees[node] + next);\n    }\n    return memo[node][timeLeft] = best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minCost(int maxTime, int[][] edges, int[] passingFees) {\n    int n = passingFees.length;\n    int[][] dp = new int[maxTime + 1][n];\n    for (int[] row : dp) Arrays.fill(row, 1_000_000_000);\n    dp[0][0] = passingFees[0];\n    for (int time = 1; time <= maxTime; time++) {\n      for (int[] edge : edges) {\n        int a = edge[0], b = edge[1], t = edge[2];\n        if (time >= t) {\n          dp[time][a] = Math.min(dp[time][a], dp[time - t][b] + passingFees[a]);\n          dp[time][b] = Math.min(dp[time][b], dp[time - t][a] + passingFees[b]);\n        }\n      }\n    }\n    int answer = 1_000_000_000;\n    for (int time = 0; time <= maxTime; time++) answer = Math.min(answer, dp[time][n - 1]);\n    return answer == 1_000_000_000 ? -1 : answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minCost(int maxTime, int[][] edges, int[] passingFees) {\n    int n = passingFees.length;\n    int[][] dp = new int[maxTime + 1][n];\n    for (int[] row : dp) Arrays.fill(row, 1_000_000_000);\n    dp[0][0] = passingFees[0];\n    for (int time = 1; time <= maxTime; time++) {\n      for (int[] edge : edges) {\n        int a = edge[0], b = edge[1], t = edge[2];\n        if (time >= t) {\n          dp[time][a] = Math.min(dp[time][a], dp[time - t][b] + passingFees[a]);\n          dp[time][b] = Math.min(dp[time][b], dp[time - t][a] + passingFees[b]);\n        }\n      }\n    }\n    int answer = 1_000_000_000;\n    for (int time = 0; time <= maxTime; time++) answer = Math.min(answer, dp[time][n - 1]);\n    return answer == 1_000_000_000 ? -1 : answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Find the City With the Smallest Number of Neighbors",
      "difficulty": "Medium",
      "subpattern": "Floyd-Warshall all-pairs shortest paths",
      "question": "Given weighted undirected edges and a distance threshold, return the city with the fewest reachable cities within the threshold, breaking ties by larger city index.",
      "trigger": "Every city is a source and n is small enough for all-pairs shortest paths.",
      "intuition": "Compute shortest distance between every pair, then count threshold-reachable neighbors for each city.",
      "edgeCases": "Tie by highest index, disconnected pairs, threshold zero, duplicate edges, and n = 1.",
      "constraints": "n <= 100 in the LeetCode problem; O(n^3) Floyd-Warshall is acceptable.",
      "source": {
        "label": "LeetCode 1334 - Find the City With the Smallest Number of Neighbors",
        "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"
      },
      "examples": [
        {
          "input": "n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], threshold=4",
          "output": "3",
          "explanation": "City 3 has the smallest reachable count after tie-breaking."
        },
        {
          "input": "n=5, edges=[[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], threshold=2",
          "output": "0",
          "explanation": "City 0 reaches only city 1 within threshold."
        }
      ],
      "bruteForceComplexity": "Time O(n(E log n)); Space O(n + E). Run Dijkstra from every city.",
      "optimizedComplexity": "Time O(n^3); Space O(n^2). Floyd-Warshall computes all-pairs distances.",
      "recursiveComplexity": "Time O(n^3); Space O(n^3). Recursive shortest(i,j,k) memoizes allowed intermediate nodes.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findTheCity(int n, int[][] edges, int distanceThreshold) {\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); graph[edge[1]].add(new int[] {edge[0], edge[2]}); }\n    int answer = -1, bestCount = Integer.MAX_VALUE;\n    for (int city = 0; city < n; city++) {\n      int count = countReachable(city, graph, distanceThreshold);\n      if (count <= bestCount) { bestCount = count; answer = city; }\n    }\n    return answer;\n  }\n\n  private int countReachable(int start, List<int[]>[] graph, int threshold) {\n    int[] dist = new int[graph.length];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[start] = 0;\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {start, 0});\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      if (current[1] != dist[current[0]]) continue;\n      for (int[] edge : graph[current[0]]) {\n        int nextDistance = current[1] + edge[1];\n        if (nextDistance < dist[edge[0]]) { dist[edge[0]] = nextDistance; heap.offer(new int[] {edge[0], nextDistance}); }\n      }\n    }\n    int count = 0;\n    for (int city = 0; city < dist.length; city++) if (city != start && dist[city] <= threshold) count++;\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findTheCity(int n, int[][] edges, int distanceThreshold) {\n    int[][] dist = new int[n][n];\n    for (int[] row : dist) Arrays.fill(row, 1_000_000_000);\n    for (int i = 0; i < n; i++) dist[i][i] = 0;\n    for (int[] edge : edges) {\n      dist[edge[0]][edge[1]] = Math.min(dist[edge[0]][edge[1]], edge[2]);\n      dist[edge[1]][edge[0]] = Math.min(dist[edge[1]][edge[0]], edge[2]);\n    }\n    for (int mid = 0; mid < n; mid++) for (int from = 0; from < n; from++) for (int to = 0; to < n; to++) {\n      dist[from][to] = Math.min(dist[from][to], dist[from][mid] + dist[mid][to]);\n    }\n    int answer = -1, bestCount = Integer.MAX_VALUE;\n    for (int city = 0; city < n; city++) {\n      int count = 0;\n      for (int other = 0; other < n; other++) if (other != city && dist[city][other] <= distanceThreshold) count++;\n      if (count <= bestCount) { bestCount = count; answer = city; }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private int[][][] memo;\n  private int n;\n\n  public int findTheCity(int n, int[][] edges, int distanceThreshold) {\n    this.n = n;\n    memo = new int[n][n][n + 1];\n    for (int[][] layer : memo) for (int[] row : layer) Arrays.fill(row, -1);\n    int[][] direct = new int[n][n];\n    for (int[] row : direct) Arrays.fill(row, 1_000_000_000);\n    for (int i = 0; i < n; i++) direct[i][i] = 0;\n    for (int[] edge : edges) { direct[edge[0]][edge[1]] = Math.min(direct[edge[0]][edge[1]], edge[2]); direct[edge[1]][edge[0]] = Math.min(direct[edge[1]][edge[0]], edge[2]); }\n    this.direct = direct;\n    int answer = -1, best = Integer.MAX_VALUE;\n    for (int city = 0; city < n; city++) {\n      int count = 0;\n      for (int other = 0; other < n; other++) if (other != city && shortest(city, other, n) <= distanceThreshold) count++;\n      if (count <= best) { best = count; answer = city; }\n    }\n    return answer;\n  }\n\n  private int[][] direct;\n\n  private int shortest(int from, int to, int k) {\n    if (k == 0) return direct[from][to];\n    if (memo[from][to][k] != -1) return memo[from][to][k];\n    int without = shortest(from, to, k - 1);\n    int through = shortest(from, k - 1, k - 1) + shortest(k - 1, to, k - 1);\n    return memo[from][to][k] = Math.min(without, through);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findTheCity(int n, int[][] edges, int distanceThreshold) {\n    int[][] dist = new int[n][n];\n    for (int[] row : dist) Arrays.fill(row, 1_000_000_000);\n    for (int i = 0; i < n; i++) dist[i][i] = 0;\n    for (int[] edge : edges) {\n      dist[edge[0]][edge[1]] = Math.min(dist[edge[0]][edge[1]], edge[2]);\n      dist[edge[1]][edge[0]] = Math.min(dist[edge[1]][edge[0]], edge[2]);\n    }\n    for (int mid = 0; mid < n; mid++) for (int from = 0; from < n; from++) for (int to = 0; to < n; to++) {\n      dist[from][to] = Math.min(dist[from][to], dist[from][mid] + dist[mid][to]);\n    }\n    int answer = -1, bestCount = Integer.MAX_VALUE;\n    for (int city = 0; city < n; city++) {\n      int count = 0;\n      for (int other = 0; other < n; other++) if (other != city && dist[city][other] <= distanceThreshold) count++;\n      if (count <= bestCount) { bestCount = count; answer = city; }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findTheCity(int n, int[][] edges, int distanceThreshold) {\n    int[][] dist = new int[n][n];\n    for (int[] row : dist) Arrays.fill(row, 1_000_000_000);\n    for (int i = 0; i < n; i++) dist[i][i] = 0;\n    for (int[] edge : edges) {\n      dist[edge[0]][edge[1]] = Math.min(dist[edge[0]][edge[1]], edge[2]);\n      dist[edge[1]][edge[0]] = Math.min(dist[edge[1]][edge[0]], edge[2]);\n    }\n    for (int mid = 0; mid < n; mid++) for (int from = 0; from < n; from++) for (int to = 0; to < n; to++) {\n      dist[from][to] = Math.min(dist[from][to], dist[from][mid] + dist[mid][to]);\n    }\n    int answer = -1, bestCount = Integer.MAX_VALUE;\n    for (int city = 0; city < n; city++) {\n      int count = 0;\n      for (int other = 0; other < n; other++) if (other != city && dist[city][other] <= distanceThreshold) count++;\n      if (count <= bestCount) { bestCount = count; answer = city; }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Critical Connections in a Network",
      "difficulty": "Hard",
      "subpattern": "Tarjan bridge detection",
      "question": "Given an undirected connected network, return all critical connections whose removal disconnects the graph.",
      "trigger": "Need to identify edges that no back edge can bypass in a DFS tree.",
      "intuition": "An edge parent->child is a bridge when low[child] is greater than disc[parent].",
      "edgeCases": "Single edge, cycles with no bridges, chain graph, root handling, and duplicate-like input ordering.",
      "constraints": "n up to 1e5; O(V + E) low-link traversal is required.",
      "source": {
        "label": "LeetCode 1192 - Critical Connections in a Network",
        "url": "https://leetcode.com/problems/critical-connections-in-a-network/"
      },
      "examples": [
        {
          "input": "n=4, connections=[[0,1],[1,2],[2,0],[1,3]]",
          "output": "[[1,3]]",
          "explanation": "Removing 1-3 isolates node 3."
        },
        {
          "input": "n=2, connections=[[0,1]]",
          "output": "[[0,1]]",
          "explanation": "The only edge is a bridge."
        }
      ],
      "bruteForceComplexity": "Time O(E(V + E)); Space O(V + E). Remove each edge and test connectivity.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Tarjan low-link finds all bridges in one DFS.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive DFS maintains discovery and low times.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int skip = 0; skip < connections.size(); skip++) {\n      if (!connected(n, connections, skip)) answer.add(connections.get(skip));\n    }\n    return answer;\n  }\n\n  private boolean connected(int n, List<List<Integer>> edges, int skip) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int i = 0; i < edges.size(); i++) {\n      if (i == skip) continue;\n      int a = edges.get(i).get(0), b = edges.get(i).get(1);\n      graph[a].add(b); graph[b].add(a);\n    }\n    boolean[] seen = new boolean[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(0); seen[0] = true;\n    int count = 0;\n    while (!stack.isEmpty()) {\n      int node = stack.pop(); count++;\n      for (int next : graph[node]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n    }\n    return count == n;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List<List<Integer>> bridges;\n\n  public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (List<Integer> edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n]; low = new int[n]; bridges = new ArrayList<>();\n    dfs(0, -1);\n    return bridges;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] > disc[node]) bridges.add(Arrays.asList(node, next));\n      } else {\n        low[node] = Math.min(low[node], disc[next]);\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List<List<Integer>> answer;\n\n  public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (List<Integer> edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n];\n    low = new int[n];\n    answer = new ArrayList<>();\n    dfs(0, -1);\n    return answer;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] > disc[node]) answer.add(Arrays.asList(node, next));\n      } else low[node] = Math.min(low[node], disc[next]);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List<List<Integer>> bridges;\n\n  public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (List<Integer> edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n]; low = new int[n]; bridges = new ArrayList<>();\n    dfs(0, -1);\n    return bridges;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] > disc[node]) bridges.add(Arrays.asList(node, next));\n      } else {\n        low[node] = Math.min(low[node], disc[next]);\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private int time;\n  private List<List<Integer>> bridges;\n\n  public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (List<Integer> edge : connections) { graph[edge.get(0)].add(edge.get(1)); graph[edge.get(1)].add(edge.get(0)); }\n    disc = new int[n]; low = new int[n]; bridges = new ArrayList<>();\n    dfs(0, -1);\n    return bridges;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (low[next] > disc[node]) bridges.add(Arrays.asList(node, next));\n      } else {\n        low[node] = Math.min(low[node], disc[next]);\n      }\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Number of Connected Components in an Undirected Graph",
      "difficulty": "Medium",
      "subpattern": "Union-Find connected components",
      "question": "Given n nodes and undirected edges, return the number of connected components.",
      "trigger": "Connectivity changes are edge unions, and each edge can merge two previously separate components.",
      "intuition": "Start with n components; each successful union reduces the count by one.",
      "edgeCases": "No edges, self loops, duplicate edges, fully connected graph, and isolated nodes.",
      "constraints": "Nodes are labeled 0..n-1; DSU gives near-constant edge processing.",
      "source": {
        "label": "LeetCode 323 - Number of Connected Components in an Undirected Graph",
        "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
      },
      "examples": [
        {
          "input": "n=5, edges=[[0,1],[1,2],[3,4]]",
          "output": "2",
          "explanation": "Components are {0,1,2} and {3,4}."
        },
        {
          "input": "n=5, edges=[[0,1],[1,2],[2,3],[3,4]]",
          "output": "1",
          "explanation": "All nodes are connected."
        }
      ],
      "bruteForceComplexity": "Time O(V + E); Space O(V + E). Build graph and DFS every unvisited node.",
      "optimizedComplexity": "Time O(E alpha(V)); Space O(V). Union-Find maintains component count.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive DFS counts components.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countComponents(int n, int[][] edges) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(edge[1]); graph[edge[1]].add(edge[0]); }\n    boolean[] seen = new boolean[n];\n    int count = 0;\n    for (int node = 0; node < n; node++) {\n      if (seen[node]) continue;\n      count++;\n      Deque<Integer> stack = new ArrayDeque<>();\n      stack.push(node); seen[node] = true;\n      while (!stack.isEmpty()) for (int next : graph[stack.pop()]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int countComponents(int n, int[][] edges) {\n    DSU dsu = new DSU(n);\n    int components = n;\n    for (int[] edge : edges) if (dsu.union(edge[0], edge[1])) components--;\n    return components;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countComponents(int n, int[][] edges) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(edge[1]); graph[edge[1]].add(edge[0]); }\n    boolean[] seen = new boolean[n];\n    int count = 0;\n    for (int node = 0; node < n; node++) {\n      if (!seen[node]) {\n        count++;\n        dfs(node, graph, seen);\n      }\n    }\n    return count;\n  }\n\n  private void dfs(int node, List<Integer>[] graph, boolean[] seen) {\n    seen[node] = true;\n    for (int next : graph[node]) if (!seen[next]) dfs(next, graph, seen);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countComponents(int n, int[][] edges) {\n    DSU dsu = new DSU(n);\n    int components = n;\n    for (int[] edge : edges) if (dsu.union(edge[0], edge[1])) components--;\n    return components;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}",
      "code": "class Solution {\n  public int countComponents(int n, int[][] edges) {\n    DSU dsu = new DSU(n);\n    int components = n;\n    for (int[] edge : edges) if (dsu.union(edge[0], edge[1])) components--;\n    return components;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Kosaraju SCC Count",
      "difficulty": "Hard",
      "subpattern": "Kosaraju strongly connected components",
      "question": "Given a directed graph with n nodes and edges [u,v], return the number of strongly connected components.",
      "trigger": "Need groups where every node can reach every other node in the same group.",
      "intuition": "First DFS records finish order, then DFS on the reversed graph in that order extracts SCCs.",
      "edgeCases": "Single node, no edges, self loops, disconnected directed components, and one giant cycle.",
      "constraints": "Use O(V + E) graph traversals; nodes are labeled 0..n-1.",
      "source": {
        "label": "Kosaraju Algorithm - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/kosarajus-algorithm-in-java/"
      },
      "examples": [
        {
          "input": "n=5, edges=[[1,0],[0,2],[2,1],[0,3],[3,4]]",
          "output": "3",
          "explanation": "{0,1,2}, {3}, and {4} are SCCs."
        },
        {
          "input": "n=3, edges=[[0,1],[1,2],[2,0]]",
          "output": "1",
          "explanation": "Every node reaches every other node."
        }
      ],
      "bruteForceComplexity": "Time O(V(V + E)); Space O(V + E). Compare forward and reverse reachability from every unassigned node.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Kosaraju uses finish order and reverse graph.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive DFS performs both passes.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countSCC(int n, int[][] edges) {\n    List<Integer>[] graph = build(n, edges, false);\n    List<Integer>[] reverse = build(n, edges, true);\n    boolean[] assigned = new boolean[n];\n    int count = 0;\n    for (int node = 0; node < n; node++) {\n      if (assigned[node]) continue;\n      boolean[] forward = reach(node, graph);\n      boolean[] backward = reach(node, reverse);\n      count++;\n      for (int i = 0; i < n; i++) if (forward[i] && backward[i]) assigned[i] = true;\n    }\n    return count;\n  }\n\n  private boolean[] reach(int start, List<Integer>[] graph) {\n    boolean[] seen = new boolean[graph.length];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(start); seen[start] = true;\n    while (!stack.isEmpty()) for (int next : graph[stack.pop()]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n    return seen;\n  }\n\n  private List<Integer>[] build(int n, int[][] edges, boolean rev) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[rev ? edge[1] : edge[0]].add(rev ? edge[0] : edge[1]);\n    return graph;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countSCC(int n, int[][] edges) {\n    List<Integer>[] graph = build(n, edges, false);\n    List<Integer>[] reverse = build(n, edges, true);\n    boolean[] seen = new boolean[n];\n    List<Integer> order = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (!seen[node]) dfsOrder(node, graph, seen, order);\n    Arrays.fill(seen, false);\n    int count = 0;\n    for (int i = order.size() - 1; i >= 0; i--) {\n      int node = order.get(i);\n      if (!seen[node]) {\n        count++;\n        mark(node, reverse, seen);\n      }\n    }\n    return count;\n  }\n\n  private void dfsOrder(int node, List<Integer>[] graph, boolean[] seen, List<Integer> order) {\n    seen[node] = true;\n    for (int next : graph[node]) if (!seen[next]) dfsOrder(next, graph, seen, order);\n    order.add(node);\n  }\n\n  private void mark(int start, List<Integer>[] graph, boolean[] seen) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(start); seen[start] = true;\n    while (!stack.isEmpty()) for (int next : graph[stack.pop()]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n  }\n\n  private List<Integer>[] build(int n, int[][] edges, boolean rev) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[rev ? edge[1] : edge[0]].add(rev ? edge[0] : edge[1]);\n    return graph;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countSCC(int n, int[][] edges) {\n    List<Integer>[] graph = build(n, edges, false);\n    List<Integer>[] reverse = build(n, edges, true);\n    boolean[] seen = new boolean[n];\n    List<Integer> order = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (!seen[node]) finish(node, graph, seen, order);\n    Arrays.fill(seen, false);\n    return collect(order.size() - 1, order, reverse, seen, 0);\n  }\n\n  private int collect(int index, List<Integer> order, List<Integer>[] reverse, boolean[] seen, int count) {\n    if (index < 0) return count;\n    int node = order.get(index);\n    if (!seen[node]) {\n      mark(node, reverse, seen);\n      return collect(index - 1, order, reverse, seen, count + 1);\n    }\n    return collect(index - 1, order, reverse, seen, count);\n  }\n\n  private void finish(int node, List<Integer>[] graph, boolean[] seen, List<Integer> order) {\n    seen[node] = true;\n    for (int next : graph[node]) if (!seen[next]) finish(next, graph, seen, order);\n    order.add(node);\n  }\n\n  private void mark(int node, List<Integer>[] graph, boolean[] seen) {\n    seen[node] = true;\n    for (int next : graph[node]) if (!seen[next]) mark(next, graph, seen);\n  }\n\n  private List<Integer>[] build(int n, int[][] edges, boolean rev) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[rev ? edge[1] : edge[0]].add(rev ? edge[0] : edge[1]);\n    return graph;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countSCC(int n, int[][] edges) {\n    List<Integer>[] graph = build(n, edges, false);\n    List<Integer>[] reverse = build(n, edges, true);\n    boolean[] seen = new boolean[n];\n    List<Integer> order = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (!seen[node]) dfsOrder(node, graph, seen, order);\n    Arrays.fill(seen, false);\n    int count = 0;\n    for (int i = order.size() - 1; i >= 0; i--) {\n      int node = order.get(i);\n      if (!seen[node]) {\n        count++;\n        mark(node, reverse, seen);\n      }\n    }\n    return count;\n  }\n\n  private void dfsOrder(int node, List<Integer>[] graph, boolean[] seen, List<Integer> order) {\n    seen[node] = true;\n    for (int next : graph[node]) if (!seen[next]) dfsOrder(next, graph, seen, order);\n    order.add(node);\n  }\n\n  private void mark(int start, List<Integer>[] graph, boolean[] seen) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(start); seen[start] = true;\n    while (!stack.isEmpty()) for (int next : graph[stack.pop()]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n  }\n\n  private List<Integer>[] build(int n, int[][] edges, boolean rev) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[rev ? edge[1] : edge[0]].add(rev ? edge[0] : edge[1]);\n    return graph;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countSCC(int n, int[][] edges) {\n    List<Integer>[] graph = build(n, edges, false);\n    List<Integer>[] reverse = build(n, edges, true);\n    boolean[] seen = new boolean[n];\n    List<Integer> order = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (!seen[node]) dfsOrder(node, graph, seen, order);\n    Arrays.fill(seen, false);\n    int count = 0;\n    for (int i = order.size() - 1; i >= 0; i--) {\n      int node = order.get(i);\n      if (!seen[node]) {\n        count++;\n        mark(node, reverse, seen);\n      }\n    }\n    return count;\n  }\n\n  private void dfsOrder(int node, List<Integer>[] graph, boolean[] seen, List<Integer> order) {\n    seen[node] = true;\n    for (int next : graph[node]) if (!seen[next]) dfsOrder(next, graph, seen, order);\n    order.add(node);\n  }\n\n  private void mark(int start, List<Integer>[] graph, boolean[] seen) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(start); seen[start] = true;\n    while (!stack.isEmpty()) for (int next : graph[stack.pop()]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n  }\n\n  private List<Integer>[] build(int n, int[][] edges, boolean rev) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[rev ? edge[1] : edge[0]].add(rev ? edge[0] : edge[1]);\n    return graph;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Tarjan SCC Count",
      "difficulty": "Hard",
      "subpattern": "Tarjan SCC low-link",
      "question": "Given a directed graph, count strongly connected components using one DFS pass with low-link values.",
      "trigger": "Need SCCs without building a reverse graph or doing two full passes.",
      "intuition": "A node starts an SCC when its low-link equals its discovery id; pop the active stack up to that node.",
      "edgeCases": "Self loop, disconnected directed graph, one large cycle, DAG where every node is its own SCC, and back edges to active nodes only.",
      "constraints": "O(V + E) time and space with nodes labeled 0..n-1.",
      "source": {
        "label": "Tarjan SCC Algorithm - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/"
      },
      "examples": [
        {
          "input": "n=5, edges=[[1,0],[0,2],[2,1],[0,3],[3,4]]",
          "output": "3",
          "explanation": "{0,1,2}, {3}, and {4} are SCCs."
        },
        {
          "input": "n=4, edges=[[0,1],[1,2],[2,3]]",
          "output": "4",
          "explanation": "A DAG has each node as its own SCC."
        }
      ],
      "bruteForceComplexity": "Time O(V(V + E)); Space O(V + E). Brute reachability groups mutually reachable nodes.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Tarjan low-link processes SCCs in one DFS.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive low-link stack extraction.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countSCC(int n, int[][] edges) {\n    List<Integer>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    boolean[] assigned = new boolean[n];\n    int count = 0;\n    for (int node = 0; node < n; node++) {\n      if (assigned[node]) continue;\n      boolean[] fromNode = reach(node, graph);\n      count++;\n      for (int other = 0; other < n; other++) if (!assigned[other] && fromNode[other] && reach(other, graph)[node]) assigned[other] = true;\n    }\n    return count;\n  }\n\n  private boolean[] reach(int start, List<Integer>[] graph) {\n    boolean[] seen = new boolean[graph.length];\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(start); seen[start] = true;\n    while (!stack.isEmpty()) for (int next : graph[stack.pop()]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n    return seen;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private boolean[] inStack;\n  private Deque<Integer> stack;\n  private int time;\n  private int count;\n\n  public int countSCC(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    disc = new int[n]; low = new int[n]; inStack = new boolean[n]; stack = new ArrayDeque<>(); time = 0; count = 0;\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node);\n    return count;\n  }\n\n  private void dfs(int node) {\n    disc[node] = low[node] = ++time;\n    stack.push(node);\n    inStack[node] = true;\n    for (int next : graph[node]) {\n      if (disc[next] == 0) { dfs(next); low[node] = Math.min(low[node], low[next]); }\n      else if (inStack[next]) low[node] = Math.min(low[node], disc[next]);\n    }\n    if (low[node] == disc[node]) {\n      while (true) {\n        int top = stack.pop();\n        inStack[top] = false;\n        if (top == node) break;\n      }\n      count++;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private boolean[] active;\n  private Deque<Integer> stack;\n  private int time;\n  private int count;\n\n  public int countSCC(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    disc = new int[n]; low = new int[n]; active = new boolean[n]; stack = new ArrayDeque<>(); time = 0; count = 0;\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node);\n    return count;\n  }\n\n  private void dfs(int node) {\n    disc[node] = low[node] = ++time;\n    stack.push(node);\n    active[node] = true;\n    for (int next : graph[node]) {\n      if (disc[next] == 0) {\n        dfs(next);\n        low[node] = Math.min(low[node], low[next]);\n      } else if (active[next]) low[node] = Math.min(low[node], disc[next]);\n    }\n    if (low[node] == disc[node]) popComponent(node);\n  }\n\n  private void popComponent(int root) {\n    int top = stack.pop();\n    active[top] = false;\n    if (top != root) popComponent(root);\n    else count++;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private boolean[] inStack;\n  private Deque<Integer> stack;\n  private int time;\n  private int count;\n\n  public int countSCC(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    disc = new int[n]; low = new int[n]; inStack = new boolean[n]; stack = new ArrayDeque<>(); time = 0; count = 0;\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node);\n    return count;\n  }\n\n  private void dfs(int node) {\n    disc[node] = low[node] = ++time;\n    stack.push(node);\n    inStack[node] = true;\n    for (int next : graph[node]) {\n      if (disc[next] == 0) { dfs(next); low[node] = Math.min(low[node], low[next]); }\n      else if (inStack[next]) low[node] = Math.min(low[node], disc[next]);\n    }\n    if (low[node] == disc[node]) {\n      while (true) {\n        int top = stack.pop();\n        inStack[top] = false;\n        if (top == node) break;\n      }\n      count++;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private boolean[] inStack;\n  private Deque<Integer> stack;\n  private int time;\n  private int count;\n\n  public int countSCC(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    disc = new int[n]; low = new int[n]; inStack = new boolean[n]; stack = new ArrayDeque<>(); time = 0; count = 0;\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node);\n    return count;\n  }\n\n  private void dfs(int node) {\n    disc[node] = low[node] = ++time;\n    stack.push(node);\n    inStack[node] = true;\n    for (int next : graph[node]) {\n      if (disc[next] == 0) { dfs(next); low[node] = Math.min(low[node], low[next]); }\n      else if (inStack[next]) low[node] = Math.min(low[node], disc[next]);\n    }\n    if (low[node] == disc[node]) {\n      while (true) {\n        int top = stack.pop();\n        inStack[top] = false;\n        if (top == node) break;\n      }\n      count++;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Spanning Tree Kruskal",
      "difficulty": "Medium",
      "subpattern": "Kruskal MST implementation",
      "question": "Given n nodes and undirected weighted edges [u,v,w], return the minimum spanning tree weight, or -1 if the graph is disconnected.",
      "trigger": "Need the cheapest set of edges connecting all nodes, and edges are naturally sortable by weight.",
      "intuition": "Sort edges by weight and accept an edge only when it connects two different components.",
      "edgeCases": "Disconnected graph, duplicate edges, equal weights, negative weights, and n = 1.",
      "constraints": "Kruskal is O(E log E) and works when edges are given explicitly.",
      "source": {
        "label": "Kruskal MST - CP Algorithms",
        "url": "https://cp-algorithms.com/graph/mst_kruskal.html"
      },
      "examples": [
        {
          "input": "n=4, edges=[[0,1,1],[1,2,2],[2,3,3],[0,3,10]]",
          "output": "6",
          "explanation": "Choose the first three edges."
        },
        {
          "input": "n=3, edges=[[0,1,5]]",
          "output": "-1",
          "explanation": "Node 2 is disconnected."
        }
      ],
      "bruteForceComplexity": "Time O(2^E * E alpha(V)); Space O(E). Try edge subsets until a connected tree with minimum weight is found.",
      "optimizedComplexity": "Time O(E log E); Space O(V). Kruskal sorts once and uses DSU.",
      "recursiveComplexity": "Time O(E log E); Space O(V + E). Recursive scan accepts sorted edges with DSU.",
      "bruteForceCode": "class Solution {\n  private int best;\n\n  public int minimumSpanningTree(int n, int[][] edges) {\n    if (n == 1) return 0;\n    best = Integer.MAX_VALUE;\n    choose(0, 0, 0, n, edges, new DSU(n));\n    return best == Integer.MAX_VALUE ? -1 : best;\n  }\n\n  private void choose(int index, int used, int cost, int n, int[][] edges, DSU dsu) {\n    if (cost >= best) return;\n    if (used == n - 1) {\n      best = cost;\n      return;\n    }\n    if (index == edges.length) return;\n    DSU copy = new DSU(dsu);\n    if (copy.union(edges[index][0], edges[index][1])) choose(index + 1, used + 1, cost + edges[index][2], n, edges, copy);\n    choose(index + 1, used, cost, n, edges, dsu);\n  }\n\n  private static class DSU {\n    int[] parent;\n    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    DSU(DSU other) { parent = other.parent.clone(); }\n    int find(int x) { while (x != parent[x]) x = parent[x]; return x; }\n    boolean union(int a, int b) { int pa = find(a), pb = find(b); if (pa == pb) return false; parent[pa] = pb; return true; }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    Arrays.sort(edges, Comparator.comparingInt(a -> a[2]));\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    for (int[] edge : edges) {\n      if (dsu.union(edge[0], edge[1])) {\n        cost += edge[2];\n        if (++used == n - 1) return cost;\n      }\n    }\n    return n == 1 ? 0 : -1;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    Arrays.sort(edges, Comparator.comparingInt(a -> a[2]));\n    int cost = scan(0, 0, 0, n, edges, new DSU(n));\n    return cost == Integer.MAX_VALUE ? -1 : cost;\n  }\n\n  private int scan(int index, int used, int cost, int n, int[][] edges, DSU dsu) {\n    if (n == 1) return 0;\n    if (used == n - 1) return cost;\n    if (index == edges.length) return Integer.MAX_VALUE;\n    int[] edge = edges[index];\n    if (dsu.union(edge[0], edge[1])) return scan(index + 1, used + 1, cost + edge[2], n, edges, dsu);\n    return scan(index + 1, used, cost, n, edges, dsu);\n  }\n\n  private static class DSU {\n    int[] parent;\n    DSU(int n) { parent = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }\n    boolean union(int a, int b) { int pa = find(a), pb = find(b); if (pa == pb) return false; parent[pa] = pb; return true; }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    Arrays.sort(edges, Comparator.comparingInt(a -> a[2]));\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    for (int[] edge : edges) {\n      if (dsu.union(edge[0], edge[1])) {\n        cost += edge[2];\n        if (++used == n - 1) return cost;\n      }\n    }\n    return n == 1 ? 0 : -1;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    Arrays.sort(edges, Comparator.comparingInt(a -> a[2]));\n    DSU dsu = new DSU(n);\n    int cost = 0, used = 0;\n    for (int[] edge : edges) {\n      if (dsu.union(edge[0], edge[1])) {\n        cost += edge[2];\n        if (++used == n - 1) return cost;\n      }\n    }\n    return n == 1 ? 0 : -1;\n  }\n\n  private static class DSU {\n    int[] parent;\n    int[] rank;\n    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }\n    int find(int x) { while (x != parent[x]) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }\n    boolean union(int a, int b) {\n      int pa = find(a), pb = find(b);\n      if (pa == pb) return false;\n      if (rank[pa] < rank[pb]) parent[pa] = pb;\n      else if (rank[pa] > rank[pb]) parent[pb] = pa;\n      else { parent[pb] = pa; rank[pa]++; }\n      return true;\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Spanning Tree Prim",
      "difficulty": "Medium",
      "subpattern": "Prim MST implementation",
      "question": "Given n nodes and undirected weighted edges, return the MST weight using Prim-style frontier expansion, or -1 if disconnected.",
      "trigger": "You grow one connected component by repeatedly choosing the cheapest outgoing edge.",
      "intuition": "A min-heap stores candidate edges crossing from the current tree to outside nodes.",
      "edgeCases": "Disconnected graph, starting node isolated, parallel edges, equal weights, and n = 1.",
      "constraints": "Prim with adjacency heap runs in O(E log V).",
      "source": {
        "label": "Prim MST - CP Algorithms",
        "url": "https://cp-algorithms.com/graph/mst_prim.html"
      },
      "examples": [
        {
          "input": "n=4, edges=[[0,1,1],[1,2,2],[2,3,3],[0,3,10]]",
          "output": "6",
          "explanation": "The frontier picks weights 1, 2, and 3."
        },
        {
          "input": "n=3, edges=[[0,1,5]]",
          "output": "-1",
          "explanation": "Node 2 never enters the tree."
        }
      ],
      "bruteForceComplexity": "Time O(VE); Space O(V + E). Repeatedly scan all edges for the cheapest crossing edge.",
      "optimizedComplexity": "Time O(E log V); Space O(V + E). Heap-based Prim tracks frontier edges.",
      "recursiveComplexity": "Time O(VE); Space O(V + recursion depth). Recursive dense Prim adds one node per call.",
      "bruteForceCode": "class Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    if (n == 1) return 0;\n    boolean[] used = new boolean[n];\n    used[0] = true;\n    int count = 1, cost = 0;\n    while (count < n) {\n      int best = -1;\n      for (int i = 0; i < edges.length; i++) {\n        boolean crosses = used[edges[i][0]] ^ used[edges[i][1]];\n        if (crosses && (best == -1 || edges[i][2] < edges[best][2])) best = i;\n      }\n      if (best == -1) return -1;\n      used[edges[best][0]] = true;\n      used[edges[best][1]] = true;\n      cost += edges[best][2];\n      count++;\n    }\n    return cost;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    if (n == 1) return 0;\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); graph[edge[1]].add(new int[] {edge[0], edge[2]}); }\n    boolean[] used = new boolean[n];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {0, 0});\n    int cost = 0, count = 0;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0];\n      if (used[node]) continue;\n      used[node] = true;\n      cost += current[1];\n      count++;\n      for (int[] edge : graph[node]) if (!used[edge[0]]) heap.offer(edge);\n    }\n    return count == n ? cost : -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    if (n == 1) return 0;\n    boolean[] used = new boolean[n];\n    used[0] = true;\n    return addNext(1, 0, used, edges, n);\n  }\n\n  private int addNext(int count, int cost, boolean[] used, int[][] edges, int n) {\n    if (count == n) return cost;\n    int best = -1;\n    for (int i = 0; i < edges.length; i++) {\n      if ((used[edges[i][0]] ^ used[edges[i][1]]) && (best == -1 || edges[i][2] < edges[best][2])) best = i;\n    }\n    if (best == -1) return -1;\n    used[edges[best][0]] = true;\n    used[edges[best][1]] = true;\n    return addNext(count + 1, cost + edges[best][2], used, edges, n);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    if (n == 1) return 0;\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); graph[edge[1]].add(new int[] {edge[0], edge[2]}); }\n    boolean[] used = new boolean[n];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {0, 0});\n    int cost = 0, count = 0;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0];\n      if (used[node]) continue;\n      used[node] = true;\n      cost += current[1];\n      count++;\n      for (int[] edge : graph[node]) if (!used[edge[0]]) heap.offer(edge);\n    }\n    return count == n ? cost : -1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minimumSpanningTree(int n, int[][] edges) {\n    if (n == 1) return 0;\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); graph[edge[1]].add(new int[] {edge[0], edge[2]}); }\n    boolean[] used = new boolean[n];\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    heap.offer(new int[] {0, 0});\n    int cost = 0, count = 0;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int node = current[0];\n      if (used[node]) continue;\n      used[node] = true;\n      cost += current[1];\n      count++;\n      for (int[] edge : graph[node]) if (!used[edge[0]]) heap.offer(edge);\n    }\n    return count == n ? cost : -1;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Obstacle Removal to Reach Corner",
      "difficulty": "Hard",
      "subpattern": "0-1 BFS on grids",
      "question": "Given a grid of 0 empty cells and 1 obstacles, return the minimum obstacles to remove to travel from top-left to bottom-right.",
      "trigger": "Edges have only weight 0 or 1, so a deque can replace a heap.",
      "intuition": "Push zero-cost moves to the front and one-cost moves to the back to process states in nondecreasing cost.",
      "edgeCases": "Start or destination obstacle, all zeros, all ones, one cell grid, and multiple equal-cost routes.",
      "constraints": "Grid can be large; O(mn) 0-1 BFS is better than heap Dijkstra.",
      "source": {
        "label": "LeetCode 2290 - Minimum Obstacle Removal to Reach Corner",
        "url": "https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/"
      },
      "examples": [
        {
          "input": "grid=[[0,1,1],[1,1,0],[1,1,0]]",
          "output": "2",
          "explanation": "Remove two obstacles along the best route."
        },
        {
          "input": "grid=[[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]",
          "output": "0",
          "explanation": "A zero-obstacle path exists."
        }
      ],
      "bruteForceComplexity": "Time exponential in cells; Space O(mn). DFS explores simple paths with pruning.",
      "optimizedComplexity": "Time O(mn); Space O(mn). 0-1 BFS processes each directed grid edge a constant number of times.",
      "recursiveComplexity": "Time O(mn * improvements); Space O(mn). Recursive relaxation prunes non-improving costs.",
      "bruteForceCode": "class Solution {\n  private int best;\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumObstacles(int[][] grid) {\n    best = Integer.MAX_VALUE;\n    dfs(0, 0, 0, grid, new boolean[grid.length][grid[0].length]);\n    return best;\n  }\n\n  private void dfs(int row, int col, int cost, int[][] grid, boolean[][] seen) {\n    if (cost >= best) return;\n    int rows = grid.length, cols = grid[0].length;\n    if (row == rows - 1 && col == cols - 1) { best = cost; return; }\n    seen[row][col] = true;\n    for (int[] dir : dirs) {\n      int nr = row + dir[0], nc = col + dir[1];\n      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || seen[nr][nc]) continue;\n      dfs(nr, nc, cost + grid[nr][nc], grid, seen);\n    }\n    seen[row][col] = false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumObstacles(int[][] grid) {\n    int rows = grid.length, cols = grid[0].length;\n    int[][] dist = new int[rows][cols];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    Deque<int[]> deque = new ArrayDeque<>();\n    dist[0][0] = 0;\n    deque.offerFirst(new int[] {0, 0});\n    while (!deque.isEmpty()) {\n      int[] current = deque.pollFirst();\n      int row = current[0], col = current[1];\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        int next = dist[row][col] + grid[nr][nc];\n        if (next < dist[nr][nc]) {\n          dist[nr][nc] = next;\n          if (grid[nr][nc] == 0) deque.offerFirst(new int[] {nr, nc});\n          else deque.offerLast(new int[] {nr, nc});\n        }\n      }\n    }\n    return dist[rows - 1][cols - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n  private int[][] dist;\n\n  public int minimumObstacles(int[][] grid) {\n    dist = new int[grid.length][grid[0].length];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    relax(0, 0, 0, grid);\n    return dist[grid.length - 1][grid[0].length - 1];\n  }\n\n  private void relax(int row, int col, int cost, int[][] grid) {\n    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || cost >= dist[row][col]) return;\n    dist[row][col] = cost;\n    for (int[] dir : dirs) {\n      int nr = row + dir[0], nc = col + dir[1];\n      if (nr >= 0 && nc >= 0 && nr < grid.length && nc < grid[0].length) relax(nr, nc, cost + grid[nr][nc], grid);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumObstacles(int[][] grid) {\n    int rows = grid.length, cols = grid[0].length;\n    int[][] dist = new int[rows][cols];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    Deque<int[]> deque = new ArrayDeque<>();\n    dist[0][0] = 0;\n    deque.offerFirst(new int[] {0, 0});\n    while (!deque.isEmpty()) {\n      int[] current = deque.pollFirst();\n      int row = current[0], col = current[1];\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        int next = dist[row][col] + grid[nr][nc];\n        if (next < dist[nr][nc]) {\n          dist[nr][nc] = next;\n          if (grid[nr][nc] == 0) deque.offerFirst(new int[] {nr, nc});\n          else deque.offerLast(new int[] {nr, nc});\n        }\n      }\n    }\n    return dist[rows - 1][cols - 1];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public int minimumObstacles(int[][] grid) {\n    int rows = grid.length, cols = grid[0].length;\n    int[][] dist = new int[rows][cols];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    Deque<int[]> deque = new ArrayDeque<>();\n    dist[0][0] = 0;\n    deque.offerFirst(new int[] {0, 0});\n    while (!deque.isEmpty()) {\n      int[] current = deque.pollFirst();\n      int row = current[0], col = current[1];\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;\n        int next = dist[row][col] + grid[nr][nc];\n        if (next < dist[nr][nc]) {\n          dist[nr][nc] = next;\n          if (grid[nr][nc] == 0) deque.offerFirst(new int[] {nr, nc});\n          else deque.offerLast(new int[] {nr, nc});\n        }\n      }\n    }\n    return dist[rows - 1][cols - 1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Shortest Path in Binary Matrix",
      "difficulty": "Medium",
      "subpattern": "A* informed grid search",
      "question": "Given a binary grid, move in 8 directions from top-left to bottom-right through zero cells and return the shortest path length, or -1.",
      "trigger": "Grid shortest path has uniform edge lengths and a geometric target; A* can prioritize cells closer to the destination.",
      "intuition": "BFS is enough for correctness; A* keeps the same distance state but orders expansion by distance plus admissible Chebyshev heuristic.",
      "edgeCases": "Blocked start, blocked destination, one cell grid, diagonal-only route, and no valid route.",
      "constraints": "n <= 100; grid values are 0 or 1.",
      "source": {
        "label": "LeetCode 1091 - Shortest Path in Binary Matrix",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
      },
      "examples": [
        {
          "input": "grid=[[0,1],[1,0]]",
          "output": "2",
          "explanation": "Move diagonally from start to end."
        },
        {
          "input": "grid=[[1,0],[0,0]]",
          "output": "-1",
          "explanation": "The start cell is blocked."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n^2). Standard BFS explores cells by path length.",
      "optimizedComplexity": "Time O(n^2 log n); Space O(n^2). A* uses a priority queue ordered by g + heuristic.",
      "recursiveComplexity": "Time exponential with pruning; Space O(n^2). DFS tries simple paths and prunes by best distance per cell.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    Queue<int[]> queue = new ArrayDeque<>();\n    boolean[][] seen = new boolean[n][n];\n    queue.offer(new int[] {0, 0, 1});\n    seen[0][0] = true;\n    while (!queue.isEmpty()) {\n      int[] current = queue.poll();\n      if (current[0] == n - 1 && current[1] == n - 1) return current[2];\n      for (int[] dir : dirs) {\n        int nr = current[0] + dir[0], nc = current[1] + dir[1];\n        if (nr >= 0 && nc >= 0 && nr < n && nc < n && grid[nr][nc] == 0 && !seen[nr][nc]) {\n          seen[nr][nc] = true;\n          queue.offer(new int[] {nr, nc, current[2] + 1});\n        }\n      }\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    int[][] dist = new int[n][n];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2] + heuristic(a[0], a[1], n)));\n    dist[0][0] = 1;\n    heap.offer(new int[] {0, 0, 1});\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], steps = current[2];\n      if (steps != dist[row][col]) continue;\n      if (row == n - 1 && col == n - 1) return steps;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] == 1) continue;\n        if (steps + 1 < dist[nr][nc]) {\n          dist[nr][nc] = steps + 1;\n          heap.offer(new int[] {nr, nc, steps + 1});\n        }\n      }\n    }\n    return -1;\n  }\n\n  private int heuristic(int row, int col, int n) {\n    return Math.max(n - 1 - row, n - 1 - col);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n  private int best;\n  private int[][] bestAt;\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    best = Integer.MAX_VALUE;\n    bestAt = new int[n][n];\n    for (int[] row : bestAt) Arrays.fill(row, Integer.MAX_VALUE);\n    dfs(0, 0, 1, grid);\n    return best == Integer.MAX_VALUE ? -1 : best;\n  }\n\n  private void dfs(int row, int col, int steps, int[][] grid) {\n    int n = grid.length;\n    if (row < 0 || col < 0 || row >= n || col >= n || grid[row][col] == 1 || steps >= best || steps >= bestAt[row][col]) return;\n    bestAt[row][col] = steps;\n    if (row == n - 1 && col == n - 1) { best = steps; return; }\n    for (int[] dir : dirs) dfs(row + dir[0], col + dir[1], steps + 1, grid);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    int[][] dist = new int[n][n];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2] + heuristic(a[0], a[1], n)));\n    dist[0][0] = 1;\n    heap.offer(new int[] {0, 0, 1});\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], steps = current[2];\n      if (steps != dist[row][col]) continue;\n      if (row == n - 1 && col == n - 1) return steps;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] == 1) continue;\n        if (steps + 1 < dist[nr][nc]) {\n          dist[nr][nc] = steps + 1;\n          heap.offer(new int[] {nr, nc, steps + 1});\n        }\n      }\n    }\n    return -1;\n  }\n\n  private int heuristic(int row, int col, int n) {\n    return Math.max(n - 1 - row, n - 1 - col);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n\n  public int shortestPathBinaryMatrix(int[][] grid) {\n    int n = grid.length;\n    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;\n    int[][] dist = new int[n][n];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[2] + heuristic(a[0], a[1], n)));\n    dist[0][0] = 1;\n    heap.offer(new int[] {0, 0, 1});\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      int row = current[0], col = current[1], steps = current[2];\n      if (steps != dist[row][col]) continue;\n      if (row == n - 1 && col == n - 1) return steps;\n      for (int[] dir : dirs) {\n        int nr = row + dir[0], nc = col + dir[1];\n        if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] == 1) continue;\n        if (steps + 1 < dist[nr][nc]) {\n          dist[nr][nc] = steps + 1;\n          heap.offer(new int[] {nr, nc, steps + 1});\n        }\n      }\n    }\n    return -1;\n  }\n\n  private int heuristic(int row, int col, int n) {\n    return Math.max(n - 1 - row, n - 1 - col);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Word Ladder Bidirectional BFS",
      "difficulty": "Hard",
      "subpattern": "Bidirectional BFS",
      "question": "Given beginWord, endWord, and wordList, return the length of the shortest transformation sequence changing one letter at a time through dictionary words.",
      "trigger": "Unweighted shortest path has huge branching, but both endpoints are known.",
      "intuition": "Expand the smaller frontier from either side to reduce the search space.",
      "edgeCases": "endWord absent, begin equals end, repeated words, one-letter words, and no connecting chain.",
      "constraints": "All words have the same length in the LeetCode problem.",
      "source": {
        "label": "LeetCode 127 - Word Ladder",
        "url": "https://leetcode.com/problems/word-ladder/"
      },
      "examples": [
        {
          "input": "begin=hit, end=cog, words=[hot,dot,dog,lot,log,cog]",
          "output": "5",
          "explanation": "hit->hot->dot->dog->cog."
        },
        {
          "input": "begin=hit, end=cog, words=[hot,dot,dog,lot,log]",
          "output": "0",
          "explanation": "The target word is missing."
        }
      ],
      "bruteForceComplexity": "Time O(N^2L); Space O(N). Build adjacency by comparing every pair and BFS.",
      "optimizedComplexity": "Time O(NL * alphabet); Space O(N). Bidirectional BFS mutates each character position.",
      "recursiveComplexity": "Time O(NL * alphabet); Space O(N). Recursive frontier expansion processes the smaller side.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    List<String> words = new ArrayList<>(wordList);\n    if (!words.contains(beginWord)) words.add(beginWord);\n    int start = words.indexOf(beginWord), end = words.indexOf(endWord);\n    if (end == -1) return 0;\n    List<Integer>[] graph = new ArrayList[words.size()];\n    for (int i = 0; i < words.size(); i++) graph[i] = new ArrayList<>();\n    for (int i = 0; i < words.size(); i++) for (int j = i + 1; j < words.size(); j++) if (oneDiff(words.get(i), words.get(j))) { graph[i].add(j); graph[j].add(i); }\n    Queue<int[]> queue = new ArrayDeque<>();\n    boolean[] seen = new boolean[words.size()];\n    queue.offer(new int[] {start, 1}); seen[start] = true;\n    while (!queue.isEmpty()) {\n      int[] current = queue.poll();\n      if (current[0] == end) return current[1];\n      for (int next : graph[current[0]]) if (!seen[next]) { seen[next] = true; queue.offer(new int[] {next, current[1] + 1}); }\n    }\n    return 0;\n  }\n\n  private boolean oneDiff(String a, String b) {\n    int diff = 0;\n    for (int i = 0; i < a.length(); i++) if (a.charAt(i) != b.charAt(i) && ++diff > 1) return false;\n    return diff == 1;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> dict = new HashSet<>(wordList);\n    if (!dict.contains(endWord)) return 0;\n    Set<String> begin = new HashSet<>(), end = new HashSet<>();\n    begin.add(beginWord);\n    end.add(endWord);\n    int length = 1;\n    while (!begin.isEmpty() && !end.isEmpty()) {\n      if (begin.size() > end.size()) { Set<String> temp = begin; begin = end; end = temp; }\n      Set<String> nextFrontier = new HashSet<>();\n      for (String word : begin) {\n        char[] chars = word.toCharArray();\n        for (int i = 0; i < chars.length; i++) {\n          char original = chars[i];\n          for (char ch = 'a'; ch <= 'z'; ch++) {\n            chars[i] = ch;\n            String next = new String(chars);\n            if (end.contains(next)) return length + 1;\n            if (dict.remove(next)) nextFrontier.add(next);\n          }\n          chars[i] = original;\n        }\n      }\n      begin = nextFrontier;\n      length++;\n    }\n    return 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> dict = new HashSet<>(wordList);\n    if (!dict.contains(endWord)) return 0;\n    Set<String> begin = new HashSet<>(), end = new HashSet<>();\n    begin.add(beginWord);\n    end.add(endWord);\n    return expand(begin, end, dict, 1);\n  }\n\n  private int expand(Set<String> begin, Set<String> end, Set<String> dict, int length) {\n    if (begin.isEmpty()) return 0;\n    if (begin.size() > end.size()) return expand(end, begin, dict, length);\n    Set<String> nextFrontier = new HashSet<>();\n    for (String word : begin) {\n      char[] chars = word.toCharArray();\n      for (int i = 0; i < chars.length; i++) {\n        char original = chars[i];\n        for (char ch = 'a'; ch <= 'z'; ch++) {\n          chars[i] = ch;\n          String next = new String(chars);\n          if (end.contains(next)) return length + 1;\n          if (dict.remove(next)) nextFrontier.add(next);\n        }\n        chars[i] = original;\n      }\n    }\n    return expand(nextFrontier, end, dict, length + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> dict = new HashSet<>(wordList);\n    if (!dict.contains(endWord)) return 0;\n    Set<String> begin = new HashSet<>(), end = new HashSet<>();\n    begin.add(beginWord);\n    end.add(endWord);\n    int length = 1;\n    while (!begin.isEmpty() && !end.isEmpty()) {\n      if (begin.size() > end.size()) { Set<String> temp = begin; begin = end; end = temp; }\n      Set<String> nextFrontier = new HashSet<>();\n      for (String word : begin) {\n        char[] chars = word.toCharArray();\n        for (int i = 0; i < chars.length; i++) {\n          char original = chars[i];\n          for (char ch = 'a'; ch <= 'z'; ch++) {\n            chars[i] = ch;\n            String next = new String(chars);\n            if (end.contains(next)) return length + 1;\n            if (dict.remove(next)) nextFrontier.add(next);\n          }\n          chars[i] = original;\n        }\n      }\n      begin = nextFrontier;\n      length++;\n    }\n    return 0;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    Set<String> dict = new HashSet<>(wordList);\n    if (!dict.contains(endWord)) return 0;\n    Set<String> begin = new HashSet<>(), end = new HashSet<>();\n    begin.add(beginWord);\n    end.add(endWord);\n    int length = 1;\n    while (!begin.isEmpty() && !end.isEmpty()) {\n      if (begin.size() > end.size()) { Set<String> temp = begin; begin = end; end = temp; }\n      Set<String> nextFrontier = new HashSet<>();\n      for (String word : begin) {\n        char[] chars = word.toCharArray();\n        for (int i = 0; i < chars.length; i++) {\n          char original = chars[i];\n          for (char ch = 'a'; ch <= 'z'; ch++) {\n            chars[i] = ch;\n            String next = new String(chars);\n            if (end.contains(next)) return length + 1;\n            if (dict.remove(next)) nextFrontier.add(next);\n          }\n          chars[i] = original;\n        }\n      }\n      begin = nextFrontier;\n      length++;\n    }\n    return 0;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Valid Arrangement of Pairs",
      "difficulty": "Hard",
      "subpattern": "Eulerian trail in directed multigraph",
      "question": "Given directed pairs [start,end], arrange all pairs so each pair end equals the next pair start.",
      "trigger": "Every directed edge must be used exactly once, so the graph needs an Eulerian trail.",
      "intuition": "Choose the start node by outdegree - indegree = 1 when it exists, then run Hierholzer and convert node path to edges.",
      "edgeCases": "Circuit with no special start, duplicate pairs, long chain, branching, and disconnected invalid inputs outside constraints.",
      "constraints": "The LeetCode problem guarantees a valid arrangement exists.",
      "source": {
        "label": "LeetCode 2097 - Valid Arrangement of Pairs",
        "url": "https://leetcode.com/problems/valid-arrangement-of-pairs/"
      },
      "examples": [
        {
          "input": "pairs=[[5,1],[4,5],[11,9],[9,4]]",
          "output": "[[11,9],[9,4],[4,5],[5,1]]",
          "explanation": "The arrangement forms one directed trail."
        },
        {
          "input": "pairs=[[1,3],[3,2],[2,1]]",
          "output": "cycle arrangement",
          "explanation": "Any Eulerian circuit ordering is valid."
        }
      ],
      "bruteForceComplexity": "Time O(E! * E); Space O(E). Backtracking tries pair permutations.",
      "optimizedComplexity": "Time O(E); Space O(E). Hierholzer consumes each directed edge once.",
      "recursiveComplexity": "Time O(E); Space O(E). Recursive Hierholzer builds the node path in postorder.",
      "bruteForceCode": "class Solution {\n  public int[][] validArrangement(int[][] pairs) {\n    boolean[] used = new boolean[pairs.length];\n    int[][] path = new int[pairs.length][2];\n    for (int i = 0; i < pairs.length; i++) {\n      used[i] = true;\n      path[0] = pairs[i];\n      if (backtrack(1, pairs[i][1], pairs, used, path)) return path;\n      used[i] = false;\n    }\n    return path;\n  }\n\n  private boolean backtrack(int index, int needStart, int[][] pairs, boolean[] used, int[][] path) {\n    if (index == pairs.length) return true;\n    for (int i = 0; i < pairs.length; i++) {\n      if (!used[i] && pairs[i][0] == needStart) {\n        used[i] = true;\n        path[index] = pairs[i];\n        if (backtrack(index + 1, pairs[i][1], pairs, used, path)) return true;\n        used[i] = false;\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] validArrangement(int[][] pairs) {\n    Map<Integer, Deque<Integer>> graph = new HashMap<>();\n    Map<Integer, Integer> balance = new HashMap<>();\n    for (int[] pair : pairs) {\n      graph.computeIfAbsent(pair[0], key -> new ArrayDeque<>()).add(pair[1]);\n      balance.put(pair[0], balance.getOrDefault(pair[0], 0) + 1);\n      balance.put(pair[1], balance.getOrDefault(pair[1], 0) - 1);\n    }\n    int start = pairs[0][0];\n    for (Map.Entry<Integer, Integer> entry : balance.entrySet()) if (entry.getValue() == 1) start = entry.getKey();\n    Deque<Integer> stack = new ArrayDeque<>();\n    LinkedList<Integer> nodes = new LinkedList<>();\n    stack.push(start);\n    while (!stack.isEmpty()) {\n      int node = stack.peek();\n      Deque<Integer> next = graph.get(node);\n      if (next != null && !next.isEmpty()) stack.push(next.pollFirst());\n      else nodes.addFirst(stack.pop());\n    }\n    int[][] answer = new int[pairs.length][2];\n    Iterator<Integer> it = nodes.iterator();\n    int prev = it.next(), index = 0;\n    while (it.hasNext()) {\n      int cur = it.next();\n      answer[index++] = new int[] {prev, cur};\n      prev = cur;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private Map<Integer, Deque<Integer>> graph;\n  private LinkedList<Integer> nodes;\n\n  public int[][] validArrangement(int[][] pairs) {\n    graph = new HashMap<>();\n    Map<Integer, Integer> balance = new HashMap<>();\n    for (int[] pair : pairs) {\n      graph.computeIfAbsent(pair[0], key -> new ArrayDeque<>()).add(pair[1]);\n      balance.put(pair[0], balance.getOrDefault(pair[0], 0) + 1);\n      balance.put(pair[1], balance.getOrDefault(pair[1], 0) - 1);\n    }\n    int start = pairs[0][0];\n    for (Map.Entry<Integer, Integer> entry : balance.entrySet()) if (entry.getValue() == 1) start = entry.getKey();\n    nodes = new LinkedList<>();\n    dfs(start);\n    int[][] answer = new int[pairs.length][2];\n    for (int i = 0; i < pairs.length; i++) answer[i] = new int[] {nodes.get(i), nodes.get(i + 1)};\n    return answer;\n  }\n\n  private void dfs(int node) {\n    Deque<Integer> next = graph.get(node);\n    while (next != null && !next.isEmpty()) dfs(next.pollFirst());\n    nodes.addFirst(node);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] validArrangement(int[][] pairs) {\n    Map<Integer, Deque<Integer>> graph = new HashMap<>();\n    Map<Integer, Integer> balance = new HashMap<>();\n    for (int[] pair : pairs) {\n      graph.computeIfAbsent(pair[0], key -> new ArrayDeque<>()).add(pair[1]);\n      balance.put(pair[0], balance.getOrDefault(pair[0], 0) + 1);\n      balance.put(pair[1], balance.getOrDefault(pair[1], 0) - 1);\n    }\n    int start = pairs[0][0];\n    for (Map.Entry<Integer, Integer> entry : balance.entrySet()) if (entry.getValue() == 1) start = entry.getKey();\n    Deque<Integer> stack = new ArrayDeque<>();\n    LinkedList<Integer> nodes = new LinkedList<>();\n    stack.push(start);\n    while (!stack.isEmpty()) {\n      int node = stack.peek();\n      Deque<Integer> next = graph.get(node);\n      if (next != null && !next.isEmpty()) stack.push(next.pollFirst());\n      else nodes.addFirst(stack.pop());\n    }\n    int[][] answer = new int[pairs.length][2];\n    Iterator<Integer> it = nodes.iterator();\n    int prev = it.next(), index = 0;\n    while (it.hasNext()) {\n      int cur = it.next();\n      answer[index++] = new int[] {prev, cur};\n      prev = cur;\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] validArrangement(int[][] pairs) {\n    Map<Integer, Deque<Integer>> graph = new HashMap<>();\n    Map<Integer, Integer> balance = new HashMap<>();\n    for (int[] pair : pairs) {\n      graph.computeIfAbsent(pair[0], key -> new ArrayDeque<>()).add(pair[1]);\n      balance.put(pair[0], balance.getOrDefault(pair[0], 0) + 1);\n      balance.put(pair[1], balance.getOrDefault(pair[1], 0) - 1);\n    }\n    int start = pairs[0][0];\n    for (Map.Entry<Integer, Integer> entry : balance.entrySet()) if (entry.getValue() == 1) start = entry.getKey();\n    Deque<Integer> stack = new ArrayDeque<>();\n    LinkedList<Integer> nodes = new LinkedList<>();\n    stack.push(start);\n    while (!stack.isEmpty()) {\n      int node = stack.peek();\n      Deque<Integer> next = graph.get(node);\n      if (next != null && !next.isEmpty()) stack.push(next.pollFirst());\n      else nodes.addFirst(stack.pop());\n    }\n    int[][] answer = new int[pairs.length][2];\n    Iterator<Integer> it = nodes.iterator();\n    int prev = it.next(), index = 0;\n    while (it.hasNext()) {\n      int cur = it.next();\n      answer[index++] = new int[] {prev, cur};\n      prev = cur;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Bipartite Matching",
      "difficulty": "Hard",
      "subpattern": "Bipartite matching by augmenting paths",
      "question": "Given leftSize, rightSize, and allowed edges [left,right], return the maximum number of matched left-right pairs.",
      "trigger": "Each left node can match at most one right node and vice versa, and augmenting paths can improve a partial matching.",
      "intuition": "Try to assign each left node; if a desired right node is occupied, recursively reassign its current owner.",
      "edgeCases": "No edges, more left than right, duplicate edges, isolated nodes, and a perfect matching.",
      "constraints": "Use visited-right markers per augment attempt to avoid cycles.",
      "source": {
        "label": "Bipartite Matching - CP Algorithms",
        "url": "https://cp-algorithms.com/graph/kuhn_maximum_bipartite_matching.html"
      },
      "examples": [
        {
          "input": "left=3, right=3, edges=[[0,0],[0,1],[1,1],[2,2]]",
          "output": "3",
          "explanation": "All left nodes can be matched."
        },
        {
          "input": "left=2, right=1, edges=[[0,0],[1,0]]",
          "output": "1",
          "explanation": "Only one right node exists."
        }
      ],
      "bruteForceComplexity": "Time O(R^L * L); Space O(R). Try every possible right assignment for each left node.",
      "optimizedComplexity": "Time O(VE); Space O(V + E). Kuhn augmenting paths improve one left node at a time.",
      "recursiveComplexity": "Time O(VE); Space O(V + E). Recursive DFS searches augmenting paths.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maximumMatching(int leftSize, int rightSize, int[][] edges) {\n    boolean[][] allowed = new boolean[leftSize][rightSize];\n    for (int[] edge : edges) allowed[edge[0]][edge[1]] = true;\n    return search(0, allowed, new boolean[rightSize]);\n  }\n\n  private int search(int left, boolean[][] allowed, boolean[] usedRight) {\n    if (left == allowed.length) return 0;\n    int best = search(left + 1, allowed, usedRight);\n    for (int right = 0; right < usedRight.length; right++) {\n      if (allowed[left][right] && !usedRight[right]) {\n        usedRight[right] = true;\n        best = Math.max(best, 1 + search(left + 1, allowed, usedRight));\n        usedRight[right] = false;\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumMatching(int leftSize, int rightSize, int[][] edges) {\n    List<Integer>[] graph = new ArrayList[leftSize];\n    for (int i = 0; i < leftSize; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    int[] matchRight = new int[rightSize];\n    Arrays.fill(matchRight, -1);\n    int matches = 0;\n    for (int left = 0; left < leftSize; left++) {\n      if (augment(left, graph, matchRight, new boolean[rightSize])) matches++;\n    }\n    return matches;\n  }\n\n  private boolean augment(int left, List<Integer>[] graph, int[] matchRight, boolean[] seenRight) {\n    for (int right : graph[left]) {\n      if (seenRight[right]) continue;\n      seenRight[right] = true;\n      if (matchRight[right] == -1 || augment(matchRight[right], graph, matchRight, seenRight)) {\n        matchRight[right] = left;\n        return true;\n      }\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] matchRight;\n\n  public int maximumMatching(int leftSize, int rightSize, int[][] edges) {\n    graph = new ArrayList[leftSize];\n    for (int i = 0; i < leftSize; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    matchRight = new int[rightSize];\n    Arrays.fill(matchRight, -1);\n    return processLeft(0, leftSize, 0);\n  }\n\n  private int processLeft(int left, int leftSize, int matches) {\n    if (left == leftSize) return matches;\n    return processLeft(left + 1, leftSize, matches + (augment(left, new boolean[matchRight.length]) ? 1 : 0));\n  }\n\n  private boolean augment(int left, boolean[] seenRight) {\n    for (int right : graph[left]) {\n      if (seenRight[right]) continue;\n      seenRight[right] = true;\n      if (matchRight[right] == -1 || augment(matchRight[right], seenRight)) {\n        matchRight[right] = left;\n        return true;\n      }\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumMatching(int leftSize, int rightSize, int[][] edges) {\n    List<Integer>[] graph = new ArrayList[leftSize];\n    for (int i = 0; i < leftSize; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    int[] matchRight = new int[rightSize];\n    Arrays.fill(matchRight, -1);\n    int matches = 0;\n    for (int left = 0; left < leftSize; left++) {\n      if (augment(left, graph, matchRight, new boolean[rightSize])) matches++;\n    }\n    return matches;\n  }\n\n  private boolean augment(int left, List<Integer>[] graph, int[] matchRight, boolean[] seenRight) {\n    for (int right : graph[left]) {\n      if (seenRight[right]) continue;\n      seenRight[right] = true;\n      if (matchRight[right] == -1 || augment(matchRight[right], graph, matchRight, seenRight)) {\n        matchRight[right] = left;\n        return true;\n      }\n    }\n    return false;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumMatching(int leftSize, int rightSize, int[][] edges) {\n    List<Integer>[] graph = new ArrayList[leftSize];\n    for (int i = 0; i < leftSize; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(edge[1]);\n    int[] matchRight = new int[rightSize];\n    Arrays.fill(matchRight, -1);\n    int matches = 0;\n    for (int left = 0; left < leftSize; left++) {\n      if (augment(left, graph, matchRight, new boolean[rightSize])) matches++;\n    }\n    return matches;\n  }\n\n  private boolean augment(int left, List<Integer>[] graph, int[] matchRight, boolean[] seenRight) {\n    for (int right : graph[left]) {\n      if (seenRight[right]) continue;\n      seenRight[right] = true;\n      if (matchRight[right] == -1 || augment(matchRight[right], graph, matchRight, seenRight)) {\n        matchRight[right] = left;\n        return true;\n      }\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Cost Maximum Flow Intro",
      "difficulty": "Hard",
      "subpattern": "Minimum-cost maximum-flow",
      "question": "Given directed edges [u,v,capacity,cost], source, sink, and requiredFlow, return the minimum cost to send that much flow or -1 if impossible.",
      "trigger": "Need both capacity feasibility and minimum total cost among feasible augmenting flows.",
      "intuition": "Repeatedly find a cheapest residual path, send flow through it, and update reverse edges.",
      "edgeCases": "Insufficient capacity, negative reverse edges, zero capacity edges, multiple parallel edges, and requiredFlow = 0.",
      "constraints": "This intro version uses SPFA shortest paths over residual edges.",
      "source": {
        "label": "Min Cost Flow - CP Algorithms",
        "url": "https://cp-algorithms.com/graph/min_cost_flow.html"
      },
      "examples": [
        {
          "input": "n=4, edges=[[0,1,2,1],[0,2,1,5],[1,2,1,1],[1,3,1,3],[2,3,2,1]], source=0, sink=3, flow=2",
          "output": "7",
          "explanation": "The two cheapest augmenting paths cost 3 and 4."
        },
        {
          "input": "same graph, flow=4",
          "output": "-1",
          "explanation": "Only three units can reach the sink."
        }
      ],
      "bruteForceComplexity": "Time O(F * V * E) with unit augmentations; Space O(V + E).",
      "optimizedComplexity": "Time O(A * V * E) where A is augment count; Space O(V + E). Each augmentation sends bottleneck flow.",
      "recursiveComplexity": "Time O(A * V * E); Space O(V + E). Recursive path application updates residual edges.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minCostMaxFlow(int n, int[][] edges, int source, int sink, int requiredFlow) {\n    Flow flow = new Flow(n);\n    for (int[] edge : edges) flow.addEdge(edge[0], edge[1], edge[2], edge[3]);\n    int cost = 0, sent = 0;\n    while (sent < requiredFlow && flow.shortest(source, sink)) {\n      flow.apply(source, sink, 1);\n      cost += flow.dist[sink];\n      sent++;\n    }\n    return sent == requiredFlow ? cost : -1;\n  }\n\n  private static class Flow {\n    List<Edge>[] graph; int[] dist, pv, pe;\n    Flow(int n) { graph = new ArrayList[n]; for (int i = 0; i < n; i++) graph[i] = new ArrayList<>(); dist = new int[n]; pv = new int[n]; pe = new int[n]; }\n    void addEdge(int u, int v, int cap, int cost) { Edge a = new Edge(v, graph[v].size(), cap, cost); Edge b = new Edge(u, graph[u].size(), 0, -cost); graph[u].add(a); graph[v].add(b); }\n    boolean shortest(int s, int t) { Arrays.fill(dist, 1_000_000_000); boolean[] in = new boolean[graph.length]; Queue<Integer> q = new ArrayDeque<>(); dist[s] = 0; q.offer(s); in[s] = true; while (!q.isEmpty()) { int u = q.poll(); in[u] = false; for (int i = 0; i < graph[u].size(); i++) { Edge e = graph[u].get(i); if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) { dist[e.to] = dist[u] + e.cost; pv[e.to] = u; pe[e.to] = i; if (!in[e.to]) { in[e.to] = true; q.offer(e.to); } } } } return dist[t] < 1_000_000_000; }\n    void apply(int s, int v, int add) { while (v != s) { Edge e = graph[pv[v]].get(pe[v]); e.cap -= add; graph[v].get(e.rev).cap += add; v = pv[v]; } }\n  }\n  private static class Edge { int to, rev, cap, cost; Edge(int to, int rev, int cap, int cost) { this.to = to; this.rev = rev; this.cap = cap; this.cost = cost; } }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minCostMaxFlow(int n, int[][] edges, int source, int sink, int requiredFlow) {\n    Flow flow = new Flow(n);\n    for (int[] edge : edges) flow.addEdge(edge[0], edge[1], edge[2], edge[3]);\n    int cost = 0, sent = 0;\n    while (sent < requiredFlow && flow.shortest(source, sink)) {\n      int add = requiredFlow - sent;\n      for (int v = sink; v != source; v = flow.prevNode[v]) add = Math.min(add, flow.graph[flow.prevNode[v]].get(flow.prevEdge[v]).cap);\n      for (int v = sink; v != source; v = flow.prevNode[v]) {\n        Edge e = flow.graph[flow.prevNode[v]].get(flow.prevEdge[v]);\n        e.cap -= add;\n        flow.graph[v].get(e.rev).cap += add;\n      }\n      sent += add;\n      cost += add * flow.dist[sink];\n    }\n    return sent == requiredFlow ? cost : -1;\n  }\n\n  private static class Flow {\n    List<Edge>[] graph; int[] dist, prevNode, prevEdge;\n    Flow(int n) { graph = new ArrayList[n]; for (int i = 0; i < n; i++) graph[i] = new ArrayList<>(); dist = new int[n]; prevNode = new int[n]; prevEdge = new int[n]; }\n    void addEdge(int u, int v, int cap, int cost) { Edge a = new Edge(v, graph[v].size(), cap, cost); Edge b = new Edge(u, graph[u].size(), 0, -cost); graph[u].add(a); graph[v].add(b); }\n    boolean shortest(int s, int t) { Arrays.fill(dist, 1_000_000_000); boolean[] in = new boolean[graph.length]; Queue<Integer> q = new ArrayDeque<>(); dist[s] = 0; q.offer(s); in[s] = true; while (!q.isEmpty()) { int u = q.poll(); in[u] = false; for (int i = 0; i < graph[u].size(); i++) { Edge e = graph[u].get(i); if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) { dist[e.to] = dist[u] + e.cost; prevNode[e.to] = u; prevEdge[e.to] = i; if (!in[e.to]) { in[e.to] = true; q.offer(e.to); } } } } return dist[t] < 1_000_000_000; }\n  }\n  private static class Edge { int to, rev, cap, cost; Edge(int to, int rev, int cap, int cost) { this.to = to; this.rev = rev; this.cap = cap; this.cost = cost; } }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Edge>[] graph;\n  private int[] dist, prevNode, prevEdge;\n\n  public int minCostMaxFlow(int n, int[][] edges, int source, int sink, int requiredFlow) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) addEdge(edge[0], edge[1], edge[2], edge[3]);\n    dist = new int[n]; prevNode = new int[n]; prevEdge = new int[n];\n    int sent = 0, cost = 0;\n    while (sent < requiredFlow && shortest(source, sink)) {\n      int add = bottleneck(source, sink, requiredFlow - sent);\n      apply(source, sink, add);\n      sent += add;\n      cost += add * dist[sink];\n    }\n    return sent == requiredFlow ? cost : -1;\n  }\n\n  private int bottleneck(int source, int node, int current) {\n    if (node == source) return current;\n    Edge e = graph[prevNode[node]].get(prevEdge[node]);\n    return bottleneck(source, prevNode[node], Math.min(current, e.cap));\n  }\n\n  private void apply(int source, int node, int add) {\n    if (node == source) return;\n    Edge e = graph[prevNode[node]].get(prevEdge[node]);\n    e.cap -= add;\n    graph[node].get(e.rev).cap += add;\n    apply(source, prevNode[node], add);\n  }\n\n  private boolean shortest(int s, int t) { Arrays.fill(dist, 1_000_000_000); boolean[] in = new boolean[graph.length]; Queue<Integer> q = new ArrayDeque<>(); dist[s] = 0; q.offer(s); in[s] = true; while (!q.isEmpty()) { int u = q.poll(); in[u] = false; for (int i = 0; i < graph[u].size(); i++) { Edge e = graph[u].get(i); if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) { dist[e.to] = dist[u] + e.cost; prevNode[e.to] = u; prevEdge[e.to] = i; if (!in[e.to]) { in[e.to] = true; q.offer(e.to); } } } } return dist[t] < 1_000_000_000; }\n  private void addEdge(int u, int v, int cap, int cost) { Edge a = new Edge(v, graph[v].size(), cap, cost); Edge b = new Edge(u, graph[u].size(), 0, -cost); graph[u].add(a); graph[v].add(b); }\n  private static class Edge { int to, rev, cap, cost; Edge(int to, int rev, int cap, int cost) { this.to = to; this.rev = rev; this.cap = cap; this.cost = cost; } }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minCostMaxFlow(int n, int[][] edges, int source, int sink, int requiredFlow) {\n    Flow flow = new Flow(n);\n    for (int[] edge : edges) flow.addEdge(edge[0], edge[1], edge[2], edge[3]);\n    int cost = 0, sent = 0;\n    while (sent < requiredFlow && flow.shortest(source, sink)) {\n      int add = requiredFlow - sent;\n      for (int v = sink; v != source; v = flow.prevNode[v]) add = Math.min(add, flow.graph[flow.prevNode[v]].get(flow.prevEdge[v]).cap);\n      for (int v = sink; v != source; v = flow.prevNode[v]) {\n        Edge e = flow.graph[flow.prevNode[v]].get(flow.prevEdge[v]);\n        e.cap -= add;\n        flow.graph[v].get(e.rev).cap += add;\n      }\n      sent += add;\n      cost += add * flow.dist[sink];\n    }\n    return sent == requiredFlow ? cost : -1;\n  }\n\n  private static class Flow {\n    List<Edge>[] graph; int[] dist, prevNode, prevEdge;\n    Flow(int n) { graph = new ArrayList[n]; for (int i = 0; i < n; i++) graph[i] = new ArrayList<>(); dist = new int[n]; prevNode = new int[n]; prevEdge = new int[n]; }\n    void addEdge(int u, int v, int cap, int cost) { Edge a = new Edge(v, graph[v].size(), cap, cost); Edge b = new Edge(u, graph[u].size(), 0, -cost); graph[u].add(a); graph[v].add(b); }\n    boolean shortest(int s, int t) { Arrays.fill(dist, 1_000_000_000); boolean[] in = new boolean[graph.length]; Queue<Integer> q = new ArrayDeque<>(); dist[s] = 0; q.offer(s); in[s] = true; while (!q.isEmpty()) { int u = q.poll(); in[u] = false; for (int i = 0; i < graph[u].size(); i++) { Edge e = graph[u].get(i); if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) { dist[e.to] = dist[u] + e.cost; prevNode[e.to] = u; prevEdge[e.to] = i; if (!in[e.to]) { in[e.to] = true; q.offer(e.to); } } } } return dist[t] < 1_000_000_000; }\n  }\n  private static class Edge { int to, rev, cap, cost; Edge(int to, int rev, int cap, int cost) { this.to = to; this.rev = rev; this.cap = cap; this.cost = cost; } }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minCostMaxFlow(int n, int[][] edges, int source, int sink, int requiredFlow) {\n    Flow flow = new Flow(n);\n    for (int[] edge : edges) flow.addEdge(edge[0], edge[1], edge[2], edge[3]);\n    int cost = 0, sent = 0;\n    while (sent < requiredFlow && flow.shortest(source, sink)) {\n      int add = requiredFlow - sent;\n      for (int v = sink; v != source; v = flow.prevNode[v]) add = Math.min(add, flow.graph[flow.prevNode[v]].get(flow.prevEdge[v]).cap);\n      for (int v = sink; v != source; v = flow.prevNode[v]) {\n        Edge e = flow.graph[flow.prevNode[v]].get(flow.prevEdge[v]);\n        e.cap -= add;\n        flow.graph[v].get(e.rev).cap += add;\n      }\n      sent += add;\n      cost += add * flow.dist[sink];\n    }\n    return sent == requiredFlow ? cost : -1;\n  }\n\n  private static class Flow {\n    List<Edge>[] graph; int[] dist, prevNode, prevEdge;\n    Flow(int n) { graph = new ArrayList[n]; for (int i = 0; i < n; i++) graph[i] = new ArrayList<>(); dist = new int[n]; prevNode = new int[n]; prevEdge = new int[n]; }\n    void addEdge(int u, int v, int cap, int cost) { Edge a = new Edge(v, graph[v].size(), cap, cost); Edge b = new Edge(u, graph[u].size(), 0, -cost); graph[u].add(a); graph[v].add(b); }\n    boolean shortest(int s, int t) { Arrays.fill(dist, 1_000_000_000); boolean[] in = new boolean[graph.length]; Queue<Integer> q = new ArrayDeque<>(); dist[s] = 0; q.offer(s); in[s] = true; while (!q.isEmpty()) { int u = q.poll(); in[u] = false; for (int i = 0; i < graph[u].size(); i++) { Edge e = graph[u].get(i); if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) { dist[e.to] = dist[u] + e.cost; prevNode[e.to] = u; prevEdge[e.to] = i; if (!in[e.to]) { in[e.to] = true; q.offer(e.to); } } } } return dist[t] < 1_000_000_000; }\n  }\n  private static class Edge { int to, rev, cap, cost; Edge(int to, int rev, int cap, int cost) { this.to = to; this.rev = rev; this.cap = cap; this.cost = cost; } }\n}"
    },
    {
      "group": "more-practice",
      "name": "Detect Negative Cycle",
      "difficulty": "Hard",
      "subpattern": "Bellman-Ford negative cycle detection",
      "question": "Given n nodes and directed weighted edges [u,v,w], return true if any negative-weight cycle exists.",
      "trigger": "Negative weights invalidate Dijkstra and require repeated relaxation to detect cycles.",
      "intuition": "If any edge can still relax after n-1 rounds, a negative cycle is reachable from the initialized super-source.",
      "edgeCases": "Disconnected negative cycle, zero-weight cycle, negative edge without cycle, self-loop with negative weight, and no edges.",
      "constraints": "Initialize all distances to 0 to detect cycles in any component.",
      "source": {
        "label": "Bellman-Ford Negative Cycle - CP Algorithms",
        "url": "https://cp-algorithms.com/graph/bellman_ford.html"
      },
      "examples": [
        {
          "input": "n=3, edges=[[0,1,1],[1,2,-1],[2,0,-1]]",
          "output": "true",
          "explanation": "The cycle has total weight -1."
        },
        {
          "input": "n=3, edges=[[0,1,2],[1,2,3]]",
          "output": "false",
          "explanation": "No cycle exists."
        }
      ],
      "bruteForceComplexity": "Time O(VE); Space O(V). Bellman-Ford checks for relaxation after n rounds.",
      "optimizedComplexity": "Time O(VE) worst case with early exit; Space O(V). Stop if a round has no changes.",
      "recursiveComplexity": "Time O(VE); Space O(V + recursion depth). Recursive rounds perform relaxation passes.",
      "bruteForceCode": "class Solution {\n  public boolean hasNegativeCycle(int n, int[][] edges) {\n    long[] dist = new long[n];\n    for (int round = 0; round < n; round++) {\n      boolean changed = false;\n      for (int[] edge : edges) {\n        if (dist[edge[0]] + edge[2] < dist[edge[1]]) {\n          dist[edge[1]] = dist[edge[0]] + edge[2];\n          changed = true;\n        }\n      }\n      if (round == n - 1 && changed) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean hasNegativeCycle(int n, int[][] edges) {\n    long[] dist = new long[n];\n    for (int round = 0; round < n; round++) {\n      boolean changed = false;\n      for (int[] edge : edges) {\n        long next = dist[edge[0]] + edge[2];\n        if (next < dist[edge[1]]) {\n          dist[edge[1]] = next;\n          changed = true;\n        }\n      }\n      if (!changed) return false;\n      if (round == n - 1) return true;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean hasNegativeCycle(int n, int[][] edges) {\n    return relaxRound(0, n, edges, new long[n]);\n  }\n\n  private boolean relaxRound(int round, int n, int[][] edges, long[] dist) {\n    if (round == n) return false;\n    boolean changed = relaxEdges(0, edges, dist);\n    if (!changed) return false;\n    if (round == n - 1) return true;\n    return relaxRound(round + 1, n, edges, dist);\n  }\n\n  private boolean relaxEdges(int index, int[][] edges, long[] dist) {\n    if (index == edges.length) return false;\n    int[] edge = edges[index];\n    boolean changed = false;\n    if (dist[edge[0]] + edge[2] < dist[edge[1]]) {\n      dist[edge[1]] = dist[edge[0]] + edge[2];\n      changed = true;\n    }\n    return relaxEdges(index + 1, edges, dist) || changed;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean hasNegativeCycle(int n, int[][] edges) {\n    long[] dist = new long[n];\n    for (int round = 0; round < n; round++) {\n      boolean changed = false;\n      for (int[] edge : edges) {\n        long next = dist[edge[0]] + edge[2];\n        if (next < dist[edge[1]]) {\n          dist[edge[1]] = next;\n          changed = true;\n        }\n      }\n      if (!changed) return false;\n      if (round == n - 1) return true;\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean hasNegativeCycle(int n, int[][] edges) {\n    long[] dist = new long[n];\n    for (int round = 0; round < n; round++) {\n      boolean changed = false;\n      for (int[] edge : edges) {\n        long next = dist[edge[0]] + edge[2];\n        if (next < dist[edge[1]]) {\n          dist[edge[1]] = next;\n          changed = true;\n        }\n      }\n      if (!changed) return false;\n      if (round == n - 1) return true;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Longest Path in DAG",
      "difficulty": "Medium",
      "subpattern": "Longest path in DAG",
      "question": "Given a weighted directed acyclic graph and source, return the maximum distance from source to any reachable node.",
      "trigger": "General longest path is hard, but DAG topological order makes every edge relax once.",
      "intuition": "Process nodes after all predecessors; relaxing max distances is safe because there are no cycles.",
      "edgeCases": "Unreachable nodes, negative weights in a DAG, source with no outgoing edges, multiple sources in graph, and n = 1.",
      "constraints": "Input must be a DAG; nodes are labeled 0..n-1.",
      "source": {
        "label": "Longest Path in DAG - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/find-longest-path-directed-acyclic-graph/"
      },
      "examples": [
        {
          "input": "n=6, edges=[[0,1,5],[0,2,3],[1,3,6],[1,2,2],[2,4,4],[2,5,2],[2,3,7],[3,5,1],[3,4,-1],[4,5,-2]], source=1",
          "output": "10",
          "explanation": "Path 1->2->3 has weight 9 and 1->2->3->5 has 10."
        },
        {
          "input": "n=3, edges=[[0,1,2]], source=2",
          "output": "0",
          "explanation": "Only the source is reachable."
        }
      ],
      "bruteForceComplexity": "Time exponential in paths; Space O(V + E). DFS enumerates all DAG paths from source.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Topological order relaxes every edge once.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Memoized DFS returns best suffix path from each node.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private int best;\n\n  public int longestPath(int n, int[][] edges, int source) {\n    List<int[]>[] graph = build(n, edges);\n    best = 0;\n    dfs(source, 0, graph);\n    return best;\n  }\n\n  private void dfs(int node, int distance, List<int[]>[] graph) {\n    best = Math.max(best, distance);\n    for (int[] edge : graph[node]) dfs(edge[0], distance + edge[1], graph);\n  }\n\n  private List<int[]>[] build(int n, int[][] edges) {\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n    return graph;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int longestPath(int n, int[][] edges, int source) {\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[n];\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); indegree[edge[1]]++; }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int node = 0; node < n; node++) if (indegree[node] == 0) queue.offer(node);\n    int[] dist = new int[n];\n    Arrays.fill(dist, Integer.MIN_VALUE / 4);\n    dist[source] = 0;\n    int answer = 0;\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      if (dist[node] > Integer.MIN_VALUE / 8) answer = Math.max(answer, dist[node]);\n      for (int[] edge : graph[node]) {\n        if (dist[node] > Integer.MIN_VALUE / 8) dist[edge[0]] = Math.max(dist[edge[0]], dist[node] + edge[1]);\n        if (--indegree[edge[0]] == 0) queue.offer(edge[0]);\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<int[]>[] graph;\n  private Integer[] memo;\n\n  public int longestPath(int n, int[][] edges, int source) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) graph[edge[0]].add(new int[] {edge[1], edge[2]});\n    memo = new Integer[n];\n    return Math.max(0, dfs(source));\n  }\n\n  private int dfs(int node) {\n    if (memo[node] != null) return memo[node];\n    int best = 0;\n    for (int[] edge : graph[node]) best = Math.max(best, edge[1] + dfs(edge[0]));\n    return memo[node] = best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int longestPath(int n, int[][] edges, int source) {\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[n];\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); indegree[edge[1]]++; }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int node = 0; node < n; node++) if (indegree[node] == 0) queue.offer(node);\n    int[] dist = new int[n];\n    Arrays.fill(dist, Integer.MIN_VALUE / 4);\n    dist[source] = 0;\n    int answer = 0;\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      if (dist[node] > Integer.MIN_VALUE / 8) answer = Math.max(answer, dist[node]);\n      for (int[] edge : graph[node]) {\n        if (dist[node] > Integer.MIN_VALUE / 8) dist[edge[0]] = Math.max(dist[edge[0]], dist[node] + edge[1]);\n        if (--indegree[edge[0]] == 0) queue.offer(edge[0]);\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int longestPath(int n, int[][] edges, int source) {\n    List<int[]>[] graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    int[] indegree = new int[n];\n    for (int[] edge : edges) { graph[edge[0]].add(new int[] {edge[1], edge[2]}); indegree[edge[1]]++; }\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int node = 0; node < n; node++) if (indegree[node] == 0) queue.offer(node);\n    int[] dist = new int[n];\n    Arrays.fill(dist, Integer.MIN_VALUE / 4);\n    dist[source] = 0;\n    int answer = 0;\n    while (!queue.isEmpty()) {\n      int node = queue.poll();\n      if (dist[node] > Integer.MIN_VALUE / 8) answer = Math.max(answer, dist[node]);\n      for (int[] edge : graph[node]) {\n        if (dist[node] > Integer.MIN_VALUE / 8) dist[edge[0]] = Math.max(dist[edge[0]], dist[node] + edge[1]);\n        if (--indegree[edge[0]] == 0) queue.offer(edge[0]);\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Articulation Points",
      "difficulty": "Hard",
      "subpattern": "Articulation point detection",
      "question": "Given an undirected graph, return all articulation points whose removal increases the number of connected components.",
      "trigger": "Need vertices, not edges, that separate DFS subtrees from ancestors.",
      "intuition": "A non-root node is an articulation point when a child subtree has low[child] >= disc[node]; root needs at least two DFS children.",
      "edgeCases": "Root with one child, chain graph, cycle graph, disconnected graph, and no articulation points.",
      "constraints": "O(V + E) low-link traversal is expected.",
      "source": {
        "label": "Articulation Points - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/"
      },
      "examples": [
        {
          "input": "n=5, edges=[[1,0],[0,2],[2,1],[0,3],[3,4]]",
          "output": "[0,3]",
          "explanation": "Removing 0 or 3 increases components."
        },
        {
          "input": "n=3, edges=[[0,1],[1,2],[2,0]]",
          "output": "[]",
          "explanation": "A cycle has no articulation point."
        }
      ],
      "bruteForceComplexity": "Time O(V(V + E)); Space O(V + E). Remove each vertex and count components.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). Tarjan low-link finds cut vertices.",
      "recursiveComplexity": "Time O(V + E); Space O(V + E). Recursive DFS tracks child counts and low values.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> articulationPoints(int n, int[][] edges) {\n    List<Integer>[] graph = build(n, edges);\n    List<Integer> answer = new ArrayList<>();\n    int base = components(graph, -1);\n    for (int removed = 0; removed < n; removed++) if (components(graph, removed) > base) answer.add(removed);\n    return answer;\n  }\n\n  private int components(List<Integer>[] graph, int removed) {\n    boolean[] seen = new boolean[graph.length];\n    if (removed >= 0) seen[removed] = true;\n    int count = 0;\n    for (int node = 0; node < graph.length; node++) {\n      if (seen[node]) continue;\n      count++;\n      Deque<Integer> stack = new ArrayDeque<>();\n      stack.push(node); seen[node] = true;\n      while (!stack.isEmpty()) for (int next : graph[stack.pop()]) if (!seen[next]) { seen[next] = true; stack.push(next); }\n    }\n    return count;\n  }\n\n  private List<Integer>[] build(int n, int[][] edges) { List<Integer>[] graph = new ArrayList[n]; for (int i = 0; i < n; i++) graph[i] = new ArrayList<>(); for (int[] edge : edges) { graph[edge[0]].add(edge[1]); graph[edge[1]].add(edge[0]); } return graph; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc, low;\n  private boolean[] cut;\n  private int time;\n\n  public List<Integer> articulationPoints(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(edge[1]); graph[edge[1]].add(edge[0]); }\n    disc = new int[n]; low = new int[n]; cut = new boolean[n];\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node, -1);\n    List<Integer> answer = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (cut[node]) answer.add(node);\n    return answer;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    int children = 0;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        children++;\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (parent != -1 && low[next] >= disc[node]) cut[node] = true;\n      } else low[node] = Math.min(low[node], disc[next]);\n    }\n    if (parent == -1 && children > 1) cut[node] = true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc;\n  private int[] low;\n  private boolean[] cut;\n  private int time;\n\n  public List<Integer> articulationPoints(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(edge[1]); graph[edge[1]].add(edge[0]); }\n    disc = new int[n]; low = new int[n]; cut = new boolean[n];\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node, -1);\n    List<Integer> answer = new ArrayList<>();\n    collect(0, answer);\n    return answer;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    int children = 0;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        children++;\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (parent != -1 && low[next] >= disc[node]) cut[node] = true;\n      } else low[node] = Math.min(low[node], disc[next]);\n    }\n    if (parent == -1 && children > 1) cut[node] = true;\n  }\n\n  private void collect(int node, List<Integer> answer) {\n    if (node == cut.length) return;\n    if (cut[node]) answer.add(node);\n    collect(node + 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc, low;\n  private boolean[] cut;\n  private int time;\n\n  public List<Integer> articulationPoints(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(edge[1]); graph[edge[1]].add(edge[0]); }\n    disc = new int[n]; low = new int[n]; cut = new boolean[n];\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node, -1);\n    List<Integer> answer = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (cut[node]) answer.add(node);\n    return answer;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    int children = 0;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        children++;\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (parent != -1 && low[next] >= disc[node]) cut[node] = true;\n      } else low[node] = Math.min(low[node], disc[next]);\n    }\n    if (parent == -1 && children > 1) cut[node] = true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[] graph;\n  private int[] disc, low;\n  private boolean[] cut;\n  private int time;\n\n  public List<Integer> articulationPoints(int n, int[][] edges) {\n    graph = new ArrayList[n];\n    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();\n    for (int[] edge : edges) { graph[edge[0]].add(edge[1]); graph[edge[1]].add(edge[0]); }\n    disc = new int[n]; low = new int[n]; cut = new boolean[n];\n    for (int node = 0; node < n; node++) if (disc[node] == 0) dfs(node, -1);\n    List<Integer> answer = new ArrayList<>();\n    for (int node = 0; node < n; node++) if (cut[node]) answer.add(node);\n    return answer;\n  }\n\n  private void dfs(int node, int parent) {\n    disc[node] = low[node] = ++time;\n    int children = 0;\n    for (int next : graph[node]) {\n      if (next == parent) continue;\n      if (disc[next] == 0) {\n        children++;\n        dfs(next, node);\n        low[node] = Math.min(low[node], low[next]);\n        if (parent != -1 && low[next] >= disc[node]) cut[node] = true;\n      } else low[node] = Math.min(low[node], disc[next]);\n    }\n    if (parent == -1 && children > 1) cut[node] = true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Shortest Path With Alternating Colors",
      "difficulty": "Medium",
      "subpattern": "Shortest path with alternating colors",
      "question": "Given red and blue directed edges, return the shortest distance from node 0 to every node using paths that alternate edge colors.",
      "trigger": "The last edge color changes which outgoing edges are legal next, so color is part of the state.",
      "intuition": "Run BFS on (node,lastColor), starting with both possible previous colors.",
      "edgeCases": "Self loops, parallel edges of different colors, unreachable nodes, only one color present, and node 0 distance zero.",
      "constraints": "Use O(V + E) BFS over two color states per node.",
      "source": {
        "label": "LeetCode 1129 - Shortest Path with Alternating Colors",
        "url": "https://leetcode.com/problems/shortest-path-with-alternating-colors/"
      },
      "examples": [
        {
          "input": "n=3, red=[[0,1],[1,2]], blue=[]",
          "output": "[0,1,-1]",
          "explanation": "Two red edges in a row are not allowed."
        },
        {
          "input": "n=3, red=[[0,1]], blue=[[1,2]]",
          "output": "[0,1,2]",
          "explanation": "The path alternates red then blue."
        }
      ],
      "bruteForceComplexity": "Time exponential in path length with pruning; Space O(V). DFS explores alternating paths.",
      "optimizedComplexity": "Time O(V + E); Space O(V + E). BFS over node/color states.",
      "recursiveComplexity": "Time O(V + E) with distance pruning; Space O(V + E). Recursive relaxation updates alternating states.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {\n    List<Integer>[][] graph = build(n, redEdges, blueEdges);\n    int[][] best = new int[n][2];\n    for (int[] row : best) Arrays.fill(row, Integer.MAX_VALUE);\n    dfs(0, 0, 0, graph, best);\n    dfs(0, 1, 0, graph, best);\n    int[] answer = new int[n];\n    for (int node = 0; node < n; node++) {\n      int value = Math.min(best[node][0], best[node][1]);\n      answer[node] = value == Integer.MAX_VALUE ? -1 : value;\n    }\n    answer[0] = 0;\n    return answer;\n  }\n\n  private void dfs(int node, int lastColor, int dist, List<Integer>[][] graph, int[][] best) {\n    if (dist >= best[node][lastColor]) return;\n    best[node][lastColor] = dist;\n    int nextColor = 1 - lastColor;\n    for (int next : graph[nextColor][node]) dfs(next, nextColor, dist + 1, graph, best);\n  }\n\n  private List<Integer>[][] build(int n, int[][] red, int[][] blue) {\n    List<Integer>[][] graph = new ArrayList[2][n];\n    for (int c = 0; c < 2; c++) for (int i = 0; i < n; i++) graph[c][i] = new ArrayList<>();\n    for (int[] e : red) graph[0][e[0]].add(e[1]);\n    for (int[] e : blue) graph[1][e[0]].add(e[1]);\n    return graph;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {\n    List<Integer>[][] graph = new ArrayList[2][n];\n    for (int c = 0; c < 2; c++) for (int i = 0; i < n; i++) graph[c][i] = new ArrayList<>();\n    for (int[] edge : redEdges) graph[0][edge[0]].add(edge[1]);\n    for (int[] edge : blueEdges) graph[1][edge[0]].add(edge[1]);\n    int[][] dist = new int[n][2];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0});\n    queue.offer(new int[] {0, 1});\n    dist[0][0] = dist[0][1] = 0;\n    while (!queue.isEmpty()) {\n      int[] state = queue.poll();\n      int node = state[0], color = state[1], nextColor = 1 - color;\n      for (int next : graph[nextColor][node]) {\n        if (dist[next][nextColor] == Integer.MAX_VALUE) {\n          dist[next][nextColor] = dist[node][color] + 1;\n          queue.offer(new int[] {next, nextColor});\n        }\n      }\n    }\n    int[] answer = new int[n];\n    for (int node = 0; node < n; node++) {\n      int best = Math.min(dist[node][0], dist[node][1]);\n      answer[node] = best == Integer.MAX_VALUE ? -1 : best;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private List<Integer>[][] graph;\n  private int[][] dist;\n\n  public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {\n    graph = new ArrayList[2][n];\n    for (int c = 0; c < 2; c++) for (int i = 0; i < n; i++) graph[c][i] = new ArrayList<>();\n    for (int[] edge : redEdges) graph[0][edge[0]].add(edge[1]);\n    for (int[] edge : blueEdges) graph[1][edge[0]].add(edge[1]);\n    dist = new int[n][2];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    relax(0, 0, 0);\n    relax(0, 1, 0);\n    int[] answer = new int[n];\n    fillAnswer(0, answer);\n    return answer;\n  }\n\n  private void relax(int node, int lastColor, int distance) {\n    if (distance >= dist[node][lastColor]) return;\n    dist[node][lastColor] = distance;\n    int nextColor = 1 - lastColor;\n    for (int next : graph[nextColor][node]) relax(next, nextColor, distance + 1);\n  }\n\n  private void fillAnswer(int node, int[] answer) {\n    if (node == answer.length) return;\n    int best = Math.min(dist[node][0], dist[node][1]);\n    answer[node] = best == Integer.MAX_VALUE ? -1 : best;\n    fillAnswer(node + 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {\n    List<Integer>[][] graph = new ArrayList[2][n];\n    for (int c = 0; c < 2; c++) for (int i = 0; i < n; i++) graph[c][i] = new ArrayList<>();\n    for (int[] edge : redEdges) graph[0][edge[0]].add(edge[1]);\n    for (int[] edge : blueEdges) graph[1][edge[0]].add(edge[1]);\n    int[][] dist = new int[n][2];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0});\n    queue.offer(new int[] {0, 1});\n    dist[0][0] = dist[0][1] = 0;\n    while (!queue.isEmpty()) {\n      int[] state = queue.poll();\n      int node = state[0], color = state[1], nextColor = 1 - color;\n      for (int next : graph[nextColor][node]) {\n        if (dist[next][nextColor] == Integer.MAX_VALUE) {\n          dist[next][nextColor] = dist[node][color] + 1;\n          queue.offer(new int[] {next, nextColor});\n        }\n      }\n    }\n    int[] answer = new int[n];\n    for (int node = 0; node < n; node++) {\n      int best = Math.min(dist[node][0], dist[node][1]);\n      answer[node] = best == Integer.MAX_VALUE ? -1 : best;\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {\n    List<Integer>[][] graph = new ArrayList[2][n];\n    for (int c = 0; c < 2; c++) for (int i = 0; i < n; i++) graph[c][i] = new ArrayList<>();\n    for (int[] edge : redEdges) graph[0][edge[0]].add(edge[1]);\n    for (int[] edge : blueEdges) graph[1][edge[0]].add(edge[1]);\n    int[][] dist = new int[n][2];\n    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n    Queue<int[]> queue = new ArrayDeque<>();\n    queue.offer(new int[] {0, 0});\n    queue.offer(new int[] {0, 1});\n    dist[0][0] = dist[0][1] = 0;\n    while (!queue.isEmpty()) {\n      int[] state = queue.poll();\n      int node = state[0], color = state[1], nextColor = 1 - color;\n      for (int next : graph[nextColor][node]) {\n        if (dist[next][nextColor] == Integer.MAX_VALUE) {\n          dist[next][nextColor] = dist[node][color] + 1;\n          queue.offer(new int[] {next, nextColor});\n        }\n      }\n    }\n    int[] answer = new int[n];\n    for (int node = 0; node < n; node++) {\n      int best = Math.min(dist[node][0], dist[node][1]);\n      answer[node] = best == Integer.MAX_VALUE ? -1 : best;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Weighted Subgraph With Required Paths",
      "difficulty": "Hard",
      "subpattern": "Minimum-weight subgraph with required paths",
      "question": "Given directed weighted edges, src1, src2, and dest, return the minimum total weight of a subgraph where both sources can reach dest, or -1.",
      "trigger": "Two sources must meet at some node and then share a suffix path to destination.",
      "intuition": "For every meeting node m, combine dist(src1,m), dist(src2,m), and dist(m,dest). The last term is Dijkstra from dest on reversed edges.",
      "edgeCases": "No common meeting node, dest as meeting node, one source equals dest, disconnected graph, and large long distances.",
      "constraints": "Use long distances; edge weights are non-negative.",
      "source": {
        "label": "LeetCode 2203 - Minimum Weighted Subgraph With the Required Paths",
        "url": "https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths/"
      },
      "examples": [
        {
          "input": "n=6, edges=[[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], src1=0, src2=1, dest=5",
          "output": "9",
          "explanation": "Meet at node 2 and share the suffix to 5."
        },
        {
          "input": "n=3, edges=[[0,1,1]], src1=0, src2=2, dest=1",
          "output": "-1",
          "explanation": "Source 2 cannot reach dest."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(n^2). Floyd-Warshall checks every meeting node.",
      "optimizedComplexity": "Time O((V + E) log V); Space O(V + E). Three Dijkstra runs provide all needed distances.",
      "recursiveComplexity": "Time O(VE) per Bellman-Ford helper; Space O(V). Recursive relaxation computes distances.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public long minimumWeight(int n, int[][] edges, int src1, int src2, int dest) {\n    long INF = Long.MAX_VALUE / 4;\n    long[][] dist = new long[n][n];\n    for (long[] row : dist) Arrays.fill(row, INF);\n    for (int i = 0; i < n; i++) dist[i][i] = 0;\n    for (int[] edge : edges) dist[edge[0]][edge[1]] = Math.min(dist[edge[0]][edge[1]], (long) edge[2]);\n    for (int k = 0; k < n; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];\n    long answer = INF;\n    for (int meet = 0; meet < n; meet++) answer = Math.min(answer, dist[src1][meet] + dist[src2][meet] + dist[meet][dest]);\n    return answer >= INF ? -1 : answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public long minimumWeight(int n, int[][] edges, int src1, int src2, int dest) {\n    List<int[]>[] graph = new ArrayList[n];\n    List<int[]>[] reverse = new ArrayList[n];\n    for (int i = 0; i < n; i++) { graph[i] = new ArrayList<>(); reverse[i] = new ArrayList<>(); }\n    for (int[] edge : edges) {\n      graph[edge[0]].add(new int[] {edge[1], edge[2]});\n      reverse[edge[1]].add(new int[] {edge[0], edge[2]});\n    }\n    long[] from1 = dijkstra(src1, graph);\n    long[] from2 = dijkstra(src2, graph);\n    long[] toDest = dijkstra(dest, reverse);\n    long INF = Long.MAX_VALUE / 4;\n    long answer = INF;\n    for (int meet = 0; meet < n; meet++) {\n      if (from1[meet] < INF && from2[meet] < INF && toDest[meet] < INF) answer = Math.min(answer, from1[meet] + from2[meet] + toDest[meet]);\n    }\n    return answer == INF ? -1 : answer;\n  }\n\n  private long[] dijkstra(int source, List<int[]>[] graph) {\n    long INF = Long.MAX_VALUE / 4;\n    long[] dist = new long[graph.length];\n    Arrays.fill(dist, INF);\n    dist[source] = 0;\n    PriorityQueue<long[]> heap = new PriorityQueue<>(Comparator.comparingLong(a -> a[1]));\n    heap.offer(new long[] {source, 0});\n    while (!heap.isEmpty()) {\n      long[] current = heap.poll();\n      int node = (int) current[0];\n      if (current[1] != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        long next = current[1] + edge[1];\n        if (next < dist[edge[0]]) {\n          dist[edge[0]] = next;\n          heap.offer(new long[] {edge[0], next});\n        }\n      }\n    }\n    return dist;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public long minimumWeight(int n, int[][] edges, int src1, int src2, int dest) {\n    int[][] reversed = new int[edges.length][3];\n    for (int i = 0; i < edges.length; i++) reversed[i] = new int[] {edges[i][1], edges[i][0], edges[i][2]};\n    long[] from1 = bellman(n, edges, src1, 0);\n    long[] from2 = bellman(n, edges, src2, 0);\n    long[] toDest = bellman(n, reversed, dest, 0);\n    long INF = Long.MAX_VALUE / 4;\n    long answer = INF;\n    for (int meet = 0; meet < n; meet++) {\n      if (from1[meet] < INF && from2[meet] < INF && toDest[meet] < INF) answer = Math.min(answer, from1[meet] + from2[meet] + toDest[meet]);\n    }\n    return answer == INF ? -1 : answer;\n  }\n\n  private long[] bellman(int n, int[][] edges, int source, int round) {\n    long INF = Long.MAX_VALUE / 4;\n    long[] dist = new long[n];\n    Arrays.fill(dist, INF);\n    dist[source] = 0;\n    relaxRounds(0, n - 1, edges, dist);\n    return dist;\n  }\n\n  private void relaxRounds(int round, int limit, int[][] edges, long[] dist) {\n    if (round == limit) return;\n    boolean changed = relaxEdge(0, edges, dist, false);\n    if (changed) relaxRounds(round + 1, limit, edges, dist);\n  }\n\n  private boolean relaxEdge(int index, int[][] edges, long[] dist, boolean changed) {\n    if (index == edges.length) return changed;\n    long INF = Long.MAX_VALUE / 4;\n    int[] edge = edges[index];\n    if (dist[edge[0]] < INF && dist[edge[0]] + edge[2] < dist[edge[1]]) {\n      dist[edge[1]] = dist[edge[0]] + edge[2];\n      changed = true;\n    }\n    return relaxEdge(index + 1, edges, dist, changed);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public long minimumWeight(int n, int[][] edges, int src1, int src2, int dest) {\n    List<int[]>[] graph = new ArrayList[n];\n    List<int[]>[] reverse = new ArrayList[n];\n    for (int i = 0; i < n; i++) { graph[i] = new ArrayList<>(); reverse[i] = new ArrayList<>(); }\n    for (int[] edge : edges) {\n      graph[edge[0]].add(new int[] {edge[1], edge[2]});\n      reverse[edge[1]].add(new int[] {edge[0], edge[2]});\n    }\n    long[] from1 = dijkstra(src1, graph);\n    long[] from2 = dijkstra(src2, graph);\n    long[] toDest = dijkstra(dest, reverse);\n    long INF = Long.MAX_VALUE / 4;\n    long answer = INF;\n    for (int meet = 0; meet < n; meet++) {\n      if (from1[meet] < INF && from2[meet] < INF && toDest[meet] < INF) answer = Math.min(answer, from1[meet] + from2[meet] + toDest[meet]);\n    }\n    return answer == INF ? -1 : answer;\n  }\n\n  private long[] dijkstra(int source, List<int[]>[] graph) {\n    long INF = Long.MAX_VALUE / 4;\n    long[] dist = new long[graph.length];\n    Arrays.fill(dist, INF);\n    dist[source] = 0;\n    PriorityQueue<long[]> heap = new PriorityQueue<>(Comparator.comparingLong(a -> a[1]));\n    heap.offer(new long[] {source, 0});\n    while (!heap.isEmpty()) {\n      long[] current = heap.poll();\n      int node = (int) current[0];\n      if (current[1] != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        long next = current[1] + edge[1];\n        if (next < dist[edge[0]]) {\n          dist[edge[0]] = next;\n          heap.offer(new long[] {edge[0], next});\n        }\n      }\n    }\n    return dist;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public long minimumWeight(int n, int[][] edges, int src1, int src2, int dest) {\n    List<int[]>[] graph = new ArrayList[n];\n    List<int[]>[] reverse = new ArrayList[n];\n    for (int i = 0; i < n; i++) { graph[i] = new ArrayList<>(); reverse[i] = new ArrayList<>(); }\n    for (int[] edge : edges) {\n      graph[edge[0]].add(new int[] {edge[1], edge[2]});\n      reverse[edge[1]].add(new int[] {edge[0], edge[2]});\n    }\n    long[] from1 = dijkstra(src1, graph);\n    long[] from2 = dijkstra(src2, graph);\n    long[] toDest = dijkstra(dest, reverse);\n    long INF = Long.MAX_VALUE / 4;\n    long answer = INF;\n    for (int meet = 0; meet < n; meet++) {\n      if (from1[meet] < INF && from2[meet] < INF && toDest[meet] < INF) answer = Math.min(answer, from1[meet] + from2[meet] + toDest[meet]);\n    }\n    return answer == INF ? -1 : answer;\n  }\n\n  private long[] dijkstra(int source, List<int[]>[] graph) {\n    long INF = Long.MAX_VALUE / 4;\n    long[] dist = new long[graph.length];\n    Arrays.fill(dist, INF);\n    dist[source] = 0;\n    PriorityQueue<long[]> heap = new PriorityQueue<>(Comparator.comparingLong(a -> a[1]));\n    heap.offer(new long[] {source, 0});\n    while (!heap.isEmpty()) {\n      long[] current = heap.poll();\n      int node = (int) current[0];\n      if (current[1] != dist[node]) continue;\n      for (int[] edge : graph[node]) {\n        long next = current[1] + edge[1];\n        if (next < dist[edge[0]]) {\n          dist[edge[0]] = next;\n          heap.offer(new long[] {edge[0], next});\n        }\n      }\n    }\n    return dist;\n  }\n}"
    }
  ],
  "checklist": [
    "Weighted edges plus non-negative weights usually trigger Dijkstra or 0-1 BFS.",
    "Need all-pairs shortest paths on small n: consider Floyd-Warshall.",
    "Need cheapest connection of all nodes: model as MST, often with virtual nodes.",
    "Need bridges, articulation points, or SCCs: use discovery time and low-link thinking.",
    "Need path using every edge once: check Eulerian degree balance and run Hierholzer."
  ],
  "traps": [
    "Using Dijkstra when negative weights are present.",
    "Marking a node visited too early when state includes stops, time, mask, or color.",
    "Forgetting to preserve original edge indices in MST classification.",
    "Not handling invalid prefix order in Alien Dictionary.",
    "Treating undirected bridge parent edges incorrectly when parallel edges exist."
  ],
  "edgeCases": [
    "Disconnected graph or unreachable destination.",
    "Single node, no edges, and self-loop inputs where allowed.",
    "Multiple edges between the same pair with different weights.",
    "Cycles in directed graphs and duplicate dependency edges.",
    "Large path costs requiring int sentinel discipline or long arithmetic."
  ],
  "complexities": [
    "Dijkstra with heap: O((V + E) log V) time and O(V + E) space.",
    "Bellman-Ford style relaxation: O(VE) or O(kE) for stop-limited paths.",
    "Floyd-Warshall: O(V^3) time and O(V^2) space.",
    "Tarjan/Kosaraju: O(V + E) time and O(V + E) space.",
    "MST with Kruskal: O(E log E); dense Prim: O(V^2)."
  ],
  "mentalModel": [
    "Treat graph state as more than node when constraints add stops, time, mask, or color.",
    "Shortest-path algorithms are relaxation engines; choose by weight rules and state size.",
    "MST problems often become easy after adding the right virtual node or edge index.",
    "Low-link algorithms answer whether a DFS subtree can escape to an ancestor.",
    "Euler, SCC, matching, and flow are structure problems: preserve invariants, not just distances."
  ],
  "revisionStrategy": [
    "Day 1: redo Dijkstra, Bellman-Ford, Floyd, Kruskal, Prim from memory.",
    "Day 3: redo topological sort, itinerary, bitmask BFS, and constrained shortest path.",
    "Day 7: redo bridges, articulation points, SCC, and Euler trail without looking.",
    "Day 14: mix matching, flow, negative cycle, and DAG longest path.",
    "Before interviews: solve five unseen graph problems and first classify weight/state/connectivity constraints."
  ],
  "unseen": [
    "Find the cheapest route with at most two coupons where a coupon halves one edge cost.",
    "Given directed roads, return one road whose removal makes every city unable to reach city 0.",
    "Find the earliest time when all cells in a grid become connected under rising thresholds.",
    "Choose edges so every department is connected with minimum total contract cost.",
    "Given word transformations with weighted edits, find the least-cost chain from start to end."
  ]
};
