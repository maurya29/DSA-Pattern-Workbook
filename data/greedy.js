const CURRENT_PATTERN = {
  "id": "greedy",
  "name": "Greedy",
  "summary": "Make locally optimal choices that can be proven safe by ordering, exchange arguments, frontier expansion, or priority selection.",
  "complete": true,
  "subpatterns": [
    "Sort and match smallest feasible pair",
    "Limited-denomination change greedy",
    "Reachability frontier greedy",
    "Layered jump range greedy",
    "Reset-on-negative surplus greedy",
    "Two-pass local constraint greedy",
    "Height-descending insertion greedy",
    "Earliest-finish interval greedy",
    "Sorted interval merge greedy",
    "Interval stabbing by right endpoint",
    "Last-occurrence partition greedy",
    "Frequency cooldown greedy",
    "Max-frequency rearrangement greedy",
    "Consecutive group start greedy",
    "Two-pointer pairing greedy",
    "Exchange argument sorting greedy",
    "Kadane local reset greedy",
    "Profit accumulation greedy",
    "Local placement greedy",
    "Minimum-tail subsequence greedy",
    "Frequency uniqueness greedy",
    "Open-range wildcard greedy",
    "Monotonic stack removal greedy",
    "Parity class cost greedy",
    "Cyclic queue banning greedy",
    "Score tradeoff two-pointer greedy",
    "Ordered multiset advantage greedy",
    "Delayed max-heap choice greedy",
    "Deadline scheduling with max-heap"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Assign Cookies",
      "difficulty": "Easy",
      "subpattern": "Sort and match smallest feasible pair",
      "question": "Given children greed factors and cookie sizes, return the maximum number of children that can receive one cookie with size at least their greed.",
      "trigger": "A smallest cookie that satisfies the least greedy remaining child is never worse than spending a larger cookie.",
      "intuition": "Sort both arrays and match the smallest available cookie to the smallest child it can satisfy.",
      "edgeCases": "No cookies, no children, all cookies too small, duplicate greed values, more cookies than children.",
      "constraints": "1 <= g.length, s.length <= 30000; 1 <= g[i], s[j] <= 2^31 - 1.",
      "source": {
        "label": "Assign Cookies - LeetCode 455",
        "url": "https://leetcode.com/problems/assign-cookies/"
      },
      "examples": [
        {
          "input": "g = [1,2,3], s = [1,1]",
          "output": "1",
          "explanation": "Only the child with greed 1 can be satisfied."
        },
        {
          "input": "g = [1,2], s = [1,2,3]",
          "output": "2",
          "explanation": "Cookies 1 and 2 satisfy both children."
        },
        {
          "input": "g = [10,9,8,7], s = [5,6,7,8]",
          "output": "2",
          "explanation": "Only greed 7 and 8 can be satisfied."
        }
      ],
      "bruteForceComplexity": "Time O(children * 2^cookies) in the worst case; Space O(cookies + children). Try assigning or skipping cookies recursively.",
      "optimizedComplexity": "Time O(g log g + s log s); Space O(log g + log s) for sorting. Two pointers make each local match final.",
      "recursiveComplexity": "Time O(g log g + s log s + g + s); Space O(log g + log s + g + s). Recursive two-pointer scan after sorting.",
      "bruteForceCode": "class Solution {\n  public int findContentChildren(int[] g, int[] s) {\n    return dfs(g, s, 0, new boolean[s.length]);\n  }\n\n  private int dfs(int[] greed, int[] cookies, int child, boolean[] used) {\n    if (child == greed.length) return 0;\n    int best = dfs(greed, cookies, child + 1, used);\n    for (int i = 0; i < cookies.length; i++) {\n      if (!used[i] && cookies[i] >= greed[child]) {\n        used[i] = true;\n        best = Math.max(best, 1 + dfs(greed, cookies, child + 1, used));\n        used[i] = false;\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findContentChildren(int[] g, int[] s) {\n    Arrays.sort(g);\n    Arrays.sort(s);\n    int child = 0;\n    int cookie = 0;\n\n    while (child < g.length && cookie < s.length) {\n      if (s[cookie] >= g[child]) child++;\n      cookie++;\n    }\n    return child;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findContentChildren(int[] g, int[] s) {\n    Arrays.sort(g);\n    Arrays.sort(s);\n    return match(g, s, 0, 0);\n  }\n\n  private int match(int[] greed, int[] cookies, int child, int cookie) {\n    if (child == greed.length || cookie == cookies.length) return 0;\n    if (cookies[cookie] >= greed[child]) {\n      return 1 + match(greed, cookies, child + 1, cookie + 1);\n    }\n    return match(greed, cookies, child, cookie + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findContentChildren(int[] g, int[] s) {\n    Arrays.sort(g);\n    Arrays.sort(s);\n    int child = 0;\n    int cookie = 0;\n\n    while (child < g.length && cookie < s.length) {\n      if (s[cookie] >= g[child]) child++;\n      cookie++;\n    }\n    return child;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findContentChildren(int[] g, int[] s) {\n    Arrays.sort(g);\n    Arrays.sort(s);\n    int child = 0;\n    int cookie = 0;\n\n    while (child < g.length && cookie < s.length) {\n      if (s[cookie] >= g[child]) child++;\n      cookie++;\n    }\n    return child;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Lemonade Change",
      "difficulty": "Easy",
      "subpattern": "Limited-denomination change greedy",
      "question": "Customers pay in order with 5, 10, or 20 dollar bills for 5 dollar lemonade. Return true if exact change can be given to every customer.",
      "trigger": "For a 20 dollar bill, spending a 10 plus a 5 preserves more 5 dollar bills than spending three 5s.",
      "intuition": "Track counts of 5s and 10s; always give the largest useful bill while preserving smaller bills for future change.",
      "edgeCases": "First bill is 10 or 20, many 20s, no 10s available, only 5s, empty-like stream not present by constraints.",
      "constraints": "1 <= bills.length <= 100000; bills[i] is 5, 10, or 20.",
      "source": {
        "label": "Lemonade Change - LeetCode 860",
        "url": "https://leetcode.com/problems/lemonade-change/"
      },
      "examples": [
        {
          "input": "bills = [5,5,5,10,20]",
          "output": "true",
          "explanation": "The 20 can be changed with 10 + 5."
        },
        {
          "input": "bills = [5,5,10,10,20]",
          "output": "false",
          "explanation": "The final 20 cannot be changed because no 5 remains."
        },
        {
          "input": "bills = [10]",
          "output": "false",
          "explanation": "There is no 5 dollar bill for change."
        }
      ],
      "bruteForceComplexity": "Time O(2^n) in paths with multiple change choices; Space O(n). Recursion explores possible ways to give change.",
      "optimizedComplexity": "Time O(n); Space O(1). Keep only counts of 5 and 10 dollar bills.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan applies the same safe change preference.",
      "bruteForceCode": "class Solution {\n  public boolean lemonadeChange(int[] bills) {\n    return dfs(bills, 0, 0, 0);\n  }\n\n  private boolean dfs(int[] bills, int index, int five, int ten) {\n    if (index == bills.length) return true;\n    int bill = bills[index];\n    if (bill == 5) return dfs(bills, index + 1, five + 1, ten);\n    if (bill == 10) return five > 0 && dfs(bills, index + 1, five - 1, ten + 1);\n    boolean useTenAndFive = ten > 0 && five > 0 && dfs(bills, index + 1, five - 1, ten - 1);\n    boolean useThreeFives = five >= 3 && dfs(bills, index + 1, five - 3, ten);\n    return useTenAndFive || useThreeFives;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean lemonadeChange(int[] bills) {\n    int five = 0;\n    int ten = 0;\n\n    for (int bill : bills) {\n      if (bill == 5) {\n        five++;\n      } else if (bill == 10) {\n        if (five == 0) return false;\n        five--;\n        ten++;\n      } else {\n        if (ten > 0 && five > 0) {\n          ten--;\n          five--;\n        } else if (five >= 3) {\n          five -= 3;\n        } else {\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean lemonadeChange(int[] bills) {\n    return scan(bills, 0, 0, 0);\n  }\n\n  private boolean scan(int[] bills, int index, int five, int ten) {\n    if (index == bills.length) return true;\n    int bill = bills[index];\n    if (bill == 5) return scan(bills, index + 1, five + 1, ten);\n    if (bill == 10) return five > 0 && scan(bills, index + 1, five - 1, ten + 1);\n    if (ten > 0 && five > 0) return scan(bills, index + 1, five - 1, ten - 1);\n    return five >= 3 && scan(bills, index + 1, five - 3, ten);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean lemonadeChange(int[] bills) {\n    int five = 0;\n    int ten = 0;\n\n    for (int bill : bills) {\n      if (bill == 5) {\n        five++;\n      } else if (bill == 10) {\n        if (five == 0) return false;\n        five--;\n        ten++;\n      } else {\n        if (ten > 0 && five > 0) {\n          ten--;\n          five--;\n        } else if (five >= 3) {\n          five -= 3;\n        } else {\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean lemonadeChange(int[] bills) {\n    int five = 0;\n    int ten = 0;\n\n    for (int bill : bills) {\n      if (bill == 5) {\n        five++;\n      } else if (bill == 10) {\n        if (five == 0) return false;\n        five--;\n        ten++;\n      } else {\n        if (ten > 0 && five > 0) {\n          ten--;\n          five--;\n        } else if (five >= 3) {\n          five -= 3;\n        } else {\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n}"
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
      "constraints": "1 <= nums.length <= 10000; 0 <= nums[i] <= 100000.",
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
      "bruteForceCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    return jump(nums, 0);\n  }\n\n  private boolean jump(int[] nums, int index) {\n    if (index >= nums.length - 1) return true;\n    for (int step = 1; step <= nums[index]; step++) {\n      if (jump(nums, index + step)) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    Boolean[] memo = new Boolean[nums.length];\n    return canReach(nums, 0, memo);\n  }\n\n  private boolean canReach(int[] nums, int index, Boolean[] memo) {\n    if (index >= nums.length - 1) return true;\n    if (memo[index] != null) return memo[index];\n    int limit = Math.min(nums.length - 1, index + nums[index]);\n    for (int next = index + 1; next <= limit; next++) {\n      if (canReach(nums, next, memo)) return memo[index] = true;\n    }\n    memo[index] = false;\n    return false;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Jump Game II",
      "difficulty": "Medium",
      "subpattern": "Layered jump range greedy",
      "question": "Given nums where nums[i] is the maximum jump length from index i, return the minimum number of jumps needed to reach the last index.",
      "trigger": "All indexes in the current reachable range can be covered by the same jump count.",
      "intuition": "Expand the next farthest range while scanning the current range; when the current range ends, take one jump.",
      "edgeCases": "Single element, direct jump to end, many ones, zeros after reachable jumps, last index reached before loop end.",
      "constraints": "1 <= nums.length <= 10000; 0 <= nums[i] <= 1000; the last index is reachable.",
      "source": {
        "label": "Jump Game II - LeetCode 45",
        "url": "https://leetcode.com/problems/jump-game-ii/"
      },
      "examples": [
        {
          "input": "nums = [2,3,1,1,4]",
          "output": "2",
          "explanation": "Jump from index 0 to 1, then to the last index."
        },
        {
          "input": "nums = [2,3,0,1,4]",
          "output": "2",
          "explanation": "The same two-jump route works."
        },
        {
          "input": "nums = [0]",
          "output": "0",
          "explanation": "No jump is needed."
        }
      ],
      "bruteForceComplexity": "Time O(2^n) in dense jump ranges; Space O(n). Try every next jump and take the minimum.",
      "optimizedComplexity": "Time O(n); Space O(1). Greedy range expansion behaves like BFS levels over indexes.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Memoized recursion computes the minimum jumps from each index.",
      "bruteForceCode": "class Solution {\n  public int jump(int[] nums) {\n    return minJumps(nums, 0);\n  }\n\n  private int minJumps(int[] nums, int index) {\n    if (index >= nums.length - 1) return 0;\n    int best = 1_000_000;\n    for (int step = 1; step <= nums[index]; step++) {\n      best = Math.min(best, 1 + minJumps(nums, index + step));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int jump(int[] nums) {\n    int jumps = 0;\n    int currentEnd = 0;\n    int farthest = 0;\n\n    for (int i = 0; i < nums.length - 1; i++) {\n      farthest = Math.max(farthest, i + nums[i]);\n      if (i == currentEnd) {\n        jumps++;\n        currentEnd = farthest;\n      }\n    }\n    return jumps;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int jump(int[] nums) {\n    int[] memo = new int[nums.length];\n    Arrays.fill(memo, -1);\n    return dp(nums, 0, memo);\n  }\n\n  private int dp(int[] nums, int index, int[] memo) {\n    if (index >= nums.length - 1) return 0;\n    if (memo[index] != -1) return memo[index];\n    int best = 1_000_000;\n    int limit = Math.min(nums.length - 1, index + nums[index]);\n    for (int next = index + 1; next <= limit; next++) {\n      best = Math.min(best, 1 + dp(nums, next, memo));\n    }\n    memo[index] = best;\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int jump(int[] nums) {\n    int jumps = 0;\n    int currentEnd = 0;\n    int farthest = 0;\n\n    for (int i = 0; i < nums.length - 1; i++) {\n      farthest = Math.max(farthest, i + nums[i]);\n      if (i == currentEnd) {\n        jumps++;\n        currentEnd = farthest;\n      }\n    }\n    return jumps;\n  }\n}",
      "code": "class Solution {\n  public int jump(int[] nums) {\n    int jumps = 0;\n    int currentEnd = 0;\n    int farthest = 0;\n\n    for (int i = 0; i < nums.length - 1; i++) {\n      farthest = Math.max(farthest, i + nums[i]);\n      if (i == currentEnd) {\n        jumps++;\n        currentEnd = farthest;\n      }\n    }\n    return jumps;\n  }\n}"
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
      "constraints": "gas.length == cost.length; 1 <= n <= 100000; 0 <= gas[i], cost[i] <= 10000.",
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
      "bruteForceCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int n = gas.length;\n    for (int start = 0; start < n; start++) {\n      int tank = 0;\n      boolean ok = true;\n      for (int step = 0; step < n; step++) {\n        int station = (start + step) % n;\n        tank += gas[station] - cost[station];\n        if (tank < 0) {\n          ok = false;\n          break;\n        }\n      }\n      if (ok) return start;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0;\n    int tank = 0;\n    int start = 0;\n\n    for (int i = 0; i < gas.length; i++) {\n      int diff = gas[i] - cost[i];\n      total += diff;\n      tank += diff;\n      if (tank < 0) {\n        start = i + 1;\n        tank = 0;\n      }\n    }\n    return total >= 0 ? start : -1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int[] result = scan(gas, cost, 0, 0, 0, 0);\n    return result[0] >= 0 ? result[2] : -1;\n  }\n\n  private int[] scan(int[] gas, int[] cost, int index, int total, int tank, int start) {\n    if (index == gas.length) return new int[] {total, tank, start};\n    int diff = gas[index] - cost[index];\n    if (tank + diff < 0) {\n      return scan(gas, cost, index + 1, total + diff, 0, index + 1);\n    }\n    return scan(gas, cost, index + 1, total + diff, tank + diff, start);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0;\n    int tank = 0;\n    int start = 0;\n\n    for (int i = 0; i < gas.length; i++) {\n      int diff = gas[i] - cost[i];\n      total += diff;\n      tank += diff;\n      if (tank < 0) {\n        start = i + 1;\n        tank = 0;\n      }\n    }\n    return total >= 0 ? start : -1;\n  }\n}",
      "code": "class Solution {\n  public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0;\n    int tank = 0;\n    int start = 0;\n\n    for (int i = 0; i < gas.length; i++) {\n      int diff = gas[i] - cost[i];\n      total += diff;\n      tank += diff;\n      if (tank < 0) {\n        start = i + 1;\n        tank = 0;\n      }\n    }\n    return total >= 0 ? start : -1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Candy",
      "difficulty": "Hard",
      "subpattern": "Two-pass local constraint greedy",
      "question": "Given children ratings in a line, give each child at least one candy and give higher-rated children more candies than adjacent lower-rated children. Return the minimum candies needed.",
      "trigger": "Each child has only left and right local constraints, so satisfying one direction at a time is safe.",
      "intuition": "Pass left-to-right for rising slopes, then right-to-left for falling slopes, keeping the maximum requirement per child.",
      "edgeCases": "One child, strictly increasing ratings, strictly decreasing ratings, equal adjacent ratings, mountain shape.",
      "constraints": "1 <= ratings.length <= 20000; 0 <= ratings[i] <= 20000.",
      "source": {
        "label": "Candy - LeetCode 135",
        "url": "https://leetcode.com/problems/candy/"
      },
      "examples": [
        {
          "input": "ratings = [1,0,2]",
          "output": "5",
          "explanation": "Candies [2,1,2] satisfy both sides."
        },
        {
          "input": "ratings = [1,2,2]",
          "output": "4",
          "explanation": "Candies [1,2,1] are enough."
        },
        {
          "input": "ratings = [1,3,4,5,2]",
          "output": "11",
          "explanation": "The peak must exceed both neighboring slopes."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) worst case; Space O(n). Repeatedly relax violated neighbor constraints until stable.",
      "optimizedComplexity": "Time O(n); Space O(n). Two directional passes compute minimum local requirements.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes candy need from lower-rated neighbors.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int candy(int[] ratings) {\n    int n = ratings.length;\n    int[] candies = new int[n];\n    Arrays.fill(candies, 1);\n    boolean changed = true;\n\n    while (changed) {\n      changed = false;\n      for (int i = 0; i < n; i++) {\n        if (i > 0 && ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {\n          candies[i] = candies[i - 1] + 1;\n          changed = true;\n        }\n        if (i + 1 < n && ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {\n          candies[i] = candies[i + 1] + 1;\n          changed = true;\n        }\n      }\n    }\n    int total = 0;\n    for (int candy : candies) total += candy;\n    return total;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int candy(int[] ratings) {\n    int n = ratings.length;\n    int[] candies = new int[n];\n    Arrays.fill(candies, 1);\n\n    for (int i = 1; i < n; i++) {\n      if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n    }\n    for (int i = n - 2; i >= 0; i--) {\n      if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n    }\n\n    int total = 0;\n    for (int candy : candies) total += candy;\n    return total;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int candy(int[] ratings) {\n    int[] memo = new int[ratings.length];\n    int total = 0;\n    for (int i = 0; i < ratings.length; i++) total += need(ratings, i, memo);\n    return total;\n  }\n\n  private int need(int[] ratings, int index, int[] memo) {\n    if (memo[index] != 0) return memo[index];\n    int candies = 1;\n    if (index > 0 && ratings[index] > ratings[index - 1]) candies = Math.max(candies, need(ratings, index - 1, memo) + 1);\n    if (index + 1 < ratings.length && ratings[index] > ratings[index + 1]) candies = Math.max(candies, need(ratings, index + 1, memo) + 1);\n    memo[index] = candies;\n    return candies;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int candy(int[] ratings) {\n    int n = ratings.length;\n    int[] candies = new int[n];\n    Arrays.fill(candies, 1);\n\n    for (int i = 1; i < n; i++) {\n      if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n    }\n    for (int i = n - 2; i >= 0; i--) {\n      if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n    }\n\n    int total = 0;\n    for (int candy : candies) total += candy;\n    return total;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int candy(int[] ratings) {\n    int n = ratings.length;\n    int[] candies = new int[n];\n    Arrays.fill(candies, 1);\n\n    for (int i = 1; i < n; i++) {\n      if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n    }\n    for (int i = n - 2; i >= 0; i--) {\n      if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n    }\n\n    int total = 0;\n    for (int candy : candies) total += candy;\n    return total;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Queue Reconstruction by Height",
      "difficulty": "Medium",
      "subpattern": "Height-descending insertion greedy",
      "question": "Given people as [height, k], reconstruct a queue where k is the number of people in front with height greater than or equal to height.",
      "trigger": "Taller people are unaffected by the placement of shorter people, so their positions can be fixed first.",
      "intuition": "Sort taller people first, then insert each person at index k among already placed taller-or-equal people.",
      "edgeCases": "Same height with different k, already reconstructed input, shortest people with large k, one person, many equal heights.",
      "constraints": "1 <= people.length <= 2000; 0 <= height <= 10^6; 0 <= k < people.length.",
      "source": {
        "label": "Queue Reconstruction by Height - LeetCode 406",
        "url": "https://leetcode.com/problems/queue-reconstruction-by-height/"
      },
      "examples": [
        {
          "input": "people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]",
          "output": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]",
          "explanation": "Every person has exactly k taller-or-equal people before them."
        },
        {
          "input": "people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]",
          "output": "[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]",
          "explanation": "Taller-first insertion preserves constraints."
        },
        {
          "input": "people = [[1,0]]",
          "output": "[[1,0]]",
          "explanation": "A single person is already valid."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n^2); Space O(n). Try permutations until one satisfies all k counts.",
      "optimizedComplexity": "Time O(n^2 + n log n); Space O(n). Sorting is followed by list insertions.",
      "recursiveComplexity": "Time O(n^2 + n log n); Space O(n). Recursively insert sorted people into the queue.",
      "bruteForceCode": "class Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    boolean[] used = new boolean[people.length];\n    int[][] order = new int[people.length][2];\n    int[][] answer = build(people, used, order, 0);\n    return answer == null ? new int[0][0] : answer;\n  }\n\n  private int[][] build(int[][] people, boolean[] used, int[][] order, int pos) {\n    if (pos == people.length) return isValid(order) ? copy(order) : null;\n    for (int i = 0; i < people.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      order[pos] = people[i];\n      int[][] answer = build(people, used, order, pos + 1);\n      if (answer != null) return answer;\n      used[i] = false;\n    }\n    return null;\n  }\n\n  private boolean isValid(int[][] order) {\n    for (int i = 0; i < order.length; i++) {\n      int count = 0;\n      for (int j = 0; j < i; j++) if (order[j][0] >= order[i][0]) count++;\n      if (count != order[i][1]) return false;\n    }\n    return true;\n  }\n\n  private int[][] copy(int[][] order) {\n    int[][] result = new int[order.length][2];\n    for (int i = 0; i < order.length; i++) result[i] = order[i].clone();\n    return result;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n\n    for (int[] person : people) {\n      queue.add(person[1], person);\n    }\n    return queue.toArray(new int[people.length][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n    insert(people, 0, queue);\n    return queue.toArray(new int[people.length][]);\n  }\n\n  private void insert(int[][] people, int index, List<int[]> queue) {\n    if (index == people.length) return;\n    queue.add(people[index][1], people[index]);\n    insert(people, index + 1, queue);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n\n    for (int[] person : people) {\n      queue.add(person[1], person);\n    }\n    return queue.toArray(new int[people.length][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] reconstructQueue(int[][] people) {\n    Arrays.sort(people, (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0]));\n    List<int[]> queue = new ArrayList<>();\n\n    for (int[] person : people) {\n      queue.add(person[1], person);\n    }\n    return queue.toArray(new int[people.length][]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Non-overlapping Intervals",
      "difficulty": "Medium",
      "subpattern": "Earliest-finish interval greedy",
      "question": "Given intervals, return the minimum number that must be removed so the remaining intervals do not overlap.",
      "trigger": "Keeping the interval that ends earliest leaves the most room for future intervals.",
      "intuition": "Sort by end time and keep every compatible interval; every conflict removes the interval with later end.",
      "edgeCases": "Touching endpoints, nested intervals, all overlapping, no overlaps, negative endpoints.",
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
          "explanation": "Only one identical interval can remain."
        },
        {
          "input": "intervals = [[1,2],[2,3]]",
          "output": "0",
          "explanation": "Intervals touching at endpoints do not overlap."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Recursively keep or skip intervals to find the largest compatible subset.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. One end-time scan counts removals.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive scan after sorting by end time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    int kept = keep(intervals, 0, Integer.MIN_VALUE);\n    return intervals.length - kept;\n  }\n\n  private int keep(int[][] intervals, int index, int prevEnd) {\n    if (index == intervals.length) return 0;\n    int skip = keep(intervals, index + 1, prevEnd);\n    int take = 0;\n    if (intervals[index][0] >= prevEnd) {\n      take = 1 + keep(intervals, index + 1, intervals[index][1]);\n    }\n    return Math.max(skip, take);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] < end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    return scan(intervals, 0, Integer.MIN_VALUE);\n  }\n\n  private int scan(int[][] intervals, int index, int end) {\n    if (index == intervals.length) return 0;\n    if (intervals[index][0] < end) {\n      return 1 + scan(intervals, index + 1, end);\n    }\n    return scan(intervals, index + 1, intervals[index][1]);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] < end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int removed = 0;\n    int end = Integer.MIN_VALUE;\n\n    for (int[] interval : intervals) {\n      if (interval[0] < end) {\n        removed++;\n      } else {\n        end = interval[1];\n      }\n    }\n    return removed;\n  }\n}"
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
      "constraints": "1 <= intervals.length <= 10000; 0 <= start <= end <= 10000.",
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
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    List<int[]> list = new ArrayList<>();\n    for (int[] interval : intervals) list.add(interval.clone());\n    boolean changed = true;\n\n    while (changed) {\n      changed = false;\n      outer:\n      for (int i = 0; i < list.size(); i++) {\n        for (int j = i + 1; j < list.size(); j++) {\n          int[] a = list.get(i);\n          int[] b = list.get(j);\n          if (a[0] <= b[1] && b[0] <= a[1]) {\n            list.set(i, new int[] {Math.min(a[0], b[0]), Math.max(a[1], b[1])});\n            list.remove(j);\n            changed = true;\n            break outer;\n          }\n        }\n      }\n    }\n    return list.toArray(new int[list.size()][]);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n    scan(intervals, 0, merged);\n    return merged.toArray(new int[merged.size()][]);\n  }\n\n  private void scan(int[][] intervals, int index, List<int[]> merged) {\n    if (index == intervals.length) return;\n    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < intervals[index][0]) {\n      merged.add(intervals[index].clone());\n    } else {\n      int[] last = merged.get(merged.size() - 1);\n      last[1] = Math.max(last[1], intervals[index][1]);\n    }\n    scan(intervals, index + 1, merged);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> merged = new ArrayList<>();\n\n    for (int[] interval : intervals) {\n      if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n        merged.add(interval.clone());\n      } else {\n        int[] last = merged.get(merged.size() - 1);\n        last[1] = Math.max(last[1], interval[1]);\n      }\n    }\n    return merged.toArray(new int[merged.size()][]);\n  }\n}"
    },
    {
      "group": "core",
      "name": "Minimum Number of Arrows to Burst Balloons",
      "difficulty": "Medium",
      "subpattern": "Interval stabbing by right endpoint",
      "question": "Given balloon intervals on the x-axis, return the minimum arrows needed; one arrow shot at x bursts every balloon containing x.",
      "trigger": "Shooting at the earliest ending balloon endpoint also bursts every currently overlapping balloon and leaves maximum room.",
      "intuition": "Sort by right endpoint, shoot when the current balloon starts after the last arrow position.",
      "edgeCases": "One balloon, touching endpoints, nested intervals, negative coordinates, very large coordinate values.",
      "constraints": "1 <= points.length <= 100000; -2^31 <= start < end <= 2^31 - 1.",
      "source": {
        "label": "Minimum Number of Arrows to Burst Balloons - LeetCode 452",
        "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
      },
      "examples": [
        {
          "input": "points = [[10,16],[2,8],[1,6],[7,12]]",
          "output": "2",
          "explanation": "Arrows at 6 and 12 can burst all balloons."
        },
        {
          "input": "points = [[1,2],[3,4],[5,6],[7,8]]",
          "output": "4",
          "explanation": "No intervals overlap."
        },
        {
          "input": "points = [[1,2],[2,3]]",
          "output": "1",
          "explanation": "An arrow at 2 bursts both."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(n). Recursively try endpoint shots and mark all balloons hit by each shot.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. One scan by right endpoint counts arrows.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive scan after sorting by right endpoint.",
      "bruteForceCode": "class Solution {\n  public int findMinArrowShots(int[][] points) {\n    return search(points, new boolean[points.length]);\n  }\n\n  private int search(int[][] points, boolean[] hit) {\n    int first = -1;\n    for (int i = 0; i < points.length; i++) {\n      if (!hit[i]) {\n        first = i;\n        break;\n      }\n    }\n    if (first == -1) return 0;\n\n    int best = points.length;\n    for (int i = 0; i < points.length; i++) {\n      if (hit[i]) continue;\n      long arrow = points[i][1];\n      boolean[] next = hit.clone();\n      for (int j = 0; j < points.length; j++) {\n        if (points[j][0] <= arrow && arrow <= points[j][1]) next[j] = true;\n      }\n      best = Math.min(best, 1 + search(points, next));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] > arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    return scan(points, 0, Long.MIN_VALUE, 0);\n  }\n\n  private int scan(int[][] points, int index, long arrow, int arrows) {\n    if (index == points.length) return arrows;\n    if (arrows == 0 || points[index][0] > arrow) {\n      return scan(points, index + 1, points[index][1], arrows + 1);\n    }\n    return scan(points, index + 1, arrow, arrows);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] > arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findMinArrowShots(int[][] points) {\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 0;\n    long arrow = Long.MIN_VALUE;\n\n    for (int[] point : points) {\n      if (arrows == 0 || point[0] > arrow) {\n        arrows++;\n        arrow = point[1];\n      }\n    }\n    return arrows;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Partition Labels",
      "difficulty": "Medium",
      "subpattern": "Last-occurrence partition greedy",
      "question": "Given a string, split it into as many parts as possible so each letter appears in at most one part. Return the sizes of the parts.",
      "trigger": "A partition cannot close before the last occurrence of every character seen inside it.",
      "intuition": "Track the farthest last occurrence in the current segment; close the segment exactly when the scan reaches it.",
      "edgeCases": "Single character, all unique characters, all same character, one character spanning the whole string, repeated blocks.",
      "constraints": "1 <= s.length <= 500; s contains lowercase English letters.",
      "source": {
        "label": "Partition Labels - LeetCode 763",
        "url": "https://leetcode.com/problems/partition-labels/"
      },
      "examples": [
        {
          "input": "s = \"ababcbacadefegdehijhklij\"",
          "output": "[9,7,8]",
          "explanation": "Each letter appears in one partition only."
        },
        {
          "input": "s = \"eccbbbbdec\"",
          "output": "[10]",
          "explanation": "The characters force one full-string partition."
        },
        {
          "input": "s = \"abc\"",
          "output": "[1,1,1]",
          "explanation": "Each character can form its own partition."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(n). Try segment ends and verify whether every character inside ends within the segment.",
      "optimizedComplexity": "Time O(n); Space O(1). Last occurrence array has fixed alphabet size.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive segment builder uses last occurrences.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    List<Integer> result = new ArrayList<>();\n    build(s, 0, result);\n    return result;\n  }\n\n  private void build(String s, int start, List<Integer> result) {\n    if (start == s.length()) return;\n    for (int end = start; end < s.length(); end++) {\n      if (valid(s, start, end)) {\n        result.add(end - start + 1);\n        build(s, end + 1, result);\n        return;\n      }\n    }\n  }\n\n  private boolean valid(String s, int start, int end) {\n    for (int i = start; i <= end; i++) {\n      for (int j = end + 1; j < s.length(); j++) {\n        if (s.charAt(i) == s.charAt(j)) return false;\n      }\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n\n    List<Integer> result = new ArrayList<>();\n    int start = 0;\n    int end = 0;\n    for (int i = 0; i < s.length(); i++) {\n      end = Math.max(end, last[s.charAt(i) - 'a']);\n      if (i == end) {\n        result.add(end - start + 1);\n        start = i + 1;\n      }\n    }\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n    List<Integer> result = new ArrayList<>();\n    build(s, last, 0, result);\n    return result;\n  }\n\n  private void build(String s, int[] last, int start, List<Integer> result) {\n    if (start == s.length()) return;\n    int end = start;\n    for (int i = start; i <= end; i++) {\n      end = Math.max(end, last[s.charAt(i) - 'a']);\n    }\n    result.add(end - start + 1);\n    build(s, last, end + 1, result);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n\n    List<Integer> result = new ArrayList<>();\n    int start = 0;\n    int end = 0;\n    for (int i = 0; i < s.length(); i++) {\n      end = Math.max(end, last[s.charAt(i) - 'a']);\n      if (i == end) {\n        result.add(end - start + 1);\n        start = i + 1;\n      }\n    }\n    return result;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> partitionLabels(String s) {\n    int[] last = new int[26];\n    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n\n    List<Integer> result = new ArrayList<>();\n    int start = 0;\n    int end = 0;\n    for (int i = 0; i < s.length(); i++) {\n      end = Math.max(end, last[s.charAt(i) - 'a']);\n      if (i == end) {\n        result.add(end - start + 1);\n        start = i + 1;\n      }\n    }\n    return result;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Task Scheduler",
      "difficulty": "Medium",
      "subpattern": "Frequency cooldown greedy",
      "question": "Given CPU tasks represented by letters and a cooldown n, return the least time units needed to execute all tasks with identical tasks separated by at least n intervals.",
      "trigger": "The most frequent tasks define the minimum frame length; all other tasks fill idle slots inside those frames.",
      "intuition": "Build around the maximum frequency task count, then compare frame length with the raw number of tasks.",
      "edgeCases": "n equals zero, all tasks same, all tasks unique, multiple tasks tied for max frequency, idle slots fully filled.",
      "constraints": "1 <= tasks.length <= 10000; tasks[i] is uppercase English letter; 0 <= n <= 100.",
      "source": {
        "label": "Task Scheduler - LeetCode 621",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      "examples": [
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
          "output": "8",
          "explanation": "One schedule is A B idle A B idle A B."
        },
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0",
          "output": "6",
          "explanation": "No cooldown means no idles."
        },
        {
          "input": "tasks = [\"A\",\"A\",\"A\",\"A\",\"B\",\"B\",\"C\",\"C\"], n = 2",
          "output": "10",
          "explanation": "The four A tasks create the limiting frame."
        }
      ],
      "bruteForceComplexity": "Time O(answer * 26); Space O(26). Directly simulate each time unit by scanning available task counts and cooldowns.",
      "optimizedComplexity": "Time O(n + 26); Space O(26). Frequency formula computes the minimum frame length.",
      "recursiveComplexity": "Time O(answer * 26); Space O(answer + 26). Recursive simulation chooses the most frequent available task each time.",
      "bruteForceCode": "class Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    for (char task : tasks) count[task - 'A']++;\n    int[] nextAllowed = new int[26];\n    int remaining = tasks.length;\n    int time = 0;\n\n    while (remaining > 0) {\n      int best = -1;\n      for (int i = 0; i < 26; i++) {\n        if (count[i] > 0 && nextAllowed[i] <= time && (best == -1 || count[i] > count[best])) best = i;\n      }\n      if (best != -1) {\n        count[best]--;\n        remaining--;\n        nextAllowed[best] = time + n + 1;\n      }\n      time++;\n    }\n    return time;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    int max = 0;\n    for (char task : tasks) {\n      count[task - 'A']++;\n      max = Math.max(max, count[task - 'A']);\n    }\n\n    int maxCount = 0;\n    for (int value : count) if (value == max) maxCount++;\n    int frame = (max - 1) * (n + 1) + maxCount;\n    return Math.max(tasks.length, frame);\n  }\n}",
      "recursiveCode": "class Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    for (char task : tasks) count[task - 'A']++;\n    return simulate(count, new int[26], tasks.length, 0, n);\n  }\n\n  private int simulate(int[] count, int[] nextAllowed, int remaining, int time, int cooldown) {\n    if (remaining == 0) return time;\n    int best = -1;\n    for (int i = 0; i < 26; i++) {\n      if (count[i] > 0 && nextAllowed[i] <= time && (best == -1 || count[i] > count[best])) best = i;\n    }\n    if (best != -1) {\n      count[best]--;\n      nextAllowed[best] = time + cooldown + 1;\n      return simulate(count, nextAllowed, remaining - 1, time + 1, cooldown);\n    }\n    return simulate(count, nextAllowed, remaining, time + 1, cooldown);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    int max = 0;\n    for (char task : tasks) {\n      count[task - 'A']++;\n      max = Math.max(max, count[task - 'A']);\n    }\n\n    int maxCount = 0;\n    for (int value : count) if (value == max) maxCount++;\n    int frame = (max - 1) * (n + 1) + maxCount;\n    return Math.max(tasks.length, frame);\n  }\n}",
      "code": "class Solution {\n  public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    int max = 0;\n    for (char task : tasks) {\n      count[task - 'A']++;\n      max = Math.max(max, count[task - 'A']);\n    }\n\n    int maxCount = 0;\n    for (int value : count) if (value == max) maxCount++;\n    int frame = (max - 1) * (n + 1) + maxCount;\n    return Math.max(tasks.length, frame);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Reorganize String",
      "difficulty": "Medium",
      "subpattern": "Max-frequency rearrangement greedy",
      "question": "Given a string s, rearrange it so no two adjacent characters are equal, or return an empty string if impossible.",
      "trigger": "At every position, the safest choice is the currently most frequent character that is not equal to the previous character.",
      "intuition": "Use a max-heap of remaining frequencies and delay reusing the character placed in the previous step.",
      "edgeCases": "One character, one frequency greater than half rounded up, all unique characters, two dominant characters, already valid string.",
      "constraints": "1 <= s.length <= 500; s contains lowercase English letters.",
      "source": {
        "label": "Reorganize String - LeetCode 767",
        "url": "https://leetcode.com/problems/reorganize-string/"
      },
      "examples": [
        {
          "input": "s = \"aab\"",
          "output": "\"aba\"",
          "explanation": "The two a characters can be separated."
        },
        {
          "input": "s = \"aaab\"",
          "output": "\"\"",
          "explanation": "Three a characters cannot be separated by one b."
        },
        {
          "input": "s = \"vvvlo\"",
          "output": "\"vlvov\"",
          "explanation": "A valid arrangement separates repeated v characters."
        }
      ],
      "bruteForceComplexity": "Time O(26^n) worst case; Space O(n + 26). Backtracking tries valid characters at each position.",
      "optimizedComplexity": "Time O(n log 26); Space O(26). A max-heap chooses the highest remaining valid character.",
      "recursiveComplexity": "Time O(n log 26); Space O(n + 26). Recursive heap construction places one character per call.",
      "bruteForceCode": "class Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    StringBuilder path = new StringBuilder();\n    return build(count, path, s.length(), '#') ? path.toString() : \"\";\n  }\n\n  private boolean build(int[] count, StringBuilder path, int remaining, char prev) {\n    if (remaining == 0) return true;\n    for (int i = 0; i < 26; i++) {\n      char c = (char) ('a' + i);\n      if (count[i] == 0 || c == prev) continue;\n      count[i]--;\n      path.append(c);\n      if (build(count, path, remaining - 1, c)) return true;\n      path.deleteCharAt(path.length() - 1);\n      count[i]++;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n\n    StringBuilder answer = new StringBuilder();\n    int[] previous = null;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      answer.append((char) ('a' + current[0]));\n      current[1]--;\n      if (previous != null && previous[1] > 0) heap.offer(previous);\n      previous = current;\n    }\n    return answer.length() == s.length() ? answer.toString() : \"\";\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n    StringBuilder answer = new StringBuilder();\n    build(heap, null, answer, s.length());\n    return answer.length() == s.length() ? answer.toString() : \"\";\n  }\n\n  private void build(PriorityQueue<int[]> heap, int[] previous, StringBuilder answer, int total) {\n    if (answer.length() == total || heap.isEmpty()) return;\n    int[] current = heap.poll();\n    answer.append((char) ('a' + current[0]));\n    current[1]--;\n    if (previous != null && previous[1] > 0) heap.offer(previous);\n    build(heap, current, answer, total);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n\n    StringBuilder answer = new StringBuilder();\n    int[] previous = null;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      answer.append((char) ('a' + current[0]));\n      current[1]--;\n      if (previous != null && previous[1] > 0) heap.offer(previous);\n      previous = current;\n    }\n    return answer.length() == s.length() ? answer.toString() : \"\";\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String reorganizeString(String s) {\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[1] - a[1]);\n    for (int i = 0; i < 26; i++) if (count[i] > 0) heap.offer(new int[] {i, count[i]});\n\n    StringBuilder answer = new StringBuilder();\n    int[] previous = null;\n    while (!heap.isEmpty()) {\n      int[] current = heap.poll();\n      answer.append((char) ('a' + current[0]));\n      current[1]--;\n      if (previous != null && previous[1] > 0) heap.offer(previous);\n      previous = current;\n    }\n    return answer.length() == s.length() ? answer.toString() : \"\";\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Hand of Straights",
      "difficulty": "Medium",
      "subpattern": "Consecutive group start greedy",
      "question": "Given a hand of cards and groupSize, return true if the cards can be rearranged into groups of groupSize consecutive cards.",
      "trigger": "The smallest remaining card must start a consecutive group; it cannot be placed later.",
      "intuition": "Use a sorted frequency map and repeatedly consume one group starting from the smallest remaining card.",
      "edgeCases": "Hand length not divisible by groupSize, groupSize one, duplicate cards, missing middle card, negative-like not allowed.",
      "constraints": "1 <= hand.length <= 10000; 0 <= hand[i] <= 10^9; 1 <= groupSize <= hand.length.",
      "source": {
        "label": "Hand of Straights - LeetCode 846",
        "url": "https://leetcode.com/problems/hand-of-straights/"
      },
      "examples": [
        {
          "input": "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
          "output": "true",
          "explanation": "Groups can be [1,2,3], [2,3,4], and [6,7,8]."
        },
        {
          "input": "hand = [1,2,3,4,5], groupSize = 4",
          "output": "false",
          "explanation": "The hand size is not divisible by 4."
        },
        {
          "input": "hand = [1,2,3], groupSize = 1",
          "output": "true",
          "explanation": "Every card forms its own group."
        }
      ],
      "bruteForceComplexity": "Time O(n log n + n * groupSize); Space O(n). Recursively consumes the forced group starting at the smallest card.",
      "optimizedComplexity": "Time O(n log n + n * groupSize); Space O(n). TreeMap keeps the next smallest card available.",
      "recursiveComplexity": "Time O(n log n + n * groupSize); Space O(n). Recursive TreeMap removal builds one group at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n    return makeGroups(count, groupSize, hand.length);\n  }\n\n  private boolean makeGroups(TreeMap<Integer, Integer> count, int groupSize, int remaining) {\n    if (remaining == 0) return true;\n    int start = count.firstKey();\n    for (int card = start; card < start + groupSize; card++) {\n      Integer freq = count.get(card);\n      if (freq == null) return false;\n      if (freq == 1) count.remove(card); else count.put(card, freq - 1);\n    }\n    return makeGroups(count, groupSize, remaining - groupSize);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n\n    while (!count.isEmpty()) {\n      int start = count.firstKey();\n      for (int card = start; card < start + groupSize; card++) {\n        Integer freq = count.get(card);\n        if (freq == null) return false;\n        if (freq == 1) count.remove(card); else count.put(card, freq - 1);\n      }\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n    return consume(count, groupSize);\n  }\n\n  private boolean consume(TreeMap<Integer, Integer> count, int groupSize) {\n    if (count.isEmpty()) return true;\n    int start = count.firstKey();\n    for (int card = start; card < start + groupSize; card++) {\n      Integer freq = count.get(card);\n      if (freq == null) return false;\n      if (freq == 1) count.remove(card); else count.put(card, freq - 1);\n    }\n    return consume(count, groupSize);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n\n    while (!count.isEmpty()) {\n      int start = count.firstKey();\n      for (int card = start; card < start + groupSize; card++) {\n        Integer freq = count.get(card);\n        if (freq == null) return false;\n        if (freq == 1) count.remove(card); else count.put(card, freq - 1);\n      }\n    }\n    return true;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    TreeMap<Integer, Integer> count = new TreeMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n\n    while (!count.isEmpty()) {\n      int start = count.firstKey();\n      for (int card = start; card < start + groupSize; card++) {\n        Integer freq = count.get(card);\n        if (freq == null) return false;\n        if (freq == 1) count.remove(card); else count.put(card, freq - 1);\n      }\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Boats to Save People",
      "difficulty": "Medium",
      "subpattern": "Two-pointer pairing greedy",
      "question": "Given people weights and a boat limit where each boat carries at most two people, return the minimum number of boats needed.",
      "trigger": "The heaviest remaining person must take a boat; pairing them with the lightest possible person is never harmful.",
      "intuition": "Sort weights, put the heaviest person on a boat, and add the lightest person if they fit.",
      "edgeCases": "One person, all people equal limit, lightest cannot pair with heaviest, many exact pairs, limit just above max weight.",
      "constraints": "1 <= people.length <= 50000; 1 <= people[i] <= limit <= 30000.",
      "source": {
        "label": "Boats to Save People - LeetCode 881",
        "url": "https://leetcode.com/problems/boats-to-save-people/"
      },
      "examples": [
        {
          "input": "people = [1,2], limit = 3",
          "output": "1",
          "explanation": "Both people fit in one boat."
        },
        {
          "input": "people = [3,2,2,1], limit = 3",
          "output": "3",
          "explanation": "The person with weight 3 rides alone."
        },
        {
          "input": "people = [3,5,3,4], limit = 5",
          "output": "4",
          "explanation": "No pair can include weight 5 or 4 with another person."
        }
      ],
      "bruteForceComplexity": "Time O(2^n * n); Space O(n). Recursively choose whether the first remaining person rides alone or with a partner.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Two pointers pair lightest with heaviest when possible.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive two-pointer pairing after sorting.",
      "bruteForceCode": "class Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    return search(people, limit, new boolean[people.length]);\n  }\n\n  private int search(int[] people, int limit, boolean[] used) {\n    int first = -1;\n    for (int i = 0; i < people.length; i++) if (!used[i]) { first = i; break; }\n    if (first == -1) return 0;\n\n    used[first] = true;\n    int best = 1 + search(people, limit, used);\n    for (int j = first + 1; j < people.length; j++) {\n      if (!used[j] && people[first] + people[j] <= limit) {\n        used[j] = true;\n        best = Math.min(best, 1 + search(people, limit, used));\n        used[j] = false;\n      }\n    }\n    used[first] = false;\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0;\n    int right = people.length - 1;\n    int boats = 0;\n\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    return boats(people, limit, 0, people.length - 1);\n  }\n\n  private int boats(int[] people, int limit, int left, int right) {\n    if (left > right) return 0;\n    if (people[left] + people[right] <= limit) return 1 + boats(people, limit, left + 1, right - 1);\n    return 1 + boats(people, limit, left, right - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0;\n    int right = people.length - 1;\n    int boats = 0;\n\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numRescueBoats(int[] people, int limit) {\n    Arrays.sort(people);\n    int left = 0;\n    int right = people.length - 1;\n    int boats = 0;\n\n    while (left <= right) {\n      if (people[left] + people[right] <= limit) left++;\n      right--;\n      boats++;\n    }\n    return boats;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Two City Scheduling",
      "difficulty": "Medium",
      "subpattern": "Exchange argument sorting greedy",
      "question": "Given costs for flying each person to city A or B, send exactly n people to each city with minimum total cost.",
      "trigger": "The difference costA - costB measures how much better city A is than city B for each person.",
      "intuition": "Sort by the A-versus-B savings and send the first half to A, second half to B.",
      "edgeCases": "Two people, equal differences, all A costs cheaper, all B costs cheaper, large cost gaps.",
      "constraints": "2 <= costs.length <= 100; costs.length is even; 1 <= costA, costB <= 1000.",
      "source": {
        "label": "Two City Scheduling - LeetCode 1029",
        "url": "https://leetcode.com/problems/two-city-scheduling/"
      },
      "examples": [
        {
          "input": "costs = [[10,20],[30,200],[400,50],[30,20]]",
          "output": "110",
          "explanation": "Send people 0 and 1 to A, people 2 and 3 to B."
        },
        {
          "input": "costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]",
          "output": "1859",
          "explanation": "Sorting by savings gives the minimum split."
        },
        {
          "input": "costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]",
          "output": "3086",
          "explanation": "Exactly half must go to each city."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Recursively assign each person while tracking how many go to city A.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Difference sorting gives the exchange-optimal split.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive accumulation after sorting by cost difference.",
      "bruteForceCode": "class Solution {\n  public int twoCitySchedCost(int[][] costs) {\n    return assign(costs, 0, costs.length / 2);\n  }\n\n  private int assign(int[][] costs, int index, int aLeft) {\n    if (index == costs.length) return aLeft == 0 ? 0 : 1_000_000;\n    int bLeft = costs.length - index - aLeft;\n    int best = 1_000_000;\n    if (aLeft > 0) best = Math.min(best, costs[index][0] + assign(costs, index + 1, aLeft - 1));\n    if (bLeft > 0) best = Math.min(best, costs[index][1] + assign(costs, index + 1, aLeft));\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int twoCitySchedCost(int[][] costs) {\n    Arrays.sort(costs, (a, b) -> Integer.compare(a[0] - a[1], b[0] - b[1]));\n    int n = costs.length / 2;\n    int total = 0;\n    for (int i = 0; i < costs.length; i++) {\n      total += i < n ? costs[i][0] : costs[i][1];\n    }\n    return total;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int twoCitySchedCost(int[][] costs) {\n    Arrays.sort(costs, (a, b) -> Integer.compare(a[0] - a[1], b[0] - b[1]));\n    return sum(costs, 0, costs.length / 2);\n  }\n\n  private int sum(int[][] costs, int index, int half) {\n    if (index == costs.length) return 0;\n    int cost = index < half ? costs[index][0] : costs[index][1];\n    return cost + sum(costs, index + 1, half);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int twoCitySchedCost(int[][] costs) {\n    Arrays.sort(costs, (a, b) -> Integer.compare(a[0] - a[1], b[0] - b[1]));\n    int n = costs.length / 2;\n    int total = 0;\n    for (int i = 0; i < costs.length; i++) {\n      total += i < n ? costs[i][0] : costs[i][1];\n    }\n    return total;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int twoCitySchedCost(int[][] costs) {\n    Arrays.sort(costs, (a, b) -> Integer.compare(a[0] - a[1], b[0] - b[1]));\n    int n = costs.length / 2;\n    int total = 0;\n    for (int i = 0; i < costs.length; i++) {\n      total += i < n ? costs[i][0] : costs[i][1];\n    }\n    return total;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Subarray",
      "difficulty": "Medium",
      "subpattern": "Kadane local reset greedy",
      "question": "Given an integer array, return the largest possible sum of a non-empty contiguous subarray.",
      "trigger": "A negative running prefix can only hurt any future subarray and should be dropped.",
      "intuition": "At each index, keep the best subarray ending here: either extend the previous one or restart at current value.",
      "edgeCases": "All negative numbers, one element, zeros, best subarray at end, best subarray in middle.",
      "constraints": "1 <= nums.length <= 100000; -10000 <= nums[i] <= 10000.",
      "source": {
        "label": "Maximum Subarray - LeetCode 53",
        "url": "https://leetcode.com/problems/maximum-subarray/"
      },
      "examples": [
        {
          "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          "output": "6",
          "explanation": "The best subarray is [4,-1,2,1]."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The single element is the answer."
        },
        {
          "input": "nums = [5,4,-1,7,8]",
          "output": "23",
          "explanation": "The entire array has the maximum sum."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Enumerate every subarray and update the best sum.",
      "optimizedComplexity": "Time O(n); Space O(1). Kadane keeps only current ending sum and global best.",
      "recursiveComplexity": "Time O(n log n); Space O(log n). Divide and conquer combines left, right, and crossing sums.",
      "bruteForceCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int best = Integer.MIN_VALUE;\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        best = Math.max(best, sum);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int current = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      current = Math.max(nums[i], current + nums[i]);\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    return solve(nums, 0, nums.length - 1);\n  }\n\n  private int solve(int[] nums, int left, int right) {\n    if (left == right) return nums[left];\n    int mid = left + (right - left) / 2;\n    int bestLeft = solve(nums, left, mid);\n    int bestRight = solve(nums, mid + 1, right);\n    int sum = 0;\n    int crossLeft = Integer.MIN_VALUE;\n    for (int i = mid; i >= left; i--) {\n      sum += nums[i];\n      crossLeft = Math.max(crossLeft, sum);\n    }\n    sum = 0;\n    int crossRight = Integer.MIN_VALUE;\n    for (int i = mid + 1; i <= right; i++) {\n      sum += nums[i];\n      crossRight = Math.max(crossRight, sum);\n    }\n    return Math.max(Math.max(bestLeft, bestRight), crossLeft + crossRight);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int current = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      current = Math.max(nums[i], current + nums[i]);\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int current = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      current = Math.max(nums[i], current + nums[i]);\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Best Time to Buy and Sell Stock II",
      "difficulty": "Medium",
      "subpattern": "Profit accumulation greedy",
      "question": "Given daily stock prices, return the maximum profit with as many buy-sell transactions as desired, holding at most one share at a time.",
      "trigger": "Every positive price increase can be captured independently without hurting future transactions.",
      "intuition": "Sum all upward adjacent differences; this equals buying at each valley and selling at each peak.",
      "edgeCases": "Descending prices, one day, all equal prices, multiple peaks, continuous rise.",
      "constraints": "1 <= prices.length <= 30000; 0 <= prices[i] <= 10000.",
      "source": {
        "label": "Best Time to Buy and Sell Stock II - LeetCode 122",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"
      },
      "examples": [
        {
          "input": "prices = [7,1,5,3,6,4]",
          "output": "7",
          "explanation": "Profit 4 from 1->5 and 3 from 3->6."
        },
        {
          "input": "prices = [1,2,3,4,5]",
          "output": "4",
          "explanation": "Capture every adjacent increase."
        },
        {
          "input": "prices = [7,6,4,3,1]",
          "output": "0",
          "explanation": "No profitable transaction exists."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Recursively choose buy, sell, or skip states.",
      "optimizedComplexity": "Time O(n); Space O(1). Sum every positive adjacent difference.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan accumulates positive differences.",
      "bruteForceCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    return trade(prices, 0, false);\n  }\n\n  private int trade(int[] prices, int day, boolean holding) {\n    if (day == prices.length) return 0;\n    int skip = trade(prices, day + 1, holding);\n    if (holding) {\n      return Math.max(skip, prices[day] + trade(prices, day + 1, false));\n    }\n    return Math.max(skip, -prices[day] + trade(prices, day + 1, true));\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    int profit = 0;\n    for (int i = 1; i < prices.length; i++) {\n      if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n    }\n    return profit;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    return collect(prices, 1);\n  }\n\n  private int collect(int[] prices, int index) {\n    if (index == prices.length) return 0;\n    int gain = Math.max(0, prices[index] - prices[index - 1]);\n    return gain + collect(prices, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    int profit = 0;\n    for (int i = 1; i < prices.length; i++) {\n      if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n    }\n    return profit;\n  }\n}",
      "code": "class Solution {\n  public int maxProfit(int[] prices) {\n    int profit = 0;\n    for (int i = 1; i < prices.length; i++) {\n      if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];\n    }\n    return profit;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Can Place Flowers",
      "difficulty": "Easy",
      "subpattern": "Local placement greedy",
      "question": "Given a flowerbed of 0s and 1s and an integer n, return true if n new flowers can be planted without adjacent flowers.",
      "trigger": "Planting at the earliest valid empty spot cannot block a better earlier choice and only affects its immediate neighbors.",
      "intuition": "Scan left to right; when both neighbors are empty or outside the array, plant immediately.",
      "edgeCases": "Single plot, n is zero, flowers at both ends, consecutive zeros, already full flowerbed.",
      "constraints": "1 <= flowerbed.length <= 20000; flowerbed[i] is 0 or 1; 0 <= n <= flowerbed.length.",
      "source": {
        "label": "Can Place Flowers - LeetCode 605",
        "url": "https://leetcode.com/problems/can-place-flowers/"
      },
      "examples": [
        {
          "input": "flowerbed = [1,0,0,0,1], n = 1",
          "output": "true",
          "explanation": "Plant at index 2."
        },
        {
          "input": "flowerbed = [1,0,0,0,1], n = 2",
          "output": "false",
          "explanation": "Only one new flower can fit."
        },
        {
          "input": "flowerbed = [0], n = 1",
          "output": "true",
          "explanation": "The only plot has no neighbors."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Recursively try planting or skipping every plot.",
      "optimizedComplexity": "Time O(n); Space O(1). One scan mutates valid empty plots.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan applies the same earliest-placement rule.",
      "bruteForceCode": "class Solution {\n  public boolean canPlaceFlowers(int[] flowerbed, int n) {\n    return search(flowerbed.clone(), 0, n);\n  }\n\n  private boolean search(int[] bed, int index, int leftToPlant) {\n    if (leftToPlant <= 0) return true;\n    if (index == bed.length) return false;\n    if (canPlant(bed, index)) {\n      bed[index] = 1;\n      if (search(bed, index + 1, leftToPlant - 1)) return true;\n      bed[index] = 0;\n    }\n    return search(bed, index + 1, leftToPlant);\n  }\n\n  private boolean canPlant(int[] bed, int index) {\n    return bed[index] == 0 && (index == 0 || bed[index - 1] == 0) && (index + 1 == bed.length || bed[index + 1] == 0);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean canPlaceFlowers(int[] flowerbed, int n) {\n    for (int i = 0; i < flowerbed.length && n > 0; i++) {\n      boolean leftEmpty = i == 0 || flowerbed[i - 1] == 0;\n      boolean rightEmpty = i + 1 == flowerbed.length || flowerbed[i + 1] == 0;\n      if (flowerbed[i] == 0 && leftEmpty && rightEmpty) {\n        flowerbed[i] = 1;\n        n--;\n      }\n    }\n    return n == 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean canPlaceFlowers(int[] flowerbed, int n) {\n    return plant(flowerbed, 0, n);\n  }\n\n  private boolean plant(int[] bed, int index, int leftToPlant) {\n    if (leftToPlant <= 0) return true;\n    if (index == bed.length) return false;\n    boolean leftEmpty = index == 0 || bed[index - 1] == 0;\n    boolean rightEmpty = index + 1 == bed.length || bed[index + 1] == 0;\n    if (bed[index] == 0 && leftEmpty && rightEmpty) {\n      bed[index] = 1;\n      return plant(bed, index + 1, leftToPlant - 1);\n    }\n    return plant(bed, index + 1, leftToPlant);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean canPlaceFlowers(int[] flowerbed, int n) {\n    for (int i = 0; i < flowerbed.length && n > 0; i++) {\n      boolean leftEmpty = i == 0 || flowerbed[i - 1] == 0;\n      boolean rightEmpty = i + 1 == flowerbed.length || flowerbed[i + 1] == 0;\n      if (flowerbed[i] == 0 && leftEmpty && rightEmpty) {\n        flowerbed[i] = 1;\n        n--;\n      }\n    }\n    return n == 0;\n  }\n}",
      "code": "class Solution {\n  public boolean canPlaceFlowers(int[] flowerbed, int n) {\n    for (int i = 0; i < flowerbed.length && n > 0; i++) {\n      boolean leftEmpty = i == 0 || flowerbed[i - 1] == 0;\n      boolean rightEmpty = i + 1 == flowerbed.length || flowerbed[i + 1] == 0;\n      if (flowerbed[i] == 0 && leftEmpty && rightEmpty) {\n        flowerbed[i] = 1;\n        n--;\n      }\n    }\n    return n == 0;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Increasing Triplet Subsequence",
      "difficulty": "Medium",
      "subpattern": "Minimum-tail subsequence greedy",
      "question": "Given an integer array, return true if there exists a strictly increasing subsequence of length three.",
      "trigger": "Only the smallest possible first and second values matter for creating a future third value.",
      "intuition": "Keep the minimum tail for length 1 and length 2 subsequences; any value greater than both completes a triplet.",
      "edgeCases": "Fewer than three numbers, duplicates, decreasing array, triplet not contiguous, negative values.",
      "constraints": "1 <= nums.length <= 500000; -2^31 <= nums[i] <= 2^31 - 1.",
      "source": {
        "label": "Increasing Triplet Subsequence - LeetCode 334",
        "url": "https://leetcode.com/problems/increasing-triplet-subsequence/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,4,5]",
          "output": "true",
          "explanation": "1, 2, 3 form a triplet."
        },
        {
          "input": "nums = [5,4,3,2,1]",
          "output": "false",
          "explanation": "No increasing subsequence of length three exists."
        },
        {
          "input": "nums = [2,1,5,0,4,6]",
          "output": "true",
          "explanation": "0, 4, 6 form a triplet."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every triple of indexes.",
      "optimizedComplexity": "Time O(n); Space O(1). Track the smallest first and second subsequence tails.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan carries the two current tail values.",
      "bruteForceCode": "class Solution {\n  public boolean increasingTriplet(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        for (int k = j + 1; k < nums.length; k++) {\n          if (nums[i] < nums[j] && nums[j] < nums[k]) return true;\n        }\n      }\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean increasingTriplet(int[] nums) {\n    int first = Integer.MAX_VALUE;\n    int second = Integer.MAX_VALUE;\n\n    for (int num : nums) {\n      if (num <= first) {\n        first = num;\n      } else if (num <= second) {\n        second = num;\n      } else {\n        return true;\n      }\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean increasingTriplet(int[] nums) {\n    return scan(nums, 0, Integer.MAX_VALUE, Integer.MAX_VALUE);\n  }\n\n  private boolean scan(int[] nums, int index, int first, int second) {\n    if (index == nums.length) return false;\n    int num = nums[index];\n    if (num <= first) return scan(nums, index + 1, num, second);\n    if (num <= second) return scan(nums, index + 1, first, num);\n    return true;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean increasingTriplet(int[] nums) {\n    int first = Integer.MAX_VALUE;\n    int second = Integer.MAX_VALUE;\n\n    for (int num : nums) {\n      if (num <= first) {\n        first = num;\n      } else if (num <= second) {\n        second = num;\n      } else {\n        return true;\n      }\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean increasingTriplet(int[] nums) {\n    int first = Integer.MAX_VALUE;\n    int second = Integer.MAX_VALUE;\n\n    for (int num : nums) {\n      if (num <= first) {\n        first = num;\n      } else if (num <= second) {\n        second = num;\n      } else {\n        return true;\n      }\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Deletions to Make Character Frequencies Unique",
      "difficulty": "Medium",
      "subpattern": "Frequency uniqueness greedy",
      "question": "Given a string, delete the fewest characters so every remaining character frequency is unique.",
      "trigger": "When a frequency is already used, reducing it is the only possible direction and the largest available unused frequency is always best.",
      "intuition": "For each frequency, decrement until it reaches an unused value or zero, counting each decrement.",
      "edgeCases": "All characters same, all frequencies already unique, many equal frequencies, deletion to zero, empty result allowed after deletions.",
      "constraints": "1 <= s.length <= 100000; s contains lowercase English letters.",
      "source": {
        "label": "Minimum Deletions to Make Character Frequencies Unique - LeetCode 1647",
        "url": "https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/"
      },
      "examples": [
        {
          "input": "s = \"aab\"",
          "output": "0",
          "explanation": "Frequencies 2 and 1 are already unique."
        },
        {
          "input": "s = \"aaabbbcc\"",
          "output": "2",
          "explanation": "Reduce one frequency 3 to 2 and frequency 2 to 1."
        },
        {
          "input": "s = \"ceabaacb\"",
          "output": "2",
          "explanation": "Two deletions make all non-zero frequencies unique."
        }
      ],
      "bruteForceComplexity": "Time O(26 * maxFreq^2); Space O(26). Recursively tries every lower unused frequency for each character.",
      "optimizedComplexity": "Time O(n + 26 * maxFreq); Space O(26). Greedily decrement duplicate frequencies.",
      "recursiveComplexity": "Time O(n + 26 * maxFreq); Space O(26). Recursive processing carries the set of used frequencies.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int minDeletions(String s) {\n    int[] freq = new int[26];\n    for (char c : s.toCharArray()) freq[c - 'a']++;\n    return dfs(freq, 0, new HashSet<>());\n  }\n\n  private int dfs(int[] freq, int index, Set<Integer> used) {\n    if (index == freq.length) return 0;\n    if (freq[index] == 0) return dfs(freq, index + 1, used);\n    int best = freq[index];\n    for (int target = freq[index]; target >= 0; target--) {\n      if (target > 0 && used.contains(target)) continue;\n      if (target > 0) used.add(target);\n      best = Math.min(best, freq[index] - target + dfs(freq, index + 1, used));\n      if (target > 0) used.remove(target);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minDeletions(String s) {\n    int[] freq = new int[26];\n    for (char c : s.toCharArray()) freq[c - 'a']++;\n\n    Set<Integer> used = new HashSet<>();\n    int deletions = 0;\n    for (int count : freq) {\n      while (count > 0 && used.contains(count)) {\n        count--;\n        deletions++;\n      }\n      if (count > 0) used.add(count);\n    }\n    return deletions;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minDeletions(String s) {\n    int[] freq = new int[26];\n    for (char c : s.toCharArray()) freq[c - 'a']++;\n    return process(freq, 0, new HashSet<>());\n  }\n\n  private int process(int[] freq, int index, Set<Integer> used) {\n    if (index == freq.length) return 0;\n    int count = freq[index];\n    int deletions = 0;\n    while (count > 0 && used.contains(count)) {\n      count--;\n      deletions++;\n    }\n    if (count > 0) used.add(count);\n    return deletions + process(freq, index + 1, used);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minDeletions(String s) {\n    int[] freq = new int[26];\n    for (char c : s.toCharArray()) freq[c - 'a']++;\n\n    Set<Integer> used = new HashSet<>();\n    int deletions = 0;\n    for (int count : freq) {\n      while (count > 0 && used.contains(count)) {\n        count--;\n        deletions++;\n      }\n      if (count > 0) used.add(count);\n    }\n    return deletions;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minDeletions(String s) {\n    int[] freq = new int[26];\n    for (char c : s.toCharArray()) freq[c - 'a']++;\n\n    Set<Integer> used = new HashSet<>();\n    int deletions = 0;\n    for (int count : freq) {\n      while (count > 0 && used.contains(count)) {\n        count--;\n        deletions++;\n      }\n      if (count > 0) used.add(count);\n    }\n    return deletions;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Valid Parenthesis String",
      "difficulty": "Medium",
      "subpattern": "Open-range wildcard greedy",
      "question": "Given a string containing (, ), and *, return true if * can represent (, ), or empty so the string becomes valid parentheses.",
      "trigger": "Only the minimum and maximum possible number of open parentheses matter after each prefix.",
      "intuition": "Track a range of possible open counts; ) lowers both ends, * expands the range, and the lower bound cannot go below zero.",
      "edgeCases": "Only stars, early closing parenthesis, empty interpretation needed, many opens, exact balance at end.",
      "constraints": "1 <= s.length <= 100; s contains only (, ), and *.",
      "source": {
        "label": "Valid Parenthesis String - LeetCode 678",
        "url": "https://leetcode.com/problems/valid-parenthesis-string/"
      },
      "examples": [
        {
          "input": "s = \"()\"",
          "output": "true",
          "explanation": "The string is already valid."
        },
        {
          "input": "s = \"(*)\"",
          "output": "true",
          "explanation": "The star can be empty."
        },
        {
          "input": "s = \"(*))\"",
          "output": "true",
          "explanation": "The star can be an opening parenthesis."
        }
      ],
      "bruteForceComplexity": "Time O(3^stars); Space O(n). Recursively try every meaning of each star.",
      "optimizedComplexity": "Time O(n); Space O(1). Keep only the possible range of open counts.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoization stores index and current open count.",
      "bruteForceCode": "class Solution {\n  public boolean checkValidString(String s) {\n    return dfs(s, 0, 0);\n  }\n\n  private boolean dfs(String s, int index, int open) {\n    if (open < 0) return false;\n    if (index == s.length()) return open == 0;\n    char c = s.charAt(index);\n    if (c == '(') return dfs(s, index + 1, open + 1);\n    if (c == ')') return dfs(s, index + 1, open - 1);\n    return dfs(s, index + 1, open) || dfs(s, index + 1, open + 1) || dfs(s, index + 1, open - 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean checkValidString(String s) {\n    int low = 0;\n    int high = 0;\n\n    for (char c : s.toCharArray()) {\n      if (c == '(') {\n        low++;\n        high++;\n      } else if (c == ')') {\n        low--;\n        high--;\n      } else {\n        low--;\n        high++;\n      }\n      if (high < 0) return false;\n      low = Math.max(low, 0);\n    }\n    return low == 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean checkValidString(String s) {\n    Boolean[][] memo = new Boolean[s.length()][s.length() + 1];\n    return dp(s, 0, 0, memo);\n  }\n\n  private boolean dp(String s, int index, int open, Boolean[][] memo) {\n    if (open < 0) return false;\n    if (index == s.length()) return open == 0;\n    if (open > s.length()) return false;\n    if (memo[index][open] != null) return memo[index][open];\n    char c = s.charAt(index);\n    boolean ok;\n    if (c == '(') ok = dp(s, index + 1, open + 1, memo);\n    else if (c == ')') ok = dp(s, index + 1, open - 1, memo);\n    else ok = dp(s, index + 1, open, memo) || dp(s, index + 1, open + 1, memo) || dp(s, index + 1, open - 1, memo);\n    memo[index][open] = ok;\n    return ok;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean checkValidString(String s) {\n    int low = 0;\n    int high = 0;\n\n    for (char c : s.toCharArray()) {\n      if (c == '(') {\n        low++;\n        high++;\n      } else if (c == ')') {\n        low--;\n        high--;\n      } else {\n        low--;\n        high++;\n      }\n      if (high < 0) return false;\n      low = Math.max(low, 0);\n    }\n    return low == 0;\n  }\n}",
      "code": "class Solution {\n  public boolean checkValidString(String s) {\n    int low = 0;\n    int high = 0;\n\n    for (char c : s.toCharArray()) {\n      if (c == '(') {\n        low++;\n        high++;\n      } else if (c == ')') {\n        low--;\n        high--;\n      } else {\n        low--;\n        high++;\n      }\n      if (high < 0) return false;\n      low = Math.max(low, 0);\n    }\n    return low == 0;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Remove K Digits",
      "difficulty": "Medium",
      "subpattern": "Monotonic stack removal greedy",
      "question": "Given a non-negative number as a string and integer k, remove exactly k digits so the resulting number is as small as possible.",
      "trigger": "A larger digit before a smaller digit should be removed while removals remain because it improves the most significant position.",
      "intuition": "Maintain an increasing stack of digits, popping previous larger digits before pushing the current digit.",
      "edgeCases": "Remove all digits, leading zeros, already increasing digits, decreasing digits, k remains after scan.",
      "constraints": "1 <= k <= num.length <= 100000; num contains only digits and has no leading zero except 0 itself.",
      "source": {
        "label": "Remove K Digits - LeetCode 402",
        "url": "https://leetcode.com/problems/remove-k-digits/"
      },
      "examples": [
        {
          "input": "num = \"1432219\", k = 3",
          "output": "\"1219\"",
          "explanation": "Remove 4, 3, and 2 to form the smallest number."
        },
        {
          "input": "num = \"10200\", k = 1",
          "output": "\"200\"",
          "explanation": "Remove 1 and strip leading zeros."
        },
        {
          "input": "num = \"10\", k = 2",
          "output": "\"0\"",
          "explanation": "All digits are removed."
        }
      ],
      "bruteForceComplexity": "Time O(n^k * n); Space O(k + n). Recursively remove one digit in every possible way.",
      "optimizedComplexity": "Time O(n); Space O(n). A monotonic stack removes harmful larger previous digits.",
      "recursiveComplexity": "Time O(n^2) worst case; Space O(n). Recursively chooses the smallest feasible next digit.",
      "bruteForceCode": "class Solution {\n  public String removeKdigits(String num, int k) {\n    if (k == num.length()) return \"0\";\n    return remove(num, k);\n  }\n\n  private String remove(String num, int k) {\n    if (k == 0) return normalize(num);\n    String best = null;\n    for (int i = 0; i < num.length(); i++) {\n      String candidate = remove(num.substring(0, i) + num.substring(i + 1), k - 1);\n      if (best == null || smaller(candidate, best)) best = candidate;\n    }\n    return best;\n  }\n\n  private String normalize(String value) {\n    int i = 0;\n    while (i < value.length() && value.charAt(i) == '0') i++;\n    return i == value.length() ? \"0\" : value.substring(i);\n  }\n\n  private boolean smaller(String a, String b) {\n    if (a.length() != b.length()) return a.length() < b.length();\n    return a.compareTo(b) < 0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String removeKdigits(String num, int k) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char digit : num.toCharArray()) {\n      while (k > 0 && !stack.isEmpty() && stack.peekLast() > digit) {\n        stack.removeLast();\n        k--;\n      }\n      stack.addLast(digit);\n    }\n    while (k-- > 0 && !stack.isEmpty()) stack.removeLast();\n\n    StringBuilder answer = new StringBuilder();\n    boolean leading = true;\n    for (char digit : stack) {\n      if (leading && digit == '0') continue;\n      leading = false;\n      answer.append(digit);\n    }\n    return answer.length() == 0 ? \"0\" : answer.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String removeKdigits(String num, int k) {\n    if (k == num.length()) return \"0\";\n    String result = build(num, 0, num.length() - k);\n    int i = 0;\n    while (i < result.length() && result.charAt(i) == '0') i++;\n    return i == result.length() ? \"0\" : result.substring(i);\n  }\n\n  private String build(String num, int start, int keep) {\n    if (keep == 0) return \"\";\n    int end = num.length() - keep;\n    int best = start;\n    for (int i = start; i <= end; i++) {\n      if (num.charAt(i) < num.charAt(best)) best = i;\n    }\n    return num.charAt(best) + build(num, best + 1, keep - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String removeKdigits(String num, int k) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char digit : num.toCharArray()) {\n      while (k > 0 && !stack.isEmpty() && stack.peekLast() > digit) {\n        stack.removeLast();\n        k--;\n      }\n      stack.addLast(digit);\n    }\n    while (k-- > 0 && !stack.isEmpty()) stack.removeLast();\n\n    StringBuilder answer = new StringBuilder();\n    boolean leading = true;\n    for (char digit : stack) {\n      if (leading && digit == '0') continue;\n      leading = false;\n      answer.append(digit);\n    }\n    return answer.length() == 0 ? \"0\" : answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String removeKdigits(String num, int k) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char digit : num.toCharArray()) {\n      while (k > 0 && !stack.isEmpty() && stack.peekLast() > digit) {\n        stack.removeLast();\n        k--;\n      }\n      stack.addLast(digit);\n    }\n    while (k-- > 0 && !stack.isEmpty()) stack.removeLast();\n\n    StringBuilder answer = new StringBuilder();\n    boolean leading = true;\n    for (char digit : stack) {\n      if (leading && digit == '0') continue;\n      leading = false;\n      answer.append(digit);\n    }\n    return answer.length() == 0 ? \"0\" : answer.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Units on a Truck",
      "difficulty": "Easy",
      "subpattern": "Exchange argument sorting greedy",
      "question": "Given box types as [numberOfBoxes, unitsPerBox] and a truck size, return the maximum units that can be loaded.",
      "trigger": "A box with more units per box should always be taken before a box with fewer units per box.",
      "intuition": "Sort by units per box descending and fill the truck greedily from the most valuable type.",
      "edgeCases": "Truck smaller than first type, truck larger than all boxes, equal unit counts, one box type, zero remaining capacity.",
      "constraints": "1 <= boxTypes.length <= 1000; 1 <= boxes, unitsPerBox <= 1000; 1 <= truckSize <= 10^6.",
      "source": {
        "label": "Maximum Units on a Truck - LeetCode 1710",
        "url": "https://leetcode.com/problems/maximum-units-on-a-truck/"
      },
      "examples": [
        {
          "input": "boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4",
          "output": "8",
          "explanation": "Take one 3-unit box and two 2-unit boxes and one 1-unit box."
        },
        {
          "input": "boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10",
          "output": "91",
          "explanation": "Load higher unit boxes first."
        },
        {
          "input": "boxTypes = [[1,3]], truckSize = 1",
          "output": "3",
          "explanation": "Only one box is available."
        }
      ],
      "bruteForceComplexity": "Time O(product of box counts); Space O(types). Recursively try taking each possible count from every box type.",
      "optimizedComplexity": "Time O(types log types); Space O(log types) for sorting. Greedily consume highest unit types.",
      "recursiveComplexity": "Time O(types log types); Space O(types). Recursive fill after sorting by units descending.",
      "bruteForceCode": "class Solution {\n  public int maximumUnits(int[][] boxTypes, int truckSize) {\n    return choose(boxTypes, 0, truckSize);\n  }\n\n  private int choose(int[][] boxTypes, int index, int capacity) {\n    if (index == boxTypes.length || capacity == 0) return 0;\n    int best = 0;\n    int maxTake = Math.min(boxTypes[index][0], capacity);\n    for (int take = 0; take <= maxTake; take++) {\n      int units = take * boxTypes[index][1] + choose(boxTypes, index + 1, capacity - take);\n      best = Math.max(best, units);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maximumUnits(int[][] boxTypes, int truckSize) {\n    Arrays.sort(boxTypes, (a, b) -> Integer.compare(b[1], a[1]));\n    int units = 0;\n\n    for (int[] type : boxTypes) {\n      int take = Math.min(truckSize, type[0]);\n      units += take * type[1];\n      truckSize -= take;\n      if (truckSize == 0) break;\n    }\n    return units;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maximumUnits(int[][] boxTypes, int truckSize) {\n    Arrays.sort(boxTypes, (a, b) -> Integer.compare(b[1], a[1]));\n    return fill(boxTypes, 0, truckSize);\n  }\n\n  private int fill(int[][] boxTypes, int index, int capacity) {\n    if (index == boxTypes.length || capacity == 0) return 0;\n    int take = Math.min(capacity, boxTypes[index][0]);\n    return take * boxTypes[index][1] + fill(boxTypes, index + 1, capacity - take);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maximumUnits(int[][] boxTypes, int truckSize) {\n    Arrays.sort(boxTypes, (a, b) -> Integer.compare(b[1], a[1]));\n    int units = 0;\n\n    for (int[] type : boxTypes) {\n      int take = Math.min(truckSize, type[0]);\n      units += take * type[1];\n      truckSize -= take;\n      if (truckSize == 0) break;\n    }\n    return units;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maximumUnits(int[][] boxTypes, int truckSize) {\n    Arrays.sort(boxTypes, (a, b) -> Integer.compare(b[1], a[1]));\n    int units = 0;\n\n    for (int[] type : boxTypes) {\n      int take = Math.min(truckSize, type[0]);\n      units += take * type[1];\n      truckSize -= take;\n      if (truckSize == 0) break;\n    }\n    return units;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Cost to Move Chips",
      "difficulty": "Easy",
      "subpattern": "Parity class cost greedy",
      "question": "Given chip positions, moving a chip by 2 costs 0 and by 1 costs 1. Return the minimum cost to move all chips to the same position.",
      "trigger": "Only parity matters because moves by 2 are free within the same parity class.",
      "intuition": "Move the smaller parity group to the larger parity group, paying one per moved chip.",
      "edgeCases": "All same parity, one chip, equal odd and even counts, duplicate positions, large coordinates.",
      "constraints": "1 <= position.length <= 100; 1 <= position[i] <= 10^9.",
      "source": {
        "label": "Minimum Cost to Move Chips to The Same Position - LeetCode 1217",
        "url": "https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/"
      },
      "examples": [
        {
          "input": "position = [1,2,3]",
          "output": "1",
          "explanation": "Move the chip at position 2 to position 1 or 3."
        },
        {
          "input": "position = [2,2,2,3,3]",
          "output": "2",
          "explanation": "Move the two odd-position chips to an even position."
        },
        {
          "input": "position = [1,1000000000]",
          "output": "1",
          "explanation": "The positions have different parity."
        }
      ],
      "bruteForceComplexity": "Time O(n * range) when trying candidate positions; Space O(1). Directly computes cost for every chip target position.",
      "optimizedComplexity": "Time O(n); Space O(1). Count odd and even positions only.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive parity count.",
      "bruteForceCode": "class Solution {\n  public int minCostToMoveChips(int[] position) {\n    int best = Integer.MAX_VALUE;\n    for (int target : position) {\n      int cost = 0;\n      for (int chip : position) {\n        if (Math.abs(chip - target) % 2 == 1) cost++;\n      }\n      best = Math.min(best, cost);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minCostToMoveChips(int[] position) {\n    int even = 0;\n    int odd = 0;\n    for (int chip : position) {\n      if (chip % 2 == 0) even++; else odd++;\n    }\n    return Math.min(even, odd);\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minCostToMoveChips(int[] position) {\n    int[] counts = count(position, 0);\n    return Math.min(counts[0], counts[1]);\n  }\n\n  private int[] count(int[] position, int index) {\n    if (index == position.length) return new int[2];\n    int[] counts = count(position, index + 1);\n    counts[position[index] % 2]++;\n    return counts;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minCostToMoveChips(int[] position) {\n    int even = 0;\n    int odd = 0;\n    for (int chip : position) {\n      if (chip % 2 == 0) even++; else odd++;\n    }\n    return Math.min(even, odd);\n  }\n}",
      "code": "class Solution {\n  public int minCostToMoveChips(int[] position) {\n    int even = 0;\n    int odd = 0;\n    for (int chip : position) {\n      if (chip % 2 == 0) even++; else odd++;\n    }\n    return Math.min(even, odd);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Dota2 Senate",
      "difficulty": "Medium",
      "subpattern": "Cyclic queue banning greedy",
      "question": "Given a senate string of R and D senators, simulate optimal banning rounds and return which party wins.",
      "trigger": "The earliest active senator acts before later senators and should ban the earliest opposing senator.",
      "intuition": "Use queues of active indexes; the smaller index acts now and returns in the next round with index + n.",
      "edgeCases": "One senator, all same party, alternating parties, one party has early index advantage, long repeated blocks.",
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
          "explanation": "Dire survives after the first round."
        },
        {
          "input": "senate = \"RRDDD\"",
          "output": "\"Radiant\"",
          "explanation": "Early Radiant turns can remove Dire senators."
        }
      ],
      "bruteForceComplexity": "Time O(rounds * n); Space O(n). Simulate full rounds with pending bans.",
      "optimizedComplexity": "Time O(n); Space O(n). Each senator is enqueued and removed a bounded number of times.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive queue duel processes one ban per call.",
      "bruteForceCode": "class Solution {\n  public String predictPartyVictory(String senate) {\n    String current = senate;\n    while (current.indexOf('R') != -1 && current.indexOf('D') != -1) {\n      StringBuilder next = new StringBuilder();\n      int banR = 0;\n      int banD = 0;\n      for (char senator : current.toCharArray()) {\n        if (senator == 'R') {\n          if (banR > 0) banR--; else { next.append('R'); banD++; }\n        } else {\n          if (banD > 0) banD--; else { next.append('D'); banR++; }\n        }\n      }\n      current = next.toString();\n    }\n    return current.indexOf('R') != -1 ? \"Radiant\" : \"Dire\";\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    int n = senate.length();\n    for (int i = 0; i < n; i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i); else dire.offer(i);\n    }\n\n    while (!radiant.isEmpty() && !dire.isEmpty()) {\n      int r = radiant.poll();\n      int d = dire.poll();\n      if (r < d) radiant.offer(r + n); else dire.offer(d + n);\n    }\n    return radiant.isEmpty() ? \"Dire\" : \"Radiant\";\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    for (int i = 0; i < senate.length(); i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i); else dire.offer(i);\n    }\n    return fight(radiant, dire, senate.length());\n  }\n\n  private String fight(Queue<Integer> radiant, Queue<Integer> dire, int n) {\n    if (radiant.isEmpty()) return \"Dire\";\n    if (dire.isEmpty()) return \"Radiant\";\n    int r = radiant.poll();\n    int d = dire.poll();\n    if (r < d) radiant.offer(r + n); else dire.offer(d + n);\n    return fight(radiant, dire, n);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    int n = senate.length();\n    for (int i = 0; i < n; i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i); else dire.offer(i);\n    }\n\n    while (!radiant.isEmpty() && !dire.isEmpty()) {\n      int r = radiant.poll();\n      int d = dire.poll();\n      if (r < d) radiant.offer(r + n); else dire.offer(d + n);\n    }\n    return radiant.isEmpty() ? \"Dire\" : \"Radiant\";\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String predictPartyVictory(String senate) {\n    Queue<Integer> radiant = new ArrayDeque<>();\n    Queue<Integer> dire = new ArrayDeque<>();\n    int n = senate.length();\n    for (int i = 0; i < n; i++) {\n      if (senate.charAt(i) == 'R') radiant.offer(i); else dire.offer(i);\n    }\n\n    while (!radiant.isEmpty() && !dire.isEmpty()) {\n      int r = radiant.poll();\n      int d = dire.poll();\n      if (r < d) radiant.offer(r + n); else dire.offer(d + n);\n    }\n    return radiant.isEmpty() ? \"Dire\" : \"Radiant\";\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Bag of Tokens",
      "difficulty": "Medium",
      "subpattern": "Score tradeoff two-pointer greedy",
      "question": "Given token values and initial power, play tokens face up to gain score by spending power or face down to regain power by spending score. Return the maximum score.",
      "trigger": "The cheapest token is best for gaining score, and the most expensive token is best for buying back power.",
      "intuition": "Sort tokens; spend the smallest token when possible, otherwise sell the largest token if it can enable more gains.",
      "edgeCases": "No token affordable, one token, score becomes zero, all tokens affordable, selling does not improve final score.",
      "constraints": "0 <= tokens.length <= 1000; 0 <= tokens[i], power < 10000.",
      "source": {
        "label": "Bag of Tokens - LeetCode 948",
        "url": "https://leetcode.com/problems/bag-of-tokens/"
      },
      "examples": [
        {
          "input": "tokens = [100], power = 50",
          "output": "0",
          "explanation": "The only token cannot be played face up."
        },
        {
          "input": "tokens = [100,200], power = 150",
          "output": "1",
          "explanation": "Play token 100 face up."
        },
        {
          "input": "tokens = [100,200,300,400], power = 200",
          "output": "2",
          "explanation": "Trade score and power to reach score 2."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Recursively try every unused token face up or face down.",
      "optimizedComplexity": "Time O(n log n); Space O(log n) for sorting. Two pointers spend small and sell large.",
      "recursiveComplexity": "Time O(n log n + n); Space O(log n + n). Recursive two-pointer greedy after sorting.",
      "bruteForceCode": "class Solution {\n  public int bagOfTokensScore(int[] tokens, int power) {\n    return play(tokens, new boolean[tokens.length], power, 0);\n  }\n\n  private int play(int[] tokens, boolean[] used, int power, int score) {\n    int best = score;\n    for (int i = 0; i < tokens.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      if (power >= tokens[i]) best = Math.max(best, play(tokens, used, power - tokens[i], score + 1));\n      if (score > 0) best = Math.max(best, play(tokens, used, power + tokens[i], score - 1));\n      used[i] = false;\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int bagOfTokensScore(int[] tokens, int power) {\n    Arrays.sort(tokens);\n    int left = 0;\n    int right = tokens.length - 1;\n    int score = 0;\n    int best = 0;\n\n    while (left <= right) {\n      if (power >= tokens[left]) {\n        power -= tokens[left++];\n        score++;\n        best = Math.max(best, score);\n      } else if (score > 0) {\n        power += tokens[right--];\n        score--;\n      } else {\n        break;\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int bagOfTokensScore(int[] tokens, int power) {\n    Arrays.sort(tokens);\n    return play(tokens, 0, tokens.length - 1, power, 0, 0);\n  }\n\n  private int play(int[] tokens, int left, int right, int power, int score, int best) {\n    if (left > right) return best;\n    if (power >= tokens[left]) {\n      return play(tokens, left + 1, right, power - tokens[left], score + 1, Math.max(best, score + 1));\n    }\n    if (score > 0) {\n      return play(tokens, left, right - 1, power + tokens[right], score - 1, best);\n    }\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int bagOfTokensScore(int[] tokens, int power) {\n    Arrays.sort(tokens);\n    int left = 0;\n    int right = tokens.length - 1;\n    int score = 0;\n    int best = 0;\n\n    while (left <= right) {\n      if (power >= tokens[left]) {\n        power -= tokens[left++];\n        score++;\n        best = Math.max(best, score);\n      } else if (score > 0) {\n        power += tokens[right--];\n        score--;\n      } else {\n        break;\n      }\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int bagOfTokensScore(int[] tokens, int power) {\n    Arrays.sort(tokens);\n    int left = 0;\n    int right = tokens.length - 1;\n    int score = 0;\n    int best = 0;\n\n    while (left <= right) {\n      if (power >= tokens[left]) {\n        power -= tokens[left++];\n        score++;\n        best = Math.max(best, score);\n      } else if (score > 0) {\n        power += tokens[right--];\n        score--;\n      } else {\n        break;\n      }\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Advantage Shuffle",
      "difficulty": "Medium",
      "subpattern": "Ordered multiset advantage greedy",
      "question": "Given nums1 and nums2 of equal length, permute nums1 to maximize the number of indexes where nums1[i] > nums2[i].",
      "trigger": "For each opponent value, the smallest number that beats it should be used; otherwise sacrifice the smallest number.",
      "intuition": "Use an ordered multiset so every nums2 value gets either the least winning card or the least losing card.",
      "edgeCases": "No possible wins, all nums1 greater, duplicates in both arrays, equal values do not win, one element.",
      "constraints": "1 <= nums1.length <= 100000; nums2.length == nums1.length; 0 <= nums1[i], nums2[i] <= 10^9.",
      "source": {
        "label": "Advantage Shuffle - LeetCode 870",
        "url": "https://leetcode.com/problems/advantage-shuffle/"
      },
      "examples": [
        {
          "input": "nums1 = [2,7,11,15], nums2 = [1,10,4,11]",
          "output": "[2,11,7,15]",
          "explanation": "This permutation wins at every index."
        },
        {
          "input": "nums1 = [12,24,8,32], nums2 = [13,25,32,11]",
          "output": "[24,32,8,12]",
          "explanation": "Sacrifice 8 against 32 and win the other positions."
        },
        {
          "input": "nums1 = [1], nums2 = [2]",
          "output": "[1]",
          "explanation": "No winning assignment exists."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n); Space O(n). Try all permutations and keep the one with most wins.",
      "optimizedComplexity": "Time O(n log n); Space O(n). TreeMap provides the least value greater than each nums2 value.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Sort nums1 and recursively assign against nums2 values from largest to smallest.",
      "bruteForceCode": "class Solution {\n  private int[] best;\n  private int bestWins = -1;\n\n  public int[] advantageCount(int[] nums1, int[] nums2) {\n    permute(nums1, nums2, new boolean[nums1.length], new int[nums1.length], 0);\n    return best;\n  }\n\n  private void permute(int[] nums1, int[] nums2, boolean[] used, int[] path, int index) {\n    if (index == nums1.length) {\n      int wins = 0;\n      for (int i = 0; i < path.length; i++) if (path[i] > nums2[i]) wins++;\n      if (wins > bestWins) {\n        bestWins = wins;\n        best = path.clone();\n      }\n      return;\n    }\n    for (int i = 0; i < nums1.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      path[index] = nums1[i];\n      permute(nums1, nums2, used, path, index + 1);\n      used[i] = false;\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] advantageCount(int[] nums1, int[] nums2) {\n    TreeMap<Integer, Integer> multiset = new TreeMap<>();\n    for (int num : nums1) multiset.put(num, multiset.getOrDefault(num, 0) + 1);\n    int[] answer = new int[nums1.length];\n\n    for (int i = 0; i < nums2.length; i++) {\n      Integer chosen = multiset.higherKey(nums2[i]);\n      if (chosen == null) chosen = multiset.firstKey();\n      answer[i] = chosen;\n      int count = multiset.get(chosen);\n      if (count == 1) multiset.remove(chosen); else multiset.put(chosen, count - 1);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int[] advantageCount(int[] nums1, int[] nums2) {\n    Arrays.sort(nums1);\n    PriorityQueue<int[]> opponents = new PriorityQueue<>((a, b) -> b[0] - a[0]);\n    for (int i = 0; i < nums2.length; i++) opponents.offer(new int[] {nums2[i], i});\n    int[] answer = new int[nums1.length];\n    assign(nums1, opponents, 0, nums1.length - 1, answer);\n    return answer;\n  }\n\n  private void assign(int[] nums1, PriorityQueue<int[]> opponents, int low, int high, int[] answer) {\n    if (opponents.isEmpty()) return;\n    int[] current = opponents.poll();\n    if (nums1[high] > current[0]) {\n      answer[current[1]] = nums1[high];\n      assign(nums1, opponents, low, high - 1, answer);\n    } else {\n      answer[current[1]] = nums1[low];\n      assign(nums1, opponents, low + 1, high, answer);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] advantageCount(int[] nums1, int[] nums2) {\n    TreeMap<Integer, Integer> multiset = new TreeMap<>();\n    for (int num : nums1) multiset.put(num, multiset.getOrDefault(num, 0) + 1);\n    int[] answer = new int[nums1.length];\n\n    for (int i = 0; i < nums2.length; i++) {\n      Integer chosen = multiset.higherKey(nums2[i]);\n      if (chosen == null) chosen = multiset.firstKey();\n      answer[i] = chosen;\n      int count = multiset.get(chosen);\n      if (count == 1) multiset.remove(chosen); else multiset.put(chosen, count - 1);\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] advantageCount(int[] nums1, int[] nums2) {\n    TreeMap<Integer, Integer> multiset = new TreeMap<>();\n    for (int num : nums1) multiset.put(num, multiset.getOrDefault(num, 0) + 1);\n    int[] answer = new int[nums1.length];\n\n    for (int i = 0; i < nums2.length; i++) {\n      Integer chosen = multiset.higherKey(nums2[i]);\n      if (chosen == null) chosen = multiset.firstKey();\n      answer[i] = chosen;\n      int count = multiset.get(chosen);\n      if (count == 1) multiset.remove(chosen); else multiset.put(chosen, count - 1);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Number of Refueling Stops",
      "difficulty": "Hard",
      "subpattern": "Delayed max-heap choice greedy",
      "question": "Given a target distance, start fuel, and stations [position, fuel], return the minimum refueling stops needed to reach target or -1.",
      "trigger": "Among stations already passed, the best delayed refuel choice is the station with the most fuel.",
      "intuition": "Drive until fuel is insufficient, then retroactively refuel from the largest reachable station using a max-heap.",
      "edgeCases": "Start fuel reaches target, no stations, first station unreachable, exact fuel to station, need multiple delayed refuels.",
      "constraints": "1 <= target, startFuel <= 10^9; 0 <= stations.length <= 500; stations are sorted by position.",
      "source": {
        "label": "Minimum Number of Refueling Stops - LeetCode 871",
        "url": "https://leetcode.com/problems/minimum-number-of-refueling-stops/"
      },
      "examples": [
        {
          "input": "target = 1, startFuel = 1, stations = []",
          "output": "0",
          "explanation": "The car already reaches the target."
        },
        {
          "input": "target = 100, startFuel = 1, stations = [[10,100]]",
          "output": "-1",
          "explanation": "The first station is unreachable."
        },
        {
          "input": "target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]",
          "output": "2",
          "explanation": "Refuel at the best reachable stations."
        }
      ],
      "bruteForceComplexity": "Time O(2^stations); Space O(stations). Recursively choose whether to refuel at each reachable station.",
      "optimizedComplexity": "Time O(stations log stations); Space O(stations). Max-heap stores reachable fuel choices until needed.",
      "recursiveComplexity": "Time O(stations * reachableFuelStates); Space O(states). Memoized recursion stores station index and reachable distance.",
      "bruteForceCode": "class Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    int answer = dfs(target, stations, 0, startFuel);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int dfs(int target, int[][] stations, int index, long fuelReach) {\n    if (fuelReach >= target) return 0;\n    if (index == stations.length || stations[index][0] > fuelReach) return 1_000_000;\n    int skip = dfs(target, stations, index + 1, fuelReach);\n    int take = 1 + dfs(target, stations, index + 1, fuelReach + stations[index][1]);\n    return Math.min(skip, take);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    PriorityQueue<Integer> fuels = new PriorityQueue<>(Collections.reverseOrder());\n    long reach = startFuel;\n    int stops = 0;\n    int index = 0;\n\n    while (reach < target) {\n      while (index < stations.length && stations[index][0] <= reach) {\n        fuels.offer(stations[index][1]);\n        index++;\n      }\n      if (fuels.isEmpty()) return -1;\n      reach += fuels.poll();\n      stops++;\n    }\n    return stops;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    Map<String, Integer> memo = new HashMap<>();\n    int answer = dp(target, stations, 0, startFuel, memo);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int dp(int target, int[][] stations, int index, long reach, Map<String, Integer> memo) {\n    if (reach >= target) return 0;\n    if (index == stations.length || stations[index][0] > reach) return 1_000_000;\n    String key = index + \":\" + reach;\n    if (memo.containsKey(key)) return memo.get(key);\n    int skip = dp(target, stations, index + 1, reach, memo);\n    int take = 1 + dp(target, stations, index + 1, reach + stations[index][1], memo);\n    int best = Math.min(skip, take);\n    memo.put(key, best);\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    PriorityQueue<Integer> fuels = new PriorityQueue<>(Collections.reverseOrder());\n    long reach = startFuel;\n    int stops = 0;\n    int index = 0;\n\n    while (reach < target) {\n      while (index < stations.length && stations[index][0] <= reach) {\n        fuels.offer(stations[index][1]);\n        index++;\n      }\n      if (fuels.isEmpty()) return -1;\n      reach += fuels.poll();\n      stops++;\n    }\n    return stops;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int minRefuelStops(int target, int startFuel, int[][] stations) {\n    PriorityQueue<Integer> fuels = new PriorityQueue<>(Collections.reverseOrder());\n    long reach = startFuel;\n    int stops = 0;\n    int index = 0;\n\n    while (reach < target) {\n      while (index < stations.length && stations[index][0] <= reach) {\n        fuels.offer(stations[index][1]);\n        index++;\n      }\n      if (fuels.isEmpty()) return -1;\n      reach += fuels.poll();\n      stops++;\n    }\n    return stops;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Course Schedule III",
      "difficulty": "Hard",
      "subpattern": "Deadline scheduling with max-heap",
      "question": "Given courses [duration, lastDay], return the maximum number of courses that can be taken if each course must finish by its last day.",
      "trigger": "When total time exceeds the current deadline, dropping the longest selected course frees the most time while losing one course.",
      "intuition": "Sort by deadline, keep selected durations in a max-heap, and replace/remove the longest course whenever needed.",
      "edgeCases": "Course duration exceeds its deadline, same deadlines, all courses fit, replacement improves count, one course.",
      "constraints": "1 <= courses.length <= 10000; 1 <= duration, lastDay <= 10000.",
      "source": {
        "label": "Course Schedule III - LeetCode 630",
        "url": "https://leetcode.com/problems/course-schedule-iii/"
      },
      "examples": [
        {
          "input": "courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]",
          "output": "3",
          "explanation": "Three courses can be scheduled before their deadlines."
        },
        {
          "input": "courses = [[1,2]]",
          "output": "1",
          "explanation": "The only course fits."
        },
        {
          "input": "courses = [[3,2],[4,3]]",
          "output": "0",
          "explanation": "Neither course can finish by its deadline."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Recursively choose or skip courses after sorting by deadline.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Max-heap removes the longest selected course when deadlines break.",
      "recursiveComplexity": "Time O(n * totalTimeStates); Space O(states). Memoized recursion stores index and current time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int scheduleCourse(int[][] courses) {\n    Arrays.sort(courses, (a, b) -> Integer.compare(a[1], b[1]));\n    return choose(courses, 0, 0);\n  }\n\n  private int choose(int[][] courses, int index, int time) {\n    if (index == courses.length) return 0;\n    int skip = choose(courses, index + 1, time);\n    int take = 0;\n    if (time + courses[index][0] <= courses[index][1]) {\n      take = 1 + choose(courses, index + 1, time + courses[index][0]);\n    }\n    return Math.max(skip, take);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int scheduleCourse(int[][] courses) {\n    Arrays.sort(courses, (a, b) -> Integer.compare(a[1], b[1]));\n    PriorityQueue<Integer> durations = new PriorityQueue<>(Collections.reverseOrder());\n    int time = 0;\n\n    for (int[] course : courses) {\n      time += course[0];\n      durations.offer(course[0]);\n      if (time > course[1]) time -= durations.poll();\n    }\n    return durations.size();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int scheduleCourse(int[][] courses) {\n    Arrays.sort(courses, (a, b) -> Integer.compare(a[1], b[1]));\n    return dp(courses, 0, 0, new HashMap<>());\n  }\n\n  private int dp(int[][] courses, int index, int time, Map<String, Integer> memo) {\n    if (index == courses.length) return 0;\n    String key = index + \":\" + time;\n    if (memo.containsKey(key)) return memo.get(key);\n    int best = dp(courses, index + 1, time, memo);\n    if (time + courses[index][0] <= courses[index][1]) {\n      best = Math.max(best, 1 + dp(courses, index + 1, time + courses[index][0], memo));\n    }\n    memo.put(key, best);\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int scheduleCourse(int[][] courses) {\n    Arrays.sort(courses, (a, b) -> Integer.compare(a[1], b[1]));\n    PriorityQueue<Integer> durations = new PriorityQueue<>(Collections.reverseOrder());\n    int time = 0;\n\n    for (int[] course : courses) {\n      time += course[0];\n      durations.offer(course[0]);\n      if (time > course[1]) time -= durations.poll();\n    }\n    return durations.size();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int scheduleCourse(int[][] courses) {\n    Arrays.sort(courses, (a, b) -> Integer.compare(a[1], b[1]));\n    PriorityQueue<Integer> durations = new PriorityQueue<>(Collections.reverseOrder());\n    int time = 0;\n\n    for (int[] course : courses) {\n      time += course[0];\n      durations.offer(course[0]);\n      if (time > course[1]) time -= durations.poll();\n    }\n    return durations.size();\n  }\n}"
    }
  ],
  "checklist": [
    "A local choice can be made final after sorting, scanning, or choosing from a heap.",
    "The problem asks for minimum removals, maximum count, earliest finish, reachability, or best schedule under simple constraints.",
    "A failed prefix/range proves earlier candidates cannot work, so the state can reset or advance.",
    "Only a compact frontier matters: farthest reach, current interval end, lowest tails, open-count range, or selected durations.",
    "An exchange argument is visible: replacing a worse local choice with the greedy choice never reduces future options."
  ],
  "traps": [
    "Sorting by the wrong field: interval problems often need end time, not start time.",
    "Counting touching intervals as overlapping when the problem allows end == start.",
    "Using greedy where future choices have hidden state and DP is required.",
    "For heap greedy, pushing unavailable choices before they are reachable.",
    "For monotonic stack greedy, forgetting to remove remaining digits after the scan.",
    "For wildcard ranges, letting the minimum open count go negative.",
    "Assuming recursive brute force is acceptable for constraints; it is only for understanding the decision tree."
  ],
  "edgeCases": [
    "Single element or already-complete input.",
    "All values equal or all values strictly increasing/decreasing.",
    "Zero capacity, zero cooldown, zero removals, or target already reached.",
    "Duplicate frequencies, duplicate intervals, duplicate card values, and equal sorting keys.",
    "Boundary intervals that just touch at endpoints.",
    "Impossible first step such as unreachable first station or first customer needing change.",
    "Large values requiring long comparison or avoiding subtraction overflow in comparators."
  ],
  "complexities": [
    "Sort-and-scan greedy usually costs O(n log n) time and O(log n) to O(n) space depending on output/helper structures.",
    "Pure frontier scans such as Jump Game, Gas Station, Kadane, and Stock II are O(n) time and O(1) space.",
    "Heap greedy usually costs O(n log n) or O(n log k) time and O(n) or O(k) space.",
    "Frequency greedy over fixed alphabets is O(n + alphabet) time and often O(alphabet) space.",
    "Monotonic stack greedy is O(n) time because each item is pushed and popped at most once.",
    "Brute force tabs are commonly exponential and are included to expose the choice tree before the greedy proof.",
    "Recursive greedy versions add call-stack space even when their decision logic matches the optimized scan."
  ],
  "mentalModel": [
    "State the greedy choice and the proof reason before coding: earliest finish, farthest reach, largest available, or smallest sacrifice.",
    "Sort only when ordering makes choices final; otherwise use a heap or a running frontier.",
    "When stuck, ask what information from the past can still affect the future and discard everything else.",
    "For exchange arguments, compare the greedy choice with any alternative and show the alternative can be swapped without harm.",
    "If the local choice can be invalidated by a later hidden dependency, switch to DP or backtracking."
  ],
  "revisionStrategy": [
    "Day 1: redo Assign Cookies, Lemonade Change, Jump Game, Gas Station, and Non-overlapping Intervals with the trigger sentence first.",
    "Day 2: redo Candy, Queue Reconstruction, Arrows, Partition Labels, and Task Scheduler while explaining the exchange argument.",
    "Day 4: redo Reorganize String, Hand of Straights, Boats, Two City, and Increasing Triplet from memory.",
    "Day 7: redo Remove K Digits, Bag of Tokens, Refueling Stops, and Course Schedule III with brute force first, then greedy.",
    "Before interviews: mix five unseen problems and classify the greedy proof type in under 30 seconds."
  ],
  "unseen": [
    "Given meeting requests with start/end/profit, choose the maximum number of non-overlapping requests.",
    "Given battery packs and devices, decide the farthest time all devices can run by swapping packs.",
    "Given a string and repeat limit, build the lexicographically largest valid string.",
    "Given checkpoints and optional boosts, reach the finish using the fewest boosts.",
    "Given jobs with deadlines and penalties, minimize total penalty for late jobs."
  ]
};
