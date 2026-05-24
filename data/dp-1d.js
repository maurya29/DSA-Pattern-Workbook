const CURRENT_PATTERN = {
  "id": "dp-1d",
  "name": "1D Dynamic Programming",
  "summary": "Linear state transitions, take/skip decisions, counting ways, sequence DP, and space-optimized recurrences.",
  "complete": true,
  "subpatterns": [
    "Fibonacci-style linear recurrence",
    "Min-cost recurrence over previous steps",
    "Take-or-skip recurrence on a line",
    "Circular take-or-skip split into two lines",
    "Decode/count ways with one-step and two-step transitions",
    "Unbounded knapsack minimum coins",
    "Unbounded knapsack counting combinations",
    "Ordered composition counting",
    "Longest increasing subsequence DP and patience sorting",
    "Difference-indexed sequence DP",
    "Subset-sum boolean DP",
    "String segmentation DP",
    "State machine DP for stock problems",
    "Kadane-style running-state DP",
    "Interval-free path/jump reachability DP"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Climbing Stairs",
      "difficulty": "Easy",
      "subpattern": "Fibonacci-style linear recurrence",
      "question": "Given n stairs, you can climb either 1 or 2 steps at a time. Return the number of distinct ways to reach the top.",
      "trigger": "Ways to reach step i depend only on the previous two step counts: i - 1 and i - 2.",
      "intuition": "The final move is either one step from i - 1 or two steps from i - 2, so add both counts.",
      "edgeCases": "n = 1, n = 2, small base cases, large n where naive recursion repeats states.",
      "constraints": "1 <= n <= 45.",
      "source": {
        "label": "Climbing Stairs - LeetCode 70",
        "url": "https://leetcode.com/problems/climbing-stairs/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "2",
          "explanation": "The ways are 1+1 and 2."
        },
        {
          "input": "n = 3",
          "output": "3",
          "explanation": "The ways are 1+1+1, 1+2, and 2+1."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "Only one single-step climb is possible."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion recomputes the same step counts many times.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps only the previous two counts.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes each step count once.",
      "bruteForceCode": "class Solution {\n  public int climbStairs(int n) {\n    return countWays(0, n);\n  }\n\n  private int countWays(int step, int target) {\n    if (step == target) return 1;\n    if (step > target) return 0;\n\n    int oneStep = countWays(step + 1, target);\n    int twoSteps = countWays(step + 2, target);\n    return oneStep + twoSteps;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int climbStairs(int n) {\n    if (n <= 2) return n;\n\n    int twoBack = 1;\n    int oneBack = 2;\n    for (int step = 3; step <= n; step++) {\n      int current = oneBack + twoBack;\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int climbStairs(int n) {\n    int[] memo = new int[n + 1];\n    return ways(n, memo);\n  }\n\n  private int ways(int step, int[] memo) {\n    if (step <= 2) return step;\n    if (memo[step] != 0) return memo[step];\n    memo[step] = ways(step - 1, memo) + ways(step - 2, memo);\n    return memo[step];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int climbStairs(int n) {\n    if (n <= 2) return n;\n\n    int twoBack = 1;\n    int oneBack = 2;\n    for (int step = 3; step <= n; step++) {\n      int current = oneBack + twoBack;\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "code": "class Solution {\n  public int climbStairs(int n) {\n    if (n <= 2) return n;\n\n    int twoBack = 1;\n    int oneBack = 2;\n    for (int step = 3; step <= n; step++) {\n      int current = oneBack + twoBack;\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Min Cost Climbing Stairs",
      "difficulty": "Easy",
      "subpattern": "Min-cost recurrence over previous steps",
      "question": "Given cost[i] for stepping on stair i, return the minimum cost to reach the top when you may climb 1 or 2 steps each move.",
      "trigger": "Minimum cost to stand on the next position depends on the cheaper of the previous one or two positions.",
      "intuition": "To reach position i, pay nothing at the top and choose the cheaper path from i - 1 or i - 2.",
      "edgeCases": "Two stairs, equal costs, all high costs, alternating cheap costs, top is beyond the last index.",
      "constraints": "2 <= cost.length <= 1000; 0 <= cost[i] <= 999.",
      "source": {
        "label": "Min Cost Climbing Stairs - LeetCode 746",
        "url": "https://leetcode.com/problems/min-cost-climbing-stairs/"
      },
      "examples": [
        {
          "input": "cost = [10,15,20]",
          "output": "15",
          "explanation": "Start at index 1 and move directly to the top."
        },
        {
          "input": "cost = [1,100,1,1,1,100,1,1,100,1]",
          "output": "6",
          "explanation": "The optimal path uses the cheap stairs."
        },
        {
          "input": "cost = [0,0]",
          "output": "0",
          "explanation": "Start at either stair and reach the top for free."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion branches from each position.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps the best cost for the previous two positions.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion solves each position once.",
      "bruteForceCode": "class Solution {\n  public int minCostClimbingStairs(int[] cost) {\n    return Math.min(pay(cost, 0), pay(cost, 1));\n  }\n\n  private int pay(int[] cost, int index) {\n    if (index >= cost.length) return 0;\n    return cost[index] + Math.min(pay(cost, index + 1), pay(cost, index + 2));\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minCostClimbingStairs(int[] cost) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int i = 2; i <= cost.length; i++) {\n      int current = Math.min(oneBack + cost[i - 1], twoBack + cost[i - 2]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minCostClimbingStairs(int[] cost) {\n    int[] memo = new int[cost.length];\n    Arrays.fill(memo, -1);\n    return Math.min(dp(cost, 0, memo), dp(cost, 1, memo));\n  }\n\n  private int dp(int[] cost, int index, int[] memo) {\n    if (index >= cost.length) return 0;\n    if (memo[index] != -1) return memo[index];\n    memo[index] = cost[index] + Math.min(dp(cost, index + 1, memo), dp(cost, index + 2, memo));\n    return memo[index];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minCostClimbingStairs(int[] cost) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int i = 2; i <= cost.length; i++) {\n      int current = Math.min(oneBack + cost[i - 1], twoBack + cost[i - 2]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "code": "class Solution {\n  public int minCostClimbingStairs(int[] cost) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int i = 2; i <= cost.length; i++) {\n      int current = Math.min(oneBack + cost[i - 1], twoBack + cost[i - 2]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}"
    },
    {
      "group": "core",
      "name": "House Robber",
      "difficulty": "Medium",
      "subpattern": "Take-or-skip recurrence on a line",
      "question": "Given money in houses along a street, return the maximum amount you can rob without robbing adjacent houses.",
      "trigger": "At each house, the decision is take it and skip the previous house, or skip it and keep the previous best.",
      "intuition": "best[i] = max(best[i - 1], best[i - 2] + nums[i]).",
      "edgeCases": "Empty array if allowed, one house, two houses, all zeros, alternating high values.",
      "constraints": "1 <= nums.length <= 100; 0 <= nums[i] <= 400.",
      "source": {
        "label": "House Robber - LeetCode 198",
        "url": "https://leetcode.com/problems/house-robber/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,1]",
          "output": "4",
          "explanation": "Rob houses with values 1 and 3."
        },
        {
          "input": "nums = [2,7,9,3,1]",
          "output": "12",
          "explanation": "Rob 2, 9, and 1."
        },
        {
          "input": "nums = [5]",
          "output": "5",
          "explanation": "Only one house is available."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion branches on rob or skip.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps take/skip best values.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes each starting index once.",
      "bruteForceCode": "class Solution {\n  public int rob(int[] nums) {\n    return choose(nums, 0);\n  }\n\n  private int choose(int[] nums, int index) {\n    if (index >= nums.length) return 0;\n    int take = nums[index] + choose(nums, index + 2);\n    int skip = choose(nums, index + 1);\n    return Math.max(take, skip);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int rob(int[] nums) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int money : nums) {\n      int current = Math.max(oneBack, twoBack + money);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int rob(int[] nums) {\n    int[] memo = new int[nums.length];\n    Arrays.fill(memo, -1);\n    return dp(nums, 0, memo);\n  }\n\n  private int dp(int[] nums, int index, int[] memo) {\n    if (index >= nums.length) return 0;\n    if (memo[index] != -1) return memo[index];\n    int take = nums[index] + dp(nums, index + 2, memo);\n    int skip = dp(nums, index + 1, memo);\n    memo[index] = Math.max(take, skip);\n    return memo[index];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int rob(int[] nums) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int money : nums) {\n      int current = Math.max(oneBack, twoBack + money);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "code": "class Solution {\n  public int rob(int[] nums) {\n    int twoBack = 0;\n    int oneBack = 0;\n\n    for (int money : nums) {\n      int current = Math.max(oneBack, twoBack + money);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}"
    },
    {
      "group": "core",
      "name": "House Robber II",
      "difficulty": "Medium",
      "subpattern": "Circular take-or-skip split into two lines",
      "question": "Given money in houses arranged in a circle, return the maximum amount you can rob without robbing adjacent houses.",
      "trigger": "First and last houses are adjacent, so the linear robber recurrence must be run on two excluded ranges.",
      "intuition": "Either exclude the first house or exclude the last house; take the better linear robber result.",
      "edgeCases": "One house, two houses, first and last both large, all zeros, circular adjacency conflict.",
      "constraints": "1 <= nums.length <= 100; 0 <= nums[i] <= 1000.",
      "source": {
        "label": "House Robber II - LeetCode 213",
        "url": "https://leetcode.com/problems/house-robber-ii/"
      },
      "examples": [
        {
          "input": "nums = [2,3,2]",
          "output": "3",
          "explanation": "Rob only the middle house."
        },
        {
          "input": "nums = [1,2,3,1]",
          "output": "4",
          "explanation": "Rob houses with values 1 and 3 without touching both ends."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "Only one house exists."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Explore take/skip while carrying whether the first house was robbed.",
      "optimizedComplexity": "Time O(n); Space O(1). Run linear robber twice over two ranges.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion solves each range once.",
      "bruteForceCode": "class Solution {\n  public int rob(int[] nums) {\n    if (nums.length == 1) return nums[0];\n    return Math.max(search(nums, 0, nums.length - 2), search(nums, 1, nums.length - 1));\n  }\n\n  private int search(int[] nums, int index, int end) {\n    if (index > end) return 0;\n    int take = nums[index] + search(nums, index + 2, end);\n    int skip = search(nums, index + 1, end);\n    return Math.max(take, skip);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int rob(int[] nums) {\n    if (nums.length == 1) return nums[0];\n    return Math.max(robLine(nums, 0, nums.length - 2), robLine(nums, 1, nums.length - 1));\n  }\n\n  private int robLine(int[] nums, int start, int end) {\n    int twoBack = 0;\n    int oneBack = 0;\n    for (int i = start; i <= end; i++) {\n      int current = Math.max(oneBack, twoBack + nums[i]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int rob(int[] nums) {\n    if (nums.length == 1) return nums[0];\n    int[] leftMemo = new int[nums.length];\n    int[] rightMemo = new int[nums.length];\n    Arrays.fill(leftMemo, -1);\n    Arrays.fill(rightMemo, -1);\n    return Math.max(dp(nums, 0, nums.length - 2, leftMemo), dp(nums, 1, nums.length - 1, rightMemo));\n  }\n\n  private int dp(int[] nums, int index, int end, int[] memo) {\n    if (index > end) return 0;\n    if (memo[index] != -1) return memo[index];\n    memo[index] = Math.max(nums[index] + dp(nums, index + 2, end, memo), dp(nums, index + 1, end, memo));\n    return memo[index];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int rob(int[] nums) {\n    if (nums.length == 1) return nums[0];\n    return Math.max(robLine(nums, 0, nums.length - 2), robLine(nums, 1, nums.length - 1));\n  }\n\n  private int robLine(int[] nums, int start, int end) {\n    int twoBack = 0;\n    int oneBack = 0;\n    for (int i = start; i <= end; i++) {\n      int current = Math.max(oneBack, twoBack + nums[i]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "code": "class Solution {\n  public int rob(int[] nums) {\n    if (nums.length == 1) return nums[0];\n    return Math.max(robLine(nums, 0, nums.length - 2), robLine(nums, 1, nums.length - 1));\n  }\n\n  private int robLine(int[] nums, int start, int end) {\n    int twoBack = 0;\n    int oneBack = 0;\n    for (int i = start; i <= end; i++) {\n      int current = Math.max(oneBack, twoBack + nums[i]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Decode Ways",
      "difficulty": "Medium",
      "subpattern": "Decode/count ways with one-step and two-step transitions",
      "question": "Given a digit string where A-Z maps to 1-26, return the number of valid decodings.",
      "trigger": "Ways at index i depend on whether one digit and two digit choices form valid letters.",
      "intuition": "A nonzero single digit can stand alone; a valid 10-26 pair can be decoded together.",
      "edgeCases": "Leading zero, isolated zero, 10 and 20 valid, 30 invalid, empty suffix, long repeated ones.",
      "constraints": "1 <= s.length <= 100; s contains only digits and may contain leading zero.",
      "source": {
        "label": "Decode Ways - LeetCode 91",
        "url": "https://leetcode.com/problems/decode-ways/"
      },
      "examples": [
        {
          "input": "s = \"12\"",
          "output": "2",
          "explanation": "12 can be AB or L."
        },
        {
          "input": "s = \"226\"",
          "output": "3",
          "explanation": "It can be BZ, VF, or BBF."
        },
        {
          "input": "s = \"06\"",
          "output": "0",
          "explanation": "A code cannot start with zero."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion branches on one-digit and two-digit choices.",
      "optimizedComplexity": "Time O(n); Space O(1). Iterative DP keeps ways for the next one and next two positions.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes each index once.",
      "bruteForceCode": "class Solution {\n  public int numDecodings(String s) {\n    return count(s, 0);\n  }\n\n  private int count(String s, int index) {\n    if (index == s.length()) return 1;\n    if (s.charAt(index) == '0') return 0;\n    int ways = count(s, index + 1);\n    if (index + 1 < s.length()) {\n      int value = Integer.parseInt(s.substring(index, index + 2));\n      if (value <= 26) ways += count(s, index + 2);\n    }\n    return ways;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numDecodings(String s) {\n    int next = 1;\n    int nextNext = 0;\n\n    for (int i = s.length() - 1; i >= 0; i--) {\n      int current = 0;\n      if (s.charAt(i) != '0') {\n        current = next;\n        if (i + 1 < s.length()) {\n          int value = (s.charAt(i) - '0') * 10 + (s.charAt(i + 1) - '0');\n          if (value <= 26) current += nextNext;\n        }\n      }\n      nextNext = next;\n      next = current;\n    }\n    return next;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numDecodings(String s) {\n    int[] memo = new int[s.length()];\n    Arrays.fill(memo, -1);\n    return dp(s, 0, memo);\n  }\n\n  private int dp(String s, int index, int[] memo) {\n    if (index == s.length()) return 1;\n    if (s.charAt(index) == '0') return 0;\n    if (memo[index] != -1) return memo[index];\n\n    int ways = dp(s, index + 1, memo);\n    if (index + 1 < s.length()) {\n      int value = (s.charAt(index) - '0') * 10 + (s.charAt(index + 1) - '0');\n      if (value <= 26) ways += dp(s, index + 2, memo);\n    }\n    memo[index] = ways;\n    return ways;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numDecodings(String s) {\n    int next = 1;\n    int nextNext = 0;\n\n    for (int i = s.length() - 1; i >= 0; i--) {\n      int current = 0;\n      if (s.charAt(i) != '0') {\n        current = next;\n        if (i + 1 < s.length()) {\n          int value = (s.charAt(i) - '0') * 10 + (s.charAt(i + 1) - '0');\n          if (value <= 26) current += nextNext;\n        }\n      }\n      nextNext = next;\n      next = current;\n    }\n    return next;\n  }\n}",
      "code": "class Solution {\n  public int numDecodings(String s) {\n    int next = 1;\n    int nextNext = 0;\n\n    for (int i = s.length() - 1; i >= 0; i--) {\n      int current = 0;\n      if (s.charAt(i) != '0') {\n        current = next;\n        if (i + 1 < s.length()) {\n          int value = (s.charAt(i) - '0') * 10 + (s.charAt(i + 1) - '0');\n          if (value <= 26) current += nextNext;\n        }\n      }\n      nextNext = next;\n      next = current;\n    }\n    return next;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Coin Change",
      "difficulty": "Medium",
      "subpattern": "Unbounded knapsack minimum coins",
      "question": "Given coin denominations and an amount, return the fewest number of coins needed to make that amount, or -1 if impossible.",
      "trigger": "The best answer for amount x can reuse any coin and depends on best answers for x - coin.",
      "intuition": "For each amount, try taking one last coin and minimize 1 + dp[amount - coin].",
      "edgeCases": "Amount zero, impossible amount, coin greater than amount, coin value one, duplicate denominations.",
      "constraints": "1 <= coins.length <= 12; 1 <= coins[i] <= 2^31 - 1; 0 <= amount <= 10000.",
      "source": {
        "label": "Coin Change - LeetCode 322",
        "url": "https://leetcode.com/problems/coin-change/"
      },
      "examples": [
        {
          "input": "coins = [1,2,5], amount = 11",
          "output": "3",
          "explanation": "11 = 5 + 5 + 1."
        },
        {
          "input": "coins = [2], amount = 3",
          "output": "-1",
          "explanation": "No combination of 2-value coins makes 3."
        },
        {
          "input": "coins = [1], amount = 0",
          "output": "0",
          "explanation": "No coins are needed for amount zero."
        }
      ],
      "bruteForceComplexity": "Time O(coins^amount) in the worst case; Space O(amount). Plain recursion tries every coin at every remaining amount.",
      "optimizedComplexity": "Time O(amount * coins.length); Space O(amount). Bottom-up DP computes minimum coins for every amount.",
      "recursiveComplexity": "Time O(amount * coins.length); Space O(amount). Memoized recursion solves each remaining amount once.",
      "bruteForceCode": "class Solution {\n  public int coinChange(int[] coins, int amount) {\n    int answer = search(coins, amount);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int search(int[] coins, int amount) {\n    if (amount == 0) return 0;\n    if (amount < 0) return 1_000_000;\n    int best = 1_000_000;\n    for (int coin : coins) {\n      best = Math.min(best, 1 + search(coins, amount - coin));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value <= amount; value++) {\n      for (int coin : coins) {\n        if (coin <= value) {\n          dp[value] = Math.min(dp[value], dp[value - coin] + 1);\n        }\n      }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] memo = new int[amount + 1];\n    Arrays.fill(memo, -2);\n    int answer = dp(coins, amount, memo);\n    return answer >= 1_000_000 ? -1 : answer;\n  }\n\n  private int dp(int[] coins, int amount, int[] memo) {\n    if (amount == 0) return 0;\n    if (amount < 0) return 1_000_000;\n    if (memo[amount] != -2) return memo[amount];\n    int best = 1_000_000;\n    for (int coin : coins) best = Math.min(best, 1 + dp(coins, amount - coin, memo));\n    memo[amount] = best;\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value <= amount; value++) {\n      for (int coin : coins) {\n        if (coin <= value) {\n          dp[value] = Math.min(dp[value], dp[value - coin] + 1);\n        }\n      }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value <= amount; value++) {\n      for (int coin : coins) {\n        if (coin <= value) {\n          dp[value] = Math.min(dp[value], dp[value - coin] + 1);\n        }\n      }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Coin Change II",
      "difficulty": "Medium",
      "subpattern": "Unbounded knapsack counting combinations",
      "question": "Given coin denominations and an amount, return the number of combinations that make up the amount. Each coin may be used unlimited times.",
      "trigger": "Combination counting must avoid order duplicates, so coins are processed one denomination at a time.",
      "intuition": "For each coin, update ways[value] by adding ways[value - coin].",
      "edgeCases": "Amount zero, no combination, one coin type, coin larger than amount, combinations not permutations.",
      "constraints": "1 <= coins.length <= 300; 0 <= amount <= 5000; answer fits in signed 32-bit integer.",
      "source": {
        "label": "Coin Change II - LeetCode 518",
        "url": "https://leetcode.com/problems/coin-change-ii/"
      },
      "examples": [
        {
          "input": "amount = 5, coins = [1,2,5]",
          "output": "4",
          "explanation": "The combinations are 5, 2+2+1, 2+1+1+1, and five ones."
        },
        {
          "input": "amount = 3, coins = [2]",
          "output": "0",
          "explanation": "Coin 2 cannot make amount 3."
        },
        {
          "input": "amount = 0, coins = [7]",
          "output": "1",
          "explanation": "The empty combination makes amount zero."
        }
      ],
      "bruteForceComplexity": "Time exponential in amount; Space O(amount). Plain recursion chooses how many of each coin to use.",
      "optimizedComplexity": "Time O(amount * coins.length); Space O(amount). 1D DP counts combinations by coin order.",
      "recursiveComplexity": "Time O(amount * coins.length); Space O(amount * coins.length). Memoized recursion uses coin index and remaining amount.",
      "bruteForceCode": "class Solution {\n  public int change(int amount, int[] coins) {\n    return count(coins, 0, amount);\n  }\n\n  private int count(int[] coins, int index, int amount) {\n    if (amount == 0) return 1;\n    if (index == coins.length) return 0;\n    int ways = 0;\n    for (int used = 0; used * coins[index] <= amount; used++) {\n      ways += count(coins, index + 1, amount - used * coins[index]);\n    }\n    return ways;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n\n    for (int coin : coins) {\n      for (int value = coin; value <= amount; value++) {\n        dp[value] += dp[value - coin];\n      }\n    }\n    return dp[amount];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int change(int amount, int[] coins) {\n    int[][] memo = new int[coins.length + 1][amount + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(coins, 0, amount, memo);\n  }\n\n  private int dp(int[] coins, int index, int amount, int[][] memo) {\n    if (amount == 0) return 1;\n    if (index == coins.length) return 0;\n    if (memo[index][amount] != -1) return memo[index][amount];\n    int skip = dp(coins, index + 1, amount, memo);\n    int take = amount >= coins[index] ? dp(coins, index, amount - coins[index], memo) : 0;\n    memo[index][amount] = skip + take;\n    return memo[index][amount];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n\n    for (int coin : coins) {\n      for (int value = coin; value <= amount; value++) {\n        dp[value] += dp[value - coin];\n      }\n    }\n    return dp[amount];\n  }\n}",
      "code": "class Solution {\n  public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n\n    for (int coin : coins) {\n      for (int value = coin; value <= amount; value++) {\n        dp[value] += dp[value - coin];\n      }\n    }\n    return dp[amount];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum IV",
      "difficulty": "Medium",
      "subpattern": "Ordered composition counting",
      "question": "Given distinct positive nums and target, return the number of ordered combinations that sum to target.",
      "trigger": "Order matters, so the recurrence counts all possible last choices for each target value.",
      "intuition": "For each total, append every number as the last element and add ways[total - num].",
      "edgeCases": "Target zero, no combination, nums larger than target, order-sensitive examples, large count within int.",
      "constraints": "1 <= nums.length <= 200; 1 <= nums[i] <= 1000; 1 <= target <= 1000; answer fits in 32-bit integer.",
      "source": {
        "label": "Combination Sum IV - LeetCode 377",
        "url": "https://leetcode.com/problems/combination-sum-iv/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3], target = 4",
          "output": "7",
          "explanation": "Different orders are counted separately."
        },
        {
          "input": "nums = [9], target = 3",
          "output": "0",
          "explanation": "9 cannot contribute to target 3."
        },
        {
          "input": "nums = [1], target = 2",
          "output": "1",
          "explanation": "The only sequence is 1,1."
        }
      ],
      "bruteForceComplexity": "Time O(nums.length^target); Space O(target). Plain recursion tries every next number.",
      "optimizedComplexity": "Time O(target * nums.length); Space O(target). Bottom-up DP counts ordered totals.",
      "recursiveComplexity": "Time O(target * nums.length); Space O(target). Memoized recursion solves each remaining target once.",
      "bruteForceCode": "class Solution {\n  public int combinationSum4(int[] nums, int target) {\n    if (target == 0) return 1;\n    int ways = 0;\n    for (int num : nums) {\n      if (num <= target) ways += combinationSum4(nums, target - num);\n    }\n    return ways;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int combinationSum4(int[] nums, int target) {\n    int[] dp = new int[target + 1];\n    dp[0] = 1;\n\n    for (int total = 1; total <= target; total++) {\n      for (int num : nums) {\n        if (num <= total) dp[total] += dp[total - num];\n      }\n    }\n    return dp[target];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int combinationSum4(int[] nums, int target) {\n    int[] memo = new int[target + 1];\n    Arrays.fill(memo, -1);\n    return dp(nums, target, memo);\n  }\n\n  private int dp(int[] nums, int target, int[] memo) {\n    if (target == 0) return 1;\n    if (memo[target] != -1) return memo[target];\n    int ways = 0;\n    for (int num : nums) {\n      if (num <= target) ways += dp(nums, target - num, memo);\n    }\n    memo[target] = ways;\n    return ways;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int combinationSum4(int[] nums, int target) {\n    int[] dp = new int[target + 1];\n    dp[0] = 1;\n\n    for (int total = 1; total <= target; total++) {\n      for (int num : nums) {\n        if (num <= total) dp[total] += dp[total - num];\n      }\n    }\n    return dp[target];\n  }\n}",
      "code": "class Solution {\n  public int combinationSum4(int[] nums, int target) {\n    int[] dp = new int[target + 1];\n    dp[0] = 1;\n\n    for (int total = 1; total <= target; total++) {\n      for (int num : nums) {\n        if (num <= total) dp[total] += dp[total - num];\n      }\n    }\n    return dp[target];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Increasing Subsequence",
      "difficulty": "Medium",
      "subpattern": "Longest increasing subsequence DP and patience sorting",
      "question": "Given an integer array, return the length of the longest strictly increasing subsequence.",
      "trigger": "The best subsequence ending at i depends on previous smaller values, and can be optimized with sorted tails.",
      "intuition": "Maintain tails[len] as the smallest possible tail value for an increasing subsequence of length len + 1.",
      "edgeCases": "Strictly increasing, strictly decreasing, duplicates, one element, negative numbers.",
      "constraints": "1 <= nums.length <= 2500; -10000 <= nums[i] <= 10000.",
      "source": {
        "label": "Longest Increasing Subsequence - LeetCode 300",
        "url": "https://leetcode.com/problems/longest-increasing-subsequence/"
      },
      "examples": [
        {
          "input": "nums = [10,9,2,5,3,7,101,18]",
          "output": "4",
          "explanation": "One LIS is 2,3,7,101."
        },
        {
          "input": "nums = [0,1,0,3,2,3]",
          "output": "4",
          "explanation": "One LIS is 0,1,2,3."
        },
        {
          "input": "nums = [7,7,7,7]",
          "output": "1",
          "explanation": "Strict increase does not allow equal values."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion tries taking or skipping each element.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Patience sorting tails use binary search.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoized recursion tracks index and previous index.",
      "bruteForceCode": "class Solution {\n  public int lengthOfLIS(int[] nums) {\n    return choose(nums, 0, Integer.MIN_VALUE);\n  }\n\n  private int choose(int[] nums, int index, int previous) {\n    if (index == nums.length) return 0;\n    int skip = choose(nums, index + 1, previous);\n    int take = nums[index] > previous ? 1 + choose(nums, index + 1, nums[index]) : 0;\n    return Math.max(take, skip);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n\n    for (int num : nums) {\n      int index = Arrays.binarySearch(tails, 0, size, num);\n      if (index < 0) index = -index - 1;\n      tails[index] = num;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[][] memo = new int[nums.length][nums.length + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(nums, 0, -1, memo);\n  }\n\n  private int dp(int[] nums, int index, int previous, int[][] memo) {\n    if (index == nums.length) return 0;\n    if (memo[index][previous + 1] != -1) return memo[index][previous + 1];\n    int skip = dp(nums, index + 1, previous, memo);\n    int take = previous == -1 || nums[index] > nums[previous]\n        ? 1 + dp(nums, index + 1, index, memo)\n        : 0;\n    memo[index][previous + 1] = Math.max(take, skip);\n    return memo[index][previous + 1];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n\n    for (int num : nums) {\n      int index = Arrays.binarySearch(tails, 0, size, num);\n      if (index < 0) index = -index - 1;\n      tails[index] = num;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n\n    for (int num : nums) {\n      int index = Arrays.binarySearch(tails, 0, size, num);\n      if (index < 0) index = -index - 1;\n      tails[index] = num;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Longest Arithmetic Subsequence",
      "difficulty": "Medium",
      "subpattern": "Difference-indexed sequence DP",
      "question": "Given an array, return the length of the longest arithmetic subsequence.",
      "trigger": "The state must remember the last index and common difference of the subsequence.",
      "intuition": "For every pair j < i, extend the best subsequence ending at j with difference nums[i] - nums[j].",
      "edgeCases": "All equal numbers, negative differences, increasing sequence, two elements, duplicate values.",
      "constraints": "2 <= nums.length <= 1000; 0 <= nums[i] <= 500.",
      "source": {
        "label": "Longest Arithmetic Subsequence - LeetCode 1027",
        "url": "https://leetcode.com/problems/longest-arithmetic-subsequence/"
      },
      "examples": [
        {
          "input": "nums = [3,6,9,12]",
          "output": "4",
          "explanation": "The whole array has difference 3."
        },
        {
          "input": "nums = [9,4,7,2,10]",
          "output": "3",
          "explanation": "One answer is 4,7,10."
        },
        {
          "input": "nums = [20,1,15,3,10,5,8]",
          "output": "4",
          "explanation": "One answer is 20,15,10,5."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Try every pair as a starting difference and scan forward.",
      "optimizedComplexity": "Time O(n^2); Space O(n^2). Hash maps store best length by difference for each ending index.",
      "recursiveComplexity": "Time O(n^2 * D) after memoized pair states; Space O(n^2). Recursion extends a chosen difference.",
      "bruteForceCode": "class Solution {\n  public int longestArithSeqLength(int[] nums) {\n    int best = 2;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        int diff = nums[j] - nums[i];\n        int length = 2;\n        int last = nums[j];\n        for (int k = j + 1; k < nums.length; k++) {\n          if (nums[k] - last == diff) {\n            length++;\n            last = nums[k];\n          }\n        }\n        best = Math.max(best, length);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int longestArithSeqLength(int[] nums) {\n    Map<Integer, Integer>[] dp = new HashMap[nums.length];\n    for (int i = 0; i < nums.length; i++) dp[i] = new HashMap<>();\n    int best = 2;\n\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = 0; j < i; j++) {\n        int diff = nums[i] - nums[j];\n        int length = dp[j].getOrDefault(diff, 1) + 1;\n        dp[i].put(diff, Math.max(dp[i].getOrDefault(diff, 0), length));\n        best = Math.max(best, length);\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int longestArithSeqLength(int[] nums) {\n    Map<String, Integer> memo = new HashMap<>();\n    int best = 2;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        best = Math.max(best, 2 + extend(nums, j, nums[j] - nums[i], memo));\n      }\n    }\n    return best;\n  }\n\n  private int extend(int[] nums, int index, int diff, Map<String, Integer> memo) {\n    String key = index + \":\" + diff;\n    if (memo.containsKey(key)) return memo.get(key);\n    int best = 0;\n    for (int next = index + 1; next < nums.length; next++) {\n      if (nums[next] - nums[index] == diff) {\n        best = Math.max(best, 1 + extend(nums, next, diff, memo));\n      }\n    }\n    memo.put(key, best);\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int longestArithSeqLength(int[] nums) {\n    Map<Integer, Integer>[] dp = new HashMap[nums.length];\n    for (int i = 0; i < nums.length; i++) dp[i] = new HashMap<>();\n    int best = 2;\n\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = 0; j < i; j++) {\n        int diff = nums[i] - nums[j];\n        int length = dp[j].getOrDefault(diff, 1) + 1;\n        dp[i].put(diff, Math.max(dp[i].getOrDefault(diff, 0), length));\n        best = Math.max(best, length);\n      }\n    }\n    return best;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int longestArithSeqLength(int[] nums) {\n    Map<Integer, Integer>[] dp = new HashMap[nums.length];\n    for (int i = 0; i < nums.length; i++) dp[i] = new HashMap<>();\n    int best = 2;\n\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = 0; j < i; j++) {\n        int diff = nums[i] - nums[j];\n        int length = dp[j].getOrDefault(diff, 1) + 1;\n        dp[i].put(diff, Math.max(dp[i].getOrDefault(diff, 0), length));\n        best = Math.max(best, length);\n      }\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Partition Equal Subset Sum",
      "difficulty": "Medium",
      "subpattern": "Subset-sum boolean DP",
      "question": "Given an integer array, return true if it can be partitioned into two subsets with equal sum.",
      "trigger": "Equal partition is possible only if some subset sums to total / 2.",
      "intuition": "Track reachable subset sums and update from high to low so each number is used at most once.",
      "edgeCases": "Odd total sum, one element, zeros, target reached early, number larger than target.",
      "constraints": "1 <= nums.length <= 200; 1 <= nums[i] <= 100.",
      "source": {
        "label": "Partition Equal Subset Sum - LeetCode 416",
        "url": "https://leetcode.com/problems/partition-equal-subset-sum/"
      },
      "examples": [
        {
          "input": "nums = [1,5,11,5]",
          "output": "true",
          "explanation": "Subset [11] equals subset [1,5,5]."
        },
        {
          "input": "nums = [1,2,3,5]",
          "output": "false",
          "explanation": "No subset sums to half the total."
        },
        {
          "input": "nums = [2,2,3,5]",
          "output": "false",
          "explanation": "Total is 12, but no subset makes 6."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Plain recursion tries every subset.",
      "optimizedComplexity": "Time O(n * target); Space O(target). 1D boolean DP tracks reachable sums.",
      "recursiveComplexity": "Time O(n * target); Space O(n * target). Memoized recursion stores index and remaining target.",
      "bruteForceCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % 2 == 1) return false;\n    return choose(nums, 0, sum / 2);\n  }\n\n  private boolean choose(int[] nums, int index, int target) {\n    if (target == 0) return true;\n    if (index == nums.length || target < 0) return false;\n    return choose(nums, index + 1, target - nums[index]) || choose(nums, index + 1, target);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % 2 == 1) return false;\n\n    int target = sum / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n    for (int num : nums) {\n      for (int value = target; value >= num; value--) {\n        dp[value] = dp[value] || dp[value - num];\n      }\n    }\n    return dp[target];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % 2 == 1) return false;\n    Boolean[][] memo = new Boolean[nums.length][sum / 2 + 1];\n    return dp(nums, 0, sum / 2, memo);\n  }\n\n  private boolean dp(int[] nums, int index, int target, Boolean[][] memo) {\n    if (target == 0) return true;\n    if (index == nums.length || target < 0) return false;\n    if (memo[index][target] != null) return memo[index][target];\n    memo[index][target] = dp(nums, index + 1, target - nums[index], memo)\n        || dp(nums, index + 1, target, memo);\n    return memo[index][target];\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % 2 == 1) return false;\n\n    int target = sum / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n    for (int num : nums) {\n      for (int value = target; value >= num; value--) {\n        dp[value] = dp[value] || dp[value - num];\n      }\n    }\n    return dp[target];\n  }\n}",
      "code": "class Solution {\n  public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % 2 == 1) return false;\n\n    int target = sum / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n    for (int num : nums) {\n      for (int value = target; value >= num; value--) {\n        dp[value] = dp[value] || dp[value - num];\n      }\n    }\n    return dp[target];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Word Break",
      "difficulty": "Medium",
      "subpattern": "String segmentation DP",
      "question": "Given a string and a dictionary, return true if the string can be segmented into a sequence of one or more dictionary words.",
      "trigger": "A prefix ending at i is valid if some previous valid split j has s[j..i) in the dictionary.",
      "intuition": "dp[i] means the prefix of length i can be segmented; test all previous cut positions.",
      "edgeCases": "Whole string is one word, repeated word reuse, impossible suffix, overlapping choices, dictionary word longer than s.",
      "constraints": "1 <= s.length <= 300; 1 <= wordDict.length <= 1000; words contain lowercase English letters.",
      "source": {
        "label": "Word Break - LeetCode 139",
        "url": "https://leetcode.com/problems/word-break/"
      },
      "examples": [
        {
          "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
          "output": "true",
          "explanation": "leetcode splits into leet + code."
        },
        {
          "input": "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
          "output": "true",
          "explanation": "Words may be reused."
        },
        {
          "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
          "output": "false",
          "explanation": "No split covers the entire string."
        }
      ],
      "bruteForceComplexity": "Time O(2^n * n); Space O(n). Plain recursion tries every cut.",
      "optimizedComplexity": "Time O(n^3) with substring creation; Space O(n + dictionary). Bottom-up DP checks all cuts.",
      "recursiveComplexity": "Time O(n^3); Space O(n + dictionary). Memoized recursion stores failed start positions.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    return canBreak(s, 0, new HashSet<>(wordDict));\n  }\n\n  private boolean canBreak(String s, int start, Set<String> words) {\n    if (start == s.length()) return true;\n    for (int end = start + 1; end <= s.length(); end++) {\n      if (words.contains(s.substring(start, end)) && canBreak(s, end, words)) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n\n    for (int end = 1; end <= s.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && words.contains(s.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    return dp[s.length()];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    Boolean[] memo = new Boolean[s.length()];\n    return dp(s, 0, words, memo);\n  }\n\n  private boolean dp(String s, int start, Set<String> words, Boolean[] memo) {\n    if (start == s.length()) return true;\n    if (memo[start] != null) return memo[start];\n    for (int end = start + 1; end <= s.length(); end++) {\n      if (words.contains(s.substring(start, end)) && dp(s, end, words, memo)) {\n        return memo[start] = true;\n      }\n    }\n    return memo[start] = false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n\n    for (int end = 1; end <= s.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && words.contains(s.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    return dp[s.length()];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> words = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true;\n\n    for (int end = 1; end <= s.length(); end++) {\n      for (int start = 0; start < end; start++) {\n        if (dp[start] && words.contains(s.substring(start, end))) {\n          dp[end] = true;\n          break;\n        }\n      }\n    }\n    return dp[s.length()];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Perfect Squares",
      "difficulty": "Medium",
      "subpattern": "Unbounded knapsack minimum count",
      "question": "Given n, return the minimum number of perfect square numbers whose sum is n.",
      "trigger": "This is coin change where the coin set is all perfect squares not exceeding n.",
      "intuition": "For each total, try the last square used and minimize 1 + dp[total - square].",
      "edgeCases": "n is a square, n = 1, prime-like values, repeated square use, large n.",
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
          "explanation": "1 is a perfect square."
        }
      ],
      "bruteForceComplexity": "Time exponential in n; Space O(n). Plain recursion tries every square at every remainder.",
      "optimizedComplexity": "Time O(n * sqrt(n)); Space O(n). Bottom-up DP computes best square count for each total.",
      "recursiveComplexity": "Time O(n * sqrt(n)); Space O(n). Memoized recursion solves each remainder once.",
      "bruteForceCode": "class Solution {\n  public int numSquares(int n) {\n    if (n == 0) return 0;\n    int best = n;\n    for (int square = 1; square * square <= n; square++) {\n      best = Math.min(best, 1 + numSquares(n - square * square));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numSquares(int n) {\n    int[] dp = new int[n + 1];\n    Arrays.fill(dp, n + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value <= n; value++) {\n      for (int square = 1; square * square <= value; square++) {\n        dp[value] = Math.min(dp[value], dp[value - square * square] + 1);\n      }\n    }\n    return dp[n];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numSquares(int n) {\n    int[] memo = new int[n + 1];\n    Arrays.fill(memo, -1);\n    return dp(n, memo);\n  }\n\n  private int dp(int n, int[] memo) {\n    if (n == 0) return 0;\n    if (memo[n] != -1) return memo[n];\n    int best = n;\n    for (int square = 1; square * square <= n; square++) {\n      best = Math.min(best, 1 + dp(n - square * square, memo));\n    }\n    memo[n] = best;\n    return best;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numSquares(int n) {\n    int[] dp = new int[n + 1];\n    Arrays.fill(dp, n + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value <= n; value++) {\n      for (int square = 1; square * square <= value; square++) {\n        dp[value] = Math.min(dp[value], dp[value - square * square] + 1);\n      }\n    }\n    return dp[n];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numSquares(int n) {\n    int[] dp = new int[n + 1];\n    Arrays.fill(dp, n + 1);\n    dp[0] = 0;\n\n    for (int value = 1; value <= n; value++) {\n      for (int square = 1; square * square <= value; square++) {\n        dp[value] = Math.min(dp[value], dp[value - square * square] + 1);\n      }\n    }\n    return dp[n];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Integer Break",
      "difficulty": "Medium",
      "subpattern": "Max-product split recurrence",
      "question": "Given integer n, break it into at least two positive integers and maximize the product of those integers.",
      "trigger": "The best product for n depends on choosing a first split i and either keeping or further breaking n - i.",
      "intuition": "Try every split and compare i * (n - i) against i * dp[n - i].",
      "edgeCases": "n = 2, n = 3, split must use at least two numbers, repeated 3s produce optimal products.",
      "constraints": "2 <= n <= 58.",
      "source": {
        "label": "Integer Break - LeetCode 343",
        "url": "https://leetcode.com/problems/integer-break/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "1",
          "explanation": "The only split is 1 + 1."
        },
        {
          "input": "n = 10",
          "output": "36",
          "explanation": "10 = 3 + 3 + 4 and product is 36."
        },
        {
          "input": "n = 4",
          "output": "4",
          "explanation": "2 + 2 gives product 4."
        }
      ],
      "bruteForceComplexity": "Time exponential in n; Space O(n). Plain recursion explores all break combinations.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Bottom-up DP tests all first split positions.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Memoized recursion solves each integer size once.",
      "bruteForceCode": "class Solution {\n  public int integerBreak(int n) {\n    int best = 0;\n    for (int first = 1; first < n; first++) {\n      best = Math.max(best, first * Math.max(n - first, integerBreak(n - first)));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int integerBreak(int n) {\n    int[] dp = new int[n + 1];\n\n    for (int value = 2; value <= n; value++) {\n      for (int first = 1; first < value; first++) {\n        int keep = first * (value - first);\n        int split = first * dp[value - first];\n        dp[value] = Math.max(dp[value], Math.max(keep, split));\n      }\n    }\n    return dp[n];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int integerBreak(int n) {\n    int[] memo = new int[n + 1];\n    return dp(n, memo);\n  }\n\n  private int dp(int n, int[] memo) {\n    if (n == 1) return 0;\n    if (memo[n] != 0) return memo[n];\n    int best = 0;\n    for (int first = 1; first < n; first++) {\n      best = Math.max(best, first * Math.max(n - first, dp(n - first, memo)));\n    }\n    memo[n] = best;\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int integerBreak(int n) {\n    int[] dp = new int[n + 1];\n\n    for (int value = 2; value <= n; value++) {\n      for (int first = 1; first < value; first++) {\n        int keep = first * (value - first);\n        int split = first * dp[value - first];\n        dp[value] = Math.max(dp[value], Math.max(keep, split));\n      }\n    }\n    return dp[n];\n  }\n}",
      "code": "class Solution {\n  public int integerBreak(int n) {\n    int[] dp = new int[n + 1];\n\n    for (int value = 2; value <= n; value++) {\n      for (int first = 1; first < value; first++) {\n        int keep = first * (value - first);\n        int split = first * dp[value - first];\n        dp[value] = Math.max(dp[value], Math.max(keep, split));\n      }\n    }\n    return dp[n];\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Product Subarray",
      "difficulty": "Medium",
      "subpattern": "Kadane-style max/min product state",
      "question": "Given an integer array, return the maximum product of a non-empty contiguous subarray.",
      "trigger": "A negative number can turn the smallest product into the largest product, so both max and min ending states are needed.",
      "intuition": "Track maxEnding and minEnding at each index; swap roles when multiplying by a negative number.",
      "edgeCases": "Negative numbers, zeros, single element, even versus odd count of negatives, all negative values.",
      "constraints": "1 <= nums.length <= 20000; -10 <= nums[i] <= 10; product fits in 32-bit integer.",
      "source": {
        "label": "Maximum Product Subarray - LeetCode 152",
        "url": "https://leetcode.com/problems/maximum-product-subarray/"
      },
      "examples": [
        {
          "input": "nums = [2,3,-2,4]",
          "output": "6",
          "explanation": "The subarray [2,3] has product 6."
        },
        {
          "input": "nums = [-2,0,-1]",
          "output": "0",
          "explanation": "The zero is larger than negative products."
        },
        {
          "input": "nums = [-2,3,-4]",
          "output": "24",
          "explanation": "The entire array product is 24."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Every subarray product is computed by extending starts.",
      "optimizedComplexity": "Time O(n); Space O(1). Maintain max and min product ending at the current index.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan carries max/min ending states through the array.",
      "bruteForceCode": "class Solution {\n  public int maxProduct(int[] nums) {\n    int best = nums[0];\n    for (int start = 0; start < nums.length; start++) {\n      int product = 1;\n      for (int end = start; end < nums.length; end++) {\n        product *= nums[end];\n        best = Math.max(best, product);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxProduct(int[] nums) {\n    int maxEnding = nums[0];\n    int minEnding = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      int value = nums[i];\n      if (value < 0) {\n        int temp = maxEnding;\n        maxEnding = minEnding;\n        minEnding = temp;\n      }\n      maxEnding = Math.max(value, maxEnding * value);\n      minEnding = Math.min(value, minEnding * value);\n      best = Math.max(best, maxEnding);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxProduct(int[] nums) {\n    return scan(nums, 1, nums[0], nums[0], nums[0]);\n  }\n\n  private int scan(int[] nums, int index, int maxEnding, int minEnding, int best) {\n    if (index == nums.length) return best;\n    int value = nums[index];\n    if (value < 0) {\n      int temp = maxEnding;\n      maxEnding = minEnding;\n      minEnding = temp;\n    }\n    int nextMax = Math.max(value, maxEnding * value);\n    int nextMin = Math.min(value, minEnding * value);\n    return scan(nums, index + 1, nextMax, nextMin, Math.max(best, nextMax));\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxProduct(int[] nums) {\n    int maxEnding = nums[0];\n    int minEnding = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      int value = nums[i];\n      if (value < 0) {\n        int temp = maxEnding;\n        maxEnding = minEnding;\n        minEnding = temp;\n      }\n      maxEnding = Math.max(value, maxEnding * value);\n      minEnding = Math.min(value, minEnding * value);\n      best = Math.max(best, maxEnding);\n    }\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int maxProduct(int[] nums) {\n    int maxEnding = nums[0];\n    int minEnding = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      int value = nums[i];\n      if (value < 0) {\n        int temp = maxEnding;\n        maxEnding = minEnding;\n        minEnding = temp;\n      }\n      maxEnding = Math.max(value, maxEnding * value);\n      minEnding = Math.min(value, minEnding * value);\n      best = Math.max(best, maxEnding);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Maximum Subarray",
      "difficulty": "Medium",
      "subpattern": "Kadane-style running-state DP",
      "question": "Given an integer array, return the largest sum of any non-empty contiguous subarray.",
      "trigger": "The best subarray ending at i is either nums[i] alone or nums[i] appended to the best subarray ending at i - 1.",
      "intuition": "Keep current best ending sum and global best sum.",
      "edgeCases": "All negative numbers, one element, zeros, best subarray at start, best subarray at end.",
      "constraints": "1 <= nums.length <= 100000; -10000 <= nums[i] <= 10000.",
      "source": {
        "label": "Maximum Subarray - LeetCode 53",
        "url": "https://leetcode.com/problems/maximum-subarray/"
      },
      "examples": [
        {
          "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          "output": "6",
          "explanation": "The subarray [4,-1,2,1] has sum 6."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The only subarray is the array itself."
        },
        {
          "input": "nums = [5,4,-1,7,8]",
          "output": "23",
          "explanation": "The full array has maximum sum."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Every subarray sum is extended and checked.",
      "optimizedComplexity": "Time O(n); Space O(1). Kadane keeps the best ending sum and global best.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan carries current and best sums.",
      "bruteForceCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int best = nums[0];\n    for (int start = 0; start < nums.length; start++) {\n      int sum = 0;\n      for (int end = start; end < nums.length; end++) {\n        sum += nums[end];\n        best = Math.max(best, sum);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int current = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      current = Math.max(nums[i], current + nums[i]);\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    return scan(nums, 1, nums[0], nums[0]);\n  }\n\n  private int scan(int[] nums, int index, int current, int best) {\n    if (index == nums.length) return best;\n    int next = Math.max(nums[index], current + nums[index]);\n    return scan(nums, index + 1, next, Math.max(best, next));\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int current = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      current = Math.max(nums[i], current + nums[i]);\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int maxSubArray(int[] nums) {\n    int current = nums[0];\n    int best = nums[0];\n\n    for (int i = 1; i < nums.length; i++) {\n      current = Math.max(nums[i], current + nums[i]);\n      best = Math.max(best, current);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Best Time to Buy and Sell Stock",
      "difficulty": "Easy",
      "subpattern": "One-transaction stock DP",
      "question": "Given prices where prices[i] is the stock price on day i, return the maximum profit from one buy followed by one sell.",
      "trigger": "The best sale on day i depends on the cheapest buy price seen before day i.",
      "intuition": "Track the minimum price so far and update profit using current price minus that minimum.",
      "edgeCases": "Descending prices, one day, best buy at first day, best sell at last day, repeated prices.",
      "constraints": "1 <= prices.length <= 100000; 0 <= prices[i] <= 10000.",
      "source": {
        "label": "Best Time to Buy and Sell Stock - LeetCode 121",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
      },
      "examples": [
        {
          "input": "prices = [7,1,5,3,6,4]",
          "output": "5",
          "explanation": "Buy at 1 and sell at 6."
        },
        {
          "input": "prices = [7,6,4,3,1]",
          "output": "0",
          "explanation": "No profitable transaction exists."
        },
        {
          "input": "prices = [2,4,1]",
          "output": "2",
          "explanation": "Buy at 2 and sell at 4."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Try every buy/sell pair.",
      "optimizedComplexity": "Time O(n); Space O(1). Track minimum price and best profit.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan carries minimum price and best profit.",
      "bruteForceCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    int best = 0;\n    for (int buy = 0; buy < prices.length; buy++) {\n      for (int sell = buy + 1; sell < prices.length; sell++) {\n        best = Math.max(best, prices[sell] - prices[buy]);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE;\n    int best = 0;\n\n    for (int price : prices) {\n      minPrice = Math.min(minPrice, price);\n      best = Math.max(best, price - minPrice);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    return scan(prices, 0, Integer.MAX_VALUE, 0);\n  }\n\n  private int scan(int[] prices, int index, int minPrice, int best) {\n    if (index == prices.length) return best;\n    int nextMin = Math.min(minPrice, prices[index]);\n    int nextBest = Math.max(best, prices[index] - nextMin);\n    return scan(prices, index + 1, nextMin, nextBest);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE;\n    int best = 0;\n\n    for (int price : prices) {\n      minPrice = Math.min(minPrice, price);\n      best = Math.max(best, price - minPrice);\n    }\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE;\n    int best = 0;\n\n    for (int price : prices) {\n      minPrice = Math.min(minPrice, price);\n      best = Math.max(best, price - minPrice);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Best Time to Buy and Sell Stock with Cooldown",
      "difficulty": "Medium",
      "subpattern": "Stock state machine DP with cooldown",
      "question": "Given daily stock prices, return the maximum profit with unlimited transactions and a one-day cooldown after selling.",
      "trigger": "Each day has states: holding stock, just sold, or resting, and cooldown restricts transitions.",
      "intuition": "Update hold, sold, and rest states each day using only yesterday states.",
      "edgeCases": "One day, descending prices, alternating gains, cooldown after sale, repeated prices.",
      "constraints": "1 <= prices.length <= 5000; 0 <= prices[i] <= 1000.",
      "source": {
        "label": "Stock with Cooldown - LeetCode 309",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
      },
      "examples": [
        {
          "input": "prices = [1,2,3,0,2]",
          "output": "3",
          "explanation": "Buy day 0, sell day 1, cooldown, buy day 3, sell day 4."
        },
        {
          "input": "prices = [1]",
          "output": "0",
          "explanation": "No sale is possible."
        },
        {
          "input": "prices = [2,1,4]",
          "output": "3",
          "explanation": "Buy at 1 and sell at 4."
        }
      ],
      "bruteForceComplexity": "Time exponential in days; Space O(n). Plain recursion chooses buy, sell, cooldown, or skip.",
      "optimizedComplexity": "Time O(n); Space O(1). Three state variables hold, sold, and rest are enough.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion stores day and holding/cooldown state.",
      "bruteForceCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    return dfs(prices, 0, false);\n  }\n\n  private int dfs(int[] prices, int day, boolean holding) {\n    if (day >= prices.length) return 0;\n    int skip = dfs(prices, day + 1, holding);\n    if (holding) {\n      return Math.max(skip, prices[day] + dfs(prices, day + 2, false));\n    }\n    return Math.max(skip, -prices[day] + dfs(prices, day + 1, true));\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    int hold = -prices[0];\n    int sold = 0;\n    int rest = 0;\n\n    for (int i = 1; i < prices.length; i++) {\n      int previousHold = hold;\n      int previousSold = sold;\n      int previousRest = rest;\n      hold = Math.max(previousHold, previousRest - prices[i]);\n      sold = previousHold + prices[i];\n      rest = Math.max(previousRest, previousSold);\n    }\n    return Math.max(sold, rest);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxProfit(int[] prices) {\n    Integer[][] memo = new Integer[prices.length][2];\n    return dp(prices, 0, 0, memo);\n  }\n\n  private int dp(int[] prices, int day, int holding, Integer[][] memo) {\n    if (day >= prices.length) return 0;\n    if (memo[day][holding] != null) return memo[day][holding];\n    int skip = dp(prices, day + 1, holding, memo);\n    int best;\n    if (holding == 1) {\n      best = Math.max(skip, prices[day] + dp(prices, day + 2, 0, memo));\n    } else {\n      best = Math.max(skip, -prices[day] + dp(prices, day + 1, 1, memo));\n    }\n    memo[day][holding] = best;\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxProfit(int[] prices) {\n    int hold = -prices[0];\n    int sold = 0;\n    int rest = 0;\n\n    for (int i = 1; i < prices.length; i++) {\n      int previousHold = hold;\n      int previousSold = sold;\n      int previousRest = rest;\n      hold = Math.max(previousHold, previousRest - prices[i]);\n      sold = previousHold + prices[i];\n      rest = Math.max(previousRest, previousSold);\n    }\n    return Math.max(sold, rest);\n  }\n}",
      "code": "class Solution {\n  public int maxProfit(int[] prices) {\n    int hold = -prices[0];\n    int sold = 0;\n    int rest = 0;\n\n    for (int i = 1; i < prices.length; i++) {\n      int previousHold = hold;\n      int previousSold = sold;\n      int previousRest = rest;\n      hold = Math.max(previousHold, previousRest - prices[i]);\n      sold = previousHold + prices[i];\n      rest = Math.max(previousRest, previousSold);\n    }\n    return Math.max(sold, rest);\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Best Time to Buy and Sell Stock with Transaction Fee",
      "difficulty": "Medium",
      "subpattern": "Stock state machine DP with fee",
      "question": "Given daily stock prices and a transaction fee, return maximum profit with unlimited transactions where each sale pays the fee.",
      "trigger": "Each day has holding and cash states; selling transitions from hold to cash minus the fee.",
      "intuition": "cash is profit without stock; hold is profit after buying or continuing to hold.",
      "edgeCases": "High fee blocks trades, one day, descending prices, repeated prices, multiple profitable segments.",
      "constraints": "1 <= prices.length <= 50000; 1 <= prices[i] < 50000; 0 <= fee < 50000.",
      "source": {
        "label": "Stock with Transaction Fee - LeetCode 714",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/"
      },
      "examples": [
        {
          "input": "prices = [1,3,2,8,4,9], fee = 2",
          "output": "8",
          "explanation": "Profit is 5 from 1->8 and 3 from 4->9."
        },
        {
          "input": "prices = [1,3,7,5,10,3], fee = 3",
          "output": "6",
          "explanation": "One optimal sequence gains 6 after fees."
        },
        {
          "input": "prices = [9,8,7], fee = 1",
          "output": "0",
          "explanation": "No profitable trade exists."
        }
      ],
      "bruteForceComplexity": "Time exponential in days; Space O(n). Plain recursion chooses buy, sell, or skip.",
      "optimizedComplexity": "Time O(n); Space O(1). Two state variables cash and hold are enough.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion stores day and holding state.",
      "bruteForceCode": "class Solution {\n  public int maxProfit(int[] prices, int fee) {\n    return dfs(prices, fee, 0, false);\n  }\n\n  private int dfs(int[] prices, int fee, int day, boolean holding) {\n    if (day == prices.length) return 0;\n    int skip = dfs(prices, fee, day + 1, holding);\n    if (holding) {\n      return Math.max(skip, prices[day] - fee + dfs(prices, fee, day + 1, false));\n    }\n    return Math.max(skip, -prices[day] + dfs(prices, fee, day + 1, true));\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxProfit(int[] prices, int fee) {\n    int cash = 0;\n    int hold = -prices[0];\n\n    for (int i = 1; i < prices.length; i++) {\n      int previousCash = cash;\n      cash = Math.max(cash, hold + prices[i] - fee);\n      hold = Math.max(hold, previousCash - prices[i]);\n    }\n    return cash;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxProfit(int[] prices, int fee) {\n    Integer[][] memo = new Integer[prices.length][2];\n    return dp(prices, fee, 0, 0, memo);\n  }\n\n  private int dp(int[] prices, int fee, int day, int holding, Integer[][] memo) {\n    if (day == prices.length) return 0;\n    if (memo[day][holding] != null) return memo[day][holding];\n    int skip = dp(prices, fee, day + 1, holding, memo);\n    int best;\n    if (holding == 1) {\n      best = Math.max(skip, prices[day] - fee + dp(prices, fee, day + 1, 0, memo));\n    } else {\n      best = Math.max(skip, -prices[day] + dp(prices, fee, day + 1, 1, memo));\n    }\n    memo[day][holding] = best;\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxProfit(int[] prices, int fee) {\n    int cash = 0;\n    int hold = -prices[0];\n\n    for (int i = 1; i < prices.length; i++) {\n      int previousCash = cash;\n      cash = Math.max(cash, hold + prices[i] - fee);\n      hold = Math.max(hold, previousCash - prices[i]);\n    }\n    return cash;\n  }\n}",
      "code": "class Solution {\n  public int maxProfit(int[] prices, int fee) {\n    int cash = 0;\n    int hold = -prices[0];\n\n    for (int i = 1; i < prices.length; i++) {\n      int previousCash = cash;\n      cash = Math.max(cash, hold + prices[i] - fee);\n      hold = Math.max(hold, previousCash - prices[i]);\n    }\n    return cash;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Delete and Earn",
      "difficulty": "Medium",
      "subpattern": "Take-or-skip recurrence after value compression",
      "question": "Given nums, you may take a value x to earn x points per occurrence, but then all x - 1 and x + 1 values are deleted. Return maximum points.",
      "trigger": "After grouping points by value, adjacent values conflict exactly like House Robber.",
      "intuition": "Aggregate total points for each value, then run take-or-skip over values in numeric order.",
      "edgeCases": "Single value, duplicate-heavy values, gaps between values, adjacent high totals, max value boundary.",
      "constraints": "1 <= nums.length <= 20000; 1 <= nums[i] <= 10000.",
      "source": {
        "label": "Delete and Earn - LeetCode 740",
        "url": "https://leetcode.com/problems/delete-and-earn/"
      },
      "examples": [
        {
          "input": "nums = [3,4,2]",
          "output": "6",
          "explanation": "Take 4 and 2 for total 6."
        },
        {
          "input": "nums = [2,2,3,3,3,4]",
          "output": "9",
          "explanation": "Take all 3s for 9."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "Only one number can be taken."
        }
      ],
      "bruteForceComplexity": "Time exponential in distinct values; Space O(U). Recursion chooses take or skip value buckets.",
      "optimizedComplexity": "Time O(n + U); Space O(U), where U is max value. House Robber DP runs over value buckets.",
      "recursiveComplexity": "Time O(n + U); Space O(U). Memoized recursion solves each value once.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int deleteAndEarn(int[] nums) {\n    Map<Integer, Integer> points = new HashMap<>();\n    int max = 0;\n    for (int num : nums) {\n      points.put(num, points.getOrDefault(num, 0) + num);\n      max = Math.max(max, num);\n    }\n    return choose(points, 1, max);\n  }\n\n  private int choose(Map<Integer, Integer> points, int value, int max) {\n    if (value > max) return 0;\n    int take = points.getOrDefault(value, 0) + choose(points, value + 2, max);\n    int skip = choose(points, value + 1, max);\n    return Math.max(take, skip);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int deleteAndEarn(int[] nums) {\n    int max = 0;\n    for (int num : nums) max = Math.max(max, num);\n    int[] points = new int[max + 1];\n    for (int num : nums) points[num] += num;\n\n    int twoBack = 0;\n    int oneBack = 0;\n    for (int value = 1; value <= max; value++) {\n      int current = Math.max(oneBack, twoBack + points[value]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int deleteAndEarn(int[] nums) {\n    int max = 0;\n    for (int num : nums) max = Math.max(max, num);\n    int[] points = new int[max + 1];\n    for (int num : nums) points[num] += num;\n    int[] memo = new int[max + 1];\n    Arrays.fill(memo, -1);\n    return dp(points, 1, memo);\n  }\n\n  private int dp(int[] points, int value, int[] memo) {\n    if (value >= points.length) return 0;\n    if (memo[value] != -1) return memo[value];\n    int take = points[value] + dp(points, value + 2, memo);\n    int skip = dp(points, value + 1, memo);\n    memo[value] = Math.max(take, skip);\n    return memo[value];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int deleteAndEarn(int[] nums) {\n    int max = 0;\n    for (int num : nums) max = Math.max(max, num);\n    int[] points = new int[max + 1];\n    for (int num : nums) points[num] += num;\n\n    int twoBack = 0;\n    int oneBack = 0;\n    for (int value = 1; value <= max; value++) {\n      int current = Math.max(oneBack, twoBack + points[value]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}",
      "code": "class Solution {\n  public int deleteAndEarn(int[] nums) {\n    int max = 0;\n    for (int num : nums) max = Math.max(max, num);\n    int[] points = new int[max + 1];\n    for (int num : nums) points[num] += num;\n\n    int twoBack = 0;\n    int oneBack = 0;\n    for (int value = 1; value <= max; value++) {\n      int current = Math.max(oneBack, twoBack + points[value]);\n      twoBack = oneBack;\n      oneBack = current;\n    }\n    return oneBack;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Paint House",
      "difficulty": "Medium",
      "subpattern": "Linear DP with previous-color exclusion",
      "question": "Given costs to paint each house red, blue, or green, return the minimum cost so no adjacent houses have the same color.",
      "trigger": "The cost for house i and color c depends on the minimum previous cost among the other colors.",
      "intuition": "For each house, compute three states: painting it each color plus the cheaper compatible previous color.",
      "edgeCases": "One house, equal costs, alternating cheapest colors, high cost for one color, no houses if allowed.",
      "constraints": "n == costs.length; costs[i].length == 3; 1 <= n <= 100; 1 <= costs[i][j] <= 20.",
      "source": {
        "label": "Paint House - LeetCode 256",
        "url": "https://leetcode.com/problems/paint-house/"
      },
      "examples": [
        {
          "input": "costs = [[17,2,17],[16,16,5],[14,3,19]]",
          "output": "10",
          "explanation": "Paint colors blue, green, blue for total 2 + 5 + 3."
        },
        {
          "input": "costs = [[7,6,2]]",
          "output": "2",
          "explanation": "Choose the cheapest color for the only house."
        },
        {
          "input": "costs = [[1,5,3],[2,9,4]]",
          "output": "5",
          "explanation": "Paint first red and second green for total 5."
        }
      ],
      "bruteForceComplexity": "Time O(3^n); Space O(n). Plain recursion tries each valid color for every house.",
      "optimizedComplexity": "Time O(n); Space O(1). Keep the three previous color costs.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion stores house and previous color.",
      "bruteForceCode": "class Solution {\n  public int minCost(int[][] costs) {\n    return paint(costs, 0, -1);\n  }\n\n  private int paint(int[][] costs, int house, int previousColor) {\n    if (house == costs.length) return 0;\n    int best = Integer.MAX_VALUE;\n    for (int color = 0; color < 3; color++) {\n      if (color == previousColor) continue;\n      best = Math.min(best, costs[house][color] + paint(costs, house + 1, color));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minCost(int[][] costs) {\n    int red = 0;\n    int blue = 0;\n    int green = 0;\n\n    for (int[] cost : costs) {\n      int nextRed = cost[0] + Math.min(blue, green);\n      int nextBlue = cost[1] + Math.min(red, green);\n      int nextGreen = cost[2] + Math.min(red, blue);\n      red = nextRed;\n      blue = nextBlue;\n      green = nextGreen;\n    }\n    return Math.min(red, Math.min(blue, green));\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int minCost(int[][] costs) {\n    int[][] memo = new int[costs.length][4];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(costs, 0, 3, memo);\n  }\n\n  private int dp(int[][] costs, int house, int previousColor, int[][] memo) {\n    if (house == costs.length) return 0;\n    if (memo[house][previousColor] != -1) return memo[house][previousColor];\n    int best = Integer.MAX_VALUE;\n    for (int color = 0; color < 3; color++) {\n      if (color != previousColor) best = Math.min(best, costs[house][color] + dp(costs, house + 1, color, memo));\n    }\n    memo[house][previousColor] = best;\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minCost(int[][] costs) {\n    int red = 0;\n    int blue = 0;\n    int green = 0;\n\n    for (int[] cost : costs) {\n      int nextRed = cost[0] + Math.min(blue, green);\n      int nextBlue = cost[1] + Math.min(red, green);\n      int nextGreen = cost[2] + Math.min(red, blue);\n      red = nextRed;\n      blue = nextBlue;\n      green = nextGreen;\n    }\n    return Math.min(red, Math.min(blue, green));\n  }\n}",
      "code": "class Solution {\n  public int minCost(int[][] costs) {\n    int red = 0;\n    int blue = 0;\n    int green = 0;\n\n    for (int[] cost : costs) {\n      int nextRed = cost[0] + Math.min(blue, green);\n      int nextBlue = cost[1] + Math.min(red, green);\n      int nextGreen = cost[2] + Math.min(red, blue);\n      red = nextRed;\n      blue = nextBlue;\n      green = nextGreen;\n    }\n    return Math.min(red, Math.min(blue, green));\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Paint Fence",
      "difficulty": "Medium",
      "subpattern": "Counting recurrence with adjacent limit",
      "question": "Given n fence posts and k colors, count ways to paint all posts so no more than two adjacent posts have the same color.",
      "trigger": "The count depends on whether the last two posts have the same color or different colors.",
      "intuition": "same = previous different; different = previous total * (k - 1).",
      "edgeCases": "n = 1, k = 1, n = 2, no valid way when n > 2 and k = 1, large counts.",
      "constraints": "1 <= n <= 50; 1 <= k <= 100000 in common variants; result fits in 32-bit signed integer for test cases.",
      "source": {
        "label": "Paint Fence - LeetCode 276",
        "url": "https://leetcode.com/problems/paint-fence/"
      },
      "examples": [
        {
          "input": "n = 3, k = 2",
          "output": "6",
          "explanation": "Only aaa and bbb are invalid among 8 total colorings."
        },
        {
          "input": "n = 1, k = 1",
          "output": "1",
          "explanation": "One post can use the only color."
        },
        {
          "input": "n = 3, k = 1",
          "output": "0",
          "explanation": "Three same-colored adjacent posts are not allowed."
        }
      ],
      "bruteForceComplexity": "Time O(k^n); Space O(n). Plain recursion tries every color for every post.",
      "optimizedComplexity": "Time O(n); Space O(1). Track counts ending with same-color pair and different-color pair.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recurrence computes each post count once.",
      "bruteForceCode": "class Solution {\n  public int numWays(int n, int k) {\n    return paint(n, k, 0, -1, 0);\n  }\n\n  private int paint(int n, int k, int post, int previousColor, int runLength) {\n    if (post == n) return 1;\n    int ways = 0;\n    for (int color = 0; color < k; color++) {\n      int nextRun = color == previousColor ? runLength + 1 : 1;\n      if (nextRun <= 2) ways += paint(n, k, post + 1, color, nextRun);\n    }\n    return ways;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int numWays(int n, int k) {\n    if (n == 1) return k;\n    int same = k;\n    int different = k * (k - 1);\n\n    for (int post = 3; post <= n; post++) {\n      int nextSame = different;\n      int nextDifferent = (same + different) * (k - 1);\n      same = nextSame;\n      different = nextDifferent;\n    }\n    return same + different;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numWays(int n, int k) {\n    if (n == 1) return k;\n    int[][] memo = new int[n + 1][2];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return same(n, k, memo) + diff(n, k, memo);\n  }\n\n  private int same(int posts, int k, int[][] memo) {\n    if (posts == 2) return k;\n    if (memo[posts][0] != -1) return memo[posts][0];\n    memo[posts][0] = diff(posts - 1, k, memo);\n    return memo[posts][0];\n  }\n\n  private int diff(int posts, int k, int[][] memo) {\n    if (posts == 2) return k * (k - 1);\n    if (memo[posts][1] != -1) return memo[posts][1];\n    memo[posts][1] = (same(posts - 1, k, memo) + diff(posts - 1, k, memo)) * (k - 1);\n    return memo[posts][1];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int numWays(int n, int k) {\n    if (n == 1) return k;\n    int same = k;\n    int different = k * (k - 1);\n\n    for (int post = 3; post <= n; post++) {\n      int nextSame = different;\n      int nextDifferent = (same + different) * (k - 1);\n      same = nextSame;\n      different = nextDifferent;\n    }\n    return same + different;\n  }\n}",
      "code": "class Solution {\n  public int numWays(int n, int k) {\n    if (n == 1) return k;\n    int same = k;\n    int different = k * (k - 1);\n\n    for (int post = 3; post <= n; post++) {\n      int nextSame = different;\n      int nextDifferent = (same + different) * (k - 1);\n      same = nextSame;\n      different = nextDifferent;\n    }\n    return same + different;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Longest Valid Parentheses",
      "difficulty": "Hard",
      "subpattern": "1D DP over matching parentheses",
      "question": "Given a string containing only ( and ), return the length of the longest valid parentheses substring.",
      "trigger": "A valid substring ending at i can extend a previous valid block when s[i] closes a matching open parenthesis.",
      "intuition": "When s[i] is ), find the matching ( before the previous valid suffix and add surrounding valid length.",
      "edgeCases": "Empty string, all opens, all closes, nested pairs, adjacent valid groups, unmatched prefix.",
      "constraints": "0 <= s.length <= 30000; s[i] is ( or ).",
      "source": {
        "label": "Longest Valid Parentheses - LeetCode 32",
        "url": "https://leetcode.com/problems/longest-valid-parentheses/"
      },
      "examples": [
        {
          "input": "s = \"(()\"",
          "output": "2",
          "explanation": "The longest valid substring is ()."
        },
        {
          "input": "s = \")()())\"",
          "output": "4",
          "explanation": "The longest valid substring is ()()."
        },
        {
          "input": "s = \"\"",
          "output": "0",
          "explanation": "No substring exists."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check every even-length substring for validity.",
      "optimizedComplexity": "Time O(n); Space O(n). dp[i] stores valid length ending at i.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursive scan can validate starts with memoized balance search.",
      "bruteForceCode": "class Solution {\n  public int longestValidParentheses(String s) {\n    int best = 0;\n    for (int start = 0; start < s.length(); start++) {\n      for (int end = start + 1; end < s.length(); end += 2) {\n        if (valid(s, start, end)) best = Math.max(best, end - start + 1);\n      }\n    }\n    return best;\n  }\n\n  private boolean valid(String s, int start, int end) {\n    int balance = 0;\n    for (int i = start; i <= end; i++) {\n      balance += s.charAt(i) == '(' ? 1 : -1;\n      if (balance < 0) return false;\n    }\n    return balance == 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int longestValidParentheses(String s) {\n    int[] dp = new int[s.length()];\n    int best = 0;\n\n    for (int i = 1; i < s.length(); i++) {\n      if (s.charAt(i) == ')') {\n        int open = i - dp[i - 1] - 1;\n        if (open >= 0 && s.charAt(open) == '(') {\n          dp[i] = dp[i - 1] + 2;\n          if (open > 0) dp[i] += dp[open - 1];\n        }\n      }\n      best = Math.max(best, dp[i]);\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int longestValidParentheses(String s) {\n    return scan(s, 0, 0);\n  }\n\n  private int scan(String s, int start, int best) {\n    if (start >= s.length()) return best;\n    int balance = 0;\n    int currentBest = best;\n    for (int end = start; end < s.length(); end++) {\n      balance += s.charAt(end) == '(' ? 1 : -1;\n      if (balance < 0) break;\n      if (balance == 0) currentBest = Math.max(currentBest, end - start + 1);\n    }\n    return scan(s, start + 1, currentBest);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int longestValidParentheses(String s) {\n    int[] dp = new int[s.length()];\n    int best = 0;\n\n    for (int i = 1; i < s.length(); i++) {\n      if (s.charAt(i) == ')') {\n        int open = i - dp[i - 1] - 1;\n        if (open >= 0 && s.charAt(open) == '(') {\n          dp[i] = dp[i - 1] + 2;\n          if (open > 0) dp[i] += dp[open - 1];\n        }\n      }\n      best = Math.max(best, dp[i]);\n    }\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int longestValidParentheses(String s) {\n    int[] dp = new int[s.length()];\n    int best = 0;\n\n    for (int i = 1; i < s.length(); i++) {\n      if (s.charAt(i) == ')') {\n        int open = i - dp[i - 1] - 1;\n        if (open >= 0 && s.charAt(open) == '(') {\n          dp[i] = dp[i - 1] + 2;\n          if (open > 0) dp[i] += dp[open - 1];\n        }\n      }\n      best = Math.max(best, dp[i]);\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Number of Longest Increasing Subsequence",
      "difficulty": "Medium",
      "subpattern": "LIS counting DP",
      "question": "Given an integer array, return the number of longest strictly increasing subsequences.",
      "trigger": "Besides LIS length ending at each index, the count of ways to reach that length must be tracked.",
      "intuition": "When nums[j] < nums[i], either create a longer best ending at i or add another way to reach the same length.",
      "edgeCases": "All equal values, strictly increasing, multiple LIS paths, one element, duplicates.",
      "constraints": "1 <= nums.length <= 2000; -1000000 <= nums[i] <= 1000000; answer fits in 32-bit signed integer.",
      "source": {
        "label": "Number of Longest Increasing Subsequence - LeetCode 673",
        "url": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/"
      },
      "examples": [
        {
          "input": "nums = [1,3,5,4,7]",
          "output": "2",
          "explanation": "The LIS are [1,3,4,7] and [1,3,5,7]."
        },
        {
          "input": "nums = [2,2,2,2,2]",
          "output": "5",
          "explanation": "Each single element is an LIS."
        },
        {
          "input": "nums = [1,2,4,3,5,4,7,2]",
          "output": "3",
          "explanation": "There are three LIS of maximum length."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(n). Enumerate subsequences and count those with maximum length.",
      "optimizedComplexity": "Time O(n^2); Space O(n). DP stores length and count for each ending index.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoized recursion computes LIS length and count from each previous index.",
      "bruteForceCode": "class Solution {\n  private int bestLength = 0;\n  private int count = 0;\n\n  public int findNumberOfLIS(int[] nums) {\n    explore(nums, 0, Integer.MIN_VALUE, 0);\n    return count;\n  }\n\n  private void explore(int[] nums, int index, int previous, int length) {\n    if (index == nums.length) {\n      if (length > bestLength) {\n        bestLength = length;\n        count = 1;\n      } else if (length == bestLength) {\n        count++;\n      }\n      return;\n    }\n    explore(nums, index + 1, previous, length);\n    if (nums[index] > previous) explore(nums, index + 1, nums[index], length + 1);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int findNumberOfLIS(int[] nums) {\n    int n = nums.length;\n    int[] length = new int[n];\n    int[] count = new int[n];\n    Arrays.fill(length, 1);\n    Arrays.fill(count, 1);\n    int best = 1;\n\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < i; j++) {\n        if (nums[j] >= nums[i]) continue;\n        if (length[j] + 1 > length[i]) {\n          length[i] = length[j] + 1;\n          count[i] = count[j];\n        } else if (length[j] + 1 == length[i]) {\n          count[i] += count[j];\n        }\n      }\n      best = Math.max(best, length[i]);\n    }\n\n    int answer = 0;\n    for (int i = 0; i < n; i++) if (length[i] == best) answer += count[i];\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int findNumberOfLIS(int[] nums) {\n    int n = nums.length;\n    int[] best = new int[n];\n    int[] ways = new int[n];\n    int maxLength = 0;\n    for (int i = 0; i < n; i++) maxLength = Math.max(maxLength, length(nums, i, best, ways));\n    int answer = 0;\n    for (int i = 0; i < n; i++) if (best[i] == maxLength) answer += count(nums, i, best, ways);\n    return answer;\n  }\n\n  private int length(int[] nums, int index, int[] best, int[] ways) {\n    if (best[index] != 0) return best[index];\n    best[index] = 1;\n    for (int next = index + 1; next < nums.length; next++) {\n      if (nums[next] > nums[index]) best[index] = Math.max(best[index], 1 + length(nums, next, best, ways));\n    }\n    return best[index];\n  }\n\n  private int count(int[] nums, int index, int[] best, int[] ways) {\n    if (best[index] == 1) return 1;\n    if (ways[index] != 0) return ways[index];\n    for (int next = index + 1; next < nums.length; next++) {\n      if (nums[next] > nums[index] && best[index] == best[next] + 1) ways[index] += count(nums, next, best, ways);\n    }\n    return ways[index];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int findNumberOfLIS(int[] nums) {\n    int n = nums.length;\n    int[] length = new int[n];\n    int[] count = new int[n];\n    Arrays.fill(length, 1);\n    Arrays.fill(count, 1);\n    int best = 1;\n\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < i; j++) {\n        if (nums[j] >= nums[i]) continue;\n        if (length[j] + 1 > length[i]) {\n          length[i] = length[j] + 1;\n          count[i] = count[j];\n        } else if (length[j] + 1 == length[i]) {\n          count[i] += count[j];\n        }\n      }\n      best = Math.max(best, length[i]);\n    }\n\n    int answer = 0;\n    for (int i = 0; i < n; i++) if (length[i] == best) answer += count[i];\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int findNumberOfLIS(int[] nums) {\n    int n = nums.length;\n    int[] length = new int[n];\n    int[] count = new int[n];\n    Arrays.fill(length, 1);\n    Arrays.fill(count, 1);\n    int best = 1;\n\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < i; j++) {\n        if (nums[j] >= nums[i]) continue;\n        if (length[j] + 1 > length[i]) {\n          length[i] = length[j] + 1;\n          count[i] = count[j];\n        } else if (length[j] + 1 == length[i]) {\n          count[i] += count[j];\n        }\n      }\n      best = Math.max(best, length[i]);\n    }\n\n    int answer = 0;\n    for (int i = 0; i < n; i++) if (length[i] == best) answer += count[i];\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Russian Doll Envelopes",
      "difficulty": "Hard",
      "subpattern": "LIS after sorting with tie handling",
      "question": "Given envelopes [width, height], return the maximum number you can nest where both width and height strictly increase.",
      "trigger": "After sorting widths ascending and equal widths descending, the problem becomes LIS on heights.",
      "intuition": "Descending height for equal widths prevents envelopes with the same width from being counted together.",
      "edgeCases": "Equal widths, equal heights, one envelope, already sorted, all cannot nest.",
      "constraints": "1 <= envelopes.length <= 100000; 1 <= width,height <= 100000.",
      "source": {
        "label": "Russian Doll Envelopes - LeetCode 354",
        "url": "https://leetcode.com/problems/russian-doll-envelopes/"
      },
      "examples": [
        {
          "input": "envelopes = [[5,4],[6,4],[6,7],[2,3]]",
          "output": "3",
          "explanation": "One chain is [2,3] -> [5,4] -> [6,7]."
        },
        {
          "input": "envelopes = [[1,1],[1,1],[1,1]]",
          "output": "1",
          "explanation": "Equal widths cannot nest."
        },
        {
          "input": "envelopes = [[4,5],[4,6],[6,7],[2,3],[1,1]]",
          "output": "4",
          "explanation": "One chain is [1,1] -> [2,3] -> [4,5] -> [6,7]."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) after sorting; Space O(n). DP tries every previous envelope.",
      "optimizedComplexity": "Time O(n log n); Space O(n). Sort then run patience-style LIS on heights.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Memoized recursion chooses take or skip after sorting.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maxEnvelopes(int[][] envelopes) {\n    Arrays.sort(envelopes, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);\n    int[] dp = new int[envelopes.length];\n    Arrays.fill(dp, 1);\n    int best = 1;\n    for (int i = 0; i < envelopes.length; i++) {\n      for (int j = 0; j < i; j++) {\n        if (envelopes[j][0] < envelopes[i][0] && envelopes[j][1] < envelopes[i][1]) {\n          dp[i] = Math.max(dp[i], dp[j] + 1);\n        }\n      }\n      best = Math.max(best, dp[i]);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxEnvelopes(int[][] envelopes) {\n    Arrays.sort(envelopes, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);\n    int[] tails = new int[envelopes.length];\n    int size = 0;\n\n    for (int[] envelope : envelopes) {\n      int height = envelope[1];\n      int index = Arrays.binarySearch(tails, 0, size, height);\n      if (index < 0) index = -index - 1;\n      tails[index] = height;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxEnvelopes(int[][] envelopes) {\n    Arrays.sort(envelopes, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);\n    int[][] memo = new int[envelopes.length][envelopes.length + 1];\n    for (int[] row : memo) Arrays.fill(row, -1);\n    return dp(envelopes, 0, -1, memo);\n  }\n\n  private int dp(int[][] envelopes, int index, int previous, int[][] memo) {\n    if (index == envelopes.length) return 0;\n    if (memo[index][previous + 1] != -1) return memo[index][previous + 1];\n    int skip = dp(envelopes, index + 1, previous, memo);\n    int take = 0;\n    if (previous == -1 || envelopes[previous][0] < envelopes[index][0] && envelopes[previous][1] < envelopes[index][1]) {\n      take = 1 + dp(envelopes, index + 1, index, memo);\n    }\n    memo[index][previous + 1] = Math.max(take, skip);\n    return memo[index][previous + 1];\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxEnvelopes(int[][] envelopes) {\n    Arrays.sort(envelopes, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);\n    int[] tails = new int[envelopes.length];\n    int size = 0;\n\n    for (int[] envelope : envelopes) {\n      int height = envelope[1];\n      int index = Arrays.binarySearch(tails, 0, size, height);\n      if (index < 0) index = -index - 1;\n      tails[index] = height;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxEnvelopes(int[][] envelopes) {\n    Arrays.sort(envelopes, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);\n    int[] tails = new int[envelopes.length];\n    int size = 0;\n\n    for (int[] envelope : envelopes) {\n      int height = envelope[1];\n      int index = Arrays.binarySearch(tails, 0, size, height);\n      if (index < 0) index = -index - 1;\n      tails[index] = height;\n      if (index == size) size++;\n    }\n    return size;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Jump Game",
      "difficulty": "Medium",
      "subpattern": "Reachability DP on a line",
      "question": "Given nums where nums[i] is maximum jump length from i, return true if you can reach the last index from index 0.",
      "trigger": "Each index is reachable if some previously reachable index can jump to it, or greedily if it is within the farthest reach.",
      "intuition": "Track the farthest reachable index while scanning; if the scan passes it, the end is unreachable.",
      "edgeCases": "Single element, zero at start, zero trap in middle, far jump over zeros, already reachable end.",
      "constraints": "1 <= nums.length <= 10000; 0 <= nums[i] <= 100000.",
      "source": {
        "label": "Jump Game - LeetCode 55",
        "url": "https://leetcode.com/problems/jump-game/"
      },
      "examples": [
        {
          "input": "nums = [2,3,1,1,4]",
          "output": "true",
          "explanation": "Jump from index 0 to 1, then to the last index."
        },
        {
          "input": "nums = [3,2,1,0,4]",
          "output": "false",
          "explanation": "Index 3 blocks all progress."
        },
        {
          "input": "nums = [0]",
          "output": "true",
          "explanation": "You are already at the last index."
        }
      ],
      "bruteForceComplexity": "Time exponential in n; Space O(n). Plain recursion tries every jump length from each index.",
      "optimizedComplexity": "Time O(n); Space O(1). Greedy DP tracks farthest reachable index.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Memoized recursion stores whether each index can reach the end.",
      "bruteForceCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    return jump(nums, 0);\n  }\n\n  private boolean jump(int[] nums, int index) {\n    if (index >= nums.length - 1) return true;\n    for (int step = 1; step <= nums[index]; step++) {\n      if (jump(nums, index + step)) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canJump(int[] nums) {\n    Boolean[] memo = new Boolean[nums.length];\n    return dp(nums, 0, memo);\n  }\n\n  private boolean dp(int[] nums, int index, Boolean[] memo) {\n    if (index >= nums.length - 1) return true;\n    if (memo[index] != null) return memo[index];\n    int farthest = Math.min(nums.length - 1, index + nums[index]);\n    for (int next = index + 1; next <= farthest; next++) {\n      if (dp(nums, next, memo)) return memo[index] = true;\n    }\n    return memo[index] = false;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}",
      "code": "class Solution {\n  public boolean canJump(int[] nums) {\n    int farthest = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (i > farthest) return false;\n      farthest = Math.max(farthest, i + nums[i]);\n      if (farthest >= nums.length - 1) return true;\n    }\n    return true;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Jump Game II",
      "difficulty": "Medium",
      "subpattern": "Minimum jumps DP on a line",
      "question": "Given nums where nums[i] is maximum jump length from i, return the minimum number of jumps needed to reach the last index.",
      "trigger": "The minimum jumps to an index can be derived from reachable previous ranges, or optimized by BFS-like greedy layers.",
      "intuition": "Each greedy range represents all indices reachable with the current jump count; when the range ends, take one jump.",
      "edgeCases": "Single element, direct jump to end, zeros after reachable jump, many small jumps, large first jump.",
      "constraints": "1 <= nums.length <= 10000; 0 <= nums[i] <= 1000; the end is always reachable.",
      "source": {
        "label": "Jump Game II - LeetCode 45",
        "url": "https://leetcode.com/problems/jump-game-ii/"
      },
      "examples": [
        {
          "input": "nums = [2,3,1,1,4]",
          "output": "2",
          "explanation": "Jump 0 -> 1 -> 4."
        },
        {
          "input": "nums = [2,3,0,1,4]",
          "output": "2",
          "explanation": "Jump 0 -> 1 -> 4."
        },
        {
          "input": "nums = [0]",
          "output": "0",
          "explanation": "No jump is needed."
        }
      ],
      "bruteForceComplexity": "Time exponential in n; Space O(n). Plain recursion tries every jump option.",
      "optimizedComplexity": "Time O(n); Space O(1). Greedy layer expansion counts jumps like BFS over ranges.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Memoized recursion computes minimum jumps from each index.",
      "bruteForceCode": "class Solution {\n  public int jump(int[] nums) {\n    return search(nums, 0);\n  }\n\n  private int search(int[] nums, int index) {\n    if (index >= nums.length - 1) return 0;\n    int best = 1_000_000;\n    for (int step = 1; step <= nums[index]; step++) {\n      best = Math.min(best, 1 + search(nums, index + step));\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int jump(int[] nums) {\n    int jumps = 0;\n    int currentEnd = 0;\n    int farthest = 0;\n\n    for (int i = 0; i < nums.length - 1; i++) {\n      farthest = Math.max(farthest, i + nums[i]);\n      if (i == currentEnd) {\n        jumps++;\n        currentEnd = farthest;\n      }\n    }\n    return jumps;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int jump(int[] nums) {\n    int[] memo = new int[nums.length];\n    Arrays.fill(memo, -1);\n    return dp(nums, 0, memo);\n  }\n\n  private int dp(int[] nums, int index, int[] memo) {\n    if (index >= nums.length - 1) return 0;\n    if (memo[index] != -1) return memo[index];\n    int best = 1_000_000;\n    int farthest = Math.min(nums.length - 1, index + nums[index]);\n    for (int next = index + 1; next <= farthest; next++) {\n      best = Math.min(best, 1 + dp(nums, next, memo));\n    }\n    memo[index] = best;\n    return best;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int jump(int[] nums) {\n    int jumps = 0;\n    int currentEnd = 0;\n    int farthest = 0;\n\n    for (int i = 0; i < nums.length - 1; i++) {\n      farthest = Math.max(farthest, i + nums[i]);\n      if (i == currentEnd) {\n        jumps++;\n        currentEnd = farthest;\n      }\n    }\n    return jumps;\n  }\n}",
      "code": "class Solution {\n  public int jump(int[] nums) {\n    int jumps = 0;\n    int currentEnd = 0;\n    int farthest = 0;\n\n    for (int i = 0; i < nums.length - 1; i++) {\n      farthest = Math.max(farthest, i + nums[i]);\n      if (i == currentEnd) {\n        jumps++;\n        currentEnd = farthest;\n      }\n    }\n    return jumps;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Cost For Tickets",
      "difficulty": "Medium",
      "subpattern": "Calendar-day DP with pass transitions",
      "question": "Given travel days and costs for 1-day, 7-day, and 30-day passes, return the minimum cost to cover all travel days.",
      "trigger": "The minimum cost up to a day depends on buying one of three passes ending at or covering that day.",
      "intuition": "For every calendar day, either carry previous cost on non-travel days or choose the cheapest pass transition.",
      "edgeCases": "Single travel day, consecutive month of travel, sparse travel days, all passes tie, last day near 365.",
      "constraints": "1 <= days.length <= 365; 1 <= days[i] <= 365; costs.length == 3.",
      "source": {
        "label": "Minimum Cost For Tickets - LeetCode 983",
        "url": "https://leetcode.com/problems/minimum-cost-for-tickets/"
      },
      "examples": [
        {
          "input": "days = [1,4,6,7,8,20], costs = [2,7,15]",
          "output": "11",
          "explanation": "Use a 1-day pass for day 1, a 7-day pass for 4-8, and a 1-day pass for day 20."
        },
        {
          "input": "days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]",
          "output": "17",
          "explanation": "A 30-day pass plus one 1-day pass is optimal."
        },
        {
          "input": "days = [365], costs = [3,10,20]",
          "output": "3",
          "explanation": "A single 1-day pass is cheapest."
        }
      ],
      "bruteForceComplexity": "Time O(3^n); Space O(n). Plain recursion tries every pass at each uncovered travel day.",
      "optimizedComplexity": "Time O(365 + n); Space O(366). Calendar DP is constant bounded by days in a year.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion jumps to the next uncovered day after each pass.",
      "bruteForceCode": "class Solution {\n  public int mincostTickets(int[] days, int[] costs) {\n    return buy(days, costs, 0);\n  }\n\n  private int buy(int[] days, int[] costs, int index) {\n    if (index == days.length) return 0;\n    int one = costs[0] + buy(days, costs, next(days, index, days[index] + 1));\n    int seven = costs[1] + buy(days, costs, next(days, index, days[index] + 7));\n    int thirty = costs[2] + buy(days, costs, next(days, index, days[index] + 30));\n    return Math.min(one, Math.min(seven, thirty));\n  }\n\n  private int next(int[] days, int index, int limit) {\n    while (index < days.length && days[index] < limit) index++;\n    return index;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int mincostTickets(int[] days, int[] costs) {\n    boolean[] travel = new boolean[366];\n    for (int day : days) travel[day] = true;\n    int[] dp = new int[366];\n\n    for (int day = 1; day <= 365; day++) {\n      if (!travel[day]) {\n        dp[day] = dp[day - 1];\n      } else {\n        int one = dp[Math.max(0, day - 1)] + costs[0];\n        int seven = dp[Math.max(0, day - 7)] + costs[1];\n        int thirty = dp[Math.max(0, day - 30)] + costs[2];\n        dp[day] = Math.min(one, Math.min(seven, thirty));\n      }\n    }\n    return dp[365];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int mincostTickets(int[] days, int[] costs) {\n    int[] memo = new int[days.length];\n    Arrays.fill(memo, -1);\n    return dp(days, costs, 0, memo);\n  }\n\n  private int dp(int[] days, int[] costs, int index, int[] memo) {\n    if (index == days.length) return 0;\n    if (memo[index] != -1) return memo[index];\n    int one = costs[0] + dp(days, costs, next(days, index, days[index] + 1), memo);\n    int seven = costs[1] + dp(days, costs, next(days, index, days[index] + 7), memo);\n    int thirty = costs[2] + dp(days, costs, next(days, index, days[index] + 30), memo);\n    memo[index] = Math.min(one, Math.min(seven, thirty));\n    return memo[index];\n  }\n\n  private int next(int[] days, int index, int limit) {\n    while (index < days.length && days[index] < limit) index++;\n    return index;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int mincostTickets(int[] days, int[] costs) {\n    boolean[] travel = new boolean[366];\n    for (int day : days) travel[day] = true;\n    int[] dp = new int[366];\n\n    for (int day = 1; day <= 365; day++) {\n      if (!travel[day]) {\n        dp[day] = dp[day - 1];\n      } else {\n        int one = dp[Math.max(0, day - 1)] + costs[0];\n        int seven = dp[Math.max(0, day - 7)] + costs[1];\n        int thirty = dp[Math.max(0, day - 30)] + costs[2];\n        dp[day] = Math.min(one, Math.min(seven, thirty));\n      }\n    }\n    return dp[365];\n  }\n}",
      "code": "class Solution {\n  public int mincostTickets(int[] days, int[] costs) {\n    boolean[] travel = new boolean[366];\n    for (int day : days) travel[day] = true;\n    int[] dp = new int[366];\n\n    for (int day = 1; day <= 365; day++) {\n      if (!travel[day]) {\n        dp[day] = dp[day - 1];\n      } else {\n        int one = dp[Math.max(0, day - 1)] + costs[0];\n        int seven = dp[Math.max(0, day - 7)] + costs[1];\n        int thirty = dp[Math.max(0, day - 30)] + costs[2];\n        dp[day] = Math.min(one, Math.min(seven, thirty));\n      }\n    }\n    return dp[365];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Domino and Tromino Tiling",
      "difficulty": "Medium",
      "subpattern": "Tiling recurrence with full and partial states",
      "question": "Given n, return the number of ways to tile a 2 x n board using dominoes and trominoes, modulo 1e9 + 7.",
      "trigger": "Tiling column i depends on fully covered previous columns and partially covered shapes.",
      "intuition": "Use full[i] for fully tiled boards and partial[i] for one-cell-missing frontier states.",
      "edgeCases": "n = 1, n = 2, modulo arithmetic, tromino introduces partial states, large n.",
      "constraints": "1 <= n <= 1000.",
      "source": {
        "label": "Domino and Tromino Tiling - LeetCode 790",
        "url": "https://leetcode.com/problems/domino-and-tromino-tiling/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "5",
          "explanation": "There are five tilings of a 2 x 3 board."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "Only one vertical domino fits."
        },
        {
          "input": "n = 4",
          "output": "11",
          "explanation": "The recurrence gives eleven tilings."
        }
      ],
      "bruteForceComplexity": "Time exponential in n; Space O(n). Plain recursion branches over possible tile placements.",
      "optimizedComplexity": "Time O(n); Space O(1). Full and partial state recurrences need only previous columns.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion stores full and partial states.",
      "bruteForceCode": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int numTilings(int n) {\n    return full(n);\n  }\n\n  private int full(int n) {\n    if (n == 0 || n == 1) return 1;\n    if (n == 2) return 2;\n    long ways = full(n - 1) + full(n - 2) + 2L * partial(n - 1);\n    return (int) (ways % MOD);\n  }\n\n  private int partial(int n) {\n    if (n <= 1) return 0;\n    long ways = partial(n - 1) + full(n - 2);\n    return (int) (ways % MOD);\n  }\n}",
      "iterativeCode": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int numTilings(int n) {\n    long fullPrev2 = 1;\n    long fullPrev1 = 1;\n    long partialPrev1 = 0;\n\n    for (int col = 2; col <= n; col++) {\n      long full = (fullPrev1 + fullPrev2 + 2 * partialPrev1) % MOD;\n      long partial = (partialPrev1 + fullPrev2) % MOD;\n      fullPrev2 = fullPrev1;\n      fullPrev1 = full;\n      partialPrev1 = partial;\n    }\n    return (int) fullPrev1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int numTilings(int n) {\n    long[][] memo = new long[n + 1][2];\n    for (long[] row : memo) Arrays.fill(row, -1);\n    return (int) full(n, memo);\n  }\n\n  private long full(int n, long[][] memo) {\n    if (n == 0 || n == 1) return 1;\n    if (n == 2) return 2;\n    if (memo[n][0] != -1) return memo[n][0];\n    memo[n][0] = (full(n - 1, memo) + full(n - 2, memo) + 2 * partial(n - 1, memo)) % MOD;\n    return memo[n][0];\n  }\n\n  private long partial(int n, long[][] memo) {\n    if (n <= 1) return 0;\n    if (memo[n][1] != -1) return memo[n][1];\n    memo[n][1] = (partial(n - 1, memo) + full(n - 2, memo)) % MOD;\n    return memo[n][1];\n  }\n}",
      "optimizedCode": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int numTilings(int n) {\n    long fullPrev2 = 1;\n    long fullPrev1 = 1;\n    long partialPrev1 = 0;\n\n    for (int col = 2; col <= n; col++) {\n      long full = (fullPrev1 + fullPrev2 + 2 * partialPrev1) % MOD;\n      long partial = (partialPrev1 + fullPrev2) % MOD;\n      fullPrev2 = fullPrev1;\n      fullPrev1 = full;\n      partialPrev1 = partial;\n    }\n    return (int) fullPrev1;\n  }\n}",
      "code": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int numTilings(int n) {\n    long fullPrev2 = 1;\n    long fullPrev1 = 1;\n    long partialPrev1 = 0;\n\n    for (int col = 2; col <= n; col++) {\n      long full = (fullPrev1 + fullPrev2 + 2 * partialPrev1) % MOD;\n      long partial = (partialPrev1 + fullPrev2) % MOD;\n      fullPrev2 = fullPrev1;\n      fullPrev1 = full;\n      partialPrev1 = partial;\n    }\n    return (int) fullPrev1;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count Vowels Permutation",
      "difficulty": "Hard",
      "subpattern": "Finite-state counting DP",
      "question": "Given n, count strings of length n made of vowels where each vowel may only be followed by specific vowels. Return count modulo 1e9 + 7.",
      "trigger": "The next count depends only on the previous counts for five vowel states.",
      "intuition": "Maintain counts ending in a, e, i, o, u and apply the allowed transition rules each step.",
      "edgeCases": "n = 1, modulo arithmetic, all transitions from previous states, large n.",
      "constraints": "1 <= n <= 20000.",
      "source": {
        "label": "Count Vowels Permutation - LeetCode 1220",
        "url": "https://leetcode.com/problems/count-vowels-permutation/"
      },
      "examples": [
        {
          "input": "n = 1",
          "output": "5",
          "explanation": "Each single vowel is valid."
        },
        {
          "input": "n = 2",
          "output": "10",
          "explanation": "Ten length-two strings satisfy the rules."
        },
        {
          "input": "n = 5",
          "output": "68",
          "explanation": "The state recurrence gives 68 valid strings."
        }
      ],
      "bruteForceComplexity": "Time exponential in n; Space O(n). Plain recursion branches through allowed next vowels.",
      "optimizedComplexity": "Time O(n); Space O(1). Keep five vowel-ending counts.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion stores remaining length and current vowel.",
      "bruteForceCode": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int countVowelPermutation(int n) {\n    long total = 0;\n    for (int vowel = 0; vowel < 5; vowel++) total += count(n - 1, vowel);\n    return (int) (total % MOD);\n  }\n\n  private long count(int remaining, int vowel) {\n    if (remaining == 0) return 1;\n    long total = 0;\n    for (int next : nextVowels(vowel)) total = (total + count(remaining - 1, next)) % MOD;\n    return total;\n  }\n\n  private int[] nextVowels(int vowel) {\n    if (vowel == 0) return new int[] {1};\n    if (vowel == 1) return new int[] {0, 2};\n    if (vowel == 2) return new int[] {0, 1, 3, 4};\n    if (vowel == 3) return new int[] {2, 4};\n    return new int[] {0};\n  }\n}",
      "iterativeCode": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int countVowelPermutation(int n) {\n    long a = 1, e = 1, i = 1, o = 1, u = 1;\n\n    for (int length = 2; length <= n; length++) {\n      long nextA = (e + i + u) % MOD;\n      long nextE = (a + i) % MOD;\n      long nextI = (e + o) % MOD;\n      long nextO = i;\n      long nextU = (i + o) % MOD;\n      a = nextA;\n      e = nextE;\n      i = nextI;\n      o = nextO;\n      u = nextU;\n    }\n    return (int) ((a + e + i + o + u) % MOD);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int countVowelPermutation(int n) {\n    long[][] memo = new long[n][5];\n    for (long[] row : memo) Arrays.fill(row, -1);\n    long total = 0;\n    for (int vowel = 0; vowel < 5; vowel++) total = (total + dp(n - 1, vowel, memo)) % MOD;\n    return (int) total;\n  }\n\n  private long dp(int remaining, int vowel, long[][] memo) {\n    if (remaining == 0) return 1;\n    if (memo[remaining][vowel] != -1) return memo[remaining][vowel];\n    long total = 0;\n    for (int next : nextVowels(vowel)) total = (total + dp(remaining - 1, next, memo)) % MOD;\n    memo[remaining][vowel] = total;\n    return total;\n  }\n\n  private int[] nextVowels(int vowel) {\n    if (vowel == 0) return new int[] {1};\n    if (vowel == 1) return new int[] {0, 2};\n    if (vowel == 2) return new int[] {0, 1, 3, 4};\n    if (vowel == 3) return new int[] {2, 4};\n    return new int[] {0};\n  }\n}",
      "optimizedCode": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int countVowelPermutation(int n) {\n    long a = 1, e = 1, i = 1, o = 1, u = 1;\n\n    for (int length = 2; length <= n; length++) {\n      long nextA = (e + i + u) % MOD;\n      long nextE = (a + i) % MOD;\n      long nextI = (e + o) % MOD;\n      long nextO = i;\n      long nextU = (i + o) % MOD;\n      a = nextA;\n      e = nextE;\n      i = nextI;\n      o = nextO;\n      u = nextU;\n    }\n    return (int) ((a + e + i + o + u) % MOD);\n  }\n}",
      "code": "class Solution {\n  static final int MOD = 1_000_000_007;\n\n  public int countVowelPermutation(int n) {\n    long a = 1, e = 1, i = 1, o = 1, u = 1;\n\n    for (int length = 2; length <= n; length++) {\n      long nextA = (e + i + u) % MOD;\n      long nextE = (a + i) % MOD;\n      long nextI = (e + o) % MOD;\n      long nextO = i;\n      long nextU = (i + o) % MOD;\n      a = nextA;\n      e = nextE;\n      i = nextI;\n      o = nextO;\n      u = nextU;\n    }\n    return (int) ((a + e + i + o + u) % MOD);\n  }\n}"
    }
  ],
  "checklist": [
    "The problem asks for best, count, possible/impossible, or minimum cost over a linear index or amount.",
    "A choice at i depends on earlier states such as i - 1, i - 2, remaining amount, or previous value.",
    "Naive recursion repeats the same index, amount, target, or state many times.",
    "There is a small state that summarizes the past: previous two values, take/skip, hold/cash, or reachable sum.",
    "The answer can be built left-to-right, right-to-left, or from smaller amounts to larger amounts."
  ],
  "traps": [
    "Writing recursion without identifying the repeated state key.",
    "Using ascending sum loops for 0/1 subset DP and accidentally reusing the same item.",
    "Mixing combinations and permutations in coin-change style problems.",
    "Forgetting negative values require both max and min product states.",
    "Ignoring circular adjacency in House Robber II.",
    "Missing zero handling in Decode Ways.",
    "Using greedy for a problem that actually asks for count or minimum over all choices."
  ],
  "edgeCases": [
    "Length one or length two inputs.",
    "Target amount or sum equal to zero.",
    "All negative numbers for maximum subarray-style problems.",
    "Zeros in strings, arrays, or jump lengths.",
    "Odd total sum for equal partition.",
    "Duplicate values in LIS and strict-increase problems.",
    "Modulo arithmetic for counting recurrences."
  ],
  "complexities": [
    "Fibonacci-style recurrence: O(n) time and O(1) space after compression.",
    "Take/skip line DP: O(n) time, usually O(1) space if only previous two states are needed.",
    "Amount/target DP: O(n * target) or O(coins * amount) time, O(target) space when compressed.",
    "LIS classic DP: O(n^2); patience sorting optimization: O(n log n).",
    "Stock state-machine DP: O(n) time and O(1) space with fixed states.",
    "Recursive memoized DP space equals number of unique states plus call-stack depth.",
    "Brute force usually branches exponentially before memoization."
  ],
  "mentalModel": [
    "Define dp state in one sentence before writing transitions.",
    "Decide whether the state means best up to i, best ending at i, or ways to make amount i.",
    "Write the brute recurrence first, then memoize, then compress space if dependencies are local.",
    "Loop direction matters: high-to-low for 0/1 choice, low-to-high for unbounded reuse.",
    "For state machines, name each state by what you currently hold or are allowed to do next."
  ],
  "revisionStrategy": [
    "Day 1: redo Climbing Stairs, Min Cost Stairs, House Robber, Decode Ways, and Coin Change.",
    "Day 2: redo Coin Change II, Combination Sum IV, Partition Equal Subset Sum, and Word Break while stating loop direction.",
    "Day 4: redo LIS, Longest Arithmetic Subsequence, Max Product Subarray, and Stock with Cooldown.",
    "Day 7: mix five random 1D DP problems and write only the state plus transition first.",
    "Before interviews: practice converting brute recursion to memoization to iterative tabulation in one pass."
  ],
  "unseen": [
    "Given a line of tasks with cooldowns, maximize total reward by choosing non-conflicting tasks.",
    "Given coin values and a target, count ordered sequences with exactly k coins.",
    "Given a string of digits and wildcard stars, count valid decodings modulo a large prime.",
    "Given daily prices with at most two transactions, return maximum profit.",
    "Given jump lengths and landing costs, return the cheapest way to reach the last index."
  ]
};
