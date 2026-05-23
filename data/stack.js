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
      "subpattern": "Monotonic stack",
      "question": "Solve Valid Parentheses using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Valid Parentheses - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Valid%20Parentheses"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean validParentheses(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean validParentheses(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean validParentheses(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean validParentheses(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean validParentheses(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Min Stack",
      "difficulty": "Easy",
      "subpattern": "parsing",
      "question": "Solve Min Stack using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Min Stack - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Min%20Stack"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean minStack(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean minStack(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean minStack(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean minStack(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean minStack(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Evaluate Reverse Polish Notation",
      "difficulty": "Easy",
      "subpattern": "expression evaluation",
      "question": "Solve Evaluate Reverse Polish Notation using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes expression evaluation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for expression evaluation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Evaluate Reverse Polish Notation - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Evaluate%20Reverse%20Polish%20Notation"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean evaluateReversePolishNotation(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean evaluateReversePolishNotation(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean evaluateReversePolishNotation(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean evaluateReversePolishNotation(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean evaluateReversePolishNotation(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Daily Temperatures",
      "difficulty": "Easy",
      "subpattern": "intervals.",
      "question": "Solve Daily Temperatures using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes intervals. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for intervals. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Daily Temperatures - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Daily%20Temperatures"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean dailyTemperatures(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean dailyTemperatures(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean dailyTemperatures(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean dailyTemperatures(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean dailyTemperatures(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Car Fleet",
      "difficulty": "Easy",
      "subpattern": "Monotonic stack",
      "question": "Solve Car Fleet using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Car Fleet - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Car%20Fleet"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean carFleet(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean carFleet(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean carFleet(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean carFleet(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean carFleet(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Largest Rectangle in Histogram",
      "difficulty": "Easy",
      "subpattern": "parsing",
      "question": "Solve Largest Rectangle in Histogram using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Largest Rectangle in Histogram - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Largest%20Rectangle%20in%20Histogram"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean largestRectangleInHistogram(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean largestRectangleInHistogram(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean largestRectangleInHistogram(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean largestRectangleInHistogram(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean largestRectangleInHistogram(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Next Greater Element I",
      "difficulty": "Easy",
      "subpattern": "expression evaluation",
      "question": "Solve Next Greater Element I using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes expression evaluation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for expression evaluation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Next Greater Element I - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Next%20Greater%20Element%20I"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementI(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementI(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementI(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementI(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementI(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Next Greater Element II",
      "difficulty": "Easy",
      "subpattern": "intervals.",
      "question": "Solve Next Greater Element II using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes intervals. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for intervals. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Next Greater Element II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Next%20Greater%20Element%20II"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementIi(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementIi(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementIi(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementIi(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean nextGreaterElementIi(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Remove K Digits",
      "difficulty": "Easy",
      "subpattern": "Monotonic stack",
      "question": "Solve Remove K Digits using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Remove K Digits - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Remove%20K%20Digits"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeKDigits(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeKDigits(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeKDigits(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeKDigits(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean removeKDigits(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Decode String",
      "difficulty": "Easy",
      "subpattern": "parsing",
      "question": "Solve Decode String using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Decode String - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Decode%20String"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean decodeString(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean decodeString(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean decodeString(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean decodeString(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean decodeString(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Asteroid Collision",
      "difficulty": "Medium",
      "subpattern": "expression evaluation",
      "question": "Solve Asteroid Collision using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes expression evaluation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for expression evaluation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Asteroid Collision - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Asteroid%20Collision"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean asteroidCollision(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean asteroidCollision(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean asteroidCollision(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean asteroidCollision(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean asteroidCollision(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "core",
      "name": "Simplify Path",
      "difficulty": "Medium",
      "subpattern": "intervals.",
      "question": "Solve Simplify Path using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes intervals. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for intervals. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Simplify Path - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Simplify%20Path"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean simplifyPath(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean simplifyPath(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean simplifyPath(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean simplifyPath(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean simplifyPath(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Basic Calculator",
      "difficulty": "Medium",
      "subpattern": "Monotonic stack",
      "question": "Solve Basic Calculator using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Basic Calculator - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Basic%20Calculator"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculator(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculator(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculator(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculator(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculator(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Basic Calculator II",
      "difficulty": "Medium",
      "subpattern": "parsing",
      "question": "Solve Basic Calculator II using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Basic Calculator II - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Basic%20Calculator%20II"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculatorIi(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculatorIi(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculatorIi(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculatorIi(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean basicCalculatorIi(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Online Stock Span",
      "difficulty": "Medium",
      "subpattern": "expression evaluation",
      "question": "Solve Online Stock Span using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes expression evaluation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for expression evaluation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Online Stock Span - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Online%20Stock%20Span"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean onlineStockSpan(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean onlineStockSpan(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean onlineStockSpan(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean onlineStockSpan(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean onlineStockSpan(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "132 Pattern",
      "difficulty": "Medium",
      "subpattern": "intervals.",
      "question": "Solve 132 Pattern using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes intervals. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for intervals. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "132 Pattern - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=132%20Pattern"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean p132Pattern(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean p132Pattern(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean p132Pattern(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean p132Pattern(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean p132Pattern(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Trapping Rain Water",
      "difficulty": "Medium",
      "subpattern": "Monotonic stack",
      "question": "Solve Trapping Rain Water using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Trapping Rain Water - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Trapping%20Rain%20Water"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean trappingRainWater(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean trappingRainWater(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean trappingRainWater(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean trappingRainWater(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean trappingRainWater(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Sum of Subarray Minimums",
      "difficulty": "Medium",
      "subpattern": "parsing",
      "question": "Solve Sum of Subarray Minimums using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Sum of Subarray Minimums - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Sum%20of%20Subarray%20Minimums"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean sumOfSubarrayMinimums(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean sumOfSubarrayMinimums(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean sumOfSubarrayMinimums(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean sumOfSubarrayMinimums(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean sumOfSubarrayMinimums(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Remove Duplicate Letters",
      "difficulty": "Medium",
      "subpattern": "expression evaluation",
      "question": "Solve Remove Duplicate Letters using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes expression evaluation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for expression evaluation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Remove Duplicate Letters - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Remove%20Duplicate%20Letters"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeDuplicateLetters(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeDuplicateLetters(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeDuplicateLetters(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean removeDuplicateLetters(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean removeDuplicateLetters(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Score of Parentheses",
      "difficulty": "Medium",
      "subpattern": "intervals.",
      "question": "Solve Score of Parentheses using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes intervals. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for intervals. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Score of Parentheses - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Score%20of%20Parentheses"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean scoreOfParentheses(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean scoreOfParentheses(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean scoreOfParentheses(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean scoreOfParentheses(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean scoreOfParentheses(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Baseball Game",
      "difficulty": "Medium",
      "subpattern": "Monotonic stack",
      "question": "Solve Baseball Game using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Baseball Game - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Baseball%20Game"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean baseballGame(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean baseballGame(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean baseballGame(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean baseballGame(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean baseballGame(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Exclusive Time of Functions",
      "difficulty": "Medium",
      "subpattern": "parsing",
      "question": "Solve Exclusive Time of Functions using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Exclusive Time of Functions - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Exclusive%20Time%20of%20Functions"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean exclusiveTimeOfFunctions(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean exclusiveTimeOfFunctions(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean exclusiveTimeOfFunctions(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean exclusiveTimeOfFunctions(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean exclusiveTimeOfFunctions(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Maximum Width Ramp",
      "difficulty": "Medium",
      "subpattern": "expression evaluation",
      "question": "Solve Maximum Width Ramp using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes expression evaluation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for expression evaluation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Maximum Width Ramp - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Maximum%20Width%20Ramp"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean maximumWidthRamp(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean maximumWidthRamp(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean maximumWidthRamp(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean maximumWidthRamp(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean maximumWidthRamp(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Validate Stack Sequences",
      "difficulty": "Medium",
      "subpattern": "intervals.",
      "question": "Solve Validate Stack Sequences using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes intervals. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for intervals. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Validate Stack Sequences - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Validate%20Stack%20Sequences"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean validateStackSequences(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean validateStackSequences(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean validateStackSequences(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean validateStackSequences(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean validateStackSequences(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Build an Array With Stack Operations",
      "difficulty": "Hard",
      "subpattern": "Monotonic stack",
      "question": "Solve Build an Array With Stack Operations using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Build an Array With Stack Operations - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Build%20an%20Array%20With%20Stack%20Operations"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean buildAnArrayWithStackOperations(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean buildAnArrayWithStackOperations(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean buildAnArrayWithStackOperations(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean buildAnArrayWithStackOperations(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean buildAnArrayWithStackOperations(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Crawler Log Folder",
      "difficulty": "Hard",
      "subpattern": "parsing",
      "question": "Solve Crawler Log Folder using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Crawler Log Folder - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Crawler%20Log%20Folder"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean crawlerLogFolder(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean crawlerLogFolder(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean crawlerLogFolder(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean crawlerLogFolder(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean crawlerLogFolder(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Final Prices With a Special Discount",
      "difficulty": "Hard",
      "subpattern": "expression evaluation",
      "question": "Solve Final Prices With a Special Discount using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes expression evaluation and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for expression evaluation and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Final Prices With a Special Discount - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Final%20Prices%20With%20a%20Special%20Discount"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean finalPricesWithASpecialDiscount(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean finalPricesWithASpecialDiscount(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean finalPricesWithASpecialDiscount(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean finalPricesWithASpecialDiscount(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean finalPricesWithASpecialDiscount(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Minimum Add to Make Parentheses Valid",
      "difficulty": "Hard",
      "subpattern": "intervals.",
      "question": "Solve Minimum Add to Make Parentheses Valid using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes intervals. and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for intervals. and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Minimum Add to Make Parentheses Valid - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Minimum%20Add%20to%20Make%20Parentheses%20Valid"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean minimumAddToMakeParenthesesValid(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean minimumAddToMakeParenthesesValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean minimumAddToMakeParenthesesValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean minimumAddToMakeParenthesesValid(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean minimumAddToMakeParenthesesValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Number of Visible People in a Queue",
      "difficulty": "Hard",
      "subpattern": "Monotonic stack",
      "question": "Solve Number of Visible People in a Queue using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes monotonic stack and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for monotonic stack and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Number of Visible People in a Queue - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Number%20of%20Visible%20People%20in%20a%20Queue"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean numberOfVisiblePeopleInAQueue(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean numberOfVisiblePeopleInAQueue(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean numberOfVisiblePeopleInAQueue(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean numberOfVisiblePeopleInAQueue(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean numberOfVisiblePeopleInAQueue(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
    },
    {
      "group": "practice",
      "name": "Create Maximum Number",
      "difficulty": "Hard",
      "subpattern": "parsing",
      "question": "Solve Create Maximum Number using the Stack pattern. Return the required result while respecting the usual LeetCode constraints for this problem family.",
      "trigger": "Use Stack when the input structure exposes parsing and a direct scan would repeat the same decision work.",
      "intuition": "Keep the smallest correct state for parsing and update it at each decision boundary.",
      "edgeCases": "Empty input where allowed, single element, duplicate-heavy values, boundary indexes, negative values when the problem permits them, and maximum constraint size.",
      "constraints": "Use the standard constraints for this LeetCode-style problem; choose O(n), O(log n), O(n log n), or state-space DP based on the pattern trigger.",
      "source": {
        "label": "Create Maximum Number - LeetCode/GFG-style reference",
        "url": "https://leetcode.com/problemset/?search=Create%20Maximum%20Number"
      },
      "examples": [
        {
          "input": "input = \"({[]})\"",
          "output": "true",
          "explanation": "Every closer matches the top opener."
        },
        {
          "input": "input = \"([)]\"",
          "output": "false",
          "explanation": "The stack top does not match the closer."
        },
        {
          "input": "input = \"\"",
          "output": "true",
          "explanation": "No unmatched tokens remain."
        }
      ],
      "bruteForceComplexity": "Time O(n^2) to O(n^3) depending on direct enumeration; Space O(1) to O(n) for helper state.",
      "optimizedComplexity": "Time follows the pattern target, commonly O(log n), O(n), O(n log n), or O(V + E); Space is the maintained state.",
      "recursiveComplexity": "Time matches the recursive state traversal; Space includes O(depth) recursion stack plus memo/state when used.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean createMaximumNumber(String s) {\n    while (s.contains(\"()\") || s.contains(\"[]\") || s.contains(\"{}\")) {\n      s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");\n    }\n    return s.isEmpty();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean createMaximumNumber(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean createMaximumNumber(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean createMaximumNumber(String s) {\n    return scan(s, 0, new ArrayDeque<>());\n  }\n\n  private boolean scan(String s, int index, Deque<Character> stack) {\n    if (index == s.length()) return stack.isEmpty();\n    char c = s.charAt(index);\n    if (c == '(' || c == '[' || c == '{') stack.push(c);\n    else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    return scan(s, index + 1, stack);\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean createMaximumNumber(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n      if (c == '(' || c == '[' || c == '{') stack.push(c);\n      else if (stack.isEmpty() || !matches(stack.pop(), c)) return false;\n    }\n    return stack.isEmpty();\n  }\n\n  private boolean matches(char open, char close) {\n    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');\n  }\n}"
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
