const CURRENT_PATTERN = {
  "id": "stack",
  "name": "Stack",
  "summary": "Monotonic stack, parsing, expression evaluation, intervals.",
  "complete": true,
  "subpatterns": [
    "Core Stack recognition",
    "Boundary handling in Stack",
    "Optimized iterative Stack",
    "Recursive or DFS-style Stack",
    "Advanced Stack variations"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Valid Parentheses",
      "difficulty": "Easy",
      "subpattern": "Bracket matching stack",
      "question": "Given a string s containing only parentheses characters (, ), {, }, [ and ], return true if the brackets are valid. Brackets must be closed by the same type and in the correct order.",
      "trigger": "Nested structures must close in last-opened-first-closed order, which is exactly stack behavior.",
      "intuition": "Push opening brackets. For every closing bracket, the stack top must be the matching opener. At the end, no unmatched opener should remain.",
      "edgeCases": "Empty string, odd length string, starts with closing bracket, mismatched pair, deeply nested valid brackets, leftover opening brackets.",
      "constraints": "1 <= s.length <= 10000; s consists only of characters (), {}, and [].",
      "source": {
        "label": "Valid Parentheses - LeetCode 20",
        "url": "https://leetcode.com/problems/valid-parentheses/"
      },
      "examples": [
        {
          "input": "s = \"()\"",
          "output": "true",
          "explanation": "The only opening bracket is closed correctly."
        },
        {
          "input": "s = \"()[]{}\"",
          "output": "true",
          "explanation": "Each bracket pair is valid."
        },
        {
          "input": "s = \"(]\"",
          "output": "false",
          "explanation": "A parenthesis cannot be closed by a square bracket."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly remove adjacent valid pairs until no change is possible.",
      "optimizedComplexity": "Time O(n); Space O(n). Each bracket is pushed or popped at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion simulates stack depth for nested bracket parsing.",
      "bruteForceCode": "class Solution {\n  public boolean isValid(String s) {\n    String previous;\n\n    do {\n      previous = s;\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    } while (s.length() != previous.length());\n\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean isValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(' || ch == '[' || ch == '{') {\n        stack.push(ch);\n      } else {\n        if (stack.isEmpty()) return false;\n        char open = stack.pop();\n        if (ch == ')' && open != '(') return false;\n        if (ch == ']' && open != '[') return false;\n        if (ch == '}' && open != '{') return false;\n      }\n    }\n\n    return stack.isEmpty();\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index;\n\n  public boolean isValid(String s) {\n    index = 0;\n    return parse(s, '\u0000') && index == s.length();\n  }\n\n  private boolean parse(String s, char expectedClose) {\n    while (index < s.length()) {\n      char ch = s.charAt(index++);\n\n      if (ch == '(' && !parse(s, ')')) return false;\n      else if (ch == '[' && !parse(s, ']')) return false;\n      else if (ch == '{' && !parse(s, '}')) return false;\n      else if (ch == ')' || ch == ']' || ch == '}') return ch == expectedClose;\n    }\n\n    return expectedClose == '\u0000';\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean isValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(' || ch == '[' || ch == '{') {\n        stack.push(ch);\n      } else {\n        if (stack.isEmpty()) return false;\n        char open = stack.pop();\n        if (ch == ')' && open != '(') return false;\n        if (ch == ']' && open != '[') return false;\n        if (ch == '}' && open != '{') return false;\n      }\n    }\n\n    return stack.isEmpty();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean isValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(' || ch == '[' || ch == '{') {\n        stack.push(ch);\n      } else {\n        if (stack.isEmpty()) return false;\n        char open = stack.pop();\n        if (ch == ')' && open != '(') return false;\n        if (ch == ']' && open != '[') return false;\n        if (ch == '}' && open != '{') return false;\n      }\n    }\n\n    return stack.isEmpty();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Min Stack",
      "difficulty": "Medium",
      "subpattern": "Auxiliary minimum stack",
      "question": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
      "trigger": "A normal stack loses previous minimums when values are popped, so a second stack must track the active minimum at each depth.",
      "intuition": "Push each value onto the main stack. Push it onto the min stack when it is less than or equal to the current minimum. Pop from min stack when that minimum value leaves.",
      "edgeCases": "Duplicate minimum values, popping the current minimum, negative values, one element, alternating push/pop calls.",
      "constraints": "-2^31 <= val <= 2^31 - 1; pop, top, and getMin are called only on non-empty stack; at most 30000 calls.",
      "source": {
        "label": "Min Stack - LeetCode 155",
        "url": "https://leetcode.com/problems/min-stack/"
      },
      "examples": [
        {
          "input": "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
          "output": "[null,null,null,-3,null,0,-2]",
          "explanation": "The minimum updates when -3 is popped."
        },
        {
          "input": "push(1), push(1), getMin(), pop(), getMin()",
          "output": "[null,null,1,null,1]",
          "explanation": "Duplicate minimum values are preserved."
        },
        {
          "input": "push(5), top(), getMin()",
          "output": "[null,5,5]",
          "explanation": "A one-element stack has that value as top and minimum."
        }
      ],
      "bruteForceComplexity": "push/pop/top Time O(1), getMin Time O(n); Space O(n). Scan the stack to find the minimum.",
      "optimizedComplexity": "All operations Time O(1); Space O(n). A second stack stores active minimums.",
      "recursiveComplexity": "getMin can be computed recursively in O(n) time and O(n) stack, but optimized stack operations should remain iterative.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass MinStack {\n  private final List<Integer> stack = new ArrayList<>();\n\n  public void push(int val) {\n    stack.add(val);\n  }\n\n  public void pop() {\n    stack.remove(stack.size() - 1);\n  }\n\n  public int top() {\n    return stack.get(stack.size() - 1);\n  }\n\n  public int getMin() {\n    int minimum = stack.get(0);\n    for (int value : stack) minimum = Math.min(minimum, value);\n    return minimum;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MinStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final Deque<Integer> minimums = new ArrayDeque<>();\n\n  public void push(int val) {\n    stack.push(val);\n    if (minimums.isEmpty() || val <= minimums.peek()) {\n      minimums.push(val);\n    }\n  }\n\n  public void pop() {\n    int removed = stack.pop();\n    if (removed == minimums.peek()) {\n      minimums.pop();\n    }\n  }\n\n  public int top() {\n    return stack.peek();\n  }\n\n  public int getMin() {\n    return minimums.peek();\n  }\n}",
      "recursiveCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass MinStack {\n  private final List<Integer> stack = new ArrayList<>();\n\n  public void push(int val) {\n    stack.add(val);\n  }\n\n  public void pop() {\n    stack.remove(stack.size() - 1);\n  }\n\n  public int top() {\n    return stack.get(stack.size() - 1);\n  }\n\n  public int getMin() {\n    return minAt(stack.size() - 1);\n  }\n\n  private int minAt(int index) {\n    if (index == 0) return stack.get(0);\n    return Math.min(stack.get(index), minAt(index - 1));\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MinStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final Deque<Integer> minimums = new ArrayDeque<>();\n\n  public void push(int val) {\n    stack.push(val);\n    if (minimums.isEmpty() || val <= minimums.peek()) {\n      minimums.push(val);\n    }\n  }\n\n  public void pop() {\n    int removed = stack.pop();\n    if (removed == minimums.peek()) {\n      minimums.pop();\n    }\n  }\n\n  public int top() {\n    return stack.peek();\n  }\n\n  public int getMin() {\n    return minimums.peek();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass MinStack {\n  private final Deque<Integer> stack = new ArrayDeque<>();\n  private final Deque<Integer> minimums = new ArrayDeque<>();\n\n  public void push(int val) {\n    stack.push(val);\n    if (minimums.isEmpty() || val <= minimums.peek()) {\n      minimums.push(val);\n    }\n  }\n\n  public void pop() {\n    int removed = stack.pop();\n    if (removed == minimums.peek()) {\n      minimums.pop();\n    }\n  }\n\n  public int top() {\n    return stack.peek();\n  }\n\n  public int getMin() {\n    return minimums.peek();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Evaluate Reverse Polish Notation",
      "difficulty": "Medium",
      "subpattern": "Operand stack expression evaluation",
      "question": "Given an array of tokens representing an arithmetic expression in Reverse Polish Notation, evaluate the expression and return its integer value. Division truncates toward zero.",
      "trigger": "In postfix notation, operators apply to the most recent operands, so operands must be stored in a stack until an operator appears.",
      "intuition": "Push numbers. When an operator appears, pop right operand then left operand, compute the result, and push it back.",
      "edgeCases": "Negative numbers, division truncating toward zero, single number, operator order for subtraction/division, multi-digit tokens.",
      "constraints": "1 <= tokens.length <= 10000; tokens[i] is an operator or integer; expression is valid; intermediate values fit in 32-bit signed integer.",
      "source": {
        "label": "Evaluate Reverse Polish Notation - LeetCode 150",
        "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
      },
      "examples": [
        {
          "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
          "output": "9",
          "explanation": "(2 + 1) * 3 = 9."
        },
        {
          "input": "tokens = [\"4\",\"13\",\"5\",\"/\",\"+\"]",
          "output": "6",
          "explanation": "13 / 5 truncates to 2, so 4 + 2 = 6."
        },
        {
          "input": "tokens = [\"-2\",\"3\",\"*\"]",
          "output": "-6",
          "explanation": "Negative numeric tokens are pushed as operands."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly reduce the first operator and its two previous operands in a list.",
      "optimizedComplexity": "Time O(n); Space O(n). Each token is processed once with an operand stack.",
      "recursiveComplexity": "Time O(n); Space O(n). Processing tokens from right to left can recursively evaluate operands.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int evalRPN(String[] tokens) {\n    List<String> list = new ArrayList<>();\n    for (String token : tokens) list.add(token);\n\n    while (list.size() > 1) {\n      for (int i = 0; i < list.size(); i++) {\n        if (isOperator(list.get(i))) {\n          int left = Integer.parseInt(list.get(i - 2));\n          int right = Integer.parseInt(list.get(i - 1));\n          int value = apply(left, right, list.get(i));\n          list.set(i - 2, String.valueOf(value));\n          list.remove(i);\n          list.remove(i - 1);\n          break;\n        }\n      }\n    }\n\n    return Integer.parseInt(list.get(0));\n  }\n\n  private boolean isOperator(String token) {\n    return token.equals(\"+\") || token.equals(\"-\") || token.equals(\"*\") || token.equals(\"/\");\n  }\n\n  private int apply(int left, int right, String operator) {\n    if (operator.equals(\"+\")) return left + right;\n    if (operator.equals(\"-\")) return left - right;\n    if (operator.equals(\"*\")) return left * right;\n    return left / right;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int evalRPN(String[] tokens) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (String token : tokens) {\n      if (isOperator(token)) {\n        int right = stack.pop();\n        int left = stack.pop();\n        stack.push(apply(left, right, token));\n      } else {\n        stack.push(Integer.parseInt(token));\n      }\n    }\n\n    return stack.pop();\n  }\n\n  private boolean isOperator(String token) {\n    return token.equals(\"+\") || token.equals(\"-\") || token.equals(\"*\") || token.equals(\"/\");\n  }\n\n  private int apply(int left, int right, String operator) {\n    if (operator.equals(\"+\")) return left + right;\n    if (operator.equals(\"-\")) return left - right;\n    if (operator.equals(\"*\")) return left * right;\n    return left / right;\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index;\n\n  public int evalRPN(String[] tokens) {\n    index = tokens.length - 1;\n    return evaluate(tokens);\n  }\n\n  private int evaluate(String[] tokens) {\n    String token = tokens[index--];\n    if (!isOperator(token)) return Integer.parseInt(token);\n\n    int right = evaluate(tokens);\n    int left = evaluate(tokens);\n    return apply(left, right, token);\n  }\n\n  private boolean isOperator(String token) {\n    return token.equals(\"+\") || token.equals(\"-\") || token.equals(\"*\") || token.equals(\"/\");\n  }\n\n  private int apply(int left, int right, String operator) {\n    if (operator.equals(\"+\")) return left + right;\n    if (operator.equals(\"-\")) return left - right;\n    if (operator.equals(\"*\")) return left * right;\n    return left / right;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int evalRPN(String[] tokens) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (String token : tokens) {\n      if (isOperator(token)) {\n        int right = stack.pop();\n        int left = stack.pop();\n        stack.push(apply(left, right, token));\n      } else {\n        stack.push(Integer.parseInt(token));\n      }\n    }\n\n    return stack.pop();\n  }\n\n  private boolean isOperator(String token) {\n    return token.equals(\"+\") || token.equals(\"-\") || token.equals(\"*\") || token.equals(\"/\");\n  }\n\n  private int apply(int left, int right, String operator) {\n    if (operator.equals(\"+\")) return left + right;\n    if (operator.equals(\"-\")) return left - right;\n    if (operator.equals(\"*\")) return left * right;\n    return left / right;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int evalRPN(String[] tokens) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (String token : tokens) {\n      if (isOperator(token)) {\n        int right = stack.pop();\n        int left = stack.pop();\n        stack.push(apply(left, right, token));\n      } else {\n        stack.push(Integer.parseInt(token));\n      }\n    }\n\n    return stack.pop();\n  }\n\n  private boolean isOperator(String token) {\n    return token.equals(\"+\") || token.equals(\"-\") || token.equals(\"*\") || token.equals(\"/\");\n  }\n\n  private int apply(int left, int right, String operator) {\n    if (operator.equals(\"+\")) return left + right;\n    if (operator.equals(\"-\")) return left - right;\n    if (operator.equals(\"*\")) return left * right;\n    return left / right;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Daily Temperatures",
      "difficulty": "Medium",
      "subpattern": "Monotonic decreasing stack of indexes",
      "question": "Given an array temperatures, return an array answer where answer[i] is the number of days until a warmer temperature. If no future day is warmer, answer[i] is 0.",
      "trigger": "Each day needs the next greater temperature to its right, which is a monotonic stack problem over indexes.",
      "intuition": "Keep indexes whose warmer day has not been found. When a warmer temperature appears, pop colder indexes and fill their wait distance.",
      "edgeCases": "Strictly increasing temperatures, strictly decreasing temperatures, equal temperatures, one day, warmer day far away.",
      "constraints": "1 <= temperatures.length <= 100000; 30 <= temperatures[i] <= 100.",
      "source": {
        "label": "Daily Temperatures - LeetCode 739",
        "url": "https://leetcode.com/problems/daily-temperatures/"
      },
      "examples": [
        {
          "input": "temperatures = [73,74,75,71,69,72,76,73]",
          "output": "[1,1,4,2,1,1,0,0]",
          "explanation": "Each value is the distance to the next warmer day."
        },
        {
          "input": "temperatures = [30,40,50,60]",
          "output": "[1,1,1,0]",
          "explanation": "Every day except the last has a warmer next day."
        },
        {
          "input": "temperatures = [30,60,90]",
          "output": "[1,1,0]",
          "explanation": "Each warmer day is one day later until the end."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1) excluding output. For each day, scan future days until warmer temperature appears.",
      "optimizedComplexity": "Time O(n); Space O(n). Each index is pushed and popped at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive right-to-left processing can maintain a monotonic stack.",
      "bruteForceCode": "class Solution {\n  public int[] dailyTemperatures(int[] temperatures) {\n    int[] answer = new int[temperatures.length];\n\n    for (int i = 0; i < temperatures.length; i++) {\n      for (int j = i + 1; j < temperatures.length; j++) {\n        if (temperatures[j] > temperatures[i]) {\n          answer[i] = j - i;\n          break;\n        }\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] dailyTemperatures(int[] temperatures) {\n    int[] answer = new int[temperatures.length];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int day = 0; day < temperatures.length; day++) {\n      while (!stack.isEmpty() && temperatures[day] > temperatures[stack.peek()]) {\n        int previousDay = stack.pop();\n        answer[previousDay] = day - previousDay;\n      }\n      stack.push(day);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] dailyTemperatures(int[] temperatures) {\n    int[] answer = new int[temperatures.length];\n    fill(temperatures, temperatures.length - 1, new ArrayDeque<>(), answer);\n    return answer;\n  }\n\n  private void fill(int[] temperatures, int index, Deque<Integer> stack, int[] answer) {\n    if (index < 0) return;\n\n    while (!stack.isEmpty() && temperatures[stack.peek()] <= temperatures[index]) {\n      stack.pop();\n    }\n    answer[index] = stack.isEmpty() ? 0 : stack.peek() - index;\n    stack.push(index);\n\n    fill(temperatures, index - 1, stack, answer);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] dailyTemperatures(int[] temperatures) {\n    int[] answer = new int[temperatures.length];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int day = 0; day < temperatures.length; day++) {\n      while (!stack.isEmpty() && temperatures[day] > temperatures[stack.peek()]) {\n        int previousDay = stack.pop();\n        answer[previousDay] = day - previousDay;\n      }\n      stack.push(day);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] dailyTemperatures(int[] temperatures) {\n    int[] answer = new int[temperatures.length];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int day = 0; day < temperatures.length; day++) {\n      while (!stack.isEmpty() && temperatures[day] > temperatures[stack.peek()]) {\n        int previousDay = stack.pop();\n        answer[previousDay] = day - previousDay;\n      }\n      stack.push(day);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Car Fleet",
      "difficulty": "Medium",
      "subpattern": "Monotonic stack of arrival times",
      "question": "Given a target, positions, and speeds of cars moving toward the target, return the number of car fleets that will arrive. A faster car catches a slower car ahead and then moves at the slower car speed.",
      "trigger": "Cars must be processed from closest to target backward. A car joins the fleet ahead if its arrival time is less than or equal to that fleet time.",
      "intuition": "Sort cars by position descending. Track fleet arrival times. A new fleet starts only when the current car takes longer than the fleet ahead.",
      "edgeCases": "One car, cars already sorted or unsorted, same arrival time merges into one fleet, fastest car behind slower car, no cars catching up.",
      "constraints": "1 <= n <= 100000; 0 < target <= 1000000; 0 <= position[i] < target; all positions are unique; 0 < speed[i] <= 1000000.",
      "source": {
        "label": "Car Fleet - LeetCode 853",
        "url": "https://leetcode.com/problems/car-fleet/"
      },
      "examples": [
        {
          "input": "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
          "output": "3",
          "explanation": "Cars form three arrival fleets."
        },
        {
          "input": "target = 10, position = [3], speed = [3]",
          "output": "1",
          "explanation": "A single car is one fleet."
        },
        {
          "input": "target = 100, position = [0,2,4], speed = [4,2,1]",
          "output": "1",
          "explanation": "All cars eventually join one fleet."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(n). Sort cars and keep a stack of fleet times explicitly.",
      "optimizedComplexity": "Time O(n log n); Space O(n) for sorted car data. A single pass counts increasing arrival-time fleets.",
      "recursiveComplexity": "Time O(n log n); Space O(n). Recursion processes sorted cars and carries the slowest fleet time.",
      "bruteForceCode": "import java.util.Arrays;\nimport java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int n = position.length;\n    int[][] cars = new int[n][2];\n    for (int i = 0; i < n; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n\n    Arrays.sort(cars, (a, b) -> Integer.compare(b[0], a[0]));\n    Deque<Double> stack = new ArrayDeque<>();\n\n    for (int[] car : cars) {\n      double time = (double) (target - car[0]) / car[1];\n      if (stack.isEmpty() || time > stack.peek()) stack.push(time);\n    }\n\n    return stack.size();\n  }\n}",
      "iterativeCode": "import java.util.Arrays;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int n = position.length;\n    int[][] cars = new int[n][2];\n\n    for (int i = 0; i < n; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n\n    Arrays.sort(cars, (a, b) -> Integer.compare(b[0], a[0]));\n\n    int fleets = 0;\n    double slowestFleetTime = 0.0;\n\n    for (int[] car : cars) {\n      double time = (double) (target - car[0]) / car[1];\n      if (time > slowestFleetTime) {\n        fleets++;\n        slowestFleetTime = time;\n      }\n    }\n\n    return fleets;\n  }\n}",
      "recursiveCode": "import java.util.Arrays;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int[][] cars = new int[position.length][2];\n    for (int i = 0; i < position.length; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n\n    Arrays.sort(cars, (a, b) -> Integer.compare(b[0], a[0]));\n    return countFleets(cars, target, 0, 0.0);\n  }\n\n  private int countFleets(int[][] cars, int target, int index, double slowestFleetTime) {\n    if (index == cars.length) return 0;\n\n    double time = (double) (target - cars[index][0]) / cars[index][1];\n    if (time > slowestFleetTime) {\n      return 1 + countFleets(cars, target, index + 1, time);\n    }\n    return countFleets(cars, target, index + 1, slowestFleetTime);\n  }\n}",
      "optimizedCode": "import java.util.Arrays;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int n = position.length;\n    int[][] cars = new int[n][2];\n\n    for (int i = 0; i < n; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n\n    Arrays.sort(cars, (a, b) -> Integer.compare(b[0], a[0]));\n\n    int fleets = 0;\n    double slowestFleetTime = 0.0;\n\n    for (int[] car : cars) {\n      double time = (double) (target - car[0]) / car[1];\n      if (time > slowestFleetTime) {\n        fleets++;\n        slowestFleetTime = time;\n      }\n    }\n\n    return fleets;\n  }\n}",
      "code": "import java.util.Arrays;\n\nclass Solution {\n  public int carFleet(int target, int[] position, int[] speed) {\n    int n = position.length;\n    int[][] cars = new int[n][2];\n\n    for (int i = 0; i < n; i++) {\n      cars[i][0] = position[i];\n      cars[i][1] = speed[i];\n    }\n\n    Arrays.sort(cars, (a, b) -> Integer.compare(b[0], a[0]));\n\n    int fleets = 0;\n    double slowestFleetTime = 0.0;\n\n    for (int[] car : cars) {\n      double time = (double) (target - car[0]) / car[1];\n      if (time > slowestFleetTime) {\n        fleets++;\n        slowestFleetTime = time;\n      }\n    }\n\n    return fleets;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Largest Rectangle in Histogram",
      "difficulty": "Hard",
      "subpattern": "Monotonic increasing stack of bar indexes",
      "question": "Given an array heights representing histogram bar heights where each bar has width 1, return the area of the largest rectangle in the histogram.",
      "trigger": "For each bar, the maximum rectangle using it as the limiting height depends on the first smaller bar to its left and right, which a monotonic stack finds.",
      "intuition": "Keep indexes with increasing heights. When a shorter bar appears, pop taller bars and compute their maximal width ending before the current index.",
      "edgeCases": "Single bar, strictly increasing heights, strictly decreasing heights, all equal heights, zeros, largest rectangle spanning the whole array.",
      "constraints": "1 <= heights.length <= 100000; 0 <= heights[i] <= 10000.",
      "source": {
        "label": "Largest Rectangle in Histogram - LeetCode 84",
        "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
      },
      "examples": [
        {
          "input": "heights = [2,1,5,6,2,3]",
          "output": "10",
          "explanation": "Bars 5 and 6 form a rectangle of area 10."
        },
        {
          "input": "heights = [2,4]",
          "output": "4",
          "explanation": "The best rectangle uses the bar of height 4 or both bars at height 2."
        },
        {
          "input": "heights = [1,1,1]",
          "output": "3",
          "explanation": "All bars form a rectangle of height 1 and width 3."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Try every left boundary and maintain the minimum height to each right boundary.",
      "optimizedComplexity": "Time O(n); Space O(n). Each index is pushed and popped at most once from the monotonic stack.",
      "recursiveComplexity": "Time O(n log n) average and O(n^2) worst without RMQ; Space O(n). Divide around the minimum bar recursively.",
      "bruteForceCode": "class Solution {\n  public int largestRectangleArea(int[] heights) {\n    int best = 0;\n\n    for (int left = 0; left < heights.length; left++) {\n      int minHeight = Integer.MAX_VALUE;\n      for (int right = left; right < heights.length; right++) {\n        minHeight = Math.min(minHeight, heights[right]);\n        best = Math.max(best, minHeight * (right - left + 1));\n      }\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int largestRectangleArea(int[] heights) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int best = 0;\n\n    for (int i = 0; i <= heights.length; i++) {\n      int currentHeight = i == heights.length ? 0 : heights[i];\n\n      while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {\n        int height = heights[stack.pop()];\n        int leftLessIndex = stack.isEmpty() ? -1 : stack.peek();\n        int width = i - leftLessIndex - 1;\n        best = Math.max(best, height * width);\n      }\n\n      stack.push(i);\n    }\n\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int largestRectangleArea(int[] heights) {\n    return largest(heights, 0, heights.length - 1);\n  }\n\n  private int largest(int[] heights, int left, int right) {\n    if (left > right) return 0;\n\n    int minIndex = left;\n    for (int i = left + 1; i <= right; i++) {\n      if (heights[i] < heights[minIndex]) minIndex = i;\n    }\n\n    int usingMinimum = heights[minIndex] * (right - left + 1);\n    int leftBest = largest(heights, left, minIndex - 1);\n    int rightBest = largest(heights, minIndex + 1, right);\n\n    return Math.max(usingMinimum, Math.max(leftBest, rightBest));\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int largestRectangleArea(int[] heights) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int best = 0;\n\n    for (int i = 0; i <= heights.length; i++) {\n      int currentHeight = i == heights.length ? 0 : heights[i];\n\n      while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {\n        int height = heights[stack.pop()];\n        int leftLessIndex = stack.isEmpty() ? -1 : stack.peek();\n        int width = i - leftLessIndex - 1;\n        best = Math.max(best, height * width);\n      }\n\n      stack.push(i);\n    }\n\n    return best;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int largestRectangleArea(int[] heights) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int best = 0;\n\n    for (int i = 0; i <= heights.length; i++) {\n      int currentHeight = i == heights.length ? 0 : heights[i];\n\n      while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {\n        int height = heights[stack.pop()];\n        int leftLessIndex = stack.isEmpty() ? -1 : stack.peek();\n        int width = i - leftLessIndex - 1;\n        best = Math.max(best, height * width);\n      }\n\n      stack.push(i);\n    }\n\n    return best;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Next Greater Element I",
      "difficulty": "Easy",
      "subpattern": "Monotonic decreasing stack with lookup map",
      "question": "Given two arrays nums1 and nums2 where nums1 is a subset of nums2, return the next greater element in nums2 for each value in nums1. If no greater element exists, return -1 for that value.",
      "trigger": "Each value needs the first greater value to its right in nums2, which is found by resolving smaller stack values when a larger value appears.",
      "intuition": "Scan nums2 once with a decreasing stack. When current value is greater than stack top, current is the next greater for popped values.",
      "edgeCases": "No next greater value, next greater immediately adjacent, strictly decreasing nums2, strictly increasing nums2, single query value.",
      "constraints": "1 <= nums1.length <= nums2.length <= 1000; 0 <= nums1[i], nums2[i] <= 10000; values are unique; nums1 is a subset of nums2.",
      "source": {
        "label": "Next Greater Element I - LeetCode 496",
        "url": "https://leetcode.com/problems/next-greater-element-i/"
      },
      "examples": [
        {
          "input": "nums1 = [4,1,2], nums2 = [1,3,4,2]",
          "output": "[-1,3,-1]",
          "explanation": "1 has next greater 3; 4 and 2 have none."
        },
        {
          "input": "nums1 = [2,4], nums2 = [1,2,3,4]",
          "output": "[3,-1]",
          "explanation": "2 maps to 3, while 4 has no greater value to the right."
        },
        {
          "input": "nums1 = [1], nums2 = [1,2]",
          "output": "[2]",
          "explanation": "2 is the next greater value after 1."
        }
      ],
      "bruteForceComplexity": "Time O(mn); Space O(1) excluding output. For each nums1 value, find it in nums2 and scan right.",
      "optimizedComplexity": "Time O(m+n); Space O(n). Monotonic stack builds next-greater mapping for nums2 once.",
      "recursiveComplexity": "Time O(m+n); Space O(n). Recursive scan can build the same stack and map.",
      "bruteForceCode": "class Solution {\n  public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n    int[] answer = new int[nums1.length];\n\n    for (int i = 0; i < nums1.length; i++) {\n      answer[i] = -1;\n      int index = 0;\n      while (nums2[index] != nums1[i]) index++;\n\n      for (int j = index + 1; j < nums2.length; j++) {\n        if (nums2[j] > nums1[i]) {\n          answer[i] = nums2[j];\n          break;\n        }\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n    Map<Integer, Integer> nextGreater = new HashMap<>();\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int value : nums2) {\n      while (!stack.isEmpty() && value > stack.peek()) {\n        nextGreater.put(stack.pop(), value);\n      }\n      stack.push(value);\n    }\n\n    int[] answer = new int[nums1.length];\n    for (int i = 0; i < nums1.length; i++) {\n      answer[i] = nextGreater.getOrDefault(nums1[i], -1);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n    Map<Integer, Integer> nextGreater = new HashMap<>();\n    build(nums2, 0, new ArrayDeque<>(), nextGreater);\n\n    int[] answer = new int[nums1.length];\n    for (int i = 0; i < nums1.length; i++) {\n      answer[i] = nextGreater.getOrDefault(nums1[i], -1);\n    }\n    return answer;\n  }\n\n  private void build(int[] nums, int index, Deque<Integer> stack, Map<Integer, Integer> nextGreater) {\n    if (index == nums.length) return;\n\n    while (!stack.isEmpty() && nums[index] > stack.peek()) {\n      nextGreater.put(stack.pop(), nums[index]);\n    }\n    stack.push(nums[index]);\n    build(nums, index + 1, stack, nextGreater);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n    Map<Integer, Integer> nextGreater = new HashMap<>();\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int value : nums2) {\n      while (!stack.isEmpty() && value > stack.peek()) {\n        nextGreater.put(stack.pop(), value);\n      }\n      stack.push(value);\n    }\n\n    int[] answer = new int[nums1.length];\n    for (int i = 0; i < nums1.length; i++) {\n      answer[i] = nextGreater.getOrDefault(nums1[i], -1);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n  public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n    Map<Integer, Integer> nextGreater = new HashMap<>();\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int value : nums2) {\n      while (!stack.isEmpty() && value > stack.peek()) {\n        nextGreater.put(stack.pop(), value);\n      }\n      stack.push(value);\n    }\n\n    int[] answer = new int[nums1.length];\n    for (int i = 0; i < nums1.length; i++) {\n      answer[i] = nextGreater.getOrDefault(nums1[i], -1);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Next Greater Element II",
      "difficulty": "Medium",
      "subpattern": "Circular monotonic stack",
      "question": "Given a circular integer array nums, return the next greater number for every element. The next greater number is the first greater value encountered while moving forward circularly. If it does not exist, return -1.",
      "trigger": "The array is circular and each index needs its next greater value, so the monotonic stack scan must simulate two passes.",
      "intuition": "Loop from 2n - 1 down to 0. Use index modulo n and keep a decreasing stack of candidate greater values.",
      "edgeCases": "All values equal, strictly decreasing array, strictly increasing array, one element, next greater wraps around to the front.",
      "constraints": "1 <= nums.length <= 10000; -1000000000 <= nums[i] <= 1000000000.",
      "source": {
        "label": "Next Greater Element II - LeetCode 503",
        "url": "https://leetcode.com/problems/next-greater-element-ii/"
      },
      "examples": [
        {
          "input": "nums = [1,2,1]",
          "output": "[2,-1,2]",
          "explanation": "The last 1 wraps around and finds 2."
        },
        {
          "input": "nums = [1,2,3,4,3]",
          "output": "[2,3,4,-1,4]",
          "explanation": "4 has no greater value; 3 wraps to 4."
        },
        {
          "input": "nums = [5,5,5]",
          "output": "[-1,-1,-1]",
          "explanation": "Equal values are not greater."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1) excluding output. For each index, scan up to n - 1 next positions circularly.",
      "optimizedComplexity": "Time O(n); Space O(n). Each circular index is processed with a monotonic stack over at most 2n visits.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive reverse scan simulates the two-pass monotonic stack.",
      "bruteForceCode": "import java.util.Arrays;\n\nclass Solution {\n  public int[] nextGreaterElements(int[] nums) {\n    int n = nums.length;\n    int[] answer = new int[n];\n    Arrays.fill(answer, -1);\n\n    for (int i = 0; i < n; i++) {\n      for (int step = 1; step < n; step++) {\n        int j = (i + step) % n;\n        if (nums[j] > nums[i]) {\n          answer[i] = nums[j];\n          break;\n        }\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] nextGreaterElements(int[] nums) {\n    int n = nums.length;\n    int[] answer = new int[n];\n    Arrays.fill(answer, -1);\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 2 * n - 1; i >= 0; i--) {\n      int index = i % n;\n      while (!stack.isEmpty() && stack.peek() <= nums[index]) {\n        stack.pop();\n      }\n      if (!stack.isEmpty()) answer[index] = stack.peek();\n      stack.push(nums[index]);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] nextGreaterElements(int[] nums) {\n    int[] answer = new int[nums.length];\n    Arrays.fill(answer, -1);\n    fill(nums, 2 * nums.length - 1, new ArrayDeque<>(), answer);\n    return answer;\n  }\n\n  private void fill(int[] nums, int i, Deque<Integer> stack, int[] answer) {\n    if (i < 0) return;\n\n    int index = i % nums.length;\n    while (!stack.isEmpty() && stack.peek() <= nums[index]) stack.pop();\n    if (!stack.isEmpty()) answer[index] = stack.peek();\n    stack.push(nums[index]);\n\n    fill(nums, i - 1, stack, answer);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] nextGreaterElements(int[] nums) {\n    int n = nums.length;\n    int[] answer = new int[n];\n    Arrays.fill(answer, -1);\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 2 * n - 1; i >= 0; i--) {\n      int index = i % n;\n      while (!stack.isEmpty() && stack.peek() <= nums[index]) {\n        stack.pop();\n      }\n      if (!stack.isEmpty()) answer[index] = stack.peek();\n      stack.push(nums[index]);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] nextGreaterElements(int[] nums) {\n    int n = nums.length;\n    int[] answer = new int[n];\n    Arrays.fill(answer, -1);\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 2 * n - 1; i >= 0; i--) {\n      int index = i % n;\n      while (!stack.isEmpty() && stack.peek() <= nums[index]) {\n        stack.pop();\n      }\n      if (!stack.isEmpty()) answer[index] = stack.peek();\n      stack.push(nums[index]);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Remove K Digits",
      "difficulty": "Medium",
      "subpattern": "Monotonic increasing digit stack",
      "question": "Given a non-negative integer num as a string and an integer k, remove exactly k digits so that the remaining number is the smallest possible. Return the result as a string without leading zeros, or \"0\" if empty.",
      "trigger": "To minimize the number, a larger digit before a smaller digit should be removed first, which is maintained by a monotonic increasing stack.",
      "intuition": "Scan digits left to right. While the stack top is bigger than the current digit and removals remain, pop it. Then trim leftover removals from the end.",
      "edgeCases": "k equals num length, leading zeros after removal, already increasing digits, decreasing digits, repeated digits, result becomes empty.",
      "constraints": "1 <= k <= num.length <= 100000; num contains only digits; num does not have leading zeros except \"0\".",
      "source": {
        "label": "Remove K Digits - LeetCode 402",
        "url": "https://leetcode.com/problems/remove-k-digits/"
      },
      "examples": [
        {
          "input": "num = \"1432219\", k = 3",
          "output": "\"1219\"",
          "explanation": "Removing 4, 3, and 2 produces the smallest number."
        },
        {
          "input": "num = \"10200\", k = 1",
          "output": "\"200\"",
          "explanation": "Removing 1 leaves 0200, which normalizes to 200."
        },
        {
          "input": "num = \"10\", k = 2",
          "output": "\"0\"",
          "explanation": "All digits are removed."
        }
      ],
      "bruteForceComplexity": "Time O(k*n); Space O(n). Remove one digit at a time by finding the first descending position.",
      "optimizedComplexity": "Time O(n); Space O(n). Each digit enters and leaves the monotonic stack at most once.",
      "recursiveComplexity": "Time O(k*n); Space O(n). Recursive greedy removal removes one digit per call.",
      "bruteForceCode": "class Solution {\n  public String removeKdigits(String num, int k) {\n    StringBuilder current = new StringBuilder(num);\n\n    while (k-- > 0 && current.length() > 0) {\n      int removeIndex = current.length() - 1;\n      for (int i = 0; i + 1 < current.length(); i++) {\n        if (current.charAt(i) > current.charAt(i + 1)) {\n          removeIndex = i;\n          break;\n        }\n      }\n      current.deleteCharAt(removeIndex);\n    }\n\n    return normalize(current);\n  }\n\n  private String normalize(StringBuilder value) {\n    int index = 0;\n    while (index < value.length() && value.charAt(index) == '0') index++;\n    String result = value.substring(index);\n    return result.isEmpty() ? \"0\" : result;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String removeKdigits(String num, int k) {\n    StringBuilder stack = new StringBuilder();\n\n    for (char digit : num.toCharArray()) {\n      while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > digit) {\n        stack.deleteCharAt(stack.length() - 1);\n        k--;\n      }\n      stack.append(digit);\n    }\n\n    while (k > 0 && stack.length() > 0) {\n      stack.deleteCharAt(stack.length() - 1);\n      k--;\n    }\n\n    int index = 0;\n    while (index < stack.length() && stack.charAt(index) == '0') index++;\n    String result = stack.substring(index);\n    return result.isEmpty() ? \"0\" : result;\n  }\n}",
      "recursiveCode": "class Solution {\n  public String removeKdigits(String num, int k) {\n    if (k == 0) return normalize(num);\n    if (k >= num.length()) return \"0\";\n\n    int removeIndex = num.length() - 1;\n    for (int i = 0; i + 1 < num.length(); i++) {\n      if (num.charAt(i) > num.charAt(i + 1)) {\n        removeIndex = i;\n        break;\n      }\n    }\n\n    return removeKdigits(num.substring(0, removeIndex) + num.substring(removeIndex + 1), k - 1);\n  }\n\n  private String normalize(String value) {\n    int index = 0;\n    while (index < value.length() && value.charAt(index) == '0') index++;\n    String result = value.substring(index);\n    return result.isEmpty() ? \"0\" : result;\n  }\n}",
      "optimizedCode": "class Solution {\n  public String removeKdigits(String num, int k) {\n    StringBuilder stack = new StringBuilder();\n\n    for (char digit : num.toCharArray()) {\n      while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > digit) {\n        stack.deleteCharAt(stack.length() - 1);\n        k--;\n      }\n      stack.append(digit);\n    }\n\n    while (k > 0 && stack.length() > 0) {\n      stack.deleteCharAt(stack.length() - 1);\n      k--;\n    }\n\n    int index = 0;\n    while (index < stack.length() && stack.charAt(index) == '0') index++;\n    String result = stack.substring(index);\n    return result.isEmpty() ? \"0\" : result;\n  }\n}",
      "code": "class Solution {\n  public String removeKdigits(String num, int k) {\n    StringBuilder stack = new StringBuilder();\n\n    for (char digit : num.toCharArray()) {\n      while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > digit) {\n        stack.deleteCharAt(stack.length() - 1);\n        k--;\n      }\n      stack.append(digit);\n    }\n\n    while (k > 0 && stack.length() > 0) {\n      stack.deleteCharAt(stack.length() - 1);\n      k--;\n    }\n\n    int index = 0;\n    while (index < stack.length() && stack.charAt(index) == '0') index++;\n    String result = stack.substring(index);\n    return result.isEmpty() ? \"0\" : result;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Decode String",
      "difficulty": "Medium",
      "subpattern": "Nested parsing with count and string stacks",
      "question": "Given an encoded string where k[encoded_string] means the encoded_string inside brackets is repeated k times, return the decoded string. Encodings may be nested.",
      "trigger": "Nested brackets require remembering the previous string and repeat count until the matching closing bracket appears, which is stack behavior.",
      "intuition": "When a number is read, build the repeat count. On [, push current count and current string. On ], pop and repeat the current segment.",
      "edgeCases": "Nested encodings, multi-digit repeat counts, plain letters outside brackets, adjacent encoded blocks, repeat count larger than 9.",
      "constraints": "1 <= s.length <= 30; s contains lowercase letters, digits, and brackets; input is valid; decoded length is at most 100000.",
      "source": {
        "label": "Decode String - LeetCode 394",
        "url": "https://leetcode.com/problems/decode-string/"
      },
      "examples": [
        {
          "input": "s = \"3[a]2[bc]\"",
          "output": "\"aaabcbc\"",
          "explanation": "a repeats 3 times and bc repeats 2 times."
        },
        {
          "input": "s = \"3[a2[c]]\"",
          "output": "\"accaccacc\"",
          "explanation": "The nested block 2[c] decodes before the outer repeat."
        },
        {
          "input": "s = \"2[abc]3[cd]ef\"",
          "output": "\"abcabccdcdcdef\"",
          "explanation": "Plain suffix ef remains after decoded blocks."
        }
      ],
      "bruteForceComplexity": "Time O(L * nesting) in a naive repeated-expansion scan; Space O(L), where L is decoded length.",
      "optimizedComplexity": "Time O(L); Space O(L). Each decoded character is appended once through stack-based parsing.",
      "recursiveComplexity": "Time O(L); Space O(L + depth). Recursive descent parses nested bracket groups naturally.",
      "bruteForceCode": "class Solution {\n  public String decodeString(String s) {\n    while (s.contains(\"]\")) {\n      int close = s.indexOf(']');\n      int open = close;\n      while (s.charAt(open) != '[') open--;\n\n      int countStart = open - 1;\n      while (countStart >= 0 && Character.isDigit(s.charAt(countStart))) countStart--;\n      countStart++;\n\n      int count = Integer.parseInt(s.substring(countStart, open));\n      String repeated = s.substring(open + 1, close).repeat(count);\n      s = s.substring(0, countStart) + repeated + s.substring(close + 1);\n    }\n\n    return s;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> strings = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int count = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        counts.push(count);\n        strings.push(current);\n        current = new StringBuilder();\n        count = 0;\n      } else if (ch == ']') {\n        int repeat = counts.pop();\n        StringBuilder parent = strings.pop();\n        for (int i = 0; i < repeat; i++) parent.append(current);\n        current = parent;\n      } else {\n        current.append(ch);\n      }\n    }\n\n    return current.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index;\n\n  public String decodeString(String s) {\n    index = 0;\n    return decode(s);\n  }\n\n  private String decode(String s) {\n    StringBuilder result = new StringBuilder();\n    int count = 0;\n\n    while (index < s.length()) {\n      char ch = s.charAt(index++);\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        String decoded = decode(s);\n        for (int i = 0; i < count; i++) result.append(decoded);\n        count = 0;\n      } else if (ch == ']') {\n        return result.toString();\n      } else {\n        result.append(ch);\n      }\n    }\n\n    return result.toString();\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> strings = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int count = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        counts.push(count);\n        strings.push(current);\n        current = new StringBuilder();\n        count = 0;\n      } else if (ch == ']') {\n        int repeat = counts.pop();\n        StringBuilder parent = strings.pop();\n        for (int i = 0; i < repeat; i++) parent.append(current);\n        current = parent;\n      } else {\n        current.append(ch);\n      }\n    }\n\n    return current.toString();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public String decodeString(String s) {\n    Deque<Integer> counts = new ArrayDeque<>();\n    Deque<StringBuilder> strings = new ArrayDeque<>();\n    StringBuilder current = new StringBuilder();\n    int count = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (Character.isDigit(ch)) {\n        count = count * 10 + ch - '0';\n      } else if (ch == '[') {\n        counts.push(count);\n        strings.push(current);\n        current = new StringBuilder();\n        count = 0;\n      } else if (ch == ']') {\n        int repeat = counts.pop();\n        StringBuilder parent = strings.pop();\n        for (int i = 0; i < repeat; i++) parent.append(current);\n        current = parent;\n      } else {\n        current.append(ch);\n      }\n    }\n\n    return current.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Asteroid Collision",
      "difficulty": "Medium",
      "subpattern": "Collision simulation stack",
      "question": "Given an array asteroids where the absolute value is size and the sign is direction, return the state after all collisions. Moving right is positive and moving left is negative. Smaller asteroids explode; equal sizes both explode.",
      "trigger": "Only a previous right-moving asteroid can collide with a current left-moving asteroid, so unresolved right-moving asteroids are naturally stored on a stack.",
      "intuition": "Push asteroids that cannot collide yet. For a left-moving asteroid, resolve collisions against positive stack tops until it explodes, destroys a smaller one, or survives.",
      "edgeCases": "No collision, equal-size collision, multiple smaller asteroids destroyed, current asteroid destroyed, all moving same direction, empty result.",
      "constraints": "2 <= asteroids.length <= 10000; -1000 <= asteroids[i] <= 1000; asteroids[i] != 0.",
      "source": {
        "label": "Asteroid Collision - LeetCode 735",
        "url": "https://leetcode.com/problems/asteroid-collision/"
      },
      "examples": [
        {
          "input": "asteroids = [5,10,-5]",
          "output": "[5,10]",
          "explanation": "-5 collides with 10 and explodes."
        },
        {
          "input": "asteroids = [8,-8]",
          "output": "[]",
          "explanation": "Equal sizes destroy both asteroids."
        },
        {
          "input": "asteroids = [10,2,-5]",
          "output": "[10]",
          "explanation": "-5 destroys 2, then is destroyed by 10."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly scan adjacent opposite-moving pairs and simulate one collision at a time.",
      "optimizedComplexity": "Time O(n); Space O(n). Each asteroid is pushed and popped at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion processes asteroids while maintaining the unresolved stack.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int[] asteroidCollision(int[] asteroids) {\n    List<Integer> list = new ArrayList<>();\n    for (int asteroid : asteroids) list.add(asteroid);\n\n    boolean changed = true;\n    while (changed) {\n      changed = false;\n      for (int i = 0; i + 1 < list.size(); i++) {\n        int left = list.get(i);\n        int right = list.get(i + 1);\n        if (left > 0 && right < 0) {\n          changed = true;\n          if (Math.abs(left) == Math.abs(right)) {\n            list.remove(i + 1);\n            list.remove(i);\n          } else if (Math.abs(left) < Math.abs(right)) {\n            list.remove(i);\n          } else {\n            list.remove(i + 1);\n          }\n          break;\n        }\n      }\n    }\n\n    int[] answer = new int[list.size()];\n    for (int i = 0; i < list.size(); i++) answer[i] = list.get(i);\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] asteroidCollision(int[] asteroids) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int asteroid : asteroids) {\n      boolean alive = true;\n\n      while (alive && asteroid < 0 && !stack.isEmpty() && stack.peek() > 0) {\n        int top = stack.peek();\n        if (top < -asteroid) {\n          stack.pop();\n        } else if (top == -asteroid) {\n          stack.pop();\n          alive = false;\n        } else {\n          alive = false;\n        }\n      }\n\n      if (alive) stack.push(asteroid);\n    }\n\n    int[] answer = new int[stack.size()];\n    for (int i = answer.length - 1; i >= 0; i--) answer[i] = stack.pop();\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] asteroidCollision(int[] asteroids) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    process(asteroids, 0, stack);\n\n    int[] answer = new int[stack.size()];\n    for (int i = answer.length - 1; i >= 0; i--) answer[i] = stack.pop();\n    return answer;\n  }\n\n  private void process(int[] asteroids, int index, Deque<Integer> stack) {\n    if (index == asteroids.length) return;\n\n    if (survives(asteroids[index], stack)) stack.push(asteroids[index]);\n    process(asteroids, index + 1, stack);\n  }\n\n  private boolean survives(int asteroid, Deque<Integer> stack) {\n    while (asteroid < 0 && !stack.isEmpty() && stack.peek() > 0) {\n      int top = stack.peek();\n      if (top < -asteroid) stack.pop();\n      else if (top == -asteroid) {\n        stack.pop();\n        return false;\n      } else return false;\n    }\n    return true;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] asteroidCollision(int[] asteroids) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int asteroid : asteroids) {\n      boolean alive = true;\n\n      while (alive && asteroid < 0 && !stack.isEmpty() && stack.peek() > 0) {\n        int top = stack.peek();\n        if (top < -asteroid) {\n          stack.pop();\n        } else if (top == -asteroid) {\n          stack.pop();\n          alive = false;\n        } else {\n          alive = false;\n        }\n      }\n\n      if (alive) stack.push(asteroid);\n    }\n\n    int[] answer = new int[stack.size()];\n    for (int i = answer.length - 1; i >= 0; i--) answer[i] = stack.pop();\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] asteroidCollision(int[] asteroids) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int asteroid : asteroids) {\n      boolean alive = true;\n\n      while (alive && asteroid < 0 && !stack.isEmpty() && stack.peek() > 0) {\n        int top = stack.peek();\n        if (top < -asteroid) {\n          stack.pop();\n        } else if (top == -asteroid) {\n          stack.pop();\n          alive = false;\n        } else {\n          alive = false;\n        }\n      }\n\n      if (alive) stack.push(asteroid);\n    }\n\n    int[] answer = new int[stack.size()];\n    for (int i = answer.length - 1; i >= 0; i--) answer[i] = stack.pop();\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Simplify Path",
      "difficulty": "Medium",
      "subpattern": "Directory stack parsing",
      "question": "Given an absolute Unix-style path, return its simplified canonical path. A single dot means current directory, two dots means parent directory, and multiple slashes are treated as one slash.",
      "trigger": "Path components must be resolved in order, and .. removes the most recent kept directory, which is stack behavior.",
      "intuition": "Split by slash. Ignore empty parts and dots, pop for .., and push normal directory names. Join stack contents with slashes.",
      "edgeCases": "Multiple slashes, trailing slash, path goes above root, dot segments, hidden directory names like ... that are valid names.",
      "constraints": "1 <= path.length <= 3000; path consists of English letters, digits, period, slash, or underscore; path is a valid absolute Unix path.",
      "source": {
        "label": "Simplify Path - LeetCode 71",
        "url": "https://leetcode.com/problems/simplify-path/"
      },
      "examples": [
        {
          "input": "path = \"/home/\"",
          "output": "\"/home\"",
          "explanation": "Trailing slash is removed."
        },
        {
          "input": "path = \"/../\"",
          "output": "\"/\"",
          "explanation": "Root has no parent above it."
        },
        {
          "input": "path = \"/home//foo/\"",
          "output": "\"/home/foo\"",
          "explanation": "Multiple slashes collapse to one separator."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeated string replacement can repeatedly scan the path.",
      "optimizedComplexity": "Time O(n); Space O(n). Each component is processed once and stored at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive component parsing uses stack space plus stored path components.",
      "bruteForceCode": "class Solution {\n  public String simplifyPath(String path) {\n    while (path.contains(\"//\")) path = path.replace(\"//\", \"/\");\n\n    String[] parts = path.split(\"/\");\n    java.util.List<String> directories = new java.util.ArrayList<>();\n\n    for (String part : parts) {\n      if (part.isEmpty() || part.equals(\".\")) continue;\n      if (part.equals(\"..\")) {\n        if (!directories.isEmpty()) directories.remove(directories.size() - 1);\n      } else {\n        directories.add(part);\n      }\n    }\n\n    return \"/\" + String.join(\"/\", directories);\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    Deque<String> stack = new ArrayDeque<>();\n\n    for (String part : path.split(\"/\")) {\n      if (part.isEmpty() || part.equals(\".\")) continue;\n\n      if (part.equals(\"..\")) {\n        if (!stack.isEmpty()) stack.removeLast();\n      } else {\n        stack.addLast(part);\n      }\n    }\n\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder result = new StringBuilder();\n    for (String directory : stack) result.append('/').append(directory);\n    return result.toString();\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    String[] parts = path.split(\"/\");\n    Deque<String> stack = new ArrayDeque<>();\n    parse(parts, 0, stack);\n\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder result = new StringBuilder();\n    for (String directory : stack) result.append('/').append(directory);\n    return result.toString();\n  }\n\n  private void parse(String[] parts, int index, Deque<String> stack) {\n    if (index == parts.length) return;\n\n    String part = parts[index];\n    if (part.equals(\"..\")) {\n      if (!stack.isEmpty()) stack.removeLast();\n    } else if (!part.isEmpty() && !part.equals(\".\")) {\n      stack.addLast(part);\n    }\n\n    parse(parts, index + 1, stack);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    Deque<String> stack = new ArrayDeque<>();\n\n    for (String part : path.split(\"/\")) {\n      if (part.isEmpty() || part.equals(\".\")) continue;\n\n      if (part.equals(\"..\")) {\n        if (!stack.isEmpty()) stack.removeLast();\n      } else {\n        stack.addLast(part);\n      }\n    }\n\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder result = new StringBuilder();\n    for (String directory : stack) result.append('/').append(directory);\n    return result.toString();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public String simplifyPath(String path) {\n    Deque<String> stack = new ArrayDeque<>();\n\n    for (String part : path.split(\"/\")) {\n      if (part.isEmpty() || part.equals(\".\")) continue;\n\n      if (part.equals(\"..\")) {\n        if (!stack.isEmpty()) stack.removeLast();\n      } else {\n        stack.addLast(part);\n      }\n    }\n\n    if (stack.isEmpty()) return \"/\";\n    StringBuilder result = new StringBuilder();\n    for (String directory : stack) result.append('/').append(directory);\n    return result.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Basic Calculator",
      "difficulty": "Hard",
      "subpattern": "Sign stack expression parsing",
      "question": "Given a string expression containing non-negative integers, +, -, parentheses, and spaces, evaluate the expression and return its value.",
      "trigger": "Parentheses temporarily change the active sign context, so previous result and sign must be stored until the closing parenthesis.",
      "intuition": "Accumulate numbers with a current sign. On (, push current result and sign, reset them, and on ) collapse the parenthesized result back into the previous context.",
      "edgeCases": "Spaces, multi-digit numbers, leading negative expression, nested parentheses, subtraction before parentheses, single number.",
      "constraints": "1 <= s.length <= 300000; s consists of digits, +, -, (, ), and spaces; expression is valid.",
      "source": {
        "label": "Basic Calculator - LeetCode 224",
        "url": "https://leetcode.com/problems/basic-calculator/"
      },
      "examples": [
        {
          "input": "s = \"1 + 1\"",
          "output": "2",
          "explanation": "Simple addition."
        },
        {
          "input": "s = \" 2-1 + 2 \"",
          "output": "3",
          "explanation": "Spaces are ignored."
        },
        {
          "input": "s = \"(1+(4+5+2)-3)+(6+8)\"",
          "output": "23",
          "explanation": "Nested parentheses are evaluated first."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly evaluate innermost parentheses using substring reconstruction.",
      "optimizedComplexity": "Time O(n); Space O(n). Each character is processed once and parentheses use a stack.",
      "recursiveComplexity": "Time O(n); Space O(depth). Recursive descent evaluates each parenthesized expression once.",
      "bruteForceCode": "class Solution {\n  public int calculate(String s) {\n    return recursiveCalculate(s.replace(\" \", \"\"));\n  }\n\n  private int recursiveCalculate(String s) {\n    int close = s.indexOf(')');\n    if (close == -1) return evalFlat(s);\n\n    int open = close;\n    while (s.charAt(open) != '(') open--;\n\n    int value = evalFlat(s.substring(open + 1, close));\n    return recursiveCalculate(s.substring(0, open) + value + s.substring(close + 1));\n  }\n\n  private int evalFlat(String s) {\n    int result = 0;\n    int sign = 1;\n    int i = 0;\n    while (i < s.length()) {\n      char ch = s.charAt(i);\n      if (ch == '+') {\n        sign = 1;\n        i++;\n      } else if (ch == '-') {\n        sign = -1;\n        i++;\n      } else {\n        int number = 0;\n        while (i < s.length() && Character.isDigit(s.charAt(i))) {\n          number = number * 10 + s.charAt(i++) - '0';\n        }\n        result += sign * number;\n      }\n    }\n    return result;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      } else if (ch == '+') {\n        result += sign * number;\n        number = 0;\n        sign = 1;\n      } else if (ch == '-') {\n        result += sign * number;\n        number = 0;\n        sign = -1;\n      } else if (ch == '(') {\n        stack.push(result);\n        stack.push(sign);\n        result = 0;\n        sign = 1;\n      } else if (ch == ')') {\n        result += sign * number;\n        number = 0;\n        result *= stack.pop();\n        result += stack.pop();\n      }\n    }\n\n    return result + sign * number;\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index;\n\n  public int calculate(String s) {\n    index = 0;\n    return parse(s);\n  }\n\n  private int parse(String s) {\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n\n    while (index < s.length()) {\n      char ch = s.charAt(index++);\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      } else if (ch == '+') {\n        result += sign * number;\n        number = 0;\n        sign = 1;\n      } else if (ch == '-') {\n        result += sign * number;\n        number = 0;\n        sign = -1;\n      } else if (ch == '(') {\n        number = parse(s);\n      } else if (ch == ')') {\n        break;\n      }\n    }\n\n    return result + sign * number;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      } else if (ch == '+') {\n        result += sign * number;\n        number = 0;\n        sign = 1;\n      } else if (ch == '-') {\n        result += sign * number;\n        number = 0;\n        sign = -1;\n      } else if (ch == '(') {\n        stack.push(result);\n        stack.push(sign);\n        result = 0;\n        sign = 1;\n      } else if (ch == ')') {\n        result += sign * number;\n        number = 0;\n        result *= stack.pop();\n        result += stack.pop();\n      }\n    }\n\n    return result + sign * number;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      } else if (ch == '+') {\n        result += sign * number;\n        number = 0;\n        sign = 1;\n      } else if (ch == '-') {\n        result += sign * number;\n        number = 0;\n        sign = -1;\n      } else if (ch == '(') {\n        stack.push(result);\n        stack.push(sign);\n        result = 0;\n        sign = 1;\n      } else if (ch == ')') {\n        result += sign * number;\n        number = 0;\n        result *= stack.pop();\n        result += stack.pop();\n      }\n    }\n\n    return result + sign * number;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Basic Calculator II",
      "difficulty": "Medium",
      "subpattern": "Operator precedence stack",
      "question": "Given a string expression containing non-negative integers, +, -, *, /, and spaces, evaluate it and return the result. Integer division truncates toward zero.",
      "trigger": "Multiplication and division have higher precedence than addition and subtraction, so completed signed terms can be stored on a stack.",
      "intuition": "Read a number and apply the previous operator. Push signed values for + and -, but collapse * and / immediately with the stack top.",
      "edgeCases": "Spaces, multi-digit numbers, division truncation, expression ending with number, multiplication before addition, single number.",
      "constraints": "1 <= s.length <= 300000; s consists of digits, +, -, *, /, and spaces; expression is valid.",
      "source": {
        "label": "Basic Calculator II - LeetCode 227",
        "url": "https://leetcode.com/problems/basic-calculator-ii/"
      },
      "examples": [
        {
          "input": "s = \"3+2*2\"",
          "output": "7",
          "explanation": "Multiplication is evaluated before addition."
        },
        {
          "input": "s = \" 3/2 \"",
          "output": "1",
          "explanation": "Integer division truncates toward zero."
        },
        {
          "input": "s = \" 3+5 / 2 \"",
          "output": "5",
          "explanation": "5 / 2 becomes 2, so result is 5."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Token list reductions for * and / followed by + and - can shift many elements.",
      "optimizedComplexity": "Time O(n); Space O(n). Stack stores signed terms after resolving high-precedence operators.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive token processing can maintain stack state but recursion is not needed.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int calculate(String s) {\n    List<String> tokens = tokenize(s);\n    reduce(tokens, \"*\");\n    reduce(tokens, \"/\");\n\n    int result = Integer.parseInt(tokens.get(0));\n    for (int i = 1; i < tokens.size(); i += 2) {\n      int value = Integer.parseInt(tokens.get(i + 1));\n      result = tokens.get(i).equals(\"+\") ? result + value : result - value;\n    }\n    return result;\n  }\n\n  private List<String> tokenize(String s) {\n    List<String> tokens = new ArrayList<>();\n    int i = 0;\n    while (i < s.length()) {\n      char ch = s.charAt(i);\n      if (ch == ' ') {\n        i++;\n      } else if (Character.isDigit(ch)) {\n        int number = 0;\n        while (i < s.length() && Character.isDigit(s.charAt(i))) number = number * 10 + s.charAt(i++) - '0';\n        tokens.add(String.valueOf(number));\n      } else {\n        tokens.add(String.valueOf(ch));\n        i++;\n      }\n    }\n    return tokens;\n  }\n\n  private void reduce(List<String> tokens, String operator) {\n    for (int i = 1; i < tokens.size(); i += 2) {\n      if (tokens.get(i).equals(operator)) {\n        int left = Integer.parseInt(tokens.get(i - 1));\n        int right = Integer.parseInt(tokens.get(i + 1));\n        int value = operator.equals(\"*\") ? left * right : left / right;\n        tokens.set(i - 1, String.valueOf(value));\n        tokens.remove(i + 1);\n        tokens.remove(i);\n        i -= 2;\n      }\n    }\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int number = 0;\n    char operator = '+';\n\n    for (int i = 0; i <= s.length(); i++) {\n      char ch = i == s.length() ? '+' : s.charAt(i);\n\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      }\n\n      if ((!Character.isDigit(ch) && ch != ' ') || i == s.length()) {\n        if (operator == '+') stack.push(number);\n        else if (operator == '-') stack.push(-number);\n        else if (operator == '*') stack.push(stack.pop() * number);\n        else if (operator == '/') stack.push(stack.pop() / number);\n\n        operator = ch;\n        number = 0;\n      }\n    }\n\n    int result = 0;\n    while (!stack.isEmpty()) result += stack.pop();\n    return result;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    process(s, 0, '+', 0, stack);\n\n    int result = 0;\n    while (!stack.isEmpty()) result += stack.pop();\n    return result;\n  }\n\n  private void process(String s, int index, char operator, int number, Deque<Integer> stack) {\n    if (index == s.length()) {\n      apply(stack, operator, number);\n      return;\n    }\n\n    char ch = s.charAt(index);\n    if (Character.isDigit(ch)) {\n      process(s, index + 1, operator, number * 10 + ch - '0', stack);\n    } else if (ch == ' ') {\n      process(s, index + 1, operator, number, stack);\n    } else {\n      apply(stack, operator, number);\n      process(s, index + 1, ch, 0, stack);\n    }\n  }\n\n  private void apply(Deque<Integer> stack, char operator, int number) {\n    if (operator == '+') stack.push(number);\n    else if (operator == '-') stack.push(-number);\n    else if (operator == '*') stack.push(stack.pop() * number);\n    else stack.push(stack.pop() / number);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int number = 0;\n    char operator = '+';\n\n    for (int i = 0; i <= s.length(); i++) {\n      char ch = i == s.length() ? '+' : s.charAt(i);\n\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      }\n\n      if ((!Character.isDigit(ch) && ch != ' ') || i == s.length()) {\n        if (operator == '+') stack.push(number);\n        else if (operator == '-') stack.push(-number);\n        else if (operator == '*') stack.push(stack.pop() * number);\n        else if (operator == '/') stack.push(stack.pop() / number);\n\n        operator = ch;\n        number = 0;\n      }\n    }\n\n    int result = 0;\n    while (!stack.isEmpty()) result += stack.pop();\n    return result;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int number = 0;\n    char operator = '+';\n\n    for (int i = 0; i <= s.length(); i++) {\n      char ch = i == s.length() ? '+' : s.charAt(i);\n\n      if (Character.isDigit(ch)) {\n        number = number * 10 + ch - '0';\n      }\n\n      if ((!Character.isDigit(ch) && ch != ' ') || i == s.length()) {\n        if (operator == '+') stack.push(number);\n        else if (operator == '-') stack.push(-number);\n        else if (operator == '*') stack.push(stack.pop() * number);\n        else if (operator == '/') stack.push(stack.pop() / number);\n\n        operator = ch;\n        number = 0;\n      }\n    }\n\n    int result = 0;\n    while (!stack.isEmpty()) result += stack.pop();\n    return result;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Online Stock Span",
      "difficulty": "Medium",
      "subpattern": "Monotonic decreasing stack with compressed spans",
      "question": "Design StockSpanner with next(price), which returns the number of consecutive days ending today where the stock price was less than or equal to today?s price.",
      "trigger": "Each price absorbs previous consecutive prices that are less than or equal to it, so a monotonic decreasing stack can store compressed spans.",
      "intuition": "Store pairs of price and span. When a new price arrives, pop all lower-or-equal prices and add their spans to today?s span.",
      "edgeCases": "Strictly increasing prices, strictly decreasing prices, equal prices, one call, many repeated values.",
      "constraints": "1 <= price <= 100000; at most 10000 calls to next.",
      "source": {
        "label": "Online Stock Span - LeetCode 901",
        "url": "https://leetcode.com/problems/online-stock-span/"
      },
      "examples": [
        {
          "input": "prices = [100,80,60,70,60,75,85]",
          "output": "[1,1,1,2,1,4,6]",
          "explanation": "85 spans six consecutive prices less than or equal to it."
        },
        {
          "input": "prices = [31,41,48,59]",
          "output": "[1,2,3,4]",
          "explanation": "Each price is higher than all previous prices."
        },
        {
          "input": "prices = [70,70,70]",
          "output": "[1,2,3]",
          "explanation": "Equal prices count in the span."
        }
      ],
      "bruteForceComplexity": "next Time O(n), Space O(n). Store all previous prices and scan backward for each query.",
      "optimizedComplexity": "Amortized next Time O(1), Space O(n). Each price-span pair is pushed and popped at most once.",
      "recursiveComplexity": "next Time O(n) worst-case, Space O(n). Recursive scan can compute span but monotonic stack is the target design.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass StockSpanner {\n  private final List<Integer> prices = new ArrayList<>();\n\n  public int next(int price) {\n    prices.add(price);\n    int span = 0;\n\n    for (int i = prices.size() - 1; i >= 0; i--) {\n      if (prices.get(i) > price) break;\n      span++;\n    }\n\n    return span;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass StockSpanner {\n  private final Deque<int[]> stack = new ArrayDeque<>();\n\n  public int next(int price) {\n    int span = 1;\n\n    while (!stack.isEmpty() && stack.peek()[0] <= price) {\n      span += stack.pop()[1];\n    }\n\n    stack.push(new int[] {price, span});\n    return span;\n  }\n}",
      "recursiveCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass StockSpanner {\n  private final List<Integer> prices = new ArrayList<>();\n\n  public int next(int price) {\n    prices.add(price);\n    return spanFrom(prices.size() - 1, price);\n  }\n\n  private int spanFrom(int index, int price) {\n    if (index < 0 || prices.get(index) > price) return 0;\n    return 1 + spanFrom(index - 1, price);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass StockSpanner {\n  private final Deque<int[]> stack = new ArrayDeque<>();\n\n  public int next(int price) {\n    int span = 1;\n\n    while (!stack.isEmpty() && stack.peek()[0] <= price) {\n      span += stack.pop()[1];\n    }\n\n    stack.push(new int[] {price, span});\n    return span;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass StockSpanner {\n  private final Deque<int[]> stack = new ArrayDeque<>();\n\n  public int next(int price) {\n    int span = 1;\n\n    while (!stack.isEmpty() && stack.peek()[0] <= price) {\n      span += stack.pop()[1];\n    }\n\n    stack.push(new int[] {price, span});\n    return span;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "132 Pattern",
      "difficulty": "Medium",
      "subpattern": "Reverse monotonic stack for middle value",
      "question": "Given an integer array nums, return true if there exists a 132 pattern: indices i < j < k such that nums[i] < nums[k] < nums[j]. Otherwise return false.",
      "trigger": "The pattern needs a large middle value nums[j] and a smaller later value nums[k]. Scanning from right lets a stack track possible nums[j] values and a saved nums[k].",
      "intuition": "Scan from right to left. Keep a decreasing stack of possible high values. Popped values become the best nums[k]. If a left value is smaller than that saved nums[k], the pattern exists.",
      "edgeCases": "Fewer than three numbers, duplicates, negative numbers, strictly increasing array, strictly decreasing array, pattern near the end.",
      "constraints": "1 <= nums.length <= 200000; -1000000000 <= nums[i] <= 1000000000.",
      "source": {
        "label": "132 Pattern - LeetCode 456",
        "url": "https://leetcode.com/problems/132-pattern/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3,4]",
          "output": "false",
          "explanation": "No value can serve as nums[k] between nums[i] and nums[j]."
        },
        {
          "input": "nums = [3,1,4,2]",
          "output": "true",
          "explanation": "1, 4, 2 form a 132 pattern."
        },
        {
          "input": "nums = [-1,3,2,0]",
          "output": "true",
          "explanation": "-1, 3, 2 is one valid pattern."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Check all triples i, j, k directly.",
      "optimizedComplexity": "Time O(n); Space O(n). Each value is pushed and popped at most once from the monotonic stack.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive reverse scan carries the stack and current nums[k] candidate.",
      "bruteForceCode": "class Solution {\n  public boolean find132pattern(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        for (int k = j + 1; k < nums.length; k++) {\n          if (nums[i] < nums[k] && nums[k] < nums[j]) return true;\n        }\n      }\n    }\n\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean find132pattern(int[] nums) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int second = Integer.MIN_VALUE;\n\n    for (int i = nums.length - 1; i >= 0; i--) {\n      if (nums[i] < second) return true;\n\n      while (!stack.isEmpty() && nums[i] > stack.peek()) {\n        second = stack.pop();\n      }\n\n      stack.push(nums[i]);\n    }\n\n    return false;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean find132pattern(int[] nums) {\n    return scan(nums, nums.length - 1, new ArrayDeque<>(), Integer.MIN_VALUE);\n  }\n\n  private boolean scan(int[] nums, int index, Deque<Integer> stack, int second) {\n    if (index < 0) return false;\n    if (nums[index] < second) return true;\n\n    while (!stack.isEmpty() && nums[index] > stack.peek()) {\n      second = stack.pop();\n    }\n    stack.push(nums[index]);\n\n    return scan(nums, index - 1, stack, second);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean find132pattern(int[] nums) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int second = Integer.MIN_VALUE;\n\n    for (int i = nums.length - 1; i >= 0; i--) {\n      if (nums[i] < second) return true;\n\n      while (!stack.isEmpty() && nums[i] > stack.peek()) {\n        second = stack.pop();\n      }\n\n      stack.push(nums[i]);\n    }\n\n    return false;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean find132pattern(int[] nums) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int second = Integer.MIN_VALUE;\n\n    for (int i = nums.length - 1; i >= 0; i--) {\n      if (nums[i] < second) return true;\n\n      while (!stack.isEmpty() && nums[i] > stack.peek()) {\n        second = stack.pop();\n      }\n\n      stack.push(nums[i]);\n    }\n\n    return false;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Trapping Rain Water",
      "difficulty": "Hard",
      "subpattern": "Monotonic stack of basin boundaries",
      "question": "Given an array height where each bar has width 1, compute how much rain water can be trapped after raining.",
      "trigger": "Water is trapped when a right boundary appears higher than a previous valley, while a left boundary is still available on the stack.",
      "intuition": "Keep a decreasing stack of bar indexes. When a taller right boundary arrives, pop valley bars and compute water using the lower of left and right boundaries.",
      "edgeCases": "Fewer than three bars, strictly increasing heights, strictly decreasing heights, all equal heights, zero-height bars, multiple basins.",
      "constraints": "1 <= height.length <= 20000; 0 <= height[i] <= 100000.",
      "source": {
        "label": "Trapping Rain Water - LeetCode 42",
        "url": "https://leetcode.com/problems/trapping-rain-water/"
      },
      "examples": [
        {
          "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          "output": "6",
          "explanation": "Several basins together trap 6 units."
        },
        {
          "input": "height = [4,2,0,3,2,5]",
          "output": "9",
          "explanation": "The bars form trapped water between boundaries."
        },
        {
          "input": "height = [1,2,3]",
          "output": "0",
          "explanation": "No right boundary can trap water."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). For each index, scan left and right maximum heights.",
      "optimizedComplexity": "Time O(n); Space O(n). Each index is pushed and popped at most once from the stack.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive processing can simulate the same stack but adds call-stack space.",
      "bruteForceCode": "class Solution {\n  public int trap(int[] height) {\n    int water = 0;\n\n    for (int i = 0; i < height.length; i++) {\n      int leftMax = 0;\n      int rightMax = 0;\n\n      for (int left = 0; left <= i; left++) leftMax = Math.max(leftMax, height[left]);\n      for (int right = i; right < height.length; right++) rightMax = Math.max(rightMax, height[right]);\n\n      water += Math.min(leftMax, rightMax) - height[i];\n    }\n\n    return water;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int trap(int[] height) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int water = 0;\n\n    for (int right = 0; right < height.length; right++) {\n      while (!stack.isEmpty() && height[right] > height[stack.peek()]) {\n        int bottom = stack.pop();\n        if (stack.isEmpty()) break;\n\n        int left = stack.peek();\n        int width = right - left - 1;\n        int boundedHeight = Math.min(height[left], height[right]) - height[bottom];\n        water += width * boundedHeight;\n      }\n\n      stack.push(right);\n    }\n\n    return water;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int trap(int[] height) {\n    return process(height, 0, new ArrayDeque<>(), 0);\n  }\n\n  private int process(int[] height, int right, Deque<Integer> stack, int water) {\n    if (right == height.length) return water;\n\n    while (!stack.isEmpty() && height[right] > height[stack.peek()]) {\n      int bottom = stack.pop();\n      if (stack.isEmpty()) break;\n\n      int left = stack.peek();\n      int width = right - left - 1;\n      int boundedHeight = Math.min(height[left], height[right]) - height[bottom];\n      water += width * boundedHeight;\n    }\n\n    stack.push(right);\n    return process(height, right + 1, stack, water);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int trap(int[] height) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int water = 0;\n\n    for (int right = 0; right < height.length; right++) {\n      while (!stack.isEmpty() && height[right] > height[stack.peek()]) {\n        int bottom = stack.pop();\n        if (stack.isEmpty()) break;\n\n        int left = stack.peek();\n        int width = right - left - 1;\n        int boundedHeight = Math.min(height[left], height[right]) - height[bottom];\n        water += width * boundedHeight;\n      }\n\n      stack.push(right);\n    }\n\n    return water;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int trap(int[] height) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int water = 0;\n\n    for (int right = 0; right < height.length; right++) {\n      while (!stack.isEmpty() && height[right] > height[stack.peek()]) {\n        int bottom = stack.pop();\n        if (stack.isEmpty()) break;\n\n        int left = stack.peek();\n        int width = right - left - 1;\n        int boundedHeight = Math.min(height[left], height[right]) - height[bottom];\n        water += width * boundedHeight;\n      }\n\n      stack.push(right);\n    }\n\n    return water;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sum of Subarray Minimums",
      "difficulty": "Medium",
      "subpattern": "Monotonic stack contribution counting",
      "question": "Given an array arr, return the sum of the minimum value of every non-empty contiguous subarray. Return the answer modulo 1,000,000,007.",
      "trigger": "Instead of enumerating subarrays, count how many subarrays use each element as the minimum using previous/next less boundaries from monotonic stacks.",
      "intuition": "For each index, choices on the left times choices on the right gives the number of subarrays where arr[i] is the chosen minimum. Use strict/non-strict comparisons to avoid double-counting duplicates.",
      "edgeCases": "Duplicate values, strictly increasing array, strictly decreasing array, one element, large values requiring modulo arithmetic.",
      "constraints": "1 <= arr.length <= 30000; 1 <= arr[i] <= 30000.",
      "source": {
        "label": "Sum of Subarray Minimums - LeetCode 907",
        "url": "https://leetcode.com/problems/sum-of-subarray-minimums/"
      },
      "examples": [
        {
          "input": "arr = [3,1,2,4]",
          "output": "17",
          "explanation": "The subarray minimums sum to 17."
        },
        {
          "input": "arr = [11,81,94,43,3]",
          "output": "444",
          "explanation": "Contribution counting gives 444."
        },
        {
          "input": "arr = [1,1]",
          "output": "3",
          "explanation": "Subarrays [1], [1], and [1,1] each contribute 1."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Enumerate every subarray while maintaining its minimum.",
      "optimizedComplexity": "Time O(n); Space O(n). Monotonic stacks compute contribution boundaries in linear time.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scans can fill boundaries but iterative stacks are the standard approach.",
      "bruteForceCode": "class Solution {\n  public int sumSubarrayMins(int[] arr) {\n    final int MOD = 1_000_000_007;\n    long sum = 0;\n\n    for (int left = 0; left < arr.length; left++) {\n      int minimum = Integer.MAX_VALUE;\n      for (int right = left; right < arr.length; right++) {\n        minimum = Math.min(minimum, arr[right]);\n        sum = (sum + minimum) % MOD;\n      }\n    }\n\n    return (int) sum;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int sumSubarrayMins(int[] arr) {\n    final int MOD = 1_000_000_007;\n    int n = arr.length;\n    int[] previousLess = new int[n];\n    int[] nextLessOrEqual = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < n; i++) {\n      while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) stack.pop();\n      previousLess[i] = stack.isEmpty() ? -1 : stack.peek();\n      stack.push(i);\n    }\n\n    stack.clear();\n    for (int i = n - 1; i >= 0; i--) {\n      while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) stack.pop();\n      nextLessOrEqual[i] = stack.isEmpty() ? n : stack.peek();\n      stack.push(i);\n    }\n\n    long answer = 0;\n    for (int i = 0; i < n; i++) {\n      long leftChoices = i - previousLess[i];\n      long rightChoices = nextLessOrEqual[i] - i;\n      answer = (answer + arr[i] * leftChoices * rightChoices) % MOD;\n    }\n\n    return (int) answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int sumSubarrayMins(int[] arr) {\n    return (int) scan(arr, 0, new ArrayDeque<>(), 0L);\n  }\n\n  private long scan(int[] arr, int index, Deque<int[]> stack, long answer) {\n    if (index == arr.length) {\n      return flush(arr.length, stack, answer);\n    }\n\n    int count = 1;\n    while (!stack.isEmpty() && stack.peek()[0] >= arr[index]) {\n      int[] previous = stack.pop();\n      count += previous[1];\n    }\n    stack.push(new int[] {arr[index], count});\n\n    long running = 0;\n    for (int[] pair : stack) running = (running + (long) pair[0] * pair[1]) % MOD;\n    return scan(arr, index + 1, stack, (answer + running) % MOD);\n  }\n\n  private long flush(int n, Deque<int[]> stack, long answer) {\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int sumSubarrayMins(int[] arr) {\n    final int MOD = 1_000_000_007;\n    int n = arr.length;\n    int[] previousLess = new int[n];\n    int[] nextLessOrEqual = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < n; i++) {\n      while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) stack.pop();\n      previousLess[i] = stack.isEmpty() ? -1 : stack.peek();\n      stack.push(i);\n    }\n\n    stack.clear();\n    for (int i = n - 1; i >= 0; i--) {\n      while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) stack.pop();\n      nextLessOrEqual[i] = stack.isEmpty() ? n : stack.peek();\n      stack.push(i);\n    }\n\n    long answer = 0;\n    for (int i = 0; i < n; i++) {\n      long leftChoices = i - previousLess[i];\n      long rightChoices = nextLessOrEqual[i] - i;\n      answer = (answer + arr[i] * leftChoices * rightChoices) % MOD;\n    }\n\n    return (int) answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int sumSubarrayMins(int[] arr) {\n    final int MOD = 1_000_000_007;\n    int n = arr.length;\n    int[] previousLess = new int[n];\n    int[] nextLessOrEqual = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < n; i++) {\n      while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) stack.pop();\n      previousLess[i] = stack.isEmpty() ? -1 : stack.peek();\n      stack.push(i);\n    }\n\n    stack.clear();\n    for (int i = n - 1; i >= 0; i--) {\n      while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) stack.pop();\n      nextLessOrEqual[i] = stack.isEmpty() ? n : stack.peek();\n      stack.push(i);\n    }\n\n    long answer = 0;\n    for (int i = 0; i < n; i++) {\n      long leftChoices = i - previousLess[i];\n      long rightChoices = nextLessOrEqual[i] - i;\n      answer = (answer + arr[i] * leftChoices * rightChoices) % MOD;\n    }\n\n    return (int) answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Remove Duplicate Letters",
      "difficulty": "Medium",
      "subpattern": "Lexicographic monotonic stack with last occurrence",
      "question": "Given a string s, remove duplicate letters so every letter appears once and only once. Return the lexicographically smallest result among all possible results.",
      "trigger": "A larger chosen character can be removed if it appears again later and a smaller current character can improve lexicographic order.",
      "intuition": "Track last occurrence and chosen letters. While stack top is larger than current and appears later, pop it. Then push current if not already chosen.",
      "edgeCases": "All unique letters, all same letter, repeated decreasing letters, repeated increasing letters, needing to keep a large letter because it will not appear again.",
      "constraints": "1 <= s.length <= 10000; s consists of lowercase English letters.",
      "source": {
        "label": "Remove Duplicate Letters - LeetCode 316",
        "url": "https://leetcode.com/problems/remove-duplicate-letters/"
      },
      "examples": [
        {
          "input": "s = \"bcabc\"",
          "output": "\"abc\"",
          "explanation": "abc is the smallest result containing each distinct letter once."
        },
        {
          "input": "s = \"cbacdcbc\"",
          "output": "\"acdb\"",
          "explanation": "c cannot be removed after its last useful position."
        },
        {
          "input": "s = \"abacb\"",
          "output": "\"abc\"",
          "explanation": "The second a and b are skipped after chosen."
        }
      ],
      "bruteForceComplexity": "Time O(26*n); Space O(n). Repeatedly choose the smallest feasible next character by scanning suffixes.",
      "optimizedComplexity": "Time O(n); Space O(1). Stack and frequency arrays are bounded by alphabet size.",
      "recursiveComplexity": "Time O(26*n); Space O(n). Recursive greedy picks one character at a time from the smallest feasible prefix.",
      "bruteForceCode": "class Solution {\n  public String removeDuplicateLetters(String s) {\n    if (s.isEmpty()) return \"\";\n\n    int[] count = new int[26];\n    for (char ch : s.toCharArray()) count[ch - 'a']++;\n\n    int position = 0;\n    for (int i = 0; i < s.length(); i++) {\n      if (s.charAt(i) < s.charAt(position)) position = i;\n      count[s.charAt(i) - 'a']--;\n      if (count[s.charAt(i) - 'a'] == 0) break;\n    }\n\n    char chosen = s.charAt(position);\n    String suffix = s.substring(position + 1).replace(String.valueOf(chosen), \"\");\n    return chosen + removeDuplicateLetters(suffix);\n  }\n}",
      "iterativeCode": "class Solution {\n  public String removeDuplicateLetters(String s) {\n    int[] last = new int[26];\n    boolean[] used = new boolean[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      last[s.charAt(i) - 'a'] = i;\n    }\n\n    StringBuilder stack = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      int index = ch - 'a';\n      if (used[index]) continue;\n\n      while (stack.length() > 0) {\n        char top = stack.charAt(stack.length() - 1);\n        if (top <= ch || last[top - 'a'] <= i) break;\n        used[top - 'a'] = false;\n        stack.deleteCharAt(stack.length() - 1);\n      }\n\n      stack.append(ch);\n      used[index] = true;\n    }\n\n    return stack.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String removeDuplicateLetters(String s) {\n    if (s.isEmpty()) return \"\";\n\n    int[] count = new int[26];\n    for (char ch : s.toCharArray()) count[ch - 'a']++;\n\n    int best = 0;\n    for (int i = 0; i < s.length(); i++) {\n      if (s.charAt(i) < s.charAt(best)) best = i;\n      count[s.charAt(i) - 'a']--;\n      if (count[s.charAt(i) - 'a'] == 0) break;\n    }\n\n    char chosen = s.charAt(best);\n    String remaining = s.substring(best + 1).replace(String.valueOf(chosen), \"\");\n    return chosen + removeDuplicateLetters(remaining);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String removeDuplicateLetters(String s) {\n    int[] last = new int[26];\n    boolean[] used = new boolean[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      last[s.charAt(i) - 'a'] = i;\n    }\n\n    StringBuilder stack = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      int index = ch - 'a';\n      if (used[index]) continue;\n\n      while (stack.length() > 0) {\n        char top = stack.charAt(stack.length() - 1);\n        if (top <= ch || last[top - 'a'] <= i) break;\n        used[top - 'a'] = false;\n        stack.deleteCharAt(stack.length() - 1);\n      }\n\n      stack.append(ch);\n      used[index] = true;\n    }\n\n    return stack.toString();\n  }\n}",
      "code": "class Solution {\n  public String removeDuplicateLetters(String s) {\n    int[] last = new int[26];\n    boolean[] used = new boolean[26];\n\n    for (int i = 0; i < s.length(); i++) {\n      last[s.charAt(i) - 'a'] = i;\n    }\n\n    StringBuilder stack = new StringBuilder();\n    for (int i = 0; i < s.length(); i++) {\n      char ch = s.charAt(i);\n      int index = ch - 'a';\n      if (used[index]) continue;\n\n      while (stack.length() > 0) {\n        char top = stack.charAt(stack.length() - 1);\n        if (top <= ch || last[top - 'a'] <= i) break;\n        used[top - 'a'] = false;\n        stack.deleteCharAt(stack.length() - 1);\n      }\n\n      stack.append(ch);\n      used[index] = true;\n    }\n\n    return stack.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Score of Parentheses",
      "difficulty": "Medium",
      "subpattern": "Parentheses score stack",
      "question": "Given a balanced parentheses string s, return its score. () has score 1, AB has score A + B, and (A) has score 2 * A.",
      "trigger": "Nested parentheses require storing the score before entering a new pair and combining it when the pair closes.",
      "intuition": "Push current score on opening parenthesis and reset current. On closing, current becomes previous + max(2 * current, 1).",
      "edgeCases": "Single pair, adjacent pairs, deeply nested pairs, mix of adjacent and nested groups.",
      "constraints": "2 <= s.length <= 50; s consists only of ( and ); s is a balanced parentheses string.",
      "source": {
        "label": "Score of Parentheses - LeetCode 856",
        "url": "https://leetcode.com/problems/score-of-parentheses/"
      },
      "examples": [
        {
          "input": "s = \"()\"",
          "output": "1",
          "explanation": "A single pair scores 1."
        },
        {
          "input": "s = \"(())\"",
          "output": "2",
          "explanation": "Wrapping () doubles the score."
        },
        {
          "input": "s = \"()()\"",
          "output": "2",
          "explanation": "Adjacent scores are added."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly replace primitive groups and rebuild score expressions conceptually.",
      "optimizedComplexity": "Time O(n); Space O(n). Stack stores previous scores for nested groups.",
      "recursiveComplexity": "Time O(n); Space O(depth). Recursive parser evaluates each balanced group once.",
      "bruteForceCode": "class Solution {\n  public int scoreOfParentheses(String s) {\n    int score = 0;\n    int depth = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n      if (s.charAt(i) == '(') {\n        depth++;\n      } else {\n        depth--;\n        if (s.charAt(i - 1) == '(') score += 1 << depth;\n      }\n    }\n\n    return score;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int scoreOfParentheses(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int current = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(') {\n        stack.push(current);\n        current = 0;\n      } else {\n        int previous = stack.pop();\n        current = previous + Math.max(2 * current, 1);\n      }\n    }\n\n    return current;\n  }\n}",
      "recursiveCode": "class Solution {\n  private int index;\n\n  public int scoreOfParentheses(String s) {\n    index = 0;\n    return score(s);\n  }\n\n  private int score(String s) {\n    int total = 0;\n\n    while (index < s.length()) {\n      if (s.charAt(index) == '(') {\n        index++;\n        int inner = score(s);\n        total += inner == 0 ? 1 : 2 * inner;\n      } else {\n        index++;\n        return total;\n      }\n    }\n\n    return total;\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int scoreOfParentheses(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int current = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(') {\n        stack.push(current);\n        current = 0;\n      } else {\n        int previous = stack.pop();\n        current = previous + Math.max(2 * current, 1);\n      }\n    }\n\n    return current;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int scoreOfParentheses(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int current = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(') {\n        stack.push(current);\n        current = 0;\n      } else {\n        int previous = stack.pop();\n        current = previous + Math.max(2 * current, 1);\n      }\n    }\n\n    return current;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Baseball Game",
      "difficulty": "Easy",
      "subpattern": "Score history stack simulation",
      "question": "Given a list of baseball operations, calculate the final score. An integer records a score, + records the sum of previous two scores, D records double the previous score, and C invalidates the previous score.",
      "trigger": "Every operation depends on the most recent valid scores, so a stack naturally stores score history.",
      "intuition": "Push numeric scores. For C pop the previous score, for D push twice the previous score, and for + push the sum of the top two scores.",
      "edgeCases": "Negative scores, C after several scores, D after one score, + requiring two previous scores, final sum after all cancellations.",
      "constraints": "1 <= operations.length <= 1000; operations[i] is an integer, +, D, or C; operations are always valid.",
      "source": {
        "label": "Baseball Game - LeetCode 682",
        "url": "https://leetcode.com/problems/baseball-game/"
      },
      "examples": [
        {
          "input": "ops = [\"5\",\"2\",\"C\",\"D\",\"+\"]",
          "output": "30",
          "explanation": "Valid scores become 5, 10, and 15."
        },
        {
          "input": "ops = [\"5\",\"-2\",\"4\",\"C\",\"D\",\"9\",\"+\",\"+\"]",
          "output": "27",
          "explanation": "Stack operations produce final sum 27."
        },
        {
          "input": "ops = [\"1\",\"C\"]",
          "output": "0",
          "explanation": "The only score is cancelled."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store valid scores in a list and mutate the end for each operation.",
      "optimizedComplexity": "Time O(n); Space O(n). Stack operations are O(1) and the final sum scans valid scores.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive simulation processes one operation per call with score history.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int calPoints(String[] operations) {\n    List<Integer> scores = new ArrayList<>();\n\n    for (String op : operations) {\n      int size = scores.size();\n      if (op.equals(\"C\")) scores.remove(size - 1);\n      else if (op.equals(\"D\")) scores.add(scores.get(size - 1) * 2);\n      else if (op.equals(\"+\")) scores.add(scores.get(size - 1) + scores.get(size - 2));\n      else scores.add(Integer.parseInt(op));\n    }\n\n    int total = 0;\n    for (int score : scores) total += score;\n    return total;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calPoints(String[] operations) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (String op : operations) {\n      if (op.equals(\"C\")) {\n        stack.pop();\n      } else if (op.equals(\"D\")) {\n        stack.push(stack.peek() * 2);\n      } else if (op.equals(\"+\")) {\n        int last = stack.pop();\n        int sum = last + stack.peek();\n        stack.push(last);\n        stack.push(sum);\n      } else {\n        stack.push(Integer.parseInt(op));\n      }\n    }\n\n    int total = 0;\n    while (!stack.isEmpty()) total += stack.pop();\n    return total;\n  }\n}",
      "recursiveCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public int calPoints(String[] operations) {\n    List<Integer> scores = new ArrayList<>();\n    simulate(operations, 0, scores);\n\n    int total = 0;\n    for (int score : scores) total += score;\n    return total;\n  }\n\n  private void simulate(String[] operations, int index, List<Integer> scores) {\n    if (index == operations.length) return;\n\n    String op = operations[index];\n    int size = scores.size();\n    if (op.equals(\"C\")) scores.remove(size - 1);\n    else if (op.equals(\"D\")) scores.add(scores.get(size - 1) * 2);\n    else if (op.equals(\"+\")) scores.add(scores.get(size - 1) + scores.get(size - 2));\n    else scores.add(Integer.parseInt(op));\n\n    simulate(operations, index + 1, scores);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calPoints(String[] operations) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (String op : operations) {\n      if (op.equals(\"C\")) {\n        stack.pop();\n      } else if (op.equals(\"D\")) {\n        stack.push(stack.peek() * 2);\n      } else if (op.equals(\"+\")) {\n        int last = stack.pop();\n        int sum = last + stack.peek();\n        stack.push(last);\n        stack.push(sum);\n      } else {\n        stack.push(Integer.parseInt(op));\n      }\n    }\n\n    int total = 0;\n    while (!stack.isEmpty()) total += stack.pop();\n    return total;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int calPoints(String[] operations) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (String op : operations) {\n      if (op.equals(\"C\")) {\n        stack.pop();\n      } else if (op.equals(\"D\")) {\n        stack.push(stack.peek() * 2);\n      } else if (op.equals(\"+\")) {\n        int last = stack.pop();\n        int sum = last + stack.peek();\n        stack.push(last);\n        stack.push(sum);\n      } else {\n        stack.push(Integer.parseInt(op));\n      }\n    }\n\n    int total = 0;\n    while (!stack.isEmpty()) total += stack.pop();\n    return total;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Exclusive Time of Functions",
      "difficulty": "Medium",
      "subpattern": "Call stack interval accounting",
      "question": "Given n functions and execution logs in the form id:start|end:timestamp, return each function?s exclusive execution time. A running function pauses when another function starts and resumes after the nested function ends.",
      "trigger": "Nested function calls behave like a runtime call stack, and exclusive time is assigned to the function currently on top.",
      "intuition": "Track the previous timestamp. On start, add elapsed time to current top before pushing new id. On end, add inclusive time to the top and pop it.",
      "edgeCases": "Nested calls, consecutive calls, same function recursively called, single function, end timestamp is inclusive.",
      "constraints": "1 <= n <= 100; 1 <= logs.length <= 500; logs are valid and sorted by timestamp.",
      "source": {
        "label": "Exclusive Time of Functions - LeetCode 636",
        "url": "https://leetcode.com/problems/exclusive-time-of-functions/"
      },
      "examples": [
        {
          "input": "n = 2, logs = [\"0:start:0\",\"1:start:2\",\"1:end:5\",\"0:end:6\"]",
          "output": "[3,4]",
          "explanation": "Function 0 runs at times 0-1 and 6; function 1 runs 2-5."
        },
        {
          "input": "n = 1, logs = [\"0:start:0\",\"0:end:0\"]",
          "output": "[1]",
          "explanation": "End timestamps are inclusive."
        },
        {
          "input": "n = 2, logs = [\"0:start:0\",\"0:end:1\",\"1:start:2\",\"1:end:3\"]",
          "output": "[2,2]",
          "explanation": "No nested overlap occurs."
        }
      ],
      "bruteForceComplexity": "Time O(T + logs), Space O(T) for timeline expansion, where T is total timestamp range.",
      "optimizedComplexity": "Time O(logs); Space O(n). Stack stores active function ids and each log is processed once.",
      "recursiveComplexity": "Time O(logs); Space O(n + logs). Recursion can process one log per call while maintaining the call stack.",
      "bruteForceCode": "import java.util.List;\n\nclass Solution {\n  public int[] exclusiveTime(int n, List<String> logs) {\n    int[] answer = new int[n];\n    java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();\n    int previous = 0;\n\n    for (String log : logs) {\n      String[] parts = log.split(\":\");\n      int id = Integer.parseInt(parts[0]);\n      int time = Integer.parseInt(parts[2]);\n\n      if (parts[1].equals(\"start\")) {\n        if (!stack.isEmpty()) answer[stack.peek()] += time - previous;\n        stack.push(id);\n        previous = time;\n      } else {\n        answer[stack.pop()] += time - previous + 1;\n        previous = time + 1;\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] exclusiveTime(int n, List<String> logs) {\n    int[] answer = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    int previousTime = 0;\n\n    for (String log : logs) {\n      String[] parts = log.split(\":\");\n      int id = Integer.parseInt(parts[0]);\n      int time = Integer.parseInt(parts[2]);\n\n      if (parts[1].equals(\"start\")) {\n        if (!stack.isEmpty()) answer[stack.peek()] += time - previousTime;\n        stack.push(id);\n        previousTime = time;\n      } else {\n        answer[stack.pop()] += time - previousTime + 1;\n        previousTime = time + 1;\n      }\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] exclusiveTime(int n, List<String> logs) {\n    int[] answer = new int[n];\n    process(logs, 0, new ArrayDeque<>(), answer, new int[] {0});\n    return answer;\n  }\n\n  private void process(List<String> logs, int index, Deque<Integer> stack, int[] answer, int[] previousTime) {\n    if (index == logs.size()) return;\n\n    String[] parts = logs.get(index).split(\":\");\n    int id = Integer.parseInt(parts[0]);\n    int time = Integer.parseInt(parts[2]);\n\n    if (parts[1].equals(\"start\")) {\n      if (!stack.isEmpty()) answer[stack.peek()] += time - previousTime[0];\n      stack.push(id);\n      previousTime[0] = time;\n    } else {\n      answer[stack.pop()] += time - previousTime[0] + 1;\n      previousTime[0] = time + 1;\n    }\n\n    process(logs, index + 1, stack, answer, previousTime);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] exclusiveTime(int n, List<String> logs) {\n    int[] answer = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    int previousTime = 0;\n\n    for (String log : logs) {\n      String[] parts = log.split(\":\");\n      int id = Integer.parseInt(parts[0]);\n      int time = Integer.parseInt(parts[2]);\n\n      if (parts[1].equals(\"start\")) {\n        if (!stack.isEmpty()) answer[stack.peek()] += time - previousTime;\n        stack.push(id);\n        previousTime = time;\n      } else {\n        answer[stack.pop()] += time - previousTime + 1;\n        previousTime = time + 1;\n      }\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.List;\n\nclass Solution {\n  public int[] exclusiveTime(int n, List<String> logs) {\n    int[] answer = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n    int previousTime = 0;\n\n    for (String log : logs) {\n      String[] parts = log.split(\":\");\n      int id = Integer.parseInt(parts[0]);\n      int time = Integer.parseInt(parts[2]);\n\n      if (parts[1].equals(\"start\")) {\n        if (!stack.isEmpty()) answer[stack.peek()] += time - previousTime;\n        stack.push(id);\n        previousTime = time;\n      } else {\n        answer[stack.pop()] += time - previousTime + 1;\n        previousTime = time + 1;\n      }\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Maximum Width Ramp",
      "difficulty": "Medium",
      "subpattern": "Monotonic decreasing candidate-index stack",
      "question": "Given an integer array nums, return the maximum width ramp. A ramp is a pair (i, j) where i < j and nums[i] <= nums[j], and its width is j - i.",
      "trigger": "Only decreasing prefix indexes can become useful left boundaries. Scanning from the right resolves the widest valid ramps first.",
      "intuition": "Build a stack of indexes with strictly decreasing values. Then scan j from right to left, popping every left index that can pair with j and maximizing width.",
      "edgeCases": "No positive-width ramp, all increasing, all decreasing, duplicate values, widest ramp uses first and last indexes.",
      "constraints": "2 <= nums.length <= 50000; 0 <= nums[i] <= 50000.",
      "source": {
        "label": "Maximum Width Ramp - LeetCode 962",
        "url": "https://leetcode.com/problems/maximum-width-ramp/"
      },
      "examples": [
        {
          "input": "nums = [6,0,8,2,1,5]",
          "output": "4",
          "explanation": "Ramp (1,5) has width 4."
        },
        {
          "input": "nums = [9,8,1,0,1,9,4,0,4,1]",
          "output": "7",
          "explanation": "Ramp (2,9) has width 7."
        },
        {
          "input": "nums = [1,2,3]",
          "output": "2",
          "explanation": "Ramp (0,2) has maximum width."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Check every pair i, j.",
      "optimizedComplexity": "Time O(n); Space O(n). Candidate left indexes are pushed once and popped once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive passes can build and consume the monotonic candidate stack.",
      "bruteForceCode": "class Solution {\n  public int maxWidthRamp(int[] nums) {\n    int best = 0;\n\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        if (nums[i] <= nums[j]) best = Math.max(best, j - i);\n      }\n    }\n\n    return best;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int maxWidthRamp(int[] nums) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      if (stack.isEmpty() || nums[i] < nums[stack.peek()]) stack.push(i);\n    }\n\n    int best = 0;\n    for (int j = nums.length - 1; j >= 0; j--) {\n      while (!stack.isEmpty() && nums[stack.peek()] <= nums[j]) {\n        best = Math.max(best, j - stack.pop());\n      }\n    }\n\n    return best;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int maxWidthRamp(int[] nums) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    build(nums, 0, stack);\n    return consume(nums, nums.length - 1, stack, 0);\n  }\n\n  private void build(int[] nums, int index, Deque<Integer> stack) {\n    if (index == nums.length) return;\n    if (stack.isEmpty() || nums[index] < nums[stack.peek()]) stack.push(index);\n    build(nums, index + 1, stack);\n  }\n\n  private int consume(int[] nums, int right, Deque<Integer> stack, int best) {\n    if (right < 0) return best;\n    while (!stack.isEmpty() && nums[stack.peek()] <= nums[right]) {\n      best = Math.max(best, right - stack.pop());\n    }\n    return consume(nums, right - 1, stack, best);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int maxWidthRamp(int[] nums) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      if (stack.isEmpty() || nums[i] < nums[stack.peek()]) stack.push(i);\n    }\n\n    int best = 0;\n    for (int j = nums.length - 1; j >= 0; j--) {\n      while (!stack.isEmpty() && nums[stack.peek()] <= nums[j]) {\n        best = Math.max(best, j - stack.pop());\n      }\n    }\n\n    return best;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int maxWidthRamp(int[] nums) {\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      if (stack.isEmpty() || nums[i] < nums[stack.peek()]) stack.push(i);\n    }\n\n    int best = 0;\n    for (int j = nums.length - 1; j >= 0; j--) {\n      while (!stack.isEmpty() && nums[stack.peek()] <= nums[j]) {\n        best = Math.max(best, j - stack.pop());\n      }\n    }\n\n    return best;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Validate Stack Sequences",
      "difficulty": "Medium",
      "subpattern": "Push-pop stack simulation",
      "question": "Given pushed and popped sequences with distinct values, return true if popped could be the result of push and pop operations on an initially empty stack.",
      "trigger": "The question directly asks whether one push order can produce one pop order, so simulating stack operations is the clean invariant.",
      "intuition": "Push values in pushed order. After every push, pop while the stack top matches the next needed popped value.",
      "edgeCases": "Already same order, fully reversed order, mismatch near end, one element, all values distinct.",
      "constraints": "1 <= pushed.length <= 1000; popped.length == pushed.length; values are distinct and popped is a permutation of pushed.",
      "source": {
        "label": "Validate Stack Sequences - LeetCode 946",
        "url": "https://leetcode.com/problems/validate-stack-sequences/"
      },
      "examples": [
        {
          "input": "pushed = [1,2,3,4,5], popped = [4,5,3,2,1]",
          "output": "true",
          "explanation": "The sequence can be produced by valid stack operations."
        },
        {
          "input": "pushed = [1,2,3,4,5], popped = [4,3,5,1,2]",
          "output": "false",
          "explanation": "1 cannot be popped before 2 after the shown operations."
        },
        {
          "input": "pushed = [1], popped = [1]",
          "output": "true",
          "explanation": "One push followed by one pop is valid."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(n). Repeatedly search for the next pop candidate in simulated remaining pushes.",
      "optimizedComplexity": "Time O(n); Space O(n). Each value is pushed and popped at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion can simulate one push step at a time.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean validateStackSequences(int[] pushed, int[] popped) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int popIndex = 0;\n\n    for (int value : pushed) {\n      stack.push(value);\n      while (!stack.isEmpty() && stack.peek() == popped[popIndex]) {\n        stack.pop();\n        popIndex++;\n      }\n    }\n\n    return popIndex == popped.length;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean validateStackSequences(int[] pushed, int[] popped) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int popIndex = 0;\n\n    for (int value : pushed) {\n      stack.push(value);\n      while (!stack.isEmpty() && stack.peek() == popped[popIndex]) {\n        stack.pop();\n        popIndex++;\n      }\n    }\n\n    return stack.isEmpty();\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean validateStackSequences(int[] pushed, int[] popped) {\n    return simulate(pushed, popped, 0, new int[] {0}, new ArrayDeque<>());\n  }\n\n  private boolean simulate(int[] pushed, int[] popped, int pushIndex, int[] popIndex, Deque<Integer> stack) {\n    if (pushIndex == pushed.length) return popIndex[0] == popped.length;\n\n    stack.push(pushed[pushIndex]);\n    while (!stack.isEmpty() && stack.peek() == popped[popIndex[0]]) {\n      stack.pop();\n      popIndex[0]++;\n    }\n\n    return simulate(pushed, popped, pushIndex + 1, popIndex, stack);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean validateStackSequences(int[] pushed, int[] popped) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int popIndex = 0;\n\n    for (int value : pushed) {\n      stack.push(value);\n      while (!stack.isEmpty() && stack.peek() == popped[popIndex]) {\n        stack.pop();\n        popIndex++;\n      }\n    }\n\n    return stack.isEmpty();\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public boolean validateStackSequences(int[] pushed, int[] popped) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int popIndex = 0;\n\n    for (int value : pushed) {\n      stack.push(value);\n      while (!stack.isEmpty() && stack.peek() == popped[popIndex]) {\n        stack.pop();\n        popIndex++;\n      }\n    }\n\n    return stack.isEmpty();\n  }\n}"
    },
    {
      "group": "more",
      "name": "Build an Array With Stack Operations",
      "difficulty": "Easy",
      "subpattern": "Stack operation simulation",
      "question": "Given a strictly increasing target array and an integer n, return the stack operations needed to build target by reading numbers from 1 to n. You may Push each read number and Pop it if it is not needed.",
      "trigger": "The problem asks to output explicit stack operations while scanning numbers in increasing order.",
      "intuition": "Read numbers from 1 upward. Push every number. If it is not the next target value, immediately Pop it; otherwise keep it and advance target pointer.",
      "edgeCases": "Target starts at 1, gaps between target values, target contains n, target has one element, stop after last target value.",
      "constraints": "1 <= target.length <= 100; 1 <= n <= 100; target is strictly increasing and values are between 1 and n.",
      "source": {
        "label": "Build an Array With Stack Operations - LeetCode 1441",
        "url": "https://leetcode.com/problems/build-an-array-with-stack-operations/"
      },
      "examples": [
        {
          "input": "target = [1,3], n = 3",
          "output": "[\"Push\",\"Push\",\"Pop\",\"Push\"]",
          "explanation": "Read 1 and keep it, read 2 and discard it, read 3 and keep it."
        },
        {
          "input": "target = [1,2,3], n = 3",
          "output": "[\"Push\",\"Push\",\"Push\"]",
          "explanation": "Every read value is needed."
        },
        {
          "input": "target = [1,2], n = 4",
          "output": "[\"Push\",\"Push\"]",
          "explanation": "Stop once target is built."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Simulate reading every value until target is complete.",
      "optimizedComplexity": "Time O(max(target)); Space O(max(target)) for returned operations. Stop as soon as the target is built.",
      "recursiveComplexity": "Time O(max(target)); Space O(max(target)) including recursion and returned operations.",
      "bruteForceCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public List<String> buildArray(int[] target, int n) {\n    List<String> operations = new ArrayList<>();\n    int targetIndex = 0;\n\n    for (int value = 1; value <= n && targetIndex < target.length; value++) {\n      operations.add(\"Push\");\n      if (value == target[targetIndex]) {\n        targetIndex++;\n      } else {\n        operations.add(\"Pop\");\n      }\n    }\n\n    return operations;\n  }\n}",
      "iterativeCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public List<String> buildArray(int[] target, int n) {\n    List<String> operations = new ArrayList<>();\n    int current = 1;\n\n    for (int value : target) {\n      while (current < value) {\n        operations.add(\"Push\");\n        operations.add(\"Pop\");\n        current++;\n      }\n\n      operations.add(\"Push\");\n      current++;\n    }\n\n    return operations;\n  }\n}",
      "recursiveCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public List<String> buildArray(int[] target, int n) {\n    List<String> operations = new ArrayList<>();\n    build(target, 0, 1, operations);\n    return operations;\n  }\n\n  private void build(int[] target, int index, int current, List<String> operations) {\n    if (index == target.length) return;\n\n    if (current == target[index]) {\n      operations.add(\"Push\");\n      build(target, index + 1, current + 1, operations);\n    } else {\n      operations.add(\"Push\");\n      operations.add(\"Pop\");\n      build(target, index, current + 1, operations);\n    }\n  }\n}",
      "optimizedCode": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public List<String> buildArray(int[] target, int n) {\n    List<String> operations = new ArrayList<>();\n    int current = 1;\n\n    for (int value : target) {\n      while (current < value) {\n        operations.add(\"Push\");\n        operations.add(\"Pop\");\n        current++;\n      }\n\n      operations.add(\"Push\");\n      current++;\n    }\n\n    return operations;\n  }\n}",
      "code": "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n  public List<String> buildArray(int[] target, int n) {\n    List<String> operations = new ArrayList<>();\n    int current = 1;\n\n    for (int value : target) {\n      while (current < value) {\n        operations.add(\"Push\");\n        operations.add(\"Pop\");\n        current++;\n      }\n\n      operations.add(\"Push\");\n      current++;\n    }\n\n    return operations;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Crawler Log Folder",
      "difficulty": "Easy",
      "subpattern": "Directory depth stack simulation",
      "question": "Given crawler logs, return the minimum number of operations needed to go back to the main folder. ../ moves to parent, ./ stays in place, and x/ moves into child folder x.",
      "trigger": "Folder navigation is a stack/depth problem because entering a folder pushes one level and ../ pops one level when possible.",
      "intuition": "Track current depth. Child folders increase depth, ../ decreases depth only above root, and ./ does nothing.",
      "edgeCases": "Already at root, repeated ../ at root, only ./ logs, many child folders, mixed navigation.",
      "constraints": "1 <= logs.length <= 1000; 2 <= logs[i].length <= 10; logs[i] is ../, ./, or a lowercase folder name ending with /.",
      "source": {
        "label": "Crawler Log Folder - LeetCode 1598",
        "url": "https://leetcode.com/problems/crawler-log-folder/"
      },
      "examples": [
        {
          "input": "logs = [\"d1/\",\"d2/\",\"../\",\"d21/\",\"./\"]",
          "output": "2",
          "explanation": "The crawler ends two levels below root."
        },
        {
          "input": "logs = [\"d1/\",\"d2/\",\"./\",\"d3/\",\"../\",\"d31/\"]",
          "output": "3",
          "explanation": "Three parent operations are needed to return to root."
        },
        {
          "input": "logs = [\"d1/\",\"../\",\"../\",\"../\"]",
          "output": "0",
          "explanation": "Moves above root are ignored."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Store folder names in a stack and return its size.",
      "optimizedComplexity": "Time O(n); Space O(1). Only the current depth is needed.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion processes one log per call.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int minOperations(String[] logs) {\n    Deque<String> stack = new ArrayDeque<>();\n\n    for (String log : logs) {\n      if (log.equals(\"../\")) {\n        if (!stack.isEmpty()) stack.pop();\n      } else if (!log.equals(\"./\")) {\n        stack.push(log);\n      }\n    }\n\n    return stack.size();\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minOperations(String[] logs) {\n    int depth = 0;\n\n    for (String log : logs) {\n      if (log.equals(\"../\")) {\n        if (depth > 0) depth--;\n      } else if (!log.equals(\"./\")) {\n        depth++;\n      }\n    }\n\n    return depth;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minOperations(String[] logs) {\n    return depth(logs, 0, 0);\n  }\n\n  private int depth(String[] logs, int index, int currentDepth) {\n    if (index == logs.length) return currentDepth;\n\n    String log = logs[index];\n    if (log.equals(\"../\")) currentDepth = Math.max(0, currentDepth - 1);\n    else if (!log.equals(\"./\")) currentDepth++;\n\n    return depth(logs, index + 1, currentDepth);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minOperations(String[] logs) {\n    int depth = 0;\n\n    for (String log : logs) {\n      if (log.equals(\"../\")) {\n        if (depth > 0) depth--;\n      } else if (!log.equals(\"./\")) {\n        depth++;\n      }\n    }\n\n    return depth;\n  }\n}",
      "code": "class Solution {\n  public int minOperations(String[] logs) {\n    int depth = 0;\n\n    for (String log : logs) {\n      if (log.equals(\"../\")) {\n        if (depth > 0) depth--;\n      } else if (!log.equals(\"./\")) {\n        depth++;\n      }\n    }\n\n    return depth;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Final Prices With a Special Discount",
      "difficulty": "Easy",
      "subpattern": "Next smaller-or-equal monotonic stack",
      "question": "Given prices where each item gets a discount equal to the first later item with price less than or equal to it, return the final prices after discount.",
      "trigger": "Each price needs the first smaller-or-equal value to its right, which is a next-less-or-equal monotonic stack problem.",
      "intuition": "Scan left to right with indexes waiting for discounts. When current price is less than or equal to a waiting price, apply it as that index?s discount.",
      "edgeCases": "No discount for an item, equal price discount, strictly increasing prices, strictly decreasing prices, one item.",
      "constraints": "1 <= prices.length <= 500; 1 <= prices[i] <= 1000.",
      "source": {
        "label": "Final Prices With a Special Discount - LeetCode 1475",
        "url": "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/"
      },
      "examples": [
        {
          "input": "prices = [8,4,6,2,3]",
          "output": "[4,2,4,2,3]",
          "explanation": "Each item uses the first later price less than or equal to it."
        },
        {
          "input": "prices = [1,2,3,4,5]",
          "output": "[1,2,3,4,5]",
          "explanation": "No later item is smaller or equal for any price."
        },
        {
          "input": "prices = [10,1,1,6]",
          "output": "[9,0,1,6]",
          "explanation": "Equal price 1 discounts the previous 1."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1) excluding output. For each price, scan right for first smaller-or-equal price.",
      "optimizedComplexity": "Time O(n); Space O(n). Each index is pushed and popped at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive scan can carry the unresolved index stack.",
      "bruteForceCode": "class Solution {\n  public int[] finalPrices(int[] prices) {\n    int[] answer = prices.clone();\n\n    for (int i = 0; i < prices.length; i++) {\n      for (int j = i + 1; j < prices.length; j++) {\n        if (prices[j] <= prices[i]) {\n          answer[i] = prices[i] - prices[j];\n          break;\n        }\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] finalPrices(int[] prices) {\n    int[] answer = prices.clone();\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < prices.length; i++) {\n      while (!stack.isEmpty() && prices[i] <= prices[stack.peek()]) {\n        int index = stack.pop();\n        answer[index] = prices[index] - prices[i];\n      }\n      stack.push(i);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] finalPrices(int[] prices) {\n    int[] answer = prices.clone();\n    apply(prices, answer, 0, new ArrayDeque<>());\n    return answer;\n  }\n\n  private void apply(int[] prices, int[] answer, int index, Deque<Integer> stack) {\n    if (index == prices.length) return;\n\n    while (!stack.isEmpty() && prices[index] <= prices[stack.peek()]) {\n      int previous = stack.pop();\n      answer[previous] = prices[previous] - prices[index];\n    }\n    stack.push(index);\n\n    apply(prices, answer, index + 1, stack);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] finalPrices(int[] prices) {\n    int[] answer = prices.clone();\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < prices.length; i++) {\n      while (!stack.isEmpty() && prices[i] <= prices[stack.peek()]) {\n        int index = stack.pop();\n        answer[index] = prices[index] - prices[i];\n      }\n      stack.push(i);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] finalPrices(int[] prices) {\n    int[] answer = prices.clone();\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = 0; i < prices.length; i++) {\n      while (!stack.isEmpty() && prices[i] <= prices[stack.peek()]) {\n        int index = stack.pop();\n        answer[index] = prices[index] - prices[i];\n      }\n      stack.push(i);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Minimum Add to Make Parentheses Valid",
      "difficulty": "Medium",
      "subpattern": "Unmatched parentheses counting",
      "question": "Given a parentheses string s containing only ( and ), return the minimum number of parentheses that must be added to make it valid.",
      "trigger": "A closing parenthesis needs an unmatched opening parenthesis before it; otherwise one opening parenthesis must be added.",
      "intuition": "Track unmatched opens. For each ), consume one open if possible; otherwise count one required added open. Remaining opens need closing parentheses.",
      "edgeCases": "All opening parentheses, all closing parentheses, already valid string, alternating invalid string, empty-like balanced sections.",
      "constraints": "1 <= s.length <= 1000; s consists only of ( and ).",
      "source": {
        "label": "Minimum Add to Make Parentheses Valid - LeetCode 921",
        "url": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/"
      },
      "examples": [
        {
          "input": "s = \"())\"",
          "output": "1",
          "explanation": "Add one opening parenthesis before the last )."
        },
        {
          "input": "s = \"(((\"",
          "output": "3",
          "explanation": "Each unmatched opening parenthesis needs a closing parenthesis."
        },
        {
          "input": "s = \"()\"",
          "output": "0",
          "explanation": "The string is already valid."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Use a stack to store unmatched parentheses explicitly.",
      "optimizedComplexity": "Time O(n); Space O(1). Only counts of unmatched opens and needed additions are required.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursion processes one character per call.",
      "bruteForceCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int minAddToMakeValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n\n    for (char ch : s.toCharArray()) {\n      if (ch == ')' && !stack.isEmpty() && stack.peek() == '(') {\n        stack.pop();\n      } else {\n        stack.push(ch);\n      }\n    }\n\n    return stack.size();\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minAddToMakeValid(String s) {\n    int open = 0;\n    int additions = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(') {\n        open++;\n      } else if (open > 0) {\n        open--;\n      } else {\n        additions++;\n      }\n    }\n\n    return additions + open;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minAddToMakeValid(String s) {\n    return count(s, 0, 0, 0);\n  }\n\n  private int count(String s, int index, int open, int additions) {\n    if (index == s.length()) return additions + open;\n\n    char ch = s.charAt(index);\n    if (ch == '(') return count(s, index + 1, open + 1, additions);\n    if (open > 0) return count(s, index + 1, open - 1, additions);\n    return count(s, index + 1, open, additions + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minAddToMakeValid(String s) {\n    int open = 0;\n    int additions = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(') {\n        open++;\n      } else if (open > 0) {\n        open--;\n      } else {\n        additions++;\n      }\n    }\n\n    return additions + open;\n  }\n}",
      "code": "class Solution {\n  public int minAddToMakeValid(String s) {\n    int open = 0;\n    int additions = 0;\n\n    for (char ch : s.toCharArray()) {\n      if (ch == '(') {\n        open++;\n      } else if (open > 0) {\n        open--;\n      } else {\n        additions++;\n      }\n    }\n\n    return additions + open;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Number of Visible People in a Queue",
      "difficulty": "Hard",
      "subpattern": "Monotonic decreasing visibility stack",
      "question": "Given heights of people in a queue, return for each person how many people to their right they can see. A person can see another if everyone between them is shorter than both.",
      "trigger": "Looking right, shorter people are visible and then blocked/removed by taller people. A decreasing stack tracks the visible frontier.",
      "intuition": "Scan from right to left. Pop and count all shorter people because current can see them. If a taller/equal person remains, current can see that blocker too.",
      "edgeCases": "Strictly increasing heights, strictly decreasing heights, one person, equal-like constraints are unique in original problem, tallest at front.",
      "constraints": "1 <= heights.length <= 100000; 1 <= heights[i] <= 100000; heights values are distinct.",
      "source": {
        "label": "Number of Visible People in a Queue - LeetCode 1944",
        "url": "https://leetcode.com/problems/number-of-visible-people-in-a-queue/"
      },
      "examples": [
        {
          "input": "heights = [10,6,8,5,11,9]",
          "output": "[3,1,2,1,1,0]",
          "explanation": "Each person sees shorter popped people and possibly one blocking taller person."
        },
        {
          "input": "heights = [5,1,2,3,10]",
          "output": "[4,1,1,1,0]",
          "explanation": "The first person can see everyone to the right."
        },
        {
          "input": "heights = [3,2,1]",
          "output": "[1,1,0]",
          "explanation": "Each person sees only the next shorter person."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1) excluding output. For each person, scan right until blocked.",
      "optimizedComplexity": "Time O(n); Space O(n). Each height is pushed and popped at most once.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive right-to-left processing carries the monotonic stack.",
      "bruteForceCode": "class Solution {\n  public int[] canSeePersonsCount(int[] heights) {\n    int n = heights.length;\n    int[] answer = new int[n];\n\n    for (int i = 0; i < n; i++) {\n      int maxBetween = 0;\n      for (int j = i + 1; j < n; j++) {\n        if (maxBetween < Math.min(heights[i], heights[j])) answer[i]++;\n        maxBetween = Math.max(maxBetween, heights[j]);\n        if (heights[j] > heights[i]) break;\n      }\n    }\n\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] canSeePersonsCount(int[] heights) {\n    int n = heights.length;\n    int[] answer = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = n - 1; i >= 0; i--) {\n      while (!stack.isEmpty() && stack.peek() < heights[i]) {\n        stack.pop();\n        answer[i]++;\n      }\n\n      if (!stack.isEmpty()) answer[i]++;\n      stack.push(heights[i]);\n    }\n\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] canSeePersonsCount(int[] heights) {\n    int[] answer = new int[heights.length];\n    fill(heights, heights.length - 1, new ArrayDeque<>(), answer);\n    return answer;\n  }\n\n  private void fill(int[] heights, int index, Deque<Integer> stack, int[] answer) {\n    if (index < 0) return;\n\n    while (!stack.isEmpty() && stack.peek() < heights[index]) {\n      stack.pop();\n      answer[index]++;\n    }\n    if (!stack.isEmpty()) answer[index]++;\n    stack.push(heights[index]);\n\n    fill(heights, index - 1, stack, answer);\n  }\n}",
      "optimizedCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] canSeePersonsCount(int[] heights) {\n    int n = heights.length;\n    int[] answer = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = n - 1; i >= 0; i--) {\n      while (!stack.isEmpty() && stack.peek() < heights[i]) {\n        stack.pop();\n        answer[i]++;\n      }\n\n      if (!stack.isEmpty()) answer[i]++;\n      stack.push(heights[i]);\n    }\n\n    return answer;\n  }\n}",
      "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass Solution {\n  public int[] canSeePersonsCount(int[] heights) {\n    int n = heights.length;\n    int[] answer = new int[n];\n    Deque<Integer> stack = new ArrayDeque<>();\n\n    for (int i = n - 1; i >= 0; i--) {\n      while (!stack.isEmpty() && stack.peek() < heights[i]) {\n        stack.pop();\n        answer[i]++;\n      }\n\n      if (!stack.isEmpty()) answer[i]++;\n      stack.push(heights[i]);\n    }\n\n    return answer;\n  }\n}"
    },
    {
      "group": "more",
      "name": "Create Maximum Number",
      "difficulty": "Hard",
      "subpattern": "Monotonic stack subsequence selection and merge",
      "question": "Given two arrays nums1 and nums2 and an integer k, create the maximum number of length k by choosing a subsequence from each array while preserving relative order inside each array.",
      "trigger": "Choosing the best subsequence of a fixed length from one array is a monotonic stack problem, and the final answer merges two best subsequences lexicographically.",
      "intuition": "Try every split of k between the two arrays. Build the maximum subsequence for each side using a decreasing stack, merge greedily, and keep the lexicographically largest result.",
      "edgeCases": "k equals one array length, one array contributes zero digits, equal prefixes during merge, many duplicate digits, k equals total length.",
      "constraints": "1 <= nums1.length, nums2.length <= 500; 0 <= nums1[i], nums2[i] <= 9; 1 <= k <= nums1.length + nums2.length.",
      "source": {
        "label": "Create Maximum Number - LeetCode 321",
        "url": "https://leetcode.com/problems/create-maximum-number/"
      },
      "examples": [
        {
          "input": "nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5",
          "output": "[9,8,6,5,3]",
          "explanation": "Best split and merge produce the lexicographically largest length-5 number."
        },
        {
          "input": "nums1 = [6,7], nums2 = [6,0,4], k = 5",
          "output": "[6,7,6,0,4]",
          "explanation": "All digits must be used."
        },
        {
          "input": "nums1 = [3,9], nums2 = [8,9], k = 3",
          "output": "[9,8,9]",
          "explanation": "The merge must compare remaining suffixes, not only current digits."
        }
      ],
      "bruteForceComplexity": "Time exponential in array lengths; Space O(k). Brute force tries all subsequence splits and combinations.",
      "optimizedComplexity": "Time O(k*(m+n)^2) in straightforward implementation; Space O(m+n). Monotonic stacks build candidates and lexicographic merge compares suffixes.",
      "recursiveComplexity": "Time exponential without memoization for recursive subsequence choices; Space O(k). The optimized stack method is preferred.",
      "bruteForceCode": "class Solution {\n  public int[] maxNumber(int[] nums1, int[] nums2, int k) {\n    int[] best = new int[k];\n\n    int start = Math.max(0, k - nums2.length);\n    int end = Math.min(k, nums1.length);\n    for (int take1 = start; take1 <= end; take1++) {\n      int[] candidate = merge(maxSubsequence(nums1, take1), maxSubsequence(nums2, k - take1));\n      if (greater(candidate, 0, best, 0)) best = candidate;\n    }\n\n    return best;\n  }\n\n  private int[] maxSubsequence(int[] nums, int k) {\n    int[] stack = new int[k];\n    int top = 0;\n    int drop = nums.length - k;\n    for (int num : nums) {\n      while (top > 0 && drop > 0 && stack[top - 1] < num) {\n        top--;\n        drop--;\n      }\n      if (top < k) stack[top++] = num;\n      else drop--;\n    }\n    return stack;\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    int[] result = new int[a.length + b.length];\n    int i = 0, j = 0, r = 0;\n    while (i < a.length || j < b.length) {\n      result[r++] = greater(a, i, b, j) ? a[i++] : b[j++];\n    }\n    return result;\n  }\n\n  private boolean greater(int[] a, int i, int[] b, int j) {\n    while (i < a.length && j < b.length && a[i] == b[j]) {\n      i++;\n      j++;\n    }\n    return j == b.length || (i < a.length && a[i] > b[j]);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] maxNumber(int[] nums1, int[] nums2, int k) {\n    int[] best = new int[k];\n\n    for (int take1 = Math.max(0, k - nums2.length); take1 <= Math.min(k, nums1.length); take1++) {\n      int[] first = maxSubsequence(nums1, take1);\n      int[] second = maxSubsequence(nums2, k - take1);\n      int[] candidate = merge(first, second);\n\n      if (greater(candidate, 0, best, 0)) best = candidate;\n    }\n\n    return best;\n  }\n\n  private int[] maxSubsequence(int[] nums, int k) {\n    int[] stack = new int[k];\n    int top = 0;\n    int drop = nums.length - k;\n\n    for (int num : nums) {\n      while (top > 0 && drop > 0 && stack[top - 1] < num) {\n        top--;\n        drop--;\n      }\n      if (top < k) stack[top++] = num;\n      else drop--;\n    }\n\n    return stack;\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    int[] result = new int[a.length + b.length];\n    int i = 0;\n    int j = 0;\n\n    for (int r = 0; r < result.length; r++) {\n      if (greater(a, i, b, j)) result[r] = a[i++];\n      else result[r] = b[j++];\n    }\n\n    return result;\n  }\n\n  private boolean greater(int[] a, int i, int[] b, int j) {\n    while (i < a.length && j < b.length && a[i] == b[j]) {\n      i++;\n      j++;\n    }\n    return j == b.length || (i < a.length && a[i] > b[j]);\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] maxNumber(int[] nums1, int[] nums2, int k) {\n    return trySplit(nums1, nums2, k, Math.max(0, k - nums2.length), Math.min(k, nums1.length), new int[k]);\n  }\n\n  private int[] trySplit(int[] nums1, int[] nums2, int k, int take1, int end, int[] best) {\n    if (take1 > end) return best;\n\n    int[] candidate = merge(maxSubsequence(nums1, take1), maxSubsequence(nums2, k - take1));\n    if (greater(candidate, 0, best, 0)) best = candidate;\n    return trySplit(nums1, nums2, k, take1 + 1, end, best);\n  }\n\n  private int[] maxSubsequence(int[] nums, int k) {\n    int[] stack = new int[k];\n    int top = 0;\n    int drop = nums.length - k;\n    for (int num : nums) {\n      while (top > 0 && drop > 0 && stack[top - 1] < num) {\n        top--;\n        drop--;\n      }\n      if (top < k) stack[top++] = num;\n      else drop--;\n    }\n    return stack;\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    int[] result = new int[a.length + b.length];\n    mergeInto(a, 0, b, 0, result, 0);\n    return result;\n  }\n\n  private void mergeInto(int[] a, int i, int[] b, int j, int[] result, int r) {\n    if (r == result.length) return;\n    if (greater(a, i, b, j)) result[r] = a[i++];\n    else result[r] = b[j++];\n    mergeInto(a, i, b, j, result, r + 1);\n  }\n\n  private boolean greater(int[] a, int i, int[] b, int j) {\n    while (i < a.length && j < b.length && a[i] == b[j]) {\n      i++;\n      j++;\n    }\n    return j == b.length || (i < a.length && a[i] > b[j]);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] maxNumber(int[] nums1, int[] nums2, int k) {\n    int[] best = new int[k];\n\n    for (int take1 = Math.max(0, k - nums2.length); take1 <= Math.min(k, nums1.length); take1++) {\n      int[] first = maxSubsequence(nums1, take1);\n      int[] second = maxSubsequence(nums2, k - take1);\n      int[] candidate = merge(first, second);\n\n      if (greater(candidate, 0, best, 0)) best = candidate;\n    }\n\n    return best;\n  }\n\n  private int[] maxSubsequence(int[] nums, int k) {\n    int[] stack = new int[k];\n    int top = 0;\n    int drop = nums.length - k;\n\n    for (int num : nums) {\n      while (top > 0 && drop > 0 && stack[top - 1] < num) {\n        top--;\n        drop--;\n      }\n      if (top < k) stack[top++] = num;\n      else drop--;\n    }\n\n    return stack;\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    int[] result = new int[a.length + b.length];\n    int i = 0;\n    int j = 0;\n\n    for (int r = 0; r < result.length; r++) {\n      if (greater(a, i, b, j)) result[r] = a[i++];\n      else result[r] = b[j++];\n    }\n\n    return result;\n  }\n\n  private boolean greater(int[] a, int i, int[] b, int j) {\n    while (i < a.length && j < b.length && a[i] == b[j]) {\n      i++;\n      j++;\n    }\n    return j == b.length || (i < a.length && a[i] > b[j]);\n  }\n}",
      "code": "class Solution {\n  public int[] maxNumber(int[] nums1, int[] nums2, int k) {\n    int[] best = new int[k];\n\n    for (int take1 = Math.max(0, k - nums2.length); take1 <= Math.min(k, nums1.length); take1++) {\n      int[] first = maxSubsequence(nums1, take1);\n      int[] second = maxSubsequence(nums2, k - take1);\n      int[] candidate = merge(first, second);\n\n      if (greater(candidate, 0, best, 0)) best = candidate;\n    }\n\n    return best;\n  }\n\n  private int[] maxSubsequence(int[] nums, int k) {\n    int[] stack = new int[k];\n    int top = 0;\n    int drop = nums.length - k;\n\n    for (int num : nums) {\n      while (top > 0 && drop > 0 && stack[top - 1] < num) {\n        top--;\n        drop--;\n      }\n      if (top < k) stack[top++] = num;\n      else drop--;\n    }\n\n    return stack;\n  }\n\n  private int[] merge(int[] a, int[] b) {\n    int[] result = new int[a.length + b.length];\n    int i = 0;\n    int j = 0;\n\n    for (int r = 0; r < result.length; r++) {\n      if (greater(a, i, b, j)) result[r] = a[i++];\n      else result[r] = b[j++];\n    }\n\n    return result;\n  }\n\n  private boolean greater(int[] a, int i, int[] b, int j) {\n    while (i < a.length && j < b.length && a[i] == b[j]) {\n      i++;\n      j++;\n    }\n    return j == b.length || (i < a.length && a[i] > b[j]);\n  }\n}"
    }
  ],
  "checklist": [
    "The problem has an obvious Stack signal in ordering, state transition, connectivity, range, or repeated decision work.",
    "A brute force solution repeats the same local calculation many times.",
    "The optimized solution keeps a compact state and updates it predictably.",
    "Boundary cases decide correctness more than syntax.",
    "The answer can be verified by checking the invariant after each step."
  ],
  "traps": [
    "Forgetting empty or single-item inputs.",
    "Using the optimized structure before defining the invariant.",
    "Mixing inclusive and exclusive boundaries.",
    "Letting duplicate values break comparison logic.",
    "Writing recursion without a clear base case."
  ],
  "edgeCases": [
    "Empty input if the original problem allows it.",
    "Single element or single node.",
    "All values equal.",
    "Strictly increasing or decreasing values.",
    "Maximum constraints where brute force times out."
  ],
  "complexities": [
    "Brute force usually enumerates candidates and costs O(n^2) or worse.",
    "Optimized iterative solutions keep a stable invariant and usually reduce repeated work.",
    "Recursive solutions add call-stack space equal to depth unless memoized.",
    "Hash maps, heaps, queues, stacks, trees, and graph structures add state proportional to stored candidates.",
    "DP and graph patterns should name states/vertices before estimating complexity."
  ],
  "mentalModel": [
    "Name the state before writing code.",
    "Write the invariant in one sentence.",
    "Move one boundary or process one decision at a time.",
    "Prove each update preserves the invariant.",
    "Check the smallest valid input before optimizing."
  ],
  "revisionStrategy": [
    "Revise the 12 core problems first until the trigger is instant.",
    "Redo 4 core problems after 24 hours without looking at code.",
    "Mix 3 advanced problems with 3 core problems every third session.",
    "Track mistakes by category: boundary, state, duplicate, recursion base case, complexity.",
    "Use the unseen problems only after solving the core set cleanly."
  ],
  "unseen": [
    "A hidden Stack problem with duplicates and boundary indexes.",
    "A Stack problem where the brute force answer is correct but too slow.",
    "A mixed-pattern problem that begins like Stack but needs one helper structure.",
    "A maximum-constraint version of a familiar Stack problem.",
    "A recognition test where the statement does not mention Stack."
  ]
};
