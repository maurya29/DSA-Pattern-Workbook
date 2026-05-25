const CURRENT_PATTERN = {
  "id": "bit-manipulation",
  "name": "Bit Manipulation",
  "summary": "Use XOR cancellation, bit masks, set-bit counting, shifts, tries, and subset masks to compress state and reason at the bit level.",
  "complete": true,
  "subpatterns": [
    "XOR pair cancellation",
    "Bit counts modulo k",
    "Partition by distinguishing bit",
    "Brian Kernighan set-bit counting",
    "DP by least significant bit",
    "Fixed-width bit reversal",
    "XOR missing-number cancellation",
    "Carry propagation bit addition",
    "Single set-bit power test",
    "Power-of-four mask test",
    "Common prefix range AND",
    "Bitwise trie maximum XOR",
    "Subset mask enumeration",
    "Byte prefix validation",
    "XOR difference counting",
    "Per-bit contribution counting",
    "Character XOR cancellation",
    "Popcount constrained enumeration",
    "Gray code generation",
    "Rolling two-bit DNA encoding",
    "Bitwise OR flip counting",
    "Word character masks",
    "Binary length concatenation modulo",
    "Popcount sort key",
    "Prefix XOR triplet counting",
    "Prefix XOR query answering",
    "Recursive mirrored binary string",
    "Gray-code inverse operations",
    "OR subset backtracking with masks",
    "Skill set bitmask DP"
  ],
  "problems": [
    {
      "group": "core",
      "name": "Single Number",
      "difficulty": "Easy",
      "subpattern": "XOR pair cancellation",
      "question": "Given a non-empty integer array where every element appears twice except one, return the element that appears once.",
      "trigger": "Pairs cancel under XOR because x ^ x = 0 and 0 ^ x = x.",
      "intuition": "XOR every value; all duplicate pairs vanish and only the unique value remains.",
      "edgeCases": "Single element, unique value is zero, negative values, duplicates adjacent or scattered, large array.",
      "constraints": "1 <= nums.length <= 30000; -30000 <= nums[i] <= 30000; exactly one value appears once and all others appear twice.",
      "source": {
        "label": "Single Number - LeetCode 136",
        "url": "https://leetcode.com/problems/single-number/"
      },
      "examples": [
        {
          "input": "nums = [2,2,1]",
          "output": "1",
          "explanation": "The pair 2 cancels under XOR."
        },
        {
          "input": "nums = [4,1,2,1,2]",
          "output": "4",
          "explanation": "All duplicated values cancel, leaving 4."
        },
        {
          "input": "nums = [1]",
          "output": "1",
          "explanation": "The only element is the single number."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Count frequencies with a hash map.",
      "optimizedComplexity": "Time O(n); Space O(1). XOR cancellation keeps one integer state.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive XOR folds the array with call-stack depth n.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int singleNumber(int[] nums) {\n    Map<Integer, Integer> count = new HashMap<>();\n    for (int num : nums) count.put(num, count.getOrDefault(num, 0) + 1);\n    for (int num : nums) {\n      if (count.get(num) == 1) return num;\n    }\n    return 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    int answer = 0;\n    for (int num : nums) {\n      answer ^= num;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    return xor(nums, 0, 0);\n  }\n\n  private int xor(int[] nums, int index, int value) {\n    if (index == nums.length) return value;\n    return xor(nums, index + 1, value ^ nums[index]);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    int answer = 0;\n    for (int num : nums) {\n      answer ^= num;\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int singleNumber(int[] nums) {\n    int answer = 0;\n    for (int num : nums) {\n      answer ^= num;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Single Number II",
      "difficulty": "Medium",
      "subpattern": "Bit counts modulo k",
      "question": "Given an integer array where every element appears three times except one, return the element that appears once.",
      "trigger": "For each bit position, triplicated numbers contribute a multiple of three; the remainder belongs to the single number.",
      "intuition": "Track bit counts modulo three, or use two bitmasks to represent count states 0, 1, and 2.",
      "edgeCases": "Single element, negative unique number, zero as unique number, sign bit set, all duplicates scattered.",
      "constraints": "1 <= nums.length <= 30000; -2^31 <= nums[i] <= 2^31 - 1; exactly one value appears once and all others appear three times.",
      "source": {
        "label": "Single Number II - LeetCode 137",
        "url": "https://leetcode.com/problems/single-number-ii/"
      },
      "examples": [
        {
          "input": "nums = [2,2,3,2]",
          "output": "3",
          "explanation": "Bit counts modulo three recover 3."
        },
        {
          "input": "nums = [0,1,0,1,0,1,99]",
          "output": "99",
          "explanation": "0 and 1 each appear three times."
        },
        {
          "input": "nums = [-2,-2,1,1,4,1,4,4,-4,-2]",
          "output": "-4",
          "explanation": "The sign bit is reconstructed correctly."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Count frequencies with a hash map.",
      "optimizedComplexity": "Time O(n); Space O(1). Two masks track bit counts modulo three.",
      "recursiveComplexity": "Time O(32n); Space O(32). Recursively rebuild each bit from counts modulo three.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int singleNumber(int[] nums) {\n    Map<Integer, Integer> count = new HashMap<>();\n    for (int num : nums) count.put(num, count.getOrDefault(num, 0) + 1);\n    for (Map.Entry<Integer, Integer> entry : count.entrySet()) {\n      if (entry.getValue() == 1) return entry.getKey();\n    }\n    return 0;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    int ones = 0;\n    int twos = 0;\n    for (int num : nums) {\n      ones = (ones ^ num) & ~twos;\n      twos = (twos ^ num) & ~ones;\n    }\n    return ones;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    return build(nums, 0, 0);\n  }\n\n  private int build(int[] nums, int bit, int answer) {\n    if (bit == 32) return answer;\n    int count = 0;\n    for (int num : nums) count += (num >>> bit) & 1;\n    if (count % 3 != 0) answer |= (1 << bit);\n    return build(nums, bit + 1, answer);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int singleNumber(int[] nums) {\n    int ones = 0;\n    int twos = 0;\n    for (int num : nums) {\n      ones = (ones ^ num) & ~twos;\n      twos = (twos ^ num) & ~ones;\n    }\n    return ones;\n  }\n}",
      "code": "class Solution {\n  public int singleNumber(int[] nums) {\n    int ones = 0;\n    int twos = 0;\n    for (int num : nums) {\n      ones = (ones ^ num) & ~twos;\n      twos = (twos ^ num) & ~ones;\n    }\n    return ones;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Single Number III",
      "difficulty": "Medium",
      "subpattern": "Partition by distinguishing bit",
      "question": "Given an array where exactly two elements appear once and all others appear twice, return the two single elements.",
      "trigger": "The XOR of the two unique values has at least one set bit where those values differ.",
      "intuition": "Use a set bit from xorAll to split numbers into two groups; duplicates stay together and cancel inside each group.",
      "edgeCases": "Negative values, one unique value is zero, distinguishing bit is sign bit, output order irrelevant, scattered duplicates.",
      "constraints": "2 <= nums.length <= 30000; exactly two elements appear once and all others appear twice.",
      "source": {
        "label": "Single Number III - LeetCode 260",
        "url": "https://leetcode.com/problems/single-number-iii/"
      },
      "examples": [
        {
          "input": "nums = [1,2,1,3,2,5]",
          "output": "[3,5]",
          "explanation": "The two unique numbers fall into different bit groups."
        },
        {
          "input": "nums = [-1,0]",
          "output": "[-1,0]",
          "explanation": "Both values appear once."
        },
        {
          "input": "nums = [0,1]",
          "output": "[0,1]",
          "explanation": "The distinguishing bit separates 0 and 1."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Count frequencies and collect values with count one.",
      "optimizedComplexity": "Time O(n); Space O(1). XOR partitioning uses one distinguishing bit.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive fold computes each partition XOR.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] singleNumber(int[] nums) {\n    Map<Integer, Integer> count = new HashMap<>();\n    for (int num : nums) count.put(num, count.getOrDefault(num, 0) + 1);\n    int[] answer = new int[2];\n    int index = 0;\n    for (int num : nums) {\n      if (count.get(num) == 1) answer[index++] = num;\n      if (index == 2) break;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] singleNumber(int[] nums) {\n    int xorAll = 0;\n    for (int num : nums) xorAll ^= num;\n    int mask = xorAll & -xorAll;\n\n    int first = 0;\n    int second = 0;\n    for (int num : nums) {\n      if ((num & mask) == 0) first ^= num;\n      else second ^= num;\n    }\n    return new int[] {first, second};\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] singleNumber(int[] nums) {\n    int xorAll = fold(nums, 0, 0);\n    int mask = xorAll & -xorAll;\n    return new int[] {foldGroup(nums, 0, mask, false, 0), foldGroup(nums, 0, mask, true, 0)};\n  }\n\n  private int fold(int[] nums, int index, int value) {\n    if (index == nums.length) return value;\n    return fold(nums, index + 1, value ^ nums[index]);\n  }\n\n  private int foldGroup(int[] nums, int index, int mask, boolean set, int value) {\n    if (index == nums.length) return value;\n    boolean belongs = (nums[index] & mask) != 0;\n    return foldGroup(nums, index + 1, mask, set, belongs == set ? value ^ nums[index] : value);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] singleNumber(int[] nums) {\n    int xorAll = 0;\n    for (int num : nums) xorAll ^= num;\n    int mask = xorAll & -xorAll;\n\n    int first = 0;\n    int second = 0;\n    for (int num : nums) {\n      if ((num & mask) == 0) first ^= num;\n      else second ^= num;\n    }\n    return new int[] {first, second};\n  }\n}",
      "code": "class Solution {\n  public int[] singleNumber(int[] nums) {\n    int xorAll = 0;\n    for (int num : nums) xorAll ^= num;\n    int mask = xorAll & -xorAll;\n\n    int first = 0;\n    int second = 0;\n    for (int num : nums) {\n      if ((num & mask) == 0) first ^= num;\n      else second ^= num;\n    }\n    return new int[] {first, second};\n  }\n}"
    },
    {
      "group": "core",
      "name": "Number of 1 Bits",
      "difficulty": "Easy",
      "subpattern": "Brian Kernighan set-bit counting",
      "question": "Given a 32-bit integer n, return the number of set bits in its binary representation.",
      "trigger": "The operation n & (n - 1) removes the lowest set bit each time.",
      "intuition": "Repeatedly clear one set bit and count how many clears are needed.",
      "edgeCases": "n is zero, n is negative, only sign bit set, all bits set, one set bit.",
      "constraints": "Input is treated as a 32-bit signed integer; return the count of 1 bits in its binary representation.",
      "source": {
        "label": "Number of 1 Bits - LeetCode 191",
        "url": "https://leetcode.com/problems/number-of-1-bits/"
      },
      "examples": [
        {
          "input": "n = 00000000000000000000000000001011",
          "output": "3",
          "explanation": "Three bits are set."
        },
        {
          "input": "n = 00000000000000000000000010000000",
          "output": "1",
          "explanation": "Only one bit is set."
        },
        {
          "input": "n = 11111111111111111111111111111101",
          "output": "31",
          "explanation": "All but one bit are set."
        }
      ],
      "bruteForceComplexity": "Time O(32); Space O(1). Check every bit position.",
      "optimizedComplexity": "Time O(number of set bits); Space O(1). Kernighan clears one set bit per loop.",
      "recursiveComplexity": "Time O(number of set bits); Space O(number of set bits). Recursive Kernighan clearing.",
      "bruteForceCode": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    for (int bit = 0; bit < 32; bit++) {\n      count += (n >>> bit) & 1;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n      n &= n - 1;\n      count++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int hammingWeight(int n) {\n    return count(n, 0);\n  }\n\n  private int count(int value, int total) {\n    if (value == 0) return total;\n    return count(value & (value - 1), total + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n      n &= n - 1;\n      count++;\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n      n &= n - 1;\n      count++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Counting Bits",
      "difficulty": "Easy",
      "subpattern": "DP by least significant bit",
      "question": "Given n, return an array ans where ans[i] is the number of set bits in i for every 0 <= i <= n.",
      "trigger": "The bit count of i reuses the count of i >> 1 plus the least significant bit.",
      "intuition": "Build counts from smaller numbers: bits[i] = bits[i >> 1] + (i & 1).",
      "edgeCases": "n is zero, powers of two, n just before a power of two, small n, maximum n.",
      "constraints": "0 <= n <= 100000.",
      "source": {
        "label": "Counting Bits - LeetCode 338",
        "url": "https://leetcode.com/problems/counting-bits/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "[0,1,1]",
          "explanation": "0 has no bits, 1 and 2 each have one set bit."
        },
        {
          "input": "n = 5",
          "output": "[0,1,1,2,1,2]",
          "explanation": "3 and 5 have two set bits."
        },
        {
          "input": "n = 0",
          "output": "[0]",
          "explanation": "Only zero is included."
        }
      ],
      "bruteForceComplexity": "Time O(n log n); Space O(1) excluding output. Count bits independently for every number.",
      "optimizedComplexity": "Time O(n); Space O(1) excluding output. DP reuses smaller bit counts.",
      "recursiveComplexity": "Time O(n); Space O(n). Memoized recursion computes each count once.",
      "bruteForceCode": "class Solution {\n  public int[] countBits(int n) {\n    int[] answer = new int[n + 1];\n    for (int value = 0; value <= n; value++) {\n      int x = value;\n      while (x != 0) {\n        answer[value] += x & 1;\n        x >>>= 1;\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] countBits(int n) {\n    int[] answer = new int[n + 1];\n    for (int value = 1; value <= n; value++) {\n      answer[value] = answer[value >> 1] + (value & 1);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] countBits(int n) {\n    int[] memo = new int[n + 1];\n    for (int value = 1; value <= n; value++) count(value, memo);\n    return memo;\n  }\n\n  private int count(int value, int[] memo) {\n    if (value == 0) return 0;\n    if (memo[value] != 0) return memo[value];\n    memo[value] = count(value >> 1, memo) + (value & 1);\n    return memo[value];\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] countBits(int n) {\n    int[] answer = new int[n + 1];\n    for (int value = 1; value <= n; value++) {\n      answer[value] = answer[value >> 1] + (value & 1);\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[] countBits(int n) {\n    int[] answer = new int[n + 1];\n    for (int value = 1; value <= n; value++) {\n      answer[value] = answer[value >> 1] + (value & 1);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Reverse Bits",
      "difficulty": "Easy",
      "subpattern": "Fixed-width bit reversal",
      "question": "Reverse the bits of a 32-bit unsigned integer and return the resulting integer.",
      "trigger": "The width is fixed at 32 bits, so every step shifts the answer left and appends the current lowest bit.",
      "intuition": "Read bits from right to left in n and write them left to right in the result.",
      "edgeCases": "n is zero, only one bit set, sign bit set, all bits set, leading zeros must be preserved.",
      "constraints": "Input is a 32-bit integer; treat it as unsigned for bit movement.",
      "source": {
        "label": "Reverse Bits - LeetCode 190",
        "url": "https://leetcode.com/problems/reverse-bits/"
      },
      "examples": [
        {
          "input": "n = 00000010100101000001111010011100",
          "output": "964176192",
          "explanation": "The reversed bit pattern is 00111001011110000010100101000000."
        },
        {
          "input": "n = 11111111111111111111111111111101",
          "output": "3221225471",
          "explanation": "The unsigned result has the high bits set."
        },
        {
          "input": "n = 00000000000000000000000000000000",
          "output": "0",
          "explanation": "Reversing zero stays zero."
        }
      ],
      "bruteForceComplexity": "Time O(32); Space O(32). Store all bits then rebuild in reverse order.",
      "optimizedComplexity": "Time O(32); Space O(1). Shift the answer and consume one bit per step.",
      "recursiveComplexity": "Time O(32); Space O(32). Recursive fixed-width bit transfer.",
      "bruteForceCode": "class Solution {\n  public int reverseBits(int n) {\n    int[] bits = new int[32];\n    for (int i = 0; i < 32; i++) bits[i] = (n >>> i) & 1;\n    int answer = 0;\n    for (int i = 0; i < 32; i++) {\n      answer = (answer << 1) | bits[i];\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int reverseBits(int n) {\n    int answer = 0;\n    for (int i = 0; i < 32; i++) {\n      answer = (answer << 1) | (n & 1);\n      n >>>= 1;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int reverseBits(int n) {\n    return reverse(n, 32, 0);\n  }\n\n  private int reverse(int n, int remaining, int answer) {\n    if (remaining == 0) return answer;\n    return reverse(n >>> 1, remaining - 1, (answer << 1) | (n & 1));\n  }\n}",
      "optimizedCode": "class Solution {\n  public int reverseBits(int n) {\n    int answer = 0;\n    for (int i = 0; i < 32; i++) {\n      answer = (answer << 1) | (n & 1);\n      n >>>= 1;\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int reverseBits(int n) {\n    int answer = 0;\n    for (int i = 0; i < 32; i++) {\n      answer = (answer << 1) | (n & 1);\n      n >>>= 1;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Missing Number",
      "difficulty": "Easy",
      "subpattern": "XOR missing-number cancellation",
      "question": "Given nums containing n distinct numbers from the range [0, n], return the only number missing from the array.",
      "trigger": "XORing all indexes and values cancels every present number, leaving the missing number.",
      "intuition": "Start with n, then XOR each index and nums[index].",
      "edgeCases": "Missing zero, missing n, n equals one, unsorted input, array contains zero.",
      "constraints": "1 <= nums.length <= 10000; 0 <= nums[i] <= n; all values are unique.",
      "source": {
        "label": "Missing Number - LeetCode 268",
        "url": "https://leetcode.com/problems/missing-number/"
      },
      "examples": [
        {
          "input": "nums = [3,0,1]",
          "output": "2",
          "explanation": "2 is absent from 0..3."
        },
        {
          "input": "nums = [0,1]",
          "output": "2",
          "explanation": "n itself is missing."
        },
        {
          "input": "nums = [9,6,4,2,3,5,7,0,1]",
          "output": "8",
          "explanation": "8 is the only missing value."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(n). Mark present values in a boolean array.",
      "optimizedComplexity": "Time O(n); Space O(1). XOR indexes and values to cancel present numbers.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive XOR fold uses call-stack depth n.",
      "bruteForceCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    boolean[] seen = new boolean[nums.length + 1];\n    for (int num : nums) seen[num] = true;\n    for (int value = 0; value < seen.length; value++) {\n      if (!seen[value]) return value;\n    }\n    return -1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    int answer = nums.length;\n    for (int i = 0; i < nums.length; i++) {\n      answer ^= i;\n      answer ^= nums[i];\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    return fold(nums, 0, nums.length);\n  }\n\n  private int fold(int[] nums, int index, int value) {\n    if (index == nums.length) return value;\n    return fold(nums, index + 1, value ^ index ^ nums[index]);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int missingNumber(int[] nums) {\n    int answer = nums.length;\n    for (int i = 0; i < nums.length; i++) {\n      answer ^= i;\n      answer ^= nums[i];\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int missingNumber(int[] nums) {\n    int answer = nums.length;\n    for (int i = 0; i < nums.length; i++) {\n      answer ^= i;\n      answer ^= nums[i];\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Sum of Two Integers",
      "difficulty": "Medium",
      "subpattern": "Carry propagation bit addition",
      "question": "Given two integers a and b, return their sum without using the + or - operators.",
      "trigger": "XOR computes bitwise sum without carry, and AND shifted left computes the carry bits.",
      "intuition": "Repeat sum-without-carry and carry propagation until no carry remains.",
      "edgeCases": "Negative numbers, zero, overflow behavior, opposite signs, carry chain across many bits.",
      "constraints": "-1000 <= a, b <= 1000; Java int two's-complement behavior applies.",
      "source": {
        "label": "Sum of Two Integers - LeetCode 371",
        "url": "https://leetcode.com/problems/sum-of-two-integers/"
      },
      "examples": [
        {
          "input": "a = 1, b = 2",
          "output": "3",
          "explanation": "XOR gives 3 and carry becomes zero."
        },
        {
          "input": "a = 2, b = 3",
          "output": "5",
          "explanation": "Carry propagates once."
        },
        {
          "input": "a = -2, b = 3",
          "output": "1",
          "explanation": "Two's-complement bit addition handles signs."
        }
      ],
      "bruteForceComplexity": "Time O(|b|) for small positive/negative b; Space O(1). Increment or decrement one step at a time.",
      "optimizedComplexity": "Time O(32); Space O(1). Carry propagation finishes within fixed int width.",
      "recursiveComplexity": "Time O(32); Space O(32). Recursive carry propagation until b becomes zero.",
      "bruteForceCode": "class Solution {\n  public int getSum(int a, int b) {\n    while (b > 0) {\n      a++;\n      b--;\n    }\n    while (b < 0) {\n      a--;\n      b++;\n    }\n    return a;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int getSum(int a, int b) {\n    while (b != 0) {\n      int carry = (a & b) << 1;\n      a ^= b;\n      b = carry;\n    }\n    return a;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int getSum(int a, int b) {\n    if (b == 0) {\n      return a;\n    }\n    int partial = a ^ b;\n    int carry = (a & b) << 1;\n    return getSum(partial, carry);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int getSum(int a, int b) {\n    while (b != 0) {\n      int carry = (a & b) << 1;\n      a ^= b;\n      b = carry;\n    }\n    return a;\n  }\n}",
      "code": "class Solution {\n  public int getSum(int a, int b) {\n    while (b != 0) {\n      int carry = (a & b) << 1;\n      a ^= b;\n      b = carry;\n    }\n    return a;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Power of Two",
      "difficulty": "Easy",
      "subpattern": "Single set-bit power test",
      "question": "Given an integer n, return true if it is a power of two.",
      "trigger": "A positive power of two has exactly one set bit.",
      "intuition": "For positive n, n & (n - 1) clears the only set bit only when n is a power of two.",
      "edgeCases": "n is zero, n is negative, n is one, maximum power of two, odd non-one numbers.",
      "constraints": "-2^31 <= n <= 2^31 - 1.",
      "source": {
        "label": "Power of Two - LeetCode 231",
        "url": "https://leetcode.com/problems/power-of-two/"
      },
      "examples": [
        {
          "input": "n = 1",
          "output": "true",
          "explanation": "2^0 equals 1."
        },
        {
          "input": "n = 16",
          "output": "true",
          "explanation": "16 has one set bit."
        },
        {
          "input": "n = 3",
          "output": "false",
          "explanation": "3 has two set bits."
        }
      ],
      "bruteForceComplexity": "Time O(log n); Space O(1). Repeatedly divide by two.",
      "optimizedComplexity": "Time O(1); Space O(1). One bit trick checks the set-bit count.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive divisibility by two.",
      "bruteForceCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n <= 0) return false;\n    while (n % 2 == 0) {\n      n /= 2;\n    }\n    return n == 1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n <= 0) {\n      return false;\n    }\n    return (n & (n - 1)) == 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n == 1) return true;\n    if (n <= 0 || n % 2 != 0) {\n      return false;\n    }\n    return isPowerOfTwo(n / 2);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n <= 0) {\n      return false;\n    }\n    return (n & (n - 1)) == 0;\n  }\n}",
      "code": "class Solution {\n  public boolean isPowerOfTwo(int n) {\n    if (n <= 0) {\n      return false;\n    }\n    return (n & (n - 1)) == 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Power of Four",
      "difficulty": "Easy",
      "subpattern": "Power-of-four mask test",
      "question": "Given an integer n, return true if it is a power of four.",
      "trigger": "A power of four is a positive power of two whose only set bit is in an even bit position.",
      "intuition": "Check one set bit, then ensure that bit lies under mask 0x55555555.",
      "edgeCases": "n is zero, n is negative, n is one, power of two but not four, sign bit set.",
      "constraints": "-2^31 <= n <= 2^31 - 1.",
      "source": {
        "label": "Power of Four - LeetCode 342",
        "url": "https://leetcode.com/problems/power-of-four/"
      },
      "examples": [
        {
          "input": "n = 16",
          "output": "true",
          "explanation": "16 is 4^2."
        },
        {
          "input": "n = 5",
          "output": "false",
          "explanation": "5 is not a power of four."
        },
        {
          "input": "n = 1",
          "output": "true",
          "explanation": "1 is 4^0."
        }
      ],
      "bruteForceComplexity": "Time O(log n); Space O(1). Repeatedly divide by four.",
      "optimizedComplexity": "Time O(1); Space O(1). Single-bit test plus even-position mask.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Recursive divisibility by four.",
      "bruteForceCode": "class Solution {\n  public boolean isPowerOfFour(int n) {\n    if (n <= 0) return false;\n    while (n % 4 == 0) {\n      n /= 4;\n    }\n    return n == 1;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean isPowerOfFour(int n) {\n    if (n <= 0) {\n      return false;\n    }\n    boolean singleBit = (n & (n - 1)) == 0;\n    return singleBit && (n & 0x55555555) != 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean isPowerOfFour(int n) {\n    if (n == 1) return true;\n    if (n <= 0 || n % 4 != 0) {\n      return false;\n    }\n    return isPowerOfFour(n / 4);\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean isPowerOfFour(int n) {\n    if (n <= 0) {\n      return false;\n    }\n    boolean singleBit = (n & (n - 1)) == 0;\n    return singleBit && (n & 0x55555555) != 0;\n  }\n}",
      "code": "class Solution {\n  public boolean isPowerOfFour(int n) {\n    if (n <= 0) {\n      return false;\n    }\n    boolean singleBit = (n & (n - 1)) == 0;\n    return singleBit && (n & 0x55555555) != 0;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Bitwise AND of Numbers Range",
      "difficulty": "Medium",
      "subpattern": "Common prefix range AND",
      "question": "Given two integers left and right, return the bitwise AND of every number in the inclusive range [left, right].",
      "trigger": "A continuous range clears every bit that changes; only the common binary prefix survives.",
      "intuition": "Shift both endpoints right until they match, then shift the shared prefix back to its original position.",
      "edgeCases": "left equals right, range includes zero, very wide range, endpoints near Integer.MAX_VALUE, one-bit ranges.",
      "constraints": "0 <= left <= right <= 2147483647.",
      "source": {
        "label": "Bitwise AND of Numbers Range - LeetCode 201",
        "url": "https://leetcode.com/problems/bitwise-and-of-numbers-range/"
      },
      "examples": [
        {
          "input": "left = 5, right = 7",
          "output": "4",
          "explanation": "5, 6, and 7 share only the 100 prefix."
        },
        {
          "input": "left = 0, right = 0",
          "output": "0",
          "explanation": "The range has one value."
        },
        {
          "input": "left = 1, right = 2147483647",
          "output": "0",
          "explanation": "Every low bit changes somewhere in the range."
        }
      ],
      "bruteForceComplexity": "Time O(right - left + 1); Space O(1). AND every value in the range.",
      "optimizedComplexity": "Time O(log right); Space O(1). Strip changing suffix bits until both endpoints share a prefix.",
      "recursiveComplexity": "Time O(log right); Space O(log right). Recursively shrink both endpoints to their common prefix.",
      "bruteForceCode": "class Solution {\n  public int rangeBitwiseAnd(int left, int right) {\n    int answer = left;\n    for (long value = (long) left + 1; value <= right && answer != 0; value++) {\n      answer &= (int) value;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int rangeBitwiseAnd(int left, int right) {\n    int shifts = 0;\n    while (left < right) {\n      left >>= 1;\n      right >>= 1;\n      shifts++;\n    }\n    return left << shifts;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int rangeBitwiseAnd(int left, int right) {\n    if (left == right) {\n      return left;\n    }\n    int prefix = rangeBitwiseAnd(left >> 1, right >> 1);\n    return prefix << 1;\n  }\n}",
      "optimizedCode": "class Solution {\n  public int rangeBitwiseAnd(int left, int right) {\n    int shifts = 0;\n    while (left < right) {\n      left >>= 1;\n      right >>= 1;\n      shifts++;\n    }\n    return left << shifts;\n  }\n}",
      "code": "class Solution {\n  public int rangeBitwiseAnd(int left, int right) {\n    int shifts = 0;\n    while (left < right) {\n      left >>= 1;\n      right >>= 1;\n      shifts++;\n    }\n    return left << shifts;\n  }\n}"
    },
    {
      "group": "core",
      "name": "Maximum XOR of Two Numbers in an Array",
      "difficulty": "Medium",
      "subpattern": "Bitwise trie maximum XOR",
      "question": "Given an integer array nums, return the maximum value of nums[i] XOR nums[j] for any two indices i and j.",
      "trigger": "Maximizing XOR means choosing the opposite bit greedily from the most significant bit downward.",
      "intuition": "Insert numbers into a binary trie and, for each number, walk toward opposite bits whenever possible.",
      "edgeCases": "Single element, duplicate values, all zeros, numbers with different bit lengths, maximum value near 2^31 - 1.",
      "constraints": "1 <= nums.length <= 200000; 0 <= nums[i] <= 2147483647.",
      "source": {
        "label": "Maximum XOR of Two Numbers in an Array - LeetCode 421",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
      },
      "examples": [
        {
          "input": "nums = [3,10,5,25,2,8]",
          "output": "28",
          "explanation": "5 XOR 25 equals 28."
        },
        {
          "input": "nums = [14,70,53,83,49,91,36,80,92,51,66,70]",
          "output": "127",
          "explanation": "A pair can set every low seven bits."
        },
        {
          "input": "nums = [0]",
          "output": "0",
          "explanation": "Only one value is available."
        }
      ],
      "bruteForceComplexity": "Time O(n^2); Space O(1). Test every pair.",
      "optimizedComplexity": "Time O(31n); Space O(31n). A binary trie answers each best partner query by bit.",
      "recursiveComplexity": "Time O(31n); Space O(31n + 31). Trie query recurses over bit positions.",
      "bruteForceCode": "class Solution {\n  public int findMaximumXOR(int[] nums) {\n    int best = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        best = Math.max(best, nums[i] ^ nums[j]);\n      }\n    }\n    return best;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num);\n\n    int best = 0;\n    for (int num : nums) best = Math.max(best, query(root, num));\n    return best;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int value = (num >>> bit) & 1;\n      if (node.next[value] == null) node.next[value] = new Node();\n      node = node.next[value];\n    }\n  }\n\n  private int query(Node root, int num) {\n    Node node = root;\n    int xor = 0;\n    for (int bit = 30; bit >= 0; bit--) {\n      int value = (num >>> bit) & 1;\n      int wanted = value ^ 1;\n      if (node.next[wanted] != null) {\n        xor |= 1 << bit;\n        node = node.next[wanted];\n      } else {\n        node = node.next[value];\n      }\n    }\n    return xor;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num, 30);\n\n    int best = 0;\n    for (int num : nums) best = Math.max(best, query(root, num, 30));\n    return best;\n  }\n\n  private void insert(Node node, int num, int bit) {\n    if (bit < 0) return;\n    int value = (num >>> bit) & 1;\n    if (node.next[value] == null) node.next[value] = new Node();\n    insert(node.next[value], num, bit - 1);\n  }\n\n  private int query(Node node, int num, int bit) {\n    if (bit < 0) return 0;\n    int value = (num >>> bit) & 1;\n    int wanted = value ^ 1;\n    if (node.next[wanted] != null) return (1 << bit) | query(node.next[wanted], num, bit - 1);\n    return query(node.next[value], num, bit - 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num);\n\n    int best = 0;\n    for (int num : nums) best = Math.max(best, query(root, num));\n    return best;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int value = (num >>> bit) & 1;\n      if (node.next[value] == null) node.next[value] = new Node();\n      node = node.next[value];\n    }\n  }\n\n  private int query(Node root, int num) {\n    Node node = root;\n    int xor = 0;\n    for (int bit = 30; bit >= 0; bit--) {\n      int value = (num >>> bit) & 1;\n      int wanted = value ^ 1;\n      if (node.next[wanted] != null) {\n        xor |= 1 << bit;\n        node = node.next[wanted];\n      } else {\n        node = node.next[value];\n      }\n    }\n    return xor;\n  }\n}",
      "code": "class Solution {\n  private static class Node {\n    Node[] next = new Node[2];\n  }\n\n  public int findMaximumXOR(int[] nums) {\n    Node root = new Node();\n    for (int num : nums) insert(root, num);\n\n    int best = 0;\n    for (int num : nums) best = Math.max(best, query(root, num));\n    return best;\n  }\n\n  private void insert(Node root, int num) {\n    Node node = root;\n    for (int bit = 30; bit >= 0; bit--) {\n      int value = (num >>> bit) & 1;\n      if (node.next[value] == null) node.next[value] = new Node();\n      node = node.next[value];\n    }\n  }\n\n  private int query(Node root, int num) {\n    Node node = root;\n    int xor = 0;\n    for (int bit = 30; bit >= 0; bit--) {\n      int value = (num >>> bit) & 1;\n      int wanted = value ^ 1;\n      if (node.next[wanted] != null) {\n        xor |= 1 << bit;\n        node = node.next[wanted];\n      } else {\n        node = node.next[value];\n      }\n    }\n    return xor;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Subsets",
      "difficulty": "Medium",
      "subpattern": "Subset mask enumeration",
      "question": "Given an integer array nums of unique elements, return all possible subsets of nums in any order.",
      "trigger": "Every element has exactly two states: excluded or included, which maps directly to one bit in a mask.",
      "intuition": "Count from 0 to 2^n - 1 and treat each binary representation as one subset.",
      "edgeCases": "Empty input, one element, negative values, order of subsets is flexible, n close to the exponential limit.",
      "constraints": "0 <= nums.length <= 10; all nums values are unique.",
      "source": {
        "label": "Subsets - LeetCode 78",
        "url": "https://leetcode.com/problems/subsets/"
      },
      "examples": [
        {
          "input": "nums = [1,2,3]",
          "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
          "explanation": "Each of the three values can be present or absent."
        },
        {
          "input": "nums = [0]",
          "output": "[[],[0]]",
          "explanation": "One bit gives two subsets."
        },
        {
          "input": "nums = []",
          "output": "[[]]",
          "explanation": "The empty set has exactly one subset."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(n * 2^n). Build one subset for each mask.",
      "optimizedComplexity": "Time O(n * 2^n); Space O(n * 2^n). Iteratively clone existing subsets when adding each value.",
      "recursiveComplexity": "Time O(n * 2^n); Space O(n * 2^n + n). Backtracking branches include/exclude for each value.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    int total = 1 << nums.length;\n    for (int mask = 0; mask < total; mask++) {\n      List<Integer> subset = new ArrayList<>();\n      for (int bit = 0; bit < nums.length; bit++) {\n        if (((mask >>> bit) & 1) == 1) subset.add(nums[bit]);\n      }\n      answer.add(subset);\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    backtrack(nums, 0, new ArrayList<>(), answer);\n    return answer;\n  }\n\n  private void backtrack(int[] nums, int index, List<Integer> path, List<List<Integer>> answer) {\n    if (index == nums.length) {\n      answer.add(new ArrayList<>(path));\n      return;\n    }\n    backtrack(nums, index + 1, path, answer);\n    path.add(nums[index]);\n    backtrack(nums, index + 1, path, answer);\n    path.remove(path.size() - 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> answer = new ArrayList<>();\n    answer.add(new ArrayList<>());\n    for (int num : nums) {\n      int size = answer.size();\n      for (int i = 0; i < size; i++) {\n        List<Integer> next = new ArrayList<>(answer.get(i));\n        next.add(num);\n        answer.add(next);\n      }\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "UTF-8 Validation",
      "difficulty": "Medium",
      "subpattern": "Byte prefix validation",
      "question": "Given an integer array data where each integer represents one byte, return true if it is a valid UTF-8 encoding.",
      "trigger": "UTF-8 validity is decided by leading-bit prefixes: 0, 110, 1110, 11110, and continuation bytes 10.",
      "intuition": "Track how many continuation bytes are still required after reading a leading byte.",
      "edgeCases": "Continuation byte without a leader, leader requiring too many bytes, incomplete sequence at the end, values above 255 masked to one byte, single-byte ASCII.",
      "constraints": "1 <= data.length <= 20000; 0 <= data[i] <= 255.",
      "source": {
        "label": "UTF-8 Validation - LeetCode 393",
        "url": "https://leetcode.com/problems/utf-8-validation/"
      },
      "examples": [
        {
          "input": "data = [197,130,1]",
          "output": "true",
          "explanation": "197 starts a two-byte sequence, 130 continues it, and 1 is ASCII."
        },
        {
          "input": "data = [235,140,4]",
          "output": "false",
          "explanation": "235 starts a three-byte sequence, but 4 is not a continuation byte."
        },
        {
          "input": "data = [145]",
          "output": "false",
          "explanation": "145 has prefix 10 and cannot start a character."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1) excluding temporary byte strings. Convert each byte to an 8-character binary form.",
      "optimizedComplexity": "Time O(n); Space O(1). Use bit masks and a remaining-continuations counter.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively validate one byte while carrying remaining continuation count.",
      "bruteForceCode": "class Solution {\n  public boolean validUtf8(int[] data) {\n    int index = 0;\n    while (index < data.length) {\n      String bits = toByteString(data[index]);\n      int count = leadingOnes(bits);\n      if (count == 0) {\n        index++;\n        continue;\n      }\n      if (count == 1 || count > 4 || index + count > data.length) return false;\n      for (int offset = 1; offset < count; offset++) {\n        if (!toByteString(data[index + offset]).startsWith(\"10\")) return false;\n      }\n      index += count;\n    }\n    return true;\n  }\n\n  private String toByteString(int value) {\n    String bits = Integer.toBinaryString(value & 255);\n    StringBuilder padded = new StringBuilder();\n    for (int i = bits.length(); i < 8; i++) padded.append('0');\n    return padded.append(bits).toString();\n  }\n\n  private int leadingOnes(String bits) {\n    int count = 0;\n    while (count < bits.length() && bits.charAt(count) == '1') count++;\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public boolean validUtf8(int[] data) {\n    int remaining = 0;\n    for (int value : data) {\n      int b = value & 255;\n      if (remaining == 0) {\n        if ((b >>> 7) == 0) continue;\n        if ((b >>> 5) == 0b110) remaining = 1;\n        else if ((b >>> 4) == 0b1110) remaining = 2;\n        else if ((b >>> 3) == 0b11110) remaining = 3;\n        else return false;\n      } else {\n        if ((b >>> 6) != 0b10) return false;\n        remaining--;\n      }\n    }\n    return remaining == 0;\n  }\n}",
      "recursiveCode": "class Solution {\n  public boolean validUtf8(int[] data) {\n    return validate(data, 0, 0);\n  }\n\n  private boolean validate(int[] data, int index, int remaining) {\n    if (index == data.length) return remaining == 0;\n    int b = data[index] & 255;\n    if (remaining > 0) {\n      if ((b >>> 6) != 0b10) return false;\n      return validate(data, index + 1, remaining - 1);\n    }\n    if ((b >>> 7) == 0) return validate(data, index + 1, 0);\n    if ((b >>> 5) == 0b110) return validate(data, index + 1, 1);\n    if ((b >>> 4) == 0b1110) return validate(data, index + 1, 2);\n    if ((b >>> 3) == 0b11110) return validate(data, index + 1, 3);\n    return false;\n  }\n}",
      "optimizedCode": "class Solution {\n  public boolean validUtf8(int[] data) {\n    int remaining = 0;\n    for (int value : data) {\n      int b = value & 255;\n      if (remaining == 0) {\n        if ((b >>> 7) == 0) continue;\n        if ((b >>> 5) == 0b110) remaining = 1;\n        else if ((b >>> 4) == 0b1110) remaining = 2;\n        else if ((b >>> 3) == 0b11110) remaining = 3;\n        else return false;\n      } else {\n        if ((b >>> 6) != 0b10) return false;\n        remaining--;\n      }\n    }\n    return remaining == 0;\n  }\n}",
      "code": "class Solution {\n  public boolean validUtf8(int[] data) {\n    int remaining = 0;\n    for (int value : data) {\n      int b = value & 255;\n      if (remaining == 0) {\n        if ((b >>> 7) == 0) continue;\n        if ((b >>> 5) == 0b110) remaining = 1;\n        else if ((b >>> 4) == 0b1110) remaining = 2;\n        else if ((b >>> 3) == 0b11110) remaining = 3;\n        else return false;\n      } else {\n        if ((b >>> 6) != 0b10) return false;\n        remaining--;\n      }\n    }\n    return remaining == 0;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Hamming Distance",
      "difficulty": "Easy",
      "subpattern": "XOR difference counting",
      "question": "Given two integers x and y, return the number of bit positions where they are different.",
      "trigger": "XOR marks exactly the positions where two bits differ.",
      "intuition": "XOR x and y, then count the set bits in the result.",
      "edgeCases": "x equals y, one value is zero, high bits differ, all lower bits differ, values near 2^31 - 1.",
      "constraints": "0 <= x, y <= 2147483647.",
      "source": {
        "label": "Hamming Distance - LeetCode 461",
        "url": "https://leetcode.com/problems/hamming-distance/"
      },
      "examples": [
        {
          "input": "x = 1, y = 4",
          "output": "2",
          "explanation": "001 and 100 differ at two positions."
        },
        {
          "input": "x = 3, y = 1",
          "output": "1",
          "explanation": "011 and 001 differ at one position."
        },
        {
          "input": "x = 0, y = 0",
          "output": "0",
          "explanation": "No bit differs."
        }
      ],
      "bruteForceComplexity": "Time O(32); Space O(1). Compare each bit position directly.",
      "optimizedComplexity": "Time O(number of set bits in x ^ y); Space O(1). Kernighan removes one set bit per loop.",
      "recursiveComplexity": "Time O(number of set bits in x ^ y); Space O(number of set bits). Recursive Kernighan count.",
      "bruteForceCode": "class Solution {\n  public int hammingDistance(int x, int y) {\n    int count = 0;\n    for (int bit = 0; bit < 31; bit++) {\n      int xb = (x >>> bit) & 1;\n      int yb = (y >>> bit) & 1;\n      if (xb != yb) count++;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int hammingDistance(int x, int y) {\n    int diff = x ^ y;\n    int count = 0;\n    while (diff != 0) {\n      diff &= diff - 1;\n      count++;\n    }\n    return count;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int hammingDistance(int x, int y) {\n    return countBits(x ^ y);\n  }\n\n  private int countBits(int value) {\n    if (value == 0) return 0;\n    return 1 + countBits(value & (value - 1));\n  }\n}",
      "optimizedCode": "class Solution {\n  public int hammingDistance(int x, int y) {\n    int diff = x ^ y;\n    int count = 0;\n    while (diff != 0) {\n      diff &= diff - 1;\n      count++;\n    }\n    return count;\n  }\n}",
      "code": "class Solution {\n  public int hammingDistance(int x, int y) {\n    int diff = x ^ y;\n    int count = 0;\n    while (diff != 0) {\n      diff &= diff - 1;\n      count++;\n    }\n    return count;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Total Hamming Distance",
      "difficulty": "Medium",
      "subpattern": "Per-bit contribution counting",
      "question": "Given an integer array nums, return the sum of Hamming distances between every pair of numbers.",
      "trigger": "A bit contributes to pair distance when one number has 1 and the other has 0 at that bit.",
      "intuition": "For each bit, count ones and zeros; their product is the number of differing pairs for that bit.",
      "edgeCases": "Single value, all equal values, zeros mixed with high values, large n, repeated numbers.",
      "constraints": "1 <= nums.length <= 10000; 0 <= nums[i] <= 1000000000.",
      "source": {
        "label": "Total Hamming Distance - LeetCode 477",
        "url": "https://leetcode.com/problems/total-hamming-distance/"
      },
      "examples": [
        {
          "input": "nums = [4,14,2]",
          "output": "6",
          "explanation": "Pair distances are 2, 2, and 2."
        },
        {
          "input": "nums = [4,14,4]",
          "output": "4",
          "explanation": "Only pairs involving 14 differ."
        },
        {
          "input": "nums = [0,0]",
          "output": "0",
          "explanation": "No bit differs across the pair."
        }
      ],
      "bruteForceComplexity": "Time O(31n^2); Space O(1). Compute XOR distance for each pair.",
      "optimizedComplexity": "Time O(31n); Space O(1). Sum per-bit one-count times zero-count.",
      "recursiveComplexity": "Time O(31n); Space O(31). Recursively process bit positions.",
      "bruteForceCode": "class Solution {\n  public int totalHammingDistance(int[] nums) {\n    int answer = 0;\n    for (int i = 0; i < nums.length; i++) {\n      for (int j = i + 1; j < nums.length; j++) {\n        answer += Integer.bitCount(nums[i] ^ nums[j]);\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int totalHammingDistance(int[] nums) {\n    int answer = 0;\n    for (int bit = 0; bit < 31; bit++) {\n      int ones = 0;\n      for (int num : nums) ones += (num >>> bit) & 1;\n      answer += ones * (nums.length - ones);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int totalHammingDistance(int[] nums) {\n    return countByBit(nums, 0);\n  }\n\n  private int countByBit(int[] nums, int bit) {\n    if (bit == 31) return 0;\n    int ones = 0;\n    for (int num : nums) ones += (num >>> bit) & 1;\n    int contribution = ones * (nums.length - ones);\n    return contribution + countByBit(nums, bit + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int totalHammingDistance(int[] nums) {\n    int answer = 0;\n    for (int bit = 0; bit < 31; bit++) {\n      int ones = 0;\n      for (int num : nums) ones += (num >>> bit) & 1;\n      answer += ones * (nums.length - ones);\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int totalHammingDistance(int[] nums) {\n    int answer = 0;\n    for (int bit = 0; bit < 31; bit++) {\n      int ones = 0;\n      for (int num : nums) ones += (num >>> bit) & 1;\n      answer += ones * (nums.length - ones);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Find the Difference",
      "difficulty": "Easy",
      "subpattern": "Character XOR cancellation",
      "question": "Given strings s and t where t is formed by shuffling s and adding one letter, return the added letter.",
      "trigger": "All matching characters cancel under XOR, leaving the extra character.",
      "intuition": "XOR every character from both strings; duplicated letters vanish regardless of order.",
      "edgeCases": "s is empty, added character repeats an existing one, all characters same, shuffled order, extra character at either end.",
      "constraints": "0 <= s.length <= 1000; t.length == s.length + 1; s and t contain lowercase English letters.",
      "source": {
        "label": "Find the Difference - LeetCode 389",
        "url": "https://leetcode.com/problems/find-the-difference/"
      },
      "examples": [
        {
          "input": "s = \"abcd\", t = \"abcde\"",
          "output": "\"e\"",
          "explanation": "The added letter is e."
        },
        {
          "input": "s = \"\", t = \"y\"",
          "output": "\"y\"",
          "explanation": "The only character in t is extra."
        },
        {
          "input": "s = \"a\", t = \"aa\"",
          "output": "\"a\"",
          "explanation": "One a cancels and the added a remains."
        }
      ],
      "bruteForceComplexity": "Time O(n); Space O(1). Count lowercase frequencies.",
      "optimizedComplexity": "Time O(n); Space O(1). XOR all characters from both strings.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive XOR over the longer string.",
      "bruteForceCode": "class Solution {\n  public char findTheDifference(String s, String t) {\n    int[] count = new int[26];\n    for (int i = 0; i < s.length(); i++) count[s.charAt(i) - 'a']++;\n    for (int i = 0; i < t.length(); i++) {\n      int index = t.charAt(i) - 'a';\n      count[index]--;\n      if (count[index] < 0) return t.charAt(i);\n    }\n    return 'a';\n  }\n}",
      "iterativeCode": "class Solution {\n  public char findTheDifference(String s, String t) {\n    int value = 0;\n    for (int i = 0; i < s.length(); i++) value ^= s.charAt(i);\n    for (int i = 0; i < t.length(); i++) value ^= t.charAt(i);\n    return (char) value;\n  }\n}",
      "recursiveCode": "class Solution {\n  public char findTheDifference(String s, String t) {\n    return (char) xor(s, t, 0, 0);\n  }\n\n  private int xor(String s, String t, int index, int value) {\n    if (index == t.length()) return value;\n    if (index < s.length()) value ^= s.charAt(index);\n    value ^= t.charAt(index);\n    return xor(s, t, index + 1, value);\n  }\n}",
      "optimizedCode": "class Solution {\n  public char findTheDifference(String s, String t) {\n    int value = 0;\n    for (int i = 0; i < s.length(); i++) value ^= s.charAt(i);\n    for (int i = 0; i < t.length(); i++) value ^= t.charAt(i);\n    return (char) value;\n  }\n}",
      "code": "class Solution {\n  public char findTheDifference(String s, String t) {\n    int value = 0;\n    for (int i = 0; i < s.length(); i++) value ^= s.charAt(i);\n    for (int i = 0; i < t.length(); i++) value ^= t.charAt(i);\n    return (char) value;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Binary Watch",
      "difficulty": "Easy",
      "subpattern": "Popcount constrained enumeration",
      "question": "Given an integer turnedOn, return all possible times a binary watch could represent with exactly turnedOn LEDs on.",
      "trigger": "The validity condition is a fixed number of set bits split between hour bits and minute bits.",
      "intuition": "Enumerate valid hour and minute masks, and keep combinations whose popcount equals turnedOn.",
      "edgeCases": "turnedOn is 0, too many LEDs, hour must be below 12, minute must be below 60, minute needs two digits.",
      "constraints": "0 <= turnedOn <= 10.",
      "source": {
        "label": "Binary Watch - LeetCode 401",
        "url": "https://leetcode.com/problems/binary-watch/"
      },
      "examples": [
        {
          "input": "turnedOn = 1",
          "output": "[\"0:01\",\"0:02\",\"0:04\",\"0:08\",\"0:16\",\"0:32\",\"1:00\",\"2:00\",\"4:00\",\"8:00\"]",
          "explanation": "Exactly one LED can be any valid hour or minute bit."
        },
        {
          "input": "turnedOn = 9",
          "output": "[]",
          "explanation": "No valid time can use nine LEDs."
        },
        {
          "input": "turnedOn = 0",
          "output": "[\"0:00\"]",
          "explanation": "No LEDs means midnight."
        }
      ],
      "bruteForceComplexity": "Time O(12 * 60); Space O(output). Test every time.",
      "optimizedComplexity": "Time O(16 * 64); Space O(output). Enumerate raw hour and minute masks with popcount.",
      "recursiveComplexity": "Time O(2^10); Space O(output + 10). Choose LEDs recursively and prune invalid times.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> readBinaryWatch(int turnedOn) {\n    List<String> answer = new ArrayList<>();\n    for (int hour = 0; hour < 12; hour++) {\n      for (int minute = 0; minute < 60; minute++) {\n        if (Integer.bitCount(hour) + Integer.bitCount(minute) == turnedOn) {\n          answer.add(format(hour, minute));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private String format(int hour, int minute) {\n    return hour + \":\" + (minute < 10 ? \"0\" : \"\") + minute;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> readBinaryWatch(int turnedOn) {\n    List<String> answer = new ArrayList<>();\n    for (int hourMask = 0; hourMask < 16; hourMask++) {\n      if (hourMask >= 12) continue;\n      for (int minuteMask = 0; minuteMask < 64; minuteMask++) {\n        if (minuteMask < 60 && Integer.bitCount(hourMask) + Integer.bitCount(minuteMask) == turnedOn) {\n          answer.add(format(hourMask, minuteMask));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private String format(int hour, int minute) {\n    return hour + \":\" + (minute < 10 ? \"0\" : \"\") + minute;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private final int[] leds = {8, 4, 2, 1, 32, 16, 8, 4, 2, 1};\n\n  public List<String> readBinaryWatch(int turnedOn) {\n    List<String> answer = new ArrayList<>();\n    choose(0, turnedOn, 0, 0, answer);\n    return answer;\n  }\n\n  private void choose(int index, int left, int hour, int minute, List<String> answer) {\n    if (hour > 11 || minute > 59) return;\n    if (left == 0) {\n      answer.add(hour + \":\" + (minute < 10 ? \"0\" : \"\") + minute);\n      return;\n    }\n    if (index == leds.length || leds.length - index < left) return;\n\n    if (index < 4) choose(index + 1, left - 1, hour + leds[index], minute, answer);\n    else choose(index + 1, left - 1, hour, minute + leds[index], answer);\n    choose(index + 1, left, hour, minute, answer);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> readBinaryWatch(int turnedOn) {\n    List<String> answer = new ArrayList<>();\n    for (int hourMask = 0; hourMask < 16; hourMask++) {\n      if (hourMask >= 12) continue;\n      for (int minuteMask = 0; minuteMask < 64; minuteMask++) {\n        if (minuteMask < 60 && Integer.bitCount(hourMask) + Integer.bitCount(minuteMask) == turnedOn) {\n          answer.add(format(hourMask, minuteMask));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private String format(int hour, int minute) {\n    return hour + \":\" + (minute < 10 ? \"0\" : \"\") + minute;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> readBinaryWatch(int turnedOn) {\n    List<String> answer = new ArrayList<>();\n    for (int hourMask = 0; hourMask < 16; hourMask++) {\n      if (hourMask >= 12) continue;\n      for (int minuteMask = 0; minuteMask < 64; minuteMask++) {\n        if (minuteMask < 60 && Integer.bitCount(hourMask) + Integer.bitCount(minuteMask) == turnedOn) {\n          answer.add(format(hourMask, minuteMask));\n        }\n      }\n    }\n    return answer;\n  }\n\n  private String format(int hour, int minute) {\n    return hour + \":\" + (minute < 10 ? \"0\" : \"\") + minute;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Gray Code",
      "difficulty": "Medium",
      "subpattern": "Gray code generation",
      "question": "Given an integer n, return a sequence of 2^n integers where adjacent values differ by exactly one bit and the sequence starts with 0.",
      "trigger": "Gray code order is built by reflecting prior values and setting the new highest bit.",
      "intuition": "The formula i XOR (i >> 1) maps normal binary order into Gray code order.",
      "edgeCases": "n is 0, n is 1, high n creates 2^n output, first value must be 0, last and first should differ by one bit for cyclic Gray code.",
      "constraints": "0 <= n <= 16.",
      "source": {
        "label": "Gray Code - LeetCode 89",
        "url": "https://leetcode.com/problems/gray-code/"
      },
      "examples": [
        {
          "input": "n = 2",
          "output": "[0,1,3,2]",
          "explanation": "00, 01, 11, and 10 differ by one bit between neighbors."
        },
        {
          "input": "n = 1",
          "output": "[0,1]",
          "explanation": "One bit has two Gray code values."
        },
        {
          "input": "n = 0",
          "output": "[0]",
          "explanation": "There is one zero-bit code."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n) in typical search but exponential backtracking can revisit states; Space O(2^n).",
      "optimizedComplexity": "Time O(2^n); Space O(2^n). Generate each value directly with i ^ (i >> 1).",
      "recursiveComplexity": "Time O(2^n); Space O(2^n). Reflect the previous list recursively.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    int total = 1 << n;\n    boolean[] seen = new boolean[total];\n    List<Integer> path = new ArrayList<>();\n    dfs(0, n, total, seen, path);\n    return path;\n  }\n\n  private boolean dfs(int value, int n, int total, boolean[] seen, List<Integer> path) {\n    seen[value] = true;\n    path.add(value);\n    if (path.size() == total) return true;\n\n    for (int bit = 0; bit < n; bit++) {\n      int next = value ^ (1 << bit);\n      if (!seen[next] && dfs(next, n, total, seen, path)) return true;\n    }\n\n    seen[value] = false;\n    path.remove(path.size() - 1);\n    return false;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> answer = new ArrayList<>();\n    int total = 1 << n;\n    for (int value = 0; value < total; value++) {\n      answer.add(value ^ (value >> 1));\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    if (n == 0) {\n      List<Integer> base = new ArrayList<>();\n      base.add(0);\n      return base;\n    }\n\n    List<Integer> previous = grayCode(n - 1);\n    List<Integer> answer = new ArrayList<>(previous);\n    int highBit = 1 << (n - 1);\n    for (int i = previous.size() - 1; i >= 0; i--) {\n      answer.add(highBit | previous.get(i));\n    }\n    return answer;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> answer = new ArrayList<>();\n    int total = 1 << n;\n    for (int value = 0; value < total; value++) {\n      answer.add(value ^ (value >> 1));\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<Integer> grayCode(int n) {\n    List<Integer> answer = new ArrayList<>();\n    int total = 1 << n;\n    for (int value = 0; value < total; value++) {\n      answer.add(value ^ (value >> 1));\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "advanced",
      "name": "Repeated DNA Sequences",
      "difficulty": "Medium",
      "subpattern": "Rolling two-bit DNA encoding",
      "question": "Given a DNA string s, return all 10-letter-long sequences that occur more than once.",
      "trigger": "DNA has four symbols, so each character fits in two bits and a 10-letter window fits in 20 bits.",
      "intuition": "Slide a fixed window, maintain its 20-bit encoding, and track repeated encodings.",
      "edgeCases": "String shorter than 10, exactly length 10, all same character, overlapping repeats, multiple repeats of the same sequence.",
      "constraints": "1 <= s.length <= 100000; s contains only A, C, G, and T.",
      "source": {
        "label": "Repeated DNA Sequences - LeetCode 187",
        "url": "https://leetcode.com/problems/repeated-dna-sequences/"
      },
      "examples": [
        {
          "input": "s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"",
          "output": "[\"AAAAACCCCC\",\"CCCCCAAAAA\"]",
          "explanation": "Both windows appear at least twice."
        },
        {
          "input": "s = \"AAAAAAAAAAAAA\"",
          "output": "[\"AAAAAAAAAA\"]",
          "explanation": "The same 10-letter window repeats through overlap."
        },
        {
          "input": "s = \"ACGTACGT\"",
          "output": "[]",
          "explanation": "There is no 10-letter window."
        }
      ],
      "bruteForceComplexity": "Time O(10n); Space O(n). Count every 10-character substring.",
      "optimizedComplexity": "Time O(n); Space O(n). Store compact 20-bit window encodings.",
      "recursiveComplexity": "Time O(10n); Space O(n). Recursively scan fixed windows with a frequency map.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findRepeatedDnaSequences(String s) {\n    Map<String, Integer> count = new HashMap<>();\n    LinkedHashSet<String> repeated = new LinkedHashSet<>();\n    for (int i = 0; i + 10 <= s.length(); i++) {\n      String dna = s.substring(i, i + 10);\n      int next = count.getOrDefault(dna, 0) + 1;\n      count.put(dna, next);\n      if (next == 2) repeated.add(dna);\n    }\n    return new ArrayList<>(repeated);\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findRepeatedDnaSequences(String s) {\n    if (s.length() < 10) return new ArrayList<>();\n\n    Set<Integer> seen = new HashSet<>();\n    LinkedHashSet<String> repeated = new LinkedHashSet<>();\n    int code = 0;\n    int mask = (1 << 20) - 1;\n\n    for (int i = 0; i < s.length(); i++) {\n      code = ((code << 2) | valueOf(s.charAt(i))) & mask;\n      if (i >= 9 && !seen.add(code)) {\n        repeated.add(s.substring(i - 9, i + 1));\n      }\n    }\n    return new ArrayList<>(repeated);\n  }\n\n  private int valueOf(char c) {\n    if (c == 'A') return 0;\n    if (c == 'C') return 1;\n    if (c == 'G') return 2;\n    return 3;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findRepeatedDnaSequences(String s) {\n    Map<String, Integer> count = new HashMap<>();\n    LinkedHashSet<String> repeated = new LinkedHashSet<>();\n    scan(s, 0, count, repeated);\n    return new ArrayList<>(repeated);\n  }\n\n  private void scan(String s, int index, Map<String, Integer> count, LinkedHashSet<String> repeated) {\n    if (index + 10 > s.length()) return;\n    String dna = s.substring(index, index + 10);\n    int next = count.getOrDefault(dna, 0) + 1;\n    count.put(dna, next);\n    if (next == 2) repeated.add(dna);\n    scan(s, index + 1, count, repeated);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public List<String> findRepeatedDnaSequences(String s) {\n    if (s.length() < 10) return new ArrayList<>();\n\n    Set<Integer> seen = new HashSet<>();\n    LinkedHashSet<String> repeated = new LinkedHashSet<>();\n    int code = 0;\n    int mask = (1 << 20) - 1;\n\n    for (int i = 0; i < s.length(); i++) {\n      code = ((code << 2) | valueOf(s.charAt(i))) & mask;\n      if (i >= 9 && !seen.add(code)) {\n        repeated.add(s.substring(i - 9, i + 1));\n      }\n    }\n    return new ArrayList<>(repeated);\n  }\n\n  private int valueOf(char c) {\n    if (c == 'A') return 0;\n    if (c == 'C') return 1;\n    if (c == 'G') return 2;\n    return 3;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public List<String> findRepeatedDnaSequences(String s) {\n    if (s.length() < 10) return new ArrayList<>();\n\n    Set<Integer> seen = new HashSet<>();\n    LinkedHashSet<String> repeated = new LinkedHashSet<>();\n    int code = 0;\n    int mask = (1 << 20) - 1;\n\n    for (int i = 0; i < s.length(); i++) {\n      code = ((code << 2) | valueOf(s.charAt(i))) & mask;\n      if (i >= 9 && !seen.add(code)) {\n        repeated.add(s.substring(i - 9, i + 1));\n      }\n    }\n    return new ArrayList<>(repeated);\n  }\n\n  private int valueOf(char c) {\n    if (c == 'A') return 0;\n    if (c == 'C') return 1;\n    if (c == 'G') return 2;\n    return 3;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum Flips to Make a OR b Equal to c",
      "difficulty": "Medium",
      "subpattern": "Bitwise OR flip counting",
      "question": "Given three positive integers a, b, and c, return the minimum number of bit flips needed so that (a OR b) equals c.",
      "trigger": "Each bit position is independent under OR, so count required corrections bit by bit.",
      "intuition": "If c has 0, every 1 in a or b at that bit must flip; if c has 1, at least one of a or b must already be 1.",
      "edgeCases": "c is zero, both a and b have a 1 where c has 0, both a and b have 0 where c has 1, high bits, equal inputs.",
      "constraints": "1 <= a, b, c <= 1000000000.",
      "source": {
        "label": "Minimum Flips to Make a OR b Equal to c - LeetCode 1318",
        "url": "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/"
      },
      "examples": [
        {
          "input": "a = 2, b = 6, c = 5",
          "output": "3",
          "explanation": "Bits must change so 010 OR 110 becomes 101."
        },
        {
          "input": "a = 4, b = 2, c = 7",
          "output": "1",
          "explanation": "Only the lowest bit needs to become 1."
        },
        {
          "input": "a = 1, b = 2, c = 3",
          "output": "0",
          "explanation": "1 OR 2 already equals 3."
        }
      ],
      "bruteForceComplexity": "Time O(31); Space O(1). Check every possible bit position.",
      "optimizedComplexity": "Time O(log max(a,b,c)); Space O(1). Process only until all numbers are shifted out.",
      "recursiveComplexity": "Time O(log max(a,b,c)); Space O(log max(a,b,c)). Recursive bit stripping.",
      "bruteForceCode": "class Solution {\n  public int minFlips(int a, int b, int c) {\n    int flips = 0;\n    for (int bit = 0; bit < 31; bit++) {\n      int abit = (a >>> bit) & 1;\n      int bbit = (b >>> bit) & 1;\n      int cbit = (c >>> bit) & 1;\n      if (cbit == 0) flips += abit + bbit;\n      else if ((abit | bbit) == 0) flips++;\n    }\n    return flips;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minFlips(int a, int b, int c) {\n    int flips = 0;\n    while (a != 0 || b != 0 || c != 0) {\n      int abit = a & 1;\n      int bbit = b & 1;\n      int cbit = c & 1;\n      if (cbit == 0) flips += abit + bbit;\n      else if ((abit | bbit) == 0) flips++;\n      a >>>= 1;\n      b >>>= 1;\n      c >>>= 1;\n    }\n    return flips;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minFlips(int a, int b, int c) {\n    if (a == 0 && b == 0 && c == 0) return 0;\n    int abit = a & 1;\n    int bbit = b & 1;\n    int cbit = c & 1;\n    int current = cbit == 0 ? abit + bbit : ((abit | bbit) == 0 ? 1 : 0);\n    return current + minFlips(a >>> 1, b >>> 1, c >>> 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minFlips(int a, int b, int c) {\n    int flips = 0;\n    while (a != 0 || b != 0 || c != 0) {\n      int abit = a & 1;\n      int bbit = b & 1;\n      int cbit = c & 1;\n      if (cbit == 0) flips += abit + bbit;\n      else if ((abit | bbit) == 0) flips++;\n      a >>>= 1;\n      b >>>= 1;\n      c >>>= 1;\n    }\n    return flips;\n  }\n}",
      "code": "class Solution {\n  public int minFlips(int a, int b, int c) {\n    int flips = 0;\n    while (a != 0 || b != 0 || c != 0) {\n      int abit = a & 1;\n      int bbit = b & 1;\n      int cbit = c & 1;\n      if (cbit == 0) flips += abit + bbit;\n      else if ((abit | bbit) == 0) flips++;\n      a >>>= 1;\n      b >>>= 1;\n      c >>>= 1;\n    }\n    return flips;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Maximum Product of Word Lengths",
      "difficulty": "Medium",
      "subpattern": "Word character masks",
      "question": "Given an array of lowercase words, return the maximum product of lengths of two words that share no common letters.",
      "trigger": "A lowercase word can be compressed into a 26-bit character mask, and disjoint words have mask AND equal to zero.",
      "intuition": "Precompute one mask per word, then compare word pairs with a single bitwise AND.",
      "edgeCases": "No disjoint pair, duplicate words, words with repeated letters, one word only, all words share one letter.",
      "constraints": "2 <= words.length <= 1000; 1 <= words[i].length <= 1000; words[i] contains lowercase English letters.",
      "source": {
        "label": "Maximum Product of Word Lengths - LeetCode 318",
        "url": "https://leetcode.com/problems/maximum-product-of-word-lengths/"
      },
      "examples": [
        {
          "input": "words = [\"abcw\",\"baz\",\"foo\",\"bar\",\"xtfn\",\"abcdef\"]",
          "output": "16",
          "explanation": "abcw and xtfn share no letters and have product 16."
        },
        {
          "input": "words = [\"a\",\"ab\",\"abc\",\"d\",\"cd\",\"bcd\",\"abcd\"]",
          "output": "4",
          "explanation": "ab and cd are disjoint."
        },
        {
          "input": "words = [\"a\",\"aa\",\"aaa\",\"aaaa\"]",
          "output": "0",
          "explanation": "Every pair shares a."
        }
      ],
      "bruteForceComplexity": "Time O(n^2 * L); Space O(1). Check characters for each pair.",
      "optimizedComplexity": "Time O(total characters + n^2); Space O(n). Compare precomputed word masks.",
      "recursiveComplexity": "Time O(n^2); Space O(n + n^2 call depth in the worst case). Recursively enumerate mask pairs.",
      "bruteForceCode": "class Solution {\n  public int maxProduct(String[] words) {\n    int best = 0;\n    for (int i = 0; i < words.length; i++) {\n      for (int j = i + 1; j < words.length; j++) {\n        if (!shareLetter(words[i], words[j])) {\n          best = Math.max(best, words[i].length() * words[j].length());\n        }\n      }\n    }\n    return best;\n  }\n\n  private boolean shareLetter(String a, String b) {\n    boolean[] seen = new boolean[26];\n    for (int i = 0; i < a.length(); i++) seen[a.charAt(i) - 'a'] = true;\n    for (int i = 0; i < b.length(); i++) {\n      if (seen[b.charAt(i) - 'a']) return true;\n    }\n    return false;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int maxProduct(String[] words) {\n    int n = words.length;\n    int[] masks = new int[n];\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < words[i].length(); j++) {\n        masks[i] |= 1 << (words[i].charAt(j) - 'a');\n      }\n    }\n\n    int best = 0;\n    for (int i = 0; i < n; i++) {\n      for (int j = i + 1; j < n; j++) {\n        if ((masks[i] & masks[j]) == 0) best = Math.max(best, words[i].length() * words[j].length());\n      }\n    }\n    return best;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int maxProduct(String[] words) {\n    int[] masks = new int[words.length];\n    int[] lengths = new int[words.length];\n    for (int i = 0; i < words.length; i++) {\n      lengths[i] = words[i].length();\n      for (int j = 0; j < words[i].length(); j++) masks[i] |= 1 << (words[i].charAt(j) - 'a');\n    }\n    return search(masks, lengths, 0, 1, 0);\n  }\n\n  private int search(int[] masks, int[] lengths, int left, int right, int best) {\n    if (left == masks.length) return best;\n    if (right == masks.length) return search(masks, lengths, left + 1, left + 2, best);\n    if ((masks[left] & masks[right]) == 0) best = Math.max(best, lengths[left] * lengths[right]);\n    return search(masks, lengths, left, right + 1, best);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int maxProduct(String[] words) {\n    int n = words.length;\n    int[] masks = new int[n];\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < words[i].length(); j++) {\n        masks[i] |= 1 << (words[i].charAt(j) - 'a');\n      }\n    }\n\n    int best = 0;\n    for (int i = 0; i < n; i++) {\n      for (int j = i + 1; j < n; j++) {\n        if ((masks[i] & masks[j]) == 0) best = Math.max(best, words[i].length() * words[j].length());\n      }\n    }\n    return best;\n  }\n}",
      "code": "class Solution {\n  public int maxProduct(String[] words) {\n    int n = words.length;\n    int[] masks = new int[n];\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < words[i].length(); j++) {\n        masks[i] |= 1 << (words[i].charAt(j) - 'a');\n      }\n    }\n\n    int best = 0;\n    for (int i = 0; i < n; i++) {\n      for (int j = i + 1; j < n; j++) {\n        if ((masks[i] & masks[j]) == 0) best = Math.max(best, words[i].length() * words[j].length());\n      }\n    }\n    return best;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Concatenation of Consecutive Binary Numbers",
      "difficulty": "Medium",
      "subpattern": "Binary length concatenation modulo",
      "question": "Given an integer n, concatenate the binary representations of 1 through n and return the decimal value modulo 1000000007.",
      "trigger": "Appending a number in binary is equivalent to shifting by its bit length and OR-ing the number.",
      "intuition": "Increase the shift length exactly when the current number is a power of two.",
      "edgeCases": "n is 1, n crosses powers of two, large n requiring modulo each step, leading zeros are not used, overflow without long.",
      "constraints": "1 <= n <= 100000.",
      "source": {
        "label": "Concatenation of Consecutive Binary Numbers - LeetCode 1680",
        "url": "https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/"
      },
      "examples": [
        {
          "input": "n = 1",
          "output": "1",
          "explanation": "The concatenation is binary 1."
        },
        {
          "input": "n = 3",
          "output": "27",
          "explanation": "1 + 10 + 11 forms binary 11011."
        },
        {
          "input": "n = 12",
          "output": "505379714",
          "explanation": "Modulo is needed after repeated binary appends."
        }
      ],
      "bruteForceComplexity": "Time O(total binary digits); Space O(total binary digits). Build the concatenated binary string.",
      "optimizedComplexity": "Time O(n); Space O(1). Shift the rolling value by the current bit length.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursive rolling append carries the value and bit length.",
      "bruteForceCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int concatenatedBinary(int n) {\n    StringBuilder bits = new StringBuilder();\n    for (int value = 1; value <= n; value++) bits.append(Integer.toBinaryString(value));\n\n    long answer = 0;\n    for (int i = 0; i < bits.length(); i++) {\n      answer = ((answer << 1) + (bits.charAt(i) - '0')) % MOD;\n    }\n    return (int) answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int concatenatedBinary(int n) {\n    long answer = 0;\n    int bitLength = 0;\n    for (int value = 1; value <= n; value++) {\n      if ((value & (value - 1)) == 0) bitLength++;\n      answer = ((answer << bitLength) | value) % MOD;\n    }\n    return (int) answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int concatenatedBinary(int n) {\n    return (int) build(1, n, 0L, 0);\n  }\n\n  private long build(int value, int n, long answer, int bitLength) {\n    if (value > n) return answer;\n    if ((value & (value - 1)) == 0) bitLength++;\n    long next = ((answer << bitLength) | value) % MOD;\n    return build(value + 1, n, next, bitLength);\n  }\n}",
      "optimizedCode": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int concatenatedBinary(int n) {\n    long answer = 0;\n    int bitLength = 0;\n    for (int value = 1; value <= n; value++) {\n      if ((value & (value - 1)) == 0) bitLength++;\n      answer = ((answer << bitLength) | value) % MOD;\n    }\n    return (int) answer;\n  }\n}",
      "code": "class Solution {\n  private static final int MOD = 1_000_000_007;\n\n  public int concatenatedBinary(int n) {\n    long answer = 0;\n    int bitLength = 0;\n    for (int value = 1; value <= n; value++) {\n      if ((value & (value - 1)) == 0) bitLength++;\n      answer = ((answer << bitLength) | value) % MOD;\n    }\n    return (int) answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Sort Integers by The Number of 1 Bits",
      "difficulty": "Easy",
      "subpattern": "Popcount sort key",
      "question": "Given an integer array arr, sort the integers by the number of 1 bits in their binary representation, breaking ties by numeric value.",
      "trigger": "The ordering key is popcount first and value second.",
      "intuition": "Precompute or compute bit counts, then sort by (bitCount, value).",
      "edgeCases": "Duplicate values, zeros, equal bit counts, already sorted input, maximum values.",
      "constraints": "1 <= arr.length <= 500; 0 <= arr[i] <= 10000.",
      "source": {
        "label": "Sort Integers by The Number of 1 Bits - LeetCode 1356",
        "url": "https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/"
      },
      "examples": [
        {
          "input": "arr = [0,1,2,3,4,5,6,7,8]",
          "output": "[0,1,2,4,8,3,5,6,7]",
          "explanation": "Values with fewer set bits come first."
        },
        {
          "input": "arr = [1024,512,256,128,64,32,16,8,4,2,1]",
          "output": "[1,2,4,8,16,32,64,128,256,512,1024]",
          "explanation": "All have one set bit, so numeric order decides."
        },
        {
          "input": "arr = [3,3,1]",
          "output": "[1,3,3]",
          "explanation": "1 has one set bit; both 3 values have two."
        }
      ],
      "bruteForceComplexity": "Time O(n log n * log M); Space O(n). Comparator counts bits directly.",
      "optimizedComplexity": "Time O(M + n log n); Space O(M + n). Cache popcounts up to the maximum value.",
      "recursiveComplexity": "Time O(n log n * log M); Space O(n + log n). Merge sort compares by popcount recursively.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  public int[] sortByBits(int[] arr) {\n    Integer[] boxed = new Integer[arr.length];\n    for (int i = 0; i < arr.length; i++) boxed[i] = arr[i];\n\n    Arrays.sort(boxed, (a, b) -> {\n      int byBits = Integer.compare(countBits(a), countBits(b));\n      return byBits != 0 ? byBits : Integer.compare(a, b);\n    });\n\n    for (int i = 0; i < arr.length; i++) arr[i] = boxed[i];\n    return arr;\n  }\n\n  private int countBits(int value) {\n    int count = 0;\n    while (value != 0) {\n      value &= value - 1;\n      count++;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] sortByBits(int[] arr) {\n    int max = 0;\n    for (int value : arr) max = Math.max(max, value);\n\n    int[] bits = new int[max + 1];\n    for (int value = 1; value <= max; value++) bits[value] = bits[value >> 1] + (value & 1);\n\n    Integer[] boxed = new Integer[arr.length];\n    for (int i = 0; i < arr.length; i++) boxed[i] = arr[i];\n    Arrays.sort(boxed, (a, b) -> bits[a] == bits[b] ? Integer.compare(a, b) : Integer.compare(bits[a], bits[b]));\n\n    for (int i = 0; i < arr.length; i++) arr[i] = boxed[i];\n    return arr;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] sortByBits(int[] arr) {\n    if (arr.length <= 1) return arr;\n    mergeSort(arr, 0, arr.length - 1, new int[arr.length]);\n    return arr;\n  }\n\n  private void mergeSort(int[] arr, int left, int right, int[] temp) {\n    if (left >= right) return;\n    int mid = left + (right - left) / 2;\n    mergeSort(arr, left, mid, temp);\n    mergeSort(arr, mid + 1, right, temp);\n    merge(arr, left, mid, right, temp);\n  }\n\n  private void merge(int[] arr, int left, int mid, int right, int[] temp) {\n    int i = left;\n    int j = mid + 1;\n    int k = left;\n    while (i <= mid && j <= right) {\n      if (compare(arr[i], arr[j]) <= 0) temp[k++] = arr[i++];\n      else temp[k++] = arr[j++];\n    }\n    while (i <= mid) temp[k++] = arr[i++];\n    while (j <= right) temp[k++] = arr[j++];\n    for (int index = left; index <= right; index++) arr[index] = temp[index];\n  }\n\n  private int compare(int a, int b) {\n    int byBits = Integer.compare(Integer.bitCount(a), Integer.bitCount(b));\n    return byBits != 0 ? byBits : Integer.compare(a, b);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] sortByBits(int[] arr) {\n    int max = 0;\n    for (int value : arr) max = Math.max(max, value);\n\n    int[] bits = new int[max + 1];\n    for (int value = 1; value <= max; value++) bits[value] = bits[value >> 1] + (value & 1);\n\n    Integer[] boxed = new Integer[arr.length];\n    for (int i = 0; i < arr.length; i++) boxed[i] = arr[i];\n    Arrays.sort(boxed, (a, b) -> bits[a] == bits[b] ? Integer.compare(a, b) : Integer.compare(bits[a], bits[b]));\n\n    for (int i = 0; i < arr.length; i++) arr[i] = boxed[i];\n    return arr;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] sortByBits(int[] arr) {\n    int max = 0;\n    for (int value : arr) max = Math.max(max, value);\n\n    int[] bits = new int[max + 1];\n    for (int value = 1; value <= max; value++) bits[value] = bits[value >> 1] + (value & 1);\n\n    Integer[] boxed = new Integer[arr.length];\n    for (int i = 0; i < arr.length; i++) boxed[i] = arr[i];\n    Arrays.sort(boxed, (a, b) -> bits[a] == bits[b] ? Integer.compare(a, b) : Integer.compare(bits[a], bits[b]));\n\n    for (int i = 0; i < arr.length; i++) arr[i] = boxed[i];\n    return arr;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count Triplets That Can Form Two Arrays of Equal XOR",
      "difficulty": "Medium",
      "subpattern": "Prefix XOR triplet counting",
      "question": "Given an integer array arr, count triplets (i, j, k) where i < j <= k and XOR of arr[i..j-1] equals XOR of arr[j..k].",
      "trigger": "Equal XOR on both sides means the XOR from i through k is zero, so matching prefix XOR values create many j choices.",
      "intuition": "When prefix XOR repeats at positions a and b, it contributes b - a - 1 valid split points.",
      "edgeCases": "All zeros, no zero-XOR segment, length below 2, repeated prefix XOR many times, large count.",
      "constraints": "1 <= arr.length <= 300; 1 <= arr[i] <= 100000000.",
      "source": {
        "label": "Count Triplets That Can Form Two Arrays of Equal XOR - LeetCode 1442",
        "url": "https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/"
      },
      "examples": [
        {
          "input": "arr = [2,3,1,6,7]",
          "output": "4",
          "explanation": "Four valid splits produce equal XOR arrays."
        },
        {
          "input": "arr = [1,1,1,1,1]",
          "output": "10",
          "explanation": "Repeated prefix XOR values create many split points."
        },
        {
          "input": "arr = [2,3]",
          "output": "0",
          "explanation": "There is no valid equal-XOR split."
        }
      ],
      "bruteForceComplexity": "Time O(n^3); Space O(1). Try every split and right boundary.",
      "optimizedComplexity": "Time O(n); Space O(n). Store count and index-sum for each prefix XOR.",
      "recursiveComplexity": "Time O(n^2); Space O(n^2). Recursively compare prefix XOR positions.",
      "bruteForceCode": "class Solution {\n  public int countTriplets(int[] arr) {\n    int answer = 0;\n    for (int i = 0; i < arr.length; i++) {\n      int leftXor = 0;\n      for (int j = i; j < arr.length - 1; j++) {\n        leftXor ^= arr[j];\n        int rightXor = 0;\n        for (int k = j + 1; k < arr.length; k++) {\n          rightXor ^= arr[k];\n          if (leftXor == rightXor) answer++;\n        }\n      }\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countTriplets(int[] arr) {\n    Map<Integer, Integer> count = new HashMap<>();\n    Map<Integer, Integer> indexSum = new HashMap<>();\n    count.put(0, 1);\n    indexSum.put(0, 0);\n\n    int prefix = 0;\n    int answer = 0;\n    for (int i = 0; i < arr.length; i++) {\n      prefix ^= arr[i];\n      int position = i + 1;\n      int seen = count.getOrDefault(prefix, 0);\n      int sum = indexSum.getOrDefault(prefix, 0);\n      answer += seen * (position - 1) - sum;\n      count.put(prefix, seen + 1);\n      indexSum.put(prefix, sum + position);\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countTriplets(int[] arr) {\n    int[] prefix = new int[arr.length + 1];\n    for (int i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] ^ arr[i];\n    return count(prefix, 0, 1);\n  }\n\n  private int count(int[] prefix, int left, int right) {\n    if (left == prefix.length - 1) return 0;\n    if (right == prefix.length) return count(prefix, left + 1, left + 2);\n    int add = prefix[left] == prefix[right] ? right - left - 1 : 0;\n    return add + count(prefix, left, right + 1);\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countTriplets(int[] arr) {\n    Map<Integer, Integer> count = new HashMap<>();\n    Map<Integer, Integer> indexSum = new HashMap<>();\n    count.put(0, 1);\n    indexSum.put(0, 0);\n\n    int prefix = 0;\n    int answer = 0;\n    for (int i = 0; i < arr.length; i++) {\n      prefix ^= arr[i];\n      int position = i + 1;\n      int seen = count.getOrDefault(prefix, 0);\n      int sum = indexSum.getOrDefault(prefix, 0);\n      answer += seen * (position - 1) - sum;\n      count.put(prefix, seen + 1);\n      indexSum.put(prefix, sum + position);\n    }\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countTriplets(int[] arr) {\n    Map<Integer, Integer> count = new HashMap<>();\n    Map<Integer, Integer> indexSum = new HashMap<>();\n    count.put(0, 1);\n    indexSum.put(0, 0);\n\n    int prefix = 0;\n    int answer = 0;\n    for (int i = 0; i < arr.length; i++) {\n      prefix ^= arr[i];\n      int position = i + 1;\n      int seen = count.getOrDefault(prefix, 0);\n      int sum = indexSum.getOrDefault(prefix, 0);\n      answer += seen * (position - 1) - sum;\n      count.put(prefix, seen + 1);\n      indexSum.put(prefix, sum + position);\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "XOR Queries of a Subarray",
      "difficulty": "Medium",
      "subpattern": "Prefix XOR query answering",
      "question": "Given an array arr and queries [left, right], return the XOR of arr[left] through arr[right] for each query.",
      "trigger": "Range XOR is reversible like prefix sums: prefix[right + 1] XOR prefix[left].",
      "intuition": "Build prefix XOR once so every query removes the prefix before left.",
      "edgeCases": "Single-element query, full-array query, zeros, repeated queries, many queries compared with array length.",
      "constraints": "1 <= arr.length, queries.length <= 30000; 1 <= arr[i] <= 1000000000; 0 <= left <= right < arr.length.",
      "source": {
        "label": "XOR Queries of a Subarray - LeetCode 1310",
        "url": "https://leetcode.com/problems/xor-queries-of-a-subarray/"
      },
      "examples": [
        {
          "input": "arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]",
          "output": "[2,7,14,8]",
          "explanation": "Each result is the XOR over the requested range."
        },
        {
          "input": "arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]",
          "output": "[8,0,4,4]",
          "explanation": "Prefix XOR answers all ranges in O(1)."
        },
        {
          "input": "arr = [7], queries = [[0,0]]",
          "output": "[7]",
          "explanation": "A single-value range returns that value."
        }
      ],
      "bruteForceComplexity": "Time O(total queried range length); Space O(1) excluding output. XOR each query range directly.",
      "optimizedComplexity": "Time O(n + q); Space O(n) excluding output. Prefix XOR makes each query O(1).",
      "recursiveComplexity": "Time O(n + q); Space O(n + q). Recursively builds prefix and fills answers.",
      "bruteForceCode": "class Solution {\n  public int[] xorQueries(int[] arr, int[][] queries) {\n    int[] answer = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int xor = 0;\n      for (int index = queries[i][0]; index <= queries[i][1]; index++) xor ^= arr[index];\n      answer[i] = xor;\n    }\n    return answer;\n  }\n}",
      "iterativeCode": "class Solution {\n  public int[] xorQueries(int[] arr, int[][] queries) {\n    int[] prefix = new int[arr.length + 1];\n    for (int i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] ^ arr[i];\n\n    int[] answer = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int left = queries[i][0];\n      int right = queries[i][1];\n      answer[i] = prefix[right + 1] ^ prefix[left];\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int[] xorQueries(int[] arr, int[][] queries) {\n    int[] prefix = new int[arr.length + 1];\n    buildPrefix(arr, prefix, 0);\n    int[] answer = new int[queries.length];\n    fillAnswers(queries, prefix, answer, 0);\n    return answer;\n  }\n\n  private void buildPrefix(int[] arr, int[] prefix, int index) {\n    if (index == arr.length) return;\n    prefix[index + 1] = prefix[index] ^ arr[index];\n    buildPrefix(arr, prefix, index + 1);\n  }\n\n  private void fillAnswers(int[][] queries, int[] prefix, int[] answer, int index) {\n    if (index == queries.length) return;\n    int left = queries[index][0];\n    int right = queries[index][1];\n    answer[index] = prefix[right + 1] ^ prefix[left];\n    fillAnswers(queries, prefix, answer, index + 1);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int[] xorQueries(int[] arr, int[][] queries) {\n    int[] prefix = new int[arr.length + 1];\n    for (int i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] ^ arr[i];\n\n    int[] answer = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int left = queries[i][0];\n      int right = queries[i][1];\n      answer[i] = prefix[right + 1] ^ prefix[left];\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int[] xorQueries(int[] arr, int[][] queries) {\n    int[] prefix = new int[arr.length + 1];\n    for (int i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] ^ arr[i];\n\n    int[] answer = new int[queries.length];\n    for (int i = 0; i < queries.length; i++) {\n      int left = queries[i][0];\n      int right = queries[i][1];\n      answer[i] = prefix[right + 1] ^ prefix[left];\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Find Kth Bit in Nth Binary String",
      "difficulty": "Medium",
      "subpattern": "Recursive mirrored binary string",
      "question": "The strings are defined as S1 = \"0\" and Sn = S(n-1) + \"1\" + reverse(invert(S(n-1))). Return the kth bit in Sn.",
      "trigger": "The second half mirrors the first half with inversion, so k can be mapped back without building the string.",
      "intuition": "Compare k with the middle position; if it is in the mirrored half, reflect k and flip the result.",
      "edgeCases": "n is 1, k is the middle bit, k in first half, k in mirrored second half, maximum n where building is too large.",
      "constraints": "1 <= n <= 20; 1 <= k <= 2^n - 1.",
      "source": {
        "label": "Find Kth Bit in Nth Binary String - LeetCode 1545",
        "url": "https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/"
      },
      "examples": [
        {
          "input": "n = 3, k = 1",
          "output": "\"0\"",
          "explanation": "S3 starts with 0."
        },
        {
          "input": "n = 4, k = 11",
          "output": "\"1\"",
          "explanation": "Map k into the mirrored half and invert."
        },
        {
          "input": "n = 1, k = 1",
          "output": "\"0\"",
          "explanation": "S1 is exactly 0."
        }
      ],
      "bruteForceComplexity": "Time O(2^n); Space O(2^n). Build the full string.",
      "optimizedComplexity": "Time O(n); Space O(1). Iteratively map k toward S1 while tracking inversion.",
      "recursiveComplexity": "Time O(n); Space O(n). Recursively reflect k into smaller strings.",
      "bruteForceCode": "class Solution {\n  public char findKthBit(int n, int k) {\n    String current = \"0\";\n    for (int level = 2; level <= n; level++) {\n      current = current + \"1\" + reverseInvert(current);\n    }\n    return current.charAt(k - 1);\n  }\n\n  private String reverseInvert(String value) {\n    StringBuilder builder = new StringBuilder();\n    for (int i = value.length() - 1; i >= 0; i--) {\n      builder.append(value.charAt(i) == '0' ? '1' : '0');\n    }\n    return builder.toString();\n  }\n}",
      "iterativeCode": "class Solution {\n  public char findKthBit(int n, int k) {\n    boolean inverted = false;\n    while (n > 1) {\n      int length = (1 << n) - 1;\n      int middle = (length + 1) / 2;\n      if (k == middle) return inverted ? '0' : '1';\n      if (k > middle) {\n        k = length - k + 1;\n        inverted = !inverted;\n      }\n      n--;\n    }\n    return inverted ? '1' : '0';\n  }\n}",
      "recursiveCode": "class Solution {\n  public char findKthBit(int n, int k) {\n    if (n == 1) return '0';\n    int length = (1 << n) - 1;\n    int middle = (length + 1) / 2;\n    if (k == middle) return '1';\n    if (k < middle) return findKthBit(n - 1, k);\n\n    char mirrored = findKthBit(n - 1, length - k + 1);\n    return mirrored == '0' ? '1' : '0';\n  }\n}",
      "optimizedCode": "class Solution {\n  public char findKthBit(int n, int k) {\n    boolean inverted = false;\n    while (n > 1) {\n      int length = (1 << n) - 1;\n      int middle = (length + 1) / 2;\n      if (k == middle) return inverted ? '0' : '1';\n      if (k > middle) {\n        k = length - k + 1;\n        inverted = !inverted;\n      }\n      n--;\n    }\n    return inverted ? '1' : '0';\n  }\n}",
      "code": "class Solution {\n  public char findKthBit(int n, int k) {\n    boolean inverted = false;\n    while (n > 1) {\n      int length = (1 << n) - 1;\n      int middle = (length + 1) / 2;\n      if (k == middle) return inverted ? '0' : '1';\n      if (k > middle) {\n        k = length - k + 1;\n        inverted = !inverted;\n      }\n      n--;\n    }\n    return inverted ? '1' : '0';\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Minimum One Bit Operations to Make Integers Zero",
      "difficulty": "Hard",
      "subpattern": "Gray-code inverse operations",
      "question": "Given an integer n, return the minimum number of allowed one-bit operations required to transform n into 0.",
      "trigger": "The allowed operation order matches Gray code transitions, so the answer is the inverse Gray-code rank of n.",
      "intuition": "Convert Gray-coded value n back to its binary rank by cumulative XOR of shifted prefixes.",
      "edgeCases": "n is 0, n is a power of two, all low bits set, high bit dominates, values near 10^9.",
      "constraints": "0 <= n <= 1000000000.",
      "source": {
        "label": "Minimum One Bit Operations to Make Integers Zero - LeetCode 1611",
        "url": "https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero/"
      },
      "examples": [
        {
          "input": "n = 3",
          "output": "2",
          "explanation": "3 can reach 0 in two allowed operations."
        },
        {
          "input": "n = 6",
          "output": "4",
          "explanation": "The inverse Gray-code rank of 6 is 4."
        },
        {
          "input": "n = 0",
          "output": "0",
          "explanation": "No operation is needed."
        }
      ],
      "bruteForceComplexity": "Time O(answer); Space O(1). Scan Gray-code ranks until the encoded value equals n.",
      "optimizedComplexity": "Time O(log n); Space O(1). Iteratively invert Gray code with cumulative XOR.",
      "recursiveComplexity": "Time O(log n); Space O(log n). Remove the highest set bit using the mirrored Gray-code formula.",
      "bruteForceCode": "class Solution {\n  public int minimumOneBitOperations(int n) {\n    int operations = 0;\n    while (toGray(operations) != n) operations++;\n    return operations;\n  }\n\n  private int toGray(int value) {\n    return value ^ (value >> 1);\n  }\n}",
      "iterativeCode": "class Solution {\n  public int minimumOneBitOperations(int n) {\n    int answer = 0;\n    while (n != 0) {\n      answer ^= n;\n      n >>= 1;\n    }\n    return answer;\n  }\n}",
      "recursiveCode": "class Solution {\n  public int minimumOneBitOperations(int n) {\n    if (n == 0) return 0;\n    int highestBitIndex = 31 - Integer.numberOfLeadingZeros(n);\n    int highestBit = 1 << highestBitIndex;\n    int fullCycle = (1 << (highestBitIndex + 1)) - 1;\n    return fullCycle - minimumOneBitOperations(n ^ highestBit);\n  }\n}",
      "optimizedCode": "class Solution {\n  public int minimumOneBitOperations(int n) {\n    int answer = 0;\n    while (n != 0) {\n      answer ^= n;\n      n >>= 1;\n    }\n    return answer;\n  }\n}",
      "code": "class Solution {\n  public int minimumOneBitOperations(int n) {\n    int answer = 0;\n    while (n != 0) {\n      answer ^= n;\n      n >>= 1;\n    }\n    return answer;\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Count Number of Maximum Bitwise-OR Subsets",
      "difficulty": "Medium",
      "subpattern": "OR subset backtracking with masks",
      "question": "Given an integer array nums, count non-empty subsets whose bitwise OR equals the maximum possible OR of any subset.",
      "trigger": "The maximum target OR is the OR of all numbers, and each subset either reaches that target or not.",
      "intuition": "Compute the target OR once, then count subsets whose accumulated OR equals it.",
      "edgeCases": "Single element, duplicate numbers, target reached early, all values share bits, many subsets have the same OR.",
      "constraints": "1 <= nums.length <= 16; 1 <= nums[i] <= 100000.",
      "source": {
        "label": "Count Number of Maximum Bitwise-OR Subsets - LeetCode 2044",
        "url": "https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/"
      },
      "examples": [
        {
          "input": "nums = [3,1]",
          "output": "2",
          "explanation": "Subsets [3] and [3,1] reach OR 3."
        },
        {
          "input": "nums = [2,2,2]",
          "output": "7",
          "explanation": "Every non-empty subset reaches OR 2."
        },
        {
          "input": "nums = [3,2,1,5]",
          "output": "6",
          "explanation": "Six subsets reach the full OR target."
        }
      ],
      "bruteForceComplexity": "Time O(n * 2^n); Space O(1). Enumerate every non-empty subset mask.",
      "optimizedComplexity": "Time O(n * distinct OR states); Space O(distinct OR states). DP counts how many subsets create each OR.",
      "recursiveComplexity": "Time O(2^n); Space O(n). Backtracking includes or skips each value.",
      "bruteForceCode": "class Solution {\n  public int countMaxOrSubsets(int[] nums) {\n    int target = 0;\n    for (int num : nums) target |= num;\n\n    int count = 0;\n    int total = 1 << nums.length;\n    for (int mask = 1; mask < total; mask++) {\n      int value = 0;\n      for (int bit = 0; bit < nums.length; bit++) {\n        if (((mask >>> bit) & 1) == 1) value |= nums[bit];\n      }\n      if (value == target) count++;\n    }\n    return count;\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int countMaxOrSubsets(int[] nums) {\n    int target = 0;\n    for (int num : nums) target |= num;\n\n    Map<Integer, Integer> dp = new HashMap<>();\n    dp.put(0, 1);\n    for (int num : nums) {\n      Map<Integer, Integer> next = new HashMap<>(dp);\n      for (Map.Entry<Integer, Integer> entry : dp.entrySet()) {\n        int combined = entry.getKey() | num;\n        next.put(combined, next.getOrDefault(combined, 0) + entry.getValue());\n      }\n      dp = next;\n    }\n    return dp.getOrDefault(target, 0);\n  }\n}",
      "recursiveCode": "class Solution {\n  public int countMaxOrSubsets(int[] nums) {\n    int target = 0;\n    for (int num : nums) target |= num;\n    return count(nums, 0, 0, target);\n  }\n\n  private int count(int[] nums, int index, int current, int target) {\n    if (index == nums.length) return current == target ? 1 : 0;\n    int take = count(nums, index + 1, current | nums[index], target);\n    int skip = count(nums, index + 1, current, target);\n    return take + skip;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int countMaxOrSubsets(int[] nums) {\n    int target = 0;\n    for (int num : nums) target |= num;\n\n    Map<Integer, Integer> dp = new HashMap<>();\n    dp.put(0, 1);\n    for (int num : nums) {\n      Map<Integer, Integer> next = new HashMap<>(dp);\n      for (Map.Entry<Integer, Integer> entry : dp.entrySet()) {\n        int combined = entry.getKey() | num;\n        next.put(combined, next.getOrDefault(combined, 0) + entry.getValue());\n      }\n      dp = next;\n    }\n    return dp.getOrDefault(target, 0);\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int countMaxOrSubsets(int[] nums) {\n    int target = 0;\n    for (int num : nums) target |= num;\n\n    Map<Integer, Integer> dp = new HashMap<>();\n    dp.put(0, 1);\n    for (int num : nums) {\n      Map<Integer, Integer> next = new HashMap<>(dp);\n      for (Map.Entry<Integer, Integer> entry : dp.entrySet()) {\n        int combined = entry.getKey() | num;\n        next.put(combined, next.getOrDefault(combined, 0) + entry.getValue());\n      }\n      dp = next;\n    }\n    return dp.getOrDefault(target, 0);\n  }\n}"
    },
    {
      "group": "more-practice",
      "name": "Smallest Sufficient Team",
      "difficulty": "Hard",
      "subpattern": "Skill set bitmask DP",
      "question": "Given required skills and each person's skill list, return any smallest team whose combined skills cover all required skills.",
      "trigger": "The required skill set is small enough to represent as a bitmask, making each team state a covered-skill mask.",
      "intuition": "Map every person to a skill mask and run DP over covered-skill masks to keep the smallest team for each state.",
      "edgeCases": "Person with no useful skill, duplicate skill sets, one person covers all skills, many equivalent optimal teams, required skill count near 16.",
      "constraints": "1 <= req_skills.length <= 16; 1 <= people.length <= 60; every required skill can be covered by at least one person.",
      "source": {
        "label": "Smallest Sufficient Team - LeetCode 1125",
        "url": "https://leetcode.com/problems/smallest-sufficient-team/"
      },
      "examples": [
        {
          "input": "req_skills = [\"java\",\"nodejs\",\"reactjs\"], people = [[\"java\"],[\"nodejs\"],[\"nodejs\",\"reactjs\"]]",
          "output": "[0,2]",
          "explanation": "People 0 and 2 cover all three skills."
        },
        {
          "input": "req_skills = [\"algorithms\",\"math\",\"java\",\"reactjs\",\"csharp\",\"aws\"], people = [[\"algorithms\",\"math\",\"java\"],[\"algorithms\",\"math\",\"reactjs\"],[\"java\",\"csharp\",\"aws\"],[\"reactjs\",\"csharp\"],[\"csharp\",\"math\"],[\"aws\",\"java\"]]",
          "output": "[1,2]",
          "explanation": "People 1 and 2 together cover all skills."
        },
        {
          "input": "req_skills = [\"a\"], people = [[\"a\"],[]]",
          "output": "[0]",
          "explanation": "The first person alone covers the target mask."
        }
      ],
      "bruteForceComplexity": "Time O(2^p * s) in the worst case; Space O(p). Backtracking tries teams and prunes by current best size.",
      "optimizedComplexity": "Time O(p * 2^s); Space O(2^s * team size). DP keeps the smallest team for each skill mask.",
      "recursiveComplexity": "Time O(p * 2^s); Space O(p * 2^s). Memoized recursion chooses skip or take for each person.",
      "bruteForceCode": "import java.util.*;\n\nclass Solution {\n  private int target;\n  private int[] masks;\n  private List<Integer> best;\n\n  public int[] smallestSufficientTeam(String[] req_skills, List<List<String>> people) {\n    Map<String, Integer> skillIndex = new HashMap<>();\n    for (int i = 0; i < req_skills.length; i++) skillIndex.put(req_skills[i], i);\n\n    target = (1 << req_skills.length) - 1;\n    masks = new int[people.size()];\n    for (int i = 0; i < people.size(); i++) {\n      for (String skill : people.get(i)) {\n        Integer bit = skillIndex.get(skill);\n        if (bit != null) masks[i] |= 1 << bit;\n      }\n    }\n\n    best = new ArrayList<>();\n    backtrack(0, 0, new ArrayList<>());\n    int[] answer = new int[best.size()];\n    for (int i = 0; i < best.size(); i++) answer[i] = best.get(i);\n    return answer;\n  }\n\n  private void backtrack(int person, int skillMask, List<Integer> team) {\n    if (skillMask == target) {\n      if (best.isEmpty() || team.size() < best.size()) best = new ArrayList<>(team);\n      return;\n    }\n    if (person == masks.length) return;\n    if (!best.isEmpty() && team.size() >= best.size()) return;\n\n    backtrack(person + 1, skillMask, team);\n    int nextMask = skillMask | masks[person];\n    if (nextMask != skillMask) {\n      team.add(person);\n      backtrack(person + 1, nextMask, team);\n      team.remove(team.size() - 1);\n    }\n  }\n}",
      "iterativeCode": "import java.util.*;\n\nclass Solution {\n  public int[] smallestSufficientTeam(String[] req_skills, List<List<String>> people) {\n    Map<String, Integer> skillIndex = new HashMap<>();\n    for (int i = 0; i < req_skills.length; i++) skillIndex.put(req_skills[i], i);\n\n    int target = (1 << req_skills.length) - 1;\n    List<Integer>[] dp = new List[target + 1];\n    dp[0] = new ArrayList<>();\n\n    for (int person = 0; person < people.size(); person++) {\n      int personMask = 0;\n      for (String skill : people.get(person)) {\n        Integer bit = skillIndex.get(skill);\n        if (bit != null) personMask |= 1 << bit;\n      }\n      if (personMask == 0) continue;\n\n      List<Integer>[] next = dp.clone();\n      for (int mask = 0; mask <= target; mask++) {\n        if (dp[mask] == null) continue;\n        int combined = mask | personMask;\n        List<Integer> candidate = new ArrayList<>(dp[mask]);\n        candidate.add(person);\n        if (next[combined] == null || candidate.size() < next[combined].size()) next[combined] = candidate;\n      }\n      dp = next;\n    }\n\n    List<Integer> team = dp[target];\n    int[] answer = new int[team.size()];\n    for (int i = 0; i < team.size(); i++) answer[i] = team.get(i);\n    return answer;\n  }\n}",
      "recursiveCode": "import java.util.*;\n\nclass Solution {\n  private int[] peopleMasks;\n  private int target;\n  private Map<Long, List<Integer>> memo;\n\n  public int[] smallestSufficientTeam(String[] req_skills, List<List<String>> people) {\n    Map<String, Integer> skillIndex = new HashMap<>();\n    for (int i = 0; i < req_skills.length; i++) skillIndex.put(req_skills[i], i);\n\n    target = (1 << req_skills.length) - 1;\n    peopleMasks = new int[people.size()];\n    for (int i = 0; i < people.size(); i++) {\n      for (String skill : people.get(i)) {\n        Integer bit = skillIndex.get(skill);\n        if (bit != null) peopleMasks[i] |= 1 << bit;\n      }\n    }\n\n    memo = new HashMap<>();\n    List<Integer> team = solve(0, 0);\n    if (team == null) team = new ArrayList<>();\n    int[] answer = new int[team.size()];\n    for (int i = 0; i < team.size(); i++) answer[i] = team.get(i);\n    return answer;\n  }\n\n  private List<Integer> solve(int index, int mask) {\n    if (mask == target) return new ArrayList<>();\n    if (index == peopleMasks.length) return null;\n\n    long key = (((long) index) << 32) | (mask & 0xffffffffL);\n    if (memo.containsKey(key)) return memo.get(key);\n\n    List<Integer> skip = solve(index + 1, mask);\n    List<Integer> take = null;\n    int nextMask = mask | peopleMasks[index];\n    if (nextMask != mask) {\n      List<Integer> rest = solve(index + 1, nextMask);\n      if (rest != null) {\n        take = new ArrayList<>();\n        take.add(index);\n        take.addAll(rest);\n      }\n    }\n\n    List<Integer> best = smaller(skip, take);\n    memo.put(key, best);\n    return best;\n  }\n\n  private List<Integer> smaller(List<Integer> a, List<Integer> b) {\n    if (a == null) return b;\n    if (b == null) return a;\n    return a.size() <= b.size() ? a : b;\n  }\n}",
      "optimizedCode": "import java.util.*;\n\nclass Solution {\n  public int[] smallestSufficientTeam(String[] req_skills, List<List<String>> people) {\n    Map<String, Integer> skillIndex = new HashMap<>();\n    for (int i = 0; i < req_skills.length; i++) skillIndex.put(req_skills[i], i);\n\n    int target = (1 << req_skills.length) - 1;\n    List<Integer>[] dp = new List[target + 1];\n    dp[0] = new ArrayList<>();\n\n    for (int person = 0; person < people.size(); person++) {\n      int personMask = 0;\n      for (String skill : people.get(person)) {\n        Integer bit = skillIndex.get(skill);\n        if (bit != null) personMask |= 1 << bit;\n      }\n      if (personMask == 0) continue;\n\n      List<Integer>[] next = dp.clone();\n      for (int mask = 0; mask <= target; mask++) {\n        if (dp[mask] == null) continue;\n        int combined = mask | personMask;\n        List<Integer> candidate = new ArrayList<>(dp[mask]);\n        candidate.add(person);\n        if (next[combined] == null || candidate.size() < next[combined].size()) next[combined] = candidate;\n      }\n      dp = next;\n    }\n\n    List<Integer> team = dp[target];\n    int[] answer = new int[team.size()];\n    for (int i = 0; i < team.size(); i++) answer[i] = team.get(i);\n    return answer;\n  }\n}",
      "code": "import java.util.*;\n\nclass Solution {\n  public int[] smallestSufficientTeam(String[] req_skills, List<List<String>> people) {\n    Map<String, Integer> skillIndex = new HashMap<>();\n    for (int i = 0; i < req_skills.length; i++) skillIndex.put(req_skills[i], i);\n\n    int target = (1 << req_skills.length) - 1;\n    List<Integer>[] dp = new List[target + 1];\n    dp[0] = new ArrayList<>();\n\n    for (int person = 0; person < people.size(); person++) {\n      int personMask = 0;\n      for (String skill : people.get(person)) {\n        Integer bit = skillIndex.get(skill);\n        if (bit != null) personMask |= 1 << bit;\n      }\n      if (personMask == 0) continue;\n\n      List<Integer>[] next = dp.clone();\n      for (int mask = 0; mask <= target; mask++) {\n        if (dp[mask] == null) continue;\n        int combined = mask | personMask;\n        List<Integer> candidate = new ArrayList<>(dp[mask]);\n        candidate.add(person);\n        if (next[combined] == null || candidate.size() < next[combined].size()) next[combined] = candidate;\n      }\n      dp = next;\n    }\n\n    List<Integer> team = dp[target];\n    int[] answer = new int[team.size()];\n    for (int i = 0; i < team.size(); i++) answer[i] = team.get(i);\n    return answer;\n  }\n}"
    }
  ],
  "checklist": [
    "Ask whether XOR cancellation can remove paired values or repeated prefixes.",
    "Check if each choice, skill, character set, or subset can be compressed into a bitmask.",
    "Look for independent per-bit decisions: count ones, zeros, flips, or contributions at each bit.",
    "For range AND/XOR queries, test whether a common prefix or prefix-XOR array removes repeated work.",
    "For maximum XOR, think from the most significant bit and prefer opposite bits greedily."
  ],
  "traps": [
    "Using signed right shift when unsigned movement is required for raw bit positions.",
    "Forgetting that XOR only cancels even-frequency pairs, not arbitrary duplicates.",
    "Counting the empty subset when the problem asks for non-empty subsets.",
    "Building exponential strings or subsets when the mirrored/bitmask formula is enough.",
    "Ignoring modulo after every binary concatenation shift.",
    "Comparing word strings repeatedly after a one-time mask would make pair checks O(1).",
    "For prefix XOR triplets, missing that a repeated prefix contributes distance minus one split points."
  ],
  "edgeCases": [
    "Input value 0, because many bit loops terminate immediately.",
    "Single-element arrays and one-value ranges.",
    "All values equal or all values zero.",
    "Highest allowed bit set near Integer.MAX_VALUE.",
    "Duplicate masks that represent different items or people.",
    "Mirrored recursive strings where k lands exactly on the middle bit.",
    "Large output problems where time is optimal but result size is exponential."
  ],
  "complexities": [
    "XOR cancellation scans usually cost O(n) time and O(1) space.",
    "Per-bit counting is O(B * n), where B is usually 31 or 32 for integers.",
    "Subset mask enumeration costs O(n * 2^n) and is only acceptable when n is small.",
    "Bitmask DP over skill states costs O(people * 2^skills).",
    "Binary trie maximum XOR costs O(B * n) time and O(B * n) space.",
    "Prefix XOR queries cost O(n + q) time with O(n) prefix space.",
    "Recursive mirror/Gray-code reductions usually cost O(log n) or O(n levels), not output size."
  ],
  "mentalModel": [
    "A bitmask is a compressed set; AND tests overlap, OR merges coverage, XOR toggles/cancels.",
    "When every bit can be decided independently, solve one bit and sum its contribution.",
    "When the highest bit controls the answer, reason from most significant bit to least significant bit.",
    "Prefix XOR behaves like prefix sum for parity/toggle problems because XOR can undo itself.",
    "If a structure is recursively mirrored or Gray-coded, map the query index instead of constructing the structure."
  ],
  "revisionStrategy": [
    "Day 1: redo the 12 core problems and say the trigger before opening code.",
    "Day 3: redo problems 11, 12, 16, 20, 25, and 30 because they cover the highest interview leverage.",
    "Day 7: solve all XOR/prefix-XOR problems without notes, then compare complexities.",
    "Day 14: solve subset-mask and skill-DP problems under a timer.",
    "Before interviews: review traps, then implement one trie, one prefix-XOR query, one per-bit count, and one subset DP from scratch."
  ],
  "unseen": [
    "Given an array where every number appears four times except one, return the unique number.",
    "Given many [l, r] queries, return whether the XOR of each range is zero.",
    "Given words and required letters, count how many word subsets cover all required letters.",
    "Given two integers, return the minimum flips required to make their XOR equal to a target.",
    "Given n switches toggled by masks, find the smallest set of masks that turns all switches on."
  ]
};
