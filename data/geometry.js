const CURRENT_PATTERN = {
  "id": "geometry",
  "name": "Geometry",
  "summary": "Coordinates, orientation, distance, sweep-line, rectangles, circles, hulls, and simulations.",
  "complete": true,
  "subpatterns": [
    "Squared-distance shape validation",
    "Axis-aligned rectangle overlap",
    "Cross-product collinearity",
    "Triangle orientation test",
    "Distance ordering with heap or selection",
    "Normalized slope counting",
    "Axis-aligned rectangle by diagonal pairs",
    "Direction-vector robot simulation",
    "Obstacle hashing on integer grid",
    "3D projection counting",
    "Shoelace and triangle area",
    "Chebyshev distance on grid points",
    "Monotonic chain convex hull",
    "Point-pair square counting",
    "Union area by inclusion-exclusion",
    "Circle-rectangle closest point test",
    "Circle query point counting",
    "Equal-distance boomerang counting",
    "Reflection axis with point pairing",
    "Self-crossing local segment cases",
    "Rectangle union area sweep/compression",
    "Skyline sweep-line events",
    "Mirror reflection by parity and LCM",
    "Lattice point enumeration inside circles",
    "Manhattan race comparison",
    "Origin-return displacement simulation",
    "Decimal coordinate generation",
    "Tagged square radius threshold",
    "Convex polygon orientation consistency",
    "Rotated rectangle by diagonal midpoint"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Valid Square",
      "difficulty": "Medium",
      "subpattern": "Squared-distance shape validation",
      "question": "Given four points p1, p2, p3, and p4, return true if they form a non-degenerate square.",
      "trigger": "A square has four equal positive side lengths and two equal diagonals when all six squared distances are inspected.",
      "intuition": "Avoid angles; sort the six squared pair distances and check the side/diagonal pattern.",
      "edgeCases": "Duplicate points, zero side length, rectangle but not square, rhombus but not square, and negative coordinates.",
      "constraints": "Each point has two integer coordinates; squared distances fit safely in int for LeetCode bounds.",
      "source": {
        "label": "LeetCode 593 - Valid Square",
        "url": "https://leetcode.com/problems/valid-square/"
      },
      "examples": [
        {
          "input": "p1=[0,0], p2=[1,1], p3=[1,0], p4=[0,1]",
          "output": "true",
          "explanation": "The four sides have length 1 and the two diagonals have length 2."
        },
        {
          "input": "p1=[0,0], p2=[1,1], p3=[1,0], p4=[0,12]",
          "output": "false",
          "explanation": "Distances do not match the square pattern."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). Compute and sort the six pairwise squared distances.",
      "optimizedComplexity": "Time O(1); Space O(1). The six-distance invariant is already constant optimal.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive helper fills the six distance slots.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\n    int[][] points = {p1, p2, p3, p4};\n    int[] distances = new int[6];\n    int index = 0;\n    for (int i = 0; i < 4; i++) {\n      for (int j = i + 1; j < 4; j++) distances[index++] = distance(points[i], points[j]);\n    }\n    Arrays.sort(distances);\n    return distances[0] > 0 && distances[0] == distances[1] && distances[1] == distances[2]\n        && distances[2] == distances[3] && distances[4] == distances[5]\n        && distances[4] == 2 * distances[0];\n  }\n\n  private int distance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\n    int[] distances = {\n      distance(p1, p2), distance(p1, p3), distance(p1, p4),\n      distance(p2, p3), distance(p2, p4), distance(p3, p4)\n    };\n    Arrays.sort(distances);\n    return distances[0] > 0 && distances[0] == distances[3]\n        && distances[4] == distances[5] && distances[4] == 2 * distances[0];\n  }\n\n  private int distance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\n    int[][] points = {p1, p2, p3, p4};\n    int[] distances = new int[6];\n    fill(points, 0, 1, 0, distances);\n    Arrays.sort(distances);\n    return distances[0] > 0 && distances[0] == distances[3]\n        && distances[4] == distances[5] && distances[4] == 2 * distances[0];\n  }\n\n  private int fill(int[][] points, int i, int j, int index, int[] distances) {\n    if (i == points.length - 1) return index;\n    if (j == points.length) return fill(points, i + 1, i + 2, index, distances);\n    distances[index] = distance(points[i], points[j]);\n    return fill(points, i, j + 1, index + 1, distances);\n  }\n\n  private int distance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\n    int[] distances = {\n      distance(p1, p2), distance(p1, p3), distance(p1, p4),\n      distance(p2, p3), distance(p2, p4), distance(p3, p4)\n    };\n    Arrays.sort(distances);\n    return distances[0] > 0 && distances[0] == distances[3]\n        && distances[4] == distances[5] && distances[4] == 2 * distances[0];\n  }\n\n  private int distance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\n    int[] distances = {\n      distance(p1, p2), distance(p1, p3), distance(p1, p4),\n      distance(p2, p3), distance(p2, p4), distance(p3, p4)\n    };\n    Arrays.sort(distances);\n    return distances[0] > 0 && distances[0] == distances[3]\n        && distances[4] == distances[5] && distances[4] == 2 * distances[0];\n  }\n\n  private int distance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Rectangle Overlap",
      "difficulty": "Easy",
      "subpattern": "Axis-aligned rectangle overlap",
      "question": "Given two axis-aligned rectangles rec1 and rec2 as [x1,y1,x2,y2], return true if they overlap with positive area.",
      "trigger": "Axis-aligned rectangles overlap iff their x projections and y projections overlap with positive length.",
      "intuition": "Reject the four separating cases: one rectangle completely left, right, above, or below the other.",
      "edgeCases": "Touching edges only, zero-area rectangles, negative coordinates, one rectangle inside another, and identical rectangles.",
      "constraints": "Coordinates are integers; positive area overlap is required.",
      "source": {
        "label": "LeetCode 836 - Rectangle Overlap",
        "url": "https://leetcode.com/problems/rectangle-overlap/"
      },
      "examples": [
        {
          "input": "rec1=[0,0,2,2], rec2=[1,1,3,3]",
          "output": "true",
          "explanation": "Both projections overlap with positive length."
        },
        {
          "input": "rec1=[0,0,1,1], rec2=[1,0,2,1]",
          "output": "false",
          "explanation": "They only touch at an edge."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). Check whether either rectangle has a corner strictly inside the other, plus containment.",
      "optimizedComplexity": "Time O(1); Space O(1). Projection overlap reduces the test to four comparisons.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive interval checks validate x and y projections.",
      "bruteForceCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    return area(rec1) > 0 && area(rec2) > 0\n        && Math.max(rec1[0], rec2[0]) < Math.min(rec1[2], rec2[2])\n        && Math.max(rec1[1], rec2[1]) < Math.min(rec1[3], rec2[3]);\n  }\n\n  private int area(int[] rec) {\n    return Math.max(0, rec[2] - rec[0]) * Math.max(0, rec[3] - rec[1]);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    boolean separated = rec1[2] <= rec2[0] || rec2[2] <= rec1[0]\n        || rec1[3] <= rec2[1] || rec2[3] <= rec1[1];\n    return !separated;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    return overlap(rec1, rec2, 0) && overlap(rec1, rec2, 1);\n  }\n\n  private boolean overlap(int[] a, int[] b, int axis) {\n    if (axis == 0) return Math.max(a[0], b[0]) < Math.min(a[2], b[2]);\n    return Math.max(a[1], b[1]) < Math.min(a[3], b[3]);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    boolean separated = rec1[2] <= rec2[0] || rec2[2] <= rec1[0]\n        || rec1[3] <= rec2[1] || rec2[3] <= rec1[1];\n    return !separated;\n  }\n}",
      "code": "class Solution {\n  public boolean isRectangleOverlap(int[] rec1, int[] rec2) {\n    boolean separated = rec1[2] <= rec2[0] || rec2[2] <= rec1[0]\n        || rec1[3] <= rec2[1] || rec2[3] <= rec1[1];\n    return !separated;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Check If It Is a Straight Line",
      "difficulty": "Easy",
      "subpattern": "Cross-product collinearity",
      "question": "Given coordinates of points, return true if all points lie on one straight line.",
      "trigger": "All points must have zero cross product relative to the first two points.",
      "intuition": "Use vector (p1-p0) as the baseline and verify every other vector has the same direction or opposite direction.",
      "edgeCases": "Vertical line, horizontal line, duplicate first points under general variants, negative coordinates, and exactly two points.",
      "constraints": "At least two points are provided in the LeetCode problem.",
      "source": {
        "label": "LeetCode 1232 - Check If It Is a Straight Line",
        "url": "https://leetcode.com/problems/check-if-it-is-a-straight-line/"
      },
      "examples": [
        {
          "input": "coordinates=[[1,2],[2,3],[3,4],[4,5]]",
          "output": "true",
          "explanation": "Every point has the same slope."
        },
        {
          "input": "coordinates=[[1,1],[2,2],[3,4]]",
          "output": "false",
          "explanation": "The third point breaks collinearity."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Compare cross products against the first two points.",
      "optimizedComplexity": "Time O(n); Space O(1). Cross multiplication avoids division and slope precision issues.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth. Recursive scan checks each point.",
      "bruteForceCode": "class Solution {\n  public boolean checkStraightLine(int[][] coordinates) {\n    int dx = coordinates[1][0] - coordinates[0][0];\n    int dy = coordinates[1][1] - coordinates[0][1];\n    for (int i = 2; i < coordinates.length; i++) {\n      int x = coordinates[i][0] - coordinates[0][0];\n      int y = coordinates[i][1] - coordinates[0][1];\n      if (dx * y != dy * x) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean checkStraightLine(int[][] coordinates) {\n    int[] a = coordinates[0], b = coordinates[1];\n    for (int i = 2; i < coordinates.length; i++) {\n      if (cross(a, b, coordinates[i]) != 0) return false;\n    }\n    return true;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean checkStraightLine(int[][] coordinates) {\n    return check(coordinates, 2, coordinates[0], coordinates[1]);\n  }\n\n  private boolean check(int[][] points, int index, int[] a, int[] b) {\n    if (index == points.length) return true;\n    return cross(a, b, points[index]) == 0 && check(points, index + 1, a, b);\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean checkStraightLine(int[][] coordinates) {\n    int[] a = coordinates[0], b = coordinates[1];\n    for (int i = 2; i < coordinates.length; i++) {\n      if (cross(a, b, coordinates[i]) != 0) return false;\n    }\n    return true;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "code": "class Solution {\n  public boolean checkStraightLine(int[][] coordinates) {\n    int[] a = coordinates[0], b = coordinates[1];\n    for (int i = 2; i < coordinates.length; i++) {\n      if (cross(a, b, coordinates[i]) != 0) return false;\n    }\n    return true;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Valid Boomerang",
      "difficulty": "Easy",
      "subpattern": "Triangle orientation test",
      "question": "Given three points, return true if they form a boomerang, meaning they are distinct and not collinear.",
      "trigger": "Three points form a non-zero-area triangle exactly when their cross product is non-zero.",
      "intuition": "Use the signed doubled area of the triangle; zero means duplicate or collinear geometry.",
      "edgeCases": "Duplicate points, vertical/horizontal alignment, negative coordinates, and all three collinear.",
      "constraints": "Exactly three points are provided.",
      "source": {
        "label": "LeetCode 1037 - Valid Boomerang",
        "url": "https://leetcode.com/problems/valid-boomerang/"
      },
      "examples": [
        {
          "input": "points=[[1,1],[2,3],[3,2]]",
          "output": "true",
          "explanation": "The cross product is non-zero."
        },
        {
          "input": "points=[[1,1],[2,2],[3,3]]",
          "output": "false",
          "explanation": "The points are collinear."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). Compute triangle doubled area.",
      "optimizedComplexity": "Time O(1); Space O(1). Cross product is the direct invariant.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive wrapper checks the same orientation invariant.",
      "bruteForceCode": "class Solution {\n  public boolean isBoomerang(int[][] points) {\n    int area2 = (points[1][0] - points[0][0]) * (points[2][1] - points[0][1])\n        - (points[1][1] - points[0][1]) * (points[2][0] - points[0][0]);\n    return area2 != 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isBoomerang(int[][] points) {\n    return cross(points[0], points[1], points[2]) != 0;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isBoomerang(int[][] points) {\n    return nonCollinear(points, 0);\n  }\n\n  private boolean nonCollinear(int[][] points, int index) {\n    if (index == 1) return true;\n    return cross(points[0], points[1], points[2]) != 0 && nonCollinear(points, index + 1);\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isBoomerang(int[][] points) {\n    return cross(points[0], points[1], points[2]) != 0;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "code": "class Solution {\n  public boolean isBoomerang(int[][] points) {\n    return cross(points[0], points[1], points[2]) != 0;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "K Closest Points to Origin",
      "difficulty": "Medium",
      "subpattern": "Distance ordering with heap or selection",
      "question": "Given points and integer k, return any k points closest to the origin by Euclidean distance.",
      "trigger": "Only distance ranking matters, and squared distance preserves order without square roots.",
      "intuition": "Keep the k smallest squared distances with sorting, heap, or quickselect.",
      "edgeCases": "k equals number of points, equal distances, negative coordinates, origin point, and duplicate points.",
      "constraints": "Return order may be arbitrary for accepted LeetCode solutions.",
      "source": {
        "label": "LeetCode 973 - K Closest Points to Origin",
        "url": "https://leetcode.com/problems/k-closest-points-to-origin/"
      },
      "examples": [
        {
          "input": "points=[[1,3],[-2,2]], k=1",
          "output": "[[-2,2]]",
          "explanation": "Squared distances are 10 and 8."
        },
        {
          "input": "points=[[3,3],[5,-1],[-2,4]], k=2",
          "output": "two closest points",
          "explanation": "Any order of the two closest points is valid."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Sort all points by squared distance.",
      "optimizedComplexity": "Time O(n log k); Space O(k). Max-heap keeps only k closest points.",
      "recursiveComplexity": "Average Time O(n); Worst O(n^2); Space O(log n). Recursive quickselect partitions by squared distance.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    Arrays.sort(points, Comparator.comparingInt(this::dist));\n    return Arrays.copyOf(points, k);\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(dist(b), dist(a)));\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() > k) heap.poll();\n    }\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    select(points, 0, points.length - 1, k);\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = points[i];\n    return answer;\n  }\n\n  private void select(int[][] points, int left, int right, int k) {\n    if (left >= right) return;\n    int pivot = partition(points, left, right);\n    if (pivot == k) return;\n    if (pivot < k) select(points, pivot + 1, right, k);\n    else select(points, left, pivot - 1, k);\n  }\n\n  private int partition(int[][] points, int left, int right) {\n    int[] pivot = points[right];\n    int write = left;\n    for (int i = left; i < right; i++) {\n      if (dist(points[i]) <= dist(pivot)) swap(points, write++, i);\n    }\n    swap(points, write, right);\n    return write;\n  }\n\n  private void swap(int[][] points, int i, int j) {\n    int[] temp = points[i];\n    points[i] = points[j];\n    points[j] = temp;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(dist(b), dist(a)));\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() > k) heap.poll();\n    }\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] kClosest(int[][] points, int k) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(dist(b), dist(a)));\n    for (int[] point : points) {\n      heap.offer(point);\n      if (heap.size() > k) heap.poll();\n    }\n    int[][] answer = new int[k][2];\n    for (int i = 0; i < k; i++) answer[i] = heap.poll();\n    return answer;\n  }\n\n  private int dist(int[] point) {\n    return point[0] * point[0] + point[1] * point[1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Max Points on a Line",
      "difficulty": "Hard",
      "subpattern": "Normalized slope counting",
      "question": "Given points on a 2D plane, return the maximum number of points that lie on the same straight line.",
      "trigger": "For each anchor point, all other points on the same line share a normalized slope.",
      "intuition": "Count reduced dy/dx pairs per anchor, treating duplicate points separately.",
      "edgeCases": "Duplicate points, vertical lines, horizontal lines, negative slopes, and all points equal.",
      "constraints": "Use gcd normalization instead of floating-point slopes.",
      "source": {
        "label": "LeetCode 149 - Max Points on a Line",
        "url": "https://leetcode.com/problems/max-points-on-a-line/"
      },
      "examples": [
        {
          "input": "points=[[1,1],[2,2],[3,3]]",
          "output": "3",
          "explanation": "All points have the same slope from any anchor."
        },
        {
          "input": "points=[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]",
          "output": "4",
          "explanation": "Four points lie on one line."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every candidate line against every point.",
      "optimizedComplexity": "Time O(n^2 log C); Space O(n). Hash normalized slopes from each anchor.",
      "recursiveComplexity": "Time O(n^2 log C); Space O(n + recursion depth). Recursively process anchors with slope counts.",
      "bruteForceCode": "class Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length <= 2) return points.length;\n    int best = 2;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        int count = 0;\n        for (int k = 0; k < points.length; k++) {\n          if (cross(points[i], points[j], points[k]) == 0) count++;\n        }\n        best = Math.max(best, count);\n      }\n    }\n    return best;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length <= 2) return points.length;\n    int answer = 0;\n    for (int i = 0; i < points.length; i++) {\n      Map<String, Integer> slopes = new HashMap<>();\n      int duplicates = 1;\n      int best = 0;\n      for (int j = i + 1; j < points.length; j++) {\n        int dx = points[j][0] - points[i][0];\n        int dy = points[j][1] - points[i][1];\n        if (dx == 0 && dy == 0) {\n          duplicates++;\n          continue;\n        }\n        int g = gcd(Math.abs(dx), Math.abs(dy));\n        dx /= g;\n        dy /= g;\n        if (dx < 0) { dx = -dx; dy = -dy; }\n        if (dx == 0) dy = 1;\n        if (dy == 0) dx = 1;\n        String key = dy + \"/\" + dx;\n        int count = slopes.getOrDefault(key, 0) + 1;\n        slopes.put(key, count);\n        best = Math.max(best, count);\n      }\n      answer = Math.max(answer, best + duplicates);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return a == 0 ? 1 : a;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length <= 2) return points.length;\n    return processAnchor(points, 0, 0);\n  }\n\n  private int processAnchor(int[][] points, int index, int answer) {\n    if (index == points.length) return answer;\n    Map<String, Integer> slopes = new HashMap<>();\n    int[] result = countFrom(points, index, index + 1, slopes, 1, 0);\n    return processAnchor(points, index + 1, Math.max(answer, result[0] + result[1]));\n  }\n\n  private int[] countFrom(int[][] points, int anchor, int next, Map<String, Integer> slopes, int duplicates, int best) {\n    if (next == points.length) return new int[] {best, duplicates};\n    int dx = points[next][0] - points[anchor][0];\n    int dy = points[next][1] - points[anchor][1];\n    if (dx == 0 && dy == 0) return countFrom(points, anchor, next + 1, slopes, duplicates + 1, best);\n    int g = gcd(Math.abs(dx), Math.abs(dy));\n    dx /= g;\n    dy /= g;\n    if (dx < 0) { dx = -dx; dy = -dy; }\n    if (dx == 0) dy = 1;\n    if (dy == 0) dx = 1;\n    String key = dy + \"/\" + dx;\n    int count = slopes.getOrDefault(key, 0) + 1;\n    slopes.put(key, count);\n    return countFrom(points, anchor, next + 1, slopes, duplicates, Math.max(best, count));\n  }\n\n  private int gcd(int a, int b) {\n    if (b == 0) return a == 0 ? 1 : a;\n    return gcd(b, a % b);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length <= 2) return points.length;\n    int answer = 0;\n    for (int i = 0; i < points.length; i++) {\n      Map<String, Integer> slopes = new HashMap<>();\n      int duplicates = 1;\n      int best = 0;\n      for (int j = i + 1; j < points.length; j++) {\n        int dx = points[j][0] - points[i][0];\n        int dy = points[j][1] - points[i][1];\n        if (dx == 0 && dy == 0) {\n          duplicates++;\n          continue;\n        }\n        int g = gcd(Math.abs(dx), Math.abs(dy));\n        dx /= g;\n        dy /= g;\n        if (dx < 0) { dx = -dx; dy = -dy; }\n        if (dx == 0) dy = 1;\n        if (dy == 0) dx = 1;\n        String key = dy + \"/\" + dx;\n        int count = slopes.getOrDefault(key, 0) + 1;\n        slopes.put(key, count);\n        best = Math.max(best, count);\n      }\n      answer = Math.max(answer, best + duplicates);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return a == 0 ? 1 : a;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxPoints(int[][] points) {\n    if (points.length <= 2) return points.length;\n    int answer = 0;\n    for (int i = 0; i < points.length; i++) {\n      Map<String, Integer> slopes = new HashMap<>();\n      int duplicates = 1;\n      int best = 0;\n      for (int j = i + 1; j < points.length; j++) {\n        int dx = points[j][0] - points[i][0];\n        int dy = points[j][1] - points[i][1];\n        if (dx == 0 && dy == 0) {\n          duplicates++;\n          continue;\n        }\n        int g = gcd(Math.abs(dx), Math.abs(dy));\n        dx /= g;\n        dy /= g;\n        if (dx < 0) { dx = -dx; dy = -dy; }\n        if (dx == 0) dy = 1;\n        if (dy == 0) dx = 1;\n        String key = dy + \"/\" + dx;\n        int count = slopes.getOrDefault(key, 0) + 1;\n        slopes.put(key, count);\n        best = Math.max(best, count);\n      }\n      answer = Math.max(answer, best + duplicates);\n    }\n    return answer;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int temp = a % b;\n      a = b;\n      b = temp;\n    }\n    return a == 0 ? 1 : a;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Area Rectangle",
      "difficulty": "Medium",
      "subpattern": "Axis-aligned rectangle by diagonal pairs",
      "question": "Given points with integer coordinates, return the minimum area of an axis-aligned rectangle formed by four points, or 0 if none exists.",
      "trigger": "Opposite diagonal corners define an axis-aligned rectangle when the other two corners exist.",
      "intuition": "Hash all points, then test every diagonal pair with different x and y.",
      "edgeCases": "No rectangle, duplicate points, rectangles sharing corners, negative coordinates, and minimum area ties.",
      "constraints": "Coordinates are integers and point count is small enough for O(n^2) pair checks.",
      "source": {
        "label": "LeetCode 939 - Minimum Area Rectangle",
        "url": "https://leetcode.com/problems/minimum-area-rectangle/"
      },
      "examples": [
        {
          "input": "points=[[1,1],[1,3],[3,1],[3,3],[2,2]]",
          "output": "4",
          "explanation": "The rectangle corners at (1,1),(1,3),(3,1),(3,3) have area 4."
        },
        {
          "input": "points=[[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]",
          "output": "2",
          "explanation": "The rectangle x=3..4 and y=1..3 is smaller."
        }
      ],
      "bruteForceComplexity": "Time O(n^4); Space O(1). Try every four-point combination and validate rectangle corners.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Hash points and test diagonal pairs.",
      "recursiveComplexity": "Time O(n^2); Space O(n + recursion depth). Recursive pair scan uses the same point hash.",
      "bruteForceCode": "class Solution {\n  public int minAreaRect(int[][] points) {\n    int best = Integer.MAX_VALUE;\n    for (int a = 0; a < points.length; a++) {\n      for (int b = a + 1; b < points.length; b++) {\n        for (int c = b + 1; c < points.length; c++) {\n          for (int d = c + 1; d < points.length; d++) {\n            int area = rectangleArea(points[a], points[b], points[c], points[d]);\n            if (area > 0) best = Math.min(best, area);\n          }\n        }\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n\n  private int rectangleArea(int[] a, int[] b, int[] c, int[] d) {\n    int[] xs = {a[0], b[0], c[0], d[0]};\n    int[] ys = {a[1], b[1], c[1], d[1]};\n    int minX = xs[0], maxX = xs[0], minY = ys[0], maxY = ys[0];\n    for (int i = 1; i < 4; i++) { minX = Math.min(minX, xs[i]); maxX = Math.max(maxX, xs[i]); minY = Math.min(minY, ys[i]); maxY = Math.max(maxY, ys[i]); }\n    if (minX == maxX || minY == maxY) return 0;\n    int count = 0;\n    for (int i = 0; i < 4; i++) if ((xs[i] == minX || xs[i] == maxX) && (ys[i] == minY || ys[i] == maxY)) count++;\n    return count == 4 ? (maxX - minX) * (maxY - minY) : 0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minAreaRect(int[][] points) {\n    Set<String> seen = new HashSet<>();\n    for (int[] point : points) seen.add(key(point[0], point[1]));\n    int best = Integer.MAX_VALUE;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        int x1 = points[i][0], y1 = points[i][1];\n        int x2 = points[j][0], y2 = points[j][1];\n        if (x1 == x2 || y1 == y2) continue;\n        if (seen.contains(key(x1, y2)) && seen.contains(key(x2, y1))) {\n          best = Math.min(best, Math.abs(x1 - x2) * Math.abs(y1 - y2));\n        }\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n\n  private String key(int x, int y) {\n    return x + \":\" + y;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minAreaRect(int[][] points) {\n    Set<String> seen = new HashSet<>();\n    for (int[] point : points) seen.add(key(point[0], point[1]));\n    int best = scan(points, seen, 0, 1, Integer.MAX_VALUE);\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n\n  private int scan(int[][] points, Set<String> seen, int i, int j, int best) {\n    if (i == points.length - 1) return best;\n    if (j == points.length) return scan(points, seen, i + 1, i + 2, best);\n    int x1 = points[i][0], y1 = points[i][1];\n    int x2 = points[j][0], y2 = points[j][1];\n    if (x1 != x2 && y1 != y2 && seen.contains(key(x1, y2)) && seen.contains(key(x2, y1))) {\n      best = Math.min(best, Math.abs(x1 - x2) * Math.abs(y1 - y2));\n    }\n    return scan(points, seen, i, j + 1, best);\n  }\n\n  private String key(int x, int y) {\n    return x + \":\" + y;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minAreaRect(int[][] points) {\n    Set<String> seen = new HashSet<>();\n    for (int[] point : points) seen.add(key(point[0], point[1]));\n    int best = Integer.MAX_VALUE;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        int x1 = points[i][0], y1 = points[i][1];\n        int x2 = points[j][0], y2 = points[j][1];\n        if (x1 == x2 || y1 == y2) continue;\n        if (seen.contains(key(x1, y2)) && seen.contains(key(x2, y1))) {\n          best = Math.min(best, Math.abs(x1 - x2) * Math.abs(y1 - y2));\n        }\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n\n  private String key(int x, int y) {\n    return x + \":\" + y;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minAreaRect(int[][] points) {\n    Set<String> seen = new HashSet<>();\n    for (int[] point : points) seen.add(key(point[0], point[1]));\n    int best = Integer.MAX_VALUE;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        int x1 = points[i][0], y1 = points[i][1];\n        int x2 = points[j][0], y2 = points[j][1];\n        if (x1 == x2 || y1 == y2) continue;\n        if (seen.contains(key(x1, y2)) && seen.contains(key(x2, y1))) {\n          best = Math.min(best, Math.abs(x1 - x2) * Math.abs(y1 - y2));\n        }\n      }\n    }\n    return best == Integer.MAX_VALUE ? 0 : best;\n  }\n\n  private String key(int x, int y) {\n    return x + \":\" + y;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Robot Bounded In Circle",
      "difficulty": "Medium",
      "subpattern": "Direction-vector robot simulation",
      "question": "Given instructions G, L, and R repeated forever, return true if the robot remains bounded in a circle.",
      "trigger": "After one instruction cycle, boundedness depends only on final position and direction.",
      "intuition": "If the robot returns to origin or faces a different direction, repeated cycles cannot escape infinitely.",
      "edgeCases": "Only turns, only forward moves, empty-like instruction variant, four-cycle return, and long repeated instructions.",
      "constraints": "Instruction length is small; one pass is enough.",
      "source": {
        "label": "LeetCode 1041 - Robot Bounded In Circle",
        "url": "https://leetcode.com/problems/robot-bounded-in-circle/"
      },
      "examples": [
        {
          "input": "instructions=GGLLGG",
          "output": "true",
          "explanation": "The robot returns to origin after one cycle."
        },
        {
          "input": "instructions=GG",
          "output": "false",
          "explanation": "The robot keeps moving north."
        }
      ],
      "bruteForceComplexity": "Time O(4n); Space O(1). Simulate four cycles and check origin.",
      "optimizedComplexity": "Time O(n); Space O(1). One cycle is enough using final direction.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth. Recursive instruction scan computes one-cycle state.",
      "bruteForceCode": "class Solution {\n  public boolean isRobotBounded(String instructions) {\n    int x = 0, y = 0, dir = 0;\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    for (int repeat = 0; repeat < 4; repeat++) {\n      for (char ch : instructions.toCharArray()) {\n        if (ch == 'G') { x += dirs[dir][0]; y += dirs[dir][1]; }\n        else if (ch == 'L') dir = (dir + 3) % 4;\n        else dir = (dir + 1) % 4;\n      }\n    }\n    return x == 0 && y == 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isRobotBounded(String instructions) {\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    int x = 0, y = 0, dir = 0;\n    for (int i = 0; i < instructions.length(); i++) {\n      char ch = instructions.charAt(i);\n      if (ch == 'G') { x += dirs[dir][0]; y += dirs[dir][1]; }\n      else if (ch == 'L') dir = (dir + 3) % 4;\n      else dir = (dir + 1) % 4;\n    }\n    return (x == 0 && y == 0) || dir != 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  private final int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n\n  public boolean isRobotBounded(String instructions) {\n    int[] state = run(instructions, 0, 0, 0, 0);\n    return (state[0] == 0 && state[1] == 0) || state[2] != 0;\n  }\n\n  private int[] run(String instructions, int index, int x, int y, int dir) {\n    if (index == instructions.length()) return new int[] {x, y, dir};\n    char ch = instructions.charAt(index);\n    if (ch == 'G') return run(instructions, index + 1, x + dirs[dir][0], y + dirs[dir][1], dir);\n    if (ch == 'L') return run(instructions, index + 1, x, y, (dir + 3) % 4);\n    return run(instructions, index + 1, x, y, (dir + 1) % 4);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isRobotBounded(String instructions) {\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    int x = 0, y = 0, dir = 0;\n    for (int i = 0; i < instructions.length(); i++) {\n      char ch = instructions.charAt(i);\n      if (ch == 'G') { x += dirs[dir][0]; y += dirs[dir][1]; }\n      else if (ch == 'L') dir = (dir + 3) % 4;\n      else dir = (dir + 1) % 4;\n    }\n    return (x == 0 && y == 0) || dir != 0;\n  }\n}",
      "code": "class Solution {\n  public boolean isRobotBounded(String instructions) {\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    int x = 0, y = 0, dir = 0;\n    for (int i = 0; i < instructions.length(); i++) {\n      char ch = instructions.charAt(i);\n      if (ch == 'G') { x += dirs[dir][0]; y += dirs[dir][1]; }\n      else if (ch == 'L') dir = (dir + 3) % 4;\n      else dir = (dir + 1) % 4;\n    }\n    return (x == 0 && y == 0) || dir != 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Walking Robot Simulation",
      "difficulty": "Medium",
      "subpattern": "Obstacle hashing on integer grid",
      "question": "Simulate robot commands with obstacles and return the maximum squared Euclidean distance from origin reached by the robot.",
      "trigger": "Commands are movement on an integer grid, and obstacles must be checked one step at a time.",
      "intuition": "Hash obstacle coordinates, rotate direction on turn commands, and stop forward movement before an obstacle.",
      "edgeCases": "Obstacle directly ahead, repeated turns, negative coordinates, no obstacles, and command length with large step values.",
      "constraints": "Obstacle and coordinate values fit in int; use long key packing to avoid string overhead.",
      "source": {
        "label": "LeetCode 874 - Walking Robot Simulation",
        "url": "https://leetcode.com/problems/walking-robot-simulation/"
      },
      "examples": [
        {
          "input": "commands=[4,-1,3], obstacles=[]",
          "output": "25",
          "explanation": "The robot ends at (3,4)."
        },
        {
          "input": "commands=[4,-1,4,-2,4], obstacles=[[2,4]]",
          "output": "65",
          "explanation": "Obstacle at (2,4) blocks one segment."
        }
      ],
      "bruteForceComplexity": "Time O(total walked steps * obstacles); Space O(1). Check each step against every obstacle.",
      "optimizedComplexity": "Time O(total walked steps + obstacles); Space O(obstacles). Hash obstacles for O(1) step checks.",
      "recursiveComplexity": "Time O(total walked steps + obstacles); Space O(obstacles + commands recursion). Recursive command processor simulates steps.",
      "bruteForceCode": "class Solution {\n  public int robotSim(int[] commands, int[][] obstacles) {\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    int x = 0, y = 0, dir = 0, best = 0;\n    for (int command : commands) {\n      if (command == -2) dir = (dir + 3) % 4;\n      else if (command == -1) dir = (dir + 1) % 4;\n      else {\n        for (int step = 0; step < command; step++) {\n          int nx = x + dirs[dir][0], ny = y + dirs[dir][1];\n          if (blocked(nx, ny, obstacles)) break;\n          x = nx; y = ny;\n          best = Math.max(best, x * x + y * y);\n        }\n      }\n    }\n    return best;\n  }\n\n  private boolean blocked(int x, int y, int[][] obstacles) {\n    for (int[] obstacle : obstacles) if (obstacle[0] == x && obstacle[1] == y) return true;\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int robotSim(int[] commands, int[][] obstacles) {\n    Set<Long> blocked = new HashSet<>();\n    for (int[] obstacle : obstacles) blocked.add(key(obstacle[0], obstacle[1]));\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    int x = 0, y = 0, dir = 0, best = 0;\n    for (int command : commands) {\n      if (command == -2) dir = (dir + 3) % 4;\n      else if (command == -1) dir = (dir + 1) % 4;\n      else {\n        for (int step = 0; step < command; step++) {\n          int nx = x + dirs[dir][0], ny = y + dirs[dir][1];\n          if (blocked.contains(key(nx, ny))) break;\n          x = nx; y = ny;\n          best = Math.max(best, x * x + y * y);\n        }\n      }\n    }\n    return best;\n  }\n\n  private long key(int x, int y) {\n    return (((long) x) << 32) ^ (y & 0xffffffffL);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n  private Set<Long> blocked;\n\n  public int robotSim(int[] commands, int[][] obstacles) {\n    blocked = new HashSet<>();\n    for (int[] obstacle : obstacles) blocked.add(key(obstacle[0], obstacle[1]));\n    return run(commands, 0, 0, 0, 0, 0);\n  }\n\n  private int run(int[] commands, int index, int x, int y, int dir, int best) {\n    if (index == commands.length) return best;\n    int command = commands[index];\n    if (command == -2) return run(commands, index + 1, x, y, (dir + 3) % 4, best);\n    if (command == -1) return run(commands, index + 1, x, y, (dir + 1) % 4, best);\n    int[] moved = move(command, x, y, dir, best);\n    return run(commands, index + 1, moved[0], moved[1], dir, moved[2]);\n  }\n\n  private int[] move(int steps, int x, int y, int dir, int best) {\n    if (steps == 0) return new int[] {x, y, best};\n    int nx = x + dirs[dir][0], ny = y + dirs[dir][1];\n    if (blocked.contains(key(nx, ny))) return new int[] {x, y, best};\n    return move(steps - 1, nx, ny, dir, Math.max(best, nx * nx + ny * ny));\n  }\n\n  private long key(int x, int y) {\n    return (((long) x) << 32) ^ (y & 0xffffffffL);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int robotSim(int[] commands, int[][] obstacles) {\n    Set<Long> blocked = new HashSet<>();\n    for (int[] obstacle : obstacles) blocked.add(key(obstacle[0], obstacle[1]));\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    int x = 0, y = 0, dir = 0, best = 0;\n    for (int command : commands) {\n      if (command == -2) dir = (dir + 3) % 4;\n      else if (command == -1) dir = (dir + 1) % 4;\n      else {\n        for (int step = 0; step < command; step++) {\n          int nx = x + dirs[dir][0], ny = y + dirs[dir][1];\n          if (blocked.contains(key(nx, ny))) break;\n          x = nx; y = ny;\n          best = Math.max(best, x * x + y * y);\n        }\n      }\n    }\n    return best;\n  }\n\n  private long key(int x, int y) {\n    return (((long) x) << 32) ^ (y & 0xffffffffL);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int robotSim(int[] commands, int[][] obstacles) {\n    Set<Long> blocked = new HashSet<>();\n    for (int[] obstacle : obstacles) blocked.add(key(obstacle[0], obstacle[1]));\n    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};\n    int x = 0, y = 0, dir = 0, best = 0;\n    for (int command : commands) {\n      if (command == -2) dir = (dir + 3) % 4;\n      else if (command == -1) dir = (dir + 1) % 4;\n      else {\n        for (int step = 0; step < command; step++) {\n          int nx = x + dirs[dir][0], ny = y + dirs[dir][1];\n          if (blocked.contains(key(nx, ny))) break;\n          x = nx; y = ny;\n          best = Math.max(best, x * x + y * y);\n        }\n      }\n    }\n    return best;\n  }\n\n  private long key(int x, int y) {\n    return (((long) x) << 32) ^ (y & 0xffffffffL);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Projection Area of 3D Shapes",
      "difficulty": "Easy",
      "subpattern": "3D projection counting",
      "question": "Given a grid of stacked cubes, return the total area of projections onto xy, yz, and zx planes.",
      "trigger": "Projection area separates into nonzero cell count plus max height per row and per column.",
      "intuition": "Top view counts occupied cells, front view uses row maxima, and side view uses column maxima.",
      "edgeCases": "Zero cells, one cell, all equal heights, empty-looking row, and rectangular variants.",
      "constraints": "The LeetCode problem uses an n x n grid of non-negative heights.",
      "source": {
        "label": "LeetCode 883 - Projection Area of 3D Shapes",
        "url": "https://leetcode.com/problems/projection-area-of-3d-shapes/"
      },
      "examples": [
        {
          "input": "grid=[[1,2],[3,4]]",
          "output": "17",
          "explanation": "Top=4, row max=6, column max=7."
        },
        {
          "input": "grid=[[2]]",
          "output": "5",
          "explanation": "Top=1, front=2, side=2."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Directly count occupied cells and scan row/column maxima.",
      "optimizedComplexity": "Time O(n^2); Space O(1). One nested pass maintains row and column maxima.",
      "recursiveComplexity": "Time O(n^2); Space O(n) recursion depth. Recursive row scan computes projections.",
      "bruteForceCode": "class Solution {\n  public int projectionArea(int[][] grid) {\n    int n = grid.length;\n    int top = 0, front = 0, side = 0;\n    for (int row = 0; row < n; row++) {\n      int rowMax = 0;\n      for (int col = 0; col < n; col++) {\n        if (grid[row][col] > 0) top++;\n        rowMax = Math.max(rowMax, grid[row][col]);\n      }\n      front += rowMax;\n    }\n    for (int col = 0; col < n; col++) {\n      int colMax = 0;\n      for (int row = 0; row < n; row++) colMax = Math.max(colMax, grid[row][col]);\n      side += colMax;\n    }\n    return top + front + side;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int projectionArea(int[][] grid) {\n    int n = grid.length;\n    int[] colMax = new int[n];\n    int answer = 0;\n    for (int row = 0; row < n; row++) {\n      int rowMax = 0;\n      for (int col = 0; col < n; col++) {\n        if (grid[row][col] > 0) answer++;\n        rowMax = Math.max(rowMax, grid[row][col]);\n        colMax[col] = Math.max(colMax[col], grid[row][col]);\n      }\n      answer += rowMax;\n    }\n    for (int value : colMax) answer += value;\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int projectionArea(int[][] grid) {\n    int[] colMax = new int[grid.length];\n    return scanRows(grid, 0, colMax) + sum(colMax, 0);\n  }\n\n  private int scanRows(int[][] grid, int row, int[] colMax) {\n    if (row == grid.length) return 0;\n    int[] result = scanCols(grid, row, 0, colMax, 0, 0);\n    return result[0] + result[1] + scanRows(grid, row + 1, colMax);\n  }\n\n  private int[] scanCols(int[][] grid, int row, int col, int[] colMax, int top, int rowMax) {\n    if (col == grid.length) return new int[] {top, rowMax};\n    int value = grid[row][col];\n    if (value > 0) top++;\n    colMax[col] = Math.max(colMax[col], value);\n    return scanCols(grid, row, col + 1, colMax, top, Math.max(rowMax, value));\n  }\n\n  private int sum(int[] values, int index) {\n    if (index == values.length) return 0;\n    return values[index] + sum(values, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int projectionArea(int[][] grid) {\n    int n = grid.length;\n    int[] colMax = new int[n];\n    int answer = 0;\n    for (int row = 0; row < n; row++) {\n      int rowMax = 0;\n      for (int col = 0; col < n; col++) {\n        if (grid[row][col] > 0) answer++;\n        rowMax = Math.max(rowMax, grid[row][col]);\n        colMax[col] = Math.max(colMax[col], grid[row][col]);\n      }\n      answer += rowMax;\n    }\n    for (int value : colMax) answer += value;\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int projectionArea(int[][] grid) {\n    int n = grid.length;\n    int[] colMax = new int[n];\n    int answer = 0;\n    for (int row = 0; row < n; row++) {\n      int rowMax = 0;\n      for (int col = 0; col < n; col++) {\n        if (grid[row][col] > 0) answer++;\n        rowMax = Math.max(rowMax, grid[row][col]);\n        colMax[col] = Math.max(colMax[col], grid[row][col]);\n      }\n      answer += rowMax;\n    }\n    for (int value : colMax) answer += value;\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Largest Triangle Area",
      "difficulty": "Easy",
      "subpattern": "Shoelace and triangle area",
      "question": "Given points, return the largest area of any triangle formed by three of them.",
      "trigger": "Triangle area is half the absolute cross product of two vectors.",
      "intuition": "Enumerate triples and compute doubled area with integer arithmetic, then divide by 2.0.",
      "edgeCases": "All points collinear, duplicate points, negative coordinates, exactly three points, and fractional .5 areas.",
      "constraints": "n is small enough for O(n^3) triple enumeration.",
      "source": {
        "label": "LeetCode 812 - Largest Triangle Area",
        "url": "https://leetcode.com/problems/largest-triangle-area/"
      },
      "examples": [
        {
          "input": "points=[[0,0],[0,1],[1,0],[0,2],[2,0]]",
          "output": "2.0",
          "explanation": "Triangle (0,0),(0,2),(2,0) has area 2."
        },
        {
          "input": "points=[[1,0],[0,0],[0,1]]",
          "output": "0.5",
          "explanation": "The right triangle has area one half."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every triple.",
      "optimizedComplexity": "Time O(n^3); Space O(1). Triple enumeration is acceptable for the given constraints.",
      "recursiveComplexity": "Time O(n^3); Space O(n) recursion depth. Recursive triple loop computes the same max area.",
      "bruteForceCode": "class Solution {\n  public double largestTriangleArea(int[][] points) {\n    double best = 0;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        for (int k = j + 1; k < points.length; k++) {\n          best = Math.max(best, Math.abs(cross(points[i], points[j], points[k])) / 2.0);\n        }\n      }\n    }\n    return best;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "iterativeCode": "class Solution {\n  public double largestTriangleArea(int[][] points) {\n    int best2 = 0;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        for (int k = j + 1; k < points.length; k++) best2 = Math.max(best2, Math.abs(cross(points[i], points[j], points[k])));\n      }\n    }\n    return best2 / 2.0;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "recursiveCode": "class Solution {\n  public double largestTriangleArea(int[][] points) {\n    return triples(points, 0, 1, 2, 0) / 2.0;\n  }\n\n  private int triples(int[][] points, int i, int j, int k, int best) {\n    if (i == points.length - 2) return best;\n    if (j == points.length - 1) return triples(points, i + 1, i + 2, i + 3, best);\n    if (k == points.length) return triples(points, i, j + 1, j + 2, best);\n    best = Math.max(best, Math.abs(cross(points[i], points[j], points[k])));\n    return triples(points, i, j, k + 1, best);\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "optimizedCode": "class Solution {\n  public double largestTriangleArea(int[][] points) {\n    int best2 = 0;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        for (int k = j + 1; k < points.length; k++) best2 = Math.max(best2, Math.abs(cross(points[i], points[j], points[k])));\n      }\n    }\n    return best2 / 2.0;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "code": "class Solution {\n  public double largestTriangleArea(int[][] points) {\n    int best2 = 0;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        for (int k = j + 1; k < points.length; k++) best2 = Math.max(best2, Math.abs(cross(points[i], points[j], points[k])));\n      }\n    }\n    return best2 / 2.0;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Time Visiting All Points",
      "difficulty": "Easy",
      "subpattern": "Chebyshev distance on grid points",
      "question": "Given points in order, return the minimum time to visit them when each second can move horizontally, vertically, or diagonally by one.",
      "trigger": "The optimal time between two grid points is max(abs(dx), abs(dy)).",
      "intuition": "Use diagonal moves to reduce both coordinates together, then finish the larger remaining axis.",
      "edgeCases": "Single point, same consecutive point, vertical moves, negative coordinates, and diagonal-only moves.",
      "constraints": "Points are visited in the given order.",
      "source": {
        "label": "LeetCode 1266 - Minimum Time Visiting All Points",
        "url": "https://leetcode.com/problems/minimum-time-visiting-all-points/"
      },
      "examples": [
        {
          "input": "points=[[1,1],[3,4],[-1,0]]",
          "output": "7",
          "explanation": "Times are 3 and 4."
        },
        {
          "input": "points=[[3,2],[-2,2]]",
          "output": "5",
          "explanation": "Only x changes by five."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Sum Chebyshev distance between consecutive points.",
      "optimizedComplexity": "Time O(n); Space O(1). Direct formula per segment.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth. Recursive segment sum.",
      "bruteForceCode": "class Solution {\n  public int minTimeToVisitAllPoints(int[][] points) {\n    int time = 0;\n    for (int i = 1; i < points.length; i++) {\n      int dx = Math.abs(points[i][0] - points[i - 1][0]);\n      int dy = Math.abs(points[i][1] - points[i - 1][1]);\n      while (dx > 0 || dy > 0) {\n        if (dx > 0) dx--;\n        if (dy > 0) dy--;\n        time++;\n      }\n    }\n    return time;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minTimeToVisitAllPoints(int[][] points) {\n    int time = 0;\n    for (int i = 1; i < points.length; i++) {\n      int dx = Math.abs(points[i][0] - points[i - 1][0]);\n      int dy = Math.abs(points[i][1] - points[i - 1][1]);\n      time += Math.max(dx, dy);\n    }\n    return time;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minTimeToVisitAllPoints(int[][] points) {\n    return solve(points, 1);\n  }\n\n  private int solve(int[][] points, int index) {\n    if (index == points.length) return 0;\n    int dx = Math.abs(points[index][0] - points[index - 1][0]);\n    int dy = Math.abs(points[index][1] - points[index - 1][1]);\n    return Math.max(dx, dy) + solve(points, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minTimeToVisitAllPoints(int[][] points) {\n    int time = 0;\n    for (int i = 1; i < points.length; i++) {\n      int dx = Math.abs(points[i][0] - points[i - 1][0]);\n      int dy = Math.abs(points[i][1] - points[i - 1][1]);\n      time += Math.max(dx, dy);\n    }\n    return time;\n  }\n}",
      "code": "class Solution {\n  public int minTimeToVisitAllPoints(int[][] points) {\n    int time = 0;\n    for (int i = 1; i < points.length; i++) {\n      int dx = Math.abs(points[i][0] - points[i - 1][0]);\n      int dy = Math.abs(points[i][1] - points[i - 1][1]);\n      time += Math.max(dx, dy);\n    }\n    return time;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Erect the Fence",
      "difficulty": "Hard",
      "subpattern": "Monotonic chain convex hull",
      "question": "Given tree coordinates, return all trees on the boundary of the minimum fence enclosing all trees.",
      "trigger": "Need convex hull boundary points, including collinear points on hull edges.",
      "intuition": "Sort points and build lower and upper hulls; remove only right turns so collinear boundary points remain.",
      "edgeCases": "All points collinear, duplicate points, fewer than four points, vertical hull edges, and unordered output.",
      "constraints": "Return boundary points in any order for the LeetCode problem.",
      "source": {
        "label": "LeetCode 587 - Erect the Fence",
        "url": "https://leetcode.com/problems/erect-the-fence/"
      },
      "examples": [
        {
          "input": "trees=[[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]",
          "output": "boundary points",
          "explanation": "Interior point [2,2] is excluded."
        },
        {
          "input": "trees=[[1,2],[2,2],[4,2]]",
          "output": "all points",
          "explanation": "All points are collinear on the hull boundary."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(n). For every pair, keep points where all others lie on one side.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Monotonic chain builds the hull after sorting.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive scan appends points to lower and upper hulls.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] outerTrees(int[][] trees) {\n    if (trees.length <= 1) return trees;\n    Set<String> boundary = new HashSet<>();\n    for (int i = 0; i < trees.length; i++) {\n      for (int j = i + 1; j < trees.length; j++) {\n        int pos = 0, neg = 0;\n        for (int k = 0; k < trees.length; k++) {\n          int cross = cross(trees[i], trees[j], trees[k]);\n          if (cross > 0) pos++;\n          if (cross < 0) neg++;\n        }\n        if (pos == 0 || neg == 0) {\n          boundary.add(key(trees[i]));\n          boundary.add(key(trees[j]));\n        }\n      }\n    }\n    int[][] answer = new int[boundary.size()][2];\n    int index = 0;\n    for (String value : boundary) {\n      String[] parts = value.split(\":\");\n      answer[index++] = new int[] {Integer.parseInt(parts[0]), Integer.parseInt(parts[1])};\n    }\n    return answer;\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n\n  private String key(int[] p) { return p[0] + \":\" + p[1]; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] outerTrees(int[][] trees) {\n    if (trees.length <= 1) return trees;\n    Arrays.sort(trees, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);\n    List<int[]> hull = new ArrayList<>();\n    for (int[] tree : trees) {\n      while (hull.size() >= 2 && cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), tree) < 0) hull.remove(hull.size() - 1);\n      hull.add(tree);\n    }\n    int lowerSize = hull.size();\n    for (int i = trees.length - 2; i >= 0; i--) {\n      int[] tree = trees[i];\n      while (hull.size() > lowerSize && cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), tree) < 0) hull.remove(hull.size() - 1);\n      hull.add(tree);\n    }\n    Set<String> seen = new HashSet<>();\n    List<int[]> answer = new ArrayList<>();\n    for (int[] point : hull) if (seen.add(point[0] + \":\" + point[1])) answer.add(point);\n    return answer.toArray(new int[answer.size()][]);\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] outerTrees(int[][] trees) {\n    Arrays.sort(trees, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);\n    List<int[]> lower = build(trees, 0, 1, new ArrayList<>());\n    reverse(trees, 0, trees.length - 1);\n    List<int[]> upper = build(trees, 0, 1, new ArrayList<>());\n    Set<String> seen = new HashSet<>();\n    List<int[]> answer = new ArrayList<>();\n    collect(lower, 0, seen, answer);\n    collect(upper, 0, seen, answer);\n    return answer.toArray(new int[answer.size()][]);\n  }\n\n  private List<int[]> build(int[][] points, int index, int step, List<int[]> hull) {\n    if (index == points.length) return hull;\n    while (hull.size() >= 2 && cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), points[index]) < 0) hull.remove(hull.size() - 1);\n    hull.add(points[index]);\n    return build(points, index + step, step, hull);\n  }\n\n  private void collect(List<int[]> hull, int index, Set<String> seen, List<int[]> answer) {\n    if (index == hull.size()) return;\n    int[] p = hull.get(index);\n    if (seen.add(p[0] + \":\" + p[1])) answer.add(p);\n    collect(hull, index + 1, seen, answer);\n  }\n\n  private void reverse(int[][] points, int left, int right) {\n    while (left < right) { int[] t = points[left]; points[left++] = points[right]; points[right--] = t; }\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] outerTrees(int[][] trees) {\n    if (trees.length <= 1) return trees;\n    Arrays.sort(trees, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);\n    List<int[]> hull = new ArrayList<>();\n    for (int[] tree : trees) {\n      while (hull.size() >= 2 && cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), tree) < 0) hull.remove(hull.size() - 1);\n      hull.add(tree);\n    }\n    int lowerSize = hull.size();\n    for (int i = trees.length - 2; i >= 0; i--) {\n      int[] tree = trees[i];\n      while (hull.size() > lowerSize && cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), tree) < 0) hull.remove(hull.size() - 1);\n      hull.add(tree);\n    }\n    Set<String> seen = new HashSet<>();\n    List<int[]> answer = new ArrayList<>();\n    for (int[] point : hull) if (seen.add(point[0] + \":\" + point[1])) answer.add(point);\n    return answer.toArray(new int[answer.size()][]);\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] outerTrees(int[][] trees) {\n    if (trees.length <= 1) return trees;\n    Arrays.sort(trees, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);\n    List<int[]> hull = new ArrayList<>();\n    for (int[] tree : trees) {\n      while (hull.size() >= 2 && cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), tree) < 0) hull.remove(hull.size() - 1);\n      hull.add(tree);\n    }\n    int lowerSize = hull.size();\n    for (int i = trees.length - 2; i >= 0; i--) {\n      int[] tree = trees[i];\n      while (hull.size() > lowerSize && cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), tree) < 0) hull.remove(hull.size() - 1);\n      hull.add(tree);\n    }\n    Set<String> seen = new HashSet<>();\n    List<int[]> answer = new ArrayList<>();\n    for (int[] point : hull) if (seen.add(point[0] + \":\" + point[1])) answer.add(point);\n    return answer.toArray(new int[answer.size()][]);\n  }\n\n  private int cross(int[] a, int[] b, int[] c) {\n    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Detect Squares",
      "difficulty": "Medium",
      "subpattern": "Point-pair square counting",
      "question": "Design DetectSquares with add(point) and count(point), returning how many axis-aligned squares can be formed using the query point.",
      "trigger": "For a query point, every stored diagonal point determines two possible square corners.",
      "intuition": "Count point multiplicities and multiply the counts of the three required non-query corners.",
      "edgeCases": "Duplicate added points, zero side length, missing one corner, negative-style variants, and repeated queries.",
      "constraints": "Coordinates are small in LeetCode, but map-based counting is simpler and general.",
      "source": {
        "label": "LeetCode 2013 - Detect Squares",
        "url": "https://leetcode.com/problems/detect-squares/"
      },
      "examples": [
        {
          "input": "add [3,10], [11,2], [3,2]; count [11,10]",
          "output": "1",
          "explanation": "One square of side length 8 exists."
        },
        {
          "input": "add [11,2] again; count [11,10]",
          "output": "2",
          "explanation": "Duplicate points multiply the count."
        }
      ],
      "bruteForceComplexity": "add Time O(1), count Time O(n); Space O(n). Scan all added points as possible diagonals.",
      "optimizedComplexity": "add Time O(1), count Time O(m); Space O(m). Hash multiplicities and scan unique points.",
      "recursiveComplexity": "add Time O(1), count Time O(m); Space O(m + recursion depth). Recursive scan over unique points.",
      "bruteForceCode": "import java.util.*;\n\nclass DetectSquares {\n  private final List<int[]> points = new ArrayList<>();\n  private final Map<String, Integer> count = new HashMap<>();\n\n  public void add(int[] point) {\n    points.add(point.clone());\n    count.put(key(point[0], point[1]), count.getOrDefault(key(point[0], point[1]), 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : points) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (Math.abs(dx) == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      answer += count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass DetectSquares {\n  private final Map<String, Integer> count = new HashMap<>();\n  private final List<int[]> unique = new ArrayList<>();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : unique) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (dx == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      int diagonalCount = count.get(key(diagonal[0], diagonal[1]));\n      answer += diagonalCount * count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass DetectSquares {\n  private final Map<String, Integer> count = new HashMap<>();\n  private final List<int[]> unique = new ArrayList<>();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    return scan(point, 0);\n  }\n\n  private int scan(int[] point, int index) {\n    if (index == unique.size()) return 0;\n    int[] diagonal = unique.get(index);\n    int answer = 0;\n    int dx = diagonal[0] - point[0], dy = diagonal[1] - point[1];\n    if (dx != 0 && Math.abs(dx) == Math.abs(dy)) {\n      answer = count.get(key(diagonal[0], diagonal[1]))\n          * count.getOrDefault(key(point[0], diagonal[1]), 0)\n          * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer + scan(point, index + 1);\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "optimizedCode": "import java.util.*;\n\nclass DetectSquares {\n  private final Map<String, Integer> count = new HashMap<>();\n  private final List<int[]> unique = new ArrayList<>();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : unique) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (dx == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      int diagonalCount = count.get(key(diagonal[0], diagonal[1]));\n      answer += diagonalCount * count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "code": "import java.util.*;\n\nclass DetectSquares {\n  private final Map<String, Integer> count = new HashMap<>();\n  private final List<int[]> unique = new ArrayList<>();\n\n  public void add(int[] point) {\n    String key = key(point[0], point[1]);\n    if (!count.containsKey(key)) unique.add(point.clone());\n    count.put(key, count.getOrDefault(key, 0) + 1);\n  }\n\n  public int count(int[] point) {\n    int answer = 0;\n    for (int[] diagonal : unique) {\n      int dx = diagonal[0] - point[0];\n      int dy = diagonal[1] - point[1];\n      if (dx == 0 || Math.abs(dx) != Math.abs(dy)) continue;\n      int diagonalCount = count.get(key(diagonal[0], diagonal[1]));\n      answer += diagonalCount * count.getOrDefault(key(point[0], diagonal[1]), 0) * count.getOrDefault(key(diagonal[0], point[1]), 0);\n    }\n    return answer;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}"
    },
    {
      "group": "advanced",
      "name": "Rectangle Area",
      "difficulty": "Medium",
      "subpattern": "Union area by inclusion-exclusion",
      "question": "Given two axis-aligned rectangles, return their total covered area.",
      "trigger": "Union area for two rectangles is area(A) + area(B) - overlap area.",
      "intuition": "Compute overlap width and height independently; subtract only positive overlap area.",
      "edgeCases": "No overlap, edge-touching, one rectangle inside another, negative coordinates, and large coordinates.",
      "constraints": "Use long internally if coordinate bounds are expanded; LeetCode return fits int.",
      "source": {
        "label": "LeetCode 223 - Rectangle Area",
        "url": "https://leetcode.com/problems/rectangle-area/"
      },
      "examples": [
        {
          "input": "A=(-3,0,3,4), B=(0,-1,9,2)",
          "output": "45",
          "explanation": "Area 24 + 27 - overlap 6."
        },
        {
          "input": "A=(-2,-2,2,2), B=(-2,-2,2,2)",
          "output": "16",
          "explanation": "Identical rectangles overlap completely."
        }
      ],
      "bruteForceComplexity": "Time O(width * height) only for tiny coordinate grids; Space O(number of covered lattice cells).",
      "optimizedComplexity": "Time O(1); Space O(1). Inclusion-exclusion with projection overlap.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive interval overlap helper computes width and height.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {\n    long areaA = (long) (ax2 - ax1) * (ay2 - ay1);\n    long areaB = (long) (bx2 - bx1) * (by2 - by1);\n    long overlapW = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n    long overlapH = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n    return (int) (areaA + areaB - overlapW * overlapH);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {\n    int areaA = (ax2 - ax1) * (ay2 - ay1);\n    int areaB = (bx2 - bx1) * (by2 - by1);\n    int overlapWidth = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n    int overlapHeight = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n    return areaA + areaB - overlapWidth * overlapHeight;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {\n    int areaA = (ax2 - ax1) * (ay2 - ay1);\n    int areaB = (bx2 - bx1) * (by2 - by1);\n    return areaA + areaB - overlap(new int[] {ax1, ax2}, new int[] {bx1, bx2}, 0)\n        * overlap(new int[] {ay1, ay2}, new int[] {by1, by2}, 0);\n  }\n\n  private int overlap(int[] a, int[] b, int depth) {\n    return Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0]));\n  }\n}",
      "optimizedCode": "class Solution {\n  public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {\n    int areaA = (ax2 - ax1) * (ay2 - ay1);\n    int areaB = (bx2 - bx1) * (by2 - by1);\n    int overlapWidth = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n    int overlapHeight = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n    return areaA + areaB - overlapWidth * overlapHeight;\n  }\n}",
      "code": "class Solution {\n  public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {\n    int areaA = (ax2 - ax1) * (ay2 - ay1);\n    int areaB = (bx2 - bx1) * (by2 - by1);\n    int overlapWidth = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));\n    int overlapHeight = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));\n    return areaA + areaB - overlapWidth * overlapHeight;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Circle and Rectangle Overlapping",
      "difficulty": "Medium",
      "subpattern": "Circle-rectangle closest point test",
      "question": "Given a circle and an axis-aligned rectangle, return true if they overlap.",
      "trigger": "Circle-rectangle overlap is decided by the closest rectangle point to the circle center.",
      "intuition": "Clamp the circle center to the rectangle bounds, then compare squared distance to radius squared.",
      "edgeCases": "Circle center inside rectangle, tangent boundary, rectangle corner nearest, radius zero, and negative coordinates.",
      "constraints": "Use squared distances to avoid square root precision issues.",
      "source": {
        "label": "LeetCode 1401 - Circle and Rectangle Overlapping",
        "url": "https://leetcode.com/problems/circle-and-rectangle-overlapping/"
      },
      "examples": [
        {
          "input": "radius=1, center=(0,0), rect=(1,-1,3,1)",
          "output": "true",
          "explanation": "The circle touches the rectangle edge."
        },
        {
          "input": "radius=1, center=(0,0), rect=(2,2,3,3)",
          "output": "false",
          "explanation": "The nearest corner is too far."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). Check closest point using clamp.",
      "optimizedComplexity": "Time O(1); Space O(1). Clamp center to rectangle and compare squared distance.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive clamp computes x and y closest coordinates.",
      "bruteForceCode": "class Solution {\n  public boolean checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {\n    int closestX = Math.max(x1, Math.min(xCenter, x2));\n    int closestY = Math.max(y1, Math.min(yCenter, y2));\n    int dx = closestX - xCenter;\n    int dy = closestY - yCenter;\n    return dx * dx + dy * dy <= radius * radius;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {\n    int closestX = clamp(xCenter, x1, x2);\n    int closestY = clamp(yCenter, y1, y2);\n    int dx = closestX - xCenter;\n    int dy = closestY - yCenter;\n    return dx * dx + dy * dy <= radius * radius;\n  }\n\n  private int clamp(int value, int low, int high) {\n    if (value < low) return low;\n    if (value > high) return high;\n    return value;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {\n    int closestX = clamp(xCenter, x1, x2);\n    int closestY = clamp(yCenter, y1, y2);\n    int dx = closestX - xCenter;\n    int dy = closestY - yCenter;\n    return dx * dx + dy * dy <= radius * radius;\n  }\n\n  private int clamp(int value, int low, int high) {\n    if (value < low) return low;\n    if (value > high) return high;\n    return value;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {\n    int closestX = clamp(xCenter, x1, x2);\n    int closestY = clamp(yCenter, y1, y2);\n    int dx = closestX - xCenter;\n    int dy = closestY - yCenter;\n    return dx * dx + dy * dy <= radius * radius;\n  }\n\n  private int clamp(int value, int low, int high) {\n    if (value < low) return low;\n    if (value > high) return high;\n    return value;\n  }\n}",
      "code": "class Solution {\n  public boolean checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {\n    int closestX = clamp(xCenter, x1, x2);\n    int closestY = clamp(yCenter, y1, y2);\n    int dx = closestX - xCenter;\n    int dy = closestY - yCenter;\n    return dx * dx + dy * dy <= radius * radius;\n  }\n\n  private int clamp(int value, int low, int high) {\n    if (value < low) return low;\n    if (value > high) return high;\n    return value;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Queries on Number of Points Inside a Circle",
      "difficulty": "Medium",
      "subpattern": "Circle query point counting",
      "question": "Given points and circle queries [x,y,r], return how many points lie inside or on each circle.",
      "trigger": "Each query is a squared-distance containment count.",
      "intuition": "For every query, compare squared distance from query center to each point against r squared.",
      "edgeCases": "Point on boundary, radius zero, duplicate points, negative coordinates, and no points inside.",
      "constraints": "The direct O(points * queries) solution is accepted for the LeetCode constraints.",
      "source": {
        "label": "LeetCode 1828 - Queries on Number of Points Inside a Circle",
        "url": "https://leetcode.com/problems/queries-on-number-of-points-inside-a-circle/"
      },
      "examples": [
        {
          "input": "points=[[1,3],[3,3],[5,3],[2,2]], queries=[[2,3,1],[4,3,1],[1,1,2]]",
          "output": "[3,2,2]",
          "explanation": "Boundary points count as inside."
        },
        {
          "input": "points=[[1,1]], queries=[[1,1,0]]",
          "output": "[1]",
          "explanation": "Radius zero includes the center point."
        }
      ],
      "bruteForceComplexity": "Time O(pq); Space O(1) excluding output. Directly test every point for every query.",
      "optimizedComplexity": "Time O(pq); Space O(1) excluding output. Squared-distance check avoids floating point.",
      "recursiveComplexity": "Time O(pq); Space O(p + q) recursion depth. Recursive query and point scans.",
      "bruteForceCode": "class Solution {\n  public int[] countPoints(int[][] points, int[][] queries) {\n    int[] answer = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int count = 0;\n      for (int[] point : points) {\n        int dx = point[0] - queries[i][0];\n        int dy = point[1] - queries[i][1];\n        if (dx * dx + dy * dy <= queries[i][2] * queries[i][2]) count++;\n      }\n      answer[i] = count;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] countPoints(int[][] points, int[][] queries) {\n    int[] answer = new int[queries.length];\n    for (int q = 0; q < queries.length; q++) {\n      int cx = queries[q][0], cy = queries[q][1], r = queries[q][2];\n      int radius2 = r * r;\n      for (int[] point : points) {\n        int dx = point[0] - cx, dy = point[1] - cy;\n        if (dx * dx + dy * dy <= radius2) answer[q]++;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] countPoints(int[][] points, int[][] queries) {\n    int[] answer = new int[queries.length];\n    solveQuery(points, queries, 0, answer);\n    return answer;\n  }\n\n  private void solveQuery(int[][] points, int[][] queries, int q, int[] answer) {\n    if (q == queries.length) return;\n    answer[q] = count(points, queries[q], 0);\n    solveQuery(points, queries, q + 1, answer);\n  }\n\n  private int count(int[][] points, int[] query, int index) {\n    if (index == points.length) return 0;\n    int dx = points[index][0] - query[0], dy = points[index][1] - query[1];\n    int inside = dx * dx + dy * dy <= query[2] * query[2] ? 1 : 0;\n    return inside + count(points, query, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] countPoints(int[][] points, int[][] queries) {\n    int[] answer = new int[queries.length];\n    for (int q = 0; q < queries.length; q++) {\n      int cx = queries[q][0], cy = queries[q][1], r = queries[q][2];\n      int radius2 = r * r;\n      for (int[] point : points) {\n        int dx = point[0] - cx, dy = point[1] - cy;\n        if (dx * dx + dy * dy <= radius2) answer[q]++;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[] countPoints(int[][] points, int[][] queries) {\n    int[] answer = new int[queries.length];\n    for (int q = 0; q < queries.length; q++) {\n      int cx = queries[q][0], cy = queries[q][1], r = queries[q][2];\n      int radius2 = r * r;\n      for (int[] point : points) {\n        int dx = point[0] - cx, dy = point[1] - cy;\n        if (dx * dx + dy * dy <= radius2) answer[q]++;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Number of Boomerangs",
      "difficulty": "Medium",
      "subpattern": "Equal-distance boomerang counting",
      "question": "Given points, return the number of ordered tuples (i,j,k) such that distance(i,j) equals distance(i,k).",
      "trigger": "For each anchor i, points at the same squared distance can be permuted as ordered pairs.",
      "intuition": "Count points by squared distance from each anchor; each bucket of size c contributes c*(c-1).",
      "edgeCases": "Duplicate points, many equal distances, one point, negative coordinates, and ordered tuple counting.",
      "constraints": "Use squared distances and hash counts per anchor.",
      "source": {
        "label": "LeetCode 447 - Number of Boomerangs",
        "url": "https://leetcode.com/problems/number-of-boomerangs/"
      },
      "examples": [
        {
          "input": "points=[[0,0],[1,0],[2,0]]",
          "output": "2",
          "explanation": "Anchor [1,0] forms two ordered tuples."
        },
        {
          "input": "points=[[1,1],[2,2],[3,3]]",
          "output": "2",
          "explanation": "The middle point is equidistant from the other two."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every ordered tuple.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Hash squared-distance counts per anchor.",
      "recursiveComplexity": "Time O(n^2); Space O(n + recursion depth). Recursive anchor processing.",
      "bruteForceCode": "class Solution {\n  public int numberOfBoomerangs(int[][] points) {\n    int answer = 0;\n    for (int i = 0; i < points.length; i++) {\n      for (int j = 0; j < points.length; j++) {\n        for (int k = 0; k < points.length; k++) {\n          if (i != j && i != k && j != k && dist(points[i], points[j]) == dist(points[i], points[k])) answer++;\n        }\n      }\n    }\n    return answer;\n  }\n\n  private int dist(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfBoomerangs(int[][] points) {\n    int answer = 0;\n    for (int[] anchor : points) {\n      Map<Integer, Integer> count = new HashMap<>();\n      for (int[] point : points) {\n        int d = dist(anchor, point);\n        int previous = count.getOrDefault(d, 0);\n        answer += 2 * previous;\n        count.put(d, previous + 1);\n      }\n    }\n    return answer;\n  }\n\n  private int dist(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfBoomerangs(int[][] points) {\n    return anchors(points, 0);\n  }\n\n  private int anchors(int[][] points, int index) {\n    if (index == points.length) return 0;\n    Map<Integer, Integer> count = new HashMap<>();\n    return scan(points, index, 0, count, 0) + anchors(points, index + 1);\n  }\n\n  private int scan(int[][] points, int anchor, int index, Map<Integer, Integer> count, int answer) {\n    if (index == points.length) return answer;\n    int d = dist(points[anchor], points[index]);\n    int previous = count.getOrDefault(d, 0);\n    count.put(d, previous + 1);\n    return scan(points, anchor, index + 1, count, answer + 2 * previous);\n  }\n\n  private int dist(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfBoomerangs(int[][] points) {\n    int answer = 0;\n    for (int[] anchor : points) {\n      Map<Integer, Integer> count = new HashMap<>();\n      for (int[] point : points) {\n        int d = dist(anchor, point);\n        int previous = count.getOrDefault(d, 0);\n        answer += 2 * previous;\n        count.put(d, previous + 1);\n      }\n    }\n    return answer;\n  }\n\n  private int dist(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numberOfBoomerangs(int[][] points) {\n    int answer = 0;\n    for (int[] anchor : points) {\n      Map<Integer, Integer> count = new HashMap<>();\n      for (int[] point : points) {\n        int d = dist(anchor, point);\n        int previous = count.getOrDefault(d, 0);\n        answer += 2 * previous;\n        count.put(d, previous + 1);\n      }\n    }\n    return answer;\n  }\n\n  private int dist(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Line Reflection",
      "difficulty": "Medium",
      "subpattern": "Reflection axis with point pairing",
      "question": "Given points, return true if there is a vertical line x = c that reflects every point to another point in the set.",
      "trigger": "A vertical reflection keeps y the same and pairs x values around one shared center sum.",
      "intuition": "The reflection axis must be halfway between minX and maxX, so each point (x,y) needs (minX+maxX-x,y).",
      "edgeCases": "Duplicate points, all points on the reflection line, negative coordinates, missing reflected pair, and multiple y levels.",
      "constraints": "Use minX + maxX as an integer doubled-axis key to avoid fractions.",
      "source": {
        "label": "LeetCode 356 - Line Reflection",
        "url": "https://leetcode.com/problems/line-reflection/"
      },
      "examples": [
        {
          "input": "points=[[1,1],[-1,1]]",
          "output": "true",
          "explanation": "The reflection line is x=0."
        },
        {
          "input": "points=[[1,1],[-1,-1]]",
          "output": "false",
          "explanation": "The reflected y coordinate does not match."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Try candidate axis sums from pairs and validate all points.",
      "optimizedComplexity": "Time O(n); Space O(n). Use minX+maxX as the only possible doubled axis.",
      "recursiveComplexity": "Time O(n); Space O(n + recursion depth). Recursive point validation against the set.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean isReflected(int[][] points) {\n    Set<String> set = new HashSet<>();\n    for (int[] point : points) set.add(key(point[0], point[1]));\n    for (int[] a : points) {\n      for (int[] b : points) {\n        int sum = a[0] + b[0];\n        boolean ok = true;\n        for (int[] point : points) {\n          if (!set.contains(key(sum - point[0], point[1]))) { ok = false; break; }\n        }\n        if (ok) return true;\n      }\n    }\n    return false;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean isReflected(int[][] points) {\n    int minX = Integer.MAX_VALUE, maxX = Integer.MIN_VALUE;\n    Set<String> set = new HashSet<>();\n    for (int[] point : points) {\n      minX = Math.min(minX, point[0]);\n      maxX = Math.max(maxX, point[0]);\n      set.add(key(point[0], point[1]));\n    }\n    int sum = minX + maxX;\n    for (int[] point : points) if (!set.contains(key(sum - point[0], point[1]))) return false;\n    return true;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean isReflected(int[][] points) {\n    int minX = Integer.MAX_VALUE, maxX = Integer.MIN_VALUE;\n    Set<String> set = new HashSet<>();\n    for (int[] point : points) {\n      minX = Math.min(minX, point[0]);\n      maxX = Math.max(maxX, point[0]);\n      set.add(key(point[0], point[1]));\n    }\n    return check(points, 0, set, minX + maxX);\n  }\n\n  private boolean check(int[][] points, int index, Set<String> set, int sum) {\n    if (index == points.length) return true;\n    return set.contains(key(sum - points[index][0], points[index][1])) && check(points, index + 1, set, sum);\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean isReflected(int[][] points) {\n    int minX = Integer.MAX_VALUE, maxX = Integer.MIN_VALUE;\n    Set<String> set = new HashSet<>();\n    for (int[] point : points) {\n      minX = Math.min(minX, point[0]);\n      maxX = Math.max(maxX, point[0]);\n      set.add(key(point[0], point[1]));\n    }\n    int sum = minX + maxX;\n    for (int[] point : points) if (!set.contains(key(sum - point[0], point[1]))) return false;\n    return true;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean isReflected(int[][] points) {\n    int minX = Integer.MAX_VALUE, maxX = Integer.MIN_VALUE;\n    Set<String> set = new HashSet<>();\n    for (int[] point : points) {\n      minX = Math.min(minX, point[0]);\n      maxX = Math.max(maxX, point[0]);\n      set.add(key(point[0], point[1]));\n    }\n    int sum = minX + maxX;\n    for (int[] point : points) if (!set.contains(key(sum - point[0], point[1]))) return false;\n    return true;\n  }\n\n  private String key(int x, int y) { return x + \":\" + y; }\n}"
    },
    {
      "group": "advanced",
      "name": "Self Crossing",
      "difficulty": "Hard",
      "subpattern": "Self-crossing local segment cases",
      "question": "Given distances for moves north, west, south, east repeating, return true if the path crosses itself.",
      "trigger": "The path turns left every move, so any new segment can only cross a small set of recent segments.",
      "intuition": "Check the three canonical crossing cases involving the current segment and segments 3, 4, or 5 steps back.",
      "edgeCases": "Immediate fourth-edge crossing, touching overlap, spiral expanding outward, spiral shrinking inward, and short arrays.",
      "constraints": "O(n) local checks are enough; full segment intersection is unnecessary.",
      "source": {
        "label": "LeetCode 335 - Self Crossing",
        "url": "https://leetcode.com/problems/self-crossing/"
      },
      "examples": [
        {
          "input": "distance=[2,1,1,2]",
          "output": "true",
          "explanation": "The fourth segment crosses the first."
        },
        {
          "input": "distance=[1,2,3,4]",
          "output": "false",
          "explanation": "The path expands without crossing."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Local crossing cases cover all possibilities for this left-turn path.",
      "optimizedComplexity": "Time O(n); Space O(1). Check only constant-size recent history.",
      "recursiveComplexity": "Time O(n); Space O(n) recursion depth. Recursive index scan applies the same local cases.",
      "bruteForceCode": "class Solution {\n  public boolean isSelfCrossing(int[] distance) {\n    for (int i = 3; i < distance.length; i++) {\n      if (distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3]) return true;\n      if (i >= 4 && distance[i - 1] == distance[i - 3]\n          && distance[i] + distance[i - 4] >= distance[i - 2]) return true;\n      if (i >= 5 && distance[i - 2] >= distance[i - 4]\n          && distance[i] + distance[i - 4] >= distance[i - 2]\n          && distance[i - 1] <= distance[i - 3]\n          && distance[i - 1] + distance[i - 5] >= distance[i - 3]) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isSelfCrossing(int[] distance) {\n    for (int i = 3; i < distance.length; i++) {\n      boolean caseOne = distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3];\n      boolean caseTwo = i >= 4 && distance[i - 1] == distance[i - 3]\n          && distance[i] + distance[i - 4] >= distance[i - 2];\n      boolean caseThree = i >= 5 && distance[i - 2] >= distance[i - 4]\n          && distance[i] + distance[i - 4] >= distance[i - 2]\n          && distance[i - 1] <= distance[i - 3]\n          && distance[i - 1] + distance[i - 5] >= distance[i - 3];\n      if (caseOne || caseTwo || caseThree) return true;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isSelfCrossing(int[] distance) {\n    return check(distance, 3);\n  }\n\n  private boolean check(int[] d, int i) {\n    if (i == d.length) return false;\n    boolean caseOne = d[i] >= d[i - 2] && d[i - 1] <= d[i - 3];\n    boolean caseTwo = i >= 4 && d[i - 1] == d[i - 3] && d[i] + d[i - 4] >= d[i - 2];\n    boolean caseThree = i >= 5 && d[i - 2] >= d[i - 4]\n        && d[i] + d[i - 4] >= d[i - 2]\n        && d[i - 1] <= d[i - 3]\n        && d[i - 1] + d[i - 5] >= d[i - 3];\n    return caseOne || caseTwo || caseThree || check(d, i + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isSelfCrossing(int[] distance) {\n    for (int i = 3; i < distance.length; i++) {\n      boolean caseOne = distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3];\n      boolean caseTwo = i >= 4 && distance[i - 1] == distance[i - 3]\n          && distance[i] + distance[i - 4] >= distance[i - 2];\n      boolean caseThree = i >= 5 && distance[i - 2] >= distance[i - 4]\n          && distance[i] + distance[i - 4] >= distance[i - 2]\n          && distance[i - 1] <= distance[i - 3]\n          && distance[i - 1] + distance[i - 5] >= distance[i - 3];\n      if (caseOne || caseTwo || caseThree) return true;\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean isSelfCrossing(int[] distance) {\n    for (int i = 3; i < distance.length; i++) {\n      boolean caseOne = distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3];\n      boolean caseTwo = i >= 4 && distance[i - 1] == distance[i - 3]\n          && distance[i] + distance[i - 4] >= distance[i - 2];\n      boolean caseThree = i >= 5 && distance[i - 2] >= distance[i - 4]\n          && distance[i] + distance[i - 4] >= distance[i - 2]\n          && distance[i - 1] <= distance[i - 3]\n          && distance[i - 1] + distance[i - 5] >= distance[i - 3];\n      if (caseOne || caseTwo || caseThree) return true;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Rectangle Area II",
      "difficulty": "Hard",
      "subpattern": "Rectangle union area sweep/compression",
      "question": "Given axis-aligned rectangles as [x1,y1,x2,y2], return the total area covered by their union modulo 1,000,000,007.",
      "trigger": "Multiple rectangles can overlap, so individual areas double-count unless the plane is partitioned or swept by x-events.",
      "intuition": "Track the y-length currently covered between consecutive x-coordinates and add width times covered height.",
      "edgeCases": "Huge coordinates, full containment, shared edges with zero overlap area, many rectangles ending and starting at the same x, and modulo overflow.",
      "constraints": "Rectangles are axis-aligned with x1 < x2 and y1 < y2; coordinates may be very large, so do not allocate by coordinate value.",
      "source": {
        "label": "LeetCode 850 - Rectangle Area II",
        "url": "https://leetcode.com/problems/rectangle-area-ii/"
      },
      "examples": [
        {
          "input": "rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]",
          "output": "6",
          "explanation": "The union covers six unit cells after overlaps are counted once."
        },
        {
          "input": "rectangles = [[0,0,1000000000,1000000000]]",
          "output": "49",
          "explanation": "10^18 is returned modulo 1,000,000,007."
        }
      ],
      "bruteForceComplexity": "Time O(R * X * Y); Space O(X * Y), where X and Y are distinct compressed coordinate counts.",
      "optimizedComplexity": "Time O(R^2 log R); Space O(R). Sweep x-events and recompute active y-union length.",
      "recursiveComplexity": "Time O(R^2 log R); Space O(R) plus O(R) recursion depth for event processing.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int rectangleArea(int[][] rectangles) {\n    TreeSet<Integer> xs = new TreeSet<>();\n    TreeSet<Integer> ys = new TreeSet<>();\n    for (int[] rectangle : rectangles) {\n      xs.add(rectangle[0]);\n      xs.add(rectangle[2]);\n      ys.add(rectangle[1]);\n      ys.add(rectangle[3]);\n    }\n\n    int[] xValues = toArray(xs);\n    int[] yValues = toArray(ys);\n    Map<Integer, Integer> xIndex = indexMap(xValues);\n    Map<Integer, Integer> yIndex = indexMap(yValues);\n    boolean[][] covered = new boolean[xValues.length - 1][yValues.length - 1];\n\n    for (int[] rectangle : rectangles) {\n      for (int x = xIndex.get(rectangle[0]); x < xIndex.get(rectangle[2]); x++) {\n        for (int y = yIndex.get(rectangle[1]); y < yIndex.get(rectangle[3]); y++) {\n          covered[x][y] = true;\n        }\n      }\n    }\n\n    long area = 0;\n    for (int x = 0; x < covered.length; x++) {\n      for (int y = 0; y < covered[x].length; y++) {\n        if (covered[x][y]) {\n          long width = xValues[x + 1] - (long) xValues[x];\n          long height = yValues[y + 1] - (long) yValues[y];\n          area = (area + width * height) % MOD;\n        }\n      }\n    }\n    return (int) area;\n  }\n\n  private int[] toArray(TreeSet<Integer> values) {\n    int[] result = new int[values.size()];\n    int index = 0;\n    for (int value : values) result[index++] = value;\n    return result;\n  }\n\n  private Map<Integer, Integer> indexMap(int[] values) {\n    Map<Integer, Integer> index = new HashMap<>();\n    for (int i = 0; i < values.length; i++) index.put(values[i], i);\n    return index;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int rectangleArea(int[][] rectangles) {\n    List<int[]> events = new ArrayList<>();\n    for (int[] rectangle : rectangles) {\n      events.add(new int[] {rectangle[0], 1, rectangle[1], rectangle[3]});\n      events.add(new int[] {rectangle[2], -1, rectangle[1], rectangle[3]});\n    }\n    events.sort(Comparator.comparingInt(event -> event[0]));\n\n    List<int[]> active = new ArrayList<>();\n    long area = 0;\n    int previousX = events.get(0)[0];\n    int index = 0;\n    while (index < events.size()) {\n      int x = events.get(index)[0];\n      area = (area + (long) (x - previousX) * coveredY(active)) % MOD;\n\n      while (index < events.size() && events.get(index)[0] == x) {\n        int[] event = events.get(index++);\n        if (event[1] == 1) {\n          active.add(new int[] {event[2], event[3]});\n        } else {\n          removeInterval(active, event[2], event[3]);\n        }\n      }\n      previousX = x;\n    }\n    return (int) area;\n  }\n\n  private long coveredY(List<int[]> intervals) {\n    if (intervals.isEmpty()) return 0;\n    intervals.sort(Comparator.comparingInt(interval -> interval[0]));\n    long covered = 0;\n    int start = intervals.get(0)[0], end = intervals.get(0)[1];\n    for (int i = 1; i < intervals.size(); i++) {\n      int[] interval = intervals.get(i);\n      if (interval[0] > end) {\n        covered += end - (long) start;\n        start = interval[0];\n        end = interval[1];\n      } else {\n        end = Math.max(end, interval[1]);\n      }\n    }\n    return covered + end - (long) start;\n  }\n\n  private void removeInterval(List<int[]> active, int start, int end) {\n    for (int i = 0; i < active.size(); i++) {\n      int[] interval = active.get(i);\n      if (interval[0] == start && interval[1] == end) {\n        active.remove(i);\n        return;\n      }\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int rectangleArea(int[][] rectangles) {\n    List<int[]> events = new ArrayList<>();\n    for (int[] rectangle : rectangles) {\n      events.add(new int[] {rectangle[0], 1, rectangle[1], rectangle[3]});\n      events.add(new int[] {rectangle[2], -1, rectangle[1], rectangle[3]});\n    }\n    events.sort(Comparator.comparingInt(event -> event[0]));\n    return (int) sweep(events, 0, events.get(0)[0], new ArrayList<>(), 0L);\n  }\n\n  private long sweep(List<int[]> events, int index, int previousX, List<int[]> active, long area) {\n    if (index == events.size()) return area % MOD;\n    int x = events.get(index)[0];\n    long nextArea = (area + (long) (x - previousX) * coveredY(active, 0, 0, 0, false)) % MOD;\n    int nextIndex = applyEvents(events, index, x, active);\n    return sweep(events, nextIndex, x, active, nextArea);\n  }\n\n  private int applyEvents(List<int[]> events, int index, int x, List<int[]> active) {\n    if (index == events.size() || events.get(index)[0] != x) return index;\n    int[] event = events.get(index);\n    if (event[1] == 1) active.add(new int[] {event[2], event[3]});\n    else removeInterval(active, event[2], event[3], 0);\n    return applyEvents(events, index + 1, x, active);\n  }\n\n  private long coveredY(List<int[]> intervals, int index, int start, int end, boolean open) {\n    intervals.sort(Comparator.comparingInt(interval -> interval[0]));\n    if (index == intervals.size()) return open ? end - (long) start : 0;\n    int[] interval = intervals.get(index);\n    if (!open) return coveredY(intervals, index + 1, interval[0], interval[1], true);\n    if (interval[0] > end) {\n      return end - (long) start + coveredY(intervals, index + 1, interval[0], interval[1], true);\n    }\n    return coveredY(intervals, index + 1, start, Math.max(end, interval[1]), true);\n  }\n\n  private void removeInterval(List<int[]> active, int start, int end, int index) {\n    if (index == active.size()) return;\n    int[] interval = active.get(index);\n    if (interval[0] == start && interval[1] == end) {\n      active.remove(index);\n      return;\n    }\n    removeInterval(active, start, end, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int rectangleArea(int[][] rectangles) {\n    List<int[]> events = new ArrayList<>();\n    for (int[] rectangle : rectangles) {\n      events.add(new int[] {rectangle[0], 1, rectangle[1], rectangle[3]});\n      events.add(new int[] {rectangle[2], -1, rectangle[1], rectangle[3]});\n    }\n    events.sort(Comparator.comparingInt(event -> event[0]));\n\n    List<int[]> active = new ArrayList<>();\n    long area = 0;\n    int previousX = events.get(0)[0];\n    int index = 0;\n    while (index < events.size()) {\n      int x = events.get(index)[0];\n      area = (area + (long) (x - previousX) * coveredY(active)) % MOD;\n\n      while (index < events.size() && events.get(index)[0] == x) {\n        int[] event = events.get(index++);\n        if (event[1] == 1) {\n          active.add(new int[] {event[2], event[3]});\n        } else {\n          removeInterval(active, event[2], event[3]);\n        }\n      }\n      previousX = x;\n    }\n    return (int) area;\n  }\n\n  private long coveredY(List<int[]> intervals) {\n    if (intervals.isEmpty()) return 0;\n    intervals.sort(Comparator.comparingInt(interval -> interval[0]));\n    long covered = 0;\n    int start = intervals.get(0)[0], end = intervals.get(0)[1];\n    for (int i = 1; i < intervals.size(); i++) {\n      int[] interval = intervals.get(i);\n      if (interval[0] > end) {\n        covered += end - (long) start;\n        start = interval[0];\n        end = interval[1];\n      } else {\n        end = Math.max(end, interval[1]);\n      }\n    }\n    return covered + end - (long) start;\n  }\n\n  private void removeInterval(List<int[]> active, int start, int end) {\n    for (int i = 0; i < active.size(); i++) {\n      int[] interval = active.get(i);\n      if (interval[0] == start && interval[1] == end) {\n        active.remove(i);\n        return;\n      }\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int rectangleArea(int[][] rectangles) {\n    List<int[]> events = new ArrayList<>();\n    for (int[] rectangle : rectangles) {\n      events.add(new int[] {rectangle[0], 1, rectangle[1], rectangle[3]});\n      events.add(new int[] {rectangle[2], -1, rectangle[1], rectangle[3]});\n    }\n    events.sort(Comparator.comparingInt(event -> event[0]));\n\n    List<int[]> active = new ArrayList<>();\n    long area = 0;\n    int previousX = events.get(0)[0];\n    int index = 0;\n    while (index < events.size()) {\n      int x = events.get(index)[0];\n      area = (area + (long) (x - previousX) * coveredY(active)) % MOD;\n\n      while (index < events.size() && events.get(index)[0] == x) {\n        int[] event = events.get(index++);\n        if (event[1] == 1) {\n          active.add(new int[] {event[2], event[3]});\n        } else {\n          removeInterval(active, event[2], event[3]);\n        }\n      }\n      previousX = x;\n    }\n    return (int) area;\n  }\n\n  private long coveredY(List<int[]> intervals) {\n    if (intervals.isEmpty()) return 0;\n    intervals.sort(Comparator.comparingInt(interval -> interval[0]));\n    long covered = 0;\n    int start = intervals.get(0)[0], end = intervals.get(0)[1];\n    for (int i = 1; i < intervals.size(); i++) {\n      int[] interval = intervals.get(i);\n      if (interval[0] > end) {\n        covered += end - (long) start;\n        start = interval[0];\n        end = interval[1];\n      } else {\n        end = Math.max(end, interval[1]);\n      }\n    }\n    return covered + end - (long) start;\n  }\n\n  private void removeInterval(List<int[]> active, int start, int end) {\n    for (int i = 0; i < active.size(); i++) {\n      int[] interval = active.get(i);\n      if (interval[0] == start && interval[1] == end) {\n        active.remove(i);\n        return;\n      }\n    }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "The Skyline Problem",
      "difficulty": "Hard",
      "subpattern": "Skyline sweep-line events",
      "question": "Given buildings as [left,right,height], return the critical points of the skyline formed by their union.",
      "trigger": "Building edges are x-events, and the visible outline changes only when the maximum active height changes.",
      "intuition": "Process entering and leaving edges in x-order while tracking the current tallest active building.",
      "edgeCases": "Same x for multiple starts/ends, adjacent buildings of equal height, nested buildings, zero active height, and duplicate critical points.",
      "constraints": "Buildings have positive height and left < right; output key points must be ordered by x without consecutive equal heights.",
      "source": {
        "label": "LeetCode 218 - The Skyline Problem",
        "url": "https://leetcode.com/problems/the-skyline-problem/"
      },
      "examples": [
        {
          "input": "buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]",
          "output": "[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]",
          "explanation": "Each point marks where the maximum active height changes."
        },
        {
          "input": "buildings = [[0,2,3],[2,5,3]]",
          "output": "[[0,3],[5,0]]",
          "explanation": "Equal adjacent heights merge into one flat segment."
        }
      ],
      "bruteForceComplexity": "Time O(N * X); Space O(X), where X is the number of distinct x-coordinates.",
      "optimizedComplexity": "Time O(N log N); Space O(N). Sweep sorted events with a multiset of active heights.",
      "recursiveComplexity": "Time O(N log N); Space O(N log N) for divide-and-conquer skyline merging.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    TreeSet<Integer> coordinates = new TreeSet<>();\n    for (int[] building : buildings) {\n      coordinates.add(building[0]);\n      coordinates.add(building[1]);\n    }\n\n    List<Integer> xs = new ArrayList<>(coordinates);\n    List<List<Integer>> skyline = new ArrayList<>();\n    int previousHeight = 0;\n    for (int i = 0; i < xs.size(); i++) {\n      int x = xs.get(i);\n      int height = 0;\n      for (int[] building : buildings) {\n        if (building[0] <= x && x < building[1]) height = Math.max(height, building[2]);\n      }\n      if (i == 0 || height != previousHeight) {\n        skyline.add(Arrays.asList(x, height));\n        previousHeight = height;\n      }\n    }\n    return skyline;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    List<int[]> events = new ArrayList<>();\n    for (int[] building : buildings) {\n      events.add(new int[] {building[0], -building[2]});\n      events.add(new int[] {building[1], building[2]});\n    }\n    events.sort((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    TreeMap<Integer, Integer> heights = new TreeMap<>();\n    heights.put(0, 1);\n    int previousMax = 0;\n    List<List<Integer>> skyline = new ArrayList<>();\n\n    for (int[] event : events) {\n      int height = event[1];\n      if (height < 0) {\n        heights.merge(-height, 1, Integer::sum);\n      } else {\n        int count = heights.get(height);\n        if (count == 1) heights.remove(height);\n        else heights.put(height, count - 1);\n      }\n\n      int currentMax = heights.lastKey();\n      if (currentMax != previousMax) {\n        skyline.add(Arrays.asList(event[0], currentMax));\n        previousMax = currentMax;\n      }\n    }\n    return skyline;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    if (buildings.length == 0) return new ArrayList<>();\n    return solve(buildings, 0, buildings.length - 1);\n  }\n\n  private List<List<Integer>> solve(int[][] buildings, int left, int right) {\n    if (left == right) {\n      List<List<Integer>> skyline = new ArrayList<>();\n      skyline.add(Arrays.asList(buildings[left][0], buildings[left][2]));\n      skyline.add(Arrays.asList(buildings[left][1], 0));\n      return skyline;\n    }\n    int mid = left + (right - left) / 2;\n    return merge(solve(buildings, left, mid), solve(buildings, mid + 1, right));\n  }\n\n  private List<List<Integer>> merge(List<List<Integer>> a, List<List<Integer>> b) {\n    int i = 0, j = 0, h1 = 0, h2 = 0;\n    List<List<Integer>> result = new ArrayList<>();\n    while (i < a.size() && j < b.size()) {\n      int x;\n      if (a.get(i).get(0) < b.get(j).get(0)) {\n        x = a.get(i).get(0);\n        h1 = a.get(i++).get(1);\n      } else if (b.get(j).get(0) < a.get(i).get(0)) {\n        x = b.get(j).get(0);\n        h2 = b.get(j++).get(1);\n      } else {\n        x = a.get(i).get(0);\n        h1 = a.get(i++).get(1);\n        h2 = b.get(j++).get(1);\n      }\n      addPoint(result, x, Math.max(h1, h2));\n    }\n    while (i < a.size()) addPoint(result, a.get(i).get(0), a.get(i++).get(1));\n    while (j < b.size()) addPoint(result, b.get(j).get(0), b.get(j++).get(1));\n    return result;\n  }\n\n  private void addPoint(List<List<Integer>> skyline, int x, int height) {\n    if (!skyline.isEmpty() && skyline.get(skyline.size() - 1).get(1) == height) return;\n    if (!skyline.isEmpty() && skyline.get(skyline.size() - 1).get(0) == x) {\n      skyline.get(skyline.size() - 1).set(1, height);\n    } else {\n      skyline.add(new ArrayList<>(Arrays.asList(x, height)));\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    List<int[]> events = new ArrayList<>();\n    for (int[] building : buildings) {\n      events.add(new int[] {building[0], -building[2]});\n      events.add(new int[] {building[1], building[2]});\n    }\n    events.sort((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    TreeMap<Integer, Integer> heights = new TreeMap<>();\n    heights.put(0, 1);\n    int previousMax = 0;\n    List<List<Integer>> skyline = new ArrayList<>();\n\n    for (int[] event : events) {\n      int height = event[1];\n      if (height < 0) {\n        heights.merge(-height, 1, Integer::sum);\n      } else {\n        int count = heights.get(height);\n        if (count == 1) heights.remove(height);\n        else heights.put(height, count - 1);\n      }\n\n      int currentMax = heights.lastKey();\n      if (currentMax != previousMax) {\n        skyline.add(Arrays.asList(event[0], currentMax));\n        previousMax = currentMax;\n      }\n    }\n    return skyline;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> getSkyline(int[][] buildings) {\n    List<int[]> events = new ArrayList<>();\n    for (int[] building : buildings) {\n      events.add(new int[] {building[0], -building[2]});\n      events.add(new int[] {building[1], building[2]});\n    }\n    events.sort((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n\n    TreeMap<Integer, Integer> heights = new TreeMap<>();\n    heights.put(0, 1);\n    int previousMax = 0;\n    List<List<Integer>> skyline = new ArrayList<>();\n\n    for (int[] event : events) {\n      int height = event[1];\n      if (height < 0) {\n        heights.merge(-height, 1, Integer::sum);\n      } else {\n        int count = heights.get(height);\n        if (count == 1) heights.remove(height);\n        else heights.put(height, count - 1);\n      }\n\n      int currentMax = heights.lastKey();\n      if (currentMax != previousMax) {\n        skyline.add(Arrays.asList(event[0], currentMax));\n        previousMax = currentMax;\n      }\n    }\n    return skyline;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Mirror Reflection",
      "difficulty": "Medium",
      "subpattern": "Mirror reflection by parity and LCM",
      "question": "A laser starts from the southwest corner of a square room of side p and first meets the east wall at height q. Return the receptor number it hits.",
      "trigger": "The ray path unfolds into repeated rooms; the first receptor is decided by parity after removing common powers of two.",
      "intuition": "Scale p and q down until one is odd; odd/even parity tells which wall and corner is reached first.",
      "edgeCases": "q equals p, common factors of two, p much larger than q, and receptors reached after many virtual reflections.",
      "constraints": "p and q are positive integers with q <= p.",
      "source": {
        "label": "LeetCode 858 - Mirror Reflection",
        "url": "https://leetcode.com/problems/mirror-reflection/"
      },
      "examples": [
        {
          "input": "p = 2, q = 1",
          "output": "2",
          "explanation": "After unfolding, the ray reaches the upper-left receptor."
        },
        {
          "input": "p = 3, q = 1",
          "output": "1",
          "explanation": "The first matching corner is the upper-right receptor."
        }
      ],
      "bruteForceComplexity": "Time O(p / gcd(p, q)); Space O(1). Simulate unfolded room extensions until height is a multiple of p.",
      "optimizedComplexity": "Time O(log min(p, q)); Space O(1). Reduce by common powers of two and inspect parity.",
      "recursiveComplexity": "Time O(log min(p, q)); Space O(log min(p, q)) recursion depth while stripping common even factors.",
      "bruteForceCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    int room = 1;\n    int height = q;\n    while (height % p != 0) {\n      room++;\n      height += q;\n    }\n    if (room % 2 == 0) return 2;\n    return (height / p) % 2 == 1 ? 1 : 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    while (p % 2 == 0 && q % 2 == 0) {\n      p /= 2;\n      q /= 2;\n    }\n    if (p % 2 == 0) return 2;\n    return q % 2 == 1 ? 1 : 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    return receptor(p, q);\n  }\n\n  private int receptor(int p, int q) {\n    if (p % 2 == 0 && q % 2 == 0) return receptor(p / 2, q / 2);\n    if (p % 2 == 0) return 2;\n    return q % 2 == 1 ? 1 : 0;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    while (p % 2 == 0 && q % 2 == 0) {\n      p /= 2;\n      q /= 2;\n    }\n    if (p % 2 == 0) return 2;\n    return q % 2 == 1 ? 1 : 0;\n  }\n}",
      "code": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    while (p % 2 == 0 && q % 2 == 0) {\n      p /= 2;\n      q /= 2;\n    }\n    if (p % 2 == 0) return 2;\n    return q % 2 == 1 ? 1 : 0;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count Lattice Points Inside a Circle",
      "difficulty": "Easy",
      "subpattern": "Circle containment over integer grid points",
      "question": "Given circles as [x,y,r], return how many distinct integer lattice points lie inside at least one circle.",
      "trigger": "The shape is circular, so each candidate point is tested by squared distance against radius squared.",
      "intuition": "Enumerate only each circle bounding box, hash lattice points, and use squared distance to avoid floating point.",
      "edgeCases": "Overlapping circles, points on the circumference, duplicate circles, small radius, and negative coordinates if allowed.",
      "constraints": "Circle centers and radii are small enough for bounding-box enumeration in the LeetCode version.",
      "source": {
        "label": "LeetCode 2249 - Count Lattice Points Inside a Circle",
        "url": "https://leetcode.com/problems/count-lattice-points-inside-a-circle/"
      },
      "examples": [
        {
          "input": "circles = [[2,2,1]]",
          "output": "5",
          "explanation": "Center plus four axis-adjacent lattice points are inside or on the boundary."
        },
        {
          "input": "circles = [[2,2,2],[3,4,1]]",
          "output": "16",
          "explanation": "Points covered by both circles are counted once."
        }
      ],
      "bruteForceComplexity": "Time O(C * B^2); Space O(P), where B is max diameter and P is distinct covered points.",
      "optimizedComplexity": "Time O(C * B^2); Space O(P). Bounding-box enumeration is optimal for the small-coordinate constraints.",
      "recursiveComplexity": "Time O(C * B^2); Space O(P + C * B) recursion depth in the coordinate traversal.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int countLatticePoints(int[][] circles) {\n    Set<String> points = new HashSet<>();\n    for (int[] circle : circles) {\n      int xCenter = circle[0], yCenter = circle[1], radius = circle[2];\n      for (int x = xCenter - radius; x <= xCenter + radius; x++) {\n        for (int y = yCenter - radius; y <= yCenter + radius; y++) {\n          int dx = x - xCenter, dy = y - yCenter;\n          if (dx * dx + dy * dy <= radius * radius) points.add(x + \",\" + y);\n        }\n      }\n    }\n    return points.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countLatticePoints(int[][] circles) {\n    Set<Integer> points = new HashSet<>();\n    for (int[] circle : circles) {\n      int xCenter = circle[0], yCenter = circle[1], radius = circle[2];\n      int radiusSquared = radius * radius;\n      for (int x = xCenter - radius; x <= xCenter + radius; x++) {\n        for (int y = yCenter - radius; y <= yCenter + radius; y++) {\n          int dx = x - xCenter, dy = y - yCenter;\n          if (dx * dx + dy * dy <= radiusSquared) points.add(x * 1000 + y);\n        }\n      }\n    }\n    return points.size();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countLatticePoints(int[][] circles) {\n    Set<String> points = new HashSet<>();\n    addCircle(circles, 0, points);\n    return points.size();\n  }\n\n  private void addCircle(int[][] circles, int index, Set<String> points) {\n    if (index == circles.length) return;\n    int[] circle = circles[index];\n    scanX(circle, circle[0] - circle[2], points);\n    addCircle(circles, index + 1, points);\n  }\n\n  private void scanX(int[] circle, int x, Set<String> points) {\n    if (x > circle[0] + circle[2]) return;\n    scanY(circle, x, circle[1] - circle[2], points);\n    scanX(circle, x + 1, points);\n  }\n\n  private void scanY(int[] circle, int x, int y, Set<String> points) {\n    if (y > circle[1] + circle[2]) return;\n    int dx = x - circle[0], dy = y - circle[1];\n    if (dx * dx + dy * dy <= circle[2] * circle[2]) points.add(x + \",\" + y);\n    scanY(circle, x, y + 1, points);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countLatticePoints(int[][] circles) {\n    Set<Integer> points = new HashSet<>();\n    for (int[] circle : circles) {\n      int xCenter = circle[0], yCenter = circle[1], radius = circle[2];\n      int radiusSquared = radius * radius;\n      for (int x = xCenter - radius; x <= xCenter + radius; x++) {\n        for (int y = yCenter - radius; y <= yCenter + radius; y++) {\n          int dx = x - xCenter, dy = y - yCenter;\n          if (dx * dx + dy * dy <= radiusSquared) points.add(x * 1000 + y);\n        }\n      }\n    }\n    return points.size();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countLatticePoints(int[][] circles) {\n    Set<Integer> points = new HashSet<>();\n    for (int[] circle : circles) {\n      int xCenter = circle[0], yCenter = circle[1], radius = circle[2];\n      int radiusSquared = radius * radius;\n      for (int x = xCenter - radius; x <= xCenter + radius; x++) {\n        for (int y = yCenter - radius; y <= yCenter + radius; y++) {\n          int dx = x - xCenter, dy = y - yCenter;\n          if (dx * dx + dy * dy <= radiusSquared) points.add(x * 1000 + y);\n        }\n      }\n    }\n    return points.size();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Escape The Ghosts",
      "difficulty": "Medium",
      "subpattern": "Manhattan distance race on a grid",
      "question": "Given ghost positions and a target, return true if you can reach the target before any ghost can catch you.",
      "trigger": "Movement is four-directional on an open grid, so shortest travel time is Manhattan distance.",
      "intuition": "You escape only if every ghost has strictly greater Manhattan distance to the target than you do.",
      "edgeCases": "Ghost already at target, player and ghost tie, negative coordinates, no ghosts, and target at origin.",
      "constraints": "All players move one grid step per turn and ghosts can choose optimal paths.",
      "source": {
        "label": "LeetCode 789 - Escape The Ghosts",
        "url": "https://leetcode.com/problems/escape-the-ghosts/"
      },
      "examples": [
        {
          "input": "ghosts = [[1,0],[0,3]], target = [0,1]",
          "output": "true",
          "explanation": "Your distance is 1, and every ghost needs more than 1 step."
        },
        {
          "input": "ghosts = [[1,0]], target = [2,0]",
          "output": "false",
          "explanation": "The ghost can reach the target no later than you."
        }
      ],
      "bruteForceComplexity": "Time O(G); Space O(1). Compare each ghost distance with the player distance.",
      "optimizedComplexity": "Time O(G); Space O(1). Manhattan-distance comparison is already optimal.",
      "recursiveComplexity": "Time O(G); Space O(G) recursion depth for scanning ghosts.",
      "bruteForceCode": "class Solution {\n  public boolean escapeGhosts(int[][] ghosts, int[] target) {\n    int player = Math.abs(target[0]) + Math.abs(target[1]);\n    for (int[] ghost : ghosts) {\n      int ghostDistance = Math.abs(ghost[0] - target[0]) + Math.abs(ghost[1] - target[1]);\n      if (ghostDistance <= player) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean escapeGhosts(int[][] ghosts, int[] target) {\n    int playerDistance = distance(new int[] {0, 0}, target);\n    for (int[] ghost : ghosts) {\n      if (distance(ghost, target) <= playerDistance) return false;\n    }\n    return true;\n  }\n\n  private int distance(int[] a, int[] b) {\n    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean escapeGhosts(int[][] ghosts, int[] target) {\n    int playerDistance = Math.abs(target[0]) + Math.abs(target[1]);\n    return canEscape(ghosts, target, playerDistance, 0);\n  }\n\n  private boolean canEscape(int[][] ghosts, int[] target, int playerDistance, int index) {\n    if (index == ghosts.length) return true;\n    int ghostDistance = Math.abs(ghosts[index][0] - target[0]) + Math.abs(ghosts[index][1] - target[1]);\n    return ghostDistance > playerDistance && canEscape(ghosts, target, playerDistance, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean escapeGhosts(int[][] ghosts, int[] target) {\n    int playerDistance = distance(new int[] {0, 0}, target);\n    for (int[] ghost : ghosts) {\n      if (distance(ghost, target) <= playerDistance) return false;\n    }\n    return true;\n  }\n\n  private int distance(int[] a, int[] b) {\n    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);\n  }\n}",
      "code": "class Solution {\n  public boolean escapeGhosts(int[][] ghosts, int[] target) {\n    int playerDistance = distance(new int[] {0, 0}, target);\n    for (int[] ghost : ghosts) {\n      if (distance(ghost, target) <= playerDistance) return false;\n    }\n    return true;\n  }\n\n  private int distance(int[] a, int[] b) {\n    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Robot Return to Origin",
      "difficulty": "Easy",
      "subpattern": "Net displacement simulation",
      "question": "Given a string of moves U, D, L, and R, return true if the robot ends at the origin.",
      "trigger": "The path only matters through final x/y displacement, not the intermediate route.",
      "intuition": "Accumulate horizontal and vertical movement and check both totals are zero.",
      "edgeCases": "Empty move string, balanced moves in different order, one extra move, and long strings.",
      "constraints": "Each move changes exactly one coordinate by one unit.",
      "source": {
        "label": "LeetCode 657 - Robot Return to Origin",
        "url": "https://leetcode.com/problems/robot-return-to-origin/"
      },
      "examples": [
        {
          "input": "moves = \"UD\"",
          "output": "true",
          "explanation": "The up and down moves cancel."
        },
        {
          "input": "moves = \"LL\"",
          "output": "false",
          "explanation": "The final x-coordinate is -2."
        }
      ],
      "bruteForceComplexity": "Time O(N); Space O(N) if storing the visited path.",
      "optimizedComplexity": "Time O(N); Space O(1). Only final displacement is required.",
      "recursiveComplexity": "Time O(N); Space O(N) recursion depth.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean judgeCircle(String moves) {\n    List<int[]> path = new ArrayList<>();\n    int x = 0, y = 0;\n    path.add(new int[] {x, y});\n    for (char move : moves.toCharArray()) {\n      if (move == 'U') y++;\n      else if (move == 'D') y--;\n      else if (move == 'L') x--;\n      else x++;\n      path.add(new int[] {x, y});\n    }\n    int[] end = path.get(path.size() - 1);\n    return end[0] == 0 && end[1] == 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean judgeCircle(String moves) {\n    int x = 0, y = 0;\n    for (int i = 0; i < moves.length(); i++) {\n      char move = moves.charAt(i);\n      if (move == 'U') y++;\n      else if (move == 'D') y--;\n      else if (move == 'L') x--;\n      else x++;\n    }\n    return x == 0 && y == 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean judgeCircle(String moves) {\n    int[] end = walk(moves, 0, 0, 0);\n    return end[0] == 0 && end[1] == 0;\n  }\n\n  private int[] walk(String moves, int index, int x, int y) {\n    if (index == moves.length()) return new int[] {x, y};\n    char move = moves.charAt(index);\n    if (move == 'U') y++;\n    else if (move == 'D') y--;\n    else if (move == 'L') x--;\n    else x++;\n    return walk(moves, index + 1, x, y);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean judgeCircle(String moves) {\n    int x = 0, y = 0;\n    for (int i = 0; i < moves.length(); i++) {\n      char move = moves.charAt(i);\n      if (move == 'U') y++;\n      else if (move == 'D') y--;\n      else if (move == 'L') x--;\n      else x++;\n    }\n    return x == 0 && y == 0;\n  }\n}",
      "code": "class Solution {\n  public boolean judgeCircle(String moves) {\n    int x = 0, y = 0;\n    for (int i = 0; i < moves.length(); i++) {\n      char move = moves.charAt(i);\n      if (move == 'U') y++;\n      else if (move == 'D') y--;\n      else if (move == 'L') x--;\n      else x++;\n    }\n    return x == 0 && y == 0;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Ambiguous Coordinates",
      "difficulty": "Medium",
      "subpattern": "Coordinate string reconstruction",
      "question": "Given a digit string wrapped in parentheses, return all possible coordinate pairs formed by inserting one comma and optional decimal points.",
      "trigger": "The input encodes two coordinates, and validity is controlled by geometry coordinate formatting rules around leading and trailing zeroes.",
      "intuition": "Split the digits into left and right parts, generate every valid decimal form for each part, then combine.",
      "edgeCases": "Single digit sides, leading zero, trailing zero after decimal, all zeroes, and preserving output format.",
      "constraints": "The original string contains only digits inside one pair of parentheses.",
      "source": {
        "label": "LeetCode 816 - Ambiguous Coordinates",
        "url": "https://leetcode.com/problems/ambiguous-coordinates/"
      },
      "examples": [
        {
          "input": "s = \"(123)\"",
          "output": "[\"(1, 23)\",\"(1, 2.3)\",\"(12, 3)\",\"(1.2, 3)\"]",
          "explanation": "All valid comma and decimal placements are combined."
        },
        {
          "input": "s = \"(00011)\"",
          "output": "[\"(0, 0.011)\",\"(0.001, 1)\"]",
          "explanation": "Invalid leading and trailing-zero decimal forms are rejected."
        }
      ],
      "bruteForceComplexity": "Time O(N^3); Space O(N^3). Try every comma and decimal placement.",
      "optimizedComplexity": "Time O(N^3); Space O(N^3). Generate valid forms per split and combine directly.",
      "recursiveComplexity": "Time O(N^3); Space O(N^3 + N) including recursion depth over split positions.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> ambiguousCoordinates(String s) {\n    String digits = s.substring(1, s.length() - 1);\n    List<String> result = new ArrayList<>();\n    for (int comma = 1; comma < digits.length(); comma++) {\n      String left = digits.substring(0, comma);\n      String right = digits.substring(comma);\n      for (String x : forms(left)) {\n        for (String y : forms(right)) {\n          result.add(\"(\" + x + \", \" + y + \")\");\n        }\n      }\n    }\n    return result;\n  }\n\n  private List<String> forms(String value) {\n    List<String> result = new ArrayList<>();\n    if (isValidInteger(value)) result.add(value);\n    for (int dot = 1; dot < value.length(); dot++) {\n      String candidate = value.substring(0, dot) + \".\" + value.substring(dot);\n      if (isValidDecimal(candidate)) result.add(candidate);\n    }\n    return result;\n  }\n\n  private boolean isValidInteger(String value) {\n    return value.length() == 1 || value.charAt(0) != '0';\n  }\n\n  private boolean isValidDecimal(String value) {\n    String[] parts = value.split(\"\\\\.\");\n    return (parts[0].length() == 1 || parts[0].charAt(0) != '0') && parts[1].charAt(parts[1].length() - 1) != '0';\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> ambiguousCoordinates(String s) {\n    String digits = s.substring(1, s.length() - 1);\n    List<String> answer = new ArrayList<>();\n    for (int split = 1; split < digits.length(); split++) {\n      List<String> left = validNumbers(digits.substring(0, split));\n      List<String> right = validNumbers(digits.substring(split));\n      for (String x : left) {\n        for (String y : right) answer.add(\"(\" + x + \", \" + y + \")\");\n      }\n    }\n    return answer;\n  }\n\n  private List<String> validNumbers(String digits) {\n    List<String> result = new ArrayList<>();\n    if (digits.length() == 1 || digits.charAt(0) != '0') result.add(digits);\n    for (int i = 1; i < digits.length(); i++) {\n      String whole = digits.substring(0, i);\n      String fraction = digits.substring(i);\n      if ((whole.length() == 1 || whole.charAt(0) != '0') && fraction.charAt(fraction.length() - 1) != '0') {\n        result.add(whole + \".\" + fraction);\n      }\n    }\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> ambiguousCoordinates(String s) {\n    String digits = s.substring(1, s.length() - 1);\n    List<String> answer = new ArrayList<>();\n    split(digits, 1, answer);\n    return answer;\n  }\n\n  private void split(String digits, int index, List<String> answer) {\n    if (index == digits.length()) return;\n    List<String> left = new ArrayList<>();\n    List<String> right = new ArrayList<>();\n    buildForms(digits.substring(0, index), 0, left);\n    buildForms(digits.substring(index), 0, right);\n    combine(left, right, 0, 0, answer);\n    split(digits, index + 1, answer);\n  }\n\n  private void buildForms(String digits, int dot, List<String> result) {\n    if (dot == digits.length()) return;\n    String candidate = dot == 0 ? digits : digits.substring(0, dot) + \".\" + digits.substring(dot);\n    if (valid(candidate)) result.add(candidate);\n    buildForms(digits, dot + 1, result);\n  }\n\n  private boolean valid(String value) {\n    int dot = value.indexOf('.');\n    if (dot == -1) return value.length() == 1 || value.charAt(0) != '0';\n    String whole = value.substring(0, dot);\n    String fraction = value.substring(dot + 1);\n    return (whole.length() == 1 || whole.charAt(0) != '0') && fraction.charAt(fraction.length() - 1) != '0';\n  }\n\n  private void combine(List<String> left, List<String> right, int i, int j, List<String> answer) {\n    if (i == left.size()) return;\n    if (j == right.size()) {\n      combine(left, right, i + 1, 0, answer);\n      return;\n    }\n    answer.add(\"(\" + left.get(i) + \", \" + right.get(j) + \")\");\n    combine(left, right, i, j + 1, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> ambiguousCoordinates(String s) {\n    String digits = s.substring(1, s.length() - 1);\n    List<String> answer = new ArrayList<>();\n    for (int split = 1; split < digits.length(); split++) {\n      List<String> left = validNumbers(digits.substring(0, split));\n      List<String> right = validNumbers(digits.substring(split));\n      for (String x : left) {\n        for (String y : right) answer.add(\"(\" + x + \", \" + y + \")\");\n      }\n    }\n    return answer;\n  }\n\n  private List<String> validNumbers(String digits) {\n    List<String> result = new ArrayList<>();\n    if (digits.length() == 1 || digits.charAt(0) != '0') result.add(digits);\n    for (int i = 1; i < digits.length(); i++) {\n      String whole = digits.substring(0, i);\n      String fraction = digits.substring(i);\n      if ((whole.length() == 1 || whole.charAt(0) != '0') && fraction.charAt(fraction.length() - 1) != '0') {\n        result.add(whole + \".\" + fraction);\n      }\n    }\n    return result;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> ambiguousCoordinates(String s) {\n    String digits = s.substring(1, s.length() - 1);\n    List<String> answer = new ArrayList<>();\n    for (int split = 1; split < digits.length(); split++) {\n      List<String> left = validNumbers(digits.substring(0, split));\n      List<String> right = validNumbers(digits.substring(split));\n      for (String x : left) {\n        for (String y : right) answer.add(\"(\" + x + \", \" + y + \")\");\n      }\n    }\n    return answer;\n  }\n\n  private List<String> validNumbers(String digits) {\n    List<String> result = new ArrayList<>();\n    if (digits.length() == 1 || digits.charAt(0) != '0') result.add(digits);\n    for (int i = 1; i < digits.length(); i++) {\n      String whole = digits.substring(0, i);\n      String fraction = digits.substring(i);\n      if ((whole.length() == 1 || whole.charAt(0) != '0') && fraction.charAt(fraction.length() - 1) != '0') {\n        result.add(whole + \".\" + fraction);\n      }\n    }\n    return result;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Points Inside the Square",
      "difficulty": "Medium",
      "subpattern": "Chebyshev radius with label uniqueness",
      "question": "Given points and a label string, choose an origin-centered axis-aligned square so the maximum number of inside points have distinct labels.",
      "trigger": "A point enters the square when side half-length reaches max(abs(x), abs(y)); duplicate labels invalidate that radius and all larger radii.",
      "intuition": "Sort points by Chebyshev radius and process equal-radius batches before accepting them.",
      "edgeCases": "Two duplicate labels at the same radius, duplicate label already accepted, points on square boundary, negative coordinates, and all labels unique.",
      "constraints": "The square is centered at the origin and includes boundary points.",
      "source": {
        "label": "LeetCode 3143 - Maximum Points Inside the Square",
        "url": "https://leetcode.com/problems/maximum-points-inside-the-square/"
      },
      "examples": [
        {
          "input": "points = [[2,2],[-1,-2],[-4,4],[-3,1],[3,-3]], s = \"abdca\"",
          "output": "2",
          "explanation": "The next radius would include a repeated label, so only two points are safely inside."
        },
        {
          "input": "points = [[1,1],[-2,-2],[-2,2]], s = \"abb\"",
          "output": "1",
          "explanation": "Both b-labeled points enter at radius 2, which invalidates that batch."
        }
      ],
      "bruteForceComplexity": "Time O(N^2); Space O(1). Try every candidate radius and validate label uniqueness.",
      "optimizedComplexity": "Time O(N log N); Space O(N). Sort by Chebyshev radius and process equal-radius batches.",
      "recursiveComplexity": "Time O(N log N); Space O(N) plus O(N) recursion depth.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maxPointsInsideSquare(int[][] points, String s) {\n    int answer = 0;\n    for (int[] point : points) {\n      int radius = Math.max(Math.abs(point[0]), Math.abs(point[1]));\n      boolean[] seen = new boolean[26];\n      int count = 0;\n      boolean valid = true;\n      for (int i = 0; i < points.length; i++) {\n        int current = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));\n        if (current <= radius) {\n          int label = s.charAt(i) - 'a';\n          if (seen[label]) {\n            valid = false;\n            break;\n          }\n          seen[label] = true;\n          count++;\n        }\n      }\n      if (valid) answer = Math.max(answer, count);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxPointsInsideSquare(int[][] points, String s) {\n    int n = points.length;\n    int[][] entries = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      entries[i][0] = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));\n      entries[i][1] = s.charAt(i) - 'a';\n    }\n    Arrays.sort(entries, Comparator.comparingInt(entry -> entry[0]));\n\n    boolean[] used = new boolean[26];\n    int count = 0, index = 0;\n    while (index < n) {\n      int radius = entries[index][0];\n      boolean[] batch = new boolean[26];\n      int next = index;\n      while (next < n && entries[next][0] == radius) {\n        int label = entries[next][1];\n        if (used[label] || batch[label]) return count;\n        batch[label] = true;\n        next++;\n      }\n      for (int label = 0; label < 26; label++) {\n        if (batch[label]) {\n          used[label] = true;\n          count++;\n        }\n      }\n      index = next;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxPointsInsideSquare(int[][] points, String s) {\n    int[][] entries = new int[points.length][2];\n    for (int i = 0; i < points.length; i++) {\n      entries[i][0] = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));\n      entries[i][1] = s.charAt(i) - 'a';\n    }\n    Arrays.sort(entries, Comparator.comparingInt(entry -> entry[0]));\n    return scan(entries, 0, new boolean[26], 0);\n  }\n\n  private int scan(int[][] entries, int index, boolean[] used, int count) {\n    if (index == entries.length) return count;\n    boolean[] batch = new boolean[26];\n    int next = collect(entries, index, entries[index][0], used, batch);\n    if (next == -1) return count;\n    for (int label = 0; label < 26; label++) {\n      if (batch[label]) {\n        used[label] = true;\n        count++;\n      }\n    }\n    return scan(entries, next, used, count);\n  }\n\n  private int collect(int[][] entries, int index, int radius, boolean[] used, boolean[] batch) {\n    if (index == entries.length || entries[index][0] != radius) return index;\n    int label = entries[index][1];\n    if (used[label] || batch[label]) return -1;\n    batch[label] = true;\n    return collect(entries, index + 1, radius, used, batch);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxPointsInsideSquare(int[][] points, String s) {\n    int n = points.length;\n    int[][] entries = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      entries[i][0] = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));\n      entries[i][1] = s.charAt(i) - 'a';\n    }\n    Arrays.sort(entries, Comparator.comparingInt(entry -> entry[0]));\n\n    boolean[] used = new boolean[26];\n    int count = 0, index = 0;\n    while (index < n) {\n      int radius = entries[index][0];\n      boolean[] batch = new boolean[26];\n      int next = index;\n      while (next < n && entries[next][0] == radius) {\n        int label = entries[next][1];\n        if (used[label] || batch[label]) return count;\n        batch[label] = true;\n        next++;\n      }\n      for (int label = 0; label < 26; label++) {\n        if (batch[label]) {\n          used[label] = true;\n          count++;\n        }\n      }\n      index = next;\n    }\n    return count;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxPointsInsideSquare(int[][] points, String s) {\n    int n = points.length;\n    int[][] entries = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      entries[i][0] = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));\n      entries[i][1] = s.charAt(i) - 'a';\n    }\n    Arrays.sort(entries, Comparator.comparingInt(entry -> entry[0]));\n\n    boolean[] used = new boolean[26];\n    int count = 0, index = 0;\n    while (index < n) {\n      int radius = entries[index][0];\n      boolean[] batch = new boolean[26];\n      int next = index;\n      while (next < n && entries[next][0] == radius) {\n        int label = entries[next][1];\n        if (used[label] || batch[label]) return count;\n        batch[label] = true;\n        next++;\n      }\n      for (int label = 0; label < 26; label++) {\n        if (batch[label]) {\n          used[label] = true;\n          count++;\n        }\n      }\n      index = next;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Convex Polygon",
      "difficulty": "Medium",
      "subpattern": "Consistent orientation around polygon",
      "question": "Given polygon vertices in order, return true if the polygon is convex.",
      "trigger": "Convexity requires every non-zero turn around the boundary to have the same orientation.",
      "intuition": "Walk triples of consecutive vertices and compare the sign of each cross product.",
      "edgeCases": "Collinear consecutive vertices, repeated points, concave indentation, clockwise order, and counter-clockwise order.",
      "constraints": "Points are listed in polygon boundary order.",
      "source": {
        "label": "LeetCode 469 - Convex Polygon",
        "url": "https://leetcode.com/problems/convex-polygon/"
      },
      "examples": [
        {
          "input": "points = [[0,0],[0,1],[1,1],[1,0]]",
          "output": "true",
          "explanation": "All turns keep the same orientation."
        },
        {
          "input": "points = [[0,0],[0,10],[10,10],[10,0],[5,5]]",
          "output": "false",
          "explanation": "The final point creates an opposite turn."
        }
      ],
      "bruteForceComplexity": "Time O(N); Space O(1). Check orientation for every consecutive triple.",
      "optimizedComplexity": "Time O(N); Space O(1). One pass with the first non-zero turn sign is optimal.",
      "recursiveComplexity": "Time O(N); Space O(N) recursion depth.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean isConvex(List<List<Integer>> points) {\n    int sign = 0;\n    int n = points.size();\n    for (int i = 0; i < n; i++) {\n      long cross = cross(points.get(i), points.get((i + 1) % n), points.get((i + 2) % n));\n      if (cross == 0) continue;\n      int current = cross > 0 ? 1 : -1;\n      if (sign != 0 && sign != current) return false;\n      sign = current;\n    }\n    return true;\n  }\n\n  private long cross(List<Integer> a, List<Integer> b, List<Integer> c) {\n    long abx = b.get(0) - (long) a.get(0);\n    long aby = b.get(1) - (long) a.get(1);\n    long bcx = c.get(0) - (long) b.get(0);\n    long bcy = c.get(1) - (long) b.get(1);\n    return abx * bcy - aby * bcx;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean isConvex(List<List<Integer>> points) {\n    int direction = 0;\n    for (int i = 0; i < points.size(); i++) {\n      long turn = cross(points.get(i), points.get((i + 1) % points.size()), points.get((i + 2) % points.size()));\n      if (turn == 0) continue;\n      int current = turn > 0 ? 1 : -1;\n      if (direction != 0 && direction != current) return false;\n      direction = current;\n    }\n    return true;\n  }\n\n  private long cross(List<Integer> a, List<Integer> b, List<Integer> c) {\n    long x1 = b.get(0) - (long) a.get(0);\n    long y1 = b.get(1) - (long) a.get(1);\n    long x2 = c.get(0) - (long) b.get(0);\n    long y2 = c.get(1) - (long) b.get(1);\n    return x1 * y2 - y1 * x2;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean isConvex(List<List<Integer>> points) {\n    return check(points, 0, 0);\n  }\n\n  private boolean check(List<List<Integer>> points, int index, int direction) {\n    if (index == points.size()) return true;\n    long turn = cross(points.get(index), points.get((index + 1) % points.size()), points.get((index + 2) % points.size()));\n    if (turn == 0) return check(points, index + 1, direction);\n    int current = turn > 0 ? 1 : -1;\n    if (direction != 0 && direction != current) return false;\n    return check(points, index + 1, current);\n  }\n\n  private long cross(List<Integer> a, List<Integer> b, List<Integer> c) {\n    long x1 = b.get(0) - (long) a.get(0);\n    long y1 = b.get(1) - (long) a.get(1);\n    long x2 = c.get(0) - (long) b.get(0);\n    long y2 = c.get(1) - (long) b.get(1);\n    return x1 * y2 - y1 * x2;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean isConvex(List<List<Integer>> points) {\n    int direction = 0;\n    for (int i = 0; i < points.size(); i++) {\n      long turn = cross(points.get(i), points.get((i + 1) % points.size()), points.get((i + 2) % points.size()));\n      if (turn == 0) continue;\n      int current = turn > 0 ? 1 : -1;\n      if (direction != 0 && direction != current) return false;\n      direction = current;\n    }\n    return true;\n  }\n\n  private long cross(List<Integer> a, List<Integer> b, List<Integer> c) {\n    long x1 = b.get(0) - (long) a.get(0);\n    long y1 = b.get(1) - (long) a.get(1);\n    long x2 = c.get(0) - (long) b.get(0);\n    long y2 = c.get(1) - (long) b.get(1);\n    return x1 * y2 - y1 * x2;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean isConvex(List<List<Integer>> points) {\n    int direction = 0;\n    for (int i = 0; i < points.size(); i++) {\n      long turn = cross(points.get(i), points.get((i + 1) % points.size()), points.get((i + 2) % points.size()));\n      if (turn == 0) continue;\n      int current = turn > 0 ? 1 : -1;\n      if (direction != 0 && direction != current) return false;\n      direction = current;\n    }\n    return true;\n  }\n\n  private long cross(List<Integer> a, List<Integer> b, List<Integer> c) {\n    long x1 = b.get(0) - (long) a.get(0);\n    long y1 = b.get(1) - (long) a.get(1);\n    long x2 = c.get(0) - (long) b.get(0);\n    long y2 = c.get(1) - (long) b.get(1);\n    return x1 * y2 - y1 * x2;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Area Rectangle II",
      "difficulty": "Medium",
      "subpattern": "Free-rotation rectangle by diagonal midpoint",
      "question": "Given points in the plane, return the minimum area of any rectangle that can be formed, allowing rotation.",
      "trigger": "A rotated rectangle is identified by two diagonals with the same midpoint and same squared length.",
      "intuition": "Group point pairs as candidate diagonals; pairs in the same group form rectangles and side lengths give area.",
      "edgeCases": "No rectangle, duplicate midpoint represented by doubled coordinates, squares, thin rotated rectangles, and floating-point precision.",
      "constraints": "Input points are distinct integer coordinates.",
      "source": {
        "label": "LeetCode 963 - Minimum Area Rectangle II",
        "url": "https://leetcode.com/problems/minimum-area-rectangle-ii/"
      },
      "examples": [
        {
          "input": "points = [[1,2],[2,1],[1,0],[0,1]]",
          "output": "2.0",
          "explanation": "The four points form a rotated square with area 2."
        },
        {
          "input": "points = [[0,1],[2,1],[1,1],[1,0],[2,0]]",
          "output": "1.0",
          "explanation": "The minimum rectangle is axis-aligned with area 1."
        }
      ],
      "bruteForceComplexity": "Time O(N^4); Space O(1). Test every ordered quadruple for perpendicular equal opposite sides.",
      "optimizedComplexity": "Time O(N^2 + G^2); Space O(N^2), where G is pair count per diagonal group.",
      "recursiveComplexity": "Time O(N^2 + G^2); Space O(N^2 + N) including recursive pair generation.",
      "bruteForceCode": "class Solution {\n  public double minAreaFreeRect(int[][] points) {\n    double best = Double.MAX_VALUE;\n    int n = points.length;\n    for (int a = 0; a < n; a++) {\n      for (int b = 0; b < n; b++) {\n        if (b == a) continue;\n        for (int c = 0; c < n; c++) {\n          if (c == a || c == b) continue;\n          int[] p = points[a], q = points[b], r = points[c];\n          int ux = q[0] - p[0], uy = q[1] - p[1];\n          int vx = r[0] - p[0], vy = r[1] - p[1];\n          if (ux * vx + uy * vy != 0) continue;\n          int sx = q[0] + r[0] - p[0], sy = q[1] + r[1] - p[1];\n          if (contains(points, sx, sy)) {\n            double area = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);\n            if (area > 0) best = Math.min(best, area);\n          }\n        }\n      }\n    }\n    return best == Double.MAX_VALUE ? 0.0 : best;\n  }\n\n  private boolean contains(int[][] points, int x, int y) {\n    for (int[] point : points) {\n      if (point[0] == x && point[1] == y) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public double minAreaFreeRect(int[][] points) {\n    Map<String, List<int[]>> diagonals = new HashMap<>();\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        int midX2 = points[i][0] + points[j][0];\n        int midY2 = points[i][1] + points[j][1];\n        int length = squaredDistance(points[i], points[j]);\n        String key = midX2 + \":\" + midY2 + \":\" + length;\n        diagonals.computeIfAbsent(key, unused -> new ArrayList<>()).add(new int[] {i, j});\n      }\n    }\n\n    double best = Double.MAX_VALUE;\n    for (List<int[]> group : diagonals.values()) {\n      for (int i = 0; i < group.size(); i++) {\n        for (int j = i + 1; j < group.size(); j++) {\n          int[] first = group.get(i), second = group.get(j);\n          int[] p = points[first[0]];\n          int[] q = points[second[0]];\n          int[] r = points[second[1]];\n          double area = Math.sqrt(squaredDistance(p, q)) * Math.sqrt(squaredDistance(p, r));\n          if (area > 0) best = Math.min(best, area);\n        }\n      }\n    }\n    return best == Double.MAX_VALUE ? 0.0 : best;\n  }\n\n  private int squaredDistance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public double minAreaFreeRect(int[][] points) {\n    Map<String, List<int[]>> diagonals = new HashMap<>();\n    addPairs(points, 0, 1, diagonals);\n    double best = evaluateGroups(points, new ArrayList<>(diagonals.values()), 0, Double.MAX_VALUE);\n    return best == Double.MAX_VALUE ? 0.0 : best;\n  }\n\n  private void addPairs(int[][] points, int i, int j, Map<String, List<int[]>> diagonals) {\n    if (i == points.length) return;\n    if (j == points.length) {\n      addPairs(points, i + 1, i + 2, diagonals);\n      return;\n    }\n    int midX2 = points[i][0] + points[j][0];\n    int midY2 = points[i][1] + points[j][1];\n    int length = squaredDistance(points[i], points[j]);\n    String key = midX2 + \":\" + midY2 + \":\" + length;\n    diagonals.computeIfAbsent(key, unused -> new ArrayList<>()).add(new int[] {i, j});\n    addPairs(points, i, j + 1, diagonals);\n  }\n\n  private double evaluateGroups(int[][] points, List<List<int[]>> groups, int index, double best) {\n    if (index == groups.size()) return best;\n    return evaluateGroups(points, groups, index + 1, evaluateGroup(points, groups.get(index), 0, 1, best));\n  }\n\n  private double evaluateGroup(int[][] points, List<int[]> group, int i, int j, double best) {\n    if (i == group.size()) return best;\n    if (j == group.size()) return evaluateGroup(points, group, i + 1, i + 2, best);\n    int[] first = group.get(i), second = group.get(j);\n    int[] p = points[first[0]], q = points[second[0]], r = points[second[1]];\n    double area = Math.sqrt(squaredDistance(p, q)) * Math.sqrt(squaredDistance(p, r));\n    if (area > 0) best = Math.min(best, area);\n    return evaluateGroup(points, group, i, j + 1, best);\n  }\n\n  private int squaredDistance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public double minAreaFreeRect(int[][] points) {\n    Map<String, List<int[]>> diagonals = new HashMap<>();\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        int midX2 = points[i][0] + points[j][0];\n        int midY2 = points[i][1] + points[j][1];\n        int length = squaredDistance(points[i], points[j]);\n        String key = midX2 + \":\" + midY2 + \":\" + length;\n        diagonals.computeIfAbsent(key, unused -> new ArrayList<>()).add(new int[] {i, j});\n      }\n    }\n\n    double best = Double.MAX_VALUE;\n    for (List<int[]> group : diagonals.values()) {\n      for (int i = 0; i < group.size(); i++) {\n        for (int j = i + 1; j < group.size(); j++) {\n          int[] first = group.get(i), second = group.get(j);\n          int[] p = points[first[0]];\n          int[] q = points[second[0]];\n          int[] r = points[second[1]];\n          double area = Math.sqrt(squaredDistance(p, q)) * Math.sqrt(squaredDistance(p, r));\n          if (area > 0) best = Math.min(best, area);\n        }\n      }\n    }\n    return best == Double.MAX_VALUE ? 0.0 : best;\n  }\n\n  private int squaredDistance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public double minAreaFreeRect(int[][] points) {\n    Map<String, List<int[]>> diagonals = new HashMap<>();\n    for (int i = 0; i < points.length; i++) {\n      for (int j = i + 1; j < points.length; j++) {\n        int midX2 = points[i][0] + points[j][0];\n        int midY2 = points[i][1] + points[j][1];\n        int length = squaredDistance(points[i], points[j]);\n        String key = midX2 + \":\" + midY2 + \":\" + length;\n        diagonals.computeIfAbsent(key, unused -> new ArrayList<>()).add(new int[] {i, j});\n      }\n    }\n\n    double best = Double.MAX_VALUE;\n    for (List<int[]> group : diagonals.values()) {\n      for (int i = 0; i < group.size(); i++) {\n        for (int j = i + 1; j < group.size(); j++) {\n          int[] first = group.get(i), second = group.get(j);\n          int[] p = points[first[0]];\n          int[] q = points[second[0]];\n          int[] r = points[second[1]];\n          double area = Math.sqrt(squaredDistance(p, q)) * Math.sqrt(squaredDistance(p, r));\n          if (area > 0) best = Math.min(best, area);\n        }\n      }\n    }\n    return best == Double.MAX_VALUE ? 0.0 : best;\n  }\n\n  private int squaredDistance(int[] a, int[] b) {\n    int dx = a[0] - b[0], dy = a[1] - b[1];\n    return dx * dx + dy * dy;\n  }\n}"
    }
  ],
  "checklist": [
    "If only relative turn direction matters, reach for cross products before slopes.",
    "If distances are compared, use squared distance to avoid floating-point error.",
    "If rectangles are axis-aligned, reduce overlap to independent x/y interval overlap.",
    "If many points share a relation with one anchor, hash normalized slopes or distances.",
    "If union/outline changes at x-coordinates, consider sweep-line or coordinate compression."
  ],
  "traps": [
    "Using division for slopes and losing precision or mishandling vertical lines.",
    "Forgetting duplicate points when counting lines, squares, or distances.",
    "Treating touching rectangles as overlapping when positive area is required.",
    "Returning convex hull without keeping collinear boundary points when required.",
    "Overflowing int when squaring coordinates or computing cross products."
  ],
  "edgeCases": [
    "Duplicate points and zero-length vectors.",
    "Vertical and horizontal lines.",
    "Negative coordinates and very large coordinate values.",
    "Collinear boundary points on hull or polygon edges.",
    "Degenerate rectangles or circles with radius zero."
  ],
  "complexities": [
    "Pair enumeration is usually O(n^2); triple enumeration is O(n^3).",
    "Hashing normalized geometric keys often reduces repeated checks to O(n^2).",
    "Sweep-line with balanced structures is commonly O(n log n); coordinate compression can be O(n^3) for rectangle union but simple and robust.",
    "Convex hull by monotonic chain is O(n log n) time and O(n) space.",
    "Grid/circle brute enumeration depends on bounding-box area, not just object count."
  ],
  "mentalModel": [
    "Translate geometry into integer invariants: cross, dot, squared distance, midpoint, and interval overlap.",
    "Avoid floating point unless the required output is floating point.",
    "Choose the anchor carefully: many point problems become hash counts around one anchor.",
    "Separate degeneracy checks from the main formula.",
    "For sweeps, process events in sorted order and keep only the active state needed for the current x."
  ],
  "revisionStrategy": [
    "Day 1: redo cross product, squared distance, rectangle overlap, robot simulation, and Chebyshev distance.",
    "Day 3: redo max points on a line, boomerangs, DetectSquares, and minimum area rectangle.",
    "Day 7: redo convex hull, convex polygon, self crossing, and rectangle union area.",
    "Day 14: mix skyline, rotated rectangle, mirror reflection, and coordinate-generation problems.",
    "Before interviews: classify each unseen geometry problem by invariant first, then write code."
  ],
  "unseen": [
    "Given many rectangles, find whether one query point lies inside any rectangle.",
    "Return the smallest radius circle centered at origin that contains at least k labeled points with unique labels.",
    "Given a polygon path, decide whether every turn is clockwise or collinear.",
    "Given moving robots on a grid, determine whether any two paths intersect.",
    "Given points, count how many unordered pairs have the same midpoint and length."
  ]
};
