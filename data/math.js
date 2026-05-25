const CURRENT_PATTERN = {
  "id": "math",
  "name": "Math & Number Theory",
  "summary": "Use divisibility, modular arithmetic, GCD, primes, digit math, base conversion, combinatorics, and binary-search-on-answer for numeric problems.",
  "complete": true,
  "subpatterns": [
    "Modulo divisibility classification",
    "Sieve of Eratosthenes",
    "Prime factor reduction",
    "Three-prime pointer generation",
    "Digit square cycle detection",
    "Decimal carry propagation",
    "Binary carry addition",
    "Grade-school multiplication",
    "Fast exponentiation",
    "Integer square root search",
    "Base-26 decoding",
    "Base-26 encoding",
    "Digit reversal overflow guard",
    "Half-number palindrome",
    "Greedy numeral decomposition",
    "Subtractive numeral parsing",
    "Euclidean gcd string divisibility",
    "Bezout reachability",
    "Remainder cycle detection",
    "Arithmetic expression sign stack",
    "Factorial number system",
    "Pascal row combinatorics",
    "Digit place contribution",
    "Factor multiplicity counting",
    "Square root boundary test",
    "Power digit signature",
    "LCM parity reflection",
    "Logarithmic trial counting",
    "Modular exponentiation",
    "LCM binary search counting"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Fizz Buzz",
      "difficulty": "Easy",
      "subpattern": "Modulo divisibility classification",
      "question": "Given an integer n, return a 1-indexed list from 1 to n where multiples of 3 are Fizz, multiples of 5 are Buzz, and multiples of both are FizzBuzz.",
      "trigger": "The output for each number is decided only by divisibility remainders modulo 3 and 5.",
      "intuition": "Check divisibility in the order 15, 3, 5, otherwise use the number itself.",
      "edgeCases": "n is 1, multiples of only 3, multiples of only 5, multiples of 15, largest n with many strings.",
      "constraints": "1 <= n <= 10000.",
      "source": {
        "label": "Fizz Buzz - LeetCode 412",
        "url": "https://leetcode.com/problems/fizz-buzz/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "[\"1\",\"2\",\"Fizz\"]",
          "explanation": "3 is divisible by 3."
        },
        {
          "input": "n = 5",
          "output": "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]",
          "explanation": "5 is divisible by 5."
        },
        {
          "input": "n = 15",
          "output": "... \"FizzBuzz\" at position 15",
          "explanation": "15 is divisible by both 3 and 5."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Test divisibility with modulo for every number.",
      "optimizedComplexity": "Time O(n); Space O(n). Reuse countdown counters instead of repeated modulo checks.",
      "recursiveComplexity": "Time O(n); Space O(n) output plus O(n) call stack. Build answers one index at a time.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fizzBuzz(int n) {\n    List<String> answer = new ArrayList<>();\n    for (int value = 1; value <= n; value++) {\n      if (value % 15 == 0) answer.add(\"FizzBuzz\");\n      else if (value % 3 == 0) answer.add(\"Fizz\");\n      else if (value % 5 == 0) answer.add(\"Buzz\");\n      else answer.add(String.valueOf(value));\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fizzBuzz(int n) {\n    List<String> answer = new ArrayList<>();\n    int fizz = 3;\n    int buzz = 5;\n    for (int value = 1; value <= n; value++) {\n      fizz--;\n      buzz--;\n      if (fizz == 0 && buzz == 0) answer.add(\"FizzBuzz\");\n      else if (fizz == 0) answer.add(\"Fizz\");\n      else if (buzz == 0) answer.add(\"Buzz\");\n      else answer.add(String.valueOf(value));\n      if (fizz == 0) fizz = 3;\n      if (buzz == 0) buzz = 5;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fizzBuzz(int n) {\n    List<String> answer = new ArrayList<>();\n    build(1, n, answer);\n    return answer;\n  }\n\n  private void build(int value, int n, List<String> answer) {\n    if (value > n) return;\n    if (value % 15 == 0) answer.add(\"FizzBuzz\");\n    else if (value % 3 == 0) answer.add(\"Fizz\");\n    else if (value % 5 == 0) answer.add(\"Buzz\");\n    else answer.add(String.valueOf(value));\n    build(value + 1, n, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> fizzBuzz(int n) {\n    List<String> answer = new ArrayList<>();\n    int fizz = 3;\n    int buzz = 5;\n    for (int value = 1; value <= n; value++) {\n      fizz--;\n      buzz--;\n      if (fizz == 0 && buzz == 0) answer.add(\"FizzBuzz\");\n      else if (fizz == 0) answer.add(\"Fizz\");\n      else if (buzz == 0) answer.add(\"Buzz\");\n      else answer.add(String.valueOf(value));\n      if (fizz == 0) fizz = 3;\n      if (buzz == 0) buzz = 5;\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> fizzBuzz(int n) {\n    List<String> answer = new ArrayList<>();\n    int fizz = 3;\n    int buzz = 5;\n    for (int value = 1; value <= n; value++) {\n      fizz--;\n      buzz--;\n      if (fizz == 0 && buzz == 0) answer.add(\"FizzBuzz\");\n      else if (fizz == 0) answer.add(\"Fizz\");\n      else if (buzz == 0) answer.add(\"Buzz\");\n      else answer.add(String.valueOf(value));\n      if (fizz == 0) fizz = 3;\n      if (buzz == 0) buzz = 5;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Count Primes",
      "difficulty": "Medium",
      "subpattern": "Sieve of Eratosthenes",
      "question": "Given an integer n, return the number of prime numbers strictly less than n.",
      "trigger": "Repeated primality checks share multiples; marking composites once avoids duplicated divisibility work.",
      "intuition": "Start from each prime p and mark multiples from p * p because smaller multiples were already marked.",
      "edgeCases": "n <= 2, n is prime, n is composite, small limits, large n where O(n sqrt n) is too slow.",
      "constraints": "0 <= n <= 5000000.",
      "source": {
        "label": "Count Primes - LeetCode 204",
        "url": "https://leetcode.com/problems/count-primes/"
      },
      "examples": [
        {
          "input": "n = 10",
          "output": "4",
          "explanation": "The primes below 10 are 2, 3, 5, and 7."
        },
        {
          "input": "n = 0",
          "output": "0",
          "explanation": "There are no positive primes below 0."
        },
        {
          "input": "n = 3",
          "output": "1",
          "explanation": "Only 2 is strictly below 3."
        }
      ],
      "bruteForceComplexity": "Time O(n sqrt n); Space O(1). Check each candidate by trial division.",
      "optimizedComplexity": "Time O(n log log n); Space O(n). Sieve marks composite multiples once per prime.",
      "recursiveComplexity": "Time O(n sqrt n); Space O(n) call stack in the scan. Recursively scans candidates and divisors.",
      "bruteForceCode": "class Solution {\n  public int countPrimes(int n) {\n    int count = 0;\n    for (int value = 2; value < n; value++) {\n      if (isPrime(value)) count++;\n    }\n    return count;\n  }\n\n  private boolean isPrime(int value) {\n    for (int divisor = 2; divisor * divisor <= value; divisor++) {\n      if (value % divisor == 0) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int countPrimes(int n) {\n    if (n <= 2) return 0;\n    boolean[] composite = new boolean[n];\n    for (int value = 2; (long) value * value < n; value++) {\n      if (composite[value]) continue;\n      for (long multiple = (long) value * value; multiple < n; multiple += value) {\n        composite[(int) multiple] = true;\n      }\n    }\n\n    int count = 0;\n    for (int value = 2; value < n; value++) {\n      if (!composite[value]) count++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countPrimes(int n) {\n    return scan(2, n);\n  }\n\n  private int scan(int value, int n) {\n    if (value >= n) return 0;\n    return (isPrime(value, 2) ? 1 : 0) + scan(value + 1, n);\n  }\n\n  private boolean isPrime(int value, int divisor) {\n    if ((long) divisor * divisor > value) return true;\n    if (value % divisor == 0) return false;\n    return isPrime(value, divisor + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countPrimes(int n) {\n    if (n <= 2) return 0;\n    boolean[] composite = new boolean[n];\n    for (int value = 2; (long) value * value < n; value++) {\n      if (composite[value]) continue;\n      for (long multiple = (long) value * value; multiple < n; multiple += value) {\n        composite[(int) multiple] = true;\n      }\n    }\n\n    int count = 0;\n    for (int value = 2; value < n; value++) {\n      if (!composite[value]) count++;\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  public int countPrimes(int n) {\n    if (n <= 2) return 0;\n    boolean[] composite = new boolean[n];\n    for (int value = 2; (long) value * value < n; value++) {\n      if (composite[value]) continue;\n      for (long multiple = (long) value * value; multiple < n; multiple += value) {\n        composite[(int) multiple] = true;\n      }\n    }\n\n    int count = 0;\n    for (int value = 2; value < n; value++) {\n      if (!composite[value]) count++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Ugly Number",
      "difficulty": "Easy",
      "subpattern": "Prime factor reduction",
      "question": "Given an integer n, return true if n is positive and its only prime factors are 2, 3, and 5.",
      "trigger": "The definition is entirely about removing allowed prime factors until no more division is possible.",
      "intuition": "Divide by 2, 3, and 5 repeatedly; a valid ugly number reduces exactly to 1.",
      "edgeCases": "n <= 0, n is 1, n contains factor 7, n is a high power of 2, n has mixed allowed factors.",
      "constraints": "-2147483648 <= n <= 2147483647.",
      "source": {
        "label": "Ugly Number - LeetCode 263",
        "url": "https://leetcode.com/problems/ugly-number/"
      },
      "examples": [
        {
          "input": "n = 6",
          "output": "true",
          "explanation": "6 = 2 * 3."
        },
        {
          "input": "n = 1",
          "output": "true",
          "explanation": "1 has no prime factors and is considered ugly."
        },
        {
          "input": "n = 14",
          "output": "false",
          "explanation": "14 contains prime factor 7."
        }
      ],
      "bruteForceComplexity": "Time O(sqrt n) after factorization; Space O(1). Test prime factors directly.",
      "optimizedComplexity": "Time O(log n); Space O(1). Repeatedly divide only by 2, 3, and 5.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive division removes one allowed factor at a time.",
      "bruteForceCode": "class Solution {\n  public boolean isUgly(int n) {\n    if (n <= 0) return false;\n    for (int factor = 2; factor * factor <= n; factor++) {\n      while (n % factor == 0) {\n        if (factor != 2 && factor != 3 && factor != 5) return false;\n        n /= factor;\n      }\n    }\n    return n == 1 || n == 2 || n == 3 || n == 5;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isUgly(int n) {\n    if (n <= 0) return false;\n    int[] allowed = {2, 3, 5};\n    for (int factor : allowed) {\n      while (n % factor == 0) {\n        n /= factor;\n      }\n    }\n    return n == 1;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isUgly(int n) {\n    if (n <= 0) return false;\n    return reduce(n) == 1;\n  }\n\n  private int reduce(int n) {\n    if (n == 1) return 1;\n    if (n % 2 == 0) return reduce(n / 2);\n    if (n % 3 == 0) return reduce(n / 3);\n    if (n % 5 == 0) return reduce(n / 5);\n    return n;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isUgly(int n) {\n    if (n <= 0) return false;\n    int[] allowed = {2, 3, 5};\n    for (int factor : allowed) {\n      while (n % factor == 0) {\n        n /= factor;\n      }\n    }\n    return n == 1;\n  }\n}",
      "code": "class Solution {\n  public boolean isUgly(int n) {\n    if (n <= 0) return false;\n    int[] allowed = {2, 3, 5};\n    for (int factor : allowed) {\n      while (n % factor == 0) {\n        n /= factor;\n      }\n    }\n    return n == 1;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Ugly Number II",
      "difficulty": "Medium",
      "subpattern": "Three-prime pointer generation",
      "question": "Given an integer n, return the nth positive ugly number whose prime factors are limited to 2, 3, and 5.",
      "trigger": "The sequence is generated by multiplying earlier ugly numbers by 2, 3, and 5 and always taking the next minimum.",
      "intuition": "Maintain three pointers for the next candidate multiple of 2, 3, and 5; advance every pointer that matches the chosen value.",
      "edgeCases": "n is 1, duplicate candidates like 6 from 2*3 and 3*2, large n, pointer ties, integer range near the 1690th value.",
      "constraints": "1 <= n <= 1690.",
      "source": {
        "label": "Ugly Number II - LeetCode 264",
        "url": "https://leetcode.com/problems/ugly-number-ii/"
      },
      "examples": [
        {
          "input": "n = 10",
          "output": "12",
          "explanation": "The first ten ugly numbers end with 12."
        },
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "The first ugly number is 1."
        },
        {
          "input": "n = 15",
          "output": "24",
          "explanation": "The generated sequence reaches 24 at position 15."
        }
      ],
      "bruteForceComplexity": "Time O(answer log answer); Space O(1). Scan positive integers and test ugliness.",
      "optimizedComplexity": "Time O(n); Space O(n). Three pointers generate the sequence without gaps or duplicates.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive helper fills the DP array one ugly number per call.",
      "bruteForceCode": "class Solution {\n  public int nthUglyNumber(int n) {\n    int value = 0;\n    int count = 0;\n    while (count < n) {\n      value++;\n      if (isUgly(value)) count++;\n    }\n    return value;\n  }\n\n  private boolean isUgly(int value) {\n    int[] factors = {2, 3, 5};\n    for (int factor : factors) {\n      while (value % factor == 0) value /= factor;\n    }\n    return value == 1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int nthUglyNumber(int n) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    int i2 = 0;\n    int i3 = 0;\n    int i5 = 0;\n\n    for (int index = 1; index < n; index++) {\n      int next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));\n      ugly[index] = next;\n      if (next == ugly[i2] * 2) i2++;\n      if (next == ugly[i3] * 3) i3++;\n      if (next == ugly[i5] * 5) i5++;\n    }\n    return ugly[n - 1];\n  }\n}",
      "recursiveCode": "class Solution {\n  public int nthUglyNumber(int n) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    fill(ugly, 1, 0, 0, 0);\n    return ugly[n - 1];\n  }\n\n  private void fill(int[] ugly, int index, int i2, int i3, int i5) {\n    if (index == ugly.length) return;\n    int next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));\n    ugly[index] = next;\n    if (next == ugly[i2] * 2) i2++;\n    if (next == ugly[i3] * 3) i3++;\n    if (next == ugly[i5] * 5) i5++;\n    fill(ugly, index + 1, i2, i3, i5);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int nthUglyNumber(int n) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    int i2 = 0;\n    int i3 = 0;\n    int i5 = 0;\n\n    for (int index = 1; index < n; index++) {\n      int next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));\n      ugly[index] = next;\n      if (next == ugly[i2] * 2) i2++;\n      if (next == ugly[i3] * 3) i3++;\n      if (next == ugly[i5] * 5) i5++;\n    }\n    return ugly[n - 1];\n  }\n}",
      "code": "class Solution {\n  public int nthUglyNumber(int n) {\n    int[] ugly = new int[n];\n    ugly[0] = 1;\n    int i2 = 0;\n    int i3 = 0;\n    int i5 = 0;\n\n    for (int index = 1; index < n; index++) {\n      int next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));\n      ugly[index] = next;\n      if (next == ugly[i2] * 2) i2++;\n      if (next == ugly[i3] * 3) i3++;\n      if (next == ugly[i5] * 5) i5++;\n    }\n    return ugly[n - 1];\n  }\n}"
    },
    {
      "group": "core",
      "name": "Happy Number",
      "difficulty": "Easy",
      "subpattern": "Digit square cycle detection",
      "question": "Given an integer n, repeatedly replace it by the sum of squares of its digits. Return true if the process reaches 1.",
      "trigger": "The digit-square transform creates a finite state process, so non-happy numbers eventually cycle.",
      "intuition": "Detect whether the sequence reaches 1 or falls into a repeated state.",
      "edgeCases": "n is 1, n quickly reaches 1, n enters a cycle, numbers with zeros, large positive n.",
      "constraints": "1 <= n <= 2147483647.",
      "source": {
        "label": "Happy Number - LeetCode 202",
        "url": "https://leetcode.com/problems/happy-number/"
      },
      "examples": [
        {
          "input": "n = 19",
          "output": "true",
          "explanation": "19 eventually reaches 1."
        },
        {
          "input": "n = 2",
          "output": "false",
          "explanation": "2 enters a cycle that does not include 1."
        },
        {
          "input": "n = 1",
          "output": "true",
          "explanation": "The process is already at 1."
        }
      ],
      "bruteForceComplexity": "Time O(k log n); Space O(k). Store every seen state until reaching 1 or a cycle.",
      "optimizedComplexity": "Time O(k log n); Space O(1). Floyd cycle detection uses slow and fast transforms.",
      "recursiveComplexity": "Time O(k log n); Space O(k). Recursive DFS stores seen states.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean isHappy(int n) {\n    Set<Integer> seen = new HashSet<>();\n    while (n != 1 && !seen.contains(n)) {\n      seen.add(n);\n      n = digitSquareSum(n);\n    }\n    return n == 1;\n  }\n\n  private int digitSquareSum(int value) {\n    int sum = 0;\n    while (value > 0) {\n      int digit = value % 10;\n      sum += digit * digit;\n      value /= 10;\n    }\n    return sum;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isHappy(int n) {\n    int slow = n;\n    int fast = digitSquareSum(n);\n    while (fast != 1 && slow != fast) {\n      slow = digitSquareSum(slow);\n      fast = digitSquareSum(digitSquareSum(fast));\n    }\n    return fast == 1;\n  }\n\n  private int digitSquareSum(int value) {\n    int sum = 0;\n    while (value > 0) {\n      int digit = value % 10;\n      sum += digit * digit;\n      value /= 10;\n    }\n    return sum;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean isHappy(int n) {\n    return search(n, new HashSet<>());\n  }\n\n  private boolean search(int value, Set<Integer> seen) {\n    if (value == 1) return true;\n    if (!seen.add(value)) return false;\n    return search(digitSquareSum(value), seen);\n  }\n\n  private int digitSquareSum(int value) {\n    int sum = 0;\n    while (value > 0) {\n      int digit = value % 10;\n      sum += digit * digit;\n      value /= 10;\n    }\n    return sum;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isHappy(int n) {\n    int slow = n;\n    int fast = digitSquareSum(n);\n    while (fast != 1 && slow != fast) {\n      slow = digitSquareSum(slow);\n      fast = digitSquareSum(digitSquareSum(fast));\n    }\n    return fast == 1;\n  }\n\n  private int digitSquareSum(int value) {\n    int sum = 0;\n    while (value > 0) {\n      int digit = value % 10;\n      sum += digit * digit;\n      value /= 10;\n    }\n    return sum;\n  }\n}",
      "code": "class Solution {\n  public boolean isHappy(int n) {\n    int slow = n;\n    int fast = digitSquareSum(n);\n    while (fast != 1 && slow != fast) {\n      slow = digitSquareSum(slow);\n      fast = digitSquareSum(digitSquareSum(fast));\n    }\n    return fast == 1;\n  }\n\n  private int digitSquareSum(int value) {\n    int sum = 0;\n    while (value > 0) {\n      int digit = value % 10;\n      sum += digit * digit;\n      value /= 10;\n    }\n    return sum;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Plus One",
      "difficulty": "Easy",
      "subpattern": "Decimal carry propagation",
      "question": "Given a non-empty array of digits representing a non-negative integer, add one and return the resulting digits.",
      "trigger": "The operation is decimal addition with carry propagation from the least significant digit.",
      "intuition": "Walk from right to left; stop as soon as a digit below 9 absorbs the carry.",
      "edgeCases": "Last digit below 9, all digits are 9, single digit 0, leading digit carry creates new length, long digit array.",
      "constraints": "1 <= digits.length <= 100; 0 <= digits[i] <= 9; digits has no leading zero unless the number is 0.",
      "source": {
        "label": "Plus One - LeetCode 66",
        "url": "https://leetcode.com/problems/plus-one/"
      },
      "examples": [
        {
          "input": "digits = [1,2,3]",
          "output": "[1,2,4]",
          "explanation": "123 + 1 = 124."
        },
        {
          "input": "digits = [4,3,2,1]",
          "output": "[4,3,2,2]",
          "explanation": "4321 + 1 = 4322."
        },
        {
          "input": "digits = [9]",
          "output": "[1,0]",
          "explanation": "A new leading carry is needed."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Convert through arbitrary precision decimal arithmetic.",
      "optimizedComplexity": "Time O(n); Space O(1) unless a new array is required. Propagate carry in place.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively carries from the last digit toward the front.",
      "bruteForceCode": "import java.math.*;\n\nclass Solution {\n  public int[] plusOne(int[] digits) {\n    StringBuilder number = new StringBuilder();\n    for (int digit : digits) number.append(digit);\n    String value = new BigInteger(number.toString()).add(BigInteger.ONE).toString();\n\n    int[] answer = new int[value.length()];\n    for (int i = 0; i < value.length(); i++) answer[i] = value.charAt(i) - '0';\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] plusOne(int[] digits) {\n    for (int i = digits.length - 1; i >= 0; i--) {\n      if (digits[i] < 9) {\n        digits[i]++;\n        return digits;\n      }\n      digits[i] = 0;\n    }\n\n    int[] answer = new int[digits.length + 1];\n    answer[0] = 1;\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] plusOne(int[] digits) {\n    int carry = add(digits, digits.length - 1, 1);\n    if (carry == 0) return digits;\n    int[] answer = new int[digits.length + 1];\n    answer[0] = carry;\n    return answer;\n  }\n\n  private int add(int[] digits, int index, int carry) {\n    if (index < 0 || carry == 0) return carry;\n    int sum = digits[index] + carry;\n    digits[index] = sum % 10;\n    return add(digits, index - 1, sum / 10);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] plusOne(int[] digits) {\n    for (int i = digits.length - 1; i >= 0; i--) {\n      if (digits[i] < 9) {\n        digits[i]++;\n        return digits;\n      }\n      digits[i] = 0;\n    }\n\n    int[] answer = new int[digits.length + 1];\n    answer[0] = 1;\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[] plusOne(int[] digits) {\n    for (int i = digits.length - 1; i >= 0; i--) {\n      if (digits[i] < 9) {\n        digits[i]++;\n        return digits;\n      }\n      digits[i] = 0;\n    }\n\n    int[] answer = new int[digits.length + 1];\n    answer[0] = 1;\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Add Binary",
      "difficulty": "Easy",
      "subpattern": "Binary carry addition",
      "question": "Given two binary strings a and b, return their sum as a binary string.",
      "trigger": "Binary addition uses the same carry propagation as decimal addition, but base 2.",
      "intuition": "Read both strings from right to left, add bits and carry, append sum modulo 2.",
      "edgeCases": "Different lengths, final carry, both strings are 0, long strings, many consecutive carries.",
      "constraints": "1 <= a.length, b.length <= 10000; a and b contain only 0 or 1 and have no leading zeros except \"0\".",
      "source": {
        "label": "Add Binary - LeetCode 67",
        "url": "https://leetcode.com/problems/add-binary/"
      },
      "examples": [
        {
          "input": "a = \"11\", b = \"1\"",
          "output": "\"100\"",
          "explanation": "3 + 1 = 4."
        },
        {
          "input": "a = \"1010\", b = \"1011\"",
          "output": "\"10101\"",
          "explanation": "10 + 11 = 21."
        },
        {
          "input": "a = \"0\", b = \"0\"",
          "output": "\"0\"",
          "explanation": "No carry is produced."
        }
      ],
      "bruteForceComplexity": "Time O(n + m); Space O(n + m). Arbitrary precision conversion handles the addition.",
      "optimizedComplexity": "Time O(n + m); Space O(n + m). Manual two-pointer carry addition.",
      "recursiveComplexity": "Time O(n + m); Space O(n + m). Recursion consumes one binary digit from each string per call.",
      "bruteForceCode": "import java.math.*;\n\nclass Solution {\n  public String addBinary(String a, String b) {\n    BigInteger left = new BigInteger(a, 2);\n    BigInteger right = new BigInteger(b, 2);\n    return left.add(right).toString(2);\n  }\n}",
      "iterativeCode": "class Solution {\n  public String addBinary(String a, String b) {\n    StringBuilder answer = new StringBuilder();\n    int i = a.length() - 1;\n    int j = b.length() - 1;\n    int carry = 0;\n\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += a.charAt(i--) - '0';\n      if (j >= 0) sum += b.charAt(j--) - '0';\n      answer.append(sum % 2);\n      carry = sum / 2;\n    }\n    return answer.reverse().toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String addBinary(String a, String b) {\n    StringBuilder reversed = new StringBuilder();\n    add(a, a.length() - 1, b, b.length() - 1, 0, reversed);\n    return reversed.reverse().toString();\n  }\n\n  private void add(String a, int i, String b, int j, int carry, StringBuilder reversed) {\n    if (i < 0 && j < 0 && carry == 0) return;\n    int sum = carry;\n    if (i >= 0) sum += a.charAt(i) - '0';\n    if (j >= 0) sum += b.charAt(j) - '0';\n    reversed.append(sum % 2);\n    add(a, i - 1, b, j - 1, sum / 2, reversed);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String addBinary(String a, String b) {\n    StringBuilder answer = new StringBuilder();\n    int i = a.length() - 1;\n    int j = b.length() - 1;\n    int carry = 0;\n\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += a.charAt(i--) - '0';\n      if (j >= 0) sum += b.charAt(j--) - '0';\n      answer.append(sum % 2);\n      carry = sum / 2;\n    }\n    return answer.reverse().toString();\n  }\n}",
      "code": "class Solution {\n  public String addBinary(String a, String b) {\n    StringBuilder answer = new StringBuilder();\n    int i = a.length() - 1;\n    int j = b.length() - 1;\n    int carry = 0;\n\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += a.charAt(i--) - '0';\n      if (j >= 0) sum += b.charAt(j--) - '0';\n      answer.append(sum % 2);\n      carry = sum / 2;\n    }\n    return answer.reverse().toString();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Multiply Strings",
      "difficulty": "Medium",
      "subpattern": "Grade-school multiplication",
      "question": "Given two non-negative integers as strings, return their product as a string without using built-in big integer conversion.",
      "trigger": "Each digit pair contributes to a fixed decimal place exactly like grade-school multiplication.",
      "intuition": "Store digit products in an array of length m + n and carry from right to left.",
      "edgeCases": "One input is 0, single-digit multiplication, many carries, different lengths, leading zero removal.",
      "constraints": "1 <= num1.length, num2.length <= 200; num1 and num2 contain digits only and have no leading zero except \"0\".",
      "source": {
        "label": "Multiply Strings - LeetCode 43",
        "url": "https://leetcode.com/problems/multiply-strings/"
      },
      "examples": [
        {
          "input": "num1 = \"2\", num2 = \"3\"",
          "output": "\"6\"",
          "explanation": "Single digit multiplication."
        },
        {
          "input": "num1 = \"123\", num2 = \"456\"",
          "output": "\"56088\"",
          "explanation": "Grade-school multiplication produces 56088."
        },
        {
          "input": "num1 = \"0\", num2 = \"52\"",
          "output": "\"0\"",
          "explanation": "Any number multiplied by 0 is 0."
        }
      ],
      "bruteForceComplexity": "Time O(mn + n result length); Space O(m + n). Build and add one shifted row per multiplier digit.",
      "optimizedComplexity": "Time O(mn); Space O(m + n). Accumulate all digit products directly into place buckets.",
      "recursiveComplexity": "Time O(mn); Space O(m + n). Recursively adds shifted digit rows.",
      "bruteForceCode": "class Solution {\n  public String multiply(String num1, String num2) {\n    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";\n    String result = \"0\";\n    int zeros = 0;\n    for (int i = num2.length() - 1; i >= 0; i--) {\n      String row = multiplyByDigit(num1, num2.charAt(i) - '0', zeros++);\n      result = add(result, row);\n    }\n    return result;\n  }\n\n  private String multiplyByDigit(String num, int digit, int zeros) {\n    StringBuilder row = new StringBuilder();\n    for (int i = 0; i < zeros; i++) row.append('0');\n    int carry = 0;\n    for (int i = num.length() - 1; i >= 0; i--) {\n      int product = (num.charAt(i) - '0') * digit + carry;\n      row.append(product % 10);\n      carry = product / 10;\n    }\n    if (carry > 0) row.append(carry);\n    return row.reverse().toString();\n  }\n\n  private String add(String a, String b) {\n    StringBuilder result = new StringBuilder();\n    int i = a.length() - 1, j = b.length() - 1, carry = 0;\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += a.charAt(i--) - '0';\n      if (j >= 0) sum += b.charAt(j--) - '0';\n      result.append(sum % 10);\n      carry = sum / 10;\n    }\n    return result.reverse().toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  public String multiply(String num1, String num2) {\n    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";\n    int[] product = new int[num1.length() + num2.length()];\n\n    for (int i = num1.length() - 1; i >= 0; i--) {\n      for (int j = num2.length() - 1; j >= 0; j--) {\n        int value = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');\n        int sum = value + product[i + j + 1];\n        product[i + j + 1] = sum % 10;\n        product[i + j] += sum / 10;\n      }\n    }\n\n    StringBuilder answer = new StringBuilder();\n    int index = 0;\n    while (index < product.length && product[index] == 0) index++;\n    while (index < product.length) answer.append(product[index++]);\n    return answer.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String multiply(String num1, String num2) {\n    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";\n    return multiplyRows(num1, num2, num2.length() - 1, 0, \"0\");\n  }\n\n  private String multiplyRows(String num1, String num2, int index, int zeros, String result) {\n    if (index < 0) return result;\n    String row = multiplyByDigit(num1, num2.charAt(index) - '0', zeros);\n    return multiplyRows(num1, num2, index - 1, zeros + 1, add(result, row));\n  }\n\n  private String multiplyByDigit(String num, int digit, int zeros) {\n    StringBuilder row = new StringBuilder();\n    for (int i = 0; i < zeros; i++) row.append('0');\n    int carry = 0;\n    for (int i = num.length() - 1; i >= 0; i--) {\n      int product = (num.charAt(i) - '0') * digit + carry;\n      row.append(product % 10);\n      carry = product / 10;\n    }\n    if (carry > 0) row.append(carry);\n    return row.reverse().toString();\n  }\n\n  private String add(String a, String b) {\n    StringBuilder result = new StringBuilder();\n    int i = a.length() - 1, j = b.length() - 1, carry = 0;\n    while (i >= 0 || j >= 0 || carry != 0) {\n      int sum = carry;\n      if (i >= 0) sum += a.charAt(i--) - '0';\n      if (j >= 0) sum += b.charAt(j--) - '0';\n      result.append(sum % 10);\n      carry = sum / 10;\n    }\n    return result.reverse().toString();\n  }\n}",
      "optimizedCode": "class Solution {\n  public String multiply(String num1, String num2) {\n    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";\n    int[] product = new int[num1.length() + num2.length()];\n\n    for (int i = num1.length() - 1; i >= 0; i--) {\n      for (int j = num2.length() - 1; j >= 0; j--) {\n        int value = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');\n        int sum = value + product[i + j + 1];\n        product[i + j + 1] = sum % 10;\n        product[i + j] += sum / 10;\n      }\n    }\n\n    StringBuilder answer = new StringBuilder();\n    int index = 0;\n    while (index < product.length && product[index] == 0) index++;\n    while (index < product.length) answer.append(product[index++]);\n    return answer.toString();\n  }\n}",
      "code": "class Solution {\n  public String multiply(String num1, String num2) {\n    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";\n    int[] product = new int[num1.length() + num2.length()];\n\n    for (int i = num1.length() - 1; i >= 0; i--) {\n      for (int j = num2.length() - 1; j >= 0; j--) {\n        int value = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');\n        int sum = value + product[i + j + 1];\n        product[i + j + 1] = sum % 10;\n        product[i + j] += sum / 10;\n      }\n    }\n\n    StringBuilder answer = new StringBuilder();\n    int index = 0;\n    while (index < product.length && product[index] == 0) index++;\n    while (index < product.length) answer.append(product[index++]);\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "core",
      "name": "Pow(x, n)",
      "difficulty": "Medium",
      "subpattern": "Fast exponentiation",
      "question": "Implement pow(x, n), which calculates x raised to the integer power n.",
      "trigger": "Repeated multiplication can be compressed because x^n = (x^2)^(n/2) when n is even.",
      "intuition": "Use exponentiation by squaring and convert n to long before negating to handle Integer.MIN_VALUE.",
      "edgeCases": "n is 0, n is negative, n is Integer.MIN_VALUE, x is 0, x is 1 or -1.",
      "constraints": "-100.0 < x < 100.0; -2147483648 <= n <= 2147483647; result fits in double constraints.",
      "source": {
        "label": "Pow(x, n) - LeetCode 50",
        "url": "https://leetcode.com/problems/powx-n/"
      },
      "examples": [
        {
          "input": "x = 2.00000, n = 10",
          "output": "1024.00000",
          "explanation": "2 raised to 10 is 1024."
        },
        {
          "input": "x = 2.10000, n = 3",
          "output": "9.26100",
          "explanation": "Multiply 2.1 three times."
        },
        {
          "input": "x = 2.00000, n = -2",
          "output": "0.25000",
          "explanation": "Negative exponent returns reciprocal."
        }
      ],
      "bruteForceComplexity": "Time O(|n|); Space O(1). Multiply once per exponent step.",
      "optimizedComplexity": "Time O(log |n|); Space O(1). Exponentiation by squaring halves the exponent.",
      "recursiveComplexity": "Time O(log |n|); Space O(log |n|). Recursive squaring halves the exponent per call.",
      "bruteForceCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n    double answer = 1.0;\n    for (long i = 0; i < power; i++) answer *= x;\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power > 0) {\n      if ((power & 1L) == 1L) answer *= x;\n      x *= x;\n      power >>= 1;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) return 1.0 / fastPow(x, -power);\n    return fastPow(x, power);\n  }\n\n  private double fastPow(double x, long power) {\n    if (power == 0) return 1.0;\n    double half = fastPow(x, power / 2);\n    double result = half * half;\n    return power % 2 == 0 ? result : result * x;\n  }\n}",
      "optimizedCode": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power > 0) {\n      if ((power & 1L) == 1L) answer *= x;\n      x *= x;\n      power >>= 1;\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public double myPow(double x, int n) {\n    long power = n;\n    if (power < 0) {\n      x = 1.0 / x;\n      power = -power;\n    }\n\n    double answer = 1.0;\n    while (power > 0) {\n      if ((power & 1L) == 1L) answer *= x;\n      x *= x;\n      power >>= 1;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Sqrt(x)",
      "difficulty": "Easy",
      "subpattern": "Integer square root search",
      "question": "Given a non-negative integer x, return the integer square root of x rounded down.",
      "trigger": "The answer is the largest integer m such that m * m <= x, a monotonic predicate over integers.",
      "intuition": "Binary search the candidate root and use division or long multiplication to avoid overflow.",
      "edgeCases": "x is 0, x is 1, perfect square, non-perfect square, x near Integer.MAX_VALUE.",
      "constraints": "0 <= x <= 2147483647.",
      "source": {
        "label": "Sqrt(x) - LeetCode 69",
        "url": "https://leetcode.com/problems/sqrtx/"
      },
      "examples": [
        {
          "input": "x = 4",
          "output": "2",
          "explanation": "2 * 2 equals 4."
        },
        {
          "input": "x = 8",
          "output": "2",
          "explanation": "The real square root is 2.828, rounded down."
        },
        {
          "input": "x = 0",
          "output": "0",
          "explanation": "The square root of 0 is 0."
        }
      ],
      "bruteForceComplexity": "Time O(sqrt x); Space O(1). Increase candidate until its square is too large.",
      "optimizedComplexity": "Time O(log x); Space O(1). Binary search the monotonic square predicate.",
      "recursiveComplexity": "Time O(log x); Space O(log x). Recursive binary search stores call depth.",
      "bruteForceCode": "class Solution {\n  public int mySqrt(int x) {\n    long candidate = 0;\n    while ((candidate + 1) * (candidate + 1) <= x) {\n      candidate++;\n    }\n    return (int) candidate;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int mySqrt(int x) {\n    int left = 0;\n    int right = x;\n    int answer = 0;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if ((long) mid * mid <= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int mySqrt(int x) {\n    return search(x, 0, x, 0);\n  }\n\n  private int search(int x, int left, int right, int answer) {\n    if (left > right) return answer;\n    int mid = left + (right - left) / 2;\n    if ((long) mid * mid <= x) return search(x, mid + 1, right, mid);\n    return search(x, left, mid - 1, answer);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int mySqrt(int x) {\n    int left = 0;\n    int right = x;\n    int answer = 0;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if ((long) mid * mid <= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int mySqrt(int x) {\n    int left = 0;\n    int right = x;\n    int answer = 0;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if ((long) mid * mid <= x) {\n        answer = mid;\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Excel Sheet Column Number",
      "difficulty": "Easy",
      "subpattern": "Base-26 decoding",
      "question": "Given a string columnTitle representing an Excel column title, return its corresponding column number.",
      "trigger": "Excel titles are base-26 numbers with A mapped to 1 instead of 0.",
      "intuition": "Read left to right and update answer = answer * 26 + currentLetterValue.",
      "edgeCases": "Single letter, transition from Z to AA, long titles, repeated Z values, maximum integer result.",
      "constraints": "1 <= columnTitle.length <= 7; columnTitle contains uppercase English letters; result fits in a 32-bit signed integer.",
      "source": {
        "label": "Excel Sheet Column Number - LeetCode 171",
        "url": "https://leetcode.com/problems/excel-sheet-column-number/"
      },
      "examples": [
        {
          "input": "columnTitle = \"A\"",
          "output": "1",
          "explanation": "A maps to 1."
        },
        {
          "input": "columnTitle = \"AB\"",
          "output": "28",
          "explanation": "A contributes 26 and B contributes 2."
        },
        {
          "input": "columnTitle = \"ZY\"",
          "output": "701",
          "explanation": "Z * 26 + Y = 26 * 26 + 25."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Compute powers from right to left.",
      "optimizedComplexity": "Time O(n); Space O(1). Rolling base-26 accumulation.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive parser consumes one character per call.",
      "bruteForceCode": "class Solution {\n  public int titleToNumber(String columnTitle) {\n    int answer = 0;\n    int place = 1;\n    for (int i = columnTitle.length() - 1; i >= 0; i--) {\n      int value = columnTitle.charAt(i) - 'A' + 1;\n      answer += value * place;\n      place *= 26;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int titleToNumber(String columnTitle) {\n    int answer = 0;\n    for (int i = 0; i < columnTitle.length(); i++) {\n      int value = columnTitle.charAt(i) - 'A' + 1;\n      answer = answer * 26 + value;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int titleToNumber(String columnTitle) {\n    return parse(columnTitle, 0, 0);\n  }\n\n  private int parse(String title, int index, int value) {\n    if (index == title.length()) return value;\n    int digit = title.charAt(index) - 'A' + 1;\n    return parse(title, index + 1, value * 26 + digit);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int titleToNumber(String columnTitle) {\n    int answer = 0;\n    for (int i = 0; i < columnTitle.length(); i++) {\n      int value = columnTitle.charAt(i) - 'A' + 1;\n      answer = answer * 26 + value;\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int titleToNumber(String columnTitle) {\n    int answer = 0;\n    for (int i = 0; i < columnTitle.length(); i++) {\n      int value = columnTitle.charAt(i) - 'A' + 1;\n      answer = answer * 26 + value;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Excel Sheet Column Title",
      "difficulty": "Easy",
      "subpattern": "Base-26 encoding",
      "question": "Given a positive integer columnNumber, return its Excel column title.",
      "trigger": "This is base-26 conversion, but digits are 1-indexed, so each step subtracts 1 before taking modulo 26.",
      "intuition": "Convert from the end: decrement, map remainder to A-Z, divide by 26, then reverse.",
      "edgeCases": "columnNumber is 1, columnNumber is 26, transition to AA, repeated Z values, large values.",
      "constraints": "1 <= columnNumber <= 2147483647.",
      "source": {
        "label": "Excel Sheet Column Title - LeetCode 168",
        "url": "https://leetcode.com/problems/excel-sheet-column-title/"
      },
      "examples": [
        {
          "input": "columnNumber = 1",
          "output": "\"A\"",
          "explanation": "1 maps to A."
        },
        {
          "input": "columnNumber = 28",
          "output": "\"AB\"",
          "explanation": "28 is 26 + 2."
        },
        {
          "input": "columnNumber = 701",
          "output": "\"ZY\"",
          "explanation": "701 maps to ZY."
        }
      ],
      "bruteForceComplexity": "Time O(log26 n)^2; Space O(log26 n). Prepending shifts the builder each step.",
      "optimizedComplexity": "Time O(log26 n); Space O(log26 n). Append remainders and reverse once.",
      "recursiveComplexity": "Time O(log26 n); Space O(log26 n). Recursively emits higher-order title characters first.",
      "bruteForceCode": "class Solution {\n  public String convertToTitle(int columnNumber) {\n    StringBuilder title = new StringBuilder();\n    while (columnNumber > 0) {\n      columnNumber--;\n      char current = (char) ('A' + columnNumber % 26);\n      title.insert(0, current);\n      columnNumber /= 26;\n    }\n    return title.toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  public String convertToTitle(int columnNumber) {\n    StringBuilder reversed = new StringBuilder();\n    while (columnNumber > 0) {\n      columnNumber--;\n      reversed.append((char) ('A' + columnNumber % 26));\n      columnNumber /= 26;\n    }\n    return reversed.reverse().toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  public String convertToTitle(int columnNumber) {\n    StringBuilder answer = new StringBuilder();\n    build(columnNumber, answer);\n    return answer.toString();\n  }\n\n  private void build(int columnNumber, StringBuilder answer) {\n    if (columnNumber == 0) return;\n    columnNumber--;\n    build(columnNumber / 26, answer);\n    answer.append((char) ('A' + columnNumber % 26));\n  }\n}",
      "optimizedCode": "class Solution {\n  public String convertToTitle(int columnNumber) {\n    StringBuilder reversed = new StringBuilder();\n    while (columnNumber > 0) {\n      columnNumber--;\n      reversed.append((char) ('A' + columnNumber % 26));\n      columnNumber /= 26;\n    }\n    return reversed.reverse().toString();\n  }\n}",
      "code": "class Solution {\n  public String convertToTitle(int columnNumber) {\n    StringBuilder reversed = new StringBuilder();\n    while (columnNumber > 0) {\n      columnNumber--;\n      reversed.append((char) ('A' + columnNumber % 26));\n      columnNumber /= 26;\n    }\n    return reversed.reverse().toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Reverse Integer",
      "difficulty": "Medium",
      "subpattern": "Digit reversal overflow guard",
      "question": "Given a signed 32-bit integer x, return x with its digits reversed, or 0 if the reversed value overflows.",
      "trigger": "The number must be decomposed and rebuilt digit by digit while guarding 32-bit overflow.",
      "intuition": "Pop the last digit with modulo 10, push it into the result, and check overflow before multiplying by 10.",
      "edgeCases": "Negative number, trailing zeros, x is 0, reversed value overflows, x is Integer.MIN_VALUE.",
      "constraints": "-2147483648 <= x <= 2147483647.",
      "source": {
        "label": "Reverse Integer - LeetCode 7",
        "url": "https://leetcode.com/problems/reverse-integer/"
      },
      "examples": [
        {
          "input": "x = 123",
          "output": "321",
          "explanation": "Digits reverse normally."
        },
        {
          "input": "x = -123",
          "output": "-321",
          "explanation": "The sign is preserved."
        },
        {
          "input": "x = 1534236469",
          "output": "0",
          "explanation": "The reversed value exceeds 32-bit signed range."
        }
      ],
      "bruteForceComplexity": "Time O(d); Space O(d). Reverse the decimal string and parse with overflow check.",
      "optimizedComplexity": "Time O(d); Space O(1). Build the number digit by digit with integer overflow guards.",
      "recursiveComplexity": "Time O(d); Space O(d). Recursively moves digits into a long accumulator.",
      "bruteForceCode": "class Solution {\n  public int reverse(int x) {\n    long value = Math.abs((long) x);\n    String reversed = new StringBuilder(String.valueOf(value)).reverse().toString();\n    long answer = Long.parseLong(reversed);\n    if (x < 0) answer = -answer;\n    if (answer < Integer.MIN_VALUE || answer > Integer.MAX_VALUE) return 0;\n    return (int) answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int reverse(int x) {\n    int answer = 0;\n    while (x != 0) {\n      int digit = x % 10;\n      x /= 10;\n      if (answer > Integer.MAX_VALUE / 10 || answer < Integer.MIN_VALUE / 10) return 0;\n      if (answer == Integer.MAX_VALUE / 10 && digit > 7) return 0;\n      if (answer == Integer.MIN_VALUE / 10 && digit < -8) return 0;\n      answer = answer * 10 + digit;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int reverse(int x) {\n    long value = reverseDigits(Math.abs((long) x), 0L);\n    if (x < 0) value = -value;\n    if (value < Integer.MIN_VALUE || value > Integer.MAX_VALUE) return 0;\n    return (int) value;\n  }\n\n  private long reverseDigits(long value, long result) {\n    if (value == 0) return result;\n    return reverseDigits(value / 10, result * 10 + value % 10);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int reverse(int x) {\n    int answer = 0;\n    while (x != 0) {\n      int digit = x % 10;\n      x /= 10;\n      if (answer > Integer.MAX_VALUE / 10 || answer < Integer.MIN_VALUE / 10) return 0;\n      if (answer == Integer.MAX_VALUE / 10 && digit > 7) return 0;\n      if (answer == Integer.MIN_VALUE / 10 && digit < -8) return 0;\n      answer = answer * 10 + digit;\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int reverse(int x) {\n    int answer = 0;\n    while (x != 0) {\n      int digit = x % 10;\n      x /= 10;\n      if (answer > Integer.MAX_VALUE / 10 || answer < Integer.MIN_VALUE / 10) return 0;\n      if (answer == Integer.MAX_VALUE / 10 && digit > 7) return 0;\n      if (answer == Integer.MIN_VALUE / 10 && digit < -8) return 0;\n      answer = answer * 10 + digit;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Palindrome Number",
      "difficulty": "Easy",
      "subpattern": "Half-number palindrome",
      "question": "Given an integer x, return true if x reads the same forward and backward without converting sign.",
      "trigger": "A numeric palindrome can be checked by reversing only the last half of its digits.",
      "intuition": "Build the reversed suffix until it reaches or passes the remaining prefix.",
      "edgeCases": "Negative values, x is 0, values ending in 0, odd digit count, even digit count.",
      "constraints": "-2147483648 <= x <= 2147483647.",
      "source": {
        "label": "Palindrome Number - LeetCode 9",
        "url": "https://leetcode.com/problems/palindrome-number/"
      },
      "examples": [
        {
          "input": "x = 121",
          "output": "true",
          "explanation": "121 reads the same both ways."
        },
        {
          "input": "x = -121",
          "output": "false",
          "explanation": "The negative sign breaks the palindrome."
        },
        {
          "input": "x = 10",
          "output": "false",
          "explanation": "Numbers ending in 0 cannot be palindromes unless the number is 0."
        }
      ],
      "bruteForceComplexity": "Time O(d); Space O(d). Compare the decimal string from both ends.",
      "optimizedComplexity": "Time O(d); Space O(1). Reverse only half of the number.",
      "recursiveComplexity": "Time O(d); Space O(d). Recursively compares left and right character positions.",
      "bruteForceCode": "class Solution {\n  public boolean isPalindrome(int x) {\n    String value = String.valueOf(x);\n    int left = 0;\n    int right = value.length() - 1;\n    while (left < right) {\n      if (value.charAt(left++) != value.charAt(right--)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int reversedHalf = 0;\n    while (x > reversedHalf) {\n      reversedHalf = reversedHalf * 10 + x % 10;\n      x /= 10;\n    }\n    return x == reversedHalf || x == reversedHalf / 10;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isPalindrome(int x) {\n    String value = String.valueOf(x);\n    return compare(value, 0, value.length() - 1);\n  }\n\n  private boolean compare(String value, int left, int right) {\n    if (left >= right) return true;\n    if (value.charAt(left) != value.charAt(right)) return false;\n    return compare(value, left + 1, right - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int reversedHalf = 0;\n    while (x > reversedHalf) {\n      reversedHalf = reversedHalf * 10 + x % 10;\n      x /= 10;\n    }\n    return x == reversedHalf || x == reversedHalf / 10;\n  }\n}",
      "code": "class Solution {\n  public boolean isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int reversedHalf = 0;\n    while (x > reversedHalf) {\n      reversedHalf = reversedHalf * 10 + x % 10;\n      x /= 10;\n    }\n    return x == reversedHalf || x == reversedHalf / 10;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Integer to Roman",
      "difficulty": "Medium",
      "subpattern": "Greedy numeral decomposition",
      "question": "Given an integer num, convert it to a Roman numeral.",
      "trigger": "Roman numerals use fixed descending symbols including subtractive pairs, so greedily consuming the largest valid value works.",
      "intuition": "At each step append the largest Roman symbol whose value does not exceed the remaining number.",
      "edgeCases": "Values with 4 or 9 in a digit, minimum 1, maximum 3999, repeated symbols, multiple subtractive pairs.",
      "constraints": "1 <= num <= 3999.",
      "source": {
        "label": "Integer to Roman - LeetCode 12",
        "url": "https://leetcode.com/problems/integer-to-roman/"
      },
      "examples": [
        {
          "input": "num = 3",
          "output": "\"III\"",
          "explanation": "3 is three ones."
        },
        {
          "input": "num = 58",
          "output": "\"LVIII\"",
          "explanation": "50 + 5 + 3."
        },
        {
          "input": "num = 1994",
          "output": "\"MCMXCIV\"",
          "explanation": "1000 + 900 + 90 + 4."
        }
      ],
      "bruteForceComplexity": "Time O(1); Space O(1). Direct place-value lookup uses bounded Roman tables.",
      "optimizedComplexity": "Time O(1); Space O(1). Greedy consumes a fixed list of Roman values.",
      "recursiveComplexity": "Time O(1); Space O(1). Recursive greedy depth is bounded by Roman numeral length.",
      "bruteForceCode": "class Solution {\n  public String intToRoman(int num) {\n    String[] thousands = {\"\", \"M\", \"MM\", \"MMM\"};\n    String[] hundreds = {\"\", \"C\", \"CC\", \"CCC\", \"CD\", \"D\", \"DC\", \"DCC\", \"DCCC\", \"CM\"};\n    String[] tens = {\"\", \"X\", \"XX\", \"XXX\", \"XL\", \"L\", \"LX\", \"LXX\", \"LXXX\", \"XC\"};\n    String[] ones = {\"\", \"I\", \"II\", \"III\", \"IV\", \"V\", \"VI\", \"VII\", \"VIII\", \"IX\"};\n    return thousands[num / 1000] + hundreds[(num / 100) % 10] + tens[(num / 10) % 10] + ones[num % 10];\n  }\n}",
      "iterativeCode": "class Solution {\n  public String intToRoman(int num) {\n    int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n    String[] symbols = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n    StringBuilder answer = new StringBuilder();\n    for (int i = 0; i < values.length; i++) {\n      while (num >= values[i]) {\n        answer.append(symbols[i]);\n        num -= values[i];\n      }\n    }\n    return answer.toString();\n  }\n}",
      "recursiveCode": "class Solution {\n  private final int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n  private final String[] symbols = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n\n  public String intToRoman(int num) {\n    return build(num, 0, new StringBuilder()).toString();\n  }\n\n  private StringBuilder build(int num, int index, StringBuilder answer) {\n    if (num == 0) return answer;\n    if (num >= values[index]) {\n      answer.append(symbols[index]);\n      return build(num - values[index], index, answer);\n    }\n    return build(num, index + 1, answer);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String intToRoman(int num) {\n    int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n    String[] symbols = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n    StringBuilder answer = new StringBuilder();\n    for (int i = 0; i < values.length; i++) {\n      while (num >= values[i]) {\n        answer.append(symbols[i]);\n        num -= values[i];\n      }\n    }\n    return answer.toString();\n  }\n}",
      "code": "class Solution {\n  public String intToRoman(int num) {\n    int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n    String[] symbols = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n    StringBuilder answer = new StringBuilder();\n    for (int i = 0; i < values.length; i++) {\n      while (num >= values[i]) {\n        answer.append(symbols[i]);\n        num -= values[i];\n      }\n    }\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Roman to Integer",
      "difficulty": "Easy",
      "subpattern": "Subtractive numeral parsing",
      "question": "Given a Roman numeral, convert it to an integer.",
      "trigger": "A smaller numeral before a larger numeral is subtractive; otherwise symbols are additive.",
      "intuition": "Scan left to right and subtract a value when the next symbol is larger.",
      "edgeCases": "Single symbol, subtractive pairs IV/IX/XL/XC/CD/CM, repeated symbols, maximum MMMCMXCIX, mixed additive and subtractive parts.",
      "constraints": "1 <= s.length <= 15; s is a valid Roman numeral in the range 1 to 3999.",
      "source": {
        "label": "Roman to Integer - LeetCode 13",
        "url": "https://leetcode.com/problems/roman-to-integer/"
      },
      "examples": [
        {
          "input": "s = \"III\"",
          "output": "3",
          "explanation": "All symbols are additive."
        },
        {
          "input": "s = \"LVIII\"",
          "output": "58",
          "explanation": "L + V + III = 58."
        },
        {
          "input": "s = \"MCMXCIV\"",
          "output": "1994",
          "explanation": "CM, XC, and IV are subtractive pairs."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Expand subtractive pairs into additive forms, then sum.",
      "optimizedComplexity": "Time O(n); Space O(1). Compare each symbol to the next one.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively handles one symbol or subtractive pair per call.",
      "bruteForceCode": "class Solution {\n  public int romanToInt(String s) {\n    s = s.replace(\"IV\", \"IIII\").replace(\"IX\", \"VIIII\");\n    s = s.replace(\"XL\", \"XXXX\").replace(\"XC\", \"LXXXX\");\n    s = s.replace(\"CD\", \"CCCC\").replace(\"CM\", \"DCCCC\");\n\n    int answer = 0;\n    for (int i = 0; i < s.length(); i++) answer += valueOf(s.charAt(i));\n    return answer;\n  }\n\n  private int valueOf(char c) {\n    if (c == 'I') return 1;\n    if (c == 'V') return 5;\n    if (c == 'X') return 10;\n    if (c == 'L') return 50;\n    if (c == 'C') return 100;\n    if (c == 'D') return 500;\n    return 1000;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int romanToInt(String s) {\n    int answer = 0;\n    for (int i = 0; i < s.length(); i++) {\n      int value = valueOf(s.charAt(i));\n      int next = i + 1 < s.length() ? valueOf(s.charAt(i + 1)) : 0;\n      answer += value < next ? -value : value;\n    }\n    return answer;\n  }\n\n  private int valueOf(char c) {\n    if (c == 'I') return 1;\n    if (c == 'V') return 5;\n    if (c == 'X') return 10;\n    if (c == 'L') return 50;\n    if (c == 'C') return 100;\n    if (c == 'D') return 500;\n    return 1000;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int romanToInt(String s) {\n    return parse(s, 0);\n  }\n\n  private int parse(String s, int index) {\n    if (index == s.length()) return 0;\n    int value = valueOf(s.charAt(index));\n    int next = index + 1 < s.length() ? valueOf(s.charAt(index + 1)) : 0;\n    if (value < next) return -value + parse(s, index + 1);\n    return value + parse(s, index + 1);\n  }\n\n  private int valueOf(char c) {\n    if (c == 'I') return 1;\n    if (c == 'V') return 5;\n    if (c == 'X') return 10;\n    if (c == 'L') return 50;\n    if (c == 'C') return 100;\n    if (c == 'D') return 500;\n    return 1000;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int romanToInt(String s) {\n    int answer = 0;\n    for (int i = 0; i < s.length(); i++) {\n      int value = valueOf(s.charAt(i));\n      int next = i + 1 < s.length() ? valueOf(s.charAt(i + 1)) : 0;\n      answer += value < next ? -value : value;\n    }\n    return answer;\n  }\n\n  private int valueOf(char c) {\n    if (c == 'I') return 1;\n    if (c == 'V') return 5;\n    if (c == 'X') return 10;\n    if (c == 'L') return 50;\n    if (c == 'C') return 100;\n    if (c == 'D') return 500;\n    return 1000;\n  }\n}",
      "code": "class Solution {\n  public int romanToInt(String s) {\n    int answer = 0;\n    for (int i = 0; i < s.length(); i++) {\n      int value = valueOf(s.charAt(i));\n      int next = i + 1 < s.length() ? valueOf(s.charAt(i + 1)) : 0;\n      answer += value < next ? -value : value;\n    }\n    return answer;\n  }\n\n  private int valueOf(char c) {\n    if (c == 'I') return 1;\n    if (c == 'V') return 5;\n    if (c == 'X') return 10;\n    if (c == 'L') return 50;\n    if (c == 'C') return 100;\n    if (c == 'D') return 500;\n    return 1000;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "GCD of Strings",
      "difficulty": "Easy",
      "subpattern": "Euclidean gcd string divisibility",
      "question": "Given two strings, return the largest string that can be repeated to form both strings.",
      "trigger": "A common repeating base exists only when concatenation order commutes, and its length is gcd of both lengths.",
      "intuition": "Check str1 + str2 equals str2 + str1, then take the prefix of length gcd(len1, len2).",
      "edgeCases": "No common base, equal strings, one string repeated many times, one-character base, very different lengths.",
      "constraints": "1 <= str1.length, str2.length <= 1000; strings contain uppercase English letters.",
      "source": {
        "label": "GCD of Strings - LeetCode 1071",
        "url": "https://leetcode.com/problems/greatest-common-divisor-of-strings/"
      },
      "examples": [
        {
          "input": "str1 = \"ABCABC\", str2 = \"ABC\"",
          "output": "\"ABC\"",
          "explanation": "ABC repeats to form both strings."
        },
        {
          "input": "str1 = \"ABABAB\", str2 = \"ABAB\"",
          "output": "\"AB\"",
          "explanation": "AB is the largest common repeating base."
        },
        {
          "input": "str1 = \"LEET\", str2 = \"CODE\"",
          "output": "\"\"",
          "explanation": "No repeating base can form both strings."
        }
      ],
      "bruteForceComplexity": "Time O((n + m) * min(n,m)); Space O(n + m). Try candidate prefix lengths from largest to smallest.",
      "optimizedComplexity": "Time O(n + m + log min(n,m)); Space O(n + m). Concatenation check plus Euclidean gcd.",
      "recursiveComplexity": "Time O(n + m + log min(n,m)); Space O(log min(n,m)). Recursive gcd computes the prefix length.",
      "bruteForceCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    int limit = Math.min(str1.length(), str2.length());\n    for (int length = limit; length >= 1; length--) {\n      if (str1.length() % length == 0 && str2.length() % length == 0) {\n        String candidate = str1.substring(0, length);\n        if (divides(str1, candidate) && divides(str2, candidate)) return candidate;\n      }\n    }\n    return \"\";\n  }\n\n  private boolean divides(String value, String base) {\n    for (int i = 0; i < value.length(); i += base.length()) {\n      if (!value.substring(i, i + base.length()).equals(base)) return false;\n    }\n    return true;\n  }\n}",
      "iterativeCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    int length = gcd(str1.length(), str2.length());\n    return str1.substring(0, length);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "recursiveCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    return str1.substring(0, gcd(str1.length(), str2.length()));\n  }\n\n  private int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n  }\n}",
      "optimizedCode": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    int length = gcd(str1.length(), str2.length());\n    return str1.substring(0, length);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "code": "class Solution {\n  public String gcdOfStrings(String str1, String str2) {\n    if (!(str1 + str2).equals(str2 + str1)) return \"\";\n    int length = gcd(str1.length(), str2.length());\n    return str1.substring(0, length);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Water and Jug Problem",
      "difficulty": "Medium",
      "subpattern": "Bezout reachability",
      "question": "Given two jug capacities x and y and a target, return true if exactly target liters can be measured.",
      "trigger": "Pouring operations can create exactly the multiples of gcd(x, y), bounded by total capacity.",
      "intuition": "By Bezout identity, target is reachable iff target <= x + y and target is divisible by gcd(x, y).",
      "edgeCases": "target is 0, target exceeds total capacity, one jug has capacity 0, target equals a jug capacity, capacities share a gcd greater than 1.",
      "constraints": "0 <= x, y, target <= 1000000.",
      "source": {
        "label": "Water and Jug Problem - LeetCode 365",
        "url": "https://leetcode.com/problems/water-and-jug-problem/"
      },
      "examples": [
        {
          "input": "x = 3, y = 5, target = 4",
          "output": "true",
          "explanation": "4 is divisible by gcd(3,5) and does not exceed 8."
        },
        {
          "input": "x = 2, y = 6, target = 5",
          "output": "false",
          "explanation": "5 is not divisible by gcd(2,6)."
        },
        {
          "input": "x = 1, y = 2, target = 3",
          "output": "true",
          "explanation": "Fill both jugs."
        }
      ],
      "bruteForceComplexity": "Time O(xy); Space O(xy). BFS explores reachable water states.",
      "optimizedComplexity": "Time O(log min(x,y)); Space O(1). GCD reachability theorem.",
      "recursiveComplexity": "Time O(log min(x,y)); Space O(log min(x,y)). Recursive Euclidean gcd.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public boolean canMeasureWater(int x, int y, int target) {\n    if (target == 0) return true;\n    if (target > x + y) return false;\n\n    Queue<int[]> queue = new ArrayDeque<>();\n    Set<Long> seen = new HashSet<>();\n    queue.offer(new int[]{0, 0});\n    seen.add(encode(0, 0));\n\n    while (!queue.isEmpty()) {\n      int[] state = queue.poll();\n      int a = state[0], b = state[1];\n      if (a == target || b == target || a + b == target) return true;\n      int[][] next = {\n        {x, b}, {a, y}, {0, b}, {a, 0},\n        pour(a, b, x, y, true), pour(a, b, x, y, false)\n      };\n      for (int[] candidate : next) {\n        long key = encode(candidate[0], candidate[1]);\n        if (seen.add(key)) queue.offer(candidate);\n      }\n    }\n    return false;\n  }\n\n  private int[] pour(int a, int b, int x, int y, boolean leftToRight) {\n    if (leftToRight) {\n      int move = Math.min(a, y - b);\n      return new int[]{a - move, b + move};\n    }\n    int move = Math.min(b, x - a);\n    return new int[]{a + move, b - move};\n  }\n\n  private long encode(int a, int b) {\n    return (((long) a) << 32) ^ (b & 0xffffffffL);\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean canMeasureWater(int x, int y, int target) {\n    if (target == 0) return true;\n    if (target > x + y) return false;\n    return target % gcd(x, y) == 0;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean canMeasureWater(int x, int y, int target) {\n    if (target == 0) return true;\n    if (target > x + y) return false;\n    return target % gcd(x, y) == 0;\n  }\n\n  private int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean canMeasureWater(int x, int y, int target) {\n    if (target == 0) return true;\n    if (target > x + y) return false;\n    return target % gcd(x, y) == 0;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "code": "class Solution {\n  public boolean canMeasureWater(int x, int y, int target) {\n    if (target == 0) return true;\n    if (target > x + y) return false;\n    return target % gcd(x, y) == 0;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Fraction to Recurring Decimal",
      "difficulty": "Medium",
      "subpattern": "Remainder cycle detection",
      "question": "Given numerator and denominator, return their decimal representation, enclosing any repeating fractional part in parentheses.",
      "trigger": "Long division repeats exactly when the same remainder appears again.",
      "intuition": "Map each remainder to the output index where it first appeared; insert parentheses when it repeats.",
      "edgeCases": "Zero numerator, negative result, denominator divides evenly, repeating decimals, Integer.MIN_VALUE absolute value.",
      "constraints": "-2147483648 <= numerator, denominator <= 2147483647; denominator != 0.",
      "source": {
        "label": "Fraction to Recurring Decimal - LeetCode 166",
        "url": "https://leetcode.com/problems/fraction-to-recurring-decimal/"
      },
      "examples": [
        {
          "input": "numerator = 1, denominator = 2",
          "output": "\"0.5\"",
          "explanation": "The decimal terminates."
        },
        {
          "input": "numerator = 2, denominator = 1",
          "output": "\"2\"",
          "explanation": "There is no fractional part."
        },
        {
          "input": "numerator = 4, denominator = 333",
          "output": "\"0.(012)\"",
          "explanation": "The remainder cycle repeats 012."
        }
      ],
      "bruteForceComplexity": "Time O(k^2); Space O(k). List lookup checks whether a remainder has appeared before.",
      "optimizedComplexity": "Time O(k); Space O(k). Hash map stores each remainder position.",
      "recursiveComplexity": "Time O(k); Space O(k). Recursive long division carries the remainder map.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator < 0) ^ (denominator < 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    List<Long> remainders = new ArrayList<>();\n    while (remainder != 0) {\n      int seen = remainders.indexOf(remainder);\n      if (seen >= 0) {\n        answer.insert(answer.indexOf(\".\") + 1 + seen, '(');\n        answer.append(')');\n        break;\n      }\n      remainders.add(remainder);\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator < 0) ^ (denominator < 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    Map<Long, Integer> seen = new HashMap<>();\n    while (remainder != 0) {\n      if (seen.containsKey(remainder)) {\n        answer.insert(seen.get(remainder).intValue(), '(');\n        answer.append(')');\n        break;\n      }\n      seen.put(remainder, answer.length());\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator < 0) ^ (denominator < 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    divide(remainder, divisor, answer, new HashMap<>());\n    return answer.toString();\n  }\n\n  private void divide(long remainder, long divisor, StringBuilder answer, Map<Long, Integer> seen) {\n    if (remainder == 0) return;\n    if (seen.containsKey(remainder)) {\n      answer.insert(seen.get(remainder).intValue(), '(');\n      answer.append(')');\n      return;\n    }\n    seen.put(remainder, answer.length());\n    remainder *= 10;\n    answer.append(remainder / divisor);\n    divide(remainder % divisor, divisor, answer, seen);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator < 0) ^ (denominator < 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    Map<Long, Integer> seen = new HashMap<>();\n    while (remainder != 0) {\n      if (seen.containsKey(remainder)) {\n        answer.insert(seen.get(remainder).intValue(), '(');\n        answer.append(')');\n        break;\n      }\n      seen.put(remainder, answer.length());\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String fractionToDecimal(int numerator, int denominator) {\n    if (numerator == 0) return \"0\";\n    StringBuilder answer = new StringBuilder();\n    if ((numerator < 0) ^ (denominator < 0)) answer.append('-');\n\n    long dividend = Math.abs((long) numerator);\n    long divisor = Math.abs((long) denominator);\n    answer.append(dividend / divisor);\n    long remainder = dividend % divisor;\n    if (remainder == 0) return answer.toString();\n\n    answer.append('.');\n    Map<Long, Integer> seen = new HashMap<>();\n    while (remainder != 0) {\n      if (seen.containsKey(remainder)) {\n        answer.insert(seen.get(remainder).intValue(), '(');\n        answer.append(')');\n        break;\n      }\n      seen.put(remainder, answer.length());\n      remainder *= 10;\n      answer.append(remainder / divisor);\n      remainder %= divisor;\n    }\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Basic Calculator",
      "difficulty": "Hard",
      "subpattern": "Arithmetic expression sign stack",
      "question": "Given a string expression containing non-negative integers, plus, minus, spaces, and parentheses, evaluate the expression.",
      "trigger": "Parentheses change the active sign context, so expression value can be maintained with a sign stack or recursive parser.",
      "intuition": "Accumulate the current number under its sign; when entering parentheses, save outer result and sign.",
      "edgeCases": "Leading negative expression, nested parentheses, spaces, multi-digit numbers, expression ending with a number.",
      "constraints": "1 <= s.length <= 300000; s consists of digits, plus, minus, parentheses, and spaces; expression is valid.",
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
          "explanation": "Nested parentheses change evaluation order."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Recursive descent evaluates each parenthesized subexpression.",
      "optimizedComplexity": "Time O(n); Space O(n). A stack stores result and sign before each parenthesis.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive helper consumes the expression until a closing parenthesis.",
      "bruteForceCode": "class Solution {\n  public int calculate(String s) {\n    return evaluate(s, new int[]{0});\n  }\n\n  private int evaluate(String s, int[] index) {\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n    while (index[0] < s.length()) {\n      char c = s.charAt(index[0]++);\n      if (Character.isDigit(c)) number = number * 10 + c - '0';\n      else if (c == '+' || c == '-') {\n        result += sign * number;\n        number = 0;\n        sign = c == '+' ? 1 : -1;\n      } else if (c == '(') {\n        number = evaluate(s, index);\n      } else if (c == ')') {\n        break;\n      }\n    }\n    return result + sign * number;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n      char c = s.charAt(i);\n      if (Character.isDigit(c)) {\n        number = number * 10 + c - '0';\n      } else if (c == '+' || c == '-') {\n        result += sign * number;\n        number = 0;\n        sign = c == '+' ? 1 : -1;\n      } else if (c == '(') {\n        stack.push(result);\n        stack.push(sign);\n        result = 0;\n        sign = 1;\n      } else if (c == ')') {\n        result += sign * number;\n        number = 0;\n        result *= stack.pop();\n        result += stack.pop();\n      }\n    }\n    return result + sign * number;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int calculate(String s) {\n    return parse(s, new int[]{0});\n  }\n\n  private int parse(String s, int[] index) {\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n    while (index[0] < s.length()) {\n      char c = s.charAt(index[0]++);\n      if (Character.isDigit(c)) number = number * 10 + c - '0';\n      else if (c == '+') {\n        result += sign * number;\n        number = 0;\n        sign = 1;\n      } else if (c == '-') {\n        result += sign * number;\n        number = 0;\n        sign = -1;\n      } else if (c == '(') {\n        number = parse(s, index);\n      } else if (c == ')') {\n        break;\n      }\n    }\n    return result + sign * number;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n      char c = s.charAt(i);\n      if (Character.isDigit(c)) {\n        number = number * 10 + c - '0';\n      } else if (c == '+' || c == '-') {\n        result += sign * number;\n        number = 0;\n        sign = c == '+' ? 1 : -1;\n      } else if (c == '(') {\n        stack.push(result);\n        stack.push(sign);\n        result = 0;\n        sign = 1;\n      } else if (c == ')') {\n        result += sign * number;\n        number = 0;\n        result *= stack.pop();\n        result += stack.pop();\n      }\n    }\n    return result + sign * number;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int calculate(String s) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    int result = 0;\n    int sign = 1;\n    int number = 0;\n\n    for (int i = 0; i < s.length(); i++) {\n      char c = s.charAt(i);\n      if (Character.isDigit(c)) {\n        number = number * 10 + c - '0';\n      } else if (c == '+' || c == '-') {\n        result += sign * number;\n        number = 0;\n        sign = c == '+' ? 1 : -1;\n      } else if (c == '(') {\n        stack.push(result);\n        stack.push(sign);\n        result = 0;\n        sign = 1;\n      } else if (c == ')') {\n        result += sign * number;\n        number = 0;\n        result *= stack.pop();\n        result += stack.pop();\n      }\n    }\n    return result + sign * number;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Permutation Sequence",
      "difficulty": "Hard",
      "subpattern": "Factorial number system",
      "question": "Given n and k, return the kth permutation sequence of numbers 1 through n in lexicographic order.",
      "trigger": "There are (n - 1)! permutations for each fixed first digit, so k can select digits by factorial blocks.",
      "intuition": "Convert k - 1 into factorial number system indexes and remove chosen digits from the candidate list.",
      "edgeCases": "n is 1, k is 1, k equals n!, removing the last digit, one-indexed k conversion.",
      "constraints": "1 <= n <= 9; 1 <= k <= n!.",
      "source": {
        "label": "Permutation Sequence - LeetCode 60",
        "url": "https://leetcode.com/problems/permutation-sequence/"
      },
      "examples": [
        {
          "input": "n = 3, k = 3",
          "output": "\"213\"",
          "explanation": "The third permutation of 123 is 213."
        },
        {
          "input": "n = 4, k = 9",
          "output": "\"2314\"",
          "explanation": "Factorial blocks identify each next digit."
        },
        {
          "input": "n = 3, k = 1",
          "output": "\"123\"",
          "explanation": "The first permutation is sorted order."
        }
      ],
      "bruteForceComplexity": "Time O(k * n) up to O(n! * n); Space O(n). Generate permutations until the kth is reached.",
      "optimizedComplexity": "Time O(n^2); Space O(n). Factorial indexing plus list removal.",
      "recursiveComplexity": "Time O(n^2); Space O(n). Recursive factorial indexing chooses one digit per level.",
      "bruteForceCode": "class Solution {\n  private int target;\n  private int count;\n  private String answer;\n\n  public String getPermutation(int n, int k) {\n    target = k;\n    count = 0;\n    answer = \"\";\n    boolean[] used = new boolean[n + 1];\n    backtrack(n, new StringBuilder(), used);\n    return answer;\n  }\n\n  private boolean backtrack(int n, StringBuilder path, boolean[] used) {\n    if (path.length() == n) {\n      count++;\n      if (count == target) {\n        answer = path.toString();\n        return true;\n      }\n      return false;\n    }\n    for (int value = 1; value <= n; value++) {\n      if (used[value]) continue;\n      used[value] = true;\n      path.append(value);\n      if (backtrack(n, path, used)) return true;\n      path.deleteCharAt(path.length() - 1);\n      used[value] = false;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public String getPermutation(int n, int k) {\n    int[] factorial = new int[n + 1];\n    factorial[0] = 1;\n    List<Integer> digits = new ArrayList<>();\n    for (int i = 1; i <= n; i++) {\n      factorial[i] = factorial[i - 1] * i;\n      digits.add(i);\n    }\n\n    k--;\n    StringBuilder answer = new StringBuilder();\n    for (int remaining = n; remaining >= 1; remaining--) {\n      int block = factorial[remaining - 1];\n      int index = k / block;\n      answer.append(digits.remove(index));\n      k %= block;\n    }\n    return answer.toString();\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public String getPermutation(int n, int k) {\n    int[] factorial = new int[n + 1];\n    factorial[0] = 1;\n    List<Integer> digits = new ArrayList<>();\n    for (int i = 1; i <= n; i++) {\n      factorial[i] = factorial[i - 1] * i;\n      digits.add(i);\n    }\n    return build(digits, factorial, k - 1, new StringBuilder()).toString();\n  }\n\n  private StringBuilder build(List<Integer> digits, int[] factorial, int k, StringBuilder answer) {\n    if (digits.isEmpty()) return answer;\n    int block = factorial[digits.size() - 1];\n    int index = k / block;\n    answer.append(digits.remove(index));\n    return build(digits, factorial, k % block, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public String getPermutation(int n, int k) {\n    int[] factorial = new int[n + 1];\n    factorial[0] = 1;\n    List<Integer> digits = new ArrayList<>();\n    for (int i = 1; i <= n; i++) {\n      factorial[i] = factorial[i - 1] * i;\n      digits.add(i);\n    }\n\n    k--;\n    StringBuilder answer = new StringBuilder();\n    for (int remaining = n; remaining >= 1; remaining--) {\n      int block = factorial[remaining - 1];\n      int index = k / block;\n      answer.append(digits.remove(index));\n      k %= block;\n    }\n    return answer.toString();\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public String getPermutation(int n, int k) {\n    int[] factorial = new int[n + 1];\n    factorial[0] = 1;\n    List<Integer> digits = new ArrayList<>();\n    for (int i = 1; i <= n; i++) {\n      factorial[i] = factorial[i - 1] * i;\n      digits.add(i);\n    }\n\n    k--;\n    StringBuilder answer = new StringBuilder();\n    for (int remaining = n; remaining >= 1; remaining--) {\n      int block = factorial[remaining - 1];\n      int index = k / block;\n      answer.append(digits.remove(index));\n      k %= block;\n    }\n    return answer.toString();\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Pascal's Triangle II",
      "difficulty": "Easy",
      "subpattern": "Pascal row combinatorics",
      "question": "Given rowIndex, return the rowIndex-th row of Pascal's triangle using zero-based indexing.",
      "trigger": "Each row value is a binomial coefficient and can be derived from the previous value.",
      "intuition": "Update a single row in place from right to left, or use C(n,k+1)=C(n,k)*(n-k)/(k+1).",
      "edgeCases": "rowIndex is 0, rowIndex is 1, middle values, rowIndex near 33, integer values still fit for constraints.",
      "constraints": "0 <= rowIndex <= 33.",
      "source": {
        "label": "Pascal's Triangle II - LeetCode 119",
        "url": "https://leetcode.com/problems/pascals-triangle-ii/"
      },
      "examples": [
        {
          "input": "rowIndex = 3",
          "output": "[1,3,3,1]",
          "explanation": "The fourth row is 1 3 3 1."
        },
        {
          "input": "rowIndex = 0",
          "output": "[1]",
          "explanation": "The zeroth row has one value."
        },
        {
          "input": "rowIndex = 1",
          "output": "[1,1]",
          "explanation": "The first row has two ones."
        }
      ],
      "bruteForceComplexity": "Time O(rowIndex^2); Space O(rowIndex^2). Build every row up to the target.",
      "optimizedComplexity": "Time O(rowIndex^2); Space O(rowIndex). Update one row in place from right to left.",
      "recursiveComplexity": "Time O(rowIndex); Space O(rowIndex). Recursively generates binomial coefficients from the prior one.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> getRow(int rowIndex) {\n    List<List<Integer>> triangle = new ArrayList<>();\n    for (int row = 0; row <= rowIndex; row++) {\n      List<Integer> current = new ArrayList<>();\n      for (int col = 0; col <= row; col++) {\n        if (col == 0 || col == row) current.add(1);\n        else current.add(triangle.get(row - 1).get(col - 1) + triangle.get(row - 1).get(col));\n      }\n      triangle.add(current);\n    }\n    return triangle.get(rowIndex);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> getRow(int rowIndex) {\n    List<Integer> row = new ArrayList<>();\n    for (int i = 0; i <= rowIndex; i++) {\n      row.add(1);\n      for (int j = i - 1; j > 0; j--) {\n        row.set(j, row.get(j) + row.get(j - 1));\n      }\n    }\n    return row;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> getRow(int rowIndex) {\n    List<Integer> answer = new ArrayList<>();\n    build(rowIndex, 0, 1L, answer);\n    return answer;\n  }\n\n  private void build(int n, int k, long value, List<Integer> answer) {\n    if (k > n) return;\n    answer.add((int) value);\n    long next = value * (n - k) / (k + 1);\n    build(n, k + 1, next, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> getRow(int rowIndex) {\n    List<Integer> row = new ArrayList<>();\n    for (int i = 0; i <= rowIndex; i++) {\n      row.add(1);\n      for (int j = i - 1; j > 0; j--) {\n        row.set(j, row.get(j) + row.get(j - 1));\n      }\n    }\n    return row;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> getRow(int rowIndex) {\n    List<Integer> row = new ArrayList<>();\n    for (int i = 0; i <= rowIndex; i++) {\n      row.add(1);\n      for (int j = i - 1; j > 0; j--) {\n        row.set(j, row.get(j) + row.get(j - 1));\n      }\n    }\n    return row;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Number of Digit One",
      "difficulty": "Hard",
      "subpattern": "Digit place contribution",
      "question": "Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.",
      "trigger": "Each decimal place contributes independently based on higher digits, current digit, and lower digits.",
      "intuition": "For factor 1, 10, 100, count full cycles of 0-9 plus the partial cycle at the current digit.",
      "edgeCases": "n is 0, n below 10, current digit is 0, current digit is 1, current digit is greater than 1, large n.",
      "constraints": "0 <= n <= 1000000000.",
      "source": {
        "label": "Number of Digit One - LeetCode 233",
        "url": "https://leetcode.com/problems/number-of-digit-one/"
      },
      "examples": [
        {
          "input": "n = 13",
          "output": "6",
          "explanation": "1 appears in 1, 10, 11, 12, and 13."
        },
        {
          "input": "n = 0",
          "output": "0",
          "explanation": "No positive number is counted."
        },
        {
          "input": "n = 99",
          "output": "20",
          "explanation": "Each of the ones and tens places contributes ten ones."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(1). Count ones in every number from 1 to n.",
      "optimizedComplexity": "Time O(log n); Space O(1). Sum independent contribution of each decimal place.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursively decomposes by highest decimal power.",
      "bruteForceCode": "class Solution {\n  public int countDigitOne(int n) {\n    int answer = 0;\n    for (int value = 1; value <= n; value++) {\n      answer += countOnes(value);\n    }\n    return answer;\n  }\n\n  private int countOnes(int value) {\n    int count = 0;\n    while (value > 0) {\n      if (value % 10 == 1) count++;\n      value /= 10;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int countDigitOne(int n) {\n    long answer = 0;\n    for (long factor = 1; factor <= n; factor *= 10) {\n      long lower = n % factor;\n      long current = (n / factor) % 10;\n      long higher = n / (factor * 10);\n      if (current == 0) answer += higher * factor;\n      else if (current == 1) answer += higher * factor + lower + 1;\n      else answer += (higher + 1) * factor;\n    }\n    return (int) answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countDigitOne(int n) {\n    if (n <= 0) return 0;\n    if (n < 10) return 1;\n\n    long power = 1;\n    while (power * 10 <= n) power *= 10;\n    long high = n / power;\n    long rest = n % power;\n\n    long firstDigitContribution = high == 1 ? rest + 1 : power;\n    long otherDigitsContribution = high * countDigitOne((int) power - 1);\n    return (int) (firstDigitContribution + otherDigitsContribution + countDigitOne((int) rest));\n  }\n}",
      "optimizedCode": "class Solution {\n  public int countDigitOne(int n) {\n    long answer = 0;\n    for (long factor = 1; factor <= n; factor *= 10) {\n      long lower = n % factor;\n      long current = (n / factor) % 10;\n      long higher = n / (factor * 10);\n      if (current == 0) answer += higher * factor;\n      else if (current == 1) answer += higher * factor + lower + 1;\n      else answer += (higher + 1) * factor;\n    }\n    return (int) answer;\n  }\n}",
      "code": "class Solution {\n  public int countDigitOne(int n) {\n    long answer = 0;\n    for (long factor = 1; factor <= n; factor *= 10) {\n      long lower = n % factor;\n      long current = (n / factor) % 10;\n      long higher = n / (factor * 10);\n      if (current == 0) answer += higher * factor;\n      else if (current == 1) answer += higher * factor + lower + 1;\n      else answer += (higher + 1) * factor;\n    }\n    return (int) answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Factorial Trailing Zeroes",
      "difficulty": "Medium",
      "subpattern": "Factor multiplicity counting",
      "question": "Given an integer n, return the number of trailing zeroes in n factorial.",
      "trigger": "A trailing zero is produced by a factor pair 2 * 5, and factorials always have more 2s than 5s.",
      "intuition": "Count how many multiples of 5, 25, 125, and so on appear in n!.",
      "edgeCases": "n is 0, n below 5, n exactly a power of 5, large n, multiple factors of 5 in one number.",
      "constraints": "0 <= n <= 10000.",
      "source": {
        "label": "Factorial Trailing Zeroes - LeetCode 172",
        "url": "https://leetcode.com/problems/factorial-trailing-zeroes/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "0",
          "explanation": "3! = 6 has no trailing zero."
        },
        {
          "input": "n = 5",
          "output": "1",
          "explanation": "5! = 120 has one trailing zero."
        },
        {
          "input": "n = 25",
          "output": "6",
          "explanation": "25 contributes two factors of 5."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(log n) for the factorial value. Build n! and count ending zeros.",
      "optimizedComplexity": "Time O(log5 n); Space O(1). Sum n / 5^k.",
      "recursiveComplexity": "Time O(log5 n); Space O(log5 n). Recursively divides n by 5.",
      "bruteForceCode": "import java.math.*;\n\nclass Solution {\n  public int trailingZeroes(int n) {\n    BigInteger factorial = BigInteger.ONE;\n    for (int value = 2; value <= n; value++) {\n      factorial = factorial.multiply(BigInteger.valueOf(value));\n    }\n\n    String digits = factorial.toString();\n    int count = 0;\n    for (int i = digits.length() - 1; i >= 0 && digits.charAt(i) == '0'; i--) count++;\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int trailingZeroes(int n) {\n    int count = 0;\n    while (n > 0) {\n      n /= 5;\n      count += n;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int trailingZeroes(int n) {\n    return countFactorsOfFive(n, 0);\n  }\n\n  private int countFactorsOfFive(int n, int total) {\n    if (n == 0) return total;\n    int next = n / 5;\n    return countFactorsOfFive(next, total + next);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int trailingZeroes(int n) {\n    int count = 0;\n    while (n > 0) {\n      n /= 5;\n      count += n;\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  public int trailingZeroes(int n) {\n    int count = 0;\n    while (n > 0) {\n      n /= 5;\n      count += n;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Valid Perfect Square",
      "difficulty": "Easy",
      "subpattern": "Square root boundary test",
      "question": "Given a positive integer num, return true if num is a perfect square without using a built-in square root function.",
      "trigger": "The predicate mid * mid <= num is monotonic, so the exact square can be found by binary search.",
      "intuition": "Search candidate roots and compare using long multiplication to avoid overflow.",
      "edgeCases": "num is 1, num is a perfect square, num is between squares, num near Integer.MAX_VALUE, overflow risk in mid * mid.",
      "constraints": "1 <= num <= 2147483647.",
      "source": {
        "label": "Valid Perfect Square - LeetCode 367",
        "url": "https://leetcode.com/problems/valid-perfect-square/"
      },
      "examples": [
        {
          "input": "num = 16",
          "output": "true",
          "explanation": "4 * 4 equals 16."
        },
        {
          "input": "num = 14",
          "output": "false",
          "explanation": "14 lies between 3^2 and 4^2."
        },
        {
          "input": "num = 1",
          "output": "true",
          "explanation": "1 is 1 squared."
        }
      ],
      "bruteForceComplexity": "Time O(sqrt num); Space O(1). Try every root candidate.",
      "optimizedComplexity": "Time O(log num); Space O(1). Binary search root candidates.",
      "recursiveComplexity": "Time O(log num); Space O(log num). Recursive binary search.",
      "bruteForceCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    for (long root = 1; root * root <= num; root++) {\n      if (root * root == num) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    int left = 1;\n    int right = num;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n      if (square == num) return true;\n      if (square < num) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    return search(num, 1, num);\n  }\n\n  private boolean search(int num, int left, int right) {\n    if (left > right) return false;\n    int mid = left + (right - left) / 2;\n    long square = (long) mid * mid;\n    if (square == num) return true;\n    if (square < num) return search(num, mid + 1, right);\n    return search(num, left, mid - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    int left = 1;\n    int right = num;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n      if (square == num) return true;\n      if (square < num) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}",
      "code": "class Solution {\n  public boolean isPerfectSquare(int num) {\n    int left = 1;\n    int right = num;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      long square = (long) mid * mid;\n      if (square == num) return true;\n      if (square < num) left = mid + 1;\n      else right = mid - 1;\n    }\n    return false;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Reordered Power of 2",
      "difficulty": "Medium",
      "subpattern": "Power digit signature",
      "question": "Given a positive integer n, return true if its digits can be reordered to form a power of two.",
      "trigger": "Digit order is irrelevant, so every candidate can be represented by a digit-count signature.",
      "intuition": "Compare n's digit counts with digit counts of powers of two in the integer range.",
      "edgeCases": "n is already a power of two, reordered value would lead with zero, repeated digits, different digit lengths, maximum integer range.",
      "constraints": "1 <= n <= 1000000000.",
      "source": {
        "label": "Reordered Power of 2 - LeetCode 869",
        "url": "https://leetcode.com/problems/reordered-power-of-2/"
      },
      "examples": [
        {
          "input": "n = 1",
          "output": "true",
          "explanation": "1 is 2^0."
        },
        {
          "input": "n = 10",
          "output": "false",
          "explanation": "01 has a leading zero and 10 is not a power of two."
        },
        {
          "input": "n = 46",
          "output": "true",
          "explanation": "46 can be reordered to 64."
        }
      ],
      "bruteForceComplexity": "Time O(d! * d); Space O(d). Try digit permutations and test power of two.",
      "optimizedComplexity": "Time O(31 * d); Space O(1). Compare digit-count signatures against all powers of two.",
      "recursiveComplexity": "Time O(31 * d); Space O(31). Recursively checks power signatures.",
      "bruteForceCode": "class Solution {\n  public boolean reorderedPowerOf2(int n) {\n    char[] digits = String.valueOf(n).toCharArray();\n    return permute(digits, new boolean[digits.length], 0, 0L);\n  }\n\n  private boolean permute(char[] digits, boolean[] used, int depth, long value) {\n    if (depth == digits.length) return isPowerOfTwo(value);\n    for (int i = 0; i < digits.length; i++) {\n      if (used[i]) continue;\n      if (depth == 0 && digits[i] == '0') continue;\n      used[i] = true;\n      if (permute(digits, used, depth + 1, value * 10 + digits[i] - '0')) return true;\n      used[i] = false;\n    }\n    return false;\n  }\n\n  private boolean isPowerOfTwo(long value) {\n    return value > 0 && (value & (value - 1)) == 0;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public boolean reorderedPowerOf2(int n) {\n    String target = signature(n);\n    for (int power = 1; power > 0; power <<= 1) {\n      if (signature(power).equals(target)) return true;\n      if (power > (1 << 30)) break;\n    }\n    return false;\n  }\n\n  private String signature(int value) {\n    int[] count = new int[10];\n    while (value > 0) {\n      count[value % 10]++;\n      value /= 10;\n    }\n    return Arrays.toString(count);\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public boolean reorderedPowerOf2(int n) {\n    return check(signature(n), 1);\n  }\n\n  private boolean check(String target, int power) {\n    if (power <= 0) return false;\n    if (signature(power).equals(target)) return true;\n    if (power > (1 << 30)) return false;\n    return check(target, power << 1);\n  }\n\n  private String signature(int value) {\n    int[] count = new int[10];\n    while (value > 0) {\n      count[value % 10]++;\n      value /= 10;\n    }\n    return Arrays.toString(count);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public boolean reorderedPowerOf2(int n) {\n    String target = signature(n);\n    for (int power = 1; power > 0; power <<= 1) {\n      if (signature(power).equals(target)) return true;\n      if (power > (1 << 30)) break;\n    }\n    return false;\n  }\n\n  private String signature(int value) {\n    int[] count = new int[10];\n    while (value > 0) {\n      count[value % 10]++;\n      value /= 10;\n    }\n    return Arrays.toString(count);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public boolean reorderedPowerOf2(int n) {\n    String target = signature(n);\n    for (int power = 1; power > 0; power <<= 1) {\n      if (signature(power).equals(target)) return true;\n      if (power > (1 << 30)) break;\n    }\n    return false;\n  }\n\n  private String signature(int value) {\n    int[] count = new int[10];\n    while (value > 0) {\n      count[value % 10]++;\n      value /= 10;\n    }\n    return Arrays.toString(count);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Mirror Reflection",
      "difficulty": "Medium",
      "subpattern": "LCM parity reflection",
      "question": "A laser ray starts at the southwest corner of a square room and first meets the east wall at height q. Return which receptor it meets first.",
      "trigger": "Unfolding mirrored rooms turns reflections into a straight line; receptor choice depends on parity of room extensions.",
      "intuition": "Find the least common multiple of p and q, then compare parity of horizontal and vertical room counts.",
      "edgeCases": "q equals p, p and q share powers of two, receptor 0, receptor 1, receptor 2.",
      "constraints": "1 <= q <= p <= 1000.",
      "source": {
        "label": "Mirror Reflection - LeetCode 858",
        "url": "https://leetcode.com/problems/mirror-reflection/"
      },
      "examples": [
        {
          "input": "p = 2, q = 1",
          "output": "2",
          "explanation": "The ray first reaches receptor 2."
        },
        {
          "input": "p = 3, q = 1",
          "output": "1",
          "explanation": "The unfolded path reaches the northeast receptor."
        },
        {
          "input": "p = 4, q = 3",
          "output": "2",
          "explanation": "Parity after unfolding selects receptor 2."
        }
      ],
      "bruteForceComplexity": "Time O(p / gcd(p,q)); Space O(1). Simulate unfolded room extensions until height aligns.",
      "optimizedComplexity": "Time O(log min(p,q)); Space O(1). Reduce by gcd and inspect parity.",
      "recursiveComplexity": "Time O(log min(p,q)) for common-factor reduction; Space O(log min(p,q)).",
      "bruteForceCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    int extensions = 1;\n    while ((extensions * q) % p != 0) extensions++;\n    int roomsHigh = (extensions * q) / p;\n    if (extensions % 2 == 1 && roomsHigh % 2 == 1) return 1;\n    if (extensions % 2 == 1) return 0;\n    return 2;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    int divisor = gcd(p, q);\n    p /= divisor;\n    q /= divisor;\n    if (p % 2 == 1 && q % 2 == 1) return 1;\n    if (p % 2 == 1) return 0;\n    return 2;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    if (p % 2 == 0 && q % 2 == 0) return mirrorReflection(p / 2, q / 2);\n    if (p % 2 == 1 && q % 2 == 1) return 1;\n    if (p % 2 == 1) return 0;\n    return 2;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    int divisor = gcd(p, q);\n    p /= divisor;\n    q /= divisor;\n    if (p % 2 == 1 && q % 2 == 1) return 1;\n    if (p % 2 == 1) return 0;\n    return 2;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "code": "class Solution {\n  public int mirrorReflection(int p, int q) {\n    int divisor = gcd(p, q);\n    p /= divisor;\n    q /= divisor;\n    if (p % 2 == 1 && q % 2 == 1) return 1;\n    if (p % 2 == 1) return 0;\n    return 2;\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Poor Pigs",
      "difficulty": "Hard",
      "subpattern": "Logarithmic trial counting",
      "question": "Given buckets, minutesToDie, and minutesToTest, return the minimum number of pigs needed to determine the poisonous bucket.",
      "trigger": "Each pig can represent one of trials + 1 states, so pigs encode buckets in a positional number system.",
      "intuition": "Find the smallest pigs such that (states per pig)^pigs >= buckets.",
      "edgeCases": "One bucket, only one test round, buckets exactly a power of states, buckets just above a power, large bucket count.",
      "constraints": "1 <= buckets <= 1000; 1 <= minutesToDie <= minutesToTest <= 100.",
      "source": {
        "label": "Poor Pigs - LeetCode 458",
        "url": "https://leetcode.com/problems/poor-pigs/"
      },
      "examples": [
        {
          "input": "buckets = 1000, minutesToDie = 15, minutesToTest = 60",
          "output": "5",
          "explanation": "Each pig has 5 states, and 5^5 covers 1000 buckets."
        },
        {
          "input": "buckets = 4, minutesToDie = 15, minutesToTest = 15",
          "output": "2",
          "explanation": "Two pigs provide 2^2 states."
        },
        {
          "input": "buckets = 1, minutesToDie = 1, minutesToTest = 1",
          "output": "0",
          "explanation": "No test is needed for one bucket."
        }
      ],
      "bruteForceComplexity": "Time O(answer); Space O(1). Increase pigs until capacity covers buckets.",
      "optimizedComplexity": "Time O(answer) after logarithmic estimate; Space O(1). Uses logs and exact adjustment.",
      "recursiveComplexity": "Time O(answer); Space O(answer). Recursively multiplies state capacity.",
      "bruteForceCode": "class Solution {\n  public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {\n    int states = minutesToTest / minutesToDie + 1;\n    int pigs = 0;\n    long capacity = 1;\n    while (capacity < buckets) {\n      pigs++;\n      capacity *= states;\n    }\n    return pigs;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {\n    if (buckets == 1) return 0;\n    int states = minutesToTest / minutesToDie + 1;\n    int pigs = (int) Math.ceil(Math.log(buckets) / Math.log(states));\n    while (power(states, pigs) < buckets) pigs++;\n    while (pigs > 0 && power(states, pigs - 1) >= buckets) pigs--;\n    return pigs;\n  }\n\n  private long power(int base, int exponent) {\n    long result = 1;\n    for (int i = 0; i < exponent; i++) result *= base;\n    return result;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {\n    int states = minutesToTest / minutesToDie + 1;\n    return search(buckets, states, 0, 1L);\n  }\n\n  private int search(int buckets, int states, int pigs, long capacity) {\n    if (capacity >= buckets) return pigs;\n    return search(buckets, states, pigs + 1, capacity * states);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {\n    if (buckets == 1) return 0;\n    int states = minutesToTest / minutesToDie + 1;\n    int pigs = (int) Math.ceil(Math.log(buckets) / Math.log(states));\n    while (power(states, pigs) < buckets) pigs++;\n    while (pigs > 0 && power(states, pigs - 1) >= buckets) pigs--;\n    return pigs;\n  }\n\n  private long power(int base, int exponent) {\n    long result = 1;\n    for (int i = 0; i < exponent; i++) result *= base;\n    return result;\n  }\n}",
      "code": "class Solution {\n  public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {\n    if (buckets == 1) return 0;\n    int states = minutesToTest / minutesToDie + 1;\n    int pigs = (int) Math.ceil(Math.log(buckets) / Math.log(states));\n    while (power(states, pigs) < buckets) pigs++;\n    while (pigs > 0 && power(states, pigs - 1) >= buckets) pigs--;\n    return pigs;\n  }\n\n  private long power(int base, int exponent) {\n    long result = 1;\n    for (int i = 0; i < exponent; i++) result *= base;\n    return result;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Super Pow",
      "difficulty": "Medium",
      "subpattern": "Modular exponentiation",
      "question": "Given an integer a and a large exponent b represented as an array of decimal digits, return a^b mod 1337.",
      "trigger": "The exponent is too large to materialize, but decimal digits can be processed with modular exponentiation.",
      "intuition": "When appending a digit d to exponent e, a^(10e+d) = (a^e)^10 * a^d.",
      "edgeCases": "a is divisible by 1337, exponent is 0, single-digit exponent, long exponent array, repeated modulo multiplication.",
      "constraints": "1 <= a <= 2147483647; 1 <= b.length <= 2000; 0 <= b[i] <= 9; b has no leading zero unless b is exactly [0].",
      "source": {
        "label": "Super Pow - LeetCode 372",
        "url": "https://leetcode.com/problems/super-pow/"
      },
      "examples": [
        {
          "input": "a = 2, b = [3]",
          "output": "8",
          "explanation": "2^3 mod 1337 is 8."
        },
        {
          "input": "a = 2, b = [1,0]",
          "output": "1024",
          "explanation": "2^10 mod 1337 is 1024."
        },
        {
          "input": "a = 1, b = [4,3,3,8,5,2]",
          "output": "1",
          "explanation": "1 to any exponent remains 1."
        }
      ],
      "bruteForceComplexity": "Time O(exponent value); Space O(number of exponent digits). Decrement the decimal exponent one step at a time.",
      "optimizedComplexity": "Time O(d * log 10); Space O(1). Process each exponent digit with modular powers.",
      "recursiveComplexity": "Time O(d * log 10); Space O(d). Recursively processes exponent digits from left to right.",
      "bruteForceCode": "class Solution {\n  private static final int MOD = 1337;\n\n  public int superPow(int a, int[] b) {\n    String exponent = toString(b);\n    int result = 1;\n    int base = a % MOD;\n    while (!exponent.equals(\"0\")) {\n      result = (result * base) % MOD;\n      exponent = subtractOne(exponent);\n    }\n    return result;\n  }\n\n  private String toString(int[] digits) {\n    StringBuilder builder = new StringBuilder();\n    for (int digit : digits) builder.append(digit);\n    return builder.toString();\n  }\n\n  private String subtractOne(String value) {\n    char[] digits = value.toCharArray();\n    int index = digits.length - 1;\n    while (index >= 0 && digits[index] == '0') digits[index--] = '9';\n    digits[index]--;\n    int start = 0;\n    while (start < digits.length - 1 && digits[start] == '0') start++;\n    return new String(digits, start, digits.length - start);\n  }\n}",
      "iterativeCode": "class Solution {\n  private static final int MOD = 1337;\n\n  public int superPow(int a, int[] b) {\n    int result = 1;\n    a %= MOD;\n    for (int digit : b) {\n      result = powMod(result, 10) * powMod(a, digit) % MOD;\n    }\n    return result;\n  }\n\n  private int powMod(int base, int exponent) {\n    int result = 1;\n    base %= MOD;\n    while (exponent > 0) {\n      if ((exponent & 1) == 1) result = result * base % MOD;\n      base = base * base % MOD;\n      exponent >>= 1;\n    }\n    return result;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static final int MOD = 1337;\n\n  public int superPow(int a, int[] b) {\n    return solve(a % MOD, b, b.length - 1);\n  }\n\n  private int solve(int a, int[] b, int index) {\n    if (index < 0) return 1;\n    int previous = solve(a, b, index - 1);\n    return powMod(previous, 10) * powMod(a, b[index]) % MOD;\n  }\n\n  private int powMod(int base, int exponent) {\n    if (exponent == 0) return 1;\n    int half = powMod(base, exponent / 2);\n    int result = half * half % MOD;\n    return exponent % 2 == 0 ? result : result * base % MOD;\n  }\n}",
      "optimizedCode": "class Solution {\n  private static final int MOD = 1337;\n\n  public int superPow(int a, int[] b) {\n    int result = 1;\n    a %= MOD;\n    for (int digit : b) {\n      result = powMod(result, 10) * powMod(a, digit) % MOD;\n    }\n    return result;\n  }\n\n  private int powMod(int base, int exponent) {\n    int result = 1;\n    base %= MOD;\n    while (exponent > 0) {\n      if ((exponent & 1) == 1) result = result * base % MOD;\n      base = base * base % MOD;\n      exponent >>= 1;\n    }\n    return result;\n  }\n}",
      "code": "class Solution {\n  private static final int MOD = 1337;\n\n  public int superPow(int a, int[] b) {\n    int result = 1;\n    a %= MOD;\n    for (int digit : b) {\n      result = powMod(result, 10) * powMod(a, digit) % MOD;\n    }\n    return result;\n  }\n\n  private int powMod(int base, int exponent) {\n    int result = 1;\n    base %= MOD;\n    while (exponent > 0) {\n      if ((exponent & 1) == 1) result = result * base % MOD;\n      base = base * base % MOD;\n      exponent >>= 1;\n    }\n    return result;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Nth Magical Number",
      "difficulty": "Hard",
      "subpattern": "LCM binary search counting",
      "question": "Given n, a, and b, return the nth positive integer divisible by either a or b, modulo 1000000007.",
      "trigger": "The count of magical numbers <= x is monotonic and equals x/a + x/b - x/lcm(a,b).",
      "intuition": "Binary search the smallest x whose magical count is at least n.",
      "edgeCases": "a equals b, one divides the other, n is 1, large n requiring modulo, lcm overflow without long.",
      "constraints": "1 <= n <= 1000000000; 2 <= a, b <= 40000.",
      "source": {
        "label": "Nth Magical Number - LeetCode 878",
        "url": "https://leetcode.com/problems/nth-magical-number/"
      },
      "examples": [
        {
          "input": "n = 1, a = 2, b = 3",
          "output": "2",
          "explanation": "2 is the first number divisible by 2 or 3."
        },
        {
          "input": "n = 4, a = 2, b = 3",
          "output": "6",
          "explanation": "The sequence is 2, 3, 4, 6."
        },
        {
          "input": "n = 5, a = 2, b = 4",
          "output": "10",
          "explanation": "Numbers divisible by 2 cover the sequence."
        }
      ],
      "bruteForceComplexity": "Time O(answer); Space O(1). Count magical numbers by scanning positive integers.",
      "optimizedComplexity": "Time O(log(n * min(a,b)) * log min(a,b)); Space O(1). Binary search with LCM counting.",
      "recursiveComplexity": "Time O(log(n * min(a,b)) * log min(a,b)); Space O(log answer). Recursive binary search.",
      "bruteForceCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int nthMagicalNumber(int n, int a, int b) {\n    long value = 0;\n    int count = 0;\n    while (count < n) {\n      value++;\n      if (value % a == 0 || value % b == 0) count++;\n    }\n    return (int) (value % MOD);\n  }\n}",
      "iterativeCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int nthMagicalNumber(int n, int a, int b) {\n    long lcm = (long) a / gcd(a, b) * b;\n    long left = 1;\n    long right = (long) Math.min(a, b) * n;\n    while (left < right) {\n      long mid = left + (right - left) / 2;\n      long count = mid / a + mid / b - mid / lcm;\n      if (count >= n) right = mid;\n      else left = mid + 1;\n    }\n    return (int) (left % MOD);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int nthMagicalNumber(int n, int a, int b) {\n    long lcm = (long) a / gcd(a, b) * b;\n    long answer = search(1, (long) Math.min(a, b) * n, n, a, b, lcm);\n    return (int) (answer % MOD);\n  }\n\n  private long search(long left, long right, int n, int a, int b, long lcm) {\n    if (left == right) return left;\n    long mid = left + (right - left) / 2;\n    long count = mid / a + mid / b - mid / lcm;\n    if (count >= n) return search(left, mid, n, a, b, lcm);\n    return search(mid + 1, right, n, a, b, lcm);\n  }\n\n  private int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int nthMagicalNumber(int n, int a, int b) {\n    long lcm = (long) a / gcd(a, b) * b;\n    long left = 1;\n    long right = (long) Math.min(a, b) * n;\n    while (left < right) {\n      long mid = left + (right - left) / 2;\n      long count = mid / a + mid / b - mid / lcm;\n      if (count >= n) right = mid;\n      else left = mid + 1;\n    }\n    return (int) (left % MOD);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}",
      "code": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int nthMagicalNumber(int n, int a, int b) {\n    long lcm = (long) a / gcd(a, b) * b;\n    long left = 1;\n    long right = (long) Math.min(a, b) * n;\n    while (left < right) {\n      long mid = left + (right - left) / 2;\n      long count = mid / a + mid / b - mid / lcm;\n      if (count >= n) right = mid;\n      else left = mid + 1;\n    }\n    return (int) (left % MOD);\n  }\n\n  private int gcd(int a, int b) {\n    while (b != 0) {\n      int remainder = a % b;\n      a = b;\n      b = remainder;\n    }\n    return a;\n  }\n}"
    }
  ],
  "checklist": [
    "Look for divisibility, modulo wraparound, or a repeated remainder state.",
    "Check whether GCD, LCM, or Bezout identity decides reachability or periodicity.",
    "For digit problems, split by place value, carry direction, or repeated digit signature.",
    "When answer validity is monotonic, binary search the numeric answer instead of scanning.",
    "When exponent, permutation rank, or combinations are involved, use logarithmic/factorial/binomial structure."
  ],
  "traps": [
    "Negating Integer.MIN_VALUE before converting to long.",
    "Using int for multiplication in square, LCM, or binary-search bounds.",
    "Forgetting that Excel column titles are 1-indexed base 26.",
    "Treating repeated decimal digits as repeated output instead of repeated remainders.",
    "Missing duplicate candidate advancement in Ugly Number II.",
    "Using floating-point square root or logarithm without exact integer adjustment.",
    "Skipping modulo after every multiplication in modular exponentiation."
  ],
  "edgeCases": [
    "Zero and one, especially in factorial, power, square root, and happy-number problems.",
    "Negative inputs and sign handling for reverse integer and fractions.",
    "Boundary values near Integer.MAX_VALUE and Integer.MIN_VALUE.",
    "Cases where a divides b or gcd(a,b) is not 1.",
    "All 9s or carry-propagation through every digit.",
    "Repeating cycles that start after a non-repeating prefix.",
    "One-indexed inputs such as kth permutation and Excel columns."
  ],
  "complexities": [
    "Modulo scans are usually O(n) unless a cycle or formula removes the scan.",
    "Euclidean GCD is O(log min(a,b)) and often unlocks O(1) reachability checks.",
    "Sieve prime counting is O(n log log n) time and O(n) space.",
    "Fast exponentiation and modular exponentiation are O(log exponent) per power.",
    "Digit-place contribution problems usually take O(log10 n) time and O(1) space.",
    "Binary search on numeric answers costs O(log answer) predicate checks.",
    "Combinatorics generation may be O(output), but rank/formula problems can avoid full generation."
  ],
  "mentalModel": [
    "Numbers often have hidden structure: factors, digits, places, cycles, or monotonic counts.",
    "Remainders are state; when a remainder repeats, future behavior repeats.",
    "GCD tells what step sizes can eventually reach; LCM tells when periodic events align.",
    "Carry moves from low place to high place; base conversion repeatedly divides by the base.",
    "If brute force walks values one by one, look for a formula, a cycle, or a binary-search count."
  ],
  "revisionStrategy": [
    "Day 1: redo the 12 core problems and write the exact invariant before coding.",
    "Day 3: redo Pow, Sqrt, Count Primes, Ugly Number II, and Fraction to Recurring Decimal.",
    "Day 7: group problems by trigger: digit/carry, gcd/lcm, modulo cycle, and binary search on answer.",
    "Day 14: solve the hard practice set: Permutation Sequence, Number of Digit One, Poor Pigs, and Nth Magical Number.",
    "Before interviews: implement gcd, lcm, fastPow, digit-place counting, and binary search bounds from memory."
  ],
  "unseen": [
    "Given a decimal string, return whether adding one causes every digit to change.",
    "Given two repeating events, find the first time both happen together after time t.",
    "Given n, count how many integers from 1 to n have digit sum divisible by 9.",
    "Given a huge exponent string, compute a^b modulo m where m is not prime.",
    "Given capacities of three jugs, decide whether a target amount is measurable."
  ]
};
