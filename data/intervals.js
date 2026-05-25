const CURRENT_PATTERN = {
  "id": "intervals",
  "name": "Intervals",
  "summary": "Merge ranges, detect overlaps, sweep endpoints, schedule resources, and answer interval queries with sorted structures.",
  "complete": true,
  "subpatterns": [
    "Sorted merge intervals",
    "Insert and merge interval",
    "Earliest finish non-overlap greedy",
    "Pairwise overlap detection",
    "Meeting rooms with min-heap",
    "Interval stabbing by endpoint",
    "Difference array sweep line",
    "K-way interval merge",
    "Two-list interval intersection",
    "Covered interval removal",
    "Calendar overlap detection",
    "Double booking overlap tracking",
    "Sweep line maximum overlap",
    "Contiguous range summarization",
    "Dynamic disjoint interval maintenance",
    "Character last-occurrence intervals",
    "Duration interval union",
    "Dynamic range add/remove/query",
    "Offline interval query with heap",
    "Colored segment sweep line",
    "Union length of meeting intervals",
    "Painted area union with jump compression",
    "Interval coverage greedy",
    "Binary search over interval starts",
    "Attend events with earliest end heap",
    "Weighted interval scheduling",
    "Two-pointer meeting slot intersection",
    "Minimum groups by active overlap",
    "Dynamic interval count with TreeMap"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Merge Intervals",
      "difficulty": "Medium",
      "subpattern": "Sorted merge intervals",
      "question": "Given an array of intervals, merge all overlapping intervals and return the non-overlapping intervals that cover the same ranges.",
      "trigger": "After sorting by start, only the last merged interval can overlap the current interval.",
      "intuition": "Keep one active merged interval; extend its end on overlap, otherwise emit a new interval.",
      "edgeCases": "One interval, touching endpoints, nested intervals, unsorted input, all intervals overlapping.",
      "constraints": "1 <= intervals.length <= 10000; intervals[i].length == 2; 0 <= start <= end <= 10000.",
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
          "explanation": "Touching endpoints merge in this problem."
        },
        {
          "input": "intervals = [[1,4],[0,2],[3,5]]",
          "output": "[[0,5]]",
          "explanation": "All intervals connect after sorting."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(n). Repeatedly search for any overlapping pair and merge it.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sorting dominates; the merge scan is linear.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursion scans sorted intervals and maintains the merged list.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    List<int[]> list = new ArrayList<>();\n    for (int[] interval : intervals) list.add(interval.clone());\n    boolean changed = true;\n\n    while (changed) {\n      changed = false;\n      outer:\n      for (int i = 0; i < list.size(); i++) {\n        for (int j = i + 1; j < list.size(); j++) {\n          int[] a = list.get(i);\n          int[] b = list.get(j);\n          if (a[0] <= b[1] && b[0] <= a[1]) {\n            list.set(i, new int[] {Math.min(a[0], b[0]), Math.max(a[1], b[1])});\n            list.remove(j);\n            changed = true;\n            break outer;\n          }\n        }\n      }\n    }\n    return list.toArray(new int[list.size()][]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    scan(intervals, 0, merged);\n    return merged.toArray(new int[merged.size()][]);\n  }\n\n  private void scan(int[][] intervals, int index, List<int[]> merged) {\n    if (index == intervals.length) return;\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < intervals[index][0]) {\n      merged.add(intervals[index].clone());\n    } else {\n      int[] last = merged.get(merged.size() - 1);\n      last[1] = Math.max(last[1], intervals[index][1]);\n    }\n    scan(intervals, index + 1, merged);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Insert Interval",
      "difficulty": "Medium",
      "subpattern": "Insert and merge interval",
      "question": "Given non-overlapping intervals sorted by start and a new interval, insert the new interval and merge if necessary.",
      "trigger": "Sorted non-overlapping input lets you copy intervals before, merge the overlapping middle, then copy intervals after.",
      "intuition": "Move in three phases: before new interval, overlapping with new interval, and after new interval.",
      "edgeCases": "Empty interval list, insert before all, insert after all, new interval covers many intervals, touching endpoints.",
      "constraints": "0 <= intervals.length <= 10000; intervals are sorted by start and non-overlapping; 0 <= start <= end <= 100000.",
      "source": {
        "label": "Insert Interval - LeetCode 57",
        "url": "https://leetcode.com/problems/insert-interval/"
      },
      "examples": [
        {
          "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
          "output": "[[1,5],[6,9]]",
          "explanation": "The new interval overlaps [1,3]."
        },
        {
          "input": "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
          "output": "[[1,2],[3,10],[12,16]]",
          "explanation": "The new interval bridges three intervals."
        },
        {
          "input": "intervals = [], newInterval = [5,7]",
          "output": "[[5,7]]",
          "explanation": "The new interval is the only result."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Append the new interval, sort everything, then run merge intervals.",
      "optimizedComplexity": "Time O(n); Space O(n). Sorted input allows one linear pass without re-sorting.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan handles before, merge, and after phases.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    int[][] all = new int[intervals.length + 1][2];\n    for (int i = 0; i < intervals.length; i++) all[i] = intervals[i].clone();\n    all[intervals.length] = newInterval.clone();\n    Arrays.sort(all, (a, b) -> Integer.compare(a[0], b[0]));\n\n    List<int[]> merged = new ArrayList<>();\n    for (int[] interval : all) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) merged.add(interval.clone());\n      else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List<int[]> result = new ArrayList<>();\n    int i = 0;\n\n    while (i < intervals.length && intervals[i][1] < newInterval[0]) {\n      result.add(intervals[i++].clone());\n    }\n    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {\n      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n      i++;\n    }\n    result.add(newInterval.clone());\n    while (i < intervals.length) result.add(intervals[i++].clone());\n    return result.toArray(new int[result.size()][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List<int[]> result = new ArrayList<>();\n    add(intervals, 0, newInterval.clone(), false, result);\n    return result.toArray(new int[result.size()][]);\n  }\n\n  private void add(int[][] intervals, int index, int[] current, boolean placed, List<int[]> result) {\n    if (index == intervals.length) {\n      if (!placed) result.add(current.clone());\n      return;\n    }\n    int[] interval = intervals[index];\n    if (placed || interval[1] < current[0]) {\n      result.add(interval.clone());\n      add(intervals, index + 1, current, placed, result);\n    } else if (current[1] < interval[0]) {\n      result.add(current.clone());\n      result.add(interval.clone());\n      add(intervals, index + 1, current, true, result);\n    } else {\n      current[0] = Math.min(current[0], interval[0]);\n      current[1] = Math.max(current[1], interval[1]);\n      add(intervals, index + 1, current, false, result);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List<int[]> result = new ArrayList<>();\n    int i = 0;\n\n    while (i < intervals.length && intervals[i][1] < newInterval[0]) {\n      result.add(intervals[i++].clone());\n    }\n    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {\n      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n      i++;\n    }\n    result.add(newInterval.clone());\n    while (i < intervals.length) result.add(intervals[i++].clone());\n    return result.toArray(new int[result.size()][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] insert(int[][] intervals, int[] newInterval) {\n    List<int[]> result = new ArrayList<>();\n    int i = 0;\n\n    while (i < intervals.length && intervals[i][1] < newInterval[0]) {\n      result.add(intervals[i++].clone());\n    }\n    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {\n      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n      i++;\n    }\n    result.add(newInterval.clone());\n    while (i < intervals.length) result.add(intervals[i++].clone());\n    return result.toArray(new int[result.size()][]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Non-overlapping Intervals",
      "difficulty": "Medium",
      "subpattern": "Earliest finish non-overlap greedy",
      "question": "Given intervals, return the minimum number of intervals to remove so the rest are non-overlapping.",
      "trigger": "Keeping the interval with the earliest end leaves the most room for future intervals.",
      "intuition": "Sort by end time and keep every interval whose start is at or after the previous kept end.",
      "edgeCases": "Touching endpoints, duplicate intervals, nested intervals, all overlap, no overlap.",
      "constraints": "1 <= intervals.length <= 100000; -50000 <= start < end <= 50000.",
      "source": {
        "label": "Non-overlapping Intervals - LeetCode 435",
        "url": "https://leetcode.com/problems/non-overlapping-intervals/"
      },
      "examples": [
        {
          "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
          "output": "1",
          "explanation": "Remove [1,3]."
        },
        {
          "input": "intervals = [[1,2],[1,2],[1,2]]",
          "output": "2",
          "explanation": "Only one duplicate interval can remain."
        },
        {
          "input": "intervals = [[1,2],[2,3]]",
          "output": "0",
          "explanation": "Touching endpoints do not overlap."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Try keeping or removing each interval and maximize the kept count.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Earliest finish greedy scans once.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive scan after sorting by end time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    int kept = keep(intervals, 0, Integer.MIN_VALUE);\n    return intervals.length - kept;\n  }\n\n  private int keep(int[][] intervals, int index, int previousEnd) {\n    if (index == intervals.length) return 0;\n    int skip = keep(intervals, index + 1, previousEnd);\n    int take = 0;\n    if (intervals[index][0] >= previousEnd) take = 1 + keep(intervals, index + 1, intervals[index][1]);\n    return Math.max(skip, take);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] < end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    return scan(intervals, 0, Integer.MIN_VALUE);\n  }\n\n  private int scan(int[][] intervals, int index, int end) {\n    if (index == intervals.length) return 0;\n    if (intervals[index][0] < end) return 1 + scan(intervals, index + 1, end);\n    return scan(intervals, index + 1, intervals[index][1]);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] < end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] < end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}"
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
      "constraints": "0 <= intervals.length <= 10000; 0 <= start < end <= 1000000.",
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
      "bruteForceCode": "class Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    for (int i = 0; i < intervals.length; i++) {\n      for (int j = i + 1; j < intervals.length; j++) {\n        if (intervals[i][0] < intervals[j][1] && intervals[j][0] < intervals[i][1]) return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i < intervals.length; i++) {\n      if (intervals[i][0] < intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    return check(intervals, 1);\n  }\n\n  private boolean check(int[][] intervals, int index) {\n    if (index == intervals.length) return true;\n    if (intervals[index][0] < intervals[index - 1][1]) return false;\n    return check(intervals, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i < intervals.length; i++) {\n      if (intervals[i][0] < intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i < intervals.length; i++) {\n      if (intervals[i][0] < intervals[i - 1][1]) return false;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Meeting Rooms II",
      "difficulty": "Medium",
      "subpattern": "Meeting rooms with min-heap",
      "question": "Given meeting intervals, return the minimum number of rooms required so every meeting can be held.",
      "trigger": "The number of active overlapping meetings is the number of rooms needed; the earliest ending meeting is the first room that can be reused.",
      "intuition": "Sort by start time, keep active end times in a min-heap, and reuse rooms whose meetings ended.",
      "edgeCases": "No meetings, one meeting, touching endpoints, all meetings overlap, meetings with same start time.",
      "constraints": "0 <= intervals.length <= 10000; 0 <= start < end <= 1000000.",
      "source": {
        "label": "Meeting Rooms II - LeetCode 253",
        "url": "https://leetcode.com/problems/meeting-rooms-ii/"
      },
      "examples": [
        {
          "input": "intervals = [[0,30],[5,10],[15,20]]",
          "output": "2",
          "explanation": "Two rooms are enough because [5,10] ends before [15,20]."
        },
        {
          "input": "intervals = [[7,10],[2,4]]",
          "output": "1",
          "explanation": "The meetings do not overlap."
        },
        {
          "input": "intervals = [[1,5],[2,6],[3,7]]",
          "output": "3",
          "explanation": "All three are active at time 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Count active meetings at each meeting start.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sort meetings and use a min-heap of active end times.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive scheduler updates the same min-heap.",
      "bruteForceCode": "class Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    int rooms = 0;\n    for (int[] point : intervals) {\n      int active = 0;\n      int time = point[0];\n      for (int[] meeting : intervals) {\n        if (meeting[0] <= time && time < meeting[1]) active++;\n      }\n      rooms = Math.max(rooms, active);\n    }\n    return rooms;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() && activeEnds.peek() <= meeting[0]) activeEnds.poll();\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n    return rooms;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    return schedule(intervals, 0, new PriorityQueue<>(), 0);\n  }\n\n  private int schedule(int[][] intervals, int index, PriorityQueue<Integer> activeEnds, int best) {\n    if (index == intervals.length) return best;\n    while (!activeEnds.isEmpty() && activeEnds.peek() <= intervals[index][0]) activeEnds.poll();\n    activeEnds.offer(intervals[index][1]);\n    return schedule(intervals, index + 1, activeEnds, Math.max(best, activeEnds.size()));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() && activeEnds.peek() <= meeting[0]) activeEnds.poll();\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n    return rooms;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minMeetingRooms(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int rooms = 0;\n\n    for (int[] meeting : intervals) {\n      while (!activeEnds.isEmpty() && activeEnds.peek() <= meeting[0]) activeEnds.poll();\n      activeEnds.offer(meeting[1]);\n      rooms = Math.max(rooms, activeEnds.size());\n    }\n    return rooms;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Number of Arrows to Burst Balloons",
      "difficulty": "Medium",
      "subpattern": "Interval stabbing by endpoint",
      "question": "Given balloon intervals on the x-axis, return the minimum number of arrows needed to burst all balloons.",
      "trigger": "An arrow at the earliest ending balloon also bursts every currently overlapping balloon and preserves future options.",
      "intuition": "Sort by end coordinate; shoot a new arrow only when the next balloon starts after the last arrow.",
      "edgeCases": "One balloon, touching endpoints, nested intervals, negative coordinates, very large endpoints.",
      "constraints": "1 <= points.length <= 100000; -2^31 <= start < end <= 2^31 - 1.",
      "source": {
        "label": "Minimum Number of Arrows to Burst Balloons - LeetCode 452",
        "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
      },
      "examples": [
        {
          "input": "points = [[10,16],[2,8],[1,6],[7,12]]",
          "output": "2",
          "explanation": "Arrows at 6 and 12 burst all balloons."
        },
        {
          "input": "points = [[1,2],[3,4],[5,6],[7,8]]",
          "output": "4",
          "explanation": "No balloons overlap."
        },
        {
          "input": "points = [[1,2],[2,3]]",
          "output": "1",
          "explanation": "An arrow at 2 bursts both balloons."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(n). Try shooting at endpoints and mark all balloons hit by each shot.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. One endpoint scan counts arrows.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive endpoint scan after sorting.",
      "bruteForceCode": "class Solution {\n  public int findMinArrowShots(int[][] points) {\n    return search(points, new boolean[points.length]);\n  }\n\n  private int search(int[][] points, boolean[] hit) {\n    int first = -1;\n    for (int i = 0; i < points.length; i++) if (!hit[i]) { first = i; break; }\n    if (first == -1) return 0;\n    int best = points.length;\n    for (int i = 0; i < points.length; i++) {\n      if (hit[i]) continue;\n      long arrow = points[i][1];\n      boolean[] next = hit.clone();\n      for (int j = 0; j < points.length; j++) {\n        if (points[j][0] <= arrow && arrow <= points[j][1]) next[j] = true;\n      }\n      best = Math.min(best, 1 + search(points, next));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] > arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    return scan(points, 0, Long.MIN_VALUE, 0);\n  }\n\n  private int scan(int[][] points, int index, long arrow, int arrows) {\n    if (index == points.length) return arrows;\n    if (arrows == 0 || points[index][0] > arrow) {\n      return scan(points, index + 1, points[index][1], arrows + 1);\n    }\n    return scan(points, index + 1, arrow, arrows);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] > arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] > arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Car Pooling",
      "difficulty": "Medium",
      "subpattern": "Difference array sweep line",
      "question": "Given trips [passengers, from, to] and vehicle capacity, return true if all trips can be completed without exceeding capacity.",
      "trigger": "Passenger count changes only at pickup and drop-off points, making this a sweep-line capacity problem.",
      "intuition": "Add passengers at pickup, subtract at drop-off, then scan locations in order to track current load.",
      "edgeCases": "Pickup and drop-off at same location boundary, exact capacity, multiple trips starting together, no overlap, capacity exceeded briefly.",
      "constraints": "1 <= trips.length <= 1000; 1 <= passengers <= 100; 0 <= from < to <= 1000; 1 <= capacity <= 100000.",
      "source": {
        "label": "Car Pooling - LeetCode 1094",
        "url": "https://leetcode.com/problems/car-pooling/"
      },
      "examples": [
        {
          "input": "trips = [[2,1,5],[3,3,7]], capacity = 4",
          "output": "false",
          "explanation": "The load reaches 5 between locations 3 and 5."
        },
        {
          "input": "trips = [[2,1,5],[3,3,7]], capacity = 5",
          "output": "true",
          "explanation": "The maximum load equals capacity."
        },
        {
          "input": "trips = [[3,2,7],[3,7,9],[8,3,9]], capacity = 11",
          "output": "true",
          "explanation": "Drop-offs at 7 happen before later load continues."
        }
      ],
      "bruteForceComplexity": "Time O(trips * maxLocation); Space O(1). Check passenger load at every location directly.",
      "optimizedComplexity": "Time O(trips + maxLocation); Space O(maxLocation). Difference array scans route coordinates once.",
      "recursiveComplexity": "Time O(trips log trips); Space O(trips). Recursive sweep over sorted pickup/drop-off events.",
      "bruteForceCode": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    for (int location = 0; location <= 1000; location++) {\n      int load = 0;\n      for (int[] trip : trips) {\n        if (trip[1] <= location && location < trip[2]) load += trip[0];\n      }\n      if (load > capacity) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] delta = new int[1001];\n    for (int[] trip : trips) {\n      delta[trip[1]] += trip[0];\n      delta[trip[2]] -= trip[0];\n    }\n\n    int load = 0;\n    for (int change : delta) {\n      load += change;\n      if (load > capacity) return false;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[][] events = new int[trips.length * 2][2];\n    int index = 0;\n    for (int[] trip : trips) {\n      events[index++] = new int[] {trip[1], trip[0]};\n      events[index++] = new int[] {trip[2], -trip[0]};\n    }\n    Arrays.sort(events, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));\n    return sweep(events, 0, 0, capacity);\n  }\n\n  private boolean sweep(int[][] events, int index, int load, int capacity) {\n    if (index == events.length) return true;\n    int nextLoad = load + events[index][1];\n    return nextLoad <= capacity && sweep(events, index + 1, nextLoad, capacity);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] delta = new int[1001];\n    for (int[] trip : trips) {\n      delta[trip[1]] += trip[0];\n      delta[trip[2]] -= trip[0];\n    }\n\n    int load = 0;\n    for (int change : delta) {\n      load += change;\n      if (load > capacity) return false;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean carPooling(int[][] trips, int capacity) {\n    int[] delta = new int[1001];\n    for (int[] trip : trips) {\n      delta[trip[1]] += trip[0];\n      delta[trip[2]] -= trip[0];\n    }\n\n    int load = 0;\n    for (int change : delta) {\n      load += change;\n      if (load > capacity) return false;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Employee Free Time",
      "difficulty": "Hard",
      "subpattern": "K-way interval merge",
      "question": "Given each employee schedule as sorted non-overlapping intervals, return finite intervals when all employees are free.",
      "trigger": "All busy intervals across employees can be merged; gaps between merged busy blocks are common free time.",
      "intuition": "Flatten or k-way merge busy intervals, track the current busy end, and emit gaps before the next busy block.",
      "edgeCases": "One employee, no common gap, touching busy intervals, nested busy intervals, multiple employees with uneven schedule lengths.",
      "constraints": "1 <= schedule.length, total intervals <= 10000; intervals are sorted and non-overlapping per employee.",
      "source": {
        "label": "Employee Free Time - LeetCode 759",
        "url": "https://leetcode.com/problems/employee-free-time/"
      },
      "examples": [
        {
          "input": "schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]",
          "output": "[[3,4]]",
          "explanation": "All employees are free between 3 and 4."
        },
        {
          "input": "schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]",
          "output": "[[5,6],[7,9]]",
          "explanation": "Gaps between merged busy blocks are common free intervals."
        },
        {
          "input": "schedule = [[[1,5]],[[2,3]]]",
          "output": "[]",
          "explanation": "There is no finite common free interval."
        }
      ],
      "bruteForceComplexity": "Time O(m log m); Space O(m). Flatten all busy intervals, sort, and merge to find gaps.",
      "optimizedComplexity": "Time O(m log k); Space O(k). K-way heap merge avoids sorting all intervals at once.",
      "recursiveComplexity": "Time O(m log m); Space O(m). Recursive sorted scan finds gaps between merged busy blocks.",
      "bruteForceCode": "import java.util.*;\n\nclass Interval {\n  public int start;\n  public int end;\n  public Interval() {}\n  public Interval(int start, int end) { this.start = start; this.end = end; }\n}\n\nclass Solution {\n  public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {\n    List<Interval> all = new ArrayList<>();\n    for (List<Interval> employee : schedule) all.addAll(employee);\n    all.sort((a, b) -> Integer.compare(a.start, b.start));\n    return gaps(all);\n  }\n\n  private List<Interval> gaps(List<Interval> busy) {\n    List<Interval> free = new ArrayList<>();\n    if (busy.isEmpty()) return free;\n    int end = busy.get(0).end;\n    for (int i = 1; i < busy.size(); i++) {\n      if (busy.get(i).start > end) free.add(new Interval(end, busy.get(i).start));\n      end = Math.max(end, busy.get(i).end);\n    }\n    return free;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Interval {\n  public int start;\n  public int end;\n  public Interval() {}\n  public Interval(int start, int end) { this.start = start; this.end = end; }\n}\n\nclass Solution {\n  public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(schedule.get(a[0]).get(a[1]).start, schedule.get(b[0]).get(b[1]).start));\n    for (int i = 0; i < schedule.size(); i++) if (!schedule.get(i).isEmpty()) heap.offer(new int[] {i, 0});\n\n    List<Interval> free = new ArrayList<>();\n    int end = -1;\n    boolean initialized = false;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      Interval interval = schedule.get(current[0]).get(current[1]);\n      if (!initialized) {\n        end = interval.end;\n        initialized = true;\n      } else if (interval.start > end) {\n        free.add(new Interval(end, interval.start));\n        end = interval.end;\n      } else {\n        end = Math.max(end, interval.end);\n      }\n      if (current[1] + 1 < schedule.get(current[0]).size()) heap.offer(new int[] {current[0], current[1] + 1});\n    }\n    return free;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Interval {\n  public int start;\n  public int end;\n  public Interval() {}\n  public Interval(int start, int end) { this.start = start; this.end = end; }\n}\n\nclass Solution {\n  public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {\n    List<Interval> all = new ArrayList<>();\n    for (List<Interval> employee : schedule) all.addAll(employee);\n    all.sort((a, b) -> Integer.compare(a.start, b.start));\n    List<Interval> free = new ArrayList<>();\n    if (!all.isEmpty()) scan(all, 1, all.get(0).end, free);\n    return free;\n  }\n\n  private void scan(List<Interval> busy, int index, int end, List<Interval> free) {\n    if (index == busy.size()) return;\n    Interval current = busy.get(index);\n    if (current.start > end) {\n      free.add(new Interval(end, current.start));\n      scan(busy, index + 1, current.end, free);\n    } else {\n      scan(busy, index + 1, Math.max(end, current.end), free);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Interval {\n  public int start;\n  public int end;\n  public Interval() {}\n  public Interval(int start, int end) { this.start = start; this.end = end; }\n}\n\nclass Solution {\n  public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(schedule.get(a[0]).get(a[1]).start, schedule.get(b[0]).get(b[1]).start));\n    for (int i = 0; i < schedule.size(); i++) if (!schedule.get(i).isEmpty()) heap.offer(new int[] {i, 0});\n\n    List<Interval> free = new ArrayList<>();\n    int end = -1;\n    boolean initialized = false;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      Interval interval = schedule.get(current[0]).get(current[1]);\n      if (!initialized) {\n        end = interval.end;\n        initialized = true;\n      } else if (interval.start > end) {\n        free.add(new Interval(end, interval.start));\n        end = interval.end;\n      } else {\n        end = Math.max(end, interval.end);\n      }\n      if (current[1] + 1 < schedule.get(current[0]).size()) heap.offer(new int[] {current[0], current[1] + 1});\n    }\n    return free;\n  }\n}",
      "code": "import java.util.*;\n\nclass Interval {\n  public int start;\n  public int end;\n  public Interval() {}\n  public Interval(int start, int end) { this.start = start; this.end = end; }\n}\n\nclass Solution {\n  public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(schedule.get(a[0]).get(a[1]).start, schedule.get(b[0]).get(b[1]).start));\n    for (int i = 0; i < schedule.size(); i++) if (!schedule.get(i).isEmpty()) heap.offer(new int[] {i, 0});\n\n    List<Interval> free = new ArrayList<>();\n    int end = -1;\n    boolean initialized = false;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      Interval interval = schedule.get(current[0]).get(current[1]);\n      if (!initialized) {\n        end = interval.end;\n        initialized = true;\n      } else if (interval.start > end) {\n        free.add(new Interval(end, interval.start));\n        end = interval.end;\n      } else {\n        end = Math.max(end, interval.end);\n      }\n      if (current[1] + 1 < schedule.get(current[0]).size()) heap.offer(new int[] {current[0], current[1] + 1});\n    }\n    return free;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Interval List Intersections",
      "difficulty": "Medium",
      "subpattern": "Two-list interval intersection",
      "question": "Given two sorted lists of disjoint intervals, return all intersections between the two lists.",
      "trigger": "Only the current interval from each list can intersect; the interval with smaller end finishes first.",
      "intuition": "Intersect current intervals by max starts and min ends, then advance the pointer with the smaller end.",
      "edgeCases": "One list empty, touching endpoints, no intersections, one interval contained inside another, uneven list lengths.",
      "constraints": "0 <= firstList.length, secondList.length <= 1000; intervals are sorted and pairwise disjoint.",
      "source": {
        "label": "Interval List Intersections - LeetCode 986",
        "url": "https://leetcode.com/problems/interval-list-intersections/"
      },
      "examples": [
        {
          "input": "firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]",
          "output": "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
          "explanation": "Each output interval is the overlap of one interval from each list."
        },
        {
          "input": "firstList = [[1,3],[5,9]], secondList = []",
          "output": "[]",
          "explanation": "No second-list interval exists."
        },
        {
          "input": "firstList = [[1,7]], secondList = [[3,10]]",
          "output": "[[3,7]]",
          "explanation": "The overlap is bounded by max start and min end."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(answer). Compare every pair of intervals.",
      "optimizedComplexity": "Time O(m + n); Space O(answer). Two pointers advance by smaller end.",
      "recursiveComplexity": "Time O(m + n); Space O(answer + m + n). Recursive two-pointer scan.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n    List<int[]> result = new ArrayList<>();\n    for (int[] a : firstList) {\n      for (int[] b : secondList) {\n        int start = Math.max(a[0], b[0]);\n        int end = Math.min(a[1], b[1]);\n        if (start <= end) result.add(new int[] {start, end});\n      }\n    }\n    result.sort((a, b) -> Integer.compare(a[0], b[0]));\n    return result.toArray(new int[result.size()][]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n    List<int[]> result = new ArrayList<>();\n    int i = 0;\n    int j = 0;\n\n    while (i < firstList.length && j < secondList.length) {\n      int start = Math.max(firstList[i][0], secondList[j][0]);\n      int end = Math.min(firstList[i][1], secondList[j][1]);\n      if (start <= end) result.add(new int[] {start, end});\n      if (firstList[i][1] < secondList[j][1]) i++; else j++;\n    }\n    return result.toArray(new int[result.size()][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n    List<int[]> result = new ArrayList<>();\n    scan(firstList, secondList, 0, 0, result);\n    return result.toArray(new int[result.size()][]);\n  }\n\n  private void scan(int[][] a, int[][] b, int i, int j, List<int[]> result) {\n    if (i == a.length || j == b.length) return;\n    int start = Math.max(a[i][0], b[j][0]);\n    int end = Math.min(a[i][1], b[j][1]);\n    if (start <= end) result.add(new int[] {start, end});\n    if (a[i][1] < b[j][1]) scan(a, b, i + 1, j, result);\n    else scan(a, b, i, j + 1, result);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n    List<int[]> result = new ArrayList<>();\n    int i = 0;\n    int j = 0;\n\n    while (i < firstList.length && j < secondList.length) {\n      int start = Math.max(firstList[i][0], secondList[j][0]);\n      int end = Math.min(firstList[i][1], secondList[j][1]);\n      if (start <= end) result.add(new int[] {start, end});\n      if (firstList[i][1] < secondList[j][1]) i++; else j++;\n    }\n    return result.toArray(new int[result.size()][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n    List<int[]> result = new ArrayList<>();\n    int i = 0;\n    int j = 0;\n\n    while (i < firstList.length && j < secondList.length) {\n      int start = Math.max(firstList[i][0], secondList[j][0]);\n      int end = Math.min(firstList[i][1], secondList[j][1]);\n      if (start <= end) result.add(new int[] {start, end});\n      if (firstList[i][1] < secondList[j][1]) i++; else j++;\n    }\n    return result.toArray(new int[result.size()][]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Remove Covered Intervals",
      "difficulty": "Medium",
      "subpattern": "Covered interval removal",
      "question": "Given intervals, remove every interval covered by another interval and return the number of remaining intervals.",
      "trigger": "Sorting by start ascending and end descending ensures a covered interval appears after the interval covering it.",
      "intuition": "Track the farthest end seen so far; an interval with end not greater than that is covered.",
      "edgeCases": "Same start different end, duplicate intervals, nested intervals, no covered intervals, one interval.",
      "constraints": "1 <= intervals.length <= 1000; 0 <= start < end <= 100000.",
      "source": {
        "label": "Remove Covered Intervals - LeetCode 1288",
        "url": "https://leetcode.com/problems/remove-covered-intervals/"
      },
      "examples": [
        {
          "input": "intervals = [[1,4],[3,6],[2,8]]",
          "output": "2",
          "explanation": "[3,6] is covered by [2,8]."
        },
        {
          "input": "intervals = [[1,4],[2,3]]",
          "output": "1",
          "explanation": "[2,3] is covered by [1,4]."
        },
        {
          "input": "intervals = [[0,10],[5,12]]",
          "output": "2",
          "explanation": "Neither interval fully covers the other."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Check every interval against every other interval.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. One pass tracks the farthest end.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive sorted scan counts uncovered intervals.",
      "bruteForceCode": "class Solution {\n  public int removeCoveredIntervals(int[][] intervals) {\n    int covered = 0;\n    for (int i = 0; i < intervals.length; i++) {\n      for (int j = 0; j < intervals.length; j++) {\n        if (i == j) continue;\n        if (intervals[j][0] <= intervals[i][0] && intervals[i][1] <= intervals[j][1]) {\n          covered++;\n          break;\n        }\n      }\n    }\n    return intervals.length - covered;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int removeCoveredIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));\n    int remaining = 0;\n    int farthestEnd = -1;\n\n    for (int[] interval : intervals) {\n      if (interval[1] > farthestEnd) {\n        remaining++;\n        farthestEnd = interval[1];\n      }\n    }\n    return remaining;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int removeCoveredIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));\n    return count(intervals, 0, -1);\n  }\n\n  private int count(int[][] intervals, int index, int farthestEnd) {\n    if (index == intervals.length) return 0;\n    if (intervals[index][1] <= farthestEnd) return count(intervals, index + 1, farthestEnd);\n    return 1 + count(intervals, index + 1, intervals[index][1]);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int removeCoveredIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));\n    int remaining = 0;\n    int farthestEnd = -1;\n\n    for (int[] interval : intervals) {\n      if (interval[1] > farthestEnd) {\n        remaining++;\n        farthestEnd = interval[1];\n      }\n    }\n    return remaining;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int removeCoveredIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));\n    int remaining = 0;\n    int farthestEnd = -1;\n\n    for (int[] interval : intervals) {\n      if (interval[1] > farthestEnd) {\n        remaining++;\n        farthestEnd = interval[1];\n      }\n    }\n    return remaining;\n  }\n}"
    },
    {
      "group": "core",
      "name": "My Calendar I",
      "difficulty": "Medium",
      "subpattern": "Calendar overlap detection",
      "question": "Implement a calendar that supports book(start, end), returning false if the new half-open interval overlaps an existing booking.",
      "trigger": "Only the existing interval immediately before or after the new start can overlap in a sorted calendar.",
      "intuition": "Store bookings by start time and compare the previous interval end and next interval start.",
      "edgeCases": "Touching bookings, duplicate booking, booking before all, booking after all, nested overlap.",
      "constraints": "0 <= start < end <= 10^9; at most 1000 calls to book.",
      "source": {
        "label": "My Calendar I - LeetCode 729",
        "url": "https://leetcode.com/problems/my-calendar-i/"
      },
      "examples": [
        {
          "input": "book(10,20), book(15,25), book(20,30)",
          "output": "true, false, true",
          "explanation": "[15,25) overlaps [10,20), but [20,30) only touches."
        },
        {
          "input": "book(5,10), book(10,15)",
          "output": "true, true",
          "explanation": "Half-open intervals can touch at 10."
        },
        {
          "input": "book(30,40), book(20,35)",
          "output": "true, false",
          "explanation": "[20,35) overlaps [30,40)."
        }
      ],
      "bruteForceComplexity": "Time O(n) per booking; Space O(n). Scan all previous bookings for overlap.",
      "optimizedComplexity": "Time O(log n) per booking; Space O(n). TreeMap checks neighboring intervals only.",
      "recursiveComplexity": "Time O(n) per booking; Space O(n). Recursive scan over a list of bookings.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCalendar {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public MyCalendar() {}\n\n  public boolean book(int start, int end) {\n    for (int[] booking : bookings) {\n      if (start < booking[1] && booking[0] < end) return false;\n    }\n    bookings.add(new int[] {start, end});\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MyCalendar {\n  private final TreeMap<Integer, Integer> calendar = new TreeMap<>();\n\n  public MyCalendar() {}\n\n  public boolean book(int start, int end) {\n    Integer previous = calendar.floorKey(start);\n    if (previous != null && calendar.get(previous) > start) return false;\n    Integer next = calendar.ceilingKey(start);\n    if (next != null && next < end) return false;\n    calendar.put(start, end);\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MyCalendar {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public MyCalendar() {}\n\n  public boolean book(int start, int end) {\n    if (overlaps(start, end, 0)) return false;\n    bookings.add(new int[] {start, end});\n    return true;\n  }\n\n  private boolean overlaps(int start, int end, int index) {\n    if (index == bookings.size()) return false;\n    int[] booking = bookings.get(index);\n    if (start < booking[1] && booking[0] < end) return true;\n    return overlaps(start, end, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MyCalendar {\n  private final TreeMap<Integer, Integer> calendar = new TreeMap<>();\n\n  public MyCalendar() {}\n\n  public boolean book(int start, int end) {\n    Integer previous = calendar.floorKey(start);\n    if (previous != null && calendar.get(previous) > start) return false;\n    Integer next = calendar.ceilingKey(start);\n    if (next != null && next < end) return false;\n    calendar.put(start, end);\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass MyCalendar {\n  private final TreeMap<Integer, Integer> calendar = new TreeMap<>();\n\n  public MyCalendar() {}\n\n  public boolean book(int start, int end) {\n    Integer previous = calendar.floorKey(start);\n    if (previous != null && calendar.get(previous) > start) return false;\n    Integer next = calendar.ceilingKey(start);\n    if (next != null && next < end) return false;\n    calendar.put(start, end);\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "My Calendar II",
      "difficulty": "Medium",
      "subpattern": "Double booking overlap tracking",
      "question": "Implement a calendar where a booking is accepted unless it causes a triple booking.",
      "trigger": "A new interval is invalid exactly when it overlaps an interval that is already double-booked.",
      "intuition": "Keep all bookings and all pairwise overlaps; reject if the new booking overlaps an existing overlap range.",
      "edgeCases": "Touching intervals, two overlaps allowed, triple overlap rejected, new booking contained inside overlap, large endpoints.",
      "constraints": "0 <= start < end <= 10^9; at most 1000 calls to book.",
      "source": {
        "label": "My Calendar II - LeetCode 731",
        "url": "https://leetcode.com/problems/my-calendar-ii/"
      },
      "examples": [
        {
          "input": "book(10,20), book(50,60), book(10,40), book(5,15), book(5,10), book(25,55)",
          "output": "true, true, true, false, true, true",
          "explanation": "[5,15) would create a triple overlap."
        },
        {
          "input": "book(1,5), book(5,10), book(2,6)",
          "output": "true, true, true",
          "explanation": "Touching at 5 does not overlap; double booking is allowed."
        },
        {
          "input": "book(1,10), book(2,9), book(3,8)",
          "output": "true, true, false",
          "explanation": "The third booking overlaps an existing double-booked range."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) per booking; Space O(n). Add the interval temporarily and sweep endpoints to detect overlap count 3.",
      "optimizedComplexity": "Time O(n) per booking; Space O(n). Check double-booked overlaps first, then record new overlaps.",
      "recursiveComplexity": "Time O(n) per booking; Space O(n). Recursive scans check overlaps and record new double ranges.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public MyCalendarTwo() {}\n\n  public boolean book(int start, int end) {\n    bookings.add(new int[] {start, end});\n    TreeMap<Integer, Integer> delta = new TreeMap<>();\n    for (int[] booking : bookings) {\n      delta.put(booking[0], delta.getOrDefault(booking[0], 0) + 1);\n      delta.put(booking[1], delta.getOrDefault(booking[1], 0) - 1);\n    }\n    int active = 0;\n    for (int change : delta.values()) {\n      active += change;\n      if (active >= 3) {\n        bookings.remove(bookings.size() - 1);\n        return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public MyCalendarTwo() {}\n\n  public boolean book(int start, int end) {\n    for (int[] overlap : overlaps) {\n      if (start < overlap[1] && overlap[0] < end) return false;\n    }\n    for (int[] booking : bookings) {\n      int left = Math.max(start, booking[0]);\n      int right = Math.min(end, booking[1]);\n      if (left < right) overlaps.add(new int[] {left, right});\n    }\n    bookings.add(new int[] {start, end});\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public MyCalendarTwo() {}\n\n  public boolean book(int start, int end) {\n    if (hitsOverlap(start, end, 0)) return false;\n    addOverlaps(start, end, 0);\n    bookings.add(new int[] {start, end});\n    return true;\n  }\n\n  private boolean hitsOverlap(int start, int end, int index) {\n    if (index == overlaps.size()) return false;\n    int[] overlap = overlaps.get(index);\n    return (start < overlap[1] && overlap[0] < end) || hitsOverlap(start, end, index + 1);\n  }\n\n  private void addOverlaps(int start, int end, int index) {\n    if (index == bookings.size()) return;\n    int[] booking = bookings.get(index);\n    int left = Math.max(start, booking[0]);\n    int right = Math.min(end, booking[1]);\n    if (left < right) overlaps.add(new int[] {left, right});\n    addOverlaps(start, end, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public MyCalendarTwo() {}\n\n  public boolean book(int start, int end) {\n    for (int[] overlap : overlaps) {\n      if (start < overlap[1] && overlap[0] < end) return false;\n    }\n    for (int[] booking : bookings) {\n      int left = Math.max(start, booking[0]);\n      int right = Math.min(end, booking[1]);\n      if (left < right) overlaps.add(new int[] {left, right});\n    }\n    bookings.add(new int[] {start, end});\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass MyCalendarTwo {\n  private final List<int[]> bookings = new ArrayList<>();\n  private final List<int[]> overlaps = new ArrayList<>();\n\n  public MyCalendarTwo() {}\n\n  public boolean book(int start, int end) {\n    for (int[] overlap : overlaps) {\n      if (start < overlap[1] && overlap[0] < end) return false;\n    }\n    for (int[] booking : bookings) {\n      int left = Math.max(start, booking[0]);\n      int right = Math.min(end, booking[1]);\n      if (left < right) overlaps.add(new int[] {left, right});\n    }\n    bookings.add(new int[] {start, end});\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "My Calendar III",
      "difficulty": "Hard",
      "subpattern": "Sweep line maximum overlap",
      "question": "Implement a calendar that returns the maximum number of overlapping bookings after each new half-open booking.",
      "trigger": "Every booking adds one active interval at start and removes one at end; the maximum prefix sum is the answer.",
      "intuition": "Store endpoint deltas in sorted order and sweep them after each booking to find peak overlap.",
      "edgeCases": "Touching bookings, identical bookings, nested bookings, increasing overlap, large coordinates.",
      "constraints": "0 <= start < end <= 10^9; at most 400 calls to book.",
      "source": {
        "label": "My Calendar III - LeetCode 732",
        "url": "https://leetcode.com/problems/my-calendar-iii/"
      },
      "examples": [
        {
          "input": "book(10,20), book(50,60), book(10,40), book(5,15), book(5,10), book(25,55)",
          "output": "1, 1, 2, 3, 3, 3",
          "explanation": "The peak overlap becomes 3 after booking [5,15)."
        },
        {
          "input": "book(1,5), book(5,10)",
          "output": "1, 1",
          "explanation": "Half-open intervals touching at 5 do not overlap."
        },
        {
          "input": "book(1,10), book(2,9), book(3,8)",
          "output": "1, 2, 3",
          "explanation": "Nested intervals increase the overlap count."
        }
      ],
      "bruteForceComplexity": "Time O(n log n) per booking; Space O(n). Store every booking and build a fresh sweep each call.",
      "optimizedComplexity": "Time O(n) per booking after O(log n) updates; Space O(n). TreeMap endpoint deltas are swept in order.",
      "recursiveComplexity": "Time O(n) per booking; Space O(n). Recursive sweep over endpoint deltas computes the maximum overlap.",
      "bruteForceCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final List<int[]> bookings = new ArrayList<>();\n\n  public MyCalendarThree() {}\n\n  public int book(int start, int end) {\n    bookings.add(new int[] {start, end});\n    TreeMap<Integer, Integer> delta = new TreeMap<>();\n    for (int[] booking : bookings) {\n      delta.put(booking[0], delta.getOrDefault(booking[0], 0) + 1);\n      delta.put(booking[1], delta.getOrDefault(booking[1], 0) - 1);\n    }\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public MyCalendarThree() {}\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public MyCalendarThree() {}\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    return sweep(new ArrayList<>(delta.values()), 0, 0, 0);\n  }\n\n  private int sweep(List<Integer> changes, int index, int active, int best) {\n    if (index == changes.size()) return best;\n    int next = active + changes.get(index);\n    return sweep(changes, index + 1, next, Math.max(best, next));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public MyCalendarThree() {}\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass MyCalendarThree {\n  private final TreeMap<Integer, Integer> delta = new TreeMap<>();\n\n  public MyCalendarThree() {}\n\n  public int book(int start, int end) {\n    delta.put(start, delta.getOrDefault(start, 0) + 1);\n    delta.put(end, delta.getOrDefault(end, 0) - 1);\n    int active = 0;\n    int best = 0;\n    for (int change : delta.values()) {\n      active += change;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Summary Ranges",
      "difficulty": "Easy",
      "subpattern": "Contiguous range summarization",
      "question": "Given a sorted unique integer array, summarize consecutive runs as single values or start->end ranges.",
      "trigger": "Consecutive values form one interval; a gap closes the current range.",
      "intuition": "Track the start of the current run and emit it when the next value is not previous + 1.",
      "edgeCases": "Empty array, one number, negative numbers, Integer.MAX_VALUE boundary, multiple singletons.",
      "constraints": "0 <= nums.length <= 20; -2^31 <= nums[i] <= 2^31 - 1; nums is sorted and unique.",
      "source": {
        "label": "Summary Ranges - LeetCode 228",
        "url": "https://leetcode.com/problems/summary-ranges/"
      },
      "examples": [
        {
          "input": "nums = [0,1,2,4,5,7]",
          "output": "[\"0->2\",\"4->5\",\"7\"]",
          "explanation": "0..2 and 4..5 are consecutive runs."
        },
        {
          "input": "nums = [0,2,3,4,6,8,9]",
          "output": "[\"0\",\"2->4\",\"6\",\"8->9\"]",
          "explanation": "Gaps split the ranges."
        },
        {
          "input": "nums = []",
          "output": "[]",
          "explanation": "No numbers produce no ranges."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1) excluding output. Directly scan each run with a nested loop that advances across consecutive values.",
      "optimizedComplexity": "Time O(n); Space O(1) excluding output. One pass tracks the current run start.",
      "recursiveComplexity": "Time O(n); Space O(n) call stack. Recursive builder emits one run at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> summaryRanges(int[] nums) {\n    List<String> result = new ArrayList<>();\n    int i = 0;\n    while (i < nums.length) {\n      int start = nums[i];\n      int j = i;\n      while (j + 1 < nums.length && (long) nums[j + 1] == (long) nums[j] + 1) j++;\n      result.add(format(start, nums[j]));\n      i = j + 1;\n    }\n    return result;\n  }\n\n  private String format(int start, int end) {\n    return start == end ? String.valueOf(start) : start + \"->\" + end;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> summaryRanges(int[] nums) {\n    List<String> result = new ArrayList<>();\n    if (nums.length == 0) return result;\n    int start = nums[0];\n\n    for (int i = 1; i <= nums.length; i++) {\n      if (i == nums.length || (long) nums[i] != (long) nums[i - 1] + 1) {\n        result.add(start == nums[i - 1] ? String.valueOf(start) : start + \"->\" + nums[i - 1]);\n        if (i < nums.length) start = nums[i];\n      }\n    }\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> summaryRanges(int[] nums) {\n    List<String> result = new ArrayList<>();\n    build(nums, 0, result);\n    return result;\n  }\n\n  private void build(int[] nums, int index, List<String> result) {\n    if (index == nums.length) return;\n    int end = index;\n    while (end + 1 < nums.length && (long) nums[end + 1] == (long) nums[end] + 1) end++;\n    result.add(nums[index] == nums[end] ? String.valueOf(nums[index]) : nums[index] + \"->\" + nums[end]);\n    build(nums, end + 1, result);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> summaryRanges(int[] nums) {\n    List<String> result = new ArrayList<>();\n    if (nums.length == 0) return result;\n    int start = nums[0];\n\n    for (int i = 1; i <= nums.length; i++) {\n      if (i == nums.length || (long) nums[i] != (long) nums[i - 1] + 1) {\n        result.add(start == nums[i - 1] ? String.valueOf(start) : start + \"->\" + nums[i - 1]);\n        if (i < nums.length) start = nums[i];\n      }\n    }\n    return result;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> summaryRanges(int[] nums) {\n    List<String> result = new ArrayList<>();\n    if (nums.length == 0) return result;\n    int start = nums[0];\n\n    for (int i = 1; i <= nums.length; i++) {\n      if (i == nums.length || (long) nums[i] != (long) nums[i - 1] + 1) {\n        result.add(start == nums[i - 1] ? String.valueOf(start) : start + \"->\" + nums[i - 1]);\n        if (i < nums.length) start = nums[i];\n      }\n    }\n    return result;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Data Stream as Disjoint Intervals",
      "difficulty": "Hard",
      "subpattern": "Dynamic disjoint interval maintenance",
      "question": "Design a data structure that receives numbers from a stream and returns disjoint sorted intervals summarizing all numbers seen.",
      "trigger": "A new value can only merge with the interval ending at value - 1 and the interval starting at value + 1.",
      "intuition": "Maintain intervals in a TreeMap keyed by start; update neighboring intervals around the inserted value.",
      "edgeCases": "Duplicate add, bridge two intervals, extend left, extend right, add isolated value.",
      "constraints": "0 <= value <= 10000; at most 30000 calls to addNum and getIntervals.",
      "source": {
        "label": "Data Stream as Disjoint Intervals - LeetCode 352",
        "url": "https://leetcode.com/problems/data-stream-as-disjoint-intervals/"
      },
      "examples": [
        {
          "input": "addNum(1), getIntervals(), addNum(3), getIntervals(), addNum(2), getIntervals()",
          "output": "[[1,1]], [[1,1],[3,3]], [[1,3]]",
          "explanation": "Adding 2 bridges [1,1] and [3,3]."
        },
        {
          "input": "addNum(5), addNum(5), getIntervals()",
          "output": "[[5,5]]",
          "explanation": "Duplicate values do not change intervals."
        },
        {
          "input": "addNum(1), addNum(2), addNum(4)",
          "output": "[[1,2],[4,4]]",
          "explanation": "Only consecutive values merge."
        }
      ],
      "bruteForceComplexity": "Time O(V) per getIntervals; Space O(V). Store seen values in a boolean array and scan the value range.",
      "optimizedComplexity": "Time O(log n) per addNum and O(n) per getIntervals; Space O(n). TreeMap merges neighbors dynamically.",
      "recursiveComplexity": "Time O(n) per addNum in the recursive list version; Space O(n). Recursive insertion keeps intervals disjoint.",
      "bruteForceCode": "import java.util.*;\n\nclass SummaryRanges {\n  private final boolean[] seen = new boolean[10001];\n\n  public SummaryRanges() {}\n\n  public void addNum(int value) {\n    seen[value] = true;\n  }\n\n  public int[][] getIntervals() {\n    List<int[]> result = new ArrayList<>();\n    int i = 0;\n    while (i < seen.length) {\n      if (!seen[i]) {\n        i++;\n        continue;\n      }\n      int start = i;\n      while (i + 1 < seen.length && seen[i + 1]) i++;\n      result.add(new int[] {start, i});\n      i++;\n    }\n    return result.toArray(new int[result.size()][]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass SummaryRanges {\n  private final TreeMap<Integer, int[]> intervals = new TreeMap<>();\n\n  public SummaryRanges() {}\n\n  public void addNum(int value) {\n    Integer floor = intervals.floorKey(value);\n    if (floor != null && intervals.get(floor)[1] >= value) return;\n    int start = value;\n    int end = value;\n    if (floor != null && intervals.get(floor)[1] + 1 == value) {\n      start = floor;\n      end = intervals.get(floor)[1];\n      intervals.remove(floor);\n    }\n    Integer ceiling = intervals.ceilingKey(value);\n    if (ceiling != null && ceiling == value + 1) {\n      end = intervals.get(ceiling)[1];\n      intervals.remove(ceiling);\n    }\n    intervals.put(start, new int[] {start, end});\n  }\n\n  public int[][] getIntervals() {\n    return intervals.values().toArray(new int[intervals.size()][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass SummaryRanges {\n  private final List<int[]> intervals = new ArrayList<>();\n\n  public SummaryRanges() {}\n\n  public void addNum(int value) {\n    insert(value, 0);\n  }\n\n  private void insert(int value, int index) {\n    if (index == intervals.size()) {\n      intervals.add(new int[] {value, value});\n      return;\n    }\n    int[] current = intervals.get(index);\n    if (value < current[0] - 1) {\n      intervals.add(index, new int[] {value, value});\n    } else if (value == current[0] - 1) {\n      current[0] = value;\n    } else if (current[0] <= value && value <= current[1]) {\n      return;\n    } else if (value == current[1] + 1) {\n      current[1] = value;\n      if (index + 1 < intervals.size() && current[1] + 1 >= intervals.get(index + 1)[0]) {\n        current[1] = intervals.get(index + 1)[1];\n        intervals.remove(index + 1);\n      }\n    } else {\n      insert(value, index + 1);\n    }\n  }\n\n  public int[][] getIntervals() {\n    return intervals.toArray(new int[intervals.size()][]);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass SummaryRanges {\n  private final TreeMap<Integer, int[]> intervals = new TreeMap<>();\n\n  public SummaryRanges() {}\n\n  public void addNum(int value) {\n    Integer floor = intervals.floorKey(value);\n    if (floor != null && intervals.get(floor)[1] >= value) return;\n    int start = value;\n    int end = value;\n    if (floor != null && intervals.get(floor)[1] + 1 == value) {\n      start = floor;\n      end = intervals.get(floor)[1];\n      intervals.remove(floor);\n    }\n    Integer ceiling = intervals.ceilingKey(value);\n    if (ceiling != null && ceiling == value + 1) {\n      end = intervals.get(ceiling)[1];\n      intervals.remove(ceiling);\n    }\n    intervals.put(start, new int[] {start, end});\n  }\n\n  public int[][] getIntervals() {\n    return intervals.values().toArray(new int[intervals.size()][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass SummaryRanges {\n  private final TreeMap<Integer, int[]> intervals = new TreeMap<>();\n\n  public SummaryRanges() {}\n\n  public void addNum(int value) {\n    Integer floor = intervals.floorKey(value);\n    if (floor != null && intervals.get(floor)[1] >= value) return;\n    int start = value;\n    int end = value;\n    if (floor != null && intervals.get(floor)[1] + 1 == value) {\n      start = floor;\n      end = intervals.get(floor)[1];\n      intervals.remove(floor);\n    }\n    Integer ceiling = intervals.ceilingKey(value);\n    if (ceiling != null && ceiling == value + 1) {\n      end = intervals.get(ceiling)[1];\n      intervals.remove(ceiling);\n    }\n    intervals.put(start, new int[] {start, end});\n  }\n\n  public int[][] getIntervals() {\n    return intervals.values().toArray(new int[intervals.size()][]);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Partition Labels",
      "difficulty": "Medium",
      "subpattern": "Character last-occurrence intervals",
      "question": "Given a string, split it into as many parts as possible so each letter appears in at most one part. Return the part lengths.",
      "trigger": "Each character creates an interval from first occurrence to last occurrence; partitions close when all active character intervals end.",
      "intuition": "Track the farthest last occurrence among characters seen in the current partition and close when the scan reaches it.",
      "edgeCases": "All unique characters, all same character, one character spans the whole string, repeated blocks, single character.",
      "constraints": "1 <= s.length <= 500; s contains lowercase English letters.",
      "source": {
        "label": "Partition Labels - LeetCode 763",
        "url": "https://leetcode.com/problems/partition-labels/"
      },
      "examples": [
        {
          "input": "s = \"ababcbacadefegdehijhklij\"",
          "output": "[9,7,8]",
          "explanation": "Each letter appears in only one partition."
        },
        {
          "input": "s = \"eccbbbbdec\"",
          "output": "[10]",
          "explanation": "The intervals force one full-string partition."
        },
        {
          "input": "s = \"abc\"",
          "output": "[1,1,1]",
          "explanation": "Each character closes immediately."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(n). Try segment boundaries and verify no character escapes the segment.",
      "optimizedComplexity": "Time O(n); Space O(1). Fixed alphabet last-occurrence table drives one scan.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive builder emits one partition at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    List<Integer> result = new ArrayList<>();\n    build(s, 0, result);\n    return result;\n  }\n\n  private void build(String s, int start, List<Integer> result) {\n    if (start == s.length()) return;\n    for (int end = start; end < s.length(); end++) {\n      if (valid(s, start, end)) {\n        result.add(end - start + 1);\n        build(s, end + 1, result);\n        return;\n      }\n    }\n  }\n\n  private boolean valid(String s, int start, int end) {\n    for (int i = start; i <= end; i++) {\n      for (int j = end + 1; j < s.length(); j++) if (s.charAt(i) == s.charAt(j)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n\n    List<Integer> result = new ArrayList<>();\n    int start = 0;\n    int end = 0;\n    for (int i = 0; i < s.length(); i++) {\n      end = Math.max(end, last[s.charAt(i) - 'a']);\n      if (i == end) {\n        result.add(end - start + 1);\n        start = i + 1;\n      }\n    }\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n    List<Integer> result = new ArrayList<>();\n    build(s, last, 0, result);\n    return result;\n  }\n\n  private void build(String s, int[] last, int start, List<Integer> result) {\n    if (start == s.length()) return;\n    int end = start;\n    for (int i = start; i <= end; i++) end = Math.max(end, last[s.charAt(i) - 'a']);\n    result.add(end - start + 1);\n    build(s, last, end + 1, result);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n\n    List<Integer> result = new ArrayList<>();\n    int start = 0;\n    int end = 0;\n    for (int i = 0; i < s.length(); i++) {\n      end = Math.max(end, last[s.charAt(i) - 'a']);\n      if (i == end) {\n        result.add(end - start + 1);\n        start = i + 1;\n      }\n    }\n    return result;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n\n    List<Integer> result = new ArrayList<>();\n    int start = 0;\n    int end = 0;\n    for (int i = 0; i < s.length(); i++) {\n      end = Math.max(end, last[s.charAt(i) - 'a']);\n      if (i == end) {\n        result.add(end - start + 1);\n        start = i + 1;\n      }\n    }\n    return result;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Teemo Attacking",
      "difficulty": "Easy",
      "subpattern": "Duration interval union",
      "question": "Given sorted attack times and poison duration, return the total seconds Ashe is poisoned.",
      "trigger": "Each attack creates interval [time, time + duration); overlapping poison intervals should be counted once.",
      "intuition": "Add either the full duration or only the gap from the previous attack, whichever is smaller.",
      "edgeCases": "One attack, duration one, attacks closer than duration, attacks exactly duration apart, many overlapping attacks.",
      "constraints": "1 <= timeSeries.length <= 10000; 0 <= timeSeries[i], duration <= 10000000; timeSeries is sorted.",
      "source": {
        "label": "Teemo Attacking - LeetCode 495",
        "url": "https://leetcode.com/problems/teemo-attacking/"
      },
      "examples": [
        {
          "input": "timeSeries = [1,4], duration = 2",
          "output": "4",
          "explanation": "Intervals [1,3) and [4,6) do not overlap."
        },
        {
          "input": "timeSeries = [1,2], duration = 2",
          "output": "3",
          "explanation": "Intervals [1,3) and [2,4) merge to length 3."
        },
        {
          "input": "timeSeries = [5], duration = 10",
          "output": "10",
          "explanation": "One attack poisons for the full duration."
        }
      ],
      "bruteForceComplexity": "Time O(n * duration); Space O(totalTime). Mark each poisoned second directly.",
      "optimizedComplexity": "Time O(n); Space O(1). Sum min(duration, gap to next attack) for every attack.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive accumulation of interval union length.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int findPoisonedDuration(int[] timeSeries, int duration) {\n    Set<Integer> poisoned = new HashSet<>();\n    for (int time : timeSeries) {\n      for (int second = time; second < time + duration; second++) poisoned.add(second);\n    }\n    return poisoned.size();\n  }\n}",
      "iterativeCode": "class Solution {\n  public int findPoisonedDuration(int[] timeSeries, int duration) {\n    int total = 0;\n    for (int i = 0; i < timeSeries.length; i++) {\n      if (i + 1 < timeSeries.length) total += Math.min(duration, timeSeries[i + 1] - timeSeries[i]);\n      else total += duration;\n    }\n    return total;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int findPoisonedDuration(int[] timeSeries, int duration) {\n    return sum(timeSeries, duration, 0);\n  }\n\n  private int sum(int[] timeSeries, int duration, int index) {\n    if (index == timeSeries.length) return 0;\n    int current = index + 1 < timeSeries.length ? Math.min(duration, timeSeries[index + 1] - timeSeries[index]) : duration;\n    return current + sum(timeSeries, duration, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int findPoisonedDuration(int[] timeSeries, int duration) {\n    int total = 0;\n    for (int i = 0; i < timeSeries.length; i++) {\n      if (i + 1 < timeSeries.length) total += Math.min(duration, timeSeries[i + 1] - timeSeries[i]);\n      else total += duration;\n    }\n    return total;\n  }\n}",
      "code": "class Solution {\n  public int findPoisonedDuration(int[] timeSeries, int duration) {\n    int total = 0;\n    for (int i = 0; i < timeSeries.length; i++) {\n      if (i + 1 < timeSeries.length) total += Math.min(duration, timeSeries[i + 1] - timeSeries[i]);\n      else total += duration;\n    }\n    return total;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Range Module",
      "difficulty": "Hard",
      "subpattern": "Dynamic range add/remove/query",
      "question": "Design a structure that tracks half-open ranges and supports addRange, queryRange, and removeRange.",
      "trigger": "Tracked intervals must stay disjoint and sorted while add merges and remove splits ranges.",
      "intuition": "Use a TreeMap keyed by interval start; merge neighbors on add, check covering floor interval on query, and split affected intervals on remove.",
      "edgeCases": "Touching ranges, removing middle of an interval, adding a range that bridges intervals, query exact boundary, remove non-existing range.",
      "constraints": "1 <= left < right <= 10^9; at most 10000 calls.",
      "source": {
        "label": "Range Module - LeetCode 715",
        "url": "https://leetcode.com/problems/range-module/"
      },
      "examples": [
        {
          "input": "addRange(10,20), removeRange(14,16), queryRange(10,14), queryRange(13,15), queryRange(16,17)",
          "output": "true, false, true",
          "explanation": "Removing [14,16) splits the tracked range."
        },
        {
          "input": "addRange(1,5), addRange(5,10), queryRange(2,9)",
          "output": "true",
          "explanation": "Touching ranges merge into [1,10)."
        },
        {
          "input": "addRange(10,20), removeRange(5,15), queryRange(10,14)",
          "output": "false",
          "explanation": "The left part of the tracked interval was removed."
        }
      ],
      "bruteForceComplexity": "Time O(number of stored intervals) per operation; Space O(number of intervals). List version scans and rebuilds intervals.",
      "optimizedComplexity": "Time O(k log n) for add/remove over affected intervals and O(log n) for query; Space O(n). TreeMap keeps disjoint ranges.",
      "recursiveComplexity": "Time O(n) per operation in the recursive list version; Space O(n). Recursive helpers merge, query, and split intervals.",
      "bruteForceCode": "import java.util.*;\n\nclass RangeModule {\n  private final List<int[]> ranges = new ArrayList<>();\n\n  public RangeModule() {}\n\n  public void addRange(int left, int right) {\n    ranges.add(new int[] {left, right});\n    ranges.sort((a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    for (int[] range : ranges) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < range[0]) merged.add(range.clone());\n      else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], range[1]);\n    }\n    ranges.clear();\n    ranges.addAll(merged);\n  }\n\n  public boolean queryRange(int left, int right) {\n    for (int[] range : ranges) if (range[0] <= left && right <= range[1]) return true;\n    return false;\n  }\n\n  public void removeRange(int left, int right) {\n    List<int[]> next = new ArrayList<>();\n    for (int[] range : ranges) {\n      if (range[1] <= left || right <= range[0]) next.add(range);\n      else {\n        if (range[0] < left) next.add(new int[] {range[0], left});\n        if (right < range[1]) next.add(new int[] {right, range[1]});\n      }\n    }\n    ranges.clear();\n    ranges.addAll(next);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n\n  public RangeModule() {}\n\n  public void addRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) >= left) {\n      left = start;\n      right = Math.max(right, ranges.get(start));\n      ranges.remove(start);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next <= right) {\n      right = Math.max(right, ranges.get(next));\n      ranges.remove(next);\n      next = ranges.ceilingKey(left);\n    }\n    ranges.put(left, right);\n  }\n\n  public boolean queryRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    return start != null && ranges.get(start) >= right;\n  }\n\n  public void removeRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) > left) {\n      int end = ranges.get(start);\n      ranges.put(start, left);\n      if (end > right) ranges.put(right, end);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next < right) {\n      int end = ranges.get(next);\n      ranges.remove(next);\n      if (end > right) {\n        ranges.put(right, end);\n        break;\n      }\n      next = ranges.ceilingKey(left);\n    }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass RangeModule {\n  private final List<int[]> ranges = new ArrayList<>();\n\n  public RangeModule() {}\n\n  public void addRange(int left, int right) {\n    ranges.add(new int[] {left, right});\n    ranges.sort((a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    merge(0, merged);\n    ranges.clear();\n    ranges.addAll(merged);\n  }\n\n  private void merge(int index, List<int[]> merged) {\n    if (index == ranges.size()) return;\n    int[] range = ranges.get(index);\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < range[0]) merged.add(range.clone());\n    else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], range[1]);\n    merge(index + 1, merged);\n  }\n\n  public boolean queryRange(int left, int right) {\n    return query(left, right, 0);\n  }\n\n  private boolean query(int left, int right, int index) {\n    if (index == ranges.size()) return false;\n    int[] range = ranges.get(index);\n    return (range[0] <= left && right <= range[1]) || query(left, right, index + 1);\n  }\n\n  public void removeRange(int left, int right) {\n    List<int[]> next = new ArrayList<>();\n    remove(left, right, 0, next);\n    ranges.clear();\n    ranges.addAll(next);\n  }\n\n  private void remove(int left, int right, int index, List<int[]> next) {\n    if (index == ranges.size()) return;\n    int[] range = ranges.get(index);\n    if (range[1] <= left || right <= range[0]) next.add(range);\n    else {\n      if (range[0] < left) next.add(new int[] {range[0], left});\n      if (right < range[1]) next.add(new int[] {right, range[1]});\n    }\n    remove(left, right, index + 1, next);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n\n  public RangeModule() {}\n\n  public void addRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) >= left) {\n      left = start;\n      right = Math.max(right, ranges.get(start));\n      ranges.remove(start);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next <= right) {\n      right = Math.max(right, ranges.get(next));\n      ranges.remove(next);\n      next = ranges.ceilingKey(left);\n    }\n    ranges.put(left, right);\n  }\n\n  public boolean queryRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    return start != null && ranges.get(start) >= right;\n  }\n\n  public void removeRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) > left) {\n      int end = ranges.get(start);\n      ranges.put(start, left);\n      if (end > right) ranges.put(right, end);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next < right) {\n      int end = ranges.get(next);\n      ranges.remove(next);\n      if (end > right) {\n        ranges.put(right, end);\n        break;\n      }\n      next = ranges.ceilingKey(left);\n    }\n  }\n}",
      "code": "import java.util.*;\n\nclass RangeModule {\n  private final TreeMap<Integer, Integer> ranges = new TreeMap<>();\n\n  public RangeModule() {}\n\n  public void addRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) >= left) {\n      left = start;\n      right = Math.max(right, ranges.get(start));\n      ranges.remove(start);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next <= right) {\n      right = Math.max(right, ranges.get(next));\n      ranges.remove(next);\n      next = ranges.ceilingKey(left);\n    }\n    ranges.put(left, right);\n  }\n\n  public boolean queryRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    return start != null && ranges.get(start) >= right;\n  }\n\n  public void removeRange(int left, int right) {\n    Integer start = ranges.floorKey(left);\n    if (start != null && ranges.get(start) > left) {\n      int end = ranges.get(start);\n      ranges.put(start, left);\n      if (end > right) ranges.put(right, end);\n    }\n    Integer next = ranges.ceilingKey(left);\n    while (next != null && next < right) {\n      int end = ranges.get(next);\n      ranges.remove(next);\n      if (end > right) {\n        ranges.put(right, end);\n        break;\n      }\n      next = ranges.ceilingKey(left);\n    }\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Minimum Interval to Include Each Query",
      "difficulty": "Hard",
      "subpattern": "Offline interval query with heap",
      "question": "Given intervals and queries, return for each query the length of the smallest interval containing it, or -1.",
      "trigger": "Queries can be processed in sorted order while a heap keeps candidate intervals that have started but not ended.",
      "intuition": "Sort intervals by start and queries by value; push intervals whose start is <= query, remove ended intervals, and read the smallest length.",
      "edgeCases": "No containing interval, duplicate queries, nested intervals, intervals with same start, query equals interval boundary.",
      "constraints": "1 <= intervals.length, queries.length <= 100000; 1 <= left <= right <= 10^7; 1 <= queries[i] <= 10^7.",
      "source": {
        "label": "Minimum Interval to Include Each Query - LeetCode 1851",
        "url": "https://leetcode.com/problems/minimum-interval-to-include-each-query/"
      },
      "examples": [
        {
          "input": "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
          "output": "[3,3,1,4]",
          "explanation": "Query 4 is covered by interval [4,4] of length 1."
        },
        {
          "input": "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]",
          "output": "[2,-1,4,6]",
          "explanation": "Query 19 is not covered by any interval."
        },
        {
          "input": "intervals = [[1,10]], queries = [1,10,11]",
          "output": "[10,10,-1]",
          "explanation": "Both endpoints are included."
        }
      ],
      "bruteForceComplexity": "Time O(intervals * queries); Space O(1) excluding output. Check every interval for every query.",
      "optimizedComplexity": "Time O((n + q) log n + q log q); Space O(n + q). Offline sorting with min-heap of candidate intervals.",
      "recursiveComplexity": "Time O(intervals * queries); Space O(queries). Recursive query processing uses direct scanning.",
      "bruteForceCode": "class Solution {\n  public int[] minInterval(int[][] intervals, int[] queries) {\n    int[] answer = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int best = Integer.MAX_VALUE;\n      for (int[] interval : intervals) {\n        if (interval[0] <= queries[i] && queries[i] <= interval[1]) {\n          best = Math.min(best, interval[1] - interval[0] + 1);\n        }\n      }\n      answer[i] = best == Integer.MAX_VALUE ? -1 : best;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] minInterval(int[][] intervals, int[] queries) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    int[][] orderedQueries = new int[queries.length][2];\n    for (int i = 0; i < queries.length; i++) orderedQueries[i] = new int[] {queries[i], i};\n    Arrays.sort(orderedQueries, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    int[] answer = new int[queries.length];\n    int index = 0;\n    for (int[] query : orderedQueries) {\n      int value = query[0];\n      while (index < intervals.length && intervals[index][0] <= value) {\n        int length = intervals[index][1] - intervals[index][0] + 1;\n        heap.offer(new int[] {length, intervals[index][1]});\n        index++;\n      }\n      while (!heap.isEmpty() && heap.peek()[1] < value) heap.poll();\n      answer[query[1]] = heap.isEmpty() ? -1 : heap.peek()[0];\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] minInterval(int[][] intervals, int[] queries) {\n    int[] answer = new int[queries.length];\n    fill(intervals, queries, answer, 0);\n    return answer;\n  }\n\n  private void fill(int[][] intervals, int[] queries, int[] answer, int index) {\n    if (index == queries.length) return;\n    int best = Integer.MAX_VALUE;\n    for (int[] interval : intervals) {\n      if (interval[0] <= queries[index] && queries[index] <= interval[1]) {\n        best = Math.min(best, interval[1] - interval[0] + 1);\n      }\n    }\n    answer[index] = best == Integer.MAX_VALUE ? -1 : best;\n    fill(intervals, queries, answer, index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] minInterval(int[][] intervals, int[] queries) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    int[][] orderedQueries = new int[queries.length][2];\n    for (int i = 0; i < queries.length; i++) orderedQueries[i] = new int[] {queries[i], i};\n    Arrays.sort(orderedQueries, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    int[] answer = new int[queries.length];\n    int index = 0;\n    for (int[] query : orderedQueries) {\n      int value = query[0];\n      while (index < intervals.length && intervals[index][0] <= value) {\n        int length = intervals[index][1] - intervals[index][0] + 1;\n        heap.offer(new int[] {length, intervals[index][1]});\n        index++;\n      }\n      while (!heap.isEmpty() && heap.peek()[1] < value) heap.poll();\n      answer[query[1]] = heap.isEmpty() ? -1 : heap.peek()[0];\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] minInterval(int[][] intervals, int[] queries) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    int[][] orderedQueries = new int[queries.length][2];\n    for (int i = 0; i < queries.length; i++) orderedQueries[i] = new int[] {queries[i], i};\n    Arrays.sort(orderedQueries, (a, b) -> Integer.compare(a[0], b[0]));\n\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n    int[] answer = new int[queries.length];\n    int index = 0;\n    for (int[] query : orderedQueries) {\n      int value = query[0];\n      while (index < intervals.length && intervals[index][0] <= value) {\n        int length = intervals[index][1] - intervals[index][0] + 1;\n        heap.offer(new int[] {length, intervals[index][1]});\n        index++;\n      }\n      while (!heap.isEmpty() && heap.peek()[1] < value) heap.poll();\n      answer[query[1]] = heap.isEmpty() ? -1 : heap.peek()[0];\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Describe the Painting",
      "difficulty": "Medium",
      "subpattern": "Colored segment sweep line",
      "question": "Given colored painting segments [start, end, color], return non-overlapping painted intervals with the sum of colors covering each interval.",
      "trigger": "Color contribution changes only at segment endpoints, so endpoint deltas describe the full painting.",
      "intuition": "Sweep sorted endpoints, emit the previous span whenever the active color sum is non-zero.",
      "edgeCases": "Touching segments, overlapping colors, same start/end points, gaps with no paint, large color sums.",
      "constraints": "1 <= segments.length <= 20000; 1 <= start < end <= 100000; 1 <= color <= 10^9.",
      "source": {
        "label": "Describe the Painting - LeetCode 1943",
        "url": "https://leetcode.com/problems/describe-the-painting/"
      },
      "examples": [
        {
          "input": "segments = [[1,4,5],[4,7,7],[1,7,9]]",
          "output": "[[1,4,14],[4,7,16]]",
          "explanation": "Color sums are constant on [1,4) and [4,7)."
        },
        {
          "input": "segments = [[1,7,9],[6,8,15],[8,10,7]]",
          "output": "[[1,6,9],[6,7,24],[7,8,15],[8,10,7]]",
          "explanation": "Every endpoint where active color changes starts a new span."
        },
        {
          "input": "segments = [[1,4,1],[5,7,2]]",
          "output": "[[1,4,1],[5,7,2]]",
          "explanation": "Gaps with no paint are omitted."
        }
      ],
      "bruteForceComplexity": "Time O(maxCoordinate * segments); Space O(maxCoordinate). Add each color to every unit segment directly.",
      "optimizedComplexity": "Time O(n log n); Space O(n). TreeMap endpoint deltas are swept once.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive sweep over sorted endpoints emits constant-color spans.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Long>> splitPainting(int[][] segments) {\n    long[] color = new long[100001];\n    boolean[] painted = new boolean[100001];\n    for (int[] segment : segments) {\n      for (int x = segment[0]; x < segment[1]; x++) {\n        color[x] += segment[2];\n        painted[x] = true;\n      }\n    }\n    List<List<Long>> result = new ArrayList<>();\n    int x = 0;\n    while (x < color.length) {\n      if (!painted[x]) { x++; continue; }\n      int start = x;\n      long value = color[x];\n      while (x < color.length && painted[x] && color[x] == value) x++;\n      result.add(Arrays.asList((long) start, (long) x, value));\n    }\n    return result;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Long>> splitPainting(int[][] segments) {\n    TreeMap<Integer, Long> delta = new TreeMap<>();\n    for (int[] segment : segments) {\n      delta.put(segment[0], delta.getOrDefault(segment[0], 0L) + segment[2]);\n      delta.put(segment[1], delta.getOrDefault(segment[1], 0L) - segment[2]);\n    }\n\n    List<List<Long>> result = new ArrayList<>();\n    long active = 0;\n    int previous = -1;\n    for (Map.Entry<Integer, Long> entry : delta.entrySet()) {\n      int point = entry.getKey();\n      if (previous != -1 && previous < point && active != 0) {\n        result.add(Arrays.asList((long) previous, (long) point, active));\n      }\n      active += entry.getValue();\n      previous = point;\n    }\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Long>> splitPainting(int[][] segments) {\n    TreeMap<Integer, Long> delta = new TreeMap<>();\n    for (int[] segment : segments) {\n      delta.put(segment[0], delta.getOrDefault(segment[0], 0L) + segment[2]);\n      delta.put(segment[1], delta.getOrDefault(segment[1], 0L) - segment[2]);\n    }\n    List<Map.Entry<Integer, Long>> entries = new ArrayList<>(delta.entrySet());\n    List<List<Long>> result = new ArrayList<>();\n    sweep(entries, 0, -1, 0L, result);\n    return result;\n  }\n\n  private void sweep(List<Map.Entry<Integer, Long>> entries, int index, int previous, long active, List<List<Long>> result) {\n    if (index == entries.size()) return;\n    int point = entries.get(index).getKey();\n    if (previous != -1 && previous < point && active != 0) result.add(Arrays.asList((long) previous, (long) point, active));\n    sweep(entries, index + 1, point, active + entries.get(index).getValue(), result);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Long>> splitPainting(int[][] segments) {\n    TreeMap<Integer, Long> delta = new TreeMap<>();\n    for (int[] segment : segments) {\n      delta.put(segment[0], delta.getOrDefault(segment[0], 0L) + segment[2]);\n      delta.put(segment[1], delta.getOrDefault(segment[1], 0L) - segment[2]);\n    }\n\n    List<List<Long>> result = new ArrayList<>();\n    long active = 0;\n    int previous = -1;\n    for (Map.Entry<Integer, Long> entry : delta.entrySet()) {\n      int point = entry.getKey();\n      if (previous != -1 && previous < point && active != 0) {\n        result.add(Arrays.asList((long) previous, (long) point, active));\n      }\n      active += entry.getValue();\n      previous = point;\n    }\n    return result;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Long>> splitPainting(int[][] segments) {\n    TreeMap<Integer, Long> delta = new TreeMap<>();\n    for (int[] segment : segments) {\n      delta.put(segment[0], delta.getOrDefault(segment[0], 0L) + segment[2]);\n      delta.put(segment[1], delta.getOrDefault(segment[1], 0L) - segment[2]);\n    }\n\n    List<List<Long>> result = new ArrayList<>();\n    long active = 0;\n    int previous = -1;\n    for (Map.Entry<Integer, Long> entry : delta.entrySet()) {\n      int point = entry.getKey();\n      if (previous != -1 && previous < point && active != 0) {\n        result.add(Arrays.asList((long) previous, (long) point, active));\n      }\n      active += entry.getValue();\n      previous = point;\n    }\n    return result;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count Days Without Meetings",
      "difficulty": "Medium",
      "subpattern": "Union length of meeting intervals",
      "question": "Given total days and meeting intervals with inclusive days, return how many days have no meetings.",
      "trigger": "Overlapping meeting ranges should be counted once, so the task is interval union length.",
      "intuition": "Sort meetings by start, merge covered day ranges, and subtract covered days from total days.",
      "edgeCases": "No overlap, all meetings overlap, meetings touching by one day, meetings covering all days, one meeting.",
      "constraints": "1 <= days <= 10^9; 1 <= meetings.length <= 100000; 1 <= start <= end <= days.",
      "source": {
        "label": "Count Days Without Meetings - LeetCode 3169",
        "url": "https://leetcode.com/problems/count-days-without-meetings/"
      },
      "examples": [
        {
          "input": "days = 10, meetings = [[5,7],[1,3],[9,10]]",
          "output": "2",
          "explanation": "Days 4 and 8 have no meetings."
        },
        {
          "input": "days = 5, meetings = [[2,4],[1,3]]",
          "output": "1",
          "explanation": "Meetings cover days 1 through 4."
        },
        {
          "input": "days = 6, meetings = [[1,6]]",
          "output": "0",
          "explanation": "Every day is covered."
        }
      ],
      "bruteForceComplexity": "Time O(days + totalCoveredLength); Space O(days). Mark every covered day directly.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Merge inclusive meeting intervals and count covered days.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive sorted scan accumulates merged coverage.",
      "bruteForceCode": "class Solution {\n  public int countDays(int days, int[][] meetings) {\n    boolean[] busy = new boolean[days + 1];\n    for (int[] meeting : meetings) {\n      for (int day = meeting[0]; day <= meeting[1]; day++) busy[day] = true;\n    }\n    int free = 0;\n    for (int day = 1; day <= days; day++) if (!busy[day]) free++;\n    return free;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countDays(int days, int[][] meetings) {\n    Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));\n    long covered = 0;\n    int start = -1;\n    int end = -1;\n\n    for (int[] meeting : meetings) {\n      if (start == -1 || meeting[0] > end + 1) {\n        if (start != -1) covered += end - start + 1L;\n        start = meeting[0];\n        end = meeting[1];\n      } else {\n        end = Math.max(end, meeting[1]);\n      }\n    }\n    if (start != -1) covered += end - start + 1L;\n    return (int) (days - covered);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countDays(int days, int[][] meetings) {\n    Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));\n    long covered = cover(meetings, 0, -1, -1);\n    return (int) (days - covered);\n  }\n\n  private long cover(int[][] meetings, int index, int start, int end) {\n    if (index == meetings.length) return start == -1 ? 0 : end - start + 1L;\n    int[] meeting = meetings[index];\n    if (start == -1) return cover(meetings, index + 1, meeting[0], meeting[1]);\n    if (meeting[0] > end + 1) return end - start + 1L + cover(meetings, index + 1, meeting[0], meeting[1]);\n    return cover(meetings, index + 1, start, Math.max(end, meeting[1]));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countDays(int days, int[][] meetings) {\n    Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));\n    long covered = 0;\n    int start = -1;\n    int end = -1;\n\n    for (int[] meeting : meetings) {\n      if (start == -1 || meeting[0] > end + 1) {\n        if (start != -1) covered += end - start + 1L;\n        start = meeting[0];\n        end = meeting[1];\n      } else {\n        end = Math.max(end, meeting[1]);\n      }\n    }\n    if (start != -1) covered += end - start + 1L;\n    return (int) (days - covered);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countDays(int days, int[][] meetings) {\n    Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));\n    long covered = 0;\n    int start = -1;\n    int end = -1;\n\n    for (int[] meeting : meetings) {\n      if (start == -1 || meeting[0] > end + 1) {\n        if (start != -1) covered += end - start + 1L;\n        start = meeting[0];\n        end = meeting[1];\n      } else {\n        end = Math.max(end, meeting[1]);\n      }\n    }\n    if (start != -1) covered += end - start + 1L;\n    return (int) (days - covered);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Amount of New Area Painted Each Day",
      "difficulty": "Hard",
      "subpattern": "Painted area union with jump compression",
      "question": "Given paint intervals [start, end), return how many new unit segments are painted on each day.",
      "trigger": "Already-painted unit positions should be skipped efficiently when future intervals overlap them.",
      "intuition": "Use a next-unpainted pointer array so each painted coordinate jumps to the next available coordinate.",
      "edgeCases": "Fully overlapping paint, adjacent intervals, disjoint intervals, repeated same interval, zero new paint on a day.",
      "constraints": "1 <= paint.length <= 100000; 0 <= start < end <= 50000.",
      "source": {
        "label": "Amount of New Area Painted Each Day - LeetCode 2158",
        "url": "https://leetcode.com/problems/amount-of-new-area-painted-each-day/"
      },
      "examples": [
        {
          "input": "paint = [[1,4],[4,7],[5,8]]",
          "output": "[3,3,1]",
          "explanation": "The last day only paints unit segment [7,8)."
        },
        {
          "input": "paint = [[1,4],[5,8],[4,7]]",
          "output": "[3,3,1]",
          "explanation": "The third day only paints [4,5)."
        },
        {
          "input": "paint = [[1,5],[1,5]]",
          "output": "[4,0]",
          "explanation": "The second interval is already painted."
        }
      ],
      "bruteForceComplexity": "Time O(total painted coordinate length); Space O(maxCoordinate). Mark each unit segment directly.",
      "optimizedComplexity": "Time O(maxCoordinate + total newly painted with inverse-Ackermann-like jumps); Space O(maxCoordinate). Jump compression skips painted units.",
      "recursiveComplexity": "Time O(total painted coordinate length); Space O(maxCoordinate + recursion depth). Recursive direct marking for each interval.",
      "bruteForceCode": "class Solution {\n  public int[] amountPainted(int[][] paint) {\n    boolean[] painted = new boolean[50001];\n    int[] answer = new int[paint.length];\n    for (int i = 0; i < paint.length; i++) {\n      for (int x = paint[i][0]; x < paint[i][1]; x++) {\n        if (!painted[x]) {\n          painted[x] = true;\n          answer[i]++;\n        }\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] amountPainted(int[][] paint) {\n    int max = 0;\n    for (int[] job : paint) max = Math.max(max, job[1]);\n    int[] next = new int[max + 1];\n    for (int i = 0; i <= max; i++) next[i] = i;\n\n    int[] answer = new int[paint.length];\n    for (int i = 0; i < paint.length; i++) {\n      int x = find(next, paint[i][0]);\n      while (x < paint[i][1]) {\n        answer[i]++;\n        next[x] = find(next, x + 1);\n        x = next[x];\n      }\n    }\n    return answer;\n  }\n\n  private int find(int[] next, int x) {\n    if (next[x] != x) next[x] = find(next, next[x]);\n    return next[x];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] amountPainted(int[][] paint) {\n    boolean[] painted = new boolean[50001];\n    int[] answer = new int[paint.length];\n    fill(paint, 0, painted, answer);\n    return answer;\n  }\n\n  private void fill(int[][] paint, int day, boolean[] painted, int[] answer) {\n    if (day == paint.length) return;\n    answer[day] = mark(paint[day][0], paint[day][1], painted);\n    fill(paint, day + 1, painted, answer);\n  }\n\n  private int mark(int position, int end, boolean[] painted) {\n    if (position == end) return 0;\n    int add = painted[position] ? 0 : 1;\n    painted[position] = true;\n    return add + mark(position + 1, end, painted);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] amountPainted(int[][] paint) {\n    int max = 0;\n    for (int[] job : paint) max = Math.max(max, job[1]);\n    int[] next = new int[max + 1];\n    for (int i = 0; i <= max; i++) next[i] = i;\n\n    int[] answer = new int[paint.length];\n    for (int i = 0; i < paint.length; i++) {\n      int x = find(next, paint[i][0]);\n      while (x < paint[i][1]) {\n        answer[i]++;\n        next[x] = find(next, x + 1);\n        x = next[x];\n      }\n    }\n    return answer;\n  }\n\n  private int find(int[] next, int x) {\n    if (next[x] != x) next[x] = find(next, next[x]);\n    return next[x];\n  }\n}",
      "code": "class Solution {\n  public int[] amountPainted(int[][] paint) {\n    int max = 0;\n    for (int[] job : paint) max = Math.max(max, job[1]);\n    int[] next = new int[max + 1];\n    for (int i = 0; i <= max; i++) next[i] = i;\n\n    int[] answer = new int[paint.length];\n    for (int i = 0; i < paint.length; i++) {\n      int x = find(next, paint[i][0]);\n      while (x < paint[i][1]) {\n        answer[i]++;\n        next[x] = find(next, x + 1);\n        x = next[x];\n      }\n    }\n    return answer;\n  }\n\n  private int find(int[] next, int x) {\n    if (next[x] != x) next[x] = find(next, next[x]);\n    return next[x];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Video Stitching",
      "difficulty": "Medium",
      "subpattern": "Interval coverage greedy",
      "question": "Given video clips [start, end] and target time, return the minimum clips needed to cover [0, time], or -1.",
      "trigger": "Among clips starting within the current covered range, choosing the farthest end gives the best next coverage.",
      "intuition": "Greedily expand coverage layer by layer, like Jump Game on intervals.",
      "edgeCases": "Cannot start at 0, gap in coverage, one clip covers all, clips ending before current coverage, target zero.",
      "constraints": "1 <= clips.length <= 100; 0 <= start <= end <= 100; 1 <= time <= 100.",
      "source": {
        "label": "Video Stitching - LeetCode 1024",
        "url": "https://leetcode.com/problems/video-stitching/"
      },
      "examples": [
        {
          "input": "clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10",
          "output": "3",
          "explanation": "[0,2], [1,9], and [8,10] cover the target."
        },
        {
          "input": "clips = [[0,1],[1,2]], time = 5",
          "output": "-1",
          "explanation": "Coverage stops before time 5."
        },
        {
          "input": "clips = [[0,4],[2,8]], time = 5",
          "output": "2",
          "explanation": "The two clips cover [0,5]."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Try every subset/order of clips to cover the next uncovered point.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Greedy range expansion scans clips once.",
      "recursiveComplexity": "Time O(n * time); Space O(time). Memoized recursion chooses clips that cover the current point.",
      "bruteForceCode": "class Solution {\n  public int videoStitching(int[][] clips, int time) {\n    int answer = cover(clips, 0, time, new boolean[clips.length]);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int cover(int[][] clips, int covered, int time, boolean[] used) {\n    if (covered >= time) return 0;\n    int best = 1_000_000;\n    for (int i = 0; i < clips.length; i++) {\n      if (!used[i] && clips[i][0] <= covered && clips[i][1] > covered) {\n        used[i] = true;\n        best = Math.min(best, 1 + cover(clips, clips[i][1], time, used));\n        used[i] = false;\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int videoStitching(int[][] clips, int time) {\n    Arrays.sort(clips, (a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));\n    int clipsUsed = 0;\n    int covered = 0;\n    int farthest = 0;\n    int index = 0;\n\n    while (covered < time) {\n      while (index < clips.length && clips[index][0] <= covered) {\n        farthest = Math.max(farthest, clips[index][1]);\n        index++;\n      }\n      if (farthest == covered) return -1;\n      clipsUsed++;\n      covered = farthest;\n    }\n    return clipsUsed;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int videoStitching(int[][] clips, int time) {\n    int[] memo = new int[time + 1];\n    Arrays.fill(memo, -2);\n    int answer = dp(clips, 0, time, memo);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int dp(int[][] clips, int covered, int time, int[] memo) {\n    if (covered >= time) return 0;\n    if (memo[covered] != -2) return memo[covered];\n    int best = 1_000_000;\n    for (int[] clip : clips) {\n      if (clip[0] <= covered && clip[1] > covered) best = Math.min(best, 1 + dp(clips, Math.min(time, clip[1]), time, memo));\n    }\n    memo[covered] = best;\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int videoStitching(int[][] clips, int time) {\n    Arrays.sort(clips, (a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));\n    int clipsUsed = 0;\n    int covered = 0;\n    int farthest = 0;\n    int index = 0;\n\n    while (covered < time) {\n      while (index < clips.length && clips[index][0] <= covered) {\n        farthest = Math.max(farthest, clips[index][1]);\n        index++;\n      }\n      if (farthest == covered) return -1;\n      clipsUsed++;\n      covered = farthest;\n    }\n    return clipsUsed;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int videoStitching(int[][] clips, int time) {\n    Arrays.sort(clips, (a, b) -> a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));\n    int clipsUsed = 0;\n    int covered = 0;\n    int farthest = 0;\n    int index = 0;\n\n    while (covered < time) {\n      while (index < clips.length && clips[index][0] <= covered) {\n        farthest = Math.max(farthest, clips[index][1]);\n        index++;\n      }\n      if (farthest == covered) return -1;\n      clipsUsed++;\n      covered = farthest;\n    }\n    return clipsUsed;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Points That Intersect With Cars",
      "difficulty": "Easy",
      "subpattern": "Union length of meeting intervals",
      "question": "Given car parking intervals on a number line, return how many integer points are covered by at least one car.",
      "trigger": "The answer is the size of the union of inclusive integer intervals.",
      "intuition": "Either mark covered points directly or sort and merge inclusive ranges.",
      "edgeCases": "One car, duplicate intervals, touching intervals, disjoint intervals, nested intervals.",
      "constraints": "1 <= nums.length <= 100; 1 <= start <= end <= 100.",
      "source": {
        "label": "Points That Intersect With Cars - LeetCode 2848",
        "url": "https://leetcode.com/problems/points-that-intersect-with-cars/"
      },
      "examples": [
        {
          "input": "nums = [[3,6],[1,5],[4,7]]",
          "output": "7",
          "explanation": "Points 1 through 7 are covered."
        },
        {
          "input": "nums = [[1,3],[5,8]]",
          "output": "7",
          "explanation": "Covered points are 1,2,3,5,6,7,8."
        },
        {
          "input": "nums = [[2,2]]",
          "output": "1",
          "explanation": "A single-point interval covers one point."
        }
      ],
      "bruteForceComplexity": "Time O(total interval length); Space O(101). Mark every covered integer point.",
      "optimizedComplexity": "Time O(n log n); Space O(log n). Sort and merge inclusive intervals.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive merge count after sorting.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfPoints(List<List<Integer>> nums) {\n    boolean[] covered = new boolean[101];\n    for (List<Integer> interval : nums) {\n      for (int point = interval.get(0); point <= interval.get(1); point++) covered[point] = true;\n    }\n    int count = 0;\n    for (boolean value : covered) if (value) count++;\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfPoints(List<List<Integer>> nums) {\n    nums.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));\n    int total = 0;\n    int start = -1;\n    int end = -1;\n\n    for (List<Integer> interval : nums) {\n      if (start == -1 || interval.get(0) > end + 1) {\n        if (start != -1) total += end - start + 1;\n        start = interval.get(0);\n        end = interval.get(1);\n      } else {\n        end = Math.max(end, interval.get(1));\n      }\n    }\n    return start == -1 ? total : total + end - start + 1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfPoints(List<List<Integer>> nums) {\n    nums.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));\n    return count(nums, 0, -1, -1);\n  }\n\n  private int count(List<List<Integer>> nums, int index, int start, int end) {\n    if (index == nums.size()) return start == -1 ? 0 : end - start + 1;\n    List<Integer> interval = nums.get(index);\n    if (start == -1) return count(nums, index + 1, interval.get(0), interval.get(1));\n    if (interval.get(0) > end + 1) return end - start + 1 + count(nums, index + 1, interval.get(0), interval.get(1));\n    return count(nums, index + 1, start, Math.max(end, interval.get(1)));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numberOfPoints(List<List<Integer>> nums) {\n    nums.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));\n    int total = 0;\n    int start = -1;\n    int end = -1;\n\n    for (List<Integer> interval : nums) {\n      if (start == -1 || interval.get(0) > end + 1) {\n        if (start != -1) total += end - start + 1;\n        start = interval.get(0);\n        end = interval.get(1);\n      } else {\n        end = Math.max(end, interval.get(1));\n      }\n    }\n    return start == -1 ? total : total + end - start + 1;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numberOfPoints(List<List<Integer>> nums) {\n    nums.sort((a, b) -> Integer.compare(a.get(0), b.get(0)));\n    int total = 0;\n    int start = -1;\n    int end = -1;\n\n    for (List<Integer> interval : nums) {\n      if (start == -1 || interval.get(0) > end + 1) {\n        if (start != -1) total += end - start + 1;\n        start = interval.get(0);\n        end = interval.get(1);\n      } else {\n        end = Math.max(end, interval.get(1));\n      }\n    }\n    return start == -1 ? total : total + end - start + 1;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find Right Interval",
      "difficulty": "Medium",
      "subpattern": "Binary search over interval starts",
      "question": "For each interval, find the index of the interval with the smallest start point greater than or equal to the current interval end, or -1.",
      "trigger": "Only interval starts matter for the target end, and starts are unique, so sorted starts support lower_bound.",
      "intuition": "Store [start, originalIndex], sort by start, and binary-search each interval end.",
      "edgeCases": "One interval, no right interval, right interval before original order, negative endpoints, exact start equals end.",
      "constraints": "1 <= intervals.length <= 20000; -10^6 <= start <= end <= 10^6; all starts are unique.",
      "source": {
        "label": "Find Right Interval - LeetCode 436",
        "url": "https://leetcode.com/problems/find-right-interval/"
      },
      "examples": [
        {
          "input": "intervals = [[1,2]]",
          "output": "[-1]",
          "explanation": "No interval starts at or after 2."
        },
        {
          "input": "intervals = [[3,4],[2,3],[1,2]]",
          "output": "[-1,0,1]",
          "explanation": "The right interval for [2,3] starts at 3."
        },
        {
          "input": "intervals = [[1,4],[2,3],[3,4]]",
          "output": "[-1,2,-1]",
          "explanation": "[2,3] maps to the interval starting at 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1) excluding output. Scan every interval start for every interval end.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sort starts and binary-search each end.",
      "recursiveComplexity": "Time O(n log n); Space O(n + log n). Recursive binary search replaces the iterative lower_bound.",
      "bruteForceCode": "class Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int[] answer = new int[intervals.length];\n    for (int i = 0; i < intervals.length; i++) {\n      int bestStart = Integer.MAX_VALUE;\n      int bestIndex = -1;\n      for (int j = 0; j < intervals.length; j++) {\n        if (intervals[j][0] >= intervals[i][1] && intervals[j][0] < bestStart) {\n          bestStart = intervals[j][0];\n          bestIndex = j;\n        }\n      }\n      answer[i] = bestIndex;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n    for (int i = 0; i < n; i++) starts[i] = new int[] {intervals[i][0], i};\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] answer = new int[n];\n    for (int i = 0; i < n; i++) {\n      int pos = lowerBound(starts, intervals[i][1]);\n      answer[i] = pos == n ? -1 : starts[pos][1];\n    }\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target) {\n    int left = 0;\n    int right = starts.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (starts[mid][0] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n    for (int i = 0; i < n; i++) starts[i] = new int[] {intervals[i][0], i};\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] answer = new int[n];\n    for (int i = 0; i < n; i++) {\n      int pos = lowerBound(starts, intervals[i][1], 0, n);\n      answer[i] = pos == n ? -1 : starts[pos][1];\n    }\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target, int left, int right) {\n    if (left == right) return left;\n    int mid = left + (right - left) / 2;\n    if (starts[mid][0] < target) return lowerBound(starts, target, mid + 1, right);\n    return lowerBound(starts, target, left, mid);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n    for (int i = 0; i < n; i++) starts[i] = new int[] {intervals[i][0], i};\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] answer = new int[n];\n    for (int i = 0; i < n; i++) {\n      int pos = lowerBound(starts, intervals[i][1]);\n      answer[i] = pos == n ? -1 : starts[pos][1];\n    }\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target) {\n    int left = 0;\n    int right = starts.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (starts[mid][0] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] findRightInterval(int[][] intervals) {\n    int n = intervals.length;\n    int[][] starts = new int[n][2];\n    for (int i = 0; i < n; i++) starts[i] = new int[] {intervals[i][0], i};\n    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] answer = new int[n];\n    for (int i = 0; i < n; i++) {\n      int pos = lowerBound(starts, intervals[i][1]);\n      answer[i] = pos == n ? -1 : starts[pos][1];\n    }\n    return answer;\n  }\n\n  private int lowerBound(int[][] starts, int target) {\n    int left = 0;\n    int right = starts.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (starts[mid][0] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Number of Events That Can Be Attended",
      "difficulty": "Medium",
      "subpattern": "Attend events with earliest end heap",
      "question": "Given events [startDay, endDay], attend at most one event per day. Return the maximum number of events that can be attended.",
      "trigger": "On each day, among currently available events, attending the one that ends earliest preserves the most future options.",
      "intuition": "Sort by start day, push available event end days into a min-heap, discard expired events, attend one earliest-ending event per day.",
      "edgeCases": "Events with same start, events with same end, expired events, gaps between days, one-day events.",
      "constraints": "1 <= events.length <= 100000; 1 <= startDay <= endDay <= 100000.",
      "source": {
        "label": "Maximum Number of Events That Can Be Attended - LeetCode 1353",
        "url": "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/"
      },
      "examples": [
        {
          "input": "events = [[1,2],[2,3],[3,4]]",
          "output": "3",
          "explanation": "Attend one event on each day 1, 2, and 3."
        },
        {
          "input": "events = [[1,2],[2,3],[3,4],[1,2]]",
          "output": "4",
          "explanation": "All four events can be scheduled."
        },
        {
          "input": "events = [[1,1],[1,1],[1,1]]",
          "output": "1",
          "explanation": "Only one event can be attended on day 1."
        }
      ],
      "bruteForceComplexity": "Time exponential in events for backtracking; Space O(maxDay). Try attending or skipping events across days.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Min-heap of active event end days supports earliest-end choice.",
      "recursiveComplexity": "Time O(maxDay * n) in the simple recursive form; Space O(maxDay). Recursively chooses one event for each day.",
      "bruteForceCode": "class Solution {\n  public int maxEvents(int[][] events) {\n    int maxDay = 0;\n    for (int[] event : events) maxDay = Math.max(maxDay, event[1]);\n    return search(events, 1, maxDay, new boolean[events.length]);\n  }\n\n  private int search(int[][] events, int day, int maxDay, boolean[] used) {\n    if (day > maxDay) return 0;\n    int best = search(events, day + 1, maxDay, used);\n    for (int i = 0; i < events.length; i++) {\n      if (!used[i] && events[i][0] <= day && day <= events[i][1]) {\n        used[i] = true;\n        best = Math.max(best, 1 + search(events, day + 1, maxDay, used));\n        used[i] = false;\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxEvents(int[][] events) {\n    Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int attended = 0;\n    int day = 0;\n    int index = 0;\n\n    while (index < events.length || !activeEnds.isEmpty()) {\n      if (activeEnds.isEmpty()) day = Math.max(day, events[index][0]);\n      while (index < events.length && events[index][0] <= day) activeEnds.offer(events[index++][1]);\n      while (!activeEnds.isEmpty() && activeEnds.peek() < day) activeEnds.poll();\n      if (!activeEnds.isEmpty()) {\n        activeEnds.poll();\n        attended++;\n        day++;\n      }\n    }\n    return attended;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxEvents(int[][] events) {\n    int maxDay = 0;\n    for (int[] event : events) maxDay = Math.max(maxDay, event[1]);\n    return attend(events, 1, maxDay, new boolean[events.length]);\n  }\n\n  private int attend(int[][] events, int day, int maxDay, boolean[] used) {\n    if (day > maxDay) return 0;\n    int bestIndex = -1;\n    for (int i = 0; i < events.length; i++) {\n      if (!used[i] && events[i][0] <= day && day <= events[i][1] && (bestIndex == -1 || events[i][1] < events[bestIndex][1])) {\n        bestIndex = i;\n      }\n    }\n    if (bestIndex == -1) return attend(events, day + 1, maxDay, used);\n    used[bestIndex] = true;\n    return 1 + attend(events, day + 1, maxDay, used);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxEvents(int[][] events) {\n    Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int attended = 0;\n    int day = 0;\n    int index = 0;\n\n    while (index < events.length || !activeEnds.isEmpty()) {\n      if (activeEnds.isEmpty()) day = Math.max(day, events[index][0]);\n      while (index < events.length && events[index][0] <= day) activeEnds.offer(events[index++][1]);\n      while (!activeEnds.isEmpty() && activeEnds.peek() < day) activeEnds.poll();\n      if (!activeEnds.isEmpty()) {\n        activeEnds.poll();\n        attended++;\n        day++;\n      }\n    }\n    return attended;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxEvents(int[][] events) {\n    Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> activeEnds = new PriorityQueue<>();\n    int attended = 0;\n    int day = 0;\n    int index = 0;\n\n    while (index < events.length || !activeEnds.isEmpty()) {\n      if (activeEnds.isEmpty()) day = Math.max(day, events[index][0]);\n      while (index < events.length && events[index][0] <= day) activeEnds.offer(events[index++][1]);\n      while (!activeEnds.isEmpty() && activeEnds.peek() < day) activeEnds.poll();\n      if (!activeEnds.isEmpty()) {\n        activeEnds.poll();\n        attended++;\n        day++;\n      }\n    }\n    return attended;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Profit in Job Scheduling",
      "difficulty": "Hard",
      "subpattern": "Weighted interval scheduling",
      "question": "Given start times, end times, and profits, choose non-overlapping jobs to maximize total profit.",
      "trigger": "Each job choice excludes overlapping jobs and can jump to the next compatible job by start time.",
      "intuition": "Sort jobs and combine interval DP with binary search for the next non-overlapping job.",
      "edgeCases": "All jobs overlap, no jobs overlap, same start times, same end times, choosing one high-profit job over many small jobs.",
      "constraints": "1 <= n <= 50000; 1 <= startTime[i] < endTime[i] <= 10^9; 1 <= profit[i] <= 10000.",
      "source": {
        "label": "Maximum Profit in Job Scheduling - LeetCode 1235",
        "url": "https://leetcode.com/problems/maximum-profit-in-job-scheduling/"
      },
      "examples": [
        {
          "input": "startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]",
          "output": "120",
          "explanation": "Take jobs [1,3] and [3,6]."
        },
        {
          "input": "startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]",
          "output": "150",
          "explanation": "Take jobs [1,3], [4,6], and [6,9]."
        },
        {
          "input": "startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]",
          "output": "6",
          "explanation": "Only the highest profit overlapping job should be chosen."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Recursively choose or skip each job after sorting.",
      "optimizedComplexity": "Time O(n log n); Space O(n). DP sorted by start time uses binary search for the next compatible job.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Memoized recursion uses the same binary-search jump.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n    int n = startTime.length;\n    int[][] jobs = new int[n][3];\n    for (int i = 0; i < n; i++) jobs[i] = new int[] {startTime[i], endTime[i], profit[i]};\n    Arrays.sort(jobs, (a, b) -> Integer.compare(a[0], b[0]));\n    return choose(jobs, 0, 0);\n  }\n\n  private int choose(int[][] jobs, int index, int currentEnd) {\n    if (index == jobs.length) return 0;\n    int skip = choose(jobs, index + 1, currentEnd);\n    int take = 0;\n    if (jobs[index][0] >= currentEnd) take = jobs[index][2] + choose(jobs, index + 1, jobs[index][1]);\n    return Math.max(skip, take);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n    int n = startTime.length;\n    int[][] jobs = new int[n][3];\n    for (int i = 0; i < n; i++) jobs[i] = new int[] {startTime[i], endTime[i], profit[i]};\n    Arrays.sort(jobs, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] starts = new int[n];\n    for (int i = 0; i < n; i++) starts[i] = jobs[i][0];\n    int[] dp = new int[n + 1];\n    for (int i = n - 1; i >= 0; i--) {\n      int next = lowerBound(starts, jobs[i][1]);\n      dp[i] = Math.max(dp[i + 1], jobs[i][2] + dp[next]);\n    }\n    return dp[0];\n  }\n\n  private int lowerBound(int[] values, int target) {\n    int left = 0;\n    int right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n    int n = startTime.length;\n    int[][] jobs = new int[n][3];\n    for (int i = 0; i < n; i++) jobs[i] = new int[] {startTime[i], endTime[i], profit[i]};\n    Arrays.sort(jobs, (a, b) -> Integer.compare(a[0], b[0]));\n    int[] starts = new int[n];\n    for (int i = 0; i < n; i++) starts[i] = jobs[i][0];\n    int[] memo = new int[n];\n    return dp(jobs, starts, 0, memo);\n  }\n\n  private int dp(int[][] jobs, int[] starts, int index, int[] memo) {\n    if (index == jobs.length) return 0;\n    if (memo[index] != 0) return memo[index];\n    int next = lowerBound(starts, jobs[index][1]);\n    memo[index] = Math.max(dp(jobs, starts, index + 1, memo), jobs[index][2] + dp(jobs, starts, next, memo));\n    return memo[index];\n  }\n\n  private int lowerBound(int[] values, int target) {\n    int left = 0;\n    int right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n    int n = startTime.length;\n    int[][] jobs = new int[n][3];\n    for (int i = 0; i < n; i++) jobs[i] = new int[] {startTime[i], endTime[i], profit[i]};\n    Arrays.sort(jobs, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] starts = new int[n];\n    for (int i = 0; i < n; i++) starts[i] = jobs[i][0];\n    int[] dp = new int[n + 1];\n    for (int i = n - 1; i >= 0; i--) {\n      int next = lowerBound(starts, jobs[i][1]);\n      dp[i] = Math.max(dp[i + 1], jobs[i][2] + dp[next]);\n    }\n    return dp[0];\n  }\n\n  private int lowerBound(int[] values, int target) {\n    int left = 0;\n    int right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n    int n = startTime.length;\n    int[][] jobs = new int[n][3];\n    for (int i = 0; i < n; i++) jobs[i] = new int[] {startTime[i], endTime[i], profit[i]};\n    Arrays.sort(jobs, (a, b) -> Integer.compare(a[0], b[0]));\n\n    int[] starts = new int[n];\n    for (int i = 0; i < n; i++) starts[i] = jobs[i][0];\n    int[] dp = new int[n + 1];\n    for (int i = n - 1; i >= 0; i--) {\n      int next = lowerBound(starts, jobs[i][1]);\n      dp[i] = Math.max(dp[i + 1], jobs[i][2] + dp[next]);\n    }\n    return dp[0];\n  }\n\n  private int lowerBound(int[] values, int target) {\n    int left = 0;\n    int right = values.length;\n    while (left < right) {\n      int mid = left + (right - left) / 2;\n      if (values[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Meeting Scheduler",
      "difficulty": "Medium",
      "subpattern": "Two-pointer meeting slot intersection",
      "question": "Given two people's available slots and a duration, return the earliest time slot that works for both, or an empty list.",
      "trigger": "The earliest common slot can only come from the current pair of sorted slots; the slot ending earlier must advance.",
      "intuition": "Sort both slot lists, intersect current slots, and return immediately when the overlap length is enough.",
      "edgeCases": "No overlap, overlap shorter than duration, exact duration overlap, unsorted slots, one list empty.",
      "constraints": "1 <= slots1.length, slots2.length <= 10000; 0 <= start < end <= 10^9; 1 <= duration <= 10^6.",
      "source": {
        "label": "Meeting Scheduler - LeetCode 1229",
        "url": "https://leetcode.com/problems/meeting-scheduler/"
      },
      "examples": [
        {
          "input": "slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8",
          "output": "[60,68]",
          "explanation": "The earliest overlap with length 8 starts at 60."
        },
        {
          "input": "slots1 = [[10,50]], slots2 = [[60,120]], duration = 10",
          "output": "[]",
          "explanation": "There is no overlap."
        },
        {
          "input": "slots1 = [[0,10]], slots2 = [[5,15]], duration = 5",
          "output": "[5,10]",
          "explanation": "The overlap length is exactly 5."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(1). Compare every pair of slots and keep the earliest valid overlap.",
      "optimizedComplexity": "Time O(m log m + n log n + m + n); Space O(log m + log n) for sorting. Two pointers find the earliest overlap.",
      "recursiveComplexity": "Time O(m log m + n log n + m + n); Space O(m + n). Recursive two-pointer scan.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> minAvailableDuration(int[][] slots1, int[][] slots2, int duration) {\n    int bestStart = Integer.MAX_VALUE;\n    for (int[] a : slots1) {\n      for (int[] b : slots2) {\n        int start = Math.max(a[0], b[0]);\n        int end = Math.min(a[1], b[1]);\n        if (end - start >= duration && start < bestStart) bestStart = start;\n      }\n    }\n    return bestStart == Integer.MAX_VALUE ? Collections.emptyList() : Arrays.asList(bestStart, bestStart + duration);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> minAvailableDuration(int[][] slots1, int[][] slots2, int duration) {\n    Arrays.sort(slots1, (a, b) -> Integer.compare(a[0], b[0]));\n    Arrays.sort(slots2, (a, b) -> Integer.compare(a[0], b[0]));\n    int i = 0;\n    int j = 0;\n\n    while (i < slots1.length && j < slots2.length) {\n      int start = Math.max(slots1[i][0], slots2[j][0]);\n      int end = Math.min(slots1[i][1], slots2[j][1]);\n      if (end - start >= duration) return Arrays.asList(start, start + duration);\n      if (slots1[i][1] < slots2[j][1]) i++; else j++;\n    }\n    return Collections.emptyList();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> minAvailableDuration(int[][] slots1, int[][] slots2, int duration) {\n    Arrays.sort(slots1, (a, b) -> Integer.compare(a[0], b[0]));\n    Arrays.sort(slots2, (a, b) -> Integer.compare(a[0], b[0]));\n    return scan(slots1, slots2, duration, 0, 0);\n  }\n\n  private List<Integer> scan(int[][] a, int[][] b, int duration, int i, int j) {\n    if (i == a.length || j == b.length) return Collections.emptyList();\n    int start = Math.max(a[i][0], b[j][0]);\n    int end = Math.min(a[i][1], b[j][1]);\n    if (end - start >= duration) return Arrays.asList(start, start + duration);\n    if (a[i][1] < b[j][1]) return scan(a, b, duration, i + 1, j);\n    return scan(a, b, duration, i, j + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> minAvailableDuration(int[][] slots1, int[][] slots2, int duration) {\n    Arrays.sort(slots1, (a, b) -> Integer.compare(a[0], b[0]));\n    Arrays.sort(slots2, (a, b) -> Integer.compare(a[0], b[0]));\n    int i = 0;\n    int j = 0;\n\n    while (i < slots1.length && j < slots2.length) {\n      int start = Math.max(slots1[i][0], slots2[j][0]);\n      int end = Math.min(slots1[i][1], slots2[j][1]);\n      if (end - start >= duration) return Arrays.asList(start, start + duration);\n      if (slots1[i][1] < slots2[j][1]) i++; else j++;\n    }\n    return Collections.emptyList();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> minAvailableDuration(int[][] slots1, int[][] slots2, int duration) {\n    Arrays.sort(slots1, (a, b) -> Integer.compare(a[0], b[0]));\n    Arrays.sort(slots2, (a, b) -> Integer.compare(a[0], b[0]));\n    int i = 0;\n    int j = 0;\n\n    while (i < slots1.length && j < slots2.length) {\n      int start = Math.max(slots1[i][0], slots2[j][0]);\n      int end = Math.min(slots1[i][1], slots2[j][1]);\n      if (end - start >= duration) return Arrays.asList(start, start + duration);\n      if (slots1[i][1] < slots2[j][1]) i++; else j++;\n    }\n    return Collections.emptyList();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Divide Intervals Into Minimum Number of Groups",
      "difficulty": "Medium",
      "subpattern": "Minimum groups by active overlap",
      "question": "Given inclusive intervals, divide them into the minimum number of groups so intervals in the same group do not intersect.",
      "trigger": "The minimum number of groups equals the maximum number of intervals overlapping at any point.",
      "intuition": "Sort starts and maintain active ends; an interval can reuse a group only when the earliest end is strictly before its start.",
      "edgeCases": "Inclusive endpoint overlap, all disjoint, all overlap, same starts, same ends.",
      "constraints": "1 <= intervals.length <= 100000; 1 <= left <= right <= 10^6.",
      "source": {
        "label": "Divide Intervals Into Minimum Number of Groups - LeetCode 2406",
        "url": "https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/"
      },
      "examples": [
        {
          "input": "intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]",
          "output": "3",
          "explanation": "Three intervals overlap around point 5."
        },
        {
          "input": "intervals = [[1,3],[5,6],[8,10],[11,13]]",
          "output": "1",
          "explanation": "No intervals intersect."
        },
        {
          "input": "intervals = [[1,2],[2,3]]",
          "output": "2",
          "explanation": "Inclusive intervals intersect at point 2."
        }
      ],
      "bruteForceComplexity": "Time O(n * coordinateRange); Space O(coordinateRange). Count active intervals at every integer point.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Min-heap of group end times tracks active inclusive overlaps.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursive heap scan after sorting intervals.",
      "bruteForceCode": "class Solution {\n  public int minGroups(int[][] intervals) {\n    int maxPoint = 0;\n    for (int[] interval : intervals) maxPoint = Math.max(maxPoint, interval[1]);\n    int best = 0;\n    for (int point = 1; point <= maxPoint; point++) {\n      int active = 0;\n      for (int[] interval : intervals) if (interval[0] <= point && point <= interval[1]) active++;\n      best = Math.max(best, active);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minGroups(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> ends = new PriorityQueue<>();\n    int groups = 0;\n\n    for (int[] interval : intervals) {\n      if (!ends.isEmpty() && ends.peek() < interval[0]) ends.poll();\n      ends.offer(interval[1]);\n      groups = Math.max(groups, ends.size());\n    }\n    return groups;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minGroups(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    return scan(intervals, 0, new PriorityQueue<>(), 0);\n  }\n\n  private int scan(int[][] intervals, int index, PriorityQueue<Integer> ends, int best) {\n    if (index == intervals.length) return best;\n    if (!ends.isEmpty() && ends.peek() < intervals[index][0]) ends.poll();\n    ends.offer(intervals[index][1]);\n    return scan(intervals, index + 1, ends, Math.max(best, ends.size()));\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minGroups(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> ends = new PriorityQueue<>();\n    int groups = 0;\n\n    for (int[] interval : intervals) {\n      if (!ends.isEmpty() && ends.peek() < interval[0]) ends.poll();\n      ends.offer(interval[1]);\n      groups = Math.max(groups, ends.size());\n    }\n    return groups;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minGroups(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> ends = new PriorityQueue<>();\n    int groups = 0;\n\n    for (int[] interval : intervals) {\n      if (!ends.isEmpty() && ends.peek() < interval[0]) ends.poll();\n      ends.offer(interval[1]);\n      groups = Math.max(groups, ends.size());\n    }\n    return groups;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count Integers in Intervals",
      "difficulty": "Hard",
      "subpattern": "Dynamic interval count with TreeMap",
      "question": "Design a structure that adds inclusive intervals and returns how many distinct integers are covered by all added intervals.",
      "trigger": "Adding an interval only affects existing intervals that overlap or touch it; the total covered count can be updated by removing merged pieces.",
      "intuition": "Store disjoint intervals in a TreeMap, subtract intervals that merge into the new range, then add the merged length.",
      "edgeCases": "Duplicate add, interval contained in existing range, bridge two intervals, touching inclusive intervals, large endpoints.",
      "constraints": "1 <= left <= right <= 10^9; at most 100000 calls to add and count.",
      "source": {
        "label": "Count Integers in Intervals - LeetCode 2276",
        "url": "https://leetcode.com/problems/count-integers-in-intervals/"
      },
      "examples": [
        {
          "input": "add(2,3), add(7,10), count(), add(5,8), count()",
          "output": "6, 8",
          "explanation": "The union becomes [2,3] and [5,10]."
        },
        {
          "input": "add(1,5), add(2,3), count()",
          "output": "5",
          "explanation": "The second interval is already covered."
        },
        {
          "input": "add(1,2), add(3,4), count()",
          "output": "4",
          "explanation": "Inclusive intervals touching by next integer merge into continuous coverage."
        }
      ],
      "bruteForceComplexity": "Time O(length of added interval); Space O(number of covered integers). HashSet stores every covered integer directly.",
      "optimizedComplexity": "Time O(k log n) per add over merged intervals and O(1) per count; Space O(n). TreeMap stores disjoint intervals and total length.",
      "recursiveComplexity": "Time O(n) per add in the list version; Space O(n). Recursive insertion merges inclusive intervals.",
      "bruteForceCode": "import java.util.*;\n\nclass CountIntervals {\n  private final Set<Integer> values = new HashSet<>();\n\n  public CountIntervals() {}\n\n  public void add(int left, int right) {\n    for (int value = left; value <= right; value++) values.add(value);\n  }\n\n  public int count() {\n    return values.size();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass CountIntervals {\n  private final TreeMap<Integer, Integer> intervals = new TreeMap<>();\n  private long total = 0;\n\n  public CountIntervals() {}\n\n  public void add(int left, int right) {\n    Integer start = intervals.floorKey(left);\n    if (start != null && intervals.get(start) + 1 >= left) {\n      left = Math.min(left, start);\n      right = Math.max(right, intervals.get(start));\n      total -= intervals.get(start) - start + 1L;\n      intervals.remove(start);\n    }\n    Integer next = intervals.ceilingKey(left);\n    while (next != null && next <= right + 1) {\n      right = Math.max(right, intervals.get(next));\n      total -= intervals.get(next) - next + 1L;\n      intervals.remove(next);\n      next = intervals.ceilingKey(left);\n    }\n    intervals.put(left, right);\n    total += right - left + 1L;\n  }\n\n  public int count() {\n    return (int) total;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass CountIntervals {\n  private final List<int[]> intervals = new ArrayList<>();\n\n  public CountIntervals() {}\n\n  public void add(int left, int right) {\n    intervals.add(new int[] {left, right});\n    intervals.sort((a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    merge(0, merged);\n    intervals.clear();\n    intervals.addAll(merged);\n  }\n\n  private void merge(int index, List<int[]> merged) {\n    if (index == intervals.size()) return;\n    int[] current = intervals.get(index);\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] + 1 < current[0]) merged.add(current.clone());\n    else merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], current[1]);\n    merge(index + 1, merged);\n  }\n\n  public int count() {\n    return countFrom(0);\n  }\n\n  private int countFrom(int index) {\n    if (index == intervals.size()) return 0;\n    int[] interval = intervals.get(index);\n    return interval[1] - interval[0] + 1 + countFrom(index + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass CountIntervals {\n  private final TreeMap<Integer, Integer> intervals = new TreeMap<>();\n  private long total = 0;\n\n  public CountIntervals() {}\n\n  public void add(int left, int right) {\n    Integer start = intervals.floorKey(left);\n    if (start != null && intervals.get(start) + 1 >= left) {\n      left = Math.min(left, start);\n      right = Math.max(right, intervals.get(start));\n      total -= intervals.get(start) - start + 1L;\n      intervals.remove(start);\n    }\n    Integer next = intervals.ceilingKey(left);\n    while (next != null && next <= right + 1) {\n      right = Math.max(right, intervals.get(next));\n      total -= intervals.get(next) - next + 1L;\n      intervals.remove(next);\n      next = intervals.ceilingKey(left);\n    }\n    intervals.put(left, right);\n    total += right - left + 1L;\n  }\n\n  public int count() {\n    return (int) total;\n  }\n}",
      "code": "import java.util.*;\n\nclass CountIntervals {\n  private final TreeMap<Integer, Integer> intervals = new TreeMap<>();\n  private long total = 0;\n\n  public CountIntervals() {}\n\n  public void add(int left, int right) {\n    Integer start = intervals.floorKey(left);\n    if (start != null && intervals.get(start) + 1 >= left) {\n      left = Math.min(left, start);\n      right = Math.max(right, intervals.get(start));\n      total -= intervals.get(start) - start + 1L;\n      intervals.remove(start);\n    }\n    Integer next = intervals.ceilingKey(left);\n    while (next != null && next <= right + 1) {\n      right = Math.max(right, intervals.get(next));\n      total -= intervals.get(next) - next + 1L;\n      intervals.remove(next);\n      next = intervals.ceilingKey(left);\n    }\n    intervals.put(left, right);\n    total += right - left + 1L;\n  }\n\n  public int count() {\n    return (int) total;\n  }\n}"
    }
  ],
  "checklist": [
    "The input contains ranges with start/end boundaries, times, days, coordinates, or coverage spans.",
    "The question asks to merge, insert, count overlap, detect conflict, find gaps, or answer which interval covers a point.",
    "Sorting by start or end makes only adjacent/current active intervals relevant.",
    "Endpoint changes can be represented as +1/-1 deltas for sweep-line counting.",
    "Dynamic operations need a sorted map of disjoint intervals or active end times."
  ],
  "traps": [
    "Mixing inclusive [l, r] and half-open [l, r) semantics.",
    "Treating touching endpoints as overlap when the problem says meetings can touch.",
    "Sorting by start when the greedy proof needs earliest end.",
    "Forgetting to merge intervals that touch in inclusive integer-union problems.",
    "Removing from a TreeMap while iterating over its live key set incorrectly.",
    "Using int subtraction in comparators when endpoints can be large.",
    "Counting gaps or free time before merging all busy intervals."
  ],
  "edgeCases": [
    "Empty interval list where the problem allows it.",
    "Single interval or single booking.",
    "Nested intervals and duplicate intervals.",
    "Intervals with the same start or the same end.",
    "Boundary-touching intervals such as [1,2] and [2,3].",
    "Queries exactly equal to interval start or end.",
    "Very large coordinates that require TreeMap or sorting instead of arrays."
  ],
  "complexities": [
    "Sort-and-merge interval problems are usually O(n log n) time and O(n) output space.",
    "Two sorted interval lists can often be solved in O(m + n) with two pointers.",
    "Sweep-line endpoint maps cost O(n log n) time and O(n) space.",
    "Meeting-room and event problems commonly use a heap for O(n log n) time and O(n) active space.",
    "Dynamic interval structures use TreeMap operations, often O(k log n) for k merged/removed intervals.",
    "Small-coordinate brute force can mark arrays directly; large-coordinate inputs need compression or ordered maps.",
    "Recursive tabs usually mirror scan logic and add O(n) call-stack space."
  ],
  "mentalModel": [
    "Decide first whether endpoints are inclusive or half-open.",
    "Sort by the boundary that makes the next decision local: start for merging, end for non-overlap greedy.",
    "Track the active state: current merged interval, active overlap count, heap of end times, or TreeMap of disjoint ranges.",
    "For query problems, sort queries offline when their order is not part of the answer logic.",
    "Convert repeated overlap checks into endpoint events or neighboring interval checks."
  ],
  "revisionStrategy": [
    "Day 1: redo Merge Intervals, Insert Interval, Meeting Rooms, Meeting Rooms II, and Interval Intersections.",
    "Day 2: redo Non-overlapping Intervals, Arrows, Car Pooling, Remove Covered Intervals, and Employee Free Time.",
    "Day 4: redo My Calendar I/II/III, Summary Ranges, Data Stream, and Range Module.",
    "Day 7: redo Minimum Interval Query, Describe the Painting, Video Stitching, Max Events, and Job Scheduling.",
    "Before interviews: write the boundary convention, sort key, active state, and update rule before code."
  ],
  "unseen": [
    "Given train arrival/departure times, return the minimum number of platforms needed.",
    "Given booked hotel rooms and queries, return whether each requested stay can be accepted.",
    "Given colored road segments, return the total length covered by at least two colors.",
    "Given intervals and point queries, return the number of active intervals for each query.",
    "Given maintenance windows, find the earliest gap of length k across all teams."
  ]
};
