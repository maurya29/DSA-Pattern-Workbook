const CURRENT_PATTERN = {
  "id": "backtracking",
  "name": "Backtracking",
  "summary": "Subsets, permutations, combinations, constraint search.",
  "complete": true,
  "subpatterns": [
    "Subset include/exclude backtracking",
    "Permutation and used-state backtracking",
    "Combination start-index backtracking",
    "Constraint search with pruning",
    "Grid/path backtracking with visited state",
    "Partition and bucket backtracking",
    "Expression/string construction backtracking",
    "Memoized backtracking for repeated states"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Subsets",
      "difficulty": "Medium",
      "subpattern": "Subset include/exclude backtracking",
      "question": "Given an integer array nums with unique elements, return all possible subsets. The solution set must not contain duplicate subsets.",
      "trigger": "Every element creates a binary decision: include it in the current subset or skip it.",
      "intuition": "Walk index by index. Record the current path, then try adding each later element and undo after returning.",
      "edgeCases": "Empty result subset, one element, unique values, output order not important, exponential output size.",
      "constraints": "1 <= nums.length <= 10; -10 <= nums[i] <= 10; all elements are unique.",
      "source": {
        "label": "Subsets - LeetCode 78",
        "url": "https://leetcode.com/problems/subsets/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]",
          "explanation": "Each number is either chosen or skipped."
        },
        {
          "input": "nums = [0]",
          "output": "[[],[0]]",
          "explanation": "There are two subsets for one element."
        },
        {
          "input": "nums = [1,2]",
          "output": "[[],[1],[1,2],[2]]",
          "explanation": "There are four subsets."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n * 2^n). Bitmasks enumerate every subset.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(n * 2^n). Iterative expansion doubles the result set for each number.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(n) recursion stack excluding output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    int total = 1 << nums.length;\n    for (int mask = 0; mask < total; mask++) {\n      List<Integer> subset = new ArrayList<>();\n      for (int i = 0; i < nums.length; i++) {\n        if ((mask & (1 << i)) != 0) subset.add(nums[i]);\n      }\n      answer.add(subset);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(nums, 0, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> answer) {\n    answer.add(new ArrayList<>(path));\n    for (int i = start; i < nums.length; i++) {\n      path.add(nums[i]);\n      backtrack(nums, i + 1, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Subsets II",
      "difficulty": "Medium",
      "subpattern": "Subset backtracking with duplicate skipping",
      "question": "Given an integer array nums that may contain duplicates, return all possible subsets without duplicate subsets.",
      "trigger": "The subset choice tree has duplicate values, so equal values at the same recursion depth must be skipped.",
      "intuition": "Sort first. At each depth, skip nums[i] when it equals nums[i - 1] and i is not the first candidate at that depth.",
      "edgeCases": "All duplicates, no duplicates, single value, empty subset, duplicate values separated before sorting.",
      "constraints": "1 <= nums.length <= 10; -10 <= nums[i] <= 10.",
      "source": {
        "label": "Subsets II - LeetCode 90",
        "url": "https://leetcode.com/problems/subsets-ii/"
      },
      "examples": [
        {
          "input": "nums = [1,2,2]",
          "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
          "explanation": "The duplicate subset [2] appears only once."
        },
        {
          "input": "nums = [0]",
          "output": "[[],[0]]",
          "explanation": "One element still has two subsets."
        },
        {
          "input": "nums = [2,2,2]",
          "output": "[[],[2],[2,2],[2,2,2]]",
          "explanation": "Only different counts of value 2 matter."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n log 2^n); Space O(n * 2^n). Generate all masks and deduplicate by set key.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(n * 2^n). Iterative expansion only extends subsets created in the previous round for duplicates.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(n) stack excluding output. Sorted backtracking skips same-depth duplicates.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsetsWithDup(int[] nums) {\n    Arrays.sort(nums);\n    Set<List<Integer>> unique = new LinkedHashSet<>();\n    int total = 1 << nums.length;\n    for (int mask = 0; mask < total; mask++) {\n      List<Integer> subset = new ArrayList<>();\n      for (int i = 0; i < nums.length; i++) {\n        if ((mask & (1 << i)) != 0) subset.add(nums[i]);\n      }\n      unique.add(subset);\n    }\n    return new ArrayList<>(unique);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsetsWithDup(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    int previousStart = 0;\n    int previousEnd = 0;\n\n    for (int i = 0; i < nums.length; i++) {\n      int start = i > 0 && nums[i] == nums[i - 1] ? previousStart : 0;\n      previousStart = answer.size();\n      previousEnd = answer.size();\n      for (int j = start; j < previousEnd; j++) {\n        List<Integer> next = new ArrayList<>(answer.get(j));\n        next.add(nums[i]);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsetsWithDup(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(nums, 0, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> answer) {\n    answer.add(new ArrayList<>(path));\n    for (int i = start; i < nums.length; i++) {\n      if (i > start && nums[i] == nums[i - 1]) continue;\n      path.add(nums[i]);\n      backtrack(nums, i + 1, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsetsWithDup(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    int previousStart = 0;\n    int previousEnd = 0;\n\n    for (int i = 0; i < nums.length; i++) {\n      int start = i > 0 && nums[i] == nums[i - 1] ? previousStart : 0;\n      previousStart = answer.size();\n      previousEnd = answer.size();\n      for (int j = start; j < previousEnd; j++) {\n        List<Integer> next = new ArrayList<>(answer.get(j));\n        next.add(nums[i]);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsetsWithDup(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    int previousStart = 0;\n    int previousEnd = 0;\n\n    for (int i = 0; i < nums.length; i++) {\n      int start = i > 0 && nums[i] == nums[i - 1] ? previousStart : 0;\n      previousStart = answer.size();\n      previousEnd = answer.size();\n      for (int j = start; j < previousEnd; j++) {\n        List<Integer> next = new ArrayList<>(answer.get(j));\n        next.add(nums[i]);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Permutations",
      "difficulty": "Medium",
      "subpattern": "Permutation backtracking with used-state",
      "question": "Given an array nums of distinct integers, return all possible permutations.",
      "trigger": "Every output position chooses one currently unused value.",
      "intuition": "Track used indexes. Append an unused value, recurse to the next position, then undo the choice.",
      "edgeCases": "One element, negative values, distinct values, output order not important, factorial output size.",
      "constraints": "1 <= nums.length <= 6; -10 <= nums[i] <= 10; all values are unique.",
      "source": {
        "label": "Permutations - LeetCode 46",
        "url": "https://leetcode.com/problems/permutations/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
          "explanation": "All 3! orderings are returned."
        },
        {
          "input": "nums = [0,1]",
          "output": "[[0,1],[1,0]]",
          "explanation": "Two values have two orders."
        },
        {
          "input": "nums = [1]",
          "output": "[[1]]",
          "explanation": "One value has one permutation."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n); Space O(n). Lexicographic next permutation enumerates all orderings.",
      "optimizedComplexity": "Time O(n! * n); Space O(n! * n). Iterative insertion builds permutations level by level.",
      "recursiveComplexity": "Time O(n! * n); Space O(n) stack excluding output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    do {\n      List<Integer> current = new ArrayList<>();\n      for (int num : nums) current.add(num);\n      answer.add(current);\n    } while (nextPermutation(nums));\n    return answer;\n  }\n\n  private boolean nextPermutation(int[] nums) {\n    int i = nums.length - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i < 0) return false;\n    int j = nums.length - 1;\n    while (nums[j] <= nums[i]) j--;\n    swap(nums, i, j);\n    reverse(nums, i + 1, nums.length - 1);\n    return true;\n  }\n\n  private void reverse(int[] nums, int left, int right) {\n    while (left < right) swap(nums, left++, right--);\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(nums, new boolean[nums.length], new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> answer) {\n    if (path.size() == nums.length) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n    for (int i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      path.add(nums[i]);\n      backtrack(nums, used, path, answer);\n      path.remove(path.size() - 1);\n      used[i] = false;\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Permutations II",
      "difficulty": "Medium",
      "subpattern": "Permutation backtracking with duplicate skipping",
      "question": "Given a collection of numbers nums that may contain duplicates, return all unique permutations.",
      "trigger": "Permutation generation has duplicate values, so equal values must be skipped unless the previous equal value is already used in the current branch.",
      "intuition": "Sort nums. For each index, skip used values and skip duplicate values whose previous copy has not been used at this depth.",
      "edgeCases": "All duplicates, no duplicates, single value, duplicate values with different positions, factorial output size.",
      "constraints": "1 <= nums.length <= 8; -10 <= nums[i] <= 10.",
      "source": {
        "label": "Permutations II - LeetCode 47",
        "url": "https://leetcode.com/problems/permutations-ii/"
      },
      "examples": [
        {
          "input": "nums = [1,1,2]",
          "output": "[[1,1,2],[1,2,1],[2,1,1]]",
          "explanation": "Duplicate 1 values do not create duplicate permutations."
        },
        {
          "input": "nums = [1,2,3]",
          "output": "six permutations",
          "explanation": "With all unique values, all 3! permutations appear."
        },
        {
          "input": "nums = [2,2]",
          "output": "[[2,2]]",
          "explanation": "Only one unique ordering exists."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n log n); Space O(n! * n). Generate permutations and deduplicate by set.",
      "optimizedComplexity": "Time O(uniquePermutations * n); Space O(uniquePermutations * n). Iterative insertion skips same insertion positions for duplicates.",
      "recursiveComplexity": "Time O(uniquePermutations * n); Space O(n) stack excluding output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permuteUnique(int[] nums) {\n    Set<List<Integer>> unique = new LinkedHashSet<>();\n    generate(nums, 0, unique);\n    return new ArrayList<>(unique);\n  }\n\n  private void generate(int[] nums, int index, Set<List<Integer>> unique) {\n    if (index == nums.length) {\n      List<Integer> perm = new ArrayList<>();\n      for (int num : nums) perm.add(num);\n      unique.add(perm);\n      return;\n    }\n    for (int i = index; i < nums.length; i++) {\n      swap(nums, index, i);\n      generate(nums, index + 1, unique);\n      swap(nums, index, i);\n    }\n  }\n\n  private void swap(int[] nums, int i, int j) {\n    int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permuteUnique(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          if (pos > 0 && perm.get(pos - 1) == num) break;\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permuteUnique(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(nums, new boolean[nums.length], new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> answer) {\n    if (path.size() == nums.length) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n    for (int i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;\n      used[i] = true;\n      path.add(nums[i]);\n      backtrack(nums, used, path, answer);\n      path.remove(path.size() - 1);\n      used[i] = false;\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permuteUnique(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          if (pos > 0 && perm.get(pos - 1) == num) break;\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> permuteUnique(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> nextLevel = new ArrayList<>();\n      for (List<Integer> perm : answer) {\n        for (int pos = 0; pos <= perm.size(); pos++) {\n          if (pos > 0 && perm.get(pos - 1) == num) break;\n          List<Integer> next = new ArrayList<>(perm);\n          next.add(pos, num);\n          nextLevel.add(next);\n        }\n      }\n      answer = nextLevel;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combinations",
      "difficulty": "Medium",
      "subpattern": "Combination start-index backtracking",
      "question": "Given n and k, return all possible combinations of k numbers chosen from 1 to n.",
      "trigger": "Combination order does not matter, so recursion uses a start index and only moves forward.",
      "intuition": "Choose the next number from start to n. Prune when not enough numbers remain to fill k.",
      "edgeCases": "k = 1, k = n, n = 1, pruning remaining choices, output order not important.",
      "constraints": "1 <= n <= 20; 1 <= k <= n.",
      "source": {
        "label": "Combinations - LeetCode 77",
        "url": "https://leetcode.com/problems/combinations/"
      },
      "examples": [
        {
          "input": "n = 4, k = 2",
          "output": "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
          "explanation": "Every size-2 choice is listed."
        },
        {
          "input": "n = 1, k = 1",
          "output": "[[1]]",
          "explanation": "Only one number exists."
        },
        {
          "input": "n = 3, k = 3",
          "output": "[[1,2,3]]",
          "explanation": "Choosing all numbers gives one combination."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n). Enumerate masks and keep masks with k bits.",
      "optimizedComplexity": "Time O(C(n,k) * k); Space O(k) stack state excluding output.",
      "recursiveComplexity": "Time O(C(n,k) * k); Space O(k) recursion stack excluding output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    int limit = 1 << n;\n    for (int mask = 0; mask < limit; mask++) {\n      if (Integer.bitCount(mask) != k) continue;\n      List<Integer> current = new ArrayList<>();\n      for (int i = 0; i < n; i++) {\n        if ((mask & (1 << i)) != 0) current.add(i + 1);\n      }\n      answer.add(current);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int num = n; num >= state.start; num--) {\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start; List<Integer> path;\n    State(int start, List<Integer> path) { this.start = start; this.path = path; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(1, n, k, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int start, int n, int k, List<Integer> path, List<List<Integer>> answer) {\n    if (path.size() == k) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n    int need = k - path.size();\n    for (int num = start; num <= n - need + 1; num++) {\n      path.add(num);\n      backtrack(num + 1, n, k, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int num = n; num >= state.start; num--) {\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start; List<Integer> path;\n    State(int start, List<Integer> path) { this.start = start; this.path = path; }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        answer.add(state.path);\n        continue;\n      }\n      for (int num = n; num >= state.start; num--) {\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start; List<Integer> path;\n    State(int start, List<Integer> path) { this.start = start; this.path = path; }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum",
      "difficulty": "Medium",
      "subpattern": "Combination backtracking with reusable choices",
      "question": "Given distinct candidates and a target, return all unique combinations where chosen numbers sum to target. The same number may be chosen unlimited times.",
      "trigger": "The current choice can be reused, so recursion calls the next state with the same index after selecting it.",
      "intuition": "Sort candidates. For each candidate at or after start, choose it, reduce remaining target, and recurse from the same index.",
      "edgeCases": "Target smaller than every candidate, exact target, repeated use of one number, unsorted candidates, pruning after remaining becomes negative.",
      "constraints": "1 <= candidates.length <= 30; 2 <= candidates[i] <= 40; candidates are distinct; 1 <= target <= 40.",
      "source": {
        "label": "Combination Sum - LeetCode 39",
        "url": "https://leetcode.com/problems/combination-sum/"
      },
      "examples": [
        {
          "input": "candidates = [2,3,6,7], target = 7",
          "output": "[[2,2,3],[7]]",
          "explanation": "2 can be reused and 7 is exact."
        },
        {
          "input": "candidates = [2,3,5], target = 8",
          "output": "[[2,2,2,2],[2,3,3],[3,5]]",
          "explanation": "All combinations sum to 8."
        },
        {
          "input": "candidates = [2], target = 1",
          "output": "[]",
          "explanation": "No combination can reach 1."
        }
      ],
      "bruteForceComplexity": "Time exponential in target/minCandidate; Space O(target/minCandidate). Include/skip explores many invalid states.",
      "optimizedComplexity": "Time exponential in output size; Space O(target/minCandidate). Iterative stack applies sorted pruning.",
      "recursiveComplexity": "Time exponential in output size; Space O(target/minCandidate). Backtracking prunes candidates above remaining target.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    List<List<Integer>> answer = new ArrayList<>();\n    search(candidates, 0, target, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void search(int[] candidates, int index, int remaining, List<Integer> path, List<List<Integer>> answer) {\n    if (remaining == 0) { answer.add(new ArrayList<>(path)); return; }\n    if (index == candidates.length || remaining < 0) return;\n    path.add(candidates[index]);\n    search(candidates, index, remaining - candidates[index], path, answer);\n    path.remove(path.size() - 1);\n    search(candidates, index + 1, remaining, path, answer);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) { answer.add(state.path); continue; }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(candidates, 0, target, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] candidates, int start, int remaining, List<Integer> path, List<List<Integer>> answer) {\n    if (remaining == 0) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n    for (int i = start; i < candidates.length && candidates[i] <= remaining; i++) {\n      path.add(candidates[i]);\n      backtrack(candidates, i, remaining - candidates[i], path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) { answer.add(state.path); continue; }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) { answer.add(state.path); continue; }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i, state.remaining - candidates[i], next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum II",
      "difficulty": "Medium",
      "subpattern": "Combination backtracking with single-use duplicates",
      "question": "Given candidates that may contain duplicates and a target, return all unique combinations where each candidate may be used at most once.",
      "trigger": "Choices move forward because each value can be used once, and duplicate values at the same depth must be skipped.",
      "intuition": "Sort candidates. Choose candidates from start onward; skip equal values when they appear after the first candidate at the same depth.",
      "edgeCases": "Duplicate candidates, target exact, no solution, candidate greater than remaining, many same values.",
      "constraints": "1 <= candidates.length <= 100; 1 <= candidates[i] <= 50; 1 <= target <= 30.",
      "source": {
        "label": "Combination Sum II - LeetCode 40",
        "url": "https://leetcode.com/problems/combination-sum-ii/"
      },
      "examples": [
        {
          "input": "candidates = [10,1,2,7,6,1,5], target = 8",
          "output": "[[1,1,6],[1,2,5],[1,7],[2,6]]",
          "explanation": "Each index is used at most once."
        },
        {
          "input": "candidates = [2,5,2,1,2], target = 5",
          "output": "[[1,2,2],[5]]",
          "explanation": "Duplicate 2 values are handled without duplicate combinations."
        },
        {
          "input": "candidates = [3], target = 2",
          "output": "[]",
          "explanation": "The only candidate is too large."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n * 2^n). Generate subsets and deduplicate combinations that sum to target.",
      "optimizedComplexity": "Time O(2^n); Space O(n). Iterative stack with sorted duplicate pruning.",
      "recursiveComplexity": "Time O(2^n); Space O(n). Backtracking skips same-depth duplicates and prunes large values.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    Set<List<Integer>> unique = new LinkedHashSet<>();\n    int total = 1 << candidates.length;\n    for (int mask = 0; mask < total; mask++) {\n      int sum = 0;\n      List<Integer> path = new ArrayList<>();\n      for (int i = 0; i < candidates.length; i++) {\n        if ((mask & (1 << i)) != 0) { sum += candidates[i]; path.add(candidates[i]); }\n      }\n      if (sum == target) unique.add(path);\n    }\n    return new ArrayList<>(unique);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) { answer.add(state.path); continue; }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (i > state.start && candidates[i] == candidates[i - 1]) continue;\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i + 1, state.remaining - candidates[i], next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(candidates, 0, target, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] candidates, int start, int remaining, List<Integer> path, List<List<Integer>> answer) {\n    if (remaining == 0) { answer.add(new ArrayList<>(path)); return; }\n    for (int i = start; i < candidates.length && candidates[i] <= remaining; i++) {\n      if (i > start && candidates[i] == candidates[i - 1]) continue;\n      path.add(candidates[i]);\n      backtrack(candidates, i + 1, remaining - candidates[i], path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) { answer.add(state.path); continue; }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (i > state.start && candidates[i] == candidates[i - 1]) continue;\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i + 1, state.remaining - candidates[i], next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n    Arrays.sort(candidates);\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, target, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.remaining == 0) { answer.add(state.path); continue; }\n      for (int i = candidates.length - 1; i >= state.start; i--) {\n        if (i > state.start && candidates[i] == candidates[i - 1]) continue;\n        if (candidates[i] > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(candidates[i]);\n        stack.push(new State(i + 1, state.remaining - candidates[i], next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Combination Sum III",
      "difficulty": "Medium",
      "subpattern": "Fixed-size combination backtracking",
      "question": "Find all valid combinations of k numbers that sum to n using only numbers 1 through 9, where each number is used at most once.",
      "trigger": "The state tracks both remaining count and remaining sum, and candidates always move forward.",
      "intuition": "Choose increasing numbers from 1..9. Stop when path size is k and remaining sum is zero.",
      "edgeCases": "k = 1, impossible target, target too small or too large, using each number once, pruning by remaining sum.",
      "constraints": "2 <= k <= 9; 1 <= n <= 60.",
      "source": {
        "label": "Combination Sum III - LeetCode 216",
        "url": "https://leetcode.com/problems/combination-sum-iii/"
      },
      "examples": [
        {
          "input": "k = 3, n = 7",
          "output": "[[1,2,4]]",
          "explanation": "Only 1 + 2 + 4 equals 7."
        },
        {
          "input": "k = 3, n = 9",
          "output": "[[1,2,6],[1,3,5],[2,3,4]]",
          "explanation": "Three valid size-3 combinations exist."
        },
        {
          "input": "k = 4, n = 1",
          "output": "[]",
          "explanation": "The target is too small for four positive numbers."
        }
      ],
      "bruteForceComplexity": "Time O(9 * 2^9); Space O(k). Enumerate every subset of 1..9 and filter by size and sum.",
      "optimizedComplexity": "Time O(C(9,k)); Space O(k). Iterative stack prunes by remaining count and sum.",
      "recursiveComplexity": "Time O(C(9,k)); Space O(k). Backtracking prunes candidates greater than remaining sum.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum3(int k, int n) {\n    List<List<Integer>> answer = new ArrayList<>();\n    for (int mask = 0; mask < (1 << 9); mask++) {\n      if (Integer.bitCount(mask) != k) continue;\n      int sum = 0;\n      List<Integer> path = new ArrayList<>();\n      for (int i = 0; i < 9; i++) {\n        if ((mask & (1 << i)) != 0) { sum += i + 1; path.add(i + 1); }\n      }\n      if (sum == n) answer.add(path);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum3(int k, int n) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, n, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        if (state.remaining == 0) answer.add(state.path);\n        continue;\n      }\n      for (int num = 9; num >= state.start; num--) {\n        if (num > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, state.remaining - num, next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum3(int k, int n) {\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(1, k, n, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int start, int k, int remaining, List<Integer> path, List<List<Integer>> answer) {\n    if (path.size() == k) {\n      if (remaining == 0) answer.add(new ArrayList<>(path));\n      return;\n    }\n    for (int num = start; num <= 9 && num <= remaining; num++) {\n      path.add(num);\n      backtrack(num + 1, k, remaining - num, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum3(int k, int n) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, n, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        if (state.remaining == 0) answer.add(state.path);\n        continue;\n      }\n      for (int num = 9; num >= state.start; num--) {\n        if (num > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, state.remaining - num, next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> combinationSum3(int k, int n) {\n    List<List<Integer>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(1, n, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.path.size() == k) {\n        if (state.remaining == 0) answer.add(state.path);\n        continue;\n      }\n      for (int num = 9; num >= state.start; num--) {\n        if (num > state.remaining) continue;\n        List<Integer> next = new ArrayList<>(state.path);\n        next.add(num);\n        stack.push(new State(num + 1, state.remaining - num, next));\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int start, remaining; List<Integer> path;\n    State(int start, int remaining, List<Integer> path) { this.start = start; this.remaining = remaining; this.path = path; }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Generate Parentheses",
      "difficulty": "Medium",
      "subpattern": "Constraint backtracking over valid prefixes",
      "question": "Given n pairs of parentheses, generate all combinations of well-formed parentheses.",
      "trigger": "Each prefix chooses open or close, but the prefix must never have more closes than opens.",
      "intuition": "Add open while open < n. Add close while close < open. A full-length path is valid by construction.",
      "edgeCases": "n = 1, close before open, all opens used, all closes used, Catalan-size output.",
      "constraints": "1 <= n <= 8.",
      "source": {
        "label": "Generate Parentheses - LeetCode 22",
        "url": "https://leetcode.com/problems/generate-parentheses/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
          "explanation": "All valid strings with three pairs are generated."
        },
        {
          "input": "n = 1",
          "output": "[\"()\"]",
          "explanation": "Only one valid string exists."
        },
        {
          "input": "n = 2",
          "output": "[\"(())\",\"()()\"]",
          "explanation": "Two valid strings exist."
        }
      ],
      "bruteForceComplexity": "Time O(2^(2n) * n); Space O(n). Generate every parentheses string and validate leaves.",
      "optimizedComplexity": "Time O(Cn * n); Space O(Cn * n). Iterative stack explores only valid prefixes.",
      "recursiveComplexity": "Time O(Cn * n); Space O(n) stack excluding output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    generate(new StringBuilder(), 2 * n, answer);\n    return answer;\n  }\n\n  private void generate(StringBuilder path, int length, List<String> answer) {\n    if (path.length() == length) {\n      if (valid(path)) answer.add(path.toString());\n      return;\n    }\n    path.append('('); generate(path, length, answer); path.deleteCharAt(path.length() - 1);\n    path.append(')'); generate(path, length, answer); path.deleteCharAt(path.length() - 1);\n  }\n\n  private boolean valid(StringBuilder path) {\n    int balance = 0;\n    for (int i = 0; i < path.length(); i++) {\n      balance += path.charAt(i) == '(' ? 1 : -1;\n      if (balance < 0) return false;\n    }\n    return balance == 0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(\"\", 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.value.length() == 2 * n) { answer.add(state.value); continue; }\n      if (state.close < state.open) stack.push(new State(state.value + \")\", state.open, state.close + 1));\n      if (state.open < n) stack.push(new State(state.value + \"(\", state.open + 1, state.close));\n    }\n    return answer;\n  }\n\n  private static class State {\n    String value; int open, close;\n    State(String value, int open, int close) { this.value = value; this.open = open; this.close = close; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    backtrack(n, 0, 0, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void backtrack(int n, int open, int close, StringBuilder path, List<String> answer) {\n    if (path.length() == 2 * n) { answer.add(path.toString()); return; }\n    if (open < n) {\n      path.append('(');\n      backtrack(n, open + 1, close, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n    if (close < open) {\n      path.append(')');\n      backtrack(n, open, close + 1, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(\"\", 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.value.length() == 2 * n) { answer.add(state.value); continue; }\n      if (state.close < state.open) stack.push(new State(state.value + \")\", state.open, state.close + 1));\n      if (state.open < n) stack.push(new State(state.value + \"(\", state.open + 1, state.close));\n    }\n    return answer;\n  }\n\n  private static class State {\n    String value; int open, close;\n    State(String value, int open, int close) { this.value = value; this.open = open; this.close = close; }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> generateParenthesis(int n) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(\"\", 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.value.length() == 2 * n) { answer.add(state.value); continue; }\n      if (state.close < state.open) stack.push(new State(state.value + \")\", state.open, state.close + 1));\n      if (state.open < n) stack.push(new State(state.value + \"(\", state.open + 1, state.close));\n    }\n    return answer;\n  }\n\n  private static class State {\n    String value; int open, close;\n    State(String value, int open, int close) { this.value = value; this.open = open; this.close = close; }\n  }\n}"
    },
    {
      "group": "core",
      "name": "Letter Combinations of a Phone Number",
      "difficulty": "Medium",
      "subpattern": "Cartesian-product backtracking",
      "question": "Given a string digits containing digits 2 through 9, return all possible letter combinations the number could represent.",
      "trigger": "Each digit maps to a set of letters; the search path chooses exactly one letter per digit.",
      "intuition": "At index i, iterate through the letters for digits[i], append one, recurse, then undo.",
      "edgeCases": "Empty input, one digit, digits 7 and 9 with four letters, output strings must match input length.",
      "constraints": "0 <= digits.length <= 4; digits[i] is between 2 and 9.",
      "source": {
        "label": "Letter Combinations of a Phone Number - LeetCode 17",
        "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
      },
      "examples": [
        {
          "input": "digits = \"23\"",
          "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
          "explanation": "Every 2-letter choice combines with every 3-letter choice."
        },
        {
          "input": "digits = \"\"",
          "output": "[]",
          "explanation": "No digits means no combinations."
        },
        {
          "input": "digits = \"2\"",
          "output": "[\"a\",\"b\",\"c\"]",
          "explanation": "Digit 2 maps to three letters."
        }
      ],
      "bruteForceComplexity": "Time O(4^n * n); Space O(4^n * n). Iterative cartesian product stores all prefixes.",
      "optimizedComplexity": "Time O(4^n * n); Space O(4^n * n). Queue expansion processes one digit level at a time.",
      "recursiveComplexity": "Time O(4^n * n); Space O(n) stack excluding output.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n    answer.add(\"\");\n    for (char digit : digits.toCharArray()) {\n      List<String> next = new ArrayList<>();\n      for (String prefix : answer) {\n        for (char ch : MAP[digit - '0'].toCharArray()) next.add(prefix + ch);\n      }\n      answer = next;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) queue.offer(prefix + ch);\n      }\n    }\n    answer.addAll(queue);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n    backtrack(digits, 0, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void backtrack(String digits, int index, StringBuilder path, List<String> answer) {\n    if (index == digits.length()) { answer.add(path.toString()); return; }\n    for (char ch : MAP[digits.charAt(index) - '0'].toCharArray()) {\n      path.append(ch);\n      backtrack(digits, index + 1, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) queue.offer(prefix + ch);\n      }\n    }\n    answer.addAll(queue);\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final String[] MAP = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\n\n  public List<String> letterCombinations(String digits) {\n    List<String> answer = new ArrayList<>();\n    if (digits.length() == 0) return answer;\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"\");\n    for (char digit : digits.toCharArray()) {\n      int size = queue.size();\n      for (int i = 0; i < size; i++) {\n        String prefix = queue.poll();\n        for (char ch : MAP[digit - '0'].toCharArray()) queue.offer(prefix + ch);\n      }\n    }\n    answer.addAll(queue);\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Palindrome Partitioning",
      "difficulty": "Medium",
      "subpattern": "String partition backtracking",
      "question": "Given a string s, partition it so that every substring in the partition is a palindrome. Return all possible palindrome partitionings.",
      "trigger": "At each index, the next cut can end at many positions, but only palindrome substrings are valid choices.",
      "intuition": "Try every palindrome prefix starting at index. Add it to the path, recurse from the next index, then remove it.",
      "edgeCases": "Single character, entire string palindrome, no multi-character palindrome, repeated letters, output order not important.",
      "constraints": "1 <= s.length <= 16; s contains lowercase English letters.",
      "source": {
        "label": "Palindrome Partitioning - LeetCode 131",
        "url": "https://leetcode.com/problems/palindrome-partitioning/"
      },
      "examples": [
        {
          "input": "s = \"aab\"",
          "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
          "explanation": "Both partitions contain only palindromes."
        },
        {
          "input": "s = \"a\"",
          "output": "[[\"a\"]]",
          "explanation": "A single character is a palindrome."
        },
        {
          "input": "s = \"efe\"",
          "output": "[[\"e\",\"f\",\"e\"],[\"efe\"]]",
          "explanation": "The whole string is also a palindrome."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n). Try every cut mask and validate every piece.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(n^2). Iterative stack uses precomputed palindrome table.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(n^2 + n). Backtracking uses a palindrome DP table.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> partition(String s) {\n    List<List<String>> answer = new ArrayList<>();\n    int cuts = 1 << (s.length() - 1);\n    for (int mask = 0; mask < cuts; mask++) {\n      List<String> path = new ArrayList<>();\n      int start = 0;\n      boolean valid = true;\n      for (int i = 0; i < s.length() - 1; i++) {\n        if ((mask & (1 << i)) != 0) {\n          String part = s.substring(start, i + 1);\n          if (!isPalindrome(part)) valid = false;\n          path.add(part);\n          start = i + 1;\n        }\n      }\n      String last = s.substring(start);\n      if (!isPalindrome(last)) valid = false;\n      path.add(last);\n      if (valid) answer.add(path);\n    }\n    return answer;\n  }\n\n  private boolean isPalindrome(String s) {\n    for (int l = 0, r = s.length() - 1; l < r; l++, r--) if (s.charAt(l) != s.charAt(r)) return false;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> partition(String s) {\n    boolean[][] pal = buildTable(s);\n    List<List<String>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == s.length()) { answer.add(state.path); continue; }\n      for (int end = s.length() - 1; end >= state.index; end--) {\n        if (!pal[state.index][end]) continue;\n        List<String> next = new ArrayList<>(state.path);\n        next.add(s.substring(state.index, end + 1));\n        stack.push(new State(end + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len <= n; len++) for (int l = 0; l + len - 1 < n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len <= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n\n  private static class State { int index; List<String> path; State(int index, List<String> path){this.index=index;this.path=path;} }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> partition(String s) {\n    List<List<String>> answer = new ArrayList<>();\n    boolean[][] pal = buildTable(s);\n    backtrack(s, 0, pal, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(String s, int index, boolean[][] pal, List<String> path, List<List<String>> answer) {\n    if (index == s.length()) { answer.add(new ArrayList<>(path)); return; }\n    for (int end = index; end < s.length(); end++) {\n      if (!pal[index][end]) continue;\n      path.add(s.substring(index, end + 1));\n      backtrack(s, end + 1, pal, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len <= n; len++) for (int l = 0; l + len - 1 < n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len <= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> partition(String s) {\n    boolean[][] pal = buildTable(s);\n    List<List<String>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == s.length()) { answer.add(state.path); continue; }\n      for (int end = s.length() - 1; end >= state.index; end--) {\n        if (!pal[state.index][end]) continue;\n        List<String> next = new ArrayList<>(state.path);\n        next.add(s.substring(state.index, end + 1));\n        stack.push(new State(end + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len <= n; len++) for (int l = 0; l + len - 1 < n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len <= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n\n  private static class State { int index; List<String> path; State(int index, List<String> path){this.index=index;this.path=path;} }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> partition(String s) {\n    boolean[][] pal = buildTable(s);\n    List<List<String>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == s.length()) { answer.add(state.path); continue; }\n      for (int end = s.length() - 1; end >= state.index; end--) {\n        if (!pal[state.index][end]) continue;\n        List<String> next = new ArrayList<>(state.path);\n        next.add(s.substring(state.index, end + 1));\n        stack.push(new State(end + 1, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean[][] buildTable(String s) {\n    int n = s.length(); boolean[][] pal = new boolean[n][n];\n    for (int len = 1; len <= n; len++) for (int l = 0; l + len - 1 < n; l++) {\n      int r = l + len - 1;\n      pal[l][r] = s.charAt(l) == s.charAt(r) && (len <= 2 || pal[l + 1][r - 1]);\n    }\n    return pal;\n  }\n\n  private static class State { int index; List<String> path; State(int index, List<String> path){this.index=index;this.path=path;} }\n}"
    },
    {
      "group": "core",
      "name": "Restore IP Addresses",
      "difficulty": "Medium",
      "subpattern": "Segment construction backtracking",
      "question": "Given a string containing only digits, return all possible valid IP addresses that can be formed by inserting three dots.",
      "trigger": "The search chooses four segments, each constrained by length, numeric value, and leading-zero rules.",
      "intuition": "Build exactly four segments. Each segment length is 1 to 3, value must be <= 255, and leading zeros are allowed only for segment 0.",
      "edgeCases": "Length less than 4, length greater than 12, leading zeros, segment value 255, exactly four segments required.",
      "constraints": "1 <= s.length <= 20; s contains only digits.",
      "source": {
        "label": "Restore IP Addresses - LeetCode 93",
        "url": "https://leetcode.com/problems/restore-ip-addresses/"
      },
      "examples": [
        {
          "input": "s = \"25525511135\"",
          "output": "[\"255.255.11.135\",\"255.255.111.35\"]",
          "explanation": "Both addresses have four valid segments."
        },
        {
          "input": "s = \"0000\"",
          "output": "[\"0.0.0.0\"]",
          "explanation": "Each segment is a single zero."
        },
        {
          "input": "s = \"101023\"",
          "output": "[\"1.0.10.23\",\"1.0.102.3\",\"10.1.0.23\",\"10.10.2.3\",\"101.0.2.3\"]",
          "explanation": "Multiple segment lengths are valid."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). Three cut positions have bounded choices, at most 9^3 checks.",
      "optimizedComplexity": "Time O(1); Space O(1). Iterative loops choose three cut positions with pruning.",
      "recursiveComplexity": "Time O(1); Space O(1). Backtracking depth is fixed at four segments.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> restoreIpAddresses(String s) {\n    List<String> answer = new ArrayList<>();\n    for (int a = 1; a <= 3; a++) for (int b = 1; b <= 3; b++) for (int c = 1; c <= 3; c++) {\n      int d = s.length() - a - b - c;\n      if (d < 1 || d > 3) continue;\n      String p1 = s.substring(0, a), p2 = s.substring(a, a + b);\n      String p3 = s.substring(a + b, a + b + c), p4 = s.substring(a + b + c);\n      if (valid(p1) && valid(p2) && valid(p3) && valid(p4)) answer.add(p1 + \".\" + p2 + \".\" + p3 + \".\" + p4);\n    }\n    return answer;\n  }\n\n  private boolean valid(String part) {\n    if (part.length() > 1 && part.charAt(0) == '0') return false;\n    return Integer.parseInt(part) <= 255;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> restoreIpAddresses(String s) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.parts.size() == 4) {\n        if (state.index == s.length()) answer.add(String.join(\".\", state.parts));\n        continue;\n      }\n      for (int len = 3; len >= 1; len--) {\n        if (state.index + len > s.length()) continue;\n        String part = s.substring(state.index, state.index + len);\n        if (!valid(part)) continue;\n        List<String> next = new ArrayList<>(state.parts);\n        next.add(part);\n        stack.push(new State(state.index + len, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean valid(String part) {\n    return !(part.length() > 1 && part.charAt(0) == '0') && Integer.parseInt(part) <= 255;\n  }\n\n  private static class State { int index; List<String> parts; State(int index, List<String> parts){this.index=index;this.parts=parts;} }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> restoreIpAddresses(String s) {\n    List<String> answer = new ArrayList<>();\n    backtrack(s, 0, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(String s, int index, List<String> parts, List<String> answer) {\n    if (parts.size() == 4) {\n      if (index == s.length()) answer.add(String.join(\".\", parts));\n      return;\n    }\n    for (int len = 1; len <= 3 && index + len <= s.length(); len++) {\n      String part = s.substring(index, index + len);\n      if (!valid(part)) continue;\n      parts.add(part);\n      backtrack(s, index + len, parts, answer);\n      parts.remove(parts.size() - 1);\n    }\n  }\n\n  private boolean valid(String part) {\n    return !(part.length() > 1 && part.charAt(0) == '0') && Integer.parseInt(part) <= 255;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> restoreIpAddresses(String s) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.parts.size() == 4) {\n        if (state.index == s.length()) answer.add(String.join(\".\", state.parts));\n        continue;\n      }\n      for (int len = 3; len >= 1; len--) {\n        if (state.index + len > s.length()) continue;\n        String part = s.substring(state.index, state.index + len);\n        if (!valid(part)) continue;\n        List<String> next = new ArrayList<>(state.parts);\n        next.add(part);\n        stack.push(new State(state.index + len, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean valid(String part) {\n    return !(part.length() > 1 && part.charAt(0) == '0') && Integer.parseInt(part) <= 255;\n  }\n\n  private static class State { int index; List<String> parts; State(int index, List<String> parts){this.index=index;this.parts=parts;} }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> restoreIpAddresses(String s) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new ArrayList<>()));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.parts.size() == 4) {\n        if (state.index == s.length()) answer.add(String.join(\".\", state.parts));\n        continue;\n      }\n      for (int len = 3; len >= 1; len--) {\n        if (state.index + len > s.length()) continue;\n        String part = s.substring(state.index, state.index + len);\n        if (!valid(part)) continue;\n        List<String> next = new ArrayList<>(state.parts);\n        next.add(part);\n        stack.push(new State(state.index + len, next));\n      }\n    }\n    return answer;\n  }\n\n  private boolean valid(String part) {\n    return !(part.length() > 1 && part.charAt(0) == '0') && Integer.parseInt(part) <= 255;\n  }\n\n  private static class State { int index; List<String> parts; State(int index, List<String> parts){this.index=index;this.parts=parts;} }\n}"
    },
    {
      "group": "advanced",
      "name": "Word Search",
      "difficulty": "Medium",
      "subpattern": "Grid/path backtracking with visited state",
      "question": "Given an m x n character board and a word, return true if the word exists in the grid by adjacent horizontal or vertical moves without reusing cells.",
      "trigger": "Every matched cell branches to up to four neighbors and must be unmarked after the path is tried.",
      "intuition": "Start from every matching first character. Mark the cell, search the next index in four directions, then restore it.",
      "edgeCases": "One-cell board, word length one, repeated letters, word longer than cell count, avoiding cell reuse.",
      "constraints": "1 <= m, n <= 6; 1 <= word.length <= 15.",
      "source": {
        "label": "Word Search - LeetCode 79",
        "url": "https://leetcode.com/problems/word-search/"
      },
      "examples": [
        {
          "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
          "output": "true",
          "explanation": "A valid adjacent path spells the word."
        },
        {
          "input": "board = same, word = \"SEE\"",
          "output": "true",
          "explanation": "SEE exists on the board."
        },
        {
          "input": "board = same, word = \"ABCB\"",
          "output": "false",
          "explanation": "The path would need to reuse B."
        }
      ],
      "bruteForceComplexity": "Time O(m*n*4^L); Space O(L). Try every path recursively with visited state.",
      "optimizedComplexity": "Time O(m*n*3^L); Space O(L). Iterative DFS avoids revisiting cells already in the path.",
      "recursiveComplexity": "Time O(m*n*3^L); Space O(L). In-place marking keeps visited state compact.",
      "bruteForceCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (search(board, word, r, c, 0, new boolean[board.length][board[0].length])) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean search(char[][] board, String word, int r, int c, int index, boolean[][] used) {\n    if (index == word.length()) return true;\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return false;\n    if (used[r][c] || board[r][c] != word.charAt(index)) return false;\n    used[r][c] = true;\n    boolean found = search(board, word, r + 1, c, index + 1, used) || search(board, word, r - 1, c, index + 1, used)\n        || search(board, word, r, c + 1, index + 1, used) || search(board, word, r, c - 1, index + 1, used);\n    used[r][c] = false;\n    return found;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {\n      if (board[r][c] != word.charAt(0)) continue;\n      Deque<State> stack = new ArrayDeque<>();\n      stack.push(new State(r, c, 0, new boolean[rows][cols]));\n      while (!stack.isEmpty()) {\n        State cur = stack.pop();\n        if (cur.row < 0 || cur.col < 0 || cur.row == rows || cur.col == cols) continue;\n        if (cur.used[cur.row][cur.col] || board[cur.row][cur.col] != word.charAt(cur.index)) continue;\n        if (cur.index == word.length() - 1) return true;\n        cur.used[cur.row][cur.col] = true;\n        for (int[] d : DIRS) stack.push(new State(cur.row + d[0], cur.col + d[1], cur.index + 1, copy(cur.used)));\n      }\n    }\n    return false;\n  }\n\n  private boolean[][] copy(boolean[][] used) {\n    boolean[][] next = new boolean[used.length][used[0].length];\n    for (int i = 0; i < used.length; i++) next[i] = used[i].clone();\n    return next;\n  }\n\n  private static class State { int row, col, index; boolean[][] used; State(int r,int c,int i,boolean[][] u){row=r;col=c;index=i;used=u;} }\n}",
      "recursiveCode": "class Solution {\n  public boolean exist(char[][] board, String word) {\n    for (int r = 0; r < board.length; r++) {\n      for (int c = 0; c < board[0].length; c++) {\n        if (backtrack(board, word, r, c, 0)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean backtrack(char[][] board, String word, int r, int c, int index) {\n    if (index == word.length()) return true;\n    if (r < 0 || c < 0 || r == board.length || c == board[0].length) return false;\n    if (board[r][c] != word.charAt(index)) return false;\n    char saved = board[r][c];\n    board[r][c] = '#';\n    boolean found = backtrack(board, word, r + 1, c, index + 1) || backtrack(board, word, r - 1, c, index + 1)\n        || backtrack(board, word, r, c + 1, index + 1) || backtrack(board, word, r, c - 1, index + 1);\n    board[r][c] = saved;\n    return found;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {\n      if (board[r][c] != word.charAt(0)) continue;\n      Deque<State> stack = new ArrayDeque<>();\n      stack.push(new State(r, c, 0, new boolean[rows][cols]));\n      while (!stack.isEmpty()) {\n        State cur = stack.pop();\n        if (cur.row < 0 || cur.col < 0 || cur.row == rows || cur.col == cols) continue;\n        if (cur.used[cur.row][cur.col] || board[cur.row][cur.col] != word.charAt(cur.index)) continue;\n        if (cur.index == word.length() - 1) return true;\n        cur.used[cur.row][cur.col] = true;\n        for (int[] d : DIRS) stack.push(new State(cur.row + d[0], cur.col + d[1], cur.index + 1, copy(cur.used)));\n      }\n    }\n    return false;\n  }\n\n  private boolean[][] copy(boolean[][] used) {\n    boolean[][] next = new boolean[used.length][used[0].length];\n    for (int i = 0; i < used.length; i++) next[i] = used[i].clone();\n    return next;\n  }\n\n  private static class State { int row, col, index; boolean[][] used; State(int r,int c,int i,boolean[][] u){row=r;col=c;index=i;used=u;} }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  private static final int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  public boolean exist(char[][] board, String word) {\n    int rows = board.length, cols = board[0].length;\n    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {\n      if (board[r][c] != word.charAt(0)) continue;\n      Deque<State> stack = new ArrayDeque<>();\n      stack.push(new State(r, c, 0, new boolean[rows][cols]));\n      while (!stack.isEmpty()) {\n        State cur = stack.pop();\n        if (cur.row < 0 || cur.col < 0 || cur.row == rows || cur.col == cols) continue;\n        if (cur.used[cur.row][cur.col] || board[cur.row][cur.col] != word.charAt(cur.index)) continue;\n        if (cur.index == word.length() - 1) return true;\n        cur.used[cur.row][cur.col] = true;\n        for (int[] d : DIRS) stack.push(new State(cur.row + d[0], cur.col + d[1], cur.index + 1, copy(cur.used)));\n      }\n    }\n    return false;\n  }\n\n  private boolean[][] copy(boolean[][] used) {\n    boolean[][] next = new boolean[used.length][used[0].length];\n    for (int i = 0; i < used.length; i++) next[i] = used[i].clone();\n    return next;\n  }\n\n  private static class State { int row, col, index; boolean[][] used; State(int r,int c,int i,boolean[][] u){row=r;col=c;index=i;used=u;} }\n}"
    },
    {
      "group": "advanced",
      "name": "N-Queens",
      "difficulty": "Hard",
      "subpattern": "Constraint search with column and diagonal pruning",
      "question": "Given n, return all distinct boards that place n queens on an n x n board so no two queens attack each other.",
      "trigger": "Each row needs one queen, and columns/diagonals chosen by previous rows constrain the next row.",
      "intuition": "Backtrack row by row. Track used columns and diagonals to test safety in O(1).",
      "edgeCases": "n = 1, n = 2 or 3 no solution, diagonal indexes, board formatting, cleanup after each queen.",
      "constraints": "1 <= n <= 9.",
      "source": {
        "label": "N-Queens - LeetCode 51",
        "url": "https://leetcode.com/problems/n-queens/"
      },
      "examples": [
        {
          "input": "n = 4",
          "output": "two boards",
          "explanation": "The classic 4-queens puzzle has two solutions."
        },
        {
          "input": "n = 1",
          "output": "[[\"Q\"]]",
          "explanation": "One queen is valid."
        },
        {
          "input": "n = 2",
          "output": "[]",
          "explanation": "No valid placement exists."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n^2); Space O(n). Generate column permutations and validate diagonals.",
      "optimizedComplexity": "Time O(n!); Space O(n). Iterative row search maintains constraint arrays.",
      "recursiveComplexity": "Time O(n!); Space O(n). Backtracking places one queen per row.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    int[] cols = new int[n];\n    for (int i = 0; i < n; i++) cols[i] = i;\n    permute(cols, 0, answer);\n    return answer;\n  }\n\n  private void permute(int[] cols, int row, List<List<String>> answer) {\n    if (row == cols.length) { if (valid(cols)) answer.add(build(cols)); return; }\n    for (int i = row; i < cols.length; i++) {\n      swap(cols, row, i); permute(cols, row + 1, answer); swap(cols, row, i);\n    }\n  }\n\n  private boolean valid(int[] cols) {\n    for (int a = 0; a < cols.length; a++) for (int b = a + 1; b < cols.length; b++)\n      if (Math.abs(a - b) == Math.abs(cols[a] - cols[b])) return false;\n    return true;\n  }\n\n  private List<String> build(int[] cols) {\n    List<String> board = new ArrayList<>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private void swap(int[] nums, int i, int j) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n]));\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.row == n) { answer.add(build(s.cols)); continue; }\n      for (int col = n - 1; col >= 0; col--) {\n        int d1 = s.row - col + n, d2 = s.row + col;\n        if (s.used[col] || s.d1[d1] || s.d2[d2]) continue;\n        State next = s.copy();\n        next.cols[s.row] = col;\n        next.used[col] = next.d1[d1] = next.d2[d2] = true;\n        next.row++;\n        stack.push(next);\n      }\n    }\n    return answer;\n  }\n\n  private List<String> build(int[] cols) {\n    List<String> board = new ArrayList<>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private static class State {\n    int row; int[] cols; boolean[] used, d1, d2;\n    State(int row,int[] cols,boolean[] used,boolean[] d1,boolean[] d2){this.row=row;this.cols=cols;this.used=used;this.d1=d1;this.d2=d2;}\n    State copy(){return new State(row, cols.clone(), used.clone(), d1.clone(), d2.clone());}\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    backtrack(0, n, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n], answer);\n    return answer;\n  }\n\n  private void backtrack(int row, int n, int[] cols, boolean[] used, boolean[] d1, boolean[] d2, List<List<String>> answer) {\n    if (row == n) { answer.add(build(cols)); return; }\n    for (int col = 0; col < n; col++) {\n      int a = row - col + n, b = row + col;\n      if (used[col] || d1[a] || d2[b]) continue;\n      cols[row] = col; used[col] = d1[a] = d2[b] = true;\n      backtrack(row + 1, n, cols, used, d1, d2, answer);\n      used[col] = d1[a] = d2[b] = false;\n    }\n  }\n\n  private List<String> build(int[] cols) {\n    List<String> board = new ArrayList<>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n]));\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.row == n) { answer.add(build(s.cols)); continue; }\n      for (int col = n - 1; col >= 0; col--) {\n        int d1 = s.row - col + n, d2 = s.row + col;\n        if (s.used[col] || s.d1[d1] || s.d2[d2]) continue;\n        State next = s.copy();\n        next.cols[s.row] = col;\n        next.used[col] = next.d1[d1] = next.d2[d2] = true;\n        next.row++;\n        stack.push(next);\n      }\n    }\n    return answer;\n  }\n\n  private List<String> build(int[] cols) {\n    List<String> board = new ArrayList<>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private static class State {\n    int row; int[] cols; boolean[] used, d1, d2;\n    State(int row,int[] cols,boolean[] used,boolean[] d1,boolean[] d2){this.row=row;this.cols=cols;this.used=used;this.d1=d1;this.d2=d2;}\n    State copy(){return new State(row, cols.clone(), used.clone(), d1.clone(), d2.clone());}\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<String>> solveNQueens(int n) {\n    List<List<String>> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, new int[n], new boolean[n], new boolean[2*n], new boolean[2*n]));\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.row == n) { answer.add(build(s.cols)); continue; }\n      for (int col = n - 1; col >= 0; col--) {\n        int d1 = s.row - col + n, d2 = s.row + col;\n        if (s.used[col] || s.d1[d1] || s.d2[d2]) continue;\n        State next = s.copy();\n        next.cols[s.row] = col;\n        next.used[col] = next.d1[d1] = next.d2[d2] = true;\n        next.row++;\n        stack.push(next);\n      }\n    }\n    return answer;\n  }\n\n  private List<String> build(int[] cols) {\n    List<String> board = new ArrayList<>();\n    for (int col : cols) { char[] row = new char[cols.length]; Arrays.fill(row, '.'); row[col] = 'Q'; board.add(new String(row)); }\n    return board;\n  }\n\n  private static class State {\n    int row; int[] cols; boolean[] used, d1, d2;\n    State(int row,int[] cols,boolean[] used,boolean[] d1,boolean[] d2){this.row=row;this.cols=cols;this.used=used;this.d1=d1;this.d2=d2;}\n    State copy(){return new State(row, cols.clone(), used.clone(), d1.clone(), d2.clone());}\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sudoku Solver",
      "difficulty": "Hard",
      "subpattern": "Constraint search with row/column/box state",
      "question": "Solve a 9 x 9 Sudoku board by filling empty cells marked with dots. The given board has exactly one solution.",
      "trigger": "Each blank cell branches over digits 1..9, constrained by row, column, and 3x3 box usage.",
      "intuition": "Preload constraints. Pick a blank, try valid digits, place one, recurse, and undo if it fails.",
      "edgeCases": "Already solved board, one blank, no valid digit at a cell, box index calculation, restoring constraints.",
      "constraints": "board is 9 x 9; cells are digits 1..9 or dot; the puzzle has exactly one solution.",
      "source": {
        "label": "Sudoku Solver - LeetCode 37",
        "url": "https://leetcode.com/problems/sudoku-solver/"
      },
      "examples": [
        {
          "input": "standard partially-filled Sudoku board",
          "output": "solved board",
          "explanation": "All rows, columns, and boxes become valid."
        },
        {
          "input": "board with one blank",
          "output": "blank filled",
          "explanation": "The only valid digit is inserted."
        },
        {
          "input": "already solved board",
          "output": "same board",
          "explanation": "No search is needed."
        }
      ],
      "bruteForceComplexity": "Time O(9^e * 81); Space O(e). Each validity check scans row, column, and box.",
      "optimizedComplexity": "Time O(9^e); Space O(e). Iterative stack uses precomputed constraints.",
      "recursiveComplexity": "Time O(9^e); Space O(e). Backtracking with constraint tables tests digits in O(1).",
      "bruteForceCode": "class Solution {\n  public void solveSudoku(char[][] board) {\n    solve(board, 0, 0);\n  }\n\n  private boolean solve(char[][] board, int row, int col) {\n    if (row == 9) return true;\n    if (col == 9) return solve(board, row + 1, 0);\n    if (board[row][col] != '.') return solve(board, row, col + 1);\n    for (char digit = '1'; digit <= '9'; digit++) {\n      if (!valid(board, row, col, digit)) continue;\n      board[row][col] = digit;\n      if (solve(board, row, col + 1)) return true;\n      board[row][col] = '.';\n    }\n    return false;\n  }\n\n  private boolean valid(char[][] board, int row, int col, char digit) {\n    for (int i = 0; i < 9; i++) {\n      if (board[row][i] == digit || board[i][col] == digit) return false;\n      if (board[(row/3)*3 + i/3][(col/3)*3 + i%3] == digit) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List<int[]> blanks = new ArrayList<>();\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    int[] next = new int[blanks.size()];\n    Arrays.fill(next, 1);\n    int i = 0;\n    while (i >= 0 && i < blanks.size()) {\n      int r = blanks.get(i)[0], c = blanks.get(i)[1];\n      if (board[r][c] != '.') { set(rows, cols, boxes, r, c, board[r][c] - '0', false); board[r][c] = '.'; }\n      boolean placed = false;\n      for (int d = next[i]; d <= 9; d++) if (!rows[r][d] && !cols[c][d] && !boxes[box(r,c)][d]) {\n        board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true); next[i] = d + 1; i++; placed = true; break;\n      }\n      if (!placed) { next[i] = 1; i--; }\n    }\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    List<int[]> blanks = new ArrayList<>();\n    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    backtrack(board, blanks, 0, rows, cols, boxes);\n  }\n\n  private boolean backtrack(char[][] board, List<int[]> blanks, int index, boolean[][] rows, boolean[][] cols, boolean[][] boxes) {\n    if (index == blanks.size()) return true;\n    int r = blanks.get(index)[0], c = blanks.get(index)[1];\n    for (int d = 1; d <= 9; d++) {\n      if (rows[r][d] || cols[c][d] || boxes[box(r,c)][d]) continue;\n      board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true);\n      if (backtrack(board, blanks, index + 1, rows, cols, boxes)) return true;\n      set(rows, cols, boxes, r, c, d, false); board[r][c] = '.';\n    }\n    return false;\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List<int[]> blanks = new ArrayList<>();\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    int[] next = new int[blanks.size()];\n    Arrays.fill(next, 1);\n    int i = 0;\n    while (i >= 0 && i < blanks.size()) {\n      int r = blanks.get(i)[0], c = blanks.get(i)[1];\n      if (board[r][c] != '.') { set(rows, cols, boxes, r, c, board[r][c] - '0', false); board[r][c] = '.'; }\n      boolean placed = false;\n      for (int d = next[i]; d <= 9; d++) if (!rows[r][d] && !cols[c][d] && !boxes[box(r,c)][d]) {\n        board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true); next[i] = d + 1; i++; placed = true; break;\n      }\n      if (!placed) { next[i] = 1; i--; }\n    }\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public void solveSudoku(char[][] board) {\n    List<int[]> blanks = new ArrayList<>();\n    boolean[][] rows = new boolean[9][10], cols = new boolean[9][10], boxes = new boolean[9][10];\n    for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) {\n      if (board[r][c] == '.') blanks.add(new int[]{r,c});\n      else set(rows, cols, boxes, r, c, board[r][c] - '0', true);\n    }\n    int[] next = new int[blanks.size()];\n    Arrays.fill(next, 1);\n    int i = 0;\n    while (i >= 0 && i < blanks.size()) {\n      int r = blanks.get(i)[0], c = blanks.get(i)[1];\n      if (board[r][c] != '.') { set(rows, cols, boxes, r, c, board[r][c] - '0', false); board[r][c] = '.'; }\n      boolean placed = false;\n      for (int d = next[i]; d <= 9; d++) if (!rows[r][d] && !cols[c][d] && !boxes[box(r,c)][d]) {\n        board[r][c] = (char)('0' + d); set(rows, cols, boxes, r, c, d, true); next[i] = d + 1; i++; placed = true; break;\n      }\n      if (!placed) { next[i] = 1; i--; }\n    }\n  }\n\n  private void set(boolean[][] rows, boolean[][] cols, boolean[][] boxes, int r, int c, int d, boolean value) { rows[r][d] = cols[c][d] = boxes[box(r,c)][d] = value; }\n  private int box(int r, int c) { return (r / 3) * 3 + c / 3; }\n}"
    },
    {
      "group": "advanced",
      "name": "Rat in a Maze",
      "difficulty": "Medium",
      "subpattern": "Grid path backtracking with directional choices",
      "question": "Given an n x n maze matrix where 1 means open and 0 means blocked, return all paths from top-left to bottom-right using moves D, L, R, and U without revisiting cells.",
      "trigger": "Each open cell branches to neighboring open cells, and the path must undo visited marks after exploring a branch.",
      "intuition": "Start at (0,0). Try directions in lexicographic order, mark the cell visited, recurse, then unmark it.",
      "edgeCases": "Start blocked, destination blocked, n = 1, no path, multiple paths, avoiding cycles.",
      "constraints": "1 <= n <= 5 in common interview variants; mat[i][j] is 0 or 1.",
      "source": {
        "label": "Rat in a Maze Problem - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1"
      },
      "examples": [
        {
          "input": "mat = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]",
          "output": "[\"DDRDRR\",\"DRDDRR\"]",
          "explanation": "Two valid paths reach the bottom-right cell."
        },
        {
          "input": "mat = [[1,0],[0,1]]",
          "output": "[]",
          "explanation": "The destination is isolated."
        },
        {
          "input": "mat = [[1]]",
          "output": "[\"\"]",
          "explanation": "The rat starts at the destination."
        }
      ],
      "bruteForceComplexity": "Time O(4^(n^2)); Space O(n^2). Try all simple paths with visited state.",
      "optimizedComplexity": "Time O(4^(n^2)); Space O(n^2). Iterative DFS stores path and visited mask.",
      "recursiveComplexity": "Time O(4^(n^2)); Space O(n^2). Recursive DFS marks and unmarks visited cells.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList<String> findPath(int[][] mat) {\n    ArrayList<String> answer = new ArrayList<>();\n    if (mat[0][0] == 0) return answer;\n    dfs(mat, 0, 0, new boolean[mat.length][mat.length], new StringBuilder(), answer);\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private void dfs(int[][] mat, int r, int c, boolean[][] used, StringBuilder path, ArrayList<String> answer) {\n    int n = mat.length;\n    if (r < 0 || c < 0 || r == n || c == n || mat[r][c] == 0 || used[r][c]) return;\n    if (r == n - 1 && c == n - 1) { answer.add(path.toString()); return; }\n    used[r][c] = true;\n    char[] move = {'D','L','R','U'}; int[] dr = {1,0,0,-1}; int[] dc = {0,-1,1,0};\n    for (int i = 0; i < 4; i++) { path.append(move[i]); dfs(mat, r + dr[i], c + dc[i], used, path, answer); path.deleteCharAt(path.length() - 1); }\n    used[r][c] = false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList<String> findPath(int[][] mat) {\n    ArrayList<String> answer = new ArrayList<>();\n    if (mat[0][0] == 0) return answer;\n    int n = mat.length;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, 0, \"\", new boolean[n][n]));\n    char[] move = {'U','R','L','D'}; int[] dr = {-1,0,0,1}; int[] dc = {0,1,-1,0};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r < 0 || s.c < 0 || s.r == n || s.c == n || mat[s.r][s.c] == 0 || s.used[s.r][s.c]) continue;\n      if (s.r == n - 1 && s.c == n - 1) { answer.add(s.path); continue; }\n      s.used[s.r][s.c] = true;\n      for (int i = 0; i < 4; i++) stack.push(new State(s.r + dr[i], s.c + dc[i], s.path + move[i], copy(s.used)));\n    }\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private boolean[][] copy(boolean[][] used) { boolean[][] next = new boolean[used.length][used.length]; for (int i = 0; i < used.length; i++) next[i] = used[i].clone(); return next; }\n  private static class State { int r,c; String path; boolean[][] used; State(int r,int c,String p,boolean[][] u){this.r=r;this.c=c;path=p;used=u;} }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList<String> findPath(int[][] mat) {\n    ArrayList<String> answer = new ArrayList<>();\n    if (mat[0][0] == 0) return answer;\n    backtrack(mat, 0, 0, new boolean[mat.length][mat.length], new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[][] mat, int r, int c, boolean[][] used, StringBuilder path, ArrayList<String> answer) {\n    int n = mat.length;\n    if (r < 0 || c < 0 || r == n || c == n || mat[r][c] == 0 || used[r][c]) return;\n    if (r == n - 1 && c == n - 1) { answer.add(path.toString()); return; }\n    used[r][c] = true;\n    char[] move = {'D','L','R','U'}; int[] dr = {1,0,0,-1}; int[] dc = {0,-1,1,0};\n    for (int i = 0; i < 4; i++) {\n      path.append(move[i]);\n      backtrack(mat, r + dr[i], c + dc[i], used, path, answer);\n      path.deleteCharAt(path.length() - 1);\n    }\n    used[r][c] = false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public ArrayList<String> findPath(int[][] mat) {\n    ArrayList<String> answer = new ArrayList<>();\n    if (mat[0][0] == 0) return answer;\n    int n = mat.length;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, 0, \"\", new boolean[n][n]));\n    char[] move = {'U','R','L','D'}; int[] dr = {-1,0,0,1}; int[] dc = {0,1,-1,0};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r < 0 || s.c < 0 || s.r == n || s.c == n || mat[s.r][s.c] == 0 || s.used[s.r][s.c]) continue;\n      if (s.r == n - 1 && s.c == n - 1) { answer.add(s.path); continue; }\n      s.used[s.r][s.c] = true;\n      for (int i = 0; i < 4; i++) stack.push(new State(s.r + dr[i], s.c + dc[i], s.path + move[i], copy(s.used)));\n    }\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private boolean[][] copy(boolean[][] used) { boolean[][] next = new boolean[used.length][used.length]; for (int i = 0; i < used.length; i++) next[i] = used[i].clone(); return next; }\n  private static class State { int r,c; String path; boolean[][] used; State(int r,int c,String p,boolean[][] u){this.r=r;this.c=c;path=p;used=u;} }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public ArrayList<String> findPath(int[][] mat) {\n    ArrayList<String> answer = new ArrayList<>();\n    if (mat[0][0] == 0) return answer;\n    int n = mat.length;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, 0, \"\", new boolean[n][n]));\n    char[] move = {'U','R','L','D'}; int[] dr = {-1,0,0,1}; int[] dc = {0,1,-1,0};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r < 0 || s.c < 0 || s.r == n || s.c == n || mat[s.r][s.c] == 0 || s.used[s.r][s.c]) continue;\n      if (s.r == n - 1 && s.c == n - 1) { answer.add(s.path); continue; }\n      s.used[s.r][s.c] = true;\n      for (int i = 0; i < 4; i++) stack.push(new State(s.r + dr[i], s.c + dc[i], s.path + move[i], copy(s.used)));\n    }\n    Collections.sort(answer);\n    return answer;\n  }\n\n  private boolean[][] copy(boolean[][] used) { boolean[][] next = new boolean[used.length][used.length]; for (int i = 0; i < used.length; i++) next[i] = used[i].clone(); return next; }\n  private static class State { int r,c; String path; boolean[][] used; State(int r,int c,String p,boolean[][] u){this.r=r;this.c=c;path=p;used=u;} }\n}"
    },
    {
      "group": "advanced",
      "name": "Unique Paths III",
      "difficulty": "Hard",
      "subpattern": "Grid path backtracking with exact coverage",
      "question": "Given a grid with start, end, empty cells, and obstacles, return the number of 4-directional paths from start to end that visit every non-obstacle cell exactly once.",
      "trigger": "A valid path must cover every walkable cell exactly once, so recursion tracks remaining cells and visited marks.",
      "intuition": "Count all non-obstacle cells. DFS from start; when reaching end, count the path only if remaining cells is 1.",
      "edgeCases": "No path, obstacles, start adjacent to end, all cells must be visited, avoiding revisits.",
      "constraints": "1 <= m, n <= 20; total cells <= 20 in the original problem.",
      "source": {
        "label": "Unique Paths III - LeetCode 980",
        "url": "https://leetcode.com/problems/unique-paths-iii/"
      },
      "examples": [
        {
          "input": "grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]",
          "output": "2",
          "explanation": "Two paths visit all non-obstacle cells."
        },
        {
          "input": "grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]",
          "output": "4",
          "explanation": "Four Hamiltonian paths exist."
        },
        {
          "input": "grid = [[0,1],[2,0]]",
          "output": "0",
          "explanation": "No path can visit every open cell exactly once."
        }
      ],
      "bruteForceComplexity": "Time O(4^E); Space O(E). Try every path from start over E walkable cells.",
      "optimizedComplexity": "Time O(4^E); Space O(E). Iterative stack carries position, remaining count, and visited mask.",
      "recursiveComplexity": "Time O(4^E); Space O(E). Backtracking marks cells in-place and decrements remaining count.",
      "bruteForceCode": "class Solution {\n  public int uniquePathsIII(int[][] grid) {\n    int sr = 0, sc = 0, empty = 0;\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] != -1) empty++;\n      if (grid[r][c] == 1) { sr = r; sc = c; }\n    }\n    return dfs(grid, sr, sc, empty);\n  }\n\n  private int dfs(int[][] grid, int r, int c, int remaining) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid[0].length || grid[r][c] == -1) return 0;\n    if (grid[r][c] == 2) return remaining == 1 ? 1 : 0;\n    int saved = grid[r][c]; grid[r][c] = -1;\n    int total = dfs(grid, r+1,c,remaining-1)+dfs(grid,r-1,c,remaining-1)+dfs(grid,r,c+1,remaining-1)+dfs(grid,r,c-1,remaining-1);\n    grid[r][c] = saved;\n    return total;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIII(int[][] grid) {\n    int rows = grid.length, cols = grid[0].length, sr = 0, sc = 0, walk = 0;\n    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {\n      if (grid[r][c] != -1) walk++;\n      if (grid[r][c] == 1) { sr = r; sc = c; }\n    }\n    int answer = 0;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(sr, sc, walk, 0));\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r < 0 || s.c < 0 || s.r == rows || s.c == cols || grid[s.r][s.c] == -1) continue;\n      int bit = 1 << (s.r * cols + s.c);\n      if ((s.mask & bit) != 0) continue;\n      if (grid[s.r][s.c] == 2) { if (s.remaining == 1) answer++; continue; }\n      for (int[] d : dirs) stack.push(new State(s.r+d[0], s.c+d[1], s.remaining-1, s.mask | bit));\n    }\n    return answer;\n  }\n\n  private static class State { int r,c,remaining,mask; State(int r,int c,int rem,int mask){this.r=r;this.c=c;remaining=rem;this.mask=mask;} }\n}",
      "recursiveCode": "class Solution {\n  public int uniquePathsIII(int[][] grid) {\n    int sr = 0, sc = 0, walk = 0;\n    for (int r = 0; r < grid.length; r++) for (int c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] != -1) walk++;\n      if (grid[r][c] == 1) { sr = r; sc = c; }\n    }\n    return backtrack(grid, sr, sc, walk);\n  }\n\n  private int backtrack(int[][] grid, int r, int c, int remaining) {\n    if (r < 0 || c < 0 || r == grid.length || c == grid[0].length || grid[r][c] == -1) return 0;\n    if (grid[r][c] == 2) return remaining == 1 ? 1 : 0;\n    int saved = grid[r][c];\n    grid[r][c] = -1;\n    int total = backtrack(grid, r+1, c, remaining-1) + backtrack(grid, r-1, c, remaining-1)\n        + backtrack(grid, r, c+1, remaining-1) + backtrack(grid, r, c-1, remaining-1);\n    grid[r][c] = saved;\n    return total;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIII(int[][] grid) {\n    int rows = grid.length, cols = grid[0].length, sr = 0, sc = 0, walk = 0;\n    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {\n      if (grid[r][c] != -1) walk++;\n      if (grid[r][c] == 1) { sr = r; sc = c; }\n    }\n    int answer = 0;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(sr, sc, walk, 0));\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r < 0 || s.c < 0 || s.r == rows || s.c == cols || grid[s.r][s.c] == -1) continue;\n      int bit = 1 << (s.r * cols + s.c);\n      if ((s.mask & bit) != 0) continue;\n      if (grid[s.r][s.c] == 2) { if (s.remaining == 1) answer++; continue; }\n      for (int[] d : dirs) stack.push(new State(s.r+d[0], s.c+d[1], s.remaining-1, s.mask | bit));\n    }\n    return answer;\n  }\n\n  private static class State { int r,c,remaining,mask; State(int r,int c,int rem,int mask){this.r=r;this.c=c;remaining=rem;this.mask=mask;} }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int uniquePathsIII(int[][] grid) {\n    int rows = grid.length, cols = grid[0].length, sr = 0, sc = 0, walk = 0;\n    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {\n      if (grid[r][c] != -1) walk++;\n      if (grid[r][c] == 1) { sr = r; sc = c; }\n    }\n    int answer = 0;\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(sr, sc, walk, 0));\n    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!stack.isEmpty()) {\n      State s = stack.pop();\n      if (s.r < 0 || s.c < 0 || s.r == rows || s.c == cols || grid[s.r][s.c] == -1) continue;\n      int bit = 1 << (s.r * cols + s.c);\n      if ((s.mask & bit) != 0) continue;\n      if (grid[s.r][s.c] == 2) { if (s.remaining == 1) answer++; continue; }\n      for (int[] d : dirs) stack.push(new State(s.r+d[0], s.c+d[1], s.remaining-1, s.mask | bit));\n    }\n    return answer;\n  }\n\n  private static class State { int r,c,remaining,mask; State(int r,int c,int rem,int mask){this.r=r;this.c=c;remaining=rem;this.mask=mask;} }\n}"
    },
    {
      "group": "advanced",
      "name": "Matchsticks to Square",
      "difficulty": "Medium",
      "subpattern": "Bucket assignment backtracking",
      "question": "Given matchsticks, return true if they can form a square using every matchstick exactly once.",
      "trigger": "Each stick must be assigned to one of four sides, and side sums cannot exceed target length.",
      "intuition": "Sort sticks descending. Place each stick into a side that can accept it; skip equivalent empty/duplicate side states.",
      "edgeCases": "Total length not divisible by 4, one stick longer than side, all equal sticks, duplicate side sums, using every stick.",
      "constraints": "1 <= matchsticks.length <= 15; 1 <= matchsticks[i] <= 100000000.",
      "source": {
        "label": "Matchsticks to Square - LeetCode 473",
        "url": "https://leetcode.com/problems/matchsticks-to-square/"
      },
      "examples": [
        {
          "input": "matchsticks = [1,1,2,2,2]",
          "output": "true",
          "explanation": "Each side can sum to 2."
        },
        {
          "input": "matchsticks = [3,3,3,3,4]",
          "output": "false",
          "explanation": "The total cannot form four equal sides."
        },
        {
          "input": "matchsticks = [5,5,5,5]",
          "output": "true",
          "explanation": "Each side gets one stick."
        }
      ],
      "bruteForceComplexity": "Time O(4^n); Space O(n). Try assigning each stick to every side.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(2^n). Bitmask DP tracks current side sum modulo target.",
      "recursiveComplexity": "Time O(4^n) worst case with strong pruning; Space O(n). Descending backtracking reduces branches.",
      "bruteForceCode": "class Solution {\n  public boolean makesquare(int[] matchsticks) {\n    int sum = 0;\n    for (int stick : matchsticks) sum += stick;\n    if (sum % 4 != 0) return false;\n    return assign(matchsticks, 0, new int[4], sum / 4);\n  }\n\n  private boolean assign(int[] sticks, int index, int[] sides, int target) {\n    if (index == sticks.length) return sides[0] == target && sides[1] == target && sides[2] == target;\n    for (int side = 0; side < 4; side++) {\n      sides[side] += sticks[index];\n      if (assign(sticks, index + 1, sides, target)) return true;\n      sides[side] -= sticks[index];\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean makesquare(int[] matchsticks) {\n    int sum = 0;\n    for (int stick : matchsticks) sum += stick;\n    if (sum % 4 != 0) return false;\n    int target = sum / 4;\n    int totalMasks = 1 << matchsticks.length;\n    int[] dp = new int[totalMasks];\n    Arrays.fill(dp, -1);\n    dp[0] = 0;\n    for (int mask = 0; mask < totalMasks; mask++) {\n      if (dp[mask] == -1) continue;\n      for (int i = 0; i < matchsticks.length; i++) {\n        if ((mask & (1 << i)) != 0) continue;\n        int next = dp[mask] + matchsticks[i];\n        if (next <= target) dp[mask | (1 << i)] = next % target;\n      }\n    }\n    return dp[totalMasks - 1] == 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean makesquare(int[] matchsticks) {\n    int sum = 0;\n    for (int stick : matchsticks) sum += stick;\n    if (sum % 4 != 0) return false;\n    Arrays.sort(matchsticks);\n    reverse(matchsticks);\n    return backtrack(matchsticks, 0, new int[4], sum / 4);\n  }\n\n  private boolean backtrack(int[] sticks, int index, int[] sides, int target) {\n    if (index == sticks.length) return true;\n    for (int side = 0; side < 4; side++) {\n      if (sides[side] + sticks[index] > target) continue;\n      sides[side] += sticks[index];\n      if (backtrack(sticks, index + 1, sides, target)) return true;\n      sides[side] -= sticks[index];\n      if (sides[side] == 0) break;\n    }\n    return false;\n  }\n\n  private void reverse(int[] nums) { for (int l = 0, r = nums.length - 1; l < r; l++, r--) { int t = nums[l]; nums[l] = nums[r]; nums[r] = t; } }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean makesquare(int[] matchsticks) {\n    int sum = 0;\n    for (int stick : matchsticks) sum += stick;\n    if (sum % 4 != 0) return false;\n    int target = sum / 4;\n    int totalMasks = 1 << matchsticks.length;\n    int[] dp = new int[totalMasks];\n    Arrays.fill(dp, -1);\n    dp[0] = 0;\n    for (int mask = 0; mask < totalMasks; mask++) {\n      if (dp[mask] == -1) continue;\n      for (int i = 0; i < matchsticks.length; i++) {\n        if ((mask & (1 << i)) != 0) continue;\n        int next = dp[mask] + matchsticks[i];\n        if (next <= target) dp[mask | (1 << i)] = next % target;\n      }\n    }\n    return dp[totalMasks - 1] == 0;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean makesquare(int[] matchsticks) {\n    int sum = 0;\n    for (int stick : matchsticks) sum += stick;\n    if (sum % 4 != 0) return false;\n    int target = sum / 4;\n    int totalMasks = 1 << matchsticks.length;\n    int[] dp = new int[totalMasks];\n    Arrays.fill(dp, -1);\n    dp[0] = 0;\n    for (int mask = 0; mask < totalMasks; mask++) {\n      if (dp[mask] == -1) continue;\n      for (int i = 0; i < matchsticks.length; i++) {\n        if ((mask & (1 << i)) != 0) continue;\n        int next = dp[mask] + matchsticks[i];\n        if (next <= target) dp[mask | (1 << i)] = next % target;\n      }\n    }\n    return dp[totalMasks - 1] == 0;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Partition to K Equal Sum Subsets",
      "difficulty": "Medium",
      "subpattern": "K-bucket partition backtracking",
      "question": "Given nums and k, return true if nums can be partitioned into k non-empty subsets with equal sum.",
      "trigger": "Every number must be assigned to one of k buckets, and no bucket may exceed target sum.",
      "intuition": "If total is divisible by k, sort descending and place each number into a bucket. Skip symmetric bucket states.",
      "edgeCases": "Total not divisible by k, k = 1, number greater than target, many duplicates, empty bucket symmetry.",
      "constraints": "1 <= k <= nums.length <= 16; 1 <= nums[i] <= 10000.",
      "source": {
        "label": "Partition to K Equal Sum Subsets - LeetCode 698",
        "url": "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/"
      },
      "examples": [
        {
          "input": "nums = [4,3,2,3,5,2,1], k = 4",
          "output": "true",
          "explanation": "Each subset can sum to 5."
        },
        {
          "input": "nums = [1,2,3,4], k = 3",
          "output": "false",
          "explanation": "Total cannot split into equal integer sums."
        },
        {
          "input": "nums = [2,2,2,2], k = 2",
          "output": "true",
          "explanation": "Two subsets can each sum to 4."
        }
      ],
      "bruteForceComplexity": "Time O(k^n); Space O(n). Assign every number to every bucket.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(2^n). Bitmask DP tracks partial bucket sum modulo target.",
      "recursiveComplexity": "Time O(k^n) worst case with pruning; Space O(n + k). Sorted bucket backtracking skips symmetric states.",
      "bruteForceCode": "class Solution {\n  public boolean canPartitionKSubsets(int[] nums, int k) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % k != 0) return false;\n    return assign(nums, 0, new int[k], sum / k);\n  }\n\n  private boolean assign(int[] nums, int index, int[] buckets, int target) {\n    if (index == nums.length) {\n      for (int bucket : buckets) if (bucket != target) return false;\n      return true;\n    }\n    for (int i = 0; i < buckets.length; i++) {\n      buckets[i] += nums[index];\n      if (assign(nums, index + 1, buckets, target)) return true;\n      buckets[i] -= nums[index];\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean canPartitionKSubsets(int[] nums, int k) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % k != 0) return false;\n    int target = sum / k;\n    int totalMasks = 1 << nums.length;\n    int[] dp = new int[totalMasks];\n    Arrays.fill(dp, -1);\n    dp[0] = 0;\n    for (int mask = 0; mask < totalMasks; mask++) {\n      if (dp[mask] == -1) continue;\n      for (int i = 0; i < nums.length; i++) {\n        if ((mask & (1 << i)) != 0) continue;\n        int next = dp[mask] + nums[i];\n        if (next <= target) dp[mask | (1 << i)] = next % target;\n      }\n    }\n    return dp[totalMasks - 1] == 0;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean canPartitionKSubsets(int[] nums, int k) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % k != 0) return false;\n    Arrays.sort(nums);\n    reverse(nums);\n    return backtrack(nums, 0, new int[k], sum / k);\n  }\n\n  private boolean backtrack(int[] nums, int index, int[] buckets, int target) {\n    if (index == nums.length) return true;\n    for (int i = 0; i < buckets.length; i++) {\n      if (buckets[i] + nums[index] > target) continue;\n      buckets[i] += nums[index];\n      if (backtrack(nums, index + 1, buckets, target)) return true;\n      buckets[i] -= nums[index];\n      if (buckets[i] == 0) break;\n    }\n    return false;\n  }\n\n  private void reverse(int[] nums) { for (int l = 0, r = nums.length - 1; l < r; l++, r--) { int t = nums[l]; nums[l] = nums[r]; nums[r] = t; } }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean canPartitionKSubsets(int[] nums, int k) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % k != 0) return false;\n    int target = sum / k;\n    int totalMasks = 1 << nums.length;\n    int[] dp = new int[totalMasks];\n    Arrays.fill(dp, -1);\n    dp[0] = 0;\n    for (int mask = 0; mask < totalMasks; mask++) {\n      if (dp[mask] == -1) continue;\n      for (int i = 0; i < nums.length; i++) {\n        if ((mask & (1 << i)) != 0) continue;\n        int next = dp[mask] + nums[i];\n        if (next <= target) dp[mask | (1 << i)] = next % target;\n      }\n    }\n    return dp[totalMasks - 1] == 0;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean canPartitionKSubsets(int[] nums, int k) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    if (sum % k != 0) return false;\n    int target = sum / k;\n    int totalMasks = 1 << nums.length;\n    int[] dp = new int[totalMasks];\n    Arrays.fill(dp, -1);\n    dp[0] = 0;\n    for (int mask = 0; mask < totalMasks; mask++) {\n      if (dp[mask] == -1) continue;\n      for (int i = 0; i < nums.length; i++) {\n        if ((mask & (1 << i)) != 0) continue;\n        int next = dp[mask] + nums[i];\n        if (next <= target) dp[mask | (1 << i)] = next % target;\n      }\n    }\n    return dp[totalMasks - 1] == 0;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Beautiful Arrangement",
      "difficulty": "Medium",
      "subpattern": "Permutation counting with divisibility constraints",
      "question": "Given n, count the number of arrangements of 1..n where at position i, either perm[i] is divisible by i or i is divisible by perm[i].",
      "trigger": "Each position chooses one unused number that satisfies a local divisibility rule.",
      "intuition": "Fill positions from 1 to n. Track used numbers with a bitmask and count only valid choices.",
      "edgeCases": "n = 1, position is 1-indexed, all numbers used, bitmask update, factorial explosion without pruning.",
      "constraints": "1 <= n <= 15.",
      "source": {
        "label": "Beautiful Arrangement - LeetCode 526",
        "url": "https://leetcode.com/problems/beautiful-arrangement/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "2",
          "explanation": "[1,2] and [2,1] are valid."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "Only one arrangement exists."
        },
        {
          "input": "n = 3",
          "output": "3",
          "explanation": "Three arrangements satisfy the rule."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n); Space O(n). Generate all permutations and validate them.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(2^n). Iterative DP over used-number masks.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(2^n + n). Memoized backtracking counts each mask once.",
      "bruteForceCode": "class Solution {\n  public int countArrangement(int n) {\n    int[] nums = new int[n];\n    for (int i = 0; i < n; i++) nums[i] = i + 1;\n    return permute(nums, 0);\n  }\n\n  private int permute(int[] nums, int index) {\n    if (index == nums.length) return valid(nums) ? 1 : 0;\n    int count = 0;\n    for (int i = index; i < nums.length; i++) {\n      swap(nums, index, i);\n      count += permute(nums, index + 1);\n      swap(nums, index, i);\n    }\n    return count;\n  }\n\n  private boolean valid(int[] nums) {\n    for (int i = 0; i < nums.length; i++) if (nums[i] % (i + 1) != 0 && (i + 1) % nums[i] != 0) return false;\n    return true;\n  }\n\n  private void swap(int[] nums, int i, int j) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n}",
      "iterativeCode": "class Solution {\n  public int countArrangement(int n) {\n    int[] dp = new int[1 << n];\n    dp[0] = 1;\n    for (int mask = 0; mask < dp.length; mask++) {\n      int position = Integer.bitCount(mask) + 1;\n      for (int num = 1; num <= n; num++) {\n        int bit = 1 << (num - 1);\n        if ((mask & bit) != 0) continue;\n        if (num % position == 0 || position % num == 0) dp[mask | bit] += dp[mask];\n      }\n    }\n    return dp[dp.length - 1];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int countArrangement(int n) {\n    int[] memo = new int[1 << n];\n    Arrays.fill(memo, -1);\n    return backtrack(n, 1, 0, memo);\n  }\n\n  private int backtrack(int n, int position, int mask, int[] memo) {\n    if (position > n) return 1;\n    if (memo[mask] != -1) return memo[mask];\n    int count = 0;\n    for (int num = 1; num <= n; num++) {\n      int bit = 1 << (num - 1);\n      if ((mask & bit) != 0) continue;\n      if (num % position == 0 || position % num == 0) count += backtrack(n, position + 1, mask | bit, memo);\n    }\n    memo[mask] = count;\n    return count;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countArrangement(int n) {\n    int[] dp = new int[1 << n];\n    dp[0] = 1;\n    for (int mask = 0; mask < dp.length; mask++) {\n      int position = Integer.bitCount(mask) + 1;\n      for (int num = 1; num <= n; num++) {\n        int bit = 1 << (num - 1);\n        if ((mask & bit) != 0) continue;\n        if (num % position == 0 || position % num == 0) dp[mask | bit] += dp[mask];\n      }\n    }\n    return dp[dp.length - 1];\n  }\n}",
      "code": "class Solution {\n  public int countArrangement(int n) {\n    int[] dp = new int[1 << n];\n    dp[0] = 1;\n    for (int mask = 0; mask < dp.length; mask++) {\n      int position = Integer.bitCount(mask) + 1;\n      for (int num = 1; num <= n; num++) {\n        int bit = 1 << (num - 1);\n        if ((mask & bit) != 0) continue;\n        if (num % position == 0 || position % num == 0) dp[mask | bit] += dp[mask];\n      }\n    }\n    return dp[dp.length - 1];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Expression Add Operators",
      "difficulty": "Hard",
      "subpattern": "Expression construction backtracking",
      "question": "Given a numeric string num and a target, add binary operators +, -, or * between digits so the expression evaluates to target. Return all valid expressions.",
      "trigger": "At each digit boundary the search chooses whether to extend the current number or place an operator, and multiplication needs previous-term state.",
      "intuition": "Track current value and last multiplied term. For multiplication, remove the previous term and add previous * current.",
      "edgeCases": "Leading zeros, target zero, multiplication precedence, long values needing long, no valid expression.",
      "constraints": "1 <= num.length <= 10; -2147483648 <= target <= 2147483647.",
      "source": {
        "label": "Expression Add Operators - LeetCode 282",
        "url": "https://leetcode.com/problems/expression-add-operators/"
      },
      "examples": [
        {
          "input": "num = \"123\", target = 6",
          "output": "[\"1*2*3\",\"1+2+3\"]",
          "explanation": "Both expressions evaluate to 6."
        },
        {
          "input": "num = \"232\", target = 8",
          "output": "[\"2*3+2\",\"2+3*2\"]",
          "explanation": "Multiplication precedence is handled."
        },
        {
          "input": "num = \"105\", target = 5",
          "output": "[\"1*0+5\",\"10-5\"]",
          "explanation": "Leading-zero numbers like 05 are not allowed."
        }
      ],
      "bruteForceComplexity": "Time O(4^n * n); Space O(n). Generate every expression form and evaluate at leaves.",
      "optimizedComplexity": "Time O(4^n); Space O(n). Iterative stack carries evaluated value and last term.",
      "recursiveComplexity": "Time O(4^n); Space O(n). Backtracking carries current value and last term for multiplication.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> addOperators(String num, int target) {\n    List<String> expressions = new ArrayList<>();\n    build(num, 0, new StringBuilder(), expressions);\n    List<String> answer = new ArrayList<>();\n    for (String expression : expressions) {\n      if (evaluate(expression) == target) answer.add(expression);\n    }\n    return answer;\n  }\n\n  private void build(String num, int index, StringBuilder expr, List<String> expressions) {\n    if (index == num.length()) { expressions.add(expr.toString()); return; }\n    int length = expr.length();\n    for (int end = index; end < num.length(); end++) {\n      if (end > index && num.charAt(index) == '0') break;\n      String part = num.substring(index, end + 1);\n      if (index == 0) { expr.append(part); build(num, end + 1, expr, expressions); expr.setLength(length); }\n      else for (char op : new char[]{'+','-','*'}) { expr.append(op).append(part); build(num, end + 1, expr, expressions); expr.setLength(length); }\n    }\n  }\n\n  private long evaluate(String expression) {\n    long total = 0, last = 0, current = 0;\n    char op = '+';\n    for (int i = 0; i <= expression.length(); i++) {\n      if (i < expression.length() && Character.isDigit(expression.charAt(i))) current = current * 10 + expression.charAt(i) - '0';\n      else {\n        if (op == '+') { total += last; last = current; }\n        else if (op == '-') { total += last; last = -current; }\n        else last *= current;\n        if (i < expression.length()) op = expression.charAt(i);\n        current = 0;\n      }\n    }\n    return total + last;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> addOperators(String num, int target) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, \"\", 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == num.length()) {\n        if (state.value == target) answer.add(state.expr);\n        continue;\n      }\n      for (int end = state.index; end < num.length(); end++) {\n        if (end > state.index && num.charAt(state.index) == '0') break;\n        String part = num.substring(state.index, end + 1);\n        long current = Long.parseLong(part);\n        if (state.index == 0) stack.push(new State(end + 1, part, current, current));\n        else {\n          stack.push(new State(end + 1, state.expr + \"+\" + part, state.value + current, current));\n          stack.push(new State(end + 1, state.expr + \"-\" + part, state.value - current, -current));\n          stack.push(new State(end + 1, state.expr + \"*\" + part, state.value - state.last + state.last * current, state.last * current));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int index; String expr; long value, last;\n    State(int index, String expr, long value, long last) { this.index = index; this.expr = expr; this.value = value; this.last = last; }\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> addOperators(String num, int target) {\n    List<String> answer = new ArrayList<>();\n    backtrack(num, target, 0, 0, 0, new StringBuilder(), answer);\n    return answer;\n  }\n\n  private void backtrack(String num, int target, int index, long value, long last,\n      StringBuilder expr, List<String> answer) {\n    if (index == num.length()) {\n      if (value == target) answer.add(expr.toString());\n      return;\n    }\n    int length = expr.length();\n    for (int end = index; end < num.length(); end++) {\n      if (end > index && num.charAt(index) == '0') break;\n      String part = num.substring(index, end + 1);\n      long current = Long.parseLong(part);\n      if (index == 0) {\n        expr.append(part);\n        backtrack(num, target, end + 1, current, current, expr, answer);\n        expr.setLength(length);\n      } else {\n        expr.append('+').append(part);\n        backtrack(num, target, end + 1, value + current, current, expr, answer);\n        expr.setLength(length);\n        expr.append('-').append(part);\n        backtrack(num, target, end + 1, value - current, -current, expr, answer);\n        expr.setLength(length);\n        expr.append('*').append(part);\n        backtrack(num, target, end + 1, value - last + last * current, last * current, expr, answer);\n        expr.setLength(length);\n      }\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> addOperators(String num, int target) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, \"\", 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == num.length()) {\n        if (state.value == target) answer.add(state.expr);\n        continue;\n      }\n      for (int end = state.index; end < num.length(); end++) {\n        if (end > state.index && num.charAt(state.index) == '0') break;\n        String part = num.substring(state.index, end + 1);\n        long current = Long.parseLong(part);\n        if (state.index == 0) stack.push(new State(end + 1, part, current, current));\n        else {\n          stack.push(new State(end + 1, state.expr + \"+\" + part, state.value + current, current));\n          stack.push(new State(end + 1, state.expr + \"-\" + part, state.value - current, -current));\n          stack.push(new State(end + 1, state.expr + \"*\" + part, state.value - state.last + state.last * current, state.last * current));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int index; String expr; long value, last;\n    State(int index, String expr, long value, long last) { this.index = index; this.expr = expr; this.value = value; this.last = last; }\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> addOperators(String num, int target) {\n    List<String> answer = new ArrayList<>();\n    Deque<State> stack = new ArrayDeque<>();\n    stack.push(new State(0, \"\", 0, 0));\n    while (!stack.isEmpty()) {\n      State state = stack.pop();\n      if (state.index == num.length()) {\n        if (state.value == target) answer.add(state.expr);\n        continue;\n      }\n      for (int end = state.index; end < num.length(); end++) {\n        if (end > state.index && num.charAt(state.index) == '0') break;\n        String part = num.substring(state.index, end + 1);\n        long current = Long.parseLong(part);\n        if (state.index == 0) stack.push(new State(end + 1, part, current, current));\n        else {\n          stack.push(new State(end + 1, state.expr + \"+\" + part, state.value + current, current));\n          stack.push(new State(end + 1, state.expr + \"-\" + part, state.value - current, -current));\n          stack.push(new State(end + 1, state.expr + \"*\" + part, state.value - state.last + state.last * current, state.last * current));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private static class State {\n    int index; String expr; long value, last;\n    State(int index, String expr, long value, long last) { this.index = index; this.expr = expr; this.value = value; this.last = last; }\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Word Break II",
      "difficulty": "Hard",
      "subpattern": "Memoized sentence construction backtracking",
      "question": "Given a string s and a dictionary wordDict, return all sentences formed by inserting spaces so every word is in the dictionary.",
      "trigger": "Each index branches over dictionary words that match the current prefix, and many suffix indexes repeat.",
      "intuition": "Backtrack from an index. For every matching word, combine it with every sentence from the remaining suffix. Memoize by index.",
      "edgeCases": "No valid sentence, entire string is one word, repeated words, overlapping suffixes, dictionary words with shared prefixes.",
      "constraints": "1 <= s.length <= 20; 1 <= wordDict.length <= 1000; dictionary words are unique.",
      "source": {
        "label": "Word Break II - LeetCode 140",
        "url": "https://leetcode.com/problems/word-break-ii/"
      },
      "examples": [
        {
          "input": "s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
          "output": "[\"cats and dog\",\"cat sand dog\"]",
          "explanation": "Two valid segmentations exist."
        },
        {
          "input": "s = \"pineapplepenapple\", wordDict = [\"apple\",\"pen\",\"applepen\",\"pine\",\"pineapple\"]",
          "output": "three sentences",
          "explanation": "Shared prefixes create multiple valid sentences."
        },
        {
          "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
          "output": "[]",
          "explanation": "No full segmentation exists."
        }
      ],
      "bruteForceComplexity": "Time exponential; Space O(n). Plain backtracking recomputes suffixes many times.",
      "optimizedComplexity": "Time O(n^3 + output); Space O(n + output). Iterative DP builds sentences from the end.",
      "recursiveComplexity": "Time O(n^3 + output); Space O(n + output). Memoized backtracking caches suffix sentences.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> wordBreak(String s, List<String> wordDict) {\n    Set<String> dict = new HashSet<>(wordDict);\n    List<String> answer = new ArrayList<>();\n    search(s, 0, dict, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void search(String s, int index, Set<String> dict, List<String> words, List<String> answer) {\n    if (index == s.length()) { answer.add(String.join(\" \", words)); return; }\n    for (int end = index + 1; end <= s.length(); end++) {\n      String word = s.substring(index, end);\n      if (!dict.contains(word)) continue;\n      words.add(word);\n      search(s, end, dict, words, answer);\n      words.remove(words.size() - 1);\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> wordBreak(String s, List<String> wordDict) {\n    Set<String> dict = new HashSet<>(wordDict);\n    List<String>[] dp = new ArrayList[s.length() + 1];\n    for (int i = 0; i <= s.length(); i++) dp[i] = new ArrayList<>();\n    dp[s.length()].add(\"\");\n    for (int i = s.length() - 1; i >= 0; i--) {\n      for (int end = i + 1; end <= s.length(); end++) {\n        String word = s.substring(i, end);\n        if (!dict.contains(word)) continue;\n        for (String suffix : dp[end]) dp[i].add(suffix.isEmpty() ? word : word + \" \" + suffix);\n      }\n    }\n    return dp[0];\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> wordBreak(String s, List<String> wordDict) {\n    return dfs(s, 0, new HashSet<>(wordDict), new HashMap<>());\n  }\n\n  private List<String> dfs(String s, int index, Set<String> dict, Map<Integer, List<String>> memo) {\n    if (memo.containsKey(index)) return memo.get(index);\n    List<String> answer = new ArrayList<>();\n    if (index == s.length()) { answer.add(\"\"); return answer; }\n    for (int end = index + 1; end <= s.length(); end++) {\n      String word = s.substring(index, end);\n      if (!dict.contains(word)) continue;\n      for (String suffix : dfs(s, end, dict, memo)) {\n        answer.add(suffix.isEmpty() ? word : word + \" \" + suffix);\n      }\n    }\n    memo.put(index, answer);\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> wordBreak(String s, List<String> wordDict) {\n    Set<String> dict = new HashSet<>(wordDict);\n    List<String>[] dp = new ArrayList[s.length() + 1];\n    for (int i = 0; i <= s.length(); i++) dp[i] = new ArrayList<>();\n    dp[s.length()].add(\"\");\n    for (int i = s.length() - 1; i >= 0; i--) {\n      for (int end = i + 1; end <= s.length(); end++) {\n        String word = s.substring(i, end);\n        if (!dict.contains(word)) continue;\n        for (String suffix : dp[end]) dp[i].add(suffix.isEmpty() ? word : word + \" \" + suffix);\n      }\n    }\n    return dp[0];\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> wordBreak(String s, List<String> wordDict) {\n    Set<String> dict = new HashSet<>(wordDict);\n    List<String>[] dp = new ArrayList[s.length() + 1];\n    for (int i = 0; i <= s.length(); i++) dp[i] = new ArrayList<>();\n    dp[s.length()].add(\"\");\n    for (int i = s.length() - 1; i >= 0; i--) {\n      for (int end = i + 1; end <= s.length(); end++) {\n        String word = s.substring(i, end);\n        if (!dict.contains(word)) continue;\n        for (String suffix : dp[end]) dp[i].add(suffix.isEmpty() ? word : word + \" \" + suffix);\n      }\n    }\n    return dp[0];\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Gray Code",
      "difficulty": "Medium",
      "subpattern": "Backtracking Hamiltonian path over bit states",
      "question": "Given n, return any valid n-bit Gray code sequence where adjacent numbers differ by exactly one bit and the sequence starts with 0.",
      "trigger": "A backtracking view treats each number as a node and flips one bit to move to an unvisited neighbor.",
      "intuition": "Start at 0. Repeatedly flip one bit to find an unvisited code until 2^n values are collected.",
      "edgeCases": "n = 1, n = 0 in variants, sequence length 2^n, final sequence not required to be lexicographically smallest.",
      "constraints": "1 <= n <= 16.",
      "source": {
        "label": "Gray Code - LeetCode 89",
        "url": "https://leetcode.com/problems/gray-code/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "[0,1,3,2]",
          "explanation": "Adjacent values differ by one bit."
        },
        {
          "input": "n = 1",
          "output": "[0,1]",
          "explanation": "The two one-bit values are adjacent."
        },
        {
          "input": "n = 3",
          "output": "[0,1,3,2,6,7,5,4]",
          "explanation": "This is one valid reflected Gray code sequence."
        }
      ],
      "bruteForceComplexity": "Time O((2^n)! * 2^n) in naive permutation validation; Space O(2^n).",
      "optimizedComplexity": "Time O(2^n); Space O(2^n). Reflected construction appends reversed values with a leading bit.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(2^n). Backtracking visits each bit-state once.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> nums = new ArrayList<>();\n    for (int i = 0; i < (1 << n); i++) nums.add(i);\n    List<Integer> path = new ArrayList<>();\n    path.add(0);\n    boolean[] used = new boolean[1 << n];\n    used[0] = true;\n    search(nums, n, path, used);\n    return path;\n  }\n\n  private boolean search(List<Integer> nums, int n, List<Integer> path, boolean[] used) {\n    if (path.size() == (1 << n)) return true;\n    int last = path.get(path.size() - 1);\n    for (int next : nums) {\n      if (used[next] || Integer.bitCount(last ^ next) != 1) continue;\n      used[next] = true; path.add(next);\n      if (search(nums, n, path, used)) return true;\n      path.remove(path.size() - 1); used[next] = false;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> answer = new ArrayList<>();\n    answer.add(0);\n    for (int bit = 0; bit < n; bit++) {\n      int prefix = 1 << bit;\n      for (int i = answer.size() - 1; i >= 0; i--) {\n        answer.add(prefix | answer.get(i));\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> answer = new ArrayList<>();\n    boolean[] used = new boolean[1 << n];\n    answer.add(0);\n    used[0] = true;\n    backtrack(n, answer, used);\n    return answer;\n  }\n\n  private boolean backtrack(int n, List<Integer> answer, boolean[] used) {\n    if (answer.size() == (1 << n)) return true;\n    int current = answer.get(answer.size() - 1);\n    for (int bit = 0; bit < n; bit++) {\n      int next = current ^ (1 << bit);\n      if (used[next]) continue;\n      used[next] = true; answer.add(next);\n      if (backtrack(n, answer, used)) return true;\n      answer.remove(answer.size() - 1); used[next] = false;\n    }\n    return false;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> answer = new ArrayList<>();\n    answer.add(0);\n    for (int bit = 0; bit < n; bit++) {\n      int prefix = 1 << bit;\n      for (int i = answer.size() - 1; i >= 0; i--) {\n        answer.add(prefix | answer.get(i));\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> answer = new ArrayList<>();\n    answer.add(0);\n    for (int bit = 0; bit < n; bit++) {\n      int prefix = 1 << bit;\n      for (int i = answer.size() - 1; i >= 0; i--) {\n        answer.add(prefix | answer.get(i));\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Increasing Subsequences",
      "difficulty": "Medium",
      "subpattern": "Subsequence backtracking with per-depth duplicate guard",
      "question": "Given an integer array nums, return all different non-decreasing subsequences of length at least two.",
      "trigger": "Each recursion level chooses a later value that must be >= the previous value, and duplicate values at the same depth must be skipped.",
      "intuition": "Track current path. At each depth use a set to avoid choosing the same value twice from different indexes.",
      "edgeCases": "All duplicates, strictly decreasing input, negative values, subsequences length at least two, duplicate subsequences from repeated values.",
      "constraints": "1 <= nums.length <= 15; -100 <= nums[i] <= 100.",
      "source": {
        "label": "Increasing Subsequences - LeetCode 491",
        "url": "https://leetcode.com/problems/increasing-subsequences/"
      },
      "examples": [
        {
          "input": "nums = [4,6,7,7]",
          "output": "[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]",
          "explanation": "Duplicate [4,7] appears once."
        },
        {
          "input": "nums = [4,4,3,2,1]",
          "output": "[[4,4]]",
          "explanation": "Only the two equal 4s form a non-decreasing subsequence of length two."
        },
        {
          "input": "nums = [1,2]",
          "output": "[[1,2]]",
          "explanation": "The whole array is one valid subsequence."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n * 2^n). Generate all subsequences and deduplicate valid ones.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(n * 2^n). Iterative set expansion tracks unique subsequences.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(n) stack excluding output. Per-depth set skips duplicates.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findSubsequences(int[] nums) {\n    Set<List<Integer>> unique = new LinkedHashSet<>();\n    for (int mask = 0; mask < (1 << nums.length); mask++) {\n      List<Integer> path = new ArrayList<>();\n      for (int i = 0; i < nums.length; i++) if ((mask & (1 << i)) != 0) path.add(nums[i]);\n      if (path.size() >= 2 && nonDecreasing(path)) unique.add(path);\n    }\n    return new ArrayList<>(unique);\n  }\n\n  private boolean nonDecreasing(List<Integer> path) {\n    for (int i = 1; i < path.size(); i++) if (path.get(i) < path.get(i - 1)) return false;\n    return true;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findSubsequences(int[] nums) {\n    Set<List<Integer>> all = new LinkedHashSet<>();\n    all.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> snapshot = new ArrayList<>(all);\n      for (List<Integer> seq : snapshot) {\n        if (!seq.isEmpty() && num < seq.get(seq.size() - 1)) continue;\n        List<Integer> next = new ArrayList<>(seq);\n        next.add(num);\n        all.add(next);\n      }\n    }\n    List<List<Integer>> answer = new ArrayList<>();\n    for (List<Integer> seq : all) if (seq.size() >= 2) answer.add(seq);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findSubsequences(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(nums, 0, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> answer) {\n    if (path.size() >= 2) answer.add(new ArrayList<>(path));\n    Set<Integer> usedAtDepth = new HashSet<>();\n    for (int i = start; i < nums.length; i++) {\n      if (usedAtDepth.contains(nums[i])) continue;\n      if (!path.isEmpty() && nums[i] < path.get(path.size() - 1)) continue;\n      usedAtDepth.add(nums[i]);\n      path.add(nums[i]);\n      backtrack(nums, i + 1, path, answer);\n      path.remove(path.size() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findSubsequences(int[] nums) {\n    Set<List<Integer>> all = new LinkedHashSet<>();\n    all.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> snapshot = new ArrayList<>(all);\n      for (List<Integer> seq : snapshot) {\n        if (!seq.isEmpty() && num < seq.get(seq.size() - 1)) continue;\n        List<Integer> next = new ArrayList<>(seq);\n        next.add(num);\n        all.add(next);\n      }\n    }\n    List<List<Integer>> answer = new ArrayList<>();\n    for (List<Integer> seq : all) if (seq.size() >= 2) answer.add(seq);\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> findSubsequences(int[] nums) {\n    Set<List<Integer>> all = new LinkedHashSet<>();\n    all.add(new ArrayList<>());\n    for (int num : nums) {\n      List<List<Integer>> snapshot = new ArrayList<>(all);\n      for (List<Integer> seq : snapshot) {\n        if (!seq.isEmpty() && num < seq.get(seq.size() - 1)) continue;\n        List<Integer> next = new ArrayList<>(seq);\n        next.add(num);\n        all.add(next);\n      }\n    }\n    List<List<Integer>> answer = new ArrayList<>();\n    for (List<Integer> seq : all) if (seq.size() >= 2) answer.add(seq);\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Iterator for Combination",
      "difficulty": "Medium",
      "subpattern": "Lexicographic combination generation",
      "question": "Design an iterator over all combinations of a given length from characters sorted in lexicographical order.",
      "trigger": "The next combination is the next lexicographic k-combination, which can be precomputed by backtracking or generated lazily by index state.",
      "intuition": "Precompute all combinations with start-index backtracking, or lazily advance the rightmost index that can still move.",
      "edgeCases": "One combination, combinationLength = 1, all characters chosen, hasNext after exhaustion, lexicographic order.",
      "constraints": "1 <= combinationLength <= characters.length <= 15; characters are distinct sorted lowercase letters; at most 10000 calls.",
      "source": {
        "label": "Iterator for Combination - LeetCode 1286",
        "url": "https://leetcode.com/problems/iterator-for-combination/"
      },
      "examples": [
        {
          "input": "CombinationIterator(\"abc\", 2); next(); next(); next(); hasNext()",
          "output": "\"ab\", \"ac\", \"bc\", false",
          "explanation": "Combinations are returned in lexicographic order."
        },
        {
          "input": "CombinationIterator(\"abcd\", 3)",
          "output": "\"abc\" first",
          "explanation": "The first combination uses the leftmost indices."
        },
        {
          "input": "CombinationIterator(\"a\", 1)",
          "output": "\"a\" then false",
          "explanation": "Only one combination exists."
        }
      ],
      "bruteForceComplexity": "Constructor Time O(2^n * n log C); Space O(C*k). Generate all subsets of length k and sort.",
      "optimizedComplexity": "Constructor Time O(k); next Time O(k); hasNext Time O(1); Space O(k). Lazy index advancement.",
      "recursiveComplexity": "Constructor Time O(C*k); Space O(C*k). Backtracking precomputes combinations in lexicographic order.",
      "bruteForceCode": "import java.util.*;\n\nclass CombinationIterator {\n  private final List<String> combinations = new ArrayList<>();\n  private int index = 0;\n\n  public CombinationIterator(String characters, int combinationLength) {\n    int n = characters.length();\n    for (int mask = 0; mask < (1 << n); mask++) {\n      if (Integer.bitCount(mask) != combinationLength) continue;\n      StringBuilder sb = new StringBuilder();\n      for (int i = 0; i < n; i++) if ((mask & (1 << i)) != 0) sb.append(characters.charAt(i));\n      combinations.add(sb.toString());\n    }\n    Collections.sort(combinations);\n  }\n\n  public String next() {\n    return combinations.get(index++);\n  }\n\n  public boolean hasNext() {\n    return index < combinations.size();\n  }\n}",
      "iterativeCode": "class CombinationIterator {\n  private final String characters;\n  private final int[] indexes;\n  private boolean hasNext = true;\n\n  public CombinationIterator(String characters, int combinationLength) {\n    this.characters = characters;\n    this.indexes = new int[combinationLength];\n    for (int i = 0; i < combinationLength; i++) indexes[i] = i;\n  }\n\n  public String next() {\n    StringBuilder sb = new StringBuilder();\n    for (int index : indexes) sb.append(characters.charAt(index));\n    advance();\n    return sb.toString();\n  }\n\n  public boolean hasNext() {\n    return hasNext;\n  }\n\n  private void advance() {\n    int n = characters.length(), k = indexes.length;\n    int pos = k - 1;\n    while (pos >= 0 && indexes[pos] == n - k + pos) pos--;\n    if (pos < 0) { hasNext = false; return; }\n    indexes[pos]++;\n    for (int i = pos + 1; i < k; i++) indexes[i] = indexes[i - 1] + 1;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass CombinationIterator {\n  private final List<String> combinations = new ArrayList<>();\n  private int index = 0;\n\n  public CombinationIterator(String characters, int combinationLength) {\n    backtrack(characters, combinationLength, 0, new StringBuilder());\n  }\n\n  public String next() {\n    return combinations.get(index++);\n  }\n\n  public boolean hasNext() {\n    return index < combinations.size();\n  }\n\n  private void backtrack(String characters, int k, int start, StringBuilder path) {\n    if (path.length() == k) { combinations.add(path.toString()); return; }\n    int need = k - path.length();\n    for (int i = start; i <= characters.length() - need; i++) {\n      path.append(characters.charAt(i));\n      backtrack(characters, k, i + 1, path);\n      path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
      "optimizedCode": "class CombinationIterator {\n  private final String characters;\n  private final int[] indexes;\n  private boolean hasNext = true;\n\n  public CombinationIterator(String characters, int combinationLength) {\n    this.characters = characters;\n    this.indexes = new int[combinationLength];\n    for (int i = 0; i < combinationLength; i++) indexes[i] = i;\n  }\n\n  public String next() {\n    StringBuilder sb = new StringBuilder();\n    for (int index : indexes) sb.append(characters.charAt(index));\n    advance();\n    return sb.toString();\n  }\n\n  public boolean hasNext() {\n    return hasNext;\n  }\n\n  private void advance() {\n    int n = characters.length(), k = indexes.length;\n    int pos = k - 1;\n    while (pos >= 0 && indexes[pos] == n - k + pos) pos--;\n    if (pos < 0) { hasNext = false; return; }\n    indexes[pos]++;\n    for (int i = pos + 1; i < k; i++) indexes[i] = indexes[i - 1] + 1;\n  }\n}",
      "code": "class CombinationIterator {\n  private final String characters;\n  private final int[] indexes;\n  private boolean hasNext = true;\n\n  public CombinationIterator(String characters, int combinationLength) {\n    this.characters = characters;\n    this.indexes = new int[combinationLength];\n    for (int i = 0; i < combinationLength; i++) indexes[i] = i;\n  }\n\n  public String next() {\n    StringBuilder sb = new StringBuilder();\n    for (int index : indexes) sb.append(characters.charAt(index));\n    advance();\n    return sb.toString();\n  }\n\n  public boolean hasNext() {\n    return hasNext;\n  }\n\n  private void advance() {\n    int n = characters.length(), k = indexes.length;\n    int pos = k - 1;\n    while (pos >= 0 && indexes[pos] == n - k + pos) pos--;\n    if (pos < 0) { hasNext = false; return; }\n    indexes[pos]++;\n    for (int i = pos + 1; i < k; i++) indexes[i] = indexes[i - 1] + 1;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "The kth Lexicographical Happy String",
      "difficulty": "Medium",
      "subpattern": "Bounded string backtracking with early stop",
      "question": "A happy string contains only a, b, c and no equal adjacent characters. Given n and k, return the kth lexicographical happy string of length n, or empty string if fewer than k exist.",
      "trigger": "The search builds strings lexicographically and rejects choices equal to the previous character.",
      "intuition": "Try a, b, c in order at each position. Count completed strings and stop when the kth is reached.",
      "edgeCases": "k too large, n = 1, adjacent duplicate rejection, lexicographic order, early stopping.",
      "constraints": "1 <= n <= 10; 1 <= k <= 100.",
      "source": {
        "label": "The k-th Lexicographical String of All Happy Strings of Length n - LeetCode 1415",
        "url": "https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/"
      },
      "examples": [
        {
          "input": "n = 1, k = 3",
          "output": "\"c\"",
          "explanation": "The happy strings are a, b, c."
        },
        {
          "input": "n = 1, k = 4",
          "output": "\"\"",
          "explanation": "Only three strings exist."
        },
        {
          "input": "n = 3, k = 9",
          "output": "\"cab\"",
          "explanation": "cab is ninth in lexicographic order."
        }
      ],
      "bruteForceComplexity": "Time O(3^n * n log 3^n); Space O(3^n * n). Generate all strings, filter, and sort.",
      "optimizedComplexity": "Time O(k*n); Space O(k*n). Iterative queue generates happy strings in lexicographic BFS order.",
      "recursiveComplexity": "Time O(k*n); Space O(n). Backtracking stops once the kth string is found.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String getHappyString(int n, int k) {\n    List<String> all = new ArrayList<>();\n    generate(n, new StringBuilder(), all);\n    Collections.sort(all);\n    return k <= all.size() ? all.get(k - 1) : \"\";\n  }\n\n  private void generate(int n, StringBuilder path, List<String> all) {\n    if (path.length() == n) { all.add(path.toString()); return; }\n    for (char ch : new char[]{'a','b','c'}) {\n      if (path.length() > 0 && path.charAt(path.length() - 1) == ch) continue;\n      path.append(ch); generate(n, path, all); path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String getHappyString(int n, int k) {\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"a\"); queue.offer(\"b\"); queue.offer(\"c\");\n    while (!queue.isEmpty()) {\n      String current = queue.poll();\n      if (current.length() == n) {\n        if (--k == 0) return current;\n        continue;\n      }\n      for (char ch : new char[]{'a','b','c'}) {\n        if (current.charAt(current.length() - 1) != ch) queue.offer(current + ch);\n      }\n    }\n    return \"\";\n  }\n}",
      "recursiveCode": "class Solution {\n  private int count = 0;\n  private String answer = \"\";\n\n  public String getHappyString(int n, int k) {\n    backtrack(n, k, new StringBuilder());\n    return answer;\n  }\n\n  private void backtrack(int n, int k, StringBuilder path) {\n    if (!answer.isEmpty()) return;\n    if (path.length() == n) {\n      count++;\n      if (count == k) answer = path.toString();\n      return;\n    }\n    for (char ch : new char[]{'a','b','c'}) {\n      if (path.length() > 0 && path.charAt(path.length() - 1) == ch) continue;\n      path.append(ch);\n      backtrack(n, k, path);\n      path.deleteCharAt(path.length() - 1);\n    }\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String getHappyString(int n, int k) {\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"a\"); queue.offer(\"b\"); queue.offer(\"c\");\n    while (!queue.isEmpty()) {\n      String current = queue.poll();\n      if (current.length() == n) {\n        if (--k == 0) return current;\n        continue;\n      }\n      for (char ch : new char[]{'a','b','c'}) {\n        if (current.charAt(current.length() - 1) != ch) queue.offer(current + ch);\n      }\n    }\n    return \"\";\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String getHappyString(int n, int k) {\n    Queue<String> queue = new ArrayDeque<>();\n    queue.offer(\"a\"); queue.offer(\"b\"); queue.offer(\"c\");\n    while (!queue.isEmpty()) {\n      String current = queue.poll();\n      if (current.length() == n) {\n        if (--k == 0) return current;\n        continue;\n      }\n      for (char ch : new char[]{'a','b','c'}) {\n        if (current.charAt(current.length() - 1) != ch) queue.offer(current + ch);\n      }\n    }\n    return \"\";\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Length of a Concatenated String with Unique Characters",
      "difficulty": "Medium",
      "subpattern": "Subset backtracking with bitmask pruning",
      "question": "Given an array arr of strings, return the maximum possible length of a concatenation of a subsequence of arr with all unique characters.",
      "trigger": "Each string can be chosen or skipped, but it is valid only if its character mask does not overlap the current mask.",
      "intuition": "Convert each valid string to a bitmask. Backtrack over masks, choosing only masks disjoint from the current one.",
      "edgeCases": "String with duplicate internal letters, empty answer, overlapping characters, all strings compatible, all strings incompatible.",
      "constraints": "1 <= arr.length <= 16; 1 <= arr[i].length <= 26; arr[i] contains lowercase English letters.",
      "source": {
        "label": "Maximum Length of a Concatenated String with Unique Characters - LeetCode 1239",
        "url": "https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/"
      },
      "examples": [
        {
          "input": "arr = [\"un\",\"iq\",\"ue\"]",
          "output": "4",
          "explanation": "uniq or ique has length 4."
        },
        {
          "input": "arr = [\"cha\",\"r\",\"act\",\"ers\"]",
          "output": "6",
          "explanation": "chaers is one maximum choice."
        },
        {
          "input": "arr = [\"abcdefghijklmnopqrstuvwxyz\"]",
          "output": "26",
          "explanation": "The single string uses every letter once."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n * L); Space O(L). Test every subset by building a character set.",
      "optimizedComplexity": "Time O(2^n); Space O(2^n). Iterative mask DP keeps only compatible concatenations.",
      "recursiveComplexity": "Time O(2^n); Space O(n). Backtracking prunes overlapping masks.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int maxLength(List<String> arr) {\n    int best = 0;\n    for (int mask = 0; mask < (1 << arr.size()); mask++) {\n      Set<Character> seen = new HashSet<>();\n      int length = 0;\n      boolean valid = true;\n      for (int i = 0; i < arr.size(); i++) if ((mask & (1 << i)) != 0) {\n        for (char ch : arr.get(i).toCharArray()) if (!seen.add(ch)) valid = false;\n        length += arr.get(i).length();\n      }\n      if (valid) best = Math.max(best, length);\n    }\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int maxLength(List<String> arr) {\n    List<Integer> masks = new ArrayList<>();\n    masks.add(0);\n    int best = 0;\n    for (String word : arr) {\n      int mask = toMask(word);\n      if (mask == -1) continue;\n      int size = masks.size();\n      for (int i = 0; i < size; i++) {\n        if ((masks.get(i) & mask) != 0) continue;\n        int next = masks.get(i) | mask;\n        masks.add(next);\n        best = Math.max(best, Integer.bitCount(next));\n      }\n    }\n    return best;\n  }\n\n  private int toMask(String word) {\n    int mask = 0;\n    for (char ch : word.toCharArray()) {\n      int bit = 1 << (ch - 'a');\n      if ((mask & bit) != 0) return -1;\n      mask |= bit;\n    }\n    return mask;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int maxLength(List<String> arr) {\n    List<Integer> masks = new ArrayList<>();\n    for (String word : arr) {\n      int mask = toMask(word);\n      if (mask != -1) masks.add(mask);\n    }\n    return backtrack(masks, 0, 0);\n  }\n\n  private int backtrack(List<Integer> masks, int index, int used) {\n    int best = Integer.bitCount(used);\n    for (int i = index; i < masks.size(); i++) {\n      if ((used & masks.get(i)) != 0) continue;\n      best = Math.max(best, backtrack(masks, i + 1, used | masks.get(i)));\n    }\n    return best;\n  }\n\n  private int toMask(String word) {\n    int mask = 0;\n    for (char ch : word.toCharArray()) {\n      int bit = 1 << (ch - 'a');\n      if ((mask & bit) != 0) return -1;\n      mask |= bit;\n    }\n    return mask;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int maxLength(List<String> arr) {\n    List<Integer> masks = new ArrayList<>();\n    masks.add(0);\n    int best = 0;\n    for (String word : arr) {\n      int mask = toMask(word);\n      if (mask == -1) continue;\n      int size = masks.size();\n      for (int i = 0; i < size; i++) {\n        if ((masks.get(i) & mask) != 0) continue;\n        int next = masks.get(i) | mask;\n        masks.add(next);\n        best = Math.max(best, Integer.bitCount(next));\n      }\n    }\n    return best;\n  }\n\n  private int toMask(String word) {\n    int mask = 0;\n    for (char ch : word.toCharArray()) {\n      int bit = 1 << (ch - 'a');\n      if ((mask & bit) != 0) return -1;\n      mask |= bit;\n    }\n    return mask;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int maxLength(List<String> arr) {\n    List<Integer> masks = new ArrayList<>();\n    masks.add(0);\n    int best = 0;\n    for (String word : arr) {\n      int mask = toMask(word);\n      if (mask == -1) continue;\n      int size = masks.size();\n      for (int i = 0; i < size; i++) {\n        if ((masks.get(i) & mask) != 0) continue;\n        int next = masks.get(i) | mask;\n        masks.add(next);\n        best = Math.max(best, Integer.bitCount(next));\n      }\n    }\n    return best;\n  }\n\n  private int toMask(String word) {\n    int mask = 0;\n    for (char ch : word.toCharArray()) {\n      int bit = 1 << (ch - 'a');\n      if ((mask & bit) != 0) return -1;\n      mask |= bit;\n    }\n    return mask;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Number of Squareful Arrays",
      "difficulty": "Hard",
      "subpattern": "Permutation backtracking with adjacency constraint",
      "question": "Given nums, return the number of permutations where the sum of every adjacent pair is a perfect square.",
      "trigger": "The permutation search has a local adjacency constraint and duplicate values must not create duplicate permutations.",
      "intuition": "Sort nums. At each position choose an unused value that either starts the path or forms a square sum with the previous value. Skip duplicate choices at the same depth.",
      "edgeCases": "Duplicates, no squareful edge, all values same, one element, perfect-square check precision.",
      "constraints": "1 <= nums.length <= 12; 0 <= nums[i] <= 1000000000.",
      "source": {
        "label": "Number of Squareful Arrays - LeetCode 996",
        "url": "https://leetcode.com/problems/number-of-squareful-arrays/"
      },
      "examples": [
        {
          "input": "nums = [1,17,8]",
          "output": "2",
          "explanation": "[1,8,17] and [17,8,1] are squareful."
        },
        {
          "input": "nums = [2,2,2]",
          "output": "1",
          "explanation": "Duplicate permutations count once."
        },
        {
          "input": "nums = [1,1,8,1,8]",
          "output": "1",
          "explanation": "Duplicates are handled by counts."
        }
      ],
      "bruteForceComplexity": "Time O(n! * n); Space O(n! * n). Generate all unique permutations and validate adjacency.",
      "optimizedComplexity": "Time O(n^2 * 2^n); Space O(n * 2^n). Bitmask DP counts paths ending at each index.",
      "recursiveComplexity": "Time O(n!); Space O(n). Sorted backtracking skips duplicate values and invalid square edges.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int numSquarefulPerms(int[] nums) {\n    Set<List<Integer>> unique = new HashSet<>();\n    permute(nums, 0, unique);\n    int count = 0;\n    for (List<Integer> perm : unique) if (valid(perm)) count++;\n    return count;\n  }\n\n  private void permute(int[] nums, int index, Set<List<Integer>> unique) {\n    if (index == nums.length) {\n      List<Integer> path = new ArrayList<>();\n      for (int num : nums) path.add(num);\n      unique.add(path);\n      return;\n    }\n    for (int i = index; i < nums.length; i++) { swap(nums, index, i); permute(nums, index + 1, unique); swap(nums, index, i); }\n  }\n\n  private boolean valid(List<Integer> nums) {\n    for (int i = 1; i < nums.size(); i++) if (!square(nums.get(i) + nums.get(i - 1))) return false;\n    return true;\n  }\n\n  private boolean square(int value) { int r = (int)Math.sqrt(value); return r * r == value; }\n  private void swap(int[] nums, int i, int j) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int numSquarefulPerms(int[] nums) {\n    int n = nums.length;\n    Arrays.sort(nums);\n    int[][] dp = new int[1 << n][n];\n    for (int i = 0; i < n; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      dp[1 << i][i] = 1;\n    }\n    for (int mask = 0; mask < (1 << n); mask++) {\n      for (int last = 0; last < n; last++) {\n        if (dp[mask][last] == 0) continue;\n        for (int next = 0; next < n; next++) {\n          if ((mask & (1 << next)) != 0) continue;\n          if (next > 0 && nums[next] == nums[next - 1] && (mask & (1 << (next - 1))) == 0) continue;\n          if (square(nums[last] + nums[next])) dp[mask | (1 << next)][next] += dp[mask][last];\n        }\n      }\n    }\n    int answer = 0;\n    for (int count : dp[(1 << n) - 1]) answer += count;\n    return answer;\n  }\n\n  private boolean square(int value) { int r = (int)Math.sqrt(value); return r * r == value; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int numSquarefulPerms(int[] nums) {\n    Arrays.sort(nums);\n    return backtrack(nums, new boolean[nums.length], -1, 0);\n  }\n\n  private int backtrack(int[] nums, boolean[] used, int previous, int depth) {\n    if (depth == nums.length) return 1;\n    int count = 0;\n    for (int i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;\n      if (previous != -1 && !square(previous + nums[i])) continue;\n      used[i] = true;\n      count += backtrack(nums, used, nums[i], depth + 1);\n      used[i] = false;\n    }\n    return count;\n  }\n\n  private boolean square(int value) { int r = (int)Math.sqrt(value); return r * r == value; }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int numSquarefulPerms(int[] nums) {\n    int n = nums.length;\n    Arrays.sort(nums);\n    int[][] dp = new int[1 << n][n];\n    for (int i = 0; i < n; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      dp[1 << i][i] = 1;\n    }\n    for (int mask = 0; mask < (1 << n); mask++) {\n      for (int last = 0; last < n; last++) {\n        if (dp[mask][last] == 0) continue;\n        for (int next = 0; next < n; next++) {\n          if ((mask & (1 << next)) != 0) continue;\n          if (next > 0 && nums[next] == nums[next - 1] && (mask & (1 << (next - 1))) == 0) continue;\n          if (square(nums[last] + nums[next])) dp[mask | (1 << next)][next] += dp[mask][last];\n        }\n      }\n    }\n    int answer = 0;\n    for (int count : dp[(1 << n) - 1]) answer += count;\n    return answer;\n  }\n\n  private boolean square(int value) { int r = (int)Math.sqrt(value); return r * r == value; }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int numSquarefulPerms(int[] nums) {\n    int n = nums.length;\n    Arrays.sort(nums);\n    int[][] dp = new int[1 << n][n];\n    for (int i = 0; i < n; i++) {\n      if (i > 0 && nums[i] == nums[i - 1]) continue;\n      dp[1 << i][i] = 1;\n    }\n    for (int mask = 0; mask < (1 << n); mask++) {\n      for (int last = 0; last < n; last++) {\n        if (dp[mask][last] == 0) continue;\n        for (int next = 0; next < n; next++) {\n          if ((mask & (1 << next)) != 0) continue;\n          if (next > 0 && nums[next] == nums[next - 1] && (mask & (1 << (next - 1))) == 0) continue;\n          if (square(nums[last] + nums[next])) dp[mask | (1 << next)][next] += dp[mask][last];\n        }\n      }\n    }\n    int answer = 0;\n    for (int count : dp[(1 << n) - 1]) answer += count;\n    return answer;\n  }\n\n  private boolean square(int value) { int r = (int)Math.sqrt(value); return r * r == value; }\n}"
    },
    {
      "group": "more-practice",
      "name": "Shopping Offers",
      "difficulty": "Medium",
      "subpattern": "Memoized offer-selection backtracking",
      "question": "Given item prices, special bundle offers, and item needs, return the minimum cost to satisfy exactly the needs.",
      "trigger": "Each state is remaining needs; every offer can be applied if it does not exceed remaining needs, and states repeat.",
      "intuition": "The base cost is buying remaining items individually. Try every valid offer, recurse on reduced needs, and memoize the best cost for each needs vector.",
      "edgeCases": "Offer exceeds needs, offer not cheaper than direct purchase, zero needs, repeated states, exact needs only.",
      "constraints": "1 <= price.length <= 6; 0 <= special.length <= 100; 0 <= needs[i] <= 10.",
      "source": {
        "label": "Shopping Offers - LeetCode 638",
        "url": "https://leetcode.com/problems/shopping-offers/"
      },
      "examples": [
        {
          "input": "price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]",
          "output": "14",
          "explanation": "Use both offers for total 14."
        },
        {
          "input": "price = [2,3,4], special = [[1,1,0,4],[2,2,1,9]], needs = [1,2,1]",
          "output": "11",
          "explanation": "Best mix uses one offer and direct buys."
        },
        {
          "input": "needs = [0,0]",
          "output": "0",
          "explanation": "No items are needed."
        }
      ],
      "bruteForceComplexity": "Time exponential in needs and offers; Space O(sum(needs)). Plain recursion tries all offer sequences.",
      "optimizedComplexity": "Time O(states * offers * itemTypes); Space O(states). Iterative relaxation over reachable needs states.",
      "recursiveComplexity": "Time O(states * offers * itemTypes); Space O(states). Memoized backtracking caches remaining-needs vectors.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(List<Integer> price, List<List<Integer>> special, List<Integer> needs) {\n    int best = direct(price, needs);\n    for (List<Integer> offer : special) {\n      List<Integer> next = apply(offer, needs);\n      if (next == null) continue;\n      best = Math.min(best, offer.get(offer.size() - 1) + shoppingOffers(price, special, next));\n    }\n    return best;\n  }\n\n  private int direct(List<Integer> price, List<Integer> needs) {\n    int cost = 0;\n    for (int i = 0; i < needs.size(); i++) cost += price.get(i) * needs.get(i);\n    return cost;\n  }\n\n  private List<Integer> apply(List<Integer> offer, List<Integer> needs) {\n    List<Integer> next = new ArrayList<>();\n    for (int i = 0; i < needs.size(); i++) {\n      if (offer.get(i) > needs.get(i)) return null;\n      next.add(needs.get(i) - offer.get(i));\n    }\n    return next;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(List<Integer> price, List<List<Integer>> special, List<Integer> needs) {\n    Map<List<Integer>, Integer> cost = new HashMap<>();\n    Queue<List<Integer>> queue = new ArrayDeque<>();\n    cost.put(new ArrayList<>(needs), 0);\n    queue.offer(new ArrayList<>(needs));\n    int answer = direct(price, needs);\n    while (!queue.isEmpty()) {\n      List<Integer> state = queue.poll();\n      int spent = cost.get(state);\n      answer = Math.min(answer, spent + direct(price, state));\n      for (List<Integer> offer : special) {\n        List<Integer> next = apply(offer, state);\n        if (next == null) continue;\n        int nextCost = spent + offer.get(offer.size() - 1);\n        if (nextCost < cost.getOrDefault(next, Integer.MAX_VALUE)) {\n          cost.put(next, nextCost);\n          queue.offer(next);\n        }\n      }\n    }\n    return answer;\n  }\n\n  private int direct(List<Integer> price, List<Integer> needs) { int c = 0; for (int i = 0; i < needs.size(); i++) c += price.get(i) * needs.get(i); return c; }\n  private List<Integer> apply(List<Integer> offer, List<Integer> needs) { List<Integer> next = new ArrayList<>(); for (int i = 0; i < needs.size(); i++) { if (offer.get(i) > needs.get(i)) return null; next.add(needs.get(i) - offer.get(i)); } return next; }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(List<Integer> price, List<List<Integer>> special, List<Integer> needs) {\n    return dfs(price, special, needs, new HashMap<>());\n  }\n\n  private int dfs(List<Integer> price, List<List<Integer>> special, List<Integer> needs, Map<List<Integer>, Integer> memo) {\n    if (memo.containsKey(needs)) return memo.get(needs);\n    int best = direct(price, needs);\n    for (List<Integer> offer : special) {\n      List<Integer> next = apply(offer, needs);\n      if (next == null) continue;\n      best = Math.min(best, offer.get(offer.size() - 1) + dfs(price, special, next, memo));\n    }\n    memo.put(new ArrayList<>(needs), best);\n    return best;\n  }\n\n  private int direct(List<Integer> price, List<Integer> needs) { int c = 0; for (int i = 0; i < needs.size(); i++) c += price.get(i) * needs.get(i); return c; }\n  private List<Integer> apply(List<Integer> offer, List<Integer> needs) { List<Integer> next = new ArrayList<>(); for (int i = 0; i < needs.size(); i++) { if (offer.get(i) > needs.get(i)) return null; next.add(needs.get(i) - offer.get(i)); } return next; }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(List<Integer> price, List<List<Integer>> special, List<Integer> needs) {\n    Map<List<Integer>, Integer> cost = new HashMap<>();\n    Queue<List<Integer>> queue = new ArrayDeque<>();\n    cost.put(new ArrayList<>(needs), 0);\n    queue.offer(new ArrayList<>(needs));\n    int answer = direct(price, needs);\n    while (!queue.isEmpty()) {\n      List<Integer> state = queue.poll();\n      int spent = cost.get(state);\n      answer = Math.min(answer, spent + direct(price, state));\n      for (List<Integer> offer : special) {\n        List<Integer> next = apply(offer, state);\n        if (next == null) continue;\n        int nextCost = spent + offer.get(offer.size() - 1);\n        if (nextCost < cost.getOrDefault(next, Integer.MAX_VALUE)) {\n          cost.put(next, nextCost);\n          queue.offer(next);\n        }\n      }\n    }\n    return answer;\n  }\n\n  private int direct(List<Integer> price, List<Integer> needs) { int c = 0; for (int i = 0; i < needs.size(); i++) c += price.get(i) * needs.get(i); return c; }\n  private List<Integer> apply(List<Integer> offer, List<Integer> needs) { List<Integer> next = new ArrayList<>(); for (int i = 0; i < needs.size(); i++) { if (offer.get(i) > needs.get(i)) return null; next.add(needs.get(i) - offer.get(i)); } return next; }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int shoppingOffers(List<Integer> price, List<List<Integer>> special, List<Integer> needs) {\n    Map<List<Integer>, Integer> cost = new HashMap<>();\n    Queue<List<Integer>> queue = new ArrayDeque<>();\n    cost.put(new ArrayList<>(needs), 0);\n    queue.offer(new ArrayList<>(needs));\n    int answer = direct(price, needs);\n    while (!queue.isEmpty()) {\n      List<Integer> state = queue.poll();\n      int spent = cost.get(state);\n      answer = Math.min(answer, spent + direct(price, state));\n      for (List<Integer> offer : special) {\n        List<Integer> next = apply(offer, state);\n        if (next == null) continue;\n        int nextCost = spent + offer.get(offer.size() - 1);\n        if (nextCost < cost.getOrDefault(next, Integer.MAX_VALUE)) {\n          cost.put(next, nextCost);\n          queue.offer(next);\n        }\n      }\n    }\n    return answer;\n  }\n\n  private int direct(List<Integer> price, List<Integer> needs) { int c = 0; for (int i = 0; i < needs.size(); i++) c += price.get(i) * needs.get(i); return c; }\n  private List<Integer> apply(List<Integer> offer, List<Integer> needs) { List<Integer> next = new ArrayList<>(); for (int i = 0; i < needs.size(); i++) { if (offer.get(i) > needs.get(i)) return null; next.add(needs.get(i) - offer.get(i)); } return next; }\n}"
    },
    {
      "group": "more-practice",
      "name": "Additive Number",
      "difficulty": "Medium",
      "subpattern": "Numeric split backtracking with leading-zero constraints",
      "question": "Given a string num, return true if it is an additive number: a sequence of at least three numbers where every number is the sum of the previous two.",
      "trigger": "The search chooses the first two numbers, then the rest of the string is forced by their sum.",
      "intuition": "Try every valid first and second split. Reject leading zeros. Then repeatedly match the expected sum string.",
      "edgeCases": "Leading zeros, very large numbers, fewer than three numbers, exact full-string consumption, zero plus zero.",
      "constraints": "1 <= num.length <= 35; num contains only digits.",
      "source": {
        "label": "Additive Number - LeetCode 306",
        "url": "https://leetcode.com/problems/additive-number/"
      },
      "examples": [
        {
          "input": "num = \"112358\"",
          "output": "true",
          "explanation": "1,1,2,3,5,8 is additive."
        },
        {
          "input": "num = \"199100199\"",
          "output": "true",
          "explanation": "1,99,100,199 is additive."
        },
        {
          "input": "num = \"1023\"",
          "output": "false",
          "explanation": "Leading-zero and sum rules prevent a valid sequence."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(n). Try first two splits and simulate the sequence.",
      "optimizedComplexity": "Time O(n^3); Space O(n). Iterative matching stops as soon as expected sum mismatches.",
      "recursiveComplexity": "Time O(n^3); Space O(n). Recursive check consumes expected sum strings.",
      "bruteForceCode": "import java.math.*;\n\nclass Solution {\n  public boolean isAdditiveNumber(String num) {\n    int n = num.length();\n    for (int i = 1; i <= n / 2; i++) {\n      for (int j = i + 1; j < n; j++) {\n        String a = num.substring(0, i), b = num.substring(i, j);\n        if (!validNumber(a) || !validNumber(b)) continue;\n        if (check(num.substring(j), new BigInteger(a), new BigInteger(b))) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean check(String rest, BigInteger a, BigInteger b) {\n    while (!rest.isEmpty()) {\n      String sum = a.add(b).toString();\n      if (!rest.startsWith(sum)) return false;\n      rest = rest.substring(sum.length());\n      a = b; b = new BigInteger(sum);\n    }\n    return true;\n  }\n\n  private boolean validNumber(String s) { return s.length() == 1 || s.charAt(0) != '0'; }\n}",
      "iterativeCode": "import java.math.*;\n\nclass Solution {\n  public boolean isAdditiveNumber(String num) {\n    int n = num.length();\n    for (int firstEnd = 1; firstEnd <= n / 2; firstEnd++) {\n      if (num.charAt(0) == '0' && firstEnd > 1) break;\n      for (int secondEnd = firstEnd + 1; secondEnd < n; secondEnd++) {\n        if (num.charAt(firstEnd) == '0' && secondEnd - firstEnd > 1) break;\n        BigInteger a = new BigInteger(num.substring(0, firstEnd));\n        BigInteger b = new BigInteger(num.substring(firstEnd, secondEnd));\n        int index = secondEnd;\n        while (index < n) {\n          String sum = a.add(b).toString();\n          if (!num.startsWith(sum, index)) break;\n          index += sum.length();\n          a = b;\n          b = new BigInteger(sum);\n        }\n        if (index == n) return true;\n      }\n    }\n    return false;\n  }\n}",
      "recursiveCode": "import java.math.*;\n\nclass Solution {\n  public boolean isAdditiveNumber(String num) {\n    int n = num.length();\n    for (int i = 1; i <= n / 2; i++) {\n      if (num.charAt(0) == '0' && i > 1) break;\n      for (int j = i + 1; j < n; j++) {\n        if (num.charAt(i) == '0' && j - i > 1) break;\n        BigInteger a = new BigInteger(num.substring(0, i));\n        BigInteger b = new BigInteger(num.substring(i, j));\n        if (backtrack(num, j, a, b, 2)) return true;\n      }\n    }\n    return false;\n  }\n\n  private boolean backtrack(String num, int index, BigInteger a, BigInteger b, int count) {\n    if (index == num.length()) return count >= 3;\n    String sum = a.add(b).toString();\n    if (!num.startsWith(sum, index)) return false;\n    return backtrack(num, index + sum.length(), b, new BigInteger(sum), count + 1);\n  }\n}",
      "optimizedCode": "import java.math.*;\n\nclass Solution {\n  public boolean isAdditiveNumber(String num) {\n    int n = num.length();\n    for (int firstEnd = 1; firstEnd <= n / 2; firstEnd++) {\n      if (num.charAt(0) == '0' && firstEnd > 1) break;\n      for (int secondEnd = firstEnd + 1; secondEnd < n; secondEnd++) {\n        if (num.charAt(firstEnd) == '0' && secondEnd - firstEnd > 1) break;\n        BigInteger a = new BigInteger(num.substring(0, firstEnd));\n        BigInteger b = new BigInteger(num.substring(firstEnd, secondEnd));\n        int index = secondEnd;\n        while (index < n) {\n          String sum = a.add(b).toString();\n          if (!num.startsWith(sum, index)) break;\n          index += sum.length();\n          a = b;\n          b = new BigInteger(sum);\n        }\n        if (index == n) return true;\n      }\n    }\n    return false;\n  }\n}",
      "code": "import java.math.*;\n\nclass Solution {\n  public boolean isAdditiveNumber(String num) {\n    int n = num.length();\n    for (int firstEnd = 1; firstEnd <= n / 2; firstEnd++) {\n      if (num.charAt(0) == '0' && firstEnd > 1) break;\n      for (int secondEnd = firstEnd + 1; secondEnd < n; secondEnd++) {\n        if (num.charAt(firstEnd) == '0' && secondEnd - firstEnd > 1) break;\n        BigInteger a = new BigInteger(num.substring(0, firstEnd));\n        BigInteger b = new BigInteger(num.substring(firstEnd, secondEnd));\n        int index = secondEnd;\n        while (index < n) {\n          String sum = a.add(b).toString();\n          if (!num.startsWith(sum, index)) break;\n          index += sum.length();\n          a = b;\n          b = new BigInteger(sum);\n        }\n        if (index == n) return true;\n      }\n    }\n    return false;\n  }\n}"
    }
  ],
  "checklist": [
    "The problem asks for all valid combinations, subsets, permutations, paths, partitions, or constructed strings.",
    "A choice is made, constraints are checked, recursion continues, and the choice must be undone.",
    "The search space is exponential or factorial, so pruning and duplicate skipping matter.",
    "The state includes path plus constraints such as used indexes, remaining sum, visited cells, or bucket sums.",
    "Output order is often flexible, but duplicate outputs must be prevented at the correct recursion depth."
  ],
  "traps": [
    "Forgetting to remove the last path element after recursion returns.",
    "Skipping duplicates globally instead of only at the same recursion depth.",
    "Allowing leading-zero numbers in IP, additive, or expression problems.",
    "Checking constraints too late and exploring impossible branches.",
    "Not memoizing when different paths reach the same remaining-state problem."
  ],
  "edgeCases": [
    "Empty path or empty subset when valid.",
    "Single element, single cell, or one-character input.",
    "All duplicate values or repeated letters.",
    "No valid solution and exactly one valid solution.",
    "Maximum input where naive factorial search needs pruning."
  ],
  "complexities": [
    "Subset-style backtracking is usually O(2^n) states.",
    "Permutation-style backtracking is usually O(n!) states before duplicate pruning.",
    "Combination search depends on C(n,k) or target/minCandidate branching.",
    "Grid path search can grow as O(3^L) or O(4^cells) depending on revisit rules.",
    "Memoized backtracking is number of unique states times transition cost."
  ],
  "mentalModel": [
    "Choose one candidate from the current state.",
    "Reject the choice immediately if it violates constraints.",
    "Apply the choice to path/state, recurse, then undo it.",
    "Skip duplicate choices at the depth where they would create duplicate outputs.",
    "Cache only when the future depends on state, not on the exact path text."
  ],
  "revisionStrategy": [
    "Master the 12 core problems first: subsets, permutations, combinations, parentheses, and string partitions.",
    "For every problem, write path, start/index, constraints, and undo step before coding.",
    "Redo duplicate-handling problems together: Subsets II, Permutations II, Combination Sum II, Increasing Subsequences.",
    "Practice one grid problem and one bucket/partition problem every third revision session.",
    "After solving, state the branching factor, max depth, and pruning rule in one line."
  ],
  "unseen": [
    "Generate all valid license keys by inserting dashes under segment-length rules.",
    "Find all grid paths that collect exactly k coins without revisiting cells.",
    "Partition an array into groups where each group has unique remainders modulo m.",
    "Build all strings of length n over four letters with no repeated distance-two character.",
    "Choose minimum coupons to satisfy item needs when coupons can overlap."
  ]
};
